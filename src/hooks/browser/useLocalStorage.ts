/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 14:41:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-02 00:02:03
 * @Description : 浏览器本地存储 hook
 * 它是响应式的，当你修改它的值时，会自动存储到 localStorage 中
 * 可把它当成全局的 ref 来用
 */
import { customRef, nextTick, ref, watch } from 'vue';



import { globalSingleton, storage } from '../../utils'

import { useOn } from './useOn'

/**
 * @param {string} key 键名 全局唯一
 * @param {any} initialValue 初始值 默认为 null
 * @returns {any} 返回一个数组，第一个是 ref 值，第二个是移除方法
 * @example const [count,removeCount] = useLocalStorage('count',0)
 * @example removeCount() // 移除 count 的值 会自动移除 localStorage 中的值，组件更新
 */
// export const useLocalStorage = localStorage() //__useLocalStorage
export const useLocalStorage = globalSingleton(__useLocalStorage)

function localStorage() {
  const map = new Map()

  return (key: string, initialValue: any = null) => {
    // console.log('localStorage --->', key, initialValue)
    if (!map.get(key)) {
      // NOTE 确保这样调用
      // useLocalStorage(key, initialValue)
      // 也能设置 localStorage
      if (storage.get(key, 'local') === null) {
        storage.set(key, initialValue, 'local')
      }
      const state = _useLocalStorage(key, initialValue)
      const remove = () => removeItem(key)
      map.set(key, [state, remove])
      return [state, remove]
    }
    return map.get(key)
  }

  function removeItem(key: string) {
    if (!key) return false
    if (storage.get(key, 'local') === null) {
      storage.remove(key, 'local')
      return true
    }
    const [state] = map.get(key)
    state.value = null
    // NOTE 不要删除 key 否则再次设置值后，无法移除
    // map.delete(key)
    nextTick(() => {
      storage.remove(key, 'local')
    })
    return true
  }
}

function _useLocalStorage(key: string, initialValue: any = null) {
  let _initialValue = initialValue
  const refValue = customRef((track, trigger) => {
    return {
      // 获取数据值
      get: () => {
        track()
        if (_initialValue === null) return null
        const val = storage.get(key, 'local')
        console.log('get', _initialValue)
        if (val !== null) return val
        // 把初始化的值存进去
        console.log('get2', _initialValue)
        storage.set(key, _initialValue, 'local')
        return _initialValue
      },
      // 监听数据变化
      set: newVal => {
        console.log('set', newVal)
        _initialValue = newVal
        storage.set(key, newVal, 'local')
        trigger()
      },
    }
  })
  return refValue
}

function __useLocalStorage(key: string) {
  const refValue = ref(storage.get(key, 'local'))

  watch(
    refValue,
    newVal => {
      storage.set(key, newVal, 'local')
    },
    {
      deep: true,
      // immediate: true,
    }
  )
  useOn(
    'storage',
    event => {
      // @ts-ignore
      const { key } = event
      if (key === key) {
        const val = storage.get(key, 'local')
        refValue.value = val
      }
    },
    window
  )
  return [refValue, removeItem]

  function removeItem() {
    refValue.value = null
    // storage.remove(key, 'local')
    nextTick(() => storage.set(key, null, 'local'))
  }
}
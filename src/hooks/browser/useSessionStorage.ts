/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 15:49:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-02 00:02:42
 * @Description : 浏览器 sessionStorage hook
 * 它是响应式的，当你修改它的值时，会自动存储到 sessionStorage 中
 * 可把它当成全局的 ref 来用
 */
import { customRef, nextTick } from 'vue'

import { storage } from '@/utils'

/**
 * @param {string} key 键名 全局唯一
 * @param {any} initialValue 初始值 默认为 null
 * @returns {any} 返回一个数组，第一个是 ref 值，第二个是移除方法
 * @example const [count,removeCount] = useSessionStorage('count',0)
 * @example removeCount() // 移除 count 的值 会自动移除 sessionStorage 中的值，组件更新
 */
export const useSessionStorage = sessionStorage()

function sessionStorage() {
  const map = new Map()

  return (key: string, initialValue: any = null) => {
    // console.log('sessionStorage --->', key, initialValue)
    if (!map.get(key)) {
      // NOTE 确保这样调用
      // useLocalStorage(key, initialValue)
      // 也能设置 localStorage
      if (storage.get(key) === null) {
        storage.set(key, initialValue)
      }
      const state = _useSessionStorage(key, initialValue)
      const remove = () => removeItem(key)
      map.set(key, [state, remove])
      return [state, remove]
    }
    return map.get(key)
  }

  function removeItem(key: string) {
    if (!key) return false
    if (storage.get(key) === null) {
      storage.remove(key)
      return true
    }
    const [state] = map.get(key)
    state.value = null
    // NOTE 不要删除 key 否则再次设置值后，无法移除
    // map.delete(key)
    nextTick(() => {
      storage.remove(key)
    })
    return true
  }
}

function _useSessionStorage(key: string, initialValue: any = null) {
  let _initialValue = initialValue
  const refValue = customRef((track, trigger) => {
    return {
      // 获取数据值
      get: () => {
        track()
        if (_initialValue === null) return null
        const val = storage.get(key)
        if (val !== null) return val
        // 把初始化的值存进去
        storage.set(key, _initialValue)
        return _initialValue
      },
      // 监听数据变化
      set: newVal => {
        _initialValue = newVal
        storage.set(key, newVal)
        trigger()
      },
    }
  })
  return refValue
}

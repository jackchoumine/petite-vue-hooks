/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-13 10:32:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-01 23:45:50
 * @Description : 二次封装浏览器存储，提高易用性
 */
type StoreType = 'session' | 'local'

function set<V = unknown>(key: string, value: V, type: StoreType = 'session') {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  const jsonValue = JSON.stringify(value)
  if (type === 'local') {
    localStorage.setItem(key, jsonValue)
  } else if (type === 'session') {
    sessionStorage.setItem(key, jsonValue)
  } else {
    throw new Error('不支持的存储类型')
  }
  // NOTE  stringify 支持的值
  // 1， 对象 {...}
  // 2， 数组 [...]
  // 3， 字符串
  // 4， 数字
  // 5， 布尔值
  // 6， null

  // 被忽略的属性值
  // 1， undefined
  // 2， Symbol
  // 3， 函数
}

function get<V = string | null | unknown>(key: string, type: StoreType = 'session'): V {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  if (type === 'local') {
    try {
      const value = JSON.parse(localStorage.getItem(key)!)
      return value
    } catch (error) {
      return localStorage.getItem(key) as any
    }
  } else if (type === 'session') {
    try {
      const value = JSON.parse(sessionStorage.getItem(key)!)
      return value
    } catch (error) {
      return sessionStorage.getItem(key) as any
    }
  } else {
    throw new Error('不支持的存储类型')
  }
}

function clear(type: StoreType = 'session') {
  if (type === 'local') {
    localStorage.clear()
  } else if (type === 'session') {
    sessionStorage.clear()
  } else {
    throw new Error('不支持的存储类型')
  }
}

function remove(key: string, type: StoreType = 'session') {
  if (!key || typeof key !== 'string') throw new Error('必须有一个字符串参数 key')

  if (type === 'local') {
    localStorage.removeItem(key)
  } else if (type === 'session') {
    sessionStorage.removeItem(key)
  } else {
    throw new Error('不支持的存储类型')
  }
}

const storage = {
  get,
  set,
  clear,
  remove,
}

export { storage }

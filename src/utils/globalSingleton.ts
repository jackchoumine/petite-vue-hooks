/**
 * 全局单例
 * @param {Function} createInstance 创建实例的函数
 * @returns {Function} 返回一个函数，该函数在第一次调用时会执行 createInstance 函数，后续调用时返回第一次调用时的结果
 */
export function globalSingleton(createInstance: Function) {
  let initialized = false
  let state: any = null
  return (...rest: any[]) => {
    if (!initialized) {
      state = createInstance(...rest)
      initialized = true
      return state
    }
    return state
  }
}

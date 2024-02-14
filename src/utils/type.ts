function isString(value: unknown): boolean {
  return typeof value === 'string'
}

function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean'
}

function isNumber(value: unknown): boolean {
  return typeof value === 'number' && !Number.isNaN(value)
}

function isFunction(value: unknown): boolean {
  return typeof value === 'function'
}

function isObject(value: unknown): boolean {
  return value !== null && typeof value === 'object'
}

function isPlainObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: unknown): boolean {
  return Array.isArray(value)
}

function isNull(value: unknown): boolean {
  return value === null
}

function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined'
}

function isNullOrUndefined(value: unknown): boolean {
  return isNull(value) || isUndefined(value)
}

function isNullOrUndefinedOrEmpty(value: unknown): boolean {
  return isNullOrUndefined(value) || value === ''
}

function isRegex(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

function isDate(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Date]'
}

function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol'
}

function isPromise(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Promise]'
}

export {
  isString,
  isBoolean,
  isNumber,
  isFunction,
  isObject,
  isPlainObject,
  isArray,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty,
  isRegex,
  isDate,
  isSymbol,
  isPromise,
}

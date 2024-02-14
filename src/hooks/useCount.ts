import { readonly, ref } from 'vue'

/**
 * useCount
 * @param initValue {number} - 初始值，默认为0
 * @example const { count, add, minus } = useCount(1)
 */
export function useCount(initValue: number = 0) {
  const count = ref(initValue)
  return { count: readonly(count), add, minus }

  function add(step: number = 1) {
    count.value += step
  }

  function minus(step: number = 1) {
    count.value -= step
  }
}

import { describe, expect, it } from 'vitest'

import { useCount } from './useCount'

describe('useCount', () => {
  it('initValue', () => {
    const { count } = useCount()
    expect(count.value).toBe(0)
    const { count: count2 } = useCount(10)
    expect(count2.value).toBe(10)
  })
  it('add ans minus', () => {
    const { count, add } = useCount()
    expect(count.value).toBe(0)

    add()
    expect(count.value).toBe(1)

    add(2)
    expect(count.value).toBe(3)

    const { count: count2, minus } = useCount(10)
    expect(count2.value).toBe(10)

    minus()
    expect(count2.value).toBe(9)

    minus(2)
    expect(count2.value).toBe(7)
  })
  it('count is readonly', () => {
    const { count } = useCount()
    expect(count.value).toBe(0)
    // @ts-ignore
    count.value = 100
    expect(count.value).toBe(0)
  })
})

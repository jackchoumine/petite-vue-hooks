import { describe, expect, it } from 'vitest'

import { isString } from './type'

describe('type', () => {
  it('isString', () => {
    expect(isString(1)).toBe(false)
    expect(isString('1')).toBe(true)
  })
})

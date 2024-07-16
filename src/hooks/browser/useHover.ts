/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 18:16:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-16 21:04:48
 * @Description : 可代替 hover 事件的 hook
 */
// @ts-ignore
import hoverIntent from 'hoverintent'
import type { ComponentInstance, MaybeRef, VNodeRef } from 'vue'
import { isRef, ref, watch } from 'vue'

type InAndOut = {
  in?: (target: HTMLElement) => void
  out?: (target: HTMLElement) => void
}
const options: InAndOut = {
  in: target => undefined,
  out: target => undefined,
}
/**
 * 鼠标移入移出 hook，可设置鼠标停留时间。
 * hover 事件瞬间触发，不能设置停留时间
 * @example
 * ```js
 * const {isHover, setHoverTarget} = useHover({
 *   in: (target) => {
 *     console.log('in', target)
 *   },
 *   out: (target) => {
 *    console.log('out', target)
 *   }
 * })
 * // 模板中设置 hover 的目标元素 ref 前面有冒号
 * // <div :ref="setHoverTarget">hover的目标元素</div>
 * ```
 * @param target 目标元素
 * @param inAndOut 移入移除回调
 * @param inAndOut.in 移入回调
 * @param inAndOut.out 移出回调
 * @param opts hoverIntent配置
 * @link https://www.npmjs.com/package/hoverintent
 */
function useHover(inAndOut: InAndOut = options, opts = undefined) {
  const isHover = ref(false)
  const target = ref<HTMLElement | ComponentInstance<any> | null>(null)

  watch(
    target,
    (target, oldTarget) => {
      if (target && target !== oldTarget) {
        detectHover(target)
      }
    },
    { flush: 'post' }
  )

  const setHoverEle: VNodeRef = ele => {
    if (!ele) return
    target.value = ele
  }
  return {
    isHover,
    setHoverEle,
  }

  function detectHover(target: MaybeRef<HTMLElement>) {
    const _target = isRef(target) ? target.value : target
    if (!_target) return
    const { in: inTarget, out } = inAndOut
    opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      ).options(opts)

    !opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      )
  }
}

export { useHover }

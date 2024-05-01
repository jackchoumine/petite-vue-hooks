/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 23:52:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-01 23:54:03
 * @Description : 事件绑定 hook
 */
// @ts-nocheck
import { isEmptyStr,isFunction, isObject} from 'petite-utils';
import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue';



type Handler = (event: Event) => void

export function useOn(
  eventName: string,
  handler: Handler,
  target: HTMLElement | Document | Window | BroadcastChannel
) {

  if (!isEmptyStr(eventName)||!isFunction(handler)||!isObject(target)) return

  onMounted(() => {
    target.addEventListener(eventName, handler)
  })
  onActivated(() => {
    target.addEventListener(eventName, handler)
  })

  onDeactivated(() => {
    target.removeEventListener(eventName, handler)
  })

  onUnmounted(() => {
    target.removeEventListener(eventName, handler)
  })
}
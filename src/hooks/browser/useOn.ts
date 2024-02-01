/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 23:52:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-01 23:54:03
 * @Description : 事件绑定 hook
 */
import { onMounted, onUnmounted } from 'vue'

type Handler = (event: Event) => void

export function useOn(
  eventName: string,
  handler: Handler,
  target: HTMLElement | Document | Window | BroadcastChannel
) {
  onMounted(() => {
    target.addEventListener(eventName, handler)
  })
  onUnmounted(() => {
    target.removeEventListener(eventName, handler)
  })
}

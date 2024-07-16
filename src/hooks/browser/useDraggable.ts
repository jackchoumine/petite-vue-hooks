/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 19:01:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-16 21:53:52
 * @Description : 拖拽元素 hook
 */
import type { MaybeRef, VNodeRef } from 'vue'
import {
  computed,
  onBeforeUnmount,
  reactive,
  readonly,
  ref,
  unref,
  watchEffect,
} from 'vue'

import { useHover } from './useHover'

export interface DraggableOptions {
  dragTips?: string
  dragZIndex: number
}

/**
 * 拖拽元素 hook
 * @param enable 是否启用拖拽功能，默认为 true, 可通过 ref 动态控制
 * @param options
 * @param options.dragTips 鼠标移动到可拖拽元素上时的提示
 * @param options.dragZIndex 拖拽时的 z-index，默认为 10，可根据实际情况调整，防止被其他元素遮挡
 */
type divRef = HTMLElement | null
function useDraggable(
  enable: MaybeRef<boolean> = ref(true),
  options: DraggableOptions = {
    dragTips: '长按鼠标，可拖拽',
    dragZIndex: 10,
  }
) {
  const title = computed(() => (unref(enable) ? options.dragTips : ''))
  const { setHoverEle } = useHover({
    in: dragTarget => {
      if (!dragTarget) return
      dragTarget.title = title.value as string
    },
  })
  const position = reactive({ left: 'auto', top: 'auto' })
  const dragging = ref(false)
  // 拖动元素
  const dragEle = ref<divRef>(null)
  const setDragEle = (ele: divRef) => {
    if (dragEle.value) return
    dragEle.value = ele
  }
  // 拖动 dragEle.value 时需要定位的元素
  const positionEle = ref<divRef>(null)
  const setPositionEle = (ele: divRef) => {
    if (positionEle.value) return
    positionEle.value = ele
  }
  // 是否绑定事件
  let bindEvent = false
  watchEffect(
    () => {
      if (!unref(enable) && bindEvent && dragEle.value) {
        dragEle.value.removeEventListener('mousedown', onMousedown)
        bindEvent = false
        return
      }
      if (!dragEle.value || bindEvent) return
      if (!positionEle.value) positionEle.value = dragEle.value
      setHoverEle(dragEle.value, {})
      positionEle.value.style.position = 'fixed'
      position.left = positionEle.value.style.left
      position.top = positionEle.value.style.top
      dragEle.value.addEventListener('mousedown', onMousedown)
      bindEvent = true
    },
    {
      flush: 'post',
    }
  )

  onBeforeUnmount(() => {
    if (dragEle.value) dragEle.value.removeEventListener('mouseup', onMouseup)
  })

  let shiftX = 0
  let shiftY = 0
  let initTransition = ''
  let dragEleInitCursor = ''

  return {
    dragging: readonly(dragging),
    position: readonly(position),
    setDragEle,
    setPositionEle,
  }
  function onMousedown(event: MouseEvent) {
    // console.log(event.buttons)
    // event.buttons !== 1
    if (!dragEle.value || !positionEle.value) return
    // 鼠标相对于拖动元素的偏移位置
    shiftX = event.clientX - dragEle.value.getBoundingClientRect().left
    shiftY = event.clientY - dragEle.value.getBoundingClientRect().top
    document.addEventListener('mousemove', onMove)
    dragEle.value.addEventListener('mouseup', onMouseup)

    const { transition, right, bottom } = positionEle.value.style

    if (right !== 'auto') positionEle.value.style.right = 'auto'
    if (bottom !== 'auto') positionEle.value.style.bottom = 'auto'

    moveAt(event)
    // NOTE 禁用原生的拖拽事件
    dragEle.value.addEventListener('dragstart', disableDrag)
    // NOTE 拖拽时禁止选中文本
    document.body.style.userSelect = 'none'

    if (dragEle.value.style.cursor === 'move' && !dragEleInitCursor) {
      dragEleInitCursor = dragEle.value.style.cursor
    }
    dragEle.value.style.cursor = 'move'
    initTransition = transition
    positionEle.value.style.transition = 'all 0 ease'
  }
  function onMove(event: MouseEvent) {
    moveAt(event)
  }
  function onMouseup(event: MouseEvent) {
    console.log('mouseup', event.buttons)
    if (!dragEle.value || !positionEle.value) return

    document.removeEventListener('mousemove', onMove)
    dragEle.value.removeEventListener('dragstart', disableDrag)

    document.body.style.userSelect = ''

    positionEle.value.style.transition = initTransition
    dragEle.value.style.cursor = dragEleInitCursor

    dragging.value = false
  }

  function moveAt({ pageX, pageY }: MouseEvent) {
    if (!dragEle.value || !positionEle.value) return
    const _left = `${pageX - shiftX}px`
    const _top = `${pageY - shiftY}px`
    // console.log({
    //   left: _left,
    //   top: _top,
    // })
    position.left = _left
    position.top = _top
    dragging.value = true
    positionEle.value.style.left = _left
    positionEle.value.style.top = _top
    positionEle.value.style.zIndex = '' + options.dragZIndex
  }
  function disableDrag() {
    return false
  }
}

export { useDraggable }

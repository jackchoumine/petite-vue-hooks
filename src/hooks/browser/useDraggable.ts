/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 19:01:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-17 00:27:12
 * @Description : 拖拽元素 hook
 */
import { debounce } from 'petite-utils'
import type { MaybeRef, VNodeRef } from 'vue'
import {
  computed,
  onBeforeUnmount,
  reactive,
  readonly,
  ref,
  unref,
  watch,
  watchEffect,
} from 'vue'

import { useHover } from './useHover'
import { useOn } from './useOn'

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
    dragTips: '长按鼠标，可拖动',
    dragZIndex: 10,
  }
) {
  const title = computed(() => (unref(enable) ? options.dragTips : ''))
  const { setHoverEle, isHover } = useHover({
    in: dragTarget => {
      if (!dragTarget) return
      dragTarget.title = title.value as string
    },
    out: dragTarget => {
      if (!dragTarget) return
      dragTarget.title = ''
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

  const _extent = {
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  }
  // 拖动范围元素
  const extentEle = ref<divRef>(null)
  /**
   * 设置限制拖动范围的元素
   * @param ele 限制拖动范围的元素
   * @returns
   */
  const setExtentEle = (ele: divRef) => {
    // if (extentEle.value) return
    extentEle.value = ele
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

  setExtentEle(document.body)

  watch(
    [extentEle, positionEle],
    () => {
      // console.log({
      //   extent,
      //   position,
      // })
      onExtentSizeChange()
      onPositionSizeChange()
    },
    {
      flush: 'post',
    }
  )
  let extentSizeObserver: ResizeObserver
  let positionSizeObserver: ResizeObserver
  onBeforeUnmount(() => {
    if (dragEle.value) dragEle.value.removeEventListener('mouseup', onMouseup)
    if (extentSizeObserver && extentEle.value) {
      extentSizeObserver.unobserve(extentEle.value)
    }
    if (positionSizeObserver && positionEle.value) {
      positionSizeObserver.unobserve(positionEle.value)
    }
  })

  let shiftX = 0
  let shiftY = 0
  let initTransition = ''
  let dragEleInitCursor = ''

  const debounceOnWindowResize = debounce(() => {
    // console.log('debounceOnWindowResize')
    positionEle.value && extentEle.value && calcExtent(extentEle.value, positionEle.value)
  }, 300)
  useOn('resize', debounceOnWindowResize, window)

  return {
    dragging: readonly(dragging),
    position: readonly(position),
    setDragEle,
    setPositionEle,
    setExtentEle,
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
    if (!isHover || !dragEle.value || !positionEle.value) return
    const currentX = pageX - shiftX
    const currentY = pageY - shiftY
    const _left = `${clamp(currentX, _extent.minX, _extent.maxX)}px`
    const _top = `${clamp(currentY, _extent.minY, _extent.maxY)}px`
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
  function onExtentSizeChange() {
    // console.log('onExtentSizeChange')
    // @ts-ignore
    const debounceHandle = debounce(entries => {
      // @ts-ignore
      const extentEle = entries[0].target
      positionEle.value && calcExtent(extentEle, positionEle.value)
    })
    extentSizeObserver = new ResizeObserver(debounceHandle)
    if (extentEle.value) {
      extentSizeObserver.observe(extentEle.value)
    }
  }

  function onPositionSizeChange() {
    // console.log('onPositionSizeChange')
    // @ts-ignore
    const debounceHandle = debounce(entries => {
      // @ts-ignore
      const positionEle = entries[0].target
      extentEle.value && calcExtent(extentEle.value, positionEle)
    })
    positionSizeObserver = new ResizeObserver(debounceHandle)
    if (positionEle.value) {
      positionSizeObserver.observe(positionEle.value)
    }
  }
  function disableDrag() {
    return false
  }
  function calcExtent(extentEle: HTMLElement, positionEle: HTMLElement) {
    const react = extentEle?.getBoundingClientRect()
    const positionReact = positionEle?.getBoundingClientRect()
    if (!react || !positionReact) return
    // console.log(react)
    const { width, height } = positionReact
    _extent.minX = react?.left || 0
    _extent.minY = react?.top || 0
    _extent.maxX = react?.right - width || 0
    _extent.maxY = react?.bottom - height || 0
    // console.log(_extent)
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
export { useDraggable }

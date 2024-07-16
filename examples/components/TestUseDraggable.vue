<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-16 21:36:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-17 00:41:59
 * @Description : 测试 useDraggable
-->
<script setup lang="ts">
// @ts-ignore
import { useDraggable } from '@'

const { dragging, position, setDragEle, setExtentEle } = useDraggable()
const {
  setDragEle: setDragDiv,
  disableDraggable,
  enableDraggable,
  isDraggable,
} = useDraggable()
</script>

<template>
  <div class="TestUseDraggable" :ref="setExtentEle">
    400 x 400
    <div :ref="setDragEle">拖动它 {{ dragging }} {{ position }}</div>
    <div :ref="setDragDiv">拖动它</div>
    <button @click="disableDraggable">禁止拖动 {{ isDraggable }}</button>
    <button @click="enableDraggable">启用拖动 {{ isDraggable }}</button>
  </div>
</template>

<style scoped lang="scss">
.TestUseDraggable {
  // scss code
  width: 400px;
  height: 400px;
  background-color: gold;
  div {
    width: 200px;
    height: 100px;
    background-color: cadetblue;
  }
}
</style>

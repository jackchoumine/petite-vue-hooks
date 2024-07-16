<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-16 21:36:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-16 21:55:44
 * @Description : 测试 useDraggable
-->
<script setup>
import { useDraggable } from '@'

const { dragging, position, setDragEle, setExtentEle } = useDraggable()
</script>

<template>
  <div class="TestUseDraggable">
    <div :ref="setDragEle">拖动它 {{ dragging }} {{ position }}</div>
  </div>
</template>

<style scoped lang="scss">
.TestUseDraggable {
  // scss code
  div {
    width: 200px;
    height: 100px;
    background-color: cadetblue;
  }
}
</style>

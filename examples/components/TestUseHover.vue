<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-16 21:11:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-16 21:22:31
-->
<script setup>
import { useHover } from '@'

const { isHover, setHoverEle } = useHover({
  in: ele => {
    console.log(ele, 'in')
  },
  out: ele => {
    console.log(ele, 'out')
  },
})
</script>

<template>
  <div class="TestUseHover">
    <div class="hover-ele" :ref="setHoverEle">hover?{{ isHover }}</div>
  </div>
</template>

<style scoped lang="scss">
.TestUseHover {
  // scss code
  .hover-ele {
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100px;
    height: 100px;
  }
}
</style>

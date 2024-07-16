<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 22:46:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-16 21:40:54
 * @Description : 根组件
-->
<script setup>
import { onMounted, ref, watch } from 'vue'

import { useLocalStorage, useSessionStorage } from '../src/index'

import TestUseDraggable from './components/TestUseDraggable.vue'
import TestUseHover from './components/TestUseHover.vue'
import UseLocalStorageDemo from './components/UseLocalStorageDemo.vue'
import UseSessionStorageDemo from './components/UseSessionStorageDemo.vue'

const [age, removeAge] = useLocalStorage('age', 24)

const [age_ss, removeAge_ss] = useSessionStorage('age', '这是一个sessionStorage')

watch(age_ss, (age, old) => {
  console.log('age_ss', age, old)
})

function changeAge() {
  age_ss.value = '重置 sessionStorage 了' + Math.random()
}
function changeAge2(step) {
  age.value += step
}
window.addEventListener('storage', event => {
  console.log('event', event)
})
</script>

<template>
  <TestUseDraggable />
  <TestUseHover />
  <h3>{{ age_ss }}</h3>
  <button @click="changeAge">重置 age_ss</button>
  <button @click="removeAge_ss">移除 age_ss</button>
  <UseSessionStorageDemo />
  <h2>age{{ age }}</h2>
  <button @click="changeAge2(+1)">age+1</button>
  <button @click="changeAge2(-1)">age-1</button>
  <button @click="removeAge">移除 age</button>
  <hr />
  <UseLocalStorageDemo />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

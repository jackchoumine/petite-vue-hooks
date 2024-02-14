<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 22:46:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-02 01:27:25
 * @Description : 根组件
-->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useLocalStorage, useSessionStorage } from '../src/index'

const [age, removeAge] = useLocalStorage('age', 24)

const [age_ss, removeAge_ss] = useSessionStorage('age', '这是一个sessionStorage')

watch(age_ss, (age, old) => {
  console.log('age_ss', age, old)
})

function changeAge() {
  age_ss.value = '重置 sessionStorage 了' + Math.random()
}
function changeAge2() {
  age.value += 1
}
</script>

<template>
  <h3>{{ age_ss }}</h3>
  <button @click="changeAge">重置 age_ss</button>
  <button @click="removeAge_ss">移除 age_ss</button>
  <h2>age{{ age }}</h2>
  <button @click="changeAge2">重置 age</button>
  <button @click="removeAge">移除 age</button>
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

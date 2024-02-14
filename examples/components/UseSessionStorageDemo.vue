<script setup>
import { useSessionStorage } from '../../src/index'

const [age, removeAge] = useSessionStorage('age')

function changeAge2(step) {
  age.value += step
}
</script>

<template>
  <div class="useLocalStorageDemo">
    <h3>age:{{ age }}</h3>
    <button @click="changeAge2(+1)">age + 1</button>
    <button @click="changeAge2(-1)">age - 1</button>
    <button @click="removeAge">removeAge</button>
  </div>
</template>

<style scoped lang="scss">
.useLocalStorageDemo {
  // scss code
}
</style>

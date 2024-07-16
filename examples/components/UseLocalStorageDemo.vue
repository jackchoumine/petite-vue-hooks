<script setup>
import { useLocalStorage } from '../../src/index'

const [age, removeAge] = useLocalStorage('age')
// age.value = 'initial age right now'
function changeAge2(step) {
  age.value += step
}
</script>

<template>
  <div class="useLocalStorageDemo">
    <h2>useLocalStorage</h2>
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

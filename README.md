# petit-vue-hooks

A tiny vue hooks as its name.

## Features

## Installation

```bash
npm i petit-vue-hooks
# or yarn
yarn add petit-vue-hooks
# or pnpm
pnpm add petit-vue-hooks
```

## Usage

```html
<script setup>
  import { useSessionStorage } from 'petit-vue-hooks'

  const [age_ss] = useSessionStorage('age', '这是一个sessionStorage')

  function changeAge() {
    age_ss.value = '重置 sessionStorage 了' + Math.random()
  }
</script>

<template>
  <h3>{{ age_ss }}</h3>
  <button @click="changeAge">重置 age_ss</button>
</template>
```

# petit-vue-hooks

A tiny vue hooks as its name.

> It is wip. Don't use it in production.

## Features

## Installation

```bash
npm i petite-vue-hooks
# or yarn
yarn add petite-vue-hooks
# or pnpm
pnpm add petite-vue-hooks
```

## Usage

```html
<script setup>
  import { useSessionStorage } from 'petit-vue-hooks'

  const [age_ss] = useSessionStorage('age', 'sessionStorage value')

  function changeAge() {
    age_ss.value = 'reset sessionStorage ' + Math.random()
  }
</script>

<template>
  <h3>{{ age_ss }}</h3>
  <button @click="changeAge">重置 age_ss</button>
</template>
```

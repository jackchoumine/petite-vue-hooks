# petite-vue-hooks

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

### useDraggable

Make an element draggable.

#### base usage

Drag element in the whole window.

```html
<script setup>
  import { useDraggable } from 'petite-vue-hooks'

  const { setDragEle } = useDraggable()
</script>
<template>
  <div :ref="setDragEle">Drag me</div>
</template>
```

#### set a drag area

You can set a drag area by `setExtentEle`

```html
<script setup>
  import { useDraggable } from 'petite-vue-hooks'

  const { setDragEle, setExtentEle } = useDraggable()
</script>
<template>
  <div :ref="setExtentEle" class="extent-draggable">
    <div :ref="setDragEle">Drag me only in extent-draggable div</div>
  </div>
</template>
```

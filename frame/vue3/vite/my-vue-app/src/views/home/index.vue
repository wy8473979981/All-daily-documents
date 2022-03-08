<template>
  <div>{{ counter.count }}</div>
  <n-button type="primary" @click="counter.increment()">
    counter
  </n-button>
</template>

<script lang="ts" setup>
  import { useCounterStore } from '@/stores/counter'
  const counter = useCounterStore()
</script>

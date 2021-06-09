/*
*author: ly
*date： 2021-05-13
*desc： 简易封装
*/

<template>
  <p>
    <span class="span-title">{{ title }}</span>
    <span v-if="select" class="span-value">
      <slot/>
    </span>
    <span v-else-if="file" class="span-value">
      <download v-model="value"></download>
    </span>
    <span v-else class="span-value">{{ value }}</span>
  </p>
</template>

<script>
export default {
  name: 'pCol',
  props: {
    title: {
      default: undefined,
    },
    value: {
      default: undefined,
    },
    select: {
      type: Boolean,
      default: false
    },
    file: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang='scss' scoped>
</style>

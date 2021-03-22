<template>
  <div class="block-head" :style="{'border-left-color': borderColor}">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    borderColor: {
      type: String,
      default: 'orange'
    },
    textColor: {
      type: String,
      default: '#333'
    }

  }
}
</script>

<style lang="scss" scoped>
.block-head{
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  border-left-width: 5px;
  border-left-style: solid;
  // margin-bottom: 10px;
}
</style>

<template>
  <i class="btn-close pointer" @click='handleClick'>+</i>
</template>

<script>
export default {
  props: {

  },
  methods: {
    handleClick () {
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-close{
  z-index: 10;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  font-weight: 600;
  transform: rotate(45deg);
}
</style>

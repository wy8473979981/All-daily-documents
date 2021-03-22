<template>
  <section class="ys-tab">
    <slot name='head'></slot>
  </section>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String
    }
  }
}
</script>

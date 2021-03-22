<template>
  <span class="ys-tab-head">{{title}}</span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

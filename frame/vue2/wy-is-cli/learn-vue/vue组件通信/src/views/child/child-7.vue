<template>
  <div class="child-6">
    <p>{{ childData }}</p>
    <p>父组件数据：{{ data }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childData: "@163.com"
    };
  },
  props: {
    data: {
      type: String
    }
  },
  methods: {}
};
</script>

<style></style>

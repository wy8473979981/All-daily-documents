<template>
  <el-transfer
    v-model="value"
    :data="transferData"
    class="transferComponent"
    @change="handleChange"
  ></el-transfer>
</template>
<script type="text/javascript">
export default {
  name: "transferComponent",
  data() {
    return {
      value: [],
      transferData: []
    };
  },
  props: {
    data: {
      type: Array
    }
  },
  created() {},
  mounted() {
    this.transferData = this.data;
  },
  watch: {
    data: function(v) {
      this.transferData = v;
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.$emit("listenEvent", movedKeys);
    }
  }
};
</script>

<style lang="scss">
.transferComponent {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-transfer-panel .el-transfer-panel__header {
    display: none;
  }
  .el-checkbox:last-of-type {
    margin-right: 30px;
  }
}
</style>
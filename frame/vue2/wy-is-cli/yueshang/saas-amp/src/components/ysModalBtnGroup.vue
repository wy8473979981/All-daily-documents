<template>
  <div class="btn-group">
    <!-- <el-button :disabled="step === 0" size="mini" @click="goStep(-1)">{{prevStepName}}</el-button> -->
    <el-button type="primary" size="mini" @click="goStep(1)">填充数据</el-button>
    <el-button size="mini" @click="closeModal">取消</el-button>
  </div>
</template>

<script>
export default {
  props: {
    prevStepName: {
      type: String,
      default: '上一步'
    },
    nextStepName: {
      type: String,
      default: '下一步'
    },
    step: {
      type: Number
    }
  },
  methods: {
    goStep (val) {
      this.$emit('goStep', val)
    },
    closeModal () {
      this.$emit('toggleModal')
    }
  }
};
</script>

<style lang='scss' scoped>
.btn-group{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

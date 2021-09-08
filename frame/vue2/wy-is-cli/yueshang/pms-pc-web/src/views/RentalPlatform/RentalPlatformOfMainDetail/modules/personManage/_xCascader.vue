<template>
  <el-popover
    placement="bottom"
    class="x-cascader"
    trigger="click"
    @show="handleShow"
    @after-leave="show = false">
    <div class="tips">添加营运责任人</div>
    <el-cascader-panel
      v-if="show"
      v-model="value"
      :options="departmentStaffList"
      :props="{
        emitPath: false,
        value: 'id',
        label: 'name'
      }"
      @change="handleChange"></el-cascader-panel>

    <div class="btn-area">
      <el-button :disabled="!value" type="primary" size="mini" @click="handleSelect">确定</el-button>
      <el-button type="text" size="mini" @click="close">取消</el-button>
    </div>
    <ys-n-icon slot="reference" label="添加" icon="add"></ys-n-icon>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XCascader',

  data() {
    return {
      value: '',
      show: false,
    }
  },

  computed: {
    ...mapState({ departmentStaffList: state => state.rentalPlatform.departmentStaffList })
  },

  methods: {
    handleChange() {
      // console.log(val)
      // this.$emit('select', val)
    },

    handleSelect() {
      this.$emit('change', this.value)
      this.close()
    },

    close() {
      this.value = ''
      document.getElementById('app').click()
    },

    handleShow() {
      this.show = true
      this.$emit('show')
    },
  }
}
</script>

<style lang="scss" scoped>
.tips {
  color: $tipsColor;
  padding-top: 22px;
  padding-left: 16px;
}
.btn-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 0;

  .el-button {
    margin-right: 20px;
  }
  ::v-deep.el-button.el-button--primary.el-button--mini {
    min-width: auto;
  }
}
</style>

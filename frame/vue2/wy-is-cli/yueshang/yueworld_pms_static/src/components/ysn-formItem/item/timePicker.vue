<template>
  <div class="yms-time-picker">
    <el-time-picker
      v-model="form[$attrs.prop]"
      format="HH:mm"
      value-format="HH:mm"
      class="ysn-el-date"
      placeholder="请选择时间"
      @change="$attrs.change || ''"
      @input="dataInput"
    ></el-time-picker>
  </div>
</template>
<script>
export default {
  name: 'ItemTimePicker',
  components: {},
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      iconShow: false
    }
  },
  methods: {
    dataInput(val) {
      this.$attrs.change && this.$attrs.change(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.yms-time-picker {
  position: relative;
  width: 100%;
  height: 32px;
  background: #fdfcfa;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #050101;
  padding-left: 16px;
  padding-right: 40px;
  overflow: hidden;
  .ysn-el-date {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    ::v-deep.el-input__inner {
      padding-left: 15px;
    }
    ::v-deep.el-input__prefix, ::v-deep.el-input__suffix {
      .el-input__icon {
        line-height: 32px;
      }
    }
    ::v-deep.el-input__prefix {
      right: 5px;
      left: unset;
    }
    ::v-deep.el-input__suffix .el-input__icon {
      &:before {
        background: #F6F5EE;
      }
    }
  }
}
</style>
<template>
  <div
    class="ysn-data-picker"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseout"
  >
    <!-- <div v-if="$attrs.type == 'daterange' || $attrs.type == 'datetimerange'" class="flex-ju-al-between height100">
      <div class="height100"><span v-if="form[$attrs.prop]">{{ form[$attrs.prop][0] }}</span></div>
      <svg-icon icon-class="bluegou" class="icon" />
      <div class="height100"><span v-if="form[$attrs.prop]">{{ form[$attrs.prop][1] }}</span></div>
    </div>
    <div v-else>{{ form[$attrs.prop] }}</div> -->

    <el-date-picker
      v-model="form[$attrs.prop]"
      v-bind="$attrs"
      :type="$attrs.type || 'date'"
      :range-separator="$attrs.rangeSeparator||'至'"
      :start-placeholder="$attrs.startPlaceholder || '开始日期'"
      :end-placeholder="$attrs.endPlaceholder || '结束日期'"
      class="ysn-el-date"
      :value-format="$attrs.valueFormat||'yyyy-MM-dd'"
      :placeholder="$attrs.placeholder || '选择日期'"
      prefix-icon="none"
      clear-icon="icon-date-picker-none"
      @change="$attrs.change || ''"
      @input="dataInput"
    />
    <span v-if="closeIconShow" class="el-input__suffix cursor-pointer" @mouseover.stop="handleCloseMouseover" @mouseout.stop="handleCloseMouseout" @click="clearDate">
      <span class="el-input__suffix-inner">
        <i class="el-input__icon el-icon-circle-close" />
      </span>
      <i class="el-input__icon el-input__validateIcon el-icon-circle-check" />
    </span>
    <span v-else class="el-input__suffix ysn-el-date-icon "><i class="el-input__icon el-icon-date" /></span>
  </div>
</template>

<script>
export default {
  name: 'ItemDatePicker',
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
      closeIconShow: false
    }
  },
  methods: {
    clearDate() {
      this.form[this.$attrs.prop] = ''
    },
    handleCloseMouseover(e) {
      this.closeIconShow = true
      this.mouserOverClose = true
    },
    handleCloseMouseout() {
      this.mouserOverClose = false
    },
    handleMouseover() {
      if (this.$attrs.disabled) return
      if (this.form[this.$attrs.prop]) {
        this.closeIconShow = true
      } else {
        this.closeIconShow = false
      }
    },
    handleMouseout() {
      const that = this
      if (this.mouserOverClose) {
        return
      }
      setTimeout(function() {
        that.closeIconShow = false
      }, 100)
    },
    dataInput(val) {
      this.$attrs.change && this.$attrs.change(val)
    }
  }
}
</script>
<style lang="scss" scoped>
 $inputBg:#FDFCFA;
  .ysn-data-picker{
    position: relative;
    width: 100%;
    height: 24px;
    margin: 6px 0;
    background: #FDFCFA;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #050101;
    padding-left:16px ;
    padding-right: 40px;

    ::v-deep.el-range-editor--medium .el-range-separator{
      line-height: 16px;
    }

    .height100{
      height: 100%;
    }
    .ysn-el-date{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      line-height: 24px;
      &.el-input--prefix {
        ::v-deep.el-input__inner{
          padding-left: 15px;
        }
      }
    }
    .ysn-el-date-icon{
      //position: absolute;
      //z-index: 3;
      //right: 5px;
      //top:-4px;
      display: flex;
      align-items: center;
      //left: inherit;
      height: 100%;
      .el-input__icon{
        line-height: 24px;
      }
    }
    .el-input__suffix{
      //line-height: 24px;
      display: flex;
      align-items: center;
      z-index: 3;
      height: 100%;
      .el-input__suffix-inner{
         margin-top: 1px;
      }
    }
    .el-range__close-icon{
      display: none;
    }

    .el-input__inner {
      padding-left:16px;
      line-height: 24px;
      height: 24px;
      &:hover{
        cursor: pointer;
      }
    }
    .el-range__icon.none{
      display: none;
    }
  }
  .ysn-el-date input{
    background: none;
  }
</style>


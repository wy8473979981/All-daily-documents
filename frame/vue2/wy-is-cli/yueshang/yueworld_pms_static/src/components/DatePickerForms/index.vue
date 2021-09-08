<!--
 * @Author: xza
 * @Date: 2021-07-27 09:23:25
 * @LastEditTime: 2021-07-27 11:20:58
 * @LastEditors: xza
 * @Description: 时分秒选择框
 * @FilePath: /baolong/src/components/DatePickerForms/index.vue
-->
<template>
  <div
    class="ysn-data-picker"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseout"
  >
    <el-date-picker
      v-model="data_"
      v-bind="form"
      :type="form.type || 'date'"
      class="ysn-el-date"
      :value-format="form.valueFormat"
      :placeholder="'选择日期'"
      prefix-icon="none"
      clear-icon="icon-date-picker-none"
      @change="change"
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
  name: 'DatePickerForms',
  components: {},
  props: {
    dates: { type: String, default: '' }
  },
  data() {
    return {
      data_: this.dates,
      closeIconShow: false,
      form: {
        clearable: '',
        disabled: undefined,
        index: 0,
        isShow: true,
        itemType: 'datePicker',
        prop: 'time',
        required: false,
        time: '设定关帐时间',
        type: 'datetime',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        width: 206
      }
    }
  },
  methods: {
    clearDate() {
      this.data_ = ''
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
      console.log(val)
    },
    change(e) {
      this.$emit('saveTimes', e)
    }
  }
}
</script>
<style lang="scss" scoped>
 $inputBg:#FDFCFA;
  .ysn-data-picker{
    position: relative;
    width: 100%;
    height: 28px;
    margin: 4px 0;
    background: #FDFCFA;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #050101;
    padding-left:16px ;
    padding-right: 40px;

    ::v-deep.el-range-editor--medium .el-range-separator{
      line-height: 20px;
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
      line-height: 28px;
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
        line-height: 28px;
      }
    }
    .el-input__suffix{
      //line-height: 28px;
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
      line-height: 28px;
      height: 28px;
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


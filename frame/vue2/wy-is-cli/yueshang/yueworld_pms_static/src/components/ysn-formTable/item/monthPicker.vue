<template>
  <div
    class="ysn-month-picker"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseout"
  >
    <el-date-picker
      v-model="form[$attrs.prop]"
      v-bind="$attrs"
      :type="$attrs.type || 'month'"
      :start-placeholder="$attrs.startPlaceholder || '开始日期'"
      :end-placeholder="$attrs.endPlaceholder || '结束日期'"
      class="ysn-el-date"
      :format="$attrs.format || 'yyyy年MM月'"
      :value-format="$attrs.valueFormat || 'yyyy-MM'"
      placeholder="选择月份"
      prefix-icon="none"
      :clear-icon="iconShow?'icon-date-picker-none':'el-icon-circle-close'"
      @change="$attrs.change || ''"
      @input="dataInput"
    />
    <span v-if="iconShow" class="el-input__prefix cursor-pointer" @click="lastMonth">
      <span class="el-input__prefix-inner">
        <i class="el-input__icon el-icon-arrow-left" />
      </span>
      <i class="el-input__icon el-input__validateIcon el-icon-circle-check" />
    </span>
    <span v-if="iconShow" class="el-input__suffix cursor-pointer" @click="nextMonth">
      <span class="el-input__suffix-inner">
        <i class="el-input__icon el-icon-arrow-right" />
      </span>
      <i class="el-input__icon el-input__validateIcon el-icon-circle-check" />
    </span>
    <span v-if="!iconShow && dateIconShow" class="el-input__suffix ysn-el-date-icon "><i class="el-input__icon el-icon-date" /></span>
  </div>
</template>

<script>
import moment from 'moment/moment'
export default {
  name: 'ItemMonthPicker',
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
      iconShow: false,
      dateIconShow: true
    }
  },
  mounted() {
    switch (this.$attrs.type) {
      case 'year':
        // this.form[this.$attrs.prop] = moment().format('YYYY')
        this.iconShow = true
        break
      case 'monthrange':
        this.form[this.$attrs.prop] = []
        this.iconShow = false
        break
      default:
        // this.form[this.$attrs.prop] = moment().format('YYYY-MM')
        this.iconShow = true
        break
    }
  },
  methods: {
    lastMonth() {
      switch (this.$attrs.type) {
        case 'year':
          this.form[this.$attrs.prop] = moment(this.form[this.$attrs.prop]).subtract(1, 'year').format('YYYY')
          break

        default:
          this.form[this.$attrs.prop] = moment(this.form[this.$attrs.prop]).subtract(1, 'month').format('YYYY-MM')
          break
      }
      this.dataInput(this.form[this.$attrs.prop])
    },
    nextMonth() {
      switch (this.$attrs.type) {
        case 'year':
          this.form[this.$attrs.prop] = moment(this.form[this.$attrs.prop]).add(1, 'year').format('YYYY')
          break

        default:
          this.form[this.$attrs.prop] = moment(this.form[this.$attrs.prop]).add(1, 'month').format('YYYY-MM')
          break
      }
      this.dataInput(this.form[this.$attrs.prop])
    },
    dataInput(val) {
      this.$attrs.change && this.$attrs.change(val)
    },
    handleMouseover() {
      if (!this.iconShow && this.form[this.$attrs.prop].length === 2) {
        this.dateIconShow = false
      }
    },
    handleMouseout() {
      if (!this.iconShow) {
        this.dateIconShow = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 $inputBg:#FDFCFA;
  .ysn-month-picker{
    position: relative;
    width: 100%;
    height: 32px;
    background: #FDFCFA;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #050101;
    padding-left:16px ;
    padding-right: 40px;
    overflow: hidden;
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
      display: flex;
      padding-right: 5px;
      padding-left: 5px;
      &.el-input--prefix {
        ::v-deep.el-input__inner{
          padding-left: 15px;
          text-align: center;
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
        line-height: 33px;
      }
    }
    .el-input__prefix{
      //line-height: 32px;
      display: flex;
      align-items: center;
      z-index: 3;
      height: 100%;
      .el-input__prefix-inner{
        //  margin-top: 1px;
        height: 32px;
        display: flex;
        align-items: center;
      }
    }
    .el-icon-arrow-left, .el-icon-arrow-right {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #F6F5EE;
      color: #848382;
      border-radius: 12px;
      line-height: 24px;
    }
    .el-input__suffix{
      //line-height: 32px;
      display: flex;
      align-items: center;
      z-index: 3;
      height: 100%;
      .el-input__suffix-inner{
        height: 32px;
        display: flex;
        align-items: center;
      }
    }

    ::v-deep.el-range-separator {
      line-height: 22px;
    }
  }
</style>

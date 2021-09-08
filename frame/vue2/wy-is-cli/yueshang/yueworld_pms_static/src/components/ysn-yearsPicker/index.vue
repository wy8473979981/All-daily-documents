<!--
 * @Author: xza
 * @Date: 2021-07-29 10:25:44
 * @LastEditTime: 2021-08-10 09:14:15
 * @LastEditors: xza
 * @Description: 年份选择
 * @FilePath: /baolong/src/components/ysn-yearsPicker/index.vue
-->
<template>
  <div
    class="ysn-year-picker"
  >
    <el-date-picker
      v-model="value"
      type="year"
      class="ysn-el-date"
      placeholder="选择年份"
      prefix-icon="none"
      clear-icon="icon-date-picker-none"
      @change="change"
    />
    <span class="el-input__prefix cursor-pointer" @click="changeYears(0)">
      <span class="el-input__prefix-inner">
        <i class="el-input__icon el-icon-arrow-left" />
      </span>
    </span>
    <span class="el-input__suffix cursor-pointer" @click="changeYears(1)">
      <span class="el-input__suffix-inner">
        <i class="el-input__icon el-icon-arrow-right" />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'YsnYearsPicker',
  components: {},
  inheritAttrs: false,
  props: {
    formDate: {
      type: Object,
      default: () => {}
    },
    noNext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: new Date(),
      dateIndexAdd: 0, // 增加记录
      dateIndexIn: 0, // 减少记录
      yearNum: 31536000000 // 年份差值
    }
  },
  computed: {
    getDate() {
      return this.formDate.date
    }
  },
  mounted() {
  },
  methods: {
    changeYears(flag) {
      if (flag) {
        if (!this.noNext) {
          this.$message({
            message: '完成当前年全部关账才可以查看下一年',
            type: 'error'
          })
          return
        }
        this.dateIndexAdd++
        const date_ = new Date(new Date().setDate(new Date().getDate() + 365 * this.dateIndexAdd))
        this.value = date_
        const datas_ = date_ - new Date()
        this.dateIndexIn = -parseInt(datas_ / this.yearNum)
        this.$emit('getChooseDate', this.value.toString().split(' ')[3])
        return
      }
      // 默认++
      this.dateIndexIn++
      // 获取上一年差
      const date_ = new Date(new Date().setDate(new Date().getDate() - (365 * this.dateIndexIn)))
      // 改变当前年份，需要通知 dateIndexIn 做对应计算
      this.value = date_
      const datas_ = new Date() - date_
      this.dateIndexAdd = -parseInt(datas_ / this.yearNum)
      this.$emit('getChooseDate', this.value.toString().split(' ')[3])
    },
    change(e) {
      this.$emit('getChooseDate', e.toString().split(' ')[3])
      // 第一步 当前年与后一年差值为0 需单独判断
      let add1 = new Date(new Date().setDate(new Date().getDate() + 365)).toString().split(' ')[3]
      if (e.toString().split(' ')[3] === add1) {
        this.dateIndexAdd = 1
        this.dateIndexIn = -1
        return
      }
      // 获取当前点击年与当前年差值
      const index_ = parseInt((e - new Date()) / this.yearNum)
      if (index_ < 0) {
        // 通知减
        this.dateIndexIn = index_ * -1
        this.dateIndexAdd = index_
        return
      }
      if (index_ > 0) {
        // 通知加
        this.dateIndexAdd = index_ + 1
        this.dateIndexIn = index_ * -1 - 1
        return
      }
      if (index_ === 0) {
        // 当前年
        this.dateIndexAdd = 0
        this.dateIndexIn = 0
        return
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 $inputBg:#FDFCFA;
  .ysn-year-picker{
    position: relative;
    width: 200px;
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
      width: 200px;
      height: 32px;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      &.el-input--prefix {
        ::v-deep.el-input__inner{
          padding-left: 15px;
          text-align: center;
          border-radius: 16px;
        }
      }
    }
    .ysn-el-date-icon{
      display: flex;
      align-items: center;
      height: 100%;
      .el-input__icon{
        line-height: 33px;
      }
    }
    .el-input__prefix{
      display: flex;
      align-items: center;
      z-index: 3;
      height: 100%;
      .el-input__prefix-inner{
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
  }
</style>

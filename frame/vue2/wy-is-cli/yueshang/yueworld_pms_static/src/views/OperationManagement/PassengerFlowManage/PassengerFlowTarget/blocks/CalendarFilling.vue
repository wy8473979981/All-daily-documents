<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:客流目标录入
-->
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'客流目标'" :width="'1050px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" label-position="top">
          <ysn-formItem class="mb-16" :form="dateInfo" :config="configData" :column="4" />
          <ysn-tableDesc class="mb-12" :config="tableDescConfig" />
          <ysn-calendar
            :value="new Date(dateInfo.date)"
            :first-day-pf-week="firstDayPfWeek"
            :is-input="isInput"
            :form="inputConfig"
            :prop="prop"
            @input="input"
          />
        </el-form>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right mt-40">
          <ysn-btn class="mr-16" @click="handleVisible">保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configData } from './CalendarFillingConfig.js'
export default {
  name: 'CalendarFilling',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: {
        targetCustomerFlowEntry: 0, // 年度指标（万人）
        list: [{ // 月入场数据集合
          date: new Date(),
          targetCustomerFlowEntryMonthly: 0, // 目标入场客流(人)(人)
          data: [{
            prop: 'targetCustomerFlowEntryDaliy'
          }]
        }]
      }
    }
  },
  data() {
    return {
      dateInfo: { // 日期数据
        date: new Date()
      },
      configData: configData.call(this),
      firstDayPfWeek: 7, // 日历从星期几开始显示
      outClose: true,
      isInput: true,
      inputConfig: null,
      prop: 'targetCustomerFlowEntryDaliy',
      tableDescConfig: [
        { text: '目标入场客流(人)', value: this.toThousands(0), decimal: 0 }
      ]
    }
  },
  watch: {
    'dateInfo.date'() { // 切换时间
      var isAdd = true// 是否需要添加这个月数据,入场数据没有出场数据也没有，出入场一起加
      for (var i = 0; i < this.formData.list.length; i++) {
        if (this.getDate(this.dateInfo.date) === this.getDate(this.formData.list[i].date)) {
          isAdd = false
          this.inputConfig = this.formData.list[i].data
          this.tableDescConfig = [
            { text: '目标入场客流(人)', value: this.toThousands(this.formData.list[i].targetCustomerFlowEntryMonthly), decimal: 0 }
          ]
          return
        }
      }
      if (isAdd) { // 添加选中的月份数据
        this.tableDescConfig = [
          { text: '目标入场客流(人)', value: this.toThousands(0), decimal: 0 }
        ]
        var dateNum = this.getDateNum(this.dateInfo.date)
        // 入场数据初始化
        var list = []
        for (var o = 0; o < dateNum; o++) {
          list.push({
            prop: 'targetCustomerFlowEntryDaliy'
          })
        }
        var entrDdata = {
          date: this.dateInfo.date,
          targetCustomerFlowEntryMonthly: 0, // 目标入场客流(人)
          data: list }
        this.formData.list.push(entrDdata)
      }
      this.inputConfig = list
      console.log(this.formData)
    }
  },
  mounted() { // 数据初始化，先默认当月
    console.log(this.formData)
    var dateNum = this.getDateNum(new Date())
    // 入场数据初始化
    for (var j = 0; j < this.formData.list.length; j++) {
      if (this.getDate(new Date()) === this.getDate(this.formData.list[j].date)) {
        this.tableDescConfig = [
          { text: '目标入场客流(人)', value: this.toThousands(this.formData.list[j].targetCustomerFlowEntryMonthly), decimal: 0 }
        ]
        var entryData = this.formData.list[j].data
      }
    }
    if (entryData.length < dateNum) {
      for (var i = entryData.length; i < dateNum; i++) {
        entryData.push({
          prop: 'targetCustomerFlowEntryDaliy'
        })
      }
      console.log(entryData)
    }
    this.inputConfig = entryData
    console.log(this.formData)
  },
  methods: {
    input() { // 输入数据时计算总人数
      console.log(this.formData)
      var value = 0
      for (var i = 0; i < this.inputConfig.length; i++) {
        if (this.inputConfig[i].targetCustomerFlowEntryDaliy != null && this.inputConfig[i].targetCustomerFlowEntryDaliy !== '') {
          value += parseInt(this.inputConfig[i].targetCustomerFlowEntryDaliy)
        }
      }
      this.tableDescConfig[0].value = this.toThousands(value)
      this.formData.targetCustomerFlowEntry = 0
      for (var j = 0; j < this.formData.list.length; j++) {
        if (this.getDate(this.formData.list[j].date) === this.getDate(this.dateInfo.date)) {
          this.formData.list[j].targetCustomerFlowEntryMonthly = value
        }
        this.formData.targetCustomerFlowEntry += this.formData.list[j].targetCustomerFlowEntryMonthly
      }
      this.formData.targetCustomerFlowEntry = (this.formData.targetCustomerFlowEntry / 10000).toFixed(2)
    },
    getDateNum(date) { // 根据时间获取月份的天数
      var curDate = new Date(date)
      var curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      curDate.setDate(0)
      return curDate.getDate()
    },
    getDate(date) { // 返回年-月
      var curDate = new Date(date)
      var curYear = curDate.getFullYear()
      var curMonth = curDate.getMonth()
      return curYear + '-' + curMonth
    },
    toThousands(num) { /* 数量每个三位数加个逗号 */
      var result = []; var counter = 0
      num = (num || 0).toString().split('')
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i !== 0) { result.unshift(',') }
      }
      return result.join('')
    },
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 保存
    handleVisible() {
      this.$emit('closeDialog')
    }
  }
}
</script>

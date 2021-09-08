<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="title" :width="'1050px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="currentFormData" label-position="top">
          <ysn-formItem class="mb-16" :form="dateInfo" :config="configData" :column="4" />
          <ysn-tableDesc class="mb-12" :config="tableDescConfig" />
          <ysn-calendar-number
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
import { formatNumber } from '@/utils/index'
export default {
  name: 'CalendarFilling',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {
          targetSalesVolume: 0, // 年度指标（万辆）
          list: [{ // 月入场数据集合
            date: new Date(),
            targetSalesVolumeMonthly: 0, // 目标入场车流(辆)
            data: [{
              prop: 'targetSalesVolumeDaliy'
            }]
          }]
        }
      }
    },
    title: { type: String, default: '' }
  },
  data() {
    return {
      currentFormData: {
        targetSalesVolume: 0, // 年度指标（万辆）
        list: [{ // 月入场数据集合
          date: new Date(),
          targetSalesVolumeMonthly: 0, // 目标入场车流(辆)
          data: [{
            prop: 'targetSalesVolumeDaliy'
          }]
        }]
      },
      dateInfo: { // 日期数据
        date: new Date()
      },
      configData: configData.call(this),
      firstDayPfWeek: 7, // 日历从星期几开始
      outClose: true,
      isInput: true, // 日历是否可输入
      inputConfig: null,
      prop: 'targetSalesVolumeDaliy',
      tableDescConfig: [
        { text: '销售额目标(元)', value: this.toThousands(0) }
      ]
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(val) {
        this.currentFormData = val
      }
    },
    'dateInfo.date'() { // 切换时间
      var isAdd = true// 是否需要添加这个月数据,入场数据没有出场数据也没有，出入场一起加
      for (var i = 0; i < this.currentFormData.list.length; i++) {
        if (this.getDate(this.dateInfo.date) === this.getDate(this.currentFormData.list[i].date)) {
          isAdd = false
          this.inputConfig = this.currentFormData.list[i].data
          this.tableDescConfig = [
            { text: '销售额目标(元)', value: this.toThousands(this.currentFormData.list[i].targetSalesVolumeMonthly) }
          ]
          return
        }
      }
      if (isAdd) { // 添加选中的月份数据
        this.tableDescConfig = [
          { text: '销售额目标(元)', value: this.toThousands(0) }
        ]
        var dateNum = this.getDateNum(this.dateInfo.date)
        // 入场数据初始化
        var list = []
        for (var o = 0; o < dateNum; o++) {
          list.push({
            prop: 'targetSalesVolumeDaliy'
          })
        }
        var entrDdata = {
          date: this.dateInfo.date,
          targetSalesVolumeMonthly: 0, // 目标入场车流(辆)
          data: list }
        this.currentFormData.list.push(entrDdata)
      }
      this.inputConfig = list
    }
  },
  mounted() { // 数据初始化，先默认当月
    var dateNum = this.getDateNum(new Date())
    // 入场数据初始化
    for (var j = 0; j < this.currentFormData.list.length; j++) {
      if (this.getDate(new Date()) === this.getDate(this.currentFormData.list[j].date)) {
        this.tableDescConfig = [
          { text: '销售额目标(元)', value: this.toThousands(this.currentFormData.list[j].targetSalesVolumeMonthly) }
        ]
        var entryData = this.currentFormData.list[j].data
      }
    }
    if (entryData.length < dateNum) {
      for (var i = entryData.length; i < dateNum; i++) {
        entryData.push({
          prop: 'targetSalesVolumeDaliy'
        })
      }
    }
    this.inputConfig = entryData
  },
  methods: {
    input() { // 输入数据时计算总人数
      var value = 0
      for (var i = 0; i < this.inputConfig.length; i++) {
        if (this.inputConfig[i].targetSalesVolumeDaliy != null && this.inputConfig[i].targetSalesVolumeDaliy !== '') {
          value += parseInt(this.inputConfig[i].targetSalesVolumeDaliy)
        }
      }
      this.tableDescConfig[0].value = this.toThousands(value)
      this.currentFormData.targetTrafficFlowEntry = 0
      for (var j = 0; j < this.currentFormData.list.length; j++) {
        if (this.getDate(this.currentFormData.list[j].date) === this.getDate(this.dateInfo.date)) {
          this.currentFormData.list[j].targetSalesVolumeMonthly = value
        }
        this.currentFormData.targetTrafficFlowEntry += this.currentFormData.list[j].targetSalesVolumeMonthly
      }
      this.currentFormData.targetTrafficFlowEntry = (this.currentFormData.targetTrafficFlowEntry / 10000).toFixed(2)
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
      return formatNumber(num)
      // var result = []; var counter = 0
      // num = (num || 0).toString().split('')
      // for (var i = num.length - 1; i >= 0; i--) {
      //   counter++
      //   result.unshift(num[i])
      //   if (!(counter % 3) && i !== 0) { result.unshift(',') }
      // }
      // return result.join('')
    },
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 保存
    handleVisible() {
      this.$emit('closeDialog')
    },
    formatNumber(num) {
      return formatNumber(num)
    }
  }
}
</script>

<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:客流数据填报
-->
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'客流填报'" :width="'1050px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" label-position="top">
          <ysn-tabs
            v-model="tabsActive"
            class="mb-16"
            :list="tabsList"
            @change="handleChange"
          />
          <ysn-formItem class="mb-16" :form="dateInfo" :config="configData" clearable />
          <ysn-tableDesc class="mb-12" :config="tableDescConfig" />
          <div v-if="tabsActive==0">
            <ysn-calendar
              :value="new Date(dateInfo.date)"
              :first-day-pf-week="firstDayPfWeek"
              :form="inputConfig"
              :prop="prop"
              @input="input"
            />
          </div>
          <div v-else>
            <ysn-calendar
              :value="new Date(dateInfo.date)"
              :first-day-pf-week="firstDayPfWeek"
              :form="inputConfig"
              :prop="prop"
              @input="input"
            />
          </div>
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
        customerFlowEntryTotal: 0, // 总入场客流(万人)
        customerFlowExitTotal: 0, // 总出场客流(万人)
        entryList: [{ // 月入场数据集合
          date: new Date(),
          customerFlowEntryMonthly: 0, // 当月入场客流汇总(人)
          data: [{
            prop: 'customerFlowEntryDaliy'
          }]
        }],
        exitList: [{ // 月出场数据集合
          date: new Date(),
          customerFlowExitMonthly: 0, // 当月出场客流汇总(人)
          data: [{
            prop: 'customerFlowExitDaliy'
          }]
        }]
      }
    }
  },
  data() {
    return {
      tabsList: [
        {
          label: '入场',
          name: '当月入场客流汇总(人)'
        },
        {
          label: '出场',
          name: '当月出场客流汇总(人)'
        }
      ],
      tabsActive: 0,
      configData: configData.call(this),
      firstDayPfWeek: 7, // 日历从星期几开始显示
      outClose: true,
      isInput: true,
      inputConfig: null,
      dateInfo: { // 日期信息
        date: new Date()
      },
      prop: 'customerFlowEntryDaliy',
      tableDescConfig: [
        { text: '当月入场客流汇总(人)', value: this.toThousands(0), decimal: 0 }
      ]
    }
  },
  watch: {
    'dateInfo.date'() { // 切换时间
      var isAdd = true// 是否需要添加这个月数据,入场数据没有出场数据也没有，出入场一起加
      for (var i = 0; i < this.formData.entryList.length; i++) {
        if (this.getDate(this.dateInfo.date) === this.getDate(this.formData.entryList[i].date)) {
          isAdd = false
          if (this.tabsActive === 0) {
            this.inputConfig = this.formData.entryList[i].data
            this.tableDescConfig = [
              { text: '当月入场客流汇总(人)', value: this.toThousands(this.formData.entryList[i].customerFlowEntryMonthly), decimal: 0 }
            ]
          } else {
            this.inputConfig = this.formData.exitList[i].data
            this.tableDescConfig = [
              { text: '当月出场客流汇总(人)', value: this.toThousands(this.formData.exitList[i].customerFlowExitMonthly), decimal: 0 }
            ]
          }
          return
        }
      }
      if (isAdd) { // 添加选中的月份数据
        this.tableDescConfig = [
          { text: '当月入场客流汇总(人)', value: this.toThousands(0), decimal: 0 }
        ]
        this.tableDescConfig = [
          { text: '当月出场客流汇总(人)', value: this.toThousands(0), decimal: 0 }
        ]
        var dateNum = this.getDateNum(this.dateInfo.date)
        // 入场数据初始化
        var entryList = []
        for (var o = 0; o < dateNum; o++) {
          entryList.push({
            prop: 'customerFlowEntryDaliy'
          })
        }
        var entrDdata = {
          date: this.dateInfo.date,
          customerFlowEntryMonthly: 0, // 当月入场客流汇总(人)
          data: entryList }
        this.formData.entryList.push(entrDdata)

        // 出场数据初始化
        var exitList = []
        for (var j = 0; j < dateNum; j++) {
          exitList.push({
            prop: 'customerFlowExitDaliy'
          })
        }
        var exitDdata = {
          date: this.dateInfo.date,
          customerFlowExitMonthly: 0, // 当月出场客流汇总(人)
          data: exitList }
        this.formData.exitList.push(exitDdata)
      }
      if (this.tabsActive === 0) {
        this.inputConfig = entryList
      } else {
        this.inputConfig = exitList
      }
    }
  },
  mounted() { // 数据初始化，先默认当月
    var dateNum = this.getDateNum(new Date())
    // 入场数据初始化
    for (var k = 0; k < this.formData.entryList.length; k++) {
      if (this.getDate(new Date()) === this.getDate(this.formData.entryList[k].date)) {
        this.tableDescConfig = [
          { text: '当月入场客流汇总(人)', value: this.toThousands(this.formData.entryList[k].customerFlowEntryMonthly), type: 'number', decimal: 0 }
        ]
        var entryData = this.formData.entryList[k].data
        var exitData = this.formData.exitList[k].data
      }
    }
    if (entryData.length < dateNum) {
      for (var i = entryData.length; i < dateNum; i++) {
        entryData.push({
          prop: 'customerFlowEntryDaliy'
        })
      }
    }
    this.inputConfig = entryData
    // 出场数据初始化
    if (exitData.length < dateNum) {
      for (var j = exitData.length; j < dateNum; j++) {
        exitData.push({
          prop: 'customerFlowExitDaliy'
        })
      }
    }
  },
  methods: {
    input() { // 输入数据时计算总人数
      var value = 0
      if (this.tabsActive === 0) { // 入场计算当月数和总数
        for (var i = 0; i < this.inputConfig.length; i++) {
          if (this.inputConfig[i].customerFlowEntryDaliy != null && this.inputConfig[i].customerFlowEntryDaliy !== '') {
            if (!isNaN(this.inputConfig[i].customerFlowEntryDaliy)) {
              value += parseInt(this.inputConfig[i].customerFlowEntryDaliy)
            }
          }
        }
        this.formData.customerFlowEntryTotal = 0
        for (var j = 0; j < this.formData.entryList.length; j++) {
          if (this.getDate(this.formData.entryList[j].date) === this.getDate(this.dateInfo.date)) {
            this.formData.entryList[j].customerFlowEntryMonthly = value
          }
          this.formData.customerFlowEntryTotal += this.formData.entryList[j].customerFlowEntryMonthly
        }
        this.formData.customerFlowEntryTotal = (this.formData.customerFlowEntryTotal / 10000).toFixed(2)
      } else { // 出场计算当月数和总数
        for (var i = 0; i < this.inputConfig.length; i++) {
          if (this.inputConfig[i].customerFlowExitDaliy != null && this.inputConfig[i].customerFlowExitDaliy !== '') {
            if (!isNaN(this.inputConfig[i].customerFlowEntryDaliy)) {
              value += parseInt(this.inputConfig[i].customerFlowExitDaliy)
            }
          }
        }
        this.formData.customerFlowExitTotal = 0
        for (var k = 0; k < this.formData.exitList.length; k++) {
          if (this.getDate(this.formData.exitList[k].date) === this.getDate(this.dateInfo.date)) {
            this.formData.exitList[k].customerFlowExitMonthly = value
          }
          this.formData.customerFlowExitTotal += this.formData.exitList[k].customerFlowExitMonthly
        }
        this.formData.customerFlowExitTotal = (this.formData.customerFlowExitTotal / 10000).toFixed(2)
      }
      this.tableDescConfig[0].value = this.toThousands(value)
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
    },
    handleChange(val) { /* 切换出入场 */
      if (this.tabsActive === 0) {
        for (var i = 0; i < this.formData.entryList.length; i++) {
          if (this.getDate(this.dateInfo.date) === this.getDate(this.formData.entryList[i].date)) {
            this.inputConfig = this.formData.entryList[i].data
            this.tableDescConfig = [
              { text: '当月入场客流汇总(人)', value: this.toThousands(this.formData.entryList[i].customerFlowEntryMonthly), decimal: 0 }
            ]
          }
        }
        this.prop = 'customerFlowEntryDaliy'
      } else {
        for (var j = 0; j < this.formData.exitList.length; j++) {
          if (this.getDate(this.dateInfo.date) === this.getDate(this.formData.exitList[j].date)) {
            this.inputConfig = this.formData.exitList[j].data
            this.tableDescConfig = [
              { text: '当月出场客流汇总(人)', value: this.toThousands(this.formData.exitList[j].customerFlowExitMonthly), decimal: 0 }
            ]
          }
        }
        this.prop = 'customerFlowExitDaliy'
      }
      console.log(this.tabsActive, 'tabsActive')
    }
  }
}
</script>

<!--
 * @Description: 客流填报
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
          <ysn-formItem class="mb-16" :form="formData" :config="configData" :column="4" />
        </el-form>
        <div class="passenger-title">{{ tabsList[tabsActive].name }}
          <div class="passenger-value">{{ tabsActive==0?toThousands(formData.customerFlowEntryMonthly): toThousands(formData.customerFlowExitMonthly) }}</div>
        </div>
        <el-calendar :value="formData.date" :first-day-of-week="firstDayPfWeek">
          <template
            slot="dateCell"
            slot-scope="{date, data}"
          >
            <div class="passenger-date">
              {{ data.day.split('-').slice(2).join('-') }}
            </div>
            <div class="passenger-form">
              <el-form>
                <ysn-formItem class="md-24" :form="form" :config="configDatas" :column="1" />
              </el-form>
            </div>
          </template>
        </el-calendar>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" @click="handleVisible">确认</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configData, configDatas } from './CalendarFillingConfig.js'
export default {
  name: 'CalendarFilling',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {}
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
      configDatas: configDatas.call(this),
      firstDayPfWeek: 7,
      form: {},
      value: new Date(),
      outClose: true
    }
  },
  methods: {
    toThousands(num) { /* 数量每个三位数加个逗号 */
      var result = []; var counter = 0
      num = (num || 0).toString().split('')
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i != 0) { result.unshift(',') }
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
      console.log(this.tabsActive, 'tabsActive')
    }
  }
}
</script>

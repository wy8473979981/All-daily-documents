<!--
 * @Author: xza
 * @Date: 2021-07-23 15:04:09
 * @LastEditTime: 2021-08-23 16:19:45
 * @LastEditors: xza
 * @Description: 关账配置弹窗
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/ClosingConfiguration/blocks/dialogFormAdd.vue
-->
<template>
  <div>
    <ysn-dialog
      :title="formData.programNameShort"
      :out-close="outClose"
      :is-determine="false"
      :is-cancel="false"
      :width="'920px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog(1)"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <!-- 年份选择 -->
        <ysn-yearsPicker
          :form-date="date_"
          :no-next="noNext"
          @getChooseDate="getChooseDate"
        />
        <YsnPageFormTableContent
          ref="ClosingConfiguration"
          :search-form="searchForm"
          :query-config="queryConfig"
          :table-config="getRealInfo"
          :table-order-config="tableOrderConfig"
          :before-qeury-data="beforeQeuryData"
          persmission="ClosingConfiguration"
          :hide-page="true"
          :table-slots="showSlots"
          @afterQueryData="afterQueryData"
        >
          <template #time="scope">
            <div v-if="scope.row.id + 1 === changeTimes_? false : true">{{ scope.row.time }}</div>
            <DatePickerForms v-else :dates="scope.row.time" @saveTimes="saveTimes" />
          </template>
          <template #operation="scope">
            <ysn-btn
              type="text"
              :disabled="notYears ? true : guanMonth.indexOf(scope.row.month.replace('月','')*1) !== -1? false :scope.row.month.replace('月','') * 1 < monthData?true:false"
              @click="changeTimes(scope.row.month.replace('月','')*1)"
            >
              设定关账时间
            </ysn-btn>
            <ysn-btn
              type="text"
              class="ml-20"
              :disabled="notYears ? true : guanMonth.indexOf(scope.row.month.replace('月','')*1) !== -1? false : scope.row.month.replace('月','')*1 < monthData - 1? true:scope.row.month.replace('月','')*1 > month? true : false"
              @click="changes(scope.row.month.replace('月','') * 1)"
            >
              {{ notYears ? '关账' : scope.row.status === '未关账'? '关账' : '反关账' }}
            </ysn-btn>
          </template>
        </YsnPageFormTableContent>
        <DialogForGuan
          :is-show-dialog="isShowDialogs"
          :get-data="getData"
          @closeDialog="closeDialog(0)"
          @getFeedBack="getFeedBack"
          @notFeedBack="notFeedBack"
        />
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { closingConfigurationApi } from '@/api'
import DialogForGuan from './items/dialogForGuan.vue'
export default {
  name: 'ClosingConfiguration',
  components: {
    DialogForGuan
  },
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    } // 表单数据
  },
  data() {
    return {
      noNext: false,
      notYears: false, // 判断是否是今年
      date_: {
        date: new Date()
      }, // 传入的日期
      changeTimes_: '', // 修改时间点击当前id
      showSlots: ['operation', 'time'],
      keyInfo: [], // 数据
      guanMonth: [], // 关账月集合
      notGUAN: [], // 反关账集合
      nowMonthId: '', // 当前反关账的月份
      update: 0,
      getData: 0,
      monthData: 0,
      isShowDialogs: false,
      isOk: false,
      outClose: true,
      month: 0,
      searchForm: {
        fuzzyEnquiry: '' // 模糊搜索
      },
      // 接口请求配置
      queryConfig: {
        api: closingConfigurationApi.closingConfigurationAddList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showSlots: ['operation', 'time']
      }
    }
  },
  computed: {
    formDataObj() {
      return this.formData
    },
    getRealInfo() {
      return [
        { t0: '序号', type: 'index', required: false, showFixed: true },
        { month: '关账月', itemType: 'text', required: false, width: 100, isShow: true, sortable: true },
        { time: '设定关帐时间', type: 'datetime', itemType: 'datePicker', required: false, width: 206, isShow: true, valueFormat: 'yyyy-MM-dd HH:mm:ss', sortable: true },
        { status: '关帐状态', itemType: 'text', required: false, width: 100, isShow: true, sortable: true },
        { operation: '操作', itemType: 'text', required: false, width: 260, isShow: true }
      ]
    }
  },
  created() {
    const date = new Date()
    this.month = date.getMonth() + 1
    this.monthData = date.getMonth() + 1
    for (let i = 1; i < date.getMonth() + 1; i++) {
      this.notGUAN.push(i)
    }
    this.guanMonth.push(date.getMonth() + 1)
  },
  methods: {
    // 年份选择组件反馈
    getChooseDate(e) {
      this.changeTimes_ = ''
      this.searchForm.fuzzyEnquiry = e
      this.$refs.ClosingConfiguration.getList()
      const nowYear_ = new Date().getFullYear().toString()
      if (nowYear_ === e) {
        this.notYears = false
        return
      }
      this.notYears = true
    },
    // 请求前数据
    beforeQeuryData(data) {
      return data
    },
    // 列表数据请求之前数据处理
    afterQueryData(data) {
      data.list.map(i => {
        i.month = i.month + '月'
      })
      this.keyInfo = data.list
      console.log(this.keyInfo)
      if (this.keyInfo[11].status === '已关账') {
        this.noNext = true
      } else {
        this.noNext = false
      }
      return data
    },
    // 关闭弹窗
    closeDialog(id) {
      if (!id) {
        this.isShowDialogs = false
        return
      }
      this.$emit('closeDialog')
    },
    // 关账/反关账操作
    changes(data) {
      const that = this
      that.nowMonthId = data
      if (that.notGUAN.indexOf(data) === -1) {
        // 关账逻辑
        that.getData = 0
        that.isShowDialogs = true
        return
      }
      // 反关账逻辑
      that.getData = 1
      that.isShowDialogs = true
      return
    },
    // 确认关账--当前月改为反关账月
    getFeedBack() {
      const that = this
      console.log(this.keyInfo)
      that.keyInfo.map(i => {
        if (i.id + 1 === that.nowMonthId) {
          i.status = '已关账'
        }
      })
      if (this.keyInfo[11].status === '已关账') {
        this.noNext = true
      } else {
        this.noNext = false
      }
      that.guanMonth = that.guanMonth.filter(i => {
        return i !== that.nowMonthId
      })
      that.notGUAN.push(that.nowMonthId)
      this.monthData = this.month + 1
      // 确认关账关闭修改时间
      this.changeTimes_ = ''
    },
    // 反关账确认--当前月改为关账月
    notFeedBack() {
      const that = this
      that.keyInfo.map(i => {
        if (i.id + 1 === that.nowMonthId) {
          i.status = '未关账'
        }
      })
      that.notGUAN = that.notGUAN.filter(i => {
        return i !== that.nowMonthId
      })
      that.guanMonth.push(that.nowMonthId)
      that.monthData = that.nowMonthId
    },
    // 修改关账时间
    changeTimes(id) {
      this.changeTimes_ = id
    },
    // 保存时间
    saveTimes(val) {
      // 保存时间
      closingConfigurationApi.closingConfigurationAddSave(this.changeTimes_).then(res => {
        if (res) {
          this.keyInfo.map(i => {
            if (i.id + 1 === this.changeTimes_) {
              i.time = val
              this.$message({
                message: '设置关账时间格式成功',
                type: 'success'
              })
              this.changeTimes_ = ''
            }
          })
        }
      })
    }
  }
}
</script>

<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="demo"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-16">导入</ysn-btn>
        <ysn-btn type="reset">导出</ysn-btn>
      </template>

    </YsnPageContent>
    <calendar-filling :form-data="formData" :is-show-dialog="dialogAddVisible" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import {
  passengerFlowApi
} from '@/api'
import {
  searchConfig,
  tableConfig
} from './config'
import calendarFilling from './blocks/CalendarFilling'
export default {
  name: 'PassengerFlowTargetEntry',
  components: {
    calendarFilling
  },
  data() {
    return {
      dialogAddVisible: false, // 客流填报弹窗
      // 搜索form
      searchForm: {
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: passengerFlowApi.passengerFlowBookList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: false,
        operationWidth: '200'
      },

      // 请求后的数据
      reqData: {},
      formData: {}
    }
  },
  methods: {
    closeDialog() {
      console.log('关闭弹窗')
      this.dialogAddVisible = false
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
      //   return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
      console.log(data)
    },
    // 列表单行点击
    rowClick(row) {
      console.log(row)
      this.formData = row
      this.dialogAddVisible = true
    }
  }
}
</script>
<style>
	.el-calendar__header{/* 隐藏日历月份选择 */
		display: none;
	}
	.el-calendar{/* 日历背景颜色 */
		background-color: #F6F5EE;
	}
	.el-dialog__body{/* 日历边距 */
		padding: 0 24px;
	}
	.el-calendar__body{/* 日历框属性设置 */
		padding: 0;
	}
	.el-calendar-table__row .prev{/* 日期表格属性设置 */
		height: 63px;
		width: 142px;
	}
	.el-calendar-table .el-calendar-day{/* 日期表属性设置 */
		height: 63px;
		width: 142px;
		padding: 0;
	}
	.el-calendar-table thead th{/* 日历头部属性设置 */
		width: 142px;
		height: 25px;
		padding: 0;
		line-height: 24px;
		padding-left: 100px;

		border-bottom: 1px solid #dfe6ec;
		border-right: 1px solid #dfe6ec;
		border-left: 1px solid #dfe6ec;
		border-top: 1px solid #dfe6ec;
	}
	.el-calendar-table:not(.is-range) td.next{/*隐藏下个月的日期*/
		visibility:hidden;
	}

	.el-calendar-table:not(.is-range) td.prev{/*隐藏上个月的日期*/
		visibility: hidden;
	}
	.passenger-title{/* 弹框汇总人数标题样式 */
		margin-bottom: 10px;
		font-size: 14px;
		display: flex;
	}
	.passenger-value{/* 弹框汇总人数值样式 */
		font-weight: bold;
		color: #1C4C7F;
		font-size: 18px;
		line-height: 18px;
		font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
	}
	.passenger-date{/* 日期样式 */
		display: flex;
		justify-content: end;
		padding: 8px 16px 4px 0;
	}
	.passenger-form{/* 输入框样式 */
		margin: 0 4px 5px 9px;
		height: 29px;
	}
</style>

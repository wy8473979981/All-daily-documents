<template>
  <el-calendar
    :class="{'head-right':headPosition=='right',
             'head-left':headPosition=='left',}"
    :value="value"
    :first-day-of-week="firstDayPfWeek"
    type="prev-month"
  >
    <template
      slot="dateCell"
      slot-scope="{date, data }"
    >
      <div v-if="form" class="calendar-input">
        <div class="passenger-date">
          {{ parseInt(data.day.split('-').slice(2).join('-')) }}
        </div>
        <div v-if="(new Date(data.day)).getMonth()==(new Date(value)).getMonth()" class="passenger-form">
          <el-form>
            <el-input
              v-model="form[getIndex(data)][prop]"
              v-onlyNumber="{model:['form',getIndex(data),prop]}"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入"
              type="number"
              @input="input"
            >
              <i v-if="$attrs.isSearch" slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-form>
        </div>
      </div>
      <div v-if="holidaySetting" class="calendar-info">
        <div v-if="formData.programName" class="calendar-info">
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="dataList.indexOf(data.day)===-1?data.day+`是否标记为节假日?`:`是否取消节假日?`"
            confirm-text="是"
            cancel-text="否"
            @confirm="dataClick(data)"
          >
            <div v-for="item in dataList">
              <div v-if="item===data.day" class="holiday">
                <span class="holiday-span">假日</span>
              </div>
            </div>
            <div class="passenger-date">
              {{ parseInt(data.day.split('-').slice(2).join('-')) }}
            </div>
          </ysn-confirm>
        </div>
        <div v-else class="calendar-info" @click="test">
          <div v-for="item in dataList">
            <div v-if="item===data.day" class="holiday">
              <span class="holiday-span">假日</span>
            </div>
          </div>
          <div class="passenger-date">
            {{ parseInt(data.day.split('-').slice(2).join('-')) }}
          </div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  name: 'YsnCalendar',
  props: {
    value: { /* 日期时间 */
      type: Date,
      default: () => {
        return new Date()
      }
    },
    firstDayPfWeek: { /* 周起始日 */
      type: Number,
      default: () => {
        return 7
      }
    },
    headPosition: { /* 头部位置, 右边right,左边left*/
      type: String,
      default: () => {
        return 'right'
      }
    },
    holidaySetting: { /* 是否可设置节假日 */
      type: Boolean,
      default: () => {
        return false
      }
    },
    form: { // 数据
      type: Array,
      default: () => {
      }
    },
    prop: {
      type: String,
      default: () => {
        return 'customerFlowEntryDaliy'
      }
    },
    type: { // 输入的类型
      type: String,
      default: () => {
        return 'number'
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dataList: [] // 选择的节假日日期
    }
  },
  watch: {
    value() {
      if (this.holidaySetting) {
        this.getDataList()
      }
    }
  },
  mounted() {
    if (this.holidaySetting) {
      this.getDataList()
    }
  },
  methods: {
    getDataList() {
      var date = this.value
      // 当前选择的月
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var lastDay = new Date(year, month, 0).getDate()
      var time = new Date()
      for (var i = 1; i <= lastDay; i++) {
        time.setFullYear(year, month - 1, i)
        if (time.getDay() === 0 || time.getDay() === 6) {
          this.dataList.push(year + '-' + (month < 10 ? '0' + month : month) + '-' + (i < 10 ? '0' + i : i))
        }
      }
      // 上个月
      var upYear = date.getFullYear()
      var upMonth = date.getMonth()
      if (date.getMonth() === 0) {
        upYear -= 1
        upMonth = 12
      }
      var upLastDay = new Date(upYear, upMonth, 0).getDate()
      var uptime = new Date()
      for (var i = 1; i <= upLastDay; i++) {
        uptime.setFullYear(upYear, upMonth - 1, i)
        if (uptime.getDay() === 0 || uptime.getDay() === 6) {
          this.dataList.push(upYear + '-' + (upMonth < 10 ? '0' + upMonth : upMonth) + '-' + (i < 10 ? '0' + i : i))
        }
      }
      // 下个月
      var doYear = date.getFullYear()
      var doMonth = date.getMonth() + 2
      if (date.getMonth() === 11) {
        doYear += 1
        doMonth = 1
      }
      var doLastDay = new Date(doYear, doMonth, 0).getDate()
      var doTime = new Date()
      for (var i = 1; i <= doLastDay; i++) {
        doTime.setFullYear(doYear, doMonth - 1, i)
        if (doTime.getDay() === 0 || doTime.getDay() === 6) {
          this.dataList.push(doYear + '-' + (doMonth < 10 ? '0' + doMonth : doMonth) + '-' + (i < 10 ? '0' + i : i))
        }
      }
    },
    getIndex(data) { // 获取日期下标
      return data.day.split('-').slice(2).join('-') - 1
    },
    // 选择日期和取消日期
    dataClick(value) {
      var index = this.dataList.indexOf(value.day)
      if (index === -1) {
        this.dataList.push(value.day)
      } else {
        this.dataList.splice(index, 1)
      }
    },
    input() {
      this.$emit('input')
    },
    test() {
      this.$message.error('请选择项目')
    }
  }
}
</script>

<style lang="scss">
	.el-calendar-table thead th{/* 日历头部属性设置 */
      &:first-child, &:last-child {
		background-color: #EFEDEA;
      }
	}
	.el-calendar-table__row {
      td {
        // 修改每一个日期td标签
        &:first-child, &:last-child {
          background-color: #EFEDEA;
        }
      }
	}
	.head-right{/* 头部居右 */
		.el-calendar-table thead th{/* 日历头部属性设置 */
			padding-right: 16px;
			text-align: right;
		}
	}
	.head-left{/* 头部居左 */
		.el-calendar-table thead th{/* 日历头部属性设置 */
			text-align: left;
		}
	}

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
	}
	.el-calendar-table .el-calendar-day{/* 日期表属性设置 */
		height: 63px;
		padding: 0;
	}
	.el-calendar-table td.is-selected{/* 去掉默认当日选中样式 */
		background-color: #F6F5EE;
	}
	.el-calendar-table thead th{/* 日历头部属性设置 */
		height: 25px;
		padding: 0;
		line-height: 24px;
		border-bottom: 1px solid #dfe6ec;
		border-right: 1px solid #dfe6ec;
		border-left: 1px solid #dfe6ec;
		border-top: 1px solid #dfe6ec;
	}
	.calendar-input{
		.passenger-date{/* 日期样式 */
			text-align: right;
			padding: 8px 16px 4px 0;
		}
		.passenger-form{/* 输入框样式 */
			margin: 0 4px 5px 9px;
			height: 29px;
		}
		.el-input--medium .el-input__inner{
			border: 0;
			border-radius: 100px;
			height: 29px;
		}
	}
	.calendar-info{
		position: relative;
		height: 100%;
		.passenger-date{/* 日期样式 */
            height: 100%;
            display: flex;
            justify-content: center;
			align-items: center;
		}

		.holiday{/* 节假日样式 */
			position: absolute;
			right: 4px;
			top: 6px;
			.holiday-span{
				border: 2px solid #B3D9E8;
				color: #ffffff;
				background-color: #48A0C3;
				padding: 2px 5px;
				border-radius: 50px;
			}
		}
	}
</style>

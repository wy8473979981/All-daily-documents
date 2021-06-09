//商业公司加班申请单

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">中心/公司:</span>
        <span class="span-value">{{form.bizEntityJson.centerOrgName}}</span>
			</p>
      <p>
				<span class="span-title">部门:</span>
        <span class="span-value">{{form.bizEntityJson.deptName}}</span>
			</p>
      <p>
				<span class="span-title">今年已加班申请时数:</span>
        <span class="span-value">{{form.bizEntityJson.totalOvertimeHour}}</span>
			</p>
    </div>
    <div  class="template-content" v-for="(item,index) in form.bizEntityJson.detailList" :key="index">
      <p>
        <span class="span-title">姓名:</span>
        <span class="span-value">{{item.applyUserName}}</span>
      </p>
      <p>
        <span class="span-title">职位:</span>
        <span class="span-value">{{item.positionName}}</span>
      </p>
      <p>
        <span class="span-title">职级:</span>
        <span class="span-value">{{item.positionLevel}}</span>
      </p>
      <p>
        <span class="span-title">加班日期:</span>
        <span class="span-value">{{item.overtimeDate && item.overtimeDate.slice(0,10)}}</span>
      </p>
      <p>
        <span class="span-title">加班开始时间:</span>
        <span class="span-value">{{item.fromTime}}</span>
      </p>
      <p>
        <span class="span-title">加班结束时间:</span>
        <span class="span-value">{{item.toTime}}</span>
      </p>
      <p>
        <span class="span-title">时数:</span>
        <span class="span-value">{{item.totalHour}}</span>
      </p>
      <p>
				<span class="span-title">加班类型:</span>
				<span v-if="item.overworkType == 1" class="span-value">休息日加班</span>
				<span v-if="item.overworkType == 2" class="span-value">法定假日加班</span>
				<span v-if="item.overworkType == 3" class="span-value">延时加班</span>
			</p>
       <p>
				<span class="span-title">补贴方式:</span>
				<span v-if="item.subsidyType == 1" class="span-value">安排调休</span>
				<span v-if="item.subsidyType == 2" class="span-value">支付工资</span>
			</p>
      <p>
        <span class="span-title">加班原因:</span>
        <span class="span-value">{{item.reason}}</span>
      </p>
    </div>
  </div>
</template>
<script>
const data = {};
export default {
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
        this.form = val;
        console.log(this.form,777)
			}
		}
	},
  data() {
    return {
	    form: data
    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>
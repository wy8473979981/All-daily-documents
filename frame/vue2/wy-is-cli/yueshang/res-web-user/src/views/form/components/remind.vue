<template>
	<!-- <div class="remind-wrapper">
		<i class="el-icon-warning remind-icon"></i>
    1、单笔≤200万，月度累计≤2000万且不超过资金预算的10%的预算内调剂事项，由事业部总审批<br>
    2、批准支付金额一栏由事业部财务部或财务管理中心财务部填写<br>
    3、此单不能作为实际付款依据，总部成本只能根据此单的内容，将实际的进度款付款单导入资金计划的预算外额度。<br>
    4、仅涉及工程成本付款的，可勾选调剂框，如选择项目内调剂的，必须在备注中注明调剂合同名称和金额<br>
    5、事业部分管副总：事业一部-蔡国梁、事业二部-张洪峰、置地-洪群峰、浙江事业部-张俊<br>
    6、2020年1月份之前按照集团要求不能新增预算，如有紧急需求，请单独上会申请
	</div> -->
	<div class="remind-wrapper" v-show="list.length > 0">
		<i class="el-icon-warning remind-icon"></i>
		<i v-if="isShow" class="el-icon-arrow-up remind-icon-up" @click="isShow = false"></i>
		<i v-if="!isShow" class="el-icon-arrow-down remind-icon-down" @click="isShow = true"></i>
		<div v-if="isShow">
			<p class="remind-content" v-for="(i,j) in list" :key="i.id">{{j+1 + '. ' + i.msgContent}}</p>
		</div>
		<div v-else class="show-box">
			<p></p>
		</div>
	</div>
</template>
<script>
import reference from '@/apis/apis/reference';
import { mapState } from 'vuex';
export default {
  props: ['pid'],
  data() {
    return {
			list: [],
			isShow: true
    }
  },
	computed: {
		...mapState(['userInfo', 'menuTreeItem']),
	},
	created() {
		this.getList();
	},
  methods: {
    async getList() {
	  const id = this.$route.query.processId || this.pid || this.menuTreeItem.id;
	  if(!id) {
		return;
	  }
      await reference.findPmProcessMsgPage(id).then(res => {
        if(res.code == 1 && res.data){
					this.list = res.data;
        }
      }).catch(err => console.log(err))
		}
  }
}
</script>>
<style lang="scss" scoped>
.remind-wrapper {
	position: relative;
	margin: 15px 0;
	background: #FFF5D7;
	padding: 5px 30px 5px;
	font-size: 10px;
	color:rgba(51,51,51,1);
	line-height: 20px;
}
.el-icon-warning.remind-icon {
	font-size: 16px;
	color:#FB1D1D;
	position: absolute;
	top: 8px;
	left: 10px;
}
.remind-icon-up, .remind-icon-down {
	font-size: 16px;
	position: absolute;
	right: 10px;
	top: 8px;
	cursor: pointer;
}
.show-box {
	height: 20px;
}
.remind-content {
	// line-height: 20px;
	// text-indent: -1em;
	// margin-left: 1em;
	font-size: 12px;
}
</style>
<style lang="scss">
	// .el-icon-warning.remind-icon {
	// 	color: red;
	// }
</style>
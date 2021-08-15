<template>
	<div class="flow-wrapper">
		<div class="record">
			<el-row class="title">
				<!-- 审批历史 -->
			</el-row>
			<el-steps class="flow-steps" :space="60" direction="vertical" :active="nowStep" finish-status="success">
				<el-step v-for="(j,k) in historyList" :key="k">
					<template slot="description">
						<el-row style="color:#333">{{k+1}} <i class="user"></i>{{j.approveUserName}}  |  {{j.stepName}} <span class="node-group" v-if="j.nodeGroupName">({{j.nodeGroupName}})</span><span class="status"> <span style="margin-right:10px">{{j.createdDate | filterDate}}</span>{{j.approveOpinion}}</span></el-row>
						<el-row style="color:#757575;padding-left:20px"> {{j.approveRemark}}</el-row>
					</template>
				</el-step>
			</el-steps>
		</div>
	</div>
</template>
<script>

  export default {
		props: ['historyList'],
    data() {
      return {
				nowStep: -1
      }
		},
		watch: {
			historyList: {
				deep: true,
				immediate: true,
				handler: function(val) {
					if(!val) return;
					val.forEach((e,i) => {
					if(e.approveOpinion) {
						this.nowStep = i+1;
					}
				});
				}
			}
		},
		filters: {
			filterDate(val) {
				if(val) {
					return val.slice(0,16)
				} else {
					return ''
				}
			}
		}
  }
</script>
<style lang="scss" scoped>
	.flow-wrapper {
		border-top: 1px solid #ECF0F2;
		.node-group {
			color: #F5A623;
		}
		.flow {
			border-bottom: 1px solid #ECF0F2;
			padding-bottom: 10px;
		}
		.title {
			padding: 15px 0;
			font-size: 14px;
			color: #676767;
		}
		.flow-content {
			span {
				margin-right: 10px;
				line-height: 24px;
				color: #333;
			}
		}
	}
</style>
<style lang="scss">
	.flow-steps {
		.el-step__head.is-success {
			color: #3F8DE9;
			border-color: #3F8DE9;
		}
		.el-step__icon-inner {
			border-color: #333;
		}
		.status {
			color: #A9A9A9;
			margin-left: 20px;
		}
		.el-step__description {
			margin-top: -8px;
		}
		.user{
      display: inline-block;
      background: url('../../../assets/images/avatar.png') no-repeat center top;
      background-size: auto 100%;
      background-origin: content-box;
      width: 26px;
      height: 26px;
      margin: 0 10px;
      vertical-align: middle;
      cursor: pointer;
    }
	}
</style>
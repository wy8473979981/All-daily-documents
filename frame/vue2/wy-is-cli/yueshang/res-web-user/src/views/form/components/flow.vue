<template>
	<div class="flow-wrapper">
		<div class="flow no-print" v-show="!showHistory">
			<el-row class="min-title">
				审批流程
			</el-row>
			<el-row class="flow-content">
				<span v-for="(v,i) in flows" :key="i">{{i+1+'.'+ v.stepName  + (i == flows.length-1 ? '' : '  >>')}}</span>
			</el-row>
		</div>
		<div class="record">
			<el-row class="min-title">
				审批记录
			</el-row>
			<el-steps class="flow-steps" :space="60" direction="vertical" :active="nowStep" finish-status="success">
				<el-step v-for="(j,k) in stepList" :key="k" :class="{'not-approve': !j.approveOpinion}" style="page-break-inside:avoid;">
					<i class="el-icon-success" slot="icon"></i>
					<template slot="description">
						<!-- <div class="left-border-box" :class="{'left-border-box-two': j.stepRank ==2}" v-if="j.approveOpinion && k != stepList.length -1 && !((j.displayNumber + '').includes('1.'))"/> -->
						<div class="left-border-box" :class="{'left-border-box-two': j.stepRank ==2}" v-if="j.leftBoder && k != stepList.length -1 && !((j.displayNumber + '').includes('1.'))"/>
						<el-row :class="{'step-two': j.stepRank ==2,'step':true}">
						  <span class="icon-wrap">
								<i class="not-sp" v-if="j.approveType == 1 && !j.currStepFlg"></i>
							  <i class="el-icon-success already-sp" v-if="j.approveOpinion && j.approveType != 1"></i>
							  <i class="now-sp" v-if="j.currStepFlg"></i>
							</span>
							{{j.displayNumber}} 
							{{j.approveUserName}}<span v-if="j.approveUserName">  |  </span>{{j.stepName}}
							<span v-if="j.stepGroupName">
								/  <span class="step-group">{{j.stepGroupName}}</span>
							</span>
							<span v-else></span>
							<span v-if="j.approvePositionName">{{'. '+ j.approvePositionName}}</span>
							<span v-if="j.lockFlg">（锁定）</span>
							<span v-else style="color:#1e5494">（由发起人手动选择）</span>
							<span></span>
							<span class="status">
								<span v-if="j.approveType != 1">{{j.approveDate | filterDate}}</span>
								<span style="margin-left:5px">{{j.approveType | filterApproveType}}</span>
							</span> 
							<span v-show="j.nodeNum > 0" style="color:#468CEB;margin-left:15px">{{j.nodeNum}}个二级审批</span>
							<span v-if="j.messageList && j.messageList.length > 0" @click="showMessageList(k)" style="cursor:pointer;color:#4A90E2;font-size:14px;margin-left:15px">
								留言
								<i v-if="!j.showMessageList" class="el-icon-arrow-up"></i>
								<i v-else class="el-icon-arrow-down"></i>
							</span>
							<span v-if="(j.approveType == 2 || j.approveType == 3) && status == '审批中' && '|' + userInfo.userid + '|' == j.approveUserId" style="cursor:pointer;color:#4A90E2;font-size:14px;margin-left:15px" @click="$emit('showRepDialogZ', j)">追加</span>
						</el-row>
						<el-row :class="{'remark-two': j.stepRank ==2,'remark':true}"> 
							{{ (status == '驳回' || status == '审批中') && j.approveType == 1 && j.approveRemark && j.approveDate ? j.approveDate.slice(5,16) : '' }} 
							<span :class="{'sys-remark': isSysRemark(j.approveRemark),'user-remark':true}">
								<!-- {{j.approveType == 1 && j.approveRemark ?  '【上次审批意见：' + j.approveRemark + '】' : j.approveRemark}} -->
								<span v-if="j.approveType == 1 && j.approveRemark">【上次审批意见：{{j.approveRemark}}】</span>
								<span v-else :class="{'disagree-remark': isDisAgree(j.approveRemark)}">{{j.approveRemark}}</span>
							</span>
						</el-row>
						<div :class="{'share-list':true, 'list-two': j.stepRank ==2}" v-if="!j.showMessageList && j.additionalList && j.additionalList.length > 0" style="background: #FFFFFF; padding: 0; margin: 0 0 0 35px;">
							<div class="share-content" v-for="(s,v) in (j.additionalList)" :key="v">
								<p>
									<span class="name">{{s.createdUserName}}</span>
									<span class="content type">追加</span>
									<span class="time">{{s.updatedDate | filterTime}}</span>
								</p>
								<span class="content color">{{s.content}}</span>
							</div>
						</div>
						<div :class="{'share-list':true, 'list-two': j.stepRank ==2}" v-if="!j.showMessageList && j.messageList && j.messageList.length > 0">
							<div class="share-content" v-for="(s,v) in (j.messageList)" :key="v">
								<p>
									<span class="name">{{s.createdUserName}}</span>
									<span class="content type">{{s.referMsgId ? '发送给' : '共享给'}}</span>
									<span class="name">{{s.userNames}}</span>
									<span class="time">{{s.updatedDate | filterTime}}</span>
									<img class="replay-icon" src="@/assets/images/replay.png" alt="">
									<span class="replay" @click="replay(s)">回复</span>
								</p>
								<span class="content color">{{s.content}}</span>
							</div>
						</div>
					</template>
				</el-step>
			</el-steps>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
  export default {
		props: ['stepList','showHistory','status'],
    data() {
      return {
				nowStep: -1
      }
		},
		watch: {
			stepList: {
				deep: true,
				immediate: true,
				handler: function(val) {
					if(!val) return;
					const arr = JSON.parse(JSON.stringify(val)).reverse();
					let alSp = arr.find(i => i.approveOpinion && i.approveType != 1 && !(i.displayNumber + '').includes('.')) || {displayNumber: 0};
					let num = alSp.displayNumber + 1;
					val.forEach((e,i) => {
						if(e.approveType == 2 || e.approveType == 3) {
							this.nowStep = i + 1;
						}
						e.order = e.displayNumber;
						if((e.order + '').includes('.')) {
							e.order = e.order - 1;
						}
						if(e.order < num) {
							e.leftBoder = true;
							if(e.stepGroupName && !e.stepGroupName.includes('会签') && e.approveType == 1) {
								e.leftBoder = false;
							}
						}
					});
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			flows: {
				get() {
					if(this.stepList) {
						let arr = JSON.parse(JSON.stringify(this.stepList)).filter(e => !(e.displayNumber + '').includes('.'));
						let result = [];
						arr.forEach((e,i) => {
							if(!e.stepGroupName) {
								e.stepGroupName = e.stepName;
							}
							if(e.stepGroupName && e.stepGroupName == (arr[i-1] && arr[i-1].stepGroupName)) {
								result[result.length -1].stepNum += 1;
								let num = result[result.length -1].stepNum;
								result[result.length -1].stepName = num ?  e.stepGroupName + '(+' + num + ')' : e.stepGroupName;
							} else {
								e.stepNum = 0;
								result.push(e)
							}
						})
						return result;
					}
				}
			}
		},
		methods: {
			showMessageList(index) {
				this.$set(this.stepList[index],'showMessageList',!this.stepList[index].showMessageList)
			},
			replay(s) {
				this.$emit('showRepDialog',s)
			},
			isSysRemark(v) {
				v = v ? v : '';
				if(v.includes('自动同意') || v.includes('系统自动跳过') || v.includes('延期未签')) {
					return true;
				}
				return false;
			},
			isDisAgree(v) {
				v = v ? v : '';
				if(v.includes('不同意')) {
					return true;
				}
				return false;
			}
		},
		filters: {
			filterDate(val) {
				return val ? val.slice(0,16) : ''
			},
			filterTime(val) {
				return val ? val.slice(5,16) : ''
			},
			filterApproveType(val) {
				const obj = {1: '未签批', 2: '已签批',3: '系统自动跳过'};
				return obj[val];
			}
		}
  }
</script>
<style lang="scss" scoped>
	.flow-wrapper {
		border-top: 1px solid #ECF0F2;
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
		display: block\0;
		.el-step.is-vertical {
			display: block;
			min-height: 60px\0;
		}
		.el-step.is-vertical .el-step__head {
			display: none;
		}
		// .not-approve {
		// 	.is-success {
		// 		i {
		// 			background: #ccc !important;
		// 		}
		// 	}
		// }
		.el-step__description {
			padding-right: 0;
			height: 100%;
			// position: relative;
			.left-border-box {
				position: absolute;
				top: 20px;
				left: 18px;
				bottom: 0px;
				width: 2px;
				background: #3F8DE9;
			}
			.left-border-box-two {
				top: 0;
			}
		}
		.el-step__main {
			width: 100%;
			overflow: hidden;
		}
		.share-list {
			margin: 10px 0 10px 40px;
			background: #FBFBFB;
			// background: pink;
			padding: 10px 20px 10px 20px;
			p {
				line-height: 26px;
				// color: #333;
				color: #656565;
			}
			.name {
				// color: #4A90E2;
				color: #333;
			}
			.share-content {
				border-bottom: 1px solid #ECEEEF;
				padding-bottom: 5px;
			}
			.share-content:last-child {
				border: none;
			}
			.replay {
				color: #4A90E2;
				cursor: pointer;
			}
			.time {
				color: #999;
				margin: 0 10px 0 10px;
			}
			.replay-icon {
				width: 12px;
				height: 12px;
				margin-right: 3px;
				vertical-align: middle;
				cursor: pointer;
			}
			.content {
				// margin: 0 8px;
				word-wrap:break-word; 
			}
			.content.type {
				margin: 0 5px;
			}
			.content.color {
				color: #5a5a5a;
			}
		}
		.share-list.list-two {
			// 该图标变更
			// margin-left: 55px;
			margin-left: 90px;
		}
		.step {
			color: #333;
			font-size: 14px;
			.step-group {
				color: #F5A623;
			}
			.icon-wrap {
				margin-right: 10px;
			}
			.already-sp {
				font-size: 20px;
				color: #3F8DE9;
				vertical-align: text-top;
			}
			.not-sp {
				display: inline-block;
				background: url('../../../assets/images/not-sp.png') no-repeat center top;
				background-size: auto 100%;
				background-origin: content-box;
				width: 18px;
				height: 18px;
				vertical-align: text-top;
			}
			.now-sp{
				display: inline-block;
				background: url('../../../assets/images/now-sp.png') no-repeat center top;
				background-size: auto 100%;
				background-origin: content-box;
				width: 18px;
				height: 18px;
				vertical-align: text-top;
				cursor: pointer;
			}
		}
		.step-two {
			padding-left: 30px;
		}
		.remark {
			color:#A9A9A9;
			// padding-left:10px;
			padding-left:35px;
			i {
				color: #333;
				margin-left: 5px;
			}
			.user-remark {
				color: #757575;
			}
			.sys-remark {
				color: #F5A623 !important;
			}
			.disagree-remark {
				color: red !important;
			}
		}
		.remark-two {
			// padding-left: 50px;
			padding-left: 65px;
		}
		.is-success .el-step__icon-inner.is-status.el-icon-check {
			background: #3F8DE9;
			border-radius: 50%;
			color: #fff;
		}
		.el-step__icon-inner {
			font-weight: 400;
		}
		// .el-step__head.is-success {
		// 	color: #3F8DE9;
		// 	border-color: #3F8DE9;
		// }
		.el-step__icon.is-text {
			border: none;
			font-size: 18px;
		}
		.el-step__head.is-process {
			border-color: transparent !important;
			font-size: 18px;
		}
		.el-step__head.is-wait {
			color: #ccc;
			border-color: transparent;
		}
		.el-step__icon-inner {
			border-color: #333;
		}
		.status {
			color: #A9A9A9;
			margin-left: 10px !important;
		}
		.el-step__description {
			margin-top: -8px;
		}
		.el-icon-success {
			font-size: 22px;
			color: #ccc;
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
<template>
	<div class="flow-wrapper">
		<div class="flow">
      <el-row style="margin-bottom:20px">
        <span class="flow-title">审批流程</span>
        <span class="flow-min-title">注：前有<i class="el-icon-star-on"></i>属于会签节点</span>
      </el-row>
      	<el-row class="flow-content" v-for="(stepList,j) in flowData" :key="stepList.conditionId">
        <p class="title">{{j + 1 + '. '}}{{stepList.conditionName}}</p>
        <div v-if="stepList.processStepShowVoList.length > 0">
          <span v-for="(v,i) in stepList.processStepShowVoList" :key="i">
            <span v-if="v.nodeGroupName && v.nodeGroupName.includes('会签')">
              <span v-if="v.displayNumber != (stepList.processStepShowVoList[i-1] && stepList.processStepShowVoList[i-1].displayNumber)">{{v.displayNumber + '.'}}</span>
              <span>
                  <i class="el-icon-star-on"></i>
                  {{v.stepName}}
              </span>
              <i class="el-icon-right" v-if="v.displayNumber != (stepList.processStepShowVoList[i+1] && stepList.processStepShowVoList[i+1].displayNumber)"></i>
            </span>
            <span v-else>
              {{(v.displayNumber ? v.displayNumber + '.' : '')+ (v.stepName)}}
              <i class="el-icon-right" v-if="i != stepList.processStepShowVoList.length -1"></i>
            </span>
          </span>
        </div>
        <div v-else>该流程下暂无数据</div>
			</el-row>
      <!-- 以下为旧代码 -->
			<!-- <el-row class="flow-content" v-for="(stepList,j) in flowData" :key="stepList.conditionId">
        <p class="title">{{j + 1 + '. '}}{{stepList.conditionName}}</p>
        <div v-if="stepList.list.length > 0">
          	<span v-for="(v,i) in stepList.list" :key="i">
              <span v-if="v.nodeGroupName == '会签'">
                {{i + 1 + '.'}}
                <span v-for="k in v.nodes.split('/')" :key="k">
                    <i class="el-icon-star-on"></i>
                    {{k}}
                </span>
                <span v-if="i == stepList.list.length-1"></span>
                <i v-else class="el-icon-right"></i>
              </span>
              <span v-else>
                {{i+1+'.'+ (v.nodeGroupName || v.stepName)}}
                 <span v-if="i == stepList.list.length-1"></span>
                 <i v-else class="el-icon-right"></i>
              </span>
            </span>
        </div>
        <div v-else>该流程下暂无数据</div>
			</el-row> -->
		</div>
	</div>
</template>
<script>
  import { mapState } from 'vuex';
  import approval from '@/apis/apis/approval';
  export default {
		props: ['showAllFlow','pid'],
    data() {
      return {
				flows: [
					'地产公司财务部负责人','地产公司相关部门负责人','地产公司总经理','事业部财务部','事业部分管副总（多）','事业部总经理','成本管理中心造价部负责人','财务管理中心总经理 (+1)','副总裁','总裁','决策委员会' 
				],
        nowStep: -1,
        flowData: []
      }
		},
		watch: {
			showAllFlow: {
        immediate: true,
        handler(val) {
          if(val) {
            this.getListNew()
          }
        }
      }
    },
    computed: {
      ...mapState(['userInfo', 'menuTreeItem']),
    },
    methods: {
      // 获取流程列表数据
      async getListNew() {
        const params = {
          processId: this.pid || this.menuTreeItem.id,
          rows: 999
        };
        await approval.getPmProcessFlow(params).then(res => {
          if(res.code == 1 && res.data){
            // this.tableData = res.data;
            const data = res.data.content;
            this.flowData = data;
            // console.log(this.flowData,777)
          }
        });
      },
      // 获取流程图列表数据
      async getList() {
        const params = {
          processId: this.pid || this.menuTreeItem.id,
          rows: 999
        };
        await approval.getPmProcessFlow(params).then(res => {
          if(res.code == 1 && res.data){
            // this.tableData = res.data;
            const data = res.data.content;
            data.forEach(v => {
              v.list = [];
              // 第一步二级节点变为一级节点children
              v.setpVoList.forEach(e => {
                if(e.stepRank == 2) {
                  v.setpVoList.forEach(c => {
                    if(c.processNodeId == e.parentStepId) {
                      if(!c.children) {
                        // c.children = [e.processNodeName];
                        c.children = e.processNodeName;
                      } else {
                        c.children += '/' + e.processNodeName;
                      }
                    }
                  })
                }
              })
              // 第二步二级节点变为一级节点children
              v.setpVoList.forEach(d => {
                if(d.stepRank == 1 && !d.nodeGroupId) {
                  d.type = 'item';
                  d.nodes = d.processNodeName;
                  v.list.push(d)
                } else if (d.stepRank == 1 && d.nodeGroupId) {
                  const res = v.list.some( f => {
                    return f.nodeGroupId == d.nodeGroupId;
                  })
                  if(!res) {
                    const obj = {
                      type: 'items',
                      nodes: '',
                      nodeGroupId: d.nodeGroupId,
                      nodeGroupName: d.nodeGroupName,
                      children: ''
                    };
                    obj.nodes = d.processNodeName;
                    if(d.children) {
                      obj.children = d.children;
                    }
                    v.list.push(obj)
                  } else {
                    v.list.forEach(h => {
                      if(h.nodeGroupId == d.nodeGroupId) {
                        h.nodes += '/' + d.processNodeName;
                        if(d.children) {
                          h.children += '/' + d.children
                        }
                      }
                    })
                  }
                }
              })
              this.flowData = data;
            });
          }
        });
      }
  }
  }
</script>
<style lang="scss" scoped>
	.flow-wrapper {
    .flow-title {
      font-size: 18px;
      color: #333;
      margin-right: 10px;
    }
    .el-icon-star-on {
      font-size: 14px;
      color: #EF2941;
      margin-left: 2px;
    }
    .flow-min-title {
      font-size: 12px;
      color: #F5A623;
      i {
        color: #EF2941;
      }
    }
		.flow {
			padding-bottom: 10px;
		}
		.flow-content {
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ECF0F2;
      .title {
        font-size: 12px;
        font-weight: 800;
        line-height: 26px;
        color: #333;
      }
      div {
        padding-left: 15px;
      }
			span {
				margin-right: 0px;
				line-height: 24px;
				color: #333333;
        font-size: 12px;
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
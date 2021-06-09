<template>
  <div>
    <el-drawer
			class="serial-drawer"
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="980px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <!-- 流程图内容 -->
          <div v-for="i in flowData" :key="i.index">
             <p style="line-height:30px">{{i.conditionName}}流程</p>
            <div class="nodeList" style="display:flex;">
            <div class="node" v-for="(j,k) in i.list" :key="k">
             <!-- 节点形态1 -->
            <div style="display: flex" v-if="!j.children">
              <div class="zhixian" v-if="k != 0"></div>
              <div class="label">
                <el-tooltip :content="j.processNodeName" placement="bottom" effect="light">
                   <el-button class="flow-button">{{j.processNodeName}}</el-button>
                </el-tooltip>
              </div>
            </div>
            <!-- 节点形态2 -->
            <div style="display:flex" v-if="j.children">
              <div v-if="k != 0">
              <div class="zhixian">
              </div>
              <div class="xuxian">
              </div>
            </div>
            <div>
              <div class="label">
                 <!-- {{j.nodes}} -->
                 <el-tooltip :content="j.nodes" placement="bottom" effect="light">
                   <el-button class="flow-button">{{j.nodes}}</el-button>
                </el-tooltip>
              </div>
              <div class="shuxuxian">

              </div>
              <div class="label">
                <!-- {{j.children}} -->
                 <el-tooltip :content="j.children" placement="bottom" effect="light">
                   <el-button class="flow-button">{{j.children}}</el-button>
                </el-tooltip>
              </div>
            </div>
            </div>
            <!-- 节点组形态2 -->
            <!-- <div v-if="false" style="display:flex">
              <div class="zhixian"></div>
              <div class="label">节点组1</div>
              <div class="zhixian"></div>
            </div> -->
             <!-- 节点组形态2 -->
            <!-- <div v-else style="display:flex"> 
              <div>
              <div class="zhixian">
              </div>
              <div class="shuzhixian">
              </div>
            </div>
             <div>
              <div class="label">
                 节点组1
              </div>
              <div class="kongbai">
              </div>
              <div class="label">
                节点组2
              </div>
            </div>
             <div>
              <div class="zhixian">
              </div>
              <div class="shuzhixian2">
              </div>
            </div>
            </div> -->
            <!-- 节点组形态2 -->
          </div>
          </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import flowSet from '@/apis/apis/flowSet';
export default {
  name: 'Detail',
  props: ['open', 'id'],
  data() {
    return {
			options: [
				{
					label: '有效',
					value: 1
				},
				{
					label: '无效',
					value: 0
				}
			],
      form: {
				name: ''
      },
      flowData: []
    }
  },
  created() {
    this.getList();
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  methods: {
    // 获取流程图列表数据
    async getList() {
      const params = {
        processId: '13'
      };
      await flowSet.getPmProcessFlow(params).then(res => {
        if(res.code == 1 && res.data){
          // this.tableData = res.data;
          const data = res.data.content;
          data.forEach(v => {
            console.log(v.stepVoList)
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
                console.log(d)
                d.type = 'item';
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
                    children: ''
                  };
                  obj.nodes = d.processNodeName;
                  obj.children = d.children;
                  v.list.push(obj)
                } else {
                  v.list.forEach(h => {
                    if(h.nodeGroupId == d.nodeGroupId) {
                      h.nodes += '/' + d.processNodeName;
                      h.children += '/' + d.children
                    }
                  })
                }
              }
            })
            console.log(data)
            this.flowData = data;
          });
        }
      });
    },
    cancel() {
      this.fast = false;
    },
    save() {

    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 980px;
}

.el-form-item {
	margin-bottom: 20px;
}
.con {
	iframe {
		width: 100%;
		height: calc(100% - 50px);
  }
  .node {
    display: flex;
    .label {
      width: 100px;
      height: 50px;
      // background-color: #ccc;
      color: red;
    }
    .zhixian {
      width: 50px;
      height: 25px;
      border-bottom: 1px solid #333;
    }
    .xuxian {
      margin-left: 25px;
      width: 25px;
      height: 100px;
      border-bottom: 1px dashed #333;
      border-left: 1px dashed #333;
    }
    .shuzhixian {
      margin-left: 25px;
      width: 25px;
      height: 100px;
      border-bottom: 1px solid #333;
      border-left: 1px solid #333;
    }
    .shuzhixian2 {
      width: 25px;
      height: 100px;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
    }
    .shuxuxian {
      height: 50px;
      width: 50px;
      border-right: 1px dashed #333;
    }
    .kongbai {
      height: 50px;
      width: 50px;
    }
  }
}
</style>
<style lang="scss">
  .flow-button {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 10px;
    padding: 0px;
    white-space: unset;
    overflow: hidden;
    margin: 0px;
  }
</style>
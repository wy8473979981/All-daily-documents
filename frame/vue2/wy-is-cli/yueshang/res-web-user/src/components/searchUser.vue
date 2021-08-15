<!-- 审批单选择人员组件 -->
<template>
  <div>
    <el-dialog class="serach-user-dialog" title="请选择人员" :visible.sync="show" :append-to-body="true" :width="multiple ? '1010px' : '680px'" v-dialogDrag>
        <div class="list-page">
          <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
            <el-col :span="24" style="display: flex; align-items: center;">
              <div>
                <el-input class="search-input" clearable size="mini" v-model="query.name" placeholder="请输入人员姓名或id"></el-input>
              </div>
              <el-button @click="reset" size="mini">重置</el-button>
              <!-- <el-button @click="search" size="mini" type="success">搜索</el-button> -->
              <el-button style="margin-left:640px" v-if="multiple" @click="confirm" size="mini" type="success">确定</el-button>
            </el-col>
          
          </el-row>
          <div class="content">
            <!-- 机构树 -->
            <div>
              <el-tree
                class="org-tree"
                :data="treeList"
                node-key="id"
                :props="{
                  children: 'children',
                  label: 'text'
                }"
                :highlight-current="true"
                :expand-on-click-node="false"
                :default-expand-all="false"
                @node-click="clickNode"
                ref="tree"/>
                <!-- 默认展开节点注释 -->
                <!-- :default-expanded-keys="idArr" -->
            </div>
            <!-- 人员列表 -->
            <div class="user-list">
              <el-table
                :data="userList"
                height="400"
                stripe
                @row-click="rowClick"
                style="width: 100%">
                <el-table-column
                  style="cursor: pointer;"
                  prop="userName"
                  :label="selectDepartment"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <i class="el-icon-user-solid" style="margin-right:10px"></i>
                    <span>{{ scope.row.userName}} | {{scope.row.orgName}} | {{scope.row.positionName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 已选人员列表 -->
            <div class="user-list select-list" v-if="multiple">
              <el-table
                :data="checkedList"
                height="400"
                stripe
                style="width: 100%">
                <el-table-column
                  style="cursor:pointer"
                  prop="userName"
                  label="已选择人员列表"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <i class="el-icon-user-solid" style="margin-right:10px"></i>
                    <span class="select-name">{{ scope.row.userName}} | {{scope.row.positionName}}</span>
                    <el-button @click="removeUser(scope.$index)" style="float:right" size="mini">移除</el-button>
                    <!-- <span>{{ scope.row.userName}}<el-button @click="removeUser(scope.$index)" style="float:right" size="mini">移除</el-button></span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import reference from '@/apis/apis/reference';
import approval from '@/apis/apis/approval';
import { mapState } from 'vuex';
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    pushShare: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      timeOut: null,
      treeList: [],
      idArr: [],
      userList: [],
      query: {
        name: ''
      },
      // // 已选择人员列表
      checkedList: [],
      selectDepartment: '人员列表'
    };
  },
  computed: {
    ...mapState(['userInfo']),
    show: {
      get (val) {
        if (val.open) {
          this.query.name = ''
        }
        if (val.open && this.multiple) {
          if (this.pushShare) {
            this.shareFindUserByApproveId()
          } else {
            this.pushFindUserByApproveId()
          }
        }
        return this.open
      },
      set (val) {
        this.$emit('close')
      }
    },
    // checkedList: {
    //   get(val) {
    //     return this.list || []
    //   }
    // }
  },
  watch: {
    query: {
      handler(val) {
        if(val.name) {
          clearTimeout(this.timeOut);
          this.timeOut = setTimeout(() => {
            const param = {
              deptId: 0,
              ...this.query
            }
            this.getUserSerachList(param);
          }, 500);
        }
      },
      deep: true
    },
    show(val) {
      if(val) {
        this.getOrgTree();
        this.findMyDeptUserList();
      }
    }
  },
  created() {
    // this.getOrgTree();
    // this.findMyDeptUserList();
    // console.log(this.checkedList)
  },
  methods: {
     async getOrgTree() {
      // const enterpriseId = this.userInfo.enterpriseId;
      await reference.getOrgTree().then(res => {
       if(res.code == 1 && res.data){
          this.$set(this,'treeList', res.data);
          const data = res.data;
          data[0].children.forEach(e => {
            if(e.children.length) {
              e.children.forEach(v => {
                this.idArr.push(v.id)
              })
            }
          })
        }
      }).catch(err => console.log(err));
    },
    // 默认显示当前机构人员列表
    async findMyDeptUserList() {
      const enterpriseId = this.userInfo.enterpriseId;
      const loginName = this.userInfo.userid;
      await reference.findMyDeptUserList({enterpriseId,loginName}).then(res => {
       if(res.code == 1 && res.data){
          this.userList = res.data;
          if (res.data.length > 0) {
            this.selectDepartment = res.data[0].orgName
          }
      }
      }).catch(err => console.log(err));
    },
    // 查询已添加审批单推送人员
    async pushFindUserByApproveId() {
      const approveId = this.$route.query.id
      const enterpriseId = this.userInfo.enterpriseId
      await approval.pushFindUserByApproveId({approveId, enterpriseId}).then(res => {
        if(res.code == 1 && res.data){
          this.checkedList = res.data
        }
      }).catch(err => console.log(err));
    },
    // 查询已添加审批单共享人员
    async shareFindUserByApproveId() {
      const param = {
        approveId: this.$route.query.id,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid
      }
      await approval.shareFindUserByApproveId(param).then(res => {
        if(res.code == 1 && res.data){
          this.checkedList = res.data
        }
      }).catch(err => console.log(err));
    },
    async getUserSerachList(param) {
      
      await reference.getUserSerachList(param).then(res => {
       if(res.code == 1 && res.data){
          this.userList = res.data;
        }
      }).catch(err => console.log(err));
    },
    search() {
      const param = this.query;
      this.getUserSerachList(param);
    },
    reset() {
      this.query.name = ''
    },
    rowClick(row) {
      // console.log(row)
      // 单选状态点击行直接关闭
      if(!this.multiple) {
        this.$emit('close', row)
      } else {
        if(this.checkedList.some(e => {
          return e.userCd == row.userCd
        })) return;
        this.checkedList.push(row)
      }
    },
    clickNode(val) {
      this.selectDepartment = val.text
      // 点击了树节点
      const param = {
        deptId: val.id
      }
      this.getUserSerachList(param);
    },
    removeUser(index) {
      this.checkedList.splice(index,1);
    },
    confirm() {
      this.$emit('close', this.checkedList)
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
@import "~@/assets/styles/common.scss";
.ys-tab-col-color {
  color: #df1717 !important;
}
.ys-text-blue {
  color: #1890ff;
}
.search-input{
  flex: 1;
  min-width: 120px;
  max-width: 200px;
}
.content {
  display: flex;
}
.org-tree {
  height: 400px;
  width: 300px;
  overflow-y: auto;
}
.user-list {
  margin-left: 20px;
  height: 400px;
  overflow-y: auto;
  .select-name {
    width: 195px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
  }
}
</style>
<style lang="scss">
  .serach-user-dialog {
    .el-dialog__body {
      padding: 0 20px 20px;
      .tool-bar {
        padding-top: 0;
      }
      .el-tree-node__expand-icon {
        font-size: 14px;
      }
      .el-table__body-wrapper {
        overflow-y: auto;
      }
      .el-table td {
        cursor: pointer;
      }
      .select-list .el-table .cell {
        line-height: 28px;
      }
      .el-table th, .el-table td {
        padding: 8px 0;
      }
    }
  }
</style>

<template>
<div>
<el-dialog class="serach-user-dialog" title="请选择人员" :visible.sync="show" :append-to-body="true" :width="multiple ? '1050px' : '750px'">
    <div class="list-page">
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="24" style="display: flex; align-items: center;">
          <div>
            <el-input class="search-input" clearable size="mini" v-model="query.name" placeholder="请输入人员姓名或id"></el-input>
          </div>
          <el-button @click="reset" size="mini">重置</el-button>
          <!-- <el-button @click="search" size="mini" type="success">搜索</el-button> -->
          <el-button style="margin-left:600px" v-if="multiple" @click="confirm" size="mini" type="success">确定</el-button>
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
            :default-expanded-keys="idArr"
            @node-click="clickNode"
            ref="tree"/>
        </div>
        <!-- 人员列表 -->
        <div class="user-list">
          <el-table
            :data="userList"
             stripe
             @row-click="rowClick"
            style="width: 100%">
            <el-table-column
              style="cursor:pointer"
              prop="userName"
              label="人员列表"
              width="300"
            >
              <template slot-scope="scope">
                <i class="el-icon-user-solid" style="margin-right:10px"></i>
                <span>{{ scope.row.userName}} | {{scope.row.orgName}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

         <!-- 已选人员列表 -->
        <div class="user-list" v-if="multiple">
          <el-table
            :data="checkedList"
             stripe
            style="width: 100%">
            <el-table-column
              style="cursor:pointer"
              prop="userName"
              label="已选择人员列表"
              width="300"
            >
              <template slot-scope="scope">
                <i class="el-icon-user-solid" style="margin-right:10px"></i>
                <span>{{ scope.row.userName}} | {{scope.row.positionName}} <el-button @click="removeUser(scope.$index)" style="float:right" size="mini">移除</el-button></span>
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
      query: {},
      // // 已选择人员列表
      checkedList: []
    };
  },
  computed: {
    ...mapState(['userInfo']),
    show: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close')
      }
    },
    // checkedList: {
    //   get(val) {
    //     if(this.list) {
    //       this.list.forEach(e => e.userName = e.name)
    //     }
    //     return this.list
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
    list(val) {
      if(val) {
        val.forEach(e => {
          e.userName = e.name;
          e.userCd = e.loginName;
        });
        const list = JSON.parse(JSON.stringify(val));
        this.checkedList = list;
      }
    }
  },
  created() {
    this.getOrgTree();
  },
  mounted() {},
  methods: {
     async getOrgTree() {
      const enterpriseId = this.userInfo.enterpriseId;
      await reference.getOrgTree(enterpriseId).then(res => {
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
      this.query = {};
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
      // 点击了树节点
      const id = val.id;
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
  max-width: 160px;
}
.content {
  display: flex;
}
.org-tree {
  max-height: 340px;
  width: 300px;
  overflow-y: scroll;
}
.user-list {
  margin-left: 20px;
  max-height: 340px;
  overflow-y: auto;
}
</style>
<style lang="scss">
  .serach-user-dialog {
    .el-dialog__body {
      padding: 0 20px;
      .tool-bar {
        padding-top: 0;
      }
    }
  }
</style>

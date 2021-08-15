<template>
  <div class="assistant-wrapper">
      <el-dialog
      title="助理设置"
      :visible.sync="fast"
      width="50%"
      class="assistant"
      >
      <el-row class="title" type="flex"><el-col>用户名称</el-col><el-col>授权人名称</el-col><el-col>权责</el-col><el-col>操作</el-col></el-row>
			<div v-for="(i,j) in userList" :key="i.val">
        <el-row @click.native="openDetail(j)" class="assis-user" type="flex">
          <el-col>{{i.userName}}</el-col>
          <el-col>{{i.accUserName}}</el-col>
          <el-col>{{i.dutys}}</el-col>
          <!-- <el-col><el-button size="mini" @click="deleteByAccreditIds(i.id)">删除</el-button></el-col> -->
          <el-col><span style="color:red" @click="deleteByAccreditIds(i.id)">删除</span></el-col>
        </el-row>
        <div class="info" v-show="i.showDetail">
          <span class="label">详细信息</span>
          <el-row class="detail" type="flex">
            <el-col>用户名称：{{i.userName}}</el-col>
            <el-col>授权人名称：{{i.accUserName}}</el-col>
          </el-row>
          <el-row>权责分配: 
          <el-checkbox v-model="i.jbpmFlg">出差报销</el-checkbox>
          <el-checkbox v-model="i.resFlg">网上审批</el-checkbox>
          </el-row>
          <el-row>
            <el-button @click="edit(i,j)" size="mini">保存</el-button>
            <el-button @click="deleteByAccreditIds(i.id)" size="mini">删除</el-button>
            <el-button @click="openDetail(j)" size="mini">取消</el-button>
          </el-row>
        </div>
      </div>
      <div style="padding:0 20px 20px;border-bottom: 1px solid #ECF0F2;">
        <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
      </div>
      <el-row style="margin-top:20px"><el-button style="border-radius:0" @click="add" size="mini" type="primary" plain>新增助理</el-button></el-row>
      <!-- 新增框 -->
      <div class="add-wrapper" v-show="showAdd">
          <el-row class="add-title" type="flex">
            <el-col>助理选择：
              <el-select
              class="assis-select"
              size="mini"
              v-model="accUserId"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              @change="handleSelect"
              >
                <el-option
                  v-for="item in options"
                  :key="item.userCd"
                  :label="item.userName + ' | ' + item.orgName"
                  :value="item.userCd">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="add-title" style="margin-top:5px">权责分配: 
          <el-checkbox style="margin-left:10px" v-model="jbpmFlg">出差报销</el-checkbox>
          <el-checkbox v-model="resFlg">网上审批</el-checkbox>
          </el-row>
           <el-row type="flex" justify="end" v-show="showAdd">
              <el-button style="border-radius:0" size="mini" @click="saveProcessAccredit" type="primary">保存</el-button>
              <el-button style="border-radius:0" @click="showAdd = false" size="mini">取消</el-button>
          </el-row>
        </div>
      <!-- <div class="info" v-show="showAdd">
          <span class="label">新增助理</span>
          <el-row class="detail" type="flex">
            <el-col>助理选择：
              <el-select
              size="mini"
              v-model="accUserId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入查询关键字"
              :remote-method="remoteMethod"
              @change="handleSelect"
              >
                <el-option
                  v-for="item in options"
                  :key="item.userCd"
                  :label="item.userName + ' | ' + item.orgName"
                  :value="item.userCd">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>权责分配: 
          <el-checkbox v-model="jbpmFlg">出差报销</el-checkbox>
          <el-checkbox v-model="resFlg">网上审批</el-checkbox>
          </el-row>
          <el-row>
            <el-button size="mini" @click="saveProcessAccredit">保存</el-button>
            <el-button @click="showAdd = false" size="mini">取消</el-button>
          </el-row>
        </div> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">关闭</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import { mapState } from 'vuex';
import reference from '@/apis/apis/reference';
import assistant from '@/apis/apis/assistant';
export default {
  name: 'Detail',
  mixins: [handle_paginator],
  props: ['showAassistant', 'id'],
  data() {
    return {
      showAdd: false,
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
			userList: [],
      jbpmFlg: false,
      resFlg: false,
      accUserId: '',
      accUserName: '',
      options: []
    }
  },
  created() {
    
  },
  computed: {
     ...mapState(['userInfo']),
    fast: {
      get() {
        return this.showAassistant
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    fast(val) {
      if(val) {
        this.getList()
      }
    }
  },
  methods: {
    // 新增助理人员
    add() {
      this.showAdd = true;
    },
    handleSelect(val) {
      const r = this.options.find(e => {
        return e.userCd == val;
      })
      this.accUserName =  r ? r.userName : '';
    },
    // 新增时的保存
    addUser() {
      console.log(this.checkList)
    },
    // 远程搜索方法
    remoteMethod(query) {
      if (query !== '') {
        const params = {
          deptId: 0,
          name: query
        };
        reference.getUserSerachList(params).then(res => {
        if(res.code == 1 && res.data){
            this.options = res.data;
          }
        }).catch(err => console.log(err));
      } else {
        this.options = [];
      }
    },
    openDetail(j) {
      // const r = this.userList[j].showDetail;
      // this.$set(this.userList[j], 'showDetail', !r)
    },
    cancel() {
      this.fast = false;
      Object.assign(this.$data, this.$options.data())
    },
    // 获取助理人员列表
    getList() {
      assistant.getList({enterpriseId:this.userInfo.enterpriseId,userId:this.userInfo.userid,...this.pageInfo}).then(res => {
        if (res.code == 1) {
          this.userList = res.data.content;
          this.userList.forEach(e => {
            e.dutys = '';
            if(e.jbpmFlg) {
              e.dutys += ' 出差报销 '
            }
            if(e.resFlg) {
              e.dutys += ' 网上审批 '
            }
          })
          this.pageInfo.sum_num = res.data.totalElements;
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 删除助理人员
    deleteByAccreditIds(id) {
      let param = [id];
      this.$confirm(`确认要删除吗？`,{type: 'warning'}).then(() => {
        assistant.deleteByAccreditIds(param).then(res => {
          if (res.code == 1) {
            this.getList();
          } else {
            if(res.message) {
              this.$message.error(res.message)
            }
          }
        })
      }).catch(err => console.log(err));
    },
    // 新增助理人员
    saveProcessAccredit() {
      if(this.jbpmFlg == false && this.resFlg == false) {
        this.$message.error('权责分配至少选一项')
        return
      }
      if(this.accUserId == '') {
        this.$message.error('助理不能为空')
        return
      }
      let param = {
        accUserId: this.accUserId,
        accUserName: this.accUserName,
        enterpriseId:this.userInfo.enterpriseId,
        userId: this.userInfo.userid,
        userName: this.userInfo.username,
        jbpmFlg: this.jbpmFlg,
        resFlg: this.resFlg
      }
      assistant.saveProcessAccredit(param).then(res => {
        if (res.code == 1) {
          this.showAdd = false;
          this.getList();
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 编辑助理人员
    edit(i,j) {
      if(i.jbpmFlg == false && i.resFlg == false) {
        this.$message.error('权责分配至少选一项')
        return
      }
      let param = {
        id: i.id,
        accUserId: i.accUserId,
        accUserName: i.accUserName,
        enterpriseId:this.userInfo.enterpriseId,
        userId: this.userInfo.userid,
        userName: this.userInfo.username,
        jbpmFlg: i.jbpmFlg,
        resFlg: i.resFlg
      }
      assistant.saveProcessAccredit(param).then(res => {
        if (res.code == 1) {
          this.getList();
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    }
  },
  filters: {
    // getDuty(i) {
    //   if(i.jbpmFlg && !) {
    //     return '出差报销'
    //   } else {
    //     return '出差报销'
    //   }
    // }
  }
}
</script>

<style lang="scss">
.assistant-wrapper {
  .assis-select {
   
    input {
        border-radius: 0 !important;
    }
 }
  .assistant {
    .title {
      background: #F2F4F6;
      font-size: 16px;
      color: #333;
      line-height: 32px;
    }
    .assis-user {
      line-height: 32px;
      cursor: pointer;
      // border-bottom: 1px solid #dddbdc;
    }
    .assis-user:nth-child(2) {
      background-color: #F2F4F6;
      background-color: red !important;
    }
    // .el-col {
    //   border: 1px solid #cad9ea;
    // }
    .add-wrapper {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ECF0F2;
      .add-title {
        color: #676767;
        line-height: 30px;
        font-size: 14px;
      }
    }
    .info {
      border: 1px solid #A4CDF2;
      margin: 20px 0 10px;
      position: relative;
      padding: 20px 10px;
      .el-row {
        line-height: 20px;
      }
      .detail {
        .el-col {
          border: none;
        }
      }
      .label {
        position: absolute;
        top: -14px;
        left: 2px;
        background: #fff;
        border: 1px solid #A4CDF2;
        padding: 5px;
        color: #1E7ACE;
      }
    }
  }
}
</style>
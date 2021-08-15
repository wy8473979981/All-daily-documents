<template>
  <el-container class="content-wrapper">
    <el-header style="padding-left:0">
      <span class="header-crumb">  位置：宝龙地产/地产/05-财务管理/预算管理 </span>
      <el-row style="float: right">
        <el-button @click="back" plain size="mini">返回</el-button>
        <el-button @click="preSave('draft')" type="primary" size="mini">存草稿</el-button>
        <el-button type="primary" plain size="mini">附件</el-button>
        <el-button type="primary" plain size="mini">其他附件</el-button>
        <el-button type="primary" plain size="mini">查看流程</el-button>
        <el-button type="success" plain size="mini">微信群</el-button>
      </el-row>
      <el-row style="margin-top:10px" :gutter="1">
        <el-col :span="2">查询号：</el-col>
        <el-col :span="4">发起人：{{userInfo.username}}</el-col>
        <el-col :span="2">状态：新增</el-col>
      </el-row>
    </el-header>
    <el-row style="font-size:22px;color:#333">
      <!-- 地产公司月预算外支出申请表(地产公司资金支付) -->
      {{ptext}}
    </el-row>
    <remind :pid="pid"></remind>
    <component v-if="showTest" :is="CName"></component>
		<electronicSignature ref="signature"></electronicSignature>
    <el-row style="padding-left:160px">
      <el-button v-if="showPre" type="primary" size="mini" @click="preSave('')">保存并填写审批人</el-button>
      <el-button v-else type="primary" size="mini" @click="save">发起</el-button>
    </el-row>
    <!-- 审批步骤列表 -->
    <div v-show="!showPre" class="step-list">
      <el-form label-width="auto" size="mini">
      <el-row v-for="(v,i) in stepList" :key="i">
        <el-col :span="12">
          <el-form-item
            :label="i+ 1 + '.' + v.stepName"
            >
            <el-input v-if="v.lockFlg" :disabled="true" v-model="v.approveUserName" size="mini"></el-input>
            <el-input v-else @click.native="checkApproveUser(v)" v-model="v.approveUserName" size="mini" placeholder="请选择审批人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </div>
    <!-- 责任人下拉框 -->
    <search-user :open="showSearchUser" @close="closeSearhUser"></search-user>
  </el-container>
</template>

<script>
import electronicSignature from './components/electronicSignature'
import approval from '@/apis/apis/approval';
import remind from './components/remind';
import { mapState } from 'vuex';
import Vue from 'vue';
// import template from './tem.js'

export default {
  name: 'Detail',
  props: ['pid','ptext','templateContentId'],
  components: {remind,electronicSignature},
  data() {
    return {
      showTest: false,
      nowStep: null,
      showSearchUser: false,
      showPre: true,
      stepList: [],
      form: {
        bizEntityJson: {
          projectCd: 'BL_DC_QB',
          fileId: ''
        },
        userId: '',
        enterpriseId: 1,
        approvalId: 0,
        deptId: '',
        mode: "A",
        processId: this.pid,
        status: "A",
        userName: ''
      },
      CName: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    console.log(this)
    this.getTemplateContentText();
  },
  methods: {
    // 获取审批单模块
    async getTemplateContentText() {
      const param = {
        templateContentId: this.templateContentId
      }
      await approval.getTemplateContentText(param).then(res => {
        if(res.code == 1 && res.data){
          console.log(res.data)
          const uploadUrl = 'api/file/uploadFile';
          const template = res.data.templateContent.content.split('%%%')[0];
          // const template = document.getElementById('testtem').innerHTML;
          const CName = 'test';
          this.CName = CName;
          const data = {...this.form,userInfo:this.userInfo,pid:this.pid};
          let fileList = [];
          let comp = res.data.templateContent.content.split('%%%')[1];
          comp = eval('(' + comp + ')');
          Vue.component(CName,comp);
          // Vue.component('test',{
          //   template: template,
          //   data() {
          //     return {
          //       text: '',
          //       form: {
          //         bizEntityJson: {

          //         }
          //       }
          //     }
          //   }
          // })
          this.showTest = true;
          // Vue.component('test',{
          //   template,
          //   data: function() {
          //     return{
          //       form: data,
          //       disabled: true,
          //       uploadUrl,
          //       fileList: [],
          //       fileList1: [],
          //       fileList2: [],
          //       fileList3: [],
          //       fileList4: [],
          //       optionsyt: [
          //         {dictCd: '餐饮',
          //         dictName: '餐饮'},
          //         {dictCd: '珠宝',
          //         dictName: '珠宝'},
          //         {dictCd: '儿童',
          //         dictName: '儿童'},
          //         {dictCd: '配套',
          //         dictName: '配套'},
          //         {dictCd: '服饰',
          //         dictName: '服饰'},
          //       ],
          //        optionsdw: [
          //         {dictCd: '固定点位',
          //         dictName: '固定点位'},
          //         {dictCd: '临时点位',
          //         dictName: '临时点位'},
          //         {dictCd: '宣传点位',
          //         dictName: '宣传点位'},
          //         {dictCd: 'ATM',
          //         dictName: 'ATM'},
          //         {dictCd: '其他',
          //         dictName: '其他'},
          //       ],
          //       optionszf: [
          //         {dictCd: '一次性支付',
          //         dictName: '一次性支付'}
          //       ]
          //     }
          //   },
          //   created() {
          //     this.getFile();
          //   },
          //   methods: {
          //     handleSuccess(response, file, fileList,param) {
          //       console.log(response, file, fileList,param)
          //       const fileId = response.data.fileId;
          //       if(!this.form.bizEntityJson.param) {
          //         this.form.bizEntityJson.param = '';
          //       }
          //       this.form.bizEntityJson.param += fileId;
          //       console.log(this.form.bizEntityJson.param)
          //     },
          //     beforeRemove(file, fileList) {
          //       return this.$confirm(`确定移除 ${ file.name }？`);
          //     },
          //     handleRemove(file, fileList,param) {
          //       console.log(file, fileList);
          //       const nowfile = file.response.data.fileId;
          //       let fileId = this.form.bizEntityJson.fileId;
          //       this.form.bizEntityJson.param = fileId.replace(nowfile,'');
          //     },
          //     getFile() {
          //       if(this.form.bizEntityJson.imageFiles) {
          //         this.$file.loadFiles({fileIds: this.form.bizEntityJson.imageFiles}).then(res => {
          //           if(res.code == 1 && res.data) {
          //             this.fileList1 = res.data.fileShowVoList;
          //             this.fileList1.forEach(e => {
          //               e.name = e.originalFilename;
          //             })
          //           }
          //         })
          //       }
          //       if(this.form.bizEntityJson.positionFiles) {
          //         this.$file.loadFiles({fileIds: this.form.bizEntityJson.positionFiles}).then(res => {
          //           if(res.code == 1 && res.data) {
          //             this.fileList2 = res.data.fileShowVoList;
          //             this.fileList2.forEach(e => {
          //               e.name = e.originalFilename;
          //             })
          //           }
          //         })
          //       }
          //       if(this.form.bizEntityJson.licenseFiles) {
          //         this.$file.loadFiles({fileIds: this.form.bizEntityJson.licenseFiles}).then(res => {
          //           if(res.code == 1 && res.data) {
          //             this.fileList3 = res.data.fileShowVoList;
          //             this.fileList3.forEach(e => {
          //               e.name = e.originalFilename;
          //             })
          //           }
          //         })
          //       }
          //       if(this.form.bizEntityJson.checklistFiles) {
          //         this.$file.loadFiles({fileIds: this.form.bizEntityJson.checklistFiles}).then(res => {
          //           if(res.code == 1 && res.data) {
          //             this.fileList4 = res.data.fileShowVoList;
          //             this.fileList4.forEach(e => {
          //               e.name = e.originalFilename;
          //             })
          //           }
          //         })
          //       }
          //     },
          //     downLoadFile(file) {
          //       console.log(file)
          //       if(file.showUrl) {
          //         window.open(file.showUrl, '_blank');
          //         return;
          //       }
          //       const fileIds = file.response.data.fileId;
          //       this.$file.loadFiles({fileIds}).then(res => {
          //         if(res.code ==1 && res.data) {
          //           const showUrl = res.data.fileShowVoList[0].showUrl;
          //           window.open(showUrl, '_blank');
          //         }
          //       })
          //     }
          //   }
          // });
        }
      });
    },
    checkApproveUser(v) {
      this.nowStep = v;
      this.showSearchUser = true;
    },
    closeSearhUser(val) {
      this.showSearchUser = false;
      if(val) {
        console.log(val)
        this.nowStep.approveUserId = val.userCd;
        this.nowStep.approveUserName = val.userName;
      }
    },
    back() {
      this.$router.go(-1);
    },
     // 发起
    async save() {
      const flag = this.stepList.every(e => e.approveUserName);
      if(!flag) {
        this.$message.closeAll()
        this.$message.error('各审批步骤的对应审批人不能为空，请先选择审批人');
        return;
      }
      this.form.userId = this.userInfo.userid;
      this.form.userName = this.userInfo.username;
      this.form.enterpriseId = this.userInfo.enterpriseId;
      this.form.stepList = this.stepList;
      this.form.templateContentId = this.templateContentId;
      const param = JSON.parse(JSON.stringify(this.form));
      param.bizEntityJson = JSON.stringify(param.bizEntityJson);
      await approval.startFlow(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.success('保存成功');
          this.$router.push('list');
        } else {
          if(res.message) {
            this.$message.error(res.message); 
          }
        }
      });
    },
    // 保存并获取审批人 // 存草稿
    async preSave(draft) {
      const form = JSON.parse(JSON.stringify(this.form));
      const bizEntityJson = JSON.stringify(form.bizEntityJson);
      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        bizEntityJson,
        processId: this.pid,
        templateContentId: this.templateContentId,
        userId: this.userInfo.userid,
        userName: this.userInfo.username
      }
      await approval.getProcessStepByProcessId(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
					this.$refs.signature.sendContractsSync()
          if(draft) {
            this.$message.success('草稿保存成功');
            this.$router.push('list');
          }
          this.stepList = res.data.stepVoList;
          this.form.approveId = res.data.approveId;
          this.showPre = false;
        } else {
          if(res.message) {
            this.$message.error(res.message); 
          }
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
.step-list {
  margin-top: 20px;
}
.content-wrapper {
  padding: 0 20px;
}
.header-crumb {
  vertical-align: sub;
  font-size: 14px;
  color: #9B9B9B;
}
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 562px;
}
.con{
  >div{
    >h3{
      margin-bottom: 20px;
    }
    >.el-row{
      margin-bottom: 20px;
    }
  }
}

.el-button--primary.is-plain:hover, .el-button--primary.is-plain:focus {
  color: #409EFF;
}
.amount {
  color: #676767;
  .inline-input {
    border: 1px solid #D1D4D8;
    width: 100px;
    height: 25px;
    margin: 0 2px;
  }
}

</style>

<style lang="scss">
.mt-30 {
  margin-top: 30px;
}
.amount {
  color: #676767;
  .inline-input {
    border: 1px solid #D1D4D8;
    width: 100px;
    height: 25px;
    margin: 0 2px;
  }
}
.sp-temp.disabled {
  // pointer-events: none;
  input {
    border: none;
  }
  .el-form-item__label::before {
    content: '' !important;
  }
}
.wd-20 {
  width: 20% !important;
}
.wd-30 {
  width: 30%;
}
.sp-temp {
  td {
    border: 1px solid #ccc;
  }
}
.zhaobiao {
  .el-row {
    padding: 2px 0;
    margin-top: 10px;
  }
  .el-row:nth-child(odd) {
    // background: pink;
  }
  .ht-30 {
    line-height: 30px;
    height: 30px;
  }
  .title {
    background: #f0f7ff;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
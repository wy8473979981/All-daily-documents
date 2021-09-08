// 宝龙地产/酒店/酒店集团/10-其他事务-例外事项文件 酒店 总部 物业公司 文化 下属公司  
 
<template>
  <!-- 例外事项审批 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>文件标题</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.fileTitle}">
            <el-input :class="{novalue: !form.bizEntityJson.fileTitle}" v-model="form.bizEntityJson.fileTitle"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span></span>
          <el-radio-group v-model="form.bizEntityJson.secretLevel">
            <el-radio :label="'0'">绝密</el-radio>
            <el-radio :label="'1'">机密</el-radio>
            <el-radio :label="'2'">保密</el-radio>
            <el-radio :label="'3'">内部公开</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>发起中心/公司</span>
         <el-input v-model="form.bizEntityJson.instigatedCompany" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>　</span>
          <!-- <el-radio-group v-model="form.bizEntityJson.urgencyLevel">
            <el-radio :label="true">急</el-radio>
            <el-radio :label="false">不急</el-radio>
          </el-radio-group> -->
          <el-checkbox v-model="form.bizEntityJson.urgencyLevel" true-label="true" false-label="false">急</el-checkbox>
        </div>
      </el-col>
    </el-row>
     <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" style="flex-wrap:nowrap">
          <span>文件内容简述(详细内容附后)</span>
          <rich-editor v-model="form.bizEntityJson.fileDesc" :disabled="form.bizEntityJson.disabled"></rich-editor>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" v-if="!form.bizEntityJson.disabled">
      <el-col :span="8" class="title-col">
        <h2>审批步骤</h2>
      </el-col>
      <el-col :span="16" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="addList">添加</span></p>
        </div>
      </el-col>
      <el-col :span="24" class="table-col right-col table-checkbox">
        <el-table ref="table" :data="form.bizEntityJson.customApproveList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="步骤" prop="stepName"/>
          <el-table-column label="审批人" prop="approveUserName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.approveUserName" @focus="showSearchUser = true;stepSelectIndex = scope.$index" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope">
              <span v-if="scope.$index == 0" style="color: #468CEBFF; cursor: pointer;" @click="moveDown(scope.$index)">下移</span>
              <span v-if="scope.$index > 0" style="color: #F56C6C; cursor: pointer;" @click="del(scope.$index)">删除</span>
              <span v-if="scope.$index > 0" style="color: #468CEBFF; cursor: pointer;" @click="moveUp(scope.$index)">上移</span>
              <span v-if="scope.$index > 0" style="color: #468CEBFF; cursor: pointer;" @click="moveDown(scope.$index)">下移</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.instigatedCompanyCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
const data = {};
const uploadUrl = 'api/file/uploadFile';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      showSearchOrg: false,
      showSearchUser: false,
      stepSelectIndex: -1
    }
  },
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
    },
	},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'instigatedCompany', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'instigatedCompanyCd', this.userInfo.centerOrgCd)
    }
    if(this.form.bizEntityJson.type1) {
      this.form.bizEntityJson.radio1 = '1'
    }
    if(this.form.bizEntityJson.type2) {
      this.form.bizEntityJson.radio1 = '2'
    }
    if(this.form.bizEntityJson.type3) {
      this.form.bizEntityJson.radio1 = '3'
    }
    if(this.form.bizEntityJson.type4) {
      this.form.bizEntityJson.radio1 = '4'
    }
    if(!this.form.bizEntityJson.customApproveList){
      this.$set(this.form.bizEntityJson, 'customApproveList', [])
    }
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.instigatedCompany = val.text
        this.form.bizEntityJson.instigatedCompanyCd = val.id
      }
      this.showSearchOrg = false
    },
    changeRadio(val) {
      if(val == 1) {
        this.form.bizEntityJson.type1 = true;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type3 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 2) {
        this.form.bizEntityJson.type2 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type3 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 3) {
        this.form.bizEntityJson.type3 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 4) {
        this.form.bizEntityJson.type4 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type3 = false;
      }
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.customApproveList[this.stepSelectIndex].approveUserName = val.userName
        this.form.bizEntityJson.customApproveList[this.stepSelectIndex].approveUserId = val.userCd
      }
      this.showSearchUser = false
    },
    addList() {
      const newData = {
        approveUserName: '',
        approveUserId: ''
      }
      this.form.bizEntityJson.customApproveList.push(newData)
      this.changeStepNames()
    },
    moveUp(index) {
      this.swapArray(this.form.bizEntityJson.customApproveList,index,index-1)
      this.changeStepNames()
    },
    moveDown(index) {
      if(index==this.form.bizEntityJson.customApproveList.length-1){
        this.$message.error('已经是最后一个元素，无法下移')
        return
      }
      this.swapArray(this.form.bizEntityJson.customApproveList,index,index+1)
      this.changeStepNames()
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    del(index) {
      this.form.bizEntityJson.customApproveList.splice(index, 1)
      this.changeStepNames()
    },
    changeStepNames(){
      this.form.bizEntityJson.customApproveList.forEach((item,index) => {
        item.stepName = '步骤' + (index+1)
        if(!item.approveUserName){
          item.approveUserName = ''
        }
        if(!item.approveUserId){
          item.approveUserId = ''
        }
      })
    },
    validate(){
      if(this.form.bizEntityJson.customApproveList.length == 0) return this.$message.error('请添加审批人'), false
      for (let key = 0; key < this.form.bizEntityJson.customApproveList.length; key++) {
        if(!this.form.bizEntityJson.customApproveList[key].approveUserName) return this.$message.error(this.form.bizEntityJson.customApproveList[key].stepName + ',请选择审批人'), false
      }
    }

  }
}
</script>

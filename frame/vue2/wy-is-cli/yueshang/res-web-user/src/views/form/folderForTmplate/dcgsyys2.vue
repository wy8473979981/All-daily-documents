// 地产公司月预算外支出 暂停开发

<template>
	<div :class="['sp-temp',{'disabled': form.bizEntityJson.disabled}]">
    <el-row style="margin-bottom:15px" :class="{'novalue': !form.bizEntityJson.degApproveFlg && !form.bizEntityJson.techApproveFlg && !form.bizEntityJson.hrApproveFlg && !form.bizEntityJson.ohterFlag}">
      <el-checkbox v-model="form.bizEntityJson.degApproveFlg">需成本审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.techApproveFlg">需技术审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.hrApproveFlg">需人力审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.ohterFlag">其他</el-checkbox>
    </el-row>
    <el-row>
        <el-radio-group @change="changeAdjustmentAttr" v-model="form.bizEntityJson.adjustmentAttr" :class="{'novalue': !form.bizEntityJson.adjustmentAttr}">
					<el-radio :label="'1'">项目内部调剂</el-radio>
					<el-radio :label="'2'">事业部内部调剂</el-radio>
					<el-radio :label="'3'">新增</el-radio>
					<el-radio :label="'4'">预算签批前支付</el-radio>
        </el-radio-group>
    </el-row>
     <el-row style="margin: 10px 0" class="amount">
      <el-col :span="12">
        不含本单事业部内本月已累计调剂<input :class="{'novalue': !form.bizEntityJson.totalAdjustAmount}" class="inline-input" aria-readonly="true" v-model="form.bizEntityJson.totalAdjustAmount"/>万元
      </el-col>
       <el-col :span="12">
        项目本月累计预算外单数<input :class="{'novalue': !form.bizEntityJson.projectNum}" class="inline-input" v-model="form.bizEntityJson.projectNum"/>金额<input :class="{'novalue': !form.bizEntityJson.projectAdjustAmount}" class="inline-input" v-model="form.bizEntityJson.projectAdjustAmount"/>万元
      </el-col>
    </el-row>
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]" style="padding-top:0 !important;">
      <el-row :gutter="24" class="top-row">
        <el-col :span="12">
          <div  class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>项目</span>
            <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
       <el-col :span="12" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>收款单位</span>
            <el-input :class="{'novalue': !form.bizEntityJson.receiveCompanyName}" v-model="form.bizEntityJson.receiveCompanyName" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>公司名称</span>
            <el-input  :class="{'novalue': !form.bizEntityJson.companyName}" v-model="form.bizEntityJson.companyName" size="mini"></el-input>
            <!-- <el-autocomplete v-model="form.bizEntityJson.companyName" :fetch-suggestions="querySearch" size="mini" placeholder="请输入内容"></el-autocomplete> -->
          </div>
        </el-col>
       <el-col :span="12" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>预算支付日期</span>
            <el-date-picker
              :class="{'novalue': !form.bizEntityJson.adjustDate}"
              v-model="form.bizEntityJson.adjustDate"
              type="date"
              size="mini"
              style="width:100%;"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <!-- 项目内部调剂 -->
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 1">
        <el-col :span="8">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>调入资金计划组织</span>
            <el-input :class="{'novalue': !form.bizEntityJson.organizationNameA}" v-model="form.bizEntityJson.organizationNameA" size="mini"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>需调剂科目</span>
            <el-input :class="{'novalue': !form.bizEntityJson.adjustmentSubject}" v-model="form.bizEntityJson.adjustmentSubject" size="mini"></el-input>
          </div>
        </el-col>
       <el-col :span="8"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>调入金额</span>
           <el-input :class="{'novalue': !form.bizEntityJson.adjustAmount}" v-model="form.bizEntityJson.adjustAmount" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 1">
        <el-col :span="24" class="table-col right-col">
          <el-table ref="table" :data="form.bizEntityJson.cashFlowAccountVoList" size="mini" border stripe header-row-class-name="table-header">
            <el-table-column label="被调剂科目" prop="cashFlowAccount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.cashFlowAccount,required:!form.bizEntityJson.disabled}" v-model="scope.row.cashFlowAccount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="调出金额" prop="adjustOutAmount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.adjustOutAmount,required:!form.bizEntityJson.disabled}" v-model="scope.row.adjustOutAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" v-if="!form.bizEntityJson.disabled">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="add">新增</el-button>
                <el-button v-else type="text" size="mini" style="color: #F56C6C; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="delet(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 事业部内部调剂 -->
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 2">
        <el-col :span="8">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>调入资金计划组织</span>
            <el-input :class="{'novalue': !form.bizEntityJson.organizationNameA}"  v-model="form.bizEntityJson.organizationNameA" size="mini"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>需调剂科目</span>
            <el-input :class="{'novalue': !form.bizEntityJson.adjustmentSubject}" v-model="form.bizEntityJson.adjustmentSubject" size="mini"></el-input>
          </div>
        </el-col>
       <el-col :span="8"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>调入金额</span>
           <el-input :class="{'novalue': !form.bizEntityJson.adjustAmount}" v-model="form.bizEntityJson.adjustAmount" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 2">
        <el-col :span="24" class="table-col right-col">
          <el-table ref="table" :data="form.bizEntityJson.cashFlowAccountVoList" size="mini" border stripe header-row-class-name="table-header">
            <el-table-column label="项目" prop="cashProjectName">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.cashProjectName,required:!form.bizEntityJson.disabled}" v-model="scope.row.cashProjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="调出资金计划组织" prop="organizationNameB">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.organizationNameB,required:!form.bizEntityJson.disabled}" v-model="scope.row.organizationNameB" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="被调剂科目" prop="cashFlowAccount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.cashFlowAccount,required:!form.bizEntityJson.disabled}" v-model="scope.row.cashFlowAccount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="调出金额" prop="adjustOutAmount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.adjustOutAmount,required:!form.bizEntityJson.disabled}" v-model="scope.row.adjustOutAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" v-if="!form.bizEntityJson.disabled">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="add">新增</el-button>
                <el-button v-else type="text" size="mini" style="color: #F56C6C; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="delet(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
       <!-- 新增 -->
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 3">
        <el-col :span="24"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>调入资金计划组织</span>
            <el-input :class="{'novalue': !form.bizEntityJson.organizationNameA}" v-model="form.bizEntityJson.organizationNameA" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="form.bizEntityJson.adjustmentAttr == 3">
        <el-col :span="24" class="table-col right-col">
          <el-table ref="table" :data="form.bizEntityJson.cashFlowAccountVoList" size="mini" border stripe header-row-class-name="table-header">
            <el-table-column label="新增预算科目" prop="cashFlowAccount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.cashFlowAccount,required:!form.bizEntityJson.disabled}" v-model="scope.row.cashFlowAccount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="新增金额" prop="adjustOutAmount">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.adjustOutAmount,required:!form.bizEntityJson.disabled}" v-model="scope.row.adjustOutAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="合同号" prop="contNo">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.contNo,required:!form.bizEntityJson.disabled}" v-model="scope.row.contNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="付款单号" prop="paymentDisplayNo">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.paymentDisplayNo,required:!form.bizEntityJson.disabled}" v-model="scope.row.paymentDisplayNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" v-if="!form.bizEntityJson.disabled">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="add">新增</el-button>
                <el-button v-else type="text" size="mini" style="color: #F56C6C; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="delet(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同总金额(元)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.totalAmount}" v-model="form.bizEntityJson.totalAmount" size="mini"></el-input>
          </div>
        </el-col>
       <el-col :span="12"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同已付金额(元)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.paydAmount}" v-model="form.bizEntityJson.paydAmount" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>申请支付金额(元)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.applyPayAmount}" v-model="form.bizEntityJson.applyPayAmount" size="mini"></el-input>
          </div>
        </el-col>
       <el-col :span="12"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>批准支付金额(元)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.approvePayAmount}" v-model="form.bizEntityJson.approvePayAmount" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24"  class="right-col">
          <div class="d-min" :class="{'novalue': form.bizEntityJson.formalitFlg === undefined}">
            <span>付款办理审批情况(元)</span>
             <el-radio style="margin-left:10px" v-model="form.bizEntityJson.formalitFlg" :label="true">付款审批手续已完成(附后续)</el-radio>
            <el-radio v-model="form.bizEntityJson.formalitFlg" :label="false">付款审批手续未完成(需同时报)</el-radio>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24"  class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span style="height:auto">支出用途及预算外原因</span>
             <el-input
             :class="{'novalue': !form.bizEntityJson.adjustRemark}"
              type="textarea"
              v-model="form.bizEntityJson.adjustRemark"
              rows="3"
            />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" type="flex">
        <el-col style="width: 160px;">
          <span class="span-100">附件</span>
        </el-col>
        <el-col class="right-col" style="width: 100%; flex: 1;">
          <div class="d-min">
            <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
              :before-remove="beforeRemoveGlobal"
              :before-upload="beforeUploadGlobal"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :file-list="form.allEntityFileIds.fileId"
              style="display: flex;">
              <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </div>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>
<script>
export default {
	props: ['data'],
	watch: {
		data: {
      immediate: true,
      timeout:  null,
			handler: function(val) {
				console.log(val)
				this.form = val;
      }
		}
	},
  data() {
    return {
	    form: {},
      showSearchOrg: false,
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      const fileId = response.data.fileId;
      this.form.bizEntityJson.fileId += fileId;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let nowfile;
      if(file.response) {
          nowfile = file.response.data.fileId;
      }else {
          nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId;
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'');
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    downLoadFile(file) {
      console.log(file)
      if(file.showUrl) {
        window.open(file.showUrl, '_blank');
        return;
      }
      const fileIds = file.response.data.fileId;
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl;
          window.open(showUrl, '_blank');
        }
      })
    },
	  changeAdjustmentAttr(val) {
			this.$set(this.form.bizEntityJson,'cashFlowAccountVoList',[{}])
		},
		add() {
			this.form.bizEntityJson.cashFlowAccountVoList.push({})
		},
		delet(j) {
			this.form.bizEntityJson.cashFlowAccountVoList.splice(j,1)
		},
    querySearch(queryString, cb) {
      if (!queryString) return
      var restaurants = []
      this.$approval.getCompanies(queryString).then(res => {
        if (res.code == 1) {
          restaurants = res.data
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
          // 调用 callback 返回建议列表的数据
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results)
          }, 1000 * Math.random())
        }
      })
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.bukrs.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>>
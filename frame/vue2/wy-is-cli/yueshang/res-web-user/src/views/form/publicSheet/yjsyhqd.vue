<template>
  <!-- 印鉴使用会签单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>单位</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.unitType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.unitType">
              <el-radio label="1">总部</el-radio>
              <el-radio label="2">事业部</el-radio>
              <el-radio label="3">城市公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>申请部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>申请人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyUserName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">事由</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.cause, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cause" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>印鉴名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sealName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sealName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>文件名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fileName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>文件份数</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fileNumber, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileNumber" v-filter-check-input2 :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>用章种类</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sealMode, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sealMode">
              <el-radio label="1">人力资源</el-radio>
              <el-radio label="2">行政</el-radio>
              <el-radio label="3">财务</el-radio>
              <el-radio v-if="form.bizEntityJson.unitType == 3" label="7">营销</el-radio>
              <el-radio label="4">通用</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{'novalue': !form.bizEntityJson.officialSeal && !form.bizEntityJson.contractSeal && !form.bizEntityJson.financeSeal && !form.bizEntityJson.legalPersonSeal && !form.bizEntityJson.invoiceSeal && !form.bizEntityJson.textApproveSeal && !form.bizEntityJson.otherSeal, 'required': !form.bizEntityJson.disabled}">
          <el-checkbox v-model="form.bizEntityJson.officialSeal">公章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.contractSeal">合同专用章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.financeSeal">财务专用章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.legalPersonSeal">法人章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.invoiceSeal">发票专用章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.textApproveSeal">文本审核章</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.otherSeal">其他</el-checkbox>
          <!-- <el-input v-if="form.bizEntityJson.otherSeal" v-model="form.bizEntityJson.otherSealName" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input> -->
          <t-textarea v-if="form.bizEntityJson.otherSeal" class="t-textarea-auto" v-model="form.bizEntityJson.otherSealName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sealUseScenes, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sealUseScenes">
              <el-radio label="1">一般事务</el-radio>
              <el-radio label="2">对外付款、法律纠纷或其它重大事项</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span style="height: auto;">用章文件</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.fileId, 'required': !form.bizEntityJson.disabled}">
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
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">
            备注
            <el-tooltip class="item" effect="dark" content="说明用印次数及其他" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.remark, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.sealMode == 1 || form.bizEntityJson.sealMode == 3" :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>使用范围</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min d-radio">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.useRange, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-if="form.bizEntityJson.sealMode == 1" v-model="form.bizEntityJson.useRange" disabled>
              <el-radio v-for="(item, index) in useRangeList" :key="index" :label="item.dictCd">{{ item.dictName }}</el-radio>
            </el-radio-group>
            <el-radio-group v-if="form.bizEntityJson.sealMode == 3" v-model="form.bizEntityJson.useRange">
              <el-radio v-for="(item, index) in useRangeList2" :key="index" :label="item.dictCd">
                {{ item.dictName.search(/其他/) != -1 ? '其他' : item.dictName }}
                <el-tooltip v-if="item.dictName.search(/其他/) != -1" class="item" effect="dark" content="在下列输入框填写其他范围" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.sealMode == 3 && form.bizEntityJson.useRange == this.useRangeOtherNameIndex" :span="24" class="right-col">
        <div class="d-min">
          <span>其他</span>
          <el-input :class="{'novalue': !form.bizEntityJson.useRangeOtherName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.useRangeOtherName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.applyOrgCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      showSearchUser: false,
      useRangeList: [],
      useRangeList2: [],
      useRangeOtherNameIndex: null,
      uploadUrl,
      fileList: fileList || [],
      userInfo: {}
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
    this.getSealEngravingApplySheetHr()
    this.getSealEngravingApplySheetFin()
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'applyUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'applyOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'applyOrgCd', this.userInfo.orgCd)
    }
  },
  methods: {
    // 印鉴使用会签单-人力资源-使用范围-下拉选项
    getSealEngravingApplySheetHr() {
      // let enterpriseId = this.userInfo.enterpriseId
      Approval.getSealEngravingApplySheetHr().then(res => {
        if(res.code ==1) {
          this.useRangeList = res.data
        }
      })
    },
    // 印鉴使用会签单-财务-使用范围
    getSealEngravingApplySheetFin() {
      // let enterpriseId = this.userInfo.enterpriseId
      Approval.getSealEngravingApplySheetFin().then(res => {
        if(res.code ==1) {
          this.useRangeList2 = res.data
          for (let key in this.useRangeList2) {
            if (this.useRangeList2[key].dictName.search(/其他/) != -1) {
              this.useRangeOtherNameIndex = this.useRangeList2[key].dictCd
            }
          }
        }
      })
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.applyOrgName = val.text
        this.form.bizEntityJson.applyOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.applyUserName = val.userName
        this.form.bizEntityJson.applyUserCd = val.userCd
      }
      this.showSearchUser = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.unitType) return this.$message.error('请选择单位'), false
      if(!this.form.bizEntityJson.applyOrgName) return this.$message.error('请选择申请部门'), false
      if(!this.form.bizEntityJson.cause) return this.$message.error('请输入事由'), false
      if(!this.form.bizEntityJson.sealName) return this.$message.error('请输入印鉴名称'), false
      if(!this.form.bizEntityJson.fileName) return this.$message.error('请输入文件名称'), false
      if(!this.form.bizEntityJson.fileNumber) return this.$message.error('请输入文件份数'), false
      if(!this.form.bizEntityJson.sealMode) return this.$message.error('请选择印鉴种类'), false
      if(!this.form.bizEntityJson.officialSeal && !this.form.bizEntityJson.contractSeal && !this.form.bizEntityJson.financeSeal && !this.form.bizEntityJson.legalPersonSeal && !this.form.bizEntityJson.invoiceSeal && !this.form.bizEntityJson.textApproveSeal && !this.form.bizEntityJson.otherSeal) return this.$message.error('请选择一项印鉴类型'), false
      if(!this.form.bizEntityJson.sealUseScenes) return this.$message.error('请选择用章场景'), false
      if(!this.form.bizEntityJson.fileId) return this.$message.error('请选择用章文件'), false
      if(!this.form.bizEntityJson.remark) return this.$message.error('请输入备注'), false
      if(this.form.bizEntityJson.sealMode == 1 || this.form.bizEntityJson.sealMode == 3) {
        if(!this.form.bizEntityJson.useRange) return this.$message.error('请选择使用范围'), false
      }
      if(this.form.bizEntityJson.sealMode == 3 && this.form.bizEntityJson.useRange == this.useRangeOtherNameIndex) {
        if(!this.form.bizEntityJson.useRangeOtherName) return this.$message.error('请输入其他内容'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

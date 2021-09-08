// 物业公司印鉴使用会签单
<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>所属单位</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.company, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.company">
              <el-radio label="3">城市公司</el-radio>
              <el-radio label="4">物业项目</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="d-min">
          <span>印鉴类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sealType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sealType">
              <el-radio label="3">城市公司印鉴、证照</el-radio>
              <el-radio label="2">地产公司印鉴、证照</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>申请人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyUserName" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>申请部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">事由</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.unitType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.unitType">
              <el-radio label="1">行政人事、财务、成本</el-radio>
              <el-radio label="2">通用  </el-radio>
            </el-radio-group>
          </div>
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
          <el-input v-filter-check-input2 :class="{'novalue': !form.bizEntityJson.fileNumber, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>印鉴名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sealName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sealName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>
          用章种类
        </h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sealMode, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sealMode">
              <el-radio label="5">商业 </el-radio>
              <el-radio label="6">地产(移交商业)</el-radio>
              <el-radio label="8">物业</el-radio>
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
          <el-checkbox v-model="form.bizEntityJson.otherSeal">其他</el-checkbox>
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
              style="display: flex;"
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
              :file-list="form.allEntityFileIds.fileId">
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
   
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.applyOrgCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
const data = {};
const uploadUrl = '';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为组件本身需要数据
      showSearchOrg: false,
      showSearchUser: false,
      userInfo: {},
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
      this.$set(this.form.bizEntityJson, 'applyUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'applyOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'applyOrgCd', this.userInfo.orgCd)
    }
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      let nowfile
      if(file.response) {
        nowfile = file.response.data.fileId
      }else {
        nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(response, file, fileList) {
      const fileId = response.data.fileId
      if(!this.form.bizEntityJson.fileId) {
        this.$set(this.form.bizEntityJson,'fileId','')
      }
      this.form.bizEntityJson.fileId += fileId
    },
    onChangeToolFile(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1].raw]
      }
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
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
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

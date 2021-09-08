<template>
  <!-- 事业部对外发函审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>是否涉及商业</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.isInvolvingBusiness == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.isInvolvingBusiness">
              <el-radio :label="true">涉及商业</el-radio>
              <el-radio :label="false">不涉及商业</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>区域</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.region, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.region">
              <el-radio label="0">事业一部</el-radio>
              <el-radio label="1">事业二部</el-radio>
              <el-radio label="2">安徽</el-radio>
              <el-radio label="3">置地</el-radio>
              <el-radio label="4">浙江</el-radio>
              <el-radio label="5">广东</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>主送单位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.mainDeliveryUnit, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.mainDeliveryUnit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>函件标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.lettersTitle, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.lettersTitle" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>发函类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sendLettersType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sendLettersType">
              <el-radio label="0">解约函件</el-radio>
              <el-radio label="1">政府函件</el-radio>
              <el-radio label="2">投诉函件</el-radio>
              <el-radio label="3">供应商函件</el-radio>
              <el-radio label="4">营销函件</el-radio>
              <el-radio label="5">其他函件</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">发函内容及情况说明</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.lettersContent, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.lettersContent" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span>附件</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo}"
            :accept="$action"
            :action="uploadUrl"
            :show-file-list="false"
            :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
            :before-remove="beforeRemoveGlobal"
            :before-upload="beforeUploadGlobal"
            :on-success="handleSuccess"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
          </el-upload>
          <p v-if="fileDetail" class="file-p">
            <span class="upload-title">
              <i class="el-icon-document"></i>
              <span class="fj-title">{{ fileDetail.name }}</span>
            </span>
            <span class="upload-del">
              <i class="el-icon-close" @click="delFile(1)"></i>
            </span>
          </p>
          <p v-else-if="$route.query.id && form.allEntityFileIds.fileId[0]" class="file-p">
            <span class="upload-title">
              <i class="el-icon-document"></i>
              <span class="fj-title">{{ form.allEntityFileIds.fileId[0].name }}</span>
            </span>
            <span v-if="!form.bizEntityJson.disabled" class="upload-del">
              <i class="el-icon-close" @click="delFile(2)"></i>
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      fileDetail: null,
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
		}
	},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  mounted() {
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    delFile(index) {
      if (index == 1) {
        this.fileDetail = ''
        this.form.bizEntityJson.fileId = ''
      } else {
        this.form.allEntityFileIds.fileId = []
        this.form.bizEntityJson.fileId = ''
      }
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 1)()
    },
    // 必填判断
    validate() {
      if(this.form.bizEntityJson.isInvolvingBusiness == undefined) return this.$message.error('请选择是否涉及商业'), false
      if(!this.form.bizEntityJson.region) return this.$message.error('请选择区域'), false
      if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请输入项目名称'), false
      if(!this.form.bizEntityJson.mainDeliveryUnit) return this.$message.error('请输入主送单位'), false
      if(!this.form.bizEntityJson.lettersTitle) return this.$message.error('请输入函件标题'), false
      if(!this.form.bizEntityJson.sendLettersType) return this.$message.error('请选择发函类型'), false
      if(!this.form.bizEntityJson.lettersContent) return this.$message.error('请输入发函内容及情况说明'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

<template>
  <!-- 计划创建调整审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>成本分期</span>
          <el-input :class="{'novalue': !form.bizEntityJson.costStaging, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.costStaging" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>开发分期</span>
          <el-input :class="{'novalue': !form.bizEntityJson.developStaging, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.developStaging" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>是否新建计划</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.createNewPlanFlg == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.createNewPlanFlg">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <span class="span-auto">情况说明附件</span>
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
    <el-row :gutter="24" v-if="!form.bizEntityJson.createNewPlanFlg || !form.bizEntityJson.createNewPlanFlg === undefined">
      <el-col :span="24" class="title-col right-col">
        <h2>调整详情</h2>
      </el-col>
      <el-table ref="table" :data="form.bizEntityJson.adjustDetailList" size="mini" border stripe header-row-class-name="table-header">
        <el-table-column label="节点名称" prop="nodeName">
          <template slot-scope="adjust">
            <el-input :class="{'novalue': !adjust.row.nodeName, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.nodeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="节点等级" prop="nodeLevel">
          <template slot-scope="adjust">
            <el-input :class="{'novalue': !adjust.row.nodeLevel, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.nodeLevel" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="调整形式" prop="adjustModels">
          <template slot-scope="adjust">
            <el-input :class="{'novalue': !adjust.row.adjustModels, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.adjustModels" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="调整详情" prop="adjustmentDetails">
          <template slot-scope="adjust">
            <el-input :class="{'novalue': !adjust.row.adjustmentDetails, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.adjustmentDetails" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" v-if="!$route.query.id">
          <template slot-scope="adjust">
            <el-button type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="addList">添加</el-button>
            <el-button v-if="adjust.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="remove(adjust.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>
<script>
import Approval from "@/apis/apis/approval";

export default {
  data() {
    return {
      form: {},
      disabled: true,
      showSearchOrg: false,
      adjustDetailList : [],
      userInfo: {}
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'adjustDetailList', [])
      this.addList()
    }
  },
  methods: {
    addList() {
      let newData = {
        nodeName: '',
        nodeLevel: '',
        adjustModels: '',
        adjustmentDetails: ''
      }
      this.form.bizEntityJson.adjustDetailList.push(newData)
    },
    remove(index) {
      if (this.form.bizEntityJson.adjustDetailList.length > 0) {
        this.form.bizEntityJson.adjustDetailList.splice(index, 1)
      }
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgCd = val.id
        this.form.bizEntityJson.centerOrgName = val.text
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请选择项目'), false
      if(!this.form.bizEntityJson.costStaging) return this.$message.error('请输入成本分期'), false
      if(!this.form.bizEntityJson.developStaging) return this.$message.error('请输入开发分期'), false
      if(this.form.bizEntityJson.createNewPlanFlg == undefined) return this.$message.error('请选择是否新建计划'), false
      if(!this.form.bizEntityJson.fileId) return this.$message.error('请上传情况说明附件'), false
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
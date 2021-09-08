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
          <span>节点类型</span>
          <el-input :class="{'novalue': !form.bizEntityJson.nodeType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.nodeType" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
      <dl-col :span="24" title="情况说明附件" place="right">
        <many-files :form="form" value="fileId" />
      </dl-col>
    </el-row>
    <el-row class="padding-row" :gutter="24" v-if="!form.bizEntityJson.createNewPlanFlg || !form.bizEntityJson.createNewPlanFlg === undefined">
      <dl-col :span="24" class="title-col topRight-col">
        <h2>调整详情</h2>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.adjustDetailList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column align="center" label="节点名称" prop="nodeName">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.nodeName, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.nodeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="节点等级" prop="nodeLevel">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.nodeLevel, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.nodeLevel" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="调整形式" prop="adjustModels">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.adjustModels, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.adjustModels" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="原计划开始时间" prop="originalPlanTime">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.originalPlanTime, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.originalPlanTime" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="现计划时间" prop="currentPlanTime">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.currentPlanTime, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.currentPlanTime" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工期调整" prop="constructionPeriod">
            <template slot-scope="adjust">
              <el-input :class="{'novalue': !adjust.row.constructionPeriod, 'required': !form.bizEntityJson.disabled}" v-model="adjust.row.constructionPeriod" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200" v-if="!$route.query.id">
            <template slot-scope="adjust">
              <el-button type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="addList">添加</el-button>
              <el-button v-if="adjust.$index > 0" type="text" size="mini" style="color: #F56C6C; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="remove(adjust.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
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
@import 'src/views/form/publicSheet/publicSheet';
</style>
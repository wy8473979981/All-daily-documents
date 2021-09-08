<template>
  <!-- 立项申请单(地产) -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>审批流程</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.approvalProcess, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.approvalProcess">
              <el-radio label="1">总部</el-radio>
              <el-radio label="2">事业部</el-radio>
              <el-radio label="3">地产</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="(form.bizEntityJson.withinBudget != 0 && form.bizEntityJson.withinBudget != 1) ? 24 : 12" :class="(form.bizEntityJson.withinBudget != 0 && form.bizEntityJson.withinBudget != 1) ? 'right-col' : ''">
        <div class="d-min">
          <span>预算处理</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.withinBudget, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.withinBudget">
              <el-radio label="1">预算内</el-radio>
              <el-radio label="0">
                预算外
                <el-tooltip class="item" effect="dark" content="新增预算审批需谨慎" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.withinBudget == 0" :span="12" class="right-col">
        <div class="d-min">
          <span>新增金额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.extraBudgetNewAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.extraBudgetNewAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.withinBudget == 1" :span="12" class="right-col textBtn-col">
        <div class="d-min">
          <span>场景列表</span>
          <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini" @click="add">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="table-col right-col">
        <el-table ref="table" :data="form.bizEntityJson.scenes" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="费用名称" prop="feeName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.feeName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.feeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="场景" prop="sceneConfigName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.sceneConfigName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.sceneConfigName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="费用承担部门" prop="centerName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.centerName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.centerName" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预算科目" prop="subjectName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.subjectName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="立项金额(元)" prop="projectAmount">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.projectAmount, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.projectAmount" @change="projectAmountChange(scope.$index, $event)" v-filter-check-input :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="审批金额(元)" prop="approveAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.approveAmount" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" v-if="!$route.query.id">
            <template slot-scope="scope">
              <el-button type="text" size="mini" style="font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="searchBudget(scope.row)">查询实时预算</el-button>
              <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>预算类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.budgetCategory, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.budgetCategory">
              <el-radio label="1">初步预算</el-radio>
              <el-radio label="2">
                精确费用
                <el-tooltip class="item" effect="dark" content="立即付款" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>依据战略框架</span>
          <el-checkbox v-model="form.bizEntityJson.strFrame" @change="strFrameChange" true-label="1" false-label="0">
            依据战略框架
            <el-tooltip class="item" effect="dark" content="勾选前请与成本确认已拥有战略合同台账" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.strFrame == 1" :gutter="24">
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span>框架合同附件</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
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
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">添加附件</el-button>
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
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>申请事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.reason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reason" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>立项总金额(元)</span>
          <el-input v-model="form.bizEntityJson.totalProjectAmount" v-filter-check-input readonly placeholder="0"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      selectIndex: 0,
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
    },
	},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.withinBudgetChange()
      this.add()
    }
  },
  methods: {
    // 监听定义一个数组
    withinBudgetChange() {
      this.$set(this.form.bizEntityJson, 'scenes', [])
    },
    add() {
      let newData = {
        feeName: '',
        sceneConfigName: '',
        centerName: '',
        centerCd: '',
        subjectName: '',
        projectAmount: '',
        approveAmount: '',
      }
      this.form.bizEntityJson.scenes.push(newData)
    },
    strFrameChange(val) {
      if (val != 1) {
        this.form.bizEntityJson.fileId = ''
      }
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
    projectAmountChange(index, val) {
      this.form.bizEntityJson.scenes[index].approveAmount = val
      let sum = 0
      for (let key in this.form.bizEntityJson.scenes) {
        sum += Number(this.form.bizEntityJson.scenes[key].projectAmount)
      }
      // this.form.bizEntityJson.totalProjectAmount = sum
      this.$set(this.form.bizEntityJson, 'totalProjectAmount', sum)
    },
    searchBudget(val) {
      console.log(val)
    },
    remove(index) {
      if (this.form.bizEntityJson.scenes.length > 0) {
        this.form.bizEntityJson.scenes.splice(index, 1)
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.scenes[this.selectIndex].centerName = val.text
        this.form.bizEntityJson.scenes[this.selectIndex].centerCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.approvalProcess) return this.$message.error('请选择审批流程'), false
      if(!this.form.bizEntityJson.withinBudget) return this.$message.error('请选择预算处理'), false
      if(this.form.bizEntityJson.withinBudget == 0) {
        if(!this.form.bizEntityJson.extraBudgetNewAmount) return this.$message.error('请输入新增金额'), false
      }
      if(this.form.bizEntityJson.scenes.length > 0) {
        for (let key in this.form.bizEntityJson.scenes) {
          if(!this.form.bizEntityJson.scenes[key].feeName) return this.$message.error('请输入费用名称'), false
          if(!this.form.bizEntityJson.scenes[key].sceneConfigName) return this.$message.error('请输入场景'), false
          if(!this.form.bizEntityJson.scenes[key].centerName) return this.$message.error('请选择费用承担部门'), false
          if(!this.form.bizEntityJson.scenes[key].subjectName) return this.$message.error('请输入预算科目'), false
          if(!this.form.bizEntityJson.scenes[key].projectAmount) return this.$message.error('请输入立项金额'), false
        }
      }
      if(!this.form.bizEntityJson.budgetCategory) return this.$message.error('请选择预算类别'), false
      if(!this.form.bizEntityJson.reason) return this.$message.error('请输入申请事由'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

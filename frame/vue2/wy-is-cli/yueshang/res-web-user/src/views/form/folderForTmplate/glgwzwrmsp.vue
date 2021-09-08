// 管理岗位职务任免审批  宝龙地产/地产/04-行政人事/01-人力资源管理/04-通用

<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>板块</span>
           <div class="d-red" :class="{novalue:!form.bizEntityJson.plateType}" style="height:auto">
            <el-radio-group v-model="form.bizEntityJson.plateType" @change="changePlateType">
              <el-radio :label="'1'">总部</el-radio>
              <el-radio :label="'2'">事业部</el-radio>
              <el-radio :label="'3'">地产公司</el-radio>
              <el-radio :label="'4'">商业集团</el-radio>
              <el-radio :label="'5'">商业区域公司</el-radio>
              <el-radio :label="'6'">商业公司</el-radio>
              <el-radio :label="'7'">文化</el-radio>
              <el-radio :label="'8'">酒店</el-radio>
              <el-radio :label="'9'">规划设计研究院</el-radio>
            </el-radio-group>
           </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>职级</span>
          <div class="d-red" style="height:auto" :class="{novalue:!form.bizEntityJson.positionRank}">
            <el-radio-group v-if="form.bizEntityJson.plateType ==1 || form.bizEntityJson.plateType === undefined" v-model="form.bizEntityJson.positionRank">
              <el-radio :label="'M9'">M9及以上</el-radio>
              <el-radio :label="'O'">其他</el-radio>
            </el-radio-group>
            <el-radio-group v-if="form.bizEntityJson.plateType ==2" v-model="form.bizEntityJson.positionRank">
              <el-radio :label="'M9'">M9及以上</el-radio>
              <el-radio :label="'M48'">M4-M8</el-radio>
            </el-radio-group>
            <el-radio-group v-if="form.bizEntityJson.plateType ==3" v-model="form.bizEntityJson.positionRank">
              <el-radio :label="'M58'">M5-M8</el-radio>
              <el-radio :label="'M34'">M3-M4</el-radio>
              <el-radio :label="'M12'">M1-M2</el-radio>
            </el-radio-group>
            <el-radio-group v-if="form.bizEntityJson.plateType ==4 || form.bizEntityJson.plateType ==5 ||  form.bizEntityJson.plateType ==6" v-model="form.bizEntityJson.positionRank">
              <el-radio :label="'A'">副总裁</el-radio>
              <el-radio :label="'B'">助理总裁/中心总经理</el-radio>
              <el-radio :label="'C'">区域总经理</el-radio>
              <el-radio :label="'D'">部门总经理/专业总经理</el-radio>
              <el-radio :label="'E'">其他人员</el-radio>
            </el-radio-group>
            <el-radio-group v-if="form.bizEntityJson.plateType ==7 || form.bizEntityJson.plateType ==8 || form.bizEntityJson.plateType ==9" v-model="form.bizEntityJson.positionRank">
              <el-radio :label="'F'">副总裁级</el-radio>
              <el-radio :label="'G'">总经理级</el-radio>
              <el-radio :label="'H'">副总经理级</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>通知形式</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.notifyModus}">
            <el-radio-group v-model="form.bizEntityJson.notifyModus">
              <el-radio :label="'1'">PD公告</el-radio>
              <el-radio :label="'2'">邮件通知</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>生效时间</span>
          <el-date-picker
            :class="{novalue:!form.bizEntityJson.effectiveDate}"
            v-model="form.bizEntityJson.effectiveDate"
            type="date"
            placeholder="选择日期"
            :readonly="form.bizEntityJson.disabled"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>标题</span>
           <el-input
            :class="{novalue:!form.bizEntityJson.subjectTitle}"
            v-model="form.bizEntityJson.subjectTitle">
          </el-input>
        </div>
      </el-col>
    </el-row>
     <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>调整内容</span>
          <el-input 
            :class="{novalue:!form.bizEntityJson.changeContent}"
            v-model="form.bizEntityJson.changeContent" 
            type="textarea"
            autosize
            >
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>任免文件</span>
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
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>备注</span>
           <el-input
           type="textarea"
           autosize
            v-model="form.bizEntityJson.remark">
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const data = {};
const uploadUrl = '';
export default {
  data() {
    return {
      form: data,
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
  },
  methods: {
    changePlateType() {
      this.$set(this.form.bizEntityJson,'positionRank','')
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
  }
}
</script>
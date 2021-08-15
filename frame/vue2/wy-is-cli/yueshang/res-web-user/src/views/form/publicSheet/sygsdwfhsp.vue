<template>
  <!-- 商业公司对外发函审批 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>审批路径</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.approvePath, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.approvePath">
              <el-radio label="0">总部权限、涉及地产</el-radio>
              <el-radio label="1">商业集团权限</el-radio>
              <el-radio label="2">区域权限</el-radio>
              <el-radio label="3">商业公司权限</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.projectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sengLettersType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sengLettersType">
              <el-radio label="0">商户函件</el-radio>
              <el-radio label="1">供应商函件</el-radio>
              <el-radio label="2">政府回函</el-radio>
              <el-radio label="3">投诉回件</el-radio>
              <el-radio label="4">劳动关系类</el-radio>
              <el-radio label="5">其他</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <dl-col :span="24" title="发函内容及情况说明" place="right" :novalue="!form.bizEntityJson.reason">
        <el-input v-model="form.bizEntityJson.reason" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="24" title="附加" place="right" :novalue="!form.bizEntityJson.fileId">
        <one-file :form="form" value="fileId" />
      </dl-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
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
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

<template>
  <!-- 销售合同/认购书非标准版本 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>涉及返租</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.leaseBack == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.leaseBack">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
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
          <span>文件编号</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fileCd, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileCd" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>文件类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.fileType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.fileType">
              <el-radio label="0">预定书</el-radio>
              <el-radio label="1">商品买卖合同范本</el-radio>
              <el-radio label="2">合同范本补充条款</el-radio>
              <el-radio label="3">交房装修标准</el-radio>
              <el-radio label="4">营销合同范本</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>编制或修订</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.preparationAndRevision, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.preparationAndRevision">
              <el-radio label="0">编制</el-radio>
              <el-radio label="1">开盘方案</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="{'novalue': !form.bizEntityJson.preparationAndRevisionCount, 'required-onInput': !form.bizEntityJson.disabled}">
          <el-input v-model="form.bizEntityJson.preparationAndRevisionCount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="prepend">第</template>
            <template slot="append">次修订</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">标准版本合同主要条款</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.standardContractTerms, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.standardContractTerms" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
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
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请输入项目名称'), false
      if(this.form.bizEntityJson.leaseBack == undefined) return this.$message.error('请选择涉及返租'), false
      if(!this.form.bizEntityJson.fileName) return this.$message.error('请输入文件名称'), false
      if(!this.form.bizEntityJson.fileCd) return this.$message.error('请选择文件编号'), false
      if(!this.form.bizEntityJson.fileType) return this.$message.error('请选择文件类别'), false
      if(!this.form.bizEntityJson.preparationAndRevision) return this.$message.error('请选择编制或修订'), false
      if(!this.form.bizEntityJson.preparationAndRevisionCount) return this.$message.error('请输入修订次数'), false
      if(!this.form.bizEntityJson.standardContractTerms) return this.$message.error('请输入标准版本合同主要条款'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

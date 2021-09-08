<template>
  <!-- 网批临时授权 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row">
      <el-col :span="12">
        <div class="d-min">
          <span>授权人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.authorizeUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.authorizeUserName" @focus="showSearchUser1 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>职位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.position, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>被授权人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.authorizedUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.authorizedUserName" @focus="showSearchUser2 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">授权原因</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.authorizeReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.authorizeReason" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>开始日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.beginDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.beginDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>结束日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.endDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.endDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
    <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchUser1: false,
      showSearchUser2: false,
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
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.authorizeUserName = val.userName
        this.form.bizEntityJson.authorizeUserCd = val.userCd
      }
      this.showSearchUser1 = false
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.authorizedUserName = val.userName
        this.form.bizEntityJson.authorizedUserCd = val.userCd
      }
      this.showSearchUser2 = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.authorizeUserName) return this.$message.error('请选择授权人'), false
      if(!this.form.bizEntityJson.position) return this.$message.error('请输入职位'), false
      if(!this.form.bizEntityJson.authorizedUserName) return this.$message.error('请选择被授权人'), false
      if(!this.form.bizEntityJson.authorizeReason) return this.$message.error('请输入授权原因'), false
      if(!this.form.bizEntityJson.beginDate) return this.$message.error('请选择开始日期'), false
      if(!this.form.bizEntityJson.endDate) return this.$message.error('请选择结束日期'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

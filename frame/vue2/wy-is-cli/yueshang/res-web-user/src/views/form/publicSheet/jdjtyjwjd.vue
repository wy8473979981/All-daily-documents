<template>
  <!-- 酒店集团印鉴外借单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <h2>印鉴种类</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.officialSeal && !form.bizEntityJson.legalPersonSeal && !form.bizEntityJson.financeSeal && !form.bizEntityJson.chairmanSeal && !form.bizEntityJson.presidentSeal && !form.bizEntityJson.executiveDirectorSeal, 'required': !form.bizEntityJson.disabled}">
            <el-checkbox v-model="form.bizEntityJson.officialSeal">公章</el-checkbox>
            <el-checkbox v-model="form.bizEntityJson.legalPersonSeal">法人章</el-checkbox>
            <el-checkbox v-model="form.bizEntityJson.financeSeal">财务专用章</el-checkbox>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>借用人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.borrowUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.borrowUserName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>借用日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.borrowDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.borrowDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>印鉴名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sealName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sealName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>使用地点</span>
          <el-input :class="{'novalue': !form.bizEntityJson.useAddr, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.useAddr" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">使用事由</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.useCause, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.useCause" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>归还日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.returnDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.returnDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min" style="justify-content: flex-end;">
          <el-checkbox v-model="form.bizEntityJson.userUnsealedSignature" true-label="true" false-label="false">使用方启封签名</el-checkbox>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" style="justify-content: flex-end;">
          <el-checkbox v-model="form.bizEntityJson.userSealedSignature" true-label="true" false-label="false">使用方密封签名</el-checkbox>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>借用人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.unsealedBorrowUserCd, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unsealedBorrowUserCd" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>借用人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sealedBorrowUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sealedBorrowUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>监督人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.unsealedSuperviseUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unsealedSuperviseUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>监督人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sealedSuperviseUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sealedSuperviseUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      showSearchUser: false,
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
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'userUnsealedSignature', 'true')
      this.$set(this.form.bizEntityJson, 'userSealedSignature', 'true')
    }
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
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.borrowUserName = val.userName
        this.form.bizEntityJson.borrowUserCd = val.userCd
      }
      this.showSearchUser = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.officialSeal && !this.form.bizEntityJson.legalPersonSeal && !this.form.bizEntityJson.financeSeal && !this.form.bizEntityJson.chairmanSeal && !this.form.bizEntityJson.presidentSeal && !this.form.bizEntityJson.executiveDirectorSeal) return this.$message.error('请选择一项印鉴种类'), false
      if(!this.form.bizEntityJson.borrowUserName) return this.$message.error('请选择借用人'), false
      if(!this.form.bizEntityJson.borrowDate) return this.$message.error('请选择借用日期'), false
      if(!this.form.bizEntityJson.sealName) return this.$message.error('请输入印鉴名称'), false
      if(!this.form.bizEntityJson.useAddr) return this.$message.error('请输入使用地点'), false
      if(!this.form.bizEntityJson.useCause) return this.$message.error('请输入使用事由'), false
      if(!this.form.bizEntityJson.returnDate) return this.$message.error('请选择归还日期'), false
      if(!this.form.bizEntityJson.unsealedBorrowUserCd) return this.$message.error('请输入启封签名借用人'), false
      if(!this.form.bizEntityJson.sealedBorrowUserName) return this.$message.error('请输入密封签名借用人'), false
      if(!this.form.bizEntityJson.unsealedSuperviseUserName) return this.$message.error('请输入启封签名监督人'), false
      if(!this.form.bizEntityJson.sealedSuperviseUserName) return this.$message.error('请输入密封签名监督人'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

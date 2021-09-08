// 商业集团例外事项审批  宝龙地产/商业/商业公司/01-企业管理/其他

<template>
  <!-- 商业集团例外事项审批 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>文件标题</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.fileTitle}">
            <el-input :class="{novalue: !form.bizEntityJson.fileTitle}" v-model="form.bizEntityJson.fileTitle"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
   <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>类型</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.type}">
            <el-radio-group v-model="form.bizEntityJson.type">
              <el-radio :label="'0'">涉及重资产项目</el-radio>
              <el-radio :label="'1'">涉及轻资产项目</el-radio>
              <el-radio :label="'2'">涉及收购公司</el-radio>
              <el-radio :label="'3'">涉及住宅物业</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span></span>
          <el-radio-group v-model="form.bizEntityJson.secretLevel">
            <el-radio :label="'0'">绝密</el-radio>
            <el-radio :label="'1'">机密</el-radio>
            <el-radio :label="'2'">保密</el-radio>
            <el-radio :label="'3'">内部公开</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>发起中心/公司</span>
         <el-input v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>　</span>
          <el-checkbox v-model="form.bizEntityJson.urgencyLevel" true-label="true" false-label="false">急</el-checkbox>
        </div>
      </el-col>
    </el-row>
     <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" style="flex-wrap:nowrap">
          <span>文件内容简述(详细内容附后)</span>
          <rich-editor v-model="form.bizEntityJson.fileDesc" :disabled="form.bizEntityJson.disabled"></rich-editor>
        </div>
      </el-col>
    </el-row>

    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
const data = {};
const uploadUrl = 'api/file/uploadFile';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      showSearchOrg: false
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
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
    }
    if(this.form.bizEntityJson.type1) {
      this.form.bizEntityJson.radio1 = '1'
    }
    if(this.form.bizEntityJson.type2) {
      this.form.bizEntityJson.radio1 = '2'
    }
    if(this.form.bizEntityJson.type3) {
      this.form.bizEntityJson.radio1 = '3'
    }
    if(this.form.bizEntityJson.type4) {
      this.form.bizEntityJson.radio1 = '4'
    }
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    changeRadio(val) {
      if(val == 1) {
        this.form.bizEntityJson.type1 = true;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type3 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 2) {
        this.form.bizEntityJson.type2 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type3 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 3) {
        this.form.bizEntityJson.type3 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type4 = false;
      }
       if(val == 4) {
        this.form.bizEntityJson.type4 = true;
        this.form.bizEntityJson.type1 = false;
        this.form.bizEntityJson.type2 = false;
        this.form.bizEntityJson.type3 = false;
      }
    }
  }
}
</script>

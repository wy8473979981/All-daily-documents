<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right" label-width="100px">
          <el-form-item label="机构简称" :required="true">
            <el-input v-model="form.company_short_name" placeholder="请输入" size="mini" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="机构全称">
            <el-input v-model="form.company_full_name" placeholder="请输入" size="mini" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="机构描述">
            <el-input type="textarea"
              v-model="form.company_descr"
              placeholder="机构描述"
              size="mini"
              :autosize="{ minRows: 8, maxRows: 15}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100px; margin-left: 100px;">
          <el-button class="width-100" size="mini" type="primary" @click="submit">提交</el-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import company from '@apis/company'
export default {
  data() {
    return {
      form: {
        company_short_name: "",
        company_full_name: '',
        company_descr: ""
      }
    }
  },
  methods: {
    checkParams () {
      const {company_short_name = ''} = this.form
      if (!company_short_name.trim()) {
        this.$message.error('请填写机构简称')
        return false
      }
      return true
    },
    async submit() {
      if(!this.checkParams()) return
      const res = await company.create(this.form)
      if (res.code === 200) {
        this.$timeoutRouter.push({
          name: 'companyList'
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.form-create {
  border: solid 1px #dcdfe6!important;
}
.el-select{
  width: 100%;
}
</style>

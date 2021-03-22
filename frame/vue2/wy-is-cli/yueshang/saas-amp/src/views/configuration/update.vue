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
          <el-form-item label="机构状态" prop="company_status">
            <el-select size="mini" v-model="form.company_status" placeholder="请选择" style="margin-right: 20px;">
              <el-option
                v-for="item in enumStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      enumStatus: this.$enums.status.filter(item => item.value !== 'NODELETED' && item.value !== 'DELETED'),
      form: {
        company_id: '',
        company_short_name: "",
        company_full_name: '',
        company_descr: "",
        company_status: ''
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
    // 提交
    async submit() {
      if(!this.checkParams()) return
      const res = await company.update(this.form)
      if (res.code === 200) {
        this.$timeoutRouter.push({
          name: 'companyList'
        })
      }
    },
    // 获取数据
    async getData () {
      const params = {company_id: this.form.company_id}
      const res = await company.findById(params)
      const {code, result} = res
      if (code === 200) {
        this.form = {
          ...this.form,
          company_short_name: result.company_short_name,
          company_full_name: result.company_full_name,
          company_descr: result.company_descr,
          company_status: result.company_status
        }
      }
    }
  },
  mounted () {
    this.form.company_id = this.$route.params.id
    this.getData()
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

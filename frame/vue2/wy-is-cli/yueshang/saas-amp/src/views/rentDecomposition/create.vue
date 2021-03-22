<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right">
          <el-form-item label="市调名称" :required='true'>
            <el-select v-model="form.weighted_pricing_id" filterable placeholder="请选择市调名称" @change="dealProject" class="width-100">
              <el-option
                v-for="item in get_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="!item.can_select">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="PMS项目" :required='true'>
            <el-input v-model="form.contract_mould_cate_name" readonly placeholder="PMS项目" :maxlength='20'></el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100px; position: relative;">
          <el-button class="width-100" size="medium" type="primary" @click="submit">提交</el-button>
          <el-button class="width-100" size="medium" type="info" @click="toBackPage" style="position: absolute; left: 110px; top: 0; margin-left: 0;">返回</el-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import rentDecomposition from '@apis/rentDecomposition'
export default {
  data() {
    return {
      form: {
        weighted_pricing_id: ''
      },
      get_list: []
    }
  },
  methods: {
    checkParams () {
      const { weighted_pricing_id = ''} = this.form
      if (!weighted_pricing_id.trim()) {
        this.$message.error('请选择市调名称')
        return false
      }
      return true
    },
    async submit() {
      if(!this.checkParams()) return
      const res = await rentDecomposition.create(this.form)
      if (res.code === 200) {
        this.toBackPage()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 新增测算下拉数据 start
    async getList () {
      const res = await rentDecomposition.getList()
      const {code, result} = res
      if (code === 200) {
        this.get_list = result
      }
    },
    // 显示项目名称
    dealProject (val) {
      let obj = this.get_list.find(item => item.id == val)
      if (obj) {
        this.form.contract_mould_cate_name = obj.pms_project_name
      }
    }
  },
  mounted () {
    this.getList()
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

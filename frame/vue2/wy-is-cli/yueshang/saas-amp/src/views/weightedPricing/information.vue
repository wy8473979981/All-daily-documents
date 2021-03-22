<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right" label-width="130px">
          <el-form-item label="市调名称" :required="true">
            <el-input v-model="form.contract_mould_cate_name" placeholder="请输入市调名称" size="mini" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="项目数量" :required="false">
            <el-input v-model="form.contract_mould_cate_descr" placeholder="请输入项目数量" size="mini" :maxlength='20'></el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100px; margin-left: 130px;">
          <el-button class="width-100" size="mini" type="primary" @click="submit">提交</el-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import contTempCate from '@apis/contTempCate'
export default {
  data() {
    return {
      enumStatus: this.$enums.status.filter(item => item.value !== 'NODELETED' && item.value !== 'DELETED'),
      form: {
        contract_mould_cate_id: '',
        contract_mould_cate_name: '',
        contract_mould_cate_descr: '',
        contract_mould_cate_status: ''
      }
    }
  },
  methods: {
    checkParams () {
      const {contract_mould_cate_name = ''} = this.form
      if (!contract_mould_cate_name.trim()) {
        this.$message.error('请填写市调名称')
        return false
      }
      return true
    },
    // 提交
    async submit() {
      if(!this.checkParams()) return
      const res = await contTempCate.update(this.form)
      if (res.code === 200) {
        this.$timeoutRouter.push({
          name: 'contTempCateList'
        })
      }
    },
    // 获取数据
    async getData () {
      const params = {contract_mould_cate_id: this.form.contract_mould_cate_id}
      const res = await contTempCate.findById(params)
      const {code, result} = res
      if (code === 200) {
        this.form = {
          ...this.form,
          contract_mould_cate_name: result.contract_mould_cate_name,
          contract_mould_cate_descr: result.contract_mould_cate_descr,
          contract_mould_cate_status: result.contract_mould_cate_status
        }
      }
    }
  },
  mounted () {
    this.form.contract_mould_cate_id = this.$route.params.id
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

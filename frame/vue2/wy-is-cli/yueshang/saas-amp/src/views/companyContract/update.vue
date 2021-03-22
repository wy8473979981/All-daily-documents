<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right">
          <el-form-item label="市调名称" :required='true'>
            <el-select v-model="form.market_research_id" filterable placeholder="请选择市调名称" class="width-100" :disabled="gray">
              <el-option
                v-for="item in get_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="!item.can_select">
              </el-option>
            </el-select>
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
import companyContract from '@apis/companyContract'
export default {
  data() {
    return {
      enumStatus: this.$enums.status.filter(item => item.value !== 'NODELETED' && item.value !== 'DELETED'),
      form: {
        market_research_id: '',
        name: '',
        type: ''
      },
      get_list: [],
      gray: false // 编辑编辑租金测算，禁用下拉项
    }
  },
  created () {
    this.form.market_research_id = this.$route.query.market_research_id
    if (this.$route.query.market_research_id) {
      // this.gray = true
    }
  },
  methods: {
    checkParams () {
      const { market_research_id = '', name = '' } = this.form
      if (!market_research_id.trim()) {
        this.$message.error('请选择市调名称')
        return false
      }
      return true
    },
    // 提交
    async submit(id) {
      if(!this.checkParams()) return
      const res = await companyContract.getUpdate(this.form)
      if (res.code === 200) {
        this.$timeoutRouter.push({
          name: 'companyContractList'
        })
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 新增测算下拉数据 start
    async getList () {
      const res = await companyContract.getList()
      const {code, result} = res
      if (code === 200) {
        this.get_list = result
      }
    }
  },
  mounted () {
    this.getList()
    this.form.id = this.$route.query.id
    this.form.market_research_id = this.$route.query.market_research_id
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

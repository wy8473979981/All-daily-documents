<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right">
          <el-form-item label="市调名称" :required='true'>
            <el-select v-model="form.rent_calculation_id" @change="pmsList" filterable placeholder="请选择市调名称" class="width-100">
              <el-option
                v-for="item in get_list"
                :key="item.rent_calculation_id"
                :label="item.rent_market_research_name"
                :value="item.rent_calculation_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="PMS项目" :required='true'>
            <el-select v-model="form.pms_project_id" filterable placeholder="请选择PMS项目" class="width-100">
              <el-option
                v-for="item in pms_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
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
import weightedPricing from '@apis/weightedPricing'
export default {
  data() {
    return {
      enumStatus: this.$enums.status.filter(item => item.value !== 'NODELETED' && item.value !== 'DELETED'),
      form: {
        id: '',
        rent_calculation_id: '',
        pms_project_id: ''
      },
      get_list: [],
      pms_list: [],
    }
  },
  created () {
    // this.form.rent_calculation_id = this.$route.query.rent_calculation_id
    // this.form.pms_project_id = this.$route.query.pms_project_id
    // if (this.$route.query.rent_calculation_id) {
    //   this.gray = true
    // }
  },
  methods: {
    checkParams () {
      const { rent_calculation_id = '' } = this.form
      if (!rent_calculation_id.trim()) {
        this.$message.error('请选择市调名称')
        return false
      }
      return true
    },
    // 提交
    async submit() {
      if(!this.checkParams()) return
      const res = await weightedPricing.getUpdate(this.form)
      if (res.code === 200) {
        this.toBackPage()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 更新权重下拉数据 start
    async getList () {
      const res = await weightedPricing.getList()
      const {code, result} = res
      if (code === 200) {
        this.get_list = result
      }
    },
    // PMS项目下拉数据 start
    async pmsList (val) {
      if (!val){
        return
      }
      const res = await weightedPricing.pmsList({rent_calculation_id: val})
      const {code, result} = res
      if (code === 200) {
        this.pms_list = result
      }
    }
  },
  mounted () {
    this.form.id = this.$route.query.market_id
    this.form.rent_calculation_id = this.$route.query.rent_calculation_id
    this.form.pms_project_id = this.$route.query.pms_project_id
    this.getList()
    this.pmsList(this.$route.query.rent_calculation_id)
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

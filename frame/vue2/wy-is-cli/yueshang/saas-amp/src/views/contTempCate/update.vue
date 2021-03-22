<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="right">
          <el-form-item label="市调名称" :required="true">
            <el-input v-model="form.name" placeholder="请输入市调名称" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="所在城市" :required="true">
            <el-input v-model="form.city" placeholder="请输入所在城市" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="所在商圈" :required="true">
            <el-input v-model="form.business_circle" placeholder="请输入所在商圈" :maxlength='20'></el-input>
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
import contTempCate from '@apis/contTempCate'
export default {
  data() {
    return {
      enumStatus: this.$enums.status.filter(item => item.value !== 'NODELETED' && item.value !== 'DELETED'),
      form: {
        id: '',
        name: '', // 市调名称
        city: '', // 所在城市
        business_circle: '' // 所在商圈
      }
    }
  },
  methods: {
    checkParams () {
      const {name = '', city = '', business_circle = ''} = this.form
      if (!name.trim()) {
        this.$message.error('请填写市调名称')
        return false
      } else if (!city.trim()) {
        this.$message.error('请填写所在城市')
        return false
      } else if (!business_circle.trim()) {
        this.$message.error('请填写所在商圈')
        return false
      }
      return true
    },
    // 提交
    async submit() {
      if(!this.checkParams()) return
      const res = await contTempCate.update(this.form)
      console.log(this.form, '0000')
      if (res.code === 200) {
        this.$timeoutRouter.push({
          name: 'contTempCateList'
        })
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.form.id = this.$route.params.id
    this.form.name = this.$route.params.name
    this.form.city = this.$route.params.city
    this.form.business_circle = this.$route.params.business_circle
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

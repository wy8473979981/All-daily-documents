<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <el-form :model="form" label-position="left">
          <el-form-item label="市调名称" :required="true">
            <el-input v-model="form.name" placeholder="请输入市调名称" :maxlength='20'></el-input>
          </el-form-item>
          <!-- <el-form-item label="所在城市" :required='false'>
            <el-select v-model="form.city_id" filterable placeholder="请选择所在城市" size="mini" class="width-100">
              <el-option
                v-for="item in cityList"
                :key="item.city_id"
                :label="item.city_name"
                :value="item.city_id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="所在城市" :required="true">
            <el-input v-model="form.city" placeholder="请输入所在城市" :maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="所在商圈" :required="true">
            <el-input v-model="form.business_circle" placeholder="请输入所在商圈" :maxlength='20'></el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100px; position: relative;">
          <el-button class="width-100" size="medium" type="primary" @click="submit">提交</el-button>
          <el-button class="width-100" size="medium" type="info" @click="toBackPage" style="position: absolute; left: 110px; top: 0; margin-left: 0px;">返回</el-button>
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
      form: {
        city_id: '',
        name: "", // 市调名称
        city: '', // 所在城市
        business_circle: '' // 所在商圈
      },
      cityList: []
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
    async submit() {
      if(!this.checkParams()) return
      const res = await contTempCate.create(this.form)
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

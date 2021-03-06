<template>
<edit-form-group :isSubmitBtnShow="isSubmitBtnShow">
    <glp-card title="主体基础信息详情">
        <edit-form :def="companyFormDefs" v-if="mainType === '0'" :form="formData.companyForm"></edit-form>
        <edit-form :def="individFormDefs" v-if="mainType === '1'" :form="formData.individForm"></edit-form>
    </glp-card>
    <glp-card title="资金到账账户信息">
      <edit-form :def="baseFormDefs" :form="formData.baseForm"></edit-form>
    </glp-card>
  </edit-form-group>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { companyFormDefs, individFormDefs, baseFormDefs } from './config'

@Component
export default class Edit extends Vue {
  @Prop(String) id!: string

  @Prop(String) type!: string

  companyFormDefs = companyFormDefs

  individFormDefs = individFormDefs

  baseFormDefs = baseFormDefs

  formData: Record<string, any> = {}

  isSubmitBtnShow = false

  get mainType () {
    return this.type
  }

  loadBaseForm () {
    if (!this.id) {
      this.formData = {}
      return
    }
    this.$http.get<any>(`/base/information/edit/${this.id}`).then(data => {
      this.formData = data || {}
    })
  }

  created () {
    this.loadBaseForm()
  }
}
</script>

<style lang="scss" scoped>
  .el-form-item{
    margin-bottom: 0
  }
</style>

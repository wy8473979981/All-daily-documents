<template>
<div>
<edit-debt :id="id" type="view" ref="debt"></edit-debt>

<edit-form-group class="mt-4" ref="efg">
  <template v-slot:action=""><span></span></template>
  <edit-form :def="formDefs" :form="form" :span="24" :xl="24"></edit-form>
</edit-form-group>

<div class="mt-4 text-center">
  <el-button type="primary" size="small" class="px-5 mx-3" @click="onSubmit">提 交</el-button>
  <el-button size="small" class="px-5 mx-3" @click="onBack">返 回</el-button>
</div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import EditDebt from '../components/edit-debt/index.vue'
import { formDefs } from './config'

@Component({
  components: { EditDebt }
})
export default class Cancel extends Vue {
  @Prop(String) id!: string

  @Ref() efg!: any

  formDefs = formDefs

  submitting = false

  form = {
    comment: ''
  }

  onSubmit () {
    this.submitting = true
    this.efg.forSubmit().then(([params]: any) => {
      const req = {
        approvalComments: params.comment,
        auditType: 'operationManagement',
        businessNo: this.id,
        reviewType: 'PASS'
      }
      return this.$http.post('/backend/dept/initdeptcancelorder', req).then(() => {
        this.$message.success('提交作废成功')
        this.$router.push('/finance/debt')
      })
    }).finally(() => {
      this.submitting = false
    })
  }

  onBack () {
    this.$rp.close()
  }
}
</script>

<template>
<div>
<edit-debt :id="id" type="cancel" ref="debt"></edit-debt>

<audit-form :pass-fn="passFn" :reject-fn="rejectFn" :required-items="[true, false, false]" class="mt-4"></audit-form>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import EditDebt from '../components/edit-debt/index.vue'
import { getDictionary } from '@/config/dictionary'

@Component({
  components: { EditDebt }
})
export default class CancelAudit extends Vue {
  @Prop(String) id!: string

  @Ref() debt!: any

  submit (action: 'PASS' | 'REJECT' | 'FAIL', commment?: string): Promise<any> {
    return this.debt.submit().then((params: any) => {
      const req = Object.assign({ reviewType: action, approvalComments: commment, businessNo: this.id }, params || {})
      return this.$http.post('/backend/dept/deptcancelreview', req).then(() => {
        this.$message.success('作废审批请求成功')
        this.$rp.replace('/todo')
      })
    })
  }

  passFn ({ comment }: any) {
    return this.submit('PASS', comment)
  }

  // denyFn ({ comment }: any) {
  //   return this.submit('REJECT', comment)
  // }

  rejectFn ({ comment }: any) {
    return this.submit('FAIL', comment)
  }
}
</script>

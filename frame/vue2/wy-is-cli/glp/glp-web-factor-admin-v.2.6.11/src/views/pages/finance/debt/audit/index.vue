<template>
<div>
<edit-debt :id="id" type="audit" ref="debt"></edit-debt>

<audit-form :pass-fn="passFn" :deny-fn="denyFn" :reject-fn="rejectFn" class="mt-4"></audit-form>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import EditDebt from '../components/edit-debt/index.vue'
import { getDictionary } from '@/config/dictionary'

@Component({
  components: { EditDebt }
})
export default class Audit extends Vue {
  @Prop(String) id!: string

  @Ref() debt!: any

  submit (action: 'PASS' | 'REJECT' | 'FAIL', commment?: string): Promise<any> {
    return this.debt.submit().then((params: any) => {
      const req = Object.assign({ reviewType: action, approvalComments: commment, businessNo: this.id }, params || {})
      return this.$http.post('/backend/dept/deptreview', req)
    }).then(() => {
      this.$message.success('提交审核请求成功')
      this.$rp.replace('/todo')
    })
  }

  passFn ({ comment }: any) {
    return this.submit('PASS', comment)
  }

  denyFn ({ comment }: any) {
    return this.submit('REJECT', comment)
  }

  rejectFn ({ comment }: any) {
    return this.submit('FAIL', comment)
  }
}
</script>

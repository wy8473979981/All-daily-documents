<template>
  <edit-form-group @submit="onSubmit" ref="fm">
    <glp-card title="基础配置">
      <edit-form :def="formDefs" @submit="onSubmit" :form="form"></edit-form>
    </glp-card>
    <glp-card class="mt-5" title="会计分录配置" subtitle="注：借、贷方可新增行数上限为各10行">
      <span>借方：</span>
      <edit-form :def="formDefs1" @submit="onSubmit" :form="form1" :span="24" :xl="24"></edit-form>
      <span>贷方：</span>
      <edit-form :def="formDefs2" @submit="onSubmit" :form="form2" :span="24" :xl="24"></edit-form>
    </glp-card>
  </edit-form-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch } from 'vue-property-decorator'
import { formDefs, formDefs1, formDefs2 } from './config'
import {
  addEvidenceConfigSubmit,
  getEvidenceConfigCheckScene
} from '@/api/accounting-server'

@Component
export default class Add extends Vue {
  @Ref() tb!: any;

  @Ref() tpl!: any;

  @Ref() fm!: any;

  formDefs = formDefs;

  formDefs1 = formDefs1;

  formDefs2 = formDefs2;

  form: Record<string, any> = {};

  form1: Record<string, any> = {
    appId: '',
    t25: [{ subjectId: '', subjectCode: '', calculateFormula: '' }]
  };

  form2: Record<string, any> = {
    appId: '',
    t25: [{ subjectId: '', subjectCode: '', calculateFormula: '' }]
  };

  onSubmit(data: any) {
    const drcrLists: any[] = []
    const req = {
      senceCode: data[0].senceCode,
      id: 0,
      appId: data[0].appId
    }
    let indexLine = 0
    Object.keys(data).map((v: any) => {
      if (v === '0') return
      const values = data[v].t25
      values.map((item: any) => {
        indexLine++
        const obj = {
          calculateFormula: item.calculateFormula,
          dcFlag: v === '1' ? 'Dr' : 'Cr',
          indexLine: indexLine,
          status: 1,
          subjectId: item.subjectId
        }
        drcrLists.push(obj)
      })
    })

    getEvidenceConfigCheckScene(req).then((res) => {
      const params = {
        appId: data[0].appId,
        jdeType: data[0].jdeType,
        name: data[0].name,
        senceCode: data[0].senceCode,
        status: data[0].status,
        drcrLists: drcrLists
      }
      addEvidenceConfigSubmit(params).then((data) => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
        this.$rp.replace('/accounting/evidence-config')
      })
    })
  }

  @Watch('form', { deep: true }) formChange() {
    this.form1.appId = this.form.appId || ''
    this.form2.appId = this.form.appId || ''
  }
}
</script>
<style lang="scss" module>

</style>

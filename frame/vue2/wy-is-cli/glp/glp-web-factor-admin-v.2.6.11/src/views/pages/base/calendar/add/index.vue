<template>
<edit-form-group @submit="onSubmit" ref="tb">
  <glp-card title="异常日">
    <edit-form :def="baseFormDefs"></edit-form>
  </glp-card>
</edit-form-group>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator'
import { baseFormDefs } from './config'
import { addErrDate } from '@/api/systemSet'

@Component
export default class Edit extends Vue {
  baseFormDefs = baseFormDefs
  @Ref() tb!: any
  onSubmit (params: any) {
    addErrDate(params[0]).then((data: any) => {
      this.addRouterPath('保存成功', '/base/calendar/')
    })
  }

  addRouterPath (msg: any, routerPath: any) {
    this.$message({
      type: 'success',
      message: msg,
      onClose: () => {
        this.$router.push(routerPath)
      },
      duration: 1500
    })
  }
}

</script>

<template>
<edit-form-group @submit="onSubmit">
  <glp-card title="基本信息">
    <edit-form :def="baseFormDefs" :form="baseForm"></edit-form>
  </glp-card>
  <glp-card title="短信通知" class="mt-5">
    <edit-form :def="messageNotice"></edit-form>
  </glp-card>
  <glp-card title="邮件通知" class="mt-5">
    <edit-form :def="emailNotice"></edit-form>
  </glp-card>
  <glp-card title="运营端站内信" class="mt-5">
    <edit-form :def="bussnessMessage"></edit-form>
  </glp-card>
  <glp-card title="客户端站内信" class="mt-5">
    <edit-form :def="clientMessage"></edit-form>
  </glp-card>
</edit-form-group>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { baseFormDefs, messageNotice, emailNotice, bussnessMessage, clientMessage } from './config'
import { setNoteRule } from '@/api/systemSet'

@Component
export default class Edit extends Vue {
  @Prop(String) id!: string

  baseFormDefs = baseFormDefs

  messageNotice = messageNotice

  emailNotice = emailNotice

  bussnessMessage = bussnessMessage

  clientMessage = clientMessage

  baseForm: Record<string, any> = {}

  loadBaseForm () {
    if (!this.id) {
      this.baseForm = {}
      return
    }
    this.$http.get<any>(`/base/notice-rule/get/${this.id}`).then(data => {
      this.baseForm = data || {}
    })
  }

  onSubmit (params: any) {
    setNoteRule(params).then((data) => {
      this.baseForm = data || {}
      this.addRouterPath('保存成功', '/base/notice-rule/')
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

  created () {
    this.loadBaseForm()
  }
}
</script>

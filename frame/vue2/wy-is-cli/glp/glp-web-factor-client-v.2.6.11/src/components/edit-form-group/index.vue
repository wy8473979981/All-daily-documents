<template>
<div>
  <slot></slot>
  <slot name="action">
    <div class="text-center mt-5" v-if="!readonly">
      <slot name="prepend"></slot>
      <el-button type="primary" size="small" class="px-5" @click="onSubmit" :loading="submitting">{{submitText}}</el-button>
      <el-button size="small" class="px-5 ml-5" @click="onReset" v-if="isShowBtn">重 置</el-button>
    </div>
  </slot>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit, Provide } from 'vue-property-decorator'
import { FormDef, FieldDef } from '@/types'
import EditForm from '../edit-form/index.vue'

@Component({
  components: { }
})
export default class EditFormGroup extends Vue {
  @Emit() submit (params: Array<Record<string | number, any>>) { /* */ }

  @Prop({ type: Boolean, default: true }) isShowBtn!: boolean

  @Prop(Boolean) submitting!: boolean

  @Prop(Boolean) readonly!: boolean

  @Prop({ type: String, default: '保 存' }) submitText!: string

  forms: EditForm[] = []

  @Provide() getEditFormGroup () {
    return this
  }

  onSubmit () {
    Promise.all(this.forms.map(v => v.forSubmit())).then((params: Array<Record<string | number, any>>) => {
      this.submit(params)
    }).catch(() => {
      this.$message.warning('请填写完整信息后提交。')
    })
  }

  onReset () {
    this.forms.forEach((v) => {
      v.onReset()
    })
  }
}
</script>

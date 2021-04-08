<template>
  <div>
    <slot></slot>
    <slot name="action" v-if="!disabled">
      <div class="text-center mt-5">
        <el-button size="small" class="px-5 ml-5" @click="onCancel" v-if="isCancelBtn">取消</el-button>
        <el-button size="small" class="px-5 ml-5" @click="onReset" v-if="isResetBtn">重置</el-button>
        <el-button type="primary" size="small" class="px-5" @click="onSubmit">保存</el-button>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Ref,
  Emit,
  Provide
} from 'vue-property-decorator'
import { FormDef, FieldDef } from '@/types'
import EditForm from '../edit-form/index.vue'

@Component({
  components: {}
})
export default class EditFormGroup extends Vue {
  @Emit() submit (params: Array<Record<string | number, any>>) {
    /* */
  }

  @Prop(Boolean) disabled!: boolean

  @Prop({ type: Boolean, default: false }) isCancelBtn!: boolean

  @Prop({ type: Boolean, default: true }) isResetBtn!: boolean

  forms: EditForm[] = []

  @Provide() getEditFormGroup () {
    return this
  }

  forSubmit (): Promise<Array<Record<string | number, any>>> {
    return Promise.all(this.forms.map(v => v.forSubmit()))
      .catch((e: any) => {
        this.$message.warning('请填写完整信息后提交。')
        return Promise.reject(e)
      })
  }

  onSubmit () {
    this.forSubmit().then((params: Array<Record<string | number, any>>) => {
      this.submit(params)
    })
  }

  onReset () {
    this.forms.forEach(v => {
      v.onReset()
    })
  }

  onCancel () {
    this.$router.go(-1)
  }
}
</script>

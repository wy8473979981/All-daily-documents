<template>
<el-form label-position="left" label-width="120px" :model="form" :rules="rules" ref="fm">
  <el-form-item label="审批意见" prop="comment">
    <el-input :rows="2" type="textarea" placeholder="请输入审批意见" v-model="form.comment"/>
  </el-form-item>
  <div class="text-center">
    <el-button @click="onPass" type="primary" size="small" class="mx-3 px-5" :loading="passSubmitting" :disabled="!passSubmitting && submitting" v-if="passFn">{{passText}}</el-button>
    <el-button @click="onDeny" type="warning" size="small" class="mx-3 px-5" :loading="denySubmitting" :disabled="!denySubmitting && submitting" v-if="isShowDeny && denyFn">{{denyText}}</el-button>
    <el-button @click="onReject" type="danger" size="small" class="mx-3 px-5" :loading="rejectSubmitting" :disabled="!rejectSubmitting && submitting" v-if="isShowReject && rejectFn">{{rejectText}}</el-button>
    <el-button @click="onBack"   size="small" class="mx-3 px-5" v-if="isShowBack">返 回</el-button>
    <slot name="extra"></slot>
  </div>
</el-form>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class AuditForm extends Vue {
  @Prop(Function) passFn!: (form: { comment: string}) => Promise<any> | any

  @Prop(Function) denyFn!: (form: { comment: string}) => Promise<any> | any

  @Prop(Function) rejectFn!: (form: { comment: string}) => Promise<any> | any

  @Prop(Function) backFn!: () => any

  // 废弃， 用denyFn直接判断
  @Prop({ default: true, type: Boolean }) isShowDeny!: boolean

  @Prop({ default: false, type: Boolean }) isShowBack!: boolean

  // 废弃， 用rejectFn直接判断
  @Prop({ default: true, type: Boolean }) isShowReject!: boolean

  @Prop({ type: String, default: '通 过' }) passText!: string

  @Prop({ type: String, default: '驳 回' }) denyText!: string

  @Prop({ type: String, default: '拒 绝' }) rejectText!: string

  @Prop({ type: Array, default: () => [false, true, true] }) requiredItems!: boolean[]

  @Ref() fm!: any

  required = false

  form = {
    comment: ''
  }

  passSubmitting = false

  denySubmitting = false

  rejectSubmitting = false

  get submitting () {
    return this.passSubmitting || this.denySubmitting || this.rejectSubmitting
  }

  get rules () {
    if (!this.required) return {}
    return {
      comment: [
        { required: true, message: '请输入审批意见' }
      ]
    }
  }

  onDeny () {
    this.required = !!this.requiredItems[1]
    this.validate().then(() => {
      if (this.denyFn) {
        this.denySubmitting = true
        Promise.resolve(this.denyFn(this.form)).finally(() => {
          this.denySubmitting = false
          this.required = false
        })
      }
    }).catch(() => {
      // ignore
    })
  }

  onBack() {
    this.backFn()
  }

  onReject () {
    this.required = !!this.requiredItems[2]
    this.validate().then(() => {
      if (this.rejectFn) {
        this.rejectSubmitting = true
        Promise.resolve(this.rejectFn(this.form)).finally(() => {
          this.rejectSubmitting = false
          this.required = false
        })
      }
    })
  }

  onPass () {
    this.required = !!this.requiredItems[0]
    this.validate().then(() => {
      if (this.passFn) {
        this.passSubmitting = true
        Promise.resolve(this.passFn(this.form)).finally(() => {
          this.passSubmitting = false
          this.required = false
        })
      }
    })
  }

  private validate () {
    return new Promise((resolve, reject) => {
      const $e = this.$refs.form
      this.$nextTick(() => {
        this.fm.validate((valid: any) => {
          if (valid) resolve()
          else reject(new Error('validate fail'))
        })
      })
    })
  }
}
</script>

<template>
<el-dialog
  :class="[$style.modal]"
  center
  :close-on-click-modal="false"
  :title="title"
  :visible.sync="visible"
  :width="width">
  <div :class="[$style.body]">
    <slot :params="params"></slot>
  </div>
  <div slot="footer" class="text-center">
    <el-button type="primary" size="small" class="mx-3 px-5" @click="onConfirm" :loading="confirming" :disabled="concelling" v-if="confirmText">{{confirmText}}</el-button>
    <el-button size="small" class="mx-3 px-5" @click="onCancel" :loading="concelling" :disabled="confirming" v-if="cancelText">{{cancelText}}</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class Modal<T> extends Vue {
  @Prop({ type: String, default: '' }) title!: string

  @Prop(Function) beforeConfirm!: () => Promise<T>

  @Prop(Function) beforeCancel!: () => Promise<T>

  @Prop({ type: String, default: '取消' }) cancelText!: string

  @Prop({ type: String, default: '确认' }) confirmText!: string

  @Prop({ type: String, default: '30vw' }) width!: string

  visible = false

  confirming = false

  concelling = false

  resolve: any = null

  reject: any = null

  params: any = null

  open (params?: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.params = params || {}
      this.resolve = resolve
      this.reject = reject
      this.visible = true
    })
  }

  onConfirm () {
    const vm = this as any
    if (!this.beforeConfirm) return handle(null as any)
    this.confirming = true
    this.beforeConfirm().then(data => {
      handle(data)
    }).finally(() => {
      this.confirming = false
    })

    function handle (data: T) {
      if (vm.resolve) vm.resolve(data)
      vm.visible = false
    }
  }

  onCancel () {
    const vm = this as any
    if (!this.beforeCancel) return handle()
    this.concelling = true
    this.beforeCancel().then(() => {
      handle()
    }).finally(() => {
      this.concelling = false
    })

    function handle () {
      if (vm.reject) vm.reject()
      vm.visible = false
    }
  }
}
</script>

<style lang="scss" module>
.modal {
  :global {
    .el-dialog__title {
      font-weight: 600;
    }
  }
}

.body {
  max-height: calc(70vh - 60px - 80px);
  overflow-y: auto;
  padding: 0 20px;
}
</style>

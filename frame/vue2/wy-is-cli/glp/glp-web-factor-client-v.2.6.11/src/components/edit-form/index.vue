<template>
<div>
  <glp-form-render :def="formDef" :form="form" ref="fm">
    <template v-slot:[k]="props" v-for="(v, k) in $scopedSlots">
      <slot :name="k" v-bind="props"></slot>
    </template>
  </glp-form-render>

  <div class="text-center" v-if="!group">
    <el-button type="primary" size="small" class="px-5" @click="onSubmit">保 存</el-button>
    <el-button size="small" class="px-5 ml-5" @click="onReset">重 置</el-button>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit, Inject, Watch } from 'vue-property-decorator'
import { FormDef, FieldDef, GridFieldDef } from '@/types'
import EditFormGroup from '../edit-form-group/index.vue'

@Component({
  components: { }
})
export default class EditForm extends Vue {
  @Prop({ type: Number, default: 8 }) span!: number

  @Prop({ type: Number, default: 6 }) xl!: number

  @Prop(Array) def!: Array<FieldDef | GridFieldDef>

  @Prop({ default: () => ({}) }) form!: Record<string | number, any>

  @Prop(Boolean) disabled!: boolean

  @Emit() submit (params: Record<string | number, any>) { /* */ }

  @Ref() fm!: any

  @Inject({ default: () => null }) getEditFormGroup!: () => EditFormGroup

  get group (): EditFormGroup {
    return this.getEditFormGroup()
  }

  get formDef (): FormDef {
    const vm: any = this as any
    return {
      options: {
        labelPosition: 'top',
        size: 'small',
        disabled: this.disabled || this.group.readonly
      },
      controls: [
        {
          type: 'grid',
          columns: (this.def || []).map(v => ({ ...grid(v), controls: [(v as any).def || v] })),
          options: {
            gutter: 36
          }
        }
      ]
    }

    function grid (row: any) {
      return {
        span: (row as any).span || vm.span,
        xl: (row as any).xl || (row as any).span || vm.xl
      }
    }
  }

  forSubmit (): Promise<Record<string | number, any>> {
    return this.fm.submit()
  }

  onSubmit () {
    this.fm.submit().then((params: any) => {
      this.submit(params)
    })
  }

  onReset () {
    this.fm.reset()
  }

  @Watch('form') formChange () {
    if (this.form && this.fm) Object.assign(this.fm.form, this.form || {})
  }

  created () {
    if (this.group) this.group.forms.push(this)
  }

  mounted () {
    if (this.form) Object.assign(this.fm.form, this.form || {})
  }

  beforeDestroy () {
    if (this.group) {
      const idx = this.group.forms.findIndex(v => v === this)
      if (idx >= 0) this.group.forms.splice(idx, 1)
    }
  }
}
</script>

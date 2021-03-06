<template>
<div :class="[$style.container, inlineCls]">
  <glp-form-render :def="formDef" :form="form" ref="fm">
    <template v-slot:[k]="props" v-for="(v, k) in $scopedSlots">
      <slot :name="k" v-bind="props"></slot>
    </template>
  </glp-form-render>

  <div class="text-center">
    <el-button type="primary" size="small" class="px-5" @click="onQuery">查 询</el-button>
    <el-button size="small" class="px-5 ml-5" @click="onReset">重 置</el-button>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit } from 'vue-property-decorator'
import { FormDef, FieldDef } from '@/types'
import { mapping } from '@/config/form'

@Component({
  components: { }
})
export default class QueryForm extends Vue {
  @Prop({ type: Number, default: 8 }) span!: number

  @Prop({ type: Number, default: 6 }) xl!: number

  @Prop(Array) def!: FieldDef[]

  @Prop({ default: () => ({}) }) form!: Record<string | number, any>

  @Prop({ type: Boolean, default: true }) mapping!: boolean

  @Prop() mappingOptions!: any

  @Prop(Boolean) inline!: boolean

  @Prop({ type: String, default: 'top' }) labelPosition!: 'top' | 'left' | 'right'

  @Prop(String) labelWidth!: string

  @Emit() query (params: Record<string | number, any>) { /* */ }

  @Ref() fm!: any

  get formDef (): FormDef {
    const vm: any = this as any
    return {
      options: {
        labelPosition: this.labelPosition,
        labelWidth: this.labelWidth,
        size: 'small'
      },
      controls: [
        {
          type: 'grid',
          columns: (this.def || []).map(v => ({ ...grid(v), controls: [(v as any).def || v] })),
          options: {
            gutter: 64
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

  get inlineCls () {
    return this.inline ? (this as any).$style.inline : ''
  }

  onQuery () {
    this.fm.submit().then((params: any) => {
      this.query(this.mapping ? mapping(params, this.mappingOptions) : params)
    })
  }

  onReset () {
    this.fm.reset()
  }
}
</script>

<style lang="scss" module>
.container {
  margin-top: 20px;
}

.inline {
  display: flex;
  align-items: flex-end;

  &>*:first-child {
    flex: 1 1 auto;
  }

  &>*:last-child {
    flex: 0 0 auto;
    margin-bottom: 18px;
    margin-left: 36px;
  }
}
</style>

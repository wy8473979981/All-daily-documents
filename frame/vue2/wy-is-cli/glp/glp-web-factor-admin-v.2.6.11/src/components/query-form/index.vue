<template>
<glp-card :title="title">
  <glp-form-render :def="formDef" :form="form" ref="fm">
    <template v-slot:[k]="props" v-for="(v, k) in $scopedSlots">
      <slot :name="k" v-bind="props"></slot>
    </template>
  </glp-form-render>

  <div class="text-center">
    <el-button size="small" class="px-5 mx-3" @click="onReset">重 置</el-button>
    <el-button type="primary" size="small" class="px-5 mx-3" @click="onQuery">查 询</el-button>
  </div>
</glp-card>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit } from 'vue-property-decorator'
import { FormDef, FieldDef } from '@/types'
import { mapping } from '@/config/form'

@Component({
  components: { }
})
export default class QueryForm extends Vue {
  @Prop({ type: String, default: '查询列表' }) title!: string

  @Prop({ type: Number, default: 8 }) span!: number

  @Prop({ type: Number, default: 6 }) xl!: number

  @Prop(Array) def!: FieldDef[]

  @Prop() resetCallback: any

  @Prop({ default: () => ({}) }) form!: Record<string | number, any>

  @Prop({ type: Boolean, default: true }) mapping!: boolean

  @Prop() mappingOptions!: any

  @Emit() query (params: Record<string | number, any>) { /* */ }

  @Ref() fm!: any

  get formDef (): FormDef {
    const vm: any = this as any
    return {
      options: {
        labelPosition: 'top',
        size: 'small'
      },
      controls: [
        {
          type: 'grid',
          columns: (this.def || []).map(v => ({ ...grid(v), controls: [(v as any).def || v] })),
          options: {
            gutter: 72
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

  onQuery () {
    this.fm.submit().then((params: any) => {
      this.query(this.mapping ? mapping(params, this.mappingOptions) : params)
    })
  }

  onReset () {
    this.fm.reset()
    this.resetCallback && this.resetCallback()
  }
}
</script>

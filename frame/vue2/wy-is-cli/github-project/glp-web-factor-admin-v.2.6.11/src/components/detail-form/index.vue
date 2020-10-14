<template>
<glp-form-render :def="formDef" :form="form" ref="fm" v-loading="loading" :class="[$style.container]">
  <template v-slot:[k]="props" v-for="(v, k) in $scopedSlots">
    <slot :name="k" v-bind="props"></slot>
  </template>
</glp-form-render>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit } from 'vue-property-decorator'
import { FormDef, FieldDef, GridFieldDef } from '@/types'
import { http } from '@/api/http'

@Component({
  components: { }
})
export default class DetailForm extends Vue {
  @Prop(String) api!: string

  @Prop() dataSource!: Record<string | number, any>

  @Prop({ type: Number, default: 8 }) span!: number

  @Prop({ type: Number, default: 6 }) xl!: number

  @Prop(Array) def!: Array<FieldDef | GridFieldDef>

  @Prop({ type: String, default: 'auto' }) labelWidth!: string

  @Prop(Boolean) disabled!: boolean

  @Ref() fm!: any

  localDataSource: Record<string | number, any> = {}

  loading = false

  get form () {
    return this.dataSource || this.localDataSource
  }

  get formDef (): FormDef {
    const vm: any = this as any

    return {
      options: {
        labelPosition: 'left',
        labelWidth: undefined,
        size: 'small',
        disabled: this.disabled
      },
      controls: [
        {
          type: 'grid',
          columns: (this.def || []).map(v => ({ ...grid(v), controls: [(v as any).def || v] })),
          options: {
            gutter: 32
          }
        }
      ]
    }

    function grid (row: any) {
      return {
        span: (row as any).span || vm.span,
        xl: (row as any).xl || (row as any).span || vm.xl,
        offset: (row as any).offset,
        push: (row as any).push,
        pull: (row as any).pull
      }
    }
  }

  loadData () {
    if (!this.api) {
      this.localDataSource = {}
    } else {
      this.loading = true
      http().get<any>(this.api).then(data => {
        this.localDataSource = data || {}
      }).finally(() => {
        this.loading = false
      })
    }
  }

  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.container {
  :global {
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
}
</style>

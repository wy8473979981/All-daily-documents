<script lang="ts">

import { Vue, Component, Prop, Ref, Emit } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { TableColumnDef } from '@/types'

@Component({
  components: { }
})
export default class QueryTable extends Vue {
  @Prop({ type: String }) title!: string

  @Prop(Array) columns!: TableColumnDef[]

  @Prop(String) api!: string

  @Prop({ type: Boolean, default: true }) paged!: boolean

  @Prop({ type: String, default: 'post' }) method!: 'post' | 'get'

  @Prop(String) rowKey!: string

  @Prop(Array) checkedRows!: any

  @Prop(Array) rows!: any

  @Prop(Number) defaultSize!: number

  @Prop({ default: true }) pageable!: boolean

  @Prop(Function) postQuery!: (data: any) => void

  @Prop(Array) dataSource!: any[]

  @Prop({ type: Boolean, default: true }) wrap!: boolean

  @Prop(Boolean) showSummary!: boolean

  @Prop(String) sumText!: string

  @Prop(Function) summaryMethod!: (args: { columns: any[]; data: any[] }) => string[]

  @Prop({ type: Boolean, default: true }) showCheckedInfo!: boolean

  @Ref() tb!: any

  @Emit('update:checkedRows') updateCheckedRows (checkedRows: any[]) {}

  pagedLoader = ({ page, size, params, sorter }: any) => this.$http.post<any>(this.api,
    { ...params, page: page, size: size, ...(sorter ? { orderBy: sorter.prop, orderType: sorter.asc ? 'asc' : 'desc' } : {}) }).then(data => {
    if (this.postQuery) this.postQuery(data)
    return Object.assign({ page: data.page, size: data.size, total: data.totalNum, rows: data.items }, data)
  })

  loader = (params: Record<string, any>) => {
    if (this.method === 'get') return this.$http.get(this.api, { params })
    else return this.$http.post(this.api, params)
  }

  query (params: Record<string | number, any> = {}) {
    this.tb.query(params)
  }

  refresh () {
    this.tb.refresh()
  }

  render (h: CreateElement) {
    const data = {
      props: { title: this.title },
      class: ['pt-2']
    }
    const tag = this.wrap ? 'glp-section' : 'div'
    const d = this.wrap ? data : {}
    return h(tag, d, [this.renderHeader(h), this.renderDataTable(h), this.renderExtra(h)])
  }

  private renderExtra (h: CreateElement) {
    // if (!this.$scopedSlots.extra) return null
    // return (this.$scopedSlots as any).extra()
    const data = {
      slot: 'extra'
    }
    const extra = this.$scopedSlots.extra && this.$scopedSlots.extra({ checkedRows: this.checkedRows })
    return h('div', data, [extra])
  }

  private renderHeader (h: CreateElement) {
    const vm = this as any

    const header = this.$scopedSlots.header && this.$scopedSlots.header({ checkedRows: this.checkedRows })
    return genCheckboxWrap(header)

    function genCheckboxWrap (extra: any) {
      if (!vm.checkedRows || !vm.showCheckedInfo) return extra ? h('el-alert', { props: { type: 'info', closable: false } }, [h('div', { slot: 'title' }, [extra])]) : h('div', {}, extra)
      const clearLink = h('el-link', { props: { underline: false, type: 'primary' }, on: { click: () => vm.updateCheckedRows([]) } }, '清空选择')
      const text = h('span', { class: ['mr-6'] }, [h('span', { class: ['text-secondary'] }, '已选择'), h('span', { class: ['mx-2', 'text-danger'] }, vm.checkedRows.length), clearLink])
      const content = h('div', { slot: 'title' }, [text, extra])
      return h('el-alert', { props: { type: 'info', closable: false } }, [content])
    }
  }

  private renderDataTable (h: CreateElement) {
    const columns = this.columns
    // if (this.checkable) {
    //   const checkColumn: TableColumnDef = { type: 'selection', prop: 'selection', label: '全选', width: '80px', fixed: 'left' }
    //   columns = [checkColumn, ...this.columns]
    // }
    const dataSource = this.dataSource
    const data = {
      props: {
        columns,
        pagedLoader: (dataSource || !this.paged) ? undefined : this.pagedLoader,
        loader: (dataSource || this.paged) ? undefined : this.loader,
        dataSource,
        type: 'client',
        checkedRows: this.checkedRows,
        rowKey: this.rowKey,
        defaultSize: this.defaultSize,
        pageable: this.pageable,
        showSummary: this.showSummary,
        sumText: this.sumText,
        summaryMethod: this.summaryMethod
      },
      on: {
        'update:checkedRows': this.updateCheckedRows
      },
      scopedSlots: {
        ...this.getSlots()
      },
      ref: 'tb'
    }
    return h('glp-data-table', data)
  }

  private getSlots () {
    const ret: any = {}
    Object.entries(this.$scopedSlots).forEach(([k, v]: any[]) => {
      ret[k] = (props: any) => v(props)
    })
    return ret
  }
}
</script>

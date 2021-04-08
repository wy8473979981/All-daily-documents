<template>
<div>
  <glp-tabs v-model="value">
    <glp-tab-pane name="1" label="页面结构">
      <glp-card title="页面结构">
        <el-tree :data="pages" default-expand-all :class="[$style.tree]">
          <span slot-scope="{ data }" :class="[$style.label]">
            <span>
              <span>
                <el-link type="success" v-if="$auth.accessSync(data.path)">{{ data.title }}</el-link>
                <el-link type="danger" v-else>{{ data.title }}</el-link>
              </span>
              <span class="ml-6" style="color: #999; font-size: 12px;">
                <span>全标识: {{data.path}}</span>
                <span class="ml-6" v-if="data.router">路由地址: {{data.router.path}}</span>
              </span>
            </span>
            <span>
              <el-tag size="mini" effect="dark" type="info" :class="[invisibleCls(!data.menu)]">菜单</el-tag>
              <el-tag size="mini" effect="dark" type="danger" :class="[invisibleCls(!data.router)]" class="ml-3">路由</el-tag>
            </span>
          </span>
        </el-tree>
      </glp-card>
    </glp-tab-pane>
    <glp-tab-pane name="2" label="远程字典">
      <glp-card title="远程字典">
        <el-table :data="dataSource" :span-method="spanFn" border  style="width: 100%;">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="key" label="键"></el-table-column>
          <el-table-column prop="value" label="值"></el-table-column>
        </el-table>
      </glp-card>
    </glp-tab-pane>
  </glp-tabs>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { DictionaryModule } from '@/store'
import pages from '@/config/page'
@Component
export default class Dashboard extends Vue {
  @DictionaryModule.State items!: any

  value = '1'

  pages = pages

  get dataSource () {
    const dict = this.items
    const ret: any = []
    Object.entries(dict).forEach(([k, v]: any) => {
      const code = k
      const name = v.label
      const list: any[] = v.values || []
      list.forEach((w, i) => {
        const item = {
          name: `${code} (${name})`,
          key: w.key,
          value: w.label,
          row: i === 0 ? list.length : 0,
          col: i === 0 ? 1 : 0
        }
        ret.push(item)
      })
    })
    return ret
  }

  invisibleCls (has: boolean) {
    return has ? this.$style.invisible : ''
  }

  spanFn ({ row, column, rowIndex, columnIndex }: any) {
    if (columnIndex === 0) {
      return {
        rowspan: row.row,
        colspan: row.col
      }
    }
  }

  $style!: any
}
</script>

<style lang="scss" module>
.tree {
  width: 100%;
}

.label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.invisible {
  visibility: hidden;
}
</style>

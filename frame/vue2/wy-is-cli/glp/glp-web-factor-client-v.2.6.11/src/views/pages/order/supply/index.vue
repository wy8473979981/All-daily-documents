<template>
<div>
  <query-table :title="title" :columns="columns" :data-source="dataFileList" ref="tb" :pageable="false" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">添加</el-button>
    </template>
      <template v-slot:file>
      <p v-for="(item, index) in fileList" :key="index"><a :href="item.path">{{item.name}}</a></p>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="danger" icon="el-icon-circle-close" circle @click="onDelete(row)"></el-button>
    </template>
  </query-table>
  <div class="text-center">
    <el-button type="primary" size="small" class="px-5" @click="onConfirm">确认提交</el-button>
  </div>
  <add-field ref="addFieldRef"></add-field>
  <confirm-submit ref="confirmSubmit"></confirm-submit>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch, Prop } from 'vue-property-decorator'
import { columns } from './config'
import { queryFileList, deleteFileList, submitFileList } from '@/api/customerInfo'
import AddField from './components/add-field/index.vue'
import ConfirmSubmit from './components/confirm-submit/index.vue'
import { d, datetime } from '@/config/form'

@Component({ components: { AddField, ConfirmSubmit } })
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() addFieldRef!: AddField

  @Ref() confirmSubmit!: ConfirmSubmit

  @Prop() id!: any

  title = '文件列表'

  columns = columns

  dataFileList: any = []

  onQueryFileList() {
    queryFileList(this.id).then((data) => {
      console.log(data)
      this.dataFileList = data
    })
  }

  onAdd () {
    this.addFieldRef.add().then(() => {
      this.onQueryFileList()
    }).catch({
      //
    })
  }

  onRefresh () {
    this.tb.refresh()
  }

  onConfirm () {
    this.confirmSubmit.subFile(this.dataFileList).then(() => {
      this.onQueryFileList()
    }).catch({
      //
    })
  }

  onDelete (row: any) {
    deleteFileList(row.id).then((data) => {
      this.$message({
        message: '删除成功',
        type: 'success',
        onClose: () => {
          this.onQueryFileList()
        },
        duration: 1500
      })
    })
  }

  mounted () {
    this.onQueryFileList()
  }
}
</script>

<style lang="scss" module>

</style>

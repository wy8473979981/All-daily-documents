<template>
  <div>
    <query-table
      :columns="columns"
      ref="tb"
      title="票据列表"
      :pageable="false"
      :data-source="noteListWidthAttachment"
      class="mt-4"
    >
      <template v-slot:attachment="{row}">
        <el-upload
          v-if="!row.fileName"
          :http-request="request"
          :on-success="(res)=>resp(res,row)"
          type="list"
          :show-file-list="false"
          :limit="1"
          max-size="100M"
          accept="image/jpeg, image/jpg, image/png"
        >
          <el-button type="text">上传</el-button>
        </el-upload>
        <span
          class="attachment-con"
          v-if="row.fileName"
          @click="()=>onViewImage(row)"
        >{{row.fileName}}</span>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { columns, formDefs } from './config'
import { upPaperFile } from '@/api/plb-invoice'
import { resp, request, action } from '@/config/form'
import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class StepOne extends Vue {
  @Ref() tb!: any

  @Prop() taskId!: string

  formDefs = formDefs

  request = request

  columns = columns

  @Plb.State('orderId') orderId!: any

  @Plb.State('actionUrl') actionUrl!: any

  @Plb.State('noteListWidthAttachment') noteListWidthAttachment!: any

  @Plb.Mutation('setNoteListWidthAttachment') setNoteListWidthAttachment(
    list: any
  ) {
    return list
  }

  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  mounted() {}

  resp(res: any, row: any) {
    const data = {
      id: row.id,
      name: res.name,
      paperUrl: res.url
    }
    const obj = { item: undefined, index: 0 }
    this.noteListWidthAttachment.map((item: any, index: any) => {
      if (item.id === row.id) {
        item.fileName = res.name
        item.fileUrl = res.url
        obj.index = index
        obj.item = item
      }
    })
    this.noteListWidthAttachment[obj.index] = obj.item
    this.setNoteListWidthAttachment(this.noteListWidthAttachment)
    upPaperFile(data).then(res => {})
  }

  onViewImage(row: any) {}
}
</script>
<style lang="scss" scoped>
.upload-container {
  display: inline;
}
.attachment-con {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

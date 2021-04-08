<template>
  <div>
    <glp-card
      :columns="columns"
      ref="tb"
      title="票据列表"
      :pageable="false"
      :data-source="noteList"
      class="mt-4 mb-4"
    >
      <div class="auth-re mb-4">
        <span class="pl-3" v-if="noteList &&noteList.length>0">
          共上传{{noteList.length}}条，含
          <span class="h-l">{{failAmount}}</span>条失败数据，上传失败的数据将不会保存，请仔细查阅，可重新调整后再上传！
        </span>
        <span class="pl-3" v-if="!noteList || noteList.length == 0">请按照模版要求，如实填写票面信息并上传！</span>
      </div>
      <template slot="extra">
        <el-button type="primary" size="mini" plain @click="onDownload">下载模板</el-button>
        <el-upload
          class="upload-container ml-3"
          name="excelFile"
          :show-file-list="false"
          :action="actionUrl"
          :on-change="handleChange"
        >
          <el-button size="mini" plain type="primary">上传票据列表</el-button>
        </el-upload>
      </template>
      <el-table :data="noteList" border size="medium" fit :row-class-name="tableRowClassName">
        <el-table-column prop="orderNum" label="序号">
          <template slot-scope="scope">
            <span>{{scope.row.orderNum}}</span>
            <span v-if="scope.row.ifCheckSucc === 0" class="ml-1">
              <i class="el-icon-warning c-r"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="paperNumber" label="票据号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperFrom" label="出票人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperFromBank" label="出票人开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperUsed" label="承兑人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperUsedBank" label="承兑人开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperAmount" label="票据金额" show-overflow-tooltip>
          <template scope="row">{{row.row.paperAmount | number('￥')}}</template>
        </el-table-column>
        <el-table-column prop="paperFromDate" label="出票日" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperExpiredDate" label="票据到期日" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paperGuarantee" label="承兑保证人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checkMsg" label="失败原因" show-overflow-tooltip></el-table-column>
      </el-table>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { columns, formDefs } from './config'
import { namespace } from 'vuex-class'
import { download } from '@/utils/file'
const Plb = namespace('plb')
@Component
export default class StepOne extends Vue {
  @Ref() tb!: any

  @Prop() taskId!: string

  formDefs = formDefs

  columns = columns

  @Plb.State('orderId') orderId!: any

  @Plb.State('actionUrl') actionUrl!: any

  @Plb.State('noteList') noteList!: any

  @Plb.State('noteAmount') noteAmount!: any

  @Plb.Mutation('setNoteList') setNoteList(nodeList: Array<any>) {
    return nodeList
  }

  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  get failAmount() {
    let i = 0
    this.noteList.map((item: any) => {
      if (item.ifCheckSucc === 0) {
        i++
      }
    })
    return i
  }

  handleChange(res: any) {
    if (res.status === 'success') {
      this.setNoteList(res.response.data.step1Resp)
    }
  }

  onDownload() {
    download(
      'https://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/75ee0aa6-62f7-4fce-b8d7-753b0c952a54.xlsx',
      '票据模板.xlsx'
    )
  }

  tableRowClassName(row: any) {
    if (row.row.ifCheckSucc === 0) {
      return 'warning-row'
    }
    return ''
  }

  mounted() {}
}
</script>
<style lang="scss">
.upload-container {
  display: inline;
}
.warning-row {
  background-color: rgba(255, 247, 247, 1) !important;
}
.h-l {
  color: #ff902a !important;
}
</style>

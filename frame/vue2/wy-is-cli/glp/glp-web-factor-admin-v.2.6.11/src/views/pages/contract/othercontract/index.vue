<template>
  <div>
    <query-form :def="formDefs" title="合同审核" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="合同列表"
      api="/backend/contract/projectRelatedContractList"
      class="mt-4"
    >
      <template v-slot:isCustomContract="{ row }">
        <span>{{row.isCustomContract?'非标合同':'标准合同'}}</span>
      </template>
      <template v-slot:signerName="{ row }">
        <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
      </template>
      <template v-slot:typeName="{ row }">
        <span :class="[$style.link]" @click="viewOfficeOnline(row.originalContractUrl)">{{row.typeName}}</span>
      </template>
      <template v-slot:contractRelatedBusinessRes="{ row }">
          <DropBox :row="row"/>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="primary" size="mini" @click="onView(row)">详 情</el-button>
      </template>
    </query-table>
    <sign-detail :signId="currentId" :signStatus="signStatus" :remindRealName="operationAuth.remindrealname" ref="signDialog" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { viewOfficeOnline, download } from '@/utils/file'
import SignDetail from '@/views/pages/contract/components/sign-detail/index.vue'
import { d } from '@/config/form'
import { getAuth } from '@/utils/perms'
import DropBox from '@/views/pages/contract/components/drop-box/index.vue'
@Component({
  components: {
    SignDetail,
    DropBox
  }
})
export default class OtherContract extends Vue {
  @Ref() tb!: any
  @Ref() signDialog!: any
  @Prop(String) id!: string
  columns = columns
  formDefs = formDefs
  signStatus = 0
  currentId = ''
  download=download
  viewOfficeOnline=viewOfficeOnline
  operationAuth={}
  onView(params: any) {
    this.$router.push(`/contract/contractdetail/${params.id}?status=1`)
  }

  getAuthObj() {
    const tempObj: any = {}
    getAuth(this).forEach((item: any) => {
      tempObj[item] = true
    })
    return tempObj
  }

  onQuery(params: any = {}) {
    params.signTimeEnd = params.signTimeEnd && params.signTimeEnd.replace('00:00:00', '23:59:59')
    this.tb.query({ projectId: this.id, ...params })
  }

  onSignerDetail(params: any) {
    this.currentId = params.id
    this.signStatus = params.signMethod
    this.signDialog.signVisible = true
  }

  mounted() {
    this.operationAuth = this.getAuthObj()
    this.onQuery({ projectId: this.id })
  }
}
</script>

<style lang="scss" module>
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}
</style>

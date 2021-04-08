<template>
  <glp-card>
    <template slot="title">
      <div>
        发票列表
        <span class="h-1 mr-2">发票总额</span>
        <span class="h-2 mr-2">¥245,678.08</span>
        <span class="h-3">(不含验证失败的发票金额)</span>
      </div>
    </template>
    <template slot="extra">
      <el-button size="small" type="primary" plain @click="checkInvoiceList">全部查验</el-button>
      <el-button size="small" type="danger" plain>批量删除</el-button>
    </template>
    <div class="auth-re">
      <span class="pl-3">共10张发票（</span>
      <span class="s-1">3</span>
      <span>张验证失败），验证失败的发票将不会保存，请仔细查阅，可重新调整发票后再提交至列表中！</span>
    </div>
    <query-table
      :columns="columns"
      :data-source="initInvoiceList"
      ref="tb"
      :checkedRows.sync="checkedRows"
      :pageable="false"
    >
      <template v-slot:verifyStatus="row">
        <span
          :class="row.row.verifyStatus === 0?'error':'success'"
        >{{row.row.verifyStatus === 1?'验证成功':'验证失败：'+row.row.verifyFailCause}}</span>
      </template>
      <template v-slot:attachment="row">
        <el-button type="text" @click="()=>onViewImage(row)">查看附件</el-button>
      </template>
    </query-table>
  </glp-card>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { validInvoiceInfo } from '@/api/plb-invoice'
import { columns } from './config'
import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class Attachment extends Vue {
  @Plb.State('initInvoiceList') initInvoiceList: any
  checkedRows = []
  columns = columns
  dataSource = []

  onViewImage(row: any) {
    const a = document.createElement('a')
    a.href = row.row.invoiceFileUrl
    a.target = '_blank'
    a.click()
  }

  @Plb.Action('checkInvoiceList') checkInvoiceList() {}
}
</script>
<style lang='scss' scope>
.h-1 {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}
.h-2 {
  width: 83px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.h-3 {
  width: 182px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.auth-re {
  width: 100%;
  height: 40px;
  background: rgba(255, 245, 238, 1);
  border-radius: 2px;
  line-height: 40px;
  border: 1px solid rgba(255, 144, 42, 1);
  span {
    width: 753px;
    height: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .s-1 {
    color: #ff902a;
    margin: 0 4px;
  }
}
.error {
  color: red;
}
</style>

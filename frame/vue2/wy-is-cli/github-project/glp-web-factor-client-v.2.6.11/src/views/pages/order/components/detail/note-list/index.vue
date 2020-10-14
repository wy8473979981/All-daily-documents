<template>
  <step-one-two></step-one-two>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import StepOneTwo from '../../../apply/step-one-two/index.vue'
import { validInvoiceInfo } from '@/api/plb-invoice'
import { columns } from './config'
import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: {
    StepOneTwo
  }
})
export default class Attachment extends Vue {
  @Plb.State('noteList') noteList: any
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

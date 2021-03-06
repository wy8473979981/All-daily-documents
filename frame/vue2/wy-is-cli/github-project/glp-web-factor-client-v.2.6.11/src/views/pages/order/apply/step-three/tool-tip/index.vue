<template>
  <div class="tool-tip-container mt-3">
    <glp-upload
      :request="request"
      :resp="resp"
      type="list"
      :limit="1000"
      v-model="value"
      class="tip-upload"
      maxSize="50M"
    >
      <div slot="tip">
        <div class="tip">
          <span class="pl-4">支持PNG/JPG/JPEG/ZIP，文件最大100MB，请保证图片清晰可识别，重新上传将覆盖所有已上传的发票</span>
        </div>
      </div>
    </glp-upload>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { request, action } from '@/config/form'
import { upInvoiceInfo, getInvoiceOrderUpStatus } from '@/api/plb-invoice'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class ToolTip extends Vue {
  request = request

  @Plb.State('orderId') orderId: any

  timmer: any
  resp(res: any) {
    upInvoiceInfo({
      orderId: this.orderId,
      url: res.url
    }).then(res => {
      this.timmerFun()
    })
  }

  @Plb.Mutation('setInitInvoiceList')
  setInitInvoiceList(n: any) {
    return n
  }

  getInvoiceOrderUpStatusFun() {
    getInvoiceOrderUpStatus(this.orderId).then(res => {
      clearInterval(this.timmer)
      this.setInitInvoiceList(res)
    })
  }

  timmerFun() {
    this.timmer = setInterval(() => {
      this.getInvoiceOrderUpStatusFun()
    }, 2000)
  }
}
</script>
<style lang='scss' scope>
.tool-tip-container {
  display: flex;
  width: 100%;
  .button {
    width: 108px;
  }
  .tip {
    flex: 1;
    height: 30px;
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    margin-left: 90px;
    width: calc(100% - 90px);
    background: rgba(255, 245, 238, 1);
    border-radius: 2px;
    border: 1px solid rgba(255, 144, 42, 1);
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 30px;
    }
  }
  .tip-upload {
    position: relative;
    width: 100%;
  }
}
</style>

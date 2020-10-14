<template>
     <div>
            <breadcrumb/>
            <div :class="[$style.processWrap]">
                <div :class="[$style.label]">上传发票信息确认</div>
                <div :class="[$style.process]">
                    <span :class="[$style.text]">{{processText[process]}}</span>
                    <div :class="[$style.inProcess,process?'':$style.finish]"></div>
                </div>
            </div>
            <el-carousel  arrow="always" :autoplay="false" height="600px" @change="change" :class="[$style.carousel]" indicator-position="none" ref="carousel">
              <el-carousel-item v-for="(item,index) in result" :key="index">
                  <div><image-viewer :urlList="[item[0].invoiceFileUrl]"/></div>
              </el-carousel-item>
            </el-carousel>
           <ul :class="[$style.thumbnail]" ref="thumbnail">
             <li v-for="(item,index) in result" :key="index" :class="{[$style.active]:currentIndex===index}" @click="setActiveItem(index)">
               <img :src="item[0].invoiceFileUrl"/>
             </li>
          </ul>
          <glp-card title="发票信息" class="mt-4">
             <div style="color:red;margin:10px 0px;">严格按照发票票面信息保存，否则审核不一致会被驳回</div>
             <edit-form-group :isShowBtn="false" @submit="onSubmit($event,index)" :other="index" :class="{'show':keepBtnShow[index]}" v-for="(item,index) in baseForm" :key="index" class="invoiceInfo">
                  <edit-form :def="baseFormDefs" :form="item" :showMessage="false"></edit-form>
             </edit-form-group>
             <query-table :columns="columns" ref="tb" :title="`发票价税总额：${totalMoney}元，发票张数：${count}张`" :dataSource="resultFlat" :pageable="false" rowKey="id" style="margin-top:40px;">
               <template v-slot:verifyStatus="{row}">
                  {{row.verifyStatus?"成功":"失败"}}
                </template>
             </query-table>
             <div class="text-center mt-5">
                <el-button type="primary" size="small" class="px-5" @click="onVerify">提交验证</el-button>
             </div>
          </glp-card>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'

import { columns, baseFormDefs } from './config'
import ImageViewer from '@/components/image-viewer.vue'
let initData: any = []
@Component({
  components: {
    ImageViewer
  }
})
export default class Confirm extends Vue {
   @Ref() carousel!: any
   @Ref() thumbnail!: any
   @Prop(String) id!: string
   @Watch('baseForm', { deep: true })
   baseFormChange(val: any, oldVal: any) {
     clearTimeout(this.t)
     this.t = setTimeout(() => {
       console.log(JSON.stringify(val[0]), JSON.stringify(initData[0]))
       for (let i = 0; i < val.length; i++) {
         this.$set(this.keepBtnShow, i, JSON.stringify(val[i]) !== JSON.stringify(initData[i]))
       }
     }, 200)
   }

   baseFormDefs = baseFormDefs
   columns=columns
   loading=true
   currentIndex=0
   process=2
   result: any[]=[]
   baseForm: Record<string, any> = []
   keepBtnShow: any=[]
   resultFlat: any=[]
   modifyIndex = 0
   polling: any=''
   totalMoney=0
   count=0
   t: any=null
   processText=['已验证', '识别中...', '待确认验证']
   isSubmit=true
   mounted () {
     this.getOrderDetail()
   }

   setActiveItem (index: number) {
     this.carousel.setActiveItem(index)
     this.modifyIndex = index
     this.dataSpread(this.modifyIndex)
   }

   addAnimation (nowLeft: number) {
     const originLeft = this.thumbnail.scrollLeft
     const diff = nowLeft - originLeft
     const unit = diff / 15
     let i = 0
     const animloop = () => {
       if (i < 15) {
         i++
         this.thumbnail.scrollLeft = `${originLeft + unit * i}`
         window.requestAnimationFrame(animloop)
       }
     }
     animloop()
   }

   change (index: any) {
     this.currentIndex = index
     const originLeft = this.thumbnail.scrollLeft
     const thumbnailWith = this.thumbnail.offsetWidth
     const visualLeftIndex = Math.floor(originLeft / 210)
     const visualRightIndex = Math.ceil((originLeft + thumbnailWith) / 210)
     if (this.currentIndex <= visualLeftIndex) {
       this.addAnimation(this.currentIndex * 210)
     }
     if (this.currentIndex >= visualRightIndex - 1) {
       this.addAnimation((this.currentIndex + 1) * 210 - thumbnailWith)
     }
   }

   dataSpread(index: number) {
     this.baseForm = []
     this.keepBtnShow = []
     initData = []
     for (let i = 0; i < this.result[index].length; i++) {
       this.result[index][i].invoiceType = this.result[index][i].invoiceType.toString()
       initData[i] = { ...this.result[index][i] }
       this.$set(this.baseForm, i, { ...this.result[index][i] })
       this.keepBtnShow[i] = false
     }
   }

   onSubmit (params: any, index: number) {
     if (this.isSubmit === false) {
       return
     }
     this.isSubmit = false
     const first = { ...params[0] }
     console.log(first, index)
     const invoicingTime = first.invoicingTime
     first.invoicingTime = new Date(invoicingTime).getTime()
     delete first.invoiceFileUrl
     this.$http.post<any>(
       '/clientend/invoice/updateInvoiceDetail',
       first
     ).then(data => {
       this.$message({
         type: 'success',
         message: '修改成功'
       })
       this.keepBtnShow[index] = false
       initData[index] = params[0]
       this.resultFlat = this.resultFlat.map((item: any) => {
         if (item.id === params[0].id) {
           return Object.assign({}, item, params[0])
         } else {
           return item
         }
       })
     }).finally(() => {
       this.isSubmit = true
     })
   }

   onVerify () {
     this.$http.post<any>(
       '/clientend/invoice/verifySaveInvoiceInfo',
       { uploadBatchId: this.id }
     ).then(data => {
       this.$router.push(`/certificate/upload/detail/${this.id}`)
     })
   }

   getOrderDetail () {
     // 0:已验证，1:识别中，2:待确认验证
     this.$http.get<any>(
       `clientend/invoice/getVerifyDetail/${this.id}`
     ).then(data => {
       this.process = data.status
       if (this.process === 1) {
         this.polling = setTimeout(() => {
           this.getOrderDetail()
         }, 1000)
         return
       }
       this.result = data.invoiceUploadDetailListDTOList
       if (this.result.length > 0) {
         this.totalMoney = data.invoiceTotalMoney
         this.count = data.invoiceNumber
         this.dataSpread(0)
         this.resultFlat = this.result.flat()
       } else {
         this.$alert('识别失败，跳转到发票上传信息列表', '', {
           confirmButtonText: '确定',
           callback: action => {
             this.$router.push('/certificate/upload')
           }
         })
       }
     })
   }

   destroyed() {
     clearTimeout(this.polling)
   }

   $style!: any
}

</script>

<style lang="scss" module>
.processWrap{
    width:1000px;
    margin:30px auto;
    display:flex;
    .label{
      width:140px;
      line-height: 30px;
      color:#666;
    }
    .process{
       flex:1;
       position: relative;
       background:#d5d7da;
       .text{
          position: absolute;
          top:0;
          left:0;
          width:100%;
          text-align: center;
          color:#fff;
          line-height: 30px;;
       }
      .inProcess{
        height:30px;
        background:#3AC082;
        width:60%;
        &.finish{
          width:100%;
        }
      }
    }

}
.carousel{
   width:1000px;
   margin:0 auto;
}
.thumbnail{
  width:1000px;
  display: flex;
  overflow-x:auto;
  margin:10px auto 40px;
  li{
     box-sizing: border-box;
     width:150px;
     height:86px;
     border:1px solid green;
     flex-shrink:0;
     margin-right:10px;
     cursor: pointer;
     img{
       width:148px;
       height:84px;
       display: block;
     }
     &.active{
       border:3px solid red;
       img{
         width:144px;
         height:80px;
       }
     }
  }
}
</style>
<style lang="scss">
.invoiceInfo{
    height:364px;
   .el-button{
     display: none;
   }
   &.show{
      .el-button{
       display: inline-block;
      }
   }
}
</style>

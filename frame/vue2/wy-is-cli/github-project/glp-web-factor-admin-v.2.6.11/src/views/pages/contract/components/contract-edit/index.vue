<template>
  <edit-form
    :def="baseFormDefs"
    :span="12"
    class="edit-upload-box"
    labelPosition="left"
    :form="contractDetails"
  ></edit-form>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import {
  todoBaseFormDefs,
  ledgerBaseFormDefs,
  baseFormDefs,
  createBaseFormDefsFn,
  emailConfig
} from './config'
import { d, remote } from '@/config/form'
@Component({})
export default class ContractEdit extends Vue {
  @Prop(String) isEdit!: string
  @Prop(Object) form!: any
  @Prop({ default: 'todo' }) flag!: string;
  baseFormDefs: any = ''
  signerListConfig = []
  signerListDetails = {}
  contractDetails: any = {}
  created() {
    if (!this.isEdit) {
      if (this.flag === 'todo') {
        this.baseFormDefs = todoBaseFormDefs
      } else {
        this.baseFormDefs = ledgerBaseFormDefs
      }
      this.contractDetails = {
        signMethod: '',
        autoSign1: '',
        autoSign2: '',
        autoSign3: '',
        signerName1: '',
        signerName2: '',
        signerName3: ''
      }
    } else {
      const { signerList, signMethod, emailNotifyAddress, ...rest } = this.form
      const { signerListConfig, signerListDetail } = createBaseFormDefsFn(
        signerList,
        emailNotifyAddress,
        signMethod
      )
      this.baseFormDefs = [...baseFormDefs].concat(signerListConfig, emailConfig)
      this.contractDetails = { ...rest, signMethod, emailNotifyAddress, ...signerListDetail }
    }
  }

  mounted() {
    setTimeout(() => {
      const editUploadBox: any = document.querySelector('.edit-upload-box')
      const elUploadInput: any = editUploadBox.querySelector('.el-upload__input')
      elUploadInput.onclick = () => {
        this.contractDetails.upload = []
      }
    }, 1000)
  }
}
</script>

<style lang="scss" module>
.textRight {
  text-align: right;
  margin-bottom: 20px;
  .version {
    color: #666;
    font-size: 14px;
    margin-left: 10px;
  }
}
.notice {
  color: #666;
  font-size: 14px;
  margin-left: 10px;
}
</style>
<style lang="scss">
.edit-upload-box{
  .el-col-xl-9{
    height:70px;
  }
   .el-col-xl-11{
      height:52px;
  }
}
</style>
<style lang="scss">
  .edit-upload-box{
    .glp-text-secondary{
      word-break:break-all;
      word-wrap:break-word
    }
  }
</style>

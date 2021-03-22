const templateDataName = 'TEMPLATE_DATA'
const templatePlaceHolder = 'TEMPLATE_PLACEHOLDER'

const template = `<template>
<div class="contract-page" id='printPage'>
<div id='btnBox'>
      <el-button id='btnPrint' type='primary' @click.native="print">打印</el-button>
    </div>
  <el-row type="flex">
    <el-col :span="24">
      <div
        class="contract-content ql-editor"
        id="contract-content"
        data-test="合同具体内容123123"
        ref="contractContent"
      >
        ${templatePlaceHolder}
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {data} from '../mixins/index'
export default {
mixins: [data]
};
</script>
<style lang="scss" scoped>
@import '@styles/temp.scss'
</style>
`

export {
  templateDataName,
  template,
  templatePlaceHolder
}

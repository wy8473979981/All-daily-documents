<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收明细
-->
<template>
  <div>
    <ysn-dialog
      :title="'提示'"
      :width="'484px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :is-determine="false"
      :is-cancel="false"
      :out-close="outClose"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div v-if="radioType">
          <div class=" title pb-8">请选择生成账单类型</div>
          <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
            <ysn-formItem
              :form="formData"
              :config="configData"
              :column="2"
              clearable
            />
          </el-form>
        </div>
        <div v-if="formData.radio==='1'&&!radioType">
          <div class=" title pb-8">生成账单详情：应收账单数：1条 ，合同数：1个 ，费项：1条</div>
          <div class=" title pb-8">账单编号：001~010</div>
        </div>
        <div v-if="formData.radio==='2'&&!radioType">
          <div class=" title pb-8">负数和为0的应收不能生成账单，已帮您自动去除。</div>
          <div class=" title pb-8">生成账单详情：应收账单数：1条 ，合同数：1个 ，费项：1条</div>
          <div class=" title pb-8">账单编号：001~020</div>
        </div>
      </template>
      <template #btn>
        <ysn-btn v-if="radioType" class="mr-8" type="primary" @click="sureBtn">确定</ysn-btn>
        <ysn-btn v-else class="mr-8" type="primary" @click="sureChoose">确定</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
export default {
  name: 'ReceviableDefineiteDetails',
  components: { },
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formDatas: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  // 表单数据
  data() {
    return {
      outClose: true,
      formData: {
        radio: '' // 单选状态
      },
      // 单选配置
      configData: [
        {
          itemType: 'radio',
          prop: 'radio',
          label: '',
          list: [
            { label: '一个合同一个账单', value: '1' },
            { label: '多个合同一个账单', value: '2' }
          ]
        }
      ],
      // 单选弹窗状态
      radioType: true // 默认为true
    }
  },
  computed: {

  },
  methods: {
    // 确定按钮
    sureBtn() {
      const radio = this.formData.radio
      if (radio) {
        this.radioType = false
      }
    },
    sureChoose() {
      this.$message({
        message: '账单生成成功，请到应收账单模块查询。',
        type: 'success'
      }, 2000)
      this.closeDialog()
    },
    // 取消按钮
    closeDialog() {
      this.radioType = true
      this.formData.radio = ''
      this.$emit('closeDialog')
    }
  }
}
</script>
<style scoped>
.title{
    color:#050101;
    font-size:14px;
}
</style>

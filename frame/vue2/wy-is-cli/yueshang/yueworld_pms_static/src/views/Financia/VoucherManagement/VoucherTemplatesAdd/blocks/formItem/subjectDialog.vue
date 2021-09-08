/*
 * @Author: xiaoxie
 * @Date: 2021-08-17 11:05:18
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-25 11:02:32
 */
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'选择科目取数标示'" :width="'680px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          size="small"
        >
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="1"
            clearable
          />
        </el-form>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" @click="saveBox">确认</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    currentVal: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      formData: { // 表单
        subjectId: null
      },
      configData: [
        {
          itemType: 'select',
          prop: 'subjectId',
          label: '',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('subjectList'),
          listName: 'label',
          listValue: 'value'
        }
      ]
    }
  },
  methods: {
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    saveBox() {
      const obj = {
        arrVal: this.formData.subjectId, // 记录顺序
        arrLabel: null // 赋值
      }
      const listArr = this.$PUBFN.getOptionsList('subjectList')
      const that = this
      listArr.forEach((item) => {
        if (item.value === that.formData.subjectId) {
          obj.arrLabel = item.label
        }
      })
      this.$emit('getData', obj)
      this.closeDialog()
    }
  }
}
</script>

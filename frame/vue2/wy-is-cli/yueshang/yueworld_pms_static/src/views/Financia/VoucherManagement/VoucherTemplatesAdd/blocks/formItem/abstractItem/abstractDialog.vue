/*
 * @Author: xiaoxie
 * @Date: 2021-08-18 14:55:00
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-18 10:21:10
 */
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'选择摘要生成规则、或自定义摘要'" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗 -->
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
            :column="4"
            clearable
          />
        </el-form>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" @click="saveBox">保存</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configData } from './dialogConfig.js'
export default {
  name: 'DialogRentPlan',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    currentVal: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      formData: { // 表单
        abstractOne: null,
        abstractTwo: null,
        abstractThree: null,
        abstractFour: null,
        abstractFive: null,
        abstractSix: null,
        abstractSeven: null
      },
      configData: configData.call(this)
    }
  },
  created() {
  },
  methods: {
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
      for (const key in this.formData) {
        this.formData[key] = null
      }
    },
    saveBox() {
      const obj = {
        arrVal: [], // 记录顺序
        arrLabel: [] // 赋值
      }
      const listArr = this.$PUBFN.getOptionsList('abstractist')
      const that = this
      Object.keys(this.formData).forEach(key => {
        if (that.formData[key] === null) {
          obj.arrVal.push('')
        } else {
          obj.arrVal.push(that.formData[key])
          listArr.forEach((item) => {
            if (item.value === that.formData[key]) {
              obj.arrLabel.push(item.label)
            }
          })
        }
      })
      this.$emit('getData', obj)
      this.closeDialog()
    }
  }
}
</script>

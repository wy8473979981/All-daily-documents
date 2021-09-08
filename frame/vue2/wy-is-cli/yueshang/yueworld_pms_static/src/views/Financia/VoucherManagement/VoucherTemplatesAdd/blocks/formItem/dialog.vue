/*
 * @Author: xiaoxie
 * @Date: 2021-08-17 14:55:00
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-24 11:05:35
 */
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'选择合并分录规则'" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
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
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    currentVal: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      formData: { // 表单
        mergRuleOne: null,
        mergRuleTwo: null,
        mergRuleThree: null,
        mergRuleFour: null,
        mergRuleFive: null,
        mergRuleSix: null
      },
      configData: [
        {
          itemType: 'select',
          prop: 'mergRuleOne',
          label: '规则1',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList'),
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'select',
          prop: 'mergRuleTwo',
          label: '规则2',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList')
        }, {
          itemType: 'select',
          prop: 'mergRuleThree',
          label: '规则3',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList')
        }, {
          itemType: 'select',
          prop: 'mergRuleFour',
          label: '规则4',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList')
        }, {
          itemType: 'select',
          prop: 'mergRuleFive',
          label: '规则5',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList')
        }, {
          itemType: 'select',
          prop: 'mergRuleSix',
          label: '规则6',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('mergRuleList')
        }
      ]
    }
  },
  created() {
    console.log(this.currentVal)
  },
  methods: {
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    saveBox() {
      const obj = {
        arrVal: [], // 记录顺序
        arrLabel: [] // 赋值
      }
      const listArr = this.$PUBFN.getOptionsList('mergRuleList')
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

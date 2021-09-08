/*
 * @Author: xiaoxie
 * @Date: 2021-08-03 15:16:35
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-25 10:20:22
 */
<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="currentFormData"
      label-position="top"
      size="small"
    >
      <ysn-formItem
        :form="currentFormData"
        :config="configData"
        :column="5"
        clearable
      />
    </el-form>
    <!-- <Dialog /> -->
    <Dialog :is-show-dialog="dialogAddVisible" :current-val="currentVal" @closeDialog="closeDialog" @getData="getDataBox" />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import Dialog from './formItem/dialog'
export default {
  name: 'From',
  components: {
    Dialog
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'functionData',
    event: 'change'
  },
  props: {
    functionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogAddVisible: false, // 弹窗
      currentVal: null, // 选择数据
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'isSplit',
          label: '是否拆分',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isSplit')
        },
        {
          itemType: 'select',
          prop: 'splitType',
          label: '拆分类型',
          placeholder: '自动带入，允许修改',
          width: '206px',
          list: this.$PUBFN.getOptionsList('splitType')
        },
        {
          itemType: 'select',
          prop: 'isMerge',
          label: '是否合并分录',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isMerge')
        },
        {
          itemType: 'input',
          prop: 'mergRule',
          label: '合并规则',
          placeholder: '请选择',
          width: '206px',
          focus: this.changeBox
        },
        {
          itemType: 'select',
          prop: 'isOffset',
          label: '是否冲抵',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isOffset')
        }
      ]
    }
  },
  methods: {
    changeBox(val) {
      this.dialogAddVisible = true
    },
    // 关闭
    closeDialog() {
      this.dialogAddVisible = false
    },
    getDataBox(val) {
      this.currentVal = val
      this.currentFormData.mergRule = val.arrLabel.toString()
      this.currentFormData.mergRuleArr = val.arrVal
    }

  }
}
</script>

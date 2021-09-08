<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增-自动核销
-->

<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <!-- 信息模块-->
      <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'AutomaticWriteOff',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'automaticWriteOff',
    event: 'change'
  },
  props: {
    automaticWriteOff: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        verificationOrder: [
          { required: true, message: '请选择核销顺序' }
        ],
        isPriorityOwe: [
          { required: true, message: '请选择是否优先欠费' }
        ],
        defaultTemporarilyFeeName: [
          { required: true, message: '请选择默认进暂收费项' }
        ]
      },
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'verificationOrder',
          label: '核销顺序',
          width: '206px',
          placeholder: '请选择',
          required: true,
          list: this.$PUBFN.getOptionsList('writeOffSequence')
        },
        {
          itemType: 'select',
          prop: 'isPriorityOwe',
          required: true,
          width: '206px',
          label: '是否优先欠费',
          list: this.$PUBFN.getOptionsList('unnamedFunds')
        },
        {
          itemType: 'select',
          prop: 'defaultTemporarilyFeeName',
          required: true,
          label: '默认进暂收费项',
          width: '206px',
          list: this.$PUBFN.getOptionsList('feeName')
        },
        {
          itemType: 'select',
          prop: 'isTiming',
          width: '206px',
          label: '是否定时',
          change: this.isTiming,
          list: this.$PUBFN.getOptionsList('isTiming')
        }
      ]
    }
  },
  methods: {
    isTiming(val) {
      this.$emit('comChange', val)
    }
  }
}
</script>

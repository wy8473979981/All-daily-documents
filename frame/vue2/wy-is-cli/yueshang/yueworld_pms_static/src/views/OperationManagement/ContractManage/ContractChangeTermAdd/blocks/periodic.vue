<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-新增-周期型费用
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'Periodic',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'periodic',
    event: 'change'
  },
  props: {
    periodic: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        algorithmId: [{ required: true, message: '收费方式不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      return [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'select',
          prop: 'algorithmId',
          required: true,
          label: '收费方式',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('chargingMethod'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        }
      ]
    }
  },
  methods: {}

}
</script>


<!--
 * @Description:
 * @Author: wyz
 * @LastEditors: wyz
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="currentFormData" :config="configData" :column="$attrs.column" clearable />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'BeginDate',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'beginDate',
    event: 'change'
  },
  props: {
    beginDate: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    configData() {
      const that = this
      const configData = []
      for (let i = 0; i < that.currentFormData.freeNameBeginDate.length; i++) {
        const freeNameBeginDate = {
          itemType: 'datePicker',
          placeholder: '请选择',
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          disabled: !that.data.essentialData.contNo,
          prop: this.currentFormData.freeNameBeginDate[i].key,
          label: this.currentFormData.freeNameBeginDate[i].name,
        }
        configData.push(freeNameBeginDate)
      }
      return configData
    },
    rulesForm() {
      return {}
    }
  },
}
</script>


<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :form-data="formData"
    ></ys-n-container>
</template>

<script>
// 考核出租面积明细(项目)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { leaseRate } from 'api/modules/LeaseRate'
import { parseTime } from 'utils/utils'
export default {
  name: 'CheckOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig.call(this),

      formData: {
        chargeType: '',
        squareFlag: '',
        projectId: '',
        startDate: parseTime(new Date(), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(), '{y}-{m}-{d}'),
      },

      requestConfig: {
        query: {
          api: leaseRate.getListByCheckOfProject
        },

        export: {
          type: 'exportOfLrCheckProject',
        },
      },
    }
  },

}
</script>

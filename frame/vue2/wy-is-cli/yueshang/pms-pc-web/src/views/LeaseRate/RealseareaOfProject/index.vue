<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :form-data="formData"
    ></ys-n-container>
</template>

<script>
// 项目出租面积明细
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { leaseRate } from 'api/modules/LeaseRate'
import { parseTime } from 'utils/utils'
export default {
  name: 'RealseareaOfProject',

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
          api: leaseRate.getListByLeaseOfHeadquarters,
        }
      }
    }
  },

}
</script>

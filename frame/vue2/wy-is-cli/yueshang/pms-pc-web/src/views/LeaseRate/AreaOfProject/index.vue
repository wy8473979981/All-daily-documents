<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :form-data="formData"
    ></ys-n-container>
</template>

<script>
// 项目总面积明细
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { leaseRate } from 'api/modules/LeaseRate'
import { parseTime } from 'utils/utils'
export default {
  name: 'AreaOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig,

      formData: {
        squareFlag: '',
        projectId: '',
        startDate: parseTime(new Date(), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(), '{y}-{m}-{d}'),
      },

      requestConfig: {
        query: {
          api: leaseRate.getListByAreaOfProject,
        }
      }
    }
  },

}
</script>

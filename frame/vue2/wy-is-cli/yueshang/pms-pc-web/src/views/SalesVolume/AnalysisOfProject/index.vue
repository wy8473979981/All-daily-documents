<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :form-data="formData"
    :request-config="requestConfig"
    ></ys-n-container>
</template>

<script>
// 销售分析(项目)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { salesVolume } from 'api/modules/SalesVolume'
import { parseTime } from 'utils/utils'
export default {
  name: 'AnalysisOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig,

      formData: {
        chargeType: '',
        primaryForms: '',
        projectId: '',
        startDate: parseTime(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
      },

      requestConfig: {
        query: {
          api: salesVolume.getListByAnalysisOfProject
        },

        export: {
          type: 'exportOfSvAnalysisProject',
        },
      }
    }
  },

}
</script>

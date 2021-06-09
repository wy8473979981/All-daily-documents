<template>
  <ys-n-container
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="月平均租金(元/m²)"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    ></ys-n-container>
</template>

<script>
// 平均租金（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, X, TableConfig } from './config'
import { averageRent } from 'api/modules/AverageRent'
import { parseTime } from 'utils/utils'
export default {
  name: 'AverageOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig,

      formData: {
        projectId: '',
        stage: '',
        year: parseTime(new Date(), '{y}'),
      },

      requestConfig: {
        query: {
          api: averageRent.getListByAverageOfProject,
          responseKey: 'projectMonthlyAvgRentFeeDataList'
        },

        echarts: {
          keys: { currYear: 'yearCurr', lastYear: 'yearLast', currData: 'avgRentFee', lastData: 'avgRentFeeLast' },
          responseKey: 'monthlyAvgRentFeeOfCurYearAndLastYearList'
        },
      },
    }
  },

}
</script>
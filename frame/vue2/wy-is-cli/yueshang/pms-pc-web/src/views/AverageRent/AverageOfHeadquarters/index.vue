<template>
  <ys-n-container
    showList
    :rateConfig="rateConfig"
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="月平均租金(元/m²)"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 平均租金（总部）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { RateConfig, FormConfig, X, TableConfig } from './config'
import { averageRent } from 'api/modules/AverageRent'
import { parseTime, setSession } from 'utils/utils'
export default {
  name: 'AverageOfHeadquarters',

  components: { YsNContainer },

  data() {
    return {
      rateConfig: RateConfig,

      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig.call(this),

      formData: {
        chargeType: '',
        stage: '',
        areaId: '',
        province: '',
        operStatus: '2',
        startDate: parseTime(new Date(), '{y}-{m}'),
        endDate: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: averageRent.getListByAverageOfHeadquarters,
          responseKey: 'projectAvgRentFeeRankingList'
        },

        echarts: {
          keys: { currYear: 'yearCurr', lastYear: 'yearLast', currData: 'avgRentFee', lastData: 'avgRentFeeLast' },
          responseKey: 'monthlyAvgRentFeeOfCurYearAndLastYearList'
        },

        list: {
          responseKey: ''
        },
      },
    }
  },

  methods: {
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },
    handleLinkClick(data) {
      if (data.row.projectId && !data.row.isSummary) {
        const formData = {
          projectId: data.row.projectId,
          stage: this.currentFormData.stage,
          year: this.currentFormData.startDate.substring(0, 4),
        }
        setSession.call(this, 'ar-average-project', formData)
      }
    }
  }

}
</script>
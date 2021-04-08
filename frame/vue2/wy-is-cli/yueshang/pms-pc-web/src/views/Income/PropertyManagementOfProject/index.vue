<template>
  <ys-n-container
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="物管收缴率(%)"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBeforeSearch="asyncBeforeSearch"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    ></ys-n-container>
</template>

<script>
// 物管收缴率（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, X, TableConfig } from './config'
import { income } from 'api/modules/Income'
import { parseTime } from 'utils/utils'
export default {
  name: 'PropertyManagementOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig,

      formData: {
        projectId: '',
        chargeType: '',
        feeType: '2',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: income.getListByRentOfHeadquarters,
          responseKey: 'tableData'
        },

        echarts: {
          api: income.getChart,
          keys: { currYear: 'yearCurr', lastYear: 'yearLast', currData: 'contCollectionRate', lastData: 'contCollectionRateLast' }
        },

        export: {
          type: 'exportOfIncomeProperymanagementtProject',
        },
      },
    }
  },

  methods: {
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },
    
    asyncBefortTableUpdate(data) {
      const tableData = data.map(item => {
        return Object.assign({}, item, {
          htStart: this.currentFormData.yearMonth,
          htRange: `${this.currentFormData.yearMonth.substring(0, 4)}-01~${this.currentFormData.yearMonth}`,
          qzStart: this.currentFormData.yearMonth,
          qzRange: `${this.currentFormData.yearMonth.substring(0, 4)}-01~${this.currentFormData.yearMonth}`,
          isSummary: item.id === '合计'
        })
      })

      return { tableData }
    },
  }

}
</script>
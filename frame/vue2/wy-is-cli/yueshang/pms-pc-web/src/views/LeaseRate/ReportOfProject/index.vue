<template>
  <ys-n-container
    showList
    :rateConfig="rateConfig"
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="考核出租率"
    chartUnit="%"
    chartSubTitle="按月统计出租率（例：8月出租率为8月31日出租率）"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :form-data="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 出租率排名(项目汇总)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { RateConfig, FormConfig, X, TableConfig } from './config'
import { leaseRate } from 'api/modules/LeaseRate'
import { setSession, parseTime } from 'utils/utils'
export default {
  name: 'ReportOfProject',

  components: { YsNContainer },

  data() {
    return {
      rateConfig: RateConfig,

      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig.call(this),

      formData: {
        projectId: '',
        chargeType: '',
        squareFlag: '',
        areaId: '',
        province: '',
        stage: '',
        startDate: parseTime(new Date(), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: leaseRate.getListByLeaseOfHeadquarters,
          responseKey: 'tableData'
        },
        echarts: {
          api: leaseRate.getListByQueryLeaseRateList,
          keys: { currYear: 'yearCurr', lastYear: 'yearLast', currData: 'leaseRate', lastData: 'leaseRateLast' }
        },
        list: {
          responseKey: 'list'
        },
      },
    }
  },

  methods: {
    asyncBefortTableUpdate(data) {
      const list = { leaseRate: data[0] && data[0].leaseRate }

      return { list, tableData: data.map(item => Object.assign(item, { isSummary: item.summary })) }
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return Object.assign(data, { yearMonth: data.endDate.substring(0, 7) })
    },

    handleLinkClick(data, url) {
      if (data.row.id && !data.row.isSummary) {
        const formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          startDate: this.currentFormData.startDate,
          endDate: this.currentFormData.endDate,
          squareFlag: this.currentFormData.squareFlag,
        }
        setSession.call(this, url, formData)
      }
    },
  },

}
</script>
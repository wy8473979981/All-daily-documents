<template>
  <ys-n-container
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="考核开业率"
    chartUnit="%"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBeforeSearch="asyncBeforeSearch"
    >
    <template slot="title">
      <el-button class="title-right" type="text" @click="handleToSummary">开业率汇总</el-button>
    </template>
  </ys-n-container>
</template>

<script>
// 开业率排名（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, X, TableConfig } from './config'
import { openingRate } from 'api/modules/OpeningRate'
import { parseTime, setSession } from 'utils/utils'
export default {
  name: 'RankingOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig.call(this),

      formData: {
        chargeType: '',
        projectId: '',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,
      
      requestConfig: {
        query: {
          api: openingRate.getListByRankingOfProject,
        },
        echarts: {
          api: openingRate.getListByQueryOpenRateList,
          keys: { currYear: 'yearCurr', lastYear: 'yearLast', currData: 'openRate', lastData: 'openRateLast' }
        },
      },
    }
  },

  methods: {
    handleLinkClick(data) {
      if (data.row.id && data.row.id !== '合计') {
        const formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          squareFlag: this.currentFormData.squareFlag,
          yearMonth: data.row.yearMonth,
        }
        setSession.call(this, 'or-floor-project', formData)
      }
    },
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data;
    },

    handleToSummary() {
      setSession.call(this, 'or-summary-project', { projectId: this.currentFormData.projectId });
    },
  }

}
</script>

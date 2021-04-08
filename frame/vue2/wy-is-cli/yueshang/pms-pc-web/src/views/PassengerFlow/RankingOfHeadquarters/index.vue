<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :formData="formData"
    :requestConfig="requestConfig"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 客流排名(总部)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { passengerFlow } from 'api/modules/PassengerFlow'
import { parseTime, setSession } from 'utils/utils'
export default {
  name: 'RankingOfHeadquarters',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig(this.handleLinkClick),

      // 曲鹏翰跟梁天沟通了下，客流排名（总部）这里，默认日期改成昨天。其它接口默认还是当天。因为数仓那边客流日表，一天一更新，所以查今天的话，是没数据的，看起来不好看
      formData: {
        stage: '',
        areaId: '',
        province: '',
        startDate: parseTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: passengerFlow.getListByRankingOfHeadquarters
        },

        export: {
          type: 'exportOfPfRankingHeadquarters',
        },
      }
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
          startDate: this.currentFormData.startDate,
          endDate: this.currentFormData.endDate
        }
        setSession.call(this, 'pf-analysis-project', formData)
      }
    },
  },

}
</script>

<template>
  <ys-n-container
    :form-config="formConfig"
    :form-data="formData"
    :table-config="tableConfig"
    :request-config="requestConfig"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 销售排名(总部)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { salesVolume } from 'api/modules/SalesVolume'
import { parseTime, setSession } from 'utils/utils'
export default {
  name: 'RankingOfHeadquarters',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig.call(this),

      formData: {
        chargeType: '',
        stage: '',
        areaId: '',
        province: '',
        primaryForms: '',
        isAssess: 'empty',
        startDate: parseTime(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: salesVolume.getListByRankingOfHeadquarters,
          reponseKey: ''
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
          endDate: this.currentFormData.endDate,
          chargeType: this.currentFormData.chargeType,
          primaryForms: this.currentFormData.primaryForms,
        }

        setSession.call(this, 'sv-analysis-project', formData)
      }
    },
  }

}
</script>

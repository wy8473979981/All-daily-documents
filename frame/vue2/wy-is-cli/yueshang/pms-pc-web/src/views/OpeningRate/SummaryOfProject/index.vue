<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 开业率汇总排名（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { openingRate } from 'api/modules/OpeningRate'
import { setSession, parseTime } from 'utils/utils'
export default {
  name: 'SummaryOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig(this.handleLinkClick),

      formData: {
        projectId: '',
        chargeType: '',
        squareFlag: '',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: openingRate.getListBySummaryOfProject
        },

        export: {
          type: 'exportOfOrSummaryProject',
        }
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
          yearMonth: this.currentFormData.yearMonth,
        }
        setSession.call(this, 'or-check-project', formData)
      }
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },
  }

}
</script>

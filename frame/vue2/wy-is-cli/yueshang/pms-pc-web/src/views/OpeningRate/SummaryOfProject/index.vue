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

      tableConfig: TableConfig.call(this),

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
      },
    }
  },

  methods: {
    handleLinkClick(data) {
      this.handleToOther(data, 'or-check-project')
    },
    handleLinkClickToRent(data) {
      this.handleToOther(data, 'or-rent-project')
    },

    handleLinkClickToArea(data) {
      this.handleToOther(data, 'or-area-project')
    },

    handleToOther(data, url) {
      if (data.row.id && data.row.id !== '合计') {
        const formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          squareFlag: this.currentFormData.squareFlag,
          yearMonth: data.row.yearMonth,
        }
        setSession.call(this, url, formData)
      }
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },
  }

}
</script>

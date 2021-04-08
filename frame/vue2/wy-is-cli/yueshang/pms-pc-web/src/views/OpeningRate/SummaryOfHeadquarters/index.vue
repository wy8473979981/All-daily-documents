<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
    ></ys-n-container>
</template>

<script>
// 开业率汇总排名（总部）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { openingRate } from 'api/modules/OpeningRate'
import { parseTime, setSession } from 'utils/utils'
export default {
  name: 'SummaryOfHeadquarters',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      formData: {
        chargeType: '',
        areaId: '',
        province: '',
        squareFlag: '',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: openingRate.getListBySummaryOfHeadquarters
        },

        export: {
          type: 'exportOfOrSummaryHeadquarters',
        }
      },
    }
  },

  computed: {
    tableConfig() {
      return TableConfig(this.handleLinkClick)
    }
  },

  methods: {
    asyncBefortTableUpdate(data) {
      const list = data && data.map(item => {
        if (item.id == '合计') {
          return Object.assign(item, { isSummary: true })
        }
        return item
      });

      return list
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },

    handleLinkClick(data) {
      if (data.row.id && data.row.id !== '合计') {
        const formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          squareFlag: this.currentFormData.squareFlag,
          yearMonth: this.currentFormData.yearMonth,
        }
        setSession.call(this, 'or-summary-project', formData)
      }
    }
  }

}
</script>

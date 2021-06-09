<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :formData="formData"
    :requestConfig="requestConfig"
    :asyncBeforeSearch="asyncBeforeSearch"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    ></ys-n-container>
</template>

<script>
// 客流分析(项目)
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { passengerFlow } from 'api/modules/PassengerFlow'
import { setSession, parseTime } from 'utils/utils'
export default {
  name: 'AnalysisOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig.call(this),

      formData: {
        projectId: '',
        startDate: parseTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: passengerFlow.getListByAnalysisOfProject
        },
      }
    }
  },

  methods: {
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },
    
    asyncBefortTableUpdate(data) {
      return data instanceof Array ? data : [data];
    },

    handleLinkClick(data) {
      if (data.row.projectId) {
        const formData = {
          projectId: data.row.projectId,
          yearMonth: this.currentFormData.endDate.substring(0, 7),
        }
        setSession.call(this, 'pf-daily-project', formData)
      }
    }
  }

}
</script>

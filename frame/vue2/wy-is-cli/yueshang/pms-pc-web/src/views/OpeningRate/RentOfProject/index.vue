<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    ></ys-n-container>
</template>

<script>
// 押不抵租面积明细（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { openingRate } from 'api/modules/OpeningRate'
import { parseTime } from 'utils/utils'
export default {
  name: 'RentOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig,

      formData: {
        projectId: '',
        chargeType: '',
        squareFlag: '',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      requestConfig: {
        query: {
          api: openingRate.getListByRentOfProject
        }
      },
    }
  },

}
</script>

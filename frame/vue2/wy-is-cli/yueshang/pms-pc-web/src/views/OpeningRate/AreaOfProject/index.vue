<template>
  <ys-n-container
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    ></ys-n-container>
</template>

<script>
// 开业率面积明细（项目）
import YsNContainer from 'common/components/YsNContainer/index.vue'
import { FormConfig, TableConfig } from './config'
import { openingRate } from 'api/modules/OpeningRate'
import { parseTime } from 'utils/utils'
export default {
  name: 'AreaOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig,

      tableConfig: TableConfig,

      formData: {
        chargeType: null,
        squareFlag: null,
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      requestConfig: {
        query: {
          api: openingRate.getListByAreaOfProject
        }
      },
    }
  },

}
</script>

<template>
  <YsNCalendarContainer
      :form-config="formConfig"
      :formData="formData"
      :request-config="requestConfig"
      calendarUnit="单位:人"
      :calendarSpotList="calendarSpotList"
    />
</template>

<script>
import { FormConfig } from './config'
import { parseTime } from 'utils/utils'
import { passengerFlow } from 'api/modules/PassengerFlow'
import YsNCalendarContainer from '@/common/components/YsNCalendarContainer'
export default {
  name: 'DailyOfProject',

  components: { YsNCalendarContainer },

  data() {
    return {
      formData: {
        projectId: '',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },
      formConfig: FormConfig,

      calendarSpotList: [
        {
          label: '实际客流',
          color: '#5C9EFA',
          key: 'actualFlow'
        },
      ],

      requestConfig: {
        query: {
          api: passengerFlow.getListByDailyOfProject,
        },
      },
    }
  },

};
</script>

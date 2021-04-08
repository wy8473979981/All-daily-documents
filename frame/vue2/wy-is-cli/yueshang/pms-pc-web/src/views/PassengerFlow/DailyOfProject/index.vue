<template>
  <div class="page" v-loading.lock="loading" :class="{ 'overflow-hidden': loading }">

    <div class="page-title">
      <div class="page-title__main">{{ $route.meta.title }}</div>
    </div>

    <div class="page-search">
      <ys-n-search
        v-model="formData"
        :config="formConfig"
        :update="updateForm"
        @search="handleSearch"
        @reset="handleReset"
      />
    </div>

    <calendar :list="calendarList"/>
  </div>
</template>

<script>
import { FormConfig } from './config'
import { getSession, parseTime } from 'utils/utils'
import { passengerFlow } from 'api/modules/PassengerFlow'
import Calendar from './calendar'
export default {
  name: 'DailyOfProject',

  components: { Calendar },

  data() {
    return {
      loading: false,
      formData: {
        projectId: getSession('pf-daily-project').projectId || '',
        yearMonth: getSession('pf-daily-project').yearMonth || parseTime(new Date(), '{y}-{m}'),
      },
      formConfig: FormConfig,

      calendarList: [],
      updateForm: 1,
    }
  },

  created() {
    console.log('hash', window.location.hash)
    if (window.location.hash.includes('type=pd')) {
      // window.addEventListener('message', this.getMessage, false)
      const formData = JSON.parse(this.$route.query.data).formData;
      if (formData.projectId === '') {
        formData.projectId = 'empty'
      }
      this.currentFormData = Object.assign(this.formData, formData);
      this.updateForm++;
      this.fetchData()
    } else {
      this.fetchData(); // 本地调试使用
    }
  },

  methods: {
    getMessage(event) {
      console.log('cccc')
      if (event.data.formData) {
        this.formData = Object.assign(this.formData, event.data.formData);
        this.updateForm++;
      }
      this.fetchData()
      window.removeEventListener('message', this.getMessage, false)
    },
    fetchData() {
      const sendData = {
        projectId: this.formData.projectId === 'empty' ? '' : this.formData.projectId,
        yearMonth: this.formData.yearMonth
      }
      passengerFlow.getListByDailyOfProject(sendData).then(res => {
        this.calendarList = res;
      })
    },
    handleSearch() {
      this.fetchData();
    },
    handleReset() {
      this.fetchData();
    },
  }
};
</script>

<style lang="scss" scoped>
.page.overflow-hidden {
  overflow: hidden;
}
</style>

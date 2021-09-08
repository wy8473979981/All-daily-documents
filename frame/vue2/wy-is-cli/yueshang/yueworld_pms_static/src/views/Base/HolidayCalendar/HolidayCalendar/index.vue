<template>
  <div class="mr-24">
    <el-form>
      <ysn-formItem class="mb-16" :form="formData" :config="configData" :column="1" clearable />
      <ysn-calendar
        :value="new Date(formData.date)"
        :form-data="formData"
        head-position="center"
        holiday-setting
        :next="false"
        :prev="false"
      />
    </el-form>
  </div>
</template>

<script>
import { configData } from './config.js'
export default {
  name: 'HolidayCalendar',
  data() {
    return {
      formData: {
        date: new Date()
      },
      configData: configData.call(this),
      firstDayPfWeek: 7 // 日历从星期几开始显示
    }
  },
  watch: {
    formData() {
      console.log(this.formData)
    }
  },
  methods: {
  }
}
</script>

<template>
  <div
    class="page"
    id="page"
    v-loading.lock="loading"
    :class="{ 'overflow-hidden': loadingLock }"
  >
    <div class="page-title">
      <div class="page-title__main">{{ $route.meta.title }}</div>
      <div class="page-title__sub" v-show="subTitle">{{ subTitle }}</div>

      <slot name="title"></slot>
    </div>

    <div class="page-search">
      <ys-n-search
        v-model="currentFormData"
        :update="updateForm"
        :config="formConfig"
        :showExport="showExport"
        @search="handleSearch"
        @reset="handleReset"
        @export="handleExport"
      />
    </div>

    <div class="page-calendar">
      <calendar
        :list="currentCalendarData"
        :unit="calendarUnit"
        :spotList="calendarSpotList"
      ></calendar>
    </div>
  </div>
</template>

<script>
import queryFormatterMixins from '@/mixins/queryFormatterMixins'

import Calendar from './_calendar'

export default {
  name: 'YsNCalendarContainer',

  components: { Calendar },

  mixins: [queryFormatterMixins],

  props: {
    calendarUnit: String, // 日历 左上角显示的单位
    calendarSpotList: Array, // 日历 右上角显示的配置提示
  },

  data() {
    return {
      currentCalendarData: []
    }
  },

  created() {
    this.handleDataBefortLoad()
  },
}
</script>
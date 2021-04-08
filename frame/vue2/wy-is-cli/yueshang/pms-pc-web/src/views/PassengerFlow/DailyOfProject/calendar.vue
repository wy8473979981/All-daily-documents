<template>
  <div class="calendar">
    <div class="calendar-tips">
      <div class="calendar-tips__unit">单位:人</div>
      <div class="calendar-tips__remark spot">实际客流</div>
    </div>
    <div class="calendar-header">
      <div
        class="calendar-header__item"
        v-for="(item, index) in calendarConfig"
        :key="index"
        :class="{isHoliday: item.isHoliday}"
      >
        {{ item.zn }}
      </div>
    </div>

    <div class="calendar-body">
      <div class="calendar-body__list"
        v-for="(list, index) in displayList"
        :key="index">
        <div class="calendar-body__item"
          v-for="(item, idx) in calendarConfig"
          :key="idx"
          :class="{isHoliday: item.isHoliday, isNone: !list[idx]}">
          <div class="calendar-body__item-today">{{ list[idx] && list[idx].today }}</div>
          <div class="calendar-body__item-data spot" v-show="list[idx] && list[idx].actualFlow">{{ list[idx] && list[idx].actualFlow }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { formatNumber } from 'utils/utils'
export default {
  name: 'DailyOfProjectCalendar',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      weekJson: ['', '一', '二', '三', '四', '五', '六', '日'],
      weekStart: 7,
    };
  },

  computed: {
    currentList() {
      const currentList = this.list.map((item) => {
        const ext = {
          today: item.date.split('-')[2],
          zn: this.weekJson[item.dayOfWeek],
          actualFlow: formatNumber(item.actualFlow, '', 0)
        };
        return Object.assign(item, ext);
      });
      return currentList;
    },

    calendarConfig() {
      const idx = this.currentList.findIndex((item) => item.dayOfWeek === 1);
      let config = idx === -1 ? [] : this.currentList.slice(idx, idx + 7);
      if (config.length && this.weekStart === 7) {
        const index = config.findIndex((item) => item.dayOfWeek === 7);
        const startWeek = config[index];
        config.splice(index, 1);
        config.unshift(startWeek);
      }
      return config;
    },

    startWeeks() {
      return this.calendarConfig.map(item => {
        return {
          zn: item.zn,
          isHoliday: item.isHoliday,
          dayOfWeek: item.dayOfWeek,
          today: ''
        }
      })
    },

    displayList() {
      let length = 0;
      if (this.currentList.length === 0) return []
      if (this.startWeek === 7) {
        length = this.currentList[0].dayOfWeek
        if (length === 7) length = 0
      } else {
        length = this.currentList[0].dayOfWeek - 1
      }

      const startWeeks = this.startWeeks.slice(0, length)

      const totalWeeks = [...startWeeks, ...this.currentList]

      let list = []
      for (let i = 0; i < Math.ceil(totalWeeks.length / 7); i ++) {
        list.push(totalWeeks.slice(i * 7, (i + 1 )* 7))
      }

      return list
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;

  &-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 37px;
  }

  &-header {
    width: 100%;
    display: flex;
    height: 36px;

    &__item {
      width: inherit;
      box-sizing: border-box;
      border: 1px solid #E9E9E9;
      margin-left: -1px;
      padding-right: 30px;
      text-align: right;
      line-height: 34px;
    }
  }

  &-body {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__list {
      width: 100%;
      display: flex;
      height: 66px;
    }

    &__item {
      width: inherit;
      box-sizing: border-box;
      border: 1px solid #E9E9E9;
      margin-left: -1px;
      margin-top: -1px;
      padding-right: 30px;
      text-align: right;
      line-height: 34px;

      &-today {
        font-weight: bolder;
      }

      &.isNone {
        border-color: transparent;
        visibility: hidden;
      }
    }
  }

  .spot {
    padding-left: 10px; 
    text-align: left;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: block;
      background: #5C9EFA;
      height: 8px;
      width: 8px;
      border-radius: 8px;
      margin-right: 7px;
    }
  }

  .isHoliday {
    background: #FBFBFB;
  }
}
</style>

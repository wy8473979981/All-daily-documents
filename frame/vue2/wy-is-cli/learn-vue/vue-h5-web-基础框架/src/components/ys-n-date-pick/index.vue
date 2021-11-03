<template>
  <div>
    <div class="ys-n-date-pick">
      <div class="date-label" @click="onChangeShowDatePick">
        <span class="label">{{ dateLabel }}</span>
        <van-image width="0.4rem" height="0.3733rem" :src="dataIcon" v-if="!range" />
      </div>
      <div class="date-label" @click="showDatePickRange = true" v-if="range">
        <span class="separator">~</span>
        <span class="label">{{ dateLabelRange }}</span>
        <van-image width="0.4rem" height="0.4rem" :src="dataIcon" />
      </div>
    </div>
    <van-popup v-model="showDatePick" position="bottom" :style="{ height: '60%' }" @close="closePick">
      <van-datetime-picker v-model="currentDate" :type="pickType" :formatter="formatter" @cancel="cancel" @confirm="confirm" @click.stop v-if="pickType !== 'year'" />
      <van-picker show-toolbar :columns="columns" :default-index="defaultIndex" @confirm="confirmYear" v-if="pickType === 'year'" />
    </van-popup>
    <van-popup v-model="showDatePickRange" position="bottom" :style="{ height: '60%' }" v-if="range" @close="closePick">
      <van-datetime-picker v-model="currentDateRange" :type="pickType" :formatter="formatter" @cancel="cancelRange" @confirm="confirmRange" @click.stop />
    </van-popup>
  </div>
</template>
<script>
import dataIcon from "../../assets/images/icon-calendar.png";
import { mapGetters } from "vuex";
export default {
  props: {
    selected: {
      type: String,
      default: function () {
        return "选择时间";
      },
    },
    selectedRange: {
      type: String,
      default: function () {
        return "选择时间";
      },
    },
    type: {
      type: String,
      default: "date",
    },
    range: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(['getHasAuth']),
  },
  watch: {
    type: {
      handler: function (newValue) {
        this.pickType = newValue;
      },
      immediate: true,
      deep: true,
    },
    selected: {
      handler: function (newValue) {
        this.dateLabel = newValue;
        this.currentDate = new Date(newValue);

        if (this.pickType === "year") {
          let pickYear = newValue && newValue.split("-")[0];
          this.dateLabel = pickYear;
          this.defaultIndex = this.columns.indexOf(pickYear + '年');
        }

      },
      immediate: true,
      deep: true,
    },
    selectedRange: {
      handler: function (newValue) {
        this.dateLabelRange = newValue;
        this.currentDateRange = new Date(newValue);
      },
      immediate: true,
      deep: true,
    },
  },
  data () {
    return {
      dateLabel: "",
      dateLabelRange: "",
      pickType: "",
      defaultIndex: 0,
      dataIcon: dataIcon,
      showDatePick: false,
      currentDate: "",
      showDatePickRange: false,
      currentDateRange: "",
      columns: ["2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年", "2021年", "2022年", "2023年", "2024年", "2025年", "2026年", "2027年", "2028年", "2029年"],
    };
  },
  mounted () { },
  methods: {
    touchstart(){
      this.$emit('touchstart',{})
    },
    onChangeShowDatePick () {
      if (!this.getHasAuth) {
        return
      }
      this.showDatePick = true
      this.touchstart()
    },
    confirm (value) {
      // let startTime = new Date(this.value).getTime()
      // let endTime = new Date(this.dateLabelRange).getTime()

      // if (this.range && startTime > endTime) {
      //   this.$Toast('开始日期不能晚于结束日期');
      //   return
      // }

      if (this.pickType === "date") {
        this.dateLabel = this.$dayjs(value).format("YYYY-MM-DD");
      } else if (this.pickType === "year-month") {
        this.dateLabel = this.$dayjs(value).format("YYYY-MM");
      }
      this.showDatePick = false;
      this.$emit("selected", this.dateLabel);
    },

    confirmRange (value) {

      // let startTime = new Date(this.dateLabel).getTime()
      // let endTime = new Date(value).getTime()

      // if (startTime > endTime) {
      //   this.$Toast('开始日期不能晚于结束日期');
      //   return
      // }

      if (this.pickType === "date") {
        this.dateLabelRange = this.$dayjs(value).format("YYYY-MM-DD");
      } else if (this.pickType === "year-month") {
        this.dateLabelRange = this.$dayjs(value).format("YYYY-MM");
      }
      this.showDatePickRange = false;
      this.$emit("selectedRange", this.dateLabelRange);
    },

    confirmYear (value) {
      this.dateLabel = value.replace(/年/, "");
      this.showDatePick = false;
      this.$emit("selected", this.dateLabel);
    },
    closePick() {
      this.$emit('close',{})
    },
    cancel () { this.showDatePick = false; this.closePick()},
    cancelRange () { this.showDatePickRange = false; this.closePick()},

    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else {
        return `${val}日`;;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ys-n-date-pick {
  display: flex;
  align-items: center;
  .separator {
    margin: 0 5px 0 0;
  }
  .date-label {
    display: flex;
    .label {
      margin-right: 5px;
      vertical-align: middle;
      font-size: 30px;
    }
  }
}
::v-deep .van-image {
  margin-left: 4px;
}
</style>

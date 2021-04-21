<template>
<view class="app-datepicker">
  <picker mode="date" :fields="fields" @change="onFromDateChanged" :value="fromDate">
    {{ component.from || (range ? '开始日期' : '选择日期') }}
  </picker>
  <block v-if="range">
    <text class="app-datepicker-split"> ~ </text>
    <picker mode="date" :fields="fields" @change="onToDateChanged" :value="toDate">
      {{ component.to || '结束日期' }}
    </picker>
  </block>
  <image class="app-datepicker-icon" src="/static/assets/images/icon-calendar.png"></image>
</view>
</template>

<script>

export default {
  data() {
    return {
      component: {
        from: null,
        to: null
      }
    };
  },

  components: {},
  props: {
    fields: {
      type: String,
      default: 'day'
    },
    range: {
      type: Boolean,
      default: false
    },
    fromKey: {
      type: String,
      default: 'from'
    },
    toKey: {
      type: String,
      default: 'to'
    },
    fromDate: {
      type: String | Number
    },
    toDate: {
      type: String
    }
  },
  watch: {
    fromDate: {
      handler: function (value) {
        this.setData({
          'component.from': value
        });
      },
      immediate: true
    },
    toDate: {
      handler: function (value) {
        this.setData({
          'component.to': value
        });
      },
      immediate: true
    }
  },
  methods: {
    onFromDateChanged(e) {
      const value = e.detail.value;
      this.setData({
        'component.from': value
      });
      const event = {
        value
      };

      if (this.range) {
        event.value = {
          [this.fromKey]: value,
          [this.toKey]: this.component.to
        };
      }

      this.$emit('changed', {
        detail: event
      });
    },

    onToDateChanged(e) {
      const value = e.detail.value;
      this.setData({
        'component.to': value
      });
      const event = {
        value
      };

      if (this.range) {
        event.value = {
          [this.fromKey]: this.component.from,
          [this.toKey]: value
        };
      }

      this.$emit('changed', {
        detail: event
      });
    }

  }
};
</script>
<style>
@import "./datepicker.css";
</style>
<template>
<view class="d-tabel">
  <view class="d-row d-header">
    <view v-for="(item, index) in colList" :key="index" :class="'d-col ' + ( item.width ? '' : 'd-flex' )" :data-sort="item.sort" :data-key="item.key" @tap="sort" :style="'width:' + item.width">
      <view :class="'d-col-inner ' + ( activeSort === item.key ? 'd-acive' : '' )">
        {{ item.label }}
      </view>
      <view class="d-col-sort" v-if="item.sort">
        <image class="icon-image" v-if="!direction" src="/static/assets/images/icon-sortable.png"></image>
        <image class="icon-image" v-if="direction === 'up' && activeSort === item.key" src="/static/assets/images/icon-sortup.png" mode="aspectFit|aspectFill|widthFix" lazy-load="false"></image>
        <image class="icon-image" v-if="direction === 'down' && activeSort === item.key" src="/static/assets/images/icon-sortdown.png" mode="aspectFit|aspectFill|widthFix" lazy-load="false"></image>
      </view>
    </view>
  </view>
  <view class="d-row d-total" v-if="total">
    <view v-for="(item, index) in colList" :key="index" :class="'d-col ' + ( item.width ? '' : 'd-flex' )" :style="'width:' + item.width + ';justify-content:' + item.align">
      <view class="d-col-inner">
        {{ total[item.key] || total[item.standbyKey] }}
        <text v-if="total[item.key] || total[item.standbyKey]">
           {{ item.unit }}
        </text>
       
      </view>
    </view>
  </view>
  <view class="d-tbody">
    <view v-for="(row, rowi) in dataList" :key="rowi" class="d-row">
      <view v-for="(item, index) in colList" :key="index" :class="'d-col ' + ( item.width ? '' : 'd-flex' ) + ' '" :style="'width:' + item.width + ';color:' + ( item.color || (item.action ? '#3992BA' : '') ) + '; justify-content:' + item.align" :data-id="row[id]" :data-action="item.action" @tap="bindtap">
        <text v-if="item.key">
          {{ row[item.key] || row[item.standbyKey] || '-' }}
        </text>
        <text v-if="!item.key">
          {{  rowi + 1 }}
        </text>
        <text v-if="total[item.key] || total[item.standbyKey]">
          {{ item.unit }}
       </text>
      </view>
    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      activeSort: "",
      direction: "",
      colList: [],
      dataList: [],
      total: null,
      id: "",
      datalist: ""
    };
  },

  components: {},
  props: {
    values: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    totalRow: {
      type: Object,
      default: null
    },
    transformId: String
  },
  watch: {
    totalRow: function (newVal) {
      this.total = newVal
    },
    columns: function (newVal) {
	  this.colList = newVal
    },
    values: function (newVal) {
	  this.dataList = newVal
    },
    transformId: function (newVal) {
	  this.id = newVal
    }
  },

  /**
   * 组件的方法列表
   */
  mounted() {
	this.colList = this.columns
	this.total = this.totalRow
	this.dataList = this.values
	this.id = this.transformId
  },

  methods: {
    sort(e) {
      let {
        key,
        sort
      } = e.currentTarget.dataset;

      if (!sort) {
        return;
      }

      let direction = this.direction;

      if (this.direction === "up") {
        direction = "down";
      } else if (this.direction === "down") {
        direction = "";
      } else {
        direction = "up";
      }
	  
	  this.activeSort = key
	  this.direction = direction
	  
      this.tableSort(key, direction);
      this.$emit("sort", {
        detail: {
          key,
          direction
        }
      });
    },

    tableSort(key, direction) {
      if (direction === "") {
		this.datalist = this.values
        return;
      }

      let data = this.dataList;
      data.sort((a, b) => {
        let value1 = parseFloat(a[key].split(",").join(""));
        let value2 = parseFloat(b[key].split(",").join(""));

        if (direction === "up") {
          return value1 - value2;
        } else {
          return value2 - value1;
        }
      });
	  this.dataList = data
    },

    bindtap(e) {
      if (e.currentTarget.dataset.action) {
        this.$emit("clickRow", {
          detail: {
            id: e.currentTarget.dataset.id
          }
        });
      }
    }

  }
};
</script>
<style>
@import "./table.css";
</style>
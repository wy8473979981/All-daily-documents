<template>
<view class="lengthways">
	<view class="lengthways-label">
		<view v-for="(item, index) in rows" :key="index" class="label-item">
			{{ item.label }}
		</view>
	</view>
	<view class="lengthways-content">
		<view v-for="(row, index) in list" :key="index" class="lengthways-item">
			<view v-for="(item, index2) in rows" :key="index2" class="label-item" :style="'font-weight: ' + ( index === 0 ? 'bold' : '' )">
				{{ row[item.key] }}
			</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      list: [{
        label: "项目"
      }],
      rows: [{
        label: "项目"
      }]
    };
  },

  components: {},
  props: {
    values: {
      type: Array,
      default: []
    },
    cross: {
      type: Array,
      default: []
    }
  },
  watch: {
    cross: function (newVal) {
      this.setData({
        rows: newVal
      });
    },
    values: function (newVal) {
      this.setData({
        list: newVal
      });
    }
  },

  mounted() {
    this.setData({
      list: this.values,
      rows: this.cross
    });
  },

  methods: {}
};
</script>
<style>
@import "./lengthways.css";
</style>
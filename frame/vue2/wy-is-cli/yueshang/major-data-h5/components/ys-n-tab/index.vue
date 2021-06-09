<template>
  <div class="tab-list">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      :class="'tab-list-item ' + (item.code == tabActive ? 'border-current' : '')"
      @click="onClick(item.code)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    currentTab: {
      type: String | Number,
      default: null,
    }
  },
  computed: {
    tabActive () {
      return this.currentTab
    }
  },
  data () {
    return {}
  },
  watch: {},
  mounted () {

  },
  methods: {
    onClick (value) {
      console.log('tab切换:', value);
      this.$emit("selected", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-list {
  // width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 0 20rpx;
  background-color: #014176;
  color: rgb(164, 189, 203);
  .tab-list-item {
    font-size: 24rpx;
  }
  .border-current {
    color: #fff;
    font-size: 24rpx;
    text-decoration: underline;
  }
}
</style>

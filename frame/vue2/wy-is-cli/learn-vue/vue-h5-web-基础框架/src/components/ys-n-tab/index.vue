<template>
  <!-- <van-tabs @click="onClick">
    <van-tab v-for="item in tabData" :title="item.label" :name="item.value" :key="item.value"></van-tab>
  </van-tabs> -->
  <div class="tab-list-box">
    <div v-for="(item, index) in tabList" :key="index" :class="'tab-list-item ' + (item.code == tabActive ? 'border-current' : '')" @click="onClick(item.code)">
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
// ::v-deep .van-tabs__nav {
//   background-color: transparent;
//   .van-tab--active {
//     color: #fff;
//   }
//   .van-tab {
//     color: #fff;
//   }
//   .van-tabs__line {
//     background-color: #fff;
//   }
// }
.tab-list-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
  // font-size: 32px;
  // background: -webkit-linear-gradient(right, #1e5385 0%, #3a96bd 100%);
  // background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  padding: 0 133px 0 112px;
  color: rgb(164, 189, 203);
  .tab-list-item {
    border-bottom: 6px solid transparent;
    padding-bottom: 18px;
    font-size: 32px;
  }
  .border-current {
    border-color: #fff;
    color: #fff;
    font-size: 36px;
  }
}
</style>

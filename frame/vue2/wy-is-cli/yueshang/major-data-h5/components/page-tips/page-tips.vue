<template>
  <!-- tips -->
  <view class="_page-tips">
    <view class="_tip-title" v-if="tipTitle">
      <view>
        <span>{{tipTitle?tipTitle:data.tipTitle}}</span>
      </view>
    </view>
    <template v-if="tList">
      <view class="_tip-content" v-for="(tl,index) in tList" :key="index">{{tl.title}}</view>
    </template>
    <slot class="table-content" name="table-content"></slot>
  </view>
</template>

<script>
export default {
  name: 'page-tips',
  props: {
    tipTitle: {
      type: String,
      default: '说明'
    },
    tList: {
      type: Array,
      default: function () {
        return null
      }
    }
  },
  watch: {},
  mounted () {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
._page-tips {
  background-color: #ffffff;
  padding: 10px 15px 15px;
  margin-bottom: 10px;
}

._tip-title {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  height: 16px;
  line-height: 16px;
  margin-bottom: 3px;
  border-left: 3px solid #014176;
  padding-left: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

._tip-content {
  color: #616161;
  font-size: 10px;
  padding: 0 4px 4px;
}
</style>

<template>
  <!-- 商业公司发起的商务条件  更多操作按钮 -->
  <!-- 点击更多icon 弹出 更多操作按钮 弹窗 -->
  <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="body-content">
        <div class="list-content">
          <div class="item" v-for="(item,index) in data" :key="index" @click="handlerClick(item)">{{item.name}}</div>
        </div>
        <div class="operate" @click="close">取消</div>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'ysNMoreOperate',
  components: {
  },
  props: {
    showMoreOperat: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  watch: {
    showMoreOperat: {
      handler: function (newValue) {
        this.show = newValue
      },
      // immediate: true,
      // deep: true,
    },
    // dataList: {
    //   handler: function (newValue) {
    //     this.data = newValue
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  data () {
    return {
      show: this.showMoreOperat,
      data: [
        {
          code: 0,
          name: '给我'
        },
        {
          code: 0,
          name: '上会'
        },
        {
          code: 0,
          name: '同意延期/ 申请延期'
        },
        {
          code: 0,
          name: '追回'
        },
        {
          code: 0,
          name: '追回完成'
        },
        {
          code: 0,
          name: '推送'
        },
        {
          code: 0,
          name: '删除'
        },
        {
          code: 0,
          name: '查看流程'
        },
      ]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    handlerClick (item) {
      this.$emit('itemClick', item)
      this.close()
      console.log('item-----', item)
    },
    close () {
      this.$emit('update:showMoreOperat', false)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
.wrapper {
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  .body-content {
    width: 100%;
    height: 469px;
    padding: 4px 40px 0 40px;
    background-color: #fdfcfa;
    .list-content {
      .item {
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        color: #020b14;
        text-align: center;
        border-bottom: 1px solid RGBA(217, 217, 209, 1);
      }
    }
    .operate {
      height: 69px;
      line-height: 69px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      text-align: center;
    }
  }
}
</style>

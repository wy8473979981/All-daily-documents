<template>
  <div class="map-tooltip">
    <div class="title">
      {{ data.data.switchName }}
      <div class="right-tool">
        <el-switch
          v-model="value"
          active-color="#538235"
          inactive-color="#848382"
          @change="handlerChange"
        />
      </div>
    </div>
    <div v-if="showValue" class="number">{{ data.name }}: {{ data.value }}</div>
    <p v-if="showDetail" class="text">
      <a class="look-detail" href="javascript:void(0);" @click="handlerDetail()">查看详情</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MapToolTip',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: '上海',
          value: 6,
          data: {
            switchName: '项目数量',
            switchValue: false
          }
        }
      }
    },
    showValue: {
      type: Boolean,
      default: true
    },
    // 是否显示更多详情
    showDetail: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: false
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(value) {
        this.value = value.data.switchValue
      }
    }
  },
  methods: {
    /**
     *
     */
    handlerChange() {
      this.$emit('change', this.value)
    },
    /**
     * 更多事件
     */
    handlerDetail() {
      this.$emit('detail')
    }
  }
}
</script>

<style lang="scss">
.map-tooltip{
  width: 119px;
  //height: 67px;
  padding: 5px 20px 5px 20px;
  background: rgba(0, 56, 55, 0.95);
  margin-left: -10px;
  margin-top: -10px;
  border-radius: 30px;
  .title{
    height: 40px;
    line-height: 40px;
    color: #FDFCFA;
    .right-tool{
      float: right;
    }
  }
  .number{
    font-size: 28px;
    color: #FDFCFA;
  }
  .text{
    margin-bottom: 0;
    padding-bottom: 15px;
    .look-detail{
      color: #fff;
      text-decoration: underline;
    }
  }
}
</style>

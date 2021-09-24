<template>
  <div class="app-comparison">
    <div @click="showModal">
      <slot />
    </div>

    <van-popup v-model="show" position="bottom">
      <div class="himt" v-if="component.himt">{{ component.himt }}</div>
      <div class="search-popup">
        <div class="search-check-item">
          <van-checkbox-group v-model="result">
            <van-checkbox :name="item.bisProjectId" checked-color="#3a96bd" shape="square" v-for="item in component.data" :key="item.bisProjectId">{{ item.label }}</van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="btn-box">
          <div class="confirm-btn" @click="cofrim">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      result: [],
      component: {
        data: [],
        himt: "",
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    himt: {
      type: String,
      default: "",
    },
  },
  watch: {
    data: {
      handler(newValue) {
        this.component.data = Object.assign([], [...newValue]);
      },
      immediate: true,
      deep: true,
    },
    himt: {
      handler(newValue) {
        this.component.himt = newValue;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    showModal() {
      this.show = true;
    },
    cofrim() {
      this.$emit("search", this.result);
      this.show = false;
    },
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
.search-popup {
  padding: 0.4rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  max-height: 70vh;
  .btn-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    margin-top: 15px;
    background-color: #fff;
    padding-bottom: 15px;
    .confirm-btn {
      background-color: #3a96bd !important;
      width: 80%;
      color: #fff;
      margin-left: 10%;
      text-align: center;
      line-height: 1rem;
      font-size: 0.5rem;
      border-radius: 5px;
    }
  }
  .van-checkbox {
    margin-bottom: 15px;
    font-size: 0.37rem;
    color: #333;
  }
}
.himt {
  padding: 0.4rem;
  color: #757575;
  font-size: 14px;
  padding-bottom: 0;
}
</style>

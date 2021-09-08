<template>
  <div>
    <!-- 切换信箱组件 -->
    <app-ysn-drop-down-menu v-if="!duty" :model="value" :title="title" :options="options" isCM @changeSelect="changeSelect" />
    <!-- 涉及职能 -->
    <app-ysn-drop-down-menu v-if="duty" :model="valueD" :title="titleD" :options="dutys" isCM @changeSelect="dutySelectC" />
  </div>
<!--  <van-popup v-model="showPop" round position="bottom" :style="{ height: '95%' }" :get-container="ele"-->
<!--             safe-area-inset-bottom close-on-click-overlay @click-overlay="hidePop">-->
<!--    <van-row type="flex" justify="center" align="center" @click="hidePop">-->
<!--      <div class="app-popup-holder-line"></div>-->
<!--    </van-row>-->
<!--    <van-row type="flex" justify="center" align="center">-->
<!--      <van-col class="app-handle-btn" span="15" @click.stop="hidePop" v-if="2 != zType">取消</van-col>-->
<!--    </van-row>-->
<!--    <slot></slot>-->
<!--  </van-popup>-->
  <!-- 信箱 -->
</template>
<script>

export default {
  data() {
    return {
      options: [
        {text: '收件箱',value: 0},
        {text: '已发送',value: 1},
        {text: '草稿箱',value: 2},
        {text: '已删除',value: 3}
      ],
      value: 0,
      valueD: 0,
    }
  },
  props: {
    model: {
      type: [Number, String],
      default: ''
    },
    modelD: {
      type: [Number, String],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleD: {
      type: String,
      default: ''
    },
    email: {
      type: Boolean,
      default: true
    },
    duty: {
      type: Boolean,
      default: false
    }
  },
  activated(){
    this.value = 0
  },
  created() {
    const userType = this.$store.state.userType
    if(userType && userType === 2){
      this.options = [
        {text: '收件箱',value: 0},
        {text: '已发送',value: 1},
        {text: '已删除',value: 3}
      ]
    }
  },
  watch: {
    model: {
      handler(n, o) {
        this.value = n
      },
      deep: true,
      immediate: true
    },
    modelD: {
      handler(n, o) {
        this.valueD = n
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeSelect(data) {
      let url = ''
      switch (data) {
        case 0: url = 'getEmail';break;
        case 1: url = 'sentEmail';break;
        case 2: url = 'draftBox';break;
        case 3: url = 'delEmail';break;
        default: return
      }
      this.$router.replace({path: url,query: {}})
    },
    dutySelectC(data) {
      this.$emit('changeSelect', data)
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
</style>

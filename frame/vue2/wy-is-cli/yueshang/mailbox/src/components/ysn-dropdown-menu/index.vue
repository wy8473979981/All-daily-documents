<template>
  <!-- 下拉菜单 -->
  <van-dropdown-menu active-color="#32A5D1" :class="{'app-ddm-item-r': location,'app-ddm-menu-search': isCM,
  'app-ddm-menu-tab': (type && type === 'tab'),'app-ddm-menu-border': border}" :get-container="getContainer" >
    <van-dropdown-item v-model="value" :title="title" :options="options" @change="changeSelect"/>
  </van-dropdown-menu>

  <!-- 上拉菜单 -->

</template>
<script>

export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    model: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function(){
        return []
      }
    },
    location: { // 文字居右对齐
      type: Boolean,
      default: false
    },
    isCM: { // 搜索定制 文字变小、居中、背景色
      type: Boolean,
      default: false
    },
    getContainerClass: {
      type: String,
      default: ''
    },
    type: {

    },
    border: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    model: {
      handler(n, o) {
        this.value = n
      },
      deep: true,
      immediate: true
    }
  },
  activated() {
    this.value = 0
  },
  methods: {
    changeSelect(data){
      console.log('duty val=',data)
      this.$emit('changeSelect',data)
    },
    getContainer() {
      if(this.getContainerClass) {
        return document.querySelector('.' + this.getContainerClass);
      }
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
/* 自定义下拉菜单样式 */
.app-ddm-item-r {
  height: 100%!important;
  /deep/ .van-dropdown-menu__item {
    justify-content: flex-end;
    padding-right: 10px;
  }
}
/deep/ .van-dropdown-menu__title::after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -10px;
  border: 6px solid;
  border-color: transparent transparent #333333 #333333;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: .8;
  content: '';
}
/deep/ .van-dropdown-menu__title {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  padding-right: 24px;
}
/deep/ .van-icon-success {
  background-image: url("../../assets/images/icon-selected.png");
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-top: 4px;
  position: absolute;
  right: 0;
}

/deep/ .van-icon-success::before {
  content: '';
  display: none;
}
.van-dropdown-menu {
  height: 100%;
}
.app-ddm-menu-search {
  /deep/ .van-dropdown-menu__bar {
    //height: 100%;
    box-shadow: unset;
    align-items: center;
    background-color: transparent;
    justify-content: center;
  }
  /deep/ .van-dropdown-menu__item{
    height: 72px;
    border-radius: 36px;
    width: 100%;
    flex: unset;
  }
  /deep/ .van-dropdown-menu__title{
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    padding-right: 20px;
    padding-left: 0;
  }
  /deep/ .van-dropdown-menu__title::after{
    border-color: transparent transparent #FFFFFF #FFFFFF;
  }
  /deep/ .van-dropdown-menu__title--active::after{
    border-color: transparent transparent #32A5D1 #32A5D1;
  }
}
.app-ddm-menu-tab {
  /deep/ .van-dropdown-menu__title::after {
    display: none;
  }
  /deep/ .van-dropdown-menu__title::before {
    content: '';
    width: 30px;
    height: 30px;
    background-image: url("../../assets/images/icon-filter.png");
    background-size: 100%;
    background-repeat: no-repeat;
    margin-left: 10px;
    margin-right: 14px;
  }
  /deep/ .van-dropdown-menu__bar {
    height: 88px;
    box-shadow: unset;
    align-items: center;
  }
  /deep/ .van-dropdown-menu__title {
    padding: 0;
    padding-right: 30px;
    text-align: right;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-ellipsis {
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #32A5D1;
    }
  }

}
.app-ddm-menu-border {
  /deep/ .van-dropdown-menu__bar {
    border-bottom: 1px solid #F2F2F2;
    /deep/ .van-dropdown-menu__title {
      padding-top: 1px;
    }
  }
}
</style>

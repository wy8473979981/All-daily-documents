<template>
  <div class="app-search-criteria">
    <div class="search-criteria-label" @click="show = true">
      <div class="search-title">{{ label }}</div>
      <van-image width="0.4rem" height="0.35rem" :src="searchIcon" />
    </div>
    <slot />
    <van-popup v-model="show" position="bottom">
      <img src="../../assets/images/icon-close-ffffff.png" @click="closePop" class="close" />
      <div class="search-popup">
        <div class="search-criteria-list" v-for="item in component.searchList" :key="item.key">
          <div class="search-criteria-item">
            <div class="search-label">{{ item.label }}</div>
            <div class="search-box">
              <div :class="value.value == item.selectedCode || (value.selected == ''&& value.value == 0) ||  value.selected == value.value ? 'search-item-label active' : 'search-item-label'" v-for="value in item.values" :key="value.code" @click="selectType(value,item)">
                {{ value.name }}{{value.code}}
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div class="confirm-btn" @click="cofrim">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import searchIcon from "../../assets/images/icon-filter.png";
import close from "../../assets/images/icon-filter.png";
export default {
  data() {
    return {
      searchIcon: searchIcon,
      show: false,
      close: close,
      component: {
        searchList: [],
      },
    };
  },
  props: {
    label: {
      type: String,
      default: "筛选",
    },
    searchList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  watch: {
    searchList: {
      handler(newValue) {
        this.component.searchList = Object.assign([], [...newValue]);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    //选择类型
    selectType(value, item) {
      item.selectedCode = value.value
      item.values.map(obj => {
        if (obj.selected) {
          obj.selected = false
        }
      })
    },
    cofrim() {
      let result = {};
      this.component.searchList.forEach((item) => {
        let temp = item.values.find((v) => v.value === item.selectedCode);
        if (temp) {
          result[item.key] = item.selectedCode;
        }
      });
      this.$emit("search", result);
      this.show = false;
    },
    closePop() {
      this.show = false;
    }
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
.app-search-criteria {
  padding: 0 20px;
}
.search-criteria-label {
  display: flex;
  align-items: center;
  margin: 0 10px;
  .search-title {
    margin-right: 2px;
    line-height: 1;
  }
}
.van-popup {
  overflow-y: visible;
}
.close {
  position: absolute;
  top: -100px;
  left: 50%;
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.search-popup {
  padding: 0.2rem 0.4rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  max-height: 70vh;
  .search-criteria-list {
    color: #000;
    .search-label {
      color: #757575;
      padding: 5px;
      font-size: 24px;
    }
    .search-box {
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
      .search-item-label {
        padding: 5px 10px;
        background-color: #e3e3e3;
        font-size: 26px;
        margin: 0 10px 10px 0;
        &.active {
          background-color: #3a96bd;
          color: #fff;
        }
      }
    }
  }
  .btn-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    margin-top: 15px;
    background-color: #fff;
    padding-bottom: 15px;
  }
  .confirm-btn {
    background-color: #3a96bd !important;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    line-height: 1rem;
    font-size: 28px;
    border-radius: 5px;
  }
}
</style>

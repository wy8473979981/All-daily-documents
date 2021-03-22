<template>
  <div class="app-search-criteria">
    <div class="search-criteria-label" @click.stop="showDilog = true">
      <div class="search-title">{{ label }}</div>
      <van-image class="van-image" :src="searchIcon" />
    </div>
    <slot />
    <van-popup v-model="showDilog" position="bottom">
      <img src="../../assets/images/icon-close-ffffff.png" @click="closePop" class="close" />
      <div class="search-popup" :class="leftLink ? 'search-popup-link':''">
        <div class="search-criteria-list" v-for="item in component.searchList" :key="item.key">
          <div class="search-criteria-item">
            <div class="search-label">{{ item.label }}</div>
            <div class="search-box">
              <div :class="value.code == item.selectedCode ? 'search-item-label active' : 'search-item-label'" v-for="value in item.values" :key="value.code" @click.prevent.stop="goLink(item,value)">
                {{ value.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box" v-if="!leftLink">
          <div class="confirm-btn" @click.prevent.stop="cofrim">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import searchIcon from "../../assets/images/icon-selector-arrow-blue.png";
import close from "../../assets/images/icon-filter.png";
export default {
  data() {
    return {
      searchIcon: searchIcon,
      showDilog: false,
      close: close,
      component: {
        searchList: [],
      },
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    searchList: {
      type: Array,
      default: function () {
        return [];
      },
    },
	leftLink: {
		type: Boolean,
		default:false
	}
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
    cofrim() {
      let result = {};
      this.component.searchList.forEach((item) => {
        let temp = item.values.find((v) => v.code === item.selectedCode);
        if (temp) {
          result[item.key] = temp;
        }
      });
      this.$emit("search", result);
      this.showDilog = false;
    },
    closePop() {
      this.showDilog = false;
    },
	goLink(item,value) {
		item.selectedCode = value.code
		if(value.url){
			this.$emit('linkUrl',value.url)
		}
	}
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
.van-image {
  width: 16px;
  height: 8px;
  margin-top: 0.1333rem;
}
.search-criteria-label {
  display: flex;
  align-items: center;
  margin: 0 10px;
  .search-title {
    margin-right: 12px;
    line-height: 1;
    display: inline-block;
    color: #2d9fcb;
    font-size: 28px;
    font-weight: bold;
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
  padding: 0 0.4rem 250px;
  overflow: auto;
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
      color: #333;
      .search-item-label {
        padding: 10px;
        text-align: center;
        font-size: 32px;
        color: #333333;
        line-height: 80px;
        font-weight: 500;
        &:not(:last-child) {
          border-bottom: solid 1px #eaeaea;
        }
        &.active {
          color: #3b96be;
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
    padding-bottom: 42px;
  }
  .confirm-btn {
    background: linear-gradient(360deg, #44aedb 0%, #2e6395 100%);
    margin: 0 36px;
    text-align: center;
    line-height: 1rem;
    font-size: 28px;
    border-radius: 5px;
    color: #fff;
  }
}
.search-popup-link {
	padding: 0 !important;
	.search-item-label {
		text-align: left !important;
		padding: 0 20px !important;
		font-weight: 600 !important;
		font-size: 28px !important;
	}
}
</style>

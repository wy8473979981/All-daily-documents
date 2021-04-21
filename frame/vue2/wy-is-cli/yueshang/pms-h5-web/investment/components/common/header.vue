<template>
<view class="app-header">
	<view class="app-header__top">
		<view class="app-header__top__left">
			<slot></slot>
		</view>
		<view class="app-header__top__right">
			<slot name="right"></slot>
		</view>
	</view>
	<view class="app-header__bottom">
		<slot name="bottom"></slot>
		<view class="app-header__bottom__tabs" v-if="component.tabs.length">
			<view v-for="(tab, tabi) in component.tabs" :key="tabi" :class="'app-header__bottom__tabs__item ' + ( component.tabActiveIndex === tabi ? 'active' : '' )" :data-value="tab.value" :data-index="tabi" @tap="onTabClick">
				{{ tab.label }}
			</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      component: {
        tabs: [],
        tabActiveIndex: 0
      }
    };
  },

  components: {},
  props: {
    tabs: {
      type: Array,
      default: function(){
		  return []
	  }
    },
    tabActiveIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    tabs: {
      handler: function (newValue) {
        if (newValue.length) {
          const tabs = newValue.map(item => {
            return {
              label: item.label,
              value: JSON.stringify(item.value || item)
            };
          });
          this.setData({
            "component.tabs": tabs
          });
        }
      },
      immediate: true,
      deep: true
    },
    tabActiveIndex: {
      handler: function (newValue) {
        console.log(newValue);
        this.setData({
          "component.tabActiveIndex": newValue
        });
      },
      immediate: true
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  methods: {
    onTabClick(e) {
      const {
        index,
        value
      } = e.target.dataset;
      this.setData({
        "component.tabActiveIndex": index
      });
      this.$emit("tab-changed", {
        detail: {
          value: JSON.parse(value),
          index
        }
      });
    }

  }
};
</script>
<style>
@import "./header.css";
</style>
<template>
<view :class="'app-section ' + ( collapsed1 ? 'collapsed' : '' )" @tap="onSectionClick" :style="'background-color: ' + bgc + ';'">
  <view class="app-section__head" @tap="toggleCollapse">
    <view class="app-section__head__title" :style="'border-left-color:' + borderColor">
      {{ title }}<text class="app-section__head__title__subtitle">{{ subtitle }}</text><slot name="head-title"></slot>
    </view>
    
    <view class="app-section__head__actions">
      <slot name="head-actions"></slot>
    </view>

    <image v-if="url" class="app-section__head__url" src="/static/assets/images/icon-arrow-down.png"></image>
    <image v-else-if="collapseable" :class="'app-section__head__collapse ' + ( collapsed1 ? 'collapsed' : '' )" src="/static/assets/images/icon-arrow-down.png"></image>
    
  </view>
  <view class="app-section__body" v-show="!collapsed1">
    <slot></slot>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      collapsed1: false
    };
  },

  components: {},
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    collapseable: {
      type: Boolean | String,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    bgc: {
      type: String,
      default: null
    },
    borderColor: {
      type: String,
      default: null
    },
    collapsed: {
      type: Boolean | String,
      default: false
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  watch:{
	  collapsed:{
		handler(newValue){
			this.setData({
				collapsed1:newValue
			})
		},
		immediate: true,
		deep: true,
	  }
  },
  methods: {
    onLoad: function () {
      this.setData({
        collapsed1: collapsed
      });
    },

    toggleCollapse() {
      if (!this.collapseable) return;
      this.setData({
        collapsed1: !this.collapsed1
      });
    },

    onSectionClick() {
      if (this.url && this.url !== "#") {
        const app = getApp();
        app.page.go(this.url);
      }
    }

  }
};
</script>
<style>
@import "./section.css";
</style>
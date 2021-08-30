<template>
<view :class="'app-section ' + ( collapsed ? 'collapsed' : '' )" @tap="onSectionClick" :style="'background-color: ' + bgc + ';'">
  <view class="app-section__head" @tap="toggleCollapse">
    <view class="app-section__head__title" :style="'border-left-color:' + borderColor">
      {{ title }}<text class="app-section__head__title__subtitle">{{ subtitle }}</text><slot name="head-title"></slot>
    </view>
      <slot class="app-section__head__actions_left" name="head-actions_left"></slot>
      
    <view class="app-section__head__actions">
      <slot name="head-actions"></slot>
    </view>

    <image v-if="url" class="app-section__head__url" src="/static/assets/images/icon-arrow-down.png"></image>
    <image v-else-if="collapseable" :class="'app-section__head__collapse ' + ( collapsed ? 'collapsed' : '' )" src="/static/assets/images/icon-arrow-down.png"></image>
    
  </view>
  <view class="app-section__body" v-if="!collapsed">
    <slot></slot>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      collapsed: false
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
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    skip: {
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
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  methods: {
    toggleCollapse() {
      if (!this.collapseable) return;
      this.setData({
        collapsed: !this.collapsed
      });
    },

    onSectionClick(e) {
      if (this.url && this.url !== "#" && (!this.type || !this.skip)) {
        // const app = getApp();
        // app.page.go(this.url);
		uni.navigateTo({url: this.url})
      }else{
		  this.$emit('navigation',{url:this.url,type:this.type,skip:this.skip});
	  }
    }

  }
};
</script>
<style>
@import "./section.css";
</style>
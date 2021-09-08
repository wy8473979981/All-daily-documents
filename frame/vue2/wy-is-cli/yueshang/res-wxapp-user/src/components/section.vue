<template>
  <div :class="sectionClass" @click="onSectionClick" :style="{backgroundColor:bgc,}">

    <div :class="'app-section__head'">
      <div class="app-section__head__title">
        <slot name="head-title"></slot>
      </div>

      <template v-if="useImage">
        <van-image v-if="url" class="app-section__head__url" :src="arrowDown" @click="toggleCollapse"></van-image>
        <van-image v-else-if="collapseable" :class="'app-section__head__collapse ' + (currentCollapsed ? 'currentCollapsed' : '')" :src="arrowDown" @click="toggleCollapse"></van-image>
      </template>

      <div v-else class="heade-right-text-content" @click="toggleCollapse">
        <slot name="heade-right-text"></slot>
        <div :class="'down ' + (currentCollapsed ? 'currentCollapsed' : '')"></div>
      </div>

    </div>
    <div class="app-section__body" v-if="!currentCollapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import arrowDown from "../assets/images/icon-arrow-down.png";
export default {
  name: 'ysSection',
  data () {
    return {
      currentCollapsed: false,
      arrowDown: arrowDown,
    };
  },
  components: {},
  props: {
    title: {
      type: String,
    },
    collapseable: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: null,
    },
    bgc: {
      type: String,
      default: null,
    },
    collapsed: {
      type: Boolean | String,
      default: false
    },
    useImage: {
      type: Boolean | String,
      default: true
    },
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  computed: {
    sectionClass () {
      return `ys-n-section ${this.currentCollapsed ? 'currentCollapsed' : ''}`
    }
  },
  watch: {
    collapsed: {
      handler (newValue) {
        this.currentCollapsed = newValue
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    toggleCollapse () {
      if (!this.collapseable) return;
      this.currentCollapsed = !this.currentCollapsed;
    },
    onSectionClick () {

    },
  },
};
</script>
<style lang="scss" scoped>
.ys-n-section {
  margin-bottom: 19px;
  background-color: #f6f6ee;
}

.ys-n-section .app-section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.van-image {
  width: 16px;
  height: 8px;
}
.ys-n-section .app-section__head .app-section__head__title {
  display: flex;
  align-items: center;
}

.ys-n-section .app-section__head .app-section__head__url {
  margin-left: 21px;
  width: 12px;
  height: 6px;
  transform: rotate(-90deg);
}

.ys-n-section .app-section__head .app-section__head__collapse {
  margin-left: 21px;
  width: 12px;
  height: 6px;
  transform: rotate(0deg);
  transition: transform 250ms;
}

.ys-n-section .app-section__head .app-section__head__collapse.currentCollapsed {
  transform: rotate(180deg);
}

.ys-n-section .app-section__head .down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #d8d8d8;
  font-size: 0;
  line-height: 0;
}
.ys-n-section .app-section__head .down.currentCollapsed {
  transform: rotate(180deg);
}

.ys-n-section .app-section__body {
  position: relative;
  height: auto;
  margin-top: 6px;
  padding: 0 6px;
  overflow: hidden;
  transition: all 500ms;
}

.ys-n-section.currentCollapsed .app-section__body {
  margin-top: 0;
  height: 0;
}

.heade-right-text-content {
  display: flex;
  align-items: center;
  .heade-right-text {
    margin-right: 6px;
  }
}
</style>

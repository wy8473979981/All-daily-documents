<template>
  <div :class="'ys-n-section ' + (collapsed1 ? 'collapsed1' : '') + (hasTable ? ' ys-n-section-table' : '')" @click="onSectionClick" :style="'background-color: ' + bgc + ';'">
    <div :class="'app-section__head' + (hasTable ? ' ys-n-section-table-head' : '')">
      <div class="app-section__head__title" :style="'border-left-color:' + borderColor">
        {{ title }}<text class="app-section__head__title__subtitle">{{ subtitle }}</text>
        <slot name="head-title"></slot>
      </div>
      <slot class="app-section__head__actions_left" name="head-actions_left"></slot>

      <div class="app-section__head__actions">
        <slot name="head-actions"></slot>
      </div>

      <img v-if="url" class="app-section__head__url" :src="arrowDown" @click="toggleCollapse" />
      <img v-else-if="collapseable" :class="'app-section__head__collapse ' + (collapsed1 ? 'collapsed1' : '')" :src="arrowDown" @click="toggleCollapse" />
    </div>

    <div class="app-section__body" v-if="!collapsed1">
      <slot></slot>
    </div>

  </div>
</template>

<script>
import arrowDown from "../../assets/images/icon-arrow-down.png";
export default {
  data () {
    return {
      collapsed1: false,
      arrowDown: arrowDown,
    };
  },

  components: {},
  props: {
    title: {
      type: String,
    },
    subtitle: {
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
    type: {
      type: String,
      default: null,
    },
    skip: {
      type: String,
      default: null,
    },
    bgc: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: null,
    },
    hasTable: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean | String,
      default: false
    },
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  watch: {
    collapsed: {
      handler (newValue) {
        this.collapsed1 = newValue;
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    toggleCollapse () {
      if (!this.collapseable) return;
      this.collapsed1 = !this.collapsed1;
    },
    onSectionClick () {
      if (this.url && this.url !== "#" && (!this.type || !this.skip)) {
        this.$util.pageGo(this.url)
      } else {
        this.$emit('navigation', {
          url: this.url,
          type: this.type,
          skip: this.skip
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ys-n-section {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #ffffff;
  box-shadow: 2px 1px 3px 0px rgba(171, 185, 190, 0.25);
}

.ys-n-section-table {
  padding-right: 0px;
  padding-bottom: 0px;
}
.ys-n-section .app-section__head {
  display: flex;
  align-items: center;
}
.ys-n-section-table-head {
  padding-right: 30px;
}
.search-title {
  margin-right: 12px;
  line-height: 1;
  display: inline-block;
  color: #2d9fcb;
  font-size: 28px;
  font-weight: bold;
}
.div {
  width: 16px;
  height: 8px;
  // margin-top: 0.1rem;
}
.ys-n-section .app-section__head .app-section__head__title {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  height: 14px;
  line-height: 14px;
  border-left: 3px solid #3992ba;
  padding-left: 10px;
}

.ys-n-section
  .app-section__head
  .app-section__head__title
  .app-section__head__title__subtitle {
  color: #7d7e80;
  font-size: 24px;
}

.ys-n-section .app-section__head .app-section__head__actions_left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.ys-n-section .app-section__head .app-section__head__actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.ys-n-section .app-section__head .app-section__head__actions .van-icon-arrow {
  font-size: 30px;
  color: #1890ff;
}
.ys-n-section .app-section__head .app-section__head__url {
  border: 5px solid transparent;
  background-clip: padding-box;
  cursor: pointer;
  margin-left: 21px;
  width: 15px;
  height: 8px;
  transform: rotate(-90deg);
}

.ys-n-section .app-section__head .app-section__head__collapse {
  border: 5px solid transparent;
  background-clip: padding-box;
  cursor: pointer;
  margin-left: 21px;
  width: 15px;
  height: 8px;
  transform: rotate(180deg);
  transition: transform 250ms;
}

.ys-n-section .app-section__head .app-section__head__collapse.collapsed1 {
  border: 5px solid transparent;
  background-clip: padding-box;
  cursor: pointer;
  transform: rotate(0deg);
}

.ys-n-section .app-section__body {
  position: relative;
  height: auto;
  margin-top: 20px;
  overflow: hidden;
  transition: all 500ms;
}

.ys-n-section.collapsed1 .app-section__body {
  margin-top: 0;
  height: 0;
}
</style>

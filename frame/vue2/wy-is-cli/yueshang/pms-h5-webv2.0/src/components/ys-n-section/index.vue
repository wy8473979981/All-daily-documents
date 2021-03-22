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

      <van-image v-if="url" class="app-section__head__url" :src="arrowDown" @click="toggleCollapse"></van-image>
      <van-image v-else-if="collapseable" :class="'app-section__head__collapse ' + (collapsed1 ? 'collapsed1' : '')" :src="arrowDown" @click="toggleCollapse"></van-image>
    </div>
    <div class="app-section__body" v-if="!collapsed1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import arrowDown from "../../assets/images/icon-arrow-down.png";
export default {
  data() {
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
      handler(newValue) {
        this.setData({
          collapsed1: newValue
        })
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    toggleCollapse() {
      if (!this.collapseable) return;
      this.collapsed1 = !this.collapsed1;
    },
    onSectionClick() {
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
<style>
/* components/container/section.wxss */
.ys-n-section {
  padding: 0.32rem 0.4rem;
  margin-bottom: 19px;
  background-color: #ffffff;
}
.ys-n-section-table {
  padding-right: 0px;
}
.ys-n-section .app-section__head {
  display: flex;
  align-items: center;
}
.ys-n-section-table-head {
  padding-right: 0.4rem;
}

.ys-n-section .app-section__head .app-section__head__title {
  color: #333333;
  font-size: 0.37rem;
  font-weight: bold;
  height: 0.42rem;
  line-height: 0.42rem;
  border-left: 6px solid #3992ba;
  padding-left: 0.2rem;
}

.ys-n-section
  .app-section__head
  .app-section__head__title
  .app-section__head__title__subtitle {
  color: #7d7e80;
  font-size: 0.32rem;
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
  margin-left: 0.28rem;
  width: 0.35rem;
  height: 0.2rem;
  transform: rotate(-90deg);
}

.ys-n-section .app-section__head .app-section__head__collapse {
  margin-left: 0.28rem;
  width: 0.3rem;
  height: 0.2rem;
  transform: rotate(180deg);
  transition: transform 250ms;
}

.ys-n-section .app-section__head .app-section__head__collapse.collapsed1 {
  transform: rotate(0deg);
}

.ys-n-section .app-section__body {
  position: relative;
  height: auto;
  margin-top: 0.4rem;
  overflow: hidden;
  transition: all 500ms;
}

.ys-n-section.collapsed1 .app-section__body {
  margin-top: 0;
  height: 0;
}
</style>

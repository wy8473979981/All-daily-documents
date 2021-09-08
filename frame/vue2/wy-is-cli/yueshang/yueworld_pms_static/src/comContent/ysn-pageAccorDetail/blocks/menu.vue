<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="project-menu">
    <template v-for="item in list">
      <div :key="item" :class="[{'active': formatStr(active) === formatStr(item) }, 'project-menu--item']" @click="handleClick(item)">{{ item }}</div>
    </template>
  </div>
</template>

<script>
import { formatStr } from '@//utils/index'

export default {
  name: 'ProjectMenu',
  props: {
    // 列表
    list: {
      type: Array,
      default: () => []
    },
    // 默认选中
    defaultActive: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      active: ''
    }
  },
  mounted() {
    this.active = this.defaultActive
    // 添加scrollbar监听
    document.querySelector('.app-main-scrollbar.body.el-scrollbar .el-scrollbar__wrap').addEventListener('scroll',this.handleScroll)
  },
  methods: {
    handleClick(id) {
      this.active = formatStr(id)
      console.log(formatStr(id))
      document.querySelector(`#${formatStr(id)}`) && document.querySelector(`#${formatStr(id)}`).scrollIntoView(true)
    },
    formatStr(str) {
      return formatStr(str)
    },
    handleScroll(e){
      let scrollTop = e.target.scrollTop;
      this.list.forEach(id => {
        let offset = document.getElementById(formatStr(id)) && document.getElementById(formatStr(id)).offsetTop
        if (offset && (scrollTop >= offset)) {
          this.active = formatStr(id)
          // 左边高亮menu置顶
          // document.querySelector('.active.project-menu--item').scrollIntoView(true)
        }
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.project-menu {
  width: 184px;
  // height: 388px;
  margin-top: 20px;
  padding-top: 16px;
  border-right: 1px solid $subMenuBg;
  display: flex;
  flex-direction: column;

  &--item {
    color: $menuDefaultColor;
    font-size: $font-base-size;
    line-height: 24px;
    margin-bottom: 24px;
    height: 24px;
    transition: 0.2s;
    position: relative;
    cursor: pointer;
  }

  &--item.active, &--item:hover {
    color: $subMenuHover;
    font-size: 16px;
    font-weight: bold;

    &:after {
      opacity: 1;
    }
  }

  &--item:after {
    content: '';
    width: 2px;
    height: 20px;
    background-color: $subMenuHover;
    opacity: 0;
    position: absolute;
    right: -1px;
    top: 2px;
  }
}
</style>

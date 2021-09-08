<template>
  <div class="ysn-tabs-container">
    <div :class="`ysn-tabs-card ${dynamic && 'ysn-tabs-dynamic'}`">
      <el-tabs v-model="tabsActive" @tab-click="handleChange">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :name="index.toString()"
        >
          <span slot="label">
            <span>{{ item.label }}</span>
            <i
              v-if="dynamic"
              :class="
                `ysn-tabs-icon ${
                  index ? 'el-icon-remove' : 'el-icon-circle-plus'
                }`
              "
              @click.stop="handleToggle(index ? 'minus' : 'plus', index)"
            />
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YsnTabs',
  props: {
    // tabs 渲染列表
    list: {
      type: Array,
      default: () => []
    },
    // 当前选中的 name
    value: {
      type: [Number, String],
      default: 0
    },
    // 是否开启动态增减
    dynamic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabsActive: '0'
    }
  },
  watch: {
    value(val) {
      this.tabsActive = val.toString()
    }
  },
  mounted() {
    this.tabsActive = this.value.toString()
    this.handleInit()
  },
  methods: {
    handleInit() {
      // 检索初始化列表长度 赋值唯一下标
      this.unique_index = this.list.length
    },
    handleChange(event) {
      this.$emit('input', this.tabsActive * 1)
      // 选中事件 抛出被选中的标签 tab 实例
      this.$emit('change', event)
    },
    handleToggle(type, index) {
      // 如果是新增 则唯一下标递增
      // tab 增加减少事件 抛出增加 plus 减少 minus 的类型 和 当前选中的下标
      this.$emit('toggle', type, type === 'plus' ? null : parseInt(index))
    }
  }
}
</script>

<style lang="scss">
.ysn-tabs {
  &-container {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav {
      padding: 4px 0;
    }
    .el-tabs__item {
      font-size: 16px;
      font-weight: bold;
      height: 24px;
      line-height: 24px;
      padding: 0;
      padding-right: 15px;
      color: #848382;
      &:focus.is-active.is-focus:not(:active) {
        box-shadow: none;
      }
      &.is-active{
        color: #1C4C7F;
      }
    }
    .el-tabs__active-bar {
      height: 3px;
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      line-height: 32px;
    }
    .el-icon-circle-plus {
      color: #485f47;
    }
    .el-icon-remove {
      color: #6f120c;
    }
  }
  &-card {
    display: inline-block;
    background: white;
    border-radius: 15px;
    padding-left: 15px;
    padding-right: 15px;
    overflow-y: hidden;
    max-width: 100%;
    overflow-x: auto;
  }
  &-icon {
    position: absolute;
    padding-left: 8px;
    line-height: 24px;
  }
  &-dynamic {
    .el-tabs__item,
    .el-tabs__nav {
      padding-right: 50px;
    }
  }
}
</style>

<template>
  <div class="ysn-progress-container">
    <el-steps :active="active">
      <el-step
        v-for="(item, item_index) in list"
        :key="item_index"
        :title="item.finishTime || ''"
        :class="`${active === item_index && 'ysn-progress-actived'}`"
      >
        <template #icon>
          {{ item.label }}
        </template>
        <template v-if="item_index<=active" #description>
          <div v-if="item.status" class="ysn-progress-card">
            <slot :rows="item" />
          </div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'YsnProgress',
  props: {
    // 进度内容列表
    list: {
      type: Array,
      default: () => []
    },
    // 当前进度激活下标
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss">
.ysn-progress {
  &-container {
    padding: 8px;
    .el-step__icon {
      width: 82px;
      height: 82px;
      font-size: 16px;
      color: #ffffff;
    }
    .el-step__title {
      font-size: 16px;
      color: #050101;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      line-height: 21px;
      padding-top: 10px;
      padding-bottom: 20px;
      position: relative;
      min-height: 51px;
      &::after {
        position: absolute;
        content: ' ';
        bottom: 5px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid #efedea;
      }
    }
    .el-step__line {
      height: 1px;
      border: 4px solid #dfe4e7;
    }
    .el-step.is-horizontal .el-step__line {
      top: calc(50% - 5px);
    }
    .is-finish {
      .el-step__icon {
        background: #1c4c7f;
        border: 6px solid #9abbdd;
      }
    }
    .is-process {
      .el-step__icon {
        background: #48a0c3;
        border: 6px solid #b3d9e8;
      }
      .ysn-progress-card {
        background: #fdfcfa;
      }
    }

    .is-wait {
      .el-step__icon {
        background: #becbd2;
        border: 6px solid #dae7ee;
      }
    }
  }
  &-actived {
    .el-step__title {
      &::after {
        border-bottom: 10px solid #fdfcfa;
      }
    }
  }
  &-card {
    width: 152px;
    height: 320px;
    background: #efedea;
    border-radius: 10px;
    padding: 20px 0px;
    padding-left: 16px;
    overflow: auto;
    font-size: 16px;
    color: #050101;
    // 列表内详细内容样式
    // &-label {
    //   color: #848382;
    //   font-size: 14px;
    //   line-height: 14px;
    // }
    // &-content {
    //   color: #050101;
    //   font-size: 16px;
    //   line-height: 16px;
    //   font-weight: bold;
    //   padding-top: 12px;
    //   padding-bottom: 23px;
    //   font-family: MicrosoftYaHei;
    // }
    // &-mark {
    //   color: #1c4c7f;
    // }
  }
}
</style>

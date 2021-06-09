<template>
  <div class="paging">
    <div class="paging-data">
      <p>共15条数据，当前在1/1页</p>
    </div>
    <div class="paging-option">
      <el-pagination layout="prev, pager, next" :total="7" />
      <el-select v-model="value">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '10',
        label: '10条/页'
      },
      {
        value: '15',
        label: '15条/页'
      },
      {
        value: '20',
        label: '20条/页'
      },
      {
        value: '30',
        label: '30条/页'
      }
      ],
      value: '20条/页'
    }
  }
}

</script>

<style lang="scss" scoped>
  .paging {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;

    .paging-data {
      padding: 0;

      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
      }
    }

    .paging-option {
      display: flex;

      ::v-deep .el-input__inner {
        padding: 0;
        height: 24px;
        width: 80px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        background: #f6f5ee;
        border: none;
      }

      ::v-deep.el-input__icon {
        line-height: 22px;
      }

      ::v-deep.el-pager li {
        height: 24px;
        line-height: 24px
      }

      ::v-deep.el-pagination button,
      .el-pagination span:not([class*=suffix]) {
        height: 24px;
        line-height: 24px
      }

      ::v-deep.el-pager li.active {
        color: #1C4C7F;
      }

      ::v-deep.el-pager li {
        color: #050101;
      }
    }

    ::v-deep.el-pagination button {
      background: #f6f5ee;
    }

    ::v-deep.number {
      background: #f6f5ee !important;
    }

    ::v-deep.el-icon-arrow-up:before {
      content: "\e78f";
    }
  }

</style>

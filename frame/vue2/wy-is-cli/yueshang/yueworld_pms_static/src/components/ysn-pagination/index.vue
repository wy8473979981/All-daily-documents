<template>
  <div class="ysn-pagination-container clearfix">
    <div class="ysn-pagination-left fl">
      <span v-if="info">{{ replaceInfo }}，当前在{{ currentPage }}/{{ Math.ceil(total / pageSize) }}页</span>
    </div>
    <div class="ysn-pagination-right fr">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="prev, pager, next, sizes"
        :total="total"
        popper-class="define-pagination-select">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 1000
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    info: {
      type: String,
      default: ''
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      currentPage: 1,
      selectedDom: ''
    }
  },
  computed: {
    replaceInfo() {
      return this.info.replace('${total}', this.total)
    }
  },
  watch: {
    selectedDom: {
      handler(nweVal, oldVal) {
        if (nweVal) {
          const i = document.createElement('i')
          i.className = 'el-icon-check'
          nweVal.append(i)
        }
        if (oldVal) {
          oldVal.removeChild(oldVal.childNodes[1])
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.selectedDom = document.querySelector('.define-pagination-select .el-select-dropdown__list .selected')
    })
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.$nextTick(() => {
        this.selectedDom = document.querySelector('.define-pagination-select .el-select-dropdown__list .selected')
      })
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('currentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
  .ysn-pagination-container {
    .ysn-pagination-left {
      line-height: 28px;
        color: $font-word-color;
    }
    .el-pagination {
      /deep/.btn-prev {
        background-color: transparent;
      }
      /deep/.btn-next {
        background-color: transparent;
      }
      /deep/.el-pager li {
        background: none;
      }
      /deep/.el-input__inner {
        border: none;
        background: none;
        color: $font-word-color;
      }
      /deep/.el-input__suffix {
        right: 10px;
      }
      /deep/.el-select .el-input .el-select__caret {
        color: $font-word-color;
      }
    }
  }
</style>

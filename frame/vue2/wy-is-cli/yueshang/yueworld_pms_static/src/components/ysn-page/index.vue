<template>
  <div class="ysn-pagination-container flex-ju-al-between">
    <div class="ysn-pagination-left">
      <!-- <span>共{{ total }}条数据，当前在{{ currentPage }}/{{ Math.ceil(total / pager.pageSize) === 0? 1:Math.ceil(total / pager.pageSize) }}页</span> -->
      <span>共{{ total }}条数据</span>
    </div>
    <div class="ysn-pagination-right">
      <el-pagination
        :current-page="pager.pageNo"
        :page-sizes="pageSizes"
        :page-size="pager.pageSize"
        layout="prev, pager, next, sizes"
        :total="total"
        popper-class="define-pagination-select"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-on="$listeners"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'YsnPage',
  props: {
    // 总数
    total: {
      type: Number,
      default: 0
    },
    // 分页
    page: {
      type: Object,
      default: () => {}
    },
    // 页面size可选项
    pageSizes: {
      type: Array,
      default: () => [15, 20, 50, 100, 200]
    }
  },
  data() {
    return {
      currentPage: 1,
      selectedDom: '',
      pager: {
        pageNo: 1,
        pageSize: 20
      }
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
    },
    // 分页监听
    page(val) {
      this.pager = val
    },
    // 总数监听
    total(val) {
      const { pageSize, pageNo } = this.page
      if (val === 0) return // 未请求数据或者无数据时不触发
      if (val && pageSize && pageNo) { // 防止外部不传数据导致抛异常
        // 当前总页数
        const newPageNo = val / pageSize + (val % pageSize === 0 ? 0 : 1)
        if (pageNo > newPageNo) {
          // 如果外部传入的当前页数大于计算下来的总页数 pageNo改成当前总页数
          this.pager.pageNo = newPageNo
          this.$emit('change', this.pager)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.selectedDom = document.querySelector('.define-pagination-select .el-select-dropdown__list .selected')
    })
  },
  methods: {
    handleSizeChange(val) {
      // this.pageSize = val
      this.$nextTick(() => {
        this.selectedDom = document.querySelector('.define-pagination-select .el-select-dropdown__list .selected')
      })
      this.pager.pageSize = val
      this.pager.pageNo = 1
      this.$emit('change', this.pager)
    },
    handleCurrentChange(val) {
      this.pager.pageNo = val
      this.$emit('change', this.pager)
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
      ::v-deep.btn-prev {
        background-color: transparent;
      }
      ::v-deep.btn-next {
        background-color: transparent;
      }
      ::v-deep.el-pager li {
        background: none;
      }
      ::v-deep.el-input__inner {
        border: none;
        background: none;
        color: $font-word-color;
      }
      ::v-deep.el-input__suffix {
        right: 0px;
        .el-icon-circle-close{
          display: none;
        }
        .el-icon-circle-check{
          display: none;
        }
      }
      ::v-deep.el-select .el-input .el-select__caret {
        color: $font-word-color;
      }
    }
  }
</style>

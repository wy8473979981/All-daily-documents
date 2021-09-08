<template>
  <el-dialog
    :title="title"
    :visible.sync="currentVisible"
    v-bind="$attrs"
    v-on="$listeners"
    class="x-dialog--table"
  >
    <template v-if="tips" slot="title">
      <div class="x-dialog--table-title">
        <div class="title">{{title}}</div>
        <div class="tips">{{tips}}</div>
      </div>
    </template>
    <ys-n-table v-loading="loading" :config="tableConfig" v-model="tableData" :max-height="tableHeight"></ys-n-table>
  </el-dialog>
</template>

<script>
import { rentalPlatform } from 'api/modules/RentalPlatform'
export default {
  name: "DialogTable",

  model: {
    prop: "visible",
    event: "close",
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    beforeClose: {
      type: Function,
      default: () => {},
    },

    tableConfig: Array,

    tableHeight: Number,

    api: String, // table 请求的api地址
    
    title: String,
    tips: String,

    params: { // 接口请求参数
      type: Object,
      default: () => ({})
    },

    beforeFetchData: {
      type: Function,
    }
  },

  data() {
    return {
      currentVisible: false,
      loading: false,
      tableData: [{}]
    };
  },

  created() {
    this.api && this.fetchData()
  },

  methods: {
    fetchData() {
      this.loading = true;
      rentalPlatform.getDialogTableList(this.api, this.params).then(res => {
        // console.log(res)
        this.tableData = this.beforeFetchData ? this.beforeFetchData(res) : res
      }).finally(() => {
        this.loading = false
      })
    }
  },

  watch: {
    currentVisible() {
      this.$emit("close", this.currentVisible);
    },

    visible: {
      handler() {
        this.currentVisible = this.visible;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.x-dialog--table {
  :global(.el-dialog) {
    border-radius: 20px;
  }

  &-title {
    display: flex;
    align-items: baseline;

    .title {
      font-size: 18px;
      margin-right: 5px;
    }
    .tips {
      font-size: 12px;
    }
  }
}

::v-deep.x-dialog--table .el-dialog {
  border-radius: 20px;
  background: $mainColor;

  .el-dialog__header {
    position: relative;
    padding: 24px 24px 8px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 20px;
      left: 20px;
      height: 1px;
      background: $subMenuBg;
    }
  }

  .el-dialog__body {
    padding: 10px 24px 24px;
  }
}
</style>

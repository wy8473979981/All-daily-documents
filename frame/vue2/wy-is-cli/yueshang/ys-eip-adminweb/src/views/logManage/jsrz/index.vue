<template>
  <!-- 数据脱敏 -->
  <div class="page-content">
    <ysNSearch :searchList="searchConfig" :params="params"></ysNSearch>
    <ysNTable class="table" :tableList="tableList" :column="column1" :tableHeight="this.$store.state.tableHeight" @viewFunc="viewFunc"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogDetail" title="接受" :width="'576px'" :buttonList="buttonList" @cancelFunc="cancelFunc">
      <div slot="content" class="form formNew">
        <div class="dialog-info">
          <div class="dialog-info-content">
            <span class="dialog-info-title">应用名称：</span>
            <span class="dialog-info-value">{{appName}}</span>
          </div>
          <div class="dialog-info-content">
            <span class="dialog-info-title">服务名称：</span>
            <span class="dialog-info-value">{{serveName}}</span>
          </div>
        </div>
        <div class="dialog-detail">

        </div>
      </div>
    </ysNDialog>
  </div>
</template>
<script>
import { handle_paginator, tableData } from '@/mixins';
import columnconfig from './config/column.js'
import searchConfig from './config/search.js'
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      params: {
        name: '',
        dicNames: '',
        time: ''
      },
      appName: '会计平台',
      serveName: '登录',
      column1: columnconfig.tablecolumn1,
      tableList: columnconfig.tableList,
      searchConfig: searchConfig,
      buttonList: [
        {
          name: '关闭',
          bgColor: '#fff',
          color: '#1C1C1C',
          function: 'cancelFunc',
          borderColor: '#E0E5EB',
        },
      ],
    }
  },
  mounted () {

    setTimeout(() => {
      this.$Utils.getDynamicTableHeight(this)
    }, 0)

  },
  methods: {
    viewFunc (row) {
      // 开启 接受 弹窗
      this.$refs.dialogDetail.centerDialogVisible = true
    },
    cancelFunc () {
      // 弹窗 关闭
      this.$refs.dialogDetail.centerDialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog-info {
  margin-bottom: 11px;
  .dialog-info-content {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #8893a3;
    line-height: 32px;
  }
  .dialog-info-value {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    line-height: 32px;
  }
}
.dialog-detail {
  width: 100%;
  height: 500px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #8893a3;
  overflow: auto;
  background: #f0f2f7;
  opacity: 0.5;
  border: 1px solid #e0e5eb;
}
.operate {
  display: flex;
  justify-content: space-between;
  .operate-new {
    display: flex;
  }
  .operate-new-add {
    margin-left: 20px;
  }
}
</style>

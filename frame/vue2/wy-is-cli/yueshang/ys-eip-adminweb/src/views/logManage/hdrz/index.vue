<template>
  <!-- 数据脱敏 -->
  <div class="page-content">
    <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
    <ysNTable class="table" :tableList="tableList" :column="column1" :tableHeight="this.$store.state.tableHeight" @viewFunc="viewFunc"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogDetail" title="回调" :width="'576px'" :buttonList="buttonList" @cancelFunc="cancelFunc">
      <div slot="content" class="form formNew">
        <div class="dialog-info">
          <div class="dialog-info-content">
            <span class="dialog-info-title">应用名称：</span>
            <span class="dialog-info-value">{{appName}}</span>
          </div>
          <div class="dialog-info-content">
            <span class="dialog-info-title">服务名称：</span>
            <span class="dialog-info-value">{{businessName}}</span>
          </div>
        </div>
        <div class="dialog-detail">
          <div>{{detail}}</div>
          <!-- <el-input type="textarea" disabled v-model="detail">
          </el-input> -->
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
      searchParams: {
        appId: null,
        businessId: null,
        dateStart: null,
        dateEnd: null,
      },
      appName: null,
      businessName: null,
      detail: null,
      column1: columnconfig.tablecolumn1,
      tableList: [],
      searchConfig: searchConfig,
      buttonList: [
        {
          name: '关闭',
          function: 'cancelFunc',
          className: 'button-bg-common'
        },
      ],
    }
  },
  mounted () {
    //this.getList(this.searchParams)
  },
  methods: {
    async viewFunc (row) {
      // 开启 接受 弹窗
      try {
        // 开启 接受 弹窗
        this.appName = row.appName
        this.businessName = row.businessName
        await this.$axios.logManageServe.hdLogDetail({ id: row.id }).then(res => {
          if (res.code == 200) {
            this.detail = res.data.data
            this.$refs.dialogDetail.centerDialogVisible = true
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    cancelFunc () {
      // 弹窗 关闭
      this.$refs.dialogDetail.centerDialogVisible = false
    },
    handleFormChange(key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async getList (data) {
      try {
        this.searchParams = data
        let params = { ...this.pageInfo, searchParams: this.searchParams }
        await this.$axios.logManageServe.hdLogList(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.pageInfo = { ...this.pageInfo, sum_num: data.total }
            this.tableList = data.result
            setTimeout(() => {
              this.$Utils.getDynamicTableHeight(this)
            }, 0)
          }
        })
      } catch (e) {
        console.log(e)
      }
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
  padding: 10px;
  min-height: 100px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #8893a3;
  overflow: auto;
  background: #f0f2f7;
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
.el-textarea {
  height: 100%;
}
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  height: 100%;
  resize: none;
  border-radius: 0;
}
</style>

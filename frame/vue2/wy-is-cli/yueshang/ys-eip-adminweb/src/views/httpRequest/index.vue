<template>
  <!-- 限流配置 -->
  <div class="page-content">
    <div class="search-operate-content">
      <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
      <div class="search-operate-new">
        <div class="search-operate-new-add">
          <ysNButton :className="'button-bg-main'" @click="addRowFunc" :disabled="addRowBtnDisabled" :text="'新增'" />
        </div>
      </div>
    </div>
    <ysNTable class="table" :tableList="tableList" :column="column" :tableHeight="this.$store.state.tableHeight" @checkSubmit="checkSubmit" @deleteHttp="deleteHttp" @checkDelete="checkDelete"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogDelete" class="dialogDelete" title="" :width="'396px'" :buttonList="buttonDeleteList" @deleteConfirmFunc="deleteConfirmFunc" @deleteCancelFunc="deleteCancelFunc">
      <div slot="content" class="form formNew">
        <div class="delete-tip">
          <div>确定删除？</div>
          <div>删除将无法回复，请谨慎操作</div>
        </div>
      </div>
    </ysNDialog>
  </div>
</template>
<script>
import {
  handle_paginator,
  tableData
} from '@/mixins';
import columnconfig from './config/column.js'
import searchConfig from './config/search.js'
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      searchConfig: searchConfig,
      buttonDeleteList: [{
        name: '取消，暂不删除',
        function: 'deleteCancelFunc',
        className: 'button-bg-main'
      },
      {
        name: '确定，继续删除',
        function: 'deleteConfirmFunc',
        className: 'button-bg-common'
      },
      ],
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      searchParams: {
        appId: null,
        businessId: null,
      },
      column: columnconfig.httpRequest,
      addRowBtnDisabled: false,
      tableList: [],

    }
  },
  mounted () {

    this.getList(this.searchParams)
  },
  methods: {
		handleFormChange (key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async checkSubmit (row) {
      try {
        let res = await this.$axios.httpRequestServe.addHttp(row)
        if (res.code == 200) {
          this.addRowBtnDisabled = false
          this.getList(this.searchParams)
        }
      } catch (e) {
        console.log(e)
      }

    },
    async getList (data) {
      try {
        this.searchParams = data
        let params = { ...this.pageInfo, searchParams: this.searchParams }
        await this.$axios.httpRequestServe.getHttpList(params).then(res => {
          if (res.code == 200) {
            let {
              data
            } = res
            this.pageInfo = {
              ...this.pageInfo,
              sum_num: data.total
            }
            this.tableList = data.result.map(item => {
              return {
                ...item,
                appId: item.appName,
                businessId: item.businessName
              }
            })
            setTimeout(() => {
              this.$Utils.getDynamicTableHeight(this)
            }, 0)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    addRowFunc () {
      try {
        this.addRowBtnDisabled = true
        let row = { showInput: true, appId: null, businessId: null, headerKey: null, headerValue: null, statusFlag: null }
        this.tableList.push(row)

      } catch (e) {
        console.log(e)
      }
    },
    deleteCancelFunc () {
      // 维护弹窗 删除弹窗 取消
      this.$refs.dialogDelete.centerDialogVisible = false
    },
    async deleteConfirmFunc (row) {
      // 维护弹窗 删除弹窗 确定
      try {
        let params = { id: this.selectedRow.id }
        await this.$axios.httpRequestServe.deleteHttp(params).then(res => {
          if (res.code == 200) {
            this.getList(this.searchParams)
            this.$refs.dialogDelete.centerDialogVisible = false
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async deleteHttp (row) {
      try {
        // 删除弹窗 开启
        this.selectedRow = row
        this.$refs.dialogDelete.centerDialogVisible = true
      } catch (e) {
        console.log(e)
      }
    },
    checkDelete (item, index) {
      try {
        this.addRowBtnDisabled = false
        this.tableList.splice(index, 1)
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

.search-operate-content {
  display: flex;

  .search {
    flex: 1;
  }

  .search-operate-new {
    flex: 0 0 80px;

    .el-button {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #fff;
      height: 36px;
      padding: 0 26px;
      border: 1px solid #4876ef;
      border-radius: 0;
    }
  }
}

::v-deep .dialogDelete {
  .el-dialog {
    margin-top: 40vh !important;
  }

  .delete-tip {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    line-height: 36px;
    text-align: center;
    margin-top: 19px;
    margin-bottom: 4px;
  }
}
</style>

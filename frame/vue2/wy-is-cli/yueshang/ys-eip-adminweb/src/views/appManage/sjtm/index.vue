<template>
  <!-- 数据脱敏 -->
  <div class="page-content">
    <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
    <ysNTable class="table" :tableList="tableList" :column="column1" :tableHeight="this.$store.state.tableHeight" @deployFunc="deployFunc" @viewFunc="viewFunc"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogAdd" title="数据脱敏维护" :width="'754px'" :buttonList="buttonAddList" @addConfirmFunc="addConfirmFunc" @addCancelFunc="addCancelFunc">
      <div slot="content" class="form formNew">
        <div class="box">
          <div class="dialog-info">
            <div class="dialog-info-content">
              <span class="dialog-info-title">应用名称：</span>
              <span class="dialog-info-value">{{selectedRow.appName}}</span>
            </div>
            <div class="dialog-info-content">
              <span class="dialog-info-title">服务名称：</span>
              <span class="dialog-info-value">{{selectedRow.businessName}}</span>
            </div>
          </div>
          <div class="operate">
            <div class="operate-new">
              <div class="operate-new-add">
                <ysNButton :className="'button-bg-main'" @click="addRowFunc" :disabled="addRowBtnDisabled" :text="'添加'" />
              </div>
            </div>
          </div>
        </div>
        <ysNTable class="table" :tableList="tableDetail" :column="column2" :tableHeight="393" @switchChange="switchChange" @checkSubmit="checkSubmit" @checkDelete="checkDelete"></ysNTable>
      </div>
    </ysNDialog>

    <ysNDialog ref="dialogView" title="数据脱敏查看" :width="'754px'" :buttonList="buttonViewList" @viewCancelFunc="viewCancelFunc">
      <div slot="content" class="form formNew">
        <div class="dialog-info">
          <div class="dialog-info-content">
            <span class="dialog-info-title">应用名称：</span>
            <span class="dialog-info-value">{{selectedRow.appName}}</span>
          </div>
          <div class="dialog-info-content">
            <span class="dialog-info-title">服务名称：</span>
            <span class="dialog-info-value">{{selectedRow.businessName}}</span>
          </div>
        </div>
        <ysNTable class="table" :tableList="tableDetail" :column="column3" :tableHeight="393"></ysNTable>
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
      },
      selectedRow: {
        appName: null,
        businessName: null,
      },
      addRowBtnDisabled: false,
      column1: columnconfig.tablecolumn1,
      column2: columnconfig.tablecolumn2,
      column3: columnconfig.tablecolumn3,
      tableList: [],
      tableDetail: [],
      searchConfig: searchConfig,
      buttonAddList: [
        {
          name: '取消',
          function: 'addCancelFunc',
          className: 'button-bg-common'
        },
        {
          name: '确定',
          function: 'addConfirmFunc',
          className: 'button-bg-main'
        },
      ],
      buttonViewList: [
        {
          name: '关闭',
          function: 'viewCancelFunc',
          className: 'button-bg-common'
        },
      ],
    }
  },
  mounted () {

    this.getList(this.searchParams)

  },
  methods: {
    addRowFunc () {
      this.addRowBtnDisabled = true
      this.tableDetail.push({ showInput: true, remark: '', fieldName: '', regular: '', statusFlag: false })
    },
    deployFunc (row) {
      // 开启 数据脱敏维护 弹窗
      try {
        this.getDetail(row).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.tableDetail = data
            this.$refs.dialogAdd.centerDialogVisible = true
            setTimeout(() => {
              this.$Utils.getDynamicTableHeight(this)
            }, 0)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    viewFunc (row) {
      // 开启 数据脱敏查看 弹窗
      try {
        this.getDetail(row).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.tableDetail = data
            this.$refs.dialogView.centerDialogVisible = true
            setTimeout(() => {
              this.$Utils.getDynamicTableHeight(this)
            }, 0)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    addCancelFunc () {
      // 关闭 数据脱敏维护 弹窗
      this.addRowBtnDisabled = false
      this.$refs.dialogAdd.centerDialogVisible = false
    },
    addConfirmFunc () {
      // 关闭 数据脱敏维护 弹窗
      this.$refs.dialogAdd.centerDialogVisible = false
    },
    viewCancelFunc () {
      // 关闭 数据脱敏查看 弹窗
      this.$refs.dialogView.centerDialogVisible = false
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
        await this.$axios.appManageServe.sjtmList(params).then(res => {
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
    async getDetail (row) {
      try {
        this.selectedRow = row
        let params = { appId: row.appId, businessId: row.businessId }
        return await this.$axios.appManageServe.sjtmDetail(params)
      } catch (e) {
        console.log(e)
      }
    },
    async switchChange (item) {
      try {
        if (!item.id) return
        let params = {
          id: item.id,
          statusFlag: item.statusFlag
        }
        await this.$axios.appManageServe.sjtmMidRegularSwitch(params).then(res => {
          if (res.code == 200) {
            if (item.statusFlag) {
              this.$message.success('启用成功');
            } else {
              this.$message.success('停用成功');
            }
            this.getDetail(this.selectedRow).then(res => {
              if (res.code == 200) {
                let { data } = res
                this.tableDetail = data
              }
            })

          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async checkSubmit (item) {
      try {
        let params = {
          appId: this.selectedRow.appId,
          businessId: this.selectedRow.businessId,
          fieldName: item.fieldName,
          remark: item.remark,
          regular: item.regular,
          statusFlag: item.statusFlag,
        }
        await this.$axios.appManageServe.sjtmAdd(params).then(res => {
          if (res.code == 200) {
            this.addRowBtnDisabled = false
            this.getDetail(this.selectedRow).then(res => {
              if (res.code == 200) {
                let { data } = res
                this.tableDetail = data
              }
            })

          }
        })
      } catch (e) {
        console.log(e)
      }

    },
    checkDelete (item, index) {
      try {
        this.tableDetail.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
}
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
    align-items: flex-end;
    padding-bottom: 11px;
  }
  .operate-new-add {
    margin-left: 20px;
  }
}
</style>

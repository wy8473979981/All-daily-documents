<template>
  <!-- 数据规则 -->
  <div class="page-content">
    <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
    <ysNTable class="table" :tableList="tableList" :column="column1" :tableHeight="this.$store.state.tableHeight" @vindicateFunc="vindicateFunc" @viewFunc="viewFunc"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialog" class="dialog" :title="dialogTitle" :width="'500px'" :buttonList="buttonList" @confirmFunc="confirmFunc" @cancelFunc="cancelFunc">
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
          <div class="dialog-info-content">
            <span class="dialog-info-title">规则列表：</span>
            <div class="dialog-info-box">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item,index) in checkboxList" :label="item.configKey" :key="index" :disabled="!dialogDisabled">
                  <p class="item-value">{{item.configValue}}</p>
                </el-checkbox>
              </el-checkbox-group>
              <div class="remark">
                <p v-for="(item,index) in checkboxList" :key="index">{{item.remark}}</p>
              </div>
            </div>
          </div>
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
        appId: this.$route.query.appId ? this.$route.query.appId : null,
        businessId: null,
      },
      selectedRow: {
        appName: null,
        businessName: null,
      },
      appName: '会计平台',
      serveName: '登录',
      dialogTitle: '',
      dialogDisabled: false,
      checkList: [],
      checkboxList: [],
      column1: columnconfig.tablecolumn1,
      tableList: [],
      textarea: '',
      searchConfig: searchConfig,
      buttonList: [],
    }
  },
  mounted () {

    this.getList(this.searchParams)
    this.getDict(1)

  },
  methods: {
    handleFormChange(key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async getList (data) {
      try {
        this.searchParams = data
        let params = { ...this.pageInfo, searchParams: this.searchParams }
        await this.$axios.appManageServe.sjgzList(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.pageInfo = { ...this.pageInfo, sum_num: data.total }
            this.tableList = data.result.map(item => {
              return {
                ...item,
                reqType: this.$Utils.getLabel(item.reqType, 'value', 'label', this.requestAisleList),// 请求通道
                reqMethod: this.$Utils.getLabel(item.reqMethod, 'value', 'label', this.requestTypeList),// 请求方式
                businessType: item.businessType == 0 ? '请求' : item.businessType == 1 ? '回调' : '接收',// 服务类型（0:请求，1:回调）
                // createdDate: this.$Utils.rTime(item.createdDate),
                // updateDate: this.$Utils.rTime(item.updateDate)
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
    async vindicateFunc (row) {
      // 开启 规则配置 弹窗
      try {
        let params = { appId: row.appId, businessId: row.businessId }
        await this.$axios.appManageServe.sjgzDetail(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            data && data.ruleNameList.map(item => {
              this.checkList.push(item.ruleKey)
            })
            this.selectedRow = row
            this.dialogDisabled = true
            this.dialogTitle = '规则配置'
            this.buttonList = [
              {
                name: '取消',
                function: 'cancelFunc',
                className: 'button-bg-common'
              },
              {
                name: '确定',
                function: 'confirmFunc',
                className: 'button-bg-main'
              },
            ]
            this.getDict(1)
            this.$refs.dialog.centerDialogVisible = true
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async viewFunc (row) {
      // 查看弹窗 开启
      try {
        let params = { appId: row.appId, businessId: row.businessId }
        await this.$axios.appManageServe.sjgzDetail(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            data && data.ruleNameList.map(item => {
              this.checkList.push(item.ruleKey)
            })
            this.selectedRow = row
            this.dialogDisabled = false
            this.dialogTitle = '规则查看'
            this.buttonList = [
              {
                name: '取消',
                function: 'cancelFunc',
                className: 'button-bg-common'
              },
            ]

            this.$refs.dialog.centerDialogVisible = true
          }
        })
      } catch (e) {
        console.log(e)
      }

    },
    cancelFunc () {
      // 数据规则弹窗 关闭
      this.checkList = [];
      this.$refs.dialog.centerDialogVisible = false
    },
    async confirmFunc () {
      // 数据规则弹窗 确认
      try {
        let ruleNameList = this.checkList.map(item => { return { ruleKey: item } })
        let params = { appId: this.selectedRow.appId, businessId: this.selectedRow.businessId, ruleNameList: ruleNameList }
        await this.$axios.appManageServe.sjgzAdd(params).then(res => {
          if (res.code == 200) {
            this.checkList = []
            this.getList(this.searchParams)
            this.$refs.dialog.centerDialogVisible = false
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getDict (configType) {
      try {
        let params = { configType: configType }
        await this.$axios.commonServe.getDict(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.checkboxList = []
            data.map(item => {
              if (item.configKey && item.configValue) {
                let obj = { configKey: item.configKey, configValue: item.configValue, remark: item.remark }
                this.checkboxList.push(obj)
              }
            })
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
    display: flex;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #8893a3;
    line-height: 32px;
  }
  .dialog-info-title {
    flex: 0 0 70px;
  }
  .dialog-info-value {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    line-height: 32px;
  }
  .dialog-info-box {
    width: 100%;
    display: flex;
    max-height: 300px;
    overflow: auto;
  }
  .el-checkbox {
    margin-right: 0px;
  }
  .el-checkbox-group {
    flex: 0 0 150px;
    label {
      display: block;
    }
  }
  .remark {
    flex: 1;
    white-space: nowrap;
  }
  // .el-checkbox {
  //   display: flex;
  //   align-items: center;
  //   height: 32px;
  //   line-height: 32px;
  // }
  // ::v-deep .el-checkbox__label {
  //   display: flex;
  //   width: 100%;
  //   .item-value {
  //     flex: 0 0 150px;
  //   }
  //   .item-remark {
  //     flex: 1;
  //   }
  // }
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #1c1c1c;
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

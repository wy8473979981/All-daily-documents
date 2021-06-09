<template>
  <!--  参数映射维护 -->
  <div class="page-content">
    <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
    <ysNTable class="table" :tableList="tableList1" :column="column1" :tableHeight="this.$store.state.tableHeight" @vindicateFunc="vindicateFunc" @viewFunc="viewFunc"></ysNTable>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogVindicate" title="参数维护" :width="'1038px'" :buttonList="buttonVindicateList" @vindicateConfirmFunc="vindicateConfirmFunc" @vindicateCancelFunc="vindicateCancelFunc">
      <div slot="content" class="form formNew">
        <div class="operate-content">
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
            <!-- <el-tabs v-model="activeNameVindicate" @tab-click="vindicateTabDialogFunc">
            <el-tab-pane label="请求" name="first"></el-tab-pane>
            <el-tab-pane label="回调" name="second"></el-tab-pane>
          </el-tabs> -->
            <div class="operate-new">
              <div class="operate-new-upload">
                <el-upload class="upload-demo button-bg-main" action="" :auto-upload="false" accept=".json">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- <ysNButton :className="'button-bg-main'" :text="'批量导入'" :styleObject="{'padding':'0 12px'}" @click="exportFunc" /> -->
              </div>
              <div class="operate-new-add">
                <ysNButton :className="'button-bg-sub'" @click="addRowFunc" :text="'添加'" />
              </div>
            </div>
          </div>
        </div>
        <ysNTable class="table" :tableList="tableList2" :column="column2" :tableHeight="393" @vindicateDeleteFunc="vindicateDeleteFunc" @checkSubmit="checkSubmit" @checkDelete="checkDelete"></ysNTable>
      </div>
    </ysNDialog>

    <ysNDialog ref="dialogView" title="参数查看" :width="'1038px'" :buttonList="buttonViewList" @viewCancelFunc="viewCancelFunc">
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
        <!-- <el-tabs v-model="activeNameView" @tab-click="viewTabDialogFunc">
          <el-tab-pane label="请求" name="first"></el-tab-pane>
          <el-tab-pane label="回调" name="second"></el-tab-pane>
        </el-tabs> -->
        <ysNTable class="table" :tableList="tableList3" :column="column3" :tableHeight="393"></ysNTable>
      </div>
    </ysNDialog>

    <ysNDialog ref="dialogDelete" class="dialogDelete" title="" :width="'320px'" :buttonList="buttonDeleteList" @deleteConfirmFunc="deleteConfirmFunc" @deleteCancelFunc="deleteCancelFunc">
      <div slot="content" class="form formNew">
        <div class="delete-tip"> 是否删除当前参数？</div>
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
        businessId: this.$route.query.appId ? this.$route.query.appId : null,
      },
      selectedRow: {
        appName: null,
        businessName: null,
      },
      deleteSelectRow: null,
      fileList: [],
      activeNameVindicate: 'first',
      // activeNameView: 'first',
      column1: columnconfig.tablecolumn1,
      column2: columnconfig.tablecolumn2,
      column3: columnconfig.tablecolumn3,
      tableList1: [],
      tableList2: [],
      tableList3: [],
      searchConfig: searchConfig,
      buttonViewList: [
        {
          name: '关闭',
          function: 'viewCancelFunc',
          className: 'button-bg-common'
        },
      ],
      buttonVindicateList: [
        {
          name: '取消',
          function: 'vindicateCancelFunc',
          className: 'button-bg-common'
        },
        {
          name: '确定',
          function: 'vindicateConfirmFunc',
          className: 'button-bg-main'
        },
      ],
      buttonDeleteList: [
        {
          name: '取消，暂不删除',
          function: 'deleteCancelFunc',
          className: 'button-bg-main',
          padding: '0 12px'
        },
        {
          name: '确定，继续删除',
          function: 'deleteConfirmFunc',
          className: 'button-bg-common',
          padding: '0 12px'
        },
      ],
    }
  },
  watch: {

  },
  mounted () {

    this.getList(this.searchParams)



  },
  methods: {
    async vindicateFunc (row) {
      // 开启 维护 弹窗
      try {
        this.selectedRow = row
        let params = { appId: row.appId, businessId: row.businessId }
        await this.$axios.appManageServe.cswfDetail(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.tableList2 = data.map(item => {
              return {
                ...item,
                requiredFlag: item.requiredFlag ? '是' : '否',
              }
            })
            // 查看弹窗 开启
            this.$refs.dialogVindicate.centerDialogVisible = true

            setTimeout(() => {
              let input = document.querySelector('input[type=file]')
              input.addEventListener('change', () => {
                if (input.files && input.files.length) {
                  const reader = new FileReader();
                  reader.readAsText(input.files[0], 'utf8'); // input.files[0]为第一个文件
                  reader.onload = () => {

                    let fileData = JSON.parse(JSON.stringify(JSON.parse(reader.result)))
                    let uploadJsonFilter = fileData.map(item => {
                      let requiredFlag = item.requiredFlag ? '是' : '否'
                      return { ...item, requiredFlag: requiredFlag }
                    })

                    this.tableList2 = [...this.tableList2, ...uploadJsonFilter]
                  };
                }
              },
                false
              )
            }, 1000);

          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    // vindicateTabDialogFunc (tab, event) {
    //   // 维护弹窗 tab切换
    //   console.log(tab, event);
    // },
    vindicateCancelFunc () {
      // 维护弹窗 关闭
      this.$refs.dialogVindicate.centerDialogVisible = false
    },
    async vindicateConfirmFunc () {
      try {
        let result = this.tableList2.some((item, index, array) => {
          return item.showInput;
        })
        if (result) {
          this.$message({
            message: '请完成输入',
            type: 'warning'
          });
          return false
        }
        let midParamVOList = this.tableList2.map((item, index, array) => {
          let obj = {
            paramName: item.paramName,
            paramNameTarget: item.paramNameTarget,
            remark: item.remark,
            requiredFlag: item.requiredFlag == '是' ? true : false
          }
          return obj;
        })
        let params = { appId: this.selectedRow.appId, businessId: this.selectedRow.businessId, midParamVOList: midParamVOList }
        await this.$axios.appManageServe.cswfBatchAdd(params).then(res => {
          if (res.code == 200) {
            this.getList(this.searchParams)
            this.$refs.dialogVindicate.centerDialogVisible = false
          }
        })
      } catch (e) {
        console.log(e)
      }

    },
    vindicateDeleteFunc (row, index) {
      // 维护弹窗 开启 删除 提示 弹窗
      console.log(row, index)
      this.deleteSelectRow = { row: row, index: index }
      this.$refs.dialogDelete.centerDialogVisible = true
    },
    deleteCancelFunc (row) {
      // 维护弹窗 删除弹窗 取消
      this.$refs.dialogDelete.centerDialogVisible = false
    },
    deleteConfirmFunc (row) {
      // 维护弹窗 删除弹窗 确定
      this.tableList2.splice(this.deleteSelectRow.index, 1)
      this.$refs.dialogDelete.centerDialogVisible = false
    },
    async viewFunc (row) {
      try {
        this.selectedRow = row
        let params = { appId: row.appId, businessId: row.businessId }
        await this.$axios.appManageServe.cswfDetail(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.tableList3 = data.map(item => {
              return {
                ...item,
                requiredFlag: item.requiredFlag ? '是' : '否',
              }
            })
            // 查看弹窗 开启
            this.$refs.dialogView.centerDialogVisible = true
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    // viewTabDialogFunc (tab, event) {
    //   // 查看弹窗 tab切换
    //   console.log(tab, event);
    // },
    viewCancelFunc () {
      // 查看弹窗 关闭
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
        await this.$axios.appManageServe.cswfList(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.pageInfo = { ...this.pageInfo, sum_num: data.total }
            this.tableList1 = data.result.map(item => {
              return {
                ...item,
                // lastDate: this.$Utils.rTime(item.lastDate)
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
    exportFunc () {

    },
    addRowFunc () {
      this.tableList2.push({ showInput: true, remark: null, paramName: null, paramNameTarget: null, requiredFlag: null, selectList: [{ configName: '是', configType: '是' }, { configName: '否', configType: '否' }] })
    },
    async checkSubmit (item, index) {
      try {
        let newItem = { ...item, showInput: false }
        this.$set(this.tableList2, index, newItem)
      } catch (e) {
        console.log(e)
      }
    },
    checkDelete (item, index) {
      try {
        this.tableList2.splice(index, 1)
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
.operate-content {
  display: flex;
  justify-content: space-between;
}
.operate {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  .operate-new {
    display: flex;
    align-items: flex-end;
  }
  .operate-new-add {
    margin-left: 20px;
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
::v-deep .el-upload-list {
  display: none;
}
</style>

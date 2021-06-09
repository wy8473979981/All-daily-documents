<template>
  <div class="tool-bar" type="flex" justify="space-between" align="middle">
    <div>
      <ysNSearch :searchList="searchList" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
      <ysNTable :tableHeight="this.$store.state.tableHeight" :tableList="tableList" :column="column" class="table" @request="request" @response="response">
      </ysNTable>
      <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    </div>
    <ysNDialog ref="dialog" :title="title" :width="'576px'" :buttonList="buttonList" @resend="resend" @cancel="cancel">
      <div slot="content">
        <div class="top-content">
          <p>应用名称：<span>{{currentRow.appName}}</span></p>
          <p>服务名称：<span>{{currentRow.businessName}}</span></p>
        </div>
        <el-input type="textarea" v-model="currentRow.data" placeholder="请输入内容" show-word-limit />
      </div>
    </ysNDialog>
  </div>
</template>

<script>
import columnList from './config/column.js'
import searchList from './config/search.js'
import {
  handle_paginator,
  tableData
} from '@/mixins';
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      buttonList: [
        {
          name: '取消',
          function: 'cancel',
          className: 'button-bg-common'
        },
        {
          name: '重新发送',
          function: 'resend',
          className: 'button-bg-main'
        }
      ],
      title: '',
      centerDialogVisible: false,
      pageInfo: {
        rows: 20,
        page: 1,
        sum_num: 0
      },
      searchParams: {
        appId: this.$route.query.appId ? this.$route.query.appId : null,
        businessId: null,
        reqStatus: null,
        callbackStatus: null
      },
      column: columnList.serverColumn,
      tableList: [],
      searchList: searchList.server,
      currentRow: '',
      businessType: null,
      id: null,
      businessId: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleFormChange (key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    cancel () {
      this.$refs.dialog.centerDialogVisible = false
    },
    resend (item) {
      if (this.businessType) {
        this.response('', 'retry')
      } else {
        this.request('', 'retry')
      }
    },
    async request (item, type) {
      this.$refs.dialog.centerDialogVisible = true
      this.businessType = 0
      this.title = '请求'
      this.id = item ? item.id : this.id
      this.businessId = item ? item.businessId : this.businessId
      let res = ''
      if (type == 'retry') {
        let params = {
          businessId: this.businessId,
          businessType: 0
        }
        res = await this.$axios.systemServe.retry(params)
      } else {
        let params = {
          id: this.id,
          businessType: 0
        }
        res = await this.$axios.systemServe.getRequst(params)
      }

      if (res.code == 200) {
        this.currentRow = res.data
        if (!item) {
          this.$refs.dialog.centerDialogVisible = false
          /* this.$message({
            message: '发送成功',
            type: 'success',
            customClass: 'successDialog',
            offset: 360,
          }); */
        }
      } else {
        this.currentRow = ''
        /* this.$message({
          message: res.message,
          type: 'error',
          customClass: 'failDialog',
          offset: 360,
        }); */
      }
    },
    async response (item, type) {
      this.$refs.dialog.centerDialogVisible = true
      this.businessType = 1
      this.title = '回调'
      this.id = item ? item.id : this.id
      this.businessId = item ? item.businessId : this.businessId
      let res = ''
      if (type == 'retry') {
        let params = {
          businessId: this.businessId,
          businessType: 1
        }
        res = await this.$axios.systemServe.retry(params)
      } else {
        let params = {
          id: this.id,
          businessType: 1
        }
        res = await this.$axios.systemServe.getRequst(params)
      }
      if (res.code == 200) {
        this.currentRow = res.data
        if (!item) {
          this.$refs.dialog.centerDialogVisible = false
          /* this.$message({
            message: '发送成功',
            type: 'success',
            customClass: 'successDialog',
            offset: 360,
          }); */
        }
      } else {
        this.currentRow = ''
        /* this.$message({
          message: res.message,
          type: 'error',
          customClass: 'failDialog',
          offset: 360,
        }); */
      }
    },
    async getList () {
      console.log(this.$axios.systemServe)
      let res = await this.$axios.systemServe.getServeList({
        ...this.pageInfo, searchParams: this.searchParams
      })
      if (res.code == 200) {
        this.pageInfo.sum_num = res.data.total
        this.tableList = res.data.result.map(item => {
          return {
            ...item,
            requestShow: !item.syncFlag,
            callbakeShow: !item.syncFlag && item.callbackBusinessId,
            defaultStyle: (item.reqStatusName == '失败' || item.callbackStatusName == '失败') ? true : false
          }
        })
        console.log(this.tableList,'this.tableList')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-content {
  padding: 0 0 10px;

  p {
    color: #1c1c1c;
    font-size: 14px;
    line-height: 28px;

    span {
      color: #1c1c1c;
    }
  }
}

// .table {
//   // margin-top: 16px;
// }
</style>

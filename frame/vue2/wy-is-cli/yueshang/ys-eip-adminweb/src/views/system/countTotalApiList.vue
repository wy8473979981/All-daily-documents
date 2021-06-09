<template>
  <div class="tool-bar" type="flex" justify="space-between" align="middle">
    <div>
      <ysNSearch :searchList="searchList" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
      <ysNTable :tableList="tableList" :tableHeight="this.$store.state.tableHeight" :column="column" class="table" @echartMap="echartMap">
      </ysNTable>
      <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    </div>
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="800px" center :show-close="false">
      <div class="top-content">
        <p>选中日期：<span>{{searchParams.dateStart}} ~ {{searchParams.dateEnd}}</span></p>
        <p>应用名称：<span>会计平台</span></p>
        <p>服务名称：<span>会计平台</span></p>
      </div>
      <ys-echart :options="options" :height="'300px'" @selectLegend="selectLegend"></ys-echart>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import emptyUrl from '../../assets/images/empty.png'
import successUrl from '../../assets/images/success.png'
import failUrl from '../../assets/images/fail.png'
import totalUrl from '../../assets/images/total.png'
import optionsList from './config/option.js'
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
      options: optionsList.countTotalApi,
      title: '',
      centerDialogVisible: false,
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      /* params: {
        rows:20,
        sum_num:0,
        page:1,
      	
      }, */
      searchParams: {
        appId: '',
        businessId: null,
        dateStart: null,
        dateEnd: null,
      },
      column: columnList.countTotalApi,
      tableList: [],
      searchList: searchList.countTotalApi
    }
  },
  mounted () {
    setTimeout(() => {
      this.$Utils.getDynamicTableHeight(this)
    }, 0)
  },
  methods: {
    handleFormChange (key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async getList (searchParams) {
      if (searchParams) {
        this.searchParams = JSON.parse(JSON.stringify(searchParams))
      }
      console.log(searchParams)
      let res = await this.$axios.systemServe.getCountAppList({ ...this.pageInfo, searchParams: this.searchParams })
      if (res.code == 200) {
        this.tableList = res.data.result
        this.pageInfo.sum_num = res.data.total
      }
    },
    async echartMap (item) {
      console.log(this.searchParams)
      if (!this.searchParams.dateStart) {
        this.$message({
          message: '请选择开始结束时间后查看',
          type: 'warning'
        });
        return false
      }
      let req = {
        searchParams: {
          appId: item.appId,
          dateStart: this.searchParams.dateStart,
          dateEnd: this.searchParams.dateEnd,
          businessId: item.businessId
        }
      }
      let res = await this.$axios.systemServe.getLineEchart(req)
      if (res.code == 200) {
        this.centerDialogVisible = true
        this.title = '调用次数统计图-服务(API)'
        let xList = []
        let y0 = []
        let y1 = []
        let y2 = []
        res.data.allList.map(item => {
          xList.push(item.timeKey)
          y2.push(item.reqValue)
        })
        res.data.successList.map(item => {
          y0.push(item.reqValue)
        })
        res.data.errorList.map(item => {
          y1.push(item.reqValue)
        })
        this.options.xAxis.data = xList
        this.options.series[0].data = y0
        this.options.series[1].data = y1
        this.options.series[2].data = y2
      }

    },
    selectLegend (obj) {
      let that = this
      let imgUrl = [successUrl, failUrl, totalUrl]
      that.options.legend.data.map((item, i) => {

        if (item.name === obj.name) {
          if (!obj.selected[item.name]) {
            item.icon = 'image://' + emptyUrl
          } else {
            item.icon = 'image://' + imgUrl[i]
          }
        }
      })
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

.table {
  // margin-top: 16px;
}
</style>

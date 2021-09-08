<!--
 * @Author: zsj
 * @Date: 2021-06-30 16:29:47
 * @LastEditTime: 2021-07-19 15:27:49
 * @LastEditors: fhj
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :search-column="3"
      :table-slots="['fileName']"
      :table-order-config="tableOrderConfig"
      persmission="Attractlist"
      @select="comSelect"
      @select-all="comSelect"
      @afterQueryData="afterQueryData"
    >
      <template #fileName="scope">
        <ysn-btn type="text">
          <ysn-excel type="export">{{ scope.row.fileName }}</ysn-excel>
        </ysn-btn>
      </template>
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8" @click="addatt">上传</ysn-btn>
      </template>

    </YsnPageContent>
    <formItem
      :is-show-dialog="flag"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
// 请求api
import { attractlistApi } from '@/api'
import formItem from './formitem'

import { searchConfig, tableConfig } from './config'
export default {
  name: 'Attractlist',
  components: { formItem },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 文档名称
        programName: [], // 项目
        toolkitType: []// 工具包分类
      },
      flag: false,
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表数据统计/描述配置
      // tableDescConfig: tableDescConfig,
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: attractlistApi.attractList, // 接口请求方式
        deleteApi: attractlistApi.approveDeleteList, // 删除请求方式

        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        showSlots: ['fileName']
      },
      // 多选数据
      checkboxList: []
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    //  关闭弹窗
    closeDialog() {
      this.flag = false
    },
    comSelect(val) {
      this.checkboxList = val
    },
    // 上传
    addatt() {
      this.flag = true
    }
  }
}
</script>

<!--
 * @Author: xza
 * @Date: 2021-07-21 13:42:34
 * @LastEditTime: 2021-08-11 09:55:51
 * @LastEditors: xza
 * @Description: 滞纳金
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/DramaticperFormance/index.vue
-->

<template>
  <div class="app-page-main">
    <YsnPageFormTableContent
      ref="DramaticperFormance"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="formTableConfig"
      show-left
      :left-config="leftConfig"
      persmission="DramaticperFormance"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="saveData">保存</ysn-btn>
      </template>
    </YsnPageFormTableContent>
  </div>
</template>
<script>
// 请求api
import { dramaticperFormanceApi } from '@/api'
import { searchConfig, formTableConfig, leftConfig, searchForm, queryConfig } from './config'
export default {
  name: 'DramaticperFormance',
  props: {},
  data() {
    return {
      info_: [],
      update: 0,
      // 搜索form
      searchForm: searchForm.call(this),
      // 新增编辑会话框
      dialogAdd: {
        visible: false,
        record: {},
        isEdit: false
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 表格配置
      formTableConfig: formTableConfig.call(this),
      // 左侧列表配置
      leftConfig: leftConfig.call(this),
      // 接口请求配置
      queryConfig: queryConfig.call(this)
    }
  },
  methods: {
    /**
     * @description: 左侧点击搜
     * @param {*} e
     * @return {*}
     */
    async leftChange(e) {
      this.searchForm.programName = e.programId[0].toString()
      if (e.programId.length > 1) {
        this.searchForm.programName = 'x'
      }
      await this.$refs.DramaticperFormance.getList()
      this.update++
    },
    /**
     * @description: 处理列表修改值
     * @param {*} e
     * @return {*}
     */
    rat(e) {
      this.info_.map(i => {
        if (i.id === e.id) {
          i = e
        }
      })
      this.update++
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    saveData() {
      const data_ = {
        data: this.info_
      }
      dramaticperFormanceApi.dramaticperFormanceSave(data_).then(async res => {
        if (res) {
          await this.$message({
            message: '保存成功',
            type: 'success'
          })
          await this.$refs.DramaticperFormance.getList()
        }
      })
    },
    /**
     * @description: 列表数据请求之前数据处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      return data
    },
    /**
     * @description: 数据请求后把数据返回外部
     * @param {*} data
     * @return {*}
     */
    afterQueryData(data) {
      this.info_ = data.list
      return data
    }
  }
}
</script>

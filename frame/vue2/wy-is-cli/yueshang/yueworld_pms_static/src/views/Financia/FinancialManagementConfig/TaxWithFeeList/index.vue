<!--
 * @Author: xza
 * @Date: 2021-08-10 17:23:17
 * @LastEditTime: 2021-08-11 09:50:15
 * @LastEditors: xza
 * @Description: 税率-费项关系
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxWithFeeList/index.vue
-->

<template>
  <div class="app-page-main">
    <YsnPageFormTableContent
      ref="TaxWithFeeList"
      :search-form="searchForm"
      :query-config="queryConfig"
      :search-config="searchConfig"
      :table-config="formTableConfig"
      show-left
      :left-config="leftConfig"
      persmission="TaxWithFeeList"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="save">保存</ysn-btn>
      </template>
    </YsnPageFormTableContent>
  </div>
</template>
<script>
// 请求api
import { taxModuleListApi } from '@/api'
import { formTableConfig, leftConfig, searchConfig, searchForm, queryConfig } from './config'
export default {
  name: 'TaxWithFeeList',
  props: {},
  data() {
    return {
      info_: [],
      leftConfig: leftConfig.call(this), // 左侧配置
      formTableConfig: formTableConfig.call(this),
      searchConfig: searchConfig.call(this),
      update: 0,
      // 搜索form
      searchForm: searchForm.call(this),
      // 接口请求配置
      queryConfig: queryConfig.call(this)
    }
  },
  methods: {
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
     * @description: 左侧点击搜索
     * @param {*} e
     * @return {*}
     */
    async leftChange(e) {
      this.searchForm.programName = e.programId[0].toString()
      console.log(e)
      if (e.programId.length > 1) {
        this.searchForm.programName = 'x'
      }
      await this.$refs.TaxWithFeeList.getList()
      this.update++
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
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    save() {
      const data_ = {
        data: this.info_
      }
      taxModuleListApi.taxModuleFeeSave(data_).then(res => {
        if (res) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

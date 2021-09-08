<!--
 * @Author: xza
 * @Date: 2021-07-21 14:22:13
 * @LastEditTime: 2021-08-11 09:52:57
 * @LastEditors: xza
 * @Description: 税率-科目关系
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxWithSubject/index.vue
-->

<template>
  <div class="app-page-main">
    <YsnPageFormTableContent
      ref="TaxWithSubject"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      show-left
      :left-config="leftConfig"
      :table-config="formTableConfig"
      persmission="TaxWithSubject"
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
import { searchConfig, leftConfig, formTableConfig, queryConfig, searchForm } from './config'
export default {
  name: 'TaxWithSubject',
  props: {},
  data() {
    return {
      info_: [],
      leftConfig: leftConfig.call(this), // 左侧配置
      formTableConfig: formTableConfig.call(this),
      update: 0,
      // 搜索form
      searchForm: searchForm.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      // tableConfig: tableConfig.call(this),
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
      await this.$refs.TaxWithSubject.getList()
      this.update++
    },
    /**
     * @description: 列表数据请求之前数据处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      this.info_ = data.list
      return data
    },
    /**
     * @description: 数据请求后把数据返回外部
     * @param {*} data
     * @return {*}
     */
    afterQueryData(data) {
      this.info_ = data.list
      data.list.map(i => {
        i.taxInfo = i.taxId + '/' + i.taxName + '/' + i.taxCollectType + '/' + i.tax
      })
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
      taxModuleListApi.taxModuleSubjectSave(data_).then(async res => {
        if (res) {
          await this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

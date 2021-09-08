<!--
 * @Author: xiaoxie
 * @LastEditors: xueyx
 * @Description:品牌落位列表页面
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="brandPositiongList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :delete-table="deleteTable"
      delete-message="非草稿状态下不可删除"
      persmission="brandPositioningList"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { investmentApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'BrandPositioningList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: []// 项目名称

      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: investmentApi.brandPositioningList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: investmentApi.brandPositioningList // 批量删除
      },
      // 审核状态
      auditStatus: '',
      // 多选list的id
      selectIdList: []
    }
  },

  mounted() {
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情页面
    rowClick(row) {
      // 根据审核状态判断跳转详情页还是编辑页   0-草稿  1-驳回  2-审核中  3-已审核
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        this.$router.push({ name: 'BrandPositioningAdd', query: { id: row.id }})// 草稿，驳回 跳转编辑页
      } else {
        this.$router.push({ name: 'BrandPositioningDetail', query: { id: row.id }})// 审核中，已审核 跳转详情页
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'BrandPositioningAdd' })
    },
    // 删除方法
    deleteSelect() {
      const that = this
      if (!that.selectIdList || that.selectIdList.length === 0) {
        that.$message.error('请选择数据')
        return
      }
      investmentApi.deleteBrandPosition(that.selectIdList).then(res => {
        if (res) {
          that.$message.success('删除成功')
          that.$refs.brandPositiongList.getList()
        }
      })
    },
    // 默认非草稿禁止删除
    deleteTable(row) {
      return row.checkStatus === 1
    }
  }
}
</script>

<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更
-->

<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="auditStatusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQueryData"
      persmission="ContractChange"
      :table-slots="['contractChangeNO']"
      @row-click="rowClick"
    >
      <template #contractChangeNO="scope">
        <a style="color: #468CEB">{{ scope.row.contractChangeNO }}</a>
      </template>
      <!-- 列表操作功能 -->
      <template #tableRight>
        <el-dropdown class="mr-12">
          <el-button class="btn" type="primary">新增<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-dropdown-menu slot="dropdown" style="width: 120px">
            <el-dropdown-item>
              <el-button type="text" @click="addBox(1)">合同条款变更</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="addBox(2)">合同应收调整</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="addBox(3)">补充条款变更</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, auditStatusSearchConfig } from './config'
import { contractChangeApi } from '@/api'

export default {
  name: 'ContractChange',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目名称
        auditStatus: [], // 审核状态
        changeType: '' // 变更类型
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      auditStatusSearchConfig: auditStatusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: contractChangeApi.contractChangeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkb填入eox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },
      // 审核状态
      auditStatus: ''
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQueryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 行点击详情页面或编辑页面
    rowClick(row) {
      const that = this
      const audiStatusList = this.$PUBFN.getOptionsList('auditStatus') // 获取审核状态列表
      audiStatusList.forEach(ele => {
        if (row.auditStatus === ele.label) {
          that.auditStatus = ele.value
        }
      })
      // 根据审核状态判断跳转详情页还是编辑页   0-草稿  4-已驳回  2-审核中  5-审核通过
      if (that.auditStatus === 0 || that.auditStatus === 4) {
        const name = row.changeType === '合同条款变更' ? 'ContractChangeTermAdd' : row.changeType === '合同应收调整' ? 'ContractChangeReceivableAdd' : 'ContractChangeAdditionTermAdd'
        this.$router.push({ name: name, query: { id: row.id }})// 草稿，驳回 跳转编辑页
      } else {
        const name = row.changeType === '合同条款变更' ? 'ContractChangePreview' : row.changeType === '合同应收调整' ? 'ContractChangeReceivableDetail' : 'ContractChangeAdditionTermDetail'
        this.$router.push({ name: name, query: { id: row.id, status: row.auditStatus }})// 审核中，已审核 跳转详情页
      }
    },
    // 新增跳转
    addBox(type) {
      const name = type === 1 ? 'ContractChangeTermAdd' : type === 2 ? 'ContractChangeReceivableAdd' : 'ContractChangeAdditionTermAdd'
      this.$router.push({ name: name })
    },
    statusChange(statusList) {
      this.$emit('checks', statusList, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  border: none;
  padding: 0 14px;
  border-radius: 16px;
  line-height: 32px;
  min-width: 86px;
  font-size: 14px;

  // 主要按钮
  &.el-button--primary {
    &:hover {
      background: #20384A;
    }
  }

  &.el-button--text {
    min-width: auto;
    padding: 0;
  }
}
</style>

<!--
 * @Author: xiaxiaona
 * @LastEditors: Please set LastEditors
 * @Description: 深入洽谈-列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="Negotiation"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      persmission="Negotiation"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @onSelect="onSelect"
    >
      <!-- 列表操作 功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8" @click="Object.assign(dialogAdd, { visible: true, record: {leaseArea:[]} })">新增</ysn-btn>
        <ysn-btn :disabled="!checkedData.length" @click="addBrand">品牌入库</ysn-btn>
      </template>
    </YsnPageContent>

    <!-- 弹窗新增编辑 -->
    <DialogFormAdd
      :is-show-dialog="dialogAdd.visible"
      :info="dialogAdd.record"
      :is-edit="isEdit"
      @closeDialog="closeDialog"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>

<script>
import { investmentApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import DialogFormAdd from './blocks/dialogFormAdd'
export default {
  name: 'Negotiation',
  components: { DialogFormAdd },
  data() {
    return {
      isEdit: false,
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 项目名称
        spaceEquityNature: [] // 规划业态
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: investmentApi.negotiationList, // 接口请求方式
        dataKey: 'data' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableOrderConfig: {
        // checkbox: true, // 继承el-table所有属性,ysn-table的属性
        highLightCurrentRow: true,
        full: false,
        height: '200px',
        selectKey: 'id'
      },
      // 新增编辑会话框
      dialogAdd: {
        visible: false,
        record: {
        }
      },

      // 选中的table row
      checkedData: []
    }
  },
  created() {
    console.log(document.querySelector('.el-table_2_column_13'))
  },
  methods: {
    closeDialog() {
      this.dialogAdd = {
        visible: false,
        record: {
          leaseArea: []
        }
      }
      this.isEdit = false
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 列表单行点击
    rowClick(record) {
      this.isEdit = true
      Object.assign(this.dialogAdd, { visible: true, record })
    },

    //  删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    },

    // 刷新列表
    successTableList() {
      const that = this
      investmentApi.negotiationList(that.searchForm).then((res) => {
        if (res.data && res.data.length > 0) {
          that.tableData = res.data
        }
        that.update++
      })
    },

    // 选中的checkbox
    onSelect(value) {
      console.log(value)
      this.checkedData = value
    },

    // 品牌入库
    addBrand() {
      // 保存需要入库的品牌 品牌库组件通过getItem获取使用
      localStorage.setItem('addBrandFormNegotiation', JSON.stringify(this.checkedData))
      // 打开品牌库页面
      // console.log(this.checkedData.brandName)
      this.$router.push({ name: 'BrandLibrary', query: { type: 'add', brandName: this.checkedData[0].brandName }})
      // const page = this.$router.resolve({ name: 'BrandLibrary', query: { type: 'add' }})
      // window.open(page.href, '_blank')
    }
  }
}
</script>

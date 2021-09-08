<!--
 * @Author: shuyuan
 * @LastEditors: xza
 * @Description: 品牌库
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="DramaticperFormance"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      show-left
      persmission="DramaticperFormance"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #leftSlots>
        <div class="xm">业态</div>
        <el-tree :data="dataLeft" node-key="id" :props="defaultProps">
          <span slot-scope="{ node, data }" class="custom-tree-node" :class="{'checked':node.checked}" @click="handleNodeClick(node,data)">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </template>
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8" @click="add">新增</ysn-btn>
        <ysn-btn class="mr-8" type="info">导入</ysn-btn>
        <ysn-btn type="reset">导出</ysn-btn>
      </template>
    </YsnPageContent>
    <addDialog v-if="dialogType=='add' || dialogType=='edit'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
    <detailsDialog v-if="dialogType=='details'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
  </div>
</template>
<script>
// 请求api
import { brandLibraryApi } from '@/api'
import { searchConfig, leftConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
import addDialog from './blocks/addDialog'
import detailsDialog from './blocks/detailsDialog'
export default {
  name: 'BrandLibrary',
  components: {
    addDialog,
    detailsDialog
  },
  data() {
    return {
      tableConfig: tableConfig.call(this),
      tableDescConfig: tableDescConfig,
      isShowDialog: false, // 控制弹窗
      dialogType: null, // add=新增，edit=编辑
      formData: {},
      // 左侧列表配置
      leftConfig: leftConfig.call(this),
      dataLeft: this.$PUBFN.getOptionsList('brandFormatName1'),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        brandLevel: [],
        brandOperateType: [],
        brandStoreType: [],
        brandShopMode: [],
        brandFormatName: ''
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: brandLibraryApi.brandLibraryList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      brandFormatNameList: []
    }
  },
  /**
   * @description: 深入洽谈品牌入库跳转
   * @param {*} 2021/9/3 21:36
   * @return {*}
   */
  created() {
    if (this.$route.query.type === 'add') {
      this.dialogType = 'add'
      this.isShowDialog = true
      this.formData = { brandLogo: [], brandContacts: [{}], brandFormatName: [], brandName: this.$route.query.brandName }
    }
  },
  methods: {
    /**
	 * @description :作侧点击搜索
	 * @param {Object} e
	 */
    leftChange(e) {
      this.searchForm.fuzzyEnquiry = e.programId[0].toString()
      if (e.programId.length > 1) {
        this.searchForm.fuzzyEnquiry = ''
      }
      this.$refs.DramaticperFormance.getList()
      this.update++
    },
    // 关闭弹窗
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
      this.dialogType = null
    },
    add() {
      this.dialogType = 'add'
      this.isShowDialog = true
      this.formData = { brandLogo: [], brandContacts: [{}], brandFormatName: [] }
    },
    handleNodeClick(node, data) {
      node.checked = !node.checked
      console.log(node)
      console.log(data)
      if (node.checked) {
        this.searchForm.brandFormatName = node.label
        this.queryConfig = {
          api: brandLibraryApi.brandLibraryList, // 接口请求方式
          dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
        }
      }
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      console.log('请求之前数据处理', data)
      return data
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    rowClick(row) {
      console.log(row)
      this.formData = JSON.parse(JSON.stringify(row))
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        this.dialogType = 'edit'
        this.isShowDialog = true
      } else {
        this.dialogType = 'details'
        this.isShowDialog = true
      }
    }
  }
}
</script>
<style lang="scss">
  .xm {
    color: #848382;
	margin: 20px 0;
  }
  .custom-tree-node {
    font-size: 14px;
    background: #E5E2DE;
    width: 139px;
    height: 24px;
    border-radius: 16px;
    line-height: 24px;
    padding-left: 14px;
    color: #848382;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-tree-node__content{
    margin-bottom: 11px;
  }
  .is-checked .el-tree-node__label{
    background: #1C4C7F;
    color: #ffffff;
  }
  .checked{//选中样式
    background: #1C4C7F;
    color: #ffffff;
  }
</style>

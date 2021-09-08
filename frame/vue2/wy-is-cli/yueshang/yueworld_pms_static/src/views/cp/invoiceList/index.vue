<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:发票管理列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :data-tmp="dataTmp"
      :query-config="queryConfig"
      :table-config="tableConfig"
      @afterQueryData="afterQueryData"
    >
      <template #tableRight>
        <ysn-btn type="info" class="mr-8" disabled>查看电子发票</ysn-btn>
        <ysn-btn class="mr-8" disabled>上传发票</ysn-btn>
        <ysn-btn>新增发票</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { testApi } from '@/api'
const dataTmp = {
  t1: 'FP-202030000',
  t2: '测试项目',
  t3: '珠海市酒店管理有限公司',
  t4: '普票',
  t5: 1,
  t6: 1,
  t7: '2020-05-',
  t8: '失败'
}
export default {
  name: 'InvoiceList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      },
      // 搜索配置
      searchConfig: [
        { itemType: 'input', prop: 's1', label: '', placeholder: '请输入合同编号、发票编号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'select', prop: 's2', label: '', placeholder: '所有项目', width: '220px', list: this.$PUBFN.getOptionsList('globalSearchList'), isFirst: true },
        { itemType: 'select', prop: 's3', label: '', placeholder: '所有费项', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'datePicker', type: 'date', prop: 's4', label: '', placeholder: '应收日期', width: '200px' }
      ],

      // 列表数据
      tableData: [],
      // 列表配置
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { t1: '发票编号', sortable: true, isShow: true, showFixed: true },
        { t2: '项目', sortable: true, isShow: true },
        { t3: '租户', sortable: true },
        { t4: '类型', hasClose: true, isShow: true, tableList: [
          { t5: '开票金额(元)', isShow: true, sortable: true, width: 140 },
          { t6: '税额(元)', isShow: true, sortable: true, width: 140 },
          { t7: '发票日期', isShow: true, sortable: true, width: 140 },
          { t8: '状态', isShow: true, sortable: true, width: 140 }
        ] },
        { t5: '开票金额(元)', isShow: true, sortable: true, width: 140 },
        { t6: '税额(元)', sortable: true, isShow: true },
        { t7: '发票日期', sortable: true },
        { t8: '状态', sortable: true }
      ],
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0,

      // 测试数据
      dataTmp: dataTmp,

      // 接口请求配置
      queryConfig: {
        api: testApi.getList
      }
    }
  },

  mounted() {
  },
  methods: {
    afterQueryData(data) {
      console.log(data)
    }
  }
}
</script>

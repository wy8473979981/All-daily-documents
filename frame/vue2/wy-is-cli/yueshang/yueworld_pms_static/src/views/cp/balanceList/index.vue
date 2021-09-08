<template>
  <div class="app-page-main ">
    <div class="max-area">
      <div class="flex-ju-between">
        <!-- 高级搜索 -->
        <ysn-seniorSearch
          :form="searchForm"
          :config="searchConfig"
          clearable
          :column="4"
          @searchResult="getList"
        />
      </div>

      <!-- 右侧操作 -->
      <div class="text-right mb-16">
        <span class="mr-16 color-848382 text-14 cursor-pointer">下载模板</span>
        <ysn-btn type="info" class="mr-8">导入保证金</ysn-btn>
        <ysn-btn>导出</ysn-btn>
      </div>

      <!-- 列表 -->
      <ysn-table :data="tableData" :column="tableConfig" select-key="id" full />

      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>
<script>
import { testApi } from '@/api'
const dataTmp = {
  t1: 'CIMI-20210400000',
  t2: '上海良品铺子食品公司',
  t3: '良品铺子',
  t4: '#5-150',
  t5: '租赁保证金',
  t6: 50000,
  t7: 5000,
  t8: '-',
  t9: 0,
  t10: '-',
  t11: 5000,
  t12: 'SK-20184154215'
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
        s4: '',
        s5: '',
        s6: '',
        s7: ''
      },
      // 搜索配置
      searchConfig: [
        {
          itemType: 'input',
          prop: 's1',
          label: '',
          placeholder: '请输入合同编码、品牌等',
          width: '220px',
          isSearch: true,
          isFirst: true
        },
        {
          itemType: 'select',
          prop: 's2',
          label: '',
          placeholder: '所有项目',
          width: '220px',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'select',
          prop: 's3',
          label: '',
          placeholder: '所有费项',
          width: '200px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'input',
          prop: 's4',
          label: '',
          placeholder: '请填写铺位号',
          width: '200px'
        },
        {
          itemType: 'input',
          prop: 's5',
          label: '',
          placeholder: '请填写品牌',
          width: '200px'
        },
        {
          itemType: 'input',
          prop: 's6',
          label: '',
          placeholder: '请填写商家',
          width: '200px'
        },
        {
          itemType: 'select',
          prop: 's7',
          label: '',
          placeholder: '请选择业态',
          width: '200px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        }
      ],

      // 列表数据
      tableData: [],
      // 列表配置
      tableConfig: [
        { t0: '序号', type: 'index', width: '100px', sortable: true },
        { t1: '合同编号', width: '200px', sortable: true },
        { t2: '商家', width: '200px', sortable: true },
        { t3: '品牌', width: '200px', sortable: true },
        { t4: '铺位号', width: '120px', sortable: true },
        { t5: '费项', width: '120px', sortable: true },
        { t6: '总额', sortable: true },
        { t7: '罚没金', width: '120px', sortable: true },
        { t8: '退款金', width: '120px', sortable: true },
        { t9: '已冲抵', width: '120px', sortable: true },
        { t10: '可冲抵', width: '120px', sortable: true },
        { t11: '保证金余额', width: '120px', sortable: true },
        { t12: '来源单号', width: '200px', sortable: true }
      ],
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      const res = await testApi.getList(dataTmp)
      this.tableData = res.data
      this.total = res.total
    },
    // 分页切换
    pageChange(page) {
      this.page = { ...page }
      this.getList()
    },
    // 选项卡切换
    handleChange() {
      this.getList()
    }
  }
}
</script>

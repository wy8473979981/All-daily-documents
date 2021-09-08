<template>
  <div class="app-page-main ">
    <div class="max-area">
      <div class="flex-ju-between">
        <!-- 高级搜索 -->
        <ysn-seniorSearch
          :form="searchForm"
          :config="searchConfig"
          clearable
          :column="5"
          @searchResult="getList"
        />
      </div>

      <!-- 右侧操作 -->
      <div class="text-right mb-16">
        <span class="mr-16 color-848382 text-14 cursor-pointer">下载模板</span>
        <ysn-btn type="info" class="mr-8">批量推送收款单</ysn-btn>
        <ysn-btn type="info" class="mr-8">批量核销</ysn-btn>
        <ysn-btn type="info" class="mr-8">导入收款单</ysn-btn>
        <ysn-btn>新增收款</ysn-btn>
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
  t1: '珠海世纪城-华发新天地中庭',
  t2: '4#1-',
  t3: '良品铺子',
  t4: '上海良品铺子有限公司',
  t5: '转账',
  t6: 100000,
  t7: 100000,
  t8: '2021-04-',
  t9: '状态',
  t10: '未推送',
  t11: '张伟斌',
  t12: 'SK-201841542154',
  t13: '-'
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
        s6: ''
      },
      // 搜索配置
      searchConfig: [
        {
          itemType: 'input',
          prop: 's1',
          label: '',
          placeholder: '请输入商家/单据号等信息',
          width: '220px',
          isSearch: true,
          isFirst: true
        },
        {
          itemType: 'select',
          prop: 's2',
          label: '',
          placeholder: '所有项目',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'select',
          prop: 's3',
          label: '',
          placeholder: '所有收款方式',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'select',
          prop: 's4',
          label: '',
          placeholder: '所有状态',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'select',
          prop: 's5',
          label: '',
          placeholder: '所有推送状态',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'datePicker',
          prop: 's6',
          label: '',
          placeholder: '收款月份',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        }
      ],

      // 列表数据
      tableData: [],
      // 列表配置
      tableConfig: [
        { t0: '序号', type: 'index', width: '100px', sortable: true },
        { t1: '项目名称', width: '200px', sortable: true },
        { t2: '铺位号', width: '120px', sortable: true },
        { t3: '品牌', width: '200px', sortable: true },
        { t4: '商家', width: '200px', sortable: true },
        { t5: '收款方式', width: '120px', sortable: true },
        { t6: '收款金额', width: '120px', sortable: true },
        { t7: '核销金额', width: '120px', sortable: true },
        { t8: '收款日期', width: '120px', sortable: true },
        { t9: '状态', width: '120px', sortable: true },
        { t10: '推送状态', width: '120px', sortable: true },
        { t11: '创建人', width: '120px', sortable: true },
        { t12: '收款单号', width: '200px', sortable: true },
        { t13: '备注' }
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
      this.page.pageNo = page
      this.getList()
    },
    // 选项卡切换
    handleChange() {
      this.getList()
    }
  }
}
</script>

<template>
  <div class="app-page-main ">
    <div class="max-area">
      <ysn-tabs class="pb-12" :list="tabs_list" @change="handleChange" />
      <div class="flex-ju-between">
        <!-- 高级搜索 -->
        <ysn-seniorSearch
          :form="searchForm"
          :config="searchConfig"
          clearable
          :column="4"
          @searchResult="getList"
        />

        <!-- 右侧操作 -->
        <div class="text-right">
          <!-- <ysn-btn type="info" class="mr-8" @click="handleBack">返回</ysn-btn> -->
          <ysn-btn class="mr-8" disabled>导出凭证</ysn-btn>
          <ysn-btn type="danger" class="mr-8">删除凭证</ysn-btn>
          <ysn-btn>上传凭证</ysn-btn>
        </div>
      </div>

      <!-- 列表 -->
      <ysn-table
        :data="tableData"
        :column="tableConfig"
        select-key="id"
        full
        @row-click="handleClick"
      />

      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>
<script>
import { testApi } from '@/api'
const dataTmp = {
  t1: '演示项目',
  t2: '演示项目',
  t3: '.',
  t4: 'YS-000000',
  t5: 1,
  t6: 1,
  t7: '2020-02-',
  t8: '待上传',
  t9: '新增凭证',
  t10: '.',
  t11: '刘彬',
  t12: '2020-02-'
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
        s5: ''
      },
      // 搜索配置
      searchConfig: [
        {
          itemType: 'input',
          prop: 's1',
          label: '',
          placeholder: '请输入凭证号',
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
          placeholder: '所有付费类型',
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
          placeholder: '所有凭证类型',
          width: '150px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        }
      ],

      // 列表数据
      tableData: [],
      // 列表配置
      tableConfig: [
        { t0: '序号', type: 'index', width: '100px', sortable: true },
        { t1: '账套名称', width: '200px', sortable: true },
        { t2: '分场名称', width: '200px', sortable: true },
        { t3: '三方凭证号', width: '120px', sortable: true },
        { t4: '帐套编号', width: '120px', sortable: true },
        { t5: '借方金额', width: '120px', sortable: true },
        { t6: '贷方金额', width: '120px', sortable: true },
        { t7: '凭证日期', width: '120px', sortable: true },
        { t8: '凭证状态', width: '120px', sortable: true },
        { t9: '来源类型', width: '120px', sortable: true },
        { t10: '红冲凭证', width: '120px', sortable: true },
        { t11: '制单人', width: '120px', sortable: true },
        { t12: '生成日期', width: '120px', sortable: true }
      ],
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0,
      tabs_list: [
        {
          label: '凭证汇总'
        },
        {
          label: '凭证模板'
        },
        {
          label: '数组源/单据池'
        }
      ]
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
    },
    // 点击行
    handleClick(row) {
      this.$router.push({
        name: 'voucherDetail'
      })
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

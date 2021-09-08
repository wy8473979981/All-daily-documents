<template>
  <div class="app-page-main ">
    <div class="max-area">
      <div class="flex-ju-between mb-16">
        <div class="text-16 text-weight-bold">凭证号码：V0-20210100021</div>
        <!-- 右侧操作 -->
        <div class="text-right">
          <span class="mr-16 color-848382 text-14 cursor-pointer">查看源代码</span>
          <ysn-btn type="info" class="mr-8" @click="handleBack">返回</ysn-btn>
          <ysn-btn class="mr-8" disabled>作废</ysn-btn>
          <ysn-btn>保存</ysn-btn>
        </div>
      </div>
      <!-- TODO 折叠组件 -->
      <div class="flex-ju-start flex-wrap">
        <div v-for="(item, index) in main_info" :key="index" class="pr-28">
          <div class="text-14 color-848382 pb-12">{{ item.label }}</div>
          <div class="text-20 mb-24">{{ item.value }}</div>
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
  t1: '2203120',
  t2: '能源费',
  t3: '电费',
  t4: '借',
  t5: 500,
  t6: 500,
  t7: '电费',
  t8: '不想影响现金流量',
  t9: 1
}
export default {
  name: 'InvoiceList',
  props: {},
  data() {
    return {
      // 列表数据
      tableData: [],
      // 列表配置
      tableConfig: [
        { t0: '序号', type: 'index', width: '100px', sortable: true },
        { t1: '科目代码', sortable: true },
        { t2: '科目名称', sortable: true },
        { t3: '辅助核算', sortable: true },
        { t4: '方向', sortable: true },
        { t5: '借方金额', sortable: true },
        { t6: '贷方金额', sortable: true },
        { t7: '摘要', sortable: true },
        { t8: '现金流项目', sortable: true },
        { t9: '对方分录号', sortable: true }
      ],
      // 主信息
      main_info: [
        {
          label: '账套名称',
          value: '上海商业管理有限公司'
        },
        {
          label: '凭证日期',
          value: '2021-01-19'
        },
        {
          label: '第三方凭证号',
          value: '2021-04-28'
        },
        {
          label: '收付类型',
          value: '收款'
        },
        {
          label: '借方金额',
          value: '90.86'
        },
        {
          label: '贷方金额',
          value: '90.86'
        },
        {
          label: '上传时间',
          value: '2021-04-28'
        },
        {
          label: '上传人',
          value: '张三'
        },
        {
          label: '凭证类型',
          value: '记账'
        },
        {
          label: '来源类型',
          value: '新增凭证'
        }
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
    },
    // 点击行
    handleClick(row) {
      // DO SOMETHING
    },
    // 返回
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

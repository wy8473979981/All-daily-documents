<template>
  <div class="app-page-main">
    <FormItem :table-data="tableData" :total="total" :page="page" :form-data="formData" @searchTable="searchTable" @reshft="pageChange" @checks="getCheck" />
  </div>
</template>
<script>
import FormItem from './blocks/formItem.vue'
import { meterApi } from '@/api'
export default {
  name: 'GroupingScheme',
  components: { FormItem },
  props: {},
  data() {
    return {
      tableData: [],
      total: 0,
      formData: {
        name: '',
        project: '',
        static: [],
        type: []
      },
      page: {
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      const param = Object.assign(this.formData, { page: this.page })
      const res = await meterApi.groupList(param)
      this.$nextTick(function() {
        this.tableData = res.list
        this.total = res.total
      })
    },
    // 分页切换
    pageChange(page) {
      this.page.pageNo = page.pageNo
      this.getList(Object.assign(this.formData, { page: this.page }))
    },
    // 搜索
    searchTable(data) {
      this.formData = Object.assign(this.formData, { name: data.name, project: data.project })
      this.page.pageNo = 1
      this.getList()
    },
    getCheck(data, type) {
      if (type == 1) {
        this.formData = Object.assign(this.formData, { static: data })
      } else {
        this.formData = Object.assign(this.formData, { type: data })
      }
      this.page.pageNo = 1
      this.getList()
    }
  }
}
</script>


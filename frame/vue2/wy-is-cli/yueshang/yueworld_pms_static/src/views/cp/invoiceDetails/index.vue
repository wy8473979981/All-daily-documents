<template>
  <div class="app-page-main">
    <div class="center">
      <div class="ranking-infor">
        <!-- 基础信息 -->
        <ysn-flod id="基础信息" title="基础信息" :show-flod="false">
          <transition name="el-zoom-in-top">
            <div class="zhubj">
              <div v-for="(item,i) in list" :key="i" class="every">
                <p>{{ item.t1 }}</p>
                <p>{{ item.t2 }}</p>
              </div>
            </div>
          </transition>
        </ysn-flod>
      </div>
      <!-- 发票明细 -->
      <div class="ranking-table">
        <ysn-flod id="发票明细" title="发票明细" :show-flod="false">
          <ysn-table
            :data="tableData"
            :column="tableConfig"
            :checkbox="false"
          />
        </ysn-flod>

      </div>
      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>

  </div>
</template>
<script>
import { tableData, list } from './data'
import { tableConfig } from './config'
export default {
  name: 'GroupingScheme',
  components: { },
  props: {},
  data() {
    return {
      list,
      tableData, // 发票明细表格数据
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 10,
      tableConfig// 发票明细表格配置
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    pageChange(page) {
      this.page.pageNo = page
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

<template>
  <div class="list-page">
    <!--[返回上一页 start]-->
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <el-button @click="toBackPage" size="mini" type="info">返回</el-button>
        <el-button @click="saveData" size="mini" type="primary">保存</el-button>
      </el-col>
    </el-row>
    <!--[返回上一页 end]-->

    <!--[项目详情表 start]-->
    <el-table
      :data="detailData"
      class="table-bg-main mg-b20"
      :header-cell-style="tableHeaderColor"
      border
      size="small"
      style="width: 100%;">
      <el-table-column
        prop="project_name"
        label="项目名称 *">
      </el-table-column>
      <el-table-column
        prop="market_research_name"
        label="所属市调">
      </el-table-column>
      <el-table-column
        prop="distance"
        label="距离项目(公里)">
      </el-table-column>
      <el-table-column
        prop="position"
        label="位置">
      </el-table-column>
      <el-table-column
        prop="open_year"
        label="开业年限">
      </el-table-column>
      <el-table-column
        prop="store_situation"
        label="商铺现状">
      </el-table-column>
      <el-table-column
        prop="dimension"
        label="项目体量(m²)">
      </el-table-column>
      <el-table-column
        prop="commercial_area"
        label="商业面积(m²)">
      </el-table-column>
      <el-table-column
        prop="rent_avg"
        label="非主力店平均租金">
      </el-table-column>
    </el-table>
    <!--[项目详情表 end]-->

    <!--[楼层法-非主力店品牌 start]-->
    <el-tag effect="dark" class="font-c-w" style="border-radius: 4px 4px 0 0;">楼层法</el-tag>
    <el-table
      :data="detailData2"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      show-summary
      size="small"
      class="mg-b20"
      style="width: 100%;">
      <el-table-column
        v-for="(item,index) in floorTable"
        :key="'floor'+index"
        :prop="item.key"
        :label="item.name">
        <template slot-scope="scope">
          <el-input v-if="item.key === 'demand_research_sum'" v-filter-check-int v-show="true" size="mini" v-model="scope.row.demand_research_sum" placeholder="请输入" />
          <span v-else>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--[楼层法-非主力店品牌 end]-->

    <!--[业态法-非主力店品牌 start]-->
    <el-tag effect="dark" class="font-c-w" style="border-radius: 4px 4px 0 0;">业态法</el-tag>
    <el-table
      :data="detailData3"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      show-summary
      size="small"
      style="width: 100%;">
      <el-table-column
        v-for="(item,index) in layoutTable"
        :key="'type'+index"
        :prop="item.key"
        :label="item.name">
        <template slot-scope="scope">
          <el-input v-if="item.key === 'demand_research_sum'" v-filter-check-int v-show="true" size="mini" v-model="scope.row.demand_research_sum" placeholder="请输入" />
          <span v-else>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--[业态法-非主力店品牌 end]-->
  </div>
</template>

<script>
import { handlePaginator,tableRowStyle,tableHeaderColor } from "@mixins"
import contTempCate from '@apis/contTempCate'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      floorTable: [],
      layoutTable: [],
      detailData: [],
      detailData2: [],
      detailData3: [],
      project_id: null
    }
  },
  created () {
    this.project_id = this.$route.query.id
  },
  methods: {
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 初始化数据，获取项目详情
    async getList (id) {
      const res = await contTempCate.selectProjectById({project_id: this.project_id});
      if (res.code === 200 && res.result){
        this.detailData.push(res.result)
      }
      // 楼层法
      const floor = await contTempCate.selectProjectFloorById({project_id: this.project_id});
      if (floor.code === 200 && floor.result){
        this.detailData2 = floor.result.floor_list
        this.floorTable = floor.result.statistics_head
      }
      // 业态法
      const layout = await contTempCate.selectProjectLayoutById({project_id: this.project_id});
      if (layout.code === 200 && layout.result){
        this.detailData3 = layout.result.layout_list
        this.layoutTable = layout.result.statistics_head
      }
    },
    tableRowStyle,
    tableHeaderColor,
    showLog(row, column, cell, event){
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
    },
    async saveData () {
      if (this.detailData2 && this.detailData2.length > 0) {
        const params2 = {id: this.project_id,input: JSON.stringify(this.detailData2)}
        const addInDetail2 = await contTempCate.addInDetail(params2)
      }


      if (this.detailData3 && this.detailData3.length > 0) {
        const params3 = {id: this.project_id,input: JSON.stringify(this.detailData3)}
        const addInDetail3 = await contTempCate.addInDetail(params3)
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss'
</style>

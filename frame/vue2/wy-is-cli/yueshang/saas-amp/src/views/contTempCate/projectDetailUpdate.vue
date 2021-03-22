<template>
  <div class="list-page">
    <!--[返回上一页 start]-->
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <el-button @click="toBackPage" size="mini" type="info">返回</el-button>
      </el-col>
    </el-row>
    <!--[返回上一页 end]-->

    <!--[项目详情编辑表 start]-->
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
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.project_name" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="market_research_name"
        label="所属市调">
        <template slot-scope="scope">
          <el-input v-show="true" disabled size="mini" v-model="scope.row.market_research_name" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="distance"
        label="距离项目(公里)">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.distance" v-filter-check-number placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="position"
        label="位置">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.position" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        label="开业年限">
        <template slot-scope="scope">
          <el-date-picker
            style="width: 100%;"
            v-show="true"
            :disabled="detailInput"
            size="mini"
            v-model="scope.row.open_year"
            value-format="yyyy"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="store_situation"
        label="商铺现状">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.store_situation" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="dimension"
        label="项目体量(m²)">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.dimension" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="commercial_area"
        label="商业面积(m²)">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="detailInput" size="mini" v-model="scope.row.commercial_area" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column
        prop="rent_avg"
        label="非主力店平均租金">
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="avgDis" size="mini" v-model="scope.row.rent_avg" placeholder="0.00" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        width="220"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="project_id" @click="detailUpdate(0)" type="warning" size="mini">编辑</el-button>
          <el-button @click="detailUpdate(1,scope.row)" type="primary" size="mini">保存</el-button>
          <el-button @click="detailUpdate(2)" type="danger" size="mini" style="background: #f56c6c; border-color: #f56c6c;">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--[项目详情编辑表 end]-->

    <!--[非主力店品牌 start]-->
    <el-tag class="font-c-w" style="border-radius: 4px 4px 0 0; color: #0f96ff; font-weight: bold;">非主力店</el-tag>
    <el-table
      :data="detailData2"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      :span-method="arraySpanMethod"
      size="small"
      class="mg-b20"
      style="width: 100%;">
      <el-table-column
        label="商铺基础信息">
        <el-table-column
          prop="floor"
          label="楼层">
          <template slot-scope="scope">
            <el-button v-if="scope.row.floor === '快速创建'" type="primary" size="mini" @click="addProjectDetail(0)">{{scope.row.floor}} +</el-button>
            <el-select v-else v-model="scope.row.floor" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" placeholder="请选择">
              <el-option
                v-for="item in floorList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="brand_name"
          label="品牌名称">
          <template slot-scope="scope">
            <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.brand_name" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column
          prop="layout"
          width="220"
          label="业态">
          <template slot-scope="scope">
            <el-cascader :options="layoutList" v-model="scope.row.layout" size="mini" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" clearable></el-cascader>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
          label="商铺商务条件">
          <el-table-column
            prop="inner_area"
            width="120"
            label="面积(套内/m²)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.inner_area" v-filter-check-number placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="rent_univalent"
            width="140"
            label="租金单价(元/m²/月)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.rent_univalent" v-filter-check-number placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="rent_month_amount"
            label="月固定租金">
            <template slot-scope="scope">
              <el-input v-show="true" disabled size="mini" v-model="scope.row.rent_month_amount" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="increasing_principle"
            label="租金递增原则">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.increasing_principle" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="decoration_free_period"
            label="装修免租期">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.decoration_free_period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="operating_free_period"
            label="经营免租期">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.operating_free_period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="management_fee"
            width="120"
            label="物管费(元/m²/月)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-filter-check-number v-model="scope.row.management_fee" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="period"
            label="合同期限">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            width="220"
            label="操作">
            <template slot-scope="scope" v-if="scope.row.floor !== '快速创建'">
              <el-button @click="detailAdd(0,scope.row)" type="warning" size="mini">编辑</el-button>
              <el-button @click="detailAdd(1,scope.row,0)" type="primary" size="mini">保存</el-button>
              <el-button @click="detailAdd(2,scope.row,scope.$index,detailData2)" type="danger" size="mini" style="background: #f56c6c; border-color: #f56c6c;">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
    </el-table>
    <!--[非主力店品牌 end]-->

    <!--[主力店品牌 start]-->
    <el-tag class="font-c-w" style="border-radius: 4px 4px 0 0; color: #0f96ff; font-weight: bold;">主力店</el-tag>
    <el-table
      :data="detailData3"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      :span-method="arraySpanMethod"
      size="small"
      class="mg-b20"
      style="width: 100%;">
      <el-table-column
        label="商铺基础信息">
        <el-table-column
          prop="floor"
          label="楼层">
          <template slot-scope="scope">
            <el-button v-if="scope.row.floor === '快速创建'" type="primary" size="mini" @click="addProjectDetail(1)">{{scope.row.floor}} +</el-button>
            <el-select v-else v-model="scope.row.floor" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" placeholder="请选择">
              <el-option
                v-for="item in floorList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="brand_name"
          label="品牌名称">
          <template slot-scope="scope">
            <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.brand_name" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column
          prop="layout"
          width="220"
          label="业态">
          <template slot-scope="scope">
            <el-cascader :options="layoutList" v-model="scope.row.layout" size="mini" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" clearable></el-cascader>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
          label="商铺商务条件">
          <el-table-column
            prop="inner_area"
            width="120"
            label="面积(套内/m²)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model.trim="scope.row.inner_area" v-filter-check-number placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="rent_univalent"
            width="140"
            label="租金单价(元/m²/月)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model.trim="scope.row.rent_univalent" v-filter-check-number placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="rent_month_amount"
            label="月固定租金">
            <template slot-scope="scope">
              <el-input v-show="true" disabled size="mini" v-model="scope.row.rent_month_amount" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="increasing_principle"
            label="租金递增原则">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.increasing_principle" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="decoration_free_period"
            label="装修免租期">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.decoration_free_period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="operating_free_period"
            label="经营免租期">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.operating_free_period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="management_fee"
            width="120"
            label="物管费(元/m²/月)">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-filter-check-number v-model="scope.row.management_fee" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            prop="period"
            label="合同期限">
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row.period" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            width="220"
            label="操作">
            <template slot-scope="scope" v-if="scope.row.floor !== '快速创建'">
              <el-button @click="detailAdd(0,scope.row)" type="warning" size="mini">编辑</el-button>
              <el-button @click="detailAdd(1,scope.row,1)" type="primary" size="mini">保存</el-button>
              <el-button @click="detailAdd(2,scope.row,scope.$index,detailData3)" type="danger" size="mini" style="background: #f56c6c; border-color: #f56c6c;">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
    </el-table>
    <!--[主力店品牌 end]-->
  </div>
</template>

<script>
import { handlePaginator,tableRowStyle,tableHeaderColor } from "@mixins"
import contTempCate from '@apis/contTempCate'
import { validateNameInput, NumberCheck} from '@/utils/validate'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      detailData: [],
      detailDataSon: {project_name:'',market_research_name:'',distance:'',position:'',open_year:'',store_situation:'',dimension:'',commercial_area:''},
      detailData2: [],
      detailData2Son:{floor:'',brand_name:'',layout:'',inner_area:'',rent_univalent:'',rent_month_amount:'',increasing_principle:'',decoration_free_period:'',
        operating_free_period:'',management_fee:'',period:'',type:2,detailInput: false,new_add: true},
      detailData3: [],
      detailData3Son:{floor:'',brand_name:'',layout:'',inner_area:'',rent_univalent:'',rent_month_amount:'',increasing_principle:'',decoration_free_period:'',
        operating_free_period:'',management_fee:'',period:'',type:1,detailInput: false,new_add: true},
      detailDataSave: true,
      // input框失焦校验
      rules: {
        project_name: [{ validator: validateNameInput, trigger: 'blur' }],
        market_research_name: [{ validator: validateNameInput, trigger: 'blur' }],
      },
      detailInput: false, // 项目详情input readonly
      project_id: null, // 项目ID
      market_id: null, // 市调ID
      floorList: [], // 楼层列表
      layoutList: [], // 业态列表 一级列表
      layoutListSec: [], // 业态列表 二级列表
      layoutListThird: [], // 业态列表 三级列表
      openYear: '', // 开业年限
      avgDis: true, // 非主力店平均租金默认不可编辑
    }
  },
  created () {
    this.market_id = this.$route.query.market_id
    this.project_id = this.$route.query.project_id
    if (this.market_id) {
      this.market_name = this.$route.query.market_name
      this.detailDataSon.market_research_name = this.market_name
      this.detailData.push(this.detailDataSon)
    }
    this.detailData2.unshift({floor:"快速创建"})
    this.detailData3.unshift({floor:"快速创建"})
  },
  methods: {
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0){
          return [1, 11];
        } else if (columnIndex === 11) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
    },
    // 初始化数据，获取项目详情
    async getList () {
      // 获取项目详情
      this.selectProjectById()

      // 获取楼层列表
      const floor = await contTempCate.getFloorList({})
      if (floor.code === 200){
        this.floorList = floor.result || []
      }
      // 获取业态列表
      const layout = await contTempCate.getLayoutList({})
      if (layout.code === 200){
        this.layoutList = layout.result || []
      }

      // 获取主力店/非主力店数据列表
      const projectList = await contTempCate.selectProjectDetailsById({project_id: this.project_id})
      if (projectList.code === 200){
        if (projectList.result.no_main && this.detailData2.length === 1) {
          this.detailData2 = this.detailData2.concat(projectList.result.no_main)
        }
        if (projectList.result.main && this.detailData3.length === 1) {
          this.detailData3 = this.detailData3.concat(projectList.result.main)
        }
      }
    },
    async selectProjectById () {
      const res = await contTempCate.selectProjectById({project_id: this.project_id})
      if (res.code === 200 && res.result){
        this.detailData = []
        this.detailData.push(res.result)
      }
    },
    // 编辑项目详情
    async updateProjectDetail (row) {
      row.project_id = this.project_id
      const res = await contTempCate.updateProjectDetail(row)
      if (res.code === 200){
      }
    },
    tableRowStyle,
    tableHeaderColor,
    // 项目详情编辑、保存、取消
    detailUpdate(type,row){
      if (type === 0){
        this.detailInput = false
      }else{
        this.detailInput = true
        if (type === 2) {
          this.getList()
        }
      }
      // 保存项目详情
      if (type === 1){
        const { project_name = '' } = this.detailDataSon
        if (!this.project_id){
          if (!project_name.trim()) {
            this.$message.error('请填写项目名称')
            this.detailInput = false
            return false
          }
          this.addProjectById(row)
        }else{
          this.updateProjectDetail(row)
        }
      }
    },
    // 项目列表编辑、保存、删除
    detailAdd(type, row, index, rows){
      if (type === 0){
        row.detailInput = false
      }else{
        row.detailInput = true
      }
      // 保存
      if (type === 1){
        // index = 0非主力店 1主力店
        if (this.detailData2[1] && !this.detailData2[1].floor && !this.detailData2[1].layout && index === 0) {
          this.$message.error('请选择楼层或业态')
          row.detailInput = false
          return false
        }
        if (this.detailData3[1] && !this.detailData3[1].floor && !this.detailData3[1].layout && index === 1) {
          this.$message.error('请选择楼层或业态')
          row.detailInput = false
          return false
        }
        if (row.id) {
          this.updateProjectListDetail(row)
        }else{
          this.addProject(row)
        }
      }
      // 删除行
      if (type === 2){
        // index 为数据下标
        this.detailDataSave = true
        if (row.new_add) {
          this.deleteRow(index, rows)
        }else{
          this.$confirm('确认要删除吗？').then(() => {
            this.delProjectListDetail(row, index, rows)
          }).catch(() => {

          })
        }
      }
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 添加详情数据-预添加
    addProjectDetail(type){
      if (!this.project_id) {
        return this.$message.error("请先创建项目")
      }
      if (!this.detailDataSave){
        return this.$message.error("请先保存数据")
      }
      this.detailDataSave = false
      if (type === 1) {
        this.detailData3.shift()
        this.detailData3.unshift({...this.detailData3Son})
        this.detailData3.unshift({floor:"快速创建"})
      } else {
        this.detailData2.shift()
        this.detailData2.unshift({...this.detailData2Son})
        this.detailData2.unshift({floor:"快速创建"})
      }
    },
    // 新增项目数据
    async addProject(row){
      row.project_id = this.project_id
      if (!this.project_id) {
        return
      }
      const res = await contTempCate.addProjectDetail(row)
      if (res.code === 200){
        row.id = res.result.id
      }
      this.detailDataSave = true
    },
    // 更新项目详情列表
    async updateProjectListDetail(row){
      row.project_detail_id = row.id
      const res = await contTempCate.updateProjectListDetail(row)
      if (res.code === 200){

      }
      this.detailDataSave = true
    },
    // 更新项目详情列表
    async delProjectListDetail(row, index, rows){
      const res = await contTempCate.delProjectListDetail({project_detail_id:row.id})
      if (res.code === 200){
        this.deleteRow(index, rows)
        this.$message.success("删除成功")
      }
      this.detailDataSave = true
    },
    NumberCheck,
    // 新增项目
    async addProjectById(row){
      row.market_research_id = this.market_id
      const res = await contTempCate.addProjectById(row)
      if (res.code === 200){
        this.project_id = res.result.id
        // this.$router.go(-1)
      }else{
        this.detailInput = false
      }
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    detailData2: {
      handler(newV, oldV){
        newV.forEach(item => {
          if (item.inner_area && item.rent_univalent){
            let area2 = Math.round((item.inner_area * item.rent_univalent) * 100) / 100
            if (area2.toString().indexOf('.') < 0) {
              area2 += '.00'
            }
            item.rent_month_amount = area2
          }
        })
      },
      deep: true
    },
    detailData3: {
      handler(newV, oldV){
        newV.forEach(item => {
          if (item.inner_area && item.rent_univalent){
            let area3 = Math.round((item.inner_area * item.rent_univalent) * 100) / 100
            if (area3.toString().indexOf('.') < 0) {
              area3 += '.00'
            }
            item.rent_month_amount = area3
          }
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss'
</style>

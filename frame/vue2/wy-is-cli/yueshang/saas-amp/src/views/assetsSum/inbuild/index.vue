<template>
  <!-- 资产汇总-在建资产 -->
  <div class="page">
    <div class="list-page">
      <!-- <el-row class="tool-bar" style="padding: 0;" type="flex" justify="space-between" align="middle">
       <el-col>
         <div class="bar-d">
            <span style="width:70px; font-size: 12px; display: inline-block;">范围：</span>
            <el-button @click="openRange" size="mini" type="success">选择范围</el-button>
          </div>
        </el-col>
      </el-row> -->
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col class="colcol">
          <div style="width: 365px;">
            <el-cascader
              v-model="rangL"
              placeholder="选择范围"
              :options="RangeList"
              :props="props"
              collapse-tags
              size="mini"
              clearable
              @change="rangChange"
              style="width: 100%;">
            </el-cascader>
          </div>
          <div>
            <el-select placeholder="汇总业态" size="mini" v-model="query.layout" @change="getList" multiple collapse-tags filterable clearable>
              <el-option
                v-for="(item, index) in layoutList"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="oneBtn">
            <el-select placeholder="自持/可售" size="mini" v-model="query.marketing_type" @change="getList" multiple collapse-tags clearable >
              <el-option label="自持" value="0"></el-option>
              <el-option label="可售" value="1"></el-option>
            </el-select>
            <el-button @click="reset" size="mini">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table ref="table" :data="tableData" size="mini" :span-method="objectSpanMethod" :max-height="tableHeight" :cell-class-name="cellClassFn">
        <el-table-column width="100" label="汇总业态" prop="layout" align="center">
        </el-table-column>
        <el-table-column label="面积(㎡)" align="center" class-name="merge-bottom-border">
          <el-table-column label="汇总" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.sum == null ? '0' : scope.row.sum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="100%股权并操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_1 == null ? '0' : scope.row.area_1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部分股权并操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_2 == null ? '0' : scope.row.area_2 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部分股权不操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_3 == null ? '0' : scope.row.area_3 }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="无股权仅操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_4 == null ? '0' : scope.row.area_4 }}</span>
            </template>
          </el-table-column> -->
        </el-table-column>
        <el-table-column width="100" label="资产类别">
          <template slot-scope="scope">
            <span v-if="scope.row.marketing_type == 0">自持</span>
            <span v-if="scope.row.marketing_type == 1">可售</span>
          </template>
        </el-table-column>
        <el-table-column width="150" label="资产类别面积(㎡)" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.area == null ? '0' : scope.row.area }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 选择范围 -->
      <select-range :dialogVisible="dialogVisible" @close="closeRange"></select-range>

    </div>
  </div>

</template>

<script>
import SelectRange from './select-range'
import { toThousands } from '@utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
export default {
  components: {
    SelectRange,
  },
  data() {
    return {
      props: { multiple: true },
      query: {
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        layout: [], // 汇总业态
        marketing_type: []
      },
      tableData: [],
      layoutList: [],// 业态列表选项列表
      dialogVisible: false,
      sydata: [],
      RangeList: [],
      rangL: [],
      tableHeight: null,
    }
  },
  watch: {},
  created() {
    this.getDownList()
    this.getList()
  },
  mounted() {
  },
  methods: {
    // 资产汇总下拉数据
    getDownList() {
      AssetsSum.dropDown().then(res => {
        if(res.code === 200 && res.result){
          this.layoutList = res.result.layout
          const division = []
          res.result.estate_devlop_division.forEach(item => {
            division.push({value: item, label: item})
          })
          const company = []
          res.result.business_area_company.forEach(item => {
            company.push({value: item, label: item})
          })
          const city = []
          res.result.city.forEach(item => {
            city.push({value: item, label: item})
          })
          this.RangeList = [
            {
              label: '地产开发事业部',
              value: 111,
              children: division
            },
            {
              label: '委托管理公司',
              value: 222,
              children: company
            },
            {
              label: '城市',
              value: 333,
              children: city
            }
          ]
        }
      })
    },
    rangChange(data) {
      console.log("rang-data:",data)
      console.log("rangL===",this.rangL)
      this.query.estate_devlop_division = []
      this.query.business_area_company = []
      this.query.city = []
      data.forEach(item => {
        if(item[0] === 111){
          this.query.estate_devlop_division.push(item[1])
        }else if(item[0] === 222){
          this.query.business_area_company.push(item[1])
        }else if(item[0] === 333){
          this.query.city.push(item[1])
        }
      })
      this.getList()
    },
    async getList() {
      const params = {
        ...this.query
      }
      await AssetsSum.find_inbuild(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result
          let newLayout = []
          let newLayoutSum = 0
          for (let key in this.tableData) {
            newLayout.push(this.tableData[key].layout)
          }
          this.newLayoutList = Array.from(new Set(newLayout))
          this.newLayoutListNum = []
          this.newLayoutListIndex = []
          for (let key in this.newLayoutList) {
            this.sydata = this.tableData.filter(item => {
              return item.layout === this.newLayoutList[key]
            })
            this.newLayoutListNum.push(this.sydata.length)
            newLayoutSum += this.newLayoutListNum[key]
            this.newLayoutListIndex.push(newLayoutSum)
          }
          this.newLayoutListIndex.unshift(0)
          this.tableHeight = document.documentElement.clientHeight - 160
        }
        if(res.code === 3001 || res.result.length === 0){
          this.$message.error('需要在类型配置中编辑 “经营期操盘类型”')
          // setTimeout( () => {
          //   this.$message('需要在类型配置中编辑 “经营期操盘类型”', '提示', {
          //     confirmButtonText: '确定',
          //     callback: action => {
          //     }
          //   })
          // }, 500)
        }
      })
    },
    reset() {
      this.query = {
        ...this.query,
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        layout: null,
        marketing_type: null
      }
      this.rangL = []
      this.getList()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex <= 4) {
        for (let key in this.newLayoutList) {
          if (row.layout === this.newLayoutList[key]) {
            if (key == 0) {
              if (rowIndex === 0) {
                return {
                  rowspan: this.newLayoutListNum[key],
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            } else {
              if (rowIndex === this.newLayoutListIndex[key]) {
                return {
                  rowspan: this.newLayoutListNum[key],
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }
    },
    cellClassFn({row, column, rowIndex, columnIndex}) {
      if(columnIndex <= 4) {
        return "boderTdName"
      }
      for (let key in this.newLayoutList) {
        if (row.layout === this.newLayoutList[key]) {
          if(rowIndex+1 === this.newLayoutListIndex[Number(key)+1]) {
            return "boderTdName"
          }
        }
      }
    },
    openRange() {
      this.dialogVisible = true
    },
    closeRange(res) {
      this.query = {
        ...this.query,
        estate_devlop_division: res.estate_devlop_division,
        business_area_company: res.business_area_company,
        city: res.city
      }
      this.dialogVisible = false
      this.getList()
    },
  },
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
    },
    formatVal(val) {
      return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : ''
    },
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import '~@styles/common.scss';
::v-deep td.boderTdName{
  border-bottom: 1px solid #F2F4F6;
}
</style>

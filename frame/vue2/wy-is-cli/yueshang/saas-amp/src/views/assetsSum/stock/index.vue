<template>
  <!-- 资产汇总-存量资产 -->
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
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
        <el-col class="colcol">
          <div style="width: 365px;">
            <el-cascader
              style="width: 100%;"
              v-model="rangL"
              placeholder="选择范围"
              :options="RangeList"
              :props="props"
              collapse-tags
              size="mini"
              clearable
              @change="rangChange">
            </el-cascader>
          </div>
          <div>
            <el-select placeholder="汇总业态" size="mini" v-model="query.layout" @change="getList" multiple collapse-tags filterable clearable>
              <el-option
                v-for="item in layoutList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
<!--          <div>-->
<!--              <el-select placeholder="有产证/无产证" size="mini" v-model="query.status_one" @change="getList" multiple collapse-tags clearable >-->
<!--              <el-option-->
<!--                v-for="item in status_oneList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--          <div>-->
<!--            <el-select placeholder="自持/可售" size="mini" v-model="query.status_two" @change="getList" multiple collapse-tags clearable>-->
<!--              <el-option-->
<!--                v-for="item in status_twoList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--          <div>-->
<!--            <el-select placeholder="在售/已售" size="mini" v-model="query.status_three" @change="getList" multiple collapse-tags clearable>-->
<!--              <el-option-->
<!--                v-for="item in status_threeList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--          <div>-->
<!--            <el-select placeholder="可租/不可租/短期自持" size="mini" v-model="query.status_four" @change="getList" multiple collapse-tags clearable >-->
<!--              <el-option-->
<!--                v-for="item in status_fourList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--          <div>-->
<!--            <el-select placeholder="已租/未租" size="mini" v-model="query.status_five" @change="getList" multiple collapse-tags clearable >-->
<!--              <el-option-->
<!--                v-for="item in status_fiveList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--          <div>-->
<!--            <el-select placeholder="出租/经营/自用" size="mini" v-model="query.status_six" @change="getList" multiple collapse-tags clearable>-->
<!--              <el-option-->
<!--                v-for="item in status_sixList"-->
<!--                :key="item.type_config_id"-->
<!--                :label="item.name"-->
<!--                :value="item.type_config_id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
          <div class="oneBtn">
            <el-date-picker
              v-model="query.report_time"
              @change="getList"
              type="month"
              size="mini"
              value-format="yyyy-MM"
              placeholder="报表时间">
            </el-date-picker>
            <el-button @click="reset" size="mini">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table ref="table" :data="tableData" size="mini" :span-method="objectSpanMethod" :max-height="tableHeight" :cell-class-name="cellClassFn">
        <el-table-column  fixed width="100" label="汇总业态" prop="layout_name" align="center">
        </el-table-column>
        <el-table-column class-name="merge-bottom-border" label="面积/套数(㎡/个)" align="center">
          <el-table-column label="汇总" align="right">
            <template slot-scope="scope">
              <span v-if="permission.indexOf('zchz_details') > -1" class="ys-text-blue c_p" @click="openDetail(scope.row.layout)">{{ scope.row.sum_area == null ? '0' : scope.row.sum_area }}/{{(scope.row.sum_apartment_num == null ? '0' : scope.row.sum_apartment_num) | formatDotVal }}</span>
              <span v-else>{{ scope.row.sum_area == null ? '0' : scope.row.sum_area }}/{{(scope.row.sum_apartment_num == null ? '0' : scope.row.sum_apartment_num) | formatDotVal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="100%股权并操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_1 == null ? '0' : scope.row.area_1 }}/{{(scope.row.apartment_num_1 == null ? '0' : scope.row.apartment_num_1) | formatDotVal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部分股权并操盘" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.area_2 == null ? '0' : scope.row.area_2 }}/{{(scope.row.apartment_num_2 == null ? '0' : scope.row.apartment_num_2) | formatDotVal }}</span>
            </template>
          </el-table-column>
<!--          <el-table-column label="部分股权不操盘" align="right">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{ scope.row.area_3 == null ? '0' : scope.row.area_3 }}/{{(scope.row.apartment_num_3 == null ? '0' : scope.row.apartment_num_3) | formatDotVal }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <!-- <el-table-column label="无股权仅操盘" align="right">
            <template slot-scope="scope">
              <span class="ys-text-blue c_p" @click="openDetail(scope.row.layout)">{{ scope.row.area_4 == null ? '0' : scope.row.area_4 }}/{{ scope.row.apartment_num_4 == null ? '0' : scope.row.apartment_num_4 }}</span>
            </template>
          </el-table-column> -->
        </el-table-column>
<!--        <el-table-column width="260" label="资产类别">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.layout == 1" class="detail-span" @click="openDetailRow(scope.row)">-->
<!--              <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>-->
<!--            </div>-->
<!--            <div v-if="scope.row.layout == 2" class="detail-span" @click="openDetailRow(scope.row)">-->
<!--              <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_six_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_six_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_six_name">{{ scope.row.status_six_name }}<span v-if="scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>-->
<!--            </div>-->
<!--            <div v-if="scope.row.layout == 3" class="detail-span" @click="openDetailRow(scope.row)">-->
<!--              <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>-->
<!--            </div>-->
<!--            <div v-if="scope.row.layout == 4" class="detail-span" @click="openDetailRow(scope.row)">-->
<!--              <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>-->
<!--              <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>-->
<!--            </div>-->
<!--            <div v-if="scope.row.layout == 5" class="detail-span" @click="openDetailRow(scope.row)">-->
<!--              <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name">：</span></span>-->
<!--              <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name">：</span></span>-->
<!--              <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="资产类别" align="center" class-name="merge-bottom-border">-->
<!--          <el-table-column label="面积(㎡)" align="right">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{ scope.row.area == null ? '0' : scope.row.area }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="套数(个)" align="right">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{(scope.row.apartment_num == null ? '0' : scope.row.apartment_num) | formatDotVal }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table-column>-->
      </el-table>

      <!-- 选择范围 -->
      <select-range :dialogVisible="dialogVisible" @close="closeRange"></select-range>

      <!-- 资产明细 -->
      <detail :open="fast" :layout="layout" :row="detailRow" :rang="rangL" :date="query.report_time" @close="closeFast"></detail>

    </div>
  </div>

</template>

<script>
import SelectRange from './select-range'
import Detail from './detail'
import { toThousands } from '@utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
export default {
  components: {
    SelectRange,
    Detail
  },
  data () {
    return {
      props: { multiple: true },
      query: {
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        layout: [], // 汇总业态
        status_one: [],
        status_two: [],
        status_three: [],
        status_four: [],
        status_five: [],
        status_six: [],
        report_time: new Date().format('yyyy-MM') // new Date().format('yyyy-MM')
      },
      RangeList: [],
      rangL: [],
      tableData: [],
      status_oneList: [],
      status_twoList: [],
      status_threeList: [],
      status_fourList: [],
      status_fiveList: [],
      status_sixList: [],
      layoutList: [
        {
          value: 1,
          label: '商业'
        },
        {
          value: 2,
          label: '酒店'
        },
        {
          value: 3,
          label: '办公'
        },
        {
          value: 4,
          label: '公寓'
        },
        {
          value: 5,
          label: '车库'
        }
      ],
      dialogVisible: false,
      fast: false,
      layout: null, // 大业态
      detailRow: null,
      sydata: [],
      tableHeight: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  created () {
    this.getLastTime()
    this.getDownList()
    this.getTypeList()
    // 调用存量项目、在建项目同步接口
    this.synch()
    this.synchCL()
  },
  mounted () {
  },
  methods: {
    // 获取有数据最近月份
    getLastTime () {
      AssetsSum.getLastTime().then(res => {
        if (res.code === 200) {
          if (res.result) {
            this.query.report_time = res.result.report_time // res.result.report_time
          } else {
            this.query.report_time = new Date().format('yyyy-MM') // new Date().format('yyyy-MM')
          }
        }
        this.getList()
      })
    },
    // 资产汇总下拉数据
    getDownList () {
      AssetsSum.dropDown().then(res => {
        if (res.code === 200 && res.result) {
          console.log('res.result====DDD:', res.result)
          const division = []
          res.result.estate_devlop_division.forEach(item => {
            division.push({ value: item, label: item })
          })
          const company = []
          res.result.business_area_company.forEach(item => {
            company.push({ value: item, label: item })
          })
          const city = []
          res.result.city.forEach(item => {
            city.push({ value: item, label: item })
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
    rangChange (data) {
      console.log('rang-data:', data)
      console.log('rangL===', this.rangL)
      this.query.estate_devlop_division = []
      this.query.business_area_company = []
      this.query.city = []
      data.forEach(item => {
        if (item[0] === 111) {
          this.query.estate_devlop_division.push(item[1])
        } else if (item[0] === 222) {
          this.query.business_area_company.push(item[1])
        } else if (item[0] === 333) {
          this.query.city.push(item[1])
        }
      })
      this.getList()
    },
    // 获取分项列表
    getTypeList () {
      TypeApi.typeDropDown().then(res => {
        if (res.code === 200 && res.result) {
          this.status_oneList = res.result.status_one
          this.status_twoList = res.result.status_two
          this.status_threeList = res.result.status_three
          this.status_fourList = res.result.status_four
          this.status_fiveList = res.result.status_five
          this.status_sixList = res.result.status_six
        }
      })
    },
    estate_devlop_divisionChange (val) {
      console.log(val)
    },
    async getList () {
      if (!this.query.report_time) return this.$message.error('请选择报表日期')
      const params = {
        ...this.query
      }
      await AssetsSum.find_stock(params).then(res => {
        if (res.code === 200 && res.result) {
          this.tableData = res.result
          const newLayout = []
          let newLayoutSum = 0
          for (const key in this.tableData) {
            newLayout.push(this.tableData[key].layout)
          }
          this.newLayoutList = Array.from(new Set(newLayout))
          this.newLayoutListNum = []
          this.newLayoutListIndex = []
          for (const key in this.newLayoutList) {
            this.sydata = this.tableData.filter(item => {
              return item.layout === this.newLayoutList[key]
            })
            this.newLayoutListNum.push(this.sydata.length)
            newLayoutSum += this.newLayoutListNum[key]
            this.newLayoutListIndex.push(newLayoutSum)
          }
          this.newLayoutListIndex.unshift(0)
          this.tableHeight = document.documentElement.clientHeight - 198
        }
      })
    },
    reset () {
      this.query = {
        ...this.query,
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        layout: null,
        status_one: null,
        status_two: null,
        status_three: null,
        status_four: null,
        status_five: null,
        status_six: null
      }
      this.rangL = []
      this.getList()
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 4) {
        for (const key in this.newLayoutList) {
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
    cellClassFn ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 4) {
        return 'boderTdName'
      }
      for (const key in this.newLayoutList) {
        if (row.layout === this.newLayoutList[key]) {
          if (rowIndex + 1 === this.newLayoutListIndex[Number(key) + 1]) {
            return 'boderTdName'
          }
        }
      }
    },
    openRange () {
      this.dialogVisible = true
    },
    closeRange (res) {
      this.query = {
        ...this.query,
        estate_devlop_division: res.estate_devlop_division,
        business_area_company: res.business_area_company,
        city: res.city
      }
      this.dialogVisible = false
      this.getList()
    },
    openDetail (layout) {
      this.layout = layout
      this.detailRow = null
      this.fast = true
    },
    openDetailRow (row) {
      this.layout = row.layout
      this.detailRow = row
      this.fast = true
    },
    closeFast (res) {
      this.fast = res.fast
      this.layout = null
      this.detailRow = null
    },
    // 同步
    synch () {
      // 在建
      TypeApi.synch(null, { success: false, error: false }).then(res => {

      })
    },
    synchCL () {
      // 存量
      TypeApi.synchCL(null, { success: false, error: false }).then(res => {

      })
    }
  },
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time + '000')).format('yyyy-MM-dd') : ''
    },
    formatDotVal (val) {
      return toThousands(val) && toThousands(val) !== '0.00' ? toThousands(val).split('.')[0] : '0'
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import '~@styles/common.scss';
.detail-span {
  > span {
    color: #1890FF;
    cursor: pointer;
  }
}
::v-deep td.boderTdName{
  border-bottom: 1px solid #F2F4F6;
}

</style>

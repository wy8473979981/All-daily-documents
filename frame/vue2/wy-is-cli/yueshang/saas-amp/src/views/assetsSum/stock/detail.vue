<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="95%">
      <div class="dialog-close-icon" @click="cancel" >
        <i></i>
      </div>
      <div class="table-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>资产明细</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con" style="padding: 20px;">
          <el-row type="flex" justify="space-between" align="middle" style="flex-flow: wrap; padding-bottom: 20px;">
            <el-col :span="24" style="display: flex; align-items: center;">
              <el-cascader
                style="margin-right: 10px;width: 260px;"
                v-model="ranglDetail"
                placeholder="选择范围"
                :options="RangeList"
                :props="props"
                collapse-tags
                size="mini"
                clearable
                @change="rangChange">
              </el-cascader>
              <el-select v-if="layout != 4" placeholder="有产证/无产证" v-model="info.status_one" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_oneList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
              <el-select placeholder="自持/可售" v-model="info.status_two" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_twoList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
              <el-select v-if="layout != 2" placeholder="在售/已售" v-model="info.status_three" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_threeList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
              <el-select v-if="layout == 1 || layout == 3 || layout == 4" placeholder="可租/不可租/短期自持" v-model="info.status_four" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_fourList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
              <el-select v-if="layout != 5" placeholder="已租/未租" v-model="info.status_five" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_fiveList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
              <el-select v-if="layout == 2" placeholder="出租/经营/自用" v-model="info.status_six" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="mini">
                <el-option
                  v-for="item in status_sixList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table ref="table" :data="tableData_detail" size="mini" header-row-class-name="table-header" :max-height="tableHeight" border>
            <el-table-column fixed min-width="120" label="项目名称" show-overflow-tooltip prop="project_name" align="center">
            </el-table-column>
            <el-table-column min-width="80" label="报表时间" prop="report_time" align="center">
            </el-table-column>
            <el-table-column min-width="120" label="业态" show-overflow-tooltip prop="layout">
            </el-table-column>
            <el-table-column width="280" label="资产类别">
              <template slot-scope="scope">
                <div v-if="layout == 1">
                  <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                </div>
                <div v-if="layout == 2">
                  <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_six_name">{{ scope.row.status_six_name }}<span v-if="scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                </div>
                <div v-if="layout == 3">
                  <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                </div>
                <div v-if="layout == 4">
                  <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                  <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                </div>
                <div v-if="layout == 5">
                  <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name">：</span></span>
                  <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name">：</span></span>
                  <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="150" label="铺位号" show-overflow-tooltip prop="store_no">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="60" label="楼层" prop="floor" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 4" min-width="120" label="公寓楼号" prop="apartment_no" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 1 || layout == 4" min-width="150" label="产证编号" show-overflow-tooltip prop="dev_code_no" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 3" min-width="110" label="办公楼号" prop="building_no" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 3 || layout == 4" width="100" label="房间号" show-overflow-tooltip prop="room_no" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 3 || layout == 4" min-width="70" label="套数(个)" prop="apartment_num" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 5" min-width="120" label="个数" prop="number" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 2" min-width="120" label="房间数" prop="room_num" align="right">
            </el-table-column>
            <el-table-column min-width="90" label="建筑面积(㎡)" prop="build_area" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="90" label="套内面积(㎡)" prop="inner_area" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="90" label="计租面积(㎡)" prop="rented_area" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="90" label="租金收入(元)" prop="rent_income" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="105" label="物管费收入(元)" prop="property_management_fee" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="105" label="租赁合同起租日" prop="rent_contract_begin" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 1" min-width="105" label="租赁合同终止日" prop="rent_contract_end" align="center">
            </el-table-column>
            <el-table-column v-if="layout == 2 || layout == 3" min-width="130" label="本月实际总收入(元)" prop="month_real_rent" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 2" min-width="140" label="本月实际业主利润(元)" prop="month_owner_profit" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 3 || layout == 4" min-width="140" label="本月实际租金单价(元)" prop="month_rent_unit_price" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 3 || layout == 4" min-width="80" label="出租率(%)" prop="rent_rate" align="right">
            </el-table-column>
            <el-table-column v-if="layout == 5" min-width="120" label="当月总收入(元)" prop="month_real_rent" align="right">
            </el-table-column>
          </el-table>

          <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import TypeApi from '@/apis/apis/typeApi'
import StockAssets from '@/apis/apis/stockAssets'
export default {
  name: 'Detail',
  props: ['open', 'layout', 'row', 'date', 'rang', 'page'],
  mixins: [handlePaginator],
  data () {
    return {
      props: { multiple: true },
      info: {
        status_one: [],
        status_two: [],
        status_three: [],
        status_four: [],
        status_five: [],
        status_six: [],
        estate_devlop_division: [],
        business_area_company: [],
        city: []
      },
      status_oneList: [],
      status_twoList: [],
      status_threeList: [],
      status_fourList: [],
      status_fiveList: [],
      status_sixList: [],
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      tableData_detail: [],
      tableHeight: null,
      RangeList: [],
      ranglDetail: []
      // estate_devlop_divisionList: [], //地产开发事业部
      // business_area_companyList: [], //委托管理公司
    }
  },
  created () {
    if (sessionStorage.RangeList) {
      this.RangeList = JSON.parse(sessionStorage.RangeList)
    }
  },
  computed: {
    fast: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close', { fast: false })
      }
    }
  },
  watch: {
    page (n, o) {
      this.pageInfo.page = 1
    },
    rang (nv) {
      this.ranglDetail = nv
    },
    layout (nv, v) {
      if (nv) {
        if (!this.row) {
          this.getList()
        }
      }
    },
    row (nv, v) {
      if (nv) {
        if (this.row.status_one) {
          this.info.status_one = [this.row.status_one]
        }
        if (this.row.status_two) {
          this.info.status_two = [this.row.status_two]
        }
        if (this.row.status_three) {
          this.info.status_three = [this.row.status_three]
        }
        if (this.row.status_four) {
          this.info.status_four = [this.row.status_four]
        }
        if (this.row.status_five) {
          this.info.status_five = [this.row.status_five]
        }
        if (this.row.status_six) {
          this.info.status_six = [this.row.status_six]
        }
        this.getList()
      } else {
        this.info.status_one = []
        this.info.status_two = []
        this.info.status_three = []
        this.info.status_four = []
        this.info.status_five = []
        this.info.status_six = []
      }
    }
  },
  mounted () {
    this.getTypeList()
  },
  methods: {
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
          // this.estate_devlop_divisionList = res.result.estate_devlop_division
          // this.business_area_companyList = res.result.business_area_company
        }
      })
    },
    // 查询
    async getList () {
      console.log(this.ranglDetail)
      this.rangDataHandle(this.ranglDetail)
      const params = {
        ...this.info,
        ...this.pageInfo,
        report_time: this.date,
        type: this.layout,
        detail_type: 'total'
      }
      await StockAssets.find(params).then(res => {
        if (res.code === 200 && res.result) {
          this.tableData_detail = res.result.data.res_list
          this.pageInfo.sum_num = res.result.sum_num
          this.tableHeight = document.documentElement.clientHeight - 175
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.pageInfo.page = 1
      this.getList()
    },
    rangChange (data) {
      console.log('rang-data:', data)
      console.log('ranglDetail===', this.ranglDetail)
      this.rangDataHandle(data)
      this.getList()
    },
    rangDataHandle (data) {
      this.info.estate_devlop_division = []
      this.info.business_area_company = []
      this.info.city = []
      data.forEach(item => {
        if (item[0] === 111) {
          this.info.estate_devlop_division.push(item[1])
        } else if (item[0] === 222) {
          this.info.business_area_company.push(item[1])
        } else if (item[0] === 333) {
          this.info.city.push(item[1])
        }
      })
    },
    resetData () {
      this.info = {
        status_one: [],
        status_two: [],
        status_three: [],
        status_four: [],
        status_five: [],
        status_six: [],
        estate_devlop_division: [],
        business_area_company: [],
        city: []
      }
      this.ranglDetail = []
    },
    cancel () {
      this.resetData()
      this.$emit('close', { fast: false })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 94.35%!important;
}
.drawer-detail .con {
  // height: calc(100vh - 120px);
  > div {
    margin: 0;
  }
}
</style>

<template>
  <!-- 资产盘点系统 -->
  <div class="page">
    <div class="title-search-con">
<!--      <div class="logo-title">-->
<!--        <img src="../../../static/img/bl/bl_sy_logo.svg">-->
<!--        <h3>资产盘点系统</h3>-->
<!--      </div>-->
      <!-- 搜索条件 -->
      <div class="search-bar-con">
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
          <el-col class="colcol" :span="20" >
            <div>
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
<!--            <div>-->
<!--                <el-select placeholder="有产证/无产证" size="mini" v-model="query.status_one" @change="getList" multiple collapse-tags clearable >-->
<!--                <el-option-->
<!--                  v-for="item in status_oneList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
            <div>
              <el-select placeholder="自持/可售" size="mini" v-model="query.status_two" @change="getList" multiple collapse-tags clearable>
                <el-option
                  v-for="item in status_twoList"
                  :key="item.type_config_id"
                  :label="item.name"
                  :value="item.type_config_id">
                </el-option>
              </el-select>
            </div>
<!--            <div>-->
<!--              <el-select placeholder="在售/已售" size="mini" v-model="query.status_three" @change="getList" multiple collapse-tags clearable>-->
<!--                <el-option-->
<!--                  v-for="item in status_threeList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-select placeholder="可租/不可租/短期自持" size="mini" v-model="query.status_four" @change="getList" multiple collapse-tags clearable >-->
<!--                <el-option-->
<!--                  v-for="item in status_fourList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-select placeholder="已租/未租" size="mini" v-model="query.status_five" @change="getList" multiple collapse-tags clearable >-->
<!--                <el-option-->
<!--                  v-for="item in status_fiveList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-select placeholder="出租/经营/自用" size="mini" v-model="query.status_six" @change="getList" multiple collapse-tags clearable>-->
<!--                <el-option-->
<!--                  v-for="item in status_sixList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
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
              <el-button @click="synch" size="mini" type="success">同步</el-button>
            </div>
          </el-col>
          <el-col class="colcol" :span="4" style="text-align: right;justify-content: flex-end;margin-bottom: 5px;">
            <el-button @click="openInbuildDetailRow(2)" size="mini" type="success">未委托</el-button>
            <el-button @click="openInbuildDetailRow(1)" size="mini" type="success">未分配</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="page-con">
      <div class="list-page" style="width: 50%; min-width: 300px; border-right:1px dashed #F2F4F6;">
        <h2>在营项目</h2>
        <!-- 列表数据 -->
        <div :class="{'list-data': true,'isSafari': safari}">
          <ul>
            <li v-for="(list,i) in layoutListData" :key="i" :class="{'auto-height': list.tableShow}">
              <div class="layout" @click="toggle(list)">
                {{list.layout | getLayoutName}}
                <i :class="[list.tableShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
              </div>
              <div class="layout-con">
                <div class="data-bar">
                  <!-- 商业 -->
                  <ul v-if="list.layout == 1">
                    <li>
                      <strong>项目数(个)</strong>
                      <span>{{list.project_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.total_area | formatValue10}}</span>
                    </li>
<!--                    <li class="signW">-->
<!--                      <strong>{{query.report_time | getMonth}}月实际收入(万元)</strong>-->
<!--                      <span>{{list.income | formatValue10}}</span>-->
<!--                    </li>-->
                    <li>
                      <strong>可售(万㎡)</strong>
                      <span>{{list.sale_area | formatValue10}}</span>
                    </li>
<!--                    <li>-->
<!--                      <strong>自持(万㎡)</strong>-->
<!--                      <span>{{list.self_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>无产证(万㎡)</strong>-->
<!--                      <span>{{list.no_certificate_area |formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>已出租(万㎡)</strong>-->
<!--                      <span>{{list.rented_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>未出租(万㎡)</strong>-->
<!--                      <span class="red">{{list.not_rented_area | formatValue10}}</span>-->
<!--                    </li>-->
                  </ul>
                  <!-- 办公 -->
                  <ul v-if="list.layout == 3">
                    <li>
                      <strong>项目数(个)</strong>
                      <span>{{list.project_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.total_area | formatValue10}}</span>
                    </li>
<!--                    <li class="signW">-->
<!--                      <strong>{{query.report_time | getMonth}}月实际收入(万元)</strong>-->
<!--                      <span>{{list.income | formatValue10}}</span>-->
<!--                    </li>-->
                    <li>
                      <strong>可售(万㎡)</strong>
                      <span>{{list.sale_area | formatValue10}}</span>
                    </li>
<!--                    <li>-->
<!--                      <strong>自持(万㎡)</strong>-->
<!--                      <span>{{list.self_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>无产证(万㎡)</strong>-->
<!--                      <span>{{list.no_certificate_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>已出租(万㎡)</strong>-->
<!--                      <span>{{list.rented_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>未出租(万㎡)</strong>-->
<!--                      <span class="red">{{list.not_rented_area | formatValue10}}</span>-->
<!--                    </li>-->
                  </ul>
                  <!-- 公寓 -->
                  <ul v-if="list.layout == 4">
                    <li>
                      <strong>项目数(个)</strong>
                      <span>{{list.project_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.total_area | formatValue10}}</span>
                    </li>
<!--                    <li class="signW">-->
<!--                      <strong>{{query.report_time | getMonth}}月实际收入(万元)</strong>-->
<!--                      <span>{{list.income | formatValue10}}</span>-->
<!--                    </li>-->
                    <li>
                      <strong>可售(万㎡)</strong>
                      <span>{{list.sale_area | formatValue10}}</span>
                    </li>
<!--                    <li>-->
<!--                      <strong>自持(万㎡)</strong>-->
<!--                      <span>{{list.self_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>无产证(万㎡)</strong>-->
<!--                      <span>{{list.no_certificate_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>已出租(万㎡)</strong>-->
<!--                      <span>{{list.rented_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>未出租(万㎡)</strong>-->
<!--                      <span class="red">{{list.not_rented_area | formatValue10}}</span>-->
<!--                    </li>-->
                  </ul>
                  <!-- 车库 -->
                  <ul v-if="list.layout == 5">
                    <li>
                      <strong>总个数(万个)</strong>
                      <span>{{list.total_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.total_area | formatValue10}}</span>
                    </li>
<!--                    <li class="signW">-->
<!--                      <strong>{{query.report_time | getMonth}}月实际收入(万元)</strong>-->
<!--                      <span>{{list.income | formatValue10}}</span>-->
<!--                    </li>-->
                    <li>
                      <strong>可售(万个)</strong>
                      <span>{{list.sale_num | formatValue10}}</span>
                    </li>
<!--                    <li>-->
<!--                      <strong>自持(万个)</strong>-->
<!--                      <span>{{list.self_num | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>无产证(万个)</strong>-->
<!--                      <span>{{list.no_certificate_num | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li></li>-->
<!--                    <li></li>-->
                  </ul>
                  <!-- 酒店 -->
                  <ul v-if="list.layout == 2">
                    <li>
                      <strong>项目数(个)</strong>
                      <span>{{list.project_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.total_area | formatValue10}}</span>
                    </li>
<!--                    <li class="signW">-->
<!--                      <strong>{{query.report_time | getMonth}}月实际收入(万元)</strong>-->
<!--                      <span>{{list.income | formatValue10}}</span>-->
<!--                    </li>-->
                    <li>
                      <strong>房间数(个)</strong>
                      <span>{{list.room_num | formatValue10}}</span>
                    </li>
                    <!-- <li>
                      <strong>经营项目(个)</strong>
                      <span>{{list.manage_project_num}}</span>
                    </li>
                    <li>
                      <strong>出租项目(个)</strong>
                      <span>{{list.rent_project_num}}</span>
                    </li> -->
<!--                    <li>-->
<!--                      <strong>外租区面积(万㎡)</strong>-->
<!--                      <span>{{list.out_rent_area | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <strong>外租区收入(万元)</strong>-->
<!--                      <span>{{list.out_rent_income | formatValue10}}</span>-->
<!--                    </li>-->
<!--                    <li></li>-->
<!--                    <li></li>-->
                  </ul>
                </div>
                <el-table :class="{'close': !list.tableShow}" :data="list.details" :show-header="false" size="mini">
                  <el-table-column :width="changeWidth" label="资产类别" prop="layout">
                    <template slot-scope="scope">
                      <div v-if="scope.row.layout == 1" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 2" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_six_name">{{ scope.row.status_six_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 3" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 4" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 5" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :width="areaWidth" label="面积" prop="area">
                    <template slot-scope="scope">
                      <span>{{scope.row.area}}㎡</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" label="套数" prop="apartment_num">
                    <template slot-scope="scope">
                      <span>{{scope.row.apartment_num | formatDotVal}}个</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right"></el-table-column>
                </el-table>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-page" style="width: 50%; min-width: 300px;">
        <h2>在建项目</h2>
        <!-- 列表数据 -->
        <div :class="{'list-data': true,'isSafari': safari}">
          <ul>
            <li v-for="(list,i) in layoutInbuildListData" :key="i" :class="{'auto-height': list.tableShow}" @click="openInbuildDetailRow(list)">
              <div class="layout" style="width:180px;">
                {{list.layout}}
                <!-- <i :class="[list.tableShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i> -->
              </div>
              <div class="layout-con">
                <div class="data-bar">
                  <ul>
                    <li>
                      <strong>项目数(个)</strong>
                      <span>{{list.project_num | formatValue10}}</span>
                    </li>
                    <li>
                      <strong>总面积(万㎡)</strong>
                      <span>{{list.area | formatValue10}}</span>
                    </li>
                  </ul>
                </div>
                <!-- <el-table :class="{'close': !list.tableShow}" :data="list.details" :show-header="false" size="mini">
                  <el-table-column :width="changeWidth" label="资产类别" prop="layout">
                    <template slot-scope="scope">
                      <div v-if="scope.row.layout == 1" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 2" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_six_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_six_name">{{ scope.row.status_six_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 3" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 4" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name || scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}<span v-if="scope.row.status_four_name || scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_four_name">{{ scope.row.status_four_name }}<span v-if="scope.row.status_five_name">：</span></span>
                        <span v-if="scope.row.status_five_name">{{ scope.row.status_five_name }}</span>
                      </div>
                      <div v-if="scope.row.layout == 5" class="detail-span" @click="openDetailRow(scope.row)">
                        <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name">：</span></span>
                        <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name">：</span></span>
                        <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :width="areaWidth" label="面积" prop="area">
                    <template slot-scope="scope">
                      <span>{{scope.row.area}}㎡</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" label="套数" prop="apartment_num">
                    <template slot-scope="scope">
                      <span>{{scope.row.apartment_num | formatDotVal}}个</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right"></el-table-column>
                </el-table> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 在营资产明细 -->
    <detail :open="fast" :layout="layout" :row="detailRow" :rang="ranglDetail" :date="query.report_time" :page="page" @close="closeFast"></detail>
    <!-- 在建资产明细 -->
    <inbuild-detail :open="fastIn" :layout="layoutIn" :status_two="inbuildStatusTwo" :rang="ranglInbuildDetail" :self_type="selfType" :entrust_manage_status="entrustManageStatus" :range_list="RangeListPop" :page="page" @close="closeFast"></inbuild-detail>
  </div>
</template>

<script>
import Detail from '../assetsSum/stock/detail'
import InbuildDetail from './inbuildDetail'
import { toThousands, isSafari } from '@utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
export default {
  components: {
    Detail,
    InbuildDetail
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
      RangeListPop: [],
      rangL: [],
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
      fast: false,
      layout: null, // 大业态
      detailRow: null,
      sydata: [],
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      layoutTableData: [],
      layoutListData: [], // 在营项目数据
      layoutInbuildListData: [], // 在建项目数据
      changeWidth: '300',
      areaWidth: '120',
      fastIn: false,
      fastIn2: false,
      layoutIn: null,
      ranglInbuildDetail: [],
      inbuildStatusTwo: [],
      ranglDetail: [],
      page: 0,
      selfType: null, // 分配状态栏
      entrustManageStatus: null, // 是否签署委托协议
      safari: false
    }
  },
  watch: {},
  beforeCreate () {
    document.title = '资产盘点系统'
  },
  created () {
    // 适配safari
    if (isSafari()) {
      this.safari = true
    }

    if (window.localStorage.getItem('layoutListData')) {
      this.layoutListData = JSON.parse(window.localStorage.getItem('layoutListData'))
    }
    if (window.localStorage.getItem('layoutInbuildListData')) {
      this.layoutInbuildListData = JSON.parse(window.localStorage.getItem('layoutInbuildListData'))
    }
    this.getLastTime()
    this.getDownList()
    this.getTypeList()
  },
  mounted () {
    this.countWidth()
    window.onresize = () => {
      this.countWidth()
    }
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
          const json = Object.assign([], this.RangeList)
          this.RangeListPop = json.splice(0, 1)
          sessionStorage.RangeList = JSON.stringify(this.RangeList)
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
      this.getInbuildDataList({ ...this.query })
      if (!this.query.report_time) return this.$message.error('请选择报表日期')
      const params = {
        ...this.query
      }
      await AssetsSum.find_show_data(params).then(res => {
        console.log(res)
        if (res.code === 200 && res.result) {
          console.log(res.result)
          this.layoutListData = res.result
          window.localStorage.setItem('layoutListData', JSON.stringify(res.result))
          this.layoutListData.forEach(list => {
            this.$set(list, 'tableShow', false)
          })
        }
      })
    },
    // 在建项目数据
    getInbuildDataList (params) {
      AssetsSum.find_show_inbuild_data(params).then(res => {
        console.log(res)
        if (res.code === 200 && res.result) {
          console.log(res.result)
          if (res.result.length > 0) {
            this.layoutInbuildListData = res.result
            window.localStorage.setItem('layoutInbuildListData', JSON.stringify(res.result))
          }
          // this.layoutListData.forEach(list => {
          //   this.$set(list,"tableShow", false)
          // })
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
    openDetailRow (row) {
      console.log(row)
      this.layout = row.layout
      this.ranglDetail = this.rangL
      this.detailRow = row
      this.page++
      this.fast = true
    },
    openInbuildDetailRow (item) {
      if (item === 1) {
        this.layoutIn = null
        this.selfType = '9'
        this.entrustManageStatus = null
      } else if (item === 2) {
        this.layoutIn = null
        this.entrustManageStatus = '2'
      } else {
        this.layoutIn = item.layout
        this.selfType = null
        this.entrustManageStatus = null
      }
      this.ranglInbuildDetail = this.rangL
      this.inbuildStatusTwo = this.query.status_two
      this.page++
      this.fastIn = true
    },
    closeFast (res) {
      this.fastIn = this.fast = res.fast
      this.layoutIn = this.layout = null
      this.detailRow = null
      this.ranglDetail = []
      this.ranglInbuildDetail = []
      this.inbuildStatusTwo = []
    },
    toggle (item) {
      const restore = this.layoutListData.find(item => item.tableShow)
      if (restore && restore.project_num !== item.project_num) {
        restore.tableShow = !restore.tableShow
      }
      item.tableShow = !item.tableShow
    },
    countWidth () {
      setTimeout(() => {
        // console.log('---------')
        const node = document.querySelector('.signW')
        const bar = document.querySelector('.title-search-con')
        // console.log(bar.clientHeight)
        // console.log(document.getElementsByClassName('signW'))
        if (node) {
          // console.log(node.nextSibling)
          // console.log(node.offsetLeft)
          const left = node.offsetLeft - 120 - 15
          const left2 = node.nextSibling.offsetLeft - 120 - 15 - left
          // console.log(left, left2)
          this.changeWidth = left
          this.areaWidth = left2
        }
        if (bar) {
          const pageCon = document.querySelector('.page-con')
          pageCon.style.height = `calc(100vh - ${bar.clientHeight}px)`
        }
      }, 300)
    },
    // 同步
    async synch () {
      // 在建
      await TypeApi.synch().then(res => {
        if (res.code === 200) {
          this.synchCL()
        }
      })
    },
    async synchCL () {
      // 存量
      await TypeApi.synchCL().then(res => {
        if (res.code === 200) {
          this.getList()
        }
      })
    }
  },
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time + '000')).format('yyyy-MM-dd') : ''
    },
    formatDotVal (val) {
      return toThousands(val) && toThousands(val) !== '0.00' ? toThousands(val).split('.')[0] : '0'
    },
    formatValue10 (val) {
      // return Number(val) > 10 ? val.indexOf('.')===-1 ? val : val.split('.')[0] : val
      if (Number(val) === 0) {
        return 0
      }
      if (Number(val) < 0.05) {
        return val
      } else {
        return Math.round(Number(val) * 10) / 10
      }
    },
    getLayoutName (val) {
      const layout = {
        1: '商业',
        2: '酒店',
        3: '办公',
        4: '公寓',
        5: '车库'
      }
      return layout[val]
    },
    getMonth (val) {
      return val ? Number(val.split('-')[1]) : '当'
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import '~@styles/common.scss';
.page{
  width: 100%;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 44px);
}
.page-con{
  width: 100%;
  display: flex;
  overflow-x: auto;
  flex: 1;
}
.list-page{
  // height: 100%;
  padding: 15px;
  padding-top: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  >h2{
    border-left: 3px solid #4A90E2;
    padding: 5px 5px 5px 10px;
    font-size: 16px;
    background-color: #E3E7E9;
  }
}
.logo-title{
  padding: 0 35px;
  height: 44px;
  background-color: #E3E7E9;
  display: flex;
  align-items: center;
  >img{
    width: 75px;
    height: 30px;
    margin-right: 25px;
  }
  >h3{
    font-size: 18px;
    color: #333;
  }
}
.isSafari {
  >ul {
    >li {
      display: -webkit-box!important;
    }
  }
}
.list-data{
  height: 100%;
  display: flex;
  >ul{
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding-right: 15px;
    >li{
      cursor: pointer;
      width: 100%;
      display: flex;
      // padding-top: 45px;
      // padding-bottom: 45px;
      padding-top: 20px;
      height: 18%;
      &.auto-height{
        height: auto;
      }
      .layout{
        flex-shrink: 0;
        width: 100px;
        color: #4A90E2;
        font-size: 24px;
        font-weight: 500;
        cursor: pointer;
        >i{
          font-size: 16px;
          margin: 2px 0 0 5px;
          font-weight: 500;
        }
        align-items: flex-start;
        display: flex;
      }
      .layout-con{
        flex: 1;
        flex-grow: 1;
        width: calc(100% - 100px);
        .data-bar{
          margin-bottom: 25px;
          strong{
            color: #333;
          }
          >ul{
            justify-content: space-around;
            >li{
              // min-width: 210px;
              min-width: 60px;
              margin-right: 0;
              span{
                font-size: 28px;
                color: #222;
              }
            }
          }
        }
        >.el-table{
          margin-left: -10px;
          margin-bottom: 15px;
          // transition: all .3s;
          opacity: 1;
          overflow: hidden;
          /*max-height: 500px;*/
          &.close{
            overflow: hidden;
            max-height: 0;
            margin: 0;
            opacity: 0;
          }
        }
      }
      &:not(:last-child){
        border-bottom: 1px solid #F2F4F6;
      }
    }
  }
}
.detail-span {
  > span {
    color: #4A90E2;
    cursor: pointer;
  }
}
::v-deep td.boderTdName{
  border-bottom: 1px solid #F2F4F6;
}

::v-deep .el-table.el-table--enable-row-hover .el-table__body tr:hover > td{
  background-color: #E6F2FF;
}

.red{
  color: #ED1111 !important;
}

.search-bar-con{
  padding: 15px;
  .tool-bar{
    padding-bottom: 0;
  }
}
</style>

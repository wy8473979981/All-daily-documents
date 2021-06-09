<template>
  <div class="list-page">
    <p class="title">项目名称：{{info.project_name}}&nbsp;&nbsp;&nbsp;&nbsp;版本{{info.version}}&nbsp;&nbsp;&nbsp;&nbsp;创建日期：{{info.create_time | formatDate}}</p>
    <!-- 项目概况 -->
    <div>
      <h3 class="min-title">项目概况</h3>
      <div>
        <table class="default-table" border="1">
          <thead>
            <tr>
              <th>名称</th>
              <th>地块1</th>
              <th>地块2</th>
              <th>地块3</th>
              <th>地块4</th>
              <th>合计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in projectData" :key="index">
              <td width="300px">{{item.name}}</td>
              <td v-if="index === 0" :colspan="index===4 ? 5 : 1" :style="{'text-align':(index===4 ? 'center' : 'left')}">{{item.parcel_1 }}</td>
              <td v-else :colspan="index===4 ? 5 : 1" :style="{'text-align':(index===4 ? 'center' : 'left')}">{{item.parcel_1 | formatVal}}</td>
              <td v-if="index!==4 && index !== 0">{{item.parcel_2 | formatVal}}</td>
              <td v-if="index!==4 && index !== 0">{{item.parcel_3 | formatVal}}</td>
              <td v-if="index!==4 && index !== 0">{{item.parcel_4 | formatVal}}</td>
              <td v-if="index!==4 && index !== 0">{{item.total | formatVal}}</td>
              <td v-if="index!==4 && index === 0">{{item.parcel_2}}</td>
              <td v-if="index!==4 && index === 0">{{item.parcel_3}}</td>
              <td v-if="index!==4 && index === 0">{{item.parcel_4}}</td>
              <td v-if="index!==4 && index === 0">{{item.total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 地上（计容） -->
      <div class="table-msg">
        <p>地上（计容）</p>
        <table class="default-table">
          <tr>
            <th>销售物业地上计容面积（m²）</th>
            <td>{{others.sale_property_ground_area | formatVal}}</td>
            <th>销售物业地上计容占比（%）</th>
            <td>{{others.sale_property_ground_per | formatVal}}</td>
          </tr>
          <tr>
            <th>持有物业地上计容面积（m²）</th>
            <td>{{others.sale_property_ground_per | formatVal}}</td>
            <th>持有物业地上计容占比（%）</th>
            <td>{{others.hold_property_ground_per | formatVal}}</td>
          </tr>
        </table>
        <table class="default-table">
          <tr>
            <th>车位指标（m²/个）</th>
            <td>{{others.parking_target | formatVal}}</td>
            <th>住宅可售物业赠送比（%）</th>
            <td>{{others.house_property_give_per | formatVal}}</td>
          </tr>
          <tr>
            <th>总土地成本（亿元）<br /> <span style="font-size:12px">（含地价、契税、市政配套）</span></th>
            <td>{{others.invest_total_price | formatVal}}</td>
            <th>总土地成本（亿元） （模拟成本）</th>
            <td>{{others.invest_total_imitate_price | formatVal}}</td>
          </tr>
          <tr>
            <th>地下商业补土地款（亿元）</th>
            <td>{{others.biz_underground_land_price | formatVal}}</td>
            <th>项目转让额外税费（亿元）</th>
            <td>{{others.project_transfer_other_tax | formatVal}}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 地块配置信息 -->
    <div>
      <h3 class="min-title">地块配置信息</h3>
      <table class="default-table" style="table-layout:fixed">
        <tr>
          <th>城市类别</th>
          <td>{{config.city_type_id}}</td>
          <th>地块类别</th>
          <td>{{config.land_kind_id}}</td>
        </tr>
      </table>
      <!-- 市政大配套费 -->
      <div class="table-msg">
        <p>市政大配套费</p>
        <table class="default-table">
          <tr>
            <th>住宅类（元/m2）</th>
            <td>{{config.municipal_house_unitprice | formatVal}}</td>
            <th>商办类（元/m2）</th>
            <td>{{config.municipal_biz_unitprice | formatVal}}</td>
          </tr>
          <tr>
            <th>市政大配套费（万元）</th>
            <td>{{config.municipal_facilities_price | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 物业地价 -->
      <div class="table-msg">
        <p>物业地价</p>
        <table class="default-table">
          <tr>
            <th>销售物业地价占比（%）</th>
            <td>{{config.property_sale_land_per | formatVal}}</td>
            <th>自持物业地价占比（%）</th>
            <td>{{config.property_hold_land_per | formatVal}}</td>
          </tr>
          <tr>
            <th>销售物业楼板价（元/m²）</th>
            <td>{{config.property_sale_floor_unitprice | formatVal}}</td>
            <th>自持物业楼板价（元/m²）</th>
            <td>{{config.property_hold_floor_unitprice | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 契税 -->
      <div class="table-msg">
        <p>契税</p>
        <table class="default-table">
          <tr>
            <th>契税（比例）（%）</th>
            <td>{{config.deed_tax_per | formatVal}}</td>
            <th>销项税（%）</th>
            <td>{{config.sale_tax_per | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 装配式比例/维修基金 -->
      <div class="table-msg">
        <p>装配式比例/维修基金</p>
        <table class="default-table">
          <tr>
            <th>装配式比例（%）</th>
            <td>{{config.assemble_per | formatVal}}</td>
            <th>维修基金（元/m²）</th>
            <td>{{config.maintenance_fund_price | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 车位信息 -->
      <div class="table-msg">
        <p>车位信息</p>
        <table class="default-table">
          <tr>
            <th>住宅车位配比（每百平米车位数量）（%）</th>
            <td>{{config.parking_house_per | formatVal}}</td>
            <th>商业车位配比（每百平米车位数量）（%）</th>
            <td>{{config.parking_biz_per | formatVal}}</td>
          </tr>
          <tr>
            <th>单车位面积（m²）</th>
            <td>{{config.parking_unitarea | formatVal}}</td>
            <th>人防车库面积（m²）</th>
            <td>{{config.parking_defence_area | formatVal}}</td>
          </tr>
          <tr>
            <th>非人防车库面积（m²）</th>
            <td>{{config.parking_undefence_area | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 财务/融资 -->
      <div class="table-msg">
        <p>财务/融资</p>
        <table class="default-table">
          <tr>
            <th>财务利息（万元）</th>
            <td>{{config.finance_interest_price | formatVal}}</td>
            <th>融资年限（年）</th>
            <td>{{config.finance_period}}</td>
          </tr>
          <tr>
            <th>融资比例（%）</th>
            <td>{{config.finance_per | formatVal}}</td>
            <th>不可预见费比例（%）</th>
            <td>{{config.finance_unforeseeable_per | formatVal}}</td>
          </tr>
          <tr>
            <th>融资前自有资金投入（万元）</th>
            <td>{{config.finance_invest_price | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 费用 -->
      <div class="table-msg">
        <p>费用</p>
        <table class="default-table">
          <tr>
            <th>销售费用比例（%）</th>
            <td>{{config.cost_sale_per | formatVal}}</td>
            <th>管理费用比例（%）</th>
            <td>{{config.cost_manage_per | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 地价信息 -->
      <div class="table-msg">
        <p>地价信息</p>
        <table class="default-table">
          <tr>
            <th>地价溢价率（%）</th>
            <td>{{config.land_premium_per | formatVal}}</td>
            <th>地价（亿元）</th>
            <td>{{config.land_per | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 自持物业指标估算 -->
      <div class="table-msg">
        <p>自持物业指标估算</p>
        <table class="default-table">
          <tr>
            <th>商业-10年 平均YOC估算（亿元）</th>
            <td>{{config.hold_biz_yoc_per | formatVal}}</td>
            <th>办公-10年 平均YOC估算（亿元）</th>
            <td>{{config.hold_hotel_yoc_per | formatVal}}</td>
          </tr>
          <tr>
            <th>酒店-10年 平均YOC估算（亿元）</th>
            <td>{{config.hold_office_yoc_per | formatVal}}</td>
            <th>公寓-10年 平均YOC估算（亿元）</th>
            <td>{{config.hold_apartment_yoc_per | formatVal}}</td>
          </tr>
        </table>
      </div>
      <!-- 保障房竞配 -->
      <div class="table-msg">
        <p>保障房竞配</p>
        <table class="default-table">
          <tr>
            <th>保障房竞配倍数</th>
            <td>{{config.affordable_dispose_multiple}}</td>
            <th>竞配保障房面积（平米）</th>
            <td>{{config.affordable_dispose_area | formatVal}}</td>
          </tr>
          <tr>
            <th>保障房面积（平米）</th>
            <td>{{config.affordable_area | formatVal}}</td>
            <th>建安成本（元/平米）</th>
            <td>{{config.affordable_cs_unitprice | formatVal}}</td>
          </tr>
          <tr>
            <th>建安成本合计（万元）</th>
            <td>{{config.affordable_cs_price | formatVal}}</td>
            <th>权益面积（扣除保障房）（平米）</th>
            <td>{{config.affordable_equity_area | formatVal}}</td>
          </tr>
          <tr>
            <th>合计地价（地价+保障房建安）（亿）</th>
            <td>{{config.affordable_total_price | formatVal}}</td>
            <th>楼板价（元/平）</th>
            <td>{{config.affordable_floor_unitprice | formatVal}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  const projectData = [
    {name:'地块类型',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
    {name:'用地面积（m²）',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
    {name:'地上建筑面积（m²）',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
    {name:'平均容积率（%）',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
    {name:'地下建筑面积合计（m²）',parcel_1:''},
    {name:'土地出让金（亿元）',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
    {name:'楼板价（元/m²）',parcel_1:'',parcel_2:'',parcel_3:'',parcel_4:'',total:''},
  ]
  import Parcel from '../../../apis/apis/parcel'
  export default {
    data() {
      return {
        projectData: [],
        land_id: '',
        info: {},
        others: {},
        lands: [],// 项目情况
        config: {}
      }
    },
    watch: {},
    created() {
      this.land_id = this.$route.query.land_id
    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        console.log("this.$route.params.land_id===",this.$route.params.land_id)
        await Parcel.findDetail({land_id : this.land_id}).then(res => {
          console.log("地块信息详情:",res)
          if(res.code === 200 && res.result){
            this.info = res.result.info
            let lands = res.result.module.lands
            this.others = res.result.module.others
            const type = ['land_type_id','land_area','ground_area','avg_volume_per','','transfer_price','floor_unitprice']
            projectData.forEach((item,index) => {
              item.parcel_1 = lands[0][type[index]]
              item.parcel_2 = lands[1][type[index]]
              item.parcel_3 = lands[2][type[index]]
              item.parcel_4 = lands[3][type[index]]
              item.total = lands[4][type[index]] === '0'? '-':lands[4][type[index]]
            })
            projectData[4].parcel_1 = res.result.module.others.underground_area
            this.projectData = projectData;
            this.config = res.result.config
          }
        })
      },
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      },
      formatVal(val) {
        return this.$Utils.toThousands(val) && this.$Utils.toThousands(val)!=='0.00' ? this.$Utils.toThousands(val) : ''
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@/assets/styles/common.scss';
  .list-page{
    >div{
      margin-bottom: 30px;
    }
  }
  .title{
    color: #4A4A4A;
    font-size: 14px;
    margin-bottom: 25px;
  }
  ::v-deep .el-table {
    td, th{
      padding: 0;
      /* border-bottom: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5; */
      height: 36px;
    }
    tr>th:nth-child(2), tr>td:nth-child(2){
      // border-right: none;
    }
    td.center{
      text-align: center;
    }
  }

  .default-table{

  }

  .table-msg{
    >p{
      font-size: 14px;
      color: #333;
      margin-top: 20px;
    }
    >table{
      table-layout: fixed;
    }
  }
</style>

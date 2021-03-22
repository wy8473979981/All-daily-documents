<template>
  <!-- 测算模型 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24" style="display: flex; align-items: self-start;flex-direction: column;justify-content: flex-start">
        <el-upload :data="dataObj" :multiple="true" :before-upload="beforeUpload" action="https://www.ruyouyaxing.com">
          <el-button @click="dealUpload" size="mini" type="success"><i class="el-icon-upload"></i>上传文件</el-button>
        </el-upload>
        <el-row style="width: 100%">
          <el-col :span="24" class="ys-upload-progress">
            <i class="el-icon-paperclip"></i>
            <el-row style="width: 15%;">
              <el-col align="right" class="ys-progress-text">
                <span>组件.png</span>
                <i class="el-icon-refresh-right"></i>
                <i class="el-icon-close"></i>
              </el-col>
              <el-col>
                <el-progress :percentage="percentage1" :color="'#1890FF'" :stroke-width="5" style="width: 100%;" status="success"></el-progress>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-between" align="initial">
      <el-col class="col-p" :span="6">
        <el-row type="flex" justify="start" align="middle">
          <h3 class="row-h3"><span>基础信息</span></h3>
        </el-row>
        <p>项目所在地：<span>诸暨</span></p>
        <p>MALL商业经营部分建面(m²)：<span>73,694</span></p>
        <p>MALL商业经营部分套内面积(m²)：<span>51,848</span></p>
        <p>得房率：<span>70%</span></p>
        <p>商业街商业经营部分建筑面积(m²)：<span></span></p>
        <p>商业街商业经营部分套内面积(m²)：<span></span></p>
        <p class="mar-bt">得房率<span></span></p>

        <el-row type="flex" justify="start" align="middle">
          <h3 class="row-h3"><span>假设租金</span></h3>
        </el-row>
        <p>MALL首年租金单价(未考虑免租期及空置率)：<span>51</span></p>
        <p>商业街首年租金单价(未考虑免租期及空置率)<span></span></p>
        <p>首年免租期<span></span></p>
        <p>铺位个数(个数)：<span>177</span></p>
        <p>平均铺位套内面积(m²)：<span>293</span></p>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <el-row type="flex" justify="start" align="middle">
              <h3><span>MALL成本项目</span></h3>
            </el-row>
            <el-table class="mar-bt" ref="table" :data="tableData1" :show-summary="true" size="mini" header-row-class-name="table-header">
              <el-table-column label="" width="150" prop="layout" />
              <el-table-column label="建筑面积"  prop="area"/>
              <el-table-column label="A.土地成本单方(元)"  prop="aPrice1"/>
              <el-table-column label="A.土地成本(万元)"  prop="aPrice2"/>
              <el-table-column label="B.建安成本单方(元)"  prop="bPrice1"/>
              <el-table-column label="B.建安成本(万元)"  prop="bPrice2"/>
            </el-table>
          </el-col>
          <el-col>
            <el-row type="flex" justify="start" align="middle">
              <h3><span>商业街成本项</span></h3>
            </el-row>
            <el-table class="mar-bt" ref="table" :data="tableData2" :show-summary="true" size="mini" header-row-class-name="table-header">
              <el-table-column label="" width="150" prop="layout" />
              <el-table-column label="建筑面积" prop="area"/>
              <el-table-column label="A.土地成本单方(元)" prop="aPrice1"/>
              <el-table-column label="A.土地成本(万元)" prop="aPrice2"/>
              <el-table-column label="B.建安成本单方(元)" prop="bPrice1"/>
              <el-table-column label="B.建安成本(万元)" prop="bPrice2"/>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="start" align="middle">
      <h3><span>假设</span></h3>
    </el-row>
    <el-table class="mar-bt" ref="table" :data="tableData3" size="mini" header-row-class-name="table-header">
      <el-table-column label="" width="180" prop="layout" />
      <el-table-column label="1" prop="l1"/>
      <el-table-column label="2" prop="l2"/>
      <el-table-column label="3" prop="l3"/>
      <el-table-column label="4" prop="l4"/>
      <el-table-column label="5" prop="l5"/>
      <el-table-column label="6" prop="l6"/>
      <el-table-column label="7" prop="l7"/>
      <el-table-column label="8" prop="l8"/>
      <el-table-column label="9" prop="l9"/>
      <el-table-column label="10" prop="l10"/>
    </el-table>
    <el-row type="flex" justify="start" align="middle">
      <h3><span>测算(MALL+街)</span></h3>
    </el-row>
    <el-table class="mar-bt" ref="table" :data="tableData4" size="mini" header-row-class-name="table-header">
      <el-table-column label="" width="170">
        <template slot-scope="scope">
          <p>{{scope.row.layout}}</p>
          <p class="table-p">{{scope.row.sub}}</p>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="140" prop="unit"/>
      <el-table-column label="第1年" prop="l1"/>
      <el-table-column label="第2年" prop="l2"/>
      <el-table-column label="第3年" prop="l3"/>
      <el-table-column label="第4年" prop="l4"/>
      <el-table-column label="第5年" prop="l5"/>
      <el-table-column label="第6年" prop="l6"/>
      <el-table-column label="第7年" prop="l7"/>
      <el-table-column label="第8年" prop="l8"/>
      <el-table-column label="第9年" prop="l9"/>
      <el-table-column label="第10年" prop="l10"/>
    </el-table>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  const test1 = [
    {layout:'a.地上商业',area: '61712',aPrice1: '767',aPrice2: '4736',bPrice1:'4273',bPrice2:'26370'},
    {layout:'b.地下商业',area: '11981',aPrice1: '',aPrice2: '',bPrice1:'4631',bPrice2:'5548'},
    {layout:'c.地下车库=d+e',area: '21467',aPrice1: '',aPrice2: '',bPrice1:'3954',bPrice2:'8488'},
    {layout:'d.地下人防车库',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''},
    {layout:'e.地下非人防车库',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''}
  ]
  const test2 = [
    {layout:'a.地上商业',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''},
    {layout:'b.地下商业',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''},
    {layout:'c.地下车库=d+e',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''},
    {layout:'d.地下人防车库',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''},
    {layout:'e.地下非人防车库',area: '',aPrice1: '',aPrice2: '',bPrice1:'',bPrice2:''}
  ]
  const test3 = [
    {layout:'整场租金递增率',l1: '-',l2:'40%',l3:'16%',l4:'15%',l5:'10%',l6:'12%',l7:'19%',l8:'8%',l9:'13%',l10:'18%'},
    {layout:'整场出租率',l1: '95%',l2:'97%',l3:'97%',l4:'97%',l5:'97%',l6:'99%',l7:'99%',l8:'99%',l9:'99%',l10:'99%'}
  ]

  const test4 = [
    {layout:'总投',unit: '(万元)',l1: '47711',l2:'47756',l3:'47808',l4:'47808',l5:'47933',l6:'48031',l7:'48148',l8:'48274',l9:'48416',l10:'48583'},
    {layout:'1.土地成本',unit: '',l1: '4736',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'2.建安成本',unit: '',l1: '31,918',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'3.地下车库成本',unit: '',l1: '8980',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'4.开办费',unit: '',l1: '736',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'5.前期服务费',unit: '(0,5) 万方,200万;(5,8)300万;8万以上400万',l1: '300',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'6.筹备期推广费',unit: '70元/平',l1: '516',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'7.招商佣金',unit: '基准值2个月租金',l1: '493',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'8.专项维保基金',sub:'(Capex)',unit: '前5年1.5%,之后2%',l1: '32',l2:'45',l3:'52',l4:'60',l5:'66',l6:'98',l7:'117',l8:'126',l9:'142',l10:'167'},
    {layout:'9.信息维护费',unit: '100万/年，内部项目无',l1: '-',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'1.总收入',unit: '',l1: '2160',l2:'3079',l3:'3557',l4:'4072',l5:'4485',l6:'5231',l7:'6222',l8:'6732',l9:'7591',l10:'8869'},
    {layout:'1.1总租金收入',sub: '(有效租金收入)',unit: '(万元)',l1: '2145',l2:'3000',l3:'3466',l4:'3978',l5:'4375',l6:'4900',l7:'5831',l8:'6318',l9:'7108',l10:'8353'},
    {layout:'1.2多径停车场收入',unit: '前五年30%，之后60%',l1: '15',l2:'80',l3:'91',l4:'94',l5:'110',l6:'330',l7:'391',l8:'414',l9:'483',l10:'516'},
    {layout:'2.总支出',unit: '',l1: '845',l2:'1051',l3:'1157',l4:'1103',l5:'1214',l6:'1371',l7:'1631',l8:'1767',l9:'1989',l10:'2334'},
    {layout:'2.1租金管理费',unit: '5%',l1: '107',l2:'150',l3:'173',l4:'199',l5:'219',l6:'245',l7:'292',l8:'316',l9:'355',l10:'418'},
    {layout:'2.2企划旺场费',unit: '(万元)',l1: '368',l2:'368',l3:'368',l4:'199',l5:'219',l6:'245',l7:'292',l8:'316',l9:'355',l10:'418'},
    {layout:'2.3房产税',unit: '12%',l1: '257',l2:'360',l3:'416',l4:'477',l5:'525',l6:'588',l7:'700',l8:'758',l9:'853',l10:'1002'},
    {layout:'2.4增值税及附加',unit: '5.6%',l1: '121',l2:'172',l3:'199',l4:'228',l5:'252',l6:'293',l7:'348',l8:'377',l9:'425',l10:'497'},
    {layout:'3.业主收益',unit: '(万元)',l1: '1306',l2:'2028',l3:'2400',l4:'2969',l5:'3271',l6:'3860',l7:'4591',l8:'4965',l9:'5602',l10:'6535'},
    {layout:'4.业主收益回报率',unit: '%',l1: '2.47%',l2:'4.25%',l3:'5.02%',l4:'6.20%',l5:'6.82%',l6:'8.04%',l7:'9.53%',l8:'10.28%',l9:'11.57%',l10:'13.45%'},
    {layout:'5.十年业主收益平均回报率',unit: '%',l1: '7.79%',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'6.十年累计总业主收益',unit: '(万元)',l1: '37526',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'7.补贴总成',unit: '(万元)',l1: '803',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''},
    {layout:'备注',unit: '',l1: '',l2:'',l3:'',l4:'',l5:'',l6:'',l7:'',l8:'',l9:'',l10:''}
  ]
  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        layout: '',// 业态类型
        layoutList: [],// 业态列表
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        percentage1: 100,
        percentage2: 80,
        dataObj: { token: '', key: '' }
      }
    },
    watch: {},
    created() {
      this.tableData1 = test1
      this.tableData2 = test2
      this.tableData3 = test3
      this.tableData4 = test4
    },
    mounted() {
    },
    methods: {
      dealUpload() {

      },
      beforeUpload() {

      },
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          let tl = [...this.tableData]
          tl.splice(id,1)
          this.tableData = tl
        }).catch(() => {

        })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          // area5  num
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2)
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  h3{
    padding: 0 0 12px;
    color: #8496AA;
    line-height: 26px;
    span{
      padding-left: 10px!important;
    }
    &::before{
      content: '';
      width: 4px;
      background-color: #468CEB;
      position: absolute;
      height: 20px;
      left: 0;
      top: 0;
      margin-top: 3px;
    }
  }
  .mar-bt{
    margin-bottom: 30px;
  }
  .col-p{
    line-height: 34px;
    color: #8496AA;
    font-size: 14px;
    span{
      color: #333333;
      padding-left: 6px;
      font-size: 14px;
    }
  }
  .row-h3{
    span{
      font-size: 16px;
      color: #8496AA;
    }
  }
  .table-p{
    color: #8496AA;
  }
  .ys-upload-progress{
    display: flex;
    align-items: self-start;
    flex-direction: row;
    justify-content: flex-start;
    padding: 20px 0 0px;
    span{
      padding-left: 6px;
    }
  }
  .ys-progress-text{
    padding-right: 30px;
    span{
      position: absolute;
      left: 0;
    }
  }
</style>

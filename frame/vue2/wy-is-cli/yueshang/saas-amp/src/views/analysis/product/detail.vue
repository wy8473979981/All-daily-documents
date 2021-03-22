<template>
  <div class="list-page">
    <p class="title">项目名称：{{info.project_name}}&nbsp;&nbsp;&nbsp;&nbsp;类别：{{cate_name}}&nbsp;&nbsp;&nbsp;&nbsp;创建日期：{{create_time | formatDate}}&nbsp;&nbsp;&nbsp;&nbsp;创建人：{{admin_truename}}</p>
    <!-- 项目概况 -->
    <div>
      <div class="con">
        <div class="create-table">
          <div class="create-ul">
            <ul>
              <li><p>&nbsp;&nbsp;&nbsp;&nbsp;</p></li>
              <li>物业名称</li>
              <li>基本租金标准</li>
              <li>- 减让</li>
              <li>+ 转嫁的费用</li>
              <li>+ 租户支付的的改良</li>
              <li>= 实际租金</li>
            </ul>
            <ul v-for="(item, index) in newDate" :key="index">
              <li>
                <p>
                  <span>{{index == 0 ? '目标物业' : '可比物业' + item.property_no}}</span>
                </p>
              </li>
              <li>
                <p>{{ item.property_name }}</p>
              </li>
              <li>
                <p>{{ item.standard_rental }}</p>
              </li>
              <li>
                <p>{{ item.reduction }}</p>
              </li>
              <li>
                <p>{{ item.transfer }}</p>
              </li>
              <li>
                <p>{{ item.improve }}</p>
              </li>
              <li>
                <p>{{ item.real_rental }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="create-table">
          <div class="create-ul category-ul">
            <ul class="category-ul-list">
              <li>
                <p class="category-li-top">类别</p>
              </li>
              <li v-for="(item, index) in newDate[0].cate" :key="index">
                <span>{{item.cate_name}}</span>
              </li>
            </ul>
            <div class="category-ul-box" v-for="(item, index) in newDate" :key="index">
              <ul>
                <li>
                  <p>描述</p>
                </li>
                <li v-for="(itemm, indexx) in item.cate" :key="indexx">
                  <p>{{ itemm.cpa_kind_id }}</p>
                </li>
              </ul>
              <ul v-if="index != 0">
                <li>
                  <p>+/-调整值</p>
                </li>
                <li v-for="(itemm, indexx) in item.cate" :key="indexx">
                  <p>{{ itemm.adjval }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="create-table">
          <div class="create-ul total-ul">
            <ul>
              <li style="padding-left: 7px;">租金调整合计</li>
              <li>调整后的实际租金</li>
              <li>调整后的平均实际租金</li>
            </ul>
            <ul v-for="(item, index) in newDate" :key="index">
              <li>
                <p v-if="index != 0">{{ item.adjust_total_rental }}</p>
                <p class="total-disable" v-else>/</p>
              </li>
              <li>
                <p v-if="index != 0">{{ item.adjust_real_rental }}</p>
                <p class="total-disable" v-else>/</p>
              </li>
              <li>
                <p>{{ item.adjust_avg_rental }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Product from '@/apis/apis/product'
  export default {
    data() {
      return {
        cpa_id: '',
        info: {},
        admin_truename: '',
        cate_name: '',
        create_time: '',
        newDate: [
          {
          property_no: '0',
          property_name: '',
          standard_rental: '',
          reduction: '',
          transfer: '',
          improve: '',
          real_rental: '',
          adjust_total_rental: '',
          adjust_real_rental: '',
          adjust_avg_rental: '',
          cate: [
            {cate_name:'主力店吸引力',cpa_kind_id:'',adjval:null},
            {cate_name:'租户组合协同作用',cpa_kind_id:'',adjval:null},
            {cate_name:'车位',cpa_kind_id:'',adjval:null},
            {cate_name:'外观可见度',cpa_kind_id:'',adjval:null},
            {cate_name:'车辆交通流量',cpa_kind_id:'',adjval:null},
            {cate_name:'空置率',cpa_kind_id:'',adjval:null},
            {cate_name:'出入口',cpa_kind_id:'',adjval:null},
            {cate_name:'标记',cpa_kind_id:'',adjval:null},
            {cate_name:'整体外观',cpa_kind_id:'',adjval:null},
            {cate_name:'与中转站的接近度',cpa_kind_id:'',adjval:null},
            {cate_name:'便利设施/其他设施',cpa_kind_id:'',adjval:null},
          ]
        },{
          property_no: '1',
          property_name: '',
          standard_rental: '',
          reduction: '',
          transfer: '',
          improve: '',
          real_rental: '',
          adjust_total_rental: '',
          adjust_real_rental: '',
          adjust_avg_rental: '',
          cate: [
            {cate_name:'主力店吸引力',cpa_kind_id:'',adjval:''},
            {cate_name:'租户组合协同作用',cpa_kind_id:'',adjval:''},
            {cate_name:'车位',cpa_kind_id:'',adjval:''},
            {cate_name:'外观可见度',cpa_kind_id:'',adjval:''},
            {cate_name:'车辆交通流量',cpa_kind_id:'',adjval:''},
            {cate_name:'空置率',cpa_kind_id:'',adjval:''},
            {cate_name:'出入口',cpa_kind_id:'',adjval:''},
            {cate_name:'标记',cpa_kind_id:'',adjval:''},
            {cate_name:'整体外观',cpa_kind_id:'',adjval:''},
            {cate_name:'与中转站的接近度',cpa_kind_id:'',adjval:''},
            {cate_name:'便利设施/其他设施',cpa_kind_id:'',adjval:''},
          ]
        }
        ]
      }
    },
    watch: {},
    created() {
      this.cpa_id = this.$route.query.cpa_id
      this.admin_truename = this.$route.query.admin_truename
      this.cate_name = this.$route.query.cate_name
      this.create_time = this.$route.query.create_time
      this.getList()
    },
    mounted() {
      
    },
    methods: {
      // 加载详情
      getList() {
        Product.findDetail({cpa_id: this.cpa_id}).then(res => {
          console.log(res)
          if(res.code === 200 && res.result){
            console.log(res.result)
            this.info = res.result.info
            this.newDate = res.result.property
          }
        })
      }
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
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

  ::v-deep .con{
    height: calc(100vh - 74px);
    overflow-y: auto;
    >div{
      margin-bottom: 30px;
    }
    .create-input{
      .d-min{
        >span{
          display: block;
          font-size: 14px;
          color: #98A9BC;
          margin-bottom: 10px;
        }
      }
    }
    .create-ul{
      display: flex;
      margin-top: 30px;
      ul{
        width: 280px;
        flex-shrink: 0;
        li{
          height: 34px;
          line-height: 34px;
          padding-left: 7px;
          p{
            text-align: right;
          }
        }
        li:first-child{
          padding: 0;
          p{
            height: 34px;
            line-height: 34px;
            text-align: right;
            color: #98A9BC;
            background-color: #F2F4F6;
          }
          .category-li-top{
            text-align: left;
            padding-left: 7px;
          }
        }
      }
      ul:first-child{
        width: 160px;
      }
      ul:nth-child(2){
        width: 140px;
      }
      /* ul:last-child{
        width: 400px;
        p{
          padding-right: 100px;
        }
      } */
    }
    .category-ul{
      ul{
        width: 140px;
      }
      ul.category-ul-list{
        li{
          height: 34px;
          line-height: 34px;
        }
      }
      .category-ul-box{
        max-width: 280px;
        display: flex;
        ul{
          width: 140px;
        }
      }
    }
    .total-ul{
      ul{
        li{
          p{
            color: #333333 !important;
            background-color: #FFFFFF !important;
          }
        }
      }
    }
    .el-input__inner{
      border-color: transparent;
      background-color: #F2F4F6;
      border-radius: 2px;
    }
    .el-input__inner:focus{
      outline: none;
      border-color: #468CEB;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #DFE3E5;
      color: #333;
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

<template>
  <div class="lease-map">
    <div class="flex-ju-end mt-20 text-14">
      <div class="mr-20 flex-al-center"><svg-icon icon-class="puweiguanli" class="mr-4 icon top-icon" />铺位管理</div>
      <div class="mr-20 flex-al-center"><svg-icon icon-class="renyuanfengong" class="mr-4 icon top-icon" />人员分工</div>
      <div class="mr-20 flex-al-center"><svg-icon icon-class="bangdingpuwei" class="mr-4 icon top-icon" />绑定铺位</div>
      <div class="mr-20 flex-al-center"><svg-icon icon-class="more" class="mr-4 icon top-icon" />更多操作</div>
    </div>
    <div class="map-content mt-8">
      <div class="flex-ju-between flex-al-end">
        <div class="floor">
          <span v-for="(item,index) in list" :key="index" :class="['pb-12 pt-16 text-14 cursor-pointer',active==index?'active':'']" @click="changeFloor(index)">{{ item }}</span>
        </div>
        <div class="ysn-form">
          <el-input
            v-model="topForm.input1"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            size="small"
            class="w126 mr-16"
          />
          <el-select v-model="topForm.value" placeholder="责任人" size="small" class="w126 mr-32">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span class="mr-32 color-0c66ff text-14">业态偏差</span>
          <span class="mr-32 color-0c66ff text-14">即将到期</span>
          <span class="color-0c66ff text-14 mr-20">欠费</span>
        </div>
      </div>
      <div class="map-box flex-ju-center">
        <div class="position-relative">
          <img src="../../../../assets/image/leasemap.png" usemap="#leasemap">
          <img v-if="map2" src="../../../../assets/image/leasemap2.png" usemap="#leasemap2" class="select-map">
          <img v-if="map3" src="../../../../assets/image/leasemap2.png" class="select-map">
          <map name="leasemap">
            <area shape="poly" coords="369,169,354,157,354,109,382,59,391,61,389,81,397,82,394,116,393,155,393,157" href="" @mouseover="map2=true">
          </map>
          <map name="leasemap2">
            <area shape="poly" coords="369,169,354,157,354,109,382,59,391,61,389,81,397,82,394,116,393,155,393,157" href="javaScript:void(0)" @mouseout="map2=false" @click="showBaseInfo()">
          </map>
        </div>
      </div>
    </div>
    <div v-if="showBaseInfoType">
      <div class="map-info mt-40">
        <ysn-flod title-text="基础信息" :show-flod="false" :flod="false" hidden-slot class="pl-6" />
        <!-- <div class="title"><span class="pb pl-16 border-b1">基础信息</span></div> -->
        <div class="d-flex info-box pt-13 pl-16">
          <div v-for="(item,index) in infoList" :key="index" class="item">
            <div class="text-14 color-848382">{{ item.name }}</div>
            <div class="text-24">{{ item.num }}</div>
          </div>
        </div>
      </div>
      <div class="flex-ju-al-between flex-wrap mt-20">
        <data-analysis v-for="(item,index) in list2" :key="index" :item="item" :modal-index="index" />
      </div>

      <div class="search-bar">
        <div class="left  pl-16">
          <span v-for="(item,index) in tabsList" :class="['mr-40','cursor-pointer',activeIndex==index?'active':'']" @click="changeActive(index)">{{ item }}</span>
        </div>
        <div class="right">
          <el-select v-model="value" placeholder="请选择" style="width: 194px" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <business-progress v-if="activeIndex==0" />
      <project-contract v-else-if="activeIndex==1" />
      <project-contract v-else-if="activeIndex==2" />
      <div class="jiedian-title mt-20 pl-20 flex-al-center">
        <span class="text-14">当前节点</span><span class="text-20 color-0c66ff ml-16 text-weight-bold">进场</span>
      </div>
      <div class="mt-16">
        <div class="point-list text-16">
          <div v-for="(item, index) in pointList" :key="index" :class="['point-item flex-al-center']">
            <div :class="[' pt-8 pb-8 pr-20 pl-20 flex-al-center',index==0?'cur-point':'']">
              <svg-icon :icon-class="item.state==3?'finish':'doing'" class="top-icon icon" />
              <div class="ml-16 mr-24 color-848382">{{ item.time }}</div>
              <div class="mr-32">{{ item.name }}</div>
              <div :class="[item.state==3?'color-0c66ff':'color-48A0C3']">{{ item.state==3?'已完成':'进行中' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataAnalysis from './dataAnalysis'
import BusinessProgress from './businessProgress'
import ProjectContract from './contract'
export default {
  name: 'LeaseMap',
  components: { ProjectContract, BusinessProgress, DataAnalysis },
  data() {
    return {
      map2: false,
      map3: false,
      showBaseInfoType: false,
      activeIndex: 0,
      tabsList: ['招商进度', '现有合同', '历史合同'],
      infoList: [
        { name: '编号', num: 'M-B1-005' },
        { name: '计租面积(m²)', num: '120' },
        { name: '业态', num: '餐饮' },
        { name: '产权属性', num: '自持' }
      ],
      list: ['B1', 'F1', 'F2', 'F3', 'F4'],
      active: 0,
      // 搜索条件
      topForm: {
        value: '', // 搜索
        input1: '' // 责任人
      },
      options: [{
        value: '1',
        label: '王军'
      }, {
        value: '2',
        label: '李俊杰'
      }],
      list2: [
        {
          title: '本年租金(元)',
          statisticalData: [
            {
              name: '租金包',
              num: '120,000',
              up: 0
            },
            {
              name: '财务预算',
              num: '260,820',
              up: 0
            },
            {
              name: '实际',
              num: '240,220',
              up: 0
            }
          ],
          circleData: [
            {
              t1: '租金包',
              t2: '达成率',
              num: '89',
              up: '1.2'
            },
            {
              t1: '财务预算',
              t2: '达成率',
              num: '80',
              up: '1.6'
            }
          ]
        },
        {
          title: '本年物管费(元)',
          statisticalData: [
            {
              name: '租金包',
              num: '6,000'
            },
            {
              name: '财务预算',
              num: '12,820'
            },
            {
              name: '实际',
              num: '240,220'
            }
          ],
          circleData: [
            {
              t1: '租金包',
              t2: '达成率',
              num: '89',
              up: '1.2'
            },
            {
              t1: '财务预算',
              t2: '达成率',
              num: '80',
              up: '1.6'
            }
          ]
        }
      ],
      pointList: [
        { name: '进场', state: 2, time: '2020-04-20 15:36' },
        { name: '洽谈', state: 3, time: '2020-04-16 14:26' },
        { name: '进场', state: 3, time: '2020-04-15 09:56' },
        { name: '合同', state: 3, time: '2020-04-12 11:36' },
        { name: '双签', state: 3, time: '2020-04-10 10:26' }
      ]
    }
  },
  methods: {
    changeFloor(index) {
      this.active = index
    },
    changeActive(index) {
      this.activeIndex = index
    },
    showBaseInfo() {
      this.showBaseInfoType = true
      this.map3 = true
    }
  }
}
</script>
<style lang="scss">
  .select-map{
    position: absolute;
    top: 0;
    right: 0;
    width: 721px;
    height: 509px;
    z-index: 2;
  }
  .map-content{
    .el-input--small .el-input__inner{
      border-radius: 18px;
      background: #EFEDEA;
      &::placeholder {
        color: #848382;
      }

    }
     .el-icon-search{
        color: #050101;
        margin-top: 1px;
      }
  }

</style>
<style scoped lang="scss">
.lease-map{
  .top-icon{
    width: 20px;
    height: 20px;
  }
  .color-48A0C3{
    color: #48A0C3;
  }
  .color-848382{
    color: #848382;
  }
  .w126{
    width: 126px;
  }
  .map-content{
    border-top: 1px solid #D1CEC9;
    background: #F8F7F2;
    .floor{
      border-bottom: 1px solid #D1CEC9;
      span{
        width: 64px;
        display: inline-block;
        text-align: center;
      }
      .active{
        width: 64px;
        border-bottom: 2px solid #050101;
      }
    }
    .map-box{
      padding:40px 0 ;
      text-align: center;
      img{
        display: inline-block;
      }
    }
  }
  .map-info{
    .title{
      font-size: 16px;
      font-weight: bold;
      color: #050101;
      line-height: 24px;
      border-bottom: 1px solid #D1CEC9;
      .border-b1{
        position: relative;
        display: inline-block;
        min-width: 140px;
        /*border-bottom:1px solid #050101;*/
      }
      .border-b1::after {
        height: 1px;
        width: 100%;
        transform: scaleY(0.5);
        left: 0;
        content: '';
        position: absolute;
        background-color: #050101;
        bottom: -1px;
      }
    }
    .nomal{
      font-weight: normal;
    }
    .info-box{
      .text-24{
        font-size: 20px;
        color: #050101;
        line-height: 36px;
      }
      .item{
        margin-right: 80px;
      }
      .font-10{
        font-size: 10px;
      }
      .font-14{
        font-size: 14px;
      }
    }
  }
  .search-bar{
    display: flex;
    justify-content: space-between;
    .left{
      border-radius: 24px;
      font-size: 14px;
      color: #050101;
      line-height: 30px;
      display: flex;
      background-color: white;
    }
    .active{
      font-size: 16px;
      font-weight: bold;
      color: #1C4C7F;
      border-bottom: 2px solid #1C4C7F;
    }
  }

  .jiedian-title{
    height: 36px;
    background: #E0DFDD;
    border-radius: 20px;
  }
  .cur-point{
    border-radius: 21px;
    background-color: rgba(181, 211, 224, 0.17);
  }
}
</style>

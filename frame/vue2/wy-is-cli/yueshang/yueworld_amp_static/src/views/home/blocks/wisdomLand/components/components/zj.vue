<template>
  <div class="calculation">
    <!-- 项目指标 -->
    <p class="p1">上海闵行七宝项目</p>
    <div class="tab">
      <p>项目指标</p>
      <div class="br" />
    </div>
    <div class="body-one">
      <div
        v-for="(item, index) in targetList"
        :key="index"
        class="box"
        :style="'width:' + item.width"
      >
        <p>{{ item.name }}</p>
        <p>{{ item.val }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      targetList: [
        {
          name: '城市与区域',
          val: '上海',
          width: '84px'
        },
        {
          name: '城市级别',
          val: 'A',
          width: '84px'
        },
        {
          name: '摘牌时间',
          val: '2013/12/19',
          width: '84px'
        },
        {
          name: '是否有合作方',
          val: '否',
          width: '84px'
        },
        {
          name: '股权结构',
          val: '-',
          width: '84px'
        },
        {
          name: '购物中心建面',
          val: '69,000㎡',
          width: '84px'
        },
        {
          name: '商业街建面',
          val: '4,5000㎡',
          width: '84px'
        },
        {
          name: '酒店建面',
          val: '21,000㎡',
          width: '84px'
        },
        {
          name: '写字楼建面',
          val: '12,000㎡',
          width: '84px'
        },
        {
          name: '酒店式公寓建面',
          val: 'A',
          width: '84px'
        },
        {
          name: '分摊车库建面',
          val: '12,000㎡',
          width: '84px'
        },
        {
          name: '车库分摊说明',
          val: '-',
          width: '84px'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation {
  margin-top: 46px;
  .p1 {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #050101;
    line-height: 36px;
  }
  .tab {
    margin-top: 8px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #050101;
    // border-bottom: 1px solid #d1cec9;
    position: relative;
    .br {
      width: 100%;
      height: 1px;
      background: #d1cec9;
      position: absolute;
      bottom: -27px;
    }
    p {
      position: absolute;
      z-index: 5;
      padding-bottom: 8px;
      padding-left: 12px;
      display: inline-block;
      width: 184.5px;
      line-height: 1;
      border-bottom: 1px solid #050101;
    }
  }
  //项目指标下方
  .body-one {
    margin: 60px 0 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .box {
      :nth-child(1) {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #050101;
        line-height: 16px;
      }
      :nth-child(2) {
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #014543;
        line-height: 24px;
        margin-bottom: 16px;
      }
    }
  }

}
</style>

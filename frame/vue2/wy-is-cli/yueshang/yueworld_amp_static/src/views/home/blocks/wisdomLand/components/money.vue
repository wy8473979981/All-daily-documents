<template>
  <!-- 租金预算 -->
  <div class="calculation">
    <ZJ />
    <button class="add" @click="add">新增</button>
    <div v-if="!stateShow" v-show="addShow">
      <!-- 标题 -->
      <div class="title">
        <p>商务条件预算表</p>
        <p>说明：黄色字体为标准输入项，橙色为非标输入项</p>
      </div>
      <!-- 盒子1 -->
      <div class="txt-oneBox">
        <div class="table">
          <p>项目名称</p>
          <p>铺位编号</p>
          <p>品牌</p>
          <p>租金起始日</p>
        </div>
        <div class="table-tet">
          <p v-for="item in 4" :key="item">--</p>
        </div>
      </div>
      <div class="title">
        <p />
        <p>在营项目若填入以上信息，则以下分析变量自动生成</p>
      </div>
      <div class="txt-twoBox">
        <div class="title">分析变量</div>
        <div class="box">
          <div>
            <div v-for="(item, index) in dataList" :key="index" class="left">
              <span>{{ item.name }}</span>
              <span>{{ item.val }}</span>
            </div>
          </div>

          <div>
            <div v-for="(item, index) in dataLists" :key="index" class="left">
              <span style="width: 60px">{{ item.name }}</span>
              <span>{{ item.val }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="title">
        <p />
        <p>内部达标率指对比租金标准的达成率</p>
      </div>
      <div class="title">
        <p />
        <p>内部对比指建立外部数据库后，与周边标准的对比差值</p>
      </div>

      <button class="add right" @click="state">开始测算</button>
    </div>
    <StateMoney v-if="stateShow" />
    <basicInforEntryDialog
      :title="basicTitle"
      :dialog-visible.sync="basicDialogVisible"
    />
  </div>
</template>

<script>
import ZJ from './components/zj'
import StateMoney from './components/state-money'
import basicInforEntryDialog from './basicInforEntryDialog'
export default {
  components: {
    ZJ,
    StateMoney,
    basicInforEntryDialog
  },
  data() {
    return {
      addShow: false, // 默认不显示
      basicDialogVisible: false,
      dataList: [
        { name: '城市层级', val: '生成或下拉选择' },
        { name: '地段', val: '生成或下拉选择' },
        { name: '产品线', val: '生成或下拉选择' },
        { name: '楼层', val: '生成或下拉选择' },
        { name: '位置', val: '生成或下拉选择' },
        { name: '面积', val: '生成或下拉选择' },
        { name: '业态', val: '生成或下拉选择' },
        { name: '品牌级次', val: '生成或下拉选择' }
      ],
      dataLists: [
        { name: '选择城市修正', val: '生成或下拉选择' },
        { name: ' ', val: ' ' },
        { name: '基础铺位租金', val: '生成或下拉选择' },
        { name: '一级业态', val: '生成或下拉选择' },
        { name: '业态+面积段', val: '生成或下拉选择' },
        { name: '修正面积参数', val: '生成或下拉选择' },
        { name: '修正细分业态', val: '生成或下拉选择' },
        { name: '修正品牌参数', val: '生成或下拉选择' }
      ],
      stateShow: false, basicTitle: '基础信息录入'
    }
  },
  methods: {
    state() {
      this.stateShow = true
    },
    add() {
      this.addShow = true
      // this.basicDialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.df {
  display: flex;
  overflow: scroll;
  width: 276px;
}
.calculation {
  .add {
    width: 86px;
    height: 32px;
    background: #014543;
    border-radius: 16px;
    border: none;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 1;
    margin-bottom: 16px;
  }
}
//头
.title {
  :nth-child(1) {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #050101;
    line-height: 18px;
    margin-bottom: 17px;
  }
  :nth-child(2) {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
    margin-bottom: 16px;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

// 盒子1
.txt-oneBox {
  height: 88px;
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 15px 16px;
  overflow-x: scroll;
  .table {
    width: 322px;
    height: 32px;
    background: #e5e2de;
    border-radius: 20px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050101;
      line-height: 14px;
      width: 25%;
    }
    :nth-child(4) {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .table-tet {
    width: 322px;
    height: 32px;
    color: #ff641c;
    border-radius: 20px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    p {
      width: 25%;
    }
  }
} //盒子2
.txt-twoBox {
  height: 346px;
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 18px 16px;
  overflow-x: scroll;
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #050101;
    line-height: 18px;
    padding-bottom: 13px;
    border-bottom: 1px solid #e5e2de;
  }
  .box {
    width: 357px;
    display: flex;
    .left {
      width: 170px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 14px;
      margin-top: 17px;

      :nth-last-child(1) {
        width: 70px;
        display: inline-block;
        font-size: 20px;
        transform: scale(0.5);
        white-space: nowrap;
      }
      :nth-last-child(2) {
        width: 35px;
        display: inline-block;
        font-size: 20px;
        transform: scale(0.5);
        white-space: nowrap;
        color: #fa6400;
        margin-right: 9px;
      }
    }
  }
}
.right {
  float: right;
}
</style>

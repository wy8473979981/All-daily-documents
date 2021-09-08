<template>
  <div class="position-absolute three-map-detail-card">
    <div class="card-item" style="width: 230px">
      <div class="text-18 pb-4">净资产收入NOI(万元)</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">当月实际</div>
          <div class="t2">216.57</div>
        </div>
        <div>
          <div class="t1">今年预测</div>
          <div class="t2">1,324</div>
        </div>
      </div>
    </div>

    <div class="card-item" style="width: 429px">
      <div class="text-18 pb-4">业主收益（万元）</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">目标业主收益</div>
          <div class="t2">855.53</div>
        </div>
        <div>
          <div class="t1">实际业主收益</div>
          <div class="t2">643.864</div>
        </div>
        <div>
          <div class="t1">预测平均业主</div>
          <div class="t2">86.69%</div>
        </div>
        <div>
          <div class="t1">收益率</div>
          <div class="t2">75.98%</div>
        </div>
      </div>
    </div>

    <div class="card-item" style="width: 367px">
      <div class="text-18 pb-4">财务</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">出租率</div>
          <div class="t2">13%</div>
        </div>
        <div>
          <div class="t1">总租金</div>
          <div class="t2">643.86</div>
        </div>
        <div>
          <div class="t1">平均租金</div>
          <div class="t2">86.69%</div>
        </div>
        <div>
          <div class="t1">坪效</div>
          <div class="t2">75.98%</div>
        </div>
      </div>
    </div>

    <div class="card-item" style="width: 230px">
      <div class="text-18 pb-4">总投资成本（万元）</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">总成本</div>
          <div class="t2">254,324</div>
        </div>
        <div>
          <div class="t1">预测年回报率</div>
          <div class="t2">7.75%</div>
        </div>
      </div>
    </div>

    <div class="card-item" style="width: 429px">
      <div class="text-18 pb-4">售价</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">本金</div>
          <div class="t2">254,324</div>
        </div>
        <div>
          <div class="t1">估值日期</div>
          <div class="t2">2021-02-18</div>
        </div>
        <div>
          <div class="t1">预测年回报率</div>
          <div class="t2">7.86%</div>
        </div>
      </div>
    </div>
    <div class="card-item" style="width: 367px">
      <div class="text-18 pb-4">贷款</div>
      <div class="flex-ju-between">
        <div>
          <div class="t1">本金</div>
          <div class="t2">254,324</div>
        </div>
        <div>
          <div class="t1">到期日</div>
          <div class="t2">2021-02-18</div>
        </div>
        <div>
          <div class="t1">年贷款利息</div>
          <div class="t2">1,758</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeMapCard',
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.three-map-detail-card{
  width: 1070px;
  bottom: 0;
  right: 0;
  padding-right: 18px;
  padding-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  .card-item{
    margin-left: 8px;
    margin-bottom: 8px;
    background: #E0E7E7;
    border-radius: 8px;
    border: 1px solid #485F47;
    padding:6px 8px;
    .t1{
      font-size: 14px;
      margin-bottom: 4px;
    }
    .t2{
      font-size: 18px;
      color: #347E7C;
    }
  }
}
</style>

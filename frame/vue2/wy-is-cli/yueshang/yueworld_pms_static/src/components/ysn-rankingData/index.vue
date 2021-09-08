<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="ranking-data">
    <template v-for="(item,index) in rankData">
      <div :key="index" class="data-bj">
        <p>{{ item.name }}</p>
        <div>{{ item.value }}{{ item.unit?item.unit:'%' }}</div>
      </div>
      <div v-if="index%2==1&&index+1!=rankData.length" :key="'line'+index" class="xian" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'YsnRankingData',
  props: {
    rankData: {
      type: Array, default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
  .ranking-data{
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  .data-bj{
    margin-right: 45px;
  p{
    font-size: 14px;
    color: #050101;
    line-height: 14px;
    margin-bottom: 8px;
  }
  div{
    font-size: 24px;
    color: #050101;
    line-height: 24px;
  }
  }

  .xian{
    width: 2px;
    height: 44px;
    margin-right: 45px;
    background-color: #D1CEC9;
  }
  }
</style>

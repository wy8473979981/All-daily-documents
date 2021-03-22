<template>
  <div>
    <ul>
      <li v-for="(item, index) of tableData" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
          {
            date: '2019-12-18',
            name: '悦商科技',
            address: '宝龙城创想实验室'
          }
        ]
    };
  }
};
</script>


<template>
  <el-autocomplete
    style="width:100%;"
    class="inline-input"
    v-model="inputvalue"
    :fetch-suggestions="querySearch"
    placeholder="输入文字模糊查询"
    :trigger-on-focus="false"
    @select="handleSelect"
  ><i slot="suffix" class="el-input__icon el-icon-search"></i></el-autocomplete>
</template>

<script>
export default {
  props: {
    projectList: {
      type: Array
    },
    field: {
      type: String
    }
  },
  data() {
    return {
      inputvalue: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      let restaurants = this.projectList;
      console.log(restaurants)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      console.log(results)
      // 调用 callback 返回建议列表的数据
      if(results.length) {
        results.forEach(item => item.value = item[this.field])
      }
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant[this.field].toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    handleSelect(item) {
      console.log(item);
      this.$emit('handleSelect', item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>



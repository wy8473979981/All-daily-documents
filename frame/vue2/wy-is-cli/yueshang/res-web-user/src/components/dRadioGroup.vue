/*
*author: wjh
*date： 2020-2-14
*desc： radio支持不同字段
*/

<template>
  <div class="d-checkbox-box">
    <el-checkbox @change="(value) => changeRadio(i.name,value)" v-for="i in nameList" :key="i.label" v-model="bizEntityJson[i.name]" true-label="true" false-label="false">{{i.label}}</el-checkbox>
  </div>
</template>

<script>
  export default {
    props: ['value','nameList'],
    computed: {
      bizEntityJson: {
        get() {
          return this.value;
        }
      }
    },
    mounted() {
    },
    methods: {
      changeRadio(name,value) {
        console.log(name,value)
        let list = this.nameList.filter(e => e.name != name);
        list.forEach(e => {
          let v = e.name;
          this.$set(this.bizEntityJson,v,false)
        });
        this.$emit('input',this.bizEntityJson);
        this.$emit('change',{name,value});
      }
    }
  }
</script>

<style lang='scss' scoped>
  .top {
    border-top: 1px solid #ddd !important;
  }
</style>
<style lang="scss">
  // 更改多选为单选样式
  .d-checkbox-box {
    .el-checkbox {
      user-select: text;
      -webkit-user-select: text;
    }
    .el-checkbox__inner {
      border-radius: 100% !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
      content: "";
      width: 3px;
      height: 3px;
      border-radius: 100%;
      background-color: #FFFFFF;
      position: absolute;
      left: 30%;
      top: 30%;
      transition: transform 0.15s ease-in;
    }
  }
</style>
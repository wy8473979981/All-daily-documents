<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:风险预警
-->
<template>
  <div class="box py-20">
    <!-- 标题 -->
    <div class="title mb-12">
      <span class="pb pl-16 border-b1">风险预警</span>
      <span class="tips">{{ getNum }}</span>
    </div>
    <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">

      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item,index) in dataList"
          :key="index+'p'"
          class="collapse"
          :class="item.child?'':'no-icon'"
          :title="item.title+(item.child?(':'+item.child.length)+'个项目':'')"
          :name="item.id"
        >
          <el-scrollbar v-if="item.child" class="scrollbar-item" wrap-class="scrollbar-wrapper">
            <div v-for="(_item,_index) in item.child" :key="_item.id+_index" class="list-item cursor-pointer">
              {{ _item.title }}
            </div>
          </el-scrollbar>
        </el-collapse-item>
      </el-collapse>

    </el-scrollbar>

  </div>
</template>

<script>
export default {
  name: 'RiskList',

  props: {
    // 数据
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 手风琴选中效果
      activeNames: ''

    }
  },
  computed: {
    // 获取总数
    getNum() {
      let num = 0
      this.dataList.forEach(item => {
        if (item.child) {
          num += item.child.length
          return
        }
        num += 1
      })
      return num
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
   .title{
    font-size: 18px;
    font-weight: bold;
    color: #050101;
    line-height: 32px;
    border-bottom: 1px solid #D1CEC9;
    .border-b1{
      display: inline-block;
      width: 140px;
      border-bottom:1px solid #050101;
    }
    .tips{
        float: right;
        padding: 6px 12px;
        background: #6F120C;
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
        line-height: 12px;
        margin-top: 4px;
    }
  }

  .collapse {
      margin-bottom: 4px;

      &::v-deep .el-collapse-item__header{
            background: #6F120C;
            height: 24px;
            background: #6F120C;
            border-radius: 18px;
            line-height: 24px;
            color: #fff  !important;
            padding-left: 20px;

            .el-icon-arrow-right{

                &::before{
                    content:"\e790"
                }
                &.is-active{
                    transform: rotate(180deg);
                }
            }

        }
    &::v-deep .el-collapse-item__content{
        padding-bottom: 0;
    }
     &.no-icon ::v-deep.el-icon-arrow-right{
       display: none;
    }
  }
    .scrollbar{
        height: 256px;
    }
    .scrollbar-item{
        height: 132px;
    }
    .list-item{
        height: 22px;
        line-height: 22px;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F1EC;
        padding-left: 45px;

    }
</style>

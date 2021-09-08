<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <!-- title标题 -->
    <div class="title mb-8">
      <!-- 左边title -->
      <div class="title">
        <div class="title-font">{{ title }}</div>
      </div>
      <!-- 右边title -->
      <div class="title-right">
        <div class="title-right-font">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'YsnTitle',
  props: {
    // 标题文字
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

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
      position: relative;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      border-bottom: 1px solid #D1CEC9;
      .title{
        line-height: 35px;
        .title-font{
           padding-left: 8px;
           font-weight: bold;
           font-size: 18px;
           color: #050101;
        }
      }
      .title-right{
         height: 34px;
         .title-right-font{
                 text-align: right;
            div{
                  text-align:right;
                  display: inline-block;
              }
         }
      }
  }
  .title:before{
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 122px;
      content:'';
      border-bottom: 1px solid #050101;
  }

</style>

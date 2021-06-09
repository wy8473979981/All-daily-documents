<template>
    <div>
        <!-- title标题 -->
        <div class="title">
            <!-- 左边title -->
            <div class="title-left">
                <div class="title-left-font">{{obj.titleLeft}}</div>
            </div>
             <!-- 右边title -->
            <div class="title-right">
             <div class="title-right-font">
                <slot></slot>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'pmsTitle',
  props:{
     obj: {
            type: Object
        },
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
    //   border-bottom: 1px solid red;
      .title-left{
        // width:50%;
        // border-bottom: 1px solid black;
        padding-bottom: 13px;
        .title-left-font{
           padding-left: 8px;
           font-weight: bold;
           font-size: 18px;
           color: #050101;
        }
      }
      .title-right{
        //  width: 50%;
         height: 34px;
        //  border-bottom: 1px solid #D1CEC9;
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
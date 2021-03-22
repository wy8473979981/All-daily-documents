<template>
  <div id="result-wrapper">
    <h5>操作记录</h5>
    <section class="result-scroll-box">
      <ul>
        <li v-for="(item, index) of logList" :key="index">
          <span class='origin'>{{item.origin}}</span>====><span class="substitute">{{item.substituted}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    logList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
    #result-wrapper{
      border: 1px solid #ccc;
      h5{
        height: 66px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
        line-height: 66px;
        font-size: 20px;
      }
      .result-scroll-box{
        width: 350px;
        height: 398px;
        overflow-y: scroll;
        ul{
          li{
            padding: 5px 3px;
            &:not(:last-child){
              border-bottom: 1px solid #ccc;
            }
            span.origin{
              color: #468CEB;
            }
            span.substitute{
              color: #409EFF
            }
          }
        }
      }
    }
</style>

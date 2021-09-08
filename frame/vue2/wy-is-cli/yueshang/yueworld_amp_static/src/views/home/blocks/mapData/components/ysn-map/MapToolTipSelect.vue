<template>
<div class="map-tooltip-list">
  <ul class="tip-list">
    <li v-for="(item,index) in data" :key="index"  @click="$emit('selected',item)">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: "MapToolTipSelect",
  props:{
    data:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      value:false
    }
  },
  methods:{
    /**
     *
     */
    handlerChange(){
      this.$emit('change',this.value)
    },
    /**
     * 更多事件
     */
    handlerDetail(){
      this.$emit('detail')
    }
  }
}
</script>

<style lang="scss">
.map-tooltip-list{
  width: 104px;
  padding: 5px 0;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-top: -10px;
  left: -10px;
  .tip-list{
    >li{
      color: #3B8995;
      font-size: 12px;
      text-align: center;
      height: 28px;
      line-height: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 15px;
      &:hover{
        background: #D8D8D8;
      }
    }
  }
}
</style>

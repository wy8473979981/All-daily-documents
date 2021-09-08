<!-- 审批单textarea组件 -->
<template>
  <div :class="{'disabled':disabled,'t-textarea':true}" :contenteditable="!disabled" :placeholder="placeholder"
    v-text="value"
    @blur="changeText">
  </div>
</template>
<script>
  export default {
    props: ['value','disabled','placeholder'],
    computed: {
      innerText: {
        get() {
          return this.value;
        }
      }
    },
    methods:{
      changeText(e){
        // this.innerText = this.$el.innerHTML;
        this.$emit('input',this.$el.innerText);
      }
    }
  }
</script>
<style lang="scss" scoped>
div {
  padding: 5px 15px;
  min-height: 36px;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  color: #222222;
  line-height: 1.5;
}
div:focus {
  border: 1px solid #468CEB
}
 /*为空时显示 element attribute content*/
  div:empty:before{
      content: attr(placeholder);   /* element attribute*/
      /*content: 'this is content';*/
      color: #ccc;
      line-height: 26px;
  }
  /*焦点时内容为空*/
  div:focus:before{
      content:none;
  }
.disabled {
  // background-color: #F5F7FA;
  // border-color: #E4E7ED;
  // color: #333333;
  cursor: not-allowed;
}
</style>
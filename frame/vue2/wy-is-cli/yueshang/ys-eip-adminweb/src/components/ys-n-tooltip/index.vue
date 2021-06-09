<template>
  <div class="box" v-if="show" :style="styleObj">
    <span class="text">{{text}}</span>
    <div class="arrow"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    };
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    styleObj: {
      type: Object,
      function () {
        return {};
      },
    },
  },
}
</script>
<style scoped>
.box {
  position: absolute;
  margin-left: 12px;
  padding: 5px 24px 5px 15px;
  font-size: 12px;
  line-height: 1.2;
  min-width: 100px;
  white-space: nowrap;
  background: rgba(250, 70, 70, 0.3);
  border: 1px solid #fa4646;
  z-index: 2001;
}

.text {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #f4516e;
}

.arrow {
  position: absolute;
  left: -6px;
  top: 6px;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-right-color: #fa4646;
  border-style: solid;
  border-width: 6px;
  border-left-width: 0;
}

.arrow::after {
  content: " ";
  border-width: 5px;
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  bottom: -5px;
  left: 1px;
  border-left-width: 0;
  border-right-color: rgb(253 199 199);
}
</style>
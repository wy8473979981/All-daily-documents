<template>
  <div :class="'button-content ' + className">
    <el-button @click="handleClick" :disabled="disabled" :style="styleObject">{{text}}</el-button>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    styleObject: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleClick () {
      this.$emit('click', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.button-content {
  display: inline-block;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
}
.el-button {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #1c1c1c;
  height: 36px;
  padding: 0 26px;
  border: 1px solid #e0e5eb;
  border-radius: 0;
}
// 按钮 main：主要 、sub:次要 、common：普通
.button-bg-main {
  .el-button {
    background: #4876ef !important;
    color: #fff !important;
    border-color: #4876ef !important;

    &:hover {
      background: #002eaa !important;
      color: #ffffff !important;
      border-color: #002eaa !important;
    }
  }

  .is-disabled,
  .is-disabled:hover,
  .is-disabled:focus {
    background: #e0e5eb !important;
    color: #fff !important;
    border-color: #e0e5eb !important;
  }
}

.button-bg-sub {
  .el-button {
    background: #fff !important;
    color: #4876ef !important;
    border-color: #4876ef !important;

    &:hover {
      background: #f0f2f7 !important;
      color: #4876ef !important;
      border-color: #4876ef !important;
    }
  }

  .is-disabled,
  .is-disabled:hover,
  .is-disabled:focus {
    background: #fff !important;
    color: #8893a3 !important;
    border-color: #e0e5eb !important;
  }
}

.button-bg-common {
  .el-button {
    background: #fff !important;
    color: #1c1c1c !important;
    border-color: #e0e5eb !important;

    &:hover {
      background: #f0f2f7 !important;
      color: #1c1c1c !important;
      border-color: #e0e5eb !important;
    }
  }

  .is-disabled,
  .is-disabled:hover,
  .is-disabled:focus {
    background: #fff !important;
    color: #8893a3 !important;
    border-color: #e0e5eb !important;
  }
}
</style>
<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="common-title-container">
    <span> {{ title }} </span>
    <span v-show="showType() === '排名'" class="icon-plus">
      <i v-if="isShowPlus" class="el-icon-circle-plus" @click="handleClick(true)" />
      <i v-if="!isShowPlus" class="el-icon-remove down" @click="handleClick(false)" />
    </span>
  </div>
</template>
<script>
export default {
  inject: ['showType'],
  props: {
    title: {
      type: String,
      default: '考核'
    },

    aroundList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowPlus: !this.aroundList.some(item => item.title === this.title)
    }
  },

  watch: {
    aroundList: {
      handler(value) {
        this.isShowPlus = !this.aroundList.some(item => item.title === this.title)
      },
      deep: true
    }
  },

  methods: {
    handleClick(isPlus) {
      this.isShowPlus = !isPlus
      this.$emit('click', this.title, isPlus)
    }
  }
}
</script>
<style lang="scss" scoped>
.common-title-container {
    width: 244px;
    line-height: 28px;
    background: #E5E2DE;
    border-radius: 14px;
    color: $font-word-color;
    font-size: 16px;
    padding: 0 8px;
    margin-bottom: 10px;
    .icon-plus {
        color: #485F47;
        float: right;
        cursor: pointer;
        i {
            font-size: 16px;
            // transform: translateY(1px);
        }
    }
}
</style>

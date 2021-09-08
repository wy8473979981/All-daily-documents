<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="search-input-content">
    <svg-icon icon-class="menuSearch" />
    <input placeholder="搜索" @input="handleInput">
  </div>
</template>

<script>
import LogoImg from '@/assets/logo.png'
export default {
  name: '',
  props: {

  },
  data() {
    return {
      title: '后台管理',
      logo: LogoImg
    }
  },
  methods: {
    // 搜索框输入效果
    handleInput(val) {
      this.$emit('change', val.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
    .search-input-content{
        height: 32px;
        width: 242px;
        background: #EFEDEA;
        font-size: 28px;
        vertical-align: middle;
        line-height: 32px;
        margin-bottom: 16px;
        border-radius: 16px;
        padding:0 14px;
        box-sizing: border-box;
        & input{
            width: 165px;
            height: 32px;
            vertical-align: top;
            background: none;
            display: inline-block;
            font-size: 14px;
            border: none;
        }
				.svg-icon {
					margin-right: 0 !important;
				}
    }
</style>

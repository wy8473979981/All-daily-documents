<!--
 * @Author: xza
 * @Date: 2021-08-07 19:19:24
 * @LastEditTime: 2021-09-03 21:09:02
 * @LastEditors: xza
 * @Description: 手机号验证
 * @FilePath: /baolong/src/components/ysn-formItem/item/phone.vue
-->
<template>
  <el-tooltip :disabled="!$attrs.hasTip" :content="form[$attrs.prop]||$attrs.placeholder" placement="top" effect="dark">
    <el-input
      v-bind="$attrs"
      :ref="'form-item-'+$attrs.prop"
      type="number"
      v-model="form[$attrs.prop]"
      :placeholder="$attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请输入'"
      resize="none"
      class="ysn-input"
      @input="handleInput"
      @blur="blur_"
    >
      <i v-if="$attrs.isSearch" slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ItemPhone',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      data_: '',
      falg_: false
    }
  },
  methods: {
    handleInput(val) {
      this.$attrs.change && this.$attrs.change(val)
      this.data_ = val
      console.log(this.data_)
      // this.$attrs.change && this.$attrs.change(val)
      // const rglx = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   if (!rglx.test(val)) {
      //     this.$message({
      //       message: '手机号格式错误',
      //       type: 'error'
      //     })
      //   } else {
      //     this.$message({
      //       message: '手机号格式正确',
      //       type: 'success'
      //     })
      //   }
      // }, 500)
    },
    blur_() {
      const rglx = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!rglx.test(this.data_) && this.data_ !== '') {
        this.$message({
          message: '手机号格式错误',
          type: 'error'
        })
        this.falg_ = false
      } else {
        // this.$message({
        //   message: '手机号格式正确',
        //   type: 'success'
        // })
        this.falg_ = true
      }
      this.$attrs.blur && this.$attrs.blur(this.falg_)
    }
  }
}
</script>

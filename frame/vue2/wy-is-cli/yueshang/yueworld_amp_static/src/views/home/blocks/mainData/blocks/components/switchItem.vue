<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP首页-中间进度条数据模块-switch列组件
-->

<template>
  <div class="box text-center">
    <div v-if="!hasMove" class="text">
      {{ title }}
    </div>
    <!--  -->
    <div v-else class="cursor-pointer text flex-al-center" :class="(showSwitch || $attrs.form[$attrs.prop])?'switch-box':''" @mouseenter="showSwitch=true" @mouseleave="showSwitch=false">
      <span v-if="direction==='left'">{{ title }}</span>
      <el-switch
        v-if="showSwitch || $attrs.form[$attrs.prop]"
        v-model="$attrs.form[$attrs.prop]"
        class="mx-4 switch"
        active-color="#004948"
        inactive-color="#848382"
        :width="40"
        :disabled="disabled"
        v-on="$listeners"
        @change="$emit('switchItemChange')"
      />
      <span v-if="direction!=='left'">{{ title }}</span>
    </div>
    <p v-if="hasRadio" @click.prevent="radioClick">
      <el-radio v-model="$attrs.form[$attrs.radioprop]" label="1" :disabled="disabled">
        <span class="radio_text">{{ radioTitle }}</span>
      </el-radio>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SwitchItem',
  //   components: { card },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否需移入显示switch
    hasMove: {
      type: Boolean,
      default: false
    },
    // switch方向 left/right 默认在右边
    direction: {
      type: String,
      default: 'left'
    },
    // 是否有radio选择
    hasRadio: {
      type: Boolean,
      default: false
    },
    // radio标题
    radioTitle: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 是否显示switch
      showSwitch: false
    }
  },
  mounted() {

  },
  methods: {
    //   radio点击
    radioClick(e) {
      if (this.disabled) {
        return
      }
      const val = this.$attrs.form[this.$attrs.radioprop]
      this.$attrs.form[this.$attrs.radioprop] = val === '1' ? '0' : '1'
      this.$emit('switchItemChange')
    }
  }
}
</script>

<style lang="scss" scoped>
    .text{
        font-size: 24px;
        color: #050101;
        font-weight: 400;
        line-height: 44px;
        text-align: center;
        height: 44px;
        transition:background 400ms ease;
        border-radius: 22px;
        box-sizing: border-box;
        padding:0 13px;
        display: inline-block;
    }
    .switch-box{
        height: 44px;
        background: #D8D8D8;
        text-align: center;
        // line-height: 44px;
        text-align: left;
        font-size: 0;
        &>span{
            font-size: 24px;
            vertical-align: middle;

        }
        .switch{
            display: inline-block;
            vertical-align: middle;
        }
    }

    .radio_text{
        color: #A7A7A7;
    }

</style>

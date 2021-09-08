/*
*author: wjh、ly
*date： 2020-12-15
*desc： el-col简易封装
*/

<template>
  <el-col :span="row ? 24 : 12" :class="{'right-col': place.includes('right') || row != '',top: place.includes('top')}">
    <div class="d-min" :class="{required: novalue !== undefined && (($route.query.type || approveDetail.pmApprove.status == '草稿') && !showPre)}">
      <span v-if="!noTitle">{{ title }}</span>
      <div class="d-red" :class="{novalue}">
        <slot/>
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'dCol',
  props: {
    novalue: {
      default: undefined,
    },
    place: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    row: {
      type: String,
      default: ''
    },
    noTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['approveDetail', 'showPre'])
  }
}
</script>

<style lang='scss' scoped>
  .top {
    border-top: 1px solid #ddd !important;
  }
</style>
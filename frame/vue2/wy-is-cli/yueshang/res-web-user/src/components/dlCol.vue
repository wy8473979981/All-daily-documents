/*
*author: ly
*date： 2021-05-13
*desc： el-col简易封装
*/

<template>
  <el-col :span="span" :class="{'right-col': place.includes('right'), top: place.includes('top'), 'top-blod': place.includes('top-bold'), 'title-col': place.includes('title'), 'table-col': place.includes('table')}" :style="{height: col > 1 ? col * 36 + 2 + 'px' : ''}">
    <span v-if="place.includes('title-auto')" class="span-100">{{ title }}</span>
    <div v-else class="d-min" :class="{required: (novalue !== undefined && (($route.query.type || approveDetail.pmApprove.status == '草稿') && !showPre)) || novalueAdmin !== undefined}">
      <span :class="{'span-auto': place.includes('span-auto')}" v-if="title !== undefined">
        {{ title }}
        <el-tooltip v-if="tip" class="item" effect="dark" :content="tip" placement="top-start">
          <i class="el-icon-warning"></i>
        </el-tooltip>
      </span>
      <slot v-if="place.includes('url')" />
      <div v-else class="d-red" :class="{novalue, 'height-auto': place.includes('height-auto'), 'relative-title': place.includes('relative'), 'tag-center': place.includes('tag')}">
        <slot />
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'dlCol',
  props: {
    novalue: {
      default: undefined,
    },
    novalueAdmin: {
      default: undefined,
    },
    place: {
      type: String,
      default: ''
    },
    title: {
      default: undefined,
    },
    span: {
      type: Number,
      default: 12
    },
    col: {
      type: Number,
      default: 1
    },
    tip: {
      type: String,
      default: ''
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
  .top-blod {
    border-top: 1px solid #aaa !important;
  }
  .d-min .d-red.height-auto {
    height: auto !important;
  }
  .d-min .d-red.tag-center {
    align-items: center !important;
  }
</style>
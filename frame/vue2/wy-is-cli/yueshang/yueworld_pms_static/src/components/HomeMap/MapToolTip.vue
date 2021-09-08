<template>
  <div class="tooltip_bj">
    <p><b style="font-size:15px;">{{data.name}}区域</b></p>
    <p><span>项目：</span><span>{{ data.data.num }}个</span></p>
    <p><span>负责人：</span><span>{{ data.data.specialImportant }}</span></p>
    <p><span>出租率：</span><span>{{ data.data.import }}</span></p>
    <p><span>开业率：</span><span>{{ data.data.compare}}</span></p>
    <p><span>租金收入：</span><span>{{ data.data.common }}</span></p>
    <p><span>销售额：</span><span>{{ data.data.specail }}</span></p>
    <p style="color: #48A0C3; cursor: pointer;" @click="handlerDetail()">点击进入项目详情</p>
  </div>
</template>

<script>
export default {
  name: 'MapToolTip',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: '上海',
          data: {
            num: (Math.random() * 1000) | 0,
            specialImportant: (Math.random() * 1000) | 0,
            import: (Math.random() * 1000) | 0,
            compare: (Math.random() * 1000) | 0,
            common: (Math.random() * 1000) | 0,
            specail: (Math.random() * 1000) | 0
          }
        }
      }
    }
  },
  data() {
    return {
      value: false
    }
  },
  methods: {
    /**
     * 更多事件
     */
    handlerDetail() {
      this.$emit('detail', this.data)
    }
  }
}
</script>

<style lang="scss">
</style>

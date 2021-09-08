<template>
  <div>
    <!-- title组件 -->
    <ysn-title title="变更基础数据">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      /></div>
    </ysn-title>
    <!-- 表格 -->
    <el-collapse-transition>
      <div v-if="pokuer" class="mt-8">
        <ysn-table
          :checkbox="false"
          :data="detailedData.tableData"
          :column="detailedData.tableConfig"
          select-key="id"
          is-dis-table
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  data() {
    return {
      pokuer: true // 展开收起

    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
   .font-z-14{
       font-size:12px;
       color:#050101;
       .font-color{
           color:#050101;
           margin-left:8px;
       }
   }
</style>

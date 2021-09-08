<template>
  <div class="mt-24">
    <ysn-tabs
      dynamic
      :list="tabs_list"
      :active="tab_active"
      @change="handleChange"
      @toggle="handleToggle"
    />
    <!-- title组件 -->
    <ysn-title title="原单元基础信息" class="mt-16">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}
        <i
          class="font-color"
          :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
        /></div>
    </ysn-title>
    <!-- 详情组件-->
    <el-collapse-transition>
      <div v-if="pokuer" class="mt-8">
        <ysn-displayInfo
          :data="detailedData.displayinfoData"
          :config="detailedData.displayinfoConfigData"
          :column="6"
        />
        <!-- 表格组件 -->
        <ysn-title title="原单元一铺一价" class="mb-8" />
        <ysn-table
          :checkbox="false"
          :data="detailedData.primaryTableData"
          :column="detailedData.primaryTableConfig"
          select-key="id"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'OriginalUnit',
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tab_active: 0,
      tabs_list: [{ label: '第一单元' }],
      pokuer: true // 展开收起
    }
  },

  methods: {
    handleChange(event) {
      console.log(event.name)
      this.tab_active = parseInt(event.name)
    },
    handleToggle(type, index) {
      if (type === 'plus') {
        this.tabs_list.push({
          label: `第${this.tabs_list.length + 1}单元`
        })
      } else {
        console.log(index)
        this.tabs_list.splice(index, 1)
        this.tabs_list = this.tabs_list.map((item, index) => ({
          label: `第${index + 1}单元`
        }))
      }
    }
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


<template>
  <div class="mt-24">
    <ysn-tabs
      dynamic
      :list="tabs_list"
      active="1"
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
          :column="detailedData.displayInfoConfig"
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
      tabs_list: [
        {
          label: '第一单元',
          name: '1'
        },
        {
          label: '第二单元',
          name: '2'
        }
      ],
      pokuer: true // 展开收起

    }
  },

  methods: {
    handleChange(event) {

    },
    handleToggle(type, index) {
      console.log(index)
      if (type === 'plus') {
        // 对tabs渲染数组进行增加操作
        this.tabs_list.push({
          label: `第${index + 1}单元`, // tab 展示名称
          name: (index + 1).toString() // tab 绑定name
        })
      } else {
        // 对tabs渲染数组进行删除操作
        this.tabs_list.splice(index, 1)
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


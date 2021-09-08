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
    <ysn-title title="新单元基础信息" class="mt-16 mb-8">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      /></div>
    </ysn-title>
    <!-- 表单组件 -->
    <el-collapse-transition>
      <div v-if="pokuer">
        <ysn-displayInfo
          :data="detailedData.formData"
          :config="detailedData.configData"
          :column="6"
        />

        <!-- 表格组件 -->
        <ysn-table
          :checkbox="false"
          :data="detailedData.newTableData"
          :column="detailedData.newTableConfig"
          :show-operation="true"
          select-key="id"
          is-dis-table
        />
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'NewUnit',
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tabs_list: [{ label: '第一单元', name: '1' }],
      options: [{ value: '选项1', label: '黄金糕' }],
      pokuer: true
    }
  },

  methods: {
    // 操作列增加和删除
    addTable(row, index) {
      console.log(row, index)
      if (index === 0) {
        this.tableData.push({ name: '年度', isShowSlots: true })
        return
      }
      if (index !== 0) {
        this.tableData.splice(index, 1)
        return
      }
    },
    handleChange(event) {
    },
    handleToggle(type, index) {
      if (type === 'plus') {
        // 对tabs渲染数组进行增加操作
        this.tabs_list.push({
          label: `第${index + 1}单元`, // tab 展示名称
          name: (index + 1).toString() // tab 绑定name
        })
        this.$forceUpdate()
        // console.log(this.tabs_list.length)
        //  console.log(index)
      } else {
        // 对tabs渲染数组进行删除操作
        this.tabs_list.splice(index, 1)
        this.$forceUpdate()
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
   .text-center{
     text-align: center;
     .el-icon-circle-plus{
       color:#485F47;
     }
     .el-icon-remove{
       color:#6F120C;
     }
   }
</style>

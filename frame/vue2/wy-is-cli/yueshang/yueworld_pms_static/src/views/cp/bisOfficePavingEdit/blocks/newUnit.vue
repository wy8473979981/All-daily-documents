<template>
  <div class="mt-24">
    <ysn-tabs
      dynamic
      :list="tabs_list"
      :active="tab_active"
      @change="handleChange"
      @toggle="handleToggle"
    />
    <ysn-title title="新单元基础信息" class="mt-16">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      /></div>
    </ysn-title>
    <!-- 表单组件 -->
    <el-collapse-transition>
      <div v-if="pokuer">
        <slot name="newFormData" />
        <!-- 表格组件 -->
        <ysn-formTable
          ref="formTab"
          v-model="detailedData"
          prop="newTableData"
          :column="detailedData.newTableConfig"
          add
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
      tab_active: 0,
      tabs_list: [{ label: '第一单元' }],
      options: [{ value: '选项1', label: '黄金糕' }],
      pokuer: true
    }
  },

  methods: {
    handleChange(event) {
      console.log(event.name)
      this.$emit('tabChang', event.name)
      this.tab_active = parseInt(event.name)
    },
    handleToggle(type, index) {
      if (type === 'plus') {
        this.$emit('addFormData')
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
    },
    // 操作列增加和删除
    addTable(row, index) {
      this.$emit('addTableData', row, index)
      console.log(row, index)
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

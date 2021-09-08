<template>
  <div>
    <div class="d-flex tabStatusBox">
      <ysn-btn type="reset" class="">单元状态</ysn-btn>
      <ysn-btn :type="whole?'primary':'info'" @click="tabStatus(0)">全部</ysn-btn>
      <div class="ml-12 mr-12 wh-12" />
      <ysn-btn v-for="(item, index) in tabStatusList" :key="index" class="ml-8" :type="item.type?'primary':'info'" @click="tabStatus(item.status,index)">{{ item.name }}({{ item.value }})</ysn-btn>
    </div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" :is-search="true" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'RentalUnitList',
  props: {
    // 表格数据

    isShowDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      addId: [], // 保存选中的id
      whole: true, // 全部
      tabStatusList: [
        { name: '新建', value: 33, status: 1, type: false },
        { name: '合同', value: 20, status: 2, type: false },
        { name: '空置', value: 0, status: 3, type: false },
        { name: '失效', value: 10, status: 4, type: false }
      ],
      isPrimary: 'primary',
      isInfo: 'info',
      formData: {},
      configData: [ // 表单配置
        { itemType: 'input', prop: 'OfficeName', label: '', placeholder: '请输入单元名称关键字', width: '200px', isFirst: true, isSearch: true },
        { itemType: 'select', prop: 'ProgramName', label: '', placeholder: '请选择全部项目', width: '200px' },
        { itemType: 'select', prop: 'BuildingName', label: '', placeholder: '请选择全部楼栋', width: '200px', isFirst: true },
        { itemType: 'select', prop: 'FloorName', label: '', placeholder: '请选择全部楼层', width: '200px' },
        { itemType: 'select', prop: 'OfficeId', label: '', placeholder: '请选择单元号', width: '200px' }
      ]
    }
  },
  methods: {
    searchResult(data) {
      // 搜索字段
      this.$emit('tableStatusList', data)
    },
    // tab切换
    tabStatus(status, i) {
      // 点击全部 除了全部其他取消选中
      if (status === 0) {
        this.whole = !this.whole
        this.tabStatusList.map(item => {
          item.type = false
        })
        this.$emit('tableStatusList', [status])
        return
      } this.whole = false; this.tabStatusList[i].type = !this.tabStatusList[i].type
      this.addId.push(status)
      this.$emit('tableStatusList', this.addId)
    }
  }
}
</script>

<style scoped lang="scss">

		.tabStatusBox{padding:24px 0;}

</style>

<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="max-area">
    <div>{{ tableData.tableData }}</div>
    <!-- 按钮 -->
    <div>
      <div class="d-flex">
        <ysn-tableDesc :config="tableDescConfig" />
        <div class="el-icon-setting font-size-18" />
      </div>
      <div>
        <DialogForm :is-show-dialog="isShowDialog" :table-row="tableRow" @closeDialog="closeDialog" @closeDialogTableList="closeDialogTableList" />
      </div>
    </div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="tableData.data"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="openDetails"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @change="currentChange" />
  </div>
</template>

<script>
import DialogForm from './dialogForm'
export default {
  name: 'TableList',
  components: { DialogForm },
  props: {
    tableData: { type: Object, default: () => {} },
    page: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableRow: {}, // 表格行数据
      isShowDialog: false, // 弹窗显示关闭
      tableConfig: [
        { idx: '序号', type: 'index', sortable: true, width: '100px' },
        { programName: '项目', sortable: true },
        { buildingName: '楼栋名称', sortable: true },
        { floorId: '楼层编码', sortable: true },
        { floorName: '楼层名称', sortable: true },
        { floorGrossArea: '建筑面积(m²)', sortable: true },
        { floorLeasableArea: '计租面积(m²)', sortable: true },
        { floorStatus: '楼栋状态', sortable: true }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '建筑面积(m²)', value: this.tableData.FloorGrossAreaTotal },
        { text: '计租面积(m²)', value: this.tableData.FloorLeasableAreaTotal }
      ]
      return list
    }
  },
  methods: {
    // 分页
    currentChange(data) {
      console.log(data)
    },
    // 表格点击一列数据
    openDetails(row) {
      this.isShowDialog = !this.isShowDialog
      this.tableRow = row
      this.tableRow.floorPic = [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
    },
    // 关闭弹窗
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 通知外层刷新列表
    closeDialogTableList() {
      this.isShowDialog = !this.isShowDialog
      this.$emit('closeDialogTableList')
    }
  }
}
</script>

<style scoped lang="scss">
  .d-flex{
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      align-items: center;

  }
</style>

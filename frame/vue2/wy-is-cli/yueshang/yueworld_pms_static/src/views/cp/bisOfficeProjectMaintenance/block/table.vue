<template>
  <div class="max-area">
    <div class="flex-ju-between mb-12 ">
      <ysn-tableDesc :config="tableDescConfig" />
      <div class="d-flex flex-al-center">
        <!-- <ysn-btn class="mr-8">新增</ysn-btn> -->
        <AddDialog />
        <ysn-btn class="mr-16" type="info">导入</ysn-btn>
        <ysn-btn class="mr-16" type="reset">导出</ysn-btn>
        <div class="el-icon-setting font-size-18" />
      </div>
    </div>
    <ysn-table
      :data="tableList.data"
      :column="tableConfig1"
      select-key="id"
      full
      @row-click="tableRow"
    />
    <!-- 分页 -->
    <ysn-page :total="tableList.total" :page="page" @sizeChange="sizeChange" />
    <EditDialog :is-show-dialog="isShowDialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import AddDialog from './addDialog.vue'
import EditDialog from './editDialog.vue'
export default {
  name: 'BisOfficeProjectList',
  components: { AddDialog, EditDialog },
  props: {
    tableList: { type: Object, default: () => {} }
  },
  data() {
    return {
      isShowDialog: false,
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      tableData1: [

      ],
      tableConfig1: [
        { idx: '序号', type: 'index', width: '100px' },
        { programName: '项目', sortable: true },
        { programId: '项目编码', sortable: true },
        { programEquityNature: '产权性质', sortable: true },
        { programType: '经营类型', sortable: true },
        { programGrossArea: '建筑面积(m²)', sortable: true },
        { programLeasableArea: '技租面积(m²)', sortable: true },
        { programOperateStatus: '营运状态', sortable: true }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '建筑面积(m)', value: '' },
        { text: '计租面积(m)', value: '' }
      ]
      return list
    }
  },

  methods: {
    sizeChange() {},
    tableRow(row) {
      console.log(row)
      this.isShowDialog = !this.isShowDialog
    },
    //  关闭弹窗
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    }
  }
}
</script>

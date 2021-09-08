<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="max-area">
    <!-- 按钮组 -->
    <el-row :gutter="20" class="btnBox">
      <el-col :span="12">
        <div class="areaBox">
          <span>建筑面积(㎡)<em>{{ tableData.BuildingGrossAreaTotal }}</em></span>
          <span>计租面积(㎡)<em>{{ tableData.BuildingLeasableAreaTotal }}</em></span>
        </div>
      </el-col>
      <el-col :span="8" :offset="4">
        <el-row type="flex" justify="end">
          <DialogForm :is-show-dialog="isShowDialog" :table-row="tableRow" @tableRowDialog="tableRowDialog" @successTableList="successTableList" />
          <ysn-btn type="info">导入</ysn-btn>
          <ysn-btn type="reset">导出</ysn-btn>
          <div class="el-icon-setting font-size-18" />
        </el-row>
      </el-col>
    </el-row>
    <ysn-table full :data="tableData.tableData" :column="tableConfig" :checkbox="false" select-key="id" :show-operation="true">
      <template #default="scope">
        <el-button type="text" size="small">{{ scope.row.BtnText }}</el-button>
      </template>
    </ysn-table>

    <ysn-page :total="tableData.total" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import DialogForm from './dialogForm'
export default {
  name: 'RentalUnitList',
  components: { DialogForm },
  props: {
    tableData: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      tableConfig: [
        { Index: '序号', type: 'index' },
        { ProgramName: '项目', sortable: true },
        { BuildingName: '楼栋', sortable: true },
        { FloorName: '楼层', sortable: true },
        { OfficeName: '单元号', sortable: true },
        { OfficeType: '营运类型', sortable: true },
        { OfficeGrossArea: '建筑面积', sortable: true },
        { OfficeLeasableAreaTotal: '计租面积', sortable: true },
        { OfficeStatus: '状态', sortable: true }
      ],
      isShowDialog: false, // 弹窗控制
      tableRow: {}// 表格一列数据
    }
  },

  methods: {
    // 分页
    sizeChange(data) {
      // console.log(data)
    },
    currentChange(data) {
      // console.log(data)
    },
    // 关闭弹窗
    tableRowDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 新增成功通知外层组件刷新列表
    successTableList() {
      this.$emit('successTableList')
    }
  }
}
</script>
<style scoped lang="scss">
		.btnBox{padding: 16px 0;
			.areaBox{
				span,em{display:inline-block;}
				span{padding-right:16px;font-size: 14px;color:#050101;
					em{padding-left: 5px; font-style: normal;font-weight:600; font-size: 18px;color:#1C4C7F}

				}
			}
			.el-icon-setting{font-size:16px;
				&:before{vertical-align: -webkit-baseline-middle}
			}
		}
</style>

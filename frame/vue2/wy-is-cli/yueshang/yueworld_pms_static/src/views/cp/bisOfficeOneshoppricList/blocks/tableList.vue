<template>
  <div class="max-area">
    <!-- 按钮 -->
    <div class="d-flex">
      <div class="flex" />
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      :show-slots="['idx']"
      select-key="id"
      full
      @row-click="openDetails"
    >
      <template #idx="scope">
        <div>
          {{ scope.$index+1 }}
        </div>
      </template>
    </ysn-table>
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @change="currentChange" />
    <!-- 弹窗 -->
    <DialogTable v-if="isShowDialog" :dialogd-details="dialogdDetails" :is-show-dialog="isShowDialog" @closeDialog="closeDialog" @addTable="addTable" />
  </div>
</template>

<script>
import DialogTable from './dialogTable'
import { buildingApi } from '@/api'
export default {
  name: 'TableList',
  components: { DialogTable },
  props: {
    tableData: { type: Array, default: () => [] }, // 表格数据
    page: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialogdDetails: {
        year: {
          buildingName: '',
          floorName: '',
          officeName: '',
          programName: '',
          standardDecorationDeposit: '',
          standardDeposit: '',
          standardRentFreePeriod: ''
        }
      }, // 弹窗详情数据
      isShowDialog: false, // 弹窗控制
      tableRow: {}, // 表格一列数据
      tableConfig: [
        { idx: '序号', isShowSlots: true },
        { standardYear: '标准年度', sortable: true },
        { feeName: '项目', sortable: true },
        { buildingName: '楼栋', sortable: true },
        { floorName: '楼层', sortable: true },
        { officeName: '单元号', sortable: true },
        { detail: '详情', sortable: true }
      ]
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

    // 点击行事件
    openDetails(row, column) {
      this.isShowDialog = !this.isShowDialog
      //  弹窗接口
      buildingApi.bisOfficeoneShopPriceDetails().then(res => {
        this.dialogdDetails = JSON.parse(JSON.stringify(res))
      })
    },
    // 操作列添加和删除
    addTable(row, index) {
      if (index === 0) {
        this.dialogdDetails.detailed.push({ FeeName: '', StandardFee: '', StandardFeeTimeUnit: '', StandardFeeIncreasing: '' })
        return
      }
      if (index !== 0) {
        this.dialogdDetails.detailed.splice(index, 1)
        return
      }
    },
    closeDialog(bl) {
      // console.log( this.dialogdDetails)
      if (bl) { // 发起审核
        buildingApi.bisOfficeoneShopPricExamine(this.dialogdDetails).then(res => {
          this.isShowDialog = !this.isShowDialog
          this.$emit('toUpdate')// 更新数据
        })
        return
      }
      this.isShowDialog = !this.isShowDialog
    }
  //  closeDialogTableList(){},
  }
}
</script>

<style scoped lang="scss">
  .d-flex{
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      align-items: center;
      .flex{
          display:flex;
         .font-color{
            display: flex;
            align-items: center;
            font-size:14px;
            color:#050101;
            .font-color-blue{
              margin-left:4px;
              color:#1C4C7F;
              font-size:18px;
            }
          }
      }
      .font-size-18{
          font-size:16px;
      }
      .text-right{
        display: flex;
        flex-direction:row-reverse;
      }
  }
</style>

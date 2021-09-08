<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="page"
      :key="update"
      :status-search-config="statusSearchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      :hide-page="true"
      persmission="demo"
      :table-slots="['volumeTwo', 'confirmSalesVolume', 'volumeOne']"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <template #pageTop>
        <div class="pb-20"> {{ formData.contInfo }} </div>
        <div class="flex-ju-al-between">
          <div style="width:460px">
            <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
              <div class="flex-wrap ysn-form text">
                <el-form-item
                  key="form-item0"
                  class="pr-8 pb-10 mb-8"
                  :style="{width:'50%'}"
                  label="时间"
                >
                  <div
                    class="ysn-data-picker"
                    @mouseover="handleMouseover"
                    @mouseleave="handleMouseout"
                  >
                    <el-date-picker
                      v-model="formData.statPeriod"
                      type="daterange"
                      range-separator="~"
                      class="ysn-el-date"
                      prefix-icon="none"
                      :disabled="true"
                    />
                    <span v-if="formData.closeIconShow" class="el-input__suffix cursor-pointer" @mouseover.stop="handleCloseMouseover" @mouseout.stop="handleCloseMouseout" @click="clearDate">
                      <span class="el-input__suffix-inner">
                        <i class="el-input__icon el-icon-circle-close" />
                      </span>
                      <i class="el-input__icon el-input__validateIcon el-icon-circle-check" />
                    </span>
                    <span v-else class="el-input__prefix ysn-el-date-icon "><i class="el-input__icon el-icon-date" /></span>
                  </div>
                </el-form-item>
                <el-form-item
                  key="form-item1"
                  class="pr-8 pb-10 mb-8"
                  :style="{width:'50%'}"
                >
                  <template #label>
                    <div style="display:inline-block">
                      <el-tooltip content="净销售（扣除混合税费）" class="item" effect="dark" placement="top-start">
                        <div color="#1C4C7F" disable-transitions style="vertical-align:middle">
                          <span>净销售额填报</span>
                          <svg-icon icon-class="net-sales" class="icon" />
                        </div>
                      </el-tooltip>
                    </div>
                    <el-input
                      v-model="formData.netSalesVolume"
                      v-onlyNumber="{model:['formData', 'netSalesVolume']}"
                      :disabled="formData.netSalesVolumeStatus!=0"
                      @change="netChange"
                    >
                      <template slot="suffix">
                        <el-tooltip v-if=" formData.netSalesVolumeStatus == 2 " class="item mr-16" effect="dark" placement="top-start">
                          <div slot="content">原复核销售额(元)：{{ changeNumber(formData.netSalesVolumeOld) }} <br> 修改理由：{{ formData.resonForChange }}</div>
                          <svg-icon icon-class="detail-blue" class="icon" />
                        </el-tooltip>
                        <ysn-btn v-if=" formData.netSalesVolumeStatus == 1 " class="mr-8" type="text" @click="netSalesVolumeChange">调整</ysn-btn>
                        <ysn-btn v-if=" formData.netSalesVolumeStatus == 2 " class="mr-8" type="text" @click="netSalesVolumeCheck">审核</ysn-btn>
                        <ysn-btn v-if=" formData.netSalesVolumeStatus == 2 " class="mr-8" type="text" @click="netSalesVolumeBack">驳回</ysn-btn>
                      </template>
                    </el-input>
                  </template>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div>
            <span v-if="commissionRentalShow">当前提成租金(元) <span class="font-color-blue font-18 text-weight-bold ">{{ changeNumber(formData.commissionRental) }}</span></span>
          </div>
          <div>
            <ysn-btn class="mr-8" @click="trialPercentageComputed">试算提成租金</ysn-btn>
            <ysn-btn class="mr-8" :disabled="formData.netSalesVolumeStatus!=0" @click="percentageComputed">生成提成租金</ysn-btn>
            <ysn-btn @click="save">保存</ysn-btn>
          </div>
        </div>
      </template>
      <!-- 列表操作列插槽 -->
      <template #default="scope">
        <div class="d-flex">
          <ysn-btn v-if="itemStatusMatch(scope.row.checkStatusSales, [0,3])" type="text" class="mr-8" @click="checkItem(scope.row)">审核</ysn-btn>
          <ysn-btn v-if="itemStatusMatch(scope.row.checkStatusSales, [1,4])" type="text" class="mr-8" @click="reviewItem(scope.row)">复核</ysn-btn>
          <ysn-btn v-if="itemStatusMatch(scope.row.checkStatusSales, [1,4])" type="text" class="mr-8" @click="backItem(scope.row)">驳回</ysn-btn>
          <AccessoryDialog :disabled="true">
            <ysn-btn type="reset" class="mr-8">{{ '查看附件' }}</ysn-btn>
          </AccessoryDialog>
          <ysn-btn v-if="itemStatusMatch(scope.row.checkStatusSales, [2,5])" type="text" class="mr-8" @click="changeItem(scope)">调整</ysn-btn>
          <ysn-btn v-if="scope.row.checkStatusSales==5" type="text" class="mr-8" @click="changeHistoryItem(scope.row)">调整记录</ysn-btn>
        </div>
      </template>

      <template #volumeTwo="scope">
        <ysn-btn v-if="formData.isClassDeduction" type="text" @click="showVolumeTwo(scope.row.confirmSalesVolumeCategoryDetail)">{{ changeNumber(scope.row.volumeTwo) }}</ysn-btn>
        <span v-else>{{ changeNumber(scope.row.volumeTwo) }}</span>
      </template>
      <template #volumeOne="scope">
        <ysn-btn v-if="formData.isClassDeduction" type="text" @click="showVolumeTwo(scope.row.confirmSalesVolumeCategoryDetail)">{{ changeNumber(scope.row.volumeOne) }}</ysn-btn>
        <span v-else>{{ changeNumber(scope.row.volumeOne) }}</span>
      </template>
      <template #confirmSalesVolume="scope">
        <div v-if="itemStatusMatch(scope.row.checkStatusSales, [0,3])">
          <ysn-btn v-if="formData.isClassDeduction" type="text" @click="showCheckConfirm(scope)">{{ changeNumber(scope.row.confirmSalesVolume) }}</ysn-btn>
          <span v-else class="ysn-form">
            <el-input
              v-model="formData.list[scope.$index].confirmSalesVolume"
              v-onlyNumber="{model:['formData','list',scope.$index,'confirmSalesVolume']}"
              @change="checkConfirmChange(formData.list[scope.$index])"
            />
          </span>
        </div>
        <div v-else-if="itemStatusMatch(scope.row.checkStatusSales, [1,2,5])">
          <ysn-btn v-if="formData.isClassDeduction" type="text" @click="showCheckedConfirm(scope.row)">{{ changeNumber(scope.row.confirmSalesVolume) }}</ysn-btn>
          <span v-else>{{ changeNumber(scope.row.confirmSalesVolume) }}</span>
        </div>
        <div v-else>
          <ysn-btn v-if="formData.isClassDeduction" type="text" @click="showCheckingConfirm(scope.row)">{{ changeNumber(scope.row.confirmSalesVolume) }}</ysn-btn>
          <div v-else>
            {{ changeNumber(scope.row.confirmSalesVolume) }}
            <el-tooltip class="item mr-16" effect="dark" placement="top-start">
              <div slot="content">原复核销售额(元)：{{ changeNumber(scope.row.netSalesVolumeOld) }} <br> 修改理由：{{ scope.row.resonForChange }}</div>
              <svg-icon icon-class="detail-blue" class="icon" />
            </el-tooltip>
          </div>
        </div>
      </template>
      <!-- <template v-else #confirmSalesVolume="scope">
        <div v-if="itemStatusMatch(scope.row.checkStatusSales, [0,3])">
          <el-input v-model="scope.row.confirmSalesVolume" />
        </div>
        <div v-else-if="itemStatusMatch(scope.row.checkStatusSales, [1,2,5])">
          {{ changeNumber(scope.row.confirmSalesVolume) }}
        </div>
        <div v-else>
          {{ changeNumber(scope.row.confirmSalesVolume) }}
          <el-tooltip class="item mr-16" effect="dark" placement="top-start">
            <div slot="content">原复核销售额(元)：{{ scope.row.netSalesVolumeOld }} <br> 修改理由：{{ scope.row.resonForChange }}</div>
            <svg-icon icon-class="detail-blue" class="icon" />
          </el-tooltip>
        </div>
      </template> -->

    </YsnPageContent>
    <NetSalesVolumeChange
      :form-data="formData.netSalesVolumeChangeForm"
      :is-show-dialog="dialogs.netSalesVolume.visible"
      @closeDialog="Object.assign(dialogs.netSalesVolume, { visible: false, record: {} })"
      @commitChange="netSalesVolumeChangeCommit"
    />
    <ItemChange
      :form-data="formData.itemChangeForm"
      :is-show-dialog="dialogs.itemChange.visible"
      @closeDialog="Object.assign(dialogs.itemChange, { visible: false, record: {} })"
      @commitChange="confirmSalesVolumeChangeCommit"
    />
    <ItemChangeHistory
      :form-data="formData.itemChangeHistoryForm"
      :is-show-dialog="dialogs.itemChangeHistory.visible"
      @closeDialog="Object.assign(dialogs.itemChangeHistory, { visible: false, record: {} })"
    />
    <CategoryItemChange
      :form-data="formData.categoryItemChangeForm"
      :is-show-dialog="dialogs.categoryItemChange.visible"
      @closeDialog="Object.assign(dialogs.categoryItemChange, { visible: false, record: {} })"
      @commitChange="confirmCategoryChangeCommit"
    />
    <CategoryItemChangeHistory
      :form-data="formData.categoryItemChangeHistoryForm"
      :is-show-dialog="dialogs.categoryItemChangeHistory.visible"
      @closeDialog="Object.assign(dialogs.categoryItemChangeHistory, { visible: false, record: {} })"
    />
    <CheckConfirm
      :form-data="formData.checkConfirmForm"
      :is-show-dialog="dialogs.checkConfirm.visible"
      @closeDialog="Object.assign(dialogs.checkConfirm, { visible: false, record: {} })"
      @commitChange="confirmCategorySalesVolumeChange"
    />
    <CheckedConfirm
      :form-data="formData.checkConfirmForm"
      :is-show-dialog="dialogs.checkedConfirm.visible"
      @closeDialog="Object.assign(dialogs.checkedConfirm, { visible: false, record: {} })"
    />
    <CheckVolumeTwo
      :form-data="formData.checkVolumeTwo"
      :is-show-dialog="dialogs.checkedVolumeTwo.visible"
      @closeDialog="Object.assign(dialogs.checkedVolumeTwo, { visible: false, record: {} })"
    />
    <CheckingConfirm
      :form-data="formData.checkingConfirmForm"
      :is-show-dialog="dialogs.checkingConfirm.visible"
      @closeDialog="Object.assign(dialogs.checkingConfirm, { visible: false, record: {} })"
    />
  </div>
</template>

<script>
import { salesVolumeApi } from '@/api'
import { numFormat } from '@/utils'
import { tableConfig, tableDescConfig, statusSearchConfig, formData } from './config'
import NetSalesVolumeChange from './blocks/netSalesVolumeChange.vue'
import ItemChange from './blocks/itemChange.vue'
import ItemChangeHistory from './blocks/itemChangeHistory'
import CategoryItemChange from './blocks/categoryItemChange.vue'
import CategoryItemChangeHistory from './blocks/categoryItemChangeHistory.vue'
import CheckConfirm from './blocks/item/checkConfirm.vue'
import CheckedConfirm from './blocks/item/checkedConfirm.vue'
import CheckingConfirm from './blocks/item/checkingConfirm.vue'
import CheckVolumeTwo from './blocks/item/checkVolumeTwo.vue'
import AccessoryDialog from '../../../../comContent/ysn-pageAccorDetail/blocks/AccessoryDialog.vue'
import { formatNumber } from '@/utils/index'
export default {
  name: 'SalesVolumeBook',
  components: {
    NetSalesVolumeChange,
    ItemChange,
    ItemChangeHistory,
    CategoryItemChange,
    CategoryItemChangeHistory,
    CheckConfirm,
    CheckedConfirm,
    CheckingConfirm,
    AccessoryDialog,
    CheckVolumeTwo
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        checkStatusSales: '',
        fuzzyEnquiry: ''
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: salesVolumeApi.salesVolumeBookByDayList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: true,
        operationWidth: '200',
        showSlots: ['volumeTwo', 'confirmSalesVolume', 'volumeOne']
      },

      formData: formData.call(this),

      // 请求后的数据
      reqData: {},
      dialogs: {
        netSalesVolume: {
          visible: false
        },
        itemChange: {
          visible: false
        },
        itemChangeHistory: {
          visible: false
        },
        categoryItemChange: {
          visible: false
        },
        categoryItemChangeHistory: {
          visible: false
        },
        checkConfirm: {
          visible: false
        },
        checkedConfirm: {
          visible: false
        },
        checkedVolumeOne: {
          visible: false
        },
        checkedVolumeTwo: {
          visible: false
        },
        checkingConfirm: {
          visible: false
        }
      },
      commissionRentalShow: false,
      saveData: {
        confirmVolume: []
      },
      update: 0 // 更新key
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.id = this.$route.query.id
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
      this.formData = formData.call(this, data)
    },
    // 列表单行点击
    rowClick(row) {
      console.log(row)
    },
    inputChange(val) {
      console.log(val)
    },
    testBtn(scope) {
      console.log(scope)
      this.showCheckingConfirm()
    },
    trialPercentageComputed() {
      salesVolumeApi.tryComputeNetSales({ id: this.$route.query.id }).then(res => {
        this.formData.commissionRental = res.data.commissionRental
        this.commissionRentalShow = true
      })
    },
    percentageComputed() {
      // 生成净销售额
      this.formData.netSalesVolumeStatus = 1
    },
    netSalesVolumeChangeCommit(data) {
      // 净销售额审核
      this.formData.netSalesVolumeOld = this.formData.netSalesVolume
      this.formData.netSalesVolume = data.netSalesVolumeNew
      this.formData.resonForChange = data.resonForChange
      this.formData.netSalesVolumeStatus = 2
      this.dialogs.netSalesVolume.visible = false
    },
    confirmSalesVolumeChangeCommit(data) {
      // 非品类调整提交
      salesVolumeApi.confirmItemChange({
        id: data.id,
        confirmSalesVolumeNew: data.confirmSalesVolumeNew,
        resonForChange: data.resonForChange
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        this.dialogs.itemChange.visible = false
        this.$refs.page.getList()
      })
    },
    confirmCategoryChangeCommit(data) {
      // 品类调整提交
      salesVolumeApi.confirmCategoryItemChange({
        id: data.id,
        details: data.tableList
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        this.dialogs.categoryItemChange.visible = false
        this.$refs.page.getList()
      })
    },
    confirmCategorySalesVolumeChange(data) {
      // 品类复核销售额修改
      var res = 0
      var obj = { data: [], id: data.id }
      for (var i in data) {
        if (i !== 'id' && i !== 'idx') {
          res = this.accAdd(res, data[i])
          obj.data.push({
            classificationNo: i,
            confirmSalesVolume: data[i]
          })
        }
      }
      this.saveData.confirmVolume.forEach((e, i) => {
        if (e.id === obj.id) {
          this.saveData.splice(i, 1)
        }
      })
      this.saveData.confirmVolume.push(obj)
      this.$refs.page.tableData[data.idx].confirmSalesVolume = res
      this.dialogs.checkConfirm.visible = false
    },
    checkConfirmChange(val) {
      this.saveData.confirmVolume.forEach((e, i) => {
        if (e.id === val.id) {
          this.saveData.splice(i, 1)
        }
      })
      this.saveData.confirmVolume.push({
        id: val.id,
        confirmSalesVolume: val.confirmSalesVolume
      })
    },
    netChange() {
      // 净销售额修改
      this.saveData.netSalesVolume = this.formData.netSalesVolume
    },
    save() {
      // 保存
      salesVolumeApi.save({
        id: this.$route.id,
        data: this.saveData
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
      })
    },
    netSalesVolumeChange() {
      // 净销售额调整
      this.formData.netSalesVolumeChangeForm.netSalesVolume = {
        tableList: [{
          netSalesVolumeOld: this.formData.netSalesVolume,
          netSalesVolumeNew: '',
          difference: '',
          resonForChange: '',
          attachment: this.formData.attachment
        }]
      }
      this.formData.netSalesVolumeChangeForm.netSalesVolumeHistory = {
        tableList: this.formData.netSalesVolumeHistory
      }
      this.dialogs.netSalesVolume.visible = true
    },
    netSalesVolumeCheck() {
      // 审核净销售额
      salesVolumeApi.netSalesVolumeCommit({
        id: this.$route.query.id,
        netSalesVolumeNew: this.formData.netSalesVolume,
        netSalesVolumeOld: this.formData.netSalesVolumeOld,
        resonForChange: this.formData.resonForChange
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        this.formData.netSalesVolumeOld = ''
        this.formData.resonForChange = ''
        this.formData.netSalesVolumeStatus = 1
      })
    },
    netSalesVolumeBack() {
      // 驳回净销售额
      this.formData.netSalesVolume = this.formData.netSalesVolumeOld
      this.formData.netSalesVolumeOld = ''
      this.formData.resonForChange = ''
      this.formData.netSalesVolumeStatus = 1
    },
    handleMouseover() {
      if (this.formData.statPeriod) {
        this.formData.closeIconShow = true
      } else {
        this.formData.closeIconShow = false
      }
    },
    handleCloseMouseover(e) {
      this.formData.closeIconShow = true
      this.mouserOverClose = true
    },
    handleMouseout() {
      if (this.mouserOverClose) {
        return
      }
      this.formData.closeIconShow = false
    },
    handleCloseMouseout() {
      this.mouserOverClose = false
    },
    clearDate() {
      // this.formData.statPeriod = []
    },
    itemStatusMatch(value, matchValue) {
      if (matchValue.indexOf(value) > -1) {
        return true
      }
      return false
    },
    checkItem(item) {
      // 复核销售额审核
      if (item.confirmSalesVolumeCategoryDetail) {
        salesVolumeApi.categoryConfirmSalesVolumeCommit({
          id: item.id,
          confirmSalesVolumeCategoryDetail: item.confirmSalesVolumeCategoryDetail
        }).then(res => {
          if (res) {
            this.$message({ message: '提交成功', type: 'success' })
          }
          this.$refs.page.getList()
        })
      } else {
        // 审核
        salesVolumeApi.confirmSalesVolumeCommit({
          id: item.id,
          confirmSalesVolume: item.confirmSalesVolume
        }).then(res => {
          if (res) {
            this.$message({ message: '提交成功', type: 'success' })
          }
          this.$refs.page.getList()
        })
      }
    },
    reviewItem(item) {
      // 复核销售额复核
      salesVolumeApi.confirmSalesVolumeReview({
        id: item.id
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        this.$refs.page.getList()
      })
    },
    backItem(item) {
      // 复核销售额驳回
      salesVolumeApi.confirmSalesVolumeBack({
        id: item.id
      }).then(res => {
        if (res) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        this.$refs.page.getList()
      })
    },
    changeItem(item) {
      // 复核销售额调整
      if (item.row.confirmSalesVolumeCategoryDetail) {
        this.showCategoryChangeDialog(item)
      } else {
        this.showItemChangeDialog(item)
      }
    },
    changeHistoryItem(item) {
      // 调整记录
      if (item.confirmSalesVolumeCategoryDetail) {
        this.showCategoryChangeHistoryDialog(item)
      } else {
        this.showItemChangeHistoryDialog(item)
      }
    },
    showItemChangeDialog(item) {
      this.formData.itemChangeForm = {
        tableList: [{
          confirmSalesVolumeOld: item.row.confirmSalesVolume,
          confirmSalesVolumeNew: '',
          difference: '',
          resonForChange: '',
          attachment: item.row.attachment ? item.row.attachment : []
        }],
        id: item.row.id
      }
      this.dialogs.itemChange.visible = true
    },
    showItemChangeHistoryDialog(item) {
      this.formData.itemChangeHistoryForm = {
        tableList: item.netSalesVolumeHistory
      }
      this.dialogs.itemChangeHistory.visible = true
    },
    showCategoryChangeDialog(item) {
      this.formData.categoryItemChangeForm = {
        tableList: item.row.confirmSalesVolumeCategoryDetail,
        id: item.row.id
      }
      this.dialogs.categoryItemChange.visible = true
    },
    showCategoryChangeHistoryDialog(item) {
      this.formData.categoryItemChangeHistoryForm = {
        tableList: item.confirmSalesVolumeCategoryDetail
      }
      this.dialogs.categoryItemChangeHistory.visible = true
    },
    showCheckConfirm(item) {
      this.formData.checkConfirmForm = {
        tableList: item.row.confirmSalesVolumeCategoryDetail,
        id: item.row.id,
        idx: item.$index
      }
      this.dialogs.checkConfirm.visible = true
    },
    showCheckedConfirm(item) {
      this.formData.checkConfirmForm = {
        tableList: item.confirmSalesVolumeCategoryDetail
      }
      this.dialogs.checkedConfirm.visible = true
    },
    showVolumeTwo(item) {
      this.formData.checkVolumeTwo = {
        tableList: item
      }
      this.dialogs.checkedVolumeTwo.visible = true
    },
    showVolumeOne(item) {
      this.formData.checkVolumeOne = {
        tableList: item.confirmSalesVolumeCategoryDetail
      }
      this.dialogs.checkedVolumeOne.visible = true
    },
    showCheckingConfirm(item) {
      this.formData.checkingConfirmForm = {
        tableList: item.confirmSalesVolumeCategoryDetail,
        resonForChange: item.resonForChange
      }
      this.dialogs.checkingConfirm.visible = true
    },
    toThousands(num) { /* 数量每个三位数加个逗号 */
      // var result = []; var counter = 0
      // num = (num || 0).toString().split('')
      // for (var i = num.length - 1; i >= 0; i--) {
      //   counter++
      //   result.unshift(num[i])
      //   if (!(counter % 3) && i !== 0) { result.unshift(',') }
      // }
      // return result.join('')
      return num
    },
    accAdd(arg1, arg2) {
      var r1, r2, max
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      max = Math.pow(10, Math.max(r1, r2))
      return (arg1 * max + arg2 * max) / max
    },
    numFormat(num) {
      return numFormat(num)
    },
    changeNumber(num) {
      const number = Number(num)
      return formatNumber(number)
    }
  }
}
</script>
<style lang="scss" scoped>
$inputBg:#FDFCFA;
  .ysn-data-picker{
    position: relative;
    width: 100%;
    height: 32px;
    background: #FDFCFA;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #050101;
    padding-left:16px ;
    padding-right: 40px;
    .height100{
      height: 100%;
    }
    .ysn-el-date{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
    }
    .ysn-el-date-icon{
      position: absolute;
      z-index: 3;
      right: 5px;
      left: inherit;
      .el-input__icon{
        line-height: 32px;
      }
    }
    .el-input__suffix{
      line-height: 32px;
      display: flex;
      align-items: center;
      z-index: 3;
    }
    .el-range__close-icon{
      display: none;
    }
    .el-input__inner {
      padding-left:16px;
      line-height: 32px;
      height: 32px;
      &:hover{
        cursor: pointer;
      }
    }
    .el-range__icon.none{
      display: none;
    }
  }
.font-color-blue{
  color:#1C4C7F;
}
</style>

<!--
 * @Author: xiaoxie
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="GroupingSchemeListAdd"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="handlerClick(1)">保存</ysn-btn>
        <ysn-btn v-if="$route.query.id" class="ml-8" @click="handlerClick(0)">复制</ysn-btn>
      </template>
      <template #baseInfo>
        <ysn-btn type="text" @click="handlClick">配置字段</ysn-btn>
      </template>

    </ysn-pageAccorDetail>
    <popupMenu
      :is-show-dialog="flag"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import { getOptionsLabel } from '@/filters/index'
// 请求api
import { pageConfig } from './config'
import { groupingSchemeListAdd } from '@/api'
import popupMenu from './blocks/popupmenu'

export default {
  name: 'GroupingSchemeListAdd',
  components: { popupMenu },
  props: {},
  data() {
    return {
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      flag: false,
      // 统一数据
      formData: {
        essential: {
          programName: '', // 项目
          ruleName: '正常', // 方案名称
          storeTypes: '', // 铺位类型
          contractNameGenerateRuleIds: [], // 合同名称
          ruleType: '', // 方案状态
          pushType: '' // 台账推送方式
        },
        contract: {
          taxTypeId: 1, // 计税类型
          centralizedId: 2, // 收银类型
          attributeId: 1, // 合同属性
          signedId: 1, // 合同签署
          areaType: 1 // 计租面积类型
        },
        greeting: {
          spaceMandatoryId: 1, // 铺位强控
          showPackageId: '', // 是否显示一铺一价表
          calculatePlanType: '', // 尾差计算方式
          mzqPlanType: '', // 免租计算方式
          receivablePriorContract: '', // 应收早于合同
          schemeType: '', // 显示方式
          enablePaymentDay: 1, // 是否启用首账期
          editingTotalAmount: '' // 是否编辑首账期总额
        },
        arrange: {
          isShowDecorateStartDate: 1, // 是否显示装修进场日
          isShowDecorateEndDate: 1, // 是否显示装修结束日
          isShowDecoratePeriod: 1, // 是否显示装修期
          isShowOpeningDate: 1, // 是否显示开业期
          isShowTotalAmount: 2, // 是否显示合同总额
          isBrandRequired: '' // 品牌名是否必填

        },
        formlist: {
          tableData: []
        },
        formula: {
          fixedMonthDayNumber: '', // 固定月天数
          fixedYearDayNumber: '', // 固定年天数
          full1001Id: '', // 日单价/整月
          full1002Id: '', // 月单价/整月
          full1003Id: '', // 月总额/整月
          full1004Id: '', // 年单价/整月
          full1005Id: '', // 年总额/整月
          tableData: [
            { name: '整月应收', full1001Id: '', full1002Id: '', full1003Id: '', full1004Id: '', full1005Id: '' },
            { name: '非整月应收', full1001Id: '', full1002Id: '', full1003Id: '', full1004Id: '', full1005Id: '' }
          ]
        },
        reimbursement: {
          tableData: [
            { name: 1001, conFeeType: '固定租金', discriminatorId: '周期性', feeName: '出入证押金', isJoinFree: '不允许', isRequire: '是', feeState: '正常' },
            { name: 1002, conFeeType: '建筑垃圾清理费', discriminatorId: '一次性', feeName: '停车场费用', isJoinFree: '不允许', isRequire: '是', feeState: '正常' }
          ]
        },
        bedding: {
          tableData: [
            { name: 1001, feeName: '出入证押金', packageType: '单价,月总额', acrossYears: '开始年', packageState: '正常' },
            { name: 1002, feeName: '停车场费用', packageType: '单价,月总额', acrossYears: '结束年', packageState: '失效' }

          ]
        }

      },
      // 接口请求配置
      queryConfig: {
        api: groupingSchemeListAdd.groupingSchemeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      update: 0
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        // id: this.$route.query.id
        id: 1
      }
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
    if (this.$route.query.type) {
      const datas = {
        // id: this.$route.query.id
        id: 1
      }
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    async handlerClick(id) {
      // 更新视图 后续操作需要nextTick
      this.update++
      if (id) {
        this.$nextTick(async() => {
        // 校验是否符合规则
          console.log(this.formData)
          const res = await this.$refs.pageDetail.valiFormDate()
          if (res) {
            this.saveDecorationEnterBox(this.formData)
          }
          console.log(res)
        })
      } else {
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          // this.saveDecorationEnterBox(this.formData)
          this.$router.push({ name: 'GroupingSchemeListAdd', query: { type: 'copy' }})
        }
      }
    },
    // 详情
    decorationEnterDetailBox(datas) {
      const that = this
      groupingSchemeListAdd.brandPositioningDetail(datas).then(res => {
        that.formData = res
        console.log(res.greeting.showPackageId)
        if (res.greeting.showPackageId === '不显示') {
          const newArr = this.pageConfig.filter(i => {
            return i.title !== '一铺一价配置'
          })
          this.pageConfig = newArr
        }
        if (res.reimbursement.tableData !== undefined && res.reimbursement.tableData.length > 0) {
          console.log(res.reimbursement.tableData)
          that.formData.reimbursement.tableData = res.reimbursement.tableData
          that.formData.reimbursement.tableData.map(i => {
            i.feeName = i.feeName.feeName
          })
        }
        if (res.formula.tableData !== undefined && res.formula.tableData.length > 0) {
          that.formData.formula.tableData = res.formula.tableData
          console.log(res.formula.tableData)
          that.formData.formula.tableData.map(i => {
            i.full1001Id = getOptionsLabel(i.full1001Id, 'fullMonths')
          })
        }
        if (res.bedding.tableData !== undefined && res.bedding.tableData.length > 0) {
          that.formData.bedding.tableData = res.bedding.tableData
        }
        that.update++
      })
    },
    // 保存的请求
    saveDecorationEnterBox(datas) {
      const that = this
      groupingSchemeListAdd.groupingSchemeList(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    },
    // 配置字段弹窗
    handlClick() {
      this.update++
      this.flag = true
    },
    // 关闭弹窗
    closeDialog(datas) {
      this.flag = false
      if (datas) {
        this.formData.formlist.tableData.push(datas)
      }
    },
    // 点击
    detailChange(val) {
      console.log(val)
      this.formData = val
    }
  }
}
</script>

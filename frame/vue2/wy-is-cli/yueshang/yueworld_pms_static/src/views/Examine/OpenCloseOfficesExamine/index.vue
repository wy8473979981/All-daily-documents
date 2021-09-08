<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 手风琴详情页配置
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorGroupDetail
      ref="pageDetail"
      v-model="formData"
      :examine="examine"
      :accessory="accessory"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :dynamic="false"
      @tabsToggle="tabsToggle"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-confirm
          v-if="id!==0"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorGroupDetail>
  </div>
</template>
<script>
// 请求api
import { pageConfig } from './config'
import { baseOfficesApi } from '@/api'
export default {
  name: 'OpenCloseOfficesExamine',
  components: { },
  props: {},
  data() {
    return {
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 审核页面
      examine: 'OpenCloseOfficesList',
      // 显示附件
      accessory: 'show',
      id: null,
      // 统一数据
      formData: {
        // 基本数据
        baseInfo: {
          programName: '',
          OfficeId: []
        },
        // 变更数据
        logData: {
          tableData: []
        },
        groupShopOld: [
          {
            id: 0,
            baseInfo: {},
            priceInfo: {
              tableData: []
            }
          }
        ],
        // 新铺位
        groupShopNew: [{
          baseInfo: {
            otherArea: []
          },
          priceInfo: {
            tableData: [
              {
                // 年度
                standardYear: '',
                // 	费项名称
                feeName: '',
                // 	费项标准(元/m²)
                standardFee: '',
                // 	费项时间单位
                standardFeeTimeUnit: '',
                // 递增率(%)
                standardFeeIncreasing: ''
              }
            ]
          },
          budgetInfo: {
            tableData: [{
              // 年度
              startYear: '',
              // feeName1
              feeName: '租金 ',
              // monthPrice
              monthPrice: ''
            }]
          }
        }]
      },
      update: 0,
      dialogNum: 0
    }
  },
  watch: {
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    // 获取详情数据
    async getData() {
      const { id } = this.$route.query
      if (id) {
        const params = {
          id: id
        }
        try {
          this.id = id
          const { baseInfo, changeData, groupShopOld, groupShopNew } = await baseOfficesApi.openCloseOfficesDetail(params)
          // 基本信息
          this.formData.baseInfo = baseInfo
          // 数据对比
          // 数据对比
          this.formData.logData.tableData = this.formatterLogData(changeData, { groupShopOld, groupShopNew })
          // 原铺
          this.formData.groupShopOld = groupShopOld
          // 新铺
          this.formData.groupShopNew = groupShopNew
          this.update++
        } catch (e) {
          console.log(e)
        }
      }
    },
    async handlerClick() {
      // this.hasMenu = !this.hasMenu
      console.log(this.formData)

      // this.formData = {
      //   baseInfo: {
      //     BuildingName: '123',
      //     FloorName: '123',
      //     OfficeId: '123'
      //   },
      //   baseInfo1: {
      //     BuildingName: '',
      //     FloorName: '',
      //     OfficeId: ''
      //   }
      // }
      // // 更新视图 后续操作需要nextTick
      // this.update++
      //
      // this.$nextTick(async() => {
      //   const res = await this.$refs.pageDetail.valiFormDate()
      //   console.log(res)
      // })
    },
    detailChange(val) {
      this.formData = val
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      baseOfficesApi.openCloseOfficesDelete(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.go(-1)
        }, 1000)
      })
    },
    tabsToggle(type, index, dataKey) {
    },
    /**
     * 格式化变更数据
     * @param changeData
     * @formData formData
     * @returns {({totalNetArea: *, officeAmount, totalLeasableArea: *, totalGrossArea: *, disName: string}|{totalNetArea: *, officeAmount, totalLeasableArea: *, totalGrossArea: *, disName: string}|{totalNetArea: *, officeAmount, totalLeasableArea: *, totalGrossArea: *, disName: string})[]}
     */
    formatterLogData(changeData, formData) {
      const logData = []
      // 是否有原铺位信息
      const isOldInfo = formData.groupShopOld.length > 0
      // 是否有新铺位信息并且面积数据都有填写
      let isNewInfo = formData.groupShopNew.length > 0
      formData.groupShopNew.forEach(item => {
        if ((item.baseInfo.leasableArea === undefined || item.baseInfo.leasableArea === '') || (item.baseInfo.spaceGrossArea === undefined || item.baseInfo.spaceGrossArea === '') || (item.baseInfo.spaceNetArea === undefined || item.baseInfo.spaceNetArea === '')) {
          isNewInfo = false
        }
      })
      // 添加原铺信息
      if (isOldInfo) {
        logData.push(
          {
            disName: '原单元',
            officeAmount: changeData.officeAmountOld,
            totalLeasableArea: changeData.totalLeasableAreaOld,
            totalGrossArea: changeData.totalGrossAreaOld,
            totalNetArea: changeData.totalNetAreaOld,
            averagePrice: changeData.averagePriceOld
          }
        )
      }
      // 添加新铺信息
      if (isNewInfo) {
        logData.push({
          disName: '新单元',
          officeAmount: changeData.officeAmountNew,
          totalLeasableArea: changeData.totalLeasableAreaNew,
          totalGrossArea: changeData.totalGrossAreaNew,
          totalNetArea: changeData.totalNetAreaNew,
          averagePrice: changeData.averagePriceNew
        })
      }
      // 添加差异信息
      if (isNewInfo && isOldInfo) {
        logData.push({
          disName: '差异',
          officeAmount: changeData.officeAmountDiff,
          totalLeasableArea: changeData.totalLeasableAreaDiff,
          totalGrossArea: changeData.totalGrossAreaDiff,
          totalNetArea: changeData.totalNetAreaDiff,
          averagePrice: changeData.averagePriceDiff
        })
      }
      return logData
    }
  }
}
</script>

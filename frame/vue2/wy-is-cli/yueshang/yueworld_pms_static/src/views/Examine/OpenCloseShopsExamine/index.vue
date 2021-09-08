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
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine="examine"
      :accessory="accessory"
      :dynamic="false"
      @tabsToggle="tabsToggle"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <!--        <ysn-btn class="mr-12" @click="handlerClick">发起审核</ysn-btn>-->
        <!--        <ysn-btn type="info" @click="handlerClick">保存</ysn-btn>-->
      </template>
    </ysn-pageAccorGroupDetail>
  </div>
</template>
<script>
// 请求api
import { pageConfig } from './config'
import { baseProjectApi } from '@/api'
export default {
  name: 'OpenCloseShopsExamine',
  components: { },
  props: {},
  data() {
    return {
      hasMenu: false, // 是否显示左侧菜单
      // 审核页面
      examine: 'OpenCloseShopsList',
      // 显示附件
      accessory: 'show',
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      id: null,
      // 统一数据
      formData: {
        // 基本数据
        baseInfo: {
          programName: '',
          OfficeId: []
        },
        // 附件
        fileList: [],
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
          const { baseInfo, changeData, groupShopOld, groupShopNew } = await baseProjectApi.openCloseShopDetail(params)
          // 基本信息
          this.formData.baseInfo = baseInfo
          // 数据对比
          this.formData.logData.tableData = this.formatterLogData(changeData, { groupShopOld, groupShopNew })
          /*
         this.formData.logData.tableData = [
            {
              disName: '原铺位',
              spaceAmount: changeData.spaceAmount,
              totalLeasableArea: changeData.totalLeasableAreaOld,
              totalGrossArea: changeData.totalGrossAreaOld,
              totalNetArea: changeData.totalNetAreaOld,
              averagePrice: changeData.averagePriceOld
            },
            {
              disName: '新铺位',
              spaceAmount: changeData.spaceAmount,
              totalLeasableArea: changeData.totalLeasableAreaNew,
              totalGrossArea: changeData.totalGrossAreaNew,
              totalNetArea: changeData.totalNetAreaNew,
              averagePrice: changeData.averagePriceNew
            },
            {
              disName: '差异',
              spaceAmount: changeData.spaceAmount,
              totalLeasableArea: changeData.totalLeasableAreaDiff,
              totalGrossArea: changeData.totalGrossAreaDiff,
              totalNetArea: changeData.totalNetAreaDiff,
              averagePrice: changeData.averagePriceDiff
            }
          ]
          */
          // 原铺
          this.formData.groupShopOld = groupShopOld
          // 新铺
          this.formData.groupShopNew = groupShopNew
          // 附件列表
          this.formData.fileList = []
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
    tabsToggle(type, index, dataKey) {
    },
    /**
     * 格式化变更数据
     * @param changeData
     * @formData formData
     * @returns {({totalNetArea: *, spaceAmount, totalLeasableArea: *, totalGrossArea: *, disName: string}|{totalNetArea: *, spaceAmount, totalLeasableArea: *, totalGrossArea: *, disName: string}|{totalNetArea: *, spaceAmount, totalLeasableArea: *, totalGrossArea: *, disName: string})[]}
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
            disName: '原铺位',
            spaceAmount: changeData.spaceAmountOld,
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
          disName: '新铺位',
          spaceAmount: changeData.spaceAmountNew,
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
          spaceAmount: changeData.spaceAmountDiff,
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

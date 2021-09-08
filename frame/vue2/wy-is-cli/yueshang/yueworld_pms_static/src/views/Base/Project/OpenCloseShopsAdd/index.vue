<!--
 * @Author: qiuyw
 * @LastEditors: qiuyw
 * @Description: 一铺一价编辑和新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorGroupDetail
      ref="pageDetail"
      v-model="formData"
      :examine-page="examinePage"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @tabsToggle="tabsToggle"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="handlerClick">发起审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="handlerClick">保存</ysn-btn>
        <ysn-confirm
          v-if="id"
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
    <!-- 楼层选择 -->
    <dialog-choose-shop v-model="chooseShop" :dialog-num="dialogNum" />
  </div>
</template>
<script>
// 请求api
import { pageConfig } from './config'
import DialogChooseShop from './blocks/dialogChooseShop'
import { baseApi, baseProjectApi } from '@/api'
import { deepClone } from '@utils'
export default {
  name: 'OpenCloseShopsAdd',
  components: { DialogChooseShop },
  props: {},
  data() {
    return {
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 新铺位增加基本信息
      showNewBase: {
        baseInfo: {
          // 计租面积
          leasableArea: '',
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
            feeName1: '2021',
            // monthPrice
            monthPrice: ''
          }]
        }
      },
      // 原铺位选择值
      chooseShop: [],
      id: null, // 编辑页id
      // 统一数据
      formData: {
        // 基本数据
        baseInfo: {
          programName: '',
          OfficeId: []
        },
        // 合同结束最大日期
        contEndDate: '',
        // 变更数据
        logData: {
          tableData: []
        },
        // 原铺
        groupShopOld: [
          // {
          //   id: 0,
          //   baseInfo: {},
          //   priceInfo: {
          //     tableData: []
          //   }
          // }
        ],
        // 新铺位
        groupShopNew: [
        /*  {
            baseInfo: {
              otherArea: []
            },
            priceInfo: {
              tableData: [
                {
                // 年度
                  standardYear: '',
                  // 	费项名称
                  feeName: '租金 ',
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
          }*/
        ]
      },
      update: 0,
      dialogNum: 0
    }
  },
  computed: {
    examinePage() {
      return this.id ? 'OpenCloseShopsExamine' : ''
    }
  },
  watch: {
    // 项目改变自动填充值
    'formData.baseInfo.programName': function() {
      this.changeProjectName()
    },
    // 原铺楼层选择
    'chooseShop': {
      deep: true,
      handler(val) {
        console.log('chooseShop ========>', val)
        this.getShopInfoList()
      }
    },
    // 原铺位信息
    'formData.groupShopOld': {
      deep: true,
      handler(value) {
        // 计算变更数据
        this.getLogData(this.formData)
        // 计算最大合同日期
        this.getContEndDate(value)
      }
    },
    'formData.groupShopNew': {
      deep: true,
      handler() {
        this.getLogData(this.formData)
      }
    }
  },
  mounted() {
    this.getData()
  },
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
          const { baseInfo, changeData, groupShopOld, groupShopNew, contEndDate } = await baseProjectApi.openCloseShopDetail(params)
          // 基本信息
          this.formData.baseInfo = baseInfo
          // 数据对比
          this.formData.logData.tableData = this.formatterLogData(changeData, { groupShopOld, groupShopNew })
          // 原铺
          this.formData.groupShopOld = groupShopOld
          // 新铺
          this.formData.groupShopNew = groupShopNew
          // 合同最晚日期
          this.formData.contEndDate = contEndDate
          this.update++
        } catch (e) {
          console.log(e)
        }
      }
    },
    // 选择项目后获取项目基本信息
    async getProjectInfo() {
      const baseInfoOld = deepClone(this.formData.baseInfo)
      const { baseInfo } = await baseProjectApi.openCloseShopProjectInfo({
        id: 1 // 项目id
      })
      // 基本信息
      this.formData.baseInfo = {
        ...baseInfo,
        remark: baseInfoOld.remark,
        OfficeId: baseInfoOld.OfficeId
      }
      // 数据对比
      // this.formData.logData.tableData = this.formatterLogData(changeData)

      this.update++
    },
    changeProjectName() {
      this.getProjectInfo()
    },
    async handlerClick() {
      // this.hasMenu = !this.hasMenu
      this.$nextTick(async() => {
        const res = await this.$refs.pageDetail.valiFormDate()
        console.log('校验通过==================>', res)
        if (!res) {
          return false
        }
        baseProjectApi.openCloseShopSave(this.formData).then(res => {
          this.$message({ message: '保存成功', type: 'success' })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
        console.log(res)
      })
    },
    detailChange(val) {
      this.formData = val
    },
    tabsToggle(type, index, dataKey) {
      console.log(type, index, dataKey)
      if (type === 'plus') {
        // 此处可以通过dataKey去判断哪个分组,然后分开操作
        switch (dataKey) {
          case 'groupShopOld':
            this.chooseShopFloor()
            break
          case 'groupShopNew':
            this.addNewShop()
            break
        }
      } else {
        switch (dataKey) {
          case 'groupShopOld':
            this.removeShop(index)
            break
          case 'groupShopNew':
            this.removeNewShop(index)
            break
        }
        this.update++
      }
    },
    /**
     * 增加楼层选择
     */
    chooseShopFloor() {
      this.dialogNum++
    },
    /** *
     * 获取新增商铺基本信息
     */
    async getShopInfoList() {
      const { groupShopOld } = deepClone(this.formData)
      const { chooseShop } = this
      if (!chooseShop.length === 0) {
        return
      }
      const ids = chooseShop.filter((item) => {
        return !groupShopOld.map((item) => item.id).includes(item)
      })
      const { data } = await baseApi.shopBaseInfo({
        id: ids // mock 写死id
      })
      data.forEach(item => {
        groupShopOld.push({
          id: item.id,
          formBaseOld: item.baseInfo,
          tablePriceOld: {
            tableData: item.priceInfo || []
          }
        })
      })
      this.formData.groupShopOld = groupShopOld
      // 取消勾选删除多余商铺
      this.removeShops()
      this.update++
    },
    /** *
     * 删除原商铺基本信息
     */
    removeShops() {
      const { groupShopOld } = this.formData
      const { chooseShop } = this
      const formatterData = []
      groupShopOld.forEach((item) => {
        if (chooseShop.includes(item.id)) {
          formatterData.push({
            ...item
          })
        }
      })
      this.formData.groupShopOld = formatterData
    },
    /**
     * 删除原商铺
     */
    removeShop(index) {
      this.formData.groupShopOld.splice(index, 1)
      // 同步商铺选择值
      this.chooseShop = this.formData.groupShopOld.map((item) => {
        return item.id
      })
    },
    /**
     * 新增铺位
     */
    addNewShop() {
      // todo
      this.formData.groupShopNew.push(deepClone(this.showNewBase))
      this.update++
    },
    /**
     * 删除
     * @param index
     */
    removeNewShop(index) {
      this.formData.groupShopNew.splice(index, 1)
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      baseProjectApi.openCloseShopDelete(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.go(-1)
        }, 1000)
      })
    },
    /**
     * 计算新铺预算的价格
     */
    getBudGetData() {
      const { groupShopNew } = this.formData
      // 是否需要更新
      // let isUpdate = false
      const monthKey = 'month'
      groupShopNew.forEach((item, index) => {
        // 判断生效日期是否一致
        if (item.baseInfo.effectiveDate === item.budgetInfo.effectiveDate) {
          return
        }
        // isUpdate = true
        item.budgetInfo.effectiveDate = item.baseInfo.effectiveDate
        const startMonth = new Date(item.baseInfo.effectiveDate).getMonth()
        // 根据月份动态增加或删除之前月份价格数据
        item.budgetInfo.tableData.forEach((tableItem) => {
          for (let i = 0; i <= 11; i++) {
            tableItem.startYear = item.baseInfo.effectiveDate
            if (i < startMonth) {
              if (tableItem[`${monthKey}${i}`] !== undefined) {
                delete tableItem[`${monthKey}${i}`]
              }
            } else {
              if (!tableItem[`${monthKey}${i}`]) {
                tableItem[`${monthKey}${i}`] = ''
              }
            }
          }
        })
      })
      this.update++
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
            totalNetArea: changeData.totalNetAreaOld
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
          totalNetArea: changeData.totalNetAreaNew
        })
      }
      // 添加差异信息
      if (isNewInfo && isOldInfo) {
        logData.push({
          disName: '差异',
          spaceAmount: changeData.spaceAmountDiff,
          totalLeasableArea: changeData.totalLeasableAreaDiff,
          totalGrossArea: changeData.totalGrossAreaDiff,
          totalNetArea: changeData.totalNetAreaDiff
        })
      }
      return logData
    },
    /**
     * 计算变更数据
     * @param formData
     */
    getLogData(formData) {
      const changeData = {
        // 原铺
        spaceAmountOld: 0,
        totalLeasableAreaOld: 0,
        totalGrossAreaOld: 0,
        totalNetAreaOld: 0,
        // 新铺
        spaceAmountNew: 0,
        totalLeasableAreaNew: 0,
        totalGrossAreaNew: 0,
        totalNetAreaNew: 0,
        // 差异
        spaceAmountDiff: 0,
        totalLeasableAreaDiff: 0,
        totalGrossAreaDiff: 0,
        totalNetAreaDiff: 0
      }
      // 铺位数量计算
      changeData.spaceAmountOld = formData.groupShopOld.length
      changeData.spaceAmountNew = formData.groupShopNew.length
      changeData.spaceAmountDiff = Math.abs(formData.groupShopOld.length - formData.groupShopNew.length)
      // 计算原铺数据
      formData.groupShopOld.forEach((item, index) => {
        changeData.totalLeasableAreaOld += parseFloat(item.formBaseOld.leasableArea || 0)
        changeData.totalGrossAreaOld += parseFloat(item.formBaseOld.spaceGrossArea || 0)
        changeData.totalNetAreaOld += parseFloat(item.formBaseOld.spaceNetArea || 0)
      })
      // 计算新铺数据
      formData.groupShopNew.forEach((item, index) => {
        changeData.totalLeasableAreaNew += parseFloat(item.baseInfo.leasableArea || 0)
        changeData.totalGrossAreaNew += parseFloat(item.baseInfo.spaceGrossArea || 0)
        changeData.totalNetAreaNew += parseFloat(item.baseInfo.spaceNetArea || 0)
      })
      // 计算差异
      changeData.totalLeasableAreaDiff = Math.abs(changeData.totalLeasableAreaOld - changeData.totalLeasableAreaNew)
      changeData.totalGrossAreaDiff = Math.abs(changeData.totalGrossAreaOld - changeData.totalGrossAreaNew)
      changeData.totalNetAreaDiff = Math.abs(changeData.totalNetAreaOld - changeData.totalNetAreaNew)

      this.formData.changeData = changeData

      // 格式化成表格展示字段
      this.formData.logData.tableData = this.formatterLogData(changeData, formData)
      // this.update++
    },
    /**
     * 计算原合同最大日期
     * @param groupOld
     */
    getContEndDate(groupOld = []) {
      let maxDate
      groupOld.forEach((item) => {
        const contEndDate = item.formBaseOld.contEndDate
        if (!maxDate) {
          maxDate = contEndDate
          return
        }
        // 时间比较取最大日期
        maxDate = new Date(maxDate).getTime() > new Date(contEndDate).getTime() ? maxDate : contEndDate
      })
      if (maxDate) {
        this.formData.contEndDate = maxDate
        // this.update++ 这里刷新之后页面循环卡死
      }
    }
  }
}
</script>

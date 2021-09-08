
<template>
  <!-- // 基础数据(写字楼)————写字楼管理———一铺一价详情 -->
  <div>
    <div class="flex-ju-end">
      <ysn-btn class="mr-8">审核记录</ysn-btn>
      <ysn-btn class="mr-8">发起审核</ysn-btn>
      <ysn-btn type="info" class="mr-8" @click="preservation">保存</ysn-btn>
      <ysn-btn type="reset" class="mr-16">附件管理</ysn-btn>
      <ysn-btn type="delete" class="mr-16">删除</ysn-btn>
    </div>
    <AddAndEdit :list-edit-and-details="listEditAndDetails">
      <template #formdata>
        <ysn-formTable
          ref="formTab"
          v-model="wholeObj"
          prop="tableData"
          :column="listEditAndDetails.tableConfig"
        />

      </template>
    </AddAndEdit>
  </div>
</template>

<script>
import AddAndEdit from './blocks/addAndEdit'
import { buildingApi } from '@/api'
export default {
  name: 'BisOfficePricingAuditAddAndEdit',
  components: { AddAndEdit },
  data() {
    return {
      wholeObj: {
        tableData: [

        ]
      },
      listEditAndDetails: { // 页面的整体数据配置
        formDataDisplayInfo: [ // 一铺一价综合信息配置
          { prop: 'programName', label: '项目名称' },
          { prop: 'standardId', label: '批次号' },
          { prop: 'averagePriceProgram', label: '项目平均价格' }
        ],
        displayInfoData: {}, // 一铺一价综合信息数据
        averagePrice: [// 楼层评价价格配置
          { prop: 'xx', label: '平茂7F' }, // TODO 动态字段 需要真实接口
          { prop: 'averagePriceFloor', label: '平茂8F' } // TODO 动态字段 需要真实接口
          // {prop: 'AveragePriceProgram', label: '项目平均价格'}
        ],
        averagePriceData: {}, // 楼层评价价格数据
        tableData: [], // 表格数据
        tableConfig: [ // 表格配置详情
          { standardYear: '年度', itemType: 'text' },
          { buildingName: '楼栋', itemType: 'text' },
          { floorName: '楼层', itemType: 'text' },
          { officeName: '单元号', itemType: 'text' },
          { leasableArea: '计租面积', itemType: 'text' },
          { standardDeposit: '租赁保证金标准标准(元)', width: '200px', itemType: 'input' },
          { standardDecorationDeposit: '装修保证金标准(元)', width: '200px', itemType: 'input' },
          { standardRentFreePeriod: '免租期(天)', width: '200px', itemType: 'input' },
          { average: '租金', itemType: 'input' }, // TODO 动态字段 需要真实接口
          { average: '物管费', itemType: 'input' }, // TODO 动态字段 需要真实接口
          { average: '营运费', itemType: 'input' }, // TODO 动态字段 需要真实接口
          { average: 'xx费', itemType: 'input' }// TODO 动态字段 需要真实接口
        ],
        isTableConfig: [ // 表格配置编辑
          { standardYear: '年度', isShowSlots: true },
          { buildingName: '楼栋', isShowSlots: true },
          { floorName: '楼层', isShowSlots: true },
          { officeName: '单元号', isShowSlots: true },
          { leasableArea: '计租面积', isShowSlots: true },
          { standardDeposit: '租赁保证金标准标准(元)', isShowSlots: true },
          { standardDecorationDeposit: '装修保证金标准(元)', isShowSlots: true },
          { standardRentFreePeriod: '免租期(天)', isShowSlots: true },
          { average: '租金', isShowSlots: true }, // TODO 动态字段 需要真实接口
          { average: '物管费', isShowSlots: true }, // TODO 动态字段 需要真实接口
          { average: '营运费', isShowSlots: true }, // TODO 动态字段 需要真实接口
          { average: 'xx费', isShowSlots: true }// TODO 动态字段 需要真实接口

        ]

      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      buildingApi.bisOfficePricingAuditAddAndEdit({}).then(res => {
        console.log(res)
        //  一铺一价综合信息数据赋值
        this.listEditAndDetails.displayInfoData = res.displayInfoData
        //  楼层评价价格数据赋值
        this.listEditAndDetails.averagePriceData = res.averagePriceData
        // 一铺一价信息数据赋值
        this.listEditAndDetails.tableData = res.tableData
        this.wholeObj.tableData = res.tableData
      })
    },
    // validateField(form) {
    //   console.log(form)
    //   console.log(this.$refs[form].fields)
    //   let result = true
    //   for (const item of this.$refs[form].fields) {
    //     // if(item.prop.split(".")[1] == index){
    //     this.$refs[form].validateField(item.prop, (error) => {
    //       console.log(item.prop)
    //       if (error != '') {
    //         console.log(error)
    //         result = false
    //       }
    //     })
    //     // }
    //     if (!result) break
    //   }
    //   return result
    // },

    // 保存
    preservation() {
    // this.validateField('form')
    //  if( !this.validateField('form') ) return;
      console.log(this.listEditAndDetails)
      const fullData = {
        displayInfoData: this.listEditAndDetails.displayInfoData,
        averagePriceData: this.listEditAndDetails.averagePriceData,
        tableData: this.listEditAndDetails.tableData
      }
      buildingApi.bisOfficePricingAuditPreservation(fullData).then(res => {
        console.log(res)
        this.$router.push({ name: 'bisOfficePricingAuditList' })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .just-right{
   flex-direction:row-reverse
 }
</style>

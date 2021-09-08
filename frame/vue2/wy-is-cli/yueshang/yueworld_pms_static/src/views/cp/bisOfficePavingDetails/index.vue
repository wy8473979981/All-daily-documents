<template>
  <div>
    <!-- 编辑 -->
    <div class="d-flex">
      <ysn-btn type="reset">附件管理</ysn-btn>
      <ysn-btn class="mr-8">撤回申请</ysn-btn>
    </div>
    <FormText :detailed-data="detailedData" />
    <TableList :detailed-data="detailedData" />
    <OriginalUnit :detailed-data="detailedData" />
    <NewUnit :detailed-data="detailedData" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import FormText from './blocks/formText'
import TableList from './blocks/tableList'
import OriginalUnit from './blocks/originalUnit'
import NewUnit from './blocks/newUnit'
export default {
  name: 'BisOfficePavingDetails',
  components: { FormText, TableList, OriginalUnit, NewUnit },
  data() {
    return {
      // 整体页面的全部配置
      detailedData: {
        displayInfoData: [ // 详情配置
          { itemType: 'text', prop: 'ProgramName', label: '项目名称', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'CommentId', label: '审批号', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'CreateUser', label: '发起人', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'ApplyDate', label: '发起时间', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: '', label: '发起星文公司', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'Remark', label: '备注', placeholder: '请输入', width: '206px' }
        ],
        formDataDisplayInfo: { // 详情数据
          ProgramName: ''
        },
        tableData: [], // 表格数据
        tableConfig: [ // 表格配置
          // { ProgramName: '单元数量' },
          { name: '单元数量', columnClass: 'hasBg' },
          { rentCalculation: '计租面积(m²)' },
          { architecture: '建筑面积(m²)' },
          { sleeve: '套内面积(m²)' },
          { other: '其他面积(m²)' },
          { average: '平均租金单价' }
        ],
        displayinfoConfigData: [ // 原单元详情配置
          { itemType: 'text', prop: 'SpaceId', label: '单元号', placeholder: '请输入', width: '206px' }, // TODO 字段不明确
          { itemType: 'text', prop: 'BuildingName', label: '楼栋', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'FloorName', label: '楼层', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'SpaceType', label: '营运类型', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'SpaceEquityNature', label: '产权类型', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'LeasableArea', label: '计租面积', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'AreaType', label: '计租方式', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'LeasableArea', label: '计租面积(万m²)', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'SpaceGrossArea', label: '建筑面积(万m²)', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'SpaceNetArea', label: '套内面积(万m²)', placeholder: '请输入', width: '206px' }
        ],
        displayinfoData: {}, // 原单元详情数据
        formData: { // 新单元表单数据
          SpaceNetArea: ''
        },
        configData: [ // 新单元详情配置
          { itemType: '', prop: 'BuildingName', label: '所属楼栋', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'FloorName', label: '所属楼层', placeholder: '请输入', width: '206px' },
          { itemType: 'input', prop: 'CreateUser', label: '单元编码', placeholder: '请输入', width: '206px', disabled: true }, // TODO 字段不明确
          { itemType: '', prop: 'SpaceName', label: '单元号', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'SpaceType', label: '营运类型', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'SpaceEquityNature', label: '产权性质', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'AreaType', label: '计租方式', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'LeasableArea', label: '计租面积(万m²)', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: '', prop: 'SpaceGrossArea', label: '建筑面积(万m²)', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'SpaceNetArea', label: '套内面积(万m²)', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'EffectiveDate', label: '生效期始日期', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: '', label: '计入统计', placeholder: '请输入', width: '206px' }, // TODO 字段不明确
          { itemType: '', prop: 'StandardDeposit', label: '租赁保证金标准(元)', placeholder: '请输入', width: '206px' },
          { itemType: '', prop: 'StandardDecorationDeposit', label: '装修保证金标准(元)', placeholder: '请输入', width: '206px' },
          { itemType: 'input', prop: 'StandardRentFreePeriod', label: '免租期(天)', placeholder: '请输入', width: '206px' }
        ],
        primaryTableData: [], // 表格数据
        displayInfoConfig: [ // 表格配置
          { StandardYear: '年度' },
          { StandardDeposit: '租赁保证金标准(元)' },
          { StandardDecorationDeposit: '装修保证金标准(元)' },
          { StandardRentFreePeriod: '免租期(天)' },
          { FloorGrossArea: '租金' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: '物管费' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: '营运费' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: 'xx费' } // TODO 动态字段,需要真实业务对接
        ],
        newTableData: [], // 新单元表格数据
        newTableConfig: [ // 新单元表单配置
          { StandardYear: '年度' },
          { FeeName: '费项名称' },
          { StandardFee: '费项标准(元/m²)' },
          { StandardFeeTimeUnit: '费项时间单位' },
          { StandardFeeIncreasing: '递增率(%)' }
        ]

      }

    }
  },

  mounted() {
    buildingApi.bisOfficPavinDetailList({ id: '' }).then(res => {
      console.log(res.basicDataDetails)
      console.log(this.detailedData.formDataDisplayInfo)
      // 基础数据
      this.detailedData.formDataDisplayInfo = res.basicDataDetails
      //  变更基础数据 二维表格数据组装
      const list = []
      for (let i = 0; i < res.tableData.length; i++) {
        console.log(i)
        if (i === 0) {
          list.push(
            { name: res.tableData[i].SpaceAmount,
              rentCalculation: res.tableData[i].TotalLeasableAreaOld,
              architecture: res.tableData[i].TotalGrossAreaOld,
              sleeve: res.tableData[i].TotalNetAreaOld,
              other: res.tableData[i].tab_qita,
              average: res.tableData[i].AveragePriceOld }
          )
        }
        if (i === 1) {
          list.push(
            { name: res.tableData[i].SpaceAmount }
          )
        }
        if (i === 2) {
          list.push(
            { name: res.tableData[i].SpaceAmount }
          )
        }
      }
      this.detailedData.tableData = list
      // 原单元基础信息赋值
      this.detailedData.displayinfoData = res.displayinfoData
      //  原单元一铺一价赋值
      this.detailedData.primaryTableData = res.primaryTableConfig
      // 新单元表单赋值
      this.detailedData.formData = res.newFormData
      // 新单元表格赋值
      this.detailedData.newTableData = res.newTable
    })
  },

  methods: {
    preservation() {
      // console.log( this.$refs)
    }
  }
}
</script>
<style scoped lang="scss">
 .d-flex{
   display: flex;
   flex-direction:row-reverse;
 }
</style>


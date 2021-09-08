<template>
  <div>
    <div class="flex-ju-end">
      <ysn-btn class="mr-8">提交审核</ysn-btn>
      <ysn-btn type="info" class="mr-16" @click="preservation">保存</ysn-btn>
      <ysn-btn type="delete" class="mr-16">删除</ysn-btn>
      <ysn-btn type="reset">附件管理</ysn-btn>
    </div>

    <FormText :detailed-data="detailedData" />
    <TableList :detailed-data="detailedData" />
    <OriginalUnit :detailed-data="detailedData" />
    <NewUnit :detailed-data="detailedData" @addTableData="addTableData" @addFormData="addFormData" @tabChang="tabChang">
      <template #newFormData>
        <!-- <el-form v-if="formlist.length>0" ref="ruleForm" :model="formlist[isdex]" label-position="top" size="small">
          <ysn-formItem
            :form="formlist[isdex]"
            :config="detailedData.configData"
            :column="5"
            clearable
          />
        </el-form> -->

        <el-form v-for="(item, index) in formlist" v-show="index==isdex" :key="index" :ref="'ruleForm'+index" :model="formlist[index]" label-position="top" size="small">
          <ysn-formItem
            :form="item"
            :config="detailedData.configData"
            :column="5"
            clearable
          />
        </el-form>
      </template>
    </NewUnit>

  </div>
</template>

<script>
import { buildingApi } from '@/api'
import FormText from './blocks/formText'
import TableList from './blocks/tableList'
import OriginalUnit from './blocks/originalUnit'
import NewUnit from './blocks/newUnit'
export default {
  name: 'BisOfficePavingEdit',
  components: { FormText, TableList, OriginalUnit, NewUnit },
  data() {
    //   let validatePass = (rule, value, callback) => {
    //     console.log(value);
    //     console.log(rule)
    //     // let boolean = new RegExp("^[1-9][0-9]*$").test(value);
    //     // if (value === "") {
    //     //     return callback(new Error("额度不能为空"));
    //     // }
    //     // if (!boolean) {
    //     //     return callback(new Error("额度必须为正整数"));
    //     // }
    //     // callback();
    // };

    return {
      formlist: [],
      isdex: 0,
      // 整体页面的全部配置
      detailedData: {
        displayInfoData: [ // 详情配置
          { itemType: 'text', prop: 'ProgramName', label: '项目名称', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'CommentId', label: '审批号', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: 'CreateUser', label: '发起人', placeholder: '请输入', width: '206px' },
          { itemType: 'text', prop: 'ApplyDate', label: '发起时间', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'text', prop: '', label: '发起星文公司', placeholder: '请输入', width: '206px', disabled: true }, // TODO 字段不明确
          { itemType: 'text', prop: 'Remark', label: '备注', placeholder: '请输入', width: '206px' }
        ],
        formDataDisplayInfo: {}, // 详情数据
        tableData: [], // 表格数据
        tableConfig: [ // 表单配置
          // { ProgramName: '单元数量' },
          { name: '单元数量', columnClass: 'hasBg' },
          { rentCalculation: '计租面积(m²)' },
          { architecture: '建筑面积(m²)' },
          { sleeve: '套内面积(m²)' },
          { other: '其他面积(m²)' },
          { Average: '平均租金单价' }
        ],
        primaryTableData: [], // 原表格数据
        primaryTableConfig: [ // 原表格配置
          { StandardYear: '年度' },
          { StandardDeposit: '租赁保证金标准(元)' },
          { StandardDecorationDeposit: '装修保证金标准(元)' },
          { StandardRentFreePeriod: '免租期(天)' },
          { FloorGrossArea: '租金' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: '物管费' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: '营运费' }, // TODO 动态字段,需要真实业务对接
          { FloorGrossArea: 'xx费' } // TODO 动态字段,需要真实业务对接
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
        displayinfoData: {

        }, // 原单元详情数据
        formData: { // 新单元表单数据
          // BuildingName: '',
          // FloorName: '',
          // CreateUser: '',
          // SpaceName: '',
          // SpaceType: '',
          // SpaceEquityNature: '',
          // AreaType: '',
          // LeasableArea: '',
          // SpaceGrossArea: '',
          // SpaceNetArea: '',
          // EffectiveDate: '',
          // StandardDeposit: '',
          // StandardDecorationDeposit: '',
          // StandardRentFreePeriod: ''
        },

        configData: [ // 新单元表单配置
          { itemType: 'select', prop: 'BuildingName', label: '所属楼栋', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', rules: { required: true, message: '' }},
          { itemType: 'select', prop: 'FloorName', label: '所属楼层', placeholder: '请输入', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'input', prop: 'CreateUser', label: '单元编码', placeholder: '请输入', width: '206px', disabled: true }, // TODO 字段不明确
          { itemType: 'input', prop: 'SpaceName', label: '单元号', placeholder: '请输入', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'select', prop: 'SpaceType', label: '营运类型', placeholder: '请输入', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'select', prop: 'SpaceEquityNature', label: '产权性质', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', rules: { required: true, message: '' }},
          { itemType: 'select', prop: 'AreaType', label: '计租方式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', rules: { required: true, message: '' }},
          { itemType: 'input', prop: 'LeasableArea', label: '计租面积(万m²)', placeholder: '请输入', width: '206px', disabled: true },
          { itemType: 'input', prop: 'SpaceGrossArea', label: '建筑面积(万m²)', placeholder: '请输入', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'input', prop: 'SpaceNetArea', label: '套内面积(万m²)', placeholder: '请输入', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'input', prop: 'EffectiveDate', label: '生效期始日期', placeholder: '请输入', width: '206px', rules: { required: true, message: '' }},
          { itemType: 'input', prop: '', label: '计入统计', placeholder: '请输入', width: '206px' }, // TODO 字段不明确
          { itemType: 'input', prop: 'StandardDeposit', label: '租赁保证金标准(元)', placeholder: '请输入', width: '206px' },
          { itemType: 'input', prop: 'StandardDecorationDeposit', label: '装修保证金标准(元)', placeholder: '请输入', width: '206px' },
          { itemType: 'input', prop: 'StandardRentFreePeriod', label: '免租期(天)', placeholder: '请输入', width: '206px' }
        ],
        rulesForm: { // 表单验证
          BuildingName: [{ required: true, message: '请输入必填项' }],
          FloorName: [{ required: true, message: '请输入必填项' }],
          SpaceName: [{ required: true, message: '请输入必填项' }],
          SpaceType: [{ required: true, message: '请输入必填项' }],
          SpaceEquityNature: [{ required: true, message: '请输入必填项' }],
          AreaType: [{ required: true, message: '请输入必填项' }],
          SpaceGrossArea: [{ required: true, message: '请输入必填项' }],
          SpaceNetArea: [{ required: true, message: '请输入必填项' }],
          EffectiveDate: [{ required: true, message: '请输入必填项' }]
        },

        newTableData: [], // 新单元表格数据
        newTableConfig: [ // 新单元表单配置
          { StandardYear: '年度', itemType: 'select' },
          { FeeName: '费项名称', itemType: 'select' },
          { StandardFee: '费项标准(元/m²)', itemType: 'select' },
          { StandardFeeTimeUnit: '费项时间单位', itemType: 'select' },
          { StandardFeeIncreasing: '递增率(%)', itemType: 'select' }
        ]

      }

    }
  },
  mounted() {
    console.log(this.formData)
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
              Average: res.tableData[i].AveragePriceOld }
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
      // this.detailedData.formData = res.newFormData;
      this.formlist = res.newFormData
      console.log(this.formlist[0])
      // 新单元表格赋值
      this.detailedData.newTableData = res.newTable
    })
  },
  methods: {
    tabChang(data) {
      this.isdex = data
    },
    // 添加删除表单
    addFormData() {
      this.formlist.push({ BuildingName: '', FloorName: '', CreateUser: '', SpaceName: '', SpaceType: '', SpaceEquityNature: '', AreaType: '', LeasableArea: '', SpaceGrossArea: '', SpaceNetArea: '', EffectiveDate: '', StandardDeposit: '', StandardDecorationDeposit: '', StandardRentFreePeriod: '' })
      console.log(this.formlist)
    },
    // 新单元表格的添加和删除
    addTableData(row, index) {
      // console.log(row,index)
      if (index === 0) {
        this.detailedData.newTableData.push({ StandardYear: '', FeeName: '', StandardFee: '', StandardFeeTimeUnit: '', StandardFeeIncreasing: '' })
        return
      }
      if (index !== 0) {
        this.detailedData.newTableData.splice(index, 1)
        return
      }
    },
    preservation() {
      const add = []
      Object.getOwnPropertyNames(this.$refs).forEach(function(key) {
        console.log(key)
        add.push(key)
      })
      console.log(this.$refs)
      this.verification(add, 'falg').then(res => {
        // console.log(res)
        this.subPreservation(this.detailedData)
      })

      // this.$refs['ruleForm'].validate((valid, failedObj) => {
      //   console.log(valid, failedObj)
      //   if (valid) {
      //     this.subPreservation(this.detailedData)
      //   } else {
      //     console.log(valid, failedObj)
      //     setTimeout(() => {
      //       var isError = document.getElementsByClassName('is-error')
      //       isError[0].querySelector('input').focus()
      //     }, 100)
      //   }
      // })
    },
    //  保存  // TODO 字段量比较多 只模拟了一个保存接口 真实业务需要type来区别操作
    subPreservation(quantity) {
      buildingApi.bisOfficPavinDraft(quantity).then(res => {
        this.$router.push({ name: 'bisOfficPavinList' })
      })
    }

  }
}
</script>


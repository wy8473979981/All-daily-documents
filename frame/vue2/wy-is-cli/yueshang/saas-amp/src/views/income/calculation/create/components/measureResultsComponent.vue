<template>
  <div class="measureResultsComponent">
    <h2>测算结果</h2>
    <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="项目名称:" prop="projectName">
            <span>{{ruleForm.projectName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目所在地:" prop="address">
            <span>{{ruleForm.address}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-button @click="exportExcel" type="primary" size="mini">导出</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="unit-title">(单位:万元人民币)</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;" row-key="calculateId" stripe class="table" size="mini" header-row-class-name="table-header" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :max-height="maxHeight" :cell-style="key3Style">
          <el-table-column prop="subjectName" fixed="left" label="科目" width="240">
          </el-table-column>
          <el-table-column prop="calculatedValue" label="测算值" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <p :class="[ isNegativeFunc(scope.row.calculatedValue)?'':'text-red']">{{ thousands( scope, 'calculatedValue' ) }}</p>
            </template>
          </el-table-column>
          <template v-for="(item,index) in key10Ary">
            <el-table-column min-width="100" :key="`minusYear${index}`" show-overflow-tooltip>
              <template slot="header">
                <p class="text-center">{{item.year}}</p>
                <p class="text-center">第{{item.number}}年</p>
              </template>
              <template slot-scope="scope">
                <p :class="[ isNegativeFunc(scope.row['minusYear'+(index+1)])?'':'text-red']">{{  thousands( scope,`minusYear${index+1}` ) }}</p>
              </template>
            </el-table-column>
          </template>
          <template v-for="(item,index) in key11Ary">
            <el-table-column min-width="100" :key="`year${index}`" show-overflow-tooltip>
              <template slot="header">
                <p class="text-center">{{item.year}}</p>
                <p class="text-center">第{{item.number}}年</p>
              </template>
              <template slot-scope="scope">
                <p :class="[ isNegativeFunc(scope.row['year'+index])?'':'text-red']">{{  thousands( scope,`year${index}` ) }}</p>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-b">
      <el-col :span="24" style="text-align:right" v-if="!projectStatus">
        <el-button type="primary" @click="previousSaveFunc('save')" size="mini">上一步</el-button>
        <el-button type="primary" @click="jumpFunc()" size="mini">保存</el-button>
        <el-button type="primary" @click="finishFunc('next')" size="mini">提交</el-button>
      </el-col>
      <el-col :span="24" style="text-align:right" v-else>
        <el-button type="primary" @click="previousFunc" size="mini">上一步</el-button>
        <el-button type="primary" @click="nextFunc" size="mini">查看对比分析</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
export default {
  components: {
  },
  props: {
    formData: {
      type: Object,
      default: {}
    },
    step: {
      type: Number
    },
    projectStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      projectId: null,
      projectResultId: null,
      openYear: null, // 开业年
      routerQuery: this.$route.query,
      key10Ary: [],
      key11Ary: [],
      yearAry: [],
      maxHeight: null,
      ruleForm: {
        projectName: null,
        address: null,
        sharePrincipleName: null,
        projectResultId: null
      },
      tableData: [],
      tableShowNullObj: { // 不显示列的标识
        5: [],
        10: [],
        11: ['year0', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6', 'year7', 'year8', 'year9', 'year10', 'year11', 'year12', 'year13', 'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        12: [
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        13: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        14: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        15: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        20: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        21: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        22: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        30: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        31: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        32: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        33: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        34: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        40: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        41: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        42: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        50: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        51: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0'],
        60: [],
        61: [],
        70: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        71: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        80: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        90: ['year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        100: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        101: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21'],
        110: ['minusYear1',
          'minusYear2',
          'minusYear3',
          'minusYear4',
          'minusYear5', 'year0', 'year1',
          'year2',
          'year3',
          'year4',
          'year5',
          'year6',
          'year7',
          'year8',
          'year9',
          'year10',
          'year11',
          'year12',
          'year13',
          'year14',
          'year15',
          'year16',
          'year17',
          'year18',
          'year19',
          'year20',
          'year21']
      }
    }
  },
  filters: {},
  create () { },
  mounted () {
    this.projectId = this.formData.projectId
    this.projectResultId = this.formData.projectResultId
    this.getProjectCalculateDetail()
    this.getCalculateTableData()
    this.maxHeight = (document.getElementsByClassName('measureResultsComponent')[0].offsetHeight - 149) + 'px'
  },
  methods: {
    thousands (scope, key, unit = '', precise = 2) {
      let value = scope.row[key]
      const isNegativeBol = !(value >= 0)
      const unitAry = [71, 101]// 元为单位
      const percentAry = [41, 42, 80, 110]// 百分号为单位
      const calculateSubject = scope.row.calculateSubject
      if (this.tableShowNullObj[calculateSubject].includes(key)) {
        return ''
      }
      if (isNaN(value) || [null, undefined, ''].includes(value)) { return '-' }
      value = Math.abs(value)
      if (!unitAry.includes(calculateSubject)) {
        precise = 0
        unit = ''
      }
      if (percentAry.includes(calculateSubject)) {
        precise = 2
        unit = '%'
      }
      var text = Number(value).toFixed(precise)
      var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'))
      var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ',' }).split('').reverse().join('') + bit
      return isNegativeBol ? `(${f + unit})` : f + unit
    },
    isNegativeFunc (value) {
      return Number(value) >= 0
    },
    async getProjectCalculateDetail () {
      try {
        const params = {
          projectResultId: this.projectResultId
        }
        await CalculationApi.getProjectCalculateDetail(params).then(res => {
          if (res.code === 200) {
            const { result } = res
            this.ruleForm = {
              ...result,
              address: `${result.provinceName}${result.cityName}${result.countyName}`
            }
            this.openYear = new Date(result.openTime).getFullYear()
            this.createTableFourHeader()
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getCalculateTableData () {
      try {
        const params = {
          projectResultId: this.projectResultId
        }
        await CalculationApi.getCalculateTableData(params).then(res => {
          if (res.code === 200) {
            const { result } = res
            this.tableData = result.list
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    createTableFourHeader () {
      // 进度及其他假设 表头
      this.key10Ary = []
      this.key11Ary = []
      this.yearAry = []
      const devCycle = Number(this.ruleForm.devCycle)
      const signOutYears = Number(this.ruleForm.signOutYears)
      for (let i = 1; i < devCycle; i++) {
        const number = i - devCycle
        const obj = {
          year: this.openYear + number,
          number: number
        }
        this.key10Ary.push(obj)
        this.yearAry.push(`${this.openYear + number}`)
      }
      for (let i = 0; i <= signOutYears; i++) {
        const obj = {
          year: this.openYear + i,
          number: i
        }
        this.key11Ary.push(obj)
        this.yearAry.push(`${this.openYear + i}`)
      }
    },
    changeTableValue (scope) {
    },
    previousFunc () {
      this.$emit('update:step', 3)
    },
    previousSaveFunc (type) {
      this.$emit('update:step', 3)
    },
    nextFunc () {
      const routeUrl = this.$router.resolve({
        path: '/income/comparison',
        query: { projectId: this.projectId }
      })
      window.open(routeUrl.href, '_self')
      return false
    },
    jumpFunc () {
      this.$router.push({ path: '/income' })
    },
    async finishFunc (type) {
      try {
        this.$confirm('是否完成本次测算并提交结果至对比分析？注意：点击确认后将无法修改假设参数。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.saveFunc(type)
        }).catch(() => { })
      } catch (e) {
        console.log(e)
      }
    },
    async saveFunc (type) {
      try {
        const returnRateObj = this.tableData[4].children[0]// 业主收益回报率
        const returnRateAry = [
          returnRateObj.minusYear5,
          returnRateObj.minusYear4,
          returnRateObj.minusYear3,
          returnRateObj.minusYear2,
          returnRateObj.minusYear1,
          returnRateObj.year0,
          returnRateObj.year1,
          returnRateObj.year2,
          returnRateObj.year3,
          returnRateObj.year4,
          returnRateObj.year5,
          returnRateObj.year6,
          returnRateObj.year7,
          returnRateObj.year8,
          returnRateObj.year9,
          returnRateObj.year10,
          returnRateObj.year11,
          returnRateObj.year12,
          returnRateObj.year13,
          returnRateObj.year14,
          returnRateObj.year15,
          returnRateObj.year16,
          returnRateObj.year17,
          returnRateObj.year18,
          returnRateObj.year19,
          returnRateObj.year20
        ]
        const index = returnRateAry.indexOf(Math.max(...returnRateAry))
        const firstReachingStandard = this.yearAry[index]
        const ixYearsAsset = this.tableData[5].year4// 6年末资产价值
        const tenYearsAsset = this.tableData[5].year10// 10年末资产价值
        const sixYearsIRR = this.tableData[11].calculatedValue// 6年IRR
        const subsidyIRR = this.tableData[10].children[0].calculatedValue// 补贴-IRR
        const tenYearsIRR = this.tableData[8].calculatedValue// 10年IRR
        const tenYearsYOC = this.tableData[4].children[0].calculatedValue// 10年YOC
        const params = {
          firstReachingStandard: firstReachingStandard, // 首次达标年
          projectResultId: this.projectResultId, // 项目测算ID
          sixYearsAsset: ixYearsAsset, // 6年末资产价值
          sixYearsIRR: sixYearsIRR, // 6年IRR
          subsidyIRR: subsidyIRR, // 补贴-IRR
          tenYearsAsset: tenYearsAsset, // 10年末资产价值
          tenYearsIRR: tenYearsIRR, // 10年IRR
          tenYearsYOC: tenYearsYOC// 10年YOC
        }
        await CalculationApi.calculateStatusUpdate(params).then(res => {
          if (res.code === 200) {
            const { result } = res
            this.$message.success('保存成功')
            if (type == 'save') {
              this.$emit('update:step', 3)
            } else if (type == 'next') {
              const routeUrl = this.$router.resolve({
                path: '/income/comparison',
                query: { projectId: this.projectId }
              })
              window.open(routeUrl.href, '_self')
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    key3Style (column) {
      if ([7, 10, 15].includes(column.rowIndex)) {
        return 'background: #ccc !important;'
      } else if ([2, 3, 4, 5, 6].includes(column.rowIndex)) {
        return 'font-weight: inherit !important;'
      } else if ([0, 24, 25, 28].includes(column.rowIndex)) {
        if ([0].includes(column.columnIndex)) {
          return 'padding-left: 20px;'
        }
      }
    },
    async exportExcel () {
      // try {
      //   let res = null
      //   const req = { projectResultIds: this.projectResultId, showTypeList: showTypeList }
      //   res = await CalculationApi.excelExport(req, '/api/project/calculate/export')
      //   if (res) {
      //     var blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      //     var url = window.URL.createObjectURL(blob)
      //     var a = document.createElement('a')
      //     document.body.appendChild(a)
      //     a.setAttribute('style', 'display:none')
      //     a.setAttribute('href', url)
      //     var filename = this.ruleForm.projectName + '列表.xlsx'
      //     a.setAttribute('download', filename)
      //     a.click()
      //     window.URL.revokeObjectURL(url)
      //     this.$message({ message: '导出成功!', type: 'success' })
      //   } else {
      //     this.$message({ message: '导出失败!', type: 'error' })
      //   }
      // } catch (e) {
      //   console.log(e)
      // }
      // 导出
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        window.location.href = `../${this.$baseURL}/api/project/calculate/export?token=${token}&projectResultIds[]=${this.projectResultId}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.measureResultsComponent {
  height: 100%;
}
h2 {
  text-align: left;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 28px;
}
.unit-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
}
.margin-b {
  margin-top: 10px;
  margin-bottom: 15px;
}
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 0px !important;
  }
  .el-input,
  .el-select {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    color: #000;
  }
  .special-line-height {
    ::v-deep .el-form-item__label {
      line-height: 16px;
    }
  }
}
.table-title {
  border-left: 3px solid #4a90e2;
  padding: 5px;
  font-size: 16px;
  background-color: #e3e7e9;
}
.table::before {
  height: 0px;
}
::v-deep .el-table__fixed::before {
  height: 0px;
}
.el-table {
  // ::v-deep .el-table__indent {
  //   padding-left: 0px !important;
  // }
  ::v-deep .table-header {
    color: #000;
    font-weight: bold;
    th {
      background: #ccc !important;
    }
  }
  ::v-deep .el-table__body tr td:first-child {
    color: #000;
    font-weight: bold;
  }
  // ::v-deep .el-table__row--level-0 {
  //   background: #ccc !important;
  //   td {
  //     background: #ccc !important;
  //   }
  // }
  ::v-deep .common-column-line {
    background-color: #fff;
  }
  .column-span {
    display: flex;
    justify-content: space-between;
    p {
      width: 100%;
      border-right: 1px solid #ebeef5;
    }
    p:last-child {
      border-right: none;
    }
  }
  .text-red {
    color: red;
  }
}
</style>

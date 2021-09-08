<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-09 11:10:26
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-13 15:52:10
-->
<template>
  <div>
    <div>
      <ysn-formTable
        ref="ruleForm"
        :key="keyIndex"
        v-model="wholeObj"
        :rules="rule"
        prop="tableData"
        :column="formTableConfig"
        :span-method="arraySpanMethod"
        :show-slots="add"
      >
        <template #leaseArea>
          <div v-for="(item,index) in typeStatus.leaseArea" :key="index">
            <div>{{ item }}</div>
          </div>
        </template>
        <template #beginningDate="scope">
          <el-date-picker
            v-model="scope.row.beginningDate"
            type="date"
            placeholder="请先选择上一行结束日期"
            value-format="yyyy-MM-dd"
            :disabled="!scope.row.disabled"
            :picker-options="pickerOptionsBegin(scope.row,scope.$index)"
          />
        </template>
        <!-- :disabled="scope.row.beginningDate === listObj.businessAffairs.contBeginDate || disabledDate.includes(scope.row.beginningDate)" -->

        <template #endingDate="scope">
          <el-date-picker
            v-model="scope.row.endingDate"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :disabled="scope.row.endingDate === listObj.businessAffairs.contEndDate"
            :picker-options="pickerOptionsEnd(scope.row,scope.$index)"
            @change="changeEndingDate(scope.row,scope.$index)"
          />

          <!-- :disabled="scope.row.endingDate === listObj.businessAffairs.contEndDate || disabledDate.includes(scope.row.endingDate)" -->
        </template>
        <template #toApplyPrice="scope">
          <el-input v-model="scope.row.toApplyPrice" placeholder="请输入申请单价" @input="input(scope.row,scope.$index)" />
        </template>

        <template #isPromotional="scope">
          <div class="ysn-form">
            <el-select v-model="scope.row.isPromotional" placeholder="请选择">
              <el-option
                v-for="item in isOrNotStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
        <template #t12="scope">
          <span v-if="scope.row.timeIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'id')" />
          <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
          <span v-if="scope.row.idShowAdd" class="operation minus-icon" />
        </template>

        <template #name="scope">
          <span v-if="scope.row.classIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'classId')" />
          <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
        </template>
      </ysn-formtable>
      <!-- <div class="flex-ju-end mt-20 btn-selection">
      <ysn-btn class="mr-8" :disabled="cost" @click="ceneration">生成费用</ysn-btn>
      <el-popover
        v-model="visible"
        placement="top"
        width="300"
      >
        <div style="text-align:center">
          <p class="mt-20">批量申请单价</p>
          <el-input v-model="val" class="mt-20" />
        </div>
        <div style="text-align: center; " class="mt-20">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="determine">确定</el-button>
        </div>
        <ysn-btn slot="reference" class="mr-8" type="info">批量填写申请单价</ysn-btn>
      </el-popover>
      <ysn-btn type="info" :disabled="disb" @click="ok">保存并返回</ysn-btn>
    </div> -->
    </div>
    <div class="flex-ju-end mt-20 btn-selection">
      <ysn-btn class="mr-8" :disabled="cost" @click="ceneration">生成费用</ysn-btn>
      <el-popover
        v-model="visible"
        placement="top"
        width="300"
      >
        <div style="text-align:center">
          <p class="mt-20">批量申请单价</p>
          <el-input v-model="val" class="mt-20" />
        </div>
        <div style="text-align: center; " class="mt-20">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="determine">确定</el-button>
        </div>
        <ysn-btn slot="reference" class="mr-8" type="info">批量填写申请单价</ysn-btn>
      </el-popover>
      <ysn-btn type="info" :disabled="disb" @click="ok">保存并返回</ysn-btn>
    </div>
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { spacingText } from '@/utils/index'
// import moment from 'moment/moment'
import agreementTableRowSpan from '@/mixins/agreementTableRowSpan'
import { isOrNotStatus } from '@/utils/optionsList'
export default {
  name: 'RentFreePeriod',
  mixins: [pageAccorDetailCom, agreementTableRowSpan],
  model: {
    prop: 'rentFreePeriod',
    event: 'change'
  },
  props: {
    adds: { type: Array, default: () => [] },
    rentFreePeriod: {
      type: Object,
      default: () => {}
    },
    data: { type: Array, default: () => [] },
    typeStatus: {
      type: Object,
      default: () => {}
    },
    listObj: { type: Object, default: () => {} }
  },
  data() {
    return {
      isOrNotStatus: isOrNotStatus,
      keyIndex: 0,
      rule: {
        toApplyPrice: [{ required: true, message: '' }]
      },
      val: '', // 批量申请单价
      visible: false,
      cost: true, // 费用按钮状态
      disb: true, // 按钮状态
      spanArr: [],
      pos: [],
      id: 1,
      isfalg: false,
      idx: null,
      wholeObj: {
        tableDatas: {
          // tableData1: [{ leaseArea: '租赁区域1', freeScope: '21', beginningDate: '2020-01-01', endingDate: '2023-01-01', t11: '', id: 1, t4: '', disabled: true, begin: true, end: true, jian: true }],
          // tableData2: [{ leaseArea: '租赁区域1', freeScope: '21', beginningDate: '2020-01-01', endingDate: '2025-1-1', t11: '', id: 2, t4: '', disabled: true, begin: true, end: true, jian: true }]
        },
        tableData: [

        ]
      },

      formTableConfig: [
        { leaseArea: '租赁区域', itemType: 'text', width: '200px' },
        // { standardunitprice: '标准单价', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { leasTterm: '租赁期间', tableList: [
          { beginningDate: '开始', hasSlot: true, width: '260px' },
          { endingDate: '结束', hasSlot: true, width: '260px' },
          { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
          { LeaseCycle: '年/月/日', wdith: '300px', itemType: 'text', formatter: row => {
            console.log(row.beginningDate, row.endingDate)
            if (row.beginningDate && row.endingDate) {
              return spacingText(row.endingDate, row.beginningDate)
            }
            return ''
          } }
        ] },
        { t12: '拆分租期', itemType: '', hasSlot: true },
        // { tax: '税率', itemType: 'text' },
        { toApplyPrice: '申请单价', itemType: 'input', width: '120px', hasSlot: true, required: true },
        { unitPriceYieldRate: '申请达成率', itemType: 'text', type: 'rate', formatter: row => {
          console.log(row)
        } },
        { leasTterm: '月总', tableList: [
          { monthAmount: '总额', wdith: 300, type: 'money', formatter: row => {
            console.log(row)
            // 总额计算
            // 写死一个公式
            // 申请租金*租赁面积*固定年天数/12
            // const startDate = Date.parse(row.beginningDate)
            // const endDate = Date.parse(row.endingDate)
            // const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000) + 1
            // if (row.toApplyPrice) {
            //   return row.toApplyPrice * 72 * days / 12
            // }
          } },
          // { abc: '姓33名', width: 300, type: 'money', formatter: row => {
          //   console.log('111')
          //   return '111223'
          // } },
          { stageAmountWithoutTax: '不含税', wdith: '300px', itemType: 'text', type: 'money', formatter: row => {
            // if(){}
          } },
          { taxAmount: '税额', wdith: '300px', itemType: 'text', type: 'money' }
        ] },
        { cycleAmount: '期总', tableList: [
          { monthAmount: '总额', wdith: '300px', itemType: 'text', type: 'money' },
          { stageAmountWithoutTax: '不含税', wdith: '300px', itemType: 'text', type: 'money' },
          { taxAmount: '税额', wdith: '300px', itemType: 'text', type: 'money' }
        ] }

      ] }
  },
  computed: {
    add() {
      if (this.typeStatus.isRentShop === 1) {
        return ['beginningDate', 'endingDate', 'leaseArea', 'isPromotional']
      }
      return ['beginningDate', 'endingDate', 'isPromotional']
    }
  },

  mounted() {
    console.log(this.adds)
    let list = JSON.parse(JSON.stringify(this.adds)).map(item => {
      const newItem = { ...item }
      newItem.disabled = false
      return newItem
    })
    // 合并id一样的数据
    list = this.mergeData(list)
    // 自动拆分年
    list = this.autoMergeDate(list)
    this.wholeObj.tableData = list
    console.log(this.wholeObj.tableData)
    // 传入id一样时 租赁区域合并

    this.$nextTick(() => {
      this.setRowSpan()
    })

    // 合同年限
    // var beginDate = new Date(this.listObj.businessAffairs.contBeginDate)
    // var endDate = new Date(this.listObj.businessAffairs.contEndDate).toLocaleDateString().replace(/\//g, '-')

    // // console.log(endDate)
    // this.emdTime = this.listObj.businessAffairs.contEndDate
    // const tian = (24 * 60 * 60 * 1000)
    // const day = (new Date(this.listObj.businessAffairs.contEndDate).getTime() - new Date(this.listObj.businessAffairs.contBeginDate).getTime()) / tian
    // // const ht = parseInt(day / 365)
    // const nx = Math.ceil(day / 365)
    // const list = this.data
    // console.log(list)
    // const add = []
    // //  合并行
    // if (this.typeStatus.isRentShop === 1) {
    //   for (let i = 0; i < nx; i++) {
    //     const begin = new Date(beginDate.getTime() + i * (365 * 24 * 60 * 60 * 1000)).toLocaleDateString().replace(/\//g, '-')
    //     const end = new Date(beginDate.getTime() + (i + 1) * (365 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000)).toLocaleDateString().replace(/\//g, '-')
    //     i === (nx - 1) ? add.push({ beginningDate: begin, endingDate: endDate, leaseArea: '', toApplyPrice: '', unitPriceYieldRate: '', toApplyPriceunitPriceYieldRate: '', freeScope: '', t11: '', id: 1, disabled: true, begin: true, end: true, standardunitprice: 299, jian: true }) : add.push({ beginningDate: begin, endingDate: end, leaseArea: '', toApplyPrice: '', unitPriceYieldRate: '', toApplyPriceunitPriceYieldRate: '', freeScope: '', t11: '', id: 1, disabled: true, begin: true, end: true, standardunitprice: 299, jian: true })
    //   }
    //   this.wholeObj.tableData = add
    //   console.log(this.wholeObj.tableData)
    //   this.getSpanArr(this.wholeObj.tableData)
    // }
    // // 不合并
    // if (this.typeStatus.isRentShop === 0) {
    //   this.wholeObj.tableData = JSON.parse(JSON.stringify(list))
    //   for (let i = 0; i < this.wholeObj.tableData.length; i++) {
    //     this.wholeObj.tableDatas[i] = [this.data[i]]
    //   }
    //   this.wholeObj.tableData = []
    //   const datas = Object.keys(this.wholeObj.tableDatas)
    //   for (let j = 0; j < datas.length; j++) {
    //     const addpush = this.wholeObj.tableDatas[datas[j]]
    //     if (nx > 1) {
    //       for (let x = 0; x < addpush.length; x++) {
    //         addpush[x].endingDate = new Date(new Date(beginDate.getTime() + 0 * (365 * 24 * 60 * 60 * 1000) + 0 * (24 * 60 * 60 * 1000)).toLocaleDateString().replace(/\//g, '-'))
    //         console.log(addpush[x].endingDate)
    //       }
    //     }
    //     //  ht 合同年数
    //     for (let i = 1; i < nx; i++) {
    //       const begin = new Date(beginDate.getTime() + i * (365 * 24 * 60 * 60 * 1000) + i * (24 * 60 * 60 * 1000)).toLocaleDateString().replace(/\//g, '-')
    //       const end = new Date(beginDate.getTime() + (i + 1) * (365 * 24 * 60 * 60 * 1000) + i * (24 * 60 * 60 * 1000)).toLocaleDateString().replace(/\//g, '-')
    //       i === (nx - 1) ? this.wholeObj.tableDatas[datas[j]].push({ beginningDate: begin, endingDate: endDate, leaseArea: '', toApplyPrice: '', unitPriceYieldRate: '', toApplyPriceunitPriceYieldRate: '', freeScope: '', t11: '', id: this.wholeObj.tableDatas[datas[j]][0].id, disabled: true, begin: true, end: true, standardunitprice: 299, jian: true }) : this.wholeObj.tableDatas[datas[j]].splice(i + 1, 0, { beginningDate: begin, endingDate: end, leaseArea: '', toApplyPrice: '', unitPriceYieldRate: '', toApplyPriceunitPriceYieldRate: '', freeScope: '', t11: '', id: this.wholeObj.tableDatas[datas[j]][0].id, disabled: true, begin: true, end: true, standardunitprice: 299, jian: true })
    //     }
    //     this.wholeObj.tableData = this.wholeObj.tableData.concat(this.wholeObj.tableDatas[datas[j]])
    //   }
    //   console.log(this.wholeObj.tableData)
    //   this.getSpanArr(this.wholeObj.tableData)
    // }
    // console.log(this.wholeObj.tableData)
  },

  methods: {
    formatDate(date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    // 结束事件
    changeEndingDate(row, index, val) {
      this.keyIndex++
      // console.log(row, index)
      console.log(row.endingDate + 1)
      const obj = JSON.parse(JSON.stringify(row))
      console.log(new Date(new Date(obj.endingDate).getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString)
      const ad = new Date(new Date(obj.endingDate).getTime() + (24 * 60 * 60 * 1000))
      this.wholeObj.tableData[index + 1].beginningDate = this.formatDate(ad)
    },
    // 合并规则
    setRowSpan() {
      this.getSpanArr('id')
      this.getSpanArr('classId')
      this.getSpanArr('timeId')
      this.resetTimeList('classIdRowSpan')
      this.$nextTick(() => {
        this.keyIndex++
        console.log('setRowSpan', this.wholeObj.tableData)
      })
    },
    // 根据props清洗数据
    resetTimeList(props) {
      const list = JSON.parse(JSON.stringify(this.wholeObj.tableData))
      list.forEach((el, index) => {
        if (el[props] > 0) {
          list[index].endingDate = list[index + el[props] - 1].endingDate
        }
      })
      this.wholeObj.tableData = list
    },
    // 批量申请单价
    determine() {
      if (this.val !== '') {
        const list = this.wholeObj.tableData.concat()
        for (let i = 0; i < list.length; i++) {
          list[i].toApplyPrice = this.val
          list[i].tr = this.val
        }
        this.visible = !this.visible
        this.wholeObj.tableData = list
        this.cost = false
      }
    },
    input(row, index, val) {
      if (row.toApplyPrice === '') { this.disb = true }
      this.wholeObj.tableData[index].tr = row.toApplyPrice
      this.cost = false
      // console.log(row, index, val)
    },
    // 生成费用
    async ceneration(row, index) {
      console.log(this.typeStatus)
      const list = JSON.parse(JSON.stringify(this.wholeObj.tableData))
      JSON.parse(JSON.stringify(list))
      let fals = true
      console.log(list)
      for (let i = 0; i < list.length; i++) {
        console.log(list[i])
        if (list[i].tr === '' || !list[i].tr) {
          this.$message.error('申请单价未填写请前往填写')
          fals = false
          break
        }
      }
      if (fals) {
        for (let i = 0; i < list.length; i++) {
          const startDate = Date.parse(list[i].beginningDate)
          const endDate = Date.parse(list[i].endingDate)
          const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000) + 1
          list[i].unitPriceYieldRate = 299 / list[i].toApplyPrice // 申请达成率
          list[i].monthAmount = list[i].toApplyPrice * 72 * days / 12 // 总额
          list[i].stageAmountWithoutTax = list[i].monthAmount / (1 + list[i].tax) // 不含税 不含税：含税金额(应收)/（1+税率）=不含税金额
          list[i].taxAmount = list[i].monthAmount - list[i].stageAmountWithoutTax // 税额=含税金额-不含税金额
        }
        this.wholeObj.tableData = list
        console.log(this.wholeObj.tableData)
        this.disb = false
        this.cost = false
      }
    },
    // 开始
    pickerOptionsBegin(row, index) {
      if (index === 0) {
        return false
      }
      var day = this.wholeObj.tableData[index - 1].endingDate
      console.log(day)
      // const endtime = new Date(this.listObj.businessAffairs.contEndDate).getTime()
      for (let i = index; i < this.wholeObj.tableData.length; i++) {
        if (this.wholeObj.tableData[i].endingDate) {
          console.log(this.wholeObj.tableData[i].endingDate)
          var endtime = new Date(this.wholeObj.tableData[i].endingDate).getTime()
          break
        }
      }
      if (!day) {
        return {
          disabledDate(time) {
            return true
          }
        }
      }
      return {
        disabledDate(time) {
          return time.getTime() < new Date(day).getTime() || time.getTime() > endtime - (24 * 60 * 60 * 1000)
        }
      }
      // }
    },
    // 结束
    pickerOptionsEnd(row, index) {
      for (let i = index; i < this.wholeObj.tableData.length; i++) {
        if (this.wholeObj.tableData[i].endingDate) {
          console.log(this.wholeObj.tableData[i].endingDate)
          var endtime = new Date(this.wholeObj.tableData[i].endingDate).getTime()
          break
        }
      }
      if (!row.beginningDate) {
        return {
          disabledDate(time) {
            return true
          }
        }
      }
      return {
        disabledDate(time) {
          // console.log(this.emdTime)
          return time.getTime() < new Date(row.beginningDate).getTime() - (24 * 60 * 60 * 1000) || time.getTime() > endtime - (24 * 60 * 60 * 1000)
        }
      }
      // }
    },
    // 计算开始结束时间是否disabled处理
    initTimeList() {

    },
    ok() {
      console.log(this.wholeObj.tableData)
      this.$emit('ok', this.wholeObj.tableData)
    },
    // // 后面删除
    // minusData(index, flag, row) {
    //   console.log(index)
    //   if (this.wholeObj.tableData[index].jian) {
    //     return
    //   }
    //   if (flag) {
    //     let ind = 0
    //     let rentFreePeriod = JSON.parse(JSON.stringify(this.wholeObj.tableData))
    //     for (let i = index; i < rentFreePeriod.length; i++) {
    //       const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].disabled : false // 下一行id
    //       ind++
    //       if (nextId) {
    //         break
    //       } else if (i === rentFreePeriod.length - 1) {
    //         ind = i + 1
    //         console.log('i:' + i)
    //       }
    //     }
    //     let dataIndex = ''
    //     rentFreePeriod.forEach((element, index) => {
    //       if (dataIndex === '' && element.id === row.id) {
    //         dataIndex = index
    //       }
    //     })
    //     rentFreePeriod.splice(index, ind)
    //     const newData = this.setDataList(rentFreePeriod, dataIndex)
    //     rentFreePeriod = newData.rentFreePeriod
    //     this.wholeObj.tableData = rentFreePeriod
    //   } else {
    //     if (this.wholeObj.tableData[index].endingDate) {
    //       this.wholeObj.tableData[index - 1].end = true
    //       this.wholeObj.tableData[index - 1].endingDate = this.wholeObj.tableData[index].endingDate
    //     }

    //     this.wholeObj.tableData.splice(index, 1)
    //   }
    //   this.getSpanArr(this.wholeObj.tableData)
    // },
    addData(row, index, props) {
      let newIndex = index
      const newRow = JSON.parse(JSON.stringify(row))
      console.log(newRow)
      if (!newRow[props]) {
        newRow[props] = this.getId()
      }

      // 清空数据
      // newRow = {
      //   ...row,
      //   zz: '',
      //   ss: '',
      //   name3: ''
      // }

      // 合并业务 第一个id其他几行不合并
      if (props === 'id') {
        newRow.classId = this.getId()
        newIndex = index + 1
        // newRow.beginningDate = row.endingDate
      }
      // 删除数据
      this.wholeObj.tableData.splice(newIndex, 0, newRow)
      // console.log(this.wholeObj.tableData)
      // console.log(this.wholeObj.tableData)
      this.wholeObj.tableData = this.setTimeList(this.wholeObj.tableData)
      console.log(this.wholeObj.tableData)
      // 重新计算合并规则

      this.setRowSpan()
    },

    // addData(row, index) {
    //   this.idx = index
    //   this.isfalg = true
    //   // const rentFreePeriod = this.wholeObj.tableData
    //   const list = JSON.parse(JSON.stringify(this.wholeObj.tableData))
    //   const { rentFreePeriod, endDate, ind } = this.setDataList(list, index)
    //   rentFreePeriod.splice(ind, 0, { leaseArea: '', freeScope: '21', beginningDate: '', endingDate: endDate, t11: '', id: row.id, disabled: false, begin: false, end: true, toApplyPrice: '' })
    //   this.wholeObj.tableData = rentFreePeriod
    //   this.getSpanArr(this.wholeObj.tableData)
    // },
    // 设置年月日数据
    setDataList(rentFreePeriod, index) {
      let ind = 0
      // console.log(index)
      var endDate
      for (let i = index; i < rentFreePeriod.length; i++) {
        const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].disabled : false // 下一行id
        endDate = this.wholeObj.tableData[i].endingDate

        if (rentFreePeriod[i].end) {
          rentFreePeriod[i].endingDate = ''
        }

        rentFreePeriod[i].end = false
        rentFreePeriod[i].disabled = false
        if (nextId) {
          rentFreePeriod[index].disabled = true
          ind = i + 1
          break
        } else if (i === rentFreePeriod.length - 1) {
          rentFreePeriod[index].disabled = true
          ind = i + 1
        }
      }
      return {
        rentFreePeriod,
        endDate,
        ind
      }
    },
    // 前面操作
    // addData(row, index) {
    //   this.idx = index
    //   this.isfalg = true
    //   // const rentFreePeriod = this.wholeObj.tableData

    //   const rentFreePeriod = JSON.parse(JSON.stringify(this.wholeObj.tableData))
    //   JSON.parse(JSON.stringify(rentFreePeriod))
    //   let ind = 0
    //   // console.log(index)
    //   var endDate
    //   for (let i = index; i < rentFreePeriod.length; i++) {
    //     console.log(index)
    //     const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].disabled : false // 下一行id
    //     endDate = this.wholeObj.tableData[i].endingDate
    //     // this.wholeObj.tableData[index].endingDate = ''

    //     if (this.wholeObj.tableData[i].end) {
    //       this.wholeObj.tableData[i].endingDate = ''
    //     }

    //     this.wholeObj.tableData[i].end = false
    //     this.wholeObj.tableData[i].disabled = false
    //     // console.log(nextId, '__', curentId)
    //     if (nextId) {
    //       this.wholeObj.tableData[index].disabled = true
    //       ind = i + 1
    //       break
    //     } else if (i === rentFreePeriod.length - 1) {
    //       this.wholeObj.tableData[index].disabled = true
    //       ind = i + 1
    //       console.log('i:' + i)
    //     }
    //   }
    //   console.log('endDate:' + endDate)
    //   console.log('ind:' + ind)
    //   rentFreePeriod.splice(ind, 0, { leaseArea: '11', freeScope: '21', beginningDate: '', endingDate: endDate, t11: '', id: row.id, disabled: false, begin: false, end: true, toApplyPrice: '' })
    //   console.log(this.wholeObj.tableData)
    //   this.getSpanArr(this.wholeObj.tableData)
    // },
    // 合并规则处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // table配置改变的情况下这里需要调整 ,例如分铺计租

      // 租期的合并
      if (columnIndex <= 0) {
        if (row.idRowSpan) {
          return {
            rowspan: row.idRowSpan,
            colspan: 1
          }
        }
        return this.noRowSpan()
      }
    }
    // 合并规则
    // getSpanArr(data, idx) {
    //   this.spanArr = []
    //   this.pos = []
    //   for (let i = 0; i < data.length; i++) {
    //     if (i === 0) {
    //       this.spanArr.push(1)
    //       this.pos = 0
    //     } else {
    //       // 判断当前元素与上一个元素是否相同
    //       if (data[i].id === data[i - 1].id) {
    //         this.spanArr[this.pos] += 1
    //         this.spanArr.push(0)
    //         data[i].isShowAdd = false
    //       } else {
    //         data[i].isShowAdd = true
    //         this.spanArr.push(1)
    //         this.pos = i
    //       }
    //     }
    //   }
    //   console.log(this.spanArr)
    // }

  }
}
</script>

<style lang="scss" scoped>
.ysn-form{
    ::v-deep  .el-input--medium .el-input__inner{
        height: 28px;
        line-height: 28px;
    }
}
.operation{
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.add-icon{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC3klEQVRoBe1YPWgUURCeufMHDJdagmBjLCysDNhY2N2eIFikSnNgWpu0ooSIhY2NnVhc4VUpBMHsdbaCjSikiY0g0TYmJxjJjjO7e+Q49t7M2+xGQt42t7cz+33zzZv39r0BCFfIQMhAyEDIwGnOAFYlfnF18dzvb7u3ieBuAnANCeYIaE7wEXCbELYbAJuI8PbC5db79dX1/Sq4jyyg0+1cJDp4zGEuccCzlqBY0C8A6iM21zZ6Gz8t70zzKS0gehCdh114SJSsMPjMNALl+RCx8Rxa8DR+Ef9RfAvNpQSkWYfkDRHdLET1fIiIHxAa98qMhreA9nL7Ov6Fd1wulzzjdLpzWX3n0eiwiC9Oxwmjl4Cs3pOPVQc/iikXseAzErww2C6peZKyqTjz4+yCLRzp/Bo3OO7NArIJW03NO+KBdF7x4uDyGbeZSkhKJ6GDr/yi12oT9wYpV9Rtj3Na7ocNbF6xlJJpBLJ13i94S5QOn5mc0+GSmVQB8oWVj5SKVLkDLmXcbmBVQLo9MH5h3VR+Vp7Qs8KtvaUKkL2NBlKX3cKtCpCNWV0BargWblWA7Co1orrsFu4zGjnXolPAaKl04bh8XEusxi2c6gi4Aqvbxps80jjUEUgPI0BXpwG5MjjKvMtnGm76nOCH085GdQTkJKWB1GW3cKsC2GGzrgA1XAu3KkDOsBpRXXYLtypADuDZGbauMItxhVO4i62HT1UBWfeA+oevHNcd9S2dC1WAhCvdA/4ZHlfowpVzqpSm84CgRN1ojTsQj1TEChz4bPwk7sXcqtEv0wikMNz6kO6BDnk0j5SDuawo5hEQwBN9qBcBcsSjs3BHugfyv8pLMPO2ilenzl5CebSDV4PPTLRQZTkJlmD69oQkpGaZLG592tqbvzX/Gvdls0U3GIOPnaUuaS0+gxbej1/GO2UQvOZAEUE2L05gc3dSzP9qr0/GEf6HDIQMhAyEDJyuDPwD2MAF4UaQ6IgAAAAASUVORK5CYII=) no-repeat;
  background-size: contain;
}
.minus-icon{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==) no-repeat;
  background-size: contain;
}
.el-table__row{
  background: red;
}

::v-deep .el-tooltip {
    // background: red;
    width:100% !important
}
</style>


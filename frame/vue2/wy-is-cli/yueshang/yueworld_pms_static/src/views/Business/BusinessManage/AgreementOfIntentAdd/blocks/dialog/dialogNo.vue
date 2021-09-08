<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-09 18:32:54
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-16 13:15:14
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      :key="update"
      v-model="wholeObj"
      prop="tableData"
      :show-slots="add"
      :column="formTableConfig"
      :span-method="arraySpanMethod"
    >
      <template #leaseArea="scope">
        <div v-if="typeof scope.row.leaseArea === 'object'">
          <div v-for="(item, index) in scope.row.leaseArea" :key="index">
            <div>{{ item }}</div>
          </div>
        </div>
        <div v-else>{{ scope.row.leaseArea }}</div>
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
      </template>

      <template #startingMonthlyTurnover="scope">
        <el-input
          v-model.number="scope.row.startingMonthlyTurnover"
          placeholder="请输入"
        />
      </template>

      <template #endingMonthlyTurnover="scope">
        <el-input
          v-model.number="scope.row.endingMonthlyTurnover"
          placeholder="请输入"
        />
      </template>

      <!-- 时间拆分 -->
      <template #t12="scope">
        <span
          v-if="scope.row.timeIdShowAdd"
          class="operation add-icon"
          @click="addData(scope.row, scope.$index, 'id')"
        />
        <span
          v-else
          class="operation minus-icon"
          @click="minusData(scope.$index)"
        />
        <span v-if="scope.row.idShowAdd" class="operation minus-icon" />
      </template>

      <template #name="scope">
        <span
          v-if="scope.row.classIdShowAdd"
          class="operation add-icon"
          @click="addData(scope.row, scope.$index, 'classId')"
        />
        <span
          v-else
          class="operation minus-icon"
          @click="minusData(scope.$index)"
        />
      </template>

      <template #monthlyEstimatedTurnover="scope">
        <el-input
          v-model.number="scope.row.monthlyEstimatedTurnover"
          placeholder="请输入"
        />
      </template>
      <template #class="scope">
        <el-input v-model="scope.row.class" placeholder="请输入" />
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
      <template #salesTaxRate="scope">
        <div class="ysn-form">
          <el-select
            v-model="scope.row.salesTaxRate"
            placeholder="请选择"
            :disabled="scope.$index !== 0"
            @change="changeOptiosn"
          >
            <el-option
              v-for="item in txd"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
      <template #commDiscountApply="scope">
        <el-input
          v-model.number="scope.row.commDiscountApply"
          placeholder="请输入"
        />
      </template>
    </ysn-formTable>
    <div class="flex-ju-end mt-20">
      <ysn-btn class="mr-8">生成费用</ysn-btn>
      <!-- <ysn-btn class="mr-8" type="info" @click="ok">批量填写申请单价</ysn-btn> -->
      <!-- <el-popover v-model="visible" placement="top" width="300">
        <div style="text-align:center">
          <p class="mt-20">批量申请单价</p>
          <el-input v-model="val" class="mt-20" />
        </div>
        <div style="text-align: center; " class="mt-20">
          <el-button
            size="mini"
            type="text"
            @click="visible = false"
          >取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="determine"
          >确定</el-button>
        </div>
        <ysn-btn
          slot="reference"
          class="mr-8"
          type="info"
        >批量填写申请单价</ysn-btn>
      </el-popover> -->
      <ysn-btn v-if="!status" type="info" @click="ok">保存并返回</ysn-btn>
      <ysn-btn
        v-if="status === '1'"
        type="info"
        @click="isstatus"
      >保存并返回</ysn-btn>
    </div>
  </div>
</template>
<script>
import agreementTableRowSpan from '@/mixins/agreementTableRowSpan'
import { spacingText } from '@/utils/index'
import { isOrNotStatus, txd } from '@/utils/optionsList'
// import { number } from '_echarts@5.1.1@echarts'
// import { number } from '_echarts@5.1.1@echarts'

// import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
// import { random } from '@/utils'
export default {
  name: 'RentFreePeriod',
  mixins: [agreementTableRowSpan],
  props: {
    data: { type: Array, default: () => [] },
    adds: { type: Array, default: () => [] },
    status: { type: String, default: '' },
    typeStatus: {
      type: Object,
      default: () => {}
    },
    relist: { type: Array, default: () => [] },
    listObj: { type: Object, default: () => {} },
    tax: { type: Number, default: 0 },
    name: { type: Number, default: 0 }
  },
  data() {
    return {
      options: [
        { value: '0', label: '是' },
        { value: '1', label: '否' }
      ],
      update: 0,
      visible: false,
      val: '',
      isOrNotStatus: isOrNotStatus,
      txd: txd,
      wholeObj: {
        tableDatas: {
          // tableData1: [{ leaseArea: '租赁区域1', freeScope: '21', beginningDate: '2020-01-01', endingDate: '2023-01-01', t11: '', id: 1, t4: '', disabled: true, begin: true, end: true, jian: true }],
          // tableData2: [{ leaseArea: '租赁区域1', freeScope: '21', beginningDate: '2020-01-01', endingDate: '2025-1-1', t11: '', id: 2, t4: '', disabled: true, begin: true, end: true, jian: true }]
        },
        tableData: []
      },
      id: 1,
      isfalg: false,
      idx: null,
      tableDatas: [
        // { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' }
      ],

      spanArr: [],
      pos: []
    }
  },
  computed: {
    // 表格营业额起
    written() {
      const add = this.name === 1 ? '月营业额起' : this.name === 2 ? '季营业额起' : this.name === 3 ? '半年营业额起' : this.name === 4 ? '年营业额起' : this.name === 5 ? '一次性营业额起' : '月营业额起'
      return add
    },
    // 表格营业额止
    writtenStop() {
      const add = this.name === 1 ? '月营业额止' : this.name === 2 ? '季营业额止' : this.name === 3 ? '半年营业额止' : this.name === 4 ? '年营业额止' : this.name === 5 ? '一次性营业额止' : '月营业额止'
      return add
    },
    add() {
      if (this.typeStatus.isRentShop === 1) {
        return [
          't12',
          'name',
          'monthlyEstimatedTurnover',
          'startingMonthlyTurnover',
          'commDiscountApply',
          'endingMonthlyTurnover',
          'leaseArea',
          'beginningDate',
          'endingDate',
          'salesTaxRate',
          'isPromotional'
        ]
      }
      return [
        't12',
        'name',
        'monthlyEstimatedTurnover',
        'startingMonthlyTurnover',
        'commDiscountApply',
        'endingMonthlyTurnover',
        'beginningDate',
        'endingDate',
        'salesTaxRate', 'isPromotional'
      ]
    },
    formTableConfig() {
      if (this.tax === 1 || this.tax === 3) {
        return [
          {
            leaseArea: '租赁区域',

            width: '200px',
            itemType: 'text',
            isShowSlots: true
          },
          // {
          //   standardUnitPrice: '标准单价',

          //   itemType: 'text',
          //   list: this.$PUBFN.getOptionsList('globalSearchList'),
          //   listName: 'label',
          //   listValue: 'value'
          // },
          {
            leasTterm: '租赁期间',

            tableList: [
              {
                beginningDate: '开始',

                width: '260px',
                itemType: 'text'
              },
              {
                endingDate: '结束',
                itemType: 'datePicker',
                type: 'date',
                valueFormat: 'yyyy-MM-dd',
                hasSlot: true,
                width: '260px'
              },
              {
                isPromotional: '优惠期',

                wdith: '300px',
                itemType: 'text'
              },
              { LeaseCycle: '年/月/日', wdith: '300px', itemType: 'text', formatter: row => {
                console.log(row.beginningDate, row.endingDate)
                if (row.beginningDate && row.endingDate) {
                  return spacingText(row.endingDate, row.beginningDate)
                }
                return ''
              } }
            ]
          },
          { t12: '拆分租期', itemType: '', hasSlot: true },
          {
            monthlyEstimatedTurnover: '月预估营业额',
            inputType: 'Number',
            width: '110px',
            itemType: 'input',
            hasSlot: true
          },
          {
            leasTterm: '总额阶梯提成申请条件',

            tableList: [
              {
                startingMonthlyTurnover: this.written,
                inputType: 'Number',
                width: '110px',
                itemType: 'input',
                hasSlot: true
              },
              {
                endingMonthlyTurnover: this.writtenStop,
                inputType: 'Number',
                width: '110px',
                itemType: 'input',
                hasSlot: true
              },
              {
                commDiscountApply: '申请扣率',
                inputType: 'Number',
                width: '110px',
                itemType: 'input',
                hasSlot: true
              },
              {
                name: '操作',

                width: '',
                itemType: '',
                hasSlot: true
              }
            ]
          }
        ]
      }
      return [
        {
          leaseArea: '租赁区域',

          width: '200px',
          itemType: 'text',
          isShowSlots: true
        },
        // {
        //   standardUnitPrice: '标准单价',

        //   itemType: 'text',
        //   list: this.$PUBFN.getOptionsList('globalSearchList'),
        //   listName: 'label',
        //   listValue: 'value'
        // },
        {
          leasTterm: '租赁期间',

          tableList: [
            {
              beginningDate: '开始',

              width: '260px',
              itemType: 'text'
            },
            {
              endingDate: '结束',
              itemType: 'datePicker',
              type: 'date',
              valueFormat: 'yyyy-MM-dd',
              hasSlot: true,
              width: '260px'
            },
            {
              isPromotional: '优惠期',

              wdith: '300px',
              itemType: 'text'
            },
            { LeaseCycle: '年/月/日', wdith: '300px', itemType: 'text', formatter: row => {
              console.log(row.beginningDate, row.endingDate)
              if (row.beginningDate && row.endingDate) {
                return spacingText(row.endingDate, row.beginningDate)
              }
              return ''
            } }
          ]
        },
        { t12: '拆分租期', itemType: '', hasSlot: true },
        // { tax: '税率', itemType: 'text' },
        {
          monthlyEstimatedTurnover: '月预估营业额',
          inputType: 'Number',
          width: '110px',
          itemType: 'input',
          hasSlot: true
        },
        { salesTaxRate: '销售额税率', itemType: 'input', width: '110px' },
        {
          leasTterm: '总额阶梯提成申请条件',

          tableList: [
            {
              startingMonthlyTurnover: this.written,
              inputType: 'Number',
              width: '110px',
              itemType: 'input',
              hasSlot: true
            },
            {
              endingMonthlyTurnover: this.writtenStop,
              inputType: 'Number',
              width: '110px',
              itemType: 'input',
              hasSlot: true
            },
            {
              commDiscountApply: '申请扣率',
              inputType: 'Number',
              width: '110px',
              itemType: 'input',
              hasSlot: true
            },
            {
              name: '操作',
              width: '',
              itemType: '',
              hasSlot: true
            }
          ]
        }
      ]
    }
  },
  mounted() {
    console.log(this.adds)
    let list = JSON.parse(JSON.stringify(this.adds)).map((item) => {
      const newItem = { ...item }
      newItem.disabled = false
      return newItem
    })
    // 合并id一样的数据
    list = this.mergeData(list)
    // 自动拆分年
    list = this.autoMergeDate(list)
    this.wholeObj.tableData = list
    // 传入id一样时 租赁区域合并

    this.$nextTick(() => {
      this.setRowSpan()
    })
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
      console.log(row.endingDate + 1)
      const obj = JSON.parse(JSON.stringify(row))
      console.log(new Date(new Date(obj.endingDate).getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString)
      const ad = new Date(new Date(obj.endingDate).getTime() + (24 * 60 * 60 * 1000))
      this.wholeObj.tableData[index + 1].beginningDate = this.formatDate(ad)
    },
    changeOptiosn(val) {
      console.log(this.wholeObj.tableData)
      for (let i = 0; i < this.wholeObj.tableData.length; i++) {
        this.wholeObj.tableData[i].salesTaxRate = val
      }
    },
    ok() {
      console.log(this.status)
      console.log(this.wholeObj.tableData)
      this.$emit('ok', this.wholeObj.tableData)
    },
    isstatus() {
      // console.log(this.wholeObj.tableData)
      this.$emit('isstatus', this.wholeObj.tableData)
    },
    determine() {
      this.$emit('determine')
    },
    addData(row, index, props) {
      let newIndex = index
      const newRow = JSON.parse(JSON.stringify(row))
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
      }
      // 合并业务 第一个id其他几行不合并
      // if (props === 'id') {
      //   newRow.classId = this.getId()
      //   // newIndex = index + 1
      //   const list = this.wholeObj.tableData
      //   list.forEach((element, index) => {
      //     if (
      //       index + 1 >= list.length ||
      //       (list[index + 1] && list[index + 1]['id'] !== element['id'])
      //     ) {
      //       newIndex = index
      //     }
      //   })
      // }

      // 删除数据
      this.wholeObj.tableData.splice(newIndex, 0, newRow)

      this.wholeObj.tableData = this.setTimeList(this.wholeObj.tableData)
      // 重新计算合并规则

      this.setRowSpan()
    },

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

      // 品类拆分
      if (columnIndex <= 6) {
        if (row.classIdRowSpan) {
          return {
            rowspan: row.classIdRowSpan,
            colspan: 1
          }
        }
        return this.noRowSpan()
      }
    },
    // 合并规则
    setRowSpan() {
      this.getSpanArr('id')
      this.getSpanArr('classId')
      this.getSpanArr('timeId')
      this.resetTimeList('classIdRowSpan')
      this.$nextTick(() => {
        this.update++
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
    }
  }
}
</script>

<style lang="scss" scoped>
.ysn-form {
  ::v-deep .el-input--medium .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}
.operation {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.add-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC3klEQVRoBe1YPWgUURCeufMHDJdagmBjLCysDNhY2N2eIFikSnNgWpu0ooSIhY2NnVhc4VUpBMHsdbaCjSikiY0g0TYmJxjJjjO7e+Q49t7M2+xGQt42t7cz+33zzZv39r0BCFfIQMhAyEDIwGnOAFYlfnF18dzvb7u3ieBuAnANCeYIaE7wEXCbELYbAJuI8PbC5db79dX1/Sq4jyyg0+1cJDp4zGEuccCzlqBY0C8A6iM21zZ6Gz8t70zzKS0gehCdh114SJSsMPjMNALl+RCx8Rxa8DR+Ef9RfAvNpQSkWYfkDRHdLET1fIiIHxAa98qMhreA9nL7Ov6Fd1wulzzjdLpzWX3n0eiwiC9Oxwmjl4Cs3pOPVQc/iikXseAzErww2C6peZKyqTjz4+yCLRzp/Bo3OO7NArIJW03NO+KBdF7x4uDyGbeZSkhKJ6GDr/yi12oT9wYpV9Rtj3Na7ocNbF6xlJJpBLJ13i94S5QOn5mc0+GSmVQB8oWVj5SKVLkDLmXcbmBVQLo9MH5h3VR+Vp7Qs8KtvaUKkL2NBlKX3cKtCpCNWV0BargWblWA7Co1orrsFu4zGjnXolPAaKl04bh8XEusxi2c6gi4Aqvbxps80jjUEUgPI0BXpwG5MjjKvMtnGm76nOCH085GdQTkJKWB1GW3cKsC2GGzrgA1XAu3KkDOsBpRXXYLtypADuDZGbauMItxhVO4i62HT1UBWfeA+oevHNcd9S2dC1WAhCvdA/4ZHlfowpVzqpSm84CgRN1ojTsQj1TEChz4bPwk7sXcqtEv0wikMNz6kO6BDnk0j5SDuawo5hEQwBN9qBcBcsSjs3BHugfyv8pLMPO2ilenzl5CebSDV4PPTLRQZTkJlmD69oQkpGaZLG592tqbvzX/Gvdls0U3GIOPnaUuaS0+gxbej1/GO2UQvOZAEUE2L05gc3dSzP9qr0/GEf6HDIQMhAyEDJyuDPwD2MAF4UaQ6IgAAAAASUVORK5CYII=)
    no-repeat;
  background-size: contain;
}
.minus-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: contain;
}
</style>

<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-09 18:32:54
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-05 19:27:10
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="wholeObj"
      prop="tableData"
      :show-slots="add"
      :column="formTableConfig"
      :span-method="arraySpanMethod"
    >

      <template #leaseArea="scope">
        <div v-if="typeof scope.row.leaseArea === 'object'">
          <div v-for="(item,index) in scope.row.leaseArea" :key="index">
            <div>{{ item }}</div>
          </div>
        </div>
        <div v-else> {{ scope.row.leaseArea }}</div>
      </template>

      <template #beginningDate="scope">
        <el-date-picker
          v-model="scope.row.beginningDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :disabled="scope.row.beginningDate === listObj.businessAffairs.contBeginDate || disabledDate.includes(scope.row.beginningDate)"
          :picker-options="pickerOptionsBegin(scope.row,scope.$index)"
        />
      </template>

      <template #endingDate="scope">
        <el-date-picker
          v-model="scope.row.endingDate"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :disabled="scope.row.endingDate === listObj.businessAffairs.contEndDate || disabledDate.includes(scope.row.endingDate)"
          :picker-options="pickerOptionsEnd(scope.row,scope.$index)"
        />
      </template>
      <!-- 时间拆分 -->
      <template #t12="scope">
        <span v-if="scope.row.timeIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'id')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
        <span v-if="scope.row.idShowAdd" class="operation minus-icon" />
      </template>

      <template #name="scope">
        <span v-if="scope.row.classIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'classId')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>

      <template #monthlyEstimatedTurnover="scope">
        <el-input v-model="scope.row.monthlyEstimatedTurnover" placeholder="请输入内容" />
      </template>
      <template #class="scope">
        <!-- <el-input v-model="scope.row.class" placeholder="请输入内容" /> -->
        <div class="ysn-form">
          <el-select v-model="scope.row.class" placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

      </template>
      <template #salesTaxRate="scope">
        <div class="ysn-form">
          <el-select v-model="scope.row.salesTaxRate" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
      <template #commDiscountApply="scope">
        <el-input v-model="scope.row.commDiscountApply" placeholder="请输入内容" />
      </template>
    </ysn-formTable>
    <div class="flex-ju-end mt-20">
      <ysn-btn class="mr-8" @click="ok">生成费用</ysn-btn>
      <!-- <ysn-btn class="mr-8" type="info" @click="ok">批量填写申请单价</ysn-btn> -->
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
          <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
        </div>
        <ysn-btn slot="reference" class="mr-8" type="info">批量填写申请单价</ysn-btn>
      </el-popover>
      <!-- <ysn-btn type="info" @click="ok">保存并返回</ysn-btn> -->
      <ysn-btn v-if="!status" type="info" @click="ok">保存并返回</ysn-btn>
      <ysn-btn v-if="status==='1'" type="info" @click="isstatus">保存并返回</ysn-btn>
    </div>
  </div>
</template>
<script>
// import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import agreementTableRowSpan from '@/mixins/agreementTableRowSpan'
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
    tax: { type: Number, default: 0 }
  },
  data() {
    return {
      options: [
        { value: '0',
          label: '是' },
        { value: '1',
          label: '否' }
      ],
      option: [
        { value: '1001',
          label: '1001/品类1' },
        { value: '1002',
          label: '1002/品类2' }
      ],
      val: '',
      visible: false,
      wholeObj: {
        tableData: [
          { leaseArea: '11', freeScope: '21', t6: '', t8: '2021-1-1', t11: '', id: 1 }
        ]
      },
      id: 1,
      isfalg: false,
      idx: null,
      tableData: [
        { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' }

      ],

      // formTableConfig: [
      //   { leaseArea: '租赁区域',  width: '200px', itemType: 'text', isShowSlots: true },
      //   { standardUnitPrice: '标准单价', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
      //   { leasTterm: '租赁期间', tableList: [
      //     { beginningDate: '开始', width: '260px', itemType: 'text' },
      //     { endingDate: '结束', itemType: 'text', width: '260px' },
      //     { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
      //     { LeaseCycle: '年/月/日', align: '年/月/日', wdith: '300px', itemType: 'text' }
      //   ] },
      //   { t12: '拆分租期', itemType: '', hasSlot: true },
      //   { tax: '税率', itemType: 'text' },
      //   { leasTterm: '固定提成申请条件', tableList: [
      //     { monthlyEstimatedTurnover: '月预估营业额', width: '110px', itemType: 'input', hasSlot: true },
      //     { class: '品类', width: '110px', itemType: 'input', hasSlot: true },
      //     { commDiscountApply: '申请扣率', width: '110px', itemType: 'input', hasSlot: true },
      //     { name: '操作', width: '', itemType: '', hasSlot: true }
      //   ]
      //   }
      // ],

      spanArr: [],
      pos: []

    }
  },
  computed: {
    add() {
      if (this.typeStatus.isRentShop === '1') {
        return ['leaseArea', 't12', 'name', 'monthlyEstimatedTurnover', 'class', 'commDiscountApply', 'beginningDate', 'endingDate', 'salesTaxRate']
      }
      return ['t12', 'name', 'monthlyEstimatedTurnover', 'class', 'commDiscountApply', 'beginningDate', 'endingDate', 'salesTaxRate']
    },
    formTableConfig() {
      if (this.tax === 1 || this.tax === 3) {
        return [
          { leaseArea: '租赁区域', width: '200px', itemType: 'text', isShowSlots: true },
          { standardUnitPrice: '标准单价', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
          { leasTterm: '租赁期间', tableList: [
            { beginningDate: '开始', width: '260px', itemType: 'text' },
            { endingDate: '结束', itemType: 'text', width: '260px' },
            { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
            { LeaseCycle: '年/月/日', align: '年/月/日', wdith: '300px', itemType: 'text' }
          ] },
          { t12: '拆分租期', itemType: '', hasSlot: true },
          // { tax: '税率', itemType: 'text' },
          { leasTterm: '固定提成申请条件', tableList: [
            { monthlyEstimatedTurnover: '月预估营业额', width: '110px', itemType: 'input', hasSlot: true },
            { class: '品类', width: '160px', itemType: 'input', hasSlot: true },
            { commDiscountApply: '申请扣率', width: '110px', itemType: 'input', hasSlot: true },
            { name: '操作', width: '', itemType: '', hasSlot: true }
          ]
          }
        ]
      }
      return [
        { leaseArea: '租赁区域', width: '200px', itemType: 'text', isShowSlots: true },
        { standardUnitPrice: '标准单价', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { leasTterm: '租赁期间', tableList: [
          { beginningDate: '开始', width: '260px', itemType: 'text' },
          { endingDate: '结束', itemType: 'text', width: '260px' },
          { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
          { LeaseCycle: '年/月/日', align: '年/月/日', wdith: '300px', itemType: 'text' }
        ] },
        { t12: '拆分租期', itemType: '', hasSlot: true },
        // { tax: '税率', itemType: 'text' },
        { leasTterm: '固定提成申请条件', tableList: [
          { monthlyEstimatedTurnover: '月预估营业额', width: '110px', itemType: 'input', hasSlot: true },
          { class: '品类', width: '160px', itemType: 'input', hasSlot: true },
          // { salesTaxRate: '销售额税率', itemType: '', hasSlot: true, width: '110px' },
          { salesTaxRate: '销售额税率', itemType: 'input', width: '110px' },
          // prop: 'salesTaxRate', label: '销售额税率', placeholder: '请输入', width: '206px', span: 2, list: this.$PUBFN.getOptionsList('txd'), listName: 'label', listValue: 'value'
          { commDiscountApply: '申请扣率', width: '110px', itemType: 'input', hasSlot: true },
          { name: '操作', width: '', itemType: '', hasSlot: true }
        ]
        }
      ]
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
    // 传入id一样时 租赁区域合并

    this.$nextTick(() => {
      this.setRowSpan()
    })
  },
  methods: {
    ok() {
      this.$emit('ok', this.wholeObj.tableData)
    },
    isstatus() {
      this.$emit('isstatus', this.wholeObj.tableData)
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
      if (columnIndex <= 1) {
        if (row.idRowSpan) {
          return {
            rowspan: row.idRowSpan,
            colspan: 1
          }
        }
        return this.noRowSpan()
      }

      // 品类拆分
      if (columnIndex <= 5) {
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
  ::v-deep .el-tooltip {
    // background: red;
    width:100% !important
}
}
</style>

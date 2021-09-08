<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-11 13:04:01
 * @LastEditors: fhj
 * @LastEditTime: 2021-07-25 20:43:28
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
          placeholder="结束日期日期"
          value-format="yyyy-MM-dd"
          :disabled="scope.row.endingDate === listObj.businessAffairs.contEndDate || disabledDate.includes(scope.row.endingDate)"
          :picker-options="pickerOptionsEnd(scope.row,scope.$index)"
        />
      </template>

      <template #leaseArea="scope">
        <div v-if="typeof scope.row.leaseArea === 'object'">
          <div v-for="(item,index) in scope.row.leaseArea" :key="index">
            <div>{{ item }}</div>
          </div>
        </div>
        <div v-else> {{ scope.row.leaseArea }}</div>
      </template>

      <!-- 操作1 -->
      <template #t12="scope">
        <span v-if="scope.row.timeIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'id')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
        <span v-if="scope.row.idShowAdd" class="operation minus-icon" />

      </template>

      <!-- 操作2 -->
      <template #name="scope">
        <span v-if="scope.row.classIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'classId')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>

      <template #name1="scope">
        <span v-if="scope.row.optionsIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'optionsId')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>
    </ysn-formTable>
    <div class="flex-ju-end mt-20">
      <ysn-btn class="mr-8" @click="ok">生成费用</ysn-btn>
      <ysn-btn class="mr-8" type="info" @click="ok">批量填写申请单价</ysn-btn>
      <ysn-btn type="info" @click="ok">保存并返回</ysn-btn>
    </div>
  </div>
</template>
<script>
import agreementTableRowSpan from '@/mixins/agreementTableRowSpan'
export default {
  name: 'RentFreePeriod',
  mixins: [agreementTableRowSpan],
  props: {
    data: { type: Array, default: () => [] },
    typeStatus: {
      type: Object,
      default: () => {}
    },
    // 外部数据
    listObj: { type: Object, default: () => {} }
  },
  data() {
    return {
      wholeObj: {
        tableData: [
          // { leaseArea: '11', freeScope: '21', t6: '', t8: '2021-1-1', t11: '', id: 1 }
        ]
      },
      id: 1,
      isfalg: false,
      idx: null,
      list: [
        { name: '铺位预算一' },
        { name: '铺位预算二' },
        { name: '铺位预算三' }
      ],
      tableData: [

      ],

      formTableConfig: [
        { leaseArea: '租赁区域', itemType: 'text', width: '150px', isShowSlots: true },
        { freeScope: '标准单价', width: '150px', type: 'money', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        // { leasTterm: '租赁期间', tableList: [
        { beginningDate: '开始', width: '240px', itemType: 'text' },
        { endingDate: '结束', width: '240px', itemType: 'text' },
        { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
        { t4: '年/月/日', wdith: '300px', itemType: 'text' },
        // ] },
        { t12: '拆分租期', itemType: '', hasSlot: true },
        { tax: '税率', itemType: 'text' },
        // { leasTterm: '总额阶梯提成申请条件', tableList: [

        { tt: '月预估营业额', width: '150px', itemType: 'input' },
        { ss: '品类', width: '150px', itemType: 'input' },
        { name: '操作', width: '100px', itemType: 'input', hasSlot: true },
        { zz: '月营业额起', width: '150px', itemType: 'input' },
        { ww: '月营业额止', width: '150px', itemType: 'input' },
        { name3: '申请扣率', width: '150px', itemType: 'input' },
        { name1: '操作', width: '100px', itemType: 'input', hasSlot: true }
        // ]
        // }
      ],

      spanArr: [],
      pos: [],
      update: 0, // 数据更新
      disabledDate: [] // 禁用年月

    }
  },
  computed: {
    add() {
      if (this.typeStatus.isRentShop === '1') {
        return ['t12', 'name', 'monthlyEstimatedTurnover', 'startingMonthlyTurnover', 'commDiscountApply', 'endingMonthlyTurnover', 'leaseArea', 'beginningDate', 'endingDate']
      }
      return ['t12', 'name', 'monthlyEstimatedTurnover', 'startingMonthlyTurnover', 'commDiscountApply', 'endingMonthlyTurnover', 'beginningDate', 'endingDate']
    }
  },
  mounted() {
    let list = JSON.parse(JSON.stringify(this.data)).map(item => {
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
    addData(row, index, props) {
      let newIndex = index
      // const list = this.wholeObj.tableData
      // list.forEach((element, index) => {
      //   if (index + 1 >= list.length || list[index + 1] && list[index + 1]['id'] !== element['id']) {
      //     newIndex = index
      //   }
      // })
      console.log(newIndex)
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
        newRow.optionsId = this.getId()
        const list = this.wholeObj.tableData
        list.forEach((element, index) => {
          if (index + 1 >= list.length || list[index + 1] && list[index + 1]['id'] !== element['id']) {
            newIndex = index
          }
        })
      }

      // 第二个id 最后一个操作不合并
      if (props === 'classId') {
        newRow.optionsId = this.getId()
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
      if (columnIndex <= 6) {
        if (row.classIdRowSpan) {
          return {
            rowspan: row.classIdRowSpan,
            colspan: 1
          }
        }
        return this.noRowSpan()
      }

      // 折扣率拆分
      if (columnIndex < 11) {
        if (row.optionsIdRowSpan) {
          return {
            rowspan: row.optionsIdRowSpan,
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
      this.getSpanArr('optionsId')
      this.getSpanArr('timeId')
      this.resetTimeList('classIdRowSpan')
      console.log(this.wholeObj.tableData)
      this.$nextTick(() => {
        this.update++
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
}
</style>

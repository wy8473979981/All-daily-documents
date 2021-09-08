<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-09 18:32:54
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-13 11:41:48
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="wholeObj"
      prop="tableData"
      :show-slots="['t12','name','monthlyEstimatedTurnover','class','commDiscountApply']"
      :column="formTableConfig"
      :span-method="arraySpanMethod"
    >
      <template #t12="scope">
        <span v-if="scope.$index===0" class="operation add-icon" @click="addData(scope.row,scope.$index)" />
        <span v-if="scope.row.isShowAdd" class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>
      <template #name="scope">
        <span v-if="scope.row.isShowAdd||scope.$index === 0" class="operation add-icon" @click="operation(scope.row,scope.$index)" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>

      <template #monthlyEstimatedTurnover="scope">
        <el-input v-model="scope.row.monthlyEstimatedTurnover" placeholder="请输入内容" />
      </template>
      <template #class="scope">
        <el-input v-model="scope.row.class" placeholder="请输入内容" />
      </template>
      <template #commDiscountApply="scope">
        <el-input v-model="scope.row.commDiscountApply" placeholder="请输入内容" />
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
// import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'RentFreePeriod',
  // mixins: [pageAccorDetailCom],
  // model: {
  //   prop: 'rentFreePeriod',
  //   event: 'change'
  // },
  // props: {
  //   rentFreePeriod: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  data() {
    return {
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

      formTableConfig: [
        { leaseArea: '租赁区域', itemType: 'text', isShowSlots: true },
        { standardUnitPrice: '标准单价', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { leasTterm: '租赁期间', tableList: [
          { beginningDate: '开始', width: '260px', itemType: 'text' },
          { endingDate: '结束', itemType: 'text' },
          { isPromotional: '优惠期', wdith: '300px', itemType: 'text' },
          { LeaseCycle: '年/月/日', align: '年/月/日', wdith: '300px', itemType: 'text' }
        ] },
        { t12: '拆分租期', itemType: '', hasSlot: true },
        { tax: '税率', itemType: 'text' },
        { leasTterm: '固定提成申请条件', tableList: [
          { monthlyEstimatedTurnover: '月预估营业额', width: '110px', itemType: 'input', hasSlot: true },
          { class: '品类', width: '110px', itemType: 'input', hasSlot: true },
          { commDiscountApply: '申请扣率', width: '110px', itemType: 'input', hasSlot: true },
          { name: '操作', width: '', itemType: '', hasSlot: true }
        ]
        }
      ],

      spanArr: [],
      pos: []

    }
  },
  mounted() {
    this.getSpanArr(this.wholeObj.tableData)
  },
  methods: {
    ok() {
      this.$emit('ok')
    },
    // // 后面删除
    minusData(index) {
      console.log(index)
      this.currentFormData.rentFreePeriod.splice(index, 1)
      this.getSpanArr(this.wholeObj.tableData)
    },
    // 删除
    // minusDataBefore(index) {
    //   console.log(index)
    //   this.currentFormData.rentFreePeriod.splice(index, 1)
    //   this.getSpanArr(this.currentFormData.rentFreePeriod)
    // },
    // 前面操作
    addData(row, index) {
      this.id++
      console.log(index)
      this.idx = index
      this.isfalg = false
      this.wholeObj.tableData.push(
        { leaseArea: '铺位区域1', id: this.id, freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '', operation: '' }
      )
      this.getSpanArr(this.wholeObj.tableData)
    },
    // 后面操作
    operation(row, index) {
      this.idx = index
      this.isfalg = true
      const rentFreePeriod = this.wholeObj.tableData
      console.log(rentFreePeriod)
      let ind = 0
      for (let i = 0; i < rentFreePeriod.length; i++) {
        console.log(i)
        const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].id : false // 下一行id
        const curentId = rentFreePeriod[i].id // 当前行id
        console.log(nextId)
        console.log(curentId)
        // 针对第一行的情况
        if (!nextId && curentId === row.id) {
          console.log('走进去1')
          console.log(i)
          ind = i
        } else if (nextId !== curentId && curentId === row.id) {
          console.log('走进去2', row, curentId)
          console.log(i)
          ind = i
        }
      }
      rentFreePeriod.splice(ind, 0, { leaseArea: '铺位区域1', id: row.id, freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '', operation: '' })
      console.log(rentFreePeriod)
      this.getSpanArr(rentFreePeriod)
    },
    // 数据处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(this.isfalg && this.idx)
      if (this.isfalg) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) {
          if (this.spanArr[rowIndex] > 0) {
            return {
              rowspan: this.spanArr[rowIndex],
              colspan: 1
            }
          }
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (!this.isfalg && this.idx != null) {
        // console.log(this.spanArr[rowIndex])
        // console.log(rowIndex)
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          if (this.spanArr[rowIndex] > 0) {
            return {
              rowspan: this.spanArr[rowIndex],
              colspan: 1
            }
          }
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 合并规则
    getSpanArr(data, idx) {
      this.spanArr = []
      this.pos = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
            data[i].isShowAdd = false
          } else {
            data[i].isShowAdd = true
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      console.log(this.spanArr)
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

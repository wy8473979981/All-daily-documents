<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 17:29:26
 * @LastEditors: fhj
 * @LastEditTime: 2021-07-16 18:35:34
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      :key="tableKey"
      v-model="currentFormData"
      prop="rentFreePeriod"
      :column="formTableConfig"
      :show-slots="['id']"
      :span-method="arraySpanMethod"
    >
      <template #leaseArea>
        <div v-for="(item,index) in data.businessAffairs.leaseArea" :key="index">
          <div>{{ item }}</div>
        </div>
      </template>

      <template #conFeeType="scope">
        <span v-if="scope.$index===0" class="operation add-icon" @click="addData(scope.row,scope.$index)" />
        <span v-else class="operation minus-icon" @click="minusData1(scope.row,scope.$index)" />
      </template>
      <template #operation="scope">
        <span v-if="scope.row.isShowAdd||scope.$index === 0" class="operation add-icon" @click="operation(scope.row,scope.$index)" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>
    </ysn-formTable>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'RentFreePeriod',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'rentFreePeriod',
    event: 'change'
  },
  props: {
    rentFreePeriod: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: 1,
      isfalg: false,
      idx: null,
      list: [
        { name: '铺位预算一' },
        { name: '铺位预算二' },
        { name: '铺位预算三' }
      ],
      tableKey: 0,
      // formTableConfig: [
      //   { leaseArea: '租赁区域', itemType: 'text' },
      //   { freeScope: '免租范围', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
      //   { conFeeType: '操作', itemType: '', hasSlot: true },
      //   { freeStartDate: '免租开始日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '206px' },
      //   { freeEndDate: '免租结束日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
      //   { apply: '标准/申请', itemType: 'text', formatter: row => {
      //     return ''
      //     // row.apply + row.Standard
      //   } },
      //   { operation: '操作', itemType: 'text', hasSlot: true }
      // ],
      spanArr: [],
      pos: []

    }
  },
  computed: {
    formTableConfig() {
      const businessAffairs = this.data.businessAffairs
      const list = [
        { freeScope: '免租范围', itemType: 'selectDialog', list: this.$PUBFN.getOptionsList('freeLive'), listName: 'label', listValue: 'value', width: '164px' },
        { conFeeType: '操作', itemType: '', hasSlot: true },
        { freeStartDate: '免租开始日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '164px' },
        { freeEndDate: '免租结束日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '164px' },
        { apply: '标准/申请', itemType: 'text', formatter: row => {
          return ''
          // row.apply + row.Standard
        } },
        { operation: '操作', itemType: 'text', hasSlot: true }
      ]
      if (businessAffairs.isRentShop === '1') {
        return [
          { leaseArea: '租赁区域', itemType: 'text', hasSlot: true },
          ...list
        ]
      }
      return [
        { leaseArea: '租赁区域', itemType: 'text' },
        ...list
      ]
    }
  },
  mounted() {
    if (this.data.businessAffairs.isRentShop === '0') {
      const leaseArea = this.data.businessAffairs.leaseArea
      const rentFreePeriod = this.currentFormData.rentFreePeriod
      const key = Object.keys(rentFreePeriod[0])
      const moren = rentFreePeriod[0]
      for (let i = 0; i < leaseArea.length; i++) {
        rentFreePeriod[i] = {}
        for (let j = 0; j < key.length; j++) {
        // console.log(key[j])
          console.log(moren[key[j]])
          rentFreePeriod[i][key[j]] = moren[key[j]]
        }
        // console.log(b)
        rentFreePeriod[i].leaseArea = leaseArea[i]
        rentFreePeriod[i].id = i + 1
      }
      console.log(rentFreePeriod)
    } else {
      this.currentFormData.rentFreePeriod = []
      this.currentFormData.rentFreePeriod = [
        { leaseArea: '', id: 1, freeScope: [], freeStartDate: '', freeEndDate: '', apply: '' }
      ]
    }

    // console.log(this.currentFormData.rentFreePeriod)
    this.getSpanArr(this.currentFormData.rentFreePeriod)
    // console.log(this.data.businessAffairs)
    // if (businessAffairs.isRentShop === '1') {
    //   console.log('选择了否')
    // }
  },
  methods: {
  // // 后面删除
    minusData(index) {
      console.log(index)
      this.currentFormData.rentFreePeriod.splice(index, 1)
      this.getSpanArr(this.currentFormData.rentFreePeriod)
      this.tableKey++
    },
    minusData1(row, index) {
      console.log(row)
      console.log(index)
      var add = 0
      for (let i = 0; i < this.currentFormData.rentFreePeriod.length; i++) {
        console.log(this.currentFormData.rentFreePeriod[i].id)
        if (row.id === this.currentFormData.rentFreePeriod[i].id) {
          add++
        }
      }
      console.log(add)
      this.currentFormData.rentFreePeriod.splice(index, add)
      this.getSpanArr(this.currentFormData.rentFreePeriod)
    },
    // 删除
    // minusDataBefore(index) {
    //   console.log(index)
    //   this.currentFormData.rentFreePeriod.splice(index, 1)
    //   this.getSpanArr(this.currentFormData.rentFreePeriod)
    // },
    // 前面操作
    addData(row, index) {
      console.log('我说你')
      this.id++
      console.log(this.id)
      console.log(this.currentFormData.rentFreePeriod)
      // console.log(index)
      this.idx = index
      this.isfalg = false
      this.currentFormData.rentFreePeriod.push(
        { leaseArea: '铺位区域1', id: this.id, freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '', operation: '' }
      )
      // if(){}
      this.getSpanArr(this.currentFormData.rentFreePeriod)
      this.tableKey++
    },
    // 后面操作
    operation(row, index) {
      this.idx = index
      this.isfalg = true
      const { rentFreePeriod } = this.currentFormData
      console.log(rentFreePeriod.concat())
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
      this.tableKey++
    },
    // 数据处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(this.isfalg && this.idx)
      if (this.isfalg) {
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


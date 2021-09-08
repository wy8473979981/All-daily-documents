<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 17:29:26
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-16 13:14:19
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      :key="tableKey"
      v-model="currentFormData"
      prop="rentFreePeriod"
      :column="formTableConfig"
      :show-slots="['id','freeStartDate','freeEndDate']"
      :span-method="arraySpanMethod"
    >
      <template #freeStartDate="scope">
        <el-date-picker
          v-model="scope.row.freeStartDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptionsBegin(scope.row,scope.$index)"
        />
      </template>

      <template #freeEndDate="scope">
        <el-date-picker
          v-model="scope.row.freeEndDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd(scope.row,scope.$index)"
        />
      </template>
      <template #leaseArea>
        <!-- {{ data.businessAffairs.leaseArea }} -->
        <div v-for="(item,index) in data.businessAffairs.leaseArea" :key="index">
          <div>{{ item }}</div>
        </div>
      </template>

      <template #conFeeType="scope">
        <span v-if="scope.row.idShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'id')" />
        <span v-else class="operation minus-icon" @click="minusData1(scope.row,scope.$index)" />
      </template>
      <template #operation="scope">
        <span v-if="scope.row.classIdShowAdd" class="operation add-icon" @click="addData(scope.row,scope.$index,'classId')" />
        <span v-else class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>
    </ysn-formtable>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { spacingText } from '@/utils/index'
import add from '@/mixins/add'
export default {
  name: 'RentFreePeriod',
  mixins: [pageAccorDetailCom, add],
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
      tableKey: 0,
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
        { freeStartDate: '免租开始日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '260px', hasSlot: true },
        { freeEndDate: '免租结束日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '260px', hasSlot: true },
        { apply: '申请天数', itemType: 'text', formatter: row => {
          // row.apply + row.Standard
          return spacingText(row.freeEndDate, row.freeStartDate)
        } },
        { operation: '操作', itemType: 'text', hasSlot: true }
      ]
      if (businessAffairs.isRentShop === 1) {
        return [
          { leaseArea: '租赁区域', width: '120px', itemType: 'text', hasSlot: true },
          ...list
        ]
      }
      return [
        { leaseArea: '租赁区域', itemType: 'text', width: '120px' },
        ...list
      ]
    }
  },
  mounted() {
    for (let i = 0; i < this.currentFormData.rentFreePeriod.length; i++) {
      if (this.currentFormData.rentFreePeriod[i].classIdRowSpan) {
        this.currentFormData.rentFreePeriod[i].classIdRowSpan = null
      }
    }
    console.log(this.currentFormData.rentFreePeriod, '__________', this.data.businessAffairs.isRentShop)
    // 不拆行
    if (this.data.businessAffairs.isRentShop === 0) {
      const leaseArea = this.data.businessAffairs.leaseArea
      console.log(leaseArea)
      // this.currentFormData.rentFreePeriod = []
      this.currentFormData.rentFreePeriod = [{ leaseArea: '', freeScope: [], freeStartDate: '', freeEndDate: '', apply: '' }]
      const rentFreePeriod = this.currentFormData.rentFreePeriod
      const key = Object.keys(rentFreePeriod[0])
      const moren = rentFreePeriod[0]
      console.log(key, moren)
      for (let i = 0; i < leaseArea.length; i++) {
        rentFreePeriod[i] = {}
        console.log(rentFreePeriod[i])
        for (let j = 0; j < key.length; j++) {
          console.log(key[j])
          // console.log(moren[key[j]])
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
    console.log(this.currentFormData.rentFreePeriod, '__________')
    // this.getSpanArr(this.currentFormData.rentFreePeriod)
    // list = this.mergeData(list)
    this.currentFormData.rentFreePeriod = this.mergeData(this.currentFormData.rentFreePeriod)
    this.$nextTick(() => {
      this.setRowSpan()
      console.log(this.currentFormData.rentFreePeriod, '__________')
    })
    // console.log(this.currentFormData, '__________')
  },
  methods: {
    // 合并规则
    setRowSpan() {
      this.getSpanArr('id')
      this.getSpanArr('classId')
      this.getSpanArr('timeId')
      this.resetTimeList('classIdRowSpan')
      this.$nextTick(() => {
        this.tableKey++
        console.log('setRowSpan', this.currentFormData.rentFreePeriod)
      })
    },
    // 根据props清洗数据
    // resetTimeList(props) {
    //   console.log(props, '_______')
    //   const list = JSON.parse(JSON.stringify(this.currentFormData.rentFreePeriod))
    //   list.forEach((el, index) => {
    //     if (el[props] > 0) {
    //       console.log(el[props])
    //       // list[index].endingDate = list[index + el[props] - 1].endingDate
    //     }
    //   })
    //   this.currentFormData.rentFreePeriod = list
    //   console.log(this.currentFormData.rentFreePeriod)
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

      // 品类拆分
      if (columnIndex <= 2) {
        if (row.classIdRowSpan) {
          console.log(row.classIdRowSpan)
          return {
            rowspan: row.classIdRowSpan,
            colspan: 1
          }
        }
        return this.noRowSpan()
      }
    },
    // changTime(row, index) {
    //   const freeStartDate = new Date(row.freeStartDate).getTime()
    //   const freeEndDate = new Date(row.freeEndDate).getTime()
    //   row.apply = (freeEndDate - freeStartDate) / (24 * 60 * 60 * 1000)
    //   console.log((freeEndDate - freeStartDate) / (24 * 60 * 60 * 1000))
    // },
    // pickerOptionsEnd(row, index) {
    //   if (!row.freeStartDate) {
    //     return {
    //       disabledDate(time) {
    //         return true
    //       }
    //     }
    //   }
    //   return {
    //     disabledDate(time) {
    //       return time.getTime() < new Date(row.freeStartDate).getTime() + (24 * 60 * 60 * 1000)
    //     }
    //   }
    //   // }
    // },
    // // 后面删除
    // minusData(index) {
    //   console.log(index)
    //   this.currentFormData.rentFreePeriod.splice(index, 1)
    //   this.getSpanArr(this.currentFormData.rentFreePeriod)
    //   this.tableKey++
    // },
    minusData1(row, index) {
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
    addData(row, index, props) {
      const newIndex = index
      var ind = 0
      row.freeScope = []
      const newRow = JSON.parse(JSON.stringify(row))
      if (!newRow[props]) {
        newRow[props] = this.getId()
      }

      // 合并业务 第一个id其他几行不合并
      if (props === 'id') {
        newRow.classId = this.getId()
        // newIndex = index + 1
        const list = this.currentFormData.rentFreePeriod
        // list.forEach((element, index) => {
        //   if (
        //     index + 1 >= list.length ||
        //     (list[index + 1] && list[index + 1]['id'] !== element['id'])
        //   ) {
        //     newIndex = index
        //   }
        // })
        // const rentFreePeriod = this.currentFormData.rentFreePeriod
        // for (let i = 0; i < rentFreePeriod.length; i++) {
        //   console.log(i)
        //   const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].id : false // 下一行id
        //   const curentId = rentFreePeriod[i].id // 当前行id
        //   // 针对第一行的情况
        //   if (!nextId && curentId === row.id) {
        //     ind = i
        //   } else if (nextId !== curentId && curentId === row.id) {
        //     ind = i
        //   }
        // }
        // console.log(ind)
      }
      console.log(newIndex)
      console.log(newRow)
      // newRow.freeScope = []
      this.currentFormData.rentFreePeriod.splice(index, 0, newRow)

      this.currentFormData.rentFreePeriod = this.setTimeList(this.currentFormData.rentFreePeriod)
      // 重新计算合并规则

      this.setRowSpan()
    }
    // 后面操作
    // operation(row, index) {
    //   this.idx = index
    //   this.isfalg = true
    //   const { rentFreePeriod } = this.currentFormData
    //   console.log(rentFreePeriod.concat())
    //   let ind = 0
    //   for (let i = 0; i < rentFreePeriod.length; i++) {
    //     console.log(i)
    //     const nextId = rentFreePeriod[i + 1] ? rentFreePeriod[i + 1].id : false // 下一行id
    //     const curentId = rentFreePeriod[i].id // 当前行id
    //     console.log(nextId)
    //     console.log(curentId)
    //     // 针对第一行的情况
    //     if (!nextId && curentId === row.id) {
    //       console.log(i)
    //       ind = i
    //     } else if (nextId !== curentId && curentId === row.id) {
    //       console.log(i)
    //       ind = i
    //     }
    //   }
    //   rentFreePeriod.splice(ind + 1, 0, { leaseArea: '', id: row.id, freeScope: '', freeStartDate: '', freeEndDate: '', apply: '', operation: '' })
    //   console.log(rentFreePeriod)
    //   this.getSpanArr(rentFreePeriod)
    //   this.tableKey++
    // }
    // 数据处理
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   // console.log(this.isfalg && this.idx)
    //   if (this.isfalg) {
    //     if (columnIndex === 0) {
    //       if (this.spanArr[rowIndex] > 0) {
    //         return {
    //           rowspan: this.spanArr[rowIndex],
    //           colspan: 1
    //         }
    //       }
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    //   if (!this.isfalg && this.idx != null) {
    //     // console.log(this.spanArr[rowIndex])
    //     // console.log(rowIndex)
    //     if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
    //       if (this.spanArr[rowIndex] > 0) {
    //         return {
    //           rowspan: this.spanArr[rowIndex],
    //           colspan: 1
    //         }
    //       }
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // }
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
</style>


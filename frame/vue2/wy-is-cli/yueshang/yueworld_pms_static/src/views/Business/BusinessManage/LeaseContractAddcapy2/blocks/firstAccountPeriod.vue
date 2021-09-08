<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 11:34:25
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-25 18:37:22
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="firstAccountPeriod"
      :column="formTableConfig"
      :show-slots="['operation','paymentBegin','paymentEnd','firstPaymentDate']"
    >
      <template #operation="scope">
        <span class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>

      <template #paymentBegin="scope">
        <el-date-picker
          v-model="scope.row.paymentBegin"
          type="date"
          placeholder="选择日期"
        />
      </template>
      <template #paymentEnd="scope">
        <el-date-picker
          v-model="scope.row.paymentEnd"
          :picker-options="pickerOptionsEnd(scope.row,scope.$index)"
          type="date"
          placeholder="选择日期"
        />
      </template>
      <template #firstPaymentDate="scope">
        <el-date-picker
          v-model="scope.row.firstPaymentDate"
          type="date"
          placeholder="选择日期"
        />
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'FirstAccountPeriod',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'firstAccountPeriod',
    event: 'change'
  },
  props: {
    firstAccountPeriod: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // formTableConfig: [
      //   { conFeeType: '收款项目', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
      //   { paymentBegin: '账单开始', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
      //   { paymentEnd: '账单结束', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
      //   { firstPaymentDate: '首款缴费日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
      //   { paymentTotalAmount: '总额', itemType: 'input' },
      //   { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
      //   { operation: '操作', itemType: 'input' }
      // ]
    }
  },
  computed: {
    isDisable() {
      if (this.$attrs.data.dataRes.greeting.editingTotalAmount === '允许') {
        return false
      }
      return true
    },
    formTableConfig() {
      return [
        { conFeeType: '收款项目', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { paymentBegin: '账单开始', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { paymentEnd: '账单结束', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { firstPaymentDate: '首款缴费日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { paymentTotalAmount: '总额', itemType: 'input', disabled: this.isDisable },
        { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { operation: '操作', itemType: 'input' }
      ]
    }
  },

  mounted() {

  },
  methods: {
    flodClick() {
      console.log(this.$attrs.data.dataRes.greeting.editingTotalAmount)
      console.log('headerClick')
      console.log(this.currentFormData)
      this.currentFormData.firstAccountPeriod.push(
        { conFeeType: '', firstPaymentDate: '', paymentBegin: '', paymentEnd: '', paymentTotalAmount: '', tax: '' }
      )
    },
    minusData(index) {
      this.currentFormData.firstAccountPeriod.splice(index, 1)
    },
    pickerOptionsEnd(row, index) {
      console.log(row.paymentBegin)
      if (!row.paymentBegin) {
        return {
          disabledDate(time) {
            return true
          }
        }
      }
      return {
        disabledDate(time) {
          return time.getTime() < new Date(row.paymentBegin).getTime()
        }
      }
      // }
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

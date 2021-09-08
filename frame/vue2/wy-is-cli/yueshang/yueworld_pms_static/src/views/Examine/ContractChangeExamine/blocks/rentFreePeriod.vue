<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-免租期
-->

<template>
  <div>
    <div
      v-if="(currentFormData.beforeList !==undefined && currentFormData.beforeList.length > 0) || (currentFormData.afterList !==undefined && currentFormData.afterList.length > 0)"
      class="mt-16"
    >
      <!-- 表格 -->
      <ysn-formTable
        v-model="currentFormData"
        prop="beforeList"
        :column="beforeTableConfig"
        :span-method="beforeArraySpanMethod"
        :show-slots="['freePeriod']"
      >
        <template #freePeriod="scope">
          <div>
            {{ scope.row.freeStartDate }}~{{ scope.row.freeEndDate }}
          </div>
        </template>
      </ysn-formTable>
      <ysn-formTable
        v-model="currentFormData"
        prop="afterList"
        :column="afterTableConfig"
        :span-method="afterArraySpanMethod"
        :show-slots="['freePeriod']"
      >
        <template #freePeriod="scope">
          <div>
            {{ scope.row.freeStartDate }}~{{ scope.row.freeEndDate }}
          </div>
        </template>
      </ysn-formTable>
    </div>
  </div>

</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'RentFreePeriod',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'rentFreePeriod',
    event: 'change'
  },
  props: {
    rentFreePeriod: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      beforeSpanArr: [],
      afterSpanArr: [],
      pos: [],
      beforeTableConfig: [
        {
          name: '变更前',

          tableList: [
            { leaseArea: '租赁区域', itemType: 'text', sortable: false },
            { feeName: '费项', itemType: 'text', sortable: false },
            { freePeriod: '免租期', sortable: false, hasSlot: true, width: 200 },
            { freeDate: '免租天数', itemType: 'text', sortable: false },
            { standardApply: '标准/申请', itemType: 'text', sortable: false }
          ]
        }
      ],
      afterTableConfig: [
        {
          name: '变更后',

          tableList: [
            { leaseArea: '租赁区域', itemType: 'text', sortable: false },
            { feeName: '费项', itemType: 'text', sortable: false },
            { freePeriod: '免租期', sortable: false, hasSlot: true, width: 200 },
            { freeDate: '免租天数', itemType: 'text', sortable: false },
            { standardApply: '标准/申请', itemType: 'text', sortable: false }
          ]
        }
      ]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.beforeList, 'before')
        this.getSpanArr(val.afterList, 'after')
        this.tableKey++
      }
    }
  },
  mounted() {
    this.getSpanArr(this.currentFormData.beforeList, 'before')
    this.getSpanArr(this.currentFormData.afterList, 'after')
  },
  methods: {
    // 数据处理
    beforeArraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.beforeSpanArr[rowIndex] > 0) {
          return {
            rowspan: this.beforeSpanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    afterArraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.afterSpanArr[rowIndex] > 0) {
          return {
            rowspan: this.afterSpanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 合并规则
    getSpanArr(data, type) {
      this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'] = []
      this.pos = 0
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].leaseArea === data[i - 1].leaseArea) {
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'][this.pos] += 1
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(0)
          } else {
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(1)
            this.pos = i
          }
        }
      }
      console.log(this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'])
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
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC3klEQVRoBe1YPWgUURCeufMHDJdagmBjLCysDNhY2N2eIFikSnNgWpu0ooSIhY2NnVhc4VUpBMHsdbaCjSikiY0g0TYmJxjJjjO7e+Q49t7M2+xGQt42t7cz+33zzZv39r0BCFfIQMhAyEDIwGnOAFYlfnF18dzvb7u3ieBuAnANCeYIaE7wEXCbELYbAJuI8PbC5db79dX1/Sq4jyyg0+1cJDp4zGEuccCzlqBY0C8A6iM21zZ6Gz8t70zzKS0gehCdh114SJSsMPjMNALl+RCx8Rxa8DR+Ef9RfAvNpQSkWYfkDRHdLET1fIiIHxAa98qMhreA9nL7Ov6Fd1wulzzjdLpzWX3n0eiwiC9Oxwmjl4Cs3pOPVQc/iikXseAzErww2C6peZKyqTjz4+yCLRzp/Bo3OO7NArIJW03NO+KBdF7x4uDyGbeZSkhKJ6GDr/yi12oT9wYpV9Rtj3Na7ocNbF6xlJJpBLJ13i94S5QOn5mc0+GSmVQB8oWVj5SKVLkDLmXcbmBVQLo9MH5h3VR+Vp7Qs8KtvaUKkL2NBlKX3cKtCpCNWV0BargWblWA7Co1orrsFu4zGjnXolPAaKl04bh8XEusxi2c6gi4Aqvbxps80jjUEUgPI0BXpwG5MjjKvMtnGm76nOCH085GdQTkJKWB1GW3cKsC2GGzrgA1XAu3KkDOsBpRXXYLtypADuDZGbauMItxhVO4i62HT1UBWfeA+oevHNcd9S2dC1WAhCvdA/4ZHlfowpVzqpSm84CgRN1ojTsQj1TEChz4bPwk7sXcqtEv0wikMNz6kO6BDnk0j5SDuawo5hEQwBN9qBcBcsSjs3BHugfyv8pLMPO2ilenzl5CebSDV4PPTLRQZTkJlmD69oQkpGaZLG592tqbvzX/Gvdls0U3GIOPnaUuaS0+gxbej1/GO2UQvOZAEUE2L05gc3dSzP9qr0/GEf6HDIQMhAyEDJyuDPwD2MAF4UaQ6IgAAAAASUVORK5CYII=) no-repeat;
  background-size: contain;
}

.minus-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==) no-repeat;
  background-size: contain;
}
</style>


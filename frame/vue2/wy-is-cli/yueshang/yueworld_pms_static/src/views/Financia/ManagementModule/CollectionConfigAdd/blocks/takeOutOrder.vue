<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增-带出费项顺序
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      ref="takeOutOrder"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :show-slots="['planner','operation']"
      :table-order-config="tableOrderConfig"
      :first-row-add="false"
    >
      <template #planner="scope">
        <ysn-btn type="text">
          <svg-icon v-if="currentFormData.tableData.length!==scope.$index+1" icon-class="shuangjiantouxia" class="icon mr-20" @click="plannerDown(currentFormData.tableData,scope.$index)" />
          <svg-icon v-if="scope.$index!==0" icon-class="shuangjiantoushang" class="icon" @click="plannerUp(currentFormData.tableData,scope.$index)" />
        </ysn-btn>
      </template>
      <template #operation="scope">
        <span class="operation minus-icon" @click="minusData(scope.$index)" />
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'TakeOutOrder',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'takeOutOrder',
    event: 'change'
  },
  props: {
    takeOutOrder: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { idx: '序号', type: 'index', sortable: true, showFixed: true },
        { feeId: '费项编码', itemType: 'input', disabled: true, placeholder: '自动带出', fixedWidth: 260 },
        { feeName: '费项名称', itemType: 'select', list: this.$PUBFN.getOptionsList('feeName'), change: this.feeNameChange, fixedWidth: 260 },
        { feeType: '费项类别', itemType: 'input', fixedWidth: 260 },
        { planner: '排序', itemType: 'text' },
        { operation: '操作', itemType: 'text' }
      ],
      tableOrderConfig: {
        showSlots: ['planner', 'operation']
      }
    }
  },
  methods: {
    // 点击删除
    minusData(index) {
      this.currentFormData.tableData.splice(index, 1)
    },
    // 点击向上的双箭头
    plannerUp(dataList, index) {
      if (index !== 0) {
        dataList[index] = dataList.splice(index - 1, 1, dataList[index])[0]
      }
    },
    // 点击向下的双箭头
    plannerDown(dataList, index) {
      if (index !== dataList.length - 1) {
        dataList[index] = dataList.splice(index + 1, 1, dataList[index])[0]
      }
    },
    // 点击加号
    async flodClick() {
      if (!this.data.form.programName) {
        this.$message({ message: '请先选择适用项目', type: 'error' })
        return
      }
      if (this.currentFormData.tableData !== undefined) {
        const datas = { feeId: '', feeName: '', feeType: '' }
        this.currentFormData.tableData.push(datas)
      }
    },
    // 费项名称改变时，费项编辑和费项类别相应的变化
    feeNameChange(val) {
      switch (val.feeName) {
        case 1:
          val.feeId = 'ZUJIN'
          val.feeType = '租金'
          break
        case 2:
          val.feeId = 'YAJIN'
          val.feeType = '押金'
          break
        case 3:
          val.feeId = 'FUWUFEI'
          val.feeType = '服务费'
          break
        case 4:
          val.feeId = 'TINGCHE'
          val.feeType = '停车费'
          break
        case 5:
          val.feeId = 'ZHINA'
          val.feeType = '滞纳金'
          break
        case 6:
          val.feeId = 'BAOZHENG'
          val.feeType = '保证金'
          break
        case 7:
          val.feeId = 'SHUIDIAN'
          val.feeType = '水电'
          break
      }
    }
  }
}
</script>
<style scoped lang="scss">
.operation{
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.minus-icon{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==) no-repeat;
  background-size: contain;
}
</style>

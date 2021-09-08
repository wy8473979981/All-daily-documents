<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:53:20
 * @LastEditTime: 2021-09-03 20:22:09
 * @LastEditors: xza
-->
<template>
  <div>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
      add
      :first-row-add="false"
      @changeDate="changeDate"
      @row-click="rowClick"
    />
    <formItem
      :is-show-dialog="flag"
      :row-data="rowData.data"
      :is-edit="isEdit"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import { getOptionsLabel } from '@/filters/index'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import formItem from './formitem/reimbursementitem'
export default {
  name: 'Reimbursement',
  components: { formItem },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'reimbursement',
    event: 'change'
  },
  props: {
    reimbursement: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rowData: {
        data: {}
      },
      flag: false,
      noEdits: false,
      isEdit: {
        type: false,
        name: ''
      },
      formTableConfig: [
        { name: '序号', type: 'index', itemType: 'text' },
        { discriminatorId: '费项性质', itemType: 'text' },
        { feeName: '费项类型', itemType: 'text' },
        { isJoinFree: '是否免租', itemType: 'text' },
        { isRequire: '是否必收', itemType: 'text' },
        { feeState: '费项状态', itemType: 'text' }
      ]
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog(data) {
      this.flag = false
      if (data) {
        if (this.isEdit.type) {
          this.currentFormData.tableData.map(i => {
            if (i.name === data.name) {
              for (var k in i) {
                i[k] = data[k]
              }
            }
          })
        } else {
          this.currentFormData.tableData.push(data)
        }
      }
      this.isEdit = {
        type: false,
        name: ''
      }
    },
    // 弹窗
    flodClick() {
      this.flag = true
      this.isEdit = {
        type: false,
        name: ''
      }
    },
    // 编辑
    rowClick(data) {
      if (!this.noEdits) {
        this.flag = true
      }
      this.isEdit = {
        type: true,
        name: data.name
      }
      let jsonData = JSON.stringify(data)
      let objData = JSON.parse(jsonData)
      for (var k in data) {
        objData[k] = getOptionsLabel(data[k], k)
      }
      this.rowData.data = objData
    },
    // 删除反馈
    changeDate() {
      this.noEdits = true
      this.isEdit = {
        type: false,
        name: ''
      }
      this.$message({
        message: '不要忘记保存计租方案哦',
        type: 'success'
      })
      setTimeout(() => {
        this.noEdits = false
      }, 200)
    }
  }
}
</script>

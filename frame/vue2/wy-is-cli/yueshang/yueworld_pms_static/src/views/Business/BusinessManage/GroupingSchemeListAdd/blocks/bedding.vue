<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:53:20
 * @LastEditTime: 2021-08-07 18:02:56
 * @LastEditors: Please set LastEditors
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
      :row-data="rowData"
      :is-edit="isEdit"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import formItem from './formitem/beddingitem'
import { getOptionsLabel } from '@/filters/index'
export default {
  name: 'Bedding',
  components: { formItem },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'bedding',
    event: 'change'
  },
  props: {
    bedding: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rowData: {},
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'fixedMonthDayNumber', label: '固定月天数', placeholder: '请输入', width: '200px', change: this.handelChange },
        { itemType: 'input', prop: 'fixedYearDayNumber', label: '固定年天数', placeholder: '请输入', width: '200px', change: this.handelChange }
      ],
      flag: false,
      noEdits: false,
      isEdit: {
        type: false,
        name: ''
      },
      rulesForm: { // 表单验证
        feeId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        packageType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        acrossYears: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        packageState: [{ required: true, message: '请输入必填项', trigger: 'change' }]
      },
      formTableConfig: [
        { name: '序号', itemType: 'text' },
        { feeName: '费项', itemType: 'text' },
        { packageType: '一铺一价类型', itemType: 'text' },
        { acrossYears: '跨年计算', itemType: 'text', width: '200px' },
        { packageState: '状态', itemType: 'text' }
      ]
    }
  },
  created() {
    console.log(this.bedding)
  },
  methods: {
    // 弹窗
    flodClick() {
      this.isEdit = {
        type: false,
        name: ''
      }
      this.flag = true
    },
    // 赋值
    handelChange(val) {
      this.currentFormData.tableData.BuildingName = 0
    },
    async validate() {
      const res = await this.$refs['formTable'].validate()
      console.log(res)
    },
    // 关闭弹窗
    closeDialog(data) {
      this.flag = false
      if (data) {
        if (this.isEdit.type) {
          console.log(1)
          this.currentFormData.tableData.map(i => {
            if (i.name === data.name) {
              console.log(2)
              for (var k in i) {
                i[k] = data[k]
              }
              i.packageType = data.packageType.join(',')
            }
          })
        } else {
          data.packageType = data.packageType.join(',')
          this.currentFormData.tableData.push(data)
        }
      }
      this.isEdit = {
        type: false,
        name: ''
      }
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
    },
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
      for (var k in objData) {
        if (k === 'packageType') {
          objData[k] = objData[k].split(',')
          // objData[k].map(i => {
          //   console.log(i)
          //   objData[k][i - 1] = getOptionsLabel(i, 'packageType')
          // })
        } else {
          objData[k] = getOptionsLabel(objData[k], k)
        }
      }
      this.rowData = objData
    }
  }

}
</script>

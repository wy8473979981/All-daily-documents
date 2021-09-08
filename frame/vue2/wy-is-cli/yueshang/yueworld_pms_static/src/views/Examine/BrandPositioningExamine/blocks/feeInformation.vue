<!--
 * @Author: xueyx
 * @LastEditors: fhj
 * @Description: 品牌落位新增详情-费用信息table
-->
<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <!-- 操作按钮 -->
    <ysn-btn class="mr-12 left-btn">
      <ysn-excel type="import">导入</ysn-excel>
    </ysn-btn>
    <!-- 表格 -->
    <ysn-formTable
      ref="feeInformationData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :default-obj="defauleObj"
      :required="true"
      add
      :rules="rules"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'feeInformationData',
    event: 'change'
  },
  props: {
    feeInformationData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      rules: {
        spaceName: [
          { required: true, message: '' }
        ],
        brandName: [
          { required: true, message: '' }
        ],
        planner: [
          { required: true, message: '' }
        ]
      },
      tableConfig: [ // 表单配置
        { spaceName: '铺位号', itemType: 'cascaderDialog', change: this.cascaderChange, required: true, placeholder: '请选择' },
        { brandName: '品牌', itemType: 'select', list: this.$PUBFN.getOptionsList('brandName'), required: true, placeholder: '请选择品牌' },
        { spaceType: '商业类型', itemType: 'input', inputType: 'autoValue', disabled: true },
        { spaceFormatNamePlan: '规划业态', itemType: 'input', inputType: 'autoValue', disabled: true },
        { planner: '规划人员', itemType: 'treeDialog', list: this.$PUBFN.getOptionsList('PlannerList'), required: true, placeholder: '请选择规划人员' }
      ]

    }
  },
  mounted() {
  },
  methods: {
    defauleObj() {
      return {
        spaceName: [], brandName: '', planner: '1001001'
      }
    },
    // 铺位号选择
    cascaderChange(val) {
      if (!this.data.baseInfo.programName) {
        this.$message.error('请先选择项目')
        this.currentFormData.tableData[val.index].spaceName = []
        return
      }
      const data = [...this.currentFormData.tableData]
      data[val.index].spaceType = ''
      console.log(data)
      data[val.index].spaceName.forEach(item => {
        if (data[val.index].spaceType) {
          data[val.index].spaceType = '商业' + ',' + data[val.index].spaceType
        } else {
          data[val.index].spaceType = '商业'
        }
        data[val.index].spaceFormatNamePlan = '餐饮-甜品烘培-水吧'
      })
      this.currentFormData.tableData = data
    }
  }
}
</script>
<style scoped>
  .left-btn{
    float: right;
    margin-bottom:10px;
  }
</style>

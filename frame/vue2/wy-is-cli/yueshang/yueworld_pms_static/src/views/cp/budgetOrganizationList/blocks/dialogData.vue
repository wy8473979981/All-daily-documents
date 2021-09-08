<template>
  <div>
    <!-- 修改关闭时间 -->
    <div v-if="sequence==='3'">
      <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
        <ysn-formItem
          :form="formData"
          :config="configData"
          :column="1"
          clearable
        />
      </el-form>
    </div>
    <!-- 查看租金宝 -->
    <div v-if="sequence==='1'">
      <ysn-table
        :checkbox="false"
        :data="tableData"
        :column="tableConfig"
        select-key="id"
      />
    </div>
    <!-- 预算编制 -->
    <div v-if="sequence==='2'">
      <el-form ref="ruleForm" :model="Budgeting" label-position="top" size="small">
        <ysn-formItem
          :form="Budgeting"
          :config="BudgetingConfigData"
          :column="2"
          clearable
        />
      </el-form>
      <ysn-table
        :checkbox="false"
        :data="tableData"
        :column="tableConfig"
        select-key="id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    sequence: { type: String, default: '' }
  },
  data() {
    return {
      formData: { // 表单数据
        s1: '',
        s2: ''
      },
      configData: [ // 表单配置
        { itemType: 'radio', prop: 's1', label: '', list: [
          { value: '0', label: '定时关闭' },
          { value: '1', label: '立即关闭' }
        ] },
        { itemType: 'datePicker', type: 'datetime', prop: 's2', label: '请设置预算关闭时间', placeholder: '选择日期时间', valueFormat: 'yyyy-MM-dd HH:mm:ss', width: '200px' }
      ],
      Budgeting: {
        s1: '',
        s2: ''
      },
      BudgetingConfigData: [ // 预算表单配置
        { itemType: 'datePicker', type: 'datetime', prop: 's1', label: '请设置预算关闭时间', placeholder: '选择日期时间', valueFormat: 'yyyy-MM-dd HH:mm:ss', width: '200px' },
        { itemType: 'datePicker', type: 'datetime', prop: 's2', label: '请设置预算关闭时间', placeholder: '选择日期时间', valueFormat: 'yyyy-MM-dd HH:mm:ss', width: '200px' }
      ],

      tableData: [
        { t1: '项目1', t2: '111111', NOI: '1111243434' }
      ], // 表格数据
      tableConfig: [// 表格配置
        { idx: '序号', type: 'index', width: '70px' },
        { t1: '项目', sortable: true },
        { t2: '租金包', sortable: true },
        { t3: 'NOI', sortable: true }
      ]
    }
  },
  methods: {}
}
</script>

<template>
  <div class="box">
    <div class="top">
      <ysn-btn style="margin-right:8px">反核销</ysn-btn>
      <ysn-btn type="info">返回</ysn-btn>
    </div>
    <div class="box1">
      <!--  商家信息-->
      <ysn-flod id="商家信息" title="商家信息">
        <el-form ref="ruleForm" :model="formData" :rules="rulesForm" label-position="top">
          <ysn-formItem :form="formData" :config="configData" :column="4" clearable />
        </el-form>
      </ysn-flod>
      <!-- 冲抵 -->
      <ysn-flod id="冲抵" title="冲抵">
        <ysn-table
          :data="tableData1"
          :column="tableConfig1"
          :show-slots="['obSub','name']"
          select-key="id"
          :checkbox="false"
        />
      </ysn-flod>
      <!--应收冲减  -->
      <ysn-flod id="应收冲减" title="应收冲减">
        <ysn-table :data="tableData2" :column="tableConfig2" :checkbox="false" />
      </ysn-flod>
      <!--核销明细  -->
      <ysn-flod id="核销明细" title="核销明细">
        <ysn-table :data="tableData3" :column="tableConfig3" :checkbox="false" />
      </ysn-flod>
      <!--  审核历史-->
      <ysn-flod id="审核历史" title="审核历史">
        <ysn-table :data="tableData4" :column="tableConfig4" :checkbox="false" />
      </ysn-flod>
    </div>

  </div>

</template>
<script>
import {
  formData,
  configData,
  tableData1,
  tableData2,
  tableData3,
  tableData4
} from './data'
import {
  rulesForm,
  tableConfig1,
  tableConfig2,
  tableConfig3,
  tableConfig4
} from './config'
export default {
  name: 'FinanciaDetails',
  components: { },
  data() {
    return {
      formData, // 商家信息数据
      rulesForm, // 表单验证
      configData, // 商家信息表单配置
      tableData1, // 冲抵表格数据
      tableConfig1, // 冲抵表格配置
      tableData2, // 应收冲减表格数据
      tableConfig2, // 应收冲减表格配置
      tableData3, // 核销明细表格数据
      tableConfig3, // 核销明细表格配置
      tableData4, // 审核历史表格数据
      tableConfig4// 审核历史表格配置
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  @import './index'
</style>

<template>
  <div class="box">
    <div class="top">
      <ysn-btn class="mr-8">提交OA审批</ysn-btn>
      <ysn-btn class="mr-8">提交修改</ysn-btn>
      <ysn-btn type="info">取消</ysn-btn>
    </div>
    <div class="branddetails">
      <!-- 基本信息 -->
      <ysn-flod id="基本信息" title="基本信息" :show-flod="false">
        <el-form ref="ruleForm" :model="formData" :rules="rulesForm" label-position="top">
          <ysn-formItem :form="formData" :config="configData" :column="4" clearable />
        </el-form>
      </ysn-flod>
      <!-- 联系人信息 -->
      <ysn-flod id="联系人信息" title="联系人信息" :show-flod="false">
        <el-form ref="ruleForm" :model="formData1" :rules="rulesForm1" label-position="top">
          <ysn-formItem :form="formData1" :config="configData1" :column="4" clearable />
        </el-form>
      </ysn-flod>
      <!--合作商家  -->
      <ysn-flod id="合作商家" title="合作商家" :show-flod="false">
        <ysn-table :data="tableData1" :column="tableConfig" :checkbox="false" />
      </ysn-flod>
      <!-- 合作项目 -->
      <ysn-flod id="合作项目" title="合作项目" :show-flod="false">
        <ysn-table :data="tableData2" :column="tableConfig2" :checkbox="false" />
      </ysn-flod>
    </div>
  </div>

</template>
<script>
import {
  configData,
  formData,
  configData1,
  formData1,
  tableData1,
  tableData2
} from './data'
import {
  rulesForm,
  rulesForm1,
  tableConfig,
  tableConfig2
} from './confiig'
export default {
  name: 'BrandDetails',
  components: { },
  data() {
    return {
      formData, // 基本信息数据
      rulesForm, // 表单验证
      configData, // 基本信息表单配置
      formData1, // 联系人信息数据
      configData1, // 联系人信息表单配置
      rulesForm1, // 表单验证
      tableData1, // 合作商家表格数据
      tableConfig, // 合作商家表格配置
      tableData2, // 合作项目表格数据
      tableConfig2// 合作项目表格配置
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
  @import './index'
</style>

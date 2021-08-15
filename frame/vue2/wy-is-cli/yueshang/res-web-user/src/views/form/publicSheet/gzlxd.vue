<template>
  <!-- 工作联系单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row">
      <dl-col :span="24" title="发单中心" :novalue="!form.bizEntityJson.signCenterOrgName" place="right">
        <el-input v-model="form.bizEntityJson.signCenterOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="24" title="接单中心" :novalue="!form.bizEntityJson.receCenterOrgName" place="right">
        <el-input v-model="form.bizEntityJson.receCenterOrgName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
      </dl-col>
      <dl-col :span="12" title="签发日期" >
        <el-date-picker v-model="form.bizEntityJson.signDate" type="date" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" title="接单日期" place="right">
        <el-date-picker v-model="form.bizEntityJson.receDate" type="date" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="24" title="工作联系内容" place="right">
          <el-input v-model="form.bizEntityJson.workContactDesc" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
      </dl-col>
      <dl-col :span="24" title="完成情况" place="right">
          <el-input v-model="form.bizEntityJson.completeDesc" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.signCenterOrgCd" @close="closeSearhOrg"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {},
      loading: false,
      showSearchOrg: false,
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  /* 模板内容配置的时候需要把该内容注释 */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {

  },
  methods: {
   closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.signCenterOrgName = val.text;
        this.form.bizEntityJson.signCenterOrgCd = val.id;
      }
      this.showSearchOrg = false;
    },
    // 必填判断
    validate() {

    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
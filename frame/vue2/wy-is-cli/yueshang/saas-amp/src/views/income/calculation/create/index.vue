<template>
  <!-- 出租率 -->
  <div class="page">
    <div class="title-search-con">
      <div class="logo-title">
        <img src="../../../../../static/img/bl/bl_sy_logo.svg">
        <h3>资产盘点系统</h3>
      </div>
      <div class="list-page" v-if="formData.projectId || routerQuery.flag=='add'">
        <!-- <el-steps :space="200" :active="currentStep" finish-status="success">
          <el-step title="基础信息录入" @click.native="changeStep(0)"></el-step>
          <el-step title="项目综合指标" @click.native="changeStep(1)"></el-step>
          <el-step title="项目信息确认" @click.native="changeStep(2)"></el-step>
          <el-step title="测算结果" @click.native="changeStep(3)"></el-step>
        </el-steps> -->
        <InfoEntryComponent v-if="step==1" @update:step="stepFunc" @update:formData="setFormDataFunc" :formData="formData" :projectStatus="projectStatus"></InfoEntryComponent>
        <CombinedTargetComponent v-else-if="step==2" @update:step="stepFunc" :formData="formData" :projectStatus="projectStatus"></CombinedTargetComponent>
        <InfoNotarizeComponent v-else-if="step==3" @update:step="stepFunc" :formData="formData" :projectStatus="projectStatus"></InfoNotarizeComponent>
        <MeasureResultsComponent v-else-if="step==4" @update:step="stepFunc" :formData="formData" :projectStatus="projectStatus"></MeasureResultsComponent>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { handlePaginator } from '@mixins'
import { toThousands, getDynamicTableHeight } from '@/utils/index'
import TypeApi from '@/apis/apis/typeApi'
import InfoEntryComponent from './components/infoEntryComponent'
import CombinedTargetComponent from './components/combinedTargetComponent'
import InfoNotarizeComponent from './components/infoNotarizeComponent'
import MeasureResultsComponent from './components/measureResultsComponent'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
export default {
  mixins: [handlePaginator],
  components: {
    InfoEntryComponent,
    CombinedTargetComponent,
    InfoNotarizeComponent,
    MeasureResultsComponent
  },
  data() {
    return {
      formData: {
        projectId: null,
        version: null,
        remark: null,
        layout: null,
        layoutName: null,
        depart: null,
        departName: null,
        openTime: null,
        province: null,
        provinceName: null,
        city: null,
        cityName: null,
        county: null,
        countyName: null,
        devCycle: '2',
        signOutYears: '10',
        sharePrincipleName: null,
        sharePrinciple: null,
        rentPrice: null,
        rentHoliday: '0',
        twoRentHoliday: '0',
        threeRentHoliday: '0',
        step: 1
      },
      step: 1,
      // currentStep: 0,
      projectStatus: false,
      routerQuery: this.$route.query,
    };
  },
  watch: {},
  created() {

  },
  mounted() {

    try {
      window.onbeforeunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
      }
      if (this.routerQuery.flag == 'add') {
        this.step = 1;
      } else {
        this.getProjectCalculateDetail(this.routerQuery.projectResultId);
      }
      this.projectStatus = this.routerQuery.status == 1 ? true : false;// 1:项目已完成，不可修改
    } catch (e) {
      console.log(e)
    }
  },
  destroyed() {
    window.onbeforeunload = null
  },
  // 日期转换格式
  filters: {

  },
  methods: {
    stepFunc(payload) {
      this.step = payload
    },
    setFormDataFunc(payload) {
      this.formData = payload;
    },
    // changeStep(curStep) {
    //   this.currentStep = curStep;
    // },
    async getProjectCalculateDetail(projectResultId) {
      try {
        let params = {
          projectResultId: projectResultId
        }
        await CalculationApi.getProjectCalculateDetail(params).then(res => {
          if (res.code === 200) {
            const { result } = res;
            this.formData = {
              ...result, version: `V${Number(result.version)}`
            };
            this.step = result.step;
            // this.currentStep = this.step - 1;
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style type="text/css" lang="scss" scope>
@import "~@styles/common.scss";
.page {
  width: 100%;
  height: 100%;
}
.title-search-con {
  width: 100%;
  height: 100%;
}
.page-con {
  width: 100%;
  height: calc(100vh - 84px);
  display: flex;
  overflow-x: auto;
}
.list-page {
  padding: 15px;
  height: calc(100% - 74px);
  overflow-y: auto;
  > h2 {
    border-left: 3px solid #4a90e2;
    padding: 5px;
    font-size: 16px;
    background-color: #e3e7e9;
  }
  .demo-ruleForm {
    .el-form-item {
      margin-bottom: 22px;
    }
  }
}
.logo-title {
  padding: 0 35px;
  height: 44px;
  background-color: #e3e7e9;
  display: flex;
  align-items: center;
  > img {
    width: 75px;
    height: 30px;
    margin-right: 25px;
  }
  > h3 {
    font-size: 18px;
    color: #333;
  }
}
.cGreen {
  color: #5ab46e;
}
.cRed {
  color: #ed1111 !important;
}
.cOrange {
  color: #e6a23c !important;
}
.cDRed {
  color: #ed1111 !important;
  font-weight: bolder !important;
}
</style>
<style>
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}
.el-table > .el-table__fixed-right {
  height: 100% !important;
}
</style>

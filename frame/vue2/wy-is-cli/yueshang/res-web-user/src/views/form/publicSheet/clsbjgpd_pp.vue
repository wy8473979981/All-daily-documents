<template>
  <!-- 材料设备价格批定(品牌) -->
  <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
    <el-row>
      <dl-col :span="24" title="" place="right" :novalue="!form.bizEntityJson.codeType">
        <el-radio-group v-model="form.bizEntityJson.codeType">
          <el-radio label="1">与约定价格差额5%以内</el-radio>
          <el-radio label="2">其他情况</el-radio>
        </el-radio-group>
      </dl-col>

      <dl-col :span="12" title="业务条线：" place="right">
        <el-select v-model="form.bizEntityJson.threePoints" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-for="item in threePoints" :key="item.key" :label="item.threePoints" :value="item.value"></el-option>
        </el-select>
      </dl-col>

      <dl-col :span="12" place="right" />

      <dl-col :span="12" title="合同编号" :novalue="!form.bizEntityJson.contNo">
        <el-select
          v-model="form.bizEntityJson.contNo"
          filterable
          remote
          clearable
          @change="contNoChange"
          :remote-method="remoteMethod"
          :loading="loading"
          :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
          :disabled="form.bizEntityJson.disabled"
        >
          <el-option v-for="item in contNoOptions" :key="item.contLedgerId" :label="item.contNo" :value="item.contNo"> </el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" title="合同名称" place="right">
        <el-input v-model="form.bizEntityJson.contName" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" title="项目名称" :novalue="!form.bizEntityJson.projectName">
        <el-input v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="12" title="工程名称" place="right" :novalue="!form.bizEntityJson.engineeringName">
        <el-input v-model="form.bizEntityJson.engineeringName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="24" title="合同双方">
        <dl-col :span="24" title="甲方：" place="right" :novalue="!form.bizEntityJson.sideA">
          <el-input v-model="form.bizEntityJson.sideA" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="乙方：" place="right" :novalue="!form.bizEntityJson.sideB">
          <el-input v-model="form.bizEntityJson.sideB" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="丙方：" place="right" :novalue="!form.bizEntityJson.sideC">
          <el-input v-model="form.bizEntityJson.sideC" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>

      <dl-col :span="24" title="批价类型" place="right" :novalue="!form.bizEntityJson.provideB && !form.bizEntityJson.provideA">
        <d-radio-group-boolean
          v-model="form.bizEntityJson"
          :nameList="[
            { label: '甲定乙供', name: 'provideB' },
            { label: '甲供合同增补', name: 'provideA' },
          ]"
        />
      </dl-col>

      <dl-col :span="12" title="材料名称" place="right" :novalue="!form.bizEntityJson.equipMaterialName">
        <el-input v-model="form.bizEntityJson.equipMaterialName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="进场时间" tip="日期格式为2020-01-01" place="right" :novalue="!form.bizEntityJson.approachDate">
        <el-date-picker
          v-model="form.bizEntityJson.approachDate"
          value-format="yyyy-MM-dd"
          clearable
          :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
          :disabled="form.bizEntityJson.disabled"
        />
      </dl-col>
    </el-row>

    <el-row class="padding-row">
      <dl-col v-if="form.bizEntityJson.provideB" :span="24" title="原合同约定的品牌" place="right" :novalue="!form.bizEntityJson.oriContractBrand">
        <el-input v-model="form.bizEntityJson.oriContractBrand" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.oriContractUnitPrice" title="原合同单价(元)" place="right">
        <el-input v-model="form.bizEntityJson.oriContractUnitPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.oriContractTotalPrice" title="原合同总价(元)" place="right">
        <el-input v-model="form.bizEntityJson.oriContractTotalPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col v-if="form.bizEntityJson.provideB" :span="24" title="推荐品牌" place="right">
        <el-input v-model="form.bizEntityJson.commendBrand" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.commendBrandUnitPrice" title="推荐品牌单价(元)" place="right">
        <el-input v-model="form.bizEntityJson.commendBrandUnitPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.commendBrandTotalPrice" title="推荐品牌总价(元)" place="right">
        <el-input v-model="form.bizEntityJson.commendBrandTotalPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col v-if="form.bizEntityJson.provideB" :span="24" title="需批定价格原因说明" place="right" :novalue="!form.bizEntityJson.applyContent">
        <el-input v-model="form.bizEntityJson.approvePriceReason" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.provideB" :span="24" title="推荐改品牌的理由" place="right" :novalue="!form.bizEntityJson.applyContent">
        <el-input v-model="form.bizEntityJson.commendBrandReason" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.oriContractPrice" title="原合同价(元)" place="right">
        <el-input v-model="form.bizEntityJson.oriContractPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="12" v-if="form.bizEntityJson.reportTotalPrice" title="上报总价(元)" place="right">
        <el-input v-model="form.bizEntityJson.reportTotalPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col v-if="form.bizEntityJson.addReason" :span="24" title="增补原因说明" place="right">
        <el-input v-model="form.bizEntityJson.addReason" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>

      <dl-col :span="24" title="应提供细项(请作为附件上传)">
        <dl-col :span="12" place="title">
          <h2>材料数量清单（工程副总签字确认）</h2>
        </dl-col>
        <dl-col :span="12" title="材料数量清单" place="right" :novalue="!form.bizEntityJson.meterialQuantityListId">
          <one-file :form="form" value="meterialQuantityListId" />
        </dl-col>
        <dl-col :span="12" place="title">
          <h2>乙方报价清单</h2>
        </dl-col>
        <dl-col :span="12" title="乙方报价清单" place="right" :novalue="!form.bizEntityJson.sideBPriceListId">
          <one-file :form="form" value="sideBPriceListId" />
        </dl-col>
        <dl-col :span="12" place="title">
          <h2>技术参数要求</h2>
        </dl-col>
        <dl-col :span="12" title="技术参数要求" place="right">
          <one-file :form="form" value="teckParamRequireId" />
        </dl-col>
        <dl-col :span="12" place="title">
          <h2>相关图纸</h2>
        </dl-col>
        <dl-col :span="12" title="相关图纸" place="right">
          <one-file :form="form" value="relatedDrawingId" />
        </dl-col>
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg" />
  </div>
</template>

<script>
export default {
  // template,
  data:function() {
    return {
      form: {},
      threePoints: [],
      loading: true,
      contNoOptions: [],
      showSearchOrg: false,
    };
  },
  // props: ["data"],
  // watch: {
  //   data: {
  //     immediate: true,
  //     handler: function (val) {
  //       this.form = val;
  //     },
  //   },
  // },
  created() {
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, "provideB", true)
      this.$set(this.form.bizEntityJson, "projectName", this.form.bizEntityJson.projectName)
      this.$set(this.form.bizEntityJson, "projectCd", this.form.bizEntityJson.projectCd)
    }
  },
  methods: {

    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
      }
      this.showSearchOrg = false
    },
    
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.postFindContNoList({contNo: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.contNoOptions = res.data
            } else {
              this.contNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.contNoOptions = []
      }
    },

    contNoChange(val) {
      let obj = this.contNoOptions.find(item => item.contNo == val)
      this.form.bizEntityJson.contName = obj ? obj.contName : ''
      this.form.bizEntityJson.contNo = obj ? obj.contNo : ''
      this.form.bizEntityJson.contLedgerId = obj ? obj.contLedgerId : ''
    },
    getTechnologyTypeList() {
      const param = {
        companyId: 1,
        dictTypeCdList: ['TECHNOLOGY_TYPE']
      }
      this.$approval.getTechnologyTypeList(param).then((res) => {
        if(res.code == 1 && res.data) {
          this.threePoints = res.data.TECHNOLOGY_TYPE
          this.$set(this.form.bizEntityJson, 'threePoints', res.data.FIN_BZ[0].dictCd)
        } else {
          this.$message.error(res.message)
        }
      });
    },
  },
};
</script>
<template>
  <!-- 融资类合同审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row>
      <dl-col :span="24" title="" place="top right" style="border-bottom:none;" :novalue="!form.bizEntityJson.hotelType1 && !form.bizEntityJson.hotelType2" v-if="['JDJT_CWGL_TZHZ','JDJT_CWGL_RZLHT'].indexOf(processCode)>-1">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[
            {name:'hotelType1',label:'酒店集团'},
            {name:'hotelType2',label:'租赁资产公司'}
        ]" />
      </dl-col>
      <dl-col :span="24" title="" place="top right" style="border-bottom:none;" :novalue="!form.bizEntityJson.newType1 && !form.bizEntityJson.newType2 && !form.bizEntityJson.newType3 && !form.bizEntityJson.newType4" v-if="processCode=='CWGL_RZGL_32'">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[
            {name:'newType1',label:'资本管理中心'},
            {name:'newType2',label:'财务管理中心/资金管理中心'},
            {name:'newType3',label:'事业部'},
            {name:'newType4',label:'城市公司'}
        ]" />
      </dl-col>
      <dl-col :span="24" title="申请项目" place="top right">
        <dl-col :span="12" place="right" style="border-left:none;border-bottom:none;" :novalue="!form.bizEntityJson.centerName">
          <el-input v-model="form.bizEntityJson.centerName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          <el-input v-model="form.bizEntityJson.centerCd" style="display:none;" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="合作双方" place="right" style="border-top:none;">
        <dl-col :span="12" title="甲方" style="border-left:none;" :novalue="!form.bizEntityJson.partA">
          <el-input v-model="form.bizEntityJson.partA" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="签约人" :novalue="!form.bizEntityJson.partASign">
          <el-input v-model="form.bizEntityJson.partASign" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="乙方" style="border-left:none;" :novalue="!form.bizEntityJson.partB">
          <el-input v-model="form.bizEntityJson.partB" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="签约人" :novalue="!form.bizEntityJson.partBSign">
          <el-input v-model="form.bizEntityJson.partBSign" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="丙方" style="border-left:none;border-bottom:none;">
          <el-input v-model="form.bizEntityJson.partC" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="签约人" style="border-bottom:none;">
          <el-input v-model="form.bizEntityJson.partCSign" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="关联立项网批号" place="right" :novalue="!form.bizEntityJson.visaNo" v-if="['CWGL_RZGL_20','CWGL_RZGL_25','CWGL_RZGL_30'].indexOf(processCode)>-1">
        <el-select :class="{novalue:!form.bizEntityJson.visaNo}" :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.visaNo" filterable remote reserve-keyword :remote-method="getVisaRes" placeholder="">
          <el-option v-for="item in options" :key="item.visaNoId" :label="item.visaNo" :value="item.visaNo">
            <el-row>
              <el-col>{{item.visaNo}}</el-col>
            </el-row>
          </el-option>
        </el-select>
      </dl-col>
      <dl-col :span="24" title="合同主要内容" place="right">
        <dl-col :span="24" title="主要内容" style="border-left:none;border-bottom:none;">
          <el-input v-model="form.bizEntityJson.mainContent" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="合同价款(元)" place="top" style="border-left:none;border-bottom:none;" :novalue="!form.bizEntityJson.contractPrice">
          <el-input v-model="form.bizEntityJson.contractPrice" v-limit-number="2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="付款方式" place="top" style="border-left:none;border-bottom:none;" :novalue="!form.bizEntityJson.payWay">
          <el-input v-model="form.bizEntityJson.payWay" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <div v-if="['JDJT_CWGL_RZLHT','JDJT_CWGL_TZHZ'].indexOf(processCode)>-1">
        <dl-col :span="24" title="开办费决算报告" place="right" :novalue="!form.bizEntityJson.approveFileId">
          <one-file :form="form" value="approveFileId" />
        </dl-col>
        <dl-col :span="24" title="开办费决算表" place="right" :novalue="!form.bizEntityJson.pictureId">
          <one-file :form="form" value="pictureId" />
        </dl-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      userInfo: {},
      processCode: null,
      options: [],
      isMy: false,
    };
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ["data"],
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        this.form = val;
      },
    },
  },
  /* end */
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
    this.processCode = this.$store.state.menuTreeItem.processCode;
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, "hotelType1", false);
      this.$set(this.form.bizEntityJson, "hotelType2", false);
      this.$set(this.form.bizEntityJson, "newType1", false);
      this.$set(this.form.bizEntityJson, "newType2", false);
      this.$set(this.form.bizEntityJson, "newType3", false);
      this.$set(this.form.bizEntityJson, "newType4", false);
      this.$set(this.form.bizEntityJson, "centerName", null);
      this.$set(this.form.bizEntityJson, "centerCd", null);
      this.$set(this.form.bizEntityJson, "partA", null);
      this.$set(this.form.bizEntityJson, "partASign", null);
      this.$set(this.form.bizEntityJson, "partB", null);
      this.$set(this.form.bizEntityJson, "partBSign", null);
      this.$set(this.form.bizEntityJson, "partC", null);
      this.$set(this.form.bizEntityJson, "partCSign", null);
      this.$set(this.form.bizEntityJson, "visaNo", null);
      this.$set(this.form.bizEntityJson, "mainContent", null);
      this.$set(this.form.bizEntityJson, "contractPrice", null);
      this.$set(this.form.bizEntityJson, "payWay", null);
    }
  },
  methods: {
    getVisaRes(query) {
      if (query !== "") {
        query = query.trim();
        this.$approval.getResIdByDisplayNo(query).then((response) => {
          if (response.code == 1 && response.data) {
            this.options = response.data;
          } else {
            this.options = [];
          }
        });
      }
    },
  },
};
</script>
<template>
  <!-- 单项营销方案（销售类）审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row class="margin-row top-row blue-row">
      <el-col :span="24" class="title-col right-col">
        <h2>审批路径</h2>
      </el-col>
      <el-col :span="24" class="red-box-fix">
        <div class="d-min">
            <span>方案类别</span>
            <div class="d-red right-col" :class="{'novalue': form.bizEntityJson.leasebackBusiness != 'true' && form.bizEntityJson.leasebackHotle != 'true' && form.bizEntityJson.noLeaseback != 'true', 'required': !form.bizEntityJson.disabled}">
              <span style="font-size:14px; line-height: 38px; padding-left: 12px;">销售：</span>
              <d-radio-group 
                v-model="form.bizEntityJson" 
                :nameList="[{label:'涉及返租(商业集团)',name:'leasebackBusiness'},
                            {label:'涉及返租(酒店集团)',name:'leasebackHotle'},
                            {label:'不涉及返租',name:'noLeaseback'}]"
              />
            </div>
          </div>
      </el-col>
    </el-row>
    <el-row class="margin-row top-row blue-row">
      <el-col :span="24" class="title-col">
        <h2>基本信息</h2>
      </el-col>
      <el-col :span="24" class="red-box-fix">
        <div class="d-min">
            <span>区域</span>
            <div class="d-red right-col" :class="{'novalue': form.bizEntityJson.isSH != 'true' && form.bizEntityJson.isOuter != 'true' && form.bizEntityJson.isHome != 'true'&& form.bizEntityJson.isZJ != 'true'&& form.bizEntityJson.isGD != 'true'&& form.bizEntityJson.isCareerThree != 'true', 'required': !form.bizEntityJson.disabled}">
              <d-radio-group 
                v-model="form.bizEntityJson" 
                :nameList="[{label:'事业一部',name:'isSH'},
                            {label:'事业二部',name:'isOuter'},
                            {label:'置地',name:'isHome'},
                            {label:'浙江事业部',name:'isZJ'},
                            {label:'广东事业部',name:'isGD'},
                            {label:'安徽事业部',name:'isCareerThree'}]"
              />
            </div>
          </div>
      </el-col>
      <dl-col :span="24" title="项目名称" :novalue="!form.bizEntityJson.projectName" place="right">
        <el-input v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="24" title="方案名称" :novalue="!form.bizEntityJson.titleName" place="right">
        <el-input v-model="form.bizEntityJson.titleName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
      </dl-col>
    </el-row>  
    <el-row :gutter="24"  class="margin-row top-row blue-row">
      <el-col :span="24" class="title-col right-col">
        <h2>方案内容摘要</h2>
      </el-col>
      <dl-col :span="24" :novalue="!form.bizEntityJson.programContent" place="right">
        <el-input  v-model="form.bizEntityJson.programContent" type="textarea" :autosize="{ minRows: 5 }"/>
      </dl-col>
    </el-row>
    <el-row :gutter="24"  class="margin-row top-row green-row">
      <el-col :span="24" class="title-col right-col">
        <h2>附件上传</h2>
      </el-col>
     <dl-col :span="24" title="营销方案" place="right" >
      <one-file :form="form" value="marketProgramId" />
      </dl-col>
    </el-row>

    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg"/>
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
        this.form.bizEntityJson.projectName = val.text;
        this.form.bizEntityJson.projectCd = val.id;
      }
      this.showSearchOrg = false;
    },
    // 必填判断
    validate() {
      var isGo = true
      await this.$approval.findCostEquityRatio({projectCd: this.form.bizEntityJson.projectCd}).then(res => {
          if(res.code == 1) {
            /* if (res.data) {
              if (res.data.budgetAmt && res.data.cumuFixedAmt) {
                var budgetAmt = parseFloat((res.data.budgetAmt).replace(/,/g, ''))
                var cumuFixedAmt = parseFloat((res.data.cumuFixedAmt).replace(/,/g, ''))
                if (budgetAmt - cumuFixedAmt < Number(this.form.bizEntityJson.payTaxprice)) {
                  var balance = Math.round(budgetAmt - cumuFixedAmt).toFixed(2)
                    this.$alert("不能发起【费用预算不足,请重新填写支付金额】,【剩余可用余额：" + balance + "】", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      console.log(res.data)
                    }
                  })
                  isGo = false
                }
              } else {
                this.$alert('不能发起【当前项目当前季度在营销季度预算维护没有,请重新选择】', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    console.log(res.data)
                  }
                })
                isGo = false
              }
            } else {
              this.$alert('不能发起【当前项目当前季度在营销季度预算维护没有,请重新选择】', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  console.log(res.data)
                }
              })
              isGo = false
            } */
          } else {
            this.$message.error(res.message)
            isGo = false
          }
        })
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
//宝龙地产/地产/04-行政人事/03-行政管理/04-通用           办公资产入库单


<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row">
      <dl-col :span="12" title="类别" :novalue="form.bizEntityJson.type1 != 'true' && form.bizEntityJson.type2 != 'true' && form.bizEntityJson.type3 != 'true'">
        <d-radio-group-string
            v-model="form.bizEntityJson"
            :nameList="[{label:'总部',name:'type1'},
                      {label:'事业部',name:'type2'},
                      {label:'地产公司',name:'type3'}
                    ]"
        />
      </dl-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>资产采购单号</span>
          <!-- <el-input v-model="form.bizEntityJson.purchaseCode" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" /> -->
          <el-select
            v-model="form.bizEntityJson.purchaseCode"
            filterable
            remote
            clearable
            @change="assmAppChange"
            :remote-method="remoteAssmApp"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in acctUnitNameOptions"
              :key="item.resApproveInfoId"
              :label="item.purchaseCode"
              :value="item.purchaseCode">
            </el-option>
          </el-select>

        </div>
      </el-col>
   
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>购买日期</span>
            <el-date-picker 
            :class="{'novalue': !form.bizEntityJson.buyDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.buyDate" 
            value-format="yyyy-MM-dd" 
            clearable 
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" 
            :disabled="form.bizEntityJson.disabled" />
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>验收人</span>
          <el-input v-model="form.bizEntityJson.checkUser" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </div>
      </el-col>
      <dl-col :span="24" title="上传附件" class="right-col" place="right" :novalue="!form.bizEntityJson.warehousingFile">
        <p class="explain-p-one">验收凭证</p>
        <one-file :form="form" value="warehousingFile" />
      </dl-col>
  
      <el-col :span="12">
        <div class="d-min">
          <span>付款信息</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.personnelBoolean, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.personnelBoolean" @change="changePlateType">
              <el-radio label="1">员工</el-radio>
              <el-radio label="0">外部单位</el-radio>
              <el-radio label="2">内部单位</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>收款人</span>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 1" :class="{'novalue': !form.bizEntityJson.payeePersonName, 'required': !form.bizEntityJson.disabled}" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" v-model="form.bizEntityJson.payeePersonName" @focus="showSearchUser = true" clearable></el-input>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 0" :class="{'novalue': !form.bizEntityJson.payeePersonName, 'required': !form.bizEntityJson.disabled}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" v-model="form.bizEntityJson.payeePersonName" clearable></el-input>
          <el-select
            v-if="form.bizEntityJson.personnelBoolean == 2"
            v-model="form.bizEntityJson.payeePersonName"
            filterable
            remote
            clearable
            @change="accCompanyChange2"
            :remote-method="remoteAccCompany"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in accCompanyNameOptions"
              :key="item.companyCode"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
<!--资产属性-->

    <el-row v-for="(item, index) in form.bizEntityJson.fixedAssetsProperties" :key="index" :gutter="24" class="margin-row top-row" >
     
      <dl-col v-if="!form.bizEntityJson.disabled" :span="24" place="right" style="display:flex; justify-content:flex-end;">
        <div class="explain-p">
          <p class="explain-p-one">
            <span class="explain-btn-add" @click="remove">删除</span>
          </p>
        </div>
      </dl-col>

      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>地产公司</span>
          <el-input v-model="item.projectName" readonly/>
          <!-- <el-input hidden="hidden" v-model="item.projectCd"/> -->
          
          </div>
      </el-col>
  
      <el-col :span="12" >
        <div class="d-min">
          <span>资产名称</span>
          <el-input v-model="item.assmName" readonly/></div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" >
          <span>资产编码</span>
          <el-input v-model="item.code" readonly/></div>
      </el-col>
  
      <el-col :span="12">
        <div class="d-min" >
          <span>设备型号</span>
          <el-input v-model="item.assmModelName" readonly/>
          <!-- <el-input hidden="hidden" v-model="item.assmModelId"/> -->
          </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>设备编码</span>
          <el-input v-model="item.assmCode" readonly/>
          <!-- <el-input hidden="hidden" v-model="item.assmModelStandardId"/> -->
          </div>
      </el-col>
  
      <el-col :span="12" >
        <div class="d-min">
          <span>使用部门</span>
          <el-input v-model="item.useDepartName" readonly/>
          <!-- <el-input hidden="hidden" v-model="item.useDepartCd"/> -->
          </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>使用时间</span>
          <el-input v-model="item.useDate" readonly/>
        </div>
      </el-col>
      <dl-col :span="24" title="使用情况" class="right-col">
       <el-checkbox style="pointer-events: none;" v-model="item.useStatus1" true-label="true" false-label="false">正常使用</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.useStatus2" true-label="true" false-label="false">库存</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.useStatus4" true-label="true" false-label="false">经营出租</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.useStatus5" true-label="true" false-label="false">公用</el-checkbox>
      </dl-col>
  
      <dl-col :span="24" title="增加方式" class="right-col">
       <el-checkbox style="pointer-events: none;" v-model="item.addWay1" true-label="true" false-label="false">购入</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay2" true-label="true" false-label="false">商业转入</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay3" true-label="true" false-label="false">其他地产公司转入</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay4" true-label="true" false-label="false">租入</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay5" true-label="true" false-label="false">捐赠</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay6" true-label="true" false-label="false">商业借入</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.addWay7" true-label="true" false-label="false">地产总部调拨</el-checkbox>
      </dl-col>
 
      <dl-col :span="24" title="存放地点" class="right-col">
       <el-checkbox style="pointer-events: none;" v-model="item.storageSites1" true-label="true" false-label="false">办公区</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.storageSites2" true-label="true" false-label="false">仓库</el-checkbox>
       <el-checkbox style="pointer-events: none;" v-model="item.storageSites3" true-label="true" false-label="false">城市广场</el-checkbox>
      </dl-col>
  
      <el-col :span="12" >
        <div class="d-min">
          <span>保管人员(PD)</span>
          <el-input v-model="item.keeperName" readonly/>
          <!-- <el-input hidden="hidden" v-model="item.keeperCd"/>
          <el-input hidden="hidden" v-model="item.computerType"/> -->
          </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>保管人员(非PD)</span>
          <el-input v-model="item.keeperName2" readonly/></div>
      </el-col>
  
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>发票金额(PD)</span>
          <el-input v-model="item.srcValue"/>
          </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">如为普通发票，不含税金额请填写发票金额，税额填0</p>
          </div>
      </el-col>
      <el-col :span="12" >
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>不含税金额</span>
          <!-- <el-input v-model="item.beforePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" /> -->
          <el-input v-if="$route.query.id && form.status != '草稿'" :value="(parseFloat(item.beforePrice).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !item.beforePrice, 'required': !form.bizEntityJson.disabled}" v-model="item.beforePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="item.disabled ? '' : 'required'">
          <span>税额</span>
          <!-- <el-input v-model="item.taxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" /> -->
          <el-input v-if="$route.query.id && form.status != '草稿'" :value="(parseFloat(item.taxRatePrice).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !item.taxRatePrice, 'required': !form.bizEntityJson.disabled}" v-model="item.taxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
      </el-col>
  
      <el-col :span="12" >
        <div class="d-min">
          <span>折旧年限</span>
          <el-input v-model="item.depreYeadNum" readonly/></div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>折旧方式</span>
          <el-input v-model="item.depreWay" readonly/></div>
      </el-col>
    </el-row>
<!---->
    <el-row :gutter="24" class="margin-row top-row">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>财务入账公司</span>
          <el-input v-model="form.bizEntityJson.accCompanyCd" style="display:none;" />
          <el-select
           :class="{'novalue': !form.bizEntityJson.accCompany, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.accCompany"
            filterable
            remote
            clearable
            @change="accCompanyChange"
            :remote-method="remoteAccCompany"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in accCompanyNameOptions"
              :key="item.companyCode"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        
        </div>
      </el-col>
    </el-row>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchUser: false,
      acctUnitNameOptions: [], // 模糊搜索下拉请求options
      accCompanyNameOptions:[],
      loading: false,
    }
  },
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        console.log(val)
        this.form = val;
      }
    },
  },
  created() {
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'fixedAssetsProperties', [])
    }

  },
  methods: {
    changePlateType() {
      this.$set(this.form.bizEntityJson,'positionRank','')     
      this.$set(this.form.bizEntityJson,'payeePersonName','')     

      
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.payeePersonName = val.userName
        this.form.bizEntityJson.payeePersonId = val.userCd
      }
      this.showSearchUser = false
    },
    // 模糊查资产采购单号
    remoteAssmApp(query) {
      if (query) {
        this.loading = true
        this.$approval.postAssmAppInfo({purchaseCode: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.acctUnitNameOptions = res.data
              
            } else {
              this.acctUnitNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.acctUnitNameOptions = []
      }
    },
    //模糊查公司
    remoteAccCompany(query) {
      if (query) {
        this.loading = true
        this.$approval.postAccCompanyInfo({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.accCompanyNameOptions = res.data
            } else {
              this.accCompanyNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.accCompanyNameOptions = []
      }
    },
     assmAppChange(val) {
      let obj = this.acctUnitNameOptions.find(item => item.purchaseCode == val)
      if(obj!=undefined){
        // 赋值
        this.form.bizEntityJson.purchaseCode = obj ? obj.purchaseCode : ''
        this.form.bizEntityJson.applyResApproveInfoId = obj ? obj.resApproveInfoId : ''

        this.$approval.postAssListInfo({resApproveInfoId: obj.resApproveInfoId}).then(res => {
          if(res.code == 1) {
            if (res.data !=null && res.data.length > 0) {
            this.form.bizEntityJson.fixedAssetsProperties = res.data
            
            } else {
              this.form.bizEntityJson.fixedAssetsProperties = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      }
    },
    accCompanyChange(val){
      let obj = this.accCompanyNameOptions.find(item => item.companyName == val)
      // 赋值
      this.form.bizEntityJson.accCompany = obj ? obj.companyName : ''

      this.form.bizEntityJson.accCompanyCd = obj ? obj.companyCode : ''

    },
    accCompanyChange2(val){
      let obj = this.accCompanyNameOptions.find(item => item.companyName == val)
      // 赋值
      this.form.bizEntityJson.payeePersonNameTwo = obj ? obj.companyName : ''
    },
     // 删除
    remove(index) {
      if (this.form.bizEntityJson.fixedAssetsProperties.length > 0) {
        this.form.bizEntityJson.fixedAssetsProperties.splice(index, 1)
      }
    }
    ,
   // 必填判断
    validate() {
      let messageErrorInfo='';
      try{
        this.form.bizEntityJson.fixedAssetsProperties.forEach((e, index) => {
           messageErrorInfo='';
           console.log(e);
           console.log(index);
        let srcValue = Number(e.srcValue.replace(/,/g, ''));//发票金额
          let beforePrice = Number(e.beforePrice.replace(/,/g, ''));//不含税金额
          let taxRatePrice = Number(e.taxRatePrice.replace(/,/g, ''));//税额
          if(!srcValue===(beforePrice+taxRatePrice)){
              // this.$alert('第'+(index+1)+'条资产数据,发票金额不等于不含税金额加税额', '提示', {
              //         confirmButtonText: '确定'
              //     });
              //     return false;
              messageErrorInfo='第'+(index+1)+'条资产数据,发票金额不等于不含税金额加税额';
              throw Error(messageErrorInfo);
          }
        });
      }catch(err){
        console.log(err)
        this.$message.error(messageErrorInfo)
        return false;
      }
     
    }

  }
}
</script>
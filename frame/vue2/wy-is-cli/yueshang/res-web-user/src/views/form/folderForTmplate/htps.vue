// 合同评审（Ｏ）（新）   宝龙地产/地产/新成本/其他事物/合同评审（O）

<template>
  <!-- 合同评审（Ｏ）（新） -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="12" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>项目名称</span>
          <el-select
            :class="{novalue:!form.bizEntityJson.projectName}"
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.projectName"
            filterable
            remote
            reserve-keyword
            :remote-method="quickSearchProject"
            @change="changeProject"
            >
            <el-option
              v-for="item in options"
              :key="item.projectCd"
              :label="item.projectName"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>期数</span>
          <el-select
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.phasesName"
             @change="changePhases"
            >
            <el-option
              v-for="item in options2"
              :key="item.phasesCd"
              :label="item.phasesName"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>合约规划科目</span>
          <el-select
            :class="{novalue:!form.bizEntityJson.contractPlanSubjectsName}"
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.contractPlanSubjectsName"
            filterable
            remote
            reserve-keyword
            :remote-method="getSubjectFirstLevelList"
            @change="changeSubject"
            >
            <el-option
              v-for="item in options5"
              :key="item.contractPlanSubjectsId"
              :label="item.contractPlanSubjectsName"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>工程名称</span>
          <el-input :class="{novalue:!form.bizEntityJson.engineering}" v-model="form.bizEntityJson.engineering"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>甲方</span>
          <el-input :class="{novalue:!form.bizEntityJson.partyA}" v-model="form.bizEntityJson.partyA"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>乙方</span>
          <el-input :class="{novalue:!form.bizEntityJson.partyB}" v-model="form.bizEntityJson.partyB"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>单位名称</span>
          <el-input :class="{novalue:!form.bizEntityJson.companyName}" v-model="form.bizEntityJson.companyName"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>合同金额（含税总价）</span>
          <el-input :class="{novalue:!form.bizEntityJson.contentTotalAmount}" v-model="form.bizEntityJson.contentTotalAmount" @input="changeTotal" type="number"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>税率</span>
          <el-select
           :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.rate"
            @change="changeRate"
            >
            <el-option
              v-for="item in rateOptions"
              :key="item.key"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>税额</span>
          <el-input disabled v-model="form.bizEntityJson.taxAmount"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>不含税价</span>
          <el-input disabled v-model="form.bizEntityJson.noTaxPrice"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>开具发票种类</span>
          <el-select
            :class="{novalue:!form.bizEntityJson.invoiceType}"
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.invoiceType"
            >
            <el-option
              v-for="item in options3"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>合同编号</span>
          <el-input disabled v-model="form.bizEntityJson.contractNo"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>合同类型</span>
          <el-select
              :class="{novalue:!form.bizEntityJson.contractType}"
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.contractType"
              >
              <el-option
                v-for="item in options4"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>备注</span>
          <el-input v-model="form.bizEntityJson.remark"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px !important">
      <el-col :span="24" class="title-col right-col">
        <h2>招标主要内容</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>招标范围</span>
          <el-input :class="{novalue:!form.bizEntityJson.scopeBidding}" v-model="form.bizEntityJson.scopeBidding"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" style="line-height:35px" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>设计周期</span>
          <el-date-picker
            :class="{novalue:!form.bizEntityJson.designBeginDate}"
            :readonly="form.bizEntityJson.disabled"
            width="400"
            v-model="form.bizEntityJson.designBeginDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            :class="{novalue:!form.bizEntityJson.designEndDate}"
            :readonly="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.designEndDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          共
          <input type="number" style="border:none" :class="{novalue:!form.bizEntityJson.designDays}" v-model="form.bizEntityJson.designDays">
          天
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>质量要求</span>
          <el-input :class="{novalue:!form.bizEntityJson.qualityRequirements}" v-model="form.bizEntityJson.qualityRequirements"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>招标模式</span>
          <el-radio-group :class="{novalue:!form.bizEntityJson.tenderMode}" v-model="form.bizEntityJson.tenderMode">
            <el-radio :label="'1'">邀请招标单</el-radio>
            <el-radio :label="'2'">竞争性谈判</el-radio>
            <el-radio :label="'3'">直接委托(战略合作单位)</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min"  :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>计价模式</span>
          <el-radio-group :class="{novalue:!form.bizEntityJson.pricingModel}" v-model="form.bizEntityJson.pricingModel">
            <el-radio :label="'1'">总价包干</el-radio>
            <el-radio :label="'2'">单价包干（按当地政府测绘部门最终确认的各业态建筑面积，按实结算）</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>付款方式</span>
           <el-input v-model="form.bizEntityJson.payType"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 20px !important">
      <el-col :span="24" class="title-col right-col">
        <h2>附件上传</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>合同文本</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">添加附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const data = {};
const uploadUrl = '';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      options: [],
      options2: [],
      options3: [
        {key: '1',value: '增值税专业发票'},
        {key: '2',value: '增值税普通发票'},
        {key: '3',value: '其它'}
      ],
      options4: [
        {key: '1',value: '工程类'},
        {key: '2',value: '设计类'},
        {key: '3',value: '资讯类'},
        {key: '4',value: '营销策划类'},
      ],
      options5: [],
      rateOptions: [
        {
          key: '0%',
          value: 0
        },
        {
          key: '1%',
          value: 0.01
        },
        {
          key: '3%',
          value: 0.03
        },
        {
          key: '5%',
          value: 0.05
        },
        {
          key: '6%',
          value: 0.06
        },
        {
          key: '9%',
          value: 0.09
        },
        {
          key: '10%',
          value: 0.1
        },
        {
          key: '11%',
          value: 0.11
        },
        {
          key: '13%',
          value: 0.13
        },
        {
          key: '16%',
          value: 0.16
        },
        {
          key: '17%',
          value: 0.17
        },
        {
          key: '20%',
          value: 0.2
        },
      ],
      userInfo: {}
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
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if(!this.form.bizEntityJson.rate) {
      this.$set(this.form.bizEntityJson,'rate',0)
    }
  },
  methods: {
    // 模糊搜索项目
    quickSearchProject(query) {
      if (query !== '') {
        const params = {
          projectName: query
        }
        this.$approval.quickSearchProject(params).then(res => {
          if(res.code == 1 && res.data){
            this.options = res.data;
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }
    },
    // 模糊查询合同规划科目
    getSubjectFirstLevelList(query) {
      if (query !== '') {
        const params = {
          contractPlanSubjectsName: query
        }
        this.$approval.getSubjectFirstLevelList(params).then(res => {
          if(res.code == 1 && res.data){
            this.options5 = res.data;
          } else {
            this.options5 = [];
          }
        });
      } else {
        this.options5 = [];
      }
    },
    // 查询可选期数以及合同编号
    generateContractNo(val) {
      if(!val) return;
      const params = {
        projectCd: val.projectCd
      }
      this.$approval.generateContractNo(params).then(res => {
        if(res.code == 1 && res.data){
          this.form.bizEntityJson.contractNo = res.data.newContractNo;
          this.options2 = res.data.phases || [];
        } else {
          this.options2 = [];
        }
      });
    },
    changeProject(val) {
      this.form.bizEntityJson.projectName = val.projectName;
      this.form.bizEntityJson.projectCd = val.projectCd;
      this.generateContractNo(val);
    },
    changeSubject(val) {
      this.form.bizEntityJson.contractPlanSubjectsCd = val.contractPlanSubjectsCd;
      this.form.bizEntityJson.contractPlanSubjectsName = val.contractPlanSubjectsName;
    },
    changePhases(val) {
      this.form.bizEntityJson.phasesCd = val.phasesCd;
      this.form.bizEntityJson.phasesName = val.phasesName;
    },
    changeRate(val) {
      const total = this.form.bizEntityJson.contentTotalAmount;
      if(total) {
        const taxAmount = this.getDouble((total * (val/1.01)));
        this.form.bizEntityJson.taxAmount = taxAmount;
        this.form.bizEntityJson.noTaxPrice = total - taxAmount;
      }
    },
    changeTotal(val) {
      val = this.getDouble(val);
      this.form.bizEntityJson.contentTotalAmount = val;
      const rate = this.form.bizEntityJson.rate;
      if(val) {
        const taxAmount = this.getDouble((val * (rate/1.01)));
        this.form.bizEntityJson.taxAmount = taxAmount;
        this.form.bizEntityJson.noTaxPrice = val - taxAmount;
      }
    },
    getDouble(val) {
      console.log(val)
      val += '';
      if(val == 0) return 0;
      val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || '';
      return val;
    },
     handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      const fileId = response.data.fileId;
      this.form.bizEntityJson.fileId += fileId;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let nowfile;
      if(file.response) {
          nowfile = file.response.data.fileId;
      }else {
          nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId;
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'');
    },
    downLoadFile(file) {
      console.log(file)
      if(file.showUrl) {
        window.open(file.showUrl, '_blank');
        return;
      }
      const fileIds = file.response.data.fileId;
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl;
          window.open(showUrl, '_blank');
        }
      })
    }
  }
}
</script>

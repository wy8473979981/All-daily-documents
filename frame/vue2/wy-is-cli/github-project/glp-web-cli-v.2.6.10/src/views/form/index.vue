<template>
    <div class="form-container">
      <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            size="small"
            label-width="120px"
            class="demo-ruleForm">
            <el-row class="row-item" :gutter="20">
                <el-col :span="12">
                    <el-form-item label="供应商" prop="supplier">
                        <el-input v-model="ruleForm.supplier" placeholder="请输入供应商"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="借款人" prop="borrower">
                        <el-input v-model="ruleForm.borrower" placeholder="请输入借款人"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="8">
                    
                    <MoneyArea :input-data="ruleForm" :label-name="'借款金额'" :key-name="'amount'"/>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款利息" prop="interest">
                        <el-input v-model="ruleForm.interest" placeholder="请输入借款利息"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款期限" prop="dateTerm">
                        <el-input v-model="ruleForm.dateTerm" placeholder="请输入借款期限">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="担保公司名称" prop="guaranteeCompany">
                        <el-input v-model="ruleForm.guaranteeCompany" placeholder="请输入担保公司名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="担保公司地址" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请输入担保公司地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="担保公司统一社会信用代码" prop="creditCode">
                        <el-input v-model="ruleForm.creditCode" placeholder="请输入担保公司统一社会信用代码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">

                <el-col :span="12">
                    <el-form-item label="资金方" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择资金方">
                            <el-option label="普洛斯融资租赁" value="1"></el-option>
                            <el-option label="洛华供应链" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="币种" prop="currency">
                        <el-select v-model="ruleForm.currency" placeholder="请选择币种">
                            <el-option label="人民币" value="1"></el-option>
                            <el-option label="港币" value="2"></el-option>
                            <el-option label="欧元" value="3"></el-option>
                            <el-option label="美元" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row class="row-item" :gutter="20">

                <el-col :span="12">
                    <el-form-item label="开始时间" prop="startDate">
                        <el-date-picker
                            :picker-options="startPickerOptions"
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.startDate"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="结束时间" prop="endDate">
                        <el-date-picker
                            :picker-options="endPickerOptions"
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.endDate"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="打开监控" prop="monitor">
                        <el-switch v-model="ruleForm.monitor"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="税费融资" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="税费融资" name="type"></el-checkbox>
                            <el-checkbox label="客户自付" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="日期基数" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="360"></el-radio>
                            <el-radio label="365"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="备注" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row-item" :gutter="20">
                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">保存</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
  </div>
</template>
<script>
    import moneyArea from '@/components/InputArea/money'
export default {
  data() {
        let self = this;
    return {
      ruleForm: {
        supplier: "",
        borrower: "",
        amount: "",
        interest: "",
        dateTerm: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        supplier: [
          { required: true, message: "请输入供应商", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        borrower :[
            {required:true,message:'请输入借款人',trigger:'blur'}
        ],
        amount :[
            {required:true,message:'请输入借款金额',trigger:'blur'}
        ],
        interest :[
            {required:true,message:'请输入借款利息',trigger:'blur'},
            {pattern:/^\d/g,message:'利息格式不正确',trigger:'blur'}
        ],
        borrower :[
            {required:true,message:'请输入借款人',trigger:'blur'}
        ],
        region: [
          { required: true, message: "请选择资金方", trigger: "change" }
        ],
        currency: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择额度有效期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一种税费融资方式",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },

        startPickerOptions:{
            disabledDate (time){
                let nowDate=new Date();
                return time.getTime()<nowDate.getTime()-24*3600*1000;
            } 
        },
        endPickerOptions:{
            disabledDate (time){
                let startDate=self.ruleForm.startDate || '';
                let sdTime=startDate!=''?new Date(startDate).getTime()+24*3600*1000:new Date().getTime();
                return time.getTime()<sdTime;
            } 
        },
    };
  },
    components:{
        'MoneyArea':moneyArea
    },
  methods: {

    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$message({
            type:'success',
            message:'恭喜，提交成功！'
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    }
  }
};
</script>


<style lang="scss" scoped>
    .form-container {
        width: 800px;
        margin: 30px auto;
        border: 1px solid #efefef;
        padding: 20px;
        border-radius: 3px;

        .row-item{
            margin-bottom:10px;
        }
    }
    .line {
      text-align: center;
    }
</style>

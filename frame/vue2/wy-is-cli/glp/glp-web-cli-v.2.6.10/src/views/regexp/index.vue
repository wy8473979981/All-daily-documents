<template>
  <div class="container">
    <el-card class="form-section">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="35%" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name" class="form-line">
          <el-input v-model="ruleForm.name" class="form-text"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region" class="form-line">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="form-text">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="desc" class="form-line">
          <el-input type="textarea" v-model="ruleForm.desc" class="form-text"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" class="form-line">
          <el-input v-model="ruleForm.name" class="form-text"></el-input>
        </el-form-item>
        <el-form-item label="目标公开" prop="name" class="form-line">
          <el-input v-model="ruleForm.name" class="form-text"></el-input>
        </el-form-item>
        <el-form-item class="form-line">
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn-twofont">提交</el-button>
          <el-button @click="resetForm('ruleForm')" class="btn-twofont">重置</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
const {regex,checkFn} = require('@/utils/formCheck');
import moneyArea from '@/components/InputArea/money'
export default {
  props: {},
  data() {
    return {
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写统一社会信用代码', trigger: 'blur' }
          ]
        }
    };
  },

    components:{
        'MoneyArea':moneyArea
    },
    computed: {},
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style scoped>
    /* .section{
       margin:0 auto;
    } */
</style>

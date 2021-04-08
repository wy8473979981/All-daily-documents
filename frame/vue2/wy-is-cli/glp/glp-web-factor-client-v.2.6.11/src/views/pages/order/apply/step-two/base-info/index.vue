<template>
  <glp-section title="基础合同信息" class="mt-4 mb-4">
    <div :class="[$style.contentcoan]">
      <el-form
        :model="form"
        status-icon
        ref="form"
        :rules="rules"
        label-width="100px"
        label-position="top"
        class="demo-form"
      >
        <el-col :span="11">
          <el-form-item prop="contractName">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>合同名称
            </span>
            <el-input v-model="form.contractName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="contractCode">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>合同编号
              </span>
              <span :class="[$style['label-tips']]">合同编号一定要准确，若无请填“/”</span>
            </template>
            <el-input v-model="form.contractCode"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item prop="contractEndDate">
            <span :class="[$style['label']]">合同到期日</span>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.contractEndDate"
              style="width: 80%;margin-right:3%"
            ></el-date-picker>
            <el-checkbox v-model="checked">长期</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="contractSignDate">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>合同签署日
              </span>
            </template>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.contractSignDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="clear"></div>
    </div>
  </glp-section>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
@Component
export default class Product extends Vue {
  @Ref() tb!: any

  @Prop() form!: any

  @Prop() taskId!: string

  checked = true

  rules = {
    contractName: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
    ],
    contractNo: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ]
  }

  dataSource: Array<any> = []

  currentStep = 1
}
</script>
<style lang="scss" module>
.contentcoan {
  width: 700px;
  margin: auto;
}
.hide {
  visibility: hidden;
}
.label {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  margin-right: 5px;
}

.label-tips {
  width: 187px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 144, 42, 1);
  line-height: 17px;
}
</style>

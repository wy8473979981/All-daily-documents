<template>
  <glp-section title="基础合同交易方" class="mt-4 mb-4">
    <div :class="[$style.content]">
      <el-form
        :model="form"
        status-icon
        ref=" form"
        :rules="rules"
        label-width="100px"
        label-position="top"
        class="demo- form"
      >
        <el-col :span="11">
          <el-form-item prop="buyerName">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>买方名称
            </span>
            <el-input v-model="form.buyerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="sellerName">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>卖方名称
              </span>
            </template>
            <el-input v-model="form.sellerName" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item prop="buyerContactName">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>买方联系人姓名
            </span>
            <el-input v-model="form.buyerContactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="sellerContactName">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>卖方联系人姓名
              </span>
            </template>
            <el-input v-model="form.sellerContactName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="buyerContactEmail">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>买方联系人邮箱
            </span>
            <el-input v-model="form.buyerContactEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="sellerContactEmail">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>卖方联系人邮箱
              </span>
            </template>
            <el-input v-model="form.sellerContactEmail" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="buyerContactMobile">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>买方联系人电话
            </span>
            <el-input v-model="form.buyerContactMobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="sellerContactMobile">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>卖方联系人电话
              </span>
            </template>
            <el-input v-model="form.sellerContactMobile" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item prop="buyerContactLawFileSendAddr">
            <span :class="[$style['label']]">
              <span style="color:red">*</span>买方法律文书送达地址
            </span>
            <el-input v-model="form.buyerContactLawFileSendAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div :class="[$style.hide]">占位</div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="sellerContactLawFileSendAddr">
            <template solt="label">
              <span :class="[$style['label']]">
                <span style="color:red">*</span>卖方法律文书送达地址
              </span>
            </template>
            <el-input v-model="form.sellerContactLawFileSendAddr" disabled></el-input>
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
.content {
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

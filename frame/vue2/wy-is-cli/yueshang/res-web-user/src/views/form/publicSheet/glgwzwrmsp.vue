<template>
  <!-- 管理岗位职务任免审批 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>是否满足</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.satisfiedFlg == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.satisfiedFlg">
              <el-radio :label="true">满足条件</el-radio>
              <el-radio :label="false">不满足条件</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.renameType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.renameType">
              <el-radio label="1">减名</el-radio>
              <el-radio label="2">增名</el-radio>
              <el-radio label="3">换名(转让)</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>原业主名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.originalOwnerName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originalOwnerName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>现业主名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.newOwnerName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.newOwnerName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>身份证/护照号 </span>
          <el-input :class="{'novalue': !form.bizEntityJson.originalIDNumber, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originalIDNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>身份证/护照号</span>
          <el-input :class="{'novalue': !form.bizEntityJson.newIDNumber, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.newIDNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>联系电话</span>
          <el-input :class="{'novalue': !form.bizEntityJson.originalPhoneNum, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originalPhoneNum" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>联系电话</span>
          <el-input :class="{'novalue': !form.bizEntityJson.newPhoneNum, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.newPhoneNum" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>通讯地址</span>
          <el-input :class="{'novalue': !form.bizEntityJson.originalAddr, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originalAddr" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>通讯地址</span>
          <el-input :class="{'novalue': !form.bizEntityJson.newAddr, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.newAddr" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span style="flex: none;">认购单元</span>
          <el-col :span="4" style="border: 0;">
            <div class="d-red" :class="{'novalue': !form.bizEntityJson.building, 'required-onInput': !form.bizEntityJson.disabled}">
              <el-input v-model="form.bizEntityJson.building" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                <template slot="append">栋</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4" style="border: 0;">
            <el-input v-model="form.bizEntityJson.unit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
              <template slot="append">单元</template>
            </el-input>
          </el-col>
          <el-col :span="4" style="border: 0;">
            <div class="d-red" :class="{'novalue': !form.bizEntityJson.floor, 'required-onInput': !form.bizEntityJson.disabled}">
              <el-input v-model="form.bizEntityJson.floor" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                <template slot="append">层</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4" style="border: 0;">
            <div class="d-red" :class="{'novalue': !form.bizEntityJson.storefront, 'required-onInput': !form.bizEntityJson.disabled}">
              <el-input v-model="form.bizEntityJson.storefront" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                <template slot="append">住宅/店面</template>
              </el-input>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>认购时间</span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.subscriptionDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.subscriptionDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>单价</span>
          <el-input :class="{'novalue': !form.bizEntityJson.price, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.price" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>总价</span>
          <el-input :class="{'novalue': !form.bizEntityJson.totalAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalAmount" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>是否已额外申请优惠</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.applyDiscountFlg == undefined, 'required-onInput': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.applyDiscountFlg">
              <el-radio :label="true" style="margin-right: 60px;">
                是
                <el-input v-if="form.bizEntityJson.applyDiscountFlg" v-model="form.bizEntityJson.discountRate" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                  <template slot="append">%</template>
                </el-input>
              </el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>已付款项</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.bookingFeeDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.bookingFeeDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>预订金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.bookingFee, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bookingFee" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
              v-model="form.bizEntityJson.payInAdvanceDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>首付款(元)</span>
          <el-input v-model="form.bizEntityJson.payInAdvanceFee" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
              v-model="form.bizEntityJson.renewDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>续款(元)</span>
          <el-input v-model="form.bizEntityJson.renewFee" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>物业现状</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.propertyStatus, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.propertyStatus">
              <el-radio label="1">预订书</el-radio>
              <el-radio label="2">签定买卖合同</el-radio>
              <el-radio label="3">办理按揭</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>声明</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">本人同意上述房产为本人名字，并愿意支付以下费用：</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>原成交总价1％手续费</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.handlingFee === undefined || form.bizEntityJson.handlingFee === '', 'required-onInput': !form.bizEntityJson.disabled}">
            <el-input v-model="form.bizEntityJson.handlingFee" v-filter-check-input @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">上述房屋因更名产生的法律纠纷一切与贵公司无关。</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>原业主签名：</span>
          <el-input :class="{'novalue': !form.bizEntityJson.originalOwner, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originalOwner" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>现业主签名：</span>
          <el-input :class="{'novalue': !form.bizEntityJson.currentOwner, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.currentOwner" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: data,
      disabled: true,
      showSearchOrg: false
    }
  },
  created() {
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if (this.form.bizEntityJson.satisfiedFlg == undefined) return this.$message.error('请选择是否满足条件'), false
      if (!this.form.bizEntityJson.centerOrgName) return this.$message.error('请选择项目'), false
      if (!this.form.bizEntityJson.renameType) return this.$message.error('请选择类别'), false
      if (!this.form.bizEntityJson.originalOwnerName) return this.$message.error('请输入原业主名称'), false
      if (!this.form.bizEntityJson.newOwnerName) return this.$message.error('请输入现业主名称'), false
      if (!this.form.bizEntityJson.originalIDNumber) return this.$message.error('请输入原业主身份证/护照号'), false
      if (!this.form.bizEntityJson.newIDNumber) return this.$message.error('请输入现业主身份证/护照号'), false
      if (!this.form.bizEntityJson.originalPhoneNum) return this.$message.error('请输入原业主联系电话'), false
      if (!this.form.bizEntityJson.newPhoneNum) return this.$message.error('请输入现业主联系电话'), false
      if (!this.form.bizEntityJson.originalAddr) return this.$message.error('请输入原业主通讯地址'), false
      if (!this.form.bizEntityJson.newAddr) return this.$message.error('请输入现业主通讯地址'), false
      if (!this.form.bizEntityJson.building) return this.$message.error('请输入楼栋'), false
      if (!this.form.bizEntityJson.floor) return this.$message.error('请输入楼层'), false
      if (!this.form.bizEntityJson.storefront) return this.$message.error('请输入住宅/店面'), false
      if (!this.form.bizEntityJson.subscriptionDate) return this.$message.error('请选择认购时间'), false
      if (this.form.bizEntityJson.applyDiscountFlg == undefined) return this.$message.error('请选择是否已额外申请优惠'), false
      if (this.form.bizEntityJson.applyDiscountFlg) {
        if (!this.form.bizEntityJson.discountRate) return this.$message.error('请输入额外优惠百分比'), false
      }
      if (!this.form.bizEntityJson.price) return this.$message.error('请输入单价'), false
      if (!this.form.bizEntityJson.totalAmount) return this.$message.error('请输入总价'), false
      if (!this.form.bizEntityJson.bookingFeeDate) return this.$message.error('请输入预订金时间'), false
      if (!this.form.bizEntityJson.bookingFee) return this.$message.error('请输入预订金金额'), false
      if (!this.form.bizEntityJson.propertyStatus) return this.$message.error('请选择物业现状'), false
      if (this.form.bizEntityJson.handlingFee === undefined || this.form.bizEntityJson.handlingFee === '') return this.$message.error('请输入手续费'), false
      if (!this.form.bizEntityJson.originalOwner) return this.$message.error('请输入原业主签名'), false
      if (!this.form.bizEntityJson.currentOwner) return this.$message.error('请输入现业主签名'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
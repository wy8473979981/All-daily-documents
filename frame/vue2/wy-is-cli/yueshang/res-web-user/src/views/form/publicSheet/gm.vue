<template>
  <!-- 更名 -->
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
          <el-input :class="{'novalue': !form.bizEntityJson.price, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.price" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>总价</span>
          <el-input :class="{'novalue': !form.bizEntityJson.totalAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <el-input :class="{'novalue': !form.bizEntityJson.bookingFee, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bookingFee" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <el-input v-model="form.bizEntityJson.payInAdvanceFee" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <el-input v-model="form.bizEntityJson.renewFee" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
            <el-input v-model="form.bizEntityJson.handlingFee" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
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
      <dl-col :span="24" title="备注" place="right" :novalue="!form.bizEntityJson.remark">
        <el-input v-model="form.bizEntityJson.remark" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false
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
		}
	},
  created() {
    if (this.$route.query.id && this.form.status != '草稿') {
      this.price = (parseFloat(this.form.bizEntityJson.price).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.totalAmount = (parseFloat(this.form.bizEntityJson.totalAmount).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.bookingFee = (parseFloat(this.form.bizEntityJson.bookingFee).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.payInAdvanceFee = (parseFloat(this.form.bizEntityJson.payInAdvanceFee).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.renewFee = (parseFloat(this.form.bizEntityJson.renewFee).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.handlingFee = (parseFloat(this.form.bizEntityJson.handlingFee).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
  },
  mounted() {
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

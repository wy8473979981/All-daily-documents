<template>
  <!-- 退房 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>是否满足</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.backRoom, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.backRoom">
              <el-radio label="0">推盘量1%以内</el-radio>
              <el-radio label="1">推盘量1%以外</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.projectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>业主名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.owerName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.owerName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>身份证/护照号</span>
          <el-input :class="{'novalue': !form.bizEntityJson.idno, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.idno" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>联系电话</span>
          <el-input :class="{'novalue': !form.bizEntityJson.phoneNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.phoneNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>通讯地址</span>
          <el-input :class="{'novalue': !form.bizEntityJson.address, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.address" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>退房资料</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span style="flex: none;">退租单元</span>
          <el-row :gutter="24" style="width: 100%;">
            <el-col :span="5" style="border: 0;">
              <div class="d-red" :class="{'novalue': !form.bizEntityJson.buildName, 'required-onInput': !form.bizEntityJson.disabled}">
                <el-input v-model="form.bizEntityJson.buildName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                  <template slot="append">栋</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="5" style="border: 0;">
              <el-input v-model="form.bizEntityJson.unitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                <template slot="append">单元</template>
              </el-input>
            </el-col>
            <el-col :span="5" style="border: 0;">
              <div class="d-red" :class="{'novalue': !form.bizEntityJson.floorName, 'required-onInput': !form.bizEntityJson.disabled}">
                <el-input v-model="form.bizEntityJson.floorName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                  <template slot="append">层</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="9" style="border: 0;">
              <div class="d-red" :class="{'novalue': !form.bizEntityJson.storeName, 'required-onInput': !form.bizEntityJson.disabled}">
                <el-input v-model="form.bizEntityJson.storeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
                  <template slot="append">住宅/店面</template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>建筑面积</span>
          <el-input :class="{'novalue': !form.bizEntityJson.buildSquare, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.buildSquare" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>原建筑单价(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.oldConsUnitPrice, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.oldConsUnitPrice" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>新建筑单价(元)</span>
          <el-input v-model="form.bizEntityJson.newConsUnitPrice" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>原总价(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.oldTotalPrice, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.oldTotalPrice" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>新总价(元)</span>
          <el-input v-model="form.bizEntityJson.newTotalPrice" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>认购时间</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.substribeDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.substribeDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>调价比例(%)</span>
          <el-input v-model="form.bizEntityJson.priceAdjustProp" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>已付款项</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.prePayDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.prePayDate"
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
          <el-input :class="{'novalue': !form.bizEntityJson.prePayAmt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.prePayAmt" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
            v-model="form.bizEntityJson.firstPayDate"
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
          <el-input v-model="form.bizEntityJson.firstPayAmt" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>时间</span>
          <el-date-picker
            v-model="form.bizEntityJson.repayDate"
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
          <el-input v-model="form.bizEntityJson.repayAmt" v-filter-check-input @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>物业现状</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.selectReseBook, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.selectReseBook">
              <el-radio label="0">预订书</el-radio>
              <el-radio label="1">签定买卖合同</el-radio>
              <el-radio label="2">办理按揭</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>声明</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">本人申请上述房产的退购，并愿意支付以下费用：</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>
            原房屋成交总价
            <el-tooltip class="item" effect="dark" content="违约金/手续费" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.dealTotalPenalty, 'required-onInput': !form.bizEntityJson.disabled}">
            <el-input v-model="form.bizEntityJson.dealTotalPenalty" v-filter-check-number @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>业主签名：</span>
          <el-input v-model="form.bizEntityJson.owerSignName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.contentDesc" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg"></search-org>
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
      if(!this.form.bizEntityJson.backRoom) return this.$message.error('请选择满足条件'), false
      if(!this.form.bizEntityJson.projectName) return this.$message.error('请选择项目名称'), false
      if(!this.form.bizEntityJson.owerName) return this.$message.error('请输入业主名称'), false
      if(!this.form.bizEntityJson.idno) return this.$message.error('请输入身份证/护照号'), false
      if(!this.form.bizEntityJson.phoneNo) return this.$message.error('请输入联系电话'), false
      if(!this.form.bizEntityJson.address) return this.$message.error('请输入通讯地址'), false
      if(!this.form.bizEntityJson.buildName) return this.$message.error('请输入楼栋号'), false
      if(!this.form.bizEntityJson.floorName) return this.$message.error('请输入楼层'), false
      if(!this.form.bizEntityJson.storeName) return this.$message.error('请输入住宅/店面'), false
      if(!this.form.bizEntityJson.buildSquare) return this.$message.error('请输入建筑面积'), false
      if(!this.form.bizEntityJson.oldConsUnitPrice) return this.$message.error('请输入原建筑单价'), false
      if(!this.form.bizEntityJson.oldTotalPrice) return this.$message.error('请输入原总价'), false
      if(!this.form.bizEntityJson.substribeDate) return this.$message.error('请选择认购时间'), false
      if(!this.form.bizEntityJson.prePayDate) return this.$message.error('请选择已付款时间'), false
      if(!this.form.bizEntityJson.prePayAmt) return this.$message.error('请输入预定金'), false
      if(!this.form.bizEntityJson.selectReseBook) return this.$message.error('请选择物业现状'), false
      if(!this.form.bizEntityJson.dealTotalPenalty) return this.$message.error('请输入原房屋成交总价'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

<template>
  <!-- 交通费用明细 -->
  <div class="trafficCostDetail-box">
    <el-dialog
      title="交通费报销明细"
      :visible.sync="fast"
      width="1000px"
      v-dialogDrag
      :close-on-click-modal="false"
      :close-on-press-escape="false"
	    @close="cancel"
      >
      <el-row :gutter="24" class="top-row">
        <el-col :span="24" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one">注：简易计税项目、2019年4月1日之前发生的非增值税专票或者非本人实名票据请记录在“其他”栏中</p>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
        </el-col>
        <el-col :span="3" class="title-col">
          <h2>含税总价</h2>
        </el-col>
        <el-col :span="3" class="title-col">
          <h2>不含税金额</h2>
        </el-col>
        <el-col :span="3" class="title-col">
          <h2>税额</h2>
        </el-col>
        <el-col :span="3" class="title-col">
          <h2>会计核减金额</h2>
        </el-col>
        <el-col :span="3" class="title-col right-col">
          <h2>会计核减税额</h2>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>a.增值税专票</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzszpTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzszpTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzszpTaxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzszpKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.zzszpKjhjTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>b.1 增值税普票</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzsppTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzsppTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzsppTaxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.zzsppKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.zzsppKjhjTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>b.2 机票（含燃油附加费）-9%</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.jpTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.jpTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.jpTaxRatePrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.jpKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.jpKjhjTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>b.3 火车票-9%</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.hcpTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.hcpTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.hcpTaxRatePrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.hcpKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.hcpKjhjTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>b.4 公路、水路客票-3%</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.glTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.glTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.glTaxRatePrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.glKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.glKjhjTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>b.5 其他</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.qtTaxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.qtTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.qtTaxRatePrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.qtKjhjPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!accountFlg" :yykReadonly="accountFlg ? true : false" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.qtKjhjTax" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="9" class="title-col">
          <h2>总计</h2>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.sumTaxPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.sumTaxNoPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.sumTaxRatePrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="d-min">
            <el-input v-model="info.sumKjhjPrice" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="3" class="right-col">
          <div class="d-min">
            <el-input v-model="info.sumKjhjTax" readonly></el-input>
          </div>
        </el-col>
      </el-row>
      <span v-if="!reveal" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Approval from '@/apis/apis/approval';

export default {
  name: 'trafficCostDetail',
  props: ['open', 'detail', 'accountFlg', 'realAmt', 'reveal'],
  data() {
    return {
      loading: false,
      isPrice: false,
      isTax: false,
      info: {
        zzszpTaxPrice: 0.00.toFixed(2),
        zzszpTaxNoPrice: 0.00.toFixed(2),
        zzszpTaxRatePrice: 0.00.toFixed(2),
        zzszpKjhjPrice: 0.00.toFixed(2),
        zzszpKjhjTax: 0.00.toFixed(2),
        zzsppTaxPrice: 0.00.toFixed(2),
        zzsppTaxNoPrice: 0.00.toFixed(2),
        zzsppTaxRatePrice: 0.00.toFixed(2),
        zzsppKjhjPrice: 0.00.toFixed(2),
        zzsppKjhjTax: 0.00.toFixed(2),
        jpTaxPrice: 0.00.toFixed(2),
        jpTaxNoPrice: 0.00.toFixed(2),
        jpTaxRatePrice: 0.00.toFixed(2),
        jpKjhjPrice: 0.00.toFixed(2),
        jpKjhjTax: 0.00.toFixed(2),
        hcpTaxPrice: 0.00.toFixed(2),
        hcpTaxNoPrice: 0.00.toFixed(2),
        hcpTaxRatePrice: 0.00.toFixed(2),
        hcpKjhjPrice: 0.00.toFixed(2),
        hcpKjhjTax: 0.00.toFixed(2),
        glTaxPrice: 0.00.toFixed(2),
        glTaxNoPrice: 0.00.toFixed(2),
        glTaxRatePrice: 0.00.toFixed(2),
        glKjhjPrice: 0.00.toFixed(2),
        glKjhjTax: 0.00.toFixed(2),
        qtTaxPrice: 0.00.toFixed(2),
        qtTaxNoPrice: 0.00.toFixed(2),
        qtTaxRatePrice: 0.00.toFixed(2),
        qtKjhjPrice: 0.00.toFixed(2),
        qtKjhjTax: 0.00.toFixed(2),
        sumTaxPrice: 0.00.toFixed(2),
        sumTaxNoPrice: 0.00.toFixed(2),
        sumTaxRatePrice: 0.00.toFixed(2),
        sumKjhjPrice: 0.00.toFixed(2),
        sumKjhjTax: 0.00.toFixed(2),
      },
    }
  },
  created() {
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        if (this.open) {
          // this.getList()
          console.log(this.detail)
          this.info = {
            zzszpTaxPrice: 0.00.toFixed(2),
            zzszpTaxNoPrice: 0.00.toFixed(2),
            zzszpTaxRatePrice: 0.00.toFixed(2),
            zzszpKjhjPrice: 0.00.toFixed(2),
            zzszpKjhjTax: 0.00.toFixed(2),
            zzsppTaxPrice: 0.00.toFixed(2),
            zzsppTaxNoPrice: 0.00.toFixed(2),
            zzsppTaxRatePrice: 0.00.toFixed(2),
            zzsppKjhjPrice: 0.00.toFixed(2),
            zzsppKjhjTax: 0.00.toFixed(2),
            jpTaxPrice: 0.00.toFixed(2),
            jpTaxNoPrice: 0.00.toFixed(2),
            jpTaxRatePrice: 0.00.toFixed(2),
            jpKjhjPrice: 0.00.toFixed(2),
            jpKjhjTax: 0.00.toFixed(2),
            hcpTaxPrice: 0.00.toFixed(2),
            hcpTaxNoPrice: 0.00.toFixed(2),
            hcpTaxRatePrice: 0.00.toFixed(2),
            hcpKjhjPrice: 0.00.toFixed(2),
            hcpKjhjTax: 0.00.toFixed(2),
            glTaxPrice: 0.00.toFixed(2),
            glTaxNoPrice: 0.00.toFixed(2),
            glTaxRatePrice: 0.00.toFixed(2),
            glKjhjPrice: 0.00.toFixed(2),
            glKjhjTax: 0.00.toFixed(2),
            qtTaxPrice: 0.00.toFixed(2),
            qtTaxNoPrice: 0.00.toFixed(2),
            qtTaxRatePrice: 0.00.toFixed(2),
            qtKjhjPrice: 0.00.toFixed(2),
            qtKjhjTax: 0.00.toFixed(2),
            sumTaxPrice: 0.00.toFixed(2),
            sumTaxNoPrice: 0.00.toFixed(2),
            sumTaxRatePrice: 0.00.toFixed(2),
            sumKjhjPrice: 0.00.toFixed(2),
            sumKjhjTax: 0.00.toFixed(2),
          }
          if (this.detail) {
            if (this.detail.sumTaxPrice && this.detail.sumTaxPrice != 'NaN') {
              this.$nextTick(() => {
                this.info = JSON.parse(JSON.stringify(this.detail))
              })
            }
          }
        }
        return this.open
      },
      set(val) {
        this.$emit('close')
      }
    },
    zzszpTaxNoPrice() {
      return this.info.zzszpTaxPrice - this.info.zzszpTaxRatePrice
    },
    zzsppTaxNoPrice() {
      return this.info.zzsppTaxPrice - this.info.zzsppTaxRatePrice
    },
    sumTaxPrice() {
      return Number(this.info.zzszpTaxPrice) + Number(this.info.zzsppTaxPrice) + Number(this.info.jpTaxPrice) + Number(this.info.hcpTaxPrice) + Number(this.info.glTaxPrice) + Number(this.info.qtTaxPrice)
    },
    sumTaxNoPrice() {
      return Number(this.info.zzszpTaxNoPrice) + Number(this.info.zzsppTaxNoPrice) + Number(this.info.jpTaxNoPrice) + Number(this.info.hcpTaxNoPrice) + Number(this.info.glTaxNoPrice) + Number(this.info.qtTaxNoPrice)
    },
    sumTaxRatePrice() {
      return Number(this.info.zzszpTaxRatePrice) + Number(this.info.zzsppTaxRatePrice) + Number(this.info.jpTaxRatePrice) + Number(this.info.hcpTaxRatePrice) + Number(this.info.glTaxRatePrice) + Number(this.info.qtTaxRatePrice)
    },
    sumKjhjPrice() {
      return Number(this.info.zzszpKjhjPrice) + Number(this.info.zzsppKjhjPrice) + Number(this.info.jpKjhjPrice) + Number(this.info.hcpKjhjPrice) + Number(this.info.glKjhjPrice) + Number(this.info.qtKjhjPrice)
    },
    sumKjhjTax() {
      return Number(this.info.zzszpKjhjTax) + Number(this.info.zzsppKjhjTax) + Number(this.info.jpKjhjTax) + Number(this.info.hcpKjhjTax) + Number(this.info.glKjhjTax) + Number(this.info.qtKjhjTax)
    },
  },
  watch: {
    zzszpTaxNoPrice(val) {
      this.info.zzszpTaxNoPrice = val.toFixed(2)
    },
    zzsppTaxNoPrice(val) {
      this.info.zzsppTaxNoPrice = val.toFixed(2)
    },
    'info.jpTaxPrice'(val) {
      this.info.jpTaxRatePrice = (val / (1 + 0.09) *  0.09).toFixed(2)
      this.info.jpTaxNoPrice = (val - this.info.jpTaxRatePrice).toFixed(2)
    },
    'info.hcpTaxPrice'(val) {
      this.info.hcpTaxRatePrice = (val / (1 + 0.09) *  0.09).toFixed(2)
      this.info.hcpTaxNoPrice = (val - this.info.hcpTaxRatePrice).toFixed(2)
    },
    'info.glTaxPrice'(val) {
      this.info.glTaxRatePrice = (val / (1 + 0.03) *  0.03).toFixed(2)
      this.info.glTaxNoPrice = (val - this.info.glTaxRatePrice).toFixed(2)
    },
    'info.qtTaxPrice'(val) {
      this.info.qtTaxRatePrice = 0.00.toFixed(2)
      this.info.qtTaxNoPrice = (val - this.info.qtTaxRatePrice).toFixed(2)
    },
    sumTaxPrice(val) {
      this.info.sumTaxPrice = val.toFixed(2)
    },
    sumTaxNoPrice(val) {
      this.info.sumTaxNoPrice = val.toFixed(2)
    },
    sumTaxRatePrice(val) {
      this.info.sumTaxRatePrice = val.toFixed(2)
    },
    sumKjhjPrice(val) {
      this.info.sumKjhjPrice = val.toFixed(2)
    },
    sumKjhjTax(val) {
      this.info.sumKjhjTax = val.toFixed(2)
    },
  },
  mounted() {
  },
  methods: {
    getList() {
      Approval.queryBankTypeAndSysRegion().then(res => {
        if(res.code == 1){
          this.bankTypeOptions = res.data.queryBankType
          this.provinceOptions = res.data.querySysRegion
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 清空数据
    resetData() {
      this.info = {
        bankType: '', //银行类型
        province: '', //省
        city: '', //市
        bankName: '', //支行名称
        bankCode: ''
      }
    },
    submit() {
      if (Number(this.info.sumTaxRatePrice) > Number(this.info.sumTaxNoPrice)) {
        this.$alert('税额不能大于金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log('确定')
          }
        })
        return
      }
      if (Number(this.info.zzszpKjhjPrice) > Number(this.info.zzszpTaxNoPrice)) {
        this.info.zzszpKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.zzsppKjhjPrice) > Number(this.info.zzsppTaxNoPrice)) {
        this.info.zzsppKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.jpKjhjPrice) > Number(this.info.jpTaxNoPrice)) {
        this.info.jpKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.hcpKjhjPrice) > Number(this.info.hcpTaxNoPrice)) {
        this.info.hcpKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.glKjhjPrice) > Number(this.info.glTaxNoPrice)) {
        this.info.glKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.qtKjhjPrice) > Number(this.info.qtTaxNoPrice)) {
        this.info.qtKjhjPrice = 0.00.toFixed(2)
        this.isPrice = true
      }
      if (Number(this.info.zzszpKjhjTax) > Number(this.info.zzszpTaxRatePrice)) {
        this.info.zzszpKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (Number(this.info.zzsppKjhjTax) > Number(this.info.zzsppTaxRatePrice)) {
        this.info.zzsppKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (Number(this.info.jpKjhjTax) > Number(this.info.jpTaxRatePrice)) {
        this.info.jpKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (Number(this.info.hcpKjhjTax) > Number(this.info.hcpTaxRatePrice)) {
        this.info.hcpKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (Number(this.info.glKjhjTax) > Number(this.info.glTaxRatePrice)) {
        this.info.glKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (Number(this.info.qtKjhjTax) > Number(this.info.qtTaxRatePrice)) {
        this.info.qtKjhjTax = 0.00.toFixed(2)
        this.isTax = true
      }
      if (this.isPrice) {
        this.$alert('核减金额不能大于不含税金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.isPrice = false
            this.isTax = false
          }
        })
        return
      }
      if (this.isTax) {
        this.$alert('核减税额不能大于税额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.isTax = false
          }
        })
        return
      }
      if (Number(this.info.sumKjhjPrice) + Number(this.info.sumKjhjTax) > Number(this.realAmt)) {
        this.$alert('核减金额+核减税额不能大于实付金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log('确定')
          }
        })
        return
      }
      this.$emit('close', this.info)
    },
    cancel() {
      // this.resetData()
      this.fast = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
  .trafficCostDetail-box {
    .el-dialog__header {
      text-align: center;
    }
    .el-icon-close {
      display: block !important;
    }
  }
</style>

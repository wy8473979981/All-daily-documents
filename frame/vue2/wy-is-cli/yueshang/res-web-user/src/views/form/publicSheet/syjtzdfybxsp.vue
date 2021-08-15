<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row v-if="processCode=='SYJT_ZDFBX'">
      <dl-col :span="12" :novalue="form.bizEntityJson.syGroup != 'true' && form.bizEntityJson.areaOperationCenter != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'商业集团',name:'syGroup'},
                        {label:'区域公司',name:'areaOperationCenter'}
                      ]"
          />
        </dl-col>
    </el-row>
    <el-row class="padding-row">
      <dl-col :span="12" :title="processCode=='FSS_CW_FK_40'?'下属公司:' : '申请单位:'" :novalue="!form.bizEntityJson.companyName">
          <el-input v-model="form.bizEntityJson.companyName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="12" title="申请人:" place="right" :novalue="!form.bizEntityJson.applyName">
          <el-input v-model="form.bizEntityJson.applyName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="24" title="招待地点:" :novalue="!form.bizEntityJson.entertainPlaceDesc">
          <el-input v-model="form.bizEntityJson.entertainPlaceDesc" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="本次支付金额(元):" place="right">
          <el-input v-model="form.bizEntityJson.payAmt" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="本次付款时间:" :novalue="!form.bizEntityJson.payDate">
        <el-date-picker v-model="form.bizEntityJson.payDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" title="招待费立项网批单号:" :novalue="!form.bizEntityJson.preResDisplayNo">
          <el-select
            v-if="!form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.preResDisplayNo"
            filterable
            remote
            clearable
            @change="preResDisplayNoChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in preResDisplayNoOptions"
              :key="item.resDisplayNo"
              :label="item.resDisplayNo"
              :value="item.resDisplayNo">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span>{{ item.resDisplayNo }}</span>
                </el-col>
                <el-col :span="17">
                  <span>{{ item.billName }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
          <p v-else class="openUrl-p" @click="openUrlGlobal(form.bizEntityJson.preResDisplayNo, form.bizEntityJson.preResId)">{{ form.bizEntityJson.preResDisplayNo }}</p>
        </dl-col>
        <dl-col :span="12" title="表单名称:" :novalue="!form.bizEntityJson.preBillName">
          <el-input v-model="form.bizEntityJson.preBillName" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col v-if="processCode=='SYGS_ZDFYBX' || processCode=='SYJT_ZDFBX'" :span="24" title="收款人:" :novalue="!form.bizEntityJson.collection">
          <el-input v-model="form.bizEntityJson.collection" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col v-if="processCode=='SYGS_ZDFYBX' || processCode=='SYJT_ZDFBX'" :span="24" title="开户行:" :novalue="!form.bizEntityJson.deposit">
          <el-input v-model="form.bizEntityJson.deposit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col v-if="processCode=='SYGS_ZDFYBX' || processCode=='SYJT_ZDFBX'" :span="24" title="账户:" :novalue="!form.bizEntityJson.account">
          <el-input v-model="form.bizEntityJson.account" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="付款原由:" place="right" :novalue="!form.bizEntityJson.payReasonDesc">
          <el-input v-model="form.bizEntityJson.payReasonDesc" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col v-if="processCode!='SYGS_ZDFYBX'&&processCode!='SYJT_ZDFBX'" :span="24" :novalue="form.bizEntityJson.syGroup != 'true' && form.bizEntityJson.areaOperationCenter != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'月度预算内',name:'inFlag'},
                        {label:'月度预算外',name:'outFlag'}
                      ]"
          />
        </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.companyCd" @close="closeSearhOrg" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      showSearchOrg: false,
      showSearchUser: false,
      preResDisplayNoOptions: [],
      processCode: null
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val
			}
		}
  },
  /* end */
  created() {
      this.processCode = this.$store.state.menuTreeItem.processCode;
  },
  methods: {
      remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.bizQuickSearchPreBill({resDisplayNo: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.preResDisplayNoOptions = res.data
              this.preResDisplayNoOptions.unshift({
                resDisplayNo: '网批查询号',
                billName: '表单名称'
              })
            } else {
              this.preResDisplayNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.preResDisplayNoOptions = []
      }
    },
    preResIdChange(val) {
      if (!val) return
      let obj = this.preResDisplayNoOptions.find(item => item.resDisplayNo == val)
      this.form.bizEntityJson.preBillName = obj ? obj.billName : ''
      this.form.bizEntityJson.preResId = obj ? obj.resApproveInfoId : ''
    },
    
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.companyName = val.text
        this.form.bizEntityJson.companyCd = val.id
      }
      this.showSearchOrg = false
    },
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.applyName = val.userName
        this.form.bizEntityJson.applyCd = val.userCd
      }
      this.showSearchUser = false
    },
  }
}
</script>
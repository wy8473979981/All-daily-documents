<!-- 审批单选择银行组件 -->
<template>
  <div class="selectBank-box">
    <el-dialog
      title=""
      :visible.sync="fast"
      width="800px"
      v-dialogDrag
      >
      <el-row :gutter="24" class="top-row">
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span>选择银行类型</span>
            <el-select class="required" v-model="info.bankType" filterable placeholder="请选择">
              <el-option
                v-for="(item, index) in bankTypeOptions"
                :key="index"
                :label="item.typeName"
                :value="item.bankPrefix">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-if="info.bankType !== null" :span="12">
          <div class="d-min">
            <span>选择省</span>
            <el-select class="required" v-model="info.province" filterable @change="provinceChange" placeholder="请选择">
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.provInputName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-if="info.bankType !== null" :span="12" class="right-col">
          <div class="d-min">
            <span>选择城市</span>
            <el-select class="required" v-model="info.city" filterable placeholder="请选择">
              <el-option
                v-for="item in cityOptions"
                :key="item.bankInputCity"
                :label="item.name"
                :value="item.bankInputCity">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span>选择输入支行名称</span>
            <el-select
              class="required"
              v-model="info.bankName"
              filterable
              remote
              clearable
              @change="bankNameChange"
              :remote-method="remoteMethod"
              :loading="loading"
              placeholder="请输入">
              <el-option
                v-for="item in bankNameOptions"
                :key="item.sysBankCode"
                :label="item.bankName"
                :value="item.bankName">
                <el-row :gutter="24">
                  <el-col :span="16">
                    <p>{{ item.bankName ? item.bankName : '　' }}</p>
                  </el-col>
                  <el-col :span="8">
                    <p>{{ item.sysBankCode ? item.sysBankCode : '　' }}</p>
                  </el-col>
                </el-row>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="explain-p">
            <p>注意事项：</p>
            <p>1. 请按照顺序先选择银行类型，省份，和城市，若银行中没有您所要的银行请选择其它银行</p>
            <p>2. 输入支行的框体中，只需要输入支行名称即可。</p>
            <p>3. 若您是用其它银行进行搜索，请输入银行的全称，或者只输入支行名称进行搜索</p>
            <p>4. 若以上几种方式都未找到您所要的银行,请联系信息部:陈贝</p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
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
  name: 'selectBank',
  props: ['open'],
  data() {
    return {
      loading: false,
      info: {
        bankType: '', //银行类型
        province: '', //省
        city: '', //市
        bankName: '', //支行名称
        bankCode: ''
      },
      bankTypeOptions: [], //银行类型
      provinceOptions: [], //省
      cityOptions: [], //市
      bankNameOptions: [], //支行名称
    }
  },
  created() {
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        if (this.open) {
          this.getList()
        }
        return this.open
      },
      set(val) {
        this.$emit('close')
      }
    }
  },
  watch: {
    'info.province'(val) {
      if (!val) {
        this.info.city = ''
        this.cityOptions = []
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    getList() {
      Approval.queryBankTypeAndSysRegion().then(res => {
        if(res.code == 1){
          this.bankTypeOptions = res.data.queryBankType
          this.bankTypeOptions.push({typeName: '其他银行', bankPrefix: null})
          this.provinceOptions = res.data.querySysRegion
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择省获取市
    provinceChange(val) {
      this.provinceOptions.forEach((item, index) => {
        if (item.id == val) {
          this.cityOptions = this.provinceOptions[index].childNode
        }
      })
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true
        const params = {
          bankName: query,
          bankPrefix: this.info.bankType,
          bankInputCity: this.info.city
        }
        Approval.findBranchBank(params).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.bankNameOptions = res.data
            } else {
              this.bankNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.bankNameOptions = []
      }
    },
    bankNameChange(val) {
      let obj = this.bankNameOptions.find(item => item.bankName == val)
      this.info.bankCode = obj ? obj.sysBankCode : ''
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
      this.$message.closeAll()
      if (this.info.bankType === '') return this.$message.error('请选择银行类型')
      if (this.info.bankType !== null) {
        if (!this.info.province) return this.$message.error('请选择省')
        if (!this.info.city) return this.$message.error('请选择城市')
      }
      if (!this.info.bankName) return this.$message.error('选择输入支行名称')
      this.$emit('close', this.info)
    },
    cancel() {
      this.resetData()
      this.fast = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

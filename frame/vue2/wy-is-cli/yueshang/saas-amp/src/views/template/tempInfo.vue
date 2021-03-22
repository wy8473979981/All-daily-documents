<template>
  <!-- <div>魔板信息</div> -->
    <ys-dialog
      :visible='visible' target='tempInfo'
      @confirm='confirmTempInfo'
      @toggle='toggle'
      :showConfirm='!isUpdate'
    >
    <el-form label-width="100px">
          <el-form-item label="机构名称" :required="true">
            <el-select
              @change="changeCompany"
              size="mini"
              v-model="form.company_id"
              placeholder="请选择机构"
              :disabled="isUpdate"
            >
              <!--  -->

              <el-option
                v-for="item in companyList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板分类" :required="true">
            <el-select
              @change="changeMouldCate"
              v-model="form.contract_mould_cate_id"
              placeholder="请选择模板分类"
              size="mini"
              :disabled="isUpdate"
            >
              <el-option
                v-for="item in tempCateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构合同" :required="true">
            <el-select
              v-model="form.company_contract_id"
              placeholder="请选择机构合同"
              size="mini"
              :disabled="isUpdate"
            >
              <el-option
                v-for="item in companyContractList"
                :key="item.company_contract_id"
                :label="item.company_contract_name"
                :value="item.company_contract_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板描述">
            <el-input
              type="textarea"
              placeholder="请输入模板描述信息"
              v-model="form.contract_mould_descr"
              size="mini"
              :disabled="isUpdate"
            >
            </el-input>
          </el-form-item>
      </el-form>
    </ys-dialog>
  <!-- <el-collapse class='temp-info'>
    <el-collapse-item title="模板信息">

    </el-collapse-item>
  </el-collapse> -->
</template>

<script>
import company from '@apis/company'
import companyContract from '@apis/companyContract'
import contTempCate from '@apis/contTempCate'

export default {
  props: {
    visible: {
      type: Boolean
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      form: {
        company_id: '',
        contract_mould_cate_id: '',
        contract_mould_descr: '',
        company_contract_id: ''
      },
      activeNames: ['1'],
      loading: {
        company: false
      },
      versionList: [],
      tempCateList: [
      ],
      companyList: [],
      companyContractList: []
    }
  },
  methods: {
    confirmTempInfo () {
      this.$emit('getData', this.form)
    },
    toggle () {
      this.$emit("toggle", { name:'tempInfo', visible: false })
    },
    changeCompanyContract () {
      this.$emit('getTempInfo', this.form)
    },
    changeMouldCate (data) {
      if (!this.form.company_id) {
        this.$message.error('请先选机构')
        return
      }
      this.getCompanyContractList()
    },
    async getCompanyList () {
      const res = await company.findOpened()
      const {code, result} = res
      if (code === 200) {
        this.companyList = result.map(item => ({ value: item.company_id, label: item.company_short_name }))
      }
    },
    async getCateList () {
      const res = await contTempCate.findOpened()
      const {code, result} = res
      if (code === 200) {
        this.tempCateList = result.map(item => ({ value: item.contract_mould_cate_id, label: item.contract_mould_cate_name }))
      }
    },
    changeCompany () {
      if (!this.form.contract_mould_cate_id) return
      this.getCompanyContractList()
    },
    async getCompanyContractList () {
      const params = {
        'company_id': this.form.company_id,
        'contract_mould_cate_id': this.form.contract_mould_cate_id
      }
      this.form.company_contract_id = ''
      const res = await companyContract.findByCompanyAndContCate(params)
      const {code, result} = res
      if (code === 200) {
        this.companyContractList = result.map(item => {
          return {
            company_contract_id: item.company_contract_id,
            company_contract_name: item.company_contract_name
          }
        })
      }
    },
    loadData (data) {
      this.form = data
    }
  },
  mounted () {
    this.getCompanyList()
    this.getCateList()
  }
}
</script>

<style lang='scss' scoped>
.el-select{
  width: 100%;
}
</style>

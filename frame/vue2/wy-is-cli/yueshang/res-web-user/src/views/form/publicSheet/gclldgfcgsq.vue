<template>
  <!-- 工程类垄断供方采购申请 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>招标计划编号</span>
          <!-- <el-autocomplete
            popper-class="autocomplete-header"
            :class="{'novalue': !form.bizEntityJson.ccbpNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.ccbpNo"
            :fetch-suggestions="querySearch"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="handleBlur"
            :disabled="form.bizEntityJson.disabled">
            <template slot-scope="{ item }">
              <el-row :gutter="24">
                <el-col :span="5">
                  <span>{{ item.ccbpProjectName }}</span>
                </el-col>
                <el-col :span="5">
                  <span>{{ item.ccbpDataTypeName }} {{ item.ccbpNo }}</span>
                </el-col>
                <el-col :span="14">
                  <span>{{ item.ccbpPlanContentDesc }}</span>
                </el-col>
              </el-row>
            </template>
          </el-autocomplete> -->
          <el-select
            popper-class="select-header"
            :class="{'novalue': !form.bizEntityJson.ccbpNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.ccbpNo"
            filterable
            remote
            clearable
            @change="ccbpNoChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in ccbpNoOptions"
              :key="item.ccbpNo"
              :label="item.ccbpNo"
              :value="item.ccbpNo">
              <el-row :gutter="24">
                <el-col :span="5">
                  <span>{{ item.ccbpProjectName }}</span>
                </el-col>
                <el-col :span="5">
                  <span>{{ item.ccbpDataTypeName }} {{ item.ccbpNo }}</span>
                </el-col>
                <el-col :span="14">
                  <span>{{ item.ccbpPlanContentDesc }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>区域</span>
          <el-select :class="{'novalue': !form.bizEntityJson.areaType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.areaType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="宝龙置地" value="1"></el-option>
            <el-option label="事业二部" value="2"></el-option>
            <el-option label="事业一部" value="3"></el-option>
            <el-option label="安徽事业部" value="4"></el-option>
            <el-option label="浙江事业部" value="5"></el-option>
            <el-option label="广东事业部" value="6"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>
            项目
            <el-tooltip class="item" effect="dark" content="通过'招标计划编号'自动带出" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <el-input :class="{'novalue': !form.bizEntityJson.projectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>工程名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.engineeringName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.engineeringName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>乙方</span>
          <el-input :class="{'novalue': !form.bizEntityJson.partB, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.partB" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>工程含税金额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.engineeringTaxMoney, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.engineeringTaxMoney" @input="engineeringTaxMoneyInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>税率</span>
          <el-select :class="{'novalue': !form.bizEntityJson.taxRate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.taxRate" @change="taxRateChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="0%" value="0"></el-option>
            <el-option label="1%" value="0.01"></el-option>
            <el-option label="3%" value="0.03"></el-option>
            <el-option label="5%" value="0.05"></el-option>
            <el-option label="6%" value="0.06"></el-option>
            <el-option label="9%" value="0.09"></el-option>
            <el-option label="10%" value="0.1"></el-option>
            <el-option label="11%" value="0.11"></el-option>
            <el-option label="13%" value="0.13"></el-option>
            <el-option label="16%" value="0.16"></el-option>
            <el-option label="17%" value="0.17"></el-option>
            <el-option label="20%" value="0.2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>工程不含税金额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.engineeringNoTaxMoney, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.engineeringNoTaxMoney" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>税金</span>
          <el-input :class="{'novalue': !form.bizEntityJson.tax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.tax" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">垄断原因</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.monopolyReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.monopolyReason" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <span class="span-auto">附件</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
            :before-remove="beforeRemoveGlobal"
            :before-upload="beforeUploadGlobal"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">添加附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: {},
      isNoValue: false,
      loading: false,
      ccbpNoOptions: [],
      uploadUrl,
      fileList: fileList || [],
      userInfo: {}
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
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'projectName', null)
      this.$set(this.form.bizEntityJson, 'engineeringTaxMoney', null)
      this.$set(this.form.bizEntityJson, 'taxRate', null)
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        Approval.getFinCompanyList(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              // this.ccbpNoOptions = res.data.filter(item => {
              //   return item.ccbpNo.toLowerCase()
              //     .indexOf(query.toLowerCase()) > -1
              // })
              this.ccbpNoOptions = res.data
            } else {
              this.ccbpNoOptions = []
            }
          }
        })
      } else {
        this.ccbpNoOptions = []
      }
    },
    ccbpNoChange(val) {
      if (val) {
        Approval.isOnDataChainByEngineeNo(val).then(res => {
          if(res.code == 1) {
            if (!res.data) {
              this.form.bizEntityJson.ccbpNo = null
              this.$message.error('招采计划编号已被绑定，请选择其他招采计划编号')
            } else {
              let obj = this.ccbpNoOptions.find(item => item.ccbpNo == val)
              this.form.bizEntityJson.projectName = obj.ccbpProjectName
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    querySearch(queryString, cb) {
      var restaurants = [{value: '审批'}]
      if (queryString) {
        Approval.getFinCompanyList(queryString).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              restaurants = res.data
              restaurants.forEach(item=> {
                item.value = item.ccbpNo
              })
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
              // 调用 callback 返回建议列表的数据
              cb(results)
              this.isNoValue = false
            } else {
              cb([])
              this.isNoValue = true
            }
          }
        })
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        // return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) == 0)
        return restaurant.value
      }
    },
    handleSelect(item) {
      Approval.isOnDataChainByEngineeNo(item.ccbpNo).then(res => {
        if(res.code == 1) {
          if (!res.data) {
            this.form.bizEntityJson.ccbpNo = null
            this.$message.error('招采计划编号已被绑定，请选择其他招采计划编号')
          } else {
            this.form.bizEntityJson.projectName = item.ccbpProjectName
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleBlur() {
      if (this.isNoValue) {
        this.form.bizEntityJson.ccbpNo = ''
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
    },
    engineeringTaxMoneyInput(val) {
      this.form.bizEntityJson.tax = (val * this.form.bizEntityJson.taxRate).toFixed(2)
      this.form.bizEntityJson.engineeringNoTaxMoney = val - this.form.bizEntityJson.tax
    },
    taxRateChange(val) {
      if (this.form.bizEntityJson.engineeringTaxMoney) {
        this.form.bizEntityJson.tax = (val * this.form.bizEntityJson.engineeringTaxMoney).toFixed(2)
        this.form.bizEntityJson.engineeringNoTaxMoney = this.form.bizEntityJson.engineeringTaxMoney - this.form.bizEntityJson.tax
      }
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.ccbpNo) return this.$message.error('请选择招标计划编号'), false
      if(!this.form.bizEntityJson.areaType) return this.$message.error('请选择区域'), false
      if(!this.form.bizEntityJson.engineeringName) return this.$message.error('请输入工程名称'), false
      if(!this.form.bizEntityJson.partB) return this.$message.error('请输入乙方'), false
      if(!this.form.bizEntityJson.engineeringTaxMoney) return this.$message.error('请输入工程含税金额'), false
      if(!this.form.bizEntityJson.taxRate) return this.$message.error('请选择税率'), false
      if(!this.form.bizEntityJson.monopolyReason) return this.$message.error('请输入垄断原因'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>

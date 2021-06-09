<template>
  <!-- 服务维护 -->
  <div class="page-content">
    <div class="search-operate-content">
      <ysNSearch :searchList="searchConfig" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
      <div class="search-operate-new">
        <div class="search-operate-new-add">
          <ysNButton :className="'button-bg-main'" @click="addOpenFunc" :text="'新增'" />
        </div>
      </div>
    </div>

    <ysNTable class="table" :tableList="tableList" :column="column1" :tableHeight="this.$store.state.tableHeight" @csysFunc="csysFunc" @fwjkFunc="fwjkFunc" @editOpenFunc="editOpenFunc" @deleteOpenFunc="deleteOpenFunc" @switchChange="switchChange"></ysNTable>

    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <ysNDialog ref="dialogEdit" :title="dialogTitle" :width="'382px'" :buttonList="buttonEditList" @vindicateConfirmFunc="vindicateConfirmFunc('ruleForm')" @vindicateCancelFunc="vindicateCancelFunc('ruleForm')">
      <div slot="content" class="form formNew">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="82px" class="common-rules-form">
          <el-form-item label="服务类型：" prop="businessType">
            <el-radio-group v-model="ruleForm.businessType" :disabled="isEdit" @change="radioChangeFunc('ruleForm')">
              <el-radio :label="2">接收</el-radio>
              <el-radio :label="0">请求</el-radio>
              <el-radio :label="1">回调</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="应用名称：" prop="appId" class="required">
            <ysNAutoSelect v-model="ruleForm.appId" :size="'small'" :serveApi="$axios.commonServe.midAppIndistinct" :placeholder="'可搜索应用名称'" />
          </el-form-item>
          <el-form-item label="服务名称：" prop="businessName" class="required">
            <!-- <ysNAutocomplete v-model="ruleForm.businessName" :size="'small'" :serveApi="$axios.commonServe.midBusinessIndistinct" :placeholder="'可搜索服务名称'" :params="ruleForm" :type="'businessName'" /> -->
            <el-input v-model="ruleForm.businessName" placeholder="请填写" size="small"></el-input>
          </el-form-item>
          <el-form-item label="请求通道：" prop="reqType" class="required">
            <el-select v-model="ruleForm.reqType" placeholder="请选择" size="small">
              <el-option v-for="item in requestAisleList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求方式：" prop="reqMethod" class="required">
            <el-select v-model="ruleForm.reqMethod" placeholder="请选择" size="small">
              <el-option v-for="item in requestTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <template v-if="ruleForm.businessType!=2">
            <el-form-item label="是否同步：" prop="syncFlag" class="required">
              <!-- <el-input v-model="ruleForm.syncFlag" v-filter-check-input3 placeholder="请填写" size="small"></el-input> -->
              <el-radio-group v-model="ruleForm.syncFlag">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="接口地址" prop="businessUrl" class="required">
              <el-input v-model="ruleForm.businessUrl" placeholder="请填写" size="small"></el-input>
            </el-form-item>
          </template>

          <template v-else>
            <!-- <el-form-item label="关联请求：" prop="key6">
              <el-radio-group v-model="ruleForm.key6" size="small">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="请求服务：" prop="reqBusinessId" class="required">
              <ysNAutoSelect v-model="ruleForm.reqBusinessId" :size="'small'" :serveApi="$axios.appManageServe.fwwfNameByBusiness" :placeholder="'可搜索请求地址'" :params="{businessType:'0'}" :type="'reqBusinessId'" />
            </el-form-item>
            <!-- <el-form-item label="关联回调：" prop="key8" class="required">
              <el-radio-group v-model="ruleForm.key8" size="small">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="回调服务：">
              <ysNAutoSelect v-model="ruleForm.callBackBusinessId" :size="'small'" :serveApi="$axios.appManageServe.fwwfNameByBusiness" :placeholder="'可搜索回调地址'" :params="{businessType:'1'}" :type="'callBackBusinessId'" />
            </el-form-item>
          </template>

          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </ysNDialog>

    <ysNDialog ref="dialogDelete" class="dialogDelete" title="" :width="'396px'" :buttonList="buttonDeleteList" @deleteConfirmFunc="deleteConfirmFunc" @deleteCancelFunc="deleteCancelFunc">
      <div slot="content" class="form formNew">
        <div class="delete-tip">
          <div>确定删除“{{selectedRow.appName}}”的“{{selectedRow.businessName}}”服务？</div>
          <div>删除将无法回复，请谨慎操作</div>
        </div>
      </div>
    </ysNDialog>

  </div>
</template>
<script>
import { handle_paginator, tableData } from '@/mixins';
import columnconfig from './config/column.js'
import searchConfig from './config/search.js'
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      searchParams: {
        appId: this.$route.query.appId ? this.$route.query.appId : null,
        businessId: null,
      },
      selectedRow: {
        appName: null,
        businessName: null,
      },
      dialogTitle: '',
      isEdit: false,
      radioSelect: 1,
      activeNameVindicate: 'first',
      activeNameView: 'first',
      column1: columnconfig.tablecolumn1,
      tableList: [],
      searchConfig: searchConfig,
      requestAisleList: [],// 请求通道：2、请求方式：3
      requestTypeList: [],// 请求通道：2、请求方式：3
      buttonViewList: [
        {
          name: '关闭',
          function: 'viewCancelFunc',
          className: 'button-bg-common'
        },
      ],
      buttonEditList: [
        {
          name: '取消',
          function: 'vindicateCancelFunc',
          className: 'button-bg-common'
        },
        {
          name: '确定',
          function: 'vindicateConfirmFunc',
          className: 'button-bg-main'
        },
      ],
      buttonDeleteList: [
        {
          name: '取消，暂不删除',
          function: 'deleteCancelFunc',
          className: 'button-bg-main'
        },
        {
          name: '确定，继续删除',
          function: 'deleteConfirmFunc',
          className: 'button-bg-common'
        },
      ],
      ruleForm: {
        businessType: 2,// 服务类型 0:请求，1:回调 2: 接收
        appId: null,// 应用名称
        businessName: null,// 服务名称
        reqType: null,// 请求通道
        reqMethod: null,// 请求方式
        reqBusinessId: null,// 请求服务 
        callBackBusinessId: null,// 回调服务
        businessUrl: null,// 接口地址
        syncFlag: null,// 重试次数
        remark: null,// 备注
      },
      rules: {
        appId: [
          { required: true, message: '请选择应用名称', trigger: ['blur', 'change'] }
        ],
        businessName: [
          { required: true, message: '请填写服务名称', trigger: ['blur', 'change'] }
        ],
        reqType: [
          { required: true, message: '请选择请求通道', trigger: ['blur', 'change'] }
        ],
        reqMethod: [
          { required: true, message: '请选择请求方式', trigger: ['blur', 'change'] }
        ],
        reqBusinessId: [
          { required: true, message: '请选择请求服务', trigger: ['blur', 'change'] }
        ],
        callBackBusinessId: [
          { required: true, message: '请选择回调服务', trigger: ['blur', 'change'] }
        ],
        syncFlag: [
          { required: true, message: '请选择是否同步', trigger: ['blur', 'change'] }
        ],
        businessUrl: [
          { required: true, message: '请输入正确格式，如https://element.eleme.cn', trigger: ['blur', 'change'] }
        ],
      },

    }
  },
  watch: {
    // 'ruleForm': {
    //   handler: function (newValue, oldValue) {
    //     console.log(this.ruleForm, 'ruleForm')
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },

  mounted () {
    this.getList(this.searchParams)
    this.getDict(2)// 请求通道：2、请求方式：3
    this.getDict(3)// 请求通道：2、请求方式：3

  },
  methods: {
    handleFormChange (key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async getList (data) {
      try {
        this.searchParams = data
        let params = { ...this.pageInfo, searchParams: this.searchParams }
        await this.$axios.appManageServe.fwwfList(params).then(res => {
          if (res.code == 200) {
            let { data } = res
            this.pageInfo = { ...this.pageInfo, sum_num: data.total }


            let serverArray = (arr) => {
              let newArr = [];
              for (let index = 0; index < arr.length; index++) {
                let item = arr[index]
				//item.syncFlagName = arr[index].syncFlag ? '同步':'异步'
				this.$set(item,'syncFlagName',arr[index].syncFlag ? '同步':'异步')
                let obj = {
                  ...item,
                  xuhao: item.children ? index + 1 : '',
                  reqType: this.$Utils.getLabel(item.reqType, 'value', 'label', this.requestAisleList),// 请求通道
                  reqMethod: this.$Utils.getLabel(item.reqMethod, 'value', 'label', this.requestTypeList),// 请求方式
                  businessType: item.businessType == 0 ? '请求' : item.businessType == 1 ? '回调' : '接收',// 服务类型（0:请求，1:回调）
                  // createdDate: this.$Utils.rTime(item.createdDate),
                  // updateDate: this.$Utils.rTime(item.updateDate),
                  status: item.status
                }
                newArr.push(obj)
                if (arr[index].children) {
                  newArr[index].children = serverArray(arr[index].children)
                }
              }
              return newArr
            }

            this.tableList = serverArray(data.result);
            setTimeout(() => {
              this.$Utils.getDynamicTableHeight(this)
            }, 0)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async switchChange (item) {
      try {
        if (!item.id) return
        let params = {
          id: item.id,
          status: item.status
        }
        await this.$axios.appManageServe.fwwfOperate(params).then(res => {
          if (res.code == 200) {
            this.getList(this.searchParams)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getDict (configType) {
      try {
        let params = { configType: configType }
        await this.$axios.commonServe.getDict(params).then(res => {
          if (res.code == 200) {

            let result = res.data.map(item => {
              return { value: item.configKey, label: item.configValue }
            })

            if (configType == 2) {
              this.requestAisleList = result// 请求通道：2、请求方式：3

            } else if (configType == 3) {
              this.requestTypeList = result// 请求通道：2、请求方式：3

            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    vindicateFunc (row) {
      // 开启 维护 弹窗
      this.$refs.dialogEdit.centerDialogVisible = true
    },
    vindicateTabDialogFunc (tab, event) {
      // 维护弹窗 tab切换
    },
    vindicateCancelFunc (formName) {
      // 维护弹窗 关闭
      this.resetForm(formName)
      this.$refs.dialogEdit.centerDialogVisible = false
    },
    async vindicateConfirmFunc (formName) {
      // 维护弹窗 确认
      this.$refs[formName].validate(async (valid) => {
        console.log(this.ruleForm,'this.ruleForm')
        if (valid) {
          if (this.isEdit) {
            await this.$axios.appManageServe.fwwfEdit(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.resetForm(formName)
                this.getList(this.searchParams)
                this.$refs.dialogEdit.centerDialogVisible = false
              }
            })
          } else {
            await this.$axios.appManageServe.fwwfAdd(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.resetForm(formName)
                this.getList(this.searchParams)
                this.$refs.dialogEdit.centerDialogVisible = false
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    vindicateDeleteFunc (row) {
      // 维护弹窗 开启 删除 提示 弹窗

      this.$refs.dialogDelete.centerDialogVisible = true
    },
    csysFunc (row) {
      this.$router.push({ path: '/appManage/cswf', query: row })
    },
    fwjkFunc (row) {
      this.$router.push({ path: '/system/serverList', query: row })
    },
    addOpenFunc () {
      this.isEdit = false
      this.dialogTitle = '新增服务'
      this.$refs.dialogEdit.centerDialogVisible = true
    },
    async editOpenFunc (row) {
      try {
        let { id, appId, appName, businessCode, businessName, businessUrl, callBackBusinessId, reqBusinessId, syncFlag, remark } = row


        let businessType = row.businessType == '请求' ? 0 : row.businessType == '回调' ? 1 : 2 // 服务类型（0:请求，1:回调）
        let reqType = this.$Utils.getLabel(row.reqType, 'label', 'value', this.requestAisleList)// 请求通道
        let reqMethod = this.$Utils.getLabel(row.reqMethod, 'label', 'value', this.requestTypeList)// 请求方式

        this.ruleForm = { id, appId, appName, businessCode, businessName, businessUrl, callBackBusinessId, reqBusinessId, syncFlag, remark, businessType, reqType, reqMethod, }
        this.isEdit = true
        this.dialogTitle = '修改服务'
        this.$refs.dialogEdit.centerDialogVisible = true
      } catch (e) {
        console.log(e)
      }
    },
    deleteCancelFunc () {
      // 维护弹窗 删除弹窗 取消
      this.$refs.dialogDelete.centerDialogVisible = false
    },
    async deleteConfirmFunc (row) {
      // 维护弹窗 删除弹窗 确定
      try {
        let params = { id: this.selectedRow.id }
        await this.$axios.appManageServe.fwwfDelete(params).then(res => {
          if (res.code == 200) {
            this.getList(this.searchParams)
            this.$refs.dialogDelete.centerDialogVisible = false
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    deleteOpenFunc (row) {
      // 删除弹窗 开启
      this.selectedRow = row
      this.$refs.dialogDelete.centerDialogVisible = true
    },
    viewTabDialogFunc (tab, event) {
      // 查看弹窗 tab切换
    },
    viewCancelFunc () {
      // 查看弹窗 关闭
      this.$refs.dialogView.centerDialogVisible = false
    },

    resetForm (formName) {
      this.ruleForm = {
        businessType: 2,// 服务类型 0:请求，1:回调 2: 接收
        appId: null,// 应用名称
        businessName: null,// 服务名称
        reqType: null,// 请求通道
        reqMethod: null,// 请求方式
        reqBusinessId: null,// 请求服务 
        callBackBusinessId: null,// 回调服务
        businessUrl: null,// 接口地址
        syncFlag: null,// 重试次数
        remark: null,// 备注
      }
      this.$refs[formName].resetFields();
    },
    radioChangeFunc (formName) {
      let ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
      this.resetForm(formName);
      this.ruleForm = ruleForm
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 0 30px;
  }
}

.operate {
  display: flex;
  justify-content: space-between;
  .operate-new {
    display: flex;
  }
  .operate-new-add {
    margin-left: 20px;
  }
}
::v-deep .dialogDelete {
  .el-dialog {
    margin-top: 40vh !important;
  }
  .delete-tip {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    line-height: 36px;
    text-align: center;
    margin-top: 19px;
    margin-bottom: 4px;
  }
}

.search-operate-content {
  display: flex;
  .search {
    flex: 1;
  }
  .search-operate-new {
    flex: 0 0 80px;
    .el-button {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #fff;
      height: 36px;
      padding: 0 26px;
      border: 1px solid #4876ef;
      border-radius: 0;
    }
  }
}

::v-deep .even-row {
  background-color: #fff !important;
  border: none !important;
  &:hover,
  & > td {
    background-color: #fff !important;
  }
}
::v-deep .odd-row {
  background-color: #fff !important;
  border: none !important;
  &:hover,
  & > td {
    background-color: #fff !important;
  }
}
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #fff !important;
}

::v-deep .el-table__row--level-0 {
  .oprate:first-child {
    display: none;
  }
}
::v-deep .el-table__row--level-1 {
  .oprate:nth-child(2) {
    display: none;
  }
}
::v-deep .el-table__row--level-1 {
  td:nth-child(9) {
    .switch-content {
      display: none;
    }
  }
}
</style>

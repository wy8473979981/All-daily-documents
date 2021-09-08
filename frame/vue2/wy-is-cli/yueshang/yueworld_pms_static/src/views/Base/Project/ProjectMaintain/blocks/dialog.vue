<template>
  <div>
    <ysn-dialog
      external
      :title="dialogType === 'add' ? '新增' : '编辑'"
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configDataTop" :column="4" />
          <ysn-formItem :form="form" :config="configData" :column="4" />
          <ysn-flod title="合同甲方信息" :show-flod="false" />
          <ysn-tabs
            v-model="tabsActive"
            :list="tabsList"
            dynamic
            @change="handleChange"
            @toggle="handleToggle"
          />
          <template v-for="(item, index) in tabsList">
            <el-form
              v-show="tabsActive === index"
              :ref="`ruleFormArray`"
              :key="index"
              :model="form.formContract[index]"
            >
              <ysn-formItem
                :key="tabsActive"
                class="mt-12"
                :form="form.formContract[index]"
                :config="formTableConfig"
                :column="4"
              />
            </el-form>
          </template>

          <ysn-flod title="银行账户信息" :show-flod="false" />
          <ysn-formTable
            ref="formTableData"
            v-model="formTableData"
            prop="tableData1"
            :column="formTableColumn"
            :rules="formTableRules"
            add
          />
        </el-form>
      </template>
      <template #btn>
        <ysn-btn @click="saveClick">{{
          dialogType === 'edit' ? '提交修改' : '保存'
        }}</ysn-btn>
        <ysn-btn
          v-if="dialogType === 'edit'"
          type="delete"
          class="ml-12 mr-12"
          @click="deleteSelect"
          >删除</ysn-btn
        >
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import { numberToChinese } from '@/utils/index'
import { baseProjectApi } from '@/api'
import {
  configDataTop,
  configData,
  configDataTextarea,
  configDataFile,
  formTableConfig,
  formTableColumn,
  tableForm,
} from './dialogConfig.js'
export default {
  name: 'BlDialog',
  props: {
    dialogType: {
      type: String,
      default: 'add', // add=新增，edit=编辑
    },
    dialogNum: {
      type: Number,
      default: 0,
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      visible: false,
      confirmVisiable: false,
      // form配置参数
      configDataTop: configDataTop.call(this),
      configData: configData.call(this),
      formTableConfig: formTableConfig.call(this),
      form: {
        formContract: [tableForm.call(this)],
        attachment: [],
        programPic: [],
      },
      formContract: [tableForm.call(this)], // 甲方合同
      formTableColumn: formTableColumn.call(this), // 银行账户信息
      contractIndex: 0,
      tabsList: [
        {
          label: '甲方合同一',
        },
      ],
      tabsActive: 0,
      formTableData: {
        tableData1: [],
      },
      formTableRules: {
        firstpartyAccountName: [{ required: true, message: '' }],
        firstpartyBankName: [{ required: true, message: '' }],
        firstpartyBankAccount: [
          { required: true, message: '' },
          { pattern: /^[0-9]*$/ },
        ],
      },
    }
  },
  watch: {
    dialogNum() {
      // 附件
      if (!Array.isArray(this.formData.attachment)) {
        this.formData.attachment = []
      }
      // 项目简图
      if (!Array.isArray(this.formData.programPic)) {
        this.formData.programPic = []
      }

      if (this.dialogType === 'edit') {
        this.form = this.formData
        this.formTableData.tableData1 = this.formData.bank
        this.tabsList = []
        this.formData.formContract.forEach((el, index) => {
          this.tabsList.push({
            label: `合同甲方${numberToChinese(index + 1)}`,
          })
        })
      } else {
        // 新增
        this.form = {
          formContract: this.formContract,
          attachment: [],
          programPic: [],
        }
      }
      this.visible = true
    },
  },
  methods: {
    /**
     * @method:handleVisibleClose
     * @desc:dialog 关闭方法
     */
    handleVisibleClose() {
      // 初始化数据
      this.formTableData.tableData1 = []
      this.tabsList = [
        {
          label: '甲方合同一',
        },
      ]
      this.tabsActive = 0
      this.visible = false
    },

    /**
     * @method:saveClick
     * @desc:保存事件
     */
    saveClick() {
      this.$refs['ruleForm'].validate((valid) => {
        this.ruleFormCheck(valid)
      })
      // table 校验
      this.$refs.formTableData.$refs.ysnForm.validate()
    },
    /**
     * @desc:规则轮询处理
     */

    ruleFormCheck(resultStatus) {
      let status = true
      this.tabsList.forEach((el, index) => {
        this.$refs['ruleFormArray'][index].validate((valid) => {
          if (!valid || !resultStatus) {
            status = false
          }
          this.$refs.formTableData.$refs.ysnForm.validate((valid) => {
            if (!valid) {
              status = false
            }
          })
          // 表示是最后一个
          if (index === this.tabsList.length - 1) {
            if (!status) {
              return
            }
            // 校验合同字段
            baseProjectApi
              .projectMaintenanceContractVeridical({
                contractArray: this.form.formContract,
              })
              .then((res) => {
                // 成功后新增和修改,1新增2编辑
                baseProjectApi
                  .projectMaintenanceHandler({
                    type: this.dialogType === 'edit' ? 2 : 1,
                    form: this.form,
                  })
                  .then((res) => {
                    this.$message.success(
                      this.dialogType === 'edit' ? '修改成功' : '保存成功'
                    )
                    this.handleVisibleClose()
                    this.$emit('handlerUpdateList') // 更新列表
                  })
              })
          }
        })
      })
    },
    /**
     * @method:delectClick
     * @desc:删除事件
     */
    deleteSelect() {
      // 检测是否有判断是否存在关联楼栋
      baseProjectApi
        .projectMaintenanceDel({ projectId: this.form.programId })
        .then((res) => {
          this.$message.error('存在关联楼栋，不可删除')
        })
      // this.handleVisibleClose()
      // // 2秒提示语
      // this.$message.success('删除成功')
      // this.$emit('handlerUpdateList') //更新列表
    },

    /**
     * @method:handleChange
     * @desc:合同甲方信息的tabs切换
     */
    handleChange(val) {
      console.log(this.tabsActive, 'tabsActive')
    },

    /**
     * @method:handleToggle
     * @desc: 合同甲方信息的加减按钮
     */
    handleToggle(val, index) {
      if (val === 'plus') {
        // let formTableConfig = JSON.parse(JSON.stringify(formTableConfig))
        // 表示新增
        this.tabsActive = this.tabsList.length
        this.tabsList.push({
          label: `合同甲方${numberToChinese(this.tabsList.length + 1)}`,
        })
        this.form.formContract.push(tableForm.call(this))
        // this.formTableConfig.push(formTableConfig.call(this))
      } else {
        // 删除
        this.form.formContract.splice(index, 1)
        this.tabsList.splice(index, 1)
        // this.formTableConfig.splice(index, 1)
        this.tabsActive && this.tabsActive--
      }
    },
  },
}
</script>

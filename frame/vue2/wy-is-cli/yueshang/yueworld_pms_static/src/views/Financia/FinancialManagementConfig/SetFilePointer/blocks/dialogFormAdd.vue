<!--
 * @Author: xza
 * @Date: 2021-08-02 10:47:36
 * @LastEditTime: 2021-08-06 16:59:08
 * @LastEditors: xza
 * @Description: 新增/编辑弹窗
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/SetFilePointer/blocks/dialogFormAdd.vue
-->
<template>
  <div>
    <ysn-dialog
      :title="!isEdit ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'476px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="getNewArr"
            :column="2"
            :form="formData"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">保存</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="`确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn v-if="isEdit" type="delete" class="pr-16 ml-8">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { setFilePointerApi } from '@/api'
import { configData, rulesForm, formData } from './config'
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 表单数据
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      outClose: true,
      configData: configData.call(this), // 表格配置
      rulesForm: rulesForm.call(this), // 表格校验
      formData: formData.call(this) // 表单数据
    }
  },
  computed: {
    /**
     * @description: 判断 新增/编辑 是否显示创建时间
     * @param {*}
     * @return {*}
     */
    getNewArr() {
      if (!this.isEdit) {
        const newArr = this.configData.filter(i => {
          return i.prop !== 'creatDate'
        })
        return newArr
      } else {
        return this.configData
      }
    }
  },
  watch: {
    /**
     * @description: 监听点击列表页每行后传递的数据
     * @param {*}
     * @return {*}
     */
    info: {
      handler(newData, oldData) {
        if (newData.accountName) {
          // 深拷贝 避免污染列表页
          const obj = JSON.stringify(newData)
          this.formData = JSON.parse(obj)
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */
    closeDialog() {
      this.formData = {
        accountId: '', // 账套编码
        thirdPartyId: '', // 三方编码
        accountName: '', // 账套名称
        accountNameShort: '', // 简称
        address: '', // 地址
        taxpayerName: '', // 纳税人名称
        UnifiedSocialCreditCode: '', // 统一社会信用代码
        effectiveDate: '', // 启用年月
        status: '', // 状态
        creatDate: '' // 创建时间
      }
      this.$emit('closeDialog')
    },
    /**
     * @description: 新增保存/编辑提交
     * @param {*}
     * @return {*}
     */
    preservation() {
      if (!this.isEdit) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            setFilePointerApi.setFilePointerCreate(this.formData).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('successTableList')
            })
          } else {
            setTimeout(() => {
              var isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 100)
          }
        })
        return
      }
      // 提交编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          setFilePointerApi.setFilePointerEdit(this.formData).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('successTableList')
          })
        } else {
          this.handleValidateErr()
        }
      })
    },
    /**
     * @description: 错误处理
     * @param {*}
     * @return {*}
     */
    handleValidateErr() {
      this.$message({
        message: '编辑失败',
        type: 'error'
      })
    },
    /**
     * @description: 删除当前列
     * @param {*}
     * @return {*}
     */
    remove() {
      setFilePointerApi.setFilePointerDelete(this.formData).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('remove')
      })
    }
  }
}
</script>

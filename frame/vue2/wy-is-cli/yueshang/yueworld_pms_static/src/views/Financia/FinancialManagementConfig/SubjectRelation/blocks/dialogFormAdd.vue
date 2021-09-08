<!--
 * @Author: xza
 * @Date: 2021-08-02 10:47:36
 * @LastEditTime: 2021-08-06 13:22:44
 * @LastEditors: xza
 * @Description: 费用项-科目关系新增/编辑弹窗
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/SubjectRelation/blocks/dialogFormAdd.vue
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
            <ysn-btn v-if="isEdit" type="delete" class="ml-8 pr-16">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { feeApi } from '@/api'
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
      configData: configData.call(this), // 表单配置
      rulesForm: rulesForm.call(this), // 校验配置
      formData: formData.call(this)
    }
  },
  computed: {
    /**
     * @description: 控制 创建时间 字段显示/隐藏
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
      // 关闭弹窗重置 formData
      this.formData = {
        accountName: '', // 账套
        feeName: '', // 费项
        subjectInfo: '', // 科目
        remark: '' // 备注
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
            feeApi.SubjectRelationCreate(this.formData).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('successTableList')
            })
          } else {
            this.handleValidateErr
          }
        })
        return
      }
      // 提交编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          feeApi.SubjectRelationEdit(this.formData).then(() => {
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
      console.log('err')
    },
    /**
     * @description: 删除当前列
     * @param {*}
     * @return {*}
     */
    remove() {
      feeApi.SubjectRelationDelete(this.formData).then(() => {
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

<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 会计科目新增/编辑弹窗
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
import { accountingSubjectApi } from '@/api'
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
      rulesForm: rulesForm.call(this), // 表格验证
      formData: formData.call(this)
    }
  },
  computed: {
    getNewArr() {
      // 计算编辑/新增 不同的表格
      if (!this.isEdit) {
        const newArr = this.configData.filter(i => {
          return i.prop !== 'creatDate'
        })
        return newArr
      } else {
        if (this.formData.children === undefined) {
          this.configData.map(i => {
            if (i.prop === 'upperSubjectName') {
              // eslint-disable-next-line no-return-assign
              return i.list = this.$PUBFN.getOptionsList('')
            }
          })
        }
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
      // 关闭弹窗时重置 formData
      this.formData = {
        accountName: '', // 账套
        subjectId: '', // 科目编码
        thirdPartyId: '',
        upperSubjectName: '',
        subjectName: '',
        subjectType: '',
        direction: '',
        status: '',
        creatDate: ''
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
            accountingSubjectApi.accountingCreate(this.formData).then(() => {
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
          accountingSubjectApi.accountingEdit(this.formData).then(() => {
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
     * @description: 删除
     * @param {*}
     * @return {*}
     */
    remove() {
      accountingSubjectApi.accountingDelete(this.formData).then(() => {
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

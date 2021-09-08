<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 辅助核算
-->
<template>
  <div>
    <ysn-dialog
      :title="!formData.thirdPartyId ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'620px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="configData"
            :column="2"
            :form="formDataObj"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">保存</ysn-btn>
          <ysn-btn v-if="!formData.thirdPartyId? false:true" type="delete" class="color-red pr-16" @click="remove">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
    <ysn-dialog
      :title="'是否确定执行本次删除操作'"
      :width="'620px'"
      :is-show-dialog="isOk"
      @ok="deleteData"
      @cancel="noDelete"
    >
      ss
    </ysn-dialog>
  </div>
</template>

<script>
import { demoStarApi } from '@/api/demoStar'
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    } // 表单数据
  },
  data() {
    return {
      isOk: false,
      outClose: true,
      configData: [
        {
          itemType: 'input',
          prop: 'assistingId',
          label: '辅助核算编码',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'thirdPartyId',
          label: '三方编码',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'assistingType',
          label: '分类',
          placeholder: '辅助核算',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'assistingName',
          label: '辅助核算名称',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        },
        {
          itemType: 'select',
          prop: 'assistingMold',
          label: '核算类型',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('globalSearchList')
        }
      ],
      rulesForm: {
        // 表单验证
        thirdPartyId: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        assistingName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        assistingMold: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    formDataObj() {
      return this.formData
    }
  },
  methods: {
    // close
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 保存
    preservation() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          demoStarApi.demoStarCreate(this.formDataObj).then(() => {
            this.outClose = !this.outClose
            this.$emit('successTableList')
          })
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    // 删除
    remove() {
      this.isOk = true
    },
    // 确认删除操作
    deleteData() {
      this.isOk = false
      demoStarApi.demoStarDelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('remove')
      })
    },
    // 取消删除
    noDelete() {
      this.isOk = false
    }
  }
}
</script>

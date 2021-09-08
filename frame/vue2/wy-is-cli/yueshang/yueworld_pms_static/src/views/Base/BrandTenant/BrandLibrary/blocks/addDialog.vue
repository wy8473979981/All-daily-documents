<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌库-新增和编辑
-->
<template>
  <div>
    <ysn-dialog
      :title="dialogType === 'add' ? '新增' : '编辑'"
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @cancel="cancel"
    >
      <ysn-btn class="mr-8">编辑</ysn-btn>
      <template #contain>
        <div>
          <el-form ref="rules" :model="data" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="data"
              :config="configDataEdit"
              :column="4"
              clearable
            />
            <ysn-flod title="联系人信息" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="brandContacts"
                :column="formTableColumnEdit"
                add
              />
            </ysn-flod>
            <ysn-flod v-if="dialogType != 'add'" title="合作商家" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="business"
                :column="businessColumn"
              />
            </ysn-flod>
            <ysn-flod v-if="dialogType != 'add'" title="合作项目" :show-flod="false">
              <template #action>
                <el-checkbox>未解约合同</el-checkbox>
              </template>
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="project"
                :column="projectColumn"
              />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <!-- 新增操作按钮 -->
        <div v-if="dialogType === 'add'" class="flex-ju-end mt-40">
          <ysn-btn class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" @click="handlerAudit(3)">保存</ysn-btn>
        </div>
        <!-- 编辑操作按钮-->
        <div v-if="dialogType === 'edit'" class="flex-ju-end mt-40">
          <ysn-btn class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" class="mr-8" @click="handlerAudit(3)">保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { brandLibraryApi } from '@/api'
import { configDataEdit, formTableColumnEdit, businessColumn, projectColumn } from './dialpgCongif'
export default {
  name: 'Dialog',
  props: {
    isShowDialog: { type: Boolean, default: false },
    dialogType: {
      type: String,
      default: 'edit' // add=新增，edit=编辑
    },
    formData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      rules: {
        brandName: [{ required: true, message: '请输入品牌名', trigger: 'blur' }],
        brandFormatName: [{ required: true, message: '请选择业态', trigger: 'blur' }],
        brandStoreType: [{ required: true, message: '请选择连锁/单店', trigger: 'blur' }],
        brandShopMode: [{ required: true, message: '请选择开店方式', trigger: 'blur' }],
        brandType: [{ required: true, message: '请选择品牌类型', trigger: 'blur' }]
      },
      // 业务联系人信息
      formTableColumnEdit: formTableColumnEdit.call(this),
      // 合作商家信息
      businessColumn: businessColumn.call(this),
      // 合作项目信息
      projectColumn: projectColumn.call(this),
      configDataEdit: configDataEdit.call(this),
      projectConfigData: [
        { itemType: 'select', prop: 'action', label: '', hasSlot: true }
      ]
    }
  },
  computed: {
    data() {
      return this.formData
    }
  },
  methods: {
    // 右上角关闭
    cancel() {
      this.$emit('cloneDialog')
    },
    // 保存
    handleVisible() {
      this.$emit('closeDialog')
    },
    editInfo() { // 更改为编辑
      this.$props.dialogType = 'edit'
    },
    validateFrom(formRef) {
      return new Promise((resolve, reject) => {
        this.$refs[formRef].validate((valid, failedObj) => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      }
      )
    },
    async handlerAudit(type) { // 保存跳转到变更列表
      const { form } = this
      // 编辑审核逻辑
      try {
        const ruleFormValid = await this.validateFrom('rules')
        if (ruleFormValid) {
          if (type === 1) {
            this.$message({ message: '提交成功', type: 'success' })
          } else if (type === 2) {
            this.$message({ message: '发起成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }
          await brandLibraryApi.brandLibrarySave(form)
          await this.$router.push({
            name: 'BrandLibraryChange'
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌变更列表
-->
<template>
  <div>
    <ysn-dialog
      :title="'编辑' "
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @cancel="cancel"
    >
      <template #contain>
        <div>
          <el-form ref="rule" :model="data" label-position="top" size="small" :rules="rules">
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
            <ysn-flod title="合作商家" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="business"
                :column="businessColumn"
              />
            </ysn-flod>
            <ysn-flod title="合作项目" :show-flod="false" :checkbox="true">
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
            <ysn-flod v-if="data.checkStatus===4 && data.checkStatusName.indexOf('OA') === -1" title="审核记录" :show-flod="false">
              <ysn-table :data="examineTableData.tableData1" :column="examineColumn" :checkbox="false" />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') === -1" class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') !== -1 || data.checkStatus === 1" class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" class="mr-8" @click="handlerAudit(3)">保存</ysn-btn>
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') !== -1" type="info" class="mr-8" @click="auditRecord">审核记录</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="deleteBox"
          >
            <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configDataEdit, formTableColumnEdit, businessColumn, projectColumn, examineColumn } from './dialpgCongif'
export default {
  name: 'EditDialog',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    outClose: { type: Boolean },
    dialogType: {
      type: String,
      default: 'edit' // add=新增，edit=编辑， details=详情
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
      formTableColumnEdit: formTableColumnEdit.call(this),
      businessColumn: businessColumn.call(this),
      projectColumn: projectColumn.call(this),
      examineColumn: examineColumn.call(this),
      examineTableData: {
        tableData1: [{
          examine1: 'xxx',
          examine2: 'xxxx',
          examine3: 'xxxx'
        },
        {
          examine1: 'xxxx',
          examine2: 'xxxxx',
          examine3: 'xxxx'
        }]
      },
      configDataEdit: configDataEdit.call(this)
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
      // const { form, dialogType } = this
      // 编辑审核逻辑
      try {
        const ruleFormValid = await this.validateFrom('rule')
        if (ruleFormValid) {
          if (type === 1) {
            this.$message({ message: '提交成功', type: 'success' })
          } else if (type === 2) {
            this.$message({ message: '发起成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }
          // await brandLibraryApi.brandLibrarySave(form)
          this.$emit('cloneDialog')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 删除
    deleteBox() {
      const that = this
      // const datas = {
      //   id: this.id
      // }
      // baseBusinessApi.shopOnePriceAuditDelete(datas).then(res => {
      //   that.$message({ message: '删除成功', type: 'success' })
      //   setTimeout(() => {
      //     that.$router.go(-1)
      //   }, 1000)
      // })
      that.$message({ message: '删除成功', type: 'success' })
      this.$emit('cloneDialog')
    },
    auditRecord() { // 审核记录
      this.$router.push({ name: 'BrandLibraryChangeExamine', query: { id: this.data.id, status: this.data.checkStatus }})
    }
  }
}
</script>

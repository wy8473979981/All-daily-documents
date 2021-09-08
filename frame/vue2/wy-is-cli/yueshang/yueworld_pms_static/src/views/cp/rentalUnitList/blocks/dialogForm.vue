<template>
  <div>
    <ysn-dialog :title="'新增'" :out-close="outClose" :width="'920px'" @closeDialog="closeDialog">
      <ysn-btn class="mr-8">新增</ysn-btn>
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem :form="formData" :config="configData" :column="4" clearable />
          <ysn-title title="业主信息" class="mb-8" />
          <ysn-formItem :form="formData" :config="configOwnerInformationData" :column="4" clearable />
        </el-form>

      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right" @click="preservation">
          <ysn-btn>保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { buildingApi } from '@/api'
export default {
  name: 'DialogForm',

  props: {
    isShowDialog: { type: Boolean, default: false },
    tableRow: {
      type: Object,
      default() {
        return {}
      }
    } // 表格数据

  },
  data() {
    return {
      isadd: true,
      formData: {
        ProgramName: '', // 所属项目
        BuildingName: '', // 所属楼栋
        FloorName: '', // 所属楼层
        OfficeId: '—自动带入—', // 单元编码
        OfficeName: '', // 单元号
        OfficeType: '', // 营运类型
        OfficeEquityNature: '', // 产权性质
        AreaType: '', // 计租方式
        LeasableArea: '—自动带入—', // 计租面积(m²)
        OfficeGrossArea: '', // 建筑面积(m²)
        OfficeNetArea: '', // 套内面积(m²)
        OfficeStatus: '—自动带入—', // 单元状态
        EffectiveDate: '', // 生效起始日期
        Remark: '', // 备注
        OwnerName: '', // 业主名称
        OwnerContactsName: '', // 业主联系人
        OwnerContactsTel: '' // 业主电话

      },
      outClose: true,
      configData: [ // 表单配置
        { itemType: 'select', prop: 'ProgramName', label: '所属项目', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'select', prop: 'BuildingName', label: '所属楼栋', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'select', prop: 'FloorName', label: '所属楼层', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'input', prop: 'OfficeId', label: '单元编码', placeholder: '', width: '200px', isFirst: true }, // TODO 字段不明确
        { itemType: 'input', prop: 'OfficeName', label: '单元号', placeholder: '请输入', width: '200px', isFirst: true },
        { itemType: 'select', prop: 'OfficeType', label: '营运类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'select', prop: 'OfficeEquityNature', label: '产权性质', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'select', prop: 'AreaType', label: '计租方式', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        { itemType: 'input', prop: 'LeasableArea', label: '计租面积(m²)', placeholder: '', width: '200px', isFirst: true }, // TODO 字段不明确
        { itemType: 'input', prop: 'OfficeGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'OfficeNetArea', label: '套内面积(m²)', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'OfficeStatus', label: '单元状态', placeholder: '', width: '200px', isFirst: true }, // TODO 字段不明确
        { itemType: 'datePicker', prop: 'EffectiveDate', label: '生效起始日期', type: 'date', width: '206px' },
        { itemType: 'input', type: 'textarea', prop: 'Remark', label: '备注', placeholder: '请输入', width: '428px', span: 4, isFirst: true }
      ],
      configOwnerInformationData: [ // 表单配置
        { itemType: 'input', prop: 'OwnerName', label: '业主名称', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'OwnerContactsName', label: '业主联系人', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'OwnerContactsTel', label: '业主电话', placeholder: '请输入', width: '206px' }
      ],
      rulesForm: { // 表单验证
        ProgramName: [{ required: true, message: '请选择所属项目' }],
        BuildingName: [{ required: true, message: '请选择所属楼栋' }],
        FloorName: [{ required: true, message: '请选择所属楼层' }],
        OfficeName: [{ required: true, message: '请输入单元号' }],
        OfficeType: [{ required: true, message: '请选择营运类型' }],
        OfficeEquityNature: [{ required: true, message: '请选择营运类型' }],
        AreaType: [{ required: true, message: '请选择营运类型' }],
        EffectiveDate: [{ required: true, message: '请选择营运类型' }]
      }
    }
  },
  computed: {},
  methods: {
    // 弹窗关闭
    closeDialog() {
      this.$emit('tableRowDialog')
    },
    // 保存
    preservation() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          this.getListAdd(this.formData)
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    // 数据新增
    getListAdd(formData) {
      buildingApi.buildinglistAdd(formData).then(res => {
        this.outClose = !this.outClose
        this.$emit('successTableList')
      })
    },
    // 提交修改
    modify() {
      buildingApi.buildinglistEdit(this.formDataObj).then(res => {
        this.outClose = !this.outClose
        this.$emit('successTableList')
      })
    }

  }
}
</script>

<style scoped lang="scss">
</style>

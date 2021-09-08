<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-24 16:28:18
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-25 14:18:15
-->
<template>
  <div>
    <ysn-dialog
      title="编辑"
      width="476px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <el-form ref="rule" :model="editFormData.formData" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="editFormData.formData"
              :config="configData"
              :column="2"
              clearable
            />
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn class="mr-16" @click="validate">保存</ysn-btn>
          <ysn-btn type="delete" @click="validate">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    isShowDialog: { type: Boolean },
    editFormData: { type: Object, default: () => {} }
  },
  data() {
    return {
      rules: {
        regionName: [{ required: true, message: '' }],
        regionStatus: [{ required: true, message: '' }]
      },
      formData: {},
      configData: [
        { itemType: 'input', placeholder: '请输入', prop: 'regionId', label: '区域编码' },
        { itemType: 'input', placeholder: '请输入', prop: 'thirdNo', label: '三方编码' },
        { itemType: 'input', placeholder: '请输入', prop: 'regionName', label: '名称' },
        { itemType: 'select', prop: 'regionStatus', label: '状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] }
      ]

    }
  },

  mounted() {

  },
  methods: {
    validate() {
      this.$emit('closeDialog')
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

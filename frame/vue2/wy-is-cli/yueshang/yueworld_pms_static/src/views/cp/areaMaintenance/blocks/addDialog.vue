<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-24 16:10:06
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-25 14:17:32
-->
<template>
  <div>
    <ysn-dialog title="新增" width="476px" :out-close="outClose">
      <ysn-btn class="mr-8">新增</ysn-btn>
      <template #contain>
        <div>
          <el-form ref="rule" :model="formData" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="formData"
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
          <ysn-btn @click="validate">保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    outClose: { type: Boolean }
  },
  data() {
    return {

      rules: {
        regionName: [{ required: true, message: '' }],
        regionStatus: [{ required: true, message: '' }]
      },

      formData: {},
      configData: [
        { itemType: 'input', placeholder: '请输入', prop: 'regionId', label: '区域编码', disabled: true },
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
      this.verification(this.$refs).then(res => {
        this.$emit('close')
      })
    }
  }
}
</script>

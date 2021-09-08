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
        { itemType: 'input', placeholder: '请输入', prop: 'cityId', label: '城市编码', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'thirdNo', label: '三方编码' },
        { itemType: 'input', placeholder: '请输入', prop: 'cityName', label: '名称' },
        { itemType: 'select', prop: 'cityStatus', label: '状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'regionName', label: '所属区域', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] }
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

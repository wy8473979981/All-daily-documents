<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <ysn-dialog title="拆铺" :is-show-dialog="visible" external>
      <ysn-btn class="mr-8" @click="Dismantling">拆铺</ysn-btn>
      <!-- 弹窗表单-->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" label-position="left" size="small">
          <ysn-formItem
            label-position="left"
            :form="formData"
            :config="configData"
            :column="2"
            clearable
          />
        </el-form>
        <!-- 提示 -->
        <div class="text-tips"><i class="el-icon-warning-outline" /> 合铺后生效日当天会将所有被合铺位的合同进行解约，调铺进行中止，空铺产生空置，请确认后再操作 </div>
        <!-- 表格 -->
        <ysn-table
          :data="tableData"
          :column="tableConfig"
          select-key="id"
        />
      </template>
      <template #btn>
        <div class="flex-ju-end mt-12">
          <!-- 下一步按钮弹窗组件 -->
          <InformationDoalogDismantling @show="show" />
          <ysn-btn type="info" @click="shows">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import InformationDoalogDismantling from './informationDoalogDismantling'
export default {
  name: 'FormItem',
  components: { InformationDoalogDismantling },
  data() {
    return {
      visible: false,
      formData: { // 表单数据
        s1: '',
        s2: ''
      },
      configData: [ // 表单配置
        { itemType: 'datePicker', prop: 's1', type: 'date', label: '拆铺生效日期', placeholder: '请选择楼层', width: '200px' },
        { itemType: 'select', prop: 's2', label: '拆分数量', placeholder: '请选择合同类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      tableData: [], // 表格数据
      tableConfig: [// 表格配置
        { t1: '铺号', sortable: true },
        { t2: '楼层', sortable: true },
        { t3: '物业类型', sortable: true },
        { t4: '生效日是否为空铺', sortable: true },
        { t5: '备注', sortable: true }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    },
    show(val) {
      this.visible = val
    },
    shows() {
      this.visible = false
    },
    Dismantling() {
      this.visible = true
    }
  }
}
</script>

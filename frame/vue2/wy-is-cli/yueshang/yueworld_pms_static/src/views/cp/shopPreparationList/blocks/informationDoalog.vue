<template>
  <div>
    <ysn-dialog title="合铺" :is-cancel="false" external :is-show-dialog="visible" :is-determine="false">
      <ysn-btn class="mr-8" @click="step">下一步</ysn-btn>
      <!-- 弹窗表单-->
      <template #contain>
        <div class="center">
          <ysn-title title="基础信息" class="mb-8" />
          <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
            <ysn-formItem
              label-position="top"
              :form="formData"
              :config="configData"
              :column="2"
              clearable
            />
          </el-form>
          <!-- 新签合同 -->
          <div v-for="(item,i) in num" :key="i">
            <ysn-title title="新签合同" class="mb-8" />
            <div class="flex-ju-al-between ">
              <div class="d-flex">
                <div class="mr-12">新签合同{{ i }}</div>
                <div class="color-0c66ff" @click="deletes(i)">删除</div>
              </div>
              <ysn-btn class="d-flex" @click="add">添加新签合同</ysn-btn>
            </div>
            <el-form ref="ruleForm" :model="item.name" label-position="top" size="small">
              <ysn-formItem
                label-position="top"
                :form="item.name"
                :config="contractConfigData"
                :column="2"
                clearable
              />
            </el-form>
          </div>
        </div>

        <div class="btn-group">
          <ysn-btn @click="dialogfalse">确认</ysn-btn>
          <ysn-btn style="margin-left:8px" type="info" @click="dialogfalsecancel">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
const contractFormData = {}// 合同表单数据
export default {
  name: 'FormItem',
  data() {
    return {
      num: [{
        name: contractFormData
      }
      ],
      visible: false,
      formData: { // 表单数据
        s1: '',
        s2: ''
      },
      configData: [ // 表单配置
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's1', required: true, label: '铺号', placeholder: '请输入', width: '246px' },
        { itemType: 'select', prop: 's2', required: true, label: '楼层', placeholder: '请选择楼层', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's3', required: true, label: '计租面积', placeholder: '请输入', width: '246px' },
        { itemType: 'select', prop: 's4', required: true, label: '签批业态', placeholder: '请选择签批业态', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's5', required: true, label: '标准租金(元)', placeholder: '请输入', width: '246px' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's6', required: true, label: '标准管理费(元)', placeholder: '请输入', width: '246px' }
      ],
      contractConfigData: [// 合同表单配置
        { itemType: 'select', prop: 's7', required: true, label: '合同类型', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'datePicker', prop: 's8', required: true, type: 'datetimerange', label: '合同起止日期', placeholder: '请选择楼层', width: '246px' },
        { itemType: 'select', prop: 's9', required: true, label: '品牌', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's10', required: true, label: '计租方式', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's11', required: true, label: '固定支付周期', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's12', required: true, label: '租金单价元', placeholder: '请输入', width: '246px' },
        { itemType: 'select', prop: 's13', required: true, label: '扣点支付周期', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's14', required: true, label: '销售额方式', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's15', required: true, label: '预估销售额(元)', placeholder: '请输入', width: '246px' },
        { itemType: 'select', prop: 's16', required: true, label: '扣点', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's17', required: true, label: '物管费支付周期', placeholder: '请选择合同类型', width: '246px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 's18', required: true, label: '物管费单价(元)', placeholder: '请选择合同类型', width: '246px' },
        { itemType: 'datePicker', prop: '19', required: true, type: 'datetimerange', label: '免租期', placeholder: '请选择楼层', width: '246px' }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    },
    add() {
      this.num.push({ name:
      { t1: '',
        t2: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
        t7: '',
        t8: '',
        t9: '',
        t10: '',
        t11: '',
        t12: '',
        t13: '' }
      })
    }, // 新增合同
    deletes(val) {
      if (val !== 0) {
        this.num.splice(val, 1)
      }
    },
    step() {
      this.visible = true
    },
    // 确定
    dialogfalse() {
      this.visible = false
      this.$emit('show', false)
    },
    // 取消
    dialogfalsecancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-group{
     display: flex;
     justify-content: flex-end;
     padding-bottom: 24px;
  }
</style>

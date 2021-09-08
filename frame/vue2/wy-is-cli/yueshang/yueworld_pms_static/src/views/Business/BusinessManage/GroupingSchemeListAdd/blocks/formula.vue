<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:53:20
 * @LastEditTime: 2021-08-17 19:46:25
 * @LastEditors: zengcheng
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable>
        <template #fixedMonthDayNumberLabel>
          <el-tooltip placement="top">
            <div slot="content">替换计算公式内相关数值</div>
            <span>固定月天数<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
          </el-tooltip>
        </template>
        <template #fixedYearDayNumberLabel>
          <el-tooltip placement="top">
            <div slot="content">替换计算公式内相关数值</div>
            <span>固定年天数<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
          </el-tooltip>
        </template>
      </ysn-formItem>
    </el-form>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
      :rules="formTableRules"
      :add="false"
      :first-row-add="false"
      :show-slots="['full1001Id','full1002Id','full1003Id','full1004Id','full1005Id']"
    >
      <template #full1001Id="scope">
        <el-select
          v-model="scope.row.full1001Id"
          placeholder="请选择单日价"
          style="width: 100%"
          @change="($attrs.change && $attrs.change(form)) || ''"
        >
          <el-option
            v-for="(item, index) in ($PUBFN.getOptionsList(scope.$index===0?'fullMonths':'notFullMonths'))"
            :key="'select' + index"
            :label="item.label"
            :value="item.value"
          >
            <span class="float-left">{{ item.label }}</span>
            <span v-if="scope.row.full1001Id == item.value" class="float-right gouicon">
              <svg-icon icon-class="bluegou" class="icon" />
            </span>
          </el-option>
        </el-select>
      </template>
      <template #full1002Id="scope">
        <el-select
          v-model="scope.row.full1002Id"
          placeholder="请选择月单价"
          style="width: 100%"
          @change="($attrs.change && $attrs.change(form)) || ''"
        >
          <el-option
            v-for="(item, index) in ($PUBFN.getOptionsList(scope.$index===0?'fullMonths':'notFullMonths'))"
            :key="'select' + index"
            :label="item.label"
            :value="item.value"
          >
            <span class="float-left">{{ item.label }}</span>
            <span v-if="scope.row.full1002Id == item.value" class="float-right gouicon">
              <svg-icon icon-class="bluegou" class="icon" />
            </span>
          </el-option>
        </el-select>
      </template>
      <template #full1003Id="scope">
        <el-select
          v-model="scope.row.full1003Id"
          placeholder="请选择月单价"
          style="width: 100%"
          @change="($attrs.change && $attrs.change(form)) || ''"
        >
          <el-option
            v-for="(item, index) in ($PUBFN.getOptionsList(scope.$index===0?'fullMonths':'notFullMonths'))"
            :key="'select' + index"
            :label="item.label"
            :value="item.value"
          >
            <span class="float-left">{{ item.label }}</span>
            <span v-if="scope.row.full1003Id == item.value" class="float-right gouicon">
              <svg-icon icon-class="bluegou" class="icon" />
            </span>
          </el-option>
        </el-select>
      </template>
      <template #full1004Id="scope">
        <el-select
          v-model="scope.row.full1004Id"
          placeholder="请选择年单价"
          style="width: 100%"
          @change="($attrs.change && $attrs.change(form)) || ''"
        >
          <el-option
            v-for="(item, index) in ($PUBFN.getOptionsList(scope.$index===0?'fullMonths':'notFullMonths'))"
            :key="'select' + index"
            :label="item.label"
            :value="item.value"
          >
            <span class="float-left">{{ item.label }}</span>
            <span v-if="scope.row.full1004Id == item.value" class="float-right gouicon">
              <svg-icon icon-class="bluegou" class="icon" />
            </span>
          </el-option>
        </el-select>
      </template>
      <template #full1005Id="scope">
        <el-select
          v-model="scope.row.full1005Id"
          placeholder="请选择年总价"
          style="width: 100%"
          @change="($attrs.change && $attrs.change(form)) || ''"
        >
          <el-option
            v-for="(item, index) in ($PUBFN.getOptionsList(scope.$index===0?'fullMonths':'notFullMonths'))"
            :key="'select' + index"
            :label="item.label"
            :value="item.value"
          >
            <span class="float-left">{{ item.label }}</span>
            <span v-if="scope.row.full1005Id == item.value" class="float-right gouicon">
              <svg-icon icon-class="bluegou" class="icon" />
            </span>
          </el-option>
        </el-select>
      </template>
    </ysn-formTable>
  </div>
</template>
<script>
// 7.5备注:与产品沟通 统一下拉框处理
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Formula',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formula',
    event: 'change'
  },
  props: {
    formula: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'input', inputType: 'Number', type: 'number', prop: 'fixedMonthDayNumber', label: '固定月天数', placeholder: '请输入', width: '200px', change: this.handelChange, hasLabelSlot: true },
        { itemType: 'input', inputType: 'Number', type: 'number', prop: 'fixedYearDayNumber', label: '固定年天数', placeholder: '请输入', width: '200px', change: this.handelChange, hasLabelSlot: true }
      ],
      rulesForm: { // 表单验证
        fixedMonthDayNumber: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        fixedYearDayNumber: [{ required: true, message: '请输入必填项' }]
      },
      formTableRules: {
        name: [{ required: true, message: '' }]
      },
      formTableConfig: [
        { name: '整月/非整月', itemType: 'text', width: '110px' },
        { full1001Id: '日单价(申请租金)', itemType: 'select', list: this.$PUBFN.getOptionsList('fullMonths'), required: true, width: '140px', change: this.getStatus },
        { full1002Id: '月单价(申请租金)', itemType: 'select', list: this.$PUBFN.getOptionsList('fullMonths'), required: true, width: '140px' },
        { full1003Id: '月总额(申请租金)', itemType: 'select', list: this.$PUBFN.getOptionsList('fullMonths'), required: true, width: '140px' },
        { full1004Id: '年单价(申请租金)', itemType: 'select', list: this.$PUBFN.getOptionsList('fullMonths'), required: true, width: '140px' },
        { full1005Id: '年总价(申请租金)', itemType: 'select', list: this.$PUBFN.getOptionsList('fullMonths'), required: true, width: '150px' }
      ]
    }
  },
  methods: {
    getStatus(e) {
      console.log(e)
    }
  }
}
</script>

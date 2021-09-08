
/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rules" clearabl>
    <!-- 基本信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 基本信息表单配置
      configData: [
        {
          itemType: 'input', prop: 'ruleName', label: '模版名称', width: '206px', placeholder: '请输入',
          change: (val) => {
            this.selectChange('ruleName', { ruleName: val })
          }
        },
        {
          itemType: 'input', prop: 'createdDate', label: '创建时间', inputType: 'autoValue', width: '206px', disabled: true
        },
        {
          itemType: 'input', prop: 'updated', width: '206px', inputType: 'autoValue', label: '修改时间', disabled: true
        }
      ],
      // 表单验证
      rules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * @method selectChange
     * @returns null
     * @desc 表单对应的chang事件
     */
    selectChange(type, val) {
      this.currentFormData[type] = val[type]
      this.emitComChange()
    },
    emitComChange() {
      this.$emit('comChange', { baseInfo: this.currentFormData })
    }
  }

}
</script>

/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="currentRule">
    <!-- 基本信息模块-->
    <ysn-formItem :form="currentFormData" :config="currentConfigData" :column="5" />
    <!--    <ysn-formItem :form="currentFormData" :config="configData" :column="3" />-->
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import PUBFN from '@/utils/pubFn'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'rulesInfo',
    event: 'change'
  },
  props: {
    rulesInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 基本信息表单配置
      rules: {
        levelId: [
          { required: true, message: '请选择模版级别', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请选择账套', trigger: 'blur' }
        ],
        programName: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        ruleTypes: [
          { required: true, message: '请选择模版类别', trigger: 'blur' }
        ]
      },
      configData: [
        {
          showDesign: [],
          itemType: 'select',
          prop: 'levelId',
          label: '模版级别',
          width: '206px',
          clearable: true,
          list: PUBFN.getOptionsList('levelId'),
          placeholder: '请选择',
          change: (val) => {
            this.selectChange('levelId', val)
          }
        },
        {
          showDesign: [1, 3],
          itemType: 'select',
          prop: 'programName',
          label: '项目名称',
          width: '206px',
          list: PUBFN.getOptionsList('projectName'),
          placeholder: '请选择',
          change: (val) => {
            this.selectChange('programName', val)
          }
        },
        {
          showDesign: [1, 2],
          itemType: 'select',
          prop: 'accountName',
          label: '账套名称',
          width: '206px',
          list: PUBFN.getOptionsList('subjectRelationFee'),
          placeholder: '请选择',
          change: (val) => {
            this.selectChange('accountName', val)
          }
        },
        {
          showDesign: [],
          itemType: 'checkboxInput',
          prop: 'ruleTypes',
          label: '规则设定',
          list: (() => {
            return PUBFN.getOptionsList('ruleTypes').map(item => {
              item.isShow = ['6', 6].includes(item.value)
              item.model = ''
              item.placeholder = '请输入'
              item.disabled = true
              return item
            })
          })(),
          placeholder: '请选择',
          span: 5,
          modelWidth: '145px',
          change: (val) => {
            this.ruleTypeChange(val.ruleTypes)
          },
          changeInput: (key, val) => {
            this.ruleTypeInputChange(key, val)
          }
        }
      ],
      currentConfigData: [],
      currentRule: {}
    }
  },
  watch: {
    // 监听拆分规则数据改变
    rulesInfo: {
      handler(newValue) {
        this.setCurrentConfigData()
        // 设置模版类别相关
        this.configData[3].list.map(item => {
          if (newValue.ruleTypes.includes(item.value)) {
            item.disabled = false
            item.model = newValue.limit
          } else {
            item.disabled = true
          }
        })
      }
    }
  },
  mounted() {
    this.setCurrentConfigData()
  },
  methods: {
    /**
    * @method ruleTypeChange
    * @returns null
    * @desc 控制模版类别对应的输入框的相关功能
    */

    ruleTypeChange(ruleTypes) {
      this.configData[3].list.map(item => {
        item.disabled = !ruleTypes.includes(item.value)
        if (!ruleTypes.includes(item.value)) {
          item.model = '' // 取消勾选清除对应的input值
        }
      })
      // 判断限额是否勾选
      if (!ruleTypes.includes('5')) {
        this.currentFormData.limit = ''
      }
      this.currentFormData.ruleTypes = ruleTypes
      this.emitComChange()
    },
    /**
    * @method ruleTypeInputChange
    * @returns null
    * @desc 控制模版类别value对应的输入框值
    */

    ruleTypeInputChange(key, val) {
      console.log(key, val)
      this.currentFormData.limit = val // 处理限额
      this.emitComChange()
    },
    /**
     * @method selectChange
     * @returns null
     * @desc 表单对应的chang事件
     */
    selectChange(type, val) {
      this.currentFormData[type] = val[type] // 处理限额
      this.emitComChange()
    },
    setCurrentConfigData() {
      this.currentRule = {}
      this.currentConfigData = this.configData.filter(item => {
        if (item.showDesign.length === 0 || item.showDesign.includes(this.currentFormData.levelId)) {
          this.currentRule[item.prop] = this.rules[item.prop]
          return true
        }
        return false
      })
    },
    emitComChange() {
      this.$emit('comChange', { rulesInfo: this.currentFormData })
    }
  }

}
</script>

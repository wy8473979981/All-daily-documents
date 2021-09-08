<!--
 * @Author: qiuyw
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      :column="tableConfig"
      prop="tableData"
      :rules="formTableRules"
      :first-row-add="false"
      :show-slots="['startYear']"
    >
      <template #startYear="scope">
        {{ new Date(scope.row.startYear).getFullYear() }}
      </template>
    </ysn-formTable>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'budgetInfo',
    event: 'change'
  },
  props: {
    // 整体页面数据
    data: {
      type: Object,
      default: () => {}
    },
    // 组件数据
    budgetInfo: {
      type: Object,
      default: () => {
        return {
          tableData: []
        }
      }
    }
  },
  data() {
    return {
      // 字段对应月份
      keyList: {
        'month0': '1月',
        'month1': '2月',
        'month2': '3月',
        'month3': '4月',
        'month4': '5月',
        'month5': '6月',
        'month6': '7月',
        'month7': '8月',
        'month8': '9月',
        'month9': '10月',
        'month10': '11月',
        'month11': '12月'
      },
      // 月度字段KEY
      monthKey: 'month'
    }
  },
  computed: {
    tableConfig() {
      const { currentFormData, keyList, monthKey } = this
      // 有起始年月
      if (currentFormData.effectiveDate) {
        return [
          { startYear: '年度', itemType: 'text', width: '100px', placeholder: '请选择起始生效日期' },
          { feeName: '费项名称', itemType: 'text', width: '120px' },
          { monthPrice: '月单价(元/m²/月)', itemType: 'text', width: '140px', type: 'money' },
          {
            monthAmount: '月收入(元)',
            align: 'center',
            tableList: (function() {
              const list = []
              Object.keys(currentFormData.tableData[0] || {}).forEach(key => {
                if (key.indexOf(monthKey) !== -1 && key.indexOf('monthPrice') === -1) {
                  list.push({
                    [key]: keyList[key],
                    itemType: 'text',
                    type: 'money'
                  })
                }
              })
              // 增加一个空的用来解决右齐问题
              list.push({
                empty: '',
                width: 10,
                itemType: 'text'
              })
              // console.log('计算得到input list======>', list)
              return list
            })()
          }
        ]
      } else {
        return [
          { startYear: '年度', itemType: 'datePicker', width: '200px', placeholder: '请选择起始生效日期' },
          { feeName: '费项名称', itemType: 'text', width: '120px' },
          { monthPrice: '月单价(元/m²/月)', itemType: 'text', width: '140px', inputType: 'Number' },
          {
            monthAmount: '月收入(元)',
            align: 'center',
            tableList: [
              { monthAmount: '请先选择生效起始日期', itemType: 'text', align: 'center' }
            ]
          }
        ]
      }
    },
    formTableRules() {
      const { currentFormData, monthKey } = this
      const formRules = {
        startYear: [{ required: true, message: '' }],
        feeName: [{ required: true, message: '' }],
        monthPrice: [{ required: true, message: '' }]
      }
      if (currentFormData.effectiveDate) {
        Object.keys(currentFormData.tableData[0] || {}).forEach(key => {
          if (key.indexOf(monthKey) !== -1 && key.indexOf('monthPrice') === -1) {
            formRules[key] = [{ required: true, message: '' }]
          }
        })
      }
      return formRules
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {}
}
</script>

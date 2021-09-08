<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 16:04:21
 * @LastEditors: fhj
-->
<template>
  <div class="app-page-main pl-12 " style="position: relative; padding-top: 15px;">
    <el-form class="form-area" :model="formData" size="small">
      <ysn-formItem :form="formData" :config="formConfig" :column="1" />
    </el-form>
    <YsnPageContent
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :table-order-config="tableOrderConfig"
      persmission="homeList"
    />
  </div>
</template>
<script>
import { testApi } from '@/api'
const dataTmp = {
  t1: 1,
  t2: '上海印力广场',
  t3: 1,
  t4: 1,
  t5: 1,
  t6: 1,
  t7: 1,
  t8: 1,
  t9: 1,
  t10: 1,
  t11: 1,
  t12: 1,
  t13: 1,
  t14: 1,
  t15: 1,
  t16: 1,
  t17: 1
}
export default {
  name: 'BudgetOrganization',
  data() {
    return {
      tableConfig: [
        { t1: '序列', type: 'index', fixedWidth: 80, isShow: true },
        { t2: ' 项目', sortable: true },
        { t4: ' 考核开业率', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t5: ' 考核出租率', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t6: ' 平均租金', sortable: true, type: 'money', isShow: true, minWidth: '100px' },
        { t7: ' 租金收缴率', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t8: ' 物管收缴率', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t9: ' 多经收缴率', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t10: ' 昨日客流', sortable: true, isShow: true, minWidth: '100px' },
        { t11: ' 客流密度', sortable: true, isShow: true, minWidth: '100px' },
        { t12: ' 租售比', sortable: true, type: 'rate', isShow: true, minWidth: '100px' },
        { t13: ' 平效', sortable: true, isShow: true, minWidth: '100px' },
        { t14: ' 历史欠费', sortable: true, type: 'money', isShow: true, minWidth: '100px' },
        { t15: ' 年累计', sortable: true, type: 'money', isShow: true, minWidth: '100px' },
        { t16: ' 累计会员数', sortable: true, isShow: true, minWidth: '100px' },
        { t17: ' 当年车流', sortable: true, isShow: true, minWidth: '100px' }

      ],
      queryConfig: {
        api: testApi.getList, // 接口请求方式
        dataKey: 'data' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      formData: { contBeginDates: '' },

      formConfig: [
        {
          itemType: 'datePicker',
          prop: 'contBeginDates',
          type: 'month',
          label: '',
          width: '194px',
          valueFormat: 'yyyy-MM'
        }
      ],
      tableOrderConfig: {
        checkbox: false,
        full: true
      }
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return dataTmp
    //   return data
    }
  }
}

</script>

<style lang="scss" scoped>
$menuBg1: #F00;
.form-area {
  position: absolute;
  top: 0px;
  left: 12px;
}
::v-deep .ysn-table {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -1px;
    width: 32px;
    border-left: 12px solid $menuBg;
    height: 32px;
    border-radius: 32px;
    z-index: 22;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    width: 32px;
    height: 32px;
    border-right: 12px solid $menuBg;
    height: 32px;
    border-radius: 32px;
    z-index: 22;
  }
}
</style>

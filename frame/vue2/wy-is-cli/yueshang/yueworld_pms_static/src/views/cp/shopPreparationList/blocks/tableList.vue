<template>
  <div class="max-area">
    <div class="flex-ju-end mb-12">
      <!-- 拆铺组件 -->
      <DismantlingDoalog />
      <!-- 合铺组件 -->
      <CloseDoalog />
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      select-key="id"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import DismantlingDoalog from './dismantlingDoalog'
import CloseDoalog from './closeDoalog'
export default {
  name: 'TableList',
  components: { DismantlingDoalog, CloseDoalog },
  data() {
    return {
      total: 100,
      page: { pageNo: 1, pageSize: 20 },
      tableData: [], // 表格数据
      tableConfig: [
        { t1: '基础信息', tableList: [ // 二级表头
          { t0: '铺位号', sortable: true },
          { t2: '物业类型', sortable: true },
          { t3: '楼层', sortable: true },
          { t4: '计租面积(㎡)', sortable: true },
          { t5: '业态', sortable: true },
          { t6: '资产属性', sortable: true },
          { t7: '销售状态', sortable: true },
          { t8: '返租/整租到期日', sortable: true },
          { t9: '标准租金', sortable: true },
          { t10: '标准物管费', sortable: true },
          { t11: '历史合同单价', sortable: true },
          { t12: '期初状态', sortable: true },
          { t13: '期间合同数量', sortable: true },
          { t14: '是否调铺', sortable: true },
          { t15: '调铺生效日', sortable: true }
        ] },

        { t16: '合同信息', tableList: [ // 二级表头
          { t17: '合同类型', sortable: true },
          { t18: '合同号', sortable: true },
          { t19: '合同开始日期', sortable: true },
          { t20: '合同结束日期', sortable: true },
          { t21: '计租方式', sortable: true },
          { t22: '固定支付周期', sortable: true },
          { t23: '租金单价(元/月/㎡)', sortable: true },
          { t24: '达成率', sortable: true },
          { t25: '租金递增率', sortable: true },
          { t26: '扣点支付周期', sortable: true },
          { t27: '扣点率', sortable: true },
          { t28: '销售额方式', sortable: true },
          { t28: '2021年预估销售额', sortable: true },
          { t29: '1月预估销售额', sortable: true },
          { t30: '2月预估销售额', sortable: true },
          { t31: '3月预估销售额', sortable: true },
          { t32: '4月预估销售额', sortable: true },
          { t33: '5月预估销售额', sortable: true },
          { t34: '6月预估销售额', sortable: true },
          { t35: '7月预估销售额', sortable: true },
          { t36: '8月预估销售额', sortable: true },
          { t37: '9月预估销售额', sortable: true },
          { t38: '10月预估销售额', sortable: true },
          { t39: '11月预估销售额', sortable: true },
          { t40: '12月预估销售额', sortable: true },
          { t41: '物管费支付周期', sortable: true },
          { t42: '物管费单价(元/月/㎡)', sortable: true },
          { t43: '物管费递增率', sortable: true },
          { t44: '免租期', sortable: true },
          { t45: '有效租期', sortable: true },
          { t46: '计租月数', sortable: true },
          { t47: '计费月数', sortable: true },
          { t48: '租金合计(元)', sortable: true },
          { t49: '物管费合计(元)', sortable: true }
        ] },

        { t50: '月收入(租金/管理费) K', tableList: [ // 二级表头
          { t51: '1月', sortable: true },
          { t52: '2月', sortable: true },
          { t53: '3月', sortable: true },
          { t54: '4月', sortable: true },
          { t55: '5月', sortable: true },
          { t56: '6月', sortable: true },
          { t57: '7月', sortable: true },
          { t58: '8月', sortable: true },
          { t59: '9月', sortable: true },
          { t60: '10月', sortable: true },
          { t61: '11月', sortable: true },
          { t62: '12月', sortable: true }
        ] },

        { t63: '财务计算', tableList: [
          { t64: '空置期', sortable: true },
          { t65: '计租总月数', sortable: true },
          { t66: '计费总月数', sortable: true },
          { t67: '综合收入', sortable: true },
          { t68: '欠费', sortable: true },
          { t69: '清欠目标', sortable: true }
        ] },

        { t70: '未来两年', tableList: [
          { t71: '未来2年收入(2023/2022)', width: '200px', sortable: true },
          { t72: '2022年租金递增率', width: '200px', sortable: true },
          { t73: '2022年计租月数', width: '200px', sortable: true },
          { t74: '2022年租金额', width: '200px', sortable: true },
          { t75: '2023年租金递增率', width: '200px', sortable: true },
          { t76: '2023年计租月数', width: '200px', sortable: true },
          { t77: '2023年租金额', width: '200px', sortable: true },
          { t78: '2022年物管费递增率', width: '200px', sortable: true },
          { t79: '2022年物管费计费月数', width: '200px', sortable: true },
          { t80: '2022物管费金额', width: '200px', sortable: true },
          { t81: '2023年物管费递增率', width: '200px', sortable: true },
          { t82: '2023年物管费计费月数', width: '200px', sortable: true },
          { t83: '2023年物管费金额', width: '200px', sortable: true },
          { t84: '操作', sortable: true }
        ] }
      ]
    }
  },

  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>

<template>
  <div class="max-area">
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      select-key="id"
      show-operation
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
export default {
  name: 'TableList',
  data() {
    return {
      total: 100,
      page: { pageNo: 1, pageSize: 20 },
      tableData: [], // 表格数据
      tableConfig: [
        { t1: '基础信息', tableList: [ // 二级表头
          { t0: '多经编号', sortable: true },
          { t2: '楼层', sortable: true },
          { t3: '物业类型', sortable: true },
          { t4: '点位类型', sortable: true },
          { t5: '期间合同数量', sortable: true },
          { t6: '标准单价（元/个/月', sortable: true },
          { t7: '标准单价(元/㎡/月）', sortable: true },
          { t8: '平日标准单价（元/个/天）', sortable: true },
          { t9: '周末标准单价（元/个/天）', sortable: true },
          { t10: '节假日标准单价（元/个/天）', sortable: true },
          { t11: '面积', sortable: true },
          { t12: '业态', sortable: true },
          { t13: '期初状态', sortable: true },
          { t14: '合同类型', sortable: true },
          { t15: ' 合同号', sortable: true },
          { t16: ' 合同开始日期', sortable: true },
          { t17: ' 合同结束日期', sortable: true },
          { t18: ' 商户', sortable: true }
        ] },

        { t19: '合同信息', tableList: [ // 二级表头
          { t20: '支付周期', sortable: true },
          { t21: '多经单价（元/个/月）', sortable: true },
          { t22: '多经单价（元/㎡/月）', sortable: true },
          { t23: '平日单价（元/个/天）', sortable: true },
          { t24: '周末单价（元/个/天）', sortable: true },
          { t25: '节假日单价（元/个/天）', sortable: true },
          { t26: '租金递增率', sortable: true },
          { t27: '租金总收入', sortable: true }
        ] },

        { t28: '租金', tableList: [ // 二级表头
          { t29: '1月', sortable: true },
          { t30: '2月', sortable: true },
          { t31: '3月', sortable: true },
          { t32: '4月', sortable: true },
          { t33: '5月', sortable: true },
          { t34: '6月', sortable: true },
          { t35: '7月', sortable: true },
          { t36: '8月', sortable: true },
          { t37: '9月', sortable: true },
          { t38: '10月', sortable: true },
          { t39: '11月', sortable: true },
          { t40: '12月', sortable: true }
        ] },

        { t41: '财务计算', tableList: [ // 二级表头
          { t42: '空置期', sortable: true },
          { t43: '综合收入', sortable: true }
        ] },

        { t44: '月均收益', tableList: [ // 二级表头
          { t45: '2020年实际（元/月）', sortable: true },
          { t46: '2021年月均收益（元/月）', sortable: true },
          { t47: '2022月租金递增率', sortable: true },
          { t48: '2022可实现收益（月数）', sortable: true }
        ] },

        { t49: '未来两年', tableList: [ // 二级表头
          { t50: '2022', sortable: true },
          { t51: ' 2023月租金递增率', sortable: true },
          { t52: '2023可实现收益（月数）', sortable: true },
          { t53: '2023', sortable: true }
        ] },

        { t54: '状态', sortable: true }

      ]
    }
  },

  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>

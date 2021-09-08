/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 欠费明细
 */
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() { // 权责月方法
  let receivableTime = []
  if (this.$route.query.subStatusId === 1) {
    receivableTime = [{ receivableTime: '应收日期', isShow: true, sortable: true }]
  } else {
    receivableTime = [{ financialDate: '权责月', isShow: true, sortable: true }]
  }
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { receivableNo: '应收编号', isShow: true, sortable: true },
    { feeName: '费项', isShow: true, sortable: true },
    ...receivableTime,
    { ArrearageDay: '欠费天数', isShow: true, sortable: true },
    { delayDays: '宽限天数', isShow: true, sortable: true },
    { performLateFeeDays: '执行滞纳金天数', isShow: true, sortable: true },
    { oweAmount: '欠费金额(元)', isShow: true, sortable: true, type: 'money' },
    { lateFee: '滞纳金(元)', isShow: true, sortable: true, type: 'money' }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '合同编号', value: this.$route.query.contNo, decimal: 0 }
  ]
}
// 推送滞纳金弹窗表格配置
export const tableConfigDialog = function() {
  let receivableTime = []
  if (this.$route.query.subStatusId === 1) {
    receivableTime = [{ receivableTime: '应收日期(已考虑宽限天数)', width: 200, itemType: 'text' }]
  } else {
    receivableTime = []
  }
  return [
    { receivableNo: '原应收编码', itemType: 'text' },
    { feeName: '费项', itemType: 'text' },
    ...receivableTime,
    { performLateFeeDays: '执行滞纳金天数', width: 120, itemType: 'text' },
    { oweAmount: '欠费金额(元)', type: 'money', width: 130, itemType: 'text' },
    { ratio: '滞纳金比例(%)', width: 120, itemType: 'text' },
    { lateFee: '滞纳金金额(元)', type: 'money', width: 130, itemType: 'text' },
    { remark: '备注', itemType: 'input', width: '120' }
  ]
}

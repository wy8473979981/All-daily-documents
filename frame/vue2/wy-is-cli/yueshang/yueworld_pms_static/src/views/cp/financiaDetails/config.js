export const rulesForm = { // 表单验证
  t1: [{ required: true, message: '请输入必填项' }],
  t2: [{ required: true, message: '请输入必填项' }],
  t3: [{ required: true, message: '请输入必填项' }],
  t4: [{ required: true, message: '请输入必填项' }],
  t5: [{ required: true, message: '请输入必填项' }],
  t6: [{ required: true, message: '请输入必填项' }]

}
export const tableConfig1 = [
  // { disName: '二维表格', columnClass: 'hasBg', width: '100px' },
  { idx: '', type: 'index', width: '50', tableList: [
    { t1: '冲抵费项', width: '120px' },
    { t2: '合同编号', width: '' },
    { t3: '收款单位', width: '' }
  ] },
  { name: '预收款', tableList: [
    { t4: '剩余可冲抵金额', labelClass: ' borderLeft' },
    { t5: '申请冲抵金额' }
  ] },
  { sex: '保证金', labelClass: 'borderBottom', tableList: [
    { t6: '剩余课冲抵金额' },
    { t7: '申请冲抵金额', width: '160px' }
  ] }
]
export const tableConfig2 = [
  { t1: '费用项', sortable: false },
  { t2: '权责月', sortable: false },
  { t3: '财务月', sortable: false },
  { t4: '合同编号', sortable: false },
  { t5: '应收编号', sortable: false },
  { t6: '税率', sortable: false },
  { t7: '应收金额', sortable: false },
  { t8: '冲减金额', sortable: false }

]
export const tableConfig3 = [
  { t1: '费项', sortable: false, width: '100' },
  { t2: '合同应收日期', sortable: false, width: '120' },
  { t3: '应收日期', sortable: false, width: '120' },
  { t4: '权责月', sortable: false, width: '120' },
  { t5: '应收', sortable: false, width: '120' },
  { t6: '减免', sortable: false, width: '120' },
  { t7: '已收', sortable: false, width: '120' },
  { t8: '欠款', sortable: false, width: '120' },
  { t9: '预收款冲抵', sortable: false, width: '120' },
  { t10: '收款核销', sortable: false, width: '120' },
  { t11: '应收冲减', sortable: false, width: '100' }

]
export const tableConfig4 = [{
  t1: '处理时间'
},
{
  t2: '处理者'
},
{
  t3: '步骤'
},
{
  t4: '操作说明'
}

]

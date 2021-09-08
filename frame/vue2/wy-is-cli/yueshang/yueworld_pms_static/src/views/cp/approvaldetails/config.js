export const tableConfig1 = [
  // { disName: '二维表格', columnClass: 'hasBg', width: '100px' },
  { v1: '预算名称', labelClass: '', width: '100' },
  { v2: '类型', labelClass: '', width: '' },
  { v3: '2022年预算总额', width: '140' },
  { name: '2021年预算总额', width: '130px', labelClass: 'borderBottom borderRight borderLeft', tableList: [
    { v4: '1-6月实际发生', labelClass: 'borderLeft', width: '120px' },
    { v5: '7-12月预估', width: '120px', labelClass: 'borderRight' }
  ] },
  { v6: '差异额', labelClass: '', width: '140' },
  { v7: '差异率', labelClass: '', width: '140' },
  { v8: '2022年预算明细', labelClass: '', width: '140' },
  { v9: '2022年预算明细', labelClass: '', width: '160' }
]
export const rulesForm = { // 表单验证
  t1: [{ message: '请输入必填项' }],
  t2: [{ message: '请输入必填项' }],
  t3: [{ message: '请输入必填项' }],
  t4: [{ message: '请输入必填项' }],
  t5: [{ message: '请输入必填项' }],
  t6: [{ message: '请输入必填项' }]
}
export const configData = [ // 表单配置
  { itemType: 'fileUpload', prop: 'fileList', label: '上传文件', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 }
]

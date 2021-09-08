const selectList = [
  { label: 'A', value: '1' },
  { label: 'B', value: '2' },
  { label: 'C', value: '3' }
]
const selectList1 = [
  { label: '直营', value: '1' }
]
const selectList2 = [
  { label: '零售', value: '1' },
  { label: '服装', value: '2' },
  { label: '女装', value: '3' }
]
const selectList3 = [
  { label: '连锁', value: '1' }

]
const selectList4 = [
  { label: '品牌自营', value: '1' },
  { label: '连锁', value: '2' }

]
const selectLists = [
  { label: '有效', value: '1' },
  { label: '无效', value: '2' }
]
export const configData1 = [ // 表单配置
  { itemType: 'input', prop: 't1', label: '姓名', placeholder: '请输入姓名', width: '206px', required: true },
  { itemType: 'input', prop: 't2', label: '职位', placeholder: '请输入姓名', width: '206px', required: true },
  { inputType: 'Number', itemType: 'input', prop: 't3', label: '固定电话', placeholder: '请输入姓名', width: '206px', required: true },
  { inputType: 'Number', numberConfig: { max: 9999999999999, min: 0, decimal: 0 }, itemType: 'input', prop: 't4', label: '手机', placeholder: '请输入姓名', width: '206px', required: true },
  { itemType: 'input', prop: 't5', label: '邮箱', placeholder: '请输入姓名', width: '206px', required: true },
  { itemType: 'select', prop: 't6', label: '联系人状态', list: selectLists, placeholder: '请输入姓名', width: '206px', required: true }
]
export const configData = [ // 表单配置
  { itemType: 'input', prop: 't1', label: '品牌名', placeholder: '请输入品牌名', width: '206px', required: true },
  { itemType: 'input', prop: 't2', label: '品牌编码', placeholder: '请输入品牌品牌编码', width: '206px', required: true },
  { itemType: 'input', prop: 't3', label: '品牌别名', placeholder: '请输入品牌别名', width: '206px', required: true },
  { itemType: 'select', prop: 't4', label: '品牌等级', placeholder: '请选择', list: selectList, width: '206px', required: true },
  { itemType: 'select', prop: 't5', label: '经营性质', placeholder: '请选择', list: selectList1, width: '206px', required: true },
  { itemType: 'select', prop: 't6', label: '业态', placeholder: '请选择', list: selectList2, width: '206px', required: true },
  { itemType: 'select', prop: 't7', label: '连锁/单店', placeholder: '请选择', list: selectList3, width: '206px', required: true },
  { itemType: 'select', prop: 't8', label: '开店方式', placeholder: '请选择', list: selectList4, width: '206px', required: true },
  { itemType: 'input', prop: 't9', label: '集团名称', placeholder: '请输入集团名称', width: '206px', required: true },
  { itemType: 'input', prop: 't10', label: '总部地址', placeholder: '请输入总部地址', width: '206px', required: true },
  { itemType: 'input', prop: 't11', label: '重点发展省份', placeholder: '请输入重点发展省份', width: '206px', required: true },
  { itemType: 'input', prop: 't12', label: '主要城市分布', placeholder: '请输入主要城市分布', width: '206px', required: true },
  { inputType: 'Number', numberConfig: { min: 0, decimal: 2 }, itemType: 'input', prop: 't13', label: '客单价(元)', placeholder: '请输入客单价(元)', width: '206px', required: true },
  { inputType: 'Number', numberConfig: { max: 9999999999999, min: 0, decimal: 0 }, itemType: 'input', prop: 't14', label: '联系电话', placeholder: '请输入联系电话', width: '206px', required: true },
  { itemType: 'input', prop: 't15', label: '官网地址', placeholder: '请输入官网地址', width: '206px', required: true },
  { itemType: 'input', type: 'textarea', prop: 't16', label: '品牌名称', placeholder: '请输入', width: '428px', labelPosition: 'left', span: 2, required: true },
  { itemType: 'fileUpload', prop: 't17', label: '上传文件', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 }
]
export const formData = {
  t1: '',
  t2: '',
  t3: '',
  t4: 'A',
  t5: '',
  t6: '',
  t7: '',
  t8: '品牌自营',
  t9: '',
  t10: '',
  t11: '',
  t12: '',
  t13: '',
  t14: '',
  t15: '',
  t16: '',
  t17: [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
}
export const formData1 = {
  t1: '',
  t2: '',
  t3: '',
  t4: '',
  t5: '',
  t6: ''
}
export const tableData1 = [{
  t1: '黄树材',
  t2: '下沙',
  t3: '黄树材',
  t4: '15372964000'
}, {
  t1: '许岳兵',
  t2: '周山新城',
  t3: '许岳兵',
  t4: '13585847899'
}, {
  t1: '周震斌',
  t2: '下沙',
  t3: '周震斌',
  t4: '15371964000'
}]
export const tableData2 = [{
  t1: '项目A',
  t2: '2019202102',
  t3: '租赁合同',
  t4: '是',
  t5: '2021-02-03',
  t6: '/'
},
{ t1: '项目B',
  t2: '2019202102',
  t3: '租赁合同',
  t4: '是',
  t5: '2021-02-03',
  t6: '/'
}]

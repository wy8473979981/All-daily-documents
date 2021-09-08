import store from '@/store'

// 楼层概览
export const IconConfig = [
  { icon: 'shop', label: '铺位管理' },
  { icon: 'bind', label: '绑定铺位' },
  { icon: 'person', label: '人员分工' },
]
// 显示偏好
export const SeeOptions = [
  { label: '品牌', key: 'cooperativeBrand' },
  { label: '铺位编号', key: 'storeNo' },
  { label: '计租面积', key: 'storeRentSquare' },
  { label: '即将到期天数', key: 'expireDayNum' },
  { label: '欠费金额', key: 'owe' },
]
// 更多操作
export const ActionsOptions = [
  { label: '导出平面图', key: 1 },
  { label: '打印平面图', key: 2 }
]

export function getFormConfig() {
  const width = '176px'
  return [
    {
      key: 'poiId',
      label: '',
      type: 'select',
      props: {
        filterable: true,
        remote: true,
        'remote-method': this.remoteMethod,
        options: () => this.formOptions,
        clearable: true,
        width,
        placeholder: '铺位号/品牌'
      },
    },
    {
      key: 'formatCds',
      label: '',
      type: 'select',
      props: {
        selectAll: { label: '全部业态', key: '99100' },
        options: () => store.getters.formatColorList,
        'collapse-tags': true,
        multiple: true,
        width,
        placeholder: '业态'
      }
    },
    {
      key: 'managerIds',
      label: '',
      type: 'cascader',
      props: {
        'show-all-levels': false,
        options: () => this.personList,
        width,
        props: {
          value: 'managerId',
          label: 'managerName',
          // emitPath: false,
        },
        placeholder: '责任人'
      }
    },
  ];
}

// 铺位信息
export function getShopInfoConfig() {
  return [
    { key: 'storeRentSquare', label: '计租面积(㎡)' },
    { key: 'storeNum', label: '总铺位(个)', type: 'custom' },
    { key: 'rentedRentSquare', label: '在营面积(㎡)', hasPreLine: true },
    { key: 'rentedStoreNum', label: '在营铺位(个)', type: 'custom', isLink: true, click: (...props) => { this.highlightMap(...props)} },
    { key: 'rentedNoOpenRentSquare', label: '已租未开业面积(m²)', hasPreLine: true },
    { key: 'rentedNoOpenStoreNum', label: '已租未开业铺位(个)', type: 'custom', isLink: true, click: (...props) => { this.highlightMap(...props)} },
    { key: 'emptyRentSquare', label: '空铺面积(m²)', hasPreLine: true },
    { key: 'emptyStoreNum', label: '空铺铺位(个)', type: 'custom', isLink: true, click: (...props) => { this.highlightMap(...props)} }
  ]
}
// 本年租金(万元)
export const RentThisYearConfig = [
  { key: 'zjStandard', label: '一铺一价', type: 'ten-thousand' },
  { key: 'zjBudget', label: '财务预算', type: 'ten-thousand' },
  { key: 'zjCont', label: '实际合同', type: 'ten-thousand' }
]

// 本年物管费(万元)
export const PropertyManagementFeeThisYearConfig = [
  { key: 'wgStandard', label: '一铺一价', type: 'ten-thousand' },
  { key: 'wgBudget', label: '财务预算', type: 'ten-thousand' },
  { key: 'wgCont', label: '实际合同', type: 'ten-thousand' }
]


// 业态偏差弹窗
export const LayoutTableConfig = [
  { key: 'type', label: '', width: '70px' },
  { key: 'storeNum', label: '偏差铺位数', width: '110px' },
  { key: 'storeRate', label: '偏差率', type: 'rate' },
]

// 即将到期弹窗
export const ExpireTableConfig = [
  { key: 'type', label: '', width: '70px' },
  { key: 'storeNum', label: '铺位数', width: '100px' },
  { key: 'storeRate', label: '占比', type: 'rate', width: '100px' },
]

// 欠费弹窗
export const ArrearsTableConfig = [
  { key: 'type', label: '', width: '70px' },
  { key: 'oweStoreNum', label: '铺位数', width: '70px' },
  { key: 'oweZjSum', label: '租金(万元)', type: 'ten-thousand', width: '110px' },
  { key: 'oweWgSum', label: '物管费(万元)', type: 'ten-thousand', width: '110px' }
]
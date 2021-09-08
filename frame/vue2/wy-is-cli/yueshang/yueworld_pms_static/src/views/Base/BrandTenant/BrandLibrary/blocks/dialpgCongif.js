/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:品牌库
*/
import PUBFN from '@/utils/pubFn'
// 基本信息可编辑
export const configDataEdit = () => {
  return [
    { itemType: 'input', placeholder: '请输入', prop: 'brandName', label: '品牌名' },
    { itemType: 'input', placeholder: '请输入', prop: 'brandId', label: '品牌编码', disabled: true },
    { itemType: 'select', placeholder: '请选择', prop: 'brandType', label: '品牌类型', list: PUBFN.getOptionsList('brandType') },
    { itemType: 'input', placeholder: '请输入', prop: 'brandOtherName', label: '品牌别名' },
    { itemType: 'select', placeholder: '请选择', prop: 'brandLevel', label: '品牌等级', list: PUBFN.getOptionsList('brandLevelChoice') },
    { itemType: 'select', placeholder: '请选择', prop: 'brandOperateType', label: '经营性质', list: PUBFN.getOptionsList('brandOperateType') },
    { itemType: 'cascaderDialog', placeholder: '请选择', prop: 'brandFormatName', label: '业态', list: PUBFN.getOptionsList('brandFormatName1'), dataType: 'format', cascaderTile: [{ title: '一级业态' }, {title: '二级业态', placeholder: '请先选择一级业态'},{title: '三级业态',placeholder:'请先选择二级业态'},{title: '已选三级业态',placeholder:'请先选择三级业态'}] },
    { itemType: 'select', placeholder: '请选择', prop: 'brandStoreType', label: '连锁/单店', list: PUBFN.getOptionsList('brandStoreType') },
    { itemType: 'select', placeholder: '请选择', prop: 'brandShopMode', label: '开店方式', list: PUBFN.getOptionsList('brandShopMode') },
    { itemType: 'input', placeholder: '请输入', prop: 'brandGroupName', label: '集团名称' },
    { itemType: 'input', placeholder: '请输入', prop: 'brandHqAddress', label: '总部地址' },
    { itemType: 'input', placeholder: '请输入', prop: 'brandKeyProvince', label: '重点发展省份' },
    { itemType: 'input', placeholder: '请输入', prop: 'brandKeyCity', label: '主要分布城市' },
    { itemType: 'input', placeholder: '请输入', prop: 'brandPerCustomerTransaction', label: '客单价(元)', inputType: 'Number', numberConfig: { min: 0, decimal: 2 } },
    { itemType: 'input', placeholder: '请输入', prop: 'brandTel', label: '联系电话', inputType: 'Number', numberConfig: { min: 0, max: 9999999999999, decimal: 0 } },
    { itemType: 'input', placeholder: '请输入', prop: 'brandWebsite', label: '官网地址' },
    { itemType: 'input', type: 'textarea', placeholder: '请输入', prop: 'brandDescription', label: '品牌说明', width: '418px', span: 2 },
    { itemType: 'fileUpload', prop: 'brandLogo', label: 'Logo', btnText: '上传', infoText: '只能上传jpg/png文件，且不超过500kb', width: "423px", limitNum: 4, span: 2 }
  ]
}

// 基本信息不可编辑
export const configDataDitails = () => {
  return [
    { itemType: 'text', prop: 'brandName', label: '品牌名' },
    { itemType: 'text', prop: 'brandId', label: '品牌编码', disabled: true },
    { itemType: 'text', prop: 'brandType', label: '品牌类型', list: PUBFN.getOptionsList('brandType') },
    { itemType: 'text', prop: 'brandOtherName', label: '品牌别名' },
    { itemType: 'text', prop: 'brandLevel', label: '品牌等级', list: PUBFN.getOptionsList('brandLevelChoice') },
    { itemType: 'text', prop: 'brandOperateType', label: '经营性质', list: PUBFN.getOptionsList('brandOperateType') },
    { itemType: 'text', prop: 'brandFormatName', label: '业态' },
    { itemType: 'text', prop: 'brandStoreType', label: '连锁/单店', list: PUBFN.getOptionsList('brandStoreType') },
    { itemType: 'text', prop: 'brandShopMode', label: '开店方式', list: PUBFN.getOptionsList('brandShopMode') },
    { itemType: 'text', prop: 'brandGroupName', label: '集团名称' },
    { itemType: 'text', prop: 'brandHqAddress', label: '总部地址' },
    { itemType: 'text', prop: 'brandKeyProvince', label: '重点发展省份' },
    { itemType: 'text', prop: 'brandKeyCity', label: '主要分布城市' },
    { itemType: 'text', prop: 'brandPerCustomerTransaction', label: '客单价(元)' },
    { itemType: 'text', prop: 'brandTel', label: '联系电话' },
    { itemType: 'text', prop: 'brandWebsite', label: '官网地址' },
    { itemType: 'text', type: 'textarea', prop: 'brandDescription', label: '品牌说明', width: '418px', span: 2 },
    { itemType: 'text', prop: 'brandLogo', label: 'Logo', hasSlot: true, span: 2 }
  ]
}

// 联系人信息可编辑
export const formTableColumnEdit = () => {
  return [
    { brandContactsPerson: '姓名', itemType: 'input', inputType: 'text' },
    { brandContactsTitle: '职位', itemType: 'input', inputType: 'text' },
    { brandContactsTel: '固定电话', itemType: 'input', inputType: 'text' },
    { brandContactsMobile: '手机', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 9999999999999, decimal: 0 } },
    { brandContactsEmail: '邮箱', itemType: 'input', inputType: 'text' },
    { brandContactsStatus: '联系人状态', itemType: 'select', inputType: 'text', list: PUBFN.getOptionsList('brandContactsStatus') }
  ]
}

// 不可编辑
export const formTableColumnDetails = () => {
  return [
    { brandContactsPerson: '姓名', isShowSlots: true },
    { brandContactsTitle: '职位', isShowSlots: true },
    { brandContactsTel: '固定电话', isShowSlots: true },
    { brandContactsMobile: '手机', isShowSlots: true },
    { brandContactsEmail: '邮箱', sortable: false, isShow: true },
    { brandContactsStatus: '联系人状态', isShowSlots: true }
  ]
}

// 合作商家
export const businessColumn = () => {
  return [
    { tenantName: '公司名称', itemType: 'text', inputType: 'text' },
    { programName: '所属项目', itemType: 'text', inputType: 'text' },
    { tenantContactsPerson: '法人', itemType: 'text', inputType: 'text' },
    { legalPersonPosition: '法人职务', itemType: 'text', inputType: 'text' },
    { tenantContactsTel: '电话', itemType: 'text', inputType: 'text' }
  ]
}

// 合作项目
export const projectColumn = () => {
  return [
    { programName: '项目名', itemType: 'text', inputType: 'text' },
    { contNo: '合同号', itemType: 'text', inputType: 'text' },
    { contType: '合同类型', itemType: 'text', inputType: 'text' },
    { jyType: '是否正常解约', itemType: 'text', inputType: 'text' },
    { contEndDate: '到期日', itemType: 'text', inputType: 'text' },
    { daysLeft: '到期天数', itemType: 'text', inputType: 'text' }
  ]
}

import { get, post } from '../interceptor'
import Base from './base.js'

// 审批相关接口
class Approval extends Base {

  // 获取审批单模板及数据接口
  async getTemplateContentText (p, showMsg) {
    const res = await post('process/templateContent/getTemplateContentText', p)
    return res
  }

  // 审批详情
  async getApproveDetail (p, showMsg) {
    const res = await post('approve/getApproveDetail', p)
    return res
  }

  // 审批单追回
  async doRetrieve (p, showMsg) {
    const res = await post('approve/doRetrieve', p)
    return res
  }

  // 意见箱
  async suggesTionBox (p, showMsg) {
    const res = await post('approve/suggesTionBox', p)
    return res
  }

  // 查询已添加审批单推送人员
  async pushFindUserByApproveId (p, showMsg) {
    const res = await post('approve/push/findUserByApproveId', p)
    return res
  }

  // 审批推送
  async addApprovePush (p, showMsg) {
    const res = await post('approve/push/addApprovePush', p)
    return res
  }

  // 推送退回
  async doPushBack (p, showMsg) {
    const res = await post('approve/push/doPushBack', p)
    return res
  }

  // 审批删除
  async deleteApproveById (p, showMsg) {
    const res = await post('approve/deleteApproveById', p)
    return res
  }

  // 获取审批状态reference
  async getApproveStatus (p, showMsg) {
    const res = await post('bs/dict/getApproveStatus', p)
    return res
  }

   // 保存并填写审批人获取审批步骤列表
  async getProcessStepByProcessId (p, showMsg) {
    const res = await post('approve/getProcessStepByProcessId', p, 'loading')
    return res
  }

  // 审批发起
  async startFlow (p, showMsg) {
    const res = await post('approve/startFlow', p, 'loading')
    return res
  }

  // 执行审批步骤
  async doStepFlow (p, showMsg) {
    const res = await post('approve/doStepFlow', p, 'loading')
    return res
  }

  // 获取可驳回的步骤列表
  async getDenyStepList (p, showMsg) {
    const res = await post('approve/getDenyStepList', p)
    return res
  }

   // 上会
   async startMeeting (p, showMsg) {
    const res = await post('approve/startMeeting', p)
    return res
  }

  // 留言共享
  async saveApproveMessage (p, showMsg) {
    const res = await post('approve/message/saveApproveMessage', p, 'loading')
    return res
  }

  // 获取留言信息
  async getApproveMessageList (p, showMsg) {
    const res = await post('approve/message/getApproveMessageList', p)
    return res
  }

  // 获取流程数据
  async getPmProcessFlow (p, showMsg) {
    const res = await post('process/template/getPmProcessFlow', p)
    return res
  }

  // 获取销售合同对应附件
  async loadResAttachList (p, showMsg) {
    const res = await post('abnormal/loadResAttachList', p)
    return res
  }

  // 延期申请查询分页查询
  async findPmApproveDelayPage (p, showMsg) {
    const res = await post('approve/delay/findPmApproveDelayPage', p)
    return res
  }

  // 发起延期申请
  async savePmApproveDelay (p, showMsg) {
    const res = await post('approve/delay/savePmApproveDelay', p)
    return res
  }

  // 延期申请审批
  async doDelayFlow (p, showMsg) {
    const res = await post('approve/delay/doDelayFlow', p)
    return res
  }

  // 申请延期状态数据字典
  async getDelayDict (p, showMsg) {
    const res = await post('approve/delay/getDelayDict', p)
    return res
  }

  // 查询已添加共享人员
  async shareFindUserByApproveId (p, showMsg) {
    const res = await post('approve/share/findUserByApproveId', p)
    return res
  }

  // 创建微信群
   async createWeChat (p, showMsg) {
    const res = await post('approve/createWeChat', p)
    return res
  }

  // 获取微信群成员列表
   async getWeChatUserList (p, showMsg) {
    const res = await post('approve/getWeChatUserList', p)
    return res
  }

  // 合同文本库
  async loginOldPd (p, showMsg) {
    const res = await post('pdoldapi/common/login', p)
    return res
  }

  // 根据companyName查询公司名称下拉框
  async getCompanies (p, showMsg) {
    const res = await post('pdoldapi/budget/expend/companies', p)
    return res
  }

  // 印鉴使用会签单-人力资源-使用范围-下拉选项
  async getSealEngravingApplySheetHr (p, showMsg) {
    const res = await post('bs/dict/getSealEngravingApplySheetHr', p)
    return res
  }

  // 印鉴使用会签单-财务-使用范围
  async getSealEngravingApplySheetFin (p, showMsg) {
    const res = await post('bs/dict/getSealEngravingApplySheetFin', p)
    return res
  }

  // 申请提前解除合约-模糊查询合同编号下拉数据
  async getQuickSearchCont (p, showMsg) {
    const res = await post('abnormal/quickSearchCont', p)
    return res
  }

  // 资金申请表-宝龙集团资金申请表模糊查询下拉数据
  async getFinanceApplyOfBaoLong (p, showMsg) {
    const res = await post('financeApply/financeApplyOfBaoLong', p)
    return res
  }

  // 工程类垄断供方采购申请-招标计划编号模糊查询下拉数据
  async getFinCompanyList (p, showMsg) {
    const res = await post('costCtrlBid/finCompanyList', p)
    return res
  }

  // 工程类垄断供方采购申请-判断招标计划编号是否曾发起
  async isOnDataChainByEngineeNo (p, showMsg) {
    const res = await post('costCtrlBid/isOnDataChainByEngineeNo', p)
    return res
  }

  // 合同评审-根据项目CD查询可选期数并生成新的合同编号
  async generateContractNo (p, showMsg) {
    const res = await post('contract/review/generateContractNo', p)
    return res
  }

   // 合同评审-查询合约规划科目
   async getSubjectFirstLevelList (p, showMsg) {
    const res = await post('contract/review/getSubjectFirstLevelList', p)
    return res
  }

   // 合同评审-查询项目列表
   async quickSearchProject (p, showMsg) {
    const res = await post('contract/review/quickSearchProject', p)
    return res
  }

  // 物业/商业公司请假申请单获取假期类型下拉
  async getMapHolidayType (p, showMsg) {
    const res = await get('api/DictMapApi/getMapHolidayType', p)
    return res
  }

  // 物业/商业公司请假申请单 获取年假可用
  async checkCanUserVacation (p, showMsg) {
    const res = await get('api/vacationInfoApi/checkCanUserVacation', p)
    return res
  }

  // 物业/商业公司请假申请单 获取病假可用
  async getAvaLeaveHour (p, showMsg) {
    const res = await post('sickLeaveApi/getAvaLeaveHour', p)
    return res
  }

  // 销售合同认购书-查询合同文本编号
  async searchContract (p, showMsg) {
    const res = await post('abnormal/searchContract', p)
    return res
  }

  // 证照办理（信息变更、任职变更）-变更公司模糊搜索下拉
  async getListByName (p, showMsg) {
    const res = await get('api/company/listByName', p)
    return res
  }

   // 销售合同认购书-查询营销方案
   async financeMarketingProgram (p, showMsg) {
    const res = await post('financeApply/financeMarketingProgram', p)
    return res
  }

  // 法律事务审批表-快速搜索所有案例
  async fcaseInfoQuerySeach (p, showMsg) {
    const res = await post('fcaseInfo/fcaseInfoQuerySeach', p)
    return res
  }

  // 商业公司法律事务审批-快速搜索品牌列表
  async quickSearchSWTJNew (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSearchSWTJNew', p)
    return res
  }
  // 商业公司法律事务审批-快速搜索品牌列表（新）
  async selectBisContName (p, showMsg) {
    const res = await post('pdoldapi/scContract/selectBisContName', p)
    return res
  }

  // 拟调整网批编号模糊搜索下拉数据
  async quickSearchAdjustCont (p, showMsg) {
    const res = await post('abnormal/quickSearchAdjustCont', p)
    return res
  }

  // 统计用户加班时长
  async overtimeCountApi (p, showMsg) {
    const res = await get('api/overtimeCountApi/getByUserCode', p)
    return res
  }

  // 导入台账
  async importLedger (p, showMsg) {
    const res = await post('approve/standingBook/import', p)
    return res
  }

  // 导入台账确认是否成功
  async getLedgerStatus (p, showMsg) {
    const res = await get('api/approveInfoImportApi/getStatus', p)
    return res
  }

  // 问责
  async insertCenter (p, showMsg) {
    const res = await post('planWorkCenter/insertCenter', p)
    return res
  }

  // 给我
  async giveMe (p, showMsg) {
    const res = await post('approve/giveMe', p)
    return res
  }

  // 补充协议文本库编号列表查询
  async quickSearchForBcxy (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSearchForBcxy', p)
    return res
  }

   // 租赁合同补充条款审批-合同查询
  async quickSerchCont (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSerchCont', p)
    return res
  }

   // 租赁合同补充条款审批-合同详情带出数据
  async quickSerchContDetail (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSerchContDetail', p)
    return res
  }

   // 租赁合同补充条款审批-查询租金减免网批
  async scContractQuickSearchPreBill (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSearchPreBill', p)
    return res
  }

   // 租赁合同补充条款审批-品牌列表查询
  async zlhtQuickSearchSWTJNew (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSearchSWTJNew', p)
    return res
  }

  // 租赁合同补充条款审批-业态查询
   async zlhtQuickSerchContYT (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSerchContYT', p)
    return res
  }

  // 租赁合同补充条款审批-商务条件选择楼层商铺
  async doStoreSelectWithProjectId (p, showMsg) {
    const res = await post('pdoldapi/scContract/doStoreSelectWithProjectId', p)
    return res
  }

  // 租赁合同补充条款审批-根据楼层加载商铺/公寓/多经列表
  async loadStoreList (p, showMsg) {
    const res = await post('pdoldapi/scContract/loadStoreList', p)
    return res
  }

   // 租赁合同补充条款审批-查询经销商
   async quickSerchContJXS (p, showMsg) {
    const res = await post('pdoldapi/scContract/quickSerchContJXS', p)
    return res
  }

   // 租赁合同补充条款审批-获取年数
   async getYearRangeList (p, showMsg) {
    const res = await post('pdoldapi/scContract/getYearRangeList', p)
    return res
  }

  // 租赁合同补充条款审批-获取月数
  async calcMonthCount (p, showMsg) {
    const res = await post('pdoldapi/scContract/calcMonthCount', p)
    return res
  }

  // 报销/入账公司模糊搜索下拉数据
  async postFindCompanyList (p, showMsg) {
    const res = await post('application/findCompanyList', p)
    return res
  }

  // 网批查询号模糊搜索下拉数据
  async quickSearchPreBill (p, showMsg) {
    const res = await post('application/quickSearchPreBill', p)
    return res
  }

  // 网批查询号详情
  async quickSearchPreBillDetail (p, showMsg) {
    const res = await post('application/quickSearchPreBillDetail', p)
    return res
  }

  // 银行和省市下拉数据
  async queryBankTypeAndSysRegion (p, showMsg) {
    const res = await post('application/queryBankTypeAndSysRegion', p)
    return res
  }

  // 支行名称模糊搜索下拉数据old
  async getBankInfoByNameLike (p, showMsg) {
    const res = await post('application/getBankInfoByNameLike', p)
    return res
  }

  // 支行名称模糊搜索下拉数据new
  async findBranchBank (p, showMsg) {
    const res = await post('application/findBranchBank', p)
    return res
  }

  // 代支付公司模糊搜索下拉数据
  async findSapSup (p, showMsg) {
    const res = await post('application/findSapSup', p)
    return res
  }

  // 办公资产入库单模糊搜索下拉数据
  async findOfficeAssetEntryList (p, showMsg) {
    const res = await post('application/findOfficeAssetEntryList', p)
    return res
  }

  // 选择收款人带出银行账号下拉数据
  async findBankAccountByUserId (p, showMsg) {
    const res = await post('application/findBankAccountByUserId', p)
    return res
  }

  // 借款网批号下拉数据
  async quickSearchWithDisplayNo (p, showMsg) {
    const res = await post('application/quickSearchWithDisplayNo', p)
    return res
  }

  // 部门科目剩余预算
  async findBudgetUsedDetail (p, showMsg) {
    const res = await post('application/findBudgetUsedDetail', p)
    return res
  }

  // 新建时获取报销/入账公司
  async findCompanyByOrgCdInLoad (p, showMsg) {
    const res = await post('application/findCompanyByOrgCdInLoad', p)
    return res
  }

  // 事业部有预控币种数据字典
  async findByDictTypeCd (p, showMsg) {
    const res = await post('bs/dict/findByDictTypeCd', p)
    return res
  }

  // 事业部有预控发票内容
  async findSubjectByOrgCd (p, showMsg) {
    const res = await post('application/findSubjectByOrgCd', p)
    return res
  }

  // 事业部有预控会计信息业务类型
  async findBusinessType (p, showMsg) {
    const res = await post('application/findBusinessType', p)
    return res
  }
  // 事业部有预控会计信息业务类型单独处理查询 高兴
  async getFieldsByAuthTypeCd (p, showMsg) {
    const res = await post('application/getFieldsByAuthTypeCd', p)
    return res
  }
  // 事业部有预控导入台账
  async yykImport (p, showMsg) {
    const res = await post('application/import', p)
    return res
  }

  // 带出所属中心总经理
  async getAutoLoadCenterManager (p, showMsg) {
    const res = await post('process/node/getAutoLoadCenterManager', p)
    return res
  }

  // 事业部假期取消单-关联请假单查询号模糊搜索接口
  async findHrHolidayEs (p, showMsg) {
    const res = await post('approve/findHrHolidayEs', p)
    return res
  }

  // 总部加班补休取消表-关联请假单查询号模糊搜索接口
  async findOverTimeEs (p, showMsg) {
    const res = await post('approve/findOverTimeEs', p)
    return res
  }

  // 查询付款单位
  async loadCompanies (p, showMsg) {
    const res = await post('individualMarket/loadCompanies', p)
    return res
  }

  // 查询收款单位
  async loadFinSap (p, showMsg) {
    const res = await post('individualMarket/loadFinSap', p)
    return res
  }

  // 根据公司名称获取银行列表
  async loadBankInfo (p, showMsg) {
    const res = await post('individualMarket/loadBankInfo', p)
    return res
  }

  // 根据公司编号获取融资合同信息
  async getFinLoanCont (p, showMsg) {
    const res = await post('individualMarket/getFinLoanCont', p)
    return res
  }

  // 支付往来款-收款单位供应商校验
  async checkSupInsideSupplier (p, showMsg) {
    const res = await post('individualMarket/checkSupInsideSupplier', p)
    return res
  }

  // 查询网批号
  async selectResApproveInfo (p, showMsg) {
    const res = await post('pdoldapi/scContract/selectResApproveInfo', p)
    return res
  }

  // 营销费用支付审批表-公司名称模糊搜索接口
  async getLoadCompanies (p, showMsg) {
    const res = await get('api/loadCompaniesApi/getLoadCompanies', p)
    return res
  }

  // 营销费用支付审批表-单项营销方案编号接口
  async findEsApprove (p, showMsg) {
    const res = await post('approve/findEsApprove', p)
    return res
  }

  // 营销费用支付审批表-合同编号模糊搜索接口
  async quickSearchCont (p, showMsg) {
    const res = await get('api/loadCompaniesApi/quickSearchCont', p)
    return res
  }

   // 查询网批号
  async findResUserCd (p, showMsg) {
    const res = await post('pdoldapi/scContract/findResUserCd', p)
    return res
  }
   // 校验接口
   async checkBukrsPlate (p, showMsg) {
    const res = await post('pdoldapi/scContract/checkBukrsPlate', p)
    return res
  }

  // 营销费用支付审批表-结佣凭证网批号
  async searchResApproveContentByResDisplyNo (p, showMsg) {
    const res = await post('loadCompaniesApi/searchResApproveContentByResDisplyNo', p)
    return res
  }

  // 营销费用支付审批表-输入金额或选择税率触发校验接口
  async getRemainAmount (p, showMsg) {
    const res = await get('api/loadCompaniesApi/getRemainAmount', p)
    return res
  }

  // 营销费用支付审批表-当前季度查询营销费用预算维护
  async findCostQuarBudgetAmt (p, showMsg) {
    const res = await post('loadCompaniesApi/findCostQuarBudgetAmt', p)
    return res
  }

  //往来款审批表- 会计节点业务我类型
  async getFinBusinessTypeList (p, showMsg) {
    const res = await get('api/loadCompaniesApi/getFinBusinessTypeList', p)
    return res
  }

  // 支付往来款 根据入账公司和代付公司查询公司定义是否是其它
  async findParallelTableByCompanyName (p, showMsg) {
    const res = await post('pdoldapi/scContract/findParallelTableByCompanyName', p)
    return res
  }

  // 由商业公司发起的商务条件-意向商户下拉接口
  async findBisShopList (p, showMsg) {
    const res = await post('ccbill/findBisShopList', p)
    return res
  }

  // 由商业公司发起的商务条件-经销商列表
  async getNewMapShopConn (p, showMsg) {
    const res = await post('ccbill/getNewMapShopConn', p)
    return res
  }

  // 由商业公司发起的商务条件-获取意向商户业态
  async getLayoutNameAndIdNew (p, showMsg) {
    const res = await post('ccbill/getLayoutNameAndIdNew', p)
    return res
  }

  // 由商业公司发起的商务条件-选择楼层(号)
  async doStoreSelectWithProjectId (p, showMsg) {
    const res = await post('pdoldapi/scContract/doStoreSelectWithProjectId', p)
    return res
  }

  // 由商业公司发起的商务条件-选择楼层获取商铺列表
  async loadStoreList (p, showMsg) {
    const res = await post('pdoldapi/scContract/loadStoreList', p)
    return res
  }

  // 由商业公司发起的商务条件-商铺详细信息
  async getStoreInfo (p, showMsg) {
    const res = await post('ccbill/getStoreInfo', p)
    return res
  }

  // 由商业公司发起的商务条件-获取项目信息
  async getProjectInfo (p, showMsg) {
    const res = await post('ccbill/getProjectInfo', p)
    return res
  }

  // 明源-格式化PageUrl链接
  async pageMyPageUrl (p, showMsg) {
    const res = await post('approve/external/parseMyPageUrl', p)
    return res
  }

  // 明源-格式化FileUrl链接
  async parseMyFileUrl (p, showMsg) {
    const res = await post('approve/external/parseMyFileUrl', p)
    return res
  }

  // 由商业公司发起的商务条件-查询上份合同信息
  async getPreContByBisStoreId (p, showMsg) {
    const res = await post('ccbill/getPreContByBisStoreId', p)
    return res
  }

  // 由商业公司发起的商务条件-查询当前有效合同中是否存在该铺位对应的合同
  async getContByIds (p, showMsg) {
    const res = await post('ccbill/getContByIds', p)
    return res
  }

  // 由商业公司发起的商务条件-选择铺位合同时间等信息获取租金及物管费
  async standardFeeCalc (p, showMsg) {
    const res = await post('ccbill/standardFeeCalc', p)
    return res
  }

  // 查询成本中心
  async getSapCsksList (p, showMsg) {
    const res = await get('/api/application/getSapCsksList', p)
    return res
  }

   // 查询实际入账科目
  async getpaySubjectList (p, showMsg) {
    const res = await get('/api/application/getSubjectList', p)
    return res
  }

  //事业部有无预控费用报销单-无预控查询报销场景
  async findSceneType(p, showMsg) {
    const res = await post('application/findSceneType', p)
    return res
  }

  //事业部有无预控费用报销单-查询多个科目剩余预算
  async findMoreBudgetUsedDetail(p, showMsg) {
    const res = await post('application/findMoreBudgetUsedDetail', p)
    return res
  }

  //事业部有无预控费用报销单-查询业务类型
  async selectSubjectBySceneId(p, showMsg) {
    const res = await post('application/selectSubjectBySceneId', p)
    return res
  }

  // 由商业公司发起的商务条件-免租期日期转换
  async builderFreeDay (p, showMsg) {
    const res = await post('ccbill/builderFreeDay', p)
    return res
  }

  //会计节点查询业务类型
  async loadBussinessTypeByCode (p, showMsg) {
    const res = await post('loadBusinessType/loadBussinessTypeByCode', p)
    return res
  }

  // 由商业公司发起的商务条件-免租期日期转换
  async builderFreeDay (p, showMsg) {
    const res = await post('ccbill/builderFreeDay', p)
    return res
  }

  // 由商业公司发起的商务条件-租金计算
  async feeCalc (p, showMsg) {
    const res = await post('ccbill/feeCalc', p)
    return res
  }

  // 由商业公司发起的商务条件-签约类型，空置期
  async getMapShopHis (p, showMsg) {
    const res = await post('ccbill/getMapShopHis', p)
    return res
  }

  // 由商业公司发起的商务条件-预实比
  async getBudgetStoreInfo (p, showMsg) {
    const res = await post('ccbill/getBudgetStoreInfo', p)
    return res
  }

  // 由商业公司发起的商务条件-50天内有没有发起网批
  async getApproveContent (p, showMsg) {
    const res = await post('ccbill/getApproveContent', p)
    return res
  }

  // 由商业公司发起的商务条件-新建合同文本
  async getNewContParam (p, showMsg) {
    const res = await post('ccbill/getNewContParam', p)
    return res
  }

  // 由商业公司发起的商务条件-获取累计总租金
  async findBisCommerceTatal (p, showMsg) {
    const res = await get('/api/ccbill/findBisCommerceTatal', p)
    return res
  }

  // 获取创建合同文本之后合同文本号
  async findContNo (p, showMsg) {
    const res = await get('/api/ccbill/findContNo', p)
    return res
  }

  // 查询关联立项网批号
  async getResIdByDisplayNo (p, showMsg) {
    const res = await post('financingAuditBill/getResIdByDisplayNo', p)
    return res
  }

  // 根据网批号模糊查询
  async gettResApproveInfo (p, showMsg) {
    const res = await get('/api/finPublicBenefitApi/quickSearchDisplay', p)
    return res
  }

  // 根据网批号查询余额
  async findBudgetMoney (p, showMsg) {
    const res = await get('/api/finPublicBenefitApi/findBudgetMoney', p)
    return res
  }

  // 业务条线
  async getTechnologyTypeList (p, showMsg) {
    const res = await get('/api/materialEquipPriceOpenApi/getTechnologyTypeList', p)
    return res
  }

  // 合同编号
  async postFindContNoList (p, showMsg) {
    const res = await post('materialEquipPriceOpenApi/postFindContNoList', p)
    return res
  }

  // 人事职级下拉数据
  async quickSearchRank (p, showMsg) {
    const res = await post('hrChangeBldcOpenApi/quickSearchRank', p)
    return res
  }

  // 事业部个人费用报销单
  async queryExpenseBill (p, showMsg) {
    const res = await post('expenseInfo/queryExpenseBill', p)
    return res
  }

  // 公积金费用申请单-根据方案号模糊查询
  async queryActionId (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionId', p)
    return res
  }

  // 公积金费用申请单-根据方案号查询信息
  async queryActionList (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionList', p)
    return res
  }

  // 股权收购款审批表-模糊查询网批号
  async quickSearchResApproveEquity (p, showMsg) {
    const res = await post('resApproveEquity/quickSearch', p)
    return res
  }

  // 股权收购款审批表-通过上级网批号获得金额
  async equitySearchResApproveEquity (p, showMsg) {
    const res = await post('resApproveEquity/equitySearch', p)
    return res
  }

  // 根据方案号模糊查询
  async queryActionId (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionId', p)
    return res
  }

  // 根据方案号查询信息
  async queryActionList (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionList', p)
    return res
  }

  // 查询总部辞职原因下拉框项目数据
  async getShrRes (p, showMsg) {
    const res = await post('hrResignApproveBlzbOpenApi/quickSearchShr', p)
    return res
  }

  // 查询装补合同网批号
  async quickSearchCommercialCompanyContractResapprove (p, showMsg) {
    const res = await post('commercial/quickSearchCommercialCompanyContractResapprove', p)
    return res
  }

  // 获取场景列表数据
  async getSceneList (p, showMsg) {
    const res = await post('application/findSceneType', p)
    return res
  }

  // 根据方案号模糊查询
  async queryActionId (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionId', p)
    return res
  }

  // 根据方案号查询信息
  async queryActionList (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/queryActionList', p)
    return res
  }

  // 查询总部辞职原因下拉框项目数据
  async getShrRes (p, showMsg) {
    const res = await post('hrResignApproveBlzbOpenApi/quickSearchShr', p)
    return res
  }

  // 查询装补合同网批号
  async quickSearchCommercialCompanyContractResapprove (p, showMsg) {
    const res = await post('commercial/quickSearchCommercialCompanyContractResapprove', p)
    return res
  }

  // 获取场景列表数据
  async getSceneList (p, showMsg) {
    const res = await post('application/findSceneType', p)
    return res
  }

  // 公积金申请单-校验部门信息
  async checkDepartment (p, showMsg) {
    const res = await get('api/finAccumulationFundInfoApi/checkDepartment', p)
    return res
  }

  // 查询合同信息
  async quickSearchContDetail (p, showMsg) {
    const res = await post('bizpaychargebill/quickSearchContDetail', p)
    return res
  }

  //宝龙地产/地产/04-行政人事/行政管理/通用-办公资产入单-资产采购单号模糊搜索接口
  async postAssmAppInfo (p, showMsg) {
    const res = await post('pdoldapi/common/assmApp', p)
    return res
  }

  // 模糊查询招聘编码下拉数据
  async quickSearchEmployee (p, showMsg) {
    const res = await post('employeeOpenApi/quickSearchEmployee', p)
    return res
  }

  // 宝龙地产/地产/04-行政人事/行政管理/通用-办公资产入单-财务入账公司模糊搜索接口
  async postAccCompanyInfo (p, showMsg) {
    const res = await post('application/findCompanyByCodeOrNameLikeList', p)
    return res
  }

  // 宝龙地产/地产/04-行政人事/行政管理/通用-办公资产入单-资产属性接口
  async postAssListInfo (p, showMsg) {
    const res = await post('pdoldapi/common/assList', p)
    return res
  }

  // 查询总部辞退原因下拉框项目数据
  async getTurnRes (p, showMsg) {
    const res = await post('employeeTransferFireOpenApi/quickSearchTurn', p)
    return res
  }

  // 工程、材料设备质保金付款审批表 - 获取区域
  async getSystemArea(p, showMsg) {
    const res = await get('api/materialMarginPayment/getSystemArea', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 查询合同编号
  async quickSearchWithZBJ(p, showMsg) {
    const res = await post('materialMarginPayment/quickSearchWithZBJ', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 获取工程、材料设备质保金付款数据
  async quickRetentionMoneyData(p, showMsg) {
    const res = await post('materialMarginPayment/quickRetentionMoneyData', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 合同评审网批是已完成状态才可以发起付款、结算
  async findContractReview(p, showMsg) {
    const res = await post('materialMarginPayment/findContractReview', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 校验付款金额是否超额
  async checkApplyTaxPrice(p, showMsg) {
    const res = await post('materialMarginPayment/checkTaxPrice', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 验证合同是否准备完毕
  async checkContLedger(p, showMsg) {
    const res = await post('materialMarginPayment/getRemainAmount', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 获取项目税率
  async getCurrentRate(p, showMsg) {
    const res = await post('materialMarginPayment/getCurrentRate', p);
    return res;
  }

  // 工程、材料设备质保金付款审批表 - 检查是否是明源上线
  async checkOnlineMYStatus(p, showMsg) {
    const res = await post('materialMarginPayment/checkOnlineMYStatus', p);
    return res;
  }

  // 工资费用申请单-模糊查询
  async querySalaryActionId(p, showMsg) {
    const res = await get('api/finSalaryInfoApi/queryActionId', p);
    return res;
  }

  // 工资费用申请单-模糊查询
  async querySalaryActionList(p, showMsg) {
    const res = await get('api/finSalaryInfoApi/queryActionList', p);
    return res;
  }

  // 商业集团招待费用报销-查询关联立项网批号
  async bizQuickSearchPreBill (p, showMsg) {
    const res = await post('bizEntertainChargeBill/quickSearchPreBill', p)
    return res
  }

  // 商业集团其他费用支出（人工）-查询网批号
  async getBizResIdByDisplayNo (p, showMsg) {
    const res = await post('bizpaychargeotherbill/resIdByDisplayNo', p)
    return res
  }

  // 根据费用承担部门以及科目名称查询科目cd
  async getSubjectCdByOrgCd (p, showMsg) {
    const res = await post('application/getSubjectCdByOrgCd', p)
    return res
  }
  // 银行付款(缺票)-获取所有的银行付款号
  async quickSearchGetAllPay (p, showMsg) {
    const res = await get('api/bankPaymentInvoice/quickSearchGetAllPay', p)
    return res
  }

  // 银行付款(缺票)-根据银行付款单号查询合同信息以及部分支付信息(网批：银行付款(缺票))
  async getContAndInvoiceInfo (p, showMsg) {
    const res = await get('api/bankPaymentInvoice/getContAndInvoiceInfo', p)
    return res
  }

  // 土地、拆迁付款审批单 - 根据合同号查询定标网批id和编号
  async getDecideDisplayByContNo(p, showMsg) {
    const res = await get('api/landRemovePaymentBill/getDecideDisplayByContNo', p)
    return res
  }

  // 土地、拆迁付款审批单 - 根据合同编号付款判断网批是否取票（不含税）
  async compareInvoicePay(p, showMsg) {
    const res = await get('api/landRemovePaymentBill/compareInvoicePay', p)
    return res
  }

  // 土地、拆迁付款审批单 - 检验数据
  async verify(p, showMsg) {
    const res = await get('api/landRemovePaymentBill/verify', p)
    return res
  }

   // 取得职级
  async quickSearchBizRank (p, showMsg) {
    const res = await get('bizHrChangeSygsOpenApi/quickSearchBizRank', p)
    return res
  }

  // 通过processId查询processCode
  async findPmProcessByVo(p, showMsg) {
    const res = await post('process/findPmProcessByVo', p);
    return res;
  }

  // 查询资产列表
  async assetsQuickSearch(p, showMsg) {
    const res = await get('api/assetsSaleSheetSyDc/quickSearch', p);
    return res;
  }
  // 取得商业公司id
  async getProjectId (p, showMsg) {
    const res = await post('fixedAssetsApplyForSygs/getProjectId', p)
    return res
  }

  // 取得设备型号的带出数据
  async getAssmModelData (p, showMsg) {
    const res = await post('fixedAssetsApplyForSygs/getAssmModelData', p)
    return res
  }

  // 取得二级设备折旧
  async getAssmDepreciationByModelId (p, showMsg) {
    const res = await post('fixedAssetsApplyForSygs/getAssmDepreciationByModelId', p)
    return res
  }
  
  // 资产采购单号
  async getCodePrefix (p, showMsg) {
    const res = await post('fixedAssetsApplyForSygs/getCodePrefix', p)
    return res
  }

  // 社保费用申请单-根据方案号模糊查询
  async queryActionIdBySecurity (p, showMsg) {
    const res = await get('api/finSocialSecurityInfoApi/queryActionIdBySecurity', p)
    return res
  }

  // 社保费用申请单-根据方案号查询列表信息
  async queryActionListBySecurity (p, showMsg) {
    const res = await get('api/finSocialSecurityInfoApi/queryActionListBySecurity', p)
    return res
  }

  //根据orgCd查询带出父节点
  async getCenterParent (p, showMsg) {
    const res = await post('application/getCenterParent', p)
    return res
  }
  
  // 剩余目标成本
  async getRestTotal (p, showMsg) {
    const res = await post('bizpaychargeotherbill/getRestTotal', p)
    return res
  }

  // 出行方式下拉
  async getMapTravelWay(p, showMsg) {
    const res = await get('api/dictApi/getDictByTypeCd', p)
    return res
  }

  // 查询付款公司下的供应商主数据且非内部供应商
  async finSapSupNotInsideSupplier (p, showMsg) {
  const res = await post('finPrincipalPayEas/finSapSupNotInsideSupplier', p)
    return res
  }

  // 内部统借统还时-判断是否是上市与非上市调拨流出
  async loadListedAndUnlisted (p, showMsg) {
    const res = await post('finPrincipalPayEas/loadListedAndUnlisted', p)
    return res
  }
  
  // 城市下拉数据查询
  async getCityList (p, showMsg) {
    const res = await post('hrTripApplyNew1OpenApi/getCityList', p)
    return res
  }

  // 城市公司无预控报销单-查询包干比例
  async findBGBL (p, showMsg) {
    const res = await post('application/findBGBL', p)
    return res
  }

  // 单项营销方案审批表- 查询是否维护了权益占比
  async findCostEquityRatio (p, showMsg) {
    const res = await post('costAmt/findCostEquityRatio', p)
    return res
  }

  // 资产编码唯一性
  async checkCode (p, showMsg) {
    const res = await post('fixedAssetsApplyForSygs/checkCode', p)
    return res
  }
	//获取集团成员公司
	async groupMember (p) {
		const res = await post('upsign/groupMember', p,'notloading','JSON',true)
		return res
	}
	//印章列表/plpms-signup/open/signOnline/querySeals
	async querySeals (p){
		const res = await post('upsign/querySeals', p,'loading','JSON',true)
		return res
	}
	async uploadFil(p){
		const res = await post('upsign/fileUpload', p,'notloading','JSON',true)
		return res
	}
	async loadFiles(p,fileIds){
		const res = await post(`upsign/loadFiles/${fileIds}`, p,'notloading','FORMDATE',false)
		return res
	}
	//缩略图
	async chapterFilesAbbs(p) {
		const res = await post('upsign/chapterFilesAbbs', p,'notloading','JSON',true)
		return res
	}
	//base64编码
	async loadBase64Codes(p) {
		const res = await post('upsign/loadBase64Codes', p,'notloading','JSON',false)
		return res
	}
	//word转pdf
	async word2pdf(p) {
		const res = await post('upsign/word2pdf', p,'notloading','JSON',true)
		return res
	}
	async sendContractsSync(p) {
		const res = await post('upsign/sendContractsSync', p,'notloading','JSON',true)
		return res
	}
}

const approval = new Approval()
export default approval

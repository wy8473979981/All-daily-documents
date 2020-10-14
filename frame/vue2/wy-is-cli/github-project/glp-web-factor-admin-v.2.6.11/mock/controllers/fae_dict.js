import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line
export default class fae_dict extends Controller {
  // MOCK-COMMON @RequestMapping({ url: '/glp-fae/dictionary/list', method: 'get' })
  get (req, res, context) {
    // eslint-disable-next-line
    return {"fundType":{"label":"款项类型","values":[{"label":"本金","key":"Principal"},{"label":"预收利息","key":"PreInterest"},{"label":"利息","key":"Interest"},{"label":"手续费","key":"Fee"},{"label":"宽限期利息","key":"GracePeriod"},{"label":"罚息","key":"Penalty"},{"label":"服务费逾期利息","key":"FeeOverdue"},{"label":"其他","key":"Undefined"},{"label":"空","key":"None"},{"label":"任意","key":"Arbitrary"}]},"interestSettleType":{"label":"结息方式","values":[{"label":"利随本清","key":"interest200"},{"label":"前置利息","key":"interest201"},{"label":"先提利息","key":"interest301"},{"label":"本息付清","key":"interest401"}]},"dcFlag":{"label":"借贷标志","values":[{"label":"借方","key":"Dr"},{"label":"贷方","key":"Cr"}]},"dateType":{"label":"时间类型","values":[{"label":"记账时间","key":"1"},{"label":"生成时间","key":"2"},{"label":"同步JDE时间","key":"3"}]},"transType":{"label":"交易方向类型","values":[{"label":"放款","key":"LOAN"},{"label":"还款","key":"REPAYMENT"}]},"transactionVouvherType":{"label":"流水生成凭证状态","values":[{"label":"已生成","key":"1"},{"label":"未生成","key":"2"},{"label":"生成失败","key":"3"}]},"jdeType":{"label":"JDE凭证类型描述","values":[{"label":"B1","key":"B1"},{"label":"B2","key":"B2"},{"label":"B3","key":"B3"},{"label":"B4","key":"B4"},{"label":"B5","key":"B5"},{"label":"B6","key":"B6"},{"label":"B7","key":"B7"},{"label":"B8","key":"B8"},{"label":"B9","key":"B9"},{"label":"C1","key":"C1"},{"label":"C2","key":"C2"},{"label":"C3","key":"C3"},{"label":"C4","key":"C4"},{"label":"C5","key":"C5"},{"label":"C6","key":"C6"}]},"syncJdeStatus":{"label":"同步JDE状态","values":[{"label":"已同步","key":"1"},{"label":"未同步","key":"2"},{"label":"同步失败","key":"3"}]},"channel":{"label":"渠道","values":[{"label":"普洛斯商业保理","key":"A0004"},{"label":"金融服务平台联合贷","key":"A0001"},{"label":"普链保资金方","key":"A0002"},{"label":"车险分期信托","key":"A0003"}]},"downloadType":{"label":"文件导出状态类型","values":[{"label":"生成中","key":"1"},{"label":"生成成功","key":"2"},{"label":"生成失败","key":"3"},{"label":"已删除","key":"4"}]},"reverseFlag":{"label":"反冲标志","values":[{"label":"未反冲","key":"Unreverse"},{"label":"被反冲","key":"Reversed"},{"label":"反冲流水","key":"ToReverse"},{"label":"空","key":"None"}]},"tradeType":{"label":"交易类型","values":[{"label":"付款核销","key":"PAYMENT_WRITE_OFF"},{"label":"收款核销","key":"REPAYMENT_WRITE_OFF"},{"label":"退款核销","key":"REFUND_BALANCE"},{"label":"收付抵扣","key":"RECEIVING_PAYMENT"},{"label":"外部系统同步","key":"OUT_SYSTEM_SYN"},{"label":"开票成功","key":"INVOICE_SUCCESS"},{"label":"开票红冲","key":"INVOICE_RED_DASHED"}]}}
  }

  // MOCK-COMMON @RequestMapping({ url: '/api/item/getItems', method: 'get' })
  get1 (req, res, context) {
    // eslint-disable-next-line
    return {"bank_dsfkhlx":{"label":"第三方客户类型","values":[{"label":"企业","key":1},{"label":"个人","key":2}]},"contract_status":{"label":"合同状态","values":[{"label":"未生成","key":1},{"label":"签约中","key":2},{"label":"签署完成","key":3}]},"debt_audit_node":{"label":"审批节点","values":[{"label":"法务经办","key":1},{"label":"法务复核","key":2},{"label":"运营经办","key":3},{"label":"运营复核","key":4}]},"audit_status":{"label":"审批状态","values":[{"label":"通过","key":1},{"label":"驳回","key":2},{"label":"拒绝","key":3}]},"bank_shzt":{"label":"审核状态","values":[{"label":"审核中","key":0},{"label":"通过","key":1},{"label":"拒绝","key":2}]},"quota_loop":{"label":"循环额度","values":[{"label":"循环","key":"CYCLE"},{"label":"非循环","key":"NON_CYCLE"}]},"bank_dsfzjlx":{"label":"第三方证件类型","values":[{"label":"身份证","key":1},{"label":"营业执照","key":3}]},"khdl":{"label":"代理人状态","values":[{"label":"禁用","key":0},{"label":"启用","key":1}]},"project_jczqsxsj":{"label":"基础债权生效时间","values":[{"label":"运单完成时间","key":1},{"label":"发车时间","key":2}]},"claim_circulation_status":{"label":"单据流转状态","values":[{"label":"未转让","key":1},{"label":"转让锁定","key":2},{"label":"已转让","key":3},{"label":"作废","key":4}]},"project_jczqzftj_start":{"label":"基础债券作废条件","values":[{"label":"基础债权生效时间","key":1}]},"bank_zhlx":{"label":"账户类型","values":[{"label":"还款","key":1},{"label":"翻单","key":2},{"label":"代偿","key":3},{"label":"保证金","key":4}]},"project_zjlx":{"label":"资金流向","values":[{"label":"无要求","key":1},{"label":"翻单支付","key":2},{"label":"定向支付","key":3}]},"refund_status":{"label":"拨付状态","values":[{"label":"审批中","key":1},{"label":"已关闭","key":2},{"label":"已驳回","key":3},{"label":"已拨付","key":5},{"label":"审批中","key":4}]},"invoice_syzt":{"label":"使用状态","values":[{"label":"已使用","key":1},{"label":"未使用","key":2},{"label":"已作废","key":3}]},"bank_shtczz":{"label":"上海同城转账","values":[{"label":"已开启","key":1},{"label":"未开启","key":0}]},"bank_cjly":{"label":"创建来源","values":[{"label":"客户","key":1},{"label":"运营","key":2}]},"project_jczqzftj_end":{"label":"基础债券作废条件","values":[{"label":"风控审批最长期限","key":1},{"label":"自定义","key":2}]},"invoice_kplm":{"label":"开票类目","values":[{"label":"利息费","key":1},{"label":"手续费","key":2}]},"project_qqfs":{"label":"确权方式","values":[{"label":"买方线上确权","key":1},{"label":"无线上确权要求","key":2}]},"qykh":{"label":"企业","values":[{"label":"营业执照","key":3},{"label":"CI证书","key":4},{"label":"新加坡公司商业注册证","key":6}]},"contract_type":{"label":"合同类型","values":[{"label":"授信合同","key":1},{"label":"企业最高额保证担保函","key":2},{"label":"个人最高额保证担保函","key":3},{"label":"商业保理合同","key":4},{"label":"应收账款转让通知函","key":5},{"label":"应收账款转让通知确认函","key":6},{"label":"应收账款转让登记协议","key":7},{"label":"企业担保函","key":8},{"label":"个人担保函","key":9},{"label":"保理产品提用申请单","key":10},{"label":"票据质押合同","key":11},{"label":"合作协议","key":12},{"label":"补充协议","key":13},{"label":"其他","key":14}]},"project_jczqlx":{"label":"基础债权类型","values":[{"label":"商票","key":1},{"label":"运单类","key":2},{"label":"无要求","key":3}]},"invoice_yzzt":{"label":"验证状态","values":[{"label":"失败","key":0},{"label":"成功","key":1}]},"bank_dzyhklx":{"label":"到账银行卡类型","values":[{"label":"非三方","key":1},{"label":"第三方","key":2}]},"audit_node":{"label":"审批节点","values":[{"label":"运营经办","key":1},{"label":"法务经理","key":2},{"label":"法务负责人","key":3},{"label":"运营复核","key":4}]},"grkh":{"label":"个人","values":[{"label":"身份证","key":1},{"label":"护照","key":2},{"label":"港澳居民来往内地通行证","key":5},{"label":"香港身份证","key":13}]},"project_yszkzrlx":{"label":"应收账款转让类型","values":[{"label":"一次性转让","key":1},{"label":"按笔转让","key":2}]},"quota_edsx":{"label":"额度属性","values":[{"label":"借款人(自用额度)","key":"DIRECT"},{"label":"保证担保额度","key":"GUARANTEE"},{"label":"交易对手","key":"COUNTERPARTY"}]},"repay_hkzt":{"label":"回款状态","values":[{"label":"已操作","key":1},{"label":"待处理","key":2},{"label":"处理中","key":3}]},"project_sjcsfs":{"label":"数据传输方式","values":[{"label":"人工上传","key":1},{"label":"数据对接","key":2}]},"status":{"label":"签署状态","values":[{"label":"审核中","key":1},{"label":"审核通过","key":2},{"label":"审核驳回","key":3},{"label":"审核拒绝","key":4},{"label":"未签署","key":0},{"label":"用户签署中","key":30},{"label":"签署完成","key":40},{"label":"撤销","key":60},{"label":"超时","key":70},{"label":"失败","key":80},{"label":"拒绝","key":81},{"label":"成功","key":90},{"label":"待审核","key":1},{"label":"审核中","key":2},{"label":"被驳回","key":3},{"label":"已通过","key":4},{"label":"已作废","key":5},{"label":"未签署","key":1},{"label":"已签署","key":2},{"label":"拒绝签署","key":3}]},"project_zwhkr":{"label":"最晚还款日","values":[{"label":"基础债权生效时间+风控审批最长期限","key":1},{"label":"自定义","key":2},{"label":"票据最晚还款日","key":3},{"label":"经计算后自然月最后一天","key":4}]},"use_status":{"label":"使用状态","values":[{"label":"未使用","key":1},{"label":"已预占","key":2},{"label":"已使用","key":3},{"label":"已作废","key":4}]},"claim_bill_type":{"label":"单据类型","values":[{"label":"公路运单","key":1010},{"label":"铁路运单","key":1020},{"label":"水运单","key":1030},{"label":"发车单","key":1040},{"label":"铁运计划单","key":1050}]},"business_type":{"label":"业务类型","values":[{"label":"金融产品","key":0},{"label":"客户账号","key":1}]},"debt_cancel_audit_node":{"label":"审批节点","values":[{"label":"运营经办","key":1},{"label":"运营复审","key":2}]},"signer_type":{"label":"签署方类型","values":[{"label":"保理商","key":1},{"label":"授信企业","key":2},{"label":"买方","key":3},{"label":"卖方","key":4},{"label":"担保方","key":5},{"label":"自定义","key":6}]},"is_risk":{"label":"是否碰撞","values":[{"label":"否","key":0},{"label":"是","key":1}]},"project_zdqfgz_one":{"label":"自动清分规则","values":[{"label":"即时清分","key":1},{"label":"最晚还款日≤实际还款日所在自然月的最后一天","key":2}]},"settlement_status":{"label":"结算状态","values":[{"label":"正常","key":1}]},"invoice_kpzt":{"label":"开票状态","values":[{"label":"未开票","key":0},{"label":"开票中","key":1},{"label":"开票成功","key":2},{"label":"开票失败","key":3}]},"project_zqzrtzlx":{"label":"债权转让通知类型","values":[{"label":"通知有回执","key":1},{"label":"通知无回执","key":2},{"label":"无通知","key":3}]},"target_type":{"label":"关联对象","values":[{"label":"授信额度","key":1},{"label":"买卖方关系","key":2},{"label":"应收账款","key":3},{"label":"融资订单","key":4},{"label":"合同","key":5}]},"invoice_pczt":{"label":"批次状态","values":[{"label":"已验证","key":0},{"label":"识别中","key":1},{"label":"待确认验证","key":2}]},"invoice_sqly":{"label":"申请来源","values":[{"label":"购方申请","key":1},{"label":"销方申请","key":2},{"label":"系统申请","key":3}]},"project_sfzdqf":{"label":"是否自动清分","values":[{"label":"是","key":1},{"label":"否","key":2}]},"active_status":{"label":"有效状态","values":[{"label":"无效","key":0},{"label":"有效","key":1}]},"product_type":{"label":"产品类型","values":[{"label":"普运贷","key":1},{"label":"普链保","key":2},{"label":"非普系","key":3},{"label":"产品（测试1）","key":0}]},"quota_ywbq":{"label":"业务标签","values":[{"label":"普链保","key":"GLP_CHAIN_FACTORING"},{"label":"普运贷","key":"GLP_TRANSPORT"},{"label":"保理额度","key":"FACTORING"},{"label":"租赁额度","key":"LEASE"},{"label":"供应链额度","key":"SUPPLY_CHAIN"},{"label":"小贷额度","key":"LOAN"},{"label":"普货贷","key":"GLP_GOODS"},{"label":"普数贷","key":"GLP_DATA"},{"label":"普业贷","key":"GLP_BUSINESS"},{"label":"普链采","key":"GLP_CHAIN_PURCHASE"},{"label":"其他","key":"OTHER"}]},"bank_zhzt":{"label":"状态","values":[{"label":"启用","key":1},{"label":"禁用","key":0}]},"project_fkspl":{"label":"放款审批流","values":[{"label":"放款审批|标准","key":1},{"label":"自动审批","key":2}]},"sign_method":{"label":"签署方式","values":[{"label":"网上签署","key":1},{"label":"线下签署","key":2},{"label":"无需签署","key":3}]},"invoice_fplx":{"label":"发票类型","values":[{"label":"正票","key":1},{"label":"红票","key":2}]},"project_zdqfgz_two":{"label":"自动清分规则","values":[{"label":"最晚还款日-实际还款日<X天","key":1}]},"project_qxr":{"label":"起息日","values":[{"label":"打款成功日期","key":1},{"label":"财务审核通过日期","key":2}]},"bank_jgyhklx":{"label":"监管银行卡类型","values":[{"label":"实户","key":1},{"label":"虚户","key":2}]},"audit_type":{"label":"审批类型","values":[{"label":"通过","key":1},{"label":"驳回","key":2}]},"fjlx":{"label":"附件类型","values":[{"label":"企业营业执照","key":2011},{"label":"企业法人身份证信息页","key":2021},{"label":"企业法人身份证国徽页","key":2022}]},"invoice_yszt":{"label":"有效状态","values":[{"label":"无效","key":0},{"label":"有效","key":1}]}}
  }
}

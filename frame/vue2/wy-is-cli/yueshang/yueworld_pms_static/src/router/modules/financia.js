/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 财务管理
 */
const financiaRouter = {
  name: 'Financia',
  title: '财务管理',
  redirect: '/FinancialManagementConfig/SetFilePointer',
  children: [
    {
      title: '财务配置',
      name: 'FinancialManagementConfig',
      redirect: '/FinancialManagementConfig/SetFilePointer',
      children: [
        {
          name: 'SetFilePointer',
          title: '账套'
        },
        {
          name: 'AccountingSubject',
          title: '会计科目'
        },
        {
          name: 'FeeModuleList',
          title: '费用项'
        },
        {
          name: 'SubjectRelation',
          hidden: true, // 是否在左侧菜单显示true开启
          title: '科目关系',
          parentName: 'FeeModuleList'
        },
        {
          name: 'TaxModuleList',
          title: '税率'
        },
        {
          name: 'TaxWithSubject',
          hidden: true, // 是否在左侧菜单显示true开启
          title: '科目关系',
          parentName: 'TaxModuleList'
        },
        {
          name: 'TaxWithFeeList',
          hidden: true, // 是否在左侧菜单显示true开启
          title: '费项关系',
          parentName: 'TaxModuleList'
        },
        {
          name: 'CashflowModuleList',
          title: '现金流'
        },
        {
          name: 'AccountingProces',
          title: '辅助核算'
        },
        {
          name: 'BankAccounts',
          title: '银行账户'
        },
        {
          name: 'PaymentMethod',
          title: '收款方式'
        },
        {
          name: 'CollectionSet',
          title: '收款配置'
        },
        {
          name: 'OpenInvoice',
          title: '开票配置'
        },
        {
          name: 'CostBetween',
          hidden: true, // 是否在左侧菜单显示true开启
          title: '费项关系',
          parentName: 'OpenInvoice'
        },
        {
          name: 'BillingConfiguration',
          title: '账单配置'
        },
        {
          name: 'DramaticperFormance',
          title: '滞纳金配置'
        },
        {
          name: 'ClosingConfiguration',
          title: '关账配置'
        },
        {
          name: 'CollectionSetFee',
          hidden: true, // 是否在左侧菜单显示true开启
          title: '费项关系',
          parentName: 'CollectionSet'
        }
      ]
    },
    {
      title: '保证金管理',
      name: 'MarginModules',
      redirect: '/MarginModules/MarginConversion',
      children: [
        {
          name: 'MarginConversion',
          title: '保证金转换单'
        },
        {
          name: 'MarginConversionAdd',
          hidden: true,
          title: '保证金转换单新增',
          parentName: 'MarginConversion'
        },
        {
          name: 'MarginConversionDetails',
          hidden: true,
          title: '保证金转换单详情',
          parentName: 'MarginConversion'
        },
        {
          name: 'MarginProcessingList',
          title: '保证金处理单'
        },
        {
          name: 'MarginProcessingAdd',
          hidden: true,
          title: '保证金处理单新增',
          parentName: 'MarginProcessingList'
        },
        {
          name: 'MarginProcessingDetail',
          hidden: true,
          title: '保证金处理单详情',
          parentName: 'MarginProcessingList'
        }, {
          name: 'MarginBalanceList',
          title: '保证金余额'
        }, {
          name: 'MarginBalanceDetail',
          title: '保证金流水',
          hidden: true,
          parentName: 'MarginBalanceList'
        }
      ]
    },
    {
      title: '凭证管理',
      name: 'VoucherManagement',
      redirect: '/VoucherManagement/VoucherTemplates',
      children: [
        {
          name: 'VoucherTemplates',
          title: '凭证模板'
        },
        {
          name: 'VoucherTemplatesAdd',
          title: '凭证模板新增',
          hidden: true,
          parentName: 'VoucherTemplates'
        },
        {
          name: 'VoucherSummary',
          title: '凭证汇总'
        }, {
          name: 'VoucherSummaryDetail',
          title: '凭证汇总详情',
          hidden: true,
          parentName: 'VoucherSummary'
        },
        {
          name: 'VoucherSummaryEdit',
          title: '凭证汇总详情',
          hidden: true,
          parentName: 'VoucherSummary'
        },
        {
          name: 'CertificatePool',
          title: '凭证池'
        }]
    },
    {
      title: '收款管理',
      name: 'ManagementModule',
      redirect: '/ManagementModule/CollectionList',
      children: [
        {
          name: 'CollectionList',
          title: '收款单'
        },
        {
          name: 'CollectionListEdit',
          hidden: true,
          title: '收款单新增',
          parentName: 'CollectionList'
        },
        {
          name: 'CollectionVerificationForm',
          hidden: true,
          title: '收款核销单',
          parentName: 'CollectionList'
        },
        {
          name: 'CollectionListDetails',
          hidden: true,
          title: '收款单详情',
          parentName: 'CollectionList'
        },
        {
          name: 'VerificationList',
          title: '核销单'
        },
        {
          name: 'VerificationAdd',
          hidden: true,
          title: '核销单新增',
          parentName: 'VerificationList'
        },
        {
          name: 'VerificationDetails',
          hidden: true,
          title: '核销单详情',
          parentName: 'VerificationList'
        },
        {
          name: 'CollectionConfig',
          title: '核销配置'
        },
        {
          name: 'CollectionConfigAdd',
          hidden: true,
          title: '核销配置新增',
          parentName: 'CollectionConfig'
        }
      ]
    },
    {
      title: '暂收款管理',
      name: 'SuspenseModules',
      redirect: '/SuspenseModules/BalanceList',
      children: [
        {
          name: 'BalanceList',
          title: '暂收款余额'
        },
        {
          name: 'BalanceDetail',
          title: '暂收款流水',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'BalanceList'
        },
        {
          name: 'ProcessingList',
          title: '暂收款处理单'
        },
        {
          name: 'ProcessingDetail',
          title: '暂收款处理单详情',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'ProcessingList'
        },
        {
          name: 'ProcessingAdd',
          title: '暂收款处理单新增',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'ProcessingList'
        },
        {
          name: 'Conversionlist',
          title: '暂收款转换单'
        },
        {
          name: 'ConversionAdd',
          title: '暂收款转换单新增',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'Conversionlist'
        },
        {
          name: 'ConversionDetail',
          title: '暂收款转换单详情',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'Conversionlist'
        }

      ]
    },
    {
      title: '应付管理',
      name: 'PayableModules',
      redirect: '/PayableModules/PayableList',
      children: [
        {
          name: 'PayableList',
          title: '应付单'
        },
        {
          name: 'PaymentVerificationForm',
          title: '付款核销单'
        },
        {
          name: 'PaymentVerificationFormEdit',
          title: '付款核销单详情',
          hidden: true,
          parentName: 'PaymentVerificationForm'
        },
        {
          name: 'PaymentVerificationFormDetail',
          title: '付款核销单编辑',
          hidden: true,
          parentName: 'PaymentVerificationForm'
        },
        {
          name: 'PaymentVerificationFormadd',
          title: '付款核销单编辑',
          hidden: true,
          parentName: 'PaymentVerificationForm'
        },
        {
          name: 'PaymentVerificationFormAgain',
          title: '付款核销单详情',
          hidden: true,
          parentName: 'PaymentVerificationForm'
        }
      ]
    },
    {
      title: '应收管理',
      name: 'ReceivableManagement',
      redirect: '/ReceivableManagement/ReceivableDefinite',
      children: [
        {
          name: 'AdjustmentCost',
          title: '费用调整单'
        },
        {
          name: 'AdjustmentCostDetail',
          title: '费用调整单详情',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'AdjustmentCost'
        },
        {
          name: 'AdjustmentCostAdd',
          title: '费用调整单新增',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'AdjustmentCost'
        },
        {
          name: 'AdjustmentCostEdit',
          title: '费用调整单编辑',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'AdjustmentCost'
        },
        {
          name: 'ReceivableDefinite',
          title: '应收明细'
        },
        {
          name: 'Receivable',
          title: '应收账单'
        },
        {
          name: 'ReceivableDetail',
          title: '应收账单详情',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'Receivable'
        },
        {
          name: 'ReceivableHistory',
          title: '历史记录',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'Receivable'
        },
        {
          name: 'DuePlatform',
          title: '欠费平台'
        },
        {
          name: 'DuePlatformDetail',
          title: '欠费明细',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'DuePlatform'
        },
        {
          name: 'ReceivableLightly',
          title: '应收减免'
        },
        {
          name: 'ReceivableLightlyDetail',
          title: '应收减免详情',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'ReceivableLightly'
        },
        {
          name: 'ReceivableLightlyAdd',
          title: '应收减免新增',
          hidden: true, // 是否在左侧菜单显示
          parentName: 'ReceivableLightly'
        }
      ]
    },
    // 票据管理
    {
      title: '票据管理',
      name: 'BillManagement',
      redirect: '/BillManagement/InvoiceList',
      children: [
        {
          name: 'ReceiptList',
          title: '收据'
        },
        {
          name: 'InvoiceList',
          title: '发票'
        },
        {
          name: 'InvoiceListDetail',
          title: '发票详情',
          parentName: 'InvoiceList',
          hidden: true
        },
        {
          name: 'InvoiceListAdd',
          title: '选定开票范围',
          parentName: 'InvoiceList',
          hidden: true
        },
        {
          name: 'ReceiptListAdd',
          title: '收据新增',
          parentName: 'ReceiptList',
          hidden: true
        },
        {
          name: 'InvoiceBreakConfig',
          title: '发票拆分规则配置'
        },
        {
          name: 'InvoiceBreakConfigDetail',
          title: '发票拆分规则详情',
          parentName: 'InvoiceBreakConfig',
          hidden: true
        },
        {
          name: 'InvoiceBreakConfigAdd',
          title: '发票拆分规则新增',
          parentName: 'InvoiceBreakConfig',
          hidden: true
        },
        {
          name: 'ReceiptListDetails',
          title: '收据详情',
          parentName: 'ReceiptList',
          hidden: true
        }
      ]
    },
    {
      name: 'FinancialAffairs',
      title: '财务报表',
      redirect: '/FinancialAffairs/NetReceiptsOfPayment',
      children: [
        {
          title: '实收(收付)报表',
          name: 'NetReceiptsOfPayment'
        },
        {
          title: '收缴率汇总',
          name: 'CollectionRateOfSummary'
        },
        {
          title: '实收(权责)报表',
          name: 'NetReceiptsOfRights'
        },
        {
          title: '应收台账',
          name: 'AccountsReceivable'
        },
        {
          title: '收缴月报-明细',
          name: 'CollectionRateDetailsOfMonthly'
        },
        {
          title: '商户月度收入统计',
          name: 'MerchantIncomeStatisticsOfMonth'
        },
        {
          title: '商户年度收入统计',
          name: 'MerchantIncomeStatisticsOfYear'
        },
        {
          title: '预收款报表',
          name: 'AdvanceCollection'
        },
        {
          title: '日收款报表',
          name: 'CollectionOfDaily'
        },
        {
          title: '权责月应收报表',
          name: 'ReceivableOfMonth'
        },
        {
          title: '收缴率报表明细',
          name: 'CollectionOfDetails'
        }
      ]
    }
  ]
}

export default financiaRouter

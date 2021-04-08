import { PageOption } from './type'

const options: PageOption[] = [
  {
    name: 'dashboard',
    title: '看板',
    router: true
  },
  // {
  //   name: 'repository',
  //   title: '仓库',
  //   children: [
  //     {
  //       name: 'branch',
  //       title: '分支',
  //       router: true,
  //       children: [
  //         {
  //           name: 'add',
  //           title: '新增分支',
  //           router: { nested: false }
  //         },
  //         {
  //           name: 'edit',
  //           title: '编辑分支',
  //           router: { nested: false, pathSuffix: '/:id' }
  //         },
  //         {
  //           name: 'detail',
  //           title: '分支详情',
  //           router: { nested: false, pathSuffix: '/:id' },
  //           children: [
  //             {
  //               name: 'commit',
  //               title: '提交记录'
  //             },
  //             {
  //               name: 'rollback',
  //               title: '回滚记录'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'merge',
  //           title: '合并分支',
  //           router: { nested: false, customPath: '/repository/branch/merge/:b1/:b2' }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   name: 'product',
  //   title: '产品',
  //   router: true
  // },
  {
    name: 'comp',
    title: '组件示例',
    children: [
      {
        name: 'form-render',
        title: '表单渲染器',
        router: true
      },
      {
        name: 'data-table',
        title: '数据表格',
        router: true
      }
    ]
  },
  {
    name: 'example',
    title: '页面示例',
    children: [
      {
        name: 'query',
        title: '查询列表',
        router: true,
        children: [
          {
            name: 'edit',
            title: '编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'todo',
    title: '我的待办',
    router: true
  },
  {
    name: 'base',
    title: '系统基础设置',
    children: [
      {
        name: 'calendar',
        title: '工作日历管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '添加',
            router: { nested: false }
          }
        ]
      },
      {
        name: 'notice-rule',
        title: '通知规则管理',
        router: true,
        children: [
          {
            name: 'edit',
            title: '规则设置-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'notice-list',
        title: '通知信息查询',
        router: true,
        children: [
          {
            name: 'edit',
            title: '通知信息编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'info',
            title: '查看通知信息-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'customer',
    title: '客户管理',
    children: [
      {
        name: 'list',
        title: '客户列表',
        router: true,
        children: [
          {
            name: 'enterprise-detail',
            title: '企业管理详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'individ-detail',
            title: '个人管理详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'add',
            title: '新增',
            router: { nested: false }
          },
          {
            name: 'enterprise-edit',
            title: '企业管理编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'individ-edit',
            title: '个人管理编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'loginName',
            title: '登录实名',
            opt: true
          },
          {
            name: 'toRealName',
            title: '发起实名',
            opt: true
          }
        ]
      },
      {
        name: 'account',
        title: '账号管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '新增-{id}',
            router: { nested: false }
          },
          {
            name: 'relation-customer',
            title: '关联客户',
            router: { nested: false }
          },
          {
            name: 'relation-project',
            title: '关联项目',
            router: { nested: false }
          }
        ]
      },
      {
        name: 'bank',
        title: '银行账户管理',
        children: [
          {
            name: 'actual',
            title: '客户收款账户管理',
            router: true,
            children: [
              {
                name: 'detail',
                title: '审批-{id}',
                router: { nested: false }
              },
              {
                name: 'add',
                title: '新增',
                opt: true
              },
              {
                name: 'approval',
                title: '审批',
                opt: true
              },
              {
                name: 'edit',
                title: '编辑',
                opt: true
              }
            ]
          },
          {
            name: 'net',
            title: '监管账户管理',
            router: true,
            children: [
              {
                name: 'add',
                title: '新增',
                opt: true
              },
              {
                name: 'edit',
                title: '编辑',
                opt: true
              },
              {
                name: 'operate',
                title: '启用禁用账户',
                opt: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'project',
    title: '金融产品配置',
    children: [
      {
        name: 'quota',
        title: '额度项目管理',
        router: true
      },
      {
        name: 'product',
        title: '项目产品配置',
        router: true,
        children: [
          {
            name: 'add',
            title: '创建项目',
            opt: true
          },
          {
            name: 'viewDetail',
            title: '查看项目',
            opt: true
          },
          {
            name: 'edit',
            title: '编辑-{id}',
            router: { pathSuffix: '/:id', nested: false },
            children: [
              {
                name: 'rule',
                title: '清分操作',
                opt: true
              },
              {
                name: 'order',
                title: '融资订单',
                opt: true
              },
              {
                name: 'base',
                title: '基础债权',
                opt: true
              },
              {
                name: 'contract',
                title: '合同管理',
                opt: true
              }
            ]
          },
          {
            name: 'open-edit',
            title: '项目启用状态编辑',
            router: { pathSuffix: '/:id', nested: false },
            children: [
              {
                name: 'rule',
                title: '清分操作',
                opt: true
              },
              {
                name: 'order',
                title: '融资订单',
                opt: true
              },
              {
                name: 'base',
                title: '基础债权',
                opt: true
              },
              {
                name: 'contract',
                title: '合同管理',
                opt: true
              }
            ]
          },
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'relationship',
            title: '买卖方管理',
            router: { nested: false },
            children: [
              {
                name: 'edit',
                title: '编辑-{id}',
                router: { pathSuffix: '/:id', nested: false },
                children: [
                  {
                    name: 'submit',
                    title: '提交',
                    opt: true
                  }
                ]
              },
              {
                name: 'add',
                title: '新增',
                router: { nested: false }
              },
              {
                name: 'detail',
                title: '审批-{id}',
                router: { nested: false }
              },
              {
                name: 'first-add',
                title: '新增',
                router: { nested: false }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'finance',
    title: '融资管理',
    children: [
      {
        name: 'debt',
        title: '应收账款管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '应收账款详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'audit',
            title: '应收账款审批-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'cancel-audit',
            title: '应收账款作废审批-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'cancel',
            title: '应收账款作废-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'zdw-list',
            title: '中登登记列表-{batchId}',
            router: { nested: false }
          },
          {
            name: 'gen-contract',
            title: '生成融资合同',
            opt: true
          },
          {
            name: 'contract-detail',
            title: '查看融资合同',
            opt: true
          },
          {
            name: 'zdw-log',
            title: '中登网初始登记',
            opt: true
          }
        ]
      },
      {
        name: 'order',
        title: '融资申请管理',
        router: true,
        children: [
          {
            name: 'audit',
            title: '订单审批-{id}',
            router: { pathSuffix: '/:id', nested: false },
            children: [
              {
                name: 'close-order',
                title: '关闭订单',
                opt: true
              },
              {
                name: 'account-notify',
                title: '账户修改通知',
                opt: true
              },
              {
                name: 'deny-to-opt',
                title: '退回运营处理',
                opt: true
              }
            ]
          },
          {
            name: 'pre-audit',
            title: '普链保预审-{id}',
            router: { pathSuffix: '/:id', nested: false },
            children: [
              {
                name: 'supplement',
                title: '待补充文件',
                opt: true
              }
            ]
          },
          {
            name: 'pre-detail',
            title: '普链保预审详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'detail',
            title: '订单详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'tickets',
            title: '票据签收-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'ticket-detail',
            title: '票据详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'loan',
        title: '放款记录',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'assets',
    title: '资产管理',
    children: [
      {
        name: 'business-bill',
        title: '业务单据管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'invoice',
        title: '发票管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'note',
        title: '票据管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'contract',
    title: '合同管理',
    children: [
      {
        name: 'audit',
        title: '合同审批详情',
        menu: false,
        router: { pathSuffix: '/:id', nested: false }
      },
      {
        name: 'othercontract',
        title: '项目下的其他合同',
        menu: false,
        router: { pathSuffix: '/:id', nested: false }
      },
      {
        name: 'noncontract',
        title: '新增非标合同',
        menu: false,
        router: { pathSuffix: '/:id', nested: false }
      },
      {
        name: 'contractdetail',
        title: '合同详情',
        menu: false,
        router: { pathSuffix: '/:id', nested: false }
      },

      {
        name: 'ledger',
        title: '合同台账',
        router: true,
        children: [
          {
            name: 'detail',
            title: '合同详情',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'history',
            title: '合同历史-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'noncontract',
            title: '新增非标合同',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'potential-customers',
    title: '意向客户',
    router: true
  },
  {
    name: 'post-loan',
    title: '贷后管理',
    children: [
      {
        name: 'balance',
        title: '回款管理',
        router: true,
        children: [
          {
            name: 'transfer-flow',
            title: '回款交易流水',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'clearing',
            title: '清分',
            router: { nested: false }
          }
        ]
      },

      {
        name: 'balance-return',
        title: '余额拨付',
        router: true,
        children: [
          {
            name: 'edit',
            title: '余额拨付详情',
            router: { pathSuffix: '/:type', nested: false }
          }
        ]
      },
      {
        name: 'settlement',
        title: '结算记录',
        router: true,
        children: [
          {
            name: 'detail',
            title: '结算管理明细',
            router: { pathSuffix: '/:settlementNo', nested: false }
          }
        ]
      },
      {
        name: 'capital-flow',
        title: '还款记录',
        router: true
      },
      {
        name: 'invoice',
        title: '开票管理',
        router: true
      }
    ]
  },
  {
    name: 'accounting',
    title: '会计引擎',
    children: [
      {
        name: 'system',
        title: '科目体系管理',
        router: true
      },
      {
        name: 'flow',
        title: '核算流水管理',
        router: true
      },
      {
        name: 'scene',
        title: '场景配置管理',
        router: true
      },
      {
        name: 'evidence-config',
        title: '凭证配置管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '凭证配置管理-新增',
            router: { nested: false }
          },
          {
            name: 'edit',
            title: '凭证配置管理-编辑',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'evidence-detail',
        title: '凭证明细管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'evidence-collect',
        title: '凭证汇总管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'download-manage',
        title: '下载管理',
        router: true
      }
    ]
  }
]

export default options

// 生成全量权限
function gen(source: PageOption[] = options) {
  const ret: any[] = []
  source.forEach(v => {
    const children = v.children
    const item: any = { code: v.name }
    if (Array.isArray(children) && children.length > 0) {
      item.children = gen(children)
    }
    ret.push(item)
  })
  return ret
}

export const localAuthorities = gen()

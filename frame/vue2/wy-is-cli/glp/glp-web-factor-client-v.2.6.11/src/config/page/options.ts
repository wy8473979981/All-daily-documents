import { PageOption } from './type'

const options: PageOption[] = [
  {
    name: 'dashboard',
    title: '看板',
    router: true
  },
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
    name: 'base',
    title: '基础信息维护',
    children: [
      {
        name: 'account',
        title: '资金到账账户管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '新增',
            router: { nested: false }
          },
          {
            name: 'edit',
            title: '编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'information',
        title: '第三方信息管理',
        router: true,
        children: [
          {
            name: 'edit',
            title: '编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'add',
            title: '新增-{id}',
            router: { nested: false }
          },
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
    name: 'finance',
    title: '融资管理',
    children: [
      {
        name: 'project',
        title: '我要融资',
        router: true
      },
      {
        name: 'order',
        title: '融资订单管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '新增',
            router: { pathSuffix: '/:projectId', nested: false }
          },
          {
            name: 'edit',
            title: '编辑',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'debt',
        title: '应收账款管理',
        router: true,
        children: [
          {
            name: 'add',
            title: '新增',
            router: { nested: false }
          },
          {
            name: 'edit',
            title: '编辑',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      },
      {
        name: 'contract',
        title: '合同管理',
        router: true
      }
    ]
  },
  {
    name: 'certificate',
    title: '融资标的管理',
    children: [
      {
        name: 'business',
        title: '业务单据管理',
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
        name: 'upload',
        title: '发票上传管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'confirm',
            title: '上传发票信息确认',
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
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'relative',
            title: '关联订单',
            router: { nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'loan',
    title: '融资业务查询',
    children: [
      {
        name: 'finance',
        title: '融资记录',
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
        name: 'loan',
        title: '放款记录',
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
        name: 'balance-return',
        title: '回款记录',
        router: true
      },
      {
        name: 'repayment',
        title: '还款记录',
        router: true
      },
      {
        name: 'settlement',
        title: '结算记录',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'confirmation',
    title: '确权管理',
    children: [
      {
        name: 'post',
        title: '确权管理',
        router: true,
        children: [
          {
            name: 'affirm',
            title: '确权',
            router: { pathSuffix: '/:id', nested: false }
          }
        ]
      }
    ]
  },
  {
    name: 'invoice',
    title: '费用发票管理',
    children: [
      {
        name: 'apply',
        title: '开票申请',
        router: true
      },
      {
        name: 'list',
        title: '发票管理',
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

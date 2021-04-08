import { Controller, RequestMapping, ResData } from '@pat-fet/mock-server'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class auth extends Controller {
  @RequestMapping({ url: '/login', method: 'post' })
  login (req, res, context) {
    return null
  }

  @RequestMapping({ url: '/logout', method: 'get' })
  logout (req, res, context) {
    return 'https://fbs.glpfin.com'
  }

  @RequestMapping({ url: '/401', method: 'get' })
  s401 (req, res, context) {
    return new ResData('401', 'session失效', 'https://fbs.glpfin.com')
  }

  // @RequestMapping({ url: '/clientend/customer/info', method: 'get' })
  // getContext (req, res, context) {
  //   return {
  //     id: 8877,
  //     loginName: '18511111114',
  //     password: 'c51cd8e64b0aeb778364765013df9ebe',
  //     name: null,
  //     nickName: null,
  //     email: null,
  //     mobile: null,
  //     portrait: null,
  //     status: 1,
  //     passwordInputErrorCount: 0,
  //     lockTime: 0,
  //     authStatus: 0,
  //     userType: 1,
  //     lastLoginTime: 1592304535988,
  //     needModifyPassword: '0',
  //     createTime: 1591185832410,
  //     updateTime: 1591185832410,
  //     remark: null,
  //     contactNumber: null,
  //     address: null,
  //     userBelong: 'FACTORING',
  //     registerBelong: 'FACTORING',
  //     customers: []
  //   }
  // }

  @RequestMapping({ url: '/permission/roleAndPermList', method: 'get' })
  getAuthories (req, res, context) {
    return {
      roles: [{
        code: 'dev',
        name: '开发角色'
      }],
      perms: getPerms()
    }
  }
}

function getPerms () {
  // eslint-disable-next-line
  return [{"code":"dashboard"},{"code":"comp","children":[{"code":"form-render"},{"code":"data-table"}]},{"code":"example","children":[{"code":"query","children":[{"code":"edit"}]}]},{"code":"authorization","children":[{"code":"company"},{"code":"individ"}]},{"code":"base","children":[{"code":"account","children":[{"code":"add"},{"code":"edit"}]},{"code":"information","children":[{"code":"edit"},{"code":"add"},{"code":"detail"}]}]},{"code":"finance","children":[{"code":"apply"},{"code":"order","children":[{"code":"add"},{"code":"detail"}]},{"code":"debt","children":[{"code":"add"},{"code":"edit"},{"code":"detail"}]}]},{"code":"certificate","children":[{"code":"business","children":[{"code":"detail"}]},{"code":"invoice","children":[{"code":"detail"}]}]},{"code":"loan","children":[{"code":"finance","children":[{"code":"detail"}]},{"code":"loan","children":[{"code":"detail"}]},{"code":"balance-return"},{"code":"repayment"},{"code":"settlement","children":[{"code":"detail"}]}]},{"code":"confirm-rights","children":[{"code":"detail"}]},{"code":"invoice","children":[{"code":"list"},{"code":"apply"}]}]
}

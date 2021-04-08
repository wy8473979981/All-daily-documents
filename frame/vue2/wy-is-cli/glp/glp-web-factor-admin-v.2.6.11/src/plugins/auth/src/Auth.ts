export interface Principle {
  user: User;
  roles: Role[];
  authorities: Authority[];
}

export interface User {
  username: string;
  cname: string;
  [key: string]: any;
}

export interface Role {
  roleName: string;
  roleCode: string;
  [key: string]: any;
}

export interface Authority {
  pid: string;
  [key: string]: any;
}

export interface AuthOptions {
  principleLoader?: () => Promise<Principle>;

  logoutHandler?: () => Promise<string>;

  loginHandler?: (params: LoginParams) => Promise<any>; // 单点模式下无需声明

  single?: boolean; // 是否单点登录模式， 此模式下不提供登录页面

  ssoLoginUrl?: 'http://www.baidu.com';
}

export interface LoginParams {
  username: string;
  password: string;
}

export default class Auth {
  constructor (options: AuthOptions = {}) {
    this.options = options
  }

  options: AuthOptions

  principle: Principle | null = null

  get single (): boolean {
    return !!this.options?.single
  }

  get username (): string {
    return this.principle?.user?.username || ''
  }

  get cname (): string {
    return this.principle?.user?.cname || ''
  }

  get roles (): Role[] {
    return this.principle?.roles || []
  }

  get authorities (): Authority[] {
    return this.principle?.authorities || []
  }

  get authenticated (): boolean {
    return !!this.principle
  }

  hasAnyRole (...roles: string[]): boolean {
    return roles.some(v => this.roles.some(w => w.roleCode === v))
  }

  hasAllRole (...roles: string[]): boolean {
    return roles.every(v => this.roles.some(w => w.roleCode === v))
  }

  // 登录
  login (params: LoginParams): Promise<any> {
    if (!this.options?.loginHandler) throw new Error('please specific loginHandler')
    return this.options?.loginHandler(params)
  }

  // 前往登录页面
  toLogin (data: string, logout = false) {
    this.principle = null // 删除认证实体
    if (this.single) {
      const backUrl = logout ? window.location.origin : window.location.href
      const url = new URL(this.options.ssoLoginUrl || data)
      url.searchParams.append('appId', process.env.VUE_APP_APP_ID)
      // there is some problem, because backend doesn't actually exit
      url.searchParams.append('backUrl', backUrl)
      window.location.replace(url.href)
    } else {
      const url = logout ? '/login' : `/login?backUrl=${location.pathname}${location.search}`
      window.location.assign(url)
    }
  }

  // 控制访问
  access (pid: string): Promise<boolean> {
    if (this.authenticated) {
      const has = this.authorities.some(v => v.pid === pid)
      return Promise.resolve(has)
    } else {
      return new Promise((resolve, reject) => {
        this.loadPrinciple().then(() => {
          const has = this.authorities.some(v => v.pid === pid)
          resolve(has)
        }).catch((e: Error) => {
          reject(e)
        })
      })
    }
  }

  // 同步控制访问
  accessSync (pid: string): boolean {
    return this.authorities.some(v => v.pid === pid)
  }

  // 退出
  logout () {
    if (!this.options?.logoutHandler) throw new Error('please specific logoutHandler')
    this.options.logoutHandler().then(data => {
      this.toLogin(data, true)
    })
  }

  // 加载用户信息
  load (refresh = false): Promise<Principle> {
    if (this.authenticated && !refresh) return Promise.resolve(this.principle as Principle)
    return this.loadPrinciple()
  }

  private loadPrinciple (): Promise<Principle> {
    if (this.options?.principleLoader) {
      return this.options.principleLoader().then(data => {
        this.principle = data
        return this.principle
      })
    }
    throw Error('please specific PrincipleLoader')
  }
}

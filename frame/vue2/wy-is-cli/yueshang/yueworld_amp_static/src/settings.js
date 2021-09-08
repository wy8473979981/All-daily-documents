/*
 * @Author: fhj
 * @LastEditors: fhj
 */
module.exports = {
  title: 'amp',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description 是够固定头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示logo
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Need show err logs component.
   * 是否开启接口权限
   */
  permissionMenu: false,

  // 是否登录的时候使用默认用户名/密码
  isDefaultUser: false,

  // 默认用户名密码配置
  defaultUser: {
    name: 'admin',
    password: '123456'
  }
}

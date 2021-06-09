// 第三方接口API
let blMain = 'https://pms.powerlong.com/PowerDesk/'
// 环境的切换
if (process.env.NODE_ENV === "production") {
  blMain = 'http://pd.powerlong.com/'
}

const BlApi = {
  userInfo: blMain + 'wap/pd-app!showUserPicNew.action',
  getWabTreePosApp: blMain + 'wap/pd-app!getWabTreePosApp.action', // 通讯录
  searchUserList: blMain + 'wap/pd-app!searchUserList.action', // 通讯录查询
  getToken: blMain + 'open/bis-mini-app!zsPdWx.action' // 获取用户uiid、token
}

export { BlApi }

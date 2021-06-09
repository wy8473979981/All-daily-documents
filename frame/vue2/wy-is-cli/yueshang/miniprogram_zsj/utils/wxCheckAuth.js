import main_config from "../config.js"

let _app = getApp();

let wxCheckAuth = {
  getOpenid() {
    debugger
    return new Promise(function (resolve, reject) {
      debugger
      wx.checkSession({

        success() {
          debugger
          //session_key 未过期，并且在本生命周期一直有效
          let _openId = wx.getStorageSync("openid");
          let _session_key = wx.getStorageSync("session_key");
          console.log(_openId, _session_key, 'openid --- sessionkey')
          debugger
          if (!_openId || (_openId == '')) {
            debugger
            wx.login({
              success: (res) => {
                debugger
                console.log(res, '------wx.login 的回参--------')
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                  url: `${main_config.baseUrl}merchantOpen_web/wechat/getOpenId.htm`,
                  method: 'post',
                  data: {
                    sign: main_config.sign,
                    timestamp: new Date().getTime(),
                    params: {
                      code: res.code
                    }
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: (res) => {
                    debugger
                    let data = res.data;
                    if (data.code == "0") {
                      // wx.setStorageSync('openid', data.openid);
                      // wx.setStorageSync("session_key",data.session_key);
                      resolve(data.data);
                    } else {
                      //reject
                      reject(data.msg);
                    }
                  },
                  fail() {
                    debugger
                    reject("网络错误");
                  }
                }) //wx.request

              }
            })
          } else {
            debugger
            resolve({
              openid: _openId,
              session_key: _session_key
            });
          }
        },
        fail() {
          let isLogin = false
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success: (res) => {
              debugger
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: `${main_config.baseUrl}merchantOpen_web/wechat/getOpenId.htm`,
                method: 'post',
                data: {
                  sign: main_config.sign,
                  timestamp: new Date().getTime(),
                  params: {
                    code: res.code
                  }
                },
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
                  debugger
                  isLogin = true
                  console.log(isLogin,'isLogin')
                  let data = res.data;
                  if (data.code == "0") {
                    //resolve
                    // wx.setStorageSync('openid', data.openid);
                    // wx.setStorageSync("session_key",data.session_key);
                    console.log('openid ==========没有登录状态================>')
                    resolve(data.data);
                  } else {
                    debugger
                    //reject
                    reject(data.msg);
                  }
                },
                fail() {
                  debugger
                  reject("网络错误");
                }
              }) //wx.request

            },
            fail: (error) => {
              debugger
              wx.redirectTo({
                url: "/pages/login/login"
              });
            }
          })
        }
      });
    });
  }, //getOpenid

  geSetting() {
    return new Promise(function (resolve, reject) {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: (res) => {
                /*
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                */
                resolve({
                  auth: true,
                  userInfo: res.userInfo
                });

              },
              fail: (res) => {
                // _app.globalData.authorize = true;
                reject({
                  err: "获取用户信息失败",
                  authorize: true
                });
              }
            });
          } else {
            //_app.globalData.authorize = false;
            //用户没有授权
            reject({
              err: "authError",
              authorize: false
            })
          }
        }
      }) //getSetting
    }) //promise
  }, //getSetting

  checkAuth(openid) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: `${main_config.baseUrl}merchantOpen_web/regist/getCurrentUserInfo.htm`,
        method: 'post',
        data: {
          version: "1.0",
          sign: main_config.sign,
          timestamp: new Date().getTime() + '',
          params: {
            openId: openid
          }
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          let data = res.data;
          if (data.code == '20002') {
            reject({
              err: "bindError",
              userBind: false
            });
          } else if (data.code == "0") {
            resolve({
              detailInfo: data.params,
              userBind: true
            });
          } else {
            reject({
              err: "netError"
            });
          }
        }
      })


    }); //promise 
  },
}

//export  wxCheckAuth;
export default wxCheckAuth;
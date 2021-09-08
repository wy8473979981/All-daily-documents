// pages/index/index.js
import main_config from "../../config.js"
import wxCheckAuth from "../../utils/wxCheckAuth"
const {
  regeneratorRuntime
} = global
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    modalStatus: false,
    authorize: false,
    userBind: false,
    errorMessage: "",
    errorTitle: "",
    app: null
  },
  showModal() {
    this.setData({
      modalShow: true
    });
    this.modalAnimShow();
    let _wx = this;
    setTimeout(function() {
      _wx.setData({
        modalStatus: true
      })
    }, 1000);
  },
  closeModal(e) {
    if (e.currentTarget.dataset.show == true) {
      this.setData({
        modalShow: false,
        modalStatus: false
      })
    }
  },
  showAlertMsg() {
    let _wx = this;
    wx.showModal({
      title: _wx.data.errorTitle,
      content: _wx.data.errorMessage,
      showCancel: false,
      success(res) {
        if (res.confirm) {}
      }
    })
  },
  modalAnimShow() {
    this.modalAnim.opacity(1)
      .translateY(0)
      .step({
        duration: 300
      })
    this.setData({
      modalAnim: this.modalAnim.export()
    })
  },
  modalAnimReset() {
    this.modalAnim.opacity(0)
      .translateY(100)
      .step({
        duration: 300
      })
      .translateY(-100)
      .step({
        duration: 0
      })
    this.setData({
      modalAnim: this.modalAnim.export()
    })
  },
  onGotUserInfo(e) {
    /** 
     * 这里优先判断授权，如果授权通过，根据userBind的状态去判断绑定页面跳转
     */
    let _wx = this;
    if (e.detail.errMsg == 'getUserInfo:ok') {
      _wx.modalAnimReset();
      _wx.data.app.globalData.authorize = true;
      _wx.setData({
        authorize: true
      });
      let _openId = this.data.app.globalData.openid;
      _wx.data.app.globalData.userInfo = e.detail.userInfo;
      if (!e.detail.userInfo.unionid) {
        _wx.data.app.globalData.userInfo['unionid'] = null
      }
      wxCheckAuth.checkAuth(_openId).then(res => {
        console.log(res, '-----授权')
        _wx.setData({
          userBind: true
        })
        _wx.data.app.globalData.userBind = true;
        _wx.data.app.globalData.detailInfo = res.detailInfo;
        wx.switchTab({
          url: "/pages/index/index"
        });
        return;
      }).catch(error => {
        if (error.err && error.err == 'bindError') {
          _wx.setData({
            userBind: false
          })
          _wx.data.app.globalData.userBind = false;
          wx.redirectTo({
            url: "/pages/login/login"
          });
        } else {
          _wx.setData({
            errorTitle: "网络错误：",
            errorMessage: "请稍后再试"
          });
          _wx.showAlertMsg();
        }
      });
    }
  },
  goUrl(e) {
    let _target = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: _target
    })
  },
  async onLoad(options) {
    let _app = getApp();
    let _wx = this;
    _wx.setData({
      app: _app
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let _userBind = _app.globalData.userBind || false;
    let _authorize = _app.globalData.authorize || false;
    let _openId = _app.globalData.openid || '';
    if (!_openId || (_openId == '')) {
      await wxCheckAuth.getOpenid().then((res) => {
        console.log(res, '--open id---')
        wx.setStorageSync('openid', res.openid);
        wx.setStorageSync('session_key', res.session_key);
        _app.globalData.openid = res.openid;
      }).catch((msg) => {
        _wx.setData({
          errorTitle: "网络错误：",
          errorMessage: msg
        });
        _wx.showAlertMsg();
      }); //await  wxCheckAuth.getOpenid 
    };
    await Promise.all([
      //wxCheckAuth.geSetting(),
      wxCheckAuth.checkAuth(_app.globalData.openid)
    ]).then((res) => {
      console.log(res)
      _wx.setData({
        userBind: true,
        authorize: true,
      })
      _wx.data.app.globalData.userBind = true;
      _wx.data.app.globalData.authorize = true;
      _wx.data.app.globalData.detailInfo = res[0].detailInfo || {};
      wx.switchTab({
        url: "/pages/index/index"
      });
    }).catch((error) => {
      if (error.err == 'authError') {
        _wx.showModal();

        return;
      } else if (error.err == 'bindError') {
        wx.redirectTo({
          url: "/pages/login/login"
        });
      } else {
        _wx.setData({
          errorTitle: "网络错误：",
          errorMessage: "请稍后再试"
        });
        _wx.showAlertMsg();
      }
    }).then(() => {
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {
    let _wx = this;
    _wx.modalAnim = wx.createAnimation({
      timingFunction: "ease-in-out"
    });
  }
})
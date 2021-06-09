// pages/login/login.js
import main_config from "../../config.js"
import wxCheckAuth from "../../utils/wxCheckAuth"
const {ysRequest} = require('../../utils/util.js')

let countDownTimeout;
let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    modalStatus: false,
    veriBtnText: "获取验证码",
    getAccount: '',
    cellphoneFocus: false,
    veriCodeFocus: false,
    phoneVerified: false,
    phoneNum: '',
    veriCode: '',
    disabledInput: false,
    veriBtnDisabled: true,
    timeCount: 60,//倒计时30s
    errorMessage: "",
    errorTitle: "",
    openid: '',
    app: null
  },
  setFocus(e) {

    let _type = e.currentTarget.dataset.type;
    if (_type == 'cellphone') {
      this.setData({
        "cellphoneFocus": true
      })
    } else if (_type == 'vericode') {
      this.setData({
        "veriCodeFocus": true
      })
    }

  },
  setBlur(e) {

    let _wx = this;
    let _type = e.currentTarget.dataset.type;
    let _value = e.detail.value;
    if (_type === 'cellphone') {

      _wx.setData({
        "cellphoneFocus": false,
        phoneNum: _value
      });

      let _phone = _wx.phone_verfiy();
      if (_phone == false) {
        _wx.setData({
          phoneVerified: false,
          veriBtnDisabled: true
        })
      } else {
        _wx.setData({
          phoneVerified: false,
          veriBtnDisabled: false
        })
      }
    } else if (_type === 'vericode') {
      _wx.setData({
        "veriCodeFocus": false,
        veriCode: _value
      })
    }

  },
  phoneInput(e) {
    let _wx = this;
    let _type = e.currentTarget.dataset.type;
    let _value = e.detail.value;
    _wx.setData({
      phoneNum: _value
    });

    let _phone = _wx.phone_verfiy();
    if (_phone == false) {
      _wx.setData({
        phoneVerified: false,
        veriBtnDisabled: true
      })
    } else {
      _wx.setData({
        phoneVerified: true,
        veriBtnDisabled: false
      })
    }
  },

  veriCodeInput(e) {
    let _wx = this;
    let _type = e.currentTarget.dataset.type;
    let _value = e.detail.value;
    _wx.setData({
      veriCode: _value
    })

  },
  resetCountDown() {
    this.setData({
      veriBtnDisabled: false,
      veriBtnText: "发送验证码",
      //phoneVerified: true,
    })
  },
  countDownStart() {
    let _wx = this;

    _wx.setData({
      veriBtnDisabled: true,
      veriBtnText: _wx.data.timeCount
    })



    let _countDown = function () {
      if (_wx.data.veriBtnText == 0) {
        _wx.resetCountDown();
        _wx.setData({
          disabledInput: false
        })
        return;
      } else {
        countDownTimeout = setTimeout(function () {

          _wx.data.veriBtnText -= 1;

          _wx.setData({
            veriBtnText: _wx.data.veriBtnText
          })

          _countDown();
        }, 1000);
      }
    };
    _countDown();
  },
  sendVeriCode() {
    if (timer) {
      clearTimeout(timer)
    }
    let _wx = this;
    timer = setTimeout(function(){
      if (_wx.data.veriBtnDisabled == true) {
        return false;
      }
      let _phoneNum = _wx.phone_verfiy();
      if (!_phoneNum) {
        _wx.setData({
          errorTitle: "注意：",
          errorMessage: "请输入正确的手机号码"
        })
        _wx.showAlertMsg();
        return false;
      }
      //这里verBtnDisabled, countDownStart在按钮之初就设定，防止异步产生多次发送
      _wx.setData({
        veriBtnDisabled: true
      })
      ysRequest({
        url: 'merchantOpen_web/sms/sendSmsVerify.htm',
        method: 'post',
        params: {
          bindTel: _wx.data.phoneNum
        },
        succ: res => {
          let data = res;
          if (data.code == "0") {
            _wx.countDownStart();
            //这里verBtnDisabled, countDownStart在按钮之初就设定，防止异步产生多次发送
            //_wx.veriBtnDisabled=true;
            //_wx.countDownStart();
            //clearTimeout(countDownTimeout);
            _wx.setData({
              phoneVerified: true,
              disabledInput: true
              //veriBtnText: "获取验证码",
              //veriBtnDisabled: false
            })
          } else {
            //alert出错信息
            _wx.setData({
              errorTitle: "提示信息",
              errorMessage: data.msg
            })
            _wx.showAlertMsg();
            // _wx.resetCountDown();

            clearTimeout(countDownTimeout);
            _wx.setData({
              veriBtnText: "获取验证码",
              phoneVerified: false,
              veriBtnDisabled: false
            })

          }
        },
        fail: err => {
          _wx.setData({
            errorTitle: "短信发送失败：",
            errorMessage: err.msg
          });
          _wx.showAlertMsg();
        }
      })
    },200)
  },
  phone_verfiy() {
    var phone = this.data.phoneNum;
    if (phone == "") {
      // alert("请输入电话号码");
      return false;
    } else {
      // if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)) {
      //     alert('请输入有效的电话号码');
      if (!/^[1][0-9]{10}$/.test(phone)) {
        return false;
      }
      return phone;
    }
  },
  login() {
    var _wx = this;

    let _phoneNum = _wx.phone_verfiy();
    if (!_phoneNum) {


      _wx.setData({
        errorTitle: "注意：",
        errorMessage: "请输入正确的手机号码"
      })

      _wx.showAlertMsg();
      return false;
    }


    /**
     * todo：这里应开发要求，不验证
     */
    /*
    let _phoneVerified = _wx.data.phoneVerified;
    //todo:这里的逻辑是30S之内验证码过期，如果逻辑有变，按照实际逻辑改phoneVerified的逻辑
    if(!_phoneVerified){
      _wx.setData({
        errorTitle: "注意：",
        errorMessage: "请先获取验证码"
      });
      _wx.showAlertMsg();
      return false;
    }
    */

    let _veriCode = _wx.data.veriCode;
    if (_veriCode == '' || _veriCode == null) {
      _wx.setData({
        errorTitle: "注意：",
        errorMessage: "请输入密码"
      });
      _wx.showAlertMsg();
      return false;
    }
    ysRequest({
      url: 'merchantOpen_web/regist/userBind.htm',
      method: 'post',
      params: {
        bindTel: _wx.data.phoneNum,
        verifyCode: _wx.data.veriCode,
        openId: _wx.data.openid,
        unionId: _wx.data.app.globalData.unionId || '',
        bindSource: _wx.data.app.globalData.scene || "0"
      },
      succ: res => {
        let data = res;
        if (data.code == "0") {
          wx.setStorageSync('userBind', true);
          _wx.data.app.globalData.userBind = true;
          //wx.setStorageSync('session_key', data.data.session_key);
          // http://域名 /merchantOpen_web/regist/getCurrentUserInfo.htm
          //checkUserInfo绑定情况
          //wx.navigateTo("pages/login/login");

          wx.reLaunch({
            url: "/pages/index_bridge/index_bridge"
          })
        } else {
          //alert出错信息
          _wx.setData({
            errorTitle: "绑定失败：",
            errorMessage: data.msg
          });
          _wx.showAlertMsg();
        }
      }
    })
  },
  showAlertMsg() {
    let _wx = this;
    wx.showModal({
      title: _wx.data.errorTitle,
      content: _wx.data.errorMessage,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
        }
      }
    })
  },
  showHowtoModal() {
    this.setData({
      modalShow: true
    })
    this.modalAnimShow();
    let _wx = this;
    setTimeout(function () {
      _wx.setData({
        modalStatus: true
      })
    }, 400);


  },

  closeHowtoModal(e) {
    if (e.currentTarget.dataset.show == true) {
      this.setData({
        modalShow: false,
        modalStatus: false
      })
    }

  },

  modalAnimShow() {
    this.modalAnim.opacity(1)
      .translateY(0)
      .step({ duration: 300 })
    this.setData({ modalAnim: this.modalAnim.export() })
  },
  modalAnimReset() {
    this.modalAnim.opacity(0)
      .translateY(100)
      .step({ duration: 300 })
      .translateY(-100)
      .step({
        duration: 0
      })

    this.setData({ modalAnim: this.modalAnim.export() })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.modalAnim = wx.createAnimation({
      timingFunction: "ease-in-out"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    let app = getApp();
    _this.setData({
      app: app,
      openid: app.globalData.openid
    })
    if (!_this.data.openid) {
      wx.login({
        success: (res) => {
          ysRequest({
            url: 'merchantOpen_web/wechat/getOpenId.htm',
            params: {
              code: res.code
            },
            succ: res => {
              _this.setData({
                openid: res.data.openid
              })
            }
          })
        },
		fail:function(error){
			console.log(error)
		}
      })
    }
    ysRequest({
      url: 'merchantOpen_web/regist/getAccountByMsg.htm',
      succ: res => {
        _this.setData({
          getAccount: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
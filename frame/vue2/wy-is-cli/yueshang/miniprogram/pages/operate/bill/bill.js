// pages/operate/bill/bill.js
import main_config from "../../../config.js"
const {
  ysRequest,
  timeChange
} = require('../../../utils/util.js')
var t = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    currentTab: 'zj',
    tabs: [{
      id: 'zj',
      name: '租金'
    }, {
      id: 'wg',
      name: '物管费'
    }, {
      id: 'sd',
      name: '水电'
    }, {
      id: 'qt',
      name: '其他'
    }],
    globalData: {},
    lists: {},
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    pageList: [],
    tabList2: [{
      id: 'noPay',
      name: '未缴清'
    }, {
      id: 'process',
      name: '处理中'
    }, {
      id: 'hasPay',
      name: '已缴清'
    }, {
      id: 'all',
      name: '全部'
    }],
    currentTab2: 'noPay',
    isCheckAll: false // 是否全选
  },
  clickTab: function (e) {
    var id = e.currentTarget.dataset.current
    this.setData({
      currentTab: id,
      isCheckAll: false
    })
    this.getData()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  clickTab2: function (e) {
    var id = e.currentTarget.dataset.current

    let arr = []
    if (id === 'noPay') {
      arr = this.data.list1
    } else if (id === 'process') {
      arr = this.data.list2
    } else if (id === 'hasPay') {
      arr = this.data.list3
    } else if (id === 'all') {
      arr = this.data.list4
    }
    this.setData({
      currentTab2: id,
      pageList: arr
    })
  },
  checkboxChange(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    item.isChecked = !item.isChecked;
    if (!item.isChecked) {
      this.setData({
        isCheckAll: false
      })
    }
    let pageList = this.data.pageList;
    if (item.isChecked) {
      for (let i = 0; i < pageList.length; i++) {
        if (pageList[i].mustDate != null && pageList[i].mustDate === item.mustDate &&
          pageList[i].typeName != null && pageList[i].typeName === item.typeName && pageList[i].id !== item.id) {
          pageList[i].isChecked = true;
          pageList.splice(i, 1, pageList[i]);
        }
      }
    }
    pageList.splice(index, 1, item);

    if (this.data.currentTab2 === 'noPay' || this.data.currentTab2 === 'process') {
      this.setData({
        pageList,
        list1: pageList, // 保留操作过的数组，防止切换后选中状态消失
      })
    }
    if (this.data.currentTab2 === 'all') {
      this.setData({
        pageList,
        list4: pageList, // 保留操作过的数组，防止切换后选中状态消失
      })
    }
  },
  checkAll() {
    let arr = [...this.data.pageList];
    let isCheckAll = this.data.isCheckAll;

    // 如果已全选，再点击就是取消全选
    if (isCheckAll) {
      arr = arr.map((item) => {
        item.isChecked = false;
        return item
      })
      this.setData({
        pageList: arr,
        isCheckAll: false
      })
    } else {
      arr = arr.map((item) => {
        item.isChecked = true;
        return item
      })
      this.setData({
        pageList: arr,
        isCheckAll: true
      })
    }
  },
  makeOrder(e) {
    const _this = this;
    let type = e.currentTarget.dataset.type;
    // checkList 就是当前选中的项的集合
    let checkList = [];
    checkList = _this.data.pageList.filter(item => item.isChecked === true);

    if (checkList.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请先选择订单',
        showCancel: false
      })
      return
    }

    // 水电支付顺序判断
    if (this.data.currentTab === "sd") {
      // console.log(this.data.pageList)
      //console.log(checkList)
      let goBool = true;
      if (!checkList.every(item => item.feeType === "3" || item.feeType === "4")) {
        this.data.pageList.forEach((item, index) => {
          if (item.isChecked && item.feeType !== "3" && item.feeType !== "4") {
            let list = JSON.parse(JSON.stringify(this.data.pageList))
            let arr = list.splice(0, index)
            console.log(arr)
            // 选中项 如果有未选中的非水电项 false
            //  console.log(!arr.some(item => (!item.isChecked && (item.feeType !== "3" && item.feeType !== "4"))))
            if (arr.some(item => (!item.isChecked && (item.feeType !== "3" && item.feeType !== "4")))) {
              //存在支付顺序问题，弹框提示
              goBool = false;
              wx.showModal({
                title: '提示',
                content: '当前存在欠费，请按顺序缴纳费用!',
                showCancel: false
              })
            }
          }
        })
        if (!goBool) {
          return
        }
      }
    } else {
      if (checkList[0].id !== this.data.list1[0].id) {
        wx.showModal({
          title: '提示',
          content: '当前存在欠费，请按顺序缴纳费用。',
          showCancel: false
        })
        return
      }
    }



    // ==== 根据 configId 拦截 ====
    // 如果configId值为空
    let hasEmpty = checkList.some(item => !item.configId)
    let hasAnotherEmpty = checkList.some(item => !item.orgId)
    if (hasEmpty || hasAnotherEmpty) {
      wx.showModal({
        title: '提示',
        content: '请先在PMS中维护收款配置（交行）',
        showCancel: false
      })
      return
    }
    //  如果账单的 configId 值不相同
    let hasDiffrence = checkList.some((item, index, arr) => {
      return item.configId !== arr[0].configId
    })
    if (hasDiffrence) {
      wx.showModal({
        title: '提示',
        content: '收款配置不同不能提交订单',
        showCancel: false
      })
      return
    }

    // isUpload  字段 如果值为1  则提交订单时：费项只能是租金（1）和租金履约保证金（13）和综合管理费履约保证金（14），不能有其它费项，如果包含其它费项弹出“只能选择租金或租金履约保证金费项的应收或综合管理费履约保证金”;如果值为0 不做判断
    let isUpload = checkList.some((item, index, arr) => {
      return item.isUpload === '1'
    })
    if (isUpload) {
      let hasNoUpload = checkList.some((item, index, arr) => {
        if (item.feeType === '1') return false;
        if (item.feeType === '13') return false;
        if (item.feeType === '14') return false;
        return true;
      })
      if (hasNoUpload) {
        wx.showModal({
          title: '提示',
          content: '只能选择租金或租金履约保证金费项的应收或综合管理费履约保证金',
          showCancel: false
        })
        return
      }
    }
    ysRequest({
      url: 'merchantOperation_web/bill/checkHasUnPayList',
      method: 'post',
      params: {
        "mallId": t.globalData.detailInfo.mallId,
        "contId": checkList[0].bisContId,
        "feeType": checkList[0].feeType
      },
      succ: res => {
        if (res.code == '0' && res.num == '0') {
          if (type === 'bocomm_public') {
            const _this = this;
            wx.showModal({
              title: '银行转账',
              content: '确定下单吗',
              success(res) {
                if (res.confirm) {
                  ysRequest({
                    url: 'merchantOperation_web/bill/insertBillList',
                    method: 'post',
                    params: {
                      "df": "json",
                      "type": type,
                      "json": {
                        "mallId": t.globalData.detailInfo.mallId,
                        "contId": checkList[0].bisContId,
                        "creater": t.globalData.detailInfo.clerkId,
                        "itemList": checkList
                      }
                    },
                    succ: res => {
                      if (res.code == '0') {
                        // wx.showModal({
                        //   title: res.msg,
                        //   showCancel: false,
                        // })
                        if (res.order.payNo != '' && res.order.payNo != undefined && res.order.payNoName != '' && res.order.payNoName != undefined) {
                          wx.showModal({
                            title: '账户信息',
                            content: '账户名称:' + res.order.payNoName + '\r\n' + '账户编码:' + res.order.payNo,
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '账户信息',
                            content: '订单生成中，请稍后！',
                            showCancel: false,
                          })
                        }
                        _this.getData();
                      }
                    },
                    fail: err => {
                      _this.getData();
                    }
                  })
                } else if (res.cancel) {
                  return false
                }
              }
            })
          }

          if (type === 'bocomm_private') {
            const _this = this;
            wx.showModal({
              title: '微信支付',
              content: '确定下单吗',
              success(res) {
                if (res.confirm) {
                  ysRequest({
                    url: 'merchantOperation_web/bill/insertBillList',
                    method: 'post',
                    params: {
                      "df": "json",
                      "type": type,
                      "json": {
                        "mallId": t.globalData.detailInfo.mallId,
                        "contId": checkList[0].bisContId,
                        "creater": t.globalData.detailInfo.clerkId,
                        "itemList": checkList,
                        "openId": t.globalData.detailInfo.openId,
                        "ip": _this.data.ip
                      }
                    },
                    succ: res => {
                      if (res.code == '0') {
                        wx.showToast({
                          title: res.msg,
                          duration: 2000,
                          mask: true
                        })

                        if (res.order._thistranPackage != '' && res.order.tranPackage != undefined) {
                          let params = JSON.parse(res.order.tranPackage);
                          let orderNo = res.order.orderNo;
                          wx.requestPayment({
                            ...params,
                            'success': function (res) {},
                            'fail': function (res) {},
                            'complete': function (res) {

                            }
                          })
                        } else if (res.order.displayCodeText != '' && res.order.displayCodeText != undefined) {
                          const text = encodeURIComponent(res.order.displayCodeText);

                          wx.navigateTo({
                            url: `../billJump/jump?url=${text}`,
                          })
                        } else {
                          wx.showModal({
                            title: '账户信息',
                            content: '订单生成中，请稍后！',
                            showCancel: false,
                          })
                        }
                        _this.getData();
                      }
                    },
                    fail: err => {
                      _this.getData();
                    }
                  })
                } else if (res.cancel) {
                  return false
                }
              }
            })
          }
        } else if (res.code === "0" && res.num >= 1) {
          wx.showModal({
            title: '提示',
            content: '存在未支付订单，请先处理。',
            showCancel: false
          })
          return;
        } else if (res.code === "1") {
          if (res.msg != null) {
            wx.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false
            })
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: '未知异常，请联系管理员。',
              showCancel: false
            })
            return;
          }
        }
      },
      fail: err => {
        _this.getData();
      }
    })



  },

  // 如果是支付中，且公对公的账单，则弹出账号密码。如果是支付中，公对私的账单则弹出支付界面。
  showAccount(e) {
    const _this = this;
    let item = e.currentTarget.dataset.item;
    if (item == null || item == '' || item.payStatus === "01" || item.payStatus === "05") {
      return;
    }
    ysRequest({
      url: 'merchantOperation_web/bill/selectBillList',
      method: 'post',
      params: {
        "item": item
      },
      succ: res => {
        wx.showModal({
          title: "提示",
          content: "请选择操作",
          confirmText: "取消支付",
          confirmColor: "#5fbaf1",
          cancelText: "继续支付",
          cancelColor: "#5fbaf1",
          success: (result) => {
            if (result.confirm) {
              console.log("取消支付");
              ysRequest({
                url: "merchantOperation_web/bill/cancelBill.htm",
                method: "post",
                params: {
                  df: "json",
                  type: "re_place_order",
                  orderNo: res.orderNo,
                  json: {
                    timestamp: new Date().getTime(),
                  },
                },
                succ: (cancelRes) => {
                  console.log(cancelRes, "----取消订单");
                  if (cancelRes.code == "0") {
                    wx.showToast({
                      title: "取消成功",
                    });
                    _this.getData();
                  } else {
                    wx.showModal({
                      title: cancelRes.msg,
                      showCancel: false,
                    });
                  }
                },
              });

            } else if (result.cancel) {
              //公对公显示
              if (res.code == "0" && res.payType == "bocomm_public") {
                if (res.payNo != "" && res.payNoName != "") {
                  wx.showModal({
                    title: "账户信息",
                    content: "账户名称:" +
                      res.payNoName +
                      "\r\n" +
                      "账户编码:" +
                      res.payNo,
                    showCancel: false,
                  });
                } else {
                  wx.showModal({
                    title: "账户信息",
                    content: "订单生成中，请稍后！",
                    showCancel: false,
                  });
                }
                //公对私显示
              } else if (res.code == "0" && res.payType == "bocomm_private") {
                // debugger
                // if (res.tranPackage != '' && res.tranPackage != undefined){
                //   let params = JSON.parse(res.tranPackage);
                let orderNo = res.orderNo;
                ysRequest({
                  url: "merchantOperation_web/bill/rebuildOrderNo",
                  method: "post",
                  params: {
                    df: "json",
                    type: "re_place_order",
                    orderNo: orderNo,
                    json: {
                      timestamp: new Date().getTime(),
                    },
                  },
                  succ: (res) => {
                    console.log(res, "----公对私重新生成订单");
                    if (res.code == "0") {
                      wx.showToast({
                        title: res.msg,
                        duration: 2000,
                        mask: true,
                      });
                      let rebuildParams = JSON.parse(res.data.jsonparams);
                      console.log("rebuildParams>>>>=========", rebuildParams);
                      wx.requestPayment({
                        ...rebuildParams,
                        success: function (res) {
                          console.log("重新生成成功>>>>====", res);
                        },
                        fail: function (res) {},
                        complete: function (res) {},
                      });
                      _this.getData();
                    } else {
                      wx.showModal({
                        title: res.msg,
                        showCancel: false,
                      });
                    }
                  },
                });
                // wx.showModal({
                //   title: '公对私支付',
                //   content: '是否重新支付',
                //   success(res) {
                //     if (res.confirm) {
                //
                //     } else if (res.cancel) {
                //       return false
                //     }
                //   }
                // })

                //   } else if (res.displayCodeText != '' && res.displayCodeText != undefined) {
                //     ysRequest({
                //       url: 'merchantOperation_web/bill/rebuildOrderNo',
                //       method: 'post',
                //       params: {
                //         "df": "json",
                //         "type": "re_place_order",
                //         "orderNo": orderNo,
                //         "json": {
                //           "timestamp": new Date().getTime()
                //         }
                //       },
                //       succ: res => {
                //         const text = encodeURIComponent(res.displayCodeText);
                //         wx.navigateTo({
                //           url: `../billJump/jump?url=${text}`,
                //         })
                //       },
                //     })
                //   }
                //   else{
                //     wx.showModal({
                //       title: '账户信息',
                //       content: '订单生成中，请稍后！',
                //       showCancel: false,
                //     })
                //   }
              }
            }
          },
        });
      }
    })
  },

  getData: function () {
    ysRequest({
      url: 'merchantOperation_web/bill/billDetail',
      method: 'post',
      params: {
        'feeTypes': this.data.currentTab,
        "clerkId": t.globalData.detailInfo.clerkId,
        "mallId": t.globalData.detailInfo.mallId
      },
      succ: res => {
        if (res.code == '0') {
          for (let i = 0; i < res.data.historyBill.length; i++) {
            res.data.historyBill[i].isChecked = false;

            // 目前还没返回这个字段，先写测试数据
            // if(i === 1){
            //   res.data.historyBill[i].payStatus = '02'
            // } else {

            //   res.data.historyBill[i].payStatus = '01';
            // }
          }

          // 将所有返回的数据，根据不同的状态分解成不同的数组
          let arr = res.data.historyBill;
          let list1 = arr.filter((item) => item.payStatus === '01');
          let list2 = arr.filter((item) => item.payStatus === '02' || item.payStatus === '03' || item.payStatus === '04');
          let list3 = arr.filter((item) => item.payStatus === '05');

          list3.sort(function (a, b) {
            return new Date(b.qzYearMonth) - new Date(a.qzYearMonth)
          });

          let ip = res.data.ip;

          // 深拷贝，防止数据在选中之后污染
          list1 = JSON.parse(JSON.stringify(list1));
          list2 = JSON.parse(JSON.stringify(list2));
          list3 = JSON.parse(JSON.stringify(list3));
          let list4 = JSON.parse(JSON.stringify(arr));

          this.setData({
            lists: res.data,
            list1,
            list2,
            list3,
            list4,
            pageList: list1,
            currentTab2: 'noPay',
            ip
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      }
    })
  },

  continuePay: function (e) {
    // 继续支付
    const _this = this;
    const pageList = _this.data.pageList;
    let item = pageList[0];
    ysRequest({
      url: 'merchantOperation_web/bill/selectBillList',
      method: 'post',
      params: {
        "item": item
      },
      succ: res => {
        //公对公显示
        if (res.code == "0" && res.payType == "bocomm_public") {
          if (res.payNo != "" && res.payNoName != "") {
            wx.showModal({
              title: "账户信息",
              content: "账户名称:" +
                res.payNoName +
                "\r\n" +
                "账户编码:" +
                res.payNo,
              showCancel: false,
            });
          } else {
            wx.showModal({
              title: "账户信息",
              content: "订单生成中，请稍后！",
              showCancel: false,
            });
          }
          //公对私显示
        } else if (res.code == "0" && res.payType == "bocomm_private") {
          let orderNo = res.orderNo;
          ysRequest({
            url: "merchantOperation_web/bill/rebuildOrderNo",
            method: "post",
            params: {
              df: "json",
              type: "re_place_order",
              orderNo: orderNo,
              json: {
                timestamp: new Date().getTime(),
              },
            },
            succ: (res) => {
              console.log(res, "----公对私重新生成订单");
              if (res.code == "0") {
                wx.showToast({
                  title: res.msg,
                  duration: 2000,
                  mask: true,
                });
                let rebuildParams = JSON.parse(res.data.jsonparams);
                console.log("rebuildParams>>>>=========", rebuildParams);
                wx.requestPayment({
                  ...rebuildParams,
                  success: function (res) {
                    console.log("重新生成成功>>>>====", res);
                  },
                  fail: function (res) {},
                  complete: function (res) {},
                });
                _this.getData();
              } else {
                wx.showModal({
                  title: res.msg,
                  showCancel: false,
                });
              }
            },
          });
        }
      }
    })
  },

  cancelPay: function (e) {
    // 取消支付
    const _this = this;
    const pageList = _this.data.pageList;
    wx.showModal({
      title: "提示",
      content: "确认取消支付吗？",
      confirmText: "确认",
      confirmColor: "#5fbaf1",
      cancelText: "取消",
      cancelColor: "#5fbaf1",
      success: (result) => {
        if (result.confirm) {
          // checkList 就是当前选中的项的集合
          let checkList = [];
          checkList = pageList.filter(item => item.isChecked === true);
          if (checkList.length === 0) {
            wx.showModal({
              title: '提示',
              content: '请先选择订单',
              showCancel: false
            })
            return
          }
          
          // 计算列表数据最小 日期
          let pageListLastDate = pageList.map((item) => {
            let ymd = '20' + item.lastDate
            return new Date(ymd).getTime()
          })
          let minPageListLastDate = Math.min(...pageListLastDate)
          console.log(pageListLastDate, '-----')
          console.log(minPageListLastDate, '-----')
          // 计算已选列表项最大 日期
          let checkListLastDate = checkList.map((item) => {
            let ymd = '20' + item.lastDate
            return new Date(ymd).getTime()
          })
          let maxCheckListLastDate = Math.max(...checkListLastDate)
          if (checkList.length < pageList.length && minPageListLastDate < maxCheckListLastDate) {
            let time = timeChange(maxCheckListLastDate);
            let tip = `最迟缴费日${time}之前，存在未支付订单，请按顺序支付或取消`
            wx.showModal({
              title: '提示',
              content: tip,
              showCancel: false
            })
            return
          }
          let item = checkList[0];
          if (item == null || item == '' || item.payStatus === "01" || item.payStatus === "05") {
            return;
          }
          let receIds = checkList.map(item => {
            return item.id
          })
          ysRequest({
            url: 'merchantOperation_web/bill/selectBillList',
            method: 'post',
            params: {
              "item": item
            },
            succ: res => {
              console.log("取消支付");
              ysRequest({
                url: "merchantOperation_web/bill/cancelBill.htm",
                method: "post",
                params: {
                  df: "json",
                  type: "re_place_order",
                  orderNo: res.orderNo,
                  receIds: receIds.join(','),
                  json: {
                    timestamp: new Date().getTime(),
                  },
                },
                succ: (cancelRes) => {
                  console.log(cancelRes, "----取消订单");
                  if (cancelRes.code == "0") {
                    wx.showToast({
                      title: "取消成功",
                    });
                    _this.getData();
                  } else {
                    wx.showModal({
                      title: cancelRes.msg,
                      showCancel: false,
                    });
                  }
                },
              });
            }
          })
        } else if (result.cancel) {
          checkList = []
        }
      },
    });
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
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
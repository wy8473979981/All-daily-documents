// pages/question.js
const { ysRequest } = require('../../utils/util.js');
var t = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoShow: true,
    showSecondLevelList: false,
    num: -1,
    questionRadio: '../../static/images/question-radio.png',
    questionRadioActive: '../../static/images/question-radio-active.png',
    questionCheckBook: '../../static/images/question-checkbook.png',
    questionCheckBookActive: '../../static/images/question-checkbook-active.png',
    isConfirm: false,
    isSuccess: true,
    globalData: {},
    questions: {},
    lists: [],
    content: ''
  },
  pre: function () {
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1
      })
    }
  },
  next: function () {
    if(this.data.num < 12) {
      this.setData({
        num: this.data.num + 1
      })
    }
  },
  start: function () {
    this.setData({
      infoShow: false,
      num: 1
    })
  },
  selectRadio: function (e) {
    var number = e.currentTarget.dataset.number;
    var childId = e.currentTarget.dataset.childid;
    this.changeRadio(number, childId);
  },
  selectCheckbox: function (e) {
    var number = e.currentTarget.dataset.number;
    var childId = e.currentTarget.dataset.childid;
    var parentId = e.currentTarget.dataset.parentid;
    this.changeCheckbox(number, parentId, childId);
  },
  changeCheckbox: function (number, parentId, childId) {
    for(var i=0; i<this.data.questions.questionList[number - 1].answerList.length; i++) {
      if (this.data.questions.questionList[number - 1].answerList[i].id == parentId) {
        for (var j = 0; j < this.data.questions.questionList[number - 1].answerList[i].secondLevelList.length; j++){
          if (this.data.questions.questionList[number - 1].answerList[i].secondLevelList[j].id == childId) {
            var tempData = 'questions.questionList[' + (number - 1) + '].answerList[' + i + '].secondLevelList[' + j + '].checked';
            if(this.data.questions.questionList[number - 1].answerList[i].secondLevelList[j].checked){
              this.setData({
                [tempData]: false
              })
            } else {
              this.setData({
                [tempData]: true
              })
            }
          }
        }
      }
    }
  },
  changeRadio: function (number, childId) {
    let tempData = 'questions.questionList['+ (number-1) +'].checked';
    this.setData({
      [tempData]: childId
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  confirm: function(e) {
    console.log(this.data.questions.questionList)
    var _this = this;
    wx.showModal({
      title: '提示',
      content: "确定提交",
      showCancel: true,
      success(res) {
        if(res.confirm) {
          var resultList = [];
          var data = _this.data.questions.questionList;
          for(var i = 0; i <data.length; i++) {
            if(data[i].type == 1) { //单选
              for(var j = 0; j < data[i].answerList.length; j++) {
                if (data[i].answerList[j].id == data[i].checked) {
                  resultList[i] = {
                    answerName: data[i].answerList[j].name,
                    questionId: data[i].number,
                    answerId: data[i].checked
                  }
                }
              }
            } else if (data[i].type == 2) {
              var answerId = data[i].checked
              var arrId = [];
              var arrName = []
              for (var j = 0; j < data[i].answerList.length; j++) {
                if (data[i].answerList[j].id == data[i].checked) {
                  var name = data[i].answerList[j].name
                  if (data[i].answerList[j].secondLevelList) {
                    for (var k = 0; k < data[i].answerList[j].secondLevelList.length; k++) {
                      if (data[i].answerList[j].secondLevelList[k].checked) {
                        arrId.push(data[i].answerList[j].secondLevelList[k].id)
                        arrName.push(data[i].answerList[j].secondLevelList[k].name)
                        resultList[i] = {
                          questionId: data[i].number,
                          answerId: answerId + '-' + arrId.toString().replace(',', '|'),
                          answerName: name + '-' + arrName.toString().replace(',', '|')
                        }
                      }
                    }
                  } else {
                    resultList[i] = {
                      questionId: data[i].number,
                      answerId: answerId,
                      answerName: name
                    }
                  }
                }
              }
            } else if(data[i].type == 3) {
              resultList[i] = {
                questionId: data[i].number,
                answerId: null,
                answerName: _this.data.content
              }
            }
          }
          ysRequest({
            url: 'merchantService_web/merQuestionnaire/saveMerQuestionnaireInfo.htm',
            method: 'post',
            params: {
              "merQuestionnaireId": '1',
              "mallId": _this.data.globalData.detailInfo.mallId,
              "clerkOpenId": _this.data.globalData.detailInfo.clerkOpenId,
              "clerkId": _this.data.globalData.detailInfo.clerkId,
              "resultList": resultList
            },
            succ: res => {
              if (res.code == '0') {
                _this.setData({
                  isConfirm: true,
                  isSuccess: true
                })
              } else {
                _this.setData({
                  isConfirm: true,
                  isSuccess: false
                })
              }
            }
          })
        }
      }
    })
  },
  successFn: function (e){
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  errorFn:function (e) {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   
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
    this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantService_web/merQuestionnaire/getMerQuestionnaireById.htm',
      method: 'post',
      params: {
        "questionnaireId": '1'
      },
      succ: res => {
        var newData = this.initData(res.data);
        this.setData({
          questions: newData
        })
        console.log(newData)
      }
    })
  },
  // 整理获取的数据格式
  initData: function (data) {
    var tempData = {}
    tempData.id = data.id;
    tempData.name = data.name;
    tempData.title = data.title;
    tempData.questionList = data.questionList;
    for(var i = 0; i < tempData.questionList.length; i++) {
      if(tempData.questionList[i].type ==1) { //以及选择
        tempData.questionList[i].checked = tempData.questionList[i].answerList[0].id
      } else if(tempData.questionList[i].type == 2) { // 二级选择
        for (var j = 0; j < tempData.questionList[i].answerList.length; j++) {
          if (tempData.questionList[i].answerList[j].secondLevelList) {
            for (var k = 0; k < tempData.questionList[i].answerList[j].secondLevelList.length; k++) {
              tempData.questionList[i].answerList[j].secondLevelList[k].checked = false;
            }
          } else {
            tempData.questionList[i].checked = tempData.questionList[i].answerList[j].id
          }
        }
      } else if(tempData.questionList[i].type == 3) { // 输入框

      }
    }
    return tempData;
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
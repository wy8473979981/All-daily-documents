import main_config from "../../config.js"
var t = getApp();
// 图片上传
function upload() {
  return new Promise(function (resolve, reject) {
    let _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        wx.showLoading({
          title: '上传中',
        })
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${main_config.baseUrl}merchantOpen_web/advise/fileUpload.htm`,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            Accept: "application/json, text/plain, */*",
            'Content-Type': 'multipart/form-data',
          },
          formData: {
            version: '1.0',
            sign: main_config.sign,
            timestamp: new Date().getTime(),
            creator: t.globalData.detailInfo.clerkName
          },
          success(res) {
            wx.hideLoading()
            resolve(res)
          }
        })
      }
    })
  })
}

// 招商局日销售提报图片上传接口
function zsjFileUpload(targetId = '') {
  return new Promise(function (resolve, reject) {
    let _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        wx.showLoading({
          title: '上传中',
        })
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${main_config.baseUrl}financial_service/sdk/platform/file/api`,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            Accept: "application/json, text/plain, */*",
            'Content-Type': 'multipart/form-data',
          },
          formData: {
            action: 1002,
            single: 2,
            category: 'WX_TBYYE',
            maxSize: 20480,
            targetId: targetId,
          },
          success(res) {
            wx.hideLoading()
            resolve(res)
          }
        })
      }
    })
  })
}

// 表单校验
var checkForm = (function(){
  return {
    phone: function (phone) {
      let reg = /^[1][0-9]{10}$/
      return reg.test(phone)
    },
    idCard: function (idCard) {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return reg.test(idCard)
    }
  }
})()

// 格式时间
var formateDate = function (date, type, dis) {
  // type: '-'
  // dis: 间隔
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  if(!!dis){
    let dateStr = (date.getFullYear() + dis) + type + month + type + day
    return dateStr
  } else{
    let dateStr = date.getFullYear() + type + month + type + day
    return dateStr
  }
}
// 数字千分位
var filterNum = function (num) {
  var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  })
  return res;
}
module.exports = {
  upload,
  zsjFileUpload,
  checkForm,
  formateDate,
  filterNum
}

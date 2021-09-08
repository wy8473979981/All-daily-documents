import Vue from "vue";
import App from "./App.vue";
import './assets/styles/reset.css';
import "./plugins/element.js";
// import '../theme/index.css';
import store from './store/index';
import router from './router';
import './utils/date.js';
import comps from '@comps';
import './filter';
import enums from './enum/index';
import timeoutRouter from './prototype.js';
import importDirective from './directive';
import objectUtil from './utils/params.js';
import Common from './utils/common.js';
import Print from './utils/print.js';
import myCharts from './plugins/echarts/myCharts.js';
import { Popover } from 'element-ui';
import './utils/dialogDrag';
import download from 'downloadjs';
Vue.use(Popover);
Vue.use(Print);
// import myG6 from './plugins/g6/myG6.js';
import fileApi from '@/apis/apis/file';
import approval from '@/apis/apis/approval';
Vue.prototype.$file = fileApi;
Vue.prototype.$approval = approval;

// 全局注册userInfo,通过vuex userInfo获取数据
// Object.defineProperty(Vue.prototype, '$userInfo', {
//   value: store.state.userInfo
// })

// 全局注册approveDetail,通过vuex approveDetail获取数据
// Object.defineProperty(Vue.prototype, '$approveDetail', {
//   value: store.state.approveDetail
// })

// 全局注册action,附件上传限制文件类型
Object.defineProperty(Vue.prototype, '$action', {
  value: 'image/jpeg,image/gif,image/png,image/bmp,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.txt,.zip,.html,.url'
})

// 全局注册token,附件上传增加token
let token = localStorage.getItem('ys_contract_token')
if (token) {
  Object.defineProperty(Vue.prototype, '$token', {
    value: JSON.parse(token).token
  })
}

console.log(process.env.NODE_ENV)
console.log(Vue.prototype.$file)
console.log(Vue.prototype.$approval)
// if(process.env.NODE_ENV !== "production") require("./mock/mock.js")  // 只在开发环境中引入，生产环境不引入mock
// require("./mock/mock.js")

Vue.use(comps);
Vue.use(myCharts);

// v-viewer图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

// Vue.use(myG6);
Vue.config.productionTip = false;
Vue.prototype.$enums = enums;
Vue.prototype.$params = null;
Vue.prototype.$timeoutRouter = timeoutRouter;
Vue.prototype.$objectUtil = objectUtil;
Vue.prototype.$common = Common;

// 全局上传附件限制提示
Vue.prototype.beforeUploadGlobal = (file) => {
  // const isJPG = file.type === 'image/jpeg'
  console.log(file)
  const isLt50M = file.size / 1024 / 1024 < 50
  // .url文件不受上传限制，判断类型不经上传
  const isType = file.name.substr(-4) == '.url' ? false : true
  // if (!isJPG) {
  //   Vue.prototype.$message('上传附件只能是 JPG 格式!')
  // }
  console.log(isType)
  if (!isLt50M) {
    Vue.prototype.$message.error('上传附件大小不能超过 50MB!')
  }
  if (!isType) {
    Vue.prototype.$message.error('仅支持.jpg, .gif, .png, .bmp, .pdf, .doc, .docx, .jpeg, .ppt, .xlsx, .xls, .txt, .zip, .html格式文件')
  }
  // return isJPG && isLt2M
  return isLt50M && isType
}
// 全局上传附件删除提示
Vue.prototype.beforeRemoveGlobal = (file) => {
  var isType = file.name.substr(-4) == '.url' ? false : true
  if (!isType) return
  if (file.size) {
    var isLt50M = file.size / 1024 / 1024 < 50
  } else {
    var isLt50M = file.fileSize / 1024 / 1024 < 50
  }
  if (isLt50M) {
    return Vue.prototype.$confirm(`确定移除 ${ file.name }？`)
  }
}
// 全局删除附件 不使用箭头函数让this指针未传输页面
Vue.prototype.handleRemoveGlobal = function (file, value) {
  let nowfile
  if(file.response) {
    nowfile = file.response.data.fileId
  }else {
    nowfile = file.id + ','
  }
  if (value) {
    let fileId = this.form.bizEntityJson[value]
    this.form.bizEntityJson[value] = fileId.replace(nowfile,'')
  } else {
    let fileId = this.form.bizEntityJson.fileId
    this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
  }
}
// 全局上传成功后回调判断 不使用箭头函数让this指针未传输页面
Vue.prototype.handleSuccessGlobal = function (res, file, num, value) {
  if (res.code == 1) {
    const fileId = res.data.fileId
    if (num == 1) {
      if (value) {
        this.$set(this.form.bizEntityJson, value, fileId)
      } else {
        this.$set(this.form.bizEntityJson, 'fileId', fileId)
      }
      this.fileDetail = file
    } else {
      if (value) {
        // $set无法清除必填提示框，需提前注册变量
        if (!this.form.bizEntityJson[value]) {
          this.$set(this.form.bizEntityJson, value, fileId)
        } else {
          this.form.bizEntityJson[value] += fileId
        }
      } else {
        if (!this.form.bizEntityJson.fileId) {
          this.$set(this.form.bizEntityJson, 'fileId', fileId)
        } else {
          this.form.bizEntityJson.fileId += fileId
        }
      }
    }
  } else if (res.code == 403) {
    router.push({ name: 'login' })
    Vue.prototype.$message.error('登录已失效，请重新登录')
  } else {
    if (res.message) {
      Vue.prototype.$message.error(res.message)
    } else {
      Vue.prototype.$message.error('上传错误，请联系管理员')
    }
  }
}
// 全局上传失败后回调判断
Vue.prototype.handleErrorGlobal = (err) => {
  if (!err) return Vue.prototype.$message.error('系统错误，请稍后重试')
  const error = JSON.parse(err.message)
  if (error.code == 403) {
    router.push({ name: 'login' })
    Vue.prototype.$message.error('登录已失效，请重新登录')
  } else {
    if (error.message) {
      Vue.prototype.$message.error(error.message)
    } else {
      Vue.prototype.$message.error('上传错误，请联系管理员')
    }
  }
}
// 全局上传附件点击打开
Vue.prototype.downLoadFileGlobal = (file) => {
  if (file.showUrl) {
    const showUrl = file.showUrl
    const showName = file.originalFilename
    const showType = file.contentType
    const downloadUrl = showUrl.replace('/ys-file-server/view/show/', '/ys-file-server/view/download/')
    // web端转换download后端方法直接下载
    window.open(downloadUrl)
    return
    // 图片通过downloadjs强制下载
    // if (/(png|jpg|jpeg|gif|bmp|pdf)/i.test(showType)) {
    //   window.open(downloadUrl)
    //   // download(showUrl, showName, showType)
    // } else {
    //   window.open(showUrl, '_blank')
    // }
    // return
  }
  const fileIds = file.response.data.fileId
  Vue.prototype.$file.loadFiles({fileIds}).then(res => {
    if (res.code == 1 && res.data) {
      const showUrl = res.data.fileShowVoList[0].showUrl
      const showName = res.data.fileShowVoList[0].originalFilename
      const showType = res.data.fileShowVoList[0].contentType
      const downloadUrl = showUrl.replace('/ys-file-server/view/show/', '/ys-file-server/view/download/')
      // web端转换download后端方法直接下载
      window.open(downloadUrl)
      // 图片通过downloadjs强制下载
      // if (/(png|jpg|jpeg|gif|bmp|pdf)/i.test(showType)) {
      //   window.open(downloadUrl)
      //   // download(showUrl, showName, showType)
      // } else {
      //   window.open(showUrl, '_blank')
      // }
    }
  })
}
// 全局输入框获取焦点去除千分位
Vue.prototype.toFixedFocus = (el) => {
  let value = el.target.value.replace(/,/gi, '')
  if (value) {
    el.target.value = value
    console.log(el.target.value)
  }
}
// 全局输入框无小数失去焦点补.00
Vue.prototype.toFixedBlur = (el) => {
  let value = el.target.value.replace(/,/gi, '')
  if (isNaN(value)) {
    el.target.value = '0.00'
    return
  }
  console.log(value)
  if (value) {
    // 负号在第一位以外位置删除
    for (let key in value) {
      if (key > 0 && value.charAt(key) == '-') {
        value = value.replace('-', '')
      }
    }
    if (value.indexOf('.') == - 1) {
      if (value != '-') {
        el.target.value = value + '.00'
      } else {
        el.target.value = ''
      }
    } else {
      if (value.charAt(value.length - 1) == '.') {
        el.target.value = value + '00'
      }
      if (value.charAt(value.length - 2) == '.') {
        el.target.value = value + '0'
      }
    }
    console.log(value)
    // 千分位转化
    el.target.value = (parseFloat(value).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
}
// 数字转中文大写金额
Vue.prototype.convertCurrency = (money) => {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}
// 全局详情审批单跳转
Vue.prototype.openUrlGlobal = function (number, approveId, processId) {
  if (window.location.href.search(/resdev/) != -1) {
    if (number.substr(0, 1) != 9) {
      this.$message.closeAll()
      this.$message.error('无对应老网批环境')
    } else {
      let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: processId}})
      window.open(routeData.href, approveId)
    }
  } else if (window.location.href.search(/resdemo/) != -1) {
    if (number.substr(0, 1) != 9) {
      window.open(`http://demo.powerlong.com/PowerDesk/res/res-approve-info.action?id=${approveId}`)
    } else {
      let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: processId}})
      window.open(routeData.href, approveId)
    }
  } else {
    if (number.substr(0, 1) != 9) {
      window.open(`http://pd.powerlong.com/res/res-approve-info.action?id=${approveId}`)
    } else {
      let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: processId}})
      window.open(routeData.href, approveId)
    }
  }
}

// 打开明源-格式化PageUrl链接
Vue.prototype.openMyPageUrl = (pageUrl) => {
  if (pageUrl) {
    const param = {
      pageUrl: pageUrl
    }
    Vue.prototype.$approval.pageMyPageUrl(param).then(res => {
      if(res.code == 1) {
        if (res.data) {
          window.open(res.data);
        }
      }
    })
  }
}

// 打开明源-格式化FileUrl链接
Vue.prototype.openMyFileUrl = (attachmentUrl) => {
  if (attachmentUrl) {
    const param = {
      attachmentUrl: attachmentUrl
    }
    Vue.prototype.$approval.parseMyFileUrl(param).then(res => {
      if(res.code == 1) {
        if (res.data) {
          window.open(res.data);
        }
      }
    })
  }
}

// 导入全局指令
importDirective(Vue)

new Vue({
  router,
  store,
	data(){
		return {
			$params:null
		}
	},
  render: h => h(App),
	
}).$mount("#app");

<template>
  <div>
    <p v-if="title">{{ title }}</p>
    <p class="fj" @click="download(item, index)" v-for="(item, index) in value" :key="item.id">{{ item.originalFilename }}</p>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  props: ['value', 'title'],
  data() {
    return {
      // open: false
    }
  },
  methods: {
    download(item, index) {
      var contentType = ''
      if (/(ppt)/i.test(item.contentType)) {
        contentType = 'ppt'
      } else if (/(docx)/i.test(item.contentType)) {
        contentType = 'docx'
      } else if (/(doc)/i.test(item.contentType)) {
        contentType = 'doc'
      } else if (/(xlsx)/i.test(item.contentType)) {
        contentType = 'xlsx'
      } else if (/(xls)/i.test(item.contentType)) {
        contentType = 'xls'
      } else if (/(pdf)/i.test(item.contentType)) {
        contentType = 'pdf'
      } else {
        contentType = 'ios'
      }
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信环境
        var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || ''
        var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent)
        if (isIOS) {
          // ios ppt文件不需要调取小程序api打开
          window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ios', fileName: item.originalFilename},'*')
          // if (contentType == 'ppt') {
          //   window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ppt', fileName: item.originalFilename},'*')
          // } else {
          //   window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ios', fileName: item.originalFilename},'*')
          // }
        } else {
          if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
            window.parent.postMessage({type:'download', url: item.showUrl, contentType: contentType, fileName: item.originalFilename, img: true},'*')
          } else {
            window.parent.postMessage({type:'download', url: item.showUrl, contentType: contentType, fileName: item.originalFilename},'*')
          }
        }
      } else if (window.WebViewJavascriptBridge) {
        // 安卓环境
        window.WebViewJavascriptBridge.callHandler('downloadFile', {param: '详情', url: item.showUrl, fileName: item.originalFilename}, function () {})
      } else if (window.webkit && window.webkit.messageHandlers) {
        // ios环境
        window.webkit.messageHandlers.downloadFile.postMessage({title: '详情', url: item.showUrl, fileName: item.originalFilename})
      } else {
        // web环境
        window.open(item.showUrl)
      }
      return
      var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || ''
      var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent)
      if (isIOS) {
        var ua = window.navigator.userAgent.toLowerCase()
        if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')) {
          window.parent.postMessage({type:'download', url: item.showUrl},'*')
        } else {
          window.open(item.showUrl)
        }
      } else {
        window.open(item.showUrl, '_self')
      }
      return
      var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || ''
      var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent)
      if (isIOS) {
        var ua = window.navigator.userAgent.toLowerCase()
        // 如果是企业微信环境
        if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')) {
          this.copyText(item.showUrl, index + 1)
        } else {
          var eleLink = document.createElement('a')
          eleLink.download = item.originalFilename
          eleLink.style.display = 'none'
          // 字符内容转变成blob地址
          eleLink.href = item.showUrl
          // 触发点击
          document.body.appendChild(eleLink)
          eleLink.click()
          // 然后移除
          document.body.removeChild(eleLink)
        }
      } else {
        window.open(item.showUrl, '_self')
        // var iframe = document.createElement('iframe')
        // iframe.style.display = 'none'
        // iframe.src = "javascript: '<script>location.href=\"" + item.showUrl + "\"<\/script>'"
        // document.getElementsByTagName('body')[0].appendChild(iframe)
        // this.pageGoFile(item.showUrl, '', item.originalFilename)
      }
      // if(item.showUrl) {
      //   window.open(item.showUrl, '_self')
      // }
    },
    pageGoFile(url, param, title) {
      console.log('调用app方法')
      // 取到文件名开始到最后一个点的长度
      var first = title.lastIndexOf('.')
      //取到文件名长度
      var namelength = title.length
      //截取获得后缀名
      var filesuffix = title.substring(first + 1, namelength)
      var data = {
        url: url,
        type: filesuffix,
        fileName: title
      }
      var ua = window.navigator.userAgent.toLowerCase()
      if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')) {
        //企业微信打开 sweet
        return
      }
      if (window.WebViewJavascriptBridge) {
        window.open(url, '_self')
        return
      }
    },
    // 复制到剪切板
    copyText(text, index) {
      // 数字没有 .length 不能执行selectText 需要转化成字符串
      const textString = text.toString()
      let input = document.querySelector('#copy-input')
      if (!input) {
        input = document.createElement('input')
        input.id = 'copy-input'
        input.readOnly = 'readOnly' // 防止ios聚焦触发键盘事件
        input.style.position = 'absolute'
        input.style.left = '-1000px'
        input.style.zIndex = '-1000'
        document.body.appendChild(input)
      }

      input.value = textString
      // ios必须先选中文字且不支持 input.select()
      selectText(input, 0, textString.length)
      console.log(document.execCommand('copy'), 'execCommand')
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$toast(`已复制第${index}个附件的地址到剪贴板`)
      }
      input.blur()

      // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
      // 选择文本。createTextRange(setSelectionRange)是input方法
      function selectText(textbox, startIndex, stopIndex) {
        if (textbox.createTextRange) { // ie
          const range = textbox.createTextRange()
          range.collapse(true)
          range.moveStart('character', startIndex) // 起始光标
          range.moveEnd('character', stopIndex - startIndex) // 结束光标
          range.select() // 不兼容苹果
        } else { // firefox/chrome
          textbox.setSelectionRange(startIndex, stopIndex)
          textbox.focus()
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
p.fj {
  color: #468CEB;
  cursor: pointer;
}
</style>

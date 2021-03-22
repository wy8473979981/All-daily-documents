import { Message } from 'element-ui'

class Base {
  constructor () {
    this.codeMap = {}
    this.code = -1
    this.showMsg = { success: true, error: true }
  }

  // 请求的提示信息
  message () {
    this.showMsg = this.showMsg ? this.showMsg : { success: true, error: true }
    if (this.code === 0) {
      this.showMsg.success && Message.success(this.codeMap[this.code])
    } else {
      this.showMsg.error && Message.error(this.codeMap[this.code])
    }
  }
}

export default Base

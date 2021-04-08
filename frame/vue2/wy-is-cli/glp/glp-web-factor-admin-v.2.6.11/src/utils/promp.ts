
import { MessageBox } from 'element-ui'

export function tip (content: string, title = '提示') {
  return MessageBox.alert(content, title)
}

export function affirm (content: string, title = '确认') {
  return MessageBox.confirm(content, title)
}

export function confirm(content: string, title = '确认', confirmButtonText = '确认', cancelButtonText = '取消') {
  return MessageBox.confirm(content, title, {
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    center: true
  })
}

export function messageConfirm(content: string, title = '确认', confirmButtonText = '确认') {
  return MessageBox.confirm(content, title, {
    confirmButtonText: confirmButtonText,
    showCancelButton: false,
    center: true
  })
}

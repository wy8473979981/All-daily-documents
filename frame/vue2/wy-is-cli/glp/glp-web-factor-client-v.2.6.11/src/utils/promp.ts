
import { MessageBox } from 'element-ui'

export function tip (content: string, title = '提示') {
  return MessageBox.alert(content, title)
}

export function affirm (content: string, title = '确认') {
  return MessageBox.confirm(content, title)
}

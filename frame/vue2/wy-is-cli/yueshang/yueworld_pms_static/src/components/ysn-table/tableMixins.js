/*
 * @Description: 表格mixins
 * @Author: fhj
 * @Date: 2021-06-23 13:32:41
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-11 10:06:33
 */
import { formatNumber } from '@/utils/index'

export default {
  data() {
    return {
    }
  },
  methods: {
    // 将字符串转为16进制值，汉子转4位，英文字母和数组转2位
    charCode: (str = '') =>
      str
        .split('')
        .reduce((total, e) => total + e.codePointAt(0).toString(16), ''),

    //   格式化
    formatter(row, column, v, index) {
      if (v === null || v === undefined) return '-'
      let value = v
      const { dataType } = column
      const type = dataType || this.dataType || ''
      if (value !== '') {
        if (type === 'money') {
          value = formatNumber(value)
        } else if (type === 'ten-thousand') {
          value = formatNumber(value, 'ten-thousand')
        } else if (type === 'number' || type === 'area') {
          let decimal = 2
          if (type === 'number') {
            decimal = 0
          }
          value = formatNumber(value, null, decimal)
        } else if (type === 'rate') {
          value = formatNumber(value, 'rate')
        } else if (type === 'date-d') {
          // value = value
        }
      }
      return value
    },

    // 对其方式
    align(item) {
      // 默认显示规则 金额/百分比 靠右显示， 其他的则靠左显示
      const displayRegArr = ['money', 'rate']
      const { dataType } = item
      const type = dataType
      if (!item.align && displayRegArr.includes(type)) {
        return 'right'
      }
      return 'left'
    },
    // 通过labelWidth获取对应index里面的值
    setWidth(item) {
    // 增加rules为入参，判断当前项是否有必填校验，如果有那么width加上11px；
      const displayRegArr = ['money', 'rate']
      if (item.itemType && item.itemType !== 'text') {
        return ''
      }

      if (displayRegArr.includes(item.type) || !item.width) {
        let minWidth = 120
        if (item.type === 'rate') {
          minWidth = 80
        }
        const nameLength = this.charCode(item[Object.keys(item)[0]] || '').length / 4
        if (nameLength <= 2) {
          return minWidth
        }

        if (item.width && displayRegArr.includes(item.type)) {
          if (item.width < minWidth) {
            return minWidth
          }
          return item.width
        }
        // 排序宽度
        let sortableWidth = 8
        // 排序
        if (item.sortable) {
          sortableWidth = 15
        }

        if (item.required) {
          sortableWidth += 12
        }

        const w = nameLength * 15 + 15 + sortableWidth
        if (w < minWidth) {
          return minWidth
        }
        return w
      }
      return ''
    }
  }
}


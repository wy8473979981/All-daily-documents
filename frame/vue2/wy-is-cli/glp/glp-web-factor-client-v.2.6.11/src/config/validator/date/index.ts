import { Validator, ValidatorRule } from '../type'
import { parse, between } from '@/utils/date'

// 标识 + - D M Y
export interface DateValidatorRule extends ValidatorRule {
  max?: string;
  min?: string;
  range?: string; // +aD|+1M  1M
  format: string;
  start?: string;
  end?: string;
}

const dateRE = /^([+-])?(\d+)([DMY])$/

export const dateValidator: Validator<DateValidatorRule> = (rule, value, callback) => {
  if (!value) return callback()
  try {
    const format = rule.format
    const form: any = rule?.rowForm || rule?.form || {}
    const start = form[rule?.start as any] || (Array.isArray(value) ? value[0] : (rule?.end ? value : undefined))
    const end = form[rule?.end as any] || (Array.isArray(value) ? value[1] : (rule?.start ? value : undefined))
    const sDate = start ? parse(start, format) : null
    const eDate = end ? parse(end, format) : null

    const minDate = rule.min ? generateDate(rule.min) : undefined
    const maxDate = rule.max ? generateDate(rule.max) : undefined

    if (!sDate && !eDate) {
      const single = parse(value, format)
      if (single && !between(single, minDate, maxDate)) {
        throw new Error('日期不在范围内')
      }
    }

    if (sDate && !between(sDate, minDate, maxDate)) {
      throw new Error('日期不在范围内')
    }

    if (eDate && !between(eDate, minDate, maxDate)) {
      throw new Error('日期不在范围内')
    }

    if (sDate && eDate && rule?.range) {
      let [rStart, rEnd] = rule.range.split('|')
      if (!rEnd) {
        rEnd = rStart
        rStart = ''
      }
      const rStartDate = rStart ? generateDate(rStart, sDate) : sDate
      const rEndDate = generateDate(rEnd, sDate)
      if (!between(eDate, rStartDate, rEndDate)) throw new Error('日期区间不在范围内')
    }
  } catch (e) {
    callback(new Error(rule?.message || e.message))
  }
  callback()
}

function generateDate (expr: string, ref: Date = new Date()): Date {
  const { sign, num, flag } = parseExpr(expr)
  const year = ref.getFullYear()
  const month = ref.getMonth()
  const day = ref.getDate()
  if (flag === 'D') {
    return new Date(year, month, day + num)
  } else if (flag === 'M') {
    return new Date(year, month + num, day)
  } else {
    return new Date(year + num, month, day)
  }
}

function parseExpr (expr: string): { sign: '+' | '-'; num: number; flag: 'D' | 'M' | 'Y' } {
  if (!dateRE.test(expr)) {
    throw new Error(`illegal expr[${dateRE}]: ${expr}`)
  }
  const g = expr.match(dateRE)?.slice(1).reverse() as string[]
  const sign: any = g[2] || '+'
  const num = Number(g[1])
  const flag = g[0] as any
  return { sign, num, flag }
}

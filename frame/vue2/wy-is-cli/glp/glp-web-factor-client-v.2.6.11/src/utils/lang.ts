/**
 * Capitalize a string.
 */
export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * 解析路径表达式 ex: a.b.c   ab.d.0.name
 * @param expr
 * @param ctx
 */
export function parsePathExpr (expr: string, ctx: any): any {
  if (!expr || !ctx) return ctx
  const idx = expr.indexOf('.')
  const key = idx < 0 ? expr : expr.substring(0, idx)
  const rest = idx < 0 ? null : expr.slice(idx + 1)
  if (!rest) return ctx[key]
  return parsePathExpr(rest, ctx[key])
}

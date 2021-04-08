export function requiredRule (type?: 'number' | 'array', message = '必填字段') {
  return { required: true, type, message }
}

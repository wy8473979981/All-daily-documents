import { FieldDef, TableColumnDef } from '@/types'
import { d, a } from '@/config/form'
import { formatter } from '@/config/table'
import { Validator, ValidatorRule } from '@/config/validator/type'

const dependOn = () => {
  return ({ form }: any) => {
    return !form.appId
  }
}

export const formDefs: FieldDef[] = [
  {
    type: 'select',
    model: 'appId',
    label: '资金端名称',
    options: {
      options: d('channel'),
      onValueChange: ({ form, items, value }) => {
        const t = items.find((v: any) => v.__value === value)
        if (!t) form.jdeType = ''
      }
    },
    rules: [{ required: true, message: '必填' }]
  },
  { type: 'select', model: 'senceCode', label: '场景', options: { options: a('sceneName-by-appId'), disabled: dependOn() }, rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'name', label: '凭证名称', rules: [{ required: true, message: '必填' }] },
  { type: 'select', model: 'jdeType', label: '凭证类型编码', options: { options: a('jdeType-name-by-appId'), disabled: dependOn() }, rules: [{ required: true, message: '必填' }] }
]

const checkAmount: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  const message = rule?.message || '格式不正确'
  if (/^[\da-zA-Z+*()/.-]+$/.test(value)) {
    return callback()
  } else {
    return callback(new Error(message))
  }
}

export const formDefs1: FieldDef[] = [
  {
    type: 'table',
    model: 't25',
    label: '表格',
    controls: [
      {
        type: 'grid',
        columns: [
          {
            span: 8,
            controls: [
              {
                type: 'select',
                model: 'subjectId',
                label: '科目名称',
                options: {
                  options: a('subject-name-by-appId'),
                  onValueChange: ({ form, rowForm, items, value }) => {
                    const t = items.find((v: any) => v.__value === value)
                    if (t) rowForm.subjectCode = t.subjectCode
                    else rowForm.subjectCode = ''
                  },
                  disabled: dependOn()
                },
                rules: [{ required: true, message: '必填', type: 'number' }]
              }
            ]
          },
          {
            span: 8,
            controls: [
              {
                type: 'text',
                model: 'subjectCode',
                label: '明细科目编码',
                options: { disabled: true }
              }
            ]
          },
          {
            span: 8,
            controls: [
              {
                type: 'text',
                model: 'calculateFormula',
                label: '入账规则',
                rules: [{ required: true, message: '必填' }, { validator: checkAmount, trigger: 'blur' }]
              }
            ]
          }
        ]
      }
    ],
    options: {
      limit: 10,
      min: 1
    }
  }
]

export const formDefs2: FieldDef[] = [
  {
    type: 'table',
    model: 't25',
    label: '表格',
    controls: [
      {
        type: 'grid',
        columns: [
          {
            span: 8,
            controls: [
              {
                type: 'select',
                model: 'subjectId',
                label: '科目名称',
                options: {
                  options: a('subject-name-by-appId'),
                  onValueChange: ({ form, rowForm, items, value }) => {
                    const t = items.find((v: any) => v.__value === value)
                    if (t) rowForm.subjectCode = t.subjectCode
                    else rowForm.subjectCode = ''
                  },
                  disabled: dependOn()
                },
                rules: [{ required: true, message: '必填', type: 'number' }]
              }
            ]
          },
          {
            span: 8,
            controls: [
              {
                type: 'text',
                model: 'subjectCode',
                label: '明细科目编码',
                options: { disabled: true }
              }
            ]
          },
          {
            span: 8,
            controls: [
              {
                type: 'text',
                model: 'calculateFormula',
                label: '入账规则',
                rules: [{ required: true, message: '必填' }, { validator: checkAmount, trigger: 'blur' }]
              }
            ]
          }
        ]
      }
    ],
    options: {
      limit: 10,
      min: 1
    }
  }
]

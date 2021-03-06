import { FormDef } from '@/types'

const def: FormDef = {
  controls: [
    {
      type: 'grid',
      columns: [
        {
          span: 12,
          controls: [
            {
              type: 'text',
              model: 't1',
              label: '文字',
              options: {
                defaultValue: 'Alison'
              }
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'text',
              model: 't2',
              label: '文字必填',
              rules: [{ required: true, message: '字段2必填' }]
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'select',
              model: 't3',
              label: '单选',
              options: {
                options: { 0: '有效', 1: '无效' }
              }
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'select',
              model: 't4',
              label: '多选',
              options: {
                multiple: true,
                options: { BJ: '北京', SH: '上海', SZ: '深圳' }
              }
            }
          ]
        },
        {
          span: 6,
          controls: [
            {
              type: 'date',
              model: 't5',
              label: '日期'
            }
          ]
        },
        {
          span: 6,
          controls: [
            {
              type: 'date',
              model: 't6',
              label: '日期时间',
              options: {
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss'
              }
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'date',
              model: 't7',
              label: '日期范围',
              options: {
                type: 'daterange',
                format: 'yyyy-MM-dd HH:mm:ss'
              }
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'custom',
              customType: 'checkbox',
              model: 't8',
              label: '自定义复选',
              options: {
                defaultValue: [],
                options: ['复选框 A', '复选框 B', '复选框 C']
              }
            }
          ]
        },
        {
          span: 12,
          controls: [
            {
              type: 'custom',
              customType: 'plain',
              model: 't9',
              label: '自定义文本',
              options: {
                defaultValue: 'https://baidu.com'
              }
            }
          ]
        }
      ]
    }
  ]
}

export default def

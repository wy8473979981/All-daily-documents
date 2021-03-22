export function TableConfig() {
  return [
    {
      key: 'name',
      label: '名称'
    },
    {
      key: 'age',
      label: '年纪',
      type: 'input',
      props: {
        size: 'mini'
      }
    },
    {
      key: 'test',
      label: '测试',
      type: 'input',
      props: {
        disable: true
      }
    }
  ]
}

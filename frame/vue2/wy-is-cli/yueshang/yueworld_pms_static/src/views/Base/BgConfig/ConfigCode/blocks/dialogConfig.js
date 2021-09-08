import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractOne',
      label: '摘要1',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractTwo',
      label: '摘要2',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractThree',
      label: '摘要3',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractFour',
      label: '摘要4',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractFive',
      label: '摘要5',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractSix',
      label: '摘要6',
      list: PUBFN.getOptionsList('ruleList'),

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'abstractSeven',
      label: '摘要7',
      list: PUBFN.getOptionsList('ruleList'),

    }
  ]
}

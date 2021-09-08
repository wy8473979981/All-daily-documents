import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleOne',
      label: '辅助核算1',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleTwo',
      label: '辅助核算2',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleThree',
      label: '辅助核算3',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleFour',
      label: '辅助核算4',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleFive',
      label: '辅助核算5',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleSix',
      label: '辅助核算6',
      list: PUBFN.getOptionsList('assistingRuleist')

    },
    {
      itemType: ['select', 'input'],
      itemIndex: 0,
      prop: 'assistingRuleSeven',
      label: '辅助核算7',
      list: PUBFN.getOptionsList('assistingRuleist')

    }
  ]
}

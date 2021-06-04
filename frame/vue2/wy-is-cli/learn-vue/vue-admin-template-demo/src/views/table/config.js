
export function TableConfig() {
  return [
    {
      key: 'sortIndex',
      label: '排名',
      fixed: true,
      width: 60
    },
    {
      key: 'name',
      label: '项目',
      type: 'link',
      minWidth: 120,
      fixed: true,
      props: {
        click: (data) => {
          this.handleLinkClick(data)
        }
      }
    },
    {
      key: 'storeRentSquare',
      label: '总面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'openRateQc',
      label: '开业率',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'openRate',
      label: '考核开业率',
      type: 'rate',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'openRateIndexFinish',
      label: '考核开业率达成率',
      type: 'rate',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'openRateTb',
      label: '同比',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom'
    },
  ]
}
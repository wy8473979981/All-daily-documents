export function getTableConfig() {
  return [
    {
      key: 'storeNo',
      label: '铺位编号'
    },
    {
      key: 'cooperativeBrand',
      label: '品牌'
    },
    {
      key: 'buildingStatus',
      label: '绑定状态',
      width: '80px'
    },
    {
      key: 'operationDisplay',
      label: '操作',
      type: 'custom',
      render: (h, scope) => {
        if (scope.row.operationDisplay === '') return ''
        else {
          return <el-button type="text" on-click={() => this.handleBind(scope)}>{scope.row.operationDisplay}</el-button>
        }
      },
      width: '94px'
    }
  ]
}
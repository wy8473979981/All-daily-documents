export function contractRelatedLink (row: any, item: any, ProjectId?: any, ProjectName?: any) {
  const projectId = ProjectId || row.projectId
  const projectName = ProjectName || row.projectName
  const relatedBusinessType = row.relatedBusinessType || row.targetType
  const contractId = item.contractId
  const targetCode = item.targetCode
  const contractLinks: any = {
    1: `/project/product/detail/${projectId}?type=detail`,
    2: `/project/product/relationship?projectName=${projectName}&quotaCode=${targetCode}&projectId=${projectId}&tabId=2`,
    3: `/finance/debt/detail/${targetCode}`,
    4: `/finance/order/detail/${targetCode}`,
    5: `/contract/ledger/detail/${contractId}`
  }
  return contractLinks[relatedBusinessType]
}

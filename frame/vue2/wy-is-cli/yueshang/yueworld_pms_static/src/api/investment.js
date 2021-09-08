/*
 * @Author: xiaoxie
 * @LastEditors: zsj
 * @Description: 进场装修接口
 */
import { Api } from '@/utils/api'

export class InvestmentApi extends Api {
  // 获取进场装修列表
  decorationEnterList = (param) => {
    return this.post('/mock/26/pms/decorationEnterList/list', param)
  }
  // 获取进场装修详情
  decorationEnterDetail = (param) => {
    return this.post('/mock/26/pms/decorationEnterDetail/detail', param)
  }
  // 删除
  decorationEnterDelete = (param) => {
    return this.post('/mock/26/pms/decorationEnterDelete', param)
  }
  // 获取深入洽谈列表
  negotiationList = (param) => {
    return this.post('/mock/26/pms/negotiation/list', param)
  }

  // 新增深入洽谈
  negotiatioCreate = (param) => {
    return this.post('/mock/26/pms/negotiation/create', param)
  }

  // 编辑深入洽谈
  negotiationEdit = (param) => {
    return this.post('/mock/26/pms/negotiation/edit', param)
  }

  // 删除深入洽谈
  negotiationDelete = (param) => {
    return this.post('/mock/26/pms/negotiation/delete', param)
  }
   // 获取品牌落位修列表
   brandPositioningList = (param) => {
     return this.post('/mock/26/pms/brandPositioning/list', param)
   }
   // 品牌落位详情
   brandPositioningDetail = (param) => {
     return this.post('/mock/26/pms/brandPositioningDetail/detail', param)
   }
  // 获取计租方案列表
  groupingSchemeList = (param) => {
    return this.post('/mock/26/pms/groupingSchemeList/list', param)
  }
    // 进场装修-保存、审核、编辑
    saveDecorationEnter = (param) => {
      return this.post('/mock/26/pms/saveDecorationEnter', param)
    }
  // 列表页删除按钮
  approveDeleteList = (param) => {
    return this.post('/mock/26/pms/bisExamineApprove/delete', param)
  }
}

export const investmentApi = new InvestmentApi()

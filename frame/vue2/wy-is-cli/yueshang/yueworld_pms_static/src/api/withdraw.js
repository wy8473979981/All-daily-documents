/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤销清算
 */
import { Api } from '@/utils/api'

export class WithdrawApi extends Api {
    // 获取撤场清算列表
    withdrawList = (param) => {
      return this.post('/mock/26/pms/withdraw/list', param)
    }
    // 撤场清算详细数据
    withdrawDetail = (param) => {
      return this.post('/mock/26/pms/withdraw/detail', param)
    }
    // 撤场清算删除
    withdrawDelete = (param) => {
      return this.post('/mock/26/pms/withdraw/delete', param)
    }
    // 撤场清算财务信息
    withdrawFinancialData = (param) => {
      return this.post('/mock/26/pms/withdraw/financialData', param)
    }
    // 撤场清算保存
    withdrawFinancialSave = (param) => {
      return this.post('/mock/26/pms/withdraw/save', param)
    }
}

export const withdrawApi = new WithdrawApi()

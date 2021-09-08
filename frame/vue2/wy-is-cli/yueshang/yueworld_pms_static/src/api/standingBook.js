/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同台账
 */
import { Api } from '@/utils/api'

export class StandingBookApi extends Api {
    // 获取合同台账列表
    standingBookList = (param) => {
      return this.post(`/mock/26/pms/standingBook/list`, param)
    }
    // 获取合同台账详情
    standingBookDetail = (param) => {
      return this.post(`/mock/26/pms/standingBook/detail`, param)
    }
    // 获取合同台账费用明细
    standingBookExpenseDetail = (param) => {
      return this.post(`/mock/26/pms/standingBook/expenseDetail`, param)
    }
    // 获取合同台账费用明细推送
    standingBookExpenseDetailPush = (param) => {
      return this.post(`/mock/26/pms/standingBook/expenseDetailPush`, param)
    }
    // 获取合同台账费用明细推送
    standingBookDoubleSignPush = (param) => {
      return this.post(`/mock/26/pms/standingBook/doubleSignPush`, param)
    }
    // 获取合同台账详情提交审批
    standingBookApproval = (param) => {
      return this.post(`/mock/26/pms/standingBook/approval`, param)
    }
}

export const standingBookApi = new StandingBookApi()

/*
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: api接口示例
 * @Description:
 */
import { Api } from '@/utils/api'

export class PayableList extends Api {
  // 获取应付单配置列表
  PayableList = (param) => {
    return this.post('/mock/26/pms/PayableList', param)
  }
   // 获取应付单配置列表-详情
   PayableListDetails = (param) => {
     return this.post('/mock/26/pms/PayableList/Details', param)
   }

  // 银行账户配置列表
  BankAccountsapi = (param) => {
    return this.post('/mock/26/pms/BankAccounts', param)
  }
  // 银行账户-新增
  BankAccountsAdd = (param) => {
    return this.post('/mock/26/pms/BankAccounts/Add', param)
  }
  // 银行账户-编辑
  BankAccountsEdit = (param) => {
    return this.post('/mock/26/pms/BankAccounts/Edit', param)
  }
   // 银行账户-删除
   BankAccountsDelete = (param) => {
     return this.post('/mock/26/pms/BankAccounts/Delete', param)
   }
  // 收款方式配置列表
  PaymentMethod = (param) => {
    return this.post('/mock/26/pms/PaymentMethod', param)
  }
  // 收款方式新增
  PaymentAdd = (param) => {
    return this.post('/mock/26/pms/PaymentMethod/PaymentAdd/create', param)
  }
    // 收款方式编辑
    PaymentAddEdit = (param) => {
      return this.post('/mock/26/pms/PaymentMethod/PaymentAdd/edit', param)
    }
     // 收款方式删除
     PaymentAddDelete = (param) => {
       return this.post('/mock/26/pms/PaymentMethod/PaymentAdd/Detele', param)
     }
    // 应付单详情弹窗
    PayableEnterAdd = (param) => {
      return this.post('/mock/26/pms/PayableList/PayableEnterAdd/Add', param)
    }
    PaymentVerificationForm = (param) => {
      return this.post('/mock/26/pms/PaymentVerificationForm', param)
    }
    // 账单配置列表
    BillingConfiguration = (param) => {
      return this.post('/mock/26/pms/BillingConfiguration', param)
    }
     // 账单配置列表-新增-保存
     BillingConfigurationAdd = (param) => {
       return this.post('/mock/26/pms/BillingConfiguration/Add', param)
     }
     // 账单配置列表-编辑-保存
     BillingConfigurationEdit = (param) => {
       return this.post('/mock/26/pms/BillingConfiguration/Edit', param)
     }
       // 账单配置列表-编辑-保存
       BillingConfigurationdelete = (param) => {
         return this.post('/mock/26/pms/BillingConfiguration/delete', param)
       }
          // 付款核销配置
          PaymentVerificationFormEdit = (param) => {
            return this.post('/mock/26/pms/PaymentVerificationFormEdit', param)
          }
      // 付款核销配置
      PaymentVerificationFormDetail = (param) => {
        return this.post('/mock/26/pms/PaymentVerificationForm/Detail', param)
      }
      PaymentVerificationFormadd= (param) => {
        return this.post('/mock/26/pms/PaymentVerificationForm/Add', param)
      }
      PaymentVerificationFormaddDelete = (param) => {
        return this.post('/mock/26/pms/PaymentVerificationForm/Add/Delete', param)
      }
      PaymentVerificationFormaddSubmit = (param) => {
        return this.post('/mock/26/pms/PaymentVerificationForm/Add/Submit', param)
      }
    //   付款核销单-详情审核中
    PaymentVerificationFormAgain = (param) => {
      return this.post('/mock/26/pms/PaymentVerificationForm/Again', param)
    }
       //   付款核销单-详情审核中-审核通过
       PaymentVerificationFormAgainSubmit = (param) => {
         return this.post('/mock/26/pms/PaymentVerificationForm/Again/Submit', param)
       }
        //   付款核销单-详情审核中-驳回通过
        PaymentVerificationFormAgainRefuse = (param) => {
          return this.post('/mock/26/pms/PaymentVerificationForm/Again/Refuse', param)
        }
}

export const PayableApi = new PayableList()

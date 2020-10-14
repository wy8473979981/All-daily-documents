import { Validator } from './type'

import { emailValidator } from './email'
import { dateValidator } from './date'
import { telValidator } from './tel'
import { bankNoValidator } from './bank-no'
import { creditCodeValidator } from './credit-code'
import { hkCreditCodeValidator } from './hk-credit-code'
import { idCardValidator } from './id-card'
import { phoneValidator } from './phone'
import { camelize } from '@/utils/lang'

const validators = {
  emailValidator,
  dateValidator,
  telValidator,
  bankNoValidator,
  creditCodeValidator,
  hkCreditCodeValidator,
  idCardValidator,
  phoneValidator
}

export type ValidatorType = 'email' | 'date' | 'tel' | 'bank-no' | 'credit-code' | 'hk-credit-code' | 'id-card' | 'phone';

export const validator = (type: ValidatorType): Validator<any> => {
  const key = camelize(type + '-validator')
  return (validators as any)[key] as Validator<any>
}

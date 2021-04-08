import { Api } from 'utils/api'
export class BaseApi extends Api {
  getTokenApi = (param) => {
    return this.get('/PowerDesk/wap/pd-app!login.action', param)
  }

  getAllEnum = () => {
    return this.post('/plpms-report/bis/dict/allDict')
  }
}

export const baseApi = new BaseApi()
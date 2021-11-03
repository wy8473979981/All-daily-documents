import { post } from "./api";
import { URL } from "./URL";
class home {
  // 根据年月、物业类型、费项(1租金,2物管,3多经,默认1),查询 租金收入、物管收入、 多经收入 汇总数据
  async queryRentFeeTotal(p, showLoading = true) {
    return await post(URL.homeURL.queryRentFeeTotal, p, showLoading);
  }
}
const homeServe = new home();
export default homeServe;

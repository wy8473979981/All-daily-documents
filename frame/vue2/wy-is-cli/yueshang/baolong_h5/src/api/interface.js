import { get } from "./api";
import * as keliu from "./keliu";
// 获取所有的项目列表
const getProjectList = (params) => get("/open/bis-open-dict!selectProjectList.action", params);
// 获取物业类型枚举
const getEstateEnumerate = (params) => get("/open/bis-open-dict!chargeTypeList.action", params);
// 首页根据id获取客流相关
const getPassengerFlowDetail = (params) => get("/open/bis-open-statistics!getCurrYesterday.action", params);

export { getProjectList, getEstateEnumerate, getPassengerFlowDetail, keliu };

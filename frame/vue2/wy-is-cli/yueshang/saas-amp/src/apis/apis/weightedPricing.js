import { post } from '../interceptor'
import Base from './base'

class CompanyCont extends Base {
  // 新增租金测算 start
  async create(p, showMsg) {
    const code = {
      "200": "提交成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法",
      "2020": "提交失败，所选市调名称、PMS项目已存在"
    };
    const res = await post("/WeightedPricing/add", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 租金测算列表 start
  async find(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/WeightedPricing/list", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 竞品权重数量列表 start
  async analogyList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/CompetingProductsWeight/list", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 市调名称下拉数据 start
  async getList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/WeightedPricing/RentMarketResearchList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // PMS项目下拉数据 start
  async pmsList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/WeightedPricing/pms_projects", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 更新权重定价列表数据 start
  async getUpdate(p, showMsg) {
    const code = {
      "200": "更新成功",
      "2001": "参数非法",
      "2020": "提交失败，所选市调名称、PMS项目已存在"
    };
    const res = await post("/WeightedPricing/update", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 根据Id查找
  async findById(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/companyContract/load", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 查询
  async findByCompanyAndContCate(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法"
    };
    const res = await post(
      "/companyContract/getCompanyContractByCompanyId2CateId",
      p
    );
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 编辑
  async update(p, showMsg) {
    const code = {
      "200": "提交成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/companyContract/update", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 删除租金测算 start
  async del(p, showMsg) {
    const code = {
      "200": "删除成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/WeightedPricing/delete", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 竞品权重删除 start
  async analogyDel(p, showMsg) {
    const code = {
      "200": "删除成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/CompetingProductsWeight/delete", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 物业类型下拉列表 start
  async getPropertyType(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsWeight/propertyType", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 购物中心竞争项目类比表 - 表头 - 第二步
  async getLeftMenuScore(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsAnalogy/leftMenuScore", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 购物中心竞争项目类比表 - 表数据 - 第二步
  async getWeightedPricingList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsWeight/WeightedPricingList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 购物中心竞争项目类比表 - 表数据 - 保存 - 第二步
  async saveAnalogyList(p, showMsg) {
    const code = {
      "200": "保存成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsWeight/WeightedPricingSave", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message();
    return res;
  }

  // 项目修正租金测算表 - 表头 - 第三步
  async getLeftMenuCalculation(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsAnalogy/leftMenuCalculation", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 项目修正租金测算表 - 表数据 - 第三步
  async getCalculationList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post(
      "/CompetingProductsAnalogy/revisedRentCalculationList",
      p
    );
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 项目修正租金测算表 - 表数据 - 保存 - 第三步
  async updataCalculationList(p, showMsg) {
    const code = {
      "200": "保存成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post(
      "/CompetingProductsAnalogy/revisedRentCalculationUpdate",
      p
    );
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 获取非主力店汇总表 - 表数据
  async getRentCalculationMainList(p, showMsg) {
    const code = {
      "200": "保存成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsWeight/summaryList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 获取主力店明细 - 表数据
  async getMainStoreDetail(p, showMsg) {
    const code = {
      "200": "保存成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/CompetingProductsWeight/mainStoreDetail", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 提交租金测算竞品类别详情 - 表数据
  async updateRentCalculationMainList(p, showMsg) {
    const code = {
      "200": "保存成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post(
      "/CompetingProductsAnalogy/rentCalculationMainUpdate",
      p
    );
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }
}

const companyCont = new CompanyCont()

export default companyCont

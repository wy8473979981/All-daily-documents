import { post } from '../interceptor'
import Base from './base'

class RentDecomposition extends Base {
  // 新增租金测算 start
  async create(p, showMsg) {
    const code = {
      "200": "提交成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/rentDecomposition/add", p);
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
    const res = await post("/rentDecomposition/selectList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 竞品类比数量列表 start
  async analogyList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/competingProductsDecomposition/selectList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 市调列表下拉数据 start
  async getList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/rentDecomposition/dropDownList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 更新测算下拉数据 start
  async getUpdate(p, showMsg) {
    const code = {
      "200": "更新成功",
      "2001": "参数非法"
    };
    const res = await post("/rentDecomposition/update", p);
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
    const res = await post("/rentDecomposition/del", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 竞品类别删除 start
  async analogyDel(p, showMsg) {
    const code = {
      "200": "删除成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/competingProductsDecomposition/del", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 恢复
  async restore(p, showMsg) {
    const code = {
      "200": "提交成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/companyContract/renew", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 竞品分类下拉
  async getAnalogyType (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsDecomposition/propertyType', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 购物中心竞争项目类比表 - 表头 - 第二步
  async getLeftMenuScore (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsAnalogy/leftMenuScore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 购物中心竞争项目类比表 - 表数据 - 第二步
  async getAnalogyList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsDecomposition/selectDetailList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 购物中心竞争项目类比表 - 表数据 - 保存 - 第二步
  async saveAnalogyList (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsDecomposition/saveDetailList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目修正租金测算表 - 表头 - 第三步
  async getLeftMenuCalculation (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsAnalogy/leftMenuCalculation', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目修正租金测算表 - 表数据 - 第三步
  async getCalculationList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsAnalogy/revisedRentCalculationList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目修正租金测算表 - 表数据 - 保存 - 第三步
  async updataCalculationList (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsAnalogy/revisedRentCalculationUpdate', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 获取租金测算竞品类别详情 - 表数据
  async getRentCalculationMainList (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsDecomposition/sum', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 提交租金测算竞品类别详情 - 表数据
  async updateRentCalculationMainList (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/CompetingProductsAnalogy/rentCalculationMainUpdate', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const rentDecomposition = new RentDecomposition()

export default rentDecomposition

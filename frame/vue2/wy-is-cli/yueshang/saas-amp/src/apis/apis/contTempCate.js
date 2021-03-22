import { post } from '../interceptor'
import Base from './base'

class ContTempCate extends Base {
  // 新增租金市调 start
  async create(p, showMsg) {
    const code = {
      "200": "提交成功",
      "2001": "参数非法",
      "2009": "提交失败，租金市调名称已存在",
      "2020": "提交失败，该名称已经存在"
    };
    const res = await post("/RentMarketResearch/add", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 租金市调列表 start
  async find(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法"
    };
    const res = await post("/RentMarketResearch/list", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 项目信息列表 start
  async selectList(p, showMsg) {
    const code = {
      "200": "加载成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法"
    };
    const res = await post("/project/selectList", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 根据Id查找
  async findById(p, showMsg) {
    const code = {
      "200": "加载成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/contractMouldCate/load", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  async update(p, showMsg) {
    const code = {
      "200": "更新成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法",
      "2020": "提交失败，该名称已经存在"
    };
    const res = await post("/RentMarketResearch/update", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  async del(p, showMsg) {
    const code = {
      "200": "删除成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/RentMarketResearch/delete", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  // 删除项目
  async delProject(p, showMsg) {
    const code = {
      "200": "删除成功",
      "999": "令牌无效，请重新登录",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/project/del", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  async restore(p, showMsg) {
    const code = {
      "200": "恢复成功",
      "2001": "参数非法",
      "2007": "数据不存在"
    };
    const res = await post("/contractMouldCate/renew", p);
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    this.message();
    return res;
  }

  async findOpened(p, showMsg) {
    const code = {
      "200": "加载成功"
    };
    const res = await post(
      "/contractMouldCate/getContractMouldCateByOpened",
      p
    );
    this.codeMap = code;
    this.code = res.code;
    this.showMsg = showMsg;
    // this.message()
    return res;
  }

  // 获取项目详情
  async selectProjectById (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/selectProjectById', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 新增项目
  async addProjectById (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      "2020": "提交失败，该名称已经存在"
    }
    const res = await post('/project/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 获取项目信息详情-统计-楼层法
  async selectProjectFloorById (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/statistics_by_floor', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取项目信息详情-统计-业态法
  async selectProjectLayoutById (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/statistics_by_layout', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 编辑项目详情
  async updateProjectDetail (p, showMsg) {
    const code = {
      '200': '保存成功',
      '2001': '参数非法',
      "2020": "提交失败，该名称已经存在"
    }
    const res = await post('/project/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 获取楼层列表
  async getFloorList (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/configCenter/floorList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取业态列表
  async getLayoutList (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/configCenter/layoutList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取项目详情列表
  async selectProjectDetailsById (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/selectProjectDetailsById', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 新增项目详情
  async addProjectDetail (p, showMsg) {
    const code = {
      '200': '保存成功'
    }
    const res = await post('/project/addDetail', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新项目详情列表
  async updateProjectListDetail (p, showMsg) {
    const code = {
      '200': '保存成功',
      // '2007': '数据更新失败'
    }
    const res = await post('/project/updateDetail', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 删除项目详情列表
  async delProjectListDetail (p, showMsg) {
    const code = {
      '200': '删除成功'
    }
    const res = await post('/project/delDetail', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 市调汇总信息
  async getLeftMenu (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/rentMarketResearch/leftMenu', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取市调汇总信息列表
  async selectContextList (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/selectContextList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 更新市调汇总信息列表
  async updateContextList (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/project/updateContextList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取市调详情-统计字段表
  async getLeftMenuNoEdit (p, showMsg) {
    const code = {
      '200': '加载成功'
    }
    const res = await post('/rentMarketResearch/leftMenuNoEdit', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 租金市调-保存项目信息：楼层法、业态法 市调个数
  async addInDetail (p, showMsg) {
    const code = {
      '200': '保存成功'
    }
    const res = await post('/project/addInDetail', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  async dataVerification (p, showMsg) {
    const code = {
      '200': '获取成功'
    }
    const res = await post('/RentMarketResearch/dataVerification', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const contTempCate = new ContTempCate()

export default contTempCate

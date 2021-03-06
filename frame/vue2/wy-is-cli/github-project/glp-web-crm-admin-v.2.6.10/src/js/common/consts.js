/**
 * author   lut000
 * date     2019/08/28
 * purpose  下拉选项静态资源
 * */

export const SelectionOptions = {
    WarningLevelType: {								//预警等级
        '': '全部',
        '0': '无风险',
        '1': '低风险',
        '2': '中风险',
        '3': '高风险'
    },
    WarningLevelType2: {								//预警等级
        '': '全部',
        '0': '无',
        '1': '低',
        '2': '中',
        '3': '高'
    },
    WarningLevelArray: [								//预警等级
        { key: '', val: '全部' },
        { key: '3', val: '高风险' },
        { key: '2', val: '中风险' },
        { key: '1', val: '低风险' },
        { key: '0', val: '无风险' }
    ],
    RiskLevelArray: [											//风险等级
        { key: '3', val: '高风险' },
        { key: '2', val: '中风险' },
        { key: '1', val: '低风险' },
        { key: '0', val: '无风险' }
    ],
    WarningLevelColorlabelType: {								//预警等级
        '': '全部',
        '3': '红色',
        '2': '橙色',
        '1': '黄色',
        '0': '无色'
    },
    WarningLevelColorlabelArray: [								//预警等级
        { key: '', val: '全部' },
        { key: '3', val: '红色' },
        { key: '2', val: '橙色' },
        { key: '1', val: '黄色' },
        { key: '0', val: '无色' }
    ],
    hintLevelArr: [                //提示等级
        { key: '', val: '全部' },
        { key: '3', val: '一级' },
        { key: '2', val: '二级' },
        { key: '1', val: '三级' },
        { key: '0', val: '无' },
    ],
    WarningLevelColorClass: {									//预警等级-颜色值
        '3': '#FF4F4F',
        '2': '#FF902A',
        '1': '#FFDB4F',
        '0': '#B8D87E'
    },
    WarningLevelIconClass: {						//预警等级-class名称
        '0': 'none',
        '1': 'low',
        '2': 'middle',
        '3': 'high'
    },

    IconType: {										//图形类型-class名称
        'STANDARD': 'circle',
        'PERSONAL': 'triangle'
    },
    IconType2: {										//图形类型-class名称
        '1': 'circle',
        '2': 'triangle'
    },

    WarehouseType: {								//仓库类型
        20: '普通仓',
        10: '专用仓'
    },
    WarehouseTypeArray: [					//仓库类型
        { 'key': 20, 'label': '普通仓' },
        { 'key': 10, 'label': '专用仓' }
    ],
    ActivityScreening: [//活动筛选
        { 'key': 1, 'label': '我的活动' }
    ],
    // 人员类型
    personnelType: [
        { 'key': 0, 'label': '法定代表' },
        { 'key': 1, 'label': '实控人' }
    ],
    ActivityType: [//活动类型
        { 'key': 0, 'label': '全部' },
        { 'key': 1, 'label': '广告宣传' },
        { 'key': 2, 'label': '电子邮件' },
        { 'key': 3, 'label': '电话营销' },
        { 'key': 4, 'label': '横幅广告' },
        { 'key': 9, 'label': '其他' }
    ],
    ADDRESS_TYPE: [
        { 'key': 0, 'label': '经营地址' },
        { 'key': 1, 'label': '通讯地址' },
        { 'key': 2, 'label': '邮寄地址' },
        { 'key': 3, 'label': '注册地址' },
        { 'key': 4, 'label': '户籍地址' },
        { 'key': 5, 'label': '居住地址' },
        { 'key': 9, 'label': '其他地址' }
    ],

    INDIVIDUAL_MATERIAL_TYPE1: [
        { 'key': 1011, 'label': '个人身份证信息页' },
        { 'key': 1012, 'label': '个人身份证国徽页' },
    ],
    INDIVIDUAL_MATERIAL_TYPE2: [
        { 'key': 1013, 'label': '个人护照' }
    ],
    INDIVIDUAL_MATERIAL_TYPE3: [
        { 'key': 1014, 'label': '个人港澳居民来往内地通行证' }
    ],
    INDIVIDUAL_MATERIAL_TYPE4: [
        { 'key': 1015, 'label': '个人香港身份证' }
    ],
    ALL_MATERIAL_TYPE: [
        { 'key': 1011, 'label': '个人身份证信息页' },
        { 'key': 1012, 'label': '个人身份证国徽页' },
        { 'key': 1013, 'label': '个人护照' },
        { 'key': 1014, 'label': '个人港澳居民来往内地通行证' },
        { 'key': 1015, 'label': '个人香港身份证' },
        { 'key': 2011, 'label': '企业营业执照' },
        { 'key': 2015, 'label': 'CI证书' },
        { 'key': 2021, 'label': '法定代表身份证信息页' },
        { 'key': 2022, 'label': '法定代表身份证国徽页' },
        { 'key': 2023, 'label': '法定代表护照' },
        { 'key': 2024, 'label': '法定代表港澳居民来往内地通行证' },
        { 'key': 2025, 'label': '法定代表香港身份证' },
        { 'key': 2121, 'label': '实控人护照' },
        { 'key': 2123, 'label': '实控人身份证信息页' },
        { 'key': 2124, 'label': '实控人身份证国徽页' },
        { 'key': 2125, 'label': '实控人港澳居民来往内地通行证' },
        { 'key': 2126, 'label': '实控人香港身份证' },
        { 'key': 2301, 'label': '新加坡公司商业注册证' },
    ],
    ENTERPRISE_MATERIAL_TYPE1: [
        { 'key': 2011, 'label': '企业营业执照' },
    ],
    ENTERPRISE_MATERIAL_TYPE2: [
        { 'key': 2011, 'label': '企业营业执照' },
        { 'key': 2021, 'label': '法定代表身份证信息页' },
        { 'key': 2022, 'label': '法定代表身份证国徽页' },
    ],
    ENTERPRISE_MATERIAL_TYPE3: [
        { 'key': 2011, 'label': '企业营业执照' },
        { 'key': 2023, 'label': '法定代表护照' },
    ],
    ENTERPRISE_MATERIAL_TYPE4: [
        { 'key': 2011, 'label': '企业营业执照' },
        { 'key': 2024, 'label': '法定代表港澳居民来往内地通行证' },
    ],
    ENTERPRISE_MATERIAL_TYPE5: [
        { 'key': 2011, 'label': '企业营业执照' },
        { 'key': 2025, 'label': '法定代表香港身份证' },
    ],
    ENTERPRISE_MATERIAL_TYPE6: [
        { 'key': 2015, 'label': 'CI证书' },
        { 'key': 2123, 'label': '实控人身份证信息页' },
        { 'key': 2124, 'label': '实控人身份证国徽页' },
    ],
    ENTERPRISE_MATERIAL_TYPE7: [
        { 'key': 2015, 'label': 'CI证书' },
        { 'key': 2121, 'label': '实控人护照' },
    ],
    ENTERPRISE_MATERIAL_TYPE8: [
        { 'key': 2015, 'label': 'CI证书' },
        { 'key': 2125, 'label': '实控人港澳居民来往内地通行证' },
    ],
    ENTERPRISE_MATERIAL_TYPE9: [
        { 'key': 2015, 'label': 'CI证书' },
        { 'key': 2126, 'label': '实控人香港身份证' },
    ],
    ENTERPRISE_MATERIAL_TYPE10: [
        { 'key': 2015, 'label': 'CI证书' },
    ],
    ENTERPRISE_MATERIAL_TYPE11: [
        { 'key': 2301, 'label': '新加坡公司商业注册证' },
    ],


    PermissionSetting: [//权限设置
        { 'key': 'READ', 'label': '查看' },
        { 'key': 'ALL', 'label': '查看和修改' }
    ],
    TemperatureControlTypeArray: [					//温控类型
        { 'key': 1, 'label': '冷冻仓' },
        { 'key': 2, 'label': '冷藏仓' },
        { 'key': 4, 'label': '常温仓' },
        { 'key': 8, 'label': '恒温仓' }
    ],
    TemperatureControlType: {					//温控类型
        1: '冷冻仓',
        2: '冷藏仓',
        4: '常温仓',
        8: '恒温仓'
    },
    OwnerType: {								//仓库产权人类型
        20: '个人',
        10: '企业'
    },
    OwnerTypeArray: [					//仓库产权人类型
        { 'key': 20, 'label': '个人' },
        { 'key': 10, 'label': '企业' }
    ],
    ActionType: [					//仓库产权人类型
        { 'key': 1, 'label': '广告宣传' },
        { 'key': 2, 'label': '电子邮件' },
        { 'key': 3, 'label': '电话营销' },
        { 'key': 4, 'label': '横幅广告' },
        { 'key': 5, 'label': '其他活动' }
    ],

    CurrencyType: {								//币种
        CNY: '人民币',
        HKD: '港元',
        USD: '美元',
        EUR: '欧元',
        GBP: '英镑',
        JPY: '日元',
        AUD: '澳元',
        RUB: '卢布'
    },
    CurrencyTypeArray: [								//币种
        { 'key': 'CNY', 'label': '人民币' },
        { 'key': 'HKD', 'label': '港元' },
        { 'key': 'USD', 'label': '美元' },
        { 'key': 'EUR', 'label': '欧元' },
        { 'key': 'GBP', 'label': '英镑' },
        { 'key': 'JPY', 'label': '日元' },
        { 'key': 'AUD', 'label': '澳元' },
        { 'key': 'RUB', 'label': '卢布' }
    ],

    BooleanType: {								//通用是否
        '': '请选择',
        '1': '是',
        '0': '否'
    },
    BooleanTypeArray: [					//通用是否
        { 'key': '', 'label': '请选择' },
        { 'key': '1', 'label': '是' },
        { 'key': '0', 'label': '否' }
    ],
    CompanyCertificateType: {                                    //公司证件类型
        1: '身份证',
        2: '护照',
        3: '营业执照',
        4: 'CI证书'
    },

    DataType: {									//显示数据类型
        '1': 'STANDARD',					//标准
        '2': 'PERSONAL'					//个性化
    },
    RuleStatusType: {									//规则启用状态
        'ENABLED': '启用',
        'DISABLED': '停用'
    },
    RelationType: {									//额度占用类型
        '1': '占用',
        '2': '被占用'
    },
    ProductModelType: {
        'DIRECT': '自用额度',// 自用额度
        'GUARANTEE': '担保/(类)集团/其他额度',
        'CHANNEL': '渠道额度'
    },
    BusinessType: {									//业务类型
        FACTORING: '保理额度',
        LEASE: '租赁额度',
        SUPPLY_CHAIN: '供应链额度',
        LOAN: '小贷额度',
        GLP_TRANSPORT: '普运贷',
        GLP_GOODS: '普货贷',
        GLP_DATA: '普数贷',
        GLP_BUSINESS: '普业贷',
        OTHER: '其他'
    },

    OperatorType: {									//规则启用状态
        'SYS': '系统调整',
        'MANUAL': '人工调整'
    },

    //企业证件类型
    certificateTypeArr: [
        { key: 3, label: '营业执照' },
        { key: 4, label: 'CI证书' },
        { key: 6, label: '新加坡公司商业注册证' }
    ],
    //个人证件类型
    personCertificateTypeArr: [
        { key: 1, label: '身份证' },
        { key: 2, label: '护照' },
        { key: 3, label: '香港身份证' }
    ],
    // 客户筛选
    departmentType: [
        { key: 1, label: '全部客户' },
        { key: 2, label: '我的客户' },
        { key: 3, label: '全司公海' }
    ],
    // 上一年运费收入
    previousYearFreightRevenue: [
        { key: 1, label: '5000万元以下' },
        { key: 2, label: '5000万元-2亿元' },
        { key: 3, label: '2亿元-5亿元' },
        { key: 4, label: '5亿元以上' }
    ],
    // 拜访类型
    visitType: [
        { key: 1, label: '电话拜访' },
        { key: 2, label: '实地拜访' },
        { key: 3, label: '微信拜访' }
    ],
    // 关系
    relation: [
        { key: 1, label: '直属亲属' },
        { key: 2, label: '公司合伙人' }
    ],
    // 联系人类型
    contactsType: [
        { key: 1, label: '收件人' },
        { key: 2, label: '催收联系人' },
        { key: 3, label: '紧急联系人' },
        { key: 9, label: '其他' }
    ],
    // 所属行业
    INDUSTRY: [
        { label: "农、林、牧、渔业", key: 1 },
        { label: "工业", key: 2 },
        { label: "建筑业", key: 3 },
        { label: "房地产业", key: 4 },
        { label: "商贸流通业", key: 5 },
        { label: "交通运输、仓储和邮政业", key: 6 },
        { label: "住宿和餐饮业", key: 8 },
        { label: "采矿业", key: 11 },
        { label: "制造业", key: 12 },
        { label: "电力、热力、燃气及水生产和供应业", key: 13 },
        { label: "批发和零售业", key: 14 },
        { label: "信息传输、软件和信息技术服务业", key: 15 },
        { label: "金融业", key: 16 },
        { label: "租赁和商务服务业", key: 17 },
        { label: "科学研究和技术服务业", key: 18 },
        { label: "水利、环境和公共设施管理业", key: 19 },
        { label: "居民服务、修理和其他服务业", key: 20 },
        { label: "教育", key: 21 },
        { label: "卫生和社会工作", key: 22 },
        { label: "文化、体育和娱乐业", key: 23 },
        { label: "公共管理、社会保障和社会组织", key: 24 },
        { label: "国际组织", key: 25 },
        // { label: "食品冷链行业", key: 26 },
        // { label: "日用消费品行业", key: 27 },
        // { label: "化学、工业用品行业", key: 28 },
        // { label: "汽车相关行业", key: 29 },
        // { label: "医疗器械行业", key: 30 },
        { label: "其他", key: 0 }
    ],
    // 年营业收入
    YEAR_OPERATION_REVENUE: [
        { label: "1000万以下", key: 0 },
        { label: "1000-5000万", key: 1 },
        { label: "5000万-1亿", key: 2 },
        { label: "1亿-10亿", key: 3 },
        { label: "10亿以上", key: 4 },
        { label: "未知", key: 9 }
    ],
    // 生效状态
    EFFECTIVE_STATUS: [
        { label: "已生效", key: 1 },
        { label: "未生效", key: 2 },
        { label: "已失效", key: 3 },
    ],
    // 审批筛选
    APPROVAL_SCREEN: [
        { label: "我的待办", key: 'TODO' },
        { label: "我的已办", key: 'DONE' },
    ],
    // 融资规模
    FINANCING_SCALE: [
        { label: "300万以下", key: 1 },
        { label: "300万-1000万", key: 2 },
        { label: "1000万-5000万", key: 3 },
        { label: "5000万以上", key: 4 }
    ],
    // 融资需求
    COMPANY_FINANCING: [
        { label: "运费垫付", key: 1 },
        { label: "设备融资租赁", key: 2 },
        { label: "库存融资", key: 3 },
        { label: "贸易垫资采购", key: 4 },
        { label: "小额贷款（订货、开店、发票贷等）", key: 5 },
        { label: "应收账款保理", key: 6 },
        { label: "其他", key: 9 }
    ],
    // 物流类型
    LOGISTICS_TYPE: [
        { label: "快递快运", key: 1 },
        { label: "区域零担等网络型企业", key: 2 },
        { label: "第三方物流", key: 3 },
        { label: "合同物流企业", key: 4 },
        { label: "网络货运", key: 5 },
        { label: "无车承运", key: 6 },
        { label: "城配平台", key: 7 },
        { label: "专线", key: 8 },
        { label: "干线", key: 9 },
        { label: "大型车队", key: 10 },
        { label: "其他", key: 11 }
    ],
    // 其中自有车辆占比
    VEHICLE_SCALE: [
        { label: "20%以下", key: 1 },
        { label: "20%-50%", key: 2 },
        { label: "50%-80%", key: 3 },
        { label: "80%以上", key: 4 }
    ],
    // 线上信息化水平
    ONLINE_INFO: [
        { label: "具备自主研发的TMS等物流管理系统", key: 1 },
        { label: "使用第三方TMS等物流管理系统软件", key: 2 },
        { label: "不使用物流管理系统", key: 3 },
        { label: "其他", key: 4 }
    ],
    // 上一年运费收入
    PREVIOUS_YEAR_FREIGHT_REVENUE: [
        { label: "5000万元以下", key: 1 },
        { label: "5000万元-2亿元", key: 2 },
        { label: "2亿元-5亿元", key: 3 },
        { label: "5亿元以上", key: 4 }
    ],
    // 运输货物类型
    CARGO_TYPE: [
        { label: "快消品", key: 1 },
        { label: "电商", key: 2 },
        { label: "冷链生鲜", key: 3 },
        { label: "健康医药", key: 4 },
        { label: "服装", key: 5 },
        { label: "工业用品", key: 6 },
        { label: "化学危险品", key: 7 },
        { label: "其他", key: 9 }
    ],
    optionYesOrNo: [
        { key: 0, label: '否' },
        { key: 1, label: '是' }
    ],
    // 证件类型
    certificateType: {
        1: '身份证',
        2: '护照',
        3: '营业执照',
        4: 'CI证书',
    },
    // 融资规模
    financingScale: [
        { key: 0, label: '小于300万元' },
        { key: 1, label: '大于等于300小于1000万' },
        { key: 2, label: '大于1000万小于等于5000万' },
        { key: 3, label: '大于等于5000万' }
    ],
    // 融资需求
    financingNeeds: [
        { key: 0, label: '运费垫付' },
        { key: 1, label: '设备融资租赁' },
        { key: 2, label: '库存融资' },
        { key: 3, label: '贸易垫资采购' },
        { key: 4, label: '小额贷款（订货、开店、发票贷等）' },
        { key: 5, label: '应收账款保理' },
        { key: 6, label: '其他' },
    ],
    //企业类型
    enterpriseNature: [
        { key: '0', label: '加工' },
        { key: '1', label: '贸易' },
        { key: '2', label: '电商平台' },
        { key: '3', label: '进口' },
        { key: '4', label: '物流提供方' },
        { key: '5', label: '其他' },
        { key: '9', label: '未知' },
    ],
    // 运输货物类型
    cargoType: [
        { key: 0, label: '快消品' },
        { key: 1, label: '电商' },
        { key: 2, label: '冷链生鲜' },
        { key: 3, label: '健康医药' },
        { key: 4, label: '服装' },
        { key: 5, label: '工业用品' },
        { key: 6, label: '化学危险品' },
        { key: 7, label: '其他' },
    ],
    // 物流类型
    logisticsType: [
        { key: 0, label: '快递快运' },
        { key: 1, label: '区域零担等网络型企业' },
        { key: 2, label: '第三方物流' },
        { key: 3, label: '合同物流企业' },
        { key: 4, label: '网络货运' },
        { key: 5, label: '无车承运' },
        { key: 6, label: '城配平台' },
        { key: 7, label: '专线' },
        { key: 8, label: '干线' },
        { key: 9, label: '大型车队' },
        { key: 10, label: '其他' }
    ],
    // 线上信息化水平
    onlineInfo: [
        { key: 0, label: '具备自主研发的TMS等物流管理系统' },
        { key: 1, label: '使用第三方TMS等物流管理系统软件' },
        { key: 2, label: '不使用物流管理系统' },
        { key: 3, label: '其他' }
    ],
    // 自有车辆占比
    proportionOwnedVehicles: [
        { key: 0, label: '20%以下' },
        { key: 1, label: '20%-50%' },
        { key: 2, label: '50%-80%' },
        { key: 3, label: '80%以上' }
    ],
    //市场部获客来源
    guestSource: [
        { key: 0, label: '自行创建' },
        { key: 1, label: '市场拓展' },
        { key: 2, label: '公司分配' },
        { key: 3, label: '第三方介绍' }
    ],
    //企业规模
    companyScale: [
        { key: 'KA', label: '大中' },
        { key: 'SC', label: '小微' },
    ],
    //年营业收入
    yearOperationRevenue: [
        { key: 0, label: '1000万以下' },
        { key: 1, label: '1000-5000万' },
        { key: 2, label: '5000万-1亿' },
        { key: 3, label: '1亿-10亿' },
        { key: 4, label: '10亿以上' },
        { key: 9, label: '未知' },
    ],
    //是否GLP关联方
    isGlpRelated: [
        { key: 'YES', label: '是' },
        { key: 'NO', label: '否' },
    ],
    //实名认证状态
    authStatus: [
        { key: 0, label: '未实名' },
        { key: 1, label: '线上实名' },
        { key: 3, label: '线下实名' },
    ],
    //客户类型
    custType: {
        'COMPANY': '企业',
        'PERSON': '个人',
    },
    //性别
    gender: [
        { key: 1, label: '男性' },
        { key: 2, label: '女性' },
    ],
    // 教育水平
    eduLevel: [
        { key: 1, label: '高中及以下' },
        { key: 3, label: '大专' },
        { key: 4, label: '大学' },
        { key: 6, label: '硕士及以上' }
    ],
    //居住状况
    dwellingStatus: [
        { key: 0, label: '房改/继承' },
        { key: 1, label: '公司提供' },
        { key: 2, label: '按揭自置' },
        { key: 3, label: '无按揭自置' },
        { key: 4, label: '与父母同住' },
        { key: 5, label: '租借' },
        { key: 9, label: '其他' },
    ],
    // 实际从业年限
    actualYearsEmployment: [
        { key: 0, label: '少于3年' },
        { key: 1, label: '3-5年' },
        { key: 2, label: '5-10年(含10年)' },
        { key: 3, label: '10-20年(含20年)' },
        { key: 4, label: '20年以上' },
        { key: 9, label: '未知' }
    ],

    //工作单位所属行业
    companyIndustry: [

    ],
    //婚姻状况
    maritalStatus: [
        { key: 10, label: '未婚' },
        { key: 20, label: '已婚' },
        { key: 30, label: '丧偶' },
        { key: 40, label: '离婚' },
    ],
    //统一授信-额度状态
    unionCreditStatus: {
        '1': '生效',
        '2': '失效',
        '3': '已终结',
        '4': '待生效'
    },
    //统一授信-放款渠道
    unionProductChannel: {
        'FACTORING': '保理',
        'LEASE': '租赁',
        'LOAN': '小贷',
        'SUPPLY_CHAIN': '卓普信',
    },
    // 附件类型
    fileType: [
        { key: 0, label: '个人身份证信息页' },
        { key: 1, label: '个人身份证国徽页' },
        { key: 2, label: '个人护照' },
        { key: 3, label: '企业营业执照' },
        { key: 4, label: '企业法定代表身份证信息页' },
        { key: 5, label: '企业法定代表身份证国徽页' },
        { key: 6, label: '企业法人护照' },
        { key: 7, label: 'CI证书' },
        { key: 8, label: '新加坡公司商业注册证' },
        { key: 9, label: '香港公司实控人护照' },
        { key: 10, label: '香港公司实控人港澳通行证' },
        { key: 11, label: '香港公司实控人身份证信息页' },
        { key: 12, label: '香港公司实控人身份证信息页' },
        { key: 13, label: '香港公司实控人身份证国徽页' },
    ],

    //文件类型编码
    FilestypeCode: {
        'houseCerts': {
            code: 10001,
            label: '仓库房产证'
        },
        'eiaReports': {
            code: 10002,
            label: '仓库环评报告'
        },
        'fireAcceptReports': {
            code: 10003,
            label: '仓库消防验收报告'
        },
        'introduceMaterials': {
            code: 20001,
            label: '运营方介绍资料'
        },
        'bussnessCerts': {
            code: 20002,
            label: '运营方营业执照'
        },
        'tenancyAgreements': {
            code: 30001,
            label: '租赁合同',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'organizationChart': {
            code: 30002,
            label: '公司组织架构图',
            accept: 'image/*'
        },

        'departmentEmployees': {
            code: 30003,
            label: '仓储部员工名单',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'warehousePhotos': {
            code: 30004,
            label: '仓库照片',
            accept: 'image/*'
        },

        'procedures': {
            code: 30005,
            label: '合作商仓储服务整套操作流程和操作规范',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },


        'warehouseLocation': {
            code: 30006,
            label: '仓库库位及区域布局图',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'warehouseAgreement': {
            code: 30007,
            label: '仓库虫害消杀服务协议/流程制度',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'screenCapture': {
            code: 30008,
            label: '仓库管理系统菜单截屏',
            accept: 'image/*'
        },

        'warehouseInsurancePolicy': {
            code: 30009,
            label: '库内货物保险保单',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'operatorQuality': {
            code: 30010,
            label: '运营方质量体系认证',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        },

        'approveOpinion': {
            code: 40001,
            label: '现场评审意见',
            accept: '.pdf, .word, .xls, .xlsx,image/*'
        }
    }
}
//预警趋势/分布的时间选择
export const warningDate = [
    { code: 'ONE_YEAR', label: '近一年' },
    { code: 'HALF_YEAR', label: '近半年' },
    { code: 'THREE_MONTH', label: '近三月' },
    { code: 'ONE_MONTH', label: '近一月' },
    { code: 'ONE_WEEK', label: '近一周' },
]

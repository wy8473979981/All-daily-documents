/**
 * author   lut000
 * date     2019/08/28
 * purpose  下拉选项静态资源
 * */

export const SelectionOptions={
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
	    {key:'',val:'全部'},
	    {key:'3',val:'高风险'},
	    {key:'2',val:'中风险'},
	    {key:'1',val:'低风险'},
	    {key:'0',val:'无风险'}
	],
	RiskLevelArray: [											//风险等级
	    {key:'3',val:'高风险'},
	    {key:'2',val:'中风险'},
	    {key:'1',val:'低风险'},
	    {key:'0',val:'无风险'}
	],
	WarningLevelColorNameType: {								//预警等级
	    '': '全部',
	    '3': '红色',
	    '2': '橙色',
	    '1': '黄色',
	    '0': '无色'
	},
	WarningLevelColorNameArray: [								//预警等级
	    {key:'',val:'全部'},
	    {key:'3',val:'红色'},
	    {key:'2',val:'橙色'},
	    {key:'1',val:'黄色'},
	    {key:'0',val:'无色'}
	],
	hintLevelArr: [                //提示等级
		{ key: '', val: '全部'},
		{ key: '3', val: '一级'},
		{ key: '2', val: '二级'},
		{ key: '1', val: '三级'},
		{ key: '0', val: '无'},
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

	WarehouseType:{								//仓库类型
		20:'普通仓',
		10:'专用仓'
	},
	WarehouseTypeArray:[					//仓库类型
		{'key':20,'name':'普通仓'},
		{'key':10,'name':'专用仓'}
	],

	TemperatureControlTypeArray:[					//温控类型
		{'key':1,'name':'冷冻仓'},
		{'key':2,'name':'冷藏仓'},
		{'key':4,'name':'常温仓'},
		{'key':8,'name':'恒温仓'}
	],
	TemperatureControlType:{					//温控类型
		1:'冷冻仓',
		2:'冷藏仓',
		4:'常温仓',
		8:'恒温仓'
	},
	OwnerType:{								//仓库产权人类型
		20:'个人',
		10:'企业'
	},
	OwnerTypeArray:[					//仓库产权人类型
		{'key':20,'name':'个人'},
		{'key':10,'name':'企业'}
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
	    {'key':'CNY','name':'人民币'},
	    {'key':'HKD','name':'港元'},
	    {'key':'USD','name':'美元'},
	    {'key':'EUR','name':'欧元'},
	    {'key':'GBP','name':'英镑'},
	    {'key':'JPY','name':'日元'},
	    {'key':'AUD','name':'澳元'},
	    {'key':'RUB','name':'卢布'}
	],

	BooleanType:{								//通用是否
		'':'请选择',
		'1':'是',
		'0':'否'
	},
	BooleanTypeArray:[					//通用是否
		{'key':'','name':'请选择'},
		{'key':'1','name':'是'},
		{'key':'0','name':'否'}
    ],
    CompanyCertificateType:{                                    //公司证件类型
        '1':'身份证',
        '2':'护照',
        '3':'营业执照',
        '4':'CI证书'
    },

    DataType:{									//显示数据类型
    	'1':'STANDARD',					//标准
    	'2':'PERSONAL'					//个性化
    },
    RuleStatusType:{									//规则启用状态
    	'ENABLED':'启用',						
    	'DISABLED':'停用'					
    },
    RelationType:{									//额度占用类型
    	'1':'占用',						
    	'2':'被占用'					
    },
    ProductModelType: {
        'DIRECT': '自用额度',// 自用额度
        'GUARANTEE': '担保/(类)集团/其他额度',
        'CHANNEL': '渠道额度'
    },
    BusinessType: {									//业务类型
        FACTORING: '保理额度' ,
        LEASE: '租赁额度' ,
        SUPPLY_CHAIN:'供应链额度',
        LOAN: '小贷额度' ,
        GLP_TRANSPORT: '普运贷' ,
        GLP_GOODS:'普货贷',
        GLP_DATA:'普数贷',
        GLP_BUSINESS:'普业贷',
        OTHER:'其他'
    },

    OperatorType:{									//规则启用状态
    	'SYS':'系统调整',						
    	'MANUAL':'人工调整'					
    },
		
		//证件类型
		certificateTypeArr: [
			{ value: '1', name: '身份证' },
			{ value: '2', name: '护照' },
			{ value: '3', name: '营业执照' },
			{ value: '4', name: 'CI证书' },
		],
		certificateType: {
			'1': '身份证',
			'2': '护照',
			'3': '营业执照',
			'4': 'CI证书',
		},
		//企业类型
		enterpriseNature: [
			{ value: '0', name: '加工' },
			{ value: '1', name: '贸易' },
			{ value: '2', name: '电商平台' },
			{ value: '3', name: '进口' },
			{ value: '4', name: '物流提供方' },
			{ value: '5', name: '其他' },
			{ value: '9', name: '未知' },
		],
		//企业规模
		companyScale: [
			{ value: 'KA', name: '大中' },
			{ value: 'SC', name: '小微' },
		],
		//年营业收入
		yearOperationRevenue: [
			{ value: '0', name: '1000万以下' },
			{ value: '1', name: '1000-5000万' },
			{ value: '2', name: '5000万-1亿' },
			{ value: '3', name: '1亿-10亿' },
			{ value: '4', name: '10亿以上' },
			{ value: '9', name: '未知' },
		],
		//是否GLP关联方
		isGlpRelated: [
			{ value: 'YES', name: '是' },
			{ value: 'NO', name: '否' },
		],
		//实名认证状态
		authStatus: [
			{ value: 0, name: '未实名' },
			{ value: 1, name: '线上实名' },
			{ value: 3, name: '线下实名' },
		],
		//客户类型
		custType:{
			'COMPANY': '企业',
			'PERSON': '个人',
		},
		//性别
		gender:[
			{ value: '1', name: '男性' },
			{ value: '2', name: '女性' },
		],
		//居住状况
		dwellingStatus: [
			{ value: '0', name: '房改' },
			{ value: '1', name: '公司提供' },
			{ value: '2', name: '按揭自置' },
			{ value: '3', name: '无按揭自置' },
			{ value: '4', name: '与父母同住' },
			{ value: '5', name: '租借' },
			{ value: '6', name: '继承' },
			{ value: '9', name: '其他' },
		],
		//工作单位所属行业
		companyIndustry: [

		],
		//婚姻状况
		maritalStatus: [
			{ value: '10', name: '未婚' },
			{ value: '20', name: '已婚' },
			{ value: '30', name: '丧偶' },
			{ value: '40', name: '离婚' },
		],
		//统一授信-额度状态
		unionCreditStatus: {
			'1' : '生效',
			'2' : '失效',
			'3' : '已终结',
			'4' : '待生效'
		},
		//统一授信-放款渠道
		unionProductChannel: {
			'FACTORING': '保理',
			'LEASE': '租赁',
			'LOAN': '小贷',
			'SUPPLY_CHAIN': '卓普信',
    },
	FilestypeCode:{								//文件类型编码
		'houseCerts':{
			code:10001,
			name:'仓库房产证'
		},
		'eiaReports':{
			code:10002,
			name:'仓库环评报告'
		},
		'fireAcceptReports':{
			code:10003,
			name:'仓库消防验收报告'
		},
		'introduceMaterials':{
			code:20001,
			name:'运营方介绍资料'
		},
		'bussnessCerts':{
			code:20002,
			name:'运营方营业执照'
		},
    	'tenancyAgreements':{
    		code:30001,
			name:'租赁合同',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},
    	
    	'organizationChart':{
    		code:30002,
			name:'公司组织架构图',
			accept:'image/*'
    	},
    	
    	'departmentEmployees':{
    		code:30003,
			name:'仓储部员工名单',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},
    	
    	'warehousePhotos':{
    		code:30004,
			name:'仓库照片',
			accept:'image/*'
    	},
    	
    	'procedures':{
    		code:30005,
			name:'合作商仓储服务整套操作流程和操作规范',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},

    	
    	'warehouseLocation':{
    		code:30006,
			name:'仓库库位及区域布局图',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},
    	
    	'warehouseAgreement':{
    		code:30007,
			name:'仓库虫害消杀服务协议/流程制度',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},
    	
    	'screenCapture':{
    		code:30008,
			name:'仓库管理系统菜单截屏',
			accept:'image/*'
    	},
    	
    	'warehouseInsurancePolicy':{
    		code:30009,
			name:'库内货物保险保单',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},
    	
    	'operatorQuality':{
    		code:30010,
			name:'运营方质量体系认证',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	},

    	'approveOpinion':{
    		code:40001,
			name:'现场评审意见',
			accept:'.pdf, .word, .xls, .xlsx,image/*'
    	}
	}
}
//预警趋势/分布的时间选择
export const warningDate = [
	{code: 'ONE_YEAR', name: '近一年'},
	{code: 'HALF_YEAR', name: '近半年'},
	{code: 'THREE_MONTH', name: '近三月'},
	{code: 'ONE_MONTH', name: '近一月'},
	{code: 'ONE_WEEK', name: '近一周'},
]

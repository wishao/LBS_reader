/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.data');

LBSReader.data.RATE = 100.0;


// 状态标识
LBSReader.data.ADMIN_STATUS = {
	EFFECT : 1, // 有效
	NOEFFECT : 0, // 无效
	ALL : -1
	// 全部
};

// 状态标识
LBSReader.data.USER_STATUS = {
	EFFECT : 1, // 有效
	NOEFFECT : 0, // 无效
	ALL : -1
	// 全部
};

// 状态标识
LBSReader.data.BOOK_STATUS = {
	EFFECT : 1, // 有效
	NOEFFECT : 0, // 无效
	ALL : -1
	// 全部
};

LBSReader.data.TASK_STATUS = {
	FINISH : '4',
	FAIL : '5'
};

// 证件类型
LBSReader.data.IDENTITY_TYPE = {
	// 证件类型：0-身份证 1：护照 2：军人证
	PASSPORT : 0,
	ID_CARD : 1,
	SOLDIER : 2
};

// 付费类型
LBSReader.data.PAY_TYPE = {
	// 1-后付费, 2-准预付费, 3-预付费
	AFTER : '1',
	RIGHT_BEFORE : '2',
	BEFORE : '3'
};

// 服务等级
LBSReader.data.Serv_Level = {
	// 10-普通 11-银卡 12-金卡 13-钻卡 99-未知
	NORMAL : 10,
	SILVER : 11,
	GOLDEN : 12,
	DIAMOND : 13,
	UNKNOWN : 99
};
// 证件号码类型
LBSReader.data.SOCIAL_ID_TYPE = {

};

// 终端类型
LBSReader.data.TERMINAL_TYPE = {
	// 0-MSISDN, 1-PHS, 2-PSTN, 3-保留
	MSISDN : 0,
	PHS : 1,
	PSTN : 2,
	RESERVED : 3
};

// 性别
LBSReader.data.SEX = {
	MALE : 'M',
	FEMAIL : 'F'
};

// 服务群组类型
LBSReader.data.SERV_GROUP_TYPE = {
	ENTERPRISE : '01',
	FAMILY : '02',
	PERSON : '03'
};

// 订购关系状态
LBSReader.data.ORDERUSER_STATUS = {
	NORMAL : '1',// 有效
	STOP : '2',// 停用
	OVERDUE : '3',// 欠费
	UNAVAILABLE : '4'
	// 不可用
};

// guoguangfu 2011/08/29审核功能常量
LBSReader.data.AUDITING_TYPE = {
	UNKNOW : 0, // 未审核
	PASS : 1, // 审核通过
	UNPASS : -1, // 审核不通过
	AUTO : 2, // 自动审核
	ALL : 99
	// 取所有的类型
};

// 计费周期
LBSReader.data.CHARGING_CYCLE = {
	MONTH : 0, // 按月
	SEASON : 1, // 按季度
	YEAR : 2, // 按年
	TIME : 3, // 按次
	MINUTE : 4, // 按分钟
	SECOND : 5, // 按秒
	HALFYEAR : 6
	// 按半年
};

// 订购模式
LBSReader.data.ORDER_MODE = {
	NOW : 0, // 立即生效
	NEXT : 1
	// 个计费周期生效
};

// 操作类型
LBSReader.data.OPERATE_TYPE = {
	ADD : 1, // 新增
	MOV : 2, // 修改
	DEL : 3
	// 删除
};

// 状态
LBSReader.data.STATUS = {
	NORMAL : 0, // 正常
	APPLICATION : 1, // 申请
	PAUSE : 2, // 暂停
	PRE_LOGOUT : 3, // 预注销
	LOGOUT : 4
	// 注销
};

// 试用类型
LBSReader.data.TRIAL_TYPE = {
	NO : 0, // 无试用期
	TO_MONTH_END : 1, // 有试用期到月底
	TERM : 2
	// 有试用时长

};

// 扣费渠道
LBSReader.data.CHARGING_CHANNEL = {
	HB : 1, // 号百计费
	CRM : 2
	// CRM计费
};

// 状态标识
LBSReader.data.STATUS_FLAG = {
	EFFECT : 1, // 有效
	NOEFFECT : 0, // 无效
	ALL : -1
	// 全部
};
LBSReader.data.SELECT_FLAG = {
	OPTION : 0, // 可选
	DEFAULT : 1, // 默认
	REQUISITE : 2
	// 必选
};
LBSReader.data.USE_FLAG = {
	EFFECT : 0, // 有效
	NOEFFECT : 1, // 无效
	ALL : -1
	// 全部
};

LBSReader.data.SYSTEM_CODE = {
	BASE_HB : 12, // 基础号百
	SZ_GAOXIN : 21, // 深圳高新
	HG_XINYUAN : 26, // 华工信元
	SX : 27, // 声讯平台
	GXCZT : 28, // 广信车主通
	TT_SHZL : 29,// 天天生活助理平台
	YJKPT : 30,
	WEB_ACCEPT : 31
	// 网络受理平台
}

LBSReader.data.PRODUCT = {
	rows : [{
				id : '1',
				name : '智能号簿',
				effStartTime : '2009-12-12',
				effEndTime : '2012-12-23',
				fairValue : '12',
				selectedFlag : 2
			}, {
				id : '2',
				name : '漏话提醒',
				effStartTime : '2009-12-12',
				effEndTime : '2012-12-23',
				fairValue : '12',
				selectedFlag : 1
			}, {
				id : '3',
				name : '开机提醒',
				effStartTime : '2009-12-12',
				effEndTime : '2012-12-23',
				fairValue : '12',
				selectedFlag : 0
			}, {
				id : '4',
				name : '挂机短信',
				effStartTime : '2009-12-12',
				effEndTime : '2012-12-23',
				fairValue : '12',
				selectedFlag : 0
			}, {
				id : '5',
				name : '智能应答',
				effStartTime : '2009-12-12',
				effEndTime : '2012-12-23',
				fairValue : '12',
				selectedFlag : 0
			}]
};

LBSReader.data.GROUP_ITEM = {
	rows : [{
				id : '1',
				name : '智能号簿',
				selectFlag : 0
			}, {
				id : '2',
				name : '漏话提醒',
				selectFlag : 1
			}, {
				id : '3',
				name : '开机提醒',
				selectFlag : 2
			}, {
				id : '4',
				name : '挂机短信',
				selectFlag : 2
			}, {
				id : '5',
				name : '智能应答',
				selectFlag : 2
			}]
};

LBSReader.data.S_PACKAGE = {
	rows : [{
				id : '1',
				name : '号百公众信息包A',
				seqNum : 'HBGZXXB2',
				products : '挂机短信',
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31',
				smax : '14元'
			}]
};

LBSReader.data.C_PACKAGE = {
	rows : [{
				id : '1',
				name : '号百公众信息包B',
				seqNum : 'HBGZXXB3',
				products : [{
							id : '1',
							name : '智能号簿',
							type : 0
						}, {
							id : '2',
							name : '漏话提醒',
							type : 1
						}, {
							id : '3',
							name : '开机提醒',
							type : 2
						}, {
							id : '4',
							name : '挂机短信',
							type : 2
						}],
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31',
				smax : '14元'
			}]
};

LBSReader.data.PACKAGE = {
	rows : [{
				id : '1',
				name : '号百公众信息包A',
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31',
				smax : '14元',
				pcombo : [{
							id : 1,
							name : '产品组A'
						}, {
							id : 1,
							name : '产品组B'
						}]
			}]
};

LBSReader.data.PCOMBO = {
	rows : [{
				id : '1',
				name : '产品组A',
				smax : 4,
				products : [{
							id : '1',
							name : '智能号簿',
							type : 0
						}, {
							id : '2',
							name : '漏话提醒',
							type : 1
						}, {
							id : '3',
							name : '开机提醒',
							type : 2
						}, {
							id : '4',
							name : '挂机短信',
							type : 2
						}]
			}, {
				id : '2',
				name : '产品组B',
				smax : 4,
				products : [{
							id : '1',
							name : '漏话提醒',
							type : 0
						}, {
							id : '2',
							name : '智能号簿',
							type : 1
						}, {
							id : '3',
							name : '开机提醒',
							type : 2
						}, {
							id : '4',
							name : '挂机短信',
							type : 2
						}]
			}]
};

LBSReader.data.SUITE = {
	rows : [{
				id : '1',
				name : '天翼大众',
				ppkg : '号百公众信息包A',
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31'
			}]
};

LBSReader.data.ORDER = {
	rows : [{
				id : '1',
				name : '巴博',
				tel : '13316099309',
				products : [{
							id : '1',
							name : '智能号簿',
							type : 0
						}, {
							id : '2',
							name : '漏话提醒',
							type : 1
						}, {
							id : '3',
							name : '开机提醒',
							type : 2
						}, {
							id : '4',
							name : '挂机短信',
							type : 2
						}],
				status : '已下单'
			}]
};

LBSReader.data.ORDERUSER = {
	rows : [{
				id : '1',
				name : '郑义',
				nodeCode : '广州',
				tel : '13316099309',
				suiteId : 0,
				suiteName : '号百公众信息包A',
				products : [{
							id : '1',
							name : '智能号簿',
							code : 0
						}, {
							id : '2',
							name : '漏话提醒',
							code : 1
						}],
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31'
			}, {
				id : '2',
				name : '郑九',
				tel : '13316099909',
				nodeCode : '广州',
				suiteId : 0,
				suiteName : '号百公众信息包A',
				products : [{
							id : '3',
							name : '开机提醒',
							code : 2
						}, {
							id : '4',
							name : '挂机短信',
							code : 2
						}],
				timeBgn : '2010-12-01',
				timeEnd : '2011-01-31'
			}]
};
/**
 * 日期格式
 * 
 * @type
 */
Date.patterns = {
	ISO8601Long : "Y-m-d H:i:s",
	ISO8601Middle : "YmdHis",// this
	ISO8601Short : "Y-m-d",
	ShortDate : "n/j/Y",
	LongDate : "l, F d, Y",
	FullDateTime : "l, F d, Y g:i:s A",
	MonthDay : "F d",
	ShortTime : "g:i A",
	LongTime : "g:i:s A",
	SortableDateTime : "Y-m-d\\TH:i:s",
	UniversalSortableDateTime : "Y-m-d H:i:sO",
	YearMonth : "F, Y"
};
/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.renderer');

LBSReader.renderer.ADMIN_STATUS = function(value) {
	if (LBSReader.data.ADMIN_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.ADMIN_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.USER_STATUS = function(value) {
	if (LBSReader.data.USER_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.USER_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.BOOK_STATUS = function(value) {
	if (LBSReader.data.BOOK_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.BOOK_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.RECORD_SHARE = function(value) {
	if (LBSReader.data.RECORD_SHARE.YES == value) {
		return '<font color="green">分享</font>';
	} else if (LBSReader.data.RECORD_SHARE.NO == value) {
		return '<font color="red">私有</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.ADMIN_ROLE = function(value) {
	if (value == '1') {
		return '超级管理员';
	} else if (value == '2') {
		return '用户管理员';
	} else if(value == '3'){
		return '书籍管理员';
	}else{
		return '未知';
	}
}






LBSReader.renderer.TASK_LEVEL = function(value) {
	if (value == 0) {
		return '<span style="color:red;">紧急</span>';
	} else if (value == 1) {
		return '高';
	} else if (value == 2) {
		return '中';
	} else if (value == 3) {
		return '低';
	} else {
		return '未知';
	}
};

LBSReader.renderer.TASK_PLAN = function(value) {
	if (value == '0') {
		return '定时';
	} else if (value == '1') {
		return '立即执行';
	} else {
		return '其他';
	}
}

LBSReader.renderer.TASK_TYPE = function(value) {
	if (value == '0') {
		return '批量订购';
	} else if (value == '1') {
		return '批量拆机';
	} else {
		return '未知';
	}
}
LBSReader.renderer.TASK_STATUS = function(value) {
	if (value == '0') {
		return '数据导入中';
	} else if (value == '1') {
		return '导入完成';
	} else if (value == '2') {
		return '启动';
	} else if (value == '3') {
		return '进行中';
	} else if (value == '4') {
		return '已完成';
	} else if (value == '5') {
		return '失败';
	} else {
		return '未知';
	}
}
LBSReader.renderer.TASKLIST_STATUS = function(value) {
	if (value == '0') {
		return '未开始';
	} else if (value == '1') {
		return '进行中';
	} else if (value == '2') {
		return '成功';
	} else if (value == '3') {
		return '失败';
	} else {
		return '未知';
	}
}

LBSReader.renderer.CHARGETYPE = function(value) {
	if (value == 0) {
		return "帐户划扣";
	} else if (value == 1) {
		return "以积分兑换";
	} else {
		return "暂无"
	}
};
// 证件类型
LBSReader.renderer.IDENTITY_TYPE = function(value) {
	if (value == LBSReader.data.IDENTITY_TYPE.ID_CARD) {
		return '身份证';
	} else if (value = LBSReader.data.IDENTITY_TYPE.PASSPORT) {
		return '护照';
	} else if (value == LBSReader.data.IDENTITY_TYPE.SOLDIER) {
		return '军人证';
	} else {
		return '暂无';
	}
};

// 付费类型
LBSReader.renderer.PAY_TYPE = function(value) {
	if (value == LBSReader.data.PAY_TYPE.AFTER)
		return '后付费';
	else if (value == LBSReader.data.PAY_TYPE.BEFORE)
		return '<span style="color:#008;">预付费</span>';
	else if (value == LBSReader.data.PAY_TYPE.RIGHT_BEFORE)
		return '<span style="color:#008;">准预付费</span>';
	else
		return '<span style="color:#d00;">暂无</span>';
};

LBSReader.renderer.PAY_TYPE_NO_STYLE = function(value) {
	if (value == LBSReader.data.PAY_TYPE.AFTER)
		return '后付费';
	else if (value == LBSReader.data.PAY_TYPE.BEFORE)
		return '预付费';
	else if (value == LBSReader.data.PAY_TYPE.RIGHT_BEFORE)
		return '准预付费';
	else
		return '暂无';
};

// 服务等级
LBSReader.renderer.SERV_LEVEL = function(value) {
	if (value == LBSReader.data.Serv_Level.NORMAL)
		return '普通';
	else if (value == LBSReader.data.Serv_Level.SILVER)
		return '银卡';
	else if (value == LBSReader.data.Serv_Level.GOLDEN)
		return '金卡';
	else if (value == LBSReader.data.Serv_Level.DIAMOND)
		return '钻石';
	else if (value == LBSReader.data.Serv_Level.UNKNOWN)
		return '暂无';
};

// 终端类型
LBSReader.renderer.TERMINAL_TYPE = function(value) {
	if (value == LBSReader.data.TERMINAL_TYPE.MSISDN)
		return 'MSISDN';
	else if (value == LBSReader.data.TERMINAL_TYPE.PHS)
		return 'PHS';
	else if (value == LBSReader.data.TERMINAL_TYPE.PSTN)
		return 'PSTN';
	else if (value == LBSReader.data.TERMINAL_TYPE.RESERVED)
		return '保留';
	else
		return '暂无';
};

// 电话号码状态
LBSReader.renderer.TEL_STATE = function(value) {
	if (value == "B0A") {
		return '正常';
	} else if (value = "B0X") {
		return '拆机';
	} else if (value = "B0S") {
		return '停机';
	} else if (value = "B0B") {
		return '新装未完工';
	} else if (value = 'B0T') {
		return '拆机未完工';
	} else {
		return '暂无';
	}
};

// 性别
LBSReader.renderer.SEX = function(value) {
	if (LBSReader.data.SEX.MALE == value)
		return '男';
	else if (LBSReader.data.SEX.FEMALE == value)
		return '女';
	else
		return '暂无';
};

LBSReader.renderer.SERV_GROUP_TYPE = function(value) {
	if (LBSReader.data.SERV_GROUP_TYPE.ENTERPRISE == value)
		return '政企';
	else if (LBSReader.data.SERV_GROUP_TYPE.FAMILY == value)
		return '家庭';
	else if (LBSReader.data.SERV_GROUP_TYPE.PERSON == value)
		return '个人';
	else
		return '暂无';
};
LBSReader.renderer.ORDER_USER_STATUS = function(value) {
	// B0A-正常, B0X-拆机, B0S-停机, B0B-新装未完工, B0T-拆机未完工'
	if ('1' == value) {
		return '<span class=\"combo_status_normal\">有效</span>';
	} else if ('4' == value) {
		return '<span class=\"combo_status_stop\">拆机</span>';
	} else if ('2' == value) {
		return '<span class=\"combo_status_stop\">停机</span>';
	} else if ('3' == value) {
		return '欠费';
	} else {
		return '<span class=\"unknown\">暂无</span>';
	}
};

LBSReader.renderer.ORDER_USER_USAGE_FLAG = function(value) {
	if ('0' == value) {
		return '<font color=\"#00AA00\">正式</font>';
	} else if ('1' == value) {
		return '<font color=\"blue\">试用</font>';
	} else {
		return '<span class=\"unknown\">暂无</span>';
	}
};
LBSReader.renderer.ORDER_SERVICE_TYPE = function(val) {
	if ('add' == val) {
		return '<font color=\"#008800\">新增</font>';
	} else if ('upd' == val) {
		return '<font color=\"blue\">修改</font>';
	} else if ('rmv' == val || 'rm' == val) {
		return '<font color=\"red\">拆机</font>';
	} else {
		return '<span class=\"unknown\">暂无</span>';
	}
};

LBSReader.renderer.ORDER_STATUS = function(value) {
	if ('-1' == value) {
		return '<span class="workflow_status_exception">异常</span>';
	} else if ('-3' == value) {
		return '<span class="workflow_status_timeout">超时</span>';
	} else if ('0' == value) {
		return '<span class="workflow_status_processing">处理中</span>';
	} else if ('1' == value) {
		return '<span class="workflow_status_waiting">等待中</span>';
	} else if ('2' == value) {
		return '<span class="workflow_status_complete">完成</span>';
	} else if ('3' == value) {
		return '<font color="blue" class="workflow_status_error_complete">结束</font>';
	} else {
		return '<font color="red"  class="workflow_status_unknown">暂无</font>';
	}
};

LBSReader.renderer.ECRM_ORDER_STATUS = function(value) {
	if ('-1' == value) {
		return '<span class="workflow_status_exception">异常</span>';
	} else if ('-3' == value) {
		return '<span class="workflow_status_timeout">超时</span>';
	} else if ('0' == value) {
		return '<span class="workflow_status_processing">处理中</span>';
	} else if ('1' == value) {
		return '<span class="workflow_status_waiting">等待中</span>';
	} else if ('2' == value) {
		return '<span class="workflow_status_complete">完成</span>';
	} else if ('3' == value) {
		return '<font color="blue" class="workflow_status_error_complete">结束</font>';
	} else if ('4' == value) {
		return '<span class="workflow_status_waiting">等待业务平台回单</span>';
	} else if ('5' == value) {
		return '<span class="workflow_status_exception">业务平台异常</span>';
	} else {
		return '<font color="red"  class="workflow_status_unknown">暂无</font>';
	}
};
LBSReader.renderer.ECRM_ACTION_STATUS = function(value) {
	if ('-2' == value) {
		return '<span class="workflow_status_exception">异常</span>';
	} else if ('-3' == value) {
		return '<span class="workflow_status_timeout">超时</span>';
	} else if ('0' == value) {
		return '<span class="workflow_status_processing">等待中</span>';
	} else if ('1' == value) {
		return '<span class="workflow_status_waiting">处理中</span>';
	} else if ('2' == value) {
		return '<span class="workflow_status_complete">完成</span>';
	} else if ('3' == value) {
		return '<font color="blue" class="workflow_status_error_complete">结束</font>';
	} else if ('4' == value) {
		return '<span class="workflow_status_waiting">等待业务平台回单</span>';
	} else {
		return '<font color="red"  class="workflow_status_unknown">暂无</font>';
	}
};

LBSReader.renderer.ORDER_SOURCE = function(value) {
	// if ('1' == value) {
	// return '网百';
	// } else if ('2' == value) {
	// return '118114';
	// } else
	if ('3' == value) {
		return 'MBOSS';
	} else if ('4' == value) {
		return 'VSOP';
	} else if ('5' == value) {
		return 'VSOP_网厅';
	} else if ('6' == value) {
		return 'VSOP_掌厅';
	} else if ('7' == value) {
		return 'VSOP_短厅';
	} else if ('12' == value) {
		return 'ISMP-HB';
	} else if ('27' == value) {
		return '声讯平台';
	} else if ('28' == value) {
		return '广信车主通平台';
	} else if ('30' == value) {
		return '翼健康平台';
	} else if ('31' == value)
		return '网络受理平台';
	else {
		return '<font color="red">暂无</font>';
	}
};

// 24 Aug, 2011. Farago
LBSReader.renderer.ORDER_BUSI_RESULT = function(value) {
	// 0-待开通 1-开通正常(业务系统) 2-开通正常(pcrm) 10-电话状态不正确 11-限拨
	if ('0' == value) {
		return '待开通';
	} else if ('1' == value) {
		return '开通正常(业务系统)';
	} else if ('2' == value) {
		return '开通正常(PCRM)';
	} else if ('10' == value) {
		return '电话状态不正确';
	} else if ('11' == value) {
		return '限拨';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.CITYlIST = function(value) {
	var str = '<font color="red">暂无</font>';
	switch (value) {
		case 'GZ' :
			str = '广州';
			break;
		case 'SZ' :
			str = '深圳';
			break;
		case 'DG' :
			str = '东莞';
			break;
		case 'FS' :
			str = '佛山';
			break;
		case 'ZQ' :
			str = '肇庆';
			break;
		case 'YF' :
			str = '云浮';
			break;
		case 'ST' :
			str = '汕头';
			break;
		case 'CZ' :
			str = '潮州';
			break;
		case 'JM' :
			str = '江门';
			break;
		case 'ZS' :
			str = '中山';
			break;
		case 'ZJ' :
			str = '湛江';
			break;
		case 'SG' :
			str = '韶关';
			break;
		case 'QY' :
			str = '清远';
			break;
		case 'HY' :
			str = '河源';
			break;
		case 'SW' :
			str = '汕尾';
			break;
		case 'YJ' :
			str = '阳江';
			break;
		case 'MM' :
			str = '茂名';
			break;
		case 'ZH' :
			str = '珠海';
			break;
		case 'HZ' :
			str = '惠州';
			break;
		case 'MZ' :
			str = '梅州';
			break;
		case 'JY' :
			str = '揭阳';
			break;
	}
	return str;
};

LBSReader.renderer.EFFECTMODE = function(value) {
	if (LBSReader.data.ORDER_MODE.NOW == value) {
		return '立即生效';
	} else if (LBSReader.data.ORDER_MODE.NEXT == value) {
		return '下个计费周期生效';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.CHARGINGMODE = function(value) {
	if (LBSReader.data.CHARGING_CHANNEL.HB == value) {
		return '号百计费';
	} else if (LBSReader.data.CHARGING_CHANNEL.CRM == value) {
		return 'CRM计费';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.CHARGINGCYCLE = function(value) {
	if (LBSReader.data.CHARGING_CYCLE.MONTH == value) {
		return '按月';
	} else if (LBSReader.data.CHARGING_CYCLE.SEASON == value) {
		return '按季度';
	} else if (LBSReader.data.CHARGING_CYCLE.YEAR == value) {
		return '按年';
	} else if (LBSReader.data.CHARGING_CYCLE.TIME == value) {
		return '按次';
	} else if (LBSReader.data.CHARGING_CYCLE.MINUTE == value) {
		return '按分钟';
	} else if (LBSReader.data.CHARGING_CYCLE.SECOND == value) {
		return '按秒';
	} else if (LBSReader.data.CHARGING_CYCLE.HALFYEAR == value) {
		return '按半年';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.TRIAL_TYPE = function(value) {
	if (LBSReader.data.TRIAL_TYPE.NO == value) {
		return '无试用期';
	} else if (LBSReader.data.TRIAL_TYPE.TO_MONTH_END == value) {
		return '有试用期到月底';
	}
	if (LBSReader.data.TRIAL_TYPE.TERM == value) {
		return '有试用时长';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.OPERATETYPE = function(value) {
	if (LBSReader.data.OPERATE_TYPE.ADD == value) {
		return '新增';
	} else if (LBSReader.data.OPERATE_TYPE.MOV == value) {
		return '修改';
	} else if (LBSReader.data.OPERATE_TYPE.DEL == value) {
		return '删除';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.STATUS = function(value) {
	if (LBSReader.data.STATUS.NORMAL == value) {
		return '正常';
	} else if (LBSReader.data.STATUS.APPLICATION == value) {
		return '申请';
	} else if (LBSReader.data.STATUS.PAUSE == value) {
		return '暂停';
	} else if (LBSReader.data.STATUS.PRE_LOGOUT == value) {
		return '预注销';
	} else if (LBSReader.data.STATUS.LOGOUT == value) {
		return '注销';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.AUDITING_FLAG = function(value) {
	if (LBSReader.data.AUDITING_TYPE.UNKNOW == value) {
		return '未审核';
	} else if (LBSReader.data.AUDITING_TYPE.PASS == value) {
		return '<font color="green">审核通过</font>';
	} else if (LBSReader.data.AUDITING_TYPE.UNPASS == value) {
		return '<font color="gray">审核不通过</font>';
	} else if (LBSReader.data.AUDITING_TYPE.AUTO == value) {
		return '自动审核';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.SYSTEM_CODE = function(value) {
	if (LBSReader.data.SYSTEM_CODE.BASE_HB == value) {
		return '基础号百';
	} else if (LBSReader.data.SYSTEM_CODE.SZ_GAOXIN == value) {
		return '深圳高新';
	} else if (LBSReader.data.SYSTEM_CODE.HG_XINYUAN == value) {
		return '华工信元';
	} else if (LBSReader.data.SYSTEM_CODE.SX == value) {
		return '声讯平台';
	} else if (LBSReader.data.SYSTEM_CODE.WEB_ACCEPT == value) {
		return '网络受理平台';
	} else if (LBSReader.data.SYSTEM_CODE.TT_SHZL == value) {
		return '天天生活助理平台';
	} else if (LBSReader.data.SYSTEM_CODE.JKGW == value) {
		return '翼健康平台';
	} else {
		return '<font color="red">暂无</font>';
	}
};

LBSReader.renderer.SELECT_FLAG = function(value) {
	if (LBSReader.data.SELECT_FLAG.OPTION == value) {
		return '可选项';
	} else if (LBSReader.data.SELECT_FLAG.DEFAULT == value) {
		return '<font color="gray">默认选项</font>';
	} else if (LBSReader.data.SELECT_FLAG.REQUISITE == value) {
		return '<font color="red">必选项</font>';
	}
};

LBSReader.renderer.STATUS_FLAG = function(value) {
	if (LBSReader.data.STATUS_FLAG.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.STATUS_FLAG.NOEFFECT == value) {
		return '<font color="gray">无效</font>';
	} else {
		return '<font color="red">暂无</font>';
	}
};
LBSReader.renderer.BEGIN_RULE = function(value) {
	if (1 == value) {
		return '按天计费';
	} else if (2 == value) {
		return '收取全月费用';
	} else if (3 == value) {
		return '收取全年费用';
	} else if (4 == value) {
		return '1-15日收全月费用，16日后收半月费用';
	} else if (5 == value) {
		return '1-22日收全月费用，23日后免费';
	} else if (6 == value) {
		return '收取半年费用';
	} else if (7 == value) {
		return '首月免费';
	} else if (8 == value) {
		return '收取一个季度费用';
	} else if (9 == value) {
		return '收取全月费用（C网按天收取）';
	} else if (99 == value) {
		return '其他';
	} else {
		return '<font color="red">暂无</font>';
	}
};
LBSReader.renderer.SP_STATUS = function(value) {
	if (0 == value) {
		return '正常';
	} else {
		return '<font color="red">注销删除</font>';
	}
};
LBSReader.renderer.END_PRE_CHARG = function(value) {
	if (1 == value) {
		return '当月生效，不计费';
	} else if (2 == value) {
		return '次月生效，当月按正常收费';
	} else if (3 == value) {
		return '到底自动失效';
	} else if (4 == value) {
		return '1-9日按天收费，10日后次月生效';
	} else if (5 == value) {
		return '1-9日免费，10日后次月生效';
	} else if (99 == value) {
		return '其他';
	} else {
		return '<font color="red">暂无</font>';
	}
};
LBSReader.renderer.END_AFTER_CHARG = function(value) {
	if (1 == value) {
		return '当月生效，不计费';
	} else if (2 == value) {
		return '次月生效，当月按正常收费';
	} else if (3 == value) {
		return '到期自动失效';
	} else if (4 == value) {
		return '1-15日免费，16日后半价';
	} else if (5 == value) {
		return '按天收费';
	} else if (99 == value) {
		return '其他';
	} else {
		return '<font color="red">暂无</font>';
	}
};
LBSReader.renderer.PACKAGE_SIMPLE_PRODUCT = function(obj) {
	return obj.name || '';
};
LBSReader.renderer.PACKAGE_MULTI_PRODUCT = function(obj) {
	var value = [];
	for (var i = 0; i < obj.length; i++) {
		pro = obj[i];
		if (pro) {
			if (pro.selectedFlag == 0) {
				value.push(pro.name + '(可选)');
			} else if (pro.selectedFlag == 1) {
				value.push(pro.name + '<font color="gray">(默认)</font>');
			} else if (pro.selectedFlag == 2) {
				value.push(pro.name + '<font color="red">(必选)</font>');
			}
			value.push('<br>');
		}
	}
	return value.join(' ');
};

LBSReader.renderer.PACKAGE_PRODUCT = function(obj) {
	var value = [];
	for (var i = 0; i < obj.length; i++) {
		var pg = obj[i];
		if (pg.product) {
			for (var j = 0; j < pg.product.length; j++) {
				var pro = pg.product[j];
				if (pro) {
					if (pro.selectedFlag == 0) {
						value.push(pro.proName + '(可选)');
					} else if (pro.selectedFlag == 1) {
						value.push(pro.proName
								+ '<font color="gray">(默认)</font>');
					} else if (pro.selectedFlag == 2) {
						value.push(pro.proName
								+ '<font color="red">(必选)</font>');
					}
					value.push('<br>');
				}
			}
		}

	}
	return value.join(' ');
};
// zengjw 2012-07-23 试用标识
LBSReader.renderer.USAGE_FLAG = function(value) {
	if (LBSReader.data.USE_FLAG.EFFECT == value) {
		return '有效';
	} else if (LBSReader.data.USE_FLAG.NOEFFECT == value) {
		return '无效';
	} else {
		return '暂无';
	}
};
// zengjw 2012-07-23 启用标识
LBSReader.renderer.VIEW_STATUS_FLAG = function(value) {
	if (LBSReader.data.STATUS_FLAG.EFFECT == value) {
		return '有效';
	} else if (LBSReader.data.STATUS_FLAG.NOEFFECT == value) {
		return '无效';
	} else {
		return '暂无';
	}
};
// zengjw 2012-08-14 订购关系标识
LBSReader.renderer.ORDER_USER_STATUS_SIMPLE = function(value) {
	// B0A-正常, B0X-拆机, B0S-停机, B0B-新装未完工, B0T-拆机未完工'
	if ('1' == value) {
		return '有效';
	} else if ('4' == value) {
		return '拆机';
	} else if ('2' == value) {
		return '停机';
	} else if ('3' == value) {
		return '欠费';
	} else {
		return '暂无';
	}
};
// pansenxin 2012-8-15 政企工单服务类型
// 电话号码状态
LBSReader.renderer.ECRM_SERVICE_TYPE = function(value) {
	if (value == "001") {
		return '新装';
	} else if (value == "002") {
		return '停机';
	} else if (value == "003") {
		return '复机';
	} else if (value == "004") {
		return '变更资料';
	} else if (value == '005') {
		return '拆机';
	} else if (value == '006') {
		return '改关联产品接入号';
	} else if (value == '007') {
		return '优惠申请';
	} else if (value == '008') {
		return '优惠取消';
	} else if (value == '009') {
		return '优惠变更';
	} else if (value == '020') {
		return '单机加入群';
	} else if (value == '021') {
		return '单机退出群';
	} else if (value == '022') {
		return '改付费号码';
	} else {
		return '暂无';
	}
};
LBSReader.renderer.ECRM_SERVICE_STATUS = function(value) {
	if ('-1' == value) {
		return '异常';
	} else if ('-3' == value) {
		return '超时';
	} else if ('0' == value) {
		return '处理中';
	} else if ('1' == value) {
		return '等待中';
	} else if ('2' == value) {
		return '完成';
	} else if ('3' == value) {
		return '结束';
	} else if ('4' == value) {
		return '等待业务平台回单';
	} else {
		return '暂无';
	}
};
LBSReader.renderer.ECRM_CREATETIME = function(value) {
	if (value.length == 0) {
		return ' ';
	} else {
		return value.substring(0, 10);
	}
};
LBSReader.renderer.ECRM_RETURNSTRING = function(value) {
	if (value == '0|OK') {
		return '成功';
	} else if (value == '') {
		return '';
	} else {
		return '失败:' + value;
	}
};
LBSReader.renderer.ECRMORDERUSERSTATE = function(value) {
	var str = '暂无';
	switch (value) {
		case 'B0S' :
			str = '停机';
			break;
		case 'B0T' :
			str = '拆机';
			break;
		case 'B0A' :
			str = '正常';
	}
	return str;
};
LBSReader.renderer.CITYCOBO = function(value) {
	var str = '<font color="red">暂无</font>';
	switch (value) {
		case '020' :
			str = '广州';
			break;
		case '0755' :
			str = '深圳';
			break;
		case '0769' :
			str = '东莞';
			break;
		case '0757' :
			str = '佛山';
			break;
		case '0758' :
			str = '肇庆';
			break;
		case '0766' :
			str = '云浮';
			break;
		case '0754' :
			str = '汕头';
			break;
		case '0768' :
			str = '潮州';
			break;
		case '0750' :
			str = '江门';
			break;
		case '0760' :
			str = '中山';
			break;
		case '0759' :
			str = '湛江';
			break;
		case '0751' :
			str = '韶关';
			break;
		case '0763' :
			str = '清远';
			break;
		case '0762' :
			str = '河源';
			break;
		case '0660' :
			str = '汕尾';
			break;
		case '0662' :
			str = '阳江';
			break;
		case '0668' :
			str = '茂名';
			break;
		case '0756' :
			str = '珠海';
			break;
		case '0752' :
			str = '惠州';
			break;
		case '0753' :
			str = '梅州';
			break;
		case '0663' :
			str = '揭阳';
			break;
	}
	return str;
};
LBSReader.renderer.ECRM_PRODUCT_BCF = function(value) {
	if ('1' == value) {
		return '信息搜索类';
	} else if ('2' == value) {
		return '企业信息类';
	} else if ('3' == value) {
		return '通信信息助理类';
	} else if ('4' == value) {
		return '套餐销售品';
	} else if ('5' == value) {
		return '电信传媒类';
	} else if ('6' == value) {
		return '电子商务类';
	} else {
		return '暂无';
	}
};
LBSReader.renderer.ECRM_PRODUCT_FLAG = function(value) {
	if ('0' == value) {
		return '启用';
	} else if ('1' == value) {
		return '下线';
	} else {
		return '暂无';
	}
};
LBSReader.renderer.ECRM_PRODUCT_TYPE = function(value) {
	if ('1' == value) {
		return '订购类';
	} else if ('2' == value) {
		return '合同类';
	} else {
		return '暂无';
	}
};
LBSReader.renderer.ECRMPRODUCTCITYCOBO = function(value) {
	var str = '全省通用';
	switch (value) {
		case '020' :
			str = '广州';
			break;
		case '0755' :
			str = '深圳';
			break;
		case '0769' :
			str = '东莞';
			break;
		case '0757' :
			str = '佛山';
			break;
		case '0758' :
			str = '肇庆';
			break;
		case '0766' :
			str = '云浮';
			break;
		case '0754' :
			str = '汕头';
			break;
		case '0768' :
			str = '潮州';
			break;
		case '0750' :
			str = '江门';
			break;
		case '0760' :
			str = '中山';
			break;
		case '0759' :
			str = '湛江';
			break;
		case '0751' :
			str = '韶关';
			break;
		case '0763' :
			str = '清远';
			break;
		case '0762' :
			str = '河源';
			break;
		case '0660' :
			str = '汕尾';
			break;
		case '0662' :
			str = '阳江';
			break;
		case '0668' :
			str = '茂名';
			break;
		case '0756' :
			str = '珠海';
			break;
		case '0752' :
			str = '惠州';
			break;
		case '0753' :
			str = '梅州';
			break;
		case '0663' :
			str = '揭阳';
			break;
	}
	return str;
};
LBSReader.renderer.ECRM_SUPHBPRODUCT = function(obj) {
	return obj.name || '';
};

// XXX ecrm.order sourcE
LBSReader.renderer.ECRM_ORDER_SOURCE_RENDERER = function(value) {
	if (value == "23") {
		return "CRM";
	} else if (value == "18") {
		return "SPS";
	} else if (value == "30") {
		return "ICRM";
	} else {
		return value;
	}
}

LBSReader.renderer.BILL_OFFER_FA_PAY_TYPE = function(value) {
	console.log('value=' + value);
	if (value == "0") {
		return "后付费";
	} else if (value == "1") {
		return "预付费";
	} else if (value == "2") {
		return "准预付费";
	} else {
		return "未知";
	}
}

LBSReader.renderer.BILL_OFFER_CAPABILTY = function(value) {
	if (value == "PIVR") {
		return "固网声讯 ";
	} else if (value == "IVR") {
		return "C网声讯";
	} else {
		return "未知";
	}
}
LBSReader.renderer.BILL_OFFER_OP_STATUS = function(value) {
	if (value == "-314") {
		return "扣费异常 ";
	} else if (value == "0") {
		return "扣费成功";
	} else if (value == "1") {
		return "余额不足";
	} else if (value == "2") {
		return "未操作";
	} else {
		return "未知";
	}
}

LBSReader.renderer.BILL_OFFER_PAY_TYPE = function(value) {
	if (value == "P") {
		return "预付费 ";
	} else if (value == "A") {
		return "后付费";
	} else {
		return "未知";
	}
}

LBSReader.renderer.BILL_COST_FREE_OP_STATUS = function(value) {
	if (value == "0") {
		return "未免单";
	} else if (value == "1") {
		return "已免单";
	} else {
		return "未知";
	}
}

LBSReader.renderer.BILL_COST_FREE_STYPE = function(value) {
	if (value == "1") {
		return "全国";
	} else if (value == "2") {
		return "全省160";
	} else if (value == "3") {
		return "按时按次";
	} else if (value == "4") {
		return "包月";
	} else {
		return "未知";
	}
}

LBSReader.renderer.MONITOR_PAY_TYPE = function(value) {
	if (value == "A") {
		return "后付费(" + value + ")";
	} else if (value == "P") {
		return "预付费(" + value + ")";
	} else {
		return "未知";
	}
}

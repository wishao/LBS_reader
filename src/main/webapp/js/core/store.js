/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.store');

var jsonStore_timeout = 6000;// timeout
IsmpHB.store.JOB_PLAN = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ '0', '定时' ], [ '1', '立即执行' ] ]
});

IsmpHB.store.ADMIN_ROLE = new Ext.data.ArrayStore({
	fields : [ 'role', 'roleName' ],
	data : [ [ '3', '经营班子' ], [ '4', '营销管理' ], [ '5', '业务管理' ],
			[ '6', '统计分析' ], [ '7', '客服' ], [ '8', '业务支撑' ], [ '9', '业务查询' ] ]
});

IsmpHB.store.PAYTYPE = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ '', '所有' ], [ '1', '预付费' ], [ '2', '准预付费' ], [ '3', '后付费' ] ]
});

IsmpHB.store.SOURCE = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ '', '所有' ], [ '3', 'MBOSS' ], [ '4', 'VSOP' ],
			[ '5', 'VSOP_网厅' ], [ '6', 'VSOP_掌厅' ], [ '7', 'VSOP_短厅' ],
			[ '12', 'ISMP-HB' ], [ '27', '声讯平台' ], [ '28', '广信车主通' ],
			[ '30', '翼健康平台' ], [ '31', '网络受理平台' ] ]
// , [ '1', '网百' ], [ '2', '118114' ]
});

IsmpHB.store.CITY_GUANGDONG = new Ext.data.ArrayStore({
	fields : [ 'areaCode', 'name', 'nodeCode' ],
	data : [ [ '020', '广州', 'GZ' ], [ '0755', '深圳', 'SZ' ],
			[ '0769', '东莞', 'DG' ], [ '0757', '佛山', 'FS' ],
			[ '0756', '珠海', 'ZH' ], [ '0758', '肇庆', 'ZQ' ],
			[ '0766', '云浮', 'YF' ], [ '0754', '汕头', 'ST' ],
			[ '0768', '潮州', 'CZ' ], [ '0752', '惠州', 'HZ' ],
			[ '0750', '江门', 'JM' ], [ '0760', '中山', 'ZS' ],
			[ '0759', '湛江', 'ZJ' ], [ '0751', '韶关', 'SG' ],
			[ '0753', '梅州', 'MZ' ], [ '0763', '清远', 'QY' ],
			[ '0762', '河源', 'HY' ], [ '0660', '汕尾', 'SW' ],
			[ '0662', '阳江', 'YJ' ], [ '0663', '揭阳', 'JY' ],
			[ '0668', '茂名', 'MM' ] ]
});

IsmpHB.store.CITY_GD = new Ext.data.ArrayStore({
	fields : [ 'areaCode', 'name', 'nodeCode' ],
	data : [ [ '', '所有', '' ], [ '020', '广州', 'GZ' ], [ '0755', '深圳', 'SZ' ],
			[ '0769', '东莞', 'DG' ], [ '0757', '佛山', 'FS' ],
			[ '0756', '珠海', 'ZH' ], [ '0758', '肇庆', 'ZQ' ],
			[ '0766', '云浮', 'YF' ], [ '0754', '汕头', 'ST' ],
			[ '0768', '潮州', 'CZ' ], [ '0752', '惠州', 'HZ' ],
			[ '0750', '江门', 'JM' ], [ '0760', '中山', 'ZS' ],
			[ '0759', '湛江', 'ZJ' ], [ '0751', '韶关', 'SG' ],
			[ '0753', '梅州', 'MZ' ], [ '0763', '清远', 'QY' ],
			[ '0762', '河源', 'HY' ], [ '0660', '汕尾', 'SW' ],
			[ '0662', '阳江', 'YJ' ], [ '0663', '揭阳', 'JY' ],
			[ '0668', '茂名', 'MM' ] ]
});

IsmpHB.store.CHARGING_CYCLE = new Ext.data.ArrayStore({
	fields : [ 'code', 'view' ],
	data : [ [ IsmpHB.data.CHARGING_CYCLE.MONTH, '按月' ],
			[ IsmpHB.data.CHARGING_CYCLE.SEASON, '按季度' ],
			[ IsmpHB.data.CHARGING_CYCLE.YEAR, '按年' ],
			[ IsmpHB.data.CHARGING_CYCLE.TIME, '按次' ],
			[ IsmpHB.data.CHARGING_CYCLE.MINUTE, '按分钟' ],
			[ IsmpHB.data.CHARGING_CYCLE.SECOND, '按秒' ],
			[ IsmpHB.data.CHARGING_CYCLE.HALFYEAR, '按半年' ] ]
});
IsmpHB.store.AUDITING_TYPE = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ IsmpHB.data.AUDITING_TYPE.ALL, '全部' ],
			[ IsmpHB.data.AUDITING_TYPE.UNKNOW, '未审核' ],
			[ IsmpHB.data.AUDITING_TYPE.PASS, '审核通过' ],
			[ IsmpHB.data.AUDITING_TYPE.AUTO, '自动审核' ],
			[ IsmpHB.data.AUDITING_TYPE.UNPASS, '审核不通过' ] ]
});

IsmpHB.store.STATUE_FLAG = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ IsmpHB.data.STATUS_FLAG.ALL, '全部' ],
			[ IsmpHB.data.STATUS_FLAG.EFFECT, '有效' ],
			[ IsmpHB.data.STATUS_FLAG.NOEFFECT, '无效' ] ]
});

IsmpHB.store.COST_FREE_STATUE = new Ext.data.ArrayStore({
	fields : [ 'id', 'name' ],
	data : [ [ '-1', '全部' ], [ '1', '已免单' ], [ '0', '未免单' ] ]
});

IsmpHB.store.ismpJsonStore = Ext.extend(Ext.data.JsonStore, {
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				Ext.MessageBox.show({
					title : '提示',
					msg : '加载出错，请稍后重试！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
				Ext.getBody().unmask();
			}
		}
	}
});

// TODO function
IsmpHB.store.FUNCTION_STORE = new IsmpHB.store.ismpJsonStore({
	url : IsmpHB.req.RIGHT_FUNCTION,
	baseParams : {
		method : 'search',
		timestamp : new Date().valueOf()
	},
	storeId : 'function_store',
	root : 'rows',
	fields : [ 'name', 'id', 'status', 'createTime', 'updateTime' ]
});

IsmpHB.store.ROLE_STORE = new Ext.data.JsonStore({
	url : IsmpHB.req.ROLE_QUERY_ALL,
	storeId : 'adminRole',
	root : 'rows',
	fields : [ 'id', 'name' ]
});

IsmpHB.store.PRODUCT_ATTR = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_ATTR_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		ids : ''
	},
	storeId : 'productattr',
	root : 'rows',
	fields : [ 'name', 'fieldLabel', 'xtype', 'allowBlank', 'value' ]
});

IsmpHB.store.PRODUCT = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 10,
		method : 'page'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.PRODUCT,
	storeId : 'product',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'fairValue', 'systemId', 'spCode',
			'spName', 'busiCode', 'serviceType', 'status', 'beginCharg',
			'endPreCharg', 'endAfterCharg', 'vsopStatus' ]
});

IsmpHB.store.PRODUCT_ALL = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'effectProduct'
	},
	storeId : 'productall',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'fairValue', 'selectedFlag', 'systemId' ]
});
IsmpHB.store.PREMIUMQUERY = new Ext.data.JsonStore({
	url : IsmpHB.req.PREMIUM_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'PremiumQuery'
	},
	storeId : 'premiumQuery',
	root : 'rows',
	fields : [ 'ClientId', 'CreateTime', 'EndTime', 'InstanceId', 'PremiumId',
			'PremiumName', 'StartTime' ]
});

IsmpHB.store.GROUP_ITEM = new Ext.data.JsonStore({
	proxy : new Ext.data.MemoryProxy({}),
	data : {
		rows : []
	},
	storeId : 'groupitem',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'selectedFlag' ]
});

IsmpHB.store.PACKAGE_SPEC = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		pid : 0,
		method : 'issue'
	},
	storeId : 'deployPackage',
	root : 'rows',
	// 添加了表的字段chanrgCode,effectMode,withDrawMode,trialType,trialTerm
	fields : [ 'id', 'pid', 'name', 'code', 'systemId', 'spCode', 'pCode',
			'pName', 'status', 'fairValue', 'chargingDesc', 'chargingCycle',
			'effectMode', 'withDrawMode', 'trialType', 'trialTerm' ]
});

IsmpHB.store.PACKAGE_GROUP = new Ext.data.JsonStore({
	proxy : new Ext.data.MemoryProxy({}),
	data : {
		rows : []
	},
	storeId : 'packagegroup',
	root : 'rows',
	fields : [ 'id', 'name', 'maxSelected', 'options' ]
});

IsmpHB.store.S_PACKAGE = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_SIMPLE_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'page'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.S_PACKAGE,
	storeId : 'spackage',
	root : 'rows',
	// 添加了表的字段chanrgCode,effectMode,withDrawMode,trialType,trialTerm,beginCharg,endPreCharg,endAfterCharg
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'chargingCode',
			'chargingDesc', 'chargingCycle', 'effectMode', 'withDrawMode',
			'trialType', 'trialTerm', 'simple', 'useFlag', 'beginCharg',
			'endPreCharg', 'endAfterCharg', 'vsopStatus' ]
});

IsmpHB.store.C_PACKAGE = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_MULTI_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'page'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.C_PACKAGE,
	storeId : 'cpackage',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'optionMax',
			'multi', 'chargingCode', 'chargingDesc', 'chargingCycle',
			'effectMode', 'withDrawMode', 'trialType', 'trialTerm', 'useFlag',
			'beginCharg', 'endPreCharg', 'endAfterCharg' ]
});

IsmpHB.store.PACKAGE = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_COMPLEX_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'page'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.PACKAGE,
	storeId : 'package',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'groups' ]
});

IsmpHB.store.PACKAGE_ALL = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_SIMPLE_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'all'
	},
	storeId : 'packageall',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'billFlag', 'useFlag', 'chargingCycle' ]
});
IsmpHB.store.PACKAGE_EXTRA = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_SIMPLE_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'extra'
	},
	storeId : 'packageExtra',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'billFlag', 'useFlag' ]
});
IsmpHB.store.PACKAGE_EXTRA = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_SIMPLE_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'effectextra'
	},
	storeId : 'effectpackageExtra',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'billFlag', 'useFlag' ]
});

IsmpHB.store.PACKAGE_EFFECT = new Ext.data.JsonStore({
	url : IsmpHB.req.HBPACKAGE_EFFECT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 0,
		method : 'effectPackage'
	},
	storeId : 'effectPackage',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'billFlag', 'useFlag', 'chargingCycle' ]
});

IsmpHB.store.ORDER = new Ext.data.JsonStore({
	url : IsmpHB.req.ORDER_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.ORDER,
	storeId : 'order',
	root : 'rows',
	fields : [ 'id', 'customerName', 'customerTel', 'status', 'serviceType',
			'hbPackageId', 'hbPackageName', 'hbPackageCode', 'source',
			'sourceProductCode', 'createTime', 'updateTime', 'operator',
			'source', 'chargeType', 'payType', 'nodeCode', 'streamingNo',
			'busiStreamingNo' ]
});
// pansenxin 政企工单处理 2012-08-06
IsmpHB.store.ZQORDER = new Ext.data.JsonStore({
	url : IsmpHB.req.ZQORDER_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				if (store.getTotalCount() > 0) {
					if (store.getAt(0).get("returnCRMStatus") == 1) {
						store.filterBy(function(record, id) {
							if (record.get('returnCRM') != "未收到处理") {
								return true;
							}
						});
					} else if (store.getAt(0).get("returnCRMStatus") == 2) {
						store.filterBy(function(record, id) {
							if (record.get('returnCRM') == "未收到处理") {
								return true;
							}
						});
					} else {
						store.clearFilter('returnCRM', true);
					}
				}
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.ORDER,
	storeId : 'zqorder',
	root : 'rows',
	fields : [ 'id', 'returnCRMStatus', 'crm_order_id', 'crm_sourceString',
			'status', 'serviceType', 'service_number', 'productAccessNumber',
			'productId', 'productName', 'source', 'areaCode', 'createTime',
			'updateTime', 'returnCRM', 'returnFromCRM', 'returnCRMString',
			'crmReturnString', 'custId', 'custName' ]
});
IsmpHB.store.ECRMORDERSTATISTICS = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRMORDER_STATISTICS,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ecrmorder_statistics',
	root : 'rows',
	fields : [ 'areaCode', 'productName', 'add', "stop", "override",
			"changezl", "chaiji", "countPerAdd", "countArrive" ]
});
IsmpHB.store.ECRMORDERSTATISTICSCOUNT = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRMORDER_STATISTICS_COUNT,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ecrmorder_statistics_count',
	root : 'rows',
	fields : [ 'areaCode', 'dayTime', 'countChaiji', "countAdd", "countPerAdd",
			"countArrive" ]
});
// 产品信息管理
IsmpHB.store.ECRMPRODUCT = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM__PRODUCT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ecrm_product',
	root : 'rows',
	fields : [ 'id', 'eProductType', 'eProductName', 'bcf', "supProduct",
			"hbProId", "flag", "chargingDesc", "epType", "createTime",
			"updateTime", "eDesc", "areaCode" ]
});
// 上级产品
IsmpHB.store.ECRMSUPPRODUCT = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM__SUPPRODUCT,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	root : 'rows',
	fields : [ 'id', 'name' ]
});
// 上级产品
IsmpHB.store.ECRMSUPPRODUCTBYTYPE = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM__SUPPRODUCT_BYTYPE,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	root : 'rows',
	fields : [ 'id', 'name' ]
});
// 号百产品
IsmpHB.store.ECRMHBPRODUCT = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM__HBPRODUCT,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	root : 'rows',
	fields : [ 'id', 'name' ]
});
// 产品订购关系
IsmpHB.store.ECRMORDERUSER = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM__ORDERUSER,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ecrm_order_user',
	root : 'rows',
	fields : [ 'cityId', 'servNbr', 'accNbr', 'relaAccNbr', 'beginDate',
			'befBmDate', 'payAcc', 'state', 'prodType', 'createDate',
			'updateDate', 'prodId', 'custId', 'custName' ]
});

// 流程action
IsmpHB.store.ECRMORDERACTION = new Ext.data.JsonStore({
	url : IsmpHB.req.ECRM_ORDER_ACTION,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ecrm_order_action',
	root : 'rows',
	fields : [ 'id', 'name', 'timecost', 'retryTimes', 'retryInterval',
			'status', 'memo', 'exceptionCase', 'createTime', 'updateTime',
			'flushTime' ]
});

IsmpHB.store.ORDERUSER = new Ext.data.JsonStore({
	// url : IsmpHB.req.ORDER_USER_QUERY,
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.ORDER_USER_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'search'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.ORDERUSER,
	storeId : 'orderuser',
	root : 'rows',
	fields : [ 'id', 'token', 'name', 'tel', 'nodeCode', 'productSpecId',
			'productSpecCode', 'productSpecName', 'hbPackageId',
			'hbPackageCode', 'hbPackageDesc', 'startTime', 'endTime',
			'crmPackageDesc', 'usageFlag', 'status', 'createTime',
			'updateTime', 'operator', 'source', 'chargeType' ]
});

IsmpHB.store.COMBO_LIST = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.COMBO_LIST_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.ORDERUSER,
	storeId : 'comboList',
	root : 'rows',
	fields : [ 'id', 'token', 'name', 'tel', 'nodeCode', 'productSpecId',
			'productSpecCode', 'productSpecName', 'hbPackageId',
			'hbPackageCode', 'hbPackageDesc', 'startTime', 'endTime',
			'crmPackageDesc', 'usageFlag', 'status', 'createTime',
			'updateTime', 'operator', 'source', 'chargeType' ]
});

IsmpHB.store.COMBO_EXTRA_LIST = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.COMBO_LIST_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	// proxy: new Ext.data.MemoryProxy({}),
	// data: IsmpHB.data.ORDERUSER,
	storeId : 'comboExtraList',
	root : 'rows',
	fields : [ 'id', 'token', 'name', 'tel', 'nodeCode', 'productSpecId',
			'productSpecCode', 'productSpecName', 'hbPackageId',
			'hbPackageCode', 'hbPackageDesc', 'startTime', 'endTime',
			'crmPackageDesc', 'usageFlag', 'status', 'createTime',
			'updateTime', 'operator', 'source', 'chargeType' ]
});

IsmpHB.store.ORDER_USER_EXTRA = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.ORDER_USER_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		method : 'search'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'orderUserExtra',
	root : 'rows',
	fields : [ 'id', 'token', 'name', 'tel', 'nodeCode', 'productSpecId',
			'productSpecCode', 'productSpecName', 'hbPackageId',
			'hbPackageCode', 'hbPackageDesc', 'startTime', 'endTime',
			'crmPackageDesc', 'usageFlag', 'status', 'createTime',
			'updateTime', 'operator', 'source', 'chargeType' ]
});

IsmpHB.store.ORDER_USER_SINGLE = new Ext.data.JsonStore({
	url : IsmpHB.req.ORDER_USER_SGL_QUERY,
	baseParams : {
		timestamp : new Date().valueOf()
	},
	root : 'rows',
	storeId : 'orderUserSingle',
	fields : [ 'memberId', 'tel', 'name', 'level', 'status', 'usageFlag',
			'startTime', 'endTime', 'hbPackageId', 'hbPackageCode',
			'hbPackageDesc', 'product_list', 'chargeType' ]
});

IsmpHB.store.SUITE = new Ext.data.JsonStore({
	url : IsmpHB.req.SUITE_QUERY,
	// proxy : new Ext.data.MemoryProxy({}),
	// data : IsmpHB.data.SUITE,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'page'
	},
	storeId : 'suite',
	root : 'rows',
	fields : [ 'id', 'name', 'ppkg', 'timeBgn', 'timeEnd' ]
});

// guoguangfu 2011/7/5
IsmpHB.store.ADMIN = new Ext.data.JsonStore({
	url : IsmpHB.req.ADMIN,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'all'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'admin',
	root : 'rows',
	fields : [ 'account', 'name', 'desc', 'nodeCode','tel','email','dept', 'type', 'roleId',
			'roleName','roles' ]

});

// zzx 2011/8/8
IsmpHB.store.SPTEL = new Ext.data.JsonStore({
	url : IsmpHB.req.SERVICEPROVINFO,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'pageList',
		start : 0,
		limit : 15
	},
	storeId : 'sptel',
	root : 'rows',
	fields : [ 'spId', 'spCode', 'spName', 'address', 'vsopStatus',
			'statusFlag' ]

});

IsmpHB.store.SPTEL_CODE_NAME = new Ext.data.JsonStore({
	url : IsmpHB.req.SERVICEPROVINFO,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'queryAllCodeAndName'
	},
	storeId : 'spCodeAndName',
	root : 'rows',
	fields : [ 'spCode', 'spName' ]

});

IsmpHB.store.PRODUCT_AUDITING = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_AUDITING,
	baseParams : {
		timestamp : new Date().valueOf(),
		// method : 'all',
		start : 0,
		limit : 0
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'productAuditing',
	root : 'rows',
	fields : [ 'id', 'name', 'spName', 'code', 'status', 'operateType',
			'system', 'auditingFlag', 'effectMode', 'withdrawMode',
			'trialType', 'trialTerm', 'chargingCycle', 'operator',
			'updateTime', 'statusFlag', 'price' ]
});

IsmpHB.store.CRMInfoQuery = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.CRM_INFO_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf()
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'CRMInfoQuery',
	root : 'rows',
	fields : [ 'birthday', 'sex', 'terminal_id', 'serv_group_type',
			'area_code', 'tel', 'state', 'Result_Code', 'postcode',
			'social_id', 'serv_nbr', 'address', 'subs_id', 'social_id_type',
			'name', 'payment_id', 'Result_Detail', 'nodeCode', 'serv_level' ]
});
IsmpHB.store.SYSTEM_CODE = new Ext.data.ArrayStore({
	fields : [ 'code', 'view' ],
	data : [ [ IsmpHB.data.SYSTEM_CODE.BASE_HB, '基础号百' ],
			[ IsmpHB.data.SYSTEM_CODE.SZ_GAOXIN, '深圳高新' ],
			[ IsmpHB.data.SYSTEM_CODE.HG_XINYUAN, '华工信元' ],
			[ IsmpHB.data.SYSTEM_CODE.SX, '声讯平台' ],
			[ IsmpHB.data.SYSTEM_CODE.GXCZT, '广信车主通' ],
			[ IsmpHB.data.SYSTEM_CODE.TT_SHZL, '天天生活助理平台' ],
			[ IsmpHB.data.SYSTEM_CODE.YJKPT, '翼健康平台' ],
			[ IsmpHB.data.SYSTEM_CODE.WEB_ACCEPT, '网络受理平台' ] ]
});

IsmpHB.store.BEGIN_RULE = new Ext.data.ArrayStore({
	fields : [ 'mode', 'name' ],
	data : [ [ 1, '按天计费' ], [ 2, '收取全月费用' ], [ 3, '收取全年费用' ],
			[ 4, '1-15日收全月费用，16日后收半月费用' ], [ 5, '1-22日收全月费用，23日后免费' ],
			[ 6, '收取半年费用' ], [ 7, '首月免费' ], [ 8, '收取一个季度费用' ],
			[ 9, '收取全月费用（C网按天收取）' ], [ 99, '其他' ] ]
});

IsmpHB.store.END_PER_RULE = new Ext.data.ArrayStore(
		{
			fields : [ 'mode', 'name' ],
			data : [ [ 1, '当月生效' ], [ 2, '次月生效' ], [ 3, '到期自动失效' ],
					[ 4, '1-9日按天收费，10日后次月生效' ], [ 5, '1-9日免费，10日后次月生效' ],
					[ 99, '其他' ] ]
		});

IsmpHB.store.END_AFTER_RULE = new Ext.data.ArrayStore({
	fields : [ 'mode', 'name' ],
	data : [ [ 1, '当月生效' ], [ 2, '次月生效' ], [ 3, '到期自动失效' ],
			[ 4, '1-15日免费，16日后半价' ], [ 5, '按天收费' ], [ 99, '其他' ] ]
});

// chenziping 2012/4/12
IsmpHB.store.INFORMATION = new Ext.data.JsonStore({
	url : IsmpHB.req.INFORMATION,
	baseParams : {
		loginName : '',
		start : 0,
		limit : 20,
		timestamp : new Date().valueOf(),
		method : 'all',
		login : '',
		start_date : '',
		end_date : ''
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'information',
	root : 'rows',
	totalProperty : 'totalCount',
	fields : [ 'id', 'Cmd', 'Req_IP', 'Req_Host', 'Server_Name',
			'Operate_Account', 'Operate_Name', 'Req_Content', 'Operate_Time' ]

});

IsmpHB.store.INFORMATION_COMBO = new Ext.data.JsonStore({
	url : IsmpHB.req.INFORMATION_Combo,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'all'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'information_combo',
	root : 'root',
	fields : [ 'name', 'id' ]
});

// chen ziping 2012/5/8
IsmpHB.store.BLACKLIST = new Ext.data.JsonStore({
	url : IsmpHB.req.BLACK_LIST_QUERY,
	baseParams : {
		start : 0,
		limit : 20,
		timestamp : new Date().valueOf(),
		method : 'queryAll',
		tel : ''
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'blacklist',
	root : 'rows',
	totalProperty : 'totalCount',
	fields : [ 'id', 'tel', 'area_no', 'range_type', 'product_id',
			'create_time', 'update_time', 'source', 'memo', 'node_code',
			'admin_name' ]

});

IsmpHB.store.CTSTATISTICS = new Ext.data.JsonStore({
	url : IsmpHB.req.CTSTATISTICS_QUERY,
	baseParams : {
		start : 0,
		limit : 20,
		timestamp : new Date().valueOf(),
		method : 'queryAll'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ctstatistics',
	root : 'rows',
	totalProperty : 'totalCount',
	fields : [ 'batch_no', 'node_code', 'product_id', 'product_name', 'ta',
			'tta', 'sua', 'onua', 'nda', 'bla', 'rla', 'gma', 'gma', 'fma',
			'lma', 'prua', 'pstnua', 'jfa', 'tya', 'feeTT', 'feePOU',
			'feePstnu', 'feePRU', 'create_time', 'update_time' ]

});

IsmpHB.store.CTSTATISTICS_COMBO = new Ext.data.JsonStore({
	url : IsmpHB.req.CTSTATISTICS_BATCH_NO_Query,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'queryBatchNo'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ctStatisticsBatchNo_combo',
	root : 'rows',
	fields : [ 'batch_no', 'name' ]
});

IsmpHB.store.CTSTATISTICS_PRODUCT_NAME_COMBO = new Ext.data.JsonStore({
	url : IsmpHB.req.CTSTATISTICS_ProductName_Query,
	baseParams : {
		timestamp : new Date().valueOf(),
		method : 'queryProductNameGroup'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'ctStatisticsProductName_combo',
	root : 'rows',
	fields : [ 'product_name', 'name' ]
});

IsmpHB.store.TASK = new Ext.data.JsonStore({
	url : IsmpHB.req.TASK_Query,
	baseParams : {
		start : 0,
		limit : 15,
		status : -1,
		result_code : '',
		start_time : null,
		operator_name : null
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'taskId',
	root : 'rows',
	fields : [ 'id', 'task_no', 'task_type', 'task_plan', 'status', 'retry_no',
			'result_code', 'level', 'opr_type', 'result_memo', 'create_time',
			'start_time', 'end_time', 'update_time', 'operator_name',
			'operator_account', 'ta', 'tsa', 'tea', 'memo' ]
});

IsmpHB.store.TASKLIST = new Ext.data.JsonStore({
	url : IsmpHB.req.TASK_LIST_Query,
	baseParams : {
		timestamp : new Date().valueOf(),
		// startTime : '',
		// endTime : '',
		// method : 'findStartTaskList',
		start : 0,
		size : 15
	},
	// autoLoad : true,
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'task_list_Id',
	root : 'rows',
	fields : [ 'id', 'task_id', 'task_no', 'status', 'retry_no', 'result_code',
			'result_memo', 'create_time', 'update_time', 'operator_name',
			'operator_account', 'tel', 'name', 'package_id', 'package_name',
			'package_code', 'product_code', 'start_time', 'end_time',
			'pay_type', 'try_flag', 'level', 'attr', 'memo' ]
});

// 中台查询工单store zengjw 2012-07-26
IsmpHB.store.MIDDLEORDER = new Ext.data.JsonStore({
	url : IsmpHB.req.UNITE_ORDER_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		tel : 'null',
		hb_package_id : '',
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'uniteOrder',
	root : 'rows',
	fields : [ 'id', 'customerName', 'customerTel', 'status', 'serviceType',
			'hbPackageId', 'hbPackageName', 'hbPackageCode', 'source',
			'sourceProductCode', 'createTime', 'updateTime', 'operator',
			'source', 'chargeType', 'payType', 'nodeCode', 'streamingNo',
			'busiStreamingNo' ]
});
// 中台查询订购store zengjw 2012-07-26
IsmpHB.store.MIDDLEPRODUCT = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.UNITE_ORDER_USER_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		method : 'page',
		productSpecId : -1,
		hbPackageId : -1,
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		startTime : '',
		endTime : '',
		isLike : 0,
		usage_flag : -1,
		status : -1
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'uniteOrderUser',
	root : 'rows',
	fields : [ 'id'/* , 'token' */, 'name', 'tel', 'nodeCode',
			'productSpecId', 'productSpecCode', 'productSpecName',
			'hbPackageId', 'hbPackageCode', 'hbPackageDesc', 'startTime',
			'endTime', 'crmPackageDesc', 'usageFlag', 'status', 'createTime',
			'updateTime', 'operator', 'source', 'chargeType' ]
});
// 中台查询客户store zengjw 2012-07-26
IsmpHB.store.MIDDLECRMQUERY = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		url : IsmpHB.req.UNITE_ORDER_CRM_INFO_QUERY,
		timeout : jsonStore_timeout
	}),
	baseParams : {
		timestamp : new Date().valueOf()
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'uniteCrmInfo',
	root : 'rows',
	fields : [ 'birthday', 'sex', 'terminal_id', 'serv_group_type',
			'area_code', 'tel', 'state', 'Result_Code', 'postcode',
			'social_id', 'serv_nbr', 'address', 'subs_id', 'social_id_type',
			'name', 'payment_id', 'Result_Detail', 'nodeCode', 'serv_level' ]
});
// 新增订购关系中搜索产品包 zengjw 2012-08-02
IsmpHB.store.ADD_PACKAGE_EFFECT = new Ext.data.JsonStore({
	url : IsmpHB.req.ADD_HBPACKAGE_EFFECT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 10,
		method : 'page'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'addEffectPackage',
	root : 'rows',
	// 添加了表的字段chanrgCode,effectMode,withDrawMode,trialType,trialTerm,beginCharg,endPreCharg,endAfterCharg
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'chargingCode',
			'chargingDesc', 'chargingCycle', 'effectMode', 'withDrawMode',
			'trialType', 'trialTerm', 'simple', 'useFlag', 'beginCharg',
			'endPreCharg', 'endAfterCharg', 'vsopStatus' ]
});
// 新增订购关系中搜索产品包（不带分页） zengjw 2012-08-28
IsmpHB.store.ADD_PACKAGE_EFFECT_NOPAGE = new Ext.data.JsonStore({
	url : IsmpHB.req.ADD_HBPACKAGE_EFFECT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 9999,// 以后超过10000种产品包后要修改
		method : 'search'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'addEffectPackageWithoutPage',
	root : 'rows',
	// 添加了表的字段chanrgCode,effectMode,withDrawMode,trialType,trialTerm,beginCharg,endPreCharg,endAfterCharg
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'chargingCode',
			'chargingDesc', 'chargingCycle', 'effectMode', 'withDrawMode',
			'trialType', 'trialTerm', 'simple', 'useFlag', 'beginCharg',
			'endPreCharg', 'endAfterCharg', 'vsopStatus' ]
});
// 新增节目类订购关系中搜索产品包（不带分页） zengjw 2012-08-29
IsmpHB.store.ADD_PACKAGE_EFFECT_EXTRA = new Ext.data.JsonStore({
	url : IsmpHB.req.ADD_HBPACKAGE_EFFECT_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 9999,// 以后超过10000种产品包后要修改
		method : 'search'
	},
	listeners : {
		'beforeload' : {
			fn : function(store, options) {
				IsmpHB.customFunctions.mask_loading();
			},
			scope : this,
			delay : 10
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'load' : {
			fn : function(store, records, options) {
				Ext.getBody().unmask();
			},
			scope : this,
			delay : 10
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'addEffectExtraPackage',
	root : 'rows',
	// 添加了表的字段chanrgCode,effectMode,withDrawMode,trialType,trialTerm,beginCharg,endPreCharg,endAfterCharg
	fields : [ 'id', 'name', 'code', 'pairValue', 'billFlag', 'chargingCode',
			'chargingDesc', 'chargingCycle', 'effectMode', 'withDrawMode',
			'trialType', 'trialTerm', 'simple', 'useFlag', 'beginCharg',
			'endPreCharg', 'endAfterCharg', 'vsopStatus' ]
});
// 新增订购关系中产品 zengjw 2012-08-03
IsmpHB.store.PRODUCT_SEARCH = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_SEARCH_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		pid : 0,
		method : 'package'
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'searchPackage',
	root : 'rows',
	fields : [ 'id', 'name', 'code', 'status', 'spCode', 'spName',
			'selectedFlag', 'attrs' ]
});
// 新增订购关系中产品额外信息 zengjw 2012-08-03
IsmpHB.store.PRODUCT_SEARCH_ATTR = new Ext.data.JsonStore({
	url : IsmpHB.req.PRODUCT_SEARCH_ATTR_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		ids : ''
	},
	storeId : 'productSearchattr',
	root : 'rows',
	fields : [ 'name', 'fieldLabel', 'xtype', 'allowBlank', 'value' ]
});

IsmpHB.store.BILL_OFFER = new Ext.data.JsonStore({
	url : IsmpHB.req.BILL_OFFER_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'billOffer',
	root : 'rows',
	fields : [ 'streamNo', 'timestamp', 'receiveUserNo', 'feeUserNo',
			'faPayType', 'spId', 'productOfferCode', 'contentId',
			'servicecapabiltyId', 'beginTime', 'endTime', 'businessTimes',
			'duration', 'accessPointName', 'infoFee', 'channelFee', 'fee',
			'opStatus', 'nodeCode', 'areaCode', 'netCode', 'payType', 'payDay',
			'accDuration' ]
});

IsmpHB.store.OFFER_FERR = new Ext.data.JsonStore({
	url : IsmpHB.req.BILL_COST_FREE_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'offerFree',
	root : 'rows',
	fields : [ 'id', 'tel', 'productSpecCode', 'nodeCode', 'accDuration',
			'sType', 'busiCode', 'status', 'billCode', 'taskNo' ]
});


/**
 * @author farago
 * for monitor, by tanjf, 20130220
 */
IsmpHB.store.MONITOR_CN_QUERY = new Ext.data.JsonStore({
	url : IsmpHB.req.MONITOR_BILL_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'monitor_cn',
	//	totalProperty : 'total',
	root : 'rows',
	fields : [ 'called', 'original_count_tel', 'generated_count_tel',
			'except_count_tel', 'diff_tel', 'original_count_file',
			'generated_count_file', 'except_count_file', 'diff_file',
			'original_sum_fee', 'generated_sum_fee', 'except_sum_fee',
			'diff_fee' , 'term_start', 'term_end' ]
});

IsmpHB.store.MONITOR_GD160_QUERY = new Ext.data.JsonStore({
	url : IsmpHB.req.MONITOR_BILL_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'monitor_gd160',
	//	totalProperty : 'total',
	root : 'rows',
	fields : [ 'called', 'original_count_tel', 'generated_count_tel',
			'except_count_tel', 'diff_tel', 'original_count_file',
			'generated_count_file', 'except_count_file', 'diff_file',
			'original_sum_fee', 'generated_sum_fee', 'except_sum_fee',
			'diff_fee' , 'term_start', 'term_end' ]
});

// for GD168 only
IsmpHB.store.MONITOR_GD168_QUERY = new Ext.data.JsonStore({
	url : IsmpHB.req.MONITOR_GD168_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'monitor_gd168',
	//	totalProperty : 'total',
	root : 'rows',
	fields : [ 'called', 'original_count_tel', 'generated_count_tel',
			'except_count_tel', 'diff_tel', 'original_count_file',
			'generated_count_file', 'except_count_file', 'diff_file',
			'original_sum_fee', 'generated_sum_fee', 'except_sum_fee',
			'diff_fee' , 'term_start', 'term_end' ]
});

// for term compare only
IsmpHB.store.MONITOR_TERM_QUERY = new Ext.data.JsonStore({
	url : IsmpHB.req.MONITOR_TERM_QUERY,
	baseParams : {
		timestamp : new Date().valueOf(),
		start : 0,
		size : 20
	},
	listeners : {
		'load' : {
			fn : IsmpHB.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : IsmpHB.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				IsmpHB.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'monitor_term',
	//	totalProperty : 'total',
	root : 'rows',
	fields : [ 'record_time', 'node_code', 'pay_type', 'product_offer_id',
			'sp_id', 'prev_sum_fee', 'next_sum_fee', 'diff', 'prev_term_start',
			'prev_term_end', 'next_term_start', 'next_term_end', 'period',
			'status', 'memo' ]
});
/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB');

Ext.BLANK_IMAGE_URL = '../shared/ext.3.3.1/resources/images/default/s.gif';

IsmpHB.version = {
	number : '1.3.3',
	proName : 'ismp'
}

IsmpHB.URL = document.URL.slice(0, 7) != 'http://' ? 'http://localhost:8080/ismp?cmd='
		: document.URL.split('admin')[0] + 'ismp?cmd=';

IsmpHB.req = {

	// pansenxin 政企模块处理
	BUSINESS : IsmpHB.URL + 'business',
	ZQORDER_QUERY : IsmpHB.URL + 'zqOrderQuery',
	ZQWORKFLOW_QUERY : IsmpHB.URL + 'zqWorkflowQuery',
	ECRMORDER_REDO : IsmpHB.URL + 'ecrmOrderRedo',
	ECRMORDER_CHANGESTATUS : IsmpHB.URL + 'ecrmOrderChangeStatus',
	ECRMORDER_STATISTICS : IsmpHB.URL + 'ecrmOrderStatistics',
	ECRM_ORDERWORKFLOW_PRODUCT : IsmpHB.URL + 'ecrmOrderWorkflowProduct',
	SENDTOBUSINESS : IsmpHB.URL + 'sendToBusiness',
	REPLYCRM : IsmpHB.URL + 'replyCrm',
	ECRMORDER_STATISTICS_COUNT :IsmpHB.URL+'ecrmOrderStatisticsCount',
	ECRM__PRODUCT_QUERY : IsmpHB.URL + 'ecrmProductQuery',
	ECRM__SUPPRODUCT : IsmpHB.URL + 'ecrmSupProduct',
	ECRM__SUPPRODUCT_BYTYPE : IsmpHB.URL + 'ecrmSupProductByType',
	ECRM__HBPRODUCT : IsmpHB.URL + 'ecrmHbProduct',
	ECRMPRODUCT_MGR : IsmpHB.URL + 'ecrmProductMgr',
	ECRM__ORDERUSER : IsmpHB.URL + 'ecrmOrderUser',
	ECRM_REPORT : IsmpHB.URL + 'ecrmOrderReport',
	ECRM_ORDERUSER_PRODUCT : IsmpHB.URL + 'ecrmOrderUserProduct',
	ECRM_ORDER_ACTION : IsmpHB.URL + 'ecrmOrderAction',

	// guogf登录请求
	ROLE_QUERY_ALL : IsmpHB.URL + 'role',
	ADMIN_LOGIN : IsmpHB.URL + 'login',
	ADMIN : IsmpHB.URL + 'queryAdmin',
	ADMIN_MGR : IsmpHB.URL + 'AdminMgr',
	CHANG_PWD : IsmpHB.URL + 'changPwd',
	PREMIUM_QUERY : IsmpHB.URL + 'PremiumQuery',
	SERVICEPROVINFO : IsmpHB.URL + 'serviceProvInfoQuery',
	SERVICEPROVINFO_MGR : IsmpHB.URL + 'serviceProvInfoMgr',
	
	// TODO right
	RIGHT_FUNCTION:IsmpHB.URL+'functionProcessor',

	// product
	PRODUCT_ATTR_QUERY : IsmpHB.URL + 'productSpecAttrQuery',
	PRODUCT_QUERY : IsmpHB.URL + 'productSpecQuery',
	PRODUCT_MGR : IsmpHB.URL + 'productMgr',

	// order
	ORDER_QUERY : IsmpHB.URL + 'orderQuery',
	ORDER_USER_ADD : IsmpHB.URL + 'orderUserAdd',
	ORDER_USER_UPDATE : IsmpHB.URL + 'orderUserUpdate',
	ORDER_USER_REMOVE : IsmpHB.URL + 'orderUserRemove',
	ORDER_USER_QUERY : IsmpHB.URL + 'orderUserQuery',
	ORDER_USER_SGL_QUERY : IsmpHB.URL + 'orderUserSingleQuery',
	ORDER_REDO : IsmpHB.URL + 'orderRedo',
	ORDER_CHANGESTATUS : IsmpHB.URL + 'orderChangeStatus',
	ORDER_USER_FILE_UPLOAD : IsmpHB.URL + 'orderUserFileUpload',
	ORDER_USER_FILE_UPLOAD_REMOVE : IsmpHB.URL + 'orderUserFileUploadRemove',
	COMBO_LIST_QUERY : IsmpHB.URL + 'queryComboList',
	COMBO_CANCEL : IsmpHB.URL + 'cancelCombo',

	// work flow
	WORKFLOW_QUERY : IsmpHB.URL + 'workflowQuery',
	HBPACKAGE_EFFECT_QUERY : IsmpHB.URL + 'effectPackage',

	// spkg
	HBPACKAGE_SIMPLE_ADD : IsmpHB.URL + 'hbPackageSimpleAdd',
	HBPACKAGE_SIMPLE_UPDATE : IsmpHB.URL + 'hbPackageSimpleUpdate',
	HBPACKAGE_SIMPLE_REMOVE : IsmpHB.URL + 'hbPackageSimpleRemove',
	HBPACKAGE_SIMPLE_QUERY : IsmpHB.URL + 'hbPackageSimpleQuery',

	// cpkg
	HBPACKAGE_MULTI_ADD : IsmpHB.URL + 'hbPackageMultiAdd',
	HBPACKAGE_MULTI_UPDATE : IsmpHB.URL + 'hbPackageMultiUpdate',
	HBPACKAGE_MULTI_REMOVE : IsmpHB.URL + 'hbPackageMultiRemove',
	HBPACKAGE_MULTI_QUERY : IsmpHB.URL + 'hbPackageMultiQuery',

	// ppkg
	HBPACKAGE_COMPLEX_ADD : IsmpHB.URL + 'hbPackageComplexAdd',
	HBPACKAGE_COMPLEX_UPDATE : IsmpHB.URL + 'hbPackageComplexUpdate',
	HBPACKAGE_COMPLEX_REMOVE : IsmpHB.URL + 'hbPackageComplexRemove',
	HBPACKAGE_COMPLEX_QUERY : IsmpHB.URL + 'hbPackageComplexQuery',
	// suit
	SUITE_QUERY : IsmpHB.URL + 'suitQuery',

	PRODUCT_AUDITING : IsmpHB.URL + 'productAudiging',
	PRODUCT_AUDITING_REV : IsmpHB.URL + 'productAudRemove',
	PRODUCT_AUDITING_PASS : IsmpHB.URL + 'proAudPass',
	PRODUCT_AUDITING_UNPASS : IsmpHB.URL + 'proAudUnpass',
	PRODUCT_AUDITING_REARCH : IsmpHB.URL + 'searchByCode',

	// member
	CRM_INFO_QUERY : IsmpHB.URL + 'crmInfoQuery',
	//esb basisinfo query
	ESB_BASIS_INFO_QUERY : IsmpHB.URL + 'esbBasisInfoQuery',

	// information
	INFORMATION : IsmpHB.URL + 'informationQuery',
	INFORMATION_Combo : IsmpHB.URL + 'informationComboQuery',

	// blacklist
	BLACK_LIST_QUERY : IsmpHB.URL + 'blackListQuery',
	BLACK_DEL : IsmpHB.URL + 'blackListDel',
	BLACK_ADD : IsmpHB.URL + 'blackListAdd',

	// ctStatistics
	CTSTATISTICS_QUERY : IsmpHB.URL + 'ctStatisticsQuery',
	CTSTATISTICS_BATCH_NO_Query : IsmpHB.URL + 'ctStatisticsBatchNoQuery',
	CTSTATISTICS_ProductName_Query : IsmpHB.URL + 'ctStatisticsProductNameQuery',
	BILL_OFFER_QUERY : IsmpHB.URL + 'billOfferQuery',
	BILL_COST_FREE_QUERY : IsmpHB.URL + 'billCostFreeQuery',
	BILL_COST_FREE_ADD : IsmpHB.URL + 'addBillCostFree',
	
	// Task
	TASK_Query : IsmpHB.URL + "taskQuery",
	TASK_ADD : IsmpHB.URL + "addTask",
	TASK_DEL : IsmpHB.URL + "delTask",

	TASK_LIST_Query : IsmpHB.URL + "taskListQuery",

	TASK_LIST_OUTPUT : IsmpHB.URL + "taskListOutput",

	// 中台查询 zengjw 2012-07-26s
	UNITE_ORDER_CRM_INFO_QUERY : IsmpHB.URL + 'uniteCrmInfoQuery',
	UNITE_ORDER_USER_QUERY : IsmpHB.URL + 'uniteOrderUserQuery',
	UNITE_ORDER_QUERY : IsmpHB.URL + 'uniteOrderQuery',
	PRODUCT_SEARCH_QUERY : IsmpHB.URL + 'productSearchQuery',
	PRODUCT_SEARCH_ATTR_QUERY : IsmpHB.URL + 'productSearchAttrQuery',
	ADD_ORDER_USER : IsmpHB.URL + 'addOrderUser',
	ADD_HBPACKAGE_EFFECT_QUERY : IsmpHB.URL + 'hbPackageSimpleQuery',
	
	// monitor
	MONITOR_BILL_QUERY : IsmpHB.URL + 'monitorBillQuery',
	MONITOR_GD168_QUERY : IsmpHB.URL + 'monitorGD168Query',
	MONITOR_TERM_QUERY : IsmpHB.URL + 'monitorTermQuery'
};
IsmpHB.Ajax = {

	send : function(req, syn) {
		if (syn) {
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			var p = req.params;
			var ua = [];
			for (i in p) {
				ua.push(i + '=' + p[i]);
			}
			conn.open("GET", req.url + '?' + ua.join('&'), false);
			conn.send(null);
			try {
				var r = Ext.decode(conn.responseText);
				return r.success || false;
			} catch (e) {
				return false;
			}
		} else {
			Ext.Ajax.timeout = 30000;// default
			Ext.getBody().mask('正在处理请求,请稍候...', 'x-mask-loading');
			Ext.Ajax
					.request( {
						url : req.url,
						params : req.params,
						method : 'POST',
						scope : req.scope,
						disableCaching : false,
						callback : function(o, s, r) {
							Ext.getBody().unmask();
							if (s != false) {
								try {
									var o = Ext.decode(r.responseText);
									if (o.exId) {
										if (o.exId == '-111') {
											Ext.MessageBox
													.confirm(
															'提示',
															o.exDesc || '操作错误！',
															function(va) {
																if (va == 'yes') {
																	IsmpHB.common
																			.clearSession("loginInfo");
																	window.location
																			.reload(true);
																}
															}, this);
											return;
										} else {
											Ext.MessageBox.alert('提示',
													o.exDesc, null, this);
											return;
										}
									}

									if (null != o.success
											|| 'true' == o.success
											|| true == o.success) {
										req.callback.call(req.scope, o);
									} else {
										Ext.Msg.show( {
											title : '系统异常',
											msg : o.message || '服务器无响应',
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								} catch (e) {
									Ext.Msg.show( {
										title : '数据格式化错误',
										msg : e.message,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							} else {
								var errormsg = r.responseText || '请求失败！这可能是您没有鉴权该资源！';
								Ext.Msg.show( {
									title : '请求失败',
									msg : errormsg,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						}
					});
		}
	}
};

/**
 * @author Farago, 17 Aug, 2011
 */
Ext.override(Ext.form.Action.Submit, {
	processResponse : function(response) {
		this.response = response;
		var data = response.responseText;
		// response.responseText = data.replace(/<div(.)*<\/div>/gmi,
		// '');
		this.response = Ext.util.JSON.decode(response.responseText);
		if (!response.responseText) {
			return true;
		}
		this.result = this.handleResponse(response);
		return this.result;
	}
});
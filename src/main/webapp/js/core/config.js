/**
 * @author johnny0086
 */
Ext.namespace('LBSReader');

Ext.BLANK_IMAGE_URL = '../resources/ext.3.3.1/resources/images/default/s.gif';

LBSReader.version = {
	number : '1.3.3',
	proName : 'ismp'
}

LBSReader.URL = document.URL.slice(0, 7) != 'http://'
		? 'http://localhost:8080/ismp?cmd='
		: document.URL.split('admin')[0] + 'ismp?cmd=';

LBSReader.req = {

	// pansenxin 政企模块处理
	BUSINESS : LBSReader.URL + 'business',
	ZQORDER_QUERY : LBSReader.URL + 'zqOrderQuery',
	ZQWORKFLOW_QUERY : LBSReader.URL + 'zqWorkflowQuery',
	ECRMORDER_REDO : LBSReader.URL + 'ecrmOrderRedo',
	ECRMORDER_CHANGESTATUS : LBSReader.URL + 'ecrmOrderChangeStatus',
	ECRMORDER_STATISTICS : LBSReader.URL + 'ecrmOrderStatistics',
	ECRM_ORDERWORKFLOW_PRODUCT : LBSReader.URL + 'ecrmOrderWorkflowProduct',
	SENDTOBUSINESS : LBSReader.URL + 'sendToBusiness',
	REPLYCRM : LBSReader.URL + 'replyCrm',
	ECRMORDER_STATISTICS_COUNT : LBSReader.URL + 'ecrmOrderStatisticsCount',
	ECRM__PRODUCT_QUERY : LBSReader.URL + 'ecrmProductQuery',
	ECRM__SUPPRODUCT : LBSReader.URL + 'ecrmSupProduct',
	ECRM__SUPPRODUCT_BYTYPE : LBSReader.URL + 'ecrmSupProductByType',
	ECRM__HBPRODUCT : LBSReader.URL + 'ecrmHbProduct',
	ECRMPRODUCT_MGR : LBSReader.URL + 'ecrmProductMgr',
	ECRM__ORDERUSER : LBSReader.URL + 'ecrmOrderUser',
	ECRM_REPORT : LBSReader.URL + 'ecrmOrderReport',
	ECRM_ORDERUSER_PRODUCT : LBSReader.URL + 'ecrmOrderUserProduct',
	ECRM_ORDER_ACTION : LBSReader.URL + 'ecrmOrderAction',

	// guogf登录请求
	ROLE_QUERY_ALL : LBSReader.URL + 'role',
	ADMIN_LOGIN : LBSReader.URL + 'login',
	ADMIN : LBSReader.URL + 'queryAdmin',
	ADMIN_MGR : LBSReader.URL + 'AdminMgr',
	CHANG_PWD : LBSReader.URL + 'changPwd',
	PREMIUM_QUERY : LBSReader.URL + 'PremiumQuery',
	SERVICEPROVINFO : LBSReader.URL + 'serviceProvInfoQuery',
	SERVICEPROVINFO_MGR : LBSReader.URL + 'serviceProvInfoMgr',

	// TODO right
	RIGHT_FUNCTION : LBSReader.URL + 'functionProcessor',

	// product
	PRODUCT_ATTR_QUERY : LBSReader.URL + 'productSpecAttrQuery',
	PRODUCT_QUERY : LBSReader.URL + 'productSpecQuery',
	PRODUCT_MGR : LBSReader.URL + 'productMgr',

	// order
	ORDER_QUERY : LBSReader.URL + 'orderQuery',
	ORDER_USER_ADD : LBSReader.URL + 'orderUserAdd',
	ORDER_USER_UPDATE : LBSReader.URL + 'orderUserUpdate',
	ORDER_USER_REMOVE : LBSReader.URL + 'orderUserRemove',
	ORDER_USER_QUERY : LBSReader.URL + 'orderUserQuery',
	ORDER_USER_SGL_QUERY : LBSReader.URL + 'orderUserSingleQuery',
	ORDER_REDO : LBSReader.URL + 'orderRedo',
	ORDER_CHANGESTATUS : LBSReader.URL + 'orderChangeStatus',
	ORDER_USER_FILE_UPLOAD : LBSReader.URL + 'orderUserFileUpload',
	ORDER_USER_FILE_UPLOAD_REMOVE : LBSReader.URL + 'orderUserFileUploadRemove',
	COMBO_LIST_QUERY : LBSReader.URL + 'queryComboList',
	COMBO_CANCEL : LBSReader.URL + 'cancelCombo',

	// work flow
	WORKFLOW_QUERY : LBSReader.URL + 'workflowQuery',
	HBPACKAGE_EFFECT_QUERY : LBSReader.URL + 'effectPackage',

	// spkg
	HBPACKAGE_SIMPLE_ADD : LBSReader.URL + 'hbPackageSimpleAdd',
	HBPACKAGE_SIMPLE_UPDATE : LBSReader.URL + 'hbPackageSimpleUpdate',
	HBPACKAGE_SIMPLE_REMOVE : LBSReader.URL + 'hbPackageSimpleRemove',
	HBPACKAGE_SIMPLE_QUERY : LBSReader.URL + 'hbPackageSimpleQuery',

	// cpkg
	HBPACKAGE_MULTI_ADD : LBSReader.URL + 'hbPackageMultiAdd',
	HBPACKAGE_MULTI_UPDATE : LBSReader.URL + 'hbPackageMultiUpdate',
	HBPACKAGE_MULTI_REMOVE : LBSReader.URL + 'hbPackageMultiRemove',
	HBPACKAGE_MULTI_QUERY : LBSReader.URL + 'hbPackageMultiQuery',

	// ppkg
	HBPACKAGE_COMPLEX_ADD : LBSReader.URL + 'hbPackageComplexAdd',
	HBPACKAGE_COMPLEX_UPDATE : LBSReader.URL + 'hbPackageComplexUpdate',
	HBPACKAGE_COMPLEX_REMOVE : LBSReader.URL + 'hbPackageComplexRemove',
	HBPACKAGE_COMPLEX_QUERY : LBSReader.URL + 'hbPackageComplexQuery',
	// suit
	SUITE_QUERY : LBSReader.URL + 'suitQuery',

	PRODUCT_AUDITING : LBSReader.URL + 'productAudiging',
	PRODUCT_AUDITING_REV : LBSReader.URL + 'productAudRemove',
	PRODUCT_AUDITING_PASS : LBSReader.URL + 'proAudPass',
	PRODUCT_AUDITING_UNPASS : LBSReader.URL + 'proAudUnpass',
	PRODUCT_AUDITING_REARCH : LBSReader.URL + 'searchByCode',

	// member
	CRM_INFO_QUERY : LBSReader.URL + 'crmInfoQuery',
	// esb basisinfo query
	ESB_BASIS_INFO_QUERY : LBSReader.URL + 'esbBasisInfoQuery',

	// information
	INFORMATION : LBSReader.URL + 'informationQuery',
	INFORMATION_Combo : LBSReader.URL + 'informationComboQuery',

	// blacklist
	BLACK_LIST_QUERY : LBSReader.URL + 'blackListQuery',
	BLACK_DEL : LBSReader.URL + 'blackListDel',
	BLACK_ADD : LBSReader.URL + 'blackListAdd',

	// ctStatistics
	CTSTATISTICS_QUERY : LBSReader.URL + 'ctStatisticsQuery',
	CTSTATISTICS_BATCH_NO_Query : LBSReader.URL + 'ctStatisticsBatchNoQuery',
	CTSTATISTICS_ProductName_Query : LBSReader.URL
			+ 'ctStatisticsProductNameQuery',
	BILL_OFFER_QUERY : LBSReader.URL + 'billOfferQuery',
	BILL_COST_FREE_QUERY : LBSReader.URL + 'billCostFreeQuery',
	BILL_COST_FREE_ADD : LBSReader.URL + 'addBillCostFree',

	// Task
	TASK_Query : LBSReader.URL + "taskQuery",
	TASK_ADD : LBSReader.URL + "addTask",
	TASK_DEL : LBSReader.URL + "delTask",

	TASK_LIST_Query : LBSReader.URL + "taskListQuery",

	TASK_LIST_OUTPUT : LBSReader.URL + "taskListOutput",

	// 中台查询 zengjw 2012-07-26s
	UNITE_ORDER_CRM_INFO_QUERY : LBSReader.URL + 'uniteCrmInfoQuery',
	UNITE_ORDER_USER_QUERY : LBSReader.URL + 'uniteOrderUserQuery',
	UNITE_ORDER_QUERY : LBSReader.URL + 'uniteOrderQuery',
	PRODUCT_SEARCH_QUERY : LBSReader.URL + 'productSearchQuery',
	PRODUCT_SEARCH_ATTR_QUERY : LBSReader.URL + 'productSearchAttrQuery',
	ADD_ORDER_USER : LBSReader.URL + 'addOrderUser',
	ADD_HBPACKAGE_EFFECT_QUERY : LBSReader.URL + 'hbPackageSimpleQuery',

	// monitor
	MONITOR_BILL_QUERY : LBSReader.URL + 'monitorBillQuery',
	MONITOR_GD168_QUERY : LBSReader.URL + 'monitorGD168Query',
	MONITOR_TERM_QUERY : LBSReader.URL + 'monitorTermQuery'
};
LBSReader.Ajax = {

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
			Ext.Ajax.request({
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
									Ext.MessageBox.confirm('提示', o.exDesc
													|| '操作错误！', function(va) {
												if (va == 'yes') {
													LBSReader.common
															.clearSession("loginInfo");
													window.location
															.reload(true);
												}
											}, this);
									return;
								} else {
									Ext.MessageBox.alert('提示', o.exDesc, null,
											this);
									return;
								}
							}

							if (null != o.success || 'true' == o.success
									|| true == o.success) {
								req.callback.call(req.scope, o);
							} else {
								Ext.Msg.show({
											title : '系统异常',
											msg : o.message || '服务器无响应',
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						} catch (e) {
							Ext.Msg.show({
										title : '数据格式化错误',
										msg : e.message,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					} else {
						var errormsg = r.responseText || '请求失败！这可能是您没有鉴权该资源！';
						Ext.Msg.show({
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
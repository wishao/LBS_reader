/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB');

IsmpHB.CenterPanel = Ext.extend(Ext.ux.GroupTabPanel, {
	tabWidth : 150,
	activeGroup : 0,
	bodyStyle : 'border:0px',

	constructor : function(config) {
		var a = IsmpHB.common.getPermission('rootMod');
		config = config || {};
		config.items = this.items || [];
		if (IsmpHB.common.isHasPermission(a, 1)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-1');
			arr.push({
						title : '产品信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.spkg = new IsmpHB.spkg.DataGrid({});
				arr.push(this.spkg);
			}
			if (IsmpHB.common.isHasPermission(b, 2)) {
				this.prdt = new IsmpHB.product.DataGrid({});
				arr.push(this.prdt);
			}
			if (IsmpHB.common.isHasPermission(b, 3)) {
				this.auditing = new IsmpHB.auditing.DataGrid({});
				arr.push(this.auditing);
			}
			var pro = {
				expanded : true,
				items : arr
			}
			config.items.push(pro);
		}
		if (IsmpHB.common.isHasPermission(a, 2)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-2');
			arr.push({
						title : '订购关系'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.orderuser = new IsmpHB.orderuser.DataGrid({});
				arr.push(this.orderuser);
			}
			if (IsmpHB.common.isHasPermission(b, 2)) {
				this.orderUserExtra = new IsmpHB.orderUserExtra.DataGrid({});
				arr.push(this.orderUserExtra);
			}
			// if (IsmpHB.common.isHasPermission(b, 3)) {
			// this.batchOrderUser = new IsmpHB.batchOrderUser.DataPanel({});
			// arr.push(this.batchOrderUser);
			// }
			if (IsmpHB.common.isHasPermission(b, 4)) {
				this.task = new IsmpHB.task.Task({});
				arr.push(this.task);
			}

			var ord = {
				expanded : false,
				items : arr
			}
			config.items.push(ord);
		}
		if (IsmpHB.common.isHasPermission(a, 3)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-3');
			arr.push({
						title : '工单信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.orderworkflow = new IsmpHB.orderworkflow.DataGrid({});
				arr.push(this.orderworkflow);
			}
			var odw = {
				expanded : false,
				items : arr
			}
			config.items.push(odw);
		};

		if (IsmpHB.common.permission[0] == IsmpHB.common
				.getSession('loginInfo').type) {
			if (IsmpHB.common.isHasPermission(a, 4)) {
				var arr = [];
				var b = IsmpHB.common.getPermission('m-4');
				arr.push({
							title : '系统信息'
						});
				if (IsmpHB.common.isHasPermission(b, 1)) {
					this.loadRoles();
					this.admin = new IsmpHB.admin.DataGrid({});
					arr.push(this.admin);
				}
				if (IsmpHB.common.isHasPermission(b, 2)) {
					this.information = new IsmpHB.admin.Information({});
					arr.push(this.information);
				}
				var sys = {
					expanded : false,
					items : arr
				}
				config.items.push(sys);
			}

		};
		if (IsmpHB.common.isHasPermission(a, 5)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-5');
			arr.push({
						title : 'MBOSS信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.crmInfo = new IsmpHB.crmInfo.DataPanel({});
				arr.push(this.crmInfo);
			}
			if (IsmpHB.common.isHasPermission(b, 2)) {
				this.premium = new IsmpHB.premiumMg.DataGrid({});
				arr.push(this.premium);
			}
			var mbos = {
				expanded : false,
				items : arr
			}
			config.items.push(mbos);
		}
		if (IsmpHB.common.isHasPermission(a, 6)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-6');
			arr.push({
						title : 'CP/SP信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.sptel = new IsmpHB.sptel.DataGrid({});
				arr.push(this.sptel);
			}
			var sp = {
				expanded : false,
				items : arr
			}
			config.items.push(sp);
		}
		if (IsmpHB.common.isHasPermission(a, 7)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-7');
			arr.push({
						title : '业务辅助信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.blacklist = new IsmpHB.blacklist.Blacklist({});
				arr.push(this.blacklist);
			}
			var bl = {
				expanded : false,
				items : arr
			}
			config.items.push(bl);
		}
		if (IsmpHB.common.isHasPermission(a, 8)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-8');
			arr.push({
						title : '业务计费信息'
					});
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.statistics = new IsmpHB.statistics.Ct_Statistics({});
				arr.push(this.statistics);
			}
			// 未配置权限
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.billOffer = new IsmpHB.billOffer.DataGrid({});
				arr.push(this.billOffer);
			}
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.offerFree = new IsmpHB.offerFree.DataGrid({});
				arr.push(this.offerFree);
			}
			var bl = {
				expanded : false,
				items : arr
			}
			config.items.push(bl);
		}
		// zengjw 2012-07-17 这里新增了单用户查询
		if (IsmpHB.common.isHasPermission(a, 9)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-9');
			arr.push({
						title : '单用户订购信息'
					});

			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.crmOrderInfo = new IsmpHB.crmOrderInfo.DataPanel({});
				arr.push(this.crmOrderInfo);
			}
			var mbos = {
				expanded : false,
				items : arr
			}
			config.items.push(mbos);
		}
		/**
		 * pansenxin 2012-08-03
		 */
		if (IsmpHB.common.isHasPermission(a, 10)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-10');
			arr.push({
						title : '政企模块管理'
					});

			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.business = new IsmpHB.business.DataPanel({});
				arr.push(this.business);
			}
			if (IsmpHB.common.isHasPermission(b, 2)) {
				this.ecrmorderworkflow = new IsmpHB.ecrmorderworkflow.DataGrid(
						{});
				arr.push(this.ecrmorderworkflow);
			}
			if (IsmpHB.common.isHasPermission(b, 3)) {
				this.ecrmorderstatistics = new IsmpHB.ecrmorderstatistics.DataGrid(
						{});
				arr.push(this.ecrmorderstatistics);
			}
			if (IsmpHB.common.isHasPermission(b, 4)) {
				this.ecrmproduct = new IsmpHB.ecrmProduct.DataGrid({});
				arr.push(this.ecrmproduct);
			}
			if (IsmpHB.common.isHasPermission(b, 5)) {
				this.ecrmorderuser = new IsmpHB.ecrmOrderUser.DataGrid({});
				arr.push(this.ecrmorderuser);
			}
			/*
			 * if (IsmpHB.common.isHasPermission(b, 6)) { this.ecrmproductadd =
			 * new IsmpHB.ecrmProductAdd.DataPanel({});
			 * arr.push(this.ecrmproductadd); }
			 */

			var busi = {
				expanded : false,
				items : arr
			}
			config.items.push(busi);
		}

		if (IsmpHB.common.isHasPermission(a, 11)) {
			var arr = [];
			var b = IsmpHB.common.getPermission('m-11');
			arr.push({
						title : '计费监控管理'
					});
			// 全国联网
			if (IsmpHB.common.isHasPermission(b, 1)) {
				this.monitor_CN = new IsmpHB.monitor_CN.DataGrid({});
				arr.push(this.monitor_CN);
			}

			// 全省联网160
			if (IsmpHB.common.isHasPermission(b, 2)) {
				this.monitor_GD160 = new IsmpHB.monitor_GD160.DataGrid({});
				arr.push(this.monitor_GD160);
			}
			// 全省联网168(按时按次)
			if (IsmpHB.common.isHasPermission(b, 3)) {
				this.monitor_GD168 = new IsmpHB.monitor_GD168.DataGrid({});
				arr.push(this.monitor_GD168);
			}
			// 
			if (IsmpHB.common.isHasPermission(b, 4)) {
				this.monitor_term = new IsmpHB.monitor_term.DataGrid({});
				arr.push(this.monitor_term);
			}

			var module_monitor = {
				expanded : false,
				items : arr
			}
			config.items.push(module_monitor);
		}

		IsmpHB.CenterPanel.superclass.constructor.apply(this, arguments);
	},
	loadRoles : function() {
		Ext.StoreMgr.get('adminRole').load();
	}
});

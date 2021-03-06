/**
 * @author johnny0086
 */
Ext.namespace('LBSReader');

LBSReader.CenterPanel = Ext.extend(Ext.ux.GroupTabPanel, {
			tabWidth : 150,
			activeGroup : 0,
			bodyStyle : 'border:0px',

			constructor : function(config) {
				var role = LBSReader.common.getPermission('loginInfo');
				config = config || {};
				config.items = this.items || [];
				if (role == 1) {// 超级管理员
					var arr = [];
					arr.push({
								title : '管理员账号管理'
							});
					this.adminManager = new LBSReader.adminManager.DataGrid({});
					arr.push(this.adminManager);
					/*this.prdt = new LBSReader.product.DataGrid({});
					arr.push(this.prdt);
					this.auditing = new LBSReader.auditing.DataGrid({});
					arr.push(this.auditing);*/
					var pro = {
						expanded : true,
						items : arr
					}
					config.items.push(pro);
				}

				if (role == 1 || role == 2) {// 超级管理员,管理用户
					var arr = [];
					arr.push({
								title : '用户账号管理'
							});
					this.userManager = new LBSReader.userManager.DataGrid({});
					arr.push(this.userManager);
					this.contactManager = new LBSReader.contactManager.DataGrid({});
					arr.push(this.contactManager);
					this.readerManager = new LBSReader.readerManager.DataGrid({});
					arr.push(this.readerManager);
					this.recordManager = new LBSReader.recordManager.DataGrid({});
					arr.push(this.recordManager);
					var odw = {
						expanded : true,
						items : arr
					}
					config.items.push(odw);
				}
				if (role == 1 || role == 3) {// 超级管理员,管理书籍
					var arr = [];
					arr.push({
								title : '书籍信息'
							});
					this.bookManager = new LBSReader.bookManager.DataGrid({});
					arr.push(this.bookManager);
					var sys = {
						expanded : true,
						items : arr
					}
					config.items.push(sys);

				}
				/*
				 * if (LBSReader.common.isHasPermission(a, 5)) { var arr = [];
				 * var b = LBSReader.common.getPermission('m-5'); arr.push({
				 * title : 'MBOSS信息' }); if (LBSReader.common.isHasPermission(b,
				 * 1)) { this.crmInfo = new LBSReader.crmInfo.DataPanel({});
				 * arr.push(this.crmInfo); } if
				 * (LBSReader.common.isHasPermission(b, 2)) { this.premium = new
				 * LBSReader.premiumMg.DataGrid({}); arr.push(this.premium); }
				 * var mbos = { expanded : false, items : arr }
				 * config.items.push(mbos); } if
				 * (LBSReader.common.isHasPermission(a, 6)) { var arr = []; var
				 * b = LBSReader.common.getPermission('m-6'); arr.push({ title :
				 * 'CP/SP信息' }); if (LBSReader.common.isHasPermission(b, 1)) {
				 * this.sptel = new LBSReader.sptel.DataGrid({});
				 * arr.push(this.sptel); } var sp = { expanded : false, items :
				 * arr } config.items.push(sp); } if
				 * (LBSReader.common.isHasPermission(a, 7)) { var arr = []; var
				 * b = LBSReader.common.getPermission('m-7'); arr.push({ title :
				 * '业务辅助信息' }); if (LBSReader.common.isHasPermission(b, 1)) {
				 * this.blacklist = new LBSReader.blacklist.Blacklist({});
				 * arr.push(this.blacklist); } var bl = { expanded : false,
				 * items : arr } config.items.push(bl); } if
				 * (LBSReader.common.isHasPermission(a, 8)) { var arr = []; var
				 * b = LBSReader.common.getPermission('m-8'); arr.push({ title :
				 * '业务计费信息' }); if (LBSReader.common.isHasPermission(b, 1)) {
				 * this.statistics = new LBSReader.statistics.Ct_Statistics({});
				 * arr.push(this.statistics); } // 未配置权限 if
				 * (LBSReader.common.isHasPermission(b, 1)) { this.billOffer =
				 * new LBSReader.billOffer.DataGrid({});
				 * arr.push(this.billOffer); } if
				 * (LBSReader.common.isHasPermission(b, 1)) { this.offerFree =
				 * new LBSReader.offerFree.DataGrid({});
				 * arr.push(this.offerFree); } var bl = { expanded : false,
				 * items : arr } config.items.push(bl); } // zengjw 2012-07-17
				 * 这里新增了单用户查询 if (LBSReader.common.isHasPermission(a, 9)) { var
				 * arr = []; var b = LBSReader.common.getPermission('m-9');
				 * arr.push({ title : '单用户订购信息' });
				 * 
				 * if (LBSReader.common.isHasPermission(b, 1)) {
				 * this.crmOrderInfo = new LBSReader.crmOrderInfo.DataPanel({});
				 * arr.push(this.crmOrderInfo); } var mbos = { expanded : false,
				 * items : arr } config.items.push(mbos); }
				 *//**
					 * pansenxin 2012-08-03
					 */
				/*
				 * if (LBSReader.common.isHasPermission(a, 10)) { var arr = [];
				 * var b = LBSReader.common.getPermission('m-10'); arr.push({
				 * title : '政企模块管理' });
				 * 
				 * if (LBSReader.common.isHasPermission(b, 1)) { this.business =
				 * new LBSReader.business.DataPanel({});
				 * arr.push(this.business); } if
				 * (LBSReader.common.isHasPermission(b, 2)) {
				 * this.ecrmorderworkflow = new
				 * LBSReader.ecrmorderworkflow.DataGrid( {});
				 * arr.push(this.ecrmorderworkflow); } if
				 * (LBSReader.common.isHasPermission(b, 3)) {
				 * this.ecrmorderstatistics = new
				 * LBSReader.ecrmorderstatistics.DataGrid( {});
				 * arr.push(this.ecrmorderstatistics); } if
				 * (LBSReader.common.isHasPermission(b, 4)) { this.ecrmproduct =
				 * new LBSReader.ecrmProduct.DataGrid({});
				 * arr.push(this.ecrmproduct); } if
				 * (LBSReader.common.isHasPermission(b, 5)) { this.ecrmorderuser =
				 * new LBSReader.ecrmOrderUser.DataGrid({});
				 * arr.push(this.ecrmorderuser); }
				 * 
				 * if (LBSReader.common.isHasPermission(b, 6)) {
				 * this.ecrmproductadd = new
				 * LBSReader.ecrmProductAdd.DataPanel({});
				 * arr.push(this.ecrmproductadd); }
				 * 
				 * 
				 * var busi = { expanded : false, items : arr }
				 * config.items.push(busi); }
				 * 
				 * if (LBSReader.common.isHasPermission(a, 11)) { var arr = [];
				 * var b = LBSReader.common.getPermission('m-11'); arr.push({
				 * title : '计费监控管理' }); // 全国联网 if
				 * (LBSReader.common.isHasPermission(b, 1)) { this.monitor_CN =
				 * new LBSReader.monitor_CN.DataGrid({});
				 * arr.push(this.monitor_CN); } // 全省联网160 if
				 * (LBSReader.common.isHasPermission(b, 2)) { this.monitor_GD160 =
				 * new LBSReader.monitor_GD160.DataGrid({});
				 * arr.push(this.monitor_GD160); } // 全省联网168(按时按次) if
				 * (LBSReader.common.isHasPermission(b, 3)) { this.monitor_GD168 =
				 * new LBSReader.monitor_GD168.DataGrid({});
				 * arr.push(this.monitor_GD168); } // if
				 * (LBSReader.common.isHasPermission(b, 4)) { this.monitor_term =
				 * new LBSReader.monitor_term.DataGrid({});
				 * arr.push(this.monitor_term); }
				 * 
				 * var module_monitor = { expanded : false, items : arr }
				 * config.items.push(module_monitor); }
				 */

				LBSReader.CenterPanel.superclass.constructor.apply(this,
						arguments);
			},
			loadRoles : function() {
				// Ext.StoreMgr.get('adminRole').load();
			}
		});

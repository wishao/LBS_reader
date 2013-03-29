// zengjw 2012-07-23 单用户查询订购信息与工单查询
// 命名空间
Ext.namespace('IsmpHB', 'IsmpHB.crmOrderInfo');
// 主界面（中）
IsmpHB.crmOrderInfo.DataPanel = Ext.extend(Ext.Panel, {
	title : '信息查询',
	autoScroll : true,
	layout : "fit",
	cls : 'box-dataGrid',
	formBox : null,
	telField : new Ext.form.TextField({
				emptyText : '请填写电话号码(固话请加区号)',
				maxLength : 100,
				msgTarget : 'side',
				width : 200,
				allowBlank : false
			}),

	searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	resetInfoArea : new Ext.Button({
				text : '清除',
				cls : 'btn-common'
			}),

	addBtn : new Ext.Button({
				text : '新增订购',
				cls : 'btn-common'
			}),
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push('电话号码: ');
		config.tbar.push(this.telField);
		var a = IsmpHB.common.getPermission('5-1');
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.searchBtn);
		config.tbar.push(this.resetInfoArea);
		OrderAddButton = this.addBtn;
		config.tbar.push('->');
		config.tbar.push(OrderAddButton);
		// 设置新增订购按钮不可用
		OrderAddButton.setDisabled(true);
		config.items = config.items || [];
		this.formBox = new Ext.Panel({
					waitMsgTarget : true,
					layout : 'border',
					items : [new Ext.Panel({// border布局
								title : '基本信息',
								layout : 'border',
								region : 'west',
								width : 600,
								items : [new Ext.form.FieldSet({// 客户信息框
											labelAlign : 'right',
											autoHeight : true,
											region : 'north',
											defaultType : 'textfield',
											items : [{
														fieldLabel : '电话号码',
														id : 'order_tel',
														name : 'order_tel',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '姓名',
														id : 'order_name',
														name : 'order_name',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '状态',
														id : 'order_state',
														name : 'order_state',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '出生日期',
														id : 'order_birthday',
														name : 'order_birthday',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '证件号码类型',
														id : 'order_social_id_type',
														name : 'order_social_id_type',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '证件号码',
														id : 'order_social_id',
														name : 'order_social_id',
														width : 220,
														disabled : true
													}, {
														fieldLabel : '登记地址',
														id : 'order_address',
														name : 'order_address',
														width : 320,
														disabled : true
													}]
										}),// 订购信息框
										new IsmpHB.crmOrderInfo.ProductPanel({
													region : 'center'
												})]
							}), new IsmpHB.crmOrderInfo.OrderPanel({// 工单信息框
								region : 'center'
							})]
				});
		config.items.push(this.formBox);

		IsmpHB.crmOrderInfo.DataPanel.superclass.constructor.apply(this,
				arguments);

		this.telField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetInfoArea.on('click', function() {
					this.resetFormBox();
				}, this);
		this.addBtn.on('click', function() {
					this.addItems();
				}, this);
	},
	// 搜索方法
	searchItems : function() {
		if (this.telField.getValue().trim().length < 1) {
			Ext.Msg.alert('提示', '请输入要查询的电话号码(固话号码请在前面加区号)');
			return;
		}
		var pattern2 = /^[0-9]+$/;
		if (!pattern2.exec(this.telField.getValue().trim())) {
			Ext.Msg.alert('提示', '电话号码不能包含数字以外的字符！');
			return;
		}
		var pattern3 = /^[0-9]{10,12}$/;
		if (!pattern3.exec(this.telField.getValue().trim())) {
			Ext.Msg.alert('提示', '所填写的电话号码长度不符合要求，请检查！(固话号码请在前面加区号)');
			return;
		}

		// 查询客户信息
		var req = {
			url : IsmpHB.req.UNITE_ORDER_CRM_INFO_QUERY,
			params : {
				timestamp : new Date().valueOf(),
				tel : this.telField.getValue()
			},
			scope : this,
			callback : function(o) {
				// 清楚原先的数据
				Ext.StoreMgr.get('uniteOrderUser').removeAll();
				Ext.StoreMgr.get('uniteOrder').removeAll();
				if (!o.success) {
					Ext.Msg.alert('提示', o.message);
				} else {
					// 设置新增按钮显示
					OrderAddButton.setDisabled(false);
					var nodeCodeResult = o.data.nodeCode;
					OrderAddTel = o.data.tel;
					OrderAddName = o.data.name;
					// 添加信息到客户信息框
					var fm1 = this.formBox.items.get(0).get(0).items;
					for (var i = 0; i < fm1.length; i++) {
						fm1.get(i).setDisabled(false);
					}
					IsmpHB.crmOrderInfo.productAddDlg.setTitle('新增订购('
							+ OrderAddTel + '-' + OrderAddName + ')');
					fm1.get('order_tel').setValue(o.data.tel);
					fm1.get('order_name').setValue(o.data.name);
					fm1.get('order_state').setValue(IsmpHB.renderer
							.TEL_STATE(o.data.state));
					fm1.get('order_birthday').setValue(o.data.birthday);
					fm1.get('order_address').setValue(o.data.address);
					fm1.get('order_social_id_type').setValue(IsmpHB.renderer
							.IDENTITY_TYPE(o.data.social_id_type));
					fm1.get('order_social_id').setValue(o.data.social_id);
					// 设置查询出来的数据不可改
					for (var i = 0; i < fm1.length; i++) {
						fm1.get(i).setReadOnly(true);
					}
					// 查询订购信息
					Ext.StoreMgr.get('uniteOrderUser').baseParams = {
						method : 'search',
						productSpecId : -1,
						hbPackageId : -1,
						timestamp : new Date().valueOf(),
						tel : OrderAddTel,
						start : 0,
						limit : 20,
						startTime : '',
						endTime : '',
						isLike : 0,
						nodeCode : nodeCodeResult,
						usage_flag : -1,
						status : -1
					};
					Ext.StoreMgr.get('uniteOrderUser').load({
								params : {},
								callback : function(a, b, c) {
									// 订购关系的刷新按钮
									ProductPagingbar.setVisible(true);
								},
								scope : this
							});

				}
			}
		};
		// 发送请求
		IsmpHB.Ajax.send(req);

	},
	// 清空按钮事件
	resetFormBox : function() {
		this.telField.reset();
		var fm1 = this.formBox.items.get(0).get(0).items;
		for (var i = 0; i < fm1.length; i++) {
			fm1.get(i).setDisabled(true).reset();
		}
		Ext.StoreMgr.get('uniteOrderUser').removeAll();
		Ext.StoreMgr.get('uniteOrder').removeAll();
		// 订购关系的刷新按钮
		ProductPagingbar.setVisible(false);
		// 工单的刷新按钮
		OrderPagingbar.setVisible(false);
		// 设置新增按钮显示
		OrderAddButton.setDisabled(true);
	},
	// 新增订购按钮事件
	addItems : function() {
		SearchPagingbar.setVisible(false);
		Ext.StoreMgr.get('searchPackage').removeAll();
		Ext.StoreMgr.get('addEffectPackage').removeAll();
		crm_ProductAttr.removeAll();
		IsmpHB.crmOrderInfo.productAddDlg.show();
		crm_submitButton.buttons[0].setDisabled(true);
		crm_chargeType.setDisabled(true);
		crm_flagCombo.reset();
		crm_dbField.reset();
		crm_ddField.reset();
		crm_packageNameField.reset();
	}
});

// 填充产品包信息弹出框内容（弹左下弹）
IsmpHB.crmOrderInfo.showAddView = function(grid, rowIndex, colIndex) {
	var r = Ext.StoreMgr.get('addEffectPackage').getAt(rowIndex);
	productAddForm.get('package_id').setValue(r.data.id);
	productAddForm.get('package_name').setValue(r.data.name);
	productAddForm.get('package_code').setValue(r.data.code);
	productAddForm.get('package_pairValue').setValue(r.data.pairValue);
	productAddForm.get('package_billFlag').setValue(IsmpHB.renderer
			.CHARGINGMODE(r.data.billFlag));
	productAddForm.get('package_chargingCode').setValue(r.data.chargingCode);
	productAddForm.get('package_chargingDesc').setValue(r.data.chargingDesc);
	productAddForm.get('package_chargingCycle').setValue(IsmpHB.renderer
			.CHARGINGCYCLE(r.data.chargingCycle));
	productAddForm.get('package_effectMode').setValue(IsmpHB.renderer
			.EFFECTMODE(r.data.effectMode));
	productAddForm.get('package_withDrawMode').setValue(IsmpHB.renderer
			.EFFECTMODE(r.data.withDrawMode));
	productAddForm.get('package_trialType').setValue(IsmpHB.renderer
			.TRIAL_TYPE(r.data.trialType));
	productAddForm.get('package_trialTerm').setValue(r.data.trialTerm);
	productAddForm.get('package_useFlag').setValue(IsmpHB.renderer
			.VIEW_STATUS_FLAG(r.data.useFlag));
	productAddForm.get('package_beginCharg').setValue(IsmpHB.renderer
			.BEGIN_RULE(r.data.beginCharg));
	productAddForm.get('package_endPreCharg').setValue(IsmpHB.renderer
			.END_PRE_CHARG(r.data.endPreCharg));
	productAddForm.get('package_endAfterCharg').setValue(IsmpHB.renderer
			.END_AFTER_CHARG(r.data.endAfterCharg));
	IsmpHB.crmOrderInfo.packageDlg.show();
}

// 新增订购框搜索产品包（弹左下）
IsmpHB.crmOrderInfo.AddProductSearchPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '产品包列表',
	autoScroll : true,
	store : Ext.StoreMgr.get('addEffectPackage'),
	crm_packageNameField : new Ext.form.TextField({
		emptyText : '请填写产品包名称',
		maxLength : 80,
		msgTarget : 'side',
		width : 180,
		listeners : {
			specialkey : function(field, e) {
				if (e.getKey() == Ext.EventObject.ENTER) {
					crm_submitButton.buttons[0].setDisabled(true);
					Ext.StoreMgr.get('searchPackage').removeAll();
					Ext.StoreMgr.get('addEffectPackage').removeAll();
					crm_ProductAttr.removeAll();
					Ext.StoreMgr.get('addEffectPackage').load({
								params : {
									method : 'search',
									name : this.getValue(),
									packageType : '0'
								},
								callback : function(r, o, s) {
									if (!s) {
										Ext.MessageBox
												.alert('提示', '加载超时，请稍后重试');
										return false;
									}
									SearchPagingbar.setVisible(true);
								},
								scope : this
							});
				}
			}
		}
	}),
	flagCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				displayField : 'name',
				valueField : 'id',
				width : 70,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '公众类'], ['1', '政企类']]
						}),
				value : 0,
				disabled : true
			}),
	addSearchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	constructor : function(config) {
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 10,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};
		crm_packageNameField = this.crm_packageNameField;
		config.tbar = config.tbar || [];
		config.tbar.push('类型：', this.flagCombo);
		config.tbar.push('名称：', this.crm_packageNameField);
		config.tbar.push('->');
		config.tbar.push(this.addSearchBtn);

		config.bbar = this.pagingbar;
		this.pagingbar.refresh.setVisible(false);
		SearchPagingbar = this.pagingbar;
		this.cm = new Ext.grid.ColumnModel([{
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 190
				}, {
					header : '计费策略',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'chargingDesc',
					width : 70
				}, {
					header : '计费周期',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'chargingCycle',
					width : 70,
					renderer : IsmpHB.renderer.CHARGINGCYCLE
				}, {
					header : '计费标识',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'billFlag',
					renderer : IsmpHB.renderer.CHARGINGMODE,
					width : 70
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'useFlag',
					renderer : IsmpHB.renderer.STATUS_FLAG,
					width : 60
				}, {
					xtype : 'actioncolumn',
					header : '查看',
					align : 'center',
					width : 40,
					items : [{
						icon : 'images/btn_search.png',
						tooltip : '查看产品包详细信息',
						handler : IsmpHB.crmOrderInfo.showAddView
								.createDelegate(this)
					}]
				}, {
					xtype : 'actioncolumn',
					header : '订购',
					align : 'center',
					width : 40,
					items : [{
						getClass : function(html, meta, rec) {
							if (rec.get("useFlag") == IsmpHB.data.STATUS_FLAG.EFFECT) {
								this.items[0].tooltip = '订购该产品包';
								return 'reportAvailableCss';
							} else {
								this.items[0].tooltip = '无法订购该产品包';
								return 'reportSentCss';
							}
						},
						handler : IsmpHB.crmOrderInfo.showProduct
								.createDelegate(this)

					}]
				}]);
		IsmpHB.crmOrderInfo.AddProductSearchPanel.superclass.constructor.apply(
				this, arguments);
		// 查询产品包事件
		this.addSearchBtn.on('click', function() {

					crm_submitButton.buttons[0].setDisabled(true);
					Ext.StoreMgr.get('searchPackage').removeAll();
					Ext.StoreMgr.get('addEffectPackage').removeAll();
					crm_ProductAttr.removeAll();
					Ext.StoreMgr.get('addEffectPackage').load({
								params : {
									method : 'search',
									name : this.crm_packageNameField.getValue(),
									packageType : '0'
								},
								callback : function(r, o, s) {
									if (!s) {
										Ext.MessageBox
												.alert('提示', '加载超时，请稍后重试');
										return false;
									}
									SearchPagingbar.setVisible(true);
								},
								scope : this
							});
				}, this);

	}
});

// 新增订购框产品包中的产品额外信息（弹右下）
IsmpHB.crmOrderInfo.AddProductAttrPanel = Ext.extend(Ext.Panel, {
			title : '产品附加信息',
			autoScroll : true,
			formBox : null,
			store : Ext.StoreMgr.get('productSearchattr'),
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.formBox = new Ext.Panel({// border布局
					labelAlign : 'right',
					layout : 'form',
					border : false,
					autoScroll : true,
					autoHeight : true,
					bodyStyle : 'padding:5px 0px 5px 0px;',
					items : []

				});
				crm_ProductAttr = this.formBox;
				config.items.push(this.formBox);
				IsmpHB.crmOrderInfo.AddProductAttrPanel.superclass.constructor
						.apply(this, arguments);

			}
		});

// 新增订购框产品包中的产品（弹右上）
IsmpHB.crmOrderInfo.AddProductPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '产品列表',
	autoScroll : true,
	store : Ext.StoreMgr.get('searchPackage'),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		if ('2' == record.data.selectedFlag) {
			return '<div class="x-grid3-row-checker" qtip="必选项，不能取消" class="oper_not_allowed"></div>';
		} else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	},
	constructor : function(config) {
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};

		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		ProductSM = this.sm;
		this.pagingbar.setVisible(false);
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 230
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'selectedFlag',
					renderer : function(value) {
						if ('2' == value) {
							return '<font color="red">必选项</font>';
						} else if ('1' == value) {
							return '<font color="gray">默认选项</font>';
						} else {
							return '可选项';
						}
					},
					width : 100
				}]);
		IsmpHB.crmOrderInfo.AddProductPanel.superclass.constructor.apply(this,
				arguments);
		this.getSelectionModel().on('rowselect',
				function(sm, rowIndex, record) {
					var id = record.data.id;
					try {
						if (!id.match(/^\d+$/)) {
							id = record.data.id.split('_')[2];
						}
					} catch (e) {
					}
					this.loadDynFormItems(id, record);
					crm_ProductAttr.removeAll();
				}, this);
		this.getSelectionModel().on('rowdeselect',
				function(sm, rowIndex, record) {
					if (2 == record.data.selectedFlag) {
						if (!this.getSelectionModel().isSelected(record)) {
							this.getSelectionModel().selectRow(rowIndex);
						}
						Ext.MessageBox.alert('提示', '必选项不能取消！');
						return;
					}
				}, this);
	},
	loadDynFormItems : function(pid, record) {
		Ext.StoreMgr.get('productSearchattr').load({
					params : {
						timestamp : new Date().valueOf(),
						ids : pid
					},
					callback : function(r, o, s) {
						if (!s) {
							Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
							return;
						}
						if (null != r && 0 < r.length) {
							for (i = 0; i < r.length; i++) {
								crm_ProductAttr.add({
											fieldLabel : r[i].data.fieldLabel,
											xtype : r[i].data.xtype,
											name : r[i].data.name,
											allowBlank : r[i].data.allowBlank,
											width : 200
										});
							}
							crm_ProductAttr.doLayout();
						}
						crm_submitButton.buttons[0].setDisabled(false);

					},
					scope : this
				});
	},
	attrs2Store : function(id, attrs) {
		var r = this.getStore().getById(id);
		r.data.attrs = attrs;
	}
});

// 工单信息框（右）
IsmpHB.crmOrderInfo.OrderPanel = Ext.extend(Ext.grid.GridPanel, {
			title : '工单信息',
			autoScroll : true,
			store : Ext.StoreMgr.get('uniteOrder'),
			constructor : function(config) {
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};

				config.bbar = this.pagingbar;
				this.pagingbar.setVisible(false);
				OrderPagingbar = this.pagingbar;
				this.cm = new Ext.grid.ColumnModel([{
							header : '业务类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'serviceType',
							renderer : IsmpHB.renderer.ORDER_SERVICE_TYPE,
							width : 60
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'status',
							renderer : IsmpHB.renderer.ORDER_STATUS,
							width : 60
						}, {
							header : '号百产品包名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'hbPackageName',
							width : 120
						}, {
							header : '工单渠道',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'source',
							renderer : IsmpHB.renderer.ORDER_SOURCE,
							width : 70
						}, {
							header : '创建日期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'createTime',
							width : 100
						}, {
							header : '操作员',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'operator',
							width : 100
						}]);
				IsmpHB.crmOrderInfo.OrderPanel.superclass.constructor.apply(
						this, arguments);

			}
		});

// 订购信息框（左下）
IsmpHB.crmOrderInfo.ProductPanel = Ext.extend(Ext.grid.GridPanel, {
			title : '订购信息',
			autoScroll : true,
			store : Ext.StoreMgr.get('uniteOrderUser'),
			constructor : function(config) {

				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};
				config.bbar = this.pagingbar;
				this.pagingbar.setVisible(false);
				ProductPagingbar = this.pagingbar;
				this.cm = new Ext.grid.ColumnModel([{
							header : '号百产品包名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'hbPackageDesc',
							width : 150
						}, {
							header : '产品规格名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'productSpecName',
							width : 150
						}, {
							header : '订购渠道',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'source',
							renderer : IsmpHB.renderer.ORDER_SOURCE,
							width : 80
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'status',
							renderer : IsmpHB.renderer.ORDER_USER_STATUS,
							width : 40
						}, {
							header : '更新时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'updateTime',
							renderer : function(obj) {
								return obj.substring(0, 21);
							},
							width : 80
						}, {
							xtype : 'actioncolumn',
							header : '查看',
							align : 'center',
							width : 40,
							items : [{
								icon : 'images/btn_search.png',
								tooltip : '查看订购关系',
								handler : IsmpHB.crmOrderInfo.showView
										.createDelegate(this)
							}]
						}, {
							xtype : 'actioncolumn',
							header : '工单',
							align : 'center',
							width : 40,
							items : [{
								icon : 'images/icon_workflow.png',
								tooltip : '查看工单',
								handler : IsmpHB.crmOrderInfo.showOrder
										.createDelegate(this)
							}]
						}]);
				IsmpHB.crmOrderInfo.ProductPanel.superclass.constructor.apply(
						this, arguments);
			}
		});

// 添加订购信息框里面的查看工单方法
IsmpHB.crmOrderInfo.showOrder = function(grid, rowIndex, colIndex) {

	var r = Ext.StoreMgr.get('uniteOrderUser').getAt(rowIndex);
	Ext.StoreMgr.get('uniteOrder').baseParams = {
		method : 'search',
		timestamp : new Date().valueOf(),
		start : 0,
		limit : 20,
		tel : r.data.tel,
		hb_package_id : r.data.hbPackageId
	};
	Ext.StoreMgr.get('uniteOrder').load({
				params : {
					timestamp : new Date().valueOf(),
					start : 0,
					limit : 20,
					tel : r.data.tel,
					hb_package_id : r.data.hbPackageId
				},
				callback : function(r, o, s) {
					// 订购关系的刷新按钮
					OrderPagingbar.setVisible(true);
				},
				scope : this
			});

};

// 产品包信息框里面的选择跳转的方法
IsmpHB.crmOrderInfo.showProduct = function(grid, rowIndex, colIndex) {
	Ext.StoreMgr.get('searchPackage').removeAll();
	var r = Ext.StoreMgr.get('addEffectPackage').getAt(rowIndex);
	hbPackageId = r.data.id;
	hbPackageName = r.data.name;
	hbPackageCode = r.data.code;
	if (r.data.useFlag == IsmpHB.data.STATUS_FLAG.EFFECT) {
		Ext.StoreMgr.get('searchPackage').baseParams = {
			method : 'package',
			timestamp : new Date().valueOf(),
			start : 0,
			limit : 5,
			pid : r.data.id
		};
		Ext.StoreMgr.get('searchPackage').load({
			params : {
				timestamp : new Date().valueOf(),
				start : 0,
				limit : 5,
				pid : r.data.id
			},
			callback : function(r, o, s) {
				crm_submitButton.buttons[0].setDisabled(false);
				if (!s) {
					Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
					return;
				}
				var cs = [];
				Ext.StoreMgr.get('searchPackage').each(function(r) {
							if (2 == r.data.selectedFlag
									|| 1 == r.data.selectedFlag) {
								// 必选或默选，则选之
								cs.push(r);
							}
						}, this);
				ProductSM.selectRecords(cs);
			},
			scope : this
		});
	} else {
		Ext.MessageBox.alert('提示', '该产品包不是有效状态,不能订购');
		Ext.StoreMgr.get('searchPackage').removeAll();
		crm_ProductAttr.removeAll();
		crm_submitButton.buttons[0].setDisabled(true);
		return;
	}

};

// 详细订购信息弹出框（左下弹）
IsmpHB.crmOrderInfo.productDlg = new Ext.Window({
			title : '订购信息',
			layout : 'fit',
			modal : true,
			width : 450,
			height : 480,
			constrainHeader : true,
			closeAction : 'hide',
			items : [productForm = new Ext.form.FormPanel({
						labelWidth : 100,
						labelAlign : 'right',
						border : false,
						bodyStyle : 'padding:5px 10px 5px 10px;',
						frame : true,
						items : [{
									fieldLabel : '客户电话',
									xtype : 'textfield',
									name : 'tel',
									id : 'tel',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '客户姓名',
									xtype : 'textfield',
									name : 'name',
									id : 'name',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '地区',
									xtype : 'textfield',
									name : 'nodeCode',
									id : 'nodeCode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '号百产品包名称',
									xtype : 'textfield',
									name : 'hbPackageDesc',
									id : 'hbPackageDesc',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '产品规格名称',
									xtype : 'textfield',
									name : 'productSpecName',
									id : 'productSpecName',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : 'CRM产品包名称',
									xtype : 'textfield',
									name : 'crmPackageDesc',
									id : 'crmPackageDesc',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '扣费方式',
									xtype : 'textfield',
									name : 'chargeType',
									id : 'chargeType',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '订购渠道',
									xtype : 'textfield',
									name : 'source',
									id : 'source',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '生效日期',
									xtype : 'textfield',
									name : 'startTime',
									id : 'startTime',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '失效日期',
									xtype : 'textfield',
									name : 'endTime',
									id : 'endTime',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '状态',
									xtype : 'textfield',
									name : 'status',
									id : 'status',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '试用标识',
									xtype : 'textfield',
									name : 'usageFlag',
									id : 'usageFlag',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '创建时间',
									xtype : 'textfield',
									name : 'createTime',
									id : 'createTime',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '更新时间',
									xtype : 'textfield',
									name : 'updateTime',
									id : 'updateTime',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '操作者',
									xtype : 'textfield',
									name : 'operator',
									id : 'operator',
									width : 180,
									readOnly : true
								}],
						buttonAlign : 'center',
						buttons : [{
									text : '关闭',
									handler : function() {// 点击取消按钮的操作事件
										IsmpHB.crmOrderInfo.productDlg.hide();
									}
								}]
					})]
		});

// 详细产品包信息弹出框（弹左下弹）
IsmpHB.crmOrderInfo.packageDlg = new Ext.Window({
			title : '产品包信息',
			layout : 'fit',
			modal : true,
			width : 450,
			height : 500,
			constrainHeader : true,
			closeAction : 'hide',
			items : [productAddForm = new Ext.form.FormPanel({
						labelWidth : 140,
						labelAlign : 'right',
						border : false,
						bodyStyle : 'padding:5px 10px 5px 10px;',
						frame : true,
						items : [{
									fieldLabel : '产品包ID',
									xtype : 'textfield',
									name : 'package_id',
									id : 'package_id',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '产品包名称',
									xtype : 'textfield',
									name : 'package_name',
									id : 'package_name',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '产品包编码',
									xtype : 'textfield',
									name : 'package_code',
									id : 'package_code',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '业务资费',
									xtype : 'textfield',
									name : 'package_pairValue',
									id : 'package_pairValue',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费标识',
									xtype : 'textfield',
									name : 'package_billFlag',
									id : 'package_billFlag',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '资费编码',
									xtype : 'textfield',
									name : 'package_chargingCode',
									id : 'package_chargingCode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费策略描述',
									xtype : 'textfield',
									name : 'package_chargingDesc',
									id : 'package_chargingDesc',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费周期',
									xtype : 'textfield',
									name : 'package_chargingCycle',
									id : 'package_chargingCycle',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '订购生效模式',
									xtype : 'textfield',
									name : 'package_effectMode',
									id : 'package_effectMode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '退订生效模式',
									xtype : 'textfield',
									name : 'package_withDrawMode',
									id : 'package_withDrawMode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '试用期类型',
									xtype : 'textfield',
									name : 'package_trialType',
									id : 'package_trialType',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '试用时长',
									xtype : 'textfield',
									name : 'package_trialTerm',
									id : 'package_trialTerm',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '启用标识',
									xtype : 'textfield',
									name : 'package_useFlag',
									id : 'package_useFlag',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '首月计费规则',
									xtype : 'textfield',
									name : 'package_beginCharg',
									id : 'package_beginCharg',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '注销当月预付费计费规则',
									xtype : 'textfield',
									name : 'package_endPreCharg',
									id : 'package_endPreCharg',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '注销当月后付费计费规则',
									xtype : 'textfield',
									name : 'package_endAfterCharg',
									id : 'package_endAfterCharg',
									width : 250,
									readOnly : true
								}],
						buttonAlign : 'center',
						buttons : [{
									text : '关闭',
									handler : function() {// 点击取消按钮的操作事件
										IsmpHB.crmOrderInfo.packageDlg.hide();
									}
								}]
					})]
		});

// 新增订购信息弹出框（弹）
IsmpHB.crmOrderInfo.productAddDlg = new Ext.Window({
	title : '新增订购',
	layout : 'fit',
	modal : true,
	width : 960,
	height : 480,
	constrainHeader : true,
	closeAction : 'hide',
	items : [new Ext.Panel({// border布局
		layout : 'border',
		header : false,
		border : false,
		items : [new Ext.form.FormPanel({
					labelAlign : 'right',
					border : false,
					region : 'north',
					layout : "form",
					height : 60,
					frame : true,
					items : [{
						layout : "column", // 从左往右的布局
						items : [{
							columnWidth : .5,
							layout : "form",
							items : [crm_chargeType = new Ext.form.ComboBox({
										fieldLabel : '付费方式',
										editable : false,
										mode : 'local',
										triggerAction : 'all',
										allowBlank : false,
										emptyText : '选择扣费方式',
										displayField : 'name',
										valueField : 'id',
										width : 180,
										store : new Ext.data.ArrayStore({
													fields : ['id', 'name'],
													data : [['0', '帐户直接划扣'],
															['1', '以积分兑换']]
												}),
										value : 0

									})]
						}, {
							columnWidth : .5,
							layout : "form",
							items : [crm_flagCombo = new Ext.form.ComboBox({
										fieldLabel : '试用标识',
										editable : false,
										mode : 'local',
										triggerAction : 'all',
										allowBlank : false,
										emptyText : '选择试用标识',
										displayField : 'name',
										valueField : 'id',
										width : 180,
										store : new Ext.data.ArrayStore({
													fields : ['id', 'name'],
													data : [['0', '正式'],
															['1', '试用']]
												}),
										value : 0
									})]
						}

						]
					}, {
						layout : "column", // 从左往右的布局
						items : [{
									columnWidth : .5,
									layout : "form",
									items : [crm_dbField = new Ext.form.DateField(
											{
												fieldLabel : '生效日期',
												format : 'Y-m-d',
												allowBlank : false,
												emptyText : '有效期开始日期',
												msgTarget : 'side',
												name : 'addStartTime',
												id : 'addStartTime',
												width : 180,
												value : new Date
											})]
								}, {
									columnWidth : .5,
									layout : "form",
									items : [crm_ddField = new Ext.form.DateField(
											{
												fieldLabel : '失效日期',
												format : 'Y-m-d',
												allowBlank : false,
												emptyText : '有效期结束日期',
												msgTarget : 'side',
												name : 'addEndTime',
												id : 'addEndTime',
												width : 180,
												value : new Date().add(
														Date.YEAR, 1)
											})]
								}]
					}]
				}), crm_submitButton = new Ext.Panel({// border布局
			region : 'south',
			border : false,
			header : false,
			buttonAlign : 'center',
			buttons : [{
				text : '提交',
				// 点击提交按钮的操作事件
				handler : function() {
					var dateValid = IsmpHB.customFunctions.dateValid(
							crm_dbField.getValue(), crm_ddField.getValue());
					if (!dateValid) {
						Ext.MessageBox.alert('提示', '生效日期不能在失效日期之后或相同，请修正！',
								null, this);
						return;
					}
					for (var i = 0; i < crm_ProductAttr.items.length; i++) {
						if (crm_ProductAttr.get(crm_ProductAttr.items.items[i])
								.getValue() == ''
								&& !crm_ProductAttr
										.get(crm_ProductAttr.items.items[i]).allowBlank) {
							Ext.MessageBox
									.alert(
											'提示',
											crm_ProductAttr
													.get(crm_ProductAttr.items.items[i]).fieldLabel
													+ '不能为空！', null, this);
							return;
						}
					}
					var ps = [];
					var rs = ProductSM.getSelections();
					// 获取已选择的
					var attr = [];
					for (var i = 0; i < crm_ProductAttr.items.length; i++) {
						var object = {};
						object['k'] = crm_ProductAttr.items.items[i].name;
						object['v'] = crm_ProductAttr
								.get(crm_ProductAttr.items.items[i]).getValue();
						attr.push(object);
					}
					for (var i = 0; i < rs.length; i++) {
						ps.push({
									spec_id : rs[i].data.id,
									name : rs[i].data.name,
									code : rs[i].data.code,
									selectedFlag : rs[i].data.selectedFlag,
									attrs : attr || []
								});
					}

					var cromb = {
						Start_Time : crm_dbField.getValue()
								.format(Date.patterns.ISO8601Middle),
						End_Time : crm_ddField.getValue()
								.format(Date.patterns.ISO8601Middle),
						Status : '1',//
						usage : crm_flagCombo.getValue(),
						product_list : ps
					};
					var req = {
						url : IsmpHB.req.ADD_ORDER_USER,
						params : {
							timestamp : new Date().valueOf(),
							tel : OrderAddTel,
							name : OrderAddName,
							hbPackageId : hbPackageId,
							hbPackageName : hbPackageName,
							hbPackageCode : hbPackageCode,
							crm_chargeType : crm_chargeType.getValue(),
							data : Ext.encode(cromb)
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.confirm("提示",
										"添加成功！是否继续添加新订购关系", function(e) {
											if (e == 'yes') {
												SearchPagingbar
														.setVisible(false);
												Ext.StoreMgr
														.get('searchPackage')
														.removeAll();
												Ext.StoreMgr
														.get('addEffectPackage')
														.removeAll();
												crm_ProductAttr.removeAll();
												IsmpHB.crmOrderInfo.productAddDlg
														.show();
												crm_submitButton.buttons[0]
														.setDisabled(true);
												crm_chargeType
														.setDisabled(true);
												crm_flagCombo.reset();
												crm_dbField.reset();
												crm_ddField.reset();
												crm_packageNameField.reset();
											} else {
												IsmpHB.crmOrderInfo.productAddDlg
														.hide();
											}
										});
							} else {
								Ext.MessageBox.alert('提示', '添加失败！', null, this);
							}
						}
					};
					IsmpHB.Ajax.send(req);

				}
			}]
		}), new Ext.Panel({// border布局
			layout : 'border',
			region : 'center',
			border : false,
			split : true,
			header : false,
			items : [new Ext.Panel({// border布局
				region : 'east',
				layout : 'fit',
				border : false,
				split : true,
				width : '38%',
				items : [new Ext.Panel({// border布局
					layout : 'border',
					border : false,
					items : [new IsmpHB.crmOrderInfo.AddProductPanel({
										region : 'north',
										height : 200
									}), new Ext.Panel({
								region : 'center',
								layout : 'fit',
								border : false,
								bodyStyle : 'background-color:#dfe8f6; padding:10px 10px 0px 0px;',
								items : [new IsmpHB.crmOrderInfo.AddProductAttrPanel(
										{})]
							})]
				})]
			}), new IsmpHB.crmOrderInfo.AddProductSearchPanel({
						region : 'center'
					})]
		})]
	})]
});

// 填充订购信息弹出框内容
IsmpHB.crmOrderInfo.showView = function(grid, rowIndex, colIndex) {
	var r = Ext.StoreMgr.get('uniteOrderUser').getAt(rowIndex);
	productForm.get('tel').setValue(r.data.tel);
	productForm.get('name').setValue(r.data.name);
	productForm.get('nodeCode').setValue(IsmpHB.renderer
			.CITYlIST(r.data.nodeCode));
	productForm.get('hbPackageDesc').setValue(r.data.hbPackageDesc);
	productForm.get('productSpecName').setValue(r.data.productSpecName);
	productForm.get('crmPackageDesc').setValue(r.data.crmPackageDesc);
	productForm.get('chargeType').setValue(IsmpHB.renderer
			.CHARGETYPE(r.data.chargeType));
	productForm.get('source').setValue(IsmpHB.renderer
			.ORDER_SOURCE(r.data.source));
	productForm.get('startTime').setValue(r.data.startTime.split(' ')[0]);
	productForm.get('endTime').setValue(r.data.endTime.split(' ')[0]);
	productForm.get('status').setValue(IsmpHB.renderer
			.ORDER_USER_STATUS_SIMPLE(r.data.status));
	productForm.get('usageFlag').setValue(IsmpHB.renderer
			.USAGE_FLAG(r.data.usageFlag));
	productForm.get('name').setValue(r.data.name);
	productForm.get('createTime').setValue(r.data.createTime.split(' ')[0]);
	productForm.get('updateTime').setValue(r.data.updateTime.split(' ')[0]);
	productForm.get('operator').setValue(r.data.operator);
	IsmpHB.crmOrderInfo.productDlg.show();
}

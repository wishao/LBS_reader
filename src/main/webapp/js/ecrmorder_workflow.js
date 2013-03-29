/**
 * @author
 */
Ext.namespace('IsmpHB', 'IsmpHB.ecrmorderworkflow');

IsmpHB.ecrmorderworkflow.WorkflowTree = Ext.extend(Ext.tree.TreePanel, {
			useArrows : true,
			autoScroll : true,
			animate : false,
			enableDD : true,
			containerScroll : true,
			collapsible : false,
			border : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : IsmpHB.req.ZQWORKFLOW_QUERY,
						preloadChildren : true,
						baseParams : {
							timestamp : new Date().valueOf(),
							orderId : 0
						}
					}),
			root : {
				text : ' '
			},
			rootVisible : false,
			CUR_ORDER_ID : -1,
			UN_LOAD : true,

			constructor : function(config) {
				config = config || {};
				IsmpHB.ecrmorderworkflow.WorkflowTree.superclass.constructor
						.apply(this, arguments);

				this.getLoader().on("beforeload", function(treeLoader, node) {
							if (this.UN_LOAD) {
								this.UN_LOAD = false;
								treeLoader.baseParams.orderId = this.CUR_ORDER_ID;
							} else {
								return false;
							}
						}, this);
				this.getLoader().on('load', function(tree, node, r) {
							this.expandAll();
						}, this);
			},
			reload : function() {
				this.getLoader().load(this.root, function() {
							this.expandAll();
						}, this);
			},
			listeners : {
				click : function(node) {
					if (node.attributes.qtip == undefined) {
						return;
					}
					Ext.Msg.alert(node.attributes.text, node.attributes.qtip);
				}
			}
		});

IsmpHB.ecrmorderworkflow.WorkflowTreeDlg = Ext.extend(Ext.Window, {
			title : '查看流程',
			layout : 'fit',
			modal : true,
			width : 425,
			height : 280,
			constrainHeader : true,
			closeAction : 'hide',

			tree : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.tree = new IsmpHB.ecrmorderworkflow.WorkflowTree({});
				config.items.push(this.tree);
				IsmpHB.ecrmorderworkflow.WorkflowTreeDlg.superclass.constructor
						.apply(this, arguments);

				this.on('show', function() {
							this.tree.reload();
						}, this);
				this.on('hide', function() {
							this.tree.UN_LOAD = true;
						}, this);
			},
			setOrderId : function(id) {
				this.tree.CUR_ORDER_ID = id;
			}
		});
IsmpHB.ecrmorderworkflow.basicItemForm = Ext.extend(Ext.form.FormPanel, {
			title : '基本信息',
			labelWidth : 100,
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			bodyStyle : 'padding:5px 10px 5px 10px;',
			oldParam : 0,
			layout : 'column',

			orderTypeField : new Ext.form.TextField({
						fieldLabel : '工单类型',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			businessTypeField : new Ext.form.TextField({
						fieldLabel : '业务类型',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			interStateField : new Ext.form.TextField({
						fieldLabel : '本地网标识',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			orderIdField : new Ext.form.TextField({
						fieldLabel : '工单号',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			oldProductTypeField : new Ext.form.TextField({
						fieldLabel : '旧产品类型',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			serviceIdField : new Ext.form.TextField({
						fieldLabel : '服务编码',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			ibOrderNumField : new Ext.form.TextField({
						fieldLabel : '工单流水号',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			newProductTypeField : new Ext.form.TextField({
						fieldLabel : '新产品类型',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			orderStatusField : new Ext.form.TextField({
						fieldLabel : '订单标识',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			
			linkMenField : new Ext.form.TextField({
						fieldLabel : '联系人',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			linkTelField : new Ext.form.TextField({
						fieldLabel : '联系电话',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			discNameField : new Ext.form.TextField({
						fieldLabel : '套餐名称',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			remarkField : new Ext.form.TextField({
						fieldLabel : '备注',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				config.items.push([{
					layout : 'form',
					bodyBorder : false,
					items : [this.orderTypeField, this.businessTypeField,
							this.interStateField,this.linkMenField,this.remarkField]
				}, {
					layout : 'form',
					bodyBorder : false,
					items : [this.orderIdField, this.oldProductTypeField,
							this.serviceIdField,this.linkTelField]
				}, {
					layout : 'form',
					bodyBorder : false,
					items : [this.ibOrderNumField, this.newProductTypeField,
							this.orderStatusField,this.discNameField]
				}]);
				IsmpHB.ecrmorderworkflow.basicItemForm.superclass.constructor
						.apply(this, arguments);

			},
			setValue : function(o) {
				if (null != o.orderType) {
					this.orderTypeField.setValue(o.orderType);
				}
				if (null != o.businessType) {
					this.businessTypeField.setValue(o.businessType);
				}
				if (null != o.interState) {
					this.interStateField.setValue(o.interState);
				}
				if (null != o.orderId) {
					this.orderIdField.setValue(o.orderId);
				}
				if (null != o.oldProductType) {
					this.oldProductTypeField.setValue(o.oldProductType);
				}
				if (null != o.serviceId) {
					this.serviceIdField.setValue(o.serviceId);
				}
				if (null != o.ibOrderNum) {
					this.ibOrderNumField.setValue(o.ibOrderNum);
				}
				if (null != o.newProductType) {
					this.newProductTypeField.setValue(o.newProductType);
				}
				if (null != o.orderStatus) {
					this.orderStatusField.setValue(o.orderStatus);
				}
				if (null != o.linkMen) {
					this.linkMenField.setValue(o.linkMen);
				}if (null != o.linkTel) {
					this.linkTelField.setValue(o.linkTel);
				}
				if (null != o.discName) {
					this.discNameField.setValue(o.discName);
				}
				if (null != o.remark) {
					this.remarkField.setValue(o.remark);
				}
			}
		});
IsmpHB.ecrmorderworkflow.workFlowItemForm = Ext.extend(Ext.form.FormPanel, {
			title : '流程信息',
			labelWidth : 100,
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			bodyStyle : 'padding:5px 10px 5px 10px;',
			oldParam : 0,
			layout : 'column',

			orderStatueField : new Ext.form.TextField({
						fieldLabel : '工单状态',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			receiveTimeField : new Ext.form.TextField({
						fieldLabel : '接收时间',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			returnOrderStatusField : new Ext.form.TextField({
						fieldLabel : '业务回单结果',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			crmreturnOrderStatusField : new Ext.form.TextField({
						fieldLabel : 'CRM回单反馈',
						style : "color:black",
						readOnly : true,
						width : 200
					}),
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				config.items.push([{
							layout : 'form',
							bodyBorder : false,
							items : [this.orderStatueField,
									this.receiveTimeField]
						}, {
							layout : 'form',
							bodyBorder : false,
							items : [this.returnOrderStatusField,
									this.crmreturnOrderStatusField]
						}]);
				IsmpHB.ecrmorderworkflow.workFlowItemForm.superclass.constructor
						.apply(this, arguments);

			},
			setValue : function(o) {
				this.orderStatueField.setValue(IsmpHB.renderer
						.ECRM_SERVICE_STATUS(o[1]));
				this.receiveTimeField.setValue(IsmpHB.renderer
						.ECRM_CREATETIME(o[2]));
				this.returnOrderStatusField.setValue(o[3]);
				this.crmreturnOrderStatusField.setValue(IsmpHB.renderer
						.ECRM_RETURNSTRING(o[4]));
			}
		});
IsmpHB.ecrmorderworkflow.productItemForm = Ext.extend(Ext.Panel, {
			title : '产品属性',
			id : 'productString',
			height : 212,
			autoScroll : true,// 自动显示滚动条
			bodyPadding : 5
		});
IsmpHB.ecrmorderworkflow.productItemDlg = Ext.extend(Ext.Window, {
	title : '相关信息',
	autoScroll : true,
	modal : true,
	width : 1000,
	height : 445,
	constrainHeader : true,
	closeAction : 'hide',

	basicconfigForm : null,
	workFlowconfigForm : null,
	productconfigForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.basicconfigForm = new IsmpHB.ecrmorderworkflow.basicItemForm({});
		this.workFlowconfigForm = new IsmpHB.ecrmorderworkflow.workFlowItemForm(
				{});
		this.productconfigForm = new IsmpHB.ecrmorderworkflow.productItemForm(
				{});
		config.items.push([this.basicconfigForm, this.workFlowconfigForm,
				this.productconfigForm]);
		IsmpHB.ecrmorderworkflow.productItemDlg.superclass.constructor.apply(
				this, arguments);
	},
	showProduct : function(data) {
		var req = {
			url : IsmpHB.req.ECRM_ORDERWORKFLOW_PRODUCT,
			params : {
				timestamp : new Date().valueOf(),
				crm_sourceString : data[0]
			},
			scope : this,
			callback : function(o) {
				this.basicconfigForm.setValue(o.basicInfo);
				this.workFlowconfigForm.setValue(data);
				this.productconfigForm.body.update(o.productString)
			}
		};
		IsmpHB.Ajax.send(req);
	}

});
// 存放列表环节表格
// TODO
IsmpHB.ecrmorderworkflow.linkDataGrid = Ext.extend(Ext.grid.GridPanel, {
			autoScroll : true,
			store : Ext.StoreMgr.get('ecrm_order_action'),
			autoHeight : true,
			cls : 'box-dataGrid',
			constructor : function(config) {
				config = config || {};
				// this.store=Ext.StoreMgr.get('ecrm_order_action');
				this.cm = new Ext.grid.ColumnModel([{
							header : '环节名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'name',
							width : 119
						}, {
							header : '环节状态',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'status',
							renderer : IsmpHB.renderer.ECRM_ACTION_STATUS,
							width : 80
						}, {
							header : '创建时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'createTime',
							width : 135
						}, {
							header : '完成时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'updateTime',
							width : 135
						}, {
							header : '备注',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'memo',
							width : 260
						}, {
							header : '耗时',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'timecost',
							width : 55
						}, {
							header : '失败原因',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'exceptionCase',
							width : 147
						}, {
							header : '重复次数',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'retryTimes',
							width : 65
						}]);
				IsmpHB.ecrmorderworkflow.linkDataGrid.superclass.constructor
						.apply(this, arguments);
				this.on('show', function() {
						}, this);
			}
		});
// 存放环节列表的面板
// TODO
IsmpHB.ecrmorderworkflow.linkDataPanel = Ext.extend(Ext.Panel, {
			labelWidth : 80,
			title : "环节列表",
			hideLabels : false,
			labelAlign : "right",
			layout : 'form',
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.linkDataGrid = new IsmpHB.ecrmorderworkflow.linkDataGrid(
						{});
				this.linkDataGrid.getStore().baseParams = {
					orderId : config.orderId
				}
				this.linkDataGrid.getStore().load({
							params : {
								timestamp : new Date().valueOf(),
								start : 0
							},
							callback : function(r, o, s) {
							},
							scope : this
						});
				config.items.push([this.linkDataGrid]);
				IsmpHB.ecrmorderworkflow.linkDataPanel.superclass.constructor
						.apply(this, arguments);
				this.on('show', function() {
						})
			}
		});
// 存放流程信息
// zzx TODO
IsmpHB.ecrmorderworkflow.workFlowPanel = Ext.extend(Ext.Panel, {
			labelWidth : 80,
			title : "流程图",
			hideLabels : false,
			labelAlign : "right",
			layout : 'form',
			tree : null,
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.tree = new IsmpHB.ecrmorderworkflow.WorkflowTree({});
				this.tree.autoDestroy = false;
				config.items.push([this.tree]);
				IsmpHB.ecrmorderworkflow.workFlowPanel.superclass.constructor
						.apply(this, arguments);
				this.on('show', function(tab) {
							this.tree.reload();
						})
			},
			setOrderId : function(id) {
				this.tree.CUR_ORDER_ID = id;
			}
		});
// 存放相关信息的面板
// TODO
IsmpHB.ecrmorderworkflow.releInfoPanel = Ext.extend(Ext.Panel, {
	labelWidth : 80,
	title : "相关信息",
	hideLabels : false,
	labelAlign : "right",
	layout : 'form',
	basicconfigForm : null,
	workFlowconfigForm : null,
	productconfigForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.basicconfigForm = new IsmpHB.ecrmorderworkflow.basicItemForm({});
		this.workFlowconfigForm = new IsmpHB.ecrmorderworkflow.workFlowItemForm(
				{});
		this.productconfigForm = new IsmpHB.ecrmorderworkflow.productItemForm(
				{});
		config.items.push([this.basicconfigForm, this.workFlowconfigForm,
				this.productconfigForm]);
		IsmpHB.ecrmorderworkflow.releInfoPanel.superclass.constructor.apply(
				this, arguments);
	},
	showReleInfo : function(data) {
		var req = {
			url : IsmpHB.req.ECRM_ORDERWORKFLOW_PRODUCT,
			params : {
				timestamp : new Date().valueOf(),
				crm_sourceString : data[0]
			},
			scope : this,
			callback : function(o) {
				this.basicconfigForm.setValue(o.basicInfo);
				this.workFlowconfigForm.setValue(data);
				if (this.productconfigForm.body) {
					this.productconfigForm.body.update(o.productString)
				}
			}
		};
		IsmpHB.Ajax.send(req);
	}
});
// 选择面板
IsmpHB.ecrmorderworkflow.infoTabPanel = Ext.extend(Ext.TabPanel, {
			id : 'mytab', // 添加一个id
			activeTab : 0,// 默认激活第一个tab页
			width : 1000,
			height : 445,
			layoutOnTabChange : true, // 显示不了问题
			collapsible : false
		});
// 信息窗口
// TODO
IsmpHB.ecrmorderworkflow.infoDetailsDlg = Ext.extend(Ext.Window, {
			autoScroll : true,
			modal : true,
			width : 1014,
			height : 480,
			title : '流程信息',
			constrainHeader : true,
			closeAction : 'hide',
			infoTabPanel : null,
			releInfoPanel : null,
			linkDataPanel : null,
			workFlowPanel : null,
			closeAction : 'hide',

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.infoTabPanel = new IsmpHB.ecrmorderworkflow.infoTabPanel(
						{});
				this.releInfoPanel = new IsmpHB.ecrmorderworkflow.releInfoPanel(
						{});
				this.linkDataPanel = new IsmpHB.ecrmorderworkflow.linkDataPanel(
						{
							"orderId" : config.orderId
						});
				this.workFlowPanel = new IsmpHB.ecrmorderworkflow.workFlowPanel(
						{});
				config.items.push([this.infoTabPanel]);
				IsmpHB.ecrmorderworkflow.infoDetailsDlg.superclass.constructor
						.apply(this, arguments);
				this.on('hide', function() {
							this.workFlowPanel.tree.UN_LOAD = true;
						})
				this.on('show', function() {
						})
			},
			showInfo : function(data, id) {
				this.releInfoPanel.showReleInfo(data);
				Ext.getCmp('mytab').add(this.workFlowPanel);
				Ext.getCmp('mytab').add(this.releInfoPanel);
				this.workFlowPanel.setOrderId(id);
				this.workFlowPanel.show();
				Ext.getCmp('mytab').add(this.linkDataPanel);
			}
		});
IsmpHB.ecrmorderworkflow.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '工单流程管理',
	autoScroll : true,
	store : Ext.StoreMgr.get('zqorder'),
	cls : 'box-dataGrid',
	viewConfig : {
		templates : {
			cell : new Ext.Template(
					'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
					'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
					'</td>')
		}
	},
	productCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '产品名称',
				displayField : 'name',
				valueField : 'id',
				width : 130,
				forceSelection : false,
				displayText : '所有产品',
				store : IsmpHB.store.ECRMSUPPRODUCTBYTYPE,
				listeners : {
					"focus" : function() {
						this.getStore().load();
					}
				}
			}),

	stypeCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择业务类型',
				displayField : 'name',
				valueField : 'id',
				width : 130,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['001', '新装'], ['002', '停机'],
									['003', '复机'], ['004', '变更资料'],
									['005', '拆机'], ['006', '改关联产品接入号'],
									['007', '优惠申请'], ['008', '优惠取消'],
									['009', '优惠变更'], ['020', '单机加入群'],
									['021', '单机退出群'], ['022', '改付费号码']]
						})
			}),
	statusCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择工单状态',
				displayField : 'name',
				valueField : 'id',
				width : 135,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['-1', '异常'], ['-3', '超时'],
									['0', '处理中'], ['4', '等待业务平台回单'],
									['2', '完成'], ['3', '结束'],['5','业务平台异常']]
						})
			}),
	dbField : new Ext.form.DateField({
		id : 'createDate',
		fieldLabel : '创建日期',
		emptyText : '创建日期',
		editable : false,
		format : 'Y-m-d',
		width : 120,
		allowBlank : false
			// value:new Date().add(Date.DAY, -2)
		}),
	ddField : new Ext.form.DateField({
		id : 'updateDate',
		fieldLabel : '截至日期',
		emptyText : '截至日期',
		editable : false,
		format : 'Y-m-d',
		width : 120,
		allowBlank : false
			// value:new Date()
		}),
		custIdField : new Ext.form.TextField( {
			emptyText : '客户ID',
			maxLength : 20,
			msgTarget : 'side',
			width : 120
		}),
		custNameField : new Ext.form.TextField({
			emptyText : '客户名称',
			maxLength : 30,
			msgTarget : 'side',
			width : 120
		}),
	cityCombo : new Ext.form.ComboBox({
				emptyText : '地市',
				displayField : 'name',
				valueField : 'areaCode',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : IsmpHB.store.CITY_GD,
				width : 90
			}),
	prodAccessNumField : new Ext.form.TextField({
				emptyText : '产品接入号',
				maxLength : 110,
				msgTarget : 'side',
				width : 150
			}),
	crmOrderIdField : new Ext.form.TextField({
				emptyText : '工单号',
				maxLength : 110,
				msgTarget : 'side',
				width : 180
			}),
	serviceNumField : new Ext.form.TextField({
				emptyText : '服务编码',
				maxLength : 110,
				msgTarget : 'side',
				width : 160
			}),
	returnCRMType : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '选择受理结果',
				displayField : 'name',
				valueField : 'id',
				width : 100,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['1', '收到处理'], ['2', '未收到处理']]
						})
			}),
	orderSource : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '选择工单渠道',
				displayField : 'name',
				valueField : 'id',
				width : 80,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['18', 'SPS'], ['23', 'CRM'],
									['30', 'ICRM']]
						})
			}),
	searchBtn : new Ext.Button({
				text : '搜索',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				cls : 'btn-common-wide btn-common'
			}),
	normalReplyCrmBtn : new Ext.Button({
				text : '正常回单',
				cls : 'btn-common-wide btn-common'
			}),
	unusualReplyCrmBtn : new Ext.Button({
				text : '异常回单',
				cls : 'btn-common-wide btn-common'
			}),
	relevantInfoBtn : new Ext.Button({
				text : '详情',
				cls : 'btn-common-wide btn-common'
			}),
	sendToBusinessBtn : new Ext.Button({
				text : '重派',
				cls : 'btn-common-wide btn-common'
			}),
	replyCrmBtn : new Ext.Button({
				text : '手工回单',
				cls : 'btn-common-wide btn-common'
			}),
	redoBtn : new Ext.Button({
				text : '重做所选工单 ',
				iconCls : 'btn-redo',
				cls : 'btn-common-wide btn-common'
			}),
	changeStatusBtn : new Ext.Button({
				text : '结束工单',
				iconCls : 'btn-changeStatus',
				cls : 'btn-common-wide btn-common'
			}),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		
		if ('3' == record.data.status) {
			return '<img src="images/not-allowed.png" qtip="该工单异常，不能再操作" class="oper_not_allowed"/>';
		}else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	},
	constructor : function(config) {
		this.dlg = new IsmpHB.ecrmorderworkflow.WorkflowTreeDlg({});
		this.productdlg = new IsmpHB.ecrmorderworkflow.productItemDlg({});
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};
		config.tbar = config.tbar || [];
		Ext.override(Ext.menu.DateMenu, {
					autoWidth : function() {
						var el = this.el, ul = this.ul;
						if (!el) {
							return;
						}
						var w = this.width;
						if (w) {
							el.setWidth(w);
						} else if (Ext.isIE && !Ext.isIE6) {
							el.setWidth(this.minWidth);
							var t = el.dom.offsetWidth; // force recalc
							el.setWidth(ul.getWidth() + el.getFrameWidth("lr"));
						}
					}
				});
		var a = IsmpHB.common.getPermission('10-2');
		var arr = [];
		if (IsmpHB.common.isHasPermission(a, 1)) {
			arr.push(this.searchBtn);
			arr.push(this.resetBtn);
		}
		arr.push('->');
		if (IsmpHB.common.isHasPermission(a, 19)) {
			arr.push(this.normalReplyCrmBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 20)) {
			arr.push(this.unusualReplyCrmBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 15)) {
			arr.push(this.relevantInfoBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 16)) {
			arr.push(this.sendToBusinessBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 17)) {
			arr.push(this.replyCrmBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 11)) {
			arr.push(this.redoBtn);
		}
		// if (IsmpHB.common.isHasPermission(a, 3)) {
		// arr.push(this.changeStatusBtn);
		// }
		var nc = IsmpHB.common.getSession("loginInfo").nodeCode;
		config.tbar.push(new Ext.Panel({
					autoScroll : true,
					autoWidth : true,
					border : false,
					items : [{
						xtype : 'toolbar',
						border : false,
						items : ['客户ID:',this.custIdField,'客户名称：',this.custNameField,'地市：', this.cityCombo,
						         '产品名称：', this.productCombo, '业务类型：',this.stypeCombo]
					}, {
						xtype : 'toolbar',
						border : false,
						items : ['产品接入号：', this.prodAccessNumField, '工单号：',
								this.crmOrderIdField,'工单状态：', this.statusCombo,
								'服务编码：',this.serviceNumField]
					}, {
						xtype : 'toolbar',
						border : false,
						items : ['受理结果：', this.returnCRMType, '工单渠道：',
								this.orderSource, 
								'创建日期：', this.dbField, '截至日期：', this.ddField]
					}, {
						xtype : 'toolbar',
						border : false,
						items : [arr]
					}]
				}));
		config.bbar = this.pagingbar;
		this.returnCRMType.on('collapse', function() {
					if (this.returnCRMType.getValue() == 1) {
						this.store.filterBy(function(record, id) {
									if (record.get('returnCRM') != "未收到处理") {
										return true;
									}
								});
					} else if (this.returnCRMType.getValue() == 2) {
						this.store.filterBy(function(record, id) {
									if (record.get('returnCRM') == "未收到处理") {
										return true;
									}
								});
					} else {
						this.store.clearFilter('returnCRM', true);
						return true;
					}
				}, this);
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm,{
			header : '客户ID',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'custId',
			width : 80
		},{
			header : '客户名称',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'custName',
			width : 120
		}, {
							header : 'CRM工单号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'crm_order_id',
							width : 200
						}, {
							header : 'CRM串',
							align : 'left',
							menuDisabled : true,
							hidden : true,
							dataIndex : 'crm_sourceString',
							width : 200
						}, {
							header : '业务类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'serviceType',
							renderer : IsmpHB.renderer.ECRM_SERVICE_TYPE,
							width : 80
						}, {
							header : '服务编号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'service_number',
							width : 200
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'status',
							renderer : IsmpHB.renderer.ECRM_ORDER_STATUS,
							width : 100
						}, {
							xtype : 'actioncolumn',
							header : '流程图',
							align : 'center',
							width : 50,
							items : [{
								icon : 'images/dept.png',
								tooltip : '查看流程图',
								handler : this.showWorkFlow
										.createDelegate(this)
							}]
						}, {
							xtype : 'actioncolumn',
							header : '详情',
							align : 'center',
							width : 50,
							hidden : true,
							items : [{
										icon : 'images/dept.png',
										tooltip : '查看流程图',
										handler : this.showDetails
												.createDelegate(this)
									}]
						}, {
							header : '产品接入号',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'productAccessNumber',
							width : 120
						}, {
							header : '产品编号',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'productId',
							width : 70
						}, {
							header : '产品名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'productName',
							width : 120
						},{
                            header : '工单渠道',
                            align : 'center',
                            menuDisabled : true,
                            dataIndex : 'source',
                            renderer : IsmpHB.renderer.ECRM_ORDER_SOURCE_RENDERER,
                            width : 70
                        }, {
							header : '所属地市',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'areaCode',
							renderer : IsmpHB.renderer.CITYCOBO,
							width : 70
						}, {
							header : '创建日期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'createTime',
							width : 100
						}, {
							header : '更新日期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'updateTime',
							width : 100
						}, {
							header : '处理结果',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'returnCRM',
							width : 200
						}, {
                            header : '处理结果原串',
                            align : 'left',
                            menuDisabled : true,
                            hidden:true,
                            dataIndex : 'returnCRMString',
                            width : 200
                        }, {
							header : '回单反馈',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'returnFromCRM',
							width : 200
						}]);
		IsmpHB.ecrmorderworkflow.DataGrid.superclass.constructor.apply(this,
				arguments);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
		this.relevantInfoBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelections();
					if (rs.length == 0) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					} else if (rs.length > 1) {
						Ext.MessageBox.alert('提示', '只能选择一条记录进行查看！', null, this);
						return;
					} else {
						var arrayObj = new Array();
						arrayObj.push(rs[0].data.crm_sourceString);
						arrayObj.push(rs[0].data.status);
						arrayObj.push(rs[0].data.createTime);
						arrayObj.push(rs[0].data.returnCRM);
						arrayObj.push(rs[0].data.crmReturnString);
						this.productdlg.show();
						this.productdlg.showProduct(arrayObj);
					}
				}, this);
		this.sendToBusinessBtn.on('click', function() {
					var r = this.getSelectionModel().getSelections();
					if (r.length < 0) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					for (var i = 0; i < r.length; i++) {
						var mediaArray = ['045', '048', '049', '050', '051',
								'052', '053', '054', '055', '056', '057',
								'058', '059', '060', '061', '062', '063'];
						for (a in mediaArray) {
							if (mediaArray[a] == r[i].data.productId) {
								Ext.MessageBox.alert('提示', '工单号为:'
												+ r[i].data.crm_order_id
												+ '的工单为传媒类业务,没有业务平台,没有重派功能',
										null, this);
								return;
							}
						}
						if (r[i].data.status == '2') {
							Ext.MessageBox.alert('提示', '工单已完成，不能发送给业务平台！',
									null, this);
							return;
						}
					};
					Ext.MessageBox.confirm("提示", "确认要发送给业务平台吗？", function(id) {
								if (id == "yes") {
									this.sendToBusinessItems();
								}
							}, this);
				}, this);
		this.normalReplyCrmBtn.on('click', function() {
					var r = this.getSelectionModel().getSelections();
					if (r.length == 0) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					};
					for (var i = 0; i < r.length; i++) {

						if (r[i].data.status == '2') {
							Ext.MessageBox.alert('提示', '工单号为:'
											+ r[i].data.crm_order_id
											+ '的工单已经完成,不能手工正常回单', null, this);
							return;
						}
						if (r[i].data.returnCRM != '未收到处理') {
							Ext.MessageBox.alert('提示', '工单号为:'
											+ r[i].data.crm_order_id
											+ '的工单已经收到业务平台处理结果,不能手工正常回单', null,
									this);
							return;
						}
					};
					Ext.MessageBox.confirm("提示",
							"回单后该工单在MBOSS竣工,会影响计费,确认要正常回单吗？", function(id) {
								if (id == "yes") {
									this.replyCrmItems("normalReplyCrm");
								}
							}, this);
				}, this);
		this.unusualReplyCrmBtn.on('click', function() {
					var r = this.getSelectionModel().getSelections();
					if (r.length == 0) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					};
					for (var i = 0; i < r.length; i++) {

						if (r[i].data.status == '2') {
							Ext.MessageBox.alert('提示', '工单号为:'
											+ r[i].data.crm_order_id
											+ '的工单已经完成,不能手工正常回单', null, this);
							return;
						}
						if (r[i].data.returnCRM != '未收到处理') {
							Ext.MessageBox.alert('提示', '工单号为:'
											+ r[i].data.crm_order_id
											+ '的工单已经收到业务平台处理结果,不能手工正常回单', null,
									this);
							return;
						}
					};
					Ext.MessageBox.confirm("提示",
							"回单后该工单在MBOSS竣工,会影响计费,确认要异常回单吗？", function(id) {
								if (id == "yes") {
									this.replyCrmItems("unusualReplyCrm");
								}
							}, this);
				}, this);
		this.replyCrmBtn.on('click', function() {
					var r = this.getSelectionModel().getSelected();
					if (null == r) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					if (r.data.status == '2') {
						Ext.MessageBox
								.alert('提示', '工单已完成，不能回复CRM！', null, this);
						return;
					}
					Ext.MessageBox.confirm("提示", "确认要回复CRM吗？", function(id) {
								if (id == "yes") {
									this.replyCrmItems("replyCrm");
								}
							}, this);
				}, this);
		this.redoBtn.on('click', function() {
					var r = this.getSelectionModel().getSelected();
					if (null == r) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					if (r.data.status == '2') {
						Ext.MessageBox.alert('提示', '工单已完成，不能重做！', null, this);
						return;
					}
					Ext.MessageBox.confirm("提示", "确认要重做所选工单吗？", function(id) {
								if (id == "yes") {
									this.redoItems();
								}
							}, this);
				}, this);
		this.changeStatusBtn.on('click', function() {
					var r = this.getSelectionModel().getSelected();
					if (null == r) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					if (r.data.status == '2') {
						Ext.MessageBox.alert('提示', '工单已完成，不能更新状态！', null, this);
						return;
					}
					Ext.MessageBox.confirm("提示", "确认要更新所选工单的状态吗？",
							function(id) {
								if (id == "yes") {
									this.changeItemsStatus();
								}
							}, this);
				}, this);
	},
	resetAllConditions : function() {
		this.productCombo.reset();
		this.stypeCombo.reset();
		this.statusCombo.reset();
		this.dbField.reset();
		this.ddField.reset();
		this.prodAccessNumField.reset();
		this.crmOrderIdField.reset();
		this.serviceNumField.reset();
		this.cityCombo.reset();
		this.returnCRMType.reset();
		this.custIdField.reset();
		this.custNameField.reset();
	},
	showWorkFlow : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		if (null != r) {
			this.dlg.setOrderId(r.data.id);
			this.dlg.show();
		}
	},
	// TODO
	showDetails : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		var arrayObj = new Array();
		arrayObj.push(r.data.crm_sourceString);
		arrayObj.push(r.data.status);
		arrayObj.push(r.data.createTime);
		arrayObj.push(r.data.returnCRM);
		arrayObj.push(r.data.crmReturnString);
		if (null != r) {
			this.infoDetailsdlg = new IsmpHB.ecrmorderworkflow.infoDetailsDlg({
						"orderId" : r.data.id
					});
			this.infoDetailsdlg.showInfo(arrayObj, r.data.id);
			this.infoDetailsdlg.show();
		}
	},
	loadItems : function(s, l) {
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : s || 0,
						limit : l || this.pagingbar.pageSize
					},
					callback : function(r, o, s) {
					},
					scope : this
				});
	},
	searchItems : function(name) {
		var create_time = "";
		if (this.dbField.getValue().length != 0) {
			create_time = this.dbField.getValue().format('Y-m-d H:i:s');
		}
		var update_time = "";
		if (this.ddField.getValue().length != 0) {
			update_time = this.ddField.getValue().format('Y-m-d H:i:s')
		}
		var dateValid = IsmpHB.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('搜索条件有误', '创建日期不能在更新日期之后，请修正！', null, this);
			return;
		}
		if(this.custIdField.getValue() != ''){			
			var reg = /^\+?[1-9][0-9]*$/ ;				
			if(!reg.test(this.custIdField.getValue())){
				Ext.MessageBox.alert('搜索条件有误', '客户ID要填写正整数，请修正！', null, this);
				return;				
			}			
		}
		this.getStore().baseParams = {
			method : 'search',
			productId : this.productCombo.getValue(),
			service_type : this.stypeCombo.getValue(),
			status : this.statusCombo.getValue(),
			create_time : create_time,
			update_time : update_time,
			prodAccessNum : this.prodAccessNumField.getValue(),
			crmOrderId : this.crmOrderIdField.getValue(),
			serviceNum : this.serviceNumField.getValue(),
			areaCode : this.cityCombo.getValue(),
			returnCRM : this.returnCRMType.getValue(),
			source : this.orderSource.getValue(),
			custId : this.custIdField.getValue(),
			custName : this.custNameField.getValue()
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {
						if (this.store.getTotalCount() > 0) {
							if (this.returnCRMType.getValue() == 1) {
								this.store.filterBy(function(record, id) {
											if (record.get('returnCRM') != "未收到处理") {
												return true;
											}
										});
							} else if (this.returnCRMType.getValue() == 2) {
								this.store.filterBy(function(record, id) {
											if (record.get('returnCRM') == "未收到处理") {
												return true;
											}
										});
							} else {
								this.store.clearFilter('returnCRM', true);
								return true;
							}
						}
					},
					scope : this
				});
	},
	sendToBusinessItems : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						crmSrcString : rs[i].data.crm_sourceString
					});
		}
		var req = {
			url : IsmpHB.req.SENDTOBUSINESS,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '操作成功！', function() {
								this.store.reload();
							}, this);
				} else {
					Ext.MessageBox.alert('提示', o.message, function() {
								this.store.reload();
							}, this);
				}

			},
			scope : this
		};
		IsmpHB.Ajax.send(req);
	},
	replyCrmItems : function(replyStatus) {
		var hanlder = IsmpHB.common.getSession("loginInfo").name;
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						crmOrderId : rs[i].data.crm_order_id,
						crmSrcString : rs[i].data.crm_sourceString,
						replytoCrmString : rs[i].data.returnCRMString,
						orderSource : rs[i].data.source
					});
		}
		var req = {
			url : IsmpHB.req.REPLYCRM,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps),
				hanlder : hanlder,
				replyStatus : replyStatus
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '操作成功！', null, this);
				} else {
					Ext.MessageBox.alert('提示', o.message, null, this);
				}
			},
			scope : this
		};
		IsmpHB.Ajax.send(req);
	},
	redoItems : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						id : rs[i].data.id
					});
		}
		var req = {
			url : IsmpHB.req.ECRMORDER_REDO,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				Ext.MessageBox.alert('提示', '操作成功！', function() {
							this.store.reload();
						}, this);
			},
			scope : this
		};
		IsmpHB.Ajax.send(req);
	},
	changeItemsStatus : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						id : rs[i].data.id
					});
		}
		var req = {
			url : IsmpHB.req.ECRMORDER_CHANGESTATUS,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				this.store.reload();
			}
		};
		IsmpHB.Ajax.send(req);
	}
});

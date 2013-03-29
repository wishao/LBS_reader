/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.orderworkflow');

LBSReader.orderworkflow.WorkflowTree = Ext.extend(Ext.tree.TreePanel, {
			useArrows : true,
			autoScroll : true,
			animate : false,
			enableDD : true,
			containerScroll : true,
			collapsible : false,
			border : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : LBSReader.req.WORKFLOW_QUERY,
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
				LBSReader.orderworkflow.WorkflowTree.superclass.constructor
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

LBSReader.orderworkflow.WorkflowTreeDlg = Ext.extend(Ext.Window, {
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
				this.tree = new LBSReader.orderworkflow.WorkflowTree({});
				config.items.push(this.tree);
				LBSReader.orderworkflow.WorkflowTreeDlg.superclass.constructor
						.apply(this, arguments);

				this.on('show', function() {
							this.tree.reload();
						}, this);
				this.on('hide', function() {
					this.tree.UN_LOAD = true;
						// this.tree.root.removeAll();
					}, this);
			},
			setOrderId : function(id) {
				this.tree.CUR_ORDER_ID = id;
			}
		});

LBSReader.orderworkflow.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '工单流程管理',
	autoScroll : true,
	store : Ext.StoreMgr.get('order'),
	cls : 'box-dataGrid',

	telField : new Ext.form.TextField({
				emptyText : '客户电话',
				maxLength : 100,
				msgTarget : 'side',
				width : 100,
				regex : new RegExp('^([0-9]{10,12})$'),
				regexText : '所填号码不合法'
			}),
	nameField : new Ext.form.TextField({
				emptyText : '客户姓名',
				maxLength : 100,
				msgTarget : 'side',
				width : 100
			}),
	stypeCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择操作类型',
				displayField : 'name',
				valueField : 'id',
				width : 110,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['add', '新增'], ['upd', '修改'],
									['rmv', '拆机']]
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
				width : 110,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['-1', '异常'], ['-3', '超时'],
									['0', '处理中'], ['1', '等待中'], ['2', '完成'],
									['3', '结束']]
						})
			}),
	// hbCodeField : new Ext.form.TextField({
	// emptyText : '号百的产品包编码',
	// maxLength : 100,
	// msgTarget : 'side',
	// width : 220
	// }),
	// hbNameField : new Ext.form.TextField({
	// emptyText : '号百的产品包名称',
	// maxLength : 100,
	// msgTarget : 'side',
	// width : 170
	// }),
	hbPkgField : new Ext.form.ComboBox({
				allowBlank : true,
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				emptyText : '请选择产品包',
				displayField : 'name',
				valueField : 'id',
				width : 200,
				store : Ext.StoreMgr.get('packageall'),
				displayText : '所有产品包',
				listeners : {
					"focus" : function() {
						this.getStore().load({
									callback : function(r, o, s) {
										if (!s) {
											Ext.MessageBox.alert('提示',
													'加载超时，请稍后重试');
										}
									},
									scope : this
								});
					}
				}
			}),
	cityCombo : new Ext.form.ComboBox({
				emptyText : '地市',
				displayField : 'name',
				valueField : 'nodeCode',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : LBSReader.store.CITY_GD,
				width : 90
			}),
	srcCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择工单渠道',
				displayField : 'name',
				valueField : 'id',
				width : 110,
				store : LBSReader.store.SOURCE
			}),
	payTypeCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择付费方式',
				displayField : 'name',
				valueField : 'id',
				width : 110,
				store : LBSReader.store.PAYTYPE
			}),
	busiResultCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择业务开通结果',
				displayField : 'name',
				valueField : 'id',
				width : 145,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['0', '待开通'],
									['1', '开通正常(业务系统)'], ['2', '开通正常(pcrm)'],
									['10', '电话状态不正确'], ['11', '限拨']]
						})
			}),
	srcCodeField : new Ext.form.TextField({
				emptyText : '渠道对应的产品包编码',
				maxLength : 110,
				msgTarget : 'side',
				width : 150
			}),
	// busiStrmNoField : new Ext.form.TextField({
	// emptyText : '业务流水号',
	// maxLength : 250,
	// msgTarget : 'side',
	// width : 250
	// }),
	dbField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '创建日期',
				msgTarget : 'side',
				width : 100
			}),
	ddField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '更新日期',
				msgTarget : 'side',
				width : 100
			}),
	dataSrc : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '数据源',
				displayField : 'name',
				valueField : 'id',
				width : 76,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '索引'], ['1', '数据库']]
						}),
				value : '0'
			}),
	searchBtn : new Ext.Button({
				text : '搜索',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				cls : 'btn-common-wide btn-common'
			}),
	redoBtn : new Ext.Button({
				text : '重做所选工单 ',
				iconCls : 'btn-redo',
				cls : 'btn-common-wide btn-common'
			}),
	changeStatusBtn : new Ext.Button({
				text : '更新工单状态 ',
				iconCls : 'btn-changeStatus',
				cls : 'btn-common-wide btn-common'
			}),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		if ('4' == record.data.source) {
			return '<img src="images/not-allowed.png" qtip="该工单来自VSOP，不允许手动重做" class="oper_not_allowed"/>';
		} else {
			if ('2' == record.data.status || '3' == record.data.status) {
				return '<img src="images/not-allowed.png" qtip="该工单已完成或已重新处理，不允许再操作" class="oper_not_allowed"/>';
			} else {
				return '<div class="x-grid3-row-checker"></div>';
			}
		}
	},
	constructor : function(config) {
		this.dlg = new LBSReader.orderworkflow.WorkflowTreeDlg({});
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = LBSReader.common.getPermission('3-1');
		var arr = [];
		if (LBSReader.common.isHasPermission(a, 1))
			arr.push(this.searchBtn);
		arr.push(this.resetBtn);
		arr.push('->');
		if (LBSReader.common.isHasPermission(a, 11))
			arr.push(this.redoBtn);
		if (LBSReader.common.isHasPermission(a, 3))
			arr.push(this.changeStatusBtn);

		// 10May2012, by Tanjf TODO
		var nc = LBSReader.common.getSession("loginInfo").nodeCode;
		if (nc == 'GD') {
			this.cityCombo.setValue('');
		} else {
			this.cityCombo.setValue(nc);
			this.cityCombo.setDisabled(true);
		}
		config.tbar.push(new Ext.Panel({
					border : false,
					// width : '900',
					items : [{
						xtype : 'toolbar',
						border : false,
						items : ['客户电话：', this.telField, '客户姓名：',
								this.nameField, '操作类型：', this.stypeCombo,
								'工单状态：', this.statusCombo, '工单渠道：',
								this.srcCombo]
					}, {
						xtype : 'toolbar',
						border : false,
						// '业务开通结果：', this.busiResultCombo,
						// '渠道产品编码：', this.srcCodeField
						items : ['号百产品包', this.hbPkgField, '创建日期：',
								this.dbField, '更新日期：', this.ddField, '地市：',
								this.cityCombo, '数据源：', this.dataSrc]
							// , '付费类型', this.payTypeCombo ,
							// '号百的产品包编码：',this.hbCodeField,
							// '号百的产品包名称：',this.hbNameField,
					}, {
						xtype : 'toolbar',
						border : false,
						items : [arr]
							// '业务流水号', this.busiStrmNoField,
						}]
				}));
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([
						this.sm
						// ,{
						// header : '业务流水号',
						// align : 'center',
						// menuDisabled : true,
						// dataIndex : 'busiStreamingNo',
						// width : 100,
						// renderer : function(val) {
						// if (val == '') {
						// return '(无)'
						// }
						// return val;
						// }
						// }
						, {
							header : '客户电话',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'customerTel',
							width : 100
						}, {
							header : '客户姓名',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'customerName',
							width : 80,
							renderer : function(val) {
								return '<div class="text-nowrap">' + val
										+ '</div>';
							}
						}, {
							header : '业务类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'serviceType',
							renderer : LBSReader.renderer.ORDER_SERVICE_TYPE,
							width : 80
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'status',
							renderer : LBSReader.renderer.ORDER_STATUS,
							width : 60
						}, {
							xtype : 'actioncolumn',
							header : '流程图',
							align : 'center',
							width : 50,
							items : [{
								icon : 'images/icon_workflow.png',
								tooltip : '查看流程图',
								handler : this.showWorkFlow
										.createDelegate(this)
							}]
						}, {
							header : '号百产品包编码',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'hbPackageCode',
							width : 120
						}, {
							header : '号百产品包名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'hbPackageName',
							width : 120
						}, {
							header : '扣费方式',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'chargeType',
							renderer : LBSReader.renderer.CHARGETYPE,
							width : 70
						}, {
							header : '付费类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'payType',
							renderer : LBSReader.renderer.PAY_TYPE,
							width : 70
						}, {
							header : '工单渠道',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'source',
							renderer : LBSReader.renderer.ORDER_SOURCE,
							width : 70
						}, {
							header : '所属地市',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'nodeCode',
							renderer : LBSReader.renderer.CITYlIST,
							width : 70
						},
						// {
						// header : '业务开通结果',
						// align : 'center',
						// menuDisabled : true,
						// dataIndex : 'busiResult',
						// renderer :
						// LBSReader.renderer.ORDER_BUSI_RESULT,
						// width : 100
						// },
						// {
						// header : '渠道产品包编码',
						// align : 'left',
						// menuDisabled : true,
						// dataIndex : 'sourceProductCode',
						// width : 110
						// },
						{
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
							header : '操作员',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'operator',
							width : 100
						}]);
		LBSReader.orderworkflow.DataGrid.superclass.constructor.apply(this,
				arguments);

		this.telField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
		this.redoBtn.on('click', function() {
					var r = this.getSelectionModel().getSelected();
					if (null == r) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
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
					Ext.MessageBox.confirm("提示", "确认要更新所选工单的状态吗？",
							function(id) {
								if (id == "yes") {
									this.changeItemsStatus();
								}
							}, this);
				}, this);
	},
	resetAllConditions : function() {
		this.telField.reset();
		this.nameField.reset();
		this.stypeCombo.reset();
		this.statusCombo.reset();
		// this.hbCodeField.reset();
		// this.hbNameField.reset();
		this.hbPkgField.reset();
		this.srcCombo.reset();
		this.busiResultCombo.reset();
		this.srcCodeField.reset();
		this.dbField.reset();
		this.ddField.reset();
		this.cityCombo.reset();
		this.dataSrc.reset();
		// this.busiStrmNoField.reset();
	},
	showWorkFlow : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		if (null != r) {
			this.dlg.setOrderId(r.data.id);
			this.dlg.show();
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
						// if (!s) {
						// Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
						// }
					},
					scope : this
				});
	},
	searchItems : function(name) {
		var dateValid = LBSReader.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('搜索条件有误', '创建日期不能在更新日期之后，请修正！', null, this);
			return;
		}
		this.getStore().baseParams = {
			method : 'search',
			tel : this.telField.getValue(),
			name : this.nameField.getValue(),
			service_type : this.stypeCombo.getValue(),
			status : this.statusCombo.getValue(),
			source : this.srcCombo.getValue(),
			// busi_result : this.busiResultCombo.getValue(),
			source_product_code : this.srcCodeField.getValue(),
			// hb_package_code : this.hbCodeField.getValue(),
			// hb_package_name : this.hbNameField.getValue(),
			hb_package_id : this.hbPkgField.getValue(),
			create_time : this.dbField.getRawValue(),
			update_time : this.ddField.getRawValue(),
			node_code : this.cityCombo.getValue(),
			dataSrc : this.dataSrc.getValue()
			// busi_streaming_no : this.busiStrmNoField.getValue()
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {
						// if (!s) {
						// Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
						// }
					},
					scope : this
				});
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
			url : LBSReader.req.ORDER_REDO,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				// reload the list
				Ext.MessageBox.alert('提示', '操作成功！', function() {
							this.store.reload();
						}, this);
			},
			scope : this
		};
		LBSReader.Ajax.send(req);
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
			url : LBSReader.req.ORDER_CHANGESTATUS,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				// reload the list
				this.store.reload();
			}
		};
		LBSReader.Ajax.send(req);
	}
});

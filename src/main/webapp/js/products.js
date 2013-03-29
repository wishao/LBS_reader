/**
 * @author zzx
 */
Ext.namespace('LBSReader', 'LBSReader.product');

LBSReader.product.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '产品维护',
	autoScroll : true,
	store : Ext.StoreMgr.get('product'),
	cls : 'box-dataGrid',
	viewConfig : {
		getRowClass : function(record, rowIndex, rowParams, store) {
			if (4 == record.data.status) {
				return 'product_status_loginout';;
			} else if (3 == record.data.status) {
				return 'product_status_ploginout';
			} else if (2 == record.data.status) {
				return 'product_status_stop';
			} else if (1 == record.data.status) {
				return 'product_status_register';
			} else {
				return 'product_status_normal';
			}
		}
	},

	addBtn : new Ext.Button({
				text : '新增产品',
				iconCls : 'btn-add',
				cls : 'btn-common-wide btn-common'
			}),
	uptBtn : new Ext.Button({
				text : '修改产品',
				iconCls : 'btn-edit',
				cls : 'btn-common-wide btn-common'
			}),
	remvBtn : new Ext.Button({
				text : '下线产品',
				iconCls : 'btn-remove',
				cls : 'btn-common-wide btn-common'
			}),
	issueBtn : new Ext.Button({
				text : '发布到业务平台',
				iconCls : 'btn-remove',
				cls : 'btn-common-l'
			}),
	syncBtn : new Ext.Button({
				text : '同步到VSOP平台',
				iconCls : 'btn-remove',
				cls : 'btn-common-l'
			}),
	nameField : new Ext.form.TextField({
				emptyText : '请填写名称',
				maxLength : 100,
				msgTarget : 'side',
				width : 150
			}),
	searchBtn : new Ext.Button({
				text : '搜索',
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
		this.addProductWind = new LBSReader.product.productWin({});
		this.pdlg = new LBSReader.product.ProductDlg({});
		config.tbar = config.tbar || [];
		var a = LBSReader.common.getPermission('1-2');
		if (LBSReader.common.isHasPermission(a, 2))
			config.tbar.push(this.addBtn);
		if (LBSReader.common.isHasPermission(a, 14))
			config.tbar.push(this.syncBtn);
		if (LBSReader.common.isHasPermission(a, 3))
			config.tbar.push(this.uptBtn);
		if (LBSReader.common.isHasPermission(a, 8))
			config.tbar.push(this.remvBtn);
		if (LBSReader.common.isHasPermission(a, 7))
			config.tbar.push(this.issueBtn);
		config.tbar.push('->');
		config.tbar.push('产品名称：');
		config.tbar.push(this.nameField);
		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.searchBtn);
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true,
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '产品名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'name',
					width : 200
				}, {
					header : '产品编码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'code',
					width : 200
				}, {
					header : 'sp标识',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'spCode',
					width : 100
				}, {
					header : 'sp名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'spName',
					width : 100
				}, {
					header : '业务号码',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'busiCode',
					width : 100
				}, {
					header : '产品类型',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'serviceType',
					renderer : function renderDescn(value, cellmeta, record,
							rowIndex, columnIndex, store) {
						if (value == "1") {
							return "订购类";
						} else {
							return '节目类';
						}
					},
					width : 100
				}, {
					header : '系统标识',
					align : 'center',
					menuDisabled : true,
					renderer : LBSReader.renderer.SYSTEM_CODE,
					dataIndex : 'systemId',
					width : 100
				}, {
					header : '业务资费',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'fairValue',
					width : 100
				}, {
					header : '首月计费规则',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'beginCharg',
					width : 100,
					renderer : LBSReader.renderer.BEGIN_RULE
				}, {
					header : '注销当月预付费计费规则',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'endPreCharg',
					width : 100,
					renderer : LBSReader.renderer.END_PRE_CHARG
				}, {
					header : '注销当月后付费计费规则',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'endAfterCharg',
					width : 100,
					renderer : LBSReader.renderer.END_AFTER_CHARG
				}]);
		LBSReader.product.DataGrid.superclass.constructor
				.apply(this, arguments);

		this.on('show', function() {
					if (this.store.data.length == 0) {
						this.loadItems();
					}
				}, this);
		this.addProductWind.on('hide', function() {
					this.pagingbar.doRefresh();
					this.addProductWind.configForm.resetForm();
				}, this);
		this.addBtn.on('click', function() {
					this.addProductWind.configForm.fairValue.enable();
					this.addProductWind.show();
					this.addProductWind.toAdd();
				}, this);
		this.uptBtn.on('click', function() {
					this.addProductWind.configForm.fairValue.disable();
					var rs = this.getSelectionModel().getSelected();
					if (rs == null) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
					} else {
						this.addProductWind.show();
						this.addProductWind.configForm.setValue(rs.data);
						this.addProductWind.toEdit();
					}
				}, this);
		this.remvBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelected();
					if (rs == null) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					Ext.MessageBox.confirm('提示', '确定要下线吗！', function(btn) {
								if (btn == 'yes')
									this.removeItems();
							}, this);

				}, this);
		this.syncBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelected();
					if (rs == null) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					if (rs.data.vsopStatus == '0') {
						Ext.MessageBox.confirm("提示", "该产品已经同步到VSOP平台，确认再次同步吗？",
								function(id) {
									if (id == "yes") {
										this.syncItems();
									}
								}, this);
					} else {
						Ext.MessageBox.confirm('提示', '确定要同步吗！', function(btn) {
									if (btn == 'yes')
										this.syncItems();
								}, this);
					}

				}, this);
		this.issueBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelected();
					if (rs == null) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					Ext.MessageBox.confirm('提示', '确定要发布吗！', function(btn) {
								if (btn == 'yes')
									this.issueItems();
							}, this);

				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.nameField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
	},
	loadItems : function() {
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {

					},
					scope : this
				});
	},
	removeItems : function() {
		var r = this.getSelectionModel().getSelected();
		if (r.data.status == 4) {
			Ext.MessageBox.alert('提示', '该产品已经下线！', null, this);
			return;
		}
		if (null != r && null != r.data) {
			var req = {
				url : LBSReader.req.PRODUCT_MGR,
				params : {
					pId : r.data.id,
					pCode : r.data.code,
					method : 'delete'
				},
				scope : this,
				callback : function(o) {
					if (true == o.success || 'true' == o.success) {
						Ext.MessageBox.alert('提示', '成功下线！', null, this);
						this.loadItems();
					} else if ('exception' == o.success) {
						Ext.MessageBox.alert('提示', '下线出现异常', null, this);
					} else if ("isRela" == o.message) {
						Ext.MessageBox.alert('提示', '该数据有关联正常的包，不允许下线', null,
								this);
						return;
					}

				}
			};
			LBSReader.Ajax.send(req);
		}
	},
	syncItems : function() {
		var r = this.getSelectionModel().getSelected();
		if (null != r && null != r.data) {
			var req = {
				url : LBSReader.req.PRODUCT_MGR,
				params : {
					pCode : r.data.code,
					spCode : r.data.spCode,
					name : r.data.name,
					status : r.data.status,
					status : r.data.status,
					vsopStatus : r.data.vsopStatus,
					fairValue : r.data.fairValue,
					beginCharg : r.data.beginCharg,
					method : 'syncProductInfo'
				},
				scope : this,
				callback : function(o) {
					if (true == o.success || 'true' == o.success) {
						Ext.MessageBox.alert('提示', '同步成功！', null, this);
						this.loadItems();
					} else {
						Ext.MessageBox.alert('提示', '同步失败', null, this);
					}
				}
			};
			LBSReader.Ajax.send(req);
		}
	},
	issueItems : function() {
		var r = this.getSelectionModel().getSelected();
		if (null != r && null != r.data) {
			var req = {
				url : LBSReader.req.PRODUCT_QUERY,
				params : {
					pid : r.data.id,
					code : r.data.code,
					method : 'checkIssue'
				},
				scope : this,
				callback : function(o) {
					if ('null' == o.success) {
						Ext.MessageBox.alert('提示', '数据错误，不能发布！', null, this);
						return null;
					} else if ("cannotDeploy" == o.success) {
						Ext.MessageBox.alert('提示', '节目类产品不能发布', null, this);
						return null;
					} else if ("isDeploy" == o.success) {
						Ext.MessageBox.confirm('提示', '已经发布，确认修改后再次发布',
								function(isT) {
									if (isT) {
										var pdlg2 = new LBSReader.product.ProductDlg(
												{});
										pdlg2.setArrayRecords(r.data);
										pdlg2.show();
									} else {
										return null;
									}
									scope : this
								});
						return null;
					} else {
						this.pdlg.setArrayRecords(r.data);
						this.pdlg.show();
					}

				}
			};
			LBSReader.Ajax.send(req);
		}
	},
	confimDeploy : function(isT) {
		if (isT) {
			this.pdlg.setArrayRecords(r.data);
			this.pdlg.show();
		} else {
			return null;
		}
		scope : this
	},
	searchItems : function(name) {
		if (this.nameField.getValue().trim() == ''
				&& this.nameField.getValue().length > 1) {
			this.nameField.reset();
			this.nameField.focus();
			Ext.MessageBox.alert('提示', '请输入搜索条件!', null, this);
			return;

		}

		if (!this.nameField.isValid()) {
			return;
		}
		this.getStore().baseParams = {
			method : 'search',
			name : this.nameField.getValue().trim()
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						method : 'search',
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {

					},
					scope : this
				});
	}
});
LBSReader.product.productForm = Ext.extend(Ext.form.FormPanel, {
			id : "productAdd",
			labelWidth : 80,
			labelAlign : 'right',
			autoScroll : true,
			bodyStyle : 'padding:5px 5px 5px 5px;',
			border : false,
			pid : new Ext.form.TextField({
						fieldLabel : 'id',
						name : 'pid',
						hidden : true,
						allowBlank : false,
						disabled : true,
						width : 240
					}),
			vsopStatus : new Ext.form.TextField({
						name : 'vsopStatus',
						hidden : true,
						allowBlank : false,
						disabled : true,
						width : 240
					}),
			pName : new Ext.form.TextField({
						fieldLabel : '产品名称',
						name : 'pName',
						allowBlank : false,
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '产品规格名称不能为空',
						width : 240
					}),
			pCode : new Ext.form.TextField({
						fieldLabel : '产品编码',
						name : 'pCode',
						validator : LBSReader.customFunctions.validateBankTrim,
						regex : /^[^\u4E00-\u9FA5]*?$/,
						regexText : '请输入有效的值，不能有中文',
						emptyText : "产品编码不能为空",
						width : 240
					}),
			spCode : new Ext.form.ComboBox({
						fieldLabel : 'sp厂家',
						editable : false,
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择sp厂家',
						displayField : 'spName',
						valueField : 'spCode',
						width : 240,
						store : Ext.StoreMgr.get('spCodeAndName')
					}),
			busiCode : new Ext.form.TextField({
						fieldLabel : '业务号码',
						name : 'busiCode',
						validator : LBSReader.customFunctions.validateBankTrim,
						emptyText : "业务号码不能为空",
						width : 240
					}),
			systemId : new Ext.form.ComboBox({
						fieldLabel : '所属系统',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						displayField : 'view',
						valueField : 'code',
						listWidth : 400,
						width : 240,
						store : LBSReader.store.SYSTEM_CODE,
						value : LBSReader.data.SYSTEM_CODE.BASE_HB
					}),
			fairValue : new Ext.form.NumberField({
						fieldLabel : '业务资费(元)',
						allowBlank : false,
						allowNegative : false,
						minValue : 0,
						emptyText : '请填写业务资费',
						blankText : '请填写业务资费',
						maxLength : 100,
						msgTarget : 'side',
						emptyText : "业务资费不能为空",
						width : 240
					}),
			nodeList : new Ext.form.TextField({
						fieldLabel : '所属地市编码',
						name : 'nodeList',
						validator : LBSReader.customFunctions.validateBankTrim,
						emptyText : "所属地市编码，以逗号分隔，默认表示全省",
						width : 278
					}),
			status : new Ext.form.ComboBox({
						fieldLabel : '产品启用状态',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择产品类型',
						displayField : 'name',
						valueField : 'code',
						width : 240,
						store : new Ext.data.ArrayStore({
									fields : ['code', 'name'],
									data : [['0', '正常'], ['1', '申请'],
											['2', '暂停申请'], ['3', '预注销'],
											['4', '注销']]
								})
					}),
			serviceType : new Ext.form.ComboBox({
						fieldLabel : '产品类型',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择产品类型',
						displayField : 'name',
						valueField : 'code',
						width : 240,
						store : new Ext.data.ArrayStore({
									fields : ['code', 'name'],
									data : [['1', '订购类'], ['2', '节目类']]
								})
					}),
			beginRuleCmb : new Ext.form.ComboBox({
						fieldLabel : '首月计费规则',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						displayField : 'name',
						valueField : 'mode',
						listWidth : 400,
						width : 240,
						store : LBSReader.store.BEGIN_RULE,
						value : 2
					}),
			endPreCmb : new Ext.form.ComboBox({
						fieldLabel : '注销当月预付费计费规则',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						displayField : 'name',
						valueField : 'mode',
						listWidth : 420,
						width : 240,
						store : LBSReader.store.END_PER_RULE,
						value : 3
					}),
			endAfterCmb : new Ext.form.ComboBox({
						fieldLabel : '注销当月后付费计费规则',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						displayField : 'name',
						valueField : 'mode',
						listWidth : 420,
						width : 240,
						store : LBSReader.store.END_AFTER_RULE,
						value : 3
					}),
			addBtn : new Ext.Button({
						text : '保存',
						type : 'submit',
						minWidth : 70,
						formBind : true
					}),
			cancelBtn : new Ext.Button({
						text : '取消',
						minWidth : 70
					}),
			constructor : function(config) {
				this.isEDIT = false;
				var config = config || {};
				config.items = this.items || [];
				config.buttons = config.buttons || [];
				config.items.push([{
					columnWidth : .5,
					layout : 'form',
					bodyBorder : false,
					items : [this.pName, this.pCode, this.spCode,
							this.busiCode, this.systemId, this.fairValue,
							this.nodeList, this.status, this.serviceType,
							this.beginRuleCmb, this.endPreCmb, this.endAfterCmb]
				}]);

				config.buttons.push(this.addBtn);
				config.buttons.push(this.cancelBtn);
				LBSReader.product.productForm.superclass.constructor.apply(
						this, arguments);
				this.addBtn.on('click', function() {
							if (this.isEDIT) {
								this.toEdit();
							} else {
								this.toadd();
							}
						}, this);
				this.cancelBtn.on('click', function() {
							this.cancelOp();
						}, this)
			},

			isValid : function() {
				return this.pCode.isValid() && this.pName.isValid()
						&& this.spCode.isValid() && this.busiCode.isValid()
						&& this.systemId.isValid() && this.fairValue.isValid()
						&& this.status.isValid() && this.serviceType.isValid();
			},
			resetForm : function() {
				this.items.each(function(item, index, length) {
							item.items.each(function(o) {
										o.reset();
									}, this);
						}, this);
			},
			setValue : function(o) {
				if (null != o.id) {
					this.pid.setValue(o.id);
				}
				if (null != o.code) {
					this.pCode.setValue(o.code);
				}
				if (null != o.name) {
					this.pName.setValue(o.name);
				}

				if (null != o.spCode) {
					this.spCode.setValue(o.spCode);
				}
				if (null != o.busiCode) {
					this.busiCode.setValue(o.busiCode);
				}
				if (null != o.systemId) {
					this.systemId.setValue(o.systemId);
				}
				if (null != o.fairValue) {
					this.fairValue.setValue(o.fairValue);
				}
				if (null != o.status) {
					this.status.setValue(o.status);
				}
				if (null != o.nodeList) {
					this.nodeList.setValue(o.nodeList);
				}
				if (null != o.fairValue) {
					this.fairValue.setValue(o.fairValue);
				}
				if (null != o.serviceType) {
					this.serviceType.setValue(o.serviceType);
				}
				if (null != o.beginCharg) {
					this.beginRuleCmb.setValue(o.beginCharg);
				}
				if (null != o.endPreCharg) {
					this.endPreCmb.setValue(o.endPreCharg);
				}
				if (null != o.endAfterCharg) {
					this.endAfterCmb.setValue(o.endAfterCharg);
				}
				if (null != o.vsopStatus) {
					this.vsopStatus.setValue(o.vsopStatus);
				}
			},
			toadd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.PRODUCT_MGR,
					params : {
						pCode : this.pCode.getValue(),
						pName : this.pName.getValue(),
						spCode : this.spCode.getValue(),
						busiCode : this.busiCode.getValue(),
						systemId : this.systemId.getValue(),
						fairValue : this.fairValue.getValue(),
						status : this.status.getValue(),
						serviceType : this.serviceType.getValue(),
						beginCharg : this.beginRuleCmb.getValue(),
						endPreCharg : this.endPreCmb.getValue(),
						endAfterCharg : this.endAfterCmb.getValue(),
						vsopStatus : 1,
						method : 'add'
					},
					scope : this,
					callback : function(o) {
						if (o.success == 'true') {
							this.ownerCt.hide();
							Ext.getCmp('productAdd').getForm().reset()
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '添加成功',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else if (o.success == 'false'
								&& o.message == "hasCode") {
							Ext.Msg.show({
										title : '操作提示',
										msg : '添加失败,编码已有,请选择其他编码',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else if (o.success == 'false'
								&& o.message == "exception") {
							Ext.Msg.show({
										title : '操作提示',
										msg : '添加失败,系统出现异常',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else {
							Ext.Msg.show({
										title : '操作提示',
										msg : '添加失败',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				}
				LBSReader.Ajax.send(req);
			},
			toEdit : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.PRODUCT_MGR,
					params : {
						pid : this.pid.getValue(),
						pName : this.pName.getValue(),
						spCode : this.spCode.getValue(),
						busiCode : this.busiCode.getValue(),
						systemId : this.systemId.getValue(),
						fairValue : this.fairValue.getValue(),
						status : this.status.getValue(),
						serviceType : this.serviceType.getValue(),
						beginCharg : this.beginRuleCmb.getValue(),
						endPreCharg : this.endPreCmb.getValue(),
						endAfterCharg : this.endAfterCmb.getValue(),
						vsopStatus : this.vsopStatus.getValue(),
						method : 'update'
					},
					scope : this,
					callback : function(o) {
						if (o.success == 'true') {
							this.ownerCt.hide();
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '修改成功',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '修改失败',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				}
				LBSReader.Ajax.send(req);
			},
			cancelOp : function() {
				this.ownerCt.hide();
			}

		});
LBSReader.product.productWin = Ext.extend(Ext.Window, {
			layout : 'fit',
			modal : true,
			width : 440,
			height : 400,
			closeAction : 'hide',
			constrainHeader : true,
			header : true,
			title : '',

			configForm : null,

			constructor : function(config) {
				var config = config || {};
				config.items = this.items || [];
				this.configForm = new LBSReader.product.productForm({});
				config.items.push(this.configForm);
				LBSReader.product.productWin.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							this.configForm.spCode.getStore().load();
						}, this);
				this.on('hide', function() {
						}, this);
			},
			toAdd : function() {
				this.configForm.isEDIT = false;
				this.configForm.pCode.setDisabled(false);
				this.setTitle('新增产品');
			},
			toEdit : function() {
				this.configForm.isEDIT = true;
				this.configForm.pCode.setDisabled(true);
				this.setTitle('修改产品');
			}
		});

LBSReader.product.GroupItemGrid = Ext.extend(Ext.grid.GridPanel, {
			autoScroll : true,
			height : 310,
			store : Ext.StoreMgr.get('deployPackage'),
			constructor : function(config) {
				config = config || {};
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 15,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '{0}-{1} 共{2}项',
							emptyMsg : "没有结果！"
						});
				config.tbar = config.tbar || [];
				// config.tbar.push('->');
				config.bbar = this.pagingbar || [];
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '产品名称',
							align : 'center',
							dataIndex : 'name',
							menuDisabled : true,
							width : 100
						}, {
							header : '产品编码',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'code',
							width : 100
						}, {
							header : '计费描述',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'chargingDesc',
							width : 100
						}, {
							header : '计费周期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'chargingCycle',
							renderer : LBSReader.renderer.CHARGINGCYCLE,
							width : 100
						}]);
				LBSReader.product.GroupItemGrid.superclass.constructor.apply(
						this, arguments);
			}
		});

LBSReader.product.syncPoductForm = Ext.extend(Ext.form.FormPanel, {
			id : "syncProduct",
			labelWidth : 80,
			labelAlign : 'right',
			autoScroll : true,
			bodyStyle : 'padding:5px 5px 5px 5px;',
			border : false,
			addBtn : new Ext.Button({
						text : '发布产品',
						iconCls : 'btn-add',
						cls : 'btn-common-wide btn-common'
					}),
			constructor : function(config) {
				this.isEDIT = false;
				var config = config || {};
				config.items = this.items || [];
				this.grid = new LBSReader.product.GroupItemGrid({});
				config.buttons = config.buttons || [];
				config.items.push(this.grid);
				config.buttons.push(this.addBtn);
				LBSReader.product.productForm.superclass.constructor.apply(
						this, arguments);
				this.addBtn.on('click', function() {
							this.deployProduct();
						}, this)
			},
			cancelOp : function() {
				this.ownerCt.hide();
			},
			deployProduct : function() {
				var r = this.grid.getSelectionModel().getSelected();
				if (null == r || null == r.data) {
					Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
					return null;
				}
				var req = {
					url : LBSReader.req.PRODUCT_MGR,
					params : {
						pid : r.data.pid,
						spCode : r.data.spCode,
						pCode : r.data.pCode,
						pName : r.data.pName,
						status : r.data.status,
						systemId : r.data.systemId,
						busiCode : r.data.busiCode,
						chargingDesc : r.data.chargingDesc,
						chargingCycle : r.data.chargingCycle,
						effectMode : r.data.effectMode,
						withDrawMode : r.data.withDrawMode,
						trialType : r.data.trialType,
						trialTerm : r.data.trialTerm,
						method : 'deployProduct'
					},
					scope : this,
					callback : function(o) {
						if (o.success == 'true') {
							this.ownerCt.hide();
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '发布成功',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else if (o.success == "error") {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '发布失败,业务平台接受失败',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else if (o.success == "nosys") {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '系统配置出错',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '系统异常',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				}
				LBSReader.Ajax.send(req);
			}
		});

LBSReader.product.ProductDlg = Ext.extend(Ext.Window, {
			title : '选择要发布的产品',
			layout : 'fit',
			modal : true,
			width : 480,
			height : 390,
			constrainHeader : true,
			closeAction : 'hide',
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.syncPoductForm = new LBSReader.product.syncPoductForm({});
				config.items.push(this.syncPoductForm);
				LBSReader.product.ProductDlg.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
						}, this);
				this.on('hide', function() {
						}, this);
			},
			setArrayRecords : function(os) {
				this.syncPoductForm.grid.getStore().load({
							params : {
								pid : os.id,
								spCode : os.spCode,
								code : os.code,
								name : os.name,
								usestatus : os.status,
								systemId : os.systemId,
								busiCode : os.busiCode,
								method : 'issue'
							},
							callback : function(r, o, s) {
							},
							scope : this
						});
			}
		});

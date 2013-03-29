/**
 * @author zzx 2011.07.05
 */
Ext.namespace('LBSReader', 'LBSReader.sptel');

LBSReader.sptel.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : 'CP/SP信息管理',
			autoScroll : true,
			store : Ext.StoreMgr.get('sptel'),// to do
			cls : 'box-dataGrid',
			nameField : new Ext.form.TextField({
						emptyText : '请填写sp名称|sp代码',
						maxLength : 100,
						msgTarget : 'side',
						width : 180
					}),

			addBtn : new Ext.Button({
						text : '新增sp厂家',
						iconCls : 'btn-add',
						cls : 'btn-common-wide btn-common'
					}),
			syncBtn : new Ext.Button({
						text : '同步到VSOP平台',
						cls : 'btn-common-l '
					}),
			uptBtn : new Ext.Button({
						text : '修改sp厂家',
						cls : 'btn-common-wide btn-common'
					}),
			remvBtn : new Ext.Button({
						text : '注销sp厂家',
						iconCls : 'btn-remove',
						cls : 'btn-common-wide btn-common'
					}),
			searchBtn : new Ext.Button({
						text : '查询',
						// iconCls : 'btn-search',
						cls : 'btn-search btn-common'
					}),

			constructor : function(config) {
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 15,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				this.adDlg = new LBSReader.sptel.SpDlg({});
				var config = config || {};
				config.tbar = config.tbar || [];
				var a = LBSReader.common.getPermission('6-1');
				if (LBSReader.common.isHasPermission(a, 2))
					config.tbar.push(this.addBtn);
				if (LBSReader.common.isHasPermission(a, 14))
					config.tbar.push(this.syncBtn);
				if (LBSReader.common.isHasPermission(a, 3))
					config.tbar.push(this.uptBtn);
				if (LBSReader.common.isHasPermission(a, 4))
					config.tbar.push(this.remvBtn);
				config.tbar.push(this.nameField);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.searchBtn);
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true,
							checkOnly : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : 'sp代码',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'spCode',
							width : 200
						}, {
							header : 'sp名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'spName',
							width : 200
						}, {
							header : '地址',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'address',
							width : 200
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'statusFlag',
							width : 200,
							renderer : LBSReader.renderer.SP_STATUS
						}]);
				LBSReader.sptel.DataGrid.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							if (this.store.data.length == 0) {
								this.loadItems();
							}
						}, this);
				this.nameField.on('specialkey', function(field, e) {
							if (e.getKey() == e.ENTER) {
								this.searchBtn.fireEvent('click');
							}
						}, this);
				this.adDlg.on('hide', function() {
							this.pagingbar.doRefresh();
						}, this);
				this.addBtn.on('click', function() {
							this.adDlg.show();
							this.adDlg.setTitle('新增sp厂家');
							this.adDlg.configForm.resetForm();
							this.adDlg.configForm.isEDIT = false;
							this.adDlg.configForm.spCode.setDisabled(false);
						}, this);
				this.uptBtn.on('click', function() {
							this.adDlg.setTitle('修改sp厂家');
							this.adDlg.configForm.isEDIT = true;
							this.adDlg.configForm.spCode.setDisabled(true);
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
							} else {
								this.adDlg.show();
								this.adDlg.setValue(rs.data);
							}
						}, this);
				this.remvBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm('提示', '确定要删除吗！', function(
											btn) {
										if (btn == 'yes')
											this.removeItems();
									}, this);

						}, this);
				this.syncBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							if (rs.data.vsopStatus == 0) {
								Ext.MessageBox.confirm("提示",
										"该SP已经同步到VSOP平台，确认再次同步吗？",
										function(id) {
											if (id == "yes") {
												this.syncItems();
											}
										}, this);
							} else {
								Ext.MessageBox.confirm('提示', '确定要同步给VSOP平台！',
										function(btn) {
											if (btn == 'yes')
												this.syncItems();
										}, this);
							}

						}, this);
				this.searchBtn.on('click', function() {
							this.searchItems();
						}, this);
			},
			removeItems : function() {
				var r = this.getSelectionModel().getSelected();
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.SERVICEPROVINFO,
						params : {
							spCode : r.data.spCode,
							method : 'getRelaProduct'
						},
						scope : this,
						callback : function(o) {
							if (true == o.success || 'true' == o.success) {
								var req = {
									url : LBSReader.req.SERVICEPROVINFO_MGR,
									params : {
										spCode : r.data.spCode,
										method : 'deleteSp'
									},
									scope : this,
									callback : function(o) {
										if (true == o.success
												|| 'true' == o.success) {
											Ext.MessageBox.alert('提示',
													'成功删除该sp厂家！', null, this);
											this.pagingbar.doRefresh();
											// this.getStore().load();
										} else {
											Ext.MessageBox.alert('提示',
													'删除该sp厂家失败！', null, this);
											this.pagingbar.doRefresh();
											// this.getStore().load();
										}
									}
								};
								LBSReader.Ajax.send(req);
							} else if ('hasRela' == o.success) {
								Ext.MessageBox.alert('提示', '该sp厂家有关联产品不允许删除！',
										null, this);
								this.getStore().load();
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
						url : LBSReader.req.SERVICEPROVINFO,
						params : {
							spCode : r.data.spCode,
							spName : r.data.spName,
							address : r.data.address,
							vsopStatus : r.data.vsopStatus,
							statusFlag : r.data.statusFlag,
							method : 'syncSpInfo'
						},
						scope : this,
						callback : function(o) {
							if (true == o.success || 'true' == o.success) {
								Ext.MessageBox.alert('提示', '同步成功！', null, this);
								this.pagingbar.doRefresh();
							} else {
								Ext.MessageBox.alert('提示', '同步失败！', null, this);
							}

						}
					};
					LBSReader.Ajax.send(req);
				}
			},
			searchItems : function() {
				var searchCondition = this.nameField.getValue().trim();
				if (this.nameField.getValue().trim() == ''
						&& this.nameField.getValue().length > 1) {
					this.nameField.reset();
					this.nameField.focus();
					Ext.MessageBox.alert('提示', '请输入搜索条件!', null, this);
					return;

				}
				this.getStore().baseParams = {
					method : 'searchSp',
					searchCondition : this.nameField.getValue().trim(),
					packageType : '0'
				};
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
			loadItems : function() {
				if (this.nameField.getValue()) {
					this.searchItems();
					return;
				}
				this.getStore().baseParams = {
					method : 'pageList',
					packageType : '0'
				};
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
			}
		});

LBSReader.sptel.SpForm = Ext.extend(Ext.form.FormPanel, {
			labelWidth : 70,
			labelAlign : 'right',
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
			spCode : new Ext.form.TextField({
						fieldLabel : 'sp代码',
						name : 'spCode',
						allowBlank : false,
						emptyText : 'sp代码不能为空',
						width : 200
					}),
			spName : new Ext.form.TextField({
						fieldLabel : 'sp名称',
						name : 'spName',
						allowBlank : false,
						emptyText : "sp名称不能为空",
						width : 200
					}),
			statusFlag : new Ext.form.ComboBox({
						fieldLabel : '状态',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						displayField : 'name',
						valueField : 'mode',
						width : 200,
						store : new Ext.data.ArrayStore({
									fields : ['mode', 'name'],
									data : [[0, '正常'], [1, '注销']]
								}),
						value : 0
					}),
			address : new Ext.form.TextField({
						fieldLabel : '地址',
						name : 'address',
						width : 200
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
				var config = config || {};
				config.items = this.items || [];
				config.buttons = config.buttons || [];
				config.items.push(this.spCode);
				config.items.push(this.spName);
				config.items.push(this.address);
				config.items.push(this.statusFlag);
				config.buttons.push(this.addBtn);
				config.buttons.push(this.cancelBtn);
				LBSReader.sptel.SpForm.superclass.constructor.apply(this,
						arguments);
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
			setValue : function(o) {
				if (null != o.id) {
					this.pid.setValue(o.id);
				}
				if (null != o.vsopStatus) {
					this.vsopStatus.setValue(o.vsopStatus);
				}
				if (null != o.spCode) {
					this.spCode.setValue(o.spCode);
				}
				if (null != o.spName) {
					this.spName.setValue(o.spName);
				}
				if (null != o.address) {
					this.address.setValue(o.address);
				}
				if (null != o.statusFlag) {
					this.statusFlag.setValue(o.statusFlag);
				}
			},
			resetForm : function() {
				this.spCode.reset();
				this.spName.reset();
				this.address.reset();
				this.statusFlag.reset();
			},

			isValid : function() {
				return this.spCode.isValid() && this.spName.isValid();
			},

			toadd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.SERVICEPROVINFO_MGR,
					params : {
						spCode : this.spCode.getValue(),
						spName : this.spName.getValue(),
						address : this.address.getValue(),
						statusFlag : this.statusFlag.getValue(),
						method : 'addSp'
					},
					scope : this,
					callback : function(o) {
						if (o.success == 'true') {
							this.ownerCt.hide();
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '添加成功',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else if (o.success == 'false') {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '添加失败，sp代码不能重复',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '添加失败',
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
					url : LBSReader.req.SERVICEPROVINFO_MGR,
					params : {
						spCode : this.spCode.getValue(),
						spName : this.spName.getValue(),
						address : this.address.getValue(),
						vsopStatus : this.vsopStatus.getValue(),
						statusFlag : this.statusFlag.getValue(),
						method : 'updateSp'
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
				// this.hide();
			}

		});

LBSReader.sptel.SpDlg = Ext.extend(Ext.Window, {
			layout : 'fit',
			modal : true,
			width : 350,
			height : 330,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				var config = config || {};
				config.items = this.items || [];
				this.configForm = new LBSReader.sptel.SpForm({});
				config.items.push(this.configForm);
				LBSReader.sptel.SpDlg.superclass.constructor.apply(this,
						arguments);

				this.on('show', function() {
						}, this);
			},
			setValue : function(o) {
				this.configForm.setValue(o);
			}
		});

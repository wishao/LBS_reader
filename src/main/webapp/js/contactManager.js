/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.contactManager');

LBSReader.contactManager.ItemForm = Ext.extend(Ext.form.FormPanel, {
			labelWidth : 80,
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			bodyStyle : 'padding:5px 10px 5px 10px;',
			oldParam : 0,
			layout : 'column',

			idHidden : new Ext.form.Hidden({
						name : 'id',
						value : -1
					}),
			sendUserIdField : new Ext.form.TextField({
						fieldLabel : '发起用户',
						allowBlank : false,
						emptyText : '请填写发起用户ID',
						blankText : '请填写发起用户ID',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			receiveUserIdField : new Ext.form.TextField({
						fieldLabel : '接收用户',
						allowBlank : false,
						emptyText : '请填写接收用户ID',
						blankText : '请填写接收用户ID',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			contentField : new Ext.form.TextField({
						fieldLabel : '内容',
						allowBlank : false,
						emptyText : '请填写内容',
						blankText : '请填写内容',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			contactCommitBtn : new Ext.Button({
						id : 'contactCommitBtn',
						text : '提交',
						iconCls : 'btn-commit'
					}),
			cancelBtn : new Ext.Button({
						text : '取消',
						minWidth : 70
					}),
			constructor : function(config) {
				this.isEDIT = false;
				config = config || {};
				config.items = config.items || [];
				config.items.push([{
					layout : 'form',
					bodyBorder : false,
					items : [this.idHidden, this.sendUserIdField,
							this.receiveUserIdField, this.contentField]
				}]);

				config.buttons = config.buttons || [];
				config.buttons.push(this.contactCommitBtn);
				config.buttons.push(this.cancelBtn);
				LBSReader.contactManager.ItemForm.superclass.constructor.apply(
						this, arguments);

				this.contactCommitBtn.on('click', function() {
							if (this.isEDIT) {
								this.commitEdit();
							} else {
								this.commitAdd();
							}
						}, this);
				this.cancelBtn.on('click', function() {
							this.cancelOp();
						}, this);
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
					this.idHidden.setValue(o.id);
				}
				if (null != o.send_user_id) {
					this.sendUserIdField.setValue(o.send_user_id);
				}
				if (null != o.receive_user_id) {
					this.receiveUserIdField.setValue(o.receive_user_id);
				}
				if (null != o.content) {
					this.contentField.setValue(o.content);
				}
			},
			isValid : function() {
				return this.contentField.isValid()
						&& this.sendUserIdField.isValid()
						&& this.receiveUserIdField.isValid();
			},
			commitAdd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.CONTACT_ADD,
					params : {
						id : this.idHidden.getValue(),
						send_user_id : this.sendUserIdField.getValue(),
						receive_user_id : this.receiveUserIdField.getValue(),
						content : this.contentField.getValue()
					},
					scope : this,
					callback : function(o) {
						if (o.success) {
							Ext.MessageBox.alert('提示', '添加成功！', function() {
									}, this);
						} else {
							Ext.MessageBox.alert('提示', o.message || '添加失败！',
									function() {
									}, this);
							return;
						}
						this.ownerCt.hide();
					}
				};
				LBSReader.Ajax.send(req);
			},
			commitEdit : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.CONTACT_UPDATE,
					params : {
						id : this.idHidden.getValue(),
						send_user_id : this.sendUserIdField.getValue(),
						receive_user_id : this.receiveUserIdField.getValue(),
						content : this.contentField.getValue()
					},
					scope : this,
					callback : function(o) {
						if (o.success) {
							Ext.MessageBox.alert('提示', '修改成功！', function() {
									}, this);
						} else {
							Ext.MessageBox.alert('提示', o.message || '修改失败！',
									function() {
									}, this);
						}
						this.ownerCt.hide();
					}
				};
				LBSReader.Ajax.send(req);
			},
			cancelOp : function() {
				this.ownerCt.hide();
			}
		});

LBSReader.contactManager.ItemDlg = Ext.extend(Ext.Window, {
			title : '对话配置',
			layout : 'fit',
			modal : true,
			width : 350,
			height : 270,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.contactManager.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.contactManager.ItemDlg.superclass.constructor.apply(
						this, arguments);
			},
			toAdd : function() {
				this.configForm.isEDIT = false;
			},
			toEdit : function() {
				this.configForm.isEDIT = true;
			},
			setValue : function(o) {
				this.configForm.setValue(o);
			}
		});

LBSReader.contactManager.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '对话维护',
			autoScroll : true,
			store : Ext.StoreMgr.get('contact'),
			cls : 'box-dataGrid',
			viewConfig : {
				getRowClass : function(record, rowIndex, rowParams, store) {
					/*
					 * if (LBSReader.data.BOOK_STATUS.NOEFFECT ==
					 * record.data.status) { return 'unknown'; }
					 */
				}
			},

			addBtn : new Ext.Button({
						text : '新增',
						iconCls : 'btn-add',
						cls : 'btn-common'
					}),
			uptBtn : new Ext.Button({
						text : '修改',
						iconCls : 'btn-edit',
						cls : 'btn-common'
					}),
			remvBtn : new Ext.Button({
						text : '删除',
						iconCls : 'btn-remove',
						cls : 'btn-common'
					}),
			nameField : new Ext.form.TextField({
						emptyText : '请填写内容',
						maxLength : 100,
						msgTarget : 'side',
						width : 150,
						value : ''
					}),
			searchBtn : new Ext.Button({
						text : '搜索',
						cls : 'btn-search btn-common'
					}),
			constructor : function(config) {
				this.dlg = new LBSReader.contactManager.ItemDlg({});
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};
				config.tbar = config.tbar || [];
				var role = LBSReader.common.getPermission('loginInfo');
				if (role == 1 || role == 3)
					config.tbar.push(this.addBtn);
				if (role == 1 || role == 3)
					config.tbar.push(this.uptBtn);
				if (role == 1 || role == 3)
					config.tbar.push(this.remvBtn);
				config.tbar.push('->');
				config.tbar.push('对话内容: ');
				config.tbar.push(this.nameField);
				if (role == 1 || role == 3)
					config.tbar.push(this.searchBtn);
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '发起用户',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'send_user_name',
							width : 100
						}, {
							header : '接收用户',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'receive_user_name',
							width : 100
						}, {
							header : '内容',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'content',
							width : 300
						}, {
							header : '创建时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'create_time',
							width : 150
						}]);
				LBSReader.contactManager.DataGrid.superclass.constructor.apply(
						this, arguments);

				this.on('show', function() {
							this.loadItems();
						}, this);
				this.dlg.on('hide', function() {
							this.pagingbar.doRefresh();
							this.dlg.configForm.resetForm();
						}, this);
				this.nameField.on('specialkey', function(field, e) {
							if (e.getKey() == e.ENTER) {
								this.searchBtn.fireEvent('click');
							}
						}, this);
				this.addBtn.on('click', function() {
							this.dlg.show();
							this.dlg.toAdd();
						}, this);
				this.uptBtn.on('click', function() {
							var r = this.getSelectionModel().getSelected();
							if (null != r && null != r.data) {
								this.dlg.show();
								this.dlg.setValue(r.data);
								this.dlg.toEdit();
							} else {
								Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null,
										this);
								return;
							}
						}, this);
				this.remvBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm("提示", "确认要把所选记录删除(不可逆)吗？",
									function(id) {
										if (id == "yes") {
											this.removeItems();
										}
									}, this);
						}, this);
				this.searchBtn.on('click', function() {
							this.searchItems();
						}, this);
			},
			loadItems : function() {
				this.getStore().load({
							params : {
								start : 0,
								limit : this.pagingbar.pageSize
							},
							callback : function(r, o, s) {

							},
							scope : this
						});
			},
			searchItems : function() {
				if (this.nameField.getValue() == '') {
					this.loadItems();
				}
				this.getStore().baseParams = {
					content : this.nameField.getValue().trim()
				};
				this.getStore().load({
							params : {
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
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.CONTACT_REMOVE,
						params : {
							id : r.data.id
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.alert('提示', '操作成功！', function() {
											this.loadItems();
										}, this);
							} else {
								Ext.MessageBox.alert('提示', '操作失败！', function() {
										}, this);
							}
						}
					};
					LBSReader.Ajax.send(req);
				}
			},
			resetItems : function() {
				var r = this.getSelectionModel().getSelected();
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.CONTACT_RESETPASSWORD,
						params : {
							id : r.data.id
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.alert('提示', '操作成功！', function() {
											this.loadItems();
										}, this);
							} else {
								Ext.MessageBox.alert('提示', '操作失败！', function() {
										}, this);
							}
						}
					};
					LBSReader.Ajax.send(req);
				}
			}
		});

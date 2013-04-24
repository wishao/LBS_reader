/**
 * @author johnny0086
 */

Ext.namespace('LBSReader', 'LBSReader.readerManager');

LBSReader.readerManager.ItemForm = Ext.extend(Ext.form.FormPanel, {
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
			userIdField : new Ext.form.TextField({
						fieldLabel : '用户ID',
						allowBlank : false,
						emptyText : '请填写用户ID',
						blankText : '请填写用户ID',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			fontField : new Ext.form.TextField({
						fieldLabel : '字体大小',
						allowBlank : false,
						emptyText : '请填写字体大小',
						blankText : '请填写字体大小',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			backgroundColorField : new Ext.form.TextField({
						fieldLabel : '背景颜色',
						msgTarget : 'side',
						id : 'backgroundColor',
						name : 'color',
						labelWidth : 1,
						style : 'background:#000000',
						width : 200,
						readOnly : true,
						listeners : {
							'focus' : function() {
								showColor('backgroundColor');
							}
						}
					}),
			fontColorField : new Ext.form.TextField({
						fieldLabel : '字体颜色',
						msgTarget : 'side',
						id : 'fontColor',
						name : 'color',
						labelWidth : 1,
						style : 'background:#000000',
						width : 200,
						readOnly : true,
						listeners : {
							'focus' : function() {
								showColor('fontColor');
							}
						}
					}),
			commitBtn : new Ext.Button({
						id : 'commitBtn',
						text : '提交',
						iconCls : 'btn-commit'
					}),

			constructor : function(config) {
				this.isEDIT = false;
				config = config || {};
				config.items = config.items || [];
				config.items.push([{
					layout : 'form',
					bodyBorder : false,
					items : [this.idHidden, this.userIdField, this.fontField,
							this.backgroundColorField, this.fontColorField]
				}]);

				config.buttons = config.buttons || [];
				config.buttons.push(this.commitBtn);
				LBSReader.readerManager.ItemForm.superclass.constructor.apply(
						this, arguments);

				this.commitBtn.on('click', function() {
							if (this.isEDIT) {
								this.commitEdit();
							} else {
								this.commitAdd();
							}
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
				if (null != o.user_id) {
					this.userIdField.setValue(o.user_id);
				}
				if (null != o.font) {
					this.fontField.setValue(o.font);
				}
				/*if (null != o.background_color) {
					this.backgroundColorField.setValue(o.background_color);
				}
				if (null != o.font_color) {
					this.fontColorField.setValue(o.font_color);
				}*/
			},
			isValid : function() {
				return this.backgroundColorField.isValid()
						&& this.userIdField.isValid()
						&& this.fontField.isValid()
						&& this.fontColorField.isValid();
			},
			commitAdd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.READER_ADD,
					params : {
						id : this.idHidden.getValue(),
						user_id : this.userIdField.getValue(),
						font : this.fontField.getValue(),
						background_color : this.backgroundColorField.getValue(),
						font_color : this.fontColorField.getValue()

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
					url : LBSReader.req.READER_UPDATE,
					params : {
						id : this.idHidden.getValue(),
						user_id : this.userIdField.getValue(),
						font : this.fontField.getValue(),
						background_color : this.backgroundColorField.getValue(),
						font_color : this.fontColorField.getValue()
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
			}
		});

LBSReader.readerManager.ItemDlg = Ext.extend(Ext.Window, {
			title : '阅读器配置',
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
				this.configForm = new LBSReader.readerManager.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.readerManager.ItemDlg.superclass.constructor.apply(
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

LBSReader.readerManager.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '阅读器维护',
			autoScroll : true,
			store : Ext.StoreMgr.get('reader'),
			cls : 'box-dataGrid',
			viewConfig : {
				getRowClass : function(record, rowIndex, rowParams, store) {
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
			searchBtn : new Ext.Button({
						text : '搜索',
						cls : 'btn-search btn-common'
					}),
			constructor : function(config) {
				this.dlg = new LBSReader.readerManager.ItemDlg({});
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
				if (role == 1 || role == 3)
					config.tbar.push(this.searchBtn);
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '用户',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'user_name',
							width : 100
						}, {
							header : '字体大小',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'font',
							width : 100
						}, {
							header : '背景颜色',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'background_color',
							width : 300
						}, {
							header : '字体颜色',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'font_color',
							width : 300
						}, {
							header : '创建时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'create_time',
							width : 150
						}]);
				LBSReader.readerManager.DataGrid.superclass.constructor.apply(
						this, arguments);

				this.on('show', function() {
							this.loadItems();
						}, this);
				this.dlg.on('hide', function() {
							this.pagingbar.doRefresh();
							this.dlg.configForm.resetForm();
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
							this.loadItems();
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
			removeItems : function() {
				var r = this.getSelectionModel().getSelected();
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.READER_REMOVE,
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
						url : LBSReader.req.READER_RESETPASSWORD,
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

/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.recordManager');

LBSReader.recordManager.ItemForm = Ext.extend(Ext.form.FormPanel, {
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
			bookIdField : new Ext.form.TextField({
						fieldLabel : '书本ID',
						allowBlank : false,
						emptyText : '请填写书本ID',
						blankText : '请填写书本ID',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			recordField : new Ext.form.NumberField({
						fieldLabel : '阅读记录',
						allowBlank : false,
						emptyText : '请填写阅读记录',
						blankText : '请填写阅读记录',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			evaluationField : new Ext.form.TextField({
						fieldLabel : '点评',
						allowBlank : false,
						emptyText : '请填写点评',
						blankText : '请填写点评',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			scoreCombo : new Ext.form.ComboBox({
						fieldLabel : '评分',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择分数',
						displayField : 'name',
						valueField : 'score',
						width : 200,
						store : new Ext.data.ArrayStore({
									fields : ['score', 'name'],
									data : [['1', '1'], ['2', '2'], ['3', '3'],
											['4', '4'], ['5', '5'], ['6', '6'],
											['7', '7'], ['8', '8'], ['9', '9'],
											['10', '10']]
								})
					}),
			shareCombo : new Ext.form.ComboBox({
						fieldLabel : '是否分享',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择是否分享',
						displayField : 'name',
						valueField : 'share',
						width : 200,
						store : new Ext.data.ArrayStore({
									fields : ['share', 'name'],
									data : [['1', '分享'], ['2', '私有']]
								})
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
					items : [this.idHidden, this.userIdField, this.bookIdField,
							this.recordField, this.evaluationField,
							this.scoreCombo, this.shareCombo]
				}]);

				config.buttons = config.buttons || [];
				config.buttons.push(this.commitBtn);
				LBSReader.recordManager.ItemForm.superclass.constructor.apply(
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
				if (null != o.book_id) {
					this.bookIdField.setValue(o.book_id);
				}
				if (null != o.record) {
					this.recordField.setValue(o.record);
				}
				if (null != o.evaluation) {
					this.evaluationField.setValue(o.evaluation);
				}
				if (null != o.score) {
					this.scoreCombo.setValue(o.score);
				}
				if (null != o.share) {
					this.shareCombo.setValue(o.share);
				}
			},
			isValid : function() {
				return this.userIdField.isValid() && this.bookIdField.isValid()
						&& this.recordField.isValid()
						&& this.evaluationField.isValid()
						&& this.scoreCombo.isValid()
						&& this.shareCombo.isValid();
			},
			commitAdd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.RECORD_ADD,
					params : {
						id : this.idHidden.getValue(),
						user_id : this.userIdField.getValue(),
						book_id : this.bookIdField.getValue(),
						record : this.recordField.getValue(),
						evaluation : this.evaluationField.getValue(),
						score : this.scoreCombo.getValue(),
						share : this.shareCombo.getValue()
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
					url : LBSReader.req.RECORD_UPDATE,
					params : {
						id : this.idHidden.getValue(),
						user_id : this.userIdField.getValue(),
						book_id : this.bookIdField.getValue(),
						record : this.recordField.getValue(),
						evaluation : this.evaluationField.getValue(),
						score : this.scoreCombo.getValue(),
						share : this.shareCombo.getValue()
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

LBSReader.recordManager.ItemDlg = Ext.extend(Ext.Window, {
			title : '阅读记录配置',
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
				this.configForm = new LBSReader.recordManager.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.recordManager.ItemDlg.superclass.constructor.apply(
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

LBSReader.recordManager.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '阅读记录维护',
			autoScroll : true,
			store : Ext.StoreMgr.get('record'),
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
			nameField : new Ext.form.TextField({
						emptyText : '请填写名称',
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
				this.dlg = new LBSReader.recordManager.ItemDlg({});
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
				if (role == 1 || role == 2)
					config.tbar.push(this.addBtn);
				if (role == 1 || role == 2)
					config.tbar.push(this.uptBtn);
				if (role == 1 || role == 2)
					config.tbar.push(this.remvBtn);
				config.tbar.push('->');
				config.tbar.push('书籍名: ');
				config.tbar.push(this.nameField);
				if (role == 1 || role == 2)
					config.tbar.push(this.searchBtn);
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '用户名',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'user_name',
							width : 200
						}, {
							header : '书籍名',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'book_name',
							width : 100
						}, {
							header : '阅读记录',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'record',
							width : 150
						}, {
							header : '点评',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'evaluation',
							width : 150
						}, {
							header : '评分',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'score',
							width : 150
						}, {
							header : '创建时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'create_time',
							width : 150
						}, {
							header : '是否分享',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'share',
							width : 80,
							renderer : LBSReader.renderer.RECORD_SHARE
						}]);
				LBSReader.recordManager.DataGrid.superclass.constructor.apply(
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
					name : this.nameField.getValue().trim()
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
						url : LBSReader.req.RECORD_REMOVE,
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
						url : LBSReader.req.RECORD_RESETPASSWORD,
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

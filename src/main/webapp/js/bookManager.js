/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.bookManager');

LBSReader.bookManager.ItemForm = Ext.extend(Ext.form.FormPanel, {
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
			nameField : new Ext.form.TextField({
						fieldLabel : '书籍名称',
						allowBlank : false,
						emptyText : '请填写书籍名称',
						blankText : '请填写书籍名称',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			authorField : new Ext.form.TextField({
						fieldLabel : '作者名称',
						allowBlank : false,
						emptyText : '请填写作者名称',
						blankText : '请填写作者名称',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			contentField : new Ext.form.TextField({
						fieldLabel : '书籍链接',
						allowBlank : false,
						emptyText : '请填写链接',
						blankText : '请填写链接',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			recommendField : new Ext.form.TextField({
						fieldLabel : '简介',
						allowBlank : false,
						emptyText : '请填写简介',
						blankText : '请填写简介',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			coverField : new Ext.form.TextField({
						fieldLabel : '封面链接',
						allowBlank : false,
						emptyText : '请填写封面链接',
						blankText : '请填写封面链接',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						msgTarget : 'side',
						width : 200
					}),
			catalogField : new Ext.form.TextField({
						fieldLabel : '目录',
						allowBlank : true,
						emptyText : '请填写目录',
						blankText : '请填写目录',
						msgTarget : 'side',
						width : 200
					}),
			statusCombo : new Ext.form.ComboBox({
						fieldLabel : '有效标识',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择有效标识',
						displayField : 'name',
						valueField : 'status',
						width : 200,
						store : new Ext.data.ArrayStore({
									fields : ['status', 'name'],
									data : [['0', '无效'], ['1', '有效']]
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
					items : [this.idHidden, this.nameField, this.authorField,
							this.contentField, this.recommendField,
							this.coverField, this.catalogField,
							this.statusCombo]
				}]);

				config.buttons = config.buttons || [];
				config.buttons.push(this.commitBtn);
				LBSReader.bookManager.ItemForm.superclass.constructor.apply(
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
				if (null != o.name) {
					this.nameField.setValue(o.name);
				}
				if (null != o.author) {
					this.authorField.setValue(o.author);
				}
				if (null != o.content) {
					this.contentField.setValue(o.content);
				}
				if (null != o.recommend) {
					this.recommendField.setValue(o.recommend);
				}
				if (null != o.cover) {
					this.coverField.setValue(o.cover);
				}
				if (null != o.catalog) {
					this.catalogField.setValue(o.catalog);
				}
				if (null != o.status) {
					this.statusCombo.setValue(o.status);
				}
			},
			isValid : function() {
				return this.nameField.isValid() && this.authorField.isValid()
						&& this.contentField.isValid()
						&& this.recommendField.isValid()
						&& this.coverField.isValid()
						&& this.catalogField.isValid()
						&& this.statusCombo.isValid();
			},
			commitAdd : function() {
				if (!this.isValid()) {
					return;
				}
				var req = {
					url : LBSReader.req.BOOK_ADD,
					params : {
						id : this.idHidden.getValue(),
						name : this.nameField.getValue(),
						author : this.authorField.getValue(),
						content : this.contentField.getValue(),
						recommend : this.recommendField.getValue(),
						cover : this.coverField.getValue(),
						catalog : this.catalogField.getValue(),
						status : this.statusCombo.getValue()
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
					url : LBSReader.req.BOOK_UPDATE,
					params : {
						id : this.idHidden.getValue(),
						name : this.nameField.getValue(),
						author : this.authorField.getValue(),
						content : this.contentField.getValue(),
						recommend : this.recommendField.getValue(),
						cover : this.coverField.getValue(),
						catalog : this.catalogField.getValue(),
						status : this.statusCombo.getValue()
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

LBSReader.bookManager.ItemDlg = Ext.extend(Ext.Window, {
			title : '书籍配置',
			layout : 'fit',
			modal : true,
			width : 350,
			height : 200,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.bookManager.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.bookManager.ItemDlg.superclass.constructor.apply(
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

LBSReader.bookManager.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '书籍维护',
			autoScroll : true,
			store : Ext.StoreMgr.get('book'),
			cls : 'box-dataGrid',
			viewConfig : {
				getRowClass : function(record, rowIndex, rowParams, store) {
					if (LBSReader.data.BOOK_STATUS.NOEFFECT == record.data.status) {
						return 'unknown';
					}
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
				this.dlg = new LBSReader.bookManager.ItemDlg({});
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 15,
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
				config.tbar.push('用户名: ');
				config.tbar.push(this.nameField);
				if (role == 1 || role == 3)
					config.tbar.push(this.searchBtn);
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '书名',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'name',
							width : 200
						}, {
							header : '作者',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'author',
							width : 150
						}, {
							header : '内容文本链接',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'content',
							width : 150
						}, {
							header : '创建时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'create_time',
							width : 150
						}, {
							header : '更新时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'update_time',
							width : 150
						}, {
							header : '简介',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'recommend',
							width : 150
						}, {
							header : '封面链接',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'cover',
							width : 150
						}, {
							header : '阅读人数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'reader',
							width : 150
						}, {
							header : '关注人数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'focus',
							width : 150
						}, {
							header : '目录',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'catalog',
							width : 150
						}, {
							header : '平均得分',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'score',
							width : 150
						}, {
							header : '状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'status',
							width : 60,
							renderer : LBSReader.renderer.BOOK_STATUS
						}]);
				LBSReader.bookManager.DataGrid.superclass.constructor.apply(
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
				if (this.nameField.getValue()) {
					this.searchItems();
					return;
				}
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
					return;
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
						url : LBSReader.req.BOOK_REMOVE,
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
						url : LBSReader.req.BOOK_RESETPASSWORD,
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

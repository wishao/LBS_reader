/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.suite');

LBSReader.suite.ProductGrid = Ext.extend(Ext.grid.GridPanel, {
	autoScroll : true,
	height : 230,
	store : Ext.StoreMgr.get('groupitem'),

	constructor : function(config) {
		config = config || {};
		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : false,
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 150
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'selectedFlag',
					renderer : function(value) {
						if ('0' == value) {
							return '<font color="red">必选项</font>';
						} else if ('1' == value) {
							return '<font color="gray">默认选项</font>';
						} else {
							return '可选项';
						}
					},
					width : 100
				}]);
		LBSReader.suite.ProductGrid.superclass.constructor.apply(this,
				arguments);

		this.on('show', function() {
					this.getStore().load();
				}, this);
	},
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		if ('0' == record.data.selectedFlag) {
			return '<font color="gray" style="margin:2px">√</font>';
		} else if ('1' == record.data.selectedFlag) {
			return '<div class="x-grid3-row-checker"></div>';
		} else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	}
});

LBSReader.suite.ItemForm = Ext.extend(Ext.form.FormPanel, {
			labelWidth : 70,
			labelAlign : 'right',
			border : false,
			bodyStyle : 'padding:5px 10px 5px 10px;',

			idHidden : new Ext.form.Hidden({
						name : 'id',
						value : -1
					}),
			nameField : new Ext.form.TextField({
						fieldLabel : '套餐名称',
						allowBlank : false,
						emptyText : '请填写名称',
						blankText : '请填写名称',
						maxLength : 100,
						msgTarget : 'side',
						width : 200
					}),
			ppkgCombo : new Ext.form.ComboBox({
						fieldLabel : '融合产品包',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						allowBlank : false,
						emptyText : '请选择融合产品包',
						blankText : '请选择融合产品包',
						displayField : 'name',
						valueField : 'id',
						width : 200,
						store : Ext.StoreMgr.get('cpackage')
					}),
			dbField : new Ext.form.DateField({
						fieldLabel : '生效日期',
						format : 'Y-m-d',
						allowBlank : false,
						emptyText : '请选择生效日期',
						blankText : '请选择生效日期',
						msgTarget : 'side',
						width : 200
					}),
			ddField : new Ext.form.DateField({
						fieldLabel : '失效日期',
						format : 'Y-m-d',
						allowBlank : false,
						emptyText : '请选择失效日期',
						blankText : '请选择失效日期',
						msgTarget : 'side',
						width : 200
					}),

			commitBtn : new Ext.Button({
						text : '提交',
						iconCls : 'btn-commit'
					}),

			constructor : function(config) {
				this.isEDIT = false;
				this.grid = new LBSReader.suite.ProductGrid({});
				config = config || {};
				config.items = config.items || [];
				config.items.push(this.idHidden);
				config.items.push(this.nameField);
				config.items.push(this.dbField);
				config.items.push(this.ddField);
				config.items.push(this.ppkgCombo);
				config.items.push(new Ext.form.FieldSet({
							baseCls : 'custom-fieldset',
							items : [this.grid]
						}));
				config.buttons = config.buttons || [];
				config.buttons.push(this.commitBtn);
				LBSReader.suite.ItemForm.superclass.constructor.apply(this,
						arguments);

			}
		});

LBSReader.suite.ItemDlg = Ext.extend(Ext.Window, {
			title : '套餐配置',
			layout : 'fit',
			modal : true,
			width : 350,
			height : 415,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.suite.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.suite.ItemDlg.superclass.constructor.apply(this,
						arguments);

			},
			toAdd : function() {
				this.configForm.resetForm();
				this.configForm.isEDIT = false;
			},
			toEdit : function() {
				this.configForm.resetForm();
				this.configForm.isEDIT = true;
			},
			setValue : function(o) {
				this.configForm.setValue(o);
			}
		});

LBSReader.suite.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '套餐配置',
			autoScroll : true,
			store : Ext.StoreMgr.get('suite'),
			cls : 'box-dataGrid',

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
			importBtn : new Ext.Button({
						text : '导入订购用户',
						iconCls : 'btn-excel',
						cls : 'btn-common-wide btn-common'
					}),

			constructor : function(config) {
				this.dlg = new LBSReader.suite.ItemDlg({});
				config = config || {};
				config.tbar = config.tbar || [];
				config.tbar.push(this.addBtn);
				config.tbar.push(this.uptBtn);
				config.tbar.push(this.remvBtn);
				config.tbar.push(this.importBtn);
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '电信套餐名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'name',
							width : 200
						}, {
							header : '融合产品包名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'ppkg',
							width : 200
						}, {
							header : '生效时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'timeBgn',
							width : 150
						}, {
							header : '失效时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'timeEnd',
							width : 150
						}]);
				LBSReader.suite.DataGrid.superclass.constructor.apply(this,
						arguments);

				this.on('show', function() {
							this.getStore().load();
						}, this);
				this.addBtn.on('click', function() {
							this.dlg.show();
						}, this);
				this.uptBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null,
										this);
							}
						}, this);
				this.remvBtn.on('click', function() {
							// to be implemented
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
							}
						}, this)
			}
		});

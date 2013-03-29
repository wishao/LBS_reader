/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.group');

IsmpHB.group.GroupProductRecord = Ext.data.Record.create([ {
	name : 'name',
	mapping : 'name'
}, {
	name : 'maxSelected',
	mapping : 'maxSelected'
}, {
	name : 'options',
	mapping : 'options'
} ]);

IsmpHB.group.GroupProductGrid = Ext.extend(Ext.grid.GridPanel, {
	autoScroll : true,
	height : 240,
	store : Ext.StoreMgr.get('groupitem'),
	cls : 'box-dataGrid',

	addBtn : new Ext.Button({
		text : '添加产品',
		iconCls : 'btn-add'
	}),
	sFlagCombo : new Ext.form.ComboBox({
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '更改产品状态',
		displayField : 'name',
		valueField : 'code',
		width : 110,
		store : new Ext.data.ArrayStore({
			fields : [ 'code', 'name' ],
			data : [ [ '0', '设为可选项' ], [ '1', '设为默认选项' ], [ '2', '设为必选项' ] ]
		})
	}),
	commitBtn : new Ext.Button({
		text : '修改',
		iconCls : 'btn-commit'
	}),
	removeBtn : new Ext.Button({
		text : '删除',
		iconCls : 'btn-remove'
	}),

	constructor : function(config) {
		this.pdlg = new IsmpHB.cpkg.ProductDlg({});
		config = config || {};
		config.bbar = config.bbar || [];
		config.bbar.push(this.addBtn);
		config.bbar.push(this.sFlagCombo);
		config.bbar.push(this.commitBtn);
		config.bbar.push(this.removeBtn);
		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : false,
			checkOnly : true
		});
		this.cm = new Ext.grid.ColumnModel([ this.sm, {
			header : '产品名称',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'name',
			width : 100
		}, {
			header : '产品编码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'code',
			width : 100
		}, {
			header : '状态',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'selectedFlag',
			renderer : IsmpHB.renderer.SELECT_FLAG,
			width : 100
		} ]);
		IsmpHB.group.GroupProductGrid.superclass.constructor.apply(this, arguments);

		this.addBtn.on('click', function() {
			this.pdlg.show();
		}, this);
		this.commitBtn.on('click', function() {
			this.commitItems();
		}, this);
		this.removeBtn.on('click', function() {
			this.removeItems();
		}, this);
	},
	setArrayRecords : function(os) {
		this.getStore().loadData({
			rows : os
		});
	},
	getAsArray : function() {
		var os = [];
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i);
			os.push({
				id : r.data.id,
				name : r.data.name,
				code : r.data.code,
				selectedFlag : r.data.selectedFlag
			});
		}
		return os;
	},
	isValid : function(value) {
		var count = this.getStore().getCount();
		return count > 0 && count <= value;
	},
	removeItems : function() {
		var rs = this.getSelectionModel().getSelections();
		this.getStore().remove(rs);
	},
	commitItems : function() {
		if (!this.sFlagCombo.isValid()) {
			return;
		}
		var rows = this.getStore().getRange();
		var records = this.getSelectionModel().getSelections();
		var rs = [];
		for ( var i = 0; i < rows.length; i++) {
			for (j = 0; j < records.length; j++) {
				if (rows[i].data.id == records[j].data.id) {
					rows[i].data.selectedFlag = this.sFlagCombo.getValue();
				}
			}
			rs.push(rows[i].data);
		}
		this.getStore().loadData({
			rows : rs
		});
	}
});

IsmpHB.group.PackageGroupForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 90,
	labelAlign : 'right',
	border : false,
	bodyStyle : 'padding:5px 10px 5px 10px;',

	idHidden : new Ext.form.Hidden({
		name : 'id',
		value : -1
	}),
	nameField : new Ext.form.TextField({
		fieldLabel : '产品组名称',
		allowBlank : false,
		emptyText : '请填写名称',
		blankText : '请填写名称',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),
	cMaxField : new Ext.form.NumberField({
		fieldLabel : '最大可选项',
		allowBlank : false,
		emptyText : '请填写最大可选项',
		blankText : '请填写最大可选项',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),

	grid : new IsmpHB.group.GroupProductGrid({}),

	commitBtn : new Ext.Button({
		text : '提交',
		iconCls : 'btn-commit'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		config.items.push(this.idHidden);
		config.items.push(this.nameField);
		config.items.push(this.cMaxField);
		config.items.push(new Ext.form.FieldSet({
			baseCls : 'custom-fieldset',
			items : [ this.grid ]
		}));
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		IsmpHB.group.PackageGroupForm.superclass.constructor.apply(this, arguments);

		this.commitBtn.on('click', function() {
			if (this.isEDIT) {
				this.commitEdit();
			} else {
				this.commitAdd();
			}
		}, this);
	},
	resetForm : function() {
		this.idHidden.reset();
		this.nameField.reset();
		this.cMaxField.reset();
	},
	setValue : function(o) {
		if (null != o.id) {
			this.idHidden.setValue(o.id);
		}
		if (null != o.name) {
			this.nameField.setValue(o.name);
		}
		if (null != o.maxSelected) {
			this.cMaxField.setValue(o.maxSelected);
		}
		if (null != o.options && o.options.length > 0) {
			this.grid.setArrayRecords(o.options);
		}
	},
	isValid : function() {
		return this.nameField.isValid() && this.cMaxField.isValid();
	},
	commitAdd : function() {
		if (!this.isValid()) {
			return;
		}
		if (!this.grid.isValid(this.cMaxField.getValue())) {
			Ext.Msg.show({
				title : '融合产品包配置',
				msg : '产品配置错误！',
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.ERROR
			});
			return;
		}
		var record = new IsmpHB.group.GroupProductRecord({
			name : this.nameField.getValue(),
			maxSelected : this.cMaxField.getValue(),
			options : this.grid.getAsArray()
		});
		Ext.StoreMgr.get('packagegroup').add(record);
		this.ownerCt.hide();
	},
	commitEdit : function() {
		if (!this.isValid()) {
			return;
		}
		if (!this.grid.isValid(this.cMaxField.getValue())) {
			Ext.Msg.show({
				title : '融合产品包配置',
				msg : '产品配置错误！',
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.ERROR
			});
			return;
		}
	}
});

IsmpHB.group.PackageGroupDlg = Ext.extend(Ext.Window, {
	title : '产品组配置',
	layout : 'fit',
	modal : true,
	width : 380,
	height : 375,
	constrainHeader : true,
	closeAction : 'hide',

	configForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.configForm = new IsmpHB.group.PackageGroupForm({});
		config.items.push(this.configForm);
		IsmpHB.group.PackageGroupDlg.superclass.constructor.apply(this, arguments);

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

IsmpHB.group.PackageGroupGrid = Ext.extend(Ext.grid.GridPanel, {
	autoScroll : true,
	height : 165,
	store : Ext.StoreMgr.get('packagegroup'),
	cls : 'box-dataGrid',

	addBtn : new Ext.Button({
		text : '新增分组',
		iconCls : 'btn-add',
		cls : 'btn-common'
	}),
	uptBtn : new Ext.Button({
		text : '修改分组',
		iconCls : 'btn-edit',
		cls : 'btn-common'
	}),
	remvBtn : new Ext.Button({
		text : '删除分组',
		iconCls : 'btn-remove',
		cls : 'btn-common'
	}),

	constructor : function(config) {
		this.dlg = new IsmpHB.group.PackageGroupDlg({});
		config = config || {};
		config.bbar = [];
		config.bbar.push(this.addBtn);
		config.bbar.push(this.uptBtn);
		config.bbar.push(this.remvBtn);
		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : false
		});
		this.cm = new Ext.grid.ColumnModel([ this.sm, {
			header : '分组名称',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'name',
			width : 150
		}, {
			header : '最多产品数量',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'maxSelected',
			width : 100
		} ]);
		IsmpHB.group.PackageGroupGrid.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
			this.getStore().load();
		}, this);
		this.addBtn.on('click', function() {
			this.dlg.toAdd();
			this.dlg.show();
		}, this);
		this.uptBtn.on('click', function() {
			var r = this.getSelectionModel().getSelected();
			if (null != r && null != r.data) {
				this.dlg.toEdit();
				this.dlg.show();
				this.dlg.setValue(r.data);
			}
		}, this);
		this.remvBtn.on('click', function() {
			var r = this.getSelectionModel().getSelected();
			if (null != r && null != r.data) {
				this.getStore().remove(r);
			}
		}, this);
	},
	getAsArray : function() {
		var os = [];
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i);
			os.push({
				id : r.data.id,
				name : r.data.name,
				maxSelected : r.data.maxSelected,
				options : r.data.options
			});
		}
		return os;
	}
});
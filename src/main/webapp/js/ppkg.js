/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.ppkg');

IsmpHB.ppkg.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 80,
	labelAlign : 'right',
	border : false,
	autoScroll : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',

	idHidden : new Ext.form.Hidden({
		name : 'id',
		value : -1
	}),
	nameField : new Ext.form.TextField({
		fieldLabel : '产品包名称',
		allowBlank : false,
		emptyText : '请填写名称',
		blankText : '请填写名称',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),
	seqNumField : new Ext.form.TextField({
		fieldLabel : '产品包编号',
		allowBlank : false,
		emptyText : '请填写编号',
		blankText : '请填写编号',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),
	smaxField : new Ext.form.NumberField({
		fieldLabel : '公允值',
		allowBlank : false,
		emptyText : '请填写公允值',
		blankText : '请填写公允值',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),
	billCombo : new Ext.form.ComboBox({
		fieldLabel : '计费标识',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择计费标识',
		displayField : 'name',
		valueField : 'code',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : [ 'code', 'name' ],
			data : [ [ '1', '号百计费' ], [ '2', 'CRM计费' ] ]
		})
	}),
	chargingCodeCmb : new Ext.form.ComboBox({
		fieldLabel : '计费编码',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择计费编码',
		displayField : 'code',
		valueField : 'id',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : ['id','code'],
			data : [['hb001','hb001']]
		}),
		value : 'hb001'
	}),
	chargingDescTex : new Ext.form.TextArea({
		grow : true,
		fieldLabel : '计费策略描述',
		width : 200
	}),
	chargingCycleCmb : new Ext.form.ComboBox({
		fieldLabel : '计费周期',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		displayField : 'view',
		valueField : 'code',
		width : 200,
		store : IsmpHB.store.CHARGING_CYCLE,
		value : 4
	}),
	effectModeCmb : new Ext.form.ComboBox({
		fieldLabel : '订购生效模式',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择生效模式',
		displayField : 'name',
		valueField : 'mode',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : ['mode','name'],
			data : [['0','立即生效'],['1','下个计费周期生效']]
		}),
		value : 0
	}),
	
	withDrawModeCmb : new Ext.form.ComboBox({
		fieldLabel : '退订生效模式',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择退订模式',
		displayField : 'name',
		valueField : 'mode',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : ['mode','name'],
			data : [['0','立即生效'],['1','下个计费周期生效']]
		}),
		value : 0
	}), 
	trialTypeCmb : new Ext.form.ComboBox({
		fieldLabel : '试用期类型',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择试用期类型',
		displayField : 'name',
		valueField : 'mode',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : ['mode','name'],
			data : [['0','无试用期'],['1','有试用期到月底'],['2','有试用时长']]
		}),
		value : 0,
		listeners : {
		 "collapse" : function(){
			var obj = this.nextSibling();
			if(this.getValue()!= 2){
				obj.setDisabled(true);
				obj.setValue(0);
				return;
			}
			obj.setDisabled(false);
			obj.setValue("请填写时长（以天为单位）");
		 }
		}
	}), 
	trialTermField : new Ext.form.NumberField({
		fieldLabel : '试用期时长',
		allowBlank : false,
		emptyText : '请填写时长（以天为单位）',
		blankText : '请填写时长（以天为单位）',
		maxLength : 100,
		msgTarget : 'side',
		width : 200	
	}),

	commitBtn : new Ext.Button({
		text : '提交',
		iconCls : 'btn-commit'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		this.grid = new IsmpHB.group.PackageGroupGrid({});
		config = config || {};
		config.items = config.items || [];
		config.items.push(this.idHidden);
		config.items.push(this.nameField);
		config.items.push(this.seqNumField);
		config.items.push(this.smaxField);
		config.items.push(this.billCombo);
		config.items.push(this.chargingCodeCmb);
		config.items.push(this.chargingCycleCmb);
		config.items.push(this.chargingDescTex);
		config.items.push(this.effectModeCmb);
		config.items.push(this.withDrawModeCmb);
		config.items.push(this.trialTypeCmb);
		config.items.push(this.trialTermField);
		config.items.push(new Ext.form.FieldSet({
			baseCls : 'custom-fieldset',
			items : [ this.grid ]
		}));
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		IsmpHB.ppkg.ItemForm.superclass.constructor.apply(this, arguments);

		this.commitBtn.on('click', function() {
			if (this.isEDIT) {
				this.commitEdit();
			} else {
				this.commitAdd();
			}
		}, this);
	},
	isValid : function() {
		return this.nameField.isValid() && this.seqNumField.isValid() && this.smaxField.isValid() && this.billCombo.isValid()
		&&this.chargingCodeCmb.isValid()&&this.effectModeCmb.isValid()&&this.withDrawModeCmb.isValid()
				&&this.trialTypeCmb.isValid()&&this.trialTermField.isValid();
	},
	resetForm : function() {
		this.nameField.reset();
		this.seqNumField.reset();
		this.smaxField.reset();
		this.billCombo.reset();
		this.chargingCodeCmb.reset();
		this.chargingDescTex.reset();
	},
	commitAdd : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : IsmpHB.req.HBPACKAGE_COMPLEX_ADD,
			params : {
				timestamp : new Date().valueOf(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				chargingCode : this.chargingCodeCmb.getValue(),
				chargingDesc : this.chargingDescTex.getValue(),
				chargingCycle : this.chargingCycleCmb.getValue(),
				effectMode : this.effectModeCmb.getValue(),
				withDrawMode : this.withDrawModeCmb.getValue(),
				trialType : this.trialTypeCmb.getValue(),
				trialTerm : this.trialTermField.getValue(),
				groups : Ext.encode(this.grid.getAsArray()),
				packageType: 2
			},
			scope : this,
			callback : function(o) {
				this.ownerCt.hide();
			}
		};
		IsmpHB.Ajax.send(req);
	},
	commitEdit : function() {
		if (!this.isValid()) {
			return;
		}
		if (!this.grid.isValid(this.cMaxField.getValue())) {
			Ext.Msg.show({
				title : '复杂产品包配置',
				msg : '产品配置错误！',
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.ERROR
			});
			return;
		}
		var req = {
			url : IsmpHB.req.HBPACKAGE_COMPLEX_UPDATE,
			params : {
				timestamp : new Date().valueOf(),
				id : this.idHidden.getValue(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				chargingCode : this.chargingCodeCmb.getValue(),
				chargingDesc : this.chargingDescTex.getValue(),
				chargingCycle : this.chargingCycleCmb.getValue(),
				effectMode : this.effectModeCmb.getValue(),
				withDrawMode : this.withDrawModeCmb.getValue(),
				trialType : this.trialTypeCmb.getValue(),
				trialTerm : this.trialTermField.getValue(),
				optionMax : this.cMaxField.getValue(),
				packageType: 2,
				options : Ext.encode(this.grid.getAsArray())
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '修改成功！', function() {
					}, this);
				}else{
					Ext.MessageBox.alert('提示', '修改失败！', function() {
					}, this);
				}
				this.ownerCt.hide();
			}
		};
		IsmpHB.Ajax.send(req);
	}
});

IsmpHB.ppkg.ItemDlg = Ext.extend(Ext.Window, {
	title : '复杂产品包配置',
	layout : 'fit',
	modal : true,
	width : 400,
	height : 570,
	constrainHeader : true,
	closeAction : 'hide',

	configForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.configForm = new IsmpHB.ppkg.ItemForm({});
		config.items.push(this.configForm);
		IsmpHB.ppkg.ItemDlg.superclass.constructor.apply(this, arguments);

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

IsmpHB.ppkg.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '复杂产品包配置',
	autoScroll : true,
	store : Ext.StoreMgr.get('package'),
	cls:'box-dataGrid',

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
		width : 150
	}),
	searchBtn : new Ext.Button({
		text : '搜索',
		cls : 'btn-search btn-common'
	}),

	constructor : function(config) {
		this.dlg = new IsmpHB.ppkg.ItemDlg({});
		this.pagingbar = new Ext.PagingToolbar({
			pageSize : 15,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push(this.addBtn);
		config.tbar.push(this.uptBtn);
		config.tbar.push(this.remvBtn);
		config.tbar.push('->');
		config.tbar.push('产品包名称: ');
		config.tbar.push(this.nameField);
		config.tbar.push(this.searchBtn);
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			checkOnly : true
		});
		this.cm = new Ext.grid.ColumnModel([ this.sm, {
			header : '产品包名称',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'name',
			width : 150
		}, {
			header : '产品包编号',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'code',
			width : 150
		}, {
			header : '公允值',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'pairValue',
			width : 100
		}, {
			header : '计费标识',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'billFlag',
			renderer : IsmpHB.renderer.CHARGINGMODE,
			width : 100
		}, {
			header : '包含产品(产品组)',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'groups',
			renderer : IsmpHB.renderer.PACKAGE_PRODUCT,
			width : 200
		},{
			header : '计费编码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'chargingCode',
			width : 100
		},{
			header : '计费策略描述',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'chargingDesc',
			width : 100
		},{
			header : '计费周期',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'chargingCycle',
			width : 70,
			renderer : IsmpHB.renderer.CHARGINGCYCLE
		},{
			header : '订购生效模式',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'effectMode',
			width : 100,
			renderer : IsmpHB.renderer.EFFECTMODE
		},{
			header : '退订生效模式',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'withDrawMode',
			width : 100,
			renderer : IsmpHB.renderer.EFFECTMODE
		},{
			header : '试用期类型',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'trialType',
			width : 100,
			renderer : IsmpHB.renderer.TRIAL_TYPE
		},{
			header : '试用期时长',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'trialTerm',
			width : 70
		}]);
		IsmpHB.ppkg.DataGrid.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
			this.loadItems();
		}, this);
		this.nameField.on('specialkey', function(field, e) {
			if (e.getKey() == e.ENTER) {
				this.searchBtn.fireEvent('click');
			}
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
			} else {
				Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null, this);
			}
		}, this);
		this.remvBtn.on('click', function() {
			var rs = this.getSelectionModel().getSelections();
			if (rs == null) {
				Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
			}
			Ext.MessageBox.confirm("提示", "确认要删除所选记录吗？", function(id) {
				if (id == "yes") {
					this.removeItems();
				}
			},this);
		}, this);
		this.searchBtn.on('click', function() {
			this.searchItems();
		}, this);
	},
	loadItems : function(s, l) {
		this.getStore().load({
			params : {
				timestamp : new Date().valueOf(),
				start : s || 0,
				limit : l || this.pagingbar.pageSize,
				packageType: 2
			},
			callback : function(r, o, s) {

			},
			scope : this
		});
	},
	searchItems : function() {
		this.getStore().load({
			params : {
				timestamp : new Date().valueOf(),
				method : 'search',
				name : this.nameField.getValue(),
				packageType : '2'
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
				url : IsmpHB.req.HBPACKAGE_COMPLEX_REMOVE,
				params : {
					timestamp : new Date().valueOf(),
					id : r.data.id
				},
				scope : this,
				callback : function(o) {
					if (o.success) {
						Ext.MessageBox.alert('提示', '删除成功！', function() {
							this.loadItems();
						}, this);
					}else{
						Ext.MessageBox.alert('提示', '删除失败！', function() {
						}, this);
					}
				}
			};
			IsmpHB.Ajax.send(req);
		}
	}
});

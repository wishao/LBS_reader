/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.spkg');

IsmpHB.spkg.ItemForm = Ext.extend(Ext.form.FormPanel, {
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
		fieldLabel : '产品包名称',
		allowBlank : false,
		emptyText : '请填写名称',
		blankText : '请填写名称',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
	}),
	seqNumField : new Ext.form.TextField({
		fieldLabel : '产品包编号',
		regex : /^[^\u4e00-\u9fa5]*?$/,
		regexText : '请输入有效的值，不能有中文',
		allowBlank : false,
		emptyText : '请填写编号',
		blankText : '请填写编号',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		maxLength : 100,
		msgTarget : 'side',
		width : 200,
		listeners : {
			"change":function(obj,n,o){
				this.ownerCt.oldParam = o;
			}
		}
	}),
	productCombo : new Ext.form.ComboBox({
		fieldLabel : '包含产品',
		editable : false,
//		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择包含产品',
		displayField : 'name',
		valueField : 'id',
		width : 200,
		store : Ext.StoreMgr.get('productall')
//		listeners : {
//			"focus" : function(){
//				this.getStore().load();
//			}
//		}
		
	}),
	smaxField : new Ext.form.NumberField({
		fieldLabel : '业务资费(元)',
		allowBlank : false,
		allowNegative : false,
		minValue : 0,
		emptyText : '请填写业务资费',
		blankText : '请填写业务资费',
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
	chargingCodeField : new Ext.form.TextField({
		fieldLabel : '计费编码',
		regex : /^[^\u4e00-\u9fa5]*?$/,
		regexText : '请输入有效的值，不能有中文',
		allowBlank : false,
		emptyText : '请输入计费编码',
		blankText : '请输入计费编码',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		maxLength : 100,
		msgTarget : 'side',
		width : 200
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
		allowNegative : false,
		minValue : 0,
		disabled : true,
		emptyText : '请填写时长（以天为单位）',
		blankText : '请填写时长（以天为单位）',
		maxLength : 100,
		msgTarget : 'side',
		value : 0,
		width : 200	
	}),
	
	useFlagCmb : new Ext.form.ComboBox({
		fieldLabel : '启用标识',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		displayField : 'name',
		valueField : 'mode',
		width : 200,
		store : new Ext.data.ArrayStore({
			fields : ['mode','name'],
			data : [[0,'有效'],[1,'无效']]
		}),
		value : 0
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
		width : 200,
		store : IsmpHB.store.BEGIN_RULE,
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
		width : 200,
		store : IsmpHB.store.END_PER_RULE,
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
		width : 200,
		store : IsmpHB.store.END_AFTER_RULE,
		value : 3
	}),

	commitBtn : new Ext.Button({
		id: 'commitBtn',
		text : '提交',
		iconCls : 'btn-commit'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		config.items.push([{
			columnWidth: .5,
			layout: 'form',
			bodyBorder : false,
			items :[this.idHidden,this.nameField,this.seqNumField,this.productCombo,this.smaxField,
				this.billCombo,this.chargingCodeField,this.chargingCycleCmb,this.chargingDescTex]
		},{
			columnWidth: .5,
			bodyBorder : false,
			layout: 'form',
			items : [this.effectModeCmb,this.withDrawModeCmb,this.trialTypeCmb,this.trialTermField,
				this.useFlagCmb,this.beginRuleCmb,this.endPreCmb,this.endAfterCmb]
		}]);
		
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		IsmpHB.spkg.ItemForm.superclass.constructor.apply(this, arguments);

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
			item.items.each(function(o){
				o.reset();
			},this);
		}, this);
	},
	setValue : function(o) {
		if (null != o.id) {
			this.idHidden.setValue(o.id);
		}
		if (null != o.name) {
			this.nameField.setValue(o.name);
		}
		if (null != o.code) {
			this.seqNumField.setValue(o.code);
			this.oldParam = o.code;
		}
		if (null != o.simple) {
//			this.productCombo.clearValue();
			this.productCombo.setValue(o.simple.id);
//			this.productCombo.valueNotFoundText=o.simple.name;
		}
		if (null != o.pairValue) {
			this.smaxField.setValue(o.pairValue);
		}
		if (null != o.billFlag) {
			this.billCombo.setValue(o.billFlag);
		}
		if(null != o.chargingDesc){
			this.chargingDescTex.setValue(o.chargingDesc);
		}
		if(null != o.chargingCycle){
			this.chargingCycleCmb.setValue(o.chargingCycle);
		}
		if(null != o.chargingCode){
			this.chargingCodeField.setValue(o.chargingCode);
		}
		if(null != o.effectMode){
			this.effectModeCmb.setValue(o.effectMode);
		}
		if(null != o.withDrawMode){
			this.withDrawModeCmb.setValue(o.withDrawMode);
		}
		if(null != o.trialType){
			this.trialTypeCmb.setValue(o.trialType);
		}
		if(null != o.trialTerm){
			this.trialTermField.setValue(o.trialTerm);
		}
		if(null != o.useFlag){
			this.useFlagCmb.setValue(o.useFlag);
		}
		if(null != o.beginCharg){
			this.beginRuleCmb.setValue(o.beginCharg);
		}
		if(null != o.endPreCharg){
			this.endPreCmb.setValue(o.endPreCharg);
		}
		if(null != o.endAfterCharg){
			this.endAfterCmb.setValue(o.endAfterCharg);
		}
	},
	isValid : function() {
		return this.nameField.isValid() && this.seqNumField.isValid() && this.productCombo.isValid() && this.smaxField.isValid()
				&& this.billCombo.isValid()&&this.chargingCodeField.isValid()&&this.effectModeCmb.isValid()&&this.withDrawModeCmb.isValid()
				&&this.trialTypeCmb.isValid()&&this.trialTermField.isValid()&&null!=this.productCombo.getValue()&&''!=this.productCombo.getValue();
	},
	commitAdd : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : IsmpHB.req.HBPACKAGE_SIMPLE_ADD,
			params : {
				timestamp : new Date().valueOf(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pid : this.productCombo.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				//添加表字段后加的
				chargingCode : this.chargingCodeField.getValue(),
				chargingDesc : this.chargingDescTex.getValue(),
				chargingCycle : this.chargingCycleCmb.getValue(),
				effectMode : this.effectModeCmb.getValue(),
				withDrawMode : this.withDrawModeCmb.getValue(),
				trialType : this.trialTypeCmb.getValue(),
				trialTerm : this.trialTermField.getValue(),
				beginCharg : this.beginRuleCmb.getValue(),
				endPreCharg : this.endPreCmb.getValue(),
				endAfterCharg : this.endAfterCmb.getValue(),
				packageType: 0
			},
			scope : this,
			callback : function(o) {
				if(o.success){
					Ext.MessageBox.alert('提示', '添加成功！', function() {
					}, this);
				}else{
					Ext.MessageBox.alert('提示', o.message||'添加失败！', function() {
					}, this);
					return;
				}
				this.ownerCt.hide();
			}
		};
		IsmpHB.Ajax.send(req);
	},
	commitEdit : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : IsmpHB.req.HBPACKAGE_SIMPLE_UPDATE,
			params : {
				timestamp : new Date().valueOf(),
				id : this.idHidden.getValue(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pid : this.productCombo.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				//添加表字段后加的
				chargingCode : this.chargingCodeField.getValue(),
				chargingDesc : this.chargingDescTex.getValue(),
				chargingCycle : this.chargingCycleCmb.getValue(),
				effectMode : this.effectModeCmb.getValue(),
				withDrawMode : this.withDrawModeCmb.getValue(),
				trialType : this.trialTypeCmb.getValue(),
				trialTerm : this.trialTermField.getValue(),
				useFlag : this.useFlagCmb.getValue(),
				beginCharg : this.beginRuleCmb.getValue(),
				endPreCharg : this.endPreCmb.getValue(),
				endAfterCharg : this.endAfterCmb.getValue(),
				packageType: 0,
				oldCode : this.oldParam
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '修改成功！', function() {
					}, this);
				}else{
					Ext.MessageBox.alert('提示', o.message||'修改失败！', function() {
					}, this);
				}
				this.ownerCt.hide();
			}
		};
		IsmpHB.Ajax.send(req);
	}
});

IsmpHB.spkg.ItemDlg = Ext.extend(Ext.Window, {
	title : '单一产品包配置',
	layout : 'fit',
	modal : true,
	width : 640,
	height : 350,
	constrainHeader : true,
	closeAction : 'hide',

	configForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.configForm = new IsmpHB.spkg.ItemForm({});
		config.items.push(this.configForm);
		IsmpHB.spkg.ItemDlg.superclass.constructor.apply(this, arguments);
		this.on('show',function(){
			this.configForm.productCombo.getStore().load();
		},this);

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

IsmpHB.spkg.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '产品包维护',
	autoScroll : true,
	store : Ext.StoreMgr.get('spackage'),
	cls : 'box-dataGrid',
	viewConfig : {
		 getRowClass : function(record, rowIndex, rowParams, store) {
			if(IsmpHB.data.USE_FLAG.NOEFFECT==record.data.useFlag){
				return 'unknown';
			}
		 }
	},

	addBtn : new Ext.Button({
		text : '新增',
		iconCls : 'btn-add',
		cls : 'btn-common'
	}),
	syncBtn : new Ext.Button({
		text : '同步到VSOP平台',
		iconCls : 'btn-add',
		cls : 'btn-common-l'
	}),
	uptBtn : new Ext.Button({
		text : '修改',
		iconCls : 'btn-edit',
		cls : 'btn-common'
	}),
	remvBtn : new Ext.Button({
		text : '置为无效',
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
		this.dlg = new IsmpHB.spkg.ItemDlg({});
		this.pagingbar = new Ext.PagingToolbar({
			pageSize : 15,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('1-1');
		if(IsmpHB.common.isHasPermission(a,2))
			config.tbar.push(this.addBtn);
//		if(IsmpHB.common.isHasPermission(a,14))
//			config.tbar.push(this.syncBtn);
		if(IsmpHB.common.isHasPermission(a,3))
			config.tbar.push(this.uptBtn);
		if(IsmpHB.common.isHasPermission(a,4))
			config.tbar.push(this.remvBtn);
		config.tbar.push('->');
		config.tbar.push('产品包名称: ');
		config.tbar.push(this.nameField);
		if(IsmpHB.common.isHasPermission(a,1))
			config.tbar.push(this.searchBtn);
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true
		});
		this.cm = new Ext.grid.ColumnModel([ this.sm, {
			header : '产品包名称',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'name',
			width : 200
		}, {
			header : '产品包编号',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'code',
			width : 100
		}, {
			header : '业务资费',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'pairValue',
			width : 50
		}, {
			header : '计费标识',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'billFlag',
			renderer : IsmpHB.renderer.CHARGINGMODE,
			width : 80
		}, {
			header : '计费编码',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'chargingCode',
			width : 100
		},{
			header : '计费策略描述',
			align : 'left',
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
		},{
			header : '包含产品',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'simple',
			width : 200,
			renderer : IsmpHB.renderer.PACKAGE_SIMPLE_PRODUCT
		},{
			header : '启用状态',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'useFlag',
			width : 60,
			renderer : IsmpHB.renderer.STATUS_FLAG
		},{
			header : '首月计费规则',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'beginCharg',
			width : 100,
			renderer : IsmpHB.renderer.BEGIN_RULE
		},{
			header : '注销当月预付费计费规则',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'endPreCharg',
			width : 100,
			renderer : IsmpHB.renderer.END_PRE_CHARG
		},{
			header : '注销当月后付费计费规则',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'endAfterCharg',
			width : 100,
			renderer : IsmpHB.renderer.END_AFTER_CHARG
		}]);
		IsmpHB.spkg.DataGrid.superclass.constructor.apply(this, arguments);

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
			this.dlg.configForm.smaxField.enable();
			this.dlg.configForm.productCombo.setValue(null);
			this.dlg.show();
			this.dlg.toAdd();
		}, this);
		this.uptBtn.on('click', function() {
			this.dlg.configForm.smaxField.disable();
			var r = this.getSelectionModel().getSelected();
			if (null != r && null != r.data) {
				this.dlg.show();
				this.dlg.setValue(r.data);
				this.dlg.toEdit();
			} else {
				Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null, this);
				return;
			}
		}, this);
		this.remvBtn.on('click', function() {
			var rs = this.getSelectionModel().getSelected();
			if (rs == null) {
				Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
				return;
			}
			Ext.MessageBox.confirm("提示", "确认要把所选记录置为无效吗？", function(id) {
				if (id == "yes") {
					this.removeItems();
				}
			},this);
		}, this);
		this.syncBtn.on('click', function() {
			var rs = this.getSelectionModel().getSelected();
			if (rs == null) {
				Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
				return;
			}
			if(rs.data.vsopStatus==0){
				Ext.MessageBox.confirm("提示", "该产品包已经同步到VSOP平台，确认再次同步吗？", function(id) {
	                if (id == "yes") {
	                    this.syncItems();
	                }
	            },this);
			}else{
				Ext.MessageBox.confirm("提示", "确认要把所选记同步到VSOP平台吗？", function(id) {
					if (id == "yes") {
						this.syncItems();
					}
				},this);
			}
		}, this);
		this.searchBtn.on('click', function() {
			this.searchItems();
		}, this);
	},
	loadItems : function() {
		if(this.nameField.getValue()){
			this.searchItems();
			return;
		}
		this.getStore().baseParams = {
			method : 'page',
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
	searchItems : function() {
	    if(this.nameField.getValue()==''){
	       this.loadItems();
	       return;
	    }
		this.getStore().baseParams = {
			method : 'search',
			name : this.nameField.getValue().trim(),
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
	removeItems : function() {
		var r = this.getSelectionModel().getSelected();
		if (null != r && null != r.data) {
			var req = {
				url : IsmpHB.req.HBPACKAGE_SIMPLE_REMOVE,
				params : {
					timestamp : new Date().valueOf(),
					id : r.data.id
				},
				scope : this,
				callback : function(o) {
					if (o.success) {
						Ext.MessageBox.alert('提示', '操作成功！', function() {
							this.loadItems();
						}, this);
					}else{
						Ext.MessageBox.alert('提示', '操作失败！', function() {
						}, this);
					}
				}
			};
			IsmpHB.Ajax.send(req);
		}
	},
	syncItems : function() {
		var r = this.getSelectionModel().getSelected();
		if (null != r && null != r.data) {
			var req = {
				url : IsmpHB.req.HBPACKAGE_SIMPLE_QUERY,
				params : {
					timestamp : new Date().valueOf(),
					id : r.data.id,
					code : r.data.code,
					name : r.data.name,
					chargingDesc : r.data.chargingDesc,
					beginCharg : r.data.beginCharg,
					effectMode : r.data.effectMode,
					withDrawMode : r.data.withDrawMode,
					trialType : r.data.trialType,
					simple : r.data.simple.code,
					vsopStatus : r.data.vsopStatus,
					useFlag : r.data.useFlag,
					method:'syncPakcage'
				},
				scope : this,
				callback : function(o) {
					if (true == o.success || 'true' == o.success) {
						Ext.MessageBox.alert('提示', '同步成功！', function() {
						}, this);
					}else{
						Ext.MessageBox.alert('提示', '同步失败！', function() {
						}, this);
					}
				}
			};
			IsmpHB.Ajax.send(req);
		}
	}
});

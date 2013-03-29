/**
 * @author guoguangfu 2011.08.26
 */
Ext.namespace('IsmpHB', 'IsmpHB.auditing');
IsmpHB.auditing.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '产品审核',
	autoScroll : true,
	store : Ext.StoreMgr.get('productAuditing'),
	cls : 'box-dataGrid',
	viewConfig : {
		 getRowClass : function(record, rowIndex, rowParams, store) {
			if(IsmpHB.data.AUDITING_TYPE.PASS==record.data.auditingFlag||IsmpHB.data.AUDITING_TYPE.AUTO==record.data.auditingFlag){
				return 'combo_status_normal';
			}else if(IsmpHB.data.AUDITING_TYPE.UNPASS==record.data.auditingFlag){
				return 'combo_status_stop';
			}
		 }
	},

	flagCombo : new Ext.form.ComboBox( {
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		emptyText : '请选择审核类型',
		displayField : 'name',
		valueField : 'id',
		width : 120,
		store : IsmpHB.store.AUDITING_TYPE,
		value : IsmpHB.data.AUDITING_TYPE.ALL,
		listeners : {
			'collapse' : function() {
				var obj = this.ownerCt.getComponent('codeField');
				if(null==obj.getValue()||''==obj.getValue().trim()){
					this.ownerCt.ownerCt.loadItems();
				}else{
					this.ownerCt.ownerCt.searchItems();
				}
				
			}
		}
	}),
	codeField : new Ext.form.TextField( {
		id : 'codeField',
//		allowBlank : false,
		emptyText : '请填写产品编码',
		maxLength : 100,
		msgTarget : 'side',
		width : 150
	}),
	searchBtn : new Ext.Button( {
		text : '搜索',
		iconCls : 'btn-remove',
		cls : 'btn-common-wide btn-common'
	}),
	remvBtn : new Ext.Button( {
		text : '删除',
		iconCls : 'btn-remove',
		cls : 'btn-common-wide btn-common'
	}),
	passBtn : new Ext.Button( {
		text : '审核通过',
		cls : 'btn-common-wide btn-common'
	}),
	unpassBtn : new Ext.Button( {
		text : '审核不通过',
		cls : 'btn-common-wide btn-common'
	}),
	constructor : function(config) {
		this.pageBar = new Ext.PagingToolbar( {
			pageSize : 15,
			store : this.getStore(),
			displayInfo : true,
			dsLoaded : false,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('1-3');
		if(IsmpHB.common.isHasPermission(a,4))
			config.tbar.push(this.remvBtn);
		if(IsmpHB.common.isHasPermission(a,9))
			config.tbar.push(this.passBtn);
		if(IsmpHB.common.isHasPermission(a,10))
			config.tbar.push(this.unpassBtn);
		config.tbar.push('->');
		config.tbar.push('产品编码:');
		config.tbar.push(this.codeField);
		if(IsmpHB.common.isHasPermission(a,1))
			config.tbar.push(this.searchBtn);
		config.tbar.push('-');		
		config.tbar.push('审核类型: ');
		config.tbar.push(this.flagCombo);
		config.bbar = this.pageBar;
		this.sm = new Ext.grid.CheckboxSelectionModel( {
			singleSelect : true
		});
		this.cm = new Ext.grid.ColumnModel( [ this.sm, {
			header : '产品名称',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'name',
			width : 120
		}, {
			header : '产品编码',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'code',
			width : 100
		}, {
			header : '产家名称',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'spName',
			width : 150
		}, {
			header : '所属系统',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'system',
			width : 60,
			renderer : IsmpHB.renderer.SYSTEM_CODE
		},{
			header : '启用状态',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'status',
			width : 60,
			renderer : IsmpHB.renderer.STATUS
		},{
			header : '计费周期',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'chargingCycle',
			width : 60,
			renderer : IsmpHB.renderer.CHARGINGCYCLE
		}, {
			header : '订购生效模式',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'effectMode',
			width : 100,
			renderer : IsmpHB.renderer.EFFECTMODE
		}, {
			header : '退订生效模式',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'withdrawMode',
			width : 100,
			renderer : IsmpHB.renderer.EFFECTMODE
		}, {
			header : '试用期类型',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'trialType',
			width : 80,
			renderer : IsmpHB.renderer.TRIAL_TYPE
		}, {
			header : '试用时长',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'trialTerm',
			width : 60
		}, {
			header : '操作类型',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'operateType',
			width : 80,
			renderer : IsmpHB.renderer.OPERATETYPE
		}, {
			header : '业务资费',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'price',
			width : 80,
			renderer : function(obj){
				return obj/IsmpHB.data.RATE;
			}
		
		}, {
			header : '审核标志',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'auditingFlag',
			width : 80,
			renderer : IsmpHB.renderer.AUDITING_FLAG
		}, {
			header : '审核者',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'operator',
			width : 60
		}, {
			header : '更新时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'updateTime',
			width : 80
		} ]);
		IsmpHB.auditing.DataGrid.superclass.constructor.apply(this, arguments);

		this.on("show", function() {
			this.loadItems();
		}, this);
		this.remvBtn.on('click', function() {
			this.removeItem();
		}, this);
		this.passBtn.on('click', function() {
			this.passItem();
		}, this);
		this.unpassBtn.on('click', function() {
			this.unPassItem();
		}, this);
		this.searchBtn.on('click',function(){
			this.searchItems();
		},this);
		this.codeField.on('specialkey', function(field, e) {
			if (e.getKey() == e.ENTER) {
				this.searchBtn.fireEvent('click');
			}
		}, this);

	},
	searchItems : function(){		
		this.getStore().baseParams = {
			method : 'searchByCode',
			code : this.codeField.getValue().trim()||'',
			auditingType : this.flagCombo.getValue()
		};
		this.getStore().load( {
			params : {
				start : 0,
				limit : this.pageBar.pageSize
			},
			callback : function(r, o, s) {

			},
			scope : this
		});
				
	},
	
	loadItems : function() {

		if (IsmpHB.data.AUDITING_TYPE.ALL != this.flagCombo.getValue()) {
			this.getStore().baseParams = {
				method : 'search',
				auditingType : this.flagCombo.getValue()
			}
		} else {
			this.getStore().baseParams = {
				method : 'all'
			}
		}
		this.getStore().load( {
			params : {
				start : 0,
				limit : this.pageBar.pageSize
			},
			callback : function(r, o, s) {

			},
			scope : this
		});
	},
	removeItem : function() {
		var r = this.getSelectionModel().getSelected();
		if (null == r || null == r.data) {
			Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
			return;
		}
		if (IsmpHB.data.AUDITING_TYPE.PASS == r.data.auditingFlag
				|| IsmpHB.data.AUDITING_TYPE.AUTO == r.data.auditingFlag
				|| IsmpHB.data.AUDITING_TYPE.UNPASS == r.data.auditingFlag) {
			Ext.MessageBox.alert('提示', '已经审核过的产品记录不能够被删除！', null, this);
			return;
		}
		Ext.MessageBox.confirm("提示", "确认要删除所选记录吗？", function(id) {
			if (id == "yes") {
				var req = {
					url : IsmpHB.req.PRODUCT_AUDITING_REV,
					params : {
						method : 'remove',
						id : r.data.id
					},
					scope : this,
					callback : function(o) {
						if (o.success) {
							Ext.MessageBox.alert('提示', '删除成功！', function() {
								this.getStore().remove(r);
								this.change(this.getStore(), this.pageBar);
							}, this);
						} else {
							Ext.MessageBox.alert('提示', '删除失败！', function() {
							}, this);
						}
					}
				};
				IsmpHB.Ajax.send(req);
			}
		}, this);
	},
	passItem : function() {
		var r = this.getSelectionModel().getSelected();
		if (null == r || null == r.data) {
			Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
			return;
		}
		if (this.validateCyle(r.data.chargingCycle)) {
			if(IsmpHB.data.AUDITING_TYPE.PASS==r.data.auditingFlag||
					IsmpHB.data.OPERATE_TYPE.ADD==r.data.operateType){
				Ext.MessageBox.alert('提示', '节目类已自动审核，不需要重复审核！', null, this);
				return;
			}
			
		}
		if (IsmpHB.data.AUDITING_TYPE.PASS == r.data.auditingFlag) {
			Ext.MessageBox.alert('提示', '此产品已经审核通过，不需要重复审核！', null, this);
			return;
		}
		if (IsmpHB.data.AUDITING_TYPE.UNPASS == r.data.auditingFlag) {
			Ext.MessageBox.alert('提示', '审核过的产品记录不允许修改！', null, this);
			return;
		}
		Ext.MessageBox.confirm("提示", "确认要通过所选记录的审核吗？", function(id) {
			if (id == "yes") {
				var req = {
					url : IsmpHB.req.PRODUCT_AUDITING_PASS,
					params : {
						method : 'pass',
						operator : IsmpHB.common.getSession('loginInfo').name,
						updateTime : new Date().valueOf(),
						proAud : Ext.encode(r.data)
					},
					scope : this,
					callback : function(o) {
						if (o.success) {
							Ext.MessageBox.alert('提示', '审核通过！', function() {
								this.getStore().remove(r);
								this.change(this.getStore(), this.pageBar);
							}, this);
						} else {
							Ext.MessageBox.alert('提示', o.message || '审核失败！',
									function() {
									}, this);
						}
					}
				};
				IsmpHB.Ajax.send(req);
			}
		}, this);
	},
	unPassItem : function() {
		var r = this.getSelectionModel().getSelected();
		if (null == r || null == r.data) {
			Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
			return;
		}
		if (IsmpHB.data.AUDITING_TYPE.PASS == r.data.auditingFlag||IsmpHB.data.AUDITING_TYPE.AUTO==r.data.auditingFlag) {
			Ext.MessageBox.alert('提示', '此产品已经审核通过，请确认你的操作！', null, this);
			return;
		}
		if (IsmpHB.data.AUDITING_TYPE.UNPASS == r.data.auditingFlag) {
			Ext.MessageBox.alert('提示', '重复操作，请确认你的操作！', null, this);
			return;
		}
		Ext.MessageBox.confirm("提示", "确认要不通过所选记录的审核吗？", function(id) {
			if (id == "yes") {
				var req = {
					url : IsmpHB.req.PRODUCT_AUDITING_UNPASS,
					params : {
						method : 'unPass',
						operator : IsmpHB.common.getSession('loginInfo').name,
						updateTime : new Date().valueOf(),
						proAud : Ext.encode(r.data)
					},
					scope : this,
					callback : function(o) {
						if (o.success) {
							Ext.MessageBox.alert('提示', '操作成功！', function() {
								this.getStore().remove(r);
								this.change(this.getStore(), this.pageBar);
							}, this);
						} else {
							Ext.MessageBox.alert('提示', o.message || '操作失败！',
									function() {
									}, this);
						}
					}
				};
				IsmpHB.Ajax.send(req);
			}
		}, this);

	},
	//验证是否为节目类产品
	validateCyle : function(value) {
		if (IsmpHB.data.CHARGING_CYCLE.TIME == value
				|| IsmpHB.data.CHARGING_CYCLE.MINUTE == value
				|| IsmpHB.data.CHARGING_CYCLE.SECOND == value) {
			return true;
		}
		return false;
	},
	change : function(c, f) {
		if (c.getCount() <= 0) {
			f.movePrevious();
		} else {
			f.doRefresh();
		}

	}

})
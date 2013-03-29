/**
 * @author pansenxin
 */
Ext.namespace('IsmpHB', 'IsmpHB.ecrmOrderUser');
IsmpHB.ecrmOrderUser.basicItemForm = Ext.extend(Ext.form.FormPanel, {
	title : '基本信息',
	labelWidth : 100,
	labelAlign : 'right',
	border : false,
	autoScroll : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',
	oldParam : 0,
	layout : 'column',

	cityIdField : new Ext.form.TextField( {
		fieldLabel : '地市',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	servNbrField : new Ext.form.TextField( {
		fieldLabel : '服务编码',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	accNbrField : new Ext.form.TextField( {
		fieldLabel : '产品接入号',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	payAccField : new Ext.form.TextField( {
		fieldLabel : '付费号码',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	stateField : new Ext.form.TextField( {
		fieldLabel : '服务状态',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	prodTypeField : new Ext.form.TextField( {
		fieldLabel : '产品类型',
		style : "color:black",
		readOnly : true,
		width : 200
	}),
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		config.items.push( [ {
			layout : 'form',
			bodyBorder : false,
			items : [ this.cityIdField, this.servNbrField ]
		}, {
			layout : 'form',
			bodyBorder : false,
			items : [ this.accNbrField, this.payAccField ]
		}, {
			layout : 'form',
			bodyBorder : false,
			items : [ this.stateField, this.prodTypeField ]
		} ]);
		IsmpHB.ecrmOrderUser.basicItemForm.superclass.constructor.apply(this,
				arguments);

	},
	setValue : function(o) {
		if (null != o[0]) {
			this.cityIdField
					.setValue(IsmpHB.renderer.ECRMPRODUCTCITYCOBO(o[0]));
		}
		if (null != o[1]) {
			this.servNbrField.setValue(o[1]);
		}
		if (null != o[2]) {
			this.accNbrField.setValue(o[2]);
		}
		if (null != o[3]) {
			this.payAccField.setValue(o[3]);
		}
		if (null != o[4]) {
			this.stateField.setValue(IsmpHB.renderer.ECRMORDERUSERSTATE(o[4]));
		}
		if (null != o[5]) {
			this.prodTypeField.setValue(o[5]);
		}
	}
});
IsmpHB.ecrmOrderUser.productItemForm = Ext.extend(Ext.Panel, {
	title : '产品属性',
	id : 'ecrmProductString',
	height : 212,
	autoScroll : true,//自动显示滚动条     
	bodyPadding : 5,
	html : " "
});
IsmpHB.ecrmOrderUser.productItemDlg = Ext.extend(Ext.Window, {
	autoScroll : true,
	modal : true,
	width : 1000,
	height : 331,
	constrainHeader : true,
	closeAction : 'hide',

	basicconfigForm : null,
	productconfigForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.basicconfigForm = new IsmpHB.ecrmOrderUser.basicItemForm( {});
		this.productconfigForm = new IsmpHB.ecrmOrderUser.productItemForm( {});
		config.items.push( [ this.basicconfigForm, this.productconfigForm ]);
		IsmpHB.ecrmOrderUser.productItemDlg.superclass.constructor.apply(this,
				arguments);
	},
	showProduct : function(data) {
		this.basicconfigForm.setValue(data);
		var req = {
			url : IsmpHB.req.ECRM_ORDERUSER_PRODUCT,
			params : {
				timestamp : new Date().valueOf(),
				servNbr : data[1],
				prodType : data[6]
			},
			scope : this,
			callback : function(o) {
				this.productconfigForm.body
										.update(o.ecrmProductString)
			}
		};
		IsmpHB.Ajax.send(req);
	}
});
IsmpHB.ecrmOrderUser.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '订购关系',
	autoScroll : true,
	store : Ext.StoreMgr.get('ecrm_order_user'),
	cls : 'box-dataGrid',	
	cityIdField : new Ext.form.ComboBox( {
		emptyText : '地市',
		displayField : 'name',
		valueField : 'areaCode',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		store : IsmpHB.store.CITY_GD,
		width : 90
	}),	
	servNbrField : new Ext.form.TextField( {
		emptyText : '服务编码',
		maxLength : 110,
		msgTarget : 'side',
		width : 150
	}),
	custIdField : new Ext.form.TextField( {
		emptyText : '客户ID',
		maxLength : 20,
		msgTarget : 'side',
		width : 100
	}),
	custNameField : new Ext.form.TextField({
		emptyText : '客户名称',
		maxLength : 30,
		msgTarget : 'side',
		width : 100
	}),
	accNbrField : new Ext.form.TextField( {
		emptyText : '产品接入码',
		maxLength : 100,
		msgTarget : 'side',
		width : 150
	}),
	stateField : new Ext.form.ComboBox( {
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : true,
		emptyText : '服务状态',
		displayField : 'name',
		valueField : 'id',
		width : 110,
		store : new Ext.data.ArrayStore( {
			fields : [ 'id', 'name' ],
			data : [ [ '', '所有' ], [ 'B0S', '停机' ], [ 'B0T', '拆机' ],
					[ 'B0A', '正常' ] ]
		})
	}),
	isvpnField : new Ext.form.ComboBox( {
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : true,
		emptyText : '企业总机',
		displayField : 'name',
		valueField : 'id',
		width : 110,
		store : new Ext.data.ArrayStore( {
			fields : [ 'id', 'name' ],
			data : [ [ '-1', '所有' ], [ '0', '总机服务' ], [ '1', '企业VPN' ] ]
		})
	}),
	proTypeField : new Ext.form.ComboBox( {
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : true,
		emptyText : '产品类型',
		displayField : 'name',
		valueField : 'id',
		width : 130,
		forceSelection : false,
		displayText : '所有类型',
		store : IsmpHB.store.ECRMSUPPRODUCTBYTYPE,
		listeners : {
			"focus" : function() {
				this.getStore().load();
			}
		}
	}),
	createDateField : new Ext.form.DateField( {
		format : 'Y-m-d',
		allowBlank : true,
		emptyText : '创建时间',
		msgTarget : 'side',
		width : 100
	}),
	updateDateField : new Ext.form.DateField( {
		format : 'Y-m-d',
		allowBlank : true,
		emptyText : '更新时间',
		msgTarget : 'side',
		width : 100
	}),
	searchBtn : new Ext.Button( {
		text : '搜索',
		cls : 'btn-search btn-common'
	}),
	resetBtn : new Ext.Button( {
		text : '重置搜索条件',
		cls : 'btn-common-wide btn-common'
	}),
	relevantInfoBtn : new Ext.Button( {
		text : '详情',
		cls : 'btn-common-wide btn-common'
	}),
	constructor : function(config) {
		this.productdlg = new IsmpHB.ecrmOrderUser.productItemDlg( {});
		this.pagingbar = new Ext.PagingToolbar( {
			pageSize : 20,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('10-5');
		var arr = [];
		if (IsmpHB.common.isHasPermission(a, 1)) {
			arr.push(this.searchBtn);
			arr.push(this.resetBtn);
		}
		if (IsmpHB.common.isHasPermission(a, 15)) {
			arr.push(this.relevantInfoBtn);
		}
		var nc = IsmpHB.common.getSession("loginInfo").nodeCode;
		config.tbar.push(new Ext.Panel( {
			border : false,
			items : [
					{
						xtype : 'toolbar',
						border : false,
						items : ['客户ID：',this.custIdField,'客户名称：',this.custNameField,  '产品类型：', this.proTypeField ,'企业总机类型：',this.isvpnField,'地市：', this.cityIdField,  '服务状态：', this.stateField ]
					},
					{
						xtype : 'toolbar',
						border : false,
						items : ['服务编码：',this.servNbrField,'产品接入码：',this.accNbrField,'创建时间：',
								this.createDateField, '更新时间：',
								this.updateDateField ]
					}, {
						xtype : 'toolbar',
						border : false,
						items : [ arr ]
					} ]
		}));
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel( {
			header : '',
			checkOnly : true
		});
		this.cm = new Ext.grid.ColumnModel( [ this.sm, {
			header : '地市',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'cityId',
			renderer : IsmpHB.renderer.ECRMPRODUCTCITYCOBO,
			width : 100
		}, {
			header : '客户ID',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'custId',
			width : 100
		},{
			header : '客户名称',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'custName',
			width : 120
		},{
			header : '服务编码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'servNbr',
			width : 160
		}, {
			header : '产品接入号',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'accNbr',
			width : 150
		}, {
			header : '关联产品接入号',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'relaAccNbr',
			width : 120
		}, {
			header : '开通时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'beginDate',
			width : 100
		}, {
			header : '失效时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'befBmDate',
			width : 100
		}, {
			header : '付费号码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'payAcc',
			width : 100
		}, {
			header : '服务状态',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'state',
			renderer : IsmpHB.renderer.ECRMORDERUSERSTATE,
			width : 100
		}, {
			header : '产品类型',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'prodType',
			width : 100
		}, {
			header : '创建时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'createDate',
			width : 100
		}, {
			header : '更新时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'updateDate',
			width : 100
		}, {
			header : '服务Id',
			align : 'left',
			menuDisabled : true,
			hidden : true,
			dataIndex : 'prodId',
			width : 200
		} ]);
		IsmpHB.ecrmOrderUser.DataGrid.superclass.constructor.apply(this,
				arguments);

		this.searchBtn.on('click', function() {
			this.searchItems();
		}, this);
		this.resetBtn.on('click', function() {
			this.resetAllConditions();
		}, this);
		this.relevantInfoBtn.on('click', function() {
			var rs = this.getSelectionModel().getSelections();
			if (rs.length == 0) {
				Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
				return;
			} else if (rs.length > 1) {
				Ext.MessageBox.alert('提示', '只能选择一条记录进行查看！', null, this);
				return;
			} else {
				var arrayObj = new Array();
				arrayObj.push(rs[0].data.cityId);
				arrayObj.push(rs[0].data.servNbr);
				arrayObj.push(rs[0].data.accNbr);
				arrayObj.push(rs[0].data.payAcc);
				arrayObj.push(rs[0].data.state);
				arrayObj.push(rs[0].data.prodType);
				arrayObj.push(rs[0].data.prodId);
				this.productdlg.showProduct(arrayObj);
				this.productdlg.show();
			}
		}, this);
	},
	resetAllConditions : function() {
		this.cityIdField.reset();
		this.servNbrField.reset();
		this.accNbrField.reset();
		this.stateField.reset();
		this.proTypeField.reset();
		this.createDateField.reset();
		this.updateDateField.reset();
		this.custIdField.reset();
		this.custNameField.reset();
	},
	loadItems : function(s, l) {
		this.getStore().load( {
			params : {
				timestamp : new Date().valueOf(),
				start : s || 0,
				limit : l || this.pagingbar.pageSize
			},
			callback : function(r, o, s) {
			},
			scope : this
		});
	},
	searchItems : function(name) {
		var dateValid = IsmpHB.customFunctions.dateValid(this.createDateField
				.getValue(), this.updateDateField.getValue());		
		if (!dateValid) {
			Ext.MessageBox.alert('搜索条件有误', '创建日期不能在更新日期之后，请修正！', null, this);
			return;
		}		
		if(this.custIdField.getValue() != ''){			
			var reg = /^\+?[1-9][0-9]*$/ ;				
			if(!reg.test(this.custIdField.getValue())){
				Ext.MessageBox.alert('搜索条件有误', '客户ID要填写正整数，请修正！', null, this);
				return;				
			}			
		}
				
		this.getStore().baseParams = {
			method : 'search',
			cityId : this.cityIdField.getValue(),
			servNbr : this.servNbrField.getValue(),
			accNbr : this.accNbrField.getValue(),
			state : this.stateField.getValue(),
			prodType : this.proTypeField.getValue(),
			createTime : this.createDateField.getValue(),
			updateTime : this.updateDateField.getValue(),
			isvpn    : this.isvpnField.getValue(),
			custId   : this.custIdField.getValue(),
			custName  : this.custNameField.getValue()
		};
		this.getStore().load( {
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

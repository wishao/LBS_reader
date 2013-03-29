/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.BusinessOperator');
IsmpHB.BusinessOperator.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 80,
	labelAlign : 'right',
	border : false,
	autoScroll : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',
	oldParam : 0,
	layout : 'column',

	nameField : new Ext.form.TextField( {
		fieldLabel : '名称',
		allowBlank : false,
		emptyText : '请填写名称',
		blankText : '请填写名称',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		width : 200
	}),
	numField : new Ext.form.TextField( {
		fieldLabel : '总机号',
		regex : /^[^\u4e00-\u9fa5]*?$/,
		regexText : '请输入有效的值，不能有中文',
		allowBlank : false,
		emptyText : '请填写总机号',
		blankText : '请填写总机号',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		maxLength : 100,
		msgTarget : 'side',
		width : 200,
		listeners : {
			"change" : function(obj, n, o) {
				this.ownerCt.oldParam = o;
			}
		}
	}),
	addressField : new Ext.form.TextField( {
		fieldLabel : '所在地市',
		allowBlank : false,
		emptyText : '请填写所在地市',
		blankText : '请填写所在地市',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		width : 200
	}),
	dbField : new Ext.form.DateField( {
		fieldLabel : '生效日期',
		format : 'Y-m-d',
		allowBlank : false,
		emptyText : '有效期开始日期',
		msgTarget : 'side',
		width : 200
	}),
	taoField : new Ext.form.ComboBox( {
		fieldLabel : '套餐',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '套餐',
		displayField : 'taoName',
		valueField : 'code',
		width : 200,
		store : new Ext.data.ArrayStore( {
			fields : [ 'code', 'taoName' ],
			data : [ [ '0', '智慧云社区' ], [ '1', '六月测试套餐' ], [ '2', '省电信专用套餐' ],
					[ '3', 'TB1' ], [ '4', 'TB2' ] ]
		})
	}),
	commitBtn : new Ext.Button( {
		id : 'commitBtn',
		text : '提交',
		iconCls : 'btn-commit'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		config.items.push( [ {
			columnWidth : .5,
			layout : 'form',
			bodyBorder : false,
			items : [ this.nameField, this.numField,
					this.addressField, this.dbField ,this.taoField]
		} ]);

		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		IsmpHB.BusinessOperator.ItemForm.superclass.constructor.apply(this,
				arguments);

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
			this.idField.setValue(o.id);
		}
		if (null != o.kname) {
			this.nameField.setValue(o.kname);
		}
		if (null != o.kcode) {
			this.seqNumField.setValue(o.kcode);
		}
	},
	isValid : function() {
		return this.nameField.isValid() && this.numField.isValid()
				&& this.taoField.isValid() && this.addressField.isValid()
				&& this.dbField.isValid();
	},
	commitAdd : function() {
		if(this.isValid()){
		var param ="{"+
					"name:'"+this.nameField.getValue()+"',"+
					"tel:'"+this.numField.getValue()+"',"+
					"address:'"+this.addressField.getValue()+"',"+
					"startDate:'"+this.dbField.getValue()+"',"+
					"productId:'"+this.taoField.getValue()+"'"+
					"}";
		var postUrl="http://59.41.186.76:11581/Login?ISMP-HB=1&username=gzadmin3_gz&password=123456&param="+param;
		document.location.href =postUrl;
		}
	},
	commitEdit : function() {

	}
});
IsmpHB.BusinessOperator.ItemDlg = Ext.extend(Ext.Window, {
	title : '增加企业总机',
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
		this.configForm = new IsmpHB.BusinessOperator.ItemForm( {});
		config.items.push(this.configForm);
		IsmpHB.BusinessOperator.ItemDlg.superclass.constructor.apply(this,
				arguments);
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
});IsmpHB.BusinessOperator.DataPanel= Ext.extend(Ext.Panel, {
	title : '企业总机录入',
	autoScroll : true,
	//layout : "fit",
	cls : 'box-dataGrid',
	addBtn : new Ext.Button( {
		text : '新增',
		cls : 'btn-search btn-common'
	}),
	constructor : function(config) {
	this.dlg = new IsmpHB.BusinessOperator.ItemDlg( {});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('1-1');
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.addBtn);
		
	IsmpHB.BusinessOperator.DataPanel.superclass.constructor.apply(this, arguments);
	this.addBtn.on('click', function() {
			this.dlg.show();
			this.dlg.toAdd();
		}, this);
}

});

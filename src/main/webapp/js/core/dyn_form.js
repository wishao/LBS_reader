/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.dynform');

IsmpHB.dynform.DynamicForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 70,
	labelAlign : 'right',
	autoScroll : true,
	frame : true,
	buttonAlign : 'center',

	OPERATION : 0,

	constructor : function(config) {
		this.OPERATION = 0;
		this.commitBtn = new Ext.Button({
					text : '提交',
					iconCls : 'btn-commit'
				});
		config = config || {};
		config.items = config.items || [];
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		IsmpHB.dynform.DynamicForm.superclass.constructor
				.apply(this, arguments);

		this.commitBtn.on('click', function() {
					if (!this.isValid()) {
						return false;
					}
					this.parentCt.attrs2Store(this.productId, this.getValues());
					this.ownerCt.hide();
				}, this);
	},
	isValid : function() {
		for (var i = 0; i < this.items.getCount(); i++) {
			if (!this.items.get(i).isValid()) {
				return false;
			}
		}
		return true;
	},
	setValues : function(o, record) {
		this.OPERATION = o;
		if (null != record) {
			this.loadRecord(record);
		} else {
			this.resetDynForm();
		}
	},
	loadRecord : function(record) {
		var o = record;
		for (var i = 0; i < this.items.getCount(); i++) {
			if ('levelNum' == this.items.get(i).getName()) {

			} else {
				this.items.get(i).setValue(o[i].v);
				console.log('o[' + i + '].v' + o[i].v);
			}
		}
	},
	getValues : function() {
		var attrs = [];
		for (var i = 0; i < this.items.getCount(); i++) {
			if ('datefield' == this.items.get(i).getXType()) {
				attrs.push({
							k : this.items.get(i).getName(),
							v : this.items.get(i).getRawValue()
						});
			}
			attrs.push({
						k : this.items.get(i).getName(),
						v : this.items.get(i).getValue()
					});
		}
		return attrs;
	},
	resetDynForm : function() {
		for (var i = 0; i < this.items.getCount(); i++) {
			if ('typeId' != this.items.get(i).getName()) {
				this.items.get(i).reset();
			}
		}
	}
});

IsmpHB.dynform.DynamicDlg = Ext.extend(Ext.Window, {
	title : '订购该产品要求填写以下附加信息',
	layout : 'fit',
	modal : true,

	configForm : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		config.width = 350;
		config.height = 100 + 25 * Ext.StoreMgr.get('productattr').getCount();
		this.configForm = new IsmpHB.dynform.DynamicForm({
					items : this.getDynFormItems(),// XXX
					parentCt : config.parentCt,
					productId : config.productId,
					attrs : config.attrs,
					oper : config.oper
				});
		config.items.push(this.configForm);
		IsmpHB.dynform.DynamicDlg.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
					this.setValues(this.configForm.oper, this.configForm.attrs);
				}, this);
		// check if the form is valid, then decide the row select
		this.on('beforehide', function() {
					if (!this.configForm.isValid()) {
						if (this.configForm.parentCt.getSpecItemAmount() > 1) {
							// if the form is invalid, deselect the spec-item
							this.configForm.parentCt
									.deselectItem(this.configForm.productId);//
						} else {
							// 10Jun2012, TODO
							if (this.configForm.oper == 2) {
								var t = this;
								Ext.MessageBox.alert("提示", "必填项不能为空！",
										function() {
											t.setValues(1, t.configForm.attrs);
										});

								return false;
							} else {
								Ext.MessageBox.alert("提示",
										"未填写必需的附加信息，不能订购该产品。", function() {
											this.configForm.parentCt.resetPkg();
										}, this);
							}
						}
					}
				});
	},
	setValues : function(o, record) {
		this.configForm.setValues(o, record);
	},
	getDynFormItems : function() {
		var fs = [];
		Ext.StoreMgr.get('productattr').each(function(r) {
					r.data.width = 200;
					fs.push(r.data);
				}, this);
		return fs;
	}
});
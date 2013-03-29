/**
 * @author guoguangfu 2011.07.05
 */
Ext.namespace('LBSReader', 'LBSReader.admin');
LBSReader.admin.MyCheckboxGroup = Ext.extend(Ext.form.CheckboxGroup, {
	columns : 2,
	dataUrl : '', // 数据地址
	labelFiled : 'name',
	valueFiled : 'id',
	setValue : function(val) {
		if (val.split) {
			val = val.split(',');
		}
		this.reset();
		for (var i = 0; i < val.length; i++) {
			this.items.each(function(c) {
						// debugger;

						if (c.inputValue == val[i]) {
							c.setValue(true);
						}
					});
		}

	},
	reset : function() {
		this.items.each(function(c) {
					c.setValue(false);
				});
	},

	getValue : function() {
		var val = [];
		this.items.each(function(c) {
					if (c.getValue() == true)
						val.push(c.inputValue);
				});
		return val.join(',');
	},
	onRender : function(ct, position) {
		var items = [];
		// alert(items.length);
		if (!this.items) { // 如果没有指定就从URL获取
			Ext.Ajax.request({
						url : this.dataUrl,
						scope : this,
						async : false,
						success : function(response) {
							var data = Ext.util.JSON
									.decode(response.responseText);

							data = data.rows || data;

							var Items2 = this.items;

							if (this.panel) {

								var columns = this.panel.items;

								if (columns) {
									for (var i = 0; i < columns.items.length; i++) {
										column = columns.items[i];
										column.removeAll();
									}
									Items2.clear();
								}
							}

							for (var i = 0; i < data.length; i++) {
								var d = data[i];
								var chk = {
									boxLabel : d[this.labelFiled],
									name : this.name,
									inputValue : d[this.valueFiled],
									tooltip : 'sssf'
								};
								alert(d[this.labelFiled]);
								items.push(chk);
								// alert(items.length);
							}

						}

					});
			this.items = items;
		}
		LBSReader.admin.MyCheckboxGroup.superclass.onRender.call(this, ct,
				position);
	}
});
Ext.reg('mycheckgroup', LBSReader.admin.MyCheckboxGroup);

LBSReader.admin.ModPwdForm = Ext.extend(Ext.form.FormPanel, {
			labelWidth : 70,
			labelAlign : 'right',
			bodyStyle : 'padding:5px 5px 5px 5px;',
			border : false,
			account : new Ext.form.TextField({
						fieldLabel : '账 号',
						name : 'account',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						disabled : true,
						width : 200
					}),
			pwd : new Ext.form.TextField({
						fieldLabel : '密 码',
						name : 'pwd',
						allowBlank : false,
						inputType : 'password',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						width : 200
					}),
			pwd1 : new Ext.form.TextField({
						fieldLabel : '确认密码',
						name : 'pwd',
						allowBlank : false,
						inputType : 'password',
						validator : LBSReader.customFunctions.validateBankTrim,
						invalidText : '不能全为空格',
						width : 200
					}),
			addBtn : new Ext.Button({
						text : '保存',
						type : 'submit',
						minWidth : 70,
						formBind : true
					}),
			resetForm : function() {
				this.pwd.reset();
				this.pwd1.reset();
			},
			constructor : function(config) {
				config.items = this.items || [];
				config.buttons = this.buttons || [];
				config.items.push(this.account);
				config.items.push(this.pwd);
				config.items.push(this.pwd1);
				config.buttons.push(this.addBtn);
				LBSReader.admin.ModPwdForm.superclass.constructor.apply(this,
						arguments);

				this.addBtn.on('click', function() {
							if (this.pwd.getValue() != this.pwd1.getValue()) {
								Ext.MessageBox.alert('提示', '两次密码不一致');
								return;
							}
							this.toAdd();
						}, this);
			},
			isvalid : function() {
				return '' == this.pwd.getValue() || null == this.pwd.getValue()
						|| '' == this.pwd1.getValue()
						|| null == this.pwd1.getValue();
			},
			toAdd : function() {
				if (this.isvalid()) {
					Ext.MessageBox.alert('提示', '密码不能为空');
					return;
				}
				var req = {
					url : LBSReader.req.ADMIN_MGR,
					params : {
						account : this.account.getValue(),
						pwd : this.pwd.getValue(),
						method : 'changePwd'
					},
					scope : this,
					callback : function(o) {
						if (o) {
							if (o.exId) {
								Ext.MessageBox.alert('提示', o.exDesc || '操作错误！',
										function(va) {
											if (va == 'yes') {
												window.location.reload(true);
											}
										}, this);
							}
							this.ownerCt.hide();
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '密码修改成功',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						} else {
							Ext.Msg.show({
										title : '操作提示',
										msg : o.message || '密码修改失败，请稍后在试',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				}
				LBSReader.Ajax.send(req);
			}

		});

LBSReader.admin.modPwdDlg = Ext.extend(Ext.Window, {
	title : '修改密码窗口',
	layout : 'fit',
	modal : true,
	width : 350,
	height : 150,
	constrainHeader : true,
	resizable : false,
	closeAction : 'hide',
	configForm : null,

	constructor : function(config) {
		var config = config || {};
		config.items = this.items || [];
		this.configForm = new LBSReader.admin.ModPwdForm({});
		config.items.push(this.configForm);
		LBSReader.admin.modPwdDlg.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
				}, this);
	},
	toAdd : function() {
		this.configForm.resetForm();
	},
	toEdit : function() {
		this.configForm.resetForm();
	},
	setValue : function(o) {
		this.configForm.setValue(o);
	}
});

LBSReader.admin.AdminForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 70,
	labelAlign : 'right',
	bodyStyle : 'padding:5px 5px 5px 5px;',
	border : false,
	layout : 'form',

	account : new Ext.form.TextField({
				fieldLabel : '账 号',
				name : 'account',
				allowBlank : false,
				emptyText : '账号不能为空',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				width : 200
			}),
	name : new Ext.form.TextField({
				fieldLabel : '姓 名',
				name : 'name',
				allowBlank : false,
				emptyText : "姓名不能为空",
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				width : 200
			}),
	telField : new Ext.form.TextField({
				fieldLabel : '电 话',
				name : 'tel',
				allowBlank : false,
				emptyText : "电话不能为空",
				// validator : LBSReader.customFunctions.validateBankTrim,
				// invalidText : '不能全为空格',
				regex : new RegExp('^([0-9]{11})$'),
				regexText : '电话号码不合法',
				width : 200
			}),
	emailField : new Ext.form.TextField({
		fieldLabel : 'email',
		name : 'email',
		allowBlank : false,
		emptyText : "email不能为空",
		// validator : LBSReader.customFunctions.validateBankTrim,
		// invalidText : '不能全为空格',
		regex : new RegExp('^([a-zA-Z0-9])+(\.[a-zA-Z0-9])*@([a-zA-Z0-9])+((\.[a-zA-Z0-9])+)$'),
		regexText : 'email输入不合法',
		width : 200
	}),
	deptField : new Ext.form.TextField({
				fieldLabel : '部 门',
				name : 'dept',
				// allowBlank : false,
				// emptyText : "姓名不能为空",
				// validator : LBSReader.customFunctions.validateBankTrim,
				// invalidText : '不能全为空格',
				width : 200
			}),
	pwd : new Ext.form.TextField({
				fieldLabel : '密 码',
				name : 'pwd',
				allowBlank : false,
				emptyText : "密码不能为空",
				inputType : 'password',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				width : 200
			}),
	desc : new Ext.form.TextArea({
				grow : true,
				fieldLabel : '个人描述',
				name : 'desc',
				width : 200
			}),
	node : new Ext.form.ComboBox({
				fieldLabel : '所属地市',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择地市',
				displayField : 'name',
				valueField : 'nodeCode',
				width : 200,
				store : LBSReader.store.CITY_GUANGDONG,
				value : 'GZ'
			}),
	role : new Ext.form.ComboBox({
		fieldLabel : '所属角色',
		editable : false,
		mode : 'local',
		submitValue : '',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择角色',
		displayField : 'name',
		tpl : '<tpl for="."><div class="x-combo-list-item"><span><input type="checkbox" {[values.check?"checked":""]}  value="{[values.id]}" /></span><span >{name}</span></div></tpl>',
		valueField : 'id',
		width : 200,
		store : LBSReader.store.ROLE_STORE,
		selectOnFocus : true,
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) != false) {
				record.set('check', !record.get('check'));
				var str = [];// 页面显示的值
				var strvalue = [];// 传入后台的值
				this.store.each(function(rc) {
							if (rc.get('check')) {
								str.push(rc.get('name'));
								strvalue.push(rc.get('id'));
							}
						});
				this.setValue(str.join());
				this.submitValue = strvalue.join();
				// this.setRawValue(str.join());
				// this.value=strvalue.join();//赋值
				this.fireEvent('select', this, record, index);
			}
		},
		listeners : {
			expand : function(value) {// 监听下拉事件
				this.store.each(function(rc) {
							if (value.value == rc.get('id')) {
								rc.set('check', true);// 选中
							}
						});
			}
		}
	}),
	typeCombo : new Ext.form.ComboBox({
				fieldLabel : '选择权限',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择权限',
				displayField : 'name',
				valueField : 'type',
				width : 200,
				store : new Ext.data.ArrayStore({
							fields : ['type', 'name'],
							data : [['16', '地市管理员'] /* , [ '', '省级管理员' ] */]
						}),
				value : 16
			}),
	addBtn : new Ext.Button({
				text : '保存',
				type : 'submit',
				minWidth : 70,
				formBind : true
			}),
	cancelBtn : new Ext.Button({
				text : '取消',
				minWidth : 70
			}),
	constructor : function(config) {
		this.config = config || {};
		config.items = this.items || [];
		config.buttons = config.buttons || [];
		// config.items.push([{
		// columnWidth: .5,
		// layout: 'form',
		// bodyBorder : false,
		// items:[this.account,this.pwd,this.name,this.telField,this.emailField,this.deptField,this.node]
		// },{
		// columnWidth: .5,
		// layout: 'form',
		// bodyBorder : false,
		// items:[this.desc,this.role]
		// }]);
		config.items.push(this.account);
		config.items.push(this.pwd);
		config.items.push(this.name);
		config.items.push(this.telField);
		config.items.push(this.emailField);
		config.items.push(this.deptField);
		config.items.push(this.node);
		// config.items.push(this.privgroup);
		config.items.push(this.role);
		// config.items.push(this.typeCombo);
		config.items.push(this.desc);
		config.buttons.push(this.addBtn);
		config.buttons.push(this.cancelBtn);
		LBSReader.admin.AdminForm.superclass.constructor.apply(this, arguments);
		this.addBtn.on('click', function() {
					this.toadd();
				}, this);
		this.cancelBtn.on('click', function() {
					this.cancelOp();
				}, this)
	},
	resetForm : function() {
		this.name.reset();
		this.account.reset();
		this.pwd.reset();
		this.node.reset();
		this.desc.reset();
		this.telField.reset();
		this.emailField.reset();
		// this.typeCombo.reset();
	},

	isValid : function() {
		return this.account.isValid() && this.pwd.isValid()
				&& this.node.isValid() && this.typeCombo.isValid()
				&& this.account.getValue().length > 0 && this.name.isValid()
				&& this.name.getValue().length > 0
				&& this.role.submitValue != '';
	},

	toadd : function() {
		if (!this.isValid()) {
			return;
		}
		// var arr = this.role.submitValue.split(',');
		// if(arr.indexOf(1)||arr.indexOf(2)){
		// this.typeCombo.setValue(9);
		// }
		var req = {
			url : LBSReader.req.ADMIN_MGR,
			params : {
				account : this.account.getValue(),
				pwd : this.pwd.getValue(),
				name : this.name.getValue(),
				tel : this.telField.getValue(),
				email : this.emailField.getValue(),
				dept : this.deptField.getValue(),
				desc : this.desc.getValue(),
				node : this.node.getValue(),
				type : this.typeCombo.getValue(),
				roleId : this.role.submitValue,
				method : 'add'
			},
			scope : this,
			callback : function(o) {
				if (o) {
					if (o.exId) {
						Ext.MessageBox.alert('提示', o.exDesc || '操作错误！',
								function(va) {
									if (va == 'yes') {
										window.location.reload(true);
									}
								}, this);
					}
					this.ownerCt.hide();
					this.resetForm();
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '添加成功',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '添加失败，请确认你是否拥有权限',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		}
		LBSReader.Ajax.send(req);
	},
	cancelOp : function() {
		this.ownerCt.hide();
	}

});

LBSReader.admin.updateForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 70,
	labelAlign : 'right',
	bodyStyle : 'padding:5px 5px 5px 5px;',
	border : false,

	account : new Ext.form.TextField({
				fieldLabel : '账 号',
				disabled : true,
				name : 'account',
				allowBlank : false,
				emptyText : '账号不能为空',
				width : 200
			}),
	name : new Ext.form.TextField({
				fieldLabel : '姓 名',
				name : 'name',
				allowBlank : false,
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				emptyText : "姓名不能为空",
				width : 200
			}),
	telField : new Ext.form.TextField({
				fieldLabel : '电 话',
				name : 'tel',
				allowBlank : false,
				emptyText : "电话不能为空",
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				width : 200
			}),
	emailField : new Ext.form.TextField({
				fieldLabel : 'email',
				name : 'email',
				allowBlank : false,
				emptyText : "email不能为空",
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				width : 200
			}),
	deptField : new Ext.form.TextField({
				fieldLabel : '部 门',
				name : 'dept',
				// allowBlank : false,
				// emptyText : "姓名不能为空",
				// validator : LBSReader.customFunctions.validateBankTrim,
				// invalidText : '不能全为空格',
				width : 200
			}),
	role : new Ext.form.ComboBox({
		fieldLabel : '所属角色',
		editable : false,
		mode : 'local',
		submitValue : '',
		triggerAction : 'all',
		allowBlank : false,
		emptyText : '请选择角色',
		displayField : 'name',
		tpl : '<tpl for="."><div class="x-combo-list-item"><span><input type="checkbox" {[values.check?"checked":""]}  value="{[values.id]}" /></span><span >{name}</span></div></tpl>',
		valueField : 'id',
		width : 200,
		store : LBSReader.store.ROLE_STORE,
		selectOnFocus : true,
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) != false) {
				record.set('check', !record.get('check'));
				var str = [];// 页面显示的值
				var strvalue = [];// 传入后台的值
				this.store.each(function(rc) {
							if (rc.get('check')) {
								str.push(rc.get('name'));
								strvalue.push(rc.get('id'));
							}
						});
				this.setValue(str.join());
				this.submitValue = strvalue.join();
				this.fireEvent('select', this, record, index);
			}
		},
		listeners : {
			expand : function(value) {// 监听下拉事件
				this.store.each(function(rc) {
							if (value.value == rc.get('id')) {
								rc.set('check', true);// 选中
							}
						});
			}
		}
	}),
	desc : new Ext.form.TextArea({
				grow : true,
				fieldLabel : '个人描述',
				name : 'desc',
				width : 200
			}),
	node : new Ext.form.ComboBox({
				fieldLabel : '所属地市',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择地市',
				displayField : 'name',
				valueField : 'nodeCode',
				width : 200,
				store : LBSReader.store.CITY_GUANGDONG
			}),
	updateBtn : new Ext.Button({
				text : '更新',
				type : 'submit',
				minWidth : 70,
				formBind : true
			}),
	cancelBtn : new Ext.Button({
				text : '取消',
				minWidth : 70
			}),
	constructor : function(config) {
		var config = config || {};
		config.items = config.items || [];
		config.buttons = config.buttons || [];
		config.items.push(this.account);
		config.items.push(this.name);
		config.items.push(this.telField);
		config.items.push(this.emailField);
		config.items.push(this.deptField);
		config.items.push(this.node);
		config.items.push(this.role);
		config.items.push(this.desc);
		config.buttons.push(this.updateBtn);
		config.buttons.push(this.cancelBtn);
		LBSReader.admin.updateForm.superclass.constructor
				.apply(this, arguments);
		this.updateBtn.on('click', function() {
					this.toupdate();
				}, this);
		this.cancelBtn.on('click', function() {
					this.cancelOp();
				}, this)
	},
	setValue : function(o) {
		if (null != o.account) {
			this.account.setValue(o.account);
		}
		if (null != o.name) {
			this.name.setValue(o.name);
		}
		if (null != o.desc) {
			this.desc.setValue(o.desc);
		}
		if (null != o.nodeCode) {
			this.node.setValue(o.nodeCode);
		}
		if (null != o.roleName) {
			this.role.setValue(o.roleName);
		}
		if (null != o.roles) {
			var arr = [];
			for (var i in o.roles) {
				arr.push(o.roles[i].id)
			}
			this.role.submitValue = arr.join();
			this.role.store.each(function(rc) {
						var sid = rc.get('id');
						if (arr.indexOf(sid) >= 0) {
							rc.set('check', true);
						} else {
							rc.set('check', false);
						}
					});
		}
	},

	isValid : function() {
		return this.account.isValid() && this.name.isValid()
				&& this.node.isValid() && this.desc.isValid()
				&& this.role.submitValue != '';
	},

	toupdate : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : LBSReader.req.ADMIN_MGR,
			params : {
				account : this.account.getValue(),
				name : this.name.getValue(),
				tel : this.telField.getValue(),
				email : this.emailField.getValue(),
				dept : this.deptField.getValue(),
				desc : this.desc.getValue(),
				node : this.node.getValue(),
				roleId : this.role.submitValue,
				method : 'update'
			},
			scope : this,
			callback : function(o) {
				if (o) {
					if (o.exId) {
						Ext.MessageBox.alert('提示', o.exDesc || '操作错误！',
								function(va) {
									if (va == 'yes') {
										window.location.reload(true);
									}
								}, this);
					}
					this.ownerCt.hide();
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '更新成功',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '更新失败，请确认你是否拥有权限',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		}
		LBSReader.Ajax.send(req);
	},
	cancelOp : function() {
		this.ownerCt.hide();
	}
});

LBSReader.admin.updateDlg = Ext.extend(Ext.Window, {
	title : '更新管理员窗口',
	layout : 'fit',
	modal : true,
	width : 350,
	height : 330,
	constrainHeader : true,
	resizable : false,
	closeAction : 'hide',

	configForm : null,

	constructor : function(config) {
		var config = config || {};
		config.items = this.items || [];
		this.configForm = new LBSReader.admin.updateForm({});
		config.items.push(this.configForm);
		LBSReader.admin.updateDlg.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
				}, this);
	},
	setValue : function(o) {
		this.configForm.setValue(o);
	}
});

LBSReader.admin.AdminDlg = Ext.extend(Ext.Window, {
			title : '新增管理员窗口',
			layout : 'fit',
			modal : true,
			width : 420,
			height : 350,
			constrainHeader : true,
			resizable : false,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				var config = config || {};
				config.items = this.items || [];
				this.configForm = new LBSReader.admin.AdminForm({});
				config.items.push(this.configForm);
				LBSReader.admin.AdminDlg.superclass.constructor.apply(this,
						arguments);

				this.on('show', function() {

						}, this);
			},
			toAdd : function() {
				this.configForm.resetForm();
			},
			toEdit : function() {
				this.configForm.resetForm();
			},
			setValue : function(o) {
				this.configForm.setValue(o);
			}
		});

LBSReader.admin.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '系统账号管理',
			autoScroll : true,
			store : Ext.StoreMgr.get('admin'),// to do
			cls : 'box-dataGrid',

			addBtn : new Ext.Button({
						text : '新增管理员',
						iconCls : 'btn-add',
						cls : 'btn-common-wide btn-common'
					}),
			uptBtn : new Ext.Button({
						text : '修改管理员',
						iconCls : 'btn-edit',
						cls : 'btn-common-wide btn-common'
					}),
			remvBtn : new Ext.Button({
						text : '删除管理员',
						iconCls : 'btn-remove',
						cls : 'btn-common-wide btn-common'
					}),
			modPwdBtn : new Ext.Button({
						text : '修改密码',
						cls : 'btn-common-wide btn-common'
					}),
			refeshBtn : new Ext.Button({
						text : '查询',
						// iconCls : 'btn-search',
						cls : 'btn-search btn-common'
					}),

			constructor : function(config) {
				this.adDlg = new LBSReader.admin.AdminDlg({});
				this.updateDlg = new LBSReader.admin.updateDlg({});
				this.modPwdDlg = new LBSReader.admin.modPwdDlg({});
				var config = config || {};
				config.tbar = config.tbar || [];
				var a = LBSReader.common.getPermission('4-1');
				if (LBSReader.common.isHasPermission(a, 2))
					config.tbar.push(this.addBtn);
				if (LBSReader.common.isHasPermission(a, 3))
					config.tbar.push(this.uptBtn);
				if (LBSReader.common.isHasPermission(a, 4))
					config.tbar.push(this.remvBtn);
				if (LBSReader.common.isHasPermission(a, 12))
					config.tbar.push(this.modPwdBtn);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.refeshBtn);

				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true,
							checkOnly : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '帐号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'account',
							width : 100
						}, {
							header : '姓名',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'name',
							width : 100
						}/*
							 * , { header : '个人描述', align : 'left', menuDisabled :
							 * true, dataIndex : 'desc', width : 200 }
							 */, {
							header : '地市',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'nodeCode',
							width : 60,
							renderer : LBSReader.renderer.CITYlIST
						}, {
							header : '角色',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'roleName',
							width : 200
						}, {
							header : '联系电话',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'tel',
							width : 200
						}, {
							header : 'email',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'email',
							width : 200
						}, {
							header : '所属部门',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'dept',
							width : 100
						}]);
				LBSReader.admin.DataGrid.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							this.getStore().load();
						}, this);
				this.addBtn.on('click', function() {
							// this.adDlg.configForm.resetForm();
							this.adDlg.show();
						}, this);
				this.adDlg.on('hide', function() {
							this.getStore().load();
						}, this);
				this.updateDlg.on('hide', function() {
							this.getStore().load();
						}, this);
				this.uptBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null,
										this);
							} else {
								this.updateDlg.show();
								this.updateDlg.setValue(rs.data);
							}
						}, this);
				this.modPwdBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
							} else {
								this.modPwdDlg.title = "修改" + rs.data.account
										+ "的密码";
								this.modPwdDlg.configForm.account
										.setValue(rs.data.account);
								this.modPwdDlg.show();
							}

						}, this), this.remvBtn.on('click', function() {
							// to be implemented
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm('提示', '确定要删除吗！', function(
											btn) {
										if (btn == 'yes')
											this.removeItems();
									}, this);

						}, this);
				this.refeshBtn.on('click', function() {
							// 发送请求
							this.getStore().load();
						}, this);
			},

			removeItems : function() {
				var r = this.getSelectionModel().getSelected();
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.ADMIN_MGR,
						params : {
							account : r.data.account,
							method : 'delete'
						},
						scope : this,
						callback : function(o) {
							// var re = Ext.decode(o.responseText);
							if (true == o.success || 'true' == o.success) {
								this.getStore().load();
							}

						}
					};
					LBSReader.Ajax.send(req);
				}
			},

			modPwd : function() {
				var r = this.getSelectionModel().getSelected();
				if (null != r && null != r.data) {
					var req = {
						url : LBSReader.req.ADMIN_MGR,
						params : {
							account : r.data.account,
							method : 'changPwd'
						},
						scope : this,
						callback : function(o) {
							// var re = Ext.decode(o.responseText);
							if (true == o.success || 'true' == o.success) {
								Ext.MessageBox.alert("提示", "添加成功");
							}

						}
					};
					LBSReader.Ajax.send(req);
				}
			}
		});

var informationStore = Ext.StoreMgr.get('information');

LBSReader.admin.Information = Ext.extend(Ext.grid.GridPanel, {
			title : '账号安全审计',
			autoScroll : true,
			store : Ext.StoreMgr.get('information'),// to do
			cls : 'box-dataGrid',

			loginLabel : new Ext.form.Label({
						text : '登录方式'
					}),

			loginCombo : new Ext.form.ComboBox({
						store : Ext.StoreMgr.get('information_combo'),
						id : 'login',
						fieldLabel : '登录方式',
						displayField : 'name',
						valueField : 'id',
						typeAhead : true,
						mode : 'local',
						triggerAction : 'all',
						emptyText : '请选择...',
						selectOnFocus : true
					}),

			loginNameLabel : new Ext.form.Label({
						text : '登录名'
					}),

			loginNameText : new Ext.form.TextField({
						fieldLabel : '账 号',
						id : 'loginName',
						name : 'loginName',
						// disabled : true,
						width : 150
					}),

			startLabel : new Ext.form.Label({
						text : '开始日期'
					}),

			startDate : new Ext.form.DateField({
						id : 'startDate',
						format : 'Y-m-d',
						width : 150,
						fieldLabel : '开始日期'
					}),

			endLabel : new Ext.form.Label({
						text : '结束日期'
					}),

			endDate : new Ext.form.DateField({
						id : 'endDate',
						format : 'Y-m-d',
						width : 150,
						fieldLabel : '结束日期'
					}),

			refeshBtn : new Ext.Button({
						text : '查询',
						// iconCls : 'btn-search',
						cls : 'btn-search btn-common'
					}),

			bbar : new Ext.PagingToolbar({
						id : 'bbar',
						pageSize : 15,
						store : Ext.StoreMgr.get('information'),
						displayInfo : true,
						displayMsg : '第{0} 到 {1} 条数据 共{2}条',
						emptyMsg : "没有数据"
					}),

			constructor : function(config) {
				var config = config || {};
				config.tbar = config.tbar || [];
				var a = LBSReader.common.getPermission('4-2');

				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.loginLabel);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.loginCombo);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.loginNameLabel);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.loginNameText);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.startLabel);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.startDate);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.endLabel);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.endDate);
				if (LBSReader.common.isHasPermission(a, 1))
					config.tbar.push(this.refeshBtn);

				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false,
							checkOnly : false
						});
				this.cm = new Ext.grid.ColumnModel([
						// this.sm,
						{
					header : 'id号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'id',
					width : 100
				}, {
					header : '登陆方式',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'Cmd',
					width : 100
				}, {
					header : '请求的IP',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'Req_IP',
					width : 100
				}, {
					header : '请求的主机',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'Req_Host',
					width : 100
				},
						// {
						// header : '请求的服务器',
						// align : 'left',
						// menuDisabled : true,
						// dataIndex : 'Server_Name',
						// width : 100
						// },
						{
							header : '登录使用的帐号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'Operate_Account',
							width : 130
						}, {
							header : '用户名',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'Operate_Name',
							width : 100
						},
						// {
						// header : '请求指令',
						// align : 'left',
						// menuDisabled : true,
						// dataIndex : 'Req_Content',
						// width : 100,
						// display: false
						// },
						{
							header : '登录时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'Operate_Time',
							width : 100
						}]);
				LBSReader.admin.DataGrid.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							this.getStore().load({
										params : {
											start : 0,
											limit : 15
										}
									});
							Ext.StoreMgr.get('information_combo').load();
						}, this);
				this.refeshBtn.on('click', function() {
							// todo: 编写查询请求
							var login = Ext.getCmp('login').getValue();
							var startDate = Ext.getCmp('startDate')
									.getRawValue();
							var endDate = Ext.getCmp('endDate').getRawValue();
							var loginName = Ext.getCmp('loginName').getValue();
							this.getStore().setBaseParam('login', login);
							this.getStore().setBaseParam('start_date',
									startDate);
							this.getStore().setBaseParam('end_date', endDate);
							this.getStore()
									.setBaseParam('loginName', loginName);
							this.getStore().load({
										params : {
											login : login,
											start_date : startDate,
											end_date : endDate,
											loginName : loginName
										}
									});

						}, this);
			}

		});

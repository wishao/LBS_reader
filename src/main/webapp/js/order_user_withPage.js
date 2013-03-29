/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.orderuser');

IsmpHB.orderuser.ProductGrid = Ext.extend(Ext.grid.GridPanel, {
	autoScroll : true,
	height : 165,
	bodyStyle : 'padding:0px;',
	store : new Ext.data.JsonStore({
				url : IsmpHB.req.PRODUCT_QUERY,
				baseParams : {
					timestamp : new Date().valueOf(),
					pid : 0,
					method : 'package'
				},
				root : 'rows',
				fields : ['id', 'name', 'code', 'status', 'spCode', 'spName',
						'selectedFlag', 'attrs']
			}),

	constructor : function(config) {
		config = config || {};
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					singleSelect : false,
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 190
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'selectedFlag',
					renderer : function(value) {
						if ('2' == value) {
							return '<font color="red">必选项</font>';
						} else if ('1' == value) {
							return '<font color="gray">默认选项</font>';
						} else {
							return '可选项';
						}
					},
					width : 100
				}]);
		IsmpHB.orderuser.ProductGrid.superclass.constructor.apply(this,
				arguments);
		/**
		 * event listener: check if the spec has attrs
		 */
		this.getSelectionModel().on('rowselect',
				function(sm, rowIndex, record) {
					var id = record.data.id;
					try {
						if (!id.match(/^\d+$/)) {
							id = record.data.id.split('_')[2];
						}
					} catch (e) {
					}
					this.loadDynFormItems(id, record);// XXX
				}, this);
		this.getSelectionModel().on('rowdeselect',
				function(sm, rowIndex, record) {
					if (2 == record.data.selectedFlag) {
						if (!this.getSelectionModel().isSelected(record)) {
							this.getSelectionModel().selectRow(rowIndex);
						}
						Ext.MessageBox.alert('提示', '必选项不能取消！');
						return false;
					}
				}, this);
	},
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		if ('2' == record.data.selectedFlag) {
			return '<div class="x-grid3-row-checker" qtip="必选项，不能取消" class="oper_not_allowed"></div>';
		} else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	},
	reset : function() {
		this.getStore().removeAll();
	},
	loadProductByPackage : function(pid) {
		this.getStore().load({
			params : {
				timestamp : new Date().valueOf(),
				pid : pid
			},
			callback : function(r, o, s) {
				if (!s) {
					Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
					return;
				}
				var cs = [];
				this.getStore().each(function(r) {
							if (2 == r.data.selectedFlag
									|| 1 == r.data.selectedFlag) {
								// 必选或默选，则选之
								cs.push(r);
							}
						}, this);
				this.getSelectionModel().selectRecords(cs);
			},
			scope : this
		});
	},
	/**
	 * check if the spec has attrs. if so, dlg shows.
	 */
	loadDynFormItems : function(pid, record) {
		Ext.StoreMgr.get('productattr').load({
					params : {
						timestamp : new Date().valueOf(),
						ids : pid
					},
					callback : function(r, o, s) {
						if (!s) {
							Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
							return;
						}

						if (null != r && 0 < r.length) {
							var dynDlg = new IsmpHB.dynform.DynamicDlg({
										parentCt : this,
										productId : pid,
										attrs : record.attrs,
										oper : record.oper
									}).show();
						}
					},
					scope : this
				});
	},
	// used in 'dyn_form.js'
	attrs2Store : function(id, attrs) {
		var r = this.getStore().getById(id);
		r.data.attrs = attrs;
	},
	deselectItem : function(id) {
		this.getSelectionModel().deselectRow(this.getStore().indexOfId(id));
	},
	resetPkg : function() {
		this.getStore().removeAll();
		this.ownerCt.ownerCt.ppkgCombo.reset();
	},
	getSpecItemAmount : function() {
		return this.getStore().getCount();
	},
	getProductSpecItems : function() {
		var ps = [];
		var rs = this.getSelectionModel().getSelections();
		// 获取已选择的
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						spec_id : rs[i].data.id,
						name : rs[i].data.name,
						code : rs[i].data.code,
						// status : x,// 跟随包一级的状态
						selectedFlag : rs[i].data.selectedFlag,
						attrs : rs[i].data.attrs || []
					});
		}
		return ps;
	},
	getEditProductSpecItems : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		this.getStore().each(function(r) {
					var isSelected = this.getSelectionModel().isSelected(r);
					if (isSelected && r.data.status == 0) {
						ps.push({
									spec_id : r.data.id,
									name : r.data.name,
									code : r.data.code,
									// status : x,// 跟随包一级的状态
									selectedFlag : r.data.selectedFlag,
									attrs : r.data.attrs || []
								});
					} else if (!isSelected && r.data.status == 1) {
						// rmv
						ps.push({
									spec_id : r.data.id,
									name : r.data.name,
									code : r.data.code,
									status : 2,// rmv
									selectedFlag : r.data.selectedFlag,
									attrs : r.data.attrs || []
								});
					}
				}, this);

		return ps;
	},
	setProductSpecItems : function(pid, product_list) {
		this.getStore().load({
			params : {
				timestamp : new Date().valueOf(),
				pid : pid
			},
			callback : function(r, o, s) {
				if (!s) {
					Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
					return;
				}

				// replace the existed with
				// those ordered.
				var cs = [];
				this.getStore().each(function(r) {
					for (var j = 0; j < product_list.rows.length; j++) {
						if (r.data.id == product_list.rows[j].id.split("_")[2]) {
							var memo = Ext.decode(product_list.rows[j].memo);
							r.attrs = memo.attrs;
							r.oper = 2;
							cs.push(r);
						}
					}
				})
				this.getSelectionModel().selectRecords(cs);
			},
			scope : this
		});
	}
});

IsmpHB.orderuser.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 70,
	labelAlign : 'right',
	border : false,
	bodyStyle : 'padding:5px 10px 5px 10px;',

	tknHidden : new Ext.form.Hidden({
				name : 'token',
				value : ''
			}),
	idHidden : new Ext.form.Hidden({
				name : 'id',
				value : -1
			}),
	hbPkgName : new Ext.form.Hidden({
				name : 'hbPackageName'
			}),
	hbPkgCode : new Ext.form.Hidden({
				name : 'hbPackageCode'
			}),
	nameField : new Ext.form.TextField({
				fieldLabel : '客户姓名',
				allowBlank : true,
				emptyText : '请填写客户姓名',
				blankText : '请填写客户姓名',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),
	telField : new Ext.form.TextField({
				fieldLabel : '客户电话',
				allowBlank : false,
				emptyText : '请填写客户电话',
				blankText : '请填写客户电话',
				maxLength : 100,
				msgTarget : 'side',
				width : 200,
				regex : new RegExp('^([0-9]{10,12})$'),
				regexText : '电话号码不合法'
			}),
	ppkgCombo : new Ext.form.ComboBox({
				fieldLabel : '产品包',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择产品包',
				blankText : '请选择产品包',
				displayField : 'name',
				valueField : 'id',
				hiddenValue : 'code',
				hiddenName : 'code',
				hiddenId : 'code',
				width : 200,
				store : Ext.StoreMgr.get('effectPackage')
			}),
	dbField : new Ext.form.DateField({
				fieldLabel : '生效日期',
				format : 'Y-m-d',
				allowBlank : false,
				emptyText : '有效期开始日期',
				msgTarget : 'side',
				width : 200
			}),
	ddField : new Ext.form.DateField({
				fieldLabel : '失效日期',
				format : 'Y-m-d',
				allowBlank : false,
				emptyText : '有效期结束日期',
				msgTarget : 'side',
				width : 200
			}),
	stateCombo : new Ext.form.ComboBox({
				fieldLabel : '订购状态',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '选择状态',
				displayField : 'name',
				valueField : 'id',
				width : 120,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['1', '有效'], ['2', '停机'], ['3', '欠费'],
									['4', '拆机']]
						})
			}),
	flagCombo : new Ext.form.ComboBox({
				fieldLabel : '试用标识',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '选择试用标识',
				displayField : 'name',
				valueField : 'id',
				width : 120,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '正式'], ['1', '试用']]
						})
			}),
	chargeType : new Ext.form.ComboBox({
				fieldLabel : '付费方式',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '选择扣费方式',
				displayField : 'name',
				valueField : 'id',
				width : 120,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '帐户直接划扣'], ['1', '以积分兑换']]
						}),
				value : 0
			}),
	commitBtn : new Ext.Button({
				text : '提交',
				iconCls : 'btn-commit'
			}),

	constructor : function(config) {
		this.isEDIT = false;
		this.grid = new IsmpHB.orderuser.ProductGrid({});
		config = config || {};
		config.items = config.items || [];
		config.items.push(this.idHidden);
		config.items.push(this.hbPkgName);
		config.items.push(this.hbPkgCode);
		config.items.push(this.telField);
		config.items.push(this.nameField);
		config.items.push(this.dbField);
		config.items.push(this.ddField);
		config.items.push(this.stateCombo);
		config.items.push(this.flagCombo);
		config.items.push(this.chargeType);
		config.items.push(this.ppkgCombo);
		config.items.push(new Ext.form.FieldSet({
					baseCls : 'custom-fieldset',
					items : [this.grid]
				}));
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);

		IsmpHB.orderuser.ItemForm.superclass.constructor.apply(this, arguments);

		this.ppkgCombo.on('expand', function(c) {
					c.getStore().each(function(r) {
								if (r.data.chargingCycle >= 3) {
									c.getStore().remove(r);// 移除节目类产品包
								}
							}, this);
				});
		this.ppkgCombo.on('collapse', function() {
					if (this.ppkgCombo.getValue()) {
						this.setHbPckgInfo(this.ppkgCombo.getValue());
						this.grid.loadProductByPackage(this.ppkgCombo
								.getValue());
					}
				}, this);
		this.commitBtn.on('click', function() {
					if (!this.isValid()) {
						return;
					}
					if (this.isEDIT) {
						this.commitEdit();
					} else {
						this.commitAdd();
					}
				}, this);
	},
	loadHBPackageItems : function() {
		Ext.StoreMgr.get('effectPackage').load({
					callback : function(r, o, s) {
						if (!s) {
							Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
							return;
						}
					},
					scope : this
				});
	},
	isValid : function() {
		return this.nameField.isValid() && this.telField.isValid()
				&& this.ppkgCombo.isValid();
	},
	resetForm : function(isDisabled) {
		this.telField.reset();
		this.nameField.reset();
		this.dbField.reset();
		this.ddField.reset();
		this.stateCombo.reset();
		this.flagCombo.reset();
		this.ppkgCombo.reset();
		this.chargeType.reset();
		this.grid.reset();
		//
		this.telField.setDisabled(isDisabled);//
		this.nameField.setDisabled(isDisabled);//
		this.ppkgCombo.setDisabled(isDisabled);//
		this.chargeType.setDisabled(isDisabled);//
		this.stateCombo.setDisabled(false);// 
	},
	loadFormData : function(tkn, pId) {
		Ext.StoreMgr.get('orderUserSingle').load({
					params : {
						timestamp : new Date().valueOf(),
						token : tkn,
						id : pId
					},
					callback : function(r, o, s) {
						if (s) {
							this.initForm(r[0].data);//
						} else {
							Ext.MessageBox.alert('提示', '获取用户订购记录失败！请稍后重试！',
									function() {
										this.ownerCt.hide();
									}, this);
						}
					},
					scope : this
				});
	},
	setHbPckgInfo : function(id) {
		var store = this.ppkgCombo.getStore();
		var o = store.getById(id);
		if (null != o.get('name')) {
			this.hbPkgName.setValue(o.get('name'));
		}
		if (null != o.get('code')) {
			this.hbPkgCode.setValue(o.get('code'));
		}
	},
	initForm : function(o) {
		if (null != o.token) {
			this.tknHidden.setValue(o.token);
		}
		if (null != o.id) {
			this.idHidden.setValue(o.id);
		}
		if (null != o.tel) {
			this.telField.setValue(o.tel);
		}
		if (null != o.name) {
			this.nameField.setValue(o.name);
		}
		if (null != o.usageFlag) {
			this.flagCombo.setValue(o.usageFlag);
		}
		if (null != o.status) {
			this.stateCombo.setValue(o.status);
		}
		if (null != o.startTime) {
			this.dbField.setValue(o.startTime.split(' ')[0]);
		}
		if (null != o.endTime) {
			this.ddField.setValue(o.endTime.split(' ')[0]);
		}
		if (null != o.hbPackageId) {
			this.ppkgCombo.setValue(o.hbPackageId);
		}
		if (null != o.hbPackageDesc) {
			this.hbPkgName.setValue(o.hbPackageDesc);
		}
		if (null != o.hbPackageCode) {
			this.hbPkgCode.setValue(o.hbPackageCode);
		}
		if (null != o.chargeType) {
			this.chargeType.setValue(o.chargeType);
		}
		if (null != o.product_list) {
			this.grid.setProductSpecItems(o.hbPackageId, o.product_list);// containing
		}
	},
	commitAdd : function() {
		if (!this.isValid()) {
			return;
		}
		var dateValid = IsmpHB.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('提示', '生效日期不能在失效日期之后，请修正！', null, this);
			return;
		}
		if (this.grid.getProductSpecItems() == "") {
			Ext.MessageBox.alert('提示', '必须最少选择一个产品！', null, this);
			return;
		}
		var cromb = {
			Start_Time : this.dbField.getValue()
					.format(Date.patterns.ISO8601Middle),//
			End_Time : this.ddField.getValue()
					.format(Date.patterns.ISO8601Middle),//
			Status : this.stateCombo.getValue(),//
			usage : this.flagCombo.getValue(),//
			product_list : this.grid.getProductSpecItems()
		};
		var req = {
			url : IsmpHB.req.ORDER_USER_ADD,
			params : {
				timestamp : new Date().valueOf(),
				tel : this.telField.getValue(),
				name : this.nameField.getValue(),
				hbPackageId : this.ppkgCombo.getValue(),
				hbPackageName : this.hbPkgName.getValue(),
				hbPackageCode : this.hbPkgCode.getValue(),
				chargeType : this.chargeType.getValue(),
				data : Ext.encode(cromb)
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '添加成功！', null, this);
				} else {
					Ext.MessageBox.alert('提示', '添加失败！', null, this);
				}
				this.ownerCt.hide();
			}
		};
		// TODO
		// Ext.MessageBox.alert('ajax debug',
		// Ext.encode(req.params) +
		// '<br/>-----<br/>' + Ext.encode(req.params.data));
		IsmpHB.Ajax.send(req);
	},
	commitEdit : function() {
		if (!this.isValid()) {
			return;
		}
		var dateValid = IsmpHB.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('提示', '生效日期不能在失效日期之后，请修正！', null, this);
			return;
		}
		if (this.grid.getProductSpecItems() == "") {
			Ext.MessageBox.alert('提示', '必须最少选择一个产品！', null, this);
			return;
		}
		var cromb = {
			Start_Time : this.dbField.getValue()
					.format(Date.patterns.ISO8601Middle),//
			End_Time : this.ddField.getValue()
					.format(Date.patterns.ISO8601Middle),//
			Status : this.stateCombo.getValue(),//
			usage : this.flagCombo.getValue(),//
			product_list : this.grid.getEditProductSpecItems()
		};
		var req = {
			url : IsmpHB.req.ORDER_USER_UPDATE,
			params : {
				timestamp : new Date().valueOf(),
				tel : this.telField.getValue(),
				name : this.nameField.getValue(),
				hbPackageId : this.ppkgCombo.getValue(),
				hbPackageName : this.hbPkgName.getValue(),
				hbPackageCode : this.hbPkgCode.getValue(),
				chargeType : this.chargeType.getValue(),
				data : Ext.encode(cromb)
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '成功提交！', function() {
							}, this);
				} else {
					Ext.MessageBox.alert('提示', '处理失败！', function() {
							}, this);
				}
				this.ownerCt.hide();
			}
		};
		// TODO
		// Ext.MessageBox.alert('debug', Ext.encode(req.params)
		// +
		// '<br/>-----<br/>' + Ext.encode(req.params.data));
		IsmpHB.Ajax.send(req);
	}
});

IsmpHB.orderuser.ItemDlg = Ext.extend(Ext.Window, {
			title : '用户订购管理',
			layout : 'fit',
			modal : true,
			width : 350,
			height : 450,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new IsmpHB.orderuser.ItemForm({});
				config.items.push(this.configForm);
				IsmpHB.orderuser.ItemDlg.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							this.configForm.ppkgCombo.getStore().load({
								params : {
									timestamp : new Date().valueOf()
								},
								callback : function(r, o, s) {
									if (!s) {
										Ext.MessageBox
												.alert('提示', '加载超时，请稍后重试');
										return false;
									}
								},
								scope : this
							});
						});
			},
			toAdd : function() {
				this.configForm.isEDIT = false;
				this.configForm.resetForm(this.configForm.isEDIT);
				this.configForm.telField.focus(false, 250);
				// set default values
				this.configForm.stateCombo
						.setValue(IsmpHB.data.ORDERUSER_STATUS.NORMAL)
						.setDisabled(true);// 有效
				this.configForm.dbField.setValue(new Date());// 生效时间()
				this.configForm.ddField.setValue(new Date().add(Date.YEAR, 1));// 失效时间
				this.configForm.flagCombo.setValue(0);// 正式
				this.configForm.chargeType.setValue(0).setDisabled(true);
				// status
			},
			toEdit : function(tkn, pId) {// pId=pkgId
				this.configForm.isEDIT = true;
				this.configForm.resetForm(this.configForm.isEDIT);
				this.configForm.loadFormData(tkn, pId);
			}
		});

IsmpHB.orderuser.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '包月类订购管理',
	autoScroll : true,
	store : Ext.StoreMgr.get('comboList'),
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
	rmvBtn : new Ext.Button({
				text : '批量拆机',
				iconCls : 'btn-remove',
				cls : 'btn-common-wide btn-common'
			}),
	telField : new Ext.form.TextField({
				fieldLabel : '客户电话',
				emptyText : '请填写客户电话',
				maxLength : 100,
				msgTarget : 'side',
				width : 120,
				regex : new RegExp('^([0-9]{10,12})$'),
				regexText : '所填写的电话号码不合法'
			}),
	nameField : new Ext.form.TextField({
				emptyText : '请填写姓名',
				maxLength : 80,
				msgTarget : 'side',
				width : 80
			}),
	packageCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				emptyText : '请选择产品包',
				displayField : 'name',
				valueField : 'id',
				width : 165,
				store : Ext.StoreMgr.get('packageall'),
				displayText : '所有产品包',
				listeners : {
					"focus" : function() {
						this.getStore().load({
									callback : function(r, o, s) {
										if (!s) {
											Ext.MessageBox.alert('提示',
													'加载超时，请稍后重试');
											return;
										}
									},
									scope : this
								});
					}
				}
			}),
	hbPackageCodeField : new Ext.form.TextField({
				emptyText : '请填写产品包编码',
				maxLength : 120,
				msgTarget : 'side',
				width : 120
			}),
	productCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				emptyText : '请选择产品',
				displayField : 'name',
				valueField : 'id',
				width : 165,
				store : Ext.StoreMgr.get('productall'),
				displayText : '所有产品'
			}),
	productSpecCodeField : new Ext.form.TextField({
				emptyText : '请填写产品规格编码',
				maxLength : 120,
				msgTarget : 'side',
				width : 120
			}),
	cityCombo : new Ext.form.ComboBox({
		emptyText : '地市',
		displayField : 'name',
		valueField : 'nodeCode',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		store : IsmpHB.store.CITY_GUANGDONG,
		width : 90
			// ,
			// value : 'GZ'
		}),
	stateCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				emptyText : '状态',
				displayField : 'name',
				valueField : 'id',
				width : 90,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['-1', '所有'], ['1', '有效'], ['2', '停机'],
									['3', '欠费'], ['4', '拆机']]
						}),
				value : -1
			}),
	flagCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				emptyText : '试用标识',
				displayField : 'name',
				valueField : 'id',
				width : 90,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['-1', '所有'], ['0', '正式'], ['1', '试用']]
						}),
				value : -1
			}),
	dbField : new Ext.form.DateField({
				format : 'Y-m-d',
				emptyText : '生效日期',
				msgTarget : 'side',
				width : 100
			}),
	ddField : new Ext.form.DateField({
				format : 'Y-m-d',
				emptyText : '失效日期',
				msgTarget : 'side',
				width : 100
			}),
	likeT : new Ext.form.Radio({
				name : 'isLike',
				boxLabel : '精确',
				checked : true
			}),
	likeF : new Ext.form.Radio({
				name : 'isLike',
				boxLabel : '模糊'
			}),
	searchBtn : new Ext.Button({
				text : '搜索',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				cls : 'btn-common-wide btn-common'
			}),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		// var o = Ext.StoreMgr.get('packageall');
		// if (o.getById(record.data.id) == undefined) {
		// return '<img src="images/not-allowed.png"
		// qtip="该订购关系的计费方未知，不允许执行修改或拆机操作"
		// class="oper_not_allowed"/>';
		// } else if (o.getById(record.data.id).get('billFlag')
		// !=
		// IsmpHB.data.CHARGING_CHANNEL.HB) {
		// return '<img src="images/not-allowed.png"
		// qtip="该订购关系非号百计费，不允许执行修改或拆机操作"
		// class="oper_not_allowed"/>';
		// } else {
		return '<div class="x-grid3-row-checker"></div>';
		// }
	},
	constructor : function(config) {
		this.dlg = new IsmpHB.orderuser.ItemDlg({});
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : this.getStore().baseParams.limit,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！",
					listeners : {
						'change' : function(pb, evnt) {
						}
					}
				});
		config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('2-1');
		var arr = [this.likeT, this.likeF];
		if (IsmpHB.common.isHasPermission(a, 1)) {
			arr.push(this.searchBtn);
			arr.push(this.resetBtn);
		}
		arr.push('->');
		if (IsmpHB.common.isHasPermission(a, 2))
			arr.push(this.addBtn);
		// 17Aug2012, Tanjf. disable 'upd' operation
		// if (IsmpHB.common.isHasPermission(a, 3))
		// arr.push(this.uptBtn);
		if (IsmpHB.common.isHasPermission(a, 13))
			arr.push(this.rmvBtn);

		// 10May2012, by Tanjf TODO
		var nc = IsmpHB.common.getSession("loginInfo").nodeCode;
		if (nc == 'GD') {
			this.cityCombo.setValue('GZ');
		} else {
			this.cityCombo.setValue(nc);
			this.cityCombo.setDisabled(true);
		}
		config.tbar.push(new Ext.Panel({
					border : false,
					items : [{
						xtype : 'toolbar',
						border : false,
						items : ['客户电话：', this.telField, '客户姓名：',
								this.nameField, '地市：', this.cityCombo, '产品包：',
								this.packageCombo, '产品：', this.productCombo]
					}, {
						xtype : 'toolbar',
						border : false,
						// '产品包编码：', this.hbPackageCodeField,
						// '产品规格编码',
						// this.productSpecCodeField,
						items : ['状态：', this.stateCombo, '试用标识：',
								this.flagCombo, '生效日期：', this.dbField, '失效日期：',
								this.ddField]
					}, {
						xtype : 'toolbar',
						border : false,
						items : arr
					}]
				}));

		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '客户电话',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'tel',
					width : 100
				}, {
					header : '客户姓名',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 70,
					renderer : function(val) {
						return '<div class="text-nowrap">' + val + '</div>';
					}
				}, {
					header : '地区',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'nodeCode',
					renderer : IsmpHB.renderer.CITYlIST,
					width : 40
				}, {
					header : '号百产品包名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'hbPackageDesc',
					width : 150
				}, {
					header : '产品规格名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'productSpecName',
					width : 150
				}, {
					header : 'CRM产品包名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'crmPackageDesc',
					width : 150
				}, {
					header : '扣费方式',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'chargeType',
					renderer : IsmpHB.renderer.CHARGETYPE,
					width : 70
				}, {
					header : '订购渠道',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'source',
					renderer : IsmpHB.renderer.ORDER_SOURCE,
					width : 80
				}, {
					header : '生效日期',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'startTime',
					renderer : function(obj) {
						return obj.split(" ")[0];
					},
					width : 80
				}, {
					header : '失效日期',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'endTime',
					renderer : function(obj) {
						return obj.split(" ")[0];
					},
					width : 80
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'status',
					renderer : IsmpHB.renderer.ORDER_USER_STATUS,
					width : 50
				}, {
					header : '试用标识',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'usageFlag',
					renderer : IsmpHB.renderer.ORDER_USER_USAGE_FLAG,
					width : 70
				}, {
					header : '创建时间',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'createTime',
					renderer : function(obj) {
						return obj.substring(0, 21);
					},
					width : 80
				}, {
					header : '更新时间',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'updateTime',
					renderer : function(obj) {
						return obj.substring(0, 21);
					},
					width : 80
				}, {
					header : '操作者',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'operator',
					width : 80
				}]);
		IsmpHB.orderuser.DataGrid.superclass.constructor.apply(this, arguments);
		// Nov 17 2011, by Tanjf
		this.productCombo.disable();//
		this.packageCombo.on('expand', function(combo) {
					combo.getStore().each(function(r) {
								if (r.data.chargingCycle >= 3) {
									combo.getStore().remove(r);// 移除节目类产品包
								}
							}, this);
				});
		this.packageCombo.on('select', function(combo, record, index) {
					this.productCombo.reset();
					this.productCombo.getStore().load({
								params : {
									timestamp : new Date().valueOf(),
									method : 'package',
									pid : combo.getValue()
								},
								callback : function(r, o, s) {
									if (!s) {
										Ext.MessageBox
												.alert('提示', '加载超时，请稍后重试');
										return;
									}
								},
								scope : this
							});
					this.productCombo.enable();
				}, this);
		//
		this.addBtn.on('click', function() {
					/*
					 * this.dlg.toAdd(); this.dlg.show();
					 */
					SearchPagingbar.setVisible(false);
					Ext.StoreMgr.get('searchPackage').removeAll();
					Ext.StoreMgr.get('addEffectPackage').removeAll();
					ProductAttr1.removeAll();
					IsmpHB.orderuser.productAddDlg.show();
					submitButton1.buttons[0].setDisabled(true);
					chargeType1.setDisabled(true);
					flagCombo2.reset();
					orderTel.reset();
					orderName.reset();
					dbField1.reset();
					ddField1.reset();
					packageNameField1.reset();
				}, this);
		this.uptBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelections();
					if (rs.length < 1) {
						Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null, this);
						return false;
					} else if (rs.length > 1) {
						Ext.MessageBox.alert('提示', '只能同时修改一条记录！', null, this);
						return false;
					}
					this.dlg.toEdit(rs[0].data.token, rs[0].data.id);
					this.dlg.show();
				}, this);
		this.rmvBtn.on('click', function() {
			var rs = this.getSelectionModel().getSelections();
			if (null == rs || rs.length < 1) {
				Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
				return false;
			}
			for (var i = 0; i < rs.length; i++) {
				if (rs[i].data.status == IsmpHB.data.ORDERUSER_STATUS.UNAVAILABLE) {
					var msg = String.format('[{0}]（{1}）已停止使用产品[{2}]，无须重复操作！',
							rs[i].data.name, rs[i].data.tel,
							rs[i].data.productSpecName);
					Ext.MessageBox.alert('提示', msg, null, this);
					return false;
				}
			}
			Ext.MessageBox.confirm("提示", "确认要对所选记录进行拆机操作吗？", function(id) {
						if (id == "yes") {
							this.rmvItems();
						}
					}, this);
		}, this);
		/***/
		this.telField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
	},
	resetAllConditions : function() {
		this.telField.reset();
		this.nameField.reset();
		this.packageCombo.reset();
		this.hbPackageCodeField.reset();
		this.productCombo.reset();
		this.productCombo.disable();//
		this.productSpecCodeField.reset();
		this.cityCombo.reset();
		this.stateCombo.reset();
		this.flagCombo.reset();
		this.dbField.reset();
		this.ddField.reset();
		this.likeT.setValue(true);
		this.likeF.setValue(false);
	},
	searchItems : function(s, l) {
		var dateValid = IsmpHB.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('搜索条件有误', '生效日期不能在失效日期之后。请修正！');
			return;
		}
		this.getStore().baseParams = {
			timestamp : new Date().valueOf(),
			tel : this.telField.getValue(),
			name : this.nameField.getValue(),
			hbPackageId : this.packageCombo.getValue() || -1,
			productSpecId : this.productCombo.getValue() || -1,
			nodeCode : this.cityCombo.getValue(),
			isLike : this.likeT.getValue() ? 0 : 1,
			startTime : this.dbField.getRawValue(),
			endTime : this.ddField.getRawValue(),
			status : this.stateCombo.getValue(),
			usageFlag : this.flagCombo.getValue()
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
	rmvItems : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = rs.length - 1; i >= 0; i--) {
			ps.push({
						token : rs[i].data.token,
						tel : rs[i].data.tel,
						contentId : rs[i].data.id,
						productSpecName : rs[i].data.productSpecName,
						productSpecCode : rs[i].data.productSpecCode
					});
		}
		var req = {
			url : IsmpHB.req.COMBO_CANCEL,
			params : {
				timestamp : new Date().valueOf(),
				product_list : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', o.message, function() {
								this
										.updateStatus(
												rs,
												IsmpHB.data.ORDERUSER_STATUS.UNAVAILABLE);
							}, this);
				} else {
					Ext.MessageBox.alert('提示', '对不起，处理失败！请稍后重试。', function() {
							}, this);
				}
			}
		};
		IsmpHB.Ajax.send(req);
	},
	updateStatus : function(arr, status) {
		for (var i = arr.length - 1; i >= 0; i--) {
			arr[i].set('status', status);
		}
	}
});

// 填充产品包信息弹出框内容（弹左下弹）
IsmpHB.orderuser.showAddView = function(grid, rowIndex, colIndex) {
	var r = Ext.StoreMgr.get('addEffectPackage').getAt(rowIndex);
	productAddForm1.get('order_package_id').setValue(r.data.id);
	productAddForm1.get('order_package_name').setValue(r.data.name);
	productAddForm1.get('order_package_code').setValue(r.data.code);
	productAddForm1.get('order_package_pairValue').setValue(r.data.pairValue);
	productAddForm1.get('order_package_billFlag').setValue(IsmpHB.renderer
			.CHARGINGMODE(r.data.billFlag));
	productAddForm1.get('order_package_chargingCode')
			.setValue(r.data.chargingCode);
	productAddForm1.get('order_package_chargingDesc')
			.setValue(r.data.chargingDesc);
	productAddForm1.get('order_package_chargingCycle').setValue(IsmpHB.renderer
			.CHARGINGCYCLE(r.data.chargingCycle));
	productAddForm1.get('order_package_effectMode').setValue(IsmpHB.renderer
			.EFFECTMODE(r.data.effectMode));
	productAddForm1.get('order_package_withDrawMode').setValue(IsmpHB.renderer
			.EFFECTMODE(r.data.withDrawMode));
	productAddForm1.get('order_package_trialType').setValue(IsmpHB.renderer
			.TRIAL_TYPE(r.data.trialType));
	productAddForm1.get('order_package_trialTerm').setValue(r.data.trialTerm);
	productAddForm1.get('order_package_useFlag').setValue(IsmpHB.renderer
			.VIEW_STATUS_FLAG(r.data.useFlag));
	productAddForm1.get('order_package_beginCharg').setValue(IsmpHB.renderer
			.BEGIN_RULE(r.data.beginCharg));
	productAddForm1.get('order_package_endPreCharg').setValue(IsmpHB.renderer
			.END_PRE_CHARG(r.data.endPreCharg));
	productAddForm1.get('order_package_endAfterCharg').setValue(IsmpHB.renderer
			.END_AFTER_CHARG(r.data.endAfterCharg));
	IsmpHB.orderuser.packageDlg.show();
}

// 新增订购框搜索产品包（弹左下）
IsmpHB.orderuser.AddProductSearchPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '产品包列表',
	autoScroll : true,
	store : Ext.StoreMgr.get('addEffectPackage'),
	packageNameField1 : new Ext.form.TextField({
				emptyText : '请填写产品包名称',
				maxLength : 80,
				msgTarget : 'side',
				width : 180
			}),
	flagCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				displayField : 'name',
				valueField : 'id',
				width : 70,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '公众类'], ['1', '政企类']]
						}),
				value : 0,
				disabled : true
			}),
	addSearchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	constructor : function(config) {
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 10,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};
		packageNameField1 = this.packageNameField1;
		config.tbar = config.tbar || [];
		config.tbar.push('类型：', this.flagCombo);
		config.tbar.push('名称：', this.packageNameField1);
		config.tbar.push('->');
		config.tbar.push(this.addSearchBtn);

		config.bbar = this.pagingbar;
		this.pagingbar.refresh.setVisible(false);
		SearchPagingbar = this.pagingbar;
		this.cm = new Ext.grid.ColumnModel([{
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 190
				}, {
					header : '计费策略',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'chargingDesc',
					width : 70
				}, {
					header : '计费周期',
					menuDisabled : true,
					dataIndex : 'chargingCycle',
					width : 70,
					renderer : IsmpHB.renderer.CHARGINGCYCLE
				}, {
					header : '计费标识',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'billFlag',
					renderer : IsmpHB.renderer.CHARGINGMODE,
					width : 70
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'useFlag',
					renderer : IsmpHB.renderer.STATUS_FLAG,
					width : 60
				}, {
					xtype : 'actioncolumn',
					header : '查看',
					align : 'center',
					width : 40,
					items : [{
						icon : 'images/btn_search.png',
						tooltip : '查看产品包详细信息',
						handler : IsmpHB.orderuser.showAddView
								.createDelegate(this)
					}]
				}, {
					xtype : 'actioncolumn',
					header : '订购',
					align : 'center',
					width : 40,
					items : [{
						getClass : function(html, meta, rec) {
							if (rec.get("useFlag") == IsmpHB.data.STATUS_FLAG.EFFECT
									&& rec.get("chargingCycle") != IsmpHB.data.CHARGING_CYCLE.TIME
									&& rec.get("chargingCycle") != IsmpHB.data.CHARGING_CYCLE.MINUTE
									&& rec.get("chargingCycle") != IsmpHB.data.CHARGING_CYCLE.SECOND) {
								this.items[0].tooltip = '订购该产品包';
								return 'reportAvailableCss';
							} else {
								this.items[0].tooltip = '无法订购该产品包';
								return 'reportSentCss';
							}
						},
						handler : IsmpHB.orderuser.showProduct
								.createDelegate(this)

					}]
				}]);
		IsmpHB.orderuser.AddProductSearchPanel.superclass.constructor.apply(
				this, arguments);
		// 查询产品包事件
		this.addSearchBtn.on('click', function() {

					submitButton1.buttons[0].setDisabled(true);
					Ext.StoreMgr.get('searchPackage').removeAll();
					Ext.StoreMgr.get('addEffectPackage').removeAll();
					ProductAttr1.removeAll();
					Ext.StoreMgr.get('addEffectPackage').load({
								params : {
									method : 'search',
									name : this.packageNameField1.getValue(),
									packageType : '0'
								},
								callback : function(r, o, s) {
									if (!s) {
										Ext.MessageBox
												.alert('提示', '加载超时，请稍后重试');
										return false;
									}
									SearchPagingbar.setVisible(true);
								},
								scope : this
							});
				}, this);

	}
});

// 新增订购框产品包中的产品额外信息（弹右下）
IsmpHB.orderuser.AddProductAttrPanel = Ext.extend(Ext.Panel, {
			title : '产品附加信息',
			autoScroll : true,
			formBox : null,
			store : Ext.StoreMgr.get('productSearchattr'),
			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.formBox = new Ext.Panel({// border布局
					labelAlign : 'right',
					layout : 'form',
					border : false,
					autoScroll : true,
					autoHeight : true,
					bodyStyle : 'padding:5px 0px 5px 0px;',
					items : []

				});
				ProductAttr1 = this.formBox;
				config.items.push(this.formBox);
				IsmpHB.orderuser.AddProductAttrPanel.superclass.constructor
						.apply(this, arguments);

			}
		});

// 新增订购框产品包中的产品（弹右上）
IsmpHB.orderuser.AddProductPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '产品列表',
	autoScroll : true,
	store : Ext.StoreMgr.get('searchPackage'),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		if ('2' == record.data.selectedFlag) {
			return '<div class="x-grid3-row-checker" qtip="必选项，不能取消" class="oper_not_allowed"></div>';
		} else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	},
	constructor : function(config) {
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config = config || {};

		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		ProductSM1 = this.sm;
		this.pagingbar.setVisible(false);
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'name',
					width : 230
				}, {
					header : '状态',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'selectedFlag',
					renderer : function(value) {
						if ('2' == value) {
							return '<font color="red">必选项</font>';
						} else if ('1' == value) {
							return '<font color="gray">默认选项</font>';
						} else {
							return '可选项';
						}
					},
					width : 100
				}]);
		IsmpHB.orderuser.AddProductPanel.superclass.constructor.apply(this,
				arguments);
		this.getSelectionModel().on('rowselect',
				function(sm, rowIndex, record) {
					var id = record.data.id;
					try {
						if (!id.match(/^\d+$/)) {
							id = record.data.id.split('_')[2];
						}
					} catch (e) {
					}
					this.loadDynFormItems(id, record);
					ProductAttr1.removeAll();
				}, this);
		this.getSelectionModel().on('rowdeselect',
				function(sm, rowIndex, record) {
					if (2 == record.data.selectedFlag) {
						if (!this.getSelectionModel().isSelected(record)) {
							this.getSelectionModel().selectRow(rowIndex);
						}
						Ext.MessageBox.alert('提示', '必选项不能取消！');
						return;
					}
				}, this);
	},
	loadDynFormItems : function(pid, record) {
		Ext.StoreMgr.get('productSearchattr').load({
					params : {
						timestamp : new Date().valueOf(),
						ids : pid
					},
					callback : function(r, o, s) {
						if (!s) {
							Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
							return;
						}
						if (null != r && 0 < r.length) {
							for (i = 0; i < r.length; i++) {
								ProductAttr1.add({
											fieldLabel : r[i].data.fieldLabel,
											xtype : r[i].data.xtype,
											name : r[i].data.name,
											allowBlank : r[i].data.allowBlank,
											width : 200
										});
							}
							ProductAttr1.doLayout();
						}
						submitButton1.buttons[0].setDisabled(false);

					},
					scope : this
				});
	},
	attrs2Store : function(id, attrs) {
		var r = this.getStore().getById(id);
		r.data.attrs = attrs;
	}
});

// 产品包信息框里面的选择跳转的方法
IsmpHB.orderuser.showProduct = function(grid, rowIndex, colIndex) {
	Ext.StoreMgr.get('searchPackage').removeAll();
	var r = Ext.StoreMgr.get('addEffectPackage').getAt(rowIndex);
	hbPackageId = r.data.id;
	hbPackageName = r.data.name;
	hbPackageCode = r.data.code;
	if (r.data.useFlag == IsmpHB.data.STATUS_FLAG.EFFECT
			&& r.data.chargingCycle != IsmpHB.data.CHARGING_CYCLE.TIME) {
		Ext.StoreMgr.get('searchPackage').baseParams = {
			method : 'package',
			timestamp : new Date().valueOf(),
			start : 0,
			limit : 5,
			pid : r.data.id
		};
		Ext.StoreMgr.get('searchPackage').load({
			params : {
				timestamp : new Date().valueOf(),
				start : 0,
				limit : 5,
				pid : r.data.id
			},
			callback : function(r, o, s) {
				submitButton1.buttons[0].setDisabled(false);
				if (!s) {
					Ext.MessageBox.alert('提示', '加载超时，请稍后重试');
					return;
				}
				var cs = [];
				Ext.StoreMgr.get('searchPackage').each(function(r) {
							if (2 == r.data.selectedFlag
									|| 1 == r.data.selectedFlag) {
								// 必选或默选，则选之
								cs.push(r);
							}
						}, this);
				ProductSM1.selectRecords(cs);
			},
			scope : this
		});
	} else if (r.data.useFlag != IsmpHB.data.STATUS_FLAG.EFFECT) {
		Ext.MessageBox.alert('提示', '该产品包不是有效状态,不能订购');
		Ext.StoreMgr.get('searchPackage').removeAll();
		ProductAttr1.removeAll();
		submitButton1.buttons[0].setDisabled(true);
	} else {
		Ext.MessageBox.alert('提示', '该产品包计费周期为'
						+ IsmpHB.renderer.CHARGINGCYCLE(r.data.chargingCycle)
						+ '计费,不能订购');
		Ext.StoreMgr.get('searchPackage').removeAll();
		ProductAttr1.removeAll();
		submitButton1.buttons[0].setDisabled(true);
	}

};
// 详细产品包信息弹出框（弹左下弹）
IsmpHB.orderuser.packageDlg = new Ext.Window({
			title : '产品包信息',
			layout : 'fit',
			modal : true,
			width : 450,
			height : 500,
			constrainHeader : true,
			closeAction : 'hide',
			items : [productAddForm1 = new Ext.form.FormPanel({
						labelWidth : 140,
						labelAlign : 'right',
						border : false,
						bodyStyle : 'padding:5px 10px 5px 10px;',
						frame : true,
						items : [{
									fieldLabel : '产品包ID',
									xtype : 'textfield',
									name : 'order_package_id',
									id : 'order_package_id',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '产品包名称',
									xtype : 'textfield',
									name : 'order_package_name',
									id : 'order_package_name',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '产品包编码',
									xtype : 'textfield',
									name : 'order_package_code',
									id : 'order_package_code',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '业务资费',
									xtype : 'textfield',
									name : 'order_package_pairValue',
									id : 'order_package_pairValue',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费标识',
									xtype : 'textfield',
									name : 'order_package_billFlag',
									id : 'order_package_billFlag',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '资费编码',
									xtype : 'textfield',
									name : 'order_package_chargingCode',
									id : 'order_package_chargingCode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费策略描述',
									xtype : 'textfield',
									name : 'order_package_chargingDesc',
									id : 'order_package_chargingDesc',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '计费周期',
									xtype : 'textfield',
									name : 'order_package_chargingCycle',
									id : 'order_package_chargingCycle',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '订购生效模式',
									xtype : 'textfield',
									name : 'order_package_effectMode',
									id : 'order_package_effectMode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '退订生效模式',
									xtype : 'textfield',
									name : 'order_package_withDrawMode',
									id : 'order_package_withDrawMode',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '试用期类型',
									xtype : 'textfield',
									name : 'order_package_trialType',
									id : 'order_package_trialType',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '试用时长',
									xtype : 'textfield',
									name : 'order_package_trialTerm',
									id : 'order_package_trialTerm',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '启用标识',
									xtype : 'textfield',
									name : 'order_package_useFlag',
									id : 'order_package_useFlag',
									width : 180,
									readOnly : true
								}, {
									fieldLabel : '首月计费规则',
									xtype : 'textfield',
									name : 'order_package_beginCharg',
									id : 'order_package_beginCharg',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '注销当月预付费计费规则',
									xtype : 'textfield',
									name : 'order_package_endPreCharg',
									id : 'order_package_endPreCharg',
									width : 250,
									readOnly : true
								}, {
									fieldLabel : '注销当月后付费计费规则',
									xtype : 'textfield',
									name : 'order_package_endAfterCharg',
									id : 'order_package_endAfterCharg',
									width : 250,
									readOnly : true
								}],
						buttonAlign : 'center',
						buttons : [{
									text : '关闭',
									handler : function() {// 点击取消按钮的操作事件
										IsmpHB.orderuser.packageDlg.hide();
									}
								}]
					})]
		});

// 新增订购信息弹出框（弹）
IsmpHB.orderuser.productAddDlg = new Ext.Window({
	title : '新增订购',
	layout : 'fit',
	modal : true,
	width : 960,
	height : 510,
	constrainHeader : true,
	closeAction : 'hide',
	items : [new Ext.Panel({// border布局
		layout : 'border',
		header : false,
		border : false,
		items : [new Ext.form.FormPanel({
			labelAlign : 'right',
			border : false,
			region : 'north',
			layout : "form",
			height : 90,
			frame : true,
			items : [{
						layout : "column", // 从左往右的布局
						items : [{
									columnWidth : .5,
									layout : "form",
									items : [orderTel = new Ext.form.TextField(
											{
												fieldLabel : '客户电话',
												editable : false,
												mode : 'local',
												triggerAction : 'all',
												allowBlank : false,
												emptyText : '请填写客户电话',
												displayField : 'tel',
												width : 180,
												regex : new RegExp('^([0-9]{10,12})$'),
												regexText : '电话号码不合法'

											})]
								}, {
									columnWidth : .5,
									layout : "form",
									items : [orderName = new Ext.form.TextField(
											{
												fieldLabel : '客户姓名',
												editable : false,
												mode : 'local',
												triggerAction : 'all',
												allowBlank : false,
												emptyText : '请填写客户姓名',
												displayField : 'name',
												width : 180
											})]
								}

						]
					}, {
						layout : "column", // 从左往右的布局
						items : [{
							columnWidth : .5,
							layout : "form",
							items : [chargeType1 = new Ext.form.ComboBox({
										fieldLabel : '付费方式',
										editable : false,
										mode : 'local',
										triggerAction : 'all',
										allowBlank : false,
										emptyText : '选择扣费方式',
										displayField : 'name',
										valueField : 'id1',
										width : 180,
										store : new Ext.data.ArrayStore({
													fields : ['id1', 'name'],
													data : [['0', '帐户直接划扣'],
															['1', '以积分兑换']]
												}),
										value : 0

									})]
						}, {
							columnWidth : .5,
							layout : "form",
							items : [flagCombo2 = new Ext.form.ComboBox({
										fieldLabel : '试用标识',
										editable : false,
										mode : 'local',
										triggerAction : 'all',
										allowBlank : false,
										emptyText : '选择试用标识',
										displayField : 'name',
										valueField : 'id1',
										width : 180,
										store : new Ext.data.ArrayStore({
													fields : ['id1', 'name'],
													data : [['0', '正式'],
															['1', '试用']]
												}),
										value : 0
									})]
						}

						]
					}, {
						layout : "column", // 从左往右的布局
						items : [{
									columnWidth : .5,
									layout : "form",
									items : [dbField1 = new Ext.form.DateField(
											{
												fieldLabel : '生效日期',
												format : 'Y-m-d',
												allowBlank : false,
												emptyText : '有效期开始日期',
												msgTarget : 'side',
												name : 'addStartTime1',
												id : 'addStartTime1',
												width : 180,
												value : new Date
											})]
								}, {
									columnWidth : .5,
									layout : "form",
									items : [ddField1 = new Ext.form.DateField(
											{
												fieldLabel : '失效日期',
												format : 'Y-m-d',
												allowBlank : false,
												emptyText : '有效期结束日期',
												msgTarget : 'side',
												name : 'addEndTime1',
												id : 'addEndTime1',
												width : 180,
												value : new Date().add(
														Date.YEAR, 1)
											})]
								}]
					}]
		}), submitButton1 = new Ext.Panel({// border布局
			region : 'south',
			border : false,
			header : false,
			buttonAlign : 'center',
			buttons : [{
				text : '提交',
				// 点击提交按钮的操作事件
				handler : function() {
					var dateValid = IsmpHB.customFunctions.dateValid(dbField1
									.getValue(), ddField1.getValue());
					if (!dateValid) {
						Ext.MessageBox.alert('提示', '生效日期不能在失效日期之后或相同，请修正！',
								null, this);
						return;
					}
					if (orderTel.getValue() == '') {
						Ext.MessageBox.alert('提示', '客户电话不能为空！', null, this);
						return;
					}
					if (orderName.getValue() == '') {
						Ext.MessageBox.alert('提示', '客户姓名不能为空！', null, this);
						return;
					}
					for (var i = 0; i < ProductAttr1.items.length; i++) {
						if (ProductAttr1.get(ProductAttr1.items.items[i])
								.getValue() == ''
								&& !ProductAttr1
										.get(ProductAttr1.items.items[i]).allowBlank) {
							Ext.MessageBox
									.alert(
											'提示',
											ProductAttr1
													.get(ProductAttr1.items.items[i]).fieldLabel
													+ '不能为空！', null, this);
							return;
						}
					}
					var ps = [];
					var rs = ProductSM1.getSelections();
					// 获取已选择的
					var attr = [];
					for (var i = 0; i < ProductAttr1.items.length; i++) {
						var object = {};
						object['k'] = ProductAttr1.items.items[i].name;
						object['v'] = ProductAttr1
								.get(ProductAttr1.items.items[i]).getValue();
						attr.push(object);
					}
					for (var i = 0; i < rs.length; i++) {
						ps.push({
									spec_id : rs[i].data.id,
									name : rs[i].data.name,
									code : rs[i].data.code,
									selectedFlag : rs[i].data.selectedFlag,
									attrs : attr || []
								});
					}

					var cromb = {
						Start_Time : dbField1.getValue()
								.format(Date.patterns.ISO8601Middle),
						End_Time : ddField1.getValue()
								.format(Date.patterns.ISO8601Middle),
						Status : '1',//
						usage : flagCombo2.getValue(),
						product_list : ps
					};
					var req = {
						url : IsmpHB.req.ADD_ORDER_USER,
						params : {
							timestamp : new Date().valueOf(),
							tel : orderTel.getValue(),
							name : orderName.getValue(),
							hbPackageId : hbPackageId,
							hbPackageName : hbPackageName,
							hbPackageCode : hbPackageCode,
							chargeType : chargeType1.getValue(),
							data : Ext.encode(cromb)
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.confirm("提示",
										"添加成功！是否继续添加新订购关系", function(e) {
											if (e == 'yes') {
												SearchPagingbar
														.setVisible(false);
												Ext.StoreMgr
														.get('searchPackage')
														.removeAll();
												Ext.StoreMgr
														.get('addEffectPackage')
														.removeAll();
												ProductAttr1.removeAll();
												IsmpHB.orderuser.productAddDlg
														.show();
												submitButton1.buttons[0]
														.setDisabled(true);
												chargeType1.setDisabled(true);
												flagCombo2.reset();
												dbField1.reset();
												ddField1.reset();
												packageNameField1.reset();
											} else {
												IsmpHB.orderuser.productAddDlg
														.hide();
											}
										});
							} else {
								Ext.MessageBox.alert('提示', '添加失败！', null, this);
							}
						}
					};
					IsmpHB.Ajax.send(req);

				}
			}]
		}), new Ext.Panel({// border布局
			layout : 'border',
			region : 'center',
			border : false,
			split : true,
			header : false,
			items : [new Ext.Panel({// border布局
				region : 'east',
				layout : 'fit',
				border : false,
				split : true,
				width : '38%',
				items : [new Ext.Panel({// border布局
					layout : 'border',
					border : false,
					items : [new IsmpHB.orderuser.AddProductPanel({
										region : 'north',
										height : 200
									}), new Ext.Panel({
								region : 'center',
								layout : 'fit',
								border : false,
								bodyStyle : 'background-color:#dfe8f6; padding:10px 10px 0px 0px;',
								items : [new IsmpHB.orderuser.AddProductAttrPanel(
										{})]
							})]
				})]
			}), new IsmpHB.orderuser.AddProductSearchPanel({
						region : 'center'
					})]
		})]
	})]
});

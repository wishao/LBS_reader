/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.cpkg');

LBSReader.cpkg.ProductGrid = Ext.extend(Ext.grid.GridPanel, {
			autoScroll : true,
			store : Ext.StoreMgr.get('productall'),
			cls : 'box-dataGrid',

			constructor : function(config) {
				this.addBtn = new Ext.Button({
							text : '添加产品',
							iconCls : 'btn-add'
						});
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 15,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '{0}-{1} 共{2}项',
							emptyMsg : "没有结果！",
							items : [this.addBtn]
						});
				config = config || {};
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false,
							checkOnly : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '产品名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'name',
							width : 150
						}, {
							header : '产品编码',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'code',
							width : 150
						}, {
							header : '业务资费',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'fairValue',
							width : 100
						}]);
				LBSReader.cpkg.ProductGrid.superclass.constructor.apply(this,
						arguments);

				this.addBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelections();
							for (var i = 0; i < Ext.StoreMgr.get('groupitem')
									.getCount(); i++) {
								var r = Ext.StoreMgr.get('groupitem').getAt(i);
								for (var j = rs.length - 1; j >= 0; j--) {
									if (r.data.id == rs[j].data.id) {
										rs.remove(rs[j]);
									}
								}
							}
							Ext.StoreMgr.get('groupitem').add(rs);
							this.ownerCt.hide();
						}, this);
			},
			loadItems : function(s, l) {
				this.getStore().load({
							params : {
								timestamp : new Date().valueOf(),
								start : s || 0,
								limit : l || this.pagingbar.pageSize
							},
							callback : function(r, o, s) {

							},
							scope : this
						});
			}
		});

LBSReader.cpkg.ProductDlg = Ext.extend(Ext.Window, {
	title : '选择产品',
	layout : 'fit',
	modal : true,
	width : 440,
	height : 350,
	constrainHeader : true,
	closeAction : 'hide',

	grid : null,

	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.grid = new LBSReader.cpkg.ProductGrid({});
		config.items.push(this.grid);
		LBSReader.cpkg.ProductDlg.superclass.constructor.apply(this, arguments);

		this.on('show', function() {
					this.grid.loadItems();
				}, this);
		this.on('hide', function() {
					this.grid.getStore().removeAll();
				}, this);
	}
});

LBSReader.cpkg.GroupItemGrid = Ext.extend(Ext.grid.GridPanel, {
			autoScroll : true,
			height : 150,
			store : Ext.StoreMgr.get('groupitem'),

			addBtn : new Ext.Button({
						text : '添加产品',
						iconCls : 'btn-add'
					}),
			removeBtn : new Ext.Button({
						text : '删除产品',
						iconCls : 'btn-remove'
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
									fields : ['code', 'name'],
									data : [['0', '设为可选项'], ['1', '设为默认选项'],
											['2', '设为必选项']]
								})
					}),
			commitBtn : new Ext.Button({
						text : '修改',
						iconCls : 'btn-commit'
					}),

			constructor : function(config) {
				this.pdlg = new LBSReader.cpkg.ProductDlg({});
				config = config || {};
				config.bbar = config.bbar || [];
				config.bbar.push(this.addBtn);
				config.bbar.push(this.removeBtn);
				config.bbar.push(this.sFlagCombo);
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
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
							renderer : LBSReader.renderer.SELECT_FLAG,
							width : 100
						}]);
				LBSReader.cpkg.GroupItemGrid.superclass.constructor.apply(this,
						arguments);

				this.addBtn.on('click', function() {
							this.pdlg.show();
						}, this);
				this.sFlagCombo.on('collapse', function() {
							this.commitItems();
						}, this);
				this.removeBtn.on('click', function() {
							this.removeItems();
						}, this);
			},
			setArrayRecords : function(os) {
				this.getStore().loadData({
							rows : os
						}, true);
			},
			getAsArray : function() {
				var os = [];
				for (var i = 0; i < this.getStore().getCount(); i++) {
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
				var count = this.getStore().query('selectedFlag', 1).getCount();
				return count >= 0 && count <= value;
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
				for (var i = 0; i < rows.length; i++) {
					for (j = 0; j < records.length; j++) {
						if (rows[i].data.id == records[j].data.id) {
							rows[i].data.selectedFlag = this.sFlagCombo
									.getValue();
						}
					}
					rs.push(rows[i].data);
				}
				this.getStore().loadData({
							rows : rs
						});
			}
		});

LBSReader.cpkg.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 90,
	labelAlign : 'right',
	border : false,
	autoScroll : true,
	layout : 'column',
	bodyStyle : 'padding:5px 10px 5px 10px;',
	oldParam : 0,

	idHidden : new Ext.form.Hidden({
				name : 'id',
				value : -1
			}),
	nameField : new Ext.form.TextField({
				fieldLabel : '产品包名称',
				allowBlank : false,
				emptyText : '请填写名称',
				blankText : '请填写名称',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),
	seqNumField : new Ext.form.TextField({
				fieldLabel : '产品包编码',
				regex : /^[^\u4e00-\u9fa5]*?$/,
				regexText : '请输入有效的值，不能有中文',
				allowBlank : false,
				emptyText : '请填写编码',
				blankText : '请填写编码',
				validator : LBSReader.customFunctions.validateBankTrim,
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
	cMaxField : new Ext.form.NumberField({
				fieldLabel : '最大可选项',
				allowBlank : false,
				allowNegative : false,
				minValue : 0,
				emptyText : '请填写最大可选项',
				blankText : '请填写最大可选项',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),
	smaxField : new Ext.form.NumberField({
				fieldLabel : '业务资费',
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
							fields : ['code', 'name'],
							data : [['1', '号百计费'], ['2', 'CRM计费']]
						})
			}),
	chargingCodeField : new Ext.form.TextField({
				fieldLabel : '计费编码',
				regex : /^[^\u4e00-\u9fa5]*?$/,
				regexText : '请输入有效的值，不能有中文',
				allowBlank : false,
				emptyText : '请输入计费编码',
				blankText : '请输入计费编码',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),
	chargingDescTex : new Ext.form.TextArea({
				grow : true,
				fieldLabel : '计费策略描述',
				width : 200,
				height : 40,
				autoHeight : false
			}),
	chargingCycleCmb : new Ext.form.ComboBox({
				fieldLabel : '计费周期',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				displayField : 'view',
				valueField : 'code',
				width : 200,
				store : LBSReader.store.CHARGING_CYCLE,
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
							fields : ['mode', 'name'],
							data : [['0', '立即生效'], ['1', '下个计费周期生效']]
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
							fields : ['mode', 'name'],
							data : [['0', '立即生效'], ['1', '下个计费周期生效']]
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
							fields : ['mode', 'name'],
							data : [['0', '无试用期'], ['1', '有试用期到月底'],
									['2', '有试用时长']]
						}),
				value : 0,
				listeners : {
					"collapse" : function() {
						var obj = this.nextSibling();
						if (this.getValue() != 2) {
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
				width : 200,
				value : 0
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
							fields : ['mode', 'name'],
							data : [[0, '有效'], [1, '无效']]
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
				store : new Ext.data.ArrayStore({
							fields : ['mode', 'name'],
							data : [[1, '当月生效，收取全月费用'],
									[2, '每月1-15日开户，收全价费用，16日后开户收半月费用'],
									[3, '每月1-22日开户收全月费用，22日后开户，当月免费'],
									[4, '收取全年费用'], [5, '收取全月费用'], [6, '按天计费'],
									[7, '1-22日收全月费用，23日后免费'], [99, '其他']]
						}),
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
				store : new Ext.data.ArrayStore({
							fields : ['mode', 'name'],
							data : [[1, '当月生效，不计费'], [2, '订购当月按天收费'],
									[3, '每月1-9日注销，当月不计费，10日至月末注销，收当月费用'],
									[4, '次月生效'], [99, '其他']]
						}),
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
				store : new Ext.data.ArrayStore({
							fields : ['mode', 'name'],
							data : [[1, '当月生效，不计费'], [2, '次月生效，当月按正常收费'],
									[3, '每月1-15日注销，当月不计费，16日至月末注销，收当月半价费用'],
									[4, '到期自动失效'], [5, '1-15日免费，16日后半价'],
									[99, '其他']]
						}),
				value : 3
			}),

	grid : new LBSReader.cpkg.GroupItemGrid({}),

	commitBtn : new Ext.Button({
				text : '提交',
				iconCls : 'btn-commit'
			}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		this.fieldSet = new Ext.form.FieldSet({
					baseCls : 'custom-fieldset',
					items : [this.grid]
				});
		config.items.push({
					columnWidth : .5,
					layout : 'form',
					bodyBorder : false,
					items : [this.idHidden, this.nameField, this.seqNumField,
							this.smaxField, this.billCombo,
							this.chargingCodeField, this.chargingCycleCmb,
							this.chargingDescTex, this.effectModeCmb,
							this.withDrawModeCmb, this.trialTypeCmb,
							this.trialTermField]
				}, {
					columnWidth : .5,
					bodyBorder : false,
					layout : 'form',
					items : [this.useFlagCmb, this.beginRuleCmb,
							this.endPreCmb, this.endAfterCmb, this.cMaxField,
							this.fieldSet]
				});
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		LBSReader.cpkg.ItemForm.superclass.constructor.apply(this, arguments);

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
		this.seqNumField.reset();
		this.smaxField.reset();
		this.cMaxField.reset();
		this.billCombo.reset();
		// 添加表字段后增加的
		this.chargingCodeField.reset();
		this.chargingDescTex.reset();
		this.chargingCycleCmb.reset();
		this.effectModeCmb.reset();
		this.withDrawModeCmb.reset();
		this.trialTypeCmb.reset();
		this.trialTermField.reset();
		this.useFlagCmb.reset();
		this.beginRuleCmb.reset();
		this.endPreCmb.reset();
		this.endAfterCmb.reset();
		this.grid.getStore().removeAll();
	},
	setValue : function(o) {

		if (null != o.id) {
			this.idHidden.setValue(o.id);
		}
		if (null != o.name) {
			this.nameField.setValue(o.name);
			this.oldParam = o.code;
		}
		if (null != o.code) {
			this.seqNumField.setValue(o.code);
		}
		if (null != o.pairValue) {
			this.smaxField.setValue(o.pairValue);
		}
		if (null != o.optionMax) {
			this.cMaxField.setValue(o.optionMax);
		}
		if (null != o.billFlag) {
			this.billCombo.setValue(o.billFlag);
		}
		if (null != o.chargingDesc) {
			this.chargingDescTex.setValue(o.chargingDesc);
		}
		if (null != o.chargingCycle) {
			this.chargingCycleCmb.setValue(o.chargingCycle);
		}
		if (null != o.chargingCode) {
			this.chargingCodeField.setValue(o.chargingCode);
		}
		if (null != o.effectMode) {
			this.effectModeCmb.setValue(o.effectMode);
		}
		if (null != o.withDrawMode) {
			this.withDrawModeCmb.setValue(o.withDrawMode);
		}
		if (null != o.trialType) {
			this.trialTypeCmb.setValue(o.trialType);
		}
		if (null != o.trialTerm) {
			this.trialTermField.setValue(o.trialTerm);
		}
		if (null != o.multi && o.multi.length > 0) {
			this.grid.setArrayRecords(o.multi);
		}
		if (null != o.useFlag) {
			this.useFlagCmb.setValue(o.useFlag);
		}
		if (null != o.beginCharg) {
			this.beginRuleCmb.setValue(o.beginCharg);
		}
		if (null != o.endPreCharg) {
			this.endPreCmb.setValue(o.endPreCharg);
		}
		if (null != o.endAfterCharg) {
			this.endAfterCmb.setValue(o.endAfterCharg);
		}
	},
	isValid : function() {
		return this.nameField.isValid() && this.seqNumField.isValid()
				&& this.smaxField.isValid() && this.cMaxField.isValid()
				&& this.billCombo.isValid() && this.chargingCodeField.isValid()
				&& this.effectModeCmb.isValid()
				&& this.withDrawModeCmb.isValid()
				&& this.trialTypeCmb.isValid() && this.trialTermField.isValid();
	},
	commitAdd : function() {
		if (!this.isValid()) {
			return;
		}
		if (!this.grid.isValid(this.cMaxField.getValue())) {
			var errorMsg = '最大可选项为' + this.cMaxField.getValue() + '项, '
					+ '您的默认项已经选择了'
					+ this.grid.getStore().query('selectedFlag', 1).getCount()
					+ '项！';
			Ext.Msg.show({
						title : '融合产品包配置',
						msg : errorMsg,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		var req = {
			url : LBSReader.req.HBPACKAGE_MULTI_ADD,
			params : {
				timestamp : new Date().valueOf(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				optionMax : this.cMaxField.getValue(),
				//
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
				packageType : 1,
				options : Ext.encode(this.grid.getAsArray())
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '添加成功！', function() {
							}, this);
				} else {
					Ext.MessageBox.alert('提示', o.message || '添加失败！',
							function() {
							}, this);
					return;
				}
				this.ownerCt.hide();
				this.resetForm();
			}
		};
		LBSReader.Ajax.send(req);
	},
	commitEdit : function() {
		if (!this.isValid()) {
			return;
		}
		if (!this.grid.isValid(this.cMaxField.getValue())) {
			var errorMsg = '最大可选项为' + this.cMaxField.getValue() + '项, '
					+ '您的默认项已经选择了'
					+ this.grid.getStore().query('selectedFlag', 1).getCount()
					+ '项！';
			Ext.Msg.show({
						title : '融合产品包配置错误',
						msg : errorMsg,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		var req = {
			url : LBSReader.req.HBPACKAGE_MULTI_UPDATE,
			params : {
				timestamp : new Date().valueOf(),
				id : this.idHidden.getValue(),
				name : this.nameField.getValue(),
				code : this.seqNumField.getValue(),
				pairValue : this.smaxField.getValue(),
				billFlag : this.billCombo.getValue(),
				optionMax : this.cMaxField.getValue(),
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
				packageType : 1,
				oldCode : this.oldParam,
				options : Ext.encode(this.grid.getAsArray())
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示', '修改成功！', function() {
							}, this);
				} else {
					Ext.MessageBox.alert('提示', o.message || '修改失败！',
							function() {
							}, this);
				}
				this.ownerCt.hide();
				this.resetForm();
			}
		};
		LBSReader.Ajax.send(req);
	}
});

LBSReader.cpkg.ItemDlg = Ext.extend(Ext.Window, {
			title : '融合产品包配置',
			layout : 'fit',
			modal : true,
			width : 740,
			height : 400,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.cpkg.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.cpkg.ItemDlg.superclass.constructor.apply(this,
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
		});

LBSReader.cpkg.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '融合产品包配置',
			autoScroll : true,
			store : Ext.StoreMgr.get('cpackage'),
			cls : 'box-dataGrid',
			viewConfig : {
				getRowClass : function(record, rowIndex, rowParams, store) {
					if (LBSReader.data.USE_FLAG.NOEFFECT == record.data.useFlag) {
						return 'unknown';
					}
				}
			},

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
						text : '置为无效',
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
				this.dlg = new LBSReader.cpkg.ItemDlg({});
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
							singleSelect : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '产品包名称',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'name',
							width : 150
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
							width : 100
						}, {
							header : '计费标识',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'billFlag',
							renderer : LBSReader.renderer.CHARGINGMODE,
							width : 100
						}, {
							header : '最多可选项',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'optionMax',
							width : 100
						}, {
							header : '包含产品',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'multi',
							renderer : LBSReader.renderer.PACKAGE_MULTI_PRODUCT,
							width : 200
						}, {
							header : '计费编码',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'chargingCode',
							width : 100
						}, {
							header : '计费策略描述',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'chargingDesc',
							width : 100
						}, {
							header : '计费周期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'chargingCycle',
							width : 70,
							renderer : LBSReader.renderer.CHARGINGCYCLE
						}, {
							header : '订购生效模式',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'effectMode',
							width : 100,
							renderer : LBSReader.renderer.EFFECTMODE
						}, {
							header : '退订生效模式',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'withDrawMode',
							width : 100,
							renderer : LBSReader.renderer.EFFECTMODE
						}, {
							header : '试用期类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'trialType',
							width : 100,
							renderer : LBSReader.renderer.TRIAL_TYPE
						}, {
							header : '试用期时长',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'trialTerm',
							width : 70
						}, {
							header : '启用状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'useFlag',
							width : 60,
							renderer : LBSReader.renderer.STATUS_FLAG
						}, {
							header : '首月计费规则',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'beginCharg',
							width : 100,
							renderer : LBSReader.renderer.BEGIN_RULE
						}, {
							header : '注销当月预付费计费规则',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'endPreCharg',
							width : 100,
							renderer : LBSReader.renderer.END_PRE_CHARG
						}, {
							header : '注销当月后付费计费规则',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'endAfterCharg',
							width : 100,
							renderer : LBSReader.renderer.END_AFTER_CHARG
						}]);
				LBSReader.cpkg.DataGrid.superclass.constructor.apply(this,
						arguments);

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
							this.dlg.show();
							this.dlg.toAdd();
						}, this);
				this.uptBtn.on('click', function() {
							var r = this.getSelectionModel().getSelected();
							if (null != r && null != r.data) {
								this.dlg.show();
								this.dlg.setValue(r.data);
								this.dlg.toEdit();
							} else {
								Ext.MessageBox.alert('提示', '请选择所要修改的记录！', null,
										this);
								return;
							}
						}, this);
				this.remvBtn.on('click', function() {
							var r = this.getSelectionModel().getSelected();
							if (r == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm("提示", "确认要把所选记录置为无效吗？",
									function(id) {
										if (id == "yes") {
											this.removeItems();
										}
									}, this);
						}, this);
				this.searchBtn.on('click', function() {
							this.searchItems();
						}, this);
			},
			loadItems : function() {
				if (null == this.nameField.getValue()
						|| '' == this.nameField.getValue().trim()) {
					this.getStore().baseParams = {
						method : 'search',
						name : this.nameField.getValue(),
						packageType : '1'
					};
				} else {
					this.getStore().baseParams = {
						method : 'page',
						packageType : '1'
					};
				}

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
						url : LBSReader.req.HBPACKAGE_MULTI_REMOVE,
						params : {
							timestamp : new Date().valueOf(),
							id : r.data.id,
							packageType : '1'
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.alert('提示', '操作成功！', function() {
											this.loadItems();
										}, this);
							} else {
								Ext.MessageBox.alert('提示', '操作失败！', function() {
										}, this);
							}
						}
					};
					LBSReader.Ajax.send(req);
				}
			},
			searchItems : function(name) {
				this.getStore().baseParams = {
					method : 'search',
					name : this.nameField.getValue(),
					packageType : '1'
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
			}
		});

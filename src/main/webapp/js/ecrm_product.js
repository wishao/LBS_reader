/**
 * @author pansenxin
 */
Ext.namespace('LBSReader', 'LBSReader.ecrmProduct');
LBSReader.ecrmProduct.DataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : 'CRM产品信息',
			autoScroll : true,
			store : Ext.StoreMgr.get('ecrm_product'),
			cls : 'box-dataGrid',

			eProductNameField : new Ext.form.TextField({
						emptyText : '产品名称',
						maxLength : 110,
						msgTarget : 'side',
						width : 150
					}),
			searchBtn : new Ext.Button({
						text : '搜索',
						cls : 'btn-search btn-common'
					}),
			resetBtn : new Ext.Button({
						text : '重置搜索条件',
						cls : 'btn-common-wide btn-common'
					}),
			addBtn : new Ext.Button({
						text : '新增',
						cls : 'btn-search btn-common'
					}),
			delBtn : new Ext.Button({
						text : '删除',
						cls : 'btn-search btn-common'
					}),
			updBtn : new Ext.Button({
						text : '修改',
						cls : 'btn-search btn-common'
					}),
			constructor : function(config) {
				this.addEcrmProductWind = new LBSReader.ecrmProduct.productItemDlg(
						{});
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};
				config.tbar = config.tbar || [];
				var a = LBSReader.common.getPermission('10-4');
				var arr = [];
				if (LBSReader.common.isHasPermission(a, 1)) {
					arr.push(this.searchBtn);
					arr.push(this.resetBtn);
				}
				arr.push('->');

				if (LBSReader.common.isHasPermission(a, 2)) {
					arr.push(this.addBtn);
				}
				if (LBSReader.common.isHasPermission(a, 3)) {
					arr.push(this.delBtn);
				}
				if (LBSReader.common.isHasPermission(a, 4)) {
					arr.push(this.updBtn);
				}
				var nc = LBSReader.common.getSession("loginInfo").nodeCode;
				config.tbar.push(new Ext.Panel({
							border : false,
							items : [{
										xtype : 'toolbar',
										border : false,
										items : ['产品名称：',
												this.eProductNameField, arr]
									}]
						}));
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
							header : '',
							checkOnly : true
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '产品id',
							align : 'center',
							hidden : true,
							menuDisabled : true,
							dataIndex : 'id',
							width : 100
						}, {
							header : '产品编码',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'eProductType',
							width : 100
						}, {
							header : '产品名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'eProductName',
							width : 120
						}, {
							header : '分类',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'bcf',
							renderer : LBSReader.renderer.ECRM_PRODUCT_BCF,
							width : 120
						}, {
							header : '上级产品',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'supProduct',
							renderer : LBSReader.renderer.ECRM_SUPHBPRODUCT,
							width : 80
						}, {
							header : '号百产品名称',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'hbProId',
							renderer : LBSReader.renderer.ECRM_SUPHBPRODUCT,
							width : 100
						}, {
							header : '启用状态',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'flag',
							renderer : LBSReader.renderer.ECRM_PRODUCT_FLAG,
							width : 60
						}, {
							header : '计费策略',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'chargingDesc',
							width : 60
						}, {
							header : '产品类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'epType',
							renderer : LBSReader.renderer.ECRM_PRODUCT_TYPE,
							width : 60
						}, {
							header : '业务描述',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'eDesc',
							width : 150
						}, {
							header : '地市',
							align : 'center',
							menuDisabled : true,
							renderer : LBSReader.renderer.ECRMPRODUCTCITYCOBO,
							dataIndex : 'areaCode',
							width : 60
						}, {
							header : '创建时间',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'createTime',
							width : 100
						}, {
							header : '更新时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'updateTime',
							width : 100
						}]);
				LBSReader.ecrmProduct.DataGrid.superclass.constructor.apply(
						this, arguments);
				this.on('show', function() {
							if (this.store.data.length == 0) {
								this.loadItems();
							}
						}, this);
				this.addEcrmProductWind.on('hide', function() {
							this.pagingbar.doRefresh();
							this.addEcrmProductWind.configForm.resetForm();
						}, this);
				this.addBtn.on('click', function() {
							this.addEcrmProductWind.show();
							this.addEcrmProductWind.toAdd();
						}, this);
				this.delBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm("提示", "确认要把所选记录删除吗？",
									function(id) {
										if (id == "yes") {
											this.delItems();
										}
									}, this);
						}, this);
				this.updBtn.on('click', function() {
							var rs = this.getSelectionModel().getSelected();
							if (rs == null) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
							} else {
								this.addEcrmProductWind.show();
								this.addEcrmProductWind.configForm
										.setValue(rs.data);
								this.addEcrmProductWind.toEdit(rs.data);
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
				this.eProductNameField.reset();
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
			},
			searchItems : function(name) {
				this.getStore().baseParams = {
					method : 'search',
					eProductName : this.eProductNameField.getValue()
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
			delItems : function() {
				var r = this.getSelectionModel().getSelections();
				var ps = [];
				for (var i = 0; i < r.length; i++) {
					ps.push({
								id : r[i].data.id
							});
				}
				var req = {
					url : LBSReader.req.ECRMPRODUCT_MGR,
					params : {
						timestamp : new Date().valueOf(),
						data : Ext.encode(ps),
						method : 'del'
					},
					scope : this,
					callback : function(o) {
						if (o.success == 'true') {
							Ext.MessageBox.alert('提示', '操作成功！', function() {
										this.loadItems();
									}, this);
						} else if (o.success == 'false' && o.message == "error") {
							Ext.MessageBox.alert('提示', '操作失败！此产品存在订购关系！',
									function() {
									}, this);
						} else if (o.success == 'false'
								&& o.message == "exception") {
							Ext.MessageBox.alert('提示', '操作失败！系统出现异常！',
									function() {
									}, this);
						}
					}
				};
				LBSReader.Ajax.send(req);
			}
		});
LBSReader.ecrmProduct.ecrmProductForm = Ext.extend(Ext.form.FormPanel, {
	id : "productAdd",
	labelWidth : 80,
	labelAlign : 'right',
	autoScroll : true,
	bodyStyle : 'padding:5px 5px 5px 5px;',
	border : false,

	pid : new Ext.form.TextField({
				fieldLabel : 'id',
				name : 'pid',
				hidden : true,
				allowBlank : false,
				disabled : true,
				width : 240
			}),
	productType : new Ext.form.TextField({
				fieldLabel : '产品编码',
				name : 'pType',
				validator : LBSReader.customFunctions.validateBankTrim,
				regex : /^[^\u4E00-\u9FA5]*?$/,
				regexText : '请输入有效的值，不能有中文',
				emptyText : "请输入产品编码",
				width : 240
			}),
	productName : new Ext.form.TextField({
				fieldLabel : '产品名称',
				name : 'pName',
				allowBlank : false,
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '产品名称不能为空',
				emptyText : "请输入产品名称",
				width : 240
			}),
	bcfCode : new Ext.form.ComboBox({
				fieldLabel : '分类',
				editable : false,
				triggerAction : 'all',
				mode : 'local',
				allowBlank : false,
				emptyText : '请选择类型',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '暂无'], ['1', '信息搜索类'],
									['2', '企业信息化'], ['3', '通信信息处理类'],
									['4', '套餐销售品'], ['5', '电信传媒类'],
									['6', '电子商务类']]
						})
			}),
	supProductId : new Ext.form.ComboBox({
				fieldLabel : '上级产品',
				editable : false,
				triggerAction : 'all',
				mode : 'local',
				emptyText : '若无上级产品，请选择无',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : LBSReader.store.ECRMSUPPRODUCT
			}),
	hbProId : new Ext.form.ComboBox({
				fieldLabel : '号百产品',
				editable : false,
				triggerAction : 'all',
				mode : 'local',
				emptyText : '若无号百产品，请选择无',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : LBSReader.store.ECRMHBPRODUCT
			}),
	flag : new Ext.form.ComboBox({
				fieldLabel : '启用状态',
				editable : false,
				triggerAction : 'all',
				mode : 'local',
				allowBlank : false,
				emptyText : '请选择启用状态',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '启用'], ['1', '下线']]
						})
			}),
	chargingDesc : new Ext.form.TextField({
				fieldLabel : '计费策略描述',
				name : 'chargingDesc',
				allowBlank : false,
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '计费策略描述不能为空',
				width : 240
			}),
	epType : new Ext.form.ComboBox({
				fieldLabel : '产品类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择产品类型',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['1', '订购类'], ['2', '合同类']]
						})
			}),
	eDesc : new Ext.form.TextField({
				fieldLabel : '业务描述',
				name : 'eDesc',
				allowBlank : false,
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '业务描述不能为空',
				width : 240
			}),
	areaCodeType : new Ext.form.ComboBox({
				fieldLabel : '地市',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				emptyText : '请选择地市',
				displayField : 'name',
				valueField : 'id',
				width : 240,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '全省通用'], ['020', '广州市'],
									['0660', '汕尾市'], ['0662', '阳江市'],
									['0663', '揭阳市'], ['0668', '茂名市'],
									['0750', '江门市'], ['0751', '韶关市'],
									['0752', '惠州市'], ['0753', '梅州市'],
									['0754', '汕头市'], ['0755', '深圳市'],
									['0756', '珠海市'], ['0757', '佛山市'],
									['0758', '肇庆市'], ['0759', '湛江市'],
									['0760', '中山市'], ['0762', '河源市'],
									['0763', '清远市'], ['0766', '云浮市'],
									['0768', '潮州市'], ['0769', '东莞市']]
						})
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
		this.isEDIT = false;
		var config = config || {};
		config.items = config.items || [];
		config.buttons = config.buttons || [];
		config.items.push([{
			columnWidth : .5,
			layout : 'form',
			bodyBorder : false,
			items : [this.productType, this.productName, this.bcfCode,
					this.supProductId, this.hbProId, this.flag,
					this.chargingDesc, this.epType, this.eDesc,
					this.areaCodeType]
		}]);
		config.buttons.push(this.addBtn);
		config.buttons.push(this.cancelBtn);
		LBSReader.ecrmProduct.ecrmProductForm.superclass.constructor.apply(
				this, arguments);
		this.addBtn.on('click', function() {
					if (this.isEDIT) {
						this.toEdit();
					} else {
						this.toadd();
					}
				}, this);
		this.cancelBtn.on('click', function() {
					this.cancelOp();
				}, this);
		this.supProductId.on('collapse', function() {
					if (this.supProductId.getValue() == "若无上级产品，请选择无") {
						this.supProductId.setValue("若无上级产品，请选择无");
						this.productType.setDisabled(false);
					} else if (this.supProductId.getValue() != -1
							&& (this.supProductId.getValue().length != 0)) {
						this.productType.setValue(this.supProductId.getValue());
						this.productType.setDisabled(true);
					} else if (this.supProductId.getValue() == 0
							&& (this.supProductId.getValue().length == undefined)) {
						this.productType.setValue(this.supProductId.getValue());
						this.productType.setDisabled(true);
					} else if (this.supProductId.getValue().length == 0
							&& !(this.supProductId.getValue().length == undefined)) {
						this.productType.setDisabled(false);
					} else {
						this.productType.setDisabled(false);
					}
				}, this)
	},

	isValid : function() {
		return this.productType.isValid() && this.productName.isValid()
				&& this.bcfCode.isValid() && this.supProductId.isValid()
				&& this.hbProId.isValid() && this.flag.isValid()
				&& this.chargingDesc.isValid() && this.epType.isValid()
				&& this.eDesc.isValid() && this.areaCodeType.isValid();
	},
	resetForm : function() {
		this.items.each(function(item, index, length) {
					item.items.each(function(o) {
								o.reset();
							}, this);
				}, this);
		this.supProductId.setValue("若无上级产品，请选择无");
	},
	setValue : function(o) {
		if (null != o.id) {
			this.pid.setValue(o.id);
		}
		if (null != o.eProductType) {
			this.productType.setValue(o.eProductType);
		}
		if (null != o.eProductName) {
			this.productName.setValue(o.eProductName);
		}
		if (null != o.bcf) {
			this.bcfCode.setValue(o.bcf);
		}
		if (null != o.supProduct.name) {
			this.supProductId.setValue(o.supProduct.name);
		}
		if (null != o.hbProId.name) {
			this.hbProId.setValue(o.hbProId.name);
		}
		if (null != o.flag) {
			this.flag.setValue(o.flag);
		}
		if (null != o.chargingDesc) {
			this.chargingDesc.setValue(o.chargingDesc);
		}
		if (null != o.epType) {
			this.epType.setValue(o.epType);
		}
		if (null != o.beginCharg) {
			this.beginRuleCmb.setValue(o.beginCharg);
		}
		if (null != o.eDesc) {
			this.eDesc.setValue(o.eDesc);
		}
		if (null != o.areaCode) {
			this.areaCodeType.setValue(LBSReader.renderer
					.ECRMPRODUCTCITYCOBO(o.areaCode));
		}
	},
	toadd : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : LBSReader.req.ECRMPRODUCT_MGR,
			params : {
				pType : this.productType.getValue(),
				pName : this.productName.getValue(),
				bcfCode : this.bcfCode.getValue(),
				supProductId : this.supProductId.getValue(),
				hbProId : this.hbProId.getValue(),
				flag : this.flag.getValue(),
				chargingDesc : this.chargingDesc.getValue(),
				epType : this.epType.getValue(),
				eDesc : this.eDesc.getValue(),
				areaCode : this.areaCodeType.getValue(),
				method : 'add'
			},
			scope : this,
			callback : function(o) {
				if (o.success == 'true') {
					Ext.getCmp('productAdd').getForm().reset()
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '添加成功',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else if (o.success == 'false' && o.message == "hasCode") {
					Ext.Msg.show({
								title : '操作提示',
								msg : '添加失败,编码已有,请选择其他编码',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else if (o.success == 'false' && o.message == "exception") {
					Ext.Msg.show({
								title : '操作提示',
								msg : '添加失败,系统出现异常',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.show({
								title : '操作提示',
								msg : '添加失败',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		}
		LBSReader.Ajax.send(req);
	},
	toEdit : function() {
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : LBSReader.req.ECRMPRODUCT_MGR,
			params : {
				pid : this.pid.getValue(),
				pType : this.productType.getValue(),
				pName : this.productName.getValue(),
				bcfCode : this.bcfCode.getValue(),
				supProductId : this.supProductId.getValue(),
				hbProId : this.hbProId.getValue(),
				flag : this.flag.getValue(),
				chargingDesc : this.chargingDesc.getValue(),
				epType : this.epType.getValue(),
				eDesc : this.eDesc.getValue(),
				areaCode : this.areaCodeType.getValue(),
				method : 'upd'
			},
			scope : this,
			callback : function(o) {
				if (o.success == 'true') {
					this.ownerCt.hide();
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '修改成功',
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '修改失败',
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
LBSReader.ecrmProduct.productItemDlg = Ext.extend(Ext.Window, {
			layout : 'fit',
			modal : true,
			width : 440,
			height : 340,
			closeAction : 'hide',
			constrainHeader : true,
			header : true,
			title : '',
			configForm : null,

			constructor : function(config) {
				var config = config || {};
				config.items = this.items || [];
				this.configForm = new LBSReader.ecrmProduct.ecrmProductForm({});
				config.items.push(this.configForm);
				LBSReader.ecrmProduct.productItemDlg.superclass.constructor
						.apply(this, arguments);
				this.on('show', function() {
							this.configForm.supProductId.getStore().load(); // 加载上级产品
							this.configForm.hbProId.getStore().load(); // 加载号百产品
						}, this);
				this.on('hide', function() {
						}, this);
			},
			toAdd : function() {
				this.configForm.isEDIT = false;
				this.configForm.productType.setDisabled(false);
				this.setTitle('新增产品');
			},
			toEdit : function(o) {
				if (o.supProduct.id == -1) {
					this.configForm.supProductId.setValue("若无上级产品，请选择无");
				}
				this.configForm.isEDIT = true;
				this.configForm.productType.setDisabled(false);
				this.setTitle('修改产品');
			}
		});

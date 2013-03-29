/**
 * @author chenziping 2012.05.08
 */
Ext.namespace('LBSReader', 'LBSReader.blacklist');

var areaNoData = {
	'GZ' : '020',
	'SG' : '0751',
	'SZ' : '0755',
	'ZH' : '0756',
	'ST' : '0754',
	'FS' : '0757',
	'JM' : '0750',
	'ZJ' : '0759',
	'MM' : '0668',
	'ZQ' : '0758',
	'HZ' : '0752',
	'MZ' : '0753',
	'SW' : '0660',
	'HY' : '0762',
	'YJ' : '0662',
	'QY' : '0763',
	'DG' : '0769',
	'ZS' : '0760',
	'CZ' : '0768',
	'JY' : '0663',
	'YF' : '0766'
};

var nodeCodeData = [['GD', '全省'], ['GZ', '广州'], ['SG', '韶关'], ['SZ', '深圳'],
		['ZH', '珠海'], ['ST', '汕头'], ['FS', '佛山'], ['JM', '江门'], ['ZJ', '湛江'],
		['MM', '茂名'], ['ZQ', '肇庆'], ['HZ', '惠州'], ['MZ', '梅州'], ['SW', '汕尾'],
		['HY', '河源'], ['YJ', '阳江'], ['QY', '清远'], ['DG', '东莞'], ['ZS', '中山'],
		['CZ', '潮州'], ['JY', '揭阳'], ['YF', '云浮']];

var sourceData = [[1, '省IT黑名单'], [2, '声讯业务黑名单'], [3, '地市黑名单'], [4, '公务纳费'],
		[5, '局公话免费'], [6, '市场公免'], [7, '红名单']];

var rangeTypeData = [[1, '区域'], [2, '业务']];

LBSReader.blacklist.ItemForm = Ext.extend(Ext.form.FormPanel, {
			labelWidth : 90,
			labelAlign : 'right',
			border : false,
			bodyStyle : 'padding:5px 10px 5px 10px;',

			idHidden : new Ext.form.Hidden({
						name : 'id',
						value : -1
					}),
			phoneField : new Ext.form.TextField({
						fieldLabel : '电话号码',
						allowBlank : false,
						emptyText : '请填写电话号码',
						blankText : '请填写电话号码',
						regex : /^[0-9]*$/,
						regexText : "只能输入数字",
						maxLength : 100,
						msgTarget : 'side',
						width : 300
					}),
			rangeTypeField : new Ext.form.ComboBox({
						id : 'rangeTypeField_f',
						store : new Ext.data.SimpleStore({
									id : 3,
									fields : ['rangeTypeId', 'rangeTypeName'],
									data : rangeTypeData
								}),
						triggerAction : 'all',
						valueField : 'rangeTypeId',
						displayField : 'rangeTypeName',
						mode : 'local',
						editable : false,
						fieldLabel : '应用范围',
						allowBlank : false,
						emptyText : '请填写应用范围',
						blankText : '请填写应用范围',
						msgTarget : 'side',
						width : 300,
						listeners : {
							select : function(combo, record, index) {
								var id = Ext.getCmp('rangeTypeField_f')
										.getValue();
								var product = Ext.getCmp('productIdField_f');
								var nodeCode = Ext.getCmp('nodeCodeField_f');
								if (id == 1) {
									nodeCode.show();
									product.setValue('');
									product.hide();
								} else if (id == 2) {
									nodeCode.setValue('GD');
									nodeCode.hide();
									product.show();
								}
							}
						}
					}),
			productIdField : new Ext.form.TextField({
						id : 'productIdField_f',
						fieldLabel : '应用业务产品ID',
						allowBlank : true,
						hidden : true,
						emptyText : '请填写应用业务产品ID,多个产品请用":"分隔',
						blankText : '请填写应用业务产品ID',
						msgTarget : 'side',
						width : 300
					}),
			sourceField : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 2,
									fields : ['sourceId', 'sourceName'],
									data : sourceData
								}),
						triggerAction : 'all',
						valueField : 'sourceId',
						displayField : 'sourceName',
						mode : 'local',
						editable : false,
						fieldLabel : '数据来源',
						allowBlank : false,
						emptyText : '请填写数据来源',
						blankText : '请填写数据来源',
						msgTarget : 'side',
						width : 300
					}),
			memoField : new Ext.form.TextField({
						fieldLabel : '备注',
						allowBlank : true,
						emptyText : '请填写备注',
						blankText : '请填写备注',
						msgTarget : 'side',
						width : 300
					}),
			nodeCodeField : new Ext.form.ComboBox({
						id : 'nodeCodeField_f',
						store : new Ext.data.SimpleStore({
									id : 1,
									fields : ['nodeCode', 'nodeName'],
									data : nodeCodeData
								}),
						triggerAction : 'all',
						mode : 'local',
						editable : false,
						valueField : 'nodeCode',
						displayField : 'nodeName',
						fieldLabel : '地市',
						allowBlank : true,
						hidden : true,
						emptyText : '请填写该号码不能订购业务的地市',
						blankText : '请填写地市',
						msgTarget : 'side',
						width : 300
					}),

			commitBtn : new Ext.Button({
						text : '提交',
						iconCls : 'btn-commit'
					}),

			constructor : function(config) {
				this.isEDIT = false;
				config = config || {};
				config.items = config.items || [];
				config.items.push(this.idHidden);
				config.items.push(this.phoneField);
				config.items.push(this.rangeTypeField);
				config.items.push(this.productIdField);
				config.items.push(this.sourceField);
				config.items.push(this.memoField);
				config.items.push(this.nodeCodeField);
				config.buttons = config.buttons || [];
				config.buttons.push(this.commitBtn);
				LBSReader.blacklist.ItemForm.superclass.constructor.apply(this,
						arguments);
			},

			resetForm : function() {
			}
		});

LBSReader.blacklist.ItemDlg = Ext.extend(Ext.Window, {
			title : '新增特殊号码',
			layout : 'fit',
			modal : true,
			width : 500,
			height : 450,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.blacklist.ItemForm({});
				this.configForm.nodeCodeField.setValue('GD');
				config.items.push(this.configForm);
				LBSReader.blacklist.ItemDlg.superclass.constructor.apply(this,
						arguments);
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

var createDlg = new LBSReader.blacklist.ItemDlg({});

blacklistStore = Ext.StoreMgr.get('blacklist');

Ext.QuickTips.init(); // 为组件提供提示信息功能，form的主要提示信息就是客户端验证的错误信息。
Ext.form.Field.prototype.msgTarget = 'side';

LBSReader.blacklist.Blacklist = Ext.extend(Ext.grid.GridPanel, {
	loadMask : {
		msg : '正在加载数据，请稍候...'
	},
	title : '计费特殊号码查询',
	autoScroll : true,
	store : Ext.StoreMgr.get('blacklist'),
	cls : 'box-dataGrid',

	telLabel : new Ext.form.Label({
				text : '电话号码'
			}),

	telText : new Ext.form.TextField({
				fieldLabel : '电话号码',
				id : 'telTextField',
				name : 'tel',
				width : 150
			}),

	refeshBtn : new Ext.Button({
				text : '查询',
				// iconCls : 'btn-search',
				cls : 'btn-search btn-common'
			}),

	addBtn : new Ext.Button({
				text : '新增',
				cls : 'btn-add btn-common'
			}),

	editBtn : new Ext.Button({
				text : '修改',
				cls : 'btn-edit btn-common'
			}),

	deleteBtn : new Ext.Button({
				text : '删除',
				cls : 'btn-delete btn-common'
			}),

	bbar : new Ext.PagingToolbar({
				id : 'blackbar',
				pageSize : 15,
				store : Ext.StoreMgr.get('blacklist'),
				displayInfo : true,
				displayMsg : '第{0} 到 {1} 条数据 共{2}条',
				emptyMsg : "没有数据"
			}),

	constructor : function(config) {
		var config = config || {};
		config.tbar = config.tbar || [];
		var a = LBSReader.common.getPermission('7-1');

		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.telLabel);
		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.telText);
		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.refeshBtn);

		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.addBtn);
		// if (LBSReader.common.isHasPermission(a, 1))
		// config.tbar.push(this.editBtn);
		if (LBSReader.common.isHasPermission(a, 1))
			config.tbar.push(this.deleteBtn);

		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true,
					checkOnly : false
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '编号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'id',
					width : 100,
					hidden : true
				}, {
					header : '电话号码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'tel',
					width : 100
				}, {
					header : '区号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'area_no',
					width : 100
				}, {
					header : '应用范围',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'range_type',
					width : 100
				}, {
					header : '应用业务产品',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'product_id',
					width : 130
				}, {
					header : '数据创建时间',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'create_time',
					width : 100
				}, {
					header : '数据来源',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'source',
					width : 100
				}, {
					header : '备注',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'memo',
					width : 100
				}, {
					header : '应用地市',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'node_code',
					width : 100
				}, {
					header : '操作员',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'admin_name',
					width : 100
				}]);
		LBSReader.admin.DataGrid.superclass.constructor.apply(this, arguments);
		this.on('show', function() {
					this.getStore().load({
								params : {
									start : 0,
									limit : 15
								}
							});
				}, this);
		this.refeshBtn.on('click', function() {
					var tel = Ext.getCmp('telTextField').getValue();
					this.getStore().setBaseParam('tel', tel);
					this.getStore().load({
								params : {
									start : 0,
									limit : 15,
									tel : tel
								}
							});

				}, this);
		this.deleteBtn.on('click', function() {
					var r = this.getSelectionModel().getSelected();
					if (null == r) {
						Ext.MessageBox.alert('提示', '请最少选择一条记录！', null, this);
						return;
					}
					Ext.MessageBox.confirm('提示', '确认要删除所选记录吗？', function(id) {
								if (id == 'yes') {
									this.delItems();
								}
							}, this);
				}, this);
		this.addBtn.on('click', function() {
					if (LBSReader.common.getSession("loginInfo").type == 16) {
						createDlg.configForm.sourceField.setValue(3);
						createDlg.configForm.sourceField.disable();
						var a = LBSReader.common.getSession("loginInfo").nodeCode;
						createDlg.configForm.nodeCodeField.setValue(a);
						createDlg.configForm.nodeCodeField.disable();
					}
					createDlg.show();
				}, this);
		createDlg.configForm.commitBtn.on('click', function() {
					if (createDlg.configForm.getForm().isValid()) {
						var tel = createDlg.configForm.phoneField.getValue();
						var rangeType = createDlg.configForm.rangeTypeField
								.getValue();
						var productId = createDlg.configForm.productIdField
								.getValue();
						var source = createDlg.configForm.sourceField
								.getValue();
						var memo = createDlg.configForm.memoField.getValue();
						var nodeCode = createDlg.configForm.nodeCodeField
								.getValue();
						var areaNo = areaNoData[nodeCode];
						// if(LBSReader.common.getSession("loginInfo").type==16&&source==1){
						// Ext.MessageBox.alert("提示", "地市管理员不能添加省IT黑名单");
						// return;
						// }

						if (tel == "" || rangeType == "" || source == ""
								|| nodeCode == "") {
							Ext.MessageBox.alert("提示", "还有参数没填写");
							createDlg.configForm.phoneField.setValue(tel);
							createDlg.configForm.rangeTypeField
									.setValue(rangeType);
							createDlg.configForm.productIdField
									.setValue(productId);
							createDlg.configForm.sourceField.setValue(source);
							createDlg.configForm.memoField.setValue(memo);
							createDlg.configForm.nodeCodeField
									.setValue(nodeCode);
						} else {
							var req = {
								url : LBSReader.req.BLACK_ADD,
								params : {
									timestamp : new Date().valueOf(),
									tel : tel,
									areaNo : areaNo,
									rangeType : rangeType,
									productId : productId,
									source : source,
									memo : memo,
									nodeCode : nodeCode
								},
								scope : this,
								callback : function(o) {
									if (o.success == "true") {
										Ext.MessageBox.alert('提示', '操作成功!',
												function() {
												}, this);
										createDlg.configForm.phoneField.reset();
										createDlg.configForm.rangeTypeField
												.reset();
										createDlg.configForm.productIdField
												.reset();
										createDlg.configForm.sourceField
												.reset();
										createDlg.configForm.memoField.reset();
										createDlg.configForm.nodeCodeField
												.reset();
									} else {
										Ext.MessageBox.alert('提示', '操作失败!',
												function() {
												}, this);
									}
								}
							}
							var product = Ext.getCmp('productIdField_f');
							var nodeCode = Ext.getCmp('nodeCodeField_f');
							product.hide();
							nodeCode.hide();
							LBSReader.Ajax.send(req);
							createDlg.configForm.resetForm();
							createDlg.hide();
						}

					}
				});
	},
	delItems : function() {
		var rs = this.getSelectionModel().getSelections();
		var ps = [];
		for (var i = 0; i < rs.length; i++) {
			ps.push({
						id : rs[i].data.id
					});
		}
		var req = {
			url : LBSReader.req.BLACK_DEL,
			params : {
				timestamp : new Date().valueOf(),
				data : Ext.encode(ps)
			},
			scope : this,
			callback : function(o) {
				if (o.success == true) {
					Ext.MessageBox.alert('提示', '操作成功！', function() {
							}, this);
				} else {
					Ext.MessageBox.alert('提示', '操作失败！', function() {
							}, this);
				}
			}
		}
		LBSReader.Ajax.send(req);
		// blacklistStore.load({
		// params : {
		// start : 0,
		// limit : 15
		// }
		// });
	}
});

/**
 * @author baiht 2012.1.16
 */
Ext.namespace('LBSReader', 'LBSReader.offerFree');

var freeTypeData = [['0', '按计费号码免单'], ['1', '按套餐代码免单'], ['2', '号码全业务免单']];

LBSReader.offerFree.offerChooseGridDlg = Ext.extend(Ext.Window, {
			title : '报盘话单',
			layout : 'fit',
			modal : true,
			width : 950,
			height : 515,
			closeAction : 'hide',

			configGrid : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configGrid = new LBSReader.offerFree.offerDataGrid({});
				config.items.push(this.configGrid);
				LBSReader.offerFree.offerChooseGridDlg.superclass.constructor
						.apply(this, arguments);

				this.on('show', function() {
							// Ext.MessageBox.alert('提示',
							// this.configGrid.telHidden.getValue(),null, this);
							this.configGrid.searchData();
						}, this);
			},
			setValues : function(tel, busiCode, billCode, sType, accDuration,
					tableIndex) {
				this.configGrid.telHidden.setValue(tel);
				this.configGrid.busiCodeHidden.setValue(busiCode);
				this.configGrid.billCodeHidden.setValue(billCode);
				this.configGrid.sTypeHidden.setValue(sType);
				this.configGrid.accDurationHidden.setValue(accDuration);
				this.configGrid.tableIndexHidden.setValue(tableIndex);
			}
		});

LBSReader.offerFree.offerDataGrid = Ext.extend(Ext.grid.GridPanel, {
			title : '话单报盘',
			autoScroll : true,
			store : Ext.StoreMgr.get('billOffer'),
			cls : 'box-dataGrid',
			busiCodeHidden : new Ext.form.Hidden({
						name : 'busiCode',
						value : ''
					}),
			billCodeHidden : new Ext.form.Hidden({
						name : 'billCode',
						value : ''
					}),
			sTypeHidden : new Ext.form.Hidden({
						name : 'sType',
						value : -1
					}),
			accDurationHidden : new Ext.form.Hidden({
						name : 'accDuration',
						value : ''
					}),
			telHidden : new Ext.form.Hidden({
						name : 'tel',
						value : ''
					}),
			tableIndexHidden : new Ext.form.Hidden({
						name : 'tableIndex',
						value : ''
					}),
			constructor : function(config) {
				config = config || {};
				config.tbar = config.tbar || [];
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config.bbar = this.pagingbar;

				this.cm = new Ext.grid.ColumnModel([{
							header : '流水号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'streamNo',
							width : 100
						}, {
							header : '时间戳',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'timestamp',
							width : 150
						}, {
							header : '接收方用户号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'receiveUserNo',
							width : 100
						}, {
							header : '付费方用户号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'feeUserNo',
							width : 100
						}, {
							header : '付费方付费类型',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'faPayType',
							width : 80,
							renderer : LBSReader.renderer.BILL_OFFER_FA_PAY_TYPE
						}, {
							header : 'sp代码',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'spId',
							width : 80
						}, {
							header : '产品代码',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'productOfferCode',
							width : 80
						}, {
							header : '内容编号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'contentId',
							width : 100
						}, {
							header : '业务能力编码',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'servicecapabiltyId',
							width : 100,
							renderer : LBSReader.renderer.BILL_OFFER_CAPABILTY
						}, {
							header : '开始时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'beginTime',
							width : 150
						}, {
							header : '结束时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'endTime',
							width : 150
						}, {
							header : '使用次数',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'businessTimes',
							width : 50
						}, {
							header : '使用时长',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'duration',
							width : 50
						}, {
							header : '原始文件',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'accessPointName',
							width : 250
						}, {
							header : '信息费',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'infoFee',
							width : 80
						}, {
							header : '通道费',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'channelFee',
							width : 80
						}, {
							header : '总费用',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'fee',
							width : 80
						}, {
							header : '操作状态',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'opStatus',
							width : 80,
							renderer : LBSReader.renderer.BILL_OFFER_OP_STATUS
						}, {
							header : '节点',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'nodeCode',
							width : 80,
							renderer : LBSReader.renderer.CITYlIST
						}, {
							header : '付费类型',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'payType',
							width : 80,
							renderer : LBSReader.renderer.BILL_OFFER_PAY_TYPE
						}, {
							header : '出账日',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'payDay',
							width : 100
						}, {
							header : '账期',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'accDuration',
							width : 100
						}]);
				LBSReader.offerFree.offerDataGrid.superclass.constructor.apply(
						this, arguments);
			},

			searchData : function() {
				this.getStore().baseParams = {
					start : 0,
					size : this.pagingbar.pageSize
				};
				this.getStore().load({
							params : {
								tel : this.telHidden.getValue(),
								tableIndex : this.tableIndexHidden.getValue(),
								accDuration : this.accDurationHidden.getValue(),
								billCode : this.billCodeHidden.getValue(),
								busiCode : this.busiCodeHidden.getValue()
							}
						});
			}

		});

LBSReader.offerFree.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '免单号码查询',
	autoScroll : true,
	store : Ext.StoreMgr.get('offerFree'),
	cls : 'box-dataGrid',
	offerChooseDlg : null,

	createFreeDlg : null,

	telText : new Ext.form.TextField({
				fieldLabel : '电话',
				name : 'tel',
				allowBlank : false,
				emptyText : '请填写查询电话',
				width : 150
			}),

	cityCombo : new Ext.form.ComboBox({
				emptyText : '地市',
				displayField : 'name',
				valueField : 'nodeCode',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : LBSReader.store.CITY_GD,
				width : 80
			}),

	statusCombo : new Ext.form.ComboBox({
				emptyText : '免单状态',
				displayField : 'name',
				valueField : 'id',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : LBSReader.store.COST_FREE_STATUE,
				width : 80
			}),

	accDurationText : new Ext.form.TextField({
				fieldLabel : '帐期',
				name : 'accDuration',
				allowBlank : false,
				emptyText : '请填写帐期',
				width : 100
			}),

	billCodeText : new Ext.form.TextField({
				fieldLabel : '套餐代码',
				name : 'billCode',
				allowBlank : false,
				emptyText : '请填写套餐代码',
				width : 100
			}),

	busiCodeText : new Ext.form.TextField({
				fieldLabel : '计费代码',
				name : 'busiCode',
				allowBlank : false,
				emptyText : '请填写计费代码',
				width : 100
			}),

	taskNoText : new Ext.form.TextField({
				fieldLabel : '批次号',
				name : 'taskNo',
				allowBlank : false,
				emptyText : '请填写批次号',
				width : 100
			}),

	searchBtn : new Ext.Button({
				text : '搜索',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				cls : 'btn-common-wide btn-common'
			}),
	hasFreeBtn : new Ext.Button({
				text : '所选已免话单',
				cls : 'btn-common-wide btn-common'
			}),
	toFreeBtn : new Ext.Button({
				text : '所选将免话单',
				cls : 'btn-common-wide btn-common'
			}),
	addCostFreeBtn : new Ext.Button({
				text : '导入免单',
				cls : 'btn-common-wide btn-common'
			}),
	constructor : function(config) {
		this.offerChooseDlg = new LBSReader.offerFree.offerChooseGridDlg({});
		this.createFreeDlg = new LBSReader.offerFree.ItemDlg({});
		config = config || {};
		config.tbar = config.tbar || [];

		config.tbar.push(new Ext.Panel({
					autoScroll : true,
					autoWidth : true,
					border : false,
					items : [{
						xtype : 'toolbar',
						border : false,
						items : ['电话:', this.telText, '套餐代码：',
								this.billCodeText, '计费代码：', this.busiCodeText,
								'批次号：', this.taskNoText, '地市：', this.cityCombo,
								'帐期：', this.accDurationText, '免单状态：',
								this.statusCombo]
					}, {
						xtype : 'toolbar',
						border : false,
						items : [this.searchBtn, this.resetBtn, '->',
								this.hasFreeBtn, this.toFreeBtn,
								this.addCostFreeBtn]
					}]
				}));

		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true
				});

		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '流水号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'id',
					width : 100
				}, {
					header : '电话号码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'tel',
					width : 100
				}, {
					header : '产品代码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'productSpecCode',
					width : 100
				}, {
					header : '地市',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'nodeCode',
					width : 100,
					renderer : LBSReader.renderer.CITYlIST
				}, {
					header : '帐期',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'accDuration',
					width : 100
				}, {
					header : '计费代码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'busiCode',
					width : 100
				}, {
					header : '套餐代码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'billCode',
					width : 100
				}, {
					header : '业务类型',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'sType',
					width : 100,
					renderer : LBSReader.renderer.BILL_COST_FREE_STYPE
				}, {
					header : '免单状态',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'status',
					width : 100,
					renderer : LBSReader.renderer.BILL_COST_FREE_OP_STATUS
				}, {
					header : '批次号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'taskNo',
					width : 100
				}]);
		LBSReader.offerFree.DataGrid.superclass.constructor.apply(this,
				arguments);

		this.searchBtn.on('click', function() {
					this.searchData();
				}, this);

		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);

		this.addCostFreeBtn.on('click', function() {
					this.createFreeDlg.show();
				}, this);

		this.hasFreeBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelections();
					if (rs.length == 0) {
						Ext.MessageBox.alert('提示', '请选择要查看已免单的记录！', null, this);
						return;
					}
					if (rs[0].data.productSpecCode == 'ALL') {
						this.offerChooseDlg.setValues(rs[0].data.tel, '', '',
								'', rs[0].data.accDuration, '1');
					} else if (rs[0].data.busiCode != '') {
						this.offerChooseDlg.setValues(rs[0].data.tel,
								rs[0].data.busiCode, '', '',
								rs[0].data.accDuration, '1');
					} else {
						this.offerChooseDlg.setValues(rs[0].data.tel, '',
								rs[0].data.billCode, '',
								rs[0].data.accDuration, '1');
					}
					this.offerChooseDlg.show();
				}, this);
		this.toFreeBtn.on('click', function() {
					var rs = this.getSelectionModel().getSelections();
					if (rs.length == 0) {
						Ext.MessageBox.alert('提示', '请选择要查看已免单的记录！', null, this);
						return;
					}
					if (rs[0].data.productSpecCode == 'ALL') {
						this.offerChooseDlg.setValues(rs[0].data.tel, '', '',
								'', rs[0].data.accDuration, '0');
					} else if (rs[0].data.busiCode != '') {
						this.offerChooseDlg.setValues(rs[0].data.tel,
								rs[0].data.busiCode, '', '',
								rs[0].data.accDuration, '0');
					} else {
						this.offerChooseDlg.setValues(rs[0].data.tel, '',
								rs[0].data.billCode, '',
								rs[0].data.accDuration, '0');
					}
					this.offerChooseDlg.show();
				}, this);
	},

	resetAllConditions : function() {
		this.telText.reset();
		this.cityCombo.reset();
		this.accDurationText.reset();
		this.billCodeText.reset();
		this.busiCodeText.reset();
		this.taskNoText.reset();
		this.statusCombo.reset();
	},

	searchData : function() {
		// if(!this.telText.validate()||this.telText.getValue().trim()==''){
		// alert('电话号码不能为空，请填写电话号码！');
		// return;
		// }
		this.getStore().baseParams = {
			start : 0,
			size : this.pagingbar.pageSize,
			tel : this.telText.getValue(),
			billCode : this.billCodeText.getValue(),
			busiCode : this.busiCodeText.getValue(),
			batchNo : this.taskNoText.getValue(),
			nodeCode : this.cityCombo.getValue(),
			accDuration : this.accDurationText.getValue(),
			status : this.statusCombo.getValue()
		};
		this.getStore().load({
					params : {
						tel : this.telText.getValue(),
						billCode : this.billCodeText.getValue(),
						busiCode : this.busiCodeText.getValue(),
						batchNo : this.taskNoText.getValue(),
						nodeCode : this.cityCombo.getValue(),
						accDuration : this.accDurationText.getValue(),
						status : this.statusCombo.getValue()
					}
				});
	}
});

LBSReader.offerFree.ItemDlg = Ext.extend(Ext.Window, {
			title : '导入免单',
			layout : 'fit',
			modal : true,
			width : 550,
			height : 500,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.offerFree.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.task.ItemDlg.superclass.constructor.apply(this,
						arguments);
				this.configForm.cancelBtn.on('click', function() {
							this.configForm.resetForm();
							this.configForm.planDate.setVisible(true);
							this.hide();
						}, this);
			}
		});

LBSReader.offerFree.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 90,
	labelAlign : 'right',
	border : false,
	fileUpload : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',

	accDurationField : new Ext.form.TextField({
				fieldLabel : '帐期',
				allowBlank : false,
				emptyText : '请填写帐期(帐期为年月)',
				blankText : '请填写帐期(帐期为年月)',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),

	freeTypeField : new Ext.form.ComboBox({
				id : 'jobTypeField_f',
				store : new Ext.data.SimpleStore({
							id : 33,
							fields : ['jobTypeId', 'jobTypeName'],
							data : freeTypeData
						}),
				triggerAction : 'all',
				valueField : 'jobTypeId',
				displayField : 'jobTypeName',
				mode : 'local',
				editable : false,
				fieldLabel : '免单类型',
				allowBlank : false,
				emptyText : '请填写免单类型',
				blankText : '请填写免单类型',
				msgTarget : 'side',
				width : 200,
				value : 0
			}),

	memoField : new Ext.form.TextArea({
				fieldLabel : "备注",
				id : "memo_f",
				labelSepartor : "：",
				labelWidth : 60,
				width : 230
			}),

	taskNoField : new Ext.form.TextField({
				fieldLabel : '批次号',
				allowBlank : false,
				emptyText : '请填写批次号',
				blankText : '请填写批次号',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),

	fileSelectField : new Ext.ux.form.FileUploadField({
				id : "fileSelectField_f",
				fieldLabel : '选择文件',
				name : "fileSelectField_n",
				text : '文件名',
				editable : false,
				allowBlank : false,
				emptyText : '选择要上传的excel文件  ->',
				buttonText : '选择文件',
				width : 245,
				height : 24,
				listeners : {
					'fileselected' : function(fb, v) {
						var temp = v.replace(/^.*(\.[^\.\?]*)\??.*$/, '$1');
						var temp1 = temp.toLocaleLowerCase();
						if (allowfiletype.indexOf(temp1) == -1) {
							Ext.Msg.alert("错误", "只能选择excel文件，请重新选择");
							fb.setValue("");
						}
					}
				}
			}),

	cancelBtn : new Ext.Button({
				text : '取消',
				iconCls : 'btn-cancell'
			}),

	commitBtn : new Ext.Button({
				text : '提交',
				iconCls : 'btn-commit'
			}),

	linkField : new Ext.form.Label({
		html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green;">(导入数据一次不要超过10000条)下载模版请点击这里--><a href="attachment/batchAdd_v20120831.xls" target="_blank" class="_custom_link">"批量订购"</a>&nbsp;&nbsp;</br></br></span>'
	}),

	remField : new Ext.form.Label({
		html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green;">(导入数据一次不要超过10000条)下载模版请点击这里--><a href="attachment/batchRemove20120831.xls" target="_blank" class="_custom_link">"批量拆机"</a>&nbsp;&nbsp;</br></br></span>'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		// this.planDate.setVisible(true);
		var jobInfo = {
			xtype : 'fieldset',
			title : '任务详细',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.taskNoField, this.accDurationField,
					this.freeTypeField]
		};
		var tacticInfo = {
			xtype : 'fieldset',
			title : '数据重试策略',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.repeatedField]
		};
		var dataInfo = {
			xtype : 'fieldset',
			title : '数据信息',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.linkField, this.remField, this.fileSelectField,
					this.memoField]
		};
		this.remField.hide();
		config.items.push(jobInfo);
		// config.items.push(tacticInfo);
		config.items.push(dataInfo);
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		config.buttons.push(this.cancelBtn);
		LBSReader.task.ItemForm.superclass.constructor.apply(this, arguments);

		this.freeTypeField.on('select', function() {
					if (this.jobTypeField.getValue() == 0) {
						this.linkField.show();
						this.remField.hide();
					} else {
						this.linkField.hide();
						this.remField.show();
					}
				}, this);
		this.commitBtn.on('click', function() {
					this.addTask();
				}, this);
	},
	resetForm : function() {
		this.getForm().reset();
	},
	addTask : function() {

		if (!this.getForm().isValid()) {
			Ext.MessageBox.alert('提示', '所填选项不能为空！', function() {
					}, this);
			return;
		}
		var filename = this.fileSelectField.getValue();
		if (filename.length == 0) {
			Ext.MessageBox.alert("提示", "您还未选择文件");
			return;
		}
		var params = {
			timestamp : new Date().valueOf(),
			accDuration : this.accDurationField.getValue(),
			freeType : this.freeTypeField.getValue(),
			memo : this.memoField.getValue(),
			taskNo : this.taskNoField.getValue()
		}
		var req = {
			url : LBSReader.req.BILL_COST_FREE_ADD,
			params : params,
			method : 'post',
			scope : this,
			waitMsg : '正在上传文件',
			success : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message,
						function() {
							this.resetForm();
							this.planDate.setVisible(true);
							this.ownerCt.hide();
						}, this);
			},
			fail : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message, null,
						this);
			}
		}

		this.getForm().submit(req);
	}
});
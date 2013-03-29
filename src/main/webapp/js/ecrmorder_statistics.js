/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.ecrmorderstatistics');
LBSReader.ecrmorderstatistics.areaCodeDataGrid = Ext.extend(Ext.grid.GridPanel,
		{
			height : 415,
			autoScroll : true,
			store : Ext.StoreMgr.get('ecrmorder_statistics_count'),
			constructor : function(config) {
				config = config || {};
				var nc = LBSReader.common.getSession("loginInfo").nodeCode;
				this.cm = new Ext.grid.ColumnModel([{
							header : '地市',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'areaCode',
							renderer : LBSReader.renderer.CITYCOBO,
							width : 120
						}, {
							header : '日期',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'dayTime',
							width : 120
						}, {
							header : '拆机数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'countChaiji',
							width : 120
						}, {
							header : '新增数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'countAdd',
							width : 120
						}, {
							header : '净增数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'countPerAdd',
							width : 120
						}, {
							header : '到达数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'countArrive',
							width : 120
						}]);
				LBSReader.ecrmorderstatistics.areaCodeDataGrid.superclass.constructor
						.apply(this, arguments);
			},
			searchCountItems : function(data) {
				this.getStore().baseParams = {
					method : 'search',
					areaCode : data[0],
					start_time : data[1]
				};
				this.getStore().load({
							params : {
								timestamp : new Date().valueOf()
							},
							callback : function(r, o, s) {
							},
							scope : this
						});
			}
		});
LBSReader.ecrmorderstatistics.areaCodeDlg = Ext.extend(Ext.Window, {
	title : '统计信息',
	autoScroll : true,
	modal : true,
	width : 738,
	height : 447,
	constrainHeader : true,
	closeAction : 'hide',
	statisticsCountDataGird : null,
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.statisticsCountDataGird = new LBSReader.ecrmorderstatistics.areaCodeDataGrid(
				{});
		config.items.push([this.statisticsCountDataGird]);
		LBSReader.ecrmorderstatistics.areaCodeDlg.superclass.constructor.apply(
				this, arguments);
	},
	showCount : function(data) {
		this.statisticsCountDataGird.searchCountItems(data);
	}
});
LBSReader.ecrmorderstatistics.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '报表统计',
	autoScroll : true,
	store : Ext.StoreMgr.get('ecrmorder_statistics'),
	cls : 'box-dataGrid',

	productCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '产品名称',
				displayField : 'name',
				valueField : 'id',
				width : 130,
				forceSelection : false,
				displayText : '所有产品',
				store : LBSReader.store.ECRMSUPPRODUCTBYTYPE,
				listeners : {
					"focus" : function() {
						this.getStore().load();
					}
				}
			}),

	statusCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择工单状态',
				displayField : 'name',
				valueField : 'id',
				width : 110,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['-1', '异常'], ['-3', '超时'],
									['0', '处理中'], ['1', '等待中'], ['2', '完成'],
									['3', '结束'], ['4', '等待业务平台回单'],
									['5', '业务平台异常']]
						})
			}),

	srcCombo : new Ext.form.ComboBox({
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '选择工单渠道',
				displayField : 'name',
				valueField : 'id',
				width : 110,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['0', 'CRM'], ['1', 'ISMP-HB']]
						})
			}),
	dbField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '起始日期',
				msgTarget : 'side',
				width : 100
			}),
	cityCombo : new Ext.form.ComboBox({
				emptyText : '地市',
				displayField : 'name',
				valueField : 'areaCode',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : LBSReader.store.CITY_GD,
				width : 90
			}),
	ddField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '截止日期',
				msgTarget : 'side',
				width : 100
			}),
	searchBtn : new Ext.Button({
				text : '搜索',
				cls : 'btn-search btn-common'
			}),
	reportBtn : new Ext.Button({
				text : '导出Excel',
				cls : 'btn-common-wide btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				cls : 'btn-common-wide btn-common'
			}),

	downExportForm : new Ext.Panel({
		html : '<FORM id="toExportForm" target="target_query" action="/ismp?cmd=ecrmOrderReport" method=post>'
				+ '</FORM><iframe width="0" frameborder="no" height="0" scrolling="no" id="target_query" name="target_query"></iframe>',
		hidden : true
	}),

	constructor : function(config) {
		this.areaCodeplg = new LBSReader.ecrmorderstatistics.areaCodeDlg({});
		config = config || {};
		config.tbar = config.tbar || [];
		Ext.override(Ext.menu.DateMenu, {
					autoWidth : function() {
						var el = this.el, ul = this.ul;
						if (!el) {
							return;
						}
						var w = this.width;
						if (w) {
							el.setWidth(w);
						} else if (Ext.isIE && !Ext.isIE6) {
							el.setWidth(this.minWidth);
							var t = el.dom.offsetWidth; // force recalc
							el.setWidth(ul.getWidth() + el.getFrameWidth("lr"));
						}
					}
				});
		var a = LBSReader.common.getPermission('10-3');
		var arr = [];
		if (LBSReader.common.isHasPermission(a, 1)) {
			arr.push(this.searchBtn);
			arr.push(this.resetBtn);
		}
		if (LBSReader.common.isHasPermission(a, 6)) {
			arr.push(this.reportBtn);
		}

		var nc = LBSReader.common.getSession("loginInfo").nodeCode;

		config.tbar.push(new Ext.Panel({
					border : false,
					items : [{
						xtype : 'toolbar',
						border : false,
						items : ['地市：', this.cityCombo, '产品名称：',
								this.productCombo, '工单状态：', this.statusCombo,
								// '工单渠道：', this.srcCombo,
								'起始日期：', this.dbField, '截止日期：', this.ddField,
								this.downExportForm]
					}, {
						xtype : 'toolbar',
						border : false,
						items : [arr]
					}]
				}));
		this.cm = new Ext.grid.ColumnModel([{
					header : '地市',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'areaCode',
					renderer : LBSReader.renderer.CITYCOBO,
					width : 120
				}, {
					header : '产品名称',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'productName',
					width : 120
				}, {
					header : '新增',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'add',
					width : 120
				}, {
					header : '停机',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'stop',
					width : 120
				}, {
					header : '复机',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'override',
					width : 120
				}, {
					header : '更改资料',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'changezl',
					width : 120
				}, {
					header : '拆机',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'chaiji',
					width : 120
				}, {
					header : '净增数',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'countPerAdd',
					width : 120
				}, {
					header : '到达数',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'countArrive',
					width : 120
				}]);
		LBSReader.ecrmorderstatistics.DataGrid.superclass.constructor.apply(
				this, arguments);

		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
		this.reportBtn.on('click', function() {
					this.reportOrder();
				}, this);

	},
	resetAllConditions : function() {
		this.cityCombo.reset();
		this.productCombo.reset();
		this.statusCombo.reset();
		this.srcCombo.reset();
		this.dbField.reset();
		this.ddField.reset();
	},
	reportOrder : function() {
		var allRecords = new Array();
		this.getStore().each(function(record) {
					allRecords.push(record.data);
				});
		allRecords = Ext.encode(allRecords);
		var frm = document.getElementById('toExportForm');
		frm.innerHTML = '<input type="hidden" name="beginDate" value="'
				+ this.dbField.getRawValue() + '" />'
				+ '<input type="hidden" name="endDate" value="'
				+ this.ddField.getRawValue() + '" />'
				+ '<input type="hidden" name="data" id="data" />'
				+ '<input type="hidden" name="timestamp" value="'
				+ new Date().valueOf() + '" />';
		var dataInput = document.getElementById("data");
		dataInput.value = allRecords;
		frm.submit();
	},
	loadItems : function(s, l) {
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf()
					},
					callback : function(r, o, s) {
					},
					scope : this
				});
	},
	searchItems : function(name) {
		var dateValid = LBSReader.customFunctions.dateValid(this.dbField
						.getValue(), this.ddField.getValue());
		if (!dateValid) {
			Ext.MessageBox.alert('搜索条件有误', '创建日期不能在更新日期之后，请修正！', null, this);
			return;
		}
		this.getStore().baseParams = {
			method : 'search',
			areaCode : this.cityCombo.getValue(),
			productId : this.productCombo.getValue(),
			status : this.statusCombo.getValue(),
			source : this.srcCombo.getValue(),
			start_time : this.dbField.getRawValue(),
			over_time : this.ddField.getRawValue()
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf()
					},
					callback : function(r, o, s) {
					},
					scope : this
				});
	},
	countItems : function(name) {
		var arrayObj = new Array();
		if (this.dbField.getRawValue() == '') {
			Ext.MessageBox.alert('统计条件有误', '请选择起始时间', null, this);
			return;
		}
		arrayObj.push(this.cityCombo.getValue());
		arrayObj.push(this.dbField.getRawValue());
		this.areaCodeplg.showCount(arrayObj);
		this.areaCodeplg.show();
	}
});

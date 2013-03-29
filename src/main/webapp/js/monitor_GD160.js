/**
 * @author farago
 */
Ext.namespace('LBSReader', 'LBSReader.monitor_GD160');
LBSReader.monitor_GD160.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '全省联网160',
	autoScroll : true,
	store : Ext.StoreMgr.get('monitor_gd160'),
	cls : 'box-dataGrid',

	dateField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : false,
				emptyText : '选择->',
				msgTarget : 'side',
				width : 100
			}),
	searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置查询条件',
				cls : 'btn-common-wide btn-common'
			}),
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
	},
	htmlTxt : "<span class='note'>说明：该统计在每月1日凌晨6点执行，检查对象为上一个月的数据。请选择相应的日期。</span>",
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		var arr = [];
		arr.push(this.searchBtn);
		arr.push(this.resetBtn);
		config.tbar.push(new Ext.Panel({
					border : false,
					// width : '900',
					items : [{
								xtype : 'toolbar',
								border : false,
								items : ['统计时间：', this.dateField, arr,
										this.htmlTxt]
							}]
				}));
		//
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 20,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		config.bbar = this.pagingbar;
		//
		this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([this.sm, {
					header : '被叫',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'called',
					width : 100
				}, {
					header : '主叫数(原)',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'original_count_tel',
					width : 80
				}, {
					header : '主叫数(后)',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'generated_count_tel',
					width : 80
				}, {
					header : '主叫数差异',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'diff_tel',
					width : 60
				}, {
					header : '话单数(原)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'original_count_file',
					width : 80
				}, {
					header : '话单数(后)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'generated_count_file',
					width : 80
				}, {
					header : '话单数差异',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'diff_file',
					width : 80
				}, {
					header : '费用(原)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'original_sum_fee',
					width : 60
				}, {
					header : '费用(后)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'generated_sum_fee',
					width : 60
				}, {
					header : '费用差异',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'diff_fee',
					width : 80
				}, {
					header : '统计期(起)',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'term_start',
					width : 120
				}, {
					header : '统计期(止)',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'term_end',
					width : 120
					// }, {
				// header : '状态',
				// align : 'left',
				// menuDisabled : true,
				// dataIndex : 'hbPackageCode',
				// width : 120
			}]);
		LBSReader.monitor_GD160.DataGrid.superclass.constructor.apply(this,
				arguments);

		this.searchBtn.on('click', function() {
					if (!this.isValid()) {
						return;
					}
					this.searchItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
	},
	isValid : function() {
		return this.dateField.isValid();
	},
	resetAllConditions : function() {
		this.dateField.reset();
	},
	// loadItems : function(s, l) {
	// this.getStore().load({
	// params : {
	// timestamp : new Date().valueOf(),
	// start : s || 0,
	// limit : l || this.pagingbar.pageSize
	// },
	// callback : function(r, o, s) {
	// },
	// scope : this
	// });
	// },
	searchItems : function(name) {
		this.getStore().baseParams = {
			type : 'GD160',
			record_time : this.dateField.getRawValue()
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {
						// var o = Ext.decode(r.responseText);
						// if (!s) {
						// Ext.MessageBox.alert('提示',
						// o.msg);
						// }else{
						// alert("adalkjfdkjs");
						// }
					},
					scope : this
				});
	}
});

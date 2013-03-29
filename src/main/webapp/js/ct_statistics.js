/**
 * @author chenziping 2012.05.17
 */
Ext.namespace('IsmpHB', 'IsmpHB.statistics');

var nodeCodeData = [['GZ', '广州'], ['SG', '韶关'], ['SZ', '深圳'], ['ZH', '珠海'],
            		['ST', '汕头'], ['FS', '佛山'], ['JM', '江门'], ['ZJ', '湛江'], ['MM', '茂名'],
            		['ZQ', '肇庆'], ['HZ', '惠州'], ['MZ', '梅州'], ['SW', '汕尾'], ['HY', '河源'],
            		['YJ', '阳江'], ['QY', '清远'], ['DG', '东莞'], ['ZS', '中山'], ['CZ', '潮州'],
            		['JY', '揭阳'], ['YF', '云浮'], ['GD', '全省']];

var batchNoData = [['201202', '201202']];
var batchNoComboStore = Ext.StoreMgr.get('ctStatisticsBatchNo_combo');
var productNameComboStore = Ext.StoreMgr.get('ctStatisticsProductName_combo');

IsmpHB.statistics.Ct_Statistics = Ext.extend(Ext.grid.GridPanel, {
	title : '计费信息统计',
	autoScroll : true,
	store : Ext.StoreMgr.get('ctstatistics'),
	cls : 'box-dataGrid',

	nodeCodeLabel : new Ext.form.Label({
		text : '数据归属地'
	}),
	
	nodeCodeField : new Ext.form.ComboBox({
		store : new Ext.data.SimpleStore({
					id : 2,
					fields : ['sourceId', 'sourceName'],
					data : nodeCodeData
				}),
		id : 'nodeCodeField',
		triggerAction : 'all',
		valueField : 'sourceId',
		displayField : 'sourceName',
		mode : 'local',
		fieldLabel : '数据归属地',
		allowBlank : true,
		emptyText : '数据归属地',
		blankText : '数据归属地',
		msgTarget : 'side',
		width : 200
	}),
	
	productNameLabel : new Ext.form.Label({
		text : '号百产品名查询'
	}),
	
	productNameField : new Ext.form.ComboBox({
		store : productNameComboStore,
		id : 'productNameField',
		triggerAction : 'all',
		valueField : 'product_name',
		displayField : 'name',
		mode : 'remote',
		fieldLabel : '号百产品名查询',
		allowBlank : true,
		emptyText : '号百产品名查询',
		blankText : '号百产品名查询',
		msgTarget : 'side',
		width : 200
	}),
	
	startLabel : new Ext.form.Label({
		text:'计费批次'
	}),
	
	batchNo : new Ext.form.ComboBox({
		store : batchNoComboStore,
		id : 'batchNoField',
		triggerAction : 'all',
		valueField : 'batch_no',
		displayField : 'name',
		mode : 'remote',
		fieldLabel : '计费批次',
		allowBlank : true,
		emptyText : '计费批次',
		blankText : '计费批次',
		msgTarget : 'side',
		width : 200
	}),
	
	refeshBtn : new Ext.Button({
		text : '查询',
		// iconCls : 'btn-search',
		cls : 'btn-search btn-common'
	}),

	bbar : new Ext.PagingToolbar({
		id : 'bbar',
		pageSize : 15,
		store : Ext.StoreMgr.get('ctstatistics'),
		displayInfo : true,
		displayMsg : '第{0} 到 {1} 条数据 共{2}条',
		emptyMsg : "没有数据"
	}),

	viewconfig : {
		forcefit : true
	},

	constructor : function(config) {
		var config = config || {};
		config.tbar = config.tbar || [];
		var a = IsmpHB.common.getPermission('8-1');

		if (IsmpHB.common.isHasPermission(a, 1)) 
			config.tbar.push(this.nodeCodeLabel);
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.nodeCodeField);
		if (IsmpHB.common.isHasPermission(a, 1)) 
			config.tbar.push(this.productNameLabel);
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.productNameField);
		if (IsmpHB.common.isHasPermission(a, 1)) 
			config.tbar.push(this.startLabel);
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.batchNo);
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.refeshBtn);

		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			checkOnly : false
		});
		this.cm = new Ext.grid.ColumnModel([
		{
			header : '批号',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'batch_no',
			width : 50
		},
		{
			header : '归属地',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'node_code',
			width : 50
		}, {
			header : '产品编码',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'product_id',
			width : 100
		}, {
			header : '产品名称',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'product_name',
			width : 100
		}, {
			header : '总计',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'ta',
			width : 50
		}, {
			header : '实际用户数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'tta',
			width : 50
		}, {
			header : '状态异常数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'sua',
			width : 50
		}, {
			header : '它网用户数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'onua',
			width : 70
		}, {
			header : '无码号数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'nda',
			width : 50
		}, {
			header : '黑名单数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'bla',
			width : 50
		}, {
			header : '红名单数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'rla',
			width : 50
		}, {
			header : '公免数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'gma',
			width : 50
		}, {
			header : '首月数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'fma',
			width : 50
		}, {
			header : '末月数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'lma',
			width : 50
		}, {
			header : '用户数量（C网预付费）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'prua',
			width : 50
		}, {
			header : '用户数量（C网后付费）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'poua',
			width : 50
		}, {
			header : '用户数量（固网）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'pstnua',
			width : 50
		}, {
			header : '积分用户数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'jfa',
			width : 50
		}, {
			header : '体验用户数量',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'tya',
			width : 50
		}, {
			header : '计费总额',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'feeTT',
			width : 50
		}, {
			header : '计费总额（C网后付费）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'feePOU',
			width : 50
		}, {
			header : '计费总额（C网预付费）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'feePRU',
			width : 50
		}, {
			header : '计费总额（固网）',
			align : 'right',
			menuDisabled : true,
			dataIndex : 'feePstnu',
			width : 50
		}, {
			header : '数据创建时间',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'create_time',
			width : 100
		}, {
			header : '数据更新时间',
			align : 'left',
			menuDisabled : true,
			dataIndex : 'update_time',
			width : 100
		} ]);
		IsmpHB.admin.DataGrid.superclass.constructor.apply(this, arguments);
		this.on('show', function() {
			this.getStore().load({
				params : {
					start : 0,
					limit : 15
				}
			});
		}, this);
		this.refeshBtn.on('click', function() {
			var nodeCode = Ext.getCmp('nodeCodeField').getValue();
			var productName = Ext.getCmp('productNameField').getValue();
			var startDate = Ext.getCmp('batchNoField').getValue();
			this.getStore().setBaseParam('product_name', productName);
			this.getStore().setBaseParam('node_code', nodeCode);
			this.getStore().setBaseParam('start_date', startDate);
			this.getStore().load({
				params : {
					node_code : nodeCode,
					product_name : productName,
					start_date : startDate
				}
			});

		}, this);
	}
});
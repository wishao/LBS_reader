/**
 * @author ggf
 * 2012.11.28
 */
 
 Ext.namespace('IsmpHB', 'IsmpHB.billOffer');
 
IsmpHB.billOffer.DataGrid = Ext.extend(Ext.grid.GridPanel, {
  title : '话单报盘查询',
  autoScroll : true,
  store : Ext.StoreMgr.get('billOffer'),
  cls : 'box-dataGrid',
  
  telText : new Ext.form.TextField({
		fieldLabel : '电话',
		name : 'tel',
		allowBlank : false,
		emptyText : '请填写查询电话',
		width : 150
  }),  
  searchBtn : new Ext.Button({
		text : '搜索',
		cls : 'btn-search btn-common'
	}),
  constructor : function(config) {
  	config = config || {};
	config.tbar = config.tbar || [];
	config.tbar.push('电话:');
	config.tbar.push(this.telText);
	config.tbar.push(this.searchBtn);
  	this.pagingbar = new Ext.PagingToolbar({
		pageSize : 20,
		store : this.getStore(),
		displayInfo : true,
		displayMsg : '当前第{0}项到第{1}项，共{2}项',
		emptyMsg : "没有查询到任何结果！"
	});
	config.bbar = this.pagingbar;
//	this.sm = new Ext.grid.CheckboxSelectionModel({
//			singleSelect : true
//	});
	this.cm = new Ext.grid.ColumnModel([{
		header : '流水号',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'streamNo',
		width : 100
	},{
		header : '时间戳',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'timestamp',
		width : 150
	},{
		header : '接收方用户号',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'receiveUserNo',
		width : 100
	},{
		header : '付费方用户号',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'feeUserNo',
		width : 100
	},{
		header : '付费方付费类型',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'faPayType',
		width : 80,
		renderer : IsmpHB.renderer.BILL_OFFER_FA_PAY_TYPE
	},{
		header : 'sp代码',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'spId',
		width : 80
	},{
		header : '产品代码',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'productOfferCode',
		width : 80
	},{
		header : '内容编号',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'contentId',
		width : 100
	},{
		header : '业务能力编码',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'servicecapabiltyId',
		width : 100,
		renderer : IsmpHB.renderer.BILL_OFFER_CAPABILTY
	},{
		header : '开始时间',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'beginTime',
		width : 150
	},{
		header : '结束时间',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'endTime',
		width : 150
	},{
		header : '使用次数',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'businessTimes',
		width : 50
	},{
		header : '使用时长',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'duration',
		width : 50
	},{
		header : '原始文件',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'accessPointName',
		width : 250
	},{
		header : '信息费',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'infoFee',
		width : 80
	},{
		header : '通道费',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'channelFee',
		width : 80
	},{
		header : '总费用',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'fee',
		width : 80
	},{
		header : '操作状态',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'opStatus',
		width : 80,
		renderer : IsmpHB.renderer.BILL_OFFER_OP_STATUS
	},{
		header : '节点',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'nodeCode',
		width : 80,
		renderer : IsmpHB.renderer.CITYlIST
	}/*,{
		header : '地区代码',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'areaCode',
		width : 200
	}*/,{
		header : '付费类型',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'payType',
		width : 80,
		renderer : IsmpHB.renderer.BILL_OFFER_PAY_TYPE
	},{
		header : '出账日',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'payDay',
		width : 100
	},{
		header : '账期',
		align : 'left',
		menuDisabled : true,
		dataIndex : 'accDuration',
		width : 100
	}]);
  	IsmpHB.billOffer.DataGrid.superclass.constructor.apply(this, arguments);
  	this.searchBtn.on('click',function(){
  		this.searchData();
  	},this);
  },
  searchData : function(){
  	if(!this.telText.validate()||this.telText.getValue().trim()==''){
  		alert('电话号码不能为空，请填写电话号码！');
  		return;
  	}
  	this.getStore().baseParams = {
  		start : 0,
		size : this.pagingbar.pageSize
  	};
  	this.getStore().load({
  		params :{
  			tel : this.telText.getValue()
  		}
  	});  	
  }

});
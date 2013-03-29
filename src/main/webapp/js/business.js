/**
 * @author johnny0086
 */
Ext.namespace('IsmpHB', 'IsmpHB.business');
IsmpHB.business.DataPanel= Ext.extend(Ext.Panel, {
	title : '新增工单',
	autoScroll : true,
	//layout : "fit",
	cls : 'box-dataGrid',
	nameField : new Ext.form.TextField( {
		emptyText : '请填写字符串',
		maxLength : 1000,
		msgTarget : 'side',
		width : 280,
		value : ''
	}),
	searchBtn : new Ext.Button( {
		text : '新增',
		cls : 'btn-search btn-common'
	}),
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push('工单字符串: ');
		config.tbar.push(this.nameField);
		var a = IsmpHB.common.getPermission('10-1');
		if (IsmpHB.common.isHasPermission(a, 2))
			config.tbar.push(this.searchBtn);
		//this.dlg = new IsmpHB.business.ItemDlg( {});
		
	IsmpHB.business.DataPanel.superclass.constructor.apply(this, arguments);
	this.searchBtn.on('click', function() {
		this.searchItems();
	}, this);
},
searchItems : function() {
	var seachId=this.nameField.getValue();
	  if (seachId!='') {
		  var req = {
			url : IsmpHB.req.BUSINESS,
			params : {
				seachId : seachId
			},
			scope : this,
			callback : function(o) {
				if (o.success) {
					Ext.MessageBox.alert('提示','新增结果：'+ o.message);
				}else{
					Ext.MessageBox.alert('提示', o.message||'失败！');
				}
			}
		};
		IsmpHB.Ajax.send(req);
	
		}
	}
});

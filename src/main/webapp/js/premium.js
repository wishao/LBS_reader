/**
 * @author zzx 2011.07.05
 */
Ext.namespace('IsmpHB', 'IsmpHB.premiumMg');

IsmpHB.premiumMg.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	title : '客户优惠管理',
	autoScroll : true,
	store : Ext.StoreMgr.get('premiumQuery'),// to do
	cls:'box-dataGrid',
	nameField : new Ext.form.TextField({
		emptyText : '请输入移动号码或者固话',
		maxLength : 100,
		msgTarget : 'side',
		width : 180
	}),
	searchBtn : new Ext.Button({
		text : '查询',
		// iconCls : 'btn-search',
		cls : 'btn-search btn-common'
	}),
	premiumType : new Ext.form.ComboBox( {
        editable : false,
        mode : 'local',
        triggerAction : 'all',
        allowBlank : false,
        emptyText : '选择优惠类型',
        displayField : 'name',
        valueField : 'code',
        width : 140,
        store : new Ext.data.ArrayStore( {
            fields : [ 'code', 'name' ],
            data : [ [ '1', '全部' ], [ '2', '订房订票送20元话费' ] ]
        })
    }),

	constructor : function(config) {
		this.pagingbar = new Ext.PagingToolbar({
			pageSize : 100,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		var config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push('电话号码: ');
		config.tbar.push(this.nameField);
		config.tbar.push(this.premiumType);
		this.premiumType.on('collapse', function() {
            if (this.premiumType.getValue()==2) {
                this.store.filterBy(function(record,id){
                    if(record.get('PremiumId')=="ZH0001-002"){
                        return true;
                    }
                });
            }else{
                this.store.clearFilter('PremiumId',true);
                return true;
            }
        }, this);
		var a = IsmpHB.common.getPermission('5-2');
		if(IsmpHB.common.isHasPermission(a,1))
			config.tbar.push(this.searchBtn);
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			checkOnly : true
		});
		this.cm = new Ext.grid.ColumnModel([{
			header : '销售品实例ID',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'InstanceId',
			width : 110
		}, {
			header : '销售品名称',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'PremiumName',
			width : 300
		}, {
			header : '销售品首次竣工日期',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'CreateTime',
			renderer : function renderDescn(value,cellmeta, record, rowIndex,columnIndex, store) {
			     return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8)+" "+value.substring(8,10)+":"+value.substring(10,12)+":"+value.substring(12);
            },
			width : 140
		},{
            header : '销售品首次生效日期',
            align : 'center',
            menuDisabled : true,
            dataIndex : 'StartTime',
            renderer : function renderDescn(value,cellmeta, record, rowIndex,columnIndex, store) {
                 return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8)+" "+value.substring(8,10)+":"+value.substring(10,12)+":"+value.substring(12);
            },
            width : 140
        },{
            header : '销售品首次失效时间',
            align : 'center',
            menuDisabled : true,
            dataIndex : 'EndTime',
            renderer : function renderDescn(value,cellmeta, record, rowIndex,columnIndex, store) {
                return value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8)+" "+value.substring(8,10)+":"+value.substring(10,12)+":"+value.substring(12);
            },
            width : 140
        }, {
            header : '销售品定义编码',
            align : 'center',
            menuDisabled : true,
            dataIndex : 'PremiumId',
            width : 140
        }, {
            header : '客户标识',
            align : 'center',
            menuDisabled : true,
            dataIndex : 'ClientId',
            width : 140
        }
		]);
		IsmpHB.premiumMg.DataGrid.superclass.constructor.apply(this, arguments);
		this.on('show', function() {
			if(this.store.data.length==0){
                this.loadItems();
            }
		}, this);
		this.nameField.on('specialkey', function(field, e) {
			if (e.getKey() == e.ENTER) {
				this.searchBtn.fireEvent('click');
			}
		}, this);
		this.searchBtn.on('click', function() {
			this.searchItems();
		}, this);
	},
	searchItems : function() {
		var searchCondition = this.nameField.getValue().trim();
		if (searchCondition < 1) {
            Ext.Msg.alert('提示', '请输入要查询的电话号码(固话号码请在前面加区号)');
            return;
        }
        var pattern2 = /^[0-9]+$/;
        if (!pattern2.exec(searchCondition)) {
            Ext.Msg.alert('提示', '电话号码不能包含数字以外的字符！');
            return;
        }
        var pattern3 = /^[0-9]{10,12}$/;
        if (!pattern3.exec(searchCondition)) {
            Ext.Msg.alert('提示', '所填写的电话号码长度不符合要求，请检查！(固话号码请在前面加区号)');
            return;
        }
        this.searchBtn.setVisible(false);
        Ext.MessageBox.wait('数据读取中……');  
		this.getStore().baseParams = {
            method : 'searchPremium',
            Tel : searchCondition,
            packageType : '0'
        };
        
        this.getStore().load({
            params : {
                timestamp : new Date().valueOf(),
                start : 0,
                limit : this.pagingbar.pageSize
            },
            callback : function(r, o, s) {
                 Ext.MessageBox.hide();
                 this.searchBtn.setVisible(true);
                 if(r.length==0){
                       Ext.Msg.alert('提示', '该号码没有优惠信息');
                    return ;
                 }
                 if (this.premiumType.getValue()==2) {
	                this.store.filterBy(function(record,id){
	                    if(record.get('PremiumId')=="ZH0001-002"){
	                        return true;
	                    }
		                });
		          }else{
		                this.store.clearFilter('PremiumId',true);
		                return true;
		          }
            },
            scope : this
        });
        this.searchBtn.enable();
	},
	loadItems : function() {
	    if(this.nameField.getValue()){
            this.searchItems();
            return;
        }
        this.getStore().baseParams = {
            method : 'pageList',
            packageType : '0'
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


/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.crmInfo');
LBSReader.crmInfo.DataPanel = Ext.extend(Ext.Panel, {
	title : '客户信息查询',
	autoScroll : true,
	cls : 'box-dataGrid',
	formBox : null,

	telField : new Ext.form.TextField({
				emptyText : '请填写电话号码(固话请加区号)',
				maxLength : 100,
				msgTarget : 'side',
				width : 200,
				allowBlank : false
			}),

	searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	esbSearchBtn : new Ext.Button({
				text : 'ESB查询',
				cls : 'btn-common'
			}),
	resetInfoArea : new Ext.Button({
				text : '清除',
				cls : 'btn-common'
			}),
	updateBtn : new Ext.Button({
				text : '更新入库',
				cls : 'btn-common',
				hidden : true
			}),
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push('电话号码: ');
		config.tbar.push(this.telField);
		var a = LBSReader.common.getPermission('5-1');
		if (LBSReader.common.isHasPermission(a, 1)) {
			config.tbar.push(this.searchBtn);
			config.tbar.push(this.esbSearchBtn);
			config.tbar.push(this.updateBtn);
		}
		config.tbar.push(this.resetInfoArea);

		config.items = config.items || [];
		this.formBox = new Ext.FormPanel({
					border : false,
					labelAlign : 'right',
					labelWidth : 85,
					width : 500,
					waitMsgTarget : true,
					cls : 'form_box_fieldSet',

					items : [new Ext.form.FieldSet({
										title : '基本信息',
										autoHeight : true,
										defaultType : 'textfield',
										items : [{
													fieldLabel : '电话号码',
													id : 'tel',
													name : 'tel',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '姓名',
													id : 'name',
													name : 'name',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '性别',
													id : 'sex',
													name : 'sex',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '出生日期',
													id : 'birthday',
													name : 'birthday',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '证件号码类型',
													id : 'social_id_type',
													name : 'social_id_type',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '证件号码',
													id : 'social_id',
													name : 'social_id',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '登记地址',
													id : 'address',
													name : 'address',
													width : 320,
													disabled : true
												}]
									}), new Ext.form.FieldSet({
										title : '详细信息',
										autoHeight : true,
										defaultType : 'textfield',
										items : [{
													fieldLabel : '终端类型',
													id : 'terminal_id',
													name : 'terminal_id',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '终端类型',
													id : 'yterminal_id',
													name : 'yterminal_id',
													width : 220,
													disabled : true,
													hidden : true
												}, {
													fieldLabel : '客户服务分群',
													id : 'serv_group_type',
													name : 'serv_group_type',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '电信服务编码',
													id : 'serv_nbr',
													name : 'serv_nbr',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '付费类型',
													id : 'payment_id',
													name : 'payment_id',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '付费类型',
													id : 'ypayment_id',
													name : 'ypayment_id',
													width : 220,
													disabled : true,
													hidden : true
												}, {
													fieldLabel : '服务等级',
													id : 'serv_level',
													name : 'serv_level',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '状态',
													id : 'state',
													name : 'state',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '状态',
													id : 'ystate',
													name : 'ystate',
													width : 220,
													disabled : true,
													hidden : true
												}, {
													fieldLabel : '地市',
													id : 'nodeCode',
													name : 'nodeCode',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '地市',
													id : 'ynodeCode',
													name : 'ynodeCode',
													width : 220,
													disabled : true,
													hidden : true
												}, {
													fieldLabel : '区号',
													id : 'area_code',
													name : 'area_code',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '区域',
													id : 'subs_id',
													name : 'subs_id',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '邮编',
													id : 'postcode',
													name : 'postcode',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '创建时间',
													id : 'create_time',
													name : 'create_time',
													width : 220,
													disabled : true
												}, {
													fieldLabel : '更新时间',
													id : 'update_time',
													name : 'update_time',
													width : 220,
													disabled : true
												}]
									})]
				});
		config.items.push(this.formBox);

		LBSReader.crmInfo.DataPanel.superclass.constructor.apply(this,
				arguments);

		this.telField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.esbSearchBtn.on('click', function() {
					this.esbSearchItems();
				}, this);
		this.updateBtn.on('click', function() {
					this.updateToPcrm();
				}, this);
		this.resetInfoArea.on('click', function() {
					this.resetFormBox();
				}, this);
		this.on('hide', function() {
					this.resetFormBox();
				});
	},
	updateToPcrm : function() {
		var fm1 = this.formBox.items.get(0).items;
		var fm2 = this.formBox.items.get(1).items;
		var req = {
			url : LBSReader.req.ESB_BASIS_INFO_QUERY,
			params : {
				timestamp : new Date().valueOf(),
				tel : fm1.get('tel').getValue(),
				name : fm1.get('name').getValue(),
				ypayment_id : fm2.get('ypayment_id').getValue(),
				ystate : fm2.get('ystate').getValue(),
				serv_nbr : fm2.get('serv_nbr').getValue(),
				ynodeCode : fm2.get('ynodeCode').getValue(),
				yterminal_id : fm2.get('yterminal_id').getValue(),
				area_code : fm2.get('area_code').getValue(),
				method : 'add'
			},
			scope : this,
			callback : function(o) {
				if (o.Result_Code != 0) {
					Ext.Msg.alert('提示', '失败' + o.Result_Detail);
				} else {
					this.updateBtn.hide();
					Ext.Msg.alert('提示', "成功");
				}
			}
		};
		LBSReader.Ajax.send(req);
	},
	searchItems : function() {
		this.updateBtn.hide();
		this.resetFormBoxExcel();
		if (this.telField.getValue().trim().length < 1) {
			Ext.Msg.alert('提示', '请输入要查询的电话号码(固话号码请在前面加区号)');
			return;
		}
		var pattern2 = /^[0-9]+$/;
		if (!pattern2.exec(this.telField.getValue().trim())) {
			Ext.Msg.alert('提示', '电话号码不能包含数字以外的字符！');
			return;
		}
		var pattern3 = /^[0-9]{10,12}$/;
		if (!pattern3.exec(this.telField.getValue().trim())) {
			Ext.Msg.alert('提示', '所填写的电话号码长度不符合要求，请检查！(固话号码请在前面加区号)');
			return;
		}
		// if (!this.telField.isValid()) {
		// Ext.Msg.alert('提示', this.telField.regexText);
		// return;
		// }
		var req = {
			url : LBSReader.req.CRM_INFO_QUERY,
			params : {
				timestamp : new Date().valueOf(),
				tel : this.telField.getValue(),
				method : 'query'
			},
			scope : this,
			callback : function(o) {
				if (!o.success) {
					if (o.message = '未知') {
						Ext.Msg.alert('提示', '查询不到该号码的信息，可直接查询ESB得到号码信息');
					} else {
						Ext.Msg.alert('提示', o.message);
					}
				} else {
					var fm1 = this.formBox.items.get(0).items;
					var fm2 = this.formBox.items.get(1).items;
					for (var i = 0; i < fm1.length; i++) {
						fm1.get(i).setDisabled(false);
					}
					for (var i = 0; i < fm2.length; i++) {
						fm2.get(i).setDisabled(false);
					}
					fm1.get('tel').setValue(o.data.tel);
					fm1.get('name').setValue(o.data.name);
					fm1.get('sex').setValue(LBSReader.renderer.SEX(o.data.sex));
					fm1.get('birthday').setValue(o.data.birthday);
					fm1.get('address').setValue(o.data.address);
					fm1.get('social_id_type').setValue(LBSReader.renderer
							.IDENTITY_TYPE(o.data.social_id_type));
					fm1.get('social_id').setValue(o.data.social_id);

					fm2.get('terminal_id').setValue(LBSReader.renderer
							.TERMINAL_TYPE(o.data.terminal_id));
					fm2.get('serv_group_type').setValue(LBSReader.renderer
							.SERV_GROUP_TYPE(o.data.serv_group_type));
					fm2.get('area_code').setValue(o.data.area_code);
					fm2.get('state').setValue(LBSReader.renderer
							.TEL_STATE(o.data.state));
					fm2.get('postcode').setValue(o.data.postcode);
					fm2.get('serv_nbr').setValue(o.data.serv_nbr);
					fm2.get('subs_id').setValue(o.data.subs_id);
					fm2.get('payment_id').setValue(LBSReader.renderer
							.PAY_TYPE_NO_STYLE(o.data.payment_id));
					fm2.get('serv_level').setValue(LBSReader.renderer
							.SERV_LEVEL(o.data.serv_level));
					fm2.get('nodeCode').setValue(LBSReader.renderer
							.CITYlIST(o.data.nodeCode));
					fm2.get('create_time').setValue(LBSReader.common
							.getSmpFormatDateByLong(o.data.create_time));
					fm2.get('update_time').setValue(LBSReader.common
							.getSmpFormatDateByLong(o.data.update_time));
				}
			}
		};
		LBSReader.Ajax.send(req);
	},
	validTel : function(tel) {
		if (tel < 1) {
			Ext.Msg.alert('提示', '请输入要查询的电话号码(固话号码请在前面加区号)');
			return;
		}
		var pattern2 = /^[0-9]+$/;
		if (!pattern2.exec(tel)) {
			Ext.Msg.alert('提示', '电话号码不能包含数字以外的字符！');
			return;
		}
		var pattern3 = /^[0-9]{10,12}$/;
		if (!pattern3.exec(tel)) {
			Ext.Msg.alert('提示', '所填写的电话号码长度不符合要求，请检查！(固话号码请在前面加区号)');
			return;
		}
	},
	esbSearchItems : function() {
		this.validTel(this.telField.getValue().trim());
		this.resetFormBoxExcel();
		var req = {
			url : LBSReader.req.ESB_BASIS_INFO_QUERY,
			params : {
				timestamp : new Date().valueOf(),
				Tel : this.telField.getValue(),
				method : 'query'
			},
			scope : this,
			callback : function(o) {
				if (!o.success) {
					Ext.Msg.alert('提示', '查询不到该号码的信息');
				} else {
					this.updateBtn.show();
					var fm1 = this.formBox.items.get(0).items;
					var fm2 = this.formBox.items.get(1).items;
					for (var i = 0; i < fm1.length; i++) {
						fm1.get(i).setDisabled(false);
					}
					for (var i = 0; i < fm2.length; i++) {
						fm2.get(i).setDisabled(false);
					}
					fm1.get('tel').setValue(this.telField.getValue());
					fm1.get('name').setValue(o.data.name);
					fm2.get('terminal_id').setValue(LBSReader.renderer
							.TERMINAL_TYPE(o.data.terminal_id));
					fm2.get('yterminal_id').setValue(o.data.terminal_id);
					fm2.get('area_code').setValue(o.data.areaCode);
					fm2.get('state').setValue(LBSReader.renderer
							.TEL_STATE(o.data.status));
					fm2.get('ystate').setValue(o.data.status);
					fm2.get('serv_nbr').setValue(o.data.serv_nbr);
					fm2.get('ypayment_id').setValue(o.data.paymentId);
					fm2.get('payment_id').setValue(LBSReader.renderer
							.PAY_TYPE_NO_STYLE(o.data.paymentId));
					fm2.get('nodeCode').setValue(LBSReader.renderer
							.ECRMPRODUCTCITYCOBO(o.data.areaCode));
					fm2.get('create_time').setValue(o.data.createDate);
				}
			}
		};
		LBSReader.Ajax.send(req);
	},
	resetFormBox : function() {
		this.telField.reset();
		var fm1 = this.formBox.items.get(0).items;
		for (var i = 0; i < fm1.length; i++) {
			fm1.get(i).setDisabled(true).reset();
		}
		var fm2 = this.formBox.items.get(1).items;
		for (var i = 0; i < fm2.length; i++) {
			fm2.get(i).setDisabled(true).reset();
		}
	},
	resetFormBoxExcel : function() {
		var fm1 = this.formBox.items.get(0).items;
		for (var i = 0; i < fm1.length; i++) {
			fm1.get(i).setDisabled(true).reset();
		}
		var fm2 = this.formBox.items.get(1).items;
		for (var i = 0; i < fm2.length; i++) {
			fm2.get(i).setDisabled(true).reset();
		}
	}
});

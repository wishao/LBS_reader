/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.ecrmProductAdd');
LBSReader.ecrmProductAdd.DataPanel = Ext.extend(Ext.Panel, {
	title : '挂机体验用户录入',
	autoScroll : true,
	border : false,
	layout : "column",
	bodyStyle : 'padding:5px 0px 0px 5px;background-color:#dfe8f6;',
	cityField : new Ext.form.ComboBox({
				fieldLabel : '地市',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : '请选择地市',
				displayField : 'name',
				valueField : 'id',
				width : 150,
				forceSelection : false,
				store : LBSReader.store.CITY_GD
			}),
	userType : new Ext.form.ComboBox({
				fieldLabel : '用户类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择用户类型",
				displayField : 'name',
				valueField : 'id',
				width : 190,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['', '所有'], ['100001', '住宅用户'],
									['100002', '商业用户'], ['100003', '企业用户'],
									['100004', '单位用户'], ['100005', '军政用户'],
									['100006', '农村住宅'], ['100020', '免费用户'],
									['700001', '商务领航用户'],
									['800001', '号码百事通用户'],
									['900001', '人工代办公话'],
									['900002', 'IC卡电话用户'],
									['900006', '200专用电话用户'],
									['900007', '200IC卡电话用户'],
									['900009', '联名卡专用电话用户'],
									['ADSD01', '住宅用户(ADSD)'],
									['ADSD02', '商业用户(ADSD)'], ['B5', '传呼台'],
									['B6', '分期付款大户'], ['B7', '生产经营性公用电话'],
									['HMBST', '号码百事通用户'], ['J1', '企e通私人用户'],
									['Q0', '局办营业厅电话'], ['Q5', '生产用电话'],
									['QB', '多功能信息公话'], ['QC', '测试电话'],
									['QD', '公务纳费电话'], ['QE', '实业纳费电话']]
						})
			}),
	billingType : new Ext.form.ComboBox({
				fieldLabel : '月租类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择月租类型",
				displayField : 'name',
				valueField : 'id',
				width : 190,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['000000', '无需设定月租(或固定月租)'],
									['1003', '安全快车道月租'], ['1004', '80元包月'],
									['100749', '企业加盟50元/年'],
									['100762', '企业加盟5元/月'],
									['100763', '企业加盟30元/月'],
									['110008', '125元/月(QYZJ)'],
									['110009', '240元/月(QYZJ)'],
									['110010', '660元/月(QYZJ)'],
									['110011', '1000元/月(QYZJ)'],
									['110013', '普通(QYZJ)'],
									['110017', '普通(PPCX)'],
									['110018', '普通(LSBH)'],
									['110044', '普通(SMCX)'],
									['110053', '普通(QYMP)'],
									['110054', '普通(ZLFW)'],
									['110064', '普通(QYGG)'],
									['110086', '460元/月(QYZJ)'],
									['110087', '820元/月(QYZJ)'],
									['110430', '普通用户30元/月'],
									['111113', '宽带从帐号免月租'],
									['111233', '20元/月(CXZJ)'],
									['114041', '360元/年·号'],
									['114XX1', '普通(114)'],
									['11763', '企业名片(60秒100元)'],
									['11776', '企业总机(200元/月)'],
									['11777', '企业总机(125元/月)'],
									['11778', '企业总机(150元/月人工)'],
									['11852', '1800元半年'],
									['11853', '50元/季度(CXZJ)'],
									['5235', '户外-楼宇媒体广告费'],
									['800', 'ADSD个人200包月']]
						})
			}),
	userChar : new Ext.form.ComboBox({
		fieldLabel : '计费属性',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : true,
		emptyText : "请选择计费属性",
		displayField : 'name',
		valueField : 'id',
		width : 190,
		forceSelection : false,
		store : new Ext.data.ArrayStore({
					fields : ['id', 'name'],
					data : [['000002', 'APS按月计'], ['000065', '全交'],
							['JFSX01', '普通'], ['JFSX02', '市场公免'],
							['JFSX03', '公务纳费'], ['JFSX04', '公务测试号'],
							['JFSX05', '公免国内长途话费'], ['JFSX06', '公免本地通话费'],
							['JFSX07', '公免(免基本月租)'], ['JFSX08', '公免国际长途话费'],
							['JFSX10', '网运公免'], ['JFSX11', '公免(体验)'],
							['JFSX15', '局公话免费'], ['JFSX21', '公免限额（120元/月）'],
							['JFSX22', '公免限额（150元/月）'],
							['JFSX23', '公免限额（200元/月）'],
							['JFSX24', '公免限额（300元/月）'], ['JFSX25', '公务纳费(国内)'],
							['JFSX26', '公务纳费(本地)'], ['JFSX27', '公务纳费(国际)'],
							['JFSX28', '公纳限额（120元/月）'],
							['JFSX29', '公纳限额（150元/月）'],
							['JFSX30', '公纳限额（200元/月）'],
							['JFSX31', '一站式受理(本地免费)'],
							['SWQCLY', '普通(商务七彩铃音)'], ['XTQ01', '星图群普通计费(XTQ)']]
				})
	}),
	dls : new Ext.form.TextField({
				fieldLabel : '代理商',
				name : 'dls',
				allowBlank : false,
				emptyText : "请输入代理商",
				invalidText : '代理商不能为空',
				width : 240
			}),
	paymentType : new Ext.form.ComboBox({
				fieldLabel : '付费类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择付费类型",
				displayField : 'name',
				valueField : 'id',
				width : 150,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['001', '后付费'], ['002', '预付费(智能网平台)'],
									['003', '预付费(计费帐务系统)']]
						})
			}),
	dedudType : new Ext.form.ComboBox({
				fieldLabel : '扣费类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择扣费类型",
				displayField : 'name',
				valueField : 'id',
				width : 230,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0000', '不处理'],
									['1001', '限额划扣(含社会信息台和代收费)'],
									['1002', '限额划扣(不含社会台和代收费)'],
									['1003', '限时扣费(每月06~10日)'],
									['1011', '短信银行划扣充值'], ['1012', '自动银行划扣充值']]
						})
			}),
	payClass : new Ext.form.ComboBox({
				fieldLabel : '付费类别',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择付费类别",
				displayField : 'name',
				valueField : 'id',
				width : 110,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['0', '账户缴纳方式'], ['1', '服务代缴费方式'],
									['2', '对端代缴费'], ['3', '省公司代缴'],
									['4', '集团公司代缴'], ['5', '转帐']]
						})
			}),
	cjdxtclx : new Ext.form.ComboBox({
				fieldLabel : '套餐类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择套餐类型",
				displayField : 'name',
				valueField : 'id',
				width : 190,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['3', '3/300条短信/38元'],
									['4', '4/600条短信/68元'],
									['5', '5/800条短信/88元'],
									['6', '6/1600条短信/168元'],
									['7', '7/3600条短信/368元'],
									['8', '8/6800条短信/668元'],
									['9', '3元/月，短信0.15元/条']]
						})
			}),
	cjdxdxlx : new Ext.form.ComboBox({
				fieldLabel : '短信类型',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : true,
				emptyText : "请选择短信类型",
				displayField : 'name',
				valueField : 'id',
				width : 110,
				forceSelection : false,
				store : new Ext.data.ArrayStore({
							fields : ['id', 'name'],
							data : [['1', '来话短信'], ['2', '漏话短信']]
						})
			}),
	msdeptName : new Ext.form.TextField({
				fieldLabel : '客户名称',
				name : 'msdeptName',
				allowBlank : false,
				emptyText : "请输入客户名称",
				invalidText : '客户名称不能为空',
				width : 240
			}),
	msPhone : new Ext.form.TextField({
				fieldLabel : '联系电话',
				name : 'msPhone',
				allowBlank : false,
				emptyText : "请输入联系电话",
				invalidText : '联系电话不能为空',
				width : 240
			}),
	msMan : new Ext.form.TextField({
				fieldLabel : '联系人',
				name : 'msMan',
				allowBlank : false,
				emptyText : "请输入联系人",
				invalidText : '联系人不能为空',
				width : 240
			}),
	gjdx : new Ext.form.TextField({
				fieldLabel : '产品接入号',
				name : 'gjdx',
				allowBlank : false,
				emptyText : "请输入产品接入号",
				invalidText : '产品接入号不能为空',
				width : 240
			}),
	payPhone : new Ext.form.TextField({
				fieldLabel : '付费号码',
				name : 'payPhone',
				allowBlank : false,
				emptyText : "请输入付费号码",
				width : 240
			}),
	beginField : new Ext.form.DateField({
				fieldLabel : '生效时间',
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '生效时间',
				msgTarget : 'side',
				width : 100
			}),
	endField : new Ext.form.DateField({
				fieldLabel : '失效时间',
				format : 'Y-m-d',
				allowBlank : true,
				emptyText : '失效时间',
				msgTarget : 'side',
				width : 100
			}),
	addBtn : new Ext.Button({
				text : '提交',
				cls : 'btn-search btn-common'
			}),
	resetBtn : new Ext.Button({
				text : '重置',
				cls : 'btn-search btn-common'
			}),
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		config.bbar = config.bbar || [];
		config.items.push([{
			columnWidth : .5,
			layout : 'form',
			bodyStyle : 'background-color:#dfe8f6;',
			bodyBorder : false,
			items : [this.cityField, this.userType, this.billingType,
					this.userChar, this.dls, this.paymentType, this.dedudType,
					this.payClass, this.cjdxtclx]
		}, {
			columnWidth : .5,
			layout : 'form',
			bodyStyle : 'background-color:#dfe8f6;',
			bodyBorder : false,
			items : [this.cjdxdxlx, this.msdeptName, this.msPhone, this.msMan,
					this.gjdx, this.payPhone, this.beginField, this.endField]
		}]);
		config.bbar.push(this.addBtn);
		config.bbar.push(this.resetBtn);
		LBSReader.ecrmProductAdd.DataPanel.superclass.constructor.apply(this,
				arguments);
		this.addBtn.on('click', function() {
					this.addItems();
				}, this);
		this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
	},
	isValid : function() {
		return this.cityField.isValid() && this.userType.isValid()
				&& this.billingType.isValid() && this.userChar.isValid()
				&& this.dls.isValid() && this.paymentType.isValid()
				&& this.dedudType.isValid() && this.payClass.isValid()
				&& this.cjdxtclx.isValid() && this.cjdxdxlx.isValid()
				&& this.msdeptName.isValid() && this.msPhone.isValid()
				&& this.msMan.isValid() && this.gjdx.isValid()
				&& this.payPhone.isValid() && this.beginField.isValid()
				&& this.endField.isValid();
	},
	addItems : function() {
		var pattern = /^[0-9]+$/;
		if (!pattern.exec(this.msPhone.getValue().trim())) {
			Ext.Msg.alert('提示', '联系电话不能包含数字以外的字符！');
			return;
		}
		if (!pattern.exec(this.payPhone.getValue().trim())) {
			Ext.Msg.alert('提示', '付费号码不能包含数字以外的字符！');
			return;
		}
		var pattern1 = /^[0-9]{10,12}$/;
		if (!pattern1.exec(this.msPhone.getValue().trim())) {
			Ext.Msg.alert('提示', '所填写的联系电话长度不符合要求，请检查！');
			return;
		}
		if (!pattern1.exec(this.payPhone.getValue().trim())) {
			Ext.Msg.alert('提示', '所填写的付费号码长度不符合要求，请检查！');
			return;
		}
		if (!this.isValid()) {
			return;
		}
		var req = {
			url : LBSReader.req.PRODUCT_MGR,
			params : {
				city : this.cityField.getValue(),
				userType : this.userType.getValue(),
				billingType : this.billingType.getValue(),
				userChar : this.userChar.getValue(),
				dls : this.dls.getValue(),
				paymentType : this.paymentType.getValue(),
				payClass : this.payClass.getValue(),
				cjdxtclx : this.cjdxtclx.getValue(),
				cjdxdxlx : this.cjdxdxlx.getValue(),
				msdeptName : this.msdeptName.getValue(),
				msPhone : this.msPhone.getValue(),
				msMan : this.msMan.getValue(),
				gjdx : this.gjdx.getValue(),
				payPhone : this.payPhone.getValue(),
				beginField : this.beginField.getValue(),
				endField : this.endField.getValue(),
				method : 'add'
			},
			scope : this,
			callback : function(o) {
				if (o.success == 'true') {
					this.resetAllConditions();
					Ext.Msg.show({
								title : '操作提示',
								msg : o.message || '添加成功',
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
	resetAllConditions : function() {
		this.items.each(function(item, index, length) {
					item.items.each(function(o) {
								o.reset();
							}, this);
				}, this);
	}
})
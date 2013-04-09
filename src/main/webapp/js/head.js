Ext.namespace('LBSReader','LBSReader.head');
LBSReader.head.ModPwdForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 70,
	labelAlign : 'right',
	bodyStyle : 'padding:5px 5px 5px 5px;',
	border : false,
	oldpwd : new Ext.form.TextField({
		fieldLabel : '旧密码',
		name : 'pwd',
		allowBlank : false,
		inputType : 'password',
		width : 200
	}),
	pwd : new Ext.form.TextField({
		fieldLabel : '新密码',
		name : 'pwd',
		allowBlank : false,
		inputType : 'password',
		width : 200
	}),
	pwd1 : new Ext.form.TextField({
		fieldLabel : '确认密码',
		name : 'pwd',
		allowBlank : false,
		inputType : 'password',
		width : 200
	}),
	addBtn : new Ext.Button({
		text : '保存',
		type : 'submit',
		minWidth : 70,
		formBind : true
	}),
	resetForm : function(){
		this.pwd.reset();
		this.pwd1.reset();
	},
	constructor : function(config) {
		config.items = this.items||[];
		config.buttons = this.buttons ||[];
		config.items.push(this.oldpwd);
		config.items.push(this.pwd);
		config.items.push(this.pwd1);
		config.buttons.push(this.addBtn);
		LBSReader.head.ModPwdForm.superclass.constructor.apply(this, arguments);
		
		this.addBtn.on('click', function() {
			if(this.pwd.getValue() != this.pwd1.getValue()){
				Ext.MessageBox.alert('提示','两次密码不一致');
				return;
			}
			this.toAdd();
		}, this);
	},
	isvalid : function(){
		return ''==this.pwd.getValue()||null==this.pwd.getValue()||
		''==this.pwd1.getValue()||null==this.pwd1.getValue()||
		''==this.oldpwd.getValue()||null==this.oldpwd.getValue();
	},
	toAdd : function(){
		if(this.isvalid()){
			Ext.MessageBox.alert('提示','密码不能为空');
			return;
		}
		var req = {
			url : LBSReader.req.CHANG_PWD,
			params : {
				name : Ext.decode(LBSReader.common.getSession('loginInfo')).name,
				oldPwd : this.oldpwd.getValue(),
				pwd : this.pwd.getValue()
			},
			scope : this,
			callback : function(o) {
				if (o) {
					this.ownerCt.hide();
					Ext.Msg.show({
						title : '操作提示',
						msg : o.message || '密码修改成功',
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
				} else {
					Ext.Msg.show({
						title : '操作提示',
						msg : o.message || '密码修改失败，请稍后在试',
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			}
		}
		LBSReader.Ajax.send(req);
	}
	
});	

LBSReader.head.modPwdDlg = Ext.extend(Ext.Window, {
	title : "修改密码窗口",
	layout : 'fit',
	modal : true,
	width : 350,
	height : 150,
	constrainHeader : true,
	resizable : false,
	closeAction : 'hide',
	configForm : null,

	constructor : function(config) {
		var config = config || {};
		config.items = this.items || [];
		this.configForm = new LBSReader.head.ModPwdForm({});
		config.items.push(this.configForm);
		LBSReader.head.modPwdDlg.superclass.constructor.apply(this, arguments);
	}
});

LBSReader.head.HeadPanel = Ext.extend(Ext.Panel,{
	region: 'north',
	border: false,
	pwdItem : new Ext.menu.Item({
		text : '修改密码'
	}),
	outItem : new Ext.menu.Item({
		text : '退出'
	}),
	constructor : function(config) {
		var ac = Ext.decode(LBSReader.common.getSession('loginInfo')).name;
		this.html='<div id="h_main">' +
			'<div id="h_left"><img src="./images/logo.png"/></div>' +
			'<div class="top"><span class="welcomeSlogan">尊敬的<strong>'
			+ac
	    	+'</strong>,LBS云阅读管理平台欢迎您!</span></div><div/>';
		this.dlg = new LBSReader.head.modPwdDlg({});
		this.bbar = {
			 cls : 'tbar_style',
			 items :[{
				text : Ext.decode(LBSReader.common.getSession('loginInfo')).name||'未登录',
				menu:[this.pwdItem,this.outItem]
			 },'->','<font style="color:#fff">[ 版本号 ：</font> v',LBSReader.version.number,'<font style="color:#fff">]</font>']
		};
		
		LBSReader.head.HeadPanel.superclass.constructor.apply(this, arguments);
		this.pwdItem.on('click',function(){
			this.dlg.show();
		},this);
		this.outItem.on('click',function(){
			Ext.MessageBox.confirm('提示', '确定要退出重新登录吗？', function(va) {
				if(va=='yes'){
					LBSReader.common.clearSession("loginInfo");
					window.location.reload(true);
				}
			}, this);
		}, this);
			}
});



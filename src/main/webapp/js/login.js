/**
 * @author guoguangfu
 * 2011.07.01
 */
Ext.namespace('IsmpHB', 'IsmpHB.login');

IsmpHB.login.LoginForm = Ext.extend(Ext.form.FormPanel, {
    frame:true,
    width: 300,
    height: 110,
    baseCls : 'bg',
//    unstyled : true,
    labelWidth: 50,
    bodyStyle: 'padding:5px 5px 5px 5px;',
    labelAlign: 'right',
    buttonAlign:"center",
    monitorValid: true,
    constructor: function(){
    
        var config = arguments[0] ||{};
        
        this.account = new Ext.form.TextField({
            fieldLabel: '账 号',
            name: 'account',
            allowBlank: false,
            emptyText: '请输入账号',
            width: 150
        });
        
        this.password = new Ext.form.TextField({
            fieldLabel: '密 码',
            name: 'password',
            allowBlank: false,
            inputType: 'password',
            width: 150
        });
        
        this.btnLogin = new Ext.Button({
            text: '登录(Enter)',
            type: 'submit',
            minWidth: 70,
            formBind: true
        });
        
        this.items = [this.account, this.password];
        
        this.buttons = [this.btnLogin];
        IsmpHB.login.LoginForm.superclass.constructor.apply(this, arguments);
         
//        this.btnLogin.on('click',function(){
//        	this.commit();
//        },this);
        
         this.keys = {
            key: 13,
            scope: this,
            fn: function(){
                if (!this.btnLogin.disabled) 
                    this.btnLogin.fireEvent('click', this);
            }
        };
         
    },
//    commit : function() {
//		if (!this.isValid()) {
//			return;
//		}
//		req = {
//			url : IsmpHB.req.ADMIN_LOGIN,
//			params : {
//				account : this.account.getValue(),
//				password : this.password.getValue()
//			},
//			scope : this,
//			callback : function(o) {
//				this.ownerCt.close();
//				if(o){
//					url = document.URL.split('admin')[0] +'admin';
//					location.href = url+'/main.html';
//				}
//				
//			}
//		}
//		Ext.Ajax.request({
//				url : req.url,
//				params : req.params,
//				method : 'POST',
//				scope : req.scope,
//				disableCaching : false,
//				callback : function(o, s, r) {
//					Ext.getBody().unmask();
//					if (s != false) {
//						try {
//							var o = Ext.decode(r.responseText);
//							if ('true' == o.success || true == o.success) {
//								req.callback.call(req.scope, o);
//							} 
//							if('fail' == o.fail){
//								Ext.Msg.show({
//									title : '登录提示',
//									msg : o.message || '用户不存在或密码不正确',
//									buttons : Ext.Msg.OK,
//									icon : Ext.MessageBox.ERROR
//								});
//								
//							}
//							if('authError'== o.auth){
//									Ext.Msg.show({
//									title : '登录提示',
//									msg : o.message || '你没有权限',
//									buttons : Ext.Msg.OK,
//									icon : Ext.MessageBox.ERROR})
//							}
//							
//						} catch (e) {
//							Ext.Msg.show({
//								title : '数据格式化错误',
//								msg : e.message,
//								buttons : Ext.Msg.OK,
//								icon : Ext.MessageBox.ERROR
//							});
//						}
//					} else {
//						var errormsg = r.responseText || '请求失败！这可能是您没有鉴权该资源！';
//						Ext.Msg.show({
//							title : '请求失败',
//							msg : errormsg,
//							buttons : Ext.Msg.OK,
//							icon : Ext.MessageBox.ERROR
//						});
//					}
//				}
//			});
//	},
	
	isValid:function(){
		return this.account.isValid()&& this.password.isValid();
	},
    
    resetForm: function(){
        this.getForm().reset();
    }
});


IsmpHB.login.LoginWindow = Ext.extend(Ext.Window, {
    width: 310,
    title:"管理员登录入口",
    height: 135,
    resizable: false,
    constrain: true,
    closable:false,
    constrainHeader : true,
    resizable : false,
    layout: 'fit',
    constructor: function(){
        var config = arguments[0] ||
        {};
        
        this.form = new IsmpHB.login.LoginForm({
            border: false
        });
        
        this.items = [this.form];
        
        IsmpHB.login.LoginWindow.superclass.constructor.apply(this, arguments);
    }
});

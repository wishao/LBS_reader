Ext.namespace('LBSReader', 'LBSReader.login');

LBSReader.login.LoginForm = Ext.extend(Ext.form.FormPanel, {
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
            name: 'loginName',
            allowBlank: false,
            emptyText: '请输入账号',
            width: 150
        });
        
        this.password = new Ext.form.TextField({
            fieldLabel: '密 码',
            name: 'loginPassword',
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
        LBSReader.login.LoginForm.superclass.constructor.apply(this, arguments);
         
         this.keys = {
            key: 13,
            scope: this,
            fn: function(){
                if (!this.btnLogin.disabled) 
                    this.btnLogin.fireEvent('click', this);
            }
        };
         
    },
	isValid:function(){
		return this.account.isValid()&& this.password.isValid();
	},
    
    resetForm: function(){
        this.getForm().reset();
    }
});


LBSReader.login.LoginWindow = Ext.extend(Ext.Window, {
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
        
        this.form = new LBSReader.login.LoginForm({
            border: false
        });
        
        this.items = [this.form];
        
        LBSReader.login.LoginWindow.superclass.constructor.apply(this, arguments);
    }
});

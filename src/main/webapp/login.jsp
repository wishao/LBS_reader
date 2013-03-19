<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="resources/css/ext-all.css" />
<script type="text/javascript" src="js/shared/ext-all.js"></script>

<title>JSP Page</title>
</head>
<body>
	<script type="text/javascript">
		Ext.onReady(function() {
			Ext.QuickTips.init();
			var form1 = new Ext.FormPanel({
				renderTo : "panel1",
				width : 500,
				height : 300,
				frame : true,
				title : "ajax提交",
				collapsible : true,
				minButtonWidth : 60,
				labelAlign : "right",
				defaultType : "textfield",
				url : "test1!login",
				items : [ {
					fieldLabel : "用户名",
					id : "txtName",
					name : 'test.id',
					allowBlank : false,
					blankText : "用户名不能为空!"
				}, {
					fieldLabel : "密码",
					allowBlank : false,
					blankText : "密码不能为空!",
					name : 'test.name',
					inputType : 'name'
				}, {
					fieldLabel : "备注"
				} ],
				buttons : [ {
					text : "提交",
					handler : function() {
						if (form1.getForm().isValid()) {
							form1.getForm().submit({
								success : function(from, action) {
									//console.log(action.response.responseText);
									Ext.Msg.alert("返回提示", action.response.responseText);
									//window.location = 'index.jsp';
								},
								failure : function(form, action) {
									Ext.Msg.alert("返回提示", "false");
								}
							});
						}
					}
				}, {
					text : "重置",
					handler : function() {
						form1.getForm().reset();
					}
				} ]
			});
		});
	</script>
	<div id="panel1"></div>
</body>

</html>

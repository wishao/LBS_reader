<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="resources/ext.3.3.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="resources/ext.3.3.1/ext-all.js"></script>
<link rel="stylesheet" type="text/css"
	href="resources/ext.3.3.1/resources/css/ext-all.css" />
<title>JSP Page</title>
</head>
<body>
	<script type="text/javascript">
		Ext
				.onReady(function() {
					Ext.QuickTips.init();
					var form1 = new Ext.FormPanel(
							{
								renderTo : "panel1",
								width : 500,
								height : 300,
								frame : true,
								title : "管理员登陆",
								collapsible : true,
								minButtonWidth : 60,
								labelAlign : "right",
								defaultType : "textfield",
								url : "test1!login",
								items : [ {
									fieldLabel : "用户名",
									id : "txtName",
									name : 'loginName',
									allowBlank : false,
									blankText : "用户名不能为空!"
								}, {
									fieldLabel : "密码",
									allowBlank : false,
									blankText : "密码不能为空!",
									name : 'loginPassword',
									inputType : 'name'
								} ],
								buttons : [
										{
											text : "提交",
											handler : function() {
												if (form1.getForm().isValid()) {
													form1
															.getForm()
															.submit(
																	{
																		success : function(
																				from,
																				action) {
																			//console.log(action.response.responseText);
																			Ext.Msg
																					.alert(
																							"返回提示",
																							action.response.responseText);
																			//window.location = 'index.jsp';
																		},
																		failure : function(
																				form,
																				action) {
																			Ext.Msg
																					.alert(
																							"返回提示",
																							"登陆失败，请 检查用户名与密码");
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

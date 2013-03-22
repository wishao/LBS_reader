<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css" />
<script type="text/javascript" src="../js/shared/ext-all.js"></script>

<title>JSP Page</title>
</head>
<body>
	<script type="text/javascript">
		Ext.onReady(function() {
			var store = new Ext.data.JsonStore({
				url : "test1!select",
				totalProperty : "results",
				root : "list",
				fields : [ {
					name : 'id',
					mapping : 'id'
				}, {
					name : 'name',
					mapping : 'name'
				} ]
			});
			store.load();
			var gird = new Ext.grid.GridPanel({
				renderTo : "hello",
				title : "欢迎登录",
				height : 150,
				width : 300,
				columns : [ {
					header : "编号",
					dateindex : "id"
				}, {
					header : "账号",
					dateindex : "name"
				}],
				store : store,
				autoExpandColumn : 2
			});
		});
	</script>
	<div id="hello"></div>
</body>

</html>

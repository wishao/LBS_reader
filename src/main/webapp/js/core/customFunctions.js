Ext.namespace('LBSReader', 'LBSReader.customFunctions');

LBSReader.customFunctions.unmask_timeout = function() {
	Ext.MessageBox.show({
				title : '提示',
				msg : '请求超时，请稍后重试！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
	Ext.getBody().unmask();
}
//
LBSReader.customFunctions.mask_loading = function(message) {
	var msg = message ? message : '正在加载，请稍侯……';
	Ext.getBody().mask(msg);
}
LBSReader.customFunctions.dateValid = function(d1, d2) {
	if (d1 != '' && d2 != '') {
		return d1 <= d2;
	} else {
		return true;
	}
}

LBSReader.customFunctions.exceptinHandler = function(dp, tp, ac, op, res, arg) {
	if (res) {
		var obj = Ext.decode(res.responseText);
		if (obj.exId == -111) {
			Ext.MessageBox.confirm('提示', obj.exDesc || '操作错误！请重新登录', function(
							va) {
						if (va == 'yes') {
							LBSReader.common.clearSession("loginInfo");
							window.location.reload(true);
						}
					}, this);
		}
	}
}

LBSReader.customFunctions.noRecordHandler = function(store, rds, op) {
	if (store.data) {
		var ob = store.data.getCount();
		if (ob == 0) {
			Ext.MessageBox.alert("提示", "没有记录", null, this);
		}
	}
}
LBSReader.customFunctions.validateBankTrim = function(value) {
	if (value.trim() == "") {
		return false;
	}
}
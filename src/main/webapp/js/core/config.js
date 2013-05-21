/**
 * @author johnny0086
 */
Ext.namespace('LBSReader');

Ext.BLANK_IMAGE_URL = 'resources/ext.3.3.1/resources/images/default/s.gif';

LBSReader.version = {
	number : '1.0.1',
	proName : 'LBSReader'
}

LBSReader.URL = document.URL.slice(0, 7) != 'http://' ? 'http://localhost:8080/LBS-Reader/'
		: document.URL.split('admin')[0] + 'LBS-Reader/';
// LBSReader.URL = 'http://localhost:8080/LBS-Reader/';

LBSReader.req = {
	ADMIN_LOGIN : LBSReader.URL + 'admin!login',
	ADMIN_REMOVE : LBSReader.URL + 'admin!delete',
	ADMIN_ADD : LBSReader.URL + 'admin!add',
	ADMIN_UPDATE : LBSReader.URL + 'admin!update',
	ADMIN_ALL : LBSReader.URL + 'admin!all',
	ADMIN_RESETPASSWORD : LBSReader.URL + 'admin!resetPassword',
	CHANG_PWD : LBSReader.URL + 'admin!changePassword',

	USER_ALL : LBSReader.URL + 'user!all',
	USER_ADD : LBSReader.URL + 'user!add',
	USER_UPDATE : LBSReader.URL + 'user!update',
	USER_REMOVE : LBSReader.URL + 'user!delete',
	USER_RESETPASSWORD : LBSReader.URL + 'user!resetPassword',

	BOOK_ALL : LBSReader.URL + 'book!all',
	BOOK_ADD : LBSReader.URL + 'book!add',
	BOOK_UPDATE : LBSReader.URL + 'book!update',
	BOOK_REMOVE : LBSReader.URL + 'book!delete',

	CONTACT_ALL : LBSReader.URL + 'contact!all',
	CONTACT_ADD : LBSReader.URL + 'contact!add',
	CONTACT_UPDATE : LBSReader.URL + 'contact!update',
	CONTACT_REMOVE : LBSReader.URL + 'contact!delete',

	READER_ALL : LBSReader.URL + 'reader!all',
	READER_ADD : LBSReader.URL + 'reader!add',
	READER_UPDATE : LBSReader.URL + 'reader!update',
	READER_REMOVE : LBSReader.URL + 'reader!delete',
	
	RECORD_ALL : LBSReader.URL + 'record!all',
	RECORD_ADD : LBSReader.URL + 'record!add',
	RECORD_UPDATE : LBSReader.URL + 'record!update',
	RECORD_REMOVE : LBSReader.URL + 'record!delete',

	
};
LBSReader.Ajax = {

	send : function(req, syn) {
		if (syn) {
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			var p = req.params;
			var ua = [];
			for (i in p) {
				ua.push(i + '=' + p[i]);
			}
			conn.open("GET", req.url + '?' + ua.join('&'), false);
			conn.send(null);
			try {
				var r = Ext.decode(conn.responseText);
				return r.success || false;
			} catch (e) {
				return false;
			}
		} else {
			Ext.Ajax.timeout = 30000;// default
			Ext.getBody().mask('正在处理请求,请稍候...', 'x-mask-loading');
			Ext.Ajax.request({
				url : req.url,
				params : req.params,
				method : 'POST',
				scope : req.scope,
				disableCaching : false,
				callback : function(o, s, r) {
					Ext.getBody().unmask();
					if (s != false) {
						try {
							var o = Ext.decode(r.responseText);
							if (o.exId) {
								if (o.exId == '-111') {
									Ext.MessageBox.confirm('提示', o.exDesc
											|| '操作错误！', function(va) {
										if (va == 'yes') {
											LBSReader.common
													.clearSession("loginInfo");
											window.location.reload(true);
										}
									}, this);
									return;
								} else {
									Ext.MessageBox.alert('提示', o.exDesc, null,
											this);
									return;
								}
							}

							if (null != o.success || 'true' == o.success
									|| true == o.success) {
								req.callback.call(req.scope, o);
							} else {
								Ext.Msg.show({
									title : '系统异常',
									msg : o.message || '服务器无响应',
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						} catch (e) {
							Ext.Msg.show({
								title : '数据格式化错误',
								msg : e.message,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.ERROR
							});
						}
					} else {
						var errormsg = r.responseText || '请求失败！这可能是您没有鉴权该资源！';
						Ext.Msg.show({
							title : '请求失败',
							msg : errormsg,
							buttons : Ext.Msg.OK,
							icon : Ext.MessageBox.ERROR
						});
					}
				}
			});
		}
	}
};

/**
 * @author Farago, 17 Aug, 2011
 */
Ext.override(Ext.form.Action.Submit, {
	processResponse : function(response) {
		this.response = response;
		var data = response.responseText;
		// response.responseText = data.replace(/<div(.)*<\/div>/gmi,
		// '');
		this.response = Ext.util.JSON.decode(response.responseText);
		if (!response.responseText) {
			return true;
		}
		this.result = this.handleResponse(response);
		return this.result;
	}
});
/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.store');

var jsonStore_timeout = 6000;// timeout

LBSReader.store.LIMIT = 15;

LBSReader.store.ADMIN = new Ext.data.JsonStore({
	url : LBSReader.req.ADMIN_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'admin',
	root : 'rows',
	fields : [ 'id', 'name', 'role', 'create_time', 'status' ]

});

LBSReader.store.USER = new Ext.data.JsonStore({
	url : LBSReader.req.USER_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'user',
	root : 'rows',
	fields : [ 'id', 'name', 'create_time', 'address', 'signature',
			'update_time', 'status' ]

});

LBSReader.store.BOOK = new Ext.data.JsonStore({
	url : LBSReader.req.BOOK_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'book',
	root : 'rows',
	fields : [ 'id', 'name', 'author', 'content', 'create_time', 'update_time',
			'recommend', 'cover', 'reader', 'focus', 'catalog', 'score',
			'status' ]

});

LBSReader.store.CONTACT = new Ext.data.JsonStore({
	url : LBSReader.req.CONTACT_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'contact',
	root : 'rows',
	fields : [ 'id', 'send_user_id', 'receive_user_id', 'send_user_name',
			'receive_user_name', 'content', 'create_time' ]

});

LBSReader.store.READER = new Ext.data.JsonStore({
	url : LBSReader.req.READER_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'reader',
	root : 'rows',
	fields : [ 'id', 'user_id', 'user_name', 'font', 'background_color',
			'font_color', 'create_time' ]

});

LBSReader.store.RECORD = new Ext.data.JsonStore({
	url : LBSReader.req.RECORD_ALL,
	baseParams : {
		start : 0,
		limit : LBSReader.store.LIMIT
	},
	listeners : {
		'load' : {
			fn : LBSReader.customFunctions.noRecordHandler
		},
		'exception' : {
			fn : LBSReader.customFunctions.exceptinHandler
		},
		'loadexception' : {
			fn : function() {
				LBSReader.customFunctions.unmask_timeout();
			}
		}
	},
	storeId : 'record',
	root : 'rows',
	fields : [ 'id', 'user_id', 'user_name', 'book_id', 'book_name', 'record',
			'evaluation', 'score', 'create_time', 'share' ]

});

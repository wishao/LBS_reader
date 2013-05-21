/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.renderer');

LBSReader.renderer.ADMIN_STATUS = function(value) {
	if (LBSReader.data.ADMIN_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.ADMIN_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.USER_STATUS = function(value) {
	if (LBSReader.data.USER_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.USER_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.BOOK_STATUS = function(value) {
	if (LBSReader.data.BOOK_STATUS.EFFECT == value) {
		return '<font color="green">有效</font>';
	} else if (LBSReader.data.BOOK_STATUS.NOEFFECT == value) {
		return '<font color="red">无效</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.RECORD_SHARE = function(value) {
	if (LBSReader.data.RECORD_SHARE.YES == value) {
		return '<font color="green">分享</font>';
	} else if (LBSReader.data.RECORD_SHARE.NO == value) {
		return '<font color="red">私有</font>';
	} else {
		return '<font color="gray">暂无</font>';
	}
};

LBSReader.renderer.ADMIN_ROLE = function(value) {
	if (value == '1') {
		return '超级管理员';
	} else if (value == '2') {
		return '用户管理员';
	} else if(value == '3'){
		return '书籍管理员';
	}else{
		return '未知';
	}
}
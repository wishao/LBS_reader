/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.batchOrderUser');
LBSReader.batchOrderUser.DataPanel = Ext.extend(Ext.Panel, {
	title : '批量订购管理',
	autoScroll : true,
	// cls : 'box-dataGrid',
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		this.batchOrderUser = new LBSReader.batchOrderUser.FileImportForm({});
		config.tbar.push(this.batchOrderUser);
		config.items = config.items || [];
		config.items.push(new Ext.Panel({
					cls : 'import_instruction',
					html : this.getNotice(),
					border : false
				}));
		LBSReader.crmInfo.DataPanel.superclass.constructor.apply(this,
				arguments);
	},
	getNotice : function() {
		var note_1 = '<div class="notice"><h3>“批量导入新增订购”请注意：</h3><ul><li>1. 批量导入数据每次不能超过<span class="emph">5000</span>条；</li><li>2.“电话号码”：如果<span class="emph">非手机号码</span>，请在前面加上区号；</li><li>3.“产品包名称”：请选择产品包名称；</li><li>4.“有效期开始时间”与“有效期结束时间”：格式均为“xxxx-xx-xx”（年-月-日）或“xxxx/xx/xx”（年/月/日）；</li><li>5.“是否试用”：若是试用，选择“是”，否则选择“否”；</li><li>6.“等级”：目前可直接填写“0”；</li><li>7.“业务属性”：填写所订购产品的属性信息，如“车主通”产品要求填写“身份证号”、“车牌号”及“使用号码”，格式为“产品编码=身份证,车牌号,使用号码”<strong>（注意，“,”为英文半角标点）</strong>。</li></ul></div>';
		var delimiter = '<br/>';
		var note_2 = '<div class="notice"><h3>“批量导入拆机”请注意：</h3><ul><li>1. 批量导入数据每次不能超过<span class="emph">5000</span>条；</li><li>2.“电话号码”只能是数字组成，如果非手机号码，请在前面加上区号；</li><li>3.“产品包名称”：请选择产品包名称；</li></ul></div>';
		return note_1 + delimiter + note_2;
	}
});

LBSReader.batchOrderUser.FileImportForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 100,
	labelAlign : 'right',
	border : false,
	bodyStyle : 'padding:5px 10px 5px 10px;',
	layout : 'table',
	region : 'center',
	fileUpload : true,
	labelField : new Ext.form.Label({
				text : '上传文件：'
			}),
	fileSelectField : new Ext.ux.form.FileUploadField({
				name : "attach",
				emptyText : '选择要上传的excel文件  ->',
				buttonText : '选择文件',
				width : 245,
				height : 24
			}),
	operAdd : new Ext.form.Radio({
				name : 'oper',
				boxLabel : '批量订购',
				checked : true
			}),
	operRmv : new Ext.form.Radio({
				name : 'oper',
				boxLabel : '批量拆机'
			}),
	commitBtn : new Ext.Button({
				text : '导入',
				cls : 'btn-common'
			}),
	linkField : new Ext.form.Label({
		html : '<span>模板下载：<a href="attachment/batchAdd_v20120405.xls" target="_blank" class="_custom_link">"批量订购"</a>&nbsp;&nbsp;</span><span><a href="attachment/batchRemove_v20120416.xls" target="_blank" class="_custom_link">"批量拆机"</a>&nbsp;&nbsp;</span>'
	}),
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		config.items.push(this.labelField);
		config.items.push(this.fileSelectField);
		var a = LBSReader.common.getPermission('2-3');
		var arr = [];
		if (LBSReader.common.isHasPermission(a, 5))
			arr.push(this.operAdd);
		if (LBSReader.common.isHasPermission(a, 13))
			arr.push(this.operRmv);
		config.items.push(new Ext.Panel({
					items : arr,
					border : false
				}));
		config.items.push(this.commitBtn);
		config.items.push(this.linkField);
		LBSReader.batchOrderUser.FileImportForm.superclass.constructor.apply(
				this, arguments);
		this.fileSelectField.on('fileselected', function() {
					var fileName = this.fileSelectField.getValue();
					if (!fileName.match(/.xlsx?$/)) {
						Ext.MessageBox.alert('提示', '只支持导入Excel文件！', this
										.resetFileField(), this);
						return;
					}
				}, this);

		this.commitBtn.on('click', function() {
					var operFlag = this.operAdd.getValue() ? 0 : 1;
					var url;
					if (operFlag == 0) {
						// 批量新增
						url = LBSReader.req.ORDER_USER_FILE_UPLOAD;
					} else {
						// 批量拆机
						url = LBSReader.req.ORDER_USER_FILE_UPLOAD_REMOVE;
					}
					var fileName = this.fileSelectField.getValue();
					if (fileName.length == 0) {
						Ext.MessageBox.alert("提示", '您未选择文件，请先选择要导入的Excel文件！');
						return;
					}
					var pbar = new Ext.ProgressBar({
								text : '正在上传文件：',
								width : 300
							});

					var pWin = new Ext.Window({
								width : 320,
								constrainHeader : true,
								items : [pbar],
								modal : true,
								closable : false
							});
					this.submitForm(url);
				}, this);
	},
	submitForm : function(imprtUrl) {
		this.getForm().submit({
			scope : this,
			waitMsg : '正在上传文件，请等待...',
			waitTitle : '提示',
			method : 'post',
			url : imprtUrl,
			success : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message,
						function() {
							// this.ownerCt.hide();
						}, this);
			},
			failure : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message, null,
						this);
			}
		});
	},
	resetFileField : function() {
		this.fileSelectField.reset();
		this.fileSelectField.focus();
	}
});

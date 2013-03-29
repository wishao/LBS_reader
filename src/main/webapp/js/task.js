Ext.namespace('LBSReader', 'LBSReader.task');

var allowfiletype = ".xls.xlsx";

var statusTypeData = [['0', '未开始'], ['1', '进行中'], ['2', '已完成']];
var resultTypeData = [['0', '成功'], ['1', '进行中'], ['2', '已完成']];
var jobTypeData = [['0', '批量订购'], ['1', '批量拆机']];
var repeatedData = [['0', '0'], ['1', '1'], ['2', '2']];
var levelData = [['0', '紧急'], ['1', '高'], ['2', '中'], ['3', '低']];

var qjobTypeData = [['-1', '所有'], ['0', '批量订购'], ['1', '批量拆机']];
var qlevelData = [['-1', '所有'], ['0', '紧急'], ['1', '高'], ['2', '中'], ['3', '低']];
var qstatusTypeData = [['-1', '所有'], ['0', '导入中'], ['1', '导入完成'],
		['2', '任务启动'], ['3', '进行中'], ['4', '完成'], ['5', '失败']];
var qjobPlanData = [['-1', '所有'], ['0', '定时'], ['1', '立即执行']];
var taskListStatusData = [['-1', '所有'], ['0', '未开始'], ['1', '进行中'],
		['2', '成功'], ['3', '失败']];

global_task_no = -1;

LBSReader.task.ItemForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 90,
	labelAlign : 'right',
	border : false,
	fileUpload : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',

	planDate : new Ext.ux.form.DateTimeField({
				id : 'planDate_f',
				fieldLabel : '计划时间',
				editable : false,
				// format : 'Y-m-d H:i:s',
				format : 'H:i',
				width : 200,
				allowBlank : false
			}),

	jobPlan : new Ext.form.ComboBox({
				fieldLabel : '任务计划',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				displayField : 'name',
				valueField : 'id',
				listWidth : 420,
				width : 200,
				store : LBSReader.store.JOB_PLAN,
				value : 0
			}),

	taskNoField : new Ext.form.TextField({
				fieldLabel : '任务号',
				allowBlank : false,
				emptyText : '请填写任务号',
				blankText : '请填写任务号',
				validator : LBSReader.customFunctions.validateBankTrim,
				invalidText : '不能全为空格',
				maxLength : 100,
				msgTarget : 'side',
				width : 200
			}),

	jobTypeField : new Ext.form.ComboBox({
				id : 'jobTypeField_f',
				store : new Ext.data.SimpleStore({
							id : 33,
							fields : ['jobTypeId', 'jobTypeName'],
							data : jobTypeData
						}),
				triggerAction : 'all',
				valueField : 'jobTypeId',
				displayField : 'jobTypeName',
				mode : 'local',
				editable : false,
				fieldLabel : '任务类型',
				allowBlank : false,
				emptyText : '请填写任务类型',
				blankText : '请填写任务类型',
				msgTarget : 'side',
				width : 200,
				value : 0
			}),

	levelField : new Ext.form.ComboBox({
				id : 'levelData_f',
				store : new Ext.data.SimpleStore({
							id : 33,
							fields : ['levelId', 'levelName'],
							data : levelData
						}),
				triggerAction : 'all',
				valueField : 'levelId',
				displayField : 'levelName',
				mode : 'local',
				editable : false,
				fieldLabel : '任务优先级',
				allowBlank : false,
				emptyText : '请填写任务优先级',
				blankText : '请填写任务优先级',
				msgTarget : 'side',
				width : 200,
				value : 2
			}),

	// endField : new Ext.form.DateField({
	// id : 'endField_f',
	// fieldLabel : '结束时间',
	// editable : false,
	// format : 'Y-m-d H:i:s',
	// width : 200,
	// allowBlank : true
	// }),

	memoField : new Ext.form.TextArea({
				fieldLabel : "备注",
				id : "memo_f",
				labelSepartor : "：",
				labelWidth : 60,
				width : 230
			}),

	repeatedField : new Ext.form.ComboBox({
				id : 'repeatedField_f',
				store : new Ext.data.SimpleStore({
							id : 33,
							fields : ['repeatedId', 'repeatedName'],
							data : repeatedData
						}),
				triggerAction : 'all',
				valueField : 'repeatedId',
				displayField : 'repeatedName',
				mode : 'local',
				editable : true,
				fieldLabel : '重试次数',
				allowBlank : true,
				emptyText : '请填写重试次数',
				blankText : '请填写重试次数',
				msgTarget : 'side',
				width : 200,
				value : 0
			}),

	fileSelectField : new Ext.ux.form.FileUploadField({
				id : "fileSelectField_f",
				fieldLabel : '选择文件',
				name : "fileSelectField_n",
				text : '文件名',
				editable : false,
				allowBlank : false,
				emptyText : '选择要上传的excel文件  ->',
				buttonText : '选择文件',
				width : 245,
				height : 24,
				listeners : {
					'fileselected' : function(fb, v) {
						var temp = v.replace(/^.*(\.[^\.\?]*)\??.*$/, '$1');
						var temp1 = temp.toLocaleLowerCase();
						if (allowfiletype.indexOf(temp1) == -1) {
							Ext.Msg.alert("错误", "只能选择excel文件，请重新选择");
							fb.setValue("");
						}
					}
				}
			}),

	cancelBtn : new Ext.Button({
				text : '取消',
				iconCls : 'btn-cancell'
			}),

	commitBtn : new Ext.Button({
				text : '提交',
				iconCls : 'btn-commit'
			}),

	linkField : new Ext.form.Label({
		html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green;">(导入数据一次不要超过10000条)下载模版请点击这里--><a href="attachment/batchAdd_v20120831.xls" target="_blank" class="_custom_link">"批量订购"</a>&nbsp;&nbsp;</br></br></span>'
	}),

	remField : new Ext.form.Label({
		html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green;">(导入数据一次不要超过10000条)下载模版请点击这里--><a href="attachment/batchRemove20120831.xls" target="_blank" class="_custom_link">"批量拆机"</a>&nbsp;&nbsp;</br></br></span>'
	}),

	constructor : function(config) {
		this.isEDIT = false;
		config = config || {};
		config.items = config.items || [];
		this.planDate.setVisible(true);
		var jobInfo = {
			xtype : 'fieldset',
			title : '任务详细',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.taskNoField, this.jobTypeField, this.levelField,
					this.jobPlan, this.planDate]
		};
		var tacticInfo = {
			xtype : 'fieldset',
			title : '数据重试策略',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.repeatedField]
		};
		var dataInfo = {
			xtype : 'fieldset',
			title : '数据信息',
			collapsible : false,
			border : true,
			autoHeight : true,
			items : [this.linkField, this.remField, this.fileSelectField,
					this.memoField]
		};
		this.remField.hide();
		config.items.push(jobInfo);
		// config.items.push(tacticInfo);
		config.items.push(dataInfo);
		config.buttons = config.buttons || [];
		config.buttons.push(this.commitBtn);
		config.buttons.push(this.cancelBtn);
		LBSReader.task.ItemForm.superclass.constructor.apply(this, arguments);
		this.jobPlan.on('select', function() {
					// console.log('value is:\"'+this.jobPlan.getValue()+'\"');
					if (this.jobPlan.getValue() == 1) {
						this.planDate.setValue(new Date());
						this.planDate.setVisible(false);
						this.levelField.setValue(0);
					} else {
						this.planDate.setVisible(true);
						this.levelField.reset();
					}
				}, this);
		this.jobTypeField.on('select', function() {
					if (this.jobTypeField.getValue() == 0) {
						this.linkField.show();
						this.remField.hide();
					} else {
						this.linkField.hide();
						this.remField.show();
					}
				}, this);
		this.commitBtn.on('click', function() {
					this.addTask();
				}, this);
	},
	resetForm : function() {
		this.getForm().reset();
	},
	addTask : function() {
		if (!this.getForm().isValid()) {
			Ext.MessageBox.alert('提示', '所填选项不能为空！', function() {
					}, this);
			return;
		}
		var filename = this.fileSelectField.getValue();
		if (filename.length == 0) {
			Ext.MessageBox.alert("提示", "您还未选择文件");
			return;
		}
		var params = {
			timestamp : new Date().valueOf(),
			taskNo : this.taskNoField.getValue(),
			taskType : this.jobTypeField.getValue(),
			level : this.levelField.getValue(),
			planType : this.jobPlan.getValue(),
			startTime : this.planDate.getValue().format('Y-m-d H:i:s'),
			repeatedTime : this.repeatedField.getValue(),
			memo : this.memoField.getValue()
		}
		var req = {
			url : LBSReader.req.TASK_ADD,
			params : params,
			method : 'post',
			scope : this,
			waitMsg : '正在上传文件',
			success : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message,
						function() {
							this.resetForm();
							this.planDate.setVisible(true);
							this.ownerCt.hide();
						}, this);
			},
			fail : function(form, o) {
				Ext.MessageBox.alert('Excel文件处理结果', o.result.message, null,
						this);
			}
		}
		this.getForm().submit(req);
	}
});

LBSReader.task.ItemDlg = Ext.extend(Ext.Window, {
			title : '新增任务',
			layout : 'fit',
			modal : true,
			width : 550,
			height : 500,
			constrainHeader : true,
			closeAction : 'hide',

			configForm : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.configForm = new LBSReader.task.ItemForm({});
				config.items.push(this.configForm);
				LBSReader.task.ItemDlg.superclass.constructor.apply(this,
						arguments);
				this.configForm.cancelBtn.on('click', function() {
							this.configForm.resetForm();
							this.configForm.planDate.setVisible(true);
							this.hide();
						}, this);
			}
		});

// Ext.QuickTips.init(); // 为组件提供提示信息功能，form的主要提示信息就是客户端验证的错误信息。
// Ext.form.Field.prototype.msgTarget = 'side';

LBSReader.task.TaskList = Ext.extend(Ext.grid.GridPanel, {
	autoScroll : true,
	store : Ext.StoreMgr.get('task_list_Id'),
	cls : 'box-dataGrid',

	idHidden : new Ext.form.Hidden({
				name : 'task_id',
				value : -1
			}),
	statusHidden : new Ext.form.Hidden({
				name : 'task_status',
				value : -1
			}),

	totalNumField : new Ext.form.TextField({
				fieldLabel : '任务数据总量',
				name : 'totalNum',
				disabled : true,
				width : 150
			}),
	finishNumField : new Ext.form.TextField({
				fieldLabel : '已处理数据',
				name : 'finishNum',
				disabled : true,
				width : 150
			}),
	sucessNumField : new Ext.form.TextField({
				fieldLabel : '成功数据总量',
				name : 'sucessNum',
				disabled : true,
				width : 150
			}),
	failNumField : new Ext.form.TextField({
				fieldLabel : '失败数据总量',
				name : 'failNum',
				disabled : true,
				width : 150
			}),
	statusCob : new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							id : 33,
							fields : ['statusId', 'statusName'],
							data : taskListStatusData
						}),
				triggerAction : 'all',
				valueField : 'statusId',
				displayField : 'statusName',
				mode : 'local',
				editable : true,
				width : 150,
				value : -1
			}),
	downExportForm : new Ext.Panel({
		html : '<FORM id="toExportForm" target="target_query" action="/ismp?cmd=taskListOutput" method=post></FORM><iframe width="0" frameborder="no" height="0" scrolling="no" id="target_query" name="target_query"></iframe>',
		hidden : true
	}),
	impSucBtn : new Ext.Button({
				text : '导出',
				iconCls : 'btn-search'
			}),
	impFailBtn : new Ext.Button({
				text : '导出',
				iconCls : 'btn-search'
			}),
	searchBtn : new Ext.Button({
				text : '查询',
				iconCls : 'btn-common'
			}),

	constructor : function(config) {
		config = config || {};
		// config.items = config.items||[];
		config.tbar = config.tbar || [];
		config.bbar = config.bbar || [];
		this.pagingbar = new Ext.PagingToolbar({
					pageSize : 15,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
		// this.setBtnVisible(this.statusHidden.getValue());
		config.bbar = this.pagingbar;
		var itemsPanel = new Ext.Panel({
			border : false,
			items : [{
						xtype : 'toolbar',
						border : false,
						items : ['数据总量：', this.totalNumField/*
															 * , '已处理：',
															 * this.finishNumField
															 */]
					}, {
						xtype : 'toolbar',
						border : false,
						items : ['成功数据总量：', this.sucessNumField,
								this.impSucBtn, this.downExportForm]
					}, {
						xtype : 'toolbar',
						border : false,
						items : ['失败数据总量：', this.failNumField, this.impFailBtn]
					}, {
						xtype : 'toolbar',
						border : false,
						items : ['查询数据工具栏，状态值:', this.statusCob, this.searchBtn]
					}]
		});
		config.tbar = itemsPanel;

		this.cm = new Ext.grid.ColumnModel([{
					header : 'ID',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'id',
					width : 100
				}, {
					header : '任务编号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'task_no',
					width : 100
				}, {
					header : '处理状态',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'status',
					width : 100,
					renderer : LBSReader.renderer.TASKLIST_STATUS
				}, {
					header : '处理结果',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'result_code',
					width : 100
				}, {
					header : '处理结果备注',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'result_memo',
					width : 100
				}, {
					header : '电话号码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'tel',
					width : 100
				}, {
					header : '用户名',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'name',
					width : 100
				}, {
					header : '产品包名称',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'package_name',
					width : 100
				}, {
					header : '数据创建时间',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'create_time',
					width : 100
				}, {
					header : '数据更新时间',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'update_time',
					width : 100
				}, {
					header : '操作者名字',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'operator_name',
					width : 100
				}, {
					header : '操作者帐号',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'operator_account',
					width : 100
				}, {
					header : '启用时间',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'start_time',
					width : 100
				}, {
					header : '结束时间',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'end_time',
					width : 100
				}, {
					header : '业务属性',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'attr',
					width : 100
				}, {
					header : '备注',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'memo',
					width : 100
				}]);
		LBSReader.task.TaskList.superclass.constructor.apply(this, arguments);
		this.impSucBtn.on('click', function() {
					this.exportData(1);
				}, this);
		this.impFailBtn.on('click', function() {
					this.exportData(0);
				}, this);
		this.searchBtn.on('click', function() {
					this.queryTaskList();
				}, this);
	},
	queryTaskList : function() {
		this.getStore().baseParams = {
			start : 0,
			status : this.statusCob.getValue(),
			size : 15,
			task_id : this.idHidden.getValue()
		};
		this.getStore().load({
					params : {
						start : 0,
						status : this.statusCob.getValue(),
						limit : this.pagingbar.pageSize,
						task_id : this.idHidden.getValue()
					}
				});
	},
	setIdValue : function(value) {
		this.idHidden.setValue(value);
	},
	setBtnVisible : function(value) {
		if (value == LBSReader.data.TASK_STATUS.FINISH) {
			this.impSucBtn.show();
			this.impFailBtn.show();

		} else {
			this.impSucBtn.hide();
			this.impFailBtn.hide();
		}
	},
	setRecordValue : function(obj) {
		this.totalNumField.setValue(obj.ta);
		this.sucessNumField.setValue(obj.tsa);
		this.failNumField.setValue(obj.tea);
		this.statusHidden.setValue(obj.status);
		// this.finishNumField.setValue();

	},
	exportData : function(value) {
		if (this.statusHidden.getValue() != LBSReader.data.TASK_STATUS.FINISH) {
			Ext.MessageBox.alert('Excel文件导出提示', '任务未完成，不允许导出！', null, this);
			return;
		}
		var frm = document.getElementById('toExportForm');
		frm.innerHTML = '<input type="hidden" name="task_id" value="'
				+ this.idHidden.getValue() + '" />'
				+ '<input type="hidden" name="templateId" value="' + value
				+ '" />' + '<input type="hidden" name="timestamp" value="'
				+ new Date().valueOf() + '" />';
		frm.submit();
	}

});
LBSReader.task.TaskListWin = Ext.extend(Ext.Window, {
			title : '任务详情',
			layout : 'fit',
			modal : true,
			maximizable : true,
			width : 850,
			height : 550,
			constrainHeader : true,
			closeAction : 'hide',
			gridPanel : null,

			constructor : function(config) {
				config = config || {};
				config.items = config.items || [];
				this.gridPanel = new LBSReader.task.TaskList({});
				config.items.push(this.gridPanel);
				LBSReader.task.TaskListWin.superclass.constructor.apply(this,
						arguments);
				this.on('show', function() {
							this.gridPanel.queryTaskList();
						}, this);
			}
		});

LBSReader.task.Task = Ext.extend(Ext.grid.GridPanel, {
			// loadMask : {
			// msg : '正在加载数据，请稍候...'
			// },
			title : '任务导入',
			autoScroll : true,
			store : Ext.StoreMgr.get('taskId'),
			cls : 'box-dataGrid',

			taskNoField : new Ext.form.TextField({
						fieldLabel : '任务编号',
						name : 'taskNo',
						width : 150
					}),
			jobTypeField : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 33,
									fields : ['jobTypeId', 'jobTypeName'],
									data : qjobTypeData
								}),
						triggerAction : 'all',
						valueField : 'jobTypeId',
						displayField : 'jobTypeName',
						mode : 'local',
						editable : false,
						width : 200,
						value : -1
					}),
			taskLevelCob : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 33,
									fields : ['id', 'name'],
									data : qlevelData
								}),
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'name',
						mode : 'local',
						editable : true,
						fieldLabel : '任务等级',
						width : 150,
						value : -1
					}),
			taskPlanCob : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 33,
									fields : ['id', 'name'],
									data : qjobPlanData
								}),
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'name',
						mode : 'local',
						editable : true,
						fieldLabel : '任务计划',
						width : 150,
						value : -1
					}),

			statusField : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 33,
									fields : ['statusTypeId', 'statusTypeName'],
									data : qstatusTypeData
								}),
						triggerAction : 'all',
						valueField : 'statusTypeId',
						displayField : 'statusTypeName',
						mode : 'local',
						editable : true,
						width : 150,
						value : -1
					}),

			resultField : new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									id : 4,
									fields : ['resultTypeId', 'resultTypeName'],
									data : resultTypeData
								}),
						triggerAction : 'all',
						valueField : 'resultTypeId',
						displayField : 'resultTypeName',
						mode : 'local',
						width : 150,
						value : -1
					}),

			startTimeField : new Ext.form.DateField({
						fieldLabel : '开始时间',
						format : 'Y-m-d',
						width : 150,
						allowBlank : true
					}),

			operatorText : new Ext.form.TextField({
						fieldLabel : '创建者',
						id : 'operatorTextField_f',
						name : 'operatorAccount',
						width : 150
					}),

			refeshBtn : new Ext.Button({
						text : '查询',
						// iconCls : 'btn-search',
						cls : 'btn-search btn-common'
					}),

			addBtn : new Ext.Button({
						text : '新增任务',
						cls : 'btn-add btn-common'
					}),

			checkBtn : new Ext.Button({
						text : '任务详情',
						cls : 'btn-check btn-common'
					}),

			deleteBtn : new Ext.Button({
						text : '删除任务',
						cls : 'btn-delete btn-common'
					}),

			// bbar : new Ext.PagingToolbar({
			// pageSize : 15,
			// store : this.store,
			// displayInfo : true,
			// displayMsg : '第{0} 到 {1} 条数据 共{2}条',
			// emptyMsg : "没有数据"
			// }),

			constructor : function(config) {
				var config = config || {};
				config.tbar = config.tbar || [];
				config.bbar = config.bbar || [];
				// config.items = config.items || [];
				this.createTaskDlg = new LBSReader.task.ItemDlg({});
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 15,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config.bbar = this.pagingbar;
				var a = LBSReader.common.getPermission('2-4');
				var arr = ['执行时间:', this.startTimeField, '创建者:',
						this.operatorText, '->'];
				if (LBSReader.common.isHasPermission(a, 1)) {
					arr.push(this.refeshBtn);
				}
				if (LBSReader.common.isHasPermission(a, 2)) {
					arr.push(this.addBtn);
				}
				if (LBSReader.common.isHasPermission(a, 15)) {
					arr.push(this.checkBtn);
				}
				var itemPanel = new Ext.Panel({
							border : false,
							items : [{
								xtype : 'toolbar',
								border : false,
								items : ['任务编号:', this.taskNoField, '任务类型:',
										this.jobTypeField, '任务等级:',
										this.taskLevelCob, '任务计划:',
										this.taskPlanCob, '状态:',
										this.statusField]
							}, {
								xtype : 'toolbar',
								border : false,
								items : arr
							}]
						});
				config.tbar.push(itemPanel);

				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true,
							checkOnly : false
						});
				this.cm = new Ext.grid.ColumnModel([this.sm, {
							header : '任务号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'task_no',
							width : 100
						}, {
							header : '处理状态',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'status',
							width : 100,
							renderer : LBSReader.renderer.TASK_STATUS
						}, {
							header : '任务计划',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'task_plan',
							width : 80,
							renderer : LBSReader.renderer.TASK_PLAN
						}, {
							header : '任务类型',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'task_type',
							width : 80,
							renderer : LBSReader.renderer.TASK_TYPE
						}, {
							header : '任务优先级',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'level',
							width : 80,
							renderer : LBSReader.renderer.TASK_LEVEL
						}, {
							header : '任务总量',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'ta',
							width : 100
						}, {
							header : '成功数量',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'tsa',
							width : 100
						}, {
							header : '异常数量',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'tea',
							width : 100
						}, {
							header : '开始时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'start_time',
							width : 100
						}, {
							header : '创建时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'create_time',
							width : 100
						}, {
							header : '结束时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'end_time',
							width : 100
						}/*
							 * , { header : '任务重试次数', align : 'left',
							 * menuDisabled : true, dataIndex : 'retry_no',
							 * width : 100 }
							 */, {
							header : '更新时间',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'update_time',
							width : 100
						}, {
							header : '创建者',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'operator_name',
							width : 100
						}, {
							header : '创建者帐号',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'operator_account',
							width : 100
						}, {
							header : '任务备注',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'memo',
							width : 100
						}]);
				LBSReader.task.Task.superclass.constructor.apply(this,
						arguments);

				this.refeshBtn.on('click', function() {
							var timevalue = null;
							if (this.startTimeField.getValue()) {
								timevalue = this.startTimeField.getValue()
										.format(Date.patterns.ISO8601Short)
							}
							this.getStore().baseParams = {
								start : 0,
								limit : this.pagingbar.pageSize,
								task_type : this.jobTypeField.getValue(),
								task_no : this.taskNoField.getValue(),
								task_level : this.taskLevelCob.getValue(),
								task_plan : this.taskPlanCob.getValue(),
								status : this.statusField.getValue(),
								start_time : timevalue,
								operator_name : this.operatorText.getValue()
										|| null
							};
							this.getStore().load({
								params : {
									start : 0,
									limit : this.pagingbar.pageSize,
									task_type : this.jobTypeField.getValue(),
									task_no : this.taskNoField.getValue(),
									task_level : this.taskLevelCob.getValue(),
									task_plan : this.taskPlanCob.getValue(),
									status : this.statusField.getValue(),
									// result_code : resultField,
									start_time : timevalue,
									operator_name : this.operatorText
											.getValue()
											|| null
								}
							});

						}, this);
				this.checkBtn.on('click', function() {
							var r = this.getSelectionModel().getSelected();
							if (null == r) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							var win = new LBSReader.task.TaskListWin({});
							win.gridPanel.setIdValue(r.data.id);
							win.gridPanel.setRecordValue(r.data);
							win.show();
						}, this);
				this.deleteBtn.on('click', function() {
							var r = this.getSelectionModel().getSelected();
							if (null == r) {
								Ext.MessageBox.alert('提示', '请最少选择一条记录！', null,
										this);
								return;
							}
							Ext.MessageBox.confirm('提示', '确认要删除所选记录吗？',
									function(id) {
										if (id == 'yes') {
											this.delItems();
										}
									}, this);
						}, this);
				this.addBtn.on('click', function() {
							this.createTaskDlg.show();
						}, this);
			},

			delItems : function() {
				var rs = this.getSelectionModel().getSelections();
				var ps = [];
				for (var i = 0; i < rs.length; i++) {
					ps.push({
								task_no : rs[i].data.task_no
							});
				}
				var req = {
					url : LBSReader.req.TASK_DEL,
					params : {
						timestamp : new Date().valueOf(),
						data : Ext.encode(ps)
					},
					scope : this,
					callback : function(o) {
						Ext.MessageBox.alert('提示', '操作完成！', function() {
								}, this);
						this.getStore().load({
									params : {
										start : 0,
										limit : 15,
										status : '',
										result_code : '',
										start_time : '',
										operator_name : ''
									}
								});
					}
				}
				LBSReader.Ajax.send(req);
			}
		});

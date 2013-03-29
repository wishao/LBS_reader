/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.business');
LBSReader.business.DataPanel = Ext.extend(Ext.Panel, {
			title : '新增工单',
			autoScroll : true,
			// layout : "fit",
			cls : 'box-dataGrid',
			nameField : new Ext.form.TextField({
						emptyText : '请填写字符串',
						maxLength : 1000,
						msgTarget : 'side',
						width : 280,
						value : ''
					}),
			searchBtn : new Ext.Button({
						text : '新增',
						cls : 'btn-search btn-common'
					}),
			constructor : function(config) {
				config = config || {};
				config.tbar = config.tbar || [];
				config.tbar.push('工单字符串: ');
				config.tbar.push(this.nameField);
				var a = LBSReader.common.getPermission('10-1');
				if (LBSReader.common.isHasPermission(a, 2))
					config.tbar.push(this.searchBtn);
				// this.dlg = new LBSReader.business.ItemDlg( {});

				LBSReader.business.DataPanel.superclass.constructor.apply(this,
						arguments);
				this.searchBtn.on('click', function() {
							this.searchItems();
						}, this);
			},
			searchItems : function() {
				var seachId = this.nameField.getValue();
				if (seachId != '') {
					var req = {
						url : LBSReader.req.BUSINESS,
						params : {
							seachId : seachId
						},
						scope : this,
						callback : function(o) {
							if (o.success) {
								Ext.MessageBox.alert('提示', '新增结果：' + o.message);
							} else {
								Ext.MessageBox.alert('提示', o.message || '失败！');
							}
						}
					};
					LBSReader.Ajax.send(req);

				}
			}
		});

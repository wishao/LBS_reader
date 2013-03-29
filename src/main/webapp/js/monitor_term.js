/**
 * @author farago
 */
Ext.namespace('IsmpHB', 'IsmpHB.monitor_term');
IsmpHB.monitor_term.DataGrid = Ext.extend(Ext.grid.GridPanel,
		{
			title : '周/月环比',
			autoScroll : true,
			store : Ext.StoreMgr.get('monitor_term'),
			cls : 'box-dataGrid',

			dateField : new Ext.form.DateField({
				format : 'Y-m-d',
				allowBlank : false,
				emptyText : '选择->',
				msgTarget : 'side',
				width : 100
			}),
			periodField_w : new Ext.form.Radio({
				name : 'period',
				boxLabel : '周',
				checked : true
			}),
			periodField_m : new Ext.form.Radio({
				name : 'period',
				boxLabel : '月'
			}),
			cityCombo : new Ext.form.ComboBox({
				emptyText : '选择->',
				displayField : 'name',
				valueField : 'nodeCode',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : IsmpHB.store.CITY_GUANGDONG,
				width : 70,
				allowBlank : false
			}),
			searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
			resetBtn : new Ext.Button({
				text : '重置查询条件',
				cls : 'btn-common-wide btn-common'
			}),
			cmRenderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) {
			},
			htmlTxt : "<span class='note'>说明：该统计在每周一、每月1日执行，按周环比指前两周的环比；按月环比指前两个月的环比。请选择相应的日期。</span>",
			constructor : function(config) {
				this.pagingbar = new Ext.PagingToolbar({
					pageSize : 40,
					store : this.getStore(),
					displayInfo : true,
					displayMsg : '当前第{0}项到第{1}项，共{2}项',
					emptyMsg : "没有查询到任何结果！"
				});
				config = config || {};
				config.tbar = config.tbar || [];
				var a = IsmpHB.common.getPermission('3-1');
				var arr = [];
				arr.push(this.searchBtn);
				arr.push(this.resetBtn);
				config.tbar.push(new Ext.Panel({
					border : false,
					// width : '900',
					items : [ {
						xtype : 'toolbar',
						border : false,
						items : [ '统计时间：', this.dateField, '地市：',
								this.cityCombo, '统计周期：', this.periodField_w,
								this.periodField_m, arr, '->', this.htmlTxt ]
					} ]
				}));
				config.bbar = this.pagingbar;
				this.sm = new Ext.grid.CheckboxSelectionModel({
					header : '',
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
				this.cm = new Ext.grid.ColumnModel([ this.sm, {
					header : '地市',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'node_code',
					width : 80,
					renderer : IsmpHB.renderer.CITYlIST
				}, {
					header : '付费类型',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'pay_type',
					width : 80,
					renderer : IsmpHB.renderer.MONITOR_PAY_TYPE
				}, {
					header : '产品或套餐代码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'product_offer_id',
					width : 80,
					renderer : function(val) {
						return '<div class="text-nowrap">' + val + '</div>';
					}
				}, {
					header : 'SP代码',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'sp_id',
					width : 80,
					renderer : function(val) {
						return '<div class="text-nowrap">' + val + '</div>';
					}
				}, {
					header : '费用(前)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'prev_sum_fee',
					width : 80
				}, {
					header : '费用(后)',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'next_sum_fee',
					width : 80
				}, {
					header : '差异',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'diff',
					width : 80
				}, {
					header : '前期起始',
					align : 'left',
					menuDisabled : true,
					dataIndex : 'prev_term_start',
					width : 80
				}, {
					header : '前期结束',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'prev_term_end',
					width : 80
				}, {
					header : '后期起始',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'next_term_start',
					width : 80
				}, {
					header : '后期结束',
					align : 'center',
					menuDisabled : true,
					dataIndex : 'next_term_end',
					width : 80
				// }, {
				// header : '统计期',
				// align : 'left',
				// menuDisabled : true,
				// dataIndex : 'period',
				// width : 80,
				// renderer : function(val) {
				// return '<div class="text-nowrap">' + val + '</div>';
				// }
				// }, {
				// header : '状态',
				// align : 'left',
				// menuDisabled : true,
				// dataIndex : 'status',
				// width : 120
				// }, {
				// header : '备注',
				// align : 'left',
				// menuDisabled : true,
				// dataIndex : 'memo',
				// width : 120
				} ]);
				IsmpHB.monitor_term.DataGrid.superclass.constructor.apply(this,
						arguments);

				this.searchBtn.on('click', function() {
					if (!this.isValid()) {
						return;
					}
					if (this.cityCombo.getValue() == '') {
						Ext.MessageBox.alert('提示', '请选择地市');
						this.cityCombo.focus();
						return;
					}
					this.searchItems();
				}, this);
				this.resetBtn.on('click', function() {
					this.resetAllConditions();
				}, this);
			},
			isValid : function() {
				return this.dateField.isValid();
			},
			resetAllConditions : function() {
				this.dateField.reset();
				this.periodField_w.setValue(true);
				this.cityCombo.reset();
			},
			searchItems : function(name) {
				this.getStore().baseParams = {
					record_time : this.dateField.getRawValue(),
					period : this.periodField_w.getValue() ? 1 : 2,
					node_code : this.cityCombo.getValue()
				};
				this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {

					},
					scope : this
				});
			}
		});

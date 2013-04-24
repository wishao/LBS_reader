var colorShowId = '';
var cp = new Ext.ColorPalette(); // 初始化时选中的颜色 initial selected color
var colorWin = new Ext.Window({
	border : false,
	closeAction : 'hide',
	closable : false,
	resizable : false,
	width : 100,
	height : 100,
	items : [ cp ]
});
cp.on('select', function(palette, selColor) {
	var color = '#' + selColor;
	Ext.getDom(colorShowId).style.background = color;
	Ext.getDom(colorShowId).value = color;
	colorWin.hide();
});
function showColor(id) {
	colorShowId = id;
	var colorText = Ext.getCmp(id);
	colorWin.x = colorText.getPosition()[0] + colorText.getWidth();
	colorWin.y = colorText.getPosition()[1];
	colorWin.show();
}

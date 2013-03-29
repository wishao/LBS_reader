/**
 * @author johnny0086
 */
Ext.namespace('LBSReader', 'LBSReader.actions');

LBSReader.actions.draw = function(container) {
	var paper = Raphael(container, 800, 600);
	var s = paper.circle(350, 50, 20).attr({
				fill : 'green',
				cursor : 'hand',
				'fill-opacity' : 0.75
			});
	paper.text(s.getBBox().x + 20, s.getBBox().y + 20, "开始");
	var c = paper.rect(300, 100, 100, 40, 10).attr({
				fill : 'green',
				cursor : 'hand',
				'fill-opacity' : 0.75
			});
	paper.path(["M", s.getBBox().x + 20, s.getBBox().y + 40, "L",
			c.getBBox().x + 50, c.getBBox().y].join(" ")).attr({
				stroke : 'green',
				'stroke-width' : 3
			});
	paper.text(c.getBBox().x + 50, c.getBBox().y + 20, "Sync HB Cust ID");
	var r = paper.rect(300, 200, 100, 40, 10).attr({
				fill : 'red',
				cursor : 'hand',
				'fill-opacity' : 0.75
			});
	paper.text(r.getBBox().x + 50, r.getBBox().y + 20, "Get Product Info");
	var path = ["M", c.getBBox().x + 50, c.getBBox().y + 40, "L",
			r.getBBox().x + 50, r.getBBox().y];
	paper.path(path.join(" ")).attr({
				stroke : 'green',
				'stroke-width' : 3
			});
}
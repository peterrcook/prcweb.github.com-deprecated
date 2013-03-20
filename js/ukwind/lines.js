function lineAnimate(selection) {
	selection
	.attr({x1: 200, x2: 200})
	.attr('y1', function(d) {return d;})
	.attr('y2', function(d) {return d;})
	.style('opacity', 0.5)
	.transition()
	.ease('linear')
	.duration(1000)
  .delay(function(d) {return d*10;})
	.attr('x2', 500)
	.transition()
	.duration(1000)
	.style('opacity', 0)
	.each('end', function() {d3.select(this).call(lineAnimate)});
}

d3.select('svg')
	.style({'width': '600px', 'height': '100px'})
	.selectAll('line')
	.data([30, 35, 40, 45, 50])
	.enter()
	.append('line')
	.style({'stroke': '#777', 'stroke-width': '3px'})
	.call(lineAnimate);

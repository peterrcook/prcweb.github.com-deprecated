var chart = {

	data: null,
  xScale: null,
  yScale: null,
  svgLine: null,
  colorScale: null,

  perspectiveOffsetX: 5,
  perspectiveOffsetY: 4.5,

  chartHeight: 390,
  lineWidth: 600,
  lineHeight: 250,

  bodyHeight: 4000, // Scroll height
  windowHeight: 0,
  scrollScale: null,


  translate: function(x, y) {return 'translate('+x+','+y+')';},

  init: function() {
  	// this.scale = d3.scale.linear().domain(this.domain).range(range);
  	var data = {};

  	_.each(this.data, function(dataset, k) {
  		dataset = _.map(dataset, function(data, k) {
  			return {year: k, data: data};
  		});
  		data[k] = dataset.reverse();
  	});

  	this.data = data;

  	d3.select('body').style('height', this.bodyHeight + 'px');
  	this.windowHeight = $(window).height();
  	this.scrollScale = d3.scale.linear().domain([0, this.bodyHeight - this.windowHeight]).range([1910, 2012]).clamp(true);

  	this.initChart();
  	this.initEvents();
  },

  showYear: function(year) {
  	var that = chart; // Better way to do this?
		d3.selectAll('#chart .years g.year')
			.classed('hover', false);
		d3.select('#chart .years .year-'+year)
			.classed('hover', true);

		var yearIndex = 2012 - year;
		d3.select('.axis.x')
  		.attr('transform', that.translate(yearIndex * that.perspectiveOffsetX, that.yScale(0) + -yearIndex * that.perspectiveOffsetY));
		// console.log(year);

		d3.selectAll('#chart .years .year')
			.style('display', function(d, i) {
				return i >= yearIndex ? 'block' : 'none';
			});
  },

  handleScroll: function() {
  	var that = chart; // Better way to do this?
		var scroll = $(window).scrollTop();
		var year = Math.round(that.scrollScale(scroll));
		that.showYear(year);
  },

  initEvents: function() {
  	var that = this;
		$(window).scroll(this.handleScroll);
  },

  initChart: function() {
  	var that = this;

  	this.xScale = d3.scale.linear()
  		.domain([0, 11])
  		.range([0, this.lineWidth]);

  	this.yScale = d3.scale.linear()
  		.domain([-2, 24])
  		.range([this.lineHeight, 0]);

  	this.colorScale = d3.scale.linear()
  		.domain([1910, 2012])
  		.range([0.5, 1]);

    this.svgLine = d3.svg.line()
      .interpolate('basis')
      .x(function(d, i) {return that.xScale(i);})
      .y(function(d) {return that.yScale(d);});

  	d3.select('#chart svg')
  		.append('g')
  		.classed('years', true)
  		.attr('transform', this.translate(0, this.chartHeight));

  	d3.select('#chart svg')
  		.append('g')
  		.classed('axes', true)
  		.attr('transform', this.translate(0, this.chartHeight));

  	this.renderAxes();
  },

  renderAxes: function() {
		var monthScale = d3.scale.ordinal()
	    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
	    .rangePoints([0, this.lineWidth]);

 	  var xAxis = d3.svg.axis()
	    .scale(monthScale)
	    .orient( 'bottom' )
  	d3.select('#chart .axes')
  		.append('g')
	    .classed('axis x', true)
	    // .attr('transform', this.translate(0, this.yScale(0)))
	    .call(xAxis);

  	// d3.select('#chart .axes')
  	// 	.append('line')
  	// 	.attr('x1', this.xScale(0))
  	// 	.attr('y1', this.yScale(0))
  	// 	.attr('x2', this.xScale(0) + this.data.mean.length * this.perspectiveOffsetX)
  	// 	.attr('y2', this.yScale(0) - this.data.mean.length * this.perspectiveOffsetY);

  	// d3.select('#chart .axes')
  	// 	.append('line')
  	// 	.attr('x1', this.xScale(11))
  	// 	.attr('y1', this.yScale(0))
  	// 	.attr('x2', this.xScale(11) + this.data.mean.length * this.perspectiveOffsetX)
  	// 	.attr('y2', this.yScale(0) - this.data.mean.length * this.perspectiveOffsetY);
  },

  update: function() {
  	var that = this;
  	var years = d3.select('#chart .years')
  		.selectAll('g.year')
  		.data(this.data.mean)
  		.enter()
  		.append('g')
  		.attr('class', function(d, i) {return 'year-' + d.year;})
  		.classed('year', true)
  		.attr('transform', function(d, i) {
  			return that.translate(i * that.perspectiveOffsetX, -i * that.perspectiveOffsetY);
  		})
  		.style('opacity', function(d) {
  			return that.colorScale(d.year);
  		});

  	years
  		.append('path')
  		.attr('d', function(d, i) {
  			return that.svgLine(d.data);
  		});

  	years
  		.append('line')
  		.attr('x1', 0)
  		.attr('y1', this.yScale(0))
  		.attr('x2', 0)
  		.attr('y2', function(d) {return that.yScale(d.data[0]);});

  	years
  		.append('line')
  		.attr('x1', this.xScale(11))
  		.attr('y1', this.yScale(0))
  		.attr('x2', this.xScale(11))
  		.attr('y2', function(d) {return that.yScale(d.data[11]);});

  	years
  		.append('line')
  		.classed('base', true)
  		.attr('x1', 0)
  		.attr('y1', this.yScale(0))
  		.attr('x2', this.xScale(11))
  		.attr('y2', this.yScale(0))

  	years
  		.append('text')
  		.classed('label', true)
  		.attr('x', this.xScale(11) + 5)
  		.attr('y', this.yScale(0))
  		.text(function(d) {return d.year;});
  }


}


d3.json('data/temp.json', function(temperatureData) {

	chart.data = temperatureData;
	chart.init();
	chart.update();
	chart.showYear(1910);

});


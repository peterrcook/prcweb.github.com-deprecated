d3.json('/lab/uktemperature/data/maxtemp.json', function(temperatureData) {

	var currentRank = highRank = 201;
	var allMonths = topMonths = bottomMonths = null;

	function addRanking(data) {
		/* Add ranking to data - is there a nice way to do this without sorting twice? */
		data.sort(function(d1, d2) { return d2.d - d1.d; });
		for(var i=0; i < data.length; i++) { data[i].rank = i + 1; }
		data.sort(function(d1, d2) { return d1.i - d2.i; });
	}

	/* Process data */
	var data = {};
	for(var k in temperatureData) {
		data[k] = [];
		var years = Object.keys(temperatureData[k]);
		for(var i = 0; i < years.length; i++) {
			for(var j = 0; j < 12; j++) {
				data[k].push( { i : (i*12)+j, d: temperatureData[k][years[i]][j] } );
			}
		}
		addRanking(data[k]);
	}

	/* Prepare labels */
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var years = [];
	for(var i = 1910; i < 2011; i++)
		i % 10 === 0 ? years.push(i) : years.push('');

	var domain = [-2, 5, 24];
	var range = ['blue', 'white', 'red'];
    var color = d3.scale.linear().domain(domain).range(range);

	/* Make chart */
	var chart = circularHeatChart()
		.accessor(function(d) {return d.d;})
		.segmentHeight(4)
		.innerRadius(20)
		.numSegments(12)
		.margin({top: 40, right: 20, bottom: 20, left: 130})
		.domain(domain)
		.range(range)
		.segmentLabels(months)
		.radialLabels(years);

	d3.select('#chart')
		.selectAll('svg')
		.data([data.mean])
		.call(chart);

	allMonths = d3.selectAll('g.circular-heat path');
	topMonths = d3.selectAll('g.circular-heat path')
					.filter(function(d) {
						return d.rank < highRank;
					});
	bottomMonths = d3.selectAll('g.circular-heat path')
					.filter(function(d) {
						return d.rank >= highRank;
					});

	//// Events
	function updateStatus() {
		var data = d3.select(this).data()[0];
		var month = months[data.i % 12];
		var year = 1910 + Math.floor(data.i / 12);
		var temperature = data.d;
	    d3.select('svg .period.label')
	    	.text(month + ' ' + year);
	    d3.select('svg .temperature.label')
	    	.text(temperature+'°c');
	}
	function clearStatus() {
	    d3.select('svg .period.label')
	    	.text('');
	    d3.select('svg .temperature.label')
	    	.text('');
	}
	d3.selectAll('#chart path').on('mouseover', updateStatus);
	d3.selectAll('#chart path').on('mouseout', clearStatus);



	function changeDataset() {
		var dataset = $('#dataset-select input[name=radio]:checked').attr('id');
		d3.select('svg')
			.selectAll('g.circular-heat path')
			.data(dataset === 'dataset-mean' ? data.mean : data.max)
			.transition()
			.duration(800)
			.style('fill', function(d) {
				return color(d.d);
			});
		if(currentRank !== highRank) {
			topMonths.classed('hidden', function(d) {
				return d.rank <= currentRank ? false : true;
			});			
		}
	}
	function updateRankLabel() {
		d3.select('svg .rank.label')
			.text(function() {
				if(currentRank === 1) return 'Showing top month';
				if(currentRank === highRank) return 'Showing all months';
				return 'Showing top ' + currentRank + ' months';
			});
	}
	function filterMonths(event, ui) {
		var previousRank = currentRank;
		currentRank = ui.value;
		if(previousRank === highRank) {
			bottomMonths.classed('hidden', true);
		} else if(currentRank === highRank) {
			bottomMonths.classed('hidden', false);
		}
		topMonths.classed('hidden', function(d) {
			return d.rank <= currentRank ? false : true;
		});
		updateRankLabel();
	}

	$('#monthFilter').slider({
		min: 1,
		max: 201,
		value: currentRank,
		slide: filterMonths
	});
	$('#dataset-select').buttonset().change(changeDataset);
	updateRankLabel();
});


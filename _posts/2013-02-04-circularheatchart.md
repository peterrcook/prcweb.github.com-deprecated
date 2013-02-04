---
layout: post
title: Circular Heat Chart Component for D3
description: Blog entry on building a circular heat-chart reusable chart for D3.js
---
<h3>Circular heat chart component for D3</h3>

<p>I made a circular heat chart of my energy consumption last year and I've decided to extract the charting component so that it can be re-used for other visualisations.</p>

<p>It follows the conventions set out by Mike Bostock for resuable charts so that it can be used and configured by others.</p>

<p>The chart is ideally suited to cyclic data. Most time based data is cyclic, for example, monthly rainfall data:</p>

<img src="/img/rainfall-1980-2012.jpg">

<p>The code to create this rainfall chart is:
<pre><code>
d3.json('rainfall.json', function(rainfallData) {
   
    /* Label data */
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    var years = [];
    for(var i = 1980; i < 2011; i++) {
        if(i % 10 === 0)
            years.push(i);
        else
            years.push('');
    }

    /* Create the chart */
    var chart = circularHeatChart()
        .segmentHeight(5)
        .innerRadius(20)
        .numSegments(12)
        .domain([50, 200])
        .range(['white', 'blue'])
        .segmentLabels(months)
        .radialLabels(years);

    d3.select('#chart')
        .selectAll('svg')
        .data([data])
        .enter()
        .append('svg')
        .call(chart);

});
</pre></code>
<p>See <a href="/lab/circularheat">more information</a> (including examples) or the project on <a href="https://github.com/prcweb/d3-circularheat">github</a>.</p>
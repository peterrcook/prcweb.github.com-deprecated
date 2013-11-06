---
layout: post
title: Radial Bar Chart Component for D3
description: Radial bar chart reusable component for D3.js
comments: true
---
<h3>Radial bar chart component for D3</h3>

<p>Following on from the circular heat chart released earlier this year I'm pleased to present another reusable D3 chart: a radial bar chart.</p>

<img src="/img/radial-bar-sample1.png">

<p>This displays a number of data values in a circular shape. Each data value is displayed as a circle segment with radius proportional to the value. The example above shows UK temperatures in 2012.</p>

<p>The chart is particularly suited to cyclic data (as in the above example) but it can be used for any series of data.</p>

<p>Multiple sets of data can also be viewed using layers. For example the following chart shows average UK temperature in 1910 and 2012. The solid bars are the 2012 temperatures whilst the transparent ones are the 1910 temperatures.</p>

<img src="/img/radial-bar-layers.png">

<p>Data is supplied in the form of a json object. The data for the above chart is:</p>

<pre><code>[
  {
  "year": 1910,
  "data": {
    "January": 2.6,
    "February": 3.9,
    "March": 5.4,
    "April": 6.0,
    "May": 10.1,
    "June": 13.3,
    "July": 13.2,
    "August": 14.1,
    "September": 11.8,
    "October": 9.9,
    "November": 2.8,
    "December": 5.5 
    }
  },
  {
  "year": 2012,
  "data": {
    "January": 4.7,
    "February": 4.2,
    "March": 7.7,
    "April": 6.3,
    "May": 10.5,
    "June": 12.3,
    "July": 14.1,
    "August": 15.3,
    "September": 11.9,
    "October": 8.2,
    "November": 5.8,
    "December": 3.8 
    }
  }
]
</code></pre>

<p>The chart automatically adapts to the number of data elements and many of the chart's attributes may be configured including the bar colours, the scale domain and whether the labels should be coloured. It's likely that more configuration options will be added.</p>

<p>The chart also handles <a href="/lab/updatable-radial-bar">data updates</a> with transitions.</p>

<p>This chart is released under the MIT license and the project and further examples can be found on <a href="https://github.com/prcweb/d3-radialbar">github</a>.</p>
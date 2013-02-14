---
layout: post
title: UK Temperature 1910-2012 using Circular Heat Chart
description: Blog entry on building a circular heat-chart visualisation of UK temperature
comments: true
---
###Data visualisation of UK Temperature

I recently produced a [visualisation of UK rainfall](/rainfall) over the past 100 years using data supplied by the Met Office and have now produced a similar chart for UK temperature.

[![UK temperature circular heat chart](/img/uktemperature-vis.jpg)](/lab/uktemperature)

Besides the different dataset, there's a couple of differences to the rainfall chart:

* two colours are used: blue to represent cooler temperatures and red warmer
* two datasets are selectable: mean temperature and max temperature

As with the rainfall chart, there's a slider to single out the warmer months.

[![UK temperature circular heat chart](/img/uktemperature-vis-top50.jpg)](/lab/uktemperature)

The chart is implemented using [D3][d3] and my [circular heat chart][chc] component.

[d3]: http://d3js.org
[chc]: /circularheatchart
[met]: http://www.metoffice.gov.uk/climate/uk/datasets/#
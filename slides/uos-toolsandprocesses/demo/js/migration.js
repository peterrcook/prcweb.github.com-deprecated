d3.json('data/places.json', function(err, places) {
  d3.json('data/migration.json', function(err, migration) {

    processData(migration, places);

    var radiusScale = d3.scale.sqrt().domain([0, 2000000]).range([0, 10]);

    d3.select('svg')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .each(function(d) {
        var e = d3.select(this);

        // console.log(d);

        // var lonLat = places[d.country];
        // lonLat = [lonLat.lon, lonLat.lat];

        // console.log(lonLat);

        // var pos = projection(lonLat);

        // e.append('circle')
        //   .attr('cx', pos[0])
        //   .attr('cy', pos[1])
        //   .attr('r', radiusScale(d.out))
        //   .style({
        //     fill: 'none',
        //     stroke: '#666'
        //   });

        // e.append('circle')
        //   .attr('cx', pos[0])
        //   .attr('cy', pos[1])
        //   .attr('r', radiusScale(d.in))
        //   .style({
        //     fill: 'purple',
        //     opacity: 0.5
        //   });

        // e.on('mouseover', function(d) {
        //   console.log(d);
        // });
      });
  });
});
(function() {
  var paper = Raphael('container', 1200, 720);

  var current = { country : null, elements : [] };
  var debtScale = 0.01;
  var template = $('#debt-row').html();
  // Creditor, debitor, amount ($billons), risk (from https://gist.github.com/mbostock/1308257)
  var debtCSV = "Britain,France,22.4,3,Britain,Greece,0.55,0,Britain,Italy,26,0,Britain,Portugal,19.4,0,Britain,United States,345,1,France,Germany,53.8,1,France,Greece,53.9,0,France,Ireland,17.3,0,France,Italy,366,0,France,Japan,7.73,1,France,Portugal,18.3,0,France,Spain,118,2,France,United States,322,1,Germany,Britain,321,1,Germany,Greece,19.3,0,Germany,Ireland,48.9,0,Germany,Portugal,32.5,0,Germany,Spain,57.6,2,Germany,United States,324,1,Ireland,Britain,12,1,Ireland,Greece,0.34,0,Ireland,Spain,6.38,2,Italy,Germany,111,1,Italy,Greece,3.22,0,Italy,Ireland,2.83,0,Italy,Portugal,0.87,0,Japan,Britain,28.2,1,Japan,Germany,88.5,1,Japan,Greece,1.37,0,Japan,Ireland,18.9,0,Japan,Italy,38.8,0,Japan,Portugal,2.18,0,Japan,Spain,25.9,2,Japan,United States,796,1,Portugal,Greece,10.1,0,Portugal,Ireland,3.77,0,Portugal,United States,0.52,1,Spain,Britain,326,1,Spain,Greece,0.78,0,Spain,Italy,9.79,0,Spain,Portugal,62,0,Spain,United States,163,1,United States,Greece,3.1,0,United States,Ireland,11.1,0,United States,Italy,3.16,0";
  var debt = {};
  var places = {
      'Britain' : {lat: 51.5, lon: -0.12},
      'France' : {lat: 48.9, lon: 2.4},
      'Germany' : {lat: 52.5, lon: 13.4},
      'Greece' : {lat: 38, lon: 23.7},
      'Ireland' : {lat: 53.3, lon: -6.3},
      'Italy' : {lat: 41.9, lon: 12.5},
      'Japan' : {lat: 35.7, lon: 139.7},
      'Portugal' : {lat: 38.7, lon: -9.2},
      'Spain' : {lat: 40.4, lon: -3.7},
      'United States' : {lat: 38.9, lon: -77},
  }


  // HELPERS
  function getXY(p) {
    return {
      x: p.lon * 2.6938 + 465.4,
      y: p.lat * -2.6938 + 227.066
    };
  };

  function length(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.x - p0.x, 2));
  }

  function midpoint(p0, p1) {
    return {x: p0.x + (p1.x - p0.x) / 2, y: p0.y + (p1.y - p0.y) / 2};
  }

  function dir(p0, p1) {
    var l = length(p0, p1);
    return {x: (p1.x - p0.x) / l, y: (p1.y - p0.y) / l};
  }

  function orthogonal(dir) {
    return {x: -dir.y, y: dir.x};
  }

  function quadraticMidpointFromConnection(p0, p1, k) {
    var l = length(p0, p1);
    var d = dir(p0, p1); 
    var orth = orthogonal(d);
    var mid = midpoint(p0, p1);
    var kl = l * k;
    return {x: mid.x + kl * orth.x, y: mid.y + kl * orth.y};
  }

  // Custom attribute function that returns segment of curve
  paper.ca.arc = function(x) {
    var length = this.attr('length');
    var path = this.attr('original');
    var subPath = Raphael.getSubpath(path, 0, x*length);
    return {path: subPath};
  }

  // Empty functions to allow us to add static custom attributes
  paper.ca.length = function() {}
  paper.ca.original = function() {}

  function qPath(start, mid, end) {
    var path = "M"+start.x+" "+start.y;
    path += " Q"+mid.x+" "+mid.y;
    path += " "+end.x+" "+end.y;
    return path;
  }


  // RENDERING
  function updateLegend(country) {
    $('#legend h2').html(country + ' owes:');
    var creditors = debt[country].creditors;
    // console.log(creditors);

    // $('#legend .content').html(tim($('#debt-row')[0].innerHTML, {debts: creditors}));
    var $table = $('#legend .content');
    $table.html('');
    for(var i=0; i<creditors.length; i++) {
      $table.append(tim(template, creditors[i]));
    }
    $table.append(tim(template, {'creditor': 'Total', amount: debt[country].total}));
  }

  function showCurves(country) {
    if(country === current.country)
      return;

    removeCurrent();
    current.country = country;
    var creditors = debt[country].creditors;

    for(var i=0; i<creditors.length; i++) {
      var p0 = getXY(places[country]);
      var p1 = getXY(places[creditors[i].creditor]);
      var path = qPath(p0, quadraticMidpointFromConnection(p0, p1, -.5), p1);

      var curvePath = paper.path(path);
      var length = Raphael.getTotalLength(path);

      curvePath.attr( { opacity: 0,
                        original: path, 
                        length: length, 
                        'arrow-end':'short', 
                        'stroke':'#444', 
                        'stroke-width': creditors[i].amount * debtScale * 4} );

      curvePath.attr( {arc: 0.1} );

      current.elements.push(curvePath);

      // Animate
      var anim = Raphael.animation({arc: 1.1, opacity: 0.7}, 1000, '>');
      curvePath.animate(anim.delay(i*300));

    }
    updateLegend(country);
    $('#about').attr('opacity', '0.1');
  }

  function removeCurrent() {
    for(var i=0; i<current.elements.length; i++)
      current.elements[i].remove();
  }


  // INITIALISATION
  function init() {
    paper.setViewBox(230, 0, 630, 300);

    // Draw worldmap. Data taken from http://raphaeljs.com/world/
    for (var country in worldmap.shapes) {
      paper.path(worldmap.shapes[country]).attr({stroke: "#666", "stroke-width": 0.5, fill: "#f0efeb", "stroke-opacity": 0.25});
    }

    initData();

    // Draw origins
    for(c in debt) {
      var oXY = getXY(places[c]);
      var rad = debt[c].total * debtScale > 1 ? debt[c].total * debtScale : 1;
      var o = paper.
        circle(oXY.x, oXY.y, rad).
        attr({'fill':'red', 'stroke':'none'}).
        data('country', c);
      o.hover(function() {showCurves(this.data('country'));});
    }

    // To get us started, highlight Britain
    showCurves('Britain');
  }

  function initData() {
    var debtSplit = debtCSV.split(',');
    for(var i=0; i<debtSplit.length; i+=4) {
      var creditor = debtSplit[i],
          debtor = debtSplit[i+1],
          amount = debtSplit[i+2];

      if(!debt[debtor]) {
        debt[debtor] = {total: 0, creditors: []};
      };
      debt[debtor].creditors.push({creditor: creditor, amount: amount});
      debt[debtor].total += parseInt(amount);
    }

    // sort creditors
    for(var c in debt) {
      debt[c].creditors = debt[c].creditors.sort(function(a, b) {return parseInt(a.amount) < parseInt(b.amount) ? 1 : -1;});
    }
  }

  init();
})();

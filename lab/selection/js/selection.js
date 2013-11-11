var s = [
  "d3.select('table')",
  "d3.selectAll('table')",
  "d3.select('table').selectAll('tr')",
  "d3.selectAll('table').selectAll('tr')",
  "d3.selectAll('tr').selectAll('td')",
  "d3.selectAll('table').selectAll('td')",
  "d3.selectAll('table').select('td')",
  "d3.selectAll('table').selectAll('td:nth-child(2)')"
];

function unhover() {
  d3.selectAll('.hover')
    .classed('hover', false);
}

function titleHover(d) {
  unhover();
  d3.select(this).classed('hover', true);
  var s = eval(d);
  s.classed('hover', true);
}

function parentNodeHover(d) {
  unhover();
  var parent = d.parentNode.localName === 'html' ? '#doc' : d.parentNode;
  d3.select(parent)
    .classed('hover', true);
  d3.select(this)
    .classed('hover', true);  
}

function elementHover(d) {
  unhover();
  d3.select(d)
    .classed('hover', true);
  d3.select(this)
    .classed('hover', true);  
}

// Join selection data and append div for each selection string
var selections = d3.select('.selections')
  .selectAll('div.selection')
  .data(s)
  .enter()
  .append('div')
  .classed('selection', true);

// Selection title
selections
  .append('div')
  .classed('name', true)
  .text(function(d) {return d;})
  .on('mouseover', titleHover)
  .on('mouseout', unhover);

// Open inner bracket
selections
  .append('div')
  .classed('outer bracket', true)
  .text('[');

// Append groups
var groups = selections
  .selectAll('div.group')
  .data(function(d) {return eval(d);})
  .enter()
  .append('div')
  .classed('group', true)
  .classed('first', function(d, i) {return i === 0;});

// Parent node
groups.append('div')
  .classed('parent-node', true)
  .text(function(d) {
    return 'parentNode = <' + d.parentNode.localName + '>';
  })
  .on('mouseover', parentNodeHover)
  .on('mouseout', unhover);

// Append group elements
var elements = groups.append('div')
  .classed('elements', true);

elements.append('span')
  .text('[');

elements.selectAll('span.element')
  .data(function(d) {return d;})
  .enter()
  .append('span')
  .classed('element', true)
  .text(function(d, i) {
    var comma = this.nextSibling !== null;
    return '<' + d.localName + '>' + (comma ? ', ' : '');
  })
  .on('mouseover', elementHover)
  .on('mouseout', unhover);

elements.append('span')
  .classed('inner bracket', true)
  .text(function() {
    var comma = this.parentNode.parentNode.nextSibling !== null;
    return ']' + (comma ? ', ' : '');
});

// Close outer bracket
d3.selectAll('.selection')
  .append('div')
  .classed('outer bracket', true)
  .text(']');

// Make initial hover
var e = document.createEvent('UIEvents');
e.initUIEvent('mouseover');
d3.select('.name').node().dispatchEvent(e);

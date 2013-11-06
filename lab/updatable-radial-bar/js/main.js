var data = null;
var keys = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function initData() {
  data = [{data: {}}];
  for(var i=0; i<keys.length; i++)
    data[0].data[keys[i]] = Math.random() * 10;
};

function update() {
  initData();

  d3.select('#chart')
    .datum(data)
    .call(chart);
}

d3.select('#update')
  .on('click', update);

var chart = radialBarChart()
  .barHeight(250)
  .reverseLayerOrder(true)
  .capitalizeLabels(true)
  .barColors(['#B66199', '#9392CB', '#76D9FA', '#BCE3AD', '#FFD28C', '#F2918B'])
  .domain([0,10])
  .tickValues([1,2,3,4,5,6,7,8,9,10])
  .tickCircleValues([1,2,3,4,5,6,7,8,9]);

update();

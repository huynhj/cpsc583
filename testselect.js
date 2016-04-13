/*TODO:
idea:
-select a county
	-select another county for comparison
-(displays 4 accessibility groups using icons for each county)
-legend (color/size)
-hover to get county/state and value*/
var headers;
var foodaccess;

var component,root,svg,color, gr, ga,line,foodfilter;
var selectedIndex =0;

var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
var sizeScale = d3.scale.linear().range([3, 20]);
/*
var xAxis = d3.svg.axis().orient("bottom");
var yAxis = d3.svg.axis().orient("left");

var xAxisIndex = 0, yAxisIndex = 0, */ var valIndex, sizeIndex = 0;

//var circleData = [
 //   { "cx": 400, "cy": 400, "radius_half": 100, "radius_1": 200, "radius_10": 300, "radius_20":400}];

    var width = 1000,
      height = 750,
      radius = Math.min(width, height) / 2 - 30;

    var r = d3.scale.linear()
      .domain([0, 1])
      .range([0, radius]);
	
formatData(rawData);
createDropdown();
createVis();
updateVis();

function formatData(data) {
	headers = data.filter(
		function (d) {
			return d.type == "indicators";
		}
	);
	headers = headers[0].values;
	
	foodaccess = data.filter(
		function (d) {
			return d.type == "foodaccess";
		}
	);
}

function createVis() {
   line = d3.svg.line.radial()
      .radius(function(d) {
        return r(d[1]);
      })
      .angle(function(d) {
        return -d[0] + Math.PI / 2;
      });
/*	legend = d3.select("#legend").append("svg")
		.attr("class", "legend")
		.attr("transform", "translate(50,30)")
		.style("font-size","12px")
		.call(d3.legend);*/
	
    svg = d3.select("#frame").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    gr = svg.append("g")
      .attr("class", "r axis")
      .selectAll("g")
      .data(r.ticks(4).slice(1))
      .enter().append("g");
  
    gr.append("circle")
      .attr("r", r);
	  
	var dist = [0, 1/2, 1,10,20]
	gr.append("text")
		.data(dist)
		.attr("x", function(d,i){return 69+(i*69)})
		.attr("text-anchor", "right")
		.text(function(d){return d;});
		
    ga = svg.append("g")
      .attr("class", "a axis")
      .selectAll("g")
      .data(d3.range(0, 360, 30))
      .enter().append("g")
      .attr("transform", function(d) {
        return "rotate(" + -d + ")";
      });

    ga.append("line")
      .attr("x2", radius);
      
    color = d3.scale.category20();

	  var data = [5213,5213.000011,2112.960734,1102.999998,1055.000004,5213.000011,2112.960734,1102.999998,1055.000004,533.9914285,195.9889424,105.2434788,106.419291,0,0,0,0];

	svg.selectAll("imgMid").data(data)
		.enter()
		.append("svg:image")
		.attr("x", -60)//-60
		.attr("y", -30)//-30
   .attr('width', 120)
   .attr('height', 70)
   .attr("xlink:href","shopping-cart.png");
   
  /*svg.selectAll(".foods").data(foodaccess)
		.enter()
		.append("g")
		.attr("class", "foods");*/
		
   svg.selectAll(".foodacc").data(cross(headers,foodaccess))
		.enter()
		.append("g")
		.attr("class", "foodacc")
		.append("svg:image")
		//["lapophalf","lalowihalf","lakidshalf","laseniorshalf" 	-x,y
		//"lapop1","lalowi1","lakids1","laseniors1"					x,y
		//"lapop10","lalowi10","lakids10","laseniors10"				-x,-y
		//"lapop20","lalowi20","lakids20","laseniors20"]			x,-y
		// Q1		Q2			Q3		Q4
		.attr('x', function(d,i){
		if ((i==1) || (i==3)){
			return -125;}
		else if ((i ==5) || (i == 7)){ 
			return -175;}
		else if ((i==9) || (i==11)){
			return -225;}
		else if ((i ==13) || (i == 15)) {
			return -275;}
		else if ((i==2) || (i==4)){
			return 75;}
		else if ((i ==6) || (i == 8)) {
			return 125;}
		else if ((i==10) || (i==12)){
			return 175;}
		else if ((i ==14) || (i == 16)) {
			return 225;   }})		
		.attr('y', function(d,i){
		if ((i==1) || (i==2)){
			return 25;}
		else if((i ==5) || (i == 6)){ 
			return 75;}
		else if ((i==9) || (i==10)){
			return 125;}
		else if ((i ==13) || (i == 14)) {
			return 175;}
		else if ((i==3) || (i==4)){
			return -50;}
		else if ((i ==7) || (i == 8)) {
			return -100;}
		else if ((i==11) || (i==12)){
			return -150;}
		else if((i ==15) || (i == 16)) {
			return -200;   }})			
		.attr('height', 50)
		.attr('width', 50)
		.attr("xlink:href", function(d,i){
		if ((i==1) || (i==5) || (i ==9) || (i == 13)){ 	//index 1-4
			return "img_pop.png";}
		else if ((i==4) || (i==8) || (i ==12) || (i == 16)) {
			return "img_fam.png";}
		else if ((i==2) || (i==6) || (i ==10) || (i == 14)) {
			return "img_kid.png";}
		else if ((i==3) || (i==7) || (i ==11) || (i == 15)) {
			return "img_senior.png";}}); 
			
}

function updateVis(animate) {
	var maxValSize = d3.max(foodaccess, function (d,i) {return valIndex;});
	//console.log(valIndex);
	sizeScale.domain([0, valIndex]);

	sizeScale.domain([0, d3.max(foodaccess, function(d,i){return valIndex})]);
var myscale = d3.scale.log();
	var duration = animate ? 500 : 0;
	var theta = 2 * Math.PI / sizeIndex;
	foodfilter = foodaccess.filter(function (d){ if(d == valIndex){console.log(d); return d;}});
	svg.selectAll(".foodacc")
		.transition()
		.duration(duration)
		.delay(function(d, i) {
			if (animate) {
				return i * 10;
			} else {
				return 0;
			};
		})
			.select("image")
			.attr('height', function(d,i){console.log(d);//console.log(myscale(i)*15); 
				return myscale(i)*15+5;})
			.attr('width', function(d,i){
				return myscale(i)*15+5;});
			
}

function createDropdown() {
	var dropdownDatas = [
		{name:"State A", target: "stateA"},
		{name:"State B", target: "stateB"}
	];

	var dropdownDatac = [
		{name:"County A", target: "countyA"},
		{name:"County B", target: "countyB"}
	];
	var dropdownGroups = d3.select("#buttons").selectAll(".dropdownGroups")
		.data(dropdownDatas).enter()
		.append("span").attr("class", "dropdownGroups");
	
	var dropdownGroupc = d3.select("#buttons").selectAll(".dropdownGroupc")
		.data(dropdownDatac).enter()
		.append("span").attr("class", "dropdownGroupc");
	dropdownGroups.append("label").html(function(d){return d.name;});
	dropdownGroupc.append("label").html(function(d){return d.name;});
	
	dropdownGroups.append("select")
		.on("change", function(d) {
			var selectedIndex = d3.select(this).property('selectedIndex');
			if (d.target == "stateA") {
				valIndex = selectedIndex;
			}
			else if (d.target == "stateB") {
				valIndex = selectedIndex;
			}
			updateVis(true);
		})
		.selectAll("option")
			.data(foodaccess).enter()
			.append("option")
			.text(function(d) { return d.state; });
			
	dropdownGroupc.append("select")
		.on("change", function(d) {
			selectedIndex = d3.select(this).property("value");
			if (d.target == "countyA") {
				valIndex = selectedIndex;
				console.log(valIndex);}
			else if (d.target == "countyB") {
				valIndex = selectedIndex;
			}
			updateVis(true);
		})
		.selectAll("option")
			.data(foodaccess).enter()
			.append("option")
			.text(function(d) { return d.county; });			
}
/*
function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
	for (i = 1; ++i < n;) 
		for (j = 1; ++j < m;) 
			c.push(x: a[i], i: i, y: b[j], j: j});
  return c;
}*/
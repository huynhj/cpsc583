var headers;
var foodaccess;

var component,root,svg,color, gr, ga,line;

var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
var sizeScale = d3.scale.linear().range([3, 20]);
/*
var xAxis = d3.svg.axis().orient("bottom");
var yAxis = d3.svg.axis().orient("left");

var xAxisIndex = 0, yAxisIndex = 0, */ var sizeIndex = 0;

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

    svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    gr = svg.append("g")
      .attr("class", "r axis")
      .selectAll("g")
      .data(r.ticks(4).slice(2))
      .enter().append("g");

    gr.append("circle")
      .attr("r", r);

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
/*
    var data = [
      [Math.PI / 3, 1],	// pi/3
      [Math.PI / 6, 0.9],	// pi/6
      [0 * Math.PI, 0.8],	// 0
      [(11 * Math.PI) / 6, 0.7], //11pi/6
      [(5 * Math.PI / 3), 0.6],	//5pi/3
      [(3 * Math.PI) / 2, 0.5],	//3pi/2
      [(4 * Math.PI / 3), 0.4],	//4pi/3
      [(7 * Math.PI) / 6, 0.3],	//7pi/6
      [Math.PI, 0.2],				//pi
      [(5 * Math.PI) / 6, 0.1],	//5pi/6
      [(2 * Math.PI) / 3, 0],	//2pi/3
      [Math.PI / 2, Math.random()]			//pi/2
    ]
*/
    /*svg.selectAll("point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("transform", function(d) {
        var coors = line([d]).slice(1).slice(0, -1);
		console.log(d, line([d]), coors);
        return "translate(" + coors + ")"
      })
      .attr("r", 16)
      .attr("fill",function(d,i){
        return "#CC33FF";
      });
	  */
	  var data = [5213,5213.000011,2112.960734,1102.999998,1055.000004,5213.000011,2112.960734,1102.999998,1055.000004,533.9914285,195.9889424,105.2434788,106.419291,0,0,0,0];

	  //FIX THE INDEX, it is wrong
	svg.selectAll("img").data(data)
		.enter()
		.append("svg:image")
		.attr("x", function (d) {
			xcoord = (d%4) * (-65);
			console.log(xcoord);
			return xcoord;
		})
		.attr("y", function (d) {
			ycoord = (d%4) * (-65);
			console.log(ycoord);
			return ycoord;
		})
   .attr('width', 80)
   .attr('height', 50)
   .attr("xlink:href","img_senior.png");
   
	svg.selectAll("img").data(data)
		.enter()
		.append("svg:image")
		.attr("x", function (d) {
			xcoord = (d%4) * (65);
			console.log(xcoord);
			return xcoord;
		})
		.attr("y", function (d) {
			ycoord = (d%4) * (-30);
			console.log(ycoord);
			return ycoord;
		})
   .attr('width', 80)
   .attr('height', 50)
   .attr("xlink:href","orange_pop.svg");   
   	
	svg.selectAll("img").data(data)
		.enter()
		.append("svg:image")
		.attr("x", function (d) {
			xcoord = (d%4) * (-65);
			console.log(xcoord);
			return xcoord;
		})
		.attr("y", function (d) {
			ycoord = (d%4) * (30);
			console.log(ycoord);
			return ycoord;
		})
   .attr('width', 120)
   .attr('height', 70)
   .attr("xlink:href","img_kid.png"); 
	
  /* .attr('x', function(d,i){
		if ((i==1) || (i==5) || (i ==9) || (i == 13)){ 	//index 1-4
			.attr("xlink:href","img_senior.png)
			.attr('y', -50)
			.attr('x', -50)}
		else if ((i==4) || (i==8) || (i ==12) || (i == 16)) {
			.attr("xlink:href","img_kid.png")
			.attr('y', -100)
			.attr('x', -100)}
		else if ((i==2) || (i==6) || (i ==10) || (i == 14)) {
			.attr("xlink:href","img_pop.png")
			.attr('y', -150)
			.attr('x', -150}
		else if ((i==3) || (i==7) || (i ==11) || (i == 15)) {
			.attr("xlink:href","img_fam.png")
			.attr('y', -200)
			.attr('x', -200)}
			return i
;   })*/
/*	components = d3.select("components").append("canvas")
		.attr("width", 100)
		.attr("height", height);
	root = d3.select("body").append("svg")
		.attr("width", width )
		.attr("height", height);
		
var circles = root.selectAll("g")
                       .data(circleData)
                       .enter()
                       .append("g");
	// Add 20mi circle
		circles.append("circle")
		.attr("cx", function (d) { return d.cx; })
		.attr("cy", function (d) { return d.cy; })
		.attr("r", function (d) { return d.radius_20; })
		.style("fill", "#ffffff")			
		.style("stroke", "#000000")
		.style("stroke-width", 1);
	// Add 10mi circle
		circles.append("circle")
		.attr("cx", function (d) { return d.cx; })
		.attr("cy", function (d) { return d.cy; })
		.attr("r", function (d) { return d.radius_10; })
		.style("fill", "#ffffff")
	   	.style("stroke", "#000000")
		.style("stroke-width", 1);
	// Add 1mi circle.
	circles.append("circle")
		.attr("cx", function (d) { return d.cx; })
		.attr("cy", function (d) { return d.cy; })
		.attr("r", function (d) { return d.radius_1; })
		.style("fill", "#ffffff")
		.style("stroke", "#000000")
		.style("stroke-width", 1);
	// Add half mi circle.
	circles.append("circle")
		.attr("cx", function (d) { return d.cx; })
		.attr("cy", function (d) { return d.cy; })
		.attr("r", function (d) { return d.radius_half; })
		.style("fill", "#ffffff")
	   	.style("stroke", "#000000")
		.style("stroke-width", 1);
					
	root.selectAll(".foodaccess").data(foodaccess)
		// we enter the selection and add a <g> for each piece of data
		.enter()
		.append("g")
		.attr("class", "foodaccess")
			.append("circleD")
			.style("fill", "#ff0000") // hardcoded styling, not great but c'est la vie
			.style("stroke", "#000000") // would be better to put this in the stylesheet
			.style("stroke-width", 1);*/
			
}

function updateVis(animate) {
	var maxValSize = d3.max(foodaccess, function (d) {return d.values[sizeIndex];});
	sizeScale.domain([0, maxValSize]);

	sizeScale.domain([0, d3.max(foodaccess, function(d){return d.values[sizeIndex]})]);

	var duration = animate ? 500 : 0;
	var theta = 2 * Math.PI / sizeIndex;
	
	svg.selectAll(".foodaccess")
		.transition()
		.duration(duration)
		.delay(function(d, i) {
			if (animate) {
				return i * 10;
			} else {
				return 0
			};
		});
		svg.selectAll('circleD').data(foodaccess).enter()
				.append("circleD")
				.attr("transform", function(d,i) {
		var xValue = [(7 * Math.PI) / 6, 0.3];
		var coors = line(xValue).slice(1).slice(0, -1);
		console.log(d.values[i], coors);
		return "translate(" +
				coors + ")";
      })
				.attr('cx', function(d,i) {return(r* Math.cos(i*theta));})
				.attr('cy', function(d,i) {return(r* Math.sin(i*theta));})
		
		.select("circleD")
			.attr("r", function(d) {
				return sizeScale(d.values[sizeIndex]);
			});
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
				xAxisIndex = selectedIndex;
			}
			else if (d.target == "stateB") {
				yAxisIndex = selectedIndex;
			}
			updateVis(true);
		})
		.selectAll("option")
			.data(foodaccess).enter()
			.append("option")
			.text(function(d) { return d.state; });
			
	dropdownGroupc.append("select")
		.on("change", function(d) {
			var selectedIndex = d3.select(this).property('selectedIndex');
			if (d.target == "countyA") {
				xAxisIndex = selectedIndex;}
			else if (d.target == "countyB") {
				yAxisIndex = selectedIndex;
			}
			updateVis(true);
		})
		.selectAll("option")
			.data(foodaccess).enter()
			.append("option")
			.text(function(d) { return d.county; });			
}



/**
 * Credit where credit is due:  much of the basic heirarchical edge bundling
 * code is borrowed from http://bl.ocks.org/mbostock/7607999; the pie/donut chart used for labels came from 
 * here: https://gist.github.com/mbostock/3887235
 */


/* **************************************************
 * Size definitions
 */
 
 console.log("hi");
 
// Set lower limit for circle size
var diameter = 850,
	innerRadius = 190,
	fontsize = 10;

// If we can fit it all on the screen, let's make it bigger and easier to read
if (window.innerHeight > diameter)
{
	diameter = window.innerHeight;
}

if (diameter > 900)
{
	innerRadius = 200;
	fontsize = 11;
}

var rotval = 0;

var radius = diameter / 2,
	labelRoom = radius - innerRadius,
	labelheight = 30,
	labelmargin = 5,
	centertime = 500,
	height = diameter,
	width = diameter,
	detailsize = 1.25 * innerRadius,
	linkcolor = "lightgray";

/* **************************************************
 * Radial graph presets
 */
	
var cluster = d3.layout.cluster()
	.size([360, innerRadius])
	.sort(null)
	.value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
	.interpolate("bundle")
	.tension(.55)
	.radius(function(d) { return d.y; })
	.angle(function(d) { return d.x / 180 * Math.PI; });
		
/* **************************************************
 * Pie presets
 */
 
// These are branding colors; tried to pick things that work in grayscale
var color = d3.scale.ordinal()
    .range(["#A51C30", "#4E84C4", "#C4961A", "#52854C", "#D16103", "#38117f", "#8C8179"]);
    
var colorhigh = d3.scale.ordinal()
    .range(["#881728", "#3c73b4", "#a67f16", "#456f40", "#b05103", "#2B0D61", "#7a7069"]);

var arc = d3.svg.arc()
    .outerRadius(innerRadius + labelheight - labelmargin)
    .innerRadius(innerRadius + labelmargin);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { 
    	return d.value; 
    });
    
    
/* **************************************************
 * Drawing & window presets
 */
var svg = d3.select("#vis").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	

d3.select("svg").style("background-image", "url('spinner.gif')");

var linkg = svg.append("g")
	.attr("id", "links")
	.selectAll(".link");

var nodeg = svg.append("g")
	.attr("id", "nodes")
	.selectAll(".node");
	
/*var detail = d3.select("svg").append("foreignObject")
		.attr("id", "detail")
		.attr("x", function() {
			return (width / 2) - (detailsize / 2);
		})
		.attr("y", function() {
			return (height / 2) - (detailsize / 2);
		})
		.attr("height", detailsize)
		.attr("width", detailsize)
		.attr("fill", "black");*/
		

// Let's try and make this work in IE... doing it the hard way here.  Stupid IE.		
var viswidth = d3.select("#vis").style("width").replace(/[^.0-9]/g, '');	

var detail2 = d3.select("#vis")
		.append("div")
		.attr("id", "detail")
		.style(
			{"height" : function() { return detailsize + "px"}, 
			"width": function() { return detailsize + "px"}, 
			"top": function() { return Math.floor((height / 2) - (detailsize / 2)) + "px"}, 
			"left": function() { return Math.floor((viswidth / 2) - (detailsize / 2)) + "px"},
			"position" : "absolute"});
		
d3.select("#vis")
	.append("div")
	.attr("id", "closediv")
	.style(
		{"height" : "28px", 
		"width": "28px", 
		"top": function() { return Math.floor((height / 2) - (detailsize / 2) - 12) + "px"}, 
		"left": function() { return Math.floor((viswidth / 2) + (detailsize / 2) - 12) + "px"},
		"position" : "absolute"});		

var svg2 = d3.select("#closediv")
		.append("svg")
		.attr("id", "closesvg")
		.style({"height" : "28px", 
			"width": "28px"});
		
//Center vertically, make it pretty
window.scrollTo(0, ((height - window.innerHeight) / 2));
    
    
/* **************************************************
 * global variables
 */
    
var node, link, nodes, links, allnodes, alllinks, pieg, labels, rawnodes, rawinfo, piegroup;
	

/* **************************************************
 * Data acquisition
 */
d3.json("fakefac4.json", function(error, classes) {

	// **************************************************
	// Nodes and Links
	// **************************************************
	
	// Just the basics here, because we'll run filterit at the end and it'll do all the calculations
	
	rawnodes = classes.nodes;
	
	// Build nodes and links
	nodes = cluster.nodes(packageHierarchy(rawnodes));
	links = packageImports(nodes);	
	
	// Preserve original settings for later, when we're filtering
	allnodes = nodes;
	alllinks = links;
		
	// Build out links
	link = linkg
		.data(bundle(links))
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("stroke", linkcolor);

	// Build out nodes
	node = nodeg
		.data(nodes.filter(function(n) { return !n.children; }))
		.enter()
		.append("text")
		.attr("class", "node")
		.attr("fill", function(d) { 
			return color(d.cat); 
		})
		.attr("font-size", fontsize)
		.text(function(d) { return titletrim(d.title); })
		.on("mouseover", mouseovered)
		.on("mouseout", mouseouted)
		.on("click", clicked);
		
	node.append("title").text(function(d) { return d.title; });
		
	setnodevals();
		
	
	// **************************************************
	// Pie label
	// **************************************************
	
	// Some summary information for ease of label creation
	rawinfo = visinfo = classes.info;
	
	// Set the color domain since it's easy to do from here
	color.domain(classes.info.map(function(d){
		return d.cat;
	}));
	
	colorhigh.domain(classes.info.map(function(d){
		return d.cat;
	}));
	
	piegroup = svg.append("g").attr("id", "piegroup");
	
	pieg = piegroup.selectAll(".arc")
		.data(pie(visinfo));
		
	pieg.attr("transform", "rotate(" + rotval + ")");
	
	pieg.enter()
		.append("path")
		.attr("class", "arc")
		.attr("id", function(d, i){
			return "curve" + i;
		})
		.style("fill", function(d) { return color(d.data.cat); });
	
	labels = piegroup.selectAll(".label")
		.data(pie(visinfo));
		
	labels.enter()
		.append("text")
		.attr("class", "label")
		.style("text-anchor", "middle")
		.on("click", function(d) {rotateall(d);})
		.append("textPath")
		.attr("xlink:href", function(d, i){
			return "#curve" + i;
		})
		.attr("fill", "white")
		.text(function(d) { return d.data.name; });
	
			
		
	// **************************************************
	// Tool ini
	// **************************************************
	
	// Dynamically build filter list
	var listdata = classes.info.map(function(d){
			return {cat: d.cat, name: d.name};
		});
		
	var filterlist = d3.select("#filterlist")
		.append("ul")
		.selectAll("li")
		.data(listdata)
		.enter()
		.append("li")
		.html(function(d) {
			return " " + d.name
		})
		.append("input")
		.each(function() { this.parentNode.insertBefore(this, this.parentNode.firstChild); })
		.attr("type", "checkbox")
		.attr("checked", "checked")
		.attr("class", "cat_filter")
		.attr("name", function(d) {
			return d.cat
		});
	
	d3.select("#nodesearch").on("keyup", searchit);
	d3.selectAll(".cat_filter").on("click", filterit);
	
	
	// **************************************************
	// Prefilter
	// **************************************************
	filterit();
		
	d3.select("svg").style("background-image", "none");
			
});

/* **************************************************************
 * Functions 
 */
 
 
/*
 * Sets the transform, text anchor, and other items needed by both 
 * the initial setup and whenever a node is focued or unfocused
 */
function setnodevals()
{			
	node.attr("dx", nodedx)
		.attr("dy", ".31em")
		.attr("transform", nodetrans)
		.style("text-anchor", nodeanchor);			
}

/*
 * Node helper functions
 * We may need these elsewhere so separate them out from setnodevals
 */
 
function nodedx(d)
{
	return rotateit(d.x) < 180 ? labelheight : -labelheight;
}

function nodetrans(d)
{
	return "rotate(" + (rotateit(d.x - rotval) - 90) + ")translate(" + d.y + ")" + (rotateit(d.x) < 180 ? "" : "rotate(180)"); 
}

function nodeanchor(d)
{
	return rotateit(d.x) < 180 ? "start" : "end"; 
}


/* 
 * Rotate the entire vis
 * paramters:
 *    d: clicked label identifier
 */
function rotateall(d)
{
	arcdeg = (d.startAngle + d.endAngle) * 180/Math.PI;
	rotval = 270 - (arcdeg / 2);
	adjtime = centertime;
	svg.selectAll("#piegroup")
		.transition()
		.duration(adjtime)
		.attr("transform", "rotate(" + rotval + ")");
	svg.select("#links")
		.transition()
		.duration(adjtime)
		.attr("transform", "rotate(" + rotval + ")");
	svg.select("#nodes")
		.transition()
		.duration(adjtime)
		.attr("transform", "rotate(" + rotval + ")");
	setnodevals();
}

/* 
 * Rotation helper fuction
 * parameters: 
 *    deg: degree value to trandform
 * returns: rotated degree value
 */
function rotateit(deg)
{
	return (deg + rotval) % 360;
}

/*
 * Close the detail view and replace the node and links
 * parameter:
 *    d: detailed node
 */
function closeit(d)
{

	// Clear classes
	link
		.classed("link--target", false);
	
	node
		.classed("node--target", false);
	
	node.classed("current_focus", false);
	node.classed("current_link", false);
	link.classed("link--clicked", false);
	
	// Remove detail	
	if(d3.select("#detaildiv"))
	{
		d3.select("#detaildiv").remove();
		d3.select("#close").remove();
	}
	
	// Animate node and link returning to place
	d3.selectAll(".node")
		.transition()
		.duration(centertime)
		.attr("dx", nodedx)
		.attr("dy", ".31em")
		.attr("transform", nodetrans)
		.style("text-anchor", nodeanchor);

	d3.selectAll(".link")
		.transition()
		.duration(centertime)
		.attr("stroke", linkcolor)
		.attr("d", function(d) {return line(d);});
}

/*
 * Shorten the titles, but only on spaces 
 * parameters:
 *    title: string to be shortened
 */
 
function titletrim(title)
{
	var labelLimit = Math.ceil(labelRoom / 6.8); 
	
	if (title.length > labelLimit)
	{
		// Leave room in trimspot for ...
		trimspot = labelLimit - 3;
		while((title[trimspot] != " " || title[(trimspot - 1)] == "&") && trimspot > 0)
		{
			trimspot--;
		}
		// If there are no spaces in the short part of the title we don't want to return nothing so go the other way
		if (trimspot == 0)
		{
			while((title[trimspot] != " " || title[(trimspot - 1)] == "&") && trimspot < title.length)
			{
				trimspot++;
			}
		}
		return title.substring(0, trimspot) + "...";
	}
	return title; 
}

/* **************************************************************
 * Mouse actions for nodes/links
 */

function mouseovered(d) 
{
	node.each(function(n) { n.target = n.source = false; });
	
	link.classed("link--target", function(l) { 
			if (l.target === d) return l.source.source = true;
			if (l.source === d) return l.target.target = true;
		})
		.filter(function(l) { return l.target === d || l.source === d; })
		.each(function() { this.parentNode.appendChild(this); });
	
	node.classed("node--target", function(n) { 
			return (n.target || n.source); 
		});
}

function mouseouted(d) 
{
	link.classed("link--target", false);
	node.classed("node--target", false);
}

function clicked(d)
{
		
	// Clear some things
	// Return old node and link
	closeit(d);

	// Move Node and Link
	currclicked = d3.select(this)[0][0].__data__;
		
	link.classed("link--clicked", function(l) { if (l.target === d || l.source === d) return true; });
	
	d3.selectAll(".link--clicked")
		.transition()
		.duration(centertime)
		.attr("d", function(d){
			
			var temparray = new Array({x:0, y:0}, {x:0, y:0}, {x:0, y:0});
			
			
			temparray[1].x = d[1].x;
			temparray[1].y = d[1].y;
			
			if (d[0].name == currclicked.name)
			{
				temparray[0].x = 0;
				temparray[0].y = 0;
				temparray[2].x = d[2].x;
				temparray[2].y = d[2].y;
			}
			else
			{
				temparray[0].x = d[0].x;
				temparray[0].y = d[0].y;
				temparray[2].x = 0;
				temparray[2].y = 0;
			}
	
			return line(temparray);
		})
		.attr("stroke", function(d){
			if (d[0].name == currclicked.name)
			{
				return color(d[2].cat);
			}
			return color(d[0].cat);
		})
		.each(function() { this.parentNode.appendChild(this); });
		
	d3.select(this)
		.transition()
		.duration(centertime)
		.attr("transform", "rotate(0)translate(0, 0)rotate(" + (360 - rotval) + ")")
		.attr("dx", 0)
		.attr("dy", 0)
		.style("text-anchor", "middle");
		
	// Highlight current and connected nodes, to take over from mouseover	
	node.classed("current_link", function(n) { return (n.target || n.source); })
	d3.select(this).classed("current_focus", true);
	
	
	// Trigger Detail View
	var detailvalue = "<div id=\"paddiv\">" + d3.select(this)[0][0].__data__.summary + "</div>";
	
	detaildiv = detail2.append("xhtml:div")
		.attr("id", "detaildiv")
		.style({"height": function() { return (detailsize - 4)  + "px"}, "width": function() { return (detailsize - 4) + "px"}, "border" : function() { return "2px solid " + color(currclicked.cat);}, "overflow" : "auto", "opacity" : 0})
		.html(detailvalue);
	
	detaildiv.transition()
		.duration(centertime)
		.style({"opacity" : 1});
		
	// Draw close button
	// Wonder if there's a better way to do this...
	closebutton = d3.select("#closesvg")
		.append("g")
		.attr("id", "close")
		.attr("opacity", 0)
		.on("click", function(d) { closeit(d); });
		
	d3.select("#close").append("circle")
		.attr("cx", 12)
		.attr("cy", 12)
		.attr("stroke", color(d.cat))
		.attr("r", 10);
		
	d3.select("#close").append("line")
		.attr("x1", 7)
		.attr("y1", 7)
		.attr("x2", 17)
		.attr("y2", 17);
		
	d3.select("#close").append("line")
		.attr("x1", 17)
		.attr("y1", 7)
		.attr("x2", 7)
		.attr("y2", 17);
		
	closebutton.transition()
		.duration(centertime)
		.style({"opacity" : 1});
	
}


/* *******************************************************
 * Filter functions
 */
 
/*
 * As-you-type search
 */
function searchit()
{
		
	node.classed("highlight", false);
	node.attr("fill", function(d) { return color(d.cat); });
	var searchval = this.value.toLowerCase();
	var searched;
	if(searchval.length > 2)
	{
		searched = node.filter(function(d){
			if (d.title.toLowerCase().indexOf(searchval) != -1)
			{
				return d;
			}
		});
		
		searched.classed("highlight", true);
		searched.attr("fill", function(d) { return colorhigh(d.cat); });
	}
	
	
}

/*
 * Show and hide categories
 */
function filterit()
{

	// Figure out what types we're keeping
	var keep = d3.selectAll('.cat_filter:checked')[0].map(function(d)
		{
			return(d.name);
		});	
	
	// Don't allow fewer than two selections
	if (d3.selectAll('.cat_filter:checked')[0].length <= 2)
	{
		d3.selectAll('.cat_filter:checked')
			.attr("disabled", true);
	}
	
	// But also give them back once others have been added
	if (d3.selectAll('.cat_filter:checked')[0].length > 2)
	{
		d3.selectAll('.cat_filter')
			.attr("disabled", null);
	}
		
	// Filter out nodes not of that types
	var keepraw = rawnodes.filter(function(d){
		if (keep.indexOf(d.cat) != -1 && d.cat)
		{
			return d;
		}
	});
	
	var keepinfo = rawinfo.filter(function(d){
		if (keep.indexOf(d.cat) != -1)
		{
			return d;
		}
	});
	
	// Reset the nodes and links
	nodes = cluster.nodes(packageHierarchy(keepraw));
	links = packageImports(nodes);	
	
	node = node.data(nodes.filter(function(n) { return !n.children; }), function(d){ return d.key; });
		
	links = links.filter(function(d) {
		if (d.source && d.target)
		{
			return d;
		}
	});
		
	link = link.data(bundle(links), function(d, i){ return i; });
	
	// reset the pie
	pieg = pieg.data(pie(keepinfo), function(d){ return d.data.cat; });
	labels = labels.data(pie(keepinfo), function(d){ return d.data.cat; });
		
	if (!this.checked)
	{
		// take items away		
		node.exit().remove();
		link.exit().remove();
		labels.exit().remove();
		pieg.exit().remove();
			
	}
	else
	{
		//add items back
		node.enter()
			.append("text")
			.attr("class", "node")
			.attr("fill", function(d) { 
				return color(d.cat); 
			})
			.attr("font-size", fontsize)
			.text(function(d) { return titletrim(d.title); })
			.on("mouseover", mouseovered)
			.on("mouseout", mouseouted)
			.on("click", clicked);
			
		node.append("title").text(function(d) { return d.title; });
		
		link.enter().append("path");
		
		pieg.enter()
			.append("path")
			.attr("d", arc)
			.attr("class", "arc")
			.attr("id", function(d, i){
				return "curve" + i;
			})
			.style("fill", function(d) { return color(d.data.cat); });
			
		labels.enter()
			.append("text")
			.attr("class", "label")
			.style("text-anchor", "middle")
			.on("click", function(d) {rotateall(d);})
			.append("textPath")
			.attr("xlink:href", function(d, i){
				return "#curve" + i;
			})
			.attr("fill", "white")
			.text(function(d) { return d.data.name; });
			
	}
	
	// Changes settings for remaining or entered items

	pieg.attr("d", arc);
	labels.attr("dy", function(d){
			return (labelheight / 2) - 1;
		})
		.attr("dx", function(d){
			return innerRadius * Math.PI * (d.value/nodes.length) + 5;
		});
	
	link.each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
		.attr("class", "link")
		.attr("stroke", linkcolor)
		.attr("d", line);
		
	setnodevals();		
}

/* ********************************************************
 * All code following is borrowed from http://bl.ocks.org/mbostock/7607999 
 * for bundling the edges
 */
function packageHierarchy(classes) {
	var map = {};
	
	function find(name, data) {
		var node = map[name], i;
		if (!node) {
			node = map[name] = data || {name: name, children: []};
			if (name.length) {
				node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
				node.parent.children.push(node);
				node.key = name.substring(i + 1);
			}
		}
		return node;
	}

	classes.forEach(function(d) {
		find(d.name, d);
	});

	return map[""];
}

function packageImports(nodes) {
	var map = {},
		imports = [];
	
	// Compute a map from name to node.
	nodes.forEach(function(d) {
		map[d.name] = d;
	});
	
	// For each import, construct a link from the source to target node.
	nodes.forEach(function(d) {
		if (d.imports) d.imports.forEach(function(i) {
			imports.push({source: map[d.name], target: map[i]});
		});
	});
	
	return imports;
}


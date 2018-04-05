/*global define, module, exports, require */

var envd3 = {
    version: "1.0.0"
};

function Chart(config) {
    // var $$ = this.internal = new ChartInternal(this);
    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);
    //alert(series);alert(xaxis);
    // alert(type);
    // alert(json_data);
    //if (charttype == "column") {
    //	columnchart(config);
    //}
    //alert(charttype);

    if (charttype == "column") {
        //  alert("hai");
        Groupedchartwithline(config);
    }
    else if (charttype == "bar") {
        barchart(config);
    }
    else if (charttype == "line") {
        //linechart(config);
        Groupedchartwithline(config);
    }
    else if (charttype == "stackedcolumn") {
        //stackedcolumn(config);
        Stackedchartwithline(config)
    }
    else if (charttype == "pie") {
        piechart(config);

    } else if (charttype == "doughnut") {
        doghnuchart(config);

    }
    else if (charttype == "funnel") {
        funnelchart(config);
    }
    else if (charttype == "pyramid") {
        pyramidchart(config);
    }
}

envd3.chart = function (config) {
    return new Chart(config);

};


function columnchart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    // width = 960 - 40 - 20 = 900
    // height = 500 - 20 - 30 = 450
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    }, width = chartwidth
    height = chartheight
    // alert(width);
    // alert(height);
    width = width - margin.left - margin.right, height = height
			- margin.top - margin.bottom;

    // Information on ordinal scales can be found at:
    // https://github.com/mbostock/d3/wiki/Ordinal-Scales
    // An ordinal scale that sets the output range from the specified
    // continuous interval (that is, [0, width]).
    // The array interval contains two elements representing the min and max
    // numeric values.
    // This interval is subdivided into n evenly-spaced bands, where n is
    // the number of (unique) values in the domain.
    // The bands may be offset from the edge of the interval and other bands
    // according to the specifided padding,
    // which defaults to zero.
    // The padding is typically in the range [0,1] (0.1 in this example) and
    // corrseponds to the amount of space
    // in the range interval to allocate to padding.
    // A value of 0.5 means that the band width will be equal to the padding
    // width.
    var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    // Constructs a new ordinal scale with an empty domain and an empty
    // range.
    // The ordinal scale is invalid (always returning undefined) until an
    // output range is specified).
    var x1 = d3.scale.ordinal();

    // Information on linear scales can be found at:
    // https://github.com/mbostock/d3/wiki/Quantitative-Scales
    // Quantitative scales have a continuous domain, such as the set of real
    // numbers, or dates.
    // Linear scales are a type of quantitative scale.
    // Linear scales are the most common scale, and a good default choice to
    // map a continuous input domain to a
    // continous output range.
    // The mapping is linear in that the output range value y can be
    // expressed as a linear function of the
    // input domain value x: y = mx + b.
    // The input domain is typically a dimension of the data that you want
    // to visualize, such as the height of
    // students (measured in meters) in a sample population.
    // The output range is typically a dimension of the desired output
    // visualization, such as the height of bars
    // (measured in pixels) in a histogram.

    // This will set up our y height scale.
    var y = d3.scale.linear().range([height, 0]);

    // Colors of the graph.
    //
    // First : Total flights #097054 (green)
    // Second : Completed flights #6599FF (blue)
    // Third : Cancelled flights #FFDE00 (yellow)
    // Fourth : Aborted flights #FF9900 (orange)
    var color = d3.scale.ordinal().range(
			["#1F77B4", "#FF7F0E", "#AB1F20", "#71B37C", "#EC932F",
					"#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F",
					"#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7",
					"#1F497D", "#4E97BC"]);

    // Set up the xAxis to use our x0 scale and be oriented on the bottom.
    var xAxis = d3.svg.axis().scale(x0).orient("bottom");
    // We don't worry about tickFormat here, as the ticks will be determined
    // by the data.

    // Set up the yAxis to use our y scale and be oriented on the left.
    // Additionally, set the tick format to display appropriate labels on
    // the axis (taking out for now).
    var yAxis = d3.svg.axis().scale(y).orient("left");
    // .tickFormat(d3.format(".2s"));

    // Set up the svg canvas with the width and height we calculated
    // earlier.

    // var svg = d3.select("svg")
    var svg = d3.select(config.bindto).attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).append("g").attr(
			"transform",
			"translate(" + margin.left + "," + margin.top + ")");

    // Move it to the right margin.left pixels, and move it down margin.top
    // pixels

    // var seriesNames = [];
    // seriesNames.push("Completed"); seriesNames.push("Canceled");

    json_data.forEach(function (d) {
        d.Series = series.map(function (name) {
            return {
                name: name,
                value: +d[name]
            };
        });
        // alert("hi --- " + JSON.stringify(d.Series));
    });
    // var xaxisNames = [];
    // xaxisNames.push("MMM"); xaxisNames.push("YEAR");

    //	json_data.forEach(function(d) {
    //		d.XValues = xaxis.map(function(name) {
    //			return {
    //				name : name,
    //				value : +d[name]
    //			};
    //		});
    //		// alert("hi --- " + JSON.stringify(d.Series));
    //	});
    // alert(JSON.stringify(data));

    x0.domain(json_data.map(function (d) {
        return d[xaxis[0]];
    }));
    //alert(series);
    // x0.domain(data.map(function (d) { return d.MMM + " " + d.YEAR; }));
    x1.domain(series).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, (10 + d3.max(json_data, function (d) {
        return d3.max(d.Series, function (d) {
            return d.value;
        });
    }))]);

    // The axis business
    svg.append("g").attr("class", "x axis").attr("transform",
			"translate(0," + height + ")").call(xAxis).selectAll("text")
			.style("text-anchor", "end").attr("dx", "1.0em").attr("dy",
					"1.0em").attr("transform", "rotate(0)");
    ;

    svg.append("g").attr("class", "y axis").call(yAxis).append("text")
			.attr("transform", "rotate(-90)").attr("y", 6).attr("dy",
					".71em").style("text-anchor", "end")
			.text("# of Series");

    // From this point to...

    // var state = svg.selectAll(".state")
    // .data(data)
    // .enter().append("g")
    // .attr("class", "g")
    // .attr("transform", function (d) { return "translate(" + x0(d.State) +
    // ",0)"; });
    //alert("ss")
    var state = svg.selectAll(".state").data(json_data).enter().append("g")
			.attr("class", "g").attr("transform", function (d) {
			    return "translate(" + x0(d[xaxis[0]]) + ",0)";
			});
    //alert("ss")
    // alert(JSON.stringify(d.Series[0]));
    state.selectAll("rect").data(function (d) {
        return d.Series;
    }).enter().append("rect").attr("class", "bar").attr("width",
			x1.rangeBand()).attr("x", function (d) {
			    return x1(d.name);
			}).attr("y", function (d) {
			    return y(d.value);
			}).attr("height", function (d) {
			    return height - y(d.value);
			}).style("fill", function (d) {
			    return color(d.name);
			})
			.on(
					"mouseover",
					function (d, i) {
					    // make all bars opaque
					    // fade(.2, d);
					    d3.select(this).style("opacity", 0.6);
					    // ... normal tooltip..///
					    d3.select("#tooltip").style("left",
								(d3.event.pageX) + "px").style("top",
								(d3.event.pageY - 28) + "px")
					    // .select("#cpcVal")
					    // .text(d.value);
					    d3.select("#tooltip").select("#volVal")
								.html(
										("<span style='color:green'>"
												+ d.value + "</span>"));
					    d3.select("#tooltip").select("#keyword")
						// .style("color", colors[1][1])
						.html(
								"<span style='color:red'>" + d.name
										+ "</span>");
					    d3.select("#tooltip").classed("hidden", false);
					    // ... normal tooltip..///
					    // ... d3.tip tooltip..///
					    // var tip = d3.tip()
					    // .attr('class', 'd3-tip')
					    // .offset([-10, 0])
					    // .html(function () {
					    // return "<strong>" + d.name + ":</strong> <span
					    // style='color:red'>" + d.value + "</span>";
					    // });
					    // d3.tip.show;
					    // ... d3.tip tooltip..///
					}).on("mouseout", function (d) {
					    // fade(1, d);
					    // //... normal tooltip..///
					    d3.select("#tooltip").classed("hidden", true);
					    // //... normal tooltip..///

					    // //... d3.tip tooltip..///
					    // d3.tip.hide;
					    // //... d3.tip tooltip..///
					    d3.select(this).style("opacity", 1);
					});

    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("rect.bar").filter(function (e) {
            return e.name !== d;
        }).transition().style("opacity", opacity);
    }
    ;
    var legend = svg.selectAll(".legend")
	// .data(series.slice().reverse())
	.data(series.slice()).enter().append("g").attr("class", "legend").attr(
			"transform", function (d, i) {
			    return "translate(0," + i * 20 + ")";
			});

    legend.append("rect").attr("x", width - 18).attr("width", 18).attr(
			"height", 18).style("fill", color).on("mouseover",
			function (d, i) {
			    fade(.2, d);
			}).on("mouseout", function (d, i) {
			    fade(1, d);
			});

    legend.append("text").attr("x", width - 24).attr("y", 9).attr("dy",
			".35em").style("text-anchor", "end").text(function (d) {
			    return d;
			}).on("click", function (d) {
			    alert(d);
			});
}

function barchart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;


    var chartstyleprop = JSON.parse(config.chartstyleprop);
    var chartTitle = chartstyleprop[0].charttitle;
    var charttitlecolor = chartstyleprop[0].charttitlecolor;
    var charttitlefontstyle = chartstyleprop[0].charttitlefontstyle;
    var charttitlefontsize = chartstyleprop[0].charttitlefontsize;


    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    function verticalWrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }


    //var margin = {top: (parseInt(d3.select('body').style('height'), 10)/20), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/20), left: (parseInt(d3.select('body').style('width'), 10)/10)},
    //        width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    //        height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    }, width = chartwidth
    height = chartheight
    // alert(width);
    // alert(height);
    width = width - margin.left - margin.right, height = height
            - margin.top - margin.bottom;

    var y0 = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .2, 0.5);

    var y1 = d3.scale.ordinal();

    var x = d3.scale.linear()
            .range([0, width]);

    //var colorRange = d3.scale.category20();
    //var color = d3.scale.ordinal()
    //        .range(colorRange.range());
    var color = d3.scale.ordinal().range(
			["#1F77B4", "#FF7F0E", "#AB1F20", "#71B37C", "#EC932F",
					"#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F",
					"#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7",
					"#1F497D", "#4E97BC"]);
    var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(-height)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y0)
            .orient("left");
    //.tickFormat(d3.format(".2s"));

    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");


    var svg = d3.select(config.bindto)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //var options = d3.keys(dataset[0]).filter(function(key) { return key !== "label"; });

    //dataset.forEach(function(d) {
    //    d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
    //});

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2.5))
        .attr("text-anchor", "middle")
        .style("font-size", charttitlefontsize + "px")
        .style("font-family", charttitlefontstyle)
        .style("fill", charttitlecolor)
        .style("text-decoration", "underline")
        .text(chartTitle);


    json_data.forEach(function (d) {
        d.Series = series.map(function (name) {
            return {
                name: name,
                value: +d[name]
            };
        });
        // alert("hi --- " + JSON.stringify(d.Series));
    });
    y0.domain(json_data.map(function (d) {
        return d[xaxis[0]];
    }));

    // x0.domain(data.map(function (d) { return d.MMM + " " + d.YEAR; }));
    y1.domain(series).rangeRoundBands([0, y0.rangeBand()]);

    x.domain([0, (10 + d3.max(json_data, function (d) {
        return d3.max(d.Series, function (d) {
            return d.value;
        });
    }))]);
    //y0.domain(dataset.map(function(d) { return d.label; }));
    //y1.domain(options).rangeRoundBands([0, y0.rangeBand()]);
    //x.domain([0, d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 15)
    .style("font-size", chartstyleprop[0].xtitlefontsize + "px")
    .style("font-family", chartstyleprop[0].xtitlestyle)
    .style("fill", chartstyleprop[0].xtitlecolor)
    .text(chartstyleprop[0].xaxistitle);
    ///
    //chart Y- Axis properties   
    ///
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("x", -77)
        .attr("dy", "-3.8em")
        .style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].ytitlefontsize + "px")
        .style("font-family", chartstyleprop[0].ytitlestyle)
        .style("fill", chartstyleprop[0].ytitlecolor)
        .text(chartstyleprop[0].yaxistitle);


    svg.selectAll(".y.axis .tick text")
            .call(verticalWrap, y0.rangeBand());

    var bar = svg.selectAll(".bar")
            .data(json_data)
            .enter().append("g")
            .attr("class", "rect")
            .attr("transform", function (d) { return "translate( 0," + y0(d[xaxis[0]]) + ")"; });

    var bar_enter = bar.selectAll("rect")
            .data(function (d) { return d.Series; })
            .enter()


    bar_enter.append("rect")
            .attr("height", y1.rangeBand())
            .attr("y", function (d) { return y1(d.name); })
            .attr("x", function (d) { return 0; })
            .attr("value", function (d) { return d.name; })
            .attr("width", function (d) { return x(d.value); })
            .style("fill", function (d) { return color(d.name); });

    bar_enter.append("text")
            .attr("x", function (d) { return x(d.value) + 5; })
            .attr("y", function (d) { return y1(d.name) + (y1.rangeBand() / 2); })
            .attr("dy", ".35em")
            .text(function (d) { return d.value; });

    bar
            .on("mouseenter", function (d) {
                divTooltip.style("left", d3.event.pageX + 10 + "px");
                divTooltip.style("top", d3.event.pageY - 25 + "px");
                divTooltip.style("display", "inline-block");
                divTooltip.style("z-index", "999999");
                var x = d3.event.pageX, y = d3.event.pageY
                var elements = document.querySelectorAll(':hover');
                l = elements.length
                l = l - 1
                elementData = elements[l].__data__
                divTooltip.html((d.label) + "<br>" + elementData.name + "<br>" + elementData.value + "%");
            });
    bar
            .on("mouseout", function (d) {
                divTooltip.style("display", "none");
            });
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("g.rect").selectAll("rect").filter(function (e) {
            //alert(e.name);alert(d);
            return e.name !== d;
        }).transition().style("opacity", opacity);
    }
    var legend = svg.selectAll(".legend")
            .data(series.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color).on("mouseover",
			function (d, i) {
			    fade(.2, d);
			}).on("mouseout", function (d, i) {
			    fade(1, d);
			});

    legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .style("font-size", chartstyleprop[0].LegendFontSize + "px")
            .style("font-family", chartstyleprop[0].LegendFontStyle)
            .text(function (d) { return d; });
}

function linechart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    var svg = d3.select(config.bindto),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    //var parseTime = d3.timeParse("%Y");

    var parseTime = d3.time.format("%Y").parse;

    var bisectDate = d3.bisector(function (d) { return d.year; }).left;
    // d3 v4
    //var x = d3.scaleTime().range([0, width]);
    //var y = d3.scaleLinear().range([height, 0]);

    // Set the ranges d3 v3
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(10);
    // d3 v4
    //var line = d3.svg.line()
    // d3 v3
    var line = d3.svg.line()
        //.x(function(d) { return x(d.year); })
        .y(function (d) { return y(d.value); });

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.json("data.json", function(error, data) {
    //if (error) throw error;

    json_data.forEach(function (d) {
        d.year = parseTime(d.year);
        d.value = +d.value;
    });

    //x.domain(d3.extent(json_data, function(d) { return d.year; }));
    y.domain([d3.min(json_data, function (d) { return d.value; }) / 1.005, d3.max(json_data, function (d) { return d.value; }) * 1.005]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        //.call(d3.axisBottom(x));
		.call(xAxis);

    g.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis.tickFormat(function (d) { return parseInt(d / 1000) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Population)");

    g.append("path")
        .datum(json_data)
        .attr("class", "line")
        .attr("d", line);

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
      	.attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () { focus.style("display", null); })
        .on("mouseout", function () { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(json_data, x0, 1),
            d0 = json_data[i - 1],
            d1 = json_data[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
        focus.select("text").text(function () { return d.value; });
        focus.select(".x-hover-line").attr("y2", height - y(d.value));
        focus.select(".y-hover-line").attr("x2", width + width);
    }
}

function stackedcolumn(config) {
    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    //		var xaxisNames=[];var seriesNames=[];
    //		seriesNames.push("Not Satisfied");
    //		seriesNames.push("Not Much Satisfied");
    //		seriesNames.push("Satisfied");
    //		seriesNames.push("Very Satisfied");
    //
    //		xaxisNames.push("label");


    //var margin = {top: (parseInt(d3.select('body').style('height'), 10)/20), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/6), left: (parseInt(d3.select('body').style('width'), 10)/20)},
    //       width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    //        height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    }, width = chartwidth
    height = chartheight
    // alert(width);
    // alert(height);
    width = width - margin.left - margin.right, height = height
            - margin.top - margin.bottom;

    //	 var margin = {
    //		top: (parseInt(d3.select(config.bindto).style('height'), 10)/20),
    //		right: (parseInt(d3.select(config.bindto).style('width'), 10)/20),
    //		bottom: (parseInt(d3.select(config.bindto).style('height'), 10)/6),
    //		left: (parseInt(d3.select(config.bindto).style('width'), 10)/20)},
    //	            width = parseInt(d3.select(config.bindto).style('width'), 10) - margin.left - margin.right,
    //	            height = parseInt(d3.select(config.bindto).style('height'), 10) - margin.top - margin.bottom;


    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1, .3);
    var y = d3.scale.linear()
            .rangeRound([height, 0]);
    //var colorRange = d3.scale.category20();
    //var color = d3.scale.ordinal()
    //        .range(colorRange.range());

    var color = d3.scale.ordinal().range(
                ["#1F77B4", "#FF7F0E", "#AB1F20", "#71B37C", "#EC932F",
                        "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F",
                        "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7",
                        "#1F497D", "#4E97BC"]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));
    var svg = d3.select(config.bindto)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");


    //color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "label"; }));

    json_data.forEach(function (d) {
        var y0 = 0;
        d.values = series.map(function (name) { return { name: name, y0: y0, y1: y0 += +d[name] }; });
        d.total = d.values[d.values.length - 1].y1;
    });


    x.domain(json_data.map(function (d) { return d[xaxis[0]]; }));
    y.domain([0, d3.max(json_data, function (d) { return d.total; })]);


    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 9)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("");
    var bar = svg.selectAll(".label")
            .data(json_data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + x(d[xaxis[0]]) + ",0)"; });
    svg.selectAll(".x.axis .tick text")
            .call(wrap, x.rangeBand());

    var bar_enter = bar.selectAll("rect")
    .data(function (d) { return d.values; })
    .enter();

    bar_enter.append("rect")
	    .attr("width", x.rangeBand())
	    .attr("y", function (d) { return y(d.y1); })
	    .attr("height", function (d) { return y(d.y0) - y(d.y1); })
	    .style("fill", function (d) { return color(d.name); });

    bar_enter.append("text")
	    .text(function (d) { return d3.format(".2s")(d.y1 - d.y0) + "%"; })
	    .attr("y", function (d) { return y(d.y1) + (y(d.y0) - y(d.y1)) / 2; })
	    .attr("x", x.rangeBand() / 3)
	    .style("fill", '#ffffff');

    bar
            .on("mousemove", function (d) {
                divTooltip.style("left", d3.event.pageX + 10 + "px");
                divTooltip.style("top", d3.event.pageY - 25 + "px");
                divTooltip.style("display", "inline-block");
                divTooltip.style("z-index", "999999");
                var elements = document.querySelectorAll(':hover');
                l = elements.length
                l = l - 1
                element = elements[l].__data__
                value = element.y1 - element.y0
                divTooltip.html((d[xaxis[0]]) + "<br>" + element.name + "<br>" + value + "%");
            });
    bar
            .on("mouseout", function (d) {
                divTooltip.style("display", "none");
            });
    svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(0," + (height + 30) + ")");
    // var legend = d3.legend.color()
    //         .shapeWidth(height/4)
    //         .shapePadding(10)
    //         .orient('horizontal')
    //         .scale(color);
    // svg.select(".legendLinear")
    //        .call(legend);
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("g.g").selectAll("rect").filter(function (e) {
            //alert(e.name);alert(d);
            return e.name !== d;
        }).transition().style("opacity", opacity);
    }
    var legend = svg.selectAll(".legend")
    //.data(seriesNames.slice().reverse())
    .data(series.slice().reverse())
.enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(10," + i * 20 + ")"; });

    legend.append("rect")
	    .attr("x", width - 18)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", color).on("mouseover",
					function (d, i) {
					    fade(.2, d);
					}).on("mouseout", function (d, i) {
					    fade(1, d);
					});

    legend.append("text")
	    .attr("x", width - 24)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "end")
	    .text(function (d) { return d; })
	    .on("click", function (d) {
	        alert(d);
	    });
}

function piechart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartstyleprop = JSON.parse(config.chartstyleprop);
    var chartTitle = chartstyleprop[0].charttitle;
    var charttitlecolor = chartstyleprop[0].charttitlecolor;
    var charttitlefontstyle = chartstyleprop[0].charttitlefontstyle;
    var charttitlefontsize = chartstyleprop[0].charttitlefontsize;


    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    var width = chartwidth;
    var height = chartheight;
    var totalRadius = Math.min(width, height) / 2
    var donutHoleRadius = totalRadius * 0.5
    var color = d3.scale.category10()

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    }

    var svg = d3.select(config.bindto).attr('width', width).attr('height',
			height).append('g')
	// .attr('transform', `translate(${width / 2}, ${height / 2})`)
	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')


    svg.append("text")
       .attr("x", 0)
       .attr("y", 0 - ((height - 20) / 2))
       //.attr("y", 0)
       .attr("text-anchor", "middle")
       .style("font-size", charttitlefontsize + "px")
       .style("font-family", charttitlefontstyle)
       .style("fill", charttitlecolor)
       .style("text-decoration", "underline")
       .text(chartTitle);

    //alert(chartTitle);

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labelName");
    svg.append("g").attr("class", "labelValue");
    svg.append("g").attr("class", "lines");

    //var arc = d3.svg.arc().innerRadius(totalRadius - donutHoleRadius)
    //		.outerRadius(totalRadius)
    var arc = d3.svg.arc().innerRadius(0).outerRadius(totalRadius)
    var div = d3.select("body").append("div").attr("class", "toolTip");

    // var pie = d3.layout.pie()
    // .value((d) => d.acres)
    // .sort(null)

    var pie = d3.layout.pie().sort(null).value(function (d) {
        return d[series[0]];
    });

    var path = svg.selectAll('path').data(pie(json_data)).enter().append(
			'path').attr('d', arc)
	// .attr('fill', (d, i) => color(d.data.name))
	.style("fill", function (d, i) {
	    //alert(d.data[xaxis[0]]);
	    return color(d.data[xaxis[0]]);

	})

    //path.transition().duration(1000).attrTween("d", function (d) {

    //    var i = d3.interpolate(this._current, d);
    //    this._current = i(0);
    //    return function (t) {
    //        return arc(i(t));
    //    };

    //    this._current = this._current || d;
    //    var interpolate = d3.interpolate(this._current, d);
    //    this._current = interpolate(0);
    //    return function (t) {
    //        return arc(interpolate(t));
    //    };
    //})

    path.transition().duration(1000).attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            return arc(interpolate(t));
        };
    })

    path.on("mouseenter", function (d) {
        div.style("left", d3.event.pageX + 10 + "px");
        div.style("top", d3.event.pageY - 25 + "px");
        div.style("display", "inline-block");
        div.html((d.data[xaxis[0]]) + "<br>" + (d.data[series[0]]) + "");
        d3.select(this).attr("stroke", "white").transition().duration(2000)
		// .attr("d", arcOver)
		.attr("stroke-width", 8);
    });
    path.on("mouseout", function (d) {
        div.style("display", "none");
        d3.select(this).transition().attr("d", arc).attr("stroke", "none");
    });

    // path.exit().remove();
    //for donut innerradius is mandatory
    //var arc = d3.svg.arc().outerRadius(totalRadius * 0.8).innerRadius(totalRadius * 0.4);
    // for pie set innerradius as zero
    var arc = d3.svg.arc().outerRadius(totalRadius * 0.8).innerRadius(totalRadius * 0);


    var outerArc = d3.svg.arc().innerRadius(totalRadius * 0.9).outerRadius(
			totalRadius * 0.9);

    var legendItemSize = 18
    var legendSpacing = 4
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("path").filter(function (e) {
            //alert(JSON.stringify(e));
            //alert(e.data[xaxis[0]]);
            //alert(d);
            return e.data[xaxis[0]] !== d;
        }).transition().style("opacity", opacity);
    };
    var legend = svg.selectAll('.legend').data(color.domain()).enter()
			.append('g').attr('class', 'legend').attr('transform',
					function (d, i) {
					    var height = legendItemSize + legendSpacing
					    var offset = height * color.domain().length / 2
					    var x = legendItemSize * 19;
					    var y = (i * height) - offset - 10;
					    // return `translate(${x}, ${y})`
					    return 'translate(' + x + ',' + y + ')';
					})

    legend.append('rect').attr('width', legendItemSize).attr('height',
			legendItemSize).style('fill', color).on("mouseover",
			function (d, i) {
			    fade(.2, d);
			}).on("mouseout", function (d, i) {
			    fade(1, d);
			});

    legend.append('text')
        .attr('x', legendItemSize + legendSpacing)
        .attr('y', legendItemSize - legendSpacing)
        //.style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].LegendFontSize + "px")
        .style("font-family", chartstyleprop[0].LegendFontStyle)
        .text(function (d) { return d; })


    /* ------- TEXT LABELS ------- */

    var text = svg.select(".labelName").selectAll("text").data(
			pie(json_data), function (d) {
			    return d.data[xaxis[0]];
			});

    text.enter().append("text").attr("dy", ".35em").text(function (d) {
        return (d.data[xaxis[0]] + ": " + d.data[series[0]] + "");
    });

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000).attrTween("transform", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = totalRadius * (midAngle(d2) < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
        };
    }).styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start" : "end";
        };
    }).text(function (d) {
        return (d.data[xaxis[0]] + ": " + d.data[series[0]] + "");
    });

    text.exit().remove();

    /* ------- SLICE TO TEXT POLYLINES ------- */

    var polyline = svg.select(".lines").selectAll("polyline").data(pie(json_data), function (d) {
        return d.data[xaxis[0]]
    });

    polyline.enter().append("polyline");

    polyline.transition().duration(1000).attrTween("points", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = totalRadius * 0.95
                    * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2),
                    outerArc.centroid(d2), pos];
        };
    });

    polyline.exit().remove();

}

function doghnuchart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);


    var width = chartwidth;
    var height = chartheight;
    var totalRadius = Math.min(width, height) / 2
    var donutHoleRadius = totalRadius * 0.5
    var color = d3.scale.category10()

    var svg = d3.select(config.bindto).attr('width', width).attr('height',
			height).append('g')
	// .attr('transform', `translate(${width / 2}, ${height / 2})`)
	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labelName");
    svg.append("g").attr("class", "labelValue");
    svg.append("g").attr("class", "lines");

    var arc = d3.svg.arc().innerRadius(totalRadius - donutHoleRadius)
			.outerRadius(totalRadius)
    var div = d3.select("body").append("div").attr("class", "toolTip");

    // var pie = d3.layout.pie()
    // .value((d) => d.acres)
    // .sort(null)

    var pie = d3.layout.pie().sort(null).value(function (d) {
        return d[series[0]];
    });

    var path = svg.selectAll('path').data(pie(json_data)).enter().append(
			'path').attr('d', arc)
	// .attr('fill', (d, i) => color(d.data.name))
	.attr("fill", function (d, i) {
	    // alert(d.data[xaxis[0]]);
	    return color(d.data[xaxis[0]]);

	})

    path.transition().duration(1000).attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            return arc(interpolate(t));
        };
    })
    path.on("mouseenter", function (d) {
        div.style("left", d3.event.pageX + 10 + "px");
        div.style("top", d3.event.pageY - 25 + "px");
        div.style("display", "inline-block");
        div.html((d.data[xaxis[0]]) + "<br>" + (d.data[series[0]]) + "");
        d3.select(this).attr("stroke", "white").transition().duration(2000)
		// .attr("d", arcOver)
		.attr("stroke-width", 8);
    });
    path.on("mouseout", function (d) {
        div.style("display", "none");
        d3.select(this).transition().attr("d", arc).attr("stroke", "none");
    });

    // path.exit().remove();

    var arc = d3.svg.arc().outerRadius(totalRadius * 0.8).innerRadius(
			totalRadius * 0.4);

    var outerArc = d3.svg.arc().innerRadius(totalRadius * 0.9).outerRadius(
			totalRadius * 0.9);

    var legendItemSize = 18
    var legendSpacing = 4
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("path").filter(function (e) {
            // alert(JSON.stringify(e));
            // alert(e.name);
            // alert(d);
            return e.data[xaxis[0]] !== d;
        }).transition().style("opacity", opacity);
    }
    ;
    var legend = svg.selectAll('.legend').data(color.domain()).enter()
			.append('g').attr('class', 'legend').attr('transform',
					function (d, i) {
					    var height = legendItemSize + legendSpacing
					    var offset = height * color.domain().length / 2
					    var x = legendItemSize * 19;
					    var y = (i * height) - offset - 10;
					    // return `translate(${x}, ${y})`
					    return 'translate(' + x + ',' + y + ')';
					})

    legend.append('rect').attr('width', legendItemSize).attr('height',
			legendItemSize).style('fill', color).on("mouseover",
			function (d, i) {
			    fade(.2, d);
			}).on("mouseout", function (d, i) {
			    fade(1, d);
			});

    legend.append('text').attr('x', legendItemSize + legendSpacing).attr(
			'y', legendItemSize - legendSpacing).text(function (d) {
			    return d;
			})

    /* ------- TEXT LABELS ------- */

    var text = svg.select(".labelName").selectAll("text").data(
			pie(json_data), function (d) {
			    return d.data[xaxis[0]]
			});

    text.enter().append("text").attr("dy", ".35em").text(function (d) {
        return (d.data[xaxis[0]] + ": " + d.data[series[0]] + "");
    });

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000).attrTween("transform", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = totalRadius * (midAngle(d2) < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
        };
    }).styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start" : "end";
        };
    }).text(function (d) {
        return (d.data[xaxis[0]] + ": " + d.data[series[0]] + "");
    });

    text.exit().remove();

    /* ------- SLICE TO TEXT POLYLINES ------- */

    var polyline = svg.select(".lines").selectAll("polyline").data(
			pie(json_data), function (d) {
			    return d.data[xaxis[0]]
			});

    polyline.enter().append("polyline");

    polyline.transition().duration(1000)
			.attrTween(
					"points",
					function (d) {
					    this._current = this._current || d;
					    var interpolate = d3.interpolate(this._current, d);
					    this._current = interpolate(0);
					    return function (t) {
					        var d2 = interpolate(t);
					        var pos = outerArc.centroid(d2);
					        pos[0] = totalRadius * 0.95
									* (midAngle(d2) < Math.PI ? 1 : -1);
					        return [arc.centroid(d2),
									outerArc.centroid(d2), pos];
					    };
					});

    polyline.exit().remove();

}
function funnelchart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    var options = {
        // width of the chart;
        // defaults to container's width (if non-zero)
        //var chartwidth = parseInt(config.chartwidth);
        //var chartheight = parseInt(config.chartheight);				
        width: chartwidth,
        // height of the chart;
        // defaults to container's height (if non-zero)
        height: chartheight,
        // The percent of total width the bottom should be
        bottomWidth: 1 / 3,
        // How many sections to pinch
        bottomPinch: 0,
        // Whether the funnel is curved
        isCurved: false,
        // The curvature amount
        curveHeight: 20,
        // Either "solid" or "gradient"
        fillType: "solid",
        // Whether the funnel is inverted
        isInverted: false,
        // Whether the funnel has effects on hover
        hoverEffects: true,
        // Whether the funnel should calculate the blocks by
        // the count values rather than equal heights
        dynamicArea: false,
        label: {
            // Any valid font size
            fontSize: "14px"
        }
    };
    // chart.draw(data, options);

    var funnel = new D3Funnel(json_data, options);
    funnel.draw(config.bindto);

}

function pyramidchart(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var series = config.series;
    var json_data = config.data;

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    var options = {
        // width of the chart;
        // defaults to container's width (if non-zero)

        //var chartwidth = parseInt(config.chartwidth);
        //var chartheight = parseInt(config.chartheight);

        width: chartwidth,
        // height of the chart;
        // defaults to container's height (if non-zero)
        height: chartheight,
        // The percent of total width the bottom should be
        bottomWidth: 1 / 3,
        // How many sections to pinch
        bottomPinch: 0,
        // Whether the funnel is curved
        isCurved: false,
        // The curvature amount
        curveHeight: 20,
        // Either "solid" or "gradient"
        fillType: "solid",
        // Whether the funnel is inverted
        isInverted: true,
        // Whether the funnel has effects on hover
        hoverEffects: true,
        // Whether the funnel should calculate the blocks by
        // the count values rather than equal heights
        dynamicArea: false,
        label: {
            // Any valid font size
            fontSize: "14px"
        }
    };
    // chart.draw(data, options);
    var funnel = new D3Funnel(json_data, options);
    funnel.draw(config.bindto);
}

function Groupedchartwithline(config) {
    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var options = config.series;
    var lineoptions = config.lineseries;
    var json_data = config.data;

    //Title Properties Start

    var chartstyleprop = JSON.parse(config.chartstyleprop);
    var chartTitle = chartstyleprop[0].charttitle;
    var charttitlecolor = chartstyleprop[0].charttitlecolor;
    var charttitlefontstyle = chartstyleprop[0].charttitlefontstyle;
    var charttitlefontsize = chartstyleprop[0].charttitlefontsize;


    //Title Properties End

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);

    //var margin = { top: (parseInt(d3.select('body').style('width'), 10) / 10), right: (parseInt(d3.select('body').style('width'), 10) / 20), bottom: (parseInt(d3.select('body').style('width'), 10) / 5), left: (parseInt(d3.select('body').style('width'), 10) / 20) },
    //            width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    //            height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;


    // width = 960 - 40 - 20 = 900
    // height = 500 - 20 - 30 = 450
    var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 40
    }, width = chartwidth, height = chartheight
    //alert(width);
    //alert(height);
    width = width - margin.left - margin.right, height = height
			- margin.top - margin.bottom;
    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width - 100], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear().range([height, 0]);

    //var y1 = d3.scale.linear().range([height, 0]);

    var colorRange = d3.scale.category10();


    var color = d3.scale.ordinal()
        .range(colorRange.range());

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    //var divTooltip = d3.select(config.bindto).append("div").attr("class", "toolTip");
    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");

    var svg = d3.select(config.bindto)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2.5))
        .attr("text-anchor", "middle")
        .style("font-size", charttitlefontsize + "px")
        .style("font-family", charttitlefontstyle)
        .style("fill", charttitlecolor)
        .style("text-decoration", "underline")
        .text(chartTitle);

    var totaloptions;
    if (json_data.length > 0) {
        totaloptions = d3.keys(json_data[0]).filter(function (key) { return key !== xaxis[0] });
    }
    var finalseries = options.map(function (name) { return { name: name, Type: "bar" }; });
    lineoptions.map(function (name) { finalseries.push({ name: name, Type: "Line" }) });
    json_data.forEach(function (d) {
        d.bars = options.map(function (name) { return { name: name, value: +d[name] }; });
        d.line = lineoptions.map(function (name) { return { name: name, value: +d[name] }; });
        d.totaloptions = totaloptions.map(function (name) { return { name: name, value: +d[name] }; })
    });
    x0.domain(json_data.map(function (d) { return d[xaxis[0]]; }));
    x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(json_data, function (d) { return d3.max(d.totaloptions, function (d) { return d.value; }); })]);
    //y1.domain([0, d3.max(dataset, function (d) { return d3.max(d.line, function (d) { return d.value; }); })]);
    if (json_data.length > 0) {
        color.domain(d3.keys(json_data[0]).filter(function (key) { return key !== xaxis[0]; }));
    }
    ///
    //chart X- Axis properties
    ///
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .style("font-size", chartstyleprop[0].xtitlefontsize + "px")
        .style("font-family", chartstyleprop[0].xtitlestyle)
        .style("fill", chartstyleprop[0].xtitlecolor)
        .text(chartstyleprop[0].xaxistitle);
    ///
    //chart Y- Axis properties   
    ///
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("x", -77)
        .attr("dy", "-3.8em")
        .style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].ytitlefontsize + "px")
        .style("font-family", chartstyleprop[0].ytitlestyle)
        .style("fill", chartstyleprop[0].ytitlecolor)
        .text(chartstyleprop[0].yaxistitle);

    var bar = svg.selectAll(".bar")
        .data(json_data)
        .enter().append("g")
        .attr("class", "rect")
        .attr("transform", function (d) { return "translate(" + x0(d[xaxis[0]]) + ",0)"; });
    svg.selectAll(".x.axis .tick text")
    .call(wrap, x0.rangeBand());

    bar.selectAll("rect")
        .data(function (d) { return d.bars; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) { return x1(d.name); })
        .attr("y", function (d) { return y(d.value); })
        .attr("value", function (d) { return d.name; })
        .attr("height", function (d) { return height - y(d.value); })
        .attr("class", function (d) { return d.name.replace(/ /g, "_"); })
        //.attr("class","bar")
        .style("fill", function (d) { return color(d.name); });


    bar
        .on("mousemove", function (d) {
            divTooltip.style("left", d3.event.pageX + 10 + "px");
            divTooltip.style("top", d3.event.pageY - 25 + "px");
            divTooltip.style("display", "block");
            divTooltip.style("z-index", "999999");
            var x = d3.event.pageX, y = d3.event.pageY
            var elements = document.querySelectorAll(':hover');
            l = elements.length
            l = l - 1
            elementData = elements[l].__data__
            elementlabeldata = elements[l - 1].__data__

            divTooltip.html(elementlabeldata[xaxis[0]] + "<br>" + elementData.name + "<br>" + elementData.value);

            //  d3.select("." + elementData.name.replace(/ /g,'_')).style("opacity", '0.2');
        });
    bar
        .on("mouseout", function (d) {
            divTooltip.style("display", "none");
            // d3.select(this).style("opacity", '1');
        });

    var line = svg.append("g").attr("class", "line")

    lineoptions.map(function (c) {
        var valueline = d3.svg.line()
.x(function (d) {
    return x0(d[xaxis[0]]) + x0.rangeBand() / 2;
}).y(function (d) {
    return y(d[c]);
}).interpolate("cardinal");

        line.append("path").attr("d", valueline(json_data)).attr("class", c.replace(/ /g, '_')).style("stroke", color(c));
        //line.append("path").attr("d", valueline(json_data)).attr("class", "line");


        svg.selectAll("dot").data(json_data).enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) { return x0(d[xaxis[0]]) + x0.rangeBand() / 2 })
         .attr("cy", function (d) { return y(d[c]); }).style('fill', color(c))
        .on("mouseover", function (d) {

            var getcolor = d3.select(this).style('fill');
            d3.select(this).style('fill', 'none').style('fill-opacity', '1').style("stroke", getcolor).style("stroke-width", '5').transition()
               .duration(1000)
               .attr("r", 5);
            divTooltip.style("left", d3.event.pageX + 10 + "px");
            divTooltip.style("top", d3.event.pageY - 25 + "px");
            divTooltip.style("display", "inline-block");
            divTooltip.style("z-index", "999999");
            var x = d3.event.pageX, y = d3.event.pageY
            var elements = document.querySelectorAll(':hover');
            l = elements.length
            l = l - 1
            elementData = elements[l].__data__

            divTooltip.html(elementData[xaxis[0]] + "<br>" + c + "<br>" + elementData[c]);
        })
        .on("mouseout", function (d) {
            var color_normal = d3.select(this).style('stroke');
            d3.select(this).style('fill', color_normal).style("stroke", "none").style("stroke-width", '0')
            .attr("r", 5);
            divTooltip.style("display", "none");
        });
    });

    var legend = svg.selectAll(".legend")
        .data(finalseries.slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            if (json_data.length > 0) {
                var len = (json_data[0].totaloptions).length;
                return "translate(0," + ((i) * 20) + ")";
            }
        });
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("rect.bar").filter(function (e) {
            return e.name !== d;
        }).transition().style("opacity", opacity);

        d3.select(config.bindto).selectAll("path.line").filter(function (e) {
            return e.name !== d;
        }).transition().style("opacity", opacity);
    }
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", function (b) { return b.Type == 'bar' ? 18 : 7 })
        .attr('y', function (b) { return b.Type == 'bar' ? 0 : 6 })
        .style("fill", function (b) { return color(b.name) })
        .on("mouseover", function (d, i) {
            svg.selectAll(".rect rect").each(function () {

                if ($(this).attr("class") == d.name.replace(/ /g, "_")) {
                    d3.select(this).style("opacity", 1);
                }
                else {
                    d3.select(this).style("opacity", 0.2);

                }


                //if ($(this).hasClass(d.name.replace(/ /g, "_"))) {
                //    $(this).removeClass("disabled_rect");
                //    //d3.select(this).attr('class', 'disabled_rect');
                //}
                //else {
                //    //$(this).addClass("disabled_rect");
                //    d3.select(this).attr('class', 'disabled_rect');
                //}
            })

            svg.selectAll(".line path").each(function () {
                //if ($(this).hasClass(d.name.replace(/ /g, "_"))) { $(this).removeClass("disabled_rect"); }
                //else { $(this).addClass("disabled_rect"); }

                if ($(this).attr("class") == d.name.replace(/ /g, "_")) {
                    d3.select(this).style("opacity", 1);
                }
                else {
                    d3.select(this).style("opacity", 0.2);

                }
            })
            // fade(0.2, d);
        })
            .on("mouseout", function (d, i) {
                svg.selectAll("rect").style("stroke", "white");
                // svg.selectAll("path").style("stroke", "white");
                svg.selectAll(".line path").each(function () {
                    // $(this).removeClass("disabled_rect");
                    d3.select(this).style("opacity", 1);
                });

                svg.selectAll(".rect rect").each(function () {
                    //$(this).removeClass("disabled_rect"); 
                    d3.select(this).style("opacity", 1);
                });
            })


    // fade(1, d);


    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].LegendFontSize + "px")
        .style("font-family", chartstyleprop[0].LegendFontStyle)
        .text(function (d) { return d.name; });


}

function Stackedchartwithline(config) {

    var charttype = config.type.toLowerCase();
    var xaxis = config.xaxis;
    var options = config.series;
    var lineoptions = config.lineseries;
    var json_data = config.data;

    //Title Properties Start

    var chartstyleprop = JSON.parse(config.chartstyleprop);
    var chartTitle = chartstyleprop[0].charttitle;
    var charttitlecolor = chartstyleprop[0].charttitlecolor;
    var charttitlefontstyle = chartstyleprop[0].charttitlefontstyle;
    var charttitlefontsize = chartstyleprop[0].charttitlefontsize;


    //Title Properties End

    var chartwidth = parseInt(config.chartwidth);
    var chartheight = parseInt(config.chartheight);


    var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 40
    }, width = chartwidth, height = chartheight
    //alert(width);
    //alert(height);
    width = width - margin.left - margin.right, height = height
			- margin.top - margin.bottom;
    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }


    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width - 100], .1, .3);
    var y = d3.scale.linear()
            .rangeRound([height, 0]);

    var y1 = d3.scale.linear()
.rangeRound([height, 0]);

    var colorRange = d3.scale.category20();
    var color = d3.scale.ordinal()
            .range(colorRange.range());
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));
    var svg = d3.select(config.bindto)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");

    svg.append("text")
       .attr("x", (width / 2))
       .attr("y", 0 - (margin.top / 2.5))
       .attr("text-anchor", "middle")
       .style("font-size", charttitlefontsize + "px")
       .style("font-family", charttitlefontstyle)
       .style("fill", charttitlecolor)
       .style("text-decoration", "underline")
       .text(chartTitle);

    var totaloptions = d3.keys(json_data[0]).filter(function (key) { return key !== xaxis[0] });

    var finalseries = options.map(function (name) { return { name: name, Type: "bar" }; });

    lineoptions.map(function (name) { finalseries.push({ name: name, Type: "Line" }) });

    color.domain(d3.keys(json_data[0]).filter(function (key) { return key !== xaxis[0]; }));

    //dataset.forEach(function (d) {
    //    var y0 = 0;
    //    d.values = color.domain().map(function (name) {
    //        return { name: name, y0: y0, y1: y0 += +d[name] };

    //    });
    //    d.total = d.values[d.values.length - 1].y1;
    //});



    json_data.forEach(function (d) {
        var y0 = 0;
        d.values = options.map(function (name) {

            return { name: name, y0: y0, y1: y0 += +d[name] };

        });

        y0 = 0;
        d.totalvalues = totaloptions.map(function (name) {

            return { name: name, y0: y0, y1: y0 += +d[name] };

        });
        d.total = d.totalvalues[d.totalvalues.length - 1].y1;
    });

    x.domain(json_data.map(function (d) { return d[xaxis[0]]; }));
    y.domain([0, d3.max(json_data, function (d) { return d.total; })]);

    ///
    //chart X- Axis properties
    ///
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .style("font-size", chartstyleprop[0].xtitlefontsize + "px")
        .style("font-family", chartstyleprop[0].xtitlestyle)
        .style("fill", chartstyleprop[0].xtitlecolor)
        .text(chartstyleprop[0].xaxistitle);
    ///
    //chart Y- Axis properties   
    ///
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 9)
        .attr("dy", ".71em")
        //.attr("x", -77)       
        .style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].ytitlefontsize + "px")
        .style("font-family", chartstyleprop[0].ytitlestyle)
        .style("fill", chartstyleprop[0].ytitlecolor)
        .text(chartstyleprop[0].yaxistitle);



    var bar = svg.selectAll(".label")
            .data(json_data)
            .enter().append("g")
            .attr("class", "rect")
            .attr("transform", function (d) { return "translate(" + x(d[xaxis[0]]) + ",0)"; });

    svg.selectAll(".x.axis .tick text")
            .call(wrap, x.rangeBand());

    var bar_enter = bar.selectAll("rect")
    .data(function (d) { return d.values; })
    .enter();

    bar_enter.append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.y1); })
        .attr("height", function (d) { return y(d.y0) - y(d.y1); })
        .attr('class', function (d) { return d.name.replace(/ /g, '_'); })
        .style("fill", function (d) { return color(d.name); });

    bar_enter.append("text")
        .text(function (d) { return d3.format(".2s")(d.y1 - d.y0) + "%"; })
        .attr("y", function (d) { return y(d.y1) + (y(d.y0) - y(d.y1)) / 2; })
        .attr("x", x.rangeBand() / 3)
        .style("fill", '#ffffff');

    bar.on("mousemove", function (d) {
        divTooltip.style("left", d3.event.pageX + 10 + "px");
        divTooltip.style("top", d3.event.pageY - 25 + "px");
        divTooltip.style("display", "inline-block");
        divTooltip.style("z-index", "999999");
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l = l - 1
        element = elements[l].__data__
        value = element.y1 - element.y0
        divTooltip.html((d[xaxis[0]]) + "<br>" + element.name + "<br>" + value + "%");
    });
    bar.on("mouseout", function (d) {
        divTooltip.style("display", "none");
    });


    var line = svg.append("g").attr("class", "line")

    lineoptions.map(function (c) {
        var valueline = d3.svg.line()
.x(function (d) {
    return x(d.label) + x.rangeBand() / 2;
}).y(function (d) {
    return y(d[c]);
}).interpolate("cardinal");

        line.append("path").attr("d", valueline(json_data)).attr("class", c.replace(/ /g, '_')).style("stroke", color(c));


        svg.selectAll("dot").data(json_data).enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) { return x(d[xaxis[0]]) + x.rangeBand() / 2 })
         .attr("cy", function (d) { return y(d[c]); }).style('fill', color(c))
        .on("mouseover", function (d) {
            var getcolor = d3.select(this).style('fill');
            d3.select(this).style('fill', 'none').style('fill-opacity', '1').style("stroke", getcolor).style("stroke-width", '5').transition()
               .duration(1000)
               .attr("r", 5);
            divTooltip.style("left", d3.event.pageX + 10 + "px");
            divTooltip.style("top", d3.event.pageY - 25 + "px");
            divTooltip.style("display", "inline-block");
            divTooltip.style("z-index", "999999");
            var x = d3.event.pageX, y = d3.event.pageY
            var elements = document.querySelectorAll(':hover');
            l = elements.length
            l = l - 1
            elementData = elements[l].__data__
            divTooltip.html(elementData[xaxis[0]] + "<br>" + c + "<br>" + elementData[c] + "%");
        })
        .on("mouseout", function (d) {
            var color_normal = d3.select(this).style('stroke');
            d3.select(this).style('fill', color_normal).style("stroke", "none").style("stroke-width", '0')
            .attr("r", 5);
            divTooltip.style("display", "none");
        });
    });

    var legend = svg.selectAll(".legend")
      .data(finalseries.slice())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
          var len = (totaloptions).length;
          return "translate(0," + ((i) * 20) + ")";
      });
    function fade(opacity, d) {
        d3.select(config.bindto).selectAll("rect.bar").filter(function (e) {
            return e.name !== d;
        }).transition().style("opacity", opacity);

        d3.select(config.bindto).selectAll("path.line").filter(function (e) {
            return e.name !== d;
        }).transition().style("opacity", opacity);
    }
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", function (b) { return b.Type == 'bar' ? 18 : 7 })
        .attr('y', function (b) { return b.Type == 'bar' ? 0 : 6 })
        .style("fill", function (b) { return color(b.name) })
        .on("mouseover", function (d, i) {
            svg.selectAll(".rect rect").each(function () {

                if ($(this).attr("class") == d.name.replace(/ /g, "_")) {
                    d3.select(this).style("opacity", 1);
                }
                else {
                    d3.select(this).style("opacity", 0.2);

                }


                //if ($(this).hasClass(d.name.replace(/ /g, "_"))) {
                //    $(this).removeClass("disabled_rect");
                //    //d3.select(this).attr('class', 'disabled_rect');
                //}
                //else {
                //    //$(this).addClass("disabled_rect");
                //    d3.select(this).attr('class', 'disabled_rect');
                //}
            })

            svg.selectAll(".line path").each(function () {
                //if ($(this).hasClass(d.name.replace(/ /g, "_"))) { $(this).removeClass("disabled_rect"); }
                //else { $(this).addClass("disabled_rect"); }

                if ($(this).attr("class") == d.name.replace(/ /g, "_")) {
                    d3.select(this).style("opacity", 1);
                }
                else {
                    d3.select(this).style("opacity", 0.2);

                }
            })
            // fade(0.2, d);
        })
            .on("mouseout", function (d, i) {
                svg.selectAll("rect").style("stroke", "white");
                // svg.selectAll("path").style("stroke", "white");
                svg.selectAll(".line path").each(function () {
                    // $(this).removeClass("disabled_rect");
                    d3.select(this).style("opacity", 1);
                });

                svg.selectAll(".rect rect").each(function () {
                    //$(this).removeClass("disabled_rect"); 
                    d3.select(this).style("opacity", 1);
                });
            })

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", chartstyleprop[0].LegendFontSize + "px")
        .style("font-family", chartstyleprop[0].LegendFontStyle)
        .text(function (d) { return d.name; });
}

var jschart = Backbone.Model.extend({
    initialize: function () {
    }
});
var jscharts = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: jschart,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var charttamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%"><div id="' + model.get("id") + '" style="margin:4px;height:' + model.get("chart").height + '" class="jqplot-target"></div></div>';
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(charttamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(charttamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(charttamplate);
            }
        }
        var element = $(document.getElementById(model.get("id"))).parent();
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") == "widget") {
                    $(".widget-body").sortable("option", "disabled", false);
                }
                $(".widget-drag-handle").remove();
                $(".selectedwidget").removeClass("selectedwidget");
                $(this).addClass("selectedwidget");
                $(this).append('<div class="widget-drag-handle"></div>');
                $("#settingsmenu").attr("data-controlid", model.get("id"));
                $("#settingsmenu").attr("data-controltype", model.get("controltype"));
                $("#deletewidget,#widgetsettings").removeAttr("disabled");
            });
            $(element).click();
            if (model.get("type") == "widget") {
            }
            else {
                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
                $(element).parent().height(parseInt($targetref.height() - 5));
                $(element).height(parseInt($targetref.height()) - 5);
                var selecteditem = bichart.byId(bichart, $("#settingsmenu").attr("data-controlid"));
                var chart = selecteditem.get("chart");
                chart.height = parseInt($targetref.height());
                selecteditem.unset("chart", { silent: true });
                selecteditem.set({ "chart": chart }, { silent: true });
            }
        }
        gejstchart(model);
        $("text").each(function () {
            if ($(this).html() == "Highcharts.com")
                $(this).remove();
        });
        // $(element).parent().click();    
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        var element = document.getElementById(model.get("id"));
        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                $targetref = $(document.getElementById(target.split("@")[0])).find('tr:eq(' + target.split("@")[1] + ')').find('td').eq(target.split("@")[2]).find('.layout-cell');
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
        }
        var width = model.get("chart").width;
        var height = model.get("chart").height;
        //if (width.toString().indexOf("%") != -1) {
        //    width = parseFloat(width.replace("%", ""));
        //    width = ($targetref.width() * width) / 100;
        //}
        //$(element).width(width);
        //$(element).parent().width(width);
        $(element).parent().height(parseInt(height - 5));
        $(element).height(parseInt(height) - 5);
        gejstchart(model);

    },
    byName: function (name) {
        filtered = this.filter(function (jschart) {
            return jscharts.get("name") === name;
        });
        return new jschart(filtered);
    },
    byId: function (jschart, id) {
        return jschart.find(function (model) { return model.get('id') == id });
    }
});

//Drop down class.
var bichart = new jscharts();

function GetDataAjax(params) {
    return $.ajax({
        url: "../../GetAllConnectionData/GET_DataForMathOperations",
        method: 'GET',
        async: true,
        cache: false,
        headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
        data: params
    });
}

function gejstchart(model) {
    try {
        var chartdatax = []; var chartdatay = [];
        var connectionid = model.get("xaxis").connectionid; var connectiontype = model.get("xaxis").connectiontype;
        var dsId = model.get("xaxis").DSId; var dsName = model.get("xaxis").DSName;
        var DSCnnCretedby = model.get("xaxis").DSCnnCretedby;
        var _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
        _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
        var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
        var formula = model.get("xaxis").formula;
        var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };
        if (formula != "underfined") {
            $.ajax({
                url: "../../GetAllConnectionData/GET_DataForMathOperations",
                method: 'GET',
                async: false,
                cache: false,
                headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
                data: params
            }).success(function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else {
                    chartdatax = JSON.parse(data.coldata);
                }
            });
        }
        var titletext = "";
        var titleobj = model.get("title");
        //tite data       
        if (titleobj.formula != "underfined") {
            connectionid = titleobj.connectionid; connectiontype = titleobj.connectiontype;
            var dsId = titleobj.DSId; var dsName = titleobj.DSName;
            var DSCnnCretedby = titleobj.DSCnnCretedby;

            _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
            _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
            slcSPgridobj = new Array(); slcSPgridobj.push(_data);
            formula = titleobj.formula;
            params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };

            $.ajax({
                url: "../../GetAllConnectionData/GET_DataForMathOperations",
                method: 'GET',
                async: false,
                cache: false,
                headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
                data: params
            }).success(function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else {
                    titletext = JSON.parse(data.coldata);
                }
            });
        }
        var sdata = model.get("series");
        for (var i = 0; i < sdata.length; i++) {
            var sobject = sdata[i];
            if (sobject.formula != "underfined") {
                connectionid = sobject.connectionid; connectiontype = sobject.connectiontype;
                var dsId = sobject.DSId; var dsName = sobject.DSName;
                var DSCnnCretedby = sobject.DSCnnCretedby;
                _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
                _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
                slcSPgridobj = new Array(); slcSPgridobj.push(_data);
                formula = sobject.formula;
                params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };
                $.ajax({
                    url: "../../GetAllConnectionData/GET_DataForMathOperations",
                    method: 'GET',
                    async: false,
                    cache: false,
                    headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
                    data: params
                }).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else {
                        var cdata = [];
                        var data = JSON.parse(data.coldata);
                        // alert(sobject.series_color = "  " + sobject.charttype);
                        if ((sobject.charttype == "pie")) {
                            var colorobject = [];
                            if (sobject.series_color.length > 0)
                                colorobject = sobject.series_color;
                            else
                                colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
                            $.map(data, function (val, i) {
                                if (i < sobject.maxslice) {
                                    if (chartdatax.length > i)
                                        cdata.push({ name: chartdatax[i], y: Number(val), color: colorobject[i] });
                                    else
                                        cdata.push({ name: "", y: Number(val), color: colorobject[i] });
                                }
                                else {
                                    return;
                                }
                            });
                            chartdatay.push({ "name": "" + sobject.name + "", "type": "" + sobject.charttype + "", "data": cdata, "innerSize": '' + sobject.pieinnersize + '%', "size": '' + sobject.piesize + '%' });
                        }
                        else if ((sobject.charttype == "area")) {
                            var colorobject = [];
                            if (sobject.series_color.length > 0)
                                colorobject = sobject.series_color;
                            else
                                colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
                            $.map(data, function (val, i) {
                                cdata.push({ name: chartdatax[i], y: Number(val), color: colorobject[i] });
                            });
                            var yaxisobj = model.get("yaxis");
                            var decimals = parseInt(yaxisobj.Decimals);
                            chartdatay.push({
                                "name": "" + sobject.name + "", "type": "" + sobject.charttype + "", "data": cdata, color: sobject.series_color[0],
                                dataLabels: {
                                    color: sobject.valuecolor,
                                    crop: true,
                                    enabled: sobject.showvaluesonlabel,
                                    rotation: sobject.valueangle,
                                    style: { fontFamily: '"Arial Narrow", Arial, Verdana, sans-serif', fontSize: '14px' },
                                    x: sobject.valueleft,
                                    y: sobject.valuetop

                                }
                            });
                        }
                        else {
                            $.map(data, function (val, i) {
                                cdata.push(parseFloat(val));
                            });
                            var yaxisobj = model.get("yaxis");
                            var decimals = parseInt(yaxisobj.Decimals);
                            chartdatay.push({
                                "name": "" + sobject.name + "", "type": "" + sobject.charttype + "", "data": cdata, color: sobject.series_color[0],
                                dataLabels: {
                                    color: sobject.valuecolor,
                                    crop: true,
                                    enabled: sobject.showvaluesonlabel,
                                    rotation: sobject.valueangle,
                                    style: { fontFamily: '"Arial Narrow", Arial, Verdana, sans-serif', fontSize: '14px' },
                                    x: sobject.valueleft,
                                    y: sobject.valuetop

                                }
                            });

                        }
                    }
                });
            }
        }
        //if (chartdatay.length == 0 && chartdatax.length > 0) {
        //    var tempdata = [];
        //    for (var xdata in chartdatax) {
        //        tempdata.push(null);
        //    }
        //    chartdatay.push({ "data": tempdata });
        //}
        if (chartdatay.length > 0 && chartdatax.length > 0) {
            var chartconfig = model.get("chart");
            function dataRenderer() {
                var resultseries = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    resultseries.push((chartdatay[i].data));
                }
                return resultseries;
            }
            ///............................................... pie chart ..........................................//////

            if (sobject.charttype == "pie") {
                var data = new Array();
                for (var i = 0; i < chartdatay.length; i++) {
                    var tab = JSON.stringify(chartdatay[i].data);
                    $.each(JSON.parse(tab), function (idx, obj) {
                        data.push([obj.name, obj.y]);
                    });
                }
                var colorobject = [];
                if (sobject.series_color.length > 0)
                    colorobject = sobject.series_color;
                else
                    colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];

                var seriesname = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    seriesname.push({ label: chartdatay[i].name });
                }

                var plot1 = $.jqplot(model.get("id"), [data], {
                    //dataRenderer: dataRenderer,                  
                    seriesColors: colorobject,
                    seriesDefaults: {
                        renderer: jQuery.jqplot.PieRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            showDataLabels: true
                        },
                    },
                    series: seriesname,
                    highlighter: {
                        show: true,
                        useAxesFormatters: false,
                        //tooltipContentEditor: tooltipContentEditor
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });

                //.................previewobject................................

                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
                var plot2 = $.jqplot('previewobject', [data], {
                    //dataRenderer: dataRenderer,
                    seriesColors: colorobject,
                    seriesDefaults: {
                        renderer: jQuery.jqplot.PieRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            showDataLabels: true
                        },
                    },
                    series: seriesname,
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });
                plot1.replot();
                plot2.replot();
                $(window).resize(function () {
                    plot1.replot({ resetAxes: true });
                    plot2.replot({ resetAxes: true });
                });
            }
                ///............................................... line chart ..........................................//////

            else if (sobject.charttype == "line") {
                var srcolorarr = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    srcolorarr.push((chartdatay[i].color));
                }
                var seriesname = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    seriesname.push({ label: chartdatay[i].name });
                }
                var ticks = chartdatax;
                var plot1 = $.jqplot(model.get("id"), [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    seriesDefaults: {
                        //renderer: $.jqplot.BarRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            barDirection: 'vertical',
                            barWidth: 50
                        },
                    },
                    series: seriesname,
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: chartdatax,
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,

                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false,
                        //tooltipContentEditor: tooltipContentEditor
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });

                //.................previewobject................................

                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
                var plot2 = $.jqplot('previewobject', [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    seriesDefaults: {
                        //renderer: $.jqplot.BarRenderer,                        
                        pointLabels: { show: true },
                        rendererOptions: {
                            barDirection: 'vertical',
                            barWidth: 50
                        },
                    },
                    series: seriesname,
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: chartdatax,
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,

                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });
                plot1.replot();
                plot2.replot();
                $(window).resize(function () {
                    plot1.replot({ resetAxes: true });
                    plot2.replot({ resetAxes: true });
                });
            }
                ///............................................... bar chart ..........................................//////
            else if (sobject.charttype == "bar") {
                var srcolorarr = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    srcolorarr.push((chartdatay[i].color));
                }
                var seriesname = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    seriesname.push({ label: chartdatay[i].name });
                }
                var ticks = chartdatax;
                var plot1 = $.jqplot(model.get("id"), [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            barDirection: 'horizontal',
                            //rendererOptions: { varyBarColor: true },
                            barWidth: 20
                        },
                    },
                    series: seriesname,
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            fontFamily: 'Times New Roman',
                            fontSize: "14pt", fontStyle: "Bold"
                        }
                    },
                    axes: {
                        xaxis: {
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,
                            tickOptions: {
                                fontFamily: 'Times New Roman',
                                fontSize: "14pt", fontStyle: "Bold"
                            }

                        },
                        yaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                            ticks: ticks,
                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false,
                        //tooltipContentEditor: tooltipContentEditor
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "450px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });

                //.................previewobject................................

                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
                var plot2 = $.jqplot('previewobject', [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            barDirection: 'horizontal',
                            rendererOptions: { varyBarColor: true },
                            barWidth: 20
                        },
                    },
                    series: seriesname,
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            fontFamily: 'Times New Roman',
                            fontSize: "14pt", fontStyle: "Bold"
                        }
                    },
                    axes: {
                        xaxis: {
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,
                            tickOptions: {
                                fontFamily: 'Times New Roman',
                                fontSize: "14pt", fontStyle: "Bold"
                            }

                        },
                        yaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                            ticks: ticks,
                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "350px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });
                plot1.replot();
                plot2.replot();
                $(window).resize(function () {
                    plot1.replot({ resetAxes: true });
                    plot2.replot({ resetAxes: true });
                });
            }
                ///............................................... area chart ..........................................//////
            else if (sobject.charttype == "area") {
                var srcolorarr = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    srcolorarr.push((chartdatay[i].color));
                }
                var seriesname = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    seriesname.push({ label: chartdatay[i].name });
                }
                var data = new Array();
                for (var i = 0; i < chartdatay.length; i++) {
                    var tab = JSON.stringify(chartdatay[i].data);
                    $.each(JSON.parse(tab), function (idx, obj) {
                        data.push(obj.name, obj.y);
                    });
                }
                var ticks = chartdatax;
                var plot1 = $.jqplot(model.get("id"), [data], {
                    //dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: { fill: true, fillToZero: true },
                    series: seriesname,
                    axesDefaults: {
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                    },
                    axes: {
                        xaxis: {
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false
                        },
                        yaxis: {
                            ticks: ticks
                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });

                //.................previewobject................................

                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
                var plot2 = $.jqplot('previewobject', [data], {
                    //dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: { fill: true, fillToZero: true },
                    series: seriesname,
                    axesDefaults: {
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                    },
                    axes: {
                        xaxis: {
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false
                        },
                        yaxis: {
                            ticks: ticks
                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: false,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });
                plot1.replot();
                plot2.replot();
                $(window).resize(function () {
                    plot1.replot({ resetAxes: true });
                    plot2.replot({ resetAxes: true });
                });
            }
                ///............................................... column chart ..........................................//////

            else {
                var srcolorarr = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    srcolorarr.push((chartdatay[i].color));
                }
                var seriesname = [];
                for (var i = 0; i < chartdatay.length; i++) {
                    seriesname.push({ label: chartdatay[i].name });
                }
                var ticks = chartdatax;
                var plot1 = $.jqplot(model.get("id"), [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        pointLabels: { show: true },
                        rendererOptions: {
                            barDirection: 'vertical',
                            barWidth: 50
                        },
                    },
                    series: seriesname,
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: chartdatax,
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,

                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false,
                        //tooltipContentEditor: tooltipContentEditor
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: true,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        //top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt", fontStyle: "Bold"
                    }
                });

                //.................previewobject................................

                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
                var plot2 = $.jqplot('previewobject', [], {
                    dataRenderer: dataRenderer,
                    seriesColors: srcolorarr,
                    stackSeries: model.get("seriescomman").stacked,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        seriesColors: srcolorarr,
                        pointLabels: {
                            show: true,

                        },
                        rendererOptions: {
                            barDirection: 'vertical',
                            barWidth: 50
                        },
                    },
                    series: seriesname,
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: chartdatax,
                            drawMajorGridlines: false,
                            drawMinorGridlines: false,
                            drawMajorTickMarks: false,

                        }
                    },
                    highlighter: {
                        show: true,
                        useAxesFormatters: false
                    },
                    cursor: {
                        showTooltip: true,
                        show: false
                    },
                    grid: {
                        drawBorder: true,
                        shadow: false,
                        background: '' + chartconfig.backcolor + '',
                        borderColor: '' + chartconfig.bordercolor + '',
                        borderRadius: chartconfig.borderradius,
                        borderWidth: chartconfig.borderwidth
                    },
                    legend: {
                        renderer: $.jqplot.EnhancedLegendRenderer,
                        show: true,
                        rendererOptions: {
                            numberRows: 1
                        },
                        location: 's',
                        placement: 'outsideGrid',
                        //top: "300px",
                        fontFamily: 'Times New Roman',
                        fontSize: "14pt",
                        fontStyle: "Bold"
                    }
                });
                plot1.replot();
                plot2.replot();
                $(window).resize(function () {
                    plot1.replot({ resetAxes: true });
                    plot2.replot({ resetAxes: true });
                });
            }







            //var chartconfig = model.get("chart");
            //var chartobj = new Highcharts.Chart({
            //    chart: {
            //        marginTop: chartconfig.mt,
            //        marginLeft: chartconfig.ml,
            //        marginRight: chartconfig.mr,
            //        marginBottom: chartconfig.mb,
            //        plotBackgroundColor: null,
            //        plotBorderWidth: null,
            //        plotShadow: false,
            //        spacingLeft: 0,
            //        spacingRight: 0,
            //        spacingBottom: 0,
            //        spacingTop: 40,
            //        renderTo: model.get("id"),
            //        options3d: {
            //            enabled: chartconfig.is3d,
            //            alpha: chartconfig.aplpha,
            //            beta: chartconfig.beta,
            //            depth: chartconfig.beta
            //        },
            //        polar: true,
            //        backgroundColor: '' + chartconfig.backcolor + '',
            //        borderColor: '' + chartconfig.bordercolor + '',
            //        borderRadius: chartconfig.borderradius,
            //        borderWidth: chartconfig.borderwidth,
            //    },
            //    title: {
            //        text: null,
            //        verticalAlign: "top",
            //        x: -5,
            //        y: -10
            //    },
            //    xAxis: {
            //        categories: chartdatax,
            //        title: {
            //            style: { fontWeight: 'bold', fontFamily: 'Arial, Verdana, sans-serif', fontSize: '13px' },
            //            text: model.get("xaxis").showtitle ? model.get("xaxis").title : null,
            //            margin: 15
            //        },
            //        gridLineWidth: model.get("xaxis").gridlines ? 1 : 0,
            //        lineWidth: model.get("xaxis").gridlines ? 1 : 0,
            //        tickLength: model.get("xaxis").labeltickmarks ? 5 : 0,
            //        tickWidth: 1,
            //        labels: {
            //            enabled: model.get("xaxis").showxaxis,
            //            rotation: model.get("xaxis").rotation,
            //            style: {
            //                fontSize: '12px',
            //                fontFamily: 'Arial,Verdana,sans-serif'
            //            },
            //            step: model.get("xaxis").labeldrop,
            //            formatter: function () {
            //                var xaxisobj = model.get("xaxis");
            //                return '' + xaxisobj.Prefix + '' + this.value + '' + xaxisobj.Suffix + '';
            //            }
            //        }
            //    },
            //    yAxis: {
            //        title: {
            //            text: model.get("yaxis").showtitle ? model.get("yaxis").title : null
            //        },
            //        gridLineWidth: model.get("yaxis").gridlines ? 1 : 0,
            //        lineWidth: model.get("yaxis").gridlines ? 1 : 0,
            //        labels: {
            //            enabled: model.get("yaxis").showlabels,
            //            formatter: function () {
            //                var yaxisobj = model.get("yaxis");
            //                return '' + yaxisobj.Prefix + '' + this.value.toFixed(yaxisobj.Decimals) + '' + yaxisobj.Suffix + '';
            //            }
            //        }
            //    },
            //    credits: {
            //        enabled: false
            //    },
            //    legend: {
            //        align: "right",
            //        borderWidth: 0,
            //        enabled: true,
            //        floating: true,
            //        itemMarginBottom: 5,
            //        itemStyle: {
            //            fontFamily: 'Arial, Verdana, sans-serif',
            //            fontSize: '13px'
            //        },
            //        layout: "horizontal",
            //        verticalAlign: "top",
            //        x: -5,
            //        y: -40
            //    },
            //    tooltip: {
            //        valueDecimals: 2,
            //        valuePrefix: '',
            //        valueSuffix: ' '
            //    },
            //    plotOptions: {
            //        series: {
            //            cursor: 'pointer',
            //            point: {
            //                events: {
            //                    click: function () {
            //                        //alert('Category: ' + this.category + ', value: ' + this.y);
            //                        var storename = this.category;
            //                        $.ajax({
            //                            url: "../../CreateParameter/UpdateParamValdummy",
            //                            method: 'GET',
            //                            async: false,
            //                            cache: false,
            //                            headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
            //                            data: { Varvalues: storename },
            //                        }).success(function (data) {
            //                            var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
            //                            var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=a3f64f93-85e5-4650-b693-477f7c5c6cbd";
            //                            window.showModalDialog(shareurl, "", sFeatures);
            //                        });
            //                    }
            //                }
            //            }
            //        },
            //        column: {
            //            stacking: model.get("seriescomman").stacked
            //        },
            //        area: {
            //            stacking: model.get("seriescomman").stacked
            //        },
            //        bar: {
            //            stacking: model.get("seriescomman").stacked
            //        },
            //        pie: {
            //            allowPointSelect: true,
            //            cursor: 'pointer',
            //            depth: 35,
            //            dataLabels: {
            //                enabled: true,
            //                formatter: function () {
            //                    return '<b>' + this.point.name + '(' + this.y + ')</b>: ' + this.percentage.toFixed(2) + ' %';
            //                }
            //            }
            //        }
            //    },
            //    labels: {
            //        overflow: 'justify'
            //    }
            //    ,
            //    series: chartdatay
            //});
            //if (model.get("viewer") != true) {
            //    $("#previewobject").empty();
            //    $("#previewobject").css({ "height": "150px", "width": "94%", "overflow": "auto" });
            //    $("#previewobject").parent().css({ "height": "150px" });
            //    var chartobj5 = new Highcharts.Chart({
            //        chart: {
            //            marginTop: chartconfig.mt,
            //            marginLeft: chartconfig.ml,
            //            marginRight: chartconfig.mr,
            //            marginBottom: chartconfig.mb,
            //            plotBackgroundColor: null,
            //            plotBorderWidth: null,
            //            plotShadow: false,
            //            spacingLeft: 0,
            //            spacingRight: 0,
            //            spacingBottom: 0,
            //            spacingTop: 40,
            //            renderTo: 'previewobject',
            //            options3d: {
            //                enabled: chartconfig.is3d,
            //                alpha: chartconfig.aplpha,
            //                beta: chartconfig.beta,
            //                depth: chartconfig.beta
            //            },
            //            polar: true,
            //            backgroundColor: '' + chartconfig.backcolor + '',
            //            borderColor: '' + chartconfig.bordercolor + '',
            //            borderRadius: chartconfig.borderradius,
            //            borderWidth: chartconfig.borderwidth,
            //        },
            //        title: {
            //            text: null,
            //            verticalAlign: "top",
            //            x: -5,
            //            y: -10
            //        },
            //        xAxis: {
            //            categories: chartdatax,
            //            title: {
            //                style: { fontWeight: 'bold', fontFamily: 'Arial, Verdana, sans-serif', fontSize: '13px' },
            //                text: model.get("xaxis").showtitle ? model.get("xaxis").title : null,
            //                margin: 15
            //            },
            //            gridLineWidth: model.get("xaxis").gridlines ? 1 : 0,
            //            lineWidth: model.get("xaxis").gridlines ? 1 : 0,
            //            tickLength: model.get("xaxis").labeltickmarks ? 5 : 0,
            //            tickWidth: 1,
            //            labels: {
            //                enabled: model.get("xaxis").showxaxis,
            //                rotation: model.get("xaxis").rotation,
            //                style: {
            //                    fontSize: '12px',
            //                    fontFamily: 'Arial,Verdana,sans-serif'
            //                },
            //                step: model.get("xaxis").labeldrop,
            //                formatter: function () {
            //                    var xaxisobj = model.get("xaxis");
            //                    return '' + xaxisobj.Prefix + '' + this.value + '' + xaxisobj.Suffix + '';
            //                }
            //            }
            //        },
            //        yAxis: {
            //            title: {
            //                text: model.get("yaxis").showtitle ? model.get("yaxis").title : null
            //            },
            //            gridLineWidth: model.get("yaxis").gridlines ? 1 : 0,
            //            lineWidth: model.get("yaxis").gridlines ? 1 : 0,
            //            labels: {
            //                enabled: model.get("yaxis").showlabels,
            //                formatter: function () {
            //                    var yaxisobj = model.get("yaxis");
            //                    return '' + yaxisobj.Prefix + '' + this.value.toFixed(yaxisobj.Decimals) + '' + yaxisobj.Suffix + '';
            //                }
            //            }
            //        },
            //        credits: {
            //            enabled: false
            //        },
            //        legend: {
            //            align: "right",
            //            borderWidth: 0,
            //            enabled: true,
            //            floating: true,
            //            itemMarginBottom: 5,
            //            itemStyle: {
            //                fontFamily: 'Arial, Verdana, sans-serif',
            //                fontSize: '13px',
            //                borderRadius: 2
            //            },
            //            layout: "horizontal",
            //            verticalAlign: "top",
            //            x: -5,
            //            y: -40
            //        },
            //        tooltip: {
            //            valueDecimals: 2,
            //            valuePrefix: '',
            //            valueSuffix: ' '
            //        },
            //        plotOptions: {

            //            column: {
            //                stacking: model.get("seriescomman").stacked
            //            },
            //            area: {
            //                stacking: model.get("seriescomman").stacked
            //            },
            //            bar: {
            //                stacking: model.get("seriescomman").stacked
            //            },
            //            pie: {
            //                allowPointSelect: true,
            //                cursor: 'pointer',
            //                depth: 35,
            //                dataLabels: {
            //                    enabled: true,
            //                    formatter: function () {
            //                        return '<b>' + this.point.name + '(' + this.y + ')</b>: ' + this.percentage.toFixed(2) + ' %';
            //                    }
            //                }
            //            }
            //        },
            //        labels: {
            //            overflow: 'justify'
            //        }
            //        ,
            //        series: chartdatay
            //    });
            //}
            ////chart titles..
            //var title = model.get("title");
            //title.title = titletext;
            //model.set({ "title": title }, { silent: true });
            //titletext = title.Prefix + titletext + title.Suffix;


            //chartobj.setTitle({ text: title.showtitle ? titletext : null, style: { "color": title.color } }, { text: title.subtitle == "" ? null : title.subtitle, style: { "color": title.subcolor } });
            //if (model.get("viewer") != true) {
            //    chartobj5.setTitle({ text: title.showtitle ? titletext : null, style: { "color": title.color } }, { text: title.subtitle == "" ? null : title.subtitle, style: { "color": title.subcolor } });
            //    chartobj.container.onclick = function (e) {
            //        e.stopPropagation();
            //        var element = $(document.getElementById(model.get("id"))).parent();
            //        $(".widget-drag-handle").remove();
            //        $(".selectedwidget").removeClass("selectedwidget");
            //        $(element).addClass("selectedwidget");
            //        $(element).append('<div class="widget-drag-handle"></div>');
            //        $("#settingsmenu").attr("data-controlid", model.get("id"));
            //        $("#settingsmenu").attr("data-controltype", model.get("controltype"));
            //        $("#deletewidget,#widgetsettings").removeAttr("disabled");
            //    }
            //}



        }
    }
    catch (err) {
        alert(err);
    }
}

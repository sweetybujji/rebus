var d3chart = Backbone.Model.extend({
    initialize: function () {
    }
});
var d3charts = Backbone.Collection
		.extend({
		    initialize: function () {
		        this.bind('add', this.onModelAdded, this);
		        this.bind('remove', this.onModelRemoved, this);
		        this.bind('change', this.onModelUpdate, this);
		    },
		    model: d3chart,
		    onModelAdded: function (model, collection, options) {
		        var target = model.get("target");
		        var $targetref;
		        // var d3charttamplate = '<div class="bi-widget-item"
		        // style="margin-bottom: 10px;padding:5px;width: 100%"><div
		        // class="expandhover"><div id="expanddiv_'+ model.get("id")+ '"
		        // style="float: right;width: 5%;display:block;"><button
		        // id="expand_'+ model.get("id")+ '" class="borderless expand"
		        // dataexpand-id="'+ model.get("id")+ '" style=" font-size:
		        // 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart
		        // Full Screen"><i
		        // class="icon-fullscreen"></i></button></div><img usemap="#'+
		        // model.get("id")+ '" id="'+ model.get("id")+ '" src=""
		        // style="height:'+ ((model.get("style").height) + "px")+
		        // ';margin:4px;display:none" class="bi-d3chart" /></div></div>'
		        var d3charttamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%"><div class="d3_expandhover"><div id="expanddiv_'
						+ model.get("id")
						+ '" style="float: right;width: 5%;display:block;"><button id="expand_'
						+ model.get("id")
						+ '" class="borderless expand" dataexpand-id="'
						+ model.get("id")
						+ '" style=" font-size:10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><svg id="d3_'
                        //+ '" style=" font-size:10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><svg id="'
						+ model.get("id")
						+ '" style="height:'
						+ ((model.get("style").height) + "px")
						+ ';margin:4px;display:block" class="bi-d3chart"></svg></div></div>';
		        // var d3charttamplate = '<div class="bi-widget-item"
		        // style="margin-bottom: 10px;padding:5px;width: 100%"><div
		        // class="expandhover"><div id="expanddiv_'
		        // + model.get("id")
		        // + '" style="float: right;width: 5%;display:block;"><button
		        // id="expand_'
		        // + model.get("id")
		        // + '" class="borderless expand" dataexpand-id="'
		        // + model.get("id")
		        // + '" style=" font-size: 10pt;margin: 0;padding: 0 0
		        // 10px;display:none;" title="Chart Full Screen"><i
		        // class="icon-fullscreen"></i></button></div><div id="d3_chart"
		        // style="height:'
		        // + ((model.get("style").height) + "px")
		        // + ';margin:4px;display:none" class="bi-d3chart"
		        // ></div></div></div>'

		        if (model.get("type") != "widget") {
		            if (target != null) {
		                var d3chartobj = document.getElementById(target
								.split("@")[0]);
		                $targetref = $(
								d3chartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target
										.split("@")[2])]).find('.layout-cell');
		                $targetref.append(d3charttamplate);
		            }
		        } else {
		            $targetref = $(document.getElementById(target)).find(
							'.widget-body');
		            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
		                $targetref.append(d3charttamplate);
		            } else {
		                $targetref.find('.ui-draggable-bi').replaceWith(
								d3charttamplate);
		            }
		        }
		        var element = $(document.getElementById('d3_' + model.get("id"))).parent().parent();
		        //var element = $(document.getElementById('' + model.get("id"))).parent().parent();
		        if (model.get("viewer") != true) {
		            $(element)
							.click(
									function (e) {
									    e.stopPropagation();
									    if (model.get("type") == "widget") {
									        // $(".widget-body").sortable("option",
									        // "disabled", false);
									    }
									    $(".widget-drag-handle").remove();
									    $(".selectedwidget").removeClass(
												"selectedwidget");
									    $(this).addClass("selectedwidget");
									    $(this)
												.append(
														'<div class="widget-drag-handle"></div>');
									    $("#settingsmenu").attr(
												"data-controlid",
												'' + model.get("id"));
									    $("#settingsmenu").attr(
												"data-controltype",
												model.get("controltype"));
									    $("#deletewidget,#widgetsettings")
												.removeAttr("disabled");
									});
		            $(element).click();
		            if (model.get("type") == "widget") {
		            } else {
		                $targetref.data("data-controlid", 'd3_' + model.get("id"));
		                //$targetref.data("data-controlid", '' + model.get("id"));
		                $targetref.data("data-controltype", model
								.get("controltype"));
		                $(element).height(parseInt($targetref.height() - 5));
		                $(element).find(".bi-d3chart").height(
								parseInt($targetref.height()) - 5);
		                var selecteditem = bid3chart.byId(bid3chart, $(
								"#settingsmenu").attr("data-controlid"));
		                var style = selecteditem.get("style");
		                style.height = parseInt($targetref.height());
		                selecteditem.unset("style", {
		                    silent: true
		                });
		                selecteditem.set({
		                    "style": style
		                }, {
		                    silent: true
		                });
		            }
		        } else {
		            $(".bi-widget-item").find("#expand_" + model.get("id"))
							.show();
		            // $(".bi-widget-item").find(".expandhover").mouseover(function
		            // () {
		            // $(this).find("#expand_" + model.get("id")).show();
		            // });
		            // $(".bi-widget-item").find(".expandhover").mouseleave(function
		            // () {
		            // $(this).find("#expand_" + model.get("id")).hide();
		            // });
		        }
		        getchart(element, model, $targetref.width());
		    },
		    onModelRemoved: function (model, collection, options) {

		    },
		    onModelUpdate: function (model, collection, options) {
		        var element = $(document.getElementById('d3_' + model.get("id"))).parent().parent();
		        //var element = $(document.getElementById('' + model.get("id"))).parent().parent();
		        var connectionid = model.get("xaxis").connectionid;
		        var connectiontype = model.get("xaxis").connectiontype;
		        var dsId = model.get("xaxis").DSId;
		        var dsName = model.get("xaxis").DSName;
		        var DSCnnCretedby = model.get("xaxis").DSCnnCretedby;
		        var _data = new Object();
		        _data.ConnectionID = connectionid;
		        _data.DSConnType = connectiontype;
		        _data.DSId = dsId;
		        _data.DSName = dsName;
		        _data.DSCnnCretedby = DSCnnCretedby;
		        var slcSPgridobj = new Array();
		        slcSPgridobj.push(_data);
		        var formula = model.get("xaxis").formula;
		        var params = {
		            Get_SPGriddtail: JSON.stringify(slcSPgridobj),
		            formula: formula
		        };
		        var target = model.get("target");
		        var $targetref;
		        if (model.get("type") != "widget") {
		            if (target != null) {
		                // $targetref =
		                // $(document.getElementById(target.split("@")[0])).find('tr:eq('
		                // + target.split("@")[1] +
		                // ')').find('td').eq(target.split("@")[2]).find('.layout-cell');
		                var d3chartobj = document.getElementById(target
								.split("@")[0]);
		                $targetref = $(
								d3chartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target
										.split("@")[2])]).find('.layout-cell');
		            }
		        } else {
		            $targetref = $(document.getElementById(target)).find(
							'.widget-body');
		        }
		        var manualwidth = model.get("style").manualwidth;
		        var height = model.get("style").height;

		        var target = model.get("target");
		        $(element).css({
		            "width": ((manualwidth)),
		            "height": (parseInt(height) + 5) + "px"
		        });
		        // alert($targetref.width());
		        getchart(element, model, $targetref.width());
		    },
		    byName: function (name) {
		        filtered = this.filter(function (d3chart) {
		            return d3chart.get("name") === name;
		        });
		        return new d3chart(filtered);
		    },
		    byId: function (d3chart, id) {
		       // alert("Control ID at : " + id);
		        return d3chart.find(function (model) {
		            return model.get('id') == id
		        });
		    }
		});

// ....bid3chart backbone object....//
var bid3chart = new d3charts();

// .... getting data based on math operations.....//
/*
 * function GetDataAjax(params) { return $.ajax({ url :
 * "../../GetAllConnectionData/GET_DataForMathOperations", async : false, data :
 * params }); }
 */
// .... getting data based on math operations ended.....//
// .... chart control functionality.....//
function getchart(chartobj, model, twidth) {
    var manualwidth = model.get("style").manualwidth;
    var width;
    var height = model.get("style").height;
    if (manualwidth.toString().indexOf("%") != -1) {
        width = parseFloat(manualwidth.replace("%", ""));
        width = (twidth * width) / 100;
        model.get("style").width = width;
    } else {
        width = manualwidth;
        model.get("style").width = manualwidth;
    }
    model.get("style").height = parseInt(height) + "px";
    // ................. ...................total chart
    // properties...................................
    var chartstyleproperties = new Array();
    var chartstyledata = model.get("style");
    var chartseriesprop = model.get("seriespropperties");
    var charttitledata = model.get("titleproperties");
    var chartaraeadata = model.get("areaproperties");
    var chartlegenddata = model.get("legendproperties");
    var chartXpropdata = model.get("xaxisproperties");
    var chartYpropdata = model.get("yaxis");
    var colorobject = ["#5C8D2A", "#B32A3E", "#38AFA9", "#EE994D", "#E6C300",
			"#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952",
			"#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9",
			"#E9A0E7", "#1F497D", "#4E97BC"];

    //var titletext = "";
    //var titleobj = model.get("titleproperties");

    //// tite data
    //var tformula = titleobj.formula;
    //if (tformula != "undefined") {
    //    connectionid = titleobj.connectionid;
    //    connectiontype = titleobj.connectiontype;
    //    var dsId = titleobj.DSId;
    //    var dsName = titleobj.DSName;
    //    var DSCnnCretedby = titleobj.DSCnnCretedby;

    //    formula = titleobj.formula;

    //    _data = new Object();
    //    _data.ConnectionID = connectionid;
    //    _data.DSConnType = connectiontype;
    //    _data.DSId = dsId;
    //    _data.DSName = dsName;
    //    _data.DSCnnCretedby = DSCnnCretedby;
    //    _data.formulea = formula;

    //    slcSPgridobj = new Array();
    //    slcSPgridobj.push(_data);

    //    params = {
    //        Get_SPGriddtail: JSON.stringify(slcSPgridobj)
    //    };
    //    var Data_d = JSON.stringify(params);
    //    $.ajax({
    //        url: "../../GetAllConnectionData/GET_DataForMathOperations",
    //        method: 'POST',
    //        async: false,
    //        contentType: "application/json",
    //        data: Data_d
    //    }).success(function (data) {
    //        if (data.errorresult) { //
    //            alert(data.errorresult);
    //        } else {
    //            //titletext = JSON.parse(data.coldata);
    //            titletext = (data.tabledata);
    //        }
    //    });

    //}
    //if (titletext == "") {
    //} else {
    //    var titleobj = model.get("titleproperties");
    //    titleobj.charttitle = (titletext);
    //    model.unset("titleproperties", {
    //        silent: true
    //    });
    //    model.set({
    //        "titleproperties": titleobj
    //    }, {
    //        silent: true
    //    });
    //}

    // alert(parseInt(chartstyledata.width));

    //alert(JSON.stringify(charttitledata));

    //alert(charttitledata.charttitle);

    chartstyleproperties.push({

        // ...................chart properties..........................//
        "chartwidth": parseInt(chartstyledata.width) - 30,
        "chartheight": parseInt(chartstyledata.height) - 30,
        "backgradientstyle": chartstyledata.backgradientstyle,
        "backgroundcolor": chartstyledata.backgroundcolor,
        "bordercolor": chartstyledata.bordercolor,
        "borderwidth": chartstyledata.borderwidth,
        "borderstyle": chartstyledata.borderstyle,
        "borderskin": chartstyledata.borderskin,
        "colorobject": colorobject,
        // ...................chart properties..........................//

        // ...................chart title properties..........................//
        
        "charttitle": charttitledata.charttitle,
        "charttitlecolor": charttitledata.charttitlecolor,
        "charttitlefontstyle": charttitledata.charttitlefontstyle,
        "charttitlefontsize": charttitledata.charttitlefontsize,
        "charttitledocking": charttitledata.charttitledocking,
        "titlePrefix": charttitledata.titlePrefix,
        "titleSuffix": charttitledata.titleSuffix,
        // ...................chart titleproperties
        // ends..........................//

        // ...................chart area properties..........................//
        "BackColor": chartaraeadata.BackColor,
        "SecondaryColor": chartaraeadata.SecondaryColor,
        "areaGradient": chartaraeadata.areaGradient,
        "Clustered": chartaraeadata.Clustered,
        "showin3D": chartaraeadata.showin3D,
        "RotationX": chartaraeadata.RotationX,
        "RotationY": chartaraeadata.RotationY,
        "AreaPosX": chartaraeadata.AreaPosX,
        "AreaPosY": chartaraeadata.AreaPosY,
        "WallWidth": chartaraeadata.WallWidth,
        // ...................chart area properties
        // ends..........................//

        // ...................chart legend
        // properties..........................//
        // "PrimaryBackColor": chartlegenddata.PrimaryBackColor,
        // "SecondaryBackColor": chartlegenddata.SecondaryBackColor,
        "legendGradient": chartlegenddata.legendGradient,
        "Hatching": chartlegenddata.Hatching,
        // "BorderColor": chartlegenddata.BorderColor,
        // "BorderSize": chartlegenddata.BorderSize,
        // "BorderDashStyle": chartlegenddata.BorderDashStyle,
        "legenddocking": chartlegenddata.legenddock,
        "ShadowOffset": chartlegenddata.ShadowOffset,
        "LegendFontSize": chartlegenddata.LegendFontSize,
        "LegendFontStyle": chartlegenddata.LegendFontStyle,
        "showlegends": chartlegenddata.showlegends,
        // ...................chart legend properties
        // ends..........................//

        // ...................chart x-axis
        // properties..........................//
        "xPrefix": chartXpropdata.xPrefix,
        "xSuffix": chartXpropdata.xSuffix,
        "xShowlabels": chartXpropdata.xShowlabels,
        "xaxistitle": chartXpropdata.xaxistitle,

        "xtitlecolor": chartXpropdata.xtitlecolor,
        "xtitlestyle": chartXpropdata.xtitlestyle,
        "xtitlefontsize": chartXpropdata.xtitlefontsize,

        "xlabeldrop": chartXpropdata.xlabeldrop,
        "xshowgridlines": chartXpropdata.xshowgridlines,
        "xlblstyleangle": chartXpropdata.xlblstyleangle,
        "xformatas": chartXpropdata.xformatas,
        "xdecimalval": chartXpropdata.xdecimalval,
        // ...................chart x-axis properties
        // ends..........................//

        // ...................chart series
        // properties..........................//
        "srShowlabels": chartseriesprop.srShowLabels,
        // ...................chart series properties
        // ends..........................//

        // ...................chart y-axis
        // properties..........................//
        "yaxistitle": chartYpropdata.yaxistitle,
        "ytitlecolor": chartYpropdata.ytitlecolor,
        "ytitlestyle": chartYpropdata.ytitlestyle,
        "ytitlefontsize": chartYpropdata.ytitlefontsize,

        "yinterval": chartYpropdata.yinterval,
        "ymanualinterval": chartYpropdata.ymanualinterval,

        "yShowlabels": chartYpropdata.yShowlabels,
        // "ylabeldrop": chartYpropdata.ylabeldrop,
        "yshowgridlines": chartYpropdata.yshowgridlines
        // "ytwoaxis": chartYpropdata.ytwoaxis
        // ...................chart y-axis properties
        // ends..........................//
    });
    // ........................total chart properties
    // ends....................................

    // function xydatafunc() {
    // if (chartdatay.length == 0 && chartdatax.length > 0) {
    // var tempdata = [];
    // for (var xdata in chartdatax) {
    // tempdata.push(null);
    // }
    // chartdatay.push(tempdata);
    // }
    // else if (chartdatay.length > 0 && chartdatax.length > 0) {
    var xaxisdata = model.get("xaxis");

    //alert(xaxisdata.data);
    var yseriesdata = model.get("series");
    var xdata = new Array();
    xdata.push({
        "id": xaxisdata.id,
        "ConnectionID": xaxisdata.connectionid,
        "DSConnType": xaxisdata.connectiontype,
        "DSId": xaxisdata.DSId,
        "DSName": xaxisdata.DSName,
        "DSCnnCretedby": xaxisdata.DSCnnCretedby,
        "formula": xaxisdata.formula
    });



    //_data = new Object();
    //_data.ConnectionID = xaxisdata.connectionid;
    //_data.DSConnType = xaxisdata.connectiontype;
    //_data.DSId = xaxisdata.DSId;
    //_data.DSName = xaxisdata.DSName;
    //_data.DSCnnCretedby = xaxisdata.DSCnnCretedby;
    //slcSPgridobj = new Array();
    //slcSPgridobj.push(_data);
    //formula = xaxisdata.formula;

    //  var _xdata = new Object();
    //  _xdata.ConnectionID = xaxisdata.connectionid;
    //  _xdata.DSConnType = xaxisdata.connectiontype;
    //  _xdata.DSId = xaxisdata.DSId;
    //  _xdata.DSName = xaxisdata.DSName;
    //  _xdata.DSCnnCretedby = xaxisdata.DSCnnCretedby;
    //  _xdata.formulea = xaxisdata.formula;
    //var slcXSPgridobj = new Array();
    //slcXSPgridobj.push(_xdata);

    //formula = titleobj.formula;
    //params = {
    //    Get_SPGriddtail: JSON.stringify(slcSPgridobj),
    //    formula: formula
    //};



    //try {
    //    $http.post('/GetAllConnectionData/GET_DataForMathOperations', { Get_SPGriddtail: JSON.stringify(slcXSPgridobj) }).success(function (data) {
    //        if (data.tabledata) {

    //        }
    //        else if (data.errorresult) {
    //            alert(data.errorresult)
    //        }
    //        else if (data.responsedata) {
    //            alert("configure parameters");
    //        }

    //    }).error(function (data) {

    //    });
    //}
    //catch (e) {
    //    alert(e);
    //}

    //$.ajax({
    //    url:"/GetAllConnectionData/GET_DataForMathOperations",
    //    method: 'POST',
    //    contentType:'application/json',
    //    data:  JSON.stringify(slcXSPgridobj) 
    //}).success(function (data) {
    //    if (data.errorresult) { //
    //        alert(data.errorresult);
    //    } else {
    //        titletext =
    //        JSON.parse(data.coldata);
    //    }
    //});


    var xdataobj = JSON.stringify(xdata);
    var ydata = new Array();

    //alert(JSON.stringify(xaxisdata));

    //alert(JSON.stringify(yseriesdata));
    var seriesNames = [];

    var xaxisNames = [];
    var LineNames = [];
    xaxisNames.push("label");


    for (var i = 0; i < yseriesdata.length; i++) {

        if (yseriesdata[i].charttype == "Column") {
            seriesNames.push(yseriesdata[i].name);
        }
        else if (yseriesdata[i].charttype == "line") {
            //alert("else if : "+JSON.stringify(yseriesdata[i]));
            LineNames.push(yseriesdata[i].name);
        }
        else {
            // alert("else  : " + JSON.stringify(yseriesdata[i]));

            seriesNames.push(yseriesdata[i].name);
        }
        ydata.push({
            "id": yseriesdata[i].id,
            "name": yseriesdata[i].name,
            "charttype": yseriesdata[i].charttype,
            "series_color": yseriesdata[i].series_color,
            "showvaluesonlabel": yseriesdata[i].showvaluesonlabel,
            "valuelabelangle": yseriesdata[i].valuelabelangle,
            "ConnectionID": yseriesdata[i].connectionid,
            "DSConnType": yseriesdata[i].connectiontype,
            "DSId": yseriesdata[i].DSId,
            "DSName": yseriesdata[i].DSName,
            "DSCnnCretedby": yseriesdata[i].DSCnnCretedby,
            "formula": yseriesdata[i].formula,

            "labelstyle": yseriesdata[i].labelstyle,
            "labeldatashow": yseriesdata[i].labeldatashow,
            "drawingstyle": yseriesdata[i].drawingstyle,
            "doughnutradius": yseriesdata[i].doughnutradius,
            "chartcolumnstyle": yseriesdata[i].chartcolumnstyle,
            "labelplacement": yseriesdata[i].labelplacement,
            "pyramiddrawingstyle": yseriesdata[i].pyramiddrawingstyle,
            "pyramidrotationangle": yseriesdata[i].pyramidrotationangle,
            "pyramidvaluetype": yseriesdata[i].pyramidvaluetype,
            "pyramidminpoint": yseriesdata[i].pyramidminpoint,
            "pointwidth": yseriesdata[i].pointwidth,
            "srlinewidth": yseriesdata[i].srlinewidth,
            "bubbleselstyle": yseriesdata[i].bubbleselstyle,
            "stackedstyle": yseriesdata[i].stckedstyle,
            "ytwoaxis": yseriesdata[i].ytwoaxis
        });


    }
    var ydataobj = JSON.stringify(ydata);



    var chartstyleprop = JSON.stringify(chartstyleproperties);

   // alert(chartstyleprop);

    var xaxisjsondata = xaxisdata.data;
    var json_data = [];
    var charttype = model.get("series")[0].charttype;
    if (charttype == "funnel" || charttype == "pyramid") {
        for (var i = 0; i < xaxisjsondata.length; i++) {
            var jsonoarr = new Array();
            jsonoarr.push(xaxisjsondata[i]);
            for (var j = 0; j < yseriesdata.length; j++) {
                if (yseriesdata[j].data.length > 0) {
                    jsonoarr.push(yseriesdata[j].data[i]);
                    //jsonobject[yseriesdata[j].name] = yseriesdata[j].data[i];
                }
            }
            //alert(JSON.stringify(jsonoarr));
            json_data.push(jsonoarr);
        }

    }
    else {
        for (var i = 0; i < xaxisjsondata.length; i++) {
            //alert(xaxisjsondata.length);
            var jsonobject = new Object();
            jsonobject["label"] = xaxisjsondata[i];
            //alert(yseriesdata.length);
            for (var j = 0; j < yseriesdata.length; j++) {
                // alert(JSON.stringify(yseriesdata[j]));

                if (yseriesdata[j].data.length > 0) {

                    jsonobject[yseriesdata[j].name] = yseriesdata[j].data[i];
                }
            }

            //alert(JSON.stringify(jsonobject));
            json_data.push(jsonobject);
        }
    }


    var chartid = '#d3_' + model.get("id");
    $('#d3_' + model.get("id")).empty();

    //var chartid = '#' + model.get("id");
    //$('#' + model.get("id")).empty();

    var chartwidth = model.get("style").width;
    var chartheight = parseInt(model.get("style").height);
    var charttype = model.get("series")[0].charttype;

    //Chart Title Properties start
    var chartTitleProperties = model.get("titleproperties");
    //alert(JSON.stringify(chartProperties));

    //Chart Title Properties End


    var chartid = '#d3_' + model.get("id");
    //var chartid = '#' + model.get("id");



    //if (charttype == "pie") {
    //    data = [{
    //        name: 'Washington',
    //        acres: 22205
    //    }, {
    //        name: 'Oregon',
    //        acres: 6807
    //    }, {
    //        name: 'Idaho',
    //        acres: 4975
    //    }, {
    //        name: 'Other States',
    //        acres: 1244
    //    }, {
    //        name: 'Canada',
    //        acres: 2257
    //    }]

    //    // Make a JSON object out of the data.d string receieved.

    //    //if (json_data.length < 1) {
    //    json_data = (data);
    //    xaxisNames = [];
    //    xaxisNames.push("name");
    //    seriesNames = [];
    //    seriesNames.push("acres");
    //    //}
    //}
    //else if (charttype == "doughnut") {
    //    data = [{
    //        name: 'Washington',
    //        acres: 22205
    //    }, {
    //        name: 'Oregon',
    //        acres: 6807
    //    }, {
    //        name: 'Idaho',
    //        acres: 4975
    //    }, {
    //        name: 'Other States',
    //        acres: 1244
    //    }, {
    //        name: 'Canada',
    //        acres: 2257
    //    }]

    //    // Make a JSON object out of the data.d string receieved.
    //    if (json_data.length < 1) {
    //        json_data = (data);

    //        xaxisNames.push("name");
    //        seriesNames.push("acres");
    //    }
    //} else if (charttype == "funnel") {
    //    var data = [["Applicants", 12000], ["Pre-screened", 4000],
    //			["Interviewed", 2500], ["Hired", 1500]];
    //    json_data = (data);
    //} else if (charttype == "pyramid") {
    //    var data = [["Applicants", 12000], ["Pre-screened", 4000],
    //			["Interviewed", 2500], ["Hired", 1500]];
    //    json_data = (data);
    //}

    //alert(JSON.stringify(json_data));

    var chart = envd3.chart({
        chartwidth: chartwidth,
        chartheight: chartheight,
        type: charttype,
        data: json_data,
        bindto: chartid,
        xaxis: xaxisNames,
        series: seriesNames,
        lineseries: LineNames,
        ChartTitleProperties: chartTitleProperties,
        chartstyleprop: chartstyleprop
    });
    // ..... cloning for preview..............// var styledata1 =
    model.get("style");
    $("#previewobject").empty();
    $(chartobj).find(".bi-d3chart").clone(true).removeAttr('id').appendTo(
			$("#previewobject"));
    $("#previewobject").css({
        "height": "200px",
        "width": "100%",
        "display": "block"
    });
    $("#previewobject").children().css({
        "height": "200px"
    });
    // ..... cloning for preview ended..............// } }, error: function
}
// .... chart control functionality ended.....//


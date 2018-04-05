var pivottable = Backbone.Model.extend({
    initialize: function () {
    }
});
var pivottabels = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: pivottable,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var pivottamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%"><div id="' + model.get("id") + '" style="width:' + ((model.get("style").width)) + '" class="pivottablescope"><div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><br/><div id="tablediv' + model.get("id") + '" style="width:" class="tablescopeappend"></div></div>';

        //var servercharttamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%"><div class="expandhover"><div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div>';
        //servercharttamplate += '<table class="cx-table overview tbloverview"  style="width:100%;border-right-width:1px;border-bottom-width:1px;height:' + model.get("style").height + ';"><thead style="display:none"></thead><tbody></tbody></table><table class="cx-table tblfooter" style="width:100%;border-right-width:1px;"><tbody></tbody></table>'
        //servercharttamplate += '</div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var serverchartobj = document.getElementById(target.split("@")[0]);
                $targetref = $(serverchartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(pivottamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(pivottamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(pivottamplate);
            }
        }
        var element = $(document.getElementById(model.get("id"))).parent();
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") == "widget") {
                    // $(".widget-body").sortable("option", "disabled", false);
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
                $(element).height(parseInt($targetref.height() - 5));
                $(element).find(".bi-serverchart").height(parseInt($targetref.height()) - 5);
                var selecteditem = bipivottable.byId(bipivottable, $("#settingsmenu").attr("data-controlid"));
                var style = selecteditem.get("style");
                style.height = parseInt($targetref.height());
                selecteditem.unset("style", { silent: true });
                selecteditem.set({ "style": style }, { silent: true });
            }
        }
        else {
            $(".bi-widget-item").find("#expand_" + model.get("id")).show();
            //$(".bi-widget-item").find(".expandhover").mouseover(function () {
            //    $(this).find("#expand_" + model.get("id")).show();
            //});
            //$(".bi-widget-item").find(".expandhover").mouseleave(function () {
            //    $(this).find("#expand_" + model.get("id")).hide();
            //});
        }
        getpivottable(element, model, $targetref.width());
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        var element = $(document.getElementById(model.get("id"))).parent();
        var connectionid = model.get("xaxis").connectionid; var connectiontype = model.get("xaxis").connectiontype;
        var dsId = model.get("xaxis").DSId; var dsName = model.get("xaxis").DSName;
        var DSCnnCretedby = model.get("xaxis").DSCnnCretedby;
        var _data = new Object();
        _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
        var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
        var formula = model.get("xaxis").formula;
        var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };
        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                //  $targetref = $(document.getElementById(target.split("@")[0])).find('tr:eq(' + target.split("@")[1] + ')').find('td').eq(target.split("@")[2]).find('.layout-cell');
                var serverchartobj = document.getElementById(target.split("@")[0]);
                $targetref = $(serverchartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
        }
        var manualwidth = model.get("style").manualwidth;
        var height = model.get("style").height;

        var target = model.get("target");
        $(element).css({ "width": ((manualwidth)), "height": (parseInt(height) + 5) + "px" });
        $(element).children().find("table").css({ "width": (manualwidth), "height": (parseInt(height) - 40) + "px" });
        //alert($targetref.width());        
        getpivottable(element, model, $targetref.width());
    },
    byName: function (name) {
        filtered = this.filter(function (pivottable) {
            return pivottable.get("name") === name;
        });
        return new pivottable(filtered);
    },
    byId: function (pivottable, id) {
        return pivottable.find(function (model) { return model.get('id') == id });
    }
});

//....biserverchart backbone object....//
var bipivottable = new pivottabels();


//.... getting data based on math operations.....//
function GetDataAjax(params) {
    return $.ajax({
        url: "../../GetAllConnectionData/GET_DataForMathOperations_1",
        method: 'POST',
        async: false,
        cache: false,
        headers: {
            'Accept':
            'application/json', 'Pragma': 'no-cache'
        },
        data: params
    });
}
//.... getting data based on math operations ended.....//

//.... chart control functionality.....//
function getpivottable(chartobj, model, twidth) {
    var manualwidth = model.get("style").manualwidth;
    var width;
    var height = model.get("style").height;
    if (manualwidth.toString().indexOf("%") != -1) {
        width = parseFloat(manualwidth.replace("%", ""));
        width = (twidth * width) / 100;
        model.get("style").width = width;
    }
    else {
        width = manualwidth;
        model.get("style").width = manualwidth;
    }
    model.get("style").height = parseInt(height) + "px";
    //................. ...................total chart properties...................................
    var chartstyleproperties = new Array();
    var chartstyledata = model.get("style");
    var chartseriesprop = model.get("seriespropperties");
    var charttitledata = model.get("titleproperties");
    //var chartaraeadata = model.get("areaproperties");
    //var chartlegenddata = model.get("legendproperties");
    var chartXpropdata = model.get("xaxisproperties");
    var chartYpropdata = model.get("yaxis");
    var colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];


    //var titletext = "";
    //var titleobj = model.get("titleproperties");

    ////tite data       
    //var tformula = titleobj.formula;
    //if (tformula != "undefined") {
    //    connectionid = titleobj.connectionid; connectiontype = titleobj.connectiontype;
    //    var dsId = titleobj.DSId; var dsName = titleobj.DSName;
    //    var DSCnnCretedby = titleobj.DSCnnCretedby;
    //    _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
    //    _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    //    slcSPgridobj = new Array(); slcSPgridobj.push(_data);
    //    formula = titleobj.formula;
    //    params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };
    //    $.ajax({
    //        url: "../../GetAllConnectionData/GET_DataForMathOperations",
    //        method: 'GET',
    //        async: false,
    //        cache: false,
    //        headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
    //        data: params
    //    }).success(function (data) {
    //        if (data.errorresult) {
    //            // alert(data.errorresult);
    //        }
    //        else {
    //            titletext = JSON.parse(data.coldata);
    //        }
    //    });
    //}
    //if (titletext == "") {
    //}
    //else {
    //    var titleobj = model.get("titleproperties");
    //    titleobj.charttitle = (titletext);
    //    model.unset("titleproperties", { silent: true });
    //    model.set({ "titleproperties": titleobj }, { silent: true });
    //}

    // alert(parseInt(chartstyledata.width));

    chartstyleproperties.push({

        //...................chart properties..........................//
        "chartwidth": parseInt(chartstyledata.width) - 30,
        "chartheight": parseInt(chartstyledata.height),
        "backgradientstyle": chartstyledata.backgradientstyle,
        "backgroundcolor": chartstyledata.backgroundcolor,
        "bordercolor": chartstyledata.bordercolor,
        "borderwidth": chartstyledata.borderwidth,
        "borderstyle": chartstyledata.borderstyle,
        "borderskin": chartstyledata.borderskin,
        "colorobject": colorobject,
        //...................chart properties..........................//

        //...................chart title properties..........................//


        //"charttitle": charttitledata.charttitle,
        //"charttitlecolor": charttitledata.charttitlecolor,
        //"charttitlefontstyle": charttitledata.charttitlefontstyle,
        //"charttitlefontsize": charttitledata.charttitlefontsize,
        //"charttitledocking": charttitledata.charttitledocking,
        //"titlePrefix": charttitledata.titlePrefix,
        //"titleSuffix": charttitledata.titleSuffix,
        //...................chart titleproperties ends..........................//

        //...................chart area properties..........................//
        //"BackColor": chartaraeadata.BackColor,
        //"SecondaryColor": chartaraeadata.SecondaryColor,
        //"areaGradient": chartaraeadata.areaGradient,
        //"Clustered": chartaraeadata.Clustered,
        //"showin3D": chartaraeadata.showin3D,
        //"RotationX": chartaraeadata.RotationX,
        //"RotationY": chartaraeadata.RotationY,
        //"AreaPosX": chartaraeadata.AreaPosX,
        //"AreaPosY": chartaraeadata.AreaPosY,
        //"WallWidth": chartaraeadata.WallWidth,
        //...................chart area properties ends..........................//

        //...................chart legend properties..........................//
        // "PrimaryBackColor": chartlegenddata.PrimaryBackColor,
        // "SecondaryBackColor": chartlegenddata.SecondaryBackColor,
        //"legendGradient": chartlegenddata.legendGradient,
        //"Hatching": chartlegenddata.Hatching,
        ////"BorderColor": chartlegenddata.BorderColor,
        //// "BorderSize": chartlegenddata.BorderSize,
        //// "BorderDashStyle": chartlegenddata.BorderDashStyle,
        //"legenddocking": chartlegenddata.legenddock,
        //"ShadowOffset": chartlegenddata.ShadowOffset,
        //"LegendFontSize": chartlegenddata.LegendFontSize,
        //"LegendFontStyle": chartlegenddata.LegendFontStyle,
        //"showlegends": chartlegenddata.showlegends,
        //...................chart legend properties ends..........................//

        //...................chart x-axis properties..........................//
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

        "zTotals": chartXpropdata.zTotals,
        "zAverages": chartXpropdata.zAverages,

        //...................chart x-axis properties ends..........................//

        //...................chart series properties..........................//
        "srShowlabels": chartseriesprop.srShowLabels,
        //...................chart series properties ends..........................//

        //...................chart y-axis properties..........................//
        "yPrefix": chartYpropdata.yPrefix,
        "ySuffix": chartYpropdata.ySuffix,
        "yShowlabels": chartYpropdata.yShowlabels,
        "yaxistitle": chartYpropdata.yaxistitle,

        "ytitlecolor": chartYpropdata.ytitlecolor,
        "ytitlestyle": chartYpropdata.ytitlestyle,
        "ytitlefontsize": chartYpropdata.ytitlefontsize,



        "ylabeldrop": chartYpropdata.ylabeldrop,
        "yshowgridlines": chartYpropdata.yshowgridlines,
        "ylblstyleangle": chartYpropdata.ylblstyleangle,
        "yformatas": chartYpropdata.yformatas,
        "ydecimalval": chartYpropdata.ydecimalval
        //...................chart y-axis properties ends..........................//
    });
    // ........................total chart properties ends....................................

    // function xydatafunc() {
    //if (chartdatay.length == 0 && chartdatax.length > 0) {
    //    var tempdata = [];
    //    for (var xdata in chartdatax) {
    //        tempdata.push(null);
    //    }
    //    chartdatay.push(tempdata);
    //}
    //else if (chartdatay.length > 0 && chartdatax.length > 0) {
    var xaxisdata = model.get("xaxis");
    var yaxisdata = model.get("yaxis");
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
    var xdataobj = JSON.stringify(xdata);
    var ydata = new Array();
    ydata.push({
        "id": yaxisdata.id,
        "ConnectionID": yaxisdata.connectionid,
        "DSConnType": yaxisdata.connectiontype,
        "DSId": yaxisdata.DSId,
        "DSName": yaxisdata.DSName,
        "DSCnnCretedby": yaxisdata.DSCnnCretedby,
        "formula": yaxisdata.formula
    });
    var ydataobj = JSON.stringify(ydata);
    var zseriesdata = new Array();
    for (var i = 0; i < yseriesdata.length; i++) {
        zseriesdata.push({
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
            "stackedstyle": yseriesdata[i].stckedstyle
        });
    }
    var zseriesdataobj = JSON.stringify(zseriesdata);
    var chartstyleprop = JSON.stringify(chartstyleproperties);
    $.ajax({
        url: "../../Chart/GetPivotTable",
        method: 'POST',
        async: false,
        cache: false,
        data: { xdata: xdataobj, ydata: ydataobj, zseriesdata: zseriesdataobj, chartproperties: chartstyleprop, chartid: model.get("id") },
        success: function (data) {
            if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                //alert(data.advancedPivot);
                $(chartobj).find("#tablediv" + model.get("id")).empty();
                $(chartobj).find("#tablediv" + model.get("id")).append(data.advancedPivot).show();
                var manualwidth = model.get("style").manualwidth;
                var height = model.get("style").height;
                $(chartobj).css({ "width": ((manualwidth)), "height": (parseInt(height) + 5) + "px" });               
                $(chartobj).children().find("table").css({ "width": ((manualwidth)), "height": (parseInt(height) - 40) + "px" });
                //$(chartobj).children().find("table").css({ "width": (parseInt(manualwidth) - 50), "height": (parseInt(height) - 40) + "px" });

                var xaxisdata = model.get("xaxis");
                $(chartobj).find("#tablediv" + model.get("id")).find("table tbody").find("tr:eq(0)").find("td:eq(0)").css({ "background-color": "#3C8DBC", "font-family": "Calibri", "font-size": "10pt", "font-weight": "normal", "color": "white", "text-align": "center" });
                var xformula = xaxisdata.formula;
                if (xformula == "undefined") {
                    $(chartobj).find("#tablediv" + model.get("id")).find("table tbody").find("tr:eq(0)").find("td:eq(0)").text("AXIS");
                }
                else {
                    $(chartobj).find("#tablediv" + model.get("id")).find("table tbody").find("tr:eq(0)").find("td:eq(0)").text(xformula);
                }
                //alert($(chartobj).find("#tablediv" + model.get("id")).find("table tbody").html());


                var yformula = zseriesdata[0].formula;
                //..... tooltip operation..............//
                //$(chartobj).find(".bi-serverchart").parent().find(".tip").remove();
                //$(chartobj).find(".bi-serverchart").parent().append("<div class='tip'></div>");
                //if (yformula != "undefined") {
                //    $(chartobj).find(".bi-serverchart").parent().find(".tip").html(data.mapimg).show();
                //}
                //..... tooltip operation ended..............//

                //..... cloning for preview..............//
                //var styledata1 = model.get("style");
                $("#previewobject").empty();
                $(chartobj).find("#tablediv" + model.get("id")).clone(true).removeAttr('id').appendTo($("#previewobject"));
                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block", "overflow": "auto" });
                $("#previewobject").children().css({ "height": "175px" });
                //..... cloning for preview ended..............//

            }
        },
        error: function (data) {
            alert(data);
        }
    });
}
//.... chart control functionality ended.....//


////....... display tooltip for chart data..........//
//function DisplayToolTip(value1, value2, ex) {
//    var toolcls = $(".tooltipcls");
//    toolcls.css({ "display": "block" });
//    var posx = 0;
//    var posy = 0;
//    var e = (window.event) ? event : ex;
//    if (e.pageX || e.pageY) {
//        posx = e.pageX;
//        posy = e.pageY;
//        toolcls.css({ "left": (posx) + "px", "top": (posy - 100) + "px" });
//        toolcls.text(value1 + "," + value2);
//    }
//    else if (e.clientX || e.clientY) {
//        if (e.cancelBubble != null) e.cancelBubble = true; //for IE8 and earlier versions event bubbling occurs...
//        posx = e.clientX + document.body.scrollLeft
//       + document.documentElement.scrollLeft;
//        posy = e.clientY + document.body.scrollTop
//       + document.documentElement.scrollTop;
//        tooltip.style.left = posx + "px";
//        tooltip.style.top = (posy - 100) + "px";
//    }
//    // $("#MyTooltip").text(value1 + "," + value2);
//    toolcls.height('auto');
//    toolcls.width('auto');
//    toolcls.tooltip();
//}
////....... display tooltip for chart data ended..........//

////....... hiding tooltip for chart data..........//
//function hide() {
//    var toolcls = $(".tooltipcls");
//    toolcls.css({ "display": "none" });
//}
////....... hiding tooltip for chart data ended..........//


////....... DrilldownConfig based on chart series data..........//
//function DrilldownConfig(valx, valy, chartid, event) {
//    event.stopPropagation();
//    alert(chartid);
//    var selecteditem = pivottable.byId(pivottable, chartid);

//    var drillobj = selecteditem.get("drilldown");
//    // drilldown: { "DashboardId": "", "DashboardName": "", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" },

//    //  alert(JSON.stringify(drillobj));
//    var varlist = new Object();
//    var chartxparam = drillobj.ChartXParameterName;
//    var chartyparam = drillobj.ChartYParameterName;
//    if ((chartxparam != "")) {
//        varlist[chartxparam] = valx;
//    }
//    if ((chartyparam != "")) {
//        varlist[chartyparam] = valy;
//    }
//    var targetdashboard = drillobj.DashboardId;
//    if (targetdashboard != "") {
//        $.ajax({
//            url: "../../CreateParameter/UpdateParamVal",
//            method: 'GET',
//            async: false,
//            cache: false,
//            headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
//            data: { Varvalues: JSON.stringify(varlist) }
//        }).success(function (data) {
//            var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
//            var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
//            window.location.href = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
//            //window.showModalDialog(shareurl, "", sFeatures);
//        });
//    }
//}
////.......  DrilldownConfig based on chart series data ended..........//




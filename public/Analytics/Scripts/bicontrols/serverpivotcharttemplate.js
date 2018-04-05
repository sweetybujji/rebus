var pivotchart = Backbone.Model.extend({
    initialize: function () {
    }
});
var pivotcharts = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: pivotchart,
    onModelAdded: function (model, collection, options) {
       // alert(model);
        var target = model.get("target");
        var $targetref;
        var servercharttamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%"><div class="pivotexpandhover"><div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><img usemap="#' + model.get("id") + '"  id="' + model.get("id") + '"  src=""  style="height:height:' + ((model.get("style").height) + "px") + ';margin:4px;display:none" class="bi-serverpivotchart" /></div></div>'
        if (model.get("type") != "widget") {
            if (target != null) {
                var serverchartobj = document.getElementById(target.split("@")[0]);
                $targetref = $(serverchartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(servercharttamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(servercharttamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(servercharttamplate);
            }
        }
        var element = $(document.getElementById(model.get("id"))).parent().parent();
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
                $(element).find(".bi-serverpivotchart").height(parseInt($targetref.height()) - 5);
                var selecteditem = biserverchart.byId(biserverchart, $("#settingsmenu").attr("data-controlid"));
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
        getpivotchart(element, model, $targetref.width());
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        var element = $(document.getElementById(model.get("id"))).parent().parent();
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
        //alert($targetref.width());        
        //alert($targetref.width());        
        getpivotchart(element, model, $targetref.width());
    },
    byName: function (name) {
        filtered = this.filter(function (pivotchart) {
            return pivotchart.get("name") === name;
        });
        return new pivotchart(filtered);
    },
    byId: function (pivotchart, id) {
        return pivotchart.find(function (model) { return model.get('id') == id });
    }
});

//....biserverchart backbone object....//
var bipivotchart = new pivotcharts();


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
function getpivotchart(chartobj, model, twidth) {
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
    var chartaraeadata = model.get("areaproperties");
    var chartlegenddata = model.get("legendproperties");
    var chartXpropdata = model.get("xaxisproperties");
    var chartYpropdata = model.get("yaxis");
    var chartYAXISpropdata = model.get("yaxisproperties");
    var colorobject = ["#5C8D2A", "#B32A3E", "#38AFA9", "#EE994D", "#E6C300", "#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];


    var titletext = "";
    var titleobj = model.get("titleproperties");

    //tite data       
    var tformula = titleobj.formula;
    if (tformula != "undefined") {
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
                // alert(data.errorresult);
            }
            else {
                titletext = JSON.parse(data.coldata);
            }
        });
    }
    if (titletext == "") {
    }
    else {
        var titleobj = model.get("titleproperties");
        titleobj.charttitle = (titletext);
        model.unset("titleproperties", { silent: true });
        model.set({ "titleproperties": titleobj }, { silent: true });
    }

    // alert(parseInt(chartstyledata.width));

    chartstyleproperties.push({

        //...................chart properties..........................//
        "chartwidth": parseInt(chartstyledata.width) - 30,
        "chartheight": parseInt(chartstyledata.height)-30,
        "backgradientstyle": chartstyledata.backgradientstyle,
        "backgroundcolor": chartstyledata.backgroundcolor,
        "bordercolor": chartstyledata.bordercolor,
        "borderwidth": chartstyledata.borderwidth,
        "borderstyle": chartstyledata.borderstyle,
        "borderskin": chartstyledata.borderskin,
        "colorobject": colorobject,
        //...................chart properties..........................//

        //...................chart title properties..........................//


        "charttitle": charttitledata.charttitle,
        "charttitlecolor": charttitledata.charttitlecolor,
        "charttitlefontstyle": charttitledata.charttitlefontstyle,
        "charttitlefontsize": charttitledata.charttitlefontsize,
        "charttitledocking": charttitledata.charttitledocking,
        "titlePrefix": charttitledata.titlePrefix,
        "titleSuffix": charttitledata.titleSuffix,
        //...................chart titleproperties ends..........................//

        //...................chart area properties..........................//
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
        //...................chart area properties ends..........................//

        //...................chart legend properties..........................//
         //"PrimaryBackColor": chartlegenddata.PrimaryBackColor,
        //"SecondaryBackColor": chartlegenddata.SecondaryBackColor,
        "legendforecolor":chartlegenddata.legendforecolor,
        "legendGradient": chartlegenddata.legendGradient,
        "Hatching": chartlegenddata.Hatching,
        //"BorderColor": chartlegenddata.BorderColor,
        // "BorderSize": chartlegenddata.BorderSize,
        // "BorderDashStyle": chartlegenddata.BorderDashStyle,
        "legenddocking": chartlegenddata.legenddock,
        "ShadowOffset": chartlegenddata.ShadowOffset,
        "LegendFontSize": chartlegenddata.LegendFontSize,
        "LegendFontStyle": chartlegenddata.LegendFontStyle,
        "showlegends": chartlegenddata.showlegends,
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
        "yPrefix": chartYAXISpropdata.yPrefix,
        "ySuffix": chartYAXISpropdata.ySuffix,
        "yShowlabels": chartYAXISpropdata.yShowlabels,
        "yaxistitle": chartYAXISpropdata.yaxistitle,
        "yinterval": chartYAXISpropdata.yinterval,
        "ymanualinterval": chartYAXISpropdata.ymanualinterval,
        "ytitlecolor": chartYAXISpropdata.ytitlecolor,
        "ytitlestyle": chartYAXISpropdata.ytitlestyle,
        "ytitlefontsize": chartYAXISpropdata.ytitlefontsize,



        "ylabeldrop": chartYAXISpropdata.ylabeldrop,
        "yshowgridlines": chartYAXISpropdata.yshowgridlines,
        "ylblstyleangle": chartYAXISpropdata.ylblstyleangle,
        "yformatas": chartYAXISpropdata.yformatas,
        "ydecimalval": chartYAXISpropdata.ydecimalval,
        //"ytwoaxis": chartYAXISpropdata.ytwoaxis
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
            "stackedstyle": yseriesdata[i].stckedstyle,
            "ytwoaxis": yseriesdata[i].ytwoaxis
        });
    }
    var zseriesdataobj = JSON.stringify(zseriesdata);
    var chartstyleprop = JSON.stringify(chartstyleproperties);
    $.ajax({
        url: "../../Chart/GetPivotChart",
        method: 'POST',
        async: false,
        cache: false,
        data: { xdata: xdataobj, ydata: ydataobj, zseriesdata: zseriesdataobj, chartproperties: chartstyleprop, chartid: model.get("id") },
        success: function (data) {
            if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                $(chartobj).find(".bi-serverpivotchart").attr("src", 'data:image/png;base64,' + data.pivotchart + '').show();

                var yformula = ydata[0].formula;
                //..... tooltip operation..............//
                $(chartobj).find(".bi-serverpivotchart").parent().find(".tip").remove();
                $(chartobj).find(".bi-serverpivotchart").parent().append("<div class='tip'></div>");
                if (yformula != "undefined") {
                    $(chartobj).find(".bi-serverpivotchart").parent().find(".tip").html(data.pivotchartmap).show();
                }
                //..... tooltip operation ended..............//

                //..... cloning for preview..............//
                var styledata1 = model.get("style");
                $("#previewobject").empty();
                $(chartobj).find(".bi-serverpivotchart").clone(true).removeAttr('id').appendTo($("#previewobject"));
                $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
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
function DisplayPivotToolTip(value1, value2, ex) {
    //alert(value1);
    var toolcls = $(".tooltipcls");
    toolcls.css({ "display": "block" });
    var posx = 0;
    var posy = 0;
    var e = (window.event) ? event : ex;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
        toolcls.css({ "left": (posx) + "px", "top": (posy - 100) + "px" });
        toolcls.text(value1 + "," + value2);
    }
    else if (e.clientX || e.clientY) {
        if (e.cancelBubble != null) e.cancelBubble = true; //for IE8 and earlier versions event bubbling occurs...
        posx = e.clientX + document.body.scrollLeft
       + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
       + document.documentElement.scrollTop;
        tooltip.style.left = posx + "px";
        tooltip.style.top = (posy - 100) + "px";
    }
    // $("#MyTooltip").text(value1 + "," + value2);
    toolcls.height('auto');
    toolcls.width('auto');
    toolcls.tooltip();
}
////....... display tooltip for chart data ended..........//

////....... hiding tooltip for chart data..........//
function pivottooltiphide() {
    var toolcls = $(".tooltipcls");
    toolcls.css({ "display": "none" });
}
////....... hiding tooltip for chart data ended..........//


////....... DrilldownConfig based on chart series data..........//
function PivotDrilldownConfig(valx, valy, chartid, event) {
    event.stopPropagation();
    //alert(JSON.stringify(bipivotchart));
    var selecteditem = bipivotchart.byId(bipivotchart, "e6219c55-f5a3-b332-1c86-281a4ec15805");
    //alert(JSON.stringify(selecteditem));
    var drillobj = selecteditem.get("drilldown");
    // drilldown: { "DashboardId": "", "DashboardName": "", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" },

    //  alert(JSON.stringify(drillobj));
    var varlist = new Object();
    var chartxparam = drillobj.ChartXParameterName;
    var chartyparam = drillobj.ChartYParameterName;
    //alert(chartxparam);
    //alert(chartyparam);
    if ((chartxparam != "")) {
        varlist[chartxparam] = valx;
    }
    if ((chartyparam != "")) {
        varlist[chartyparam] = valy;
    }
    var targetdashboard = drillobj.DashboardId;
    if (targetdashboard != "") {
        $.ajax({
            url: "../../CreateParameter/UpdateParamVal",
            method: 'GET',
            async: false,
            cache: false,
            headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
            data: { Varvalues: JSON.stringify(varlist) }
        }).success(function (data) {
            var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
            var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
            window.location.href = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
            //window.showModalDialog(shareurl, "", sFeatures);
        });
    }
}
////.......  DrilldownConfig based on chart series data ended..........//




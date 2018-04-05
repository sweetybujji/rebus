
$(document).ready(function () {
    var mdr = "";
    var mdrtable = "";
    var pivotmdr = "";
    function getURLParameter(name) {
        return decodeURIComponent(
        (location.search.match(RegExp("[?|&]" + name + '=(.+?)(&|$)')) || [, null])[1]
    );
    }
    var dsid = getURLParameter("dsid");
    var Id = getURLParameter("id");
    var dashboardid = dsid;
    $.ajax({
        url: "../../home/getdashboardbyid",
        method: 'post',
        async: false,
        cache: false,
        data: { dashboardid: dashboardid },
    }).success(function (data) {
        if (data.error) {
            bootbox.dialog({
                title: "Error:",
                message: '<img src="/Images/1398528270_196747.ico" width="100px"/><br/> <p style="color:red">Technical problems occurred while loading your dashboard try again! </p><br/>' + data.error + ''
            });
            $("#ShareDashboardButton").hide();
            return false;
        }
        else {
            $("#ShareDashboardButton").show();
            var dashboardconfig = JSON.parse(data.dashboardconfig);
            var dashboardsettings = { name: data.Dashboard_name, desc: data.Description, width: dashboardconfig[0].parentwidth, height: dashboardconfig[0].parentheight, dashboardid: data.DsahboardId };
            $("#widgetstore").empty();
            for (var i = 0; i < dashboardconfig.length; i++) {
                var config = dashboardconfig[i];
                for (var bi = 0; bi < config.bicontrols.length; bi++) {
                    var bimodel = config.bicontrols[bi];
                    var ctrltype = bimodel.type;
                    switch (ctrltype) {
                        case "bi-serverchart":
                            var model = bimodel.model;
                            if (model.id == Id) {
                                mdr = model;
                                expandchart(model, $(window).width());
                            }
                            model.viewer = true;
                            //serverchartsharemdr.push(model);
                            biserverchart.add([model]);                            
                            break;

                        case "bi-serverpivotchart":
                            var model = bimodel.model;
                            //model.viewer = true;
                            //serverpivotchartmdr.push(model);
                            //bipivotchart.add([model]);
                            if (model.id == Id) {
                                pivotmdr = model;
                                expandpivotchart(model, $(window).width());
                            }
                            model.viewer = true;
                            //serverpivotchartmdr.push(model);
                            bipivotchart.add([model]);
                            break;

                        case "tablescope":
                            var model = bimodel.model;
                            if (model.id == Id) {
                                mdrtable = model;
                                expandtable(model);
                            }
                            model.viewer = true;
                            table.add([model]);
                            break;
                    }
                }
            }

        }

    });
    $(window).resize(function () {
        if (mdr != "") {
            if (mdr.controltype = "serverchart") {
                expandchart(mdr, $(window).width());
            }
        }
        else if (pivotmdr != "") {
            if (pivotmdr.controltype = "serverpivotchart") {
                expandpivotchart(pivotmdr, $(window).width());
            }
        }
        else {
            expandtable(mdrtable);
        }
    });

});




function expandchart(model, width) {
    var manualwidth = "100%";
    var width;
    var twidth = $(window).width();
    var modalheight = $(window).height();
    var height = modalheight;
    if (manualwidth.toString().indexOf("%") != -1) {
        width = parseFloat(manualwidth.replace("%", ""));
        width = (twidth * width) / 100;
    }

    model.style.width = width;
    model.style.height = parseInt(height);
    //................. ...................total chart properties...................................
    var chartstyleproperties = new Array();
    var chartstyledata = model.style;
    var chartseriesprop = model.seriespropperties;
    var charttitledata = model.titleproperties;
    var chartaraeadata = model.areaproperties;
    var chartlegenddata = model.legendproperties;
    var chartXpropdata = model.xaxisproperties;
    var chartYpropdata = model.yaxis;
    var colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];


    var titletext = "";
    var titleobj = model.titleproperties;

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
        var titleobj = model.titleproperties;
        titleobj.charttitle = (titletext);
        model.unset("titleproperties", { silent: true });
        model.set({ "titleproperties": titleobj }, { silent: true });
    }

    chartstyleproperties.push({
        //...................chart properties..........................//             

        "chartwidth": (chartstyledata.width) - 50,
        "chartheight": parseInt(model.style.height),
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
        // "PrimaryBackColor": chartlegenddata.PrimaryBackColor,
        // "SecondaryBackColor": chartlegenddata.SecondaryBackColor,
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
        //...................chart x-axis properties ends..........................//

        //...................chart series properties..........................//
        "srShowlabels": chartseriesprop.srShowLabels,
        //...................chart series properties ends..........................//

        //...................chart y-axis properties..........................//
        "yaxistitle": chartYpropdata.yaxistitle,
        "ytitlecolor": chartYpropdata.ytitlecolor,
        "ytitlestyle": chartYpropdata.ytitlestyle,
        "ytitlefontsize": chartYpropdata.ytitlefontsize,

        "yinterval": chartYpropdata.yinterval,
        "ymanualinterval": chartYpropdata.ymanualinterval,

        "yShowlabels": chartYpropdata.yShowlabels,
        //"ylabeldrop": chartYpropdata.ylabeldrop,
        "yshowgridlines": chartYpropdata.yshowgridlines
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
    var xaxisdata = model.xaxis;
    var yseriesdata = model.series;
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
    for (var i = 0; i < yseriesdata.length; i++) {
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
    $.ajax({
        url: "../../Chart/getserverchart",
        method: 'POST',
        async: false,
        cache: false,
        data: { xdata: xdataobj, ydata: ydataobj, chartproperties: chartstyleprop, chartid: model.id },
        success: function (data) {
            if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                $("#expandwidget").attr("src", 'data:image/png;base64,' + data.chartdata + '').show();
            }
        },
        error: function (data) {
            alert(data);
        }
    });


}




function expandpivotchart(model, twidth) {
    //for (var bi = 0; bi < chartobj.length; bi++) {
    //var model = chartobj[bi];
    var manualwidth = "100%";
    var width;
    var twidth = $(window).width();
    var modalheight = $(window).height();
    var height = modalheight;
    if (manualwidth.toString().indexOf("%") != -1) {
        width = parseFloat(manualwidth.replace("%", ""));
        width = (twidth * width) / 100;
    }

    model.style.width = width;
    model.style.height = parseInt(height);
    //................. ...................total chart properties...................................
    var chartstyleproperties = new Array();
    var chartstyledata = model.style;
    var chartseriesprop = model.seriespropperties;
    var charttitledata = model.titleproperties;
    var chartaraeadata = model.areaproperties;
    var chartlegenddata = model.legendproperties;
    var chartXpropdata = model.xaxisproperties;
    var chartYpropdata = model.yaxis;
    var chartYAXISpropdata = model.yaxisproperties;
    var colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];


    var titletext = "";
    var titleobj = model.titleproperties;

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
        var titleobj = model.titleproperties;
        titleobj.charttitle = (titletext);
        model.unset("titleproperties", { silent: true });
        model.set({ "titleproperties": titleobj }, { silent: true });
    }

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
        "legendforecolor": chartlegenddata.legendforecolor,
        //"PrimaryBackColor": chartlegenddata.PrimaryBackColor,
        //"SecondaryBackColor": chartlegenddata.SecondaryBackColor,
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
    var xaxisdata = model.xaxis;
    var yaxisdata = model.yaxis;
    var yseriesdata = model.series;
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
        data: { xdata: xdataobj, ydata: ydataobj, zseriesdata: zseriesdataobj, chartproperties: chartstyleprop, chartid: model.id },
        success: function (data) {
            if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                $("#expandwidget").attr("usemap", '#' + model.id + '');
                $("#expandwidget").attr("src", 'data:image/png;base64,' + data.pivotchart + '').show();
                $("#windowcloseid").find(".tip").remove();
                $("#windowcloseid").append("<div class='tip'></div>");
                //if (yformula != "undefined") {
                $("#windowcloseid").find(".tip").html(data.pivotchartmap).show();
                //}

                //..... cloning for preview ended..............//

            }
        },
        error: function (data) {
            alert(data);
        }
    });
    //}
}


////....... display tooltip for chart data..........//
function DisplayPivotToolTip(value1, value2, ex) {
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
    //alert(chartid);
    var selecteditem = bipivotchart.byId(bipivotchart, chartid);

    var drillobj = selecteditem.get("drilldown");
    // drilldown: { "DashboardId": "", "DashboardName": "", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" },

    //  alert(JSON.stringify(drillobj));
    var varlist = new Object();
    var chartxparam = drillobj.ChartXParameterName;
    var chartyparam = drillobj.ChartYParameterName;
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



function expandtable(model) {
    var Column_Style = [];
    Column_Style = model.columns;
    var thftr = "";
    var coldata = model.columns; var thstr = ""; var tdstr = ""; var colobject = ""; var minimum = 0; var maximum = 0; var minmaxval = [];
    var tempfont = 0; var templineheight = 0; var htempfont = 0; var htemplineheight = 0;
    var datalist = new Object();
    for (var i = 0; i < coldata.length; i++) {
        colobject = coldata[i];
        if (colobject.formula != "underfined") {
            var values = [];
            var connectionid = colobject.connectionid; var connectiontype = colobject.connectiontype;
            var dsId = colobject.DSId;
            var dsName = colobject.DSName;
            var DSCnnCretedby = colobject.DSCnnCretedby;
            var _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
            _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
            var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
            var formula = colobject.formula;
            var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };

            $.ajax({
                url: "../../GetAllConnectionData/GET_DataForMathOperations",
                method: 'GET',
                async: false,
                cache: false,
                headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
                data: params
            }).success(function (data) {
                if (data.errorresult) {
                }
                else {
                    values = JSON.parse(data.coldata);

                    datalist[colobject.id] = values;
                }
            });

        }

        if (colobject.HFontSizeVal == "Small") {
            htempfont = parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght);
        }
        else if (colobject.HFontSizeVal == "Medium") {
            htempfont = 1.2;
            htemplineheight = parseInt(colobject.HLinehieght) - 19;
        }
        else if (colobject.HFontSizeVal == "Large") {
            htempfont = 1.9 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 30;
        }
        else if (colobject.HFontSizeVal == "Very Large") {
            htempfont = 2.3 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 26;
        }
        thstr += '<th class="cx-table" data-thid="' + colobject.id + '" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: ' + colobject.Hallignment + ';line-height:' + htemplineheight + '% ;border-bottom-width: 1px;border-right-width: ' + colobject.RightColumnBorder + ';border-top-width:1px;border-left-width: ' + colobject.LeftColumnBorder + ';border-color:' + colobject.HeaderBorderColor + ';font-size: ' + htempfont + 'em;font-weight: ' + colobject.HFontweight + ';font-style: ' + colobject.HFontstyle + ';text-decoration: ' + colobject.HTextDecoration + ';color: ' + colobject.HFontcolor + ';display: ' + colobject.Visibility + ';background: ' + colobject.HeaderBackground + ';width: ' + colobject.width + ';height: 23px;vertical-align: middle;"><div class="cell align-0 fmt-txt" style="display: block;">' + colobject.columnname + '</div></th>';
        $("#tableheader tbody").empty();
        var $thelement = $("#tableheader tbody");
        $thelement.append("<tr>" + thstr + "</tr>");


    }
    var modalheight = $(window).height();
    var height = modalheight;

    $("#tablerows").css({ "height": parseInt(height) - 85 + "px" });


    if (Object.keys(datalist).length > 0) {

        var maxtd = 0;
        for (key in datalist) {
            var data = datalist[key];
            if (data.length > maxtd)
                maxtd = data.length;
        }

        $("#tablerows tbody").empty();

        var $tdelement = $("#tablerows tbody");
        for (var t = 0; t < maxtd; t++) {

            var row = $('<tr>');
            for (var c = 0; c < coldata.length; c++) {
                if (coldata[c].FontSizeVal == "Small") {
                    tempfont = parseFloat(coldata[c].FontSize);
                    templineheight = 140;
                }
                else if (coldata[c].FontSizeVal == "Medium") {
                    tempfont = 1.2;
                    templineheight = parseInt(coldata[c].Linehieght) - 19;
                }
                else if (coldata[c].FontSizeVal == "Large") {
                    tempfont = 1.9 + parseFloat(coldata[c].FontSize);
                    templineheight = parseInt(coldata[c].Linehieght) - 30;
                }
                else if (coldata[c].FontSizeVal == "Very Large") {
                    tempfont = 2.3 + parseFloat(coldata[c].FontSize);
                    templineheight = parseInt(coldata[c].Linehieght) - 26;
                }

                row.append($('<td  style="overflow: hidden;text-overflow: ellipsis;border-bottom-style:' + coldata[c].Rowborderstyle + ';border-bottom-width: ' + coldata[c].Rowborderwidth + "px" + ';white-space: nowrap;text-align: ' + coldata[c].allignment + '; border-bottom-color: ' + coldata[c].RowBordercolor + '; font-size: ' + tempfont + 'em; line-height: ' + templineheight + '%;font-weight: ' + coldata[c].Fontweight + ';border-right-width: ' + coldata[c].RightColumnBorder + ';border-left-color: ' + coldata[c].BorderColor + ';border-right-color: ' + coldata[c].BorderColor + ';border-left-width: ' + coldata[c].LeftColumnBorder + ';font-style: ' + coldata[c].Fontstyle + ';display: ' + coldata[c].Visibility + ';vertical-align:middle;background: ' + coldata[c].BodyBackground + ';text-decoration: ' + coldata[c].TextDecoration + ';color: ' + coldata[c].Fontcolor + ';width: ' + coldata[c].width + ';" >').text(""));
                $tdelement.append(row);
            }
        }

        $("#tablerows tbody").find("tr").css({ "display": "none" });

        for (key in datalist) {

            var Column_Style = model.columns; var totalvalue = 0;
            var Table_Style = model.Table_Style;
            var index = $(".tblheaders").find("[data-thid='" + key + "']").index();

            index++; var data = datalist[key]; var dlength = Table_Style.TableRows;
            minmaxval.length = 0;
            $("#tablerows").find("td:nth-child(" + index + ")").each(function (count) {
                $(this).parent().show();
                if (dlength > count) {
                    var tddata = data[count];

                    tddata = Column_Style[index - 1].FormatAs == "Number" ? parseFloat(tddata).toFixed(Column_Style[index - 1].Decimals) : tddata;

                    if (Column_Style[index - 1].ShowDrilldownlink == "show") {
                        var modelid = model.id;
                        var drillid = Column_Style[index - 1].id;
                        $(this).html(Column_Style[index - 1].Prefix + '<a onclick=\drilldownconfigtbl("' + modelid + '","' + drillid + '",this);\>' + tddata + '</a>' + Column_Style[index - 1].Suffix);
                    }
                    else {
                        $(this).html(Column_Style[index - 1].Prefix + tddata + Column_Style[index - 1].Suffix);

                    }
                    totalvalue = totalvalue + parseInt($(this).text());

                    minmaxval.push(parseInt($(this).text()));
                    if ((Column_Style[index - 1].ResultRow) == "Min") {
                        minimum = Math.min.apply(null, minmaxval);
                    }
                    else if ((Column_Style[index - 1].ResultRow) == "Max") {
                        maximum = Math.max.apply(null, minmaxval);
                    }

                }
                else {

                    return false;
                }

            });
            var index1 = $("#tableheader").find("[data-thid='" + key + "']").index();
            if (index1 != -1) {
                if (Column_Style[index1].formula != "underfined") {

                    if ((Column_Style[index1].ResultRow) == "Sum") {
                        Column_Style[index1].Total = totalvalue;
                    }
                    else if ((Column_Style[index1].ResultRow) == "Average") {
                        if ($("#tablerows tbody").find("tr:visible").length <= 5) {
                            Column_Style[index1].Total = totalvalue / $("#tablerows").find(".tbloverview tbody").find("tr:visible").length;


                        }
                        else {
                            Column_Style[index1].Total = totalvalue / ($("#tablerows").find(".tbloverview tbody").find("tr:visible").length - 1);

                        }

                    }
                    else if ((Column_Style[index1].ResultRow) == "Count") {
                        if ($("#tablerows tbody").find("tr:visible").length <= 5) {
                            Column_Style[index1].Total = $("#tablerows tbody").find("tr:visible").length;
                        }
                        else {
                            Column_Style[index1].Total = $("#tablerows tbody").find("tr:visible").length - 1;
                        }

                    }
                    else if ((Column_Style[index1].ResultRow) == "Min") {
                        Column_Style[index1].Total = minimum;
                    }
                    else if ((Column_Style[index1].ResultRow) == "Max") {
                        Column_Style[index1].Total = maximum;
                    }
                    else if ((Column_Style[index1].ResultRow) = "Empty") {
                        Column_Style[index1].Total = "";
                    }

                }
            }

        }
        if (model.viewer != true) {
            if (model.type == "add") {
                var ref = $('#bitree').jstree(true);
                var seltxt = ref.get_selected();

                var $tableid = $(document.getElementById(model.id));
                var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                var th_index = $(targetth).index();
                $('.tablescope').find('tr').each(function () {
                    $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                    $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                });
            }
        }
    }

    else {
        $("#tablerows tbody").empty();
        var $tdelement = $("#tablerows tbody");

        var row = $('<tr>');

        for (var c = 0; c < coldata.length; c++) {

            row.append($('<td  style="width: ' + coldata[c].width + ';display:' + coldata[c].Visibility + ';line-height:' + coldata[c].Linehieght + '%;font-size:' + coldata[c].FontSize + 'em;border-right-width: ' + coldata[c].RightColumnBorder + ';background: ' + coldata[c].BodyBackground + ';border-color: ' + coldata[c].BorderColor + ';border-left-width: ' + coldata[c].LeftColumnBorder + ';" >').text(""));
            $tdelement.append(row);
        }

    }

    for (var i = 0; i < coldata.length; i++) {
        colobject = coldata[i];
        if (colobject.HFontSizeVal == "Small") {
            htempfont = parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght);
        }
        else if (colobject.HFontSizeVal == "Medium") {
            htempfont = 1.2;
            htemplineheight = parseInt(colobject.HLinehieght) - 19;
        }
        else if (colobject.HFontSizeVal == "Large") {
            htempfont = 1.9 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 30;
        }
        else if (colobject.HFontSizeVal == "Very Large") {
            htempfont = 2.3 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 26;
        }
        $("#tablefooter tbody").empty();
        var $thelement = $("#tablefooter tbody");
        thftr += '<th class="cx-table" data-thid="' + colobject.id + '" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: ' + colobject.Hallignment + ';border-top-width: 1px;border-right-width: ' + colobject.RightColumnBorder + ';border-left-width: ' + colobject.LeftColumnBorder + ';line-height:' + htemplineheight + '%;border-color:' + colobject.HeaderBorderColor + ';font-size: ' + htempfont + 'em;font-weight: ' + colobject.HFontweight + ';font-style: ' + colobject.HFontstyle + ';text-decoration: ' + colobject.HTextDecoration + ';color: ' + colobject.HFontcolor + ';display: ' + colobject.Visibility + ';background: ' + colobject.HeaderBackground + ';width: ' + colobject.width + ';height: 23px;vertical-align: middle;"><div class="cell align-0 fmt-txt" style="display: block;">' + colobject.ResultPrefix + colobject.Total + colobject.ResultSuffix + '</div></th>';
        $thelement.append("<tr>" + thftr + "</tr>");
    }



}



function refresh() {

    $(".bi-widget-item").each(function () {
        var $control = $(this);
        var ctrlid = $control.children().attr("id");
        var ctrltype = $control.children().attr("class");
        var bicontrol = new Object();
        bicontrol.type = ctrltype;
        if ($control.parent().hasClass("layout-cell"))
            bicontrol.parent = "grid";
        else
            bicontrol.parent = "widget";
        switch (ctrltype) {
            case "jqplot-target":
                selecteditem = bichart.byId(bichart, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "tablescope":
                selecteditem = table.byId(table, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-label":
                selecteditem = text.byId(text, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-textbox":
                selecteditem = textbox.byId(textbox, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-dropdown":
                // selecteditem = dropdown.byId(dropdown, ctrlid);
                //selecteditem.unset("refresh", { silent: true });
                //  selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-valuepair":
                selecteditem = valuepair.byId(valuepair, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-serverchart":
                selecteditem = biserverchart.byId(biserverchart, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-serverpivotchart":
                selecteditem = bipivotchart.byId(bipivotchart, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-htmltemplate":
                selecteditem = htmltag.byId(htmltag, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-Gagetemplate":
                selecteditem = Gagetag.byId(Gagetag, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-MeterGagetemplate":
                selecteditem = metergauge.byId(metergauge, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-progressbar":
                selecteditem = Progressbar.byId(Progressbar, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;

            default:
                break;
        }
        // Controls.push(bicontrol);
    });
}
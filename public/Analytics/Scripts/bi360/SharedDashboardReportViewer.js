var serverchartsharemdr = new Array();
var serverpivotchartmdr = new Array();
var serverassetkpichartmdr = new Array();



$(document).ready(function () {

    function getURLParameter(name) {
        return decodeURIComponent(
        (location.search.match(RegExp("[?|&]" + name + '=(.+?)(&|$)')) || [, null])[1]);
    }
    var id = getURLParameter("id");
    var dashboardid = id;

    $.ajax({
        url: "../../home/getdashboardbyid",
        method: 'post',
        async: false,
        cache: false,
        beforeSend: function () {
            ShowLoader();
        },
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
            //$("#widgetstore").empty(); $("#Dashboard").width(dashboardconfig[0].parentwidth); $("#Dashboard").attr("data-width", dashboardconfig[0].parentwidth);
            //$("#Dashboard,#widgetstore").height(dashboardconfig[0].parentheight);
            $("#widgetstore").empty();
            $("#Dashboard").width("99%"); $("#Dashboard").attr("data-width", "99%");
            $("#Dashboard,#widgetstore").height(parseInt(dashboardconfig[0].parentheight) + 60);
            for (var i = 0; i < dashboardconfig.length; i++) {
                var config = dashboardconfig[i];
                createwidget(config.Id, config.width, config.Name);
                for (var bi = 0; bi < config.bicontrols.length; bi++) {
                    var bimodel = config.bicontrols[bi];
                    var ctrltype = bimodel.type;
                    switch (ctrltype) {
                        case "jqplot-target":
                            var model = bimodel.model;
                            model.viewer = true;
                            bichart.add([model]);
                            break;
                        case "tablescope":
                            var model = bimodel.model;
                            model.viewer = true;
                            table.add([model]);
                            break;
                        case "pivottablescope":
                            var model = bimodel.model;
                            model.viewer = true;
                            bipivottable.add([model]);
                            break;

                        case "bi-label":
                            var model = bimodel.model;
                            model.viewer = true;
                            text.add([model]);
                            break;
                        case "bi-textbox":
                            var model = bimodel.model;
                            model.viewer = true;
                            textbox.add([model]);
                            break;
                        case "bi-dropdown":
                            var model = bimodel.model;
                            model.viewer = true;
                            dropdown.add([model]);
                            break;
                        case "bi-multiselect":
                            var model = bimodel.model;
                            model.viewer = true;
                            multiselect.add([model]);
                            break;
                        case "bi-valuepair":
                            var model = bimodel.model;
                            model.viewer = true;
                            valuepair.add([model]);
                            break;
                        case "bi-dashboardchart":
                            var model = bimodel.model;
                            model.viewer = true;
                            dashboardchart.add([model]);
                            break;
                        case "bi-serverchart":
                            var model = bimodel.model;
                            model.viewer = true;
                            serverchartsharemdr.push(model);
                            biserverchart.add([model]);
                            break;
                        case "bi-serverpivotchart":
                            var model = bimodel.model;
                            model.viewer = true;
                            serverpivotchartmdr.push(model);
                            bipivotchart.add([model]);
                            break;
                        case "bi-image":
                            var model = bimodel.model;
                            model.viewer = true;
                            image.add([model]);
                            break;
                        case "bi-Radio":
                            var model = bimodel.model;
                            model.viewer = true;
                            radio.add([model]);
                            break;
                        case "bi-htmltemplate":
                            var model = bimodel.model;
                            model.viewer = true;
                            htmltag.add([model]);
                            break;
                        case "bi-progressbar":
                            var model = bimodel.model;
                            model.viewer = true;
                            Progressbar.add([model]);
                            break;
                        case "bi-Gagetemplate":
                            var model = bimodel.model;
                            model.viewer = true;
                            Gagetag.add([model]);
                            break;
                        case "bi-MeterGagetemplate":
                            var model = bimodel.model;
                            model.viewer = true;
                            metergauge.add([model]);
                            break;
                        case "comp cx-panel_grid":
                            var model = bimodel.model;
                            model.viewer = true;
                            layoutgrid.add([model]);
                            //updategridcells($scope, $location, $http, $compile, "", "", "layoutgrid", bimodel.model.id, layoutgrid.byId(layoutgrid, bimodel.model.id))
                            break;
                        case "jqgridscope":
                            var model = bimodel.model;
                            model.getjqgrid = true;
                            bijqgrid.add([bimodel.model]);
                            break;
                        case "bi-serverassetkpichart":
                            var model = bimodel.model;
                            model.viewer = true;
                            serverassetkpichartmdr.push(model);
                            biassetkpichart.add([bimodel.model]);
                            break;
                        case "bi-serverassetservicekpichart":
                            var model = bimodel.model;
                            model.viewer = true;
                            //serverassetkpichartmdr.push(model);
                            biassetservicekpichart.add([bimodel.model]);
                            break;
                        case "bi-serverassetjobplankpichart":
                            var model = bimodel.model;
                            model.viewer = true;
                            //serverassetkpichartmdr.push(model);
                            biassetjobplankpichart.add([bimodel.model]);
                            break;

                        default:
                            break;
                    }
                }
            }
            CLEAREXTRAINLAYOUT();
            fullscreenchart(dashboardid);
            HideLoader();

            setTimeout(function () {
                refresh();
            }, 1000);
        }

    });
});

function CLEAREXTRAINLAYOUT() {
    $(".widget-body").find('.bi-widget-item').each(function (a) {
        $(this).find('table tbody tr').each(function (b) {
            if (b != 0) {
                $(this).find('td').each(function (c) {
                    $(this).find('.bi-widget-item').each(function (d) {
                        if (d != 0)
                            $(this).remove();
                    });
                });
            }
        });
    });
}

function fullscreenchart(dashboardid) {
    $(".bi-widget-item").find(".expand").click(function () {
        var ctrlid = $(this).attr("dataexpand-id");
        var sFeatures = "dialogHeight: 500px;dialogWidth: 1500px;";
        var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/ExpandChart?id=" + ctrlid + "&dsid=" + dashboardid;
        window.showModalDialog(shareurl, "", sFeatures);
    });
}
$(window).resize(function () {
    clearTimeout($.data(this, 'resizeTimer'));
    $.data(this, 'resizeTimer', setTimeout(function () {
        viewchartsharedresize(serverchartsharemdr, $(window).width());
        viewpivotchartresize(serverpivotchartmdr, $(window).width());
        viewassetkpichartresize(serverassetkpichartmdr, $(window).width());      

        //alert("Haven't resized in 200ms!");
    }, 200));
});

function viewchartsharedresize(modelsharearr, width) {
    for (var bi = 0; bi < modelsharearr.length; bi++) {
        var model = modelsharearr[bi];
        var element = model.id;
        var manualwidth = "100%";
        var width;
        var twidth = $(window).width();
        twidth = parseInt(twidth) - 10;
        //var modalheight = $(window).height();
        // var height = modalheight;
        if (manualwidth.toString().indexOf("%") != -1) {
            width = parseFloat(manualwidth.replace("%", ""));
            width = (twidth * width) / 100;
        }
        if (model.type == "widget") {
            model.style.width = parseInt(width) - 10;
        }
        else {
            var target = model.target;
            var $targetref;
            var serverchartobj = document.getElementById(target.split("@")[0]);
            $targetref = $(serverchartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
            model.style.width = $targetref.width();
        }
        model.style.height = model.style.height;
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
                    $(".widget").find(".bi-widget-item").find("#" + element).attr("src", 'data:image/png;base64,' + data.chartdata + '').show();
                    var yformula = ydata[0].formula;
                    //..... tooltip operation..............//
                    $(".widget").find(".bi-widget-item").find("#" + element).find(".bi-serverchart").parent().find(".tip").remove();
                    $(".widget").find(".bi-widget-item").find("#" + element).find(".bi-serverchart").parent().append("<div class='tip'></div>");
                    if (yformula != "undefined") {
                        $(".widget").find(".bi-widget-item").find("#" + element).find(".bi-serverchart").parent().find(".tip").html(data.mapimg).show();
                    }
                    //..... tooltip operation ended..............//                        
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

}


function viewpivotchartresize(chartobj, twidth) {
    for (var bi = 0; bi < chartobj.length; bi++) {
        var model = chartobj[bi];
        var manualwidth = model.get("style").manualwidth;
        var width;
        var element = model.id;
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
        var colorobject = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];


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
                    $(element).find(".bi-serverpivotchart").attr("src", 'data:image/png;base64,' + data.pivotchart + '').show();

                    var yformula = ydata[0].formula;
                    //..... tooltip operation..............//
                    $(element).find(".bi-serverpivotchart").parent().find(".tip").remove();
                    $(element).find(".bi-serverpivotchart").parent().append("<div class='tip'></div>");
                    if (yformula != "undefined") {
                        $(element).find(".bi-serverpivotchart").parent().find(".tip").html(data.pivotchartmap).show();
                    }
                    //..... tooltip operation ended..............//

                    //..... cloning for preview..............//
                    var styledata1 = model.get("style");
                    $("#previewobject").empty();
                    $(element).find(".bi-serverpivotchart").clone(true).removeAttr('id').appendTo($("#previewobject"));
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
}
//.... chart control functionality ended.....//


//....... display tooltip for chart data..........//
function DisplayToolTip(value1, value2, ex) {
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
        tooltip.style.top = (posy) + "px";
    }
    // $("#MyTooltip").text(value1 + "," + value2);
    toolcls.height('auto');
    toolcls.width('auto');
    toolcls.tooltip();
}
//....... display tooltip for chart data ended..........//

//....... hiding tooltip for chart data..........//
function hide() {
    var toolcls = $(".tooltipcls");
    toolcls.css({ "display": "none" });
}
//....... hiding tooltip for chart data ended..........//


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
    alert(chartid);
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




//.... chart control functionality.....//
function viewassetkpichartresize(chartobj, twidth) {
    for (var bi = 0; bi < chartobj.length; bi++) {
        var model = chartobj[bi];
        var manualwidth = model.get("style").manualwidth;
        var width;
        var element = model.id;
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
            "chartheight": parseInt(chartstyledata.height) - 30,
            "backgradientstyle": chartstyledata.backgradientstyle,
            "backgroundcolor": chartstyledata.backgroundcolor,
            "bordercolor": chartstyledata.bordercolor,
            "borderwidth": chartstyledata.borderwidth,
            "borderstyle": chartstyledata.borderstyle,
            "borderskin": chartstyledata.borderskin,

            "assetid": chartstyledata.assetid,
            "assetname_id": chartstyledata.assetname_id,
            "assetname": chartstyledata.assetname,
            "asset_from": chartstyledata.asset_from,
            //"asset_to": chartstyledata.asset_to,
            "asset_refreshrate": chartstyledata.asset_refreshrate,



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
            "legendforecolor": chartlegenddata.legendforecolor,
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
            url: "../../Chart/GetAssetKPIChart",
            method: 'POST',
            async: false,
            cache: false,
            data: { xdata: xdataobj, ydata: ydataobj, zseriesdata: zseriesdataobj, chartproperties: chartstyleprop, chartid: model.get("id") },
            success: function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else {
                    $(element).find(".bi-serverassetkpichart").attr("src", 'data:image/png;base64,' + data.AssetKPIchart + '').show();

                    var yformula = ydata[0].formula;
                    //..... tooltip operation..............//
                    $(element).find(".bi-serverassetkpichart").parent().find(".tip").remove();
                    $(element).find(".bi-serverassetkpichart").parent().append("<div class='tip'></div>");
                    //if (yformula != "undefined") {
                    $(element).find(".bi-serverassetkpichart").parent().find(".tip").html(data.AssetKPIchartmap).show();
                    //}
                    //..... tooltip operation ended..............//

                    //..... cloning for preview..............//
                    var styledata1 = model.get("style");
                    $("#previewobject").empty();
                    $(element).find(".bi-serverassetkpichart").clone(true).removeAttr('id').appendTo($("#previewobject"));
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
}
//.... chart control functionality ended.....//


////....... display tooltip for chart data..........//
function DisplayAssetKPIToolTip(value1, value2, ex) {
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
function assetkpitooltiphide() {
    var toolcls = $(".tooltipcls");
    toolcls.css({ "display": "none" });
}
////....... hiding tooltip for chart data ended..........//


////....... DrilldownConfig based on chart series data..........//
function AssetKPIDrilldownConfig(valx, valy, chartid, event) {
    event.stopPropagation();
    //alert(JSON.stringify(bipivotchart));
    var selecteditem = biassetkpichart.byId(biassetkpichart, chartid);
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


function createwidget(widgetid, width, name) {
    if (width == "100%")
        width = "99%";
    var template = '<div class="item-container" id="' + widgetid + '" style="margin-bottom: 5px; width:' + width + ';position: relative;float:left" data-width="' + width + '">' +
                  '<div class="item-resizable ui-resizable" style="height: auto;min-height: 198px;">' +
                      '<div class="widget" style="display: block; height: auto;min-height: 196px;">' +
                          '<div class="widget-toolbar widget-toolbar-nohover" style="">' +
                              '<span class="widget-toolbar-title" >' + name + '</span><div class="widget-toolbar-buttons"></div> </div>' +
                          '<div class="widget-body" style="padding: 10px; min-height: 190px;"></div> </div></div> </div>';
    var haschild = false; var expectedheight = 0;
    if ($(".item-container").length > 0) {
        var $lastwidget = $(".item-container").last();
        haschild = true;
        $(template).insertAfter($lastwidget);
    }
    else {
        $("#widgetstore").append(template);
    }
    //$(".bi-widget-item").css("z-index", "11");
}



function refresh() {
    //$(".bi-widget-item").css("z-index", "11");
    $(".bi-widget-item").each(function () {
        var $control = $(this);
        var ctrlid = $control.children().attr("id");
        var ctrltype = $control.children().attr("class");
        if (ctrltype == "txtlabel") {
            ctrltype = "bi-textbox";
            ctrlid = $control.find(".bi-textbox").attr("id");
        }
        if (ctrltype == "expandhover") {
            ctrltype = "bi-serverchart";
            ctrlid = $control.find(".bi-serverchart").attr("id");
        }
        if (ctrltype == "pivotexpandhover") {
            ctrltype = "bi-serverpivotchart";
            ctrlid = $control.find(".bi-serverpivotchart").attr("id");
        }
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
            case "pivottablescope":
                selecteditem = bipivottable.byId(bipivottable, ctrlid);
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
            case "jqgridscope":
                //alert("ss jqgrid");
                selecteditem = bijqgrid.byId(bijqgrid, ctrlid);
                selecteditem.getjqgrid = true;
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            default:
                break;
        }
        // Controls.push(bicontrol);
    });

    setTimeout(function () {
        refresh();
    }, 1000);
}
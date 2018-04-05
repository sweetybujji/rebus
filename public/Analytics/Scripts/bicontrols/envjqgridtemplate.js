var jqgrid = Backbone.Model.extend({
    initialize: function () {
    }
});
var jqgrids = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: jqgrid,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var jqgridtamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%">';
        jqgridtamplate += '<div id="' + model.get("id") + '" style="width:100%;" class="jqgridscope">';
        jqgridtamplate += '<table id="jqgrid_' + model.get("id") + '" class="bi-jqgrid" style="width:100%;height:auto;border-right-width:1px;"></table>';
        jqgridtamplate += '<div id="jqgridpager_' + model.get("id") + '"></div>';
        jqgridtamplate += '<div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><br/><div id="tablediv' + model.get("id") + '" style="width:" class="tablescopeappend"></div></div>';
        //alert(jqgridtamplate);
        //var servercharttamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%"><div class="expandhover"><div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div>';
        //servercharttamplate += '<table class="cx-table overview tbloverview"  style="width:100%;border-right-width:1px;border-bottom-width:1px;height:' + model.get("style").height + ';"><thead style="display:none"></thead><tbody></tbody></table><table class="cx-table tblfooter" style="width:100%;border-right-width:1px;"><tbody></tbody></table>'
        //servercharttamplate += '</div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var serverchartobj = document.getElementById(target.split("@")[0]);
                $targetref = $(serverchartobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(jqgridtamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(jqgridtamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(jqgridtamplate);
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
        getjqgrid(element, model, $targetref.width());
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        var element = $(document.getElementById(model.get("id"))).parent();
        var connectionid = model.get("xaxis").connectionid; var connectiontype = model.get("xaxis").connectiontype;
        var dsId = model.get("xaxis").DSId; var dsName = model.get("xaxis").DSName;
        var DSCnnCretedby = model.get("xaxis").DSCnnCretedby;
        var _data = new Object();
        var formula = model.get("xaxis").formula;
        _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
        _data.formulea = formula;
        var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
        
        var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };
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
        $(element).children().find("table").css({ "width": (manualwidth) });
        //alert($targetref.width());        
        getjqgrid(element, model, $targetref.width());
    },
    byName: function (name) {
        filtered = this.filter(function (jqgrid) {
            return jqgrid.get("name") === name;
        });
        return new jqgrid(filtered);
    },
    byId: function (jqgrid, id) {
        return jqgrid.find(function (model) { return model.get('id') == id });
    }
});

//....biserverchart backbone object....//
var bijqgrid = new jqgrids();


//.... getting data based on math operations.....//
function GetDataAjax(params) {
    var Data_d = JSON.stringify(params);
    return $.ajax({
        url: "../../GetAllConnectionData/GET_DataForMathOperations",
        method: 'POST',
        async: false,
        contentType: "application/json",
        data: Data_d
    });
}
//.... getting data based on math operations ended.....//

//.... chart control functionality.....//
function getjqgrid(chartobj, model, twidth) {
    //alert(model.get("getjqgrid"));
    //if (model.get("getjqgrid") == true) {
        //var control_id = $scope.view.getSelected().controlid;
        //alert(control_id);
        //Genarategrid(control_id);
        //model = bijqgrid.byId(bijqgrid, $scope.view.getSelected().controlid);
        //var chartobj = $(document.getElementById(model.get("id"))).parent();
        //var target = model.get("target");
        //var $targetref = $(document.getElementById(target)).find('.widget-body');
        //var twidth = $targetref.width();
        //function getpivottable(chartobj, model, twidth) {
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
        var chartlegenddata = model.get("legendproperties");
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
            url: "../../Chart/GetjQGrid",
            method: 'POST',
            async: false,
            cache: false,
            data: { xdata: xdataobj, ydata: ydataobj, zseriesdata: zseriesdataobj, chartproperties: chartstyleprop, chartid: model.get("id") },
            success: function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else {
                    var manualwidth = model.get("style").manualwidth;
                    var height = model.get("style").height;
                    $(chartobj).css({ "width": "100%", "height": "auto" });
                    $(chartobj).children().find("table").css({ "width": "100%", "height": "auto" });
                    var xaxisdata = model.get("xaxis");
                    var yaxisdata = model.get("yaxis");
                    var xformula = xaxisdata.formula;
                    var yformula = yaxisdata.formula;
                    var columnnames = [];
                    if (xformula == "undefined") {
                    }
                    else {
                        if (xformula.indexOf('[') > -1) {
                            xformula = xformula.slice(1, -1);
                        }
                        columnnames.push(xformula);
                    }
                    if (yformula == "undefined") {
                    }
                    else {
                        yformula = yformula.slice(1, -1);
                        columnnames.push(yformula);
                    }
                    var seriesdata = model.get("series");
                    for (var i = 0; i < seriesdata.length; i++) {
                        var zaxiscolumn = seriesdata[i].formula;
                        if (zaxiscolumn == "undefined") {

                        }
                        else {
                            if (zaxiscolumn.indexOf('[') > -1) {
                                zaxiscolumn = zaxiscolumn.slice(1, -1);
                            }
                            columnnames.push(zaxiscolumn);
                        }
                    }
                    var grouptext = [];
                    if (xaxisdata.groupcolumn == true) {
                        var xaxisformula = xaxisdata.formula;
                        if (xaxisformula.indexOf('[') > -1) {
                            xaxisformula = xaxisformula.slice(1, -1);
                        }
                        grouptext.push(xaxisformula);
                    }
                    if (yaxisdata.groupcolumn == true) {
                        var yaxisformula = yaxisdata.formula;
                        if (yaxisformula.indexOf('[') > -1) {
                            yaxisformula = yaxisformula.slice(1, -1);
                        }
                        grouptext.push(yaxisformula);
                    }
                    //var seriesdata = model.get("series");
                    //for (var i = 0; i < seriesdata.length; i++) {
                    //    var zaxiscolumn = seriesdata[i].formula;
                    //    if (zaxiscolumn == "undefined") {

                    //    }
                    //    else {
                    //        if (zaxiscolumn.indexOf('[') > -1) {
                    //            zaxiscolumn = zaxiscolumn.slice(1, -1);
                    //        }
                    //        columnnames.push(zaxiscolumn);
                    //        if (seriesdata[i].groupcolumn == "true") {
                    //            grouptext.push(zaxiscolumn);
                    //        }
                    //    }
                    //}
                    var seriesdata = model.get("series");
                    for (var i = 0; i < seriesdata.length; i++) {
                        if (seriesdata[i].groupcolumn == true) {
                            var zaxiscolumn = seriesdata[i].formula;
                            if (zaxiscolumn.indexOf('[') > -1) {
                                zaxiscolumn = zaxiscolumn.slice(1, -1);
                            }
                            grouptext.push(zaxiscolumn);
                        }
                    }
                    var groupingcolval = [];
                    if (xaxisdata.groupingcolumn == true) {
                        var xaxisformula = xaxisdata.formula;
                        if (xaxisformula.indexOf('[') > -1) {
                            xaxisformula = xaxisformula.slice(1, -1);
                        }
                        groupingcolval.push(xaxisformula);
                    }
                    if (yaxisdata.groupingcolumn == true) {
                        var yaxisformula = yaxisdata.formula;
                        if (yaxisformula.indexOf('[') > -1) {
                            yaxisformula = yaxisformula.slice(1, -1);
                        }
                        groupingcolval.push(yaxisformula);
                    }
                    //var seriesdata = model.get("series");
                    //for (var i = 0; i < seriesdata.length; i++) {
                    //    var zaxiscolumn = seriesdata[i].formula;
                    //    if (zaxiscolumn == "undefined") {

                    //    }
                    //    else {
                    //        if (zaxiscolumn.indexOf('[') > -1) {
                    //            zaxiscolumn = zaxiscolumn.slice(1, -1);
                    //        }
                    //        //columnnames.push(zaxiscolumn);
                    //        if (seriesdata[i].groupingcolumn == "true") {
                    //            groupingcolval.push(zaxiscolumn);
                    //        }
                    //    }
                    //}
                    var seriesdata = model.get("series");
                    for (var i = 0; i < seriesdata.length; i++) {
                        //alert(seriesdata[i].groupingcolumn);
                        if (seriesdata[i].groupingcolumn == true) {
                            var zaxiscolumn = seriesdata[i].formula;
                            if (zaxiscolumn.indexOf('[') > -1) {
                                zaxiscolumn = zaxiscolumn.slice(1, -1);
                            }
                            groupingcolval.push(zaxiscolumn);
                        }
                    }
                    //groupingcolval = "" + groupingcolval + "";
                    var normalcolmodel = [];
                    var normalcolmodel = $(columnnames).not(grouptext).get();
                    var ColModel1 = []; var ColModel2 = [];
                    for (var j = 0; j < normalcolmodel.length; j++) {
                        ColModel1.push({ name: normalcolmodel[j], index: normalcolmodel[j], align: 'center' });
                    }
                    for (var j = 0; j < grouptext.length; j++) {
                        ColModel1.push({ name: grouptext[j], index: grouptext[j], align: 'center', summaryTpl: "Sum: {0}", summaryType: "sum" });
                    }                    
                    var grouptextstring = "";
                    if (grouptext.length > 0) {
                        grouptextstring += '<b style="margin-right:50px;">{0}</b>';
                        for (var gp = 0; gp < grouptext.length; gp++) {
                            //grouptext[gp] = grouptext[gp].slice(1, -1);
                            grouptextstring += grouptext[gp] + '  <b style="margin-right:50px;">' + '{' + grouptext[gp] + '}</b>';
                        }
                    }
                    grouptextstring = '' + grouptextstring + '';                   
                    var jqarr = JSON.parse(data);
                    var xaxiscoldata = model.get("xaxis");
                    if (jqarr.length > 0) {
                        var gridtype = $('input[name= gridtype]:checked').val();
                        //alert(xaxiscoldata.gridtype);
                        if (xaxiscoldata.gridtype == "Normal") {
                            var ID = model.get("id");
                            var pagerid = "#jqgridpager_" + ID;
                            //$(chartobj).find("#jqgrid_" + model.get("id")).GridUnload();
                            $.jgrid.gridUnload("#jqgrid_" + model.get("id"));
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('clearGridData');
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('setGridParam', { data: jqarr, page: 1 });

                            var boolgrp = xaxiscoldata.groupbool;
                            if (boolgrp == "true") {
                                $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('groupingRemove');
                            }
                            $(chartobj).find("#jqgrid_" + model.get("id")).trigger('reloadGrid');
                            for (var j = 0; j < columnnames.length; j++) {
                                ColModel2.push({ name: columnnames[j], index: columnnames[j], align: 'center' });
                            }
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid({
                                data: jqarr,
                                datatype: "local",
                                page: 1,
                                //loadonce: false,
                                colNames: columnnames,
                                colModel: ColModel2,
                                mtype: "POST",
                                width: "auto",
                                height: "auto",
                                rowNum: 10,
                                pager: pagerid,
                                grouping: false,
                                autowidth: true
                            });
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('navGrid', pagerid, { edit: false, add: false, del: false });
                            $(chartobj).find("#jqgrid_" + model.get("id")).trigger('reloadGrid');

                            $(window).on("resize", function () {
                                var newWidth = $(pagerid).closest(".ui-jqgrid").parent().width();
                                $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid("setGridWidth", newWidth, true);
                            });
                            $("#previewobject").empty();
                            $(chartobj).find("#jqgrid_" + model.get("id")).clone(true).removeAttr('id').appendTo($("#previewobject"));
                            $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block", "overflow": "auto" });
                            $("#previewobject").children().css({ "height": "175px" });
                        }
                        else {
                            $.jgrid.gridUnload("#jqgrid_" + model.get("id"));
                            var ID = model.get("id");
                            var pagerid = "#jqgridpager_" + ID;
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('clearGridData');
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('setGridParam', { data: jqarr });
                            //$(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('groupingRemove', false);
                            //alert(JSON.stringify(ColModel1));
                            $(chartobj).find("#jqgrid_" + model.get("id")).trigger('reloadGrid');

                            //alert(pagerid);
                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid({
                                data: jqarr,
                                datatype: "local",
                                page: 1,
                                //loadonce: true,
                                colNames: columnnames,
                                colModel: ColModel1,
                                mtype: "POST",
                                width: "auto",
                                height: "auto",
                                rowNum: 10,
                                pager: pagerid,
                                autowidth: true,
                                grouping: true,
                                gridview: true,
                                viewrecords: 'true',
                                scroll: true,
                                rowList: [10, 20, 30],
                                //groupingView: {
                                //    groupField: groupingcolval,
                                //    groupColumnShow: [true],
                                //    groupCollapse: false,
                                //    //groupColumnShow: [true, true],
                                //    groupText: [ // user the name of a column with curly braces to use it in a summary expression.                                                     
                                //                grouptextstring
                                //    ],
                                //    //groupOrder: ["asc", "asc"],
                                //    //groupSummary: [false, false],
                                //    //groupCollapse: true,
                                //    //groupDataSorted: true
                                //},
                                footerrow: true,
                                gridComplete: function () {
                                    var sumaHa = 0;
                                    var columnNames = $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('getGridParam', 'colNames');
                                    $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('footerData', 'set', { Items: 'TOTAL CUENTA:' });
                                    for (var z = 0; z < grouptext.length; z++) {
                                        var colN = grouptext[z];
                                        var colgtSumgt = $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('getCol', colN, false, 'sum');
                                        sumaHa = colgtSumgt;
                                        var obj = '[{"' + colN + '": "' + parseFloat(sumaHa).toFixed(2) + '"}]';
                                        var colFoot = JSON.parse(obj);
                                        $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('footerData', 'set', colFoot[0]);
                                    }

                                }
                            });
                            var GroupOption = new Object();
                            GroupOption.groupField = groupingcolval;
                            //alert(grouptextstring);
                            if (grouptextstring == "") {
                            }
                            else {
                                GroupOption.groupText = [grouptextstring];
                            }
                            GroupOption.groupCollapse = false;
                            GroupOption.groupColumnShow = [true];

                            $(chartobj).find("#jqgrid_" + model.get("id")).setGridParam({ groupingView: GroupOption });
                            $(chartobj).find("#jqgrid_" + model.get("id")).setGridParam({ grouping: true });

                            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('navGrid', pagerid, { edit: false, add: false, del: false });
                            $(chartobj).find("#jqgrid_" + model.get("id")).trigger('reloadGrid');

                            $(window).on("resize", function () {
                                var newWidth = $(pagerid).closest(".ui-jqgrid").parent().width();
                                $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid("setGridWidth", newWidth, true);
                            });
                            $("#previewobject").empty();
                            $(chartobj).find("#jqgrid_" + model.get("id")).clone(true).removeAttr('id').appendTo($("#previewobject"));
                            $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block", "overflow": "auto" });
                            $("#previewobject").children().css({ "height": "175px" });
                            //..... cloning for preview ended..............//
                        }
                    }
                    else {
                    }




                    //if (jqarr.length > 0) {                      
                    //    var ID = model.get("id");
                    //    var pagerid = "#jqgridpager_" + ID;
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('clearGridData');
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('setGridParam', { data: jqarr });
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).trigger('reloadGrid');
                    //    //alert(pagerid);
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid({
                    //        data: jqarr,
                    //        datatype: "local",
                    //        page: 1,
                    //        loadonce: true,
                    //        colNames: columnnames,
                    //        colModel: ColModel1,
                    //        mtype: "POST",
                    //        width: "100%",
                    //        height: "auto",
                    //        rowNum: 10,
                    //        pager: pagerid,
                    //        autowidth: true,
                    //        grouping: true,
                    //        gridview: true,
                    //        viewrecords: true,
                    //        scroll: true,
                    //        rowList: [10, 20, 30],
                    //        groupingView: {
                    //            groupField: [groupingcolval],
                    //            groupColumnShow: [true],
                    //            //groupCollapse: false,
                    //            //groupColumnShow: [true, false],
                    //            groupText: [ // user the name of a column with curly braces to use it in a summary expression.                                             
                    //                        grouptextstring                                           
                    //            ]
                    //            //groupOrder: ["asc", "asc"],
                    //            //groupSummary: [true, false],
                    //            //groupCollapse: true,
                    //            //groupDataSorted: true
                    //        },
                    //        footerrow: true,
                    //        gridComplete: function () {
                    //            var sumaHa = 0;
                    //            var columnNames = $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('getGridParam', 'colNames');
                    //            $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('footerData', 'set', { Items: 'TOTAL CUENTA:' });
                    //            for (var z = 0; z < grouptext.length; z++) {
                    //                var colN = grouptext[z];
                    //                var colgtSumgt = $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('getCol', colN, false, 'sum');
                    //                sumaHa = colgtSumgt;
                    //                var obj = '[{"' + colN + '": "' + parseFloat(sumaHa).toFixed(2) + '"}]';
                    //                var colFoot = JSON.parse(obj);
                    //                $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('footerData', 'set', colFoot[0]);
                    //            }
                    //        }
                    //    });                       
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid('navGrid', pagerid, {}, { edit: true }, { add: true }, { del: false }, { search: true }, { refresh: true });
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).trigger("reloadGrid", [{ current: true }]);

                    //    $(window).on("resize", function () {
                    //        var newWidth = $(pagerid).closest(".ui-jqgrid").parent().width();
                    //        $(chartobj).find("#jqgrid_" + model.get("id")).jqGrid("setGridWidth", newWidth, true);
                    //    });

                    //    $("#previewobject").empty();
                    //    $(chartobj).find("#jqgrid_" + model.get("id")).clone(true).removeAttr('id').appendTo($("#previewobject"));
                    //    $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block", "overflow": "auto" });
                    //    $("#previewobject").children().css({ "height": "175px" });
                    //    //..... cloning for preview ended..............//
                    //}
                    //else {
                    //}
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    //}
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

//    var selecteditem = bijqgrid.byId(bijqgrid, chartid);
//    if (typeof selecteditem == "undefined") {

//    }
//    else {
//        var drillobj = selecteditem.get("drilldown");
//        // drilldown: { "DashboardId": "", "DashboardName": "", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" },

//        //  alert(JSON.stringify(drillobj));
//        var varlist = new Object();
//        var chartxparam = drillobj.ChartXParameterName;
//        var chartyparam = drillobj.ChartYParameterName;
//        if ((chartxparam != "")) {
//            varlist[chartxparam] = valx;
//        }
//        if ((chartyparam != "")) {
//            varlist[chartyparam] = valy;
//        }
//        var targetdashboard = drillobj.DashboardId;
//        if (targetdashboard != "") {
//            $.ajax({
//                url: "../../CreateParameter/UpdateParamVal",
//                method: 'GET',
//                async: false,
//                cache: false,
//                headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
//                data: { Varvalues: JSON.stringify(varlist) }
//            }).success(function (data) {
//                var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
//                var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
//                window.location.href = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
//                //window.showModalDialog(shareurl, "", sFeatures);
//            });
//        }
//    }
//}
////.......  DrilldownConfig based on chart series data ended..........//




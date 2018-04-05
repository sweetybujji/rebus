function envd3chart($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;

    //************************ Adding Control to Backbone ************************
    if (controlid == "new") {
        bid3chart.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            series: [{ "id": "Series_" + $scope.view.getID() + "", "name": "Untitled", "charttype": "column", "series_color": [], "showvaluesonlabel": "true", "labelstyle": "Outside", "labeldatashow": "X-VALUES", "drawingstyle": "SoftEdge", "doughnutradius": "60", "chartcolumnstyle": "Cylinder", "labelplacement": "Right", "pyramiddrawingstyle": "CircularBase", "pyramidrotationangle": "0", "pyramidvaluetype": "Linear", "pyramidminpoint": "2", "pointwidth": "0.4", "srlinewidth": "1", "bubbleselstyle": "Circle", "stckedstyle": "true", "valuelabelangle": "0", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "ytwoaxis": "false", "data": [] }],
            style: { "position": "absolute", "width": "100%", "manualwidth": "100%", "height": "300px", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "palette": "", "backgroundcolor": "#ffffff", "bordercolor": "#ffffff", "borderstyle": "Solid", "backgradientstyle": "None", "borderskin": "None", "borderwidth": "2" },
            xaxis: { "id": "xaxis", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "data": [] },
            yaxis: { "FormatAs": "", "yname": "Untitled", "ytitlecolor": "#008000", "ytitlestyle": "Arial", "ytitlefontsize": "10", "yinterval": "yauto", "ymanualinterval": "", "DecimalPlaces": "undefined", "yaxistitle": "", "yShowlabels": "true", "ylabeldrop": "1", "yshowgridlines": "true" },
            seriespropperties: { "srShowLabels": "true", "srFormatAs": "Text", "DecimalPlaces": "undefined", "AxisTitle": "undefined" },
            xaxisproperties: { "xname": "Untitled", "xformatas": "Text", "xdecimalval": "0", "xtitlecolor": "#0000ff", "xtitlestyle": "Arial", "xtitlefontsize": "10", "xPrefix": "", "xSuffix": "", "xShowlabels": "true", "xlblstyleangle": "0", "xaxistitle": "", "xlabeldrop": "1", "xshowgridlines": "true" },
            legendproperties: { "PrimaryBackColor": "#ffffff", "SecondaryBackColor": "#ffffff", "legenddock": "Bottom", "legendGradient": "None", "Hatching": "Cross", "BorderColor": "#000000", "BorderSize": "2", "BorderDashStyle": "Solid", "ShadowOffset": "0", "LegendFontSize": "10", "LegendFontStyle": "Arial", "showlegends": "true" },
            areaproperties: { "BackColor": "#ffffff", "SecondaryColor": "#ffffff", "areaGradient": "None", "Clustered": "false", "showin3D": "false", "RotationX": "10", "RotationY": "10", "AreaPosX": "10", "AreaPosY": "10", "WallWidth": "5" },
            titleproperties: { "charttitle": "ChartTitle", "charttitlecolor": "#000000", "charttitlefontstyle": "Arial", "charttitlefontsize": "10", "charttitledocking": "Top", "titlePrefix": "", "titleSuffix": "", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" },
            drilldown: [{ "DashboardId": "", "DashboardName": "", "seriesname": "Untitled", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" }],
            refresh: "",
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = bid3chart.byId(bid3chart, Controlid);
    }
    else {
        selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }
    $("#seriescolorpick").colorpicker();

    $scope.selected = 2;
    $scope.selecteditem = "Chart";
    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $("#xaxistabproperties").hide();
    $("#yaxistabproperties").hide();
    $("#charttitleprop").hide();
    $("#chartareaprop").hide();
    $("#chartlegendprop").hide();
    selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
    $("#seriespropertiestab").hide();
    $("#drilldownproptab").hide();

    //************************ Loading Template with Tree,Preview and Properties ************************
    $http.get('../Analytics/Bi360Templates/Tabs/d3chartTabs.html').success(function (t) {
        $("#Tabsobject").html($compile(t)($scope));

        //For Loading Variables for Parameters Config
        $scope.LoadVariable();

        //For Selecting Chart Type
        $("#twoaxisdiv").empty();
        var Series_List = selecteditem.get("series");
        var secondaryaxishtml = "";
        for (var i = 1; i < Series_List.length; i++) {
            secondaryaxishtml += '<label class="checkbox-label" style="margin-left: 11px;">';
            secondaryaxishtml += '<input class="ytwoaxis" type="radio" name="SecondaryAxis" value="' + Series_List[i].name + '" ng-click="showtwoaxis()">'
            secondaryaxishtml += '' + Series_List[i].name + '</label>';
        }
        $("#twoaxisdiv").append($compile(secondaryaxishtml)($scope));

        $(".ctype").unbind("click");
        $(".ctype").click(function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            $(".ctype").find("i").remove();
            $el = $(this);
            $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
            var charttype = $.trim($el.text());
            var piecolors = ["#5C8D2A", "#B32A3E", "#38AFA9", "#EE994D", "#E6C300", "#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
            var chartareapropobj = selecteditem.get("areaproperties");
            if (charttype == "Pie") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").show();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                series.series_color = piecolors;
            }
            else if (charttype == "Doughnut") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").show();
                $("#doughnutradius").show();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                series.series_color = piecolors;
            }
            else if (charttype == "Pyramid") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                series.series_color = piecolors;
            }
            else if (charttype == "Funnel") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                series.series_color = piecolors;
            }
            else if (charttype == "Bubble") {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").show();
                $("#stackedtypes").hide();

                // $('#seriescolorpick').colorpicker("destroy");
                if (series.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + series.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    //series.series_color = series.series_color[0];
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    series.series_color = piecolors[indexselected];
                    $scope.updateseriescolorevent();
                }
                $("#seriescolorpick").parent().width(30);
            }
            else if ((charttype == "StackedColumn") || (charttype == "StackedColumn100") || (charttype == "StackedBar") || (charttype == "StackedBar100") || (charttype == "StackedArea") || (charttype == "StackedArea100") || (charttype == "Polar") || (charttype == "Range") || (charttype == "RangeBar") || (charttype == "RangeColumn") || (charttype == "Point")) {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").show();

                // $('#seriescolorpick').colorpicker("destroy");
                if (series.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + series.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    //series.series_color = series.series_color[0];
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    series.series_color = piecolors[indexselected];
                    $scope.updateseriescolorevent();
                }
                $("#seriescolorpick").parent().width(30);
            }
            else {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").show();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                // $('#seriescolorpick').colorpicker("destroy");
                if (series.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + series.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    //series.series_color = series.series_color[0];
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    series.series_color = piecolors[indexselected];
                    $scope.updateseriescolorevent();
                }
                $("#seriescolorpick").parent().width(30);
            }
            $(".ctype").find("span").removeClass("spanselected").css({ "color": "black" });
            $el.find("span").append('<i class="fa fa-check-square fa-2" ></i>').attr("class", "spanselected").css("color", "tomato");
            $el.css({ "border": "thin solid #91adc2", "background-color": "snow" });
            series.charttype = charttype.toLowerCase();
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                }
                return rw.id == sid;
            });
        });

        //For Showing series values on Chart
        $("#seriessvalues").unbind("change");
        $("#seriessvalues").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            if ($('#seriessvalues').prop('checked')) {
                series.showvaluesonlabel = "true";
            }
            else {
                series.showvaluesonlabel = "false";
            }
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                }
                return rw.id == sid;
            });
        });

        //For Showing Cylinder Stacked Charts
        $("#stackedstyle").unbind("change");
        $("#stackedstyle").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            if ($('#stackedstyle').prop('checked')) {
                series.stckedstyle = "true";
            }
            else {
                series.stckedstyle = "false";
            }
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                }
                return rw.id == sid;
            });
        });

        //For Chart series values Angle Selection
        $("#seriestopvalangle").unbind("change");
        $("#seriestopvalangle").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            series.valuelabelangle = $("#seriestopvalangle").val();
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                }
                return rw.id == sid;
            });
        });

        //For Renaming Chart Series
        $("#srseriesname").unbind("change");
        $("#srseriesname").on("change", function () {
            var arrdata = selecteditem.get("series");
            var obj1 = selecteditem.get("drilldown");
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            var sname = $("#srseriesname").val();
            series.name = sname;
            var drillobj = _.find(obj1, function (rw, index) { indexselected = index; return rw.id == sid; });
            drillobj.seriesname = sname;
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                    obj1[index] = drillobj;
                    selecteditem.unset("drilldown", { silent: true });
                    selecteditem.set({ "drilldown": obj1 });
                    //  $("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span class="series" style=" color: #777;">Series:</span>' + sname + '');
                    $("#" + sid).find('.seriesname').text(sname);
                }
                return rw.id == sid;
            });
        });

        //For Chart manual interval for Y-Axis
        $("#ymanualintervaltxt").unbind("change");
        $("#ymanualintervaltxt").on("change", function () {
            var arrdata = selecteditem.get("yaxis");
            if ($('#ymanualinterval').prop('checked')) {
                arrdata.yinterval = "ymanual";
                arrdata.ymanualinterval = $("#ymanualintervaltxt").val();
            }
            else {
                arrdata.yinterval = "yauto";
                arrdata.ymanualinterval = $("#ymanualintervaltxt").val();
            }
            selecteditem.unset("yaxis", { silent: true });
            selecteditem.set({ "yaxis": arrdata });
        });

        $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
        $("#addtotree").remove();
        $("<a style='font-weight:bold;text-align:right;margin-left: 112px;' id='addtotree'>+Add Series</a>").insertBefore("#treeid");

        //Tree Formation
        var data = [
                   { "id": "Chart", "parent": "#", "text": "Chart", 'state': { 'opened': true, 'selected': true } },
                   { "id": "Title", "parent": "Chart", "text": "Chart Title", 'state': { 'opened': true } },
                   { "id": "TitleFormula", "parent": "Title", "text": "Title Formula" },
                   { "id": "Area", "parent": "Chart", "text": "Chart Area" },
                   { "id": "Legend", "parent": "Chart", "text": "Legends" },
                   //{ "id": "Labels", "parent": "Chart", "text": "Labels" },
                   { "id": "Drilldown", "parent": "Chart", "text": "DrillDown" },
                   { "id": "Series", "parent": "Chart", "text": "Series", 'state': { 'opened': true } },
                   { "id": "XAXIS_" + $scope.view.getID() + "", "parent": "Series", "text": "<span style=' color: #777;'>X Axis:</span>Untitled" },
                   { "id": "YAXIS_" + $scope.view.getID() + "", "parent": "Series", "text": "<span style=' color: #777;'>Y Axis:</span>Untitled" },
                   //{ "id": "Series_First", "parent": "Series", "text": "<span style=' color: #777;' class='series'>Series:</span>Untitled" },
        ];

        //Construct Tree by using jQuery Plugin
        $('#bitree').jstree("destroy");
        $('#bitree').bind('loaded.jstree', function (e, data) {
            $scope.selecteditem = "Chart";
            $scope.selected = 2;
            var arrdata = selecteditem.get("series");
            for (var i = 0; i < arrdata.length; i++)
                jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span><span style=' color: #777;' class='seriesname'>" + arrdata[i].name + "</span>", id: arrdata[i].id }, 'last');
            selecteditem.unset("refresh", { silent: true });
            selecteditem.set({ "refresh": "refresh" });

            //Initial Chart Properties
            var chartpropobjobj1 = selecteditem.get("style");
            $("#stylewidth").val((chartpropobjobj1.manualwidth));
            $("#styleheight").val(parseInt(chartpropobjobj1.height));

            $("#chartbgcolor").val(chartpropobjobj1.backgroundcolor);
            $("#chartcolorpickbg").find(".colorPicker-picker").css({ "background-color": chartpropobjobj1.backgroundcolor });
            $("#chartbrcolor").val(chartpropobjobj1.bordercolor);
            $("#chartcolorpickbr").find(".colorPicker-picker").css({ "background-color": chartpropobjobj1.bordercolor });
            $("#chartborderwidth").val(chartpropobjobj1.borderwidth);
            $("#chartborderstyle").val(chartpropobjobj1.borderstyle);
            $("#chartGGradiant").val(chartpropobjobj1.backgradientstyle);
            $("#chartGFrame").val(chartpropobjobj1.borderskin);

            //Initial Chart Title Properties
            var charttitlepropobj = selecteditem.get("titleproperties");
            $("#charttitle").val(charttitlepropobj.charttitle);
            $("#ctitlecolor").val(charttitlepropobj.charttitlecolor);
            $("#titlecolor").find(".colorPicker-picker").css({ "background-color": charttitlepropobj.charttitlecolor });
            $("#ctitlestyle").val(charttitlepropobj.charttitlefontstyle);
            $("#ctitlefont").val(charttitlepropobj.charttitlefontsize);
            $("#ctitledocking").val(charttitlepropobj.charttitledocking);
            $("#ctitleprefix").val(charttitlepropobj.titlePrefix);
            $("#ctitlesuffix").val(charttitlepropobj.titleSuffix);

            //Initial Chart Area Properties
            var chartareapropobj = selecteditem.get("areaproperties");
            $("#areabgcolor").val(chartareapropobj.BackColor);
            $("#careabgcolor").find(".colorPicker-picker").css({ "background-color": chartareapropobj.BackColor });
            $("#areabg2color").val(chartareapropobj.SecondaryColor);
            $("#careabg2color").find(".colorPicker-picker").css({ "background-color": chartareapropobj.SecondaryColor });
            $("#areaGradient").val(chartareapropobj.areaGradient);
            $("#areaclustred").val(chartareapropobj.Clustered);
            $("#showin3D").val(chartareapropobj.showin3D);
            var Showin3d = $("#showin3D").val();
            if (Showin3d == "true") {
                $("#areaRotationx").removeAttr('disabled');
                $("#areaRotationy").removeAttr('disabled');
                $("#areaposx").removeAttr('disabled');
                $("#areaposy").removeAttr('disabled');
                $("#areaWallWidth").removeAttr('disabled');
            }
            else {
                $("#areaRotationx").attr("disabled", "disabled");
                $("#areaRotationy").attr("disabled", "disabled");
                $("#areaposx").attr("disabled", "disabled");
                $("#areaposy").attr("disabled", "disabled");
                $("#areaWallWidth").attr("disabled", "disabled");
            }
            $("#areaWallWidth").val(chartareapropobj.WallWidth);
            $("#areaRotationx").val(chartareapropobj.RotationX);
            $("#areaRotationy").val(chartareapropobj.RotationY);
            $("#areaposx").val(chartareapropobj.AreaPosX);
            $("#areaposy").val(chartareapropobj.AreaPosY);

            //Initial Chart Legend Properties
            var chartlegendpropobj = selecteditem.get("legendproperties");;
            //$("#legendbgcolor").val(chartlegendpropobj.PrimaryBackColor);
            //$("#clegendbgcolor").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.PrimaryBackColor });
            //$("#legendbg2color").val(chartlegendpropobj.SecondaryBackColor);
            //$("#clegendbg2color").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.SecondaryBackColor });
            $("#legendGradient").val(chartlegendpropobj.legendGradient);
            $("#lagendHatchingList").val(chartlegendpropobj.Hatching);
            $("#lagendShadowOffsetList").val(chartlegendpropobj.ShadowOffset);
            $("#legendfontsize").val(chartlegendpropobj.LegendFontSize);
            $("#legendfontfamily").val(chartlegendpropobj.LegendFontStyle);
            $("#legenddocking").val(chartlegendpropobj.legenddock);
            if (chartlegendpropobj.showlegends == "true") {
                $('#showlegends').prop('checked', true);
            }
            else {
                $('#showlegends').prop('checked', false);
            }

            //Initial Chart Series Properties
            var chartseriespropobj = selecteditem.get("seriespropperties");
            if (chartseriespropobj.srShowLabels == "true") {
                $('#srshowlabels').prop('checked', true);
            }
            else {
                $('#srshowlabels').prop('checked', false);
            }
            if ($('#srformatas').val() == "Number") {
                $("#srdecimalplacediv").show();
            }
            else {
                $("#srdecimalplacediv").hide();
            }

            //Initial Chart X-Axis Properties
            var chartxpropobj = selecteditem.get("xaxisproperties");
            $("#xchrtPrefix").val(chartxpropobj.xPrefix);
            $("#xchrtSuffix").val(chartxpropobj.xSuffix);
            if (chartxpropobj.xShowlabels == "true") {
                $('#xshowlabelticks').prop('checked', true);
            }
            else {
                $('#xshowlabelticks').prop('checked', false);
            }
            $("#chrtxaxistitle").val(chartxpropobj.xaxistitle);

            $("#xtitlecolor").val(chartxpropobj.xtitlecolor);
            $("#xtitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartxpropobj.xtitlecolor });
            $("#xtitlestyle").val(chartxpropobj.xtitlestyle);
            $("#xtitlefont").val(chartxpropobj.xtitlefontsize);

            $("#xlbledrp").val(chartxpropobj.xlabeldrop);
            if (chartxpropobj.xshowgridlines == "true") {
                $("#xgridlines").prop('checked', true);
            }
            else {
                $("#xgridlines").prop('checked', false);
            }
            $("#xlblstyleangle").val(chartxpropobj.xlblstyleangle);
            $("#xfmtas").val(chartxpropobj.xformatas);

            if (chartxpropobj.xformatas == "Number") {
                $("#xfmtdecimaldiv").show();
            }
            else {
                $("#xfmtdecimaldiv").hide();
            }
            $("#xdecimalvalue").val(chartxpropobj.xdecimalval);

            //Initial Chart Y-Axis Properties
            var chartypropobj = selecteditem.get("yaxis");
            $("#chrtyaxistitle").val(chartypropobj.yaxistitle);

            $("#ytitlecolor").val(chartypropobj.ytitlecolor);
            $("#ytitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartypropobj.ytitlecolor });
            $("#ytitlestyle").val(chartypropobj.ytitlestyle);
            $("#ytitlefont").val(chartypropobj.ytitlefontsize);

            if (chartypropobj.yinterval == "yauto") {
                $("#yautointerval").prop('checked', true);
                $("#yintervaldiv").hide();
            }
            else {
                $("#ymanualinterval").prop('checked', true);
                $("#yintervaldiv").show();
                $("#ymanualintervaltxt").val(chartypropobj.ymanualinterval);
            }
            if (chartypropobj.yShowlabels == "true") {
                $('#yshowlabelticks').prop('checked', true);
            }
            else {
                $('#yshowlabelticks').prop('checked', false);
            }
            if (chartypropobj.yshowgridlines == "true") {
                $("#ygridlines").prop('checked', true);
            }
            else {
                $("#ygridlines").prop('checked', false);
            }
            //if (chartypropobj.ytwoaxis == "true") {
            //    $("#ytwoaxis").prop('checked', true);
            //}
            //else {
            //    $("#ytwoaxis").prop('checked', false);
            //}

            $("#serverchartdatatab").hide();
            $("#serverchartproperiestab").show();
            $("#seriespropertiestab").hide();
            $("#VFormula-menu").hide();
            $("#vf-formula-bar").hide();
            $("#charttabprop").show();
            $("#xaxistabproperties").hide();
            $("#yaxistabproperties").hide();
            $("#charttitleprop").hide();
            $("#chartareaprop").hide();
            $("#chartlegendprop").hide();
            $("#seriescharttypeprop").hide();
            $("#seriescontentproperties").hide();
            $("#drilldownproptab").hide();
            $scope.modal.strnumstatus = true;
            $scope.modal.expressionstatus = true;
            //if (controlid != "new") {
            //    var arrdata = selecteditem.get("series");
            //    var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            //    for (var i = 1; i < arrdata.length; i++) {
            //        alert(arrdata[i].name);
            //        jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span>" + arrdata[i].name, id: arrdata[i].id }, 'last');
            //    }
            //    selecteditem.unset("refresh", { silent: true });
            //    selecteditem.set({ "refresh": "refresh" });
            //    $('#seriescolorpick').colorpicker({ showOn: 'button' });
            //}
            //else {
            //    var arrdata = selecteditem.get("series");
            //    for (var i = 0; i < arrdata.length; i++)
            //        jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span>" + arrdata[i].name, id: arrdata[i].id }, 'last');

            //}
            $scope.$apply();
        }).jstree({
            'core': {
                'data': data,
                check_callback: true
            },
            "types": {
                "default": {
                    "icon": "glyphicon glyphicon-flash"
                },
                "demo": {
                    "icon": "glyphicon glyphicon-ok"
                }
            },
            "plugins": ["types", "contextmenu"]
        });

        //Auto Open Preview HTML Template Popup
        var element = angular.element('#bidsahboardconfig');
        element.modal('show'); $("#previewobject").empty();

        //For Selecting Tree nodes and their functionalities
        var strsplit;
        $("#bitree").bind(
        "select_node.jstree", function (evt, data) {
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            _parentid = $("#" + sel + "").find('span').hasClass("series");
            _slength = $("#bitree").find(".series").length;
            $(".imgvalidate").remove();
            if (sel.toString().indexOf("_") != -1) {
                strsplit = new String();
                strsplit = sel.toString();
                strsplit = strsplit.split("_")[0];
                if (_parentid) {
                    if (_slength > 1) {
                        $el = $("#" + sel + "").find('a').first();
                        $("<a  class='imgvalidate' style='color:red' title='Remove Selected Series'>X</a>").insertAfter($el);
                    }
                    $scope.selected = 1;
                    $scope.selecteditem = "Series";
                    $("#VFormula-menu").show();
                    $("#vf-formula-bar").show();
                    $("#serverchartdatatab").show();
                    $("#serverchartproperiestab").show();
                    $("#seriespropertiestab").show();
                    $("#xaxistabproperties").hide();
                    $("#charttabprop").hide();
                    $("#yaxistabproperties").hide();
                    $("#charttitleprop").hide();
                    $("#drilldownproptab").hide();
                    $("#chartareaprop").hide();
                    $("#chartlegendprop").hide();
                    $("#seriescharttypeprop").show();
                    $("#seriescontentproperties").show();
                    $(".imgvalidate").click(function () {
                        var arrdata = selecteditem.get("series");
                        _.find(arrdata, function (rw, index) {
                            if (rw.id == sel) {
                                arrdata.splice(index, 1);
                                selecteditem.unset("series", { silent: true });
                                selecteditem.set({ "series": arrdata });
                            }
                            return rw.id == sel
                        });
                        ref.delete_node([sel]);
                        $("#VFormula-menu").hide();
                        $("#vf-formula-bar").hide();
                        $("#serverchartdatatab").show();
                        $("#serverchartproperiestab").show();
                        $("#seriespropertiestab").show();
                        $("#xaxistabproperties").hide();
                        $("#charttabprop").hide();
                        $("#yaxistabproperties").hide();
                        $("#charttitleprop").hide();
                        $("#drilldownproptab").hide();
                        $("#chartareaprop").hide();
                        $("#chartlegendprop").hide();
                        $("#seriescharttypeprop").show();
                        $("#seriescontentproperties").show();
                        $scope.selected = 1;
                        $scope.selecteditem = "Chart";
                        $("#bitree").jstree("select_node", "#Chart").trigger("select_node.jstree");
                    });
                    $scope.getconnectiondetails(sel.toString());
                    var arrdata = selecteditem.get("series");
                    var ref = $('#bitree').jstree(true);
                    var sid = ref.get_selected();
                    var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                    if (series.showvaluesonlabel == "true") {
                        $("#seriessvalues").prop('checked', true);
                    }
                    else {
                        $("#seriessvalues").prop('checked', false);
                    }
                    if (series.stckedstyle == "true") {
                        $("#stackedstyle").prop('checked', true);
                    }
                    else {
                        $("#stackedstyle").prop('checked', false);
                    }
                    $("#seriestopvalangle").val(series.valuelabelangle);
                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;
                }
                else if (strsplit == "XAXIS") {
                    $scope.selected = 2;
                    $scope.selecteditem = "XAXIS";
                    $("#VFormula-menu").show();
                    $("#vf-formula-bar").show();
                    $(document.getElementById("serverchartdatatab")).click();
                    $("#serverchartdatatab").show();
                    $("#seriespropertiestab").hide();
                    $("#drilldownproptab").hide();
                    $scope.getxaxisconnectiondetails(sel.toString());

                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;
                    $("#serverchartproperiestab").show();
                    $("#charttabprop").hide();
                    $("#xaxistabproperties").show();
                    $("#yaxistabproperties").hide();
                    $("#charttitleprop").hide();
                    $("#chartareaprop").hide();
                    $("#chartlegendprop").hide();
                    $("#seriescharttypeprop").hide();
                    $("#seriescontentproperties").hide();
                    $("#drilldownproptab").hide();
                    var chartxpropobj = selecteditem.get("xaxisproperties");
                    $("#xchrtPrefix").val(chartxpropobj.xPrefix);
                    $("#xchrtSuffix").val(chartxpropobj.xSuffix);
                    if (chartxpropobj.xShowlabels == "true") {
                        $('#xshowlabelticks').prop('checked', true);
                    }
                    else {
                        $('#xshowlabelticks').prop('checked', false);
                    }
                    $("#chrtxaxistitle").val(chartxpropobj.xaxistitle);

                    $("#xtitlecolor").val(chartxpropobj.xtitlecolor);
                    $("#xtitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartxpropobj.xtitlecolor });
                    $("#xtitlestyle").val(chartxpropobj.xtitlestyle);
                    $("#xtitlefont").val(chartxpropobj.xtitlefontsize);

                    $("#xlbledrp").val(chartxpropobj.xlabeldrop);
                    if (chartxpropobj.xshowgridlines == "true") {
                        $("#xgridlines").prop('checked', true);
                    }
                    else {
                        $("#xgridlines").prop('checked', false);
                    }
                    $("#xlblstyleangle").val(chartxpropobj.xlblstyleangle);
                    $("#bitree").jstree('set_text', ['#XAXIS', chartxpropobj.xaxistitle]);

                    $("#xfmtas").val(chartxpropobj.xformatas);
                    if (chartxpropobj.xformatas == "Number") {
                        $("#xfmtdecimaldiv").show();
                    } else {
                        $("#xfmtdecimaldiv").hide();
                    }
                    $("#xdecimalvalue").val(chartxpropobj.xdecimalval);

                    //$("#bitree").jstree._focused().get_selected().rename(chartxpropobj.xaxistitle);
                    //var node = $.jstree._focused().get_selected();
                    //$.jstree._focused().set_text(node, chartxpropobj.xaxistitle);
                    //$('#bitree').jstree('rename_node', '#XAXIS', chartxpropobj.xaxistitle);
                }
                else if (strsplit == "YAXIS") {
                    $scope.selected = 2;
                    $scope.selecteditem = "YAXIS";
                    $("#VFormula-menu").show();
                    $("#vf-formula-bar").show();
                    $("#serverchartdatatab").hide();
                    $("#serverchartproperiestab").show();
                    $("#seriespropertiestab").hide();
                    $("#drilldownproptab").hide();
                    $("#charttabprop").hide();
                    $("#xaxistabproperties").hide();
                    $("#yaxistabproperties").show();
                    $("#charttitleprop").hide();
                    $("#chartareaprop").hide();
                    $("#chartlegendprop").hide();
                    $("#seriescharttypeprop").hide();
                    $("#seriescontentproperties").hide();
                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;

                    //Initial Chart Y-Axis Properties
                    var chartypropobj = selecteditem.get("yaxis");
                    $("#chrtyaxistitle").val(chartypropobj.yaxistitle);

                    $("#ytitlecolor").val(chartypropobj.ytitlecolor);
                    $("#ytitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartypropobj.ytitlecolor });
                    $("#ytitlestyle").val(chartypropobj.ytitlestyle);
                    $("#ytitlefont").val(chartypropobj.ytitlefontsize);

                    if (chartypropobj.yinterval == "yauto") {
                        $("#yautointerval").prop('checked', true);
                        $("#yintervaldiv").hide();
                    }
                    else {
                        $("#ymanualinterval").prop('checked', true);
                        $("#yintervaldiv").show();
                        $("#ymanualintervaltxt").val(chartypropobj.ymanualinterval);
                    }

                    if (chartypropobj.yShowlabels == "true") {
                        $('#yshowlabelticks').prop('checked', true);
                    }
                    else {
                        $('#yshowlabelticks').prop('checked', false);
                    }
                    if (chartypropobj.yshowgridlines == "true") {
                        $("#ygridlines").prop('checked', true);
                    }
                    else {
                        $("#ygridlines").prop('checked', false);
                    }
                    //if (chartypropobj.ytwoaxis == "true") {
                    //    $("#ytwoaxis").prop('checked', true);
                    //}
                    //else {
                    //    $("#ytwoaxis").prop('checked', false);
                    //}

                    $("#twoaxisdiv").empty();
                    var Series_List = selecteditem.get("series");
                    var secondaryaxishtml = "";
                    for (var i = 1; i < Series_List.length; i++) {
                        secondaryaxishtml += '<label class="checkbox-label" style="margin-left: 11px;">';
                        secondaryaxishtml += '<input class="ytwoaxis" type="radio" name="SecondaryAxis" value="' + Series_List[i].name + '" ng-click="showtwoaxis()">'
                        secondaryaxishtml += '' + Series_List[i].name + '</label>';
                    }
                    $("#twoaxisdiv").append($compile(secondaryaxishtml)($scope));
                }
                else {
                    $scope.selected = 1;
                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;
                }
            }
            else if (sel == "Chart") {
                $scope.selecteditem = "Chart";
                $scope.selected = 2;
                $("#serverchartdatatab").hide();
                $("#serverchartproperiestab").show();
                $("#VFormula-menu").hide();
                $("#vf-formula-bar").hide();
                $("#charttabprop").show();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").hide();
                $("#chartareaprop").hide();
                $("#chartlegendprop").hide();
                $("#seriespropertiestab").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").hide();
                var chartpropobjobj = selecteditem.get("style");
                $("#stylewidth").val((chartpropobjobj.manualwidth));
                $("#styleheight").val(parseInt(chartpropobjobj.height));
                $("#chartbgcolor").val(chartpropobjobj.backgroundcolor);
                $("#chartcolorpickbg").find(".colorPicker-picker").css({ "background-color": chartpropobjobj.backgroundcolor });
                $("#chartbrcolor").val(chartpropobjobj.bordercolor);
                $("#chartcolorpickbr").find(".colorPicker-picker").css({ "background-color": chartpropobjobj.bordercolor });
                $("#chartborderwidth").val(chartpropobjobj.borderwidth);
                $("#chartborderstyle").val(chartpropobjobj.borderstyle);
                $("#chartGGradiant").val(chartpropobjobj.backgradientstyle);
                $("#chartGFrame").val(chartpropobjobj.borderskin);
            }
            else if (sel == "Charttype") {
                $scope.selecteditem = "Charttype";
                $("#seriespropertiestab").hide();
                $("#drilldownproptab").hide();
                var element = angular.element('#highcharttypes');
            }
            else if (sel == "Series") {
                if (_parentid) {
                    if (_slength > 1) {
                        $el = $("#" + sel + "").find('a').first();
                        $("<a  class='imgvalidate' style='color:red' title='Remove Selected Series'>X</a>").insertAfter($el);
                    }
                    //$scope.selected = 1;               
                    $scope.selecteditem = "Series";
                    $("#serverchartdatatab").show();
                    $("#VFormula-menu").show();
                    $("#vf-formula-bar").show();
                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;
                    $(".imgvalidate").click(function () {
                        var arrdata = selecteditem.get("series");
                        _.find(arrdata, function (rw, index) {
                            if (rw.id == sel) {
                                arrdata.splice(index, 1);
                                selecteditem.unset("series", { silent: true });
                                selecteditem.set({ "series": arrdata });
                            }
                            return rw.id == sel
                        });
                        ref.delete_node([sel]);
                        $("#VFormula-menu").hide();
                        $("#vf-formula-bar").hide();
                        $scope.selected = 1;
                        $scope.selecteditem = "Series";
                        $("#bitree").jstree("select_node", "#Chart").trigger("select_node.jstree");

                        $("#twoaxisdiv").empty();
                        var Series_List = selecteditem.get("series");
                        var secondaryaxishtml = "";
                        for (var i = 1; i < Series_List.length; i++) {
                            secondaryaxishtml += '<label class="checkbox-label" style="margin-left: 11px;">';
                            secondaryaxishtml += '<input class="ytwoaxis" type="radio" name="SecondaryAxis" value="' + Series_List[i].name + '" ng-click="showtwoaxis()">'
                            secondaryaxishtml += '' + Series_List[i].name + '</label>';
                        }
                        $("#twoaxisdiv").append($compile(secondaryaxishtml)($scope));
                    });
                    $scope.selected = 1;
                    $("#serverchartdatatab").show();
                    $("#serverchartproperiestab").hide();
                    $("#seriespropertiestab").hide();
                    $("#drilldownproptab").hide();
                    $scope.modal.tablestatus = true;
                    $scope.modal.expressionstatus = true;
                    $scope.modal.strnumstatus = true;
                    $scope.modal.variablestatus = true;
                    $("#VFormula-menu").show();
                    $("#vf-formula-bar").show();

                    //Initial Chart Series Properties
                    var chartseriespropobj = selecteditem.get("seriespropperties");
                    if (chartseriespropobj.srShowLabels == "true") {
                        $('#srshowlabels').prop('checked', true);
                    }
                    else {
                        $('#srshowlabels').prop('checked', false);
                    }
                    if (chartseriespropobj.srFormatAs == "Number") {
                        $("#srdecimalplacediv").show();
                    }
                    else {
                        $("#srdecimalplacediv").hide();
                    }
                }
            }
            else if (sel == "Title") {
                $scope.selected = 2;
                $scope.selecteditem = "YAXIS";
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $("#serverchartdatatab").hide();
                $("#serverchartproperiestab").show();
                $("#charttabprop").hide();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").show();
                $("#chartlegendprop").hide();
                $("#seriescharttypeprop").hide();
                $("#chartareaprop").hide();
                $("#seriespropertiestab").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;

                var charttitlepropobj = selecteditem.get("titleproperties");
                $("#charttitle").val(charttitlepropobj.charttitle);
                $("#ctitlecolor").val(charttitlepropobj.charttitlecolor);
                $("#titlecolor").find(".colorPicker-picker").css({ "background-color": charttitlepropobj.charttitlecolor });
                $("#ctitlestyle").val(charttitlepropobj.charttitlefontstyle);
                $("#ctitlefont").val(charttitlepropobj.charttitlefontsize);
                $("#ctitledocking").val(charttitlepropobj.charttitledocking);
                $("#ctitleprefix").val(charttitlepropobj.titlePrefix);
                $("#ctitlesuffix").val(charttitlepropobj.titleSuffix);
            }
            else if (sel == "TitleFormula") {
                $scope.selected = 1;
                $("#serverchartdatatab").show();
                $("#serverchartproperiestab").hide();
                $("#seriespropertiestab").hide();
                $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $scope.selecteditem = "TitleFormula";
                $scope.gettitleconnectiondetails(sel.toString());
            }
            else if (sel == "Area") {
                $scope.selected = 2;
                $scope.selecteditem = "YAXIS";
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $("#serverchartdatatab").hide();
                $("#serverchartproperiestab").show();
                $("#charttabprop").hide();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").hide();
                $("#chartareaprop").show();
                $("#chartlegendprop").hide();
                $("#seriescharttypeprop").hide();
                $("#seriespropertiestab").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;

                var chartareapropobj = selecteditem.get("areaproperties");
                $("#areabgcolor").val(chartareapropobj.BackColor);
                $("#careabgcolor").find(".colorPicker-picker").css({ "background-color": chartareapropobj.BackColor });
                $("#areabg2color").val(chartareapropobj.SecondaryColor);
                $("#careabg2color").find(".colorPicker-picker").css({ "background-color": chartareapropobj.SecondaryColor });
                $("#areaGradient").val(chartareapropobj.areaGradient);
                $("#areaclustred").val(chartareapropobj.Clustered);
                $("#showin3D").val(chartareapropobj.showin3D);
                var Showin3d = $("#showin3D").val();
                if (Showin3d == "true") {
                    $("#areaRotationx").removeAttr('disabled');
                    $("#areaRotationy").removeAttr('disabled');
                    $("#areaposx").removeAttr('disabled');
                    $("#areaposy").removeAttr('disabled');
                    $("#areaWallWidth").removeAttr('disabled');
                }
                else {
                    $("#areaRotationx").attr("disabled", "disabled");
                    $("#areaRotationy").attr("disabled", "disabled");
                    $("#areaposx").attr("disabled", "disabled");
                    $("#areaposy").attr("disabled", "disabled");
                    $("#areaWallWidth").attr("disabled", "disabled");
                }
                $("#areaWallWidth").val(chartareapropobj.WallWidth);
                $("#areaRotationx").val(chartareapropobj.RotationX);
                $("#areaRotationy").val(chartareapropobj.RotationY);
                $("#areaposx").val(chartareapropobj.AreaPosX);
                $("#areaposy").val(chartareapropobj.AreaPosY);

            }
            else if (sel == "Legend") {
                $scope.selected = 2;
                $scope.selecteditem = "YAXIS";
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $("#serverchartdatatab").hide();
                $("#serverchartproperiestab").show();
                $("#charttabprop").hide();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").hide();
                $("#chartareaprop").hide();
                $("#chartlegendprop").show();
                $("#seriescharttypeprop").hide();
                $("#seriespropertiestab").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;

                var chartlegendpropobj = selecteditem.get("legendproperties");;
                //$("#legendbgcolor").val(chartlegendpropobj.PrimaryBackColor);
                //$("#clegendbgcolor").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.PrimaryBackColor });
                //$("#legendbg2color").val(chartlegendpropobj.SecondaryBackColor);
                //$("#clegendbg2color").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.SecondaryBackColor });
                $("#legendGradient").val(chartlegendpropobj.legendGradient);
                $("#lagendHatchingList").val(chartlegendpropobj.Hatching);
                //$("#chartlegendbrcolor").val(chartlegendpropobj.BorderColor);
                //$("#chartlegendbrwidth").val(chartlegendpropobj.BorderSize);
                //$("#legendbrstyle").val(chartlegendpropobj.BorderDashStyle);
                $("#legenddocking").val(chartlegendpropobj.legenddock);
                $("#lagendShadowOffsetList").val(chartlegendpropobj.ShadowOffset);
                $("#legendfontsize").val(chartlegendpropobj.LegendFontSize);
                $("#legendfontfamily").val(chartlegendpropobj.LegendFontStyle);
                if (chartlegendpropobj.showlegends == "true") {
                    $("#showlegends").prop('checked', true);
                }
                else {
                    $("#showlegends").prop('checked', false);
                }
            }
            else if (sel == "Series_First") {
                $("#serverchartdatatab").show();
                $("#serverchartproperiestab").hide();
                $("#charttabprop").hide();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").hide();
                $("#chartareaprop").hide();
                $("#chartlegendprop").hide();
                $("#seriescharttypeprop").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;
            }
            else if (sel == "Drilldown") {
                $scope.selected = 4;
                $scope.selecteditem = "Drilldown";
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $("#serverchartdatatab").hide();
                $("#serverchartproperiestab").hide();
                $("#seriespropertiestab").hide();
                $("#charttabprop").hide();
                $("#xaxistabproperties").hide();
                $("#yaxistabproperties").hide();
                $("#charttitleprop").hide();
                $("#chartareaprop").hide();
                $("#chartlegendprop").hide();
                $("#seriescharttypeprop").hide();
                $("#seriescontentproperties").hide();
                $("#drilldownproptab").show();
                $("#drilldownpropertab").show();
                $scope.modal.tablestatus = true;
                $scope.modal.expressionstatus = true;
                $scope.modal.strnumstatus = true;
                $scope.modal.variablestatus = true;

                //var drilldownObj = selecteditem.get("drilldown");
                //$("#targetdsboardid").val(drilldownObj[0].DashboardId);
                //$("#targetdsboard").val(drilldownObj[0].DashboardName);
                //$("#reqparamlbl_chartx").val(drilldownObj[0].ChartXParameterName);
                //$("#reqparamtext_chartx").val(drilldownObj[0].ChartXParameterName);
                //$("#reqparamlbl_charty").val(drilldownObj[0].ChartYParameterName);
                //$("#reqparamtext_charty").val(drilldownObj[0].ChartYParameterValue);
                //alert($("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html());               
                //var drilldownhtmlstring = "";
                //drilldownhtmlstring += '<div id="Div34" class="field" style=""><div class="prop-label"><label>Target Dashboard:</label>';
                //drilldownhtmlstring += '</div><div class="prop-editor" style="white-space: nowrap; margin-left: 4px; vertical-align: top;">';
                //drilldownhtmlstring += '<input id="targetdsboardid" class="targetdsboardid" type="hidden" ng-model="targetdsboardid" style="height: 25px; width: 40%;">';
                //drilldownhtmlstring += '<input id="targetdsboard" class="targetdsboard" type="text" ng-model="targetdsboard" style="height: 25px; width: 40%;">';
                //drilldownhtmlstring += '<button class="borderless dashboardview" title="Select Target Dashboards" ng-click="GetDashboardlist("menu")">';
                //drilldownhtmlstring += '<i class="fa fa-pencil-square-o"></i></button></div></div><div id="Div45" class="field" style="">';
                //drilldownhtmlstring += '<div class="prop-label"><label style="color: cornflowerblue; font-size: 1.3em;">Request Parameters:</label>';
                //drilldownhtmlstring += '</div><div class="prop-editor" style="white-space: nowrap; margin-left: 36px; vertical-align: top;"></div>';
                //drilldownhtmlstring += '</div><span><a style="float: left; font-weight: bold; margin-left: 25%; font-size: 14px;" ng-click="Newvariabledilog()" id="A2">Create New Variable</a></span>';
                //drilldownhtmlstring += '<br /><input type="hidden" id="hidedivid" /><div id="ChartXParamsDiv" class="field" style=""><div class="prop-label">';
                //drilldownhtmlstring += '<label>Set Value For Chart-X:</label></div><div class="prop-editor" style="white-space: nowrap; vertical-align: top;">';
                //drilldownhtmlstring += '<label id="reqparamlbl_chartx" class="reqparam reqparamlbl_chartx" style="height: 25px;"></label><input id="reqparamtext_chartx" class="reqparam reqparamtext_chartx" type="text" style="height: 25px; width: 33%;">';
                //drilldownhtmlstring += '<button class="borderless reqparamspopup" title="Choose Parameters" ng-click="Xchart_paramspopup(obj,$event)"><i class="fa fa-pencil-square-o"></i></button>';
                //drilldownhtmlstring += '</div></div><div id="ChartYParamsDiv1" class="field" style=""><div class="prop-label"><label>Set Value For Chart-Y:</label>';
                //drilldownhtmlstring += '</div><div class="prop-editor" style="white-space: nowrap; vertical-align: top;"><label id="reqparamlbl_charty" class="reqparam reqparamlbl_charty" style="height: 25px;"></label>';
                //drilldownhtmlstring += '<input id="reqparamtext_charty" class="reqparam reqparamtext_charty" type="text" style="height: 25px; width: 33%;">';
                //drilldownhtmlstring += '<button class="borderless reqparamspopup" title="Choose Parameters" ng-click="Ychart_paramspopup(obj,$event)"><i class="fa fa-pencil-square-o"></i></button>';
                //drilldownhtmlstring += '</div></div>';

                var Series_List = selecteditem.get("series");
                $("#drilldowntabletbody tr").each(function (i) {
                    if (i == 0) {
                        $(this).find("td:eq(1)").empty();
                        $(this).find("td:eq(1)").remove();
                    }
                    else {
                        $(this).empty();
                        $(this).remove();
                    }
                });

                for (var i = 1; i < Series_List.length; i++) {
                    if (i % 2 === 0) {
                        $compile("<tr><td class='leftPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td></tr>")($scope).appendTo($("#drilldowntabletbody"));
                    }
                    else {
                        var trindex = i / 2;
                        var index = Math.floor(trindex);
                        $compile("<td class='rightPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td>")($scope).appendTo($("#drilldowntabletbody tr:eq(" + index + ")"));
                    }

                    //if (i == 1) {
                    //    $("<td class='rightPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td>").appendTo($("#drilldowntabletbody tr:eq(0)"));
                    //}
                    //else if (i == 2) {
                    //    $("<tr><td class='leftPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td></tr>").appendTo($("#drilldowntabletbody"));
                    //}
                    //else if (i == 3) {
                    //    $("<td class='rightPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td>").appendTo($("#drilldowntabletbody tr:eq(1)"));
                    //}
                    //else if (i == 4) {
                    //    $("<tr><td class='leftPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td></tr>").appendTo($("#drilldowntabletbody"));
                    //}
                    //else if (i == 5) {
                    //    $("<td class='rightPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td>").appendTo($("#drilldowntabletbody tr:eq(2)"));
                    //}
                    //else if (i == 6) {
                    //    $("<tr><td class='leftPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td></tr>").appendTo($("#drilldowntabletbody"));
                    //}
                    //else if (i == 7) {
                    //    $("<td class='rightPropCol'>" + $("#drilldowntabletbody tr:eq(0)").find("td:eq(0)").html() + "</td>").appendTo($("#drilldowntabletbody tr:eq(3)"));
                    //}
                }
                var drilldownObj = selecteditem.get("drilldown");
                $("#drilldowntabletbody td").each(function (dd) {
                    $(this).find(".targetdsboarddrillindex").val(dd);
                    $(this).find(".targetdsboardid").val(drilldownObj[dd].DashboardId);
                    $(this).find(".targetdsboard").val(drilldownObj[dd].DashboardName);
                    $(this).find(".reqparamtext_chartx").val(drilldownObj[dd].ChartXParameterValue);
                    $(this).find(".reqparamlbl_chartx").text(drilldownObj[dd].ChartXParameterName);
                    $(this).find(".reqparamtext_charty").val(drilldownObj[dd].ChartYParameterValue);
                    $(this).find(".reqparamlbl_charty").text(drilldownObj[dd].ChartYParameterName);
                });
            }
            $scope.argplaceholderclick();
            $scope.bindinsertop();
            $scope.operatorclick();
            $scope.agfuncclick();
            $scope.bindliterallick();
            $scope.binddataclick();
            $scope.$apply();
        });

        //Get Series Connection Details
        $scope.getconnectiondetails = function (sid) {
            $("#vf-formula-bar").empty();
            $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var arrdata = selecteditem.get("series");
            var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            $("#srseriesname").val(sinfo.name);

            //Set Selected Chart Type
            var charttype = sinfo.charttype.toLowerCase();
            var piecolors = ["#5C8D2A", "#B32A3E", "#38AFA9", "#EE994D", "#E6C300", "#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
            var chartareapropobj = selecteditem.get("areaproperties");
            if (charttype == "pie") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").show();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);

                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /><span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                sinfo.series_color = piecolors;
            }
            else if (charttype == "doughnut") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").show();
                $("#doughnutradius").show();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                sinfo.series_color = piecolors;
            }
            else if (charttype == "pyramid") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                sinfo.series_color = piecolors;
            }
            else if (charttype == "funnel") {
                $("#piechartprop").show();
                $("#pielabelstyle").show();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piecolorpallette").show();
                $(".colorhrclass").show();
                $("#piechartcolors").hide();
                $("#chartpointwt").hide();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();

                var chartareapropobj = selecteditem.get("areaproperties");
                chartareapropobj.showin3D = "true";
                selecteditem.unset("areaproperties", { silent: true });
                selecteditem.set({ "areaproperties": chartareapropobj });
                $("#showin3D").val(chartareapropobj.showin3D);
                $('.cppieButton').colorpicker("destroy");
                $('#piecolorscheme').empty();
                var colorsstr = "";
                $.each(piecolors, function (index, value) {
                    colorsstr += '<div style="float:left;width:30px"><input class="cppieButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                });
                $("#piecolorscheme").html(colorsstr);
                $('.cppieButton').colorpicker({ showOn: 'button' });
                $scope.updatecolorevents();
                $(".cppieButton").parent().width(30);
                $scope.updateseriescolorevent();
                sinfo.series_color = piecolors;
            }
            else if (charttype == "bubble") {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").show();
                $("#stackedtypes").hide();

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
            }
            else if ((charttype == "stackedcolumn") || (charttype == "stackedcolumn100") || (charttype == "stackedbar") || (charttype == "stackedbar100") || (charttype == "stackedarea") || (charttype == "stackedarea100") || (charttype == "polar") || (charttype == "range") || (charttype == "rangebar") || (charttype == "rangecolumn") || (charttype == "point")) {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").show();

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
            }
            else {
                $("#piechartprop").show();
                $("#pielabelstyle").hide();
                $("#ladeldatashow").show();
                $("#drawingstyle").hide();
                $("#doughnutradius").hide();
                $("#piedrawingstyle").hide();
                $("#pielabelplacement").hide();
                $("#piechartcolors").show();
                $("#piecolorpallette").hide();
                $(".colorhrclass").hide();
                $("#chartpointwt").show();
                $("#chartlinewt").show();
                $("#stackedtypes").hide();

                //Pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' });
                    $scope.updateseriescolorevent();
                }
            }
            var $el = $(document.getElementById("server" + charttype.toLowerCase()));
            $(".ctype").find("i").remove();
            $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
            $(".ctype").find("span").removeClass("spanselected").css({ "color": "black" });
            $el.find("span").append('<i class="fa fa-check-square fa-2" ></i>').attr("class", "spanselected").css("color", "tomato");
            $el.css({ "border": "thin solid #91adc2", "background-color": "snow" });

            $("#pieglobalLabel").val(sinfo.labelstyle);
            $("#pieglobalLabeldata").val(sinfo.labeldatashow);
            $("#pieglobalDrawingstyle").val(sinfo.drawingstyle);
            $("#pieglobalDoughnutRad").val(sinfo.doughnutradius);
            $("#barandcolumnstyles").val(sinfo.chartcolumnstyle);
            $("#pieglobalLabelsPacement").val(sinfo.labelplacement);
            $("#pyramidldrawingstyle").val(sinfo.pyramiddrawingstyle);
            $("#pyramidlrotationangle").val(sinfo.pyramidrotationangle);
            $("#pyramidlvaluetype").val(sinfo.pyramidvaluetype);
            $("#pyramidpointwd").val(sinfo.pyramidminpoint);
            $("#chartGpontWidth").val(sinfo.pointwidth);
            $("#bubbleselstyle").val(sinfo.bubbleselstyle);
            $("#stackedcharttypes").val(sinfo.stackedstyle);
            $("#srchartlinewidth").val(sinfo.srlinewidth);

            var connectionid = sinfo.connectionid;
            if (connectionid != "undefined") {
                var connectionobject = new Array();
                connectionobject.push({
                    "DSConnType": sinfo.connectiontype,
                    "ConnectionID": sinfo.connectionid,
                    "DSId": sinfo.DSId,
                    "DSName": sinfo.DSName,
                    "DSCnnCretedby": sinfo.DSCnnCretedby
                });
                var selection = angular.element('#' + sinfo.selectedid + '');
                $scope.getdata(connectionobject, selection);
                $("#vf-formula-bar").html(sinfo.formula_template);
            }
        }

        //Update Series Color Events
        $scope.updateseriescolorevent = function () {
            $("#seriescolorpick").on("change.color", function (event, color) {
                var colorarry = [];
                colorarry.push(color);
                var arrdata = selecteditem.get("series");
                var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                var series = _.find(arrdata, function (rw, index) { return rw.id == sid; });
                series.series_color = colorarry;
                _.find(arrdata, function (rw, index) {
                    if (rw.id == sid) {
                        selecteditem.unset("series", { silent: true });
                        arrdata[index] = series;
                        selecteditem.set({ "series": arrdata });
                    }
                    return rw.id == sid;
                });
            });
        };

        //Update Color Events
        $scope.updatecolorevents = function () {
            $(".cppieButton").on("change.color", function (event, color) {
                var colorarry = [];
                $(".cppieButton").each(function (i, val) {
                    colorarry.push($(val).val());
                });
                var arrdata = selecteditem.get("series");
                var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                var series = _.find(arrdata, function (rw, index) { return rw.id == sid; });
                series.series_color = colorarry;
                _.find(arrdata, function (rw, index) {
                    if (rw.id == sid) {
                        selecteditem.unset("series", { silent: true });
                        arrdata[index] = series;
                        selecteditem.set({ "series": arrdata });
                    }
                    return rw.id == sid;
                });
            });
        };

        //Get Title Connection Details
        $scope.gettitleconnectiondetails = function (sid) {
            var title = selecteditem.get("titleproperties");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var connectionid = title.connectionid;
            if (connectionid != "undefined") {
                var connectionobject = new Array();
                connectionobject.push({
                    "DSConnType": title.connectiontype,
                    "ConnectionID": title.connectionid,
                    "DSId": title.DSId,
                    "DSName": title.DSName,
                    "DSCnnCretedby": title.DSCnnCretedby
                });
                var selection = angular.element('#' + title.selectedid + '');
                $scope.getdata(connectionobject, selection);
                $("#vf-formula-bar").html(title.formula_template);
            }
        }

        //Get X-Axis Details
        $scope.getxaxisconnectiondetails = function (sid) {
            var sinfo = selecteditem.get("xaxis");
            $("#vf-formula-bar").empty();
            $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var connectionid = sinfo.connectionid;
            if (connectionid != "undefined") {
                var connectionobject = new Array();
                connectionobject.push({
                    "DSConnType": sinfo.connectiontype,
                    "ConnectionID": sinfo.connectionid,
                    "DSId": sinfo.DSId,
                    "DSName": sinfo.DSName,
                    "DSCnnCretedby": sinfo.DSCnnCretedby
                });
                var selection = angular.element('#' + sinfo.selectedid + '');
                $scope.getdata(connectionobject, selection);
                $("#vf-formula-bar").html(sinfo.formula_template);
            }
        }

        //Add New Series to the Chart
        $("#addtotree").click(function () {
            bootbox.prompt("Enter Series Name", function (result) {
                if (result != null) {
                    if (result != "") {
                        var obj = selecteditem.get("series");
                        var seriesid = "Series_" + $scope.view.getID();
                        obj.push({ "id": seriesid, "name": "" + result + "", "charttype": "column", "series_color": [], "showvaluesonlabel": "true", "labelstyle": "Outside", "labeldatashow": "X-VALUES", "drawingstyle": "SoftEdge", "doughnutradius": "60", "chartcolumnstyle": "Cylinder", "labelplacement": "Right", "pyramiddrawingstyle": "CircularBase", "pyramidrotationangle": "0", "pyramidvaluetype": "Linear", "pyramidminpoint": "2", "pointwidth": "0.4", "srlinewidth": "1", "bubbleselstyle": "Circle", "stckedstyle": "true", "valuelabelangle": "0", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "ytwoaxis": "false", "data": [] });
                        selecteditem.unset("series", { silent: true });
                        selecteditem.set({ "series": obj });
                        jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span><span style=' color: #777;' class='seriesname'>" + result + "</span>", id: seriesid }, 'last');
                        $(document.getElementById(seriesid)).find('a').first().click();
                    }
                }
                var obj1 = selecteditem.get("drilldown");
                obj1.push({ "DashboardId": "", "DashboardName": "", "seriesname": result, "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" });
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": obj1 });
            });
            $("#twoaxisdiv").empty();
            var Series_List = selecteditem.get("series");
            var secondaryaxishtml = "";
            for (var i = 1; i < Series_List.length; i++) {
                secondaryaxishtml += '<label class="checkbox-label" style="margin-left: 11px;">';
                secondaryaxishtml += '<input class="ytwoaxis" type="radio" name="SecondaryAxis" value="' + Series_List[i].name + '" ng-click="showtwoaxis()">'
                secondaryaxishtml += '' + Series_List[i].name + '</label>';
            }
            $("#twoaxisdiv").append(($compile)(secondaryaxishtml)($scope));
        });

        //Clone Object
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));
        $("#previewobject").css({ "height": "175px", "width": "96%", "display": "block" });
        $("#previewobject").children().css({ "height": "175px" });

        //Data Selection
        $scope.changedatapoint = function (columnname, range) {
            if (columnname.indexOf("@") == -1)
                columnname = "[" + columnname + "]";

            //Get Table Data when Selected
            var $el = $("#vf-formula-bar").find(".active");

            if ($el.length > 0) {
                if ($el.hasClass("insertion") == true) {
                    $('<li class="vf-node data active" data-range="' + range + '">' + columnname + '</li>').insertBefore($el);
                    $el.removeClass("active");
                    $scope.binddataclick();
                }
                else if ($el.hasClass("data") == true) {
                    $el.html(columnname);
                    $el.attr("data-range", range)
                }
                else if ($el.hasClass("function") == true) {
                    if ($ele.next().html() == ",") {
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li>');
                    }
                    else {
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                    }
                }
                else {
                    if ($("#vf-formula-bar").find(".active").next().html() == ")") {
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                        $scope.argplaceholderclick();
                        $scope.binddataclick();
                    }
                }
            }
            else {
                $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/Images/temp/prompt.gif"></li></ul>');
                $scope.bindinsertop();
                $scope.binddataclick();
            }
            $scope.updatedbconnections();
            $scope.$apply();
        };

        //Update Connections by adding Datasources
        $scope.updatedbconnections = function () {
            selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
            var formulatext = $.trim($("#vf-formula-bar").text());
            var formula_template = $.trim($("#vf-formula-bar").html());
            if ($scope.selecteditem == "Series") {
                var ref = $('#bitree').jstree(true);
                var sid = ref.get_selected();
                var arrdata = selecteditem.get("series");
                var series = _.find(arrdata, function (rw, index) { return rw.id == sid; });
                var connectionid = series.connectionid;
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                series.selectedid = selecteddatatab;
                series.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                series.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                series.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                series.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                series.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                series.charttype = $(".ctype").find(".spanselected").text().trim();
                var sname = $("#srseriesname").val();
                series.name = sname;
                series.formula = formulatext;

                if (formulatext != "undefined") {
                    var _seriesdata = new Object();
                    _seriesdata.ConnectionID = series.connectionid;
                    _seriesdata.DSConnType = series.connectiontype;
                    _seriesdata.DSId = series.DSId;
                    _seriesdata.DSName = series.DSName;
                    _seriesdata.DSCnnCretedby = series.DSCnnCretedby;
                    _seriesdata.formulea = formulatext;
                    var slcXSPgridobj = new Array();
                    slcXSPgridobj.push(_seriesdata);

                    //var params = {
                    //    Get_SPGriddtail: JSON.stringify(slcXSPgridobj),
                    //    formula: formulatext
                    //};
                    //async: false, cache: false, headers: {
                    //    'Accept':
                    //    'application/json', 'Pragma': 'no-cache'
                    //},

                    try {
                        $http.post('/GetAllConnectionData/GET_DataForMathOperations', { Get_SPGriddtail: JSON.stringify(slcXSPgridobj) }).success(function (data) {
                            if (data.tabledata) {
                                series.data = [];
                                series.data = (data.tabledata);
                                series.formula_template = formula_template;
                                if ((series.charttype != "pie") || (series.charttype != "doughnut") || (series.charttype != "pyramid") || (series.charttype != "funnel")) {
                                    var carray = [$("#seriescolorpick").colorpicker("val")];
                                    series.series_color = carray;
                                }
                                selecteditem.set({ datatabs: $scope.datatabs });
                                _.find(arrdata, function (rw, index) {
                                    if (rw.id == sid) {
                                        selecteditem.unset("series", { silent: true });
                                        arrdata[index] = series;
                                        selecteditem.set({ "series": arrdata });
                                    }
                                    return rw.id == sid;
                                });
                            }
                            else if (data.errorresult) {
                                alert(data.errorresult)
                            }
                            else if (data.responsedata) {
                                alert("configure parameters");
                            }
                        }).error(function (data) {

                        });
                    }
                    catch (e) {
                        alert(e);
                    }
                }
            }
            else if ($scope.selecteditem == "XAXIS") {
                //selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
                var series = selecteditem.get("xaxis");
                var connectionid = series.connectionid;
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                series.selectedid = selecteddatatab;
                series.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                series.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                series.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                series.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                series.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                series.formula = formulatext;
                series.formula_template = formula_template;

                if (formulatext != "undefined") {
                    var _xdata = new Object();
                    _xdata.ConnectionID = series.connectionid;
                    _xdata.DSConnType = series.connectiontype;
                    _xdata.DSId = series.DSId;
                    _xdata.DSName = series.DSName;
                    _xdata.DSCnnCretedby = series.DSCnnCretedby;
                    _xdata.formulea = formulatext;
                    var slcXSPgridobj = new Array();
                    slcXSPgridobj.push(_xdata);

                    //var params = {
                    //       Get_SPGriddtail: JSON.stringify(slcXSPgridobj),
                    //       formula: formulatext
                    //   };

                    //async: false, cache: false, headers: {
                    //    'Accept':
                    //    'application/json', 'Pragma': 'no-cache'
                    //},

                    try {
                        $http.post('/GetAllConnectionData/GET_DataForMathOperations', { Get_SPGriddtail: JSON.stringify(slcXSPgridobj) }).success(function (data) {
                            if (data.tabledata) {
                                series.data = [];
                                series.data = data.tabledata
                                selecteditem.unset("datatabs", { silent: true });
                                selecteditem.set({ datatabs: $scope.datatabs });
                                selecteditem.unset("xaxis", { silent: true });
                                selecteditem.set({ "xaxis": series });
                            }
                            else if (data.errorresult) {
                                alert(data.errorresult)
                            }
                            else if (data.responsedata) {
                                alert("configure parameters");
                            }

                        }).error(function (data) {

                        });
                    }
                    catch (e) {
                        alert(e);
                    }
                }
            }
            else if ($scope.selecteditem == "Chart") {
                var selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                var updatedlables = new Object();
                updatedlables.selectedid = selecteddatatab;
                updatedlables.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                updatedlables.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                updatedlables.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                updatedlables.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                updatedlables.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                updatedlables.formula = formulatext;
                updatedlables.formula_template = formula_template;
                selecteditem.set({ xaxis: updatedlables });
            }
            else if ($scope.selecteditem == "Charttype") {
                var selecteditem = bid3chart.byId(bid3chart, $scope.view.getSelected().controlid);
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                var updatedlables = new Object();
                updatedlables.selectedid = selecteddatatab;
                updatedlables.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                updatedlables.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                updatedlables.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                updatedlables.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                updatedlables.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                updatedlables.formula = formulatext;
                updatedlables.formula_template = formula_template;
                selecteditem.set({ xaxis: updatedlables });
            }
            else if ($scope.selecteditem == "TitleFormula") {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                var updatedlables = selecteditem.get("titleproperties");
                updatedlables.selectedid = selecteddatatab;
                updatedlables.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                updatedlables.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                updatedlables.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                updatedlables.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                updatedlables.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                updatedlables.formula = formulatext;
                updatedlables.formula_template = formula_template;
                selecteditem.unset("titleproperties", { silent: true });
                selecteditem.set({ "titleproperties": updatedlables });
            }
        };

        //Update Chart Properties by Choosing Options
        $scope.updatechartproperties = function () {
            //Chart Properties Model Updation
            var updatechartprop = new Object();
            updatechartprop.width = $("#stylewidth").val();
            updatechartprop.manualwidth = $("#stylewidth").val();
            updatechartprop.height = $("#styleheight").val();
            updatechartprop.backgroundcolor = $("#chartbgcolor").val();
            updatechartprop.bordercolor = $("#chartbrcolor").val();
            updatechartprop.borderwidth = $("#chartborderwidth").val();
            updatechartprop.borderstyle = $("#chartborderstyle").val();
            updatechartprop.backgradientstyle = $("#chartGGradiant").val();
            updatechartprop.borderskin = $("#chartGFrame").val();

            //Chart Title Properties Model Updation
            var updatecharttitleprop = new Object();
            updatecharttitleprop.charttitle = $("#charttitle").val();
            updatecharttitleprop.charttitlecolor = $("#ctitlecolor").val();
            updatecharttitleprop.charttitlefontstyle = $("#ctitlestyle").val();
            updatecharttitleprop.charttitlefontsize = $("#ctitlefont").val();
            updatecharttitleprop.charttitledocking = $("#ctitledocking").val();
            updatecharttitleprop.titlePrefix = $("#ctitleprefix").val();
            updatecharttitleprop.titleSuffix = $("#ctitlesuffix").val();

            //Chart Area Properties Model Updation
            var updatechartareaprop = new Object();
            updatechartareaprop.BackColor = $("#areabgcolor").val();
            updatechartareaprop.SecondaryColor = $("#areabg2color").val();
            updatechartareaprop.areaGradient = $("#areaGradient").val();
            updatechartareaprop.Clustered = $("#areaclustred").val();
            updatechartareaprop.WallWidth = $("#areaWallWidth").val();
            updatechartareaprop.showin3D = $("#showin3D").val();
            var Showin3d = $("#showin3D").val();
            if (Showin3d == "true") {
                $("#areaRotationx").removeAttr('disabled');
                $("#areaRotationy").removeAttr('disabled');
                $("#areaposx").removeAttr('disabled');
                $("#areaposy").removeAttr('disabled');
                $("#areaWallWidth").removeAttr('disabled');
            }
            else {
                $("#areaRotationx").attr("disabled", "disabled");
                $("#areaRotationx").val('10');
                $("#areaRotationy").attr("disabled", "disabled");
                $("#areaRotationy").val('10');
                $("#areaposx").attr("disabled", "disabled");
                $("#areaposx").val('10');
                $("#areaposy").attr("disabled", "disabled");
                $("#areaposy").val('10');
                $("#areaWallWidth").attr("disabled", "disabled");
                $("#areaWallWidth").val('5');
            }
            updatechartareaprop.RotationX = $("#areaRotationx").val();
            updatechartareaprop.RotationY = $("#areaRotationy").val();
            updatechartareaprop.AreaPosX = $("#areaposx").val();
            updatechartareaprop.AreaPosY = $("#areaposy").val();

            //Chart Legend Properties Model Updation
            var updatechartlegendprop = new Object();
            updatechartlegendprop.PrimaryBackColor = $("#legendbgcolor").val();
            updatechartlegendprop.SecondaryBackColor = $("#legendbg2color").val();
            updatechartlegendprop.legendGradient = $("#legendGradient").val();
            updatechartlegendprop.Hatching = $("#lagendHatchingList").val();
            //updatechartlegendprop.BorderColor = $("#chartlegendbrcolor").val();
            //updatechartlegendprop.BorderSize = $("#chartlegendbrwidth").val();
            //updatechartlegendprop.BorderDashStyle = $("#legendbrstyle").val();
            updatechartlegendprop.legenddock = $("#legenddocking").val();
            updatechartlegendprop.ShadowOffset = $("#lagendShadowOffsetList").val();
            updatechartlegendprop.LegendFontSize = $("#legendfontsize").val();
            updatechartlegendprop.LegendFontStyle = $("#legendfontfamily").val();
            if ($('#showlegends').prop('checked')) {
                updatechartlegendprop.showlegends = "true";
            }
            else {
                updatechartlegendprop.showlegends = "false";
            }

            //Chart X-Axis Properties Model Updation
            var updateXproperties = new Object();
            updateXproperties.xPrefix = $("#xchrtPrefix").val();
            updateXproperties.xSuffix = $("#xchrtSuffix").val();
            if ($('#xshowlabelticks').prop('checked')) {
                updateXproperties.xShowlabels = "true";
            }
            else {
                updateXproperties.xShowlabels = "false";
            }
            updateXproperties.xaxistitle = $("#chrtxaxistitle").val();
            updateXproperties.xtitlecolor = $("#xtitlecolor").val();
            updateXproperties.xtitlestyle = $("#xtitlestyle").val();
            updateXproperties.xtitlefontsize = $("#xtitlefont").val();
            updateXproperties.xname = $("#chrtxaxistitle").val();
            updateXproperties.xlblstyleangle = $("#xlblstyleangle").val();
            //var indexselected;
            //var ref = $('#bitree').jstree(true);
            //var sid = ref.get_selected();
            //$("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span style=" color: #777;">X Axis:</span>' + $("#chrtxaxistitle").val() + '');
            updateXproperties.xlabeldrop = $("#xlbledrp").val();
            if ($("#xgridlines").prop('checked')) {
                updateXproperties.xshowgridlines = "true";
            }
            else {
                updateXproperties.xshowgridlines = "false";
            }
            $("#bitree").jstree('set_text', ['#XAXIS', $("#chrtxaxistitle").val()]);

            if ($('#xfmtas').val() == "Number") {
                $("#xfmtdecimaldiv").show();
            }
            else {
                $("#xfmtdecimaldiv").hide();
            }
            updateXproperties.xformatas = $('#xfmtas').val();
            updateXproperties.xdecimalval = $("#xdecimalvalue").val();

            //Chart Series Properties Model Updation
            var updateseriesproperties = new Object();
            if ($('#srshowlabels').prop('checked')) {
                updateseriesproperties.srShowLabels = "true";
            }
            else {
                updateseriesproperties.srShowLabels = "false";
            }
            if ($('#srformatas').val() == "Number") {
                $("#srdecimalplacediv").show();
            }
            else {
                $("#srdecimalplacediv").hide();
            }

            //Chart Y-Axis Properties Model Updation
            var updateYproperties = new Object();
            updateYproperties.yaxistitle = $("#chrtyaxistitle").val();
            updateYproperties.ytitlecolor = $("#ytitlecolor").val();
            updateYproperties.ytitlestyle = $("#ytitlestyle").val();
            updateYproperties.ytitlefontsize = $("#ytitlefont").val();

            if ($('#yautointerval').prop('checked')) {
                updateYproperties.yinterval = "yauto";
            }
            else if ($('#ymanualinterval').prop('checked')) {
                updateYproperties.yinterval = "ymanual";
                updateYproperties.ymanualinterval = $("#ymanualintervaltxt").val();
            }
            if ($('#yshowlabelticks').prop('checked')) {
                updateYproperties.yShowlabels = "true";
            }
            else {
                updateYproperties.yShowlabels = "false";
            }
            // updateYproperties.ylabeldrop = $("#ylbledrp").val();
            if ($("#ygridlines").prop('checked')) {
                updateYproperties.yshowgridlines = "true";
            }
            else {
                updateYproperties.yshowgridlines = "false";
            }

            //if ($("#ytwoaxis").prop('checked')) {
            //    updateYproperties.ytwoaxis = "true";
            //}
            //else {
            //    updateYproperties.ytwoaxis = "false";
            //}            
            selecteditem.set({ style: updatechartprop, titleproperties: updatecharttitleprop, areaproperties: updatechartareaprop, legendproperties: updatechartlegendprop, xaxisproperties: updateXproperties, seriespropperties: updateseriesproperties, yaxis: updateYproperties });
        };

        //Update Chart Properties by Choosing Options
        $scope.updatecharttypeprop = function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            series.labelstyle = $("#pieglobalLabel").val();
            series.labeldatashow = $("#pieglobalLabeldata").val();
            series.drawingstyle = $("#pieglobalDrawingstyle").val();
            series.doughnutradius = $("#pieglobalDoughnutRad").val();
            series.chartcolumnstyle = $("#barandcolumnstyles").val();
            series.labelplacement = $("#pieglobalLabelsPacement").val();
            series.pyramiddrawingstyle = $("#pyramidldrawingstyle").val();
            series.pyramidrotationangle = $("#pyramidlrotationangle").val();
            series.pyramidvaluetype = $("#pyramidlvaluetype").val();
            series.pyramidminpoint = $("#pyramidpointwd").val();
            series.pointwidth = $("#chartGpontWidth").val();
            series.bubbleselstyle = $("#bubbleselstyle").val();
            series.stackedstyle = $("#stackedcharttypes").val();
            series.srlinewidth = $("#srchartlinewidth").val();
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                }
                return rw.id == sid;
            });
        };

        //Y-interval by Choosing Options
        $scope.showtwoaxis = function () {
            var selectedseries = $('input[name= SecondaryAxis]:checked').val();
            var obj = selecteditem.get("series");
            for (var i = 1; i < obj.length; i++) {
                var seriesname = obj[i].name;
                if (selectedseries == seriesname) {
                    var seriesid = obj[i].id;
                    obj[i].ytwoaxis = "true";
                    selecteditem.unset("series", { silent: true });
                    selecteditem.set({ "series": obj });
                }
            }
            //if ($('input[name= SecondaryAxis]:checked').val() == "yauto") {
            //    $("#yintervaldiv").hide();
            //    $scope.updatechartproperties();
            //}
            //else if ($('input[name= yinterval]:checked').val() == "ymanual") {
            //    $("#yintervaldiv").show();
            //    var arrdata = selecteditem.get("yaxis");
            //    $("#ymanualintervaltxt").val(arrdata.ymanualinterval);
            //}
        };

        $scope.drilltrindex = 0;
        $scope.drilltdindex = 0;
        $scope.drilledindex = 0;
        $scope.drilltdlength = 0;

        //Get Dashboard List by Choosing Options
        $scope.GetDashboardlist = function (type, $event) {
            $http.post('/Home/GetDashboard').success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.Result) {
                    $('#tbl_dashboardsList').DataTable().destroy();
                    $('#tbl_dashboardsList').DataTable({
                        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                        "fnDrawCallback": function () {
                            ViewDashboardLink();
                        }
                    }).clear();
                    for (var i = 0; i < data.Result.length; i++) {
                        $('#tbl_dashboardsList').dataTable().fnAddData([data.Result[i]["Dashboard_name"], data.Result[i]["Description"], data.Result[i]["CreatedBy"],
                            '<button class="borderless dashboardview1" title="View Selected widgets" data-selectdashboard=\'' + JSON.stringify(data.Result[i]) + '\'><i class="fa fa-eye" style="color:#438eb9;"></i></button>'
                        ]);
                    }

                    if (type == "menu") {
                        var element = angular.element('#mymodalforalldashboards');
                        element.modal('show');
                        $scope.drilltrindex = $($event.target).parent().parent().parent().parent().index();
                        $scope.drilltdindex = $($event.target).parent().parent().parent().index();
                        $scope.drilledindex = $($event.target).parent().find(".targetdsboarddrillindex").val();
                        $scope.drilltdlength = $("#drilldowntabletbody tr td").length;
                    }
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
            }).error(function (data) {
                $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
                $scope.loading = false;
            });
        };

        //Click functions for View in Dashboards List
        function ViewDashboardLink() {
            $(".dashboardview1").unbind("click");
            $(".dashboardview").parent().css("text-align", "center");
            $(".dashboardview1").click(function () {
                var viewparameters = JSON.parse($(this).attr("data-selectdashboard"));
                var drilltrindex = $scope.drilltrindex;
                var drilltdindex = $scope.drilltdindex;
                //$("#drilldowntabletbody tr:eq("+drilltrindex+")").find("td:eq:("+drilltdindex+")")
                $("#drilldowntabletbody tr:eq(" + drilltrindex + ")").find("td:eq(" + drilltdindex + ")").find(".targetdsboardid").val(viewparameters.DsahboardId);
                $("#drilldowntabletbody tr:eq(" + drilltrindex + ")").find("td:eq(" + drilltdindex + ")").find(".targetdsboard").val(viewparameters.Dashboard_name);
                var drilldownprop = selecteditem.get("drilldown");
                var drilledindex = $scope.drilledindex;
                drilldownprop[drilledindex].DashboardId = viewparameters.DsahboardId;
                drilldownprop[drilledindex].DashboardName = viewparameters.Dashboard_name;
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                var element = angular.element('#mymodalforalldashboards');
                element.modal('hide');
            });
        }

        $scope.gridclose = function () {
            var element = angular.element('#mymodalforalldashboards');
            element.modal('hide');
        };

        $scope.DataSourcesClose = function () {
            var element = angular.element('#myModalforallconn');
            element.modal('hide');
        };

        //Modal Close Function for Parameters Config
        $scope.modalclose = function () {
            var element = angular.element('#variableselection');
            element.modal('hide');
        };

        //X Chart Params
        $scope.Xchart_paramspopup = function (obj, $event) {
            var selectedaxis = $($event.target).parent().parent().attr("class");
            $($event.target).parent().parent().parent().find(".hidedivid").val(selectedaxis);
            var drilldownprop = selecteditem.get("drilldown");
            var drilltdindex = $($event.target).parent().parent().parent().find(".targetdsboarddrillindex").val();
            var drilldbtrindex = $($event.target).parent().parent().parent().parent().index();
            var drilldbtdindex = $($event.target).parent().parent().parent().index();
            $("#drilldowndbvariabletrindex").val(drilldbtrindex);
            $("#drilldowndbvariabletdindex").val(drilldbtdindex);

            if (drilldownprop[drilltdindex].ChartXParameterName.indexOf("ref") == -1) {
                $('input:radio[id=custvar]').attr('checked', true);
                $("#dbdivval").hide();
                $("#dbdiv").hide();
                $("#custdiv").show();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#drpdwnsetval").val(drilldownprop[drilltdindex].ChartXParameterValue);
                }
                else {
                    $("#drpdwnsetval").val(drilldownprop[drilltdindex].ChartYParameterValue);
                }
            }
            else {
                $('input:radio[id=dbvar]').attr('checked', true);
                $("#dbdivval").show();
                $("#dbdiv").show();
                $("#custdiv").hide();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#dblblval").text(drilldownprop[drilltdindex].ChartXParameterName);
                    $("#defaultval").val(drilldownprop[drilltdindex].ChartXParameterValue);
                }
                else {
                    $("#dblblval").text(drilldownprop[drilltdindex].ChartYParameterName);
                    $("#defaultval").val(drilldownprop[drilltdindex].ChartYParameterValue);
                }
            }
            var element = angular.element('#variableselection');
            element.modal('show');

            $(".dropdwnchange").unbind("change");
            $(".dropdwnchange").change(function () {
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop[drilltdindex].ChartXParameterName = $("#drpdwnsetval option:selected").text();
                drilldownprop[drilltdindex].ChartXParameterValue = $("#drpdwnsetval").val();
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                $($event.target).parent().find(".reqparamlbl_chartx").val($("#drpdwnsetval").val());
                $($event.target).parent().find(".reqparamtext_chartx").val($("#drpdwnsetval option:selected").text());
            });
        };

        //Y Chart Params
        $scope.Ychart_paramspopup = function (obj, $event) {
            var radioprop = selecteditem.get("drilldown");
            var selectedaxis = $($event.target).parent().parent().attr("class");
            $($event.target).parent().parent().parent().find(".hidedivid").val(selectedaxis);
            var drilldbtrindex = $($event.target).parent().parent().parent().parent().index();
            var drilldbtdindex = $($event.target).parent().parent().parent().index();
            $("#drilldowndbvariabletrindex").val(drilldbtrindex);
            $("#drilldowndbvariabletdindex").val(drilldbtdindex);
            var drilldownprop = selecteditem.get("drilldown");
            var drilltdindex = $($event.target).parent().parent().parent().find(".targetdsboarddrillindex").val();

            if (drilldownprop[drilltdindex].ChartYParameterName.indexOf("ref") == -1) {
                $('input:radio[id=custvar]').attr('checked', true);
                $("#dbdivval").hide();
                $("#dbdiv").hide();
                $("#custdiv").show();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#drpdwnsetval").val(drilldownprop[drilltdindex].ChartXParameterValue);
                }
                else {
                    $("#drpdwnsetval").val(drilldownprop[drilltdindex].ChartYParameterValue);
                }
            }
            else {
                $('input:radio[id=dbvar]').attr('checked', true);
                $("#dbdivval").show();
                $("#dbdiv").show();
                $("#custdiv").hide();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#dblblval").text(drilldownprop[drilltdindex].ChartXParameterName);
                    $("#defaultval").val(drilldownprop[drilltdindex].ChartXParameterValue);
                }
                else {
                    $("#dblblval").text(drilldownprop[drilltdindex].ChartYParameterName);
                    $("#defaultval").val(drilldownprop[drilltdindex].ChartYParameterValue);
                }
            }
            var element = angular.element('#variableselection');
            element.modal('show');

            $(".dropdwnchange").unbind("change");
            $(".dropdwnchange").change(function () {
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop[drilltdindex].ChartYParameterName = $("#drpdwnsetval option:selected").text();
                drilldownprop[drilltdindex].ChartYParameterValue = $("#drpdwnsetval").val();
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                $($event.target).parent().find(".reqparamlbl_charty").val($("#drpdwnsetval").val());
                $($event.target).parent().find(".reqparamtext_charty").val($("#drpdwnsetval option:selected").text());
            });
        };

        //Radio Click Operation for Params Config
        $scope.radioclick = function () {
            if ($('input[name= cvariables]:checked').val() == "cv") {
                $("#dblblval").val("");
                $("#dbdiv").hide();
                $("#custdiv").show();
            }
            else if ($('input[name= cvariables]:checked').val() == "dv") {
                $("#drpdwnsetval").val("");
                $("#dbdiv").show();
                $("#custdiv").hide();
            }
            var divid = $("#hidedivid").val();
            var divindex = $("#" + divid).index();
        };

        //Chart Modal Close Function
        $scope.chartmodalclose = function () {
            var element = angular.element('#VariableModal');
            element.modal('hide');
        };

        //Y-Interval by Choosing Options
        $scope.yinterval = function () {
            if ($('input[name= yinterval]:checked').val() == "yauto") {
                $("#yintervaldiv").hide();
                $scope.updatechartproperties();
            }
            else if ($('input[name= yinterval]:checked').val() == "ymanual") {
                $("#yintervaldiv").show();
                var arrdata = selecteditem.get("yaxis");
                $("#ymanualintervaltxt").val(arrdata.ymanualinterval);
            }
        };
    });
}


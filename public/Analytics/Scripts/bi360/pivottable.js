function envpivottable($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID(); $scope.datatabs = []; $scope.formulaop = "Aggrigative"; $scope.optype = "Arithmetic";
    var selecteditem;

    //........ adding control to backbone model .............//

    if (controlid == "new")//Creating new Control
    {
        bipivottable.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            series: [{ "id": "ZAXIS_" + $scope.view.getID() + "", "name": "Untitled", "charttype": "column", "series_color": [], "showvaluesonlabel": "true", "labelstyle": "Outside", "labeldatashow": "X-VALUES", "drawingstyle": "SoftEdge", "doughnutradius": "60", "chartcolumnstyle": "Cylinder", "labelplacement": "Right", "pyramiddrawingstyle": "CircularBase", "pyramidrotationangle": "0", "pyramidvaluetype": "Linear", "pyramidminpoint": "2", "pointwidth": "0.4", "srlinewidth": "1", "bubbleselstyle": "Circle", "stckedstyle": "true", "valuelabelangle": "0", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" }],
            style: { "position": "absolute", "width": "100%", "manualwidth": "100%", "height": "300px", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "palette": "", "backgroundcolor": "#ffffff", "bordercolor": "#ffffff", "borderstyle": "Solid", "backgradientstyle": "None", "borderskin": "None", "borderwidth": "2" },
            xaxis: { "id": "xaxis", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" },
            yaxis: { "id": "yaxis", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" },
            seriespropperties: { "srShowLabels": "true", "srFormatAs": "Text", "DecimalPlaces": "undefined", "AxisTitle": "undefined" },
            xaxisproperties: { "xname": "Untitled", "xformatas": "Text", "xdecimalval": "0", "xtitlecolor": "#0000ff", "xtitlestyle": "Arial", "xtitlefontsize": "10", "xPrefix": "", "xSuffix": "", "xShowlabels": "true", "xlblstyleangle": "0", "xaxistitle": "", "xlabeldrop": "1", "xshowgridlines": "true", "zTotals": "true", "zAverages": "false" },
            yaxisproperties: { "yname": "Untitled", "yformatas": "Text", "ydecimalval": "0", "ytitlecolor": "#0000ff", "ytitlestyle": "Arial", "ytitlefontsize": "10", "yPrefix": "", "ySuffix": "", "yShowlabels": "true", "ylblstyleangle": "0", "yaxistitle": "", "ylabeldrop": "1", "yshowgridlines": "true" },
            //legendproperties: { "PrimaryBackColor": "#ffffff", "SecondaryBackColor": "#ffffff", "legenddock": "Bottom", "legendGradient": "None", "Hatching": "Cross", "BorderColor": "#000000", "BorderSize": "2", "BorderDashStyle": "Solid", "ShadowOffset": "0", "LegendFontSize": "10", "LegendFontStyle": "Arial", "showlegends": "true" },
            //areaproperties: { "BackColor": "#ffffff", "SecondaryColor": "#ffffff", "areaGradient": "None", "Clustered": "false", "showin3D": "false", "RotationX": "10", "RotationY": "10", "AreaPosX": "10", "AreaPosY": "10", "WallWidth": "5" },
            //titleproperties: { "charttitle": "ChartTitle", "charttitlecolor": "#000000", "charttitlefontstyle": "Arial", "charttitlefontsize": "10", "charttitledocking": "Top", "titlePrefix": "", "titleSuffix": "", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" },
            drilldown: { "DashboardId": "", "DashboardName": "", "ChartXParameterName": "", "ChartXParameterValue": "", "ChartYParameterName": "", "ChartYParameterValue": "" },
            refresh: "",
            datatabs: [],
            target: target,
            type: type
        }]);
        //selecteditem = biserverchart.byId(biserverchart, $scope.view.getSelected().controlid);
        selecteditem = bipivottable.byId(bipivottable, Controlid);
    }
    else {
        selecteditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }
    $("#seriescolorpick").colorpicker();

    $scope.selected = 2; $scope.selecteditem = "Pivot"; $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
    $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide(); $("#chartareaprop").hide(); $("#chartlegendprop").hide();
    selecteditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
    $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();

    // ......... For loading html template with preview and properties tree.................//

    $http.get('../Bi360Templates/Tabs/Pivottable.html').success(function (t) {
        $("#Tabsobject").html($compile(t)($scope));
        // ......... For Loading Variables for Parameters Config.................//
        $scope.LoadVariable();
        // ......... For Loading Variables for Parameters Config Ended.................//

        // ......... For Selecting Pivot Type .................//

        $(".ctype").unbind("click");
        $(".ctype").click(function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            //  var series = _.find(arrdata, function (rw, index) { return rw.id == sid; });
            $(".ctype").find("i").remove(); $el = $(this); $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
            var charttype = $.trim($el.text());
            var piecolors = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
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


                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").show();
                $("#stackedtypes").hide();
                //pyramid

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



                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").show();
                //pyramid

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

                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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

        // ......... For Selecting Pivot Type Ended.................//

        // ......... For Showing series values on Pivot .................//
        $("#seriessvalues").unbind("change");
        $("#seriessvalues").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            if ($('#seriessvalues').prop('checked')) {
                series.showvaluesonlabel = "true";
            } else {
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
        // ......... For Showing series values on Pivot Ended.................//

        // ......... For Showing Cylinder StackedCharts.................//
        $("#stackedstyle").unbind("change");
        $("#stackedstyle").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            if ($('#stackedstyle').prop('checked')) {
                series.stckedstyle = "true";
            } else {
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
        // ......... For For Showing Cylinder StackedCharts Ended.................//

        // ......... For Pivot series values Angle Selection .................//
        $("#seriestopvalangle").unbind("change");
        $("#seriestopvalangle").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
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
        // ......... For Pivot series values Angle Selection Ended.................//

        // ......... For Pivot series name change .................//
        $("#srseriesname").unbind("change");
        $("#srseriesname").on("change", function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            var sname = $("#srseriesname").val();
            series.name = sname;
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("series", { silent: true });
                    arrdata[index] = series;
                    selecteditem.set({ "series": arrdata });
                    //  $("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span class="series" style=" color: #777;">ZAXIS:</span>' + sname + '');
                    $("#" + sid).find('.seriesname').text(sname);
                }
                return rw.id == sid;
            });
        });
        // ......... For Pivot series name change ended .................//

        // ......... For Pivot manual interval for y-axis property .................//
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
        // ......... For Pivot manual interval for y-axis property ended .................//


        $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
        $("#addtotree").remove();
        $("<a style='font-weight:bold;text-align:right;margin-left: 112px;' id='addtotree'>+Add ZAXIS</a>").insertBefore("#treeid");

        //tree data
        var data = [
                   { "id": "Pivot", "parent": "#", "text": "Pivot", 'state': { 'opened': true, 'selected': true } },
                   //{ "id": "Title", "parent": "Pivot", "text": "Pivot Title", 'state': { 'opened': true } },
                   //{ "id": "TitleFormula", "parent": "Title", "text": "Title Formula" },
                   //{ "id": "Area", "parent": "Pivot", "text": "Pivot Area" },
                   //{ "id": "Legend", "parent": "Pivot", "text": "Legends" },
                   //{ "id": "Labels", "parent": "Pivot", "text": "Labels" },
                   //{ "id": "Drilldown", "parent": "Pivot", "text": "DrillDown" },
                   { "id": "ZAXIS", "parent": "Pivot", "text": "AXIS", 'state': { 'opened': true } },
                           { "id": "XAXIS_" + $scope.view.getID() + "", "parent": "ZAXIS", "text": "<span style=' color: #777;'>X Axis:</span>Untitled" },
                            { "id": "YAXIS_" + $scope.view.getID() + "", "parent": "ZAXIS", "text": "<span style=' color: #777;'>Y Axis:</span>Untitled" },
                             //{ "id": "Series_First", "parent": "ZAXIS", "text": "<span style=' color: #777;' class='series'>ZAXIS:</span>Untitled" },
        ];
        //   ...............construct tree by using jquery plugun..//
        $('#bitree').jstree("destroy");
        $('#bitree').bind('loaded.jstree', function (e, data) {
            $scope.selecteditem = "Pivot";
            $scope.selected = 2;

            var arrdata = selecteditem.get("series");
            for (var i = 0; i < arrdata.length; i++)
                jQuery("#bitree").jstree(true).create_node($('#ZAXIS'), { text: "<span style=' color: #777;' class='series'>ZAXIS:</span><span style=' color: #777;' class='seriesname'>" + arrdata[i].name + "</span>", id: arrdata[i].id }, 'last');
            selecteditem.unset("refresh", { silent: true });
            selecteditem.set({ "refresh": "refresh" });


            //...............initial chart properties ........................//       
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

            //...............initial chart properties ends........................//


            //...............initial chart title properties........................//
            //var charttitlepropobj = selecteditem.get("titleproperties");
            //$("#charttitle").val(charttitlepropobj.charttitle);
            //$("#ctitlecolor").val(charttitlepropobj.charttitlecolor);
            //$("#titlecolor").find(".colorPicker-picker").css({ "background-color": charttitlepropobj.charttitlecolor });
            //$("#ctitlestyle").val(charttitlepropobj.charttitlefontstyle);
            //$("#ctitlefont").val(charttitlepropobj.charttitlefontsize);
            //$("#ctitledocking").val(charttitlepropobj.charttitledocking);
            //$("#ctitleprefix").val(charttitlepropobj.titlePrefix);
            //$("#ctitlesuffix").val(charttitlepropobj.titleSuffix);
            //...............initial chart title properties ends........................//


            ////...............initial chart area properties ........................//
            //var chartareapropobj = selecteditem.get("areaproperties");
            //$("#areabgcolor").val(chartareapropobj.BackColor);
            //$("#careabgcolor").find(".colorPicker-picker").css({ "background-color": chartareapropobj.BackColor });
            //$("#areabg2color").val(chartareapropobj.SecondaryColor);
            //$("#careabg2color").find(".colorPicker-picker").css({ "background-color": chartareapropobj.SecondaryColor });
            //$("#areaGradient").val(chartareapropobj.areaGradient);
            //$("#areaclustred").val(chartareapropobj.Clustered);
            //$("#showin3D").val(chartareapropobj.showin3D);
            //var Showin3d = $("#showin3D").val();
            //if (Showin3d == "true") {
            //    $("#areaRotationx").removeAttr('disabled');
            //    $("#areaRotationy").removeAttr('disabled');
            //    $("#areaposx").removeAttr('disabled');
            //    $("#areaposy").removeAttr('disabled');
            //    $("#areaWallWidth").removeAttr('disabled');
            //}
            //else {
            //    $("#areaRotationx").attr("disabled", "disabled");
            //    $("#areaRotationy").attr("disabled", "disabled");
            //    $("#areaposx").attr("disabled", "disabled");
            //    $("#areaposy").attr("disabled", "disabled");
            //    $("#areaWallWidth").attr("disabled", "disabled");
            //}
            //$("#areaWallWidth").val(chartareapropobj.WallWidth);
            //$("#areaRotationx").val(chartareapropobj.RotationX);
            //$("#areaRotationy").val(chartareapropobj.RotationY);
            //$("#areaposx").val(chartareapropobj.AreaPosX);
            //$("#areaposy").val(chartareapropobj.AreaPosY);
            ////...............initial chart area properties ends........................//

            //...............initial chart legend properties ........................//
            //var chartlegendpropobj = selecteditem.get("legendproperties");;
            //// $("#legendbgcolor").val(chartlegendpropobj.PrimaryBackColor);
            //// $("#clegendbgcolor").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.PrimaryBackColor });
            //// $("#legendbg2color").val(chartlegendpropobj.SecondaryBackColor);
            ////$("#clegendbg2color").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.SecondaryBackColor });
            //$("#legendGradient").val(chartlegendpropobj.legendGradient);
            //$("#lagendHatchingList").val(chartlegendpropobj.Hatching);
            //$("#lagendShadowOffsetList").val(chartlegendpropobj.ShadowOffset);
            //$("#legendfontsize").val(chartlegendpropobj.LegendFontSize);
            //$("#legendfontfamily").val(chartlegendpropobj.LegendFontStyle);
            //$("#legenddocking").val(chartlegendpropobj.legenddock);
            //if (chartlegendpropobj.showlegends == "true") {
            //    $('#showlegends').prop('checked', true);
            //}
            //else {
            //    $('#showlegends').prop('checked', false);
            //}
            ////...............initial chart legend properties ends........................//

            ////...............initial chart seriespropperties ........................//
            //var chartseriespropobj = selecteditem.get("seriespropperties");
            //if (chartseriespropobj.srShowLabels == "true") {
            //    $('#srshowlabels').prop('checked', true);
            //}
            //else {
            //    $('#srshowlabels').prop('checked', false);
            //}
            //if ($('#srformatas').val() == "Number") {
            //    $("#srdecimalplacediv").show();
            //} else {
            //    $("#srdecimalplacediv").hide();
            //}

            //...............initial chart seriespropperties ends........................//     

            //...............initial chart x-axis properties ........................//
            var chartxpropobj = selecteditem.get("xaxisproperties");
            $("#xchrtPrefix").val(chartxpropobj.xPrefix);
            $("#xchrtSuffix").val(chartxpropobj.xSuffix);
            if (chartxpropobj.xShowlabels == "true") {
                $('#xshowlabelticks').attr('checked', true);
            }
            else {
                $('#xshowlabelticks').attr('checked', false);
            }
            $("#chrtxaxistitle").val(chartxpropobj.xaxistitle);

            $("#xtitlecolor").val(chartxpropobj.xtitlecolor);
            $("#xtitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartxpropobj.xtitlecolor });
            $("#xtitlestyle").val(chartxpropobj.xtitlestyle);
            $("#xtitlefont").val(chartxpropobj.xtitlefontsize);

            $("#xlbledrp").val(chartxpropobj.xlabeldrop);
            if (chartxpropobj.xshowgridlines == "true") {
                $("#xgridlines").attr('checked', true);
            }
            else {
                $("#xgridlines").attr('checked', false);
            }

            if (chartxpropobj.zTotals == "true") {
                $("#zTotals").attr('checked', true);
            }
            else {
                $("#zTotals").attr('checked', false);
            }
            if (chartxpropobj.zAverages == "true") {
                $("#zAverages").attr('checked', true);
            }
            else {
                $("#zAverages").attr('checked', false);
            }
            $("#xlblstyleangle").val(chartxpropobj.xlblstyleangle);
            $("#xfmtas").val(chartxpropobj.xformatas);

            if (chartxpropobj.xformatas == "Number") {
                $("#xfmtdecimaldiv").show();
            } else {
                $("#xfmtdecimaldiv").hide();
            }
            $("#xdecimalvalue").val(chartxpropobj.xdecimalval);

            //...............initial chart x-axis properties ends........................//


            //...............initial chart y-axis properties ........................//
            //alert(chartypropobj.yShowlabels);
            var chartxpropobj = selecteditem.get("yaxisproperties");
            $("#ychrtPrefix").val(chartxpropobj.xPrefix);
            $("#ychrtSuffix").val(chartxpropobj.xSuffix);
            if (chartxpropobj.xShowlabels == "true") {
                $('#yshowlabelticks').attr('checked', true);
            }
            else {
                $('#yshowlabelticks').attr('checked', false);
            }
            $("#chrtyaxistitle").val(chartxpropobj.xaxistitle);

            $("#ytitlecolor").val(chartxpropobj.xtitlecolor);
            $("#ytitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartxpropobj.xtitlecolor });
            $("#ytitlestyle").val(chartxpropobj.xtitlestyle);
            $("#ytitlefont").val(chartxpropobj.xtitlefontsize);

            $("#ylbledrp").val(chartxpropobj.xlabeldrop);
            if (chartxpropobj.xshowgridlines == "true") {
                $("#ygridlines").attr('checked', true);
            }
            else {
                $("#ygridlines").attr('checked', false);
            }
            $("#ylblstyleangle").val(chartxpropobj.xlblstyleangle);
            $("#yfmtas").val(chartxpropobj.xformatas);

            if (chartxpropobj.xformatas == "Number") {
                $("#yfmtdecimaldiv").show();
            } else {
                $("#yfmtdecimaldiv").hide();
            }
            $("#ydecimalvalue").val(chartxpropobj.xdecimalval);
            //...............initial chart y-axis properties ends........................//



            $("#serverchartdatatab").hide(); $("#serverchartproperiestab").show(); $("#seriespropertiestab").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
            $("#charttabprop").show(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
            $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriescontentproperties").hide(); $("#drilldownproptab").hide();

            $scope.modal.strnumstatus = true; $scope.modal.expressionstatus = true;
            //if (controlid != "new") {
            //    var arrdata = selecteditem.get("series");
            //    var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            //    for (var i = 1; i < arrdata.length; i++) {
            //        alert(arrdata[i].name);
            //        jQuery("#bitree").jstree(true).create_node($('#ZAXIS'), { text: "<span style=' color: #777;' class='series'>ZAXIS:</span>" + arrdata[i].name, id: arrdata[i].id }, 'last');
            //    }
            //    selecteditem.unset("refresh", { silent: true });
            //    selecteditem.set({ "refresh": "refresh" });
            //    $('#seriescolorpick').colorpicker({ showOn: 'button' });
            //}
            //else {
            //    var arrdata = selecteditem.get("series");
            //    for (var i = 0; i < arrdata.length; i++)
            //        jQuery("#bitree").jstree(true).create_node($('#ZAXIS'), { text: "<span style=' color: #777;' class='series'>ZAXIS:</span>" + arrdata[i].name, id: arrdata[i].id }, 'last');

            //}
            $scope.$apply();
        }).jstree({
            'core': {
                'data': data,
                check_callback: true
            }, "types": {
                "default": {
                    "icon": "glyphicon glyphicon-flash"
                },
                "demo": {
                    "icon": "glyphicon glyphicon-ok"
                }
            }, "plugins": ["types", "contextmenu"]
        });
        //..........construct tree by using jquery plugun ended..//

        //......Auto Open preview html template popup ..//
        var element = angular.element('#bidsahboardconfig');
        element.modal('show'); $("#previewobject").empty();
        //......Auto Open preview html template popup ended ..//

        //.....Selecting Treenode and thier functionalities ..//

        var strsplit;
        $("#bitree").bind(
        "select_node.jstree", function (evt, data) {
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            _parentid = $("#" + sel + "").find('span').hasClass("series");
            _slength = $("#bitree").find(".series").length; $(".imgvalidate").remove();
            if (sel.toString().indexOf("_") != -1) {
                strsplit = new String(); strsplit = sel.toString(); strsplit = strsplit.split("_")[0];
                if (_parentid) {
                    if (_slength > 1) {
                        $el = $("#" + sel + "").find('a').first();
                        $("<a  class='imgvalidate' style='color:red' title='Remove Selected ZAXIS'>X</a>").insertAfter($el);
                    }
                    $scope.selected = 1; $scope.selecteditem = "ZAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                    $("#serverchartdatatab").show(); $("#serverchartproperiestab").show(); $("#seriespropertiestab").hide(); $("#xaxistabproperties").hide();
                    $("#charttabprop").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide(); $("#drilldownproptab").hide();
                    $("#chartareaprop").hide(); $("#chartlegendprop").hide();
                    $("#seriescharttypeprop").show(); $("#seriescontentproperties").show();
                    $(".imgvalidate").click(function () {
                        var arrdata = selecteditem.get("series");
                        _.find(arrdata, function (rw, index) {
                            if (rw.id == sel) {
                                arrdata.splice(index, 1); selecteditem.unset("series", { silent: true }); selecteditem.set({ "series": arrdata });
                            }
                            return rw.id == sel
                        });
                        ref.delete_node([sel]); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                        $("#serverchartdatatab").show(); $("#serverchartproperiestab").show(); $("#seriespropertiestab").hide(); $("#xaxistabproperties").hide();
                        $("#charttabprop").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide(); $("#drilldownproptab").hide();
                        $("#chartareaprop").hide(); $("#chartlegendprop").hide();
                        $("#seriescharttypeprop").show(); $("#seriescontentproperties").show();
                        $scope.selected = 1; $scope.selecteditem = "Pivot"; $("#bitree").jstree("select_node", "#Pivot").trigger("select_node.jstree");

                    });
                    $scope.getconnectiondetails(sel.toString());
                    var arrdata = selecteditem.get("series");
                    var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
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
                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                }
                else if (strsplit == "XAXIS") {
                    $scope.selected = 2; $scope.selecteditem = "XAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                    $(document.getElementById("serverchartdatatab")).click();
                    $("#serverchartdatatab").show(); $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();
                    $("#PivotOperations").show();                   


                    $scope.getxaxisconnectiondetails(sel.toString());

                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                    $("#serverchartproperiestab").show();
                    $("#charttabprop").hide(); $("#xaxistabproperties").show(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
                    $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriescontentproperties").hide();
                    $("#drilldownproptab").hide();
                    var chartxpropobj = selecteditem.get("xaxisproperties");
                    $("#xchrtPrefix").val(chartxpropobj.xPrefix);
                    $("#xchrtSuffix").val(chartxpropobj.xSuffix);
                    if (chartxpropobj.xShowlabels == "true")
                        $('#xshowlabelticks').prop('checked', true);
                    else
                        $('#xshowlabelticks').prop('checked', false);
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
                    if (chartxpropobj.zTotals == "true") {
                        $("#zTotals").attr('checked', true);
                    }
                    else {
                        $("#zTotals").attr('checked', false);
                    }
                    if (chartxpropobj.zAverages == "true") {
                        $("#zAverages").attr('checked', true);
                    }
                    else {
                        $("#zAverages").attr('checked', false);
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

                    //   $("#bitree").jstree._focused().get_selected().rename(chartxpropobj.xaxistitle);
                    // var node = $.jstree._focused().get_selected();
                    //$.jstree._focused().set_text(node, chartxpropobj.xaxistitle);

                    // $('#bitree').jstree('rename_node', '#XAXIS', chartxpropobj.xaxistitle);
                }
                else if (strsplit == "YAXIS") {
                    $scope.selected = 2; $scope.selecteditem = "YAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                    $(document.getElementById("serverchartdatatab")).click();
                    $("#serverchartdatatab").show(); $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();
                    $("#PivotOperations").hide();
                    $scope.getyaxisconnectiondetails(sel.toString());

                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                    $("#serverchartproperiestab").show();
                    $("#charttabprop").hide(); $("#xaxistabproperties").show(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
                    $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriescontentproperties").hide();
                    $("#drilldownproptab").hide();
                    var chartxpropobj = selecteditem.get("yaxisproperties");
                    $("#ychrtPrefix").val(chartxpropobj.yPrefix);
                    $("#ychrtSuffix").val(chartxpropobj.ySuffix);
                    if (chartxpropobj.yShowlabels == "true")
                        $('#yshowlabelticks').prop('checked', true);
                    else
                        $('#yshowlabelticks').prop('checked', false);
                    $("#chrtyaxistitle").val(chartxpropobj.yaxistitle);

                    $("#ytitlecolor").val(chartxpropobj.ytitlecolor);
                    $("#ytitlecolordiv").find(".colorPicker-picker").css({ "background-color": chartxpropobj.ytitlecolor });
                    $("#ytitlestyle").val(chartxpropobj.ytitlestyle);
                    $("#ytitlefont").val(chartxpropobj.ytitlefontsize);

                    $("#ylbledrp").val(chartxpropobj.ylabeldrop);
                    if (chartxpropobj.yshowgridlines == "true") {
                        $("#ygridlines").prop('checked', true);
                    }
                    else {
                        $("#ygridlines").prop('checked', false);
                    }
                    $("#ylblstyleangle").val(chartxpropobj.xlblstyleangle);
                    $("#bitree").jstree('set_text', ['#YAXIS', chartxpropobj.xaxistitle]);

                    $("#yfmtas").val(chartxpropobj.xformatas);
                    if (chartxpropobj.xformatas == "Number") {
                        $("#yfmtdecimaldiv").show();
                    } else {
                        $("#yfmtdecimaldiv").hide();
                    }
                    $("#ydecimalvalue").val(chartxpropobj.ydecimalval);

                    //   $("#bitree").jstree._focused().get_selected().rename(chartxpropobj.xaxistitle);
                    // var node = $.jstree._focused().get_selected();
                    //$.jstree._focused().set_text(node, chartxpropobj.xaxistitle);

                    // $('#bitree').jstree('rename_node', '#XAXIS', chartxpropobj.xaxistitle);

                }
                else {
                    $scope.selected = 1; $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                }

            }
            else if (sel == "Pivot") {
                $scope.selecteditem = "Pivot";
                $scope.selected = 2;
                $("#serverchartdatatab").hide(); $("#serverchartproperiestab").show(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                $("#charttabprop").show(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
                $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriespropertiestab").hide(); $("#seriescontentproperties").hide();
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
                $scope.selecteditem = "Charttype"; $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();
                var element = angular.element('#highcharttypes');
            }
            else if (sel == "ZAXIS") {
                if (_parentid) {
                    if (_slength > 1) {
                        $el = $("#" + sel + "").find('a').first();
                        $("<a  class='imgvalidate' style='color:red' title='Remove Selected ZAXIS'>X</a>").insertAfter($el);
                    }
                    //$scope.selected = 1;               
                    $scope.selecteditem = "ZAXIS"; $("#serverchartdatatab").show(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                    $(".imgvalidate").click(function () {
                        var arrdata = selecteditem.get("series");
                        _.find(arrdata, function (rw, index) {
                            if (rw.id == sel) {
                                arrdata.splice(index, 1); selecteditem.unset("series", { silent: true }); selecteditem.set({ "series": arrdata });
                            }
                            return rw.id == sel
                        });
                        ref.delete_node([sel]); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                        $scope.selected = 1; $scope.selecteditem = "ZAXIS"; $("#bitree").jstree("select_node", "#Pivot").trigger("select_node.jstree");
                    });
                    $scope.selected = 1; $("#serverchartdatatab").show(); $("#serverchartproperiestab").hide(); $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();
                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                    $("#VFormula-menu").show(); $("#vf-formula-bar").show();

                    //...............initial chart seriespropperties ........................//
                    var chartseriespropobj = selecteditem.get("seriespropperties");
                    if (chartseriespropobj.srShowLabels == "true") {
                        $('#srshowlabels').prop('checked', true);
                    }
                    else {
                        $('#srshowlabels').prop('checked', false);
                    }

                    if (chartseriespropobj.srFormatAs == "Number") {
                        $("#srdecimalplacediv").show();
                    } else {
                        $("#srdecimalplacediv").hide();
                    }
                    //...............initial chart seriespropperties ends........................//                
                }
            }
            else if (sel == "Title") {
                $scope.selected = 2; $scope.selecteditem = "YAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                $("#serverchartdatatab").hide(); $("#serverchartproperiestab").show();
                $("#charttabprop").hide(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").show();
                $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#chartareaprop").hide(); $("#seriespropertiestab").hide();
                $("#seriescontentproperties").hide(); $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;

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
                $scope.selected = 1; $("#serverchartdatatab").show(); $("#serverchartproperiestab").hide(); $("#seriespropertiestab").hide(); $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                $scope.selecteditem = "TitleFormula";
                $scope.gettitleconnectiondetails(sel.toString());


            }
            //else if (sel == "Area") {
            //    $scope.selected = 2; $scope.selecteditem = "YAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
            //    $("#serverchartdatatab").hide(); $("#serverchartproperiestab").show();
            //    $("#charttabprop").hide(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
            //    $("#chartareaprop").show(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriespropertiestab").hide();
            //    $("#seriescontentproperties").hide(); $("#drilldownproptab").hide();
            //    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;

            //    var chartareapropobj = selecteditem.get("areaproperties");
            //    $("#areabgcolor").val(chartareapropobj.BackColor);
            //    $("#careabgcolor").find(".colorPicker-picker").css({ "background-color": chartareapropobj.BackColor });
            //    $("#areabg2color").val(chartareapropobj.SecondaryColor);
            //    $("#careabg2color").find(".colorPicker-picker").css({ "background-color": chartareapropobj.SecondaryColor });
            //    $("#areaGradient").val(chartareapropobj.areaGradient);
            //    $("#areaclustred").val(chartareapropobj.Clustered);
            //    $("#showin3D").val(chartareapropobj.showin3D);
            //    var Showin3d = $("#showin3D").val();
            //    if (Showin3d == "true") {
            //        $("#areaRotationx").removeAttr('disabled');
            //        $("#areaRotationy").removeAttr('disabled');
            //        $("#areaposx").removeAttr('disabled');
            //        $("#areaposy").removeAttr('disabled');
            //        $("#areaWallWidth").removeAttr('disabled');
            //    }
            //    else {
            //        $("#areaRotationx").attr("disabled", "disabled");
            //        $("#areaRotationy").attr("disabled", "disabled");
            //        $("#areaposx").attr("disabled", "disabled");
            //        $("#areaposy").attr("disabled", "disabled");
            //        $("#areaWallWidth").attr("disabled", "disabled");
            //    }
            //    $("#areaWallWidth").val(chartareapropobj.WallWidth);
            //    $("#areaRotationx").val(chartareapropobj.RotationX);
            //    $("#areaRotationy").val(chartareapropobj.RotationY);
            //    $("#areaposx").val(chartareapropobj.AreaPosX);
            //    $("#areaposy").val(chartareapropobj.AreaPosY);

            //}
            //else if (sel == "Legend") {
            //    $scope.selected = 2; $scope.selecteditem = "YAXIS"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
            //    $("#serverchartdatatab").hide(); $("#serverchartproperiestab").show();
            //    $("#charttabprop").hide(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
            //    $("#chartareaprop").hide(); $("#chartlegendprop").show(); $("#seriescharttypeprop").hide(); $("#seriespropertiestab").hide();
            //    $("#seriescontentproperties").hide(); $("#drilldownproptab").hide();
            //    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;

            //    var chartlegendpropobj = selecteditem.get("legendproperties");;
            //    //  $("#legendbgcolor").val(chartlegendpropobj.PrimaryBackColor);
            //    // $("#clegendbgcolor").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.PrimaryBackColor });
            //    // $("#legendbg2color").val(chartlegendpropobj.SecondaryBackColor);
            //    // $("#clegendbg2color").find(".colorPicker-picker").css({ "background-color": chartlegendpropobj.SecondaryBackColor });
            //    $("#legendGradient").val(chartlegendpropobj.legendGradient);
            //    $("#lagendHatchingList").val(chartlegendpropobj.Hatching);
            //    // $("#chartlegendbrcolor").val(chartlegendpropobj.BorderColor);
            //    // $("#chartlegendbrwidth").val(chartlegendpropobj.BorderSize);
            //    // $("#legendbrstyle").val(chartlegendpropobj.BorderDashStyle);
            //    $("#legenddocking").val(chartlegendpropobj.legenddock);
            //    $("#lagendShadowOffsetList").val(chartlegendpropobj.ShadowOffset);
            //    $("#legendfontsize").val(chartlegendpropobj.LegendFontSize);
            //    $("#legendfontfamily").val(chartlegendpropobj.LegendFontStyle);
            //    if (chartlegendpropobj.showlegends == "true") {
            //        $("#showlegends").prop('checked', true);
            //    }
            //    else {
            //        $("#showlegends").prop('checked', false);
            //    }
            //}
            else if (sel == "Series_First") {
                $("#serverchartdatatab").show(); $("#serverchartproperiestab").hide();
                $("#charttabprop").hide(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
                $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriescontentproperties").hide(); $("#drilldownproptab").hide();
                $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
            }
            //else if (sel == "Drilldown") {
            //    $scope.selected = 4; $scope.selecteditem = "Drilldown"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
            //    $("#serverchartdatatab").hide(); $("#serverchartproperiestab").hide(); $("#seriespropertiestab").hide();
            //    $("#charttabprop").hide(); $("#xaxistabproperties").hide(); $("#yaxistabproperties").hide(); $("#charttitleprop").hide();
            //    $("#chartareaprop").hide(); $("#chartlegendprop").hide(); $("#seriescharttypeprop").hide(); $("#seriescontentproperties").hide();
            //    $("#drilldownproptab").show(); $("#drilldownpropertab").show();
            //    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;

            //    var drilldownObj = selecteditem.get("drilldown");
                
            //    $("#targetdsboardid").val(drilldownObj.DashboardId);
            //    $("#targetdsboard").val(drilldownObj.DashboardName);
            //    $("#reqparamlbl_chartx").val(drilldownObj.ChartXParameterName);
            //    $("#reqparamtext_chartx").val(drilldownObj.ChartXParameterName);
            //    $("#reqparamlbl_charty").val(drilldownObj.ChartYParameterName);
            //    $("#reqparamtext_charty").val(drilldownObj.ChartYParameterValue);             
            //}
            $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick(); $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick(); $scope.$apply();

        });

        //.....Selecting Treenode and thier functionalities ended..//


        //....get series connection details...........//
        $scope.getconnectiondetails = function (sid) {
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var arrdata = selecteditem.get("series");
            var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            $("#srseriesname").val(sinfo.name);
            //set selected  chart type
            var charttype = sinfo.charttype.toLowerCase();
            var piecolors = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];
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



                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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


                //pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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

                //pyramid
                $("#pyramidrotation").show();
                $("#pyramiddrawing").show();
                $("#pyramidpoint").show();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").hide();
                //pyramid

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

                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").show();
                $("#stackedtypes").hide();
                //pyramid

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
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

                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                $("#bubblestyle").hide();
                $("#stackedtypes").show();
                //pyramid

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
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
                //pyramid
                $("#pyramidrotation").hide();
                $("#pyramiddrawing").hide();
                $("#pyramidpoint").hide();
                $("#pyramidvaluetype").hide();
                //pyramid

                if (sinfo.series_color.length > 0) {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + sinfo.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                }
                else {
                    $("#srcolorpick").html(' <div style="float:left;width:30px"><input id="seriescolorpick" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                    $("#seriescolorpick").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                }
            }
            var $el = $(document.getElementById("server" + charttype.toLowerCase()));
            $(".ctype").find("i").remove(); $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
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


            //end of chart type

            var connectionid = sinfo.connectionid;
            //alert(connectionid);
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
        //....get series connection details ended...........//

        //....updateseriescolorevents...........//
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
        //....updateseriescolorevents ended...........//

        //....updatecolorevents...........//
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
        //....updatecolorevents ended...........//


        //...get title connection details...//
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
        //...get title connection details ended..//

        //...get x-axis details...//   
        $scope.getxaxisconnectiondetails = function (sid) {
            var sinfo = selecteditem.get("xaxis");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
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
        //...get x-axis details ended...// 

        //...get y-axis details...//   
        $scope.getyaxisconnectiondetails = function (sid) {
            var sinfo = selecteditem.get("yaxis");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
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
        //...get y-axis details ended...//  

        //..add new series to chart...//
        $("#addtotree").click(function () {
            bootbox.prompt("Enter ZAXIS Name", function (result) {
                if (result != null) {
                    if (result != "") {
                        var obj = selecteditem.get("series");
                        var seriesid = "ZAXIS_" + $scope.view.getID();
                        obj.push({ "id": seriesid, "name": "" + result + "", "charttype": "column", "series_color": [], "showvaluesonlabel": "true", "labelstyle": "Outside", "labeldatashow": "X-VALUES", "drawingstyle": "SoftEdge", "doughnutradius": "60", "chartcolumnstyle": "Cylinder", "labelplacement": "Right", "pyramiddrawingstyle": "CircularBase", "pyramidrotationangle": "0", "pyramidvaluetype": "Linear", "pyramidminpoint": "2", "pointwidth": "0.4", "srlinewidth": "1", "bubbleselstyle": "Circle", "stckedstyle": "true", "valuelabelangle": "0", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined" });
                        selecteditem.unset("series", { silent: true });
                        selecteditem.set({ "series": obj });
                        jQuery("#bitree").jstree(true).create_node($('#ZAXIS'), { text: "<span style=' color: #777;' class='series'>ZAXIS:</span><span style=' color: #777;' class='seriesname'>" + result + "</span>", id: seriesid }, 'last');
                        $(document.getElementById(seriesid)).find('a').first().click();
                    }
                }
            });

        });
        //..add new series to chart ended...//

        //clone object
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));
        $("#previewobject").css({ "height": "175px", "width": "96%", "display": "block" });
        $("#previewobject").children().css({ "height": "175px" });
        //..data selection...//
        $scope.changedatapoint = function (columnname, range) {
            if (columnname.indexOf("@") == -1)
                columnname = "[" + columnname + "]";
            //get table data when user selected
            var $el = $("#vf-formula-bar").find(".active");
            if ($el.length > 0) {
                if ($el.hasClass("insertion") == true) {
                    $('<li class="vf-node data active" data-range="' + range + '">' + columnname + '</li>').insertBefore($el);
                    $el.removeClass("active"); $scope.binddataclick();
                }
                else if ($el.hasClass("data") == true) { $el.html(columnname); $el.attr("data-range", range) }
                else if ($el.hasClass("function") == true) {
                    if ($ele.next().html() == ",")
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li>');
                    else
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                }
                else {
                    if ($("#vf-formula-bar").find(".active").next().html() == ")") {
                        $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                        $scope.argplaceholderclick(); $scope.binddataclick();
                    }
                }
            }
            else {
                $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../../temp/prompt.gif"></li></ul>');
                $scope.bindinsertop(); $scope.binddataclick();
            }
            //end of table clcik
            $scope.updatedbconnections(); $scope.$apply();
        };
        //..data selection ended...//

        //....updatedbconnections by adding datasources...........//
        $scope.updatedbconnections = function () {
            //get formula       
            selecteditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
            var formulatext = $.trim($("#vf-formula-bar").text());
            var formula_template = $.trim($("#vf-formula-bar").html());
            if ($scope.selecteditem == "ZAXIS") {
                var ref = $('#bitree').jstree(true); var sid = ref.get_selected(); var arrdata = selecteditem.get("series");
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
            else if ($scope.selecteditem == "XAXIS") {
                //selecteditem = biserverchart.byId(biserverchart, $scope.view.getSelected().controlid);
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
                selecteditem.set({ datatabs: $scope.datatabs });
                selecteditem.unset("xaxis", { silent: true });
                selecteditem.set({ "xaxis": series });
            }
            else if ($scope.selecteditem == "YAXIS") {
                //selecteditem = biserverchart.byId(biserverchart, $scope.view.getSelected().controlid);
                var series = selecteditem.get("yaxis");
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
                selecteditem.set({ datatabs: $scope.datatabs });
                selecteditem.unset("yaxis", { silent: true });
                selecteditem.set({ "yaxis": series });
            }
            else if ($scope.selecteditem == "Pivot") {
                var selecteditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
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
                var selecteditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
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
        //....updatedbconnections by adding datasources ended...........//

        //....updatechartproperties by choosing options...........//
        $scope.updatechartproperties = function () {
            //...............chart properties model updattion........................//
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
            //...............chart properties model updattion ends........................//


            //...............chart title properties model updattion ........................//
            var updatecharttitleprop = new Object();
            updatecharttitleprop.charttitle = $("#charttitle").val();
            updatecharttitleprop.charttitlecolor = $("#ctitlecolor").val();
            updatecharttitleprop.charttitlefontstyle = $("#ctitlestyle").val();
            updatecharttitleprop.charttitlefontsize = $("#ctitlefont").val();
            updatecharttitleprop.charttitledocking = $("#ctitledocking").val();
            updatecharttitleprop.titlePrefix = $("#ctitleprefix").val();
            updatecharttitleprop.titleSuffix = $("#ctitlesuffix").val();
            //...............chart title properties model updattion ends........................//


            //...............chart area properties model updattion ........................//
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
            //...............chart area properties model updattion ends........................//


            //...............chart legend properties model updattion ........................//
            var updatechartlegendprop = new Object();
            updatechartlegendprop.PrimaryBackColor = $("#legendbgcolor").val();
            updatechartlegendprop.SecondaryBackColor = $("#legendbg2color").val();
            updatechartlegendprop.legendGradient = $("#legendGradient").val();
            updatechartlegendprop.Hatching = $("#lagendHatchingList").val();
            // updatechartlegendprop.BorderColor = $("#chartlegendbrcolor").val();
            //updatechartlegendprop.BorderSize = $("#chartlegendbrwidth").val();
            // updatechartlegendprop.BorderDashStyle = $("#legendbrstyle").val();
            updatechartlegendprop.legenddock = $("#legenddocking").val();
            updatechartlegendprop.ShadowOffset = $("#lagendShadowOffsetList").val();
            updatechartlegendprop.LegendFontSize = $("#legendfontsize").val();
            updatechartlegendprop.LegendFontStyle = $("#legendfontfamily").val();
            if ($('#showlegends').prop('checked')) {
                updatechartlegendprop.showlegends = "true";
            } else {
                updatechartlegendprop.showlegends = "false";
            }
            //...............chart legend properties model updattion ends........................//


            //...............chart x-axis properties model updattion ........................//
            var updateXproperties = new Object();
            updateXproperties.xPrefix = $("#xchrtPrefix").val();
            updateXproperties.xSuffix = $("#xchrtSuffix").val();
            if ($('#xshowlabelticks').prop('checked')) {
                updateXproperties.xShowlabels = "true";
            } else {
                updateXproperties.xShowlabels = "false";
            }
            updateXproperties.xaxistitle = $("#chrtxaxistitle").val();

            updateXproperties.xtitlecolor = $("#xtitlecolor").val();
            updateXproperties.xtitlestyle = $("#xtitlestyle").val();
            updateXproperties.xtitlefontsize = $("#xtitlefont").val();

            updateXproperties.xname = $("#chrtxaxistitle").val();
            updateXproperties.xlblstyleangle = $("#xlblstyleangle").val();
            // var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            //  $("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span style=" color: #777;">X Axis:</span>' + $("#chrtxaxistitle").val() + '');


            updateXproperties.xlabeldrop = $("#xlbledrp").val();
            if ($("#xgridlines").prop('checked')) {
                updateXproperties.xshowgridlines = "true";
            } else {
                updateXproperties.xshowgridlines = "false";
            }
            if ($("#zTotals").prop('checked')) {
                updateXproperties.zTotals = "true";
            } else {
                updateXproperties.zTotals = "false";
            }
            if ($("#zAverages").prop('checked')) {
                updateXproperties.zAverages = "true";
            } else {
                updateXproperties.zAverages = "false";
            }
            $("#bitree").jstree('set_text', ['#XAXIS', $("#chrtxaxistitle").val()]);

            if ($('#xfmtas').val() == "Number") {
                $("#xfmtdecimaldiv").show();
            } else {
                $("#xfmtdecimaldiv").hide();
            }
            updateXproperties.xformatas = $('#xfmtas').val();
            updateXproperties.xdecimalval = $("#xdecimalvalue").val();
            //...............chart x-axis properties model updattion ends........................//


            //...............seriespropperties properties model updattion ........................// 
            var updateseriesproperties = new Object();
            if ($('#srshowlabels').prop('checked')) {
                updateseriesproperties.srShowLabels = "true";
            } else {
                updateseriesproperties.srShowLabels = "false";
            }

            if ($('#srformatas').val() == "Number") {
                $("#srdecimalplacediv").show();
            } else {
                $("#srdecimalplacediv").hide();
            }


            //...............seriespropperties properties model updattion ends........................//  


            //...............y-axis properties model updattion ........................// 
            var updateYproperties = new Object();
            updateYproperties.yPrefix = $("#ychrtPrefix").val();
            updateYproperties.ySuffix = $("#ychrtSuffix").val();
            if ($('#yshowlabelticks').prop('checked')) {
                updateYproperties.yShowlabels = "true";
            } else {
                updateYproperties.yShowlabels = "false";
            }
            updateYproperties.yaxistitle = $("#chrtyaxistitle").val();

            updateYproperties.ytitlecolor = $("#ytitlecolor").val();
            updateYproperties.ytitlestyle = $("#ytitlestyle").val();
            updateYproperties.ytitlefontsize = $("#ytitlefont").val();

            updateYproperties.yname = $("#chrtyaxistitle").val();
            updateYproperties.ylblstyleangle = $("#ylblstyleangle").val();
            // var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            //  $("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span style=" color: #777;">X Axis:</span>' + $("#chrtxaxistitle").val() + '');


            updateYproperties.ylabeldrop = $("#ylbledrp").val();
            if ($("#ygridlines").prop('checked')) {
                updateYproperties.yshowgridlines = "true";
            } else {
                updateYproperties.yshowgridlines = "false";
            }

            $("#bitree").jstree('set_text', ['#YAXIS', $("#chrtyaxistitle").val()]);

            if ($('#yfmtas').val() == "Number") {
                $("#yfmtdecimaldiv").show();
            } else {
                $("#yfmtdecimaldiv").hide();
            }
            updateYproperties.yformatas = $('#yfmtas').val();
            updateYproperties.ydecimalval = $("#ydecimalvalue").val();
            //...............y-axis properties model updattion ends........................//  

            selecteditem.set({ style: updatechartprop, titleproperties: updatecharttitleprop, areaproperties: updatechartareaprop, legendproperties: updatechartlegendprop, xaxisproperties: updateXproperties, seriespropperties: updateseriesproperties, yaxisproperties: updateYproperties });

        };
        //....updatechartproperties by choosing options ended...........//

        //....updatecharttypeprop by choosing options...........//
        $scope.updatecharttypeprop = function () {
            var arrdata = selecteditem.get("series");
            var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
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
        //....updatecharttypeprop by choosing options ended...........//

     
        //....GetDashboardlist by choosing options...........//
        $scope.GetDashboardlist = function (type) {
            $http.post('/Home/GetDashboard').success(function (data) {
                if (data.responsedashboards) {
                    fn_Make_Dashboards_DataTable(data.responsedashboards);
                    //$scope.DashboardList = JSON.parse(data.responsedashboards).NewDataSet["Table"];
                    if (type == "menu") {
                        var element = angular.element('#mymodalforalldashboards');
                        element.modal('show');
                    }
                }
                else if (data.error) {
                    alert(data.error);
                }
                else if (data.errorresult) {
                    alert(data.errorresult);
                }
            })
         .error(function (data) {
             $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
             $scope.loading = false;
         });
        };
        //....updatecharttypeprop by choosing options ende...........//

        //....fn_Make_Dashboards_DataTable view data...........//
        function fn_Make_Dashboards_DataTable(datasource) {
            var tbldata = JSON.parse(datasource);
            try {
                oTable = $('#tbl_dashboardsList').dataTable({
                    "bDestroy": true,
                    "bJQueryUI": true,
                    "bAutoWidth": false,
                    "sPaginationType": "full_numbers",
                    "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    'iDisplayLength': 15,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "oLanguage": {
                        "oPaginate": {
                            "sNext": '>',
                            "sLast": '>|',
                            "sFirst": '|<',
                            "sPrevious": '<'
                        },
                        "sSearch": "Filter",
                        //http://www.datatables.net/examples/basic_init/language.html Helpful Link
                        "sLengthMenu": "Template _MENU_",
                        "sZeroRecords": "No Template Found - Please Try Again.",
                        "sInfo": "Showing _START_ to _END_ of _TOTAL_ Template.",
                        "sInfoEmpty": "Showing 0 to 0 of 0 Template.",
                        "sInfoFiltered": "Result: Found from _MAX_ Template."
                    },
                    "bFilter": true,
                    "bInfo": true,
                    "aaData": tbldata.NewDataSet.Table,
                    "fnDrawCallback": function () {
                        update_editdashboard();
                    },
                    "aoColumns": [
                   // { "mDataProp": "Id" },
                   // { "mDataProp": "SPId" },
                    { "mDataProp": "Dashboard_name" },
                    { "mDataProp": "Description" },
                    { "mDataProp": "CreatedBy" },
                    {
                        "mDataProp": function (oObj) {
                            var d = ('<button class="borderless dashboardview1" title="View Selected widgets"  data-selectdashboard=\'' + JSON.stringify(oObj) + '\'><i class="fa fa-pencil-square-o"></i></button>');
                            return d;
                        }
                    }
                    ]

                });
                $('.DataTables_sort_icon').remove();
                $('.dataTables_length').remove();
                $(".ui-widget-header").css("background", "#2D89EF");
                $(".ui-widget-header").css("background", "#2D89EF");
            } catch (e) {
                alert(e);
            }
        }
        //....fn_Make_Dashboards_DataTable view data ended...........//

        //....update_editdashboard by choosing options...........//
        function update_editdashboard() {
            $(".dashboardview1").unbind("click");
            $(".dashboardview1").click(function () {
                var viewparameters = JSON.parse($(this).attr("data-selectdashboard"));
                $("#targetdsboardid").val(viewparameters.DsahboardId);
                $("#targetdsboard").val(viewparameters.Dashboard_name);
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop.DashboardId = viewparameters.DsahboardId;
                drilldownprop.DashboardName = viewparameters.Dashboard_name;
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                //alert(JSON.stringify(selecteditem.get("drilldown")));
                var element = angular.element('#mymodalforalldashboards');
                element.modal('hide');
            });
        }
        //....update_editdashboard by choosing options ended...........//

        //....gridclose function...........//
        $scope.gridclose = function () {
            var element = angular.element('#mymodalforalldashboards');
            element.modal('hide');
        };
        //....gridclose function ended...........//

        //....modalclose function for parameters config...........//
        $scope.modalclose = function () {
            var element = angular.element('#variableselection');
            element.modal('hide');
        };
        //....modalclose function for parameters config ended...........//

        //....Xchart_paramspopup function...........//
        $scope.Xchart_paramspopup = function (obj, $event) {
            var selectedaxis = $($event.target).parent().parent().attr("id");
            $("#hidedivid").val(selectedaxis);
            var drilldownprop = selecteditem.get("drilldown");
            if (drilldownprop.ChartXParameterName.indexOf("ref") == -1) {
                $('input:radio[id=custvar]').attr('checked', true);
                $("#dbdivval").hide();
                $("#dbdiv").hide();
                $("#custdiv").show();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#drpdwnsetval").val(drilldownprop.ChartXParameterValue);
                }
                else {
                    $("#drpdwnsetval").val(drilldownprop.ChartYParameterValue);
                }
            }
            else {
                $('input:radio[id=dbvar]').attr('checked', true);
                $("#dbdivval").show();
                $("#dbdiv").show();
                $("#custdiv").hide();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#dblblval").text(drilldownprop.ChartXParameterName);
                    $("#defaultval").val(drilldownprop.ChartXParameterValue);
                }
                else {
                    $("#dblblval").text(drilldownprop.ChartYParameterName);
                    $("#defaultval").val(drilldownprop.ChartYParameterValue);
                }
            }
            var element = angular.element('#variableselection');
            element.modal('show');

            $(".dropdwnchange").unbind("change");
            $(".dropdwnchange").change(function () {
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop.ChartXParameterName = $("#drpdwnsetval option:selected").text();
                drilldownprop.ChartXParameterValue = $("#drpdwnsetval").val();
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                $("#reqparamlbl_chartx").val($("#drpdwnsetval").val());
                $("#reqparamtext_chartx").val($("#drpdwnsetval option:selected").text());
                // alert(JSON.stringify(selecteditem.get("drilldown")));
            });
        };
        //....Xchart_paramspopup function ended...........//

        //....Ychart_paramspopup function...........//
        $scope.Ychart_paramspopup = function (obj, $event) {
            var radioprop = selecteditem.get("drilldown");
            var selectedaxis = $($event.target).parent().parent().attr("id");
            $("#hidedivid").val(selectedaxis);
            var drilldownprop = selecteditem.get("drilldown");
            if (drilldownprop.ChartYParameterName.indexOf("ref") == -1) {
                $('input:radio[id=custvar]').attr('checked', true);
                $("#dbdivval").hide();
                $("#dbdiv").hide();
                $("#custdiv").show();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#drpdwnsetval").val(drilldownprop.ChartXParameterValue);
                }
                else {
                    $("#drpdwnsetval").val(drilldownprop.ChartYParameterValue);
                }
            }
            else {
                $('input:radio[id=dbvar]').attr('checked', true);
                $("#dbdivval").show();
                $("#dbdiv").show();
                $("#custdiv").hide();
                if (selectedaxis == "ChartXParamsDiv") {
                    $("#dblblval").text(drilldownprop.ChartXParameterName);
                    $("#defaultval").val(drilldownprop.ChartXParameterValue);
                }
                else {
                    $("#dblblval").text(drilldownprop.ChartYParameterName);
                    $("#defaultval").val(drilldownprop.ChartYParameterValue);
                }
            }
            var element = angular.element('#variableselection');
            element.modal('show');


            $(".dropdwnchange").unbind("change");
            $(".dropdwnchange").change(function () {
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop.ChartYParameterName = $("#drpdwnsetval option:selected").text();
                drilldownprop.ChartYParameterValue = $("#drpdwnsetval").val();
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                $("#reqparamlbl_charty").val($("#drpdwnsetval").val());
                $("#reqparamtext_charty").val($("#drpdwnsetval option:selected").text());
                // alert(JSON.stringify(selecteditem.get("drilldown")));

            });

        };
        //....Ychart_paramspopup function ended...........//

        //....radioclick  operation for parameters config...........//
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
        //....radioclick  operation for parameters config ended...........//

        //....chartmodalclose function ended...........//
        $scope.chartmodalclose = function () {
            var element = angular.element('#VariableModal');
            element.modal('hide');
        };
        //....chartmodalclose function ended...........//

        //....yinterval by choosing options...........//
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
        //....yinterval by choosing options ended...........//
    });
}


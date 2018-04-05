
function envchart($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {   
    var Controlid = $scope.view.getID(); $scope.datatabs = []; $scope.formulaop = "Aggrigative"; $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new")//Creating new Control
    {
        bichart.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            chart: { "width": "96%", "height": "200px", "backcolor": "#ffffff", "borderradius": 2, "borderwidth": 0, "bordercolor": "#f79646", "ml": 70, "mr": 5, "mt": 40, "mb": 30, "is3d": false, "aplpha": 45, "beta": 0, "depth": 35 },
            title: { "title": "", "subtitle": "", "color": "#5290E9", "subcolor": "#C0504D", "fontsize": "13", "fontstyle": "bold", "showtitle": true, "align": "center", "x": 0, "y": 0, "Prefix": "", "Suffix": "", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" },
            xaxis: { "id": "jsxaxis", "title": "Untitled", "showtitle": false, "rotation": 0, "format": "Text", "Prefix": "", "Suffix": "", "showaxisline": true, "showxaxis": true, "labeldrop": 1, "sort": "Dont Sort", "gridlines": false, "labeltickmarks": true, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" },
            yaxis: { "title": "Untitled", "showtitle": false, "format": "Text", "Decimals": 0, "Prefix": "", "Suffix": "", "gridlines": true, "showlabels": true, "labeltickmarks": true },
            series: [{ "id": "Series_" + $scope.view.getID() + "", "name": "Untitled", "charttype": "column", "series_color": [], "showvaluesonlabel": false, "valueangle": 0, "valueleft": 0, "valuetop": 0, "valuecolor": "#000000", "pieinnersize": 0, "piesize": 70, "maxslice": 10, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" }],
            seriescomman: { "stacked": false },           
            refresh: "",
            datatabs: [],
            target: target,
            type: type
        }]);       
        selecteditem = bichart.byId(bichart, Controlid);
        
    }
    else {       
        selecteditem = bichart.byId(bichart, $scope.view.getSelected().controlid);       
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }

    $http.get('../Bi360Templates/Tabs/jscharttabs.html').success(function (t) {
        $("#Tabsobject").html($compile(t)($scope));      
        $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
        $scope.LoadVariable(); $scope.modal.variablestatus = true;
        $("#addtotree").remove();
        $("<a style='font-weight:bold;text-align:right;margin-left: 112px;' id='addtotree'>+Add Series</a>").insertBefore("#treeid");
        $(".changeyproperties").unbind('change');
        $(".changetitleprop").unbind('change');
        $(".changexproperties").unbind('change');
        $(".jspiechartchange").unbind('change');
        $(".changeyproperties").change(function () {
            var $slectedctrl = $(this);
            $("#jsyaxisformat").val() == "Number" ? $("#ydecimals").show() : $("#ydecimals").hide();
            var yaxisobj = selecteditem.get("yaxis");
            yaxisobj.showtitle = $("#jsyaxisshowtitle").is(':checked') ? true : false;
            yaxisobj.title = $("#jsyaxistitle").val();
            yaxisobj.format = $("#jsyaxisformat").val();
            yaxisobj.Decimals = $("#jsyaxisdecimal").val();
            yaxisobj.Prefix = $("#jsyaxisprefix").val();
            yaxisobj.Suffix = $("#jsyaxissuffix").val();
            yaxisobj.showlabels = $("#jsyaxixlabels").is(':checked') ? true : false;
            yaxisobj.gridlines = $("#jsyaxisgridline").is(':checked') ? true : false;
            selecteditem.unset("yaxis", { silent: true });
            selecteditem.set({ "yaxis": yaxisobj });
        });
        //series options
        $(".jsserieschange").change(function () {
            serieschange();
        });
        //title properties
        $(".changetitleprop").change(function () {
            titlechange();
        });
        //x-axis
        $(".changexproperties").change(function () {
            var $slectedctrl = $(this);
            var xaxisobj = selecteditem.get("xaxis");
            xaxisobj.showtitle = $("#jsxaxisshowtitle").is(':checked') ? true : false;
            xaxisobj.title = $("#jsxaxistitle").val();
            xaxisobj.format = $("#jsxaxisformat").val();
            xaxisobj.Prefix = $("#jsxaxisPrefix").val();
            xaxisobj.Suffix = $("#jsxaxissuffix").val();
            xaxisobj.rotation = parseInt($("#jsxaxisrotation").val());
            xaxisobj.showaxisline = $("#jsxaxisaxisline").is(':checked') ? true : false;
            xaxisobj.showxaxis = $("#jsxaxislabelticks").is(':checked') ? true : false;
            xaxisobj.labeldrop = parseInt($("#jsxaxisdroplabels").val());
            xaxisobj.sort = $("#jsxaxissort").val();
            xaxisobj.gridlines = $("#jsxaxisgridlines").is(':checked') ? true : false;
            xaxisobj.labeltickmarks = $("#jsxaxismarksshow").is(':checked') ? true : false;
            selecteditem.unset("xaxis", { silent: true });
            selecteditem.set({ "xaxis": xaxisobj });
        });
        //piechart change
        $(".jspiechartchange").change(function () {
            var selecteditem = bichart.byId(bichart, $("#settingsmenu").attr("data-controlid"));
            var arrdata = selecteditem.get("series"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            arrdata[indexselected].pieinnersize = $("#jspieinnersize").val();
            arrdata[indexselected].piesize = $("#jspiesize").val();
            arrdata[indexselected].maxslice = parseInt($("#jspiemaxslices").val());
            selecteditem.unset("series", { silent: true });
            selecteditem.set({ "series": arrdata });
        });
        //chart change 
        $(".chartchange").change(function () {
            chartchange();
        });
       
        //tree data
        var data = [
                   { "id": "Chart", "parent": "#", "text": "Chart", 'state': { 'opened': true, 'selected': true } },
                   { "id": "Title", "parent": "Chart", "text": "Chart Title" },
                    { "id": "TitleFormula", "parent": "Title", "text": "Title Formula" },                 
                     { "id": "Series", "parent": "Chart", "text": "Series", 'state': { 'opened': true } },
                           { "id": "XAXIS_" + $scope.view.getID() + "", "parent": "Series", "text": "<span style=' color: #777;'>X Axis:</span>Untitled" },
                            { "id": "YAXIS_" + $scope.view.getID() + "", "parent": "Series", "text": "<span style=' color: #777;'>Y Axis:</span>Untitled" }
        ];

        //construct tree by using jquery plugun..
        $('#bitree').jstree("destroy");
        $('#bitree').bind('loaded.jstree', function (e, data) {
          
           //series cretaion
            var arrdata = selecteditem.get("series");
            for (var i = 0; i < arrdata.length; i++)
                jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span>" + arrdata[i].name, id: arrdata[i].id }, 'last');
           
            $('#cpseries').colorpicker({ showOn: 'button' });
            //chart properties init
            $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
            var chart = selecteditem.get("chart");
            $("#chart3d").prop("checked", chart.is3d);
            $("#chartwidth").val(chart.width);
            $("#charatheight").val(chart.height);
            $("#chartbackground").val(chart.backcolor);
            $("#borderradius").val(chart.borderradius);
            $("#chartborderwidth").val(chart.borderwidth);
            $("#chartbrdrcolor").val(chart.bordercolor);
            $("#chartborderwidth").val(chart.borderwidth);
            $("#chrtalpha").val(chart.aplpha);
            $("#chartbeta").val(chart.beta);
            $("#chartdepth").val(chart.depth);
            $("#chartmarginsleft").val(chart.ml);
            $("#chartmarginsright").val(chart.mr);
            $("#chartmarginstop").val(chart.mt);
            $("#chartmarginsbottom").val(chart.mb);
            $("#chartbackground,#chartbrdrcolor").unbind("change.color");
            $("#chartbackground").colorpicker("val", chart.backcolor);
            $("#chartbrdrcolor").colorpicker("val", chart.bordercolor);
            $("#chartbackground,#chartbrdrcolor").on("change.color", function (event, color) {
                chartchange();
            });
            selecteditem.unset("refresh", { silent: true });
            selecteditem.set({ "refresh": "refresh" });
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

        $("#bitree").bind(
        "select_node.jstree", function (evt, data) {
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            _parentid = $("#" + sel + "").find('span').hasClass("series");
            _slength = $("#bitree").find(".series").length; $(".imgvalidate").remove();
            if (sel.toString().indexOf("_") != -1) {
                var slectedctrl = new String(); slectedctrl = sel.toString(); slectedctrl = slectedctrl.split("_")[0];
                if (_parentid) {
                    if (_slength > 1) {
                        $el = $("#" + sel + "").find('a').first();
                        $("<a  class='imgvalidate' style='color:red' title='Remove Selected Series'>X</a>").insertAfter($el);
                    }
                    $scope.selected = 1; $scope.selecteditem = "Series"; $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                    $("#yprop").hide(); $("#chartprop").hide(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#dataprop").show();
                    $("#yaxixprop").hide(); $("#chartaxixprop").hide(); $("#seriesprop").hide(); $("#serieslink").show(); $("#seriescontent").hide(); $(".titleprop").hide();
                    $(".imgvalidate").click(function () {
                        var arrdata = selecteditem.get("series");
                        _.find(arrdata, function (rw, index) {
                            if (rw.id == sel) {
                                arrdata.splice(index, 1); selecteditem.unset("series", { silent: true }); selecteditem.set({ "series": arrdata });
                            }
                            return rw.id == sel
                        });
                        ref.delete_node([sel]); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                        $scope.selected = 2; $scope.selecteditem = "Chart"; $("#bitree").jstree("select_node", "#Chart").trigger("select_node.jstree");
                    });
                    $scope.getconnectiondetails(sel.toString());
                    $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                }
                else if (slectedctrl == "XAXIS") {
                    $scope.selecteditem = "XAXIS";
                    $scope.getxaxisconnectiondetails(sel.toString());
                    $("#yprop").hide(); $("#chartprop").hide(); $("#sprop").hide(); $("#xaxixprop").show(); $("#xprop").show(); $("#dataprop").show(); $("#serieslink").hide(); $("#seriescontent").hide();
                    $("#yaxixprop").hide(); $("#chartaxixprop").hide(); $("#seriesprop").hide(); $("#VFormula-menu").show(); $("#vf-formula-bar").show(); $(".titleprop").hide();
                    $scope.selected = 1; $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.modal.variablestatus = true;
                    var xaxisobj = selecteditem.get("xaxis");
                    $("#jsxaxisshowtitle").prop("checked", xaxisobj.showtitle);
                    $("#jsxaxistitle").val(xaxisobj.title);
                    $("#jsxaxisrotation").val(xaxisobj.rotation);
                    $("#jsxaxisformat").val(xaxisobj.format);
                    $("#jsxaxisPrefix").val(xaxisobj.Prefix);
                    $("#jsxaxissuffix").val(xaxisobj.Suffix);
                    $("#jsxaxisaxisline").prop("checked", xaxisobj.showaxisline);
                    $("#jsxaxislabelticks").prop("checked", xaxisobj.showxaxis);
                    $("#jsxaxisdroplabels").val(xaxisobj.labeldrop);
                    $("#jsxaxissort").val(xaxisobj.sort);
                    $("#jsxaxisgridlines").prop("checked", xaxisobj.gridlines);
                    $("#jsxaxismarksshow").prop("checked", xaxisobj.labeltickmarks);

                }
                else if (slectedctrl == "YAXIS") {
                    $scope.selected = 5; $("#dataprop").hide(); $scope.modal.tablestatus = false; $scope.modal.variablestatus = true; $scope.modal.strnumstatus = true;
                    $("#yprop").show(); $("#chartprop").hide(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#serieslink").hide(); $("#seriescontent").hide();
                    $("#yaxixprop").show(); $("#chartaxixprop").hide(); $("#seriesprop").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $(".titleprop").hide();
                    //get y axis properties                  
                    var yaxisobj = selecteditem.get("yaxis");
                    $("#jsyaxistitle").val(yaxisobj.title);
                    $("#jsyaxisformat").val(yaxisobj.format);
                    $("#jsyaxisdecimal").val(yaxisobj.Decimals);
                    $("#jsyaxisprefix").val(yaxisobj.Prefix);
                    $("#jsyaxissuffix").val(yaxisobj.Suffix);
                    $("#jsyaxixlabels").prop("checked", yaxisobj.showlabels);
                    $("#jsyaxisgridline").prop("checked", yaxisobj.gridlines);
                    $("#jsyaxisshowtitle").prop("checked", yaxisobj.showtitle);
                    $("#jsyaxisformat").val() == "Number" ? $("#ydecimals").show() : $("#ydecimals").hide();
                }
            }
            else if (sel == "Chart") {
                $scope.selected = 2; $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $("#dataprop").hide(); $(".titleprop").hide();
                $("#yprop").hide(); $("#chartprop").show(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#serieslink").hide(); $("#seriescontent").hide();
                $("#yaxixprop").hide(); $("#chartaxixprop").show(); $("#seriesprop").hide(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();                
            }
            else if (sel == "Title") {
                var title = selecteditem.get("title");
                $("#jsshowtitle").prop("checked", title.showtitle);
                $("#jstitletext").val(title.title);
                $("#titleprefix").val(title.Prefix);
                $("#titlesufix").val(title.Suffix);
                $("#titlesubtext").val(title.subtitle);
                $("#titlesubcolor").unbind("change.color");
                $("#titlecolor").unbind("change.color");
                $("#titlecolor").colorpicker("val", title.color);
                $("#titlesubcolor").colorpicker("val", title.subcolor);
                $("#titlecolor").on("change.color", function (event, color) {
                    titlechange();
                });
                $("#titlesubcolor").on("change.color", function (event, color) {
                    titlechange();
                });
                $scope.selected = 7; $scope.modal.tablestatus = false;
                $("#dataprop").hide(); $("#yprop").hide(); $("#chartprop").hide(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#serieslink").hide(); $("#seriescontent").hide();
                $("#yaxixprop").hide(); $("#chartaxixprop").hide(); $("#seriesprop").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $(".titleprop").show();
            }
            else if (sel == "TitleFormula") {
                $("#dataprop").show(); $("#yprop").hide(); $("#chartprop").hide(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#serieslink").hide(); $("#seriescontent").hide();
                $("#yaxixprop").hide(); $("#chartaxixprop").hide(); $("#seriesprop").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $(".titleprop").hide();
                $("#VFormula-menu").show(); $("#vf-formula-bar").show(); $scope.gettitleconnectiondetails(sel.toString());
                $scope.selected = 1; $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true;  $scope.modal.variablestatus = true;
                $scope.selecteditem = "TitleFormula";
            }
            else if (sel == "Series") {
                $("#jsstacked").unbind("click");
                $("#jsstacked").on("click", function (e) {
                    var sdata = false;
                    if ($(this).is(':checked')) sdata = true;
                    else sdata = false;
                    var arrdata = selecteditem.get("seriescomman"); arrdata.stacked = sdata;
                    selecteditem.unset("seriescomman", { silent: true });
                    selecteditem.set({ "seriescomman": arrdata });
                });
                $("#jsstacked").prop("checked", selecteditem.get("seriescomman").stacked);
                $scope.selected = 3;
                $("#yprop").hide(); $("#chartprop").hide(); $("#sprop").show(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#dataprop").hide();
                $("#yaxixprop").hide(); $("#chartaxixprop").hide(); $("#seriesprop").show(); $("#serieslink").hide(); $("#seriescontent").hide(); $(".titleprop").hide();

            }

            $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick(); $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick(); $scope.$apply();

        });
        $scope.updatexstatus = function (sitem) {
            if (sitem == 1) {
                $scope.selected = 1; $("#VFormula-menu").show(); $("#vf-formula-bar").show(); $("#seriescontent").hide();
            }
            if (sitem == 6) {
                $scope.selected = 6; $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $("#seriescontent").show(); $("#literal-menu").hide();

            }
            else if (sitem == 4) {
                $scope.selected = 4; $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $("#seriescontent").hide();
            }
        }
        //get series connection details
        $scope.getconnectiondetails = function (sid) {
            var arrdata = selecteditem.get("series");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var indexselected;
            var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
            $("#jsseriesname").val(sinfo.name);
            $("#jsseriestopcolor").unbind("change.color");
            $("#jsseriestopcolor").colorpicker("val", sinfo.valuecolor);
            $("#jsseriestopcolor").on("change.color", function (event, color) {
                serieschange();
            });
            $("#jsseriesleft").val(sinfo.valueleft);
            $("#jsseriestop").val(sinfo.valuetop);
            $("#jsseriestopval").val(sinfo.valueangle);
            $("#jspieinnersize").val(sinfo.pieinnersize);
            $("#jspiesize").val(sinfo.piesize);
            $("#jspiemaxslices").val(sinfo.maxslice);
            //update selected chart
            var charttype = sinfo.charttype;
            var $el = $(document.getElementById("js" + charttype));
            $(".ctype").find("i").remove(); $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
            $(".ctype").find("span").removeClass("spanselected").css({ "color": "black" });
            $el.find("span").append('<i class="fa fa-check-square fa-2" ></i>').attr("class", "spanselected").css("color", "tomato");
            $('#jssvales').prop('checked', sinfo.showvaluesonlabel);
            $el.css({ "border": "thin solid #91adc2", "background-color": "snow" });
            $scope.updatecharttype();
            var connectionid = sinfo.connectionid;
            if (connectionid != "underfined") {
                var connectionobject = new Array();
                connectionobject.push({
                    "DSConnType": sinfo.connectiontype,
                    "ConnectionID": sinfo.connectionid,
                    "DSId":sinfo.DSId,
                    "DSName": sinfo.DSName,
                    "DSCnnCretedby": sinfo.DSCnnCretedby
                });
                var selection = angular.element('#' + sinfo.selectedid + '');
                $scope.getdata(connectionobject, selection);
                $("#vf-formula-bar").html(sinfo.formula_template);
            }
        }
        //get x-axis details   
        $scope.getxaxisconnectiondetails = function (sid) {
            var sinfo = selecteditem.get("xaxis");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var connectionid = sinfo.connectionid;
            if (connectionid != "underfined") {
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
        //get title connection details
        $scope.gettitleconnectiondetails = function (sid) {
            var title = selecteditem.get("title");
            $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            var connectionid = title.connectionid;
            if (connectionid != "underfined") {
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
        //add new series to chart...
        $("#addtotree").click(function () {
            bootbox.prompt("Enter Series Name", function (result) {
                if (result != null) {
                    if (result != "") {
                        var obj = selecteditem.get("series");
                        var seriesid = "Series_" + $scope.view.getID();
                        obj.push({ "id": seriesid, "name": "" + result + "", "charttype": "" + obj[0].charttype + "", "series_color": [], "showvaluesonlabel": false, "valueangle": 0, "valuecolor": "#000000", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" });
                        selecteditem.unset("series", { silent: true });
                        selecteditem.set({ "series": obj });
                        jQuery("#bitree").jstree(true).create_node($('#Series'), { text: "<span style=' color: #777;' class='series'>Series:</span>" + result, id: seriesid }, 'last');
                        //$("#bitree").jstree("select_node", "#" + seriesid).trigger("select_node.jstree");
                        $(document.getElementById(seriesid)).find('a').first().click();
                    }
                }
            });

        });
        //data selection
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
            $scope.updatedbconnections();
        };
        $scope.updatedbconnections = function () {
            //get formula
            var formulatext = $.trim($("#vf-formula-bar").text());
            var formula_template = $.trim($("#vf-formula-bar").html());
            if ($scope.selecteditem == "Series") {
                var ref = $('#bitree').jstree(true); var sid = ref.get_selected(); var arrdata = selecteditem.get("series");
                var series = _.find(arrdata, function (rw, index) { return rw.id == sid; });
                var connectionid = series.connectionid;
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                series.selectedid = selecteddatatab;
                series.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                series.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                series.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                series.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                series.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                series.formula = formulatext;

                if (series.charttype != "pie") {
                    var carray = [$("#cpseries").colorpicker("val")];
                    series.series_color = carray;
                }
                series.formula_template = formula_template;
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
                var series = selecteditem.get("xaxis");
                var connectionid = series.connectionid;
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                series.selectedid = selecteddatatab;
                series.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                series.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                series.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                series.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                series.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                series.formula = formulatext;
                series.formula_template = formula_template;
                selecteditem.unset("xaxis", { silent: true });
                selecteditem.set({ "xaxis": series });
            }
            else if ($scope.selecteditem == "TitleFormula") {
                var title = selecteditem.get("title");
                var connectionid = title.connectionid;
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                title.selectedid = selecteddatatab;
                title.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                title.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                title.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                title.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                title.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
                title.formula = formulatext;
                title.formula_template = formula_template;
                selecteditem.unset("title", { silent: true });
                selecteditem.set({ "title": title });
            }

            //$scope.$apply();
        };
        $(document.getElementById("Chart")).find('a').first().click();
        //update color change events
        $scope.updateseriescolorevent = function () {
            $("#cpseries").on("change.color", function (event, color) {
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
        }
        $scope.updatecolorevents = function () {
            $(".cpButton").on("change.color", function (event, color) {
                var colorarry = [];
                $(".cpButton").each(function (i, val) {
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
        }
        //update chart type change event
        $scope.updatecharttype = function () {
            try {
                var arrdata = selecteditem.get("series");
                var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                var indexselected;
                var series = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                var piecolors = ["#5290E9", "#71B37C", "#EC932F", "#E14D57", "#965994", "#9D7952", "#CC527B", "#33867F", "#ADA434", "#CEE237", "#FFF470", "#DFD6C9", "#E9A0E7", "#1F497D", "#4E97BC"];

                if (series.charttype == "pie") {
                    $('.cpButton').colorpicker("destroy");
                    $('#colorscheme').empty();
                    var colorsstr = "";
                    if (series.series_color.length > 2)
                        piecolors = series.series_color;
                    $.each(piecolors, function (index, value) {
                        colorsstr += '<div style="float:left;width:30px"><input class="cpButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                    });
                    $("#colorscheme").html(colorsstr);
                    $('.cpButton').colorpicker({ showOn: 'button' });
                    $scope.updatecolorevents();
                    $(".piechartprop").show();
                    $(".seriescolorpalate").hide();
                }
                else {
                    $('#cpseries').colorpicker("destroy");
                    if (series.series_color.length > 0) {
                        $("#scolorpick").html(' <div style="float:left;width:30px"><input id="cpseries" value="' + series.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                        $("#cpseries").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                    }
                    else {
                        $("#scolorpick").html(' <div style="float:left;width:30px"><input id="cpseries" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                        $("#cpseries").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();

                    }
                    $("#cpseries").parent().width(30);
                    $(".piechartprop").hide();
                    $(".seriescolorpalate").show();

                }
                $(".ctype").unbind("click");
                $(".ctype").click(function () {
                    $(".ctype").find("i").remove(); $el = $(this); $(".ctype").css({ "border": "medium none", "background-color": "transparent" });
                    var charttype = $.trim($el.text()); $(".ctype").find("span").removeClass("spanselected").css({ "color": "black" });
                    $el.find("span").append('<i class="fa fa-check-square fa-2" ></i>').attr("class", "spanselected").css("color", "tomato");
                    $el.css({ "border": "thin solid #91adc2", "background-color": "snow" });

                    if (charttype.toLowerCase() == "pie") {
                        $('.cpButton').colorpicker("destroy");
                        $('#colorscheme').empty();
                        var colorsstr = "";
                        $.each(piecolors, function (index, value) {
                            colorsstr += '<div style="float:left;width:30px"><input class="cpButton" value="' + value + '" style="display:none" /> <span style="width:4px;"></span></div>'
                        });
                        $("#colorscheme").html(colorsstr);
                        $('.cpButton').colorpicker({ showOn: 'button' });
                        $(".cpButton").parent().width(30);
                        $scope.updatecolorevents();
                        $(".piechartprop").show();
                        $(".seriescolorpalate").hide();
                        series.series_color = piecolors;
                    }
                    else {
                        // $('#cpseries').colorpicker("destroy");                       
                        if (series.series_color.length > 0) {
                            $("#scolorpick").html(' <div style="float:left;width:30px"><input id="cpseries" value="' + series.series_color[0] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                            $("#cpseries").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();
                        }
                        else {
                            $("#scolorpick").html(' <div style="float:left;width:30px"><input id="cpseries" value="' + piecolors[indexselected] + '" style="display:none" /> <span style="width:4px;"></span></div>')
                            $("#cpseries").colorpicker({ showOn: 'button' }); $scope.updateseriescolorevent();

                        }
                        $("#cpseries").parent().width(30);
                        $(".piechartprop").hide();
                        $(".seriescolorpalate").show();

                    }
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
            }
            catch (er) {
                alert(er);
            }
        }
        // var element = angular.element('#highcharttypes');
        //element.modal('show');
        //showing popup..
        var element = angular.element('#bidsahboardconfig');
        element.modal('show'); $("#previewobject").empty();
        $scope.selected = 2; $scope.selecteditem = "Chart"; $("#VFormula-menu").hide(); $("#vf-formula-bar").hide(); $scope.modal.strnumstatus = true; $scope.modal.expressionstatus = true;
        $("#dataprop").hide(); $("#yprop").hide(); $("#chartprop").show(); $("#sprop").hide(); $("#xaxixprop").hide(); $("#xprop").hide(); $("#yaxixprop").hide(); $("#chartaxixprop").show(); $("#seriesprop").hide();
        $("#serieslink").hide(); $("#seriescontent").hide(); $(".titleprop").hide();
        // $scope.$apply();
    });


}
//title change function
function titlechange() {
    var selecteditem = bichart.byId(bichart, $("#settingsmenu").attr("data-controlid"));
    var title = selecteditem.get("title");
    title.showtitle = $("#jsshowtitle").is(':checked') ? true : false;
    title.title = $("#jstitletext").val();
    title.Prefix = $("#titleprefix").val();
    title.Suffix = $("#titlesufix").val();
    title.subtitle = $("#titlesubtext").val();
    title.color = $("#titlecolor").val();
    title.subcolor = $("#titlesubcolor").val();
    selecteditem.unset("title", { silent: true });
    selecteditem.set({ "title": title });
}
//series values change function
function serieschange() {
    var selecteditem = bichart.byId(bichart, $("#settingsmenu").attr("data-controlid"));
    var sdata = false;
    if ($("#jssvales").is(':checked')) sdata = true;
    else sdata = false;
    var sname = $("#jsseriesname").val();
    var arrdata = selecteditem.get("series"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
    var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
    arrdata[indexselected].showvaluesonlabel = sdata; arrdata[indexselected].name = sname;
    arrdata[indexselected].valueangle = parseInt($("#jsseriestopval").val());
    arrdata[indexselected].valueleft = parseInt($("#jsseriesleft").val());
    arrdata[indexselected].valuetop = parseInt($("#jsseriestop").val());
    arrdata[indexselected].valuecolor = $("#jsseriestopcolor").val();
    selecteditem.unset("series", { silent: true });
    selecteditem.set({ "series": arrdata });
    $("#" + sid.toString() + "").find('a').html('<i class="jstree-icon jstree-themeicon glyphicon glyphicon-flash jstree-themeicon-custom"></i><span class="series" style=" color: #777;">Series:</span>' + sname + '');
}
//chart change function
//title change function
function chartchange() {
    var selecteditem = bichart.byId(bichart, $("#settingsmenu").attr("data-controlid"));
    var chart = selecteditem.get("chart");
    chart.is3d = $("#chart3d").is(':checked') ? true : false;
    chart.width = $("#chartwidth").val();
    chart.height = $("#charatheight").val();
    chart.backcolor = $("#chartbackground").val();
    chart.borderradius =parseInt($("#borderradius").val());
    chart.bordercolor = $("#chartbrdrcolor").val();
    chart.borderwidth =parseInt($("#chartborderwidth").val());
    chart.aplpha = $("#chartalpha").val();
    chart.beta = $("#chartbeta").val();
    chart.depth = $("#chartdepth").val();
    chart.ml = parseInt($("#chartmarginsleft").val());
    chart.mr = parseInt($("#chartmarginsright").val());
    chart.mt = parseInt($("#chartmarginstop").val());
    chart.mb = parseInt($("#chartmarginsbottom").val());
    selecteditem.unset("chart", { silent: true });
    selecteditem.set({ "chart": chart });
}
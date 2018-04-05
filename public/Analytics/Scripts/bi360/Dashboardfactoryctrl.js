RapidApp.controller('DashboardfactoryCtrl', function ($scope, DashboardsizeService, $location, $http, $templateCache, $compile) {
    $scope.selected = 'tile'; $scope.gridparameters = [];
    $scope.modal = { tablestatus: true, expressionstatus: true, strnumstatus: true, variablestatus: true }
    try {
        //SlidePanel();        
        init();

        if (typeof DashboardsizeService.getItem(0) == "undefined") {
            var ds = JSON.parse(localStorage.getItem("DataRestore"));
            $("#Dashboard").width(ds.width); $("#Dashboard").attr("data-width", ds.width)
            $("#Dashboard").height(ds.height);
            $("#widgetstore").height(ds.height);

            $scope.templatesettings = { HeaderTitle: "Dashboard Factory" + " - " + ds.dashboardname };
            $scope.dashboardsettings = { name: ds.dashboardname, desc: ds.dashboarddesc, width: ds.width, height: ds.height, dashboardid: "new" };
        }
        else {
            var ds = DashboardsizeService.getItem(0);
            localStorage.removeItem("DataRestore");
            localStorage.setItem("DataRestore", JSON.stringify(ds));
            $("#Dashboard").width(ds.width); $("#Dashboard").attr("data-width", ds.width)
            $("#Dashboard").height(ds.height);
            $("#widgetstore").height(ds.height);
            $scope.templatesettings = { HeaderTitle: "Dashboard Factory" + " - " + ds.dashboardname };
            $scope.dashboardsettings = { name: ds.dashboardname, desc: ds.dashboarddesc, width: ds.width, height: ds.height, dashboardid: "new" };
        }
        $scope.Dashboard = [];
        $scope.formula = [];
        $scope.view = {
            getID: function () {
                function _p8(s) {
                    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                }
                return _p8() + _p8(true) + _p8(true) + _p8();
            },
            getSelected: function () {
                $scope.selectedcontrol = { controlid: $("#settingsmenu").attr("data-controlid"), controltype: $("#settingsmenu").attr("data-controltype") };
                return $scope.selectedcontrol;
            }
        };
        // adding layout grid
        function getURLParameter(name) {
            return decodeURIComponent(
            (location.search.match(RegExp("[?|&]" + name + '=(.+?)(&|$)')) || [, null])[1]);
        }
        var id = getURLParameter("id");
        var dashboardid = id;

        if (dashboardid == '' || dashboardid.trim() == "null" || dashboardid.trim() == "undefined") {
        }
        else {
            $.ajax({
                url: "../../home/getdashboardbyid",
                method: 'post',
                async: false,
                cache: false,
                data: { dashboardid: dashboardid }
            }).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                else {
                    $(".widget-body").sortable({});
                    var dashboardconfig = JSON.parse(data.dashboardconfig);
                    $scope.dashboardsettings = { name: data.Dashboard_name, desc: data.Description, width: dashboardconfig[0].parentwidth, height: dashboardconfig[0].parentheight, dashboardid: data.DsahboardId };
                    $scope.templatesettings = { HeaderTitle: "Dashboard Factory" + " - " + data.Dashboard_name };
                    $("#widgetstore").empty(); $("#Dashboard").width(dashboardconfig[0].parentwidth); $("#Dashboard").attr("data-width", dashboardconfig[0].parentwidth);
                    $("#Dashboard,#widgetstore").height(dashboardconfig[0].parentheight);
                    for (var i = 0; i < dashboardconfig.length; i++) {
                        var config = dashboardconfig[i];
                        createwidget(config.Id, config.width, config.Name);
                        for (var bi = 0; bi < config.bicontrols.length; bi++) {
                            var bimodel = config.bicontrols[bi];
                            var ctrltype = bimodel.type;
                            switch (ctrltype) {
                                case "jqplot-target":
                                    bichart.add([bimodel.model]);
                                    break;
                                case "tablescope":
                                    table.add([bimodel.model]);
                                    break;
                                case "bi-label":
                                    text.add([bimodel.model]);
                                    break;
                                case "bi-textbox":
                                    textbox.add([bimodel.model]);
                                    break;
                                case "bi-dropdown":
                                    dropdown.add([bimodel.model]);
                                    break;
                                case "bi-valuepair":
                                    valuepair.add([bimodel.model]);
                                    break;
                                case "bi-d3chart":
                                    bid3chart.add([bimodel.model]);
                                    break;
                                case "bi-serverchart":
                                    biserverchart.add([bimodel.model]);
                                    break;
                                case "bi-javascriptchart":
                                    bijavascriptchart.add([bimodel.model]);
                                    break;
                                case "bi-image":
                                    image.add([bimodel.model]);
                                    break;
                                case "bi-Radio":
                                    radio.add([bimodel.model]);
                                    break;
                                case "bi-Gagetemplate":
                                    Gagetag.add([bimodel.model]);
                                    break;
                                case "bi-MeterGagetemplate":
                                    metergauge.add([bimodel.model]);
                                    break;
                                case "bi-progressbar":
                                    Progressbar.add([bimodel.model]);
                                    break;
                                case "bi-htmltemplate":
                                    htmltag.add([bimodel.model]);
                                    break;
                                case "comp cx-panel_grid":
                                    layoutgrid.add([bimodel.model]);
                                    updategridcells($scope, $location, $http, $compile, "", "", "layoutgrid", bimodel.model.id, layoutgrid.byId(layoutgrid, bimodel.model.id))
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    haslayout();
                    var element = angular.element('#ExistingDashboardsModal');
                    element.modal('hide');
                }
            });
        }

        $scope.controlsettings = function () {
            switch ($scope.view.getSelected().controltype) {
                //chart logic goes here..........
                case "DashboardChart":
                    envdashboardchart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "chart":
                    envchart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //table logic goes here..................
                case "table":
                    envtable($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "pivottable":
                    envpivottable($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //text logic goes here..................
                case "text":
                    envText($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //text box logic goes here..................
                case "textbox":
                    envtxtbox($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //valuepair logic goes here..................
                case "valuepair":
                    envvaluepair($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //dropdown logic goes here..................
                case "dropdown":
                    envdropdown($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "multiselect":
                    $("#WidgetPropertiesTypes").show();
                    envmultiselect($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //serverchart logic goes here..................
                case "d3chart":
                    envd3chart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //serverchart logic goes here..................
                case "serverchart":
                    envserverchart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //serverpivotchart logic goes here..................
                case "serverpivotchart":
                    envserverpivotchart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //jschart logic goes here..................
                case "jschart":
                    envjschart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //list logic goes here..................
                case "list":
                    alert("list");
                    break;
                    //radio button logic goes here..................
                case "radio":
                    envradio($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //checkbox logic goes here..................
                case "checkbox":
                    alert("checkbox");
                    break;
                    //ProgressBar
                case "Progressbar":
                    envprogressbar($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;

                case "Gage":
                    envGage($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "metergauge":
                    envmetergauge($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //image  logic goes here..................
                case "image":
                    envimage($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                    //tabgrid  logic goes here..................
                case "htmltemplate":
                    envhtmltag($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "layoutgrid":
                    $("#WidgetPropertiesTypes").show();
                    envlayoutgrid($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "jqGrid":
                    $("#WidgetPropertiesTypes").show();
                    envjqgrid($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;

                case "AssetKPIChart":
                    envassetkpichart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "AssetServiceKPIChart":
                    envassetservicekpichart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                case "AssetJobPlanKPIChart":
                    envassetjobplankpichart($scope, $location, $http, $compile, "", "", $scope.view.getSelected().controltype, $scope.view.getSelected().controlid);
                    break;
                default:
                    break;
            }
            haslayout();
        }

        $scope.removeitem = function () {
            switch ($scope.view.getSelected().controltype) {
                case "DashboardChart":
                    var test = confirm("are you sure you want to do remove this");
                    if (test) {
                        var removeditem = dashboardchart.byId(dashboardchart, $scope.view.getSelected().controlid);
                        dashboardchart.remove(removeditem);
                        var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                        $(htmlobj).parent('.bi-widget-item').remove();
                        $("#settingsmenu").removeAttr("data-controlid");
                        $("#settingsmenu").removeAttr("data-controltype");
                        $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                    }
                    break;
                case "dropdown":
                    var test = confirm("are you sure you want to do remove this");
                    if (test) {
                        var removeditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
                        dropdown.remove(removeditem);
                        var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                        $(htmlobj).parent('.bi-widget-item').remove();
                        $("#settingsmenu").removeAttr("data-controlid");
                        $("#settingsmenu").removeAttr("data-controltype");
                        $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                    }
                    break;
                case "multiselect":
                    var test = confirm("are you sure you want to do remove this");
                    if (test) {
                        var removeditem = multiselect.byId(multiselect, $scope.view.getSelected().controlid);
                        multiselect.remove(removeditem);
                        var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                        $(htmlobj).parent('.bi-widget-item').remove();
                        $("#settingsmenu").removeAttr("data-controlid");
                        $("#settingsmenu").removeAttr("data-controltype");
                        $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                    }
                    break;
                case "textbox":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = textbox.byId(textbox, $scope.view.getSelected().controlid);
                            textbox.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "table":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = table.byId(table, $scope.view.getSelected().controlid);
                            table.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "pivottable":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = bipivottable.byId(bipivottable, $scope.view.getSelected().controlid);
                            bipivottable.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "valuepair":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
                            valuepair.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "Gage":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = Gagetag.byId(Gagetag, $scope.view.getSelected().controlid);
                            valuepair.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "metergauge":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = metergauge.byId(metergauge, $scope.view.getSelected().controlid);
                            valuepair.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "text":
                    bootbox.confirm("are you sure you want to do remove this?", function (result) {
                        if (result) {
                            var removeditem = text.byId(text, $scope.view.getSelected().controlid);
                            text.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "chart":
                    var remove = confirm("are you sure you want to do remove this chart");
                    if (remove) {
                        var removeditem = bichart.byId(valuepair, $scope.view.getSelected().controlid);
                        bichart.remove(removeditem);
                        var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                        $(htmlobj).parent('.bi-widget-item').remove();
                        $("#settingsmenu").removeAttr("data-controlid");
                        $("#settingsmenu").removeAttr("data-controltype");
                        $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                    }
                    break;
                case "htmltemplate":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = htmltag.byId(htmltag, $scope.view.getSelected().controlid);
                            htmltag.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "serverchart":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = biserverchart.byId(biserverchart, $scope.view.getSelected().controlid);
                            biserverchart.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent().parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "serverpivotchart":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = bipivotchart.byId(bipivotchart, $scope.view.getSelected().controlid);
                            bipivotchart.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent().parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "layoutgrid":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
                            layoutgrid.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent().parent().remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                            clearlayoutgridprop();
                            haslayout();
                        }
                    });
                    break;
                case "radio":
                    bootbox.confirm("are you sure you want to do remove this?", function (result) {
                        if (result) {
                            var removeditem = radio.byId(radio, $scope.view.getSelected().controlid);
                            valuepair.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "image":
                    bootbox.confirm("are you sure you want to do remove this?", function (result) {
                        if (result) {
                            var removeditem = image.byId(image, $scope.view.getSelected().controlid);
                            image.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "Progressbar":
                    bootbox.confirm("are you sure you want to do remove this?", function (result) {
                        if (result) {
                            var removeditem = Progressbar.byId(Progressbar, $scope.view.getSelected().controlid);
                            Progressbar.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "jqGrid":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var removeditem = bijqgrid.byId(bijqgrid, $scope.view.getSelected().controlid);
                            bijqgrid.remove(removeditem);
                            var htmlobj = document.getElementById($scope.view.getSelected().controlid);
                            $(htmlobj).parent().parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                case "d3chart":
                    bootbox.confirm("Are you sure you want to remove this?", function (result) {
                        if (result) {
                            var ctrlid = $scope.view.getSelected().controlid;
                            ctrlid = ctrlid.replace("d3_", "");
                            ctrlid = ctrlid.replace(" ", "");
                            var removeditem = bid3chart.byId(bid3chart, ctrlid);
                            bid3chart.remove(removeditem);
                            var htmlobj = document.getElementById("d3_" + $scope.view.getSelected().controlid);
                            $(htmlobj).parent().parent('.bi-widget-item').remove();
                            $("#settingsmenu").removeAttr("data-controlid");
                            $("#settingsmenu").removeAttr("data-controltype");
                            $("#deletewidget,#widgetsettings").attr("disabled", "disabled");
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    }
    catch (err) {
        $location.path('/CreateDashboard');
    }

    //Enable Drag
    $('.ui-draggable-bi').draggable({
        connectToSortable: ".widget-body",
        revert: true,
        helper: 'clone',
        cursor: "crosshair",
        scroll: false
    });

    //**********************************Divya**********************************

    //Method to Save Dashboard details in backend
    $("#SaveDashboardButton").click(function () {
        var dashboardconfig = [];
        $(".item-container").each(function (i) {
            var $this = $(this);
            var dashboardwidget = new Object();
            dashboardwidget.Id = $this.attr("id");
            dashboardwidget.width = $this.attr("data-width");
            dashboardwidget.parentwidth = $("#Dashboard").attr("data-width");
            dashboardwidget.parentheight = $("#Dashboard").height();
            dashboardwidget.Name = $this.find('.widget-toolbar-title').text();
            dashboardwidget.CretedyBy = "User1";
            dashboardwidget.AccessedBy = "Admin,User";
            dashboardwidget.sortorder = i + 1;
            var Controls = [];
            $this.find(".bi-widget-item").each(function () {
                var $control = $(this);
                var ctrltype = $control.children().attr("class");
                var ctrlid = $control.children().attr("id");

                if (ctrltype == "txtlabel") {
                    ctrltype = "bi-textbox";
                    ctrlid = $control.find(".bi-textbox").attr("id");
                }
                if (ctrltype == "expandhover") {
                    ctrltype = "bi-serverchart";
                    ctrlid = $control.find(".bi-serverchart").attr("id");
                }
                if (ctrltype == "d3_expandhover") {
                    ctrltype = "bi-d3chart";
                    ctrlid = $control.find(".bi-d3chart").attr("id");
                    ctrlid = ctrlid.replace(" ", "");
                }
                if (ctrltype == "pivotexpandhover") {
                    ctrltype = "bi-serverpivotchart";
                    ctrlid = $control.find(".bi-serverpivotchart").attr("id");
                }
                //if (ctrltype == "assetkpiexpandhover") {
                //    ctrltype = "bi-serverassetkpichart";
                //    ctrlid = $control.find(".bi-serverassetkpichart").attr("id");
                //}
                //if (ctrltype == "assetservicekpiexpandhover") {
                //    ctrltype = "bi-serverassetservicekpichart";
                //    ctrlid = $control.find(".bi-serverassetservicekpichart").attr("id");
                //}
                //if (ctrltype == "assetjobplankpiexpandhover") {
                //    ctrltype = "bi-serverassetjobplankpichart";
                //    ctrlid = $control.find(".bi-serverassetjobplankpichart").attr("id");
                //}

                var bicontrol = new Object();
                bicontrol.type = ctrltype;
                if ($control.parent().hasClass("layout-cell"))
                    bicontrol.parent = "grid";
                else
                    bicontrol.parent = "widget";
                switch (ctrltype) {
                    case "jqplot-target":
                        bicontrol.model = bichart.byId(bichart, ctrlid);
                        break;
                    case "tablescope":
                        bicontrol.model = table.byId(table, ctrlid);
                        break;
                    case "pivottablescope":
                        bicontrol.model = bipivottable.byId(bipivottable, ctrlid);
                        break;
                    case "bi-label":
                        bicontrol.model = text.byId(text, ctrlid);
                        break;
                    case "bi-textbox":
                        bicontrol.model = textbox.byId(textbox, ctrlid);
                        break;
                    case "bi-dropdown":
                        bicontrol.model = dropdown.byId(dropdown, ctrlid);
                        break;
                    case "bi-multiselect":
                        bicontrol.model = multiselect.byId(multiselect, ctrlid);
                        break;
                    case "bi-valuepair":
                        bicontrol.model = valuepair.byId(valuepair, ctrlid);
                        break;
                    case "bi-d3chart":
                        ctrlid = ctrlid.replace("d3_", "");
                        ctrlid = ctrlid.replace(" ", "");
                        bicontrol.model = bid3chart.byId(bid3chart, ctrlid);
                        break;
                    case "bi-serverchart":
                        bicontrol.model = biserverchart.byId(biserverchart, ctrlid);
                        break;
                    case "bi-serverpivotchart":
                        bicontrol.model = bipivotchart.byId(bipivotchart, ctrlid);
                        break;
                    case "bi-javascriptchart":
                        bicontrol.model = bijavascriptchart.byId(bijavascriptchart, ctrlid);
                        break;
                    case "bi-image":
                        bicontrol.model = image.byId(image, ctrlid);
                        break;
                    case "bi-Radio":
                        bicontrol.model = radio.byId(radio, ctrlid);
                        break;
                    case "bi-Gagetemplate":
                        bicontrol.model = Gagetag.byId(Gagetag, ctrlid);
                        break;
                    case "bi-MeterGagetemplate":
                        bicontrol.model = metergauge.byId(metergauge, ctrlid);
                        break;
                    case "bi-htmltemplate":
                        bicontrol.model = htmltag.byId(htmltag, ctrlid);
                        break;
                    case "bi-progressbar":
                        bicontrol.model = Progressbar.byId(Progressbar, ctrlid);
                        break;
                    case "comp cx-panel_grid":
                        bicontrol.model = layoutgrid.byId(layoutgrid, $control.children().children().attr("id"));
                        break;
                    case "jqgridscope":
                        bicontrol.model = bijqgrid.byId(bijqgrid, ctrlid);
                        break;
                    case "bi-serverassetkpichart":
                        bicontrol.model = biassetkpichart.byId(biassetkpichart, ctrlid);
                        break;
                    case "bi-serverassetservicekpichart":
                        bicontrol.model = biassetservicekpichart.byId(biassetservicekpichart, ctrlid);
                        break;
                    case "bi-serverassetjobplankpichart":
                        bicontrol.model = biassetjobplankpichart.byId(biassetjobplankpichart, ctrlid);
                        break;
                    default:
                        break;
                }
                Controls.push(bicontrol);
            });
            dashboardwidget.bicontrols = Controls;
            dashboardconfig.push(dashboardwidget);
        });

        if (typeof $scope.dashboardsettings == "undefined") {
            return false;
        }
        var dashboard_id = "";
        var dash_id = $scope.dashboardsettings.dashboardid;
        if (dash_id == "new") {
            dashboard_id = $scope.view.getID();
        }
        else {
            dashboard_id = $scope.dashboardsettings.dashboardid;
        }

        var params = { dashboardname: $scope.dashboardsettings.name, desc: $scope.dashboardsettings.desc, dashboardconfig: JSON.stringify(dashboardconfig), dashboardid: dashboard_id, CretedBy: "User1", AccessedBy: "Admin,User" };
        var paramdata = JSON.stringify(params);

        $.ajax({
            url: "/SaveDashboard",
            method: 'post',
            async: false,
            cache: false,
            contentType: "application/json",
            data: paramdata,
        }).success(function (data) {
            if (data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else if (data.success == true) {
                $scope.dashboardsettings.dashboardid = data.dashboardid;
                fn_SuccessNotification("Dashboard has been saved Successfully!!", "success_alert", "", "");
            }
            else {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
        });
    });

    //Method to get list of Exisiting Dashaboards in backend
    $scope.GetExistingDashboardsList = function (type) {
        $http.post('/Home/GetDashboard').success(function (data) {
            if (data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else if (data.Result) {
                $('#tbl_dashboardList').DataTable().destroy();
                $('#tbl_dashboardList').DataTable({
                    "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "fnDrawCallback": function () {
                        //Click Functions for View and Delete Icons
                        $(".dashboardview").unbind("click");
                        $(".dashboardview").parent().css("text-align", "center");
                        $(".dashboardview").click(function () {
                            var viewparameters = JSON.parse($(this).attr("data-viewsourceparams"));
                            $scope.viewdetaildashboard(viewparameters.Dashboardid);
                        });

                        $(".dashboarddelete").unbind("click");
                        $(".dashboarddelete").parent().css("text-align", "center");
                        $(".dashboarddelete").click(function () {
                            var deleteparameters = JSON.parse($(this).attr("data-deletesourceparams"));
                            $scope.deletedashboard(deleteparameters.Dashboardid);
                        });
                    }
                }).clear();
                for (var i = 0; i < data.Result.length; i++) {
                    $('#tbl_dashboardList').dataTable().fnAddData([data.Result[i]["Dashboard_name"], data.Result[i]["Description"], data.Result[i]["CreatedBy"],
                        '<button class="borderless dashboardview" title="View Selected widgets" data-viewsourceparams=\'' + JSON.stringify(data.Result[i]) + '\'><i class="fa fa-eye" style="color:#438eb9;"></i></button>',
                        '<button class="borderless dashboarddelete" title="Delete selected widgets" data-deletesourceparams=\'' + JSON.stringify(data.Result[i]) + '\'><i class="fa fa-trash" style="color:#e62424;"></i></button>'
                    ]);
                }

                if (type == "menu") {
                    var element = angular.element('#ExistingDashboardsModal');
                    element.modal('show');
                }
            }
            else if (data.error) {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
        })
     .error(function (data) {
         $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
         $scope.loading = false;
     });
    };

    $scope.viewdetaildashboard = function (dashboardid) {
        $.ajax({
            url: "../../home/getdashboardbyid",
            method: 'post',
            async: false,
            cache: false,
            contentType: 'application/json',
            data: JSON.stringify({ dashboardid: dashboardid })
        }).success(function (data) {
            if (data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else if (data.error) {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
            else {
                var dashboardconfig = JSON.parse(data.dashboardconfig);
                $scope.dashboardsettings = { name: data.Dashboard_name, desc: data.Description, width: dashboardconfig[0].parentwidth, height: dashboardconfig[0].parentheight, dashboardid: data.Dashboardid };
                $scope.templatesettings = { HeaderTitle: "Dashboard Factory" + " - " + data.Dashboard_name };
                $("#widgetstore").empty(); $("#Dashboard").width(dashboardconfig[0].parentwidth); $("#Dashboard").attr("data-width", dashboardconfig[0].parentwidth);
                $("#Dashboard,#widgetstore").height(dashboardconfig[0].parentheight);

                for (var i = 0; i < dashboardconfig.length; i++) {
                    var config = dashboardconfig[i];
                    createwidget(config.Id, config.width, config.Name);
                    for (var bi = 0; bi < config.bicontrols.length; bi++) {
                        var bimodel = config.bicontrols[bi];
                        var ctrltype = bimodel.type;
                        //alert(ctrltype);
                        switch (ctrltype) {
                            case "jqplot-target":
                                bichart.add([bimodel.model]);
                                break;
                            case "tablescope":
                                table.add([bimodel.model]);
                                break;
                            case "pivottablescope":
                                bipivottable.add([bimodel.model]);
                                break;
                            case "bi-label":
                                text.add([bimodel.model]);
                                break;
                            case "bi-textbox":
                                textbox.add([bimodel.model]);
                                break;
                            case "bi-dropdown":
                                dropdown.add([bimodel.model]);
                                break;
                            case "bi-multiselect":
                                multiselect.add([bimodel.model]);
                                break;
                            case "bi-valuepair":
                                valuepair.add([bimodel.model]);
                                break;
                            case "bi-d3chart":
                                bid3chart.add([bimodel.model]);
                                break;
                            case "bi-serverchart":
                                biserverchart.add([bimodel.model]);
                                break;
                            case "bi-serverpivotchart":
                                bipivotchart.add([bimodel.model]);
                                break;
                            case "bi-javascriptchart":
                                bijavascriptchart.add([bimodel.model]);
                                break;
                            case "bi-image":
                                image.add([bimodel.model]);
                                break;
                            case "bi-Radio":
                                radio.add([bimodel.model]);
                                break;
                            case "bi-Gagetemplate":
                                Gagetag.add([bimodel.model]);
                                break;
                            case "bi-MeterGagetemplate":
                                metergauge.add([bimodel.model]);
                                break;
                            case "bi-progressbar":
                                Progressbar.add([bimodel.model]);
                                break;
                            case "bi-htmltemplate":
                                htmltag.add([bimodel.model]);
                                break;
                            case "comp cx-panel_grid":
                                layoutgrid.add([bimodel.model]);
                                updategridcells($scope, $location, $http, $compile, "", "", "layoutgrid", bimodel.model.id, layoutgrid.byId(layoutgrid, bimodel.model.id))
                                break;
                            case "jqgridscope":
                                var model = bimodel.model;
                                model.getjqgrid = true;
                                bijqgrid.add([bimodel.model]);
                                break;
                            case "bi-serverassetkpichart":
                                var model = bimodel.model;
                                biassetkpichart.add([bimodel.model]);
                                break;
                            case "bi-serverassetservicekpichart":
                                var model = bimodel.model;
                                biassetservicekpichart.add([bimodel.model]);
                                break;
                            case "bi-serverassetjobplankpichart":
                                var model = bimodel.model;
                                biassetjobplankpichart.add([bimodel.model]);
                                break;
                            default:
                                break;
                        }
                    }
                }
                haslayout();
                var element = angular.element('#ExistingDashboardsModal');
                element.modal('hide');
                CLEAREXTRAINLAYOUT();
                CLEAREXTRAINLAYOUTForDropdown();
            }

        });
    };

    $scope.deletedashboard = function (dashboardid) {
        $.ajax({
            url: "../../home/deletedashboardbyid",
            method: 'post',
            async: false,
            cache: false,
            contentType: 'application/json',
            data: JSON.stringify({ dashboardid: dashboardid })
        }).success(function (data) {
            if (data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else if (data.error) {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
            else if (data.Result) {
                $scope.GetExistingDashboardsList("delete");
                fn_SuccessNotification("Dashboard has been Deleted Successfully!!", "success_alert", "", "");
            }
        });
    };

    $scope.AddDatasource = function () {
        $http.get('/GetAllConnectionData/AllConnGrid').success(function (data) {
            if (data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else if (data.Result) {
                $('#tbl_ConnectionList').DataTable().destroy();
                $('#tbl_ConnectionList').DataTable({
                    "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "fnDrawCallback": function () {
                        $(".viewsptrigger").unbind("click");
                        $(".viewsptrigger").click(function () {
                            var dataparameters = JSON.parse($(this).attr("data-datasourceparams"));
                            $scope.viewdetailssp(dataparameters.Id, dataparameters.SPId, dataparameters.DataSource, dataparameters.ConnectionType, dataparameters.UserName);
                        });
                    }
                }).clear();
                for (var i = 0; i < data.Result.length; i++) {
                    $('#tbl_ConnectionList').dataTable().fnAddData([data.Result[i]["ConnectionName"], data.Result[i]["ConnectionType"], '<a class="viewsptrigger" data-datasourceparams=\'' + JSON.stringify(data.Result[i]) + '\'>' + data.Result[i]["DataSource"] + '</a>', data.Result[i]["UserName"]]);
                }
                var element = angular.element('#myModalforallconn');
                element.modal('show');
            }
            else if (data.error) {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
        }).error(function (data) {
            $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
            alert("err" + data);
        });
    }

    var getSPgriddtails;
    $scope.datatabs = [];
    $scope.viewdetailssp = function (viewdtailid, viewdtailspid, datasource, cnnType, createdby) {
        var dsId = viewdtailid;
        $scope.hiddenCnnidforview = viewdtailspid;
        var dsName = datasource;
        $scope.hiddenSPNameforview = datasource;
        var dsConnType = cnnType;
        $scope.hiddenCnnTypeforview = cnnType;
        var dscreatedby = createdby;
        $scope.hiddenCnnUserforview = createdby;
        var slcSPgridobj = new Array();
        slcSPgridobj.push({
            "DSId": dsId,
            "DSName": dsName,
            "ConnectionID": viewdtailspid,
            "DSConnType": dsConnType,
            "DSCnnCretedby": dscreatedby
        });
        getSPgriddtails = JSON.stringify(slcSPgridobj);

        try {
            $http.post('/GetAllConnectionData/GET_SPGriddtails', { Get_SPGriddtail: getSPgriddtails }).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.Result) {
                    $scope.modal.status = true;
                    $scope.modal.sqlstatus = false;
                    $scope.modal.orclstatus = false;
                    var element = angular.element('#myModalforallconn');
                    var arrdata = data.Result;

                    $('#Adddatasourcelink').hide();
                    var _exist = _.find($scope.datatabs, function (rw, i) {
                        return rw.ConnectionID == slcSPgridobj[0].ConnectionID
                    });

                    if (typeof _exist == "undefined") {                        
                        var dsautodivid = $scope.view.getID();
                        var divid = slcSPgridobj[0].ConnectionID + '_' + dsautodivid;
                        var tabsobject = slcSPgridobj[0];
                        tabsobject["tabid"] = divid;
                        $scope.datatabselected = divid;
                        $scope.datatabs.push(tabsobject);
                        $scope.updatetabs();
                        angular.element('#bitable').empty();
                        gettable("bitable", arrdata, $scope);
                        element.modal('hide');
                    }
                    else {
                        fn_errorNotification("200", "This Connection already Exists for this control", "This Connection already Exists for this control", "", "error_alert", "", "");
                        return false;
                    }
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
            }).error(function (data) {
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (ex) {
            fn_errorNotification("200", ex.message, ex.message, "", "error_alert", "", "");
        }
    };
    //**********************************Divya**********************************

    function clearlayoutgridprop() {
        $("#seldivwidth").val("");
        $("#seldivheight").val("");
        $("#gridcolspan").val("");
        $("#gridrowspan").val("");
        $("#layoutcols").val("");
        $("#layoutcols").attr("data-column", "");
        $("#layoutrows").val("");
        $("#layoutrows").attr("data-row", "");
        $("#alignelement").val("middle");
        $("#cellpadding").val("");
    }

    function haslayout() {
        var haslayout = "";
        $(".item-container").find(".bi-widget-item").each(function () {
            if ($(this).children().hasClass("cx-panel_grid")) {
                haslayout = "layout";
            }
        });

        if (haslayout == "layout") {
            $("#WidgetPropertiesTypes").show();
        }
        else {
            $("#WidgetPropertiesTypes").hide()
        }
    }

    //add widget
    $("#WidgetButton").click(function () {
        bootbox.dialog({
            title: "Add Widget",
            message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="name">Widget Name</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="biwidgetname" name="name" type="text" placeholder="Widget Name" value="Untitled" class="form-control input-md"> ' +
            '</div><br/><br/>' +
              '<label class="col-md-4 control-label" for="name">Widget Width(px or %)</label> ' +
            '<div class="col-md-4" style="width:34%"> ' +
            '<input id="biwidgetwidth" name="name" type="text" placeholder="Widget Width " class="form-control input-md" value="100%">' +
            '</div> ' +
            '</div> ' +
            '</form> </div> </div>',
            buttons: {
                success: {
                    label: "Save",
                    className: "btn btn-success btn-round",
                    callback: function () {
                        var name = $('#biwidgetname').val();
                        var width = $('#biwidgetwidth').val();
                        var widgetid = $scope.view.getID();
                        createwidget(widgetid, width, name);
                    }
                }
            }
        });
    });

    //calling widget create function
    createwidget($scope.view.getID(), "99%", "Untitled Widget");

    //widget create function
    function createwidget(widgetid, width, name) {
        if (width == "100%")
            width = "99%";
        var template = '<div class="item-container" id="' + widgetid + '" style="margin-bottom: 5px; width:' + width + ';position: relative;float:left" data-width="' + width + '">' +
                       '<div class="item-resizable ui-resizable" style="height: auto;min-height: 198px;">' +
                          '<div class="widget" style="display: block; height: auto;min-height: 196px;">' +
                              '<div class="widget-toolbar widget-toolbar-nohover" style="" onclick="updatesort()">' +
                                  '<span class="widget-toolbar-title" >' + name + '</span><div class="widget-toolbar-buttons"><div class="btn-group"> <button class="btn dropdown-toggle borderless" data-toggle="dropdown"><i class="icon-cog"></i> <span class="caret"></span></button> <ul class="dropdown-menu"><li><a  data-target=' + widgetid + ' class="wrename">Rename</a></li>  <li><a data-target=' + widgetid + ' class="wdelete">Delete</a></li>  <li><a data-target=' + widgetid + ' class="wwidth">Width</a></li> </ul></div> </div> </div>' +
                              '<div class="widget-body" style="padding: 10px; min-height: 190px;"></div></div></div></div>';
        var haschild = false; var expectedheight = 0;
        if ($(".item-container").length > 0) {
            var $lastwidget = $(".item-container").last();
            haschild = true;
            //$(".item-container").each(function (i) {
            //    expectedheight += $(this).height() + 10;
            //});

            $(template).insertAfter($lastwidget);

        }
        else {
            $("#widgetstore").append(template);
        }
        var $widget = $(document.getElementById(widgetid));
        if (haschild) {
            // $widget.css("top", expectedhight);
        }

        //resizable
        $widget.resizable({
            handles: 'e, w', minWidth: 200,
            resize: function (evt, ui) {
                $(".grid-layouts").addClass("gridlines");

            },
            stop: function (evt, ui) {
                var el = document.elementFromPoint(evt.originalEvent.clientX, evt.originalEvent.clientY);
                var $column = $(el).closest('.layout-cell');
                $(".grid-layouts").removeClass("gridlines");
            }
        });
        $widget.hover(function () {
            //$(this).find('.item-resizable').find('div').show();
            $(this).find('.widget-toolbar-nohover').css({ "color": "rgb(82,100,112)", "background": "rgb(229,243,252)" });
        }, function () {
            $(this).find('.widget-toolbar-nohover').attr("style", "");
        });

        $("#widgetstore").sortable({ containment: "#Dashboard" });

        //Enabl Dashboard to Dropable..        
        $('.widget-body').sortable({
            placeholder: "bisortable",
            tolerance: "pointer",
            receive: function (event, ui) {
                var dropeditem = ui.item.attr("id");
                var html = [];
                switch (dropeditem) {
                    //chart logic goes here..........
                    case "DashboardChart":
                        envdashboardchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "chart":
                        envchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //table logic goes here..................
                    case "table":
                        envtable($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "pivottable":
                        envpivottable($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //text logic goes here..................
                    case "text":

                        envText($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //text box logic goes here..................
                    case "textbox":
                        envtxtbox($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //dropdown logic goes here..................
                    case "dropdown":
                        envdropdown($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "multiselect":
                        envmultiselect($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //valuepair logic goes here..................
                    case "valuepair":
                        envvaluepair($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //d3chart logic goes here..................
                    case "d3chart":
                        envd3chart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //serverchart logic goes here..................
                    case "serverchart":
                        envserverchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //serverpivotchart logic goes here..................
                    case "serverpivotchart":
                        envserverpivotchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //jschart logic goes here..................
                    case "jschart":
                        envjschart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //list logic goes here..................
                    case "list":
                        alert("list");
                        break;
                        //radio button logic goes here..................
                    case "radio":
                        envradio($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //checkbox logic goes here..................
                    case "checkbox":
                        alert("checkbox");
                        break;
                        //Progress Bar logic here....................
                    case "Progressbar":
                        envprogressbar($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //image  logic goes here..................
                    case "image":
                        envimage($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //tabgrid  logic goes here..................
                    case "htmltemplate":
                        envhtmltag($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //tabgrid  logic goes here..................
                    case "Gage":
                        envGage($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "metergauge":
                        envmetergauge($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        //tabgrid  logic goes here..................

                    case "layoutgrid":
                        // alert("tabgrid");
                        $("#WidgetPropertiesTypes").show();
                        envlayoutgrid($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "jqGrid":
                        $("#WidgetPropertiesTypes").show();
                        envjqgrid($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                        // KPI's 
                    case "AssetKPIChart":
                        envassetkpichart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "AssetServiceKPIChart":
                        envassetservicekpichart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    case "AssetJobPlanKPIChart":
                        envassetjobplankpichart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
                        break;
                    default:
                        break;
                }
                haslayout();
            }
        });
        //.droppable({
        //accept: ".ui-draggable-bi",
        //hoverClass: "ui-drop-hover",
        //over: function (event, ui) {
        //    var $this = $(this);
        //},
        //drop: function (event, ui) {
        //    var dropeditem = ui.draggable.attr("id");
        //    switch (dropeditem) {
        //        //chart logic goes here..........
        //        case "chart":
        //            envchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //table logic goes here..................
        //        case "table":
        //            envtable($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //text logic goes here..................
        //        case "text":
        //            envText($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //text box logic goes here..................
        //        case "textbox":
        //            envtxtbox($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //dropdown logic goes here..................
        //        case "dropdown":
        //            envdropdown($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //valuepair logic goes here..................
        //        case "valuepair":
        //            envvaluepair($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //serverchart logic goes here..................
        //        case "serverchart":
        //            envserverchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //list logic goes here..................
        //        case "list":
        //            alert("list");
        //            break;
        //            //radio button logic goes here..................
        //        case "radio":
        //            envradio($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //checkbox logic goes here..................
        //        case "checkbox":
        //            alert("checkbox");
        //            break;
        //            //image  logic goes here..................
        //        case "image":
        //            envimage($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //            //tabgrid  logic goes here..................
        //        case "layoutgrid":
        //            // alert("tabgrid");
        //            envlayoutgrid($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", widgetid, "widget");
        //            break;
        //        default:
        //            //  alert("Coming Soon.......");
        //            break;
        //    }
        //    }
        //});
        //unbind events
        $(".wrename,.wdelete,.wwidth").unbind('click');

        //rename widget
        $(".wrename").click(function () {
            var $target = $(document.getElementById($(this).attr("data-target"))).find('.widget-toolbar-title');
            bootbox.prompt({
                title: "Change Widget Title",
                value: $target.text(),
                callback: function (result) {
                    $target.text(result == null || result == "" ? "Untitled Widget" : result);
                }
            });
        });
        //delete widget
        $(".wdelete").click(function () {
            var $target = $(document.getElementById($(this).attr("data-target")));
            bootbox.confirm("Are you sure you want to delete this widget?", function (result) {
                if (result) {
                    if ($("#widgetstore").children().length > 1) {
                        $target.remove();
                    }
                }
                //else {
                //    return false;
                //}
            });
        });
        //change widget
        $(".wwidth").click(function () {
            var $target = $(document.getElementById($(this).attr("data-target")));
            bootbox.prompt({
                title: "Change Widget Width",
                value: $target.attr("data-width"),
                callback: function (result) {
                    $target.attr("data-width", result);
                    $target.css("width", result);
                }
            });
        });
    }

    $("#widgetsettings").click(function () {
        $scope.controlsettings();
    });

    $("#deletewidget").click(function () {
        $scope.removeitem();
    });
    //End Of Drop

    function fn_Make_Dashboards_DataTable(datasource) {
        var tbldata = datasource;
        try {
            oTable = $('#tbl_dashboardList').dataTable({
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
                "aaData": tbldata,
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
                        var d = ('<button class="borderless dashboardview" title="View Selected widgets"  data-viewsourceparams=\'' + JSON.stringify(oObj) + '\'><i class="fa fa-pencil-square-o"></i></button>');
                        return d;
                    }
                },
                {
                    "mDataProp": function (oObj) {
                        var d = ('<button class="borderless dashboarddelete" title="Delete selected widgets"  data-deletesourceparams=\'' + JSON.stringify(oObj) + '\'><i class="icon-trash"></i></button>');
                        return d;
                    }
                },
                ]

            });
            $('.DataTables_sort_icon').remove();
            $('.dataTables_length').remove();
            $(".ui-widget-header").css("background", "#2D89EF");
            $(".ui-widget-header").css("background", "#2D89EF");
            $(".ui-widget-header").css({ "height": "51px" });
        }
        catch (e) {
            alert(e);
        }
    }

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

    function CLEAREXTRAINLAYOUTForDropdown() {
        $(".widget-body").find('.bi-widget-item').each(function (a) {
            $(this).find('table tbody tr').each(function (b) {
                if (b != 0) {
                    $(this).find('td').each(function (c) {

                        $(this).find('.bi-widget-item').find(".bi-dropdown .ms-parent").each(function (d) {
                            if (d != 0)
                                $(this).remove();
                        });
                    });
                }
            });
        });
    }

    $scope.modal = { status: true, sqlstatus: true, orclstatus: true, statusparamchk: true, statusparamchkdata: true, statustdchk: true }



    $scope.CnnTypechange = function () {
        $http.post('/GetAllConnectionData/AllConnGridchange', { CnnType: $scope.cnntype }).success(function (data) {
            if (data.responsegrid) {
                $scope.ConnData = JSON.parse(data.responsegrid).NewDataSet["Table"];
                var element = angular.element('#myModalforallconn');
                element.modal('show');
            }
            else if (data.error) {
                alert(data.error);
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        }).error(function (data) {
            $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
        });
    };



    //update tabs
    $scope.updatetabs = function () {
        switch ($scope.view.getSelected().controltype) {
            case "dropdown":
                var selecteditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "textbox":
                var selecteditem = textbox.byId(textbox, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "valuepair":
                var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "text":
                var selecteditem = text.byId(text, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "radio":
                var selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "Gage":
                var selecteditem = Gagetag.byId(Gagetag, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "metergauge":
                var selecteditem = metergauge.byId(metergauge, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "Progressbar":
                var selecteditem = Progressbar.byId(Progressbar, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "image":
                var selecteditem = image.byId(image, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "chart":
                var selecteditem = bichart.byId(bichart, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            case "jschart":
                var selecteditem = bijavascriptchart.byId(bijavascriptchart, $scope.view.getSelected().controlid);
                selecteditem.set({ datatabs: $scope.datatabs });
                break;
            default:
                break;
        }
    }

    //get data 
    $scope.getdata = function (conninfo, id) {
        $http.post('/GetAllConnectionData/GET_SPGriddtails', { Get_SPGriddtail: JSON.stringify(conninfo) }).success(function (data) {
            if (data.tabledata) {
                angular.element('#bitable').empty();

                //var arrdata = JSON.parse(data.tabledata);
                var arrdata = data.tabledata;

                gettable("bitable", arrdata, $scope);
                $(".tabstriplist>li>a:not(:last)").css("background", "#336699");
                $(".tabstriplist>li>a:not(:last)").attr("data-selected", false);
                id.css("background", "#6A5ACD"); id.attr("data-selected", true);
                var $el = $("#vf-formula-bar").find(".active");
                if ($el.length > 0) {
                    if ($el.hasClass("data")) {
                        $scope.setrange_for_th($el.attr("data-range"));
                    }
                }
            }
            else if (data.errorresult) {
                alert(data.errorresult)
            }
        });
    }

    //get tabid
    $scope.showdatatab = function (_data) {
        var slcSPgridobj = new Array();
        slcSPgridobj.push(_data);
        $(".tabstriplist>li>a:not(:last)").css("background", "#336699");
        $(".tabstriplist>li>a:not(:last)").attr("data-selected", false);
        angular.element('#' + _data.tabid + '').attr("data-selected", true);
        angular.element('#' + _data.tabid + '').css("background", "slateblue");

        $http.post('/GetAllConnectionData/GET_SPGriddtails', { Get_SPGriddtail: JSON.stringify(slcSPgridobj) }).success(function (data) {
            if (data.tabledata) {
                angular.element('#bitable').empty();
                var arrdata = data.tabledata;
                gettable("bitable", arrdata, $scope);
            }
            else if (data.errorresult) {
                alert(data.errorresult)
            }
        }).error(function (data) {

        });
    }

    $scope.removetab = function (array, index) {
        array.splice(index, 1);
        angular.element('#bitable').empty();
        var arraylength = $scope.datatabs.length;
        if (arraylength == 0) {
            return;
        }
        else {
            if (index == 0) {
                $scope.showdatatab(array[index]);
            }
            else {
                if (index < arraylength) {
                    $scope.showdatatab(array[index + 1]);
                }
                else {
                    $scope.showdatatab(array[index - 1]);
                }
            }
        }
        $scope.updatetabs();
    };

    //..................function expression operation..........................//
    $scope.CloseCurrentPopup = function () {
        var element = angular.element('#bidsahboardconfig');
        element.modal('hide');
    };

    $scope.showdatatable = function () {
        $scope.modal.tablestatus = true;
        $scope.modal.expressionstatus = true;
        $scope.modal.strnumstatus = true;
        $scope.modal.variablestatus = true;
    };

    $scope.expression = function () {
        $scope.modal.tablestatus = false;
        $scope.modal.expressionstatus = false;
        $scope.modal.strnumstatus = true;
        $scope.modal.variablestatus = true;
    };

    $scope.enterstringornum = function () {
        $scope.modal.tablestatus = false;
        $scope.modal.expressionstatus = true;
        $scope.modal.strnumstatus = false;
        $scope.modal.variablestatus = true;
        $scope.optype = "Arithmetic";
        // $scope.$apply();
    };

    $scope.NewVariable = function () {
        $scope.modal.tablestatus = false;
        $scope.modal.expressionstatus = true;
        $scope.modal.strnumstatus = true;
        $scope.modal.variablestatus = false;
    };

    //........................addition function.....................//

    $("html").keyup(function (e) {
        if (e.keyCode == 46) {
            var $ele = $("#vf-formula-bar").find(".active");
            if ($ele.length)
                $scope.deleteselectednode();
        }
    });

    //delete slected node
    $scope.deleteselectednode = function () {
        var $ele = $("#vf-formula-bar").find(".active");
        if ($ele.text() == "data") {
            return;
        }
        else if ($ele.hasClass("data") == true) {
            if (typeof $ele.prev().attr("class") == "undefined") {
                $("#vf-formula-bar").empty();
            }
            if ($ele.next().hasClass("operator") == true) {
                $ele.next().remove();
                if ($ele.next().hasClass("insertion") && $ele.prev().attr("class") == "undefined")
                    $ele.next().remove();
                $ele.remove();
            }
            else {
                $ele.remove();
            }
        }
        else if ($ele.hasClass("insertion") == true) {

            return;
        }
        else if ($ele.hasClass("function") == true) {
            if ($ele.prev().html() == "(") {
                if ($ele.next().hasClass("insertion")) {
                    $ele.remove();
                    return;
                }
            }
            if ($ele.next().hasClass("insertion") == true) {
                if ($ele.prev().hasClass("operator") != true)
                    $ele.next().remove();
                $ele.remove();
                return;
            }
            if ($ele.next().hasClass("operator") == true) {
                $ele.next().remove();
                if ($ele.next().hasClass("insertion"))
                    $ele.next().remove();
                $ele.remove();
            }
            else {
                if ($ele.next().hasClass("optional"))
                    $ele.next().remove();
                $ele.remove();
            }
        }
        else if ($ele.hasClass("operator") == true) {
            if ($ele.next().hasClass("function") == true || $ele.next().hasClass("literal") == true || $ele.next().hasClass("data") == true) {
                alert("Invalid Operation");
                return;
            }
            else {
                $ele.remove();
            }
        }
        else if ($ele.hasClass("expr") == true) {
            if ($ele.next().hasClass("operator"))
                $ele.next().remove();
            if ($ele.next().hasClass("insertion"))
                $ele.next().remove();
            $ele.remove();
        }
        else if ($ele.hasClass("literal") == true) {
            if (typeof $ele.prev().attr("class") == "undefined") {
                $("#vf-formula-bar").empty();
            }
            if ($ele.next().hasClass("operator") == true) {
                $ele.next().remove();
                if ($ele.next().hasClass("insertion") && $ele.prev().attr("class") == "undefined")
                    $ele.next().remove();
                $ele.remove();
            }
            else {
                $ele.remove();
            }
        }
        else if ($ele.hasClass("varible") == true) {
            if (typeof $ele.prev().attr("class") == "undefined") {
                $("#vf-formula-bar").empty();
            }
            if ($ele.next().hasClass("operator") == true) {
                $ele.next().remove();
                if ($ele.next().hasClass("insertion") && $ele.prev().attr("class") == "undefined")
                    $ele.next().remove();
                $ele.remove();
            }
            else {
                $ele.remove();
            }
        }
        $scope.updatedbconnections();
    }

    //clear formula
    $scope.clearformula = function () {
        $("#vf-formula-bar").empty();
        $("#bitable").find("table").find('tr > *').removeClass('highlighted');
        $scope.updatedbconnections();
    }

    $scope.agfuncclick = function () {
        $("#vf-formula-bar").find(".activeParent").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            e.stopPropagation();
        });
    }

    $scope.agfuncsign = function (data) {
        $scope.modal.tablestatus = true;
        $scope.modal.expressionstatus = true;
        $scope.modal.strnumstatus = true;
        $scope.optype = "Arithmetic";
        if (!isEmpty($("#vf-formula-bar"))) {
            var $ele = $("#vf-formula-bar").find(".active");
            if ($ele.prev().hasClass("operator") == true) {
                $ele.replaceWith('<ul class="vf-node function activeParent"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif" ></li>');
            }
            else if ($ele.hasClass("data") == true || $ele.hasClass("literal") || $ele.hasClass("varible")) {

                if ($ele.next().html() == ",") {
                    $ele.replaceWith('<ul class="vf-node function activeParent" title="data"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul>');
                }
                else {
                    $ele.replaceWith('<ul class="vf-node function activeParent" title="data"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional" title="data" style="display: inline-block;">data</li>');
                }
            }
            else {
                if ($ele.next().html() == ")" && $ele.hasClass("insertion")) {
                    $ele.replaceWith('<ul class="vf-node function activeParent"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul><li class="vf-node insertion optional" style="display: inline-block;"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
                }
                else {
                    $ele.replaceWith('<ul class="vf-node function activeParent" title="data"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional" title="data" style="display: inline-block;">data</li>');
                }
            }
            if ($ele.next().html() == ")") {
                $('<li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>').insertAfter($ele);
            }
        }
        else {
            $("#vf-formula-bar").append('<ul class="vf-node function activeParent"><li class="fn-name">' + data + '</li><li class="lparen">(</li><li class="vf-node arg_placeholder active" title="data">data</li><li>)</li></ul><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif" ></li>');
        }
        $scope.argplaceholderclick();
        $scope.bindinsertop();
        $scope.agfuncclick();
        $scope.updatedbconnections();
        $scope.bindvaribleclick();
        $scope.bindliterallick();
    };

    $scope.Addparentheses = function () {
        if (isEmpty($("#vf-formula-bar"))) {
            $("#vf-formula-bar").append('<ul class="vf-node expr activeParent"><li>(</li><li class="vf-node insertion optional active" style="display: inline-block;"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li><li>)</li></ul><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
        }
        else {
            var $ele = $("#vf-formula-bar").find(".active");
            var $cloneobj = $ele.clone();
            $ele.replaceWith('<ul class="vf-node expr activeParent"><li>(</li>' + $('<div>').append($cloneobj).html() + '<li class="vf-node insertion optional" style="display: inline-block;"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li><li>)</li></ul>');
        }
        $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.agfuncclick(); $scope.updatedbconnections();
    }

    function isEmpty(el) {
        return !$.trim(el.html())
    }

    $scope.argplaceholderclick = function () {
        $("#vf-formula-bar").find(".arg_placeholder").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            updatetoolbar(this);
            e.stopPropagation();
        });
    }

    function updatetoolbar(obj) {
        if ($(obj).prev().hasClass("function") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.strnumstatus = true;
            $scope.modal.variablestatus = true;
        }
        else if ($(obj).prev().hasClass("expr") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.variablestatus = true;
            $scope.modal.strnumstatus = true;
        }
        else if ($(obj).prev().hasClass("operator") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = true;
            $scope.optype = "Aggrigative";
            $scope.formulaop = "Aggrigative";
            $scope.modal.strnumstatus = true;
            $scope.modal.variablestatus = true;
        }
        else if ($(obj).prev().hasClass("data") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.strnumstatus = true;
            $scope.modal.variablestatus = true;
        }
        else if ($(obj).prev().hasClass("literal") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.strnumstatus = true;
            $scope.modal.variablestatus = true;
        }
        else if ($(obj).prev().hasClass("varible") == true) {
            $(obj).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.strnumstatus = true;
            $scope.modal.variablestatus = true;
        }
        else {
            $scope.modal.tablestatus = true;
            $scope.optype = "Aggrigative";
            $scope.formulaop = "Aggrigative";
            $scope.modal.strnumstatus = false;
            $scope.modal.variablestatus = false;
        }
        $scope.$apply();
    }

    $scope.bindinsertop = function () {
        $("#vf-formula-bar").find(".insertion").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            updatetoolbar(this);
            e.stopPropagation();
        });
    }

    $scope.binddataclick = function () {
        $("#vf-formula-bar").find(".data").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            updatetoolbar(this);
            $scope.setrange_for_th($(this).attr("data-range"));
            e.stopPropagation();
        });
    }

    $scope.bindliterallick = function () {
        $("#vf-formula-bar").find(".literal").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            updatetoolbar(this);
            $scope.modal.tablestatus = false;
            $scope.modal.variablestatus = true;
            $scope.modal.strnumstatus = false;
            $("#f-literal_value").val($("#vf-formula-bar").find(".active").html());
            $scope.$apply();
            e.stopPropagation();
        });
    }

    $scope.bindvaribleclick = function () {
        $("#vf-formula-bar").find(".varible").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            updatetoolbar(this);
            $scope.modal.tablestatus = false;
            $scope.modal.variablestatus = false;
            $scope.modal.strnumstatus = true;
            $scope.$apply();
            e.stopPropagation();
        });
    }

    function isNumeric(value) {
        return (value == Number(value)) ? "number" : "string"
    }

    $scope.addliteral = function () {
        var value = $("#f-literal_value").val();

        if (value == "") {
            return;
        }
        if (isNumeric(value) == "string") {
            // value = "\"'" +value + "'\"";
        }
        if (isEmpty($("#vf-formula-bar"))) {
            $("#vf-formula-bar").append('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
        }
        else {
            var $ele = $("#vf-formula-bar").find(".active");
            if ($ele.html() == "data") {
                $ele.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional" title="data" style="display: inline-block;">data</li>');
            }
            else if ($ele.hasClass("literal") == true) {
                $ele.html(value);
            }
            else if ($ele.hasClass("varible") == true) {
                $ele.html('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
            }
            else if ($ele.hasClass("insertion") == true) {
                $ele.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
            }
            else if ($ele.hasClass("data") == true) {
                $ele.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li>');
            }
            else if ($el.hasClass("function") == true) {
                if ($ele.next().html() == ",") {
                    $ele.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li>');
                }
                else {
                    $el.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                }
            }
        }

        $scope.argplaceholderclick();
        $scope.bindinsertop();
        $scope.agfuncclick();
        $scope.bindliterallick();
        $scope.updatedbconnections();
    }

    $scope.operatorclick = function () {
        $("#vf-formula-bar").find(".operator").click(function (e) {
            $("#vf-formula-bar").find(".active").each(function (i) {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
            $scope.modal.variablestatus = true;
            $scope.modal.strnumstatus = true;
            $scope.$apply();
            e.stopPropagation();
        });
    }

    $scope.arithematicfunc = function (event, index) {
        $scope.selectedexpindex = index;
        $scope.formulaop = "Arithmetic";
        $scope.modal.tablestatus = false;
        $scope.modal.strnumstatus = true;
    };

    //........................sum expression function.....................//

    $scope.arithematicfuncop = function (symbol) {
        var $el = $("#vf-formula-bar").find(".active");
        if ($el.hasClass("operator") == true) {
            $el.html(symbol);
            $($el).addClass("active");
            $scope.modal.tablestatus = false;
            $scope.formulaop = "Arithmetic";
            $scope.optype = "Arithmetic";
        }
        else {
            $('<li class="vf-node operator" style="padding: 0 5px;">' + symbol + '</li>').insertBefore($el);
            $scope.modal.tablestatus = true;
            $scope.optype = "Aggrigative";
            $scope.formulaop = "Aggrigative";
            $scope.operatorclick();
        }
    };

    $scope.setrange_for_th = function (range) {
        var selectionRect;
        var $tbl = $("#bitable").find("table");
        $tbl.find('tr > *').removeClass('highlighted');
        if (range.indexOf(":") == -1) {
            var dataindex = $("td[p='" + range + "']").parent().index();
            var hindex = parseInt(dataindex) + 1;
            selectionRect = {
                x: $("td[p='" + range + "']").index(),
                y: hindex,
                width: $("td[p='" + range + "']").index() + 1,
                height: hindex + 1
            };
        }
        else if (isNaN(parseInt(range.split(":")[0]))) {
            var colname = $("td[p='" + range.split(":")[0] + "0']").html();
            var dataindex = $tbl.find("[data-columnname='" + colname + "']").index();
            selectionRect = {
                x: dataindex,
                y: 0,
                width: dataindex + 1,
                height: $tbl.find('tr').length
            };
        }
        else {
            var tdlen = parseInt(range.split(":")[0]) + 1;
            selectionRect = {
                x: 0,
                y: tdlen,
                width: $tbl.find("tbody > tr:first > td").length * 2,
                height: tdlen + 1
            };
        }
        $tbl.find('thead tr > *').slice(selectionRect.x, selectionRect.width).addClass('highlighted');
        $tbl.find('tr').slice(selectionRect.y, selectionRect.height).each(function () {
            $(this).find('> th:first-child').addClass('highlighted');
            $(this).find('> *').slice(selectionRect.x, selectionRect.width).addClass('highlighted');
        });
    };

    //             previw expand and collapse operation...............................
    $scope.togglepreview = function () {
        if ($("#expandcollapse").attr("src") == "../Analytics/temp/Widgets/icon-resize-full.PNG") {
            $("#expandcollapse").attr("src", "../Analytics/temp/Widgets/icon-resize-small.PNG");
            $("#expandcollapse").attr("title", "Collapse");
            $("#expandcollapse").css({ "margin-top": "140px" });
            $("#previewobject").parent().css({ "height": "35%" });
            $("#Tabsobject").css({ "display": "block" });
        }
        else {
            $("#expandcollapse").attr("src", "../Analytics/temp/Widgets/icon-resize-full.PNG");
            $("#expandcollapse").attr("title", "Expand");
            $("#expandcollapse").css({ "margin-top": "460px" });
            $("#previewobject").parent().css({ "height": "100%" });
            $("#Tabsobject").css({ "display": "none" });
        }
    };

    $scope.previeupdate = function () {
        $("#previewobject").parent().css({ "height": "35%" });
        $("#Tabsobject").css({ "display": "block" });
        $("#expandcollapse").css({ "margin-top": "140px" });
        if ($scope.view.getSelected().controltype == "table") {
            $('.tablescope').find('tr').each(function () {
                $(this).find('td').removeClass('cx-table selected-component');
                $(this).find('th').removeClass('cx-table tblheaders selected-component');
            });
        }
    };

    //Loading Variables
    $scope.LoadVariable = function () {
        $scope.variablelist = [];
        var optionstr = "";
        //        var promise1 = GetDataAjax1();
        //        promise1.success(function (data) {
        //            if (data.errorresult) {
        //                alert(data.errorresult); return false;
        //            }
        //            else {
        //                $scope.variablelist = JSON.parse(data.jsondblist);
        //                optionstr += ' <option value="0">SelectVariable</option>'
        //                for (var i = 0; i < JSON.parse(data.jsondblist).length; i++) {
        //                    optionstr += '<option value="' + JSON.parse(data.jsondblist)[i].DefaultValue + '">' + JSON.parse(data.jsondblist)[i].VariableName + '</option>';
        //                }
        //                $("#drpdwnsetval").html(optionstr);
        //                $("#dropdownforChartx").html(optionstr);
        //                $("#dropdownforCharty").html(optionstr);
        //            }
        //        });
        //        function GetDataAjax1() {
        //            return $.ajax({
        //                url: "../../CreateParameter/DropdownBinding",
        //                async: false,
        //                data: {}
        //            });
        //        }
    }

    //createvariables
    $scope.Newvariabledilog = function () {
        bootbox.dialog({
            title: "Create New Variable",
            message: "<label style='font-weight:bold;'>Variable Name:</label><input type='text' id='variable' class='form-control' autofocus/></br><label style='font-weight:bold;'>Default Value:</label><input type='text' id='defaultvalue' class='form-control' /></br><p style='-1em 0 0.75em;'>* Variable Name can only contain letters, numbers, and underscores.</p><p style='margin: -21px 0 0.75em;'>* Variable Name cannot be 'user'.</p>",
            buttons: {
                success: {
                    label: "CreateVariable",
                    className: "btn-success",
                    callback: function () {
                        var variablename = $("#variable").val();
                        var defval = $("#defaultvalue").val();
                        //Spl char validation
                        var re = /^\w+$/;
                        if (!re.test(variablename)) {
                            alert("Invalid or Empty Variable");
                            return false;
                        }

                        var Varobj = new Array();
                        Varobj.push({
                            "VariableName": variablename,
                            "DefaultValue": defval
                        });
                        var Save_Variable = JSON.stringify(Varobj);
                        var promise = GetDataAjax(Save_Variable);
                        promise.success(function (data) {
                            if (data.errorresult) {
                                alert(data.errorresult); return false;
                            }
                            else {
                                alert(data.responsedata);


                            }
                        });
                        //                        function GetDataAjax(Save_Variable) {
                        //                            return $.ajax({
                        //                                url: "../../CreateParameter/SaveNewVariable",
                        //                                async: false,
                        //                                data: { Save_Variable: Save_Variable }
                        //                            });
                        //                        }
                        var optionstr = "";
                        //                        var promise1 = GetDataAjax1();
                        //                        promise1.success(function (data) {
                        //                            if (data.errorresult) {
                        //                                alert(data.errorresult); return false;
                        //                            }
                        //                            else {
                        //                                $scope.variablelist = JSON.parse(data.jsondblist);
                        //                                for (var i = 0; i < JSON.parse(data.jsondblist).length; i++) {
                        //                                    optionstr += '<option value="' + JSON.parse(data.jsondblist)[i].DefaultValue + '">' + JSON.parse(data.jsondblist)[i].VariableName + '</option>';
                        //                                }
                        //                                $("#drpdwnsetval").html(optionstr);
                        //                            }
                        //                        });
                        //                        function GetDataAjax1() {
                        //                            return $.ajax({
                        //                                url: "../../CreateParameter/DropdownBinding",
                        //                                async: false,
                        //                                data: {}
                        //                            });
                        //                        }
                    }
                },
                danger: {
                    label: "Cancel",
                    // className: "btncancel",
                    callback: function () {
                        alert("cancel");
                    }
                }
            }
        });
    }

    $scope.modal1 = { status: true, sqlstatus: false, orclstatus: false }
    $("#QueryBuilder").hide();

    // to get connection list for datasource
    $scope.getdbconlist = function () {
        $scope.Connlist = {};
        $http.post('/CreateParameter/GetConnList', { Get_Connlist: $scope.param_dsname }).success(function (data) {
            if (data.connlist) {
                $scope.Connlist = JSON.parse(data.connlist);
                if ($scope.param_dsname == "WebService Connection") {
                    $("#hidestorep").hide();
                    $("#QueryBuilder").hide();
                    $("#connectionnamesdp").show();
                    $("#param_name_query").hide();
                    $("#param_name_dynamicquery").hide();
                    $("#param_name").show();
                }
                else if ($scope.param_dsname == "QueryBuilder") {
                    $("#hidestorep").hide();
                    $("#QueryBuilder").show();
                    $("#connectionnamesdp").hide();
                    $("#param_name_query").show();
                    $("#param_name_dynamicquery").hide();
                    $("#param_name").hide();
                }
                else {
                    $("#hidestorep").show();
                    $("#QueryBuilder").hide();
                    $("#connectionnamesdp").show();
                    $("#param_name_query").hide();
                    $("#param_name_dynamicquery").hide();
                    $("#param_name").show();
                }
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        });

        var selectedconndata = JSON.stringify($scope.param_connection);
        if (typeof selectedconndata != "undefined") {
            var selectedconndatas = JSON.parse(selectedconndata);
            var Connobj = new Array();
            Connobj.push({
                "Id": selectedconndatas.Id,
                "ConnectionName": selectedconndatas.ConnectionName,
                "datasource": $scope.param_dsname
            });
            var ConnSPobj = JSON.stringify(Connobj);
            $http.post('/CreateParameter/GetAvailSP', { SelectedConn: ConnSPobj }).success(function (data) {
                if (data.paramsplist) {
                    $scope.SPlist = JSON.parse(data.paramsplist);
                }
                else if (data.errorresult) {
                    alert(data.errorresult);
                }
                else {
                    if ($scope.param_dsname == "QueryBuilder") {
                        var obj = new Array();
                        obj.push({
                            "Id": $("#param_queryname").val(),
                            "ConnectionName": $("#param_queryname option:selected").text(),
                            "datasource": $scope.param_dsname,
                            "spname": $("#param_queryname option:selected").text()
                        });
                        var SPobj = JSON.stringify(obj);
                        $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
                            if (data.paramslist) {
                                $scope.modal1.sqlstatus = true;
                                $scope.modal1.orclstatus = false;
                                if ($scope.param_dsname == "QueryBuilder") {
                                    $("#param_name_query").show();
                                    $("#param_name").hide();
                                    $scope.paramsquerylistdata = JSON.parse(data.paramslist);
                                }
                                else {
                                    $("#param_name_query").hide();
                                    $("#param_name").show();
                                    $scope.paramslistdata = JSON.parse(data.paramslist);
                                }
                                //else if ($scope.param_dsname == "WebService Connection") {
                                //    $scope.paramslistdata = JSON.parse(data.paramslist);
                                //}
                            }
                            else if (data.errorresult) {
                                alert(data.errorresult);
                            }
                        });
                    }
                    else {
                        var obj = new Array();
                        obj.push({
                            "Id": selectedconndatas.Id,
                            "ConnectionName": selectedconndatas.ConnectionName,
                            "datasource": $scope.param_dsname,
                            "spname": $("#param_spname").val()
                        });
                        var SPobj = JSON.stringify(obj);
                        $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
                            if (data.paramslist) {
                                if ($scope.param_dsname == "Sql Connection") {
                                    $scope.modal1.sqlstatus = true;
                                    $scope.modal1.orclstatus = false;
                                    $scope.paramslistdata = JSON.parse(data.paramslist).NewDataSet.Table;
                                }
                                else if ($scope.param_dsname == "Oracle Connection") {
                                    $scope.modal1.orclstatus = true;
                                    $scope.modal1.sqlstatus = false;
                                    $scope.paramslistdata = JSON.parse(data.paramslist).NewDataSet.Table;
                                }
                            }
                            else if (data.errorresult) {
                                alert(data.errorresult);
                            }
                        });
                    }
                }
            });
        }
    };
    // to get connection list for datasource ended.

    // to get storedprocedure list for connection
    $scope.getdbsplist = function (selectedconn) {
        $scope.SPlist = {};
        var selectedconndata = JSON.stringify(selectedconn);
        var selectedconndatas = JSON.parse(selectedconndata);
        var Connobj = new Array();
        Connobj.push({
            "Id": selectedconndatas.Id,
            "ConnectionName": selectedconndatas.ConnectionName,
            "datasource": $scope.param_dsname
        });
        var ConnSPobj = JSON.stringify(Connobj);
        $http.post('/CreateParameter/GetAvailSP', { SelectedConn: ConnSPobj }).success(function (data) {
            var optionstr = '';
            if (data.paramsplist) {
                if ($scope.param_dsname != "WebService Connection") {
                    $scope.SPlist = JSON.parse(data.paramsplist);
                }
                else {
                    $scope.paramslistdata = JSON.parse(data.paramsplist);
                    //var Key = JSON.parse(data.paramsplist);
                    //optionstr + '<option value="">-- Choose ParameterName --</option>';
                    //for (var i = 0; i < Key.length; i++) {
                    //    optionstr += '<option value="' + Key[i]["Key"] + '">' + Key[i]["Key"] + '</option>';                    
                    //}
                    //$("#param_name").html(optionstr);
                }
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                $scope.paramslistdata = {};
                $scope.modal1.sqlstatus = false;
                $scope.modal1.orclstatus = false;
            }
        });
    };
    // to get storedprocedure list for connection ended.


    // to get parameters list for storedprocedure
    $scope.getdbparameters = function () {
        $scope.paramslistdata = {};
        var selectedconndata = JSON.stringify($scope.param_connection);
        var selectedconndatas = JSON.parse(selectedconndata);
        var obj = new Array();
        obj.push({
            "Id": selectedconndatas.Id,
            "ConnectionName": selectedconndatas.ConnectionName,
            "datasource": $scope.param_dsname,
            "spname": $("#param_spname").val()

        });
        var SPobj = JSON.stringify(obj);

        $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
            if (data.paramslist) {
                if ($scope.param_dsname == "Sql Connection") {
                    $scope.modal1.sqlstatus = true;
                    $scope.modal1.orclstatus = false;
                    $scope.paramslistdata = JSON.parse(data.paramslist).NewDataSet.Table;
                }
                else if ($scope.param_dsname == "Oracle Connection") {
                    $scope.modal1.orclstatus = true;
                    $scope.modal1.sqlstatus = false;
                    $scope.paramslistdata = JSON.parse(data.paramslist).NewDataSet.Table;
                }
                //else if ($scope.param_dsname == "WebService Connection") {
                //    $scope.paramslistdata = JSON.parse(data.paramslist);
                //}
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        });
    };
    // to get parameters list for storedprocedure ended.

    // to get parameters list for query templates
    $scope.getqueryparameters = function () {
        $scope.paramslistdata = {};
        var obj = new Array();
        obj.push({
            "Id": $("#param_queryname").val(),
            "ConnectionName": $("#param_queryname option:selected").text(),
            "datasource": $scope.param_dsname,
            "spname": $("#param_queryname option:selected").text()
        });
        var SPobj = JSON.stringify(obj);
        $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
            if (data.paramslist) {
                $scope.modal1.sqlstatus = true;
                $scope.modal1.orclstatus = false;
                if ($scope.param_dsname == "QueryBuilder") {
                    $("#param_name").hide();
                    var responsedata = data.paramslist;
                    var rspdata = responsedata.split('$$$');
                    if (rspdata[1] == "true") {
                        $("#param_name_query").hide();
                        $("#param_name_dynamicquery").show();
                        $scope.paramsdynamicquerylistdata = JSON.parse(rspdata[0]);
                    }
                    else {
                        $("#param_name_query").show();
                        $("#param_name_dynamicquery").hide();
                        $scope.paramsquerylistdata = JSON.parse(rspdata[0]);
                    }
                }
                else {
                    $("#param_name_query").hide();
                    $("#param_name_dynamicquery").hide();
                    $("#param_name").show();
                    $scope.paramslistdata = JSON.parse(data.paramslist);
                }
                //else if ($scope.param_dsname == "WebService Connection") {
                //    $scope.paramslistdata = JSON.parse(data.paramslist);
                //}
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        });
    };

    // to get parameters list for query templates ended.
    $scope.getparamvalue = function () {
        $scope.paramsname = {};

        var obj = new Array();
        if ($scope.param_dsname == "QueryBuilder") {
            var paramname = "";
            if ($('#param_name_query').is(':visible')) {
                paramname = $("#param_name_query").val();
            }
            else {
                paramname = $("#param_name_dynamicquery").val();
            }

            obj.push({
                "Id": $("#param_queryname").val(),
                "ConnectionName": $("#param_queryname option:selected").text(),
                "datasource": $scope.param_dsname,
                "spname": $("#param_queryname option:selected").text(),
                "paramname": paramname,
                "paramnamealias": $("#param_name_query option:selected").text()
            });
        }
        else {
            var selectedconndata = JSON.stringify($scope.param_connection);
            var selectedconndatas = JSON.parse(selectedconndata);
            obj.push({
                "Id": selectedconndatas.Id,
                "ConnectionName": selectedconndatas.ConnectionName,
                "datasource": $scope.param_dsname,
                "spname": $("#param_spname").val(),
                "paramname": $("#param_name").val()
            });
        }
        var SPobj = JSON.stringify(obj);

        $http.post('/CreateParameter/GetParamName', { SelectedSP: SPobj }).success(function (data) {
            if (data.paramslist) {
                if ($scope.param_dsname == "Sql Connection") {
                    $scope.modal1.sqlstatus = true;
                    $scope.modal1.orclstatus = false;
                    var paramsname = data.paramslist;
                    $("#defaultval").val(paramsname);
                }
                else if ($scope.param_dsname == "Oracle Connection") {
                    $scope.modal1.sqlstatus = true;
                    $scope.modal1.orclstatus = false;
                    var paramsname = data.paramslist;
                    $("#defaultval").val(paramsname);
                }
                else if ($scope.param_dsname == "QueryBuilder") {
                    $scope.modal1.sqlstatus = true;
                    $scope.modal1.orclstatus = false;
                    var paramsname = data.paramslist;
                    $("#defaultval").val(paramsname);
                }
                else {
                    var returnedData = $.grep(JSON.parse(data.paramslist), function (element, index) {
                        if (element.PARAMETER_NAME == $("#param_name").val()) {
                            return element;
                        }
                    });
                    var Defval = returnedData[0].Value;
                    $("#defaultval").val(Defval);
                }
            }
            else if (data.paramslistdefault) {
                $("#defaultval").val(data.paramslistdefault);
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        });
    };

    $scope.savedefaultvalue = function () {
        var paramobj = new Array();
        if ($scope.param_dsname == "QueryBuilder") {
            var paramname = "";
            if ($('#param_name_query').is(':visible')) {
                paramname = $("#param_name_query").val();
            }
            else {
                paramname = $("#param_name_dynamicquery").val();
            }
            paramobj.push({
                "Id": $("#param_queryname").val(),
                "ConnectionName": $("#param_queryname option:selected").text(),
                "datasource": $scope.param_dsname,
                "spname": $("#param_queryname option:selected").text(),
                "paramname": paramname,
                "paramnamealias": $("#param_name_query option:selected").text(),
                "defaultval": $("#defaultval").val()
            });
        }
        else {
            var selectedconndata = JSON.stringify($scope.param_connection);
            var selectedconndatas = JSON.parse(selectedconndata);
            paramobj.push({
                "Id": selectedconndatas.Id,
                "ConnectionName": selectedconndatas.ConnectionName,
                "datasource": $scope.param_dsname,
                "spname": $("#param_spname").val(),
                "paramname": $("#param_name").val(),
                "defaultval": $("#defaultval").val()
            });
        }
        var paramdataobj = JSON.stringify(paramobj);
        $http.post('/CreateParameter/SaveDefaultval', { SelectedSP: paramdataobj }).success(function (data) {
            var slice = data.savedata.split('^');
            if (slice[0]) {
                var element = angular.element('#VariableModal');
                element.modal('hide');
                var ref = "";
                if ($scope.param_dsname == "QueryBuilder") {
                    var paramname1 = "";
                    if ($('#param_name_query').is(':visible')) {
                        paramname1 = $("#param_name_query").val();
                        var paramss = paramname1;
                        var paramsss = paramss.split('$');
                        ref = "refno$" + slice[1] + "$" + paramsss[0] + "$" + "";
                        $("#dbparamval").val(paramsss[0]);
                    }
                    else {
                        paramname1 = $("#param_name_dynamicquery").val();
                        var paramss = paramname1;
                        var paramsss = paramss.split('$');
                        if (paramss.indexOf('$') > -1) {
                            ref = "refno$" + slice[1] + "$" + paramsss[0] + "$" + paramsss[1];
                        }
                        else {
                            ref = "refno$" + slice[1] + "$" + paramsss[0] + "$" + "";
                        }
                        $("#dbparamval").val(paramsss[0]);
                    }
                }
                else {
                    ref = "refno$" + slice[1] + "$" + $("#param_name").val() + "";
                    $("#dbparamval").val($("#param_name").val());
                }

                $("#dblblval").text(ref);
                $("#dbdivval").show(); $(".imgremove").show();
                var element = angular.element('#VariableModal');
                element.modal('hide');
                if ($scope.selectedvariabletype == "setvariable") {
                    var type = $scope.view.getSelected().controltype;
                    var id = $scope.view.getSelected().controlid;
                    switch (type) {
                        case "textbox":
                            var selecteditem = textbox.byId(textbox, id);
                            var updateproperties = selecteditem.get("primary_style");
                            if ($scope.param_dsname == "QueryBuilder") {
                                var paramname2 = "";
                                if ($('#param_name_query').is(':visible')) {
                                    paramname2 = $("#param_name_query").val();
                                    var paramss = paramname2;
                                    var paramsss = paramss.split('$');
                                    updateproperties.variablename = "refno$" + slice[1] + "$" + paramsss[0] + "$" + paramsss[1];
                                }
                                else {
                                    paramname2 = $("#param_name_dynamicquery").val();
                                    var paramss = paramname2;
                                    var paramsss = paramss.split('$');
                                    updateproperties.variablename = "refno$" + slice[1] + "$" + paramsss[0] + "$" + "";
                                }
                            }
                            else {
                                updateproperties.variablename = "refno$" + slice[1] + "$" + $("#param_name").text();
                            }
                            updateproperties.paramvalue = $("#defaultval").val();
                            selecteditem.unset("primary_style", { silent: true });
                            selecteditem.set({ "primary_style": updateproperties });
                            break;
                            //case "Gage":
                            //    var selecteditem = Gagetag.byId(Gagetag, id);
                            //    var updateproperties = selecteditem.get("primary_style");
                            //    updateproperties.variablename = "refno_" + slice[1] + "_" + $("#param_name").val() + "";
                            //    updateproperties.paramvalue = $("#defaultval").val();
                            //    selecteditem.unset("primary_style", { silent: true });
                            //    selecteditem.set({ "primary_style": updateproperties });
                            //    break;
                            //case "htmltemplate":
                            //    var selecteditem = htmltag.byId(htmltag, id);
                            //    var updateproperties = selecteditem.get("primary_style");
                            //    updateproperties.variablename = "refno_" + slice[1] + "_" + $("#param_name").val() + "";
                            //    updateproperties.paramvalue = $("#defaultval").val();
                            //    selecteditem.unset("primary_style", { silent: true });
                            //    selecteditem.set({ "primary_style": updateproperties });
                            //    break;
                        case "dropdown":
                            var selecteditem = dropdown.byId(dropdown, id);
                            var updateproperties = selecteditem.get("variables");
                            updateproperties.variablename = "refno$" + slice[1] + "$" + $("#param_name option:selected").text() + "$" + $("#param_name").val();
                            updateproperties.paramvalue = $("#defaultval").val();
                            selecteditem.unset("variables", { silent: true });
                            selecteditem.set({ "variables": updateproperties });
                            break;
                        case "multiselect":
                            var selecteditem = multiselect.byId(multiselect, id);
                            var updateproperties = selecteditem.get("variables");
                            updateproperties.variablename = "refno$" + slice[1] + "$" + $("#param_name").val() + "";
                            updateproperties.paramvalue = $("#defaultval").val();
                            selecteditem.unset("variables", { silent: true });
                            selecteditem.set({ "variables": updateproperties });
                            break;
                        case "serverchart":
                            var divindex = $("#" + divid).index();
                            var selecteditem = biserverchart.byId(biserverchart, id);
                            var drilldbtrindex = $("#drilldowndbvariabletrindex").val();
                            var drilldbtdindex = $("#drilldowndbvariabletdindex").val();
                            var divid = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".hidedivid").val();
                            var targetdsboarddrillindex = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".targetdsboarddrillindex").val();
                            if (divid == "ChartXParamsDiv") {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop[targetdsboarddrillindex].ChartXParameterName = $("#dblblval").text();
                                drilldownprop[targetdsboarddrillindex].ChartXParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_chartx").val($("#dblblval").text());
                                $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_chartx").val($("#defaultval").val());
                                //$("#reqparamlbl_chartx").val($("#dblblval").text());
                                //$("#reqparamtext_chartx").val($("#defaultval").val());                            
                            }
                            else {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop[targetdsboarddrillindex].ChartYParameterName = $("#dblblval").text();
                                drilldownprop[targetdsboarddrillindex].ChartYParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_charty").val($("#dblblval").text());
                                $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_charty").val($("#defaultval").val());
                                //$("#reqparamlbl_charty").val($("#dblblval").text());
                                //$("#reqparamtext_charty").val($("#defaultval").val());
                            }
                            //drilldownprop.ParameterName = $("#dblblval").text();
                            //drilldownprop.ParameterValue = $("#defaultval").val();
                            //drilldownprop.variabletype = $('input[name= cvariables]:checked').val();
                            //selecteditem.unset("drilldown", { silent: true });
                            //selecteditem.set({ "drilldown": drilldownprop });
                            //$("#" + divid).find('.reqparam').val($("#defaultval").val());
                            break;
                        case "serverpivotchart":
                            //var divid = $("#hidedivid").val();
                            var divindex = $("#" + divid).index();
                            var selecteditem = bipivotchart.byId(bipivotchart, id);
                            var drilldbtrindex = $("#drilldowndbvariabletrindex").val();
                            var drilldbtdindex = $("#drilldowndbvariabletdindex").val();
                            var divid = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".hidedivid").val();
                            var targetdsboarddrillindex = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".targetdsboarddrillindex").val();
                            //var drilldownprop = selecteditem.get("drilldown");
                            if (divid == "ChartXParamsDiv") {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartXParameterName = $("#dblblval").text();
                                drilldownprop.ChartXParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_chartx").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_chartx").val($("#defaultval").val());
                                $(".reqparamlbl_chartx").val($("#dblblval").text());
                                $(".reqparamtext_chartx").val($("#defaultval").val());
                            }
                            else {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartYParameterName = $("#dblblval").text();
                                drilldownprop.ChartYParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_charty").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_charty").val($("#defaultval").val());
                                $(".reqparamlbl_charty").val($("#dblblval").text());
                                $(".reqparamtext_charty").val($("#defaultval").val());
                            }
                            break;
                        case "AssetKPIChart":
                            //var divid = $("#hidedivid").val();
                            var divindex = $("#" + divid).index();
                            var selecteditem = biassetkpichart.byId(biassetkpichart, id);
                            var drilldbtrindex = $("#drilldowndbvariabletrindex").val();
                            var drilldbtdindex = $("#drilldowndbvariabletdindex").val();
                            var divid = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".hidedivid").val();
                            var targetdsboarddrillindex = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".targetdsboarddrillindex").val();
                            //var drilldownprop = selecteditem.get("drilldown");
                            if (divid == "ChartXParamsDiv") {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartXParameterName = $("#dblblval").text();
                                drilldownprop.ChartXParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_chartx").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_chartx").val($("#defaultval").val());
                                $(".reqparamlbl_chartx").val($("#dblblval").text());
                                $(".reqparamtext_chartx").val($("#defaultval").val());
                            }
                            else {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartYParameterName = $("#dblblval").text();
                                drilldownprop.ChartYParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_charty").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_charty").val($("#defaultval").val());
                                $(".reqparamlbl_charty").val($("#dblblval").text());
                                $(".reqparamtext_charty").val($("#defaultval").val());
                            }
                            break;
                        case "AssetServiceKPIChart":
                            //var divid = $("#hidedivid").val();
                            var divindex = $("#" + divid).index();
                            var selecteditem = biassetservicekpichart.byId(biassetservicekpichart, id);
                            var drilldbtrindex = $("#drilldowndbvariabletrindex").val();
                            var drilldbtdindex = $("#drilldowndbvariabletdindex").val();
                            var divid = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".hidedivid").val();
                            var targetdsboarddrillindex = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".targetdsboarddrillindex").val();
                            //var drilldownprop = selecteditem.get("drilldown");
                            if (divid == "ChartXParamsDiv") {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartXParameterName = $("#dblblval").text();
                                drilldownprop.ChartXParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_chartx").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_chartx").val($("#defaultval").val());
                                $(".reqparamlbl_chartx").val($("#dblblval").text());
                                $(".reqparamtext_chartx").val($("#defaultval").val());
                            }
                            else {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartYParameterName = $("#dblblval").text();
                                drilldownprop.ChartYParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_charty").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_charty").val($("#defaultval").val());
                                $(".reqparamlbl_charty").val($("#dblblval").text());
                                $(".reqparamtext_charty").val($("#defaultval").val());
                            }
                            break;
                        case "AssetJobPlanKPIChart":
                            //var divid = $("#hidedivid").val();
                            var divindex = $("#" + divid).index();
                            var selecteditem = biassetjobplankpichart.byId(biassetjobplankpichart, id);
                            var drilldbtrindex = $("#drilldowndbvariabletrindex").val();
                            var drilldbtdindex = $("#drilldowndbvariabletdindex").val();
                            var divid = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".hidedivid").val();
                            var targetdsboarddrillindex = $("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".targetdsboarddrillindex").val();
                            //var drilldownprop = selecteditem.get("drilldown");
                            if (divid == "ChartXParamsDiv") {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartXParameterName = $("#dblblval").text();
                                drilldownprop.ChartXParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_chartx").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_chartx").val($("#defaultval").val());
                                $(".reqparamlbl_chartx").val($("#dblblval").text());
                                $(".reqparamtext_chartx").val($("#defaultval").val());
                            }
                            else {
                                var drilldownprop = selecteditem.get("drilldown");
                                drilldownprop.ChartYParameterName = $("#dblblval").text();
                                drilldownprop.ChartYParameterValue = $("#defaultval").val();
                                selecteditem.unset("drilldown", { silent: true });
                                selecteditem.set({ "drilldown": drilldownprop });
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamlbl_charty").val($("#dblblval").text());
                                //$("#drilldowntabletbody tr:eq(" + drilldbtrindex + ")").find("td:eq(" + drilldbtdindex + ")").find(".reqparamtext_charty").val($("#defaultval").val());
                                $(".reqparamlbl_charty").val($("#dblblval").text());
                                $(".reqparamtext_charty").val($("#defaultval").val());
                            }
                            break;
                        case "table":
                            var divid = $("#hidedivid").val();
                            var divindex = $("#" + divid).index();
                            var selecteditem = table.byId(table, id);
                            var drilldownprop = selecteditem.get("drilldown"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                            var sinfo = _.find(drilldownprop, function (rw, index) {
                                indexselected = index;
                                return rw.id == sid;
                            });
                            drilldownprop[indexselected].RequestParameters[divindex].ParameterName = $("#dblblval").text();
                            drilldownprop[indexselected].RequestParameters[divindex].ParameterValue = $("#" + divid + "").find("input").attr("data-colid");
                            drilldownprop[indexselected].RequestParameters[divindex].variabletype = $('input[name= cvariables]:checked').val();
                            selecteditem.unset("drilldown", { silent: true });
                            selecteditem.set({ "drilldown": drilldownprop });
                            $("#" + divid).find('.reqparam').val(drilldownprop[indexselected].RequestParameters[divindex].ParameterName);
                            break;
                        default:
                            break;
                    }
                }

                $scope.setvariable(ref);
                //$("#param_connection").val("");
                //$("#param_spname").val("");
                //$("#param_name").val("");
                //$("#param_dsname").val("");
                //$("#defaultval").val("");
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
            else if (data.error) {
                alert(data.error);
            }
        });
        //$("#VariableModal input[type='text']").val("");
        //$("#VariableModal input[type='select']").val("");
    };

    $scope.dtsrcchange = function () {
        $scope.getdbconlist();
    }

    $scope.dtconnchange = function () {
        //$scope.getdbsplist();
    }

    $scope.dtspchange = function () {
        $scope.getdbparameters();
        $scope.getqueryparameters();
    }

    $scope.dtparamchange = function () {
        $scope.getparamvalue();
    }

    $scope.DbPopup = function (type) {
        var element = angular.element('#VariableModal');
        element.modal('show');
        $scope.selectedvariabletype = type;
        $("#param_connection").val("");
        $("#param_spname").val("");
        $("#param_name").val("");
        $("#param_dsname").val("");
        $("#defaultval").val("");
        $("#QueryBuilder").hide();
        $("#param_name_query").hide();
        $("#param_name_dynamicquery").hide();
    }

    $scope.modalclose = function () {
        var element = angular.element('#VariableModal');
        element.modal('hide');
    }

    $scope.setvariable = function (value) {
        if (value == "") {
            return;
        }
        if (value.indexOf("_refno") == -1) {
            // $("#dbparamval").val("");
        }
        value = "%" + value + "%";
        if (isEmpty($("#vf-formula-bar"))) {
            $("#vf-formula-bar").append('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
        }
        else {
            var $ele = $("#vf-formula-bar").find(".active");
            if ($ele.html() == "data") {
                $ele.replaceWith('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional" title="data" style="display: inline-block;">data</li>');
            }
            else if ($ele.hasClass("literal") == true) {
                $ele.replaceWith('<li class="vf-node literal active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
            }
            else if ($ele.hasClass("varible") == true) {
                $ele.html(value);
            }
            else if ($ele.hasClass("insertion") == true) {
                $ele.replaceWith('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li>');
            }
            else if ($ele.hasClass("data") == true) {
                $ele.replaceWith('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li>');
            }
            else if ($el.hasClass("function") == true) {
                if ($ele.next().html() == ",") {
                    $ele.replaceWith('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li>');
                }
                else {
                    $el.replaceWith('<li class="vf-node varible active"  style="padding: 0 5px;" >' + value + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
                }
            }
        }
        $scope.argplaceholderclick();
        $scope.bindinsertop();
        $scope.agfuncclick();
        $scope.bindliterallick();
        $scope.updatedbconnections();
        $scope.bindvaribleclick();
    }
});

//enable drag
function updatesort() {
    $(".widget-body").sortable("option", "disabled", false);
}

function refresh() {
    $(".bi-widget-item").each(function () {
        var $control = $(this);
        var ctrlid = $control.children().attr("id");
        var ctrltype = $control.children().attr("class");

        if (ctrltype == "txtlabel") {
            ctrltype = "bi-textbox";
            ctrlid = $control.find(".bi-textbox").attr("id");
        }
        if (ctrltype == "expandhover") {
            ctrltype = "bi-d3chart";
            ctrlid = $control.find(".bi-d3chart").attr("id");
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
        if ($control.parent().hasClass("layout-cell")) {
            bicontrol.parent = "grid";
        }
        else {
            bicontrol.parent = "widget";
        }
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
                //selecteditem = dropdown.byId(dropdown, ctrlid);
                //selecteditem.unset("refresh", { silent: true });
                //selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-valuepair":
                selecteditem = valuepair.byId(valuepair, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "bi-d3chart":
                selecteditem = bid3chart.byId(bid3chart, ctrlid);
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
            case "bi-javascriptchart":
                selecteditem = bijavascriptchart.byId(bijavascriptchart, ctrlid);
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
            case "bi-htmltemplate":
                selecteditem = htmltag.byId(htmltag, ctrlid);
                selecteditem.unset("refresh", { silent: true });
                selecteditem.set({ "refresh": "refresh" });
                break;
            case "jqgridscope":
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
}

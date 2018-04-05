



RapidApp.controller('ManageReportCtrl', function ($scope, $location, $http) {

    $scope.view = {
        getID: function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }
    };

    //$(function () {

    $scope.gettreejsonforview = function () {

        var data = [];

        $http.get('/Home/gettreejsonforview').success(function (result) {
            if (result.error) {
                data = [
                 { "id": "Root", "parent": "#", "text": "Root", 'state': { 'opened': true, 'selected': true }, "icon": "/Images/Widgets/Folder-icon.png" },
                 { "id": "NewNode", "parent": "Root", "text": "NewNode", "icon": "/Images/Widgets/Folder-icon.png" }
                ];
            }
            else {
                data = result;
            }
            $('#bitree').bind('loaded.jstree', function (e, data) {
                //construct tree by using jquery plugun..
            }).jstree({
                'core': {
                    'data': data,
                    check_callback: true,
                    "load_open": true
                },
                "types": {
                    "default": {
                        "icon": "glyphicon glyphicon-flash"
                    },
                    "demo": {
                        "icon": "glyphicon glyphicon-ok"
                    }
                },
                //"types": {
                //    "category": {
                //        "icon": "glyphicon glyphicon-flash"
                //    },
                //    "page": {
                //        "icon": "/Images/Widgets/report-paper.png"
                //    }
                //},
                "plugins": ["types", "contextmenu"],
                "contextmenu": {
                    "items": function ($node) {
                        var selid = $node.id;
                        if (selid.indexOf("_") != -1 && selid.indexOf("Report") >= 0) {
                            var splitid = selid.split("_");
                            return {
                                "Delete": {
                                    "label": "Delete",
                                    "separator_before": false,
                                    "icon": false,
                                    "separator_after": false,
                                    "_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                            obj = inst.get_node(data.reference);
                                        if (inst.is_selected(obj)) {
                                            inst.delete_node(inst.get_selected());
                                        }
                                        else {
                                            inst.delete_node(obj);
                                        }
                                        $("#bitree").find(".report").parent().find('i').each(function () {

                                            $(this).addClass("reporticon");
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            return {
                                "Create": {
                                    "label": "Add Child",
                                    "separator_before": false,
                                    "separator_after": true,
                                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                                    "action": function (data) {

                                        var inst = $.jstree.reference(data.reference),
                                         obj = inst.get_node(data.reference);
                                        inst.create_node(obj, { "icon": "/Images/Widgets/Folder-icon.png" }, "last", function (new_node) {

                                            setTimeout(function () { inst.edit(new_node); }, 0);
                                        });
                                        $("#bitree").find(".jstree-icon jstree-themeicon").each(function () {
                                            alert("asd");
                                            $(this).addClass("childicon");
                                        });
                                        $("#bitree").find(".report").parent().find('i').each(function () {

                                            $(this).addClass("reporticon");
                                        });
                                    }
                                },
                                "create_file": {
                                    "label": "Add Report",
                                    "separator_before": false,
                                    "separator_after": true,
                                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                            obj = inst.get_node(data.reference);
                                        $http.post('/Home/GetDashboard').success(function (data) {


                                            if (data.responsedashboards) {
                                                fn_Make_Dashboards_DataTable(data.responsedashboards);
                                                // $scope.DashboardList = JSON.parse(data.responsedashboards).NewDataSet["Table"];
                                                //if (type == "menu") {
                                                var element = angular.element('#myModalforalldashboards');
                                                element.modal('show');
                                                //}
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
                                        //inst.create_node(obj, {}, "last", function (new_node) {
                                        //    setTimeout(function () { inst.edit(new_node); }, 0);
                                        //});
                                    }
                                },
                                "Delete": {
                                    "label": "Delete",
                                    "separator_before": false,
                                    "icon": false,
                                    "separator_after": false,
                                    "_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                            obj = inst.get_node(data.reference);
                                        if (inst.is_selected(obj)) {
                                            inst.delete_node(inst.get_selected());
                                        }
                                        else {
                                            inst.delete_node(obj);
                                        }
                                        $("#bitree").find(".report").parent().find('i').each(function () {

                                            $(this).addClass("reporticon");
                                        });
                                    }
                                },
                                "rename": {
                                    "separator_before": false,
                                    "separator_after": false,
                                    "_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
                                    "label": "Rename",
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                            obj = inst.get_node(data.reference);
                                        inst.edit(obj);
                                        $("#bitree").find(".report").parent().find('i').each(function () {

                                            $(this).addClass("reporticon");
                                        });
                                    }
                                }
                            };
                        }
                    }
                }
            });
            $("#bitree").find(".report").parent().find('i').each(function () {

                $(this).addClass("reporticon");
            });
            $("#bitree").find(".jstree-icon jstree-themeicon").each(function () {
                alert("asd");
                $(this).addClass("childicon");
            });
            $("#bitree").on('open_node.jstree', function () {
                $("#bitree").find(".report").parent().find('i').each(function () {

                    $(this).addClass("reporticon");
                });
            });
        });
        //});
    };
    $scope.gettreejsonforview();
    $scope.Savetree = function () {
        var json = $.jstree.reference('#bitree').get_json();
        var json1 = $('#bitree').html();
        $("#tempprocess").html(json1);

        //  $("#tempprocess").find('a').removeAttr("class");
        //  $("#tempprocess").find('li i').remove();
        //  $("#tempprocess").find('li').removeAttr("role");
        //  $("#tempprocess").find('li').removeAttr("aria-selected");
        //  $("#tempprocess").find('li').removeAttr("aria-expanded");
        //  $("#tempprocess").find('li').removeAttr("id");
        //  $("#tempprocess").find('li').removeAttr("class");
        //  $("#tempprocess").find('ul').removeAttr("role");
        //  $("#tempprocess").find('ul').removeAttr("class");
        //var jsonString = JSON.stringify(json);

        //var params = { treedata: $('#tempprocess').html(), treeid: "Dashboardrepository" };      
        $.ajax({
            url: "../../Home/SaveTreeReport",
            //dataType: "html",
            contentType: "application/json",
            method: 'POST',
            async: false,
            cache: false,
            data: JSON.stringify({ treedata: $('#tempprocess').html(), treeid: "Dashboardrepository" })
        }).success(function (data) {
            if (data == true) {
                alert("Saved succesfully");
            }
        });
    }

    $scope.viewdetaildashboard = function (dashboard) {        
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        var reportid = "Report_" + $scope.view.getID();
        $("#bitree").jstree(true).create_node($("#" + sel + ""),
            {
                icon: "/Images/Widgets/Pie-2-16.png",
                text: "<span id=" + dashboard.Dashboardid + " style='color: #777;' class='report'>" + dashboard.Dashboard_name + "</span>",
                id: reportid
            }, 'last', false, true);

        $('#bitree').jstree('open_node', $("#bitree").find($("#" + sel + "")));
        var element = angular.element('#myModalforalldashboards');
        element.modal('hide');
    };

    $scope.deletedashboard = function (dashboardid) {
        $.ajax({
            url: "../home/deletedashboardbyid",
            method: 'post',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({ dashboardid: dashboardid })
        }).success(function (data) {
            if (data) {
                bootbox.dialog({
                    title: "Error:",
                    message: '<img src="/Images/1398528270_196747.ico" width="100px"/><br/> <p style="color:red">Technical problems occurred while loading your dashboard.Please try again...</p><br/>'
                });
                return false;
            }
            else {
                $scope.GetDashboardlist("delete");
                bootbox.dialog({
                    title: "Delete Success:",
                    message: '<img src="/Images/1398528270_196747.ico" width="100px"/><br/> <p style="color:green">Dashboard deleted successfully!!</p><br/>'
                });
            }
        });
    };

    $scope.GetDashboardlist = function (type) {
        $http.post('/Home/GetDashboard').success(function (data) {
            if (data.responsedashboards) {
                fn_Make_Dashboards_DataTable(data.responsedashboards);
                //$scope.DashboardList = JSON.parse(data.responsedashboards).NewDataSet["Table"];
                if (type == "menu") {
                    var element = angular.element('#myModalforalldashboards');
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

    function fn_Make_Dashboards_DataTable(datasource) {
        var tbldata = datasource;

        try {
            oTable = $('#tbl_dashboardList').dataTable({
                "bDestroy": true,
                "bJQueryUI": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers",
                "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                'iDisplayLength': 10,
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
                    update_editable();
                },
                "aoColumns": [
                // { "mDataProp": "Id" },
                // { "mDataProp": "dashboardid" },
                { "mDataProp": "Dashboard_name" },
                { "mDataProp": "Description" },
                { "mDataProp": "CreatedBy" },
                {
                    "class": "center",
                    "mDataProp": function (oObj) {
                        // var d = ('<button class="borderless dashboardview" title="View Selected widgets"  ><i class="fa fa-pencil-square-o"></i></button>');
                        var d = '<a data-viewsourceparams=\'' + JSON.stringify(oObj) + '\' class="green dashboardview" style="cursor:pointer;"><i class="ace-icon fa fa-check bigger-130"></i></a>';
                        return d;
                    }
                },
                {
                    "class": "center",
                    "mDataProp": function (oObj) {
                        //var d = ('<button class="borderless dashboarddelete" title="Delete selected widgets"  data-deletesourceparams=\'' + JSON.stringify(oObj) + '\'><i class="fa fa-trash"></i></button>');
                        var d = '<a data-deletesourceparams=\'' + JSON.stringify(oObj) + '\' class="red dashboarddelete" style="cursor:pointer;"><i class="ace-icon fa fa-trash bigger-130"></i></a>';
                        return d;
                    }
                }]
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

    function update_editable() {
        $(".dashboardview").unbind("click");
        $(".dashboardview").click(function () {
            var viewparameters = JSON.parse($(this).attr("data-viewsourceparams"));
            $scope.viewdetaildashboard(viewparameters);
        });
        $(".dashboarddelete").unbind("click");
        $(".dashboarddelete").click(function () {
            var deleteparameters = JSON.parse($(this).attr("data-deletesourceparams"));
            $scope.deletedashboard(deleteparameters.dsahboardid);
        });
    }
});
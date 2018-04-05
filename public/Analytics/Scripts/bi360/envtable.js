function envtable($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    //Global Variables
    var Controlid = $scope.view.getID(); $scope.datatabs = []; $scope.formulaop = "Aggrigative"; $scope.optype = "Arithmetic"; var selecteditem;

    //new control
    if (controlid == "new") {
        var colid1 = "columns_" + $scope.view.getID();
        var colid2 = "columns_" + $scope.view.getID();
        var colid3 = "columns_" + $scope.view.getID();
        var colid4 = "columns_" + $scope.view.getID();
        table.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            style: { "position": "absolute", "width": "421", "height": "150", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "BackgroundColor": "#ffffff" },
            //properties of table columns
            columns: [{ "id": colid1, "columnname": "Untitled 1", "columnname1": "", "showvaluesonlabel": true, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "Decimals": 0, "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "ShowDrilldownlink": "hide" },
            { "id": colid2, "columnname": "Untitled 2", "columnname1": "", "showvaluesonlabel": true, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "Decimals": 0, "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "ShowDrilldownlink": "hide" },
            { "id": colid3, "columnname": "Untitled 3", "columnname1": "", "showvaluesonlabel": true, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "Decimals": 0, "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "ShowDrilldownlink": "hide" },
            { "id": colid4, "columnname": "Untitled 4", "columnname1": "", "showvaluesonlabel": true, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "Decimals": 0, "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "ShowDrilldownlink": "hide" },
            ],
            Table_Style: { "TableColumns": "4", "TableRows": "5", "TableWidth": "", "TableHeight": "150", "Scroll": "true", "border": "active", "ResultVisibility": "none" },
            //properties table drilldown
            drilldown: [{ "id": colid1, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] },
            { "id": colid2, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] },
            { "id": colid3, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] },
            { "id": colid4, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] }],
            datatabs: [],
            target: target,
            type: type,
            refresh: ""
        }]);
        selecteditem = table.byId(table, Controlid);

    }
    else {
    
        selecteditem = table.byId(table, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }
    //load table properties html
    $http.get('../Analytics/Bi360Templates/Tabs/Table_Tabs.html').success(function (t) {
        $("#Tabsobject").html($compile(t)($scope));
        //load custom variables
        $scope.LoadVariable();
        $("#expandcollapse").hide(); var tablestyle = selecteditem.get("Table_Style");
        $("#tablewidth").val(tablestyle.TableWidth);
        $('#rescheck').prop('checked', false);



        //drilldown 

        //get dashboard list
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
        //data table to bind dashboards list
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
        //get dashboard name and id on click and set those values to drilldown properties
        function update_editdashboard() {
            $(".dashboardview1").unbind("click");
            $(".dashboardview1").click(function () {
                var drilldownprop = selecteditem.get("drilldown"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                var sinfo = _.find(drilldownprop, function (rw, index) {
                    indexselected = index;
                    return rw.id == sid;
                });

                var viewparameters = JSON.parse($(this).attr("data-selectdashboard"));
                $("#targetdsboardid").val(viewparameters.DsahboardId);
                $("#targetdsboard").val(viewparameters.Dashboard_name);
                var drilldownprop = selecteditem.get("drilldown");
                drilldownprop[indexselected].DashboardId = viewparameters.DsahboardId;
                drilldownprop[indexselected].DashboardName = viewparameters.Dashboard_name;
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });
                var element = angular.element('#mymodalforalldashboards');
                element.modal('hide');
            });
        }
        //close dashboardlist popup
        $scope.gridclose = function () {
            var element = angular.element('#mymodalforalldashboards');
            element.modal('hide');
        };
        //close variables selection popup
        $scope.modalclose = function () {
            var element = angular.element('#variableselection');
            element.modal('hide');
        };

        //bind requested params to the respictive type variables
        $scope.reqparamspopup = function (obj, $event) {

            var removePrimary = $($event.target).parent().parent().attr("id");
            $("#hidedivid").val(removePrimary);
            var divindex = $("#" + removePrimary).index();
            var drilldownprop = selecteditem.get("drilldown"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var sinfo = _.find(drilldownprop, function (rw, index) { indexselected = index; return rw.id == sid; });
          
            if (drilldownprop[indexselected].RequestParameters[divindex].variabletype == "cv") {
              
                $('input:radio[id=custvar]').prop('checked', true);
                $("#drpdwnsetval").val(drilldownprop[indexselected].RequestParameters[divindex].ParameterName);              
                $("#dbdiv").hide();
                $("#custdiv").show();
                $("#chartdiv").hide();
            }
            else {
              
                $('input:radio[id=dbvar]').prop('checked', true);
                $("#dbdivval").show();
                $("#dblblval").text(drilldownprop[indexselected].RequestParameters[divindex].ParameterName);
                $("#dbdiv").show();
                $("#custdiv").hide();
                $("#chartdiv").hide();
            }
            var element = angular.element('#variableselection');
            element.modal('show');

            $(".dropdwnchange").unbind("change");
            $(".dropdwnchange").change(function () {
                var drilldownprop = selecteditem.get("drilldown"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                var sinfo = _.find(drilldownprop, function (rw, index) { indexselected = index; return rw.id == sid; });
                drilldownprop[indexselected].RequestParameters[divindex].ParameterName = $("#drpdwnsetval option:selected").text();
                drilldownprop[indexselected].RequestParameters[divindex].ParameterValue = $("#" + removePrimary + "").find("input").attr("data-colid");
                drilldownprop[indexselected].RequestParameters[divindex].variabletype = $('input[name= cvariables]:checked').val();
                selecteditem.unset("drilldown", { silent: true });
                selecteditem.set({ "drilldown": drilldownprop });             
               
                $("#" + removePrimary).find('.reqparam').val($("#drpdwnsetval option:selected").text());
               
            });

        };

        //selecting type of variables
        $scope.radioclick = function () {
            if ($('input[name= cvariables]:checked').val() == "cv") {
                $("#dblblval").val("");
                $("#dbdiv").hide();
                $("#custdiv").show();
                $("#chartdiv").hide();
            }
            else if ($('input[name= cvariables]:checked').val() == "dv") {
                $("#drpdwnsetval").val("");
                $("#dbdiv").show();
                $("#custdiv").hide();
                $("#chartdiv").hide();
            }
            else {
                $("#drpdwnsetval").val("");
                $("#dblblval").val("");
                $("#dbdiv").hide();
                $("#custdiv").hide();
                $("#chartdiv").show();
            }
            var divid = $("#hidedivid").val();
            var divindex = $("#" + divid).index();
            var drilldownprop = selecteditem.get("drilldown"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var sinfo = _.find(drilldownprop, function (rw, index) { indexselected = index; return rw.id == sid; });
            drilldownprop[indexselected].RequestParameters[divindex].variabletype = $('input[name= cvariables]:checked').val();
            
            selecteditem.unset("drilldown", { silent: true });
            selecteditem.set({ "drilldown": drilldownprop });
        };
        //close datasource popup
        $scope.tablemodalclose = function () {
            var element = angular.element('#VariableModal');
            element.modal('hide');
        };
        //close popup after selecting variable
        $scope.ShowParamname = function () {
            var element = angular.element('#variableselection');
            element.modal('hide');
        }

        //drilldown




    });

    $("#treeid").html($compile('<div id="bitree" > </div>')($scope)); $("#addtotree").remove();
    //add column link
    $("<a style='font-weight:bold;text-align:right;margin-left: 112px;' id='addtotree'>+Add Column</a>").insertBefore("#treeid");

    //after loading
    $scope.selected = 2; $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true; $scope.selecteditem = "Table";

    $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
    //tree data
    var data = [
               { "id": "Table", "parent": "#", "text": "Table", 'state': { 'opened': true, 'selected': true } }


    ];
    //bind table propertie tothier respectv cntrls
    var tableobj = selecteditem.get("Table_Style");
    $scope.tablewidth = tableobj.TableWidth; $scope.tableheight = tableobj.TableHeight; $scope.tablcol = tableobj.TableColumns; $scope.tabrowfmt1 = tableobj.TableRows;



    $('#bitree').jstree("destroy");
    $('#bitree').bind('loaded.jstree', function (e, data) {

        //bind properties data to thier respective controls when tree load
        var tablestyle = selecteditem.get("Table_Style");

        $("#tabcol").val(tablestyle.TableColumns); $("#tabrowfmt").val(tablestyle.TableRows); $("#tablewidth").val(tablestyle.TableWidth); $("#tableheight").val(tablestyle.TableHeight);

        //add columnnames to tree dynamically
        var arrdata = selecteditem.get("columns");
        for (var i = 0; i < arrdata.length; i++)
            jQuery("#bitree").jstree(true).create_node($('#Table'), { text: "<span style=' color: #777;' class='columns'>Column:</span><span class='colname'>" + arrdata[i].columnname + "</span>", id: arrdata[i].id }, 'last');
        selecteditem.unset("refresh", { silent: true });
        selecteditem.set({ "refresh": "refresh" });
        $scope.updatethcells();
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

    var element = angular.element('#bidsahboardconfig'); element.modal('show'); $("#previewobject").empty();
    //append control to preview page
    $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {
          var ref = $('#bitree').jstree(true);

          var seltxt = ref.get_selected();
          _parentid = $("#" + seltxt + "").find('span').hasClass("columns");
          _slength = $("#bitree").find(".columns").length; $(".imgvalidate").remove();
          var arrdata = '';

          //bind properties data to thier respective controls on select columns
          if (seltxt.toString().indexOf("_") != -1) {

              $scope.modal.variablestatus = true;
              //insert close img after column  to delete
              if (_slength > 1) {
                  $el = $("#" + seltxt + "").find('a').first();
                  $("<a  class='imgvalidate' style='color:red' title='Remove Selected columns'>X</a>").insertAfter($el);
              }
              //get selected columnid
              var $tableid = $(document.getElementById(selecteditem.get("id")));
              var $selectedth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
              
              updatethclick($selectedth);
              $scope.selecteditem = "Parentcolumn";

              var arrdata = selecteditem.get("columns");
              var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == seltxt.toString(); });
              var connectionid = sinfo.connectionid;
              if (connectionid != "underfined") {
                  var connectionobject = new Array();
                  var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                  var selection = angular.element('#' + sinfo.selectedid + '');
                  connectionobject.push({
                      "DSConnType": selection.attr("data-connectiontype"),
                      "ConnectionID": selection.attr("data-connectionid"),
                      "DSId": selection.attr("data-DSId"),
                      "DSName": selection.attr("data-DSName"),
                      "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                  });
                  $scope.getdata(connectionobject, selection);
                  $("#vf-formula-bar").html(sinfo.formula_template);
              }
              $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true;

              //delete columns
              $(".imgvalidate").click(function () {
                  arrdata = selecteditem.get("columns");
                  _.find(arrdata, function (rw, index) {
                      if (rw.id == seltxt) {
                          arrdata.splice(index, 1); selecteditem.unset("columns", { silent: true }); selecteditem.set({ "columns": arrdata });
                      }
                      return rw.id == seltxt
                  });
                  ref.delete_node([seltxt]);
                  $scope.selected = 1; $scope.selecteditem = "columns";

                 // $("#bitree").jstree("select_node", "#Table").trigger("select_node.jstree");
                  $("#tabcol").val(arrdata.length);
                 
                  for (var i = 0; i < arrdata.length; i++) {
                      $("#" + arrdata[i].id).find('.colname').text(arrdata[i].columnname);

                  }
              });
              $("#tabledatatab").show(); $("#colprop").show(); $("#tabprop").hide(); $scope.selected = 1; $scope.selecteditem = "columns";

              //binding all column properties

              var columnstyle = selecteditem.get("columns"); var th_name = $selectedth.text(); $("#colheader").val(th_name);
              $("#colwidth").val(columnstyle[$selectedth.index()].width);
              $("#tablcb").val(columnstyle[$selectedth.index()].LeftColumnBorder);
              $("#tabrcb").val(columnstyle[$selectedth.index()].RightColumnBorder);
              $("#tabfmtas").val(columnstyle[$selectedth.index()].FormatAs);
              $("#coldecimal").val(columnstyle[$selectedth.index()].Decimals);
              $("#tblPrefix1").val(columnstyle[$selectedth.index()].Prefix);
              $("#tblSuffix1").val(columnstyle[$selectedth.index()].Suffix);
              $("#tabresrw").val(columnstyle[$selectedth.index()].ResultRow);
              $("#fontsize").val(columnstyle[$selectedth.index()].FontSizeVal);
              $("#resprefix").val(columnstyle[$selectedth.index()].ResultPrefix);
              $("#ressufix").val(columnstyle[$selectedth.index()].ResultSuffix);
              $("#tabfmtas").val() == "Number" ? $("#coldecimals").show() : $("#coldecimals").hide();
              $("#color1").val(columnstyle[$selectedth.index()].Fontcolor);
              $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].Fontcolor });
             
              $("#borderstyle").val(columnstyle[$selectedth.index()].Rowborderstyle);
              $("#rowborderwidth").val(columnstyle[$selectedth.index()].Rowborderwidth);
              $("#rwcolr").val(columnstyle[$selectedth.index()].RowBordercolor);
              $("#colorpicktbr").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].RowBordercolor });
             
              $("#hdrbrdrclr").val(columnstyle[$selectedth.index()].HeaderBorderColor);
              $("#header-border-color").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].HeaderBorderColor });
              $(".btn-group").find("button[name=align]").each(function (i) {
                  if ($(this).attr("data-index").trim() == columnstyle[$selectedth.index()].allignment) {
                      $(".btn-group").find(".btn-default").each(function (i) {
                          $(this).removeClass("btn-default");
                      });
                      $(this).addClass("btn-default");
                  }
              });

              if (columnstyle[$selectedth.index()].Fontweight == "bold") {
                  $(".btn-group1").find("#textweight").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textweight").removeClass("btn-default");
              }
              if (columnstyle[$selectedth.index()].Fontstyle == "italic") {
                  $(".btn-group1").find("#textstyle").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textstyle").removeClass("btn-default");
              }
              if (columnstyle[$selectedth.index()].TextDecoration == "underline") {
                  $(".btn-group1").find("#textdecorate").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textdecorate").removeClass("btn-default");
              }
              $("#bordercolor").val(columnstyle[$selectedth.index()].BorderColor);
              $("#f-border_colour").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].BorderColor });

              $("#hdrfntsize").val(columnstyle[$selectedth.index()].HFontSizeVal);
              $(".hdr-btn-group").find("button[name=hdralign]").each(function (i) {
                  if ($(this).attr("data-index").trim() == columnstyle[$selectedth.index()].Hallignment) {
                      $(".hdr-btn-group").find(".btn-default").each(function (i) {
                          $(this).removeClass("btn-default");
                      });
                      $(this).addClass("btn-default");
                  }
              });
              $("#hdrfntclr").val(columnstyle[$selectedth.index()].HFontcolor);
              $("#hdr-font-color").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].HFontcolor });

              $("#backgndcolor").val(columnstyle[$selectedth.index()].BodyBackground);
              $("#f-back_colour").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].BodyBackground });

              $("#hdrbackclr").val(columnstyle[$selectedth.index()].HeaderBackground);
              $("#hdr-back-color").find(".colorPicker-picker").css({ "background-color": columnstyle[$selectedth.index()].HeaderBackground });


              if (columnstyle[$selectedth.index()].HFontweight == "bold") {
                  $(".hdr-btn-group1").find("#hdrtextweight").addClass("btn-default");
              }
              else {
                  $(".hdr-btn-group1").find("#hdrtextweight").removeClass("btn-default");
              }
              if (columnstyle[$selectedth.index()].HFontstyle == "italic") {
                  $(".hdr-btn-group1").find("#hdritalic").addClass("btn-default");
              }
              else {
                  $(".hdr-btn-group1").find("#hdritalic").removeClass("btn-default");
              }
              if (columnstyle[$selectedth.index()].HTextDecoration == "underline") {
                  $(".hdr-btn-group1").find("#hdrundrline").addClass("btn-default");
              }
              else {
                  $(".hdr-btn-group1").find("#hdrundrline").removeClass("btn-default");
              }

              var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
              var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

              if (arrdata[indexselected].Visibility == "") {
                  $('#tblehidecol').prop('checked', false);
              }
              else {
                  $('#tblehidecol').prop('checked', true);
              }

              var Table_Style = selecteditem.get("Table_Style");
              if (Table_Style.ResultVisibility == "none") {
                  $('#rescheck').prop('checked', false);
              }
              else {
                  $('#rescheck').prop('checked', true);
              }
              //unbindind dropdown changing
              $("#tabresrw").unbind('change'); $("#fontsize").unbind('change'); $("#hdrfntsize").unbind('change'); $("#tablcb").unbind('change');
              $("#tabrcb").unbind('change'); $("#tabfmtas").unbind('change'); $("#coldecimal").unbind('change'); $("#colwidth").unbind('change');
              $("#resprefix").unbind('change'); $("#ressufix").unbind('change'); $("#borderstyle").unbind('change');
              //set properties to columns on dropdwn change
              $("#tabresrw").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].ResultRow = $("#tabresrw").val();

                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });
                  var ref = $('#bitree').jstree(true);
                  var seltxt = ref.get_selected();
                  var $tableid = $(document.getElementById(selecteditem.get("id")));
                  var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                  var th_index = $(targetth).index();
                  $('.tablescope').find('tr').each(function () {
                      $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                      $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                  });
              });
              $("#fontsize").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].FontSizeVal = $("#fontsize").val();

                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#hdrfntsize").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].HFontSizeVal = $("#hdrfntsize").val();

                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#tablcb").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].LeftColumnBorder = $("#tablcb").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#tabrcb").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].RightColumnBorder = $("#tabrcb").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#tabfmtas").change(function () {
                  $("#tabfmtas").val() == "Number" ? $("#coldecimals").show() : $("#coldecimals").hide();
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].FormatAs = $("#tabfmtas").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#coldecimal").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].Decimals = parseInt($("#coldecimal").val());
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

              });
              $("#colwidth").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].width = $("#colwidth").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });
              });
              $("#resprefix").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].ResultPrefix = $("#resprefix").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });
              });
              $("#ressufix").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].ResultSuffix = $("#ressufix").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });
              });
              $("#borderstyle").change(function () {
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].Rowborderstyle = $("#borderstyle").val();
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });
              });
              $("#tblehidecol").on("click", function (e) {
                  var sdata = "";
                  if ($(this).is(':checked')) sdata = "none";
                  else sdata = "";
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].Visibility = sdata;
                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

                  var seltxt = ref.get_selected();
                  var $tableid = $(document.getElementById(selecteditem.get("id")));
                  var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                  var th_index = $(targetth).index();
                  $('.tablescope').find('tr').each(function () {
                      $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                      $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                  });
              });
              $("#rescheck").on("click", function (e) {
                  var sdata = "";
                  if ($(this).is(':checked')) sdata = "table";
                  else sdata = "none";
                  var Table_Style = selecteditem.get("Table_Style");
                  Table_Style.ResultVisibility = sdata;

                  selecteditem.unset("Table_Style", { silent: true });
                  selecteditem.set({ "Table_Style": Table_Style });

                  var seltxt = ref.get_selected();
                  var $tableid = $(document.getElementById(selecteditem.get("id")));
                  var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                  var th_index = $(targetth).index();
                  $('.tablescope').find('tr').each(function () {
                      $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                      $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                  });
              });




              //adding controls based on columns count

              var drilldownObj = selecteditem.get("drilldown");

              $("#targetdsboard").val(drilldownObj[$selectedth.index()].DashboardName);

              var drilldownobjcnt = drilldownObj[$selectedth.index()].RequestParameters.length;




              $("#mainParamsDiv").empty(); $("#drillprop").show();
              for (var dd = 0; dd < drilldownobjcnt; dd++) {
                  var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                  var addeditems;
                  addeditems = angular.element($compile('<div id="Div_' + FieldCount + '" class="field" ><div class="prop-label"><label class="labelfiledtab">' + arrdata[dd].columnname + ':</label></div>' +
                                  '<div class="prop-editor" style="margin-left: 66px;margin-top: -33px;">' +
                  '<label id="reqparamlbl_' + FieldCount + '" class="reqparam"  style="height: 25px;"></label>' +
                  '<input data-colid=' + arrdata[dd].id + ' id="reqparam_' + FieldCount + '" class="reqparam" type="text" style="height: 25px;margin-left: 50px;">' +
                  '<button class="borderless reqparamspopup" title="Choose Parameters" ng-click="reqparamspopup(this,$event)"><i class="fa fa-pencil-square-o"></i></button>' +
                   ' </div></div>')($scope));
                  $("#mainParamsDiv").append(addeditems);
                  $("#reqparamlbl_" + FieldCount).val(drilldownObj[$selectedth.index()].RequestParameters[dd].ParameterName);
                  $("#reqparam_" + FieldCount).val(drilldownObj[$selectedth.index()].RequestParameters[dd].ParameterName);
              }
              //hide and show drilldownlink
              if (arrdata[indexselected].ShowDrilldownlink == "hide") {
                  $('#drilllink').prop('checked', false);
              }
              else {
                  $('#drilllink').prop('checked', true); 
              }
              
              $("#drilllink").on("click", function (e) {                 
                  var sdata = "";
                  if ($(this).is(':checked')) sdata = "show";
                  else sdata = "hide";
                  var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
                  var sinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });
                  arrdata[indexselected].ShowDrilldownlink = sdata;

                  selecteditem.unset("columns", { silent: true });
                  selecteditem.set({ "columns": arrdata });

                  var seltxt = ref.get_selected();
                  var $tableid = $(document.getElementById(selecteditem.get("id")));
                  var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                  var th_index = $(targetth).index();
                  $('.tablescope').find('tr').each(function () {
                      $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                      $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                  });
              });
          }
          else if (seltxt == "Table") {
              //bind properties data to thier respective controls on select Table
              arrdata = selecteditem.get("columns");
              $scope.selected = 2; $("#tabprop").show(); $("#tabledatatab").hide(); $("#colprop").hide(); $("#drillprop").hide();
              $("#tabcol").val(arrdata.length);
              var tablestyle = selecteditem.get("Table_Style");            
              $("#tabrowfmt").val(tablestyle.TableRows);
              $("#tablewidth").val(tablestyle.TableWidth);
              $("#tableheight").val(tablestyle.TableHeight);
              $("#tblescroll").val(tablestyle.Scroll);
              $('#tblescroll').prop('checked', true);
              var connectionid = selecteditem.get("columns").connectionid;
              if (connectionid != "underfined") {

                  var connectionobject = new Array();
                  var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                  var selection = angular.element('#' + selecteditem.get("columns").selectedid + '');
                  connectionobject.push({
                      "DSConnType": selection.attr("data-connectiontype"),
                      "ConnectionID": selection.attr("data-connectionid"),
                      "DSId": selection.attr("data-DSId"),
                      "DSName": selection.attr("data-DSName"),
                      "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                  });
                  $scope.getdata(connectionobject, selection);
                  $scope.getdata(connectionobject, selection, selecteditem.get("columns").columnname);
                  selecteditem.set({ datatabs: $scope.datatabs });
                  $("#vf-formula-bar").html(selecteditem.get("columns").formula_template);
                  $scope.selecteditem = "Table";
              }

          }

          $scope.$apply();

          $scope.changedatapoint = function (columnname, range) {
              //get table data when user selected
              var selecteditem = table.byId(table, $scope.view.getSelected().controlid);
              if (columnname.indexOf("@") == -1)
                  columnname = "[" + columnname + "]";

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
                  $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li></ul>');
                  $scope.bindinsertop(); $scope.binddataclick();
              }



              var arrcoldata = selecteditem.get("columns"); var colindexselected; var colref = $('#bitree').jstree(true); var colid = colref.get_selected();
              var colinfo = _.find(arrcoldata, function (rw, index) { colindexselected = index; return rw.id == colid; });
              var $ele = $("#vf-formula-bar").find(".active");
              var datacolname = $("td[p='" + $ele.attr("data-range").split(":")[0] + "0']").html();
              arrcoldata[colindexselected].columnname = datacolname;
              $("#colheader").val(datacolname);
              $("#" + colid).find('.colname').text(arrcoldata[colindexselected].columnname);
              $scope.updatedbconnections();
              selecteditem.unset("columns", { silent: true });
              selecteditem.set({ "columns": arrcoldata });              
              $scope.$apply();
          }
      });

    ///changingproperties

    //allign
    $scope.alignproperties = function () {
        $(".btn-group").find("button[name=align]").on("click", function () {
            $(".btn-group").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");
            $scope.changeproperties();
        });
    };
    //fontweight
    $scope.fweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //fontstyle
    $scope.fstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //fontdecorate
    $scope.fdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //headerallign
    $scope.Halignproperties = function () {
        $(".hdr-btn-group").find("button[name=hdralign]").on("click", function () {
            $(".hdr-btn-group").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");
            $scope.changeproperties();
        });
    };
    //header fontweight
    $scope.Hfweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //headerfontstyle
    $scope.Hfstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //header decorate
    $scope.Hfdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //all change propertis
    $scope.changeproperties = function () {
        if ($scope.selecteditem == "Table") {
            var tabupdateproperties = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                tabupdateproperties.selectedid = selecteddatatab;
                tabupdateproperties.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                tabupdateproperties.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                tabupdateproperties.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                tabupdateproperties.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                tabupdateproperties.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }

            tabupdateproperties.TableWidth = $("#tablewidth").val();
            tabupdateproperties.TableColumns = $("#tabcol").val();
            tabupdateproperties.TableRows = $("#tabrowfmt").val();
            tabupdateproperties.TableHeight = $("#tableheight").val();
            $checkbox = $("#tblescroll").is(":checked");
            tabupdateproperties.Scroll = $checkbox;
            selecteditem.set({ Table_Style: tabupdateproperties });


        }
        else {


            var arrdata = selecteditem.get("columns"); var indexselected; var ref = $('#bitree').jstree(true); var sid = ref.get_selected();
            var colinfo = _.find(arrdata, function (rw, index) { indexselected = index; return rw.id == sid; });

            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                arrdata[indexselected].selectedid = selecteddatatab;
                arrdata[indexselected].connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                arrdata[indexselected].connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                arrdata[indexselected].DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                arrdata[indexselected].DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                arrdata[indexselected].DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }

            //arrdata[indexselected].ResultPrefix = $("#resprefix").val();
            //arrdata[indexselected].ResultSuffix = $("#ressufix").val();
            arrdata[indexselected].columnname = $("#colheader").val();
            //arrdata[indexselected].width = $("#colwidth").val();


            if ($("#textweight").hasClass("btn-default")) {
                arrdata[indexselected].Fontweight = "bold";
            }
            else {
                arrdata[indexselected].Fontweight = "normal";
            }
            if ($("#textstyle").hasClass("btn-default")) {
                arrdata[indexselected].Fontstyle = "italic";
            }
            else {
                arrdata[indexselected].Fontstyle = "unset";
            }
            if ($("#textdecorate").hasClass("btn-default")) {
                arrdata[indexselected].TextDecoration = "underline";
            }
            else {
                arrdata[indexselected].TextDecoration = "unset";
            }

            arrdata[indexselected].Fontcolor = $("#color1").val();

            if ($(".btn-group").find(".btn-default").length > 0)
                arrdata[indexselected].allignment = $(".btn-group").find(".btn-default").attr("data-index").trim();
            else
                arrdata[indexselected].allignment = "center";

            arrdata[indexselected].Prefix = $("#tblPrefix1").val();
            arrdata[indexselected].Suffix = $("#tblSuffix1").val();
            arrdata[indexselected].ResultRow = $("#tabresrw").val();

            if ($("#hdrtextweight").hasClass("btn-default")) {
                arrdata[indexselected].HFontweight = "bold";
            }
            else {
                arrdata[indexselected].HFontweight = "normal";
            }
            if ($("#hdritalic").hasClass("btn-default")) {
                arrdata[indexselected].HFontstyle = "italic";
            }
            else {
                arrdata[indexselected].HFontstyle = "unset";
            }
            if ($("#hdrundrline").hasClass("btn-default")) {
                arrdata[indexselected].HTextDecoration = "underline";
            }
            else {
                arrdata[indexselected].HTextDecoration = "unset";
            }
            arrdata[indexselected].BodyBackground = $("#backgndcolor").val();
            arrdata[indexselected].HeaderBackground = $("#hdrbackclr").val();
            arrdata[indexselected].HFontcolor = $("#hdrfntclr").val();
            arrdata[indexselected].BorderColor = $("#bordercolor").val();
            arrdata[indexselected].HeaderBorderColor = $("#hdrbrdrclr").val();
            //today
            arrdata[indexselected].RowBordercolor = $("#rwcolr").val();
            arrdata[indexselected].Rowborderwidth = $("#rowborderwidth").val();
            // arrdata[indexselected].Rowborderstyle = $("#borderstyle").val();
            //end
            if ($(".hdr-btn-group").find(".btn-default").length > 0)
                arrdata[indexselected].Hallignment = $(".hdr-btn-group").find(".btn-default").attr("data-index").trim();
            else
                arrdata[indexselected].Hallignment = "center";

            selecteditem.unset("columns", { silent: true });
            selecteditem.set({ "columns": arrdata });

            $("#" + sid).find('.colname').text(arrdata[indexselected].columnname);

            var ref = $('#bitree').jstree(true);
            var seltxt = ref.get_selected();
            var $tableid = $(document.getElementById(selecteditem.get("id")));
            var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
            var th_index = $(targetth).index();
            $('.tablescope').find('tr').each(function () {
                $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
            });
        }

    }
    //increse table col dynamically
    $scope.Increasecol = function () {

        var obj = selecteditem.get("columns"); var tablestyle = selecteditem.get("Table_Style");
        var columnsid = "columns_" + $scope.view.getID();
        obj.push({ "id": columnsid, "columns_color": "underfined", "showvaluesonlabel": true, "columnname": "Untitled", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium" });
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": obj });

        var drilldownObj = selecteditem.get("drilldown");
        drilldownObj.push({ "id": columnsid, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] });
        for (var i = 0; i < drilldownObj.length; i++) {
            drilldownObj[i].RequestParameters.push({ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" });
        }
      

        selecteditem.unset("drilldown", { silent: true });
        selecteditem.set({ "drilldown": drilldownObj });
      
        jQuery("#bitree").jstree(true).create_node($('#Table'), { text: "<span style=' color: #777;' class='columns'>Column:</span><span class='colname'>Untitled", id: columnsid }, 'last');
        var arrcoldata = selecteditem.get("columns");
        for (var i = 0; i < arrcoldata.length; i++) {
            $("#" + arrcoldata[i].id).find('.colname').text(arrcoldata[i].columnname);

        }

        $("#tabcol").val(obj.length); $("#tablewidth").val(tablestyle.TableWidth);
        $scope.changeproperties();

    }
    //decrease table col dynamically
    $scope.decreasecol = function () {
        var tablestyle = selecteditem.get("Table_Style");
        var ref = $('#bitree').jstree(true);
        var seltxt = ref.get_selected();
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        var lstcolumid = arrdata[len - 1].id;
        ref.delete_node([arrdata[len - 1].id]);
        arrdata.splice(len - 1, 1); selecteditem.unset("columns", { silent: true }); selecteditem.set({ "columns": arrdata });



        var arrcoldata = selecteditem.get("columns"); 
        for (var i = 0; i < len; i++) {
            $("#" + arrcoldata[i].id).find('.colname').text(arrcoldata[i].columnname);

        }
        $("#tabcol").val(arrdata.length); $("#tablewidth").val(tablestyle.TableWidth);

        var drilldownObj = selecteditem.get("drilldown");
        var len = drilldownObj.length;
        var lstcolumid = drilldownObj[len - 1].id;
        ref.delete_node([drilldownObj[len - 1].id]);
        drilldownObj.splice(len - 1, 1);

        for (var i = 0; i < drilldownObj.length; i++) {
            drilldownObj[i].RequestParameters.splice(drilldownObj.length, 1);
        }       
        selecteditem.unset("drilldown", { silent: true }); selecteditem.set({ "drilldown": drilldownObj });    
      
        $scope.changeproperties();

    }
    //updateconnections
    $scope.updatedbconnections = function () {
        //get formula

        var selecteditem = table.byId(table, $scope.view.getSelected().controlid);
        var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Table") {
            var selecteditem = table.byId(table, $scope.view.getSelected().controlid);
            var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
            var updatedlables = new Object();
            updatedlables.selectedid = selecteddatatab;
            updatedlables.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
            updatedlables.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
            updatedlables.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
            updatedlables.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
            updatedlables.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            updatedlables.formula = formulatext;

            selecteditem.set({ datatabs: $scope.datatabs });
            updatedlables.formula_template = formula_template;
            selecteditem.set({ columns: updatedlables });
        }
        else {
            var ref = $('#bitree').jstree(true);
            var sid = ref.get_selected();
            var arrdata = selecteditem.get("columns");

            var columns = _.find(arrdata, function (rw, index) { return rw.id == sid; });
            var connectionid = columns.connectionid;
            var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
            columns.selectedid = selecteddatatab;
            columns.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
            columns.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
            columns.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
            columns.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
            columns.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            columns.formula = formulatext;

            columns.formula_template = formula_template;
            selecteditem.set({ datatabs: $scope.datatabs });
            _.find(arrdata, function (rw, index) {
                if (rw.id == sid) {
                    selecteditem.unset("columns", { silent: true });
                    arrdata[index] = columns;
                    selecteditem.set({ "columns": arrdata });
                }
                return rw.id == sid;
            });

        }
    }

    //selecting columns when tree col selected
    $scope.updatethcells = function () {

        $('body').on('click', '.tblheaders tbody tr th', function () {

            var th_index = $(this).index();
            $('.tablescope').find('tr').each(function () {
                if ($(this).find('td').eq(th_index).hasClass('cx-table selected-component')) {
                    $(this).find('td').eq(th_index).removeClass('cx-table selected-component');
                } else {
                    $(this).find('td').removeClass('cx-table selected-component');
                    $(this).find('td').eq(th_index).toggleClass('cx-table selected-component');
                }
                if ($(this).find('th').eq(th_index).hasClass('cx-table selected-component')) {
                    $(this).find('th').eq(th_index).removeClass('cx-table selected-component');
                } else {
                    $(this).find('th').removeClass('cx-table selected-component');
                    $(this).find('th').eq(th_index).toggleClass('cx-table selected-component');
                }
            });
            $(document.getElementById($(this).attr("data-thid"))).find('a').first().click();

        });

    }
    //delete control
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }
    //addcol to tree
    $("#addtotree").click(function () {
        bootbox.prompt("Enter Column Name", function (result) {
            if (result != null) {
                if (result != "") {
                    var obj = selecteditem.get("columns"); var tablestyle = selecteditem.get("Table_Style");
                    var columnsid = "columns_" + $scope.view.getID();

                    obj.push({ "id": columnsid, "columns_color": "underfined", "showvaluesonlabel": true, "columnname": result, "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "ColumnHeader": "", "width": "25%", "FormatAs": "Text", "allignment": "center", "Prefix": "", "Suffix": "", "ResultRow": "Empty", "FontSize": "0.9", "Fontstyle": "unset", "TextDecoration": "unset", "Fontweight": "bold", "Fontcolor": "#000000", "Visibility": "", "LeftColumnBorder": "1px", "RightColumnBorder": "0px", "HFontSize": "0.9", "HFontstyle": "unset", "HTextDecoration": "unset", "HFontweight": "bold", "HFontcolor": "#000000", "Hallignment": "center", "BorderColor": "", "HeaderBackground": "", "BodyBackground": "", "Total": "", "ResultPrefix": "", "ResultSuffix": "", "HeaderBorderColor": "", "RowBordercolor": "", "Rowborderwidth": "1", "Rowborderstyle": "solid", "Linehieght": "140", "FontSizeVal": "Small", "HLinehieght": "140", "HFontSizeVal": "Medium" });
                    selecteditem.unset("columns", { silent: true });
                    selecteditem.set({ "columns": obj });
                    var drilldownObj = selecteditem.get("drilldown");
                    drilldownObj.push({ "id": columnsid, "DashboardId": "", "DashboardName": "", "RequestParameters": [{ "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }, { "ParameterName": "", "ParameterValue": "", "variabletype": "cv" }] });

                    selecteditem.unset("drilldown", { silent: true });
                    selecteditem.set({ "drilldown": drilldownObj });
                    jQuery("#bitree").jstree(true).create_node($('#Table'), { text: "<span style=' color: #777;' class='columns'>Column:</span><span class='colname'>" + result, id: columnsid }, 'last');
                    var arrcoldata = selecteditem.get("columns");
                    for (var i = 0; i < arrcoldata.length; i++) {
                        $("#" + arrcoldata[i].id).find('.colname').text(arrcoldata[i].columnname);

                    }



                    $(document.getElementById(columnsid)).find('a').first().click();
                    $("#tabcol").val(obj.length); $("#tablewidth").val(tablestyle.TableWidth);
                }
            }
        });

    });
    //selecting column
    function updatethclick($targetth) {
        var th_index = $targetth.index();
        $('.tablescope').find('tr').each(function () {
            if ($(this).find('td').eq(th_index).hasClass('cx-table tblheaders selected-component')) {
                $(this).find('td').eq(th_index).removeClass('cx-table tblheaders selected-component');
            } else {
                $(this).find('td').removeClass('cx-table selected-component');
                $(this).find('td').eq(th_index).toggleClass('cx-table tblheaders selected-component');
            }
            if ($(this).find('th').eq(th_index).hasClass('cx-table tblheaders selected-component')) {

                $(this).find('th').eq(th_index).removeClass('cx-table tblheaders selected-component');
            } else {
                $(this).find('th').removeClass('cx-table tblheaders selected-component');
                $(this).find('th').eq(th_index).toggleClass('cx-table tblheaders selected-component');
            }
        });
    }
    ///change properties to all columns
    $scope.AllcolwidthPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].width = $("#colwidth").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllrowbordercolrPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].RowBordercolor = $("#rwcolr").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllrowborderwidthPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].Rowborderwidth = $("#rowborderwidth").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllrowborderstylePropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].Rowborderstyle = $("#borderstyle").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodyallignPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            if ($(".btn-group").find(".btn-default").length > 0)
                arrdata[i].allignment = $(".btn-group").find(".btn-default").attr("data-index").trim();
            else
                arrdata[i].allignment = "center";


        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodyfontsizePropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].FontSizeVal = $("#fontsize").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodyfontstylePropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            if ($("#textweight").hasClass("btn-default")) {
                arrdata[i].Fontweight = "bold";
            }
            else {
                arrdata[i].Fontweight = "normal";
            }
            if ($("#textstyle").hasClass("btn-default")) {
                arrdata[i].Fontstyle = "italic";
            }
            else {
                arrdata[i].Fontstyle = "unset";
            }
            if ($("#textdecorate").hasClass("btn-default")) {
                arrdata[i].TextDecoration = "underline";
            }
            else {
                arrdata[i].TextDecoration = "unset";
            }

        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodyfontcolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].Fontcolor = $("#color1").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodybordercolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].BorderColor = $("#bordercolor").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllbodybackcolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].BodyBackground = $("#backgndcolor").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrallignmentPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            if ($(".hdr-btn-group").find(".btn-default").length > 0)
                arrdata[i].Hallignment = $(".hdr-btn-group").find(".btn-default").attr("data-index").trim();
            else
                arrdata[i].Hallignment = "center";

        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrfontsizePropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].HFontSizeVal = $("#hdrfntsize").val();

        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrfontstylePropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            if ($("#hdrtextweight").hasClass("btn-default")) {
                arrdata[i].HFontweight = "bold";
            }
            else {
                arrdata[i].HFontweight = "normal";
            }
            if ($("#hdritalic").hasClass("btn-default")) {
                arrdata[i].HFontstyle = "italic";
            }
            else {
                arrdata[i].HFontstyle = "unset";
            }
            if ($("#hdrundrline").hasClass("btn-default")) {
                arrdata[i].HTextDecoration = "underline";
            }
            else {
                arrdata[i].HTextDecoration = "unset";
            }
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrfontcolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].HFontcolor = $("#hdrfntclr").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrbackcolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].HeaderBackground = $("#hdrbackclr").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllhdrbordercolorPropoerties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].HeaderBorderColor = $("#hdrbrdrclr").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllleftcolborderProperties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].LeftColumnBorder = $("#tablcb").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
    $scope.AllrightcolborderProperties = function () {
        var arrdata = selecteditem.get("columns");
        var len = arrdata.length;
        for (var i = 0; i < len; i++) {
            arrdata[i].RightColumnBorder = $("#tabrcb").val();
        }
        selecteditem.unset("columns", { silent: true });
        selecteditem.set({ "columns": arrdata });
    }
};









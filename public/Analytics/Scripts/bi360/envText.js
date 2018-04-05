
function envText($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;

    $("#previewobject").empty();

    if (controlid == "new")//Creating new Control
    {
        text.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            texttype: { "type": "manual" },
            data_column_values: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "manualtext": "" },
            style: { "position": "absolute", "width": "100%", "height": "35", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "pairsaparation": "10px", "BackgroundColor": "", "BorderColor": "#000000", "BorderStyle": "none", "BorderWidth": "1" },
            primary_style: { "FormatAs": "select", "allignment": "left", "FontSize": "Medium", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#000000", "prefix": "", "suffix": "", "Decimal": "0", "HfontSize": "0.9", "HLinehieght": "140", "RadioVal": "", "FromUrl": "", "DashBoardValue": "undefined", "DashBoardId": "undefined", "lblimgsrc": "undefined", "lblimgpos": "right" },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = text.byId(text, Controlid);
    } else {
        //$("#previewobject").empty();
        selecteditem = text.byId(text, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
        //clone object  
        $("#previewobject").empty();
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));
    }

    $http.get('../Analytics/Bi360Templates/Tabs/envTextTabs.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));
        $scope.LoadVariable();

    });
    //initializes tab index to 2.
    $scope.selected = 2;
    $scope.selecteditem = "Text";
    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $("#textprop").show();
    $("#tab-properties").hide();

    $("#tab-indicators").hide();
    $("#indicators").hide();

    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "Text", "parent": "#", "text": "Text", 'state': { 'opened': true, 'selected': true } },
               { "id": "Values", "parent": "Text", "text": "Values" }

    ];
    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        $("#color2").val(newtextstyel.BackgroundColor);
        $("#colorpick").find(".colorPicker-picker").css({ "background-color": newtextstyel.BackgroundColor });
        $("#color3").val(newtextstyel.BorderColor);
        $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
        $("#borderstyle").val(newtextstyel.BorderStyle);
        $("#borderwidth").val(newtextstyel.BorderWidth);
        $("#stylewidth").val(parseInt(newtextstyel.width));
        $("#styleheight").val(newtextstyel.height);
        $("#tab-indicators").hide();
        $("#indicators").hide();
        $("#textprop").show();
        $("#tab-properties").hide();
        $("#FrmUrl").val("");
        $("#FrmDashBoard").val("");
        $("#TargetDashBoardId").val("");
        $("#FromUrl").prop("checked", false);
        $("#DashBoard").prop("checked", false);
        //$("#PfixSfix").hide();
        //$scope.modalq = { presuffixstatus: true };
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
    //showing popup..
    var element = angular.element('#bidsahboardconfig');
    if (controlid != "new")
        element.modal('show');

    //clone object      
    $("#previewobject").empty();
    $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));


    //bind properties if control is existing............
    if (controlid != "new") {
        Controlid = controlid;
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }
    var textobj = selecteditem.get("style");
    $scope.width = textobj.width;
    $scope.height = textobj.height;
    $scope.bgcolor = textobj.BackgroundColor;
    $scope.bdcolor = textobj.BorderColor;
    $scope.brstyle = textobj.BorderStyle;
    $scope.brwidth = parseInt(textobj.BorderWidth);

    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {
          var ref = $('#bitree').jstree(true);
          var sel = ref.get_selected();
          if (sel == "Text") {
              $scope.selecteditem = "Text";
              $scope.selected = 2;
              $("#Textdatatab").hide();
              $("#Textproperiestab").show();
              $(document.getElementById("Textproperiestab")).click();

              $("#VFormula-menu").hide();
              $("#vf-formula-bar").hide();
              $("#textprop").show();
              $("#tab-properties").hide();

              var newtextstyel = selecteditem.get("style");
              $("#color2").val(newtextstyel.BackgroundColor);
              $("#colorpick").find(".colorPicker-picker").css({ "background-color": newtextstyel.BackgroundColor });
              $("#color3").val(newtextstyel.BorderColor);
              $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
              $("#borderstyle").val(newtextstyel.BorderStyle);
              $("#borderwidth").val(newtextstyel.BorderWidth);
              $("#stylewidth").val(parseInt(newtextstyel.width));
              $("#styleheight").val(parseInt(newtextstyel.height));

          } else if (sel == "Values") {
              //alert(selecteditem);
              $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
              $scope.selected = 1;

              $("#Textdatatab").show(); $("#Textproperiestab").show(); $("#VFormula-menu").show(); $("#vf-formula-bar").show(); $("#tab-properties").show(); $("#textprop").hide();
              $("#tab-indicators").hide(); $("#indicators").hide();
              $scope.selecteditem = "Values";
              var connectionid = selecteditem.get("data_column_values").connectionid;
              var primeobj = selecteditem.get("primary_style");
              $("#fmtas").val(primeobj.FormatAs);
              $("#fmtas").val() == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide(), $("#FromUrlTextBox").hide(), $("#FromDashBoard").hide();
              // $("#fmtas").val() == "Hyperlink" ? $("#Hyperlink").show() : $("#Hyperlink").hide();


              if (primeobj.FormatAs == "Hyperlink") {
                  $("#Hyperlink").show();
                  if (primeobj.RadioVal == "FromUrl") {
                      $("#FromUrl").prop('checked', true);
                      $("#FromUrlTextBox").show();
                      $("#FrmUrl").val(primeobj.FromUrl);
                      $("#FromDashBoard").hide();
                  } else if (primeobj.RadioVal == "DashBoard") {
                      $("#DashBoard").prop('checked', true);
                      $("#FromDashBoard").show();
                      $("#FrmDashBoard").val(primeobj.DashBoardValue);
                      $("#TargetDashBoardId").val(primeobj.DashBoardId);
                      $("#FromUrlTextBox").hide();


                  }
              }


              //   $("#FromUrl").val() == "FromUrl" ? $("#FromUrlTextBox").show() : $("#FromUrlTextBox").hide();
              //$("#FromUrl").click(function () {
              //    $("#FromUrlTextBox").show();
              //    $("#FromDashBoard").hide();
              //});
              //$("#DashBoard").click(function () {
              //    $("#FromUrlTextBox").hide();
              //    $("#FromDashBoard").show();
              //});
              $(".btn-group").find("button[name=align]").each(function (i) {
                  if ($(this).attr("data-index").trim() == primeobj.allignment) {
                      $(".btn-group").find(".btn-default").each(function (i) {
                          $(this).removeClass("btn-default");
                      });
                      $(this).addClass("btn-default");
                  }
              });
              if (primeobj.Fontweight == "bold") {
                  $(".btn-group1").find("#textweight").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textweight").removeClass("btn-default");
              }
              if (primeobj.Fontstyle == "italic") {
                  $(".btn-group1").find("#textstyle").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textstyle").removeClass("btn-default");
              }
              if (primeobj.TextDecoration == "underline") {
                  $(".btn-group1").find("#textdecorate").addClass("btn-default");
              }
              else {
                  $(".btn-group1").find("#textdecorate").removeClass("btn-default");
              }
              $("#allignment").val(primeobj.allignment);
              $("#fontsize").val(primeobj.FontSize);
              $("#fontstyle").val(primeobj.Fontstyle);
              $("#color1").val(primeobj.Fontcolor);
              $(".colorPicker-picker").css({ "background-color": primeobj.Fontcolor });
              $("#prefix").val(primeobj.prefix);
              $("#suffix").val(primeobj.suffix);
              $("#fmtfamily").val(primeobj.FontFamily);

              $("#lblimghidden").val(primeobj.lblimgsrc);
              $(".imgpos-lbl").find("button[name=lblimgpos]").each(function (i) {
                  if ($(this).attr("data-index").trim() == primeobj.lblimgpos) {
                      $(".imgpos-lbl").find(".btn-default").each(function (i) {
                          $(this).removeClass("btn-default");
                      });
                      $(this).addClass("btn-default");
                  }
              });          



              $("#numberDecimal").val(parseInt(primeobj.Decimal));
              // var connectionid = selecteditem.get("data_column_values").connectionid;
              if (connectionid != "underfined") {
                  var connectionobject = new Array();
                  var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                  var selection = angular.element('#' + selecteditem.get("data_column_values").selectedid + '');
                  connectionobject.push({
                      "DSConnType": selection.attr("data-connectiontype"),
                      "ConnectionID": selection.attr("data-connectionid"),
                      "DSId": selection.attr("data-DSId"),
                      "DSName": selection.attr("data-DSName"),
                      "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                  });
                  $scope.getdata(connectionobject, selection);
                  $("#vf-formula-bar").html(selecteditem.get("data_column_values").formula_template);
              }


              $scope.modal.tablestatus = true;
              $scope.modal.expressionstatus = true;
              $scope.modal.strnumstatus = true;
              $scope.modal.variablestatus = true;
          }
      });
    $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick();
    $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick(); $scope.bindvaribleclick();

    $scope.$apply();
    //.................................lblimgremove .........................//
    $scope.lblimgremove = function () {
        var primeobj = selecteditem.get("primary_style");        
        if ((primeobj.lblimgsrc != "undefined")) {
            var $lblimgelement = $(document.getElementById(Controlid)).parent();
            if ($lblimgelement.children().children().hasClass("lblinnerimgspan")) {
                $lblimgelement.find(".lblinnerimgspan").each(function () {
                    $(this).remove();
                });
                $('#lblimghidden').val("");
                primeobj.lblimgsrc = "undefined";
                selecteditem.unset("primary_style", { silent: true });
                selecteditem.set({ "primary_style": primeobj });
            }
        }
    };



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
            $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li></ul>');
            $scope.bindinsertop(); $scope.binddataclick();
        }
        //end of table clcik
        $scope.updatedbconnections();
        $scope.$apply();
    }

    $scope.alignproperties = function () {
        $(".btn-group").find("button[name=align]").on("click", function () {
            $(".btn-group").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");
            //var align = $(this).attr("data-index").trim();  
            $scope.changeproperties();
        });
    };

    $scope.fweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.fstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.fdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.changeproperties = function () {


        if ($scope.selecteditem == "Text") {
            //  alert(selecteditem);
            var textupdateproperties = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                textupdateproperties.selectedid = selecteddatatab;
                textupdateproperties.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                textupdateproperties.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                textupdateproperties.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                textupdateproperties.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                textupdateproperties.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }
            textupdateproperties.pairsaparation = $("#divsaparatenum").val();
            textupdateproperties.BackgroundColor = $("#color2").val();
            textupdateproperties.BorderColor = $("#color3").val();
            textupdateproperties.BorderStyle = $("#borderstyle").val();
            textupdateproperties.BorderWidth = $("#borderwidth").val();
            textupdateproperties.width = $("#stylewidth").val();
            textupdateproperties.height = $("#styleheight").val();
            selecteditem.set({ style: textupdateproperties });
        }
        else if ($scope.selecteditem == "Values") {
            var updateproperties = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                updateproperties.selectedid = selecteddatatab;
                updateproperties.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                updateproperties.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                updateproperties.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                updateproperties.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                updateproperties.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }
            updateproperties.FormatAs = $("#fmtas").val();
            if ($(".btn-group").find(".btn-default").length > 0)
                updateproperties.allignment = $(".btn-group").find(".btn-default").attr("data-index").trim();
            else
                updateproperties.allignment = "center";
            updateproperties.FontSize = $("#fontsize").val();

            if ($("#textweight").hasClass("btn-default")) {
                updateproperties.Fontweight = "bold";
            }
            else {
                updateproperties.Fontweight = "normal";
            }
            if ($("#textstyle").hasClass("btn-default")) {
                updateproperties.Fontstyle = "italic";
            }
            else {
                updateproperties.Fontstyle = "unset";
            }
            if ($("#textdecorate").hasClass("btn-default")) {
                updateproperties.TextDecoration = "underline";
            }
            else {
                updateproperties.TextDecoration = "unset";
            }
            updateproperties.Fontcolor = $("#color1").val();
            updateproperties.FontFamily = $("#fmtfamily").val();

            var DropDownVal = $("#fmtas").val();

            if (DropDownVal == "Text" || "Currency" || "Percentage" || "Image URL" || "Date/Time" || "Duration" || "Raw") {
                $("#textdecimals").hide();
                $("#FromUrlTextBox").hide();
                $("#FromDashBoard").hide();
                $("#Hyperlink").hide();
            }
            if (DropDownVal == "Hyperlink") {
                $("#textdecimals").hide();
                $("#Hyperlink").show();
                $("#FromUrlTextBox").hide();
                $("#FromDashBoard").hide();
            }
            else {
                $("#textdecimals").hide();
                $("#Hyperlink").hide();
                $("#FromUrlTextBox").hide();
                $("#FromDashBoard").hide();
            }


            DropDownVal == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide();
            DropDownVal == "Hyperlink" ? $("#Hyperlink").show() : $("#Hyperlink").hide();

            if ($("#FromUrl").prop('checked')) {
                if ($("#fmtas").val() == "Hyperlink") {
                    $("#FromUrlTextBox").show();
                } else {
                    $("#FromUrlTextBox").hide();
                }
            }
            if ($("#DashBoard").prop('checked')) {
                if ($("#fmtas").val() == "Hyperlink")
                    $("#FromDashBoard").show();
                var DSID = $("#TargetDashBoardId").val();
                if (DSID == "") {
                    updateproperties.DashBoardId = "undefined";
                } else {
                    updateproperties.DashBoardId = $("#TargetDashBoardId").val();
                    updateproperties.DashBoardValue = $("#FrmDashBoard").val();
                }
                updateproperties.RadioVal = $('input[name= FileSelection]:checked').val();
            }

            updateproperties.prefix = $("#prefix").val();
            updateproperties.suffix = $("#suffix").val();
            updateproperties.Decimal = $("#numberDecimal").val();
            updateproperties.RadioVal = $('input[name= FileSelection]:checked').val();
            //alert($('input[name= FileSelection]:checked').val());
            // alert("js" + updateproperties.RadioVal);
            updateproperties.FromUrl = $("#FrmUrl").val();
            updateproperties.lblimgsrc = $('#lblimghidden').val();
            updateproperties.lblimgpos = $(".imgpos-lbl").find(".btn-default").attr("data-index").trim();
            selecteditem.set({ primary_style: updateproperties });
        }
    };
    //================================================Code For Dashboard View
    $scope.Dashboardlist = function (type) {
        $http.post('/Home/GetDashboard').success(function (data) {
            if (data.responsedashboards) {
                fn_Make_Dashboards_DataTable(data.responsedashboards);
                //$scope.DashboardList = JSON.parse(data.responsedashboards).NewDataSet["Table"];
                if (type == "menu") {
                    var element = angular.element('#mymodalfordashboards');
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
                        var d = ('<button class="borderless dashboardpopup" title="View Selected widgets"  data-selectdashboard=\'' + JSON.stringify(oObj) + '\'><i class="fa fa-pencil-square-o"></i></button>');
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
    function update_editdashboard() {
        $(".dashboardpopup").unbind("click");
        $(".dashboardpopup").click(function () {
            var viewparameters = JSON.parse($(this).attr("data-selectdashboard"));
            $("#TargetDashBoardId").val(viewparameters.DsahboardId);
            $("#FrmDashBoard").val(viewparameters.Dashboard_name);
            var dashboarddata = selecteditem.get("primary_style");
            //dashboarddata.DashBoardValue = viewparameters.Dashboard_name;
            dashboarddata.DashBoardId = viewparameters.DsahboardId;
            dashboarddata.RadioVal = $('input[name= FileSelection]:checked').val();
            selecteditem.unset("primary_style", { silent: true });
            selecteditem.set({ "primary_style": dashboarddata });
            // $scope.changeproperties();
            // alert(JSON.stringify(selecteditem.get("drilldown")));
            var element = angular.element('#mymodalfordashboards');
            element.modal('hide');
        });
    }
    $scope.gridclose = function () {
        var element = angular.element('#mymodalfordashboards');
        element.modal('hide');
    };
    //==================================================================Dashbord view close

    $scope.updatedbconnections = function () {
        //get formula       
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Values") {
            // alert(selecteditem);
            //var selecteditem = text.byId(text, $scope.view.getSelected().controlid);
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
            selecteditem.set({ datatabs: $scope.datatabs });
            selecteditem.set({ data_column_values: updatedlables });
        }
    }


    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }

    $scope.radioclick = function () {
        if ($('input[name= FileSelection]:checked').val() == "FromUrl") {
            $("#FromUrlTextBox").show();
            $("#FromDashBoard").hide();
        } else if ($('input[name= FileSelection]:checked').val() == "DashBoard") {
            $("#FromDashBoard").show();
            $("#FromUrlTextBox").hide();
        }
        $scope.changeproperties();
    }

    $scope.LblImageFileUpload = function () {
        var uplodfile = $('#lblimagefile').val();
        var file_data = $("#lblimagefile").prop("files")[0]; // Getting the properties of file from file field
        var form_data = new FormData(); // Creating object of FormData class
        form_data.append("file", file_data);
        if (uplodfile == "") {
            alert("Select a file");
        } else {
            $.ajax({
                type: 'POST',
                url: '../../imagefileupload/LblimageFileUpload',
                contentType: false,
                processData: false,
                cache: false,
                data: form_data,
                success: function (data) {
                    if (data == "Fail") {
                        alert("Uploading Fail");
                    } else if (data == "Exist") {
                        alert("Image already Exist");
                    }

                    var src = "../../LblImgFiles/" + data;
                    $('#lblimghidden').val(src);
                    $('#lblimagefile').val("");
                    $scope.changeproperties();
                }
            });
        }
    };



    //..label imgposition...//
    $scope.lblimgpos = function () {
        $(".imgpos-lbl").find("button[name=lblimgpos]").on("click", function () {
            $(".imgpos-lbl").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");
            $scope.changelabelimgpos();
        });
    };

    $scope.changelabelimgpos = function () {
        var primeobj = selecteditem.get("primary_style");
        primeobj.lblimgpos = $(".imgpos-lbl").find(".btn-default").attr("data-index").trim();
        selecteditem.unset("primary_style", { silent: true });
        selecteditem.set({ "primary_style": primeobj });
    };

    //..lebel imgposition ended...//
};







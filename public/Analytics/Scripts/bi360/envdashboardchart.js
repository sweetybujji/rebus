function envdashboardchart($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {

    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    //........ adding control to backbone model .............//
    //alert(dropeditem);
    if (controlid == "new")//Creating new Control
    {
        dashboardchart.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_parametervalues: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "primaryconditions": [{ parameters: [{ "id": Controlid, "parametername": "", "parametervalue": "" }] }] },
            //data_column_secondaryvalues: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "secondaryconditions": [{ secondpredicates: [{ "id": Controlid, "type": "is greater than", "value": "" }] }] },
            style: { "url": "", "position": "absolute", "width": "100%", "height": "500", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "pairsaparation": "10px", "BackgroundColor": "#ffffff", "BorderColor": "#ffffff", "BorderStyle": "dashed", "BorderWidth": "1" },
            primary_style: { "FormatAs": "Text", "allignment": "center", "FontSize": "2", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#3366ff", "prefix": "", "suffix": "", "Decimal": "0" },
            //secondary_style: { "FormatAs": "Text", "allignment": "center", "FontSize": "3", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#008080", "prefix": "", "suffix": "", "Decimal": "0" },
            datatabs: [],
            //primaryconditions: [],
            //secondaryconditions: [],
            target: target,
            type: type
        }]);
        selecteditem = dashboardchart.byId(dashboardchart, Controlid);
    }
    else {
        selecteditem = dashboardchart.byId(dashboardchart, $scope.view.getSelected().controlid);
    }

    $scope.modalq = { presuffixstatus: true };

    // ......... For loading html template with preview and properties tree.................//

    $http.get('../Analytics/Bi360Templates/Tabs/DashboardTabs.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));

        // ......... For Loading Variables for Parameters Config.................//
        $scope.LoadVariable();
        // ......... For Loading Variables for Parameters Config Ended.................//


        //initializes tab index to 2.
        $scope.selected = 2;
        $scope.selecteditem = "DashboardChart";
        $("#VFormula-menu").hide();
        $("#vf-formula-bar").hide();
        $("#dashboardchartdatatab").hide();
        $("#vpairtab-properties").hide(); $("#dashboardchartparamtab").hide();
        $("#valuepairprop").show();

        $("#treeid").html($compile('<div id="bitree" > </div>')($scope));

        //tree data
        var data = [
                   { "id": "DashboardChart", "parent": "#", "text": "Dashboard", 'state': { 'opened': true, 'selected': true } },
                   { "id": "ParameterValues", "parent": "DashboardChart", "text": "Parameter Values" }
                   //{ "id": "SecondaryValues", "parent": "Dashboard", "text": "Secondary Values" }
        ];
        //..construct tree by using jquery plugun..//
        $('#bitree').bind('loaded.jstree', function (e, data) {
            var valuepairobj = selecteditem.get("style");
            $("#divsaparatenum").val(parseInt(valuepairobj.pairsaparation));
            $("#color2").val(valuepairobj.BackgroundColor);
            $("#colorpick").find(".colorPicker-picker").css({ "background-color": valuepairobj.BackgroundColor });
            $("#color3").val(valuepairobj.BorderColor);
            $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": valuepairobj.BorderColor });
            $("#borderstyle").val(valuepairobj.BorderStyle);
            $("#borderwidth").val(valuepairobj.BorderWidth);
            //$("#stylewidth").val(parseInt(valuepairobj.width));
            $("#ds_url").val(valuepairobj.url);
            $("#styleheight").val(parseInt(valuepairobj.height));
            $("#dashboardchartparamtab").hide();
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
        //..construct tree by using jquery plugun ended..//

        //......Auto Open preview html template popup ..//
        var element = angular.element('#bidsahboardconfig');
        element.modal('show'); $("#previewobject").empty();
        //......Auto Open preview html template popup ended ..//


        //clone object   
        //$("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

        //bind properties if control is existing............//
        if (controlid != "new") {
            Controlid = controlid;
            if (selecteditem.get("datatabs").length > 0) {
                $scope.datatabs = selecteditem.get("datatabs");
            }
        }
        var primeObj = selecteditem.get("data_column_parametervalues");
        //alert(primeObj);
        //.....Selecting Treenode and thier functionalities ..//

        $("#bitree").bind(
          "select_node.jstree", function (evt, data) {
              var ref = $('#bitree').jstree(true);
              var sel = ref.get_selected();
              if (sel == "DashboardChart") {
                  $scope.selected = 2;
                  $("#dashboardchartdatatab").hide(); $("#dashboardchartproperiestab").show(); $("#dashboardchartparamtab").hide();
                  $("#valuepairprop").show(); $("#vpairtab-properties").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                  $scope.selecteditem = "DashboardChart"; $("#parameterspropertab").hide();
                  var valuepairobj = selecteditem.get("style");
                  $("#divsaparatenum").val(parseInt(valuepairobj.pairsaparation));
                  $("#color2").val(valuepairobj.BackgroundColor);
                  $("#colorpick").find(".colorPicker-picker").css({ "background-color": valuepairobj.BackgroundColor });
                  $("#color3").val(valuepairobj.BorderColor);
                  $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": valuepairobj.BorderColor });
                  $("#borderstyle").val(valuepairobj.BorderStyle);
                  $("#borderwidth").val(valuepairobj.BorderWidth);

                  $("#ds_url").val(valuepairobj.url);
                  //$("#stylewidth").val(parseInt(valuepairobj.width));
                  $("#styleheight").val(parseInt(valuepairobj.height));
                  $("#dashboardchartproperiestab").text("Properties");
                  $(document.getElementById("dashboardchartproperiestab")).click();

                  $scope.modal.tablestatus = false;
                  $scope.modal.expressionstatus = true;
                  $scope.modal.strnumstatus = true;
                  $scope.modal.variablestatus = true;

              } else if (sel == "ParameterValues") {



                  //$("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
                  $scope.selected = 2;
                  $("#dashboardchartdatatab").hide(); $("#dashboardchartproperiestab").show(); $("#dashboardchartparamtab").hide();
                  $("#valuepairprop").hide(); $("#vpairtab-properties").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                  $scope.selecteditem = "DashboardChart"; $("#parameterspropertab").show();
                  $scope.selecteditem = "ParameterValues";
                  var connectionid = selecteditem.get("data_column_parametervalues").connectionid;                 
                  //$("#dashboardchartparamtab").show();                  
                  $("#dashboardchartproperiestab").text("Parameters");
                  //$("#tabstripmenu").hide();
                 // $("#valuepairindicators").show();
                  //$(document.getElementById("dashboardchartparamtab")).click();
                  //alert("ss");
                  $scope.modal.tablestatus = false;
                  $scope.modal.expressionstatus = true;
                  $scope.modal.strnumstatus = true;
                  $scope.modal.variablestatus = true;

                  //$(document.getElementById("dashboardchartdatatab")).click();
                  // //.................................indicators code................................................//

                  // //.................................indicators update code................................................//

                  var primeObj = selecteditem.get("data_column_parametervalues");
                  //alert(primeObj);
                  var primeobjprcnt = primeObj.primaryconditions[0].parameters.length;

                  $("#mainDiv").empty();
                  $("#subdiv").empty();

                  if (primeobjprcnt >= 1) {
                      for (var pr = 0; pr < primeobjprcnt; pr++) {
                          var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                          var addeditems;
                          if (pr == 0) {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>Parameter</span>" +
                                  "<input id='parameternameText_" + FieldCount + "' class='parametername' placeholder='parametername' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<input id='parametervalueText_" + FieldCount + "' class='parametervalue' placeholder='parametervalue'  style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  //"<option value='Textselect' selected='selected'>PrimaryValues</option><option value='Textselect'>SecondaryValues</option></select>" +
                                  //"<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  //"<option value='is equal to'>is equal to </option>" +
                                  //"<option value='is not equal to'>is not equal to </option>" +
                                  //"<option value='is greater than' selected='selected'>is greater than</option>" +
                                  //"<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  //"<option value='is less than'>is less than</option>" +
                                  //"<option value='is less than or equal to'>is less than or equal to</option>" +
                                  //"<option value='contains'>contains</option>" +
                                  //"<option value='does not contain'>does not contain</option>" +
                                  //"</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          else {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>Parameter</span>" +
                                  "<input id='parameternameText_" + FieldCount + "' class='parametername' placeholder='parametername' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<input id='parametervalueText_" + FieldCount + "' class='parametervalue' placeholder='parametervalue' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  //"<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  //"<option value='is equal to'>is equal to </option>" +
                                  //"<option value='is not equal to'>is not equal to </option>" +
                                  //"<option value='is greater than' selected='selected'>is greater than</option>" +
                                  //"<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  //"<option value='is less than'>is less than</option>" +
                                  //"<option value='is less than or equal to'>is less than or equal to</option>" +
                                  //"<option value='contains'>contains</option>" +
                                  //"<option value='does not contain'>does not contain</option>" +
                                  //"</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          $("#mainDiv").append(addeditems);
                          //alert(primeObj.primaryconditions[0].parameters[pr].parametername);
                          //alert(primeObj.primaryconditions[0].parameters[pr].parametervalue);
                          $("#parameternameText_" + FieldCount).val(primeObj.primaryconditions[0].parameters[pr].parametername);
                          $("#parametervalueText_" + FieldCount).val(primeObj.primaryconditions[0].parameters[pr].parametervalue);
                      }
                      $scope.changeindicateprediactes();
                      //primeObj.Control = sel;
                      //selecteditem.unset("data_column_primaryvalues", { silent: true });
                      //selecteditem.set({ "data_column_primaryvalues": primeobj });
                      //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
                  }
              }

              //$scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick();
              //$scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick();
          });
        // $scope.$apply();
    });
    //.....Selecting Treenode and thier functionalities ended..//
    var primeObj = selecteditem.get("data_column_parametervalues");
    //alert(primeObj);
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
            $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../Analytics/temp/prompt.gif"></li></ul>');
            $scope.bindinsertop(); $scope.binddataclick();
        }
        //end of table clcik
        $scope.updatedbconnections();
        //  $scope.$apply();
    }
    //..data selection ended...//

    //..alignproperties...//
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
    //..alignproperties ended...//  

    //..font weight properties...//
    $scope.fweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //..font weight properties ended...//

    //..font style properties...//
    $scope.fstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //..font style properties ended...//

    //..font decoration properties...//
    $scope.fdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //..font decoration properties ended...//

    //..update properties...//
    $scope.changeproperties = function () {
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
        //else {          //hiddenmanual
        //    updateproperties.manualText = $("#" + Controlid).find('.label-inner-1').text();
        //}


        updateproperties.FormatAs = $("#fmtas").val();
        var DropDownVal = $("#fmtas").val();
        //$("#fmtas").val() == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide(), $("#FromUrlTextBox").hide(), $("#FromDashBoard").hide();

        if (DropDownVal == "Text" || "Currency" || "Percentage" || "Image URL" || "Date/Time" || "Duration" || "Raw") {
            $("#textdecimals").hide();
        }
        DropDownVal == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide();

        updateproperties.Decimal = $("#numberDecimal").val();

        if ($(".btn-group").find(".btn-default").length > 0)
            updateproperties.allignment = $(".btn-group").find(".btn-default").attr("data-index").trim();
        else
            updateproperties.allignment = "center";
        updateproperties.FontSize = $("#fontsize").val();
        updateproperties.FontFamily = $("#fmtfamily").val();
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
        // updateproperties.Fontstyle = $(".btn-group1").find(".btn-default").attr("data-index").trim();
        updateproperties.Fontcolor = $("#color1").val();
        updateproperties.prefix = $("#prefix").val();
        updateproperties.suffix = $("#suffix").val();
        if ($scope.selecteditem == "SecondaryValues") {
            selecteditem.set({ secondary_style: updateproperties });
        }
        else if ($scope.selecteditem == "ParameterValues") {
            selecteditem.set({ primary_style: updateproperties });
        }
        else if ($scope.selecteditem == "DashboardChart") {
            var vpupdateproperties = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                updateproperties.selectedid = selecteddatatab;
                //vpupdateproperties.selectedid = selecteddatatab;
                vpupdateproperties.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                vpupdateproperties.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                updateproperties.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                updateproperties.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                updateproperties.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }
            vpupdateproperties.pairsaparation = $("#divsaparatenum").val();
            vpupdateproperties.BackgroundColor = $("#color2").val();
            vpupdateproperties.BorderColor = $("#color3").val();
            vpupdateproperties.BorderStyle = $("#borderstyle").val();
            vpupdateproperties.BorderWidth = $("#borderwidth").val();
            vpupdateproperties.url = $("#ds_url").val();
            //vpupdateproperties.width = $("#ds_url").val();
            vpupdateproperties.height = $("#styleheight").val();
            selecteditem.set({ style: vpupdateproperties });
        }
    };
    //..update properties ended...//

    //....updatedbconnections by adding datasources...........//
    $scope.updatedbconnections = function () {
        //get formula
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        //if ($scope.selecteditem == "SecondaryValues") {
        //    var selecteditem = dashboardchart.byId(dashboardchart, $scope.view.getSelected().controlid);
        //    if (selecteditem.get("data_column_secondaryvalues").formula_template != "undefined")
        //        $scope.modalq = { presuffixstatus: false };
        //    else
        //        $scope.modalq = { presuffixstatus: true };
        //    var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
        //    var updatedlables = new Object();
        //    updatedlables.selectedid = selecteddatatab;
        //    updatedlables.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
        //    updatedlables.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
        //    updatedlables.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
        //    updatedlables.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
        //    updatedlables.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby") == null ? "" : $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
        //    updatedlables.formula = formulatext;
        //    updatedlables.formula_template = formula_template;
        //    var secondaryobj = selecteditem.get("data_column_secondaryvalues").secondaryconditions;
        //    updatedlables.secondaryconditions = secondaryobj;
        //    selecteditem.unset("data_column_secondaryvalues", { silent: true });
        //    selecteditem.set({ data_column_secondaryvalues: updatedlables });
        //    //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
        //}
        if ($scope.selecteditem == "ParameterValues") {
            var selecteditem = dashboardchart.byId(dashboardchart, $scope.view.getSelected().controlid);
            if (selecteditem.get("data_column_parametervalues").formula_template != "undefined")
                $scope.modalq = { presuffixstatus: false };
            else
                $scope.modalq = { presuffixstatus: true };
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
            var primaryobj = selecteditem.get("data_column_parametervalues").primaryconditions;
            updatedlables.primaryconditions = primaryobj;
            selecteditem.unset("data_column_parametervalues", { silent: true });
            selecteditem.set({ data_column_parametervalues: updatedlables });
            // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
        }
    }
    //....updatedbconnections by adding datasources ended...........//


    //////................................code for indicator-----------------------------------///////////////

    //....add dynamic field for indicaters...........//
    $scope.addFields = function () {
        var FieldCount = Math.floor((Math.random() * 7683480) + 198);

        if ($scope.selecteditem == "ParameterValues") {
            var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>Parameter</span>" +
           "<input id='parameternameText_" + FieldCount + "' class='parametername' placeholder='parametername' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
           "<input id='parametervalueText_" + FieldCount + "' class='parametervalue' placeholder='parametervalue' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
            //"<option value='Textselect' selected='selected'>Text</option></select>" +
            //"<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
            //"<option value='is equal to'>is equal to </option>" +
            //"<option value='is not equal to'>is not equal to </option>" +
            //"<option value='is greater than' selected='selected'>is greater than</option>" +
            //"<option value='is greater than or equal to'>is greater than or equal to</option>" +
            //"<option value='is less than'>is less than</option>" +
            //"<option value='is less than or equal to'>is less than or equal to</option>" +
            //"<option value='contains'>contains</option>" +
            //"<option value='does not contain'>does not contain</option>" +
            //"</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
            "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
            "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));

            $("#mainDiv").append(addeditems);

            var selecteditem = dashboardchart.byId(dashboardchart, $scope.view.getSelected().controlid);
            var primeobj = selecteditem.get("data_column_parametervalues");
            primeobj.primaryconditions[0].parameters.push({ "id": Controlid, "parametername": "", "parametervalue": "" });
            selecteditem.unset("data_column_parametervalues", { silent: true });
            selecteditem.set({ "data_column_parametervalues": primeobj });
            alert(JSON.stringify(primeobj.primaryconditions[0]));
        }

        $scope.changeindicateprediactes();
    };
    //....add dynamic field for indicaters ended..........//

    //....remove dynamic field for indicaters...........//
    $scope.RemoveParm = function (obj, $event) {                          //remove function for upper div       
        var removePrimary = $($event.target).parent().attr("id");
        var removedivindex = $($event.target).parent().index();
        if (removedivindex == 0) {
            return false
        } else {
            $('#' + removePrimary).remove();
            var primeobj = selecteditem.get("data_column_parametervalues");
            //var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "ParameterValues") {
                primeobj.primaryconditions[0].parameters.splice(removedivindex, 1);
                selecteditem.unset("data_column_parametervalues", { silent: true });
                selecteditem.set({ "data_column_parametervalues": primeobj });
                // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            //else if ($scope.selecteditem == "SecondaryValues") {
            //    secondobj.secondaryconditions[0].secondpredicates.splice(removedivindex, 1);
            //    selecteditem.unset("data_column_secondaryvalues", { silent: true });
            //    selecteditem.set({ "data_column_secondaryvalues": secondobj });
            //    // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            //}
        }

    }
    //....remove dynamic field for indicaters ended...........//


    //....updatedbconnections by adding datasources...........//
    $scope.changeindicateprediactes = function () {
        //$(".predicatetype").unbind("change");
        //$(".predicatetype").on('change', function () {
        //    var predicttarget = document.getElementById($(this).attr("id"));
        //    var predicttext = document.getElementById($(this).next().attr("id"));
        //    var predicatetext = $("#" + predicttext.id).val();
        //    var parenddivid = $(this).parent().attr("id");
        //    var divindex = $("#" + parenddivid).index();

        //    var ref = $('#bitree').jstree(true);
        //    var sel = ref.get_selected();
        //    var primeobj = selecteditem.get("data_column_parametervalues");
        //    //var secondobj = selecteditem.get("data_column_secondaryvalues");

        //    if ($scope.selecteditem == "ParameterValues") {
        //        primeobj.primaryconditions[0].parameters[divindex].id = Controlid;
        //        primeobj.primaryconditions[0].parameters[divindex].parametername = predicttarget.value;
        //        selecteditem.unset("data_column_parametervalues", { silent: true });
        //        selecteditem.set({ "data_column_parametervalues": primeobj });
        //        //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
        //    }
        //    //else if ($scope.selecteditem == "SecondaryValues") {
        //    //    secondobj.secondaryconditions[0].secondpredicates[divindex].id = Controlid;
        //    //    secondobj.secondaryconditions[0].secondpredicates[divindex].type = predicttarget.value;
        //    //    selecteditem.unset("data_column_secondaryvalues", { silent: true });
        //    //    selecteditem.set({ "data_column_secondaryvalues": secondobj });
        //    //    // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
        //    //}


        //});

        $(".parametername").unbind("change");
        $(".parametername").on('change', function () {
            var parameternametext = document.getElementById($(this).attr("id"));
            var paramnametext = $("#" + parameternametext.id).val();
            //alert($(this).next().attr("id"));
            //var parametervaluetext = document.getElementById($(this).next().attr("id"));
            //alert(parametervaluetext);
            //var paramvaluetext = $("#" + parametervaluetext.id).val();
            //alert(paramvaluetext);
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_parametervalues");
            //var secondobj = selecteditem.get("data_column_secondaryvalues");
            if ($scope.selecteditem == "ParameterValues") {
                primeobj.primaryconditions[0].parameters[divindex].id = Controlid;
                primeobj.primaryconditions[0].parameters[divindex].parametername = paramnametext;
                //primeobj.primaryconditions[0].parameters[divindex].parametervalue = paramvaluetext;
                selecteditem.unset("data_column_parametervalues", { silent: true });
                selecteditem.set({ "data_column_parametervalues": primeobj });
                //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
        });

        $(".parametervalue").unbind("change");
        $(".parametervalue").on('change', function () {
            var parametervaluetext = document.getElementById($(this).attr("id"));
            var paramvaluetext = $("#" + parametervaluetext.id).val();
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_parametervalues");

            if ($scope.selecteditem == "ParameterValues") {
                primeobj.primaryconditions[0].parameters[divindex].id = Controlid;
                //primeobj.primaryconditions[0].parameters[divindex].parametername = paramnametext;
                primeobj.primaryconditions[0].parameters[divindex].parametervalue = paramvaluetext;
                selecteditem.unset("data_column_parametervalues", { silent: true });
                selecteditem.set({ "data_column_parametervalues": primeobj });
                //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
        });
    };


    //..indicater imgposition...//
    $scope.indicateimgpos = function () {
        $(".imgpos-indicate").find("button[name=indicateimgpos]").on("click", function () {
            $(".imgpos-indicate").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");
            $scope.changeindicateimgpos();
        });
    };
    //..indicater imgposition ended...//

    //..change indicater imgposition...//
    //$scope.changeindicateimgpos = function () {
    //    var parenddivid = $("#" + angular.element("#mymodelindicatoricons").attr("data-id")).parent().attr("id");
    //    var divindex = $("#" + parenddivid).index();
    //    var primeobj = selecteditem.get("data_column_primaryvalues");
    //    var secondobj = selecteditem.get("data_column_secondaryvalues");
    //    if ($scope.selecteditem == "ParameterValues") {
    //        primeobj.primaryconditions[0].primereactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
    //        selecteditem.unset("data_column_primaryvalues", { silent: true });
    //        selecteditem.set({ "data_column_primaryvalues": primeobj });
    //        //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
    //    }
    //    //else if ($scope.selecteditem == "SecondaryValues") {
    //    //    secondobj.secondaryconditions[0].secondreactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
    //    //    selecteditem.unset("data_column_secondaryvalues", { silent: true });
    //    //    selecteditem.set({ "data_column_secondaryvalues": secondobj });
    //    //    //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
    //    //}
    //};
    //..change indicater imgposition ended...//



    //..............................................indicators popup....................................................//




    $scope.CloseIconspopup = function () {
        var iconsmodel = angular.element("#mymodelindicatoricons");
        iconsmodel.modal('hide');
    };

    //..............................................indicators popup ended....................................................//


    //////-------------------------------------------------------------------End code for indicator.........................................

    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }







};


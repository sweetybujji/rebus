
function envdropdown($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    //global variable declarations
    var Controlid = $scope.view.getID(); $scope.datatabs = []; $scope.formulaop = "Aggrigative"; $scope.optype = "Arithmetic"; var selecteditem;
    if (controlid == "new")//Creating new Control
    {
        dropdown.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_values: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" },
            data_column_labels: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" },
            style: { "position": "absolute", "width": "200px", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "controlwidth": "200px", "controlheight": "25px", "controllabel": "" },
            variables: { "variabletype": "cv", "variablename": "", "paramvalue": "", "dbvalue": "" },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = dropdown.byId(dropdown, Controlid);
    }
    else {
        selecteditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
    }
    $scope.selecteditem = "Dropdown";
    //loads Dropdown properties html page
    $http.get('../Analytics/Bi360Templates/Tabs/DropDownTabs.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));
        //remove paramname value
        $(".imgremove").click(function () {          
            $(".imgremove").hide();         
            $("#dblblval").text("");
        });
        //Load custom variables to dropdown
        $scope.LoadVariable();
        //check and hide or show custom and db variables
       var updateproperties = selecteditem.get("variables");
       if (updateproperties.variabletype == "cv") {
           $("#custvar").prop('checked', true);
           $("#dbdiv").hide();
           $("#custdiv").show();
       }
       else {

           $("#dbvar").prop('checked', true);
           $("#dbdiv").show();
           $("#custdiv").hide();
       }
       if (updateproperties.variablename.indexOf("ref") != -1) {
           $("#dblblval").text(updateproperties.variablename);
       }
       else {
           $("#drpdwnsetval").val(updateproperties.variablename);

       }
       if (updateproperties.variablename.indexOf("ref") != -1) {
           $("#dbdivval").show();
       }
        //updating  values to properties on dropdownchange
       $(".dropdwnchange").change(function () {        

           var updateproperties = selecteditem.get("style"); var varproperties = selecteditem.get("variables");
            updateproperties.controllabel = $("#drpdwnlabl").val();
            updateproperties.controlwidth = $("#drpdwnwidth").val();
            updateproperties.controlheight = $("#drpdwnheight").val();
            if (varproperties.variablename.indexOf("ref") != -1) {
                varproperties.variablename = $("#dblblval").text();
            }
            else {
                varproperties.variablename = $("#drpdwnsetval option:selected").text();

            }
           
            varproperties.dbvalue = $("#" + $scope.view.getSelected().controlid + "").find(".inputdropdown").val();
           // varproperties.dbvalue = $("#drpdwnsetval").val();
            selecteditem.unset("style", { silent: true });
            selecteditem.set({ "style": updateproperties });
            selecteditem.unset("variables", { silent: true });
            selecteditem.set({ "variables": varproperties });
        });
    });
    //initializes tab index to 2.
    $scope.selected = 2;

    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "Dropdown", "parent": "#", "text": "Dropdown", 'state': { 'opened': true, 'selected': true } },
               { "id": "Values", "parent": "Dropdown", "text": "Values" },
               { "id": "Labels", "parent": "Dropdown", "text": "Labels" }
    ];
    //bind properties data to thier respective controls when tree load
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var drpdownstyle = selecteditem.get("style");
        var varproperties = selecteditem.get("variables");
        $("#drpdwnlabl").val(drpdownstyle.controllabel);
        $("#drpdwnwidth").val(drpdownstyle.controlwidth);
        $("#drpdwnheight").val(drpdownstyle.controlheight);
        if (varproperties.variabletype == "cv") {
            $("#custvar").prop('checked', true);
            $("#dbdiv").hide();
            $("#custdiv").show();
        }
        else {

            $("#dbvar").prop('checked', true);
            $("#dbdiv").show();
            $("#custdiv").hide();
        }
        if (varproperties.variablename.indexOf("ref") != -1) {
            $("#dblblval").text(varproperties.variablename);
        }
        else {
            $("#drpdwnsetval").val(varproperties.variablename);

        }
        if (varproperties.variablename.indexOf("ref") != -1) {
            $("#dbdivval").show();
        }

        //construct tree by using jquery plugun..
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
    element.modal('show'); $("#previewobject").empty();
  
    //clone object
    $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));
    //bind properties if control is existing............
    if (controlid != "new") {
        Controlid = controlid;
        var selecteditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }
    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {         
          var ref = $('#bitree').jstree(true); var sel = ref.get_selected();
          if (sel == "Dropdown") {
              //bind properties data to thier respective controls on select
              $scope.selecteditem = "Dropdown"; $scope.selected = 2;
              $("#drpdowndatatab").hide(); $("#drpdownproperiestab").show(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
              var drpdownstyle = selecteditem.get("style"); var varproperties = selecteditem.get("variables");
              if (varproperties.variabletype == "cv") {
                  $("#custvar").prop('checked', true);
                  $("#dbdiv").hide();
                  $("#custdiv").show();
              }
              else {

                  $("#dbvar").prop('checked', true);
                  $("#dbdiv").show();
                  $("#custdiv").hide();
              }
              if (varproperties.variablename.indexOf("ref") != -1) {
                  $("#dblblval").text(varproperties.variablename);
              }
              else {
                  $("#drpdwnsetval").val(varproperties.variablename);

              }
              if (varproperties.variablename.indexOf("ref") != -1) {
                  $("#dbdivval").show();
              }
              $("#drpdwnlabl").val(drpdownstyle.controllabel);
              $("#drpdwnwidth").val(drpdownstyle.controlwidth);
              $("#drpdwnheight").val(drpdownstyle.controlheight);            
          } else if (sel == "Values") {
            
              $scope.modal.variablestatus = true;
              $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
              $scope.selected = 1;
              $("#drpdowndatatab").show(); $("#drpdownproperiestab").hide(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();
              $scope.selecteditem = "Values";
              var connectionid = selecteditem.get("data_column_values").connectionid;
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
          }
          else if (sel == "Labels") {
             
              $scope.modal.variablestatus = true;
              $scope.selected = 1;
              $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
              $("#drpdowndatatab").show(); $("#drpdownproperiestab").hide(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();
              $scope.selecteditem = "Labels";
              var connectionid = selecteditem.get("data_column_labels").connectionid;
              if (connectionid != "underfined") {
                  var connectionobject = new Array();
                  var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                  var selection = angular.element('#' + selecteditem.get("data_column_labels").selectedid + '');
                  connectionobject.push({
                      "DSConnType": selection.attr("data-connectiontype"),
                      "ConnectionID": selection.attr("data-connectionid"),
                      "DSId": selection.attr("data-DSId"),
                      "DSName": selection.attr("data-DSName"),
                      "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                  });
                  $scope.getdata(connectionobject, selection);
                  $("#vf-formula-bar").html(selecteditem.get("data_column_labels").formula_template);
              }
              $scope.modal.tablestatus = true; $scope.modal.expressionstatus = true; $scope.modal.strnumstatus = true;
          }
          $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick(); $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick(); $scope.$apply();
      });
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
    //selecting the database or custom variables
    $scope.radioclick = function () {

        if ($('input[name= variables]:checked').val() == "cv") {
            $("#dblblval").val("");
            $("#dbdiv").hide();
            $("#custdiv").show();
        }
        else {
            $("#drpdwnsetval").val("");
            $("#dbdiv").show();
            $("#custdiv").hide();
        }
        var radioprop = selecteditem.get("variables");
        radioprop.variabletype = $('input[name= variables]:checked').val();

        selecteditem.unset("variables", { silent: true });
        selecteditem.set({ "variables": radioprop });
    }
    //updating dbconnections
    $scope.updatedbconnections = function () {
        //get formula
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Labels") {
            var selecteditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
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
            selecteditem.set({ data_column_labels: updatedlables });
        }
        else if ($scope.selecteditem == "Values") {
            var selecteditem = dropdown.byId(dropdown, $scope.view.getSelected().controlid);
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
            selecteditem.set({ data_column_values: updatedlables });
        }
    }

};







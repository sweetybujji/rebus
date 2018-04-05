

function envtxtbox($scope, $location, $http, $compile, left, top, dropeditem1, controlid, target, type) {

    var Controlid = $scope.view.getID();
    $scope.datatabs = [];                                   //global variable declarations
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new") {                   //creating new control
        textbox.add([{
            id: "" + Controlid + "",
            controltype: dropeditem1,

            data_column_values: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "columnname": "underfined", "formula": "underfined" },

            style: { "position": "absolute", "width": "200px", "height": "25px", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px" },
            primary_style: { "placeholder": "", "FormatAs": "Text", "value": "", "width": "200", "height": "25", "allignment": "left", "FontSize": "Small", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#000000", "controllabel": "label", "variabletype": "cv", "variablename": "", "paramvalue": "", "dbvalue": "", "DateFormat": "mm/dd/yy" },

            datatabs: [],
            target: target,
            refvariable: "",
            type: type
        }]);
        selecteditem = textbox.byId(textbox, Controlid);

    }
    else {
        selecteditem = textbox.byId(textbox, $scope.view.getSelected().controlid);
    }

    //loads Textbox properties html page
    $http.get('../Analytics/Bi360Templates/Tabs/Textbox Tabs.html').success(function (t) {
        //bind tabs html to tabs div

        //alert(t);
        $("#Tabsobject").html($compile(t)($scope));
        
        //alert($("#fmtas").val());

        //condition to show or hide date
        $("#fmtas").val() == "Date" ? $("#datefmtdiv").show() : $("#datefmtdiv").hide();

        //updating paramname values to properties on dropdownchange
        $(".dropdwnchange").change(function () {
            var updateproperties = selecteditem.get("primary_style");
            if (updateproperties.variablename.indexOf("ref") != -1) {
                updateproperties.variablename = $("#dblblval").text();
            }
            else {
             
                updateproperties.variablename = $("#drpdwnsetval option:selected").text();             
            }
            updateproperties.dbvalue = $("#" + $scope.view.getSelected().controlid + "").val();          
            selecteditem.unset("primary_style", { silent: true });
            selecteditem.set({ "primary_style": updateproperties });

        });
       
        $("#datefrmt").unbind('change'); //unbind change function
        //updating Datefrmat on dropdwn change
        $("#datefrmt").change(function () {
          
            var updateproperties = selecteditem.get("primary_style");
            updateproperties.DateFormat = $("#datefrmt").val();
            selecteditem.unset("primary_style", { silent: true });
            selecteditem.set({ "primary_style": updateproperties });

        });
        //Load custom variables to dropdown
        $scope.LoadVariable();
        //binding variablename
        var updateproperties = selecteditem.get("primary_style");      
        if (updateproperties.variablename.indexOf("ref") != -1) {
            $("#dblblval").text(updateproperties.variablename);
        }
        else {          
            $("#drpdwnsetval").val(updateproperties.variablename);

        }
        //condition to hide and show whether dbparam or custom param
        if (updateproperties.variablename.indexOf("ref") != -1) {
            $("#dbdivval").show();
        }
        //remove paramname value
        $(".imgremove").click(function () {
            $(".imgremove").hide();
            $("#dblblval").text("");
        });
        //updating fontsize properties to array
        $("#fontsize").unbind('change');
        $("#fontsize").change(function () {
            var updateproperties = selecteditem.get("primary_style");
            updateproperties.FontSize = $("#fontsize").val();          ;
            updateproperties.value = $("#tbdfval").val();
            updateproperties.placeholder = $("#tbpvalue").val();
            selecteditem.unset("primary_style", { silent: true });
            selecteditem.set({ "primary_style": updateproperties });

        });
    });

    $scope.selected = 2;            //select textbox properties tab
    $scope.selecteditem = "Textbox";    //select textbox in jstree

    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //show tree data
    var data = [
               { "id": "Textbox", "parent": "#", "text": "Textbox", 'state': { 'opened': true, 'selected': true } },
               { "id": "Values", "parent": "Textbox", "text": "Values" }

    ];
    //bind properties data to thier respective controls when page load
    var textboxobj = selecteditem.get("primary_style");
    $scope.twidth = textboxobj.width;
    $scope.theight = textboxobj.height;
    $scope.fmtfamily1 = textboxobj.FontFamily;
    $scope.fmtas1 = textboxobj.FormatAs;
    $scope.fontsize = parseInt(textboxobj.FontSize);
    $scope.color1 = textboxobj.Fontcolor;
    $scope.tdval = textboxobj.value;
    $scope.tbphval = textboxobj.placeholder;
    $scope.txtlabl = textboxobj.controllabel;
    
    $("#datefrmt").val(textboxobj.DateFormat);
    $('#bitree').bind('loaded.jstree', function (e, data) {
        //bind properties data to thier respective controls when tree load
        var textboxobjinitstyle1 = selecteditem.get("primary_style");
        $("#color1").val(textboxobjinitstyle1.Fontcolor);
        $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": textboxobjinitstyle1.Fontcolor });
        $("#stylewidth").val(textboxobjinitstyle1.width);
        $("#fmtas").val(textboxobjinitstyle1.FormatAs);
        $("#fontsize").val(textboxobjinitstyle1.FontSize);
        $("#fmtfamily").val(textboxobjinitstyle1.FontFamily);
        $("#txtlabl").val(textboxobjinitstyle1.controllabel);
        $("#Theight").val(textboxobjinitstyle1.height);
        $("#tbdfval").val(textboxobjinitstyle1.value);
        $("#tbpvalue").val(textboxobjinitstyle1.placeholder);
        $("#fmtas").val() == "Date" ? $("#datefmtdiv").show() : $("#datefmtdiv").hide();
        $("#datefrmt").val(textboxobjinitstyle1.DateFormat);
        $(".btn-group").find("button[name=align]").each(function (i) {
            if ($(this).attr("data-index").trim() == textboxobjinitstyle1.allignment) {
                $(".btn-group").find(".btn-default").each(function (i) {
                    $(this).removeClass("btn-default");
                });
                $(this).addClass("btn-default");
            }
        });

        if (textboxobjinitstyle1.Fontweight == "bold") {
            $(".btn-group1").find("#textweight").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textweight").removeClass("btn-default");
        }
        if (textboxobjinitstyle1.Fontstyle == "italic") {
            $(".btn-group1").find("#textstyle").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textstyle").removeClass("btn-default");
        }
        if (textboxobjinitstyle1.TextDecoration == "underline") {
            $(".btn-group1").find("#textdecorate").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textdecorate").removeClass("btn-default");
        }
       

        if (textboxobjinitstyle1.variabletype == "cv") {
            $("#custvar").prop('checked', true);
            $("#dbdiv").hide();
            $("#custdiv").show();
        }
        else {

            $("#dbvar").prop('checked', true);
            $("#dbdiv").show();
            $("#custdiv").hide();
        }
        if (textboxobjinitstyle1.variablename.indexOf("ref") != -1) {
            $("#dblblval").text(textboxobjinitstyle1.variablename);
        }
        else {
            $("#drpdwnsetval").val(textboxobjinitstyle1.variablename);

        }
        if (textboxobjinitstyle1.variablename.indexOf("ref") != -1) {
            $("#dbdivval").show();
        }

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
    //show preview data
    var element = angular.element('#bidsahboardconfig');
    element.modal('show'); $("#previewobject").empty();
   //clone preview data to main page
    $("#" + $scope.view.getSelected().controlid + "").parent().clone(true).removeAttr('id').removeClass("bi-widget-item").appendTo($("#previewobject"));
    $("#previewobject").find(".widget-drag-handle").remove();
    $("#previewobject").find(".selectedwidget").removeClass("selectedwidget");
   
    if (controlid != "new") {
        Controlid = controlid;
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }

    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {
          var ref = $('#bitree').jstree(true);
          var seltxt = ref.get_selected();
          if (seltxt == "Textbox") {
              //bind properties data to thier respective controls on select

              $scope.settextpoerties(selecteditem);
          } else if (seltxt == "Values") {
              //bind properties data to thier respective controls on select
              
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
                  $scope.getdata(connectionobject, selection, selecteditem.get("data_column_values").columnname);
                  selecteditem.set({ datatabs: $scope.datatabs });
                  $("#vf-formula-bar").html(selecteditem.get("data_column_values").formula_template);

              }
              //hide all tabs except selected one
              $scope.modal.variablestatus = true;
              $scope.modal.tablestatus = true;
              $scope.modal.expressionstatus = true;
              $scope.modal.strnumstatus = true;
          }


          $scope.$apply();
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
      });
    //update textproperties on select
    $scope.settextpoerties = function (selecteditem) {
        $scope.selecteditem = "Textbox";
        $scope.selected = 2;
        $("#drpdowndatatab").hide();
        $("#drpdownproperiestab").show();
        $("#VFormula-menu").hide();
        $("#vf-formula-bar").hide();
       
        var textboxobjstyle = selecteditem.get("style");
        var textboxobjinitstyle = selecteditem.get("primary_style");
        if (textboxobjinitstyle.variabletype == "cv") {
            $("#custvar").prop('checked', true); $("#dbdiv").hide();
            $("#custdiv").show();
        }
        else {

            $("#dbvar").prop('checked', true);
            $("#dbdiv").show();
            $("#custdiv").hide();
        }
     
        if (textboxobjinitstyle.variablename.indexOf("ref") != -1) {
            alert(textboxobjinitstyle.variablename);
            $("#dblblval").text(textboxobjinitstyle.variablename);
        }
        else {           
            $("#drpdwnsetval").val(textboxobjinitstyle.variablename);        
         
        }

        if (textboxobjinitstyle.variablename.indexOf("ref") != -1) {
            $("#dbdivval").show();

        }
       
        $("#datefrmt").val(textboxobjinitstyle.DateFormat);
        $("#fmtas").val() == "Date" ? $("#datefmtdiv").show() : $("#datefmtdiv").hide();
       // $("#fmtas").val() == "Time" ? $("#timefrmtdiv").show() : $("#timefrmtdiv").hide();
        $("#color1").val(textboxobjinitstyle.Fontcolor);
        $("#txtlabl").val(textboxobjinitstyle.controllabel);
        $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": textboxobjinitstyle.Fontcolor });
        $("#stylewidth").val(textboxobjinitstyle.width);
        $("#fmtas").val(textboxobjinitstyle.FormatAs);
        $(".btn-group").find("button[name=align]").each(function (i) {
            if ($(this).attr("data-index").trim() == textboxobjinitstyle.allignment) {
                $(".btn-group").find(".btn-default").each(function (i) {
                    $(this).removeClass("btn-default");
                });
                $(this).addClass("btn-default");
            }
        });

        if (textboxobjinitstyle.Fontweight == "bold") {
            $(".btn-group1").find("#textweight").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textweight").removeClass("btn-default");
        }
        if (textboxobjinitstyle.Fontstyle == "italic") {
            $(".btn-group1").find("#textstyle").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textstyle").removeClass("btn-default");
        }
        if (textboxobjinitstyle.TextDecoration == "underline") {
            $(".btn-group1").find("#textdecorate").addClass("btn-default");
        }
        else {
            $(".btn-group1").find("#textdecorate").removeClass("btn-default");
        }
        $("#fontsize").val(textboxobjinitstyle.FontSize);     
        $("#fmtfamily").val(textboxobjinitstyle.FontFamily);
        $("#Theight").val(textboxobjinitstyle.height);
        $("#tbdfval").val(textboxobjinitstyle.value);
        $("#tbpvalue").val(textboxobjinitstyle.placeholder);


    }
    //allignment properties
    $scope.alignproperties = function () {
        $(".btn-group").find("button[name=align]").on("click", function () {
            $(".btn-group").find(".btn-default").each(function (i) {
                $(this).removeClass("btn-default");
            });
            $(this).addClass("btn-default");          
            $scope.changeproperties();
        });
    };
    //fontweight properties
    $scope.fweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    //fontstyle properties
    $scope.fstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.fdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };

    //update values to textbox properties on onchange 
    $scope.changeproperties = function () {
      
        var updateproperties = selecteditem.get("primary_style");
        if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
            var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
            updateproperties.selectedid = selecteddatatab;
            updateproperties.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
            updateproperties.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
            updateproperties.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
            updateproperties.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
            updateproperties.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
        }

        if ($(".btn-group").find(".btn-default").length > 0)
            updateproperties.allignment = $(".btn-group").find(".btn-default").attr("data-index").trim();
        else
            updateproperties.allignment = "center";

        updateproperties.FormatAs = $("#fmtas").val();     
       
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
        $("#fmtas").val() == "Date" ? $("#datefmtdiv").show() : $("#datefmtdiv").hide();
       // $("#fmtas").val() == "Time" ? $("#timefrmtdiv").show() : $("#timefrmtdiv").hide();
        updateproperties.Fontcolor = $("#color1").val();
        updateproperties.controllabel = $("#txtlabl").val();
        updateproperties.FontFamily = $("#fmtfamily").val();     
      
        updateproperties.width = $("#stylewidth").val();
        updateproperties.height = $("#Theight").val();
        updateproperties.value = $("#tbdfval").val();
        updateproperties.placeholder = $("#tbpvalue").val();
        selecteditem.unset("primary_style", { silent: true });
        selecteditem.set({ "primary_style": updateproperties });
    };
    //updated dbconnections
    $scope.updatedbconnections = function () {

        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Values") {
            var selecteditem = textbox.byId(textbox, $scope.view.getSelected().controlid);
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
    //selecting the database or custom variables
    $scope.radioclick = function () {
        var radioprop = selecteditem.get("primary_style");
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

        radioprop.variabletype = $('input[name= variables]:checked').val();

        selecteditem.unset("primary_style", { silent: true });
        selecteditem.set({ "primary_style": radioprop });
    }

    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }

};


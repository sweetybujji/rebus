
function envGage($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;

   // $("#previewobject").empty();

    if (controlid == "new")//Creating new Control
    {
        Gagetag.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_values: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "manualtext": "" },
            style: { "value": "55", "Width": "1", "min": "0", "max": "100", "title": "Gauge", "HeaderText": "Gauge", "Headercolor": "#008000", "FooterText": "Value", "Footercolor": "#993366" },
            customSectors: {
                "colors": [{
                    "color": "green",
                    "lo": "0",
                    "hi": "25"
                }, {
                    "color": "yellow",
                    "lo": "25",
                    "hi": "50"
                }, {
                    "color": "#993366",
                    "lo": "50",
                    "hi": "100"
                }]
            },
            colors: [],
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = Gagetag.byId(Gagetag, Controlid);
    } else {
        //$("#previewobject").empty();
        selecteditem = Gagetag.byId(Gagetag, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
        //clone object  
        $("#previewobject").empty();
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

    }


    $http.get('../Analytics/Bi360Templates/Tabs/GageTabs.html').success(function (t) {

        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));
        $scope.LoadVariable();
        $(".GageColor").unbind("change");
        $(".GageColorpicker").unbind("change");

        $(".GageColorpicker").on('change', function () {
            var newGageColor = selecteditem.get("customSectors");
            var divindex = $(this).parent().parent().index();
            newGageColor.colors[divindex].color = $(this).val();
            selecteditem.unset("customSectors", { silent: true });
            selecteditem.set({ "customSectors": newGageColor });

        });
        $(".GageColor").on('change', function () {
            var newGageColor = selecteditem.get("customSectors");
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var Fromtovalue = "";
            $("#" + parenddivid).children("input:text").each(function () {
                Fromtovalue += $(this).val() + ",";
            });
            var From_to = Fromtovalue.split(",");
            if ($scope.selecteditem == "Value") {
            }
            else if ($scope.selecteditem == "Color") {
                newGageColor.colors[divindex].lo = From_to[0];
                newGageColor.colors[divindex].hi = From_to[1];
                selecteditem.unset("customSectors", { silent: true });
                selecteditem.set({ "customSectors": newGageColor });
                // alert(JSON.stringify(newGageColor));
            }


        });

    });
    $scope.selected = 3;
    $scope.selecteditem = "Gages";
    $("#Gagedatatab").hide();
    $("#GageColortab").hide();
    $("#GageStyleTab").show();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "Gages", "parent": "#", "text": "Gages", 'state': { 'opened': true, 'selected': true } },
              { "id": "Value", "parent": "Gages", "text": "Value" },
               { "id": "color", "parent": "Gages", "text": "Color" }
                //{ "id": "Style", "parent": "Gages", "text": "Style" }



    ];

    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        $("#MinVal").val(newtextstyel.min);
        $("#MaxValue").val(newtextstyel.max);
        $("#HeaderTextSize").val(newtextstyel.title);
        $("#FooterTextSize").val(newtextstyel.FooterText);
        $("#HeaderColor").val(newtextstyel.Headercolor);
        $("#headcolor").find(".colorPicker-picker").css({ "background-color": newtextstyel.Headercolor });
        $("#FooterColor").val(newtextstyel.Footercolor);
        $("#footcolor").find(".colorPicker-picker").css({ "background-color": newtextstyel.Footercolor });
        $("#GaugeWidth").val(newtextstyel.Width);
        $("#Gagedatatab").hide();
        $("#GageColortab").hide();
        $("#GageStyleTab").show();
        $("#GageStyleTab").click();
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
    //var textobj = selecteditem.get("style");
    //$scope.width = textobj.width;
    //$scope.height = textobj.height;
    //$scope.bgcolor = textobj.BackgroundColor;
    //$scope.bdcolor = textobj.BorderColor;
    //$scope.brstyle = textobj.BorderStyle;
    //$scope.brwidth = parseInt(textobj.BorderWidth);
    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $scope.selecteditem = "Gages";
    $scope.selected = 3;
    var newGagestyle = selecteditem.get("style");
    $("#MinVal").val(newGagestyle.min);
    $("#MaxValue").val(newGagestyle.max);
    $("#HeaderTextSize").val(newGagestyle.title);
    $("#FooterTextSize").val(newGagestyle.FooterText);
    $("#GaugeWidth").val(newGagestyle.Width);
    $("#HeaderColor").val(newGagestyle.Headercolor);
    $("#headcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Headercolor });
    $("#FooterColor").val(newGagestyle.Footercolor);
    $("#footcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Footercolor });

    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {
          var ref = $('#bitree').jstree(true);
          var sel = ref.get_selected();

          // $scope.showdatatable();

          if (sel == "Value") {
              $scope.selecteditem = "Value";
              $scope.selected = 1;
              $("#Gagedatatab").show();
              $("#Gagedatatab").click();
              $("#GageColortab").hide();
              $("#GageStyleTab").hide();
              $("#VFormula-menu").show();
              $("#vf-formula-bar").show();
              var connectionid = selecteditem.get("data_column_values").connectionid;
              if (connectionid != "undefined") {
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
          else if (sel == "color") {
              $scope.selecteditem = "color";
              $(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "14px" });
              $scope.selected = 2;
              $("#Gagedatatab").hide();
              $("#GageColortab").show();
              $("#GageStyleTab").hide();

              var newproperties = selecteditem.get("customSectors");

              $("#Fromvalue").val(newproperties.colors[0].lo);
              $("#ToValue").val(newproperties.colors[0].hi);
              $("#Rcolor").val(newproperties.colors[0].color);
              $("#From1").find(".colorPicker-picker").css({ "background-color": newproperties.colors[0].color });
              $("#Fromvalue_6737944").val(newproperties.colors[1].lo);
              $("#To_6737944").val(newproperties.colors[1].hi);
              $("#color_6737944").val(newproperties.colors[1].color);
              $("#Colorform2").find(".colorPicker-picker").css({ "background-color": newproperties.colors[1].color });
              $("#From3").val(newproperties.colors[2].lo);

              $("#To3").val(newproperties.colors[2].hi);
              $("#Color3").val(newproperties.colors[2].color);
              $("#Colorform3").find(".colorPicker-picker").css({ "background-color": newproperties.colors[2].color });



          }
          else if (sel == "Gages") {
              var newGagestyle = selecteditem.get("style");
              $("#VFormula-menu").hide();
              $("#vf-formula-bar").hide();
              $("#Gagedatatab").hide();
              $("#GageColortab").hide();
              $("#GageStyleTab").show();
              $("#GageStyleTab").click();
              $("#MinVal").val(newGagestyle.min);
              $("#MaxValue").val(newGagestyle.max);
              $("#HeaderColor").val(newGagestyle.Headercolor);
              $("#GaugeWidth").val(newGagestyle.Width);
              $("#headcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Headercolor });
              $("#FooterColor").val(newGagestyle.Footercolor);
              $("#footcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Footercolor });
              $("#FooterTextSize").val(newGagestyle.FooterText);

          }
          //else {
          //    alert("oye");
          //    $scope.selecteditem = "Gages";
          //    $scope.selected = 3;
          //    var newGagestyle = selecteditem.get("style");
          //    $("#MinVal").val(newGagestyle.min);
          //    $("#MaxValue").val(newGagestyle.max);
          //    $("#HeaderTextSize").val(newGagestyle.title);
          //    $("#FooterTextSize").val(newGagestyle.FooterText);
          //}



          $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick();
          $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick();

          $scope.$apply();

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

    $scope.updatedbconnections = function () {
        //get formula
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Value") {
            var selecteditem = Gagetag.byId(Gagetag, $scope.view.getSelected().controlid);
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

    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }
    $scope.changeproperties = function () {
        var newGageColor = selecteditem.get("customSectors");
        var newStyleGage = selecteditem.get("style");
        newStyleGage.Headercolor = $("#HeaderColor").val();
        newStyleGage.Footercolor = $("#FooterColor").val();
        newStyleGage.FooterText = $("#FooterTextSize").val();
        newStyleGage.max = $("#MaxValue").val();
        newStyleGage.min = $("#MinVal").val();
        newStyleGage.value = selecteditem.get("style").value;
        newStyleGage.title = $("#HeaderTextSize").val();
        newStyleGage.Width = $("#GaugeWidth").val();
        selecteditem.unset("style", { silent: true });
        selecteditem.set({ "style": newStyleGage });
        //$(selecteditem).clone(true).appendTo($("#previewobject"));
        //$("#previewobject").css("overflow", htmlproperties.overflow);

    };


    //$(".GageColorpicker").unbind("change");


    $scope.addFields = function () {
        var FieldCount = Math.floor((Math.random() * 7683480) + 198);
        var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>From</span><input id='Fromvalue_" + FieldCount + "'  type='text' style='width: 5%' /> <span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>To</span> <input id='To_" + FieldCount + "' class='predicatetext' type='text'  style='width: 5%; margin-left: 7px; height: 35px; margin-top: 4px;'><span class='PropertyLine field' style='width: 42px; font-size: 13px; font-weight: bold;margin-left:3px'>Color</span><div class='prop-editor' style='white-space: nowrap; margin-left: 25px; vertical-align: top;'><input id='color_" + FieldCount + "' type='text' value='#000000' name='color1' style='visibility: hidden; position: absolute;' ng-model='Rcolor' ng-change='changeproperties()'></div> <button class='btn btn-red' style='width: 10px; margin-left: 22px;' ng-click='RemoveParm(obj,$event);' type='button'>--</button></div>")($scope));
        $('#Gageprop').append(addeditems);
        $('#color_' + FieldCount).colorPicker();
        $(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "14px" });
    }
    $scope.RemoveParm = function (obj, $event) {
        var RemoveColorDiv = $($event.target).parent().attr("id");
        $('#' + RemoveColorDiv).remove();
    }
}

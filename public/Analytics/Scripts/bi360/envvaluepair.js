
function envvaluepair($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    //........ adding control to backbone model .............//

    if (controlid == "new")//Creating new Control
    {
        valuepair.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_primaryvalues: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "primaryconditions": [{ primepredicates: [{ "id": Controlid, "type": "is greater than", "value": "" }], primereactions: [{ "id": Controlid, "type": "None", "reactvalue": "", "imgpos": "left" }] }] },
            data_column_secondaryvalues: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "secondaryconditions": [{ secondpredicates: [{ "id": Controlid, "type": "is greater than", "value": "" }], secondreactions: [{ "id": Controlid, "type": "None", "reactvalue": "", "imgpos": "left" }] }] },
            style: { "position": "absolute", "width": "100%", "height": "100%", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "pairsaparation": "10px", "BackgroundColor": "#ffffff", "BorderColor": "#ffffff", "BorderStyle": "dashed", "BorderWidth": "1" },
            //valuepair_style: {},
            primary_style: { "FormatAs": "Text", "allignment": "center", "FontSize": "2", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#3366ff", "prefix": "", "suffix": "", "Decimal": "0" },
            secondary_style: { "FormatAs": "Text", "allignment": "center", "FontSize": "3", "Fontstyle": "unset", "Fontweight": "bold", "FontFamily": "Arial", "TextDecoration": "unset", "Fontcolor": "#008080", "prefix": "", "suffix": "", "Decimal": "0" },
            datatabs: [],
            primaryconditions: [],
            secondaryconditions: [],
            target: target,
            type: type
        }]);
        selecteditem = valuepair.byId(valuepair, Controlid);
    }
    else {
        selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
    }
    $scope.modalq = { presuffixstatus: true };

    // ......... For loading html template with preview and properties tree.................//

    $http.get('../Analytics/Bi360Templates/Tabs/ValuePairTabs.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));

        // ......... For Loading Variables for Parameters Config.................//
        $scope.LoadVariable();
        // ......... For Loading Variables for Parameters Config Ended.................//


        //initializes tab index to 2.
        $scope.selected = 2;
        $scope.selecteditem = "ValuePair";
        $("#VFormula-menu").hide();
        $("#vf-formula-bar").hide();
        $("#valuepairdatatab").hide();
        $("#vpairtab-properties").hide(); $("#valuepairindicatorstab").hide();
        $("#valuepairprop").show();

        $("#treeid").html($compile('<div id="bitree" > </div>')($scope));

        //tree data
        var data = [
                   { "id": "ValuePair", "parent": "#", "text": "ValuePair", 'state': { 'opened': true, 'selected': true } },
                   { "id": "PrimaryValues", "parent": "ValuePair", "text": "Primary Values" },
                   { "id": "SecondaryValues", "parent": "ValuePair", "text": "Secondary Values" }
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
            $("#stylewidth").val(parseInt(valuepairobj.width));
            $("#styleheight").val(parseInt(valuepairobj.height));
            $("#valuepairindicatorstab").hide();
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
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));
        
        //bind properties if control is existing............//
        if (controlid != "new") {
            Controlid = controlid;
            if (selecteditem.get("datatabs").length > 0) {
                $scope.datatabs = selecteditem.get("datatabs");
            }
        }

        //.....Selecting Treenode and thier functionalities ..//

        $("#bitree").bind(
          "select_node.jstree", function (evt, data) {
              var ref = $('#bitree').jstree(true);
              var sel = ref.get_selected();
              if (sel == "ValuePair") {
                  $scope.selected = 2;
                  $("#valuepairdatatab").hide(); $("#valuepairproperiestab").show(); $("#valuepairindicatorstab").hide();
                  $("#valuepairprop").show(); $("#vpairtab-properties").hide(); $("#VFormula-menu").hide(); $("#vf-formula-bar").hide();
                  $scope.selecteditem = "ValuePair";
                  var valuepairobj = selecteditem.get("style");
                  $("#divsaparatenum").val(parseInt(valuepairobj.pairsaparation));
                  $("#color2").val(valuepairobj.BackgroundColor);
                  $("#colorpick").find(".colorPicker-picker").css({ "background-color": valuepairobj.BackgroundColor });
                  $("#color3").val(valuepairobj.BorderColor);
                  $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": valuepairobj.BorderColor });
                  $("#borderstyle").val(valuepairobj.BorderStyle);
                  $("#borderwidth").val(valuepairobj.BorderWidth);
                  $("#stylewidth").val(parseInt(valuepairobj.width));
                  $("#styleheight").val(parseInt(valuepairobj.height));

                  $(document.getElementById("valuepairproperiestab")).click();

                  $scope.modal.tablestatus = false;
                  $scope.modal.expressionstatus = true;
                  $scope.modal.strnumstatus = true;
                  $scope.modal.variablestatus = true;

              } else if (sel == "PrimaryValues") {
                  $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
                  $scope.selected = 1;
                  $("#valuepairdatatab").show(); $("#valuepairproperiestab").show(); $("#valuepairindicatorstab").show(); $("#valuepairprop").hide(); $("#vpairtab-properties").show(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                  $scope.selecteditem = "PrimaryValues";
                  var connectionid = selecteditem.get("data_column_primaryvalues").connectionid;
                  var primeobj = selecteditem.get("primary_style");
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
                  // $("#allignment").val(primeobj.allignment);
                  $("#fontsize").val(primeobj.FontSize);
                  $("#fmtfamily").val(primeobj.FontFamily);
                  $("#color1").val(primeobj.Fontcolor);
                  $(".colorPicker-picker").css({ "background-color": primeobj.Fontcolor });
                  $("#prefix").val(primeobj.prefix);
                  $("#suffix").val(primeobj.suffix);

                  $("#fmtas").val(primeobj.FormatAs);
                  $("#fmtas").val() == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide(), $("#FromUrlTextBox").hide(), $("#FromDashBoard").hide();

                  $("#numberDecimal").val(parseInt(primeobj.Decimal));

                  if (connectionid != "undefined") {
                      var connectionobject = new Array();
                      var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                      var selection = angular.element('#' + selecteditem.get("data_column_primaryvalues").selectedid + '');
                      connectionobject.push({
                          "DSConnType": selection.attr("data-connectiontype"),
                          "ConnectionID": selection.attr("data-connectionid"),
                          "DSId": selection.attr("data-DSId"),
                          "DSName": selection.attr("data-DSName"),
                          "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                      });
                      $scope.getdata(connectionobject, selection);

                      $("#vf-formula-bar").html(selecteditem.get("data_column_primaryvalues").formula_template);
                  }
                  if (selecteditem.get("data_column_primaryvalues").formula_template != "undefined")
                      $scope.modalq = { presuffixstatus: false };
                  else
                      $scope.modalq = { presuffixstatus: true };
                  $scope.modal.tablestatus = true;
                  $scope.modal.expressionstatus = true;
                  $scope.modal.strnumstatus = true;
                  $scope.modal.variablestatus = true;
                  $(document.getElementById("valuepairdatatab")).click();
                  // //.................................indicators code................................................//

                  // //.................................indicators update code................................................//

                  var primeObj = selecteditem.get("data_column_primaryvalues");
                  var primeobjprcnt = primeObj.primaryconditions[0].primepredicates.length;

                  $("#mainDiv").empty();
                  $("#subdiv").empty();

                  if (primeobjprcnt >= 1) {
                      for (var pr = 0; pr < primeobjprcnt; pr++) {
                          var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                          var addeditems;
                          if (pr == 0) {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>if</span>" +
                                  "<input type='text' style='width: 233px; height: 34px; margin-left: 30px;' id='text" + FieldCount + "' value='PrimaryValues' disabled='disabled'/>" +
                                  //"<option value='Textselect' selected='selected'>PrimaryValues</option><option value='Textselect'>SecondaryValues</option></select>" +
                                  "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  "<option value='is equal to'>is equal to </option>" +
                                  "<option value='is not equal to'>is not equal to </option>" +
                                  "<option value='is greater than' selected='selected'>is greater than</option>" +
                                  "<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  "<option value='is less than'>is less than</option>" +
                                  "<option value='is less than or equal to'>is less than or equal to</option>" +
                                  "<option value='contains'>contains</option>" +
                                  "<option value='does not contain'>does not contain</option>" +
                                  "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          else {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>and</span>" +
                                 "<input type='text' style='width: 233px; height: 34px; margin-left: 16px;' id='text" + FieldCount + "' value='PrimaryValues' disabled='disabled'/>" +
                                  //"<option value='PrimaryValues' selected='selected'>PrimaryValues</option><option value='SecondaryValues'>SecondaryValues</option></select>" +
                                  "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  "<option value='is equal to'>is equal to </option>" +
                                  "<option value='is not equal to'>is not equal to </option>" +
                                  "<option value='is greater than' selected='selected'>is greater than</option>" +
                                  "<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  "<option value='is less than'>is less than</option>" +
                                  "<option value='is less than or equal to'>is less than or equal to</option>" +
                                  "<option value='contains'>contains</option>" +
                                  "<option value='does not contain'>does not contain</option>" +
                                  "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          $("#mainDiv").append(addeditems);

                          $("#predicate_" + FieldCount).val(primeObj.primaryconditions[0].primepredicates[pr].type);
                          $("#predicateText_" + FieldCount).val(primeObj.primaryconditions[0].primepredicates[pr].value);
                      }
                      $scope.changeindicateprediactes();

                      //primeObj.Control = sel;
                      //selecteditem.unset("data_column_primaryvalues", { silent: true });
                      //selecteditem.set({ "data_column_primaryvalues": primeobj });
                      //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
                  }

                  var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;

                  if (primeobjrccnt >= 1) {
                      for (var rc = 0; rc < primeobjrccnt; rc++) {
                          var FieldCountforId = Math.floor((Math.random() * 7683480) + 198);
                          var addTo;
                          if (rc == 0) {
                              addTo = angular.element($compile("<div id='divid_" + FieldCountforId + "'><span class='PropertyLine' id='thencon' style='width: 42px; font-size: 13px; font-weight: bold; margin-top: 8px'>then</span>" +
                           "<input type='text' style='width:233px;margin-left:13px;' value='Text' id='textdisable' disabled='disabled' class='PropertyLine' />" +
                           "<select id='change_" + FieldCountforId + "' style='width: 233px; height: 34px;margin-left:4px' class='dropdownchang'>" +
                                        "<option value='None' selected='selected'>None</option>" +
                                        "<option value='change color'>change color</option>" +
                                        "<option value='display icon'>display icon</option>" +
                                        "<option value='change style'>change style</option>" +
                                        "<option value='replace with text'>replace with text</option></select>" +
                                        "<select id='colordd_" + FieldCountforId + "' style='width: 389px; height: 34px;margin-left:4px;display:none;' class='reactionvalue'>" +
                                        " <option value='ActiveBorder' style='background-color:ActiveBorder'>ActiveBorder</option>" +
                                        "<option value='ActiveCaption' style='background-color:ActiveCaption'>ActiveCaption</option>" +
                                        "<option value='ActiveCaptionText' style='background-color:ActiveCaptionText'>ActiveCaptionText</option>" +
                                        "<option value='AppWorkspace' style='background-color:AppWorkspace'>AppWorkspace</option>" +
                                        "<option value='AliceBlue' style='background-color:AliceBlue'>AliceBlue</option>" +
                                        "<option value='AntiqueWhite' style='background-color:AntiqueWhite'>AntiqueWhite</option>" +
                                        "<option value='Aqua' style='background-color:Aqua'>Aqua</option>" +
                                        "<option value='Aquamarine' style='background-color:Aquamarine'>Aquamarine</option>" +
                                        "<option value='Azure' style='background-color:Azure'>Azure</option>" +
                                        "<option value='Beige' style='background-color:Beige'>Beige</option>" +
                                        "<option value='Bisque' style='background-color:Bisque'>Bisque</option>" +
                                        "<option value='Black' style='background-color:Black'>Black</option>" +
                                        "<option value='BlanchedAlmond' style='background-color:BlanchedAlmond'>BlanchedAlmond</option>" +
                                        "<option value='Blue' selected='selected' style='background-color:Blue'>Blue</option>" +
                                        "<option value='BlueViolet' style='background-color:BlueViolet'>BlueViolet</option>" +
                                        "<option value='Brown' style='background-color:Brown'>Brown</option>" +
                                        "<option value='BurlyWood' style='background-color:BurlyWood'>BurlyWood</option>" +
                                        "<option value='ButtonFace' style='background-color:ButtonFace'>ButtonFace</option>" +
                                        "<option value='ButtonHighlight' style='background-color:ButtonHighlight'>ButtonHighlight</option>" +
                                        "<option value='ButtonShadow' style='background-color:ButtonShadow'>ButtonShadow</option>" +
                                        "<option value='CadetBlue' style='background-color:CadetBlue'>CadetBlue</option>" +
                                        "<option value='Chartreuse' style='background-color:Chartreuse'>Chartreuse</option>" +
                                        " <option value='Chocolate' style='background-color:Chocolate'>Chocolate</option>" +
                                        "<option value='Control' style='background-color:Control'>Control</option>" +
                                        "<option value='ControlDark' style='background-color:ControlDark'>ControlDark</option>" +
                                        "<option value='ControlDarkDark' style='background-color:ControlDarkDark'>ControlDarkDark</option>" +
                                        "<option value='ControlLight' style='background-color:ControlLight'>ControlLight</option>" +
                                        " <option value='ControlLightLight' style='background-color:ControlLightLight'>ControlLightLight</option>" +
                                        "<option value='ControlText' style='background-color:ControlText'>ControlText</option>" +
                                        "<option value='Coral' style='background-color:Coral'>Coral</option>" +
                                        " <option value='CornflowerBlue' style='background-color:CornflowerBlue'>CornflowerBlue</option>" +
                                        " <option value='Cornsilk' style='background-color:Cornsilk'>Cornsilk</option>" +
                                        " <option value='Crimson' style='background-color:Crimson'>Crimson</option>" +
                                        " <option value='Cyan' style='background-color:Cyan'>Cyan</option>" +
                                        "<option value='DarkBlue' style='background-color:DarkBlue'>DarkBlue</option>" +
                                        " <option value='DarkCyan' style='background-color:DarkCyan'>DarkCyan</option>" +
                                        "<option value='DarkGoldenrod' style='background-color:DarkGoldenrod'>DarkGoldenrod</option>" +
                                        "<option value='DarkGray' style='background-color:DarkGray'>DarkGray</option>" +
                                        "<option value='DarkGreen' style='background-color:DarkGreen'>DarkGreen</option>" +
                                        "<option value='DarkKhaki' style='background-color:DarkKhaki'>DarkKhaki</option>" +
                                        "<option value='DarkMagenta' style='background-color:DarkMagenta'>DarkMagenta</option>" +
                                        "<option value='DarkOliveGreen' style='background-color:DarkOliveGreen'>DarkOliveGreen</option>" +
                                        "<option value='DarkOrange' style='background-color:DarkOrange'>DarkOrange</option>" +
                                        "<option value='DarkOrchid' style='background-color:DarkOrchid'>DarkOrchid</option>" +
                                        "<option value='DarkRed' style='background-color:DarkRed'>DarkRed</option>" +
                                        "<option value='DarkSalmon' style='background-color:DarkSalmon'>DarkSalmon</option>" +
                                        "<option value='DarkSeaGreen' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateBlue' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateGray' style='background-color:DarkSlateGray'>DarkSlateGray</option>" +
                                        "<option value='DarkTurquoise' style='background-color:DarkTurquoise'>DarkTurquoise</option>" +
                                        "<option value='DarkViolet' style='background-color:DarkViolet'>DarkViolet</option>" +
                                        "<option value='DeepPink' style='background-color:DeepPink'>DeepPink</option>" +
                                        "<option value='DeepSkyBlue' style='background-color:DeepSkyBlue'>DeepSkyBlue</option>" +
                                        "<option value='Desktop' style='background-color:Desktop'>Desktop</option>" +
                                        "<option value='DimGray' style='background-color:DimGray'>DimGray</option>" +
                                        "<option value='DodgerBlue' style='background-color:DodgerBlue'>DodgerBlue</option>" +
                                        "<option value='Firebrick' style='background-color:Firebrick'>Firebrick</option>" +
                                        "<option value='FloralWhite' style='background-color:FloralWhite'>FloralWhite</option>" +
                                        "<option value='ForestGreen' style='background-color:ForestGreen'>ForestGreen</option>" +
                                        "<option value='Fuchsia' style='background-color:Fuchsia'>Fuchsia</option>" +
                                        "<option value='Gainsboro' style='background-color:Gainsboro'>Gainsboro</option>" +
                                        "<option value='GhostWhite' style='background-color:GhostWhite'>GhostWhite</option>" +
                                        "<option value='Gold' style='background-color:Gold'>Gold</option>" +
                                        "<option value='Goldenrod' style='background-color:Goldenrod'>Goldenrod</option>" +
                                        "<option value='Gray' style='background-color:Gray'>Gray</option>" +
                                        "<option value='Green' style='background-color:Green'>Green</option>" +
                                        "<option value='GreenYellow' style='background-color:GreenYellow'>GreenYellow</option>" +
                                        "<option value='GradientActiveCaption' style='background-color:GradientActiveCaption'>GradientActiveCaption</option>" +
                                        "<option value='GradientInactiveCaption' style='background-color:GradientInactiveCaption'>GradientInactiveCaption</option>" +
                                        "<option value='GrayText' style='background-color:GrayText'>GrayText</option>" +
                                        "<option value='Highlight' style='background-color:Highlight'>Highlight</option>" +
                                        "<option value='HighlightText' style='background-color:HighlightText'>HighlightText</option>" +
                                        "<option value='Honeydew' style='background-color:Honeydew'>Honeydew</option>" +
                                        "<option value='HotPink' style='background-color:HotPink'>HotPink</option>" +
                                        "<option value='HotTrack' style='background-color:HotTrack'>HotTrack</option>" +
                                        "<option value='InactiveBorder' style='background-color:InactiveBorder'>InactiveBorder</option>" +
                                        "<option value='InactiveCaption' style='background-color:InactiveCaption'>InactiveCaption</option>" +
                                        "<option value='InactiveCaptionText' style='background-color:InactiveCaptionText'>InactiveCaptionText</option>" +
                                        "<option value='IndianRed' style='background-color:IndianRed'>IndianRed</option>" +
                                        "<option value='Indigo' style='background-color:Indigo'>Indigo</option>" +
                                        "<option value='Ivory' style='background-color:Ivory'>Ivory</option>" +
                                        "<option value='Info' style='background-color:Info'>Info</option>" +
                                        "<option value='InfoText' style='background-color:InfoText'>InfoText</option>" +
                                        "<option value='Khaki' style='background-color:Khaki'>Khaki</option>" +
                                        "<option value='Lavender' style='background-color:Lavender'>Lavender</option>" +
                                        "<option value='LavenderBlush' style='background-color:LavenderBlush'>LavenderBlush</option>" +
                                        "<option value='LawnGreen' style='background-color:LawnGreen'>LawnGreen</option>" +
                                        "<option value='LemonChiffon' style='background-color:LemonChiffon'>LemonChiffon</option>" +
                                        "<option value='LightBlue' style='background-color:LightBlue'>LightBlue</option>" +
                                        "<option value='LightCoral' style='background-color:LightCoral'>LightCoral</option>" +
                                        "<option value='LightCyan' style='background-color:LightCyan'>LightCyan</option>" +
                                        "<option value='LightGoldenrodYellow' style='background-color:LightGoldenrodYellow'>LightGoldenrodYellow</option>" +
                                        "<option value='LightGray' style='background-color:LightGray'>LightGray</option>" +
                                        "<option value='LightGreen' style='background-color:LightGreen'>LightGreen</option>" +
                                        "<option value='LightPink' style='background-color:LightPink'>LightPink</option>" +
                                        "<option value='LightSalmon' style='background-color:LightSalmon'>LightSalmon</option>" +
                                        "<option value='LightSeaGreen' style='background-color:LightSeaGreen'>LightSeaGreen</option>" +
                                        "<option value='LightSkyBlue' style='background-color:LightSkyBlue'>LightSkyBlue</option>" +
                                        "<option value='LightSlateGray' style='background-color:LightSlateGray'>LightSlateGray</option>" +
                                        "<option value='LightSteelBlue' style='background-color:LightSteelBlue'>LightSteelBlue</option>" +
                                        "<option value='LightYellow' style='background-color:LightYellow'>LightYellow</option>" +
                                        "<option value='Lime' style='background-color:Lime'>Lime</option>" +
                                        "<option value='LimeGreen' style='background-color:LimeGreen'>LimeGreen</option>" +
                                        "<option value='Linen' style='background-color:Linen'>Linen</option>" +
                                        "<option value='Magenta' style='background-color:Magenta'>Magenta</option>" +
                                        "<option value='Maroon' style='background-color:Maroon'>Maroon</option>" +
                                        "<option value='MediumAquamarine' style='background-color:MediumAquamarine'>MediumAquamarine</option>" +
                                        "<option value='MediumBlue' style='background-color:MediumBlue'>MediumBlue</option>" +
                                        "<option value='MediumOrchid' style='background-color:MediumOrchid'>MediumOrchid</option>" +
                                        "<option value='MediumPurple' style='background-color:MediumPurple'>MediumPurple</option>" +
                                        "<option value='MediumSeaGreen' style='background-color:MediumSeaGreen'>MediumSeaGreen</option>" +
                                        "<option value='MediumSlateBlue' style='background-color:MediumSlateBlue'>MediumSlateBlue</option>" +
                                        "<option value='MediumSpringGreen' style='background-color:MediumSpringGreen'>MediumSpringGreen</option>" +
                                        "<option value='MediumTurquoise' style='background-color:MediumTurquoise'>MediumTurquoise</option>" +
                                        "<option value='MediumVioletRed' style='background-color:MediumVioletRed'>MediumVioletRed</option>" +
                                        "<option value='Menu' style='background-color:Menu'>Menu</option>" +
                                        "<option value='MenuText' style='background-color:MenuText'>MenuText</option>" +
                                        "<option value='MidnightBlue' style='background-color:MidnightBlue'>MidnightBlue</option>" +
                                        "<option value='MintCream' style='background-color:MintCream'>MintCream</option>" +
                                        "<option value='Moccasin' style='background-color:Moccasin'>Moccasin</option>" +
                                        "<option value='MenuBar' style='background-color:MenuBar'>MenuBar</option>" +
                                        "<option value='MenuHighlight' style='background-color:MenuHighlight'>MenuHighlight</option>" +
                                        "<option value='NavajoWhite' style='background-color:NavajoWhite'>NavajoWhite</option>" +
                                        "<option value='Navy' style='background-color:Navy'>Navy</option>" +
                                        "<option value='OldLace' style='background-color:OldLace'>OldLace</option>" +
                                        "<option value='Olive' style='background-color:Olive'>Olive</option>" +
                                        "<option value='OliveDrab' style='background-color:OliveDrab'>OliveDrab</option>" +
                                        "<option value='Orange' style='background-color:Orange'>Orange</option>" +
                                        "<option value='OrangeRed' style='background-color:OrangeRed'>OrangeRed</option>" +
                                        "<option value='Orchid' style='background-color:Orchid'>Orchid</option>" +
                                        "<option value='PaleGoldenrod' style='background-color:PaleGoldenrod'>PaleGoldenrod</option>" +
                                        "<option value='PaleGreen' style='background-color:PaleGreen'>PaleGreen</option>" +
                                        "<option value='PaleTurquoise' style='background-color:PaleTurquoise'>PaleTurquoise</option>" +
                                        "<option value='PaleVioletRed' style='background-color:PaleVioletRed'>PaleVioletRed</option>" +
                                        "<option value='PapayaWhip' style='background-color:PapayaWhip'>PapayaWhip</option>" +
                                        "<option value='PeachPuff' style='background-color:PeachPuff'>PeachPuff</option>" +
                                        "<option value='Peru' style='background-color:Peru'>Peru</option>" +
                                        "<option value='Pink' style='background-color:Pink'>Pink</option>" +
                                        "<option value='Plum' style='background-color:Plum'>Plum</option>" +
                                        "<option value='PowderBlue' style='background-color:PowderBlue'>PowderBlue</option>" +
                                        "<option value='Purple' style='background-color:Purple'>Purple</option>" +
                                        "<option value='Red' style='background-color:Red'>Red</option>" +
                                        "<option value='RosyBrown' style='background-color:RosyBrown'>RosyBrown</option>" +
                                        "<option value='RoyalBlue' style='background-color:RoyalBlue'>RoyalBlue</option>" +
                                        "<option value='SaddleBrown' style='background-color:SaddleBrown'>SaddleBrown</option>" +
                                        "<option value='Salmon' style='background-color:Salmon'>Salmon</option>" +
                                        "<option value='SandyBrown' style='background-color:SandyBrown'>SandyBrown</option>" +
                                        "<option value='ScrollBar' style='background-color:ScrollBar'>ScrollBar</option>" +
                                        "<option value='SeaGreen' style='background-color:SeaGreen'>SeaGreen</option>" +
                                        "<option value='SeaShell' style='background-color:SeaShell'>SeaShell</option>" +
                                        "<option value='Sienna' style='background-color:Sienna'>Sienna</option>" +
                                        "<option value='Silver' style='background-color:Silver'>Silver</option>" +
                                        "<option value='SkyBlue' style='background-color:SkyBlue'>SkyBlue</option>" +
                                        "<option value='SlateBlue' style='background-color:SlateBlue'>SlateBlue</option>" +
                                        "<option value='SlateGray' style='background-color:SlateGray'>SlateGray</option>" +
                                        "<option value='Snow' style='background-color:Snow'>Snow</option>" +
                                        "<option value='SpringGreen' style='background-color:SpringGreen'>SpringGreen</option>" +
                                        "<option value='SteelBlue' style='background-color:SteelBlue'>SteelBlue</option>" +
                                        "<option value='Tan' style='background-color:Tan'>Tan</option>" +
                                        "<option value='Teal' style='background-color:Teal'>Teal</option>" +
                                        "<option value='Thistle' style='background-color:Thistle'>Thistle</option>" +
                                        "<option value='Tomato' style='background-color:Tomato'>Tomato</option>" +
                                        "<option value='Transparent' style='background-color:Transparent'>Transparent</option>" +
                                        "<option value='Turquoise' style='background-color:Turquoise'>Turquoise</option>" +
                                        "<option value='Violet' style='background-color:Violet'>Violet</option>" +
                                        "<option value='Wheat' style='background-color:Wheat'>Wheat</option>" +
                                        "<option value='White' style='background-color:White'>White</option>" +
                                        "<option value='WhiteSmoke' style='background-color:WhiteSmoke'>WhiteSmoke</option>" +
                                        "<option value='Window' style='background-color:Window'>Window</option>" +
                                        "<option value='WindowFrame' style='background-color:WindowFrame'>WindowFrame</option>" +
                                        "<option value='WindowText' style='background-color:WindowText'>WindowText</option>" +
                                        "<option value='Yellow' style='background-color:Yellow'>Yellow</option>" +
                                        "<option value='YellowGreen' style='background-color:YellowGreen'>YellowGreen</option></select>" +
                                        "<select style='width: 389px; height: 34px;display:none;margin-left:4px;' id='FontWeight_" + FieldCountforId + "' class='reactionvalue'>" +
                                        "<option value='normal'>Normal</option>" +
                                        "<option value='bold'>Bold</option>" +
                                        "<option value='italic'>Italic</option>" +
                                        "<option value='underline'>Underline</option></select>" +
                                        "<input class='reactionvalue' style='width: 35%;display:none;margin-left:4px;' type='text' id='RplceText_" + FieldCountforId + "'>" +
                                        "<img id='indicateimg_" + FieldCountforId + "' class='reactionvalueimg' width='26' height='26' style='display: none; vertical-align: middle; margin-left: 10px;padding: 0;' src='../../Images/indicators icons/ind-triangle-down-green.png'><a id='selecticon_" + FieldCountforId + "' class='reactionvalue' ng-click='showindicatepopup(\"indicateimg_" + FieldCountforId + "\")' style='display: none;margin-left: 10px;padding: 0;'>Select Icon</a>" +
                                        "<button type='button' ng-click='addprop();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                        "<button type='button' ng-click='Removeprop(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px'>--</button></div>")($scope));
                          }
                          else {

                              addTo = angular.element($compile("<div id='divid_" + FieldCountforId + "'><span class='PropertyLine' id='thencon' style='width: 42px; font-size: 13px; font-weight: bold; margin-top: 8px'>and</span>" +
                                "<input type='text' style='width: 233px; margin-left: 18px;' value='Text' id='textdisable' disabled='disabled' class='PropertyLine' />" +
                                "<select id='change_" + FieldCountforId + "' style='width: 233px; height: 34px;margin-left:4px' class='dropdownchang'>" +
                                             "<option value='None' selected='selected'>None</option>" +
                                             "<option value='change color'>change color</option>" +
                                             "<option value='display icon'>display icon</option>" +
                                             "<option value='change style'>change style</option>" +
                                             "<option value='replace with text'>replace with text</option></select>" +
                                             "<select id='colordd_" + FieldCountforId + "' style='width: 389px; height: 34px;margin-left:4px;display:none;' class='reactionvalue'>" +
                                           " <option value='ActiveBorder' style='background-color:ActiveBorder'>ActiveBorder</option>" +
                                        "<option value='ActiveCaption' style='background-color:ActiveCaption'>ActiveCaption</option>" +
                                        "<option value='ActiveCaptionText' style='background-color:ActiveCaptionText'>ActiveCaptionText</option>" +
                                        "<option value='AppWorkspace' style='background-color:AppWorkspace'>AppWorkspace</option>" +
                                        "<option value='AliceBlue' style='background-color:AliceBlue'>AliceBlue</option>" +
                                        "<option value='AntiqueWhite' style='background-color:AntiqueWhite'>AntiqueWhite</option>" +
                                        "<option value='Aqua' style='background-color:Aqua'>Aqua</option>" +
                                        "<option value='Aquamarine' style='background-color:Aquamarine'>Aquamarine</option>" +
                                        "<option value='Azure' style='background-color:Azure'>Azure</option>" +
                                        "<option value='Beige' style='background-color:Beige'>Beige</option>" +
                                        "<option value='Bisque' style='background-color:Bisque'>Bisque</option>" +
                                        "<option value='Black' style='background-color:Black'>Black</option>" +
                                        "<option value='BlanchedAlmond' style='background-color:BlanchedAlmond'>BlanchedAlmond</option>" +
                                        "<option value='Blue' selected='selected' style='background-color:Blue'>Blue</option>" +
                                        "<option value='BlueViolet' style='background-color:BlueViolet'>BlueViolet</option>" +
                                        "<option value='Brown' style='background-color:Brown'>Brown</option>" +
                                        "<option value='BurlyWood' style='background-color:BurlyWood'>BurlyWood</option>" +
                                        "<option value='ButtonFace' style='background-color:ButtonFace'>ButtonFace</option>" +
                                        "<option value='ButtonHighlight' style='background-color:ButtonHighlight'>ButtonHighlight</option>" +
                                        "<option value='ButtonShadow' style='background-color:ButtonShadow'>ButtonShadow</option>" +
                                        "<option value='CadetBlue' style='background-color:CadetBlue'>CadetBlue</option>" +
                                        "<option value='Chartreuse' style='background-color:Chartreuse'>Chartreuse</option>" +
                                        " <option value='Chocolate' style='background-color:Chocolate'>Chocolate</option>" +
                                        "<option value='Control' style='background-color:Control'>Control</option>" +
                                        "<option value='ControlDark' style='background-color:ControlDark'>ControlDark</option>" +
                                        "<option value='ControlDarkDark' style='background-color:ControlDarkDark'>ControlDarkDark</option>" +
                                        "<option value='ControlLight' style='background-color:ControlLight'>ControlLight</option>" +
                                        " <option value='ControlLightLight' style='background-color:ControlLightLight'>ControlLightLight</option>" +
                                        "<option value='ControlText' style='background-color:ControlText'>ControlText</option>" +
                                        "<option value='Coral' style='background-color:Coral'>Coral</option>" +
                                        " <option value='CornflowerBlue' style='background-color:CornflowerBlue'>CornflowerBlue</option>" +
                                        " <option value='Cornsilk' style='background-color:Cornsilk'>Cornsilk</option>" +
                                        " <option value='Crimson' style='background-color:Crimson'>Crimson</option>" +
                                        " <option value='Cyan' style='background-color:Cyan'>Cyan</option>" +
                                        "<option value='DarkBlue' style='background-color:DarkBlue'>DarkBlue</option>" +
                                        " <option value='DarkCyan' style='background-color:DarkCyan'>DarkCyan</option>" +
                                        "<option value='DarkGoldenrod' style='background-color:DarkGoldenrod'>DarkGoldenrod</option>" +
                                        "<option value='DarkGray' style='background-color:DarkGray'>DarkGray</option>" +
                                        "<option value='DarkGreen' style='background-color:DarkGreen'>DarkGreen</option>" +
                                        "<option value='DarkKhaki' style='background-color:DarkKhaki'>DarkKhaki</option>" +
                                        "<option value='DarkMagenta' style='background-color:DarkMagenta'>DarkMagenta</option>" +
                                        "<option value='DarkOliveGreen' style='background-color:DarkOliveGreen'>DarkOliveGreen</option>" +
                                        "<option value='DarkOrange' style='background-color:DarkOrange'>DarkOrange</option>" +
                                        "<option value='DarkOrchid' style='background-color:DarkOrchid'>DarkOrchid</option>" +
                                        "<option value='DarkRed' style='background-color:DarkRed'>DarkRed</option>" +
                                        "<option value='DarkSalmon' style='background-color:DarkSalmon'>DarkSalmon</option>" +
                                        "<option value='DarkSeaGreen' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateBlue' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateGray' style='background-color:DarkSlateGray'>DarkSlateGray</option>" +
                                        "<option value='DarkTurquoise' style='background-color:DarkTurquoise'>DarkTurquoise</option>" +
                                        "<option value='DarkViolet' style='background-color:DarkViolet'>DarkViolet</option>" +
                                        "<option value='DeepPink' style='background-color:DeepPink'>DeepPink</option>" +
                                        "<option value='DeepSkyBlue' style='background-color:DeepSkyBlue'>DeepSkyBlue</option>" +
                                        "<option value='Desktop' style='background-color:Desktop'>Desktop</option>" +
                                        "<option value='DimGray' style='background-color:DimGray'>DimGray</option>" +
                                        "<option value='DodgerBlue' style='background-color:DodgerBlue'>DodgerBlue</option>" +
                                        "<option value='Firebrick' style='background-color:Firebrick'>Firebrick</option>" +
                                        "<option value='FloralWhite' style='background-color:FloralWhite'>FloralWhite</option>" +
                                        "<option value='ForestGreen' style='background-color:ForestGreen'>ForestGreen</option>" +
                                        "<option value='Fuchsia' style='background-color:Fuchsia'>Fuchsia</option>" +
                                        "<option value='Gainsboro' style='background-color:Gainsboro'>Gainsboro</option>" +
                                        "<option value='GhostWhite' style='background-color:GhostWhite'>GhostWhite</option>" +
                                        "<option value='Gold' style='background-color:Gold'>Gold</option>" +
                                        "<option value='Goldenrod' style='background-color:Goldenrod'>Goldenrod</option>" +
                                        "<option value='Gray' style='background-color:Gray'>Gray</option>" +
                                        "<option value='Green' style='background-color:Green'>Green</option>" +
                                        "<option value='GreenYellow' style='background-color:GreenYellow'>GreenYellow</option>" +
                                        "<option value='GradientActiveCaption' style='background-color:GradientActiveCaption'>GradientActiveCaption</option>" +
                                        "<option value='GradientInactiveCaption' style='background-color:GradientInactiveCaption'>GradientInactiveCaption</option>" +
                                        "<option value='GrayText' style='background-color:GrayText'>GrayText</option>" +
                                        "<option value='Highlight' style='background-color:Highlight'>Highlight</option>" +
                                        "<option value='HighlightText' style='background-color:HighlightText'>HighlightText</option>" +
                                        "<option value='Honeydew' style='background-color:Honeydew'>Honeydew</option>" +
                                        "<option value='HotPink' style='background-color:HotPink'>HotPink</option>" +
                                        "<option value='HotTrack' style='background-color:HotTrack'>HotTrack</option>" +
                                        "<option value='InactiveBorder' style='background-color:InactiveBorder'>InactiveBorder</option>" +
                                        "<option value='InactiveCaption' style='background-color:InactiveCaption'>InactiveCaption</option>" +
                                        "<option value='InactiveCaptionText' style='background-color:InactiveCaptionText'>InactiveCaptionText</option>" +
                                        "<option value='IndianRed' style='background-color:IndianRed'>IndianRed</option>" +
                                        "<option value='Indigo' style='background-color:Indigo'>Indigo</option>" +
                                        "<option value='Ivory' style='background-color:Ivory'>Ivory</option>" +
                                        "<option value='Info' style='background-color:Info'>Info</option>" +
                                        "<option value='InfoText' style='background-color:InfoText'>InfoText</option>" +
                                        "<option value='Khaki' style='background-color:Khaki'>Khaki</option>" +
                                        "<option value='Lavender' style='background-color:Lavender'>Lavender</option>" +
                                        "<option value='LavenderBlush' style='background-color:LavenderBlush'>LavenderBlush</option>" +
                                        "<option value='LawnGreen' style='background-color:LawnGreen'>LawnGreen</option>" +
                                        "<option value='LemonChiffon' style='background-color:LemonChiffon'>LemonChiffon</option>" +
                                        "<option value='LightBlue' style='background-color:LightBlue'>LightBlue</option>" +
                                        "<option value='LightCoral' style='background-color:LightCoral'>LightCoral</option>" +
                                        "<option value='LightCyan' style='background-color:LightCyan'>LightCyan</option>" +
                                        "<option value='LightGoldenrodYellow' style='background-color:LightGoldenrodYellow'>LightGoldenrodYellow</option>" +
                                        "<option value='LightGray' style='background-color:LightGray'>LightGray</option>" +
                                        "<option value='LightGreen' style='background-color:LightGreen'>LightGreen</option>" +
                                        "<option value='LightPink' style='background-color:LightPink'>LightPink</option>" +
                                        "<option value='LightSalmon' style='background-color:LightSalmon'>LightSalmon</option>" +
                                        "<option value='LightSeaGreen' style='background-color:LightSeaGreen'>LightSeaGreen</option>" +
                                        "<option value='LightSkyBlue' style='background-color:LightSkyBlue'>LightSkyBlue</option>" +
                                        "<option value='LightSlateGray' style='background-color:LightSlateGray'>LightSlateGray</option>" +
                                        "<option value='LightSteelBlue' style='background-color:LightSteelBlue'>LightSteelBlue</option>" +
                                        "<option value='LightYellow' style='background-color:LightYellow'>LightYellow</option>" +
                                        "<option value='Lime' style='background-color:Lime'>Lime</option>" +
                                        "<option value='LimeGreen' style='background-color:LimeGreen'>LimeGreen</option>" +
                                        "<option value='Linen' style='background-color:Linen'>Linen</option>" +
                                        "<option value='Magenta' style='background-color:Magenta'>Magenta</option>" +
                                        "<option value='Maroon' style='background-color:Maroon'>Maroon</option>" +
                                        "<option value='MediumAquamarine' style='background-color:MediumAquamarine'>MediumAquamarine</option>" +
                                        "<option value='MediumBlue' style='background-color:MediumBlue'>MediumBlue</option>" +
                                        "<option value='MediumOrchid' style='background-color:MediumOrchid'>MediumOrchid</option>" +
                                        "<option value='MediumPurple' style='background-color:MediumPurple'>MediumPurple</option>" +
                                        "<option value='MediumSeaGreen' style='background-color:MediumSeaGreen'>MediumSeaGreen</option>" +
                                        "<option value='MediumSlateBlue' style='background-color:MediumSlateBlue'>MediumSlateBlue</option>" +
                                        "<option value='MediumSpringGreen' style='background-color:MediumSpringGreen'>MediumSpringGreen</option>" +
                                        "<option value='MediumTurquoise' style='background-color:MediumTurquoise'>MediumTurquoise</option>" +
                                        "<option value='MediumVioletRed' style='background-color:MediumVioletRed'>MediumVioletRed</option>" +
                                        "<option value='Menu' style='background-color:Menu'>Menu</option>" +
                                        "<option value='MenuText' style='background-color:MenuText'>MenuText</option>" +
                                        "<option value='MidnightBlue' style='background-color:MidnightBlue'>MidnightBlue</option>" +
                                        "<option value='MintCream' style='background-color:MintCream'>MintCream</option>" +
                                        "<option value='Moccasin' style='background-color:Moccasin'>Moccasin</option>" +
                                        "<option value='MenuBar' style='background-color:MenuBar'>MenuBar</option>" +
                                        "<option value='MenuHighlight' style='background-color:MenuHighlight'>MenuHighlight</option>" +
                                        "<option value='NavajoWhite' style='background-color:NavajoWhite'>NavajoWhite</option>" +
                                        "<option value='Navy' style='background-color:Navy'>Navy</option>" +
                                        "<option value='OldLace' style='background-color:OldLace'>OldLace</option>" +
                                        "<option value='Olive' style='background-color:Olive'>Olive</option>" +
                                        "<option value='OliveDrab' style='background-color:OliveDrab'>OliveDrab</option>" +
                                        "<option value='Orange' style='background-color:Orange'>Orange</option>" +
                                        "<option value='OrangeRed' style='background-color:OrangeRed'>OrangeRed</option>" +
                                        "<option value='Orchid' style='background-color:Orchid'>Orchid</option>" +
                                        "<option value='PaleGoldenrod' style='background-color:PaleGoldenrod'>PaleGoldenrod</option>" +
                                        "<option value='PaleGreen' style='background-color:PaleGreen'>PaleGreen</option>" +
                                        "<option value='PaleTurquoise' style='background-color:PaleTurquoise'>PaleTurquoise</option>" +
                                        "<option value='PaleVioletRed' style='background-color:PaleVioletRed'>PaleVioletRed</option>" +
                                        "<option value='PapayaWhip' style='background-color:PapayaWhip'>PapayaWhip</option>" +
                                        "<option value='PeachPuff' style='background-color:PeachPuff'>PeachPuff</option>" +
                                        "<option value='Peru' style='background-color:Peru'>Peru</option>" +
                                        "<option value='Pink' style='background-color:Pink'>Pink</option>" +
                                        "<option value='Plum' style='background-color:Plum'>Plum</option>" +
                                        "<option value='PowderBlue' style='background-color:PowderBlue'>PowderBlue</option>" +
                                        "<option value='Purple' style='background-color:Purple'>Purple</option>" +
                                        "<option value='Red' style='background-color:Red'>Red</option>" +
                                        "<option value='RosyBrown' style='background-color:RosyBrown'>RosyBrown</option>" +
                                        "<option value='RoyalBlue' style='background-color:RoyalBlue'>RoyalBlue</option>" +
                                        "<option value='SaddleBrown' style='background-color:SaddleBrown'>SaddleBrown</option>" +
                                        "<option value='Salmon' style='background-color:Salmon'>Salmon</option>" +
                                        "<option value='SandyBrown' style='background-color:SandyBrown'>SandyBrown</option>" +
                                        "<option value='ScrollBar' style='background-color:ScrollBar'>ScrollBar</option>" +
                                        "<option value='SeaGreen' style='background-color:SeaGreen'>SeaGreen</option>" +
                                        "<option value='SeaShell' style='background-color:SeaShell'>SeaShell</option>" +
                                        "<option value='Sienna' style='background-color:Sienna'>Sienna</option>" +
                                        "<option value='Silver' style='background-color:Silver'>Silver</option>" +
                                        "<option value='SkyBlue' style='background-color:SkyBlue'>SkyBlue</option>" +
                                        "<option value='SlateBlue' style='background-color:SlateBlue'>SlateBlue</option>" +
                                        "<option value='SlateGray' style='background-color:SlateGray'>SlateGray</option>" +
                                        "<option value='Snow' style='background-color:Snow'>Snow</option>" +
                                        "<option value='SpringGreen' style='background-color:SpringGreen'>SpringGreen</option>" +
                                        "<option value='SteelBlue' style='background-color:SteelBlue'>SteelBlue</option>" +
                                        "<option value='Tan' style='background-color:Tan'>Tan</option>" +
                                        "<option value='Teal' style='background-color:Teal'>Teal</option>" +
                                        "<option value='Thistle' style='background-color:Thistle'>Thistle</option>" +
                                        "<option value='Tomato' style='background-color:Tomato'>Tomato</option>" +
                                        "<option value='Transparent' style='background-color:Transparent'>Transparent</option>" +
                                        "<option value='Turquoise' style='background-color:Turquoise'>Turquoise</option>" +
                                        "<option value='Violet' style='background-color:Violet'>Violet</option>" +
                                        "<option value='Wheat' style='background-color:Wheat'>Wheat</option>" +
                                        "<option value='White' style='background-color:White'>White</option>" +
                                        "<option value='WhiteSmoke' style='background-color:WhiteSmoke'>WhiteSmoke</option>" +
                                        "<option value='Window' style='background-color:Window'>Window</option>" +
                                        "<option value='WindowFrame' style='background-color:WindowFrame'>WindowFrame</option>" +
                                        "<option value='WindowText' style='background-color:WindowText'>WindowText</option>" +
                                        "<option value='Yellow' style='background-color:Yellow'>Yellow</option>" +
                                        "<option value='YellowGreen' style='background-color:YellowGreen'>YellowGreen</option></select>" +
                                              "<select style='width: 389px; height: 34px;display:none;margin-left:4px;' id='FontWeight_" + FieldCountforId + "' class='reactionvalue'>" +
                                             "<option value='normal'>Normal</option>" +
                                             "<option value='bold'>Bold</option>" +
                                             "<option value='italic'>Italic</option>" +
                                             "<option value='underline'>Underline</option></select>" +
                                             "<input class='reactionvalue' style='width: 35%;display:none;margin-left:4px;' type='text' id='RplceText_" + FieldCountforId + "'>" +
                                             "<img id='indicateimg_" + FieldCountforId + "' class='reactionvalueimg' width='26' height='26' style='display: none; vertical-align: middle; margin-left: 10px;padding: 0;' src='../../Images/indicators icons/ind-triangle-down-green.png'><a id='selecticon_" + FieldCountforId + "' class='reactionvalue' ng-click='showindicatepopup(\"indicateimg_" + FieldCountforId + "\")' style='display: none;margin-left: 10px;padding: 0;'>Select Icon</a>" +
                                             "<button type='button' ng-click='addprop();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                             "<button type='button' ng-click='Removeprop(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px'>--</button></div>")($scope));
                          }
                          $("#subdiv").append(addTo);

                          $("#change_" + FieldCountforId).val(primeObj.primaryconditions[0].primereactions[rc].type);
                          var reacttype = primeObj.primaryconditions[0].primereactions[rc].type;
                          if (reacttype == "change color") {
                              $("#colordd_" + FieldCountforId).show();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#colordd_" + FieldCountforId).val(primeObj.primaryconditions[0].primereactions[rc].reactvalue);
                          } else if (reacttype == "display icon") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).show();
                              $("#selecticon_" + FieldCountforId).show();
                              $("#indicateimg_" + FieldCountforId).attr("src", primeObj.primaryconditions[0].primereactions[rc].reactvalue);
                          } else if (reacttype == "change style") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).show();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).val(primeObj.primaryconditions[0].primereactions[rc].reactvalue);
                          } else if (reacttype == "replace with text") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).show();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).val(primeObj.primaryconditions[0].primereactions[rc].reactvalue);
                          } else if (reacttype == "None") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                          }
                      }
                      $scope.changeindicatereactions();
                  }

                  //.................................indicators update code................................................//

                  //.................................indicators code................................................//

              }
              else if (sel == "SecondaryValues") {
                  $scope.selected = 1;
                  $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
                  $("#valuepairdatatab").show(); $("#valuepairproperiestab").show(); $("#valuepairindicatorstab").show(); $("#valuepairprop").hide(); $("#vpairtab-properties").show(); $("#VFormula-menu").show(); $("#vf-formula-bar").show();
                  $scope.selecteditem = "SecondaryValues";
                  var connectionid = selecteditem.get("data_column_secondaryvalues").connectionid;
                  var secondobj = selecteditem.get("secondary_style");
                  $(".btn-group").find("button[name=align]").each(function (i) {
                      if ($(this).attr("data-index").trim() == secondobj.allignment) {
                          $(".btn-group").find(".btn-default").each(function (i) {
                              $(this).removeClass("btn-default");
                          });
                          $(this).addClass("btn-default");
                      }
                  });
                  if (secondobj.Fontweight == "bold") {
                      $(".btn-group1").find("#textweight").addClass("btn-default");
                  }
                  else {
                      $(".btn-group1").find("#textweight").removeClass("btn-default");
                  }
                  if (secondobj.Fontstyle == "italic") {
                      $(".btn-group1").find("#textstyle").addClass("btn-default");
                  }
                  else {
                      $(".btn-group1").find("#textstyle").removeClass("btn-default");
                  }
                  if (secondobj.TextDecoration == "underline") {
                      $(".btn-group1").find("#textdecorate").addClass("btn-default");
                  }
                  else {
                      $(".btn-group1").find("#textdecorate").removeClass("btn-default");
                  }
                  // $("#allignment").val(secondobj.allignment);
                  $("#fontsize").val(secondobj.FontSize);
                  $("#fmtfamily").val(secondobj.FontFamily);
                  $("#color1").val(secondobj.Fontcolor);
                  $(".colorPicker-picker").css({ "background-color": secondobj.Fontcolor });
                  $("#prefix").val(secondobj.prefix);
                  $("#suffix").val(secondobj.suffix);

                  $("#fmtas").val(secondobj.FormatAs);
                  $("#fmtas").val() == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide(), $("#FromUrlTextBox").hide(), $("#FromDashBoard").hide();

                  $("#numberDecimal").val(parseInt(secondobj.Decimal));


                  if (connectionid != "undefined") {
                      var connectionobject = new Array();
                      var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                      var selection = angular.element('#' + selecteditem.get("data_column_secondaryvalues").selectedid + '');
                      connectionobject.push({
                          "DSConnType": selection.attr("data-connectiontype"),
                          "ConnectionID": selection.attr("data-connectionid"),
                          "DSId": selection.attr("data-DSId"),
                          "DSName": selection.attr("data-DSName"),
                          "DSCnnCretedby": selection.attr("data-DSCnnCretedby")
                      });
                      $scope.getdata(connectionobject, selection);
                      $("#vf-formula-bar").html(selecteditem.get("data_column_secondaryvalues").formula_template);
                  }
                  if (selecteditem.get("data_column_secondaryvalues").formula_template != "undefined")
                      $scope.modalq = { presuffixstatus: false };
                  else
                      $scope.modalq = { presuffixstatus: true };
                  $scope.modal.tablestatus = true;
                  $scope.modal.expressionstatus = true;
                  $scope.modal.strnumstatus = true;
                  $scope.modal.variablestatus = true;
                  // //.................................indicators code................................................//

                  // //.................................indicators update code................................................//

                  var secondObj = selecteditem.get("data_column_secondaryvalues");
                  var secondobjprcnt = secondObj.secondaryconditions[0].secondpredicates.length;

                  $("#mainDiv").empty();
                  $("#subdiv").empty();

                  if (secondobjprcnt >= 1) {
                      for (var pr = 0; pr < secondobjprcnt; pr++) {
                          var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                          var addeditems;
                          if (pr == 0) {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>if</span>" +
                                 "<input type='text' style='width: 233px; height: 34px; margin-left: 30px;' id='text" + FieldCount + "' value='SecondaryValues' disabled='disabled'/>" +
                                  //"<option value='Textselect' selected='selected'>PrimaryValues</option><option value='Textselect'>SecondaryValues</option></select>" +
                                  "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  "<option value='is equal to'>is equal to </option>" +
                                  "<option value='is not equal to'>is not equal to </option>" +
                                  "<option value='is greater than' selected='selected'>is greater than</option>" +
                                  "<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  "<option value='is less than'>is less than</option>" +
                                  "<option value='is less than or equal to'>is less than or equal to</option>" +
                                  "<option value='contains'>contains</option>" +
                                  "<option value='does not contain'>does not contain</option>" +
                                  "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          else {
                              addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>and</span>" +
                                 "<input type='text' style='width: 233px; height: 34px; margin-left: 16px;' id='text" + FieldCount + "' value='SecondaryValues' disabled='disabled'/>" +
                                  //"<option value='PrimaryValues' selected='selected'>PrimaryValues</option><option value='SecondaryValues'>SecondaryValues</option></select>" +
                                  "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
                                  "<option value='is equal to'>is equal to </option>" +
                                  "<option value='is not equal to'>is not equal to </option>" +
                                  "<option value='is greater than' selected='selected'>is greater than</option>" +
                                  "<option value='is greater than or equal to'>is greater than or equal to</option>" +
                                  "<option value='is less than'>is less than</option>" +
                                  "<option value='is less than or equal to'>is less than or equal to</option>" +
                                  "<option value='contains'>contains</option>" +
                                  "<option value='does not contain'>does not contain</option>" +
                                  "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
                                  "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                  "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));
                          }
                          $("#mainDiv").append(addeditems);

                          $("#predicate_" + FieldCount).val(secondObj.secondaryconditions[0].secondpredicates[pr].type);
                          $("#predicateText_" + FieldCount).val(secondObj.secondaryconditions[0].secondpredicates[pr].value);
                      }
                      $scope.changeindicateprediactes();

                      //var primeObj = selecteditem.get("data_column_primaryvalues");
                      //primeObj.Control = sel;
                      //selecteditem.unset("data_column_primaryvalues", { silent: true });
                      //selecteditem.set({ "data_column_primaryvalues": primeobj });

                  }

                  var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;

                  if (secondobjrccnt >= 1) {
                      for (var rc = 0; rc < secondobjrccnt; rc++) {
                          var FieldCountforId = Math.floor((Math.random() * 7683480) + 198);
                          var addTo;
                          if (rc == 0) {
                              addTo = angular.element($compile("<div id='divid_" + FieldCountforId + "'><span class='PropertyLine' id='thencon' style='width: 42px; font-size: 13px; font-weight: bold; margin-top: 8px'>then</span>" +
                           "<input type='text' style='width: 233px; margin-left: 13px;' value='Text' id='textdisable' disabled='disabled' class='PropertyLine' />" +
                           "<select id='change_" + FieldCountforId + "' style='width: 233px; height: 34px;margin-left:4px' class='dropdownchang'>" +
                                        "<option value='None' selected='selected'>None</option>" +
                                        "<option value='change color'>change color</option>" +
                                        "<option value='display icon'>display icon</option>" +
                                        "<option value='change style'>change style</option>" +
                                        "<option value='replace with text'>replace with text</option></select>" +
                                        "<select id='colordd_" + FieldCountforId + "' style='width: 389px; height: 34px;margin-left:4px;display:none;' class='reactionvalue'>" +
                                       " <option value='ActiveBorder' style='background-color:ActiveBorder'>ActiveBorder</option>" +
                                        "<option value='ActiveCaption' style='background-color:ActiveCaption'>ActiveCaption</option>" +
                                        "<option value='ActiveCaptionText' style='background-color:ActiveCaptionText'>ActiveCaptionText</option>" +
                                        "<option value='AppWorkspace' style='background-color:AppWorkspace'>AppWorkspace</option>" +
                                        "<option value='AliceBlue' style='background-color:AliceBlue'>AliceBlue</option>" +
                                        "<option value='AntiqueWhite' style='background-color:AntiqueWhite'>AntiqueWhite</option>" +
                                        "<option value='Aqua' style='background-color:Aqua'>Aqua</option>" +
                                        "<option value='Aquamarine' style='background-color:Aquamarine'>Aquamarine</option>" +
                                        "<option value='Azure' style='background-color:Azure'>Azure</option>" +
                                        "<option value='Beige' style='background-color:Beige'>Beige</option>" +
                                        "<option value='Bisque' style='background-color:Bisque'>Bisque</option>" +
                                        "<option value='Black' style='background-color:Black'>Black</option>" +
                                        "<option value='BlanchedAlmond' style='background-color:BlanchedAlmond'>BlanchedAlmond</option>" +
                                        "<option value='Blue' selected='selected' style='background-color:Blue'>Blue</option>" +
                                        "<option value='BlueViolet' style='background-color:BlueViolet'>BlueViolet</option>" +
                                        "<option value='Brown' style='background-color:Brown'>Brown</option>" +
                                        "<option value='BurlyWood' style='background-color:BurlyWood'>BurlyWood</option>" +
                                        "<option value='ButtonFace' style='background-color:ButtonFace'>ButtonFace</option>" +
                                        "<option value='ButtonHighlight' style='background-color:ButtonHighlight'>ButtonHighlight</option>" +
                                        "<option value='ButtonShadow' style='background-color:ButtonShadow'>ButtonShadow</option>" +
                                        "<option value='CadetBlue' style='background-color:CadetBlue'>CadetBlue</option>" +
                                        "<option value='Chartreuse' style='background-color:Chartreuse'>Chartreuse</option>" +
                                        " <option value='Chocolate' style='background-color:Chocolate'>Chocolate</option>" +
                                        "<option value='Control' style='background-color:Control'>Control</option>" +
                                        "<option value='ControlDark' style='background-color:ControlDark'>ControlDark</option>" +
                                        "<option value='ControlDarkDark' style='background-color:ControlDarkDark'>ControlDarkDark</option>" +
                                        "<option value='ControlLight' style='background-color:ControlLight'>ControlLight</option>" +
                                        " <option value='ControlLightLight' style='background-color:ControlLightLight'>ControlLightLight</option>" +
                                        "<option value='ControlText' style='background-color:ControlText'>ControlText</option>" +
                                        "<option value='Coral' style='background-color:Coral'>Coral</option>" +
                                        " <option value='CornflowerBlue' style='background-color:CornflowerBlue'>CornflowerBlue</option>" +
                                        " <option value='Cornsilk' style='background-color:Cornsilk'>Cornsilk</option>" +
                                        " <option value='Crimson' style='background-color:Crimson'>Crimson</option>" +
                                        " <option value='Cyan' style='background-color:Cyan'>Cyan</option>" +
                                        "<option value='DarkBlue' style='background-color:DarkBlue'>DarkBlue</option>" +
                                        " <option value='DarkCyan' style='background-color:DarkCyan'>DarkCyan</option>" +
                                        "<option value='DarkGoldenrod' style='background-color:DarkGoldenrod'>DarkGoldenrod</option>" +
                                        "<option value='DarkGray' style='background-color:DarkGray'>DarkGray</option>" +
                                        "<option value='DarkGreen' style='background-color:DarkGreen'>DarkGreen</option>" +
                                        "<option value='DarkKhaki' style='background-color:DarkKhaki'>DarkKhaki</option>" +
                                        "<option value='DarkMagenta' style='background-color:DarkMagenta'>DarkMagenta</option>" +
                                        "<option value='DarkOliveGreen' style='background-color:DarkOliveGreen'>DarkOliveGreen</option>" +
                                        "<option value='DarkOrange' style='background-color:DarkOrange'>DarkOrange</option>" +
                                        "<option value='DarkOrchid' style='background-color:DarkOrchid'>DarkOrchid</option>" +
                                        "<option value='DarkRed' style='background-color:DarkRed'>DarkRed</option>" +
                                        "<option value='DarkSalmon' style='background-color:DarkSalmon'>DarkSalmon</option>" +
                                        "<option value='DarkSeaGreen' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateBlue' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateGray' style='background-color:DarkSlateGray'>DarkSlateGray</option>" +
                                        "<option value='DarkTurquoise' style='background-color:DarkTurquoise'>DarkTurquoise</option>" +
                                        "<option value='DarkViolet' style='background-color:DarkViolet'>DarkViolet</option>" +
                                        "<option value='DeepPink' style='background-color:DeepPink'>DeepPink</option>" +
                                        "<option value='DeepSkyBlue' style='background-color:DeepSkyBlue'>DeepSkyBlue</option>" +
                                        "<option value='Desktop' style='background-color:Desktop'>Desktop</option>" +
                                        "<option value='DimGray' style='background-color:DimGray'>DimGray</option>" +
                                        "<option value='DodgerBlue' style='background-color:DodgerBlue'>DodgerBlue</option>" +
                                        "<option value='Firebrick' style='background-color:Firebrick'>Firebrick</option>" +
                                        "<option value='FloralWhite' style='background-color:FloralWhite'>FloralWhite</option>" +
                                        "<option value='ForestGreen' style='background-color:ForestGreen'>ForestGreen</option>" +
                                        "<option value='Fuchsia' style='background-color:Fuchsia'>Fuchsia</option>" +
                                        "<option value='Gainsboro' style='background-color:Gainsboro'>Gainsboro</option>" +
                                        "<option value='GhostWhite' style='background-color:GhostWhite'>GhostWhite</option>" +
                                        "<option value='Gold' style='background-color:Gold'>Gold</option>" +
                                        "<option value='Goldenrod' style='background-color:Goldenrod'>Goldenrod</option>" +
                                        "<option value='Gray' style='background-color:Gray'>Gray</option>" +
                                        "<option value='Green' style='background-color:Green'>Green</option>" +
                                        "<option value='GreenYellow' style='background-color:GreenYellow'>GreenYellow</option>" +
                                        "<option value='GradientActiveCaption' style='background-color:GradientActiveCaption'>GradientActiveCaption</option>" +
                                        "<option value='GradientInactiveCaption' style='background-color:GradientInactiveCaption'>GradientInactiveCaption</option>" +
                                        "<option value='GrayText' style='background-color:GrayText'>GrayText</option>" +
                                        "<option value='Highlight' style='background-color:Highlight'>Highlight</option>" +
                                        "<option value='HighlightText' style='background-color:HighlightText'>HighlightText</option>" +
                                        "<option value='Honeydew' style='background-color:Honeydew'>Honeydew</option>" +
                                        "<option value='HotPink' style='background-color:HotPink'>HotPink</option>" +
                                        "<option value='HotTrack' style='background-color:HotTrack'>HotTrack</option>" +
                                        "<option value='InactiveBorder' style='background-color:InactiveBorder'>InactiveBorder</option>" +
                                        "<option value='InactiveCaption' style='background-color:InactiveCaption'>InactiveCaption</option>" +
                                        "<option value='InactiveCaptionText' style='background-color:InactiveCaptionText'>InactiveCaptionText</option>" +
                                        "<option value='IndianRed' style='background-color:IndianRed'>IndianRed</option>" +
                                        "<option value='Indigo' style='background-color:Indigo'>Indigo</option>" +
                                        "<option value='Ivory' style='background-color:Ivory'>Ivory</option>" +
                                        "<option value='Info' style='background-color:Info'>Info</option>" +
                                        "<option value='InfoText' style='background-color:InfoText'>InfoText</option>" +
                                        "<option value='Khaki' style='background-color:Khaki'>Khaki</option>" +
                                        "<option value='Lavender' style='background-color:Lavender'>Lavender</option>" +
                                        "<option value='LavenderBlush' style='background-color:LavenderBlush'>LavenderBlush</option>" +
                                        "<option value='LawnGreen' style='background-color:LawnGreen'>LawnGreen</option>" +
                                        "<option value='LemonChiffon' style='background-color:LemonChiffon'>LemonChiffon</option>" +
                                        "<option value='LightBlue' style='background-color:LightBlue'>LightBlue</option>" +
                                        "<option value='LightCoral' style='background-color:LightCoral'>LightCoral</option>" +
                                        "<option value='LightCyan' style='background-color:LightCyan'>LightCyan</option>" +
                                        "<option value='LightGoldenrodYellow' style='background-color:LightGoldenrodYellow'>LightGoldenrodYellow</option>" +
                                        "<option value='LightGray' style='background-color:LightGray'>LightGray</option>" +
                                        "<option value='LightGreen' style='background-color:LightGreen'>LightGreen</option>" +
                                        "<option value='LightPink' style='background-color:LightPink'>LightPink</option>" +
                                        "<option value='LightSalmon' style='background-color:LightSalmon'>LightSalmon</option>" +
                                        "<option value='LightSeaGreen' style='background-color:LightSeaGreen'>LightSeaGreen</option>" +
                                        "<option value='LightSkyBlue' style='background-color:LightSkyBlue'>LightSkyBlue</option>" +
                                        "<option value='LightSlateGray' style='background-color:LightSlateGray'>LightSlateGray</option>" +
                                        "<option value='LightSteelBlue' style='background-color:LightSteelBlue'>LightSteelBlue</option>" +
                                        "<option value='LightYellow' style='background-color:LightYellow'>LightYellow</option>" +
                                        "<option value='Lime' style='background-color:Lime'>Lime</option>" +
                                        "<option value='LimeGreen' style='background-color:LimeGreen'>LimeGreen</option>" +
                                        "<option value='Linen' style='background-color:Linen'>Linen</option>" +
                                        "<option value='Magenta' style='background-color:Magenta'>Magenta</option>" +
                                        "<option value='Maroon' style='background-color:Maroon'>Maroon</option>" +
                                        "<option value='MediumAquamarine' style='background-color:MediumAquamarine'>MediumAquamarine</option>" +
                                        "<option value='MediumBlue' style='background-color:MediumBlue'>MediumBlue</option>" +
                                        "<option value='MediumOrchid' style='background-color:MediumOrchid'>MediumOrchid</option>" +
                                        "<option value='MediumPurple' style='background-color:MediumPurple'>MediumPurple</option>" +
                                        "<option value='MediumSeaGreen' style='background-color:MediumSeaGreen'>MediumSeaGreen</option>" +
                                        "<option value='MediumSlateBlue' style='background-color:MediumSlateBlue'>MediumSlateBlue</option>" +
                                        "<option value='MediumSpringGreen' style='background-color:MediumSpringGreen'>MediumSpringGreen</option>" +
                                        "<option value='MediumTurquoise' style='background-color:MediumTurquoise'>MediumTurquoise</option>" +
                                        "<option value='MediumVioletRed' style='background-color:MediumVioletRed'>MediumVioletRed</option>" +
                                        "<option value='Menu' style='background-color:Menu'>Menu</option>" +
                                        "<option value='MenuText' style='background-color:MenuText'>MenuText</option>" +
                                        "<option value='MidnightBlue' style='background-color:MidnightBlue'>MidnightBlue</option>" +
                                        "<option value='MintCream' style='background-color:MintCream'>MintCream</option>" +
                                        "<option value='Moccasin' style='background-color:Moccasin'>Moccasin</option>" +
                                        "<option value='MenuBar' style='background-color:MenuBar'>MenuBar</option>" +
                                        "<option value='MenuHighlight' style='background-color:MenuHighlight'>MenuHighlight</option>" +
                                        "<option value='NavajoWhite' style='background-color:NavajoWhite'>NavajoWhite</option>" +
                                        "<option value='Navy' style='background-color:Navy'>Navy</option>" +
                                        "<option value='OldLace' style='background-color:OldLace'>OldLace</option>" +
                                        "<option value='Olive' style='background-color:Olive'>Olive</option>" +
                                        "<option value='OliveDrab' style='background-color:OliveDrab'>OliveDrab</option>" +
                                        "<option value='Orange' style='background-color:Orange'>Orange</option>" +
                                        "<option value='OrangeRed' style='background-color:OrangeRed'>OrangeRed</option>" +
                                        "<option value='Orchid' style='background-color:Orchid'>Orchid</option>" +
                                        "<option value='PaleGoldenrod' style='background-color:PaleGoldenrod'>PaleGoldenrod</option>" +
                                        "<option value='PaleGreen' style='background-color:PaleGreen'>PaleGreen</option>" +
                                        "<option value='PaleTurquoise' style='background-color:PaleTurquoise'>PaleTurquoise</option>" +
                                        "<option value='PaleVioletRed' style='background-color:PaleVioletRed'>PaleVioletRed</option>" +
                                        "<option value='PapayaWhip' style='background-color:PapayaWhip'>PapayaWhip</option>" +
                                        "<option value='PeachPuff' style='background-color:PeachPuff'>PeachPuff</option>" +
                                        "<option value='Peru' style='background-color:Peru'>Peru</option>" +
                                        "<option value='Pink' style='background-color:Pink'>Pink</option>" +
                                        "<option value='Plum' style='background-color:Plum'>Plum</option>" +
                                        "<option value='PowderBlue' style='background-color:PowderBlue'>PowderBlue</option>" +
                                        "<option value='Purple' style='background-color:Purple'>Purple</option>" +
                                        "<option value='Red' style='background-color:Red'>Red</option>" +
                                        "<option value='RosyBrown' style='background-color:RosyBrown'>RosyBrown</option>" +
                                        "<option value='RoyalBlue' style='background-color:RoyalBlue'>RoyalBlue</option>" +
                                        "<option value='SaddleBrown' style='background-color:SaddleBrown'>SaddleBrown</option>" +
                                        "<option value='Salmon' style='background-color:Salmon'>Salmon</option>" +
                                        "<option value='SandyBrown' style='background-color:SandyBrown'>SandyBrown</option>" +
                                        "<option value='ScrollBar' style='background-color:ScrollBar'>ScrollBar</option>" +
                                        "<option value='SeaGreen' style='background-color:SeaGreen'>SeaGreen</option>" +
                                        "<option value='SeaShell' style='background-color:SeaShell'>SeaShell</option>" +
                                        "<option value='Sienna' style='background-color:Sienna'>Sienna</option>" +
                                        "<option value='Silver' style='background-color:Silver'>Silver</option>" +
                                        "<option value='SkyBlue' style='background-color:SkyBlue'>SkyBlue</option>" +
                                        "<option value='SlateBlue' style='background-color:SlateBlue'>SlateBlue</option>" +
                                        "<option value='SlateGray' style='background-color:SlateGray'>SlateGray</option>" +
                                        "<option value='Snow' style='background-color:Snow'>Snow</option>" +
                                        "<option value='SpringGreen' style='background-color:SpringGreen'>SpringGreen</option>" +
                                        "<option value='SteelBlue' style='background-color:SteelBlue'>SteelBlue</option>" +
                                        "<option value='Tan' style='background-color:Tan'>Tan</option>" +
                                        "<option value='Teal' style='background-color:Teal'>Teal</option>" +
                                        "<option value='Thistle' style='background-color:Thistle'>Thistle</option>" +
                                        "<option value='Tomato' style='background-color:Tomato'>Tomato</option>" +
                                        "<option value='Transparent' style='background-color:Transparent'>Transparent</option>" +
                                        "<option value='Turquoise' style='background-color:Turquoise'>Turquoise</option>" +
                                        "<option value='Violet' style='background-color:Violet'>Violet</option>" +
                                        "<option value='Wheat' style='background-color:Wheat'>Wheat</option>" +
                                        "<option value='White' style='background-color:White'>White</option>" +
                                        "<option value='WhiteSmoke' style='background-color:WhiteSmoke'>WhiteSmoke</option>" +
                                        "<option value='Window' style='background-color:Window'>Window</option>" +
                                        "<option value='WindowFrame' style='background-color:WindowFrame'>WindowFrame</option>" +
                                        "<option value='WindowText' style='background-color:WindowText'>WindowText</option>" +
                                        "<option value='Yellow' style='background-color:Yellow'>Yellow</option>" +
                                        "<option value='YellowGreen' style='background-color:YellowGreen'>YellowGreen</option></select>" +
                                         "<select style='width: 389px; height: 34px;display:none;margin-left:4px;' id='FontWeight_" + FieldCountforId + "' class='reactionvalue'>" +
                                        "<option value='normal'>Normal</option>" +
                                        "<option value='bold'>Bold</option>" +
                                        "<option value='italic'>Italic</option>" +
                                        "<option value='underline'>Underline</option></select>" +
                                        "<input class='reactionvalue' style='width: 35%;display:none;margin-left:4px;' type='text' id='RplceText_" + FieldCountforId + "'>" +
                                        "<img id='indicateimg_" + FieldCountforId + "' class='reactionvalueimg' width='26' height='26' style='display: none; vertical-align: middle; margin-left: 10px;padding: 0;' src='../../Images/indicators icons/ind-triangle-down-green.png'><a id='selecticon_" + FieldCountforId + "' class='reactionvalue' ng-click='showindicatepopup(\"indicateimg_" + FieldCountforId + "\")' style='display: none;margin-left: 10px;padding: 0;'>Select Icon</a>" +
                                        "<button type='button' ng-click='addprop();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                        "<button type='button' ng-click='Removeprop(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px'>--</button></div>")($scope));
                          }
                          else {

                              addTo = angular.element($compile("<div id='divid_" + FieldCountforId + "'><span class='PropertyLine' id='thencon' style='width: 42px; font-size: 13px; font-weight: bold; margin-top: 8px'>and</span>" +
                                "<input type='text' style='width: 233px; margin-left: 18px;' value='Text' id='textdisable' disabled='disabled' class='PropertyLine' />" +
                                "<select id='change_" + FieldCountforId + "' style='width: 233px; height: 34px;margin-left:4px' class='dropdownchang'>" +
                                             "<option value='None' selected='selected'>None</option>" +
                                             "<option value='change color'>change color</option>" +
                                             "<option value='display icon'>display icon</option>" +
                                             "<option value='change style'>change style</option>" +
                                             "<option value='replace with text'>replace with text</option></select>" +
                                             "<select id='colordd_" + FieldCountforId + "' style='width: 389px; height: 34px;margin-left:4px;display:none;' class='reactionvalue'>" +
                                            " <option value='ActiveBorder' style='background-color:ActiveBorder'>ActiveBorder</option>" +
                                        "<option value='ActiveCaption' style='background-color:ActiveCaption'>ActiveCaption</option>" +
                                        "<option value='ActiveCaptionText' style='background-color:ActiveCaptionText'>ActiveCaptionText</option>" +
                                        "<option value='AppWorkspace' style='background-color:AppWorkspace'>AppWorkspace</option>" +
                                        "<option value='AliceBlue' style='background-color:AliceBlue'>AliceBlue</option>" +
                                        "<option value='AntiqueWhite' style='background-color:AntiqueWhite'>AntiqueWhite</option>" +
                                        "<option value='Aqua' style='background-color:Aqua'>Aqua</option>" +
                                        "<option value='Aquamarine' style='background-color:Aquamarine'>Aquamarine</option>" +
                                        "<option value='Azure' style='background-color:Azure'>Azure</option>" +
                                        "<option value='Beige' style='background-color:Beige'>Beige</option>" +
                                        "<option value='Bisque' style='background-color:Bisque'>Bisque</option>" +
                                        "<option value='Black' style='background-color:Black'>Black</option>" +
                                        "<option value='BlanchedAlmond' style='background-color:BlanchedAlmond'>BlanchedAlmond</option>" +
                                        "<option value='Blue' selected='selected' style='background-color:Blue'>Blue</option>" +
                                        "<option value='BlueViolet' style='background-color:BlueViolet'>BlueViolet</option>" +
                                        "<option value='Brown' style='background-color:Brown'>Brown</option>" +
                                        "<option value='BurlyWood' style='background-color:BurlyWood'>BurlyWood</option>" +
                                        "<option value='ButtonFace' style='background-color:ButtonFace'>ButtonFace</option>" +
                                        "<option value='ButtonHighlight' style='background-color:ButtonHighlight'>ButtonHighlight</option>" +
                                        "<option value='ButtonShadow' style='background-color:ButtonShadow'>ButtonShadow</option>" +
                                        "<option value='CadetBlue' style='background-color:CadetBlue'>CadetBlue</option>" +
                                        "<option value='Chartreuse' style='background-color:Chartreuse'>Chartreuse</option>" +
                                        " <option value='Chocolate' style='background-color:Chocolate'>Chocolate</option>" +
                                        "<option value='Control' style='background-color:Control'>Control</option>" +
                                        "<option value='ControlDark' style='background-color:ControlDark'>ControlDark</option>" +
                                        "<option value='ControlDarkDark' style='background-color:ControlDarkDark'>ControlDarkDark</option>" +
                                        "<option value='ControlLight' style='background-color:ControlLight'>ControlLight</option>" +
                                        " <option value='ControlLightLight' style='background-color:ControlLightLight'>ControlLightLight</option>" +
                                        "<option value='ControlText' style='background-color:ControlText'>ControlText</option>" +
                                        "<option value='Coral' style='background-color:Coral'>Coral</option>" +
                                        " <option value='CornflowerBlue' style='background-color:CornflowerBlue'>CornflowerBlue</option>" +
                                        " <option value='Cornsilk' style='background-color:Cornsilk'>Cornsilk</option>" +
                                        " <option value='Crimson' style='background-color:Crimson'>Crimson</option>" +
                                        " <option value='Cyan' style='background-color:Cyan'>Cyan</option>" +
                                        "<option value='DarkBlue' style='background-color:DarkBlue'>DarkBlue</option>" +
                                        " <option value='DarkCyan' style='background-color:DarkCyan'>DarkCyan</option>" +
                                        "<option value='DarkGoldenrod' style='background-color:DarkGoldenrod'>DarkGoldenrod</option>" +
                                        "<option value='DarkGray' style='background-color:DarkGray'>DarkGray</option>" +
                                        "<option value='DarkGreen' style='background-color:DarkGreen'>DarkGreen</option>" +
                                        "<option value='DarkKhaki' style='background-color:DarkKhaki'>DarkKhaki</option>" +
                                        "<option value='DarkMagenta' style='background-color:DarkMagenta'>DarkMagenta</option>" +
                                        "<option value='DarkOliveGreen' style='background-color:DarkOliveGreen'>DarkOliveGreen</option>" +
                                        "<option value='DarkOrange' style='background-color:DarkOrange'>DarkOrange</option>" +
                                        "<option value='DarkOrchid' style='background-color:DarkOrchid'>DarkOrchid</option>" +
                                        "<option value='DarkRed' style='background-color:DarkRed'>DarkRed</option>" +
                                        "<option value='DarkSalmon' style='background-color:DarkSalmon'>DarkSalmon</option>" +
                                        "<option value='DarkSeaGreen' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateBlue' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateGray' style='background-color:DarkSlateGray'>DarkSlateGray</option>" +
                                        "<option value='DarkTurquoise' style='background-color:DarkTurquoise'>DarkTurquoise</option>" +
                                        "<option value='DarkViolet' style='background-color:DarkViolet'>DarkViolet</option>" +
                                        "<option value='DeepPink' style='background-color:DeepPink'>DeepPink</option>" +
                                        "<option value='DeepSkyBlue' style='background-color:DeepSkyBlue'>DeepSkyBlue</option>" +
                                        "<option value='Desktop' style='background-color:Desktop'>Desktop</option>" +
                                        "<option value='DimGray' style='background-color:DimGray'>DimGray</option>" +
                                        "<option value='DodgerBlue' style='background-color:DodgerBlue'>DodgerBlue</option>" +
                                        "<option value='Firebrick' style='background-color:Firebrick'>Firebrick</option>" +
                                        "<option value='FloralWhite' style='background-color:FloralWhite'>FloralWhite</option>" +
                                        "<option value='ForestGreen' style='background-color:ForestGreen'>ForestGreen</option>" +
                                        "<option value='Fuchsia' style='background-color:Fuchsia'>Fuchsia</option>" +
                                        "<option value='Gainsboro' style='background-color:Gainsboro'>Gainsboro</option>" +
                                        "<option value='GhostWhite' style='background-color:GhostWhite'>GhostWhite</option>" +
                                        "<option value='Gold' style='background-color:Gold'>Gold</option>" +
                                        "<option value='Goldenrod' style='background-color:Goldenrod'>Goldenrod</option>" +
                                        "<option value='Gray' style='background-color:Gray'>Gray</option>" +
                                        "<option value='Green' style='background-color:Green'>Green</option>" +
                                        "<option value='GreenYellow' style='background-color:GreenYellow'>GreenYellow</option>" +
                                        "<option value='GradientActiveCaption' style='background-color:GradientActiveCaption'>GradientActiveCaption</option>" +
                                        "<option value='GradientInactiveCaption' style='background-color:GradientInactiveCaption'>GradientInactiveCaption</option>" +
                                        "<option value='GrayText' style='background-color:GrayText'>GrayText</option>" +
                                        "<option value='Highlight' style='background-color:Highlight'>Highlight</option>" +
                                        "<option value='HighlightText' style='background-color:HighlightText'>HighlightText</option>" +
                                        "<option value='Honeydew' style='background-color:Honeydew'>Honeydew</option>" +
                                        "<option value='HotPink' style='background-color:HotPink'>HotPink</option>" +
                                        "<option value='HotTrack' style='background-color:HotTrack'>HotTrack</option>" +
                                        "<option value='InactiveBorder' style='background-color:InactiveBorder'>InactiveBorder</option>" +
                                        "<option value='InactiveCaption' style='background-color:InactiveCaption'>InactiveCaption</option>" +
                                        "<option value='InactiveCaptionText' style='background-color:InactiveCaptionText'>InactiveCaptionText</option>" +
                                        "<option value='IndianRed' style='background-color:IndianRed'>IndianRed</option>" +
                                        "<option value='Indigo' style='background-color:Indigo'>Indigo</option>" +
                                        "<option value='Ivory' style='background-color:Ivory'>Ivory</option>" +
                                        "<option value='Info' style='background-color:Info'>Info</option>" +
                                        "<option value='InfoText' style='background-color:InfoText'>InfoText</option>" +
                                        "<option value='Khaki' style='background-color:Khaki'>Khaki</option>" +
                                        "<option value='Lavender' style='background-color:Lavender'>Lavender</option>" +
                                        "<option value='LavenderBlush' style='background-color:LavenderBlush'>LavenderBlush</option>" +
                                        "<option value='LawnGreen' style='background-color:LawnGreen'>LawnGreen</option>" +
                                        "<option value='LemonChiffon' style='background-color:LemonChiffon'>LemonChiffon</option>" +
                                        "<option value='LightBlue' style='background-color:LightBlue'>LightBlue</option>" +
                                        "<option value='LightCoral' style='background-color:LightCoral'>LightCoral</option>" +
                                        "<option value='LightCyan' style='background-color:LightCyan'>LightCyan</option>" +
                                        "<option value='LightGoldenrodYellow' style='background-color:LightGoldenrodYellow'>LightGoldenrodYellow</option>" +
                                        "<option value='LightGray' style='background-color:LightGray'>LightGray</option>" +
                                        "<option value='LightGreen' style='background-color:LightGreen'>LightGreen</option>" +
                                        "<option value='LightPink' style='background-color:LightPink'>LightPink</option>" +
                                        "<option value='LightSalmon' style='background-color:LightSalmon'>LightSalmon</option>" +
                                        "<option value='LightSeaGreen' style='background-color:LightSeaGreen'>LightSeaGreen</option>" +
                                        "<option value='LightSkyBlue' style='background-color:LightSkyBlue'>LightSkyBlue</option>" +
                                        "<option value='LightSlateGray' style='background-color:LightSlateGray'>LightSlateGray</option>" +
                                        "<option value='LightSteelBlue' style='background-color:LightSteelBlue'>LightSteelBlue</option>" +
                                        "<option value='LightYellow' style='background-color:LightYellow'>LightYellow</option>" +
                                        "<option value='Lime' style='background-color:Lime'>Lime</option>" +
                                        "<option value='LimeGreen' style='background-color:LimeGreen'>LimeGreen</option>" +
                                        "<option value='Linen' style='background-color:Linen'>Linen</option>" +
                                        "<option value='Magenta' style='background-color:Magenta'>Magenta</option>" +
                                        "<option value='Maroon' style='background-color:Maroon'>Maroon</option>" +
                                        "<option value='MediumAquamarine' style='background-color:MediumAquamarine'>MediumAquamarine</option>" +
                                        "<option value='MediumBlue' style='background-color:MediumBlue'>MediumBlue</option>" +
                                        "<option value='MediumOrchid' style='background-color:MediumOrchid'>MediumOrchid</option>" +
                                        "<option value='MediumPurple' style='background-color:MediumPurple'>MediumPurple</option>" +
                                        "<option value='MediumSeaGreen' style='background-color:MediumSeaGreen'>MediumSeaGreen</option>" +
                                        "<option value='MediumSlateBlue' style='background-color:MediumSlateBlue'>MediumSlateBlue</option>" +
                                        "<option value='MediumSpringGreen' style='background-color:MediumSpringGreen'>MediumSpringGreen</option>" +
                                        "<option value='MediumTurquoise' style='background-color:MediumTurquoise'>MediumTurquoise</option>" +
                                        "<option value='MediumVioletRed' style='background-color:MediumVioletRed'>MediumVioletRed</option>" +
                                        "<option value='Menu' style='background-color:Menu'>Menu</option>" +
                                        "<option value='MenuText' style='background-color:MenuText'>MenuText</option>" +
                                        "<option value='MidnightBlue' style='background-color:MidnightBlue'>MidnightBlue</option>" +
                                        "<option value='MintCream' style='background-color:MintCream'>MintCream</option>" +
                                        "<option value='Moccasin' style='background-color:Moccasin'>Moccasin</option>" +
                                        "<option value='MenuBar' style='background-color:MenuBar'>MenuBar</option>" +
                                        "<option value='MenuHighlight' style='background-color:MenuHighlight'>MenuHighlight</option>" +
                                        "<option value='NavajoWhite' style='background-color:NavajoWhite'>NavajoWhite</option>" +
                                        "<option value='Navy' style='background-color:Navy'>Navy</option>" +
                                        "<option value='OldLace' style='background-color:OldLace'>OldLace</option>" +
                                        "<option value='Olive' style='background-color:Olive'>Olive</option>" +
                                        "<option value='OliveDrab' style='background-color:OliveDrab'>OliveDrab</option>" +
                                        "<option value='Orange' style='background-color:Orange'>Orange</option>" +
                                        "<option value='OrangeRed' style='background-color:OrangeRed'>OrangeRed</option>" +
                                        "<option value='Orchid' style='background-color:Orchid'>Orchid</option>" +
                                        "<option value='PaleGoldenrod' style='background-color:PaleGoldenrod'>PaleGoldenrod</option>" +
                                        "<option value='PaleGreen' style='background-color:PaleGreen'>PaleGreen</option>" +
                                        "<option value='PaleTurquoise' style='background-color:PaleTurquoise'>PaleTurquoise</option>" +
                                        "<option value='PaleVioletRed' style='background-color:PaleVioletRed'>PaleVioletRed</option>" +
                                        "<option value='PapayaWhip' style='background-color:PapayaWhip'>PapayaWhip</option>" +
                                        "<option value='PeachPuff' style='background-color:PeachPuff'>PeachPuff</option>" +
                                        "<option value='Peru' style='background-color:Peru'>Peru</option>" +
                                        "<option value='Pink' style='background-color:Pink'>Pink</option>" +
                                        "<option value='Plum' style='background-color:Plum'>Plum</option>" +
                                        "<option value='PowderBlue' style='background-color:PowderBlue'>PowderBlue</option>" +
                                        "<option value='Purple' style='background-color:Purple'>Purple</option>" +
                                        "<option value='Red' style='background-color:Red'>Red</option>" +
                                        "<option value='RosyBrown' style='background-color:RosyBrown'>RosyBrown</option>" +
                                        "<option value='RoyalBlue' style='background-color:RoyalBlue'>RoyalBlue</option>" +
                                        "<option value='SaddleBrown' style='background-color:SaddleBrown'>SaddleBrown</option>" +
                                        "<option value='Salmon' style='background-color:Salmon'>Salmon</option>" +
                                        "<option value='SandyBrown' style='background-color:SandyBrown'>SandyBrown</option>" +
                                        "<option value='ScrollBar' style='background-color:ScrollBar'>ScrollBar</option>" +
                                        "<option value='SeaGreen' style='background-color:SeaGreen'>SeaGreen</option>" +
                                        "<option value='SeaShell' style='background-color:SeaShell'>SeaShell</option>" +
                                        "<option value='Sienna' style='background-color:Sienna'>Sienna</option>" +
                                        "<option value='Silver' style='background-color:Silver'>Silver</option>" +
                                        "<option value='SkyBlue' style='background-color:SkyBlue'>SkyBlue</option>" +
                                        "<option value='SlateBlue' style='background-color:SlateBlue'>SlateBlue</option>" +
                                        "<option value='SlateGray' style='background-color:SlateGray'>SlateGray</option>" +
                                        "<option value='Snow' style='background-color:Snow'>Snow</option>" +
                                        "<option value='SpringGreen' style='background-color:SpringGreen'>SpringGreen</option>" +
                                        "<option value='SteelBlue' style='background-color:SteelBlue'>SteelBlue</option>" +
                                        "<option value='Tan' style='background-color:Tan'>Tan</option>" +
                                        "<option value='Teal' style='background-color:Teal'>Teal</option>" +
                                        "<option value='Thistle' style='background-color:Thistle'>Thistle</option>" +
                                        "<option value='Tomato' style='background-color:Tomato'>Tomato</option>" +
                                        "<option value='Transparent' style='background-color:Transparent'>Transparent</option>" +
                                        "<option value='Turquoise' style='background-color:Turquoise'>Turquoise</option>" +
                                        "<option value='Violet' style='background-color:Violet'>Violet</option>" +
                                        "<option value='Wheat' style='background-color:Wheat'>Wheat</option>" +
                                        "<option value='White' style='background-color:White'>White</option>" +
                                        "<option value='WhiteSmoke' style='background-color:WhiteSmoke'>WhiteSmoke</option>" +
                                        "<option value='Window' style='background-color:Window'>Window</option>" +
                                        "<option value='WindowFrame' style='background-color:WindowFrame'>WindowFrame</option>" +
                                        "<option value='WindowText' style='background-color:WindowText'>WindowText</option>" +
                                        "<option value='Yellow' style='background-color:Yellow'>Yellow</option>" +
                                        "<option value='YellowGreen' style='background-color:YellowGreen'>YellowGreen</option></select>" +
                                              "<select style='width: 389px; height: 34px;display:none;margin-left:4px;' id='FontWeight_" + FieldCountforId + "' class='reactionvalue'>" +
                                             "<option value='normal'>Normal</option>" +
                                             "<option value='bold'>Bold</option>" +
                                             "<option value='italic'>Italic</option>" +
                                             "<option value='underline'>Underline</option></select>" +
                                             "<input class='reactionvalue' style='width: 35%;display:none;margin-left:4px;' type='text' id='RplceText_" + FieldCountforId + "'>" +
                                             "<img id='indicateimg_" + FieldCountforId + "' class='reactionvalueimg' width='26' height='26' style='display: none; vertical-align: middle; margin-left: 10px;padding: 0;' src='../../Images/indicators icons/ind-triangle-down-green.png'><a id='selecticon_" + FieldCountforId + "' class='reactionvalue' ng-click='showindicatepopup(\"indicateimg_" + FieldCountforId + "\")' style='display: none;margin-left: 10px;padding: 0;'>Select Icon</a>" +
                                             "<button type='button' ng-click='addprop();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                                             "<button type='button' ng-click='Removeprop(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px'>--</button></div>")($scope));
                          }
                          $("#subdiv").append(addTo);

                          $("#change_" + FieldCountforId).val(secondObj.secondaryconditions[0].secondreactions[rc].type);
                          var reacttype = secondObj.secondaryconditions[0].secondreactions[rc].type;
                          if (reacttype == "change color") {
                              $("#colordd_" + FieldCountforId).show();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#colordd_" + FieldCountforId).val(secondObj.secondaryconditions[0].secondreactions[rc].reactvalue);
                          } else if (reacttype == "display icon") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).show();
                              $("#selecticon_" + FieldCountforId).show();
                              $("#indicateimg_" + FieldCountforId).attr("src", secondObj.secondaryconditions[0].secondreactions[rc].reactvalue);
                          } else if (reacttype == "change style") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).show();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).val(secondObj.secondaryconditions[0].secondreactions[rc].reactvalue);
                          } else if (reacttype == "replace with text") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).show();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).val(secondObj.secondaryconditions[0].secondreactions[rc].reactvalue);
                          } else if (reacttype == "None") {
                              $("#colordd_" + FieldCountforId).hide();
                              $("#FontWeight_" + FieldCountforId).hide();
                              $("#RplceText_" + FieldCountforId).hide();
                              $("#indicateimg_" + FieldCountforId).hide();
                              $("#selecticon_" + FieldCountforId).hide();
                          }
                      }
                      $scope.changeindicatereactions();
                  }

                  //.................................indicators update code................................................//

                  //.................................indicators code................................................//

              }
              $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick();
              $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick();
          });
        // $scope.$apply();
    });
    //.....Selecting Treenode and thier functionalities ended..//

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
        else if ($scope.selecteditem == "PrimaryValues") {
            selecteditem.set({ primary_style: updateproperties });
        }
        else if ($scope.selecteditem == "ValuePair") {
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
            vpupdateproperties.width = $("#stylewidth").val();
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
        if ($scope.selecteditem == "SecondaryValues") {
            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            if (selecteditem.get("data_column_secondaryvalues").formula_template != "undefined")
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
            var secondaryobj = selecteditem.get("data_column_secondaryvalues").secondaryconditions;
            updatedlables.secondaryconditions = secondaryobj;
            selecteditem.unset("data_column_secondaryvalues", { silent: true });
            selecteditem.set({ data_column_secondaryvalues: updatedlables });
            //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
        }
        else if ($scope.selecteditem == "PrimaryValues") {
            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            if (selecteditem.get("data_column_primaryvalues").formula_template != "undefined")
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
            var primaryobj = selecteditem.get("data_column_primaryvalues").primaryconditions;
            updatedlables.primaryconditions = primaryobj;
            selecteditem.unset("data_column_primaryvalues", { silent: true });
            selecteditem.set({ data_column_primaryvalues: updatedlables });
            // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
        }
    }
    //....updatedbconnections by adding datasources ended...........//


    //////................................code for indicator-----------------------------------///////////////

    //....add dynamic field for indicaters...........//
    $scope.addFields = function () {
        var FieldCount = Math.floor((Math.random() * 7683480) + 198);

        if ($scope.selecteditem == "PrimaryValues") {
            var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>and</span>" +
           "<input type='text' style='width: 233px; height: 34px; margin-left: 16px;' id='text" + FieldCount + "' value='PrimaryValues' disabled='disabled'/>" +
            //"<option value='Textselect' selected='selected'>Text</option></select>" +
            "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
            "<option value='is equal to'>is equal to </option>" +
            "<option value='is not equal to'>is not equal to </option>" +
            "<option value='is greater than' selected='selected'>is greater than</option>" +
            "<option value='is greater than or equal to'>is greater than or equal to</option>" +
            "<option value='is less than'>is less than</option>" +
            "<option value='is less than or equal to'>is less than or equal to</option>" +
            "<option value='contains'>contains</option>" +
            "<option value='does not contain'>does not contain</option>" +
            "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
            "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
            "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));

            $("#mainDiv").append(addeditems);

            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            var primeobj = selecteditem.get("data_column_primaryvalues");
            primeobj.primaryconditions[0].primepredicates.push({ "id": Controlid, "type": "is greater than", "value": "" });
            selecteditem.unset("data_column_primaryvalues", { silent: true });
            selecteditem.set({ "data_column_primaryvalues": primeobj });
        }
        else if ($scope.selecteditem == "SecondaryValues") {
            var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' id='ifcon' style='width: 42px; font-size: 13px; font-weight: bold;'>and</span>" +
           "<input type='text' style='width: 233px; height: 34px; margin-left: 16px;' id='text" + FieldCount + "' value='SecondaryValues' disabled='disabled'/>" +
            //"<option value='Textselect' selected='selected'>Text</option></select>" +
            "<select id='predicate_" + FieldCount + "' style='width: 233px; height: 34px;margin-left:4px;' class='predicatetype'>" +
            "<option value='is equal to'>is equal to </option>" +
            "<option value='is not equal to'>is not equal to </option>" +
            "<option value='is greater than' selected='selected'>is greater than</option>" +
            "<option value='is greater than or equal to'>is greater than or equal to</option>" +
            "<option value='is less than'>is less than</option>" +
            "<option value='is less than or equal to'>is less than or equal to</option>" +
            "<option value='contains'>contains</option>" +
            "<option value='does not contain'>does not contain</option>" +
            "</select><input id='predicateText_" + FieldCount + "' class='predicatetext' style='width: 35%;margin-left:4px;height:35px;margin-top:4px;' type='text' required=''>" +
            "<button type='button' ng-click='addFields();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
            "<button type='button' ng-click='RemoveParm(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px;'>--</button></div>")($scope));

            $("#mainDiv").append(addeditems);
            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            var secondobj = selecteditem.get("data_column_secondaryvalues");
            secondobj.secondaryconditions[0].secondpredicates.push({ "id": Controlid, "type": "is greater than", "value": "" });
            selecteditem.unset("data_column_secondaryvalues", { silent: true });
            selecteditem.set({ "data_column_secondaryvalues": secondobj });
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
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                primeobj.primaryconditions[0].primepredicates.splice(removedivindex, 1);
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                secondobj.secondaryconditions[0].secondpredicates.splice(removedivindex, 1);
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }
        }

    }
    //....remove dynamic field for indicaters ended...........//

    //....add dynamic field properties for indicaters...........//
    $scope.addprop = function () {
        var FieldCountforId = Math.floor((Math.random() * 7683480) + 198);
        // FieldCountforIdsel = Math.floor((Math.random() * 7683480) + 198);
        var addTo = angular.element($compile("<div id='divid_" + FieldCountforId + "'><span class='PropertyLine' id='thencon' style='width: 42px; font-size: 13px; font-weight: bold; margin-top: 8px'>and</span>" +
           "<input type='text' style='width: 233px; margin-left: 17px;' value='Text' id='textdisable' disabled='disabled' class='PropertyLine' />" +
           "<select id='change_" + FieldCountforId + "' style='width: 233px; height: 34px;margin-left:4px' class='dropdownchang'>" +
                        "<option value='None' selected='selected'>None</option>" +
                        "<option value='change color'>change color</option>" +
                        "<option value='display icon'>display icon</option>" +
                        "<option value='change style'>change style</option>" +
                        "<option value='replace with text'>replace with text</option></select>" +
                        "<select id='colordd_" + FieldCountforId + "' style='width: 389px; height: 34px;margin-left:4px;display:none;' class='reactionvalue'>" +
                        " <option value='ActiveBorder' style='background-color:ActiveBorder'>ActiveBorder</option>" +
                                        "<option value='ActiveCaption' style='background-color:ActiveCaption'>ActiveCaption</option>" +
                                        "<option value='ActiveCaptionText' style='background-color:ActiveCaptionText'>ActiveCaptionText</option>" +
                                        "<option value='AppWorkspace' style='background-color:AppWorkspace'>AppWorkspace</option>" +
                                        "<option value='AliceBlue' style='background-color:AliceBlue'>AliceBlue</option>" +
                                        "<option value='AntiqueWhite' style='background-color:AntiqueWhite'>AntiqueWhite</option>" +
                                        "<option value='Aqua' style='background-color:Aqua'>Aqua</option>" +
                                        "<option value='Aquamarine' style='background-color:Aquamarine'>Aquamarine</option>" +
                                        "<option value='Azure' style='background-color:Azure'>Azure</option>" +
                                        "<option value='Beige' style='background-color:Beige'>Beige</option>" +
                                        "<option value='Bisque' style='background-color:Bisque'>Bisque</option>" +
                                        "<option value='Black' style='background-color:Black'>Black</option>" +
                                        "<option value='BlanchedAlmond' style='background-color:BlanchedAlmond'>BlanchedAlmond</option>" +
                                        "<option value='Blue' selected='selected' style='background-color:Blue'>Blue</option>" +
                                        "<option value='BlueViolet' style='background-color:BlueViolet'>BlueViolet</option>" +
                                        "<option value='Brown' style='background-color:Brown'>Brown</option>" +
                                        "<option value='BurlyWood' style='background-color:BurlyWood'>BurlyWood</option>" +
                                        "<option value='ButtonFace' style='background-color:ButtonFace'>ButtonFace</option>" +
                                        "<option value='ButtonHighlight' style='background-color:ButtonHighlight'>ButtonHighlight</option>" +
                                        "<option value='ButtonShadow' style='background-color:ButtonShadow'>ButtonShadow</option>" +
                                        "<option value='CadetBlue' style='background-color:CadetBlue'>CadetBlue</option>" +
                                        "<option value='Chartreuse' style='background-color:Chartreuse'>Chartreuse</option>" +
                                        " <option value='Chocolate' style='background-color:Chocolate'>Chocolate</option>" +
                                        "<option value='Control' style='background-color:Control'>Control</option>" +
                                        "<option value='ControlDark' style='background-color:ControlDark'>ControlDark</option>" +
                                        "<option value='ControlDarkDark' style='background-color:ControlDarkDark'>ControlDarkDark</option>" +
                                        "<option value='ControlLight' style='background-color:ControlLight'>ControlLight</option>" +
                                        " <option value='ControlLightLight' style='background-color:ControlLightLight'>ControlLightLight</option>" +
                                        "<option value='ControlText' style='background-color:ControlText'>ControlText</option>" +
                                        "<option value='Coral' style='background-color:Coral'>Coral</option>" +
                                        " <option value='CornflowerBlue' style='background-color:CornflowerBlue'>CornflowerBlue</option>" +
                                        " <option value='Cornsilk' style='background-color:Cornsilk'>Cornsilk</option>" +
                                        " <option value='Crimson' style='background-color:Crimson'>Crimson</option>" +
                                        " <option value='Cyan' style='background-color:Cyan'>Cyan</option>" +
                                        "<option value='DarkBlue' style='background-color:DarkBlue'>DarkBlue</option>" +
                                        " <option value='DarkCyan' style='background-color:DarkCyan'>DarkCyan</option>" +
                                        "<option value='DarkGoldenrod' style='background-color:DarkGoldenrod'>DarkGoldenrod</option>" +
                                        "<option value='DarkGray' style='background-color:DarkGray'>DarkGray</option>" +
                                        "<option value='DarkGreen' style='background-color:DarkGreen'>DarkGreen</option>" +
                                        "<option value='DarkKhaki' style='background-color:DarkKhaki'>DarkKhaki</option>" +
                                        "<option value='DarkMagenta' style='background-color:DarkMagenta'>DarkMagenta</option>" +
                                        "<option value='DarkOliveGreen' style='background-color:DarkOliveGreen'>DarkOliveGreen</option>" +
                                        "<option value='DarkOrange' style='background-color:DarkOrange'>DarkOrange</option>" +
                                        "<option value='DarkOrchid' style='background-color:DarkOrchid'>DarkOrchid</option>" +
                                        "<option value='DarkRed' style='background-color:DarkRed'>DarkRed</option>" +
                                        "<option value='DarkSalmon' style='background-color:DarkSalmon'>DarkSalmon</option>" +
                                        "<option value='DarkSeaGreen' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateBlue' style='background-color:DarkSeaGreen'>DarkSeaGreen</option>" +
                                        "<option value='DarkSlateGray' style='background-color:DarkSlateGray'>DarkSlateGray</option>" +
                                        "<option value='DarkTurquoise' style='background-color:DarkTurquoise'>DarkTurquoise</option>" +
                                        "<option value='DarkViolet' style='background-color:DarkViolet'>DarkViolet</option>" +
                                        "<option value='DeepPink' style='background-color:DeepPink'>DeepPink</option>" +
                                        "<option value='DeepSkyBlue' style='background-color:DeepSkyBlue'>DeepSkyBlue</option>" +
                                        "<option value='Desktop' style='background-color:Desktop'>Desktop</option>" +
                                        "<option value='DimGray' style='background-color:DimGray'>DimGray</option>" +
                                        "<option value='DodgerBlue' style='background-color:DodgerBlue'>DodgerBlue</option>" +
                                        "<option value='Firebrick' style='background-color:Firebrick'>Firebrick</option>" +
                                        "<option value='FloralWhite' style='background-color:FloralWhite'>FloralWhite</option>" +
                                        "<option value='ForestGreen' style='background-color:ForestGreen'>ForestGreen</option>" +
                                        "<option value='Fuchsia' style='background-color:Fuchsia'>Fuchsia</option>" +
                                        "<option value='Gainsboro' style='background-color:Gainsboro'>Gainsboro</option>" +
                                        "<option value='GhostWhite' style='background-color:GhostWhite'>GhostWhite</option>" +
                                        "<option value='Gold' style='background-color:Gold'>Gold</option>" +
                                        "<option value='Goldenrod' style='background-color:Goldenrod'>Goldenrod</option>" +
                                        "<option value='Gray' style='background-color:Gray'>Gray</option>" +
                                        "<option value='Green' style='background-color:Green'>Green</option>" +
                                        "<option value='GreenYellow' style='background-color:GreenYellow'>GreenYellow</option>" +
                                        "<option value='GradientActiveCaption' style='background-color:GradientActiveCaption'>GradientActiveCaption</option>" +
                                        "<option value='GradientInactiveCaption' style='background-color:GradientInactiveCaption'>GradientInactiveCaption</option>" +
                                        "<option value='GrayText' style='background-color:GrayText'>GrayText</option>" +
                                        "<option value='Highlight' style='background-color:Highlight'>Highlight</option>" +
                                        "<option value='HighlightText' style='background-color:HighlightText'>HighlightText</option>" +
                                        "<option value='Honeydew' style='background-color:Honeydew'>Honeydew</option>" +
                                        "<option value='HotPink' style='background-color:HotPink'>HotPink</option>" +
                                        "<option value='HotTrack' style='background-color:HotTrack'>HotTrack</option>" +
                                        "<option value='InactiveBorder' style='background-color:InactiveBorder'>InactiveBorder</option>" +
                                        "<option value='InactiveCaption' style='background-color:InactiveCaption'>InactiveCaption</option>" +
                                        "<option value='InactiveCaptionText' style='background-color:InactiveCaptionText'>InactiveCaptionText</option>" +
                                        "<option value='IndianRed' style='background-color:IndianRed'>IndianRed</option>" +
                                        "<option value='Indigo' style='background-color:Indigo'>Indigo</option>" +
                                        "<option value='Ivory' style='background-color:Ivory'>Ivory</option>" +
                                        "<option value='Info' style='background-color:Info'>Info</option>" +
                                        "<option value='InfoText' style='background-color:InfoText'>InfoText</option>" +
                                        "<option value='Khaki' style='background-color:Khaki'>Khaki</option>" +
                                        "<option value='Lavender' style='background-color:Lavender'>Lavender</option>" +
                                        "<option value='LavenderBlush' style='background-color:LavenderBlush'>LavenderBlush</option>" +
                                        "<option value='LawnGreen' style='background-color:LawnGreen'>LawnGreen</option>" +
                                        "<option value='LemonChiffon' style='background-color:LemonChiffon'>LemonChiffon</option>" +
                                        "<option value='LightBlue' style='background-color:LightBlue'>LightBlue</option>" +
                                        "<option value='LightCoral' style='background-color:LightCoral'>LightCoral</option>" +
                                        "<option value='LightCyan' style='background-color:LightCyan'>LightCyan</option>" +
                                        "<option value='LightGoldenrodYellow' style='background-color:LightGoldenrodYellow'>LightGoldenrodYellow</option>" +
                                        "<option value='LightGray' style='background-color:LightGray'>LightGray</option>" +
                                        "<option value='LightGreen' style='background-color:LightGreen'>LightGreen</option>" +
                                        "<option value='LightPink' style='background-color:LightPink'>LightPink</option>" +
                                        "<option value='LightSalmon' style='background-color:LightSalmon'>LightSalmon</option>" +
                                        "<option value='LightSeaGreen' style='background-color:LightSeaGreen'>LightSeaGreen</option>" +
                                        "<option value='LightSkyBlue' style='background-color:LightSkyBlue'>LightSkyBlue</option>" +
                                        "<option value='LightSlateGray' style='background-color:LightSlateGray'>LightSlateGray</option>" +
                                        "<option value='LightSteelBlue' style='background-color:LightSteelBlue'>LightSteelBlue</option>" +
                                        "<option value='LightYellow' style='background-color:LightYellow'>LightYellow</option>" +
                                        "<option value='Lime' style='background-color:Lime'>Lime</option>" +
                                        "<option value='LimeGreen' style='background-color:LimeGreen'>LimeGreen</option>" +
                                        "<option value='Linen' style='background-color:Linen'>Linen</option>" +
                                        "<option value='Magenta' style='background-color:Magenta'>Magenta</option>" +
                                        "<option value='Maroon' style='background-color:Maroon'>Maroon</option>" +
                                        "<option value='MediumAquamarine' style='background-color:MediumAquamarine'>MediumAquamarine</option>" +
                                        "<option value='MediumBlue' style='background-color:MediumBlue'>MediumBlue</option>" +
                                        "<option value='MediumOrchid' style='background-color:MediumOrchid'>MediumOrchid</option>" +
                                        "<option value='MediumPurple' style='background-color:MediumPurple'>MediumPurple</option>" +
                                        "<option value='MediumSeaGreen' style='background-color:MediumSeaGreen'>MediumSeaGreen</option>" +
                                        "<option value='MediumSlateBlue' style='background-color:MediumSlateBlue'>MediumSlateBlue</option>" +
                                        "<option value='MediumSpringGreen' style='background-color:MediumSpringGreen'>MediumSpringGreen</option>" +
                                        "<option value='MediumTurquoise' style='background-color:MediumTurquoise'>MediumTurquoise</option>" +
                                        "<option value='MediumVioletRed' style='background-color:MediumVioletRed'>MediumVioletRed</option>" +
                                        "<option value='Menu' style='background-color:Menu'>Menu</option>" +
                                        "<option value='MenuText' style='background-color:MenuText'>MenuText</option>" +
                                        "<option value='MidnightBlue' style='background-color:MidnightBlue'>MidnightBlue</option>" +
                                        "<option value='MintCream' style='background-color:MintCream'>MintCream</option>" +
                                        "<option value='Moccasin' style='background-color:Moccasin'>Moccasin</option>" +
                                        "<option value='MenuBar' style='background-color:MenuBar'>MenuBar</option>" +
                                        "<option value='MenuHighlight' style='background-color:MenuHighlight'>MenuHighlight</option>" +
                                        "<option value='NavajoWhite' style='background-color:NavajoWhite'>NavajoWhite</option>" +
                                        "<option value='Navy' style='background-color:Navy'>Navy</option>" +
                                        "<option value='OldLace' style='background-color:OldLace'>OldLace</option>" +
                                        "<option value='Olive' style='background-color:Olive'>Olive</option>" +
                                        "<option value='OliveDrab' style='background-color:OliveDrab'>OliveDrab</option>" +
                                        "<option value='Orange' style='background-color:Orange'>Orange</option>" +
                                        "<option value='OrangeRed' style='background-color:OrangeRed'>OrangeRed</option>" +
                                        "<option value='Orchid' style='background-color:Orchid'>Orchid</option>" +
                                        "<option value='PaleGoldenrod' style='background-color:PaleGoldenrod'>PaleGoldenrod</option>" +
                                        "<option value='PaleGreen' style='background-color:PaleGreen'>PaleGreen</option>" +
                                        "<option value='PaleTurquoise' style='background-color:PaleTurquoise'>PaleTurquoise</option>" +
                                        "<option value='PaleVioletRed' style='background-color:PaleVioletRed'>PaleVioletRed</option>" +
                                        "<option value='PapayaWhip' style='background-color:PapayaWhip'>PapayaWhip</option>" +
                                        "<option value='PeachPuff' style='background-color:PeachPuff'>PeachPuff</option>" +
                                        "<option value='Peru' style='background-color:Peru'>Peru</option>" +
                                        "<option value='Pink' style='background-color:Pink'>Pink</option>" +
                                        "<option value='Plum' style='background-color:Plum'>Plum</option>" +
                                        "<option value='PowderBlue' style='background-color:PowderBlue'>PowderBlue</option>" +
                                        "<option value='Purple' style='background-color:Purple'>Purple</option>" +
                                        "<option value='Red' style='background-color:Red'>Red</option>" +
                                        "<option value='RosyBrown' style='background-color:RosyBrown'>RosyBrown</option>" +
                                        "<option value='RoyalBlue' style='background-color:RoyalBlue'>RoyalBlue</option>" +
                                        "<option value='SaddleBrown' style='background-color:SaddleBrown'>SaddleBrown</option>" +
                                        "<option value='Salmon' style='background-color:Salmon'>Salmon</option>" +
                                        "<option value='SandyBrown' style='background-color:SandyBrown'>SandyBrown</option>" +
                                        "<option value='ScrollBar' style='background-color:ScrollBar'>ScrollBar</option>" +
                                        "<option value='SeaGreen' style='background-color:SeaGreen'>SeaGreen</option>" +
                                        "<option value='SeaShell' style='background-color:SeaShell'>SeaShell</option>" +
                                        "<option value='Sienna' style='background-color:Sienna'>Sienna</option>" +
                                        "<option value='Silver' style='background-color:Silver'>Silver</option>" +
                                        "<option value='SkyBlue' style='background-color:SkyBlue'>SkyBlue</option>" +
                                        "<option value='SlateBlue' style='background-color:SlateBlue'>SlateBlue</option>" +
                                        "<option value='SlateGray' style='background-color:SlateGray'>SlateGray</option>" +
                                        "<option value='Snow' style='background-color:Snow'>Snow</option>" +
                                        "<option value='SpringGreen' style='background-color:SpringGreen'>SpringGreen</option>" +
                                        "<option value='SteelBlue' style='background-color:SteelBlue'>SteelBlue</option>" +
                                        "<option value='Tan' style='background-color:Tan'>Tan</option>" +
                                        "<option value='Teal' style='background-color:Teal'>Teal</option>" +
                                        "<option value='Thistle' style='background-color:Thistle'>Thistle</option>" +
                                        "<option value='Tomato' style='background-color:Tomato'>Tomato</option>" +
                                        "<option value='Transparent' style='background-color:Transparent'>Transparent</option>" +
                                        "<option value='Turquoise' style='background-color:Turquoise'>Turquoise</option>" +
                                        "<option value='Violet' style='background-color:Violet'>Violet</option>" +
                                        "<option value='Wheat' style='background-color:Wheat'>Wheat</option>" +
                                        "<option value='White' style='background-color:White'>White</option>" +
                                        "<option value='WhiteSmoke' style='background-color:WhiteSmoke'>WhiteSmoke</option>" +
                                        "<option value='Window' style='background-color:Window'>Window</option>" +
                                        "<option value='WindowFrame' style='background-color:WindowFrame'>WindowFrame</option>" +
                                        "<option value='WindowText' style='background-color:WindowText'>WindowText</option>" +
                                        "<option value='Yellow' style='background-color:Yellow'>Yellow</option>" +
                                        "<option value='YellowGreen' style='background-color:YellowGreen'>YellowGreen</option></select>" +
                         "<select style='width: 389px; height: 34px;display:none;margin-left:4px;' id='FontWeight_" + FieldCountforId + "' class='reactionvalue'>" +
                        "<option value='normal'>Normal</option>" +
                        "<option value='bold'>Bold</option>" +
                        "<option value='italic'>Italic</option>" +
                        "<option value='underline'>Underline</option></select>" +
                        "<input class='reactionvalue' style='width: 35%;display:none;margin-left:4px;' type='text' id='RplceText_" + FieldCountforId + "'>" +
                        "<img id='indicateimg_" + FieldCountforId + "' class='reactionvalueimg' width='26' height='26' style='display: none; vertical-align: middle; margin-left: 10px;padding: 0;' src='../../Images/indicators icons/ind-triangle-down-green.png'><a id='selecticon_" + FieldCountforId + "' class='reactionvalue' ng-click='showindicatepopup(\"indicateimg_" + FieldCountforId + "\")' style='display: none;margin-left: 10px;padding: 0;'>Select Icon</a>" +
                        "<button type='button' ng-click='addprop();' class='btn btn-default' style='width: 10px;margin-left:4px;'>+</button>" +
                        "<button type='button' ng-click='Removeprop(obj,$event);' class='btn btn-red' style='width: 10px;margin-left:4px'>--</button></div>")($scope));
        $("#subdiv").append(addTo);


        if ($scope.selecteditem == "PrimaryValues") {
            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            var primeobj = selecteditem.get("data_column_primaryvalues");
            primeobj.primaryconditions[0].primereactions.push({ "id": "", "type": "None", "reactvalue": "", "imgpos": "left" });
            selecteditem.unset("data_column_primaryvalues", { silent: true });
            selecteditem.set({ "data_column_primaryvalues": primeobj });
        }
        else if ($scope.selecteditem == "SecondaryValues") {
            var selecteditem = valuepair.byId(valuepair, $scope.view.getSelected().controlid);
            var secondobj = selecteditem.get("data_column_secondaryvalues");
            secondobj.secondaryconditions[0].secondreactions.push({ "id": "", "type": "None", "reactvalue": "", "imgpos": "left" });
            selecteditem.unset("data_column_secondaryvalues", { silent: true });
            selecteditem.set({ "data_column_secondaryvalues": secondobj });
        }
        $scope.changeindicatereactions();
    };
    //....add dynamic field properties for indicaters ended...........//

    //....remove dynamic field properties for indicaters...........//
    $scope.Removeprop = function (obj, $event) {
        var removeSecondary = $($event.target).parent().attr("id");
        var removedivindex = $($event.target).parent().index();
        if (removedivindex == 0) {
            return false;
        } else {
            $('#' + removeSecondary).remove();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                primeobj.primaryconditions[0].primereactions.splice(removedivindex, 1);
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                secondobj.secondaryconditions[0].secondreactions.splice(removedivindex, 1);
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }
        }
    }
    //....remove dynamic field properties for indicaters ended...........//

    //....updatedbconnections by adding datasources...........//
    $scope.changeindicateprediactes = function () {
        $(".predicatetype").unbind("change");
        $(".predicatetype").on('change', function () {
            var predicttarget = document.getElementById($(this).attr("id"));
            var predicttext = document.getElementById($(this).next().attr("id"));
            var predicatetext = $("#" + predicttext.id).val();
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();

            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                primeobj.primaryconditions[0].primepredicates[divindex].id = Controlid;
                primeobj.primaryconditions[0].primepredicates[divindex].type = predicttarget.value;
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                secondobj.secondaryconditions[0].secondpredicates[divindex].id = Controlid;
                secondobj.secondaryconditions[0].secondpredicates[divindex].type = predicttarget.value;
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }


        });

        $(".predicatetext").unbind("change");
        $(".predicatetext").on('change', function () {
            var predicttext = document.getElementById($(this).attr("id"));
            var predicatetext = $("#" + predicttext.id).val();
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                primeobj.primaryconditions[0].primepredicates[divindex].value = predicatetext;
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                secondobj.secondaryconditions[0].secondpredicates[divindex].value = predicatetext;
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }
        });
    };
    //....updatedbconnections by adding datasources...........//

    //....changeindicater reactions ...........//
    $scope.changeindicatereactions = function () {
        $(".dropdownchang").unbind("change");
        $(".dropdownchang").on('change', function () {
            var target = document.getElementById($(this).attr("id"));//to get this element data
            var colortarget = document.getElementById($(this).next().attr("id"));  //to get for next element data  
            var changestyle = document.getElementById($(this).next().next().attr("id")); //to get font weight drp down id//$(this).nextAll().eq(1)
            var rplcetext = document.getElementById($(this).next().next().next().attr("id"));//to get rplace text id 
            var indicateicon = document.getElementById($(this).next().next().next().next().attr("id"));//to get indicate icon
            var indicateiconsrc = $(this).next().next().next().next().attr("src");//to get indicate iconsrc
            var indicateiconselect = document.getElementById($(this).next().next().next().next().next().attr("id"));//to get indicate icon

            if (target.value == "change color") {
                $("#" + colortarget.id).show();
                $("#" + changestyle.id).hide();
                $("#" + rplcetext.id).hide();
                $("#" + indicateicon.id).hide();
                $("#" + indicateiconselect.id).hide();
            } else if (target.value == "display icon") {
                $("#" + colortarget.id).hide();
                $("#" + changestyle.id).hide();
                $("#" + rplcetext.id).hide();
                $("#" + indicateicon.id).show();
                $("#" + indicateiconselect.id).show();
            } else if (target.value == "change style") {
                $("#" + colortarget.id).hide();
                $("#" + changestyle.id).show();
                $("#" + rplcetext.id).hide();
                $("#" + indicateicon.id).hide();
                $("#" + indicateiconselect.id).hide();
            } else if (target.value == "replace with text") {
                $("#" + colortarget.id).hide();
                $("#" + changestyle.id).hide();
                $("#" + rplcetext.id).show();
                $("#" + indicateicon.id).hide();
                $("#" + indicateiconselect.id).hide();
            } else if (target.value == "None") {
                $("#" + colortarget.id).hide();
                $("#" + changestyle.id).hide();
                $("#" + rplcetext.id).hide();
                $("#" + indicateicon.id).hide();
                $("#" + indicateiconselect.id).hide();
            }


            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");


            if ($scope.selecteditem == "PrimaryValues") {
                if (target.value == "change color") {
                    primeobj.primaryconditions[0].primereactions[divindex].id = Controlid;
                    primeobj.primaryconditions[0].primereactions[divindex].type = target.value;
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = colortarget.value;
                }
                else if (target.value == "display icon") {
                    primeobj.primaryconditions[0].primereactions[divindex].id = Controlid;
                    primeobj.primaryconditions[0].primereactions[divindex].type = target.value;
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = indicateiconsrc;
                    // primeobj.primaryconditions[0].primereactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
                } else if (target.value == "change style") {
                    primeobj.primaryconditions[0].primereactions[divindex].id = Controlid;
                    primeobj.primaryconditions[0].primereactions[divindex].type = target.value;
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = changestyle.value;
                } else if (target.value == "replace with text") {
                    primeobj.primaryconditions[0].primereactions[divindex].id = Controlid;
                    primeobj.primaryconditions[0].primereactions[divindex].type = target.value;
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = $("#" + rplcetext.id).val();;
                } else if (target.value == "None") {
                    primeobj.primaryconditions[0].primereactions[divindex].id = Controlid;
                    primeobj.primaryconditions[0].primereactions[divindex].type = "";
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = "";
                }
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                if (target.value == "change color") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].id = Controlid;
                    secondobj.secondaryconditions[0].secondreactions[divindex].type = target.value;
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = colortarget.value;
                }
                else if (target.value == "display icon") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].id = Controlid;
                    secondobj.secondaryconditions[0].secondreactions[divindex].type = target.value;
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = indicateiconsrc;
                    // secondobj.secondaryconditions[0].secondreactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
                } else if (target.value == "change style") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].id = Controlid;
                    secondobj.secondaryconditions[0].secondreactions[divindex].type = target.value;
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = changestyle.value;
                } else if (target.value == "replace with text") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].id = Controlid;
                    secondobj.secondaryconditions[0].secondreactions[divindex].type = target.value;
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = $("#" + rplcetext.id).val();;
                } else if (target.value == "None") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].id = Controlid;
                    secondobj.secondaryconditions[0].secondreactions[divindex].type = "";
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = "";
                }
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }

        });

        $(".reactionvalue").unbind("change");
        $(".reactionvalue").on('change', function () {
            var target = document.getElementById($(this).parent().find('.dropdownchang').attr("id"));
            var colortarget = document.getElementById($(this).attr("id"));  //to get for next element data  
            var changestyle = document.getElementById($(this).attr("id")); //to get font weight drp down id//$(this).nextAll().eq(1)
            var rplcetext = document.getElementById($(this).attr("id"));//to get rplace text id  
            var indicateicon = document.getElementById($(this).next().next().attr("id"));//to get indicate icon
            var indicateiconsrc = $(this).next().next().attr("src");//to get indicate icon src
            var indicateiconselect = document.getElementById($(this).next().next().next().next().attr("id"));//to get indicate icon
            // //alert(indicateiconsrc);
            var parenddivid = $(this).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                if (target.value == "change color") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = colortarget.value;
                }
                else if (target.value == "display icon") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = indicateiconsrc;
                } else if (target.value == "change style") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = changestyle.value;
                } else if (target.value == "replace with text") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = $("#" + rplcetext.id).val();;
                } else if (target.value == "None") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = "";
                }
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                if (target.value == "change color") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = colortarget.value;
                }
                else if (target.value == "display icon") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = indicateiconsrc;
                } else if (target.value == "change style") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = changestyle.value;
                } else if (target.value == "replace with text") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = $("#" + rplcetext.id).val();;
                } else if (target.value == "None") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = "";
                }
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }

        });
        $("#fmtas").unbind("change");
        $("#fmtas").on('change', function () {
            var DropDownVal = $("#fmtas").val();
            if (DropDownVal == "Text" || "Currency" || "Percentage" || "Image URL" || "Date/Time" || "Duration" || "Raw") {
                $("#textdecimals").hide();
                if ($scope.selecteditem == "PrimaryValues") {
                    var Styleproperties = selecteditem.get("primary_style");
                    Styleproperties.Decimal = 0;
                    $('#numberDecimal').val('0');
                    selecteditem.unset("primary_style", { silent: true });
                    selecteditem.set({ "primary_style": Styleproperties });
                } else if ($scope.selecteditem == "SecondaryValues") {
                    var SeconderyStyle = selecteditem.get("secondary_style");
                    SeconderyStyle.Decimal = 0;
                    $('#numberDecimal').val('0');
                    selecteditem.unset("secondary_style", { silent: true });
                    selecteditem.set({ "secondary_style": SeconderyStyle });
                }
            }
            DropDownVal == "Number" ? $("#textdecimals").show() : $("#textdecimals").hide();

        });
        $("#textdecimals").unbind("change");
        $("#textdecimals").on('change', function () {
            if ($scope.selecteditem == "PrimaryValues") {
                var Styleproperties = selecteditem.get("primary_style");
                Styleproperties.FormatAs = $("#fmtas").val();
                Styleproperties.Decimal = parseInt($("#numberDecimal").val());
                selecteditem.unset("primary_style", { silent: true });
                selecteditem.set({ "primary_style": Styleproperties });
            } else if ($scope.selecteditem == "SecondaryValues") {
                var SeconderyStyle = selecteditem.get("secondary_style");
                SeconderyStyle.FormatAs = $("#fmtas").val();
                SeconderyStyle.Decimal = parseInt($("#numberDecimal").val());
                selecteditem.unset("secondary_style", { silent: true });
                selecteditem.set({ "secondary_style": SeconderyStyle });
            }
        });
    };
    //....changeindicater reactions ended...........//


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
    $scope.changeindicateimgpos = function () {
        var parenddivid = $("#" + angular.element("#mymodelindicatoricons").attr("data-id")).parent().attr("id");
        var divindex = $("#" + parenddivid).index();
        var primeobj = selecteditem.get("data_column_primaryvalues");
        var secondobj = selecteditem.get("data_column_secondaryvalues");
        if ($scope.selecteditem == "PrimaryValues") {
            primeobj.primaryconditions[0].primereactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
            selecteditem.unset("data_column_primaryvalues", { silent: true });
            selecteditem.set({ "data_column_primaryvalues": primeobj });
            //alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
        }
        else if ($scope.selecteditem == "SecondaryValues") {
            secondobj.secondaryconditions[0].secondreactions[divindex].imgpos = $(".imgpos-indicate").find(".btn-default").attr("data-index").trim();
            selecteditem.unset("data_column_secondaryvalues", { silent: true });
            selecteditem.set({ "data_column_secondaryvalues": secondobj });
            //alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
        }
    };
    //..change indicater imgposition ended...//



    //..............................................indicators popup....................................................//

    $scope.showindicatepopup = function (id) {
        var iconsmodel = angular.element("#mymodelindicatoricons");
        angular.element("#mymodelindicatoricons").attr("data-id", id);
        iconsmodel.modal('show');
        var parenddivid = $("#" + angular.element("#mymodelindicatoricons").attr("data-id")).parent().attr("id");
        var divindex = $("#" + parenddivid).index();
        var primeobj = selecteditem.get("data_column_primaryvalues");
        var secondobj = selecteditem.get("data_column_secondaryvalues");
        if ($scope.selecteditem == "PrimaryValues") {
            $(".imgpos-indicate").find("button[name=indicateimgpos]").each(function (i) {
                if ($(this).attr("data-index").trim() == primeobj.primaryconditions[0].primereactions[divindex].imgpos) {
                    $(".imgpos-indicate").find(".btn-default").each(function (i) {
                        $(this).removeClass("btn-default");
                    });
                    $(this).addClass("btn-default");
                }
            });
        }
        else {
            $(".imgpos-indicate").find("button[name=indicateimgpos]").each(function (i) {
                if ($(this).attr("data-index").trim() == secondobj.secondaryconditions[0].secondreactions[divindex].imgpos) {
                    $(".imgpos-indicate").find(".btn-default").each(function (i) {
                        $(this).removeClass("btn-default");
                    });
                    $(this).addClass("btn-default");
                }
            });

        }
        $("#mymodelindicatoricons").find(".indicator-swatch").on('click', function () {
            $("#" + angular.element("#mymodelindicatoricons").attr("data-id")).attr("src", $(this).attr("src"));
            var iconsmodel = angular.element("#mymodelindicatoricons");
            iconsmodel.modal('hide');
            var indicateiconsrc = $(this).attr("src");
            var parenddivid = $("#" + angular.element("#mymodelindicatoricons").attr("data-id")).parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var target = $("#" + parenddivid).find(".dropdownchang").val();
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            var primeobj = selecteditem.get("data_column_primaryvalues");
            var secondobj = selecteditem.get("data_column_secondaryvalues");

            if ($scope.selecteditem == "PrimaryValues") {
                if (target == "display icon") {
                    primeobj.primaryconditions[0].primereactions[divindex].reactvalue = indicateiconsrc;
                }
                selecteditem.unset("data_column_primaryvalues", { silent: true });
                selecteditem.set({ "data_column_primaryvalues": primeobj });
                // alert(JSON.stringify(selecteditem.get("data_column_primaryvalues")));
            }
            else if ($scope.selecteditem == "SecondaryValues") {
                if (target == "display icon") {
                    secondobj.secondaryconditions[0].secondreactions[divindex].reactvalue = indicateiconsrc;
                }
                selecteditem.unset("data_column_secondaryvalues", { silent: true });
                selecteditem.set({ "data_column_secondaryvalues": secondobj });
                // alert(JSON.stringify(selecteditem.get("data_column_secondaryvalues")));
            }
        });



    };
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







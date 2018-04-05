
function envmetergauge($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {



    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;

     $("#previewobject").empty();

    if (controlid == "new")//Creating new Control
    {
        metergauge.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_values: { "id": "undefined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "undefined", "connectiontype": "undefined", "formula": "undefined", "formula_template": "undefined", "manualtext": "" },
            style: { "value": "55", "units": "Km/h", "Width": "200", "height": "200", "min": "0", "max": "250", "Interval": "50", "title": "Gauge", "HeaderText": "Gauge", "Headercolor": "#008000", "FooterText": "Value", "Footercolor": "#993366" },
            customSectors: {
                "colors": [{ from: 0, to: 50, color: '#ffffff' },
            { from: 50, to: 100, color: '#ffffff' },
            { from: 100, to: 150, color: '#ffffff' },
            { from: 150, to: 200, color: '#ffffff' },
            { from: 200, to: 250, color: '#ffffff' }]
            },
            majorTicks: {
                //"Ticks": ['0','20', '40', '60', '80', '100', '120',  '140','160', '180', '200','220']
                "Ticks": ['0', '50', '100', '150', '200', '250']
            },
            needle: { "startcolor": "#33CCCC", "endcolor": "#FF9900", "plateColor": "#ffffff", "majorTicks": "#C0C0C0", "minorTicks": "#808080", "units": "#000000", "numbers": "#000000" },
            colors: [],
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = metergauge.byId(metergauge, Controlid);
    } else {
        // alert($("#bitree").children().find("#Gages").html());

        //$("#previewobject").empty();
        selecteditem = metergauge.byId(metergauge, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
        $("#previewobject").empty();
        var element = document.getElementById($scope.view.getSelected().controlid);
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = selecteditem.get("style").Width;
        newCanvas.height = selecteditem.get("style").height;
        newCanvas.id = $scope.view.getSelected().controlid ;

        //apply the old canvas to the new one
        context.drawImage(element, 0, 0);
        $("#previewobject").empty();
        $("#previewobject").append(newCanvas);


        var MeterGaugeobj12 = new Gauge({
            renderTo: $scope.view.getSelected().controlid ,
            width: selecteditem.get("style").Width,
            height: selecteditem.get("style").height,
            glow: true,
            units: selecteditem.get("style").units,
            title: selecteditem.get("style").title,
            minValue: parseInt(selecteditem.get("style").min),
            maxValue: parseInt(selecteditem.get("style").max),
            majorTicks: selecteditem.get("majorTicks").Ticks,
            minorTicks: 2,
            strokeTicks: false,
            highlights: "",
            colors: {
                plate: selecteditem.get("needle").plateColor,
                majorTicks: selecteditem.get("needle").majorTicks,
                minorTicks: selecteditem.get("needle").minorTicks,
                title: selecteditem.get("style").Headercolor,
                units: selecteditem.get("needle").units,
                numbers: selecteditem.get("needle").numbers,
                needle: { start: selecteditem.get("needle").startcolor, end: selecteditem.get("needle").endcolor }
            }
        });
        //alert(model.get("style").value);
        //alert(targetvalue);
        MeterGaugeobj12.setValue(55);
        MeterGaugeobj12.draw();
        //$("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

    }


    $http.get('../Analytics/Bi360Templates/Tabs/MeterGauge.html').success(function (t) {

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
                newGageColor.colors[divindex].from = From_to[0];
                newGageColor.colors[divindex].to = From_to[1];
                selecteditem.unset("customSectors", { silent: true });
                selecteditem.set({ "customSectors": newGageColor });
            }


        });
        $scope.changeInterval = function () {
            var GaugeStyle = selecteditem.get("style");
            GaugeStyle.min = $("#MinVal").val();
            GaugeStyle.max = $("#MaxValue").val();
            GaugeStyle.Interval = $("#Intervalvalue").val();
            var interval = $("#Intervalvalue").val();
            var Gaugemajorticks = selecteditem.get("majorTicks");
            var Ticksarry = new Array();
            if (GaugeStyle.max != "") {
                //if (GaugeStyle.min != "") {
                var limits = parseInt(GaugeStyle.max) / parseInt(interval);
                for (var i = 0; i <= limits; i++) {
                    var temp = parseInt(interval) * parseInt(i);
                    Ticksarry.push(temp);
                }
                //}
                //else {
                //    alert("Minimum value should not be empty");
                //    return;
                //}
            }
            else {
                alert("Maximum value should not be empty");
                return;
            }

            Gaugemajorticks.Ticks = Ticksarry;
            selecteditem.unset("style", { silent: true });
            selecteditem.set({ "style": GaugeStyle });
            $("#Gageprop").empty();
            var FromValue = "";
            var ToValue = "";
            var ColorValue = "";
            var colors = ['#00ff00', '#ffff00', '#ff1e00', '#ff00e1', '#0000ff'];
            var colorcount = 0;
            var customsector_color = new Array();
            for (var j = 0; j < Ticksarry.length; j++) {
                var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                var customcolor_colorpicker = "";

                if (colorcount > colors.length - 1)
                {
                    colorcount = 0;
                }
                if (j > colors.length - 1) {

                    customcolor_colorpicker = colors[colorcount];
                    colorcount++;
                }
                else {
                    customcolor_colorpicker = colors[j];
                }
                
                if (j != Ticksarry.length - 1) {
                    FromValue = Ticksarry[j];
                    ToValue = Ticksarry[j + 1];
                    var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>From</span><input id='Fromvalue_" + FieldCount + "' readonly='true'  value=" + FromValue + "  type='text' style='width: 10%;margin-left:4px' /> <span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>To</span> <input id='To_" + FieldCount + "' value=" + ToValue + " readonly='true' class='predicatetext' type='text'  style='width: 10%; margin-left: 7px; height: 35px; margin-top: 4px;'><span class='PropertyLine field' style='width: 42px; font-size: 13px; font-weight: bold;margin-left:14px'>Color</span><div class='prop-editor' style='white-space: nowrap; margin-left: 25px; vertical-align: top;'><input id='color_" + FieldCount + "' type='text' value='" + customcolor_colorpicker + "' name='color1' style='visibility: hidden; position: absolute;' ng-model='Rcolor' class='colorchange' ></div></div>")($scope));
                    $('#Gageprop').append(addeditems);
                    $('#color_' + FieldCount).colorPicker();
                    $('#firstDiv_' + FieldCount).find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "14px" });
                    
                    var Colorsarray = { "from": FromValue, "to": ToValue, "color": customcolor_colorpicker };
                    customsector_color.push(Colorsarray);
                }
            }
            var customcolor1 = selecteditem.get("customSectors");
            customcolor1.colors = customsector_color;
            selecteditem.unset("customSectors", { silent: true });
            selecteditem.set({ "customSectors": customcolor1 });
            $scope.changeindicate();

        }


        $scope.changeproperties = function () {
            var GaugeStyle = selecteditem.get("style");
            GaugeStyle.title = $("#TitleTextSize").val();
            GaugeStyle.units = $("#UnitText").val();
            GaugeStyle.Headercolor = $("#HeaderColor").val();
            GaugeStyle.Width = $("#GaugeWidth").val();
            GaugeStyle.height = $("#Gaugeheight").val();


            selecteditem.unset("style", { silent: true });
            selecteditem.set({ "style": GaugeStyle });

            //==========================================Units Color From Needle Style
            var UnitColor = selecteditem.get("needle");
            UnitColor.units = $("#FooterColor").val();
            selecteditem.unset("needle", { silent: true });
            selecteditem.set({ "needle": UnitColor });
        }


        $(".PlateColorpicker").on('change', function () {
            var newPlateColor = selecteditem.get("needle");
            newPlateColor.plateColor = $("#Platecolorpicker").val();
            newPlateColor.majorTicks = $("#Majortickscolorpicker").val();
            newPlateColor.minorTicks = $("#Minortickscolorpicker").val();
            newPlateColor.units = $("#Unitscolorpicker").val();
            newPlateColor.numbers = $("#Numberscolorpicker").val();
            newPlateColor.startcolor = $("#NeedleStartcolorpicker").val();
            newPlateColor.endcolor = $("#NeedleEndcolorpicker").val();
            selecteditem.unset("needle", { silent: true });
            selecteditem.set({ "needle": newPlateColor });

        });

    });
    //$scope.selected = 3;
    //$scope.selecteditem = "Gages";
    //$("#Gagedatatab").hide();
    //$("#GageColortab").hide();
    //$("#GageStyleTab").show();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "Gages", "parent": "#", "text": "Gages", 'state': { 'opened': true, 'selected': true } },
              { "id": "Value", "parent": "Gages", "text": "Value" },
               { "id": "color", "parent": "Gages", "text": "color" },
                 { "id": "Ticks", "parent": "Gages", "text": "Ticks" }
                //{ "id": "Style", "parent": "Gages", "text": "Style" }



    ];


    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        $("#Gagedatatab").hide();
        $("#GageColortab").hide();
        $("#GageStyleTab").show();
        $("#A2").hide();
        var newGagestyle = selecteditem.get("style");
        $("#Intervalvalue").val(newGagestyle.Interval);
        $("#MinVal").val(newGagestyle.min);
        $("#MaxValue").val(newGagestyle.max);
        $("#HeaderColor").val(newGagestyle.Headercolor);
        $("#GaugeWidth").val(newGagestyle.Width);
        $("#Gaugeheight").val(newGagestyle.height);
        $("#headcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Headercolor });
        $("#FooterTextSize").val(newGagestyle.FooterText);
        $("#TitleTextSize").val(newGagestyle.title);
        $("#UnitText").val(newGagestyle.units);

        var FooterColor = selecteditem.get("needle");
        $("#FooterColor").val(FooterColor.units);
        $("#footcolor").find(".colorPicker-picker").css({ "background-color": FooterColor.units });
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
    //$("#previewobject").empty();
    //$("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));



    //bind properties if control is existing............
    if (controlid != "new") {
        Controlid = controlid;
        //if (selecteditem.get("datatabs").length > 0)
        //    $scope.datatabs = selecteditem.get("datatabs");
    }

    $("#Gagedatatab").hide();
    $("#GageColortab").hide();
    $("#GageStyleTab").show();
    $(document.getElementById("GageStyleTab")).click();
    $("#A2").hide();
    var newGagestyle = selecteditem.get("style");
    $("#MinVal").val(newGagestyle.min);
    $("#MaxValue").val(newGagestyle.max);
    $("#Intervalvalue").val(newGagestyle.Interval);
    $("#HeaderColor").val(newGagestyle.Headercolor);
    $("#GaugeWidth").val(newGagestyle.Width);
    $("#Gaugeheight").val(newGagestyle.height);
    $("#headcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Headercolor });
    $("#FooterTextSize").val(newGagestyle.FooterText);
    $("#TitleTextSize").val(newGagestyle.title);
    $("#UnitText").val(newGagestyle.units);

    var FooterColor = selecteditem.get("needle");
    $("#FooterColor").val(FooterColor.units);
    $("#footcolor").find(".colorPicker-picker").css({ "background-color": FooterColor.units });
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
              $("#A2").hide();
              $("#GageStyleTab").hide();
              $("#VFormula-menu").show();
              $("#vf-formula-bar").show();
              $("#vf-formula-bar").empty(); $("#bitable").find("table").find('tr > *').removeClass('highlighted');
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
              $("#Div10").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $("#Div19").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $("#Div12").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $("#Div14").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $("#Div16").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $("#Div7").find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "8px" });
              $scope.selected = 2;
              $("#Gagedatatab").hide();
              $("#GageColortab").show();
              $("#GageStyleTab").hide();
              $("#A2").hide();
              var needleStyle = selecteditem.get("needle");
              $("#Majortickscolorpicker").val(needleStyle.majorTicks);
              $("#Div11").find(".colorPicker-picker").css({ "background-color": needleStyle.majorTicks });

              $("#Minortickscolorpicker").val(needleStyle.minorTicks);
              $("#Div20").find(".colorPicker-picker").css({ "background-color": needleStyle.minorTicks });

              $("#Unitscolorpicker").val(needleStyle.units);
              $("#Div13").find(".colorPicker-picker").css({ "background-color": needleStyle.units });

              $("#Numberscolorpicker").val(needleStyle.numbers);
              $("#Div14").find(".colorPicker-picker").css({ "background-color": needleStyle.numbers });

              $("#NeedleStartcolorpicker").val(needleStyle.startcolor);
              $("#Div17").find(".colorPicker-picker").css({ "background-color": needleStyle.startcolor });

              $("#NeedleEndcolorpicker").val(needleStyle.endcolor);
              $("#Div18").find(".colorPicker-picker").css({ "background-color": needleStyle.endcolor });

              $("#Platecolorpicker").val(needleStyle.plateColor);
              $("#Div7").find(".colorPicker-picker").css({ "background-color": needleStyle.plateColor });


              var GaugeStyle = selecteditem.get("style");
              var interval = GaugeStyle.Interval;
              var Gaugemajorticks = selecteditem.get("majorTicks");
              var Ticksarry = new Array();
              if (GaugeStyle.max != "" && GaugeStyle.min != "" ) {
                  var limits = parseInt(GaugeStyle.max) / parseInt(interval);
                  for (var i = 0; i <= limits; i++) {
                      var temp = parseInt(interval) * parseInt(i);
                      Ticksarry.push(temp);
                  }
              }
              $("#Gageprop").empty();
              var FromValue = "";
              var ToValue = "";
              var ColorValue = "";
              var colors_model = selecteditem.get("customSectors").colors;
              var customcolor_colorpicker = "";
              
              for (var j = 0; j < Ticksarry.length; j++) {
                  var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                  if (j != Ticksarry.length - 1) {
                      customcolor_colorpicker = colors_model[j].color;
                      FromValue = Ticksarry[j];
                      ToValue = Ticksarry[j + 1];
                      var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>From</span><input id='Fromvalue_" + FieldCount + "' readonly='true'  value=" + FromValue + "  type='text' style='width: 10%;margin-left:4px' /> <span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>To</span> <input id='To_" + FieldCount + "' value=" + ToValue + " readonly='true' class='predicatetext' type='text'  style='width: 10%; margin-left: 7px; height: 35px; margin-top: 4px;'><span class='PropertyLine field' style='width: 42px; font-size: 13px; font-weight: bold;margin-left:14px'>Color</span><div class='prop-editor' style='white-space: nowrap; margin-left: 25px; vertical-align: top;'><input id='color_" + FieldCount + "' type='text' value='" + customcolor_colorpicker + "' name='color1' style='visibility: hidden; position: absolute;' ng-model='Rcolor' class='colorchange' ></div></div>")($scope));
                      $('#Gageprop').append(addeditems);
                      $('#color_' + FieldCount).colorPicker();
                      $('#firstDiv_' + FieldCount).find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "14px" });

                     
                  }
              }
              $scope.changeindicate();
         
          }
          else if (sel == "Gages") {
              var newGagestyle = selecteditem.get("style");
              $("#VFormula-menu").hide();
              $("#vf-formula-bar").hide();
              $("#Gagedatatab").hide();
              $("#GageColortab").hide();
              $("#GageStyleTab").show();
              $("#GageStyleTab").click();
              $("#Intervalvalue").val(newGagestyle.Interval);
              $("#MinVal").val(newGagestyle.min);
              $("#MaxValue").val(newGagestyle.max);
              $("#HeaderColor").val(newGagestyle.Headercolor);
              $("#GaugeWidth").val(newGagestyle.Width);
              $("#Gaugeheight").val(newGagestyle.height);
              $("#headcolor").find(".colorPicker-picker").css({ "background-color": newGagestyle.Headercolor });
              $("#FooterTextSize").val(newGagestyle.FooterText);
              $("#TitleTextSize").val(newGagestyle.title);
              $("#UnitText").val(newGagestyle.units);
              var FooterColor = selecteditem.get("needle");
              $("#FooterColor").val(FooterColor.units);
              $("#footcolor").find(".colorPicker-picker").css({ "background-color": FooterColor.units });

          }
          else if (sel == "Ticks") {
              $("#A2").show();
              $("#GageStyleTab").hide();
              $("#GageColortab").hide();
              $("#Gagedatatab").hide();
              $scope.selecteditem = "Ticks";
              $scope.selected = 4;
              var MajorTicks = selecteditem.get("majorTicks");
              $("#Tick1").val(MajorTicks.Ticks[0]);
              $("#Tick2").val(MajorTicks.Ticks[1]);
              $("#Tick3").val(MajorTicks.Ticks[2]);
              $("#Tick4").val(MajorTicks.Ticks[3]);
              $("#Tick5").val(MajorTicks.Ticks[4]);
              $("#Tick6").val(MajorTicks.Ticks[5]);

          }



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
    $scope.changeindicate = function () {
        $(".colorchange").unbind("change");
        $(".colorchange").on('change', function () {
            var ChangeGageColor = selecteditem.get("customSectors");
            var parenddivid = $(this).parent().parent().attr("id");
            var divindex = $("#" + parenddivid).index();
            var colorValue = $(this).attr("id");
            var predicatetext = $("#" + colorValue).val();
            ChangeGageColor.colors[divindex].color = predicatetext; //or $(this).val()
            selecteditem.unset("customSectors", { silent: true });
            selecteditem.set({ "customSectors": ChangeGageColor });
        });

    };
    $scope.updatedbconnections = function () {
        //get formula
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        selecteditem = metergauge.byId(metergauge, $scope.view.getSelected().controlid);
        if ($scope.selecteditem == "Value") {
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
        newStyleGage.height = $("#Gaugeheight").val();
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
        var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "'><span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>From</span><input id='Fromvalue_" + FieldCount + "'  type='text' style='width: 10%;margin-left:4px' /> <span class='PropertyLine' style='width: 42px; font-size: 13px; font-weight: bold;'>To</span> <input id='To_" + FieldCount + "' class='predicatetext' type='text'  style='width: 10%; margin-left: 7px; height: 35px; margin-top: 4px;'><span class='PropertyLine field' style='width: 42px; font-size: 13px; font-weight: bold;margin-left:14px'>Color</span><div class='prop-editor' style='white-space: nowrap; margin-left: 25px; vertical-align: top;'><input id='color_" + FieldCount + "' type='text' value='#000000' name='color1' style='visibility: hidden; position: absolute;' ng-model='Rcolor' ng-change='changeproperties()'></div> <button class='btn btn-red' style='width: 10px; margin-left: 26px;' ng-click='RemoveParm(obj,$event);' type='button'>--</button></div>")($scope));
        $('#Gageprop').append(addeditems);
        $('#color_' + FieldCount).colorPicker();
        $('#firstDiv_' + FieldCount).find(".colorPicker-picker").css({ "display": "table-caption", "margin-top": "14px" });
    }
    $scope.RemoveParm = function (obj, $event) {
        var RemoveColor = $($event.target).parent().attr("id");
        $("#" + RemoveColor).remove();
    }
    $scope.addTicks = function () {
        var FieldCount = Math.floor((Math.random() * 7683480) + 198);
        var addeditems = angular.element($compile("<div id='firstDiv_" + FieldCount + "' style='margin-top: 4px'><input id='Fromvalue_" + FieldCount + "' class='GageColor'  type='text' style='width: 5%; margin-left: 4%' />  <button class='btn btn-red' style='width: 10px; margin-left: 4px;' ng-click='RemoveTickParm(obj,$event);' type='button'>--</button></div>")($scope));
        $('#TickGroup').append(addeditems);
    }
    $scope.RemoveTickParm = function (obj, $event) {
        var RemoveColorDiv = $($event.target).parent().attr("id");
        $('#' + RemoveColorDiv).remove();
    }
}

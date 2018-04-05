function envprogressbar($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new")//Creating new Control
    {
        Progressbar.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_values: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined", "manualtext": "" },
            style: { "width": "98%", "FontSize": "Medium", "FontColor": "#000000", "FirstColor": "#ff0000", "SecondColor": "#008000", "LabelName": "Progressbar Name", "prefix": "", "suffix": "", "ThirdColor": "#ffcc00", "FourthColor": "#33cccc", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "Greaterthan": "3000", "Lessthan": "2000", "MaxValue": "3000", "MinValue": "0", "BorderWidth": "1" },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = Progressbar.byId(Progressbar, Controlid);
    }
    else {
        selecteditem = Progressbar.byId(Progressbar, $scope.view.getSelected().controlid);
    }
    $http.get('../Analytics/Bi360Templates/Tabs/ProgressbarTabs.html').success(function (s) {
        //bind tabs html to tabs div      
        $("#Tabsobject").html($compile(s)($scope));
        $scope.LoadVariable();

        $scope.selected = 2;
        $scope.selecteditem = "Progressbar";
        $("#VFormula-menu").hide();
        $("#vf-formula-bar").hide();
        $("#progressbartab").hide();
        $("#progressbarpropertiestab").show();




        $("#treeid").html($compile('<div id="bitree"></div>')($scope));

        var data = [
                   { "id": "Progressbar", "parent": "#", "text": "Progressbar", 'state': { 'opened': true, 'selected': true } },
                   { "id": "Values", "parent": "Progressbar", "text": "Values" }
        ];
        $('#bitree').bind('loaded.jstree', function (e, data) {
            var newProgressstyel = selecteditem.get("style");
            $("#MinValue").val(newProgressstyel.MinValue);
            $("#MaxValue").val(newProgressstyel.MaxValue);
            $("#LessValue").val(newProgressstyel.Lessthan);
            $("#GreaterValue").val(newProgressstyel.Greaterthan);
            $("#color1").val(newProgressstyel.FirstColor);
            $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FirstColor });
            $("#Rcolor").val(newProgressstyel.SecondColor);
            $("#RadioValueColour").find(".colorPicker-picker").css({ "background-color": newProgressstyel.SecondColor });
            $("#abovemiddle").val(newProgressstyel.ThirdColor);
            $("#ThirdColor").find(".colorPicker-picker").css({ "background-color": newProgressstyel.ThirdColor });
            $("#lastColor").val(newProgressstyel.FourthColor);
            $("#color75").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FourthColor });
            $("#Labelname").val(newProgressstyel.LabelName);
            $("#prefix").val(newProgressstyel.prefix);
            $("#suffix").val(newProgressstyel.suffix);
            $("#fontsize").val(newProgressstyel.FontSize);
            $("#FontColor").val(newProgressstyel.FontColor);
            $("#ProgressBarwidth").val(newProgressstyel.width);
            $("#Fcolor").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FontColor });
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
            if (selecteditem.get("datatabs").length > 0) {
                $scope.datatabs = selecteditem.get("datatabs");
            }
        }
        $("#bitree").bind("select_node.jstree", function (evt, data) {
            var ref = $('#bitree').jstree(true);
            var sel = ref.get_selected();
            $("#progressbarpropertiestab").show();
            // $(document.getElementById("Progressbar")).click();
            //$scope.modal.tablestatus = true;
            //$scope.modal.expressionstatus = true;
            //$scope.modal.strnumstatus = true;
            //$scope.modal.variablestatus = true;
           
            if (sel == "Progressbar") {
                $scope.selected = 2;
                $scope.selecteditem = "Progressbar";
                $("#progressbarpropertiestab").show();
                $("#ProgressbarProp").show();
                $("#progressbartab").hide();
                $(document.getElementById("progressbarpropertiestab")).click();
                var newProgressstyel = selecteditem.get("style");
                $("#MinValue").val(newProgressstyel.MinValue);
                $("#MaxValue").val(newProgressstyel.MaxValue);
                $("#LessValue").val(newProgressstyel.Lessthan);
                $("#GreaterValue").val(newProgressstyel.Greaterthan);
                $("#color1").val(newProgressstyel.FirstColor);
                $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FirstColor });
                $("#Rcolor").val(newProgressstyel.SecondColor);
                $("#RadioValueColour").find(".colorPicker-picker").css({ "background-color": newProgressstyel.SecondColor });
                $("#abovemiddle").val(newProgressstyel.ThirdColor);
                $("#ThirdColor").find(".colorPicker-picker").css({ "background-color": newProgressstyel.ThirdColor });
                $("#lastColor").val(newProgressstyel.FourthColor);
                $("#color75").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FourthColor });
                $("#Labelname").val(newProgressstyel.LabelName);
                $("#prefix").val(newProgressstyel.prefix);
                $("#suffix").val(newProgressstyel.suffix);
                $("#fontsize").val(newProgressstyel.FontSize);
                $("#FontColor").val(newProgressstyel.FontColor);
                $("#ProgressBarwidth").val(newProgressstyel.width);
                $("#Fcolor").find(".colorPicker-picker").css({ "background-color": newProgressstyel.FontColor });

            } else if (sel == "Values") {
                $(document.getElementById("progressbartab")).click();
                $("#vf-formula-bar").empty();
                $("#bitable").find("table").find('tr > *').removeClass('highlighted');
                $("#progressbartab").show();
                $("#ProgressbarProp").hide();
                $("#progressbarpropertiestab").hide();
                $("#VFormula-menu").show();
                $("#vf-formula-bar").show();
                $scope.selected = 1;
                $scope.selecteditem = "Values";
                $(document.getElementById("progressbartab")).click();
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
                $scope.modal.variablestatus = true;
               
            }
            $scope.argplaceholderclick();
            $scope.bindinsertop(); $scope.operatorclick();
            $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick(); $scope.bindvaribleclick();
            $scope.$apply();
        });
       
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
        if ($scope.selecteditem == "Values") {            
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

    $scope.changeproperties = function () {
        if ($scope.selecteditem == "Progressbar") {
            var ProgressBar = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                ProgressBar.selectedid = selecteddatatab;
                ProgressBar.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                ProgressBar.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                ProgressBar.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                ProgressBar.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                ProgressBar.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }
            ProgressBar.MinValue = $("#MinValue").val();
            ProgressBar.MaxValue = $("#MaxValue").val();
            ProgressBar.Lessthan = $("#LessValue").val();
            ProgressBar.Greaterthan = $("#GreaterValue").val();
            ProgressBar.FirstColor = $("#color1").val();
            ProgressBar.SecondColor = $("#Rcolor").val();
            ProgressBar.ThirdColor = $("#abovemiddle").val();
            ProgressBar.FourthColor = $("#lastColor").val();
            ProgressBar.LabelName = $("#Labelname").val();
            ProgressBar.prefix = $("#prefix").val();
            ProgressBar.suffix = $("#suffix").val();
            ProgressBar.FontSize = $("#fontsize").val();
            ProgressBar.FontColor = $("#FontColor").val();
            ProgressBar.width = $("#ProgressBarwidth").val();
            selecteditem.set({ style: ProgressBar });
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
                selecteditem.set({ data_column_values: updateproperties });
            }
        }

    }
    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }

   
}//main function closing
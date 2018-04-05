function envradio($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new") {
        radio.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            data_column_values: { "id": "underfined", "DSId": "undefined", "DSName": "undefined", "DSCnnCretedby": "undefined", "connectionid": "underfined", "connectiontype": "underfined", "formula": "underfined", "formula_template": "underfined" },
            style: { "position": "absolute", "Width": "400px", "Height": "100px", "FontSize": "Medium", "Fontcolor": "#000000", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "pairsaparation": "10px", "BackgroundColor": "#ffffff", "BorderColor": "#000000", "BorderStyle": "none", "BroderWidth": "1", "manualText": "Label Name", "RadioColor": "#000000", "HfontSize": "0.9", "HLinehieght": "140" },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = radio.byId(radio, Controlid);
    } else {
        selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
        //clone object  
        $("#previewobject").empty();
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

    }
    $http.get('../Analytics/Bi360Templates/Tabs/RadioTabs.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope)); $scope.LoadVariable();
    });
    $scope.selected = 2;
    $scope.selecteditem = "radio";
    $("#VFormula-menu").hide();
    $("#vf-formula-bar").hide();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "radio", "parent": "#", "text": "radio", 'state': { 'opened': true, 'selected': true } },
               { "id": "Values", "parent": "radio", "text": "Values" }
    ];
    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        $("#color2").val(newtextstyel.BackgroundColor);
        $("#colorpick").find(".colorPicker-picker").css({ "background-color": newtextstyel.BackgroundColor });
        $("#color3").val(newtextstyel.BorderColor);
        $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
        $("#borderstyle").val(newtextstyel.BorderStyle);
        $("#borderwidth").val(newtextstyel.BroderWidth);
        $("#stylewidth").val(newtextstyel.Width);
        $("#styleheight").val(newtextstyel.Height);
        $("#fontsize").val(newtextstyel.FontSize);
        $("#color1").val(newtextstyel.Fontcolor);
        $("#mText").val(newtextstyel.manualvalu);
        $("#f-font_colour").find(".colorPicker-picker").css({ "background-color": newtextstyel.Fontcolor });
        $("#Rcolor").val(newtextstyel.RadioColor);
        $("#RadioValueColour").find(".colorPicker-picker").css({ "background-color": newtextstyel.RadioColor });
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
        var selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);
        if (selecteditem.get("datatabs").length > 0)
            $scope.datatabs = selecteditem.get("datatabs");
    }

    var selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);
    var textobj = selecteditem.get("style");
    $scope.width = textobj.Width;
    $scope.height = textobj.Height;
    $scope.bgcolor = textobj.BackgroundColor;
    $scope.bdcolor = textobj.BorderColor;
    $scope.brstyle = textobj.BorderStyle;
    $scope.brwidth = parseInt(textobj.BroderWidth);
    $scope.mText = textobj.manualvalu;
    $scope.Fcolor = textobj.Fontcolor;
    $scope.fontsize = textobj.FontSize;
    $scope.Rcolor = textobj.RadioColor;


    $("#bitree").bind("select_node.jstree", function (evt, data) {
        var selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);

        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        if (sel == "radio") {
            $scope.selecteditem = "radio";
            $scope.selected = 2;
            $("#radiodatatab").hide();
            $("#radiobuttonproperiestab").show();
            $("#VFormula-menu").hide();
            $("#vf-formula-bar").hide();
            var newtextstyel = selecteditem.get("style");
            $("#color2").val(newtextstyel.BackgroundColor);
            $("#colorpick").find(".colorPicker-picker").css({ "background-color": newtextstyel.BackgroundColor });
            $("#color3").val(newtextstyel.BorderColor);
            $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
            $("#borderstyle").val(newtextstyel.BorderStyle);
            $("#borderwidth").val(newtextstyel.BroderWidth);
            $("#stylewidth").val(newtextstyel.Width);
            $("#styleheight").val(newtextstyel.Height);
            $("#fontsize").val(newtextstyel.FontSize);
            $("#color1").val(newtextstyel.Fontcolor);
            $("#mText").val(newtextstyel.manualvalu);
            $("#Rcolor").val(newtextstyel.RadioColor);
        } else if (sel == "Values") {
            $scope.modal.variablestatus = true;
            $("#vf-formula-bar").empty();
            $("#bitable").find("table").find('tr > *').removeClass('highlighted');
            $scope.selected = 1;
            $("#radiodatatab").show();
            $("#radiobuttonproperiestab").hide();
            $("#VFormula-menu").show();
            $("#vf-formula-bar").show();
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
        $scope.argplaceholderclick();
        $scope.bindinsertop();
        $scope.operatorclick();
        $scope.agfuncclick();
        $scope.bindliterallick();
        $scope.binddataclick();
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
    $scope.changeproperties = function () {
        if ($scope.selecteditem == "radio") {
            var radioprop = new Object();
            if ($(".tabstriplist").find("[data-selected='true']").length > 0) {
                var selecteddatatab = $(".tabstriplist").find("[data-selected='true']").attr("id");
                radioprop.selectedid = selecteddatatab;
                radioprop.connectionid = $(".tabstriplist").find("[data-selected='true']").attr("data-connectionid");
                radioprop.connectiontype = $(".tabstriplist").find("[data-selected='true']").attr("data-connectiontype");
                radioprop.DSId = $(".tabstriplist").find("[data-selected='true']").attr("data-DSId");
                radioprop.DSName = $(".tabstriplist").find("[data-selected='true']").attr("data-DSName");
                radioprop.DSCnnCretedby = $(".tabstriplist").find("[data-selected='true']").attr("data-DSCnnCretedby");
            }
            radioprop.manualvalu = $('#mText').val();
            radioprop.BackgroundColor = $("#color2").val();
            radioprop.BorderColor = $("#color3").val();
            radioprop.BroderWidth = $("#borderwidth").val();
            radioprop.BorderStyle = $("#borderstyle").val();
            radioprop.Width = $("#stylewidth").val();
            radioprop.Height = $("#styleheight").val();
            radioprop.FontSize = $("#fontsize").val();
            radioprop.Fontcolor = $("#color1").val();
            radioprop.RadioColor = $("#Rcolor").val();
            selecteditem.set({ style: radioprop });
        }
    }
    $scope.updatedbconnections = function () {
        //get formula
        var formulatext = $.trim($("#vf-formula-bar").text());
        var formula_template = $.trim($("#vf-formula-bar").html());
        if ($scope.selecteditem == "Values") {
            var selecteditem = radio.byId(radio, $scope.view.getSelected().controlid);
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
    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }
};
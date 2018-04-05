function envlayoutgrid($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new")//Creating new Control
    {
        layoutgrid.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            table: { "position": "absolute", "width": "750", "height": "125", "parenttdwidth": "160px","columns": 3, "rows": 2, "BorderColor": "#000000", "BorderStyle": "dashed", "BorderWidth": "1" },
            td: '<tr><td style="width: 160px;"></td><td style="width: 160px;"></td><td style="width: 160px;"></td></tr><tr><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td></tr><tr><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td><td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td></tr>',
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = layoutgrid.byId(layoutgrid, Controlid);
        $("#layoutrows").unbind("change");
        $("#layoutcols").unbind("change");
        $("#gridcolspan").unbind("change");
        $("#gridrowspan").unbind("change");
        $("#gridrowspan").unbind("change");
        $("#seldivwidth").unbind("change");
        $("#seldivheight").unbind("change");
        $("#cellpadding").unbind("change");
        $("#alignelement").unbind("change");

        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem);
    }
    else {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        //unbind events
        $("#layoutrows").unbind("change");
        $("#layoutcols").unbind("change");
        $("#gridcolspan").unbind("change");
        $("#gridrowspan").unbind("change");
        $("#gridrowspan").unbind("change");
        $("#seldivwidth").unbind("change");
        $("#seldivheight").unbind("change");
        $("#cellpadding").unbind("change");
        $("#alignelement").unbind("change");
    }



    //.....................insert row below.....................//

    $("#layoutrows").change(function () {        
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        var val = $(this).val();
        var Columnindex = $tableobj.find('.tdActive').index();
        var tablerowindex = $tableobj.find('.tdActive').parent().index();
        if (val < parseInt($(this).attr("data-row"))) {
            //decrement
            $tableobj.find("tbody tr:eq(" + tablerowindex + ")").remove();
        }
        else {
            //increment       
            var max = 0;
            $tableobj.find("tr").each(function (index, value) {
                $this = $(this).find('td').length;
                if ($this > max) max = $this;
            });
            var countcols = max;
            var html = '<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>';
            var newRow = "";
            while (countcols > 0) {
                newRow = newRow + html;
                --countcols;
            }
            var rowspan = $tableobj.find('.tdActive').attr("rowspan");
            if (rowspan == null) {
                $("<tr>" + newRow + "</tr>").insertAfter($tableobj.find('tr').eq(tablerowindex));
            }
            else {
                var rindex = (tablerowindex + parseInt(rowspan)) - 1;
                $("<tr>" + newRow + "</tr>").insertAfter($tableobj.find('tr').eq(rindex));
            }


        }
        $(this).attr("data-row", val);
        tableprp.rows = val;
        selecteditem.unset("table", { silent: true });
        selecteditem.set({ table: tableprp }, { silent: true });
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });

    //............................insert row below ends.....................//



    //............................insert column after .....................//

    $("#layoutcols").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        var val = $(this).val();
        var Columnindex = $tableobj.find('.tdActive').index();
        var tablerowindex = $tableobj.find('.tdActive').parent().index();
        if (val < parseInt($(this).attr("data-column"))) {
            //decrement
            $tableobj.find("tr").each(function (e1, row) {
                var i = 0;
                $(row).find('td').each(function (e2, cell) {
                    if (i == tablerowindex) {
                        row.removeChild(cell);
                    }
                    i++;
                });
            });
        }
        else {
            //cols increment
            var Columnindex = $tableobj.find('.tdActive').index();
            var tablerowindex = $tableobj.find('.tdActive').parent().index();
            $tableobj.find('tr').each(function (index) {
                if (index == 0) {
                    $(this).find('td').eq(Columnindex).after('<td style="width: 160px;"></td>');
                } else {
                    $(this).find('td').eq(Columnindex).after('<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>');
                }
            });
        }
        $(this).attr("data-column", val);
        tableprp.columns = val;
        selecteditem.unset("table", { silent: true });
        selecteditem.set({ table: tableprp }, { silent: true });
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });

    //............................insert column below ends.....................//

    //............................col span change function.....................//

    $("#gridcolspan").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        var val = parseInt($(this).val());
        if (val == 1) {
            $(this).val(1)
            $(this).attr("data-colspan", 1);
            return false;
        }
        else {
            if (val < parseInt($(this).attr("data-colspan"))) {
                //decrement
                var Columnindex = $tableobj.find('.tdActive').index();
                var tablerowindex = $tableobj.find('.tdActive').parent().index();
                var rowspancount = parseInt($("#gridcolspan").val());
                var colspan = $tableobj.find('.tdActive').attr("colspan");
                if (typeof colspan == "undefined") {
                    $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).attr('colspan', $("#gridcolspan").val());
                    $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).after('<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>');
                }
                else {
                    var tdstr = "";
                    for (var cs = 0; cs < parseInt(colspan) ; cs++) {
                        tdstr += '<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>';
                    }
                    $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).attr('colspan', $("#gridcolspan").val());
                    $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).after('<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>');
                }
                $(this).attr("data-colspan", parseInt(val) + 1);
                return false;

            } else {

                //increment  
                if ($tableobj.find('.tdActive').parent().find('td').length == 1) {
                    $(this).val(parseInt(val) - 1);
                    return false;
                }
                else {
                    var Columnindex = $tableobj.find('.tdActive').index();
                    var tablerowindex = $tableobj.find('.tdActive').parent().index();
                    var rowspancount = parseInt($("#gridcolspan").val());
                    $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).attr('colspan', $("#gridcolspan").val());
                    var rowspan = $tableobj.find('.tdActive').attr("rowspan");
                    if (typeof rowspan == "undefined") {
                        $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).next().remove();
                    }
                    else {
                        for (var i = 0; i < parseInt(rowspan) ; i++) {
                            if (typeof $tableobj.find('tr:eq(' + (tablerowindex + i) + ')').find('td').eq(Columnindex).next().html() != "undefined")
                                $tableobj.find('tr:eq(' + (tablerowindex + i) + ')').find('td').eq(Columnindex).next().remove();
                            else {

                                if (typeof $tableobj.find('tr:eq(' + (tablerowindex + i) + ')').html() != "undefined")
                                    $tableobj.find('tr:eq(' + (tablerowindex + i) + ')').remove();
                                else
                                    $tableobj.find('tr:eq(' + (tablerowindex) + ')').remove();
                            }
                        }
                    }

                }
            }
            $(this).attr("data-colspan", val);
            updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
        }
    });

    //............................col span change function ends.....................//

    //............................row span change function ......................//

    $("#gridrowspan").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        var val = parseInt($(this).val());
        if (val == 1) {
            $(this).val(1)
            $(this).attr("data-rowspan", 1);
            return false;
        }
        if (val < parseInt($(this).attr("data-rowspan"))) {
            //decrement
            var Columnindex = $tableobj.find('.tdActive').index();
            var tablerowindex = $tableobj.find('.tdActive').parent().index();
            var rowspancount = parseInt($("#gridrowspan").val());
            var colspan = $tableobj.find('.tdActive').attr("colspan");
            var tdstr = "";
            if (typeof colspan == "undefined") {
                tdstr = '<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>';
                $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount)) + ')').find('td').eq(Columnindex).before(tdstr);
            }
            else {
                for (var cs = 0; cs < parseInt(colspan) ; cs++) {
                    tdstr += '<td style="height: 56px;" drop-region="layout" class="drop-target" ><div style="margin: 5px; height: 44px;" data-margin="5px" class="layout-cell"></div></td>';
                }
                if (typeof $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount)) + ')').find('td').eq(Columnindex).html() == "undefined") {
                    var i = 0;
                    $tableobj.find('tr').each(function (j) {

                        if ($(this).find('td').length == 0) {
                            i = j;
                        }
                    });
                    if (i != 0) {
                        $tableobj.find('tr:eq(' + i + ')').html(tdstr);
                    }
                    else {
                        $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount)) + ')').html($tableobj.find('tr:eq(' + (tablerowindex + (rowspancount)) + ')').html() + tdstr);
                    }
                }
                else {
                    $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount)) + ')').find('td').eq(Columnindex).before(tdstr);
                }
            }

            $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).attr('rowspan', $("#gridrowspan").val());


        } else {
            //increment         
            if ($tableobj.find('.tdActive').parent().siblings('tr').length < (parseInt(val))) {
                $(this).val(parseInt(val) - 1);
                $(this).attr("data-rowspan", parseInt(val) - 1);
                return;
            }
            var Columnindex = $tableobj.find('.tdActive').index();
            var tablerowindex = $tableobj.find('.tdActive').parent().index();
            var rowspancount = parseInt($("#gridrowspan").val());
            var rowCount = $tableobj.find('tr').length;
            $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).attr('rowspan', $("#gridrowspan").val());
            //alert($tableobj.find('.tdActive').attr("colspan"));
            if ($tableobj.find('.tdActive').attr("colspan") != null) {
                if (typeof $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount - 1)) + ')').find('td').attr("colspan") == "undefined") {
                    for (var i = 0; i < parseInt($tableobj.find('.tdActive').attr("colspan")) ; i++) {
                        $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount - 1)) + ')').find('td').eq(Columnindex).remove();
                    }
                }
                else {
                    $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount - 1)) + ')').find('td').eq(Columnindex).remove();
                }
            }
            else {

                $tableobj.find('tr:eq(' + (tablerowindex + (rowspancount - 1)) + ')').find('td').eq(Columnindex).remove();
            }
        }
        $(this).attr("data-rowspan", val);
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });

    //............................row span change function ends.....................//

    //............................celldivwidth change function ......................//

    $("#seldivwidth").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));

        var Columnindex = $tableobj.find('.tdActive').index();
        var tablerowindex = $tableobj.find('.tdActive').parent().index();

        var width = $("#seldivwidth").val();
        if (width.indexOf("%") != -1) {
            var target = selecteditem.get("target");
            var $targetref;
            if (selecteditem.get("type") != "widget") {
                if (target != null) {
                    $targetref = $(document.getElementById(target.split("@")[0])).find('tr:eq(' + target.split("@")[1] + ')').find('td').eq(target.split("@")[2]).find('.layout-cell');
                }
            }
            else {
                $targetref = $(document.getElementById(target)).find('.widget-body');
            }
            width = parseFloat(width.replace("%", ""));
            width = ((($targetref.width() * width)) / 100);
        }
        if (Columnindex != "-1") {
            // $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(Columnindex).css({ "width": $("#seldivwidth").val() });
            $tableobj.find('tr:eq(0)').find('td').eq(Columnindex).css({ "width": width });
            $tableobj.find('tr:eq(0)').find('td').eq(Columnindex).attr("data-tdwidth", $("#seldivwidth").val());
        }
        var totalwidh = 0;
        $tableobj.find('tr:eq(0)').find('td').each(function () {
            if ($(this).attr("data-tdwidth") != null) {
                width = $(this).attr("data-tdwidth");
                if (width.indexOf("%") != -1) {
                    width = parseFloat(width.replace("%", ""));
                    width = ((($targetref.width() * width)) / 100);
                }
                else {
                    width = parseInt($(this).attr("data-tdwidth"));
                }
            }
            else {
                width = $(this).width();
            }
            totalwidh += width;
        });
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem);
        $tableobj.parent().parent().width(totalwidh);
    });

    //............................celldivwidth change function ends ......................//

    //............................celldivheight change function ......................//

    $("#seldivheight").change(function () {

        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));

        var Columnindex = $tableobj.find('.tdActive').index();
        var tablerowindex = $tableobj.find('.tdActive').parent().index();
        if (Columnindex != "-1") {
            var max = 0;
            $tableobj.find("tr").each(function (index, value) {
                $this = $(this).find('td').length;
                if ($this > max) max = $this;
            });
            var countcols = max - 1;
            var newRow = "";
            while (countcols >= 0) {
                $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(countcols).css({ "height": parseInt($("#seldivheight").val()) + "px" });
                $tableobj.find('tr:eq(' + tablerowindex + ')').find('td').eq(countcols).find('div').css({ "height": parseInt($("#seldivheight").val()) + "px" });
                --countcols;
            }
        }
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });


    //............................celldivheight change function ends......................//

    //............................cellpadding span change function ......................//

    $("#cellpadding").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        $tableobj.find('.tdActive').find('.layout-cell').attr("data-margin", parseInt($("#cellpadding").val()) + "px");
        $tableobj.find('.tdActive').find('.layout-cell').css("margin", parseInt($("#cellpadding").val()) + "px");
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });

    //............................cellpadding change function ends......................//

    //............................cellalignment change function ......................//

    $("#alignelement").change(function () {
        selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
        var tableprp = selecteditem.get("table");
        var $tableobj = $(document.getElementById(selecteditem.get("id")));
        $tableobj.find('.tdActive').find('.layout-cell').css({ "vertical-align": $("#alignelement").val() });
        updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem)
    });



}



//............................selected div function ends .....................//



//............................function to update model td .....................//

function updategridcells($scope, $location, $http, $compile, left, top, dropeditem, controlid, selecteditem) {

    $tbl = $(document.getElementById(selecteditem.get("id"))).find("tbody");
    var tdarray = [];   
    var $tblref = $(document.getElementById($("#settingsmenu").attr("data-controlid"))).find('tr:eq(0)').find('td');
    initDroppable($(".layout-cell")); 
    function initDroppable($elements) {
        $elements.droppable({
            hoverClass: "ui-drop-hover",
            accept: ".ui-draggable-bi",
            greedy: true,
            over: function (event, ui) {
                var $this = $(this);              
                if (dropeditem == "layoutgrid") {
                   // alert("layout");
                    $("#settingsmenu").attr("data-controlid", $this.parent().parent().parent().parent().attr("id"));
                    selecteditem = layoutgrid.byId(layoutgrid, $scope.view.getSelected().controlid);
                }               
            },
            drop: function (event, ui) {               
                var dropeditem = ui.draggable.attr("id");
                var $this = $(this);
                if ($this.children().length == 1) {
                    replacecontrol($this.data("data-controlid"), $this.data("data-controltype"))
                }             
                var target = $this.parent().parent().parent().parent().attr("id") + "@" + $this.parent().parent().index() + "@" + $this.parent().index();
                switch (dropeditem) {
                    //chart logic go's here..........
                    case "chart":
                        envchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //table logic go's here..................
                    case "table":                      
                        envtable($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //text logic go's here..................
                    case "text":
                        envText($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                    case "Progressbar":
                        envprogressbar($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //text box logic go's here..................
                    case "textbox":
                        envtxtbox($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //dropdown logic go's here..................
                    case "dropdown":
                        envdropdown($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //valuepair logic go's here..................
                    case "valuepair":
                        envvaluepair($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //serverchart logic go's here..................
                    case "serverchart":
                        envserverchart($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //list logic go's here..................
                    case "Gage":
                      
                        envGage($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                    case "metergauge":

                        envmetergauge($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //radio button logic go's here..................
                    case "radio":
                        envradio($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //checkbox logic go's here..................
                    case "htmltemplate":
                        envhtmltag($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //checkbox logic go's here..................
                    case "checkbox":
                        alert("checkbox");
                        break;
                        //image  logic go's here..................
                    case "image":
                        envimage($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                    case "pivottable":
                        envpivottable($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;
                        //tabgrid  logic go's here..................
                    case "layoutgrid":                      
                        // alert("tabgrid");                       
                        envlayoutgrid($scope, $location, $http, $compile, event.pageX, event.pageY, dropeditem, "new", target);
                        break;

                    default:
                        //  alert("Coming Soon.......");
                        break;
                }
            }
        });
    }

    selecteditem.unset("td", { silent: true });
    selecteditem.set({ td: $tbl.html() });
    tdclick(selecteditem.get("id"));

}
function replacecontrol(id, type) {
   
    switch (type) {
        case "chart":
            var removeditem = bichart.byId(bichart, id);
            bichart.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().remove();
            break;
        case "text":
            var removeditem = text.byId(text, id);
            text.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();
            break;
        case "Progressbar":
            var removeditem = Progressbar.byId(Progressbar, id);
            Progressbar.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();
            break;
        case "layoutgrid":
            var removeditem = layoutgrid.byId(layoutgrid, id);
            layoutgrid.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();

            break;
        case "textbox":
            var removeditem = textbox.byId(textbox, id);
            textbox.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();

            break;
        case "table":
            var removeditem = table.byId(textbox, id);
            table.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();
            break;
        case "htmltemplate":
            var removeditem = htmltag.byId(htmltag, id);
            htmltag.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();
            break;
        case "Gage":
            var removeditem = Gagetag.byId(Gagetag, id);
            Gagetag.remove(removeditem);
            var Gageobj = document.getElementById(id);
            $(Gageobj).parent().parent().remove();
            break;
        case "dropdown":
            var removeditem = table.byId(textbox, id);
            table.remove(removeditem);
            var htmlobj = document.getElementById(id);
            $(htmlobj).parent().parent().remove();

            break;
        default:
            break;
    }
}

//............................function to update model td ends.....................//
function opendataset() {
    ShowModalPopup('servicedata');
}

function paramsdelete() {
    var lb = document.getElementById("paramsofservice");
    if (lb.value == "") {
    }
    for (var i = 0; i < lb.options.length; i++)
        if (lb.options[i].selected)
            lb.remove(i);
    return false;
}

function pramsedit() {
    var lb = document.getElementById("paramsofservice");
    if (lb.value == "") {
        return false;
    }
    var dtext = $('#paramsofservice').find('option:selected').text().split(',');
    $("#paramsname").val(dtext[0]);
    $("#pramvlues").val($('#paramsofservice').find('option:selected').val());
}

function addprams() {
    if ($("#paramsname").val() == "") {
        alert("Parameter Name Can not be Empty");
        return false;
    }
    var strform = $("#paramsname").val() + "," + $("#pramvlues").val();
    var op = new Option(strform, $("#pramvlues").val());
    paramsdelete();
    document.getElementById("paramsofservice").options.add(op);
    $("#paramsname").val("");
    $("#pramvlues").val("");
}

function raddprams() {
    var strform = $("#rparam").val() + "," + $("#rparamvalue").val();
    var op = new Option(strform, $("#rparamvalue").val());
    rparamsdelete();
    document.getElementById("Select12").options.add(op);
    $("#rparam").val("");
    $("#rparamvalue").val("");
}

function rpramsedit() {
    var lb = document.getElementById("Select12");
    if (lb.value == "") {
        alert(' Select Data (or) No Data There ..!');
        return false;
    }
    var dtext = $('#Select12').find('option:selected').text().split(',')
    $("#rparam").val(dtext[0]);
    $("#rparamvalue").val($('#Select12').find('option:selected').val());
}

function rparamsdelete() {
    var lb = document.getElementById("Select12");
    if (lb.value == "") {
    }
    for (var i = 0; i < lb.options.length; i++)
        if (lb.options[i].selected)
            lb.remove(i);
    return false;
}

//get data from service
function getdatafromservice() {
    var obj = {};
    $("#paramsofservice option").each(function (i, op) {
        var dtext = $(op).text().split(',')
        obj[dtext[0]] = $(op).val();
    });
    var surl = $("#surl").val();
    var method = $("#smethod option:selected").text();
    $('#selectableTb li').remove();
    var listTB = document.getElementById("selectableTb");
    $.ajax({
        type: 'POST',
        url: '../../Reporting/getxml',
        data: { url: surl, method: method, param: JSON.stringify(obj) },
        async: false,
        success: function (json) {
            if (json.errorresult) {
                alert(json.errorresult);
            }
            else {
                $("#leftcolumn").html(json.tablecoulumns);
                $("#h").hide();
                $("#divdata").hide();
                $("#divdata").html("<br>" + json.tabledata);
            }
        },
        error: function () {
        }
    });
    $("#tables").show();
}

function showdata() {
    $("#divdata").show();
    $("#h").show();
}

function hidedata() {
    $("#divdata").hide();
    $("#h").hide();
}

function finish() {
    var rn = prompt("Enter Dataset Name", parseInt(Math.random() * 454566));
    if (rn) {
        $("#datasetlist").append("<div id='" + rn + "'></div>");
        var node = document.getElementById(rn);
        var obj = {};
        $("#paramsofservice option").each(function (i, op) {
            var dtext = $(op).text().split(',')
            obj[dtext[0]] = $(op).val();
        });
        $(node).data('headerSettings', {
            url: $("#surl").val(),
            method: $("#smethod").val(),
            params: obj
        });
        $(node).append("<div class='box'>" + rn + "</div>");
        $(node).append("<ul id='" + rn + "_coulms'>" + $("#column_names").html() + "</ul><br>");



        $('#filterTxt').keyup(function () {

            var searchText = $(this).val();

            $('ul > li').each(function () {

                var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;

                $(this).toggle(showCurrentLi);

            });
        });


        $("#" + rn + "_coulms").find('li').draggable({
            cursor: 'move',
            revert: true,
            helper: "clone",
            start: function (event, ui) {
                $(this).fadeTo('fast', 0.5);
            },
            stop: function (event, ui) {
                $(this).fadeTo(0, 1);
            }
        });
    }
    $("#imgclose").click();
}
//end of service

function trtbltextchange(key) {

    var rowindex = $("#tbltextfocus").attr('data-datafocus');
    if (key == "changeclass") {
        var rn = $("#tbllblid").val();


        var d = $("#" + rowindex + "").parent().parent().parent().parent().attr("id");

        var colindex = $("#" + rowindex + "").parent().index();
        $("#" + d + " tr").each(function (e, row) {
            var i = 0;
            $(row).find('td, th').each(function (e, cell) {
                if (i == colindex) {
                    $(this).attr("class", $("#addclass").val());
                }
                i++;
            });
        });
    }
    else if (key == "changecolumnclass") {
        var tblref = $("#tbllblid").val();
        var tblcell = $("#" + tblref + "").parent().index();
        var rowtds = $("#" + tblref + "").parent().parent();
        $(rowtds).find('td').each(function () {
            if ($(this).index() >= tblcell) {
                $(this).attr("class", $("#addcolclass").val());
            }
        });
    }
    else {
        $("#" + rowindex + "").parent().parent().find('td').each(function () {
            if (key == "backcolor") {
                $(this).css("background-color", "" + $("#tblbackcolor").val() + "");
                $(this).find('input').css("background-color", "" + $("#tblbackcolor").val() + "");
            }
            if (key == "forecolor") {
                $(this).css("color", "" + $("#tblforecolor").val() + "");
                $(this).find('input').css("color", "" + $("#tblforecolor").val() + "");
            }
            if (key == "talign") {
                $(this).css("text-align", "" + $("#tbltxtalign").val() + "");
                $(this).find('input').css("text-align", "" + $("#tbltxtalign").val() + "");
            }


            if (key == "fweight") {
                $(this).css("font-weight", "" + $("#tblfont").val() + "");
                $(this).find('input').css("font-weight", "" + $("#tblfont").val() + "");
            }

            if (key == "fsize") {
                $(this).css("font-size", "" + $("#tbllblfontsize").val() + "px");
                $(this).find('input').css("font-size", "" + $("#tbllblfontsize").val() + "px");
            }
            if (key == "twidth") {
                $(this).css("width", "" + $("#tblcellwidth").val());
                // $(this).css("min-width", "" + $("#tblcellwidth").val());
            }



        });
    }
}

//table operations
function addrow(id) {
    var rowindex = $("#tbltextfocus").attr('data-datafocus');
    var html = null;
    var max = 0;
    $("#" + id + " tr").each(function (index, value) {
        $this = $(this).find('td').length;
        if ($this > max) max = $this;
    });
    for (var i = 0; i < max; i++) {
        html += "<td><input type='text'  class='tdtext'  id='txt" + parseInt(Math.random() * 9379566) + "'/></td>";
    }
    if (html != null) {
        if (rowindex != null) {
            if ($("#" + rowindex + "").parent().parent().is("tr")) {
                $("<tr>" + html + "</tr>").insertAfter($("#" + rowindex + "").parent().parent());
            }
            else {
                $("#" + id + " > tbody:last").append("<tr>" + html + "</tr>");
            }
        }
        else {
            $("#" + id + " > tbody:last").append("<tr>" + html + "</tr>");
        }
        var rn = id;
        $("#tbltextfocus").attr("data-datafocus", null);
        $('.table-editor input').css("border", "none");
        $('#' + rn + ' tr td').each(function () {
            var txtctrl = $(this).children();
            //            $(txtctrl).droppable({
            //                hoverClass: 'active',
            //                drop: function (event, ui) {
            //                    var datatableinfo = ui.draggable.parent().parent().attr("id");
            //                    $(this).parent().attr("data-datainfonode", datatableinfo);
            //                    this.value = this.value + "#" + $(ui.draggable).text() + "#";
            //                }
            //            });
            $(txtctrl).focus(function () {
                $("#tbltextfocus").attr("data-datafocus", $(this).attr("id"));
                $('.table-editor input').css("border", "none");
                $(this).css("border", "2px solid #9ACD32");
            });
        });
    }
}

function deleterow(rn) {
    var rowindex = $("#tbltextfocus").attr('data-datafocus');
    $("#" + rowindex + "").parent().parent().remove();
}

function addcoulmn(rn) {
    var $tablerow = $('#' + rn + '').find('tr');
    count = 0;
    var rowindex = $("#tbltextfocus").attr('data-datafocus');
    if (typeof $("#tbltextfocus").attr('data-datafocus') != 'undefined') {
        var colindex = $("#" + rowindex + "").parent().index();
        $('#' + rn + '').find('tr').each(function () {
            $(this).find('td').eq(colindex).after("<td><input type='text'  class='tdtext'  id='txt" + parseInt(Math.random() * 77899566) + "'/></td>");
        });
    }
    else {
        $tablerow.each(function (index, value) {
            count += 1;
            var $listitem = $(this);
            n = parseInt($listitem.index());

            if (n == 0)
                var $newRow = $("<td><input type='text'  class='tdtext'  value='Column" + (parseInt($("#" + rn + " tr:eq(0) td").length) + 1) + "'  id='txt" + parseInt(Math.random() * 279566) + "'/></td>");
            else
                var $newRow = $("<td><input type='text'  class='tdtext'  id='txt" + parseInt(Math.random() * 77899566) + "'/></td>");

            $("#" + rn + " tr:eq(" + n + ")").append($newRow);

        });
    }
    $('#' + rn + ' tr td').each(function () {
        var txtctrl = $(this).children();
        //            $(txtctrl).droppable({
        //                hoverClass: 'active',
        //                drop: function (event, ui) {
        //                    var datatableinfo = ui.draggable.parent().parent().attr("id");
        //                    $(this).parent().attr("data-datainfonode", datatableinfo);
        //                    this.value = this.value + "#" + $(ui.draggable).text() + "#";
        //                }
        //            });
        $(txtctrl).focus(function () {
            $("#tbltextfocus").attr("data-datafocus", $(this).attr("id"));
            $('.table-editor input').css("border", "none");
            $(this).css("border", "2px solid #9ACD32");
        });
    });
    resize();
}

function deletecolumn(rn) {
    if (typeof $("#tbltextfocus").attr('data-datafocus') != 'undefined') {
        var rowindex = $("#tbltextfocus").attr('data-datafocus');
        var colindex = $("#" + rowindex + "").parent().index();
        $("#" + rn + " tr").each(function (e, row) {
            var i = 0;
            $(row).find('td, th').each(function (e, cell) {
                if (i == colindex) {
                    row.removeChild(cell);
                }
                i++;
            });
        });
    }
    else {
        var allRows = document.getElementById(rn).rows;
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].deleteCell(-1); //delete the cell       
        }
    }
}

//table properties
function tbltextproperties(rn) {
    $("#tblTextPoperties").dialog({ title: "Text Settings", width: "700px", position: ['top', 150] }).css("overflow", "hidden");
    $(".ui-dialog-buttonset").find('button').attr("class", "btn-success");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $(".ui-widget").css("font-size", "12px");
    $("#tblTextPoperties").width("100%");
    if ($("#tbltextfocus").attr("data-datafocus") == "tblTextPoperties") {
        return false;
    }
    $("#tbllblid").val($("#tbltextfocus").attr("data-datafocus"));
    var id = document.getElementById($("#tbllblid").val());
    $('#tbllblfontsize').val(parseInt($(id).css('font-size').replace("px", "")));
    $("#tbllabeltext").val($(id).val());
    $("#tbltxtalign").val($(id).css("text-align"));
    if (parseInt($(id).css("font-weight")) < 401) {
        $("#tblfont").val("normal");
    }
    else if (parseInt($(id).css("font-weight")) > 401) {
        $("#tblfont").val("bold");
    }
    else if (parseInt($(id).css("font-weight")) > 750) {
        $("#tblfont").val("bolder");
    }
    $("#tblbackcolor").val(chexc($(id).css('background-color')));
    $("#tblforecolor").val(chexc($(id).css('color')));
    $("#tblbackcolor").css('background-color', "#" + $("#tblbackcolor").val());
    $("#tblforecolor").css('background-color', "#" + $("#tblforecolor").val());
    $("#tblcellwidth").val($(id).css('width'));
    $("#addclass").val($(id).parent().attr("class"));
    $("#addcolclass").val($(id).parent().attr("class"));
}


function chexc(colorval) {
    var color = '';
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
}

function enableresize() {
    $(".table-editor").css("width", "auto");
}

function tbltextchange() {
    var id = document.getElementById($("#tbltextfocus").attr("data-datafocus"));
    $(id).css('font-size', $("#tbllblfontsize").val() + "px");
    $(id).parent().css('font-size', $("#tbllblfontsize").val() + "px");
    $(id).css('background-color', $("#tblbackcolor").val());
    $(id).css('color', $("#tblforecolor").val());
    $(id).parent().css('background-color', $("#tblbackcolor").val());
    $(id).parent().css('color', $("#tblforecolor").val());
    $(id).val($("#tbllabeltext").val());
    $(id).css('text-align', $("#tbltxtalign").val());
    $(id).css('font-weight', $("#tblfont").val());
    $(id).parent().css('text-align', $("#tbltxtalign").val());
    $(id).parent().css('font-weight', $("#tblfont").val());
    $(id).parent().css('width', $("#tblcellwidth").val());
}

function tbltextidchange() {
    var id = document.getElementById($("#tbltextfocus").attr("data-datafocus"));
    if ($('#' + $("#tbllblid").val() + '').length) {
        alert("This ID Already  Exists");
        $("#tbllblid").val($(id).attr("id"));
    }
    else {
        $(id).attr("id", $("#tbllblid").val());
        $("#tbltextfocus").attr("data-datafocus", $("#tbllblid").val());
    }
}

//drg and rop logic
$(function () {
    $(".drag").draggable({ revert: true, helper: "clone" });
    $(document).bind("click", function (event) {
        $("div.custom-menu").hide();
    });
    $("#droppable").droppable({
        accept: ".drag",
        drop: function (event, ui) {
            var s = ui.draggable.attr("id");
            var imgsrc = ui.draggable.attr("src")
            var currentPos = ui.helper.position();
            var left = ((event.pageX) - 23);
            var top = ((event.pageY))
            switch (s) {
                case "ischart":
                    $.ajax({
                        url: '../../Reporting/getchartfiles',
                        type: 'POST',
                        success: function (result) {
                            var rn = parseInt(Math.random() * 4554566);
                            $("#droppable").append('<div id="' + rn + '" class="dragchart" style=" border: 3px solid #99BBE8;width:300px;height:250px;padding-left:10px;padding-top:10px"><div id="' + rn + 'div">' + result + '<hr/><a href="javascript:loadchartreport(' + rn + ')"  style="padding: 5px;">Select Chart</a><hr/><a href="javascript:openchart()" style="padding: 5px;">Create New Chart</a></div></div>');
                            $("#" + rn + "").css({ top: top + "px", left: left + "px", position: "absolute" });
                            chartmenu(document.getElementById(rn));
                            $("#" + rn + "").resizable({
                                minHeight: 150,
                                minWidth: 200,
                                stop: function (event, ui) {
                                    loadchartreport(rn);
                                }
                            });
                            $("#" + rn + "").draggable({ containment: "body" });

                        }
                    });
                    break;
                case "isimage":
                    var rn = prompt("Enter Textbox ID", parseInt(Math.random() * 454566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!")
                            return false;
                        }
                        $("#droppable").append('<div><img src="../../RdlcAssists/logo.png"  id="' + rn + '"  style="width:300px;height:150px;"  class="dragimg"  /></div>');
                        $("#" + rn + "").parent().css({ top: top + "px", left: left + "px", position: "absolute", "padding": "10px" });
                        imgmenu(document.getElementById(rn));
                        $("#" + rn + "").parent().resizable({
                            helper: "ui-resizable-helper",
                            stop: function (event, ui) {
                                $("#" + rn + "").width(ui.size.width);
                                $("#" + rn + "").height(ui.size.height);
                                $(this).width(ui.size.width + 10);
                            }
                        });
                        $("#" + rn + "").parent().draggable({ containment: "body" });

                    }
                    break;
                case "islabel":
                    var rn = prompt("Enter Textbox ID", parseInt(Math.random() * 454566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn + "txt");
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!");
                            break;
                            return false;
                        }
                        else {
                            $("#droppable").append('<div><textarea  class="dragn" type="text" id="' + rn + 'txt"  >Text</textarea></div>');
                            $("#" + rn + "txt").parent().css({ top: top + "px", left: left + "px", position: "absolute", "padding": "10px" });
                            $("#" + rn + "txt").parent().draggable();
                            $("#" + rn + "txt").attr('data-isparagraph', "FALSE");
                            $("#" + rn + "txt").attr('data-isdate', "FALSE");
                            $("#" + rn + "txt").parent().hover(
                         function () {
                             $(this).css({ "background": "gray", "cursor": "move", "padding": "10px", "padding-bottom": "5px" });
                         }, function () {
                             $(this).css("background", "white");
                         }
                             );
                            $("#" + rn + "txt").droppable({
                                hoverClass: 'active',
                                drop: function (event, ui) {
                                    var datatableinfo = ui.draggable.parent().parent().attr("id");
                                    $("#" + rn + "txt").data('datanode', datatableinfo);
                                    this.value = this.value + "#" + $(ui.draggable).text() + "#";
                                }
                            });
                            lblmenu(document.getElementById(rn + 'txt'));
                        }
                        break;
                    }
                    else {
                        return false;
                    }
                case "istable":
                    var rn = prompt("Enter Table id", parseInt(Math.random() * 459566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!")
                            return false;
                        }
                        else {
                            var tblstring = "<table class='table-editor' id='" + rn + "' >";
                            tblstring += "<thead> </thead>";
                            tblstring += "<tbody>";
                            tblstring += "<tr class='highlighted-row'>";
                            tblstring += "<td><input type='text' class='tdtext' value='column1' id='txt" + parseInt(Math.random() * 779566) + "'/></td>";
                            tblstring += "<td><input type='text' class='tdtext' value='column2' id='txt" + parseInt(Math.random() * 76951213) + "'/></td>";
                            tblstring += "<td><input type='text' class='tdtext' value='column3' id='txt" + parseInt(Math.random() * 344343) + "'/></td>";
                            tblstring += "<td><input type='text'  class='tdtext' value='column4' id='txt" + parseInt(Math.random() * 59566) + "'/></td>";

                            tblstring += "<tr>";
                            tblstring += "<td><input type='text'  class='tdtext'   id='txt" + parseInt(Math.random() * 779566) + "'/></td>";
                            tblstring += "<td><input type='text'  class='tdtext'  id='txt" + parseInt(Math.random() * 477666) + "'/></td>";
                            tblstring += "<td><input type='text'  class='tdtext'   id='txt" + parseInt(Math.random() * 776766) + "'/></td>";
                            tblstring += "<td><input type='text'   class='tdtext'   id='txt" + parseInt(Math.random() * 179566) + "'/></td>";
                            tblstring += "</tr>";
                            tblstring += "</tbody>";
                            tblstring += "</table>";

                            $("#droppable").append(tblstring);
                            resize();

                            $("#" + rn).draggable();
                            $("#" + rn).resizable();
                            $("#" + rn).append("<div class='tblhelpbtn' style='float:left;width:auto;'><button class='btn-success' style='height:30px;'  onclick='addrow(" + rn + ")'>New Row</button>&nbsp;&nbsp;<button class='btn-success' style='height:30px;' id='Add' onclick='clonerow(" + rn + ")'>Clone Row</button></div><br/>");
                            tblmenu(document.getElementById(rn));
                            $("#" + rn).css({ top: top, left: left + "px", position: "absolute" });
                            $('#' + rn + ' tr td').each(function () {
                                var txtctrl = $(this).children();
                                $(txtctrl).focus(function () {
                                    $("#tbltextfocus").attr("data-datafocus", $(this).attr("id"));
                                });
                            });
                        }
                        break;
                    }
                    else {
                        return false;
                    }
                default:
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 354566));
                    if (rn) {

                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!")
                            return false;
                        }
                        $("#droppable").append('<img src="' + imgsrc + '" class="dragn" id="' + rn + '"  />');
                        $(".dragn").draggable();
                        $("#" + rn + "").css({ top: ((event.pageY) - 9) + "px", left: ((event.pageX) - 15) + "px", position: "absolute" });
                        break;
                    }
                    else {
                        return false;
                    }
            }

        }
    });
});
//cloning of selected row
function clonerow(rn) {

    var tobj = document.getElementById(rn);
    var rowindex = $("#tbltextfocus").attr('data-datafocus');
    var $clone;
    if (rowindex != null) {
        if ($("#" + rowindex + "").parent().parent().is("tr")) {
            $clone = $("#" + rowindex + "").parent().parent().clone();
        }
        else {
            $clone = $("#" + rn + " tbody tr:last").clone();
        }
    }
    else {
        $clone = $("#" + rn + " tbody tr:last").clone();

    }
    $clone.attr({
        id: "txt" + parseInt(Math.random() * 77956566)
    });

    $clone.find("input").each(function () {
        $(this).attr({
            id: "txt" + parseInt(Math.random() * 779556566)
        });
    });

    $("#" + rn + " tbody").append($clone);
    $('.table-editor input').css("border", "none");
    $("#tbltextfocus").attr("data-datafocus", null);
    $('#' + rn + ' tr td').each(function () {
        var txtctrl = $(this).children();
        $(txtctrl).focus(function () {
            $("#tbltextfocus").attr("data-datafocus", $(this).attr("id"));
            $('.table-editor input').css("border", "none");
            $(this).css("border", "2px solid #9ACD32");
        });
    });


    resize();
}

function resize() {
    //    //col resize
    //    var pressed = false;
    //    var start = undefined;
    //    var startX, startWidth;
    //    var indexx;
    //    $("table td").mousedown(function (e) {
    //        indexx = $(this).index();



    //        start = $(this);
    //        pressed = true;
    //        startX = e.pageX;
    //        startWidth = $(this).width();
    //        //        $("table tr td:nth-child(" + parseInt(($(this).index() + 1)) + ")").each(function () {
    //        //            $(this).width("auto");
    //        //        });
    //    });

    //    $(document).mousemove(function (e) {

    //        if (pressed) {
    //            $(start).width(startWidth + (e.pageX - startX));
    //        }
    //    });

    //    $(document).mouseup(function () {
    //        if (pressed) {
    //            pressed = false;
    //            //            $("table tr td:nth-child(" + parseInt(($(this).index() + 1)) + ")").each(function () {
    //            //                $(this).width($(this).css("width"));
    //            //            });

    //        }
    //    });
}

//assigning textbox properties to text editor
function textProperties(id) {
    $("#TextPoperties").dialog({ title: "Label Settings", width: "500px", position: ['top', 150] }).css("overflow", "hidden");
    $(".ui-dialog-buttonset").find('button').attr("class", "btn-success");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $(".ui-widget").css("font-size", "12px");
    $("#TextPoperties").width("100%");
    $("#lblid").val(id);
    $("#labeltext").val($("#" + id + "").val());
    $('#lblfontsize').val(parseInt($("#" + id + "").css('font-size').replace("px", "")));
    // $('#lblwidth :selected').text($("#" + id + "").css('font-weight'));

    $("#txtfontalign").val($("#" + id + "").css("text-align"));
    $("#lblbackcolor").val(chexc($("#" + id + "").css('background-color')));
    $("#lblforecolor").val(chexc($("#" + id + "").css('color')));
    $("#lblbackcolor").css('background-color', "#" + $("#lblbackcolor").val());
    $("#lblforecolor").css('background-color', "#" + $("#lblforecolor").val());
    $("#txtfontalign").val($("#" + id + "").css("text-align"));
    if (parseInt($("#" + id + "").css("font-weight")) < 401) {
        $("#lblwidth").val("normal");
    }
    else if (parseInt($("#" + id + "").css("font-weight")) > 401) {
        $("#lblwidth").val("bold");
    }

}
//changeing  text box properties
function changelblvalue() {
    var id = $("#lblid").val();
    var textval = $("#labeltext").val();
    $("#" + id + "").val(textval);
    $("#" + id + "").css('font-size', $("#lblfontsize").val() + "px");
    $("#" + id + "").css('font-weight', $("#lblwidth").val());
    $("#" + id + "").css('color', "#" + $("#lblforecolor").val());
    $("#" + id + "").css('background-color', "#" + $("#lblbackcolor").val());
    $("#" + id + "").css("border", "1px solid #B5B5B5");
    $("#" + id + "").css("text-align", $("#txtfontalign").val());
    if ($("#txtisdate").val() == "TRUE") {
        $("#" + id + "").val("Date:{{DATE}}");
    }
    $("#" + id + "").attr('data-isdate', $("#txtisdate").val());
}
//delete image
function deletenodeimg(rn) {
    $("#" + rn + "class").remove();
    $("#" + rn + "").parent().remove();

}

function changechart(rn) {
    $("#" + rn + "div").remove();
    $("#" + rn + "").find('img').remove();
    $("#" + rn + "class").remove();
    $.ajax({
        url: '../../Reporting/getchartfiles',
        type: 'POST',
        success: function (result) {
            $("#" + rn + "").append('<div id="' + rn + 'div">' + result + '<hr/><a href="javascript:loadchartreport(' + rn + ')" >Select Chart</a><br/><hr/><a href="javascript:openchart()" style="padding: 5px;">Create New Chart</a></div>');
            $("#" + rn + "").attr("data-chartfile", null);
        }
    });

}


//cahrt functions
function openchart() {
    window.open('../../Dashboard/Index');
}
function deletenodechart(rn) {
    $("#" + rn + "class").remove();
    $("#" + rn + "").remove();

}

//delete table
function deletenode(rn) {
    var test = confirm("are you sure to delete this table ?");
    if (test) {
        $("#" + rn + "").remove();
        $("#" + rn + "class").remove();
        $("#" + rn.replace("lbl", "txt") + "").remove();
    }
}



function gettag(rn) {

    var tag = window.showModalDialog('../../TagBrowser/Index', "resizable: yes", "dialogHeight:550px; dialogWidth:800px");
    if (tag == null || typeof tag == "undefined") {

    }
    else {
        $("#" + rn + "").val($("#" + rn + "").val() + "#" + tag + "#");
    }

}

function tblgettag(rn) {
    var id = document.getElementById($("#tbltextfocus").attr("data-datafocus"));

    var tag = window.showModalDialog('../../TagBrowser/Index', "resizable: yes", "dialogHeight:550px; dialogWidth:800px");
    if (tag == null || typeof tag == "undefined") {

    }
    else {
        $(id).val($(id).val() + "#" + tag + "#");
    }



}

//text box contex menu
function lblmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn-success' style='width:120px' onclick='gettag(\"" + rn + "\")'>Select Tag</button><br/><button class='btn-success' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete</button><br/><button class='btn-success' style='width:120px' onclick='textProperties(\"" + rn + "\")'>Text Properties</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });
}

//Image Context Menu
function imgmenu(id) {
    var rn = $(id).attr("id");
    $("#currimgpath").html(rn);
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn-success' style='width:120px' onclick='deletenodeimg(\"" + rn + "\")'>Delete</button><br/><button class='btn-success' style='width:120px' onclick='uploadrptimg(\"" + rn + "\")'>Uploadimage</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });
}


function chartmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn-success' style='width:120px' onclick='deletenodechart(\"" + rn + "\")'>Delete</button><br/><button class='btn-success' style='width:120px' onclick='changechart(\"" + rn + "\")'>Change Chart</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });
}

//context menu code parameter id is reference of table
function tblmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn-success' style='width:120px' onclick='tblgettag(\"" + rn + "\")'>Select Tag</button><br/><button class='btn-success' style='width:120px' onclick='tbltextproperties(\"" + rn + "\")'>Text Properties</button><br/><button class='btn-success' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete Table</button><br/><button class='btn-success' style='width:120px' onclick='addrow(\"" + rn + "\")'>Add row</button><br/><button class='btn-success' style='width:120px' onclick='deleterow(\"" + rn + "\")'>Delete Row</button><br/><button class='btn-success' style='width:120px' onclick='addcoulmn(\"" + rn + "\")'>ADD Column</button><br/><button class='btn-success' style='width:120px' onclick='deletecolumn(\"" + rn + "\")'>Delete Colulmn</button><br/><button class='btn-success' style='width:120px' onclick='MCH(\"" + rn + "\")'>Merge Cells</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });
}

//merge cells horizantal
function MCH(tblid) {
    var test = confirm("Are you Sure To Merge Cells..??  Help: Horizontal Merge formula is  =mh   Vertical Merge formula is  =mv");
    if (test) {
        var tdid = [];
        var vtdid = [];

        $("#" + tblid + " tr td").each(function () {
            var txtctrl = $(this).children();
            if ($(txtctrl).val() == "=mh") {
                tdid.push($(txtctrl).attr("id"));
            }
            if ($(txtctrl).val() == "=mv") {
                vtdid.push($(txtctrl).attr("id"));
            }
        });

        for (var i = 0; i < tdid.length; i++) {
            var node = document.getElementById(tdid[i]);
            if (i == 0) {
                if ($(node).val() == "=mh") {

                    $(node).parent().attr('colspan', tdid.length);

                    if ($(node).parent().siblings().next().is('td')) {
                    }
                    else {

                        var max = 0;
                        $("#" + tblid + " tr").each(function (index, value) {
                            $this = $(this).find('td').length;
                            if ($this > max) max = $this;
                        });
                        //                        alert($(node).parent().index());
                        //                        alert(max);
                        $(node).parent().attr('colspan', max - $(node).parent().index());
                    }

                }
                $(node).val("");
            }
            else {
                $(node).parent().remove();
            }
        }


        for (var i = 0; i < vtdid.length; i++) {
            var node = document.getElementById(vtdid[i]);
            if (i == 0) {
                if ($(node).val() == "=mv")
                    $(node).parent().attr('rowspan', vtdid.length);
                $(node).val("");
            }
            else {
                $(node).parent().remove();
            }
        }
    }
}

//Create Dataset

function Createdata(rn, url, method, params) {

    $("#datasetlist").append("<div id='" + rn + "'></div>");
    var node = document.getElementById(rn);
    $(node).data('headerSettings', {
        url: url,
        method: method,
        params: params
    });
    $(node).append("<div class='box'>" + rn + "</div>");
    $(node).append("<ul id='" + rn + "_coulms'>" + $("#column_names").html() + "</ul><br>");

    $('#filterTxt').keyup(function () {

        var searchText = $(this).val();

        $('ul > li').each(function () {

            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;

            $(this).toggle(showCurrentLi);

        });
    });

    $("#" + rn + "_coulms").find('li').draggable({
        cursor: 'move',
        revert: true,
        helper: "clone",
        start: function (event, ui) {
            $(this).fadeTo('fast', 0.5);
        },
        stop: function (event, ui) {
            $(this).fadeTo(0, 1);
        }
    });

}



function Callback() {
    $("#grid").dataTable({
        "aoColumnDefs": [
                                 { 'bSortable': false, 'aTargets': [1] }
        ], "bPaginate": false
    });

    $('#grid_length').css({ "display": 'none' });
}

function loadreport() {
    if ($("#emsdoc").val() != "")
        reportedit($("#emsdoc").val());

    $('#tempdiv').dialog('close');
}

function getemsreport() {
    return false;
}

function uploadrptimg(id) {
    var node = document.getElementById(id);
    $("#imgupload").dialog({ title: "Upload Image", width: "500px", position: ['top', 150] }).css("overflow", "hidden");
    $(".ui-dialog-buttonset").find('button').attr("class", "btn-success");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $(".ui-widget").css("font-size", "12px");
    $("#currimgpath").html(id);

}

function uploadimg(id) {
    // var node = document.getElementById(id);
    var imgid = $(id).attr("id");
    $("#imgupload").dialog({ title: "Upload Image", width: "500px", position: ['top', 150] }).css("overflow", "hidden");
    $(".ui-dialog-buttonset").find('button').attr("class", "btn-success");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $(".ui-widget").css("font-size", "12px");
    $("#currimgpath").html(imgid);
}

//Save the Report as XML File in rdlcxml folder
function save() {
    var DataNodes = [];
    var TextNodes = [];
    var TableNodes = [];
    var ImageNodes = [];
    var ChartNodes = [];
    $(".dragchart").each(function (idx, elem) {

        var pos = $(this).position();
        ChartNodes.push({
            id: $(this).attr("id"),
            height: $(this).css('height'),
            width: $(elem).width(),
            positionX: parseFloat(pos.left),
            positionY: pos.top,
            filename: $(this).attr('data-chartfile')
        });
    });
    $(".dragimg").each(function (idx, elem) {

        var pos = $(this).parent().position();

        ImageNodes.push({
            id: $(this).attr("id"),
            value: $(this).val(),
            height: $(this).css('height'),
            width: $(elem).width(),
            positionX: parseFloat(pos.left),
            positionY: pos.top,
            imgsource: $(this).attr('src')
        });
    });
    $(".dragn").each(function (idx, elem) {
        var txtid = $(elem).attr("id");
        if ($(".swipe-area").find(".box").size() == 0) {
            $(this).data('datanode', "NullorEmptyDataset");
        }
        else if ($(".swipe-area").find(".box").size() == 1) {
            $(".swipe-area").find(".box").each(function (idx, elem) {
                var id = $(this).text();
                $("#" + txtid + "").data('datanode', id);
            });
        }
        if ($(this).data('datanode') == null) {
            $(this).data('datanode', "NullorEmptyDataset")
        }
        var $elem = $(elem);
        var left = parseInt($elem.parent().css("left"), 10);
        var top = parseInt($elem.parent().css("top"), 10);
        TextNodes.push({
            id: $(this).attr("id"),
            value: $(this).val(),
            font: $(this).css('font-size'),
            fontweight: $(this).css('font-weight'),
            fontcolor: $(this).css('color'),
            backcolor: $(this).css('background-color'),
            textalign: $(this).css('text-align'),
            width: parseInt($(elem).width()) + 10,
            positionX: parseFloat(left),
            positionY: top,
            isdate: $(this).attr('data-isdate'),
            datasource: $(this).data('datanode')
        });
    });
    var $datanodes = $(".swipe-area").find(".box");
    $datanodes.each(function (idx, elem) {
        var id = $(this).text();
        var node = document.getElementById($(this).text());
        var url = $(node).data('headerSettings').url;
        var method = $(node).data('headerSettings').method;
        var params = $(node).data('headerSettings').params;

        DataNodes.push({
            id: id,
            url: url,
            method: method,
            params: params
        });
    });
    $(".table-editor").each(function (idx, elem) {
        var $elem = $(elem);
        var left = parseInt($elem.css("left"), 10);
        var top = parseInt($elem.css("top"), 10);
        var tblid = $elem.attr('id');
        $("#" + tblid + " tr td").each(function () {
            var txtctrl = $(this).children();
            $(this).attr("data-datainfo", $(txtctrl).val());
        });
        TableNodes.push({
            id: $elem.attr('id'),
            html: $elem.html(),
            positionX: parseFloat(left),
            positionY: top,
            width: $(elem).width()
        });
    });
    var fname = "Report1";
    if ($("body").attr("data-filename") != null)
        if ($("body").attr("data-filename") == "undefined") {
            fname = "Report1";
        }
        else {
            fname = $("body").attr("data-filename");
            fname = fname.replace(".json", "");
        }
    var filename = prompt("Enter Report Name", fname);

    var fileobj = [];
    fileobj.push({ filename: filename });
    var ReporFileData = JSON.stringify(fileobj);

    var obj = [];

    if (TextNodes == "" && TableNodes == "" && ImageNodes == "") {
        alert("There is no Content to Save");
    }
    else {
        obj.push({ TextNodes: JSON.stringify(TextNodes), DataNodes: JSON.stringify(DataNodes), TableNodes: JSON.stringify(TableNodes), ImageNodes: JSON.stringify(ImageNodes), ChartNodes: JSON.stringify(ChartNodes), filename: filename });
        var ReportData = JSON.stringify(obj);

        if (filename) {
            try {
                $.ajax({
                    url: 'Reporting/filecheck',
                    type: 'POST',
                    data: ReporFileData,
                    contentType: 'application/json',
                    success: function (result) {
                        if (result == "Exists") {
                            if ($('#SavingType').val() == "Save") {
                                var test = confirm("Report " + filename + " already exists. Do you want to replace it?");
                                if (!test) {
                                    return false;
                                }
                            }
                        }
                        $.ajax({
                            url: 'Reporting/savedata',
                            type: 'POST',
                            data: ReportData,
                            contentType: 'application/json',
                            success: function (result) {
                                alert(result);
                                location.reload();
                            },
                            error: function (err) {
                                alert(JSON.stringify(err));
                            }
                        });
                        $('#SavingType').val("Save");
                    },
                    error: function (e) {
                        alert("A technical problem occurred while saving report.Please contact your administrator.Code:AJAX_Error");
                    }
                });
            }
            catch (e) {
                alert("A technical problem occurred while saving report.Please contact your administrator.Code:TryCatch_Error");
            }
        }
    }
}

//Get Saved rldc files to select and Edit
function GetRDLCFiles() {
    try {
        $.ajax({
            url: 'Reporting/GetRDLCFiles',
            type: 'GET',
            success: function (result) {
                $("#ReportsTable tbody").empty();
                var html = '';
                for (var i = 0; i <= result.length - 1; i++) {
                    html += "<tr><td>" + result[i]["ReportName"].replace('.json', '') + "</td><td>" + result[i]["CreatedDate"] + "</td><td>" + result[i]["CreatedBy"] + "</td><td>" + result[i]["Desc"] + "</td>";
                    html += '<td><input type="button" style="width:100%" value="Select"  class="btn-success"  onclick="SelectedValue(this)"/></td></tr>';
                }

                $("#ReportsTable tbody").append(html);
                $("#tempdiv").dialog({
                    width: 1100,
                    height: 480,
                    buttons: {
                        Close: function () {
                            $(this).dialog('close');
                        }
                    },
                    position: ['top', 79, 'left', 115],
                    modal: true
                });
                $(".ui-widget").css("font-size", "12px");
                $("#ReportsTable").DataTable();
                $(".siteButton").css("color", "#FFFFFF").css("margin-left", "76%");
                $(window).scrollTop(0);
            }
        });
    }
    catch (err) {
        alert(err);
    }
}

function SelectedValue(tro) {
    var FileName = $(tro).parent().parent().find('td:eq(0)').html();
    $('#tempdiv').dialog('close');
    reportedit(FileName);
    $('#SavingType').val("Edit");
}

//Get Selected Report Data and display
function reportedit(filename) {
    var ReportName = JSON.stringify({ filename: filename });
    $.ajax({
        url: 'Reporting/GetData',
        type: 'POST',
        data: ReportName,
        contentType: 'application/json',
        success: function (result) {
            var TestData = JSON.parse(result);

            if (result.errorresult) {
                alert(result.errorresult);
            }
            else {
                $("#droppable").empty();
                $("body").attr("data-filename", filename);
                var TextNodes = jQuery.parseJSON(TestData[0]["TextNodes"]);
                var DataNodes = jQuery.parseJSON(TestData[0]["DataNodes"]);
                var TableNodes = jQuery.parseJSON(TestData[0]["TableNodes"]);
                var ImageNodes = jQuery.parseJSON(TestData[0]["ImageNodes"]);
                var ChartNodes = jQuery.parseJSON(TestData[0]["ChartNodes"]);

                for (var i = 0; i < ImageNodes.length; i++) {
                    $("#droppable").append("<img id='" + ImageNodes[i].id + "' src='" + ImageNodes[i].imgsource + "' style='position:absolute;height: " + ImageNodes[i].height + ";left: " + ImageNodes[i].positionX + "px;top: " + ImageNodes[i].positionY + "px;width: " + ImageNodes[i].width + ";' />");
                    imgmenu(document.getElementById(ImageNodes[i].id))
                }

                for (var i = 0; i < TextNodes.length; i++) {
                    var datanode = TextNodes[i].datasource;
                    var textdata = TextNodes[i].value;
                    var newval = new String();

                    var txtleft = (parseFloat(TextNodes[i].positionX));
                    var txttop = parseFloat(TextNodes[i].positionY);

                    $("#droppable").append('<div><textarea  class="dragn"  style="font-weight:' + TextNodes[i].fontweight + ';font-size:' + TextNodes[i].font + ';background-color:' + TextNodes[i].backcolor + ';color:' + TextNodes[i].fontcolor + ';border:1px solid #B5B5B5;height:40px;"  type="text"   id="' + TextNodes[i].id + '"  >' + textdata + '</textarea></div>');
                    $("#" + TextNodes[i].id + "").parent().css({ top: txttop + "px", left: txtleft, position: "absolute", "padding": "10px" });
                    $("#" + TextNodes[i].id + "").parent().draggable();
                    if (TextNodes[i].isdate == "FALSE") {
                        $("#" + TextNodes[i].id + "").attr('data-isdate', TextNodes[i].isdate);
                    }
                    else {
                        $("#" + TextNodes[i].id + "").attr('data-isdate', TextNodes[i].isdate);
                        $("#" + TextNodes[i].id + "").val("Date:{{DATE}}");
                    }

                    $("#" + TextNodes[i].id + "").data('datanode', datanode);
                    $("#" + TextNodes[i].id + "").width(TextNodes[i].width);
                    $("#" + TextNodes[i].id + "").parent().hover(
                         function () {
                             $(this).css({ "background": "gray", "cursor": "move", "padding": "10px", "padding-bottom": "5px" });
                         }, function () {
                             $(this).css("background", "white");
                         }
                       );
                    $("#" + TextNodes[i].id + "").droppable({
                        hoverClass: 'active',
                        drop: function (event, ui) {
                            var datatableinfo = ui.draggable.parent().parent().attr("id");
                            $("#" + rn + "txt").data('datanode', datatableinfo);
                            this.value = this.value + "#" + $(ui.draggable).text() + "#";
                        }
                    });
                    lblmenu(document.getElementById(TextNodes[i].id));
                }

                for (var i = 0; i < TableNodes.length; i++) {

                    $("#droppable").append("<table class='table-editor' id='" + TableNodes[i].id + "'  style='position:absolute;width:" + TableNodes[i].width + "px;left:" + (parseFloat(TableNodes[i].positionX)) + "px;top:" + (parseFloat(TableNodes[i].positionY)) + "px' >" + TableNodes[i].html + "</table>");
                    resize();
                    var rn = TableNodes[i].id;
                    $("#" + rn + "").draggable();
                    $("#" + rn + "").resizable();
                    tblmenu(document.getElementById(rn));
                    $("#" + rn + "").append("<div class='tblhelpbtn' style='float:left;width:auto;'><button class='btn-success' style='height:30px;'  onclick='addrow(" + TableNodes[i].id + ")'>New Row</button>&nbsp;&nbsp;<button class='btn-success' style='height:30px;' id='Add' onclick='clonerow(" + TableNodes[i].id + ")'>Clone Row</button></div><br/>");
                    $('#' + rn + ' tr td').each(function () {
                        var txtctrl = $(this).children();

                        $(txtctrl).val($(this).attr("data-datainfo"));
                        $(txtctrl).focus(function () {
                            $("#tbltextfocus").attr("data-datafocus", $(this).attr("id"));
                        });
                    });
                }
            }
        },
        error: function () {
            alert("error");
        }
    });
    resize();
}



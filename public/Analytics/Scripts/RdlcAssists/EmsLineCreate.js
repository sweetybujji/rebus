
//...global declaration....//

var advanceimgprop_array = new Array();




//...global declaration....//

//used for open existing project with  xml files list
function openproject() {

    try {
        $.ajax({
            url: 'EmsLineDiagram/getemsfiles',
            type: 'GET',
            success: function (result) {
            	
            	$("#opengrid2 tbody").empty();
            	var html='';
            	/*<td style='display:none'>"+result[i]["ReportId"]+"</td>*/
            	for(var i=0;i<=result.length-1;i++)
            		{
            		html+="<tr><td>"+result[i]["ReportName"].replace('.xml','')+"</td><td>"+result[i]["CreatedDate"]+"</td><td>"+result[i]["CreatedBy"]+"</td><td>"+result[i]["Desc"]+"</td>";
            		html+='<td><input type="button" style="width:100%" value="Select"  class="btn-success"  onclick="getfile(this)"/></td></tr>';
            		}
            	
            	
            	$("#opengrid2 tbody").append(html);
            	/*.html(html)*/
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
               /* {
                    "aoColumnDefs": [
                                 { 'bSortable': false, 'aTargets': [1] }
                    ], "bPaginate": false
                }*/

                $("#opengrid2").DataTable();
                
              
                /*$('#opengrid1_length').css({ "display": 'none' });*/
                $(".siteButton").css("color", "#FFFFFF").css("margin-left", "76%");

                $(window).scrollTop(0);
                
                
            }
        });
    }
    catch (err) {
        alert(err);
    }



}
//open popup window for uploading new icons
function openiconmanager() {
    $('#icon_Upload').val("");
    $("#iconpopup").dialog({
        width: 960,
        height: 500,
        buttons: {
            Close: function () {
                $(this).dialog('close');
            }
        },
        position: ['top', 70, 'left', 150],
        modal: true
    });
}
//open popup window for uploading new background image
function openimgmanager() {
    $('#bgicon_Upload').val("");
    $("#bguploadimgdiv").dialog({
        width: 916,
        height: 500,
        buttons: {
            Close: function () {
                $(this).dialog('close');
            }
        },
        position: ['top', 70, 'left', 190],
        modal: true
    });
    if ($("body").attr("data-filename") != null) {
        if ($("body").attr("data-filename") == "undefined") {
            $('#bgImageDiv').empty();
            $("#droppable").css('background-image', 'none');
            $("#droppable").css('background-repeat', 'none');
        }
        else {
            var bg_image = $("#droppable").css('background-image');
            var bgg_image = "";
            if (bg_image.indexOf('url') > -1) {
                var cleanup = /\"|\'|\)/g;
                //alert(bg_image.split('/').pop().replace(cleanup, ''));
                bgg_image = bg_image.split('/').pop().replace(cleanup, '');
            }
            else {
                bgg_image = bg_image;
            }

            var aftersplit = bgg_image.split('.');
            var addhtml = '';
            $('#bgImageDiv').empty();
            addhtml += '<div class="widgetstyle"><div class="widgetCategory ui-draggable-bi" data-category="Charts" style="background-image: url(&quot;/Linediagrams__BGImage/' + bgg_image + '&quot;);">'
            addhtml += '<p style="margin-top:80px;"data-iconname1=' + bgg_image + '>' + aftersplit[0] + '</p>'
            addhtml += '<img src="../../images/close_button.png" style="float: right;margin-top:-120px;" class="delete_btn" /></div></div>'
            $('#bgImageDiv').append(addhtml);
            $('.delete_btn').hide().click(function () {
                deletebg_img($(this).siblings().attr('data-iconname1'));
            });
            deletefunctnality1();
            //$(".drag").draggable({ revert: true, helper: "clone" });
            $('#bgicon_Upload').val("");
        }
    }
}
//context menu for image
function rmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {

        $("<div class='custom-menu' id='" + rn + "class' ><button  class='btn  btn-link' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete</button><br/><button  class='btn  btn-link' style='width:120px' onclick='Properties(\"" + rn + "\")'>Properties</button><br/><button  class='btn  btn-link' style='width:120px' onclick='cloneimg(\"" + rn + "\")'>Clone Node</button></div>")
                         .appendTo("body")
                         .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
        event.preventDefault();
        event.stopPropagation();
    });
}
//context menu for textbox
function lblmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {

        $("<div class='custom-menu' id='" + rn + "class' ><button  class='btn  btn-link' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete</button><br/><button  class='btn  btn-link' style='width:120px' onclick='Properties(\"" + rn + "\")'>Properties</button><br/><button  class='btn  btn-link' style='width:120px' onclick='textProperties(\"" + rn + "\")'>Text Properties</button><br/><button  class='btn  btn-link' style='width:120px' onclick='clonetext(\"" + rn + "\")'>Clone Text</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
        event.preventDefault();
        event.stopPropagation();
    });


}
//clone new textbox from selected textbox.
function clonetext(obj) {


    var tobj = document.getElementById(obj);
    var rn = "txt" + parseInt(Math.random() * 779556566);

    var $clone;
    $clone = $(tobj).clone();
    $("#droppable").append('<div id="' + rn + '" class="dragn" data-popup="NO"  data-fontsize="1em" data-bcolor="Transparent" data-fcolor="White"  data-drillto="None" style="word-wrap:break-word;width:50px;font-size:1em;font-weight:bold;text-align:center;min-height:28px;color:White">Text</div>');
    $("#" + rn + "").html($clone.text());
    //$("#" + rn + "").resizable();
    $(".ui-resizable-e").width("0px");
    $(".ui-resizable-s").height("0px");
    $("#" + rn + "").css({ top: "9px", left: "100px", position: "absolute", border: "1px solid black", "overflow": "auto" });
    lblmenu(document.getElementById(rn));

    jsPlumb.draggable($(".dragn"));
    $("#" + rn + "").click(function () {
        $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

    });


    $("#" + rn + "").width($clone.width());


    $("#" + rn + "").css("background", $clone.attr("data-bcolor"));
    $("#" + rn + "").css("color", $clone.attr("data-fcolor"));
    $("#" + rn + "").css("font-size", $clone.attr("data-fontsize"));
    $("#" + rn + "").attr("data-bcolor", $clone.attr("data-bcolor"));
    $("#" + rn + "").attr("data-fcolor", $clone.attr("data-fcolor"));
    $("#" + rn + "").attr("data-fontsize", $clone.attr("data-fontsize"));

}

//clone new image on the page
function cloneimg(obj) {


    var tobj = document.getElementById(obj);
    var cloneid = "txt" + parseInt(Math.random() * 779556566);
    var $clone;
    $clone = $(tobj).clone().attr('id', cloneid);
    $("#droppable").append($clone);
    $(".ui-resizable-e").width("0px");
    $(".ui-resizable-s").height("0px");
    $("#" + cloneid + "").draggable();
    $("#" + cloneid + "").css({ top: "0px", left: "100px" });
    rmenu(document.getElementById(cloneid));
    jsPlumb.draggable($(".dragn"));
}

//this will used for edtiting the exixting  report where tro is the table row object
function getfile(tro) {
    jsPlumb.deleteEveryEndpoint();
    var filename = $(tro).parent().parent().find('td:eq(0)').html();
    $("#droppable").remove();
    $("body").append("<div id='droppable'></div>");
    $("#droppable").draggable();
    $("#droppable").resizable();
    
    //if (filename == "SiteOverview") {
    //    $("#droppable").css({ "background-image": "url(../../RdlcAssists/black_siteoverview.png)", "background-repeat": "no-repeat" });
    //}
    //else {
    //    $("#droppable").css('background-image', 'none');
    //    $("#droppable").css('background-repeat', 'none');
    //}
    var asd=JSON.stringify({filename:filename});
    $.ajax({
        url: 'EmsLineDiagram/GetData',
        type: 'POST',
        data: asd,
        contentType:'application/json',
        success: function (result) {
            //alert(JSON.stringify(result));
            $("body").attr("data-filename", filename);
            
            var blocks = jQuery.parseJSON(result.Block);
            
            var connections = jQuery.parseJSON(result.connections);

            advanceimgprop_array = result.advanceimgprop_arraydata;
            var container = jQuery.parseJSON(result.container);
            for (var i = 0; i < container.length; i++) {
                $("#droppable").css("left", container[i].positionX);
                $("#droppable").css("top", container[i].positionY);
                $("#droppable").css("width", container[i].width + "px");
                $("#droppable").css("height", container[i].height + "px");
                var bgg_image = container[i].bgg_image;
                if (bgg_image == "none" || bgg_image == "undefined") {
                    $("#droppable").css('background-image', 'none');
                    $("#droppable").css('background-repeat', 'none');
                }
                else {
                    $("#droppable").css({ "background-image": 'url(../../Linediagrams__BGImage/' + bgg_image + ')', "background-repeat": "no-repeat" });
                }
            }

            if (result.groupcontainer) {
                var groupbox = jQuery.parseJSON(result.groupcontainer);
                for (var i = 0; i < groupbox.length; i++) {
                    var rn = groupbox[i].blockId;
                    var supdoc = groupbox[i].params;
                    var name1 = supdoc[0].name; var value1 = supdoc[0].value;
                    var name2 = supdoc[1].name; var value2 = supdoc[1].value;
                    var name3 = supdoc[2].name; var value3 = supdoc[2].value;
                    var name4 = supdoc[3].name; var value4 = supdoc[3].value;
                    var name5 = supdoc[4].name; var value5 = supdoc[4].value;
                    var name6 = supdoc[5].name; var value6 = supdoc[5].value;

                    $("#droppable").append('<div class="maind" id="' + rn + '" > <div class="divhead"> <input type="text"  value="' + groupbox[i].title + '" class="titled"/></div><div class="itemd"> <input type="text" class="itemleft" value="' + name1 + '" /> <input type="text" class="itemright" value="' + value1 + '" />  </div>  <div class="itemd">  <input type="text" class="itemleft" value="' + name2 + '"/>   <input type="text" class="itemright" value="' + value2 + '"/>  </div> <div class="itemd"><input type="text" class="itemleft" value="' + name3 + '"/> <input type="text" class="itemright" value="' + value3 + '"/> </div>  <div class="itemd"> <input type="text" class="itemleft" value="' + name4 + '" /> <input type="text" class="itemright" value="' + value4 + '"/>  </div>  <div class="itemd"> <input type="text" class="itemleft" value="' + name5 + '" /> <input type="text" class="itemright" value="' + value5 + '"/>  </div>  <div class="itemd"> <input type="text" class="itemleft"  value="' + name6 + '" />  <input type="text" class="itemright" value="' + value6 + '" />  </div></div>');
                    $("#" + rn + "").css({ top: groupbox[i].positionY + "px", left: (parseFloat(groupbox[i].positionX) - 4) + "px", position: "absolute" });
                    rmenu(document.getElementById(rn));
                    $(".maind").draggable();
                }
            }
            for (var i = 0; i < blocks.length; i++) {
                var drillvalue = "None";
                if (blocks[i].Drllto) {
                    drillvalue = blocks[i].Drllto;
                    if (blocks[i].fontcolor)
                        nodecolor = blocks[i].fontcolor;
                }
                else {
                    drillvalue = "None";
                    nodecolor = "black";
                }

                if (blocks[i].islabel == "false") {
                    var popupval = "NO";
                    if (blocks[i].popup) {
                        popupval = blocks[i].popup;
                    }
                    $("#droppable").append('<img src="' + blocks[i].imgsrc + '" class="dragn" id="' + blocks[i].blockId + '" data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  onload="rmenu(this)"/>');
                    //  $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "%", left: (parseFloat(blocks[i].positionX) + 0) + "%", position: "absolute" });
                    $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute" });
                }


                else {

                    var backcolor = blocks[i].backcolor;
                    var nodecolor = blocks[i].fontcolor;
                    if (blocks[i].class) {
                        var cssclass = blocks[i].class;
                        var test = cssclass.indexOf("rotate");
                        var popupval = "NO";
                        if (blocks[i].popup) {
                            popupval = blocks[i].popup;
                        }

                        var seletedfont = "1em;"
                        if (blocks[i].fontsize) {
                            seletedfont = blocks[i].fontsize;
                        }




                        if (test == -1) {

                            $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" data-popup="' + popupval + '"  data-bcolor="' + backcolor + '"  data-fontsize="' + seletedfont + '"  data-fcolor="' + nodecolor + '"   data-drillto="' + drillvalue + '"  style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;min-height:28px;text-align:center;font-weight:bold;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');

                            lblmenu(document.getElementById(blocks[i].blockId));

                            $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute" });
                        }
                        else {
                            $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  data-bcolor="' + backcolor + '"  data-fontsize="' + seletedfont + '"  data-fcolor="' + nodecolor + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;text-align:center;min-height:28px;font-weight:bold;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');
                            $("#" + blocks[i].blockId + "").addClass("rotate");
                            lblmenu(document.getElementById(blocks[i].blockId));
                            $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute" });
                        }
                    }
                    else {
                        $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn"  data-popup="' + popupval + '"   data-drillto="' + drillvalue + '"  data-bcolor="' + backcolor + '"  data-fontsize="' + seletedfont + '"  data-fcolor="' + nodecolor + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;text-align:center;min-height:28px;font-weight:bold;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');

                        lblmenu(document.getElementById(blocks[i].blockId));

                        $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute" });
                    }

                    //  alert(blocks[i].textstyle);
                    if (blocks[i].textstyle == "Button") {

                        $("#" + blocks[i].blockId + "").addClass("button");
                        $("#" + blocks[i].blockId + "").attr("data-textstyle", "Button");
                    }
                    else if (blocks[i].textstyle == "Text") {
                        $("#" + blocks[i].blockId + "").removeClass("button");
                        $("#" + blocks[i].blockId + "").attr("data-textstyle", "Text");
                    }
                    else {
                        $("#" + blocks[i].blockId + "").attr("data-textstyle", "Hyperlink");
                        $("#" + blocks[i].blockId + "").removeClass("button");
                    }

                    $("#" + blocks[i].blockId + "").resizable();
                    $(".ui-resizable-e").width("0px");
                    $(".ui-resizable-s").height("0px");
                    $("#" + blocks[i].blockId + "").css("border", "1px solid black");
                }





            }
            for (var i = 0; i < connections.length; i++) {

                if (document.getElementById(connections[i].pageSourceId) !== null) {
                    if (document.getElementById(connections[i].pageTargetId) !== null) {
                        var dstyle = "0";
                        if (connections[i].dashstyle) {
                            dstyle = connections[i].dashstyle;
                        }
                        var conn = jsPlumb.connect({
                            source: '' + connections[i].pageSourceId + '',
                            target: '' + connections[i].pageTargetId + '',
                            paintStyle: { lineWidth: parseFloat(connections[i].targetwidth), strokeStyle: '' + connections[i].targetcolor + '', dashstyle: dstyle },
                            anchors: ["" + connections[i].SourceAnchor + "", "" + connections[i].TargetAnchor + ""],
                            connector: ["Flowchart"],
                            hoverPaintStyle: { strokeStyle: "red", lineWidth: 7 },
                            endpoint: ["Rectangle", { width: 2, height: 3 }]
                        });

                        conn.bind("click", function (conn) {
                            var r = confirm("Are You Sure to Delete!")
                            if (r == true) {
                                jsPlumb.detach(conn);
                                jsPlumb.deleteEndpoint(conn);
                            }
                        });
                    }
                }

            }


            jsPlumb.draggable($(".dragn"));
            $(".dragn").click(function () {
                $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

            });


        },
        error: function () { alert("error"); }
    });

    dragndrop();
    $("#tempdiv").dialog('close');
}


function filterliui() {
    var searchText = $("#msearch").val();
    $('.searchli').each(function () {
        var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        $(this).toggle(showCurrentLi);
    });
}

//open serach window
function opensearch() {
    $("#msearch").val("");
    $(".liclass").empty();
    var liui = "";
    $("#lineto> option").each(function () {
        liui += "<li title='select' class='searchli' onclick='getselecteditem(this)'>" + this.value + "</li>";
    });
    $(".liclass").html(liui);

    $(".liuifilter").dialog({
        resizable: false,
        height: 500,
        width: 800,
        modal: true
    });

    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });

}
//used of selecting selected node of target id after filter
function getselecteditem(text) {
    $(".liuifilter").dialog('close');
    $("#lineto").val($(text).text()); connect();
}



//initiating the drag and drop functionality for newly upoaded icons
$(function () {
    $("#ntop").spinner();
    $("#nleft").spinner();

    $('.ui-spinner-button').click(function () {
        changepos();
    });
    $("#droppable").draggable();
    $("#droppable").resizable();
    $('.side-button').css("top", "13px");
    $('.side-button').click(function () {


    });
    $(document).bind("click", function (event) {

        $("div.custom-menu").hide();
    });

    var coordinates = function (event) {
        $('#showpos').text('X: ' + event.pageX + ' ' + 'Y: ' + event.pageY);
    }

    $(".drag").draggable({ revert: true, helper: "clone", containment: 'droppable' });

    dragndrop();

});
//drag n drop
function dragndrop() {
    $("#droppable").droppable({
        accept: ".drag",
        drop: function (event, ui) {
            var id = ui.draggable.attr("id");
            var imgsrc = ui.draggable.attr("src");
            //alert(imgsrc);
            switch (imgsrc) {

                //case "islabel":
                //    var rn = prompt("Enter Node Name", parseInt(Math.random() * 6454566));
                //    if (rn) {

                //        rn = rn.replace(/\s+/g, "_");

                //        var nodecheck = document.getElementById(rn);
                //        if ($(nodecheck).length) {
                //            alert("This Name Already Exists...")
                //            return false;
                //        }
                //        else {
                //            $("#droppable").append('<div id="' + rn + '" class="dragn" data-popup="NO"  data-fontsize="1em" data-bcolor="Transparent" data-fcolor="White"  data-drillto="None" style="word-wrap:break-word;width:50px;font-size:1em;font-weight:bold;text-align:center;min-height:28px;color:White">Text</div>');
                //            $("#" + rn + "").resizable();
                //            $(".ui-resizable-e").width("0px");
                //            $(".ui-resizable-s").height("0px");
                //            $("#" + rn + "").css({ top: ((event.pageY) - 80) + "px", left: ((event.pageX) - 65) + "px", position: "absolute", border: "1px solid black", "overflow": "auto" });
                //            lblmenu(document.getElementById(rn));

                //            jsPlumb.draggable($(".dragn"));
                //            $("#" + rn + "").click(function () {
                //                $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

                //            });
                //        }
                //    }
                //    else {
                //        return false;
                //    }

                //    break;
                case "isplaceholder":
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 6454566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...")
                            return false;
                        }
                        else {
                            $("#droppable").append('<div id="' + rn + '" class="dragn isplaceholder" data-popup="NO"  data-fontsize="1em" data-bcolor="Transparent" data-fcolor="White"  data-drillto="None" style="min-height: 100px; min-width: 120px;border:2px dashed white;text-align:center;"><a onclick="selectitem(this,' + rn + ')" style="color: white;display: block;margin-top: 35px;vertical-align: middle;" href="#">Select Item</a></div>');
                            $("#" + rn + "").resizable();
                            $(".ui-resizable-e").width("0px");
                            $(".ui-resizable-s").height("0px");
                            $("#" + rn + "").css({ top: ((event.pageY) - 80) + "px", left: ((event.pageX) - 65) + "px", position: "absolute", border: "2px dashed white", "overflow": "auto" });
                            lblmenu(document.getElementById(rn));
                            //rmenu(document.getElementById(rn));
                            jsPlumb.draggable($(".dragn"));
                            $("#" + rn + "").click(function () {
                                $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

                            });
                        }
                    }
                    else {
                        return false;
                    }

                    break;
                case "../../fourmbuilder/inputtext.PNG":
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 6454566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...")
                            return false;
                        }
                        else {
                            $("#droppable").append('<div id="' + rn + '" class="dragn" data-popup="NO"  data-fontsize="1em" data-bcolor="Transparent" data-fcolor="White"  data-drillto="None" style="word-wrap:break-word;width:50px;font-size:1em;font-weight:bold;text-align:center;min-height:28px;color:White">Text</div>');
                            $("#" + rn + "").resizable();
                            $(".ui-resizable-e").width("0px");
                            $(".ui-resizable-s").height("0px");
                            $("#" + rn + "").css({ top: ((event.pageY) - 80) + "px", left: ((event.pageX) - 65) + "px", position: "absolute", border: "1px solid black", "overflow": "auto" });
                            lblmenu(document.getElementById(rn));

                            jsPlumb.draggable($(".dragn"));
                            $("#" + rn + "").click(function () {
                                $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

                            });
                        }
                    }
                    else {
                        return false;
                    }

                    break;

                case "allunits":
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 676454496));
                    if (rn) {
                        $("#droppable").append('<div class="maind" id="' + rn + '" > <div class="divhead"> <input type="text"  value="TITLE" class="titled"/></div><div class="itemd"> <input type="text" class="itemleft" value="KWH" /> <input type="text" class="itemright" value="Value" />  </div>  <div class="itemd">  <input type="text" class="itemleft" value="KW" />   <input type="text" class="itemright" value="Value" />  </div> <div class="itemd"><input type="text" class="itemleft" value="IA" /> <input type="text" class="itemright" value="Value" /> </div>  <div class="itemd"> <input type="text" class="itemleft" value="IB" /> <input type="text" class="itemright" value="Value" />  </div>  <div class="itemd"> <input type="text" class="itemleft" value="IC" /> <input type="text" class="itemright" value="Value" />  </div>  <div class="itemd"> <input type="text" class="itemleft" value="V" />  <input type="text" class="itemright" value="Value" />  </div></div>');
                        $("#" + rn + "").css({ top: ((event.pageY) - 88) + "px", left: ((event.pageX) - 75) + "px", position: "absolute" });
                        rmenu(document.getElementById(rn));
                        $(".maind").draggable();
                    }
                    else {
                        return false;
                    }
                    break;
                default:
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 6354566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!")
                            return false;
                        }
                        else {
                            $("#droppable").append('<img src="' + imgsrc + '" class="dragn" id="' + rn + '" data-popup="None" data-drillto="None"  onload="rmenu(this)" />');
                            $("#" + rn + "").css({ top: ((event.pageY) - 88) + "px", left: ((event.pageX) - 75) + "px", position: "absolute" });
                            jsPlumb.draggable($(".dragn"));
                            $("#" + rn + "").click(function () {
                                $("#showpos").html("Node  id: <span>" + $(this).attr("id") + "</span>&nbsp;&nbsp;left=<span>" + $(this).css("left").replace("px", "") + "</span>&nbsp;&nbsp;top=<span>" + $(this).css("top").replace("px", "") + "</span>");

                            });
                        }
                        break;
                    }
                    else {
                        return false;
                    }
            }

        }
    });

}
function selectitem(obj, randomnum) {
    $.ajax({
        url: "../../EmsLineDiagram/getallicons",
        type: "GET",
        data: {},
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (Res) {
            var addhtml = ''; var aftersplit = '';
            for (var i = 0; i < JSON.parse(Res).length; i++) {
                aftersplit = JSON.parse(Res)[i].split('.');
                addhtml += '<div class="widgetstyle"><div class="widgetCategory ui-draggable-bi" data-category="Charts"  style="background-image: url(&quot;/Linediagrams__Icon/' + JSON.parse(Res)[i] + '&quot;);">'
                addhtml += '<p style="margin-top:80px;" data-iconname=' + JSON.parse(Res)[i] + '>' + aftersplit[0] + '</p>'
                addhtml += '</div></div>'
                //addhtml += '<img src="../../images/close_button.png" style="float: right;margin-top:-120px;" class="delete_btn" /></div></div>'
            }
            $('#ViewImagesDiv').append(addhtml);
            $("#Imagespopup").dialog({
                width: 916,
                height: 500,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                },
                position: ['top', 70, 'left', 190],
                modal: true
            });
            //get_SelectedImage(obj);
            $(".widgetstyle").unbind("click");
            $(".widgetstyle").click(function () {
                var selecte_ImgName = $(this).children().find('p').text();
                var selecte_ImgUrl = $(this).find("div").css("background-image").replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

                //var foldernamepath = (selecte_ImgUrl.split('/')[selecte_ImgUrl.split('/').length - 2]);
                //var imgnamepath = (selecte_ImgUrl.split('/')[selecte_ImgUrl.split('/').length - 1]);
                //alert("/" + foldernamepath + "/" + imgnamepath);

                $("#" + randomnum).find('a').remove();
                $("#" + randomnum).append('<img style="" class="drag ui-draggable " src=' + selecte_ImgUrl + ' />');
                $("#Imagespopup").dialog('close');
            });

        },
        error: function (error) {
            alert(error)
        }
    });
    //$("#" + randomnum).find('a').remove();
    //$("#" + randomnum).append('<img style="" class="drag ui-draggable" src="../../Linediagrams__Icon/120px-Spur_gears_animation.gif">');
}


//delete nodes
function deletenode(rn) {
    if (advanceimgprop_array.length > 0) {
        for (var pc = 0; pc < advanceimgprop_array.length; pc++) {
            if (advanceimgprop_array[pc]["node_id"] == rn) {
                advanceimgprop_array.splice(pc, 1);
            }
        }
    }
    //alert(JSON.stringify(advanceimgprop_array));
    $("#" + rn + "").remove();
    $("#" + rn + "class").remove();

}


function deleteline(rn) {


    $("#" + rn + "").remove();
    $("#" + rn + "class").remove();
}


//get list of nodes......
function getnodes(rn) {
    // $(".liclass").empty();
    var liui = "";
    var options = "<option>Select Node</option>";;
    $("#lineto").empty();
    $(".dragn").each(function () {
        if (rn != $(this).attr("id")) {
            options += "<option>" + $(this).attr("id") + "</option>";
            // liui += "<li title='select' class='searchli' onclick='getselecteditem(this)'>" + $(this).attr("id") + "</li>";
        }
    });

    $(".maind").each(function () {
        if (rn != $(this).attr("id")) {
            options += "<option>" + $(this).attr("id") + "</option>";
            // liui += "<li title='select' class='searchli' onclick='getselecteditem(this)'>" + $(this).attr("id") + "</li>";
        }
    });

    $("#lineto").append(options);

}
//chenge left top positions

function changepos() {
    var id = $("#gaugeid").attr("data-preid");
    var obj = document.getElementById(id);
    $(obj).css("top", $("#ntop").val() + "px");
    $(obj).css("left", $("#nleft").val() + "px");
}


//node poperties
function Properties(rn) {
    try {

        $("#gaugeid").val(rn);
        $("#gaugeid").attr("data-preid", rn);
        $("#ntop").val($("#" + rn + "").css("top").replace("px", ""));
        $("#nleft").val($("#" + rn + "").css("left").replace("px", ""));
        $('#imgshowpopup').val($("#" + rn + "").attr("data-popup"));
        getnodes(rn);
        $("#GlobalGaugetable").dialog({ title: "Node Settings", width: "500px" }).css("overflow", "hidden");
        $(".ui-widget-header").css({
            "background": "white",
            border: 0,
            padding: 0
        });
        $("#GlobalGaugetable").width("100%");
        if (typeof $("#" + rn + "").attr("data-dstyle") == "undefined") {
            $("#" + rn + "").attr("data-dstyle", "0");
            $("#dashedstyles").val("0");
        }
        else {
            $("#dashedstyles").val($("#" + rn + "").attr("data-dstyle"));
        }
        if ($("#" + rn + "").attr("data-drillto") == "undefined") {
            $('#imgtargetfile').val("None");
            $("#" + rn + "").attr("data-drillto", "None");
        }
        else {
            $('#imgtargetfile').val($("#" + rn + "").attr("data-drillto"));
        }
        $("#advancedprop").attr("data-id", rn);

    }
    catch (e) {
        alert(e);
    }
}
//this method used for coonecting lines between two lines
function connect() {

    var selectedNode = $('#lineto').find(":selected").text();

    var currentnode = $("#gaugeid").val();

    var anchor1 = $('#spos').find(":selected").text();
    var linewidth = $("#linethickness").val();
    var linecolor = $("#linecolor").val();

    $("#" + $("#gaugeid").val() + "").attr("data-popup", $('#imgshowpopup').val());
    $("#" + $("#gaugeid").val() + "").attr("data-dstyle", $('#dashedstyles').val());
    if ($('#imgtargetfile').val() != "") {

        $("#" + $("#gaugeid").val() + "").attr("data-drillto", $('#imgtargetfile').val());
    }


    else {
        alert("Drill Can Not be Empty");
        $('#imgtargetfile').focus();
        return false;
    }

    var dstyle = $("#dashedstyles").val();
    var anchor2 = $('#dpos').find(":selected").text();
    if (selectedNode == "Select Node") {
        return false;

    }
    else {
        draw(currentnode, selectedNode, anchor1, anchor2, linewidth, linecolor, dstyle);
    }

}
//this method used for coonecting lines between two lines using jsplumb 
function draw(currentnode, selectedNode, anchor1, anchor2, linewidth, linecolor, dstyle) {
    var conn = jsPlumb.connect({
        source: '' + currentnode + '',
        target: '' + selectedNode + '',
        paintStyle: { lineWidth: parseFloat(linewidth), strokeStyle: '' + linecolor + '', dashstyle: dstyle },
        anchors: ["" + anchor1 + "", "" + anchor2 + ""],
        connector: ["Flowchart"],
        hoverPaintStyle: { strokeStyle: 'red', lineWidth: 7 },
        endpoint: ["Rectangle", { width: 2, height: 3 }]
    });

    conn.bind("click", function (conn) {
        var r = confirm("Are You Sure Delete!")
        if (r == true) {
            jsPlumb.detach(conn);
            jsPlumb.deleteEndpoint(conn);
        }
    });

}

//this method will change textbox id
function changenodeid(id) {

    var cnode = document.getElementById($("#gaugeid").val());

    if ($(cnode).length) {
        /* it exists */
        alert("The Node Id You Entered  is Already Exist");
        $("#gaugeid").val($(cnode).attr("id"));
        return false;
    }
    else {
        /* it doesn't exist */
        var chid = document.getElementById($("#gaugeid").attr("data-preid"));
        $("#" + $("#gaugeid").attr("data-preid") + "").attr("id", $("#gaugeid").val());
        $("#gaugeid").attr("data-preid", $("#gaugeid").val());
        $(chid).removeClass($("#gaugeid").attr("data-preid") + "class");
        if ($(chid).is("div")) {
            lblmenu(chid);
        }
        else {
            rmenu(chid);
        }

        $("#GlobalGaugetable").dialog('close');
    }

}
//it will open textproperties
function textProperties(id) {
    $("#TextPoperties").dialog({ title: "Label Settings", width: "500px" }).css("overflow", "hidden");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $("#TextPoperties").width("100%");
    $("#lblid").val(id);
    $("#labeltext").val($("#" + id + "").text());
    $('#lblfontsize').val($("#" + id + "").attr('data-fontsize'));
    $('#lblwidth :selected').text($("#" + id + "").css('width').replace("px", ""));
    $('#txttargetfile').val($("#" + id + "").attr("data-drillto"));
    $('#txtshowpopup').val($("#" + id + "").attr("data-popup"));


    if ($("#" + id + "").attr("data-textstyle") == null) {
        $("#" + id + "").attr("data-textstyle", "Text");
    }
    else {

        $('#lbltextstyle').val($("#" + id + "").attr("data-textstyle"));
    }

    var bcolor = $("#" + id + "").attr("data-bcolor");
    var fcolor = $("#" + id + "").attr("data-fcolor");
    $("#lblbackcolor").val(bcolor);
    $("#lblforecolor").val(fcolor);



}
//used for color convertions
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
function changelblvalue() {
    var id = $("#lblid").val();
    $("#" + id + "").attr("data-popup", $("#txtshowpopup").val());
    if ($('#txttargetfile').val() != "") {
        $("#" + id + "").attr("data-drillto", $('#txttargetfile').val());
    }
    else {
        alert("Drilldown Can Not be Empty");
        $('#txttargetfile').focus();
        return false;
    }

    var textval = $("#labeltext").val();

    if ($("#lbltextstyle").val() == "Button") {
        $("#" + id + "").addClass("button");
        $("#" + id + "").attr("data-textstyle", "Button");
    }
    else if ($("#lbltextstyle").val() == "Text") {
        $("#" + id + "").removeClass("button");
        $("#" + id + "").attr("data-textstyle", "Text");
    }
    else {
        $("#" + id + "").removeClass("button");
        $("#" + id + "").attr("data-textstyle", "Hyperlink");
    }

    $("#" + id + "").attr("data-bcolor", $("#lblbackcolor").val());
    $("#" + id + "").attr("data-fcolor", $("#lblforecolor").val());

    $("#" + id + "").css("background", $("#lblbackcolor").val());
    $("#" + id + "").css("color", $("#lblforecolor").val());

    $("#" + id + "").html(textval);
    $("#" + id + "").resizable("destroy").resizable();
    $(".ui-resizable-e").width("0px");
    $(".ui-resizable-s").height("0px");
    $("#" + id + "").width($("#lblwidth").val());


    var seletedfont = $('#lblfontsize :selected').text();
    $("#" + id + "").attr('data-fontsize', seletedfont);
    $("#" + id + "").css("font-size", seletedfont);
    if ($("#isroteate").val() == "YES") {
        $("#" + id + "").addClass("rotate");

    }
    else {
        $("#" + id + "").removeClass("rotate");
    }


}
//Saving Project as xml file
function save() {
    var connections = [];
    var fname = "Project1";
    if ($("body").attr("data-filename") != null)
        if ($("body").attr("data-filename") == "undefined") {
            fname = "Project1";
        }
        else {
            fname = $("body").attr("data-filename");
            fname = fname.replace(".xml", "");
        }

    $.each(jsPlumb.getConnections(), function (idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId,
            SourceAnchor: connection.endpoints[0].anchor.type,
            TargetAnchor: connection.endpoints[1].anchor.type,
            targetcolor: connection.paintStyleInUse.strokeStyle,
            targetwidth: connection.paintStyleInUse.lineWidth,
            dashstyle: connection.paintStyleInUse.dashstyle
        });
    });

    var serializedData = JSON.stringify(connections);
    var blocks = [];
    var DataNodes = [];
    var container = [];
    var groupcontainer = [];
    $(".maind").each(function (idx, elem) {
        var $elem = $(elem);
        var left = parseInt($elem.css("left"));
        var top = parseInt($elem.css("top"));

        var subdoc = [];
        $(this).find(".itemd").each(function () {
            subdoc.push({ name: $(this).find(".itemleft").val(), value: $(this).find(".itemright").val() });

        });
        groupcontainer.push({
            blockId: $(this).attr('id'),
            title: $(this).find('.titled').val(),
            positionX: left,
            positionY: top,
            params: subdoc
        });
    });
    $(".dragn").each(function (idx, elem) {
        var $elem = $(elem);
        var left = parseInt($elem.css("left"));
        var top = parseInt($elem.css("top"));

        if ($elem.is("div")) {

            blocks.push({
                blockId: $elem.attr('id'),
                positionX: left,
                positionY: top,
                islabel: "true",
                val: $(elem).text(),
                fontsize: $(elem).attr('data-fontsize'),
                width: $(elem).width(),
                class: $(elem).attr("class"),
                fontcolor: $(elem).attr('data-fcolor'),
                backcolor: $(elem).attr('data-bcolor'),
                Drllto: $(elem).attr("data-drillto"),
                popup: $(elem).attr("data-popup"),
                textstyle: $(elem).attr("data-textstyle"),
                imgsrc: "None"
            });
        }
        else {
            blocks.push({
                blockId: $elem.attr('id'),
                positionX: left,
                positionY: top,
                islabel: "false",
                val: "None",
                Drllto: $(elem).attr("data-drillto"),
                popup: $(elem).attr("data-popup"),
                imgsrc: $elem.attr('src')
            });
        }
    });

    var serializedData1 = JSON.stringify(blocks);
    var bg_image = $("#droppable").css('background-image');
    var bgg_image = "";
    if (bg_image.indexOf('url') > -1) {
        var cleanup = /\"|\'|\)/g;
        //alert(bg_image.split('/').pop().replace(cleanup, ''));
        bgg_image = bg_image.split('/').pop().replace(cleanup, '');
    }
    else {
        bgg_image = bg_image;
    }
    //alert(bgg_image);
    container.push({
        positionX: $("#droppable").css("left"),
        positionY: $("#droppable").css("top"),
        width: $("#droppable").width(),
        height: $("#droppable").height(),
        bgg_image: bgg_image
    });
    var Dbinfo = JSON.stringify(DataNodes);
    var containerinfo = JSON.stringify(container);
    //alert(containerinfo);
    var filename = prompt("Enter Project Name", fname);
    var groupcontainerinfo = JSON.stringify(groupcontainer);
    //alert($("#droppable").css('background-image'));
    
    var advanced_imgprop=JSON.stringify(advanceimgprop_array);
    
    var obj=[];
    
    obj.push({ blocks: serializedData1, connections: serializedData, DataNodes: Dbinfo, container: containerinfo, groupcontainer: groupcontainerinfo, filename: filename,"advanceimgprop_arraydata":advanced_imgprop });
    
    
    var ASD=  JSON.stringify(obj);

    if (filename) {
        $.ajax({
            url: 'EmsLineDiagram/savedata',
            type: 'POST',
            data:ASD,
            /*contentType:false,*/
            contentType:'application/json',
            success: function (result) {
                alert(result);
            },
            error: function (err) { 
            	alert(JSON.stringify(err));
            	alert("error"); 
            	}
        });

        

    }

}



//....code for advanced properties of HMI diagram--------> Murali.G ......//

function getbg_image() {
	
    $.ajax({
        url: "EmsLineDiagram/getbg_image",
        type: "GET",
        data: {},
        async: false,
        success: function (Res) {

        
            var appendicons = '';

            if ($("body").attr("data-filename") != null) {
                if ($("body").attr("data-filename") == "undefined") {
                    $('#bgImageDiv').empty();
                    $("#droppable").css('background-image', 'none');
                    $("#droppable").css('background-repeat', 'none');
                }
                else {
                    var cnt = Res.length;
                    //alert(cnt);
                    if (cnt == 0) {
                        $("#droppable").css('background-image', 'none');
                        $("#droppable").css('background-repeat', 'none');
                    }
                    var addhtml = ''; var aftersplit = '';
                    for (var i = 0; i < Res.length; i++) {
                        aftersplit = Res[i].split('.');
                        addhtml += '<div class="widgetstyle"><div class="widgetCategory ui-draggable-bi" data-category="Charts"  style="background-image: url(&quot;/Linediagrams__BGImage/' + Res[i] + '&quot;);">'
                        addhtml += '<p style="margin-top:80px;" data-iconname=' + Res[i] + '>' + aftersplit[0] + '</p>'
                        addhtml += '<img src="../../images/close_button.png" style="float: right;margin-top:-120px;" class="delete_btn" /></div></div>'

                        //$("#droppable").css({ "background-image": 'url(../../Linediagrams__BGImage/' + JSON.parse(Res)[i] + ')', "background-repeat": "no-repeat" });
                    }

                    $('#bgImageDiv').append(addhtml);
                    $('.delete_btn').hide().click(function () {
                        deletebg_img($(this).siblings().attr('data-iconname'));

                    });
                    deletefunctnality1();
                }
            }
            //$(".drag").draggable({ revert: true, helper: "clone" });
        },
        cache: false,
        contentType: false,
        processData: false
    });

}
function deletefunctnality1() {


    $('.widgetstyle').hover(
    function () {
        $(this).find('.delete_btn').show();

        // $(this).parent().parent().find('.widgetstyle').css({ "background-color": "#fff", "border-radius": "6px", "box-shadow": "0 0 5px #888", "margin": "10px", "padding": "5px", "position": "relative" });
    },
    function () {
        $(this).find('.delete_btn').hide();
        //$(this).parent().parent().find(".widgetstyle").removeAttr("style");
    });

}
function openimage_BGDialog() {
    var chooser = '';
    chooser = $('#bgicon_Upload');
    chooser.change(function (evt) {
        var files = $('#bgicon_Upload')[0].files;
        $('#bgicon_FilePath').val(files[0].name);
    });
    chooser.trigger('click');
}

function deletebg_img(iconname1) {
    $.ajax({
        type: "POST",
        url: "../../EmsLineDiagram/deletebg_img",
        dataType: 'text',
        data: { iconname: iconname1 },
        async: false,
        success: function (Res) {
            //alert(Res);
            if (Res == "Image Deleted Successfully") {
                $('#bgImageDiv').empty();
                //$('.swipe-area').empty();
                //$('.swipe-area').append('<br/><br/><br/>');
                getbg_image();
                deletefunctnality1();
                $("#droppable").css('background-image', 'none');
                $("#droppable").css('background-repeat', 'none');
            }
            else {
                alert(Res);
            }

        }
    });

}



function showadvancepopup() {
    //alert("ss");
    $("#AdvancePropertiesdiv").dialog({ title: "Advanced Settings", width: "1180px" }).css("overflow", "hidden");
    $(".ui-widget-header").css({
        "background": "white",
        border: 0,
        padding: 0
    });
    $("#AdvancePropertiesdiv").width("100%");
    $("#lbl_RuleId").text($("#advancedprop").attr("data-id"));

    var node_id = $("#advancedprop").attr("data-id");
    var dd_options = "";
    $.ajax({
        url: "EmsLineDiagram/getallicons",
        type: "GET",
        data: {},
        async: false,
/*        cache: false,
        contentType: false,*/
        processData: false,
        success: function (resopnse) {
        	
            $("#Ddl_Img_Selector").empty();

            dd_options += "<option value='0'>--Select--</option>";
            if (resopnse == "[]" || resopnse == "") {
            }
            else {
            	
                for (var i = 0; i < resopnse.length; i++) {
                	if(resopnse[i].indexOf('.')!=-1)
                		{
                    var aftersplit = resopnse[i].split('.');
                    dd_options += "<option value=" + resopnse[i] + ">" + aftersplit[0] + "</option>";
                		}
                }
            }
            
            $("#Ddl_Img_Selector").append(dd_options);
        },
        error: function (data) {
            alert(data);
        }
    });
    //alert(JSON.stringify(advanceimgprop_array));
    if (advanceimgprop_array == "[]" || advanceimgprop_array == "") {
    	
        $('#duplicateli').empty();
        var AddTolist1 = "";
        AddTolist1 += '<ul class="unstyled params" style="list-style: none;padding:0px;"><li style="padding:0px;">'
        AddTolist1 += ' <span style="margin-left: 0px">Asset Id</span> <input id="Txt_Value_AssetTag_1" type="text" class="Txt_Value_AssetTag_1" style="margin-top: 10px; width: 100px;" />';
        AddTolist1 += '<span style="margin-left: 0px">Meter Id</span> <input id="Txt_Value_Meter_1" type="text" class="Txt_Value_Meter_1" style="margin-top: 10px; width: 100px;" />';
        AddTolist1 += '<span style="margin-left: 0px">Is Data</span>';
        AddTolist1 += ' <select id="Ddl_RelOperator_1" style="width: 80px;"><option value="0">Select</option><option value="==">==</option><option value="!=">!=</option>';
        AddTolist1 += '<option value="&gt;">&gt;</option><option value="&lt;">&lt;</option><option value="&gt;=">&gt;=</option><option value="&lt;=">&lt;=</option></select>';
        AddTolist1 += ' <input id="Txt_Value_1" type="text" class="Txt_Value_1" style="margin-top: 10px; width: 100px;" />';
        //AddTolist1 += ' <select id="Ddl_Img_Selector" class="Ddl_Img_Selector" style="width: 110px;"><option value="0">--Select--</option></select>';
        AddTolist1 += " <span style='margin-left: 0px'>Change Image To </span>";

        AddTolist1 += ' <input id="Txt_ImgUrl_1" type="text" class="Txt_ImgUrl_1" style="margin-top: 10px; width: 100px;" readonly="true" />';
        AddTolist1 += ' <a class="img_showpopup" id="img_showpopup" onclick="Img_showpopup(this)" style="cursor:pointer;">Select Image</a>';

        AddTolist1 += ' <select id="Ddl_LogicalOpe" style="width: 80px;"><option value="">Select</option><option value="AND">AND</option><option value="OR">OR</option></select>';
        AddTolist1 += ' <span class="rmbtn label-important" onclick="RemoveParams(this.parentNode)">--</span><span onclick="AddLogic()" class="addbtn label-info">+</span></li></ul>';
        $('#duplicateli').append(AddTolist1);
        
        $("#Ddl_Img_Selector").append(dd_options);
    }
    else {
        //var advanceimgprop = JSON.parse(advanceimgprop_array);

        if (advanceimgprop_array.length > 0) {
            $('#duplicateli').empty();
            var returndata = $.grep(advanceimgprop_array, function (element, index) {
                return element.node_id == node_id
            });
            // alert(returndata.length);
            if (returndata.length > 0) {
                for (var pc = 0; pc < advanceimgprop_array.length; pc++) {
                    if (advanceimgprop_array[pc]["node_id"] == node_id) {
                        //pathcolorobj.splice(pc, 1);
                        //alert(JSON.stringify(advanceimgprop_array[pc]["img_aaray"]));

                        var img_aaray = advanceimgprop_array[pc]["img_aaray"];
                        //alert(dd_options);
                        for (var i = 0; i < img_aaray.length; i++) {
                            var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                            //var AddTolist1 = "<ul class='unstyled params'>";

                            if (i == 0) {
                                var AddTolist1 = "";
                                AddTolist1 += '<ul class="unstyled params" style="list-style: none;padding:0px;"><li style="padding:0px;">';
                                AddTolist1 += ' <span style="margin-left: 0px">Asset Id</span> <input id="Txt_Value_AssetTag_1" type="text" class="Txt_Value_MeterTag_1" style="margin-top: 10px; width: 100px;" />';
                                AddTolist1 += ' <span style="margin-left: 0px">Meter Id</span> <input id="Txt_Value_Meter_1" type="text" class="Txt_Value_Param_1" style="margin-top: 10px; width: 100px;" />';

                                AddTolist1 += ' <span style="margin-left: 0px">Is Data</span>';
                                AddTolist1 += ' <select id="Ddl_RelOperator_1" style="width: 80px;"><option value="0">Select</option><option value="==">==</option><option value="!=">!=</option>';
                                AddTolist1 += '<option value="&gt;">&gt;</option><option value="&lt;">&lt;</option><option value="&gt;=">&gt;=</option><option value="&lt;=">&lt;=</option></select>';
                                AddTolist1 += ' <input id="Txt_Value_1" type="text" class="Txt_Value_1" style="margin-top: 10px; width: 100px;" />';
                                //AddTolist1 += ' <select id="Ddl_Img_Selector" class="Ddl_Img_Selector" style="width: 110px;"><option value="0">--Select--</option></select>';

                                AddTolist1 += " <span style='margin-left: 0px'>Change Image To </span>";
                                AddTolist1 += ' <input id="Txt_ImgUrl_1" type="text" class="Txt_ImgUrl_1" style="margin-top: 10px; width: 100px;" readonly="true" />';
                                AddTolist1 += ' <a class="img_showpopup" id="img_showpopup" onclick="Img_showpopup(this)" style="cursor:pointer;">Select Image</a>';

                                AddTolist1 += ' <select id="Ddl_LogicalOpe" style="width: 80px;"><option value="">Select</option><option value="AND">AND</option><option value="OR">OR</option></select>';
                                AddTolist1 += ' <span class="rmbtn label-important" onclick="RemoveParams(this.parentNode)">--</span><span onclick="AddLogic()" class="addbtn label-info">+</span></li></ul>';
                                $('#duplicateli').append(AddTolist1);


                                //$("#Ddl_Img_Selector").append(dd_options);
                                $("#Txt_Value_AssetTag_1").val(img_aaray[i]["Img_AssetTag_Val"]);
                                $("#Txt_Value_Meter_1").val(img_aaray[i]["Img_MeterTag_Val"]);
                                $("#Ddl_RelOperator_1").val(img_aaray[i]["Ddl_RelOperator"]);
                                $("#Txt_Value_1").val(img_aaray[i]["Select_ParamVal"]);
                                $("#Txt_ImgUrl_1").val(img_aaray[i]["Select_ImgName"]);
                                var selecte_ImgUrl = img_aaray[i]["Select_ImgUrl"];
                                $("#Txt_ImgUrl_1").attr("data-imgurl", selecte_ImgUrl);
                                $("#Ddl_LogicalOpe").val(img_aaray[i]["Ddl_LogOperator"]);
                            }
                            else {
                                var $AddTolist = $('#duplicateli');
                                var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                                var AddTolist1 = "";
                                AddTolist1 += "<li style='padding:0px;'>";
                                AddTolist1 += " <span style='margin-left: 0px'>Asset Id</span> <input id='Txt_Value_AssetTag_" + FieldCount + "' type='text' class='Txt_Value_MeterTag_1' style='margin-top: 10px; width: 100px;' />";
                                AddTolist1 += " <span style='margin-left: 0px'>Meter Id</span> <input id='Txt_Value_Meter_" + FieldCount + "' type='text' class='Txt_Value_Param_1' style='margin-top: 10px; width: 100px;' />";
                                AddTolist1 += " <span style='margin-left: 0px'>Is Data </span> <select id='Ddl_RelOperator_" + FieldCount + "' style='width:80px;'>";
                                AddTolist1 += "<option  value='0'>Select</option><option value='=='>==</option> <option value='!='>!=</option><option value='&gt;'>&gt;</option><option value='&lt;'>&lt;</option><option value='&gt;='>&gt;=</option>";
                                AddTolist1 += "<option value='&lt;='>&lt;=</option></select> <input type='text' style='margin-top: 10px;width:100px;' name='Txt_Value' id='Txt_Value_" + FieldCount + "'>";
                                //AddTolist1 += " <select id='Ddl_Img_Selector_" + FieldCount + "' class='Ddl_Img_Selector' style='width:110px;'><option  value='0'>--Select--</option></select>";

                                AddTolist1 += " <span style='margin-left: 0px'>Change Image To </span>";
                                AddTolist1 += " <input id='Txt_ImgUrl_1_" + FieldCount + "' type='text' class='Txt_ImgUrl_1' style='margin-top: 10px; width: 100px;' readonly='true'  />";
                                AddTolist1 += ' <a class="img_showpopup" id="img_showpopup_"' + FieldCount + '" onclick="Img_showpopup(this)" style="cursor:pointer;">Select Image</a>';

                                AddTolist1 += " <select id='Ddl_LogicalOpe_" + FieldCount + "' style='width:80px;'><option value=''>Select</option><option value='AND'>AND</option><option value='OR'>OR</option></select> <span onclick='RemoveParams(this.parentNode)' class='rmbtn label-important'>--</span>";
                                AddTolist1 += "<span class='addbtn label-info' onclick='AddLogic()'>+</span></li>";
                                //$('#duplicateli1').append(AddTolist1);
                                //$('#duplicateli1').append(AddTolist1);
                                $(AddTolist1).appendTo($AddTolist.find('ul'));
                                //$AddTolist2 = $('#duplicateli1');
                                //$AddTolist2.find('li:last').clone(true).appendTo($AddTolist.find('ul'));

                                //$("#Ddl_Img_Selector_" + FieldCount).append(dd_options);




                                $("#Txt_Value_AssetTag_" + FieldCount).val(img_aaray[i]["Img_AssetTag_Val"]);
                                $("#Txt_Value_Meter_" + FieldCount).val(img_aaray[i]["Img_MeterTag_Val"]);
                                $("#Ddl_RelOperator_" + FieldCount).val(img_aaray[i]["Ddl_RelOperator"]);
                                $("#Txt_Value_" + FieldCount).val(img_aaray[i]["Select_ParamVal"]);
                                $("#Txt_ImgUrl_1_" + FieldCount).val(img_aaray[i]["Select_ImgName"]);
                                var selecte_ImgUrl = img_aaray[i]["Select_ImgUrl"];
                                $("#Txt_ImgUrl_1_" + FieldCount).attr("data-imgurl", selecte_ImgUrl);
                                $("#Ddl_LogicalOpe_" + FieldCount).val(img_aaray[i]["Ddl_LogOperator"]);
                            }
                        }
                    }
                }
            }
            else {
                $('#duplicateli').empty();
                var AddTolist1 = "";
                AddTolist1 += '<ul class="unstyled params" style="list-style: none;padding:0px;"><li style="padding:0px;">';
                AddTolist1 += ' <span style="margin-left: 0px">Asset Id</span> <input id="Txt_Value_AssetTag_1" type="text" class="Txt_Value_MeterTag_1" style="margin-top: 10px; width: 100px;" />';
                AddTolist1 += ' <span style="margin-left: 0px">Meter Id</span> <input id="Txt_Value_Meter_1" type="text" class="Txt_Value_Param_1" style="margin-top: 10px; width: 100px;" />';
                AddTolist1 += ' <span style="margin-left: 0px">Is Data</span>';
                AddTolist1 += ' <select id="Ddl_RelOperator_1" style="width: 80px;"><option value="0">Select</option><option value="==">==</option><option value="!=">!=</option>';
                AddTolist1 += '<option value="&gt;">&gt;</option><option value="&lt;">&lt;</option><option value="&gt;=">&gt;=</option><option value="&lt;=">&lt;=</option></select>';

                AddTolist1 += ' <input id="Txt_Value_1" type="text" class="Txt_Value_1" style="margin-top: 10px; width: 100px;" />';
                AddTolist1 += " <span style='margin-left: 0px'>Change Image To </span>";
                AddTolist1 += ' <input id="Txt_ImgUrl_1" type="text" class="Txt_ImgUrl_1" style="margin-top: 10px; width: 100px;" readonly="true"  />';
                AddTolist1 += ' <a class="img_showpopup" id="img_showpopup" onclick="Img_showpopup(this)" style="cursor:pointer;">Select Image</a>';
                //AddTolist1 += ' <select id="Ddl_Img_Selector" class="Ddl_Img_Selector" style="width: 110px;"><option value="0">--Select--</option></select>';
                AddTolist1 += ' <select id="Ddl_LogicalOpe" style="width: 80px;"><option value="">Select</option><option value="AND">AND</option><option value="OR">OR</option></select>';
                AddTolist1 += ' <span class="rmbtn label-important" onclick="RemoveParams(this.parentNode)">--</span><span onclick="AddLogic()" class="addbtn label-info">+</span></li></ul>';
                $('#duplicateli').append(AddTolist1);
                //alert(AddTolist1);

                // $("#Ddl_Img_Selector").append(dd_options);
            }
        }
    }





}


function AddLogic() {
    //alert("AddLogic");
    var $AddTolist = $('#duplicateli');
    var FieldCount = Math.floor((Math.random() * 7683480) + 198);
    //var AddTolist1 = "<ul class='unstyled params'>";
    var AddTolist1 = "";
    AddTolist1 += "<li style='padding:0px;'>";
    AddTolist1 += " <span style='margin-left: 0px'>Asset Id</span> <input id='Txt_Value_AssetTag_" + FieldCount + "' type='text' class='Txt_Value_MeterTag_1' style='margin-top: 10px; width: 100px;' />";
    AddTolist1 += "<span style='margin-left: 0px'>Meter Id</span> <input id='Txt_Value_Meter_" + FieldCount + "' type='text' class='Txt_Value_Param_1' style='margin-top: 10px; width: 100px;' />";
    AddTolist1 += "<span style='margin-left: 0px'>Is Data</span> <select id='Ddl_RelOperator_" + FieldCount + "' style='width:80px;'>";
    AddTolist1 += "<option  value='0'>Select</option><option value='=='>==</option> <option value='!='>!=</option><option value='&gt;'>&gt;</option><option value='&lt;'>&lt;</option><option value='&gt;='>&gt;=</option>";
    AddTolist1 += "<option value='&lt;='>&lt;=</option></select> <input type='text' style='margin-top: 10px;width:100px;' name='Txt_Value' id='Txt_Value_" + FieldCount + "'>";
    //AddTolist1 += " <select id='Ddl_Img_Selector_" + FieldCount + "' class='Ddl_Img_Selector' style='width:110px;'><option  value='0'>--Select--</option></select>";
    AddTolist1 += " <span style='margin-left: 0px'>Change Image To </span>";
    AddTolist1 += ' <input id="Txt_ImgUrl_1_"' + FieldCount + '" type="text" class="Txt_ImgUrl_1" style="margin-top: 10px; width: 100px;" readonly="true"  />';
    AddTolist1 += ' <a class="img_showpopup" id="img_showpopup_"' + FieldCount + '" onclick="Img_showpopup(this)" style="cursor:pointer;">Select Image</a>';

    AddTolist1 += " <select id='Ddl_LogicalOpe_" + FieldCount + "' style='width:80px;'><option value=''>Select</option><option value='AND'>AND</option><option value='OR'>OR</option></select> <span onclick='RemoveParams(this.parentNode)' class='rmbtn label-important'>--</span>";
    AddTolist1 += "<span class='addbtn label-info' onclick='AddLogic()'>+</span></li>";
    //$('#duplicateli1').append(AddTolist1);
    //alert("AddLogic");

    $(AddTolist1).appendTo($AddTolist.find('ul'));
    //$AddTolist2 = $('#duplicateli1');
    //$AddTolist2.find('li:last').clone(true).appendTo($AddTolist.find('ul'));

    //$.ajax({
    //    url: "../../EmsLineDiagram/getallicons",
    //    type: "GET",
    //    data: {},
    //    async: false,
    //    cache: false,
    //    contentType: false,
    //    processData: false,
    //    success: function (resopnse) {
    //        var dd_img = "Ddl_Img_Selector_" + FieldCount;
    //        $("#" + dd_img).empty();
    //        var dd_options = "";
    //        dd_options += "<option value=''>--Select--</option>";
    //        if (resopnse == "[]" || resopnse == "") {
    //        }
    //        else {
    //            for (var i = 0; i < JSON.parse(resopnse).length; i++) {
    //                var aftersplit = JSON.parse(resopnse)[i].split('.');
    //                dd_options += "<option value=" + JSON.parse(resopnse)[i] + ">" + aftersplit[0] + "</option>";
    //            }
    //        }
    //        $("#Ddl_Img_Selector_" + FieldCount).append(dd_options);
    //    },
    //    error: function (data) {
    //        alert(data);
    //    }
    //});


}

function RemoveParams(childElm) {
    var parentElm = childElm.parentNode;
    parentElm.removeChild(childElm);
}

function Img_showpopup(obj) {
    $.ajax({
        url: "EmsLineDiagram/getallicons",
        type: "GET",
        data: {},
        async: false,
        /*cache: false,
        contentType: false,*/
        processData: false,
        success: function (Res) {
        	
            var addhtml = ''; var aftersplit = '';
            for (var i = 0; i < Res.length; i++) {
            	if(Res[i].indexOf('.')!=-1)
            		{
                aftersplit = Res[i].split('.');
                addhtml += '<div class="widgetstyle"><div class="widgetCategory ui-draggable-bi" data-category="Charts"  style="background-image: url(&quot;/Linediagrams__Icon/' + Res[i] + '&quot;);">'
                addhtml += '<p style="margin-top:80px;" data-iconname=' + Res[i] + '>' + aftersplit[0] + '</p>'
                addhtml += '</div></div>'
                //addhtml += '<img src="../../images/close_button.png" style="float: right;margin-top:-120px;" class="delete_btn" /></div></div>'
            		}
            }
            
            $('#ViewImagesDiv').append(addhtml);
            $("#Imagespopup").dialog({
                width: 916,
                height: 500,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                },
                position: ['top', 70, 'left', 190],
                modal: true
            });
            //get_SelectedImage(obj);
            $(".widgetstyle").unbind("click");
            $(".widgetstyle").click(function () {
                var selecte_ImgName = $(this).children().find('p').text();
                var selecte_ImgUrl = $(this).find("div").css("background-image").replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

                //var foldernamepath = (selecte_ImgUrl.split('/')[selecte_ImgUrl.split('/').length - 2]);
                //var imgnamepath = (selecte_ImgUrl.split('/')[selecte_ImgUrl.split('/').length - 1]);
                //alert("/" + foldernamepath + "/" + imgnamepath);

                $(obj).parent().find('input').eq('3').val(selecte_ImgName);
                $(obj).parent().find('input').eq('3').attr("data-imgurl", selecte_ImgUrl);
                $("#Imagespopup").dialog('close');
            });

        },
        error: function (error) {
            alert(error)
        }
    });
}
function Submit_AdvanceImgProp() {
    var node_id = $("#lbl_RuleId").text();
    //alert(node_id);
    var img_aaray = [];
    var flag = 0;
    var cnt = $("#duplicateli").find("ul li").length;
    $("#duplicateli").find("ul li").each(function (index) {

        var Img_AssetTag_Val = $(this).find('input').eq(0).val();
        var Img_MeterTag_Val = $(this).find('input').eq(1).val();
        var Ddl_RelOperator = $(this).find('select').eq(0).val();
        var Select_ParamVal = $(this).find('input').eq(2).val();
        //var Ddl_SelectedImg = $(this).find('select').eq(1).val();
        var Select_ImgName = $(this).find('input').eq(3).val();
        var Select_ImgUrl = $(this).find('input').eq(3).attr("data-imgurl");
        var Ddl_LogOperator = $(this).find('select').eq(1).val();
        //alert(Img_MeterTag_Val);
        //alert(Img_TagParameter_Val);

        if (Img_AssetTag_Val == "") {
            flag = flag + 1;
            $(this).find('input').eq(0).css('border-color', 'red');
        }
        else {
            $(this).find('input').eq(0).css('border-color', '#ccc');
        }
        if (Img_MeterTag_Val == "") {
            flag = flag + 1;
            $(this).find('input').eq(1).css('border-color', 'red');
        }
        else {
            $(this).find('input').eq(1).css('border-color', '#ccc');
        }

        if (Ddl_RelOperator == "0") {
            flag = flag + 1;
            $(this).find('select').eq(0).css('border-color', 'red');
        }
        else {
            $(this).find('select').eq(0).css('border-color', '#ccc');
        }
        if (Select_ParamVal == "") {
            flag = flag + 1;
            $(this).find('input').eq(2).css('border-color', 'red');
        }
        else {
            $(this).find('input').eq(2).css('border-color', '#ccc');
        }
        if (Select_ImgUrl == "") {
            flag = flag + 1;
            $(this).find('input').eq(3).css('border-color', 'red');
        }
        else {
            $(this).find('input').eq(3).css('border-color', '#ccc');
        }

        //if (Ddl_SelectedImg == "") {
        //    flag = flag + 1;
        //    $(this).find('select').eq(1).css('border-color', 'red');
        //}
        //else {
        //    $(this).find('select').eq(1).css('border-color', '#ccc');
        //}
        if (index == cnt - 1) {

        }
        else {
            if (Ddl_LogOperator == "") {
                flag = flag + 1;
                $(this).find('select').eq(1).css('border-color', 'red');
            }
            else {
                $(this).find('select').eq(1).css('border-color', '#ccc');
            }
        }
    });
    if (flag > 0) {
    }
    else {
        $("#duplicateli").find("ul li").each(function () {

            var Img_AssetTag_Val = $(this).find('input').eq(0).val();
            var Img_MeterTag_Val = $(this).find('input').eq(1).val();
            var Ddl_RelOperator = $(this).find('select').eq(0).val();
            var Select_ParamVal = $(this).find('input').eq(2).val();
            //var Ddl_SelectedImg = $(this).find('select').eq(1).val();

            var Select_ImgName = $(this).find('input').eq(3).val();
            var Select_ImgUrl = $(this).find('input').eq(3).attr("data-imgurl");
            var Ddl_LogOperator = $(this).find('select').eq(1).val();

            img_aaray.push({
                Img_AssetTag_Val: Img_AssetTag_Val,
                Img_MeterTag_Val: Img_MeterTag_Val,
                Ddl_RelOperator: Ddl_RelOperator,
                Select_ParamVal: Select_ParamVal,
                Select_ImgName: Select_ImgName,
                Select_ImgUrl: Select_ImgUrl,
                Ddl_LogOperator: Ddl_LogOperator
            });
        });
        //alert(JSON.stringify(img_aaray));

        if (advanceimgprop_array.length > 0) {
            for (var pc = 0; pc < advanceimgprop_array.length; pc++) {
                if (advanceimgprop_array[pc]["node_id"] == node_id) {
                    advanceimgprop_array.splice(pc, 1);
                }
            }
        }
        //alert(JSON.stringify(advanceimgprop_array));
        advanceimgprop_array.push({
            "node_id": node_id,
            "img_aaray": img_aaray
        });
        $("#AdvancePropertiesdiv").dialog("close");
    }
    //alert(JSON.stringify(advanceimgprop_array));
}


function Cancle_AdvanceImgProp() {
    $("#AdvancePropertiesdiv").dialog("close");
    //$("#duplicateli").empty(); $("#duplicateli1").empty();
    //$("#lbl_RuleId").text("")
    //AddLogic();
}





//....code for advanced properties of HMI diagram--------> Murali.G ......//



function openproject() {
    $.ajax({
        url: '../../Drawings/getemsfiles',
        type: 'POST',
        async: false,
        success: function (result) {
            $("body").append("<div id='tempdiv'>" + result + "</div>");
            $('#tempdiv').dialog({ title: 'Select Report', modal: true, width: "400px" });
        }
    });

}

function rmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete</button><br/><button class='btn' style='width:120px' onclick='Properties(\"" + rn + "\")'>Properties</button></div>")
                         .appendTo("body")
                         .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });
}

function lblmenu(id) {
    var rn = $(id).attr("id");
    $(id).bind("contextmenu", function (event) {
        event.preventDefault();
        $("<div class='custom-menu' id='" + rn + "class' ><button class='btn' style='width:120px' onclick='deletenode(\"" + rn + "\")'>Delete</button><br/><button class='btn' style='width:120px' onclick='Properties(\"" + rn + "\")'>Properties</button><br/><button class='btn' style='width:120px' onclick='textProperties(\"" + rn + "\")'>Text Properties</button></div>")
                             .appendTo("body")
                            .css({ top: event.pageY + "px", left: event.pageX + "px", position: "absolute" });
    });


}


function getfile() {

    var filename = $("#emsdoc").val();
  

    $('#tempdiv').remove();
    $.ajax({
        url: '../../Drawings/GetData',
        type: 'POST',
        data: { filename: filename },
        success: function (result) {
            $("body").attr("data-filename", filename);

            var blocks = jQuery.parseJSON(result.blocks);
            var connections = jQuery.parseJSON(result.connections);
            var DataNodes = jQuery.parseJSON(result.DataNodes);


            for (var i = 0; i < DataNodes.length; i++) {
                var rn = DataNodes[i].id;
                $("#datasetlist").empty();
                $("#datasetlist").append("<div id='" + rn + "'></div>");
                var node = document.getElementById(rn);
                $.ajax({
                    url: '../../Report/getxml',
                    type: 'POST',
                    async: false,
                    data: { url: DataNodes[i].url, method: DataNodes[i].method, param: JSON.stringify(DataNodes[i].params) },
                    success: function (result) {
                        // alert(result);
                        $("#leftcolumn").html(result.tablecoulumns);
                        Createdata(rn, DataNodes[i].url, DataNodes[i].method, DataNodes[i].params);

                    }
                });
            }

            for (var i = 0; i < blocks.length; i++) {
                var nodecolor;
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
                    $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute" });
                }


                else {
                    if (blocks[i].class) {
                        var cssclass = blocks[i].class;
                        var test = cssclass.indexOf("rotate");
                        var popupval = "NO";
                        if (blocks[i].popup) {
                            popupval = blocks[i].popup;
                        }

                        var fsize = "small";
                        var seletedfont = "0.6em;"
                        if (blocks[i].fontsize) {
                            seletedfont = blocks[i].fontsize;
                        }

                        if (seletedfont == "x-small") {
                            fsize = "x-small";
                            seletedfont = "0.5em";
                        }
                        else if (seletedfont == "small") {
                            fsize = "small";
                            seletedfont = "0.6em";
                        }
                        else if (seletedfont == "medium") {
                            fsize = "medium";
                            seletedfont = "1em";
                        }
                        else if (seletedfont == "large") {
                            fsize = "large";
                            seletedfont = "2em";
                        }
                        else if (seletedfont == "x-large") {
                            fsize = "x-large";
                            seletedfont = "2.5em";
                        }
                        else {
                            fsize = "small";
                            seletedfont = "0.6em";
                        }

                        if (test == -1) {

                            $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" data-popup="' + popupval + '"  data-fontsize="' + fsize + '"   data-drillto="' + drillvalue + '"  style="color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;max-height:40px;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');

                            lblmenu(document.getElementById(blocks[i].blockId));

                            $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute", "overflow": "auto" });
                        }
                        else {
                            $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn"  data-popup="' + popupval + '" data-fontsize="' + fsize + '"  data-drillto="' + drillvalue + '"   style="color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;max-height:40px;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');
                            $("#" + blocks[i].blockId + "").addClass("rotate");
                            lblmenu(document.getElementById(blocks[i].blockId));
                            $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute", "overflow": "auto" });
                        }
                    }
                    else {
                        $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn"  data-popup="' + popupval + '"  data-fontsize="' + fsize + '"  data-drillto="' + drillvalue + '"   style="color:' + nodecolor + ';word-wrap:break-word;width:' + blocks[i].width + 'px;max-height:40px;font-size:' + seletedfont + ';"  >' + blocks[i].val + '</div>');

                        lblmenu(document.getElementById(blocks[i].blockId));

                        $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX) - 4) + "px", position: "absolute", "overflow": "auto" });
                    }


                    $("#" + blocks[i].blockId + "").resizable();
                    $(".ui-resizable-e").width("0px");
                    $(".ui-resizable-s").height("0px");
                    $("#" + blocks[i].blockId + "").css("border", "1px solid black");
                }





            }
            jsPlumb.draggable($(".dragn"));

            for (var i = 0; i < connections.length; i++) {

                var conn = jsPlumb.connect({
                    source: '' + connections[i].pageSourceId + '',
                    target: '' + connections[i].pageTargetId + '',
                    paintStyle: { lineWidth: 0.7, strokeStyle: 'rgba(0, 0, 0, 0.5)' },
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


        },
        error: function () { alert("error"); }
    });


}





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
    $($("#column_names").html()).insertAfter("#sds");

    $(".lis").draggable({
        helper: "clone",
        revert: "invalid",
        stack: "#labeltext"
    });

    $(".lin").draggable({
        helper: "clone",
        revert: "invalid",
        stack: "#labeltext"
    });

    $(".lin").click(function () {

        $("#labeltext").val($("#labeltext").val() + "##" + $(this).html() + "##");
        changelblvalue();
        if ($(".ui-dialog").css("display") == "block")
            alert("<" + $(this).html() + ">  Added To Label Value");
    });

    $(".lis").click(function () {
        $("#labeltext").val($("#labeltext").val() + "##" + $(this).html() + "##");
        changelblvalue();
        if ($(".ui-dialog").css("display") == "block")
            alert("<" + $(this).html() + ">  Added To Label Value");
    });
    $("#labeltext").droppable({
        hoverClass: 'active',
        drop: function (event, ui) {

            this.value = this.value + "##" + $(ui.draggable).text() + "##";
        }
    });


    $('#filterTxt').keyup(function () {

        var searchText = $(this).val();

        $('.lis').each(function () {
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            $(this).toggle(showCurrentLi);

        });
        $('.lin').each(function () {
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            $(this).toggle(showCurrentLi);

        });
    });
}


//new
$(function () {
    $('.side-button').css("top", "13px");
    $('.side-button').click(function () {
        $('.sidebar').toggleClass("left");
        $('.list').toggleClass("top");
    });
    $(document).bind("click", function (event) {

        $("div.custom-menu").hide();
    });


    $(".drag").draggable({ revert: true, helper: "clone" });
    $("#droppable").droppable({
        accept: ".drag",
        drop: function (event, ui) {
            var s = ui.draggable.attr("id");
            var imgsrc = ui.draggable.attr("src")
            switch (s) {

                case "islabel":
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 454566));
                    if (rn) {

                        rn = rn.replace(/\s+/g, "_");

                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...")
                            return false;
                        }
                        else {
                            $("#droppable").append('<div id="' + rn + '" class="dragn" data-popup="NO"  data-fontsize="small"  data-drillto="None" style="word-wrap:break-word;width:70px;font-size:0.7em;max-height:40px;">Text</div>');
                            $("#" + rn + "").resizable();
                            $(".ui-resizable-e").width("0px");
                            $(".ui-resizable-s").height("0px");
                            $("#" + rn + "").css({ top: ((event.pageY) - 15) + "px", left: ((event.pageX) - 23) + "px", position: "absolute", border: "1px solid black", "overflow": "auto" });
                            lblmenu(document.getElementById(rn));
                            jsPlumb.draggable($(".dragn"));
                        }
                    }
                    else {
                        return false;
                    }

                    break;
                default:
                    var rn = prompt("Enter Node Name", parseInt(Math.random() * 354566));
                    if (rn) {
                        rn = rn.replace(/\s+/g, "_");
                        var nodecheck = document.getElementById(rn);
                        if ($(nodecheck).length) {
                            alert("This Name Already Exists...!")
                            return false;
                        }
                        else {
                            $("#droppable").append('<img src="' + imgsrc + '" class="dragn" id="' + rn + '" data-popup="None" data-drillto="None"  onload="rmenu(this)" />');
                           //alert(event.pageY);
                            $("#" + rn + "").css({ top: ((event.pageY) - 9) + "px", left: ((event.pageX) - 15) + "px", position: "absolute" });
                            jsPlumb.draggable($(".dragn"));
                        }
                        break;
                    }
                    else {
                        return false;
                    }
            }

        }
    });
});





//delete nodes
function deletenode(rn) {


    $("#" + rn + "").remove();
    $("#" + rn + "class").remove();

}


function deleteline(rn) {


    $("#" + rn + "").remove();
    $("#" + rn + "class").remove();
}


//get list of nodes......
function getnodes(rn) {
    var options = "<option>Select Node</option>"; ;
    $("#lineto").empty();
    $(".dragn").each(function () {
        if (rn != $(this).attr("id"))
            options += "<option>" + $(this).attr("id") + "</option>";
    });

    $("#lineto").append(options);
}



//node poperties
function Properties(rn) {

    $("#gaugeid").val(rn);
    $("#gaugeid").attr("data-preid", rn);
    getnodes(rn);
    $("#GlobalGaugetable").dialog({ title: "Node Settings", width: "500px" }).css("overflow", "hidden");
    $("#GlobalGaugetable").width("100%");
    if ($("#" + rn + "").attr("data-drillto") == "undefined") {
        $('#imgtargetfile').val("None");
        $("#" + rn + "").attr("data-drillto", "None");
    }
    else {
        $('#imgtargetfile').val($("#" + rn + "").attr("data-drillto"));
    }
}

function connect() {


    var selectedNode = $('#lineto').find(":selected").text();

    var currentnode = $("#gaugeid").val();

    var anchor1 = $('#spos').find(":selected").text();

    $("#" + $("#gaugeid").val() + "").attr("data-popup", $('#imgshowpopup').val());
    if ($('#imgtargetfile').val() != "") {

        $("#" + $("#gaugeid").val() + "").attr("data-drillto", $('#imgtargetfile').val());
    }


    else {
        alert("Drill Can Not be Empty");
        $('#imgtargetfile').focus();
        return false;
    }


    var anchor2 = $('#dpos').find(":selected").text();
    if (selectedNode == "Select Node") {
        return false;

    }
    else {
        draw(currentnode, selectedNode, anchor1, anchor2);
    }

}

function draw(currentnode, selectedNode, anchor1, anchor2) {
    var conn = jsPlumb.connect({
        source: '' + currentnode + '',
        target: '' + selectedNode + '',
        paintStyle: { lineWidth: 0.7, strokeStyle: 'rgba(0, 0, 100, 0.5)' },
        anchors: ["" + anchor1 + "", "" + anchor2 + ""],
        connector: ["Flowchart"],
        hoverPaintStyle: { strokeStyle: "red", lineWidth: 7 },
        endpoint: ["Rectangle", { width: 2, height: 3}]
    });

    conn.bind("click", function (conn) {
        var r = confirm("Are You Sure Delete!")
        if (r == true) {
            jsPlumb.detach(conn);
            jsPlumb.deleteEndpoint(conn);
        }
    });

}


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

function textProperties(id) {
    $("#TextPoperties").dialog({ title: "Label Settings", width: "500px" }).css("overflow", "hidden");
    $("#TextPoperties").width("100%");
    $("#lblid").val(id);
    $("#labeltext").val($("#" + id + "").text());
    $('#lblfontsize').val($("#" + id + "").attr('data-fontsize'));
    $('#lblwidth :selected').text($("#" + id + "").css('width').replace("px", ""));
    $('#txttargetfile').val($("#" + id + "").attr("data-drillto"));
    $('#txtshowpopup').val($("#" + id + "").attr("data-popup"));

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

    $("#" + id + "").html(textval);
    $("#" + id + "").resizable("destroy").resizable();
    $(".ui-resizable-e").width("0px");
    $(".ui-resizable-s").height("0px");
    $("#" + id + "").width($("#lblwidth").val());
    $("#" + id + "").css("color", $("#lblforecolor").val());

    var seletedfont = $('#lblfontsize :selected').text();
    $("#" + id + "").attr('data-fontsize', seletedfont);
    if (seletedfont == "x-small")
        seletedfont = "0.5em";
    else if (seletedfont == "small")
        seletedfont = "0.6em";
    else if (seletedfont == "medium")
        seletedfont = "1em";
    else if (seletedfont == "large")
        seletedfont = "2em";
    else if (seletedfont == "x-large")
        seletedfont = "2.5em";
    else
        seletedfont = "0.59em";

    $("#" + id + "").css("font-size", seletedfont);




    if ($("#isroteate").val() == "YES") {
        $("#" + id + "").addClass("rotate");
        //$("#" + id + "").css({ "max-height": "auto" });
    }
    else {
        $("#" + id + "").removeClass("rotate");
        // $("#" + id + "").css({ "max-height": "40px", "overflow": "auto" });
    }


}

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
    //  alert(JSON.stringify(jsPlumb.getConnections()));
    $.each(jsPlumb.getConnections(), function (idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId,
            SourceAnchor: connection.endpoints[0].anchor.type,
            TargetAnchor: connection.endpoints[1].anchor.type
        });
    });

    var serializedData = JSON.stringify(connections);

    var blocks = [];
    var DataNodes = [];

    var $datanodes = $("#datasetlist").find(".box");
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

    $(".dragn").each(function (idx, elem) {
        var $elem = $(elem);
        var left = parseInt($elem.css("left"), 10);   //((parseInt($elem.css("left"), 10))* 100)/parseInt($(window).width());
        var top = parseInt($elem.css("top"), 10); //((parseInt($elem.css("top"), 10))* 100)/parseInt($(window).height());

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
                fontcolor: $(elem).css('color'),
                Drllto: $(elem).attr("data-drillto"),
                popup: $(elem).attr("data-popup"),
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
    var Dbinfo = JSON.stringify(DataNodes);
    var filename = prompt("Enter Project Name", fname);
    if (filename) {
        // do something with the input

        $.ajax({
            url: '../../Drawings/savedata',
            type: 'POST',
            data: { blocks: serializedData1, connections: serializedData, DataNodes: Dbinfo, filename: filename },

            success: function (result) {

                alert(result);

            },
            error: function () { alert("error"); }
        });

    }

}
   
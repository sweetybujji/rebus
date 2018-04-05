
$(document).ready(function () {

    $('.side-button').click(function () {
        $('.sidebar').toggleClass("left");
        $('.list').toggleClass("top");
    });


    $.ajax({
        url: '../../EmsLineDiagram/getemsfilesliui',
        type: 'POST',
        async: false,
        success: function (result) {
            $(".list").append(result);
            $('.filterli').click(function () {
                $(this).addClass("liselected");
                $(this).siblings().removeClass("liselected");
            });

        }
    });

    $.ajax({
        url: '../../EmsLineDiagram/getkwhvalues',
        type: 'GET',
        async: false,
        success: function (result) {
            if (result.meterdic) {
                $("#tempkwh").data("meterdic", result.meterdic);
                //$("#dkw").show();
                // $("#maindate").show(); 
                //$("#datekw").html(result.datekwh);
            }
            else {
                //  alert(result.error);
                $("#tempkwh").data("meterdic", null);
            }
        }
    });


    $.ajax({
        url: '../../EmsLineDiagram/getMeterNames',
        type: 'GET',
        async: false,
        success: function (result) {
            if (result.meterdic)
                $("#tempdata").data("meterdic", result.meterdic);
            else
                $("#tempdata").data("meterdic", null);
        }
    });






    $('#filterTxt').keyup(function () {

        var searchText = $(this).val();

        $('.filterli').each(function () {
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            $(this).toggle(showCurrentLi);

        });
    });

});



function getdrill(node) {
    var drillfile = $(node).attr("data-drillto");
    if (drillfile == "None") {
        return false;
    }
    else {
        if (drillfile != 'undefined') {
            var ispopup = $(node).attr("data-popup");
            if (ispopup == "YES") {
                $.colorbox({ href: '../../EmsLineDiagram/datatable?Input=' + drillfile + '&panel=' + $("body").data("filename") + '', iframe: true, width: '100%', height: '90%' });
                $("#colorbox").css({ "background-color": "steelblue", width: "100%", height: "90%" });
            } else {

                getemsreport(drillfile + ".xml", "refresh");

            }
        }

    }

}

function getemsreport(filename, from) {
    try {
        if (from != "refresh") {
            $('.sidebar').toggleClass("left");
            $('.list').toggleClass("top");
        }

        $("body").data("filename", filename);


        $("#droppable").empty();

        $.ajax({
            url: '../../EmsLineDiagram/GetData',
            type: 'POST',
            data: { filename: filename },
            async: false,
            success: function (result) {

                if (result.errorresult) {
                    alert(result.errorresult);
                    return false;
                }
                var mdata;

                if ($("#tempdata").data("meterdic") != null) {

                    mdata = JSON.parse($("#tempdata").data("meterdic"));
                }

                var kwhdata;

                if ($("#tempkwh").data("meterdic") != null) {

                    kwhdata = JSON.parse($("#tempkwh").data("meterdic"));
                }

                var blocks = jQuery.parseJSON(result.blocks);
                var connections = jQuery.parseJSON(result.connections);
                //var DataNodes = jQuery.parseJSON(result.DataNodes);
                var container = jQuery.parseJSON(result.container);
                for (var i = 0; i < container.length; i++) {
                    $("#droppable").css("left", container[i].positionX);
                    $("#droppable").css("top", container[i].positionY);
                    $("#droppable").css("width", container[i].width + "px");
                    $("#droppable").css("height", container[i].height + "px");
                }




                for (var i = 0; i < blocks.length; i++) {


                    var drillvalue;
                    if (blocks[i].Drllto) {
                        drillvalue = blocks[i].Drllto;

                    }
                    else {
                        drillvalue = blocks[i].Drllto;

                    }

                    if (blocks[i].islabel == "false") {

                        var popupval = "NO";
                        if (blocks[i].popup) {
                            popupval = blocks[i].popup;
                        }
                        if (blocks[i].imgsrc != "../../htmlfiles/symbols/Dot-16.png") {
                            $("#droppable").append('<img src="' + blocks[i].imgsrc + '" class="dragnx" id="' + blocks[i].blockId + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  onclick="getdrill(this)"  />');
                        }
                        else {
                            $("#droppable").append('<img src="' + blocks[i].imgsrc + '" class="dragnx"  style="visibility: hidden"   id="' + blocks[i].blockId + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  onclick="getdrill(this)"  />');
                        }

                        if (blocks[i].popup) {
                            if (!isNaN(drillvalue)) {
                                if (mdata[drillvalue] != null || mdata[drillvalue] != "") {
                                    $("#" + blocks[i].blockId + "").attr("title", mdata[drillvalue]);
                                    $("#" + blocks[i].blockId + "").attr("class", "live-tipsy");
                                    $("#" + blocks[i].blockId + "").css("cursor", "pointer");

                                }
                            }

                        }
                        $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });

                    }
                    else {
                        var nodecolor = "black";
                        nodecolor = blocks[i].fontcolor;

                        var backcolor = blocks[i].backcolor;
                        var popupval = "NO";
                        if (blocks[i].popup) {
                            popupval = blocks[i].popup;
                        }
                        var textdata = blocks[i].val
                        var tempid = textdata;
                        var newval = new String();
                        newval = textdata;
                        if (textdata.indexOf("**") !== -1) {

                            textdata = textdata.replace("**", "");
                            if (kwhdata[textdata] != null || kwhdata[textdata] != "") {
                                newval = kwhdata[textdata];

                                if (typeof newval != 'undefined') {
                                    newval = parseInt(newval);
                                }
                                else {
                                    newval = "00";

                                }
                            }
                            else {
                                newval = "00";
                            }
                        }


                        var cssclass = blocks[i].class;
                        if (blocks[i].class) {
                            var seletedfont = blocks[i].fontsize;

                            var cssclass = blocks[i].class;
                            var test = cssclass.indexOf("rotate");
                            if (test == -1) {
                                $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)" data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;text-align:center;min-height:30px;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');

                                $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });
                            }
                            else {


                                $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)"  data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-popup="' + popupval + '" data-drillto="' + drillvalue + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;min-height:28px;text-align:center;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');
                                $("#" + blocks[i].blockId + "").addClass("rotate");
                                $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });
                            }

                            if (blocks[i].textstyle == "Button") {

                                $("#" + blocks[i].blockId + "").addClass("button");
                                // $("#" + blocks[i].blockId + "").css("color", "white");

                            }
                        }
                        else {

                            $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)"  data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;text-align:center;min-height:28px;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');



                            $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });

                            if (blocks[i].textstyle == "Button") {

                                $("#" + blocks[i].blockId + "").addClass("button");
                                // $("#" + blocks[i].blockId + "").css("color", "white");
                            }

                        }


                    }


                }


                for (var i = 0; i < connections.length; i++) {

                    if (document.getElementById(connections[i].pageSourceId) !== null) {
                        if (document.getElementById(connections[i].pageTargetId) !== null) {
                            var common = {
                                paintStyle: { lineWidth: parseFloat(connections[i].targetwidth), strokeStyle: '' + connections[i].targetcolor + '' },
                                connector: ["Flowchart"],
                                hoverPaintStyle: { lineWidth: parseFloat(connections[i].targetwidth), strokeStyle: 3 },
                                endpoint: ["Rectangle", { width: 2, height: 3}],
                                detachable: false
                            };
                            var pos1 = connections[i].SourceAnchor;
                            var pos2 = connections[i].TargetAnchor;
                            jsPlumb.connect({ source: "" + connections[i].pageSourceId + "", target: "" + connections[i].pageTargetId + "", anchors: ["" + pos1 + "", "" + pos2 + ""] }, common);

                        }
                    }

                }
                refreshkwh();
                setInterval(function () { refreshkwh(); }, 10000);
            },
            error: function () { alert("error"); }
        });


    }
    catch (err) {
        alert(err);
        location.reload();
    }
}

function refreshkwh() {
    var kwhdata;

    $.ajax({
        url: '../../EmsLineDiagram/getkwhvalues',
        type: 'GET',
        async: false,
        success: function (result) {
            if (result.meterdic) {
                $("#tempkwh").data("meterdic", result.meterdic);

            }
            else {
                //  alert(result.error);
                $("#tempkwh").data("meterdic", null);
            }
        }
    });


    if ($("#tempkwh").data("meterdic") != null) {

        kwhdata = JSON.parse($("#tempkwh").data("meterdic"));
    }

    $("#droppable").find(".dragn").each(function (i) {
        var $this = $(this);
        if ($(this).attr("data-meterid") != null) {
            var textdata = $(this).attr("data-meterid");
            if (textdata.indexOf("**") !== -1) {
                textdata = textdata.replace("**", "");
                if (kwhdata[textdata] != null || kwhdata[textdata] != "") {
                    newval = kwhdata[textdata];
                    if (typeof newval != 'undefined') {
                        $(this).html(parseInt(newval));
                    }
                    else {
                        newval = "0";
                        $(this).html(newval);
                        $this.css("color", "red");
                    }
                }
                else {
                    newval = "0";
                    $(this).html(newval);
                    $this.css("color", "red");
                }
            }

        }
    });

}
function mathEval(exp) {
    var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
        valid = true;

    // Detect valid JS identifier names and replace them
    exp = exp.replace(reg, function ($0) {
        // If the name is a direct member of Math, allow
        if (Math.hasOwnProperty($0))
            return "Math." + $0;
        // Otherwise the expression is invalid
        else
            valid = false;
    });

    // Don't eval if our replace function flagged as invalid
    if (!valid) {
      //  alert("Invalid arithmetic expression:" + exp);
        $("#loader").hide();
    }
    else
        try { return eval(exp); } catch (e) {
            //alert("Invalid arithmetic expression" + exp);
             $("#loader").hide(); 
        };
}
          
        
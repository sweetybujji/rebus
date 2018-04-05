function getURLParameter(name) {
    return decodeURIComponent(
        (location.search.match(RegExp("[?|&]" + name + '=(.+?)(&|$)')) || [, null])[1]
    );
}

$(document).on('click', '.side-button', function () {

    $('.sidebar').toggleClass("left");
    $('.list').toggleClass("top");
});


// used initilizing the dom elements 
$(document).ready(function () {
    alert("ss");
    /*$('.side-button').click(function () {		
	    $('.sidebar').toggleClass("left");
	    $('.list').toggleClass("top");
	});*/



    //get meter names form ems server
    //$.ajax({
    //    url: '../../EmsLineDiagram/getMeterNames',
    //    type: 'GET',
    //    async: true,
    //    complete: function () {
    //        //getemsreport("SolarPowerHMI", "refresh");

    //    },
    //    success: function (result) {
    //        if (result.meterdic) {
    //            $("#tempdata").data("meterdic", result.meterdic);

    //        }
    //        else
    //            $("#tempdata").data("meterdic", null);
    //    }
    //});


    //$('#filterTxt').keyup(function () {

    //    var searchText = $(this).val();

    //    $('.filterli').each(function () {
    //        var currentLiText = $(this).text(),
    //            showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    //        $(this).toggle(showCurrentLi);

    //    });
    //});

    alert("ss");

    var reportname = getURLParameter("Reportname");
    alert(reportname);
    if (reportname != "null") {
        //alert(reportname);
        getemsreport(reportname + ".xml", "refresh")
    }
    else {
        alert(reportname);
        getemsreport("SolarPowerHMI", "refresh");

        //getemsreport("Test", "refresh");
    }

});


/*function SideButtonfun(){
	
	 $('.sidebar').toggleClass("left");
	    $('.list').toggleClass("top");
}*/

//this will open popup for drill down mmeter id
function getdrill(node) {
    var drillfile = $(node).attr("data-drillto");
    if (drillfile == "None") {
        var ispopup = $(node).attr("data-popup");
        if (ispopup == "YES") {
            $.colorbox({ href: '../../EmsLineDiagram/Datatable?Input=' + drillfile + '&panel=' + $("body").data("filename") + '&meterid=' + $(node).attr("data-mongoid") + '', iframe: true, width: '100%', height: '90%' });
            $("#colorbox").css({ "background-color": "steelblue", width: "100%", height: "90%" });
        }
        return false;
    }
    else {
        if (drillfile != 'undefined') {
            var ispopup = $(node).attr("data-popup");

            if (ispopup == "YES") {

                $.colorbox({ href: '../../EmsLineDiagram/Datatable?Input=' + drillfile + '&panel=' + $("body").data("filename") + '&meterid=' + $(node).attr("data-mongoid") + '', iframe: true, width: '100%', height: '90%' });
                $("#colorbox").css({ "background-color": "steelblue", width: "100%", height: "90%" });
            } else {

                getemsreport(drillfile + ".xml", "refresh");

            }
        }

    }

}
//Get report information by passing  filename as parameter
function getemsreport(filename, from) {
    try {
        if (from != "refresh") {
            $('.sidebar').toggleClass("left");
            $('.list').toggleClass("top");
        }
        var ajaxtest = true;

        //$.ajax({
        //    url: 'EmsLineDiagram/getkwhvalues',
        //    type: 'GET',
        //    async: false,
        //    success: function (result) {
        //        ajaxtest = true;
        //        if (result.meterdic) {
        //            $("#tempkwh").data("meterdic", result.meterdic);
        //        }
        //        else {
        //            $("#tempkwh").data("meterdic", null);
        //        }
        //    }
        //});


        $("body").data("filename", filename);
        //alert(filename);
        //if (filename == "SiteOverview") {
        //    $("#droppable").css({ "background-image": "url(../../RdlcAssists/black_siteoverview.png)", "background-repeat": "no-repeat" });
        //}
        //else {
        //    $("#droppable").css('background-image', 'none');
        //    $("#droppable").css('background-repeat', 'none');
        //}
        $("#droppable").empty();
        if (ajaxtest == true) {
            var ASD = JSON.stringify({ filename: filename });
            $.ajax({
                url: 'EmsLineDiagram/GetData',
                type: 'POST',
                data: ASD,
                contentType: 'application/json',
                async: false,
                success: function (result) {

                    alert(result);

                    if (result.errorresult) {
                        alert(result.errorresult);
                        return false;
                    }
                    var mdata;

                    if ($("#tempdata").data("meterdic") != null) {

                        mdata = JSON.parse($("#tempdata").data("meterdic"));
                    }

                    var kwhdata;
                    var meterdic;

                    if ($("#tempkwh").data("meterdic") != null) {

                        kwhdata = JSON.parse($("#tempkwh").data("meterdic"));
                    }
                    if ($("#tempkwh").data("meterdicids") != null) {

                        meterdic = JSON.parse($("#tempkwh").data("meterdicids"));
                        //alert(JSON.stringify(meterdic));
                    }
                    var advanceimgprop_arrdata = (result.advanceimgprop_arraydata);

                    //$.ajax({
                    //    url: '../../ConditionMonitoring/GetAssetMeters',
                    //    type: 'POST',
                    //    async: false,
                    //    data: { advanceimgprop_data: advanceimgprop_arrdata },
                    //    success: function (result) {
                    //        if (result.errormsg) {
                    //            alert(result.errormsg);
                    //        }
                    //        else {
                    //            //alert(result);
                    //            ajaxtest = true;
                    //            if (result.MeterData) {
                    //                $("#tempmeterdata").data("MeterData", result.MeterData);
                    //            }
                    //            else {
                    //                $("#tempmeterdata").data("MeterData", null);
                    //            }
                    //        }
                    //    }
                    //});

                    var blocks = jQuery.parseJSON(result.Block);
                    var connections = jQuery.parseJSON(result.connections);
                    //var DataNodes = jQuery.parseJSON(result.DataNodes);
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
                            $("#droppable").css({ "background-image": 'url(../Analytics/Linediagrams__BGImage/' + bgg_image + ')', "background-repeat": "no-repeat" });
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

                            var inputs = new Object();
                            inputs.DataPoint = "none";
                            inputs.MeterId = value1;
                            $.ajax({
                                url: '/EmsLineDiagram/MeterReadings',
                                type: 'POST',
                                data: { details: JSON.stringify(inputs) },
                                async: false,
                                success: function (Responce) {

                                    if (Responce.errorresult) {
                                        // alert(result.errorresult);
                                        $("#droppable").append('<div class="maind" id="' + rn + '" > <div class="divhead"> <span class="titled">' + groupbox[i].title + '</span></div><div class="itemd"> <span class="itemleft" >' + name1 + '</span> <span class="itemright" >' + value1 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name2 + '</span> <span class="itemright" >' + value2 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name3 + '</span> <span class="itemright" >' + value3 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name4 + '</span> <span class="itemright" >' + value4 + '</span> </div> <div class="itemd"> <span class="itemleft" >' + name5 + '</span> <span class="itemright" >' + value5 + '</span> </div> <div class="itemd"> <span class="itemleft" >' + name6 + '</span> <span class="itemright" >' + value6 + '</span></div></div>');
                                        $("#" + rn + "").css({ top: groupbox[i].positionY + "px", left: (parseFloat(groupbox[i].positionX) - 4) + "px", position: "absolute" });
                                    }
                                    else {
                                        var _result = Responce.result;
                                        result = JSON.parse(_result);

                                        value1 = parseFloat(result._1).toFixed(2)
                                        value2 = parseFloat(result._27).toFixed(2);
                                        value3 = parseFloat(result._14).toFixed(2) + " A";
                                        value4 = parseFloat(result._15).toFixed(2) + " A";
                                        value5 = parseFloat(result._16).toFixed(2) + " A"
                                        value6 = parseFloat(result._17).toFixed(2) + " V";

                                        $("#droppable").append('<div class="maind" id="' + rn + '" > <div class="divhead"> <span class="titled">' + groupbox[i].title + '</span></div><div class="itemd"> <span class="itemleft" >' + name1 + '</span> <span class="itemright" >' + value1 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name2 + '</span> <span class="itemright" >' + value2 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name3 + '</span> <span class="itemright" >' + value3 + '</span> </div><div class="itemd"> <span class="itemleft" >' + name4 + '</span> <span class="itemright" >' + value4 + '</span> </div> <div class="itemd"> <span class="itemleft" >' + name5 + '</span> <span class="itemright" >' + value5 + '</span> </div> <div class="itemd"> <span class="itemleft" >' + name6 + '</span> <span class="itemright" >' + value6 + '</span></div></div>');
                                        $("#" + rn + "").css({ top: groupbox[i].positionY + "px", left: (parseFloat(groupbox[i].positionX) - 4) + "px", position: "absolute" });

                                    }

                                }
                            });
                        }
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
                            var mongoid = "";
                            if (blocks[i].popup) {
                                popupval = blocks[i].popup;


                                //if (meterdic != null) {

                                //  if (meterdic[drillvalue] != null || meterdic[drillvalue] != "") {
                                mongoid = drillvalue
                                // }
                                // }
                            }
                            //alert(popupval);
                            if (blocks[i].imgsrc != "../Analytics/Linediagrams__Icon/Dot-16.png") {


                                $("#droppable").append('<img src="' + blocks[i].imgsrc + '" class="dragnx" id="' + blocks[i].blockId + '"  data-mongoid="' + mongoid + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  onclick="getdrill(this)"  />');
                                //alert($("#tempmeterdata").data("MeterData"));
                                if ($("#tempmeterdata").data("MeterData") == null || $("#tempmeterdata").data("MeterData") == "undefined") {

                                }
                                else {
                                    var advanceimgdata = jQuery.parseJSON($("#tempmeterdata").data("MeterData"));
                                    //if (advanceimgdata == "" || advanceimgdata == null) {
                                    var advanceimgprop_arrdata = jQuery.parseJSON(result.advanceimgprop_arraydata);
                                    var returndata = $.grep(advanceimgprop_arrdata, function (element, index) {
                                        return element.node_id == blocks[i].blockId
                                    });
                                    //// alert(returndata.length);
                                    if (returndata.length > 0) {
                                        var cnt = 0;
                                        for (var pc = 0; pc < advanceimgprop_arrdata.length; pc++) {
                                            var imgarray = advanceimgprop_arrdata[pc]["img_aaray"];
                                            for (var kk = 0; kk < imgarray.length; kk++) {
                                                if (imgarray[kk]["Img_AssetTag_Val"] == advanceimgdata[cnt]["AssetId"] && imgarray[kk]["Img_MeterTag_Val"] == advanceimgdata[cnt]["MeterId"]) {
                                                    if (imgarray[kk]["Select_ParamVal"] + "" + imgarray[kk]["Ddl_RelOperator"] + "" + advanceimgdata[cnt]["CurrentValue"]) {
                                                        var imgsrc = imgarray[kk]["Select_ImgUrl"];
                                                        $("#" + advanceimgprop_arrdata[pc].node_id).attr("src", imgsrc);
                                                    }
                                                    cnt++;
                                                }
                                            }
                                        }
                                    }
                                }
                                //else {
                                //alert("ss");

                                //}
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
                            // alert(popupval);
                            var textdata = blocks[i].val
                            var tempid = textdata;
                            var newval = new String();
                            newval = textdata;


                            var cssclass = blocks[i].class;
                            if (blocks[i].class) {
                                var seletedfont = blocks[i].fontsize;

                                var cssclass = blocks[i].class;
                                var test = cssclass.indexOf("rotate");
                                if (test == -1) {
                                    $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)"   data-mongoid=""  data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"  style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;text-align:center;min-height:30px;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');

                                    $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });
                                }
                                else {


                                    $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)"  data-mongoid="" data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-popup="' + popupval + '" data-drillto="' + drillvalue + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;min-height:28px;text-align:center;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');
                                    $("#" + blocks[i].blockId + "").addClass("rotate");
                                    $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });
                                }

                                if (blocks[i].textstyle == "Button") {

                                    $("#" + blocks[i].blockId + "").addClass("button");
                                    // $("#" + blocks[i].blockId + "").css("color", "white");

                                }
                            }
                            else {

                                $("#droppable").append('<div id="' + blocks[i].blockId + '" class="dragn" onclick="getdrill(this)" data-mongoid=""  data-meterid="' + tempid + '"  data-popup="' + popupval + '"  data-drillto="' + drillvalue + '"   style="background:' + backcolor + ';color:' + nodecolor + ';word-wrap:break-word;font-weight:bold;text-align:center;min-height:28px;width:' + blocks[i].width + 'px;font-size:' + seletedfont + '"  >' + newval + '</div>');



                                $("#" + blocks[i].blockId + "").css({ top: blocks[i].positionY + "px", left: (parseFloat(blocks[i].positionX)) + "px", position: "absolute", "z-index": "1" });

                                if (blocks[i].textstyle == "Button") {

                                    $("#" + blocks[i].blockId + "").addClass("button");
                                    // $("#" + blocks[i].blockId + "").css("color", "white");
                                }

                            }




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



                            $("#" + blocks[i].blockId + "").html(newval);


                        }


                    }


                    for (var i = 0; i < connections.length; i++) {
                        if (document.getElementById(connections[i].pageSourceId) !== null) {
                            if (document.getElementById(connections[i].pageTargetId) !== null) {
                                var dstyle = "0";
                                if (connections[i].dashstyle) {
                                    dstyle = connections[i].dashstyle;
                                }
                                var common = {
                                    paintStyle: { lineWidth: parseFloat(connections[i].targetwidth), strokeStyle: connections[i].targetcolor, dashstyle: dstyle },
                                    connector: ["Flowchart"],
                                    hoverPaintStyle: { lineWidth: parseFloat(connections[i].targetwidth), strokeStyle: 3 },
                                    endpoint: ["Rectangle", { width: 2, height: 3 }],
                                    detachable: false
                                };
                                var pos1 = connections[i].SourceAnchor;
                                var pos2 = connections[i].TargetAnchor;
                                jsPlumb.connect({ source: "" + connections[i].pageSourceId + "", target: "" + connections[i].pageTargetId + "", anchors: ["" + pos1 + "", "" + pos2 + ""] }, common);
                            }
                        }
                    }





                    refreshkwh(filename);
                    setInterval(function () { refreshkwh(filename); }, 10000);
                },
                error: function () { alert("error"); }
            });

        }
    }
    catch (err) {
        alert(err);
        location.reload();
    }
}
//used for refreshing the kwh values in every 10 seconds
function refreshkwh(filename) {
    var kwhdata; var meterdic;
    if (filename == "220KV.xml" || filename == "400KV.xml") {
        $.ajax({
            url: 'EmsLineDiagram/getOpcvalues',
            type: 'GET',
            async: false,
            success: function (result) {
                if (result.meterdic) {
                    $("#tempkwh").data("meterdic", result.meterdic);
                    $("#tempkwh").data("meterdicids", result.meterdicids);
                }
                else {
                    $("#tempkwh").data("meterdic", null);
                    $("#tempkwh").data("meterdicids", null);
                }
            }
        });
    }
    else {

        $.ajax({
            url: 'EmsLineDiagram/getkwhvalues',
            type: 'GET',
            async: false,
            success: function (result) {
                if (result.meterdic) {
                    $("#tempkwh").data("meterdic", result.meterdic);
                }
                else {
                    $("#tempkwh").data("meterdic", null);
                }
            }
        });


    }
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

    //...Murali....//
    //alert(filename);

    var asd = JSON.stringify({ filename: filename });
    $.ajax({
        url: 'EmsLineDiagram/GetData',
        type: 'POST',
        data: asd,
        contentType: 'application/json',
        async: false,
        success: function (result) {
            if (result.errorresult) {
                alert(result.errorresult);
                return false;
            }
            var blocks = jQuery.parseJSON(result.Block);


            var advanceimgprop_arrdata = (result.advanceimgprop_arraydata);

            //$.ajax({
            //    url: '../../ConditionMonitoring/GetAssetMeters',
            //    type: 'POST',
            //    async: false,
            //    data: { advanceimgprop_data: advanceimgprop_arrdata },
            //    success: function (result) {
            //        //alert(result);
            //        if (result.errormsg) {
            //            alert(result.errormsg);
            //        }
            //        else {
            //            ajaxtest = true;
            //            if (result.MeterData) {
            //                $("#tempmeterdata").data("MeterData", result.MeterData);
            //            }
            //            else {
            //                $("#tempmeterdata").data("MeterData", null);
            //            }
            //        }
            //    }
            //});





            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].islabel == "false") {
                    if (blocks[i].imgsrc != "../Analytics/Linediagrams__Icon/Dot-16.png") {
                        if ($("#tempmeterdata").data("MeterData") == null || $("#tempmeterdata").data("MeterData") == "undefined") {

                        }
                        else {
                            var advanceimgdata = jQuery.parseJSON($("#tempmeterdata").data("MeterData"));
                            var advanceimgprop_arrdata = jQuery.parseJSON(result.advanceimgprop_arraydata);
                            var returndata = $.grep(advanceimgprop_arrdata, function (element, index) {
                                return element.node_id == blocks[i].blockId
                            });
                            if (returndata.length > 0) {
                                var cnt = 0;
                                for (var pc = 0; pc < advanceimgprop_arrdata.length; pc++) {
                                    var imgarray = advanceimgprop_arrdata[pc]["img_aaray"];
                                    for (var kk = 0; kk < imgarray.length; kk++) {
                                        if (imgarray[kk]["Img_AssetTag_Val"] == advanceimgdata[cnt]["AssetId"] && imgarray[kk]["Img_MeterTag_Val"] == advanceimgdata[cnt]["MeterId"]) {
                                            if (imgarray[kk]["Select_ParamVal"] + "" + imgarray[kk]["Ddl_RelOperator"] + "" + advanceimgdata[cnt]["CurrentValue"]) {
                                                var imgsrc = imgarray[kk]["Select_ImgUrl"];
                                                $("#" + advanceimgprop_arrdata[pc].node_id).attr("src", imgsrc);
                                            }
                                            cnt++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
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
                    $("#" + blocks[i].blockId + "").html(newval);
                }
            }
        },
        error: function (error) {
            alert(error);
        }
    });
    //refreshkwh(filename);
    //setInterval(function () { refreshkwh(filename); }, 10000);
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
        alert("Invalid arithmetic expression:" + exp);
        $("#loader").hide();
    }
    else
        try { return eval(exp); } catch (e) { alert("Invalid arithmetic expression" + exp); $("#loader").hide(); };
}


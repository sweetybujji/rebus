
function Edit(sts) {
    try {
        if (sts == "docready") {
            $("body").data("onreadyload", sts);
        }
        else {
            $("body").data("onreadyload", null);
        }

    }
    catch (err) {
        alert(err);
    }
}

function dateCompare(time1, time2) {
    var t1 = new Date();
    var parts = time1.split(":");
    t1.setHours(parts[0], parts[1], parts[2], 0);
    var t2 = new Date();
    parts = time2.split(":");
    t2.setHours(parts[0], parts[1], parts[2], 0);

    // returns 1 if greater, -1 if less and 0 if the same
    if (t1.getTime() > t2.getTime()) return 1;
    if (t1.getTime() < t2.getTime()) return -1;
    return 0;
}






function getemsreport(filename) {
    try {
        var dates = [];
        $("#reportarea").empty();

        $("#loader").show();
        $.ajax({
            url: '../../Reporting/GetData',
            type: 'POST',
            async: false,
            ataType: "json",
            data: { filename: filename + ".xml" },
            success: function (result) {
                $("#datasetlist").empty();
                if (result.errorresult) {
                    alert(result.errorresult);

                }
                else {
                    var TextNodes = $.parseJSON(result.TextNodes);
                    var DataNodes = $.parseJSON(result.DataNodes);
                    var TableNodes = $.parseJSON(result.TableNodes);
                    var ImageNodes = $.parseJSON(result.ImageNodes);
                    var ChartNodes = $.parseJSON(result.ChartNodes);

                    var datatag = [];
                    var stime = getURLParameter("starttime");
                    var etime = getURLParameter("endtime");

                    for (var i = 0; i < TextNodes.length; i++) {
                        var textdata = TextNodes[i].value;
                        var newval = new String();
                        if (textdata.indexOf("#") !== -1) {
                            textdata.replace(/#(.*?)#/g, function () {
                                datatag.push(arguments[0].replace("#", "").replace("#", ""));
                                newval = textdata.replace(arguments[0], "hello");
                                textdata = newval;
                            });
                        }

                    }

                    //table nodes





                    for (var i = 0; i < 1; i++) {
                        var obj = new Object();
                        // obj.formulas = datatag;
                        obj.shift = getURLParameter("shift");
                        obj.from = getURLParameter("fromdate");
                        obj.to = getURLParameter("todate");

                        var currentDate = new Date(obj.from);
                        var endDate = new Date(obj.to);
                        // create the array
                        var i = 0;

                        while (currentDate <= endDate) {
                            // add one day
                            // alert(currentDate);
                            i++;
                            $(".datehead" + i).html(currentDate.getDate() + "-" + currentDate.getFullYear() + "-" + parseInt(currentDate.getMonth() + 1));

                            for (var ri = 0; ri < TableNodes.length; ri++) {

                                $("#reportarea").append("<table style='display:none' id='" + TableNodes[ri].id + "'  width='" + TableNodes[ri].width + "'  cellspacing='0' cellpadding='5'   style='width:" + TableNodes[ri].width + "px;position:absolute;left:" + TableNodes[ri].positionX + "px;top:" + TableNodes[ri].positionY + "px' >" + TableNodes[ri].html + "</table>");

                                datatag = [];
                                $(".day" + i + "").each(function () {
                                    var textbxtxt = $(this).attr("data-datainfo");
                                    var newval = new String();
                                    if (textbxtxt.indexOf("#") != -1) {
                                        textbxtxt.replace(/#(.*?)#/g, function () {
                                            datatag.push(arguments[0].replace("#", "").replace("#", ""));
                                            newval = textbxtxt.replace(arguments[0], "heloo");

                                        });
                                    }

                                });
                            }
                            $("#reportarea").empty();
                            obj.formulas = datatag;
                            obj.from = parseInt(currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();


                            var TODate = new Date();
                            var numberOfDaysToAdd = 1;
                            TODate.setDate(currentDate.getDate() + numberOfDaysToAdd);
                            obj.to = parseInt(TODate.getMonth() + 1) + "/" + TODate.getDate() + "/" + TODate.getFullYear();



                            obj.starttime = stime; //stime.split(":")[0] + ":" + stime.split(":")[1];
                            obj.endtime = etime//etime.split(":")[0] + ":" + etime.split(":")[1];

                            //alert(JSON.stringify(obj));
                            // return false;
                            $("#datasetlist").append("<div id='tempstorage'></div>");
                            var node = document.getElementById('tempstorage');

                            $.ajax({
                                url: '../../Reporting/getDaysreport',
                                type: 'POST',
                                async: false,
                                data: { tags: JSON.stringify(obj) },
                                success: function (result) {

                                    if (result.errortag) {

                                        alert(result.errortag);
                                    }
                                    else {
                                        $(node).data("data-day" + i + "", result.tagdata);
                                    }
                                }
                            });
                            dates.push(currentDate);
                            currentDate = currentDate.addDays(1);
                            // add on array



                        }


                    }


                    var strimgwidth = "853px";
                    if (getURLParameter("Reportname") == "Daily_BFG_Report")
                        strimgwidth = "550px";


                    $("#reportarea").append("<div class='headlogo'><img id='565757' src='data:image/jpeg;base64,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'  style='position:absolute;left:" + strimgwidth + ";top:82px;' /></div>");


                    for (var i = 0; i < TextNodes.length; i++) {
                        var textdata = TextNodes[i].value;
                        var newval = new String();
                        if (TextNodes[i].isdate == "FALSE") {

                            if (textdata.indexOf("#") != -1) {
                                var data = jQuery.parseJSON($("#tempstorage").attr("data-datainfonode"));
                                textdata.replace(/#(.*?)#/g, function () {
                                    newval = textdata.replace(arguments[0], data[arguments[1]]);
                                    textdata = newval;
                                });
                            }
                            else if (textdata.indexOf("GET_FROMDATE") != -1) {
                                //  var dfrom = obj.from.split("/");
                                var date = new Date(getURLParameter("fromdate"));
                                newval = "FROM DATE :&nbsp;" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                                $("#tfd").html(newval);

                            }
                            else if (textdata.indexOf("GET_TODATE") != -1) {
                                var date = new Date(getURLParameter("todate"));
                                newval = "TO DATE :&nbsp;" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                                $("#ttd").html(newval);
                            }
                            else if (textdata.indexOf("GET_STARTTIME") != -1) {
                                newval = "TIME :&nbsp;" + getURLParameter("starttime");
                                $("#tdstarttime").html(getURLParameter("starttime"));

                            }
                            else if (textdata.indexOf("GET_ENDTIME") != -1) {
                                newval = "TIME :&nbsp;" + getURLParameter("endtime");
                                $("#tdendtime").html(getURLParameter("endtime"));

                            }
                            else if (textdata.indexOf("GET_CURRENTDATE") != -1) {
                                var date = new Date();
                                newval = "DATE :&nbsp;" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                                $("#tfd").html(newval);

                            }
                            else if (textdata.indexOf("GET_CURRENTTIME") != -1) {
                                var date = new Date();
                                newval = "TIME :&nbsp;" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                $("#tdstarttime").html(newval);

                            }
                            else {
                                newval = TextNodes[i].value;
                            }
                        }
                        else {
                            var date = new Date();
                            newval = "DATE:&nbsp;" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "&nbsp;" + date.getHours() + ":" + date.getMinutes();
                        }
                        var talign;
                        if (TextNodes[i].textalign) {
                            talign = TextNodes[i].textalign;
                        }
                        else {
                            talign = "center";
                        }
                        $("#reportarea").append("<div  class='headlogo' id='" + TextNodes[i].id + "' style='text-align:" + talign + ";position:absolute;font-weight:" + TextNodes[i].fontweight + ";font-size:" + TextNodes[i].font + ";color:white;width:" + (parseInt(TextNodes[i].width) - 10) + "px;left:" + TextNodes[i].positionX + "px;top:" + TextNodes[i].positionY + "px'>" + newval + "</div>");

                    }

                    var tdidlist = [];

                    for (var i = 0; i < TableNodes.length; i++) {


                        if (i == TableNodes.length - 1) {
                            $("#reportarea").append("<table class='table-editor' id='" + TableNodes[i].id + "'  width='" + TableNodes[i].width + "' cellspacing='0' cellpadding='5' border='1' style='width:" + TableNodes[i].width + "px;position:absolute; table-layout: fixed;left:" + TableNodes[i].positionX + "px;top:" + TableNodes[i].positionY + "px' >" + TableNodes[i].html + "</table>");
                            $.getDocHeight = function () {
                                var D = document;
                                return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
                            };
                            $("#reportarea").height($.getDocHeight() + 50);
                        }
                        else {
                            $("#reportarea").append("<table class='table-editor' id='" + TableNodes[i].id + "'  width='" + TableNodes[i].width + "' cellspacing='0' cellpadding='5' border='1' style='width:" + TableNodes[i].width + "px;position:absolute; table-layout: fixed;left:" + TableNodes[i].positionX + "px;top:" + TableNodes[i].positionY + "px' >" + TableNodes[i].html + "</table>");
                        }
                        $(".tblhelpbtn").remove();


                        $('#' + TableNodes[i].id + ' tr td').each(function () {
                            var textbxtxt = $(this).attr("data-datainfo");
                            var txtid = $(this).children().attr("id");
                            $(this).children().remove();
                            $(this).attr("id", txtid);
                            if (textbxtxt == "") {
                                textbxtxt = "&nbsp;";
                            }
                            $(this).html(textbxtxt);
                        });

                        for (var d = 0; d < dates.length-1; d++) {

                            var datanode = "tempstorage";
                            var data;
                            if ($("#tempstorage").data("data-day" + parseInt(d + 1) + "") != null) {
                                data = jQuery.parseJSON($("#tempstorage").data("data-day" + parseInt(d + 1) + ""));
                            }
                            //alert(datanode);

                            $(".day" + parseInt(d + 1) + "").each(function () {
                                var textbxtxt = $(this).attr("data-datainfo");
                                var txtid = $(this).children().attr("id");
                                $(this).children().remove();
                                $(this).attr("id", txtid);
                                if (textbxtxt == "") {
                                    textbxtxt = "&nbsp;";
                                }
                                $(this).html(textbxtxt);
                                if (datanode != null) {
                                    var tdtext = $(this).html();
                                    var newval = new String();
                                    var newid = $(this);
                                    tdtext.replace(/#(.*?)#/g, function () {
                                        newval = tdtext.replace(arguments[0], data[arguments[1]]);
                                        tdtext = newval;
                                        $(newid).html(newval);
                                    });


                                }
                            });


                            var daydate = new Date(dates[d]);

                            $(".day" + parseInt(d + 1) + "date").html($(".day" + parseInt(d + 1) + "date").html() + "(" + daydate.getDate() + "/" + (daydate.getMonth() + 1) + "/" + daydate.getFullYear() + ")");

                            $(".dayhead" + parseInt(d + 1)).html(daydate.getDate() + "-" + parseInt(daydate.getMonth() + 1) + "-" + daydate.getFullYear());
                        }



                        var undfinedids = [];
                        $('#' + TableNodes[i].id + ' tr td').each(function () {

                            var textbxtxt = $(this).html();
                            var exptblid = $(this).attr("id");
                            var newtextbxtxt = textbxtxt;

                            textbxtxt.replace(/{(.*?)}/g, function () {
                                textbxtxt.replace(/@(.*?)@/g, function () {
                                    var msn = $("#" + arguments[1] + "").html();
                                    textbxtxt = textbxtxt.replace(arguments[0], $("#" + arguments[1] + "").html());
                                });
                                var expression = textbxtxt.substring(textbxtxt.lastIndexOf("{") + 1, textbxtxt.lastIndexOf("}"));

                                $("#" + exptblid + "").html(expression);
                                var exp = textbxtxt.replace(expression, parseInt(mathEval(expression)));
                                $("#" + exptblid + "").html(exp.replace("{", "").replace("}", ""));
                                if ($("#" + exptblid + "").html() == "{undefined") {
                                    undfinedids.push(exptblid);
                                }
                                var explidhtml = $.trim($("#" + exptblid + "").html());
                                if (explidhtml == "NaN" || explidhtml == "undefined" || explidhtml == "Infinity" || explidhtml == "-Infinity") {
                                    $("#" + exptblid + "").html("0");
                                }

                            });

                        });
                        for (var ui = 0; ui < undfinedids.length; ui++) {
                            var textbxtxt = $("#" + undfinedids[ui] + "").attr("data-datainfo");
                            var exptblid = undfinedids[ui];
                            var newtextbxtxt = new String();
                            textbxtxt.replace(/{(.*?)}/g, function () {

                                textbxtxt.replace(/@(.*?)@/g, function () {
                                    textbxtxt = textbxtxt.replace(arguments[0], $("#" + arguments[1] + "").html());

                                });
                                var expression = textbxtxt.substring(textbxtxt.lastIndexOf("{") + 1, textbxtxt.lastIndexOf("}"));
                                $("#" + exptblid + "").html(expression);
                                var exp = textbxtxt.replace(expression, mathEval(expression));
                                $("#" + exptblid + "").html(exp.replace("{", "").replace("}", ""));
                                var explidhtml = $.trim($("#" + exptblid + "").html());
                                if (explidhtml == "NaN" || explidhtml == "undefined" || explidhtml == "Infinity" || explidhtml == "-Infinity") {
                                    $("#" + exptblid + "").html("0");
                                }

                            });
                        }


                        $('#' + TableNodes[i].id + ' tr td').each(function () {
                            var textbxtxt = $(this).html();
                            var txtid = $(this).children().attr("id");
                            $(this).children().remove();
                            $(this).attr("id", txtid);
                            if (textbxtxt == "") {
                                textbxtxt = "&nbsp;";
                            }

                            var tdtext = textbxtxt;

                            var newval = new String();
                            var newid = $(this);
                            tdtext.replace(/#(.*?)#/g, function () {

                                $(newid).html("0");
                                // alert($(this).html());
                            });
                            textbxtxt.replace(/{(.*?)}/g, function () {
                                $(newid).html("0");
                            });
                            textbxtxt.replace(/@(.*?)@/g, function () {
                                $(newid).html("0");
                            });

                        });

                        $(".kwh").each(function () {
                            var val = $(this).html().split(".")[1];
                            if (val != null) {
                                $(this).html($(this).html().split(".")[0])
                            }

                        });

                    }
                }


                $(".ui-resizable-s").remove();
                $(".ui-resizable-e").remove();
                $(".ui-resizable-handle").remove();
                $("#loader").hide();
                if (getURLParameter("type") == "email") {

                    var reportname = getURLParameter("Reportname");
                    $("#reportarea").css({ width: 1024, height: 1000 });
                    var html = $("#reportarea").html();
                    $("#tempprocess").html($("#dd").html());
                    $("#tempprocess").find(".headlogo").css("color", "#376091");
                    $("#tempprocess").find(".logo").css("color", "#376091");
                    $("#tempprocess").find(".headlogo").css("background", "white");
                    if (html.length > 6) {
                        $.ajax({
                            url: '../../Reporting/Exportdata',
                            type: 'POST',
                            async: false,
                            data: { htmlstr: $("#tempprocess").html() },
                            success: function (result) {
                                $("#tempprocess").empty();
                                window.location.href = '../../Reporting/GetPDFandEmail?reportname=' + reportname + '';
                            }
                        });
                    }
                    else {
                        alert("No Content Found..");
                    }

                }
            },
            error: function () { alert("error"); $("#loader").hide(); }
        });


    }
    catch (err) {
        alert(err.message);
        $("#datasetlist").empty();
        $("#loader").hide();
    }


}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
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
        // alert("Invalid arithmetic expression:" + exp);
        $("#loader").hide();
    }
    else
        try {
            if (getURLParameter("Reportname") != "Daily Report") {
                var res = eval(exp).toFixed(0);
                return res;
            }
            else {

                var x = eval(exp).toFixed(0).toString().split(".")[1];
                if (x != null)
            {
            if (x == "0000") {
                return parseInt(eval(exp));
            }
            else {
                return eval(exp).toFixed(0);

            }
            }
        return eval(exp).toFixed(0);
            }

         } catch (e) {
          //  alert("Invalid arithmetic expression" + exp);
            $("#loader").hide();
        };
}

function isNumeric(num) {
    return !isNaN(num)
}

//readinng data from file
function getemsreport(filename) {
    var ReportName = JSON.stringify({ filename: filename });
    try {
        $("#reportarea").empty();
        $("#loader").show();
        $.ajax({
            url: '/Reporting/GetXMLData',
            type: 'POST',
            data: ReportName,
            contentType: 'application/json',
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

                    for (var i = 0; i < TableNodes.length; i++) {
                        $("#reportarea").append("<table style='display:none' id='" + TableNodes[i].id + "'  width='" + TableNodes[i].width + "'  cellspacing='0' cellpadding='5'   style='width:" + TableNodes[i].width + "px;position:absolute;left:" + TableNodes[i].positionX + "px;top:" + TableNodes[i].positionY + "px' >" + TableNodes[i].html + "</table>");
                        $("#" + TableNodes[i].id + " tr td:nth-child(1)").each(function () {
                            var data = $(this).attr("data-datainfo");
                            if (data.indexOf('A.M-') !== -1 || (data.indexOf('P.M-') !== -1)) {
                                var timet = data.split("-")[1];
                                var time = timet;
                                var hours = Number(time.match(/^(\d+)/)[1]);
                                var minutes = Number(time.match(/:(\d+)/)[1]);

                                if (minutes == 15) {
                                    minutes = 30;
                                }

                                var AMPM = "";
                                if (time.indexOf('A.M') !== -1)
                                    AMPM = "AM";
                                else
                                    AMPM = "PM";

                                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                var sHours = hours.toString();
                                var sMinutes = minutes.toString();
                                if (hours < 10) sHours = "0" + sHours;
                                if (minutes < 10) sMinutes = "0" + sMinutes;
                                var finaltime = sHours + ":" + sMinutes + ":" + 00;
                                if (dateCompare(stime, finaltime + ":" + 00) == 1) {
                                    $(this).parent().remove();
                                }
                                else if (dateCompare(finaltime + ":" + 00, etime) == 1) {
                                    $(this).parent().remove();
                                }
                            }
                        });
                        $('#' + TableNodes[i].id + ' tr td').each(function () {
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

                    for (var i = 0; i < 1; i++) {
                        var obj = new Object();
                        obj.formulas = datatag;
                        obj.shift = getURLParameter("shift");
                        obj.from = getURLParameter("fromdate");
                        obj.to = getURLParameter("todate");
                        obj.starttime = stime;
                        obj.endtime = etime;
                        $("#datasetlist").append("<div id='tempstorage'></div>");
                        var node = document.getElementById('tempstorage');
                        $.ajax({
                            url: '../../Reporting/getDetails',
                            type: 'POST',
                            async: false,
                            data: { tags: JSON.stringify(obj) },
                            success: function (result) {
                                if (result.errortag) {
                                    alert(result.errortag);
                                }
                                else {
                                    $(node).attr("data-datainfonode", result.tagdata);
                                }
                            }
                        });
                    }

                    for (var j = 0; j < ChartNodes.length; j++) {
                        var rn = ChartNodes[j].id;
                        var heig = ChartNodes[j].height;

                        var fath = "DashBoards\\dashboard360\\" + ChartNodes[j].filename + ".xml";
                        $.ajax({
                            url: '../../DashBoard360/filepathconvert',
                            type: 'POST',
                            cache: false,
                            async: false,
                            data: { fkey: fath },
                            success: function (response) {
                                var url = response;
                                var d = new Date();
                                $.ajax({
                                    url: '../../DashBoard360/GetCharts',
                                    type: 'POST',
                                    cache: false,
                                    async: false,
                                    data: { regdetails: url },
                                    success: function (result) {
                                        var chartdata = JSON.parse(result.chartdata);
                                        for (var i = 0; i < chartdata.length; i++) {
                                            switch (chartdata[i].charttype) {
                                                case 'Globalchart':
                                                    var Globalchart = "Globalchart" + Math.floor(Math.random() * 10561);
                                                    var imgmap = '#' + Globalchart + "ImageMap";
                                                    $.ajax({
                                                        url: '../../charts/GetGlobalchartImage',
                                                        type: 'POST',
                                                        async: false,
                                                        data: { tdata: chartdata[i].chartinfo, fkey: url + "$" + d.getTime(), height: heig.replace("px", ""), width: ChartNodes[i].width, imagemap: imgmap.replace('#', '') },
                                                        success: function (response) {
                                                            if (response.charterror) {
                                                                alert(response.charterror);
                                                                return false;
                                                            }
                                                            else {
                                                                var charttitle = chartdata[i].title;
                                                                $("#reportarea").append("<img id='" + rn + "'  usemap='" + imgmap + "'  src='data:image/png;base64," + response.chartimage + "'  style='position:absolute;width:" + (parseInt(ChartNodes[j].width)) + "px;height:" + ChartNodes[j].height + ";left:" + ChartNodes[j].positionX + "px;top:" + ChartNodes[j].positionY + "px' />");
                                                            }
                                                        },
                                                        error: function (er) {
                                                        }
                                                    });
                                                    break;
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }

                    $("#reportarea").append("<div class='headlogo'><img id='565757' src='data:image/jpeg;base64,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'  style='position:absolute;height: auto;left: 853px;top: 85px;Width: auto;' /></div>");
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
                                var date = new Date(obj.from);
                                newval = "FROM DATE :&nbsp;" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                                $("#tfd").html(newval);
                            }
                            else if (textdata.indexOf("GET_TODATE") != -1) {
                                var date = new Date(obj.to);
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
                            $("#reportarea").append("<table class='table-editor' id='" + TableNodes[i].id + "'  width='" + TableNodes[i].width + "' cellspacing='0' cellpadding='5' border='1' style='width:" + TableNodes[i].width + "px;position:absolute;left:" + TableNodes[i].positionX + "px;top:" + TableNodes[i].positionY + "px' >" + TableNodes[i].html + "</table>");
                            $.getDocHeight = function () {
                                var D = document;
                                return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
                            };
                            $("#reportarea").height($.getDocHeight() + 50);
                        }
                        else {
                            $("#reportarea").append("<table class='table-editor' id='" + TableNodes[i].id + "'  width='" + TableNodes[i].width + "' cellspacing='0' cellpadding='5' border='1' style='width:" + TableNodes[i].width + "px;position:absolute;left:" + TableNodes[i].positionX + "px;top:" + TableNodes[i].positionY + "px' >" + TableNodes[i].html + "</table>");
                        }
                        $(".tblhelpbtn").remove();
                        //time stamp based
                        $("#" + TableNodes[i].id + " tr td:nth-child(1)").each(function () {
                            var data = $(this).attr("data-datainfo");

                            if (data.indexOf('A.M-') !== -1 || (data.indexOf('P.M-') !== -1)) {
                                var timet = data.split("-")[1];
                                var time = timet;

                                var hours = Number(time.match(/^(\d+)/)[1]);
                                var minutes = Number(time.match(/:(\d+)/)[1]);
                                if (minutes == 15) {
                                    minutes = 30;
                                }
                                var AMPM = "";
                                if (time.indexOf('A.M') !== -1)
                                    AMPM = "AM";
                                else
                                    AMPM = "PM";
                                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                var sHours = hours.toString();
                                var sMinutes = minutes.toString();
                                if (hours < 10) sHours = "0" + sHours;
                                if (minutes < 10) sMinutes = "0" + sMinutes;
                                var sfinaltime = sHours + ":" + (parseInt(sMinutes) - 30).toString() + ":" + 00;
                                var efinaltime = sHours + ":" + sMinutes + ":" + 00;

                                if (efinaltime == "00:00:0" && etime == "23:59:59") {
                                    // $(this).parent().remove();
                                }
                                else {
                                    if (dateCompare(stime, sfinaltime + ":" + 00) == 1) {
                                        $(this).parent().remove();
                                    }
                                    else if (dateCompare(efinaltime + ":" + 00, etime) == 1) {
                                        //if (efinaltime != "00:00:0")
                                        $(this).parent().remove();
                                    }
                                }
                            }
                        });
                        var datanode = $("#datasetlist").children().attr("id");
                        $('#' + TableNodes[i].id + ' tr td').each(function () {
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
                                var data = jQuery.parseJSON($("#" + datanode + "").attr("data-datainfonode"));
                                tdtext.replace(/#(.*?)#/g, function () {
                                    newval = tdtext.replace(arguments[0], data[arguments[1]]);
                                    tdtext = newval;
                                    $(newid).html(newval);
                                });
                            }
                        });

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

                        //for daily report
                        if (getURLParameter("Reportname") == "Daily Report") {
                            $(".kwh").each(function () {
                                var _numaricval = parseInt($(this).html());
                                $(this).html(_numaricval);

                                if ($(this).html() == "NaN" || $(this).html() == "undefined") {
                                    $(this).html("0")
                                }
                            });
                        }

                        if (getURLParameter("Reportname") != "Daily Report") {
                            var mw = {};
                            $(".mw").each(function () {
                                mw[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                            });

                            var mwmaxProp = null;
                            var mwmaxValue = -1;
                            var mwmaxProp = null;
                            var mwminValue = 99900;
                            var mwminProp = null;
                            var mwavg = 0;
                            for (var prop in mw) {
                                if (mw.hasOwnProperty(prop)) {
                                    var value = parseInt(mw[prop]);
                                    mwavg = mwavg + parseInt(value);
                                    if (value >= mwmaxValue) {
                                        mwmaxProp = prop;
                                        mwmaxValue = value;
                                        $("#MAXMW").html(mwmaxValue);
                                        $("#MAXMWTIME").html($("#" + prop + "").html());
                                    }

                                    if (value < mwminValue) {
                                        mwminProp = prop;
                                        mwminValue = value;
                                        $("#MINMW").html(mwminValue);
                                        $("#MINMWTIME").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGMW").html((mwavg / 48).toFixed(4));

                            //get min max values
                            var kwh1 = {}; var kwh2 = {}; var kwh3 = {}; var kwh4 = {}; var kwh5 = {}; var kwh6 = {};
                            var kwh7 = {}; var kwh8 = {}; var kwh9 = {}; var kwh10 = {}; var kwh11 = {}; var kwh12 = {}; var kwh13 = {}; var kwh14 = {}; var kwh15 = {};
                            for (var ii = 0; ii < 15; ii++) {

                                $(".kw" + ii + "").each(function (j) {
                                    if (ii == 1)
                                        kwh1[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //2
                                    else if (ii == 2)
                                        kwh2[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //3
                                    else if (ii == 3)
                                        kwh3[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //4
                                    else if (ii == 4)
                                        kwh4[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //5
                                    else if (ii == 5)
                                        kwh5[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //6
                                    else if (ii == 6)
                                        kwh6[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //7
                                    else if (ii == 7)
                                        kwh7[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //8
                                    else if (ii == 8)
                                        kwh8[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //9
                                    else if (ii == 9)
                                        kwh9[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //10
                                    else if (ii == 10)
                                        kwh10[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();

                                        //11
                                    else if (ii == 11)
                                        kwh11[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();

                                        //12
                                    else if (ii == 12)
                                        kwh12[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //13
                                    else if (ii == 13)
                                        kwh13[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //14
                                    else if (ii == 14)
                                        kwh14[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                        //15
                                    else if (ii == 15)
                                        kwh15[$(this).parent().find("td:eq(0)").attr("id")] = $(this).html();
                                });
                            }
                            //kw1
                            var maxProp = null;
                            var maxValue = -1;
                            var maxProp = null;
                            var minValue = 99900;
                            var minProp = null;
                            var avg = 0;
                            for (var prop in kwh1) {
                                if (kwh1.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh1[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW1").html(maxValue);
                                        $("#MAXKWTIME1").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW1").html(minValue);
                                        $("#MINKWTIME1").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW1").html((avg / 48).toFixed(4));
                            avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;
                            //kw2
                            for (var prop in kwh2) {
                                if (kwh2.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh2[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW2").html(maxValue);

                                        $("#MAXKWTIME2").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW2").html(minValue);
                                        $("#MINKWTIME2").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW2").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;

                            //kw3
                            for (var prop in kwh3) {
                                if (kwh3.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh3[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW3").html(maxValue);
                                        $("#MAXKWTIME3").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW3").html(minValue);
                                        $("#MINKWTIME3").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW3").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw4
                            for (var prop in kwh4) {
                                if (kwh4.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh4[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW4").html(maxValue);
                                        $("#MAXKWTIME4").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW4").html(minValue);
                                        $("#MINKWTIME4").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW4").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw5
                            for (var prop in kwh5) {
                                if (kwh5.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh5[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW5").html(maxValue);
                                        $("#MAXKWTIME5").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW5").html(minValue);
                                        $("#MINKWTIME5").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW5").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;

                            //kw6
                            for (var prop in kwh6) {
                                if (kwh6.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh6[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW6").html(maxValue);
                                        $("#MAXKWTIME6").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW6").html(minValue);
                                        $("#MINKWTIME6").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW6").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw7
                            for (var prop in kwh7) {
                                if (kwh7.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh7[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW7").html(maxValue);
                                        $("#MAXKWTIME7").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW7").html(minValue);
                                        $("#MINKWTIME7").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW7").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;

                            //kw8
                            for (var prop in kwh8) {
                                if (kwh8.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh8[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW8").html(maxValue);
                                        $("#MAXKWTIME8").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW8").html(minValue);
                                        $("#MINKWTIME8").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW8").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;

                            //kw9
                            for (var prop in kwh9) {
                                if (kwh9.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh9[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW9").html(maxValue);
                                        $("#MAXKWTIME9").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW9").html(minValue);
                                        $("#MINKWTIME9").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW9").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw10
                            for (var prop in kwh10) {
                                if (kwh10.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh10[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW10").html(maxValue);
                                        $("#MAXKWTIME10").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW10").html(minValue);
                                        $("#MINKWTIME10").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW10").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw11
                            for (var prop in kwh11) {
                                if (kwh11.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh11[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW11").html(maxValue);
                                        $("#MAXKWTIME11").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW11").html(minValue);
                                        $("#MINKWTIME11").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW11").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;

                            //kw12
                            for (var prop in kwh12) {
                                if (kwh12.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh12[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW12").html(maxValue);
                                        $("#MAXKWTIME12").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW12").html(minValue);
                                        $("#MINKWTIME12").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW12").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw13
                            for (var prop in kwh13) {
                                if (kwh13.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh13[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW13").html(maxValue);
                                        $("#MAXKWTIME13").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW13").html(minValue);
                                        $("#MINKWTIME13").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW13").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;



                            //kw14
                            for (var prop in kwh14) {
                                if (kwh14.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh14[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW14").html(maxValue);
                                        $("#MAXKWTIME14").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW14").html(minValue);
                                        $("#MINKWTIME14").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW14").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;


                            //kw15
                            for (var prop in kwh15) {
                                if (kwh15.hasOwnProperty(prop)) {
                                    var value = parseInt(kwh15[prop]);
                                    avg = avg + parseInt(value);
                                    if (value >= maxValue) {
                                        maxProp = prop;
                                        maxValue = value;
                                        $("#MAXKW15").html(maxValue);
                                        $("#MAXKWTIME15").html($("#" + prop + "").html());
                                    }

                                    if (value < minValue) {
                                        minProp = prop;
                                        minValue = value;
                                        $("#MINKW15").html(minValue);
                                        $("#MINKWTIME15").html($("#" + prop + "").html());
                                    }
                                }
                            }
                            $("#AVGKW15").html((avg / 48).toFixed(4)); avg = 0; maxValue = -1; maxProp = null; minValue = 99900; minProp = null;
                        }

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
                if (x != null) {
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





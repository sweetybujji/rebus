
tbldata();

$(".v1").hide();
$(".v2").hide();
$(".v3").hide();
$(".v4").hide();
$(".v5").hide();
$(".v6").hide();
$(".v7").hide();


$('#btnPublish').click(function () {
    //  $("#form1").valid(); //validate form 1
    $("#form1").validate();
});

$('#ddlver').chosen({
    allow_single_deselect: true,
    'width': '100%'
});

$('#ddlver2').chosen({
    allow_single_deselect: true,
    'width': '100%'
});

//  tbldata();
Clear();
/* save the fields in the cassandra database */
function MQTTConnectorSave() {
    try {


        var DeviceID = $("#txt_MQTTConnectorDeviceID").val();
        var DeviceName = $("#txt_MQTTConnectorDeviceName").val();
        var DeviceType = $("#txt_MQTTConnectorDeviceType").val();
        var DeviceModel = $("#txt_MQTTConnectorDeviceModel").val();
        var Host = $('#MQTTHost_dd option:selected').val();
        var Port = $("#txt_MQTTConnectorPort").val();
        var UserName = $("#txt_MQTTConnectorUserName").val();
        var PassWord = $("#txt_MQTTConnectorPassWord").val();
        var Topic = $("#txt_MQTTConnectorTopic").val();
        //var PayLoad = $("#txt_MQTTConnectorPayLoad").val();
        if (DeviceID == "null" || DeviceID == "") {

            $(".v1").show();
            $(".v1").fadeOut(5000)
        }
        if (DeviceName == "null" || DeviceName == "") {

            $(".v2").show();
            $(".v2").fadeOut(5000)

        }

        if (DeviceType == "null" || DeviceType == "") {

            $(".v3").show();
            $(".v3").fadeOut(5000)

        }

        if (DeviceModel == "null" || DeviceModel == "") {

            $(".v4").show();
            $(".v4").fadeOut(5000)

        }

        if (UserName == "null" || UserName == "") {

            $(".v5").show();
            $(".v5").fadeOut(5000)

        }

        if (PassWord == "null" || PassWord == "") {

            $(".v6").show();
            $(".v6").fadeOut(5000)

        }

        if (Topic == "null" || Topic == "") {

            $(".v7").show();
            $(".v7").fadeOut(5000)

        }


        else if (!DeviceID == "" || !DeviceName == "") {


            var Data = JSON.stringify({
                DeviceID: DeviceID,
                DeviceName: DeviceName,
                DeviceType: DeviceType,
                DeviceModel: DeviceModel,
                Host: Host,
                Port: Port,
                UserName: UserName,
                PassWord: PassWord,
                Topic: Topic,
                //PayLoad : PayLoad
            });
            StartPageLoader();
            $.ajax({
                url: '../MQTTConnectorSave_Device',
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: Data,
                success: function (response) {
                    alert(JSON.stringify(response));
                    if (response.isauthenticated == false) {
                        StopPageLoader();
                        //fn_session_expired_client();
                    }
                    else {
                        if (response.error) {

                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code MQTTConnectorSave_Device", "error_alert", "", "");
                            StopPageLoader();
                        }
                        else {

                            fn_SuccessNotification(response, "success_alert", "", "");
                            Clear();

                        }
                    }
                }, error: function (jqXHR, exception) {
                    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code MQTTConnectorSave_Device", "error_alert", "", "");
                    StopPageLoader();
                }

            });
        }
        //MQttMsgpub();

    } catch (e) {
        fn_errorNotification(e.message, e.message, "error occured at Save Details", "error_alert", "", "");
    }
}

function Clear() {
    $("#txt_MQTTConnectorDeviceID").val("");
    $("#txt_MQTTConnectorDeviceName").val("");
    $("#txt_MQTTConnectorDeviceType").val("");
    $("#txt_MQTTConnectorDeviceModel").val("");
    $("#txt_MQTTConnectorUserName").val("");
    $("#txt_MQTTConnectorPassWord").val("");
    $("#txt_MQTTConnectorTopic").val("");
    //$("#txt_MQTTConnectorPayLoad").val("");
}


function tbldata() {
    try {
        var MQTTConnector = ''
        StartPageLoader();
        $.ajax({
            url: '../MQTT_DeviceList',
            type: "GET",
            success: function (response) {
                if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code MQTTConnectorSave_Device", "error_alert", "", "");
                    StopPageLoader();
                }
                else {


                    var data = response.rows;
                    for (var i = 0; i < data.length; i++) {

                        MQTTConnector += "<tr><td>" + data[i].topic
                                + "</td><td>" + data[i].deivceid + "</td><td>"
                                + data[i].devicename + "</td><td>"
                                + data[i].devicetype + "</td><td>"
                                + data[i].devicemodel + "</td></tr>";
                        $("#tblbody7").empty();
                        $("#ftbl").append(MQTTConnector);
                        StopPageLoader();
                    }
                    $("#ftbl").DataTable();
                }


            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at  code MQTT_DeviceList", "error_alert", "", "");
                StopPageLoader();
            }
        });
    } catch (e) {
        fn_errorNotification("200", e.message, e.message, "error occured at code MQTT_DeviceList", "error_alert", "", "");
    }

}


$("#ddlver2").change(
               function () {
                   var selectedValue = $(this).val();
                   //alert(selectedValue);
                   $("#txttopic").val(
                           $(this).find("option:selected").attr("value"))
                   //$("#txtCName1").val(selectedValue);

                   //$("#txtCName").append(selectedValue);
               });

var ConsumeArray = [];
var tbl_name = '';
$(document).on('click', '#btnConsume2', function (e) {
    try {
        StartPageLoader();
        var selectedTopic = $("#txttopic").val();
        tbl_name = selectedTopic;
        var socket = new WebSocket('ws://localhost:1337');
        socket.onopen = function () {
            socket.send(selectedTopic);
        };

        socket.onmessage = function (message) {
            //alert(JSON.stringify(message.data));

            if (message.data == "offline" || message.data == 'offline') {
                StopPageLoader();
                fn_errorNotification("200", "undefined", "", "error occured at connecting from MQTT Server", "error_alert", "", "");
            }

            else {
                StopPageLoader();
                $("#tblMqtt23").empty();

                var msgdata = message.data;
                //a.replace(/'/g, '"');
                var mytopic_msg = msgdata.replace(/\'/g, "\"");
                mymessages = new Array();
                ConsumeArray.push(mytopic_msg);

                //alert(JSON.stringify(ConsumeArray));
                var Topic = '';
                var Topic = $('#ddlver2 :selected').text();

                var markup2 = "<tr><td>"
                         + Topic
                         + "</td><td>"
                         + mytopic_msg
                         + "</td><td><input type='checkbox' class='chk1'  value=" + mytopic_msg + "> </td</tr>";
                // $("#tblbody10").empty();
                // alert(markup2);

                $("#tblMqtt23").append(markup2);

                $("#tblMqtt23").DataTable();

            }
            //content.innerHTML += message.data + '<br />';
        };

        socket.onerror = function (error) {
            // console.log('WebSocket error: ' + error);
        };
    } catch (e) {
        fn_errorNotification(e.message, e.message, "error occured at data getting Consuming", "error_alert", "", "");
    }
});
//var content = document.getElementById('content');


DropDownTopic();
function DropDownTopic() {
    try {


        StartPageLoader();
        $.ajax({
            url: '../Topics_Mqtt',
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                //alert(JSON.stringify(response.rows));
                if (response.error) {

                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code MQTTConnectorSave_Device", "error_alert", "", "");
                    StopPageLoader();
                }
                else {

                    var drpdwn = '<option value="">Select</option>';

                    for (var i = 0; i < response.rows.length; i++) {

                        drpdwn += '<option value="' + response.rows[i].topic + '">' + response.rows[i].topic + '</option>';

                    }
                    $("#ddlver2").empty();
                    $("#ddlver2").append(drpdwn);
                    $('#ddlver2').trigger("chosen:updated");
                }

            }, error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code MQTTConnectorSave_Device", "error_alert", "", "");
                StopPageLoader();
            }

        });
    } catch (e) {
        fn_errorNotification(e.message, e.message, "error occured at data getting Dropdwn append", "error_alert", "", "");

    }
}











$('#MQTT_PostGre').click(function () {

    if ($(this).is(":checked")) {

        // alert("Checkbox is checked.");

        $("#MQTT_PostGre").attr('checked', true);
        var Messages = ConsumeArray;
       // var tablename = tbl_name;
       // $("#txt_savedatabsetype").val('Checked');
        var Save_POSTGre = JSON.stringify({ Messages: Messages, tablename: tbl_name });

        //  var array = [1, 2, 3, 4];
        var lastEl = Messages[Messages.length - 1];
        alert(Save_POSTGre);

        $.ajax({
            url: './MQTTSaveintoPostGre',
            type: "POST",
            contentType: 'application/json',
            data: Save_POSTGre,
            success: function (response) {

                // alert(JSON.stringify(response));

                //  Mycassandradata();
                // setInterval(function () { Mycassandradata() }, 5000);
            }



        });
        // setInterval(Mycassandradata(), 5000);


    }

    else if ($(this).is(":not(:checked)")) {

        alert("Checkbox is unchecked.");
        $("#chk_Cassandra").attr('checked', false);
        $("#txt_savedatabsetype").val('');
    }

});

function Mycassandradata() {
    // alert("welcome");
    // var lastEl = mymessages[mymessages.length - 1];
    // alert(lastEl);
    // var MylatestMsg = JSON.stringify({ Messages: lastEl, tablename: tbl_name });

    var MylatestMsg = JSON.stringify({ Messages: ConsumeArray, tablename: tbl_name });
    $.ajax({
        url: './MQTTSaveintoPostGre',
        type: "POST",
        contentType: 'application/json',
        data: MylatestMsg,
        success: function (response) {

            alert(JSON.stringify(response));


        }



    });
}
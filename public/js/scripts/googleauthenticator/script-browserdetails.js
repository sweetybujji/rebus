/**
 * @author Srikanth
 * @created date 12/10/2017
 * @Modified By Srikanth
 * @Modified Date 12/10/2017
 *
 */



/**
@summary:Function for inserting data to database
@function code  :  fn_save_details_001
@return:success or failure notification
**/
function fn_save_details() {
    var Dataobj = [];
    var jobj = new Object();
    var uname = $("#uname").val();
    var dept = $("#dept").val();
    var empid = $("#empid").val();
    if (uname.length > 0 && dept.length > 0 && empid.length > 0) {
        jobj.uname = uname;
        jobj.dept = dept;
        jobj.empid = empid;
        Dataobj.push(jobj);
        $.ajax({
            url: "/savecassandra",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                }
                else {
                    fn_SuccessNotification(response, "success_alert", "", "");
                    //$.ajax({
                    //    url: "/savepostgresql",
                    //    type: 'POST',
                    //    contentType: 'application/json',
                    //    data: mydata,
                    //    success: function (response) {
                    //        // alert(response);
                    //        fn_SuccessNotification(response, "sucess_notification", "", "");

                    //        $("#uname").val("");
                    //        $("#dept").val("");
                    //        $("#empid").val("");
                    //    }
                    //});
                }

            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
            }
        });
    }
}



/**
@summary:To Update data in database
@function code  :  fn_save_details_002
@return:success or failure notification
**/

function fn_update_data() {
    if ($("#idlabel").length > 0) {
        var Dataobj = [];
        var jobj = new Object();

        var id = $("#idlabel").text();
        var uname = $("#uname").val();
        var dept = $("#dept").val();
        var empid = $("#empid").val();

        jobj.id = id;
        jobj.uname = uname;
        jobj.dept = dept;
        jobj.empid = empid;
        Dataobj.push(jobj);

        //Dataobj.push({ "id": id, "uname": uname, "dept": dept, "empid": empid });
        $.ajax({
            url: "/updatecassandra",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_002", "error_alert", "", "");
                }
                else {
                    fn_SuccessNotification(response, "success_alert", "", "");
                    window.location.href = "#SampleFormList";
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at update with code fn_update_data_002", "error_alert", "", "");
            }
        });
    }
}


/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs

    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}



function guid() {

    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length;
    //  alert(nav.userAgent.replace(/\D+/g, ''));
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    // alert(guid);
    return guid;
};




function capLock(e, id) {

    var kc = e.keyCode ? e.keyCode : e.which;
    var sk = e.shiftKey ? e.shiftKey : kc === 16;
    var visibility = ((kc >= 65 && kc <= 90) && !sk) ||
        ((kc >= 97 && kc <= 122) && sk) ? 'block' : 'none';
    $("#" + id).css({ "display": visibility });
   
}

/**
 * @author Srikanth
 * @created date 12/10/2017
 * @Modified By Srikanth
 * @Modified Date 12/10/2017
 *
 */

var rowid;
$(document).ready(function () {
    fn_getdata_list();
});

/**
@summary:To display data in list view from database
@function code:fn_getdata_list_001
**/

function fn_getdata_list() {

    $.ajax({
        url: "/listcassandra",
        type: 'get',
        success: function (response) {
           // alert(response.error)
            if (response.error) {
                fn_errorNotification("200", response.error, response.error, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
            }
            else {
                var data = "";
                $('#listtable').DataTable().destroy();
                $("#listbody").empty();

                for (var i = 0; i < response.length; i++) {
                    var idd = response[i]["id"];
                    data += '<tr id="' + response[i]["id"] + '"><td>' + (i + 1) + '</td><td>' + response[i]["username"] + '</td><td>' + response[i]["department"] + '</td><td>' + response[i]["empid"] + '</td></tr>'
                }
                $("#listbody").append(data);
                $("#listtable").DataTable({
                    // "scrollX": true
                });
            }
        },
        error: function (jqXHR, exception) {
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
        }
    });
}


var rowid;
/*To highlight row on click*/

$('#listbody').on('click', 'tr', function () {
    rowid = $(this).attr("id");
    $('#listbody tr').each(function () {

        $(this).css("background-color", "unset");
    });

    $(this).css("background-color", "#438eb9");

});

/**
@summary:To delete data from database
@function code:cassandradelete_002
**/

function cassandradelete() {
    var Dataobj = [];
    var jobj = new Object();
    jobj.id = rowid;
    Dataobj.push(jobj);
    $.ajax({
        url: "/delcassandra",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Dataobj),
        success: function (response) {
            //alert(data);
            if (response.error) {
                fn_errorNotification("200", response.error, response.error, "error occured at delete data with code cassandradelete_001", "error_alert", "", "");
            }
            else {
                fn_SuccessNotification(response, "success_alert", "", "");
                fn_getdata_list();
                rowid = "";
            }
        },
        error: function (jqXHR, exception) {
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at delete data with code cassandradelete_001", "error_alert", "", "");
        }
    });
}

/*Navigate to main form and populate data*/
//function cassandraedit() {
//    if (rowid.length > 0) {

//        $("#editlink").attr("href", "#SampleFormListEdit/" + rowid + "/edit")

//    }
//}








/**
 * @author Srikanth
 * @created date 12/10/2017
 * @Modified By Srikanth
 * @Modified Date 12/10/2017
 *
 */

var rowid;
$(document).ready(function () {
    fn_get_userdata_list();
});

/**
@summary:To display data in list view from database
@function code:fn_getdata_list_001
**/

function fn_get_userdata_list() {
    try {
        StartPageLoader();
        $.ajax({
            url: "/User_List",
            type: 'get',
            success: function (response) {
               // if (response.isauthenticated == false) {
                 //   StopPageLoader();
                   // fn_session_expired_client();
               // }

                 if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                    StopPageLoader();
                }
                else {
                    var data = "";
                    $('#usertable').DataTable().destroy();

                    for (var i = 0; i < response.length; i++) {

                        var idd = response[i]["id"];

                        data += '<tr id="' + response[i].Id + '" fname=' + response[i].Firstname + '' + '' + response[i].Lastname + '><td>' + response[i].EmployeeId + '</td><td>' + response[i].Firstname + '' + '' + response[i].Lastname + '</td><td>' + response[i].EmailId + '</td><td>' + response[i].RoleName + '</td><td>' + response[i].chk_active + '</td></tr>'

                    }
                    $("#list_userBody").empty();
                    $("#list_userBody").append(data);
                    $("#usertable").DataTable({

                    });
                    StopPageLoader();
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_get_userdata_list", "error_alert", "", "");
                StopPageLoader();
            }
        });
    } catch (e) {

        fn_errorNotification("200", e, e, "error occured at data getting with code fn_get_userdata_list", "error_alert", "", "");
        StopPageLoader();
    }
}


var rowid;
/*To highlight row on click*/
var Sel_name;
$('#list_userBody').on('click', 'tr', function () {
    rowid = $(this).attr("id");
    Sel_name = $(this).attr('fname');
    $('#list_userBody tr').each(function () {

        $(this).css("background-color", "unset");
        $(this).css("color", "unset");
    });

    $(this).css("background-color", "#6f99c6 ");
    $(this).css("color", "white");

});

/**
@summary:To delete data from database
@function code:Userdelete
**/

function UserDelete() {
    try {
        var Dataobj = [];
        var jobj = new Object();
        jobj.id = rowid;
        Dataobj.push(jobj);
        alert(rowid)
        if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to to Delete " + Sel_name + "  Record?", function (result) {
                if (result) {
                    Sel_name = "";
                    $.ajax({
                        url: "/DeleteUser",
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(Dataobj),
                        success: function (response) {
                            //alert(data);
                            if (response.isauthenticated == false) {
                                StopPageLoader();

                                fn_session_expired_client();

                            }

                            else if (response.error) {
                                fn_errorNotification("200", response.error, response.error, "error occured at delete data with code Userdelete", "error_alert", "", "");
                            }
                            else {
                                fn_SuccessNotification(response, "success_alert", "", "");
                                fn_get_userdata_list();
                                rowid = "";
                            }
                        },
                        error: function (jqXHR, exception) {
                            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at delete data with code Userdelete", "error_alert", "", "");
                        }
                    });
                }
            });
        }
    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at delete data with code Userdelete", "error_alert", "", "");
    }

}

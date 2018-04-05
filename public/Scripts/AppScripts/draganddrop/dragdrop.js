
$(document).ready(function () {
    fn_get_userdata_list();
});



function fn_get_userdata_list() {
    try {
        //StartPageLoader();
        $.ajax({
            url: "/drag_list",
            type: 'get',
            success: function (response) {
               //console.log(data)
               //alert("hiii")
               // if (response.isauthenticated == false) {
                 //   StopPageLoader();
                   // fn_session_expired_client();
               // }

                 if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                    //StopPageLoader();
                }
                else {
                    var data = "";
                    $('#dragtable').DataTable().destroy();

                    for (var i = 0; i < response.length; i++) {

                        var idd = response[i]["id"];

                        data += '<tr id=' + response[i].formname + ' fname=' + response[i].formname + '><td>' + response[i].id + '</td><td>' + response[i].formname + '</td><td>' + response[i].jsonarray + '</td></tr>'
                    }
                    $("#drag_userBody").empty();
                    $("#drag_userBody").append(data);
                    $("#drag_userBody").DataTable({

                    });
                    //StopPageLoader();
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
var Sel_name;
var rowid;
setTimeout(function(){
  $('#drag_userBody').on('click', 'tr', function () {
  //  alert()
      rowid = $(this).attr("id");
      Sel_name = $(this).attr('fname');
    // alert(rowid)
     //alert(Sel_name)
      $('#drag_userBody tr').each(function () {

          $(this).css("background-color", "unset");
          $(this).css("color", "unset");
      });

      $(this).css("background-color", "#6f99c6 ");
      $(this).css("color", "white");

  });

},1000)
function  dragdropDelete() {
    alert(Sel_name)
    try {
        var Dataobj = [];
        var jobj = new Object();
        jobj.id = rowid;
        Dataobj.push(jobj);
         //alert(Sel_name)
         //alert(rowid)
        if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {

            fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to to Delete " + Sel_name + "  Record?", function (result) {
                if (result) {
                    Sel_name = "";
                    alert(JSON.stringify(Dataobj))
                    $.ajax({
                        url: "/deletedrag",
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(Dataobj),
                        success: function (response) {
                            //alert("hiii");
                            // if (response.isauthenticated == false) {
                            //     StopPageLoader();
                            //
                            //     fn_session_expired_client();
                            //
                            // }

                             if (response.error) {
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

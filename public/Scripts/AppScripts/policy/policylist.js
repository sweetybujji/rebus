

var rowid;
$(document).ready(function () {
    fn_get_policy_list();
});
function fn_get_policy_list() {
    //  alert("hiiii")
    try {
        //StartPageLoader();
        $.ajax({
            url: "/policy_list",
            type: 'get',
            success: function (response) {
            console.log(response)


                    var data = "";
                    $('#policytable').DataTable().destroy();

                    for (var i = 0; i < response.length; i++) {


                        var idd = response[i]["id"];
                        data += '<tr id=' + response[i].policyname + ' fname=' + response[i].policyname + '><td>' + response[i].policyname + '</td><td>' + response[i].status + '</td><td>' + response[i].minimumnoofcharaters + '</td><td>' + response[i].maxnoofcharaters + '</td><td>' + response[i].passwordexpirydays + '</td><td>' + response[i].sessionexpirytime + '</td><td>' + response[i].allowspecialcharaters + '</td><td>' + response[i].specialcharaters + '</td><td>' + response[i].number + '</td><td>' + response[i].uppercase + '</td><td>' + response[i].lowercase + '</td><td>' + response[i].setpassword + '</td>td>' + response[i].Multiple + '</td></tr>'
                      //  alert(response[i].Id)
                    }
                    $("#list_policyBody").empty();
                    $("#list_policyBody").append(data);
                    $("#policytable").DataTable({

                    });


            },

        });
    } catch (e) {

        fn_errorNotification("200", e, e, "error occured at data getting with code fn_get_userdata_list", "error_alert", "", "");
      //  StopPageLoader();
    }
}



var Sel_name;
var rowid;
setTimeout(function(){
  $('#list_policyBody').on('click', 'tr', function () {
  //  alert()
      rowid = $(this).attr("id");
      Sel_name = $(this).attr('fname');

      $('#list_policyBody tr').each(function () {

          $(this).css("background-color", "unset");
          $(this).css("color", "unset");
      });

      $(this).css("background-color", "#6f99c6 ");
      $(this).css("color", "white");

  });

},1000)

function policyDelete() {
    alert(Sel_name)
    try {
        var Dataobj = [];
        var jobj = new Object();
        jobj.id = rowid;
        Dataobj.push(jobj);
         alert(Sel_name)
         alert(rowid)
        if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {

            fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to to Delete " + Sel_name + "  Record?", function (result) {
                if (result) {
                    Sel_name = "";
                    alert(JSON.stringify(Dataobj))
                    $.ajax({
                        url: "/Deletepolicy",
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(Dataobj),
                        success: function (response) {
                            alert(data);
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
                                fn_get_policy_list();
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

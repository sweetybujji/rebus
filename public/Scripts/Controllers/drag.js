RapidApp.controller('draglistctrl', function ($scope, $location, $state) {
   //alert("hii")
   localStorage.setItem('id', '');
   localStorage.setItem('type', '');

   $scope.go = function (path) {
       $location.path(path);
   };


  $scope.dragupdate=function(){
     alert("hiii")

     if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {
         fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
     }
     else {

         bootbox.confirm("Do You want to Edit <b>" + Sel_name + " </b>Details?", function (result) {
             if (result) {
                 Sel_name = "";
                localStorage.setItem('id', rowid);
                 localStorage.setItem('type', 'edit');
                 $state.go('pwdPolicy', {
                     id: rowid,
                     type: 'edit',
                     Name: Sel_name
                });
             }
         });
     }
    };
});
RapidApp.controller('dragctrl', function ($scope, $location, $stateParams) {
  //var id = $stateParams.id;
   //var type = $stateParams.type;
  //
   var id = localStorage.getItem('id');
   var type = localStorage.getItem('type');
  var jobj = new Object();
  alert(type)
  // //
  // // /*To populate data in main form for edit operation*/
   if (type == "edit") {

     alert("welcome")
       var Dataobj = [];
       jobj.id = id;
       Dataobj.push(jobj);
     //StartPageLoader();
       $.ajax({
           url: "/getdropdata",
           type: 'get',
           contentType: 'application/json',
        // data: JSON.stringify(Dataobj),
           success: function (response) {
      //  alert(JSON.stringify(response));
        alert(JSON.stringify(response))
               // if (response.isauthenticated == false) {
              // //     StopPageLoader();
              // //
              // //     //fn_session_expired_client();
              // //
              // // }
              // else
             //  if (response.error) {
             //     fn_errorNotification("200", response.error, response.error, "error occured at getting data with code fn_save_details_003", "error_alert", "", "");
             //     StopPageLoader();
             // }
          //else {
          for (var i = 0; i < response.length; i++) {
           $("#txt_policyname").val(response[i]["policyname"]);
          //  $("#txt_status").val(response[i]["status"]);
             $("#txt_min_characters").val(response[i]["minimumnoofcharaters"]);
             $("#txt_max_charaters").val(response[i]["maxnoofcharaters"]);
             $("#txt_password").val(response[i]["passwordexpirydays"]);
             $("#txt_session").val(response[i]["sessionexpirytime"]);
             $("#txt_allow").val(response[i]["allowspecialcharaters"]);
             $("#idUserlabel").val(response[i]["policyname"])
            // $("#specialcharaters [value='" + response[0]["specialcharaters"] + "']").prop("checked", true);
            // $("#number [value='" + response[0]["number"] + "']").prop("checked", true);
            // $("#uppercase [value='" + response[0]["uppercase"] + "']").prop("checked", true);
            // $("#lowercase [value='" + response[0]["lowercase"] + "']").prop("checked", true);
            // $("#setpassword [value='" + response[0]["setpassword"] + "']").prop("checked", true);
            // $("#Multiple [value='" + response[0]["Multiple"] + "']").prop("checked", true);

            if (response[0]["specialcharaters"] == true || response[0]["specialcharaters"] == "true") {
                $("#chackbox2").attr('checked', 'checked');
            }
            else {
                $("#chackbox2").prop('');
            }
            if (response[0]["number"] == true || response[0]["number"] == "true") {
                $("#chackbox3").attr('checked', 'checked');
            }
            else {
                $("#chackbox3").prop('');
            }
            if (response[0]["uppercase"] == true || response[0]["uppercase"] == "true") {
                $("#chackbox4").attr('checked', 'checked');
            }
            else {
                $("#chackbox4").prop('');
            }
            if (response[0]["lowercase"] == true || response[0]["lowercase"] == "true") {
                $("#chackbox5").attr('checked', 'checked');
            }
            else {
                $("#chackbox5").prop('');
            }
            if (response[0]["setpassword"] == true || response[0]["setpassword"] == "true") {
                $("#chackbox6").attr('checked', 'checked');
            }
            else {
                $("#chackbox6").prop('');
            }
            if (response[0]["checkboxcheck"] == true || response[0]["checkboxcheck"] == "true") {
        // alert("txt_password")
                $("#chackbox8").attr('checked', true);
                //$("#txt_password").attr("enabled", "enabled");
                $("#txt_password").removeAttribute('disabled');
              // $("#txt_password").remove();
            }
            else {
                $("#chackbox8").prop('');
                 $("#txt_password").attr('disabled','disabled');
            }


            if (response[0]["checkboxchecked"] == true || response[0]["checkboxchecked"] == "true") {
                $("#chackbox9").attr('checked', 'checked');
                    $("#chackbox9").attr('checked', true);
                    $("#txt_allow").removeAttribute('disabled');

            }
            else {
                $("#chackbox9").prop('');
                 $("#txt_allow").attr('disabled','disabled');
            }
            if (response[0]["status"] == true || response[0]["status"] == "true") {
                $("#chackbox1").attr('checked', 'checked');
                $("#txt_password").attr('disabled','disabled');
            }
            else {
                $("#chackbox1").prop('');
                // $("#txt_password").attr('');
            }
            }

          }
            // $("#txt_policynamed").val(response[0]["policyname"]);
          //        $("txt_status").val(response[0]["policyStatus"]);
          //           $("#txt_min_characters").val(response[0]["passwordexpiry"]);
          //     $("#txt_max_charaters").val(response[0]["sessionexpiry"]);
          //      $("#txt_password").val(response[0]["createdby"]);
          // $("#txt_session").val(response[0]["createddate"]);
          //     $("#txt_allow").val(response[0]["modifiedby"]);
              //  $("#txt_Mobilenumber").val(response[0]["modifieddate"]);
           //$("#txt_Mobilenumber").val(response[0]["characters"]);
  //
  //                 $("#idUserlabel").val(response[0]["Id"]);
  //                 // if (response[0]["chk_active"] == true || response[0]["chk_active"] == "true") {
  //                 //     $("#chk_active").attr('checked', 'checked');
  //                 // }
  //                 // else {
  //                 //     $("#chk_active").prop('');
  //                 // }
  //
  //                 // setTimeout(function () {
  //                 //     $("#txt_Role").val(response[0]["Role"]);
  //                 //     $("#txt_Role").trigger("chosen:updated");
  //                 //     $("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]);
  //                 //     $("#txt_passwordPolicy").trigger("chosen:updated");
  //                 // }, 100);
  //                 // //$("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]).trigger("chosen:updated");
  //                 // //StopPageLoader();
  //             }
  //         },
  //         error: function (jqXHR, exception) {
  //             fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code getupdatedata_003", "error_alert", "", "");
  //             StopPageLoader();
  //         }
      //}
  });
}
});

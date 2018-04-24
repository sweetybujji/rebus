/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By tejasree
 * @Modified Date 13/04/2018
 */
RapidApp.controller('userctrl', function ($scope, $location, $stateParams, userfactory) {
/**
   @summary: To applying chosen pugin for select dropdowns
**/
 $("#txt_Role").chosen({
    allow_single_deselect: true,
    "width": "90%"
});
 $("#txt_passwordPolicy").chosen({
    allow_single_deselect: true,
    "width": "90%"
});
/**
@summary: To getting role name data  form  Admin_T_Roles table
          and bind to the role dropdown.
@function code:fn_get_roles_001
**/
 $scope.fn_get_roles =function() {
    try {
        StartPageLoader();

   userfactory.getroleacess().then(function (response) {

      var roledata=response.data

     if (response.isauthenticated == false) {
                 StopPageLoader();
                 fn_session_expired_client();

             }
             if (response.error) {

                 fn_errorNotification("200", response.error, response.error, "error occured at fn_get_roles_001", "error_alert", "", "");
                 StopPageLoader();
             }
             else if (response != "" && response != "null" && response != "[]" && response != [] && response != null) {
                 StopPageLoader();
                 $("#txt_Role").empty();

                 $("#txt_Role").append("<option value=''>--select--</option>");

                 for (var i = 0; i < roledata.length; i++) {

                     $("#txt_Role").append("<option value='" + roledata[i].RoleId + "'>" + roledata[i].RoleName + "</option>");

                 }

             }
             $("#txt_Role").trigger("chosen:updated");



}).catch(function (jqXHR, exception) {
    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_roles_001", "error_alert", "", "");
    StopPageLoader();
})

    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at fn_get_roles_001", "", "");
        StopPageLoader();
    }


}

/**
@summary: To getting password data form  Admin_T_PasswordPolicy table
           and bind into the role dropdown.
@function code:fn_get_password_002
**/
 $scope.fn_get_password = function () {
    try {
        StartPageLoader();
        userfactory.getpassword().then(function (response) {
           var passworddetails=response.data

                  if (response.isauthenticated == false) {
                      StopPageLoader();

                      fn_session_expired_client();

                  }
                  else if (response != "" && response != "null" && response != "[]" && response != [] && response != null) {
                      StopPageLoader();
                      $("#txt_passwordPolicy").empty();

                      $("#txt_passwordPolicy").append("<option value=''>--select--</option>");

                      for (var i = 0; i < passworddetails.length; i++) {

                          $("#txt_passwordPolicy").append("<option value='" + passworddetails[i].PolicyID + "'>" + passworddetails[i].PolicyName + "</option>");

                      }

                  }
                  $("#txt_passwordPolicy").trigger("chosen:updated");

                  if (response.error) {
                      fn_errorNotification("200", response.error, response.error, "error occured at fn_get_password_002", "error_alert", "", "");
                      StopPageLoader();
                  }


        }).catch(function (jqXHR, exception) {
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_password_002", "error_alert", "", "");
            StopPageLoader();
        })



   } catch (e) {
       fn_errorNotification("200", e, e, "error occured at fn_get_password_002", "error_alert", "", "");
        StopPageLoader();
    }


}
/**
@summary: To edit the data user screen form Admin_M_Users.
@ function code:get_user_data_003
**/
var id = localStorage.getItem('id');
    var type = localStorage.getItem('type');
    var jobj = new Object();
    if (type == "edit") {
        var dataobj = [];
        jobj.id = id;
        dataobj.push(jobj);
        StartPageLoader();
       userfactory.getuserdata(dataobj).then(function (response) {
         var userdata=response["data"];
          if (response.isauthenticated == false) {
                     StopPageLoader();
             }
                 else if (response.error) {
                     fn_errorNotification("200", response.error, response.error, "error occured at get_user_data_003 ", "error_alert", "", "");
                     StopPageLoader();
                 }
                 else {
                     $("#txt_EmpId").val(userdata[0]["EmployeeId"]);
                     $("#txt_firstname").val(userdata[0]["Firstname"]);
                     $("#txt_lastname").val(userdata[0]["Lastname"]);
                     $("#txt_EmailId").val(userdata[0]["EmailId"]);
                     $("#txt_countrycode").val(userdata[0]["Countrycode"]);
                     $("#txt_Mobilenumber").val(userdata[0]["Mobilenumber"]);

                     $("#idUserlabel").val(userdata[0]["Id"]);
                     if (userdata[0]["chk_active"] == true || userdata[0]["chk_active"] == "true") {
                         $("#chk_active").attr('checked', 'checked');
                     }
                     else {
                         $("#chk_active").prop('');
                     }

                     setTimeout(function () {
                         $("#txt_Role").val(userdata[0]["Role"]);
                         $("#txt_Role").trigger("chosen:updated");
                         $("#txt_passwordPolicy").val(userdata[0]["PasswordPolicy"]);
                         $("#txt_passwordPolicy").trigger("chosen:updated");
                     }, 100);
                StopPageLoader();
                 }
       }).catch(function (jqXHR, exception) {
           fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at get_user_data_003", "error_alert", "", "");
           StopPageLoader();
       })



    }

/**
@summary: To save user data form Admin_M_Users table.
@function code:fn_save_userdetails_004
**/
  $scope.fn_save_userdetails =function() {
       try {
           var Firstname = $("#txt_firstname").val();
           var MiddelName = $("#txt_MiddelName").val();
           var Lastname = $("#txt_lastname").val();
           var EmailId = $("#txt_EmailId").val();
           var Countrycode = $("#txt_countrycode").val();
           var Mobilenumber = $("#txt_Mobilenumber").val();
           var EmployeeId = $("#txt_EmpId").val();
           var Role = $("#txt_Role option:selected").val();
           var chk_active = $("#chk_active").prop('checked');
           var Id = $("#idUserlabel").val();
           var PasswordPolicy = $("#txt_passwordPolicy").val();
           var ErFlag = 0;

           $(".Error").hide();

           if (Firstname == "" || Firstname == "null" || Firstname == null) {
               ErFlag++;
               $("#er_fName").show();
               $("#er_fName").html("<b> first !! </b> Input is required.");
           }

           if (Lastname == "" || Lastname == "null" || Lastname == null) {
               ErFlag++;
               $("#er_LName").show();
               $("#er_LName").html("<b> lastname !! </b> Input is required.");
           }

           if (EmailId == "" || EmailId == "null" || EmailId == null) {
               ErFlag++;
               $("#er_EmailID").show();
               $("#er_EmailID").html("<b> email id !! </b> Input is required.");
           }
           if (Countrycode == "" || Countrycode == "null" || Countrycode == null) {
               ErFlag++;
               $("#er_Ccode").show();
               $("#er_Ccode").html("<b> Code !! </b> Input is required.");
           }
           if (Mobilenumber == "" || Mobilenumber == "null" || Mobilenumber == null) {
               ErFlag++;
               $("#er_MNumber").show();
               $("#er_MNumber").html("<b> Mobile Number !! </b> Input is required.");
           }
           if (EmployeeId == "" || EmployeeId == "null" || EmployeeId == null) {
               ErFlag++;
               $("#er_Empid").show();
               $("#er_Empid").html("<b> Employee Id !! </b> Input is required.");
           }
           if (Role == "" || Role == "null" || Role == null) {
               ErFlag++;
               $("#er_role").show();
               $("#er_role").html("<b> Role !! </b> Input is required.");
           }


           if (PasswordPolicy == "" || PasswordPolicy == "null" || PasswordPolicy == null) {
               ErFlag++;
               $("#er_PasswordPolicy").show();
               $("#er_PasswordPolicy").html("<b> Password !! </b> Input is required.");
           }
           if (ErFlag == 0) {
                  var UserDetails = JSON.stringify({
                   Firstname: Firstname,
                   MiddelName: MiddelName,
                   Lastname: Lastname,
                   EmailId: EmailId,
                   Countrycode: Countrycode,
                   Mobilenumber: Mobilenumber,
                   EmployeeId: EmployeeId,
                   Role: Role,
                   chk_active: chk_active,
                   Id: Id,
                   PasswordPolicy: PasswordPolicy
               });

          if ($("#idUserlabel").val() != "" && $("#idUserlabel").val() != null && $("#idUserlabel").val() != "undefined") {
                  StartPageLoader();
                   userfactory.updateuser(UserDetails).then(function (response) {
                     var  userdata=response.data

                       if (userdata.isauthenticated == false) {
                           StopPageLoader();
                           fn_session_expired_client();
                         }

                       else if (userdata.error) {
                           fn_errorNotification("200", userdata.error, userdata.error, "error occured at fn_save_userdetails_004", "error_alert", "", "");
                           StopPageLoader();
                       }
                       else {
                           fn_SuccessNotification(userdata, "success_alert", "", "");
                           localStorage.setItem('id', '');
                           localStorage.setItem('type', '');
                           window.location.href = "#UserFormList";
                           StopPageLoader();
                       }

                   }).catch(function (jqXHR, exception) {
                       fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at  fn_save_userdetails_004", "error_alert", "", "");
                       StopPageLoader();
                   })

                   }
       else {
            StartPageLoader();
                   userfactory.saveuserdetails(UserDetails).then(function (response) {

                      var data=response.data
                        if(data==false){
                          fn_errorNotification("200", data.error, data.error, "Technical Error Occured atfn_save_userdetails_004", "error_alert", "", "");

                        }

                       if (data.isauthenticated == false) {

                                       StopPageLoader();

                                        fn_session_expired_client();
                                          

                                    }
                                    else if (data.error) {
                                        fn_errorNotification("200", data.error, data.error, "Technical Error Occured atfn_save_userdetails_004", "error_alert", "", "");
                                    }
                                    else {
                                        fn_SuccessNotification(data, "success_alert", "", "");

                                        $scope.fn_user_clear_textbox();
                                    }
                                    StopPageLoader();

            }).catch(function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_save_userdetails_004", "error_alert", "", "");
                       StopPageLoader();
                   })

               }

           }
       } catch (e) {
           fn_errorNotification("200", e, e, "error occured  at fn_save_userdetails_004", "error_alert", "", "");
           StopPageLoader();
       }

    }
    /**
    @summary:  To used to clear the user form text fileds.
    @function code:user_clear_textbox_005
    **/
   $scope.fn_user_clear_textbox =function() {
        try {
            localStorage.setItem('id', '');
            localStorage.setItem('type', '');
            $("#txt_Role").val('').trigger("chosen:updated");
            $("#txt_passwordPolicy").val('').trigger("chosen:updated");
            $("input[type=text], textarea").val("");
           $("#chk_active").attr('checked', false);
         } catch (e) {
             fn_errorNotification("200", e, e, "error occured at user_clear_textbox_005", "error_alert", "", "");
        }

    }

    /**
    @summary: To getting employee data  form  Employee_M_Employee table
              and bind to the table.
    @function code:fn_get_allempdetails_006
    **/
 $scope.fn_get_allempdetails=function() {

    try {
        var textVal = $("#txt_EmpId").val();
        var mytextval = JSON.stringify({ textVal: textVal });
        StartPageLoader();
    userfactory.getemployeebasedonid(mytextval).then(function (response) {
      var employee=response.data

      if (employee.isauthenticated == false) {
                  StopPageLoader();
                  fn_session_expired_client();
                }

              else if (employee == false) {
                  fn_errorNotification("200", employee.error, employee.error, "error occured at fn_get_allempdetails_006", "error_alert", "", "");
                  StopPageLoader();
              }
              else if (employee.error) {
                  fn_errorNotification("200", employee.error, employee.error, "error occured at fn_get_allempdetails_006", "error_alert", "", "");
                  StopPageLoader();
              }
              else {
               $("#txt_EmailId").val(employee[0].Email);
                var data = employee[0].MobileNumber;
               var arr = employee.split('-');
                  $("#txt_countrycode").val(arr[0]);
                  $("#txt_Mobilenumber").val(arr[1]);
                  StopPageLoader();
              }
       }).catch(function (jqXHR, exception) {
           fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_allempdetails_006", "error_alert", "", "");
               StopPageLoader();
           })
      } catch (e) {
          fn_errorNotification("200", e, e, "error occured at fn_get_allempdetails_006", "error_alert", "", "");
        StopPageLoader();
     }

}
  /**
  @summary: To getting employee data  form  Employee_M_Employee table
            and bind to the text fields employee list  show in the
            popup table service call  taking  userfactory.
  @function code:fn_get_employeeid_007
  **/
 $scope.fn_get_employeeid=function() {
    try {
        StartPageLoader();

        userfactory.getemployeelist().then(function(data){
          var data=data.data
           if (data.isauthenticated == false) {
                          StopPageLoader();
                          fn_session_expired_client();

                      }

                      else if (data == false) {
                          fn_errorNotification("200", data.error, data.error, "error occured at fn_get_employeeid_007", "error_alert", "", "");
                          StopPageLoader();
                      }
                      else if (data.error) {
                          fn_errorNotification("200", data.error, data.error, "error occured at save data with code fn_get_employeeid_007", "error_alert", "", "");
                          StopPageLoader();
                      }
                      else {
                          fn_Lookup_Utility_textbox(data, "tableid", "EmpId", "txt_EmpId", "fn_get_allempdetails");
                          StopPageLoader();

                      }
   }).catch(function (jqXHR, exception) {
       fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured atfn_get_employeeid_007", "error_alert", "", "");
                   StopPageLoader();
               })

     } catch (e) {
         fn_errorNotification("200", e, e, "error occured at save data with code fn_get_employeeid_007", "error_alert", "", "");
         StopPageLoader();
     }
}


});

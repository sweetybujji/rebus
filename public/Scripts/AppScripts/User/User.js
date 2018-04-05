$("#sel_Countrycode").chosen({
    allow_single_deselect: true,
    "width": "100%"
});
$("#txt_Role").chosen({
    allow_single_deselect: true,
    "width": "90%"
});
$("#txt_passwordPolicy").chosen({
    allow_single_deselect: true,
    "width": "90%"
});

fn_Get_Roles();
fn_get_Password();

function fn_Get_Roles() {
    try {
        StartPageLoader();
        $.ajax({
            url: '../GetRoleAcess',
            contentType: 'application/json',
            type: 'GEt',
            success: function (response) {
                // alert(JSON.stringify(response));
                if (response.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();

                }
                if (response.error) {

                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                    StopPageLoader();
                }
                else if (response != "" && response != "null" && response != "[]" && response != [] && response != null) {
                    StopPageLoader();
                    $("#txt_Role").empty();

                    $("#txt_Role").append("<option value=''>--select--</option>");

                    for (var i = 0; i < response.length; i++) {

                        $("#txt_Role").append("<option value='" + response[i].RoleId + "'>" + response[i].RoleName + "</option>");

                    }

                }
                $("#txt_Role").trigger("chosen:updated");




            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                StopPageLoader();
            }


        });


    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
        StopPageLoader();
    }


}

function fn_get_Password() {
    try {
        StartPageLoader();
        $.ajax({
            url: '../GetPassword',
            contentType: 'application/json',
            type: 'GET',
            success: function (response) {
              //  if (response.isauthenticated == false) {
                 //   StopPageLoader();

                   // fn_session_expired_client();

                //}
                 if (response != "" && response != "null" && response != "[]" && response != [] && response != null) {
                    StopPageLoader();
                    $("#txt_passwordPolicy").empty();

                    $("#txt_passwordPolicy").append("<option value=''>--select--</option>");

                    for (var i = 0; i < response.length; i++) {

                        $("#txt_passwordPolicy").append("<option value='" + response[i].PolicyID + "'>" + response[i].PolicyName + "</option>");

                    }

                }
                $("#txt_passwordPolicy").trigger("chosen:updated");

                if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                    StopPageLoader();
                }


            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                StopPageLoader();
            }


        });




    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_get_Password", "error_alert", "", "");
        StopPageLoader();
    }


}


function fn_save_Userdetails() {
    try {

        //alert(rowid);
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

                //StartPageLoader();
                 alert(ErFlag)
                $.ajax({
                    url: "/UpdateUser",
                    type: 'POST',
                    contentType: 'application/json',
                    data: UserDetails,
                    success: function (response) {
                        if (response.isauthenticated == false) {
                            StopPageLoader();

                            fn_session_expired_client();

                        }

                        else if (response.error) {

                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
                            StopPageLoader();
                        }
                        else {
                            fn_SuccessNotification(response, "success_alert", "", "");
                            localStorage.setItem('id', '');
                            localStorage.setItem('type', '');
                            window.location.href = "#UserFormList";
                            StopPageLoader();
                        }
                    },
                    error: function (jqXHR, exception) {
                        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at update with code fn_save_Userdetails", "error_alert", "", "");
                        StopPageLoader();
                    }
                });
            }


            else {

                StartPageLoader();
                $.ajax({
                    url: '../SaveUserDetails',
                    contentType: 'application/json',
                    type: 'POST',
                    data: UserDetails,
                    success: function (response) {
                        //alert(data);
                        if (response.isauthenticated == false) {
                            StopPageLoader();

                            fn_session_expired_client();

                        }
                        else if (response.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification(response, "success_alert", "", "");

                            ClearTextbox();
                        }
                        StopPageLoader();
                    },
                    error: function (jqXHR, exception) {
                        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                        StopPageLoader();
                    }


                });
            }

        }
    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
        StopPageLoader();
    }

}

function ClearTextbox() {



    try {
        localStorage.setItem('id', '');
        localStorage.setItem('type', '');
        $("#txt_Role").val('').trigger("chosen:updated");
        $("#txt_passwordPolicy").val('').trigger("chosen:updated");
        $("input[type=text], textarea").val("");

        //  $("#chk_active").prop('');

        $("#chk_active").attr('checked', false);

    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code ClearTextbox", "error_alert", "", "");
    }

}


function fn_EmployeeId() {
    try {
        StartPageLoader();
        $.ajax({
            url: '../EmployeeList',
            contentType: 'application/json',
            type: 'GET',
            success: function (data) {
                if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();

                }

                else if (data == false) {
                    fn_errorNotification("200", data.error, data.error, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
                    StopPageLoader();
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
                    StopPageLoader();
                }
                else {
                    fn_Lookup_Utility_textbox(data, "tableid", "EmpId", "txt_EmpId", "fn_GetAllDetails");
                    StopPageLoader();
                    //fn_GetAllDetails();
                }

            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_EmployeeId", "error_alert", "", "");
                StopPageLoader();
            }

        });


    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
        StopPageLoader();
    }


}


function fn_GetAllDetails() {
    //  alert("fn_GetAllDetails");
    try {
        var textVal = $("#txt_EmpId").val();
        var mytextval = JSON.stringify({ textVal: textVal });
        StartPageLoader();
        $.ajax({
            url: '../GetEmployeeBasedOnId',
            contentType: 'application/json',
            type: 'POST',
            data: mytextval,
            success: function (data) {
                // alert(JSON.stringify(data));

                if (data.isauthenticated == false) {
                    StopPageLoader();

                    fn_session_expired_client();

                }

                else if (data == false) {
                    fn_errorNotification("200", data.error, data.error, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
                    StopPageLoader();
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
                    StopPageLoader();
                }
                else {

                    //for (var i = 0; i < data.length; i++) {
                    //alert(data[i].Email);
                    $("#txt_EmailId").val(data[0].Email);


                    var data = data[0].MobileNumber;
                    // alert(data);
                    var arr = data.split('-');
                    $("#txt_countrycode").val(arr[0]);
                    $("#txt_Mobilenumber").val(arr[1]);

                    // }
                    StopPageLoader();

                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_EmployeeId", "error_alert", "", "");
                StopPageLoader();
            }

        });


    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_EmployeeId", "error_alert", "", "");
        StopPageLoader();
    }



}

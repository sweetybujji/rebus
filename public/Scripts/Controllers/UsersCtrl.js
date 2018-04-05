/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('UserFormListCtrl', function ($scope, $location, $state) {
    localStorage.setItem('id', '');
    localStorage.setItem('type', '');

    $scope.go = function (path) {
        $location.path(path);
    };
    $scope.Userform_update = function () {
        if (Sel_name == undefined || Sel_name == "undefined" || Sel_name == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {

            bootbox.confirm("Do You want to Edit " + Sel_name + " Details?", function (result) {
                if (result) {
                    Sel_name = "";
                    localStorage.setItem('id', rowid);
                    localStorage.setItem('type', 'edit');
                    $state.go('Users', {
                        id: rowid,
                        type: 'edit',
                        Name: Sel_name
                    });
                }
            });
        }
    };
});

RapidApp.controller('UsersCtrl', function ($scope, $location, $stateParams) {
    //var id = $stateParams.id;
    //var type = $stateParams.type;

    var id = localStorage.getItem('id');
    var type = localStorage.getItem('type');
    var jobj = new Object();

    /*To populate data in main form for edit operation*/
    if (type == "edit") {
        var Dataobj = [];
        jobj.id = id;
        Dataobj.push(jobj);
        StartPageLoader();
        $.ajax({
            url: "/GetUserData",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.isauthenticated == false) {
                    StopPageLoader();

                    //fn_session_expired_client();

                }
                else if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at getting data with code fn_save_details_003", "error_alert", "", "");
                    StopPageLoader();
                }
                else {
                    $("#txt_EmpId").val(response[0]["EmployeeId"]);
                    $("#txt_firstname").val(response[0]["Firstname"]);
                    $("#txt_lastname").val(response[0]["Lastname"]);
                    $("#txt_EmailId").val(response[0]["EmailId"]);
                    $("#txt_countrycode").val(response[0]["Countrycode"]);
                    $("#txt_Mobilenumber").val(response[0]["Mobilenumber"]);

                    $("#idUserlabel").val(response[0]["Id"]);
                    if (response[0]["chk_active"] == true || response[0]["chk_active"] == "true") {
                        $("#chk_active").attr('checked', 'checked');
                    }
                    else {
                        $("#chk_active").prop('');
                    }

                    setTimeout(function () {
                        $("#txt_Role").val(response[0]["Role"]);
                        $("#txt_Role").trigger("chosen:updated");
                        $("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]);
                        $("#txt_passwordPolicy").trigger("chosen:updated");
                    }, 100);
                    //$("#txt_passwordPolicy").val(response[0]["PasswordPolicy"]).trigger("chosen:updated");
                    StopPageLoader();
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code getupdatedata_003", "error_alert", "", "");
                StopPageLoader();
            }
        });
    }
});

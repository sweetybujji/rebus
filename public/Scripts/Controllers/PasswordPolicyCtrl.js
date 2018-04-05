/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('PasswordPolicyListCtrl', function ($scope, $location, $state) {
    localStorage.setItem('PolicyId', '');
    localStorage.setItem('PolicyEditType', '');

    $scope.go = function (path) {
        $location.path(path);
    };

    var PolicyId = ""; var PolicyName = "";
    $('#ListBody').on('click', 'tr', function () {
        PolicyId = $(this).attr("id");
        PolicyName = $(this).attr("data-policyname");
        $('#ListBody tr').each(function () {
            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });
        $(this).css("background-color", "#6f99c6");
        $(this).css("color", "white");
    });

    $scope.EditPasswordPolicy = function () {
        if (PolicyId == "" || PolicyId == null || PolicyId == "null") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to Edit " + PolicyName + "  Details?", function (result) {
                if (result) {
                    localStorage.setItem('PolicyId', PolicyId);
                    localStorage.setItem('PolicyEditType', 'Update');
                    $state.go('PasswordPolicyCreation', {
                        id: PolicyId,
                        type: 'Update'
                    });
                }
            });
        }
    };

    $scope.DeletePasswordPolicy = function () {
        if (PolicyId == "" || PolicyId == null || PolicyId == "null") {
            fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
        }
        else {
            try {
                bootbox.confirm("Do You want to to Delete " + PolicyName + " record?", function (result) {
                    if (result) {
                        $.ajax({
                            url: '/DeletePasswordPolicy',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({ PolicyId: PolicyId }),
                            success: function (response) {
                                if (response.isauthenticated == false) {
                                    //StopPageLoader();
                                    fn_session_expired_client();

                                }
                                else if (response.error) {
                                    fn_errorNotification("200", response.error, response.error, "Error occured at deleting data with code DeletePasswordPolicy", "error_alert", "", "");
                                }
                                else {
                                    fn_SuccessNotification(response, "success_alert", "", "");
                                    PolicyId = "";
                                    GetPasswordPolicies();
                                }
                            },
                            error: function (jqXHR, exception) {
                                fn_errorNotification(jqXHR.status, jqXHR, exception, "Error occured at DeletePasswordPolicy", "error_alert", "", "");
                            }
                        });
                    }
                });
            }
            catch (e) {
                fn_errorNotification("200", e, e, "Error occured at DeletePasswordPolicy", "error_alert", "", "");
            }
        }
    };
});

RapidApp.controller('PasswordPolicyCtrl', function ($scope, $location, $stateParams) {

    PolicyId = localStorage.getItem('PolicyId');
    type = localStorage.getItem('PolicyEditType');

    if (type == "Update") {
        $.ajax({
            url: "/GetPasswordPolicyDetails",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ PolicyId: PolicyId }),
            success: function (response) {
                if (response.isauthenticated == false) {
                    //StopPageLoader();
                   // fn_session_expired_client();
                }
                else if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "Error occured getting data with code GetPasswordPolicyDetails", "error_alert", "", "");
                }
                else {
                    $("#PolicyName").val(response[0]["PolicyName"]);
                    $("#Status").val(response[0]["Status"]);
                    $("#Status").trigger("chosen:updated");
                    $("#MinCharacters").val(response[0]["MinCharacters"]);
                    $("#MaxCharacters").val(response[0]["MaxCharacters"]);
                    $("#PasswordExpiry").val(response[0]["PasswordExpiry"]);
                    $("#SessionExpiry").val(response[0]["SessionExpiry"]);
                    $("input[name=SpecialCharRequired][value='" + response[0]["SpecialCharRequired"] + "']").prop("checked", true);
                    $("#AllowedSpecialChar").val(response[0]["AllowedSpecialChar"]);
                    $("input[name=NumberRequired][value='" + response[0]["NumberRequired"] + "']").prop("checked", true);
                    $("input[name=LowerCaseRequired][value='" + response[0]["LowerCaseRequired"] + "']").prop("checked", true);
                    $("input[name=UpperCaseRequired][value='" + response[0]["UpperCaseRequired"] + "']").prop("checked", true);
                    $("input[name=ResetPassword][value='" + response[0]["ResetPassword"] + "']").prop("checked", true);
                    $("input[name=MultiSession][value='" + response[0]["MultiSession"] + "']").prop("checked", true);
                    if (response[0]["SpecialCharRequired"] == "No") {
                        $("#AllowedSpecialChar").val("")
                        $("#AllowedSpecialChar").attr("disabled", true);
                    }
                    else {
                        $("#AllowedSpecialChar").attr("disabled", false);
                    }
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "Error occured at GetPasswordPolicyDetails", "error_alert", "", "");
            }
        });
    }
});

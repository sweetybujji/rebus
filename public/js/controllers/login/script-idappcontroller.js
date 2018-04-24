Loginapp.controller('loginctrl', function ($scope, $location, $window, loginFactory) {
    $("#btn_LDap_Login").focus();

    $("#Forgot_LDap_form").hide();
    $("#Forgot_LDap_form").hide();

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.Reg_LDapLogin = function () {

        try {
            startloader();
            var ErFlag = 0;
            var User_Name = $("#txt_LDap_login_UserName").val().trim();
            var User_Password = $("#txt_LDap_login_Password").val().trim();
            $(".Error").hide();

            var Captch_Text = $("#txt_LDap_Captcha").val();
            var ValidateCaptcha = $("#ex_LDap_Captcha").val();

            if (User_Name == "" || User_Name == "null" || User_Name == null) {
                ErFlag++;
                $("#er_LDap_login_UserName").show();
                $("#er_LDap_login_UserName").html("<b> Username !! </b> Input is required.");
            }

            if (User_Password == "" || User_Password == "null" || User_Password == null) {
                ErFlag++;
                $("#er_LDap_login_Password").html("<b> Password !! </b> Input is required.");
                $("#er_LDap_login_Password").show();
            }

            if (Captch_Text == "" || Captch_Text == "null" || Captch_Text == null) {
                ErFlag++;
                $("#er_LDap_Captcha").html("<b> Captcha !! </b> Input is required.");
                $("#er_LDap_Captcha").show();
            }
            else if (Captch_Text != ValidateCaptcha) {
                ErFlag++;
                $("#er_LDap_Captcha").html("<b> Captcha !! </b> Invalid Captcha.");
                $("#er_LDap_Captcha").show();
            }

            if (ErFlag == 0) {
                var loginuser = { username: User_Name, password: User_Password };
                loginFactory.getLDaplogon(loginuser).success(function (data) {

                    if (data == "true") {

                        if ($('#chk_LDap_remember').is(':checked')) {
                            createCookie("rubus_LDap_username", $("#txt_LDap_login_UserName").val().trim(), 10);
                            createCookie("rubus_LDap_Password", $("#txt_LDap_login_Password").val().trim(), 10);
                        }
                        else {
                            eraseCookie("rubus_LDap_username");
                            eraseCookie("rubus_LDap_Password");
                        }
                        location.replace('/Home');
                    }
                    else if (data == "false") {
                        AttemptCount++;
                        //$("#er_Login").html("<b> Oh snap!</b> Please Enter Valid Details");
                        //$("#er_Login").show();
                        $("#er_LDap_login_Password").html("<b> Password !! </b> Invalid Password.");
                        $("#er_LDap_login_Password").show();
                        if (AttemptCount > 2) {
                            $("#txt_LDap_Captcha").val("");
                            $("#Captcha_LDap_Login").show();
                        }
                    }
                    else if (data == "error") {
                        $("#er_Login").html("<b> Oh snap!</b> Technical error occurred!!!");
                        $("#er_Login").show();
                    }
                    else {
                        location.replace('/');
                    }
                }).error(function (data) {
                    alert("error : " + data);
                });
            }
            stoploader();
        } catch (e) {
            stoploader();
            alert("Error : Reg_LDapLogin" + e);
        }
    };

    $scope.Forgot_LDapLogin = function () {
        try {
            startloader();
            $(".Error").hide();
            var EmailId = $("#txt_LDap_FP_Email").val().trim();
            if (EmailId == "" || EmailId == "null" || EmailId == null) {
                $("#er_LDap_FP_Email").html("<b> Email !! </b> Input is required.");
                $("#er_LDap_FP_Email").show();
                stoploader();
            }
            else {
                var Data = { EmailId: EmailId };

                loginFactory.LDap_SendPassword(Data).success(function (data) {

                    if (data == "true") {
                        $("#er_LDap_FP_Success").html("Password has been sent to your Email");
                        $("#er_LDap_FP_Success").show();
                    }
                    else if (data == "false") {
                        $("#er_LDap_FP_Email").html("<b> Email !! </b> Email Invalid.");
                        $("#er_LDap_FP_Email").show();
                    }
                    else {
                        $("#er_LDap_FP_Email").html("<b> error !! </b> Technical error occured.");
                        $("#er_LDap_FP_Email").show();
                    }
                    stoploader();
                }).error(function (data) {
                    stoploader();
                    alert("error : " + data);
                });
            }
        }
        catch (e) {
            stoploader();
            alert("Error : Reg_LDapLogin" + e);
        }

    };
});

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var c = 0;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return c;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function startloader() {

    $("#PageLoader").css("display", "block");

}

function stoploader() {

    $("#PageLoader").css("display", "none");

}

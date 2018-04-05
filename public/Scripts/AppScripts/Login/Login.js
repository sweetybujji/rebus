function fn_login() {

    // alert("welcome");
    var User_Name = $("#txt_login_UserName").val().trim();
    var User_Password = $("#txt_login_Password").val().trim();


    //var loginuser = { username: User_Name, password: User_Password, UserLogin: UserLogin };

    var mydata = JSON.stringify({ username: User_Name, password: User_Password });

    $.ajax({
        url: "../Login_Details",
        type: "POST",
        contentType: "application/json",
        data: mydata,
        success: function (response) {
            if (response == true) {
                window.location.href = "/Home";
               
            }
            else {

                fn_errorNotification("200", '', '', "Invalid User Details", "error_alert", "", "");

            }

            // window.location.href = './public/Views/Home/header.html';
        }


    });

}


var Loginapp = angular.module("loginapp", ['ui.router']);
var stopflag = 0;
Loginapp.factory('loginFactory', function ($http) {

    return {
        getlogon: function (loginuser) {

            return $http.post('/Auth_login', loginuser);
        },
        SendPassword: function (Data) {
            return $http.post('/Auth_SendPassword', Data);
        }
    };
});

Loginapp.controller('loginctrl', function ($scope, $location, $window, loginFactory) {

    $("#btn_Login").focus();

    $("#forgot-passwrod").hide();
    $("#signup-box").hide();

    $scope.go = function (path) {
        $location.path(path);
    };


    //$scope.Reg_Login = function () {

    //    try {
    //        var UserLogin;
    //        getUserIP(function (ip) {
    //            id = guid();
    //            var Ip = ip;
    //            var BrowserId = id;

    //            var currentdate = new Date();
    //            var datetime = "Now: " + currentdate.getDate() + "/"
    //                        + (currentdate.getMonth() + 1) + "/"
    //                        + currentdate.getFullYear() + " @ "
    //                        + currentdate.getHours() + ":"
    //                        + currentdate.getMinutes() + ":"
    //                        + currentdate.getSeconds();

    //            var UserName = User_Name;
    //            // Browser with  Detection
    //            navigator.sayswho = (function () {
    //                var N = navigator.appName, ua = navigator.userAgent, tem;
    //                var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    //                if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    //                M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    //                return M;
    //            })();
    //            var browser_version = navigator.sayswho;

    //            UserLogin = {
    //                Ip: Ip,
    //                BrowserId: BrowserId,
    //                datetime: datetime,
    //                // UserName: UserName,
    //                UserName: $("#txt_login_UserName").val().trim(),
    //                browser_version: browser_version

    //            };

    //            // $("#PageLoader").css('display', 'block');
    //            var ErFlag = 0;
    //            var User_Name = $("#txt_login_UserName").val().trim();
    //            var User_Password = $("#txt_login_Password").val().trim();
    //            $(".Error").hide();

    //            var Captch_Text = $("#txt_Captcha").val();
    //            var ValidateCaptcha = $("#ex_Captcha").val();

    //            if (User_Name == "" || User_Name == "null" || User_Name == null) {
    //                ErFlag++;
    //                $("#er_login_UserName").show();
    //                $("#er_login_UserName").html("<b> Username !! </b> Input is required.");
    //            }

    //            if (User_Password == "" || User_Password == "null" || User_Password == null) {
    //                ErFlag++;
    //                $("#er_login_Password").html("<b> Password !! </b> Input is required.");
    //                $("#er_login_Password").show();
    //            }

    //            if (Captch_Text == "" || Captch_Text == "null" || Captch_Text == null) {
    //                ErFlag++;
    //                $("#er_Captcha").html("<b> Captcha !! </b> Input is required.");
    //                $("#er_Captcha").show();
    //            }
    //            else if (Captch_Text != ValidateCaptcha) {
    //                ErFlag++;
    //                $("#er_Captcha").html("<b> Captcha !! </b> Invalid Captcha.");
    //                $("#er_Captcha").show();
    //            }
    //            if (ErFlag == 0) {

    //                var loginuser = { username: User_Name, password: User_Password, UserLogin: UserLogin };

    //                loginFactory.getlogon(loginuser).success(function (data) {

    //                    stopflag++;
    //                    if (stopflag == 1) { //alert();

    //                        if (data == "Invalid") {
    //                            stopflag = 0;
    //                            $("#er_LoginForm").html("<b> Username or Password !!</b> are incorrect");
    //                            $("#er_LoginForm").show();
    //                            AttemptCount++;
    //                            if (AttemptCount > 2) {
    //                                $("#txt_Captcha").val("");
    //                                $("#Captcha_Login").show();
    //                            }
    //                            $("#PageLoader").css('display', 'none');
    //                        }
    //                        else if (data.error) {
    //                            fn_errorNotification("200", "", "", "Technical Error Occured " + data.error, "error_alert", "", "");
    //                            $("#PageLoader").css('display', 'none');
    //                        }
    //                        else {
    //                            $("#PageLoader").css('display', 'block');

    //                            if ($('#chk_remember').is(':checked')) {
    //                                createCookie("rubus_username", $("#txt_login_UserName").val().trim(), 10);
    //                                createCookie("rubus_Password", $("#txt_login_Password").val().trim(), 10);
    //                            }
    //                            else {
    //                                eraseCookie("rubus_username");
    //                                eraseCookie("rubus_Password");
    //                            }
    //                            if (data > 1) {

    //                                //location.replace('/Home');
    //                                SetUserSessionTimeandredirecttopage();
    //                            }
    //                            else {

    //                                bootbox.prompt("Enter Your TOTP", function (result) {

    //                                    if (result === null) {
    //                                        stopflag = 0;
    //                                        Del_LoginUserDetails(UserLogin);
    //                                        //  return false;
    //                                    } else {

    //                                        if (result.length > 0) {
    //                                            $.ajax({
    //                                                url: "/google",
    //                                                type: 'post',
    //                                                contentType: 'application/json',
    //                                                data: JSON.stringify({ "key": "" + result + "", "username": User_Name }),
    //                                                success: function (response) {

    //                                                    if (response.delta == 0) {
    //                                                        SetUserSessionTimeandredirecttopage();
    //                                                        //location.replace('/Home');
    //                                                        //location.replace('/ImmediateChangepassword');


    //                                                    }
    //                                                    else if (response.delta < 0) {
    //                                                        stopflag = 0;
    //                                                        Del_LoginUserDetails(UserLogin);
    //                                                        fn_errorNotification("200", "", "", "Key is Expried Please Try Again", "error_alert", "", "");

    //                                                    }
    //                                                    else if (response.delta > 0) {
    //                                                        stopflag = 0;
    //                                                        Del_LoginUserDetails(UserLogin);
    //                                                        fn_errorNotification("200", response.error, response.error, "error occured Because Time Zone Different", "error_alert", "", "");

    //                                                    }
    //                                                    else if (response.delta == undefined) {
    //                                                        stopflag = 0;
    //                                                        Del_LoginUserDetails(UserLogin);
    //                                                        fn_errorNotification("200", "", "", "error occured Wrong Key Entered", "error_alert", "", "");


    //                                                    }

    //                                                }
    //                                            });

    //                                        }
    //                                        else {
    //                                            $("#er_OTP").show();
    //                                            $("#er_OTP").html("<b> TOTP !! </b> Input is required.");
    //                                            return false;
    //                                        }
    //                                    }
    //                                });
    //                                $(".bootbox-form").append('<span class="Error" id="er_OTP" hidden></span>');
    //                            }

    //                            $("#PageLoader").css('display', 'none');

    //                        }

    //                        return;
    //                    }
    //                    $("#PageLoader").css('display', 'none');

    //                }).error(function (data) {
    //                    fn_errorNotification("200", data.error, data.error, "error occured Login function", "error_alert", "", "");
    //                    $("#PageLoader").css('display', 'none');

    //                });

    //            }

    //        });


    //    }

    //    catch (e) {

    //        fn_errorNotification("200", e, e, "error occured Login function", "error_alert", "", "");
    //        $("#PageLoader").css('display', 'none');
    //    }

    //};


    //$scope.SendPassword_Forgot = function () {
    //    try {
    //        $(".Error").hide();
    //        var Email = $("#txt_FP_Email").val().trim();
    //        if (Email == "" || Email == "null" || Email == null) {
    //            $("#er_FP_Email").html("<b>Email !!</b> Input is required");
    //            $("#er_FP_Email").show();
    //        }
    //        else {
    //            var Data = { Email: Email };
    //            $("#PageLoader").css('display', 'block');
    //            loginFactory.SendPassword(Data).success(function (data) {

    //                if (data == "true") {
    //                    $("#er_FP_Success").html("Password has been sent Your Email");
    //                    $("#er_FP_Success").show();
    //                }
    //                else if (data == "false") {
    //                    $("#er_FP_Email").html("<b>Email !!</b> Invalid Email");
    //                    $("#er_FP_Email").show();
    //                }
    //                else {
    //                    fn_errorNotification("200", data, data, "error occured at SendPassword_Forgot", "error_alert", "", "");
    //                }
    //                $("#PageLoader").css('display', 'none');
    //            }).error(function (data) {
    //                fn_errorNotification("200", Data, Data, "error occured at SendPassword_Forgot", "error_alert", "", "");
    //                $("#PageLoader").css('display', 'none');
    //            });
    //        }
    //    } catch (e) {
    //        fn_errorNotification("200", e, e, "error occured at SendPassword_Forgot", "error_alert", "", "");
    //        $("#PageLoader").css('display', 'none');
    //    }

    //};
});


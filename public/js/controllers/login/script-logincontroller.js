loginapp.controller('loginctrl', function ($scope, $location, $window, loginfactory) {


var attemptcount = 0;

/**
@summary:  To used the change of state.
**/

$scope.go = function (path) {
        $location.path(path);
};

/**
@summary:To use save the user IPaddress, username,timestamp,bowsername
         Admin_T_UserLoginDetails table.
@function code:fn_reg_login_001
**/

$scope.fn_reg_login = function () {
   try {
            var UserLogin;
             getUserIP(function (ip) {
                id = guid();
                var Ip = ip;
                var BrowserId = id;

                var currentdate = new Date();
                var datetime = "Now: " + currentdate.getDate() + "/"
                            + (currentdate.getMonth() + 1) + "/"
                            + currentdate.getFullYear() + " @ "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds();

                var UserName = User_Name;
                // Browser with  Detection
                navigator.sayswho = (function () {
                    var N = navigator.appName, ua = navigator.userAgent, tem;
                    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
                    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
                    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
                    return M;
                })();
                var browser_version = navigator.sayswho;

                UserLogin = {
                    Ip: Ip,
                    BrowserId: BrowserId,
                    datetime: datetime,
                    UserName: $("#txt_login_UserName").val().trim(),
                    browser_version: browser_version

                };


                var ErFlag = 0;
                var User_Name = $("#txt_login_UserName").val().trim();
                var User_Password = $("#txt_login_Password").val().trim();
                $(".Error").hide();

                var Captch_Text = $("#txt_Captcha").val();
                var ValidateCaptcha = $("#ex_Captcha").val();

                if (User_Name == "" || User_Name == "null" || User_Name == null) {
                    ErFlag++;
                    $("#er_login_UserName").show();
                    $("#er_login_UserName").html("<b> Username !! </b> Input is required.");
                }

                if (User_Password == "" || User_Password == "null" || User_Password == null) {
                    ErFlag++;
                    $("#er_login_Password").html("<b> Password !! </b> Input is required.");
                    $("#er_login_Password").show();
                }

                if (Captch_Text == "" || Captch_Text == "null" || Captch_Text == null) {
                    ErFlag++;
                    $("#er_Captcha").html("<b> Captcha !! </b> Input is required.");
                    $("#er_Captcha").show();
                }
                else if (Captch_Text != ValidateCaptcha) {
                    ErFlag++;
                    $("#er_Captcha").html("<b> Captcha !! </b> Invalid Captcha.");
                    $("#er_Captcha").show();
                }
                if (ErFlag == 0) {

                    var loginuser = { username: User_Name, password: User_Password, UserLogin: UserLogin };

                    loginfactory.getlogon(loginuser).success(function (data) {

                        stopflag++;
                        if (stopflag == 1) {

                            if (data == "Invalid") {
                                stopflag = 0;
                                $("#er_LoginForm").html("<b> Username or Password !!</b> are incorrect");
                                $("#er_LoginForm").show();
                                attemptcount++;
                                if (attemptcount > 2) {
                                    $("#txt_Captcha").val("");
                                    $("#Captcha_Login").show();
                                }
                                $("#PageLoader").css('display', 'none');
                            }
                            else if (data.error) {
                                fn_errorNotification("200", "", "", "Technical Error Occured at fn_reg_login_001 " + data.error, "error_alert", "", "");
                                $("#PageLoader").css('display', 'none');
                            }
                            else {
                                $("#PageLoader").css('display', 'block');

                                if ($('#chk_remember').is(':checked')) {
                                    fn_createcookie("rubus_username", $("#txt_login_UserName").val().trim(), 10);
                                    fn_createcookie("rubus_Password", $("#txt_login_Password").val().trim(), 10);
                                }
                                else {
                                    fn_erasecookie("rubus_username");
                                    fn_erasecookie("rubus_Password");
                                }
                                if (data > 1) {
                                    fn_setusersessiontimeandredirecttopage();
                                }
                                else {
                                     bootbox.prompt("Enter Your TOTP", function (result) {
                                       if (result === null) {
                                            stopflag = 0;
                                            fn_del_loginuserdetails(UserLogin);

                                        } else {

                                            if (result.length > 0) {
                                               var data=JSON.stringify({ "key": "" + result + "", "username": User_Name })
                                               loginfactory.google().then(function(response){
                                                 if (response.delta == 0) {
                                                             fn_setusersessiontimeandredirecttopage();

                                                     }
                                                         else if (response.delta < 0) {
                                                             stopflag = 0;
                                                             fn_del_loginuserdetails(UserLogin);
                                                             fn_errorNotification("200", "", "", "Key is Expried Please Try Again fn_reg_login_001", "error_alert", "", "");

                                                         }
                                                         else if (response.delta > 0) {
                                                             stopflag = 0;
                                                             fn_del_loginuserdetails(UserLogin);
                                                             fn_errorNotification("200", response.error, response.error, "error occured Because Time Zone Different fn_reg_login_001", "error_alert", "", "");

                                                         }
                                                         else if (response.delta == undefined) {
                                                             stopflag = 0;
                                                             fn_del_loginuserdetails(UserLogin);
                                                             fn_errorNotification("200", "", "", "error occured Wrong Key Entered fn_reg_login_001", "error_alert", "", "");
                                                       }


                                               })



                                            }
                                            else {
                                                $("#er_OTP").show();
                                                $("#er_OTP").html("<b> TOTP !! </b> Input is required.");
                                                return false;
                                            }
                                        }
                                    });
                                    $(".bootbox-form").append('<span class="Error" id="er_OTP" hidden></span>');
                                }

                                $("#PageLoader").css('display', 'none');

                            }

                            return;
                        }
                        $("#PageLoader").css('display', 'none');

                    }).error(function (data) {
                        fn_errorNotification("200", data.error, data.error, "error occured at fn_reg_login_001", "error_alert", "", "");
                        $("#PageLoader").css('display', 'none');

                    });

                }

            });


        }

        catch (e) {

            fn_errorNotification("200", e, e, "error occured at fn_reg_login_001", "error_alert", "", "");
            $("#PageLoader").css('display', 'none');
        }

    };

 /**
    @summary: To use send the password to the user entered email
              when forgot password.
    @function code:fn_sendpassword_forgot_002
 **/

$scope.fn_sendpassword_forgot = function () {
        try {
            $(".Error").hide();
            var Email = $("#txt_FP_Email").val().trim();
            if (Email == "" || Email == "null" || Email == null) {
                $("#er_FP_Email").html("<b>Email !!</b> Input is required");
                $("#er_FP_Email").show();
            }
            else {
                var data = { Email: Email };
                $("#PageLoader").css('display', 'block');
                loginfactory.sendpassword(data).success(function (data) {
                  if (data == "true") {
                        $("#er_FP_Success").html("Password has been sent Your Email");
                        $("#er_FP_Success").show();
                    }
                    else if (data == "false") {
                        $("#er_FP_Email").html("<b>Email !!</b> Invalid Email");
                        $("#er_FP_Email").show();
                    }
                    else {
                        fn_errorNotification("200", data, data, "error occured at fn_sendpassword_forgot_002", "error_alert", "", "");
                    }
                    $("#PageLoader").css('display', 'none');
                }).error(function (data) {
                    fn_errorNotification("200", Data, Data, "error occured at fn_sendpassword_forgot_002", "error_alert", "", "");
                    $("#PageLoader").css('display', 'none');
                });
            }
        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at fn_sendpassword_forgot_002", "error_alert", "", "");
            $("#PageLoader").css('display', 'none');
        }

    };

    /**
    @summary: To use the login_form hide and forgot _password show.
    @function code:fn_forgot_password
    **/

 function fn_forgot_password() {
    $("#Login_form").hide();
    $("#forgot-passwrod").show();
  }
  /**
  @summary: To use the login_form hide and signup-box show.
  @function code:fn_forgot_password
  **/

 function fn_register() {
    $("#Login_form").hide();
    $("#signup-box").show();
  }
    /**
  @summary: To use the create a cookie and set experied the cookie
  @function code:fn_forgot_password
  **/
function fn_createcookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
      /**
  @summary: To use the read a cookie
  @function code:fn_forgot_password
  **/

function fn_readcookie(name) {
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


    /**
@summary: To use the  delete  a cookie
@function code:fn_forgot_password
**/

function fn_erasecookie(name) {
    fn_createcookie(name, "", -1);
}
/**
   @summary: To use the  delete  user details form Admin_T_UserLoginDetails table.
   @function code:fn_forgot_password_003
**/
function fn_del_loginuserdetails(UserLogin) {

    try {

        loginfactory.deleteloginuserdetails().then(function(response){
        }).catch(function(jqXHR, exception){
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_forgot_password_003 ", "error_alert", "", "");
            $("#PageLoader").css('display', 'block');
        })
    } catch(e){
        fn_errorNotification("200", e, e, "error occured at fn_forgot_password_003", "error_alert", "", "");
        $("#PageLoader").css('display', 'block');
    }
}

 /**
   @summary: To use to  delete the user details form Admin_T_UserLoginDetails.
   @function code:fn_setusersessiontimeandredirecttopage_004
**/
function fn_setusersessiontimeandredirecttopage() {
  try {
         getUserIP(function (ip) {
            id = guid();
            var Ip = ip;
            var BrowserId = id;

            var currentdate = new Date();
            var datetime = "Now: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1) + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds();


            // Browser with  Detection
            navigator.sayswho = (function () {
                var N = navigator.appName, ua = navigator.userAgent, tem;
                var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
                if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
                M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
                return M;
            })();
            var browser_version = navigator.sayswho;

            var UserLogin = JSON.stringify({
                Ip: Ip,
                BrowserId: BrowserId,
                datetime: datetime,
                browser_version: browser_version

            });
 loginfactory.setusersessiontime(UserLogin).then(function(response){
  $("#PageLoader").css('display', 'block');
   if (response.data == "Home") {

       location.replace('/Home');
   }
   else if (response.data == "ChangePassword") {

       location.replace('/ImmediateChangepassword');
   }
   else {
       fn_errorNotification("200", response, response, "error occured at fn_setusersessiontimeandredirecttopage_004", "error_alert", "", "");
   }
   $("#PageLoader").css('display', 'block');

 }).catch(function(jqXHR, exception){
     fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_setusersessiontimeandredirecttopage_004", "error_alert", "", "");
   $("#PageLoader").css('display', 'block');
 })

});

} catch (e) {
    fn_errorNotification("200", e, e, "error occured at fn_setusersessiontimeandredirecttopage_004", "error_alert", "", "");
        $("#PageLoader").css('display', 'none');
    }
}

$(function () {
    if (window.history && window.history.pushState) {
        window.history.pushState({}, '', $(location).attr('href'));
        $(window).on('popstate', function () {
            window.location.href = '/';
        });
    }
});

 /**
      @summary: To use the login the gmail
      @function code:fn_google_login_005
 **/

$scope.fn_google_login=function() {

    try {
        loginfactory.authgoogle.then(function(response){

        }).catch(function(jqXHR, exception){
          fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured atfn_google_login_005", "error_alert", "", "");
           $("#PageLoader").css('display', 'none');

        })


    } catch (e) {
      fn_errorNotification("200", e, e, "error occured at fn_google_login_005", "error_alert", "", "");
      $("#PageLoader").css('display', 'none');

      }
}


 $(document).ready(function () {
   $scope.fn_loadlogincaptcha();
    $scope.fn_checkcookie();
 });

/**
    @summary: To use the Get Captcha Image
    @function code:fn_loadlogincaptcha_006
 **/
$scope.fn_loadlogincaptcha=function() {
    try {
      loginfactory.loadlogincaptcha().then(function(response){
        var data=response.data
        $("#ex_Captcha").val(data.number);
        if ($("#Captcha_Login").is(':hidden')) {
            $("#txt_Captcha").val(data.number);
        }
        else {
            $("#txt_Captcha").val("");
        }
        $('#Img_Captcha').html('<img src="data:image/jpeg;base64,' + data.validcode + '">')


      })

    }
    catch (e) {
      fn_errorNotification("200", e, e, "error occured at fn_loadlogincaptcha_006", "error_alert", "", "");
      $("#PageLoader").css('display', 'none');
     }
}

    /**
    @summary: To use the checkCookie Of userName and Password
    @function code:fn_checkcookie_007
 **/

$scope.fn_checkcookie=function() {

    try {
        var UserName = fn_readcookie("rubus_username");
        var Password = fn_readcookie("rubus_Password");
        if (UserName != "" && UserName != "null" && UserName != null &&
            Password != "" && Password != "null" && Password != null && UserName != 'ace_settings=%7B%22sidebar-collapsed%22%3A-1%7D' &&
            UserName != undefined && Password != undefined && UserName.indexOf("_gat") < 0 && Password.indexOf("_gat") < 0 && UserName != "__session:0.8810590325154017:=https:" && UserName != '__session:0.1351871365190781:menuids=[{"mainmenuid":"ReportsList","submenuid":"TicketsReport"}]') {
            $("#txt_login_UserName").val(UserName);
            $("#txt_login_Password").val(Password);
            $('#chk_remember').prop("checked", "checked");

        }
        else {

            $("#txt_login_UserName").val("");
            $("#txt_login_Password").val("");
        }
    }
    catch (e){
        fn_errorNotification("200", e, e, "error occured at fn_checkcookie_007", "error_alert", "", "");
    }

}
 /**
   @summary: To use the hide Captcha_Login and hide  Forgot_form and  login_form.
   @function code:fn_openlogin
**/

$scope.fn_openlogin=function(){
  $scope.fn_checkcookie();
    $(".Error").hide();
    $("#Captcha_Login").hide();
  $scope.fn_loadlogincaptcha();
    attemptcount = 0;
    $("#Forgot_form").hide();
    $("#Login_form").show();
}

/**
   @summary: To use the error hide and login hide  Forgot_form and  show  forgot_form.
   @function code:fn_openforgotpassword
**/

$scope.fn_openforgotpassword=function() {

    $(".Error").hide();
    $("#txt_FP_Email").val("");
    $("#Login_form").hide();
    $("#Forgot_form").show();
}
/**
   @summary: disable the right click
   @function code:disableRightClick
**/

disableRightClick();
});

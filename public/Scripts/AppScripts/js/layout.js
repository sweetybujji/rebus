/**
 * @author  Created 12/10/2017
 *
 */


var clearsetInterval;



function fn_skincolor() {


    try {
        StartPageLoader();
        $.ajax({
            url: "../getskincolor",
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                StopPageLoader();
                // alert(JSON.stringify(response));
                var Skincolor = JSON.parse(response);
                $.each(Skincolor, function (key, value) {
                    //alert(value);
                    if (value == "skin-2") {
                        $(".menu").removeClass("no-skin");
                        $(".menu").removeClass("skin-1");
                        $(".menu").removeClass("skin-3");
                        $(".menu").addClass(value);
                    }

                    else if (value == "skin-1") {

                        // alert("welcome");
                        $(".menu").removeClass("no-skin");
                        $(".menu").removeClass("skin-2");
                        $(".menu").removeClass("skin-3");
                        $(".menu").addClass(value);
                    }
                    else if (value == "skin-3") {
                        $(".menu").removeClass("no-skin");
                        $(".menu").removeClass("skin-2");
                        $(".menu").removeClass("skin-1");
                        $(".menu").addClass(value);
                    }
                    else {
                        $(".menu").removeClass("skin-3");
                        $(".menu").removeClass("skin-2");
                        $(".menu").removeClass("skin-1");
                        $(".menu").addClass(value);

                    }


                });

                //for (var key in Skincolor) {
                //    alert(JSON.stringify(key));

                //}
            }
        });
    } catch (e) {
        fn_errorNotification("200", e, e, "Error Occured in fn_skincolor", "error_alert", "", "");
    }
}


function Submneuhover() {
    try {
        StartPageLoader();
        $.ajax({
            url: "../Get_Submenu",
            type: "GET",
            contentType: "application/json",
            // data: mydata,
            success: function (response) {
                StopPageLoader();
                //  alert(JSON.stringify(response));
                var submenu_prop = JSON.parse(response);
                $.each(submenu_prop, function (key, value) {
                   // alert(value);
                    if (value == "hover") {
                        //  $(".ParentTag").removeClass("no-skin");
                        //  $(".menu").removeClass("skin-1");
                        //  $(".menu").removeClass("skin-3");
                        $(".ParentTag").addClass(value);
                    }
                    else {
                        $(".ParentTag").removeClass(value);
                    }




                });


            }
        });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification("200", e, e, "Error Occured in Getting Data with code Submneuhover", "error_alert", "", "");
    }
}

/**
* @summary Get data form Side and top Menu Creation
* @summary first ajaxCall GetSidemenu with Latest data
* @summary first ajaxCall GetTopmenu with Latest data
* functioncode:Rubus_Side_Top_Menu_Creation_0001
*/
function Side_Top_Menu_Creation() {
    StartPageLoader();
    $.ajax({
        url: '../GetMenu_Creation',
        contentType: 'application/json',
        type: 'GET',

        success: function (data) {

            if (data == false) {

                fn_errorNotification("200", data.error, data.error, "Error Occured in Getting Data with code Side_Top_Menu_Creation", "error_alert", "", "");
                StopPageLoader();

            }
            else {

                $("#div_sidemenu").empty();
                $("#div_sidemenu").append(data.data);
                // $(".fa-caret-right").remove();
                MenuOpertaion();
                //var responce = data.Menudata;
                ////setTimeout(function () { }, 3000);
                //if (responce.length > 0) {
                //    for (var i = 0; i < responce.length; i++) {
                //        $("#TopMenu_" + responce[i].FormIdText).css("display", "block");
                //        $("#TopMenu_" + responce[i].ModuleIdText).css("display", "block");
                //        $("#" + responce[i].FormIdText).css("display", "block");
                //        $("#" + responce[i].ModuleIdText).css("display", "block");
                //    }

                //}



                //$('.ParentTag').each(function () {
                //    var Flag = 0;
                //    $(this).find('li').each(function () {
                //        if ($(this).css('display') == "block") {
                //            Flag = 1;
                //        }
                //    });
                //    if (Flag == 0) {
                //        $(this).css("display", "none");
                //    }
                //    StopPageLoader();
                //});


                //$('.accessclass').click(function () {
                //    localStorage.setItem("FormId", $(this).attr("id"));
                //});
                StopPageLoader();
            }
        }
    });

    $.ajax({
        url: '../TopMenu_Creation',
        contentType: 'application/json',
        type: 'GET',
        success: function (data) {
            $("#sidebar2").empty();
            if (data == false) {

                fn_errorNotification("200", data.error, data.error, "Error Occured in Getting Data with code Side_Top_Menu_Creation", "error_alert", "", "");
                // alert("No file found");
                //StopPageLoader();
            }
            else {

                $("#sidebar2").append(data);
                $("#Topmenu_parent").hide();
                // StopPageLoader();
            }
        }
    });

}

/**
* @summary Sidetoggle for Side and topview controller
* @summary Checked and not checked conditions
* functioncode:Rubus_fn_Menubar_Toggle_002
*/
function fn_Menubar_Toggle() {
    $('#Chk_sidemenu').click(function () {
        if ($(this).is(':checked')) {
            //alert("sidemenu");
            $("#sidebar").show();;
            $("#sidebar").addClass("sidebar responsive ace-save-state");
        }
        else {
            $("#sidebar").hide();
            $("#sidebar").removeClass("sidebar responsive ace-save-state");
        }
    });

    $('#Chk_TopMenu').click(function () {
        if ($(this).is(':checked')) {
            // alert(sidemenu);
            $("#Topmenu_parent").show();;
            // $("#sidebar").addClass("sidebar responsive ace-save-state");
        }
        else {
            $("#Topmenu_parent").hide();
            // $("#sidebar").removeClass("sidebar responsive ace-save-state");
        }
    });


    //$('#ace-settings-hover').click(function () {
    //    if ($(this).is(':checked')) {
    //        alert("sidemenu");


    //    }
    //    else {
    //        $("#sidebar").hide();
    //        $("#sidebar").removeClass("sidebar responsive ace-save-state");
    //    }
    //});
    $("#ace-settings-hover").click(function () {
        if ($(this).is(':checked')) {
            // alert("sidemenu");
            $(".ParentTag").addClass("hover");
            var sidemenuHover = "hover";
            var mydata = JSON.stringify({ sidemenuHover: sidemenuHover });


            $.ajax({
                url: "../Sidebar_Changes_Submenu",
                type: "POST",
                contentType: "application/json",
                data: mydata,
                success: function (response) {

                    ////  alert(JSON.stringify(response));
                    //var submenu_prop = JSON.parse(response);
                    //$.each(submenu_prop, function (key, value) {
                    //    alert(value);
                    //    if (value == "hover") {
                    //        //  $(".ParentTag").removeClass("no-skin");
                    //        //  $(".menu").removeClass("skin-1");
                    //        //  $(".menu").removeClass("skin-3");
                    //        $(".ParentTag").addClass(value);
                    //    }
                    //    else {
                    //        $(".ParentTag").removeClass(value);
                    //    }




                    //});


                }
            });
        }
        else {
            $(".ParentTag").removeClass("hover");
            //  $("#sidebar").removeClass("sidebar responsive ace-save-state");
        }





    });


    $(".colorpick-btn").click(function () {

        var datacolor = $(this).attr("data-color");

        // alert(datacolor);
        var skincolor = '';

        if (datacolor == "#438EB9") {
            skincolor = 'no-skin';

        }
        else if (datacolor == "#222A2D") {
            skincolor = "skin-1";

        }
        else if (datacolor == "#C6487E") {
            skincolor = "skin-2";

        }
        else if (datacolor == "#D0D0D0") {

            skincolor = "skin-3 no-skin";
        }



        var mydata = JSON.stringify({ skincolor: skincolor });

        //alert(mydata);
        $.ajax({
            url: "../Sidebar_Changes",
            type: "POST",
            contentType: "application/json",
            data: mydata,
            success: function (response) {

                //  alert(JSON.stringify(response));


            }


        });
    });


}

/**
* @summary Get UserName
* @summary  ajaxCall Get UserName
* functioncode:Rubus_Side_Top_Menu_Creation_0003
*/
function fn_UserName() {
    try {
        StartPageLoader();
        $.ajax({
            url: '../Login_user_Names',
            contentType: 'application/json',
            type: 'GET',
            success: function (data) {
                if (data == false) {
                    fn_errorNotification("200", data.error, data.error, "Error Occured in Getting Data with code fn_UserName", "error_alert", "", "");
                    // StopPageLoader();
                }
                $("#lbl_user").text(data.displayname);
                //if (data.response[0] == undefined || data.response[0] == "undefined") {
                //    $("#lbl_user").text(data.displayname);
                //    StopPageLoader();
                //}
                //else {
                //    $("#lbl_user").text(data.response[0].Firstname);
                //    StopPageLoader();
                //}
                if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "Error Occured in Getting Data with code fn_UserName", "error_alert", "", "");
                    // StopPageLoader();
                }
                StopPageLoader();

            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_UserName", "error_alert", "", "");
                StopPageLoader();
            }

        });
    }
    catch (e) {
        fn_errorNotification("200", e, e, "Error Occured in Getting Data with code fn_UserName", "error_alert", "", "");
        StopPageLoader();
    }
}

function fn_changePassword() {
    try {
        bootbox.dialog({
            message: '<div class=""><label>Do You Want Change Password ?</label></div><hr><form> <div class="form-group"><label for="chagepassword">Enter Password<span style="color:red;">*</span></label><input class="form-control" id="chagepassword" type="password"></div><div class="form-group"><label for="ConfirmPassword">Confirm Password<span style="color:red;">*</span ></label><input class="form-control" id="ConfirmPassword" type="password"></div></form>',
            buttons:
            {
                "success":
                 {
                     "label": "<i class='ace-icon fa fa-check'></i> Change!",
                     "className": "btn-sm btn-success",
                     "callback": function () {
                         var chagepassword = $("#chagepassword").val();
                         var ConfirmPassword = $("#ConfirmPassword").val();
                         var ValidationFlag = 0;

                         if (chagepassword == "") {
                             ValidationFlag++;
                         }
                         if (ConfirmPassword == "") {
                             ValidationFlag++;
                         }
                         if (ValidationFlag > 0) {
                             alert("Please Fill All Mandatary Fields");
                             return false;
                         }
                         if (ValidationFlag == 0) {
                             if (chagepassword != ConfirmPassword) {
                                 alert("Both are Not Matched");
                                 return false;
                             }
                             else {
                                 var JSon_Chagepassword = JSON.stringify({ ConfirmPassword: ConfirmPassword });
                                 // StopPageLoader();
                                 $.ajax({
                                     url: "../ChangePassword",
                                     type: "POST",
                                     contentType: "application/json",
                                     async: false,
                                     data: JSon_Chagepassword,
                                     success: function (Res) {
                                         if (Res == true || Res == "true") {
                                             alert("Password has been changed Successfully!!");
                                             fn_Logout();
                                         }
                                         else {
                                             alert("Error Occurred.Try Again");
                                         }
                                     },
                                     error: function (jqXHR, exception) {
                                         fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_UserName", "error_alert", "", "");
                                         StopPageLoader();
                                     }
                                 });
                             }
                         }
                     }
                 }
            }
        });
    }
    catch (e) {
        alert("Error:" + "\t" + "fn_changePassword" + "\t" + e);
    }
}

function fn_Logout() {
    try {
        StartPageLoader();
        $.ajax({
            url: "../logout",
            type: 'GET',
            async: false,
            success: function (data) {
                if (data.error) {
                    StopPageLoader();
                    fn_errorNotification("200", data.error, data.error, "Error Occured in Getting Data with code fn_UserName", "error_alert", "", "");
                }
                if (data == true) {
                    StopPageLoader();
                    // UpdateUserLogOut();

                    window.location.href = "/";
                }
            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_Logout", "error_alert", "", "");
            }
        });
    }
    catch (e) {
        alert("Error:fn_Logout" + e);
    }
}

//loginname();
function loginname() {
    try {
        $.ajax({
            url: "../Login_users",
            type: 'GET',
            success: function (data) {
                $("#lbl_user").empty();
                $("#lbl_user").append(data);
            }
        });
    }
    catch (e) {
        alert("Error:loginname" + e);
    }
}

function UpdateUserLogOut() {
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

            $.ajax({
                url: "/UpdateUserLogOut",
                type: 'POST',
                contentType: 'application/json',
                data: UserLogin,
                success: function (response) {
                    if (response == "Success") {
                        window.location.href = "/#";
                    }
                    else {
                        fn_errorNotification("200", response, response, "error occured at UpdateUserLogOut", "error_alert", "", "");
                    }
                },
                error: function (jqXHR, exception) {
                    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at UpdateUserLogOut", "error_alert", "", "");
                }
            });
        });
    }
    catch (e) {
        fn_errorNotification(e.status, e.message, e.message, "error occured at UpdateUserLogOut", "error_alert", "", "");
    }
}

/***************************************************************Loader*********************************************************/
function StartPageLoader() {
    $("#PageLoader").css('display', 'block');
}

function StopPageLoader() {
    $("#PageLoader").css('display', 'none');
}
/***************************************************************Loader*********************************************************/
function MenuOpertaion() {
    StartPageLoader();
    setTimeout(function () {
        $.ajax({
            url: '../MenuOperation',
            type: "GET",
            contentType: "application/json",
            success: function (responce) {
                // StopPageLoader();
                if (responce.error) {
                    fn_errorNotification("200", responce.error, responce.error, "Error Occured in Getting Data with code MenuOpertaion", "error_alert", "", "");
                    StopPageLoader();
                }
                else {
                    if (responce.length > 0) {
                        for (var i = 0; i < responce.length; i++) {
                            $("#TopMenu_" + responce[i].FormIdText).css("display", "block");
                            $("#TopMenu_" + responce[i].ModuleIdText).css("display", "block");
                            $("#" + responce[i].FormIdText).css("display", "block");
                            $("#" + responce[i].ModuleIdText).css("display", "block");
                        }
                    }

                    $('.ParentTag').each(function () {
                        var Flag = 0;
                        $(this).find('li').each(function () {
                            if ($(this).css('display') == "block") {
                                Flag = 1;
                            }
                        });
                        if (Flag == 0) {
                            $(this).css("display", "none");
                        }
                        StopPageLoader();
                    });
                    // StopPageLoader();
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code MenuOpertaion", "error_alert", "", "");
                StopPageLoader();
            }
        });
    }, 300);
}

//function GetAccessByRole(FormId) {
//    $.ajax({
//        url: '../GetAccessByRole',
//        type: "POST",
//        data: JSON.stringify({ FormId: FormId }),
//        contentType: "application/json",
//        success: function (Result) {
//            if (Result.isauthenticated == false) {
//                fn_errorNotification("", "", "", "<b>Session has Expired</b>.Page will Redirect to Login Screen ", "error_notification", "", "");
//                $(".gritter-title").css("display", "none");
//                $(".gritter-close").remove();
//                setTimeout(function () { window.location.href = "/"; }, 300);
//                //fn_SuccessNotification("<b>Session has Expired</b>.Page will Redirect to Login Screen", "info_alert", "", "");
//                //fn_errorNotification("200", "", "", "<b>Session has Expired</b>.Page will Redirect to Login Screen", "error_alert", "", "");
//                //window.location.href = "/";
//            }
//            else if (Result != "") {
//                if (Result.error) {
//                    fn_errorNotification("200", Result.error, Result.error, "Error Occured in Getting Data with code fn_GetPasswordPolicies_001", "error_alert", "", "");
//                    StopPageLoader();
//                }
//                else {
//                    if (Result[0]["Create"] == false || Result[0]["Create"] == "false") {
//                        $('.Toolbar_Create').addClass("disableicons");
//                        $('.Toolbar_Create').removeAttr("href");
//                        $('.Toolbar_Create').removeAttr('ng-click');
//                    }
//                    if (Result[0]["Update"] == false || Result[0]["Update"] == "false") {
//                        $('.Toolbar_Edit').addClass("disableicons");
//                        $('.Toolbar_Edit').removeAttr("href");
//                        $('.Toolbar_Edit').removeAttr('ng-click');
//                    }
//                    if ((Result[0]["Create"] == false || Result[0]["Create"] == "false") && (Result[0]["Update"] == false || Result[0]["Update"] == "false")) {
//                        $('.Toolbar_Save').addClass("disableicons");
//                        $('.Toolbar_Save').removeAttr("href");
//                        $('.Toolbar_Save').removeAttr('ng-click');
//                    }
//                    if (Result[0]["Delete"] == false || Result[0]["Delete"] == "false") {
//                        $('.Toolbar_Delete').addClass("disableicons");
//                        $('.Toolbar_Delete').removeAttr("href");
//                        $('.Toolbar_Delete').removeAttr('ng-click');
//                    }
//                }
//            }
//        }
//    });
//}


//function fn_CheckSession() {
//    try {
//        StartPageLoader();
//        $.ajax({
//            url: '../CheckSessionEveryForm',
//            type: 'GET',
//            contentType: 'application/json',
//            success: function (response) {
//                // alert(JSON.stringify(response));
//                if (response.isauthenticated == false) {
//                    StopPageLoader();

//                    fn_errorNotification("", "", "", "<b>Session has Expired</b>.Page will Redirect to Login Screen ", "error_notification", "", "");
//                    $(".gritter-title").css("display", "none");
//                    $(".gritter-close").remove();


//                    setTimeout(function () { window.location.href = "/"; }, 300);

//                }
//                else {
//                    StopPageLoader();

//                }

//            },
//            error: function (jqXHR, exception) {
//                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code MenuOpertaion", "error_alert", "", "");
//                StopPageLoader();
//            }



//        });

//    } catch (e) {
//        alert("Error:" + "\t" + "fn_CheckSession" + e);
//    }

//}



function fn_session_expired_client() {
    try {
        // alert("Sess");
        //wait(7000); //7 seconds in milliseconds
        //// setTimeout(function () { window.location.href = "/"; }, 300);
        //fn_errorNotification("", "", "", "<b>Session has Expired</b>.Page will Redirect to Login Screen ", "error_notification", "", "");
        //$(".gritter-title").css("display", "none");
        //$(".gritter-close").remove();
        //setTimeout(function () { window.location.href = "/"; }, 400);
        //location.replace('/');
        //bootbox.prompt("Session List", function (result) {
        //    if (result === null) {

        //    } else {
        //        location.href = "/";

        //    }

        //});
        //$(".bootbox-input-text").remove();
        //$(".btn-default").remove();
        //$(".close").remove();
        //$(".bootbox-body").append("<b>Session has Expired</b>.Page will Redirect to Login Screen");
        //$(".modal-header").css("background-color", "#6fb3e0");

        StartPageLoader();
        var Message = '<b>Session has Expired</b>.Page will Redirect to Login Screen';
        bootbox.confirm(Message, function (result) {
            if (result) {
                window.location.href = "/";
            }
        });
        $('.btn').addClass('btn-sm');
        //  $(".modal-dialog").addClass("modal-sm");
        $(".modal-footer").css({ "padding-bottom": "7px", "padding-top": "4px" });
        $(".bootbox-confirm").css("z-index", "3000");
        $(".btn-default").remove();
        $(".close").remove();


    } catch (e) {
        fn_errorNotification("200", e, e, "Error Occured in Getting Data with code fn_session_expired_client", "error_alert", "", "");
    }
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function fn_OpenDashboard() {

    try {
        StartPageLoader();
        $.ajax({
            url: '../CheckSessionEveryForm',
            type: 'POST',
            async: false,
            data: JSON.stringify({ "FormId": "GeneralDashboards" }),
            contentType: 'application/json',
            success: function (response) {
                // alert(JSON.stringify(response));
                if (response.isauthenticated == false) {
                    StopPageLoader();

                    fn_errorNotification("", "", "", "<b>Session has Expired</b>.Page will Redirect to Login Screen ", "error_notification", "", "");
                    $(".gritter-title").css("display", "none");
                    $(".gritter-close").remove();


                    setTimeout(function () { window.location.href = "/"; }, 300);

                }
                else {
                    StopPageLoader();
                    window.open('/ViewReports');


                }

            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code MenuOpertaion", "error_alert", "", "");
                StopPageLoader();
            }



        });

    } catch (e) {
        alert("Error:" + "\t" + "fn_CheckSession" + e);
    }

    // alert("welcome");
}

//dynamicdata

//$(".colorpick-btn").click(function () {

//    alert("welcome");
//    alert($(this).attr("data-color"));

//});

//alert($('#skin-colorpicker option:selected').text());


//$('#Chk_SubmenuHover').click(function () {
//    if ($(this).is(':checked')) {
//        // alert(sidemenu);
//        alert("true");
//    }
//    else {
//        alert("false");
//    }
//});

////$("#skin-colorpicker option:selected").val();

//$('#ace-settings-hover').change(function () {

//   // alert("welcome");
//    if ($(this).is(":checked")) {
//       // var returnVal = confirm("Are you sure?");
//        // $(this).attr("checked", returnVal);
//        alert();
//    }
//  //  $('#textbox1').val($(this).is(':checked'));
//});






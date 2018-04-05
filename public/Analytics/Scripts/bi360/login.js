var loginapp = angular.module("bi360login", []);
loginapp.factory('loginFactory', function ($http) {
    return {
        getlogon: function (loginuser) {
            return $http.post('../Login/Login', { logindata: loginuser });
        }, RegisterUser: function (Reguser) {
            return $http.post('../Login/RegisterUser', { Regdata: Reguser });
        }
    };
});
loginapp.controller('loginsubmit', function PostsController($scope, loginFactory) {
    $scope.Username = "ADMIN"; $scope.Password = "admin123";
    $scope.Login = function () {
        $("#ajaxloader").show();
        $("#btnLogin").css("disabled", true);
        LoginUser();
    }

    function LoginUser() {
        try {
            var loginuser = { username: $scope.Username, password: $scope.Password };
            if ($scope.Username == "") {
                $("#ajaxloader").hide();
                alert("Please Enter UserName");
                return false;
            }
            else if ($scope.Password == "") {
                $("#ajaxloader").hide();
                alert("Please Enter Password");
                return false;
            }
            else {
                loginFactory.getlogon(loginuser).success(function (data) {
                    if (data.responsedata) {
                        $("#ajaxloader").hide();                       
                        if (data.responsedata == "" || data.responsedata == null) {
                            //location.pathname = "Login/Landingpage";
                            location.replace('/');                            
                        }
                        else {
                            location.replace('/Home');
                        }
                        $("#ajaxloader").hide();
                    }
                    else if (data.response_msg) {
                        $("#ajaxloader").hide();
                        //alert(data.response_msg);
                        setTimeout(function () {
                            var note = $.Notify({
                                caption: "You Have Message:",
                                content: data.response_msg,
                                style: { background: 'red', color: 'white' },
                                timeout: 5000 // 10 seconds
                            });
                            note.close(5000)
                        }, 100);
                    }
                    else if (data.errorresult) {
                        $("#ajaxloader").hide();
                        //alert(data.errorresult);
                        setTimeout(function () {
                            var note = $.Notify({
                                caption: "You Have Message:",
                                content: data.errorresult,
                                style: { background: 'red', color: 'white' },
                                timeout: 5000 // 10 seconds
                            });
                            note.close(5000)
                        }, 100);
                    }
                    else{
                    	location.replace('/Home');                    	
                    }
                    //if (data == "Success") {
                    //    var url = "Homepage";
                    //    location.replace('../../Home/Index');
                    //    // $location.path = '../../Home/Index';
                    //    // location.pathname = "Home/Index";

                    //}
                    //else {
                    //    alert("Invalid Username or password");
                    //    $("#ajaxloader").hide();
                    //    $("#btnLogin").css("disabled", false);
                    //}
                }).error(function (data) {
                    alert(data);
                    $("#ajaxloader").hide();
                });
            }
        }
        catch (e) {
            //alert(e);
        }
    };
    $scope.SignUp = function () {
        try {
            if ($scope.RegPassword != $scope.RegConfirmPassword) {
                alert("password did not match");
                return false;
            } else {
                var Reguser = { firstname: $scope.RegFirstname, secondname: $scope.RegSecondname, username: $scope.RegUsername, password: $scope.RegPassword, confirmpassword: $scope.RegConfirmPassword, securityquestion: $scope.RegSecurQuestion, securityanswer: $scope.RegSecurityAns, role: $scope.RegRole };
                if ($scope.Username == "") {
                    $("#ajaxloader").hide();
                    alert("Please Enter UserName");
                    return false;
                }
                else if ($scope.Password == "") {
                    $("#ajaxloader").hide();
                    alert("Please Enter Password");
                    return false;
                }
                else {
                    loginFactory.RegisterUser(Reguser).success(function (data) {
                        if (data == "DuplicateUserName") {
                            alert("User Name is already Exist");
                            //location.href = '/Home/Index';
                        }
                        else {
                            alert(data + " " + "Regestration Successfully");
                        }
                    }).error(function (data) {
                    });
                }
            }
        }
        catch (e) {
            alert(e);
        }
    }
    $scope.ForgetSecurQuestionfun = function () {
        var SecQuestion = $('#ForgetSecurQuestion').val();
        if (SecQuestion == 0) {
            $('#ForgetAnsId').hide();
        } else {
            $('#ForgetAnsId').show();
        }
    }


    $('body').keydown(function (e) {
        try {
            if (e.keyCode == 13) {
                LoginUser();
            }
        }
        catch (e) {
            alert("Error : " + e);
        }
    });


    //$scope.LoginHide = function () {
    //    alert("");
    //    $('#myModal').hide();
    //}
});



//Dropdown change hide show answer textox
function RegSecurQuestionfun() {
    var SecurQues = $('#RegSecurQuestion').val();
    var Question = new Array();
    Question.push({
        q: "---Select a Security Question---"
    });
    Question.push({
        q: "What was the name of your first pet?"
    });
    Question.push({
        q: "What is your mother's maiden name?"
    });
    Question.push({
        q: "What was the first foreign country you visited?"
    });
    Question.push({
        q: "What is your favorite sports team?"
    });
    Question.push({
        q: "Who is your favorite athlete?"
    });

    if (SecurQues == "0") {
        $('#AnsId').hide();
        $('#ForgetAnsId').hide();

    }
    else {
        $('#AnsId').show();
        $('#ForgetAnsId').show();
        //alert(Question[SecurQues]["b"]);
    }
}





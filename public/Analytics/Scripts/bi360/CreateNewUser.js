RapidApp.factory('NewUsersFactory', function ($http) {
    return {
        getroleslist: function (){
            return $http.get('/Roles/Get_ListOfRoles');
        }
    }
});

RapidApp.controller('NewUser', function ($scope, $location, NewUsersFactory) {
    $scope.go = function (path) {
     //   alert(path);
        $location.path(path);
    };
    NewUsersFactory.getroleslist().success(function (data) {
        if (data) {
            $("#RegRole").empty();
            var options = "";
            tblobj=data;
            options = options + "<option value=''>--Select Role--</option>";
            for (var i = 0; i <tblobj.length; i++) {            	
                options = options + "<option value=" + tblobj[i]["rolename"] + ">" + tblobj[i]["rolename"] + "</option>";
            }
            $(".input-group").find("#RegRole").html(options);

            getEditUserData(tblobj);
        }
        else if (data.errorresult) {
            alert(data.errorresult);
        }
    }).error(function (data) {
        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //........  getting  roles list ended.....//
    $("#Mobile").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            return false;
        }
    });
});


function getEditUserData(tblobj) {

    var todaydate = new Date();
    var mnth = todaydate.getMonth();
    mnth = parseInt(mnth) + 1;
  //  var fromdate = todaydate.getDate() + "-" + mnth + "-" + todaydate.getFullYear();
    var fromdate = todaydate.getFullYear() + "-" + mnth + "-" + todaydate.getDate();
    
    $(".input-group").find("#ValidFrom").val(fromdate);

    $(".input-group").find("#ValidTo").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        onSelect: function (date) {
            var FromDate = $(".input-group").find("#ValidFrom").val();
            var ToDate = $(".input-group").find("#ValidTo").val();
            var todate = date.split('-');
            var fromdate = FromDate.split('-');
            var From_Date = new Date(fromdate[1] + "-" + fromdate[0] + "-" + fromdate[2]);
            var To_Date = new Date(todate[1] + "-" + todate[0] + "-" + todate[2]);
            if (To_Date < From_Date) {
                alert("Valid To Date should not be less than Valid From Date");
                $(".input-group").find("#ValidTo").val("");
            }
            else {
                $(".input-group").find("#ValidTo").val(date);
            }
        }
    });

    try {
        var UserId = $('#hideUserId').text();
        if (UserId == "") {

        }
        else {        	
            $("#RegRole").empty();
            var options = "";
            options = options + "<option value=''>--Select--</option>";
            for (var i = 0; i < tblobj.length; i++) {            	
                options = options + "<option value=" + tblobj[i]["rolename"] + ">" + tblobj[i]["rolename"] + "</option>";
            }
            $(".input-group").find("#RegRole").html(options);
            $("#btn_Save").text('Update');
            $("#btn_Clear").text("Cancel");
            $("#btn_List").text("List");
            $("#User_Id").text("");
            $("#User_Id").text(UserId);
            
            var asd=JSON.stringify({ UserDetails: UserId });
            
            $.ajax({
            	type: "POST",
                url: 'Users/UserDetails',
                data: asd,
                async: false,
             //   datatype: "json",
                contentType: "application/json",
                success: function (response) {
                    if (response != "No" && response != "er" && response != "SE") {
                        fun_AssignTextBoxes(response);
                    }
                    else if (response.errorresult) {
                        alert(response.errorresult);
                    }
                },
                error: function () {
                    alert("User_FC_AJ_0005");
                }
            });
        }
    } catch (e) {
        alert("User_FC_AJ_0004");
    }
}

function fn_SaveUsername() {
    try {
        var Salution = $('#Salution option:selected').text();
        var Gender = $('#Gender option:selected').text();
        var FirstName = $("#FirstName").val();
        var SecondName = $("#SecondName").val();
        var EmpId = $("#Emp_Id").val();
        var Department = $("#Department").val();
        var Username=$("#UserName").val();
        var Email = $("#Email").val();
        var Designation = $("#Designation").val();
        var Rolename = $('#RegRole option:selected').text();
        var RegRoleid = $('#RegRole option:selected').val();
        var Mobile = $("#Mobile").val();
        var password = $("#password").val();
        var CNFpassword = $("#CNFpassword").val();
        var ValidFrom = $("#ValidFrom").val()
        var ValidTo = $("#ValidTo").val();
        var Uid = $("#User_Id").text().trim();
        if (Salution == "---Select Salution---" || Salution == "" || Salution == undefined) {
            alert("Select Salutation Details");
            return false;
        }
        else if (Gender == "---Select Gender---" || Gender == "" || Gender == undefined) {
            alert("Select Gender Details");
            return false;
        }
        else if (FirstName == "" || FirstName == undefined) {
            alert("Enter FirstName Details");
            return false;
        }
        else if (SecondName == "" || SecondName == undefined) {
            alert("Enter SecondName Details");
            return false;
        }
        else if (EmpId == "" || EmpId == undefined) {
            alert("Enter Emp Id Details");
            return false;
        }
        else if (Designation == "" || Designation == undefined) {
            alert("Enter Designation Details");
            return false;
        }
        else if (Email == "" || Email == undefined) {
            alert("Enter Email Details");
            return false;
        }
        else if (IsEmail(Email) == false) {
            alert("Enter Valid Email Details");
            return false;
        }
        else if (Department == "" || Department == undefined) {
            alert("Enter Department Details");
            return false;
        }
        else if (RegRole == "--Select--" || RegRole == undefined) {
            alert("Select Role Details");
            return false;
        }
        else if (Mobile == "" || Mobile == undefined) {
            alert("Enter Mobile Details");
            return false;
        }
        else if (password == "" || password == undefined) {
            alert("Enter Password Details");
            return false;
        }
        else if (password.length < 6) {
            alert("Minimum password length must be 6 characters");
            return false;
        }
        else if (CNFpassword == "" || CNFpassword == undefined) {
            alert("Enter CNFpassword Details");
            return false;
        }
        else if (password != CNFpassword) {
            alert("New Password and confirm password are not same.");
            $('#CNFpassword').val('');
        }
        else if (ValidTo == "" || ValidTo == undefined) {
            alert("Enter ValidTo Details");
            return false;
        }

        else {

            var data = { Uid: Uid,  Username:Username,Salution: Salution, Gender: Gender, FirstName: FirstName, SecondName: SecondName, EmpId: EmpId, Department: Department, Email: Email, Designation: Designation, Rolename: Rolename, Mobile: Mobile, password: password, CNFpassword: CNFpassword, ValidTo: ValidTo, ValidFrom: ValidFrom };
            var project_data = JSON.stringify(data);
            $.ajax({
                type: 'POST',
                url: '../Users/SaveUserDetails',
                data  : project_data,
                async: false,
                datatype: 'json',
                contentType: "application/json",
                success: function (response) {
                    if (response== "saved") {
                        alert("User created successfully");
                        clearfields();     
                    }
                    else if (response == "Update") {
                        alert("User Updated successfully");
                        clearfields();
                    }
                    else if (response== "exists") {
                        alert("User Already Exists");

                    }
                    else {
                        alert(response.responsedata);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("User_FC_AJ_0002");
                }
            });
        }
    }
    catch (e) {

        alert("User_FC_FN_0004");
    }
}



function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}


function clearfields() {
    $('#resetform').each(function () {
        this.reset();
    })
}

function fun_AssignTextBoxes(response) {
    try {
    	//alert("data");
    //    var obj = jQuery.parseJSON(response.responsedata);
        var obj =response;
         //alert(obj);
        var count = obj.length;
       // alert(count);
       // alert(obj[0].rolename);
        if (count > 0) {
            /// Disabling Employee combobox,UserId and Valid From details...     
        	//abc();        	
            $("#UserNamesID").attr("disabled", "true");
            $("#Userid").attr("disabled", "true");
            $("#ValidFrom").attr("disabled", "true");
            $(".input-group").find("#Salution").val(obj[0].salution);
            $(".input-group").find("#Gender").val(obj[0].gender);
            $(".input-group").find("#UserName").val(obj[0].username);
            $(".input-group").find("#FirstName").val(obj[0].firstname);
            $(".input-group").find("#SecondName").val(obj[0].secondname);
            $(".input-group").find("#Emp_Id").val(obj[0].empid);
            $(".input-group").find("#Designation").val(obj[0].designation);
            $(".input-group").find("#Email").val(obj[0].email);
            $(".input-group").find("#Department").val(obj[0].department);
            $(".input-group").find("#RegRoleid").val(obj[0].RoleId);
            $(".input-group").find("#Mobile").val(obj[0].mobile);
            $(".input-group").find("#password").val(obj[0].password);
            $(".input-group").find("#CNFpassword").val(obj[0].cnfpassword);
            $(".input-group").find("#RegRole").val(obj[0].rolename);
           // var options = options + "<option value=" + obj[0].RoleId + ">" + obj[0].rolename + "</option>";
           // $(".input-group").find("#RegRole").html(options);
          
            //var awet = obj[0].ValidFrom.split('T');
            //var awe = obj[0].ValidTo.split('T');
            var validf = obj[0].validfrom.split('-');
            $(".input-group").find('#ValidFrom').val(validf[0] + '-' + validf[1] + '-' + validf[2]);
            var validu = obj[0].validto.split('-');
            $(".input-group").find('#ValidTo').val(validu[0] + '-' + validu[1] + '-' + validu[2]);
        }
        else {
            alert("No records Available");
        }

    } catch (e) {
        alert("New User Form");

    }
}
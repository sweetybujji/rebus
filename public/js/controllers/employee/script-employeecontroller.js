RapidApp.controller('employeectrl', function ($scope, $location, $stateParams, employeefactory) {
/**
@summary: used to the get datepicker
**/
$("#txt_Designation").chosen();
$("#txt_JoiningDate").datepicker();
/**
@summary: regular expression Mobile Number name code
**/
$(document).on('keyup blur', '.txtNumber', function () {
    var node = $(this);
    node.val(node.val().replace(/[^0-9]/g, ''));
});
$(document).on('keyup blur', '#txt_Code', function () {
    var node = $(this);
    node.val(node.val().replace(/[^0-9\+]/g, ''));
});
$(document).on('keyup blur', '#txt_EmployeeName', function () {
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Z\s]/g, ''));
});
/**
@summary:  To  edit the data from Employee_M_Employee
           table and show employee list.
 function code:getemployeedata_001
**/
 var jobj = new Object();
    var id = localStorage.getItem('empId');
    var type = localStorage.getItem('empType');
   if (type == "edit") {
    var dataobj = [];
    jobj.id = id;
    dataobj.push(jobj);
    employeefactory.getemployeedata(dataobj).then(function (response) {

       var employeedata=response.data
                      if (employeedata.isauthenticated == false) {
                          StopPageLoader();
                       }

                     else if (employeedata.error) {
                         fn_errorNotification("200", employeedata.error, employeedata.error, "error occured at getemployeedata_001", "error_alert", "", "");
                      }
                      else {

                          $("#txt_EmpId").val(employeedata[0]["EmpId"]);
                          $("#txt_EmployeeName").val(employeedata[0]["EmpName"]);
                          $("#txt_Department").val(employeedata[0]["Department"]);
                          $("#txt_WorkLocation").val(employeedata[0]["WorkLocation"]);
                          $("#txt_JoiningDate").val(employeedata[0]["JoiningDate"]);


                          $("#txt_ReportingManager").val(employeedata[0]["ReportingManager"]);
                          if (employeedata[0]["MobileNumber"] != "" && employeedata[0]["MobileNumber"] != "null" && employeedata[0]["MobileNumber"] != null) {
                              var Mobile = employeedata[0]["MobileNumber"].split('-');
                              $("#txt_Code").val(Mobile[0]);
                              $("#txt_MobileNumber").val(Mobile[1]);
                          } else {
                              $("#txt_Code").val("");
                              $("#txt_MobileNumber").val("");
                          }
                          $("#txt_Email").val(employeedata[0]["Email"]);
                          $("#idEmployeelabel").val(employeedata[0]["Id"]);

                          setTimeout(function () {
                              $("#txt_Designation").val(employeedata[0]["Designation"]);
                              $("#txt_Designation").trigger("chosen:updated");
                          }, 100);

                      }

            }).catch( function(jqXHR, exception)
            {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getemployeedata_001", "error_alert", "", "");
         })

   }
   /**
   @summary:To  clear the data employee form after saveing

   **/
       $scope.employee_cleartextbox=function() {
        try {
            localStorage.setItem('id', '');
            localStorage.setItem('type', '');
            $(".Error").hide();
            $("input[type=text], textarea").val("");

        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at ClearTextbox", "error_alert", "", "");
        }

    }
    /**
       @summary:To  the employee save operation and update operation
                form Employee_M_Employee.
       @function code:fn_save_employeedetails_002
    **/

       $scope.fn_save_employeedetails = function () {
    try {
      $(".Error").hide();
        var Flag = 0;
        var Id = $("#idEmployeelabel").val().trim();
        var EmployeeId = $("#txt_EmpId").val().trim();
        var EmployeeName = $("#txt_EmployeeName").val().trim();
        var Department = $("#txt_Department").val().trim();
        var WorkLocation = $("#txt_WorkLocation").val().trim();
        var JoiningDate = $("#txt_JoiningDate").val().trim();
        var Designation = $("#txt_Designation").val().trim();
        var ReportingManager = $("#txt_ReportingManager").val().trim();
        var Code = $("#txt_Code").val().trim();
        var MobileNumber = $("#txt_MobileNumber").val().trim();
        var Email = $("#txt_Email").val().trim();

        if (EmployeeId == "" || EmployeeId == "null" || EmployeeId == null) {

            Flag++;
            $("#er_EmpId").html("<b>Emp Id !!</b> Input is required");
            $("#er_EmpId").show();
        }

        if (EmployeeName == "" || EmployeeName == "null" || EmployeeName == null) {

            Flag++;
            $("#er_EmployeeName").html("<b>Employee Name !!</b> Input is required");
            $("#er_EmployeeName").show();
        }

        if (Department == "" || Department == "null" || Department == null) {

            Flag++;
            $("#er_Department").html("<b>Department !!</b> Input is required");
            $("#er_Department").show();
        }

        if (WorkLocation == "" || WorkLocation == "null" || WorkLocation == null) {

            Flag++;
            $("#er_WorkLocation").html("<b>WorkLocation !!</b> Input is required");
            $("#er_WorkLocation").show();
        }

        if (JoiningDate == "" || JoiningDate == "null" || JoiningDate == null) {

            Flag++;
            $("#er_JoiningDate").html("<b>JoiningDate !!</b> Input is required");
            $("#er_JoiningDate").show();
        }

        if (Designation == "" || Designation == "null" || Designation == null) {

            Flag++;
            $("#er_Designation").html("<b>Designation !!</b> Input is required");
            $("#er_Designation").show();
        }

        if (ReportingManager == "" || ReportingManager == "null" || ReportingManager == null) {

            Flag++;
            $("#er_ReportingManager").html("<b>Reporting Manager !!</b> Input is required");
            $("#er_ReportingManager").show();
        }

        if (Flag == 0) {
            StartPageLoader();
            var employeedata = JSON.stringify({
                Id: Id,
                EmpId: EmployeeId,
                EmpName: EmployeeName,
                Department: Department,
                WorkLocation: WorkLocation,
                JoiningDate: JoiningDate,
                Designation: Designation,
                ReportingManager: ReportingManager,
                Code: Code,
                MobileNumber: MobileNumber,
                Email: Email
            });
            if (Id != "" && Id != null && Id != "null" && Id != "undefined") {

   employeefactory.updateemployeedetails(employeedata).then(function (response) {
     var employeedata=response.data

                if (employeedata.isauthenticated == false) {
                            StopPageLoader();
                }
                        else if (employeedata.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at fn_save_employeedetails_002", "error_alert", "", "");
                        }
                        else {
                            if (employeedata == "Employee Id already Exists") {
                                $("#er_EmpId").html("<b>Employee Id !!</b>" + employeedata);
                                $("#er_EmpId").show();
                            }
                            else if (employeedata == "MobileNumber already Exists") {
                                $("#er_MobileNumber").html("<b>MobileNumber !!</b>" + employeedata);
                                $("#er_MobileNumber").show();
                            }
                            else if (employeedata == "Email already Exists") {
                                $("#er_Email").html("<b>Email !!</b>" + employeedata);
                                $("#er_Email").show();
                            } else {
                                fn_SuccessNotification(employeedata, "success_alert", "", "");
                                localStorage.setItem('id', '');
                                localStorage.setItem('type', '');
                                window.location.href = "#EmployeeList";
                            }
                        }
                        StopPageLoader();

              }).catch(function(jqXHR, exception){
                  fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_save_employeedetails_002", "error_alert", "", "");
              })
            } else {

          employeefactory.saveemployeedeta(employeedata).then(function (response) {
             var data=response.data
           if (data.isauthenticated == false) {
                      StopPageLoader();
                      fn_session_expired_client();

                  }
                  else if (data.error) {
                      fn_errorNotification("200", data.error, data.error, "error occured at fn_save_employeedetails_002", "error_alert", "", "");
                  }
                  else {

                      if (data == "Employee Id already Exists") {
                          $("#er_EmpId").html("<b>Employee Id !!</b>" + data);
                          $("#er_EmpId").show();
                      }
                      else if (response == "MobileNumber already Exists") {
                          $("#er_MobileNumber").html("<b>MobileNumber !!</b>" + data);
                          $("#er_MobileNumber").show();
                      }
                      else if (data == "Email already Exists") {
                          $("#er_Email").html("<b>Email !!</b>" + data);
                          $("#er_Email").show();
                      } else {
                          fn_SuccessNotification(data, "success_alert", "", "");
                          $scope.employee_cleartextbox();
                      }
                  }
                  StopPageLoader();


         }).catch(function(jqXHR, exception){
             fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_save_employeedetailss_002", "error_alert", "", "");
                   StopPageLoader();
         })
       }
     }
} catch (e) {
    fn_errorNotification("200", e, e, "error occured at fn_save_employeedetails_002", "error_alert", "", "");
        StopPageLoader();
    }
}
/**
   @summary: Togetting  Department  popup data  form  Employee_M_Employee
              and bind to the  Department.
 @function code:fn_get_department_003
**/
$scope.fn_get_department =function() {
    try {
        StartPageLoader();
        employeefactory.departmentdata().then(function(responce){
          var departmentdata=responce.data
          if (departmentdata.isauthenticated == false) {
                          StopPageLoader();

                          fn_session_expired_client();

                      }
                      else {

                          fn_Lookup_Utility_textbox(departmentdata, "DepartmentData", "Id", "txt_Department");
                          StopPageLoader();
                      }

        }).catch(function(jqXHR, exception){
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_department_003", "error_alert", "", "");
                     StopPageLoader();
        })


    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at fn_get_department_003", "error_alert", "", "");
        StopPageLoader();
    }
}
/**
   @summary: To getting  location  popup data  form  Employee_M_Employee
             and bind to the  location.
  @function code:fn_get_location_004
**/
$scope.fn_get_location=function() {
  try {
     StartPageLoader();
    employeefactory.locationdata().then(function(response){
      var locationdata=response.data
      if (locationdata.isauthenticated == false) {
                         StopPageLoader();

                         fn_session_expired_client();

                     }
                     else {
                         fn_Lookup_Utility_textbox(locationdata, "LocationData", "Id", "txt_WorkLocation");
                         StopPageLoader();
                     }


    }).catch(function(jqXHR, exception){
        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_location_004", "error_alert", "", "");
      StopPageLoader();
    })
    } catch (e) {
        fn_errorNotification("200", e, e, "error occured at fn_get_location_004", "error_alert", "", "");
      }
}
/**
   @summary: To getting  Designation  data  form  Employee_M_Employee
            and bind to the  Designation dropdown.
  @function code:fn_get_desginations_005
**/
$scope.fn_get_desginations =function() {
 try {
   employeefactory.designationdata().then(function(response){
      if (response != "" && response != "null" && response != "[]" && response != [] && response != null) {
                         $("#txt_Designation").empty();

                         $("#txt_Designation").append("<option value=''>--select--</option>");

                         for (var i = 0; i < response.length; i++) {

                             $("#txt_Designation").append("<option value='" + response[i].EmpId + "'>" + response[i].EmpId + "</option>");

                         }

                     }
                     $("#txt_Designation").trigger("chosen:updated");
    }).catch(function(jqXHR, exception){
        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_desginations_005", "error_alert", "", "");
    })
 } catch (e) {
     fn_errorNotification("200", e, e, "error occured at fn_get_desginations_005", "error_alert", "", "");
    }

}

});

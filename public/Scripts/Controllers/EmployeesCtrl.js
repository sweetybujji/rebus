/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('EmployeeCtrl', function ($scope, $location, $stateParams) {
    //var id = $stateParams.id;
    //var type = $stateParams.type;
   
    var jobj = new Object();
    var id = localStorage.getItem('empId');
    var type = localStorage.getItem('empType');
    /*To populate data in main form for edit operation*/
    if (type == "edit") {
        var Dataobj = [];
        jobj.id = id;
        Dataobj.push(jobj);
        //  GetDesginations();
        $.ajax({
            url: "/GetEmployeeData",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.isauthenticated == false) {
                    StopPageLoader();

                  //  fn_session_expired_client()

                }

               else if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at getting data with code GetEmployeeData", "error_alert", "", "");
                }
                else {

                    $("#txt_EmpId").val(response[0]["EmpId"]);
                    $("#txt_EmployeeName").val(response[0]["EmpName"]);
                    $("#txt_Department").val(response[0]["Department"]);
                    $("#txt_WorkLocation").val(response[0]["WorkLocation"]);
                    $("#txt_JoiningDate").val(response[0]["JoiningDate"]);

                    $("#txt_ReportingManager").val(response[0]["ReportingManager"]);
                    if (response[0]["MobileNumber"] != "" && response[0]["MobileNumber"] != "null" && response[0]["MobileNumber"] != null) {
                        var Mobile = response[0]["MobileNumber"].split('-');
                        $("#txt_Code").val(Mobile[0]);
                        $("#txt_MobileNumber").val(Mobile[1]);
                    } else {
                        $("#txt_Code").val("");
                        $("#txt_MobileNumber").val("");
                    }
                    $("#txt_Email").val(response[0]["Email"]);
                    $("#idEmployeelabel").val(response[0]["Id"]);

                    setTimeout(function () {
                        $("#txt_Designation").val(response[0]["Designation"]);
                        $("#txt_Designation").trigger("chosen:updated");
                    }, 100);

                }
            }
            , error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code GetEmployeeData", "error_alert", "", "");
            }
        });
    }

});

RapidApp.controller('EmployeesListCtrl', function ($scope, $location, $state) {

    localStorage.setItem('empId', '');
    localStorage.setItem('empType', '');

    $scope.go = function (path) {

        $location.path(path);
    };
    $scope.Employeeform_update = function () {
        if (EmployeeSel_name == undefined || EmployeeSel_name == "undefined" || EmployeeSel_name == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to Edit " + EmployeeSel_name + " Details?", function (result) {
                if (result) {
                    EmployeeSel_name = "";
                    localStorage.setItem('empId', Employeerowid);
                    localStorage.setItem('empType', 'edit');
                    $state.go('Employee', {
                        id: Employeerowid,
                        type: 'edit',
                        Name: EmployeeSel_name
                    });
                }
            });
        }
    };
});
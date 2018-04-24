RapidApp.controller('employeelistctrl', function ($scope, $location, $state, employeefactory) {
    var employeerowid;
    localStorage.setItem('empId', '');
    localStorage.setItem('empType', '');
    $scope.go = function (path) {
        $location.path(path);
    };
    /**
@summary:update the data employee from
         Employee_M_Employee table.
@function code:fn_employeeform_update_001
**/
    $scope.fn_employeeform_update = function () {
        try {


            if (employeeselname == undefined || employeeselname == "undefined" || employeeselname == "") {
                fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
            }
            else {
                bootbox.confirm("Do You want to Edit " + employeeselname + " Details?", function (result) {
                    if (result) {
                        employeeselname = "";
                        localStorage.setItem('empId', employeerowid);
                        localStorage.setItem('empType', 'edit');
                        $state.go('Employee', {
                            id: employeerowid,
                            type: 'edit',
                            Name: employeeselname
                        });
                    }
                });
            }
        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at fn_employeeform_update_001", "error_alert", "", "");
               StopPageLoader();
           }
    };
    /**
@summary:To get  the data from Employee_M_Employee table
         show  in to employee list.
@function code:fn_get_employeedata_list_002
**/
    $scope.fn_get_employeedata_list = function () {
        try {
            StartPageLoader();
            employeefactory.employeelist().then(function (responce) {
                var employeelistdata = responce.data
                if (employeelistdata.isauthenticated == false) {
                    StopPageLoader();
                }
                else if (employeelistdata.error) {
                    fn_errorNotification("200", employeelistdata.error, employeelistdata.error, "error occured at fn_get_employeedata_list_002", "error_alert", "", "");
                    StopPageLoader();
                }
                else {
                    var data = "";
                    $('#Employeetable').DataTable().destroy();
                    for (var i = 0; i < employeelistdata.length; i++) {
                        var idd = employeelistdata[i]["Id"];
                        data += '<tr id="' + employeelistdata[i].Id + '" fname=\'' + employeelistdata[i].EmpName + '\'>';
                        data += '<td>' + employeelistdata[i].EmpId + '</td>';
                        data += '<td>' + employeelistdata[i].EmpName + '</td>';
                        data += '<td>' + employeelistdata[i].Department + '</td>';
                        data += '<td>' + employeelistdata[i].WorkLocation + '</td>';
                        data += '<td>' + employeelistdata[i].JoiningDate + '</td>';
                        data += '<td>' + employeelistdata[i].Designation + '</td>';
                        data += '<td>' + employeelistdata[i].ReportingManager + '</td>';
                        data += '<td>' + employeelistdata[i].MobileNumber + '</td>';
                        data += '<td>' + employeelistdata[i].Email + '</td>';
                        data += '</tr>';
                    }
                    $("#list_EmployeeBody").empty();
                    $("#list_EmployeeBody").append(data);
                    $("#Employeetable").DataTable({

                    });
                    StopPageLoader();
                }

            }).catch(function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_get_employeedata_list_002", "error_alert", "", "");
                StopPageLoader();
            })
        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at fn_get_employeedata_list_002", "error_alert", "", "");
            StopPageLoader();
        }
    }

    /**
    @summary:  To highlight the table row when click on row
  
    **/
    var employeerowid;
    var employeeselname;
    $('#list_EmployeeBody').on('click', 'tr', function () {
        employeerowid = $(this).attr("id");
        employeeselname = $(this).attr('fname');
        $('#list_EmployeeBody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });


    /**
@summary:To delete Employee data from 
         Employee_M_Employee table
@function code:fn_deleteemployee_003
**/
    $scope.fn_deleteemployee = function () {
        try {
            var dataobj = [];
            var jobj = new Object();
            jobj.id = employeerowid;
            dataobj.push(jobj);
            if (employeeselname == undefined || employeeselname == "undefined" || employeeselname == "") {

                fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
            }
            else {
                bootbox.confirm("Do You want to Delete " + employeeselname + "  Record?", function (result) {
                    if (result) {
                        employeeselname = "";
                        employeefactory.deleteemployee(dataobj).then(function (response) {
                            var deleteemployee = response.data
                            if (deleteemployee.isauthenticated == false) {
                                StopPageLoader();
                                fn_session_expired_client();

                            }
                            if (deleteemployee.error) {
                                fn_errorNotification("200", deleteemployee.error, "error occured at fn_deleteemployee_003", "error_alert", "", "");
                            }
                            else {
                                fn_SuccessNotification(deleteemployee, "success_alert", "", "");
                                $scope.fn_get_employeedata_list();
                                employeerowid = "";
                            }

                        }).catch(function (jqXHR, exception) {
                            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_deleteemployee_003", "error_alert", "", "");

                        })


                    }

                })
            }
        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at fn_deleteemployee_003", "error_alert", "", "");
        }

    }

});

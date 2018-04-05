RapidApp.controller('CreateParameterCtrl', function ($scope, $location, $http) {
    $scope.modal = { status: true, sqlstatus: false, orclstatus: false, querybuildstatus: false }
    $("#querybuilder").hide();

    //Get and bind Connection List to Data Source Dropdown
    $scope.getconnectionslist = function () {
        if ($scope.param_dsname == "QueryBuilder") {
            $("#sptr").hide();
            $("#nonquerybuilder").hide();
            $("#querybuilder").show();
        }
        else {
            $("#nonquerybuilder").show();
            $("#sptr").show();
            $("#querybuilder").hide();
        }
        $scope.Connlist = {};
        StartPageLoader();
        $http.post('/CreateParameter/GetConnList', { Get_Connlist: $scope.param_dsname }).success(function (data) {
            if (data.isauthenticated == false) {
                StopPageLoader();
                fn_session_expired_client();
            }
            else if (data.Result) {
                $scope.Connlist = data.Result;
                setTimeout(function () {
                    $('#param_connection').trigger("chosen:updated");
                }, 100);
                StopPageLoader();
            }
            else if (data.error) {
                StopPageLoader();
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
            else {
                var selectedconndata = JSON.stringify($scope.param_connection);
                if (typeof selectedconndata != "undefined") {
                    var selectedconndatas = JSON.parse(selectedconndata);
                    var Connobj = new Array();
                    Connobj.push({
                        "Id": selectedconndatas.Id,
                        "ConnectionName": selectedconndatas.ConnectionName,
                        "datasource": $scope.param_dsname
                    });
                    var ConnSPobj = JSON.stringify(Connobj);

                    $http.post('/CreateParameter/GetAvailSP', { SelectedConn: ConnSPobj }).success(function (data) {
                        if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else if (data.ParamsList) {
                            $scope.SPlist = JSON.parse(data.ParamsList);
                            if (($("#param_spname").val() != "") && (typeof selectedconndata != "undefined")) {
                                var obj = new Array();
                                obj.push({
                                    "Id": selectedconndatas.Id,
                                    "ConnectionName": selectedconndatas.ConnectionName,
                                    "datasource": $scope.param_dsname,
                                    "spname": $("#param_spname").val()
                                });
                                var SPobj = JSON.stringify(obj);

                                $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
                                    if (data.ParamsList) {
                                        if ($scope.param_dsname == "Sql Connection") {
                                            $scope.modal.sqlstatus = true;
                                            $scope.modal.orclstatus = false;
                                            $scope.modal.querybuildstatus = false;
                                            $scope.paramslistdata = JSON.parse(data.ParamsList).NewDataSet.Table;
                                            $("#nonquerybuilder").show();
                                            $("#sptr").show();
                                            $("#querybuilder").hide();
                                        }
                                        else if ($scope.param_dsname == "Oracle Connection") {
                                            $scope.modal.orclstatus = true;
                                            $scope.modal.sqlstatus = false;
                                            $scope.modal.querybuildstatus = false;
                                            $scope.paramslistdata = JSON.parse(data.ParamsList).NewDataSet.Table;
                                            $("#nonquerybuilder").show();
                                            $("#sptr").show();
                                            $("#querybuilder").hide();
                                        }
                                    }
                                    else if (data.error) {
                                        fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                                    }
                                });
                            }
                        }
                        else if (data.error) {
                            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                        }
                    });
                }
                StopPageLoader();
            }
        });
    };

    //Get and bind Stored Procedure List of Selected Connection
    $scope.getsplist = function (selectedconn) {
        $scope.SPlist = {};
        var selectedconndata = JSON.stringify(selectedconn);
        var selectedconndatas = JSON.parse(selectedconndata);
        var Connobj = new Array();
        Connobj.push({
            "Id": selectedconndatas.Id,
            "ConnectionName": selectedconndatas.ConnectionName,
            "datasource": $scope.param_dsname
        });
        var ConnSPobj = JSON.stringify(Connobj);

        $scope.modal.dsstatus = true;
        StartPageLoader();
        $http.post('/CreateParameter/GetAvailSP', { SelectedConn: ConnSPobj }).success(function (data) {
            if (data.isauthenticated == false) {
                StopPageLoader();
                fn_session_expired_client();
            }
            else if (data.ParamsList) {
                $scope.SPlist = {};
                $scope.SPlist = data.ParamsList;
                setTimeout(function () {
                    $('#param_spname').trigger("chosen:updated");
                }, 100);
                var s = $("#param_spname").val();
                if ((s == "")) {
                }
                else {
                    var obj = new Array();
                    obj.push({
                        "Id": selectedconndatas.Id,
                        "ConnectionName": selectedconndatas.ConnectionName,
                        "datasource": $scope.param_dsname,
                        "spname": $("#param_spname").val()
                    });
                    var SPobj = JSON.stringify(obj);
                    $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
                        if (data.ParamsList) {
                            if ($scope.param_dsname == "Sql Connection") {
                                $scope.modal.sqlstatus = true;
                                $scope.modal.orclstatus = false;
                                $scope.modal.querybuildstatus = false;
                                $scope.paramslistdata = JSON.parse(data.ParamsList).NewDataSet.Table;
                            }
                            else if ($scope.param_dsname == "Oracle Connection") {
                                $scope.modal.orclstatus = true;
                                $scope.modal.sqlstatus = false;
                                $scope.modal.querybuildstatus = false;
                                $scope.paramslistdata = JSON.parse(data.ParamsList).NewDataSet.Table;
                            }
                        }
                        else if (data.error) {
                            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                        }
                    });
                }
                StopPageLoader();
            }
            else if (data.error) {
                StopPageLoader();
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
            else {
                StopPageLoader();
                $scope.paramslistdata = {};
                $scope.modal.sqlstatus = false;
                $scope.modal.orclstatus = false;
                $scope.modal.querybuildstatus = false;
            }
        });
    };

    $scope.getqueryresult = function (selectedquery) {
        $scope.paramslistdata = {};
        $scope.parametersdata = {};
        var selectedconndata = JSON.stringify(selectedquery);
        var selectedconndatas = JSON.parse(selectedconndata);
        var Connobj = new Array();
        Connobj.push({
            "Id": selectedconndatas.Id,
            "ConnectionName": selectedconndatas.ConnectionName,
            "datasource": $scope.param_dsname
        });
        var ConnSPobj = JSON.stringify(Connobj);
        $scope.modal.dsstatus = true;
        $http.post('/CreateParameter/GetAvailQueryParams', { SelectedConn: ConnSPobj }).success(function (data) {
            if (data.paramsplist) {
                $scope.modal.orclstatus = false;
                $scope.modal.sqlstatus = false;
                $scope.modal.querybuildstatus = true;
                $scope.paramslistdata = JSON.parse(data.paramsplist);
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
            else {
                $scope.paramslistdata = {};
                $scope.modal.orclstatus = false;
                $scope.modal.sqlstatus = false;
                $scope.modal.querybuildstatus = false;
            }
        });
    }

    //Get and bind Parameters for Selected Stored Procedure
    $scope.getparameters = function () {
        $scope.paramslistdata = {};
        $scope.parametersdata = {};
        var selectedconndata = JSON.stringify($scope.param_connection);
        var selectedconndatas = JSON.parse(selectedconndata);
        var obj = new Array();
        obj.push({
            "Id": selectedconndatas.Id,
            "ConnectionName": selectedconndatas.ConnectionName,
            "datasource": $scope.param_dsname,
            "spname": $("#param_spname").val()
        });
        var SPobj = JSON.stringify(obj);

        $http.post('/CreateParameter/GetAvailSPParams', { SelectedSP: SPobj }).success(function (data) {
            if (data.ParamsList) {
                if ($scope.param_dsname == "Sql Connection") {
                    $scope.modal.sqlstatus = true;
                    $scope.modal.orclstatus = false;
                    $scope.modal.querybuildstatus = false;
                    $scope.paramslistdata = data.ParamsList;
                }
                else if ($scope.param_dsname == "Oracle Connection") {
                    $scope.modal.orclstatus = true;
                    $scope.modal.sqlstatus = false;
                    $scope.modal.querybuildstatus = false;
                    $scope.paramslistdata = JSON.parse(data.ParamsList).NewDataSet.Table;
                }
            }
            else if (data.error) {
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
            else {
                $scope.paramslistdata = {};
                $scope.modal.orclstatus = false;
                $scope.modal.sqlstatus = false;
                $scope.modal.querybuildstatus = false;
            }
        });
    };

    //Get Parameters data for Selected Stored Procedure
    $scope.executeparameter = function () {
        $scope.parametersdata = {};
        var selectedconndata = JSON.stringify($scope.param_connection);        
        var selectedconndatas = JSON.parse(selectedconndata);
        var paramobj = new Array();
        var param_dsname = $scope.param_dsname;
        var param_connid = selectedconndatas.Id;
        var param_connname = selectedconndatas.ConnectionName;
        var param_spname = $("#param_spname").val();
        var paramsdata = angular.toJson($scope.paramslistdata);
        var UserName = 'ASD';
        paramobj.push({
            "param_dsname": param_dsname,
            "param_connid": param_connid,
            "param_connname": param_connname,
            "param_spname": param_spname,
            "param_data": paramsdata,
            "UserName": UserName
        });
        var paramdataobj = JSON.stringify(paramobj);

        StartPageLoader();
        $http.post('/CreateParameter/GET_paramdata', { Paramdata_obj: paramdataobj }).success(function (data) {
            if (data.isauthenticated == false) {
                StopPageLoader();
                fn_session_expired_client();
            }
            else if (data.Result) {               
                StopPageLoader();
                $scope.modal.status = false;
                $scope.parametersdata = data.Result;
            }
            else if (data.error) {
                StopPageLoader();
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
        });
    };

    //Save Parameters data of Selected Stored Procedure
    $scope.saveparameter = function () {
        $scope.modal.dsstatus = true;
        var selectedconndata = JSON.stringify($scope.param_connection);
        var selectedconndatas = JSON.parse(selectedconndata);
        var paramobj = new Array();
        var param_dsname = $scope.param_dsname;
        var param_connid = selectedconndatas.Id;
        var param_connname = selectedconndatas.ConnectionName;
        var param_spname = $("#param_spname").val();
        var paramsdata = angular.toJson($scope.paramslistdata);
        var UserName = 'ASD';
        paramobj.push({
            "param_dsname": param_dsname,
            "param_connid": param_connid,
            "param_connname": param_connname,
            "param_spname": param_spname,
            "param_data": paramsdata,
            "UserName": UserName
        });
        var save_paramobj = JSON.stringify(paramobj);
        StartPageLoader();
        $http.post('/CreateParameter/Save_paramdefault', { Save_paramobj: save_paramobj }).success(function (data) {
            if (data.isauthenticated == false) {
                StopPageLoader();
                fn_session_expired_client();
            }
            else if (data.Success) {
                fn_SuccessNotification(data.Success, "success_alert", "", "");
                clear();
                StopPageLoader();
            }
            else if (data.error) {
                StopPageLoader();
                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
            }
        });
    };

    function clear() {
        $scope.param_dsname = "Select";
        $scope.Connlist = {};
        $scope.SPlist = {};
        $scope.paramslistdata = {};
        $scope.modal.sqlstatus = false;
        $scope.modal.orclstatus = false;
        $scope.modal.status = true;
        $scope.modal.servicestatus = false;
        $scope.parametersdata = {};
        $scope.modal.querybuildstatus = false;
    }
});

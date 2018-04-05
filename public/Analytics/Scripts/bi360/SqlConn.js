RapidApp.factory('sqlDBFactory', function ($http) {
    return {
        getconnlist: function () {
            return $http.get('/SqlConnection/GetSqlConnList');
        },
        GetDatabaseList: function (Conndatafordb) {
            return $http.post('/SqlConnection/GetDatabaseList', {
                Conndata: Conndatafordb
            });
        },
        saveConn: function (Save_Conn) {
            return $http.post('/SqlConnection/SaveSql_Connection', Save_Conn);
        },
        editsqlCon: function (Edit_Conn) {
            return $http.post('/SqlConnection/EditSql_Connection', {
                Edit_Conn: Edit_Conn
            });
        },
        removeConn: function (selcteditem) {
            return $http.post('/SqlConnection/RemoveSql_Connection', {
                ConnId: selcteditem
            });
        },
        SP_CreateQuery: function (SPobjcreate_query) {
            return $http.post('/SqlConnection/SPobjCreate_Query', {
                SPobjCreate_Query: SPobjcreate_query
            });
        },
        getAvailSP: function (selctConnId) {
            return $http.post('/SqlConnection/GetSqlAvailSP', {
                selectedConnId: selctConnId
            });
        },
        getSPlist: function (selctedConn) {
            return $http.post('/SqlConnection/GetSqlSPList', {
                selectedConnId: selctedConn
            });
        },
        saveSPConn: function (Save_SPConn) {
            return $http.post('/SqlConnection/SaveSql_SPConnection', Save_SPConn);
        },
        removeSPConn: function (Remove_SPdata) {
            return $http.post('/SqlConnection/RemoveSql_SPConnection', {
                Remove_ConnSPdata: Remove_SPdata
            });
        },
        get_SPdtails: function (Get_SPdtails) {
            return $http.post('/SqlConnection/GET_SPdtails', {
                GET_SPdtail: Get_SPdtails
            });
        },
        SP_Edit: function (SPdataedit) {
            return $http.post('/SqlConnection/Get_SPforEdit', {
                GetSPforedit: SPdataedit
            });
        },
        SP_EditQuery: function (SPedit_query) {
            return $http.post('/SqlConnection/SPobjEdit_Query', {
                SPobjEdit_Query: SPedit_query
            });
        },
        //Unused Methods
        save_SPparamdatachk: function (Save_SPdatachk) {
            return $http.post('/SqlConnection/Save_SPparamdatachk', {
                Save_SPdatachk: Save_SPdatachk
            });
        },
        get_SPGriddtails: function (Get_SPGriddtails) {
            return $http.post('/SqlConnection/GET_SPGriddtails', {
                Get_SPGriddtail: Get_SPGriddtails
            });
        },
        get_SPGriddata: function (Get_SPGriddata) {
            return $http.post('/SqlConnection/GET_SPGridData', {
                Get_SPGridData: Get_SPGriddata
            });
        },
        get_SPparamdata: function (Get_SPdata) {
            return $http.post('/SqlConnection/GET_SPparamdata', {
                Get_SPData: Get_SPdata
            });
        },
        getConngrid: function () {
            return $http.get('/SqlConnection/GetAllConnGrid');
        }
    };
});

RapidApp.controller('SqlServerCtrl', function ($scope, $location, sqlDBFactory) {
    $scope.sql_Type = 'Sql';
    $scope.selected = 'tile';
    $scope.selected1 = 'tile1';
    $scope.splist = [];
    $scope.selection = [];
    $scope.parameters = [];
    $scope.parameterschk = [];
    $scope.gridparameters = [];
    $scope.sqlconnections = [];
    $scope.modal = {
        status: true,
        sqlstatus: true,
        orclstatus: true,
        statusparamchk: true,
        statusparamchkdata: true,
        statustdchk: true,
        paramconfigstatus: true
    }
    $("#AddButton").attr('disabled', true);
    $("#CreateSP").attr('disabled', true);

    $scope.hideConnIdforEdit = "save";
    $scope.templatesettings = {
        HeaderTitle: "Sql Server Database"
    };

    //Start: Getting SQL Template Function
    $scope.go = function (path) {
        $location.path(path);
    };
    //End: Getting SQL Template Function

    //Start: Getting Created SQL Connections List
    sqlDBFactory.getconnlist().success(function (data) {
        StartPageLoader();
        if (data.isauthenticated == false) {

        }
        else if (data.error) {
            //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Connections", "error_alert", "", "");
            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
        }
        else {
            $scope.sqlconnections = data;
        }
        StopPageLoader();
    }).error(function (data) {
        //fn_errorNotification("200", data, data, "Error Occured while Getting Connections", "error_alert", "", "");
        fn_errorNotification("200", data, data, "", "error_alert", "", "");
    });
    //End: Getting Created SQL Connections List

    //Start: Open SQL Connection Creation Popup
    $scope.AddConnection = function () {
        var element = angular.element('#myModal');
        element.modal('show');
        clear();
    };
    //End: Open SQL Connection Creation Popup

    //Start: Loading Databases List after Testing Connection
    $scope.dblistfunc = function () {
        var objfordblist = new Array();
        var ConnectionType = $scope.sql_ConnectionType;
        var ConnectionName = $scope.sql_ConnectionName;
        var UserName = 'ASD';
        var ServerName = $scope.sql_ServerName;
        var PortNumber = $scope.sql_PortNumber;
        var User = $scope.sql_UserId;
        var Password = $scope.sql_Password;
        var DBName = $scope.sql_DatabaseName;
        var sql_Type = $scope.sql_Type;
        if (sql_Type == "Sql") {
            if ((ConnectionName != "" || ConnectionName != "null") && (ServerName != "" || ServerName != "null") && (PortNumber != "" || PortNumber != "null") && (User != "" || User != "null") && (Password != "" || Password != "null")) {
                objfordblist.push({
                    "ConType": ConnectionType,
                    "ConName": ConnectionName,
                    "UserName": UserName,
                    "ServerName": ServerName,
                    "PortNumber": PortNumber,
                    "User": User,
                    "Password": Password,
                    "DBName": DBName,
                    "sql_Type": sql_Type
                });
                var Conndata = JSON.stringify(objfordblist);
                StartPageLoader();
                try {
                    sqlDBFactory.GetDatabaseList(Conndata).success(function (data) {
                        if (data.isauthenticated == false) {
                            StopPageLoader();
                            fn_session_expired_client();
                        }
                        else if (data.Result) {
                            $scope.sql_databases = [];
                            for (var i = 0; i < data.Result.length; i++) {
                                $scope.sql_databases.push(data.Result[i].name);
                            }
                            StopPageLoader();
                        }
                        else if (data.error) {
                            StopPageLoader();
                            //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Databases", "error_alert", "", "");
                            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                            $scope.sql_databases = [];
                        }
                    }).error(function (data) {
                        StopPageLoader();
                        //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");
                        fn_errorNotification("200", data, data, "", "error_alert", "", "");
                    });
                }
                catch (e) {
                    StopPageLoader();
                    //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");
                    fn_errorNotification("200", e, e, "", "error_alert", "", "");
                }
            }
        }
        else {
            if ((ConnectionName != "" || ConnectionName != "null") && (ServerName != "" || ServerName != "null") && (sql_Type == "Windows" || sql_Type != "null")) {
                objfordblist.push({
                    "ConType": ConnectionType,
                    "ConName": ConnectionName,
                    "UserName": UserName,
                    "ServerName": ServerName,
                    "PortNumber": PortNumber,
                    "User": User,
                    "Password": Password,
                    "DBName": DBName,
                    "sql_Type": sql_Type
                });
                var Conndata = JSON.stringify(objfordblist);
                StartPageLoader();
                try {
                    sqlDBFactory.GetDatabaseList(Conndata).success(function (data) {
                        if (data.isauthenticated == false) {
                            StopPageLoader();
                            fn_session_expired_client();
                        }
                        else if (data.Result) {
                            $scope.sql_databases = [];
                            for (var i = 0; i < data.Result.length; i++) {
                                $scope.sql_databases.push(data.Result[i].name);
                            }
                            StopPageLoader();
                        }
                        else if (data.errorresult) {
                            StopPageLoader();
                            //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Databases", "error_alert", "", "");
                            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                            $scope.sql_databases = [];
                        }
                    }).error(function (data) {
                        StopPageLoader();
                        //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");
                        fn_errorNotification("200", data, data, "", "error_alert", "", "");
                    });
                }
                catch (e) {
                    StopPageLoader();
                    //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");
                    fn_errorNotification("200", e, e, "", "error_alert", "", "");
                }
            }
        }
    };
    //End: Loading Databases List after Testing Connection

    //Start: Selecting Ratio for SQL Authentication    
    $scope.sqlradioclick = function () {
        var objfordblist = new Array();
        var ConnectionType = $scope.sql_ConnectionType;
        var ConnectionName = $scope.sql_ConnectionName;
        var UserName = 'ASD';
        var ServerName = $scope.sql_ServerName;
        var PortNumber = $scope.sql_PortNumber;
        var User = $scope.sql_UserId;
        var Password = $scope.sql_Password;
        var DBName = $scope.sql_DatabaseName;
        var sql_Type = $scope.sql_Type;
        if ($('input[name= authenticate]:checked').val() == "Sql") {
            if (sql_Type == "Sql") {
                if ((ConnectionName != "") && (ServerName != "") && (PortNumber != "") && (User != "") && (Password != "")) {
                    objfordblist.push({
                        "ConType": ConnectionType,
                        "ConName": ConnectionName,
                        "UserName": UserName,
                        "ServerName": ServerName,
                        "PortNumber": PortNumber,
                        "User": User,
                        "Password": Password,
                        "DBName": DBName,
                        "sql_Type": sql_Type
                    });
                    var Conndata = JSON.stringify(objfordblist);
                    try {
                        StartPageLoader();
                        sqlDBFactory.GetDatabaseList(Conndata).success(function (data) {
                            if (data.isauthenticated == false) {
                                StopPageLoader();
                                fn_session_expired_client();
                            }
                            else if (data.Result) {
                                $scope.sql_databases = [];
                                for (var i = 0; i < data.Result.length; i++) {
                                    $scope.sql_databases.push(data.Result[i].name);
                                }
                                StopPageLoader();
                            }
                            else if (data.error) {
                                StopPageLoader();
                                //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Databases", "error_alert", "", "");
                                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                                $scope.sql_databases = [];
                            }
                        }).error(function (data) {
                            StopPageLoader();
                            //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");
                            fn_errorNotification("200", data, data, "", "error_alert", "", "");
                        });
                    }
                    catch (e) {
                        StopPageLoader();
                        //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");
                        fn_errorNotification("200", e, e, "", "error_alert", "", "");
                    }
                }
            }
        }
        else if ($('input[name= authenticate]:checked').val() == "Windows") {
            if (sql_Type == "Windows") {
                if ((ConnectionName != "") && (ServerName != "") && (sql_Type == "Windows")) {
                    objfordblist.push({
                        "ConType": ConnectionType,
                        "ConName": ConnectionName,
                        "UserName": UserName,
                        "ServerName": ServerName,
                        "PortNumber": PortNumber,
                        "User": User,
                        "Password": Password,
                        "DBName": DBName,
                        "sql_Type": sql_Type
                    });
                    var Conndata = JSON.stringify(objfordblist);

                    try {
                        StartPageLoader();
                        sqlDBFactory.GetDatabaseList(Conndata).success(function (data) {
                            if (data.isauthenticated == false) {
                                StopPageLoader();
                                fn_session_expired_client();
                            }
                            else if (data.Result) {
                                $scope.sql_databases = [];
                                for (var i = 0; i < data.Result.length; i++) {
                                    $scope.sql_databases.push(data.Result[i].name);
                                }
                                StopPageLoader();
                            }
                            else if (data.error) {
                                StopPageLoader();
                                //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Databases", "error_alert", "", "");
                                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                                $scope.sql_databases = [];
                            }
                        }).error(function (data) {
                            StopPageLoader();
                            //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");                            
                            fn_errorNotification("200", data, data, "", "error_alert", "", "");
                        });
                    }
                    catch (e) {
                        StopPageLoader();
                        //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");                        
                        fn_errorNotification("200", e, e, "", "error_alert", "", "");
                    }
                }
            }
        }
    };
    //End: Selecting Ration for SQL Authentication

    //Start: Save Operation for Sql Connection
    $scope.savesqlConn = function () {
        var Connobj = new Array();
        var ConnectionType = $scope.sql_ConnectionType;
        var ConnectionName = $scope.sql_ConnectionName;
        var UserName = 'ASD';
        var ServerName = $scope.sql_ServerName;
        var PortNumber = $scope.sql_PortNumber;
        var User = $scope.sql_UserId;
        var Password = $scope.sql_Password;
        var DBName = $scope.sql_DatabaseName;
        var sql_Type = $scope.sql_Type;
        var operation = $scope.hideConnIdforEdit;
        if ($scope.sql_DatabaseName == "" || $scope.sql_DatabaseName == null) {
            alert("Please Select Database");
            return false;
        }
        Connobj.push({
            "ConnectionType": ConnectionType,
            "ConnectionName": ConnectionName,
            "UserName": UserName,
            "ServerName": ServerName,
            "PortNumber": PortNumber,
            "Userid": User,
            "Password": Password,
            "databasename": DBName,
            "sqlType": sql_Type,
            "operation": operation,
            "Connectas": "basic"
        });
        var Save_Conndata = JSON.stringify(Connobj);
        try {
            StartPageLoader();
            sqlDBFactory.saveConn(Save_Conndata).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.error) {
                    //fn_errorNotification("200", "Technical Error has been occured.", "Technical Error has been occured.", "Error Occured while Saving Connection", "error_alert", "", "");
                    fn_errorNotification("200", "Technical Error has been occured.Please try again later", "Technical Error has been occured.Please try again later", "", "error_alert", "", "");
                }
                else if (data.Exists) {
                    //fn_errorNotification("200", "Connection Name Already Exists. ", "Connection Name Already Exists. ", "Error Occured while Saving Connection", "error_alert", "", "");
                    fn_errorNotification("200", "Connection Name Already Exists. ", "Connection Name Already Exists. ", "", "error_alert", "", "");
                }
                else {
                    $scope.sqlconnections = data;
                    var element = angular.element('#myModal');
                    element.modal('hide');
                    clear();
                    $scope.hideConnIdforEdit = "save";
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Saving Connection", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Saving Connection", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Save Operation for Sql Connection

    //Start: Get and Bind Details of Sql Connection
    $scope.editSqlConn = function (e) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        var editConnId = e;
        try {
            StartPageLoader();
            sqlDBFactory.editsqlCon(editConnId).success(function (data) {
                if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
                else if (data.error) {
                    StopPageLoader();
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Details", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                else {
                    StopPageLoader();
                    var element = angular.element('#myModal');
                    element.modal('show');
                    $scope.hideConnIdforEdit = data.Result[0].id;
                    $scope.sql_ConnectionName = data.Result[0].connectionname;
                    $scope.sql_ConnectionType = data.Result[0].connectiontype;
                    $scope.sql_ServerName = data.Result[0].servername;
                    $scope.sql_PortNumber = data.Result[0].portnumber;
                    $scope.sql_Type = data.Result[0].sqltype;
                    var USERID = data.Result[0].userid;
                    var PASSWORD = data.Result[0].password;
                    if (USERID == "" || USERID == null || USERID == "null") {
                        $scope.sql_UserId = "";
                    }
                    else {
                        $scope.sql_UserId = USERID;
                    }
                    if (PASSWORD == "" || PASSWORD == null || PASSWORD == "null") {
                        $scope.sql_Password = "";
                    }
                    else {
                        $scope.sql_Password = PASSWORD;
                    }
                    var objfordblist = new Array();
                    var ConnectionType = $scope.sql_ConnectionType;
                    var ConnectionName = $scope.sql_ConnectionName;
                    var UserName = 'ASD';
                    var ServerName = $scope.sql_ServerName;
                    var PortNumber = $scope.sql_PortNumber;
                    var User = $scope.sql_UserId;
                    var Password = $scope.sql_Password;
                    var DBName = $scope.sql_DatabaseName;
                    var sql_Type = $scope.sql_Type;
                    objfordblist.push({
                        "ConType": ConnectionType,
                        "ConName": ConnectionName,
                        "UserName": UserName,
                        "ServerName": ServerName,
                        "PortNumber": PortNumber,
                        "User": User,
                        "Password": Password,
                        "DBName": DBName,
                        "sql_Type": sql_Type
                    });
                    var Conndata = JSON.stringify(objfordblist);
                    try {
                        StartPageLoader();
                        sqlDBFactory.GetDatabaseList(Conndata).success(function (data) {
                            if (data.isauthenticated == false) {
                                StopPageLoader();
                                fn_session_expired_client();
                            }
                            else if (data.Result) {
                                $scope.sql_databases = [];
                                for (var i = 0; i < data.Result.length; i++) {
                                    $scope.sql_databases.push(data.Result[i].name);
                                }
                                StopPageLoader();
                            }
                            else if (data.error) {
                                StopPageLoader();
                                //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Databases", "error_alert", "", "");
                                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                            }
                        }).error(function (data) {
                            StopPageLoader();
                            //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");
                            fn_errorNotification("200", data, data, "", "error_alert", "", "");
                        });
                    }
                    catch (e) {
                        StopPageLoader();
                        //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");
                        fn_errorNotification("200", e, e, "", "error_alert", "", "");
                    }
                    $scope.sql_DatabaseName = data.Result[0].databasename;
                }
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Getting Databases", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Getting Databases", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Get and Bind Details of Sql Connection

    //Start: Clear SQL Connection Creation Popup    
    function clear() {
        // $scope.sql_ConnectionType = "";
        $scope.sql_ConnectionName = "";
        $scope.sql_ServerName = "";
        $scope.sql_PortNumber = "";
        $scope.sql_UserId = "";
        $scope.sql_Password = "";
        $scope.sql_DatabaseName = "";
        $scope.sql_Type = "Sql";
        // $scope.hideConnIdforEdit = "";
        $("#sql_DatabaseName").val("");
        $scope.sql_databases = [];
        $("#myModal").on('hidden', function () {
            $('#myModal').removeData('bs.modal');
            $('#myModal').removeClass('modal-open');
        });
    };

    $scope.clearmodal = function () {
        // $scope.sql_ConnectionType = "";
        $scope.sql_ConnectionName = "";
        $scope.sql_ServerName = "";
        $scope.sql_PortNumber = "";
        $scope.sql_UserId = "";
        $scope.sql_Password = "";
        $scope.sql_DatabaseName = "";
        $scope.sql_Type = "";
        $scope.hideConnIdforEdit = "save";
    };
    //End: Clear SQL Connection Creation Popup

    //Start: Close Sql Connection Popup
    $scope.closesqlconn = function () {
        var element = angular.element('#myModal');
        element.modal('hide');
    };
    //End: Close Sql Connection Popup

    //Start: Remove Selected Sql Connection from the List
    $scope.removeItem = function (index, item) {
        bootbox.confirm("Do you really want to Delete this Connection?", function (result) {
            if (result) {
                var selcteditem = item;
                try {
                    sqlDBFactory.removeConn(selcteditem).success(function (data) {
                        if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else if (data.error) {
                            //fn_errorNotification("200", "Instance related Error Occured.", "Instance related Error Occured.", "Error Occured while Deleting Connection", "error_alert", "", "");
                            fn_errorNotification("200", "Instance related Error Occured.", "Instance related Error Occured.", "", "error_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification("Deleted Successfully", "success_alert", "", "");
                            $scope.sqlconnections.splice(index, 1);
                            $scope.selection = null;
                        }
                        StopPageLoader();
                    }).error(function (data) {
                        StopPageLoader();
                        //fn_errorNotification("200", data, data, "Error Occured while Deleting Connection", "error_alert", "", "");
                        fn_errorNotification("200", data, data, "", "error_alert", "", "");
                    });
                }
                catch (e) {
                    StopPageLoader();
                    //fn_errorNotification("200", e, e, "Exception while Deleting Connection", "error_alert", "", "");
                    fn_errorNotification("200", e, e, "", "error_alert", "", "");
                }
            }
        });
    };
    //End: Remove Selected Sql Connection from the List

    //Start: Save New Stored Procedure
    $scope.SaveCreateSP = function () {
        var SPCreateQuery = $scope.SPCreate;
        var ConnIdhidespedit = $scope.hideConnIdforSP;
        var SPobjeditquery = new Array();
        SPobjeditquery.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "SPCreateQuery": SPCreateQuery
        });

        if (SPCreateQuery == "" || SPCreateQuery == null || SPCreateQuery == "null") {
            alert("Please Enter Query");
            return false;
        }
        var SPobjcreate_query = JSON.stringify(SPobjeditquery);
        try {
            StartPageLoader();
            sqlDBFactory.SP_CreateQuery(SPobjcreate_query).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.Result) {
                    fn_SuccessNotification(data.Result, "success_alert", "", "");
                    var element = angular.element('#myModalforSPCreate');
                    element.modal('hide');
                    $scope.SPCreate = "";
                }
                else if (data.error) {
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Saving Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Saving Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Saving Stored Procedure", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Save New Stored Procedure

    //Start: Clear New Stored Procedure Popup    
    $scope.ClearCreateSP = function () {
        $scope.SPCreate = "";
    };
    //End: Clear New Stored Procedure Popup

    //Start: Getting Selected SQL Connection Already Added Stored Procedures List    
    $scope.ConnSelected = function (Con) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        $scope.hideConnIdforSP = Con;
        var selctConnId = Con;
        if (selctConnId) {
            $("#AddButton").removeClass("disableicons");
            $("#CreateSP").removeClass("disableicons");
        }
        try {
            StartPageLoader();
            sqlDBFactory.getAvailSP(selctConnId).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.error) {
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while getting Stored Procedures", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                else if (data.Result) {
                    $scope.selection = data.Result;
                }
                else {
                    //fn_errorNotification("200", data, data, "Error Occured while getting Stored Procedures", "error_alert", "", "");
                    fn_errorNotification("200", data, data, "", "error_alert", "", "");
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while getting Stored Procedures", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while getting Stored Procedures", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Getting Selected SQL Connection Already Added Stored Procedures List  

    //Start: Getting List of all Stored Procedures of Selected SQL Connection    
    $scope.AddSP = function () {
        var selctedConn = $scope.hideConnIdforSP;
        try {
            StartPageLoader();
            sqlDBFactory.getSPlist(selctedConn).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.error) {
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while getting Stored Procedures List", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                else {
                    $scope.splist = data;
                    var element = angular.element('#myModalforSP');
                    element.modal('show');

                    for (var i = 0; i < $scope.splist.length; i++) {
                        var key = $scope.splist[i].name;
                        for (var j = 0; j < $scope.selection.length; j++) {
                            if (key == $scope.selection[j].name) {
                                $scope.splist[i]._checked = true;
                            }
                        }
                    }
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while getting Stored Procedures List", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while getting Stored Procedures List", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Getting List of all Stored Procedures of Selected SQL Connection 

    //Start: Adding and Removing Stored Procedures for selected SQL Connection
    $scope.toggleSelection = function toggleSelection(checkedname) {
        checkedname._checked = !checkedname._checked;
        if (checkedname._checked) {
            $scope.selection.push(checkedname);
            var selectedsp = checkedname.name;
            var ConnIdhide = $scope.hideConnIdforSP;
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnectionId": ConnIdhide,
                "Selected_SP": selectedsp,
                "checked": true
            });
            var Save_SPdata = JSON.stringify(ConnSPobj);
            try {
                StartPageLoader();
                sqlDBFactory.saveSPConn(Save_SPdata).success(function (data) {
                    if (data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else if (data.error) {
                        //fn_errorNotification("200", data.error, data.error, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                        fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                    }
                    else if (data.Result) {
                        $scope.selection = data.Result;
                        var storepdname = selectedsp;
                        var selcSPId = $scope.hideConnIdforSP;
                        $scope.hiddenSPNamechk = selectedsp;
                        $scope.hiddenSPName = selectedsp;
                        var slcSPobj = new Array();
                        slcSPobj.push({
                            "StorePDname": storepdname,
                            "SelcSPId": selcSPId
                        });
                        var getSPdtails = JSON.stringify(slcSPobj);

                        try {
                            StartPageLoader();
                            sqlDBFactory.get_SPdtails(getSPdtails).success(function (data) {
                                if (data.ResponseData) {
                                    if (data.ResponseData == "Show Param Configure") {
                                        $scope.modal.status = false;
                                        var element = angular.element('#myModalforspdtails');
                                        $scope.parameterschk = [];
                                        element.modal('show');
                                        $scope.modal.paramconfigstatus = false;
                                    }
                                    else {
                                        $scope.modal.status = false;
                                        $scope.modal.paramconfigstatus = false;
                                        $scope.modal.statusparamchk = false;
                                        $scope.modal.statusparamchkdata = false;
                                        $scope.modal.statustdchk = true;
                                        $scope.parameterschk = [];
                                        $scope.parameterschk = data.ResponseData;
                                        var element = angular.element('#myModalspdtailschecked');
                                        element.modal('show');
                                        //$scope.parameterschk = JSON.parse(data.responsedata).NewDataSet["Table"];
                                    }
                                }
                                else if (data.Result) {
                                    $scope.modal.status = false;
                                    $scope.modal.statusparamchk = false;
                                    $scope.modal.statusparamchkdata = false;
                                    $scope.modal.statustdchk = true;
                                    //$scope.parameterschk = JSON.parse(data.data).NewDataSet["Table"];
                                    $scope.parameterschk = [];
                                    $scope.parameterschk = data.Result;
                                    var element = angular.element('#myModalspdtailschecked');
                                    element.modal('show');
                                }
                                else if (data.error) {
                                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                                }
                                StopPageLoader();
                            })
                            .error(function (data) {
                                StopPageLoader();
                                //fn_errorNotification("200", data, data, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                                fn_errorNotification("200", data, data, "", "error_alert", "", "");
                            });
                        }
                        catch (e) {
                            StopPageLoader();
                            //fn_errorNotification("200", e, e, "Exception while Selecting Stored Procedure", "error_alert", "", "");
                            fn_errorNotification("200", e, e, "", "error_alert", "", "");
                        }
                    }
                    StopPageLoader();
                }).error(function (data) {
                    StopPageLoader();
                    //fn_errorNotification("200", data, data, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data, data, "", "error_alert", "", "");
                });
            }
            catch (e) {
                StopPageLoader();
                //fn_errorNotification("200", e, e, "Exception while Selecting Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", e, e, "", "error_alert", "", "");
            }
        }
        else {
            var idx = $scope.selection.indexOf(checkedname.name);
            $scope.selection.splice(idx, 1);
            var selectedsp = checkedname.name;
            var ConnIdhide = $scope.hideConnIdforSP;
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnIdhide": ConnIdhide,
                "SelectedSPS": selectedsp
            });
            var Remove_SPdata = JSON.stringify(ConnSPobj);
            try {
                StartPageLoader();
                sqlDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                    if (data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else if (data.error) {
                        //fn_errorNotification("200", data.error, data.error, "Error Occured while deselecting Stored Procedure", "error_alert", "", "");
                        fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                    }
                    else if (data.Result) {
                        $scope.selection = data.Result;
                    }
                    StopPageLoader();
                }).error(function (data) {
                    StopPageLoader();
                    //fn_errorNotification("200", data, data, "Error Occured while deselecting Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data, data, "", "error_alert", "", "");
                });
            }
            catch (e) {
                StopPageLoader();
                //fn_errorNotification("200", e, e, "Exception while deselecting Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", e, e, "", "error_alert", "", "");
            }
        }
    };
    //End: Adding and Removing Stored Procedures for selected SQL Connection

    //Start: Getting Selected Stored Procedure Details
    $scope.getSPdtails = function (spname) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected1 = 'tile1';
        }
        this.selected1 = 'tileselected1';
        $scope.lastSelected = this;
        var storepdname = spname;
        var selcSPId = $scope.hideConnIdforSP;
        $scope.hiddenSPName = spname;
        var slcSPobj = new Array();
        slcSPobj.push({
            "StorePDname": storepdname,
            "SelcSPId": selcSPId
        });
        var getSPdtails = JSON.stringify(slcSPobj);
        try {
            StartPageLoader();
            sqlDBFactory.get_SPdtails(getSPdtails).success(function (data) {
                if (data.ResponseData) {
                    if (data.ResponseData == "Show Param Configure") {
                        $scope.modal.status = false;
                        var element = angular.element('#myModalforspdtails');
                        element.modal('show');
                        $scope.parameters = [];
                        $scope.modal.paramconfigstatus = false;
                    }
                    else {
                        $scope.modal.status = false;
                        $scope.modal.paramconfigstatus = false;
                        var element = angular.element('#myModalforspdtails');
                        element.modal('show');
                        //$scope.parameters = JSON.parse(data.responsedata).NewDataSet["Table"];
                        $scope.parameters = [];
                        $scope.parameters = data.ResponseData;
                    }
                }
                else if (data.Result) {
                    $scope.modal.status = false;
                    $scope.modal.paramconfigstatus = true;
                    //$scope.parameters = JSON.parse(data.data).NewDataSet["Table"];
                    $scope.parameters = [];
                    $scope.parameters = data.Result;
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                }
                else if (data.errorresult) {
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Selecting Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Selecting Stored Procedure", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Getting Selected Stored Procedure Details

    //Start: Bind Selected Stored Procedure to Modal
    $scope.editSP = function (spitemname) {
        var element = angular.element('#myModalforSPEdit');
        element.modal('show');
        $scope.hiddenSPName = spitemname;
        var ConnIdhidespedit = $scope.hideConnIdforSP;
        var editspitemname = spitemname;
        var SpId = $("#SP_id").html();
        var SPobjedit = new Array();
        SPobjedit.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "Editspitem": editspitemname,
            "Id": SpId
        });
        var SPobj_edit = JSON.stringify(SPobjedit);
        try {
            StartPageLoader();
            sqlDBFactory.SP_Edit(SPobj_edit).success(function (data) {
                if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
                else if (data.Result) {
                    StopPageLoader();
                    var query = data.Result[0].definition;
                    var alterspquery = query.replace("CREATE", "Alter");
                    $scope.SPEdit = alterspquery;
                }
                else if (data.error) {
                    StopPageLoader();
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Getting Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Getting Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Getting Stored Procedure", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Bind Selected Stored Procedure to Modal

    //Start: Update Stored Procedure
    $scope.SaveSP = function () {
        var selcSPName = $scope.hiddenSPName;
        var SPEditQuery = $scope.SPEdit;
        var ConnIdhidespedit = $scope.hideConnIdforSP;
        var SPobjeditquery = new Array();
        SPobjeditquery.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "SPEditQuery": SPEditQuery,
            "selcSPName": selcSPName
        });
        var SPobjedit_query = JSON.stringify(SPobjeditquery);
        try {
            StartPageLoader();
            sqlDBFactory.SP_EditQuery(SPobjedit_query).success(function (data) {
                if (data.Result) {
                    StopPageLoader();
                    fn_SuccessNotification(data.Result, "success_alert", "", "");
                    var element = angular.element('#myModalforSPEdit');
                    element.modal('hide');
                    $scope.SPEdit = "";
                }
                else if (data.error) {
                    StopPageLoader();
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Updating Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Updating Stored Procedure", "error_alert", "", "");
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Updating Stored Procedure", "error_alert", "", "");
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Update Stored Procedure

    //Start: Deleting Selected Stored Procedure from the Connection
    $scope.removeSP = function (index, spitem) {
        bootbox.confirm("Do you really want to Delete this Stored Procedure?", function (result) {
            if (result) {
                $scope.selection.splice(index, 1);
                var selectedsp = spitem;
                var ConnIdhide = $scope.hideConnIdforSP;
                var SpId = $("#SP_id").html();
                var ConnSPobj = new Array();
                ConnSPobj.push({
                    "ConnIdhide": ConnIdhide,
                    "SelectedSPS": selectedsp,
                    "SpId": SpId
                });
                var Remove_SPdata = JSON.stringify(ConnSPobj);
                try {
                    StartPageLoader();
                    sqlDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                        if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else if (data.error) {
                            //fn_errorNotification("200", data.error, data.error, "Error Occured while Deleting Stored Procedure", "error_alert", "", "");
                            fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                        }
                        else if (data.Result) {
                            // alert(data.responsedata);
                            // $scope.selection.push(JSON.parse(data.responsedata.Selected_SP));
                        }
                        StopPageLoader();
                    }).error(function (data) {
                        StopPageLoader();
                        //fn_errorNotification("200", data, data, "Error Occured while Deleting Stored Procedure", "error_alert", "", "");
                        fn_errorNotification("200", data, data, "", "error_alert", "", "");
                    });
                }
                catch (e) {
                    StopPageLoader();
                    //fn_errorNotification("200", e, e, "Exception while Deleting Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", e, e, "", "error_alert", "", "");
                }
            }
        });
    };
    //End: Deleting Selected Stored Procedure from the Connection

    //Start: Setting Modal Width and Height
    $('#myModalforSP').on('show.bs.modal', function () {
        $('.modal .modal-body').css('overflow-y', 'auto');
        $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
    });

    $('#myModalforallconn').on('show.bs.modal', function () {
        $('.modal .modal-body').css('overflow-y', 'auto');
        $('.modal .modal-body').css('max-height', $(window).height() * 1);
    });
    //End: Setting Modal Width and Height

    $('.EmptyDB').focusout(function () {
        //var value = $('.EmptyDB').filter(function () {
        //    return this.value === '';
        //});
        //if (value.length > 0) {
            $('#sql_DatabaseName').prop("disabled", "disabled");
            $scope.sql_databases = [];
        //}
    });

    //Start: Saving Stored Procedure data using chk function
    $scope.Savespdatachk = function () {
        var ConSPIdchk = $scope.hideConnIdforSP;
        var SPNamechk = $scope.hiddenSPNamechk;
        var SPparamschk = angular.toJson($scope.parameterschk);
        var saveSPparam = new Array();
        saveSPparam.push({
            "ConSPIdchk": ConSPIdchk,
            "SPNamechk": SPNamechk,
            "SPparamschk": SPparamschk
        });
        var saveSPparamdata = JSON.stringify(saveSPparam);
        try {
            sqlDBFactory.save_SPparamdatachk(saveSPparamdata).success(function (data) {
                if (data.jsontbldata) {
                    $scope.modal.statusparamchk = true;
                    $scope.modal.statusparamchkdata = true;
                    $scope.modal.statustdchk = false;
                    $scope.parameterstdchk = JSON.parse(data.jsontbldata).NewDataSet["Table"];
                    var element = angular.element('#myModalspdtailschecked');
                    element.modal('hide');
                }
                else if (data.jsonduplicate) {
                    var duplicatevar = (data.jsonduplicate);
                    alert("The " + duplicatevar + " alredy exists for this user...");
                }
                else if (data.error) {
                    alert(data.error);
                }
                else if (data.errorresult) {
                    if (data.errorresult == "An error occurred while updating the entries. See the inner exception for details.") {
                        alert("VariableNames Should not be Same!! Please Enter Different VariableName");
                    }
                    else {
                        alert(data.errorresult);
                    }
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Saving Stored Procedure data using chk function

    //Start: Configure SQL Parameters
    $scope.configuparam = function () {
        $scope.go = function (path) {
            $location.path(path);
        };
        var element = angular.element('#myModalforspdtails');
        element.modal('hide');
        $('.modal-backdrop').remove();
    };
    //End: Configure SQL Parameters

    //Start: Getting Selected Stored Procedure Data    
    $scope.Getspdata = function () {
        var selcConSPId = $scope.hideConnIdforSP;
        var selcSPName = $scope.hiddenSPName;
        var SPparams = angular.toJson($scope.parameters);
        var slcSPparam = new Array();
        slcSPparam.push({
            "selcConSPId": selcConSPId,
            "selcSPName": selcSPName,
            "SPparams": SPparams
        });
        var selcSPparam = JSON.stringify(slcSPparam);
        try {
            sqlDBFactory.get_SPparamdata(selcSPparam).success(function (data) {
                if (data.jsontbldata) {
                    $scope.modal.status = false;
                    $scope.parameters = JSON.parse(data.jsontbldata).NewDataSet["Table"];
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                }
                else if (data.error) {
                    alert(data.error);
                }
                else if (data.errorresult) {
                    alert(data.errorresult);
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Getting Selected Stored Procedure Data

    //Start: Close Available Stored Procedures Popup
    $scope.closechkevent = function () {
        var element = angular.element('#myModalspdtailschecked');
        element.modal('hide');
        var chkspname = $scope.hiddenSPNamechk;
        var chkcnnidname = $scope.hideConnIdforSP;
        var ConnSPobj = new Array();
        ConnSPobj.push({
            "ConnIdhide": chkcnnidname,
            "SelectedSPS": chkspname
        });
        var Remove_SPdata = JSON.stringify(ConnSPobj);
        try {
            StartPageLoader();
            sqlDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.error) {
                    //fn_errorNotification("200", data.error, data.error, "Error Occured while Removing Stored Procedure", "error_alert", "", "");
                    fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                }
                else if (data.Result) {
                    var idx = $scope.selection.indexOf(chkspname);
                    $scope.selection.splice(idx, 1);
                    try {
                        StartPageLoader();
                        sqlDBFactory.getSPlist(chkcnnidname).success(function (data) {
                            if (data.isauthenticated == false) {
                                fn_session_expired_client();
                            }
                            else if (data.error) {
                                //fn_errorNotification("200", data.error, data.error, "Error Occured while getting Stored Procedures List", "error_alert", "", "");
                                fn_errorNotification("200", data.error, data.error, "", "error_alert", "", "");
                            }
                            else {
                                $scope.splist = data;
                                var element = angular.element('#myModalforSP');
                                element.modal('show');

                                for (var i = 0; i < $scope.splist.length; i++) {
                                    var key = $scope.splist[i].name;
                                    for (var j = 0; j < $scope.selection.length; j++) {
                                        if (key == $scope.selection[j].name) {
                                            $scope.splist[i]._checked = true;
                                        }
                                    }
                                }
                            }
                            StopPageLoader();
                            //if (data.conSPList) {
                            //    var element = angular.element('#myModalforSP');
                            //    element.modal('show');
                            //    $scope.splist = JSON.parse(data.conSPList);
                            //    for (var i = 0; i < $scope.splist.length; i++) {
                            //        var key = $scope.splist[i].name;
                            //        for (var j = 0; j < $scope.selection.length; j++) {
                            //            if (key == $scope.selection[j].name) {
                            //                $scope.splist[i]._checked = true;
                            //            }
                            //        }
                            //    }
                            //}
                            //else if (data.errorresult) {
                            //    alert(data.errorresult);
                            //}
                        }).error(function (data) {
                            StopPageLoader();
                            //fn_errorNotification("200", data, data, "Error Occured while getting Stored Procedures List", "error_alert", "", "");
                            fn_errorNotification("200", data, data, "", "error_alert", "", "");
                        });
                    }
                    catch (e) {
                        StopPageLoader();
                        //fn_errorNotification("200", e, e, "Exception while getting Stored Procedures List", "error_alert", "", "");                        
                        fn_errorNotification("200", e, e, "", "error_alert", "", "");
                    }
                }
                StopPageLoader();
            }).error(function (data) {
                StopPageLoader();
                //fn_errorNotification("200", data, data, "Error Occured while Removing Stored Procedure", "error_alert", "", "");                
                fn_errorNotification("200", data, data, "", "error_alert", "", "");
            });
        }
        catch (e) {
            StopPageLoader();
            //fn_errorNotification("200", e, e, "Exception while Removing Stored Procedure", "error_alert", "", "");            
            fn_errorNotification("200", e, e, "", "error_alert", "", "");
        }
    };
    //End: Close Available Stored Procedures Popup

    //Start: Show Selected Connections Details    
    $scope.viewdetailssp = function (viewdtailid, datasource, cnnType, createdby) {
        var dsId = viewdtailid;
        $scope.hiddenCnnidforview = viewdtailid;
        var dsName = datasource;
        $scope.hiddenSPNameforview = datasource;
        var dsConnType = cnnType;
        $scope.hiddenCnnTypeforview = cnnType;
        var dscreatedby = createdby;
        $scope.hiddenCnnUserforview = createdby;
        var slcSPgridobj = new Array();
        slcSPgridobj.push({
            "DSId": dsId,
            "DSName": dsName,
            "DSConnType": dsConnType,
            "DSCnnCretedby": dscreatedby
        });
        var getSPgriddtails = JSON.stringify(slcSPgridobj);
        try {
            sqlDBFactory.get_SPGriddtails(getSPgriddtails).success(function (data) {
                if (data.tabledata) {
                    $scope.modal.status = true;
                    $scope.modal.sqlstatus = false;
                    $scope.modal.orclstatus = false;
                    var element = angular.element('#myModalgridspdtails');
                    element.modal('show');
                    $scope.gridparameters = JSON.parse(data.tabledata).NewDataSet["Table"];
                }
                else if (data.paramsdt) {
                    var ARGUMENT_NAME = JSON.parse(data.paramsdt).NewDataSet["Table"][0]["ARGUMENT_NAME"];
                    if (ARGUMENT_NAME == null) {
                        // $("#gridtdorclparams").hide();
                        $scope.modal.status = false;
                        $scope.modal.sqlstatus = true;
                        $scope.modal.orclstatus = false;
                        $scope.gridparameters = JSON.parse(data.paramsdt).NewDataSet["Table"];
                        var element = angular.element('#myModalgridspdtails');
                        element.modal('show');
                    }
                    else {
                        // $("#gridtdsqlparams").hide();
                        $scope.modal.status = false;
                        $scope.modal.sqlstatus = false;
                        $scope.modal.orclstatus = true;
                        $scope.gridparameters = JSON.parse(data.paramsdt).NewDataSet["Table"];
                        var element = angular.element('#myModalgridspdtails');
                        element.modal('show');
                    }
                }
                else if (data.errorresult) {
                    alert(data.errorresult);
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Show Selected Connections Details

    //Start: Directive for Datatable Callback    
    $scope.$on('ngrepetefinish', function (ngRepeatFinishedEvent) {
        $('.dataGrid').dataTable({
            "sPaginationType": "full_numbers",
            "bDestroy": true,
            "bFilter": true
        });
    });
    //End: Directive for Datatable Callback

    //Start: Show Selected Connection Data
    $scope.Getgridspdata = function () {
        var DsConId = $scope.hiddenCnnidforview;
        var DsSPName = $scope.hiddenSPNameforview;
        var DsType = $scope.hiddenCnnTypeforview;
        var Dscreatedby = $scope.hiddenCnnUserforview;
        var DsSPparams = angular.toJson($scope.gridparameters);
        var DSSPparamobj = new Array();
        DSSPparamobj.push({
            "DsConId": DsConId,
            "DsSPName": DsSPName,
            "DsType": DsType,
            "Dscreatedby": Dscreatedby,
            "DsSPparams": DsSPparams
        });
        var DSparamobj = JSON.stringify(DSSPparamobj);
        try {
            sqlDBFactory.get_SPGriddata(DSparamobj).success(function (data) {
                if (data.paramdatadt) {
                    $scope.modal.status = true;
                    $scope.modal.sqlstatus = false;
                    $scope.modal.orclstatus = false;
                    $scope.gridparameters = JSON.parse(data.paramdatadt).NewDataSet["Table"];
                    var element = angular.element('#myModalgridspdtails');
                    element.modal('show');
                }
                else if (data.error) {
                    alert(data.error);
                }
                else if (data.errorresult) {
                    alert(data.errorresult);
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Show Selected Connection Data

    //Start: Show Connections Grid Popup
    $scope.ShowConnections = function () {
        sqlDBFactory.getConngrid().success(function (data) {
            if (data.responsegrid) {
                $scope.ConnData = JSON.parse(data.responsegrid).NewDataSet["Table"];
                var element = angular.element('#myModalforallconn');
                element.modal('show');
            }
            else if (data.error) {
                alert(data.error);
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        }).error(function (data) {
            $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
        });
    };
    //End: Show Connections Grid Popup
});

function ShowLoader() {
    $("#Loader").css('display', 'block');
}

function HideLoader() {
    $("#Loader").css('display', 'none');
}
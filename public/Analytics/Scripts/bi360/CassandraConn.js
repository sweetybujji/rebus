RapidApp.factory('casDBFactory', function ($http) {
    return {
        getconnlist: function () {
            return $http.get('/CassandraConnection/GetCassandraConnList');
        },
        getSelectedDBList: function (Conndatafordb) {
            return $http.post('/CassandraConnection/GetDatabaseList', {
                Conndata: Conndatafordb
            });
        },
        getSelectedCassList: function (Conndatafordb) {
            return $http.post('/CassandraConnection/GetSelectedCassandraList', {
                Conndata: Conndatafordb
            });
        },
        saveConn: function (Save_Conn) {
            return $http.post('/CqlConnection/Savecas_Connection', Save_Conn);
        },
        CassandraQuerysaveConn: function (Save_Conn) {
            return $http.post('/CassandraConnection/SaveCassandraQuery', Save_Conn);
        },
        CassandraConnections: function (Save_Conn) {
            return $http.post('/CassandraConnection/CassandraList', Save_Conn);
        },
        get_SPdtails: function (Get_SPdtails) {
            return $http.post('/CassandraConnection/CassandraSPGet', {
                GET_SPdtail: Get_SPdtails
            });
        },
        CassSP_Edit: function (CasSPdataedit) {
            return $http.post('/CasConnection/CassandraSPGetEdit', {
                CassGetSPforedit: CasSPdataedit
            });
        },
        CassremoveSPConn: function (Remove_SPdata) {
            return $http.post('/CasConnection/RemoveCas_SPConnection', {
                Remove_ConnSPdata: Remove_SPdata
            });
        },
        CassandraSP_EditQuery: function (SPedit_query) {
            return $http.post('/CasConnection/CassandraSPUpdate', {
                SPobjEdit_Query: SPedit_query
            });
        },

        editsqlCon: function (Edit_Conn) {
            return $http.post('/CassandraConnection/Editcassandra_Connection', {
                Edit_Conn: Edit_Conn
            });
        },
        removeConn: function (selcteditem) {
            return $http.post('/CqlConnection/RemoveCassandra_Connection', {
                remove_ConndataId: selcteditem
            });
        }
    };
});

RapidApp.controller('CassandraCtrl', function ($scope, $location, casDBFactory) {
    $scope.sql_Type = 'Sql';
    $scope.selected = 'tile';
    $scope.selected1 = 'tile1';
    $scope.splist = [];
    $scope.selection = [];
    $scope.parameters = [];
    $scope.parameterschk = [];
    $scope.gridparameters = [];
    $scope.cqlconnections = [];
    $scope.cas_UserId = '';
    $scope.cas_Password = '';
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
        HeaderTitle: "Cassandra Server Database"
    };

    //Start: Getting Cassandra Template Function
    $scope.go = function (path) {
        $location.path(path);
    };
    //End: Getting Cassandra Template Function





    //Start: Getting Created Cassandra Connections List
    casDBFactory.getconnlist().success(function (data) {
        if (data.data) {
            if (data.data.length > 0) {
                $scope.cqlconnections = data.data;
            }
        }
        else if (data.error) {
            fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
        }
        else if (data.isauthenticated == false) {
            StopPageLoader();
            fn_session_expired_client();
        }
    }).error(function (data) {
        fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
        // $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //End: Getting Created Cassandra Connections List



    //Start: Add Query to Selected Cassandra Connection 
    $scope.AddSP = function () {
        var selctedConn = $scope.hideConnIdforSP;
        try {
            casDBFactory.getSPlist(selctedConn).success(function (data) {
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
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Add Query to Selected Cassandra Connection 

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

    //Start: Remove Selected Query from the List
    $scope.removeItem = function (index, item) {
        //  var test = confirm("Are you sure want to Delete it?");

        bootbox.confirm("Are you sure want to Delete it?", function (result) {
            if (result) {
                var selcteditem = item;
                try {
                    StartPageLoader();
                    casDBFactory.removeConn(selcteditem).success(function (data) {

                        if (data.error) {
                            StopPageLoader();
                            $scope.cas_databases = [];

                            fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                        }
                        else if (data.isauthenticated == false) {
                            StopPageLoader();
                            fn_session_expired_client();
                        }
                        else if (data.data) {
                            fn_SuccessNotification("Sucessfully deleted the connection...", "success_alert", "", "");
                            StopPageLoader();

                            $scope.cqlconnections.splice(index, 1);
                            $scope.selection = null;
                        }
                    }).error(function (data) {
                        alert(data);
                    });
                }
                catch (e) {
                    alert(e);
                }
            }
            else {
                return false;
            }
        });


    };
    //End: Remove Selected Query from the List

    //Start: Adding and Removing Querries for selected Cassandra Connection
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
                sqlDBFactory.saveSPConn(Save_SPdata).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.responsedata) {
                        $scope.selection = JSON.parse(data.responsedata);
                        // $scope.selection.push(JSON.parse(data.responsedata));
                        var storepdname = selectedsp;
                        var selcSPId = $scope.hideConnIdforSP;
                        $scope.hiddenSPNamechk = selectedsp;
                        var slcSPobj = new Array();
                        slcSPobj.push({
                            "StorePDname": storepdname,
                            "SelcSPId": selcSPId
                        });
                        var getSPdtails = JSON.stringify(slcSPobj);
                        try {
                            sqlDBFactory.get_SPdtails(getSPdtails).success(function (data) {
                                if (data.responsedata) {
                                    if (data.responsedata == "Show Param Configure") {
                                        $scope.modal.status = false;
                                        var element = angular.element('#myModalforspdtails');
                                        element.modal('show');
                                        $scope.modal.paramconfigstatus = false;
                                    }
                                    else {
                                        $scope.modal.paramconfigstatus = true;
                                        $scope.modal.statusparamchk = true;
                                        $scope.modal.statusparamchkdata = false;
                                        $scope.modal.statustdchk = false;
                                        var element = angular.element('#myModalspdtailschecked');
                                        element.modal('show');
                                        $scope.parameterschk = JSON.parse(data.responsedata).NewDataSet["Table"];
                                    }
                                }
                                else if (data.data) {
                                    $scope.modal.statusparamchk = false;
                                    $scope.modal.statusparamchkdata = false;
                                    $scope.modal.statustdchk = true;
                                    $scope.parameterschk = JSON.parse(data.data).NewDataSet["Table"];
                                    var element = angular.element('#myModalspdtailschecked');
                                    element.modal('show');
                                }
                                else if (data.error) {
                                    alert(data.error);
                                }
                            }).error(function (data) {
                                alert(data);
                            });
                        }
                        catch (e) {
                            alert(e);
                        }
                    }
                }).error(function (data) {
                    alert(data);
                });
            }
            catch (e) {
                alert(e);
            }
        }
        else {
            var idx = $scope.selection.indexOf(checkedname.name);
            $scope.selection.splice(idx, 1);
            var selectedsp = checkedname.name;
            var ConnIdhide = $scope.hideConnIdforSP;
            var SpId = $("#SP_id").html();
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnIdhide": ConnIdhide,
                "SelectedSPS": selectedsp
            });
            var Remove_SPdata = JSON.stringify(ConnSPobj);
            try {
                sqlDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.responsedata) {
                        $scope.selection = JSON.parse(data.responsedata);
                        // $scope.selection.push(JSON.parse(data.responsedata.Selected_SP));
                    }
                    else if (data.error) {
                        alert("Error Occured please try again............");
                    }
                }).error(function (data) {
                    alert(data);
                });
            }
            catch (e) {
                alert(e);
            }
        }
    };
    //End: Adding and Removing Querries for selected Cassandra Connection

    //Start: Close Querries Popup
    $scope.finish = function () {
        var element = angular.element('#myModalforSP');
        element.modal('hide');
    };
    //End: Close Querries Popup

    //Start: Open Cassandra Connection Creation Popup
    $scope.AddConnection = function () {
        var element = angular.element('#cqlmyModal');
        element.modal('show');
        clear();
    };
    //End: Open Cassandra Connection Creation Popup

    //Start: Saving Query using chk function
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
    //End: Saving Query using chk function

    //Start: Clear Cassandra Connection Creation Popup  
    function clear() {
        $scope.cas_ConnectionName = "";
        $scope.cas_ServerName = "";
        $scope.cas_PortNumber = "";
        $scope.cas_UserId = "";
        $scope.cas_Password = "";
        $scope.cas_DatabaseName = "";
        $("#cas_DatabaseName").val("");
        $scope.cas_databases = [];
        $("#cqlmyModal").on('hidden', function () {
            $('#cqlmyModal').removeData('bs.modal');
            $('#cqlmyModal').removeClass('modal-open');
        });
    }

    $scope.clearmodal = function () {
        $scope.cas_ConnectionName = "";
        $scope.cas_ServerName = "";
        $scope.cas_PortNumber = "";
        $scope.cas_UserId = "";
        $scope.cas_Password = "";
        $scope.cas_DatabaseName = "";
        $scope.hideConnIdforEdit = "save";
    };
    //End: Clear Cassandra Connection Creation Popup  

    //Start: Loading Databases List
    $scope.dblistfunc = function () {

        /// alert("hai");
        var objfordblist = new Array();

        var ConnectionType = $scope.cas_ConnectionType;
        var ConnectionName = $scope.cas_ConnectionName;

        var UserName = $scope.cas_UserId;
        var ServerName = $scope.cas_ServerName;
        var PortNumber = $scope.cas_PortNumber;
        var User = $scope.cas_UserId;
        var Password = $scope.cas_Password;
        var DBName = $scope.cas_DatabaseName;
        //	var sql_Type = $scope.sql_Type;

        if ((ConnectionName != "" && ConnectionName != "null" && ConnectionName != "undefined" && ConnectionName != undefined)
                && (ServerName != "" && ServerName != "null" && ServerName != "undefined" && ServerName != undefined)
                && (PortNumber != "" && PortNumber != "null" && PortNumber != "undefined" && PortNumber != undefined)
                && (User != "" && User != "null" && User != "undefined" && User != undefined)
                && (Password != "" && Password != "null" && Password != "undefined" && Password != undefined)) {
            objfordblist.push({
                "ConType": ConnectionType,
                "ConName": ConnectionName,
                "UserName": UserName,
                "ServerName": ServerName,
                "PortNumber": PortNumber,
                "User": User,
                "Password": Password,
                "DBName": DBName,
                //	"sql_Type" : sql_Type
            });
            var Conndata = JSON.stringify(objfordblist);
            StartPageLoader();
            try {
                casDBFactory.getSelectedDBList(Conndata).success(function (data) {

                    // alert(JSON.stringify(data));

                    if (data.dblist) {
                        // $scope.sql_databases
                        // =
                        // JSON.parse(data.jsondblist);
                        $scope.cas_databases = [];
                        for (var i = 0; i < data.dblist.length; i++) {
                            $scope.cas_databases.push(data.dblist[i].keyspace_name);
                        }
                        StopPageLoader();
                    } else if (data.error) {
                        StopPageLoader();
                        $scope.cas_databases = [];

                        fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                    }
                    else if (data.isauthenticated == false) {
                        StopPageLoader();
                        fn_session_expired_client();
                    }
                }).error(function (data) {
                    StopPageLoader();
                    alert(data);
                });
            } catch (e) {
                StopPageLoader();
                // alert(e);
            }
        }

        StopPageLoader();

    };
    //End: Loading Databases List

    //Start: Save Operation for Cassandra Connection
    $scope.SaveCassConn = function () {
        var Connobj = new Array();
        var ConnectionType = $scope.cas_ConnectionType;
        var ConnectionName = $scope.cas_ConnectionName;
        var UserName = 'ASD';
        var ServerName = $scope.cas_ServerName;
        var PortNumber = $scope.cas_PortNumber;
        var User = $scope.cas_UserId;
        var Password = $scope.cas_Password;
        var DBName = $scope.cas_DatabaseName;
        var operation = $scope.hideConnIdforEdit;


        if ($scope.cas_DatabaseName == "" || $scope.cas_DatabaseName == null) {
            //alert("Please Select Atlest One Database");
            bootbox.alert("Please Select Atleast One Database")
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
            //"sqlType" : sql_Type,
            "operation": operation,
            "Connectas": "basic"
        });
        var Save_Conndata = JSON.stringify(Connobj);
        try {
            StartPageLoader();
            casDBFactory.saveConn(Save_Conndata).success(function (data) {
                if (data.data == "duplicates") {
                    bootbox.alert("Connection Name Already Exists...!");
                    StopPageLoader();
                }
                else if (data.data) {
                    if (operation == "save") {
                        fn_SuccessNotification("Sucessfully created the connection...", "success_alert", "", "");
                    }
                    else {
                        fn_SuccessNotification("Sucessfully Updated the connection...", "success_alert", "", "");
                    }
                    $scope.cqlconnections = data.data;
                    var element = angular.element('#cqlmyModal');
                    element.modal('hide');
                    clear();
                    $scope.hideConnIdforEdit = "save";

                    StopPageLoader();
                }
                else if (data.error) {
                    fn_errorNotification("200", data.error, data.error, "Error Occured in Saving Data with code fn_SavePasswordPolicy_002", "error_alert", "", "");
                    StopPageLoader();
                }
                else if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }

            }).error(function (data) {
                bootbox.alert(data);
                StopPageLoader();
            });
        }
        catch (e) {
            bootbox.alert(e);
        }
    };
    //End: Save Operation for Cassandra Connection

    //Start: Update Operation for Cassandra Connection
    $scope.editCqlConn = function (e) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        var editConnId = e;
        try {
            casDBFactory.editsqlCon(editConnId).success(function (data) {
                if (data.error) {
                    fn_errorNotification("200", "", "", data.error, "error_alert", "", "");

                }
                else if (data.data) {
                    var element = angular.element('#cqlmyModal');
                    element.modal('show');
                    $scope.hideConnIdforEdit = data.data[0].id;
                    $scope.cas_ConnectionName = data.data[0].connectionname;
                    $scope.cas_ConnectionType = data.data[0].connectiontype;
                    $scope.cas_ServerName = data.data[0].servername;
                    $scope.cas_PortNumber = data.data[0].portnumber;
                    $scope.cas_UserId = data.data[0].userid;
                    $scope.cas_Password = data.data[0].password;
                    //$scope.cas_Type = data.data[0].sqltype;
                    var USERID = data.data[0].userid;
                    var PASSWORD = data.data[0].password;
                    if (USERID == "" || USERID == null || USERID == "null") {
                        $scope.cas_UserId = "";
                    }
                    else {
                        $scope.cas_UserId = USERID;
                    }
                    if (PASSWORD == "" || PASSWORD == null || PASSWORD == "null") {
                        $scope.cas_Password = "";
                    }
                    else {
                        $scope.cas_Password = PASSWORD;
                    }
                    var objfordblist = new Array();
                    var ConnectionType = $scope.cas_ConnectionType;
                    var ConnectionName = $scope.cas_ConnectionName;
                    var UserName = 'ASD';
                    var ServerName = $scope.cas_ServerName;
                    var PortNumber = $scope.cas_PortNumber;
                    var User = $scope.cas_UserId;
                    var Password = $scope.cas_Password;
                    var DBName = $scope.cas_DatabaseName;
                    //	var sql_Type = $scope.sql_Type;
                    objfordblist.push({
                        "ConType": ConnectionType,
                        "ConName": ConnectionName,
                        "UserName": UserName,
                        "ServerName": ServerName,
                        "PortNumber": PortNumber,
                        "User": User,
                        "Password": Password,
                        "DBName": DBName,
                        //	"sql_Type" : sql_Type
                    });
                    var Conndata = JSON.stringify(objfordblist);

                    casDBFactory.getSelectedDBList(Conndata).success(function (data) {

                        // alert(JSON.stringify(data));

                        if (data.dblist) {
                            // $scope.sql_databases
                            // =
                            // JSON.parse(data.jsondblist);
                            $scope.cas_databases = [];
                            for (var i = 0; i < data.dblist.length; i++) {
                                $scope.cas_databases.push(data.dblist[i].keyspace_name);
                            }
                            StopPageLoader();
                        } else if (data.error) {
                            StopPageLoader();
                            $scope.cas_databases = [];

                            fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                        }
                        else if (data.isauthenticated == false) {
                            StopPageLoader();
                            fn_session_expired_client();
                        }
                    }).error(function (data) {
                        StopPageLoader();
                        alert(data);
                    });
                    $scope.cas_DatabaseName = data.data[0].databasename;
                }
                else if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Update Operation for Cassandra Connection



    //Start: Save Table Query
    $scope.SaveCassandraQuery = function () {
        var SPCreateQuery = $scope.SPCreate;
        var Name = $("#txt_CassandraNameTextBox").val();
        var ConnIdhidespedit = $scope.hideConnIdforSP;
        var operation = $("#txt_CassandraNameTextBox").attr('operation');
        if (Name == "" || Name == "Null") {
            bootbox.alert("Please Enter Name");
        }
        else if (typeof SPCreateQuery == "undefined" || SPCreateQuery == "null" || SPCreateQuery == undefined) {
            bootbox.alert("Please Enter Query");
        }
        else {
            var SPobjcassandraTablequery = new Array();
            SPobjcassandraTablequery.push({
                "ConnIdhidespedit": ConnIdhidespedit,
                "Name": Name,
                "SPCreateQuery": SPCreateQuery,
                "operation": operation
            });
            var SPobjcassandraTable_query = JSON.stringify(SPobjcassandraTablequery);
            try {
                StartPageLoader();
                casDBFactory.CassandraQuerysaveConn(SPobjcassandraTablequery).success(function (data) {

                    if (data.error) {
                        StopPageLoader();
                        $scope.selection = [];
                        fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                    }
                    else if (data.isauthenticated == false) {
                        StopPageLoader();
                        fn_session_expired_client();
                    }
                    else if (data.duplicate) {
                        StopPageLoader();
                        bootbox.alert("Name is aleready exists.");
                    }
                    else if (data.data) {
                        $scope.SPCreate = "";
                        $("#txt_CassandraNameTextBox").val("");
                        var element = angular.element('#myModalforSPCreate');
                        element.modal('hide');
                        if (operation == "save") {
                            fn_SuccessNotification("Query created Sucessfully...", "success_alert", "", "");
                            $scope.selection = data.data;
                        }
                        else {
                            fn_SuccessNotification("Query Updated Sucessfully...", "success_alert", "", "");
                            $scope.selection = data.data;

                        }
                        StopPageLoader();
                    }
                }).error(function (data) {
                    bootbox.alert(data);
                });
            }
            catch (e) {
                alert(e);
            }
        }
    };
    //End: Save Table Query

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

            casDBFactory.getSelectedCassList(selctConnId).success(function (data) {

                if (data.error) {
                    StopPageLoader();
                    $scope.selection = [];
                    fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                }
                else if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
                else if (data.data) {
                    StopPageLoader();
                    $scope.selection = data.data;
                }

            }).error(function (data) {

                bootbox.alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };

    $scope.CreateSP = function () {

        $("#CassQueryOperation").html("Save");

        $("#txt_CassandraNameTextBox").attr('operation', 'save');
        $("#txt_CassandraNameTextBox").val("");
        //$("#txt_CassandraNameTextBox").prop('disabled', "");

        $scope.SPCreate = "";

    }

    //Start: Edit Query
    $scope.editSP = function (spitemname) {

        $scope.hiddenSPName = spitemname;
        var ConnIdhidespedit = $scope.hideConnIdforSP;
        var editspitemname = spitemname;
        //var SpId = $("#SP_id").html();
        var SPobjedit = new Array();
        SPobjedit.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "Editspitem": editspitemname,
        });
        var SPobj_edit = JSON.stringify(SPobjedit);
        try {
            StartPageLoader();
            casDBFactory.CassSP_Edit(SPobj_edit).success(function (data) {

                if (data.error) {
                    StopPageLoader();
                    $scope.selection = [];
                    fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                }
                else if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
                else if (data.data) {
                    StopPageLoader();


                    $("#txt_CassandraNameTextBox").attr('operation', data.data[0]["id"]);
                    $("#txt_CassandraNameTextBox").val(data.data[0]["tablename"]);
                    //$("#txt_CassandraNameTextBox").attr('disabled', "disabled");

                    //$('#SPEdit').val(data[0]["query"]);
                    $scope.SPCreate = data.data[0]["query"];

                    //$("#CassQueryOperation").html("Update");

                    var element = angular.element('#myModalforSPCreate');
                    element.modal('show');
                }

            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //End: Edit Query

    //Start: Close Cassandra Connection Popup
    $scope.closecqlconn = function () {
        var element = angular.element('#cqlmyModal');
        element.modal('hide');
    };
    //End: Close Cassandra Connection Popup

    //Start: Configure Cassandra Parameters
    $scope.configuparam = function () {
        $scope.go = function (path) {
            $location.path(path);
        };
        var element = angular.element('#myModalforspdtails');
        element.modal('hide');
        $('.modal-backdrop').remove();
    };
    //End: Configure Cassandra Parameters

    //Start: Getting Selected Query Data    
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
    //End: Getting Selected Query Data    

    //Start: Getting Selected Query
    $scope.removeSP = function (index, spitem) {


        bootbox.confirm("Are you sure want to Delete it?", function (result) {
            if (result) {

                var selectedsp = spitem;
                //var ConnIdhide = $scope.hideConnIdforSP;
                //var SpId = $("#SP_id").html();
                var ConnSPobj = new Array();
                ConnSPobj.push({
                    "SelectedSPS": selectedsp,
                    "ConnIdhide": $scope.hideConnIdforSP
                });
                var Remove_SPdata = JSON.stringify(ConnSPobj);
                try {
                    StartPageLoader();
                    casDBFactory.CassremoveSPConn(Remove_SPdata).success(function (data) {
                        if (data.error) {
                            StopPageLoader();
                            // $scope.selection = [];
                            fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                        }
                        else if (data.isauthenticated == false) {
                            StopPageLoader();
                            fn_session_expired_client();
                        }
                        else if (data.duplicate) {
                            StopPageLoader();
                            bootbox.alert("Name is aleready exists.");
                        }
                        else if (data.data) {
                            $scope.selection.splice(index, 1);

                            fn_SuccessNotification("Deleted Sucessfully...", "success_alert", "", "");
                            $scope.selection = data.data;
                            StopPageLoader();
                        }


                    }).error(function (data) {
                        alert(data);
                    });
                }
                catch (e) {
                    alert(e);
                }
            }
            else {
                return false;
            }
        });
    };
    //End: Getting Selected Query



    //cassandra_Edit
    $scope.cassandraget_SPdtails = function (spname) {
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
            casDBFactory.get_SPdtails(getSPdtails).success(function (data) {
                if (data.error) {
                    StopPageLoader();
                    // $scope.selection = [];
                    fn_errorNotification("200", "", "", data.error, "error_alert", "", "");
                }
                else if (data.isauthenticated == false) {
                    StopPageLoader();
                    fn_session_expired_client();
                }
                else if (data.res) {
                    $scope.modal.status = false;
                    $scope.modal.paramconfigstatus = true;
                    $scope.parameters = data.res;
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };

    //Start: Clear Query Popup 
    $scope.ClearCreateSP = function () {


        if ($("#txt_CassandraNameTextBox").attr("operation") == "save")
        {
            $("#txt_CassandraNameTextBox").val("");
        }
        $scope.SPCreate = "";
    };
    //End: Clear Query Popup 


    //Start: Directive for Datatable Callback  
    $scope.$on('ngrepetefinish', function (ngRepeatFinishedEvent) {
        $('.dataGrid').dataTable({
            "sPaginationType": "full_numbers",
            "bDestroy": true,
            "bFilter": true
        });
    });
    //End: Directive for Datatable Callback  


});

function ShowLoader() {
    // $("#loading").show();
    $("#Loader").css('display', 'block');
}

function HideLoader() {
    // $("#loading").hide();
    $("#Loader").css('display', 'none');
}
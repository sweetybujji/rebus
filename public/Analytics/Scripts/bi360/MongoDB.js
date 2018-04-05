RapidApp.factory('MongoDBFactory', function ($http) {
    return {
        getmongoconnlist: function () {
            return $http.get('/MongoDBConnection/GetMongoConnList');
        },
        saveConn: function (Save_Conn) {
            return $http.post('/MongoDBConnection/SaveMongo_Connection', { Save_Conndata: Save_Conn });
        },
        editMongoCon: function (Edit_Conn) {
            return $http.post('/MongoDBConnection/EditMongo_Connection', { Edit_Conn: Edit_Conn });
        },
        removeConn: function (selcteditem) {
            return $http.post('/MongoDBConnection/RemoveMongo_Connection', { remove_ConndataId: selcteditem });
        },
        getAvailCollections: function (selctConnId) {
            return $http.post('/MongoDBConnection/GetMongoCollectionAvail', { selectedConnId: selctConnId });
        },
        get_Colldtails: function (Get_SPdtails) {
            return $http.post('/MongoDBConnection/GET_Colldtails', { GET_SPdtail: Get_SPdtails });
        }
    };
});

RapidApp.controller('GetMongoDBConnections', function ($scope, $location, MongoDBFactory) {
    $scope.selected = 'tile';
    $scope.selected1 = 'tile1';
    $scope.mongodbconnections = [];
    // $scope.hideConnIdMongoDBEdit = "save";
    $scope.templatesettings = { HeaderTitle: "MongoDB Server" };
    $scope.modal = { status: true, sqlstatus: true, orclstatus: true, statusparamchk: true, statusparamchkdata: true, statustdchk: true, paramconfigstatus: true }

    //Start: Getting Created Mongo Connections List
    MongoDBFactory.getmongoconnlist().success(function (data) {
        if (data) {
            var conlistcnt = data.length;

            if (conlistcnt == "0") {

            }
            else {
                $scope.mongodbconnections = data;

            }
        }
        else if (data.errorresult) {
            //   alert(data.errorresult);
            fn_errorNotification("200", "", "", data.errorresult, "error_alert", "", "");
        }
    }).error(function (data) {
        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //End: Getting Created Mongo Connections List

    //Start: Open MongoDB Connection Creation Popup
    $scope.AddMongoConnection = function () {
        $("#myMongoModal").modal('show');
        mongoclear();
        $scope.hideConnIdMongoDBEdit = "save";
    };
    //End: Open MongoDB Connection Creation Popup

    $scope.go = function (path) {
        $location.path(path);
    };

    //Start: Save MongoDB Connection
    $scope.saveMongoDBConn = function () {

        var Connobj = new Array();
        var ConnectionType = $scope.mongodb_ConnectionType;
        var ConnectionName = $scope.mongodb_ConnectionName;
        var ServerName = $scope.mongodb_ServerName;
        var PortNumber = $scope.mongodb_PortNumber;
        var DBName = $scope.mongodb_DatabaseName;
        if (DBName == "") {
            DBName = "";
        }
        var operation = $scope.hideConnIdMongoDBEdit;

        Connobj.push({
            // "ConType": ConnectionType,
            "connectiontype": ConnectionType,
            // "ConName": ConnectionName,
            "connectionname": ConnectionName,
            //  "ServerName": ServerName,
            // "PortNumber": PortNumber,
            //   "DBName": DBName,
            "servername": ServerName,
            "portnumber": PortNumber,
            "databasename": DBName,
            "operation": operation
        });

        var Save_Conndata = JSON.stringify(Connobj);


        try {
            MongoDBFactory.saveConn(Save_Conndata).success(function (data) {

                if (data.responsedata) {
                    if (data.responsedata == "duplicate") {
                        //  alert("Connection Name Already Exists...!");

                        fn_errorNotification("200", "", "", "Connection Name Already Exists...!", "error_alert", "", "");
                    }
                    else if (data.responsedata.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        $scope.mongodbconnections = data.responsedata;
                        var element = angular.element('#myMongoModal');
                        element.modal('hide');
                        mongoclear();
                        $scope.hideConnIdMongoDBEdit = "save";
                        $scope.mongocoll = null;
                        if (data.operation === "save") {
                            fn_SuccessNotification("Saved Successfully...!!", "success_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification("updated Successfully...!!", "success_alert", "", "");
                        }
                    }

                }
                else if (data.errorresult) {
                    //alert(data.errorresult);
                    fn_errorNotification("200", "", "", data.errorresult, "error_alert", "", "");

                }
            }).error(function (data) {
                //    alert(data);
                fn_errorNotification("200", "", "", data, "error_alert", "", "");

            });
        }
        catch (e) {
            // alert(e);
            fn_errorNotification("200", "", "", e, "error_alert", "", "");

        }
    };
    //End: Save MongoDB Connection

    //Start: Update MongoDB Connection
    $scope.editMongoConn = function (e) {

        if ($scope.some) {

            $scope.some.selected = 'tile';
        }
        this.selected = 'tileselected';

        $scope.lastSelected = this;

        $scope.some = $scope.lastSelected;
        var editConnId = e;
        try {
            MongoDBFactory.editMongoCon(editConnId).success(function (data) {
                if (data == "Fail") {
                    //alert("Instance related Error Occured Check the Credentials...");
                    fn_errorNotification("200", "", "", "Instance related Error Occured Check the Credentials...", "error_alert", "", "");

                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else {
                    var element = angular.element('#myMongoModal');
                    element.modal('show');

                    $scope.hideConnIdMongoDBEdit = data[0].id;
                    $scope.mongodb_ConnectionName = data[0].connectionname;
                    $scope.mongodb_ConnectionType = data[0].connectiontype;
                    $scope.mongodb_ServerName = data[0].servername;
                    $scope.mongodb_PortNumber = parseInt(data[0].portnumber);
                    $scope.mongodb_DatabaseName = data[0].databasename;
                    // element.modal('show');
                    //("#Conection_txt").attr("disabled", true)
                    // elementt.attr("disabled", true)
                }
            }).error(function (data) {
                //alert(data);
                fn_errorNotification("200", "", "", data, "error_alert", "", "");

            });
        }
        catch (e) {
            //  alert(e);
            fn_errorNotification("200", "", "", e, "error_alert", "", "");

        }
    };
    //End: Update MongoDB Connection

    //Start: Remove Selected Mongo Connection from the list    
    $scope.removeItem = function (index, item) {
        // var test = fn_SuccessNotification("Are you sure want to Delete it?", "error_alert", "", "");

        // var test = confirm("Are you sure want to Delete it?");
        bootbox.confirm({
            message: "Are u sure,Do u Whant to delete Connection?",
            buttons: {

                cancel: {
                    label: 'No',
                    className: 'btn-default btn-round'
                },
                confirm: {
                    label: 'Yes',
                    className: 'btn-success btn-round'
                },
            },
            callback: function (result) {
                if (result === true) {
                    var selcteditem = item;

                    try {
                        MongoDBFactory.removeConn(selcteditem).success(function (data) {

                            if (data == "Fail") {
                                // alert("Instance related Error Occured...");
                                fn_errorNotification("200", "", "", "Instance related Error Occured...", "error_alert", "", "");
                            }
                            else if (data == "error") {
                                // alert("No Collections deleted please try again...");
                                fn_errorNotification("200", "", "", "No Collections deleted please try again...", "error_alert", "", "");

                            }
                            else if (data.isauthenticated == false) {

                                fn_session_expired_client();
                            }
                            else {
                                $scope.mongodbconnections.splice(index, 1);
                                $scope.mongocoll = null;
                                fn_SuccessNotification("deleted Successfully...!!", "success_alert", "", "");
                            }
                        }).error(function (data) {
                            //   alert(data);
                            fn_errorNotification("200", "", "", data, "error_alert", "", "");
                        });
                    }
                    catch (e) {
                        // alert(e);
                        fn_errorNotification("200", "", "", e, "error_alert", "", "");
                    }
                }
                else {
                    bootbox.hideAll()
                }

            }
        });
        // if (test ==true) { alert("hi")}


        //if (test) {
        //    var selcteditem = item;

        //    try {
        //        MongoDBFactory.removeConn(selcteditem).success(function (data) {
        //            if (data == "Fail") {
        //                alert("Instance related Error Occured...");
        //            }
        //            else if (data == "error") {
        //                alert("No Collections deleted please try again...");
        //            }
        //            else {
        //                $scope.mongodbconnections.splice(index, 1);
        //                $scope.mongocoll = null;
        //            }
        //        }).error(function (data) {
        //            alert(data);
        //        });
        //    }
        //    catch (e) {
        //        alert(e);
        //    }
        //}
        //else {
        //    return false;
        //}
    };
    //End: Remove Selected Mongo Connection from the list

    //Start: Getting Collections List for selected MongoDB Connection
    $scope.SelectedMongoConn = function (ConnId) {
        //   alert(JSON.stringify( $scope.lastSelected));
        // alert(this.connectionname.Id);
        if ($scope.some) {

            $scope.some.selected = 'tile';
        }
        this.selected = 'tileselected';

        $scope.lastSelected = this;

        $scope.some = $scope.lastSelected;


        $scope.hideConnIdforcoll = ConnId;
        var selctConnId = ConnId;
        if (selctConnId) {
        }
        try {
            MongoDBFactory.getAvailCollections(selctConnId).success(function (data) {
                if (data.errorresult) {
                    // alert(data.errorresult);
                    fn_errorNotification("200", "", "", data.errorresult, "error_alert", "", "");
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else {
                    $scope.mongocoll = data.jsonsplist;

                }
            }).error(function (data) {
                // alert(data);
                fn_errorNotification("200", "", "", data, "error_alert", "", "");
            });
        }
        catch (e) {
            //  alert(e);
            fn_errorNotification("200", "", "", "Connection Name Already Exists...!", "error_alert", "", "");

        }
    };
    //End: Getting Collections List for selected MongoDB Connection

    //Start: Getting Selected Collection Details    
    $scope.getCollectiondtails = function (spname) {


        //    if ($scope.lastSelected) {
        //        $scope.lastSelected.selected1 = 'tile1';
        //    }
        //    this.selected1 = 'tileselected1';
        //$scope.lastSelected = this;
        if ($scope.some1) {

            $scope.some1.selected1 = 'tile1';
        }
        this.selected1 = 'tileselected1';

        $scope.lastSelected1 = this;

        $scope.some1 = $scope.lastSelected1;


        var storepdname = spname;
        var selcSPId = $scope.hideConnIdforcoll;
        $scope.hiddenCollName = spname;
        var slcSPobj = new Array();
        slcSPobj.push({
            "StorePDname": storepdname,
            "SelcSPId": selcSPId
        });
        var getSPdtails = JSON.stringify(slcSPobj);
        try {
            MongoDBFactory.get_Colldtails(getSPdtails).success(function (data) {
                if (data.data) {
                    $scope.modal.status = false;
                    $scope.modal.paramconfigstatus = true;
                    //$scope.parameters = JSON.parse(data.data);
                    $scope.parameters = data.data;
                    var element = angular.element('#myModalforcolldtails');
                    element.modal('show');
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (data.errorresult) {
                    // alert(data.errorresult);
                    fn_errorNotification("200", "", "", data.errorresult, "error_alert", "", "");

                }
            }).error(function (data) {
                //alert(data);
                fn_errorNotification("200", "", "", data, "error_alert", "", "");
            });
        }
        catch (e) {
            //alert(e);
            fn_errorNotification("200", "", "", e, "error_alert", "", "");


        }
    };
    //End: Getting Selected Collection Details

    //Start: Close Mongo DB Creation Popup
    $scope.closeMongoDBconn = function () {
        var element = angular.element('#myMongoModal');
        element.modal('hide');
    };
    //End: Close Mongo DB Creation Popup

    //Start: Clear Mongo DB Creation Popup
    function mongoclear() {
        $scope.mongodb_ConnectionName = "";
        $scope.mongodb_ServerName = "";
        $scope.mongodb_PortNumber = "";
        $scope.mongodb_DatabaseName = "";
        $("#myMongoModal").on('hidden', function () {
            $('#myMongoModal').removeData('bs.modal');
            $('#myMongoModal').removeClass('modal-open');
        });
    };

    $scope.mongoclearmodal = function () {
        $scope.mongodb_ServerName = "";
        $scope.mongodb_PortNumber = "";
        $scope.mongodb_DatabaseName = "";
        $scope.hideConnIdMongoDBEdit = "save";
    };
    //End: Clear Mongo DB Creation Popup    
});
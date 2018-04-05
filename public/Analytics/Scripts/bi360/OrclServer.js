//All Ajax Calls
RapidApp.factory('orclDBFactory', function ($http) {
    return {
       //Get Connections Name From Database
        getconnlist: function () {
            return $http.get('/OrclConnection/GetorclConnList');
        },
       
        //Get StoredProcedure List using Orcl Conn details
        getSP1: function (Conndataforsp) {
            return $http.post('/OrclConnection/GetorclspList', { Conndata: Conndataforsp });
        },
        // Save Oracle Connection Details
        saveConn: function (Save_Conn) {
            return $http.post('/OrclConnection/Saveorcl_Connection', { Save_Conndata: Save_Conn });
        },
        //Edit Connection details
        editorclCon: function (Edit_Conn) {
            return $http.post('/OrclConnection/EditOrcl_Connection', { Edit_Conn: Edit_Conn });
        },
        //Remove Connection Name from db
        removeConn: function (selcteditem) {
            return $http.post('/OrclConnection/RemoveOrcl_Connection', { remove_ConndataId: selcteditem });
        },
        SPorcl_CreateQuery: function (SPobjcreate_query) {
            return $http.post('/OrclConnection/SPorclobjCreate_Query', { SPobjCreate_Query: SPobjcreate_query });
        },
        //Get storedprocedure Data or Parametrs from orcle db
        get_SPdtails: function (Get_SPdtails) {
            return $http.post('/OrclConnection/GET_SPdtails', { GET_SPdtail: Get_SPdtails });
        },
        //Get Data using parameters from oracle db
        get_SPparamdata: function (Get_SPdata) {
            return $http.post('/OrclConnection/GET_SPparamdata', { Get_SPData: Get_SPdata });
        },
        //Testing oracle connection
        TestConnection: function (Conndataforsp) {
            return $http.post('/OrclConnection/OrclTestConnection', { Conndata: Conndataforsp });
        },
        //Save oracle stored procedures name 
        orclsaveSPConn: function (Save_SPConn) {
            return $http.post('/OrclConnection/Saveorcl_SPConnection', { Save_ConnSPdata: Save_SPConn });
        },
        //display available stored procedures
        getAvailSP: function (selctConnId) {
            return $http.post('/OrclConnection/GetorclAvailSP', { selectedConnId: selctConnId });
        },
        //Get stored procedure query to Edit
        SP_orclEdit: function (SPdataedit) {
            return $http.post('/OrclConnection/Get_SPforEdit', { GetSPforedit: SPdataedit });
        },
        //Save Edit stored procedure query
        SP_EditQuery: function (SPedit_query) {
            return $http.post('/OrclConnection/SPobjEdit_Query', { SPobjEdit_Query: SPedit_query });
        },
        //Delete oracle stored procedures name
        removeSPConn: function (Remove_SPdata) {
            return $http.post('/OrclConnection/Removeorcl_SPConnection', { Remove_ConnSPdata: Remove_SPdata });
        },
        //save stored procedure param values
        Save_Parameters: function (Get_SPdata) {
            return $http.post('/OrclConnection/Save_Params', { Get_SPData: Get_SPdata });
        }
    };
});


RapidApp.controller('Getorcldbconnections', function ($scope, $location, orclDBFactory) {

    //default page load operation  


    //Global variables declaration
    $scope.selected = 'tile';
    $scope.selected1 = 'tile1';
    $scope.orclconnections = [];
    $scope.parameters = [];
    $scope.modal = { status: true, status1: true, status2: true, status3: true }
    $scope.selection = [];
    $scope.splist = [];


    $("#AddButton").attr('disabled', true);

    ///...................................Oracle connection functions..................................///

    $scope.templatesettings = { HeaderTitle: "Oracle Server Database" };
    $scope.go = function (path) {
        $location.path(path);
    };
    //Get Connections Name From Database
    orclDBFactory.getconnlist().success(function (data) {
        if (data == "Fail") {
            alert("Error Occured Please Try Again....");
        }
        else {
            $scope.orclconnections = data;
        }
    })
       .error(function (data) {
           $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
           $scope.loading = false;
       });

    // Save Oracle Connection Details
    $scope.saveorclConn = function () {

        var test = $scope.testtosave;
        if (test !== "") {
            alert("Please Test the Connection Before Saving Connection");

        }
        else {
            var Connobj = new Array();
            var ConnectionType = $scope.orcl_ConnectionType;
            var ConnectionName = $scope.orcl_ConnectionName;
            var UserName = 'ASD';
            var ServerName = $scope.orcl_ServerName;
            var PortNumber = $scope.orcl_PortNumber;
            var User = $scope.orcl_UserId;
            var Password = $scope.orcl_Password;
            var DBName = $scope.orcl_DatabaseName;
            var connectas = $scope.orcl_connectas;
            var Service = $scope.orcl_Service;
            var operation = $scope.hideConnIdforEdit;
            Connobj.push({
                "ConType": ConnectionType,
                "ConName": ConnectionName,
                "UserName": UserName,
                "ServerName": ServerName,
                "PortNumber": PortNumber,
                "User": User,
                "Password": Password,
                "DBName": DBName,
                "connectas": connectas,
                "Service": Service,
                "operation": operation
            });
            var Save_Conndata = JSON.stringify(Connobj);

            try {
                orclDBFactory.saveConn(Save_Conndata).success(function (data) {
                    if (data.responsedata) {
                        $scope.orclconnections = JSON.parse(data.responsedata);
                        var element = angular.element('#myModal');
                        element.modal('hide');
                        clear();
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
        }
    }

    //display available stored procedures
    $scope.splistfunc = function (e, id) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        $scope.hideConnIdforSP = e;
        $scope.hideConnId = id;


        var selctConnId = id;
        if (selctConnId) {
            $("#AddButton").attr('disabled', false);
            $("#createstprcdure").attr('disabled', false);

        }
        try {
            orclDBFactory.getAvailSP(selctConnId).success(function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else if (data.jsonsplist) {
                    $scope.selection = JSON.parse(data.jsonsplist);
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };


    //.......save newly created sp....//
    $scope.SaveCreateorclSP = function () {
        var SPCreateQuery = $scope.SPOrclCreate;
        var ConnIdhidespedit = $scope.hideConnId;
        //alert(ConnIdhidespedit);
        var SPobjeditquery = new Array();
        SPobjeditquery.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "SPCreateQuery": SPCreateQuery
        });
        var SPobjcreate_query = JSON.stringify(SPobjeditquery);
        try {
            orclDBFactory.SPorcl_CreateQuery(SPobjcreate_query).success(function (data) {
                if (data.response) {
                    alert(data.response);
                    var element = angular.element('#myModalforSPstrdCreate');
                    element.modal('hide');
                    $scope.SPOrclCreate = "";
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
    //.......save newly created sp ended....//


    //Edit Connection details
    $scope.editOrclConn = function (e) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        var editConnId = e;
        try {
            orclDBFactory.editorclCon(editConnId).success(function (data) {
                if (data == "Fail") {
                    alert("Instance related Error Occured Check the Credentials...");
                }
                else {
                    var element = angular.element('#myModal');
                    element.modal('show');
                    $scope.hideConnIdforEdit = data[0].Id;
                    $scope.orcl_ConnectionName = data[0].ConnectionName;
                    $scope.orcl_ConnectionType = data[0].ConnectionType;
                    $scope.orcl_ServerName = data[0].ServerName;
                    $scope.orcl_PortNumber = data[0].PortNumber;
                    $scope.orcl_UserId = data[0].UserId;
                    $scope.orcl_Password = data[0].Password;
                    $scope.orcl_DatabaseName = data[0].DatabaseName;
                    $scope.orcl_connectas = data[0].ConnectAs;
                    $scope.orcl_Service = data[0].Service;
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };

    //Remove Connection Name from db
    $scope.removeItem = function (index, item) {
        var test = confirm("Are you sure want to Delete it?");
        if (test) {
            var selcteditem = item;
            try {
                orclDBFactory.removeConn(selcteditem).success(function (data) {
                    if (data == "Fail") {
                        alert("Instance related Error Occured...");
                    }
                    else if (data == "error") {
                        alert("No Stored Procedures deleted please try again...");
                    }
                    else {
                        alert("Successfully Deleted......");
                        $scope.orclconnections.splice(index, 1);
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
    };

    //Get storedprocedure Data or Parametrs from orcle db
    $scope.getSPdtails = function (spname) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected1 = 'tile1';
        }
        this.selected1 = 'tileselected1';
        $scope.lastSelected = this;
        $scope.hiddenSPName = spname;
        var storepdname = spname;
        var selcSPId = $scope.hideConnId;
        var slcSPobj = new Array();
        slcSPobj.push({
            "StorePDname": storepdname,
            "SelcSPId": selcSPId
        });
        var getSPdtails = JSON.stringify(slcSPobj);
        try {
            orclDBFactory.get_SPdtails(getSPdtails).success(function (data) {

                if (data.responsedata) {
                    $scope.modal.status = true;
                    $scope.parameters = JSON.parse(data.responsedata).NewDataSet["Table"];
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                }
                else if (data.data) {
                    $scope.modal.status = false;
                    $scope.parameters = JSON.parse(data.data).NewDataSet["Table"];
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');


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

    //Get Data using parameters from oracle db
    $scope.Getspdata = function () {
        var selcConSPId = $scope.hideConnIdforSP;
        var selcSPName = $scope.hiddenSPName;

        //var SPparams = angular.toJson( $scope.parameters.splice(1));

        var SPparams = angular.toJson($scope.parameters);
        var slcSPparam = new Array();
        slcSPparam.push({
            "selcConSPId": selcConSPId,
            "selcSPName": selcSPName,
            "SPparams": SPparams
        });
        var selcSPparam = JSON.stringify(slcSPparam);
        try {
            orclDBFactory.get_SPparamdata(selcSPparam).success(function (data) {

                if (data.jsontbldata) {
                    $scope.modal.status = true;
                    $scope.parameters = JSON.parse(data.jsontbldata).NewDataSet["Table"];
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                    $scope.modal.status = false;
                    var element = angular.element('#myModalforspdtails');
                    element.modal('show');
                    $scope.parameters = JSON.parse(data.responsedata).NewDataSet["Table"];
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

    //Testing oracle connection
    $scope.TestCon = function () {
        $scope.testtosave = "";
        var objfordblist = new Array();
        var ConnectionType = $scope.orcl_ConnectionType;
        var ConnectionName = $scope.orcl_ConnectionName;
        var UserName = 'ASD';
        var ServerName = $scope.orcl_ServerName;
        var PortNumber = $scope.orcl_PortNumber;
        var User = $scope.orcl_UserId;
        var Password = $scope.orcl_Password;
        var DBName = $scope.orcl_DatabaseName;
        var connectas = $scope.orcl_connectas;
        var Service = $scope.orcl_Service;

        objfordblist.push({
            "ConType": ConnectionType,
            "ConName": ConnectionName,
            "UserName": UserName,
            "ServerName": ServerName,
            "PortNumber": PortNumber,
            "User": User,
            "Password": Password,
            "DBName": DBName,
            "connectas": connectas,
            "Service": Service

        });
        var Conndata = JSON.stringify(objfordblist);
        try {
            orclDBFactory.TestConnection(Conndata).success(function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                    //clear();
                }

                else {
                    alert("Successfully Connected");
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };

    //Get StoredProcedure List using Orcl Conn details
    $scope.AddSP = function () {

        var Conndata = $scope.hideConnId;

        try {
            orclDBFactory.getSP1(Conndata).success(function (data) {

                if (data.conSPList) {
                    var element = angular.element('#myModalforSP');
                    element.modal('show');
                    $scope.splist = JSON.parse(data.conSPList);
                    for (var i = 0; i < $scope.splist.length; i++) {
                        var key = $scope.splist[i].name;
                        for (var j = 0; j < $scope.selection.length; j++) {
                            if (key == $scope.selection[j].name) {
                                $scope.splist[i]._checked = true;
                            }
                        }
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
    //show storedprocedure popup
    $('#myModalforSP').on('show.bs.modal', function () {
        $('.modal .modal-body').css('overflow-y', 'auto');
        $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
    });
    //close parameters popup
    $scope.configuparam = function () {
        $scope.go = function (path) {
            $location.path(path);
        };
        var element = angular.element('#myModalforspdtails');
        element.modal('hide');
        $('.modal-backdrop').remove();
    };
    //Get storedprocedure Data or Parametrs from orcle db
    $scope.toggleSelection = function toggleSelection(checkedname) {
        checkedname._checked = !checkedname._checked;
        if (checkedname._checked) {
            $scope.hiddenSPName = checkedname.name;
            var selectedsp = checkedname.name;
            var ConnIdhide = $scope.hideConnId;
            var SPNewparams = angular.toJson($scope.parameters);
            $scope.selection.push(checkedname);
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnIdhide": ConnIdhide,
                "SelectedSPS": selectedsp
            });
            var Save_SPdata = JSON.stringify(ConnSPobj);
            try {
                orclDBFactory.orclsaveSPConn(Save_SPdata).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.responsedata) {
                        if ($scope.lastSelected) {
                            $scope.lastSelected.selected = 'tile';
                        }
                        this.selected = 'tileselected';
                        $scope.lastSelected = this;
                        var storepdname = checkedname.name;
                        var selcSPId = $scope.hideConnId;
                        var slcSPobj = new Array();
                        slcSPobj.push({
                            "StorePDname": storepdname,
                            "SelcSPId": selcSPId
                        });
                        var getSPdtails = JSON.stringify(slcSPobj);
                        orclDBFactory.get_SPdtails(getSPdtails).success(function (data) {

                            if (data.responsedata) {

                                var element = angular.element('#myModalforSP');
                                element.modal('hide');
                                $scope.modal.status1 = true;
                                $scope.modal.status2 = false;
                                $scope.modal.status3 = false;
                                var element = angular.element('#myModalforsnewpdtails');
                                element.modal('show');
                                $scope.parameters = JSON.parse(data.responsedata).NewDataSet["Table"];

                            }
                            else if (data.data) {


                                $scope.modal.status1 = false;
                                $scope.modal.status2 = false;
                                $scope.modal.status3 = true;
                                $scope.parameters = JSON.parse(data.data).NewDataSet["Table"];
                                var element = angular.element('#myModalforsnewpdtails');
                                element.modal('show');


                            }
                            else if (data.errorresult) {
                                alert(data.errorresult);
                            }
                        }).error(function (data) {
                            alert(data);
                        });
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
            //Delete oracle stored procedures name
            var idx = $scope.selection.indexOf(checkedname.name);
            $scope.selection.splice(idx, 1);
            var selectedsp = checkedname.name;
            var ConnIdhide = $scope.hideConnId;
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnIdhide": ConnIdhide,
                "SelectedSPS": selectedsp
            });
            var Remove_SPdata = JSON.stringify(ConnSPobj);
            try {
                orclDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.responsedata) {
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
    //save stored procedure param values
    $scope.SaveParams = function () {
        var selcConSPId = $scope.hideConnId;
        var SPparams = angular.toJson($scope.parameters);
        var selcSPName = $scope.hiddenSPName;
        var slcSPparam = new Array();
        slcSPparam.push({
            "selcConSPId": selcConSPId,
            "selcSPName": selcSPName,
            "SPparams": SPparams
        });
        var selcSPparam = JSON.stringify(slcSPparam);
        try {
            orclDBFactory.Save_Parameters(selcSPparam).success(function (data) {

                if (data.jsontbldata) {
                    $scope.modal.status1 = true;
                    $scope.modal.status2 = false;
                    $scope.modal.status3 = true;
                    $scope.parameterstd = JSON.parse(data.jsontbldata).NewDataSet["Table"];

                }
                else if (data.error) {
                    alert(data.error);
                }
                else if (data.errorresult) {
                    if (data.errorresult == "An error occurred while updating the entries. See the inner exception for details.") {
                        alert("VariableNames Should not be Same!! Please Enter Different VariableName");
                    }
                    //else if (data.errorresult == "Object reference not set to an instance of an object.") {
                    //    alert("VariableNames and Values Fields should not be Empty!! Please Enter All Details");
                    //}
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
    //hide parameter popup
    $scope.orclfinish = function () {

        var element = angular.element('#myModalforSP');
        element.modal('hide');

    };
    //Get stored procedure query to Edit
    $scope.editorclSP = function (spitemname) {
        var element = angular.element('#myModalfororclSPEdit');
        element.modal('show');
        $scope.hiddenSPName = spitemname;
        var ConnIdhidespedit = $scope.hideConnId;
        var editspitemname = spitemname;
        var SPobjedit = new Array();
        SPobjedit.push({
            "ConnIdhidespedit": ConnIdhidespedit,

            "Editspitem": editspitemname
        });
        var SPobj_edit = JSON.stringify(SPobjedit);
        try {
            orclDBFactory.SP_orclEdit(SPobj_edit).success(function (data) {
                if (data.queryresponse) {
                    var query = data.queryresponse;
                    var alterspquery = query.replace("CREATE", "Alter");
                    $scope.SPEdit = alterspquery;
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
    //Save Edit stored procedure query
    $scope.SaveOrclSP = function () {
        var selcSPName = $scope.hiddenSPName;
        var SPEditQuery = $scope.SPEdit;
        var ConnIdhidespedit = $scope.hideConnId;
        var SPobjeditquery = new Array();
        SPobjeditquery.push({
            "ConnIdhidespedit": ConnIdhidespedit,
            "SPEditQuery": SPEditQuery,
            "selcSPName": selcSPName
        });
        var SPobjedit_query = JSON.stringify(SPobjeditquery);
        try {
            orclDBFactory.SP_EditQuery(SPobjedit_query).success(function (data) {
                if (data.response) {
                    alert(data.response);
                    var element = angular.element('#myModalfororclSPEdit');
                    element.modal('hide');
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
    //Delete oracle stored procedures name
    $scope.removeSP = function (index, spitem) {
        var test = confirm("Are you sure want to Delete it?");
        if (test) {
            $scope.selection.splice(index, 1);
            var selectedsps = spitem;
            var ConnIdhide = $scope.hideConnId;
            var ConnSPobj = new Array();
            ConnSPobj.push({
                "ConnIdhide": ConnIdhide,
                "SelectedSPS": selectedsps
            });
            var Remove_SPdata = JSON.stringify(ConnSPobj);
            try {
                orclDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.responsedata) {
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
        else {
            return false;
        }
    };

    $scope.closechkevent = function () {
        //
        var element = angular.element('#myModalforsnewpdtails');
        element.modal('hide');
        var chkspname = $scope.hiddenSPName;
        var chkcnnidname = $scope.hideConnId;
        var ConnSPobj = new Array();
        ConnSPobj.push({
            "ConnIdhide": chkcnnidname,
            "SelectedSPS": chkspname
        });
        var Remove_SPdata = JSON.stringify(ConnSPobj);
        try {
            orclDBFactory.removeSPConn(Remove_SPdata).success(function (data) {
                if (data.errorresult) {
                    alert(data.errorresult);
                }
                else if (data.responsedata) {
                    var idx = $scope.selection.indexOf(chkspname);
                    $scope.selection.splice(idx, 1);
                    try {
                        orclDBFactory.getSP1(chkcnnidname).success(function (data) {
                            if (data.conSPList) {
                                var element = angular.element('#myModalforSP');
                                element.modal('show');
                                $scope.splist = JSON.parse(data.conSPList);
                                for (var i = 0; i < $scope.splist.length; i++) {
                                    var key = $scope.splist[i].name;
                                    for (var j = 0; j < $scope.selection.length; j++) {
                                        if (key == $scope.selection[j].name) {
                                            $scope.splist[i]._checked = true;
                                        }
                                    }
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
    };
    //Clear values of inputs
    function clear() {
        $scope.orcl_connectas = "";
        $scope.orcl_Service = "";
        //$scope.orcl_ConnectionType = "";
        $scope.orcl_ConnectionName = "";
        $scope.orcl_ServerName = "";
        $scope.orcl_PortNumber = "";
        $scope.orcl_UserId = "";
        $scope.orcl_Password = "";
        $scope.orcl_DatabaseName = "";
        $scope.hideConnIdforEdit = "";
        $scope.hideConnIdforSP = "";
    }
    //clear values for new connection
    function clearNewConnection() {
        $scope.orcl_connectas = "";
        $scope.orcl_Service = "";
        //$scope.orcl_ConnectionType = "";
        $scope.orcl_ConnectionName = "";
        $scope.orcl_ServerName = "";
        $scope.orcl_PortNumber = "";
        $scope.orcl_UserId = "";
        $scope.orcl_Password = "";
        $scope.orcl_DatabaseName = "";
        $scope.hideConnIdforEdit = "";
        //$scope.hideConnIdforSP = "";
    }
});
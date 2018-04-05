
RapidApp.factory('WebServiceFactory', function ($http) {
    return {
        GetConnList: function () {
            return $http.get('../TestService/GetWebSeriviseConnList');
        },
        getConnectionIdData: function (ConnId) {
            return $http.post('../RestConsole/GetConnData', { ConnectionId: ConnId });
        },
        SaveWebService: function (totalresult) {
            return $http.post('../TestService/SaveWebSerivise', { routinedata: totalresult });
        },
        GetDetails: function (totaldetail) {

            return $http.post('../TestService/GetdataForServiceUrl', { TotalconData: totaldetail });
        },
        ConnTable: function (connid) {

            return $http.post('../TestService/ConnTable', { connId: connid });
        },
        removeconnection: function (selectedConn) {
            return $http.post('../TestService/RemoveConnection', { SelectConnection: selectedConn });
        }
    };
});
RapidApp.controller('GetWebServiceConnections', function ($scope, WebServiceFactory) {

    ///////////
    $scope.selected = 'tile';
    $scope.isDisabled = true;

    ///////////////


    var oriPerson = angular.copy($scope.person);





    WebServiceFactory.GetConnList().success(function (data) {
        if (data == "Fail") {
            alert("Error Occured");
        } else {
            $scope.WebServiceslist = data;
        }
    });

    $scope.form = [];
    //var show = false;
    $scope.form.push({ key: '', value: '' });
    $scope.addFields = function () {
        //show = true;
        $scope.form.push({ key: '', value: '' });
        Parm.Show = false;
        //$scope.showButton = function () {
        //    return show;
        //}
        //return show;
    }
    $scope.Save = function (form) {
        var paramsdata = $scope.form;
        var selectedlist = new Array();
        var ConnType = $scope.ConnType;
        var ConnName = $scope.ConnName;
        var ServiseUrl = $scope.ServiseUrl;
        var Method = $scope.Method;
        var Type = $scope.Type;
        var HiddenConnId = $scope.hiddenConnId;

        selectedlist.push({
            "ConnType": ConnType,
            "ConnName": ConnName,
            "ServiseUrl": ServiseUrl,
            "Method": Method,
            "Type": Type,
            "paramsdata": paramsdata,
            "HiddenConnId": HiddenConnId
        });

        var req = angular.toJson(selectedlist);
        var totalresult = req;
        WebServiceFactory.SaveWebService(totalresult).success(function (data) {
            //alert(data);
            if (data.errorresult) {
                alert(data.errorresult);

            } else if (data.responsedata) {
                //alert(data.responsedata);
                alert("Saved Successfully...");
                var resuldata = JSON.parse(data.responsedata);
                $scope.WebServiceslist = resuldata;
                var element = angular.element('#myModal');
                element.modal('hide');
                clearall();
            }
        }).error(function (data) {
            alert(data);
        });
    };
    //get saved xml configurations to edit
    $scope.setSelectedWebService = function (ConnId) {
      
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        $("#restconsoleframe").attr("src", "/RestConsole/RestConsole?ConnId=" + ConnId + "");
        //try {
          
        //    $.ajax({
        //        url: "../../RestConsole/GetConnData",
        //        type: "POST",
        //        data: { ConnectionId: ConnId },
        //        async: false,
        //        success: function (data) {
        //            if (data == "Empty") {
        //                alert("Error Occured");
        //            }
        //            else if (data == "" || data == null) {
        //                alert("No data");
        //            }
        //            else {
                        
        //                var element = angular.element('#Restmodel');
        //                element.modal('show');
        //            }
        //        },
        //        error: function (xhr, ajaxOptions, thrownError) {
        //            alert("Ajax error");
        //        }
        //    });
        //}
        //catch (er) {
        //    alert("The Error is:" + er);
        //}
        var element = angular.element('#Restmodel');
                        element.modal('show');
    }
    $scope.removeConnectio = function (index, id) {
        var selectedConn = id;

        try {
            var deleteid = confirm("Do you want Delete This Connection");
            if (deleteid == true) {
                WebServiceFactory.removeconnection(selectedConn).success(function (data) {
                    if (data == "Fail") {
                        alert("Error Occured");
                    }
                    else if (data == "" || data == null) {
                        alert("No data");
                    } else {
                        alert("Deleted Successfully..");
                        $scope.WebServiceslist.splice(index, 1);
                    }
                });
            }
        }
        catch (e) {
            alert("Error is:" + e);
        }
    }
    $scope.RemoveParm = function (i) {
        if (i == 0) {
            return false;
        } else {
            var removeparm = confirm("Do you want to Remove Parameter?");
            if (removeparm == true) {
                $scope.form.splice(i, 1);
            }
        }
    };
    $scope.testserviceConnection = function () {
        try {
            var condetails = new Array();
            var ConnName = $scope.ConnName;
            var url = $scope.ServiseUrl;
            var Method = $scope.Method;
            var Type = $scope.Type;
            var parameter = $scope.form;
            condetails.push({
                "ConnName": ConnName,
                "url": url,
                "Method": Method,
                "Type": Type,
                "parameter": parameter
            });
            //alert(url);


            var totaldetail = angular.toJson(condetails);

            WebServiceFactory.GetDetails(totaldetail).success(function (data) {
                // alert(data);
                var response = data.split('$');
                // alert(response[0]);               
                if (response[0] == "Error") {
                    var element = angular.element('#myModal');
                    element.modal('hide');
                    alert(response[1]);
                } else {
                    $scope.isDisabled = false;
                    alert("Connection Established");
                }
            });
        }
        catch (e) {
            alert("The Error is:" + e);
        }
    }


    $scope.WebServiceData = function (index, id) {
        var connid = id;
        try {
            WebServiceFactory.ConnTable(connid).success(function (data) {
                if (data == "Fail") {
                    alert(data);
                } else {
                    $("#servicedata").empty();
                    $("#servicedata").append(data);
                    $('#JsonTable').dataTable();
                    //$('.table').dataTable({
                    //    paging: true,
                    //    pageSize: 10,
                    //    sorting: true
                    //});

                }
            });
        }
        catch (e) {
            alert("the error is:" + e);
        }
    }

    function clearall() {
        $scope.ConnName = "";
        $scope.ServiseUrl = "";
        $scope.Method = "";
        $scope.Type = "";
        $scope.form.cont[0].key = "";
        $scope.form.cont[0].value = "";

        $scope.hiddenConnId = "Save";
    }


    $scope.ClearModel = function () {
       WebServiceFactory.GetConnList().success(function (data) {
        if (data == "Fail") {
            alert("Error Occured");
        } else {
            $scope.WebServiceslist = data;
        }
    });

    }
   

});//Controller Closing



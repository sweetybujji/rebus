RapidApp.factory('Soapservicefactory', function ($http) {
    return {
        GetConnList: function () {
            return $http.get('../TestService/GetSoapSeriviseConnList');
        },
        removeconnection: function (selectedConn) {
            return $http.post('../TestService/RemoveSoapConnection', { SelectConnection: selectedConn });
        }
    };
});
RapidApp.controller('GetSoapServiceConnections', function ($scope, Soapservicefactory) {
    $scope.templatesettings = { HeaderTitle: "Soap Service" };
    $scope.selected = 'tile';
    $scope.isDisabled = true;
    Soapservicefactory.GetConnList().success(function (data) {
        if (data == "Fail") {
            alert("Error Occured");
        } else {
            $scope.Soapserviceslist = data;
        }
    });
    $scope.setSelectedSoapService = function (ConnId) {

        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        $("#soapeditconsoleframe").attr("src", "/EditConfig/Index?ConnId=" + ConnId + "");
        var element = angular.element('#soapedit');
        element.modal('show');
    }
    $scope.NewSopaService = function () {
        var element = angular.element('#Restmodel');
        element.modal('show');
        //var element = angular.element('#soapedit');
        //element.modal('hide');      
    }
    
    $scope.removeConnectio = function (index, id) {
        var selectedConn = id;

        try {
            var deleteid = confirm("Do you want Delete This Connection");
            if (deleteid == true) {
                Soapservicefactory.removeconnection(selectedConn).success(function (data) {
                    if (data == "Fail") {
                        alert("Error Occured");
                    }
                    else if (data == "" || data == null) {
                        alert("No data");
                    } else {                      
                        $scope.Soapserviceslist.splice(index, 1);
                    }
                });
            }
        }
        catch (e) {
            alert("Error is:" + e);
        }
    }
    $scope.closeeditmodel = function(){
         var element = angular.element('#soapedit');
         element.modal('hide');
         //$("#frameId").contents().find("div#SomeDIVinsideFrame").remove();
    }
    
});
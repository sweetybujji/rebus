

RapidApp.factory('DesignValueFactory', function ($http) {
    return {
        //getLocationNames: function () {
        //    return $http.get('../../Location/getLocationNames');
        //},
        getLocationData: function () {
            return $http.get('/getDesignValuesData');
        },
        //getLocationListPopup: function () {
        //    return $http.get('../../Location/getLocationListPopup');
        //},
        addLocation: function (Save_Locdata) {
            return $http.post('/SaveDesignValuesData', { Save_Locdata: Save_Locdata });
        },
        Locupdatedata: function (locdata) {
            return $http.post('/DesignValuesupdatedata', { locdata: locdata });
        },
        deletelocdata: function (ParameterId) {
            return $http.post('/DeleteDesignValues', { ParameterId: ParameterId });
        }
    };
});

RapidApp.controller('DesignValueController', function PostsController($scope, DesignValueFactory) {
    $scope.DesignData = [];
    $scope.LocationPopupData = []; $scope.LocationNames = [];
    $scope.loading = true;
    $scope.addMode = false;

    //$scope.clearvalues();

    $scope.toggleEdit = function () {
        this.params.editMode = !this.params.editMode;
    };
    $scope.toggleAddLoc = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();

    };

    $("#txt_locid").val("");
    $("#txt_locname").val("");
    //$("#txt_locparentid").val("");
    //$("#txt_locdesc").val("");

    $scope.clearvalues = function () {
        $("#txt_locid").val("");
        $("#txt_locname").val("");
        //$("#txt_locparentid").val("");
        //$("#txt_locdesc").val("");
    }
    //check active value
    //$("#chk_active").click(function () {
    //    if ($("#chk_active").is(':checked'))
    //        $("#chk_active").val("True");
    //    else
    //        $("#chk_active").val("False");
    //});

    $('.errmsg').delay(10000).fadeOut('slow');

    //get all OPCNames
    //OPCFactory.getLocationNames().success(function (data) {

    //    $scope.OPCNames1 = data;
    //    $scope.LocationNames = [];
    //    for (var i = 0; i < (data).length; i++) {
    //        $scope.LocationNames.push((data)[i].DataSource);
    //    }
    //    $scope.loading = false;
    //})
    //.error(function (data) {
    //    $scope.error = "An Error has occured while loading OPCNames! ";
    //    $scope.loading = false;
    //});

    //get all OPCData
    DesignValueFactory.getLocationData().success(function (data) {
        $scope.DesignData = data;
        $scope.loading = false;
    })
    .error(function (data) {
        $scope.error = "An Error has occured while loading OPCData! ";
        $scope.loading = false;
    });
    //add customer
    $scope.AddLocation = function () {
        $scope.loading = true;
        var Locdataobj = new Array();
        var ParameterId = $("#txt_locid").val();
        var ParameterName = $("#txt_locname").val();
        //var ParentLocationName = $("#txt_locparentname").val();
        //var ParentLocationId = $("#txt_locparentid").val();
        //var Description = $("#txt_locdesc").val();
        if (ParameterId == "") {
            $scope.error = "Please Enter Location Id";
        } else if (ParameterName == "") {
            $scope.error = "Please Enter Location Name ";
        }
            //else if (ParentLocationName == "") {
            //    $scope.error = "Please Enter Parent Location Name";
            //}
        else {
            //if (ParentLocationId == "") {
            //    ParentLocationId = 0;
            //}
            Locdataobj.push({
                "ParameterId": ParameterId,
                "ParameterName": ParameterName,
                //"Description": Description,
                //"ParentLocationId": ParentLocationId
                //"ParentLocationName": ParentLocationName
            });
            var Save_Locdata = JSON.stringify(Locdataobj);
            DesignValueFactory.addLocation(Save_Locdata).success(function (data) {
                $scope.error = data;
                $scope.addMode = false;
                $scope.loading = false;
                DesignValueFactory.getLocationData().success(function (data) {
                    $scope.DesignData = data;
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.error = "An Error has occured while loading OPCData! ";
                    $scope.loading = false;
                });
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding OPC Data! " + data;
                $scope.loading = false;
            });
        }
    };
    //update customer
    $scope.update = function (params) {
        $scope.loading = true;
        var Locdataobj = new Array();
        var ParameterId = params.ParameterId;
        var ParameterName = params.ParameterName;
        //var Description = loc.Description;
        //var ParentLocationId = loc.ParentLocationId;
        //var ParentLocationName = loc.ParentLocationName;
        if (ParameterId == "") {
            $scope.error = "Please Enter Location Id";
        } else if (ParameterName == "") {
            $scope.error = "Please Enter Location Name ";
        }
        else {
            //if (ParentLocationId == "") {
            //    ParentLocationId = 0;
            //}
            Locdataobj.push({
                "ParameterId": ParameterId,
                "ParameterName": ParameterName
                //"Description": Description,
                //"ParentLocationId": ParentLocationId,
                //"ParentLocationName": ParentLocationName
            });
            var locdata = JSON.stringify(Locdataobj);
            DesignValueFactory.Locupdatedata(locdata).success(function (data) {
                $scope.error = data;
                params.editMode = false;
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while Updating  OPC Data! " + data.ExceptionMessage;
                $scope.loading = false;
            });
        }
    };

    // delete Customer
    $scope.deletelocdata = function (params) {
        $scope.loading = true;
        var ParameterId = params.ParameterId;
        DesignValueFactory.deletelocdata((ParameterId)).success(function (data) {
            $scope.error = data
            $.each($scope.DesignData, function (i) {
                if ($scope.DesignData[i].ParameterId === ParameterId) {
                    $scope.DesignData.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting OPC Data! " + data.ExceptionMessage;
            $scope.loading = false;
        });
    };


    //$scope.showloclistpopup = function () {
    //    LocationFactory.getLocationListPopup().success(function (data) {
    //        //$scope.LocationPopupData = data;
    //        var htmltbl = "";
    //        for (var i = 0; i < data.length; i++) {
    //            htmltbl += "<tr onclick='getparentdetails(this)'><td>" + data[i]["LocationId"] + "</td><td>" + data[i]["LocationName"] + "</td></tr>";
    //        }
    //        $("#locationpopuplisttbl tbody").html(htmltbl);
    //        $("#locationpopuplisttbl").DataTable();
    //        $scope.loading = false;
    //        var element = angular.element("#myModalforLocList");
    //        element.modal('show');
    //    }).error(function (data) {
    //        $scope.error = "An Error has occured while loading OPCData! ";
    //        $scope.loading = false;
    //    });
    //};

    //$scope.loclistmodalhide = function () {
    //    var element = angular.element('#myModalforLocList');
    //    element.modal('hide');
    //};

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
function getparentdetails(obj) {
    $("#txt_locparentid").val($(obj).find("td:eq(0)").html());
    //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
    var element = angular.element('#myModalforLocList');
    element.modal('hide');
}
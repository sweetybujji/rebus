

RapidApp.service("MODBUSNodeService", function ($http) {
    
    this.getOPCTagsdata = function () {
        
        return $http.get("/getopctags").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding tag data.");
        });
    }
    this.createModbusNode = function (REdata) {
        
        return $http.post("/CreatingModbusNode", REdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error creating Modbus Device Node.");
        });
    }
    this.getModbusNodeList = function () {
        
        return $http.get("/getModbusNodeList").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding Modbus Node List.");
        });
    }
    
    //this.DeleteRECollection = function (CllnName) {
    
    //    return $http.post("/DeleteRECollection", CllnName).
    //            then(function (response) {
    //        return response;
    //    }, function (response) {
    //        alert("Error deleting Collection.");
    //    });
    //}
    
    this.DeleteRECollection = function (CllnName) {
        var url = "/DeleteRECollection/" + (CllnName);
        return $http.put(url).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error deleting Collection.");
        });
    }
    
    this.getOPCVirtualTagsdata = function () {
        
        return $http.get("/getVtagdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding tag data.");
        });
    }
    
    this.getvtagdatabyid = function (vtagid) {
        
        return $http.post("/getvtagdatabyid", vtagid).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding Tag data.");
        });
    }
    this.UpdateMeter = function (meterdata) {
        var meterupdate = JSON.parse(meterdata);
        var url = "/UpdateMeterdata/" + (meterupdate[0].ID);
        
        return $http.put(url, meterdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error editing this Meterdata.");
            console.log(response);
        });
    }
})
var nodes = new Object();

RapidApp.controller("MODBUSNodeController", function (MODBUSNodeService, MODBUSDeviceService, $scope, $location, $routeParams, $compile) {
    $scope.fn_SaveMN = function () {
        var flag = 0;
        var ActionData = "";
        var CmdStartAddr; var CmdLength; var Dataformat; var paramsStartAddr; var paramsLength; var Type; var parameters;
        var Formulae;
        var DynamicValues = new Array();
        var NodeName = $("#txt_NodeName").val();
        var DeviceName = $("#txt_DeviceName").val();
        var IPAddress = $("#txt_IPAddress").val();
        
        var SlaveID = $("#txt_SlaveID").val();
        var Protocal = $("#ddl_Protocal option:selected").val();
        var Frequency = $("#txt_Frequency").val();
        
        
        if (NodeName == "") {
            flag = flag + 1;
            $("#txt_NodeName").css('border-color', 'red');
        }
        if (DeviceName == "") {
            flag = flag + 1;
            $("#txt_DeviceName").css('border-color', 'red');
        }
        if (flag > 0) {

        }
        else {
            DynamicValues.push({
                NodeName: NodeName,
                DeviceName: DeviceName,
                IPAddress: IPAddress,
                SlaveID: SlaveID,
                Protocal: Protocal,
                Frequency: Frequency
            });
        }
        var jsonstring = JSON.stringify(DynamicValues);
        
        MODBUSNodeService.createModbusNode(jsonstring).then(function (doc) {
            $scope.addMode = false;
            $scope.loading = false;
            $scope.error = doc.data;
            $location.path("/MODBUSNodeList/");

        }, function (response) {
            $scope.loading = false;

        });
        
        //MODBUSNodeService.getModbusDeviceList().then(function (data) {
        //    //$scope.GroupData = data;
        //    alert(data);
        //    $scope.loading = false;
        //}, function (response) {
        //    $scope.error = "An Error has occured while loading RuleEngine! ";
        //    $scope.loading = false;
        //});     
    }
    $scope.GetDeviceNames = function (prevNode) {
        //alert(prevNode);
        nodes = prevNode;
        MODBUSDeviceService.getMODBUSDeviceList().then(function (doc) {
            
            
            $('#ModelDg_DeviceList').modal('show')
            $("#tbl_ModbusDevice").dataTable().fnDestroy();
            var response = doc.data;
            var htmldata = '';
            $('#tbl_ModbusDevice tbody').empty();
            for (var i = 0; i < response.length; i++) {
                htmldata += '<tr  onclick="getDevicedetails(this)">';
                htmldata += '<td>' + response[i]["DeviceName"] + '</td>';
                htmldata += '<td>' + response[i]["DeviceType"] + '</td>';
                htmldata += '</tr>';
            }
            
            $('#tbl_ModbusDevice tbody').append(htmldata);
            
            $('#tbl_ModbusDevice').DataTable();
        }, function (response) {
      
        });
    
    }
    $scope.goto_MNlist = function () {
        $location.path("/MODBUSNodeList");
    }
})

function getDevicedetails(obj) {
    $('#' + nodes).val($(obj).find("td:eq(0)").html());
    $('#ModelDg_DeviceList').modal('hide')
}

RapidApp.controller("MODBUSNodeListController", function (MODBUSNodeService, $scope, $location) {
    MODBUSNodeService.getModbusNodeList().then(function (doc) {
        // doc.data;
        $("#tbl_ModbusNode").dataTable().fnDestroy();
        var response = doc.data
        var htmldata = '';
        $('#tbl_ModbusNode tbody').empty();
        for (var i = 0; i < response.length; i++) {
            htmldata += '<tr   onclick="getNodeName(this)">';
            htmldata += '<td>' + (i + 1) + '</td>';
            htmldata += '<td>' + response[i]["NodeName"] + '</td>';
            htmldata += '<td>' + response[i]["DeviceName"] + '</td>';
            htmldata += '<td>' + response[i]["IPAddress"] + '</td>';
            htmldata += '<td>' + response[i]["SlaveID"] + '</td>';
            htmldata += '</tr>';
        }
        
        $('#tbl_ModbusNode tbody').append(htmldata);
        
        $('#tbl_ModbusNode').DataTable();
        
    }, function (response) {
    
    });
    
    
    
    $scope.gotoMNedit = function () {
        if ($("#REeditdata").data("editval") != "") {
            var contactUrl = "/CreateRuleEngine/" + $("#REeditdata").data("editval");
            $location.path(contactUrl);
        }
        else {
            alert("Please Select row to edit");
        }

    }
    $scope.gotoMNcreate = function () {
        $location.path("/MODBUSNode");
    }
    $scope.deleteMN = function () {
        var cllnName = $("#REeditdata").data("editval");
        if (cllnName != "") {
            RuleEngineService.DeleteRECollection(cllnName).then(function (doc) {
                $scope.error = doc.data;
                $location.path("/RuleEngineList/");

            }, function (response) {
                $location.path("/RuleEngineList/");
    
            });
        }
        else {
            alert("Please Select row to delete");
        }
    }
})
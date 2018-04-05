

RapidApp.service("MODBUSDeviceService", function ($http) {

    this.getParamList = function () {

        return $http.get("/getParamsList").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding Parameter_Master data.");
                });
    }
    this.createModbusDevice = function (REdata) {

        return $http.post("/CreatingModbusDevice", REdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating Modbus Device.");
                });
    }
    this.getMODBUSDeviceList = function () {

        return $http.get("/getModbusDeviceList").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding Modbus Device List.");
                });
    }



    this.DeleteMDCollection = function (rowid) {
        var url = "/DeleteRuleEngine/" + (rowid);
        //alert(url);
        return $http.put(url).
                then(function (response) {

                    getMODBUSDeviceList();
                    return response;
                }, function (response) {

                    alert("Error deleting Collection.");
                });
    }


    this.EditMDCollection = function (rowid) {

        var url = "/EditRuleEngine/" + (rowid);

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

RapidApp.controller("MODBUSDeviceController", function (MODBUSDeviceService, $scope, $location, $stateParams, $compile, $state) {
    //alert("SS");

    $scope.btnReset = function () {
        ressetfields();
    }

    $scope.goto_MDlist = function () {

        $state.go("/MODBUSDeviceList/");
    }


    if ($stateParams.id == undefined) {

        $scope.showCmd = false;
        $scope.showParams = false;
        $scope.Tagserverdata = function (prevNode) {
            // alert(prevNode);
            nodes = prevNode;
            MODBUSDeviceService.getOPCTagsdata().then(function (doc) {


                $('#TagsServerdatamodal').modal('show')
                $("#tagserver_tbl").dataTable().fnDestroy();
                var response = doc.data;
                var htmldata = '';
                $('#tagservertbody').empty();
                for (var i = 0; i < response.length; i++) {
                    htmldata += '<tr  onclick="gettagserverdetails(this)">';
                    htmldata += '<td>' + response[i]["TAGNAME"] + '</td>';
                    htmldata += '<td>' + response[i]["OPCNAME"] + '</td>';
                    htmldata += '</tr>';
                }

                $('#tagservertbody').append(htmldata);

                $('#tagserver_tbl').DataTable();
            }, function (response) {

            });

        }
        var id = 0;
        $scope.fn_SaveMD = function () {
            var flag = 0;
            var ActionData = "";
            var CmdStartAddr; var CmdLength; var Dataformat; var paramsStartAddr; var paramsLength; var Type; var parameters;
            var Formulae;
            var DynamicValues = new Array();
            var DeviceName = $("#txt_DeviceName").val();
            var Make = $("#txt_Make").val();
            var Model = $("#txt_Model").val();
            // var Active = $('#cb_active').is(":checked");
            var DeviceTypes = $("#ddl_DeviceTags option:selected").val();


            if ($scope.showCmd) {
                CmdStartAddr = $("#txt_CmdStartAddr").val();
                CmdLength = $("#txt_CmdLength").val();
                Dataformat = $("#ddl_Dataformat option:selected").val();
                if ($scope.showParams) {
                    paramsStartAddr = $("#txt_paramsStartAddr").val();
                    paramsLength = $("#ddl_paramsLength option:selected").val();
                    Type = $("#ddl_Type option:selected").val();
                    parameters = $("#txt_parameters").val();
                    Formulae = $("#txt_Formulae").val();
                }
            }

            if (DeviceName == "") {
                flag = flag + 1;
                $("#txt_DeviceName").css('border-color', 'red');
            }
            if (Make == "") {
                flag = flag + 1;
                $("#txt_Make").css('border-color', 'red');
            }
            if (flag > 0) {

            }
            else {
                DynamicValues.push({
                    DeviceName: DeviceName,
                    Make: Make,
                    Model: Model,
                    DeviceType: DeviceTypes,
                    CmdStartAddr: CmdStartAddr,
                    CmdLength: CmdLength,
                    Dataformat: Dataformat,
                    paramsStartAddr: paramsStartAddr,
                    paramsLength: paramsLength,
                    Type: Type,
                    parameters: parameters,
                    Formulae: Formulae,
                    "id": id
                });
            }
            var jsonstring = JSON.stringify(DynamicValues);

            MODBUSDeviceService.createModbusDevice(jsonstring).then(function (doc) {
                $scope.addMode = false;
                $scope.loading = false;
                $scope.error = doc.data;
                $location.path("/MODBUSDeviceList/");

            }, function (response) {
                $scope.loading = false;

            });
        }
        $scope.goto_MDlist = function () {

            $location.path("/MODBUSDeviceList/");
        }



        $scope.GetParameters = function (prevNode) {
            //alert(prevNode);
            nodes = prevNode;
            MODBUSDeviceService.getParamList().then(function (doc) {


                $('#ModelDg_ParamList').modal('show')
                $("#tbl_ParameterList").dataTable().fnDestroy();
                var response = doc.data;
                var htmldata = '';
                $('#tbl_ParameterList tbody').empty();
                for (var i = 0; i < response.length; i++) {
                    htmldata += '<tr style="background: #ededed none repeat scroll 0 0" onclick="getParamdetails(this)">';
                    htmldata += '<td>' + response[i]["parameterid"] + '</td>';
                    htmldata += '<td>' + response[i]["parametername"] + '</td>';
                    htmldata += '</tr>';
                }

                $('#tbl_ParameterList tbody').append(htmldata);

                $('#tbl_ParameterList').DataTable();
            }, function (response) {

            });

        }

    }
    else {

        $("#txt_parameters").attr('disabled', true);
        $("#btnsave").val("Update");
        var id = $stateParams.id;
        var data = { "id": id };
        data = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            contentType: 'application/JSON',
            url: '/EditRuleEngine',
            data: data,
            success: function (res) {
                $("#txt_DeviceName").val(res[0].devicename);
                $("#txt_Make").val(res[0].make);
                $("#txt_Model").val(res[0].model);
                $("#ddl_DeviceTags").val(res[0].devicetype);
                $("#txt_CmdStartAddr").val(res[0].startaddress);
                $("#txt_CmdLength").val(res[0].length);
                $("#ddl_Dataformat").val(res[0].dataformat);
                $("#txt_paramsStartAddr").val(res[0].paramaddress);
                $("#ddl_paramsLength").val(res[0].paramlength);
                $("#ddl_Type").val(res[0].type);
                $("#txt_parameters").val(res[0].parameter);
                $("#txt_Formulae").val(res[0].formulae);
            }
        });
        $scope.fn_SaveMD = function () {
            var flag = 0;
            var ActionData = "";
            var CmdStartAddr; var CmdLength; var Dataformat; var paramsStartAddr; var paramsLength; var Type; var parameters;
            var Formulae;
            var DynamicValues = new Array();
            var DeviceName = $("#txt_DeviceName").val();
            var Make = $("#txt_Make").val();
            var Model = $("#txt_Model").val();
            // var Active = $('#cb_active').is(":checked");
            var DeviceTypes = $("#ddl_DeviceTags option:selected").val();
            paramsStartAddr = $("#txt_paramsStartAddr").val();
            paramsLength = $("#ddl_paramsLength option:selected").val();
            Type = $("#ddl_Type option:selected").val();
            parameters = $("#txt_parameters").val();
            Formulae = $("#txt_Formulae").val();
            CmdStartAddr = $("#txt_CmdStartAddr").val();
            CmdLength = $("#txt_CmdLength").val();
            Dataformat = $("#ddl_Dataformat option:selected").val();




            if ($scope.showCmd) {
                CmdStartAddr = $("#txt_CmdStartAddr").val();
                CmdLength = $("#txt_CmdLength").val();
                Dataformat = $("#ddl_Dataformat option:selected").val();
                if ($scope.showParams) {
                    paramsStartAddr = $("#txt_paramsStartAddr").val();
                    paramsLength = $("#ddl_paramsLength option:selected").val();
                    Type = $("#ddl_Type option:selected").val();
                    parameters = $("#txt_parameters").val();
                    Formulae = $("#txt_Formulae").val();
                }
            }

            if (DeviceName == "") {
                flag = flag + 1;
                $("#txt_DeviceName").css('border-color', 'red');
            }
            if (Make == "") {
                flag = flag + 1;
                $("#txt_Make").css('border-color', 'red');
            }
            if (flag > 0) {

            }
            else {
                DynamicValues.push({
                    DeviceName: DeviceName,
                    Make: Make,
                    Model: Model,
                    DeviceType: DeviceTypes,
                    CmdStartAddr: CmdStartAddr,
                    CmdLength: CmdLength,
                    Dataformat: Dataformat,
                    paramsStartAddr: paramsStartAddr,
                    paramsLength: paramsLength,
                    Type: Type,
                    parameters: parameters,
                    Formulae: Formulae,
                    "id": id
                });
            }

            var jsonstring = JSON.stringify(DynamicValues);
            // alert(jsonstring);

            MODBUSDeviceService.createModbusDevice(jsonstring).then(function (doc) {
                $scope.addMode = false;
                $scope.loading = false;
                $scope.error = doc.data;
                //$location.path("/MODBUSDeviceList/");
                $state.go("/MODBUSDeviceList/");

            }, function (response) {
                $scope.loading = false;

            });
        }
    }

})




function getParamdetails(obj) {
    $('#' + nodes).val($(obj).find("td:eq(1)").html());
    $('#ModelDg_ParamList').modal('hide')
}

RapidApp.controller("MODBUSDeviceListController", function (MODBUSDeviceService, $scope, $location, $state) {
    MODBUSDeviceService.getMODBUSDeviceList().then(function (doc) {
        // doc.data;
        $("#tbl_ModbusDevice").dataTable().fnDestroy();
        var response = doc.data
        var htmldata = '';

        //alert(JSON.stringify(response));

        $('#tbl_ModbusDevice tbody').empty();
        for (var i = 0; i < response.length; i++) {
            htmldata += '<tr id=' + response[i]["Id"] + '   onclick="getMdName(this)">';
            htmldata += '<td>' + (i + 1) + '</td>';
            htmldata += '<td>' + response[i]["DeviceName"] + '</td>';
            htmldata += '<td>' + response[i]["Make"] + '</td>';
            htmldata += '<td>' + response[i]["Model"] + '</td>';
            htmldata += '<td>' + response[i]["DeviceType"] + '</td>';
            htmldata += '</tr>';
        }

        $('#tbl_ModbusDevice tbody').append(htmldata);

        $('#tbl_ModbusDevice').DataTable();

    }, function (response) {

    });

    angular.element(document).on('click', '#tbl_ModbusDevice tbody tr', function () {
        rowid = $(this).attr('id');
        // alert(id);
    })


    $scope.gotoMDedit = function (id) {

        //$location.path("/MODBUSDevice/" + rowid);

        $state.go("/MODBUSDevice/", {
            id: id
        });


    };


    $scope.gotoMDcreate = function () {

        //$location.path("/MODBUSDevice");

        $state.go("/MODBUSDevice/", {
            //id: rowid
        });
    }



    $scope.deleteMD = function (id) {
        if (rowid != "") {
            MODBUSDeviceService.DeleteMDCollection(rowid).then(function (doc) {
                if (doc.error) {
                    $scope.error = doc.error;
                }
                else {
                    $location.path("/MODBUSDeviceList/");
                }

            }, function (response) {
                window.location.reload();
            });
        }
        else {
            alert("Please Select row to delete");
        }
    }
})








function ressetfields() {
    $("#txt_DeviceName").val("");
    $("#txt_Make").val("");
    $("#txt_Model").val("");
    $("#ddl_DeviceTags").val("0");
    $("#txt_CmdStartAddr").val("");
    $("#txt_CmdLength").val("");
    $("#ddl_Dataformat").val("0");
    $("#txt_paramsStartAddr").val("");
    $("#ddl_paramsLength").val("0");
    $("#ddl_Type").val("0");
    $("#txt_parameters").val("");
    $("#txt_Formulae").val("");

}




RapidApp.factory('XMLFactory', function ($http) {
    return {
        //To Fill DropDown
        DropDownData: function () {
            return $http.get('../XMLFile/AutoFillDropDown');
        },
        //to get connection list
        GetConnList: function () {
            return $http.get('../XMLFile/GetXMLConnList');
        },//Get ConnectionList
        //save XML File
        SaveXMLFile: function (totalresult) {

            return $http.post('../XMLFile/SaveXMLFileData', { routinedata: totalresult });
        },
        //Data for Edit
        GetDataForEdit: function (SelectedId) {
            return $http.post('../XMLFile/GetXMLFileIdData', { EditData: SelectedId });
        },
        //Delete Connection
        removeconnection: function (selectedConn) {
            return $http.post('../XMLFile/RemoveConnection', { DeleteID: selectedConn });
        },
        //getting XML Data for Display
        GetXMLData: function (selectedConnid) {
            return $http.post('../XMLFile/GetXMLTableData', { SelectedId: selectedConnid });
        }
    };//Return Closing
});//Factory Closing

RapidApp.controller('GetXMlFileConnections', function ($scope, XMLFactory) {
    //==============Like Document Ready
    $scope.selected = 'tile';
    $scope.SelectFileFromUrl = 'FromUrl';
    //================


    $scope.templatesettings = { HeaderTitle: "XML File" };
    $scope.go = function (path) {
        $location.path(path);
    };


    //to get connection names intially
    XMLFactory.GetConnList().success(function (data) {
        if (data == "Fail" || data.isauthenticated == false) {
            if (data == "Fail") {
                alert(data);
            }
            else if (data.isauthenticated == false) {
                fn_session_expired_client();
            }

        } else {
            $scope.XMLlist = data;
        }
    });

    //BrowseXMLFile Popup Closing
    $scope.BrowseXMLFile = function () {
        try {
            var intial = angular.element('#myModal');
            intial.modal('hide');
            var element = angular.element('#myModalforFileUpload');
            element.modal('show');
        }
        catch (e) {
            alert("Error is" + e);
        }
    }//BrowseXMLFile Function Closing

    //Drop Down Filling
    $scope.fillDropDown = function () {
     
        $scope.obj = "";
        $scope.SelectFileFromUrl = "FromUrl";
        XMLFactory.DropDownData().success(function (data) {
            //alert(data);
            if (data == "Fail" || data.isauthenticated == false) {
                if (data == "Fail") {
                    alert(data);
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }

            } else {
                // alert(selecteddata[0].UploadedFiles);
                $scope.DropDownData = [];
                for (var i = 0; i < data.length; i++) {
                    // alert(data[i]);
                    $scope.DropDownData.push(data[i]);
                }
            }
        });
    }//Drop Down Function Closing
    //Save function
    $scope.Save = function () {

        var ConnectionName = $scope.ConnName;
        var ConnType = $scope.ConnType;
        //var Sheetnum = $scope.SheetNumber;
        var RadioValue = $scope.SelectFileFromUrl;
        var FromUrl = $scope.UrlPath;
        var HiddenConId = $scope.hiddenConnId;
        var selectedlist = new Array();
        if (RadioValue == "FromUrl") {
            selectedlist.push({
                "ConnectionName": ConnectionName,
                "ConnType": ConnType,
                //"Sheetnum": Sheetnum,
                "RadioValue": RadioValue,
                "FromUrl": FromUrl,
                "UploadedFiles": "",
                "HiddenConId": HiddenConId
            });
        }
        else {
            var UploadedFiles = $scope.obj.selected;
            selectedlist.push({
                "ConnectionName": ConnectionName,
                "ConnType": ConnType,
                //"Sheetnum": Sheetnum,
                "RadioValue": RadioValue,
                "FromUrl": null,
                "UploadedFiles": UploadedFiles,
                "HiddenConId": HiddenConId
            });
        }
        var req = JSON.stringify(selectedlist);
        var totalresult = req;
        XMLFactory.SaveXMLFile(totalresult).success(function (data) {

            if (data.errorresult) {
                alert(data.errorresult);
            }
            else if (data.isauthenticated==false)
            {
                fn_session_expired_client();
            }
            else if (data.responsedata) {
                //alert(data.responsedata);
                fn_SuccessNotification("Saved Successfully...!!", "success_alert", "", "");
                //alert("Saved Successfully...");
                //var resuldata = JSON.parse(data.responsedata);
                //$scope.XMLlist = resuldata;
                var element = angular.element('#myModal');
                element.modal('hide');
                $("#XMLdata").empty();
                clearall();
                XMLFactory.GetConnList().success(function (data) {
                    if (data == "Fail" || data.isauthenticated == false) {
                        if (data == "Fail") {
                            alert(data);

                        }
                        else if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }

                    } else {
                        $scope.XMLlist = data;
                    }
                });
            }
        }).error(function (data) {
            // alert(data);
        });
        XMLFactory.GetConnList().success(function (data) {
            if (data == "Fail" || data.isauthenticated == false) {
                if (data == "Fail") {
                    alert(data);
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }

            } else {
                $scope.XMLlist = data;
            }
        });
    }//Save Closing

    //Data for Edit
    $scope.XMLData_Edit = function (id) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        try {
            var SelectedId = id;
            XMLFactory.GetDataForEdit(SelectedId).success(function (selecteddata) {
                // alert(JSON.stringify(selecteddata));
                //  alert(selecteddata["FromURL"]);
                //  alert(SelectedId);
                if (selecteddata == "Fail") {
                    alert("Error Occured");
                } else if (selecteddata == "" || selecteddata == null) {
                    fn_session_expired_client();
                }
                else if (selecteddata.isauthenticated == false) {
                    alert("No data");
                }
                else {
                    var element = angular.element('#myModal');
                    element.modal('show');
                    $scope.hiddenConnId = SelectedId;
                    $scope.ConnName = selecteddata["ConnectionName"];
                    //  $scope.SheetNumber = selecteddata[0].SheetNumber;
                    $scope.SelectFileFromUrl = selecteddata["RadioValue"];
                    $scope.UrlPath = selecteddata["FromURL"];
                    $scope.obj = { "selected": selecteddata["UploadedFiles"] };
                    XMLFactory.DropDownData().success(function (data) {
                        if (data == "Fail" || data.isauthenticated == false) {
                            if (data == "Fail") {
                                alert(data);
                            }
                            else if (data.isauthenticated == false) {
                                fn_session_expired_client();
                            }

                        } else {

                            $scope.DropDownData = [];
                            for (var i = 0; i < data.length; i++) {
                                $scope.DropDownData.push(data[i]);
                            }
                          
                            $scope.obj = { "selected": selecteddata[0].UploadedFiles };
                            // $scope.$apply();
                        }
                    });
                }

            });
        }
        catch (e) {
            alert("Error is" + e);
        }
    }//EDIt Closing
    //Delete connection
    $scope.removeConnectio = function (index, id) {
        var selectedConn = id;
        try {
            //  var deleteid = confirm("Do you want Delete This Connection");
            bootbox.confirm("Do you want Delete This Connection", function (result) {
                if (result) {
                    //  if (deleteid == true) {
                    XMLFactory.removeconnection(selectedConn).success(function (data) {
                        if (data == "Fail") {
                            alert("Error Occured");
                        }
                        else if (data.isauthenticated == false) {
                            // StopPageLoader();

                            fn_session_expired_client();

                        }
                        else if (data == "" || data == null) {
                            // alert("No data");
                            fn_SuccessNotification("Deleted Successfully..!!", "success_alert", "", "");
                            $("#XMLdata").empty();
                            XMLFactory.GetConnList().success(function (data) {
                                if (data == "Fail" || data.isauthenticated == false) {
                                    if (data == "Fail") {
                                        alert(data);
                                    }
                                    else if (data.isauthenticated == false) {
                                        fn_session_expired_client();
                                    }

                                } else {
                                    $scope.XMLlist = data;
                                }
                            });
                        } else {
                            alert("Deleted Successfully..");
                            $scope.XMLlist.splice(index, 1);
                        }
                    });
                }
            });
        }
        catch (e) {
            alert("Error is:" + e);
        }
    }
    //xml data showing as Table
    $scope.XMLData = function (index, id) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        var SelectedConnID = id;
        $("#XMLdata").empty();
        $("#ajaxloader").show();
        try {
            XMLFactory.GetXMLData(SelectedConnID).success(function (data) {
                // alert(data);
                // alert(JSON.stringify(data));
                //  alert(JSON.parse(data));
                if (data == "Fail" || data.isauthenticated == false) {
                    if (data == "Fail") {
                        alert(data);
                    }
                    else if (data.isauthenticated == false)
                    {
                        fn_session_expired_client();
                    }

                } else {
                    /*var result = $.parseJSON(data);
                    $.each(result, function(k, v) {
                        //display the key and value pair
                        alert(k + ' is ' + v);
                    });*/
                    //alert()
                   
                    var jarray = JSON.stringify(data);             
                   // alert(jarray);
                    var jsonobj = JSON.parse(jarray);
                    var userDetail = jsonobj[Object.keys(jsonobj)[0]];
                   // alert(JSON.stringify(userDetail));
                    var jarray11 = JSON.stringify(userDetail);
                    var c = JSON.parse(jarray11);
                    //var c =jsonobj["Users"];
                    //alert(JSON.stringify(c));
                    //var c =jsonobj[parsed.Keys.First()];
                    var keys = Object.keys(c[0]);
                   // alert(keys);
                    if (keys[0] == 0 && keys[1]==1)
                    {
                       
                        var result = fn_SuccessNotification("Invalid xml..!!", "success_alert", "", "");
                     
                    
                            $scope.lastSelected.selected = 'tile';
                      
                        
                        return;
                    }
                    var tbl = "<table class='table table-stripped table-bordered table-hover' style='border: 1px solid' id='jsontable'>";
                    tbl += "<thead><tr>";
                    for (k = 0; k < keys.length; k++) {
                        tbl += "<th style='color: #428bca; font-size: 12px;'>" + keys[k] + "</th>";
                    }
                    tbl += "</tr></thead>";
                    for (i = 0; i < c.length; i++) {
                        tbl += "<tr >";
                        for (j = 0; j < keys.length; j++) {
                            var kk = keys[j];
                            tbl += "<td>" + c[i]["" + kk + ""] + "</td>";
                        }
                        tbl += "</tr>";
                    }

                    tbl += "</table>";
                    //alert(keys.length);

                    $("#ajaxloader").hide();
                    // $('#XMLdata').append(data);
                    $('#XMLdata').empty();
                    $('#XMLdata').append(tbl);
                    $('#jsontable').dataTable({ scrollX: true, });
                }
            });
        }
        catch (e) {
            alert("Error is" + e);
        }
    }
    //Clear functions==========
    function clearall() {
        $scope.ConnName = "";
        $scope.SheetNumber = "";
        $scope.UrlPath = "";
        $scope.SelectedFile = "";
        $scope.hiddenConnId = "Save";
    }
    $scope.ClearModel = function () {
        $scope.ConnName = "";
        $scope.SheetNumber = "";
        $scope.UrlPath = "";
        $scope.SelectedFile = "";
        $scope.hiddenConnId = "Save";
    }
    $scope.ClearUploadedFiles = function () {
        $scope.obj.selected = "";
    }
    $scope.ClearURL = function () {
        $scope.UrlPath = "";
    }
});//Controller Closing
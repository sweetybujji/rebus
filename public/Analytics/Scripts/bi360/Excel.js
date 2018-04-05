
RapidApp.factory('ExcelFactory', function ($http) {
    return {
        //To get DropDownData
        DropDownData: function () {
            return $http.get('../ExcelFile/AutoFillDropDown');
        },
        //Get ConnectionList
        GetConnList: function () {
            return $http.get('../ExcelFile/GetExcelConnList');
        },
        //Save Excel File
        SaveExcelFile: function (totalresult) {
            return $http.post('../ExcelFile/SaveExcelFileData', { routinedata: totalresult });
        },
        //Data for Edit
        GetDataForEdit: function (SelectedId) {
            return $http.post('../ExcelFile/GetExcelFileIdData', { EditData: SelectedId });
        },
        //Delete Connection
        removeconnection: function (selectedConn) {
            return $http.post('../ExcelFile/RemoveConnection', { DeleteID: selectedConn });
        },
        //get Excel File data to display as Table
        GetExcelData: function (selectedConnid) {
            StartPageLoader();
            return $http.post('../ExcelFile/GetExcelTableData', { SelectedId: selectedConnid });
        }
    };//Return Closing
});//Factory Closing



RapidApp.controller('GetExcelSheetConnections', function ($scope, ExcelFactory) {

    

    ////======Like Document Ready Function
    $scope.selected = 'tile';
    $scope.SelectFileFromUrl = 'FromUrl';
    ///===============Ending

    $scope.templatesettings = { HeaderTitle: "Excel File" };
    $scope.go = function (path) {
        $location.path(path);
    };


    ExcelFactory.GetConnList().success(function (data) {//to get connection names
        if (data == "Fail" || data.isauthenticated == false) {
            if (data == "Fail") {
                alert(data);
            }
            else if (data.isauthenticated == false) {
                fn_session_expired_client();
            }

        } else {
            $scope.Excellist = data;
        }
    });

    //ExcelFactory.DropDownData().success(function (data) {
    //    if (data == "Fail") {
    //        alert("Error occured");
    //    } else {
    //        $scope.sql_databases = JSON.parse(data.json_obj);
    //    }
    //});

    //============================================DropDown Filling
    $scope.fillDropDown = function () {
        ExcelFactory.DropDownData().success(function (data) {
            if (data == "Fail" || data.isauthenticated == false) {
                if (data == "Fail") {
                    alert(data);
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }

            } else {
                // alert(selecteddata[0].UploadedFiles);
                $scope.obj = "";
                $scope.SelectFileFromUrl = "FromUrl";
                $scope.DropDownData = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.DropDownData.push(data[i]);
                }
                //  $scope.DropDownData = data;                        
                //$scope.DropDownSample = selecteddata[0];
                // $scope.obj = { "selected": selecteddata[0].UploadedFiles };
                // $scope.$apply();
                //$scope.DropDownSample = data[0].UploadedFiles;
            }
        });
    }



    //Upload Excel Button
    $scope.BrowseExcelFile = function () {
        try {
            var intial = angular.element('#myModal');
            intial.modal('hide');
            var element = angular.element('#myModalforFileUpload');
            element.modal('show');

        }
        catch (e) {
            alert("Error is" + e);
        }
    }
    //Save Function 
    $scope.Save = function () {

        var ConnectionName = $scope.ConnName;
        var ConnType = $scope.ConnType;
        var Sheetnum = $scope.SheetNumber;

        var RadioValue = $scope.SelectFileFromUrl;

        var FromUrl = $scope.UrlPath;
        // alert($scope.obj.selected);
        //var UploadedFiles = $scope.obj.selected;
        //alert(UploadedFiles);
        var HiddenConId = $scope.hiddenConnId;
        var selectedlist = new Array();
        if (RadioValue == "FromUrl") {
            selectedlist.push({
                "ConnectionName": ConnectionName,
                "ConnType": ConnType,
                "Sheetnum": Sheetnum,
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
                "Sheetnum": Sheetnum,
                "RadioValue": RadioValue,
                "FromUrl": null,
                "UploadedFiles": UploadedFiles,
                "HiddenConId": HiddenConId
            });
        }
        var req = JSON.stringify(selectedlist);
        var totalresult = req;
        ExcelFactory.SaveExcelFile(totalresult).success(function (data) {
            
            if (data.errorresult) {
                alert(data.errorresult);
            }
            else if (data.isauthenticated == false)
            {
                fn_session_expired_client();
            }
            else if (data) {
                //alert(data.responsedata);
             //   alert("Saved Successfully...");
                fn_SuccessNotification("Saved Successfully...!!", "success_alert", "", "");
                //var resuldata = JSON.parse(data.responsedata);
                //$scope.Excellist = resuldata;
                var element = angular.element('#myModal');
                element.modal('hide');
                $("#Exceldata").empty();
                clearall();
                ExcelFactory.GetConnList().success(function (data) {//to get connection names
                    if (data == "Fail" || data.isauthenticated == false) {
                        if (data == "Fail") {
                            alert(data);
                        }
                        else if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }

                    } else {
                        $scope.Excellist = data;
                    }
                });
              
            }
        }).error(function (data) {
            alert(data);
        });
        
    }//Save Closing
    //Get data for Edit
    $scope.ExcelData_Edit = function (id) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        try {
            //  $scope.fillDropDown();
            var SelectedId = id;
            ExcelFactory.GetDataForEdit(SelectedId).success(function (selecteddata) {
               //  alert(JSON.stringify(selecteddata));
                //alert(selecteddata.FromURL);
                if (selecteddata == "Fail") {
                    alert("Error Occured");
                }
                else if (selecteddata.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else if (selecteddata == "" || selecteddata == null) {
                    alert("No data");
                } else {
                    var element = angular.element('#myModal');
                    element.modal('show');
                    $scope.hiddenConnId = SelectedId;
                    $scope.ConnName = selecteddata.ConnectionName;
                    $scope.SheetNumber = selecteddata.SheetNumber;
                   
                    $scope.SelectFileFromUrl = selecteddata.RadioValue;
                    if(selecteddata.FromURL=="null"){
                        $scope.UrlPath=" ";
                    }else{
                    $scope.UrlPath = selecteddata.FromURL;
                    }
                  //  alert(selecteddata.UploadedFiles);
                    $scope.obj = { "selected": selecteddata.UploadedFiles };
                    ExcelFactory.DropDownData().success(function (data) {
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
                                $scope.DropDownData.push(data[i]);
                            }
                            //  $scope.DropDownData = data;                        
                            //$scope.DropDownSample = selecteddata[0];
                           $scope.obj = { "selected": selecteddata[0].UploadedFiles };
                            //$scope.$apply();
                            //$scope.DropDownSample = data[0].UploadedFiles;
                        }
                    });
                    // alert("2");
                    //$scope.DropDownSample = selecteddata[0].UploadedFiles;
                    //$scope.$apply();
                    //  $('#UploadedFiles').val(data[0].UploadedFiles);


                }

            });
        }
        catch (e) {
            alert("Error is" + e);
        }
    }
    //To Delete Connection
    $scope.removeConnectio = function (index, id) {
        var selectedConn = id;
        try {
           // var deleteid = confirm("Do you want Delete This Connection");
            // if (deleteid == true) {
            bootbox.confirm("Do you want Delete This Excel connection", function (result) {
                if (result) {
                    ExcelFactory.removeconnection(selectedConn).success(function (data) {
                        if (data == "Fail") {
                           // alert("Error Occured");
                            fn_errorNotification("200", "", "", "Error Occured", "error_alert", "", "");
                        }
                        else if (data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else if (data == "" || data == null) {
                            alert("No data");
                        } else {
                            fn_SuccessNotification("Deleted Successfully..!!", "success_alert", "", "");
                            $("#Exceldata").empty();
                            //alert("Deleted Successfully..");
                            $scope.Excellist.splice(index, 1);
                        }
                    });
                }
            });
        }
        catch (e) {
            alert("Error is:" + e);
        }
        ExcelFactory.GetConnList().success(function (data) {//to get connection names
            if (data == "Fail" || data.isauthenticated == false) {
                if (data == "Fail") {
                    alert(data);
                }
                else if (data.isauthenticated == false) {
                    fn_session_expired_client();
                }

            } else {
                $scope.Excellist = data;
            }
        }); 
    }
    //Display Excel File data as table 
    $scope.ExcelData = function (index, id) {
         if ($scope.lastSelected) {
             $scope.lastSelected.selected = 'tile';
         }
         this.selected = 'tileselected';
         $scope.lastSelected = this;
        var selectedConnid = id;
        $("#Exceldata").empty();
        $("#ajaxloader").show();
        try {
            ExcelFactory.GetExcelData(selectedConnid).success(function (data) {
                //alert();
                //alert(JSON.stringify(data));
                StopPageLoader();
                if (data == "Fail" || data.isauthenticated == false) {
                    if (data == "Fail") {
                        alert(data);
                    }
                    else if (data.isauthenticated == false) {
                        fn_session_expired_client();
                    }

                } else {
                     var headers = data[0];
                    // var table = $('#Tbl_Exceldata');
                   //  table.empty();
                    // $('#popup_viewImportedExcel').modal('show');
                     var htmlheader = '';
                     htmlheader += '<table class="table table-stripped table-bordered table-hover" style="border: 1px solid" id="Tbl_Exceldata"><thead><tr>';

                     for ( var item in headers) {
                         htmlheader += '<th style="color: #428bca; font-size: 12px;">' + item + '</th>';
                     }
                     htmlheader += '</tr></thead><tbody id="new111">';
                     
                   //  table.append(htmlheader);

                     var fragment = document.createDocumentFragment(), tr, td, i, il, key;
                     for (i = 0, il = data.length; i < il; i++) {
                         tr = document.createElement('tr');
                         htmlheader +='<tr>';
                         for (key in data[i]) {
                             td = document.createElement('td');
                             td.appendChild(document
                                     .createTextNode(data[i][key]));
                             tr.appendChild(td);
                             htmlheader +='<td>'+data[i][key]+'</td>';
                         }
                         fragment.appendChild(tr);
                         htmlheader +='</tr>';
                     }
                     //$('#Tbl_Exceldata tbody').append(fragment);
                   // $('#new111').append(fragment);
                    // htmlheader +=fragment;
                     htmlheader +='</tbody></table>'
                     
                     //$("#loader_jswfileupload").hide();

                    $("#ajaxloader").hide();
                    $('#Exceldata').append(htmlheader);
                    $('#Tbl_Exceldata').dataTable({scrollX:true});
                }
            });
        }
        catch (e) {
            alert("Error is" + e);
        }
    }
    //==========Clear Functions Starting
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
    //===============================Clear Functions
});//Controller Closing
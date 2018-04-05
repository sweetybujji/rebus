var rowid = "";
RapidApp.service("AssetDataSource", function ($http) {
    this.LoactionDataSource = function () {
        return $http.get("/AssetDataSource").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding AssetDataSource.");
        });
    }
    this.getAssetdata = function () {
        return $http.get("/getAssetdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding locationdata.");
        });
    }
    this.getTreeAssetdata = function () {
        return $http.get("/getTreeAssetdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding locationdata.");
        });
    }
          this.createAsset = function (locdata) {
          return $http.post("/CreateAssetdata", locdata).
            then(function (response) {
            return response;
        }, function (response) {
            alert("Error creating Asset data.");
        });
    }
    this.checkdistinctassets = function (locdata) {
        return $http.post("/checkdistinctassets", locdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error creating Asset data.dfgsdfgsdfg");
        });
    }
    this.UpdateAssetdata = function (locdata) {
        var locdataupdate = JSON.parse(locdata);
        var url = "/UpdateAssetdata/" + (locdataupdate[0].Asset_id);
        // console.log(contact._id);
        return $http.put(url, locdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error editing this Asset data.");
            //console.log(response);
        });
    }
    this.DeleteAssetdata = function (Assetdataobj1) {
    	//alert(JSON.stringify(Assetdataobj1));
        //var locdataupdate = JSON.parse(locdata);
        var Assetdataobj = JSON.parse(Assetdataobj1);
        var url = "/DeleteAssetdata/" + (Assetdataobj[0].Asset_id);
        return $http.put(url, Assetdataobj1).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error editing this Asset data.");
        });
    }
})

RapidApp.controller('AssetController', function PostsController($scope, $state, $stateParams, AssetDataSource, LoactionDataSource) {
    rowid = "";
    
    if ($stateParams.type == "edit") {
       // alert($stateParams.Asset_id);
         $("#txt_AssetId").val($stateParams.AssetId);
         $("#txt_AssetName").val($stateParams.AssetName);
         $("#txt_AssetLoc").val($stateParams.AssetLocName);
         $("#txt_ParentAsset").val($stateParams.ParentAsset);
        $("#assetupdateid").val($stateParams.Asset_id);
        $("#assetlocationupdateid").val($stateParams.AssetLocId);
    }
    $scope.AssetData = [];
    $scope.loading = true;
    $scope.addMode = false;
    
    $scope.toggleEdit = function () {
        this.Asset.editMode = !this.Asset.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();
    };
    $scope.clearvalues = function () {
        $("#txt_AssetLoc").val("");
        $("#txt_ParentAsset").val("");
        $("#txt_Assetscrurl").val("");
    }
    //check active value
    $("#chk_active").click(function () {
        if ($("#chk_active").is(':checked'))
            $("#chk_active").val("True");
        else
            $("#chk_active").val("False");
    });
    
    $('.errmsg').delay(10000).fadeOut('slow');

    $('#assetstblbody').on('click', 'tr', function () {

       
        $(this).find('td').each(function () {
            //alert($(this).attr("ddata"));
            if ($(this).attr("ddata") != undefined) {
                // alert($(this).text());
                rowid = $(this).text();

                $stateParams.type = "edit";
                var Assets = JSON.parse(rowid);
               // alert(JSON.stringify(Assets));
                $stateParams.AssetId = Assets.AssetId;
                $stateParams.AssetName = Assets.AssetName;
                $stateParams.Asset_id = Assets.ID;
                $stateParams.AssetLocId = Assets.AssetLocId;
                $stateParams.AssetLocName = Assets.AssetLocName;
                $stateParams.ParentAsset = Assets.ParentAsset;
                
            }

        });
         // alert(rowid);
        $('#assetstblbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });
    $scope.getAssets = function () {

        var assettreedata = [];
        var locationtreedata = [];
        var jsonObj = [];
        
        LoactionDataSource.getLocationdata().then(function (data) {
            //console.log(JSON.stringify(data));
            //$scope.LocationData = [];
            //$scope.LocationData = data.data;
            //$scope.loading = false;
             locationtreedata = data.data;
            //alert(treedata.length);
            for (var i = 0; i < locationtreedata.length; i++) {
                var ParentLocationId = locationtreedata[i]["ParentLocationId"];
                if (ParentLocationId == "0") {
                    ParentLocationId = "#";
                }
                jsonObj.push({
                    id: locationtreedata[i]["LocationId"],
                    text: locationtreedata[i]["LocationName"],
                    parent: ParentLocationId,
                    icon: "/Analytics/Images/OPC_Icons/locationicon1.png"
                });
            };
            AssetDataSource.getAssetdata().then(function (data) {
               
                $scope.AssetData = [];
                $scope.AssetData = data.data;
                //$('#assetstbl123').DataTable().destroy();

                //setInterval(function () { $('#assetstbl123').DataTable(); }, 100);
                setTimeout(function () {
                    // alert("ss");
                    $('#assetstbl123').DataTable().destroy();
                    $('#assetstbl123').DataTable({

                        //scrollX: '123.5vh',
                        //scrollCollapse: true,
                    });
                }, 100);
                $scope.loading = false;
                assettreedata = data.data;
                //var jsonObj = [];
                //alert(treedata.length);
                for (var i = 0; i < assettreedata.length; i++) {
                    var ParentAsset = assettreedata[i]["ParentAsset"];
                    if (ParentAsset == "0") {
                        ParentAsset = assettreedata[i]["AssetLocId"];
                    }
                    jsonObj.push({
                        id: assettreedata[i]["AssetId"],
                        text: assettreedata[i]["AssetName"],
                        parent: ParentAsset,
                        icon: "/Analytics/Images/OPC_Icons/AssetIcon1.png"
                    });
                }
                
                
                $("#Assethierarchy_tree").jstree("destroy");
                //alert(JSON.stringify(jsonObj));
                $('#Assethierarchy_tree').bind('loaded.jstree', function (e, data) {
                    data.instance.open_all();
                }).jstree({
                    'core': {
                        'data': jsonObj,
                        'use_data': true,
                        "load_open": true
                    },
                    "sort": function (a, b) {
                        return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                    }
                }).on('select_node.jstree', function (e, data) {
                    var loMainSelected = jsonObj;
                    var parents = loMainSelected.node.parents;
                    var seletednode = loMainSelected.node.id;
                });
            }, function (response) {
                $scope.error = "An Error has occured while loading Location Data!! ";
                $scope.loading = false;
            });

        }, function (response) {
            $scope.error = "An Error has occured while loading Location Data!! ";
            $scope.loading = false;
        });
    };
    
    $scope.getAssets();
    
    //add customer
    $scope.AddAsset = function () {

        if ($stateParams.type == "new" && $("#txt_AssetId").val().length > 0 && $("#txt_AssetName").val().length > 0 ) {
            $scope.loading = true;
            var Assetdataobj = new Array();
            var AssetId = $("#txt_AssetId").val();
            var AssetName = $("#txt_AssetName").val();
            var AssetLocId = $("#txt_AssetLoc").data('assetlocid');
            var AssetLocName = $("#txt_AssetLoc").val();
            var ParentAsset = $("#txt_ParentAsset").val();
            if (ParentAsset == "") {
                ParentAsset = "0";

            }
            Assetdataobj.push({
                "AssetId": AssetId,
                "AssetName": AssetName,
                "AssetLocId": AssetLocId,
                "AssetLocName": AssetLocName,
                "ParentAsset": ParentAsset
            });
            var Save_Assetdata = JSON.stringify(Assetdataobj);
            AssetDataSource.checkdistinctassets(Save_Assetdata).then(function (doc) {
                var distinctdata = doc.data;
                // alert(distinctdata.length);
                if (distinctdata.length > 0) {
                    alert("Same Asset Id and Asset Name Already Exists !!");
                    $scope.error = "Same Asset Id and Asset Name Already Exists !! ";
                }
                else {
                    AssetDataSource.createAsset(Save_Assetdata).then(function (doc) {
                        $scope.getAssets();
                        $scope.addMode = false;
                        $scope.clearvalues();
                    }, function (response) {
                        $scope.error = "An Error has occured while loading Asset Data!! ";
                        $scope.loading = false;
                    });
                }
            }, function (response) {
                $scope.error = "An Error has occured while loading Asset Data!! ";
                $scope.loading = false;
            });
             $("#txt_AssetId").val("");
             $("#txt_AssetName").val("");
        }
        if ($stateParams.type == "edit" && $("#txt_AssetId").val().length > 0 && $("#txt_AssetName").val().length > 0 ) {

            $scope.loading = true;
            var Assetdataobj = new Array();
            var AssetId = $("#txt_AssetId").val();
            var AssetName = $("#txt_AssetName").val();
            var Asset_id = $("#assetupdateid").val();
            var AssetLocId = $("#assetlocationupdateid").val();
            var AssetLocName = $("#txt_AssetLoc").val();
            var ParentAsset = $("#txt_ParentAsset").val();
            Assetdataobj.push({
                "AssetId": AssetId,
                "AssetName": AssetName,
                "AssetLocId": AssetLocId,
                "AssetLocName": AssetLocName,
                "ParentAsset": ParentAsset,
                "Asset_id": Asset_id
            });
            //   alert(JSON.stringify(Assetdataobj));
            //Assetdataobj.push({
            //    "Id": RowId,
            //    "AssetId": AssetId,
            //    "AssetName": AssetName,
            //    "Asset_id": Asset_id
            //});
            var Assetdata = JSON.stringify(Assetdataobj);
            AssetDataSource.UpdateAssetdata(Assetdata).then(function (data) {
                //$scope.error = data;
                Asset.editMode = false;
                $scope.loading = false;
            }, function (response) {
                $scope.error = "An Error has occured while loading Asset Data!! ";
                $scope.loading = false;
            });
            $scope.getAssets();
            $("#txt_AssetId").val("");
            $("#txt_AssetName").val("");
            $("#txt_AssetLoc").val("");
            $("#txt_ParentAsset").val("");
            $state.go($state.current, {
                "type": 'new',
                "AssetId": '',
                "AssetName": '',
                "Asset_id": '',
                "AssetLocId": '',
                "AssetLocName": '',
                "ParentAsset": '',
            }, { reload: true });
        }
        //else
        //{
        //    if ($("#txt_AssetId").val().length == 0 && $("#txt_AssetName").val().length == 0) {
        //        $("#er_txt_AssetId").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_AssetId").show();
        //        $("#er_txt_AssetName").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_AssetName").show();
        //        $("#er_txt_ParentAsset").html("<b>Parent Asset !!</b> Input is required");
        //        $("#er_txt_ParentAsset").show();
        //    }

        //    else if ($("#txt_AssetId").val().length == 0)
        //    {
        //        $("#er_txt_AssetId").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_AssetId").show();
        //        $("#er_txt_AssetName").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_AssetName").hide();
        //        $("#er_txt_ParentAsset").html("<b>Parent Asset !!</b> Input is required");
        //        $("#er_txt_ParentAsset").hide();
               
        //    }
        //    else if ($("#txt_AssetName").val().length == 0) {
        //        $("#er_txt_AssetId").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_AssetId").hide();
        //        $("#er_txt_AssetName").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_AssetName").show();
        //        $("#er_txt_ParentAsset").html("<b>Parent Asset !!</b> Input is required");
        //        $("#er_txt_ParentAsset").hide();

        //    }
        //    else if ($("#txt_ParentAsset").val().length == 0) {
        //        $("#er_txt_AssetId").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_AssetId").hide();
        //        $("#er_txt_AssetName").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_AssetName").hide();
        //        $("#er_txt_ParentAsset").html("<b>Parent Asset !!</b> Input is required");
        //        $("#er_txt_ParentAsset").show();

        //    }
        //}
   
    };
    //update customer
        $scope.update = function () {
            if (rowid != "") {
                //$scope.addMode = true;
                //var loc = JSON.parse(rowid);
                // alert("ss");
                bootbox.confirm("Do You want to Edit " + $stateParams.AssetName + " Record?", function (result) {
                    if (result) {
                        $state.go('ManageAssets', {
                            "type": 'edit',
                            "AssetId": '' + $stateParams.AssetId + '',
                            "AssetName": '' + $stateParams.AssetName + '',
                            "Asset_id": '' + $stateParams.Asset_id + '',
                            "AssetLocId": '' + $stateParams.AssetLocId + '',
                            "AssetLocName": '' + $stateParams.AssetLocName + '',
                            "ParentAsset": '' + $stateParams.ParentAsset + '',
                        });
                        rowid = "";
                        //$("#txt_locid").val($stateParams.LocationId);
                        //$("#txt_locname").val($stateParams.LocationName);
                        //$("#txt_locparentid").val($stateParams.ParentLocationId);
                        //$("#txt_locdesc").val($stateParams.Description);
                        //$("#locupdateid").val($stateParams.loc_id);
                        //  $("#locupdate").css("display", "none");
                    }
                });
            }
            else {
                fn_errorNotification("200", "", "", "Please select row to edit", "error_alert", "", "");
               // alert("Please select row");
            }
    //    $scope.loading = true;
    //    var Assetdataobj = new Array();
    //    var AssetId = Asset.AssetId;
    //    var AssetName = Asset.AssetName;
    //    var Asset_id = Asset._id;
    //    var AssetLocId = Asset.AssetLocId;
    //    var AssetLocName = Asset.AssetLocName;
    //    var ParentAsset = Asset.ParentAsset; 
    //    Assetdataobj.push({
    //        "AssetId": AssetId,
    //        "AssetName": AssetName,
    //        "AssetLocId": AssetLocId,
    //        "AssetLocName": AssetLocName,
    //        "ParentAsset": ParentAsset,
    //        "Asset_id": Asset.ID
    //    });
    //    //Assetdataobj.push({
    //    //    "Id": RowId,
    //    //    "AssetId": AssetId,
    //    //    "AssetName": AssetName,
    //    //    "Asset_id": Asset_id
    //    //});
    //    var Assetdata = JSON.stringify(Assetdataobj);
    //    AssetDataSource.UpdateAssetdata(Assetdata).then(function (data) {
    //        //$scope.error = data;
    //        Asset.editMode = false;
    //        $scope.loading = false;
    //    }, function (response) {
    //        $scope.error = "An Error has occured while loading Asset Data!! ";
    //        $scope.loading = false;
    //    });
    //    $scope.getAssets();
    };
    // delete Customer
    $scope.deleteAssetdata = function () {
        if (rowid != "") {
            var Asset = JSON.parse(rowid);
            bootbox.confirm("Do You want to Delete " + Asset.AssetName + " Record?", function (result) {
                if (result) {
                   
                    $scope.loading = true;
                    var AssetId = Asset.AssetId;
                    var AssetName = Asset.AssetName;
                    var AssetLocId = Asset.AssetLocId;
                    var AssetLocName = Asset.AssetLocName;
                    var ParentAsset = Asset.ParentAsset;
                    var Asset_id = Asset.ID;
                    var Assetdataobj = [];
                    Assetdataobj.push({
                        "AssetId": AssetId,
                        "AssetName": AssetName,
                        "AssetLocId": AssetLocId,
                        "AssetLocName": AssetLocName,
                        "ParentAsset": ParentAsset,
                        "Asset_id": Asset.ID
                    });
                    var Assetdataobj1 = JSON.stringify(Assetdataobj);
                    AssetDataSource.DeleteAssetdata(Assetdataobj1).then(function (data) {
                        //$scope.error = data
                       
                        $.each($scope.AssetData, function (i) {
                            if ($scope.AssetData[i]._id === Asset_id) {
                                $scope.AssetData.splice(i, 1);
                                return false;
                            }
                        });
                        $scope.loading = false;
                        $state.go($state.current, {}, { reload: true });
                        //}).error(function (data) {
                        //    $scope.error = "An Error has occured while Deleting Asset Data! " + data.ExceptionMessage;
                        //    $scope.loading = false;

                        //});
                    }, function (response) {
                        $scope.error = "An Error has occured while Deleting Asset Data!";
                        $scope.loading = false;
                    });
                    rowid = "";
                    $scope.getAssets();
                }
            });
        }
        else
        {
            fn_errorNotification("200", "", "", "Please select row to delete", "error_alert", "", "");
           // alert("Please select row");
        }
    };
    $scope.gotoGroups = function (Asset) {
        window.location.href = '../../Asset/GroupCreate/?Assetid=' + encodeURIComponent(Asset.Id) + '&Assetname=' + encodeURIComponent(Asset.AssetServerName) + '';
    }
    $scope.gotoAssetexcel = function () {
        window.location.href = '../../Asset/ImportExcelFile/';
    }
    $scope.gotometerexcel = function () {
        window.location.href = '../../Asset/ImportMeterFile/';
    }
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    
    $scope.showloclistpopup = function () {
        LoactionDataSource.getTreeLocationdata().then(function (data) {
            //$scope.LocationPopupData = data;
            //var htmltbl = "";
            //for (var i = 0; i < data.length; i++) {
            //    htmltbl += "<tr onclick='getparentdetails(this)'><td>" + data[i]["LocationId"] + "</td><td>" + data[i]["LocationName"] + "</td></tr>";
            //}
        	
            var distinctlocdata = data.data;
            var htmltbl = "";
            for (var i = 0; i < distinctlocdata.length; i++) {
                htmltbl += "<tr onclick='getparentdetails(this)'><td>" + distinctlocdata[i]["LocationId"] + "</td><td>" + distinctlocdata[i]["LocationName"] + "</td></tr>";
            }
            $("#locationpopuplisttbl tbody").html(htmltbl);
            $("#locationpopuplisttbl").dataTable();
            $scope.loading = false;
            var element = angular.element("#myModalforLocList");
            element.modal('show');
            //$("#myModalforLocList").modal('show');
        }, function (response) {
            $scope.error = "An Error has occured while loading Location Data!! ";
            $scope.loading = false;
        });
    };
    
    
    $scope.showparentassetpopup = function () {
        AssetDataSource.getTreeAssetdata().then(function (data) {
            //$scope.LocationPopupData = data;
            
            var distinctassetdata = data.data;
            //alert(distinctassetdata);
            var htmltbl = "";
            for (var i = 0; i < distinctassetdata.length; i++) {
                htmltbl += "<tr onclick='getparentassetdetails(this)'><td>" + distinctassetdata[i]["AssetId"] + "</td><td>" + distinctassetdata[i]["AssetName"] + "</td></tr>";
            }
            
            $("#parentastpopuplisttbl tbody").html(htmltbl);
            $("#parentastpopuplisttbl").DataTable();
            $scope.loading = false;
         /*  var element = angular.element("#myModalforparentast");
            element.modal('show')*/
            $("#myModalforparentast").modal('show');
            
        }, function (response) {
            $scope.error = "An Error has occured while loading Assets Data!! ";
            $scope.loading = false;
        });
    };
     $("#locationpopuplisttbl tbody").on('click', 'tr', function () {
    	// alert($(this).html());
    	    $("#txt_AssetLoc").data('assetlocid', $(this).find("td:eq(0)").html());
    	    $("#txt_AssetLoc").val($(this).find("td:eq(1)").html());
    	  
    	   $('#myModalforLocList').modal('hide');
     });
    
    $scope.loclistmodalhide = function () {
    	alert();
        /*var element = angular.element('#myModalforLocList');
        element.modal('hide');*/
    	$("#myModalforLocList").modal('hide');
    
    
    }
});

/*function getparentdetails(obj) {
    $("#txt_AssetLoc").data('assetlocid', $(obj).find("td:eq(0)").html());
    $("#txt_AssetLoc").val($(obj).find("td:eq(1)").html());
    //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
    var element = angular.element('#myModalforLocList');
    element.modal('hide');
}*/

function getparentassetdetails(obj) {
    // $("#txt_ParentAsset").data('ParentAssetId', $(obj).find("td:eq(0)").html());
    $("#txt_ParentAsset").val($(obj).find("td:eq(0)").html());
    //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
   /* var element = angular.element('#myModalforparentast');
    element.modal('hide');*/
    
    $("#myModalforparentast").modal('hide');
}
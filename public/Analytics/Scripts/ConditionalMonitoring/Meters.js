/**
 * New node file
 */
var rowid = "";
RapidApp.service("MetersService", function ($http) {
    
    this.getAssetdata = function () {
        
        return $http.get("/getAssetdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding Assetdata.");
        });
    }
    this.getTagdata = function () {
        
        return $http.get("/gettagdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding tagdata.");
        });
    }
    this.getVTagdata = function () {
        
        return $http.get("/getVtagdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding tagdata.");
        });
    }
    
    this.getMetersdata = function () {
        
        return $http.get("/getMeterdata").
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error finding Meterdata.");
        });
    }
    this.createMeter = function (meterdata) {
        
        return $http.post("/postMeterdadta", meterdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error creating Meter Data.");
        });
    }
    this.UpdateMeter = function (meterdata) {
        var meterupdate = JSON.parse(meterdata);
       // alert(meterupdate[0].ID);
        var url = "/UpdateMeterdata/" + (meterupdate[0].ID);
        
        return $http.put(url, meterdata).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error editing this Meterdata.");
            console.log(response);
        });
    }
    
    this.DeleteMeter = function (delmeterid) {
        
        var url = "/DeleteMeterdata/" + delmeterid;
        return $http.delete(url).
                then(function (response) {
            return response;
        }, function (response) {
            alert("Error deleting this Meterdata.");
            console.log(response);
        });
    }
})


RapidApp.controller("MeterController", function (MetersService, $scope, $state, $stateParams, $location, LoactionDataSource, AssetDataSource) {
    //alert("ss");
    rowid = "";

   
    if ($stateParams.type == "edit") {
        console.log(JSON.stringify($stateParams.data));
        var data = $stateParams.data;
      //  alert($("#chk_sync").is(":checked"));
        //alert(data.AssetId);
        $("#txt_astid").val(data.AssetId);
        $("#txt_astname").val(data.AssetName);
        if (data.SynctoServer == "on") {
            //alert();
            $("#chk_sync").prop('checked', true);
        }
        else {
            $("#chk_sync").prop('checked', false);
        }
        $("#txt_metrid").val(data.MeterId);
        $("#txt_metername").val(data.Metername);
        $("#txt_mtralisname").val(data.MeterAliasName);
        $("#txt_mtrdesc").val(data.Meterdescription);
        $("#txt_mtrtype").val(data.MeterType);
        $("#txt_frq").val(data.Frequency);
        
        $("#txt_updateid").val(data._id);
      
    }
    $scope.MeterData = [];
    $scope.loading = true;
    $scope.addMode = false;
    
    $scope.toggleEdit = function () {
        this.meter.editMode = !this.meter.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();

    };
    $scope.clearvalues = function () {
        //get all OPCNames
        
        $('#chk_sync').attr('checked', false);
        $("#txt_metrid").val("");
        $("#txt_metername").val("");
        $("#txt_mtralisname").val("");
        $("#txt_mtrdesc").val("");
        $("#txt_mtrtype").val("");
        $("#txt_frq").val("");
        $("#txt_mtraliasid").val("");
        $("#txt_tagname").val("");
        $("#txt_astid").val("");
        $("#txt_astname").val("");

    }
    //check active value
    $("#chk_sync").click(function () {
        if ($("#chk_sync").is(':checked'))
            $("#chk_sync").val("True");
        else
            $("#chk_sync").val("False");

    });
    
    
    $('.errmsg').delay(10000).fadeOut('slow');
    
    MetersService.getMetersdata().then(function (doc) {
    	//alert(JSON.stringify(doc.data));
    	
        $scope.MeterData = doc.data;
    }, function (response) {
      
    });
    
    
    $scope.AddMeter = function () {
        if ($stateParams.type == "new" && $("#txt_astid").val().length > 0 && $("#txt_astname").val().length > 0 && $("#txt_metrid").val().length > 0 && $("#txt_metername").val().length > 0 && $("#txt_mtrtype").val().length > 0) {
            $scope.loading = true;
            var MeterObj = new Array();
            var AssetID = $("#txt_astid").val();
            var Assetname = $("#txt_astname").val();
            var MeterID = $("#txt_metrid").val();
            var Metername = $("#txt_metername").val();
            var MeterAliasname = $("#txt_mtralisname").val();
            var MeterDesc = $("#txt_mtrdesc").val();
            var Metertype = $("#txt_mtrtype").val();
            var Freq = $("#txt_frq").val();
            var uom = $("#txt_time").val();
            var aliasid = $("#txt_mtraliasid").val();
            var tagname = $("#txt_tagname").val();
            var syntoserver="";
            if ($("#chk_sync").prop("checked") == true) {
                syntoserver = "on"
            }
            else
            {
                syntoserver = "off"
            }
            var Tagopcid = $("#txt_tagname").attr("data-tagopcid");
            if (AssetID == "") {
                $scope.error = "Please Enter Asset ID";
            } else if (Assetname == "") {
                $scope.error = "Please Enter Asset Name";
            }
            else if (MeterID == "") {
                $scope.error = "Please Enter Meter ID";
            }
            else if (Metername == "") {
                $scope.error = "Please Enter Meter Name";
            }
            else {
                MeterObj.push({
                    "MeterId": MeterID,
                    "Metername": Metername,
                    "MeterAliasName": MeterAliasname,
                    "Meterdescription": MeterDesc,
                    "MeterType": Metertype,
                    "Frequency": Freq,
                    "UOM": uom,
                    "MetereAliasID": aliasid,
                    "MaterTagname": tagname,
                    "SynctoServer": syntoserver,
                    "AssetId": AssetID,
                    "AssetName": Assetname,
                    "TagOPCId": Tagopcid
                });
                var Save_Meterdata = JSON.stringify(MeterObj);
                //alert(Save_Meterdata);
                MetersService.createMeter(Save_Meterdata).then(function (doc) {

                }, function (response) {
                    $scope.loading = false;
                });
                $scope.error = "Meters Data Created";
                $scope.addMode = false;
                $scope.loading = false;
                MetersService.getMetersdata().then(function (doc) {
                    $scope.MeterData = doc.data;

                }, function (response) {

                });

                $scope.GetMetersData();
            }
            $scope.clearvalues();
        }
        if ($stateParams.type == "edit" && $("#txt_astid").val().length > 0 && $("#txt_astname").val().length > 0 && $("#txt_metrid").val().length > 0 && $("#txt_metername").val().length > 0 && $("#txt_mtrtype").val().length > 0) {

            $scope.loading = true;
            

            var MeterObj = new Array();

            var MeterAliasname = $("#txt_mtralisname").val();
            var MeterDesc = $("#txt_mtrdesc").val();
            var Metertype = $("#txt_mtrtype").val();
            var Freq = $("#txt_frq").val();
            var uom = $("#txt_time").val();
            var syntoserver = "";

            if ($("#chk_sync").prop('checked') == true) {
                syntoserver = "on";
            }
            else {
                syntoserver = "off";
            }

            var ID = $("#txt_updateid").val();

            MeterObj.push({

                "MeterAliasName": MeterAliasname,
                "Meterdescription": MeterDesc,
                "MeterType": Metertype,
                "Frequency": Freq,
                "UOM": uom,
                "SynctoServer": syntoserver,
                "ID": ID
            });

            var MeterData = JSON.stringify(MeterObj);
            //  alert(MeterData);
            MetersService.UpdateMeter(MeterData).then(function (doc) {
                $scope.error = "Meters Data Created";
                meter.editMode = false;
                $scope.loading = false;
            }, function (response) {

                $scope.loading = false;
            });
            $scope.clearvalues();
            $state.go($state.current, {
                "type": 'new',
                "data": '',
            }, { reload: true });
        }
        //else
        //{
        //    if ($("#txt_astid").val().length == 0 && $("#txt_astname").val().length == 0 && $("#txt_metrid").val().length == 0 && $("#txt_metername").val().length == 0 && $("#txt_mtrtype").val().length == 0) {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").show();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").show();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").show();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").show();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").show();

        //    }
        //    else if ($("#txt_astid").val().length == 0)
        //    {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").show();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").hide();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").hide();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").hide();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").hide();
        //    }
        //    else if ($("#txt_astname").val().length == 0) {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").hide();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").show();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").hide();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").hide();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").hide();
        //    }
        //    else if ($("#txt_metrid").val().length == 0) {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").hide();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").hide();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").show();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").hide();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").hide();
        //    }
        //    else if ($("#txt_metername").val().length == 0) {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").hide();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").hide();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").hide();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").show();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").hide();
        //    }
        //    else if ($("#txt_mtrtype").val().length == 0) {
        //        $("#er_txt_astid").html("<b>Asset Id !!</b> Input is required");
        //        $("#er_txt_astid").hide();
        //        $("#er_txt_astname").html("<b>Asset Name !!</b> Input is required");
        //        $("#er_txt_astname").hide();
        //        $("#er_txt_metrid").html("<b>Meter Id !!</b> Input is required");
        //        $("#er_txt_metrid").hide();
        //        $("#er_txt_metername").html("<b>Meter Name !!</b> Input is required");
        //        $("#er_txt_metername").hide();
        //        $("#er_txt_mtrtype").html("<b>Meter Type !!</b> Input is required");
        //        $("#er_txt_mtrtype").show();
        //    }
        //   // fn_errorNotification("200", "", "", "Please enter all mandatory fields", "error_alert", "", "");
        //}
    };
    
    $scope.Metersupdate = function () {
        if (rowid != "")
        {
            var data = $stateParams.data;
            bootbox.confirm("Do You want to Edit "+data.Metername+" Record?", function (result) {
                if (result) {
                    $state.go('ManageMeters', {
                        "type": 'edit',
                        "data": $stateParams.data,
                    });

                    rowid = "";
                }
            });
        }
        else
        {
            fn_errorNotification("200", "", "", "Please select row to edit", "error_alert", "", "");
            //alert("please select row");
        }
        //$scope.loading = true;
        
        
        //var MeterObj = new Array();
        
        //var MeterAliasname = meter.MeterAliasName;
        //var MeterDesc = meter.Meterdescription;
        //var Metertype = meter.MeterType;
        //var Freq = meter.Frequency;
        //var uom = meter.UOM;
        //var syntoserver = meter.SynctoServer;
        //var ID = meter._id
        //MeterObj.push({
            
        //    "MeterAliasName": MeterAliasname,
        //    "Meterdescription": MeterDesc,
        //    "MeterType": Metertype,
        //    "Frequency": Freq,
        //    "UOM": uom,          
        //    "SynctoServer": syntoserver,         
        //    "ID": ID
        //});
        
        //var MeterData = JSON.stringify(MeterObj);
        //MetersService.UpdateMeter(MeterData).then(function (doc) {
        //    $scope.error = "Meters Data Created";
        //    meter.editMode = false;
        //    $scope.loading = false;
        //}, function (response) {
            
        //    $scope.loading = false;
        //});
    };
    
    $scope.assetmodaldata = function () {
        
        $('#Assetdatamodal').modal('show')
        
        MetersService.getAssetdata().then(function (doc) {
            
            
            $("#asst_tbl").dataTable().fnDestroy();
            var response = (doc.data)
            var htmldata = '';
            $('#assettbody').empty();
            for (var i = 0; i < response.length; i++) {
                htmldata += '<tr onclick="getAssetdetails(this)">';
                htmldata += ' <td>' + response[i]["_id"] + '</td>';
                htmldata += '<td>' + response[i]["AssetId"] + '</td>';
                htmldata += '<td>' + response[i]["AssetName"] + '</td>';
                htmldata += '</tr>';
            }
            
            $('#assettbody').append(htmldata);
            
            $('#asst_tbl').DataTable();
               
        }, function (response) {
      
        });



    }
    
    $scope.tagmodaldata = function () {
        
        $('#Tagsdatamodal').modal('show')
        
        MetersService.getTagdata().then(function (doc) {
            
            $("#tags_tbl").dataTable().fnDestroy();
            var response = (doc.data)
            var htmldata = '';
            $('#tagnestbody').empty();
            for (var i = 0; i < response.length; i++) {
                htmldata += '<tr  onclick="gettagdetails(this)">';
                htmldata += ' <td>' + response[i]["_id"] + '</td>';
                htmldata += '<td>' + response[i]["TAGNAME"] + '</td>';
                htmldata += '<td>' + response[i]["TAGALIAS"] + '</td>';
                htmldata += '<td style="display:none;">' + response[i]["OPCID"] + '</td>';
                htmldata += '</tr>';
            }
            
            $('#tagnestbody').append(htmldata);
            
            $('#tags_tbl').DataTable();
               
        }, function (response) {
      
        });



    }
    
    $scope.Vtagmodaldata = function () {
        
        $('#VTagsdatamodal').modal('show')
        
        MetersService.getVTagdata().then(function (doc) {
            
            $("#Vtags_tbl").dataTable().fnDestroy();
            var response = (doc.data)
            var htmldata = '';
            $('#Vtagnestbody').empty();
            for (var i = 0; i < response.length; i++) {
                htmldata += '<tr  onclick="getVtagdetails(this)">';
                htmldata += ' <td>' + response[i]["_id"] + '</td>';
                htmldata += '<td>' + response[i]["VTagName"] + '</td>';
                
                htmldata += '</tr>';
            }
            
            $('#Vtagnestbody').append(htmldata);
            
            $('#Vtags_tbl').DataTable();
               
        }, function (response) {
      
        });



    }
    
    $scope.deletemeterdata = function () {
        if (rowid != "") {
            var meter = JSON.parse(rowid);
            bootbox.confirm("Do You want to Delete "+meter.Metername+" Record?", function (result) {
                if (result) {
                    var meter = JSON.parse(rowid);
                    var Meterid = meter._id;
                    MetersService.DeleteMeter(Meterid)
                    MetersService.getMetersdata().then(function (doc) {
                        $scope.MeterData = doc.data;
                    }, function (response) {

                    });
                    rowid = "";
                    $state.go($state.current, {}, { reload: true });
                }
            });
        }
        else
        {
            fn_errorNotification("200", "", "", "Please select row to delete", "error_alert", "", "");
          //  alert("Please select row");
        }
       
    }
    
    $('#meterstblbody').on('click', 'tr', function () {

         // rowid = $(this).attr("ddata");
        $(this).find('td').each(function () {
            if ($(this).attr("ddata") != undefined) {
                // alert($(this).text());
                rowid = $(this).text();
                $stateParams.type = "edit";
                var meters = JSON.parse(rowid);
                $stateParams.data = meters;
                //$stateParams.LocationName = loc.LocationName;
                //$stateParams.ParentLocationId = loc.ParentLocationId;
                //$stateParams.Description = loc.Description;
                //$stateParams.loc_id = loc.Id;

            }

        });
        //  alert(rowid);
        $('#meterstblbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });
    
    $scope.GetMetersData=function(){
    	
    	
    	
    	 var assettreedata = [];
         var locationtreedata = [];
         var meterstreedata=[];
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
                 //console.log(JSON.stringify(data));
             //	alert(JSON.stringify(data.data))
             	
                 $scope.AssetData = [];
                 $scope.AssetData = data.data;
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
                 
                 MetersService.getMetersdata().then(function(data){
                	 
                	 
                	 $scope.MeterData = [];
                	 $scope.MeterData = data.data;
                	 meterstreedata = data.data;
                	 //$('#meterstbl123').DataTable().destroy();
                	 //setInterval(function () { $("#meterstbl123").DataTable(); }, 100);
                	 setTimeout(function () {
                	     // alert("ss");
                	     $('#meterstbl123').DataTable().destroy();
                	     $('#meterstbl123').DataTable({
                	        
                	         //scrollX: true,
                	         //scrollCollapse: true,
                	     });
                	 }, 100);
                	 
                     for (var i = 0; i < meterstreedata.length; i++) {
                         var ParentAsset = meterstreedata[i]["AssetId"];
//                         if (ParentAsset == "0") {
//                             ParentAsset = assettreedata[i]["AssetLocId"];
//                         }
                         jsonObj.push({
                             id: meterstreedata[i]["MeterId"],
                             text: meterstreedata[i]["Metername"],
                             parent: ParentAsset,
                             icon: "/Analytics/Images/OPC_Icons/metericon1.png"
                         });
                     }
                	 
                      //alert(JSON.stringify(jsonObj));
                     
                     $("#Meterhierarchy_tree").jstree("destroy");
                     //alert(JSON.stringify(jsonObj));
                     $('#Meterhierarchy_tree').bind('loaded.jstree', function (e, data) {
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
                 })

             }, function (response) {
                 $scope.error = "An Error has occured while loading Location Data!! ";
                 $scope.loading = false;
             });
             
             
             

         }, function (response) {
             $scope.error = "An Error has occured while loading Location Data!! ";
             $scope.loading = false;
         });
    }
    
    $scope.GetMetersData();
    
})
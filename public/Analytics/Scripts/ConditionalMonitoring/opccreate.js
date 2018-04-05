var rowid = "", rowidtags = "";
RapidApp.service("OPCDataService", function ($http) {
    this.getOpcdatasource = function () {
        return $http.get("/OPCDataSource").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding OPCDataSource.");
                });
    }
    this.getOpcdata = function () {
        return $http.get("/getOPCdata").
                then(function (response) {
                    //alert("ss");
                 
                    return response;
                }, function (response) {
                   
                    alert("Error finding opcdata.");
                });
    }
    this.createOPC = function (opcdata) {

        return $http.post("/getOPCdata", opcdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating opcdata.");
                });
    }
    this.UpdateOPC = function (opcdata) {
        var opcupdate = JSON.parse(opcdata);
        var url = "/UpdateOpcdata/" + (opcupdate[0].OPCserverid);
        // console.log(contact._id);
        return $http.put(url, opcdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing this opcdata.");
                    console.log(response);
                });
    }
    this.DeleteOPC = function (delopcid) {

        var url = "/DeleteOpcdata/" + delopcid;
        return $http.delete(url).
                then(function (response) {
                    if (response.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                   
                    return response;
                }, function (response) {
                    alert("Error deleting this opcdata.");
                    console.log(response);
                });
    }

    this.SelectOPC = function (Opc_RowId) {

        var url = "/SelectOpcdata/" + Opc_RowId;
        return $http.post(url).
                then(function (response) {
                  
                    return response;
                }, function (response) {
                    alert("Error getting data from opcdata.");
                    console.log(response);
                });
    }
});

RapidApp.service("GroupService", function ($http) {

    this.getgroupdata = function (grpopcdata) {

        return $http.post("/getGroupdetails", grpopcdata).
                then(function (response) {
                   
                    return response;
                }, function (response) {
                    alert("Error finding Groupdata.");
                });
    }
    this.DeleteGroup = function (delogrpid) {

        var url = "/DeleteGroupdata/" + delogrpid;
        return $http.delete(url).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error deleting this opcdata.");
                    console.log(response);
                });
    }
    this.getAllgroupdata = function () {

        return $http.get("/getAllGroupdetails").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding Groupdata.");
                });
    }
    this.createGroup = function (grpdata) {

        return $http.post("/getGroupdata", grpdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating groupdata.");
                });
    }
    this.UpdateGroup = function (grpdata) {
        var grpupdate = JSON.parse(grpdata);
        var url = "/UpdateGrpdata/" + (grpupdate[0].GroupID);

        return $http.put(url, grpdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing this opcdata.");
                    console.log(response);
                });
    }
});

RapidApp.service("TagsService", function ($http) {

    this.gettagsdata = function (grptagdata) {

        return $http.post("/getTagdetails", grptagdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding Tagdata.");
                });
    }
    this.DeleteTag = function (deltagid) {

        var url = "/DeleteTagdata/" + deltagid;
        return $http.delete(url).
                then(function (response) {
                    if (response.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        return response;
                    }
                }, function (response) {
                    alert("Error deleting this tagadata.");
                    console.log(response);
                });
    }
    this.getAlltagdata = function () {
        return $http.get("/getalltagdata").
                then(function (response) {
                    if (response.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        return response;
                    }
                }, function (response) {
                    alert("Error finding opcdata.");
                });
    }
    this.createTag = function (tagdata) {

        return $http.post("/gettagdata", tagdata).
                then(function (response) {
                    if (response.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        return response;
                    }
                }, function (response) {
                    alert("Error creating Tagdata.");
                });
    }
    this.UpdateTag = function (tagdata) {
        var tagupdate = JSON.parse(tagdata);
        var url = "/UpdateTagdata/" + (tagupdate[0].TagID);

        return $http.put(url, tagdata).
                then(function (response) {
                
                    if (response.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        return response;
                    }
                }, function (response) {
                    alert("Error editing this opcdata.");
                    console.log(response);
                });
    }
});

RapidApp.service("VirtualTagService", function ($http) {

    this.getOPCTagsdata = function () {

        return $http.get("/getopctags").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding tag data.");
                });
    }
    this.createVTag = function (Vtagdata) {

        return $http.post("/postVtagdata", Vtagdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating Virtual tag Data.");
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

    this.DeleteVtaga = function (delvtagid) {

        var url = "/DeleteVtagata/" + delvtagid;
        return $http.delete(url).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error deleting this Vtagdata.");
                    console.log(response);
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
    this.UpdateVTag = function (updatevtagdata) {
        var vtagupdate = JSON.parse(updatevtagdata);
        var url = "/UpdateVtagdata/" + (vtagupdate[0].ID);

        return $http.put(url, updatevtagdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing this Meterdata.");
                    console.log(response);
                });
    }
});

RapidApp.controller("OPCController", function (OPCDataService, GroupService, TagsService, $scope, $location, $state, $stateParams) {
    StartPageLoader();
    Opc_RowId = "";
 
    //$("#txt_opcname").chosen({
    //    allow_single_deselect: true,
    //    "width": "100%"
    //});
    //alert(localStorage.getItem('OPCID'));
    if (localStorage.getItem('OPCID') != null && (localStorage.getItem('OPCID')).length != 4)
    {
        // Opc_RowId = localStorage.getItem('OPCID');
       // alert(localStorage.getItem('OPCID'));
        OPCDataService.SelectOPC(localStorage.getItem('OPCID')).then(function (doc) {
            //   alert(JSON.stringify(doc.data));
            if (doc.data.isauthenticated == false) {
                fn_session_expired_client();
            }
            $state.go('OpecServerCreation', {
                "data": '' + JSON.stringify(doc.data) + '',

            });
           
            
        }, function (response) {
            $scope.error = response
            $scope.loading = false;
        });
    }
   
   //localStorage.removeItem('OPCID');
   // localStorage.removeItem('OPCName');
    $("#txt_opcservername").val("");
    if ($stateParams.data != null) {

        var data = JSON.parse($stateParams.data);
       // alert(JSON.stringify(data[0]));
        localStorage.setItem('OPCID', data[0].id);
        $scope.txt_opcname = data[0].servername;
        //  $scope.txt_opcname = "1";
     
      
        $("#txt_opcname").val(data[0].servername).trigger("chosen:updated");
        $("#txt_opcservername").val(data[0].opcservername);
        $("#txt_opcdesc").val(data[0].serverdesc);
        $("#txt_opcprurl").val(data[0].primaryurl);
        $("#txt_opcscrurl").val(data[0].secondaryurl);
        if (data[0].isactive == true) {
            $("#chk_active").prop("checked", true);
        }
        else {
            $("#chk_active").prop("checked", false);
        }
        // alert("SS" + data[0].isactive);

    } 
    var Opc_RowId = "";
    $scope.OPCData = []; $scope.OPCNames = [];
    $scope.loading = true;
    $scope.addMode = false;
    var treejsonObj = [];
    var OPCtreedata = []; var Grouptreedata = []; var Tagtreedata = [];
    $scope.toggleEdit = function () {
        this.opc.editMode = !this.opc.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();

    };
    $scope.clearvalues = function () {

        $('#chk_active').attr('checked', false);
        $("#txt_opcdesc").val("");
        $("#txt_opcprurl").val("");
        $("#txt_opcscrurl").val("");
    }


    $("#chk_active").click(function () {
        if ($("#chk_active").is(':checked'))
            $("#chk_active").val("True");
        else
            $("#chk_active").val("False");

    });


    $('.errmsg').delay(10000).fadeOut('slow');



    OPCDataService.getOpcdata().then(function (doc) {
        if (doc.data.isauthenticated == false) {
            fn_session_expired_client();
        }
        else {

            $scope.OPCData = doc.data;
            //alert("1");
            setTimeout(function () {
                $('#simple-table').DataTable().destroy();
                $('#simple-table').DataTable({
                    scrollX: true
                });
            }, 100);
        }

        // OPCtreedata=doc.data;
    }, function (response) {



    });



    $('#simpletable_tbody').on('click', 'tr', function () {

        //  rowid = $(this).attr("ddata");
        $(this).find('td').each(function () {
            if ($(this).attr("ddata") != undefined) {

                Opc_RowId = $(this).text();

            }

        });
        //  alert(rowid);
        $('#simpletable_tbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });







    OPCDataService.getOpcdatasource().then(function (doc) {
        
      
        $scope.OPCNames1 = doc.data;
        $scope.txt_opcname = $scope.OPCNames1[0];
        for (var i = 0; i < doc.data.length; i++) {

            $scope.OPCNames.push(doc.data[i].DataSource);
        }

    }, function (response) {
      

    });

    $scope.opclistmain = function () {
        localStorage.setItem('OPCID', null);
        $state.go('OPCServerConfig');
    }
    $scope.AddOPC = function () {
        localStorage.setItem('OPCID', null);
        //return;
        if ($stateParams.data == null && $("#txt_opcname").val().length > 0 && $("#txt_opcprurl").val().length > 0 && $("#txt_opcscrurl").val().length > 0) {
            $scope.loading = true;
            var OPCdataobj = new Array();
          //  alert($("#txt_opcservername").val());
            //  var OPCServerName = $("#txt_opcname").val();
            var OPCServerName = $("#txt_opcname option:selected").text();
            var OPCDescription = $("#txt_opcdesc").val();
            var OPCPrimaryurl = $("#txt_opcprurl").val();
            var OPCSecondaryurl = $("#txt_opcscrurl").val();
            var OPCServerName1 = $("#txt_opcservername").val();
          //  var OPCServerName1 = $("#txt_opcservername").val();
            var OPCActive = $("#chk_active").val();
            if (OPCActive == "on") {
                var OPCActive = false;
            }
            if (OPCPrimaryurl == "") {
                $scope.error = "Please Enter OPC Server Primary URL";
            } else if (OPCServerName1 == "") {
                $scope.error = "Please Enter OPC Server Name";
            }
            else {
                OPCdataobj.push({
                    "ServerName": OPCServerName,
                    "ServerDesc": OPCDescription,
                    "PrimaryURL": OPCPrimaryurl,
                    "SecondaryURL": OPCSecondaryurl,
                    "OPCServerName": OPCServerName1,
                    "IsActive": OPCActive
                });

                var Save_OPCdata = JSON.stringify(OPCdataobj);
                OPCDataService.createOPC(Save_OPCdata).then(function (doc) {
                   
                    if (doc.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }

                }, function (response) {
                    $scope.error = response;
                    $scope.loading = false;
                });

                $scope.error = "OPC Data Created";
                $scope.addMode = false;
                $scope.loading = false;

                // $scope.Getopcdata();
                //$scope.loadtree();
                // $scope.OPCGrpTagTree();
                // $location.path("/OPCServerConfig/");
                $state.go($state.current, {}, { reload: true });
            }

        }
        else if ($stateParams.data != null && $("#txt_opcname").val().length > 0 && $("#txt_opcprurl").val().length > 0 && $("#txt_opcscrurl").val().length > 0) {

            // alert($stateParams.data);

            $scope.update($stateParams.data)
            //  $stateParams.data = null;

            $state.go($state.current, { 'data': null }, { reload: true });
        }
        else if ($("#txt_opcservername").val().length == 0 || $("#txt_opcprurl").val().length == 0 || $("#txt_opcscrurl").val().length == 0) {

            //  alert($("#txt_opcname").val().length);
            if ($("#txt_opcservername").val().length == 0 && $("#txt_opcprurl").val().length == 0 && $("#txt_opcscrurl").val().length == 0) {
                $("#er_txt_opcservername").show();
                $("#er_txt_opcservername").html("<b>Server Name !!</b> Input is required");
                $("#er_txt_opcprurl").show();
                $("#er_txt_opcprurl").html("<b>Primary URL !!</b> Input is required");
                $("#er_txt_opcscrurl").show();
                $("#er_txt_opcscrurl").html("<b>Secondary URL !!</b> Input is required");
            }

            else if ($("#txt_opcservername").val().length == 0) {
                $("#er_txt_opcservername").show();
                $("#er_txt_opcservername").html("<b>Server Name !!</b> Input is required");
                $("#er_txt_opcprurl").hide();
                $("#er_txt_opcprurl").html("<b>Primary URL !!</b> Input is required");
                $("#er_txt_opcscrurl").hide();
                $("#er_txt_opcscrurl").html("<b>Secondary URL !!</b> Input is required");

            }
            else if ($("#txt_opcprurl").val().length == 0) {
                $("#er_txt_opcservername").hide();
                $("#er_txt_opcservername").html("<b>Server Name !!</b> Input is required");
                $("#er_txt_opcprurl").show();
                $("#er_txt_opcprurl").html("<b>Primary URL !!</b> Input is required");
                $("#er_txt_opcscrurl").hide();
                $("#er_txt_opcscrurl").html("<b>Secondary URL !!</b> Input is required");

            }

            else if ($("#txt_opcscrurl").val().length == 0) {
                $("#er_txt_opcservername").hide();
                $("#er_txt_opcservername").html("<b>Server Name !!</b> Input is required");
                $("#er_txt_opcprurl").hide();
                $("#er_txt_opcprurl").html("<b>Primary URL !!</b> Input is required");
                $("#er_txt_opcscrurl").show();
                $("#er_txt_opcscrurl").html("<b>Secondary URL !!</b> Input is required");

            }

        }

    }





    $scope.update = function (opc) {
        $scope.loading = true;

        var OPCdataobj = new Array();
      //  var OPCServerName = $("#txt_opcname").val();
        var OPCServerName = $("#txt_opcname option:selected").text();
        var OPCDescription = $("#txt_opcdesc").val();
        var OPCPrimaryurl = $("#txt_opcprurl").val();
        var OPCSecondaryurl = $("#txt_opcscrurl").val();
        var OPCActive = $("#chk_active").val();
        var OPCServerName1 = $("#txt_opcservername").val();
        if (OPCActive == "on") {
            var OPCActive = false;
        }
        var data = JSON.parse(opc);
        // alert(data[0].id);
        var OPCserverid = data[0].id;
        var OPCServerName1 = $("#txt_opcname").val();

        OPCdataobj.push({
            "ServerName": OPCServerName,
            "ServerDesc": OPCDescription,
            "PrimaryURL": OPCPrimaryurl,
            "SecondaryURL": OPCSecondaryurl,
            "OPCServerName": OPCServerName1,
            "IsActive": OPCActive,
            "Nameofserver":$("#txt_opcservername").val(),
            "OPCserverid": OPCserverid
        });

        var opcdata = JSON.stringify(OPCdataobj);

        OPCDataService.UpdateOPC(opcdata).then(function (doc) {
            if (doc.data.isauthenticated == false) {
                fn_session_expired_client();
            }
        }, function (response) {
            $scope.error = response
            $scope.loading = false;
        });
        $scope.error = "OPC Data Updated";


        //$scope.Getopcdata();

        // $scope.loadtree();
        $location.path("/OPCServerConfig/");
        opc.editMode = false;
        $scope.loading = false;
    };
    //$scope.deleteOpcdata = function (opc) {
    //    var OPCserverid = opc._id;
    //    OPCDataService.DeleteOPC(OPCserverid)
    //    OPCDataService.getOpcdata().then(function (doc) {
    //        $scope.OPCData = doc.data;
    //    }, function (response) {


    //    });
    //    //$scope.Getopcdata();
    //    //  $scope.loadtree();

    //    $location.path("/OPCServerConfig/");

    //}

    $scope.deleteOpc_data = function () {
        //alert(Opc_RowId);
        if (Opc_RowId != "" && Opc_RowId != "null" && Opc_RowId != null) {
            bootbox.confirm("Do You want to Delete this Record?", function (result) {
                if (result) {
                    var OPCserverid = Opc_RowId;

                    OPCDataService.DeleteOPC(OPCserverid)
                    OPCDataService.getOpcdata().then(function (doc) {
                        if (doc.data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else {
                            $scope.OPCData = doc.data;
                        }
                    }, function (response) {

                    });
                    // $location.path("/OPCServerConfig/");
                    $state.go($state.current, {}, { reload: true });
                }
            });
        }
        else {
            fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");

        }
    }

    $scope.list = function () {
        localStorage.setItem('OPCID', null);
        $state.go('OPCServerConfig');
    }
   
    $scope.EditOpcdata = function () {
        if (Opc_RowId != "" && Opc_RowId != "null" && Opc_RowId != null) {
            bootbox.confirm("Do You want to Edit this Record?", function (result) {
                if (result) {
                    // alert(Opc_RowId);
                   
                    OPCDataService.SelectOPC(Opc_RowId).then(function (doc) {
                        //   alert(JSON.stringify(doc.data));
                        if (doc.data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        $state.go('OpecServerCreation', {
                            "data": '' + JSON.stringify(doc.data) + '',

                        });

                    }, function (response) {
                        $scope.error = response
                        $scope.loading = false;
                    });
                }
            });
        }
        else {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");

        }
    }

    $scope.gotoGroups = function (opc) {
        //var contactUrl = "/OPCID/" + opc._id + '/OPCName/' + opc.OPCServerName + '/';
        //$location.path(contactUrl);
        //alert("ss");
        localStorage.setItem('OPCID', opc._id);
        localStorage.setItem('OPCName', opc.OPCServerName);
        $state.go('Grouplist', {
            "OPCID": opc._id,
            "OPCName": opc.OPCServerName
        });

        //alert(opc.OPCServerName);
    }


    //   $scope.loadtree();


    $scope.loadtree = function () {

        OPCDataService.getOpcdata().then(function (doc) {
            if (doc.data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else {
                OPCtreedata = doc.data;
            }
            // alert("opc:"+OPCtreedata.length);

        }, function (response) {


        });

        setTimeout(function () {


            GroupService.getAllgroupdata().then(function (doc) {
                if (doc.data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else {
                    Grouptreedata = doc.data;
                }
                //  alert("groups:"+Grouptreedata.length);
            }, function (response) {


            });
        }, 500);

        setTimeout(function () {
            TagsService.getAlltagdata().then(function (doc) {
                Tagtreedata = doc.data;
                //  alert("Tags:"+Tagtreedata.length);
                $scope.OPCGrpTagTree();


            }, function (response) {

            });
        }, 1000);
    }

    $scope.loadtree();

    $scope.OPCGrpTagTree = function () {
        
        StopPageLoader();
      
        for (var i = 0; i < OPCtreedata.length; i++) {
            treejsonObj.push({
                id: OPCtreedata[i]["OPCServerName"],
                text: OPCtreedata[i]["OPCServerName"],
                parent: "#",
                icon: "Analytics/Images/OPC_Icons/database.png"
            });

            var returnedGroupData = $.grep(Grouptreedata, function (element, index) {
                return element.OPCName == OPCtreedata[i]["OPCServerName"] && element.OPCID == OPCtreedata[i]["_id"];
            });



            for (var j = 0; j < returnedGroupData.length; j++) {

                treejsonObj.push({
                    id: returnedGroupData[j]["GroupName"],
                    text: returnedGroupData[j]["GroupName"],
                    parent: OPCtreedata[i]["OPCServerName"],
                    icon: "Analytics/Images/OPC_Icons/network.png"
                });
                var returnedTagsData = $.grep(Tagtreedata, function (element, index) {
                    return element.GROUPID == returnedGroupData[j]["_id"] && element.OPCID == OPCtreedata[i]["_id"];
                });



                for (var k = 0; k < returnedTagsData.length; k++) {
                    treejsonObj.push({
                        id: returnedTagsData[k]["TAGNAME"],
                        text: returnedTagsData[k]["TAGNAME"],
                        parent: returnedGroupData[j]["GroupName"],
                        icon: "Analytics/Images/OPC_Icons/Tag.png"
                    });
                };


            };
            $("#opchierarchy_tree").jstree("destroy");

            $('#opchierarchy_tree').bind('loaded.jstree', function (e, data) {

                data.instance.open_all();

            }).jstree({
                'core': {
                    'data': treejsonObj,
                    'use_data': true,
                    "load_open": true
                },
                "sort": function (a, b) {
                    return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                }
            }).on('select_node.jstree', function (e, data) {
                var loMainSelected = data;
                var parents = loMainSelected.node.parents;
                var seletednode = loMainSelected.node.id;

                if (parents.length == 1) {
                    //window.location.href = '../../CMonitor/OPCCreate/'
                  //  window.location.href = '/OPCServerConfig/';
                    //$location.path("/Homepage");
                }

            });
        };

    }

})

RapidApp.controller("OPCCreationController", function (OPCDataService, GroupService, TagsService, $scope, $location, $state) {




});

RapidApp.controller("GroupController", function (GroupService, TagsService, OPCDataService, $scope, $location, $stateParams, $state) {
    StartPageLoader();
    
    rowid = "";
    
    //localStorage.removeItem('OPCIDTags');
    //localStorage.removeItem('OPCNameTags');
    //localStorage.removeItem('Grpidtags');
    //localStorage.removeItem('GrpNametags');
    if ($stateParams.data != null) {
        //alert($stateParams);
        //alert(JSON.stringify($stateParams));
        var data = JSON.parse($stateParams.data);
        localStorage.setItem('Grpdata', $stateParams.data);
        localStorage.setItem('stateparamsbackup', JSON.stringify($stateParams));
        //  alert(JSON.stringify(data));
        //alert(data.GroupName);
        $("#txt_grpname").val(data.GroupName);
        $("#txt_grpdesc").val(data.GroupDesc);
        if (data.GroupActive == true) {
            $("#chk_grpactive").prop("checked", true);
        }
        else {
            $("#chk_grpactive").prop("checked", false);
        }
        // $("#chk_grpactive").prop("checked");

    }
   // alert((localStorage.getItem('Grpdata')).length + '' + localStorage.getItem('Grpdata'));
    if (localStorage.getItem('Grpdata') != null && (localStorage.getItem('Grpdata')).length != 4)
    {
        var data = JSON.parse(localStorage.getItem('Grpdata'));
        var data1 = localStorage.getItem('stateparamsbackup');
       // alert(data1);
       // alert(data.GroupName);
        $("#txt_grpname").val(data.GroupName);
        $("#txt_grpdesc").val(data.GroupDesc);
        if (data.GroupActive == true) {
            $("#chk_grpactive").prop("checked", true);
        }
        else {
            $("#chk_grpactive").prop("checked", false);
        }
    }
    $scope.GroupData = []; $scope.OPCNames = [];
    $scope.loading = true;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.group.editMode = !this.group.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();

    };
    $scope.clearvalues = function () {

        $('#chk_grpactive').attr('checked', false);
        $("#txt_grpname").val("");
        $("#txt_grpdesc").val("");
    }
    //check active value
    $("#chk_grpactive").click(function () {
        if ($("#chk_grpactive").is(':checked'))
            $("#chk_grpactive").val("True");
        else
            $("#chk_grpactive").val("False");

    });
    $('.errmsg').delay(10000).fadeOut('slow');
    if ($stateParams.OPCName != null)
        $('#getopcpath').text($stateParams.OPCName + " >>")

    $scope.gotoOPC = function () {

        $location.path("/OPCServerConfig");
    }
    var Grpopcdataobj = new Array();
    var opcID = $stateParams.OPCID;
    var OpcName = $stateParams.OPCName;
    if ($stateParams.OPCID == null && $stateParams.OPCName == null) {
        opcID = localStorage.getItem('OPCID');
        OpcName = localStorage.getItem('OPCName');
    }
    Grpopcdataobj.push({
        "opcID": opcID,
        "OpcName": OpcName

    });
    var grpopcdata = JSON.stringify(Grpopcdataobj);

    GroupService.getgroupdata(grpopcdata).then(function (doc) {
        if (doc.data.isauthenticated == false) {
            fn_session_expired_client();
        }
        else {
            $scope.GroupData = doc.data;

            setTimeout(function () {
                $("table").DataTable().destroy();
                $("table").DataTable();
            }, 100);
        }

    }, function (response) {


    });

    //$scope.grouplist = function () {

    //    localStorage.setItem('Grpdata', null);
    //    $state.go('Grouplist');
    //}
    $scope.list = function (list) {
        
        if (list =='grouplist')
        {

            localStorage.setItem('Grpdata', null);
            $state.go('Grouplist');
        }
        else{
        localStorage.setItem('OPCID', null);
        $state.go('OPCServerConfig');
            }
    }
    $scope.AddGROUP = function () {
        //  $stateParams.data = localStorage.getItem('Grpdata');
       // alert(localStorage.getItem('Grpdata'));
        if (localStorage.getItem('Grpdata') != null && localStorage.getItem('Grpdata') != 'null' && (localStorage.getItem('Grpdata')).length!=4) {
           // alert("if");
            $stateParams = JSON.parse(localStorage.getItem('stateparamsbackup'));
        }
       
        if ($stateParams.data == null) {
            $scope.loading = true;
            var Grpdataobj = new Array();
            var GrpName = $("#txt_grpname").val();
            var GrpDesc = $("#txt_grpdesc").val();
            var GrpActive = $("#chk_grpactive").prop("checked");
            var opcID = $stateParams.OPCID;
            var OpcName = $stateParams.OPCName;
            //  alert(opcID);
            if ($stateParams.OPCID == null && $stateParams.OPCName == null) {
                opcID = localStorage.getItem('OPCID');
                OpcName = localStorage.getItem('OPCName');
            }
            if (GrpName == "") {
                $scope.error = "Please Enter Group Name";
            }
            else {
                Grpdataobj.push({
                    "GroupName": GrpName,
                    "GroupDesc": GrpDesc,
                    "GroupActive": GrpActive,
                    "OPCID": opcID,
                    "OPCName": OpcName

                });
                var Save_Grpdata = JSON.stringify(Grpdataobj);

                GroupService.createGroup(Save_Grpdata).then(function (doc) {
                    if (doc.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }

                }, function (response) {
                    $scope.loading = false;
                });
                $scope.error = "Group Data Created";
                $scope.addMode = false;
                $scope.loading = false;
                /*            GroupService.getgroupdata(grpopcdata).then(function (doc) {
                                $scope.GroupData = doc.data;
                            }, function (response) {
                      
                       
                            });*/

                //var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/';

                //alert(contactUrl);
                //$location.path(contactUrl);
                $state.go($state.current, {
                    "OPCID": opcID,
                    "OPCName": OpcName,
                }, { reload: true });
                //$state.go('OPCGroupConfig', {
                //    "OPCID": opcID,
                //    "OPCName": OpcName
                //});
            }

        }
        else {
            var data = JSON.parse($stateParams.data);
            localStorage.setItem('Grpdata', null);
          

           // alert("update");
           
            var Grpdataobj = new Array();
            var GrpName = $("#txt_grpname").val();
            var GrpDesc = $("#txt_grpdesc").val();
            var GrpActive = $("#chk_grpactive").prop("checked");
            var opcID = data.OPCID;
            var OpcName = data.OPCName;
            var GrpID = data._id;
            Grpdataobj.push({
                "GroupName": GrpName,
                "GroupDesc": GrpDesc,
                "GroupActive": GrpActive,
                "OPCID": opcID,
                "OPCName": OpcName,
                "GroupID": GrpID
            });
            //alert(JSON.stringify(Grpdataobj));
           
            var GroupUpdatedata = JSON.stringify(Grpdataobj);
            GroupService.UpdateGroup(GroupUpdatedata).then(function (doc) {
                if (doc.data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                $scope.error = "Group Data Updated";
                group.editMode = false;
                $scope.loading = false;
            }, function (response) {

                $scope.loading = false;
            });
            //var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/';
            //$location.path(contactUrl);
            //  alert("update");
           // $state.go('Grouplist');
            $state.go('OPCGroupConfig', {
                "OPCID": data.OPCID,
                "OPCName": data.OPCName,
                "data": null,
            });
        }
    };

    $scope.grpupdate = function () {
        if (rowid != "") {
            bootbox.confirm("Do You want to Edit this Record?", function (result) {
                if (result) {
                    var group = JSON.parse(rowid);
                    //$scope.loading = true;


                    //var Grpdataobj = new Array();
                    //var GrpName = group.GroupName;
                    //var GrpDesc = group.GroupDesc;
                    //var GrpActive = group.GroupActive;
                    //var opcID = group.OPCID;
                    //var OpcName = group.OPCName;
                    //var GrpID = group._id;
                    //Grpdataobj.push({
                    //    "GroupName": GrpName,
                    //    "GroupDesc": GrpDesc,
                    //    "GroupActive": GrpActive,
                    //    "OPCID": opcID,
                    //    "OPCName": OpcName,
                    //    "GroupID": GrpID
                    //});

                    //var GroupUpdatedata = JSON.stringify(Grpdataobj);
                    //GroupService.UpdateGroup(GroupUpdatedata).then(function (doc) {
                    //    $scope.error = "Group Data Updated";
                    //    group.editMode = false;
                    //    $scope.loading = false;
                    //}, function (response) {

                    //    $scope.loading = false;
                    //});
                    ////var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/';
                    ////$location.path(contactUrl);

                    $state.go('OPCGroupConfig', {
                        "OPCID": group.opcID,
                        "OPCName": group.OpcName,
                        "data": rowid
                    });
                }
            });
        }
        else {
            fn_errorNotification("200", "", "", "Please select row to edit", "error_alert", "", "");
        }
        // $scope.loadtree();
    };

    $scope.gotoTags = function (group) {

        //var contactUrl = "/OPCID/" + group.OPCID + '/OPCName/' + group.OPCName + '/Grpid/' + group._id + '/GrpName/' + group.GroupName;

        localStorage.setItem('OPCIDTags', group.OPCID);
        localStorage.setItem('OPCNameTags', group.OPCName);
        localStorage.setItem('Grpidtags', group._id);
        localStorage.setItem('GrpNametags', group.GroupName);

        $state.go('Tagslist', {
            "OPCID": group.OPCID,
            "OPCName": group.OPCName,
            "Grpid": group._id,
            "GrpName": group.GroupName
        });
        //alert(group.GroupName);
        //$location.path(contactUrl);

    }

    $('table tbody').on('click', 'tr', function () {

        //  rowid = $(this).attr("ddata");
        $(this).find('td').each(function () {
            if ($(this).attr("ddata") != undefined) {
                // alert($(this).text());
                rowid = $(this).text();
            }
        });
        //  alert(rowid);
        $('tbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });





    $scope.delgroup = function () {
        if (rowid != "") {
            bootbox.confirm("Do You want to Delete the Record?", function (result) {
                if (result) {
                    var group = JSON.parse(rowid);
                    //  alert(group._id);
                    var grpid = group._id;
                    GroupService.DeleteGroup(grpid)
                    GroupService.getgroupdata(grpopcdata).then(function (doc) {
                        if (doc.data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else {
                            $scope.GroupData = doc.data;
                        }

                    }, function (response) {


                    });
                    //var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/';
                    //$location.path(contactUrl);
                    rowid = "";
                    $state.go($state.current, {
                        "OPCID": opcID,
                        "OPCName": OpcName,
                    }, { reload: true });
                }
            });
        }
        else {
            fn_errorNotification("200", "", "", "Please select row to delete", "error_alert", "", "");
        }
        // $scope.loadtree();

        //$scope.OPCGrpTagTree();
    }
    //treestructure
    var treejsonObj = [];
    var OPCtreedata = []; var Grouptreedata = []; var Tagtreedata = [];


    $scope.loadtree = function () {

        OPCDataService.getOpcdata().then(function (doc) {
            if (doc.data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else {
                OPCtreedata = doc.data;
            }


        }, function (response) {


        });
        setTimeout(function () {

            GroupService.getAllgroupdata().then(function (doc) {
                if (doc.data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else {
                    Grouptreedata = doc.data;
                }
            }, function (response) {


            });
        }, 500);


        setTimeout(function () {

            TagsService.getAlltagdata().then(function (doc) {
                Tagtreedata = doc.data;

                $scope.OPCGrpTagTree();


            }, function (response) {

            });
        }, 1000);
    }

    $scope.loadtree();

    $scope.OPCGrpTagTree = function () {
        StopPageLoader();
        for (var i = 0; i < OPCtreedata.length; i++) {
            treejsonObj.push({
                id: OPCtreedata[i]["OPCServerName"],
                text: OPCtreedata[i]["OPCServerName"],
                parent: "#",
                icon: "Analytics/Images/OPC_Icons/database.png"
            });

            var returnedGroupData = $.grep(Grouptreedata, function (element, index) {
                return element.OPCName == OPCtreedata[i]["OPCServerName"] && element.OPCID == OPCtreedata[i]["_id"];
            });



            for (var j = 0; j < returnedGroupData.length; j++) {

                treejsonObj.push({
                    id: returnedGroupData[j]["GroupName"],
                    text: returnedGroupData[j]["GroupName"],
                    parent: OPCtreedata[i]["OPCServerName"],
                    icon: "Analytics/Images/OPC_Icons/network.png"
                });
                var returnedTagsData = $.grep(Tagtreedata, function (element, index) {
                    return element.GROUPID == returnedGroupData[j]["_id"] && element.OPCID == OPCtreedata[i]["_id"];
                });



                for (var k = 0; k < returnedTagsData.length; k++) {
                    treejsonObj.push({
                        id: returnedTagsData[k]["TAGNAME"],
                        text: returnedTagsData[k]["TAGNAME"],
                        parent: returnedGroupData[j]["GroupName"],
                        icon: "Analytics/Images/OPC_Icons/Tag.png"
                    });
                };


            };
            $("#opchierarchy_tree").jstree("destroy");

            $('#opchierarchy_tree').bind('loaded.jstree', function (e, data) {
                data.instance.open_all();

            }).jstree({
                'core': {
                    'data': treejsonObj,
                    'use_data': true,
                    "load_open": true
                },
                "sort": function (a, b) {
                    return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                }
            }).on('select_node.jstree', function (e, data) {
                var loMainSelected = data;
                var parents = loMainSelected.node.parents;
                var seletednode = loMainSelected.node.id;

                if (parents.length == 1) {
                    //window.location.href = '../../CMonitor/OPCCreate/'
                    //window.location.href = '#/OPCServerConfig';

                    $location.path("/OPCServerConfig/");
                }

            });
        };

    }
})

RapidApp.controller("TagsController", function (TagsService, GroupService, OPCDataService, $scope, $location, $stateParams, $state) {
    StartPageLoader();
  
    rowidtags = "";
    $("#txt_tagpoltime").chosen({
        allow_single_deselect: true,
        "width": "83%"
    });
    $("#txt_tagtype").chosen({
        allow_single_deselect: true,
    });
    
    rowidtags = "";
    $scope.TagsData = [];
    $scope.loading = true;
    $scope.addMode = false;
    if ($stateParams.data != null) {
        // alert("ss");
        var data = JSON.parse($stateParams.data);
        //  alert(data.TAGNAME);
        //alert(JSON.stringify(data));
        localStorage.setItem('Tagdata', $stateParams.data);
        localStorage.setItem('Tagsstatebackup',JSON.stringify($stateParams));
        $("#txt_tagname").val(data.TAGNAME);
        $("#txt_tagaliasname").val(data.TAGALIAS);
        $("#txt_tagdesc").val(data.TAGDESC);
        $("#txt_opcart").val(data.TAGARITHMETIC);
        $("#txt_tagtype").val(data.TAGTYPE).trigger("chosen:updated");
        $("#txt_tagpolfrq").val(data.POLLFREQ);
        $("#txt_tagpoltime").val(data.POLLTIME).trigger("chosen:updated");;
        if (data.TAGACTIVE == true) {
            $("#chk_tagactive").prop("checked", true);
        }
        else {
            $("#chk_tagactive").prop("checked", false);
        }
        $("#chk_tagactive").prop("checked", true);
        $("#txt_minvalname").val(data.MinValue);
        $("#txt_maxvalname").val(data.MaxValue);

    }
   // alert(JSON.stringify(localStorage.getItem('Tagdata')));
    if (localStorage.getItem('Tagdata') != null && (localStorage.getItem('Tagdata')).length != 4) {
       
        var data = JSON.parse(localStorage.getItem('Tagdata'));

         //alert(data.Grpid);
        $("#txt_tagname").val(data.TAGNAME);
        $("#txt_tagaliasname").val(data.TAGALIAS);
        $("#txt_tagdesc").val(data.TAGDESC);
        $("#txt_opcart").val(data.TAGARITHMETIC);
        $("#txt_tagtype").val(data.TAGTYPE).trigger("chosen:updated");
        $("#txt_tagpolfrq").val(data.POLLFREQ);
        $("#txt_tagpoltime").val(data.POLLTIME).trigger("chosen:updated");;
        if (data.TAGACTIVE == true) {
            $("#chk_tagactive").prop("checked", true);
        }
        else {
            $("#chk_tagactive").prop("checked", false);
        }
        $("#chk_tagactive").prop("checked", true);
        $("#txt_minvalname").val(data.MinValue);
        $("#txt_maxvalname").val(data.MaxValue);

    }
    $("#txt_tagpolfrq").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $scope.toggleEdit = function () {
        this.tag.editMode = !this.tag.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
        $scope.clearvalues();

    };
    $scope.clearvalues = function () {
        $('#chk_tagactive').attr('checked', false);
        $("#txt_tagaliasname").val("");
        $("#txt_tagdesc").val("");
        $("#txt_tagpolfrq").val(""); $("#txt_opcart").val("");
    }
    //check active value
    $("#chk_tagactive").click(function () {
        if ($("#chk_tagactive").is(':checked'))
            $("#chk_tagactive").val("True");
        else
            $("#chk_tagactive").val("False");

    });
    if ($stateParams.OPCName != null) {
        $('#opcgrppath').text($stateParams.GrpName + " >>")
        $('#opcpathid').text($stateParams.OPCName + " >> ")
    }
    $scope.gotoslectedopc = function () {

        $location.path("/OPCServerConfig");
    }
    $scope.gotoslectedgrp = function () {
        //var contactUrl = "/OPCID/" + $stateParams.OPCID + '/OPCName/' + $stateParams.OPCName + '/';
        //$location.path(contactUrl);

        $state.go('OPCGroupConfig', {
            "OPCID": $stateParams.OPCID,
            "OPCName": $stateParams.OPCName
        });

        // $location.path("#/");
    }

    //gettagsdata
    var tagGrpopcdataobj = new Array();


    var opcID = $stateParams.OPCID;
    var OpcName = $stateParams.OPCName;
    var grpID = $stateParams.Grpid;
    var grpName = $stateParams.GrpName;
    if (opcID == null && OpcName == null && grpID == null && grpName == null) {
        opcID = localStorage.getItem('OPCIDTags');
        OpcName = localStorage.getItem('OPCNameTags');
        grpID = localStorage.getItem('Grpidtags');
        grpName = localStorage.getItem('GrpNametags');
    }
    tagGrpopcdataobj.push({
        "opcID": opcID,
        "OpcName": OpcName,
        "grpID": grpID,
        "grpName": grpName

    });
    var taggrpopcdata = JSON.stringify(tagGrpopcdataobj);
    TagsService.gettagsdata(taggrpopcdata).then(function (doc) {
        if (doc.data.isauthenticated == false) {
            fn_session_expired_client();
        }
        else {
            $scope.TagsData = doc.data;
            setTimeout(function () {
                $("table").DataTable().destroy();
                $("table").DataTable();
            }, 500);
        }
    }, function (response) {


    });

    $scope.list = function (list) {

        if (list == 'taglist') {

            localStorage.setItem('Tagdata', null);
            $state.go('Tagslist');
        }
        else {
            localStorage.setItem('OPCID', null);
            $state.go('OPCServerConfig');
        }
    }

    $scope.AddTags = function () {
       


        if (localStorage.getItem('Tagdata') != null && localStorage.getItem('Tagdata') != 'null' && (localStorage.getItem('Tagdata')).length!=4) {
            // alert("if");
            $stateParams = JSON.parse(localStorage.getItem('Tagsstatebackup'));
        }


        if ($stateParams.data == null) {
            $scope.loading = true;

            var tagdataobj = new Array();
            var opcID = $stateParams.OPCID;
            var OpcName = $stateParams.OPCName;
            var grpID = $stateParams.Grpid;
            var grpName = $stateParams.GrpName;
            if ($stateParams.OPCID == null && $stateParams.OPCName == null && $stateParams.Grpid == null && $stateParams.GrpName == null) {
                opcID = localStorage.getItem('OPCIDTags');
                OpcName = localStorage.getItem('OPCNameTags');
                grpID = localStorage.getItem('Grpidtags');
                grpName = localStorage.getItem('GrpNametags');
            }
            var TagName = $("#txt_tagname").val();
            var TagAliasNmme = $("#txt_tagaliasname").val();
            var TagDescription = $("#txt_tagdesc").val();
            var TagType = $("#txt_tagtype").val();
            var TagFreq = $("#txt_tagpolfrq").val();
            var TagTime = $("#txt_tagpoltime").val();
            var TagArithmetic = $("#txt_opcart").val();
            var TagActive = $("#chk_tagactive").prop("checked");
            var TagMinVal = $("#txt_minvalname").val();
            var TagMaxVal = $("#txt_maxvalname").val();
            if (TagAliasNmme == "") {
                TagAliasNmme = TagName;
            }
            if (TagName == "") {
                alert("Please Enter TagName");
            }
            else {
                tagdataobj.push({
                    "TAGNAME": TagName,
                    "TAGALIAS": TagAliasNmme,
                    "TAGDESC": TagDescription,
                    "TAGTYPE": TagType,
                    "POLLFREQ": TagFreq,
                    "POLLTIME": TagTime,
                    "TAGARITHMETIC": TagArithmetic,
                    "TAGACTIVE": TagActive,
                    "OPCID": opcID,
                    "OPCNAME": OpcName,
                    "GROUPID": grpID,
                    "GROUPNAME": grpName,
                    "MinValue": TagMinVal,
                    "MaxValue": TagMaxVal
                });
                var Save_Tagdata = JSON.stringify(tagdataobj);

                TagsService.createTag(Save_Tagdata).then(function (doc) {

                }, function (response) {
                    $scope.loading = false;
                });
                $scope.error = "Tags Data Created";
                $scope.addMode = false;
                $scope.loading = false;
                TagsService.gettagsdata(taggrpopcdata).then(function (doc) {
                    if (doc.data.isauthenticated == false) {
                        fn_session_expired_client();
                    }
                    else {
                        $scope.TagsData = doc.data;
                    }
                }, function (response) {


                });

                var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/Grpid/' + grpID + '/GrpName/' + grpName + '/';
                $location.path(contactUrl);
                $state.go($state.current, {
                    "OPCID": opcID,
                    "OPCName": OpcName,
                    "Grpid": grpID,
                    "GrpName": grpName,
                    "data": null,
                }, { reload: true });
               // $state.go('Tagslist');
             
            }

        }
        else {


           //  alert("update");
             localStorage.setItem('Tagdata',null);
            var tag = JSON.parse($stateParams.data);
            var tagdataobj = new Array();
            var opcID = tag.OPCID;
            var OpcName = tag.OPCName;
            var grpID = tag.Grpid;
            var grpName = tag.GrpName;
            var TagName = $("#txt_tagname").val();
            var TagAliasNmme = $("#txt_tagaliasname").val();
            var TagDescription = $("#txt_tagdesc").val();
            var TagType = $("#txt_tagtype").val();
            var TagFreq = $("#txt_tagpolfrq").val();
            var TagTime = $("#txt_tagpoltime").val();
            var TagArithmetic = $("#txt_opcart").val();
            var TagActive = $("#chk_tagactive").prop("checked");
            var TagID = tag._id;
            var TagMinVal = $("#txt_minvalname").val();
            var TagMaxVal = $("#txt_maxvalname").val();


            tagdataobj.push({
                "TagID": TagID,
                "TAGNAME": TagName,
                "TAGALIAS": TagAliasNmme,
                "TAGDESC": TagDescription,
                "TAGTYPE": TagType,
                "POLLFREQ": TagFreq,
                "POLLTIME": TagTime,
                "TAGARITHMETIC": TagArithmetic,
                "TAGACTIVE": TagActive,
                "OPCID": opcID,
                "OPCNAME": OpcName,
                "GROUPID": grpID,
                "GROUPNAME": grpName,
                "MinValue": TagMinVal,
                "MaxValue": TagMaxVal
            });

            var Update_Tagdata = JSON.stringify(tagdataobj);
            TagsService.UpdateTag(Update_Tagdata).then(function (doc) {
                //  alert("doc: "+doc);
                //  alert(opcID);
                // alert(OpcName);
                $scope.error = "Tags Data Updated";
                tag.editMode = false;
                $scope.loading = false;

            }, function (response) {
                alert(response);

                $scope.loading = false;
            });
            
          //  $state.go('Tagslist');
            $state.go($state.current, {
                "OPCID": opcID,
                "OPCName": OpcName,
                "Grpid": grpID,
                "GrpName": grpName,
                "data": null,
            }, { reload: true });
        }
    };


    $('table tbody').on('click', 'tr', function () {

        //  rowid = $(this).attr("ddata");
        $(this).find('td').each(function () {
            if ($(this).attr("ddata") != undefined) {
                // alert($(this).text());
                rowidtags = $(this).text();
            }
        });
        //  alert(rowid);
        $('tbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });





    $scope.Tagsupdate = function () {
        //alert(JSON.stringify(tag));
        //alert(tag["OPCID"]);
        //alert(tag["OPCName"]);
        //$scope.loading = true;

        //var tagdataobj = new Array();
        //var opcID = tag.OPCID;
        //var OpcName = tag.OPCName;
        //var grpID = tag.Grpid;
        //var grpName = tag.GrpName;
        //var TagName = tag.TAGNAME;
        //var TagAliasNmme = tag.TAGALIAS;
        //var TagDescription = tag.TAGDESC;
        //var TagType = tag.TAGTYPE;
        //var TagFreq = tag.POLLFREQ;
        //var TagTime = tag.POLLTIME;
        //var TagArithmetic = tag.TAGARITHMETIC;
        //var TagActive = tag.TAGACTIVE;
        //var TagID = tag._id;
        //var TagMinVal = tag.MinValue;
        //var TagMaxVal = tag.MaxValue;


        //tagdataobj.push({
        //    "TagID": TagID,
        //    "TAGNAME": TagName,
        //    "TAGALIAS": TagAliasNmme,
        //    "TAGDESC": TagDescription,
        //    "TAGTYPE": TagType,
        //    "POLLFREQ": TagFreq,
        //    "POLLTIME": TagTime,
        //    "TAGARITHMETIC": TagArithmetic,
        //    "TAGACTIVE": TagActive,
        //    "OPCID": opcID,
        //    "OPCNAME": OpcName,
        //    "GROUPID": grpID,
        //    "GROUPNAME": grpName,
        //    "MinValue": TagMinVal,
        //    "MaxValue": TagMinVal
        //});

        //var Update_Tagdata = JSON.stringify(tagdataobj);
        //TagsService.UpdateTag(Update_Tagdata).then(function (doc) {
        //    //  alert("doc: "+doc);
        //    //  alert(opcID);
        //    // alert(OpcName);
        //    $scope.error = "Tags Data Updated";
        //    tag.editMode = false;
        //    $scope.loading = false;

        //}, function (response) {
        //    alert(response);

        //    $scope.loading = false;
        //});

        //var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/Grpid/' + grpID + '/GrpName/' + grpName + '/';
        //$location.path(contactUrl);
        if (rowidtags != "") {
            bootbox.confirm("Do You want to Edit the Record?", function (result) {
                if (result) {
                    $state.go('OPCTagsConfig', {
                        "OPCID": $stateParams.OPCID,
                        "OPCName": $stateParams.OPCName,
                        "Grpid": $stateParams.Grpid,
                        "GrpName": $stateParams.GrpName,
                        "data": rowidtags,
                    });
                }
            });
        }
        else {
            fn_errorNotification("200", "", "", "Please select row to edit", "error_alert", "", "");

        }
    };

    $scope.gotoTags = function (group) {

        //var contactUrl = "/OPCID/" + group.OPCID + '/OPCName/' + group.OPCName + '/Grpid/' + group._id + '/GrpName/' + group.GroupName + '/';
        //$location.path(contactUrl);

        $state.go('OPCTagsConfig', {
            "OPCID": group.OPCID,
            "OPCName": group.OPCName,
            "Grpid": group._id,
            "GrpName": group.GroupName
        });
    }
    $scope.deltag = function () {
        if (rowidtags != "") {
            bootbox.confirm("Do You want to Delete the Record?", function (result) {
                if (result) {
                    var tag = JSON.parse(rowidtags);
                    // alert( tag._id);
                    var tagid = tag._id;
                    TagsService.DeleteTag(tagid)
                    TagsService.gettagsdata(taggrpopcdata).then(function (doc) {
                        if (doc.data.isauthenticated == false) {
                            fn_session_expired_client();
                        }
                        else {
                            $scope.TagsData = doc.data;
                        }
                    }, function (response) {


                    });
                    // $scope.loadtree();
                    //var contactUrl = "/OPCID/" + opcID + '/OPCName/' + OpcName + '/Grpid/' + grpID + '/GrpName/' + grpName + '/';
                    //$location.path(contactUrl);
                    //$state.go('OPCTagsConfig', {

                    //});
                    rowidtags = "";
                    $state.go($state.current, {
                        "OPCID": tag.OPCID,
                        "OPCName": tag.OPCName,
                        "Grpid": tag.Grpid,
                        "GrpName": tag.GrpName
                    }, { reload: true });

                }
            });
        }

        else {
            fn_errorNotification("200", "", "", "Please select row to delete", "error_alert", "", "");
        }
        //$scope.OPCGrpTagTree();
    }

    //treestructure
    var treejsonObj = [];
    var OPCtreedata = []; var Grouptreedata = []; var Tagtreedata = [];

    $scope.loadtree = function () {

        OPCDataService.getOpcdata().then(function (doc) {
            if (doc.data.isauthenticated == false) {
                fn_session_expired_client();
            }
            else {
                OPCtreedata = doc.data;
            }

        }, function (response) {


        });
        setTimeout(function () {

            GroupService.getAllgroupdata().then(function (doc) {
                if (doc.data.isauthenticated == false) {
                    fn_session_expired_client();
                }
                else {
                    Grouptreedata = doc.data;
                }

            }, function (response) {


            });
        }, 500);

        setTimeout(function () {
            TagsService.getAlltagdata().then(function (doc) {
                Tagtreedata = doc.data;

                $scope.OPCGrpTagTree();


            }, function (response) {

            });
        }, 1000);
    }

    $scope.loadtree();

    $scope.OPCGrpTagTree = function () {
        StopPageLoader();
        for (var i = 0; i < OPCtreedata.length; i++) {
            treejsonObj.push({
                id: OPCtreedata[i]["OPCServerName"],
                text: OPCtreedata[i]["OPCServerName"],
                parent: "#",
                icon: "Analytics/images/OPC_Icons/database.png"
            });

            var returnedGroupData = $.grep(Grouptreedata, function (element, index) {
                return element.OPCName == OPCtreedata[i]["OPCServerName"] && element.OPCID == OPCtreedata[i]["_id"];
            });



            for (var j = 0; j < returnedGroupData.length; j++) {

                treejsonObj.push({
                    id: returnedGroupData[j]["GroupName"],
                    text: returnedGroupData[j]["GroupName"],
                    parent: OPCtreedata[i]["OPCServerName"],
                    icon: "Analytics/images/OPC_Icons/network.png"
                });
                var returnedTagsData = $.grep(Tagtreedata, function (element, index) {
                    return element.GROUPID == returnedGroupData[j]["_id"] && element.OPCID == OPCtreedata[i]["_id"];
                });



                for (var k = 0; k < returnedTagsData.length; k++) {
                    treejsonObj.push({
                        id: returnedTagsData[k]["TAGNAME"],
                        text: returnedTagsData[k]["TAGNAME"],
                        parent: returnedGroupData[j]["GroupName"],
                        icon: "Analytics/images/OPC_Icons/Tag.png"
                    });
                };



            };

            $("#opchierarchy_tree").jstree("destroy");

            $('#opchierarchy_tree').bind('loaded.jstree', function (e, data) {
                data.instance.open_all();

            }).jstree({
                'core': {
                    'data': treejsonObj,
                    'use_data': true,
                    "load_open": true
                },
                "sort": function (a, b) {
                    return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                }
            }).on('select_node.jstree', function (e, data) {
                var loMainSelected = data;
                var parents = loMainSelected.node.parents;
                var seletednode = loMainSelected.node.id;
                if (parents.length == 1) {
                    //window.location.href = '../../CMonitor/OPCCreate/'
                    //window.location.href = '#/OPCServerConfig'
                    $location.path('/OPCServerConfig/')
                }

            });
        };

    }
})

RapidApp.controller("VirtualTagController", function (VirtualTagService, $scope, $location, $routeParams) {

    $("#chk_vtagactive").click(function () {
        if ($("#chk_vtagactive").is(':checked'))
            $("#chk_vtagactive").val("True");
        else
            $("#chk_vtagactive").val("False");

    });
    $("#vtag_btn").val("Save");

    $scope.Tagserverdata = function () {
        VirtualTagService.getOPCTagsdata().then(function (doc) {


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
    $("#tagserver_tbl tbody").on('click', 'tr', function () {
        // alert($(this).html());
        var val11 = '';
        //   $("#txt_stag").data('assetlocid', $(this).find("td:eq(0)").html());
        val11 += $(this).find("td:eq(0)").html();
        val11 += $(this).find("td:eq(1)").html();
        $("#txt_stag").val(val11);
        //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
        var element = angular.element('#TagsServerdatamodal');
        element.modal('hide');

    });
    $scope.AddVTagsData = function () {
        var Vtagobj = new Array();
        var VTagname = $("#txt_vtagname").val();
        var Vselecttag = $("#txt_stag").val();
        var VTagfunction = $("#txt_tagfunc").val();
        var Vstartfrom = $("#txt_strtfrom").val();
        var VPollFreq = $("#txt_pollfrq").val();
        var VPostFreq = $("#txt_postfreq").val();
        var VAction = $("#txt_action").val();
        var VActive = $("#chk_vtagactive").val();

        // posttoserver
        var VpostServerparam = $("#VTparam_id").val();
        var VpostServerprioty = $("#VTparam_priority").val();
        // emial
        var VtagEmailto = $("#VTrecipient_to").val();
        var Vtagcc = $("#VTrecipient_cc").val();
        var Vtagsubject = $("#VTrecipient_subject").val();
        var Vtagmessage = $("#VTmessage_body").val();
        // sms
        var vtagmobioleno = $("#VTrecipient_number").val();
        var vtagsmsmsg = $("#VTmessage_text").val();

        // sms
        var vtagdbparam = $("#VTparam_id1").val();
        var vtagdbpriority = $("#VTparam_priority1").val();
        if (VTagname == "") {
            $scope.error = "Please Enter Virtual Tag Name";
        }
        else {
            Vtagobj.push({
                "VTagName": VTagname,
                "TagSelectData": Vselecttag,
                "VTagFunction": VTagfunction,
                "StartFrom": Vstartfrom,
                "PollFreq": VPollFreq,
                "PostFreq": VPostFreq,
                "VAction": VAction,
                "Active": VActive,
                "VpostServerparam": VpostServerparam,
                "VpostServerprioty": VpostServerprioty,
                "VtagEmailto": VtagEmailto,
                "Vtagcc": Vtagcc,
                "Vtagsubject": Vtagsubject,
                "Vtagmessage": Vtagmessage,
                "vtagdbparam": vtagdbparam,
                "vtagdbpriority": vtagdbpriority,
                "Vtagcc": Vtagcc,
                "VtagSMSMessage": vtagsmsmsg,
                "VtagMobileNo": vtagmobioleno,
                // "VtagMobileNo":vtagmobioleno,Tagserverdata(),
                // "vtagdbpriority": [{ "se1": "sd" }, { "ew": "nagendra" }]

            });
        }
        var Save_VTagdata = JSON.stringify(Vtagobj);

        VirtualTagService.createVTag(Save_VTagdata).then(function (doc) {


        }, function (response) {
        });
        $location.path("/VirtualListData/");
    }
    $scope.gotolist = function () {

        $location.path("/VirtualListData/");
    }

});

RapidApp.controller("VirtualEditTagController", function (VirtualTagService, $scope, $location, $routeParams) {

    $("#vtag_btn").val("Update");
    var Vtagidobj = new Array();
    Vtagidobj.push({
        "VTagId": $routeParams.vtagid
    })
    VirtualTagService.getvtagdatabyid(JSON.stringify(Vtagidobj)).then(function (doc) {


        var response = doc.data
        // alert(response);
        $("#txt_vtagname").val(response[0]["VTagName"]);
        $("#txt_stag").val(response[0]["TagSelectData"]);
        $("#txt_tagfunc").val(response[0]["VTagFunction"]);
        $("#txt_strtfrom").val(response[0]["StartFrom"]);
        $("#txt_pollfrq").val(response[0]["PollFreq"]);
        $("#txt_postfreq").val(response[0]["PostFreq"]);
        $("#txt_action").val(response[0]["Action"]);
        $("#chk_vtagactive").val(response[0]["Active"]);
        if (response[0]["EMAILTO"].length > 0 || response[0]["CC"].length > 0 || response[0]["BODY"].length > 0) {
            $("#txt_action2").attr('checked', true);

            $("#VTrecipient_to").val(response[0]["EMAILTO"]);
            $("#VTrecipient_cc").val(response[0]["CC"]);
            $("#VTmessage_body").val(response[0]["BODY"]);
            $("#myModalVTforEmail_Action").css("display", "block");
        }
        if (response[0]["PARAMID"].length > 0 || response[0]["PRIORITY"].length > 0) {
            $("#txt_action1").attr('checked', true);

            $("#VTparam_id").val(response[0]["PARAMID"]);
            $("#VTparam_priority").val(response[0]["PRIORITY"]);
            $("#myModalforVTPostToServer_Action").css("display", "block");

        }
        if (response[0]["MOBILE"].length > 0 || response[0]["SMS"].length > 0) {
            $("#txt_action3").attr('checked', true);

            $("#VTrecipient_number").val(response[0]["MOBILE"]);
            $("#VTmessage_text").val(response[0]["SMS"]);
            $("#myModalVTforSMS_Action").css("display", "block");
        }
        if (response[0]["DBPRIORITY"].length > 0 || response[0]["DBPARAM"].length > 0) {
            $("#txt_action4").attr('checked', true);

            $("#VTparam_id1").val(response[0]["DBPARAM"]);
            $("#VTparam_priority1").val(response[0]["DBPRIORITY"]);

            $("#myModalforStoreDB_Action").css("display", "block");
        }

        if ($("#chk_vtagactive").val() == "True") {
            $('#chk_vtagactive').attr('checked', true);
        }
        else {
            $('#chk_vtagactive').attr('checked', false);

        }
    }, function (response) {

    });

    $scope.AddVTagsData = function () {

        var Vtagobj = new Array();
        var VTagname = $("#txt_vtagname").val();
        var Vselecttag = $("#txt_stag").val();
        var VTagfunction = $("#txt_tagfunc").val();
        var Vstartfrom = $("#txt_strtfrom").val();
        var VPollFreq = $("#txt_pollfrq").val();
        var VPostFreq = $("#txt_postfreq").val();
        var VAction = $("#txt_action").val();
        var VActive = $("#chk_vtagactive").val();

        // posttoserver
        var VpostServerparam = $("#VTparam_id").val();
        var VpostServerprioty = $("#VTparam_priority").val();
        // emial
        var VtagEmailto = $("#VTrecipient_to").val();
        var Vtagcc = $("#VTrecipient_cc").val();
        var Vtagsubject = $("#VTrecipient_subject").val();
        var Vtagmessage = $("#VTmessage_body").val();
        // sms
        var vtagmobioleno = $("#VTrecipient_number").val();
        var vtagsmsmsg = $("#VTmessage_text").val();

        // sms
        var vtagdbparam = $("#VTparam_id1").val();
        var vtagdbpriority = $("#VTparam_priority1").val();
        if (VTagname == "") {
            $scope.error = "Please Enter Virtual Tag Name";
        }
        else {
            Vtagobj.push({
                "VTagName": VTagname,
                "TagSelectData": Vselecttag,
                "VTagFunction": VTagfunction,
                "StartFrom": Vstartfrom,
                "PollFreq": VPollFreq,
                "PostFreq": VPostFreq,
                "VAction": VAction,
                "Active": VActive,
                "VpostServerparam": VpostServerparam,
                "VpostServerprioty": VpostServerprioty,
                "VtagEmailto": VtagEmailto,
                "Vtagcc": Vtagcc,
                "Vtagsubject": Vtagsubject,
                "Vtagmessage": Vtagmessage,
                "vtagdbparam": vtagdbparam,
                "vtagdbpriority": vtagdbpriority,
                // "vtagdbpriority": [{ "se1": "sd" }, { "ew": "nagendra" }],
                "ID": $routeParams.vtagid

            });
        }
        var Save_VTagdata = JSON.stringify(Vtagobj);

        VirtualTagService.UpdateVTag(Save_VTagdata).then(function (doc) {
            $location.path("/VirtualListData/");

        }, function (response) {

        });
    }



    $scope.Tagserverdata = function () {
        VirtualTagService.getOPCTagsdata().then(function (doc) {


            $('#TagsServerdatamodal').modal('show')
            $("#tagserver_tbl").dataTable().fnDestroy();
            var response = doc.data;
            // alert(JSON.stringify(response));
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
    $("#tagserver_tbl tbody").on('click', 'tr', function () {
        // alert($(this).html());
        var val11 = '';
        //   $("#txt_stag").data('assetlocid', $(this).find("td:eq(0)").html());
        val11 += $(this).find("td:eq(0)").html();
        val11 += $(this).find("td:eq(1)").html();
        $("#txt_stag").val(val11);
        //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
        var element = angular.element('#TagsServerdatamodal');
        element.modal('hide');

    });

    $scope.gotolist = function () {

        $location.path("/VirtualListData/");
    }
});

RapidApp.controller("VirtualTagListController", function (VirtualTagService, $scope, $location) {
    // $scope.VtagData = [];
    VirtualTagService.getOPCVirtualTagsdata().then(function (doc) {

        var response = doc.data
        // alert(doc.data);
        $scope.getvtagdatabind(response);

    }, function (response) {

    });
    $scope.gotoedit = function () {
        if ($("#tageditdata").attr("data-editval") != "") {
            var contactUrl = "/VirtualTagData/" + $("#tageditdata").attr("data-editval");
            $location.path(contactUrl);
        }
        else {
            alert("Please Select row to edit");
        }

    }

    $scope.deletetag = function () {
        var Vtagid = $("#tageditdata").attr("data-editval");
        if (Vtagid != "") {
            VirtualTagService.DeleteVtaga(Vtagid)

            VirtualTagService.getOPCVirtualTagsdata().then(function (doc) {

                var response = doc.data
                $scope.getvtagdatabind(response);

            }, function (response) {

            });
        }
        else {
            alert("Please Select row to delete");
        }
    }
    $scope.getvtagdatabind = function (response) {
        $("#vtaglist").dataTable().fnDestroy();
        var htmldata = '';
        $('#vtaglisttbody').empty();
        for (var i = 0; i < response.length; i++) {
            var idd = response[i]["_id"];
            htmldata += '<tr data="' + idd + '"  onclick=getTagID(this)>';
            htmldata += '<td style="visibility:hidden;">' + response[i]["_id"] + '</td>';
            htmldata += '<td>' + response[i]["VTagName"] + '</td>';
            htmldata += '<td>' + response[i]["VTagFunction"] + '</td>';
            htmldata += '<td>' + response[i]["StartFrom"] + '</td>';
            htmldata += '<td>' + response[i]["PollFreq"] + '</td>';
            htmldata += '<td>' + response[i]["PostFreq"] + '</td>';
            htmldata += '<td>' + response[i]["VAction"] + '</td>';
            htmldata += '<td>' + response[i]["Active"] + '</td>';
            htmldata += '</tr>';
        }

        $('#vtaglisttbody').append(htmldata);

        $('#vtaglist').DataTable();
        var dt = $('#vtaglist').DataTable();
        //hide the first column

        dt.column(0).visible(false);
        dt.column(6).visible(false);
    }


    $scope.gotocreate = function () {
        // $location.path("/VirtualTagData/");
        $location.path('/VirtualTagData/');
        // location.href='/VirtualTagData/';
    }
});

function getAssetdetails(obj) {
    $("#txt_astid").val($(obj).find("td:eq(1)").html());
    $("#txt_astname").val($(obj).find("td:eq(2)").html());
    $('#Assetdatamodal').modal('hide')
}

function gettagdetails(obj) {

    $("#txt_tagname").val($(obj).find("td:eq(1)").html());
    $("#txt_tagname").attr("data-tagopcid", $(obj).find("td:eq(3)").html());
    $('#Tagsdatamodal').modal('hide')
}

function getVtagdetails(obj) {

    $("#txt_vtagname").val($(obj).find("td:eq(1)").html());
    $('#VTagsdatamodal').modal('hide')
}

function getTagID(obj) {
    //$("#tageditdata").attr("data-editval", $(obj).find("td:eq(0)").html());
    $("#tageditdata").attr("data-editval", $(obj).attr('data'));

    $(obj).addClass("selected").siblings().removeClass("selected");

}

var maintaintagname = '';

function gettagserverdetails(obj) {

    maintaintagname = maintaintagname + $(obj).find("td:eq(1)").html() + "." + $(obj).find("td:eq(0)").html() + " + ";
    $("#txt_stag").val(maintaintagname);
    $('#TagsServerdatamodal').modal('hide')
}







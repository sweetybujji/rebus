
//var app = angular.module('LocationApp', ['angularUtils.directives.dirPagination']);
var rowid = "";
RapidApp.service("LoactionDataSource", function ($http) {
    
    this.LoactionDataSource = function () {
        return $http.get("/LoactionDataSource").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding LoactionDataSource.");
                });
    }
    this.getLocationdata = function () {
        return $http.get("/getLocationdata").
                then(function (response) {

                    return response;
                }, function (response) {
                    alert("Error finding locationdata.");
                });
    }
    this.getTreeLocationdata = function () {
        return $http.get("/getTreeLocationdata").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding locationdata.");
                });
    }
    this.createLocation = function (locdata) {

        return $http.post("/CreateLocationdata", locdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating locationdata.");
                });
    }
    this.checkdistinctlocation = function (locdata) {
        return $http.post("/checkdistinctlocation", locdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating locationdata.");
                });
    }


    //this.TreeStructureLocation = function (locdata) {        
    //    return $http.post("/getTreeStructureLocation", locdata).
    //            then(function (response) {
    //        return response;
    //    }, function (response) {
    //        alert("Error creating locationdata.");
    //    });
    //}
    this.UpdateLocation = function (locdata) {
        var locdataupdate = JSON.parse(locdata);
        var url = "/UpdateLocationdata/" + (locdataupdate[0].loc_id);
        //console.log(locdataupdate);
        return $http.put(url, locdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing this locationdata.");
                    //console.log(response);
                });
    }
    this.DeleteLocation = function (locdata) {
        //alert(JSON.stringify(locdata));
        var locdataupdate = JSON.parse(locdata);
        var url = "/DeleteLocationdata/" + ("" + locdataupdate[0].LocationId + "");
        // console.log(contact._id);
        return $http.put(url, locdata).
                then(function (response) {
                   
                    return response;
                }, function (response) {
                    alert("Error editing this locationdata.");
                    //console.log(response);
                });
    }
    this.DeleteChildLocation = function (locdata) {
        //alert(JSON.stringify(locdata));
        var locdataupdate = JSON.parse(locdata);
        var url = "/DeleteChildLocationdata/" + ("" + locdataupdate[0].LocationId + "");
        // console.log(contact._id);
        return $http.put(url, locdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing this locationdata.");
                    //console.log(response);
                });

    }
})

var loadcnt = 0;
RapidApp.controller("ManageLocationsCtrl", function (LoactionDataSource, $scope, $state, $stateParams, $location, $window) {
   
    rowid = "";
   // alert("ss00");
    //    $scope.LocationData = [];
    //alert("ss");
    $("#locupdate").css("display", "none");

    //alert($stateParams.type);
    //  alert($stateParams.type + '' + $stateParams.LocationId + '' + $stateParams.LocationName + '' + $stateParams.ParentLocationId + '' + $stateParams.Description + '' + $stateParams.loc_id);

    if ($stateParams.type == "edit") {
        // alert("weeee");
        $("#txt_locid1").val($stateParams.LocationId);
        $("#txt_locname1").val($stateParams.LocationName);
        $("#txt_locparentid1").val($stateParams.ParentLocationId);
        $("#txt_locdesc1").val($stateParams.Description);
        $("#locupdateid1").val($stateParams.loc_id);
        $("#locupdate").css("display", "none");
    }


    $scope.LocationPopupData = []; $scope.LocationNames = [];
    //$scope.loading = true;
    //$scope.addMode = false;

    //$scope.toggleEdit = function () {
    //    this.loc.editMode = !this.loc.editMode;
    //};
    //$scope.toggleAddLoc = function () {
    //    $scope.addMode = !$scope.addMode;
    //    $scope.clearvalues();
    //};

    $("#txt_locid").val("");
    $("#txt_locname").val("");
    $("#txt_locparentid").val("");
    $("#txt_locdesc").val("");

    $scope.clearvalues = function () {
        $("#txt_locid").val("");
        $("#txt_locname").val("");
        $("#txt_locparentid").val("");
        $("#txt_locdesc").val("");
    }


    // $('.errmsg').delay(10000).fadeOut('slow');
    // $scope.getLocations();


    $scope.getLocations = function () {
        //alert();
        //  alert($scope.addMode);
        $scope.addMode = false;
        $scope.clearvalues();
        //$("#Locationhierarchy_tree").empty();

        LoactionDataSource.getLocationdata().then(function (data) {
            // alert(JSON.stringify(data));
            //console.log(JSON.stringify(data));

           
            $scope.LocationData = [];
            $scope.LocationData = data.data;
          //  $('#locationstbl').DataTable().destroy();
            setTimeout(function () {
                // alert("ss");
                $('#locationstbl').DataTable().destroy();
                $('#locationstbl').DataTable({
                   
                });
            }, 100);
            // $("#locationstbl").DataTable();

            $scope.loading = false;
            var treedata = data.data;
            var jsonObj = [];
            //alert(JSON.stringify(treedata));







            for (var i = 0; i < treedata.length; i++) {

                var ParentLocationId = treedata[i]["ParentLocationId"];

                // alert(ParentLocationId);

                if (ParentLocationId == "0") {
                    ParentLocationId = "#";
                }
                jsonObj.push({
                    id: treedata[i]["LocationId"],
                    text: treedata[i]["LocationName"],
                    parent: ParentLocationId,
                    icon: "" +
                           "/Analytics/Images/OPC_Icons/locationicon1.png"
                });

                // alert(JSON.stringify(jsonObj));
            };

            //alert(JSON.stringify(jsonObj));

            //            function convert(array) {
            //                var map = {}
            //                for (var i = 0; i < array.length; i++) {
            //                    var obj = array[i];
            //                   // alert(JSON.stringify(obj));
            //                    if (!(obj.LocationId in map)) {
            //                        map[obj.LocationId] = obj
            //                        map[obj.LocationId].children = []
            //                    }

            //                    if (typeof map[obj.LocationId].Name == 'undefined') {
            //                        map[obj.LocationId].LocationId = obj.LocationId
            //                        map[obj.LocationId].LocationName = obj.LocationName
            //                        map[obj.LocationId].Description = obj.Description
            //                        map[obj.LocationId].ParentLocationId = obj.ParentLocationId
            //                    }

            //                    var parent = obj.ParentLocationId || '-';
            //                    if (!(parent in map)) {
            //                        map[parent] = {}
            //                        map[parent].children = []
            //                    }

            //                    map[parent].children.push(map[obj.LocationId])
            //                }
            //                return map['-']
            //            }

            ////            var arry = [{ "Id": "11db0a20-25b7-11e7-958b-80824f3c0f09", "LocationId": "plant_1", "LocationName": "plant_1", "ParentLocationId": "", "Description": "Located in Hyderabad" },
            ////{ "Id": "bff7e9d0-25c5-11e7-83b4-c1fe488890cd", "LocationId": "Plant_2", "LocationName": "Hyd-Jubileehills", "ParentLocationId": "", "Description": "Hyd-Jubileehills" },
            ////{ "Id": "df62f940-25c5-11e7-bf44-53bcbd50ace5", "LocationId": "Plant_2_1", "LocationName": "Hyd-Jb-plant1", "ParentLocationId": "Plant_2", "Description": "Hyd-Jb-plant1" }, { "Id": "15b38b90-25c6-11e7-a932-9709097a5459", "LocationId": "Plant_2_2", "LocationName": "Hyd_jb_Plant_1_2", "ParentLocationId": "Plant_2_1", "Description": "Hyd_jb_Plant_1_2" },
            ////{ "Id": "aea3b9c0-25c5-11e7-9b6f-7209a31344ac", "LocationId": "Plant_1_1", "LocationName": "Hyderabad", "ParentLocationId": "plant_1", "Description": "Plant_1_1" }];


            //            var dt = [{ "Id": "11db0a20-25b7-11e7-958b-80824f3c0f09", "LocationId": "plant_1", "LocationName": "plant_1", "ParentLocationId": "", "Description": "Located in Hyderabad" },
            //                { "Id": "df62f940-25c5-11e7-bf44-53bcbd50ace5", "LocationId": "Plant_2_1", "LocationName": "Hyd-Jb-plant1", "ParentLocationId": "Plant_2", "Description": "Hyd-Jb-plant1" },
            //                { "Id": "bff7e9d0-25c5-11e7-83b4-c1fe488890cd", "LocationId": "Plant_2", "LocationName": "Hyd-Jubileehills", "ParentLocationId": "", "Description": "Hyd-Jubileehills" },
            //                { "Id": "15b38b90-25c6-11e7-a932-9709097a5459", "LocationId": "Plant_2_2", "LocationName": "Hyd_jb_Plant_1_2", "ParentLocationId": "Plant_2_1", "Description": "Hyd_jb_Plant_1_2" },
            //                { "Id": "aea3b9c0-25c5-11e7-9b6f-7209a31344ac", "LocationId": "Plant_1_1", "LocationName": "Hyderabad", "ParentLocationId": "plant_1", "Description": "Plant_1_1" }];

            //            var convertdata = (JSON.stringify(convert(dt)));
            //            //alert(convertdata);



            $("#Locationhierarchy_tree").empty();
            $("#Locationhierarchy_tree").jstree("destroy");

            $('#Locationhierarchy_tree').bind('loaded.jstree', function (e, data) {
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
                var loMainSelected = data;
                var parents = loMainSelected.node.parents;
                //alert(parents);
                var seletednode = loMainSelected.node.id;
            });

            // <ul id="Locationhierarchy_tree"></ul>

            //$('#Locationhierarchy_tree').ace_tree('destroy');

            //function initiateDemoData() {
            //    var tree;
            //    var cluster_str = "";
            //    for (var cs = 0; cs < treedata.length; cs++) {
            //        var Pid = treedata[cs]["ParentLocationId"];
            //        if (Pid == 0) {
            //            cluster_str += "'" + treedata[cs]["LocationId"] + "' : { text:'"
            //            + treedata[cs]["LocationName"] + "' ,type:'folder'" + ",'icon-class': 'orange'},";
            //        }
            //    }
            //    var tree_data = eval('({' + cluster_str + '})');
            //    tree_data['Env_Hyd']['additionalParameters'] = {
            //        'children': {
            //            'Env_Dubai': { text: 'Plant_1', "type": "folder", 'icon-class': 'pink' }
            //        }
            //    }

            //    tree_data['Env_Hyd']['additionalParameters']['children']['Env_Dubai']['additionalParameters'] = {
            //        'children': [
            //             { text: '<i class="ace-icon fa fa-picture-o green"></i> Plant_1_1', type: 'item' },

            //        ]
            //    }

            //    //alert(JSON.stringify(tree_data));


            //    //var tree_data = {
            //    //    'pictures': { text: 'Pictures', type: 'folder', 'icon-class': 'red' }
            //    //};
            //    //tree_data['pictures']['additionalParameters'] = {
            //    //    'children': {
            //    //        'wallpapers': { text: 'Wallpapers', type: 'folder', 'icon-class': 'pink' },
            //    //    }
            //    //}
            //    //tree_data['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
            //    //    'children': [
            //    //        { text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper1.jpg', type: 'item' },
            //    //    ]
            //    //}
            //    //alert(JSON.stringify(tree_data));
            //    //var tree_data = { "Env_Hyd": { "text": "Plant_3", "type": "folder", "icon-class": "red", "additionalParameters": { "children": { "Env_Dubai": { "text": "Plant_1", "type": "folder", "icon-class": "pink", "additionalParameters": { "children": [{ "text": "<i class=\"ace-icon fa fa-picture-o green\"></i> Plant_1_1", "type": "item" }] } } } } } };


            //    //alert(JSON.stringify(tree_data));

            //    //var children_str = "'children': {";
            //    ////alert(JSON.stringify(treedata));
            //    //for (var ch = 0; ch < treedata.length; ch++) {
            //    //    var Pid = treedata[ch]["LocationId"];
            //    //    var childPid = treedata[ch]["ParentLocationId"];
            //    //    var objkeyarr = [];
            //    //    for (var ch1 = 0; ch1 < treedata.length; ch1++) {
            //    //        var childPid1 = treedata[ch1]["ParentLocationId"];
            //    //        //alert("pid " + Pid);
            //    //        //alert("childPid1 " + childPid1);
            //    //        if (childPid1 != 0) {
            //    //            if (Pid == childPid1) {
            //    //                objkeyarr.push(treedata[ch1]["LocationId"]);
            //    //            }

            //    //        }
            //    //    }
            //    //    //alert(objkeyarr.length);
            //    //    var objkeystr = "";
            //    //    objkeystr += "";
            //    //    for (var objch = 0; objch < objkeyarr.length; objch++) {
            //    //        if (objch = 0)
            //    //            objkeystr += "[" + objkeyarr[objch] + "]['additionalParameters']";
            //    //        else
            //    //            objkeystr += "['children']['" + objkeyarr[objch] + "']['additionalParameters']";
            //    //    }
            //    //    //alert(objkeystr);
            //    //    //tree_data[eval('({' + objkeystr + '})')];
            //    //    //if(Pid==childPid){
            //    //    //children_str += ""+treedata[ch]["LocationId"]+": { text: '<i class=\"ace-icon fa fa-file-text red\"></i>'"+treedata[ch]["LocationName"]+", type: 'item' },";
            //    //    //    }                       

            //    //}
            //    //children_str += "}";

            //    // var children_str = "'children': {";
            //    // children_str += "'Brokers': { text: '<i class=\"ace-icon fa fa-file-text red\"></i> Brokers', type: 'item' },";
            //    // children_str += "'Tpoics': { text: '<i class=\"ace-icon fa fa-file-text red\"></i> Topics', type: 'item' }}";

            //    // for (var ch = 0; ch < treedata.length; ch++) {
            //    // 	var clustername = treedata[ch]["LocationName"];
            //    // 	tree_data[clustername]['additionalParameters'] = eval('({'
            //    // 			+ children_str + '})');
            //    // }


            //    //var tree_data={"pictures":{"text":"Pictures","type":"folder","icon-class":"red"},"music":{"text":"Music","type":"folder","icon-class":"orange","additionalParameters":{"children":[{"text":"<i class=\"ace-icon fa fa-music blue\"></i> song1.ogg","type":"item"},{"text":"<i class=\"ace-icon fa fa-music blue\"></i> song2.ogg","type":"item"},{"text":"<i class=\"ace-icon fa fa-music blue\"></i> song3.ogg","type":"item"},{"text":"<i class=\"ace-icon fa fa-music blue\"></i> song4.ogg","type":"item"},{"text":"<i class=\"ace-icon fa fa-music blue\"></i> song5.ogg","type":"item"}]}}}
            //    var dataSource1 = function (options, callback) {
            //        var $data = null
            //        if (!("text" in options) && !("type" in options)) {
            //            $data = tree_data;//the root tree
            //            callback({
            //                data: $data
            //            });
            //            return;
            //        } else if ("type" in options && options.type == "folder") {
            //            if ("additionalParameters" in options
            //					&& "children" in options.additionalParameters)
            //                $data = options.additionalParameters.children || {};
            //            else
            //                $data = {}//no data
            //        }

            //        if ($data != null)//this setTimeout is only for mimicking some random delay
            //            setTimeout(function () {
            //                callback({
            //                    data: $data
            //                });
            //            }, parseInt(Math.random() * 500) + 200);

            //        //we have used static data here
            //        //but you can retrieve your data dynamically from a server using ajax call
            //        //checkout examples/treeview.html and examples/treeview.js for more info
            //    }
            //    return dataSource1;
            //}



            //loadcnt++;
            //if (loadcnt == 1) {
            //    var sampleData = initiateDemoData();

            //    //alert(JSON.stringify(sampleData));

            //    // 1. Clear MyTree wrapper template with: 
            //    $('#Locationhierarchy_tree .tree-item:visible').remove();

            //    // 2. remove assigned data from template element object
            //    delete ($('#Locationhierarchy_tree').data().tree);
            //    //alert("ss")
            //    $('#Locationhierarchy_tree').ace_tree({
            //        dataSource: sampleData,
            //        loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
            //        'open-icon': 'ace-icon fa fa-folder-open',
            //        'close-icon': 'ace-icon fa fa-folder',
            //        'selectable': false,
            //        multiSelect: false,
            //        'selected-icon': null,
            //        'unselected-icon': null
            //    });

            //}
            //else {
            //    //alert(loadcnt)
            //    if (loadcnt == 2)
            //        loadcnt = 0;
            //}
            //$('#Locationhierarchy_tree').tree('reload');
            //$.tree('reload');

        }, function (response) {
            $scope.error = "An Error has occured while loading Location Data!! ";
            $scope.loading = false;
        });
        //var Locdataobj = new Array();
        //Locdataobj.push({
        //    "LocationId": "5",
        //    "LocationName": "loc",
        //    "Description": "loc4",
        //    "ParentLocationId": "0"
        //        //"ParentLocationName": ParentLocationName
        //});
        //var Save_Locdata = JSON.stringify(Locdataobj);
        //LoactionDataSource.checkdistinctlocation(Save_Locdata).then(function (doc) {            
        //    alert(JSON.stringify(doc.data));
        //}, function (response) {
        //    $scope.error = "An Error has occured while loading Location Data!! ";
        //    $scope.loading = false;
        //});

        //alert(jQuery.jstree._reference("#Locationhierarchy_tree")._get_children("2"));

        //var node = $("#Locationhierarchy_tree").jstree().get_node('2', true);
        //var lvl = node.parents.length;
        //alert(lvl);

        //$('#Locationhierarchy_tree').on('ready.jstree', function (e, data) {
        //    var node = data.instance.get_node('1');

        //    alert(node);
        //})

        //$('#Locationhierarchy_tree').on('select_node.jstree', function (e, data) {
        //    var loMainSelected = data;
        //    alert(loMainSelected.node.parents);
        //});

    };

    $scope.getLocations();
    //setInterval(function () { $scope.getLocations(); return; }, 1000);
  //  setTimeout(function () { $scope.getLocations(); }, 500);

    $('#locationstblbody').on('click', 'tr', function () {
        
        //  rowid = $(this).attr("ddata");
        $(this).find('td').each(function () {
            if ($(this).attr("ddata") != undefined) {
                // alert($(this).text());
                rowid = $(this).text();
                $stateParams.type = "edit";
                var loc = JSON.parse(rowid);
                $stateParams.LocationId = loc.LocationId;
                $stateParams.LocationName = loc.LocationName;
                $stateParams.ParentLocationId = loc.ParentLocationId;
                $stateParams.Description = loc.Description;
                $stateParams.loc_id = loc.Id;

            }

        });
        //  alert(rowid);
        $('#locationstblbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });

    //}).error(function (data) {
    //    $scope.error = "An Error has occured while loading OPCData! ";
    //    $scope.loading = false;
    //});

    //add customer
    $scope.AddLocation = function () {
       // alert($stateParams.type);
       
         if ($stateParams.type == "new" && $("#txt_locid1").val().length > 0 && $("#txt_locname1").val().length > 0) {
            // alert(1);
            $scope.loading = true;
            var Locdataobj = new Array();
            var LocationId = $("#txt_locid1").val();
            var LocationName = $("#txt_locname1").val();
            //var ParentLocationName = $("#txt_locparentname").val();
            var ParentLocationId = $("#txt_locparentid1").val();
            var Description = $("#txt_locdesc1").val();
            //alert("LocationId")
            //alert("ParentLocationId"+ParentLocationId)
            ///alert((parentNode).parents);       
            var parentnodesarr = [];
            if (ParentLocationId == "") {
            }
            else {
                treeInst = $('#Locationhierarchy_tree').jstree()     // # create new instance
                treeInst = $('#Locationhierarchy_tree').jstree(true) // # get existing instance            
                var parentnodes = treeInst.get_node("[id='" + ParentLocationId + "']");
                //alert(JSON.stringify(parentnodes));                
                if (parentnodes.parents == "#") {
                    parentnodesarr.push(ParentLocationId);
                    //parentnodesarr.push({
                    //    "parentId": ParentLocationId
                    //});
                }
                else {
                    parentnodesarr = parentnodes.parents;
                    if (parentnodesarr.indexOf('#') > -1) {
                        parentnodesarr[parentnodesarr.indexOf('#')] = ParentLocationId;
                    }
                    //for (var i in parentnodes.parents) {
                    //    alert(parentnodes.parents[i]);
                    //    if (parentnodes.parents[i] == "#") {
                    //        parentnodesarr.push({ "parentId": ParentLocationId });
                    //    }
                    //    else {
                    //        parentnodesarr.push({ "parentId": parentnodes.parents[i] });
                    //    }
                    //}
                }
            }
            //alert(parentnodesarr.parents);

            if (LocationId == "") {
                $scope.error = "Please Enter Location Id";
            } else if (LocationName == "") {
                $scope.error = "Please Enter Location Name ";
            }
            else {
                if (ParentLocationId == "") {
                    ParentLocationId = "0";
                }
                //parentnodesarr = $(parentnodesarr).not(['#']).get();
                //parentnodesarr.remove('#');
                //alert(parentnodesarr);
                Locdataobj.push({
                    "LocationId": LocationId,
                    "LocationName": LocationName,
                    "Description": Description,
                    "ParentLocationId": ParentLocationId,
                    "parentnodesarr": parentnodesarr
                });
                var Save_Locdata = JSON.stringify(Locdataobj);
                //alert(Save_Locdata);
                LoactionDataSource.checkdistinctlocation(Save_Locdata).then(function (doc) {
                    var distinctdata = doc.data;
                    // alert(distinctdata.length);
                    if (distinctdata.length > 0) {
                        alert("Same Location Id and Location Name Already Exists !!");
                        $scope.error = "Same Location Id and Location Name Already Exists !! ";
                    }
                    else {
                        LoactionDataSource.createLocation(Save_Locdata).then(function (doc) {
                            $scope.getLocations();
                            $scope.addMode = false;
                            $scope.clearvalues();
                        }, function (response) {
                            $scope.error = "An Error has occured while loading Location Data!! ";
                            $scope.loading = false;
                        });
                    }
                }, function (response) {
                    $scope.error = "An Error has occured while loading Location Data!! ";
                    $scope.loading = false;
                });
            }
            $("#txt_locid1").val('');
            $("#txt_locname1").val('');
            $("#txt_locparentid1").val('');
            $("#txt_locdesc1").val('');
            $("#locupdateid1").val('');
            // $state.go('ManageLocationslistdummy');
            //$state.transitionTo('ManageLocationslistdummy', null, { 'reload': true });
            //$scope.getLocations();
            $state.go($state.current, {}, { reload: true });
            //   $state.go("/ManageLocations");
            // $scope.getLocations();
            // $location.path('ManageLocationslistdummy');



        }
        else if ($stateParams.type == "edit" && $("#txt_locid1").val().length > 0 && $("#txt_locname1").val().length > 0) {
             // alert("update");

            var parentnodesarr = new Array();
            $scope.loading = true;
            var Locdataobj = new Array();
            var LocationId = $("#txt_locid1").val();
            var LocationName = $("#txt_locname1").val();
            var Description = $("#txt_locdesc1").val();
            var ParentLocationId = $("#txt_locparentid1").val();
            var loc_id = $("#locupdateid1").val();


            if (LocationId == "") {
                $scope.error = "Please Enter Location Id";
            } else if (LocationName == "") {
                $scope.error = "Please Enter Location Name ";
            }
            else {
                if (ParentLocationId == "") {
                    ParentLocationId = "0";
                }
                //alert(loc_id);
                Locdataobj.push({
                    "LocationId": LocationId,
                    "LocationName": LocationName,
                    "Description": Description,
                    "ParentLocationId": ParentLocationId,
                    "loc_id": loc_id,
                    "parentnodesarr": parentnodesarr
                });
                var locdata = JSON.stringify(Locdataobj);
                //alert(JSON.stringify(Locdataobj));
                LoactionDataSource.UpdateLocation(locdata).then(function (data) {
                    //$scope.error = data;
                    loc.editMode = false;
                    $scope.loading = false;
                }, function (response) {
                    $scope.error = "An Error has occured while loading Location Data!! ";
                    $scope.loading = false;
                });
                $scope.getLocations();
                $("#locupdate").css("display", "block");
            }
            $("#txt_locid1").val('');
            $("#txt_locname1").val('');
            $("#txt_locparentid1").val('');
            $("#txt_locdesc1").val('');
            $("#locupdateid1").val('');
            $state.go($state.current, {
                "type": 'new',
                "LocationId": '',
                "LocationName": '',
                "ParentLocationId": '',
                "Description": '',
                "loc_id": '',
            }, { reload: true });



        }
        else
        {
            // alert("Please enter all mandatory fields");
            if ($("#txt_locid1").val().length == 0 && $("#txt_locname1").val().length == 0)
            {
                $("#er_txt_locid1").html("<b>Location Id !!</b> Input is required");
                $("#er_txt_locid1").show();
                $("#er_txt_locname1").html("<b>Location Name !!</b> Input is required");
                $("#er_txt_locname1").show();
            }
            else if($("#txt_locid1").val().length == 0)
            {
                $("#er_txt_locid1").html("<b>Location Id !!</b> Input is required");
                $("#er_txt_locid1").show();
                $("#er_txt_locname1").hide();
            }
            else if ($("#txt_locname1").val().length == 0)
            {
                $("#er_txt_locname1").html("<b>Location Name !!</b> Input is required");
                $("#er_txt_locname1").show();
                $("#er_txt_locid1").hide();
            }
            
          //  fn_errorNotification("200", "", "", "Please enter all mandatory fields", "error_alert", "", "");
        }
       
            
    };
    //update customer
    $scope.update = function () {
        //   alert($stateParams.type + '' + $stateParams.LocationId + '' + $stateParams.LocationName + '' + $stateParams.ParentLocationId + '' + $stateParams.Description + '' + $stateParams.loc_id);
        //$stateParams.LocationId = loc.LocationId;
        //$stateParams.LocationName = loc.LocationName;
        //$stateParams.ParentLocationId = loc.ParentLocationId;
        //$stateParams.Description = loc.Description;
        //$stateParams.loc_id = loc.Id;
        if (rowid != "") {
            //$scope.addMode = true;
            //var loc = JSON.parse(rowid);
            // alert("ss");
            bootbox.confirm("Do You want to Edit "+ $stateParams.LocationName +" Record?", function (result) {
                if (result) {
                    $state.go('ManageLocations', {
                        "type": 'edit',
                        "LocationId": '' + $stateParams.LocationId + '',
                        "LocationName": '' + $stateParams.LocationName + '',
                        "ParentLocationId": '' + $stateParams.ParentLocationId + '',
                        "Description": '' + $stateParams.Description + '',
                        "loc_id": '' + $stateParams.loc_id + '',
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
        //var parentnodesarr = new Array();
        //$scope.loading = true;
        //var Locdataobj = new Array();
        //var LocationId = loc.LocationId;
        //var LocationName = loc.LocationName;
        //var Description = loc.Description;
        //var ParentLocationId = loc.ParentLocationId;
        //var loc_id = loc.Id;


        //if (LocationId == "") {
        //    $scope.error = "Please Enter Location Id";
        //} else if (LocationName == "") {
        //    $scope.error = "Please Enter Location Name ";
        //}
        //else {
        //    if (ParentLocationId == "") {
        //        ParentLocationId = "0";
        //    }
        //    //alert(loc_id);
        //    Locdataobj.push({
        //        "LocationId": LocationId,
        //        "LocationName": LocationName,
        //        "Description": Description,
        //        "ParentLocationId": ParentLocationId,
        //        "loc_id": loc_id,
        //        "parentnodesarr": parentnodesarr
        //    });
        //    var locdata = JSON.stringify(Locdataobj);
        //    //alert(JSON.stringify(Locdataobj));
        //    LoactionDataSource.UpdateLocation(locdata).then(function (data) {
        //        //$scope.error = data;
        //        loc.editMode = false;
        //        $scope.loading = false;
        //    }, function (response) {
        //        $scope.error = "An Error has occured while loading Location Data!! ";
        //        $scope.loading = false;
        //    });
        //    $scope.getLocations();
        //}

    };

    // delete Customer
    $scope.deletelocdata = function () {
        //  alert(rowid);


        //  return;
        //var loc = rowid;
        if (rowid != "") {
            var loc = JSON.parse(rowid);
            $scope.loading = true;
            var Locdataobj = new Array();
            var LocationId = loc.LocationId;
            var LocationName = loc.LocationName;
            var Description = loc.Description;
            var ParentLocationId = loc.ParentLocationId;
            var loc_id = loc.id;
            var childarray = [];
            bootbox.confirm("Do You want to  Delete " + LocationName + " Record?", function (result) {
                if (result) {
                   


                    if (ParentLocationId == "0") {
                        childarray.push("'" + LocationId + "'");
                        $.each($scope.LocationData, function (i) {
                            if ($scope.LocationData[i].ParentLocationId === LocationId) {
                                //alert(JSON.stringify($scope.LocationData.splice(i, 1)));
                                //return false;
                                childarray.push("'" + $scope.LocationData[i].LocationId + "'");
                            }
                        });

                        Locdataobj.push({
                            "LocationId": LocationId,
                            "LocationName": LocationName,
                            "Description": Description,
                            "ParentLocationId": ParentLocationId,
                            "loc_id": loc_id,
                            "ChildArray": childarray
                        });


                        var locdata = JSON.stringify(Locdataobj);
                        LoactionDataSource.DeleteLocation(locdata).then(function (data) {
                            //$scope.error = data
                           // alert(data);
                            $state.go($state.current, {}, { reload: true });
                            $scope.getLocations();

                            $scope.loading = false;
                        }, function (response) {
                            alert(response);
                            $scope.error = "An Error has occured while loading Location Data!! ";
                            $scope.loading = false;
                        });
                        $scope.getLocations();


                    }
                    else {
                        childarray.push("'" + LocationId + "'");

                        Locdataobj.push({
                            "LocationId": LocationId,
                            "LocationName": LocationName,
                            "Description": Description,
                            "ParentLocationId": ParentLocationId,
                            "loc_id": loc_id,
                            "ChildArray": childarray
                        });


                        var locdata = JSON.stringify(Locdataobj);

                        LoactionDataSource.DeleteLocation(locdata).then(function (data) {
                            setTimeout(function () {
                                // alert("ss");
                                $state.go($state.current, {}, { reload: true });

                            }, 500);
                           // alert("data"+JSON.stringify(data));
                            //$scope.error = data
                            /*                $.each($scope.LocationData, function (i) {
                                                if ($scope.LocationData[i].id === loc_id) {
                                                    $scope.LocationData.splice(i, 1);
                                                    return false;
                                                }
                                            });
                                            */
                            $scope.getLocations();

                            $scope.loading = false;
                        }, function (response) {
                            alert("ERR"+JSON.stringify(response));
                            $scope.error = "An Error has occured while loading Location Data!! ";
                            $scope.loading = false;
                        });
                    }
                    // $location.path('ManageLocationslist');
                    rowid = "";

                    // $route.reload();
                    //$scope.getLocations();
                    $state.go($state.current, {}, { reload: true });
                   // $scope.getLocations();
                    // $state.go('ManageLocationslistdummy');
                    
                }
            });
           // rowid = "";
        }
        else {
            fn_errorNotification("200", "", "", "Please select row to delete", "error_alert", "", "");
           // alert("please select row");
        }

    };


    $scope.showloclistpopup = function () {

        LoactionDataSource.getTreeLocationdata().then(function (data) {

            var distinctlocdata = data.data;
            //alert(distinctlocdata);
            //alert(distinctlocdata.length);
            var htmltbl = "";
            for (var i = 0; i < distinctlocdata.length; i++) {
                htmltbl += "<tr onclick='getparentloc_details(this)'><td>" + distinctlocdata[i]["LocationId"] + "</td><td>" + distinctlocdata[i]["LocationName"] + "</td></tr>";
            }
            $("#locationpopuplisttbl tbody").html(htmltbl);
            $("#locationpopuplisttbl").DataTable();
            $scope.loading = false;
            /* var element = angular.element("#myModalforLocList");
             element.modal('show');*/

            $('#myModalforLocList').modal('show');

        }, function (response) {
            $scope.error = "An Error has occured while loading Location Data!! ";
            $scope.loading = false;
        });

        $("#locationpopuplisttbl tbody").on('click', 'tr', function () {
            $("#txt_AssetLoc").data('assetlocid', $(this).find("td:eq(0)").html());
            $("#txt_AssetLoc").val($(this).find("td:eq(1)").html());

            $('#myModalforLocList').modal('hide');
        });

        //LocationFactory.getLocationListPopup().success(function (data) {
        //    //$scope.LocationPopupData = data;
        //    var htmltbl = "";
        //    for (var i = 0; i < data.length; i++) {
        //        htmltbl += "<tr onclick='getparentdetails(this)'><td>" + data[i]["LocationId"] + "</td><td>" + data[i]["LocationName"] + "</td></tr>";
        //    }
        //    $("#locationpopuplisttbl tbody").html(htmltbl);
        //    $("#locationpopuplisttbl").DataTable();
        //    $scope.loading = false;
        //    var element = angular.element("#myModalforLocList");
        //    element.modal('show');
        //}, function (response) {
        //    $scope.error = "An Error has occured while loading Location Data!! ";
        //    $scope.loading = false;
        //});
    };

    $scope.loclistmodalhide = function () {
        var element = angular.element('#myModalforLocList');
        element.modal('hide');
    };

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

});

function getparentloc_details(obj) {
    $("#txt_locparentid1").val($(obj).find("td:eq(0)").html());
    //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
    var element = angular.element('#myModalforLocList');
    element.modal('hide');
}




//conditionapp.factory('LocationFactory', function ($http) {
//    return {
//        //getLocationNames: function () {
//        //    return $http.get('../../Location/getLocationNames');
//        //},
//        getLocationData: function () {
//            return $http.get('../../Location/getLocationData');
//        },
//        getLocationListPopup: function () {
//            return $http.get('../../Location/getLocationListPopup');
//        },
//        addLocation: function (Save_Locdata) {
//            return $http.post('../../Location/SaveOPCData', { Save_Locdata: Save_Locdata });
//        },
//        Locupdatedata: function (locdata) {
//            return $http.post('../../Location/Locupdatedata', { locdata: locdata });
//        },
//        deletelocdata: function (LocationId) {
//            return $http.post('../../Location/DeleteLocation', { LocationId: LocationId });
//        }
//    };
//});

//conditionapp.controller('LocationController', function PostsController($scope, LocationFactory) {
//    $scope.LocationData = [];
//    $scope.LocationPopupData = []; $scope.LocationNames = [];
//    $scope.loading = true;
//    $scope.addMode = false;

//    //$scope.clearvalues();

//    $scope.toggleEdit = function () {
//        this.loc.editMode = !this.loc.editMode;
//    };
//    $scope.toggleAddLoc = function () {
//        $scope.addMode = !$scope.addMode;
//        $scope.clearvalues();

//    };

//    $("#txt_locid").val("");
//    $("#txt_locname").val("");
//    $("#txt_locparentid").val("");
//    $("#txt_locdesc").val("");

//    $scope.clearvalues = function () {        
//        $("#txt_locid").val("");
//        $("#txt_locname").val("");
//        $("#txt_locparentid").val("");
//        $("#txt_locdesc").val("");
//    }
//    //check active value
//    //$("#chk_active").click(function () {
//    //    if ($("#chk_active").is(':checked'))
//    //        $("#chk_active").val("True");
//    //    else
//    //        $("#chk_active").val("False");
//    //});

//    $('.errmsg').delay(10000).fadeOut('slow');

//    //get all OPCNames
//    //OPCFactory.getLocationNames().success(function (data) {

//    //    $scope.OPCNames1 = data;
//    //    $scope.LocationNames = [];
//    //    for (var i = 0; i < (data).length; i++) {
//    //        $scope.LocationNames.push((data)[i].DataSource);
//    //    }
//    //    $scope.loading = false;
//    //})
//    //.error(function (data) {
//    //    $scope.error = "An Error has occured while loading OPCNames! ";
//    //    $scope.loading = false;
//    //});

//    //get all OPCData
//    LocationFactory.getLocationData().success(function (data) {
//        $scope.LocationData = data;
//        $scope.loading = false;
//    })
//    .error(function (data) {
//        $scope.error = "An Error has occured while loading OPCData! ";
//        $scope.loading = false;
//    });
//    //add customer
//    $scope.AddLocation = function () {
//        $scope.loading = true;
//        var Locdataobj = new Array();
//        var LocationId = $("#txt_locid").val();
//        var LocationName = $("#txt_locname").val();
//        //var ParentLocationName = $("#txt_locparentname").val();
//        var ParentLocationId = $("#txt_locparentid").val();
//        var Description = $("#txt_locdesc").val();
//        if (LocationId == "") {
//            $scope.error = "Please Enter Location Id";
//        } else if (LocationName == "") {
//            $scope.error = "Please Enter Location Name ";
//        }
//            //else if (ParentLocationName == "") {
//            //    $scope.error = "Please Enter Parent Location Name";
//            //}
//        else {
//            if (ParentLocationId == "") {
//                ParentLocationId = 0;
//            }
//            Locdataobj.push({
//                "LocationId": LocationId,
//                "LocationName": LocationName,
//                "Description": Description,
//                "ParentLocationId": ParentLocationId
//                //"ParentLocationName": ParentLocationName
//            });
//            var Save_Locdata = JSON.stringify(Locdataobj);
//            LocationFactory.addLocation(Save_Locdata).success(function (data) {
//                $scope.error = data;
//                $scope.addMode = false;
//                $scope.loading = false;
//                LocationFactory.getLocationData().success(function (data) {
//                    $scope.LocationData = data;
//                    $scope.loading = false;
//                }).error(function (data) {
//                    $scope.error = "An Error has occured while loading OPCData! ";
//                    $scope.loading = false;
//                });
//            }).error(function (data) {
//                $scope.error = "An Error has occured while Adding OPC Data! " + data;
//                $scope.loading = false;
//            });
//        }
//    };
//    //update customer
//    $scope.update = function (loc) {
//        $scope.loading = true;
//        var Locdataobj = new Array();
//        var LocationId = loc.LocationId;
//        var LocationName = loc.LocationName;
//        var Description = loc.Description;
//        var ParentLocationId = loc.ParentLocationId;
//        //var ParentLocationName = loc.ParentLocationName;
//        if (LocationId == "") {
//            $scope.error = "Please Enter Location Id";
//        } else if (LocationName == "") {
//            $scope.error = "Please Enter Location Name ";
//        }
//        else {
//            if (ParentLocationId == "") {
//                ParentLocationId = 0;
//            }
//            Locdataobj.push({
//                "LocationId": LocationId,
//                "LocationName": LocationName,
//                "Description": Description,
//                "ParentLocationId": ParentLocationId,
//                //"ParentLocationName": ParentLocationName
//            });
//            var locdata = JSON.stringify(Locdataobj);
//            LocationFactory.Locupdatedata(locdata).success(function (data) {
//                $scope.error = data;
//                loc.editMode = false;
//                $scope.loading = false;
//            }).error(function (data) {
//                $scope.error = "An Error has occured while Updating  OPC Data! " + data.ExceptionMessage;
//                $scope.loading = false;
//            });
//        }
//    };

//    // delete Customer
//    $scope.deletelocdata = function (loc) {
//        $scope.loading = true;
//        var LocationId = loc.LocationId;
//        LocationFactory.deletelocdata((LocationId)).success(function (data) {
//            $scope.error = data
//            $.each($scope.LocationData, function (i) {
//                if ($scope.LocationData[i].LocationId === LocationId) {
//                    $scope.LocationData.splice(i, 1);
//                    return false;
//                }
//            });
//            $scope.loading = false;
//        }).error(function (data) {
//            $scope.error = "An Error has occured while Deleting OPC Data! " + data.ExceptionMessage;
//            $scope.loading = false;
//        });
//    };


//    $scope.showloclistpopup = function () {
//        LocationFactory.getLocationListPopup().success(function (data) {
//            //$scope.LocationPopupData = data;
//            var htmltbl = "";
//            for (var i = 0; i < data.length; i++) {
//                htmltbl += "<tr onclick='getparentdetails(this)'><td>" + data[i]["LocationId"] + "</td><td>" + data[i]["LocationName"] + "</td></tr>";
//            }
//            $("#locationpopuplisttbl tbody").html(htmltbl);
//            $("#locationpopuplisttbl").DataTable();
//            $scope.loading = false;
//            var element = angular.element("#myModalforLocList");
//            element.modal('show');
//        }).error(function (data) {
//            $scope.error = "An Error has occured while loading OPCData! ";
//            $scope.loading = false;
//        });
//    };

//    $scope.loclistmodalhide = function () {
//        var element = angular.element('#myModalforLocList');
//        element.modal('hide');
//    };

//    $scope.sort = function (keyname) {
//        $scope.sortKey = keyname;   //set the sortKey to the param passed
//        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
//    }
//});
//function getparentdetails(obj) {
//    $("#txt_locparentid").val($(obj).find("td:eq(0)").html());
//    //$("#txt_locparentname").val($(obj).find("td:eq(1)").html());
//    var element = angular.element('#myModalforLocList');
//    element.modal('hide');
//}



RapidApp.factory('OPCServerFactory', function ($http) {
    return {
        getopcconnlist: function () {
            return $http.get('/OPCServerConnection/GetOPCConnList');
        },
        TestConn: function (Test_Conn) {
            return $http.post('/OPCServerConnection/TestOPC_Connection', { Test_Conndata: Test_Conn });
        },
        saveConn: function (Save_Conn) {
            return $http.post('/OPCServerConnection/SaveOPC_Connection', { Save_Conndata: Save_Conn });
        },
        editOPCCon: function (Edit_Conn) {
            return $http.post('/OPCServerConnection/EditOPC_Connection', { Edit_Conn: Edit_Conn });
        },
        removeConn: function (selcteditem) {
            return $http.post('/OPCServerConnection/RemoveOPC_Connection', { remove_ConndataId: selcteditem });
        },
        getAvailTagsData: function (selctConnId) {
            return $http.post('/OPCServerConnection/GetOPCAvailTags', { selectedConnId: selctConnId });
        },
        get_Colldtails: function (Get_SPdtails) {
            return $http.post('/OPCServerConnection/GET_Colldtails', { GET_SPdtail: Get_SPdtails });
        }
    };
});




RapidApp.controller('GetOPCServerConnections', function ($scope, $location, OPCServerFactory) {
    $scope.selected = 'tile';
    $scope.selected1 = 'tile1';
    $scope.mongodbconnections = [];
    $scope.hideConnIdOPCEdit = "save";
    $scope.templatesettings = { HeaderTitle: "OPC Server" };
    $scope.opctags_Type = 'Manual';
    $("#tagsdtails").hide();
    $scope.modal = { status: true, sqlstatus: true, orclstatus: true, statusparamchk: true, statusparamchkdata: true, statustdchk: true, paramconfigstatus: true }
    numbervalidate();
    //........  getting created sql connections list .....//
    OPCServerFactory.getopcconnlist().success(function (data) {
        if (data.tabledata) {
            var conlistcnt = JSON.parse(data.tabledata).length;
            if (conlistcnt == "0") {
                //alert("Please Check the Login Credentials..............");
            }
            else {
                $scope.opcconnections = JSON.parse(data.tabledata);
            }
        }
        else if (data.errorresult) {
            alert(data.errorresult);
        }
    }).error(function (data) {
        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //........  Open Create MongoDB Connection Popup .....//
    $scope.AddMongoConnection = function () {
        var element = angular.element('#myOPCModal');
        element.modal('show');
        opcclear();
    };

    //........  getting sql template function.....//
    $scope.go = function (path) {
        $location.path(path);
    };
    //........  getting sql template function ended.....//

    //...........selecting radio for SQL Authentication .................//
    $scope.opctagradioclick = function () {
        var objfordblist = new Array();
        var opctags_Type = $scope.opctags_Type;
        if ($('input[name= OPCTags]:checked').val() == "Manual") {
            $("#TagsFromFile").hide();
            $("#ManualTags").show();
        }
        else if ($('input[name= OPCTags]:checked').val() == "FromFile") {
            $("#TagsFromFile").show();
            $("#ManualTags").hide();
        }
    };
    //...........selecting radio for SQL Authentication ended.................//

    //...........Test Operation for OPC Connection .................//
    $scope.testconnection = function () {
        var Connobj = new Array();
        var OPCConnString = $scope.opc_ConnectionString;
        var ServerName = $scope.opc_ServerName;
        if (ServerName == "") {
            ServerName = "";
        }
        Connobj.push({
            "OPCConnString": OPCConnString,
            "ServerName": ServerName
        });
        var Test_Conndata = JSON.stringify(Connobj);
        try {
            OPCServerFactory.TestConn(Test_Conndata).success(function (data) {
                if (data.resultdata) {
                    var response = data.resultdata;
                    if (response == "Sucess") {
                        $("#showtestmsg").text("");
                        $("#showtestmsg").show();
                        $("#showtestmsg").css({ "color": "green" }).html("Connection Succeeded" + " " + "<img src='../../Images/check.png'/>");
                    }
                    else {
                        $("#showtestmsg").text("");
                        $("#showtestmsg").show();
                        $("#showtestmsg").css({ "color": "red" }).html("Connection Failed" + " " + "<img src='../../Images/DeleteRed.png'/>");
                    }
                }
                else if (data.errorresult) {
                    //alert(data.errorresult);
                    $("#showtestmsg").text("");
                    $("#showtestmsg").show();
                    $("#showtestmsg").css({ "color": "red" }).html(data.errorresult + " " + "<img src='../../Images/DeleteRed.png'/>");
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //...........Test Operation for OPC Connection Ended.................//

    //...........Save Operation for OPC Connection .................//
    $scope.saveOPCConn = function () {
        var Connobj = new Array();
        var ConnectionType = $scope.opc_ConnectionType;
        var ConnectionName = $scope.opc_ConnectionName;
        var OPCConnString = $scope.opc_ConnectionString;
        var ServerName = $scope.opc_ServerName;
        if (ServerName == "") {
            ServerName = "";
        }
        var TagsArray = new Array();
        $(".Tags").find('li').each(function () {
            var TagName = $(this).children().eq(0).val();
            var TagAlias = $(this).children().eq(1).val();
            var TagDesc = $(this).children().eq(2).val();
            TagsArray.push({
                TagName: TagName,
                TagAlias: TagAlias,
                TagDesc: TagDesc
            });
        });
        var tagnamebool = true;
        $(".Tags").find('li').each(function () {
            if ($(this).children().eq(0).val() == "") {
                tagnamebool = false;
            }
            else {
                tagnamebool = true;
            }
        });
        var RefreshTime = $scope.opc_refreshtime;
        if (RefreshTime == "") {
            RefreshTime = 0;
        }
        var operation = $scope.hideConnIdOPCEdit;
        Connobj.push({
            "ConType": ConnectionType,
            "ConName": ConnectionName,
            "OPCConnString": OPCConnString,
            "ServerName": ServerName,
            "TagsArray": TagsArray,
            "RefreshTime": RefreshTime,
            "operation": operation
        });
        var Save_Conndata = JSON.stringify(Connobj);
        //alert(Save_Conndata);
        try {
            if (tagnamebool == true) {
                $("#showmsg").hide();
                $("#showmsg").text("");
                OPCServerFactory.saveConn(Save_Conndata).success(function (data) {
                    //responsedata
                    if (data.responsedata) {
                        if (data.responsedata == "duplicate") {
                            alert("Connection Name Already Exists...!");
                        }
                        else {
                            $scope.opcconnections = JSON.parse(data.responsedata);
                            var element = angular.element('#myOPCModal');
                            element.modal('hide');
                            opcclear();
                            $scope.hideConnIdOPCEdit = "save";
                        }
                    }
                    else if (data.errorresult) {
                        alert(data.errorresult);
                    }
                }).error(function (data) {
                    alert(data);
                });
            }
            else {
                $("#showmsg").show();
                $("#showmsg").text("All Tag Names Mandatory....");
            }
        }
        catch (e) {
            alert(e);
        }
    };
    //...........Save Operation for OPC Connection Ended.................//


    //...........update Operation for Sql Connection .................//
    $scope.editOPCConn = function (e) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        var editConnId = e;
        try {
            OPCServerFactory.editOPCCon(editConnId).success(function (data) {
                if (data == "Fail") {
                    alert("Instance related Error Occured Check the Credentials...");
                }
                else {
                    var element = angular.element('#myOPCModal');
                    element.modal('show');
                    $scope.hideConnIdOPCEdit = data[0].Id;
                    $scope.opc_ConnectionName = data[0].ConnectionName;
                    $scope.opc_ConnectionType = data[0].ConnectionType;
                    $scope.opc_ServerName = data[0].ServerName1;
                    $scope.opc_ConnectionString = data[0].OPCConnString;
                    if (data[0].RefreshTime == "" || data[0].RefreshTime == null)
                        $scope.opc_refreshtime = 0;
                    else
                        $scope.opc_refreshtime = data[0].RefreshTime;
                    var TagsList = data[0].TagsList;
                    var TagArrayRes = JSON.parse(TagsList);
                    $(".Tags li").remove();
                    for (var i = 0; i < TagArrayRes.length; i++) {
                        var $AddTolist = $('#duplicatetagsli');
                        var tagliststring = '<li><input class="span" style="height: 30px; margin: 1px 1px 0; width: 152px;" type="text" name="key" tabindex="3" autocomplete="on" value="" placeholder="TagName" />';
                        tagliststring += '<input class="span" style="height: 30px; margin: 1px 2px 0 3px; width: 211px;" type="text" name="value" tabindex="3" autocomplete="on" value="" placeholder="Tag Alias" />';
                        tagliststring += '<input class="span" style="height: 30px; margin: 1px 2px 0 3px; width: 211px;" type="text" name="value" tabindex="3" autocomplete="on" value="" placeholder="Tag Desc" />';
                        tagliststring += '<button type="button" class="btn btn-default" onclick="AddTags()" style="width: 30px; height: 26px;"><i class="icon-plus" style="display: block; margin-top: -2px;"></i></button>';
                        tagliststring += '<button type="button" class="btn btn-warning" onclick="RemoveTags(this.parentNode)" style="width: 30px; height: 26px;"><i class="icon-minus" style="display: block; margin-top: -2px;"></i></button></li>';
                        $AddTolist.find('ul').prepend(tagliststring);
                    }
                    $("#duplicatetagsli li").each(function (i) {
                        $(this).children().eq(0).val(TagArrayRes[i].TagName);
                        $(this).children().eq(1).val(TagArrayRes[i].TagAlias);
                        $(this).children().eq(2).val(TagArrayRes[i].TagDesc);
                    });
                }
            }).error(function (data) {
                alert(data);
            });
        }
        catch (e) {
            alert(e);
        }
    };
    //...........update Operation for Sql Connection ended.................//

    //........remove selected OPC Connection from connections list .....//
    $scope.removeItem = function (index, item) {
        var test = confirm("Are you sure want to Delete it?");
        if (test) {
            var selcteditem = item;
            try {
                OPCServerFactory.removeConn(selcteditem).success(function (data) {
                    if (data == "Fail") {
                        alert("Instance related Error Occured...");
                    }
                    else if (data == "error") {
                        alert("No Stored Procedures deleted please try again...");
                    }
                    else {
                        //alert("Successfully Deleted......");
                        $scope.opcconnections.splice(index, 1);
                        //$scope.mongocoll = null;
                    }
                }).error(function (data) {
                    alert(data);
                });

            }
            catch (e) {
                alert(e);
            }
        }
        else {
            return false;
        }
    };
    //........  remove selected OPC Connection from connections list ended .....//

    //........  getting selected sql connection storedprocedures list .....//
    $scope.SelectedOPCConn = function (ConnId) {
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = 'tile';
        }
        this.selected = 'tileselected';
        $scope.lastSelected = this;
        $scope.hideConnIdfortags = ConnId;
        var selctConnId = ConnId;
        var refreshtime = 0;
        var refreshsec = 0;
        if (selctConnId == "" || selctConnId == null) {

        }
        else {
            try {
                OPCServerFactory.getAvailTagsData($scope.hideConnIdfortags).success(function (data) {
                    if (data.errorresult) {
                        alert(data.errorresult);
                    }
                    else if (data.jsontagslist) {
                        var response = JSON.parse(data.jsontagslist);
                        refreshtime = parseInt(response[0]) * 1000;
                        $("#tagsdtails").show();
                        $scope.parameters = response[1];
                    }
                }).error(function (data) {
                    //alert(data);
                });
                //setInterval(function () {
                //    if (refreshtime > 0) {
                //        OPCServerFactory.getAvailTagsData($scope.hideConnIdfortags).success(function (data) {
                //            if (data.errorresult) {
                //                alert(data.errorresult);
                //            }
                //            else if (data.jsontagslist) {
                //                var response = JSON.parse(data.jsontagslist);
                //                refreshtime = response[0];
                //                $("#tagsdtails").show();
                //                $scope.parameters = response[1];
                //            }
                //        }).error(function (data) {
                //            //alert(data);
                //        });
                //    }
                //}, 5000);
            }

            catch (e) {
                //alert(e);
            }
        }
    };
    //........  getting selected sql connection storedprocedures list ended.....//


    //...........close popupop for Sql Connection .................//
    $scope.closeOPCconn = function () {
        var element = angular.element('#myOPCModal');
        element.modal('hide');
    };


    //....clear create connection modal popup .............//

    $scope.opcclearmodal = function () {
        $scope.opc_ConnectionName = "";
        $scope.opc_ConnectionString = "";
        $scope.opc_ServerName = "";
        $scope.hideConnIdOPCEdit = "save";
        $scope.opc_refreshtime = 0;
        $("#duplicatetagsli li").each(function (index) {
            $(this).children('input[type=text]').val("");
            if ($(".Tags li").length > 1) {
                $(this).remove();
            }
        });
        $("#tagsdtails").hide(); $("#errmsg").hide();
        $("#showtestmsg").hide();
    };
   
    //....clear create connection modal popup .............//
    function opcclear() {
        $scope.opc_ConnectionName = "";
        $scope.opc_ConnectionString = "";
        $scope.opc_ServerName = "";
        $scope.hideConnIdOPCEdit = "save";
        $scope.opc_refreshtime = 0;
        $("#myOPCModal").on('hidden', function () {
            $('#myOPCModal').removeData('bs.modal');
            $('#myOPCModal').removeClass('modal-open');
        });
        $("#duplicatetagsli li").each(function (index) {
            $(this).children('input[type=text]').val("");
            if ($(".Tags li").length > 1) {
                $(this).remove();
            }
        });
        $("#tagsdtails").hide(); $("#errmsg").hide();
        $("#showtestmsg").hide();

    };
    //....clear create connection modal popup .............//
    
});

//...........Dynamic Add Tags.................//

function AddTags() {
    var $AddTolist = $('#duplicatetagsli');
    $AddTolist.find('li:last').clone(true).appendTo($AddTolist.find('ul'));
    var iCnt = $("#duplicatetagsli li").length;
    $("#duplicatetagsli li").each(function (index) {
        if (index < iCnt - 1) {
            $(this).children().removeAttr("disabled");
            $(this).children().eq(0).focus();
        }
        else {
            //$(this).children('input[type=text]').attr("disabled", "disabled");
            $(this).children('input[type=text]').val("");
        }
    });
};

//...........Dynamic Add Tags Ended.................//

//...........Dynamic Remove Tags.................//
function RemoveTags(childElm) {
    var parentElm = childElm.parentNode;
    if ($(".Tags li").length > 1) {
        parentElm.removeChild(childElm);
    }
};
//...........Dynamic Remove Tags Ended.................//

function numbervalidate() {
    $("#opc_refreshtime").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Digits Only").show().fadeIn(1500);
            return false;
        }
        else {
            $("#errmsg").hide();
            return true;
        }
    });
}

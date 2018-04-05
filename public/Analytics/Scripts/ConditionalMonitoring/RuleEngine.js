$(function () {
    $(document).on('click', 'a[name=lnkViews]', function (e) {
        angular.element($(this)).scope().myfunction('test');
        //    $("#ddl_Post")
      
        //alert($("#duplicateli_cb_SMS_div #recipient_number").val());     
    });
})



var delid = "";

RapidApp.service("RuleEngineService", function ($http) {
   

    this.getOPCTagsdata = function () {

        return $http.get("/getopctags").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding tag data.");
                });
    }
    this.createRuleEngine = function (REdata) {

        return $http.post("/CreatingRuleEngine", REdata).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error creating Rule Engine.");
                });
    }
    this.getRuleEngineList = function () {

        return $http.get("/getREList").
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error finding RE List.");
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
    this.EditRuleEngine = function (CllnName) {
        var url = "/EditRuleEnginedata/" + (CllnName);
        return $http.post(url).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert("Error editing Collection.");
                });
    }

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

RapidApp.controller("RuleEngineController", function (RuleEngineService, $scope, $location, $stateParams, $state, $compile) {
  // alert("ss" + $stateParams.id);

    if ($stateParams.id != null) {
       // alert("SS" + $stateParams.action);
        var action = JSON.parse($stateParams.action);
       // alert(action[1]);
        if (action[0] != false)
        {
          
            $("#duplicateli_cb_SMS").prop('checked', true);
            $("#duplicateli_cb_SMS_div").css('display', 'block');
            $("#recipient_number").val(action[0]["MobileNumber"]);
            $("#message_text").val(action[0]["Message"]);

           // alert(action[0]["MobileNumber"]);
        }
        var Cond = $stateParams.id;
        Cond = Cond.split('$$$');
       // alert(Cond);
        for (var i = 0; i < Cond.length; i++) {

            var Slice_li = Cond[i].split('$$');
            if (i == 0) {
                var sliceMeterid = Slice_li[0].split('Attr0Id');
                $('#txt_OPCTag_1').val(sliceMeterid[0]);
                $('#Txt_meter_1').attr("data-meterid", sliceMeterid[1]);
                $('#Ddl_RelOperator_1').val(Slice_li[1]);
                $('#Textarea1').val(Slice_li[2]);
                $('#Ddl_LogicalOpe').val(Slice_li[3]);
                if (Slice_li[3] == "undefined" || Slice_li[3] == "" || Slice_li[3] == null) {
                    $('#Ddl_LogicalOpe').val('&&');
                }
            } else {
                var $AddTolist = $('#duplicateli');
                var FieldCount = Math.floor((Math.random() * 7683480) + 198);
                var AddTolist1 = "<ul class='unstyled params'><li><span>If  </span><textarea ' name='Txt_Value' class='form-control Txt_meter_" + FieldCount +"' style='display: -moz-stack; width: 30%; margin-left: 10px; margin-top: 5px' id='Txt_meter_" + FieldCount + "'></textarea>";
                AddTolist1 += "<span class='glyphicon glyphicon-new-window' style='cursor: pointer; margin-left: 10px' data-ng-click=Tagserverdata(\'txt_OPCTag_" + FieldCount + "\')></span><span style='margin-left: 10px'>Is </span><select style='width: 14%; margin-top: 10px; margin-left: 10px' name='Ddl_RelOperator' chosen id='Ddl_RelOperator_" + FieldCount + "'>";
                AddTolist1 += "<option  value='0'>--Select--</option><option value='=='>==</option> <option value='!='>!=</option><option value='&gt;'>&gt;</option><option value='&lt;'>&lt;</option><option value='&gt;='>&gt;=</option>";
                AddTolist1 += "<option value='&lt;='>&lt;=</option></select><textarea ' name='Txt_Value' class='form-control Txt_Value_" + FieldCount + "' style='display: -moz-stack; width: 30%; margin-left: 10px; margin-top: 5px' name='Txt_Value' id='Txt_Value_" + FieldCount + "'></textarea>";
                AddTolist1 += " <select id='Ddl_LogicalOpe_" + FieldCount + "' chosen style='width: 9%; margin-top: 10px; margin-left: 10px'><option value='&&'>AND</option><option value='||'>OR</option></select> <span onclick='RemoveParams(this.parentNode)' class='rmbtn label-important'>--</span>";
                AddTolist1 += " <br><br><span class='glyphicon glyphicon-new-window' style='cursor: pointer; margin-left: 10px' data-ng-click=Tagserverdata(\'Txt_Value_" + FieldCount + "\')></span><span data-ng-click='AddLogic($event)' class='addbtn' style='background-color: #286090;margin-left:10px;'>+</span></li></ul>";
                $('#duplicateli1').append(AddTolist1);
                $AddTolist2 = $('#duplicateli1');
                $AddTolist2.find('li:last').clone(true).appendTo($AddTolist.find('ul'));

                var sliceMeterid = Slice_li[0].split('Attr0Id');
                $('#Txt_meter_' + FieldCount).val(sliceMeterid[0]);
                $('#Txt_meter_' + FieldCount).attr("data-meterid", sliceMeterid[1]);
                $('#Ddl_RelOperator_' + FieldCount).val(Slice_li[1]);
                $('#Txt_Value_' + FieldCount).val(Slice_li[2]);
                $('#Ddl_LogicalOpe_' + FieldCount).val(Slice_li[3]);
                if (Slice_li[3] == "undefined" || Slice_li[3] == "" || Slice_li[3] == null) {
                    $('#Ddl_LogicalOpe_' + FieldCount).val('&&');
                }
                $compile($AddTolist)($scope);
            }
        }
    }
    //$("#Ddl_RelOperator_1").chosen({
    //    allow_single_deselect: true,
    //    "width": "20%"
    //});

    //$("#Ddl_LogicalOpe").chosen({
    //    allow_single_deselect: true,
    //    "width": "20%"
    //});
    $("#ddl_Post").chosen({
        allow_single_deselect: true,
        "width": "100%"
    });
    
    $("#ddl_Trigger").chosen({
        allow_single_deselect: true,
        "width": "100%"
    });
  

    delid = "";
    $scope.myfunction = function (data) {
        // alert("---" + data);

        var FieldCount = Math.floor((Math.random() * 7683480) + 198);
        var $AddTolist = $('#duplicateli').parent();
        var AddTolist1 = "";
        if ($(this).data('val') == 1) {

            AddTolist1 = "<div id='duplicateli_" + FieldCount + "' class='multiConditions' style='border: 1px dashed darkgrey; margin-top: 10px'> <span style='margin-left: 20px; margin-top: 10px;'> else </span> <span class='removeCondition' style='float:right;cursor:pointer;font-size:20px;margin-top:-6px'> X  </span><br />";

        } else {

            AddTolist1 = "<div id='duplicateli_" + FieldCount + "' class='multiConditions' style='border: 1px dashed darkgrey; margin-top: 10px'> <span style='margin-left: 20px; margin-top: 10px;'> else if </span> <span class='removeCondition' style='float:right;cursor:pointer;font-size:20px;margin-top:-6px'> X  </span><br />";

        }
        AddTolist1 += ' <ul class="unstyled params" style="list-style: outside none none;">' +
              '<li><textarea id="txt_OPCTag_' + FieldCount + '" name="OPCTag" class="form-control txt_OPCTag_' + FieldCount + '" style="display: -moz-stack; width: 30%; margin-top: 5px"></textarea>' +
              '<span class="glyphicon glyphicon-new-window" style="cursor: pointer; margin-left: 10px" data-ng-click=Tagserverdata(\'txt_OPCTag_' + FieldCount + '\')></span>' +
              ' <span style="margin-left: 10px">Is </span>' +
              ' <select id="Ddl_RelOperator_' + FieldCount + '" chosen name="Ddl_RelOperator" class="form-control" style="display: -moz-stack; width: 20%; margin-left: 10px">' +
              '<option value="0">--Select--</option> <option value="==">==</option><option value="!=">!=</option> <option value="&gt;">&gt;</option>' +
              '<option value="&lt;">&lt;</option> <option value="&gt;=">&gt;=</option> <option value="&lt;=">&lt;=</option>  </select>' +
              '<textarea id="Txt_Value_' + FieldCount + '" name="Txt_Value" class="form-control Txt_Value_' + FieldCount + '" style="display: -moz-stack; width: 30%; margin-left: 10px; margin-top: 5px"></textarea>' +
              '<span class="glyphicon glyphicon-new-window" style="cursor: pointer; margin-right: 5px; margin-left: 10px" data-ng-click=Tagserverdata(\'Txt_Value_' + FieldCount + '\')></span>' +
              '<span class="rmbtn" style="background-color: #EB3C00" onclick="RemoveParams(this.parentNode)">--</span>' +
              '<span data-ng-click=AddLogic($event) class="addbtn" style="background-color: #286090">+</span><br /> <br />' +
              '<select id="Ddl_LogicalOpe" chosen class="form-control" style="display: -moz-stack; width: 10%; margin-left: 10px;"> <option value="&&">AND</option> <option value="||">OR</option> </select> <br />' +
              '</li> </ul><label style="margin-top: 10px">Action<i style="color: Red;">*</i></label><br />' +
              ' <label style="margin-left: 10px;"><input  type="checkbox" id="duplicateli_' + FieldCount + '_cb_SMS" />  SMS</label>' +
              '<label style="margin-left: 10px"><input  type="checkbox" id="duplicateli_' + FieldCount + '_cb_Email" /> Email</label>' +
              '<label style="margin-left: 10px"> <input  type="checkbox" id="duplicateli_' + FieldCount + '_cb_PTS" /> Post TO Server</label>' +
               '<label style="margin-left: 10px"><input  type="checkbox" id="duplicateli_' + FieldCount + '_cb_STD" /> Store TO DataBase</label>' +
               '<div class="row" id="duplicateli_' + FieldCount + '_cb_SMS_div" style="display: none; margin-top: 10px"></div>' +
               '<div id="duplicateli_' + FieldCount + '_cb_Email_div" style="display: none; margin-top: 10px"></div>' +
               '<div  id="duplicateli_' + FieldCount + '_cb_PTS_div" style="display: none; margin-top: 10px"></div>' +
               '<div  id="duplicateli_' + FieldCount + '_cb_STD_div" style="display: none; margin-top: 10px"></div>' +
               '<a href="javascript:void(0);" name="lnkViews" data-val="1" style="float: right; margin-right: 10px;">Add else</a>' +
               '<a href="javascript:void(0);" name="lnkViews" data-val="2" style="float: right; margin-right: 10px;">Add else if</a> <br />';

        $($AddTolist).append(AddTolist1);

        $('#duplicateli_cb_SMS_div').clone(true).children().appendTo($("#duplicateli_" + FieldCount + "_cb_SMS_div"));
        $('#duplicateli_cb_Email_div').clone(true).children().appendTo($("#duplicateli_" + FieldCount + "_cb_Email_div"));
        $('#duplicateli_cb_PTS_div').clone(true).children().appendTo($("#duplicateli_" + FieldCount + "_cb_PTS_div"));
        $('#duplicateli_cb_STD_div').clone(true).children().appendTo($("#duplicateli_" + FieldCount + "_cb_STD_div"));

        //$('#firstdiv_1').clone(true).appendTo($("#duplicateli_" + FieldCount));
        $($AddTolist).append('</div>');

        $compile($AddTolist)($scope);
    };
    $scope.AddLogic = function ($event) {
        //alert($event.target);

        var $AddTolist = $($event.target).closest("div").closest('div');
        // alert($AddTolist.html());
        var FieldCount = Math.floor((Math.random() * 7683480) + 198);
        var AddTolist1 = "<ul class='unstyled params'><li><textarea class='form-control txt_OPCTag_" + FieldCount + "' style='display: -moz-stack; width: 30%; margin-top: 5px' name='OPCTag' id='txt_OPCTag_" + FieldCount + "'></textarea>";
        AddTolist1 += " <span class='glyphicon glyphicon-new-window' style='cursor: pointer; margin-left: 10px' data-ng-click=Tagserverdata(\'txt_OPCTag_" + FieldCount + "\')></span> <span style='margin-left: 10px'>Is </span> <select chosen id='Ddl_RelOperator_" + FieldCount + "' name='Ddl_RelOperator' class='form-control' style='display: -moz-stack; width: 20%; margin-left: 10px'>";
        AddTolist1 += "<option  value='0'>--Select--</option><option value='=='>==</option> <option value='!='>!=</option><option value='&gt;'>&gt;</option><option value='&lt;'>&lt;</option><option value='&gt;='>&gt;=</option>";
        AddTolist1 += "<option value='&lt;='>&lt;=</option></select> <textarea id='Txt_Value_" + FieldCount + "' name='Txt_Value' class='form-control Txt_Value_" + FieldCount + "' style='display: -moz-stack; width: 30%; margin-left: 10px; margin-top: 5px'></textarea> <span class='glyphicon glyphicon-new-window' style='cursor: pointer;margin-right: 5px; margin-left: 10px' data-ng-click=Tagserverdata(\'Txt_Value_" + FieldCount + "\')></span>";
        AddTolist1 += "  <span onclick='RemoveParams(this.parentNode)' class='rmbtn' style='background-color:#EB3C00'>--</span>";
        AddTolist1 += " <span class='addbtn'  style='background-color:#286090' data-ng-click='AddLogic($event)'>+</span><br/><select chosen id='Ddl_LogicalOpe_" + FieldCount + "' class='form-control' style='display: -moz-stack; width: 10%; margin-left: 10px;'><option value='&&'>AND</option><option value='||'>OR</option></select></li></ul>";
        $('#duplicateli1').append(AddTolist1);
        $AddTolist2 = $('#duplicateli1');
        $AddTolist2.find('li:last').clone(true).appendTo($AddTolist.find('ul'));
        // alert($AddTolist2);
     
       
        $compile($AddTolist)($scope);
      
      
    //    $('#txt_OPCTag_' + FieldCount).css('background-color','red');


    }
   
    $scope.Tagserverdata = function (prevNode) {
        // alert(prevNode);
         nodes = prevNode;
      
        RuleEngineService.getOPCTagsdata().then(function (doc) {


            $('#TagsServerdatamodal').modal('show')
            $("#tagserver_tbl").dataTable().fnDestroy();
            var response = doc.data;
            var htmldata = '';
            $('#tagservertbody').empty();
            for (var i = 0; i < response.length; i++) {
                htmldata += '<tr  onclick="gettagserverdetails(this)">';
                htmldata += '<td>' + response[i]["description"] + '</td>';
                htmldata += '<td>' + response[i]["equipementname"] + '</td>';
                htmldata += '</tr>';
            }

            $('#tagservertbody').append(htmldata);

            $('#tagserver_tbl').DataTable();
        }, function (response) {

        });

    }
    $scope.fn_SaveRules = function () {
        var flag = 0;
        var ActionData = "";
        var Ta_OPCtags; var Txt_Val; var PostValue; var Ddl_RelOperator; var Ddl_LogOperator; var Parameter_Id; var opc_id;
        var DynamicValues = new Array();
       // alert($("#txt_RuleName").val());
        var RuleName = $("#txt_RuleName").val();
        var RuleDesc = $("#txt_RuleDesc").val();
        var Active = $('#cb_active').is(":ch" +
        		"ecked");
        var TriggerId = $("#ddl_Trigger option:selected").val();
        var PostId = $('#ddl_Post option:selected').val();
        if ($('#ddl_Post').val() == 2) {
            PostValue = $('#txt_PostValue').val();
        } else {
            PostValue = null;
        }
        if (RuleName == "") {
            flag = flag + 1;
           
           // $("#txt_RuleName").css('border-color', 'red');
            $("#txt_RuleName").after('<span  style="color:#a94442" ><b>Rule Name !!</b> Input is required</span>');
        }
        var MultiConditions = [];
        // div[class="multiConditions"]
        $('.multiConditions').each(function (index, item) {

            var Condition = $('#' + item.id + ' span:first-child').text() + "(";
            var ExecuteCondition = $('#' + item.id + ' span:first-child').text() + "(";
            var EditCondition = "(";
            var liCount = $('#' + item.id + ' ul li').length;
            var LogicalOpe = "";
            var testobj = [];
            var append_liEnd = "";
            $('#' + item.id + ' .unstyled').find('li').each(function (i) {

                Ta_OPCtags = $(this).find('textarea').eq(0).val();
                Txt_Val = $(this).find('textarea').eq(1).val();
                Ddl_RelOperator = $(this).find('select').eq(0).val();
                Ddl_LogOperator = $(this).find('select').eq(1).val();
                if (Ta_OPCtags == "") {
                    flag = flag + 1;
                   // $(this).find('textarea').eq(0).css('border-color', 'red');
                    $(this).find('textarea').eq(0).after('<span  style="color:#a94442"> Input is required</span>');
                }
                if (Txt_Val == "") {
                    flag = flag + 1;
                   // $(this).find('textarea').eq(1).css('border-color', 'red');
                    $(this).find('textarea').eq(1).after('<span  style="color:#a94442"> Input is required</span>');

                } if (Ddl_RelOperator == "0") {
                    flag = flag + 1;
                   // $(this).find('select').eq(0).css('border-color', 'red');
                    $(this).find('select').eq(0).after('<span  style="color:#a94442"> Input is required</span>');
                }
                if (i == liCount - 1) {
                    LogicalOpe = "";
                    append_liEnd = "";
                } else {
                    LogicalOpe = $(this).find('select').eq(1).val();
                    append_liEnd = "$$" + LogicalOpe + "$$$";
                }
                Condition += $(this).find('textarea').eq(0).val() + " " + $(this).find('select').eq(0).val() + " " + $(this).find('textarea').eq(1).val() + "" + LogicalOpe;
                ExecuteCondition += $(this).find('textarea').eq(0).data("meterid") + " " + $(this).find('select').eq(0).val() + " " + $(this).find('textarea').eq(1).val() + "" + LogicalOpe;
                EditCondition += $(this).find('textarea').eq(0).val() + "Attr0Id" + $(this).find('textarea').eq(0).data("meterid") + "$$" + $(this).find('select').eq(0).val() + "$$" + $(this).find('textarea').eq(1).val() + "" + append_liEnd;
                testobj.push({ "txt1": $(this).find('textarea').eq(0).val(), "con": $(this).find('select').eq(0).val(), "txt2": $(this).find('textarea').eq(1).val() });
            });
            Condition += ")";
            ExecuteCondition += ")";
            EditCondition += ")";
            MultiConditions.push({ Condition: Condition, EditCondition: EditCondition });

            var Actions = [];
            $('#' + item.id + ' input[type=checkbox]').each(function (index1, item1) {
                var divids = item1.id;
                var getActionType = divids.split('_');
                var Action = getActionType[getActionType.length - 1];
                // alert("Action: " + Action);

                ActionData = perform_action(Action, divids);
                Actions.push(ActionData);
                // alert("Actions: " + JSON.stringify(Actions));
            });
            MultiConditions.push({ Actions: Actions });

        });

        var FromDate; var ToDate; var DateOperations = [];
        $('#duplicateli_date .unstyled').find('li').each(function (i) {

            FromDate = $(this).find('input').eq(0).val();
            ToDate = $(this).find('input').eq(1).val();
            if (FromDate == "") {
                flag = flag + 1;
               // $(this).find('input').eq(0).css('border-color', 'red');
                $(this).find('input').eq(0).after('<span  style="color:#a94442">Input is required</span>');
            }
            if (ToDate == "") {
                flag = flag + 1;
               // $(this).find('input').eq(1).css('border-color', 'red');
                $(this).find('input').eq(1).after('<span  style="color:#a94442">Input is required</span>');
            }
            DateOperations.push(FromDate + "$$$" + ToDate);
            // OperateTo += $(this).find('textarea').eq(0).data("meterid") + " " + $(this).find('select').eq(0).val() + " " + $(this).find('input').eq(0).val() + "" + LogicalOpe;
            //EditCondition += $(this).find('textarea').eq(0).val() + "Attr0Id" + $(this).find('input').eq(0).data("meterid") + "$$" + $(this).find('select').eq(0).val() + "$$" + $(this).find('input').eq(1).val() + "" + append_liEnd;
        });

        if (flag > 0 && flag==0) {

        }
        else {
            DynamicValues.push({
                RuleName: RuleName,
                RuleDesc: RuleDesc,
                PostId: PostId,
                PostValue: PostValue,
                TriggerId: TriggerId,
                Active: Active,
                MultiConditions: MultiConditions,
                DateOperations: DateOperations
                //EditCondition: EditCondition,
                //ExecuteCondition: ExecuteCondition
            });
        }
        var jsonstring = JSON.stringify(DynamicValues);
      
        RuleEngineService.createRuleEngine(jsonstring).then(function (doc) {
            $scope.addMode = false;
            $scope.loading = false;
            $scope.error = doc.data;
            //$location.path("/RuleEngineList/");
            $state.go('RuleEngineList', {
            });

        }, function (response) {
            $scope.loading = false;

        });

        //RuleEngineService.getRuleEngineList().then(function (data) {
        //    //$scope.GroupData = data;
        //    alert(data);
        //    $scope.loading = false;
        //}, function (response) {
        //    $scope.error = "An Error has occured while loading RuleEngine! ";
        //    $scope.loading = false;
        //});
    }
    $scope.gotolist = function () {

        //$location.path("/RuleEngineList/");


        $state.go('RuleEngineList', {
        });
    }

})
RapidApp.controller("RuleEngineListController", function (RuleEngineService, $scope, $location, $state, $stateParams) {
    delid = "";
    
    RuleEngineService.getRuleEngineList().then(function (doc) {
        // doc.data;
        $("#tbl_RuleEngine").DataTable().destroy();

        var response = doc.data
        var htmldata = '';
        $('#tbl_RuleEngine tbody').empty();

        //alert(JSON.stringify(doc.data));
        for (var i = 0; i < response.length; i++) {
            htmldata += '<tr id=' + response[i]["id"] + ' onclick="getRuleEngineName(this)">';
            htmldata += '<td>' + (i + 1) + '</td>';
            htmldata += '<td>' + response[i]["rulename"] + '</td>';
            htmldata += '<td>' + response[i]["createdby"] + '</td>';
            htmldata += '</tr>';
        }

        $('#tbl_RuleEngine tbody').append(htmldata);

        $('#tbl_RuleEngine').DataTable();

    }, function (response) {

    });



    $scope.gotoedit = function () {

        var cllnName = $("#REeditdata").data("editval");
        cllnName = delid;
       //  alert(cllnName);
        if (cllnName != "") {
            bootbox.confirm("Do You want to edit this Record?", function (result) {
                if (result) {
                    RuleEngineService.EditRuleEngine(cllnName).then(function (doc) {
                        if (doc.error) {
                            $scope.error = doc.error;
                        }
                        else {
                            delid = "";
                            // alert(JSON.stringify(doc));
                            //  alert(doc["data"].action);
                            //$scope.error = doc.data;
                            //$location.path("/RuleEngineList/");
                            //$state.go('RuleEngineList', {
                            //});
                            // $state.go($state.current, {}, { reload: true });
                            $state.go('CreateRuleEngine', {
                                id: doc["data"].editcondition,
                                action: doc["data"].action,
                            });
                        }

                    }, function (response) {
                        delid = "";
                        //  alert(JSON.stringify(doc));
                        // alert(doc["data"]);
                        // $location.path("/RuleEngineList/");
                        //$state.go('RuleEngineList', {
                        //});
                        // $state.go($state.current, {}, { reload: true });
                        $state.go('CreateRuleEngine', {
                            id: doc["data"],
                            action: doc["data"].action,
                        });
                    });
                    //var contactUrl = "/CreateRuleEngine/" + $("#REeditdata").data("editval");
                    // $location.path(contactUrl);
                    //  alert(delid);
                    //$state.go('CreateRuleEngine', {
                    //    id: $("#REeditdata").data("editval")
                    //});
                }
            });
        }
        else {
             fn_errorNotification("200", "", "", "Please Select row to edit", "error_alert", "", "");
        }

    }
    $('#tbl_RuleEngine tbody').on('click', 'tr', function () {

        $('#tbl_RuleEngine tbody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });
    $scope.gotocreate = function () {
        //alert("ss");
        //$location.path("/CreateRuleEngine");
        $state.go('CreateRuleEngine');
    }
    $scope.deleteRuleEngine = function () {
        var cllnName = $("#REeditdata").data("editval");
        cllnName = delid;
       // alert(cllnName);
        if (cllnName != "") {
            bootbox.confirm("Do You want to Delete this Record?", function (result) {
                if (result) {
                    RuleEngineService.DeleteRECollection(cllnName).then(function (doc) {
                        if (doc.error) {
                            $scope.error = doc.error;
                        }
                        else {
                            delid = "";
                            //alert(JSON.stringify(doc));
                            //$scope.error = doc.data;
                            //$location.path("/RuleEngineList/");
                            //$state.go('RuleEngineList', {
                            //});
                            $state.go($state.current, {}, { reload: true });
                        }

                    }, function (response) {
                        delid = "";
                        // $location.path("/RuleEngineList/");
                        //$state.go('RuleEngineList', {
                        //});
                        $state.go($state.current, {}, { reload: true });
                    });
                }
            });
        }
        else {
            //alert("Please Select row to delete");
            fn_errorNotification("200", "", "", "Please Select row to delete", "error_alert", "", "");
        }
    }
})
function getRuleEngineName(e) {
    // $("#REeditdata").data("editval", $(e).find('td:eq(1)').text());
   // alert($(e).attr('id'));
    delid = $(e).attr('id');
  //  $("#REeditdata").data("editval", $(e).attr('id'));
   // alert($("#REeditdata").attr("editval"));
}

function gettagserverdetails(obj) {
  //  alert(nodes);
   // alert($('#' + nodes).attr('class'));
   // $('.' + nodes).val("class");
   // alert($('#' + nodes).attr('class'));
    $('.' + nodes).val($('#' + nodes).val() + $(obj).find("td:eq(1)").html() + "." + $(obj).find("td:eq(0)").html() + " + ");

    $('#TagsServerdatamodal').modal('hide')
}
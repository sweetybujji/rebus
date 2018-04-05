RapidApp.controller('VirtualtagslistCtrl', function ($scope, $location, $compile, $state) {

   
    //$scope.templatesettings = { HeaderTitle: "Choose Your Data Connection" };
    //$scope.go = function (path) {

    //    $location.path(path);
    //};
    $scope.Addvirtualtagsform = function () {
        //alert("dd");
        //$location.path("/virtualtagsform");
        $state.go('virtualtagsform');
    };

    //angular.element(document).ready(function () {
    //    var $AddTolist = $('#vtaglisttbody');
    //    $.ajax({
    //        type: 'GET',
    //        contentType: 'application/JSON',
    //        url: '/getVirtualTagsDetails',
    //        // data : data,
    //        success: function (res) {
    //            $('#vtaglisttbody').empty();
    //            var html = '';
    //            var slno = 1;
    //            for (var i = 0; i < res.rows.length; i++) {
    //                html += '<tr>';
    //                html += '<td>' + parseInt(slno + i) + '</td>';
    //                html += '<td>' + res.rows[i]["ivtagname"] + '</td>';
    //                html += '<td>' + res.rows[i]["igroupname"] + '</td>';
    //                html += '<td>' + res.rows[i]["istartfrom"] + '</td>';
    //                html += '<td>' + res.rows[i]["ipollfreq"] + '</td>';
    //                html += '<td>' + res.rows[i]["ipostfreq"] + '</td>';
    //                html += '<td>' + res.rows[i]["iactive"] + '</td>';
    //                html += '<td><div class="hidden-sm hidden-xs action-buttons"><a class="green" ng-click="edit(\''
    //                                                                        + res.rows[i]["ivtagid"]
    //                                                                        + '\')" > <i class="ace-icon fa fa-pencil bigger-130"></i></a> <a class="red" ng-click="delete('
    //                                                                        + res.rows[i]["ivtagid"]
    //                                                                        + ')"> <i class="ace-icon fa fa-trash-o bigger-130"></i>    </a></div></td>';
    //                html += '</tr>';
    //            }
    //            $($AddTolist).append(html);
    //            $compile($AddTolist)($scope);
    //            $('#vtaglist').dataTable();
    //        }
    //    });
    //});

    $scope.edit = function (ID) {
        //$scope.go("virtualtagsform/" + ID);
        $state.go('virtualtagsform', { id: ID });
    };

    $scope.delete = function (ID) {
        var Eidtid = JSON.stringify({ 'ID': ID });
        if (confirm("Tag Once Deleted Cannot Undo")) {
            $.ajax({
                type: 'POST',
                contentType: 'application/JSON',
                url: '/DeleteTagData',
                data: Eidtid,
                success: function (response) {
                    alert(response);
                    window.location.reload();
                }
            });
        } else {

        }
    }

});


RapidApp.controller('virtualtagsformCtrl', function ($scope, $location, $compile, $state, $stateParams) {

    //alert("ss");

    //$scope.templatesettings = { HeaderTitle: "Choose Your Data Connection" };
    //$scope.go = function (path) {

    //    $location.path(path);
    //};
    var EditID = 0;
    $scope.Virtualtagslist = function () {
        //alert("dd");
        //$location.path("/Virtualtagslist");
        $state.go('Virtualtagslist');

    }
    angular.element(document).ready(function () {
        if ($stateParams.ID == undefined || $stateParams.ID == null || $stateParams.ID == '') {
            EditID = 0;
            $('#submitupdate').text('Submit');
            // $('#updatediv').hide();
            $('#vtagid').text(EditID);
        } else {
            EditID = $stateParams.ID;
            $('#vtagid').text(EditID);
            $('#submitupdate').text('Update');
            // $('#savediv').hide();
            var EditiiD = JSON.stringify({ 'EditID': EditID });
            $.ajax({
                type: 'POST',
                contentType: 'application/JSON',
                url: '/GetTagsDataforEdit',
                data: EditiiD,
                success: function (res) {
                    $('#txt_vtagname').val(res.rows[0]["ivtagname"]);
                    $('#txt_groupname').val(res.rows[0]["igroupname"]);
                    $('#txttagsarea').val(res.rows[0]["iselecttagdata"]);
                    $('#txt_strtfrom').val(res.rows[0]["istartfrom"]);
                    $('#txt_polltime').val(res.rows[0]["ipolluom"]);
                    $('#txt_posttime').val(res.rows[0]["ipostuom"]);
                    $('#txt_pollfrq').val(res.rows[0]["ipollfreq"]);
                    $('#txt_postfreq').val(res.rows[0]["ipostfreq"]);
                    $('select').trigger("chosen:updated");
                    if (res.rows[0]["iactive"] == true) {
                        $('#chk_vtagactive').prop('checked', true);
                    } else {
                        $('#chk_vtagactive').prop('checked', false);
                    }
                }
            });
        }
    });

    $scope.SubmitTagDetails = function () {
        if ($('#txt_vtagname').val() == '' || $('#txt_vtagname').val() == null || $('#txt_vtagname').val() == undefined) {
            $('#txt_vtagname').addClass('has-error1');
            $('#vtagerrorlbl').addClass('has-error help-block');
            $('#vtagerrorlbl').show();
            return false;
        }
        if ($('#txt_groupname').val() == '' || $('#txt_groupname').val() == null || $('#txt_groupname').val() == undefined) {
            $('#txt_groupname').addClass('has-error1');
            $('#groupnamelbl').addClass('has-error help-block');
            $('#groupnamelbl').show();
            return false;
        }
        if ($('#txttagsarea').val() == '' || $('#txttagsarea').val() == null
                || $('#txttagsarea').val() == undefined) {

            $('#txttagsarea').addClass('has-error1');
            $('#tagsarealbl').addClass('has-error help-block');
            $('#tagsarealbl').show();
            return false;
        }
        if ($('#txt_strtfrom').val() == '' || $('#txt_strtfrom').val() == null
                || $('#txt_strtfrom').val() == txt_strtfrom
                || $('#txt_strtfrom') == 'HH:MM:SS') {

            $('#strtfromerror').addClass('has-error');
            $('#strtfromlbl').addClass('has-error help-block');
            $('#strtfromlbl').show();
            return false;
        }

        if ($('#txt_polltime').val() == '' || $('#txt_polltime').val() == undefined) {
            $('#txt_polltime_chosen').addClass('chosenerror');
            $('#polltimeerror').addClass('has-error');
            $('#polltimelbl').addClass('has-error help-block');
            $('#polltimelbl').show();
            return false;

        }

        if ($('#txt_posttime').val() == '' || $('#txt_posttime').val() == undefined) {
            $('#txt_posttime_chosen').addClass('chosenerror');
            $('#posttimeerror').addClass('has-error');
            $('#posttimelbl').addClass('has-error help-block');
            $('#posttimelbl').show();
            return false;
        }

        var active = '';

        if ($('#chk_vtagactive').prop('checked') == true) {
            active = 'true';
        } else {
            active = 'false';
        }

        var vtagname = $('#txt_vtagname').val();
        var groupname = $('#txt_groupname').val();
        var tagsarea = $('#txttagsarea').val();
        var strtfrom = $('#txt_strtfrom').val();
        var polltime = $('#txt_polltime').val();
        var posttime = $('#txt_posttime').val();
        var pollfrq = $('#txt_pollfrq').val();
        var postfreq = $('#txt_postfreq').val();

        var tagsdata = JSON.stringify({
            'vtagname': vtagname,
            'groupname': groupname,
            'tagsarea': tagsarea,
            'strtfrom': strtfrom,
            'polltime': polltime,
            'posttime': posttime,
            'pollfrq': pollfrq,
            'postfreq': postfreq,
            'active': active,
            'EditID': EditID
        });

        $.ajax({
            type: 'POST',
            contentType: 'application/JSON',
            url: '/InsertTagsData',
            data: tagsdata,
            success: function (res) {
                alert(res);
                ressetfields();
                //window.location.href = '#virtualtagsform';
                $state.go('virtualtagsform');
            }
        });
    }

    $scope.btnReset = function () {
        ressetfields();
    };

});

function ressetfields() {
    $('#txt_vtagname').val('');
    $('#txt_groupname').val('');
    $('#txttagsarea').val('');
    $('#txt_strtfrom').val('');
    $('#txt_polltime').val('');
    $('#txt_posttime').val('');
    $('#txt_pollfrq').val('');
    $('#txt_postfreq').val('');
}
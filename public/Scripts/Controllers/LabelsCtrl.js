/**
 * @author Hanumanth
 * @created date 14/02/2017
 * @Modified By Hanumanth
 * @Modified Date 14/02/2017
 */

RapidApp.controller('LabelsCtrl', function ($scope, $location, $stateParams) {
    var jobj = new Object();
    var id = localStorage.getItem('LabelId');
    var type = localStorage.getItem('LabelType');
    /*To populate data in main form for edit operation*/
    if (type == "edit") {
        var Dataobj = [];
        jobj.id = id;
        Dataobj.push(jobj);

        $.ajax({
            url: "/GetLabelsData",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.isauthenticated == false) {
                    StopPageLoader();

                }
                else if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at getting data with code GetLabelsData", "error_alert", "", "");
                }
                else {
                    $("#idlabel").val(response[0]["Id"]);
                    $("#txt_LabelName").val(response[0]["LabelName"]);
                    $("#txt_LabelName").prop("disabled", "disabled");
                    $("#txt_DisplayName").val(response[0]["English"]);
                }
            }
            , error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code GetLabelsData", "error_alert", "", "");
            }
        });
    } else {
        $("#idlabel").val("");
        $("#txt_LabelName").prop("enabled", "enabled");
    }

});

RapidApp.controller('LabelsListCtrl', function ($scope, $location, $state) {

    localStorage.setItem('LabelId', '');
    localStorage.setItem('LabelType', '');

    $scope.go = function (path) {

        $location.path(path);
    };
    $scope.Labelform_update = function () {

        if (LabelSel_name == undefined || LabelSel_name == "undefined" || LabelSel_name == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to Edit " + LabelSel_name + " Details?", function (result) {
                if (result) {
                    LabelSel_name = "";
                    localStorage.setItem('LabelId', Labelrowid);
                    localStorage.setItem('LabelType', 'edit');
                    $state.go('LabelsCreation', {
                        id: Labelrowid,
                        type: 'edit',
                        Name: LabelSel_name
                    });
                }
            });
        }
    };
});
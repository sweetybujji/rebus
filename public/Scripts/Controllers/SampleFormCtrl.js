/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('SampleFormListCtrl', function ($scope, $location, $state) {
    $scope.go = function (path) {
        $location.path(path);
    };
    $scope.newform_update = function () {
        $state.go('SampleForm', {
            id: rowid,
            type: 'edit'
        });
    };
});

RapidApp.controller('SampleFormCtrl', function ($scope, $location, $stateParams) {
    var id = $stateParams.id;
    var type = $stateParams.type;
    var jobj = new Object();

    /*To populate data in main form for edit operation*/
    if (type == "edit") {
        var Dataobj = [];
        jobj.id = id;
        Dataobj.push(jobj);

        //function code  : getupdatedata_003
        $.ajax({
            url: "/getupdatedata",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(Dataobj),
            success: function (response) {
                if (response.error) {
                    fn_errorNotification("200", response.error, response.error, "error occured at getting data with code fn_save_details_003", "error_alert", "", "");
                }
                else {
                    $("#uname").val(response[0]["username"]);
                    $("#dept").val(response[0]["department"]);
                    $("#empid").val(response[0]["empid"]);
                    $("#savelink").hide();
                    $("#idlabel").text(response[0]["id"]);
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at getting data with code getupdatedata_003", "error_alert", "", "");
            }
        });
    }
});
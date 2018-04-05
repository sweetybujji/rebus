RapidApp.controller('RoleBasedFormAccessListCtrl', function ($scope, $location, $state) {
 
    localStorage.setItem('RoleId', "");
    localStorage.setItem('RoleEditType', "");

    $scope.go = function (path) {
        $location.path(path);
    };

    var RoleId = "";
    var RoleName = "";
    $('#ListBody').on('click', 'tr', function () {
        RoleId = $(this).attr("id");
        RoleName = $(this).attr("data-RoleName");
        $('#ListBody tr').each(function () {
            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
            $(this).find('a').css("color", "unset");
        });
        $(this).css("background-color", "#6f99c6");
        $(this).css("color", "white");
        $(this).find('a').css("color", "white");
    });

    $scope.EditRoleAccess = function () {
        if (RoleId == "" || RoleId == null || RoleId == "null") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {
            bootbox.confirm("Do You want to Edit " + RoleName + "  Access?", function (result) {
                if (result) {
                    localStorage.setItem('RoleId', RoleId);
                    localStorage.setItem('RoleEditType', 'Update');
                    $state.go('RoleBasedFormAccess', {
                        id: RoleId,
                        RoleName: RoleName
                    });
                }
            });
        }
    };
});

RapidApp.controller('RoleBasedFormAccessCtrl', function ($scope, $location, $stateParams) {
    RoleId = localStorage.getItem('RoleId');
    Type = localStorage.getItem('RoleEditType');
    GetAllExistingForms();
});
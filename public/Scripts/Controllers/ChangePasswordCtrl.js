/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By Divya
 * @Modified Date 09/11/2017
 */

RapidApp.controller('ChangePasswordCtrl', function ($scope, $location, $stateParams) {
   
    $scope.go = function (path) {
        //alert(path);
        $location.path(path);
    };
});
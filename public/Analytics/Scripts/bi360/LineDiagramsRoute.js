var BiLineDiag = angular.module("EmsLineDiagrams", ['ngRoute']);

BiLineDiag.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', { templateUrl: 'Analytics/views/EmsLineDiagram/Viewer.html', controller: "EmsLineCtrl" })
    /*.when('/Index',{templateUrl:'views/EmsLineDiagram/Index.html', controller: "EmsIndexCtrl"})*/
    
    
    .otherwise({ redirectTo: '/', controller: "EmsLineCtrl" });
    // $locationProvider.html5Mode(true);
    // Specify HTML5 mode (using the History APIs) or HashBang syntax.
    //$locationProvider.html5Mode(false).hashPrefix('!');
    // $locationProvider.html5Mode(true);
}]);


BiLineDiag.controller('EmsLineCtrl', function ($scope, $location) {
    //$scope.templatesettings = { HeaderTitle: "Choose Your Data Connection" };
    $scope.go = function (path) {
    	
        $location.path(path);
    };
    
   /* $scope.togglesidebar=function(){
    	alert("Hello");
    	 $('.sidebar').toggleClass("left");
         $('.list').toggleClass("top");
    }*/
});

BiLineDiag.controller('EmsIndexCtrl', function ($scope, $location) {
    //$scope.templatesettings = { HeaderTitle: "Choose Your Data Connection" };
    $scope.go = function (path) {
    	
        $location.path(path);
    };
});
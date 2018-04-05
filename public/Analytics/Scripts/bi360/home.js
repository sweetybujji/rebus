// declare the app with no dependencies
var bi = angular.module("analyticsapp", ['ngRoute', 'angularUtils.directives.dirPagination']);

bi.factory('Data', function ($http) {
    return {
        FirstName: 'ramesh',
        GetUserList: function () {
            return $http.post('../Login/GetUserDetails');
        },
        RegisterUser: function (Reguser) {
            return $http.post('../Login/RegisterUser', { Regdata: Reguser });
        }
    }
});


bi.factory('DashboardsizeService', function () {
    var DashboardsizeService = {};
    var list = [];
    DashboardsizeService.getItem = function (index) { return list[index]; }
    DashboardsizeService.addItem = function (item) { list.push(item); }
    DashboardsizeService.removeItem = function (item) { list.splice(list.indexOf(item), 1) }
    DashboardsizeService.size = function () { return list.length; }
    return DashboardsizeService;
});


bi.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/Home', { templateUrl: 'views/Home/header.html', controller: "HomescreenCtrl" })
    .when('/Homepage', { templateUrl: 'views/Home/Homepage.html', controller: "HomeCtrl" })
    .when('/CreateDashboard', { templateUrl: '/views/Home/CreateDashboard.html', controller: "CreateDashboardCtrl" })
    .when('/DatabaseMenu', { templateUrl: '/views/Home/DatabaseMenu.html', controller: "DatabaseMenuCtrl" })
    .when('/DashboardFactory', { templateUrl: '/views/Home/DashboardFactory1.html', controller: "DashboardfactoryCtrl" })
    .when('/SqlServer', { templateUrl: '/views/Home/SqlServer.html', controller: "Getsqldbconnections" })
    .when('/WebService', { templateUrl: '/views/Home/WebService.html', controller: "GetWebServiceConnections" })
         .when('/SoapService', { templateUrl: '/views/Home/SoapService.html', controller: "GetSoapServiceConnections" })
    .when('/OrclServer', { templateUrl: '/views/Home/OrclServer.html', controller: "Getorcldbconnections" })
    .when('/ExcelFile', { templateUrl: '/views/Home/ExcelFile.html', controller: "GetExcelSheetConnections" })
         .when('/ManageReports', { templateUrl: '/views/Home/ManageReports.html', controller: "ManageReportCtrl" })
    .when('/CreateParameter', { templateUrl: '/views/Home/CreateParameter.html', controller: "CreateParameterCtrl" })
    .when('/MongoDBService', { templateUrl: '/views/Home/MongoDBService.html', controller: "GetMongoDBConnections" })
    .when('/OPCServer', { templateUrl: '/views/Home/OPCServer.html', controller: "GetOPCServerConnections" })
     /*.when('/OPCServerConfig', { templateUrl: '/Views/Home/OPCServerConfig.html', controller: "GetOPCServerConfigConnections" })*/
     .when('/OPCServerConfig', { templateUrl: '/views/Home/OPCServerConfig.html', controller: "OPCController" })
    .when('/RoleAccess', { templateUrl: '/views/Home/RoleAccess.html', controller: "GetRoleAccess" })
      .when('/RolesList', { templateUrl: '/views/Home/RolesList.html', controller: "GetRolesList" })
     .when('/UsersList', { templateUrl: '/views/Home/UsersList.html', controller: "GetUsersList" })
        .when('/CreateNewUser', { templateUrl: '/views/Home/CreateNewUser.html', controller: "NewUser" })
    .when('/XMLFile', { templateUrl: '/views/Home/XMLFile.html', controller: "GetXMlFileConnections" })
    .when('/ManageLocations', { templateUrl: '/views/Home/ManageLocations.html', controller: "LocationController" })
    .when('/ManageAssets', { templateUrl: '/Views/Home/ManageAssets.html', controller: "GetManageAssets" })
        .when('/ManageMeters', { templateUrl: '/Views/Home/ManageMeters.html', controller: "GetManageMeters" })
   /*  .when('/VirtualTags', { templateUrl: '/Views/Home/VirtualTags.html', controller: "GetVirtualTags" })*/
    /* .when('/RuleEngine', { templateUrl: '/Views/Home/RuleEngine.html', controller: "GetRuleEngine" })*/
     .when('/TagsWatch', { templateUrl: '/views/Home/TagsWatch.html', controller: "GetTagsWatch" })
    .when('/RuleEngineReport', { templateUrl: '/views/Home/RuleEngineReport.html', controller: "RuleEngineListController" })
    .when('/Restfulservice', { templateUrl: '/views/Home/RestfulService.html', controller: "GetSoapServiceConnections" })
    .when('/Virtualtagslist', { templateUrl: '/Views/Home/virtualtagslist.html', controller: "GetVirtualTags" })
    //.when('/Virtualtagslist/', { templateUrl: '/Views/Home/virtualtagslist.html', controller: "GetVirtualTags" })
           .when("/virtualtagsform", { templateUrl : "/views/Home/virtualtagsform.html", controller : "virtualtagsform"})           
           .when("/virtualtagsform/:ID", { templateUrl : "/views/Home/virtualtagsform.html", controller : "virtualtagsform"})
    
    
        .when('/ManageAPI', { templateUrl: '/views/Home/ManageAPI.html', controller: "GetManageAPI" })
         .when('/APIConfig', { templateUrl: '/views/Home/APIConfig.html', controller: "GetAPIConfig" })
    .when('/DesignValues', { templateUrl: '/views/Home/DesignValues.html', controller: "DesignValueController" })
     .when('/ELogSheet', { templateUrl: '/views/Home/ELogSheet.html', controller: "ELogSheetCtrl" })
    .when('/EMS_UMS', { templateUrl: '/views/Home/EMS_UMS.html', controller: "EMS_UMSCtrl" })
    .when('/CassandraDBService',{templateUrl: '/views/Home/Cassandra.html', controller: "CassandraCtrl"})
    
    /*From Conditional Monitoring*/
    
/*                .when("/opc", {
        templateUrl: "OPCCreateForm.html",
        controller: "OPCController"
    })*/

            .when("/OPCID/:oid/OPCName/:oname", {
        controller: "GroupController",
        templateUrl: "/views/Conditional Monitoring/GroupCreateForm.html"
    })
               .when("/OPCID/:oid/OPCName/:oname/Grpid/:gid/GrpName/:gname", {
        controller: "TagsController",
        templateUrl: "/views/Home/OPC_CreateTags.html"
    })
                .when("/MetersData/", {
        controller: "MeterController",
        templateUrl: "MeterCreateForm.html"
    })
   /*  .when('/RuleEngine', { templateUrl: '/Views/Home/RuleEngine.html', controller: "GetRuleEngine" })*/
                 .when("/RuleEngineList/", {
        controller: "RuleEngineListController",
        templateUrl: "/views/Home/RuleEngineList.html"
    })
               .when("/CreateRuleEngine", {
        templateUrl: "/views/Home/RuleEngine.html",
        controller: "RuleEngineController",
    })
                 .when("/VirtualTagData/", {
        controller: "VirtualTagController",
        templateUrl: "VirtualTagForm.html"
    })
                 .when("/VirtualTagData/:vtagid", {
        controller: "VirtualEditTagController",
        templateUrl: "VirtualTagForm.html"
    })
                  .when("/VirtualListData/", {
        controller: "VirtualTagListController",
        templateUrl: "VirtualTagList.html"
    })
                  .when("/Location", {
                	
        templateUrl: "/views/Home/ManageLocations.html",
        controller: "LocationController",
    })
    .when("/Assets", {
        templateUrl: "ManageAssets.html",
        controller: "AssetController",
    })
     .when('/ManageAssets', { templateUrl: '/views/Home/ManageAssets.html', controller: "AssetController" })
        .when("/MODBUSDevice", {
        templateUrl: "MODBUSDevice.html",
        controller: "MODBUSDeviceController",
    })
         .when("/MODBUSDeviceList/", {
        controller: "MODBUSDeviceListController",
        templateUrl: "MODBUSDeviceList.html"
    })
        .when("/MODBUSNode", {
        templateUrl: "MODBUSNode.html",
        controller: "MODBUSNodeController",
    })
       .when("/MODBUSNodeList/", {
        controller: "MODBUSNodeListController",
        templateUrl: "MODBUSNodeList.html"
    })
         .when("/VirtualTagData/", {
        controller: "VirtualTagController",
        templateUrl: "/views/Home/VirtualTagForm.html"
    })
                 .when("/VirtualTagData/:vtagid", {
        controller: "VirtualEditTagController",
        templateUrl: "/views/Home/VirtualTagForm.html"
    })
                  .when("/VirtualListData/", {
        controller: "VirtualTagListController",
        templateUrl: "/views/Home/VirtualTags.html"
        	
    })
    
    .when('/ManageMeters', { templateUrl: '/views/Home/ManageMeters.html', controller: "MeterController" })

    
    /*End From Conditional Monitoring*/
    
    .otherwise({ redirectTo: '/Homepage', controller: "HomescreenCtrl" });
    // $locationProvider.html5Mode(true);
    // Specify HTML5 mode (using the History APIs) or HashBang syntax.
    //$locationProvider.html5Mode(false).hashPrefix('!');
    // $locationProvider.html5Mode(true);
}]);


bi.controller('HomeCtrl', function ($scope, $location, Data) {

    $scope.templatesettings = { HeaderTitle: "Home" };
    $scope.go = function (path) {
        //alert(path);
        $location.path(path);
    };
    $scope.ForgetSecurQuestionfun = function () {
        var SecQuestion = $('#ForgetSecurQuestion').val();
        if (SecQuestion == 0) {
            $('#ForgetAnsId').hide();
        } else {
            $('#ForgetAnsId').show();
        }
    }

    $scope.SignUp = function () {
        try {
            if (($scope.RegPassword != $scope.RegConfirmPassword)) {
                alert("password did not match with ConfirmPassword");
                return false;
            }
            if (($scope.RegPassword == "undefined" && $scope.RegConfirmPassword == "undefined")) {
                alert("password did not match with ConfirmPassword");
                return false;
            }
            if ($scope.RegFirstname == "undefined" || $scope.RegFirstname == "") {
                alert("Enter FirstName");
                return false;
            }
            if ($scope.RegSecondname == "undefined" || $scope.RegSecondname == "") {
                alert("Enter SecondName");
                return false;
            }
            if ($scope.RegPassword == "undefined" || $scope.RegPassword == "") {
                alert("Enter Password");
                return false;
            }
            if ($scope.RegRole == "" || $scope.RegRole == "undefined" || $scope.RegRole == null) {
                alert("Select Role");
                return false;
            }

            var Reguser = { firstname: $scope.RegFirstname, secondname: $scope.RegSecondname, username: $scope.RegUsername, password: $scope.RegPassword, confirmpassword: $scope.RegConfirmPassword, securityquestion: $scope.RegSecurQuestion, securityanswer: $scope.RegSecurityAns, role: $scope.RegRole };
            Data.RegisterUser(Reguser).success(function (data) {
                if (data == "DuplicateUserName") {
                    alert("User Name is already Exist");
                    //location.href = '/Home/Index';
                }
                else {
                    alert(data + " " + "Regestration Successfully");
                }
            }).error(function (data) {
            });


        }
        catch (e) {
            alert(e);
        }
    }
    $scope.GetUserDetails = function () {
        $('.Popup').css({ "display": "none" });
        Data.GetUserList().success(function (res) {
            if (res == "Fail") {
                alert("There is no Data");
            }
            else {
                var element = angular.element('#myModalUserDetail');
                element.modal('show');              
                var intialname = res[0].User;               
                $scope.UserFirstname = intialname.split(" ")[0];
                $scope.UserSecondname = intialname.split(" ")[1];
                $scope.UserNameinDetail = res[0].UserName;
                $scope.UserRole = res[0].RoleName;
            }
        });
    }

});
function RegSecurQuestionfun() {
    var SecurQues = $('#RegSecurQuestion').val();
    var Question = new Array();
    Question.push({
        q: "---Select a Security Question---"
    });
    Question.push({
        q: "What was the name of your first pet?"
    });
    Question.push({
        q: "What is your mother's maiden name?"
    });
    Question.push({
        q: "What was the first foreign country you visited?"
    });
    Question.push({
        q: "What is your favorite sports team?"
    });
    Question.push({
        q: "Who is your favorite athlete?"
    });

    if (SecurQues == "0") {
        $('#AnsId').hide();
        $('#ForgetAnsId').hide();

    }
    else {
        $('#AnsId').show();
        $('#ForgetAnsId').show();
        //alert(Question[SecurQues]["b"]);
    }
}


bi.controller('CreateDashboardCtrl', function ($scope) {
    $scope.templatesettings = { HeaderTitle: "Create Dashboard" };

});

bi.controller('DatabaseMenuCtrl', function ($scope, $location) {
    $scope.templatesettings = { HeaderTitle: "Choose Your Data Connection" };
    $scope.go = function (path) {
        $location.path(path);
    };
});


bi.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});
bi.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered          
            var listlength = $(".tabstriplist>li>a:not(:last)").length;
            $(".tabstriplist>li>a:not(:last)").css("background", "#336699");
            $(".tabstriplist>li>a:not(:last)").each(function (i) {
                if (i == listlength - 1) {
                    $(this).css("background", "#6A5ACD"); $(this).attr("data-selected", true)
                }
                else {
                    $(this).attr("data-selected", false);
                }
            });
            //  scope.$eval(attrs.repeatDone);
        }
    }
})

bi.directive('repeatDonefun', function () {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered          
            $(".vf-node").find(".active").each(function () {
                var clsname = $(this).attr("class");
                $(this).attr("class", clsname.replace("active", ""));
                $(this).attr("data-active", false);
            });
            element.attr("class", $(element).attr("class") + " active");
            element.attr("data-active", true);

        }
    }
})
bi.directive('datatableSetup', function () {
    return { link: function (scope, elm, attrs) { alert(elm); } }
});
bi.directive('ngModelOnblur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1,
        link: function (scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function () {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});


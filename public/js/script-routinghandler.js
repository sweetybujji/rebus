var RapidApp = angular.module("RapidApp", ['ui.router', 'angularUtils.directives.dirPagination']);

RapidApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('Home', {
        url: "/Home",
        templateUrl: "Views/Home/header.html",
        controller: 'EFormHomeCtrl'
    })
    .state('Users', {
        url: "/Users",
        templateUrl: "views/user/usercreation.html",
        params: { 'id': null, 'type': null, 'Name': null },
        controller: 'userctrl'
    })
    .state('Roles', {
        url: "/Roles",
        templateUrl: "Views/Home/Roles.html",
        controller: 'RolesCtrl'
    })
    .state('DomainModel', {
        url: "/DomainModel",
        templateUrl: "views/domainentity/domainmodel.html",
        params: { 'DateTime': null },
        controller: 'DomainModelCtrl'
    })
    .state('DomainModelTree', {
        url: "/DomainModelTree",
        templateUrl: "Views/Home/DomainEntity/DomainModelTree.html",
        controller: 'DomainModelTreeCtrl'
    })
    .state('ApprovalMicroFlow', {
        url: "/ApprovalMicroFlow",
        templateUrl: "Views/Home/MicroFlow/MicroFlow.html",
        params: { 'fname': "", 'type': "clear" },
        controller: 'MicroFlowCtrl'
    })
    .state('MicroFlow', {
        url: "/MicroFlow",
        templateUrl: "Views/Home/MicroFlow/MicroFlow.html",
        params: { 'fname': "", 'type': "" },
        controller: 'MicroFlowCtrl'
    })
    .state('MicroFlowList', {
        url: "/MicroFlowList",
        templateUrl: "views/microflow/microflowlist.html",
        controller: 'MicroFlowListCtrl'
    })
    .state('Sidemenu', {
        url: "/SideMenu",
        templateUrl: "views/sidemenu/sidemenucreation.html",
        controller: 'SideMenuCtrl'
    })
    .state('SampleFormList', {
        url: "/SampleFormList",
        templateUrl: "Views/UserExampleHtml/NewForm_List.html",
        controller: 'SampleFormListCtrl'
    })
    .state('SampleForm', {
        url: "/SampleForm",
        templateUrl: "Views/UserExampleHtml/NewFormToolbar.html",
        params: { 'id': null, 'type': null },
        controller: 'SampleFormCtrl'
    })
    .state('UserFormList', {
        url: "/UserFormList",
        templateUrl: "views/user/userlist.html",
        controller: 'userlistctrl'
    })

     //........... Analytics Routing................///
    .state('Data_Dashboard', {
        url: "/Data_Dashboard",
        templateUrl: "Analytics/Views/Home/Analytics_Homepage.html",
        controller: 'Data_DashboardCtrl'
    })
    .state('DatabaseMenu', {
        url: "/DatabaseMenu",
        templateUrl: "Analytics/Views/Home/Analytics_DatabaseMenu.html",
        controller: 'DatabaseMenuCtrl'
    })
    .state('CreateDashboard', {
        url: "/CreateDashboard",
        templateUrl: "Analytics/Views/Home/Analytics_CreateDashboard.html",
        controller: 'CreateDashboardCtrl'
    })
    .state('DashboardFactory', {
        url: "/DashboardFactory",
        templateUrl: "Analytics/Views/Home/Analytics_DashboardFactory1.html",
        controller: 'DashboardfactoryCtrl'
    })
    .state('SqlServer', {
        url: "/SqlServer",
        templateUrl: "Analytics/Views/Home/Analytics_SqlServer.html",
        controller: 'SqlServerCtrl'
    })
    .state('OrclServer', {
        url: "/OrclServer",
        templateUrl: "Analytics/Views/Home/Analytics_OrclServer.html",
        controller: 'OrclServerCtrl'
    })
    .state('WebService', {
        url: "/WebService",
        templateUrl: "Analytics/Views/Home/Analytics_WebService.html",
        controller: 'WebServiceCtrl'
    })
    .state('Soapservice', {
        url: "/Soapservice",
        templateUrl: "Analytics/Views/Home/SoapService.html",
        controller: 'SoapServiceCtrl'
    })
    .state('MQTTMessage_Broker', {
        url: "/MQTTMessage_Broker",
        templateUrl: "Analytics/Views/Home/MQTT_Message.html",
        controller: 'MQTTMessageBrokerCtrl'
    })
    .state('MQMessage_Broker', {
        url: "/MQMessage_Broker",
        templateUrl: "Analytics/Views/Home/MqKafka_Message.html",
        controller: 'MQMessageBrokerCtrl'
    })
    .state('ExcelFile', {
        url: "/ExcelFile",
        templateUrl: "Analytics/Views/Home/Analytics_ExcelFile.html",
        controller: 'GetExcelSheetConnections'
    })
    .state('XMLFile', {
        url: "/XMLFile",
        templateUrl: "Analytics/Views/Home/Analytics_XMLFile.html",
        controller: 'GetXMlFileConnections'
    })
    .state('ManageReports', {
        url: "/ManageReports",
        templateUrl: "Analytics/Views/Home/Analytics_ManageReports.html",
        controller: 'ManageReportCtrl'
    })
    .state('CreateParameter', {
        url: "/CreateParameter",
        templateUrl: "Analytics/Views/Home/Analytics_CreateParameter.html",
        controller: 'CreateParameterCtrl'
    })
    .state('MongoDBService', {
        url: "/MongoDBService",
        templateUrl: "Analytics/Views/Home/Analytics_MongoDBService.html",
        controller: 'GetMongoDBConnections'
    })
    .state('OPCServer', {
        url: "/OPCServer",
        templateUrl: "Analytics/Views/Home/Analytics_OPCServer.html",
        controller: 'GetOPCServerConnections'
    })
    .state('OPCServerConfig', {
        url: "/OPCServerConfig",
        templateUrl: "Analytics/Views/Home/Analytics_OPCServerConfig.html",
        controller: 'OPCController'
    })
    .state('OpecServerCreation', {
        url: "/OpecServerCreation",
        templateUrl: "Analytics/Views/Home/Analytics_OPCServerConfigCreate.html",
        params: { 'data': null },
        controller: 'OPCController'
    })
    .state('OPCGroupConfig', {
        url: "/OPCGroupConfig",
        templateUrl: "Analytics/Views/Home/Analytics_GroupCreateForm.html",
        params: { 'OPCID': null, 'OPCName': null, 'data': null },
        controller: 'GroupController'
    })
    .state('Grouplist', {
        url: "/Grouplist",
        params: { 'OPCID': null, 'OPCName': null },
        templateUrl: "Analytics/Views/Home/GroupList.html",
        controller: 'GroupController'
    })
    .state('OPCTagsConfig', {
        url: "/OPCTagsConfig",
        templateUrl: "Analytics/Views/Home/Analytics_OPC_CreateTags.html",
        params: { 'OPCID': null, 'OPCName': null, 'Grpid': null, 'GrpName': null, 'data': null },
        controller: 'TagsController'
    })
    .state('Tagslist', {
        url: "/Tagslist",
        templateUrl: "Analytics/Views/Home/Tagslist.html",
        params: { 'OPCID': null, 'OPCName': null, 'Grpid': null, 'GrpName': null },
        controller: 'TagsController'
    })
    .state('RoleAccess', {
        url: "/RoleAccess",
        templateUrl: "Analytics/Views/Home/Analytics_RoleAccess.html",
        controller: 'RoleAccessCtrl'
    })
    .state('RolesList', {
        url: "/RolesList",
        templateUrl: "Analytics/Views/Home/Analytics_RolesList.html",
        controller: 'RolesListCtrl'
    })
    .state('UsersList', {
        url: "/UsersList",
        templateUrl: "Analytics/Views/Home/Analytics_UsersList.html",
        controller: 'UsersListCtrl'
    })
    .state('CreateNewUser', {
        url: "/CreateNewUser",
        templateUrl: "Analytics/Views/Home/Analytics_CreateNewUser.html",
        controller: 'CreateNewUserCtrl'
    })
    //.state('ManageLocations', {
    //    url: "/ManageLocations",
    //    templateUrl: "Analytics/Views/Home/Analytics_ManageLocations.html",
    //    controller: 'ManageLocationsCtrl'
    //})
    //.state('ManageAssets', {
    //    url: "/ManageAssets",
    //    templateUrl: "Analytics/Views/Home/Analytics_ManageAssets.html",
    //    controller: 'AssetController'
    //})
    //.state('ManageMeters', {
    //    url: "/ManageMeters",
    //    templateUrl: "Analytics/Views/Home/Analytics_ManageMeters.html",
    //    controller: 'MeterController'
    //})
    .state('ManageLocations', {
        url: "/ManageLocations",
        templateUrl: "Analytics/Views/Home/AnalyticsLocationsCreate.html",
        params: { 'type': "new", "LocationId": "", "LocationName": "", "Description": "", "ParentLocationId": "", "loc_id": "" },
        controller: 'ManageLocationsCtrl'
    })
    .state('ManageLocationslist', {
        url: "/ManageLocationslist",
        templateUrl: "Analytics/Views/Home/AnalyticsLocationslist.html",
        controller: 'ManageLocationsCtrl'
    })
    .state('ManageAssets', {
        url: "/ManageAssets",
        templateUrl: "Analytics/Views/Home/Analytics_ManageAssetsCreate.html",
        params: { 'type': "new", "AssetId": "", "AssetName": "", "Asset_id": "", "AssetLocId": "", "AssetLocName": "", "ParentAsset": '' },
        controller: 'AssetController'
    })
    .state('ManageAssetslist', {
        url: "/ManageAssetslist",
        templateUrl: "Analytics/Views/Home/Analytics_ManageAssetslist.html",
        controller: 'AssetController'
    })
    .state('ManageMeters', {
        url: "/ManageMeters",
        templateUrl: "Analytics/Views/Home/Analytics_ManageMetersCreate.html",
        params: { 'type': "new", "data": "" },
        controller: 'MeterController'
    })
    .state('ManageMeterslist', {
        url: "/ManageMeterslist",
        templateUrl: "Analytics/Views/Home/Analytics_ManageMeterslist.html",
        controller: 'MeterController'
    })
    .state('TagsWatch', {
        url: "/TagsWatch",
        templateUrl: "Analytics/Views/Home/Analytics_TagsWatch.html",
        controller: 'TagsWatchCtrl'
    })
    .state('RuleEngineReport', {
        url: "/RuleEngineReport",
        templateUrl: "Analytics/Views/Home/Analytics_RuleEngineReport.html",
        controller: 'RuleEngineReportCtrl'
    })
    .state('Restfulservice', {
        url: "/Restfulservice",
        templateUrl: "Analytics/Views/Home/Analytics_Restfulservice.html",
        controller: 'RestfulserviceCtrl'
    })
    .state('Virtualtagslist', {
        url: "/Virtualtagslist",
        templateUrl: "Analytics/Views/Home/Analytics_virtualtagslist.html",
        controller: 'VirtualtagslistCtrl'
    })
    .state('virtualtagsform', {
        url: "/virtualtagsform",
        templateUrl: "Analytics/Views/Home/Analytics_virtualtagsform.html",
        params: { 'id': null },
        controller: 'virtualtagsformCtrl'
    })
    .state('ManageAPI', {
        url: "/ManageAPI",
        templateUrl: "Analytics/Views/Home/Analytics_ManageAPI.html",
        params: { 'id': null, 'type': null },
        controller: 'ManageAPICtrl'
    })
    .state('APIConfig', {
        url: "/APIConfig",
        templateUrl: "Analytics/Views/Home/Analytics_APIConfig.html",
        params: { 'id': null, 'type': null },
        controller: 'APIConfigCtrl'
    })
    .state('DesignValues', {
        url: "/DesignValues",
        templateUrl: "Analytics/Views/Home/Analytics_DesignValues.html",
        params: { 'id': null, 'type': null },
        controller: 'DesignValueController'
    })
    .state('CassandraDBService', {
        url: "/CassandraDBService",
        templateUrl: "Analytics/Views/Home/Analytics_Cassandra.html",
        params: { 'id': null, 'type': null },
        controller: 'CassandraCtrl'
    })
    .state('RuleEngineList', {
        url: "/RuleEngineList",
        templateUrl: "Analytics/Views/Home/Analytics_RuleEngineList.html",
        controller: 'RuleEngineListController'
    })
    .state('CreateRuleEngine', {
        url: "/CreateRuleEngine",
        templateUrl: "Analytics/Views/Home/Analytics_RuleEngine.html",
        params: { 'id': null, action: null, },
        controller: 'RuleEngineController'
    })
    //.state('CreateRuleEngine', {
    //    url: "/CreateRuleEngine",
    //    templateUrl: "Analytics/Views/Home/Analytics_RuleEngine.html",
    //    controller: 'RuleEngineController'
    //})
    .state('ModbusDeviceList', {
        url: "/ModbusDeviceList",
        templateUrl: "Analytics/Views/Home/Analytics_ModbusDeviceList.html",
        controller: 'MODBUSDeviceListController'
    })
    .state('ModbusDevice', {
        url: "/ModbusDevice",
        templateUrl: "Analytics/Views/Home/Analytics_MODBUSDevice.html",
        params: { 'id': null },
        controller: 'MODBUSDeviceController'
    })
    .state('ExceltoTableList', {
        url: "/ExceltoTableList",
        templateUrl: "Analytics/Views/ECR/Index.html",
        controller: 'ExceltoTableListController'
    })
    .state('UploadExceltoTable', {
        url: "/UploadExceltoTable",
        templateUrl: "Analytics/Views/ECR/UploadExcel.html",
        controller: 'ExceltoTableUploadCtrl'
    })
    //........... Analytics Routing................///

    .state('PasswordPolicyCreation', {
        url: "/PasswordPolicyCreation",
        templateUrl: "Views/PasswordPolicy/PasswordPolicyCreation.html",
        params: { 'id': null, 'type': null },
        controller: 'PasswordPolicyCtrl'
    })
    .state('PasswordPolicyList', {
        url: "/PasswordPolicyList",
        templateUrl: "Views/PasswordPolicy/PasswordPolicyList.html",
        controller: 'PasswordPolicyListCtrl'
    })
    .state('RoleBasedFormAccessList', {
        url: "/RoleBasedFormAccessList",
        templateUrl: "Views/RoleBasedFormAccess/RoleBasedFormAccessList.html",
        controller: 'RoleBasedFormAccessListCtrl'
    })
    .state('RoleBasedFormAccess', {
        url: "/RoleBasedFormAccess",
        templateUrl: "Views/RoleBasedFormAccess/RoleBasedFormAccess.html",
        params: { 'id': null, 'RoleName': null },
        controller: 'RoleBasedFormAccessCtrl'
    })
    .state('Employee',{ 
        url: "/Employee",
        templateUrl: "views/employee/employee.html",
        params: { 'id': null, 'type': null, 'Name': null },
        controller: 'employeectrl'
    })
    .state('EmployeeList', {
        url: "/EmployeeList",
        templateUrl: "/views/employee/employeelist.html",
        controller: 'employeelistctrl'
    })
    .state('ChangePassword', {
        url: "/ChangePassword",
        templateUrl: "/Views/ChangePassword/ChangePassword.html",
        controller: 'ChangePasswordCtrl'
    })
    //.state('Reporting', {
    //    url: "/Reporting",
    //    templateUrl: "/Analytics/views/Reporting/Report_Index.html",
    //    controller: 'ReportingCtrl'
    //})
    //     .state('Report_Parameters', {
    //         url: "/Report_Parameters",
    //         templateUrl: "/Analytics/views/Reporting/Latest_Report_Parameters.html",
    //         controller: 'ReportingCtrl'
    //     })

    .state('Reporting', {
        url: "/Reporting",
        templateUrl: "/Analytics/Views/Reporting/Latest_Report_Parameters.html",
        controller: 'ReportingCtrl'
    })
    .state('Report_Parameters', {
        url: "/Report_Parameters",
        templateUrl: "/Analytics/Views/Reporting/Report_Index.html",
        controller: 'ReportingCtrl'
    })
    //............ELogsheet Routing............//
    .state('ELogsheet', {
        url: "/ELogsheet",
        templateUrl: "ELogsheet/views/Home/DesignForms/Index.html",
        params: { '_tagid': null, 'type': null },
        controller: 'LogSheetControl'
    })
    .state('FormsList', {
        url: "/FormsList",
        templateUrl: "ELogsheet/views/Home/DesignForms/FormsList.html",
        params: { '_tagid': null, 'type': null },
        controller: 'FormsListController'
    })
    .state('FormViewer', {
        url: "/FormViewer",
        templateUrl: "ELogsheet/views/Home/DesignForms/FormViewer.html",
        params: { '_tagid': null, 'type': null, 'KeyId': null, 'KeyValue': null, 'TableName': null },
        controller: 'FormViewerCtrl'
    })
    //.state('Assignments', {
    //    url: "/Assignments",
    //    templateUrl: "ELogsheet/views/Home/DesignForms/Assignments.html",
    //    params: { '_tagid': null, 'type': null },
    //    controller: 'AssignmentsCtrl'
    //})
    //.state('Schedule', {
    //    url: "/Schedule",
    //    templateUrl: "ELogsheet/views/Home/DesignForms/Schedule.html",
    //    params: { '_tagid': null, 'type': null },
    //    controller: 'ScheduleCtrl'
    //})
    .state('MasterManagement', {
        url: "/MasterManagement",
        templateUrl: "ELogsheet/views/Home/DesignForms/MasterManagement.html",
        params: { '_tagid': null, 'type': null },
        controller: 'MasterManagementCTRL'
    })
         .state('EFormsSideMenu', {
             url: "/EFormsSideMenu",
             templateUrl: "ELogsheet/views/Home/Sidemenu_Config.html",
             controller: 'EFormsSideMenuCTRL'
         })
    //............ELogsheet Routing............//
    .state('viewer', {
        url: "/viewer",
        templateUrl: "/Analytics/Views/EmsLineDiagram/Viewer.html",
        controller: 'viewerCtrl'
    })
    .state('TrendsView', {
        url: "/TrendsView",
        // templateUrl: "/Views/Trends/TrendViewPage.html",
        templateUrl: "/Analytics/Views/Trends/TrendViewPage.html",
        controller: 'TrendsViewCtrl'
    })
    .state('SessionTimeOut', {
        url: "/SessionTimeOut",
        templateUrl: "/Views/Session/Session_Logout.html",
        controller: 'SessionlogotCtrlPage'
    })

        //....................  Labels Creation   ...........//
        .state('LabelsCreation', {
            url: "/LabelsCreation",
            params: { 'id': null, 'type': null, 'Name': null },
            templateUrl: "Views/LabelCreation/LabelsCreation.html",
            controller: 'LabelsCtrl'
        })
        .state('LabelsList', {
            url: "/LabelsList",
            templateUrl: "Views/LabelCreation/LabelsList.html",
            controller: 'LabelsListCtrl'
        })
    //....................  Labels Creation   ...........//
    $urlRouterProvider.otherwise("/Home");
});

/********************************************************************************* Angular Services****************************************************************************/

RapidApp.factory('DashboardsizeService', function () {
    var DashboardsizeService = {};
    var list = [];
    DashboardsizeService.getItem = function (index) { return list[index]; }
    DashboardsizeService.addItem = function (item) { list.push(item); }
    DashboardsizeService.removeItem = function (item) { list.splice(list.indexOf(item), 1) }
    DashboardsizeService.size = function () { return list.length; }
    return DashboardsizeService;
});

RapidApp.factory('SessionCheckFactory', function ($http) {
    return {
        checksession: function (data) {
            return $http.post('/CheckSessionEveryForm', {
                FormId: data
            })
        }
    }
});

RapidApp.factory('MicroFlowListCtrlFactory', function ($http) {
    return {
        getmicroflowlist: function () {
            return $http.get('/MicroFlowList');
        },
        checksession: function () {
            return $http.get('/CheckSessionEveryForm')
        }
    }
});

/********************************************************************************* Angular Services****************************************************************************/

//RapidApp.factory('MicroFlowListCtrlFactory', function ($http) {
//    return {
//        getmicroflowlist: function () {
//            return $http.get('/MicroFlowList');
//        }
//    }
//});

RapidApp.controller('TrendsViewCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});


RapidApp.controller('EFormHomeCtrl', function ($scope, $location) {


});
//RapidApp.controller('DomainModelCtrl', function ($scope, $location) {
//    // fn_CheckSession();
//    alert("welcome");
//    GetAccessByRole("DataModel");
//    $scope.go = function (path) {
//        $location.path(path);
//    };
//});

RapidApp.controller('SideMenuCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('SessionlogotCtrlPage', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('DatabaseMenuCtrl', function ($scope, $location) {
    localStorage.setItem('OPCID', null);
    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('ReportingCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('viewerCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('RestfulserviceCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('SoapServiceCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('MQTTMessageBrokerCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

RapidApp.controller('MQMessageBrokerCtrl', function ($scope, $location) {

    $scope.go = function (path) {
        $location.path(path);
    };
});

/****************************************************************** Angular State/route change Events and Session availability start ***********************/

RapidApp.run(['$rootScope', '$state', 'SessionCheckFactory', '$timeout', '$q', function ($rootScope, $state, SessionCheckFactory, $timeout, $q) {
    var data;
    var deferred = $q.defer();
    EFormsScope = $state;
    $rootScope.$on('$stateChangeStart', function (e, to, toParams, fromState) {
        data = to.name;
        clearInterval(clearsetInterval);
        SessionCheckFactory.checksession(data).success(function (response) {
            if (response.isauthenticated == true) {
                var Result = response;
                if (Result.error) {
                    fn_errorNotification("200", Result.error, Result.error, "Error Occured while checking session based on roles.", "error_alert", "", "");
                    StopPageLoader();
                }

                //else {
                //    Result = Result.response;

                //    if (Result != '') {

                //        if (Result[0]["Create"] == false || Result[0]["Create"] == "false") {
                //            $('.Toolbar_Create').addClass("disableicons");
                //            $('.Toolbar_Create').removeAttr("href");
                //            $('.Toolbar_Create').removeAttr('ng-click');
                //            $('.Toolbar_Create').removeAttr('onclick');

                //        }
                //        if (Result[0]["Update"] == false || Result[0]["Update"] == "false") {
                //            $('.Toolbar_Edit').addClass("disableicons");
                //            $('.Toolbar_Edit').removeAttr("href");
                //            $('.Toolbar_Edit').removeAttr('ng-click');
                //            $('.Toolbar_Edit').removeAttr('onclick');
                //        }
                //        if ((Result[0]["Create"] == false || Result[0]["Create"] == "false") && (Result[0]["Update"] == false || Result[0]["Update"] == "false")) {
                //            $('.Toolbar_Save').addClass("disableicons");
                //            $('.Toolbar_Save').removeAttr("href");
                //            $('.Toolbar_Save').removeAttr('ng-click');
                //            $('.Toolbar_Save').removeAttr('onclick');
                //        }
                //        if (Result[0]["Delete"] == false || Result[0]["Delete"] == "false") {
                //            $('.Toolbar_Delete').addClass("disableicons");
                //            $('.Toolbar_Delete').removeAttr("href");
                //            $('.Toolbar_Delete').removeAttr('ng-click');
                //            $('.Toolbar_Delete').removeAttr('onclick');
                //        }
                //    }
                //}
            }
            else {

                $state.go('SessionTimeOut')


            }
        });
    });


    $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
        SessionCheckFactory.checksession(data).success(function (response) {
            if (response.isauthenticated == true) {

                var Result = response;
                if (Result.error) {
                    fn_errorNotification("200", Result.error, Result.error, "Error Occured in Getting Data with code fn_GetPasswordPolicies_001", "error_alert", "", "");
                    StopPageLoader();
                }
                else {

                    // console.log((Result.response));

                    Result = Result.response;

                    if (Result != '') {
                        if (Result[0]["Create"] == false || Result[0]["Create"] == "false") {
                            $('.Toolbar_Create').addClass("disableicons");
                            $('.Toolbar_Create').removeAttr("href");
                            $('.Toolbar_Create').removeAttr('ng-click');
                            $('.Toolbar_Create').removeAttr('onclick');

                        }
                        if (Result[0]["Update"] == false || Result[0]["Update"] == "false") {
                            $('.Toolbar_Edit').addClass("disableicons");
                            $('.Toolbar_Edit').removeAttr("href");
                            $('.Toolbar_Edit').removeAttr('ng-click');
                            $('.Toolbar_Edit').removeAttr('onclick');
                        }
                        if ((Result[0]["Create"] == false || Result[0]["Create"] == "false") && (Result[0]["Update"] == false || Result[0]["Update"] == "false")) {
                            $('.Toolbar_Save').addClass("disableicons");
                            $('.Toolbar_Save').removeAttr("href");
                            $('.Toolbar_Save').removeAttr('ng-click');
                            $('.Toolbar_Save').removeAttr('onclick');
                        }
                        if (Result[0]["Delete"] == false || Result[0]["Delete"] == "false") {
                            $('.Toolbar_Delete').addClass("disableicons");
                            $('.Toolbar_Delete').removeAttr("href");
                            $('.Toolbar_Delete').removeAttr('ng-click');
                            $('.Toolbar_Delete').removeAttr('onclick');
                        }


                    }
                }


            }

        });

    });


}])

/****************************************************************** Angular State/route change Events and Session availability end **************************/

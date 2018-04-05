
RapidApp.controller('CreateDashboardCtrl', function ($scope, DashboardsizeService, $location, $window) {
    try {
      //  GetAccessByRole("DashboardCreation")

        $scope.go = function (path) {

            $location.path(path);
        };
        $scope.templatesettings = { HeaderTitle: "Create New Dashboard" };

        $scope.custom = true;
        $scope.mheight = "675";
        $scope.mwidth = "954";
        //  $scope.dashboardname = "Dashboard1";
        $scope.dashboardname = { name: 'Dashboard1' };
        $scope.Sizes = [
                { name: '1', dbsize: 'Letter/A4 (954 x 675)' },
                { name: '2', dbsize: 'Screen Medium (1024 x 768)' },
                { name: '3', dbsize: 'Tablet Large (1280 x 800)' },
                { name: '4', dbsize: 'Wide Screen Medium (1680 x 1050)' },
                { name: '5', dbsize: 'Responsive' },
                { name: '6', dbsize: 'Custom' }
        ];
        $scope.selectedsize = $scope.Sizes[0].name;

        $scope.dashboardsizechange = function () {
            if ($scope.selectedsize == "6") {
                $scope.custom = false;
                $scope.mheight = "1024";
                $scope.mwidth = "900";
            }
            else if ($scope.selectedsize == "1") {
                $scope.mheight = "675";
                $scope.mwidth = "954";
                $scope.custom = true;
            }
            else if ($scope.selectedsize == "2") {
                $scope.mheight = "768";
                $scope.mwidth = "1024";
                $scope.custom = true;
            }

            else if ($scope.selectedsize == "3") {
                $scope.mheight = "1280";
                $scope.mwidth = "800";
                $scope.custom = true;
            }
            else if ($scope.selectedsize == "4") {
                $scope.mheight = "1680";
                $scope.mwidth = "1050";
                $scope.custom = true;
            }
            else if ($scope.selectedsize == "5") {
                $scope.mheight = "100%";
                $scope.mwidth = "100%";
                $scope.custom = true;
            }
            else {
                $scope.custom = false;
            }

        }

        $scope.getdashboardname = function () {
            var obj = new Object();
            if ($scope.dashboardname.admin == true) {
                obj.dashboardaccess = "Admin";
            }
            if ($scope.dashboardname.user == true) {
                obj.dashboardaccess = obj.dashboardaccess + "," + "User";
            }
            if ($scope.dashboardname.publisher == true) {
                obj.dashboardaccess = obj.dashboardaccess + "," + "Publisher&Designer";
            }
            $scope.dashboardaccess = obj.dashboardaccess;
            obj.dashboardname = $("#bidsname").val();
            obj.height = $scope.mheight;
            obj.width = $scope.mwidth;
            obj.dashboarddesc = $("#bidesc").val();
            DashboardsizeService.removeItem(0);
            DashboardsizeService.addItem(obj);

            //localStorage.setItem("DataRestore", obj);
            $scope.templatesettings = { HeaderTitle: "Dashboard Factory" };
            $location.path('/DashboardFactory');

            //$window.open('/DashboardFactory', '_blank');

        }
    }
    catch (err) {
        alert(err);
    }

});
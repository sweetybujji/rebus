RapidApp.factory('RolesListFactory', function ($http) {
    return {
        getroleslist: function () {
            return $http.get('/Roles/Get_ListOfRoles');
        }
    }
});

/*bi.controller('GetRoleAccess',function ($scope, $location,  RolesListFactory) {
    $scope.go = function (path) {
        $location.path(path);
    };
*/
RapidApp.controller('GetRolesList', function ($scope, $location, RolesListFactory) {
	 $scope.go = function (path) {
	        $location.path(path);
	 }
    RolesListFactory.getroleslist().success(function (data) {
        if (data) {
        	  var tblobj = data;
            fn_Make_Roles_DataTable(tblobj);
        }
        else if (data.errorresult) {
            alert(data.errorresult);
        }
    }).error(function (data) {
        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //........  getting  roles list ended.....//

    $scope.RoleEdit = function () {       
        var hideroleid = $("#hideRoleId").val();       
        if (typeof hideroleid == "undefined") {
            alert("Select any row from table to Edit..!");
        }
        else {
            $scope.go('/RoleAccess');
        }
    }

    $scope.deleterole = function () {
        var hiddenid = $('#hideRoleId').val();
        if (typeof hiddenid == "undefined") {
            alert("Select any row from table to delete..!");
        }
        else {
            var UserId = $('#hideRoleId').text();
            var asd=JSON.stringify({ UserDetails: UserId });
            $.ajax({
                url: '../Roles/DeleteRole',
                type: "POST",
                contentType:'application/json',
                datatype: "json",
                data: asd,
                async: false,
                success: function (response) {
                	alert(response);
                  //  alert(response.responsedata);
                    RolesListFactory.getroleslist().success(function (data) {
                        if (data) {
                            var tblobj =data;
                            fn_Make_Roles_DataTable(tblobj);
                        }
                        else if (data.errorresult) {
                            alert(data.errorresult);
                        }
                    }).error(function (data) {
                        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
                        $scope.loading = false;
                    });
                },
                error: function () {
                    alert("User_FC_AJ_0005");
                }
            });
        }
    }
});
function fn_Make_Roles_DataTable(datasource) {
    try {
        oTable = $('#tbl_RolesList').dataTable({
            "bDestroy": true,
            // Enabling JQuery UI
            //"bJQueryUI": true,
            "bAutoWidth": false,
            // Pagination Type 
            "sPaginationType": "full_numbers",
            // Page Numbers Type
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            //Records per Page
            'iDisplayLength': 50,
            "bPaginate": true,
            // Enabling to select list of records per page
            "bLengthChange": true,
            //Enabling Scrolling
            //"sScrollY": "100px",
            // Adding Custom stuff
            "oLanguage": {
                // Design for Pagination
                "oPaginate": {
                    "sNext": '>',
                    "sLast": '>|',
                    "sFirst": '|<',
                    "sPrevious": '<'
                },
                // Design for Search
                "sSearch": "Filter",
                //http://www.datatables.net/examples/basic_init/language.html Helpful Link
                "sLengthMenu": "Roles _MENU_",
                "sZeroRecords": "No Roles Found - Please Try Again.",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Roles.",
                "sInfoEmpty": "Showing 0 to 0 of 0 Roles.",
                "sInfoFiltered": "Result: Found from _MAX_ Roles."
            },
            //Cusotmizing columns
            // I removed this code from here and for any refference on this column definition, Please refer to User Manager Form
            //aoColumnDefs: [],

            // Enabling Filter
            "bFilter": true,
            // Enabling Custom information
            "bInfo": true,
            // Providing Datasource
            "aaData": datasource,
            //Defining Columns
            "aoColumns": [
                { "mDataProp": "roleid" ,
                	"sClass": "hide_column"
                },
                { "mDataProp": "rolename" },
                { "mDataProp": "roledesc" },
                {
                    "mDataProp": function (Obj) {
                        return SplitDateandTime(Obj.createddate);
                    }
                },
                { "mDataProp": "isactive" }]
        });
        // In this step, removing sorting icons..
        $('.DataTables_sort_icon').remove();
        // In this step, removing Page number on the header part
        $('.dataTables_length').remove();
        $(".ui-widget-header").css("background", "#2D89EF");
        $(".ui-widget-header").css("background", "#2D89EF");
        tbl_trclick();
    } catch (e) {
        alert(e);
    }
}
function SplitDateandTime(data) {
    if (data == "") {
        return data;
    } else {
        var data1 = data;
        var d = data1.split("T");
        var d2 = d[0].split("-");
        var findate = d2[2] + "/" + d2[1] + "/" + d2[0];
        return findate;
    }
}
function tbl_trclick() {
    $("#hideRoleId").remove();
    $("#hideRoleId").text("");
    $("#tbl_RolesList tbody").delegate("tr", "click", function () {
        try {
            var iPos = oTable.fnGetPosition(this);
            if (iPos != null) {
                var aData = oTable.fnGetData(iPos); //get data of the clicked row              
                var iId = aData[1];
                var firstCellText = $("td:eq(0)", this).text();
                $("#Role_Id").html("");
                $("#hideRoleId").html("");
                $("#Role_Id").html(firstCellText);
                $("body").append("<label id='hideRoleId' style='display:none;'></label>");
                $("#hideRoleId").html(firstCellText);
                var fourthCellText = $("td:eq(3)", this).text();
                //To change the color of selected row.
                $(this).addClass("selected").siblings().removeClass("selected");
            }
        }
        catch (e) {

            fn_A_OtherErrors("Role_FL_Other_0002");
        }
    });
}
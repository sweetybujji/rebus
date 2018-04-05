RapidApp.factory('UsersListFactory', function ($http) {
    return {
        getuserslist: function () {
            return $http.get('/Users/GetUserDetails');
        }
    }
});
RapidApp.controller('GetUsersList', function ($scope, $location, UsersListFactory) {
    
        UsersListFactory.getuserslist().success(function (data) {
            if (data) {
            	 var tblobj = (data);
                fn_Make_Users_DataTable(tblobj);
            }
            else if (data.errorresult) {
                alert(data.errorresult);
            }
        }).error(function (data) {
            $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
            $scope.loading = false;
        });
   
    //........  getting  roles list ended.....//

    $scope.UserEdit = function () {
        var hideuserid = $("#hideUserId").val();
        if (typeof hideuserid == "undefined") {
            alert("Select any row from table to Edit..!");
        }
        else {
        	  	$location.path('/CreateNewUser');
           
        }
    }

    $scope.gotocreate=function(){
    	$location.path('/CreateNewUser');
    }
   
    
    $scope.deleteuser = function () {
        var hiddenid = $('#hideUserId').val();
        if (typeof hiddenid == "undefined") {
            alert("Select any row from table to delete..!");
        }
        else {
            var UserId = $('#hideUserId').text();
            var asd=JSON.stringify({ UserDetails: UserId });
            $.ajax({
                url: 'Users/DeleteUser',
                type: "POST",
                /*datatype: "json",*/
                data: asd,
                contentType:'application/json',
                async: false,
                success: function (response) {
                	alert(response);
                    UsersListFactory.getuserslist().success(function (data) {
                        if (data) { 
                        	var tblobj =data;
                            fn_Make_Users_DataTable(tblobj);
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



function fn_Make_Users_DataTable(DataTableSource) {
    //alert(DataTableSource);
    try {
        //Simple Table
       oTable = $('#UserManagerDetails').dataTable();
       oTable = $('#UserManagerDetails').dataTable({
            // Enabling JQuery UI
            "bDestroy": true,
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
                "sLengthMenu": "Users _MENU_",
                "sZeroRecords": "No Users Found - Please Try Again.",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users.",
                "sInfoEmpty": "Showing 0 to 0 of 0 Users.",
                "sInfoFiltered": "Result: Found from _MAX_ Users."
            },
            // Enabling Filter
            "bFilter": true,

            // Enabling Custom information
            "bInfo": true,
            // Providing Datasource
            "aaData": DataTableSource,
            //Defining Columns
            "aoColumns": [
            { "mDataProp": "UserId" ,
            "sClass":"hide_column"	
            },
            { "mDataProp": "UserName" },
            { "mDataProp": "Email" },
            { "mDataProp": "RoleName" }]
        });
        // In this step, removing sorting icons..
        $('.DataTables_sort_icon').remove();
        // In this step, removing Page number on the header part
        $('.dataTables_length').remove();
        $(".ui-widget-header").css("background", "#2D89EF");
        $(".ui-widget-header").css("background", "#2D89EF");
        tbl_truserclick();
    } catch (e) {
        fn_A_TableMaking("User_FL_FN_0001");
    }
}
function tbl_truserclick() {
    $("#hideUserId").remove();
    $("#hideUserId").text("");
    $("#UserManagerDetails tbody").delegate("tr", "click", function () {
        try {
            var iPos = oTable.fnGetPosition(this);
            if (iPos != null) {
                // Getting all details of that perticular selcted row
                var aData = oTable.fnGetData(iPos); //get data of the clicked row
                //var iId = aData[1];
                var firstCellText = $("td:eq(0)", this).text();
                var fourthCellText = $("td:eq(3)", this).text();                       
                $("#User_Id").html("");
                $("#hideUserId").html("");
                $("#User_Id").html(firstCellText);
             
                $("body").append("<label id='hideUserId' style='display:none;'></label>");
                $("#hideUserId").html(firstCellText);
                $(this).addClass("selected").siblings().removeClass("selected");
            }
            
        }
        catch (e) {
            fn_A_OtherErrors("User_FL_Other_0002");
        }
    });
}


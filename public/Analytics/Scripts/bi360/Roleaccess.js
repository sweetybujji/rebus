RapidApp.factory('RoleAccessFactory', function ($http) {
    return {
        getformslist: function () {
            return $http.get('/Roles/GetMasterForm');
        }
    }
});




RapidApp.controller('GetRoleAccess', function ($scope, $location, RoleAccessFactory) {
    //........  getting role forms list .....//
	 $scope.go = function (path) {
	        $location.path(path);
	    };
    RoleAccessFactory.getformslist().success(function (data) {
        if (data) {
        //	alert(data);
            fn_Make_RoleForms_DataTable(data);
        }
        else if (data.errorresult) {
            alert(data.errorresult);
        }
    }).error(function (data) {
        $scope.error = "An Error has occured while loading posts! " + data.ExceptionMessage;
        $scope.loading = false;
    });
    //........  getting  roles  list ended.....//
    //   
});
var oTable, obj, tcount;
var id_Array = [];
function fn_Make_RoleForms_DataTable(datasource) {
    try {
        // Parsing JSON
        //alert(response);
      //  obj = jQuery.parseJSON(datasource);
    	obj = datasource;
        tcount = obj.length;
       // alert(tcount);
        ///Making of JQuery Data Table
        //$('#tbl_RoleCreationTable tbody').empty();
        oTable = $('#tbl_RoleCreationTable').dataTable(
        {
            // Enabling JQuery UI
            //"bJQueryUI": true,
            "bAutoWidth": false,
            // Pagination Type 
            "sPaginationType": "full_numbers",
            // Page Numbers Type
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            //Records per Page
            'iDisplayLength': 100,
            "bPaginate": true,
            // Enabling to select list of records per page
            "bLengthChange": true,
            "deferRender": true,
            "fnDrawCallback": function () {
                // update_editdashboard();
            },
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
                "sLengthMenu": "Form _MENU_",
                "sZeroRecords": "No Form Found - Please Try Again.",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Form.",
                "sInfoEmpty": "Showing 0 to 0 of 0 Form.",
                "sInfoFiltered": "Result: Found from _MAX_ Form."
            },
            //Cusotmizing columns                
            // This is used to make enable checkboxes in every row for a perticular column aTargets: [0]
            columnDefs: [
                                        {

                                            "targets": 3,    // Column number which needs to be modified
                                            "render": function (o, v) {   // o, v contains the object and value for the column

                                                var ids = Math.random(Math.floor * 56456565456);
                                                id_Array.push(ids);
                                                var checkboxstring = '<input type="checkbox" class="chk" id=' + ids + '/>';
                                                return checkboxstring;
                                            },
                                            sClass: 'tableCell'    // Optional - class to be applied to this table cell
                                        },

                                        {
                                            aTargets: [0],
                                            "bVisible": true
                                        }],

            // Enabling Filter
            "bFilter": true,
            // Enabling Custom information
            "bInfo": true
        });
        if (tcount > 0 && tcount != undefined) {
        	//alert(obj.length);
            for (var i = 0; i < obj.length; i++) {
                var n = obj[i].fgroups.split(",");
                for (var j = 0; j < n.length; j++) {
                    //$('#tbl_RoleCreationTable').dataTable().fnAddData([obj.DocumentElement.MForms[i].Fid, obj.DocumentElement.MForms[i].Fname, n[j], obj.DocumentElement.MForms[i].Fid]);
                    $('#tbl_RoleCreationTable').dataTable().fnAddData([obj[i].fid, obj[i].fname, n[j]], obj[i].fid);
                }
            }
            getEditRoleData();
        }
        else {
        }
        /// In this step, removing sorting icons..
        ///
        $('.DataTables_sort_icon').remove();
        /// In this step, removing Page number on the header part        
        $('.dataTables_length').remove();
        $(".ui-widget-header").css("background", "#2D89EF");
        $(".ui-widget-header").css("background", "#2D89EF");
    }
    catch (e) {
        alert(e);
    }
}

function getEditRoleData() {
    try {
        var RoleId = $("#hideRoleId").text();
        if (RoleId == null || RoleId == "") {

        }
        else {
            $('#txt_RN').attr("disabled", "disabled");
            //$('#ta_RD').attr("disabled", "disabled");
            // Changing the button'S text to Update and Cancel and List respectively
            $("#btn_Save").text('Update');
            $("#btn_Clear").text("Cancel");
            $("#btn_List").text("List");
            // Clearing  values to the  hidden labels
            //Sending Ajax request to the Server to bind the values.
            $.ajax({
                type: 'POST',
                url: '../Roles/getrolesacessdata',
                async: false,
                'data': { roleid: RoleId },
                success: function (response) {
                   // var responseobj = response;
                   /* var obj = JSON.parse(responseobj);*/
                    
                    var obj1 = response.Roles;
                    var obj=response.RoleAccess;
                    $('#txt_RN').val(obj1[0].rolename);
                    $('#ta_RD').val(obj1[0].roledesc);
                   
                    tcount = obj.length;
                    if (tcount > 0 && tcount != undefined) {
                        var i = 0;
                        $("#tbl_RoleCreationTable tbody tr").each(function () {
                            var this_row = $(this);
                            var fid = this_row.find('td:eq(0)').html();
                            var Action = this_row.find('td:eq(2)').html();
                            for (var i = 0; i < tcount; i++) {
                           
                                if (fid == obj[i].formid && Action == obj[i].action) {
                                    if (obj[i].isaccessible == true) {
                                        $.trim(this_row.find('td:eq(3)').find('.chk').prop("checked", true));
                                    }
                                }
                            }
                            i++;
                        });
                    }
                    var all_chk = false;
                    if ($('.chk:checked').length == $('.chk').length) {
                        all_chk = true;
                    }
                    else {
                        all_chk = false;
                    }
                    if (all_chk == false) {
                        $('#chk_allforms').prop('checked', false);
                    }
                    else {
                        $('#chk_allforms').prop('checked', true);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //fn_A_AjaxError("Role_FC_R_0001");
                    alert(thrownError);
                }
            });
        }

    } catch (e) {
        //fn_A_AssigningError("New OPCServer", "OPCServer_FC_R_0001");
        alert(e);

    }
    chk_allforms();
}

function chk_allforms() {
    $('#chk_allforms').change(function () {
        if ($(this).prop('checked')) {
            $('#tbl_RoleCreationTable tbody tr td input[type="checkbox"]').each(function () {
                $(this).prop('checked', true);
            });
        } else {
            $('#tbl_RoleCreationTable tbody tr td input[type="checkbox"]').each(function () {
                $(this).prop('checked', false);
            });
        }
    });
    $('.chk').change(function () {
        var all_chk = false;
        if ($('.chk:checked').length == $('.chk').length) {
            all_chk = true;
        }
        else {
            all_chk = false;
        }
        if (all_chk == false) {
            $('#chk_allforms').prop('checked', false);
        }
        else {
            $('#chk_allforms').prop('checked', true);
        }
    });

}


/// Function Code: Role_FC_FN_0002
function fn_SaveRole() {
    try {
        ///validations
        var rolename = $('#txt_RN').val().trim();
        var roledesc = $('#ta_RD').val().trim();
        if (rolename == null || rolename == "" || rolename == undefined) {
            alert("Enter Role Name Details");
            $("#L1").show();
            $("#L1").fadeOut(2000);
            return false;
        }
        else if (roledesc == null || roledesc == "" || roledesc == undefined) {
            alert("Enter Role Description Details");
            $("#L2").show();
            $("#L2").fadeOut(2000);
            return false;
        } else if (!$('input:checkbox').is(':checked')) {
            alert("A role must select atleast one checkbox to access the respective forms");
            return false;
        }
        else {
            var roledata = [];
            var rolename = $('#txt_RN').val().trim();
            var roledesc = $('#ta_RD').val().trim();
            ///checking the emptyness of rolename and proceeding for saving data
            if (rolename != "") {
                ///retrieving complete table data and pushing into an array
                $("#tbl_RoleCreationTable tbody tr").each(function () {
                    var this_row = $(this);
                    roledata.push({
                        FormID: $.trim(this_row.find('td:eq(0)').html()),
                        FormName: $.trim(this_row.find('td:eq(1)').html()),
                        Action: $.trim(this_row.find('td:eq(2)').html()),
                        ISAccessible: $.trim(this_row.find('td:eq(3)').find('.chk').is(':checked'))
                    });
                });
                var js = roledata;
                var jadata1 = js + "#" + rolename + "#" + roledesc;
                fn_SaveRolesUsingAjax(js);
            }
            else {
                fn_A_Message("Please give Role Name ");
            }
        }
    }
    catch (e) {
        fn_A_TryCatch("Role_FC_FN_0002");
    }
}


///Used to Save Complete Roles details by sending AJAX Request
/// Function Code: Role_FC_FN_0003
function fn_SaveRolesUsingAjax(Spec_Values_String) {
    try {

        var Spec_Values_String = Spec_Values_String;
        var rolename = $('#txt_RN').val().trim();
        var roledesc = $('#ta_RD').val().trim();
        var Role_Id = $("#hideRoleId").html();
        $("#Role_Id").html("");
        //Assigning values to the hidden labels
        $("#Role_Id").html(Role_Id);
        var RoleId1 = $("#Role_Id").text().trim();
        //var Access = Convert.ToBoolean(Line_ResArray[i]["ISAccessible"].ToString());
        if (typeof Role_Id == "undefined")
            Role_Id = "";
        var data = { RoleName: rolename, roledesc: roledesc, Spec_Values_String: Spec_Values_String,roleid:Role_Id};
        var project_data = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            url: '../Roles/Save_rolesdata',
            data: project_data,
            async: false,
            datatype: 'json',
            contentType: "application/json",
            success: function (response) {
                //response = jQuery.parseJSON(response.responsedata);
                if (response=="Save Success") {
                    alert("Roles created successfully");
                    $('#txt_RN').val("");
                    $('#ta_RD').val("");
                    clearfields();
                    //window.location.href = '../../Roles/Index';
                    //$scope.go('/RolesList');
                }
                else if (response== "Update Success") {
                    alert("Roles Updated successfully");
                    $('#txt_RN').val("");
                    $('#ta_RD').val("");
                    clearfields();
                    //window.location.href = '../../Roles/Index';
                    //$scope.go('/RolesList');
                } else if (response == "EXISTS") {
                    alert("Role Name already existing ...!!! Try to create another unique rolename");
                }
                else if (response == "SessionEnd") {
                    alert("Your Session is expired, Please Login again");
                    // window.location.href = '../../Login/LogOut';
                }
                else {
                    //alert("New Roles", "Role_FC_FN_0003");

                }
            },
            error: function (xhr, ajaxoptions, throwError) {
                alert(throwError);
            }
        });
    } catch (e) {
        alert("A error is occured while saving the Roles details" + e);

    }
}


function clearfields() {
    $('#resetform').each(function () {
        this.reset();
    })
}
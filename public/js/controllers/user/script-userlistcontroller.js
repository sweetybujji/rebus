/**
 * @author Divya
 * @created date 09/11/2017
 * @Modified By tejasree 13/04/2018
 */
 RapidApp.controller('userlistctrl', function ($scope, $location, $state,userfactory) {
/**
@summary:  To used to the getting the data  admin_m_roles
           table and show user list.
@function code:fn_userdata_list_001
**/
 localStorage.setItem('id', '');
 localStorage.setItem('type', '');
 $scope.fn_userdata_list =function() {
        try {
            StartPageLoader();
            userfactory.userlist().then(function(response){
            var userlistresponse=response.data;
            if (response.isauthenticated == false) {
                          StopPageLoader();

                          }

             else if (response.error) {
                 fn_errorNotification("200", response.error, response.error, "error occured at fn_userdata_list_001", "error_alert", "", "");
                          StopPageLoader();
              }
            else {
                 var data = '';
                      $('#user_table').DataTable().destroy();
                      for (var i = 0; i < userlistresponse.length; i++) {
                        var idd = userlistresponse[i]["id"];
                              data += '<tr id="' + userlistresponse[i].Id + '" fname=' + userlistresponse[i].Firstname + '' + '' + userlistresponse[i].Lastname + '><td>' + userlistresponse[i].EmployeeId + '</td><td>' + userlistresponse[i].Firstname + '' + '' + userlistresponse[i].Lastname + '</td><td>' + userlistresponse[i].EmailId + '</td><td>' + userlistresponse[i].RoleName + '</td><td>' + userlistresponse[i].chk_active + '</td></tr>';
                          }
                          $("#list_userBody").empty();
                          $("#list_userBody").append(data);
                          $("#user_table").DataTable({

                          });
                          StopPageLoader();
                      }

            }).catch(function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at fn_userdata_list_001", "error_alert", "", "");
                StopPageLoader();
            })

        } catch (e) {

            fn_errorNotification("200", e, e, "error occured at fn_userdata_list_001", "error_alert", "", "");
            StopPageLoader();
        }
    }
    /**
     @summary:To highlight table row on click.
   **/

    var rowid;
    var selname;
    $('#list_userBody').on('click', 'tr', function () {
        rowid = $(this).attr("id");
        selname = $(this).attr('fname');
        $('#list_userBody tr').each(function () {

            $(this).css("background-color", "unset");
            $(this).css("color", "unset");
        });

        $(this).css("background-color", "#6f99c6 ");
        $(this).css("color", "white");

    });

    /**
    @summary:  To used to the delete user data
              admin_m_rolestable.
    @function code:fn_user_delete_002
    **/

$scope.fn_user_delete=function() {
        try {
            var dataobj = [];
            var jobj = new Object();
            jobj.id = rowid;
            dataobj.push(jobj);
            var data=JSON.stringify(dataobj)
       if (selname == undefined || selname == "undefined" || selname == "") {
                fn_errorNotification("200", "", "", "Please Select a Record to Delete", "error_alert", "", "");
            }
            else {
                bootbox.confirm("Do You want to to Delete " + selname + "  Record?", function (result) {
                    if (result) {

                        userfactory.deleteuser(JSON.stringify(dataobj)).then(function(response){
                                   if (response.data.isauthenticated == false) {
                                       StopPageLoader();

                                       fn_session_expired_client();

                                   }

                                   else if (response.data.error) {
                                       fn_errorNotification("200", response.error, response.error, "error occured at fn_user_delete_002", "error_alert", "", "");
                                  }
                                  else {
                                      fn_SuccessNotification(response.data, "success_alert", "", "");
                                      $scope.fn_userdata_list();
                                      rowid = "";
                                  }
                        })

                    }
                });
            }
        } catch (e) {
            fn_errorNotification("200", e, e, "error occured at fn_user_delete_002", "error_alert", "", "");
        }

    }

 /**
 @summary:  To used to the  change to state.
**/

    $scope.go = function (path) {
        $location.path(path);
    };

    /**
    @summary:  To populate data update operation.
    @function code:fn_user_update
    **/

    $scope.fn_user_update = function () {
        if (selname == undefined || selname == "undefined" || selname == "") {
            fn_errorNotification("200", "", "", "Please Select a Record to Edit", "error_alert", "", "");
        }
        else {

            bootbox.confirm("Do You want to Edit " + selname + " Details?", function (result) {
                if (result) {
                    selname = "";
                    localStorage.setItem('id', rowid);
                    localStorage.setItem('type', 'edit');
                    $state.go('Users', {
                        id: rowid,
                        type: 'edit',
                        Name: selname
                    });
                }
            });
        }
    };
});

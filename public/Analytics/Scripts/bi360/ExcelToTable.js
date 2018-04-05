//RapidApp.factory('ExceltoTableFactory', function ($http) {
//    return {
//        //GetImportedfiles_List: function () {
//        //    return $http.get('../../ECR/GetImportedfiles_List');
//        //},



//    }
//});

//RapidApp.controller('ExceltoTableListController', function ($scope, $location, ExceltoTableFactory) {
//    //ExceltoTableFactory.GetImportedfiles_List

//    pageload();

//    function pageload() {
//        $.ajax({
//            url: '../../ECR/GetImportedfiles_List',
//            type: "POST",
//            datatype: "json",
//            async: false,
//            success: function (response) {

//                var d = new Date();
//                //alert(d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate());
//                var newRowContent = "";
//                var param = "data";
//                for (var i = 0; i < response.length; i++) {
//                    //newRowContent += '<tr><td>' + response[i].Id + '</td>';
//                    //newRowContent += '<tr><td>' + response[i].FileName + '</td>';
//                    newRowContent += '<tr><td>'
//                            + response[i].replace(".xml", "") + '</td>';
//                    newRowContent += '<td>Env_555</td>';
//                    newRowContent += '<td>' + d.getDate() + '/'
//                            + (d.getMonth() + 1) + '/' + d.getFullYear()
//                            + '</td>';
//                    newRowContent += '<td><span style="display:inline-flex;margin-left:-3px;"><button style="font-size:12px;" class="btn btn-small btn-warning" onclick="ViewData(\''
//                            + response[i]
//                            + '\')" ><i class="halflings-icon eye-open"></i></button><button style="margin-left:5px;font-size:12px;" class="btn btn-small btn-success"  onclick="EditSheet(\''
//                            + response[i]
//                            + '\')"><i class="halflings-icon edit"></i></button><button style="margin-left:5px;font-size:12px;" class="btn btn-small btn-danger red" onclick="deleteData(\''
//                            + response[i]
//                            + '\')"><i class="halflings-icon remove"></i></button></td></span></tr>';

//                }

//                $("#Tbl_ImportedFilesList tbody").append(newRowContent);
//                $('#Tbl_ImportedFilesList').DataTable();
//            },
//            error: function (re) {

//                alert("Error occured");
//            }

//        });
//    }





//});
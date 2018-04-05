/**
 * @author Manikanta
 * @created date 09/11/2017
 * @Modified By Manikanta
 * @Modified Date 09/11/2017
 */

RapidApp.controller('DomainModelCtrl', function ($scope, $location, $state, $stateParams) {
    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.ShowPreviousEntities = function () {
        $state.go("DomainModelTree");
    }

    EditDomainModel('Rubus_Core', 'edit');
});

RapidApp.controller('DomainModelTreeCtrl', function ($scope, $location, $state) {
    localStorage.setItem('DateTime', '');

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.GetDomainModelTree = function () {
        $.ajax({
            url: '../GetDomainModelTree',
            type: 'post',
            contentType: 'application/json',
            beforeSend: function () {
                $("#Loader").show();
            },
            success: function (result) {
                var data = [];
                if (result.error || result == "" || result == null || result == "null" || result == []) {
                    data = [
                        { "id": "Root", "parent": "#", "text": "Root", 'state': { 'opened': true, 'selected': true }, "icon": "/Analytics/Images/OPC_Icons/locationicon1.png" },
                        { "id": "NewNode", "parent": "Root", "text": "NewNode", "icon": "/Images/Widgets/Folder-icon.png" }
                    ];
                }
                else {                    
                    data = [
                        { "id": "Root", "parent": "#", "text": "Root", 'state': { 'opened': true, 'selected': true }, "icon": "/Analytics/Images/DomainModel/icons8-module-filled-24.png" },
                        // /Analytics/Images/OPC_Icons/locationicon1.png
                        
                        { "id": result[0]["CreatedDate"], "parent": "Root", "text": result[0]["CreatedDate"], "icon": "/Analytics/Images/DomainModel/calendar-page-with-text-lines.png" },
                        { "id": result[0]["CreatedDateTime"], "parent": result[0]["CreatedDate"], "text": result[0]["CreatedTime"], "icon": "/Analytics/Images/DomainModel/wall-clock-of-circular-shape.png" }
                    ];

                    for (var i = 1; i <= result.length - 1; i++) {
                        if (result[i]["CreatedDate"] == result[i - 1]["CreatedDate"]) {
                            data.push({ "id": result[i]["CreatedDateTime"], "parent": result[i]["CreatedDate"], "text": result[i]["CreatedTime"], "icon": "/Analytics/Images/DomainModel/wall-clock-of-circular-shape.png" });
                        }
                        else {
                            data.push({ "id": result[i]["CreatedDate"], "parent": "Root", "text": result[i]["CreatedDate"], "icon": "/Analytics/Images/DomainModel/calendar-page-with-text-lines.png" },
                            { "id": result[i]["CreatedDateTime"], "parent": result[i]["CreatedDate"], "text": result[i]["CreatedTime"], "icon": "/Analytics/Images/DomainModel/wall-clock-of-circular-shape.png" });
                        }
                    }
                }

                $('#DomainModelTree').bind('loaded.jstree', function (e, data) {
                    //construct tree by using jquery plugun..
                }).jstree({
                    'core': {
                        'data': data,
                        check_callback: true,
                        "load_open": true
                    },
                    "types": {
                        "default": {
                            "icon": "glyphicon glyphicon-flash"
                        },
                        "demo": {
                            "icon": "glyphicon glyphicon-ok"
                        }
                    }
                });

                $("#DomainModelTree").bind("select_node.jstree", function (evt, data) {
                    var res = jQuery.jstree.reference('#DomainModelTree').get_json(data.instance.get_node(data.selected[0]).id, { flat: true });
                    var cnt = 0;
                    for (var i = 0, j = res.length; i < j; i++) {
                        if (res[i].parent !== '#') {
                            cnt++;
                        }
                    }
                    if (cnt == 1) {
                        var SelectedDateTime = data.instance.get_node(data.selected[0]).id;
                        localStorage.setItem('DateTime', SelectedDateTime);
                        $state.go("DomainModel", {
                            "DateTime": SelectedDateTime
                        });
                    }
                    else {
                        $('#' + data.instance.get_node(data.selected[0]).id + ' .jstree-ocl').click();
                    }
                });
            },
            complete: function () {
                $("#Loader").hide();
            },
            error: function (err) {
                $("#Loader").hide();
                alert(err);
            }
        });
    }

    $scope.GetDomainModelTree();
});

//$("#bitree").bind(
//      "select_node.jstree", function (evt, data) {
//          alert("inside");
//          //selected node object: data.inst.get_json()[0];
//          //selected node text: data.inst.get_json()[0].data
//          var ref = $('#bitree').jstree(true);
//          var sel = ref.get_selected();
//          if (sel == "Dropdown") {
//              ChangeTabIndex();

//          } else {
//              ChangeValueTabtoData();
//          }
//          $(".imgvalidate").remove();
//          $("#" + sel + "").append("<a href='#' class='imgvalidate' onclick='RemoveNode()'>X</a>");
//      }

//);











//var data = [
//             {
//                 "id": "Dropdown", "parent": "#", "text": "Dropdown", 'state': { 'opened': true, 'selected': true },
//             },
//             { "id": "Values", "parent": "Dropdown", "text": "Values" },
//             { "id": "Labels", "parent": "Dropdown", "text": "Labels" }
//];

//$('#bitree').jstree({
//    'core': {
//        'data': data,
//        check_callback: true
//    }, "types": {
//        "default": {
//            "icon": "glyphicon glyphicon-flash"
//        },
//        "demo": {
//            "icon": "glyphicon glyphicon-ok"
//        }
//    }, "plugins": ["types", "contextmenu"]
//});

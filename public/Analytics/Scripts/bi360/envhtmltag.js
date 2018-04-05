
function envhtmltag($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
   
    $("#previewobject").empty();

    if (controlid == "new")//Creating new Control
    {
        htmltag.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            style: { "position": "absolute", "width": "100%", "height": "Auto", "overflow": "auto", "BackgroundColor": "#ffffff", "BorderColor": "#000000", "BorderStyle": "none", "BorderWidth": "1" },
            html: { 'textarea': '<h4 style="padding-bottom:4px">HTML Placeholder</h4><p style="color:Red"><i>Replace this HTML with your own. You can inject data into it by defining one or more series and using the template language to reference the series.</i></p>' },
            script: { 'tag': '$(document).ready(function(){ })' },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = htmltag.byId(htmltag, Controlid);
    } else {
        //$("#previewobject").empty();
        selecteditem = htmltag.byId(htmltag, $scope.view.getSelected().controlid);
        //if (selecteditem.get("datatabs").length > 0)
        //    $scope.datatabs = selecteditem.get("datatabs");
        //clone object  
        $("#previewobject").empty();
        $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));

    }

    $http.get('../Analytics/Bi360Templates/Tabs/envhtmltab.html').success(function (t) {
        
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));


    });
    //initializes tab index to 2.
    $scope.selected = 1;
    $scope.selecteditem = "Htmltemplate";
    $("#htmltemplatedatatab").show();
    $("#htmlproperiestab").hide();




    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "Htmltemplate", "parent": "#", "text": "Html template", 'state': { 'opened': true, 'selected': true } },
              { "id": "Html", "parent": "Htmltemplate", "text": "Html" }


    ];
    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        if (newtextstyel.height == "Auto") {
            $("#ddlhtmlheight").val("Auto");
            $("#f-customHeightVal").css("display", "none");
        } else {
            $("#ddlhtmlheight").val("Custom");
            $("#f-customHeightVal").css("display", "block");
            $("#txtCustomHeight").val(newtextstyel.height);
        }
       // alert(newtextstyel.overflow);
        if (newtextstyel.overflow == "auto") {
            $("#ddlhtmlscrollbars").val("No scrollbars");
          
        } else if (newtextstyel.overflow == "scroll") {
            $("#ddlhtmlscrollbars").val("Auto scrollbars");
        }
        $("#previewobject").css("height", newtextstyel.height);
        $("#previewobject").css("overflow", newtextstyel.overflow);

        //$("#colorpick").find(".colorPicker-picker").css({ "background-color": newtextstyel.BackgroundColor });
        //$("#color3").val(newtextstyel.BorderColor);
        //$("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
        //$("#borderstyle").val(newtextstyel.BorderStyle);
        //$("#borderwidth").val(newtextstyel.BorderWidth);
        //$("#stylewidth").val(newtextstyel.width);
        //$("#styleheight").val(newtextstyel.height);
        //$("#tab-indicators").hide();
        //$("#indicators").hide();
        //$("#PfixSfix").hide();
        //$scope.modalq = { presuffixstatus: true };
    }).jstree({
        'core': {
            'data': data,
            check_callback: true
        }, "types": {
            "default": {
                "icon": "glyphicon glyphicon-flash"
            },
            "demo": {
                "icon": "glyphicon glyphicon-ok"
            }
        }, "plugins": ["types", "contextmenu"]
    });
    //showing popup..
    var element = angular.element('#bidsahboardconfig');
    if (controlid != "new")
        element.modal('show');

    //clone object      
    $("#previewobject").empty();
    $("#" + $scope.view.getSelected().controlid + "").clone(true).removeAttr('id').appendTo($("#previewobject"));



    //bind properties if control is existing............
    if (controlid != "new") {
        Controlid = controlid;
        //if (selecteditem.get("datatabs").length > 0)
        //    $scope.datatabs = selecteditem.get("datatabs");
    }
    //var textobj = selecteditem.get("style");
    //$scope.width = textobj.width;
    //$scope.height = textobj.height;
    //$scope.bgcolor = textobj.BackgroundColor;
    //$scope.bdcolor = textobj.BorderColor;
    //$scope.brstyle = textobj.BorderStyle;
    //$scope.brwidth = parseInt(textobj.BorderWidth);

    $("#bitree").bind(
      "select_node.jstree", function (evt, data) {
          var ref = $('#bitree').jstree(true);
          var sel = ref.get_selected();
          if (sel == "Htmltemplate") {
              $scope.selecteditem = "Htmltemplate";
              $scope.selected = 1;
              $("#htmltemplatedatatab").show();
              $("#htmlproperiestab").hide();
          }
          else if (sel == "Html") {
              $scope.selecteditem = "Html";
              $scope.selected = 2;
              $("#htmltemplatedatatab").hide();
              $("#htmlproperiestab").show();;
              var newhtmltemplate = selecteditem.get("html");
              $("#TxtareaHtml").val(newhtmltemplate.textarea);

              var newscripttemplate = selecteditem.get("script");
              $("#TxtareaScript").val(newscripttemplate.tag);
          }



          $scope.argplaceholderclick(); $scope.bindinsertop(); $scope.operatorclick();
          $scope.agfuncclick(); $scope.bindliterallick(); $scope.binddataclick();

          $scope.$apply();

          //$scope.changedatapoint = function (columnname, range) {
          //    if (columnname.indexOf("@") == -1)
          //        columnname = "[" + columnname + "]";

          //    //get table data when user selected
          //    var $el = $("#vf-formula-bar").find(".active");
          //    if ($el.length > 0) {
          //        if ($el.hasClass("insertion") == true) {
          //            $('<li class="vf-node data active" data-range="' + range + '">' + columnname + '</li>').insertBefore($el);
          //            $el.removeClass("active"); $scope.binddataclick();
          //        }
          //        else if ($el.hasClass("data") == true) { $el.html(columnname); $el.attr("data-range", range) }
          //        else if ($el.hasClass("function") == true) {
          //            if ($ele.next().html() == ",")
          //                $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li>');
          //            else
          //                $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
          //        }
          //        else {
          //            if ($("#vf-formula-bar").find(".active").next().html() == ")") {
          //                $el.replaceWith('<li class="vf-node data active" title="data" data-range="' + range + '">' + columnname + '</li><li class="optional" style="display: inline-block;">,</li><li class="vf-node arg_placeholder optional activePeer" title="data" style="display: inline-block;">data</li>');
          //                $scope.argplaceholderclick(); $scope.binddataclick();
          //            }
          //        }
          //    }
          //    else {
          //        $("#vf-formula-bar").append('<ul class="vf-node expr rootNode"><li class="vf-node data active" data-range="' + range + '">' + columnname + '</li><li class="vf-node insertion"><img width="18" height="10" src="../../temp/prompt.gif"></li></ul>');
          //        $scope.bindinsertop(); $scope.binddataclick();
          //    }
          //    //end of table clcik
          //    $scope.updatedbconnections();
          //    $scope.$apply();
          //}
      });
    //$scope.alignproperties = function () {
    //    $(".btn-group").find("button[name=align]").on("click", function () {
    //        $(".btn-group").find(".btn-default").each(function (i) {
    //            $(this).removeClass("btn-default");
    //        });
    //        $(this).addClass("btn-default");
    //        //var align = $(this).attr("data-index").trim();  
    //        $scope.changeproperties();
    //    });
    //};

    $scope.fweightproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.fstyleproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.fdecorproperties = function (event) {
        $("#" + event.target.id).toggleClass("btn-default");
        $scope.changeproperties();
    };
    $scope.changeproperties = function () {

        if ($scope.selecteditem == "Htmltemplate") {
            var htmlproperties = new Object();
            if ($scope.ddlhtmlheight == "Auto") {
                htmlproperties.height = "Auto";
                $("#f-customHeightVal").css("display", "none");

            }
            else {
                $("#f-customHeightVal").css("display", "block");
                htmlproperties.height = $("#txtCustomHeight").val() + "px";
            }
            
            if ($scope.ddlhtmlscrollbars == "No scrollbars") {
                htmlproperties.overflow = "auto";
            } else {
                htmlproperties.overflow = "scroll";
                $("#previewobject").parent('div').css("display", "block");
            }
            selecteditem.set({ style: htmlproperties });
            
            $("#previewobject").css("height", htmlproperties.height);
            $("#previewobject").css("overflow", htmlproperties.overflow);
        }
        else if ($scope.selecteditem == "Html") {

            var htmlupdateproperties = new Object();
            htmlupdateproperties.textarea = $("#TxtareaHtml").val();
            selecteditem.set({ html: htmlupdateproperties });

            var updateproperties = new Object();
            updateproperties.tag = $("#TxtareaScript").val();
            selecteditem.set({ script: updateproperties });
        }
    };



    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }


};







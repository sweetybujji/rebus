function envimage($scope, $location, $http, $compile, left, top, dropeditem, controlid, target, type) {
    var Controlid = $scope.view.getID();
    $scope.datatabs = [];
    $scope.formulaop = "Aggrigative";
    $scope.optype = "Arithmetic";
    var selecteditem;
    if (controlid == "new") {
        image.add([{
            id: "" + Controlid + "",
            controltype: dropeditem,
            style: { "position": "absolute", "Width": "255", "Height": "85", "left": "" + (left - 110) + "px", "top": "" + (top - 150) + "px", "pairsaparation": "10px", "BorderColor": "#000000", "BorderStyle": "none", "BroderWidth": "1", "URLpath": "../../Images/LOGO1.png" },
            // style: { "position": "absolute", "width": "500px", "height": "185px", "bordercolor": "#000000", "borderstyle": "none", "borderwidth": "2", "URLpath": "" },
            datatabs: [],
            target: target,
            type: type
        }]);
        selecteditem = image.byId(image, Controlid);
    } else {
        selecteditem = image.byId(image, $scope.view.getSelected().controlid);
    }
    $http.get('../Analytics/Bi360Templates/Tabs/imagebrowse.html').success(function (t) {
        //bind tabs html to tabs div
        $("#Tabsobject").html($compile(t)($scope));
    });
    $scope.selected = 2;
    $scope.selecteditem = "image";
    $('#UploadFile').hide();
    $("#treeid").html($compile('<div id="bitree" > </div>')($scope));
    //tree data
    var data = [
               { "id": "image", "parent": "#", "text": "Image", 'state': { 'opened': true, 'selected': true } },
               { "id": "imageGallery", "parent": "image", "text": "ImageGallery" }
    ];
    //construct tree by using jquery plugun..
    $('#bitree').bind('loaded.jstree', function (e, data) {
        var newtextstyel = selecteditem.get("style");
        $("#color3").val(newtextstyel.BorderColor);
        $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
        $("#borderstyle").val(newtextstyel.BorderStyle);
        $("#borderwidth").val(newtextstyel.BroderWidth);
        $("#stylewidth").val(newtextstyel.Width);
        $("#styleheight").val(newtextstyel.Height);
        $("#URLPath").val(newtextstyel.URLPath);
        $('#UploadFile').hide();

        $('#previewobject').css({ "width": newtextstyel.Width });
        // $('#previewobject').children().css({ "height": newtextstyel.Height });
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
        // selecteditem = image.byId(image, $scope.view.getSelected().controlid);
        // alert(selecteditem);
        //if (selecteditem.get("datatabs").length > 0)
        //    $scope.datatabs = selecteditem.get("datatabs");
    }

    //selecteditem = image.byId(image, $scope.view.getSelected().controlid);   
    var textobj = selecteditem.get("style");
    $scope.width = textobj.Width;
    $scope.height = textobj.Height;
    $scope.bdcolor = textobj.BorderColor;
    $scope.brstyle = textobj.BorderStyle;
    $scope.brwidth = parseInt(textobj.BroderWidth);
    $scope.URLPath = textobj.URLPath;
    $("#bitree").bind("select_node.jstree", function (evt, data) {
        // var selecteditem = image.byId(image, $scope.view.getSelected().controlid);
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        if (sel == "image") {
            $scope.selecteditem = "image";
            $scope.selected = 2;
            $("#imagedatatab").hide();
            $("#imageproperiestab").show();
            $("#VFormula-menu").hide();
            $("#vf-formula-bar").hide();
            $('#radioprop').show();
            $('#UploadFile').hide();
            var newtextstyel = selecteditem.get("style");

            $("#color3").val(newtextstyel.BorderColor);
            $("#colorpickbr").find(".colorPicker-picker").css({ "background-color": newtextstyel.BorderColor });
            $("#borderstyle").val(newtextstyel.BorderStyle);
            $("#borderwidth").val(newtextstyel.BroderWidth);
            $("#stylewidth").val(newtextstyel.Width);
            $("#styleheight").val(newtextstyel.Height);
            $("#URLPath").val(newtextstyel.URLPath);

        } else if (sel == "imageGallery") {
            $("#imagedatatab").hide();
            $("#imageproperiestab").show();
            $("#VFormula-menu").hide();
            $("#vf-formula-bar").hide();
            $('#UploadFile').show();
            $('#radioprop').hide();
            uploadedimages();
            $scope.selected = 2;
        }
        $scope.$apply();
    });
    $scope.changeproperties = function () {
        var img_style = new Object();
        img_style.URLPath = $('#URLPath').val();
        img_style.BorderColor = $('#color3').val();
        img_style.BroderWidth = $('#borderwidth').val();
        img_style.BorderStyle = $('#borderstyle').val();
        img_style.Width = $('#stylewidth').val();
        img_style.Height = $('#styleheight').val();
        selecteditem.set({ style: img_style });
    };
    //it will remove selected tree node..
    function RemoveNode() {
        var ref = $('#bitree').jstree(true);
        var sel = ref.get_selected();
        ref.delete_node([sel]);
    }
    //to upload images
    $scope.ImageFileUpload = function () {
        var uplodfile = $('#imagefile').val();
        var file_data = $("#imagefile").prop("files")[0]; // Getting the properties of file from file field
        var form_data = new FormData(); // Creating object of FormData class
        form_data.append("file", file_data);
        if (uplodfile == "") {
            alert("Select a file");
        } else {
            $.ajax({
                type: 'POST',
                url: '../../imagefileupload/MyimageFileUpload',
                contentType: false,
                processData: false,
                cache: false,
                data: form_data,
                success: function (data) {
                    if (data == "Fail") {
                        alert("Uploading Fail");
                    } else if (data == "Exist") {
                        alert("Image already Exist");
                    }
                    alert(data.split('^')[1] + " Uploded Successfully");
                    $('#imagefile').val("");
                    uploadedimages();
                }
            });
        }
    }
    function uploadedimages() {
        $.ajax({
            type: 'GET',
            url: '../../imagefileupload/uploadedimages',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                //alert(data);
                try {
                    var ImageList = "";
                    var arr = JSON.parse(data);
                    $("#ImageFiles").empty();
                    if (arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            var src = "../../UploadedImageFiles/" + arr[i].ImageFile.Title;

                            $("#ImageFiles").append('<div style="float: left; height: 70px; width: 102px;" class="WidgetBrowser"><div class="deleteclass"><button class="borderless" title="Close the dashboard" style="display:none;float:right;margin-right:2%;"><i class="icon-remove"></i></button></div> <div id="imagehover" data-imgsrc="' + src + '" class="widgetCategory widgetIcon imgselected" style="background-image: url(&quot;' + src + '&quot;); border: medium none; background-color: transparent;background-size: 60px auto;"> <header><span style="font-size: 14px;margin-top:10px; max-width: 102px; color: rgb(0, 0, 0);">' + (arr[i].ImageFile.Title).split('^')[1] + '</span></header></div></div>');
                            $(".WidgetBrowser").mouseover(function () {
                                $(this).find(".borderless").css("display", "block");
                            });
                            $(".WidgetBrowser").mouseout(function () {
                                $(this).find(".borderless").css("display", "none");
                            });


                            if (selecteditem.get("style").URLPath == src) {
                                $(".imgselected").eq($(".imgselected").length - 1).find("span").css("color", "green");
                            }
                        }
                    }
                    else if(data=="Fail"){
                        alert("No Images");
                    }
                    $(".imgselected").click(function () {
                        $(".imgselected").find("span").css("color", "black");
                        var model = selecteditem.get("style");
                        var imgURl = $(this).attr("data-imgsrc");
                        model.URLPath = imgURl;
                        selecteditem.unset("style", { silent: true });
                        selecteditem.set({ "style": model });
                        $(this).find("span").css("color", "green");

                    });
                    $(".deleteclass").on('click', function () {
                        var imgName = $(this).next().find('span').html();
                        //  alert($(this).parent().find(".imgselected").attr("data-imgsrc")); to get image src
                        var del = confirm("Do you want delete this image");
                        if (del == true) {
                            $http.post('/imagefileupload/DelImage', { ImgName: imgName }).success(function (data) {
                                if (data == "Fail") {
                                    alert(data);
                                } else {
                                    alert(data.split('^')[1] + "Deleted Successfully");
                                    // var model = selecteditem.get("style");
                                    // model.URLPath = "";
                                    //$(this).parent().find(".imgselected").attr("data-imgsrc") = "";
                                    $(".imgselected").click();
                                }
                                uploadedimages();

                            });
                        } else {
                            return false;
                        }
                    });

                }
                catch (e) {
                    alert("No Images in Folder");
                }
            }

        });
    }

}


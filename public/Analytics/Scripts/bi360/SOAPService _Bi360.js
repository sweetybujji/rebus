/************************************************************************************Start Global Variables************************************************************************************/

var MYReturnResponcemethod;
var MethodData;
var WSDL_Resp_Service;
var MY_Wsdl_port;

var MyTxt_Result;
var myArray = new Array();

var obj = {};

var parents;
var seletednode;
var seletedname;
var WSDL_Method_Res;
var jsonObjrequset_tree = [];
var Mychild = [];
var Path_Url_Speration;

var forpopup = [];
/************************************************************************************ End Global Variables************************************************************************************/

function ShowDialog() {
    var chooser = '';
    chooser = $('#file_Upload');
    chooser.change(function (evt) {
        var files = $('#file_Upload')[0].files;
        $('#txt_wsdlfile').val(files[0].name);
    });
    chooser.trigger('click');
}

$("#Get_WSDL").click(function (e) {
    $("#Service_Wsdl").hide();
    $("#input_Wsdl").hide();
    $("#Output_Wsdl").hide();
    var uplodfile = $('#file_Upload').val();
    var file_data = $("#file_Upload").prop("files")[0]; // Getting the properties of file from file field
    var form_data = new FormData(); // Creating object of FormData class
    form_data.append("file", file_data);
    /************************************************************************************ Start Online Url Functionality************************************************************************************/
    if (uplodfile == "") {

        if ($("#txt_wsdlfile").val() != "") {
            var myurl = $("#txt_wsdlfile").val();
            var mydata = JSON.stringify({ myurl: myurl })
            StartPageLoader();
            $.ajax({
                type: 'POST',
                url: '../GetResponseform_WSDLUrl',
                contentType: "application/json",
                data: mydata,
                success: function (data) {
                    if (data.isauthenticated == false) {
                        StopPageLoader();

                        //fn_session_expired_client();

                    }

                    else {

                        var NAdata = JSON.parse(data);
                        if (NAdata == 'false' || NAdata == false) {
                            StopPageLoader();
                            fn_errorNotification("200", '', '', "Unable to Connect WSDL File", "error_alert", "", "");
                        }
                        else {
                            StopPageLoader();
                            var mydata = NAdata[0].children;
                            var MyOPerationName = new Array();
                            for (var i = 0; i < mydata.length; i++) {
                                for (key in mydata[i]) {

                                    if (key == "operations") {
                                        var MethodName = mydata[i].operations;

                                        for (key in MethodName) {
                                            var datareturn = false;
                                            for (var j = 0; j < MyOPerationName.length; j++) {

                                                if (MyOPerationName[j] === key) {
                                                    datareturn = true;
                                                }
                                            }

                                            // var index = contains.call(MyOPerationName, key); // true                                      
                                            if (datareturn == false) {
                                                MyOPerationName.push(key);
                                            }


                                        }

                                    }

                                }
                            }
                            var WSDL_Maindata = JSON.parse(data);
                            var WSDL_Services = WSDL_Maindata[0].services;
                            var WSDL_OPerations = WSDL_Maindata.children;
                            var myarray = [];
                            var jsonObj2 = [];
                            var myarray2 = [];
                            myarray.push(WSDL_Maindata[0].children);
                            for (var i = 0; i < myarray[0].length; i++) {

                                if (i == myarray[0].length - 1) {

                                    myarray2.push(myarray[0][i].ports);
                                }

                            }
                            var PathName;
                            for (key in myarray2[0]) {
                                PathName = myarray2[0][key].location;
                            }
                        }
                        var ParentLocationId;
                        //Services
                        for (var key in WSDL_Services) {
                            console.log(key);
                            ParentLocationId = key;

                        }
                        jsonObj2.push({
                            id: ParentLocationId,
                            text: ParentLocationId,
                            parent: '#',
                            icon: 'icon-folder ace-icon fa fa-folder'
                            //   icon: "" +
                            //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                        });
                        //Method
                        for (var i = 0; i < MyOPerationName.length; i++) {
                            jsonObj2.push({
                                id: MyOPerationName[i],
                                text: MyOPerationName[i],
                                parent: ParentLocationId,
                                // icon: "" +
                                //    "/Analytics/Images/OPC_Icons/locationicon1.png"
                                icon: "glyphicon glyphicon-flash"
                            });
                        }
                        $("#Service_Wsdl").show();
                        $("#WSDL_Tree").empty();
                        $("#WSDL_Tree").jstree("destroy");
                        $('#WSDL_Tree').bind('loaded.jstree', function (e, data) {
                            data.instance.open_all();
                        }).jstree({
                            'core': {
                                'data': jsonObj2,
                                'use_data': true,
                                "load_open": true
                            },
                            "sort": function (a, b) {
                                return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                            }
                        }).on('select_node.jstree', function (e, data) {
                            var loMainSelected = data;
                            var parents = loMainSelected.node.parents;

                            var seletednode = loMainSelected.node.id;
                            StartPageLoader();
                            $.ajax({
                                url: "../WSDL_MethodSelectFromUrl",
                                type: "POST",
                                contentType: 'application/json',
                                data: JSON.stringify({ seletednode: seletednode, parents: parents }),
                                success: function (response) {

                                    StopPageLoader();
                                    MYReturnResponcemethod = response.MethodName;

                                    MethodData = response.description;
                                    WSDL_Resp_Service = response.Service_Name_resp;
                                    MY_Wsdl_port = response.MyWSDL_Port[0];

                                    jsonObjrequset_tree_URl = [];
                                    WSDL_Method_Res = response.MethodName;
                                    jsonObjrequset_tree_URl.push({
                                        id: MYReturnResponcemethod,
                                        text: MYReturnResponcemethod,
                                        parent: '#',
                                        icon: 'icon-folder ace-icon fa fa-folder'
                                        //   icon: "" +
                                        //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                                    });
                                    jsonObjrequset_tree_URl.push({
                                        id: 'Body',
                                        text: 'Body',
                                        parent: MYReturnResponcemethod,
                                        icon: 'icon-folder ace-icon fa fa-folder'
                                        //   icon: "" +
                                        //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                                    });

                                    jsonObjrequset_tree_URl.push({
                                        id: "Input",
                                        text: "Input",
                                        parent: 'Body',
                                        icon: 'icon-folder ace-icon fa fa-folder'
                                    })


                                    var Method_Array = [];
                                    var Element_arry = [];
                                    for (var k = 0; k < MethodData.length; k++) {
                                        for (var z = 0; z < MethodData[k].elements.length; z++) {

                                            var count = Method_Array.indexOf(MethodData[k].elements[z].qname.name);

                                            if (parseInt(count) == -1) {
                                                Method_Array.push(MethodData[k].elements[z].qname.name);

                                                jsonObjrequset_tree_URl.push({
                                                    id: MethodData[k].elements[z].qname.name,
                                                    text: MethodData[k].elements[z].type.name + "_" + MethodData[z].elements[z].qname.name + "=" + "<span id='Span_" + MethodData[z].elements[z].qname.name + "'></span>",
                                                    parent: 'Input',
                                                    icon: "glyphicon glyphicon-flash"
                                                    //  "<i class='glyphicon glyphicon-leaf'></i>"
                                                })
                                            }
                                        }


                                    }
                                    $("#input_Wsdl").show();


                                    $("#WSDL_Tree_Response").jstree("destroy");

                                    $('#WSDL_Tree_Response').bind('loaded.jstree', function (e, data) {
                                        data.instance.open_all();

                                    }).jstree({
                                        'core': {
                                            'data': jsonObjrequset_tree_URl,
                                            'use_data': true,
                                            "load_open": true,

                                        },
                                        "sort": function (a, b) {
                                            return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                                        }
                                    }).on('select_node.jstree', function (e, data) {
                                        var loMainSelected = data;
                                        parents = loMainSelected.node.parents;
                                        seletednode = loMainSelected.node.id;

                                        seletedname = loMainSelected.node.text;

                                        if (seletednode == 'Input' || seletednode == 'Body') {
                                        }
                                        else {
                                            var res = seletedname.split('_');

                                            var Mysel_html = '<div class="row"><div class="col-xs-10 col-sm-4"><label>Value</label>';
                                            Mysel_html += '<input type="text" id="txt_value" placeholder="Value" tabindex="1" /></span>';
                                            Mysel_html += ' </div><div class="col-xs-10 col-sm-4"> <label>Type</label> <input type="text" id="txt_Type" placeholder="Type" tabindex="2" value="' + res[0] + '" disabled/> </div></div>';
                                            bootbox.prompt(WSDL_Method_Res, function (result) {
                                                if (result === null) {
                                                } else {
                                                    $("#Response_Wsdl").show();
                                                    MyTxt_Result = $("#txt_value").val();
                                                    Path_Url_Speration = "Url_table";
                                                    $("#Span_" + seletednode).empty();
                                                    $("#Span_" + seletednode).append(MyTxt_Result);

                                                    obj[seletednode] = MyTxt_Result;
                                                    myArray.push(obj);

                                                }
                                            });
                                            $(".bootbox ").css("display", "block");
                                            $(".btn-default").css("display", "none");
                                            $(".btn-primary").addClass("btn-sm");
                                            $(".btn-primary").text("Add")
                                            $(".bootbox-body").empty();
                                            $(".bootbox-body").append(Mysel_html);

                                        }
                                    });
                                }
                            });
                        });
                    }

                },
                error: function (jqXHR, exception) {
                    StopPageLoader();
                    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
                }
            });

        }
        else {
            StopPageLoader();
            fn_errorNotification("200", '', '', "Selecte WSDL file", "error_alert", "", "");
        }
    }
        /************************************************************************************End Online Url Functionality************************************************************************************/





        /************************************************************************************ Start Upload  Functionality************************************************************************************/

    else {
        StartPageLoader();
        $.ajax({
            type: 'POST',
            url: '../SaveWSDLfile',
            contentType: false,
            processData: false,
            cache: false,
            data: form_data,
            success: function (data) {
                if (data.isauthenticated == false) {
                    StopPageLoader();

                    //fn_session_expired_client();

                }
                else {

                    if (data == "Fail") {
                        fn_errorNotification("200", '', '', "Failed To Get Response", "error_alert", "", "");
                    }
                    else {
                        StopPageLoader();
                        $('#file_Upload').val('');
                        var jsonObj = [];
                        var WSDL_Maindata = JSON.parse(data);
                        var WSDL_Services = WSDL_Maindata[0].services;
                        var WSDL_OPerations = WSDL_Maindata[0].children[2].operations;
                        var myarray = [];
                        var myarray2 = [];
                        myarray.push(WSDL_Maindata[0].children);
                        for (var i = 0; i < myarray[0].length; i++) {
                            if (i == myarray[0].length - 1) {
                                myarray2.push(myarray[0][i].ports);
                            }

                        }
                        var PathName;

                        for (key in myarray2[0]) {

                            PathName = myarray2[0][key].location;

                        }

                        var ParentLocationId;

                        //Services
                        for (var key in WSDL_Services) {

                            ParentLocationId = key;

                        }

                        if (ParentLocationId == undefined || ParentLocationId == "undefined") {

                            //alert("welcome");

                            // $("#Service_Wsdl").hide();
                            fn_errorNotification("200", '', '', "Unable get Responce from WSDL file", "error_alert", "", "");

                        }

                        else {


                            //  alert(ParentLocationId)
                            jsonObj.push({
                                id: ParentLocationId,
                                text: ParentLocationId,
                                parent: '#',
                                icon: 'icon-folder ace-icon fa fa-folder'
                                //   icon: "" +
                                //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                            });

                            $("#Service_Wsdl").show();
                            //Method
                        }
                        for (var key in WSDL_OPerations) {
                            //console.log(key);
                            // alert(JSON.stringify(key));
                            jsonObj.push({
                                id: key,
                                text: key,
                                parent: ParentLocationId,
                                // icon: "" +
                                //    "/Analytics/Images/OPC_Icons/locationicon1.png"
                                icon: "glyphicon glyphicon-flash"
                            });

                        }



                        $("#WSDL_Tree").empty();
                        $("#WSDL_Tree").jstree("destroy");

                        $('#WSDL_Tree').bind('loaded.jstree', function (e, data) {
                            data.instance.open_all();
                        }).jstree({
                            'core': {
                                'data': jsonObj,
                                'use_data': true,
                                "load_open": true
                            },
                            "sort": function (a, b) {
                                return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;

                            }
                        }).on('select_node.jstree', function (e, data) {
                            $("#WSDL_Tree_Response").empty();

                            jsonObjrequset_tree = [];
                            // alert("welcome");
                            var loMainSelected = data;
                            var parents = loMainSelected.node.parents;

                            var seletednode = loMainSelected.node.id;


                            //alert(seletednode);
                            StartPageLoader();
                            $.ajax({
                                url: "../WSDL_MethodSelect",
                                type: "POST",
                                contentType: 'application/json',
                                data: JSON.stringify({ seletednode: seletednode, parents: parents }),
                                success: function (response) {
                                    StopPageLoader();
                                    var Myresponse = response;

                                    console.log("MMMMMMMMMMMMM" + JSON.stringify(response));
                                    var MyChildResponce = Myresponse.description;
                                    var MY_Wsdl_port = Myresponse.MyWSDL_Port[0];
                                    // var WSDL_description = response.description;
                                    var WSDL_Resp_Service = response.Service_Name_resp;
                                    //var WSDL_Method_Res = response.MethodName;
                                    // console.log("RRRRRR" + JSON.stringify(MyChildResponce));

                                    //  jsonObjrequset_tree = [];
                                    var WSDL_Method_Res = response.MethodName;
                                    jsonObjrequset_tree.push({
                                        id: WSDL_Method_Res,
                                        text: WSDL_Method_Res,
                                        parent: '#',
                                        icon: 'icon-folder  ace-icon fa fa-folder'
                                        //   icon: "" +
                                        //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                                    });
                                    jsonObjrequset_tree.push({
                                        id: 'Body',
                                        text: 'Body',
                                        parent: WSDL_Method_Res,
                                        icon: 'icon-folder  ace-icon fa fa-folder'
                                        //   icon: "" +
                                        //     "/Analytics/Images/OPC_Icons/locationicon1.png"
                                    });

                                    jsonObjrequset_tree.push({
                                        id: "Input",
                                        text: "Input",
                                        parent: 'Body',
                                        icon: 'icon-folder  ace-icon fa fa-folder'
                                    })

                                    //alert("Resppp" + JSON.stringify(response));
                                    MyChildResponce = MyChildResponce[0]["elements"];
                                    $.each(MyChildResponce, function (i, key) {

                                        var myKEyname = key.type.name + "_" + key.qname.name;
                                        if (key.hasOwnProperty('elements') && key.elements.length > 0) {
                                            jsonObjrequset_tree.push({
                                                id: key.qname.name,
                                                text: key.type.name + "_" + key.qname.name,
                                                parent: 'Input',
                                                icon: 'icon-folder  ace-icon fa fa-folder',
                                            })

                                            recursiveFunction(i, key["elements"][0], key.qname.name, WSDL_Method_Res, WSDL_Resp_Service, MY_Wsdl_port, myKEyname);
                                        }
                                        else {

                                            var Value = key;
                                            forpopup.push(Value.qname.name);
                                            jsonObjrequset_tree.push({
                                                id: Value.qname.name,
                                                text: Value.type.name + "_" + Value.qname.name + "=" + '<span id=Span_' + Value.qname.name + '></span>',
                                                parent: 'Input',
                                                icon: "glyphicon glyphicon-flash"
                                                // icon: "" +
                                                //    "/Analytics/Images/OPC_Icons/locationicon1.png"
                                            });


                                        }

                                    })





                                    $("#input_Wsdl").show();

                                    $("#WSDL_Tree_Response").empty();
                                    $("#WSDL_Tree_Response").jstree("destroy");

                                    $('#WSDL_Tree_Response').bind('loaded.jstree', function (e, data) {
                                        data.instance.open_all();

                                    }).jstree({
                                        'core': {
                                            'data': jsonObjrequset_tree,
                                            'use_data': true,
                                            "load_open": true,

                                        },
                                        "sort": function (a, b) {
                                            return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
                                        }
                                    }).on('select_node.jstree', function (e, data) {
                                        var loMainSelected = data;
                                        var parents = loMainSelected.node.parents;
                                        var seletednode = loMainSelected.node.id;
                                        var seletedname = loMainSelected.node.text;
                                        var a = forpopup.indexOf(seletednode);
                                        // alert(a);
                                        if (a > -1) {
                                            var res = seletedname.split('_');
                                            // alert(res[0]);
                                            var Mysel_html = '<div class="row"><div class="col-xs-10 col-sm-4"><label>Value</label>';
                                            Mysel_html += '<input type="text" id="txt_value" placeholder="Value" tabindex="1" /></span>';
                                            Mysel_html += ' </div><div class="col-xs-10 col-sm-4"> <label>Type</label> <input type="text" id="txt_Type" placeholder="Type" tabindex="2" value="' + res[0] + '" disabled/> </div></div>';
                                            bootbox.prompt(WSDL_Method_Res, function (result) {
                                                if (result === null) {


                                                } else {
                                                    var MyTxt_Result = $("#txt_value").val();
                                                    Path_Url_Speration = "frompath";
                                                    $("#Span_" + seletednode).empty();
                                                    $("#Span_" + seletednode).append(MyTxt_Result);
                                                    obj[seletednode] = MyTxt_Result;
                                                    myArray.push(obj);
                                                    // StartPageLoader();
                                                    //$.ajax({
                                                    //    url: '../Response_SOAP',
                                                    //    type: 'POST',
                                                    //    contentType: 'application/json',
                                                    //    data: JSON.stringify({ methodname: WSDL_Method_Res, serviceName: WSDL_Resp_Service, PortName: MY_Wsdl_port, requsetArg: res[1], SelectedVal: MyTxt_Result, PathName: PathName, ReqName2: myArray }),
                                                    //    success: function (response) {
                                                    //        var MyWSDL_Final_resp = response;
                                                    //        //alert(JSON.stringify(MyWSDL_Final_resp))
                                                    //        if (response == false || response == 'false') {

                                                    //            fn_errorNotification("200", '', '', "error occured at 'wsdl' is an undeclared prefix", "error_alert", "", "");
                                                    //            StopPageLoader();
                                                    //        }
                                                    //        else {

                                                    //            StopPageLoader();

                                                    //        }
                                                    //    }

                                                    //});
                                                }
                                            });
                                            $(".bootbox ").css("display", "block");
                                            $(".btn-default").css("display", "none");
                                            $(".btn-primary").addClass("btn-sm");
                                            $(".btn-primary").text("Add")
                                            $(".bootbox-body").empty();
                                            $(".bootbox-body").append(Mysel_html);
                                        }
                                        else { }

                                    });
                                }
                            });

                        });


                    }
                }
            },
            error: function (jqXHR, exception) {
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
                StopPageLoader();
            }
        });
    }
    /************************************************************************************Upload  Functionality************************************************************************************/
});


var ParentLocationId = 10;




/************************************************************************************ Start Invoke  Data************************************************************************************/
function fn_Invoke() {
    $("#Output_Wsdl").show();
    StartPageLoader();
    $.ajax({
        url: '../Response_SOAP_Url',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ methodname: WSDL_Method_Res, serviceName: WSDL_Resp_Service, PortName: MY_Wsdl_port, ReqName2: myArray, ReqName: seletednode, MyTxt_Result: MyTxt_Result, Path_Url_Speration: Path_Url_Speration }),
        success: function (response) {

            if (response.isauthenticated == false) {
                StopPageLoader();

                //fn_session_expired_client();

            }
            else {
                //alert(JSON.stringify(response));
                if (response == false || response == 'false') {
                    StopPageLoader();
                    fn_errorNotification("200", '', '', "Unable get Responce from WSDL file", "error_alert", "", "");
                    $("#Response_Wsdl").text("Result:" + "\t" + "Unable get Responce from WSDL file");
                }
                else if (response.statusCode == 500 || response.statusCode == "500") {
                    StopPageLoader();
                    fn_errorNotification("200", response.error, response.error, "error occured at Get Response", "error_alert", "", "");

                } else {
                    StopPageLoader();
                    var MyWSDL_Final_resp = response;


                    var MyKey;
                    for (key in MyWSDL_Final_resp) {
                        MyKey = key;
                    }

                    $("#Response_Wsdl").text("Result:" + "\t" + MyWSDL_Final_resp['' + MyKey + '']);

                }

            }
        },
        error: function (jqXHR, exception) {
            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            StopPageLoader();
        }
    });

}

/************************************************************************************End Invoke  Data************************************************************************************/

function recursiveFunction(key, val, parent, WSDL_Method_Res, WSDL_Resp_Service, MY_Wsdl_port, myKEyname) {
    var MYOWNARRAY = [];
    if (val instanceof Object) {
        $.each(val, function (key, value) {

            if (key == "elements" && val.hasOwnProperty('elements')) {
                //  alert(JSON.stringify(value));
                // console.log("MYNAME" + JSON.stringify(value));

                MYOWNARRAY.push(value)
            }



        });

        for (var i = 0; i < MYOWNARRAY[0].length; i++) {

            // alert(JSON.stringify(MYOWNARRAY[0][i].qname.name));
            jsonObjrequset_tree.push({
                id: MYOWNARRAY[0][i].qname.name,
                //  text: Value.type.name + "_" + Value.qname.name + "=" + '<span id=Span_' + Value.qname.name + '></span>',
                text: MYOWNARRAY[0][i].type.name + "_" + MYOWNARRAY[0][i].qname.name + "=" + '<span id=Span_' + MYOWNARRAY[0][i].qname.name + '></span>',
                parent: parent,
                icon: "glyphicon glyphicon-flash"
                // icon: "" +
                //    "/Analytics/Images/OPC_Icons/locationicon1.png"
            });


        }



        $("#WSDL_Tree_Response").jstree("destroy");

        $('#WSDL_Tree_Response').bind('loaded.jstree', function (e, data) {
            data.instance.open_all();
        }).jstree({
            'core': {
                'data': jsonObjrequset_tree,
                'use_data': true,
                "load_open": true
            },
            "sort": function (a, b) {
                return this.get_text(a).toLowerCase() > this.get_text(b).toLowerCase() ? 1 : -1;
            }
        }).on('select_node.jstree', function (e, data) {

            alert("welcome");
            var loMainSelected = data;
            var parents = loMainSelected.node.parents;
            var seletednode = loMainSelected.node.id;
            var seletedname = loMainSelected.node.text;

            var res = seletedname.split('_');
            //alert(res[0]);
            var Mysel_html = '<div class="row"><div class="col-xs-10 col-sm-4"><label>Value</label>';
            Mysel_html += '<input type="text" id="txt_value" placeholder="Value" tabindex="1" /></span>';
            Mysel_html += ' </div><div class="col-xs-10 col-sm-4"> <label>Type</label> <input type="text" id="txt_Type" placeholder="Type" tabindex="2" value="' + res[0] + '" disabled/> </div></div>';
            bootbox.prompt('Method', function (result) {
                if (result === null) {


                } else {
                    var MyTxt_Result = $("#txt_value").val();


                    $("#Span_" + seletednode).empty();
                    $("#Span_" + seletednode).append(MyTxt_Result);

                    obj[seletednode] = MyTxt_Result;
                    myArray.push(obj);

                    StartPageLoader();
                    //alert(myArray);
                    $.ajax({
                        url: '../Response_SOAP',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ methodname: WSDL_Method_Res, serviceName: WSDL_Resp_Service, PortName: MY_Wsdl_port, requsetArg: res[1], SelectedVal: MyTxt_Result }),
                        success: function (response) {
                            StopPageLoader();
                            var MyWSDL_Final_resp = response;
                            //  alert(JSON.stringify(MyWSDL_Final_resp));

                        },
                        error: function (jqXHR, exception) {
                            fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
                            StopPageLoader();
                        }
                    });
                }
            });
            $(".bootbox ").css("display", "block");
            $(".btn-default").css("display", "none");
            $(".btn-primary").addClass("btn-sm");
            $(".btn-primary").text("Add")
            $(".bootbox-body").empty();
            $(".bootbox-body").append(Mysel_html);
        });
    }
}
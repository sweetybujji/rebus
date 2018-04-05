$(".valid").hide();
$(".valid2").hide();
$(".valid3").hide();
var treejsonObj = [];
jQuery(function ($) {
    var sampleData = initiateDemoData();//see below

    $('#tree1').ace_tree(
                    {
                        dataSource: sampleData['dataSource1'],
                        multiSelect: true,
                        cacheItems: true,

                        //icon-folder blue ace-icon fa fa-folder
                        'open-icon': 'icon-folder blue ace-icon fa fa-folder-open',
                        'close-icon': 'icon-folder blue ace-icon fa fa-folder',
                        'itemSelect': true,
                        'folderSelect': false,
                        'selected-icon': 'icon-item blue fa fa-cloud',
                        'unselected-icon': ' icon-item blue fa fa-cloud',
                        loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
                    });

    var IP = "http://192.168.4.105:8086";
    $(document).ready(
                    function () {
                        //TreeCreate();
                        var IP = "http://192.168.4.105:8086";
                        //Socket();

                        function Socket() {
                            var socket = io('/');
                            //socket.on('welcome', function (data) {

                            //$(document).off('click', '#btnConsume').on(
                            //		'click',
                            //		'#btnConsume',
                            //		function (e) {
                            $(document).on('click', '#btnConsume', function (e) {
                                //socket.io.reconnect();

                                //   console.log('click');
                                //alert($("#CTName").val());
                                socket.emit('Topic', {
                                    color: $("#txtCName1")
                                            .val()
                                });
                                e.preventDefault();
                            });

                            socket.on('msgvalue', function (msg) {

                                //  console.log(color);
                                var msgdata = msg + '\n';
                                msgdata.replace(/'/g, "\"");
                                //alert(msgdata);
                                var markup2 = '';

                                markup2 += "<tr><td>" + leader
                                        + "</td><td>" + partition
                                        + "</td><td>" + msgdata
                                        + "</td></tr>";
                                $("#tbl4").append(markup2);

                                //$('body').css('background', color);
                            });
                        }

                        //$("#Test").hide();

                        $("#tbl4").DataTable({
                            "pagingType": "simple"
                        });
                        //$("#Test").empty();

                        $(".tree-label")
                                .click(
                                        function () {
                                            //alert("welcome");

                                            $("#Test").show();
                                            $("#img1").show();

                                            var f = " ";

                                            //f += '<div id="validation" class="panel panel-info">';
                                           // f += '<div class="panel-heading" style="background-color:#438eb9"><span style="color:white; font-size:15.4px;">iARMS Message Cluster Details</span><a onclick="manage();" style="cursor:pointer; margin-left:58%; color:white;"><img src="assets/images/manage.png" alt="Mountain View" style="width:4%;" title="Manage Cluster"></a></div>';
                                           // f += '<div class="panel-body">';
                                            f += "<div class='form-group'>";
                                            f += "<label>";
                                            f += "<label>" + "Cluster Name"
                                                    + "</label>";
                                            f += "</label>";
                                            f += "<input class='form-control' id='clustername' type='text' readonly>";
                                            f += "<div class='form-group'>";
                                            f += "<label>";
                                            f += "<label>" + "Host"
                                                    + "</label>";
                                            f += "</label>";

                                            f += "<input class='form-control' id='host' type='text' readonly>";
                                            f += "<div class='form-group'>";
                                            f += "<label>";
                                            f += "<label>" + "port"
                                                    + "</label>";
                                            f += "</label>";
                                            f += "<input class='form-control' id='port' type='text' readonly>";
                                            f += "<label>";
                                            f += "<label>" + "Version"
                                                    + "</label>";
                                            f += "</label>";
                                            f += "<input class='form-control' id='port' type='text' placeholder='1.0' readonly>";
                                            f += "<label>";
                                            f += "<label>" + "MAX In Sync"
                                                    + "</label>";
                                            f += "</label>";
                                            f += "<input class='form-control' id='sync' type='text' placeholder='1.0' readonly>";
                                          //  f += '</div></div>'

                                            // $("#Test").append(f);
                                            $("#new").empty();
                                            $("#new").append(f);
                                            $("#clustername").val(
                                                    'KafkaCluster');
                                            $("#host").val(
                                                    '192.168.4.182');
                                            $("#port").val('2181');
                                            $("#sync").val('3');

                                        });
                        $('#ddlver').chosen({
                            allow_single_deselect: true,
                            width:"90%"
                        });


                        $('#ddlver3').chosen({
                            allow_single_deselect: true,
                            width:"90%"
                        });
                        $('#ddlver4').chosen({
                            allow_single_deselect: true,
                            width:"90%"
                        });

                        //$(".tree-branch-children").one('click', function () {
                        $(".widget-main")
                                .find('.tree-branch-children')
                                .on(
                                        'click',
                                        'li',
                                        function () {
                                            //	$(".tree-item").click(function(){
                                            //alert("welcome");

                                            $("#Test").show();
                                            $("#img1").show();

                                            var type = $(this).find(
                                                    '.tree-label')
                                                    .html();
                                            if (type == "Topics") {
                                                $(".tree-item")
                                                        .removeClass(
                                                                "tree-selected");
                                                $("#new").empty();

                                                /* var CN = f3("CN");//alert(CN);
                                                var ZH = f3("ZH");
                                                var ZP = f3("ZP"); */
                                                var cf = " ";

                                                cf += "<div class='container col-sm-12' id='mydata'>";

                                                cf += "<ul class='nav nav-tabs padding-12 tab-color-blue background-blue'>";
                                                cf += " <li class='active'><a data-toggle='tab' data-target='#home'>Topics List</a></li><li><a data-toggle='tab' data-target='#menu1'>Create Topic</a></li><li><a data-toggle='tab' data-target='#menu2'>Consume</a></li></ul>";
                                                cf += "<div class='tab-content'><div id='home' class='tab-pane fade in active'></br><div class='table-header' style='margin-bottom:-3%;'>Results for List of Topics in Cluster<i class='ace-icon fa fa-refresh bigger-130' style='margin-left:62%; cursor:pointer;' onclick='fn_refresh();' title='Refresh'></i></div><div id='Empty'><table id='tbl2' class='table table-striped table-bordered table-hover dataTable no-footer'><thead><tr><th class='sorting'>S.No</th>&nbsp&nbsp<th>Topic Name</th><th class='sorting_disabled'></th></tr></thead><tbody id='tblbody'></tbody></table></div></div>";
                                                cf += '<div id="menu1" class="tab-pane fade"><div class="form-group"> <label for="inputsm"><b>Topic Name</b><i style="color: Red;">*</i></label><input class="form-control input-sm " id="txtCName" placeholder="Topic Name" type="text">  </div><div class="form-group"> <label for="inputsm"><b>Retention Hours</b><i style="color: Red;">*</i></label><input class="form-control input-sm " id="txthour" placeholder="168" type="text" readonly>  </div> <div class="form-group"> <label for="inputsm"><b>Message</b><i style="color: Red;">*</i></label><textarea class="form-control" id="txtmsg" placeholder="Enter Message"></textarea></div></div>';

                                                // cf += '<div id="menu1" class="tab-pane fade"><div class="form-group"> <label for="inputsm"><b>Topic Name</b><i style="color: Red;">*</i></label><input class="form-control input-sm " id="txtCName" placeholder="Topic Name" type="text">  </div><div class="form-group"> <label for="inputsm"><b>Retention Hours</b><i style="color: Red;">*</i></label><input class="form-control input-sm " id="txthour" placeholder="168" type="text" readonly>  </div> <div class="form-group"> <label for="inputsm"><b>Message</b><i style="color: Red;">*</i></label><textarea class="form-control" id="txtmsg" placeholder="Enter Message"></textarea>  </div><button class="btn btn-sm btn-success" id="btnCreate" onclick="Producer()"><i class="ace-icon fa fa-globe bigger-125"></i>Publish<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i></button>  </div>';




                                                //  cf += '<div id="menu2" class="tab-pane fade"><div class="form-group"> <label for="form-field-select-3"><b>List Of Topics</b></label><select  class="chosen-select form-control input-sm"  data-placeholder="Choose a Topic..." id="ddl1" style="width:100%;"></select>  </div><div class="table-header" style="margin-bottom:-3%;">Results for Consume of selected Topic</div><div class="form-group" style="display:none;"> <label for="inputsm"><b>Topic Name</b></label><input class="form-control input-sm " id="txtCName1" placeholder="Topic Name" type="text" disabled>  </div> <div class="form-group"> <table id="tbl4" class="table table-striped table-bordered table-hover dataTable no-footer"><thead><tr><th class="sorting">Leader</th>&nbsp&nbsp<th>Partition</th><th class="sorting">Messages</th></tr></thead><tbody id="tblbody2"></tbody></table> </div><button class="btn btn-sm btn-info" id="btnConsume">Consume</button>  </div>';
                                                //cf+='<div id="menu1" class="tab-pane fade"><div class="form-group"> <label for="inputsm"><b>Message</b></label><input class="form-control input-sm " id="txtCName" placeholder="Message" type="text">  </div>   </div>';
                                                // cf+="<div id='menu2' class='tab-pane fade'><h3>Menu 2</h3><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p></div>";

                                                cf += '<div id="menu2" class="tab-pane fade"><div class="form-group"> <label for="form-field-select-3"><b>List Of Topics</b></label><select  class="chosen-select form-control input-sm"  data-placeholder="Choose a Topic..." id="ddl1" style="width:100%;"></select>  </div><div class="table-header" style="margin-bottom:-3%;">Results for Consume of selected Topic</div><div class="form-group" style="display:none;"> <label for="inputsm"><b>Topic Name</b></label><input class="form-control input-sm " id="txtCName1" placeholder="Topic Name" type="text" disabled> </div><input class="form-control input-sm " id="txt_savedatabsetype"  type="text" style="display:none;"><div class="form-group"> <table id="tbl4" class="table table-striped table-bordered table-hover dataTable no-footer"><thead><tr><th class="sorting">Leader</th>&nbsp&nbsp<th>Partition</th><th class="sorting">Messages</th></tr></thead><tbody id="tblbody2"></tbody></table> </div></div>';
                                                cf += " </div></div>";

                                                $("#new").append(cf);
                                                $('#ddl1')
                                                        .chosen(
                                                                {
                                                                    allow_single_deselect: true,
                                                                    width: '100%'
                                                                });

                                                //	$("#ddl1").append();ddlver
                                                //$("#ddl1").trigger("chosen:updated");
                                                /* $("#clustername").val(
                                                        CN);
                                                $("#host").val(ZH);
                                                $("#port").val(ZP); */


                                                TopicList();
                                                DDL_TopicList();
                                                $("#tbl4").css('width',
                                                        '100%');

                                            } else {
                                                $(".tree-item")
                                                        .removeClass(
                                                                "tree-selected");
                                                $("#new").empty();
                                                $("#img1").show();

                                                /* var CN = f3("CN");//alert(CN);
                                                var ZH = f3("ZH");
                                                var ZP = f3("ZP");*/
                                                var cf1 = " ";

                                                cf1 += "<div class='container col-sm-12' id='mydata2'>";

                                                cf1 += "<ul class='nav nav-tabs padding-12 tab-color-blue background-blue'>";
                                                // cf+=" <li class='active'><a data-toggle='tab' href='#home'>Brokers List</a></li><li><a data-toggle='tab' href='#menu1'>Create Broker</a></li></ul>";
                                                cf1 += "<div class='table-header' style='margin-top:-1%;margin-left:-2%'>Results for List of Brokers in active</div><div id='Empty'><table id='tbl3' class='table table-striped table-bordered table-hover dataTable no-footer'><thead><tr><th class='sorting'>Id</th>&nbsp&nbsp<th>Host</th><th class='sorting'>Port</th><th class='sorting'>Active</th></tr></thead><tbody id='tblbody'></tbody></table></div>";

                                                cf1 += " </div></div>";
                                                $("#new").append(cf1);
                                                /* $("#clustername").val(
                                                        CN);
                                                $("#host").val(ZH);
                                                $("#port").val(ZP); */
                                                BrokerList();

                                            }

                                        });

                    });

    function f3(name) {
        var url = window.location.href;
        // alert(url);
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                .exec(url);
        //alert(results[1] || 0);
        return results[1] || 0;
    }

    function initiateDemoData() {

        var clusternames = TreeCreate();

        var tree;
        var cluster_str = "";
        for (var cs = 0; cs < clusternames.length; cs++) {
            cluster_str += "'" + clusternames[cs] + "' : { text:'"
                    + clusternames[cs] + "' ,type:'folder'" + "},";
        }
        var tree_data = eval('({' + cluster_str + '})');

        var children_str = "'children': {";
        children_str += "'Brokers': { text: 'Brokers', type: 'item' },";
        children_str += "'Tpoics': { text: 'Topics', type: 'item' }}";

        for (var ch = 0; ch < clusternames.length; ch++) {
            var clustername = clusternames[ch];
            tree_data[clustername]['additionalParameters'] = eval('({'
                    + children_str + '})');
        }

        var dataSource1 = function (options, callback) {
            var $data = null
            if (!("text" in options) && !("type" in options)) {
                $data = tree_data;//the root tree
                callback({
                    data: $data
                });
                return;
            } else if ("type" in options && options.type == "folder") {
                if ("additionalParameters" in options
                        && "children" in options.additionalParameters)
                    $data = options.additionalParameters.children || {};
                else
                    $data = {}//no data
            }

            if ($data != null)//this setTimeout is only for mimicking some random delay
                setTimeout(function () {
                    callback({
                        data: $data
                    });
                }, parseInt(Math.random() * 500) + 200);

            //we have used static data here
            //but you can retrieve your data dynamically from a server using ajax call
            //checkout examples/treeview.html and examples/treeview.js for more info
        }

        return {
            'dataSource1': dataSource1
        }
    }

});

var leader = '';
var partition = '';
function TopicList() {
    try {

        StartPageLoader();
        $.ajax({
            url: "../TopicList",
            //url: "http://192.168.4.105:8086/TopicList", 
            contentType: 'application/json',
            type: 'GET',
            //data:Cdata,
            success: function (data) {
                StopPageLoader();
                //alert(JSON.stringify(data));
                var i = '';
                var markup = '';
                for (var key in data) {
                    var data2 = key + '</br>';
                    var name = i++;

                    markup += "<tr><td>"
                            + name
                            + "</td><td>"
                            + data2
                            + "</td><td><a class='red' href='#'><i class='ace-icon fa fa-trash-o bigger-130'>"
                            + '' + "</i></a></td></tr>";

                }
                $("#tblbody").empty();
                $("#tbl2").append(markup);

                $("#tbl2").DataTable();

                var name = '';
                $.each(data, function (key, value) {
                    //alert(value);
                    name = JSON.stringify(value[0]);

                    if (name != undefined) {
                        var parsedData = JSON.parse(name);
                        leader = parsedData.leader;
                        partition = parsedData.partition;
                    }

                });

            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            }

        })
    } catch (e) {
        fn_errorNotification(e.message, e.message, "error occured at data getting from TopicList from kafka", "error_alert", "", "");
    }
}

function Producer() {
    //alert("welcome");
    var Topic = $("#txtCName").val();
    var message = $("#txtmsg").val();
    var Pdata = JSON.stringify({
        "Topic": Topic,
        "message": message
    });

    $.ajax({
        url: "../PData",
        //url: 'http://192.168.4.105:8086/PData', 
        contentType: 'application/json',
        type: 'post',
        data: Pdata,
        success: function (data) {
            var html = '';

            html += '<div class="alert alert-block alert-success"><button type="button" class="close" data-dismiss="alert"><i class="ace-icon fa fa-times"></i></button><p>';
            html += '<strong><i class="ace-icon fa fa-check"></i>Well done!</strong>You successfully read this important alert message.</p></div>';

            $("#new").append(html);
            $("#txtmsg").val('');

        }

    })

}

function BrokerList() {
    ReplicationSync();
}

function ReplicationSync() {
    try {
        StartPageLoader();
        $.ajax({
            url: "../Replication",
            //url: "http://192.168.4.105:8086/Replication", 
            contentType: 'application/json',
            type: 'GET',
            //data:Cdata,
            success: function (data) {
                StopPageLoader();
                var data2 = data;
                var html = '';
                $.each(data, function (key, value) {
                    var repdata = value['host'];
                    var repdata2 = value['nodeId'];
                    var repdata3 = value['port'];
                    //  alert(JSON.stringify(repdata));

                    html += "<tr><td>"
                            + repdata2
                            + "</td><td>"
                            + repdata
                            + "</td><td>"
                            + repdata3
                            + "</td><td><i class='fa fa-flag green bigger-130'></i></td></tr>";

                });

                $("#tbl3").append(html);

                $("#tbl3").DataTable({
                    destroy: true,
                    searching: false,
                    paging: true
                });
            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            }
        });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification(e.message, e.message, "error occured at data getting Rubus Application", "error_alert", "", "");
    }
}

function Refresh() {
    TopicList();
}

function Consumer() {

    try {


        var ClusterName = $("#CN").val();
        var Host = $("#CHost").val();
        var Port = $("#CPort").val();
        var Topic = $("#txtCName1").val();


        var Cdata = JSON.stringify({
            "ClusterName": ClusterName,
            "Host": Host,
            "Port": Port,
            "Topic": Topic
            //"message":message
        });


        StartPageLoader();
        $.ajax({
            url: "../CData",
            //url: "http://192.168.4.105:8086/CData", 
            contentType: 'application/json',
            type: 'post',
            data: Cdata,
            success: function (data) {
                StopPageLoader();
                var Final_Data = JSON.stringify(data);

            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            }

        });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification(e.message, e.message, "error occured at data getting Rubus Application", "error_alert", "", "");

    }
}

function DDL_TopicList() {
    try {


        StartPageLoader();
        $.ajax({
            url: "../TopicList",
            //url: "http://192.168.4.105:8086/TopicList", 
            contentType: 'application/json',
            type: 'GET',
            //data:Cdata,
            success: function (data) {
                StopPageLoader();
                //alert(JSON.stringify(data))
                var ddl_val = '<option value="">Select</option>'
                for (var key in data) {

                    ddl_val += "<option value='" + key + "'>" + key + "</option>";

                }
                $("#ddl1").append(ddl_val);
                $("#ddl1").trigger("chosen:updated");
            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            }

        });

        $("#ddl1").change(
                function () {
                    var selectedValue = $(this).val();
                    //alert(selectedValue);
                    $("#txtCName1").val($(this).find("option:selected").attr("value"))

                });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification(e.message, e.message, "error occured at data getting Rubus Application", "error_alert", "", "");

    }

}

function Ping2() {
    /*var html = '';
     html += '<div class="alert alert-block alert-success"><button type="button" class="close" data-dismiss="alert"><i class="ace-icon fa fa-times"></i></button><p>';
    html += '<strong><i class="ace-icon fa fa-check"></i>Well done!</strong>You Pinged</p></div>';
    $("#mydata").append(html);*/
    var Host1 = $("#txtHost").val()
    var Host2 = $("#txtHost").val()
    var Host3 = $("#txtHost").val()
    if (Host1 == "192.168.4.182") {
        alert("Active System");
    } else if (Host2 == "192.168.4.186") {
        alert("Active System");
    } else if (Host3 == "192.168.4.187") {
        alert("Active System");
    }

    else {

        alert("Not In active");
    }

}



function Create2() {

    try {


        var CName = $("#txtCName").val();
        var Host = $("#txtHost").val();
        var Port = $("#txtPort").val();

        if (CName == "null" || CName == "") {

            $(".valid").show();
            $(".valid").fadeOut(10000)

        }

        if (Host == "null" || Host == "") {

            //alert(CName)
            $(".valid2").show();
            $(".valid2").fadeOut(10000)
            //alert(Port);
        }
        if (Port == "null" || Port == "") {

            $(".valid3").show();
            $(".valid3").fadeOut(10000)
        }

        else if (!CName == "" || !Host == "" || !Port == "") {


            var KVersion = $("#ddlver option:selected").val();
            var Sync = $("#ddlver4 option:selected").val();
            //alert(Sync);

            var CasData = JSON.stringify({
                "ClusterName": CName,
                "Host": Host,
                "Port": Port,
                "KafkaVersion": KVersion,
                "Sync": Sync
            });
            StartPageLoader();
            $.ajax({
                url: "../Tree",
                //url : "http://192.168.4.105:8086/Tree",
                contentType: 'application/json',
                type: 'post',
                data: CasData,
                success: function (data) {
                    alert(JSON.stringify(data));
                    StopPageLoader();
                    //alert(JSON.stringify(data));

                },
                error: function (jqXHR, exception) {
                    StopPageLoader();
                    fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
                }

            });
        }

    } catch (e) {
        StopPageLoader();
        fn_errorNotification(e.message, e.message, "error occured at data getting Rubus Application", "error_alert", "", "");
    }
}

function Clear() {

    $("#txtCName").val('');
    $("#txtHost").val('');
    $("#txtPort").val('');
    $("#txtCName").val('');
    //$("#ddlver4").val('1');

}

$("#spin").fadeOut(1000);
var tree_data;

var IP = "http://192.168.4.105:8086";
//TreeCreate();
function TreeCreate() {
    try {


        //var IP="http://192.168.4.105:8086";
        //alert("Tree Create Function Entered");
        StartPageLoader();
        $.ajax({
            //url : "http://192.168.4.105:8086/CTree",
            url: "../KafkaNode_Tree",
            contentType: 'application/json',
            type: 'get',
            async: false,
            //data:CasData,
            success: function (data) {
                // alert(data);
                StopPageLoader();
                var mydata = data.rows;

                //alert(JSON.stringify(mydata.length));
                for (var i = 0; i < mydata.length; i++) {
                    mydata2 = JSON.stringify(mydata[i].clustername);
                    var mydata3 = eval(mydata2);
                    //alert(mydata3)
                    //alert(treejsonObj.push(mydata3));
                    treejsonObj.push(mydata3);
                    //alert(JSON.stringify(treejsonObj));

                }

            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting Rubus Application", "error_alert", "", "");
            }

        })
        //	alert("From :"+JSON.stringify(treejsonObj));
        return treejsonObj;

    } catch (e) {
        StopPageLoader();
        fn_errorNotification(e.message, e.message, "error occured at data getting Rubus Application", "error_alert", "", "");

    }
}

function ff() {
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
    $("#cover").hide();

    $(".col-xs-12").show();

}

function manage() {

    //	alert("welcome to manage");
    //var name = $("#host").data('node');  
    var name = $("#host").val();
    if (name !== null) {
        // window.location = 'Kafka-Connections.html?node=' + 192.168.4.105;
        window.location.href = "Kafka-Connections.html?node=" + name;
    } else {
        alert("error");
    }
}

function fn_refresh() {
    TopicList();
}
var mymessages = new Array();
var tbl_name = '';
$(document).on('click', '#btnConsume', function (e) {
    try {
        var selectedTopic = $("#txtCName1").val();
        //var Savedatabase = $("#txt_savedatabsetype").val();
        //alert(JSON.stringify(Savedatabase));
        tbl_name = selectedTopic;
        // alert(tbl_name);
        var socket = new WebSocket('ws://localhost:1337');
        socket.onopen = function () {
            socket.send("Kafka_" + selectedTopic);
        };

        socket.onmessage = function (message) {
            // alert(message.data);
            // $("#tblMqtt23").empty();
            var msg = message.data;

            // msg.replace(/'/g, '"');
            var mytopic_msg = msg.replace(/\'/g, "\"");
            //  mytopic_msg msg.replace(/'/g, '`');
            // alert(msg);

           
            mymessages.push(mytopic_msg);

            //Messages[Messages.length - 1];

            // var msgdata = msg + '\n';

            // alert(mymessages);
            var markup2 = '';

            markup2 += "<tr><td>" + leader
                    + "</td><td>" + partition
                    + "</td><td>" + JSON.stringify(mytopic_msg);
            + "</td></tr>";
            $("#tbl4").append(markup2);
            $("#tbl4").DataTable();


            //content.innerHTML += message.data + '<br />';
        };

        socket.onerror = function (error) {
            // console.log('WebSocket error: ' + error);
        };
    } catch (e) {
        fn_errorNotification(e.message, e.message, "error occured at data getting Consuming", "error_alert", "", "");
    }
});



//chk_Cassandra

//$('#chk_Cassandra').click(function () {

//    $("#chk_Cassandra").attr('checked', true);
//    //if ($(this).prop("checked") == true) {

//    //    alert("Checkbox is checked.");

//    //}

//    //else if ($(this).prop("checked") == false) {

//    //    alert("Checkbox is unchecked.");

//    //}

//});

$('#chk_Cassandra').click(function () {

    if ($(this).is(":checked")) {

        // alert("Checkbox is checked.");

        $("#chk_Cassandra").attr('checked', true);
        var Messages = mymessages;
        var tablename = tbl_name.toLowerCase();
        $("#txt_savedatabsetype").val('Checked');
        var Save_cassandra = JSON.stringify({ Messages: Messages, tablename: tablename });

        //  var array = [1, 2, 3, 4];
        var lastEl = Messages[Messages.length - 1];
        //alert(lastEl);

        $.ajax({
            url: './kafkaSaveIntoCassandra',
            type: "POST",
            contentType: 'application/json',
            data: Save_cassandra,
            success: function (response) {

                // alert(JSON.stringify(response));

                //  Mycassandradata();
                // setInterval(function () { Mycassandradata() }, 5000);
            }



        });
         //setInterval(Mycassandradata(), 10000);


    }

    else if ($(this).is(":not(:checked)")) {

        alert("Checkbox is unchecked.");
        $("#chk_Cassandra").attr('checked', false);
        $("#txt_savedatabsetype").val('');
    }

});

function Mycassandradata() {
    // alert("welcome");
    // var lastEl = mymessages[mymessages.length - 1];
    // alert(lastEl);
    // var MylatestMsg = JSON.stringify({ Messages: lastEl, tablename: tbl_name });

    var MylatestMsg = JSON.stringify({ Messages: mymessages, tablename: tbl_name });
    $.ajax({
        url: './kafkaSaveIntoCassandra',
        type: "POST",
        contentType: 'application/json',
        data: MylatestMsg,
        success: function (response) {

           // alert(JSON.stringify(response));
            mymessages = new Array();

        }



    });
}



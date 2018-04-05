var app = angular.module('specific', []);
app.factory('trendsFactory', function ($http) {
    return {
        getMeterslist: function (selectedsource) {
            alert(selectedsource);
            return $http.post('/TagBrowser/getMeterNames', { deviceName: selectedsource });
        }
    };
});

'use strict';
function trends($scope, trendsFactory, $http) {
    $scope.Sources = [
                { name: 'EM', type: 'EM' },
                { name: 'OPC', type: 'OPC' }
        ];
    $scope.meters = [];
    $scope.trendtype = "live";
    $scope.selectedtype = $scope.Sources[0].name;

    $scope.changesouce = function (selected, meter) {

        // meter.metertype = selected; $scope.selectedtype = selected;

    }
    var obj = []; var pobj = [];
    pobj.push({ parametername: "", seriesname: "SeriesName", newaxis: false });


    obj.push({
        metername: null,
        meterid: null,
        metertype: $scope.selectedtype,
        parameters: pobj
    });
    
    //data model
    $scope.meters = obj;


    //add layout
    $scope.addFields = function () {
        $scope.meters.push({ metername: null, meterid: null, metertype: $scope.selectedtype, parameters: [{ parametername: "", seriesname: "Series" + Math.floor((Math.random() * 346) + 1), newaxis: false}] });
    }

    //add parameters to layout
    $scope.addparameter = function (meter) {
        meter.parameters.push({ parametername: "", seriesname: "Series" + Math.floor((Math.random() * 346) + 1) ,newaxis:false});
        // $scope.parameter = null;
    }

    //change when tag will added
    $scope.changetag = function (tagmodel, meter) {
        meter.metername = tagmodel;
    }
    //change parameter value when addedd
    $scope.changeparameter = function (parameter, param) {
        // param.parametername = parameter;
    }

    //open popup window based on selection for tags
    $scope.fn_OpenMeterSelection = function (meter) {
        if (meter.metertype == "EM") {
            var var_ReturnValue = window.showModalDialog("../../ManualReading/MeterSelection", "resizable: yes", "dialogHeight:500px; dialogWidth:1300px");
            if (var_ReturnValue != null) {
                var array = var_ReturnValue.split('^');
                $scope.tagmodel = array[1];
                meter.metername = array[1];
                meter.meterid = array[0];
            }

        }
        else {
            var var_ReturnValue = window.showModalDialog("../../Tags/OpcTags", "resizable: yes", "dialogHeight:500px; dialogWidth:1300px");
            if (var_ReturnValue != null) {
                var array = var_ReturnValue.split('^');
                $scope.tagmodel = array[1];
                meter.metername = array[1];
                meter.meterid = array[0];
            }
        }
    }



    //open popup window based on selection for tags
    $scope.fn_OpenParameterSelection = function (param, meter) {
        var var_ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/TAG", "resizable: yes", "dialogHeight:500px; dialogWidth:600px");
        var array = var_ReturnValue.split('^');
        $scope.parameter = array[1];
        param.parametername = array[1];
        param.seriesname = array[0]+"(SEC)";
        $scope.seriesname = array[0]+"(SEC)";   
    }


    //open popup window based on selection for MW tags
    $scope.fn_OpenParameterSelection_mw = function (param, meter) {
        var var_ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/MWTAG", "resizable: yes", "dialogHeight:500px; dialogWidth:600px");
        var array = var_ReturnValue.split('^');
        $scope.parameter = array[1];
        param.parametername = array[1];
        param.seriesname = array[0] + "(MW)";
        $scope.seriesname = array[0] + "(MW)";
    }
    

    //open popup window based on selection for KW tags
    $scope.fn_OpenParameterSelection_kw = function (param, meter) {
        var var_ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/TAG", "resizable: yes", "dialogHeight:500px; dialogWidth:600px");
        var array = var_ReturnValue.split('^');
        $scope.parameter = array[1].split("/")[0];
        param.parametername = array[1].split("/")[0];
         param.seriesname = array[0]+"(KW)"; 
        $scope.seriesname = array[0]+"(KW)";
    }

    //open popup window based on selection for OPC tags
    $scope.fn_OpenParameterSelection_opc = function (param, meter) {
        var var_ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/TAG", "resizable: yes", "dialogHeight:500px; dialogWidth:600px");
        var array = var_ReturnValue.split('^');
        $scope.parameter = array[1].split("/")[1];
        param.parametername = array[1].split("/")[1];
        param.seriesname = array[0]+"(OPC)"; 
        $scope.seriesname = array[0]+"(OPC)";
    }

    //open popup window based on selection for OPC tags
    $scope.fn_OpenParameterSelection_CURRENT = function (param, meter) {
        var var_ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/CURRENTTAG", "resizable: yes", "dialogHeight:500px; dialogWidth:600px");
        var array = var_ReturnValue.split('^');
        $scope.parameter = array[1].split("/")[0].replace("$KW","$Ib");
        param.parametername = array[1].split("/")[0].replace("$KW","$Ib");
                param.seriesname = array[0] + "(CURRENT)";
        $scope.seriesname = array[0] + "(CURRENT)";
    }

    //view book marks
    $scope.fn_BookMarkAll = function () {
        var _ReturnValue = window.showModalDialog("../../Specific_Energy_Trends/ViewBookmarks", "resizable: yes", "dialogHeight:500px; dialogWidth:1200px");
        $scope.meters = JSON.parse(_ReturnValue)[0].series;
        $scope.fromdate = JSON.parse(_ReturnValue)[0].fromdate;
        $scope.todate = JSON.parse(_ReturnValue)[0].todate;
        $scope.trendtype = JSON.parse(_ReturnValue)[0].trendtype;
        if ($scope.trendtype == "date") {
           //daily trends
        }
        else {
            $scope.previewtrend();
        }
    }
    $scope.addbookmark = function () {
        $scope.trendsjson1 = [];
        $scope.trendsjson1.push({
            trendtype: $scope.trendtype,
            fromdate: $("#fromdate").val(),
            todate: $("#todate").val(),
            series: $scope.meters
        });
        $("#Trenddialog").dialog({
            height: 'auto',
            width: 'auto',
            resizable: false,
            position: ["center", "center"],
            minimize: '#toolbar',
            title: "Trend Properties"
        });
    }
    //remove meter from data model
    $scope.fn_Removemeter = function (index) {
        if ($scope.meters.length > 1) {
            $scope.meters.splice(index, 1);
        }
        else {
            alert("You Can Not Remove This Tag.. At Least One Tag should be Required to Compare Trends");
        }
    }

    //remove parameters

    $scope.removeparameter = function (meter, param, index) {

        if (meter.parameters.length > 1) {
            meter.parameters.splice(index, 1);
        }
        else {
            alert("You Can Not Remove This Parameter.. At Least One parameter should be Required to Compare Trends");
        }
    }

    $scope.fromdate = null;
    $scope.todate = null;
    //calling service
    $scope.previewtrend = function () {


        $scope.trendsjson = [];
        $scope.trendsjson.push({
            trendtype: $scope.trendtype,
            fromdate: $("#fromdate").val(),
            todate: $("#todate").val(),
            series: $scope.meters
        });
        $http.post("/Specific_Energy_Trends/GetTreand", { trendjson: angular.toJson($scope.trendsjson) }).success(function (responseData) {
            if ($scope.trendtype == "live") {
                $.colorbox({ href: '../../Specific_Energy_Trends/Live', iframe: true, width: '100%', height: '95%' });
            }
            else {

                if ($("#fromdate").val() == "" || $("#todate").val() == "") {
                    alert("please enter valid dates");
                }
                else {
                    $.colorbox({ href: '../../Specific_Energy_Trends/Compare_Trends', iframe: true, width: '100%', height: '95%' });
                }
            }
        }).error(function (responseData) {
            console.log("Error !" + responseData);
        });



    }
}
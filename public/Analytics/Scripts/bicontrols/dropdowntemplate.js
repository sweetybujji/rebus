//initializing backbone model
var Dropdwon = Backbone.Model.extend({
    initialize: function () {
    }
});
var Dropdwons = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    //Assigning variable to model
    model: Dropdwon,
    //model added function
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        //creating textbox template and appending
        var drpdwntamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%"><div id="' + model.get("id") + '" class="bi-dropdown"><span class="inputlabel" style="font-size: 14px;font-weight: bold;margin-right:10px;line-height: 150%;display: inline;float:left;"></span><select class="inputdropdown" style="width:' + model.get("style").width + ';float: left;height:25px;" onchange="setvariabledrp(this)"></select></div></div>'
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(drpdwntamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(drpdwntamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(drpdwntamplate);
            }
        }

        var element = $(document.getElementById(model.get("id"))).parent();
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") != "widget") {
                }
                $(".widget-drag-handle").remove();
                $(".selectedwidget").removeClass("selectedwidget");
                $(this).addClass("selectedwidget");
                $(this).append('<div class="widget-drag-handle"></div>');
                $("#settingsmenu").attr("data-controlid", model.get("id"));
                $("#settingsmenu").attr("data-controltype", model.get("controltype"));
                $("#deletewidget,#widgetsettings").removeAttr("disabled");
            });
            $(element).click();
            if (model.get("type") == "widget") {
            }
            else {
                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
            }
            $("#previewobject").parent().css({ "display": "table", "overflow": "auto" });
        }
        DropdownUpdate(model);
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {

        DropdownUpdate(model);
    },
    byName: function (name) {
        filtered = this.filter(function (Dropdwon) {
            return Dropdwon.get("name") === name;
        });
        return new Dropdwon(filtered);
    },
    byId: function (dropdown, id) {
        return dropdown.find(function (model) { return model.get('id') == id });
    }
});



//get parameter values set to the particular paramname
function setvariabledrp(obj) {
    var varlist = new Object(); var vname = $(obj).attr("data-linkvariable");

    if (vname != "SelectVariable") {
        varlist[vname] = $(obj).val();
        var paramval = { Varvalues: JSON.stringify(varlist) };              //store paramval to an array

        var promise = upadatvariables(paramval);
        promise.success(function (data) {
            //load all controls
            refresh();
        });
    }

}
//ajax call update param values into db
function upadatvariables(paramval) {
    return $.ajax({
        url: "../../CreateParameter/UpdateParamVal",
        async: false,
        data: paramval
    });
}
//Drop down class.
var dropdown = new Dropdwons();
//ajax call to get data from datasource
function GetDataAjax(params) {
    var Data_d = JSON.stringify(params);
    return $.ajax({
        url: "../../GetAllConnectionData/GET_DataForMathOperations",
        method: 'POST',
        async: false,
        contentType: "application/json",
        data: Data_d
    });
}
function DropdownUpdate(model) {
    var element = document.getElementById(model.get("id"));
    var values = []; var labels = [];
    var Drpdown_style = model.get("style"); var varproperties = model.get("variables");
    var temp = 0;
    //converting width% into pixels
    if ((Drpdown_style.controlwidth).indexOf("%") == -1) {
        temp = temp + parseInt(Drpdown_style.controlwidth);
    }
    else {
        temp = temp + (parseInt(Drpdown_style.controlwidth) * 7);
    }
    var options = "";
    $(element).find(".inputdropdown").css({ "height": Drpdown_style.controlheight, "width": temp });
    $(element).parent().css({ "width": "100%" });
    if (Drpdown_style.controllabel != "") {
        $(element).find(".inputlabel").html(Drpdown_style.controllabel + ":");

    }
    //set variablename and value to data attributes
    if (varproperties.variabletype == "cv") {
        if (varproperties.variablename.indexOf("ref") == -1) {
            $(element).find(".inputdropdown").attr("data-linkvariable", varproperties.variablename);
            $(element).find(".inputdropdown").attr("data-dbvalue", varproperties.dbvalue);
        }
    }
    else {
        $(element).find(".inputdropdown").attr("data-linkvariable", varproperties.variablename);
        $(element).find(".inputdropdown").attr("data-dbvalue", varproperties.paramvalue);
    }


    //data_column_labels
    var connectionid = model.get("data_column_labels").connectionid; var connectiontype = model.get("data_column_labels").connectiontype;
    var dsId = model.get("data_column_labels").DSId; var dsName = model.get("data_column_labels").DSName;
    var DSCnnCretedby = model.get("data_column_labels").DSCnnCretedby;
    var _data = new Object();
    var formula = model.get("data_column_labels").formula;

    _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    var slcSPgridobj = new Array(); slcSPgridobj.push(_data);

    var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };




    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //labels = JSON.parse(data.coldata);
                labels = (data.tabledata);
               
                var optionstr = "";
                $.each(labels, function (index, value) {
                    optionstr += '<option>' + value + '</option>';
                });
                //alert(optionstr);
                $(element).find(".inputdropdown").html(optionstr);
                if (varproperties.variablename != "") {
                    var varname = varproperties.variablename;
                    if (varname != "SelectVariable") {
                        $.ajax({
                            url: "../../CreateParameter/getParamVal",
                            method: 'GET',
                            async: false,
                            cache: false,
                            data: { varname: varname }
                        }).success(function (data) {
                            var defaultval = data.defaultval;
                            $(element).find(".inputdropdown").val(defaultval);

                        });
                    }
                }
            }
        });
    }
    //data_column_values
    connectionid = model.get("data_column_values").connectionid; connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    formula = model.get("data_column_values").formula;
    _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
    _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    slcSPgridobj = new Array(); slcSPgridobj.push(_data);
    params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };
    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //values = JSON.parse(data.coldata);
                values = (data.tabledata);
                //alert(labels);
                var optionstr = "";
                $.each(values, function (index, value) {
                    if (values.length == 0)
                        optionstr += '<option>' + value + '</option>';
                    else
                        optionstr += '<option value="' + values[index] + '">' + value + '</option>';
                });
                //alert(optionstr);
                $(element).find(".inputdropdown").html(optionstr);

                if (varproperties.variablename != "") {
                    var varname = varproperties.variablename;
                    if (varname != "SelectVariable") {
                        $.ajax({
                            url: "../../CreateParameter/getParamVal",
                            method: 'GET',
                            async: false,
                            cache: false,
                            data: { varname: varname }
                        }).success(function (data) {
                            var defaultval = data.defaultval;
                            $(element).find(".inputdropdown").val(defaultval);

                        });
                    }
                }
                else {
                }

            }
        });

    }
    //cloning updated properties
    $("#previewobject").empty(); $("#previewobject").parent().css({ "display": "table", "overflow": "auto" });
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
}
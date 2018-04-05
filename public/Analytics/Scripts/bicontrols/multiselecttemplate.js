//initializing backbone model
var Multiselect = Backbone.Model.extend({
    initialize: function () {
    }
});
var Multiselects = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    //Assigning variable to model
    model: Multiselect,
    //model added function
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        //creating textbox template and appending
        var drpdwntamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%"><div id="' + model.get("id") + '" class="bi-multiselect"><span class="inputlabel" style="font-size: 14px;font-weight: bold;margin-right:10px;line-height: 150%;display: inline;float:left;"></span><select class="inputmultidropdown" multiple="multiple" style="width:' + model.get("style").width + ';float: left;height:auto;" "></select></div></div>'
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
        MultiSelectUpdate(model);
        setvariabledrp(model.get("id"));
        $(element).find(".inputmultidropdown").trigger('change');
        //  onselect(model)
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        var element = document.getElementById(model.get("id"));
        MultiSelectUpdate(model);
        setvariabledrp(model.get("id"));
        //onselect(model)
        $(element).find(".inputmultidropdown").trigger('change');
    },
    byName: function (name) {
        filtered = this.filter(function (Multiselect) {
            return Multiselect.get("name") === name;
        });
        return new Multiselect(filtered);
    },
    byId: function (multiselect, id) {
        return multiselect.find(function (model) { return model.get('id') == id });
    }

});



//get parameter values set to the particular paramname
function setvariabledrp(obj) {
    var controlid = "#" + obj;
    var varlist = new Object(); var vname = $(controlid).find("select").attr("data-linkvariable")
    if (vname != "SelectVariable") {

        if (typeof $(controlid).find(".inputmultidropdown").children().html() != "undefined") {
            $(controlid).find(".inputmultidropdown").children().find("li input").change(function () {
                check();

            });

        }


    }

    function check() {
        var listCheck = [];
        $(controlid).find(".inputmultidropdown").children().find("li input[data-name='selectItem']:checked").each(function () {

            listCheck.push($(this).val());
        });
        varlist[vname] = listCheck;

        var paramval = { Varvalues: JSON.stringify(varlist) };
        var promise = upadatvariables(paramval);
        promise.success(function (data) {
            //load all controls
            refresh();
        });
    }


    //var varlist = new Object(); var vname = $(obj).attr("data-linkvariable");

    //if (vname != "SelectVariable") {

    //    varlist[vname] = $(obj).val();
    //    var paramval = { Varvalues: JSON.stringify(varlist) };              //store paramval to an array
    //    alert(JSON.stringify(varlist));
    //    var promise = upadatvariables(paramval);
    //    promise.success(function (data) {
    //        //load all controls
    //        refresh();
    //    });
    //}

}
//function onselect(model) {
//var element = document.getElementById(model.get("id"));
//alert($(element).find(".inputdropdown").html())

//$(element).find(".inputdropdown")
//    .change(function () {
//       // alert($(this).attr("data-linkvariable"));
//        if ($(this).is(":checked")) {
//            var temp = ($('#basic_example').serialize());
//            alert(temp);
//        }
//    });

//}
//ajax call update param values into db
function upadatvariables(paramval) {
    return $.ajax({
        url: "../../CreateParameter/UpdateParamVal",
        async: false,
        data: paramval
    });
}
//Drop down class.
var multiselect = new Multiselects();
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
function MultiSelectUpdate(model) {
    var element = document.getElementById(model.get("id"));
    var values = []; var labels = [];
    var Drpdown_style = model.get("style"); var varproperties = model.get("variables");
    var temp = 0;
    //converting width% into pixels

    // $(element).find(".inputdropdown").multipleSelect();
    if ((Drpdown_style.controlwidth).indexOf("%") == -1) {
        temp = temp + parseInt(Drpdown_style.controlwidth);
    }
    else {
        temp = temp + (parseInt(Drpdown_style.controlwidth) * 7);
    }
    var options = "";
    $(element).find(".inputmultidropdown").css({ "height": "auto", "width": temp });
    $(element).parent().css({ "width": "100%" });
    if (Drpdown_style.controllabel != "") {
        $(element).find(".inputlabel").html(Drpdown_style.controllabel + ":");

    }
    //set variablename and value to data attributes
    if (varproperties.variabletype == "cv") {
        if (varproperties.variablename.indexOf("ref") == -1) {
            $(element).find(".inputmultidropdown").attr("data-linkvariable", varproperties.variablename);
            $(element).find(".inputmultidropdown").attr("data-dbvalue", varproperties.dbvalue);
        }
    }
    else {
        $(element).find(".inputmultidropdown").attr("data-linkvariable", varproperties.variablename);
        $(element).find(".inputmultidropdown").attr("data-dbvalue", varproperties.paramvalue);
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

                $(element).find(".inputmultidropdown").html(optionstr);
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
                            $(element).find(".inputmultidropdown").val(defaultval);

                        });
                    }
                }
                // $(element).find(".inputmultidropdown").multipleSelect();
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
                values = (data.tabledata);
                //values = JSON.parse(data.coldata);
                var optionstr = "";
                $.each(values, function (index, value) {
                    if (values.length == 0)
                        optionstr += '<option>' + value + '</option>';
                    else
                        optionstr += '<option value="' + values[index] + '">' + value + '</option>';
                });
                $(element).find(".inputmultidropdown").html(optionstr);

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
                            $(element).find(".inputmultidropdown").val(defaultval);

                        });
                    }
                }
                else {
                }
                $(element).find(".inputmultidropdown").multipleSelect();
            }
        });

    }
    //cloning updated properties
    $("#previewobject").empty(); $("#previewobject").parent().css({ "display": "table", "overflow": "auto" });
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
}
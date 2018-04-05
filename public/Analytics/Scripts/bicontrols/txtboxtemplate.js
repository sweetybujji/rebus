//initializing backbone model
var Textbox = Backbone.Model.extend({
    initialize: function () {
    }
});
var Textboxs = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    //Assigning variable to model
    model: Textbox,
    //model added function
    onModelAdded: function (model, collection, options) {
        //creating textbox template and appending
        var txtboxtamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%;"><input class="bi-textbox" type="text" id="' + model.get("id") + '" style="height:25px;z-index:5555;float:left;' + model.get("primary_style").width + ';"></input></div>'
        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(txtboxtamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(txtboxtamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(txtboxtamplate);
            }
        }

        var element = $(document.getElementById(model.get("id"))).parent();
        var $txtelement = $(document.getElementById(model.get("id")));
        //adding search control after textbox
        $('<a onclick="setvariable()" style="float:left;">search</a>').insertAfter($txtelement);
        //label before textbox
        $('<label style="margin-top:5px;float:left;line-height:16px;font-weight:bold" class="txtlabel">' + model.get("primary_style").controllabel + '</label>').insertBefore($txtelement);
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") == "widget") {
                    $(".widget-body").sortable("option", "disabled", false);
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
        textboxUpdate(model);
    },
    onModelRemoved: function (model, collection, options) {
        console.log("options = ", options);

    },
    onModelUpdate: function (model, collection, options) {

        textboxUpdate(model);
    },
    byId: function (textbox, id) {
        return textbox.find(function (model) { return model.get('id') == id });
    }

});
//get parameter values set to the particular paramname
function setvariable() {
    var varlist = new Object();
    $(".bi-widget-item").find(".bi-textbox").each(function () {
        var vname = $(this).attr("data-linkvariable");
        if (vname != "") {
            varlist[vname] = $(this).val();             //store paramval to an array
        }
    });

    var paramval = { Varvalues: JSON.stringify(varlist) };
    var promise = upadatvariables(paramval);
    promise.success(function (data) {
        //load all contols
        refresh();
    });

}
//hide popup
function inputclose() {
    var element = angular.element('#Inputmodal');
    element.modal('hide');
}
//Textbox class.
var textbox = new Textboxs();
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
//ajax call update param values into db
function upadatvariables(paramval) {
    return $.ajax({
        url: "../../CreateParameter/UpdateParamVal",
        async: false,
        data: paramval
    });
}
function textboxUpdate(model) {
    var element = document.getElementById(model.get("id"));

    var values = []; var tbprimary_style = [];

    var connectionid = model.get("data_column_values").connectionid; var connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    var _data = new Object();
    var formula = model.get("data_column_values").formula;
    _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    var slcSPgridobj = new Array(); slcSPgridobj.push(_data);

    var params = {
        Get_SPGriddtail: JSON.stringify(slcSPgridobj)
    };
    tbprimary_style = model.get("primary_style");
    $(element).parent().find(".txtlabel").text(model.get("primary_style").controllabel);
    var htempfont = 0; var htemplineheight = 0;
    //formula is not empty



    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {

                //values = JSON.parse(data.coldata);
                values = (data.tabledata);

                $("#tbdfval").val(values);
                //set variablename and value to data attributes
                if (tbprimary_style.variabletype == "cv") {
                    if (tbprimary_style.variablename.indexOf("ref") == -1) {
                        $(element).attr("data-linkvariable", tbprimary_style.variablename);
                        $(element).attr("data-dbvalue", tbprimary_style.dbvalue);

                        $(element).val(tbprimary_style.dbvalue);
                    }
                }
                else {
                    $(element).attr("data-linkvariable", tbprimary_style.variablename);
                    $(element).attr("data-dbvalue", tbprimary_style.paramvalue);

                    $(element).val(tbprimary_style.paramvalue);
                }
                $(element).val(values);
                //adding css properties
                if (tbprimary_style.FontSize == "Small") {
                    htempfont = 0.9;
                    htemplineheight = 140;
                }
                else {
                    htempfont = 1.9;
                    htemplineheight = 121;
                }


                $(element).css({ "height": tbprimary_style.height + "px ", "FormatAs": tbprimary_style.FormatAs, "width": tbprimary_style.width + "px ", "text-align": tbprimary_style.allignment, "font-size": htempfont + "em", "line-height": htemplineheight, "font-weight": tbprimary_style.Fontweight, "font-style": tbprimary_style.Fontstyle, "font-family": tbprimary_style.FontFamily, "text-decoration": tbprimary_style.TextDecoration, "color": tbprimary_style.Fontcolor });
                $(element).parent().css({ "width": "100%" });
                //textbox validations
                if (tbprimary_style.FormatAs == "Date") {
                    $(element).datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                }
                else if (tbprimary_style.FormatAs == "Text") {
                    $(element).datepicker("destroy");
                    //$(element).datepicker("remove");

                    $(element).unbind();
                }
                else if (tbprimary_style.FormatAs == "Number") {
                    $(element).keypress(function (e) {

                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

                            return false;
                        }
                    });
                }
                //get paramvalue from db and bind to textbox
                if (tbprimary_style.variablename != "") {
                    var varname = tbprimary_style.variablename;
                    if (varname != "SelectVariable") {
                        $.ajax({
                            url: "../../CreateParameter/getParamVal",
                            method: 'GET',
                            async: false,
                            cache: false,
                            data: { varname: varname }
                        }).success(function (data) {
                            var defaultval = data.defaultval;
                            if (defaultval == "") {
                            }
                            else {

                                $(element).val(defaultval);
                            }
                        });
                    }
                }
            }
        });
    }
    else {
        tbprimary_style = model.get("primary_style");
        $(element).attr("placeholder", tbprimary_style.placeholder);
        $(element).val(tbprimary_style.value);
        //set variablename and value to data attributes
        if (tbprimary_style.variabletype == "cv") {
            if (tbprimary_style.variablename.indexOf("ref") == -1) {
                $(element).attr("data-linkvariable", tbprimary_style.variablename);
                $(element).attr("data-dbvalue", tbprimary_style.dbvalue);
                $(element).val(tbprimary_style.dbvalue);
            }
        }
        else {
            $(element).attr("data-linkvariable", tbprimary_style.variablename);
            $(element).attr("data-dbvalue", tbprimary_style.paramvalue);

            $(element).val(tbprimary_style.paramvalue);
        }
        //adding css properties
        if (tbprimary_style.FontSize == "Small") {
            htempfont = 0.9;
            htemplineheight = 140;
        }
        else {
            htempfont = 1.9;
            htemplineheight = 121;
        }


        $(element).css({ "height": tbprimary_style.height + "px ", "FormatAs": tbprimary_style.FormatAs, "width": tbprimary_style.width + "px ", "text-align": tbprimary_style.allignment, "font-size": htempfont + "em", "line-height": htemplineheight, "font-weight": tbprimary_style.Fontweight, "font-style": tbprimary_style.Fontstyle, "font-family": tbprimary_style.FontFamily, "text-decoration": tbprimary_style.TextDecoration, "color": tbprimary_style.Fontcolor });
        //textbox validation properties

        //alert(tbprimary_style.FormatAs);

        if (tbprimary_style.FormatAs == "Date") {
            $(element).datepicker({
                changeMonth: true,
                changeYear: true,
                onSelect: function (datetext) {
                    var d = new Date();
                    //datetext = datetext + " " + d.getHours() + ": " + d.getMinutes();
                    //datetext = datetext;
                    $(element).val(datetext);
                }
            });
            $(element).datepicker("option", "dateFormat", tbprimary_style.DateFormat);

        }
        else if (tbprimary_style.FormatAs == "Text") {
            $(element).datepicker("destroy");
            $(element).unbind();
        }
        else if (tbprimary_style.FormatAs == "Number") {
            $(element).keypress(function (e) {

                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

                    return false;
                }
            });
        }
        //get paramvalue from db and bind to textbox
        if (tbprimary_style.variablename != "") {
            var varname = tbprimary_style.variablename;
            if (varname != "SelectVariable") {
                $.ajax({
                    url: "../../CreateParameter/getParamVal",
                    method: 'GET',
                    async: false,
                    cache: false,
                    data: { varname: varname }
                }).success(function (data) {
                    var defaultval = data.defaultval;
                    if (defaultval == "") {
                    }
                    else {

                        $(element).val(defaultval);
                    }
                });
            }
        }
    }
    //cloning updated properties`
    $("#previewobject").empty(); $("#previewobject").parent().css({ "display": "table", "overflow": "auto" });
    $(element).parent().clone(true).removeAttr('id').removeClass("bi-widget-item").appendTo($("#previewobject"));
    $("#previewobject").find(".widget-drag-handle").remove();
    $("#previewobject").find(".selectedwidget").removeClass("selectedwidget");


}
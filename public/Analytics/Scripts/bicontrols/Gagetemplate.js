var Gagtag = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {
    }
});
var g;
var Gagtags = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: Gagtag,
    onModelAdded: function (model, collection, options) {

        var target = model.get("target");
        var $targetref;
        var htmltemplate = '<div class="bi-widget-item" style="margin-bottom: 10px; width: 100%"><div id="' + model.get("id") + '"  style="white-space: normal;font-weight:bold;font-size:medium;" class="bi-Gagetemplate"></div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var textobj = document.getElementById(target.split("@")[0]);
                $targetref = $(textobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(htmltemplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(htmltemplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(htmltemplate);
                
            }
        }



        var element = $(document.getElementById(model.get("id"))).parent();
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") != "widget") {
                    $targetref.click();
                    tdclick(target.split("@")[0]);
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
                $targetref.sortable({
                    placeholder: 'sortable-placeholder',
                    start: function (event, ui) {
                        ui.placeholder.html(ui.item.html());
                    }
                });
                //updatewidgetheight($(document.getElementById(target)));
            }
            else {
                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
            }
        }
        modelupdate2(model);

    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        Updategage(model);
    },
    byName: function (name) {
        filtered = this.filter(function (Gagtag) {
            return Gagtag.get("name") === name;
        });
        return new Gagtag(filtered);
    },
    byId: function (Gagtag, id) {
        return Gagtag.find(function (model) { return model.get('id') == id });
    }
});
var Gagetag = new Gagtags();
function modelupdate2(model) {
    createGage(model);
}

//Drop down class.

function createGage(model) {
    var element = document.getElementById(model.get("id"));
    var values = []; var textprimary_style = []; var val = ''; var finalval = [];
    var Gage_style = model.get("style");
    var target = model.get("target");
    var $targetref;
    if (model.get("type") != "widget") {
        if (target != null) {
            var textobj = document.getElementById(target.split("@")[0]);
            $targetref = $(textobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
        }
    }
    else {
        $targetref = $(document.getElementById(target)).find('.widget-body');
    }

    // $(element).css({ "background": Gage_style.BackgroundColor, "border": Gage_style.BorderWidth + "px " + Gage_style.BorderStyle + " " + Gage_style.BorderColor });
    connectionid = model.get("data_column_values").connectionid;
    connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;

    formula = model.get("data_column_values").formula;

    _data = new Object();
    _data.ConnectionID = connectionid;
    _data.DSConnType = connectiontype;
    _data.DSId = dsId;
    _data.DSName = dsName;
    _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    slcSPgridobj = new Array();
    slcSPgridobj.push(_data);
    

   var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };
    //  textprimary_style = model.get("primary_style");  
    if (formula != "undefined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //values = JSON.parse(data.coldata);
                values = (data.tabledata);
                Gage_style.value = values;

            }
        });
    }
    var targetvalue = parseInt(model.get("style").value);
    var Changedcolor=[];
    Changedcolor = model.get("customSectors").colors;
    var id = model.get("id");
    var min = model.get("style").min;
    var max = model.get("style").max;
    var title = model.get("style").title;
    var Footertext = model.get("style").FooterText;
    g = new JustGage({
        id: id,
        value: targetvalue,
        min: min,
        max: max,
        title: title,
        titleFontColor: model.get("style").Headercolor,
        customSectors: Changedcolor,
        label: Footertext,
        labelFontColor: model.get("style").Footercolor,
        gaugeWidthScale: model.get("style").Width
        
    });

    $("#previewobject").empty();
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
}
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
function Updategage(model) {
    var element = document.getElementById(model.get("id"));
    var values = []; var textprimary_style = []; var val = ''; var finalval = [];
    var Gage_style = model.get("style");
    var target = model.get("target");
    var $targetref;
    if (model.get("type") != "widget") {
        if (target != null) {
            var textobj = document.getElementById(target.split("@")[0]);
            $targetref = $(textobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
        }
    }
    else {
        $targetref = $(document.getElementById(target)).find('.widget-body');
    }

    // $(element).css({ "background": Gage_style.BackgroundColor, "border": Gage_style.BorderWidth + "px " + Gage_style.BorderStyle + " " + Gage_style.BorderColor });
   
    
    // g.refresh(parseInt(Gage_style.value), parseInt(model.get("style").max));
    
    var id = model.get("id");
    var min = model.get("style").min;
    var max = model.get("style").max;
    var title = model.get("style").title;
    var colors = model.get("customSectors").colors;
    var value = model.get("style").value;
    var Footertext = model.get("style").FooterText;
   
    $('#' + id).empty();
    g="";
    g  = new JustGage({
        id: id,
        value: value,
        min:parseInt(min),
        max: parseInt(max),
        title: title,
        titleFontColor: model.get("style").Headercolor,
        customSectors: colors,
        label: Footertext,
        labelFontColor: model.get("style").Footercolor,
        gaugeWidthScale: model.get("style").Width

    });

    $("#previewobject").empty();
    // $("#").clone(true).removeAttr('id').appendTo($("#previewobject"));
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
    //  textprimary_style = model.get("primary_style");

    //data_column_values
    connectionid = model.get("data_column_values").connectionid;
    connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    formula = model.get("data_column_values").formula;

    _data = new Object();
    _data.ConnectionID = connectionid;
    _data.DSConnType = connectiontype;
    _data.DSId = dsId;
    _data.DSName = dsName;
    _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    slcSPgridobj = new Array();
    slcSPgridobj.push(_data);
           
   var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };
    if (formula != "undefined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //values = JSON.parse(data.coldata);
                values = (data.tabledata);
                Gage_style.value = values;
                var targetvalue = parseInt(model.get("style").value);
               
               // g.refresh(parseInt(model.get("style").value));
                var id = g.config.id;
                $('#' + id).empty();               
                // g.refresh(parseInt(Gage_style.value), parseInt(model.get("style").max));
                g = "";
                var Footertext = model.get("style").FooterText;
                g = new JustGage({
                    id: model.get("id"),
                    value: model.get("style").value,
                    min: parseInt(model.get("style").min),
                    max: parseInt(model.get("style").max),
                    title: model.get("style").title,
                    titleFontColor: model.get("style").Headercolor,
                    customSectors: model.get("customSectors").colors,
                    label: Footertext,
                    labelFontColor: model.get("style").Footercolor,
                    gaugeWidthScale: model.get("style").Width

                });
                $("#previewobject").empty();
                // $("#").clone(true).removeAttr('id').appendTo($("#previewobject"));
                $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
               

            }
        });
    }
    
}
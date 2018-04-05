var MeterGaugetag = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {
    }
});
var MeterGaugeobj;
var MeterGaugetags = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: MeterGaugetag,
    onModelAdded: function (model, collection, options) {

        var target = model.get("target");
        var $targetref;
        var htmltemplate = '<div class="bi-widget-item" style="margin-bottom: 10px; width: 100%;text-align: center;"><canvas id="' + model.get("id") + '"  style="white-space: normal;font-weight:bold;font-size:medium;" class="bi-MeterGagetemplate"></canvas></div>';
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
        MeterGaugemodelupdate(model);

    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
        UpdateMetergage(model);
    },
    byName: function (name) {
        filtered = this.filter(function (htmltag) {
            return htmltag.get("name") === name;
        });
        return new htmltag(filtered);
    },
    byId: function (htmltag, id) {
        return htmltag.find(function (model) { return model.get('id') == id });
    }
});
var metergauge = new MeterGaugetags();
function MeterGaugemodelupdate(model) {
    createMeterGauge(model);
}

//Drop down class.

function createMeterGauge(model) {
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
    var Changedcolor = [];
    Changedcolor = model.get("customSectors").colors;
    var id = model.get("id");
    var min = model.get("style").min;
    var max = model.get("style").max;
    //var title = model.get("style").title;
    //var Footertext = model.get("style").FooterText;
    MeterGaugeobj = new Gauge({
        renderTo: id,
        width: model.get("style").Width,
        height: model.get("style").height,
        glow: true,
        units: model.get("style").units,
        title: model.get("style").title,
        minValue: parseInt(min),
        maxValue: parseInt(max),
        majorTicks: model.get("majorTicks").Ticks,
        minorTicks: 2,
        strokeTicks: false,
        highlights: Changedcolor,
        colors: {
            plate: model.get("needle").plateColor,
            majorTicks: model.get("needle").majorTicks,
            minorTicks: model.get("needle").minorTicks,
            title: model.get("style").Headercolor,
            units: model.get("needle").units,
            numbers: model.get("needle").numbers,
            needle: { start: model.get("needle").startcolor, end: model.get("needle").endcolor }
        }
    });

    MeterGaugeobj.setValue(targetvalue);

    MeterGaugeobj.draw();

    //var newCanvas = document.createElement('canvas');
    //var context = newCanvas.getContext('2d');

    ////set dimensions
    //newCanvas.width = model.get("style").Width;
    //newCanvas.height = model.get("style").height;
    //newCanvas.id = id + "@";

    ////apply the old canvas to the new one
    //context.drawImage(element, 0, 0);
    //$("#previewobject").empty();
    //$("#previewobject").append(newCanvas);


    //var MeterGaugeobj12 = new Gauge({
    //    renderTo: id + "@",
    //    width: model.get("style").Width,
    //    height: model.get("style").height,
    //    glow: true,
    //    units: model.get("style").units,
    //    title: model.get("style").title,
    //    minValue: parseInt(min),
    //    maxValue: parseInt(max),
    //    majorTicks: model.get("majorTicks").Ticks,
    //    minorTicks: 2,
    //    strokeTicks: false,
    //    highlights: Changedcolor,
    //    colors: {
    //        plate: model.get("needle").plateColor,
    //        majorTicks: model.get("needle").majorTicks,
    //        minorTicks: model.get("needle").minorTicks,
    //        title: model.get("style").Headercolor,
    //        units: model.get("needle").units,
    //        numbers: model.get("needle").numbers,
    //        needle: { start: model.get("needle").startcolor, end: model.get("needle").endcolor }
    //    }
    //});
    ////alert(model.get("style").value);
    ////alert(targetvalue);
    //MeterGaugeobj12.setValue(targetvalue);
    //MeterGaugeobj12.draw();
    //  $("#previewobject").empty();
    //  $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));    
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
function UpdateMetergage(model) {
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


    var id = model.get("id");
    var min = model.get("style").min;
    var max = model.get("style").max;
    var title = model.get("style").title;
    var colors = model.get("customSectors").colors;
    var value = model.get("style").value;
    var Footertext = model.get("style").FooterText;


    //  textprimary_style = model.get("primary_style");

    //data_column_values
    var connectionid = model.get("data_column_values").connectionid; var connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    var formula = model.get("data_column_values").formula;
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
                value = values;
                Gage_style.value = values;
                var targetvalue = parseInt(model.get("style").value);
            }
        });
    }


    $('#' + id).empty();
    MeterGaugeobj = "";
    MeterGaugeobj = new Gauge({
        renderTo: id,
        width: model.get("style").Width,
        height: model.get("style").height,
        glow: true,
        units: model.get("style").units,
        title: model.get("style").title,
        minValue: parseInt(min),
        maxValue: parseInt(max),
        majorTicks: model.get("majorTicks").Ticks,
        minorTicks: 2,
        strokeTicks: false,
        highlights: model.get("customSectors").colors,
        colors: {
            plate: model.get("needle").plateColor,
            majorTicks: model.get("needle").majorTicks,
            minorTicks: model.get("needle").minorTicks,
            title: model.get("style").Headercolor,
            units: model.get("needle").units,
            numbers: model.get("needle").numbers,
            needle: { start: model.get("needle").startcolor, end: model.get("needle").endcolor }
        }
    });
 
    MeterGaugeobj.setValue(parseInt(model.get("style").value));

    MeterGaugeobj.draw();


    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = model.get("style").Width;
    newCanvas.height = model.get("style").height;
    newCanvas.id = id + "@";

    //apply the old canvas to the new one
    context.drawImage(element, 0, 0);
    $("#previewobject").empty();
    $("#previewobject").append(newCanvas);


    var MeterGaugeobj1 = new Gauge({
        renderTo: id + "@",
        width: model.get("style").Width,
        height: model.get("style").height,
        glow: true,
        units: model.get("style").units,
        title: model.get("style").title,
        minValue: parseInt(min),
        maxValue: parseInt(max),
        majorTicks: model.get("majorTicks").Ticks,
        minorTicks: 2,
        strokeTicks: false,
        highlights: model.get("customSectors").colors,
        colors: {
            plate: model.get("needle").plateColor,
            majorTicks: model.get("needle").majorTicks,
            minorTicks: model.get("needle").minorTicks,
            title: model.get("style").Headercolor,
            units: model.get("needle").units,
            numbers: model.get("needle").numbers,
            needle: { start: model.get("needle").startcolor, end: model.get("needle").endcolor }
        }
    });

    MeterGaugeobj1.setValue(value);
    MeterGaugeobj1.draw();
    //$("#previewobject").empty();
    //// $("#").clone(true).removeAttr('id').appendTo($("#previewobject"));
    //$(element).clone(true).removeAttr('id').appendTo($("#previewobject"));

}
var radio = Backbone.Model.extend({
    initialize: function () {
    }
});
var radios = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: radio,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var radiotamplate = '<div class="bi-widget-item" style="margin-bottom: 10px; width: 100%;"><div id="' + model.get("id") + '"  style="white-space: normal;font-weight:bold;font-size:medium;text-overflow: ellipsis;overflow:hidden; line-height: 100%;" class="bi-Radio">Radio</div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(radiotamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(radiotamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(radiotamplate);
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
        }
        createradiolabel(model);
    },
    onModelRemoved: function (model, collection, options) {
       
    },
    onModelUpdate: function (model, collection, options) {
        createradiolabel(model);
    },    
    byId: function (radio, id) {
        return radio.find(function (model) { return model.get('id') == id });
    }

});
var radio = new radios();
function createradiolabel(model) {
    var element = document.getElementById(model.get("id"));
    var values = []; var change_style = [];
    change_style = model.get("style");
    var htempfont = 0; var htemplineheight = 0; var htempheight = 0;
    if (change_style.FontSize == "Small") {
        htempfont = 0.9;
        htemplineheight = 140;
    }
    else if (change_style.FontSize == "Medium") {
        htempfont = 1.3;
        htemplineheight = 121;
    }
    else if (change_style.FontSize == "Large") {
        htempfont = 2;
        htemplineheight = 110;
    }
    else if (change_style.FontSize == "Verylarge") {
        htempfont = 3;
        htemplineheight = 114;
    }
    $(element).css({ "width": "100%", "height": "auto", "font-size": htempfont + "em", "color": change_style.Fontcolor, "background": change_style.BackgroundColor, "border": change_style.BroderWidth + "px " + change_style.BorderStyle + " " + change_style.BorderColor, "padding": "5px" });

    $(element).parent().css({ "width": "100%", "height": "auto" });
    connectionid = model.get("data_column_values").connectionid;
    connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId; var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    formula = model.get("data_column_values").formula;

    _data = new Object();
    _data.ConnectionID = connectionid;
    _data.DSConnType = connectiontype;
    _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    slcSPgridobj = new Array();
    slcSPgridobj.push(_data);
    
    params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj), formula: formula };
    var append_label = [];
    append_label = model.get("style");

    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                // values = JSON.parse(data.coldata);
                values = (data.tabledata);
                var optionstr = "";
                $.each(values, function (index, value) {
                    if (values.length == 0)
                        optionstr += '<label class="selectedvalue"><input type="radio"  name="Radio"/>' + values + '</label>';
                    else
                        optionstr += '<label class="selectedvalue"><input type="radio"  name="Radio" value="' + values[index] + '"/>' + value + '</label>';
                });
                $(element).html('<label class="labelclass"></label>' + optionstr);
                var mvale = append_label.manualvalu;
                if (typeof mvale == "undefined") {
                    append_label.manualvalu = "Label Name";
                }
                //alert(append_label.Fontcolor);
                $('.labelclass').html(append_label.manualvalu);
                $('.labelclass').css({ "font-size": htempfont + "em", "color": append_label.Fontcolor, "line-height": +htemplineheight + "%", "text-overflow": "ellipsis", "display": "unset" });
                $(element).css({ "width": "100%", "height": "auto", "font-size": htempfont + "em", "color": append_label.Fontcolor, "background": append_label.BackgroundColor, "border": append_label.BroderWidth + "px " + append_label.BorderStyle + " " + append_label.BorderColor });
                $('.selectedvalue').css({ "color": append_label.RadioColor });
            }
        });
    } else {
        var manuval_style = model.get("style");        
        $(element).html(append_label.manualvalu);       
        $('.labelclass').css({ "font-size": htempfont + "em", "color": manuval_style.Fontcolor });   
    }
    $("#previewobject").empty();
    $("#previewobject").parent().css({ "display": "block" });
    $("#previewobject").css({ "display": "table-cell", "overflow": "auto", "height": "150px", "vertical-align": "middle", "width": "98%" });
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

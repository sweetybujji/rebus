var Progressbar = Backbone.Model.extend({
    initialize: function () {
    }
});
var Progressbars = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: Progressbar,
    onModelAdded: function (model, collection, options) {
        var labeltamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;white-space: normal;font-weight:bold;font-size:medium;width:100%"><div class="bi-progressbar"  id="' + model.get("id") + '"><ul style="list-style: outside none none;padding:0;margin:10px; width: 98%;" ><li><div class="clearfix"><div class="pull-left" style="color: #3b3b3b;font-size: 1.25em;margin-top: 12px;"> ' + model.get("style").LabelName + ' </div><div class="pull-right" style="color: #3b3b3b;font-size: 1.25em;margin-top: 12px;" data-toggle="tooltip" title="" data-original-title="10% down">94.382<i class="fa fa-level-down" style="color: #e84e40 !important;"></i></div></div><div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="69" aria-valuemin="0" aria-valuemax="100" style="width: 69%;"></div></div></li></ul></div></div>';
        //labeltamplate += '<li><div class="clearfix"><div class="pull-left" style="color: #3b3b3b;font-size: 1.25em;margin-top: 12px;"> ' + model.get("style").LabelName + ' </div>';
        //labeltamplate += '<div class="pull-right" style="color: #3b3b3b;font-size: 1.25em;margin-top: 12px;" data-toggle="tooltip" title="" data-original-title="10% down">94.382';
        //labeltamplate += '<i class="fa fa-level-down" style="color: #e84e40 !important;"></i></div></div>';
        //labeltamplate += '<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="69" aria-valuemin="0" aria-valuemax="100" style="width: 69%;"></div></li></ul></div>';
        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                var textobj = document.getElementById(target.split("@")[0]);
                $targetref = $(textobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(labeltamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(labeltamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(labeltamplate);
            }

        }
        var element = $(document.getElementById(model.get("id"))).parent();
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
                var selecteditem = text.byId(text, $("#settingsmenu").attr("data-controlid"));
            }
            var width = model.get("style").width;
            var height = model.get("style").height;
        }
        createProgressBar(model);
    },
    onModelRemoved: function (model, collection, options) {
        console.log("options = ", options);
    },
    onModelUpdate: function (model, collection, options) {
        createProgressBar(model);
    },
    byId: function (Progressbar, id) {
        return Progressbar.find(function (model) { return model.get('id') == id });
    }

});
//text class.
var Progressbar = new Progressbars();

function createProgressBar(model) {
    var element = document.getElementById(model.get("id"));
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
    textprimary_style = model.get("style");

    var htempfont = 0;
    if (textprimary_style.FontSize == "Small") {
        htempfont = 1;
    }
    else if (textprimary_style.FontSize == "Medium") {
        htempfont = 1.5;
    }
    else if (textprimary_style.FontSize == "Large") {
        htempfont = 2;
    }
    else if (textprimary_style.FontSize == "Verylarge") {
        htempfont = 2.5;
    }

    $(element).find(".pull-left").html(textprimary_style.LabelName);//to set label name   
    $(element).find(".pull-left").css({ "font-size": htempfont + "em", "line-height": "114%", "color": textprimary_style.FontColor });//to set font size
    $(element).css({ "width": textprimary_style.width });//to set width hear
    connectionid = model.get("data_column_values").connectionid;
    connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId;
    var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;
    formula = model.get("data_column_values").formula;
    _data = new Object();
    _data.ConnectionID = connectionid;
    _data.DSConnType = connectiontype;
    _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    _data.formulea = formula;
    slcSPgridobj = new Array();
    slcSPgridobj.push(_data);
    
    params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj)};

    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                var FinalValue = "";
                //values = JSON.parse(data.coldata);
                values = (data.tabledata);
                var MaxValue = model.get("style").MaxValue;
                if (MaxValue != "") {
                    var Devision = MaxValue / 100;
                    // alert(Devision);
                    FinalValue = values / Devision;
                    if (FinalValue > 0 & FinalValue < 25) {
                        $(element).find(".progress-bar").css({ "width": FinalValue + "%", "background-color": model.get("style").FirstColor });//Set Progers value in %
                    } else if (FinalValue > 25 & FinalValue < 50) {
                        $(element).find(".progress-bar").css({ "width": FinalValue + "%", "background-color": model.get("style").SecondColor });//Set Progers value in %
                    } else if (FinalValue > 50 & FinalValue < 75) {
                        $(element).find(".progress-bar").css({ "width": FinalValue + "%", "background-color": model.get("style").ThirdColor });//Set Progers value in %
                    }
                    else if (FinalValue > 75) {
                        $(element).find(".progress-bar").css({ "width": FinalValue + "%", "background-color": model.get("style").FourthColor });//Set Progers value in %
                    }
                }
                var lessthan = parseInt(model.get("style").Lessthan);              
                if (values > lessthan) {
                    $(element).find(".pull-right").html(model.get("style").prefix + values + model.get("style").suffix + "<i class='fa fa-level-up' style='color: #8bc34a !important;font-size: 1.2em;'></i>");
                } else {
                    $(element).find(".pull-right").html(model.get("style").prefix + values + model.get("style").suffix + "<i class='fa fa-level-down' style='color: #e84e40 !important;font-size: 1.2em;'></i>");
                }
                // $(element).find(".pull-right").css({"prefix":textprimary_style.prefix,"suffix":textprimary_style.suffix});
                //if (values >= model.get("style").Lessthan) {
                //    $(element).find(".pull-right").html(model.get("style").prefix + values + model.get("style").suffix + "<i class='fa fa-level-down' style='color: #e84e40 !important;font-size: 0.8em;'></i>");
                //} else {
                //    $(element).find(".pull-right").html(model.get("style").prefix + values + model.get("style").suffix + "<i class='fa fa-level-up' style='color: #8bc34a !important;font-size: 0.8em;'></i>");
                //}
            }
        });
    }
    $("#previewobject").empty();
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
}
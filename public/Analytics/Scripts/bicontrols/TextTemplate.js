var Text = Backbone.Model.extend({
    initialize: function () {
    }
});
var Texts = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: Text,
    onModelAdded: function (model, collection, options) {
        var labeltamplate = '<div class="bi-widget-item" style="margin-bottom: 10px; width: 100%;"><div id="' + model.get("id") + '" class="bi-label"><span class="labelclass" style="width: auto;white-space: normal;font-weight:bold;font-size:medium;text-overflow: ellipsis;overflow:hidden; line-height: 114%;">Label</span></div></div>';
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
        createlabel(model);
    },
    onModelRemoved: function (model, collection, options) {
        console.log("options = ", options);
    },
    onModelUpdate: function (model, collection, options) {
        createlabel(model);
    },
    byId: function (text, id) {
        return text.find(function (model) { return model.get('id') == id });
    }
});
//text class.
var text = new Texts();

//creating label
function createlabel(model) {
    //alert(JSON.stringify(model));
    var element = document.getElementById(model.get("id"));
    var values = []; var textprimary_style = []; var text_style = []; var val = ''; var finalval = [];
    text_style = model.get("style");


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

    $(element).css({ "background": text_style.BackgroundColor, "border": text_style.BorderWidth + "px " + text_style.BorderStyle + " " + text_style.BorderColor });
    connectionid = model.get("data_column_values").connectionid;
    connectiontype = model.get("data_column_values").connectiontype;
    var dsId = model.get("data_column_values").DSId;
    var dsName = model.get("data_column_values").DSName;
    var DSCnnCretedby = model.get("data_column_values").DSCnnCretedby;

    _data = new Object();
    _data.ConnectionID = connectionid;
    _data.DSConnType = connectiontype;
    _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    formula = model.get("data_column_values").formula;
    _data.formulea = formula;
    slcSPgridobj = new Array();
    slcSPgridobj.push(_data);

    params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };

    textprimary_style = model.get("primary_style");
    if (formula != "underfined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //values = JSON.parse(data.coldata);
                values = (data.tabledata);
                var htempfont = 0; var htemplineheight = 0; var htempheight = 0;
                if (textprimary_style.FontSize == "Small") {
                    htempfont = 1.2;
                }
                else if (textprimary_style.FontSize == "Medium") {
                    htempfont = 2.3;
                }
                else if (textprimary_style.FontSize == "Large") {
                    htempfont = 3.8;
                }
                else if (textprimary_style.FontSize == "Verylarge") {
                    htempfont = 5.2;
                }
                if (textprimary_style.FormatAs == "Number") {
                    for (var i = 0; i < values.length; i++) {
                        if (isNaN(values[i])) {
                            val = values[i];
                            finalval.push(val);
                        }
                        else {
                            val = parseFloat(values[i]).toFixed(textprimary_style.Decimal);
                            finalval.push(val);
                        }
                    }
                    $(element).find(".labelclass").html(textprimary_style.prefix + "" + finalval + "" + textprimary_style.suffix);
                }

                else {
                    $(element).find(".labelclass").html(textprimary_style.prefix + "" + values + "" + textprimary_style.suffix);
                }
                if (textprimary_style.RadioVal == "DashBoard") {
                    var valx = textprimary_style.DashBoardId;
                    if ((valx != "undefined")) {
                        $(element).find(".labelclass").html("<a onclick=\"getDashbordId('" + valx + "')\">" + formula + "</a>");
                    }
                    else if ((valx != "undefined") && (textprimary_style.lblimgsrc != "undefined")) {
                        var $lblimgelement = $(document.getElementById(model.get("id"))).parent();
                        if ($lblimgelement.children().children().hasClass("lblinnerimgspan")) {
                            $lblimgelement.find(".lblinnerimgspan").each(function () {
                                $(this).remove();
                            });
                        }
                        var $lblelement = $(document.getElementById(model.get("id")));
                        if (textprimary_style.lblimgpos == "right")
                            $('<img id="lblimg" class="lblinnerimgspan" src="' + textprimary_style.lblimgsrc + '" style=""/>').insertAfter($lblelement.find(".labelclass"));
                        else
                            $('<img id="lblimg" class="lblinnerimgspan" src="' + textprimary_style.lblimgsrc + '" style=""/>').insertBefore($lblelement.find(".labelclass"));

                    }
                    else {
                        $(element).find(".labelclass").html(formula);
                    }
                }
                if ((textprimary_style.lblimgsrc != "undefined")) {
                    var $lblimgelement = $(document.getElementById(model.get("id"))).parent();
                    if ($lblimgelement.children().children().hasClass("lblinnerimgspan")) {
                        $lblimgelement.find(".lblinnerimgspan").each(function () {
                            $(this).remove();
                        });
                    }
                    var $lblelement = $(document.getElementById(model.get("id")));
                    if (textprimary_style.lblimgpos == "right")
                        $('<img id="lblimg" class="lblinnerimgspan" src="' + textprimary_style.lblimgsrc + '" style=""/>').insertAfter($lblelement.find(".labelclass"));
                    else
                        $('<img id="lblimg" class="lblinnerimgspan" src="' + textprimary_style.lblimgsrc + '" style=""/>').insertBefore($lblelement.find(".labelclass"));
                }
                $(element).find(".labelclass").css({ "FormatAs": textprimary_style.FormatAs, "font-size": htempfont + "em", "font-weight": textprimary_style.Fontweight, "font-style": textprimary_style.Fontstyle, "font-family": textprimary_style.FontFamily, "text-decoration": textprimary_style.TextDecoration, "color": textprimary_style.Fontcolor, "prefix": textprimary_style.prefix, "suffix": textprimary_style.suffix });
                $(element).css({ "text-align": textprimary_style.allignment });
            }
        });
    }
    else {
        if (textprimary_style.FormatAs == "Hyperlink") {
            if (textprimary_style.FontSize == "Small") {
                htempfont = 1.2;
            }
            else if (textprimary_style.FontSize == "Medium") {
                htempfont = 2.3;
            }
            else if (textprimary_style.FontSize == "Large") {
                htempfont = 3.8;
            }
            else if (textprimary_style.FontSize == "Verylarge") {
                htempfont = 5.2;
            }
            if (textprimary_style.RadioVal == "FromUrl") {

                $(element).find(".labelclass").html('<a href=' + textprimary_style.FromUrl + '>' + textprimary_style.FromUrl + '</a>');
                $(element).find(".labelclass").css({ "FormatAs": textprimary_style.FormatAs, "text-align": textprimary_style.allignment, "font-size": htempfont + "em", "font-weight": textprimary_style.Fontweight, "font-style": textprimary_style.Fontstyle, "font-family": textprimary_style.FontFamily, "text-decoration": textprimary_style.TextDecoration, "color": textprimary_style.Fontcolor, "prefix": textprimary_style.prefix, "suffix": textprimary_style.suffix });
            }
            else if (textprimary_style.RadioVal == "DashBoard") {
                var valx = textprimary_style.DashBoardId;
                $(element).find(".labelclass").html("<a onclick=\"getDashbordId('" + valx + "')\">" + textprimary_style.DashBoardValue + "</a>");
                $(element).find(".labelclass").css({ "FormatAs": textprimary_style.FormatAs, "text-align": textprimary_style.allignment, "font-size": htempfont + "em", "font-weight": textprimary_style.Fontweight, "font-style": textprimary_style.Fontstyle, "font-family": textprimary_style.FontFamily, "text-decoration": textprimary_style.TextDecoration, "color": textprimary_style.Fontcolor, "prefix": textprimary_style.prefix, "suffix": textprimary_style.suffix });
            }
        }
    }
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

function getDashbordId(id) {
    var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
    var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + id;
    window.location.href = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + id;
    // window.showModalDialog(shareurl, "", sFeatures);
}
var ValuePair = Backbone.Model.extend({
    initialize: function () {
    }
});
var ValuePairs = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: ValuePair,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var valuepairtamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%;"><div id="' + model.get("id") + '" class="bi-valuepair" style="width:' + ((model.get("style").width)) + ';height:' + ((model.get("style").height)) + ';"><div class="label-inner-1" style="white-space: nowrap;text-overflow: ellipsis;overflow:hidden;line-height: 100%;text-align: center;"><label class="label-Primary" style="white-space: nowrap;text-overflow: ellipsis;overflow:hidden;line-height: 100%;">Sales</label></div><div class="label-inner-2" style="white-space: nowrap;text-overflow: ellipsis;margin-top:10px;overflow:hidden;line-height: 100%;text-align: center;"><label class="label-secondary" style="white-space: nowrap;text-overflow: ellipsis;margin-top:10px;overflow:hidden;line-height: 100%;">16</label></div></div></div>'
        if (model.get("type") != "widget") {
            if (target != null) {
                var valuepairobj = document.getElementById(target.split("@")[0]);
                $targetref = $(valuepairobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(valuepairtamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(valuepairtamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(valuepairtamplate);
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
            }
            else {
                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
                $(element).find(".bi-valuepair").height(parseInt($targetref.height()) - 5);
                var selecteditem = valuepair.byId(valuepair, $("#settingsmenu").attr("data-controlid"));
                var style1 = selecteditem.get("style");
                style1.height = parseInt($targetref.height());
                selecteditem.unset("style", { silent: true });
                selecteditem.set({ "style": style1 }, { silent: true });
            }
            var element = $(document.getElementById(model.get("id"))).parent();
            var manualtext = document.getElementById("_" + model.get("id"));
            var labeldivid = document.getElementById("label" + model.get("id"));
            var hidemanual = document.getElementById("hidemanual" + model.get("id"));
            var width = model.get("style").width;
            var height = model.get("style").height;
            if (width.toString().indexOf("%") != -1) {
                width = parseFloat(width.replace("%", ""));
                width = ($targetref.width() * width) / 100;
            }
            model.get("style").width = width;
            model.get("style").height = height;
        }
        getvaluepair(model, element);
        var initprimary_style = []; var initsecondary_style = []; var init_style = [];
        initprimary_style = model.get("primary_style");
        initsecondary_style = model.get("secondary_style");
        $(element).find('.label-Primary').css({ "FormatAs": initprimary_style.FormatAs, "text-align": initprimary_style.allignment, "font-size": initprimary_style.FontSize + "em", "font-weight": initprimary_style.Fontweight, "font-style": initprimary_style.Fontstyle, "font-family": initprimary_style.FontFamily, "text-decoration": initprimary_style.TextDecoration, "color": initprimary_style.Fontcolor, "prefix": initprimary_style.prefix, "suffix": initprimary_style.suffix });
        $(element).find('.label-secondary').css({ "FormatAs": initsecondary_style.FormatAs, "text-align": initsecondary_style.allignment, "font-size": initsecondary_style.FontSize + "em", "font-weight": initsecondary_style.Fontweight, "font-style": initsecondary_style.Fontstyle, "font-family": initsecondary_style.FontFamily, "text-decoration": initsecondary_style.TextDecoration, "color": initsecondary_style.Fontcolor, "prefix": initsecondary_style.prefix, "suffix": initsecondary_style.suffix });
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {

        var element = $(document.getElementById(model.get("id"))).parent();

        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {
            if (target != null) {
                var valuepairobj = document.getElementById(target.split("@")[0]);
                $targetref = $(valuepairobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
        }
        var width = model.get("style").width;
        var height = model.get("style").height;

        if (width.toString().indexOf("%") != -1) {
            width = parseFloat(width.replace("%", ""));
            width = ($targetref.width() * width) / 100;
        }
        model.get("style").width = width;
        model.get("style").height = parseInt(height) + "px";
        var target = model.get("target");

        // $("#" + target).css({ "width": width });
        getvaluepair(model, element);
    },
    byName: function (name) {
        filtered = this.filter(function (ValuePair) {
            return ValuePair.get("name") === name;
        });
        return new ValuePair(filtered);
    },
    byId: function (valuepair, id) {
        return valuepair.find(function (model) { return model.get('id') == id });
    }
});

//....valuepair backbone object....//
var valuepair = new ValuePairs();

//.... getting data based on math operations.....//
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
//.... getting data based on math operations ended.....//

//.... value pair control functionality.....//
function getvaluepair(model, element) {
    var primaryvalues = []; var secondaryvalues = []; var vp_style = []; var vpprimary_style = []; var vpsecondary_style = [];
    var primefinalval = []; var secondfinalval = [];
    vp_style = model.get("style");
    var width = model.get("style").width;
    var height = model.get("style").height;

    //$(element).find(".bi-valuepair").width(width - 10);
    //$(element).find(".bi-valuepair").height(parseInt(height - 10));

    $(element).css({ "width": (parseInt(width) + parseInt(vp_style.BorderWidth)) + "px", "height": (parseInt(height) + parseInt(vp_style.BorderWidth)) + "px" });

    // $(element).css({ "width": vp_style.width, "height": vp_style.height, "background": vp_style.BackgroundColor, "border": vp_style.BorderWidth + "px " + vp_style.BorderStyle + " " + vp_style.BorderColor });
    $(element).find(".bi-valuepair").css({ "width": (parseInt(vp_style.width) - 10) + "px", "height": (parseInt(vp_style.height) - 10) + "px", "background": vp_style.BackgroundColor, "border": vp_style.BorderWidth + "px " + vp_style.BorderStyle + " " + vp_style.BorderColor });
    $(element).find('.label-secondary').css({ "margin-top": parseInt(vp_style.pairsaparation) + "px" });

    //data_column_primaryvalues
    var connectionid = model.get("data_column_primaryvalues").connectionid; var connectiontype = model.get("data_column_primaryvalues").connectiontype;
    var dsId = model.get("data_column_primaryvalues").DSId; var dsName = model.get("data_column_primaryvalues").DSName;
    var DSCnnCretedby = model.get("data_column_primaryvalues").DSCnnCretedby;
    var _data = new Object();
    _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
    var sel = "";
    $("#bitree").bind("select_node.jstree", function (evt, data) {
        var ref = $('#bitree').jstree(true);
        sel = ref.get_selected();
    });
    var formula = model.get("data_column_primaryvalues").formula;
    _data.formulea = formula;

    var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
    
    var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };

    if (formula != "undefined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                //primaryvalues = JSON.parse(data.coldata);
                primaryvalues = (data.tabledata);
                vpprimary_style = model.get("primary_style");
                if (vpprimary_style.FormatAs == "Number") {
                    for (var i = 0; i < primaryvalues.length; i++) {
                        if (isNaN(primaryvalues[i])) {
                            val = primaryvalues[i];
                            primefinalval.push(val);
                        }
                        else {
                            val = parseFloat(primaryvalues[i]).toFixed(vpprimary_style.Decimal);
                            primefinalval.push(val);
                        }
                    }
                    $(element).find('.label-Primary').html(vpprimary_style.prefix + "" + primefinalval + "" + vpprimary_style.suffix);
                    // $(element).html(textprimary_style.prefix + "" + primefinalval + "" + textprimary_style.suffix);
                }
                else {
                    $(element).find('.label-Primary').html(vpprimary_style.prefix + "" + primaryvalues + "" + vpprimary_style.suffix);
                }

                $(element).find('.label-Primary').css({ "FormatAs": vpprimary_style.FormatAs, "text-align": vpprimary_style.allignment, "font-size": vpprimary_style.FontSize + "em", "font-weight": vpprimary_style.Fontweight, "font-style": vpprimary_style.Fontstyle, "font-family": vpprimary_style.FontFamily, "text-decoration": vpprimary_style.TextDecoration, "color": vpprimary_style.Fontcolor, "prefix": vpprimary_style.prefix, "suffix": vpprimary_style.suffix });
                IndicateChange(model, element);
            }
        });
    }
    else {
        vpprimary_style = model.get("primary_style");
        //$(element).find('.label-inner-1').html(vpprimary_style.manualText);
        $(element).find('.label-Primary').css({ "FormatAs": vpprimary_style.FormatAs, "text-align": vpprimary_style.allignment, "font-size": vpprimary_style.FontSize + "em", "font-weight": vpprimary_style.Fontweight, "font-style": vpprimary_style.Fontstyle, "font-family": vpprimary_style.FontFamily, "text-decoration": vpprimary_style.TextDecoration, "color": vpprimary_style.Fontcolor, "prefix": vpprimary_style.prefix, "suffix": vpprimary_style.suffix });
        IndicateChange(model, element);
    }

    //data_column_secondaryvalues
    connectionid = model.get("data_column_secondaryvalues").connectionid; connectiontype = model.get("data_column_secondaryvalues").connectiontype;
    var dsId = model.get("data_column_secondaryvalues").DSId; var dsName = model.get("data_column_secondaryvalues").DSName;
    var DSCnnCretedby = model.get("data_column_secondaryvalues").DSCnnCretedby;
    var _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype; _data.DSId = dsId; _data.DSName = dsName;
    _data.DSCnnCretedby = DSCnnCretedby;
   
    formula = model.get("data_column_secondaryvalues").formula;
    _data.formulea = formula;
    slcSPgridobj = new Array(); slcSPgridobj.push(_data);
     params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };
    if (formula != "undefined") {
        var promise = GetDataAjax(params);
        promise.success(function (data) {
            if (data.errorresult) {
                alert(data.errorresult); return false;
            }
            else {
                secondaryvalues = (data.tabledata);
               // secondaryvalues = JSON.parse(data.coldata);
                vpsecondary_style = model.get("secondary_style");
                if (vpsecondary_style.FormatAs == "Number") {
                    for (var i = 0; i < secondaryvalues.length; i++) {
                        if (isNaN(secondaryvalues[i])) {
                            val = secondaryvalues[i];
                            secondfinalval.push(val);
                        }
                        else {
                            val = parseFloat(secondaryvalues[i]).toFixed(vpsecondary_style.Decimal);
                            secondfinalval.push(val);
                        }
                    }
                    $(element).find('.label-secondary').html(vpsecondary_style.prefix + "" + secondfinalval + "" + vpsecondary_style.suffix);
                    // $(element).html(textprimary_style.prefix + "" + secondfinalval + "" + textprimary_style.suffix);
                }
                else {
                    $(element).find('.label-secondary').html(vpsecondary_style.prefix + "" + secondaryvalues + "" + vpsecondary_style.suffix);
                }
                $(element).find('.label-secondary').css({ "FormatAs": vpsecondary_style.FormatAs, "text-align": vpsecondary_style.allignment, "font-size": vpsecondary_style.FontSize + "em", "font-weight": vpsecondary_style.Fontweight, "font-style": vpsecondary_style.Fontstyle, "font-family": vpsecondary_style.FontFamily, "text-decoration": vpsecondary_style.TextDecoration, "color": vpsecondary_style.Fontcolor, "prefix": vpsecondary_style.prefix, "suffix": vpsecondary_style.suffix });
                IndicateChange(model, element);
            }
        });
    }
    else {
        vpsecondary_style = model.get("secondary_style");
        $(element).find('.label-secondary').css({ "FormatAs": vpsecondary_style.FormatAs, "text-align": vpsecondary_style.allignment, "font-size": vpsecondary_style.FontSize + "em", "font-weight": vpsecondary_style.Fontweight, "font-style": vpsecondary_style.Fontstyle, "font-family": vpsecondary_style.FontFamily, "text-decoration": vpsecondary_style.TextDecoration, "color": vpsecondary_style.Fontcolor, "prefix": vpsecondary_style.prefix, "suffix": vpsecondary_style.suffix });
        IndicateChange(model, element);
    }

    $("#previewobject").empty();
    $(element).find(".bi-valuepair").clone(true).removeAttr('id').appendTo($("#previewobject"));

}
//.... value pair control functionality ended.....//



//............ updating data using indicaters...............//
function IndicateChange(model, element) {
    var primeObj = model.get("data_column_primaryvalues");
    var primeobjprcnt = primeObj.primaryconditions[0].primepredicates.length;
    for (var pr = 0; pr < primeobjprcnt; pr++) {
        var type = primeObj.primaryconditions[0].primepredicates[pr].type;
        var value = primeObj.primaryconditions[0].primepredicates[pr].value;
        if (value != "") {
            if (type == "is equal to") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value == primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').html(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is not equal to") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is greater than") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is greater than or equal to") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is less than") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is less than or equal to") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "contains") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "does not contain") {
                var primeval = $(element).find('.label-Primary').text().trim();
                if (value != primeval) {
                    var primeobjrccnt = primeObj.primaryconditions[0].primereactions.length;
                    for (var rec = 0; rec < primeobjrccnt; rec++) {
                        var rectype = primeObj.primaryconditions[0].primereactions[rec].type;
                        var recvalue = primeObj.primaryconditions[0].primereactions[rec].reactvalue;
                        var imgpos = primeObj.primaryconditions[0].primereactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-Primary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-1').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-Primary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-Primary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-Primary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-Primary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-Primary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-Primary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-Primary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
        }
    }


    var secondObj = model.get("data_column_secondaryvalues");
    var secondobjprcnt = secondObj.secondaryconditions[0].secondpredicates.length;
    for (var sr = 0; sr < secondobjprcnt; sr++) {
        var type = secondObj.secondaryconditions[0].secondpredicates[sr].type;
        var value = secondObj.secondaryconditions[0].secondpredicates[sr].value;
        if (value != "") {
            if (type == "is equal to") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is not equal to") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is greater than") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is greater than or equal to") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is less than") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "is less than or equal to") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "contains") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
            else if (type == "does not contain") {
                var secondval = $(element).find('.label-secondary').text().trim();
                if (value == secondval) {
                    var secondobjrccnt = secondObj.secondaryconditions[0].secondreactions.length;
                    for (var rec = 0; rec < secondobjrccnt; rec++) {
                        var rectype = secondObj.secondaryconditions[0].secondreactions[rec].type;
                        var recvalue = secondObj.secondaryconditions[0].secondreactions[rec].reactvalue;
                        var imgpos = secondObj.secondaryconditions[0].secondreactions[rec].imgpos;
                        if (recvalue != "") {
                            if (rectype == "change color") {
                                $(element).find('.label-secondary').css({ "color": recvalue });
                            }
                            else if (rectype == "display icon") {
                                $(element).find('.label-inner-2').find(".innerimgspan").each(function () {
                                    $(this).remove();
                                });
                                if (imgpos == "left") {
                                    $(element).find('.label-secondary').before("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else if (imgpos == "replace") {
                                    $(element).find('.label-secondary').html("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                                else {
                                    $(element).find('.label-secondary').after("<span class='innerimgspan'><img width='26' height='26' class='innerimg' src='" + recvalue + "' style=' padding: 0px;' /></span>");
                                }
                            }
                            else if (rectype == "change style") {
                                if (recvalue == "underline") {
                                    $(element).find('.label-secondary').css({ "text-decoration": recvalue });
                                }
                                else if (recvalue == "italic") {
                                    $(element).find('.label-secondary').css({ "font-style": recvalue });
                                }
                                else {
                                    $(element).find('.label-secondary').css({ "font-weight": recvalue });
                                }
                            }
                            else if (rectype == "replace with text") {
                                $(element).find('.label-secondary').text(recvalue);
                            }
                            else {
                                //$(element).find('.label-Primary').css({ "color": recvalue });
                            }
                        }
                    }
                }
            }
        }
    }

}
//............ updating data using indicaters ended...............//

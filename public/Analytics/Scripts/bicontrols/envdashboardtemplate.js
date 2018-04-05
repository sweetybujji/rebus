var Dashboard = Backbone.Model.extend({
    initialize: function () {
    }
});
var Dashboards = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: Dashboard,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var dashoboardtamplate = '<div class="bi-widget-item" style="margin-bottom: 10px;padding:5px;width: 100%;"><div id="' + model.get("id") + '" class="bi-dashboardchart" style="height:' + (parseInt(model.get("style").height) + 20 + "px") + ';"><iframe class="bi-dashboardiframe" style="width:100%;height:' + ((model.get("style").height) + "px") + ';" src=""></iframe></div></div>'
        if (model.get("type") != "widget") {
            if (target != null) {
                var valuepairobj = document.getElementById(target.split("@")[0]);
                $targetref = $(valuepairobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(dashoboardtamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(dashoboardtamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(dashoboardtamplate);
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
                $(element).find(".bi-dashboardchart").height(parseInt($targetref.height()) - 5);
                var selecteditem = dashboardchart.byId(dashboardchart, $("#settingsmenu").attr("data-controlid"));
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
        getdashboard(model, element);
        var initprimary_style = []; var initsecondary_style = []; var init_style = [];
        initprimary_style = model.get("primary_style");
        initsecondary_style = model.get("secondary_style");
        //$(element).find('.label-Primary').css({ "FormatAs": initprimary_style.FormatAs, "text-align": initprimary_style.allignment, "font-size": initprimary_style.FontSize + "em", "font-weight": initprimary_style.Fontweight, "font-style": initprimary_style.Fontstyle, "font-family": initprimary_style.FontFamily, "text-decoration": initprimary_style.TextDecoration, "color": initprimary_style.Fontcolor, "prefix": initprimary_style.prefix, "suffix": initprimary_style.suffix });
        //$(element).find('.label-secondary').css({ "FormatAs": initsecondary_style.FormatAs, "text-align": initsecondary_style.allignment, "font-size": initsecondary_style.FontSize + "em", "font-weight": initsecondary_style.Fontweight, "font-style": initsecondary_style.Fontstyle, "font-family": initsecondary_style.FontFamily, "text-decoration": initsecondary_style.TextDecoration, "color": initsecondary_style.Fontcolor, "prefix": initsecondary_style.prefix, "suffix": initsecondary_style.suffix });
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
        //var width = model.get("style").width;
        var height = model.get("style").height;

        //if (width.toString().indexOf("%") != -1) {
        //    width = parseFloat(width.replace("%", ""));
        //    width = ($targetref.width() * width) / 100;
        //}
        //model.get("style").width = width;
        model.get("style").height = parseInt(height) + "px";
        var target = model.get("target");

        // $("#" + target).css({ "width": width });
        getdashboard(model, element);
    },
    byName: function (name) {
        filtered = this.filter(function (Dashboard) {
            return Dashboard.get("name") === name;
        });
        return new Dashboard(filtered);
    },
    byId: function (dashboardchart, id) {
        return dashboardchart.find(function (model) { return model.get('id') == id });
    }
});

//....valuepair backbone object....//
var dashboardchart = new Dashboards();

//.... getting data based on math operations.....//
function GetDataAjax(params) {
    return $.ajax({
        url: "../../GetAllConnectionData/GET_DataForMathOperations_1",
        method: 'POST',
        async: false,
        cache: false,
        headers: {
            'Accept':
            'application/json', 'Pragma': 'no-cache'
        },
        data: params
    });
}
//.... getting data based on math operations ended.....//

//.... value pair control functionality.....//
function getdashboard(model, element) {
    var primaryvalues = []; var secondaryvalues = []; var vp_style = []; var vpprimary_style = []; var vpsecondary_style = [];
    var primefinalval = []; var secondfinalval = [];
    vp_style = model.get("style");
    var url = model.get("style").url;
    //var width = model.get("style").width;
    var height = model.get("style").height;
    $("#previewobject").empty();
    var primeObj = model.get("data_column_parametervalues");   
    var paramobj = primeObj.primaryconditions[0].parameters;    
    var requesturl = url + "?params=" +JSON.stringify(paramobj);
    if ((url == "") && (paramobj.length > 0)) {

    }
    else {
        //alert(requesturl);
        $(element).find(".bi-dashboardiframe").attr("src", requesturl);
        $(element).find(".bi-dashboardiframe").css("height", height + 'px');

        //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        //alert(obj.contentWindow.document.body.scrollHeight);

        $("#previewobject").empty();
    }
    //$("iframe").css("height", "150px;");
    //$(element).find(".bi-dashboardchart").clone(true).removeAttr('id').appendTo($("#previewobject"));
    //alert("ss");
    $("#previewobject").empty();
    $("#previewobject").css({ "height": "175px", "width": "97%", "display": "block" });
    //$("#previewobject").children().find(".bi-dashboardchart").css({ "height": "175px" });
    //$("#previewobject").children().find(".bi-dashboardiframe").css({ "height": "175px" });


}
//.... value pair control functionality ended.....//



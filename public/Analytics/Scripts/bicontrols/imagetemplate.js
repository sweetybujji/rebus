var image = Backbone.Model.extend({
    initialize: function () {
    }
});

var images = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },    
    model: image,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");
        var $targetref;
        var imgtamplate = '<div class="bi-widget-item" style="margin-bottom: 10px"><div id="' + model.get("id") + '" class="bi-image"></div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(imgtamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(imgtamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(imgtamplate);
            }
        }
        var intial_style = model.get("style");        
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
            }
        }
        createimagelabel(model);
    },
    onModelRemoved: function (model, collection, options) {        
    },
    onModelUpdate: function (model, collection, options) {
        createimagelabel(model);
    }, 
    byId: function (image, id) {
        return image.find(function (model) { return model.get('id') == id });
    }

});
var image = new images();

function createimagelabel(model) {
    var element = document.getElementById(model.get("id"));
    var values = [];
    var change_style = model.get("style");
    var imgUrl = change_style.URLPath;
    if (typeof imgUrl == "undefined") {
        change_style.URLPath = "../../Images/LOGO1.png";
    }
    $(element).html('<img src="' + change_style.URLPath + '" class="fromurlImg" />');
    $(element).find('.fromurlImg').css({ "width": change_style.Width, "height": change_style.Height, "border": change_style.BroderWidth + "px " + change_style.BorderStyle + " " + change_style.BorderColor });
    $(element).parent().css({ "height": change_style.Height });
    $("#previewobject").empty();
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));   
}

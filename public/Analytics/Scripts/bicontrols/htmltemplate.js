var Htmltag = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {      
    }
});
var Htmltags = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: Htmltag,
    onModelAdded: function (model, collection, options) {
        
        var target = model.get("target");
        var $targetref;
        var htmltemplate = '<div class="bi-widget-item" style="margin-bottom: 10px; width: 100%"><div id="' + model.get("id") + '"  style="white-space: normal;font-weight:bold;font-size:medium;height:100px;" class="bi-htmltemplate"><h4 style="padding-bottom:4px">HTML Placeholder</h4><p style="color:Red"><i>Replace this HTML with your own. You can inject data into it by defining one or more series and using the template language to reference the series.</i></p></div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var htmltagobj = document.getElementById(target.split("@")[0]);
                $targetref = $(htmltagobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
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
       
        modelupdate1(model);
       
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
      
        modelupdate1(model);
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

function modelupdate1(model)
{
 
    var element = document.getElementById(model.get("id"));

  
    var values = []; var labels = [];
    var htmltag_style = model.get("html");
    $("#" + model.get("id")).css("height", model.get("style").height);
    $("#" + model.get("id")).css("overflow", model.get("style").overflow);
    //setting menu updated properties  
    $(element).html(htmltag_style.textarea);
    var script_style = model.get("script");
    //setting menu updated properties  
    // $(element).find("<head>").append(script_style.tag);
    var head = document.getElementsByTagName('head')[0];
    $(document.getElementById('script' + model.get("id"))).remove();
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'script' + model.get("id");
    script.innerHTML = script_style.tag;
    head.appendChild(script);
    //updated style properties     


    //cloning updated properties
    $("#previewobject").empty();
    $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
}
//Drop down class.
var htmltag = new Htmltags();


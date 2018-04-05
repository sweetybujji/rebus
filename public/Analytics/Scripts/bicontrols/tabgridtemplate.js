var LayoutGrid = Backbone.Model.extend({
    initialize: function () {
    }
});
var LayoutGrids = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    model: LayoutGrid,
    onModelAdded: function (model, collection, options) {
        var target = model.get("target");        
        var $targetref, twidth;
        var tdstr = model.get("td");
        var Gridtemplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;"><div class="comp cx-panel_grid" style="height:auto;overflow:auto; border-left: 1px dashed #c5c6c8;"><table  id="' + model.get("id") + '"  class="layout-grid" style="display: table;"><tbody>' + tdstr + '</tbody></table></div></div>';    
        if (model.get("type") != "widget") {
            if (target != null) {
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(Gridtemplate);
                twidth = $targetref.width() - 3;
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            twidth = $(document.getElementById(target)).width() - 17;
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(Gridtemplate);               
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(Gridtemplate);
            }
        }     
       
        var element = $(document.getElementById(model.get("id"))).parent().parent();
        if (model.get("viewer") != true) {
            $(element).width(twidth);
            $(element).click(function (e) {
                $(".widget-body").sortable("option", "disabled", false);
                if (model.get("type") == "widget") {
                    //   $(".widget-body").sortable("option", "disabled", false);
                }
                $(".widget-drag-handle").remove();
                $(".selectedwidget").removeClass("selectedwidget");
                $(this).addClass("selectedwidget");
                $(this).append('<div class="widget-drag-handle"></div>');
                $("#settingsmenu").attr("data-controlid", model.get("id"));
                $("#settingsmenu").attr("data-controltype", model.get("controltype"));
                $("#deletewidget,#widgetsettings").removeAttr("disabled");
                $(".widget-body").sortable("option", "disabled", true);
                e.stopPropagation();
            });
            $(element).click();
            if (model.get("type") == "widget") {
            }
            if (model.get("type") != "widget") {
                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
            }
        }
    
    },
    onModelRemoved: function (model, collection, options) {

    },
    onModelUpdate: function (model, collection, options) {
    },
    byName: function (name) {
        filtered = this.filter(function (LayoutGrid) {
            return LayoutGrid.get("name") === name;
        });
        return new LayoutGrid(filtered);
    },
    byId: function (layoutgrid, id) {
        return layoutgrid.find(function (model) { return model.get('id') == id });
    }
});
//Layout Grid initialization.
var layoutgrid = new LayoutGrids();

//init table td's
function tdclick(target) { 
    var $tableobj = $(document.getElementById(target)).find("tr td");    
    $tableobj.unbind("click");
    $tableobj.click(function (e) {
      //  e.stopPropagation();
        $("#widgetstore").find('table').find('td').removeClass("tdActive");
        $(this).addClass('tdActive');
        $(".widget-body").sortable("option", "disabled", true);
        var firsttdwidth = $(document.getElementById(target)).find('tr:eq(0)').find('td').eq($(this).index()).attr("data-tdwidth");        
        if (firsttdwidth != null)
            $("#seldivwidth").val(firsttdwidth);
        else
            $("#seldivwidth").val($(document.getElementById(target)).find('tr:eq(0)').find('td').eq($(this).index()).width());
        $("#seldivheight").val($(this).height() - 10);

        $("#gridcolspan").val($(this).attr("colspan") == null ? 1 : $(this).attr("colspan"));
        $("#gridrowspan").val($(this).attr("rowspan") == null ? 1 : $(this).attr("rowspan"));

        var maxcols = 0;
        $(document.getElementById(target)).find("tr").each(function (index, value) {
            $this = $(this).find('td').length;
            if ($this > maxcols) maxcols = $this;
        });
        $("#layoutcols").val(maxcols);
        $("#layoutcols").attr("data-column", maxcols);
        //  alert($("#draggabletable").find('.tdActive').parent().siblings('tr').length);
        $("#layoutrows").val($(document.getElementById(target)).find('.tdActive').parent().siblings('tr').length);
        $("#layoutrows").attr("data-row", $(document.getElementById(target)).find('.tdActive').parent().siblings('tr').length);

        $("#alignelement").val($(this).find('.layout-cell').css("vertical-align"));
        $("#cellpadding").val(parseInt($(this).find('.layout-cell').attr("data-margin")));

    });
}
